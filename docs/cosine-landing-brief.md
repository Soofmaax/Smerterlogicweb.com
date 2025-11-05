# Optimisation Landing Page — Développeuse Front‑end (Artisans/TPE/PME)

## Contexte
- Stack: Next.js App Router, Tailwind CSS, shadcn/ui
- Cible: Artisans, commerçants locaux, professions libérales, TPE/PME
- Objectif: message simple et accessible, bénéfices concrets, animations subtiles démontrant l’expertise sans gêner l’expérience mobile

---

## Modifications de Contenu (FR)

### 1) Hero
- H1 (exact): "Un Site Web Qui Vous Amène des Clients Chaque Jour"
- Sous‑titre (exact): "Pour artisans et commerces locaux : un site rapide, visible sur Google, qui transforme vos visiteurs en clients. Simple, sans jargon technique."
- CTA principal: "Obtenir un devis gratuit"
- CTA secondaire: conserver "Discutons de votre projet"

### 2) Section Bénéfices (remplace le titre “Pourquoi mon expertise”)
- Nouveau titre: "Ce Que Vous Gagnez"
- Carte “Performance technique” — nouveau texte: "Sites ultra-rapides qui apparaissent en premier sur Google. Vos clients trouvent votre entreprise facilement."

### 3) Section Comparaison
- Nouveau titre: "Pourquoi un Site Sur-Mesure Est le Meilleur Choix" (sans point d’interrogation)

### 4) Pricing (simplifier trois features)
- "Galerie optimisée" → "Présentation de vos réalisations"
- "Intégration Analytics + Search Console" → "Suivi de vos visiteurs"
- "Optimisation conversions (CTA stratégiques)" → "Boutons qui incitent vos visiteurs à vous contacter"

### 5) Technologies (remplacer la section)
- Supprimer/masquer “Technologies Modernes et Performantes”
- Ajouter une section:
  - Titre: "Votre Site, Toujours à Jour"
  - Texte: "J'utilise les technologies les plus récentes pour garantir rapidité, sécurité et longévité. Vous n'avez pas à vous soucier des aspects techniques."

### 6) Processus de Travail (simplifier 2 libellés)
- "Architecture et wireframes" → "Plan de votre site"
- "SEO et accessibilité intégrés" → "Visible sur Google dès le départ"

---

## Animations à Implémenter

Règles communes:
- Respecter prefers-reduced-motion (désactiver/amoindrir toutes animations)
- Utiliser transform/opacity, éviter layout trashing
- 60fps ciblé, sans CLS (Cumulative Layout Shift)

### 1) Compteur sur les métriques (95/100, 2s, 100%, 98%)
- Type: count-up 0 → valeur finale
- Déclenchement: entrée dans le viewport (IntersectionObserver)
- Durée: 1.5s, easing out
- Pseudocode:
```ts
// IntersectionObserver -> requestAnimationFrame count-up
// clamp to duration, easeOutExpo
```

### 2) Parallaxe sur le Hero
- Élément: mockup/site preview dans le hero
- Effet: translateY proportionnel au scroll à 60% de la vitesse (plus lent que la page)
- Implémentation: rAF + scroll listener (passive), transform: translate3d(0, y*0.6, 0)

### 3) Bordure animée sur cartes tarifaires (au hover)
- Effet: trait bleu #2563EB qui “dessine” la bordure depuis le coin haut‑gauche en 400ms
- Implémentation: pseudo-élément ::before en top/left, animation du stroke via conic-gradient/clip-path ou stroke-dasharray sur SVG bordure; fallback simple: outline + gradient border-clip avec transition

### 4) Slide-in sur témoignages
- Effet: apparition depuis le bas (opacity 0 → 1, translateY(24px) → 0)
- Stagger: 150ms entre chaque carte
- Déclencheur: entrée section dans viewport (IntersectionObserver)

### 5) Typewriter sur le H1 (Hero)
- Vitesse: 50ms/lettre
- Curseur clignotant (caret) qui disparaît 1s après la fin
- Respect reduced-motion: afficher le texte final sans animation

---

## Contraintes & Accessibilité
- Mobile-first: animations testées &lt; 400ms, pas d’entrave au scroll
- Respecter les contrastes et focus visibles
- Pas d’animations “bruyantes” ni de grosses librairies (priorité CSS/JS natif)
- Lint/TS ok, pas de warnings react-hooks

---

## Emplacements probables (à adapter selon projet)
- Hero: components/site/hero-typed.tsx
- Bénéfices: components/site/expertise-why.tsx → renommer titres/textes
- Comparaison: components/site/why-invest.tsx → renommer titre
- Pricing: components/site/pricing-offers.tsx → renommer features
- Technologies: components/site/technologies-grid.tsx → retirer et remplacer par nouvelle section “Votre Site, Toujours à Jour”
- Process: components/site/timeline-process.tsx → renommer 2 libellés
- Témoignages: components/site/testimonials-*.tsx → slide-in + stagger

---

## Definition of Done
- Contenu conforme aux libellés EXACTS ci-dessus (FR)
- Animations en place, compatibles mobile, désactivées si prefers-reduced-motion
- Aucune régression Lighthouse: CLS=0, LCP/INP stables
- Lint/TypeScript OK
- QA: Chrome/Firefox/Safari + iOS/Android

---

## Extensions (optionnel)
- Dupliquer les changements côté /en avec traductions cohérentes
- Ajouter des tests d’accessibilité basiques (focus order, aria-labels)