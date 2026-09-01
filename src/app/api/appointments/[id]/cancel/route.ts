import { NextRequest, NextResponse } from "next/server";
import { getDb, getEnv } from "@/lib/db";
import { getSessionFromRequest, isTrustedOrigin } from "@/lib/auth";
import { sendCancellationConfirmation } from "@/lib/email";
import type { Track } from "@/lib/availability";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const db = getDb();
  const session = await getSessionFromRequest(db, request);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // WHERE user_id = ? doubles as the ownership check — a mismatch and a
  // missing appointment both return 404, so we don't leak which.
  const appointment = await db
    .prepare(
      `SELECT track, date, start_time FROM appointments
       WHERE id = ? AND user_id = ? AND status = 'booked'`,
    )
    .bind(id, session.userId)
    .first<{ track: Track; date: string; start_time: string }>();

  if (!appointment) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  await db
    .prepare(
      `UPDATE appointments SET status = 'cancelled', cancelled_at = datetime('now')
       WHERE id = ? AND user_id = ? AND status = 'booked'`,
    )
    .bind(id, session.userId)
    .run();

  await sendCancellationConfirmation(getEnv(), {
    to: session.email,
    name: session.name,
    date: appointment.date,
    time: appointment.start_time,
    track: appointment.track,
  });

  return NextResponse.json({ ok: true });
}
