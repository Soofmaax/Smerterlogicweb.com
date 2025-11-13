# Blog — Content authoring guide

Articles live in `content/blog/*.md` with YAML frontmatter. The site renders Markdown through Remark/Rehype into the `prose` typography so it follows your global CSS.

## Frontmatter fields

```yaml
slug: "mon-article-super"
locale: "fr" # or "en"
title: "Titre de l’article"
summary: "Résumé court pour la liste et l’OpenGraph"
authorName: "Sonia" # optionnel
authorUrl: "https://exemple.com" # optionnel
tags:
  - visibilité
  - performance
# Publication:
# - publishAt: ISO optionnel (ex. "2025-10-22T09:00:00Z")
# - published: true pour publier immédiatement (hors planning)
# - draft: true pour masquer (quel que soit le planning)
published: false
draft: false
```

## File name convention (auto date)

If your file name starts with `YYYY-MM-DD-...`, the date is used automatically as `publishAt` at the configured hour (BLOG_PUBLISH_HOUR, default 9). Example:

```
2025-10-20-mes-conseils-seo.md  # => publishAt: 2025-10-20 09:00
```

Slug defaults to the part after the date (`mes-conseils-seo`). You can still override slug in frontmatter.

## Scheduling logic

- Automatic slots: Monday/Wednesday/Friday at 09:00.
- Start for FR: 2025-10-20 (configured in environment).
- Initial burst FR: 0 (no immediate publications).
- Draft posts are never published.
- `published: true` forces immediate publication.

## Minimal example

```markdown
---
slug: "bien-rediger-page-accueil"
locale: "fr"
title: "Comment bien rédiger la page d’accueil de votre site"
summary: "Méthode simple pour clarifier la proposition de valeur et augmenter les conversions."
tags: ["copywriting", "conversion"]
published: false
draft: false
---

## Introduction

Votre page d’accueil doit expliquer **qui vous êtes** et **ce que vous faites** en 5 secondes. Voici une méthode simple…

1. Clarifiez votre promesse.
2. Montrez des preuves (témoignages, chiffres).
3. Orientez vers une action claire (réserver, contacter).

> Astuce : utilisez des sous-titres courts et des listes pour améliorer la lisibilité.
```

When you send me each French article, I will add it here with the correct date and slot. When you ask, I will provide the English version following the same structure and cross-link if needed.