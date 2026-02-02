CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  decision TEXT NOT NULL,
  reasoning TEXT NOT NULL,
  emotion TEXT NOT NULL,
  category TEXT NOT NULL,
  expectedOutcome TEXT NOT NULL,
  actualOutcome TEXT,
  biasDetected TEXT,
  createdAt TEXT NOT NULL,
  reviewedAt TEXT
);
