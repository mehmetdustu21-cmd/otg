CREATE TABLE IF NOT EXISTS site_visits (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS site_visits_visited_at_idx
  ON site_visits (visited_at DESC);

CREATE INDEX IF NOT EXISTS site_visits_path_visited_at_idx
  ON site_visits (path, visited_at DESC);

CREATE INDEX IF NOT EXISTS site_visits_visitor_hash_visited_at_idx
  ON site_visits (visitor_hash, visited_at DESC);
