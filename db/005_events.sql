CREATE TABLE IF NOT EXISTS site_events (
  id BIGSERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  path TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS site_events_created_at_idx ON site_events (created_at DESC);
CREATE INDEX IF NOT EXISTS site_events_name_created_at_idx ON site_events (event_name, created_at DESC);
