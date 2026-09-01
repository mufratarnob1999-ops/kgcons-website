import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  hashPassword,
  createSession,
  isTrustedOrigin,
  setSessionCookie,
} from "@/lib/auth";

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
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first();
  if (existing) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const { hash, salt } = await hashPassword(password);
  const result = await db
    .prepare(
      "INSERT INTO users (email, name, password_hash, password_salt) VALUES (?, ?, ?, ?)",
    )
    .bind(email, name, hash, salt)
    .run();

  const userId = result.meta.last_row_id as number;
  const { token } = await createSession(db, userId);

  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, token, request.nextUrl.protocol === "https:");
  return response;
}
