import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { destroySession, clearSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await destroySession(getDb(), token);
  }
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response, request.nextUrl.protocol === "https:");
  return response;
}
