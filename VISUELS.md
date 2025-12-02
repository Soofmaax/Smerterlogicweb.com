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

## Templates Canva pour les réseaux sociaux

Pour faciliter la création de visuels cohérents sur LinkedIn, Google Business et Instagram, on utilise des templates Canva basés sur le brand kit.

### Brand kit à configurer dans Canva

- Logo: utiliser le logo principal du site (version SVG/PNG sur fond transparent, depuis `public/`).
- Couleurs principales (hex) : reprendre la palette déjà définie dans `app/globals.css` (Sauge, Rose, Plum, etc.).
- Polices:
  - Titre: police utilisée pour les headings sur le site.
  - Texte: police utilisée pour les paragraphes.

Style souhaité:

- sobre, pro, moderne, pas surchargé ;
- texte lisible sur mobile (éviter les blocs trop longs).

### Template 1 — Carrousel “Extrait d’article” (5 slides)

Objectif: résumer un article de blog ou un guide.

- Slide 1:
  - Titre de l’article (2 lignes max)
  - Sous-titre court
  - Logo discret
- Slides 2–4:
  - 1 idée clé par slide
  - zone titre + zone texte court (2–3 phrases max)
  - petite icône ou élément graphique répétable
- Slide 5:
  - CTA: “Article complet sur smarterlogicweb.fr”
  - mention “Lien en bio” ou “Lien en commentaire”
  - logo

Formats à prévoir:

- LinkedIn: 1080×1080 px
- Instagram: 1080×1350 px (portrait)
- Google Business: 1200×900 px (prévoir une zone centrale “safe” pour le texte)

### Template 2 — Carrousel “Erreur fréquente” (4 slides)

Objectif: expliquer une erreur typique des TPE (refonte, budget, CM…) et proposer une solution.

- Slide 1:
  - Titre: “Erreur #X des TPE sur [thème]” + emoji ⚠️
- Slide 2:
  - description de l’erreur + mini-exemple
- Slide 3:
  - solution en 2–3 bullet points
- Slide 4:
  - CTA: “Audit express site + communication”
  - zone pour lien / mention “Me contacter”
  - logo

Formats:

- mêmes que Template 1 (LinkedIn 1080×1080, Instagram 1080×1350, Google Business 1200×900)

### Template 3 — Post simple “Conseil rapide” (1 slide)

Objectif: partager un conseil actionnable sur 1 slide.

- zone titre (1 phrase d’accroche)
- zone texte (3–4 lignes max)
- icône ou illustration simple
- logo discret

Format:

- 1080×1080 px (utilisable sur tous les réseaux)

### Livrables attendus (interne)

- 3 templates Canva modifiables basés sur ce brand kit.
- Un petit README interne (ou section Notion) rappelant:
  - les formats par plateforme,
  - la longueur de texte recommandée par slide,
  - où placer titres, textes, CTA et logo.