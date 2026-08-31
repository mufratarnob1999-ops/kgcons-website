import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Style guide",
  description: "Internal reference for the Kishoreganj Consultancy design system.",
  path: "/style-guide",
  noIndex: true,
});

const palette = [
  { name: "Canvas", value: "#0A0A0A", use: "Page background" },
  { name: "Surface", value: "#111111", use: "Raised panels and bands" },
  { name: "Ink", value: "#F5F3EE", use: "Primary text" },
  { name: "Muted", value: "#969696", use: "Secondary text" },
  { name: "Neutral", value: "#D6D2C8", use: "Warm neutral detail" },
  { name: "Accent", value: "#C7FF3D", use: "One emphasis per screen" },
  { name: "Hairline", value: "#1F1F1F", use: "Rules and dividers" },
];

export default function StyleGuidePage() {
  return (
    <>
      <Section space="compact">
        <Heading as="h1" size="title">
          Style guide
        </Heading>
        <p className="measure mt-5 text-lead text-muted">
          An internal reference, not a public page. It is excluded from search
          engines. Everything below is generated from the same tokens the real
          site uses, so what you see here is what the site will look like.
        </p>
      </Section>

      <Section space="default" divided>
        <Heading as="h2" size="heading">
          Colour
        </Heading>
        <div className="mt-10 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {palette.map((c) => (
            <div key={c.name} className="bg-canvas p-6">
              <div
                className="h-20 w-full rounded-edge border border-hairline"
                style={{ backgroundColor: c.value }}
              />
              <p className="mt-4 text-small font-medium text-ink">{c.name}</p>
              <p className="text-small text-muted">{c.value}</p>
              <p className="mt-1 text-label text-muted">{c.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section space="default" divided>
        <Heading as="h2" size="heading">
          Typography
        </Heading>
        <p className="measure mt-4 text-body text-muted">
          Manrope sets every heading. Inter sets every paragraph. Sizes scale
          smoothly with the width of the screen, so there is no point where
          text suddenly jumps.
        </p>

        <div className="mt-12 space-y-10 border-t border-hairline pt-10">
          <TypeRow label="Display — Manrope 700">
            <p className="font-display text-display">
              Turn attention into growth.
            </p>
          </TypeRow>
          <TypeRow label="Title — Manrope 700">
            <p className="font-display text-title">
              Strategy before content.
            </p>
          </TypeRow>
          <TypeRow label="Heading — Manrope 600">
            <p className="font-display text-heading">How we work</p>
          </TypeRow>
          <TypeRow label="Subheading — Manrope 600">
            <p className="font-display text-subheading">Content strategy</p>
          </TypeRow>
          <TypeRow label="Lead — Inter 400">
            <p className="measure text-lead text-muted">
              A consultancy for businesses, creators and personal brands
              building a deliberate presence online.
            </p>
          </TypeRow>
          <TypeRow label="Body — Inter 400">
            <p className="measure text-body text-muted">
              Body text is limited to roughly sixty-eight characters per line.
              Beyond that the eye loses its place returning to the start of the
              next line, which is why long measures feel tiring to read even
              when nothing else about the page has changed.
            </p>
          </TypeRow>
        </div>
      </Section>

      <Section space="default" divided>
        <Heading as="h2" size="heading">
          Buttons
        </Heading>
        <p className="measure mt-4 text-body text-muted">
          Only the solid button carries the accent colour, and only one should
          appear on screen at a time.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/style-guide" variant="solid" size="lg">
            Book a consultation
          </Button>
          <Button href="/style-guide" variant="outline" size="lg">
            See how we work
          </Button>
          <Button href="/style-guide" variant="quiet">
            Read more
          </Button>
        </div>
      </Section>

      <Section space="default" tone="surface" divided>
        <Heading as="h2" size="heading">
          Surface band
        </Heading>
        <p className="measure mt-4 text-body text-muted">
          Sections can sit on a slightly lifted surface to break up a long
          page without introducing another colour.
        </p>
      </Section>
    </>
  );
}

function TypeRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      <p className="text-label text-muted md:col-span-3">{label}</p>
      <div className="md:col-span-9">{children}</div>
    </div>
  );
}
