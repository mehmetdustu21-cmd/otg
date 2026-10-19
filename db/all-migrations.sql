CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  company TEXT,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  buyer_type TEXT,
  product_interest TEXT,
  estimated_volume TEXT,
  packaging_preference TEXT,
  locale TEXT,
  lead_status TEXT NOT NULL DEFAULT 'new',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_submitted_at_idx
  ON inquiries (submitted_at DESC);
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
CREATE TABLE IF NOT EXISTS site_settings (
  setting_key TEXT PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (setting_key, setting_value)
VALUES
  ('contact_email', 'info@orchardtoglobal.com'),
  ('phone_primary', '+41 78 336 04 25'),
  ('phone_secondary', '+90 536 847 6521'),
  ('contact_locations', 'Zurich · Istanbul · Aydın')
ON CONFLICT (setting_key) DO NOTHING;
ALTER TABLE inquiries
  ALTER COLUMN phone DROP NOT NULL;

ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS buyer_type TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS product_interest TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS estimated_volume TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS packaging_preference TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS locale TEXT;
CREATE TABLE IF NOT EXISTS site_events (
  id BIGSERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  path TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS site_events_created_at_idx ON site_events (created_at DESC);
CREATE INDEX IF NOT EXISTS site_events_name_created_at_idx ON site_events (event_name, created_at DESC);
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'new';
CREATE INDEX IF NOT EXISTS inquiries_lead_status_idx ON inquiries (lead_status);
UPDATE site_settings
SET setting_value = 'info@orchardtoglobal.com', updated_at = NOW()
WHERE setting_key = 'contact_email'
  AND setting_value = 'hello@orchardtoglobal.com.tr';
