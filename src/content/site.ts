/**
 * Site-wide facts and copy.
 *
 * Everything here is text you may want to change later without touching
 * component code. Edit this file, not the components.
 */

export const site = {
  name: "Kishoreganj Consultancy",
  shortName: "Kishoreganj",
  domain: "kgcons.org",
  url: "https://kgcons.org",

  /* Used as the browser tab title on the homepage and as the SEO default. */
  tagline: "Turn attention into growth.",

  /* One sentence. Appears in search results and link previews. */
  description:
    "A consultancy for businesses, creators and personal brands building a deliberate presence online. Strategy, content and growth.",

  /* Replace with your real contact details before launch. */
  contact: {
    email: "hello@kgcons.org",
    location: "Kishoreganj, Bangladesh",
  },

  /* Add real profiles here as they go live. Empty entries are not rendered. */
  social: [] as { label: string; href: string }[],
} as const;
