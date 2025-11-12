# Rapport Stratégique de Référencement Naturel : Plan de Domination Organique Nationale

Ce document interne décrit la feuille de route stratégique technique, éditoriale et éthique pour établir une autorité SEO nationale sur le marché français de la création/refonte de sites web. Il formalise les décisions d’architecture (SSG), les schémas sémantiques (JSON-LD), le maillage interne, le SEO local anti-duplicate, et le workflow d’automatisation IA piloté par la Google Search Console. Objectif: visibilité nationale et locale maximale sans publicité payante.

## 1. SEO Technique : Avantage Structurel SSG (Core Web Vitals)

- Choix SSG (Next.js, Gatsby, Hugo) pour pages pré‑rendus, TTFB bas, assets minimaux.
- CWV:
  - LCP: contenu critique pré‑rendu, images optimisées, font-display swap.
  - INP/TBT: minimiser JS, architecture Islands (hydratation ciblée, pas de scripts lourds).
  - CLS: dimensions d’images/polices fixées, pas de décalages.
- Bénéfice: vitesse nativement excellente, boost SEO direct/indirect (meilleure UX, rebond bas).

## 2. Conformité France (RGAA 4.1) et Accessibilité

- Intégrer RGAA 4.1 (WCAG 2.x) dès les templates: structure Hn, contraste, focus visibles, alternatives textuelles, lien “Passer au contenu”.
- Gagner en crédibilité B2B (réassurance technique), éviter les frictions UX.

## 3. Structuration des URLs et Siloing Géographique

- Modèle: `/service/ville/` (ex.: `/creation-site/paris/`, `/refonte-web/lyon/`).
- Silos thématiques: dossier principal (ex. `/creation-site/`) regroupant pages villes; maillage interne fort intra-silo.

## 4. Balisage Sémantique Avancé (JSON‑LD)

- Global (layout): `Organization`, `WebSite`, `LocalBusiness` (adresse Paris ou “FR”, téléphone public).
- Pages Services: `Service` (serviceType, provider LocalBusiness, areaServed France, offres).
- FAQ: `FAQPage` avec Q/R structurées.
- Bénéfices: meilleure compréhension par Google, rich snippets, CTR amélioré.

## 5. SEO Local France : Scalabilité Sans Contenu Dupliqué

- Cibler d’abord villes intermédiaires (50k–150k hab.) et zones Périurbaines à concurrence faible (ex.: Oise, Chartres, Normandie, Grand Est).
- Modèle anti‑duplicate (30–40% de contenu unique):
  - Paragraphes locaux (économie régionale, secteurs clés, CCI/pôles, évènements B2B).
  - Ville ancrage + communes satellites (parasitage local) dans le corps de texte.
- Titres/meta: inclure requête + ville (orthographe française correcte).
- Sitemap: inclure toutes pages locales pour indexation rapide.

## 6. Mots‑Clés France : Longue Traîne Géolocalisée

- Intentions:
  - Création: “création site internet + [ville]” (nouveaux entrants).
  - Refonte: “refonte site web + [ville]” (prospects matures; KPI performance/SEO).
- Méthode faible concurrence:
  - Keyword Planner (volumes géolocalisés), SERP inversée: dominance d’annuaires = opportunité.
- Exemples de requêtes:
  - “Création site vitrine BTP [Ville]” (faible à moyen)
  - “Audit refonte site web SSG [Ville]” (très faible)
  - “Développeur front‑end SSG [Ville]” (faible)

## 7. UX/UI Conversion (Services B2B)

- Page type:
  - Héros: PVU claire + CTA above‑the‑fold
  - Problème/Solution: lenteur/SEO → SSG/CWV
  - Processus: transparent, étapes
  - Preuves: témoignages + cas (scores CWV)
  - FAQ: lever objections longue traîne
- CTA: placements répétés, contrastés, accessibles (48px min), texte orienté bénéfice.

## 8. Plan de Contenu Blog (Autorité & Maillage)

- Rythme: tri‑hebdo (Lun technique, Mer stratégie B2B, Ven storytelling local).
- Maillage: chaque article → pages services locales (ancres géolocalisées).
- EEAT: contenu expert, chiffré, différenciant.

## 9. Outils Gratuits

- Keyword Planner (Google Ads): volumes locaux
- GSC: performance, idées IA
- Clarity: heatmaps/session recordings (optimisation CTA)
- PSI/Lighthouse: validation CWV
- AnswerThePublic: FAQ longue traîne

## 10. Netlinking Sans Pub (Autorité Locale)

- GBP (adresse Paris, zones de service France): catégories, services riches en mots‑clés, description (750c), avis/réponses avec mots‑clés, Google Posts mensuels.
- Backlinks: annuaires B2B FR (CCI, Cylex, Opendi, Pages24), forums/groupes LinkedIn (expertise, signature avec lien).
- Cible: 10–15 sources DA>40 pertinentes (qualité > quantité).

## 11. Workflow IA & Automatisation (Éthique)

- IA (Gemini/OpenAI) = productivité; validation humaine obligatoire (EEAT).
- GSC → idées priorisées (impressions hautes, CTR bas, positions 11–20).
- Chaîne:
  1) Extraction hebdo requêtes locales (API GSC via Make/n8n)
  2) Plan structuré (H1/H2/H3/FAQ) avec variables locales (références économiques)
  3) Brouillon (1 500 mots, ton B2B)
  4) Révision humaine (faits locaux, chiffres, SSG)
  5) Maillage interne: suggestions d’ancres/pages
  6) Build SSG + soumission URL (API GSC)

## 12. Checklists de Lancement

### Technique SSG
- CWV verts (LCP, INP, CLS) sur pages principales
- URLs hiérarchiques/silos
- JSON‑LD: Organization, LocalBusiness, Service, FAQPage
- robots.txt & sitemap.xml (soumis GSC)
- RGAA 4.1 (minima) dans templates

### Local & Contenu
- 10 pages locales pilotes (30% unique)
- GBP complété (services + description zones de chalandise)
- 36 articles blog planifiés (3 mois, tri‑hebdo)
- Maillage interne vers pages services locales

### Visibilité & Promotion
- 5–10 annuaires pro FR (CCI, Cylex, Opendi…)
- Stratégie avis GBP + Google Posts
- Comptes forums pro/LinkedIn (signature optimisée)
- 1er cycle 3 articles IA publié et indexé

## 13. Implémentations à Réaliser (Roadmap Site)

- Ajouter lien d’accessibilité “Passer au contenu” (global).
- Injecter JSON‑LD `Service` sur /services.
- Créer gabarits dynamiques `/creation-site/[ville]` et `/refonte-web/[ville]` (villes pilotes).
- Ajouter données locales (économie/secteurs/CCI) pour 10 villes.
- Mettre en place scripts Make/n8n pour extraction GSC (idées IA) et ping d’indexation.

## 14. Conclusion

Domination SEO nationale without ads = rigueur technique SSG + contenu local unique + maillage intelligent + autorité locale (GBP/annuaire) + cadence éditoriale tri‑hebdo, animée par un workflow IA éthique et validé humainement. Prioriser les villes intermédiaires à concurrence faible, puis étendre progressivement.