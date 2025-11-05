# Contribuer

Merci de votre intérêt pour ce projet. Voici les conventions et le flux de contribution.

## Pré-requis

- Node 18 (Netlify build utilise Node 18.20.3)
- npm 9+ (ou pnpm/yarn si vous préférez, mais le repo utilise npm)
- Next.js 14, TypeScript 5, TailwindCSS 3

## Installer et lancer

- npm install
- npm run dev
- npm run build
- npm run start
- npm run lint

## Convention de commits

Utilisez Conventional Commits:

- feat: nouvelle fonctionnalité
- fix: correction de bug
- docs: documentation
- chore: tâches diverses (outillage, config)
- refactor: refactorisation sans changement de comportement
- style: formatage, style (pas de code)
- test: tests

Exemples:
- feat(home): add partners logo gradient section
- fix(header): correct mobile drawer focus trap
- docs(readme): add netlify troubleshooting section

## Branches

- feature/nom-fonctionnalite
- fix/description-bug
- chore/tache
- docs/mise-a-jour-doc

## Qualité

- Lint: npm run lint
- TypeScript: corrigez toutes les erreurs TS
- Accessibilité: vérifiez contrastes, focus, aria-labels
- SEO: respect des balises meta importantes (title/description/canonical/OG/Twitter)

## PR

- Décrivez clairement la motivation, le comportement attendu et la solution
- Joignez des captures (si UI)
- Liez les issues si disponibles

## Déploiement de preview

- Netlify crée des “Deploy Previews” sur chaque PR
- Vérifiez les pages clés: /, /services, /contact, /projets
- Testez /api/health — doit renvoyer {status:"ok"}

## Sécurité

- CSP: si vous ajoutez des scripts externes (ex: GA, Clarity), mettez à jour la directive script-src dans netlify.toml
- Forms: conservez le honeypot et reCAPTCHA Netlify si vous modifiez le formulaire

Merci !