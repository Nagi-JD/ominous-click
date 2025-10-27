# 🐛 Debug - Pourquoi Supabase est vide

## Étapes de diagnostic

### 1. Vérifier les logs Vercel

Sur Vercel Dashboard:
1. Votre projet → **Deployments**
2. Cliquer sur le dernier déploiement
3. **Functions** → Voir les logs
4. Ou **Logs** dans le menu latéral

Cherchez des messages comme:
- `🔍 Debug - Environment variables:`
- `✅ SUPABASE_URL: ✅` ou `❌`
- `📊 Submitting score:`

### 2. Tester l'API manuellement

Testez si votre API fonctionne:

```bash
curl -X POST https://halloweenproject-quqc.vercel.app/api/submit-score \
  -H "Content-Type: application/json" \
  -d '{"address":"test123","score":100,"stats":{"damagePerClick":1,"damagePerSecond":0}}'
```

Si ça fonctionne, vous devriez voir un message de succès.

### 3. Vérifier les variables d'environnement sur Vercel

Sur https://vercel.com → votre projet → **Settings** → **Environment Variables**

⚠️ **Vous DEVEZ avoir ces 5 variables:**

```
VITE_TOKEN_MINT = 9i9y5uZPFZYVJE8Ym4agXjkaCqniSDT95JPfSUH5pump
VITE_RPC_ENDPOINT = https://mainnet.helius-rpc.com/?api-key=917e1df6-fac1-44e1-8338-f21346903851
VITE_API_URL = https://halloweenproject-quqc.vercel.app
SUPABASE_URL = https://oweiqxzykpbeznntdeey.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bWlleHF5a3BiZXpuZnRkZWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzUwNjIsImV4cCI6MjA3NzE1MTA2Mn0.DXnDL-XqT_-kTSSDo7nTXTkhBuy60p561EsC3DkYjg0
```

**CRITIQUE**: Vérifiez que:
- ✅ Les variables commençant par `VITE_` sont dans **Production, Preview ET Development**
- ✅ Les variables sans `VITE_` (comme `SUPABASE_URL`) sont dans **Production, Preview ET Development**
- ✅ Après avoir ajouté/modifié les variables, **REDEPLOY** le projet!

### 4. Problèmes courants

#### ❌ "Supabase credentials not configured"
→ Variables `SUPABASE_URL` ou `SUPABASE_KEY` pas configurées sur Vercel

#### ❌ "Cannot read properties of undefined"
→ Variables d'environnement pas disponibles dans les API routes

#### ❌ Table vide
→ L'API n'est pas appelée OU il y a une erreur dans les logs

---

## Solution immédiate

Allez sur https://vercel.com → votre projet → **Settings** → **Environment Variables**

Ajoutez/modifiez ces 5 variables avec les valeurs ci-dessus.

Puis **Redeploy** (menu 3 points sur le dernier déploiement → Redeploy).

Ensuite, testez le site et regardez les logs Vercel.

