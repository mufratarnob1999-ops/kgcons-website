import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { createSession, isTrustedOrigin, setSessionCookie } from "@/lib/auth";

const MAX_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!email || !code) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const db = getDb();

  const record = await db
    .prepare(
      "SELECT code, expires_at, attempts FROM verification_codes WHERE email = ?",
    )
    .bind(email)
    .first<{ code: string; expires_at: string; attempts: number }>();

  if (!record) {
    return NextResponse.json({ error: "no_pending_code" }, { status: 400 });
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
  }

  if (new Date(record.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "code_expired" }, { status: 400 });
  }

  if (record.code !== code) {
    await db
      .prepare(
        "UPDATE verification_codes SET attempts = attempts + 1 WHERE email = ?",
      )
      .bind(email)
      .run();
    return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  }

  const user = await db
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: number }>();

  if (!user) {
    return NextResponse.json({ error: "no_pending_code" }, { status: 400 });
  }

  await db
    .prepare("UPDATE users SET email_verified = 1 WHERE id = ?")
    .bind(user.id)
    .run();
  await db
    .prepare("DELETE FROM verification_codes WHERE email = ?")
    .bind(email)
    .run();

  const { token } = await createSession(db, user.id);
  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, token, request.nextUrl.protocol === "https:");
  return response;
}
