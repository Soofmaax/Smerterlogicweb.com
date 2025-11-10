/**
 * Centralised commercial and pricing data (FR)
 * Update values here to reflect your strategy. Components import from this file.
 */

export type OfferFR = {
  name: string;
  price: string;
  recommended?: boolean;
  forWho: string;
  cases: string[];
  includes: string[];
  quote?: string;
};

export const OFFERS_FR: OfferFR[] = [
  {
    name: "Site Vitrine",
    price: "1800€",
    recommended: false,
    forWho:
      "Idéal pour artisans qui débutent en ligne, commerces locaux, indépendants.",
    cases: [
      "Plombier qui veut être trouvé sur Google",
      "Boulangerie qui veut montrer ses produits",
      "Menuisier qui veut présenter ses réalisations",
    ],
    includes: [
      "3 à 5 pages claires (Accueil, Services, Réalisations, À propos, Contact)",
      "Formulaire pour recevoir des demandes de devis",
      "Visible sur Google dès le lancement",
      "Rapide sur téléphone et ordinateur",
      "Adresse et horaires d'ouverture bien visibles",
    ],
    quote:
      "“Le Site Vitrine nous a permis d’être contactés toutes les semaines.”",
  },
  {
    name: "Site Business",
    price: "3200€",
    recommended: true,
    forWho:
      "Pour artisans établis, commerces avec galerie photos, entreprises qui veulent générer plus de contacts.",
    cases: [
      "Électricien avec 20 ans d'expérience et beaucoup de réalisations",
      "Restaurant qui veut afficher son menu",
      "Entreprise du bâtiment qui gère plusieurs demandes par semaine",
    ],
    includes: [
      "5 à 10 pages",
      "Galerie photos illimitée et optimisée",
      "Blog pour partager votre expertise",
      "Espace actualités / promotions",
      "Suivi des visiteurs (Analytics simplifié)",
      "Optimisation avancée pour être premier sur Google",
    ],
    quote:
      "“Nous avons multiplié les demandes de devis grâce à la galerie et au blog.”",
  },
  {
    name: "Site Premium",
    price: "5500€",
    recommended: false,
    forWho: "TPE/PME qui veulent un outil de vente complet et automatisé.",
    cases: [
      "Entreprise avec plusieurs services",
      "Artisan qui veut prendre des réservations en ligne",
      "Commerce qui souhaite vendre en ligne",
    ],
    includes: [
      "Pages illimitées",
      "Prise de rendez‑vous en ligne",
      "Intégrations avancées (calendrier, CRM, facturation)",
      "Espace client sécurisé",
      "Multilingue si besoin",
      "3 mois de suivi marketing inclus",
    ],
    quote:
      "“Un vrai gain de temps: les rendez‑vous et demandes sont automatisés.”",
  },
];

export type PlanFR = {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
};

export const PLANS_FR: PlanFR[] = [
  {
    name: "Site Vitrine",
    price: "À partir de 1 200€",
    features: [
      "3 à 5 pages responsive",
      "Design moderne adapté à votre charte",
      "SEO on‑page complet",
      "Formulaire de contact sécurisé",
      "Google Maps + horaires",
      "Score PageSpeed > 90",
      "Hébergement + domaine 1 an offerts",
      "Formation mise à jour contenu basique",
    ],
  },
  {
    name: "Site Business",
    price: "À partir de 2 500€",
    recommended: true,
    features: [
      "5 à 10 pages",
      "Présentation de vos réalisations",
      "Blog avec catégories",
      "Espace actus / promotions",
      "Suivi de vos visiteurs",
      "Boutons qui incitent vos visiteurs à vous contacter",
      "Support prioritaire 3 mois",
      "Sauvegardes automatiques hebdomadaires",
    ],
  },
  {
    name: "Site Premium",
    price: "Sur devis, à partir de 4 500€",
    features: [
      "Réservation / demande de devis en ligne",
      "Espace client sécurisé (si besoin)",
      "Intégrations API (CRM, calendrier…)",
      "PWA si pertinent",
      "Multilingue si besoin",
      "Suivi positionnement SEO 3 mois",
      "Maintenance et mises à jour annuelles incluses",
      "Accompagnement marketing digital de base",
    ],
  },
];

export type ExtraFR = {
  title: string;
  price: string;
  desc: string;
  iconKey: "brush" | "server" | "shuffle" | "graduationCap";
};

export const EXTRAS_FR: ExtraFR[] = [
  {
    title: "Adaptation graphique",
    price: "À partir de 150€",
    desc: "Cartes de visite, flyers, QR codes, signature email — selon votre charte.",
    iconKey: "brush",
  },
  {
    title: "Maintenance & hébergement",
    price: "Dès 8€/mois",
    desc: "Mises à jour, sauvegardes, corrections, hébergement performant en option.",
    iconKey: "server",
  },
  {
    title: "Migration Wix/WordPress",
    price: "Sur devis",
    desc: "Reprise de contenu, nettoyage, optimisation performance & SEO.",
    iconKey: "shuffle",
  },
  {
    title: "Formation personnalisée",
    price: "60€/h",
    desc: "Apprenez à mettre à jour vos contenus en toute autonomie.",
    iconKey: "graduationCap",
  },
];

// Shared commercial constants (FR)
export const MAINTENANCE_MONTHLY_FROM_EUR = 8;
export const AFTER_FIRST_YEAR_MAINTENANCE_MONTHLY_EUR = 20;
export const URGENCY_SLOTS_LEFT_MONTH = 2;
export const GUARANTEE_TEXT_FR =
  "Garantie 1ère page Google sous 60 jours ou je continue gratuitement.";