import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";

/*
  HERO — typography-led.

  The headline is the only visual. There is no imagery, no gradient and no
  decoration; the impression comes from scale, spacing and restraint. The
  accent colour appears exactly once, on the eyebrow marker.

  Motion: each line rises and fades in, one after another. Anyone who has
  asked their system to reduce motion gets the finished state immediately —
  the rule in globals.css collapses the duration, and `both` fill mode means
  the end state still applies, so nothing is left invisible.
*/

/** Stagger between reveals, in milliseconds. */
const STEP = 90;

export function Hero() {
  return (
    <section className="relative flex min-h-[86svh] items-center pt-16 pb-20 md:min-h-[90svh] md:pt-24 md:pb-28">
      <style>{`
        @keyframes kg-rise {
          from { opacity: 0; transform: translate3d(0, 0.4em, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .kg-rise {
          animation: kg-rise var(--duration-slow) var(--ease-standard) both;
        }
      `}</style>

      <Container>
        {/* Eyebrow ------------------------------------------------------ */}
        <p
          className="kg-rise flex items-center gap-3 text-label font-medium tracking-[0.14em] text-muted uppercase"
          style={{ animationDelay: "0ms" }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-px w-8 bg-accent"
          />
          {hero.eyebrow}
        </p>

        {/* Headline ----------------------------------------------------- */}
        <Heading as="h1" size="display" className="mt-8 md:mt-10">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="kg-rise block"
                style={{ animationDelay: `${(i + 1) * STEP}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </Heading>

        {/* Supporting line ---------------------------------------------- */}
        <p
          className="kg-rise measure mt-8 text-lead text-muted md:mt-10"
          style={{ animationDelay: `${(hero.headline.length + 1) * STEP}ms` }}
        >
          {hero.lead}
        </p>

        {/* Calls to action ---------------------------------------------- */}
        <div
          className="kg-rise mt-10 flex flex-wrap items-center gap-3 md:mt-12"
          style={{ animationDelay: `${(hero.headline.length + 2) * STEP}ms` }}
        >
          <Button href={hero.primaryCta.href} variant="solid" size="lg">
            {hero.primaryCta.label}
            <span aria-hidden="true" className="ml-2">
              &#8599;
            </span>
          </Button>
          <Button href={hero.secondaryCta.href} variant="outline" size="lg">
            {hero.secondaryCta.label}
          </Button>
        </div>

        {/* Bottom rule -------------------------------------------------- */}
        <div
          className="kg-rise mt-16 border-t border-hairline pt-6 md:mt-24"
          style={{ animationDelay: `${(hero.headline.length + 3) * STEP}ms` }}
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-label text-muted">
            {hero.disciplines.map((item) => (
              <li key={item} className="tracking-[0.08em] uppercase">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
