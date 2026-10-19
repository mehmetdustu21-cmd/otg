ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'new';
CREATE INDEX IF NOT EXISTS inquiries_lead_status_idx ON inquiries (lead_status);
