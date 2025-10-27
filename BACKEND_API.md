# API Backend pour Halloween Clicker

## Fonctionnalités requises

### 1. Vérification de possession de token
**Endpoint:** `POST /api/verify-token`

**Request:**
```json
{
  "address": "Gh3vxXy8aAbc...9K2p"
}
```

**Response:**
```json
{
  "hasToken": true,
  "timestamp": 1234567890
}
```

### 2. Soumission de score
**Endpoint:** `POST /api/submit-score`

**Request:**
```json
{
  "address": "Gh3vxXy8aAbc...9K2p",
  "score": 1234567890,
  "stats": {
    "damagePerClick": 100,
    "damagePerSecond": 5000
  },
  "timestamp": 1234567890
}
```

**Response:**
```json
{
  "success": true,
  "rank": 15
}
```

### 3. Récupération du leaderboard
**Endpoint:** `GET /api/leaderboard?limit=100`

**Response:**
```json
{
  "players": [
    {
      "address": "Gh3vxXy8aAbc...9K2p",
      "score": 987654321,
      "rank": 1
    },
    ...
  ]
}
```

## Stack recommandé

### Option 1: Node.js + Express (Simple)
```bash
npm init -y
npm install express cors
npm install -D @types/node @types/express
```

### Option 2: Vercel Serverless Functions
- Pas de serveur à gérer
- Scaling automatique
- Gratuit jusqu'à 100GB-bandwidth

### Option 3: Firebase Functions
- Backend serverless
- Gratuit jusqu'à 2 million invocations/mois

## Base de données

### Option simple: JSON file (pour MVP)
```javascript
// scores.json
[
  { "address": "...", "score": 123, "timestamp": 123 }
]
```

### Option production: PostgreSQL ou MongoDB
- PostgreSQL recommandé pour le leaderboard
- Index sur `address` et `score`
- Auto-cleanup des anciens scores

## Gestion des rewards (Top 10)

### Stratégie:
1. **Prix pool:** Créer un wallet Solana pour stocker les rewards
2. **Cron job:** Vérifier quotidiennement les top 10
3. **Distribution:** Envoyer automatiquement les SOL aux gagnants

### Exemple cron:
```javascript
// Chaque jour à minuit
cron.schedule('0 0 * * *', async () => {
  const top10 = await getTop10Players()
  
  // Vérifier que chaque joueur a encore le token requis
  const validPlayers = await Promise.all(
    top10.map(async (player) => {
      const hasToken = await verifyTokenOwnership(player.address)
      return hasToken ? player : null
    })
  )
  
  // Distribuer les rewards
  await distributeRewards(validPlayers)
})
```

## Security

1. **Rate limiting:** Limiter les soumissions de scores (1 toutes les 5 minutes max)
2. **Verification de signature:** Vérifier que le score correspond bien à l'IP
3. **Anti-cheat:** Vérifier la progression logique du joueur

## Déploiement

### Vercel (Recommandé)
```bash
vercel init
vercel --prod
```

### Heroku
```bash
git push heroku main
```

### Railway
```bash
railway up
```

## Variables d'environnement

```env
# .env
SOLANA_RPC_URL=https://api.devnet.solana.com
REQUIRED_TOKEN_MINT=VOTRE_TOKEN_MINT
REWARD_WALLET_PRIVATE_KEY=...
DATABASE_URL=...
```

