"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Heading } from "@/components/ui/Heading";

export function DeleteAccountSection() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-hairline pt-10">
      <Heading as="h2" size="heading" className="text-danger">
        Delete account
      </Heading>
      <p className="measure mt-4 text-body text-muted">
        This permanently deletes your account and all your appointment
        history from our systems. This can&rsquo;t be undone.
      </p>

      {!open ? (
        <Button
          type="button"
          variant="outline"
          size="md"
          className="mt-6"
          onClick={() => setOpen(true)}
        >
          Delete my account
        </Button>
      ) : (
        <form onSubmit={handleDelete} className="mt-6 max-w-sm space-y-4">
          <div>
            <Label htmlFor="delete-password">
              Confirm your password to delete your account
            </Label>
            <Input
              id="delete-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
          </div>
          {error && <p className="text-small text-danger">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              variant="outline"
              size="md"
              disabled={loading}
            >
              {loading ? "Deleting…" : "Yes, delete everything"}
            </Button>
            <Button
              type="button"
              variant="quiet"
              disabled={loading}
              onClick={() => {
                setOpen(false);
                setPassword("");
                setError(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
