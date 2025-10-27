-- ===============================================
-- INSTALLATION COMPLÈTE DU SYSTÈME
-- ===============================================

-- 1. NETTOYER L'ANCIEN SYSTÈME
DROP TABLE IF EXISTS round_players CASCADE;
DROP TABLE IF EXISTS round_history CASCADE;
DROP TABLE IF EXISTS current_round CASCADE;
DROP TABLE IF EXISTS scores CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ===============================================
-- 2. TABLE PRINCIPALE: SCORES (leaderboard actuel)
-- ===============================================

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

-- Index pour performances
CREATE INDEX idx_score ON scores(score DESC);
CREATE INDEX idx_address ON scores(address);
CREATE INDEX idx_timestamp ON scores(timestamp DESC);
CREATE INDEX idx_total_clicks ON scores(total_clicks DESC);

-- Fonction pour update updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
CREATE TRIGGER update_scores_updated_at
    BEFORE UPDATE ON scores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Activer Row Level Security
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre toutes les opérations
CREATE POLICY "Allow all operations on scores"
ON scores
FOR ALL
USING (true)
WITH CHECK (true);

-- ===============================================
-- 3. TABLE: CURRENT_ROUND (tracker round actuel)
-- ===============================================

CREATE TABLE current_round (
  id INTEGER DEFAULT 1 PRIMARY KEY,
  round_number INTEGER DEFAULT 1,
  started_at TIMESTAMP DEFAULT NOW()
);

-- Insérer le premier round
INSERT INTO current_round (id, round_number, started_at) 
VALUES (1, 1, NOW());

-- ===============================================
-- 4. TABLE: ROUND_HISTORY (historique complet)
-- ===============================================

CREATE TABLE round_history (
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

CREATE INDEX idx_round_number ON round_history(round_number DESC);
CREATE INDEX idx_ended_at ON round_history(ended_at DESC);

-- ===============================================
-- 5. TABLE: ROUND_PLAYERS (joueurs sauvegardés)
-- ===============================================

CREATE TABLE round_players (
  id SERIAL PRIMARY KEY,
  round_id INTEGER REFERENCES round_history(id),
  address TEXT NOT NULL,
  total_clicks BIGINT NOT NULL,
  score BIGINT NOT NULL,
  rank INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_round_id ON round_players(round_id);
CREATE INDEX idx_address_rp ON round_players(address);

-- ===============================================
-- INSTALLATION TERMINÉE ✅
-- ===============================================

-- Vous pouvez maintenant déployer le jeu!
-- Les rounds se résoudront automatiquement toutes les 5 minutes via GitHub Actions

