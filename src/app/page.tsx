import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

/*
  TEMPORARY PLACEHOLDER.

  The homepage sections (hero, positioning, services, methodology,
  perspective, consultation, about, FAQ) will replace this file entirely.
  Nothing here is intended for launch.
*/
export default function HomePage() {
  return (
    <Section space="generous">
      <Heading as="h1" size="title">
        Foundation in place.
      </Heading>
      <p className="measure mt-6 text-lead text-muted">
        The layout, typography and colour system are built. Homepage content
        has not been written yet. Open the style guide to review the visual
        system before we build on top of it.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/style-guide" variant="solid" size="lg">
          Open the style guide
        </Button>
      </div>
    </Section>
  );
}
