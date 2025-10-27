# ✅ Checklist Vercel - Vérifier que tout est configuré

## Variables d'environnement REQUISES sur Vercel

Dans Vercel Dashboard → Settings → Environment Variables, vous DEVEZ avoir:

### ✅ VITE_TOKEN_MINT
```
Value: 9i9y5uZPFZYVJE8Ym4agXjkaCqniSDT95JPfSUH5pump
Environment: Production, Preview, Development
```

### ✅ VITE_RPC_ENDPOINT  
```
Value: https://mainnet.helius-rpc.com/?api-key=917e1df6-fac1-44e1-8338-f21346903851
Environment: Production, Preview, Development
```

### ✅ VITE_API_URL
```
Value: https://votre-projet.vercel.app
(Remplacez par VOTRE vraie URL Vercel)
Environment: Production, Preview, Development
```

### ✅ SUPABASE_URL
```
Value: https://oweiqxzykpbeznntdeey.supabase.co
Environment: Production, Preview, Development
```

### ✅ SUPABASE_KEY
```
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bWlleHF5a3BiZXpuZnRkZWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzUwNjIsImV4cCI6MjA3NzE1MTA2Mn0.DXnDL-XqT_-kTSSDo7nTXTkhBuy60p561EsC3DkYjg0
Environment: Production, Preview, Development
```

⚠️ **IMPORTANT**: `VITE_API_URL` doit être VOTRE URL Vercel (pas localhost)

## 🧪 Comment tester

### 1. Vérifier Supabase
- Allez sur https://supabase.com/dashboard
- Ouvrez votre projet
- Table Editor → scores
- La table doit être vide au début

### 2. Jouer au jeu
- Ouvrez votre site Vercel
- Entrez votre adresse Solana
- Cliquez sur la citrouille
- Le score doit s'enregistrer

### 3. Vérifier que le score est soumis
- Retournez sur Supabase → Table Editor → scores
- Vous devriez voir votre score apparaître

### 4. Ouvrir le leaderboard
- Sur le site, cliquez sur le bouton leaderboard (trophy icon)
- Votre score doit apparaître

## 🐛 Si ça ne marche pas

### Vérifier les logs Vercel
1. Vercel Dashboard → Deployments
2. Cliquer sur le dernier déploiement
3. Voir les logs de build
4. Voir les logs de runtime

### Vérifier Supabase
1. Vérifier que les credentials sont corrects
2. Vérifier que la table `scores` existe
3. Vérifier les permissions (RLS doit permettre les opérations)

### Vérifier que l'API fonctionne
Testez directement:
```
https://votre-projet.vercel.app/api/leaderboard
```

Vous devriez voir: `{"players":[],"total":0,"limit":100}`

---

**Si le leaderboard est vide, c'est NORMAL !** C'est parce que personne n'a encore soumis de score.

Jouez et cliquez sur la citrouille, puis regardez Supabase pour voir si le score apparaît!

