import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { EngagementCards } from "@/components/sections/Engagements";

export const metadata = pageMetadata({
  title: "What we do",
  description:
    "Social strategy, content strategy, personal branding, business social, creator consulting and content systems.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section space="compact">
        <Reveal>
          <Heading as="h1" size="title">
            What we do
          </Heading>
          <p className="measure mt-5 text-lead text-muted">
            Six ways to work with us, scoped to what your business or your
            audience actually needs.
          </p>
        </Reveal>
      </Section>

      <Section space="generous" divided>
        <ul className="space-y-16">
          {services.map((service, i) => (
            <li key={service.slug} id={service.slug}>
              <Reveal
                delay={(i % 3) * 80}
                className="grid gap-6 border-t border-hairline pt-10 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <Heading as="h2" size="heading">
                    {service.name}
                  </Heading>
                  <p className="mt-3 text-small text-muted">{service.who}</p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="measure text-body text-muted">
                    {service.summary}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-small text-ink"
                      >
                        <span aria-hidden="true" className="text-accent">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section space="generous" tone="surface" divided>
        <Reveal>
          <Heading as="h2" size="title">
            How to work with us
          </Heading>
          <p className="measure mt-4 text-lead text-muted">
            Three ways in, depending on how much time you need.
          </p>
        </Reveal>
        <div className="mt-14">
          <EngagementCards />
        </div>
      </Section>
    </>
  );
}
