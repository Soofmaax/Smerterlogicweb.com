# Déploiement — Production (Netlify)

## Préparation
- Domaine: `smarterlogicweb.com`
- Variables d’environnement prod définies (sans secrets côté client)
- Branch protection: `main` — CI verte requise

## Build & Publish
- Build command: `next build`
- Publish directory: `.next`
- Cache assets (immutable) géré par `netlify.toml`

## Sécurité
- CSP enforcement
- HSTS activé
- Rate limiting sur endpoints critiques
- Aucun secret dans les logs

## After-Deploy Checklist
- `/api/health` OK
- Pages FR/EN accessibles
- Forms / subscribe → entrées présentes dans Supabase (si configuré)
- No CSP violations en console

## Rollback
- Utiliser Netlify “Deploys” pour rollback à une version précédente