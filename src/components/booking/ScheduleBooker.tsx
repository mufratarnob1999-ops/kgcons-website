"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import type { Track } from "@/lib/availability";

type DaySlots = {
  date: string;
  online: { time: string; available: boolean }[];
  in_person: { time: string; available: boolean }[];
};

function formatDateLabel(dateStr: string): { weekday: string; date: string } {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return {
    weekday: date.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    }),
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }),
  };
}

function formatTimeLabel(time: string): string {
  const [h] = time.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour12}:00 ${ampm}`;
}

const TRACKS: { value: Track; label: string }[] = [
  { value: "online", label: "Online" },
  { value: "in_person", label: "In person" },
];

export function ScheduleBooker() {
  const router = useRouter();
  const [days, setDays] = useState<DaySlots[] | null>(null);
  const [track, setTrack] = useState<Track>("online");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [booking, setBooking] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadAvailability() {
    const res = await fetch("/api/availability?days=14");
    const body = (await res.json()) as { days: DaySlots[] };
    setDays(body.days);
    setSelectedDate((current) => {
      if (current && body.days.some((d) => d.date === current)) return current;
      const firstOpenDay = body.days.find(
        (d) =>
          d.online.some((s) => s.available) ||
          d.in_person.some((s) => s.available),
      );
      return firstOpenDay?.date ?? body.days[0]?.date ?? null;
    });
  }

  useEffect(() => {
    loadAvailability();
  }, []);

  async function handleBook(date: string, time: string) {
    setMessage(null);
    setBooking(`${date}|${time}`);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, track }),
      });
      if (res.status === 401) {
        router.push("/account/login?next=/schedule");
        return;
      }
      if (res.status === 409) {
        setMessage("That slot was just booked by someone else — pick another.");
        await loadAvailability();
        return;
      }
      if (!res.ok) {
        setMessage("Couldn't book that slot. Try again.");
        return;
      }
      setMessage(
        "Booked. A confirmation is on its way to your email — you can also see it in your account.",
      );
      await loadAvailability();
    } finally {
      setBooking(null);
    }
  }

  if (!days) {
    return <p className="text-body text-muted">Loading availability…</p>;
  }

  const selectedDay = days.find((d) => d.date === selectedDate) ?? days[0];

  return (
    <div>
      <div className="flex gap-2">
        {TRACKS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTrack(t.value)}
            className={cn(
              "rounded-edge border px-4 py-2 text-small transition-colors duration-150 ease-standard",
              track === t.value
                ? "border-accent text-ink"
                : "border-hairline text-muted hover:border-neutral hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const label = formatDateLabel(day.date);
          const hasOpen = day[track].some((s) => s.available);
          return (
            <button
              key={day.date}
              type="button"
              disabled={!hasOpen}
              onClick={() => setSelectedDate(day.date)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-1 rounded-edge border px-4 py-3 text-small transition-colors duration-150 ease-standard disabled:opacity-40",
                selectedDate === day.date
                  ? "border-accent text-ink"
                  : "border-hairline text-muted hover:border-neutral hover:text-ink",
              )}
            >
              <span className="text-label tracking-[0.06em] uppercase">
                {label.weekday}
              </span>
              <span>{label.date}</span>
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {selectedDay[track].map((slot) => {
            const key = `${selectedDay.date}|${slot.time}`;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available || booking === key}
                onClick={() => handleBook(selectedDay.date, slot.time)}
                className={cn(
                  "rounded-edge border px-4 py-3 text-small transition-colors duration-150 ease-standard",
                  slot.available
                    ? "border-hairline text-ink hover:border-accent"
                    : "border-hairline text-muted opacity-40",
                )}
              >
                {booking === key ? "Booking…" : formatTimeLabel(slot.time)}
              </button>
            );
          })}
        </div>
      )}

      {message && <p className="mt-6 text-small text-ink">{message}</p>}

      <p className="mt-8 text-label text-muted">All times shown in Eastern Time.</p>
    </div>
  );
}
