import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  verifyPassword,
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
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const db = getDb();
  const user = await db
    .prepare(
      "SELECT id, password_hash, password_salt, email_verified FROM users WHERE email = ?",
    )
    .bind(email)
    .first<{
      id: number;
      password_hash: string;
      password_salt: string;
      email_verified: number;
    }>();

  if (
    !user ||
    !(await verifyPassword(password, user.password_hash, user.password_salt))
  ) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  if (!user.email_verified) {
    return NextResponse.json({ error: "not_verified" }, { status: 403 });
  }

  const { token } = await createSession(db, user.id);
  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, token, request.nextUrl.protocol === "https:");
  return response;
}
