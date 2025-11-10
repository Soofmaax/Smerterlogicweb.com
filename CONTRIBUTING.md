# Contribuer — SmarterLogicWeb

Merci de votre intérêt. Ce projet sert de vitrine professionnelle — nous maintenons un niveau de qualité élevé (performance, sécurité, accessibilité).

## Prérequis

- Node.js ≥ 18.17 (Netlify: 18.20.3)
- npm ≥ 9
- Next.js 14, TypeScript 5, TailwindCSS 3

## Installation & Scripts

```bash
npm install
npm run dev       # dev server
npm run build     # build production
npm run start     # start production build
npm run lint      # lint
```

## Style de code

- TypeScript strict — corrigez tous les warnings/erreurs
- ESLint Next — `npm run lint` doit passer
- Accessibilité — focus visibles, aria-labels, contrastes conformes
- UX — animations respectent `prefers-reduced-motion`

## Convention de commits

Conventional Commits:

- feat: nouvelle fonctionnalité
- fix: correction de bug
- docs: documentation
- chore: maintenance/outillage
- refactor: refactorisation sans changement fonctionnel
- style: formatage uniquement
- test: tests

Exemples:
- feat(hero): premium animated banner with reduced-motion support
- fix(api): rate-limit subscribe endpoint
- docs(readme): add CI badges

## Branching

- feature/<slug>
- fix/<slug>
- chore/<slug>
- docs/<slug>

Pull requests ciblent `main`.

## Processus de Pull Request

- Décrivez la motivation et le comportement attendu
- Ajoutez des captures si l’UI change
- Vérifiez:
  - Lint/build OK
  - Pages clés: `/`, `/services`, `/contact`
  - API: `/api/health` renvoie `{status:"ok"}`
- Liez les issues si applicable

## Sécurité

- CSP: si vous ajoutez des scripts externes, mettez à jour `netlify.toml` (directive `script-src`)
- Secrets: **jamais** de secrets en clair — utilisez les variables d’environnement
- API: validation d’inputs côté serveur obligatoire

## Code of Conduct

Voir [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Contact

Questions: admin@smarterlogicweb.com