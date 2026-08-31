import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { perspective } from "@/content/home";

export function Perspective() {
  return (
    <Section space="generous" tone="surface" divided width="narrow">
      <Heading as="h2" size="title">
        {perspective.heading}
      </Heading>
      <div className="measure mt-8 space-y-5 text-lead text-muted">
        {perspective.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
