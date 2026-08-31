import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { engagements } from "@/content/services";

/**
 * The three ways to work with us. Used on the homepage and on /services.
 * Cards are justified here — these three are genuinely comparable options
 * being weighed against each other, unlike the services grid above them.
 */
export function EngagementCards() {
  return (
    <ul className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
      {engagements.map((item, i) => (
        <li key={item.name} className="bg-canvas">
          <Reveal delay={i * 90} className="flex h-full flex-col p-8">
            <Heading as="h3" size="subheading">
              {item.name}
            </Heading>
            <p className="mt-2 text-small font-medium text-accent">
              {item.price}
            </p>
            <p className="mt-4 flex-1 text-small text-muted">
              {item.description}
            </p>
            <p className="mt-4 text-label text-muted">{item.detail}</p>
            <Button
              href={item.cta.href}
              variant="outline"
              size="md"
              className="mt-6 self-start"
            >
              {item.cta.label}
            </Button>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
