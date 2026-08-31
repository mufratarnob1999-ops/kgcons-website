import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { positioning } from "@/content/home";

export function Positioning() {
  return (
    <Section space="generous" divided>
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-6">
          <Heading as="h2" size="title">
            {positioning.heading}
          </Heading>
        </Reveal>
        <Reveal
          delay={120}
          className="space-y-5 text-lead text-muted md:col-span-5 md:col-start-8"
        >
          {positioning.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
