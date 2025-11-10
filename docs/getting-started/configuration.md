# Configuration

Les variables d’environnement sont listées dans `.env.example`.

## Essentielles
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `plausible` ou `umami`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (si plausible)
- `NEXT_PUBLIC_UMAMI_SRC`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (si umami)

## API externes
- `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` (reviews Google)

## Leads (optionnel BaaS Supabase)
- `SUPABASE_URL` — URL du projet
- `SUPABASE_SERVICE_ROLE` — clé server-only (ne jamais exposer côté client)
- `SUBSCRIBE_WEBHOOK` — Zapier/Make si besoin

## Développement local
Créez `.env.local` à la racine et ajoutez uniquement les clés nécessaires. Ne commitez jamais vos secrets.