# Troubleshooting — Common Issues

## Page blanche après déploiement
- Vérifier logs Netlify
- `/api/health` doit répondre `{status:"ok"}`
- CSP: vérifier la console navigateur (violations)

## Erreurs CSP
- Mettre à jour `netlify.toml` (directives `script-src`, `connect-src`, etc.)
- Si besoin de tester: passer temporairement en Report-Only (à éviter en prod prolongée)

## `npm ci` échoue en CI (lockfile manquant)
- Les workflows génèrent un lockfile temporaire si absent
- Recommandé: committer `package-lock.json` pour builds déterministes

## Google Reviews ne s’affichent pas
- Vérifier `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID`
- Limites API Google atteintes ?
- Voir console et logs `/api/google-reviews`

## Leads non persistés
- Vérifier `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE` (côté serveur uniquement)
- L’API fonctionne sans Supabase — persistance ignorée si non configurée

## Animations trop prononcées
- Respect de `prefers-reduced-motion` déjà activé
- Désactiver/atténuer les animations spécifiques via CSS (classes utilitaires)