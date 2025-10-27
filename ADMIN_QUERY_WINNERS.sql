-- ===============================================
-- ADMIN: Voir tous les gagnants et leurs rewards
-- ===============================================

-- Query simple pour voir tous les gagnants
SELECT 
  round_number as "Round",
  winner_address as "Adresse du Gagnant",
  winner_clicks as "Clics",
  winner_reward as "Reward (SOL)",
  ended_at as "Date de Fin"
FROM round_history
WHERE winner_address IS NOT NULL
ORDER BY round_number DESC;

-- ===============================================
-- Voir les joueurs d'un round spécifique
-- ===============================================

-- Changer le round_number (ici 1 = Round 1)
SELECT 
  rank as "Position",
  address as "Adresse",
  total_clicks as "Clics",
  score as "Score"
FROM round_players
WHERE round_id = (
  SELECT id FROM round_history WHERE round_number = 1
)
ORDER BY rank ASC;

-- ===============================================
-- Voir les stats globales
-- ===============================================

-- Nombre total de rounds
SELECT COUNT(*) as "Total Rounds" FROM round_history;

-- Nombre total de joueurs uniques
SELECT COUNT(DISTINCT address) as "Joueurs Uniques" FROM round_players;

-- Top 5 des gagnants récurrents
SELECT 
  winner_address as "Adresse",
  COUNT(*) as "Victoires",
  SUM(winner_clicks) as "Total Clics"
FROM round_history
WHERE winner_address IS NOT NULL
GROUP BY winner_address
ORDER BY "Victoires" DESC
LIMIT 5;

-- ===============================================
-- Gagnants non payés (si vous ajoutez une colonne "paid")
-- ===============================================

-- À ajouter plus tard si besoin:
-- ALTER TABLE round_history ADD COLUMN paid BOOLEAN DEFAULT false;

-- SELECT * FROM round_history 
-- WHERE winner_address IS NOT NULL AND paid = false;

