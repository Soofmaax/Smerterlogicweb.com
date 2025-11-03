# smarterlogicweb — Landing Next.js 14 (App Router) FR/EN

Site vitrine moderne et bilingue (FR/EN) construit avec Next.js App Router, Tailwind CSS et composants shadcn‑style. Design premium inspiré “curveball-like” : grandes cartes arrondies, gradient plum sombre, pills, gloss + grain subtil, micro‑animations.

Sommaire
- Aperçu
- Démo & Liens
- Captures (Screenshots)
- Stack & Architecture
- Fonctionnalités clés
- Qualité & CI
- Démarrage & Scripts
- Déploiement Netlify
- Dépannage Netlify (FAQ)
- Sécurité & Headers (CSP, HSTS…)
- Accessibilité (WCAG AA)
- Performance (Core Web Vitals)
- SEO technique
- Variables d’environnement
- Infos à renseigner (TODO)
- Contribuer
- Licence

## Aperçu

- Next.js 14 App Router, TypeScript, Tailwind CSS 3
- i18n FR/EN via next.config.mjs (locales: fr, en)
- Composants UI minimalistes (Button, Badge) + classes utilitaires
- Esthétique : cartes arrondies (rounded‑[28px]) avec effet “gloss” et “grain” subtils, micro‑hover (lift + soft shadow)
- Pages prêtes : Accueil, Services, Projets, À propos, Contact, Engagement associatif, Mentions, Confidentialité, Sécurité, 404/500, FR/EN
- SEO : metadata globales, alternates hreflang, sitemap, robots, Open Graph image route
- Analytics : Plausible (par défaut) ou Umami (switchable via env)
- Formulaire Contact: Netlify Forms + reCAPTCHA, page /merci
- Sécurité : Netlify headers (HSTS, XFO, nosniff, CSP…), endpoint /api/csp-report, endpoint /api/health
- PWA: manifest route + Apple touch icon dynamique

## Démo & Liens

- Live (à compléter): https://votre‑domaine.netlify.app/
- robots.txt: https://votre‑domaine.netlify.app/robots.txt
- sitemap.xml: https://votre‑domaine.netlify.app/sitemap.xml
- Health: https://votre‑domaine.netlify.app/api/health

Remplacez les URLs ci‑dessus par votre domaine une fois déployé. Pensez à mettre à jour:
- app/sitemap.ts → const baseUrl = "https://votre‑domaine"
- app/robots.ts → sitemap / host
- netlify.toml → Report-To URL (csp‑report) si vous conservez le reporting CSP

## Captures (Screenshots)

Option 1 (rapide): faites des captures manuelles et placez‑les dans public/screenshots puis référencez‑les dans ce README.

Option 2 (automatisé):
- Installez Puppeteer: npm i -D puppeteer
- Écrivez un petit script screenshots.mjs qui visite /, /services, /contact et enregistre des PNG dans public/screenshots
- Ajoutez un script npm "screenshots": "node scripts/screenshots.mjs"

## Stack & Architecture

- Next.js 14 App Router (app/)
- Tailwind CSS 3 (tailwind.config.ts), tokens HSL via app/globals.css
- Icônes lucide-react
- Fonts : Inter (titres), DM Sans (texte) via next/font
- i18n: next.config.mjs (locales ["fr","en"], defaultLocale "fr")
- Composants:
  - components/ui/button.tsx, components/ui/badge.tsx
  - components/site/header.tsx, components/site/footer.tsx
  - components/site/stats-card.tsx
- Pages:
  - FR: /, /services, /projets, /a-propos, /contact, /engagement-associatif, /mentions-legales, /politique-de-confidentialite, /securite, /merci
  - EN: /en, /en/services, /en/projects, /en/about, /en/contact, /en/nonprofit-commitment, /en/legal-notice, /en/privacy-policy, /en/security, /en/thank-you
- Données:
  - data/stats.ts — chiffres placeholders de démarrage (une seule carte affichée), remplacez dès que vous avez des métriques réelles
- SEO/Assets:
  - app/opengraph-image.tsx (image OG dynamique)
  - app/manifest.ts, app/apple-touch-icon.tsx
  - app/sitemap.ts, app/robots.ts
- API:
  - /api/health (status JSON)
  - /api/csp-report (CSP reports)

Voir ARCHITECTURE.md pour le détail des dossiers et flux.

## Fonctionnalités clés

