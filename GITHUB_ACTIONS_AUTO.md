# 🤖 GitHub Actions - Exécution automatique

## ✅ NON, vous n'avez rien à faire!

Le fichier `.github/workflows/claim-winners.yml` est configuré avec:

```yaml
on:
  schedule:
    # Every 5 minutes
    - cron: '*/5 * * * *'
```

**Cette ligne signifie: "Exécute ce workflow toutes les 5 minutes AUTOMATIQUEMENT"**

---

## 🔄 Comment ça marche?

GitHub Actions lit ce fichier et exécute le workflow automatiquement:

```
00:00 → Workflow s'exécute → Round 1 se termine
00:05 → Workflow s'exécute → Round 2 se termine
00:10 → Workflow s'exécute → Round 3 se termine
00:15 → Workflow s'exécute → Round 4 se termine
... et ainsi de suite pour toujours!
```

**24 heures sur 24, 7 jours sur 7!**

---

## 📊 Vérifier que ça tourne

### Sur GitHub:
1. https://github.com/Nagi-JD/halloweenproject
2. Onglet **Actions**
3. Vous verrez: **"Claim Round Winners Every 5 Minutes"**
4. Cliquez dessus
5. Vous verrez les exécutions passées et futures

### Timeline:
- Toutes les 5 minutes, une nouvelle exécution apparaît
- Vous pouvez voir les logs de chaque exécution
- Les logs montrent le winner trouvé!

---

## 🎯 Options disponibles

### Option 1: Laisser tourner automatiquement (recommandé)
- **Rien à faire**
- Ça tourne tout seul
- Parfait! ✅

### Option 2: Déclencher manuellement (pour tester)
1. Sur GitHub → Actions → "Claim Round Winners"
2. Bouton **"Run workflow"** (en haut à droite)
3. Cliquez
4. Le round se termine immédiatement!

### Option 3: Changer la fréquence (si besoin)
Dans `.github/workflows/claim-winners.yml`:
- `*/5 * * * *` = Toutes les 5 minutes
- `*/3 * * * *` = Toutes les 3 minutes
- `*/10 * * * *` = Toutes les 10 minutes

---

## ✅ Résumé

**GitHub Actions tourne AUTOMATIQUEMENT** grâce au `schedule` dans le fichier.

Vous pouvez:
- ✅ Rien faire → ça tourne tout seul
- ✅ Regarder les logs → voir les winners
- ✅ Déclencher manuellement → pour tester

**C'est tout!** 🎉

