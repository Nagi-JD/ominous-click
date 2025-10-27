# 🤖 Résolution automatique des rounds - Comment ça marche?

## ✅ OUI, tout est automatique!

### 🎯 Timeline automatique

```
00:00 - Round commence
02:30 - Joueurs cliquent et se battent
05:00 - Round se termine AUTOMATIQUEMENT
    ↓
✅ API appelée par GitHub Actions
    ↓
✅ Gagnant identifié (#1 par clics)
    ↓
✅ TOUS les joueurs sauvegardés dans round_players
    ↓
✅ Round sauvé dans round_history
    ↓
✅ Leaderboard nettoyé (table scores vide)
    ↓
✅ Round # suivant commence
    ↓
00:00 - Nouveau round commence
```

## 🔄 Cycle continu 24/7

**GitHub Actions** appelle automatiquement votre API toutes les 5 minutes:
- ✅ Round 1: 00:00 → 00:05
- ✅ Round 2: 00:05 → 00:10
- ✅ Round 3: 00:10 → 00:15
- ✅ Round 4: 00:15 → 00:20
- ... et ainsi de suite pour toujours!

## 📊 Que se passe-t-il?

### À chaque fin de round (automatique):

1. **Sauvegarde de tous les joueurs**
   ```sql
   -- Tous les joueurs sont insérés dans round_players
   -- Avec leur rank, leur score, leurs clics
   ```

2. **Sauvegarde du gagnant**
   ```sql
   -- Le #1 est enregistré dans round_history
   -- Avec le nombre de clics et le reward
   ```

3. **Nettoyage du leaderboard**
   ```sql
   -- La table "scores" est vidée
   -- Prêt pour le nouveau round
   ```

4. **Incrémentation du round**
   ```sql
   -- Le round_number augmente
   -- Nouveau round commence
   ```

## 🎯 Résultat

**Vous aurez un historique complet**:
- ✅ round_history : Tous les rounds passés
- ✅ round_players : Tous les joueurs de chaque round
- ✅ scores : Leaderboard actuel (vidé après chaque round)

**Aucune perte de données!** Tout est préservé dans l'historique.

## 🔍 Où voir l'historique?

Sur Supabase:
1. Table `round_history` → Tous les rounds terminés
2. Table `round_players` → Tous les joueurs avec leur rank par round
3. Table `scores` → Leaderboard actuel du round en cours

## ⏰ Exemple concret

**Round 5** se termine à 00:25:
- 3 joueurs avaient joué
- Gagnant: `Gh3v...9K2p` avec 1234 clics
- Sauvegardé dans `round_history` (round_number = 5)
- Les 3 joueurs sauvegardés dans `round_players` avec leurs rangs
- Table `scores` nettoyée
- **Round 6** commence automatiquement!

## 🚀 Pas besoin de faire quoi que ce soit!

Le système tourne **100% automatiquement** grâce à:
- ✅ GitHub Actions (gratuit)
- ✅ Qui appelle l'API toutes les 5 minutes
- ✅ Qui sauvegarde tout dans Supabase
- ✅ Qui nettoie et redémarre

**Vous n'avez rien à faire!** Juste regarder les rounds se résoudre. 🎉

