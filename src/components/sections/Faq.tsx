import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { faqIntro } from "@/content/home";
import { faq } from "@/content/faq";

/** Native <details>/<summary> — no client-side JS needed. */
export function Faq() {
  return (
    <Section space="generous" tone="surface" divided width="narrow">
      <Heading as="h2" size="title">
        {faqIntro.heading}
      </Heading>

      <div className="mt-12 border-t border-hairline">
        {faq.map((item) => (
          <details key={item.question} className="group border-b border-hairline py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-subheading font-display text-ink marker:content-none">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-lead text-muted transition-transform duration-200 ease-standard group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="measure mt-4 text-body text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
