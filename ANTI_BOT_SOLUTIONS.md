# 🛡️ Solutions anti-bot et anti-fraude

## 🚨 Problèmes actuels

### 1. **Pas de limite de vitesse de clics**
- Un bot peut cliquer 1000x/sec
- Un humain max ~10 clics/sec
- Solution: **Rate limiting** sur les clics

### 2. **Pas de vérification humaine**
- Rien n'empêche un bot de jouer
- Solution: **Captcha** ou détection de patterns

### 3. **Pas de timing check**
- Les bots cliquent à intervalle parfait
- Les humains ont des intervalles variables
- Solution: **Detecter patterns trop réguliers**

### 4. **Mouse tracking manquant**
- Vérifier que la souris bouge vraiment
- Solution: **Track mouse movement**

---

## ✅ Solutions à implémenter

### Solution 1: Rate Limiting (Simple et efficace)

Limiter à **5 clics par seconde max**:
```javascript
let lastClickTime = 0
const MIN_CLICK_INTERVAL = 200 // 200ms entre chaque clic

function handleClick() {
  const now = Date.now()
  if (now - lastClickTime < MIN_CLICK_INTERVAL) {
    return // Ignore les clics trop rapides
  }
  lastClickTime = now
  // Process click
}
```

### Solution 2: Captcha

Avant de pouvoir jouer:
- Google ReCAPTCHA
- Honeypot (champ invisible)
- Verification email (optionnel)

### Solution 3: Click timing analysis

Detecter patterns trop réguliers:
```javascript
const clickTimings = []

function handleClick() {
  clickTimings.push(Date.now())
  
  // Analyser les 10 derniers clics
  if (clickTimings.length > 10) {
    const intervals = clickTimings.slice(-10).map((time, i) => 
      time - clickTimings[i] || 0
    )
    
    // Si tous les intervalles sont identiques → probablement un bot
    const isBot = intervals.every(i => Math.abs(i - intervals[0]) < 10)
    
    if (isBot) {
      // Ban temporaire ou captcha
      return
    }
  }
}
```

### Solution 4: Mouse tracking

Tracker le mouvement de la souris:
```javascript
let mouseActive = true

window.addEventListener('mousemove', () => {
  mouseActive = true
})

// Vérifier toutes les secondes
setInterval(() => {
  if (!mouseActive && isClicking) {
    // Pas de mouvement de souris mais beaucoup de clics → probablement un bot
  }
  mouseActive = false
}, 1000)
```

---

## 💰 Système de rewards: 20% des dev fees

Au lieu de 1 SOL fixe, le winner prend **20% de ce qui est dans le pot**.

### À faire:

1. **Créer un compteur de dev fees dans Supabase**
   - Table `round_pot` avec `total_fees`
   - Incrémenté à chaque transaction

2. **Calculer 20% pour le winner**
   ```javascript
   const reward = potTotal * 0.20 // 20%
   ```

3. **Enlever du pot après récompense**
   - Le reste (80%) va où? Continuer à accumuler ou distributeur?

---

## 🎯 Recommandations immédiates

### 1. Implémenter rate limiting (URGENT)
- Max 5 clics/sec
- Bloque les bots évidents

### 2. Ajouter Captcha
- HCaptcha (gratuit)
- Ou Cloudflare Turnstile

### 3. Changer système de rewards
- Basé sur les dev fees accumulées
- 20% au winner

### 4. Monitoring
- Log les patterns suspects
- Ban les comptes suspects

