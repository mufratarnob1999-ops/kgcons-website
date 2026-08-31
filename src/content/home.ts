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

export const positioning = {
  heading: "Your social media should do more than look good.",
  paragraphs: [
    "A good-looking feed isn't the point. It's what the feed does for the business or the person behind it that matters.",
    "Strategy and creative judgement, applied together, help businesses and creators build attention worth having, establish authority in their field, sharpen how they're positioned against everyone else doing the same thing, and turn an audience into real opportunities.",
    "Done consistently, that work builds digital value that lasts longer than any single post.",
  ],
} as const;

export const servicesIntro = {
  heading: "Six ways to work with us",
  lead: "Strategy, content and positioning, scoped to what you actually need.",
  cta: { label: "See all services", href: "/services" },
} as const;

export const methodIntro = {
  heading: "The Kishoreganj Method",
  lead: "A five-step process we use with every client, from first audit to long-term growth.",
  cta: { label: "See how we work", href: "/approach" },
} as const;

export const perspective = {
  heading: "Social media is not just a publishing channel.",
  paragraphs: [
    "Posting on a schedule isn't a strategy. A strong presence comes from positioning, strategy, content, consistency and adaptation working together — drop any one of them and the rest stop compounding.",
    "Most accounts that stall aren't short on effort. They're short on a clear answer to what the presence is actually for, and who it's actually speaking to.",
    "That's the gap between an account that looks active and one that's building something.",
  ],
} as const;

export const engagementsIntro = {
  heading: "How to work with us",
  lead: "Three ways in, depending on how much time you need.",
} as const;

export const faqIntro = {
  heading: "Frequently asked questions",
} as const;

export const finalCta = {
  heading: "Get a real answer, today.",
  lead: "Catch a consultant on a live session, or book a call and bring your actual problem.",
  primaryCta: { label: "Book a consultation", href: "/consultation" },
  secondaryCta: { label: "Contact us", href: "/contact" },
} as const;