- Hero “pill” + carte gradient arrondie (sans assets externes, compatible CSP)
- Cartes de statistiques “curveball-like”
- Section “logos partenaires” en gradient pastel
- Header/Nav bilingue (desktop: dropdowns; mobile: drawer + accordions), skip link
- Footer structuré, liens légaux et sociaux, mailto CTA
- Formulaire Netlify Forms (honeypot + reCAPTCHA), redirection /merci

## Qualité & CI

- ESLint Next (config incluse), TypeScript strict
- Vous pouvez ajouter ultérieurement une CI GitHub Actions pour lint/build/test et un audit Lighthouse/Axe (voir section “Audit automatisé de PR” dans cet exemple de doc)

## Démarrage & Scripts

- Installer: npm install
- Développement: npm run dev
- Build: npm run build
- Start (production locale): npm run start
- Lint: npm run lint

## Déploiement Netlify

- netlify.toml contient:
  - build: command = "next build", publish = ".next"
  - plugin: @netlify/plugin-nextjs
  - environment:
    - NODE_VERSION=18.20.3
    - NEXT_TELEMETRY_DISABLED=1
  - headers sécurité (HSTS, XFO, nosniff, Referrer-Policy, CSP…)
  - cache agressif immutable sur assets
  - redirects vers /sitemap et /robots

Étapes:
1) Connectez le repo à Netlify
2) Site settings → Build & deploy:
   - Build command: next build (ou npm run build)
   - Publish directory: .next
3) (Optionnel) Variables d’environnement (voir plus bas)
4) Trigger deploy → Clear cache and deploy site

Testez ensuite /api/health pour vérifier le runtime Next. Si 404 → plugin non actif ou build non pris en charge (voir FAQ).

## Dépannage Netlify (FAQ)

- Page blanche ou rien ne s’affiche
  - Ouvrez /api/health → doit renvoyer { status: "ok" }. Si 404, vérifiez:
    - [[plugins]] package = "@netlify/plugin-nextjs" dans netlify.toml
    - Clear cache and deploy
    - Build command et publish directory alignés
  - Console navigateur: erreurs CSP “Refused to execute inline script” ?
    - Je peux basculer temporairement la CSP en Report-Only pour valider l’UI, puis réactiver en enforcement.
- Sitemap/robots pointent vers un autre domaine
  - Mettez à jour app/sitemap.ts et app/robots.ts avec votre domaine.

## Sécurité & Headers

- HSTS, X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy, Permissions‑Policy
- CSP stricte (script-src: self + plausible/umami + google si reCAPTCHA)
- Reporting CSP vers /api/csp-report (Report-To + report-uri). Adaptez le domaine dans netlify.toml.
- Cache immutable pour les assets.

## Accessibilité (WCAG AA)

- Skip link (#content)
- Landmarks (aria-labels) dans header/nav
- Focus visibles, contrastes, contenus lisibles
- Mobile: menu drawer + accordéons accessibles

## Performance (Core Web Vitals)

- Next.js App Router, CSS utilitaires Tailwind
- Sans image externe pour les visuels “gradient”
- Lazy et tailles explicites sur images (là où présentes)
- OG et Apple icon générés côté edge

## SEO technique

- Metadata complètes (title/description/OG/Twitter), alternates hreflang
- Sitemap et robots (routes Next)
- JSON‑LD Organization + WebSite injectés
- Bloc “logos partenaires” prêt pour vrais logos (SVG/PNG)

## Variables d’environnement

Créez un fichier .env.local (non commité) à la racine ou définissez-les dans Netlify:

```
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible   # ou umami
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=smarterlogicweb.com
NEXT_PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
```

Voir .env.example — [Télécharger](file:///.env.example)

## Infos à renseigner (TODO)

- Domaine final dans:
  - app/sitemap.ts (baseUrl)
  - app/robots.ts (sitemap/host)
  - netlify.toml (Report-To URL → /api/csp-report)
- Liens sociaux (Header/Footer + JSON‑LD Organization) si besoin d’actualisation
- Logos réels dans la section “logos partenaires”
- Chiffres réels de stats (data/stats.ts) et réactivation de la 2e carte si souhaitée

## Contribuer

- Conventions: Conventional Commits (feat:, fix:, chore:, docs:…)
- Branches: feature/*, fix/*, chore/*, docs/*
- Lint: npm run lint
- TypeScript strict: corrigez les erreurs TS avant PR

Voir CONTRIBUTING.md — [Télécharger](file:///CONTRIBUTING.md)

## Licence

Projet privé pour l’instant. Ajoutez une licence (MIT par exemple) si nécessaire.