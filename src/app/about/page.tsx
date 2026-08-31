import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { about } from "@/content/about";

export const metadata = pageMetadata({
  title: "About",
  description:
    "The founders and team behind Kishoreganj Consultancy, and the languages we work in.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section space="compact">
        <Heading as="h1" size="title">
          {about.heading}
        </Heading>
        <p className="measure mt-5 text-lead text-muted">{about.lead}</p>
      </Section>

      <Section space="default" divided>
        <Heading as="h2" size="heading">
          Founders
        </Heading>
        <ul className="mt-10 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2">
          {site.founders.map((founder) => (
            <li key={founder.name}>
              <Heading as="h3" size="subheading">
                {founder.name}
              </Heading>
              <p className="mt-1 text-small text-accent">{founder.role}</p>
              <p className="mt-3 text-body text-muted">{founder.background}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section space="default" tone="surface" divided width="narrow">
        <Heading as="h2" size="heading">
          {about.experience.heading}
        </Heading>
        <div className="measure mt-6 space-y-4 text-body text-muted">
          {about.experience.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section space="default" divided>
        <Heading as="h2" size="heading">
          {about.languages.heading}
        </Heading>
        <p className="measure mt-5 text-body text-muted">
          {about.languages.lead}
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {site.languages.map((language) => (
            <li
              key={language}
              className="rounded-edge border border-hairline px-4 py-2 text-small text-ink"
            >
              {language}
            </li>
          ))}
        </ul>
      </Section>

      <Section space="default" tone="surface" divided>
        <Heading as="h2" size="heading">
          {about.team.heading}
        </Heading>
        <p className="measure mt-5 text-body text-muted">{about.team.lead}</p>
      </Section>

      <Section space="default" divided>
        <Heading as="h2" size="heading">
          Entities
        </Heading>
        <ul className="mt-8 space-y-3 text-body text-muted">
          {site.entities.map((entity) => (
            <li key={entity.name}>
              <span className="text-ink">{entity.name}</span> —{" "}
              {entity.jurisdiction}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-small text-muted">
          Trading since March 2026. Clients are global, primarily in the
          United States.
        </p>
      </Section>
    </>
  );
}
