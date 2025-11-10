# Quick Start

## 1) Installer
```bash
npm install
```

## 2) Lancer
```bash
npm run dev
# http://localhost:3000
```

## 3) Variables d’environnement
Dupliquez `.env.example` en `.env.local` et renseignez au minimum:
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`
- (Optionnel) `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` pour les avis Google
- (Optionnel) `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE` pour la persistance des leads

## 4) Build/Prod
```bash
npm run build
npm run start
```

## 5) Netlify
- `netlify.toml` inclut le plugin Next.js et les headers de sécurité.
- Configurez les variables d’environnement depuis l’UI Netlify.