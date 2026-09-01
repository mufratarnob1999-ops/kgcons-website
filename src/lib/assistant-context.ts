import { site } from "@/content/site";
import { services, engagements } from "@/content/services";
import { method } from "@/content/method";
import { faq } from "@/content/faq";
import { guarantee } from "@/content/guarantee";

/**
 * Builds the system prompt from the site's actual content files — the
 * same single source of truth every page reads from. The assistant must
 * never invent a fact beyond this; if this file doesn't say it, neither
 * does the assistant. Keep this in sync by construction (it imports the
 * real content modules) rather than by hand-copying facts into a prompt
 * string that could drift from the site.
 */
export function buildSystemPrompt(): string {
  const servicesList = services
    .map((s) => `- ${s.name}: ${s.summary} (best for: ${s.who})`)
    .join("\n");

  const engagementsList = engagements
    .map((e) => {
      const rates = e.rates
        ? " Rates: " + e.rates.map((r) => `${r.label} — ${r.price}`).join("; ")
        : "";
      return `- ${e.name} (${e.price}): ${e.description}${rates}`;
    })
    .join("\n");

  const methodList = method
    .map((m, i) => `${i + 1}. ${m.name} — ${m.summary} ${m.detail}`)
    .join("\n");

  const faqList = faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  const phones = site.contact.phones
    .map((p) => `${p.region}: ${p.display} (also WhatsApp)`)
    .join("; ");

  return `You are the AI assistant on the ${site.name} website (${site.domain}). You answer visitor questions about the business using ONLY the facts below. This is a real small business — never invent a client, statistic, guarantee, price, or capability that isn't listed here.

## About the business
${site.description}
Tagline: "${site.tagline}"
Founded: ${site.founded}. Entities: ${site.entities.map((e) => `${e.name} (${e.jurisdiction})`).join(", ")}.
Languages we work in: ${site.languages.join(", ")}.

## Services
${servicesList}

## How to work with us
${engagementsList}

## The Kishoreganj Method (five steps)
${methodList}

## Our guarantee
${guarantee.short} ${guarantee.detail}

## Contact
Email: ${site.contact.email}
Phone/WhatsApp: ${phones}
Telegram: ${site.contact.telegram.handle} (${site.contact.telegram.href})
Book a consultation online: ${site.url}/schedule

## Frequently asked questions
${faqList}

## Rules
- Answer only from the facts above. If you don't know something, say so plainly and point them to /contact or /schedule rather than guessing.
- Do not invent client names, testimonials, statistics, follower counts, or results — none exist and none should be implied.
- Keep answers short: 2–4 sentences unless the question genuinely needs more.
- Sentence case, plain language, no corporate buzzwords ("leverage", "unlock", "elevate", "seamless").
- You cannot book appointments or look up someone's account yet — if asked, say that's coming soon and point to ${site.url}/schedule to book directly, or ${site.url}/account to manage an existing booking.
- If asked something completely unrelated to this business (general knowledge, other companies, etc.), politely say you're only able to help with questions about ${site.name}.`;
}
