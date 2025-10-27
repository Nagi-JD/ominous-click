# Test manuel de l'API

Testez votre API directement depuis votre navigateur ou Postman:

## Tester submit-score

**URL**: https://halloweenproject-quqc.vercel.app/api/submit-score

**Method**: POST

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "address": "test123",
  "score": 10000,
  "stats": {
    "damagePerClick": 10,
    "damagePerSecond": 5
  }
}
```

Après ce test:
1. Regardez la réponse (succès ou erreur)
2. Allez sur Supabase Table Editor
3. Vous devriez voir le score apparaître

Si ça ne marche pas, copiez l'erreur et on verra ce qui ne va pas!

