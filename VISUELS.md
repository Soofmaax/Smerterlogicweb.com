# Guide visuels (VISUELS)

Ce document explique comment gérer les visuels (logos, favicons, images Open Graph) et peaufiner le rendu “premium”.

## Logos partenaires

- Bloc “logos partenaires” (Home FR/EN) utilise des placeholders texte.
- Remplacez‑les par de vrais logos:
  1) Placez vos logos dans `public/logos/` en SVG ou PNG (fonds transparents recommandés).
  2) Remplacez le contenu des cases par des `<img src="/logos/xxx.svg" alt="Nom partenaire" width="..." height="..." />`.
  3) Conservez `className="rounded-2xl ... ring-1 ring-black/5"` pour la cohérence visuelle.

Astuce: privilégiez des logos monochromes ou versions “inversées” pour un rendu harmonieux sur les fonds pastel.

## Favicon & icônes

- Favicon: `app/icon.svg` (Next détecte automatiquement).
- Apple Touch Icon: `app/apple-touch-icon.tsx` génère dynamiquement une icône 180x180 PNG (Edge runtime).
- Vous pouvez remplacer ces routes par des assets statiques si vous avez un kit de marque (icônes iOS, Android, etc.).

## Images Open Graph (OG)

- Par défaut, `/opengraph-image` génère une image OG dynamique avec gradient clair et branding texte.
- Pour une image OG brandée par page:
  - Créez des images statiques dans `public/og/ma-page.png`
  - Dans la page concernée, définissez `export const metadata = { openGraph: { images: ["/og/ma-page.png"] } }`
  - Vous pouvez aussi cloner `app/opengraph-image.tsx` en multiple routes (ex: `/opengraph-image-services`) selon vos besoins.

## Gradients & Cards

- Les grandes cartes utilisent:
  - `.card-elevated` (overlay “gloss + grain” + hover lift)
  - `.stat-card` (gradient plum sombre + highlight)
- Réglages fins dans `app/globals.css`:
  - Intensité du gloss: `.card-elevated::before { opacity: ... }`
  - Grain: `.card-elevated::after { background-size: ...; opacity: ... }`
  - Palette plum: `--curve-plum-1/2/3` (hex), `--curve-highlight` (rgba)

## Couleurs marque

Variables CSS dans `app/globals.css`:

- Palette Sauge & Rose (HSL) → Tailwind theme.colors
- Plum (hex) pour les gradients sombres

N’hésitez pas à fournir des hex / HSL exacts pour caler 1:1 avec votre charte — je les intégrerai proprement.

## Conseils d’accessibilité

- Attribuez des `alt` descriptifs aux logos (ex: “Logo Partenaire X”).
- Conservez un contraste suffisant sur les combos pastel + texte.
- Évitez les motion agressifs: nos animations sont discrètes et respectent le confort de lecture.