import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { engagementsIntro } from "@/content/home";
import { EngagementCards } from "./Engagements";

export function HowToWorkWithUs() {
  return (
    <Section space="generous" divided>
      <Heading as="h2" size="title">
        {engagementsIntro.heading}
      </Heading>
      <p className="measure mt-4 text-lead text-muted">
        {engagementsIntro.lead}
      </p>

      <div className="mt-14">
        <EngagementCards />
      </div>
    </Section>
  );
}
