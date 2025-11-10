# Déploiement — Staging (Netlify)

## Configuration
- Connecter le repo GitHub à Netlify
- `netlify.toml` présent (plugin Next.js + headers sécurité)
- Variables d’environnement (staging) via Netlify UI

## Build
- Build command: `next build`
- Publish directory: `.next`

## Vérifications
- Health: `/api/health`
- Pages clés: `/`, `/services`, `/contact`
- Logs Netlify: pas d’erreurs
- CSP: pas de violations (ou report-only si test)

## Observabilité
- (Recommandé) Sentry DSN staging