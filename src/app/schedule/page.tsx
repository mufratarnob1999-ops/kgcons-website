import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { ScheduleBooker } from "@/components/booking/ScheduleBooker";

export const metadata = pageMetadata({
  title: "Schedule a consultation",
  description:
    "See real availability and book a consultation online or in person.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <Section space="generous">
      <Reveal>
        <Heading as="h1" size="title">
          Schedule a consultation
        </Heading>
        <p className="measure mt-4 text-lead text-muted">
          Pick an open time below — online or in person. You&rsquo;ll need
          to log in to confirm.
        </p>
      </Reveal>
      <div className="mt-12">
        <ScheduleBooker />
      </div>
    </Section>
  );
}
