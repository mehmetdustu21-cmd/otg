CREATE TABLE IF NOT EXISTS site_settings (
  setting_key TEXT PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (setting_key, setting_value)
VALUES
  ('contact_email', 'hello@orchardtoglobal.com.tr'),
  ('phone_primary', '+41 78 336 04 25'),
  ('phone_secondary', '+90 536 847 6521'),
  ('contact_locations', 'Zurich · Istanbul · Aydın')
ON CONFLICT (setting_key) DO NOTHING;
