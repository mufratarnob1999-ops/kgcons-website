"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/Input";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does a consultation cost?",
  "What services do you offer?",
  "How do I book a call?",
];

const MAX_MESSAGE_LENGTH = 600;

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });
      const data = (await res.json().catch(() => null)) as { reply?: string } | null;
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data?.reply || "Sorry, something went wrong. Try again.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Sorry, something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-150 ease-standard hover:text-accent md:h-auto md:w-auto md:gap-2 md:text-small md:text-muted md:hover:text-ink"
      >
        <SearchGlyph />
        <span className="hidden md:inline">Ask a question</span>
        <span className="sr-only md:hidden">Ask a question</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask a question"
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-canvas/90 px-4 pt-24 pb-10 backdrop-blur-sm md:pt-32"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-edge border border-hairline bg-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-b border-hairline p-3"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Ask about services, pricing, how we work…"
                aria-label="Ask a question"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 items-center justify-center text-muted transition-colors duration-150 ease-standard hover:text-ink"
              >
                <CloseGlyph />
              </button>
            </form>

            <div ref={threadRef} className="max-h-[60vh] overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-small text-muted">Try asking:</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-edge border border-hairline px-4 py-3 text-left text-small text-ink transition-colors duration-150 ease-standard hover:border-neutral hover:bg-canvas"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "text-body",
                        m.role === "user" ? "text-ink" : "text-neutral",
                      )}
                    >
                      <p className="mb-1 text-label uppercase tracking-wide text-muted">
                        {m.role === "user" ? "You" : "Kishoreganj"}
                      </p>
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                  ))}
                  {loading && (
                    <p className="text-small text-muted">Thinking…</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden
    >
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="M17 17l-4-4" strokeLinecap="round" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
    </svg>
  );
}
