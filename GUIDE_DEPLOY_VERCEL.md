# 🚀 Guide de déploiement sur Vercel - Simple & Rapide

## Étape 1: Se connecter à Vercel (2 minutes)

### Option A: Via le site web (RECOMMANDÉ)

1. Aller sur https://vercel.com
2. Cliquer sur **"Start Deploying"** ou **"Sign Up"**
3. Choisir **"Continue with GitHub"**
4. Autoriser Vercel à accéder à votre compte GitHub

### Option B: Via CLI

```bash
npm install -g vercel
vercel login
# Suivre les instructions
```

---

## Étape 2: Importer le projet (1 minute)

1. Sur Vercel Dashboard, cliquer sur **"Add New Project"** ou **"Import Project"**
2. Chercher votre repo: **halloweenproject**
3. Cliquer sur **"Import"**

---

## Étape 3: Configurer le projet (3 minutes)

Vercel détectera automatiquement que c'est un projet Vite. Gardez les settings par défaut:

- **Framework Preset**: Vite ✅
- **Root Directory**: . (racine) ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm install` ✅

**Ne changez rien**, cliquez sur **"Deploy"** !

---

## Étape 4: Configurer les variables d'environnement (5 minutes)

⚠️ **IMPORTANT**: Après le déploiement, allez dans **Settings → Environment Variables**

Ajoutez ces 5 variables:

### 1. VITE_TOKEN_MINT
```
Value: 9i9y5uZPFZYVJE8Ym4agXjkaCqniSDT95JPfSUH5pump
✅ Apply to: Production, Preview, Development
```

### 2. VITE_RPC_ENDPOINT
```
Value: https://mainnet.helius-rpc.com/?api-key=917e1df6-fac1-44e1-8338-f21346903851
✅ Apply to: Production, Preview, Development
```

### 3. VITE_API_URL
```
Value: https://votre-projet.vercel.app
(Remplacez par le vrai nom de votre projet Vercel)
✅ Apply to: Production, Preview, Development
```

### 4. SUPABASE_URL
```
Value: https://oweiqxzykpbeznntdeey.supabase.co
✅ Apply to: Production, Preview, Development
```

### 5. SUPABASE_KEY
```
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bWlleHF5a3BiZXpuZnRkZWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzUwNjIsImV4cCI6MjA3NzE1MTA2Mn0.DXnDL-XqT_-kTSSDo7nTXTkhBuy60p561EsC3DkYjg0
✅ Apply to: Production, Preview, Development
```

Cliquer sur **"Save"** pour chaque variable.

---

## Étape 5: Redéployer (1 minute)

1. Cliquer sur **"Deployments"** dans le menu
2. Cliquer sur les 3 points (...) à côté du dernier déploiement
3. Cliquer sur **"Redeploy"**
4. Attendre ~2 minutes...

---

## Étape 6: Tester ! 🎉

Votre site sera disponible sur:
```
https://votre-projet.vercel.app
```

Ou un nom personnalisé si vous en configurez un.

---

## ✅ Checklist de vérification

Une fois déployé, vérifier:

- [ ] Le site se charge sans erreur
- [ ] La vérification d'adresse fonctionne
- [ ] Le jeu se débloque après vérification
- [ ] Cliquer sur la citrouille fonctionne
- [ ] Le leaderboard s'ouvre
- [ ] Pas d'erreurs dans la console du navigateur

---

## 🆘 Troubleshooting

### Erreur "Variables not found"
→ Vérifier que toutes les variables sont bien configurées dans Vercel

### Erreur "Database error"
→ Vérifier que Supabase est bien connecté (aller sur Supabase Dashboard)

### Erreur "Cannot fetch leaderboard"
→ Vérifier que l'API_URL est correct dans les variables

### Le site charge mais est vide
→ Vérifier les logs Vercel dans le dashboard

---

## 📝 Notes importantes

### Variables d'environnement

**IMPORTANT**: Les variables commençant par `VITE_` sont injectées dans le **frontend**.

Les variables sans `VITE_` (comme `SUPABASE_URL`) sont accessibles uniquement dans les **API routes** (`/api/*`).

C'est pourquoi vos API Supabase marchent - elles ont accès à `process.env.SUPABASE_URL`.

### Mise à jour en production

Après chaque changement sur GitHub:
1. Vercel déploie automatiquement
2. Les variables d'environnement restent configurées
3. Pas besoin de redéployer manuellement

### Modifier les variables

Vous pouvez changer les variables d'environnement n'importe quand:
1. Dashboard Vercel → Settings → Environment Variables
2. Modifier la valeur
3. Cliquer Redeploy

---

🎃 **Ready to deploy! Good luck!** 👻

