# 🚀 Guide de déploiement sur Vercel

## 📁 Structure créée

```
halloweenclicker/
├── api/
│   ├── verify-token.js      ✅ Créé
│   ├── submit-score.js      ✅ Créé
│   └── leaderboard.js       ✅ Créé
├── vercel.json              ✅ Créé
└── ...
```

## 🎯 Étape 1: Installer Vercel CLI

```bash
npm install -g vercel
```

## 🎯 Étape 2: Se connecter à Vercel

```bash
vercel login
```

Suivre les instructions pour vous connecter avec GitHub/Email.

## 🎯 Étape 3: Créer le fichier .env.local

Créez un fichier `.env.local` (pour Vercel):

```env
VITE_TOKEN_MINT=VOTRE_MINT_ADDRESS
VITE_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=VOTRE_CLE
VITE_API_URL=https://votre-projet.vercel.app
```

## 🎯 Étape 4: Déployer

### Déploiement initial

```bash
# Dans le dossier du projet
cd c:\Users\Nayte\Documents\halloweenclicker

# Build le projet
npm run build

# Déployer sur Vercel
vercel

# Suivez les instructions:
# ? Set up and deploy "halloweenclicker"? [Y/n] Y
# ? Which scope do you want to deploy to? [Your account]
# ? Link to existing project? [N/y] N
# ? What's your project's name? halloween-clicker
# ? In which directory is your code located? ./
```

### Déploiement en production

```bash
vercel --prod
```

## 🎯 Étape 5: Configurer les variables d'environnement sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Ouvrir votre projet
3. Settings → Environment Variables
4. Ajouter ces variables:

```
VITE_TOKEN_MINT         = Votre mint address
VITE_RPC_ENDPOINT       = https://mainnet.helius-rpc.com/?api-key=...
VITE_API_URL           = https://halloween-clicker.vercel.app
```

5. Cliquer sur **Redeploy** pour appliquer les changements

## 🎯 Étape 6: Tester les API

Votre site sera disponible sur:
- **Production**: `https://halloween-clicker.vercel.app`
- **Preview**: `https://halloween-clicker-xyz.vercel.app`

Tester les endpoints:
```bash
# Vérifier un token
curl -X POST https://halloween-clicker.vercel.app/api/verify-token \
  -H "Content-Type: application/json" \
  -d '{"address":"VotreAdresse..."}'

# Soumettre un score
curl -X POST https://halloween-clicker.vercel.app/api/submit-score \
  -H "Content-Type: application/json" \
  -d '{"address":"...","score":12345,"stats":{...}}'

# Récupérer le leaderboard
curl https://halloween-clicker.vercel.app/api/leaderboard
```

## 🎯 Étape 7: Ajouter une vraie database (Optionnel)

### Option A: Vercel KV (Redis) - Gratuit
```bash
# Ajouter KV Storage
vercel kv create
```

Dans `api/submit-score.js`:
```javascript
import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // Store score
  await kv.zadd('leaderboard', score, `${address}:${timestamp}`)
  // ...
}
```

### Option B: Supabase (Gratuit) - Recommandé
```bash
npm install @supabase/supabase-js
```

Dans `api/submit-score.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('scores')
    .insert({ address, score, stats })
  // ...
}
```

## ✅ Avantages Vercel

1. **Gratuit** jusqu'à 100GB bandwidth
2. **Auto-scaling** automatique
3. **Edge Functions** rapides (global)
4. **Zero config** pour les API routes
5. **Preview URLs** pour chaque commit

## 📝 Commandes utiles

```bash
# Voir les logs
vercel logs

# Voir les déploiements
vercel ls

# Voir les détails du projet
vercel inspect

# Développer localement
vercel dev
```

## 🔥 Prochaines étapes

1. ✅ Déployer sur Vercel
2. ⏳ Configurer variables d'environnement
3. ⏳ Ajouter une vraie database (Supabase recommandé)
4. ⏳ Implémenter la vérification réelle de token
5. ⏳ Tester en production

## 🐛 Troubleshooting

**Erreur**: "Cannot find module"
```bash
# Réinstaller les dépendances
npm install
```

**Erreur**: "Environment variables not set"
→ Aller sur Vercel dashboard et ajouter les variables

**API ne répond pas**
→ Vérifier les logs: `vercel logs`

---

🎃 **Ready to deploy!** 👻

