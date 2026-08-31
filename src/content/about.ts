/**
 * About page copy. Facts about the founders and team live in site.ts;
 * this file is the narrative around them.
 */
export const about = {
  heading: "Two founders, one team of consultants.",
  lead:
    "Kishoreganj Consultancy is built and run by two people, with a team of offshore consultants who handle the daily live sessions.",

  experience: {
    heading: "Experience",
    paragraphs: [
      "Between them, the founders have around five years of combined consulting experience. Both have also run their own social media accounts across platforms for years, which is where a lot of the practical judgement in this work actually comes from.",
      "Their degrees — cybersecurity, civil engineering, biotechnology — aren't social media qualifications, and we won't pretend they are. What they show is analytical training: the habit of breaking a problem down properly before acting on it, which carries over into how we approach a client's strategy.",
      "The credibility claim here is hands-on experience, not credentials.",
    ],
  },

  languages: {
    heading: "Five languages",
    lead:
      "We work in English, Bangla, Hindi, Urdu and Spanish. For a consultancy serving a US-facing audience with roots in South Asia, that's a genuine advantage — it means a real conversation, not one filtered through translation.",
  },

  team: {
    heading: "The team",
    lead:
      "Offshore consultants run the live sessions most days, answering questions from anyone watching. The founders are directly reachable for consultation calls and ongoing engagements.",
  },
} as const;
