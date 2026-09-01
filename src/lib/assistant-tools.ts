import type { SessionUser } from "./auth";
import {
  isValidSlot,
  buildAvailability,
  nextBookableDates,
  type Track,
  type BookedSlot,
} from "./availability";

/**
 * What the assistant can propose but never execute itself — the actual
 * booking/cancellation only happens when the client clicks Confirm in the
 * widget, which hits the same protected /api/appointments endpoints as
 * manual booking. This keeps a hard boundary between "the model decided
 * this" and "a write happened": the model can never mutate the database,
 * only stage a proposal that re-derives the client's identity fresh from
 * their session cookie at the moment they actually confirm it.
 */
export type PendingAction =
  | { type: "propose_booking"; track: Track; date: string; time: string }
  | {
      type: "propose_cancel";
      appointmentId: number;
      track: Track;
      date: string;
      time: string;
    };

export type ToolDef = {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<
      string,
      { type: string; description: string; enum?: string[] }
    >;
    required: string[];
  };
};

function describeSlot(date: string, time: string, track: Track): string {
  return `${date} ${time} (${track === "online" ? "online" : "in person"})`;
}

const CHECK_AVAILABILITY: ToolDef = {
  name: "check_availability",
  description:
    "Check open appointment slots. Optionally filter to a specific date (YYYY-MM-DD) and/or track. With no filters, returns open slots across the next several bookable weekdays. Works whether or not the client is signed in.",
  parameters: {
    type: "object",
    properties: {
      date: {
        type: "string",
        description: "A specific date to check, in YYYY-MM-DD format.",
      },
      track: {
        type: "string",
        description: "Limit to one track.",
        enum: ["online", "in_person"],
      },
    },
    required: [],
  },
};

const LIST_MY_APPOINTMENTS: ToolDef = {
  name: "list_my_appointments",
  description:
    "List the signed-in client's own upcoming booked appointments. Call this before cancel_appointment if you don't already know the exact date, time and track.",
  parameters: { type: "object", properties: {}, required: [] },
};

const BOOK_APPOINTMENT: ToolDef = {
  name: "book_appointment",
  description:
    "Stage a booking for the signed-in client at a specific open slot. This does NOT book immediately — it stages the request for the client to review and confirm themselves in the widget. Call check_availability first to make sure the slot is actually open.",
  parameters: {
    type: "object",
    properties: {
      date: { type: "string", description: "Date to book, YYYY-MM-DD." },
      time: {
        type: "string",
        description: "Start time, 24-hour HH:MM, e.g. 14:00.",
      },
      track: {
        type: "string",
        description: "Which track to book.",
        enum: ["online", "in_person"],
      },
    },
    required: ["date", "time", "track"],
  },
};

const CANCEL_APPOINTMENT: ToolDef = {
  name: "cancel_appointment",
  description:
    "Stage cancelling one of the signed-in client's own booked appointments, identified by date, time and track. This does NOT cancel immediately — it stages the request for the client to review and confirm themselves in the widget. Call list_my_appointments first if you don't already know the exact date, time and track.",
  parameters: {
    type: "object",
    properties: {
      date: {
        type: "string",
        description: "Date of the appointment to cancel, YYYY-MM-DD.",
      },
      time: { type: "string", description: "Start time, 24-hour HH:MM." },
      track: {
        type: "string",
        description: "Track of the appointment.",
        enum: ["online", "in_person"],
      },
    },
    required: ["date", "time", "track"],
  },
};

/**
 * Builds the tool list and dispatcher for one request. `session` gates
 * which tools even exist — when the client isn't signed in, the
 * account-scoped tools are simply absent from the list handed to the
 * model, so there's no tool call it could make for them to go wrong, not
 * just a prompt instruction telling it not to.
 */
