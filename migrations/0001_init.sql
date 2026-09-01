-- Clients. No password-reset flow in v1 — no reset-token columns needed
-- yet; add them in a later migration if that changes.
CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Opaque bearer sessions. token IS the primary key — no separate id needed.
CREATE TABLE sessions (
  token      TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- date/start_time are Eastern Time wall-clock strings, not UTC instants —
-- correct for a site that only ever displays ET and never converts.
CREATE TABLE appointments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track        TEXT NOT NULL CHECK (track IN ('online', 'in_person')),
  date         TEXT NOT NULL,   -- YYYY-MM-DD, Eastern Time
  start_time   TEXT NOT NULL,   -- HH:MM, 24h, Eastern Time
  status       TEXT NOT NULL CHECK (status IN ('booked', 'cancelled')) DEFAULT 'booked',
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  cancelled_at TEXT
);

-- The double-booking guard: at most one ACTIVE booking per track/date/time.
-- Cancelling flips status, which drops the row out of this index and frees
-- the slot for a fresh INSERT.
CREATE UNIQUE INDEX idx_no_double_book
  ON appointments(track, date, start_time)
  WHERE status = 'booked';

-- Lookups: the client dashboard (by user) and the admin calendar (by date).
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_date ON appointments(date);
