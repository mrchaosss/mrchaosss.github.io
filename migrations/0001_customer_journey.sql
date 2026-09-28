PRAGMA foreign_keys = ON;
CREATE TABLE signups (
 id TEXT PRIMARY KEY, website TEXT NOT NULL, created_at INTEGER NOT NULL,
 payment TEXT NOT NULL DEFAULT 'pending', stripe_session TEXT UNIQUE,
 stripe_customer TEXT, stripe_subscription TEXT UNIQUE,
 email TEXT, name TEXT, business TEXT, paid_at INTEGER,
 intake_json TEXT, intake_at INTEGER, eligibility_json TEXT NOT NULL,
 subscription_status TEXT, subscription_event_at INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX signups_email ON signups(email);
CREATE INDEX signups_created ON signups(created_at);
CREATE TABLE sessions (hash TEXT PRIMARY KEY, signup_id TEXT NOT NULL REFERENCES signups(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
CREATE INDEX sessions_expiry ON sessions(expires_at);
CREATE TABLE resume_tokens (hash TEXT PRIMARY KEY, signup_id TEXT NOT NULL REFERENCES signups(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
CREATE INDEX resume_expiry ON resume_tokens(expires_at);
CREATE TABLE stripe_events (id TEXT PRIMARY KEY, type TEXT NOT NULL, received_at INTEGER NOT NULL);
CREATE TABLE outbox (id TEXT PRIMARY KEY, recipient TEXT NOT NULL, subject TEXT NOT NULL, body TEXT NOT NULL, created_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, next_attempt INTEGER NOT NULL, lease_until INTEGER NOT NULL DEFAULT 0, sent_at INTEGER);
CREATE INDEX outbox_due ON outbox(sent_at,next_attempt,lease_until);
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX rates_expiry ON rate_limits(expires_at);
