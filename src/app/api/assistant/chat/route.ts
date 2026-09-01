import { NextRequest, NextResponse } from "next/server";
import { getDb, getEnv } from "@/lib/db";
import { getSessionFromRequest, isTrustedOrigin } from "@/lib/auth";
import { buildSystemPrompt } from "@/lib/assistant-context";
import { buildAssistantTools } from "@/lib/assistant-tools";

/* Cost/abuse guardrails — Workers AI's free daily allowance is finite even
   though there's no per-request bill, and a runaway tool loop still costs
   real inference time. */
const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_MESSAGES = 8;
const MAX_TOKENS = 400;
const MAX_TOOL_ROUNDS = 3;

const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

type ChatMessage = { role: "user" | "assistant"; content: string };
/* Loose on purpose — "tool" and "assistant-tool-call" turns carry fields
   (name, raw tool-call JSON) the model's declared message type doesn't
   include, matching the wire format Cloudflare's own ai-utils package
   uses for this model (verified against its source, not guessed). */
type WireMessage = { role: string; content: string; name?: string };

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

  const db = getDb();
  const session = await getSessionFromRequest(db, request);

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const rawHistory = Array.isArray(body?.history) ? body.history : [];
  const history = rawHistory.filter(isChatMessage).slice(-MAX_HISTORY_MESSAGES);

  const { tools, runTool, getPendingAction } = buildAssistantTools({
    db,
    session,
  });
  const aiTools = tools.map((t) => ({
    type: "function" as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }));

  const messages: WireMessage[] = [
    { role: "system", content: buildSystemPrompt({ signedIn: !!session }) },
    ...history,
    { role: "user", content: message },
  ];

  const ai = getEnv().AI;

  try {
    let finalText = "";

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const response = await ai.run(MODEL, {
        messages,
        tools: aiTools,
        max_tokens: MAX_TOKENS,
      });

      if (typeof response === "string") {
        finalText = response;
        break;
      }
      const toolCalls =
        "tool_calls" in response ? (response.tool_calls ?? []) : [];
      if (!toolCalls.length) {
        finalText = "response" in response ? (response.response ?? "") : "";
        break;
      }

      for (const call of toolCalls) {
        messages.push({ role: "assistant", content: JSON.stringify(call) });
        const result = call.name
          ? await runTool(call.name, call.arguments)
          : "Unknown tool call.";
        messages.push({
          role: "tool",
          name: call.name ?? "unknown",
          content: result,
        });
      }
    }

    if (!finalText) {
      // Tool budget exhausted (or the last round ended on a tool call) —
      // force one more call with no tools so the model has to answer in
      // words instead of looping forever.
      const final = await ai.run(MODEL, { messages, max_tokens: MAX_TOKENS });
      finalText =
        typeof final === "string"
          ? final
          : "response" in final
            ? (final.response ?? "")
            : "";
    }

    return NextResponse.json({
      reply: finalText.trim() || "Sorry, I couldn't put together an answer to that.",
      action: getPendingAction() ?? undefined,
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
