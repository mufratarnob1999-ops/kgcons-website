/**
 * The Kishoreganj Method.
 *
 * Five steps, genuinely sequential, so numbering them is correct. This
 * section carries real credibility weight — there are no case studies yet —
 * so each step should read as something concrete that actually happens,
 * not a category label.
 */

export type MethodStep = {
  name: string;
  summary: string;
  detail: string;
};

export const method: MethodStep[] = [
  {
    name: "Discover",
    summary:
      "We understand the brand, the audience, the goals and where you stand today.",
    detail:
      "We go through your current accounts, your competitors and your audience with you, and ask what the business actually needs from social media. You leave this step with a plain-language read on what's working, what isn't, and why.",
  },
  {
    name: "Define",
    summary:
      "We set positioning, messaging and content direction.",
    detail:
      "Discovery becomes decisions: who you're speaking to, what you stand for, and what your content is actually meant to do. You get a written direction you can hand to anyone on your team, including yourself in six months.",
  },
  {
    name: "Create",
    summary: "We develop content concepts and creative systems.",
    detail:
      "Direction becomes formats — the specific kinds of posts, videos and series that carry the positioning, plus the structure to keep making them without starting from a blank page every time.",
  },
  {
    name: "Optimise",
    summary: "We analyse performance and refine the strategy.",
    detail:
      "Once content is live, we look at what the audience actually responds to and adjust the plan accordingly. Strategy is a starting point, not a fixed document.",
  },
  {
    name: "Grow",
    summary:
      "We turn consistency and insight into long-term digital growth.",
    detail:
      "The compounding stage: a presence that keeps earning attention because the strategy behind it keeps getting sharper, not because of a single lucky post.",
  },
];
