import { isFederalHoliday } from "./holidays";

export type Track = "online" | "in_person";
export const TRACKS: Track[] = ["online", "in_person"];

/** 9am–5pm Eastern, 1-hour slots — matches the hourly rate structure. */
export const SLOT_TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;
export type SlotTime = (typeof SLOT_TIMES)[number];

function dayOfWeekUTC(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Weekday (Mon–Fri) and not a US federal holiday. */
export function isBookableWeekday(dateStr: string): boolean {
  const dow = dayOfWeekUTC(dateStr);
  if (dow === 0 || dow === 6) return false;
  return !isFederalHoliday(dateStr);
}

/**
 * "Now" in Eastern Time, as YYYY-MM-DD and HH:MM (24h) — used to compare
 * against slot times without a date library. Workers ship full ICU/Intl
 * support natively.
 */
export function nowInEastern(): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function isPastSlot(dateStr: string, timeStr: string): boolean {
  const { date, time } = nowInEastern();
  if (dateStr < date) return true;
  if (dateStr > date) return false;
  return timeStr <= time;
}

/**
 * True if this date/time/track combination is a real, currently bookable
 * slot per the fixed grid. Used to validate booking requests server-side
 * — the DB constraint alone stops double-booking, but nothing stops a
 * client POSTing an out-of-grid time otherwise.
 */
export function isValidSlot(
  dateStr: string,
  timeStr: string,
  track: string,
): track is Track {
  if (!TRACKS.includes(track as Track)) return false;
  if (!SLOT_TIMES.includes(timeStr as SlotTime)) return false;
  if (!isBookableWeekday(dateStr)) return false;
  if (isPastSlot(dateStr, timeStr)) return false;
  return true;
}

/** The next `count` bookable weekdays, starting today, in Eastern Time. */
export function nextBookableDates(count: number): string[] {
  const { date: todayET } = nowInEastern();
  const [y, m, d] = todayET.split("-").map(Number);
  const dates: string[] = [];
  let cursor = new Date(Date.UTC(y, m - 1, d));
  while (dates.length < count) {
    const dateStr = cursor.toISOString().slice(0, 10);
    if (isBookableWeekday(dateStr)) dates.push(dateStr);
    cursor = new Date(cursor.getTime() + 86_400_000);
  }
  return dates;
}

export type BookedSlot = { date: string; start_time: string; track: Track };
export type DaySlots = {
  date: string;
  online: { time: SlotTime; available: boolean }[];
  in_person: { time: SlotTime; available: boolean }[];
};

/**
 * Merges the fixed slot grid with already-booked rows to produce
 * open/taken state per date and track. Pure — takes booked rows as data,
 * doesn't query D1 itself, so it's easy to reason about independently of
 * the database.
 */
export function buildAvailability(
  dates: string[],
  booked: BookedSlot[],
): DaySlots[] {
  const bookedSet = new Set(
    booked.map((b) => `${b.date}|${b.start_time}|${b.track}`),
  );
  return dates.filter(isBookableWeekday).map((date) => ({
    date,
    online: SLOT_TIMES.map((time) => ({
      time,
      available:
        !isPastSlot(date, time) && !bookedSet.has(`${date}|${time}|online`),
    })),
    in_person: SLOT_TIMES.map((time) => ({
      time,
      available:
        !isPastSlot(date, time) &&
        !bookedSet.has(`${date}|${time}|in_person`),
    })),
  }));
}
