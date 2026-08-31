import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { servicesIntro } from "@/content/home";
import { services } from "@/content/services";

export function ServicesSummary() {
  return (
    <Section space="generous" tone="surface" divided>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Heading as="h2" size="title">
            {servicesIntro.heading}
          </Heading>
          <p className="measure mt-4 text-lead text-muted">
            {servicesIntro.lead}
          </p>
        </div>
        <Button href={servicesIntro.cta.href} variant="outline" size="lg">
          {servicesIntro.cta.label}
        </Button>
      </div>

      <ul className="mt-14 grid gap-x-8 gap-y-10 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug}>
            <Heading as="h3" size="subheading">
              {service.name}
            </Heading>
            <p className="mt-3 text-body text-muted">{service.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
