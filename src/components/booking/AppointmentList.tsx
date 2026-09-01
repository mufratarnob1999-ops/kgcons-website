"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";

type AppointmentRow = {
  id: number;
  track: "online" | "in_person";
  date: string;
  start_time: string;
  status: "booked" | "cancelled";
};

function formatSlot(date: string, time: string, track: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const dateLabel = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" },
  );
  const [h] = time.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${dateLabel} at ${hour12}:00 ${ampm} ET — ${track === "online" ? "Online" : "In person"}`;
}

export function AppointmentList({
  appointments,
}: {
  appointments: AppointmentRow[];
}) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState<number | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appointments.filter(
    (a) => a.status === "booked" && a.date >= today,
  );
  const past = appointments.filter(
    (a) => a.status !== "booked" || a.date < today,
  );

  async function handleCancel(id: number) {
    setCancelling(id);
    try {
      await fetch(`/api/appointments/${id}/cancel`, { method: "POST" });
      router.refresh();
    } finally {
      setCancelling(null);
    }
  }

  return (
    <div className="space-y-14">
      <div>
        <Heading as="h2" size="heading">
          Upcoming
        </Heading>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-body text-muted">
            No upcoming appointments.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
            {upcoming.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-body text-ink">
                  {formatSlot(a.date, a.start_time, a.track)}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  disabled={cancelling === a.id}
                  onClick={() => handleCancel(a.id)}
                >
                  {cancelling === a.id ? "Cancelling…" : "Cancel"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {past.length > 0 && (
        <div>
          <Heading as="h2" size="heading">
            Past
          </Heading>
          <ul className="mt-6 divide-y divide-hairline border-t border-hairline">
            {past.map((a) => (
              <li key={a.id} className="py-5 text-body text-muted">
                {formatSlot(a.date, a.start_time, a.track)}
                {a.status === "cancelled" && " — cancelled"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
