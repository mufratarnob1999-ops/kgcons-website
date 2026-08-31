import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { positioning } from "@/content/home";

export function Positioning() {
  return (
    <Section space="generous" divided>
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <Heading as="h2" size="title" className="md:col-span-6">
          {positioning.heading}
        </Heading>
        <div className="space-y-5 text-lead text-muted md:col-span-5 md:col-start-8">
          {positioning.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
