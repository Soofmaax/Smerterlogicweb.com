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
published: false
draft: false
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
- `published` : `true` pour publier immédiatement (utilise “maintenant” si `publishAt` n’est pas défini).
- `draft` : `true` pour masquer l’article (non publié).
- `tags` : liste de mots‑clés (optionnelle).

Raccourci par nom de fichier :
- Si le fichier commence par `YYYY-MM-DD-`, cette date est utilisée automatiquement comme `publishAt`.
  - Exemple : `2025-01-05-mon-super-article.md` → `publishAt: 2025-01-05T09:00:00Z` (heure par défaut : 9h).

Publication (automatique, sans gérer des variables pour chaque article) :
- Vous pouvez ignorer les variables d’environnement et simplement utiliser `publishAt`/`published`/`draft` dans chaque fichier.
- Par défaut, sans `publishAt` ni `published`, les articles sont planifiés automatiquement Lundi/Mercredi/Vendredi.
- Pour une publication immédiate : `published: true` (facultatif : ajoutez `publishAt` si vous voulez une date précise).
- Pour antidater : définissez `publishAt` dans le frontmatter ou utilisez le nom de fichier avec date.

Variables d’environnement (optionnelles, globales) :
- `BLOG_SCHEDULE_START_FR` / `BLOG_SCHEDULE_START_EN` : date globale de départ (utile pour un antidatage massif).
- `BLOG_PUBLISH_HOUR` : heure (0–23).
- `BLOG_INITIAL_PUBLISH_COUNT_FR` / `BLOG_INITIAL_PUBLISH_COUNT_EN` : nombre d’articles publiés immédiatement (burst initial).
- `BLOG_PUBLISH_OVERRIDE_FR` / `BLOG_PUBLISH_OVERRIDE_EN` : slugs publiés immédiatement (séparés par des virgules), quelque soit la date.

En bref : vous pouvez publier 30 articles sans toucher aux variables d’environnement — déposez des `.md` avec `publishAt` (ou nom de fichier daté), ou mettez `published: true` pour une publication instantanée.