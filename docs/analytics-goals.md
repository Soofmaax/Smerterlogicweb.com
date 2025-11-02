# Analytics — Événements et Goals (Plausible/Umami)

Ce document décrit les événements émis par le site et comment les configurer comme objectifs (Goals) dans Plausible ou Umami.

## 1. Événements émis

CTA mailto (devis):
- cta_devis_mailto_header — clic CTA header (desktop)
- cta_devis_mailto_header_mobile — clic CTA header (menu mobile)
- cta_devis_mailto_hero — clic CTA sur le héro (home)
- cta_devis_mailto_services — clic CTA page Services
- cta_devis_mailto_projets — clic CTA page Projets
- cta_devis_mailto_apropos — clic CTA page À propos
- cta_devis_mailto_engagement — clic CTA page Engagement
- cta_devis_mailto_footer_text — clic sur l’email texte du footer
- cta_devis_mailto_footer_icon — clic sur l’icône email du footer

Social:
- social_linkedin_footer — clic sur l’icône LinkedIn du footer
- social_github_footer — clic sur l’icône GitHub du footer

Formulaire:
- form_contact_submitted — soumission du formulaire de la page /contact

Implémentation:
- Le helper `track(event, props?)` se trouve dans `lib/analytics.ts`.
- Les appels `track("...")` sont intégrés dans les pages, le header et le footer.

## 2. Configuration des objectifs — Plausible

Pré-requis:
- Domaine ajouté dans Plausible (smarterlogicweb.com).
- Script déjà intégré (voir app/layout.tsx).

Étapes:
1. Ouvrir Plausible > votre site > Conversions (Goals).
2. Ajouter un Goal de type “Custom event”.
3. Renseigner le nom EXACT de l’événement (ex: `cta_devis_mailto_hero`).
4. Répéter pour chaque événement listé ci-dessus.
5. (Optionnel) Définir une valeur monétaire si souhaité.

Vérification:
- Après quelques clics/submit en production, consultez “Events” ou “Goals” pour voir les hits.

Astuce:
- Vous pouvez regrouper plusieurs CTA dans un seul goal en utilisant un filtre/regex dans l’interface de Plausible lors des rapports (ex: `cta_devis_mailto_.*`).

## 3. Configuration des objectifs — Umami

Pré-requis:
- Instance Umami (cloud ou auto-hébergée).
- Script Umami intégré (voir variables d’environnement ci-dessous).

Étapes:
1. Dans Umami, créer un site et récupérer `websiteId`.
2. Définir `NEXT_PUBLIC_ANALYTICS_PROVIDER=umami` et `NEXT_PUBLIC_UMAMI_WEBSITE_ID=<votre-id>` et `NEXT_PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js` (ou votre domaine custom).
3. Déclarer des events “Custom” dans l’interface Umami, selon les noms ci-dessus.
4. Vérifier les hits dans le dashboard après interactions.

## 4. Bascule Plausible / Umami

Variables d’environnement (Next.js):
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `plausible` (par défaut) ou `umami`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `smarterlogicweb.com` (par défaut)
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` = votre ID Umami
- `NEXT_PUBLIC_UMAMI_SRC` = `https://analytics.umami.is/script.js` (ou votre script self-hosted)

La bascule est gérée dans `app/layout.tsx`. Aucune modification de code supplémentaire n’est nécessaire, uniquement les variables.

## 5. CSP (Content-Security-Policy)

- CSP activée (enforcement) dans `netlify.toml`.
- Les domaines autorisés incluent Plausible, Umami et reCAPTCHA Netlify.
- Collecte des violations: le header `Report-To` et `report-uri` pointent vers `/api/csp-report`.
- Vous pouvez consulter les logs des rapports CSP dans les logs Netlify (fonction lambda) si nécessaire.