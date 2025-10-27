# 🎯 Leaderboard basé sur les CLICS!

## ✅ Changements effectués

### 1. **Store (src/store.ts)**
- Ajout de `totalClicks: 0` pour tracker les clics
- `hit()` incrémente maintenant `totalClicks` à chaque clic
- Envoie `totalClicks` au leaderboard

### 2. **API submit-score.js**
- Enregistre `total_clicks` dans Supabase
- Colonne ajoutée à la base de données

### 3. **API leaderboard.js**
- Trie maintenant par `total_clicks` (pas par `score`)
- Affiche le nombre de clics dans les résultats

### 4. **Leaderboard.vue**
- Affiche "X clicks" au lieu de "X candies"
- "Your rank: #X | Y clicks"

## 📊 Prochaine étape: Supabase

**ALLEZ SUR SUABASE ET EXÉCUTEZ:**
```sql
ALTER TABLE scores ADD COLUMN IF NOT EXISTS total_clicks BIGINT DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_total_clicks ON scores(total_clicks DESC);
```

Puis testez localement ou déployez!

