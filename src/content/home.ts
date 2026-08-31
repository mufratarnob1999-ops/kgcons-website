/**
 * Homepage copy.
 *
 * Edit the words here, not in the components. Each section of the homepage
 * gets its own exported object as it is built.
 */

export const hero = {
  /* Small label above the headline. Names the division. */
  eyebrow: "Social Media Consultancy",

  /**
   * The headline, one array entry per line. Each line animates in
   * separately, so the line breaks are deliberate rather than left to
   * the browser. Adding or removing a line needs no other change.
   */
  headline: ["Turn attention", "into growth."],

  /* One sentence. Says what the company does and who it is for. */
  lead:
    "We help businesses and content creators build distinctive digital brands through strategy, content, and social media.",

  primaryCta: { label: "Explore services", href: "/services" },
  secondaryCta: { label: "Book a consultation", href: "/consultation" },

  /**
   * The short list along the bottom rule. These are disciplines, not
   * claims — no numbers, no results, nothing that would need proving.
   */
  disciplines: ["Strategy", "Content", "Positioning", "Growth"],
} as const;
