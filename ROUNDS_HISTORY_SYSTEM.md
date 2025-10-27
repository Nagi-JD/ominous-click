# 🎯 Système de sauvegarde des rounds

## 🎯 Ce qu'on veut:

1. ✅ Round de 5 minutes
2. ✅ Leaderboard se sauvegarde dans `round_history`
3. ✅ Winner identifié et reward calculé
4. ✅ Tous les joueurs et leurs scores sont préservés (historique)
5. ✅ Leaderboard nettoyé pour nouveau round
6. ✅ Système automatique via GitHub Actions

---

## 📊 Structure Supabase à créer

### Table `round_history`
```sql
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
```

### Table `round_players`
```sql
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
```

### Table `current_round` (pour tracker le round actuel)
```sql
CREATE TABLE current_round (
  id INTEGER DEFAULT 1 PRIMARY KEY,
  round_number INTEGER DEFAULT 1,
  started_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 Modifier `claim-round-winners.js`

**Workflow complet:**

1. **Sauvegarder tous les joueurs du round actuel**
2. **Identifier le winner**
3. **Sauvegarder dans `round_history`**
4. **Incrémenter le round number**
5. **Nettoyer le leaderboard** (table `scores`)
6. **Démarrer nouveau round**

### Code à implémenter:

```javascript
// 1. Récupérer tous les joueurs actuels
const { data: allPlayers } = await supabase
  .from('scores')
  .select('*')
  .order('total_clicks', { ascending: false })

// 2. Récupérer le numéro de round actuel
const { data: current } = await supabase
  .from('current_round')
  .select('*')
  .single()

const roundNumber = current ? current.round_number : 1
const roundStartTime = current ? current.started_at : new Date()
const roundEndTime = new Date()

// 3. Identifier le winner (premier joueur)
const winner = allPlayers[0]

// 4. Créer l'entrée dans round_history
const { data: newRound } = await supabase
  .from('round_history')
  .insert({
    round_number: roundNumber,
    started_at: roundStartTime,
    ended_at: roundEndTime,
    winner_address: winner?.address,
    winner_clicks: winner?.total_clicks || 0,
    total_players: allPlayers.length,
    winner_reward: calculateReward(winner) // 20% du pot
  })
  .select()
  .single()

// 5. Sauvegarder TOUS les joueurs du round
if (allPlayers.length > 0) {
  const playersToInsert = allPlayers.map((p, index) => ({
    round_id: newRound.id,
    address: p.address,
    total_clicks: p.total_clicks,
    score: p.score,
    rank: index + 1
  }))
  
  await supabase
    .from('round_players')
    .insert(playersToInsert)
}

// 6. Incrémenter le round number
await supabase
  .from('current_round')
  .update({
    round_number: roundNumber + 1,
    started_at: roundEndTime
  })
  .eq('id', 1)

// 7. Nettoyer le leaderboard pour le nouveau round
await supabase
  .from('scores')
  .delete()
  .neq('id', 0)

console.log(`🏆 Round ${roundNumber} ended!`)
console.log(`👑 Winner: ${winner?.address}`)
console.log(`💰 Reward: ${calculateReward(winner)}`)
```

---

## 📊 Résultat

**Vous aurez un historique complet:**
- ✅ Tous les rounds passés
- ✅ Tous les winners
- ✅ Tous les joueurs par round
- ✅ Stats complètes (qui a joué quand, combien, etc.)

---

## 🎯 Avantages

1. **Transparence**: Voir tous les rounds passés
2. **Stats**: Analyser les patterns
3. **Légalité**: Preuve de tous les winners
4. **Marketing**: Pouvoir montrer l'historique
5. **Pas de perte**: Rien n'est supprimé, tout est sauvegardé!

---

## 🚀 Implémentation

Je vais créer le SQL et modifier l'API maintenant!

