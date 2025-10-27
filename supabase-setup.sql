-- Créer la table scores pour le leaderboard
-- Exécuter dans SQL Editor de Supabase

-- D'abord, supprimer la table si elle existe (au cas où)
DROP TABLE IF EXISTS scores CASCADE;

-- Créer la table scores
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL UNIQUE,
  score BIGINT NOT NULL,
  damage_per_click INTEGER DEFAULT 0,
  damage_per_second INTEGER DEFAULT 0,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour les requêtes rapides
CREATE INDEX idx_score ON scores(score DESC);
CREATE INDEX idx_address ON scores(address);
CREATE INDEX idx_timestamp ON scores(timestamp DESC);

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

-- Activer Row Level Security (sécurité)
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre toutes les opérations (pour notre cas simple)
CREATE POLICY "Allow all operations on scores"
ON scores
FOR ALL
USING (true)
WITH CHECK (true);

