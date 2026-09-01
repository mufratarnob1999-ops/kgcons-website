import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/db";
import { isTrustedOrigin } from "@/lib/auth";
import { buildSystemPrompt } from "@/lib/assistant-context";

/* Cost/abuse guardrails — Workers AI's free daily allowance is finite even
   though there's no per-request bill, and a runaway conversation still
   costs real inference time. */
const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_MESSAGES = 8;
const MAX_TOKENS = 400;

const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

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

  try {
    const result = await getEnv().AI.run(MODEL, {
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: MAX_TOKENS,
    });

    const reply =
      typeof result === "string"
        ? result
        : "response" in result && typeof result.response === "string"
          ? result.response
          : "";

    return NextResponse.json({
      reply: reply.trim() || "Sorry, I couldn't put together an answer to that.",
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
