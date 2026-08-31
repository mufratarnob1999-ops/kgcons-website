import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { methodIntro } from "@/content/home";
import { method } from "@/content/method";

export function MethodSummary() {
  return (
    <Section space="generous" divided>
      <div className="max-w-2xl">
        <Heading as="h2" size="title">
          {methodIntro.heading}
        </Heading>
        <p className="measure mt-4 text-lead text-muted">
          {methodIntro.lead}
        </p>
      </div>

      <ol className="mt-14 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-5">
        {method.map((step, i) => (
          <li key={step.name}>
            <span className="font-display text-small text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Heading as="h3" size="subheading" className="mt-3">
              {step.name}
            </Heading>
            <p className="mt-2 text-small text-muted">{step.summary}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Button href={methodIntro.cta.href} variant="quiet">
          {methodIntro.cta.label} &#8594;
        </Button>
      </div>
    </Section>
  );
}
