---
slug: "installer-plausible-site-statique-rgpd"
locale: "fr"
title: "Installer Plausible sur un site statique : tutoriel + bonnes pratiques RGPD"
summary: "Installation pas-à-pas de Plausible sur un site statique (Next.js, HTML…), configuration des événements et bonnes pratiques RGPD pour TPE/PME."
tags:
  - "plausible analytics"
  - "installer plausible"
  - "analytics site statique"
  - "rgpd analytics"
  - "mesure audience tpe"
altLocales:
  en: "install-plausible-on-static-site-rgpd-best-practices"
published: false
draft: false
---

Vous voulez suivre les performances de votre site vitrine sans :

- installer Google Analytics 4,
- vous battre avec des dizaines de rapports,
- multiplier les bandeaux cookies.

Plausible est une excellente alternative :

- simple à utiliser,
- légère (script très petit),
- pensée pour la confidentialité (pas de cookies par défaut, serveurs en Europe).

Pour une TPE qui ne code pas, la bonne nouvelle est la suivante :

- votre **décision stratégique**, c’est de choisir un outil comme Plausible plutôt que GA4 ;
- la **mise en place technique** (coller le script sur le site, configurer quelques événements) est un travail de **prestataire** (développeur, intégrateur, agence) qui prend en général 30 à 60 minutes.

Autrement dit : vous n’avez pas besoin de mettre les mains dans le code. Votre rôle est de demander à votre prestataire d’installer Plausible (et non GA4) pour mesurer l’audience de votre site.

Dans cet article, on va voir **pas à pas** comment :

- installer Plausible sur un **site statique** (Next.js, HTML simple…),
- configurer quelques événements utiles pour une TPE,
- rester dans de bonnes pratiques **RGPD**.

---

## 1. Créer un compte Plausible et ajouter votre site

### 1.1. Créer un compte

Rendez-vous sur le site de Plausible (plausible.io) :

- créez un compte,
- choisissez l’offre la plus adaptée (en général, le premier palier suffit pour un site vitrine TPE),
- validez votre email.

### 1.2. Ajouter votre site

Dans Plausible :

1. Cliquez sur “Add a website”.
2. Renseignez l’URL de votre site :
   - ex : `https://votresite.fr`.
3. Choisissez vos préférences :
   - fuseau horaire : “Europe/Paris”,
   - devise : “EUR”.

Plausible va vous donner un **code de tracking** à intégrer sur votre site.

---

## 2. Intégrer Plausible sur un site statique (HTML / Next.js)

Si vous travaillez déjà avec un développeur ou une agence, c’est généralement lui/elle qui se chargera de cette étape. Pour vous, l’essentiel est de savoir **quoi lui demander** :

- “Pouvez-vous installer Plausible sur toutes les pages du site (à la place ou en complément de GA4), en suivant les bonnes pratiques RGPD ?”

Vous pouvez néanmoins garder les indications ci-dessous comme base pour votre prestataire ou pour vous si vous gérez vous-même le site.

### 2.1. Version HTML statique simple

Si votre site est en HTML “classique” (sans framework), vous pouvez copier/coller le script fourni par Plausible juste avant `</head>`.

Exemple (adapté, ne colle pas ce code tel quel sans remplacer le domaine) :

```html
<script
  defer
  data-domain="votresite.fr"
  src="https://plausible.io/js/script.js"
></script>
```

Assurez-vous que:

- `data-domain` correspond exactement à votre domaine,
- le script est bien chargé sur **toutes les pages** (si vous avez un layout global, mettez-le là).

### 2.2. Version Next.js / site statique moderne

Si vous utilisez Next.js (ou un framework similaire) qui génère un site statique, vous pouvez :

- utiliser le composant `next/script`,
- ou intégrer le script dans votre layout principal.

Exemple avec Next.js :

```tsx
// Dans votre layout ou composant <Head/>
import Script from "next/script";

export function Analytics() {
  return (
    <Script
      defer
      data-domain="votresite.fr"
      src="https://plausible.io/js/script.js"
    />
  );
}
```

Puis inclure `<Analytics />` dans votre layout racine (par exemple `app/layout.tsx`).

---

## 3. Définir des événements simples pour site vitrine

Un script de base remonte uniquement :

- les vues de pages,
- les sources de trafic.

Vous pouvez aller un peu plus loin en traçant vos actions clés :

- envoi de formulaire,
- clic sur téléphone,
- clic sur email,
- clic vers un agenda externe (type Calendly).

### 3.1. Exemple : clic sur bouton “Appeler”

Dans votre code (ou HTML), vous pouvez ajouter un handler pour Plausible :

```html
<a href="tel:+33123456789" onclick="plausible('clic_telephone')">
  Appelez-nous
</a>
```

Quand un visiteur clique, un événement `clic_telephone` est envoyé à Plausible.

### 3.2. Exemple : envoi de formulaire

En JavaScript, sur l’événement de succès du formulaire :

```js
form.addEventListener("submit", function (event) {
  // votre logique de validation / envoi...
  plausible("formulaire_contact_envoye");
});
```

Note : adaptez en fonction de votre stack (fetch, XHR, backend, etc.).

### 3.3. Vérifier dans Plausible

Après quelques clics/tests :

- allez dans Plausible,
- onglet “Goals” (Objectifs),
- vous verrez vos événements,
- vous pourrez les déclarer comme objectifs de conversion (goals).

---

## 4. Bonnes pratiques RGPD avec Plausible

