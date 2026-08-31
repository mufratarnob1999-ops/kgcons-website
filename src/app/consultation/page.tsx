import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/content/site";
import { guarantee } from "@/content/guarantee";
import { engagements } from "@/content/services";

export const metadata = pageMetadata({
  title: "Book a consultation",
  description:
    "A one-to-one consultation call with a Kishoreganj Consultancy consultant, from $10 an hour, booked by email, WhatsApp or Telegram.",
  path: "/consultation",
});

const consultation = engagements.find((e) => e.name === "Consultation call")!;

export default function ConsultationPage() {
  return (
    <>
      <Section space="compact">
        <Reveal>
          <Heading as="h1" size="title">
            Book a consultation
          </Heading>
          <p className="measure mt-5 text-lead text-muted">
            A scheduled one-to-one call with a consultant. You bring the
            problem, we work through it together, and you leave with specific
            next steps rather than general advice.
          </p>
        </Reveal>
      </Section>

      <Section space="default" divided>
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Heading as="h2" size="heading">
              What it costs
            </Heading>
            <ul className="mt-6 space-y-4 border-t border-hairline pt-6">
              {consultation.rates!.map((rate) => (
                <li
                  key={rate.label}
                  className="flex items-baseline justify-between gap-6"
                >
                  <span className="text-small text-muted">{rate.label}</span>
                  <span className="whitespace-nowrap text-body text-ink">
                    {rate.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="measure mt-6 text-body text-muted">
              The fee is agreed with you before the call is booked — never
              after. Most questions are settled in a single hour.
            </p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5 md:col-start-8">
            <Heading as="h2" size="heading">
              How to book
            </Heading>
            <p className="measure mt-4 text-body text-muted">
              There's no booking calendar yet — reach out directly and we'll
              find a time that works.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <Button href={`mailto:${site.contact.email}`} variant="solid">
                Email us
              </Button>
              <Button
                href={whatsappLink(
                  site.contact.phones[0].whatsapp,
                  "Hi — I'd like to book a consultation.",
                )}
                variant="outline"
              >
                Message on WhatsApp
              </Button>
              <Button href={site.contact.telegram.href} variant="outline">
                Message on Telegram
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section space="default" tone="surface" divided width="narrow">
        <Reveal>
          <Heading as="h2" size="heading">
            {guarantee.heading}
          </Heading>
          <p className="measure mt-4 text-body text-muted">
            {guarantee.short} {guarantee.detail}
          </p>
        </Reveal>
      </Section>

      <Section space="default" divided width="narrow">
        <Reveal>
          <Heading as="h2" size="heading">
            How to pay
          </Heading>
          <p className="measure mt-4 text-body text-muted">
            Zelle Business, Venmo Business or PayPal Business. Card, Apple Pay
            and Google Pay are planned but not available yet.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
