# Architecture Overview

## Frontend
- Next.js 14 (App Router) — React 18, TypeScript, TailwindCSS
- Pages bilingues FR/EN, composants UI réutilisables
- Accessibilité et performances (Core Web Vitals)

## Backend (serverless routes)
- `/api/health` — health check JSON
- `/api/csp-report` — collecte rapports CSP
- `/api/google-reviews` — proxy Google Places (clé et place id via env)
- `/api/subscribe` — capture de leads (validation stricte + rate limit), persistance Supabase optionnelle

## Sécurité
- Headers Netlify: CSP (reporting), HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Validation et rate limiting sur les endpoints critiques
- Pas de secrets committés; variables d’environnement

## CI/CD
- GitHub Actions:
  - `ci.yml` — Lint + Build (Next.js)
  - `security.yml` — npm audit + SBOM CycloneDX
  - `codeql.yml` — Code scanning (CodeQL)
  - Dependabot — mises à jour hebdomadaires

## BaaS (optionnel)
- Supabase (Postgres + RLS)
- Table `public.leads` — voir `docs/supabase.sql`
- Insertion uniquement côté serveur via clé `service_role`

## Déploiement
- Netlify (`@netlify/plugin-nextjs`)
- Caching agressif assets, no-store sur manifest/favicons
- Redirects sitemap/robots

Voir aussi:
- [ARCHITECTURE.md](../../ARCHITECTURE.md)