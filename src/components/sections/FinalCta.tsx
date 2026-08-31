import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";

export function FinalCta() {
  return (
    <Section space="generous" divided>
      <div className="mx-auto max-w-2xl text-center">
        <Heading as="h2" size="title">
          {finalCta.heading}
        </Heading>
        <p className="measure mx-auto mt-4 text-lead text-muted">
          {finalCta.lead}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={finalCta.primaryCta.href} variant="solid" size="lg">
            {finalCta.primaryCta.label}
          </Button>
          <Button href={finalCta.secondaryCta.href} variant="outline" size="lg">
            {finalCta.secondaryCta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
