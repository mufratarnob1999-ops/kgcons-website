import { NextRequest, NextResponse } from "next/server";
import { getDb, getEnv } from "@/lib/db";
import { hashPassword, isTrustedOrigin, generateOtpCode } from "@/lib/auth";
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
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !email.includes("@") || !name || password.length < 8) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const db = getDb();

  const existing = await db
    .prepare("SELECT id, email_verified FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: number; email_verified: number }>();

  if (existing?.email_verified) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const { hash, salt } = await hashPassword(password);

  if (existing) {
    // An earlier signup attempt that never got verified — refresh it
    // rather than blocking, since they never finished.
    await db
      .prepare(
        "UPDATE users SET name = ?, password_hash = ?, password_salt = ? WHERE id = ?",
      )
      .bind(name, hash, salt, existing.id)
      .run();
  } else {
    await db
      .prepare(
        "INSERT INTO users (email, name, password_hash, password_salt) VALUES (?, ?, ?, ?)",
      )
      .bind(email, name, hash, salt)
      .run();
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

  await sendVerificationCode(getEnv(), { to: email, name, code });

  // No session yet — the account isn't usable until the code is verified.
  return NextResponse.json({ ok: true, needsVerification: true });
}
