# 🗄️ Setup de la Database pour le Leaderboard

## Option 1: Supabase (PostgreSQL) - RECOMMANDÉ ✅

### Pourquoi Supabase ?
- ✅ **Gratuit** jusqu'à 500MB
- ✅ PostgreSQL (database puissante)
- ✅ Table interface simple
- ✅ API REST automatique
- ✅ Real-time subscriptions possible

### Setup (5 minutes)

#### 1. Créer un compte Supabase
Allez sur https://supabase.com et créez un compte gratuit.

#### 2. Créer un projet
- Create new project
- Nom: `halloween-clicker`
- Mot de passe: notez-le bien!
- Région: choisissez la plus proche
- Wait ~2 minutes...

#### 3. Créer la table

Dans SQL Editor, exécutez:

```sql
-- Table pour stocker les scores
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  score BIGINT NOT NULL,
  damage_per_click INTEGER,
  damage_per_second INTEGER,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(address)
);

-- Index pour les requêtes rapides
CREATE INDEX idx_score ON scores(score DESC);
CREATE INDEX idx_address ON scores(address);
CREATE INDEX idx_timestamp ON scores(timestamp DESC);

-- Table pour le leaderboard
CREATE TABLE leaderboard (
  rank INTEGER PRIMARY KEY,
  address TEXT NOT NULL,
  score BIGINT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. Récupérer les credentials

Dans Project Settings → API:
- **URL**: `https://xxx.supabase.co`
- **anon key**: `eyJhbGc...` (copiez cette clé!)

#### 5. Installer Supabase dans votre projet

```bash
npm install @supabase/supabase-js
```

#### 6. Créer le fichier .env.local

Ajoutez dans votre `.env.local`:

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJhbGc...
```

#### 7. Mettre à jour les API

Voir les fichiers `api/submit-score.js` et `api/leaderboard.js` pour le code complet.

---

## Option 2: Vercel KV (Redis) - Plus simple mais moins puissant

### Setup

```bash
# Dans votre projet Vercel
vercel kv create
```

Ensuite, utiliser dans vos API:

```javascript
import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // Store score
  await kv.zadd('leaderboard', score, address)
  // ...
}
```

**Limite**: Plus simple mais moins de features.

---

## Option 3: JSON File - MVP rapide

Pour un MVP ultra-rapide (déconseillé pour prod):

```javascript
// api/db.js
const fs = require('fs')

let scores = []

try {
  scores = JSON.parse(fs.readFileSync('/tmp/scores.json'))
} catch {}

export function saveScore(address, score) {
  scores.push({ address, score, timestamp: Date.now() })
  scores.sort((a, b) => b.score - a.score)
  fs.writeFileSync('/tmp/scores.json', JSON.stringify(scores))
}

export function getLeaderboard() {
  return scores.slice(0, 100)
}
```

---

## 📝 Résumé

| Solution | Gratuit | Setup | Scabilité |
|----------|---------|-------|-----------|
| **Supabase** ✅ | Oui (500MB) | Moyen | Très bonne |
| Vercel KV | Oui (512MB) | Facile | Moyenne |
| JSON | Oui | Facile | Mauvaise |

**Recommandation**: Supabase pour le meilleur rapport simplicité/puissance! 🎯

