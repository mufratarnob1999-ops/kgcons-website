import { NextRequest, NextResponse } from "next/server";
import { getDb, getEnv } from "@/lib/db";
import { isTrustedOrigin, generateOtpCode } from "@/lib/auth";
import { sendVerificationCode } from "@/lib/email";

const CODE_TTL_MINUTES = 10;

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
  if (!email) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const db = getDb();
  const user = await db
    .prepare("SELECT id, name, email_verified FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: number; name: string; email_verified: number }>();

  // Always return ok — don't reveal whether the account exists or is
  // already verified.
  if (!user || user.email_verified) {
    return NextResponse.json({ ok: true });
  }

  const code = generateOtpCode();
  const expiresAt = new Date(
    Date.now() + CODE_TTL_MINUTES * 60_000,
  ).toISOString();
  await db
    .prepare(
      `INSERT INTO verification_codes (email, code, expires_at, attempts)
       VALUES (?, ?, ?, 0)
       ON CONFLICT(email) DO UPDATE SET
         code = excluded.code, expires_at = excluded.expires_at, attempts = 0`,
    )
    .bind(email, code, expiresAt)
    .run();

  await sendVerificationCode(getEnv(), { to: email, name: user.name, code });

  return NextResponse.json({ ok: true });
}
