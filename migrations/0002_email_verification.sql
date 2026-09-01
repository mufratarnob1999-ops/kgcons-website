-- Email verification for new accounts. Signup no longer creates a
-- session directly — it creates an unverified user, emails a 6-digit
-- code, and only issues a session once that code is confirmed.
ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0;

-- One active code per email — a new signup or resend overwrites it
-- (ON CONFLICT upsert), so there's never more than one row per address.
CREATE TABLE verification_codes (
  email      TEXT PRIMARY KEY,
  code       TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  attempts   INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
