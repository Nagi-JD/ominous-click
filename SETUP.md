# 🚀 Setup rapide - Halloween Clicker avec Solana

## ✅ Pour voir le site maintenant

Le serveur tourne sur **http://localhost:5173**

Ouvrez votre navigateur et allez-y !

## 📝 Configuration nécessaire

### 1. Créer le fichier `.env` à la racine du projet

```env
# Mint address de votre memecoin (remplacez par le vrai)
VITE_TOKEN_MINT=Gh3vxXy8aAbc...9K2p

# RPC Endpoint (utilisez Helius gratuit)
VITE_RPC_ENDPOINT=https://api.devnet.solana.com

# Backend API (à configurer plus tard)
VITE_API_URL=http://localhost:3000
```

### 2. Pour obtenir un RPC Helius gratuit (100k requêtes/jour)

1. Aller sur https://www.helius.dev
2. Créer un compte gratuit
3. Créer un projet
4. Copier la clé API
5. Mettre dans `.env`:
```env
VITE_RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=VOTRE_CLE
```

### 3. Ensuite, pour le mint address

Si vous avez déjà votre memecoin créé, mettez son mint address dans `VITE_TOKEN_MINT`.

## 🎮 Tester le jeu

1. Site sur http://localhost:5173
2. Entrez une adresse Solana (pour tester)
3. Cliquez sur la citrouille pour accumuler des bonbons
4. Explorez les améliorations
5. Voir le leaderboard (top right)

## 🔧 Commandes utiles

```bash
# Voir le site en dev
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

## 📦 Déployer

### Option 1: Vercel (Recommandé - Gratuit)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'env
# vercel dashboard > Settings > Environment Variables
```

### Option 2: Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### Option 3: GitHub Pages

```bash
npm run build
# Copier le dossier 'dist' vers gh-pages
```

## ⚠️ Note importante

Pour que la vérification de token fonctionne:
1. Il faut que `.env` soit configuré avec le bon mint address
2. Le RPC doit être accessible (Helius gratuit fonctionne)
3. Les joueurs doivent avoir le token à leur adresse

## 🐛 Troubleshooting

**Erreur "Cannot read property..."**
- Redémarrer le serveur: `Ctrl+C` puis `npm run dev`

**La vérification ne marche pas**
- Vérifier que le mint address est correct dans `.env`
- Vérifier que l'adresse a bien le token

**Le leaderboard est vide**
- C'est normal ! Il faut mettre en place le backend API
- Les scores sont juste sauvegardés localement pour le moment

## 💡 Next steps

1. ✅ Tester le jeu localement
2. ⏳ Configurer le `.env` avec votre mint address
3. ⏳ Mettre en place le backend API (voir `BACKEND_API.md`)
4. ⏳ Créer le système de distribution de rewards
5. ⏳ Déployer en production

---

🎃 **Happy clicking!**

