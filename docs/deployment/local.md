# Déploiement — Local

## Pré-requis
- Node 18+
- Variables d’environnement (dupliquez `.env.example` en `.env.local` si besoin)

## Étapes
```bash
npm install
npm run build
npm run start
# http://localhost:3000
```

## Vérifications
- `/api/health` → `{ "status": "ok" }`
- UI de base accessible et sans erreurs console
- CSP: aucune violation en console