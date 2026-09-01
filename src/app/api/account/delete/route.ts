import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  getSessionFromRequest,
  verifyPassword,
  isTrustedOrigin,
  clearSessionCookie,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const db = getDb();
  const session = await getSessionFromRequest(db, request);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const password = typeof body?.password === "string" ? body.password : "";

  // Re-verify the password rather than trusting the session alone — this
  // is a destructive, irreversible action.
  const user = await db
    .prepare("SELECT password_hash, password_salt FROM users WHERE id = ?")
    .bind(session.userId)
    .first<{ password_hash: string; password_salt: string }>();

  if (
    !user ||
    !(await verifyPassword(password, user.password_hash, user.password_salt))
  ) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  // Explicit deletes rather than relying on ON DELETE CASCADE — correct
  // regardless of whether FK enforcement is on, and removes everything
  // tied to this person: appointment history, every session (not just
  // this one — kills any other logged-in device too), and any leftover
  // unconsumed verification code.
  await db
    .prepare("DELETE FROM appointments WHERE user_id = ?")
    .bind(session.userId)
    .run();
  await db
    .prepare("DELETE FROM sessions WHERE user_id = ?")
    .bind(session.userId)
    .run();
  await db
    .prepare("DELETE FROM verification_codes WHERE email = ?")
    .bind(session.email)
    .run();
  await db.prepare("DELETE FROM users WHERE id = ?").bind(session.userId).run();

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response, request.nextUrl.protocol === "https:");
  return response;
}
