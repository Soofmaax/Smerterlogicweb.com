# Ajouter des articles de blog (sans coder)

Déposez un fichier Markdown dans ce dossier (`content/blog/`) depuis l’interface GitHub (“Add file” → “Create new file”).
Chaque fichier doit contenir un frontmatter YAML en tête, par exemple :

```md
---
slug: mon-super-article
locale: fr
title: Mon super article
summary: Résumé en 1–2 phrases
publishAt: 2025-01-05T09:00:00Z
tags:
  - site vitrine
  - conversion
---

# Titre H1 (optionnel, le titre du frontmatter est utilisé)

Votre contenu **Markdown** ici. Vous pouvez utiliser des titres, listes, liens, etc.
```

Champs frontmatter :
- `slug` : identifiant unique de l’article (obligatoire si le nom du fichier n’est pas adapté).
- `locale` : `fr` ou `en` (par défaut `fr`).
- `title` : titre affiché (obligatoire).
- `summary` : résumé (optionnel, utilisé sur la page /blog).
- `publishAt` : ISO date (optionnelle) pour antidater ou fixer précisément la date de publication.
- `tags` : liste de mots‑clés (optionnelle).

Publication :
- Les articles sont publiés automatiquement selon un planning Lundi/Mercredi/Vendredi.
- Variables d’environnement :
  - `BLOG_SCHEDULE_START_FR` / `BLOG_SCHEDULE_START_EN` : date de départ (modifiez pour antidater).
  - `BLOG_PUBLISH_HOUR` : heure (0–23).
  - `BLOG_INITIAL_PUBLISH_COUNT_FR` / `BLOG_INITIAL_PUBLISH_COUNT_EN` : nombre d’articles publiés immédiatement (burst initial).
  - `BLOG_PUBLISH_OVERRIDE_FR` / `BLOG_PUBLISH_OVERRIDE_EN` : slugs publiés immédiatement (séparés par des virgules), quelque soit la date.

Autrement dit : vous pouvez publier sans coder en créant/éditant des fichiers `.md` dans ce dossier via GitHub.