# 🏆 Système de tournoi - 30 minutes

## 🎯 Concept
Chaque **30 minutes**, une nouvelle ronde démarre:
- Les joueurs cliquent pendant 30 minutes
- Le top 10 à la fin de la ronde reçoit des rewards
- Le leaderboard est nettoyé et une nouvelle ronde démarre

## ✅ Implémentation actuelle

### Frontend (`Leaderboard.vue`)
- ✅ Timer affiche le temps restant: `15m 23s`
- ✅ Refresh toutes les 10 secondes pour voir les autres joueurs
- ✅ Quand le timer atteint 0, besoin de déclencher le claim

### Backend (`api/claim-round-winners.js`)
- ✅ Récupère le top 10
- ✅ Calcule les rewards pour chaque position
- ✅ Nettoie le leaderboard (supprime tous les scores)
- ⚠️ **TODO**: Envoyer les rewards Solana automatiquement

## ⚠️ Ce qui manque

### 1. **Déclenchement automatique toutes les 30 minutes**
Vous avez 2 options:

**Option A: Cron job (Vercel Pro)**
```bash
# Utiliser Vercel Cron (nécessite Vercel Pro)
# Créer vercel.json avec:
{
  "crons": [{
    "path": "/api/claim-round-winners",
    "schedule": "*/30 * * * *"
  }]
}
```

**Option B: Déclenchement manuel**
Créer un admin panel ou déclencher manuellement via:
```bash
curl -X POST https://votre-app.vercel.app/api/claim-round-winners
```

### 2. **Envoi automatique des rewards Solana**
L'API actuelle calcule les rewards mais ne les envoie pas.

Pour envoyer automatiquement, vous devez:
1. Configurer un wallet Solana avec des SOL
2. Ajouter la logique d'envoi dans `claim-round-winners.js`

```javascript
// Example (à implémenter)
const { Keypair } = require('@solana/web3.js')
const wallet = Keypair.fromSecretKey(YOUR_SECRET_KEY)

async function sendReward(address, amountInSol) {
  // Send SOL transaction to address
  // You'll need @solana/web3.js implementation
}
```

### 3. **Notification des gagnants**
Afficher les gagnants à la fin du round:
- Popup "Round ended!"
- Liste des 10 gagnants avec leurs rewards
- "Next round starting in 5... 4... 3..."

## 🚀 Prochaines étapes

1. ✅ Frontend avec timer: **FAIT**
2. ✅ API claim-winners: **FAIT**
3. ⏳ Déclenchement automatique (Cron ou manuel)
4. ⏳ Envoi automatique des rewards Solana
5. ⏳ Notification UI des gagnants

## 📊 Structure actuelle

```
Round Start → 30 minutes of clicking → Round End
                                                    ↓
                                         Claim Winners API
                                                    ↓
                                         Send Rewards (TODO)
                                                    ↓
                                         Reset Leaderboard
                                                    ↓
                                         New Round Start
```

