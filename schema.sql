CREATE TABLE IF NOT EXISTS application_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  city TEXT,
  status TEXT NOT NULL DEFAULT 'Received',
  message TEXT DEFAULT 'Your application has been received and is waiting for review.',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_application_status_email ON application_status (email);

INSERT OR IGNORE INTO application_status (
  application_id,
  email,
  student_name,
  city,
  status,
  message
) VALUES (
  'SC2026-DEMO',
  'demo@example.com',
  'Demo Student',
  'Karachi',
  'Received',
  'This is a demo record. Replace it with real application statuses after connecting D1.'
);
