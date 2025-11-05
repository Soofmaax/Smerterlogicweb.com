# ARCHITECTURE

Aperçu de l’architecture et des principaux composants.

## Dossiers clés

- app/
  - layout.tsx: layout global FR (fonts, Header/Footer, analytics script, JSON‑LD)
  - en/layout.tsx: layout global EN
  - page.tsx: Home FR
  - en/page.tsx: Home EN
  - services/, projets/, a-propos/, contact/, engagement-associatif/
  - mentions-legales/, politique-de-confidentialite/, securite/
  - merci/ et en/thank-you/
  - api/
    - health/route.ts: endpoint de santé
    - csp-report/route.ts: endpoint de collecte des rapports CSP
  - sitemap.ts, robots.ts
  - opengraph-image.tsx: image OG dynamique (Edge runtime)
  - apple-touch-icon.tsx: icône Apple dynamique (Edge)

- components/
  - ui/button.tsx: bouton (variants, sizes, asChild)
  - ui/badge.tsx: badge (variants)
  - site/header.tsx: header avec nav bilingue (desktop dropdown + mobile drawer)
  - site/footer.tsx: footer en grille, liant pages légales/social/email
  - site/stats-card.tsx: cartes statistiques “curveball-like”

- data/
  - stats.ts: contenu des cartes Statistiques (FR/EN). En prod, remplacez les placeholders.

- lib/
  - analytics.ts: track(event) pour Plausible/Umami

- public/
  - _forms.html: copie statique du formulaire pour Netlify Forms (détection build SSR)
  - .well-known/security.txt

## Styling

- TailwindCSS + tokens HSL dans app/globals.css
- Fonts:
  - Titles: Inter (via next/font, variable --font-inter)
  - Body: DM Sans (via next/font, variable --font-dm-sans)
- Esthétique:
  - .stat-card: gradient plum sombre, highlight radial, coins 28px
  - .card-elevated: overlay “gloss + grain” subtil, micro‑hover (lift + ombre douce)
  - Palette “Sauge & Rose 2030” mappée en variables CSS → Tailwind via theme.colors

## i18n / Routage

- next.config.mjs:
  - i18n: locales ["fr","en"], defaultLocale "fr"
- Header détecte la langue depuis usePathname et propose un switch avec mapping de slugs

## SEO

- app/layout.tsx et app/en/layout.tsx:
  - Metadata (title, description, OG, Twitter, manifest, icons)
  - JSON‑LD Organization & Website
- Pages: metadata par page + alternates.languages
- Sitemap & Robots: metadata routes Next (app/sitemap.ts, app/robots.ts)

Note: Remplacez le domaine (smarterlogicweb.com) dans sitemap/robots pour refléter votre site réel.

## Sécurité (Netlify)

- netlify.toml:
  - @netlify/plugin-nextjs
  - NODE_VERSION=18.20.3
  - Headers:
    - HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy
    - CSP stricte avec report vers /api/csp-report
  - Cache immutable sur assets
- API:
  - /api/csp-report: collecte et log minimal des rapports

## Formulaire (Netlify Forms)

- app/contact/page.tsx (FR) et app/en/contact/page.tsx (EN):
  - name="contact", method="POST", data-netlify="true", honeypot, action vers /merci (ou /en/thank-you)
  - reCAPTCHA Netlify (data-netlify-recaptcha="true")
- public/_forms.html:
  - copie statique pour détection à la compilation (Next SSR)

## Analytics

- Plausible par défaut (NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible)
- Umami possible (NEXT_PUBLIC_ANALYTICS_PROVIDER=umami + variables)
- lib/analytics.ts pour les événements (CTA mailto, form submit, socials)

## Points à ajuster pour la mise en prod

- Domaine dans app/sitemap.ts et app/robots.ts
- Report-To (netlify.toml) si vous recopiez la valeur avec votre domaine
- Profiles LinkedIn/GitHub (footer + JSON‑LD) si besoin
- Statistiques réelles dans data/stats.ts (réactivez la 2e carte si souhaitée)
- Logos réels (section partenaires)