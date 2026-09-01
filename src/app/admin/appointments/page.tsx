import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { pageMetadata } from "@/lib/seo";
import { getDb, getEnv } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";

export const metadata = pageMetadata({
  title: "All appointments",
  description: "Admin view of all booked consultations.",
  path: "/admin/appointments",
  noIndex: true,
});

type AppointmentRow = {
  id: number;
  track: "online" | "in_person";
  date: string;
  start_time: string;
  status: "booked" | "cancelled";
  client_name: string;
  client_email: string;
};

function formatSlot(date: string, time: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const dateLabel = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(
    "en-US",
    { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" },
  );
  const [h] = time.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${dateLabel}, ${hour12}:00 ${ampm}`;
}

export default async function AdminAppointmentsPage() {
  // getSessionFromCookies() touches cookies() first internally — keep it
  // as the first call here too, same reasoning as /account.
  const session = await getSessionFromCookies();
  const env = getEnv();

  if (!session || session.email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) {
    redirect("/");
  }

  const { results } = await getDb()
    .prepare(
      `SELECT appointments.id, appointments.track, appointments.date, appointments.start_time,
              appointments.status, users.name as client_name, users.email as client_email
       FROM appointments JOIN users ON users.id = appointments.user_id
       ORDER BY appointments.date, appointments.start_time`,
    )
    .all<AppointmentRow>();

  const appointments = results ?? [];

  return (
    <Section space="generous">
      <Heading as="h1" size="title">
        All appointments
      </Heading>
      <p className="measure mt-4 text-lead text-muted">
        {appointments.length} total, across all clients.
      </p>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-small">
          <thead>
            <tr className="border-b border-hairline text-label tracking-[0.06em] text-muted uppercase">
              <th className="py-3 pr-4 font-medium">When</th>
              <th className="py-3 pr-4 font-medium">Track</th>
              <th className="py-3 pr-4 font-medium">Client</th>
              <th className="py-3 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="py-4 pr-4 text-ink">
                  {formatSlot(a.date, a.start_time)}
                </td>
                <td className="py-4 pr-4 text-muted">
                  {a.track === "online" ? "Online" : "In person"}
                </td>
                <td className="py-4 pr-4 text-muted">
                  {a.client_name} — {a.client_email}
                </td>
                <td className="py-4 pr-4 text-muted">
                  {a.status === "booked" ? "Booked" : "Cancelled"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <p className="py-8 text-body text-muted">No appointments yet.</p>
        )}
      </div>
    </Section>
  );
}
