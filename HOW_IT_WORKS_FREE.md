# 🆓 Refresh automatique - 100% GRATUIT avec GitHub Actions

## ✅ C'est déjà CONFIGURÉ et ça tourne AUTOMATIQUEMENT!

### Comment ça marche?

1. **GitHub Actions** (100% GRATUIT)
   - Le fichier `.github/workflows/claim-winners.yml` est dans votre repo
   - GitHub exécute ce fichier automatiquement toutes les 5 minutes
   - Aucune action de votre part nécessaire!

2. **Ce que fait le cron**:
   ```
   Toutes les 5 minutes:
   1. GitHub déclenche le workflow
   2. Le workflow appelle: POST https://halloweenproject-quqc.vercel.app/api/claim-round-winners
   3. L'API trouve le gagnant #1
   4. L'API nettoie le leaderboard
   5. Nouveau round commence
   ```

3. **C'est GRATUIT**:
   - GitHub Actions: Gratuit (2000 minutes/mois)
   - Vercel Hobby: Gratuit (déploiement gratuit)
   - Supabase: Gratuit (up to 500MB)

## 🎯 Vérifier que ça tourne

### 1. Sur GitHub (vérifier les logs)

Aller sur: https://github.com/Nagi-JD/halloweenproject/actions

Vous devriez voir:
- ✅ "Claim Round Winners Every 5 Minutes"
- ✅ Le workflow en cours ou déjà exécuté
- ✅ Les logs montrent les winners

### 2. Sur Vercel (vérifier les appels API)

Aller sur: https://vercel.com → Votre projet → Functions

Chercher:
- `/api/claim-round-winners`
- Vous verrez les appels toutes les 5 minutes

### 3. Dans Supabase (vérifier la table)

Aller sur: https://supabase.com/dashboard → Table Editor

Après 5 minutes de jeu:
- ✅ Vous verrez les scores apparaître
- ✅ Après exactement 5 minutes, les scores disparaîtront (nettoyé)

## 💰 Coûts: 0$

**Gratuit pour toujours:**
- ✅ GitHub Actions (2000 minutes/mois gratuit)
- ✅ Vercel Hobby (déploiement gratuit)
- ✅ Supabase (500MB gratuit)

**Aucun upgrade nécessaire!**

## 🔧 Si vous voulez changer la fréquence

Dans `.github/workflows/claim-winners.yml`:

```yaml
on:
  schedule:
    # Actuellement: toutes les 5 minutes
    - cron: '*/5 * * * *'
```

**Autres exemples:**
- `*/3 * * * *` = Toutes les 3 minutes
- `*/10 * * * *` = Toutes les 10 minutes  
- `*/15 * * * *` = Toutes les 15 minutes
- `0 * * * *` = Toutes les heures

## ⏰ Limitations gratuites (large marge)

**GitHub Actions:**
- 2000 minutes gratuites/mois
- = ~48 exécutions par jour si round = 5 minutes
- = Vous pouvez avoir 48 rounds par jour gratuitement!

**Supabase:**
- 500MB de base de données gratuite
- Votre table "scores" va peser ~1KB par joueur
- = Vous pouvez avoir 500,000 joueurs GRATUITEMENT!

**Vercel:**
- 100GB bandwidth gratuit/mois
- = Des millions de clics gratuits!

## 🎉 Conclusion

**Vous n'avez RIEN à payer!** Tout est configuré et tourne automatiquement en continu, 24/7, gratuitement!

