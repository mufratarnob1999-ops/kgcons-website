/**
 * The scope guarantee.
 *
 * Deliberately not a results guarantee — see DECISIONS_NEEDED.md for why.
 * This is the one version of the promise that should appear anywhere on
 * the site. Do not paraphrase it differently in different places.
 */
export const guarantee = {
  heading: "Our guarantee",
  short: "If we don't deliver what we agreed to deliver, you get your money back.",
  detail:
    "Tell us within 30 days of the work being delivered, and we'll refund it. This is a guarantee on the work we do, not on what a platform's algorithm or your own market does afterward — no consultancy can promise that, and we won't pretend to.",
} as const;
