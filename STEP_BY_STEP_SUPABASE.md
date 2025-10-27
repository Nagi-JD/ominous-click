# 🎯 Guide Pas à Pas - Setup Supabase pour Halloween Clicker

## ✅ Étape 1: Créer la table (5 minutes)

### Option A: Via SQL Editor (Recommandé)

1. Dans votre Supabase Dashboard
2. Aller à **SQL Editor** (menu gauche)
3. Cliquer sur **New query**
4. Copier tout le contenu de `supabase-setup.sql`
5. Coller dans l'éditeur
6. Cliquer sur **Run** (ou F5)
7. Attendre ~10 secondes
8. ✅ Vous devriez voir "Success. No rows returned"

### Option B: Via Table Editor (Graphique)

1. Aller à **Table Editor**
2. Cliquer sur **New table**
3. Nom: `scores`
4. Cliquer **Save**

Ensuite, ajouter ces colonnes une par une:
- `id` → Type: `int8` → Primary key → Identity
- `address` → Type: `text` → Required → Unique
- `score` → Type: `int8` → Required
- `damage_per_click` → Type: `int4` → Default: 0
- `damage_per_second` → Type: `int4` → Default: 0
- `timestamp` → Type: `timestamptz` → Default: now()
- `created_at` → Type: `timestamptz` → Default: now()
- `updated_at` → Type: `timestamptz` → Default: now()

Cliquer **Save** pour chaque colonne.

---

## ✅ Étape 2: Récupérer les credentials (2 minutes)

1. Dans Supabase Dashboard
2. Aller à **Project Settings** (icône engrenage en bas à gauche)
3. Cliquer sur **API** dans le menu
4. Vous verrez:

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **Copier** ces deux valeurs:
   - **URL** (Project URL)
   - **anon key** (le premier, celui qui commence par `eyJ...`)

---

## ✅ Étape 3: Installer Supabase client (1 minute)

Dans votre terminal:

```bash
cd c:\Users\Nayte\Documents\halloweenclicker
npm install @supabase/supabase-js
```

Attendre l'installation.

---

## ✅ Étape 4: Configurer les variables d'environnement (3 minutes)

### Pour local (créer .env.local):

Créer un fichier `.env.local` à la racine:

```env
VITE_TOKEN_MINT=VOTRE_MINT_ADDRESS
VITE_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=...
VITE_API_URL=http://localhost:3000

# Supabase credentials (à remplir avec vos vraies valeurs)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Remplacer `xxxxx` et la clé par vos vraies valeurs de l'étape 2.

### Pour Vercel (plus tard):

Quand vous déployerez, allez sur Vercel Dashboard → votre projet → Settings → Environment Variables et ajoutez les mêmes variables.

---

## ✅ Étape 5: Activer les API avec Supabase (2 minutes)

### Remplacer les fichiers API:

```bash
# Dans le dossier du projet
cp api/submit-score-with-supabase.js api/submit-score.js
cp api/leaderboard-with-supabase.js api/leaderboard.js
```

OU copier le contenu manuellement depuis les fichiers `-with-supabase.js` vers les fichiers normaux.

---

## ✅ Étape 6: Tester localement (3 minutes)

```bash
# Lancer le serveur de dev
npm run dev

# Dans un autre terminal, tester l'API
curl http://localhost:5173/api/leaderboard
```

Vous devriez voir: `{"players":[],"total":0,"limit":100}`

### Tester avec un score:

```bash
curl -X POST http://localhost:5173/api/submit-score \
  -H "Content-Type: application/json" \
  -d '{"address":"Gh3v...test","score":12345,"stats":{"damagePerClick":100,"damagePerSecond":50}}'
```

---

## ✅ Étape 7: Déployer sur Vercel (3 minutes)

```bash
# Build
npm run build

# Si pas encore connecté à Vercel
vercel login

# Deploy
vercel --prod
```

Après déploiement, configurer les variables d'environnement sur Vercel Dashboard.

---

## 🎯 Vérification finale

### Checklist:

- [ ] Table `scores` créée dans Supabase
- [ ] Credentials récupérés (URL + anon key)
- [ ] Package `@supabase/supabase-js` installé
- [ ] Variables d'environnement configurées (.env.local)
- [ ] Fichiers API mis à jour avec code Supabase
- [ ] Test local réussi
- [ ] Déployé sur Vercel
- [ ] Variables d'environnement sur Vercel configurées

### Test en production:

```bash
curl https://votre-projet.vercel.app/api/leaderboard
```

---

## 🆘 Troubleshooting

**Erreur "relation scores does not exist"**
→ La table n'est pas créée. Refaire l'étape 1.

**Erreur "Invalid API key"**
→ La clé Supabase est incorrecte. Revoir l'étape 2.

**Erreur "Request failed"**
→ Vérifier que les variables d'environnement sont bien configurées sur Vercel.

**Table vide après submit**
→ Vérifier les logs Vercel: `vercel logs`

---

🎃 **C'est tout! Le leaderboard devrait fonctionner!** 👻