Même si Plausible est pensé “privacy-first”, quelques points de vigilance :

### 4.1. Informer dans la politique de confidentialité

Ajoutez une section “Mesure d’audience” où vous précisez :

- l’outil utilisé (Plausible),
- la finalité : mesure d’audience anonymisée,
- le fait qu’aucun cookie de suivi n’est déposé pour la mesure d’audience (si vous utilisez Plausible tel quel),
- le lien vers la documentation de Plausible (politique de confidentialité).

### 4.2. Bannière cookies : oui ou non ?

Plusieurs autorités (dont la CNIL) considèrent qu’une mesure d’audience strictement **limitée** et **anonymisée** peut être exemptée de consentement, si certaines conditions sont respectées.

Plausible est conçu pour se rapprocher de ce modèle (pas de cookie, pas de profilage).  

Cependant :

- si vous avez d’autres scripts (Google Ads, Meta Pixel, etc.), vous aurez de toute façon besoin d’une bannière cookies,
- dans ce cas, gardez votre bannière mais vous pouvez déclarer Plausible comme **mesure d’audience exempte**, distincte des trackers marketing.

En cas de doute, demandez l’avis de votre conseil juridique ou DPO.

### 4.3. Limiter les données collectées

Même si Plausible est minimaliste, évitez de:

- envoyer des données personnelles en clair dans les URLs (emails, noms),
- utiliser des noms d’événements contenant des informations sensibles.

Gardez les événements **génériques** (`formulaire_contact_envoye`, `clic_telephone`) sans données personnelles attachées.

---

## 5. Vérifier que tout fonctionne

Après installation :

1. Visitez votre site,
2. cliquez sur quelques liens et formulaires,
3. allez dans votre tableau de bord Plausible.

Vous devriez voir:

- vos visites,
- vos pages,
- vos événements.

Astuce : Plausible propose un petit mode “Debug” dans l’interface pour voir les événements en temps réel.

---

## 6. Quelques rapports utiles dans Plausible pour TPE

Plausible est volontairement moins complexe que GA4. Les rapports clés :

- Vue d’ensemble :
  - visites,
  - visiteurs uniques,
  - taux de rebond,
  - durée moyenne.
- Sources :
  - Organic Search (SEO),
  - Direct,
  - Referals (sites qui vous envoient du trafic),
  - Social.
- Pages :
  - les plus vues,
  - les plus engageantes.

Et si vous avez défini des objectifs :

- suivi des conversions (formulaire, clic téléphone, etc.),
- répartition par source.

En quelques minutes, vous pouvez déjà répondre à :

- “Est-ce que mon SEO apporte du trafic?”
- “Est-ce que LinkedIn génère des visites?”
- “Quelles pages déclenchent des contacts?”

---

## FAQ — Installer Plausible sur site statique

**Plausible remplace-t-il complètement Google Analytics ?**

Pour un site vitrine TPE, Plausible couvre la grande majorité des besoins: trafic, pages, sources, objectifs simples. Si vous n’avez pas de besoins très avancés en tracking, vous pouvez vous passer de GA4 sans problème.

---

**Plausible est-il gratuit ?**

Non, c’est un service payant, mais les tarifs restent modestes pour un site vitrine TPE. L’idée est de payer pour un outil :

- simple,
- léger,
- conçu pour la confidentialité,

plutôt que de “payer en complexité” avec un outil gratuit mais plus lourd.

---

**Je ne code pas, dois-je comprendre les exemples ci-dessus ?**

Non. Si vous êtes dirigeant(e) de TPE, votre rôle n’est pas d’écrire du code, mais de **prendre la bonne décision** :

- choisir un outil de mesure d’audience comme Plausible (plutôt que GA4 par défaut),
- demander à votre développeur ou agence de l’installer correctement sur votre site.

Les extraits de code dans cet article servent de référence pour :

- votre prestataire,
- ou les lecteurs plus techniques.

Vous pouvez les ignorer en toute sécurité et simplement transmettre l’article à la personne qui gère votre site.

---

**Faut-il un développeur pour installer Plausible ?**

Dans la plupart des cas, oui :

- sur un site HTML ou Next.js, un développeur ou intégrateur le fera en 30–60 minutes,
- sur des CMS comme WordPress, Wix, Webflow, la plupart du temps il suffit :
  - d’utiliser un module/extension qui permet d’ajouter un script dans le &lt;head&gt; (ex. “Header/Footer Script”),
  - ou d’utiliser la zone prévue pour les scripts analytics.

En pratique, vous pouvez simplement dire à votre prestataire :

> “Nous utilisons Plausible pour la mesure d’audience.  
> Merci de coller le script global sur toutes les pages (via le CMS ou le code), et de configurer un événement pour le formulaire de contact et les clics téléphone/email.”

L’essentiel pour vous : **ne pas choisir GA4 par défaut**, mais un outil comme Plausible, puis laisser votre prestataire gérer la partie technique.

---

**Puis-je utiliser Plausible et GA4 en parallèle ?**

Oui. C’est même une bonne approche pour tester :

- vous installez Plausible,
- vous comparez les tendances par rapport à GA4 pendant quelques semaines,
- vous décidez ensuite lequel garder comme outil principal.

---

Si vous avez un site vitrine statique ou en cours de refonte, je peux intégrer Plausible pour vous :

- installation du script,
- paramétrage des événements clé (formulaire, clic téléphone/email),
- mise à jour de votre politique de confidentialité,

pour que vous ayez enfin un **tableau de bord clair** sans vous compliquer la vie.