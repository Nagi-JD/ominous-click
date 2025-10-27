# ⏰ Configuration Cron pour les Rounds automatiques

## ✅ Ce qui est fait

Le fichier `vercel.json` a été mis à jour avec:
```json
"crons": [
  {
    "path": "/api/claim-round-winners",
    "schedule": "*/5 * * * *"
  }
]
```

Cela déclenchera **automatiquement** l'API `claim-round-winners` toutes les **5 minutes**.

## 🚀 Sur Vercel

### Pour le plan Hobby (gratuit):
Les crons ne sont **pas disponibles** sur le plan gratuit. Vous devez:
1. **Upgrade** vers Pro ($20/mois), OU
2. Utiliser un **service externe** comme:
   - EasyCron
   - CronJob.org
   - GitHub Actions avec schedule
   - Un serveur dédié

### Pour le plan Pro:
Les crons sont **automatiquement activés** avec `vercel.json`!

## 🔄 Comment tester localement

Tester l'API manuellement:
```bash
curl -X POST http://localhost:5173/api/claim-round-winners
```

## 📊 Sur Vercel

1. Allez sur https://vercel.com
2. Votre projet → **Settings** → **Crons**
3. Vous devriez voir le cron configuré
4. Il s'exécutera automatiquement toutes les 5 minutes

## ⚠️ Important

### Si vous êtes sur Hobby (gratuit):
1. Option A: Upgrade vers Pro
2. Option B: Utiliser un service externe (voir ci-dessous)

### Service externe recommandé: EasyCron (gratuit)
1. Créer un compte sur https://www.easycron.com
2. Ajouter un cron job:
   - URL: `https://votre-app.vercel.app/api/claim-round-winners`
   - Méthode: POST
   - Schedule: Toutes les 5 minutes
   - Timezone: Votre fuseau horaire

## 🔍 Vérifier que ça marche

Sur Vercel Dashboard:
1. Allez dans **Deployments**
2. Ouvrez le dernier déploiement
3. Onglet **Functions** → Voir les logs de `/api/claim-round-winners`
4. Vous devriez voir des logs toutes les 5 minutes

## ✅ Résultat attendu

Toutes les 5 minutes:
1. ✅ API s'exécute automatiquement
2. ✅ Récupère le top 10
3. ✅ Nettoie le leaderboard
4. ✅ Log des gagnants dans la console
5. ⏳ Les rewards sont calculés (l'envoi sera ajouté plus tard)

