/**
 * US federal holidays, computed from date rules rather than a hardcoded
 * list that goes stale. Fixed-date holidays get the federal Saturday→
 * Friday / Sunday→Monday "observed" shift; floating (Nth-weekday)
 * holidays are already defined as "the Nth weekday of the month" and
 * never land on a weekend, so no shift applies to them.
 */

type CalendarDate = { year: number; month: number; day: number }; // month: 1-12

function toDateStr({ year, month, day }: CalendarDate): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** 0 = Sunday ... 6 = Saturday. Computed in UTC to avoid local-TZ drift. */
function dayOfWeek(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** The date of the Nth occurrence of `weekday` (0=Sun..6=Sat) in a month. */
function nthWeekday(
  year: number,
  month: number,
  weekday: number,
  n: number,
): CalendarDate {
  const first = dayOfWeek(year, month, 1);
  const offset = (weekday - first + 7) % 7;
  return { year, month, day: 1 + offset + (n - 1) * 7 };
}

/** The date of the last occurrence of `weekday` in a month. */
function lastWeekday(year: number, month: number, weekday: number): CalendarDate {
  const last = daysInMonth(year, month);
  const lastDow = dayOfWeek(year, month, last);
  const offset = (lastDow - weekday + 7) % 7;
  return { year, month, day: last - offset };
}

function shiftDays({ year, month, day }: CalendarDate, delta: number): CalendarDate {
  const d = new Date(Date.UTC(year, month - 1, day + delta));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

/** Applies the federal Saturday→Friday / Sunday→Monday observed shift. */
function observed(date: CalendarDate): CalendarDate {
  const dow = dayOfWeek(date.year, date.month, date.day);
  if (dow === 6) return shiftDays(date, -1);
  if (dow === 0) return shiftDays(date, 1);
  return date;
}

function federalHolidaysForYear(year: number): CalendarDate[] {
  return [
    observed({ year, month: 1, day: 1 }), // New Year's Day
    nthWeekday(year, 1, 1, 3), // MLK Day
    nthWeekday(year, 2, 1, 3), // Washington's Birthday
    lastWeekday(year, 5, 1), // Memorial Day
    observed({ year, month: 6, day: 19 }), // Juneteenth
    observed({ year, month: 7, day: 4 }), // Independence Day
    nthWeekday(year, 9, 1, 1), // Labor Day
    nthWeekday(year, 10, 1, 2), // Columbus Day
    observed({ year, month: 11, day: 11 }), // Veterans Day
    nthWeekday(year, 11, 4, 4), // Thanksgiving
    observed({ year, month: 12, day: 25 }), // Christmas Day
  ];
}

/**
 * Federal holiday dates (YYYY-MM-DD) from `startDate` through `endDate`
 * inclusive, with a year of padding on each side so an observed-shift
 * date landing just outside the requested range (e.g. New Year's Day
 * observed on the preceding Dec 31) isn't missed.
 */
export function federalHolidaysInRange(
  startDate: string,
  endDate: string,
): Set<string> {
  const startYear = Number(startDate.slice(0, 4)) - 1;
  const endYear = Number(endDate.slice(0, 4)) + 1;
  const holidays = new Set<string>();
  for (let year = startYear; year <= endYear; year++) {
    for (const date of federalHolidaysForYear(year)) {
      const str = toDateStr(date);
      if (str >= startDate && str <= endDate) holidays.add(str);
    }
  }
  return holidays;
}

export function isFederalHoliday(dateStr: string): boolean {
  return federalHolidaysInRange(dateStr, dateStr).has(dateStr);
}
