ALTER TABLE signups ADD COLUMN billing_interval TEXT NOT NULL DEFAULT 'month'
  CHECK (billing_interval IN ('month', 'year'));
