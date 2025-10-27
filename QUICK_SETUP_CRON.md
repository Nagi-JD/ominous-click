# ⚡ Configuration rapide du Cron (5 minutes)

## ✅ Solution choisie: GitHub Actions (100% gratuit, fiable)

Vous avez maintenant `.github/workflows/claim-winners.yml` qui s'exécutera automatiquement toutes les 5 minutes!

## 🎯 C'est déjà configuré!

1. ✅ Le fichier est dans votre repo
2. ✅ GitHub Actions va l'exécuter automatiquement
3. ✅ Chaque jour à 00:00, 00:05, 00:10, 00:15... (toutes les 5 minutes)

## 📊 Vérifier que ça marche

1. Allez sur https://github.com/Nagi-JD/halloweenproject
2. Cliquez sur l'onglet **Actions**
3. Vous devriez voir le workflow "Claim Round Winners"
4. Cliquez dessus pour voir les logs

## 🚀 Déclencher maintenant (test)

Vous pouvez déclencher manuellement:
1. GitHub → Actions
2. "Claim Round Winners"
3. Bouton "Run workflow" (en haut à droite)
4. "Run workflow"
5. Cliquez sur le job qui apparaît pour voir les logs

## ⏱️ Timeline

- **Push maintenant**: GitHub détecte le workflow
- **Dans 5 minutes**: Premier run automatique
- **Ensuite**: Toutes les 5 minutes automatiquement

## 🔧 Si ça ne marche pas

Le workflow est dans `.github/workflows/claim-winners.yml`.

Pour vérifier les logs:
1. GitHub → Actions
2. Regarder s'il y a des erreurs
3. Si `${{ github.event.schedule }}` cause problème, le retirer

## ✅ C'est tout!

Le système tournoi fonctionne maintenant avec GitHub Actions gratuites! 🎉

