import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { getDb } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { AppointmentList } from "@/components/booking/AppointmentList";
import { LogoutButton } from "@/components/forms/LogoutButton";

export const metadata = pageMetadata({
  title: "Your account",
  description: "Manage your consultation appointments.",
  path: "/account",
  noIndex: true,
});

type AppointmentRow = {
  id: number;
  track: "online" | "in_person";
  date: string;
  start_time: string;
  status: "booked" | "cancelled";
};

export default async function AccountPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/account/login?next=/account");
  }

  const { results } = await getDb()
    .prepare(
      `SELECT id, track, date, start_time, status FROM appointments
       WHERE user_id = ? ORDER BY date, start_time`,
    )
    .bind(session.userId)
    .all<AppointmentRow>();

  return (
    <Section space="generous">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Heading as="h1" size="title">
              Your appointments
            </Heading>
            <p className="measure mt-4 text-lead text-muted">
              Signed in as {session.email}.
            </p>
          </div>
          <LogoutButton />
        </div>
      </Reveal>
      <div className="mt-12">
        <AppointmentList appointments={results ?? []} />
      </div>
    </Section>
  );
}
