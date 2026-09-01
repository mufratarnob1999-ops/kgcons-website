import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/db";
import { isTrustedOrigin } from "@/lib/auth";
import { buildSystemPrompt } from "@/lib/assistant-context";

/* Cost/abuse guardrails — this endpoint spends real money per request,
   unlike the rest of the site's free-tier services. */
const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_MESSAGES = 8;
const MAX_TOKENS = 400;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    (v.role === "user" || v.role === "assistant") &&
    typeof v.content === "string" &&
    v.content.length > 0 &&
    v.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const apiKey = getEnv().ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "not_configured",
        reply:
          "The assistant isn't switched on yet — try /contact or /schedule in the meantime.",
      },
      { status: 200 },
    );
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const rawHistory = Array.isArray(body?.history) ? body.history : [];
  const history = rawHistory
    .filter(isChatMessage)
    .slice(-MAX_HISTORY_MESSAGES);

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(),
      messages: [...history, { role: "user", content: message }],
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({
      reply: reply || "Sorry, I couldn't put together an answer to that.",
    });
  } catch {
    return NextResponse.json(
      {
        error: "assistant_error",
        reply:
          "Something went wrong on our end. Try again, or reach us directly at /contact.",
      },
      { status: 200 },
    );
  }
}
