# 🆓 Alternatives gratuites pour les crons (sans Vercel Pro)

## ⚠️ Problème
Vercel Cron nécessite le **plan Pro** ($19/mois). Sur le plan **Hobby (gratuit)**, les crons ne fonctionnent **pas**.

## ✅ Solutions GRATUITES

### Option 1: EasyCron (recommandé - 100% gratuit)
**Limite**: 150 cron jobs gratuitement

**Étapes**:
1. Créer un compte: https://www.easycron.com
2. **Add New Cron Job**:
   - **URL**: `https://halloweenproject-quqc.vercel.app/api/claim-round-winners`
   - **Method**: POST
   - **Schedule**: Toutes les 5 minutes (`*/5 * * * *`)
   - **Timezone**: Europe/Paris (ou votre fuseau)
3. Activer le cron

**Avantages**:
- ✅ 100% gratuit
- ✅ Interface simple
- ✅ Logs disponibles
- ✅ Fonctionne immédiatement

---

### Option 2: cron-job.org (Gratuit)
**Limite**: 2 cron jobs gratuits

**Étapes**:
1. Créer un compte: https://cron-job.org
2. **Create Cronjob**:
   - **URL**: `https://halloweenproject-quqc.vercel.app/api/claim-round-winners`
   - **Schedule**: Every 5 minutes
3. Activer

---

### Option 3: GitHub Actions (Le plus fiable)
**100% gratuit, illimité**

Créer un fichier `.github/workflows/claim-winners.yml`:

```yaml
name: Claim Round Winners

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:  # Pour déclencher manuellement

jobs:
  claim:
    runs-on: ubuntu-latest
    steps:
      - name: Call API
        run: |
          curl -X POST https://halloweenproject-quqc.vercel.app/api/claim-round-winners
```

**Avantages**:
- ✅ 100% gratuit
- ✅ Illimité
- ✅ Très fiable (infrastructure GitHub)
- ✅ Logs complets

**Inconvénient**:
- Nécessite de push dans le repo après chaque modification

---

### Option 4: API route simple (backup)
Si aucun cron ne marche, créer un bouton admin pour déclencher manuellement:

```javascript
// api/trigger-claim.js
import { claimRoundWinners } from './claim-round-winners'

export default async function handler(req, res) {
  // Sécuriser avec un secret
  if (req.headers.authorization !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  // Déclencher le claim
  await claimRoundWinners()
  
  return res.json({ success: true })
}
```

---

## 🎯 Recommandation

**Pour commencer rapidement**: EasyCron (Option 1)
- S'inscrire
- Créer le cron
- Fonctionne en 2 minutes

**Pour une solution durable**: GitHub Actions (Option 3)
- Plus de contrôle
- Logs détaillés
- Gratuit et illimité

---

## 🚀 Déploiement rapide

**EasyCron**:
1. Aller sur easycron.com
2. Login → Create Cron Job
3. Coller votre URL Vercel
4. Schedule: `*/5 * * * *`
5. Activer

**C'est tout!** ✅

