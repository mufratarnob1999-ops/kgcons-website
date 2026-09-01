import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  nextBookableDates,
  buildAvailability,
  type BookedSlot,
} from "@/lib/availability";

/** Public — no auth required. Browsing availability doesn't need login,
 * only booking does. */
export async function GET(request: NextRequest) {
  const daysParam = Number(request.nextUrl.searchParams.get("days") ?? "14");
  const dayCount = Number.isFinite(daysParam)
    ? Math.min(Math.max(daysParam, 1), 30)
    : 14;

  const dates = nextBookableDates(dayCount);
  const db = getDb();

  const { results } = await db
    .prepare(
      `SELECT date, start_time, track FROM appointments
       WHERE status = 'booked' AND date >= ? AND date <= ?`,
    )
    .bind(dates[0], dates[dates.length - 1])
    .all<BookedSlot>();

  const days = buildAvailability(dates, results ?? []);
  return NextResponse.json({ days });
}
