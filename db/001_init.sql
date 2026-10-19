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
