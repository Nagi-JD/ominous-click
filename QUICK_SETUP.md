# ⚡ Setup Rapide - 15 minutes

## 🎯 Étapes pour activer le Leaderboard

### Étape 1: Créer un compte Supabase (5 min)

1. Aller sur https://supabase.com
2. Créer un compte gratuit
3. Créer un nouveau projet: **halloween-clicker**
4. Notez la base de données password
5. Attendre ~2 minutes que le projet soit créé

### Étape 2: Créer la table (2 min)

Dans SQL Editor de Supabase, coller et exécuter:

```sql
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  score BIGINT NOT NULL,
  damage_per_click INTEGER DEFAULT 0,
  damage_per_second INTEGER DEFAULT 0,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(address)
);

CREATE INDEX idx_score ON scores(score DESC);
CREATE INDEX idx_address ON scores(address);
CREATE INDEX idx_timestamp ON scores(timestamp DESC);
```

### Étape 3: Récupérer les credentials (1 min)

Dans **Project Settings → API**:
- Copier **URL**: `https://xxx.supabase.co`
- Copier **anon key**: `eyJhbGc...`

### Étape 4: Installer Supabase (1 min)

```bash
npm install @supabase/supabase-js
```

### Étape 5: Configurer (2 min)

Créer/éditer `.env.local`:

```env
VITE_TOKEN_MINT=VOTRE_MINT_ADDRESS
VITE_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=...
VITE_API_URL=http://localhost:3000

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJhbGc...
```

Sur Vercel, ajouter ces variables dans **Settings → Environment Variables**

### Étape 6: Activer les API avec Supabase (2 min)

**Option A: Remplacement des fichiers**

```bash
# Copier le contenu de
cp api/submit-score-with-supabase.js api/submit-score.js
cp api/leaderboard-with-supabase.js api/leaderboard.js
```

**Option B: Modification manuelle**

Éditer `api/submit-score.js` et `api/leaderboard.js` et ajouter le code Supabase (voir les fichiers avec `-with-supabase`).

### Étape 7: Déployer (2 min)

```bash
# Build
npm run build

# Deploy sur Vercel
vercel --prod
```

### Étape 8: Tester (2 min)

```bash
# Vérifier que ça marche
curl https://votre-projet.vercel.app/api/leaderboard
```

## ✅ Checklist

- [ ] Compte Supabase créé
- [ ] Table `scores` créée
- [ ] Credentials récupérés
- [ ] Package installé (`npm install @supabase/supabase-js`)
- [ ] Variables d'environnement configurées
- [ ] API mise à jour avec code Supabase
- [ ] Déployé sur Vercel
- [ ] Testé avec curl ou navigateur

## 🎮 Résultat

Une fois terminé, vous aurez:
- ✅ Leaderboard en temps réel
- ✅ Scores persistants dans Supabase
- ✅ Top 100 affichés automatiquement
- ✅ Rank calculé pour chaque joueur

## 🆘 Si ça ne marche pas

Vérifier les logs:
```bash
vercel logs
```

Vérifier que les variables d'environnement sont bien configurées sur Vercel.

---

🎃 **C'est prêt! Happy clicking!** 👻

