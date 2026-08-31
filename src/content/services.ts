/**
 * Services.
 *
 * `slug` is only used for anchors on the services page today. If individual
 * service pages are added later at /services/[slug], these become the URLs
 * and nothing else has to change.
 */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  who: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "social-strategy",
    name: "Social strategy",
    summary:
      "A clear plan for what your social presence is meant to achieve, who it speaks to, and how it earns attention worth having.",
    who: "Businesses with accounts that post consistently but don't produce much.",
    includes: [
      "Audit of your current accounts and audience",
      "Positioning and audience definition",
      "Platform priorities, with reasons",
      "A written strategy you keep",
    ],
  },
  {
    slug: "content-strategy",
    name: "Content strategy",
    summary:
      "What to make, why it matters, and how it connects to something you actually want — enquiries, sales, or a reputation you can charge for.",
    who: "Anyone posting regularly without a clear sense of what is working.",
    includes: [
      "Content pillars and formats",
      "A posting rhythm you can sustain",
      "Hooks, structure and first-line guidance",
      "What to measure, and what to ignore",
    ],
  },
  {
    slug: "personal-branding",
    name: "Personal branding",
    summary:
      "Building a digital identity for a founder, professional or creator that reads as credible rather than performed.",
    who: "Founders and professionals whose name carries the business.",
    includes: [
      "Narrative and point of view",
      "Profile and bio direction",
      "Tone and boundaries — what you talk about",
      "A plan for showing up consistently",
    ],
  },
  {
    slug: "business-social",
    name: "Business social",
    summary:
      "Making social media a working part of how the business finds customers, instead of a channel someone updates when there is time.",
    who: "Small and mid-sized businesses, local services, e-commerce.",
    includes: [
      "Channel strategy tied to how you sell",
      "Enquiry and lead handling",
      "Offers and campaign structure",
      "Guidance for whoever posts day to day",
    ],
  },
  {
    slug: "creator-consulting",
    name: "Creator consulting",
    summary:
      "Strategic guidance for creators who want a stronger position and an audience that translates into income.",
    who: "Creators growing an audience, or stuck at a ceiling.",
    includes: [
      "Positioning against everyone else in your niche",
      "Format and series development",
      "Growth and retention review",
      "Routes to revenue that fit your audience",
    ],
  },
  {
    slug: "content-systems",
    name: "Content systems",
    summary:
      "Repeatable processes that make good content easier to produce, so consistency stops depending on motivation.",
    who: "Teams and creators who start strong and then fall off.",
    includes: [
      "Production workflow end to end",
      "Planning and scheduling setup",
      "Repurposing across platforms",
      "Simple review and handover process",
    ],
  },
];

export type Rate = { label: string; price: string };

/** How people can work with us. Three routes, deliberately different. */
export const engagements: {
  name: string;
  price: string;
  description: string;
  detail: string;
  cta: { label: string; href: string };
  rates?: Rate[];
}[] = [
  {
    name: "Live sessions",
    price: "Free, or $5–50 for detailed answers",
    description:
      "Our consultants go live on Instagram, Facebook and TikTok most days and answer questions from anyone watching. Straightforward questions are answered free. Anything that needs real work is quoted on the spot before we start.",
    detail: "Payment by Zelle Business, Venmo Business or PayPal Business.",
    cta: { label: "Find us on live", href: "/contact" },
  },
  {
    name: "Consultation call",
    price: "$120–150 per hour",
    description:
      "A scheduled one-to-one call with a consultant. You bring the problem, we work through it together, and you leave with specific next steps rather than general advice. Most questions are settled in a single hour.",
    detail:
      "Offshore consultants are also available from $10 an hour. Booked by email, WhatsApp or Telegram.",
    cta: { label: "Book a consultation", href: "/consultation" },
    rates: [
      { label: "In person — New York City or Wyoming", price: "$150 / hour" },
      { label: "Online — US-based consultant", price: "$120 / hour" },
      { label: "Online — offshore consultant", price: "$10–150 / hour" },
    ],
  },
  {
    name: "Ongoing advisory",
    price: "Quoted per engagement",
    description:
      "For businesses and creators who want a consultant available over months rather than an hour. Scope, rhythm and fee are agreed in writing before anything starts.",
    detail: "Availability is limited. Start with a consultation call.",
    cta: { label: "Enquire", href: "/contact" },
  },
];
