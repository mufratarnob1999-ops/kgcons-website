import { NextRequest, NextResponse } from "next/server";
import { getDb, getEnv } from "@/lib/db";
import { getSessionFromRequest, isTrustedOrigin } from "@/lib/auth";
import { isValidSlot, type Track } from "@/lib/availability";
import { sendBookingConfirmation } from "@/lib/email";

export async function GET(request: NextRequest) {
  const db = getDb();
  const session = await getSessionFromRequest(db, request);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { results } = await db
    .prepare(
      `SELECT id, track, date, start_time, status, created_at
       FROM appointments WHERE user_id = ? ORDER BY date, start_time`,
    )
    .bind(session.userId)
    .all();

  return NextResponse.json({ appointments: results ?? [] });
}

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const db = getDb();
  const session = await getSessionFromRequest(db, request);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const date = typeof body?.date === "string" ? body.date : "";
  const time = typeof body?.time === "string" ? body.time : "";
  const track = typeof body?.track === "string" ? body.track : "";

  if (!isValidSlot(date, time, track)) {
    return NextResponse.json({ error: "invalid_slot" }, { status: 400 });
  }

  try {
    await db
      .prepare(
        `INSERT INTO appointments (user_id, track, date, start_time, status)
         VALUES (?, ?, ?, ?, 'booked')`,
      )
      .bind(session.userId, track, date, time)
      .run();
  } catch (err) {
    if (err instanceof Error && err.message.includes("UNIQUE constraint")) {
      return NextResponse.json({ error: "slot_unavailable" }, { status: 409 });
    }
    throw err;
  }

  await sendBookingConfirmation(getEnv(), {
    to: session.email,
    name: session.name,
    date,
    time,
    track: track as Track,
  });

  return NextResponse.json({ ok: true });
}
