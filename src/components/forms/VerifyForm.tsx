"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const next = searchParams.get("next") || "/account";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(
          body?.error === "code_expired"
            ? "That code has expired — send a new one."
            : body?.error === "too_many_attempts"
              ? "Too many attempts — send a new code."
              : "Incorrect code. Check your email and try again.",
        );
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setResent(false);
    await fetch("/api/auth/resend-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResent(true);
  }

  if (!email) {
    return (
      <p className="text-body text-muted">
        Missing email — start over from{" "}
        <a
          href="/account/signup"
          className="text-ink underline-offset-4 hover:text-accent hover:underline"
        >
          sign up
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="code">Verification code</Label>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="mt-2 tracking-[0.3em]"
          />
        </div>
        {error && <p className="text-small text-danger">{error}</p>}
        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Verifying…" : "Verify"}
        </Button>
      </form>
      <button
        type="button"
        onClick={handleResend}
        className="mt-6 text-small text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        Didn&rsquo;t get a code? Send a new one
      </button>
      {resent && <p className="mt-2 text-small text-ink">New code sent.</p>}
    </div>
  );
}
