import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { getDb } from "./db";

const SESSION_DAYS = 30;
/* Cloudflare Workers caps crypto.subtle PBKDF2 at 100,000 iterations —
   confirmed against the real deployed Worker (this runs fine under plain
   `next dev`, which uses a different crypto backend without that cap, so
   the limit only surfaces once actually deployed). 100,000 is Workers'
   ceiling, not a security choice — use the max the platform allows. */
const PBKDF2_ITERATIONS = 100_000;

export const SESSION_COOKIE_NAME = "kg_session";
export const SESSION_COOKIE_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const padded = str
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(str.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

async function derivePbkdf2(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

/** PBKDF2 via Web Crypto — the standard, CPU-cheap approach on Workers
 * (bcrypt/argon2 need WASM and risk tripping CPU-time limits). */
export async function hashPassword(
  password: string,
): Promise<{ hash: string; salt: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePbkdf2(password, salt);
  return { hash: toBase64Url(hash), salt: toBase64Url(salt) };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string,
): Promise<boolean> {
  const derived = await derivePbkdf2(password, fromBase64Url(salt));
  const expected = fromBase64Url(hash);
  if (derived.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < derived.length; i++) diff |= derived[i] ^ expected[i];
  return diff === 0;
}

function generateSessionToken(): string {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(32)));
}

export type SessionUser = { userId: number; email: string; name: string };

export async function createSession(
  db: D1Database,
  userId: number,
): Promise<{ token: string; expiresAt: string }> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString();
  await db
    .prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(token, userId, expiresAt)
    .run();
  return { token, expiresAt };
}

export async function verifySessionToken(
  db: D1Database,
  token: string | undefined,
): Promise<SessionUser | null> {
  if (!token) return null;
  const row = await db
    .prepare(
      `SELECT users.id as userId, users.email, users.name, sessions.expires_at as expiresAt
       FROM sessions JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ?`,
    )
    .bind(token)
    .first<{ userId: number; email: string; name: string; expiresAt: string }>();
  if (!row) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) return null;
  return { userId: row.userId, email: row.email, name: row.name };
}

export async function destroySession(db: D1Database, token: string): Promise<void> {
  await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
}

/**
 * For Server Components. Deliberately takes no `db` argument — it must
 * call `cookies()` (a dynamic API Next recognizes) *before* getDb() runs
 * getCloudflareContext() in sync mode, or Next tries to statically
 * prerender the page and that sync call throws. Import `getDb` here
 * rather than making the caller pass it in, so this ordering can't be
 * accidentally broken at the call site.
 */
export async function getSessionFromCookies(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(getDb(), token);
}

/** For Route Handlers. */
export async function getSessionFromRequest(
  db: D1Database,
  request: NextRequest,
): Promise<SessionUser | null> {
  return verifySessionToken(db, request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

/** Cheap second layer beyond SameSite=Lax on mutating routes. */
export function isTrustedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin requests often omit Origin
  return origin === "https://kgcons.org" || origin === request.nextUrl.origin;
}

/** `secure` must be false over plain http (local dev) or browsers drop
 * the cookie silently — pass `request.nextUrl.protocol === "https:"`. */
export function setSessionCookie(
  response: NextResponse,
  token: string,
  secure: boolean,
): void {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE,
  });
}

export function clearSessionCookie(response: NextResponse, secure: boolean): void {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
