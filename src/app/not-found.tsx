import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section space="generous">
      <p className="text-label text-accent">404</p>
      <Heading as="h1" size="title" className="mt-4">
        This page doesn’t exist.
      </Heading>
      <p className="measure mt-5 text-lead text-muted">
        The link may be out of date, or the page may not have been built yet.
      </p>
      <div className="mt-10">
        <Button href="/" variant="outline" size="lg">
          Back to home
        </Button>
      </div>
    </Section>
  );
}
