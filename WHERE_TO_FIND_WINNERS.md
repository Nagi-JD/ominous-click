# 💰 Où trouver les adresses des gagnants pour envoyer les rewards?

## 📊 Vous avez **3 endroits** pour voir les gagnants:

### 1. **Supabase - Table `round_history`** ⭐ Recommandé

**Aller sur**: https://supabase.com/dashboard → Table Editor → `round_history`

Vous verrez:
```
round_number | winner_address      | winner_clicks | total_players | winner_reward
-------------|---------------------|---------------|---------------|--------------
1            | Gh3v...9K2p        | 1234          | 5             | 1.0 SOL
2            | Xy8a...3Mnq        | 987           | 3             | 1.0 SOL
3            | Abc2...7Pq8        | 2345          | 7             | 1.0 SOL
```

**Pour envoyer les rewards**, vous copiez l'adresse de `winner_address`!

---

### 2. **Supabase - Table `round_players`** (pour voir tous les joueurs)

**Aller sur**: https://supabase.com/dashboard → Table Editor → `round_players`

Vous verrez TOUS les joueurs de chaque round:
```
round_id | address       | total_clicks | score    | rank
---------|---------------|--------------|----------|-----
1        | Gh3v...9K2p   | 1234         | 50000    | 1    ← Winner
1        | Xy8a...3Mnq   | 987          | 40000    | 2
1        | Abc2...7Pq8   | 543          | 35000    | 3
```

**Filtrer par `rank = 1`** pour voir uniquement les gagnants!

---

### 3. **GitHub Actions - Logs** (en temps réel)

**Aller sur**: https://github.com/Nagi-JD/halloweenproject → Actions

1. Cliquez sur "Claim Round Winners Every 5 Minutes"
2. Ouvrez la dernière exécution
3. Dans les logs vous verrez:

```
🏆 Round Champion:
{
  round: 5,
  address: "Gh3v...9K2p",
  clicks: 1234,
  reward: "1 SOL"
}
✅ Claim successful!
🎉 Round winners claimed and leaderboard reset!
```

---

## 💰 Pour envoyer les rewards manuellement

### Option 1: Query SQL dans Supabase

Créer une vue pour voir tous les gagnants non payés:

```sql
-- Voir tous les gagnants avec leurs rewards
SELECT 
  round_number,
  winner_address,
  winner_clicks,
  winner_reward,
  ended_at
FROM round_history
WHERE winner_address IS NOT NULL
ORDER BY round_number DESC
LIMIT 100;
```

### Option 2: Export pour Excel

Dans Supabase Table Editor:
1. Table `round_history`
2. Bouton **"Export"**
3. Télécharger en CSV
4. Ouvrir dans Excel
5. Filter sur `winner_address` pour voir tous les gagnants

### Option 3: Créer une page admin (future)

Je peux créer une page web pour voir tous les gagnants et marquer comme payés!

---

## 🔔 Solution: Auto-payment system

Pour envoyer AUTOMATIQUEMENT les rewards, il faut:
1. Un wallet Solana avec des SOL
2. Ajouter la logique d'envoi dans `api/claim-round-winners.js`
3. Transaction automatique au gagnant

Je peux implémenter ça si vous voulez!

---

## 📊 Query pour voir tous les gagnants maintenant

**Dans Supabase SQL Editor:**

```sql
SELECT 
  round_number,
  winner_address,
  winner_clicks,
  winner_reward as reward_sol,
  ended_at,
  EXTRACT(EPOCH FROM (ended_at - started_at))/60 as duration_minutes
FROM round_history
WHERE winner_address IS NOT NULL
ORDER BY round_number DESC;
```

**Résultat:**
Vous verrez tous les gagnants avec leur adresse à copier pour envoyer les rewards!

