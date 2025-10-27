-- Fix the scores table to ensure id is primary key
-- Run this in Supabase SQL Editor

-- First, check if we have rows without id
-- If your existing rows don't have id, we need to add it

-- Step 1: Delete the table and recreate it properly
DROP TABLE IF EXISTS scores CASCADE;

-- Step 2: Recreate the table with proper primary key
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL UNIQUE,
  score BIGINT NOT NULL,
  total_clicks BIGINT DEFAULT 0,
  damage_per_click INTEGER DEFAULT 0,
  damage_per_second INTEGER DEFAULT 0,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Step 3: Create indexes
CREATE INDEX idx_score ON scores(score DESC);
CREATE INDEX idx_address ON scores(address);
CREATE INDEX idx_timestamp ON scores(timestamp DESC);
CREATE INDEX idx_total_clicks ON scores(total_clicks DESC);

-- Step 4: Add the trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_scores_updated_at
    BEFORE UPDATE ON scores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Step 5: Enable RLS and create policy
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on scores"
ON scores
FOR ALL
USING (true)
WITH CHECK (true);

