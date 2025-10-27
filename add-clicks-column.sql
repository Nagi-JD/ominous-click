-- Add total_clicks column to scores table
ALTER TABLE scores ADD COLUMN IF NOT EXISTS total_clicks BIGINT DEFAULT 0;

-- Create index for fast queries by clicks
CREATE INDEX IF NOT EXISTS idx_total_clicks ON scores(total_clicks DESC);

