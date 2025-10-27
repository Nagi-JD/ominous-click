# 🎯 Comment fonctionne le système de clics

## ✅ Le système est CORRECT!

### Différence entre:

**1. `this.count`** (le score/candies)
- Augmente quand vous cliquez
- Augmente AUSSI avec auto-damage (damagePerSecond)
- C'est pour le JEU (buy upgrades, etc.)

**2. `this.totalClicks`** (les vrais clics)
- Augmente UNIQUEMENT quand vous cliquez sur la citrouille
- N'augmente PAS avec auto-damage
- C'est pour le CLASSEMENT!

### Code actuel (correct):

```javascript
// Quand vous CLIQUEZ
hit() {
  this.count += this.damagePerClick  // Score augmente
  this.totalClicks += 1              // Clics augmente ✅
}

// Quand auto-damage (toutes les secondes)
autoHit() {
  this.count += this.damagePerSecond  // Score augmente
  // totalClicks ne change PAS! ✅
}
```

## 📊 Résultat

Le leaderboard est classé par **`totalClicks`**, qui compte UNIQUEMENT les vrais clics:
- ✅ Clics du joueur = comptés
- ❌ Auto-damage = ignoré pour le classement

## 🎯 Pourquoi c'est bien

Si un joueur:
- Clique 100 fois mais a un gros `damagePerSecond`
- Vs un joueur qui clique 500 fois

Le joueur avec **500 clics gagne**, pas celui avec le meilleur score!

---

## ✅ Conclusion

Le système est déjà **anti-auto-damage** pour le leaderboard!

Seuls les **vrais clics** comptent pour le classement. L'auto-damage ne compte pas.

