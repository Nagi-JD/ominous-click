-- Table pour tracker le round actuel
CREATE TABLE IF NOT EXISTS current_round (
  id INTEGER DEFAULT 1 PRIMARY KEY,
  round_number INTEGER DEFAULT 1,
  started_at TIMESTAMP DEFAULT NOW()
);

-- Insérer le premier round
INSERT INTO current_round (id, round_number, started_at) 
VALUES (1, 1, NOW())
ON CONFLICT (id) DO NOTHING;

-- Table pour l'historique des rounds
CREATE TABLE IF NOT EXISTS round_history (
  id SERIAL PRIMARY KEY,
  round_number INTEGER NOT NULL,
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NOT NULL,
  winner_address TEXT,
  winner_clicks BIGINT,
  total_players INTEGER DEFAULT 0,
  winner_reward BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_round_number ON round_history(round_number DESC);
CREATE INDEX IF NOT EXISTS idx_ended_at ON round_history(ended_at DESC);

-- Table pour tous les joueurs de chaque round
CREATE TABLE IF NOT EXISTS round_players (
  id SERIAL PRIMARY KEY,
  round_id INTEGER REFERENCES round_history(id),
  address TEXT NOT NULL,
  total_clicks BIGINT NOT NULL,
  score BIGINT NOT NULL,
  rank INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_round_id ON round_players(round_id);
CREATE INDEX IF NOT EXISTS idx_address ON round_players(address);