export function buildAssistantTools(opts: {
  db: D1Database;
  session: SessionUser | null;
}) {
  const { db, session } = opts;
  let pendingAction: PendingAction | null = null;

  const tools: ToolDef[] = [CHECK_AVAILABILITY];
  if (session) {
    tools.push(LIST_MY_APPOINTMENTS, BOOK_APPOINTMENT, CANCEL_APPOINTMENT);
  }

  async function runTool(
    name: string,
    rawArgs: unknown,
  ): Promise<string> {
    const args = (
      rawArgs && typeof rawArgs === "object" ? rawArgs : {}
    ) as Record<string, unknown>;

    if (name === "check_availability") {
      const dateFilter = typeof args.date === "string" ? args.date : undefined;
      const trackFilter =
        args.track === "online" || args.track === "in_person"
          ? args.track
          : undefined;
      const dates = dateFilter ? [dateFilter] : nextBookableDates(7);
      const { results } = await db
        .prepare(
          `SELECT date, start_time, track FROM appointments
           WHERE status = 'booked' AND date >= ? AND date <= ?`,
        )
        .bind(dates[0], dates[dates.length - 1])
        .all<BookedSlot>();
      const days = buildAvailability(dates, results ?? []);
      const tracksToShow: Track[] = trackFilter
        ? [trackFilter]
        : ["online", "in_person"];
      const lines: string[] = [];
      for (const day of days) {
        for (const t of tracksToShow) {
          const open = day[t].filter((s) => s.available).map((s) => s.time);
          if (open.length) {
            lines.push(
              `${day.date} (${t === "online" ? "online" : "in person"}): ${open.join(", ")}`,
            );
          }
        }
      }
      return lines.length
        ? `Open slots (Eastern Time):\n${lines.join("\n")}`
        : "No open slots found in that range.";
    }

    if (!session) {
      return "The client isn't signed in, so this isn't available. Tell them to log in at /account/login (or create an account at /account/signup) first.";
    }

    if (name === "list_my_appointments") {
      const { results } = await db
        .prepare(
          `SELECT track, date, start_time FROM appointments
           WHERE user_id = ? AND status = 'booked' ORDER BY date, start_time`,
        )
        .bind(session.userId)
        .all<{ track: Track; date: string; start_time: string }>();
      if (!results?.length) {
        return "The client has no upcoming booked appointments.";
      }
      return results
        .map((r) => describeSlot(r.date, r.start_time, r.track))
        .join("\n");
    }

    if (name === "book_appointment") {
      const date = typeof args.date === "string" ? args.date : "";
      const time = typeof args.time === "string" ? args.time : "";
      const trackArg = args.track;
      const track =
        trackArg === "online" || trackArg === "in_person" ? trackArg : "";

      if (!isValidSlot(date, time, track)) {
        return "That's not a bookable slot — it must be a weekday, 9am-4pm Eastern, not a US federal holiday, and not in the past. Call check_availability to find an open one.";
      }
      const existing = await db
        .prepare(
          `SELECT 1 FROM appointments
           WHERE date = ? AND start_time = ? AND track = ? AND status = 'booked'`,
        )
        .bind(date, time, track)
        .first();
      if (existing) {
        return `That slot (${describeSlot(date, time, track as Track)}) is already booked. Call check_availability to find an open one.`;
      }
      pendingAction = { type: "propose_booking", track: track as Track, date, time };
      return `Staged for the client to confirm: ${describeSlot(date, time, track as Track)}. Tell them to review it and tap confirm below — it isn't booked yet.`;
    }

    if (name === "cancel_appointment") {
      const date = typeof args.date === "string" ? args.date : "";
      const time = typeof args.time === "string" ? args.time : "";
      const trackArg = args.track;
      const track =
        trackArg === "online" || trackArg === "in_person" ? trackArg : undefined;

      const row = track
        ? await db
            .prepare(
              `SELECT id, track, date, start_time FROM appointments
               WHERE user_id = ? AND date = ? AND start_time = ? AND track = ? AND status = 'booked'`,
            )
            .bind(session.userId, date, time, track)
            .first<{ id: number; track: Track; date: string; start_time: string }>()
        : await db
            .prepare(
              `SELECT id, track, date, start_time FROM appointments
               WHERE user_id = ? AND date = ? AND start_time = ? AND status = 'booked'`,
            )
            .bind(session.userId, date, time)
            .first<{ id: number; track: Track; date: string; start_time: string }>();

      if (!row) {
        const { results } = await db
          .prepare(
            `SELECT track, date, start_time FROM appointments
             WHERE user_id = ? AND status = 'booked' ORDER BY date, start_time`,
          )
          .bind(session.userId)
          .all<{ track: Track; date: string; start_time: string }>();
        const upcoming = results?.length
          ? results.map((r) => describeSlot(r.date, r.start_time, r.track)).join("\n")
          : "none";
        return `No booked appointment matches that date/time/track. The client's actual upcoming appointments:\n${upcoming}`;
      }

      pendingAction = {
        type: "propose_cancel",
        appointmentId: row.id,
        track: row.track,
        date: row.date,
        time: row.start_time,
      };
      return `Staged for the client to confirm cancelling: ${describeSlot(row.date, row.start_time, row.track)}. Tell them to review it and tap confirm below — it isn't cancelled yet.`;
    }

    return `Unknown tool: ${name}`;
  }

  return {
    tools,
    runTool,
    getPendingAction: () => pendingAction,
  };
}
