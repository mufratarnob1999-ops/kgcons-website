import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { method } from "@/content/method";

export const metadata = pageMetadata({
  title: "How we work",
  description:
    "The Kishoreganj Method — five steps from discovery to long-term growth.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <Section space="compact">
        <Heading as="h1" size="title">
          The Kishoreganj Method
        </Heading>
        <p className="measure mt-5 text-lead text-muted">
          Five steps we use with every client. There are no case studies to
          point to yet, so this is the part that should tell you how we
          actually work.
        </p>
      </Section>

      <Section space="generous" divided>
        <ol className="space-y-16">
          {method.map((step, i) => (
            <li
              key={step.name}
              className="grid gap-4 border-t border-hairline pt-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-3">
                <span className="font-display text-title text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Heading as="h2" size="heading" className="mt-2">
                  {step.name}
                </Heading>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="text-lead text-ink">{step.summary}</p>
                <p className="measure mt-4 text-body text-muted">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section space="default" tone="surface" divided>
        <div className="mx-auto max-w-xl text-center">
          <Heading as="h2" size="heading">
            Ready to start with Discover?
          </Heading>
          <p className="measure mx-auto mt-4 text-body text-muted">
            Book a consultation and we'll go through your current position
            together.
          </p>
          <div className="mt-8">
            <Button href="/consultation" variant="solid" size="lg">
              Book a consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
