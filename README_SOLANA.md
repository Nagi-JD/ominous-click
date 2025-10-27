# 🎃 Halloween Clicker - Intégration Solana

## 📋 Résumé de l'intégration

Système de leaderboard avec rewards pour les Top 10, sans connexion wallet requise.

### ✅ Ce qui a été fait

1. **Vérification de possession de token**
   - L'utilisateur entre simplement son adresse Solana
   - Le système vérifie qu'il possède le token requis
   - Pas de connexion wallet nécessaire = moins de friction

2. **Composant AddressInput**
   - Remplace le WalletButton
   - Input simple pour l'adresse
   - Vérification en temps réel

3. **Service blockchain**
   - `verifyTokenOwnership()` : Vérifie possession du token
   - `submitScore()` : Soumet score au leaderboard
   - `getLeaderboard()` : Récupère les top players

4. **Composant Leaderboard**
   - Affiche les top 100
   - Badge pour le joueur
   - Notification rewards Top 10

## 🚀 Prochaines étapes

### 1. Créer le token requis (SPRAY ou autre)

```bash
# Sur devnet
spl-token create-token --decimals 0

# Notez le mint address obtenu
```

Puis configurez dans `src/config.ts`:
```typescript
REQUIRED_TOKEN_MINT: 'VOTRE_MINT_ADDRESS'
```

### 2. Mettre en place le backend API

Voir `BACKEND_API.md` pour les détails.

Solutions recommandées:
- **Vercel Serverless** (gratuit, facile)
- **Firebase Functions** (gratuit, auto-scaling)
- **Node.js simple** (pour MVP rapide)

Endpoints nécessaires:
- `POST /api/verify-token` : Vérifie possession token
- `POST /api/submit-score` : Soumet un score
- `GET /api/leaderboard` : Récupère leaderboard

### 3. Système de rewards

**Option A: Manuel (simple)**
- Créer un wallet "Reward Pool"
- Lui envoyer du SOL (ex: 10 SOL)
- Distribuer manuellement aux top 10 chaque semaine

**Option B: Automatique (avancé)**
- Cron job qui vérifie les scores quotidiennement
- Distribution automatique via program Solana
- Logs vérifiables

### 4. Configurer Helius RPC

Éditez `.env` ou `src/config.ts`:
```typescript
RPC_ENDPOINT: 'https://mainnet.helius-rpc.com/?api-key=VOTRE_CLE'
```

Gratuit jusqu'à 100k requêtes/jour ! [[memory:7499914]]

## 🎮 Comment ça marche

1. **Joueur entre son adresse**
   ```typescript
   address: "Gh3vxXy8aAbc...9K2p"
   ```

2. **Vérification du token**
   ```typescript
   hasToken = await verifyTokenOwnership(address)
   // Vérifie via Solana RPC si l'adresse a le token
   ```

3. **Joueur clique et accumule des bonbons**
   - Tous ses scores sont enregistrés localement
   - Peut soumettre ses meilleurs scores

4. **Soumission au leaderboard**
   ```typescript
   await submitScore(address, score, stats)
   // Envoie au backend API
   ```

5. **Affichage du leaderboard**
   - Meilleurs 100 scores
   - Classement en temps réel
   - Récompenses top 10 affichées

## 🏆 Système de rewards (Top 10)

### Comment distribuer les rewards

**Méthode 1: Manuel**
```bash
# Chaque semaine, distribuer aux top 10
# 1er: 1 SOL, 2ème: 0.5 SOL, etc.
```

**Méthode 2: Script automatique**
```javascript
// backend/cron.js
const winners = await getTop10()
winners.forEach(async (player, index) => {
  const amount = REWARDS[index] || REWARDS.TOP10
  await sendSOL(player.address, amount)
})
```

### Wallet Reward Pool

Créez un wallet dédié:
```bash
solana-keygen new --outfile reward-wallet.json
# Notez l'adresse publique
```

Envoyez-y du SOL:
```bash
solana transfer REWARD_WALLET_ADDRESS 10 --allow-unfunded-recipient
```

## 🔒 Sécurité

### Anti-cheat

1. **Rate limiting**: 1 soumission toutes les 5 minutes
2. **Vérification de progression**: Scores doivent croître logiquement
3. **Signature on-chain**: Optionnel, mais plus sécurisé

### Backend

```javascript
// Exemple: validation basique
if (newScore > oldScore * 10) {
  // Suspicious jump, flag for review
  return { error: 'Score suspect' }
}
```

## 📊 Architecture

```
Frontend (Vue)
  ↓
Config (token, RPC)
  ↓
Services (verification, submission)
  ↓
Backend API
  ↓
Database (scores, leaderboard)
  ↓
Reward Distribution (cron)
```

## 🛠️ Commandes utiles

```bash
# Développer
npm run dev

# Build
npm run build

# Preview
npm run preview

# Vérifier les types
npm run type-check
```

## 📝 Variables d'environnement

Créez `.env`:
```env
VITE_TOKEN_MINT=Gh3vx...
VITE_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=xxx
VITE_API_URL=https://votre-api.vercel.app
```

## 💡 Améliorations futures

1. **NFT Achievements**: NFTs uniques pour milestones
2. **Tournois**: Événements avec prizes pool
3. **Staking**: Miser du SOL pour des bonus de gains
4. **Marketplace**: Échanger des upgrades entre joueurs

## 🐛 Dépannage

**Erreur: "Cannot find module '@solana/web3.js'"**
```bash
npm install @solana/web3.js
```

**Erreur de connexion RPC**
- Vérifiez votre clé API Helius
- Utilisez devnet pour tester

**Token non détecté**
- Vérifiez le mint address dans config.ts
- Assurez-vous que l'adresse a bien le token

---

Créé pour **Halloween Clicker** 🎃👻

