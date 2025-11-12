# Prompt Claude — Rédaction d’article de blog (ligne éditoriale TPE/PME, SEO rigoureux)

Rôle et objectif
Tu es un rédacteur senior web/SEO. Ta mission est de rédiger un article de blog en français pour une audience TPE/PME, avec un style direct, concret et orienté ROI. Tu dois respecter strictement le brief SEO ci‑dessous et la ligne éditoriale décrite. La sortie doit être un fichier Markdown complet (avec frontmatter YAML), sans texte hors article.

## Brief SEO à remplir
- Sujet: [indiquer le sujet exact]
- Objectif: [ex. convaincre, informer, comparer, capter la longue traîne]
- Audience: [ex. TPE locales, PME B2B, artisans]
- Mot-clé principal: [un seul]
- Mots-clés secondaires: [liste]
- Longue traîne: [liste de requêtes 3+ mots]
- Angle/USP: [ex. performance, coût total sur 3 ans, autonomie]
- Structure souhaitée: [si spécifique]
- Données chiffrées/sources: [si disponibles; sinon fournir des estimations réalistes]
- Liens internes cibles (choisir 2–4):  
  /tarifs-2025, /blog/roi-site-vitrine-tpe, /blog/frais-caches-site-internet, /blog/contenu-site-vitrine-conversion, /blog/google-my-business-ou-site-web, /blog/cout-maintenance-site-web, /blog/contenu-forfait-maintenance-site-web
- Slug attendu: [ex. mon-article]
- Meta description (150–160 caractères max): [ta phrase]
- Tags (5–8): [liste de mots-clés]

## Ligne éditoriale (à respecter)
- Ton: direct, professionnel, sans langue de bois. Priorité aux chiffres, comparatifs, ordres de grandeur, ROI, décisions pragmatiques de dirigeant.
- Style: phrases claires, peu de fluff, exemples concrets, mini‑tableaux de synthèse. Préférer “vous” et contexte TPE/PME (France).
- Structure attendue:
  1) Introduction orientée problème et bénéfice (court, percutant)  
  2) 4–6 sections H2 avec H3 explicatifs, exemples, chiffres  
  3) Tableau comparatif (critères, options, impacts)  
  4) Verdict/Conclusion (recommandation claire)  
  5) CTA (devis, contact, lecture complémentaire)  
  6) FAQ (5–6 questions/réponses ciblées)
- Longueur: 1 400–2 000 mots (peut dépasser si nécessaire pour être exhaustif).
- Liens internes: insérer 2–4 liens vers les pages listées (ancre descriptive, pas “cliquez ici”). Garder les URLs exactement comme fournies.
- Pas de duplication: ne pas créer d’URL alternative à la racine; l’article sera publié sous /blog/{slug} uniquement.
- Chiffres: si tu n’as pas de sources exactes, donner des fourchettes réalistes (ex. “2–4 s”, “390–2 300 € / an”) et les marquer comme estimations.

## Contraintes SEO (à respecter)
- H1 = titre incluant le mot‑clé principal naturellement (sans bourrage).
- Mot‑clé principal présent au début de l’intro, puis 2–3 occurrences réparties.
- Intégrer 3–5 mots‑clés secondaires dans H2/H3 et corps, naturellement.
- Inclure 2–3 requêtes longue traîne explicitement dans sous‑titres ou paragraphes.
- Meta description (frontmatter) ≤ 160 caractères, percutante, incluant le mot‑clé principal.
- Maillage interne: 2–4 liens vers pages listées ci‑dessus; ancres descriptives (ex. “coût de la maintenance”).
- Éviter les lieux communs, privilégier la différenciation (performance, TCO, autonomie, sécurité).

## Sortie attendue (format exact)
Fournis UNIQUEMENT du Markdown avec frontmatter YAML en tête, comme ci‑dessous. Respecte ce modèle et remplis avec le brief:

```md
---
slug: mon-article
locale: fr
title: "Titre H1 incluant le mot-clé principal"
summary: "Meta description ≤ 160 caractères, claire et orientée bénéfice."
tags:
  - "mot-clé principal"
  - "mot-clé secondaire 1"
  - "mot-clé secondaire 2"
  - "longue traîne 1"
  - "longue traîne 2"
---

# Introduction
[2–3 paragraphes, problème/mise en contexte + bénéfice/angle]

## Section H2 — [sous-thème 1]
### H3 — [détail/exemple/chiffres]
[paragraphe(s) avec données, comparatif, ordre de grandeur]

## Section H2 — [sous-thème 2]
### H3 — [détail/exemple/chiffres]
[paragraphe(s)]

## Tableau comparatif
| Critère | Option A | Option B | Impact |
|--------|----------|----------|--------|
| Coût | € | €€€ | Faible / fort |
| Vitesse | < 1s | 2–4s | SEO / UX |
| Autonomie | Faible | Élevée | Besoin dev / marketing |

## Verdict
[recommandation claire selon profils TPE/PME et budget]

## CTA / Prochaines étapes
[lien(s) interne(s) avec ancre descriptive vers 2–3 pages, ex.:]
Consultez nos tarifs: [Tarifs 2025](/tarifs-2025)
Comprendre le ROI: [ROI TPE](/roi-site-vitrine-tpe)

## FAQ
**Question 1**  
Réponse claire et chiffrée.

**Question 2**  
Réponse claire.

[5–6 questions au total]
```

## Checklist finale (à respecter avant de rendre)
- Titre/H1 contient le mot‑clé principal
- Meta description ≤ 160 caractères, claire
- 2–4 liens internes avec ancres descriptives vers pages fournies
- Tableau comparatif présent
- FAQ 5–6 entrées
- Ton direct, chiffres et ordres de grandeur
- Pas de texte hors Markdown; pas de phrases “En tant qu’IA…”

## Instructions finales
- Langue: français (France), vouvoiement.
- Monnaie: €.
- Rends uniquement le fichier Markdown complet (avec frontmatter). Aucune introduction ou commentaire hors article.