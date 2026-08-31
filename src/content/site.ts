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

  tagline: "Turn attention into growth.",

  description:
    "Social media consultancy for businesses, creators and personal brands. Strategy, content and growth — with consultants you can actually reach.",

  founded: "2026",

  /* The two registered entities. Shown in the footer and the legal pages. */
  entities: [
    { name: "Kishoreganj Consultancy LLC", jurisdiction: "Wyoming, USA" },
    { name: "Kishoreganj Consultancy Ltd", jurisdiction: "Bangladesh" },
  ],

  founders: [
    {
      name: "Mufrat Mehrin Arnob",
      role: "Founder",
      background: "BSc Cybersecurity, CUNY. Diploma in Civil Engineering.",
    },
    {
      name: "Hojaifa Ahmed Seyam",
      role: "Founder",
      background: "BSc Biotechnology, CUNY.",
    },
  ],

  /* Languages the team works in. A real advantage — say it plainly. */
  languages: ["English", "Bangla", "Hindi", "Urdu", "Spanish"],

  contact: {
    email: "mufrat@kgcons.org",
    telegram: { handle: "@kgcons", href: "https://t.me/kgcons" },
    phones: [
      {
        region: "United States",
        display: "+1 347 866 6018",
        tel: "+13478666018",
        whatsapp: "13478666018",
      },
      {
        region: "Bangladesh",
        display: "+880 1401 217597",
        tel: "+8801401217597",
        whatsapp: "8801401217597",
      },
    ],
  },

  /**
   * Real, external same-entity profiles only — this feeds the JSON-LD
   * `sameAs` field, which should never point at our own site. The visible
   * icon row (footer, /contact) is separate — see socialIcons.ts — because
   * it currently shows placeholder icons that aren't live profiles yet.
   */
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Kishoreganj-Consultancy-61594207731801/",
    },
  ] as { label: string; href: string }[],
} as const;

/** WhatsApp deep link for a given number, with the message pre-filled. */
export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
