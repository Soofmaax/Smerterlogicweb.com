/**
 * Centralised commercial and pricing data (FR)
 * 2025 — Sites statiques pour professions libérales (avocats, experts-comptables, architectes…)
 * Update values here to reflect your strategy. Components import from this file.
 */

export type OfferFR = {
  name: string;
  price: string; // TTC
  recommended?: boolean;
  forWho: string;
  cases: string[];
  includes: string[];
  quote?: string;
};

export const OFFERS_FR: OfferFR[] = [
  {
    name: "Essentiel",
    price: "1 490€ TTC",
    recommended: false,
    forWho: "TPE, professions libérales en démarrage, budget maîtrisé",
    cases: [
      "Cabinet d'avocats qui démarre et veut une présence claire",
      "Expert-comptable indépendant",
      "Architecte / architecte d’intérieur avec portfolio simple",
    ],
    includes: [
      "Site statique 3 à 5 pages (Accueil, Services, À propos, Contact + Mentions légales)",
      "Template semi‑personnalisé (couleurs, logo, responsive)",
      "Contenu structuré et guidé (vous rédigez, optimisation basique)",
      "SEO technique de base (balises, sitemap, images, Hn)",
      "Formulaire de contact sécurisé + Google Maps + SSL",
      "Hébergement Netlify gratuit à vie + domaine offert 1 an",
      "Configuration DNS et emails",
      "Livraison clé en main + guide PDF + support email 1 mois",
      "Propriété totale (code source, domaine à votre nom)",
    ],
    quote: "“Site sobre et rapide, parfait pour démarrer — aucune contrainte technique.”",
  },
  {
    name: "Professionnel",
    price: "2 490€ TTC",
    recommended: true,
    forWho: "Cabinets établis, TPE/PME qui veulent se différencier et attirer des clients",
    cases: [
      "Cabinet d'avocats multi‑domaines avec pages expertise",
      "Cabinet d’expertise‑comptable voulant générer des leads qualifiés",
      "Agence d'architecture avec actualités et témoignages",
    ],
    includes: [
      "Site statique 5 à 8 pages",
      "Design 100% sur‑mesure (maquettes Figma validées)",
      "Rédaction complète incluse (ton adapté, SEO on‑page)",
      "SEO avancé (audit sémantique, longue traîne, Core Web Vitals)",
      "Maillage interne structuré + Schema.org",
      "Intégrations pro: GA4 + Plausible, Search Console, Calendly/RDV",
      "Formulaire multi‑étapes (captation leads qualifiés)",
      "Performance garantie PageSpeed: 95+ desktop / 90+ mobile",
      "Livraison clé en main + tuto vidéo Analytics + documentation",
      "Support email prioritaire 3 mois",
      "Propriété + sauvegardes automatiques quotidiennes",
    ],
    quote: "“Design sur‑mesure, contenus optimisés, leads qualifiés — le site travaille pour nous.”",
  },
  {
    name: "Premium",
    price: "4 990€ TTC",
    recommended: false,
    forWho: "Réseaux de cabinets, multi‑sites ou multilingues, projets complexes",
    cases: [
      "Cabinet international (FR/EN) ou multi‑bureaux",
      "Projet avec intégrations CRM/API et espace client",
      "Site étendu avec blog structuré (10 catégories)",
    ],
    includes: [
      "Site statique 10 à 15 pages ou multilingue (FR/EN)",
      "Design premium sur‑mesure avec animations et micro‑interactions",
      "Direction artistique poussée (shooting/photo ou banques premium)",
      "Rédaction longue: jusqu’à 15 pages + 5 articles SEO (≈1 500 mots)",
      "Stratégie SEO complète 6 mois (audit concurrentiel, planning éditorial)",
      "Netlinking initial + optimisation géolocalisée (si multi‑bureaux)",
      "Intégrations avancées: CRM (Zoho/HubSpot/Salesforce), API, chatbot/live chat",
      "Espace client sécurisé (si besoin) + formulaires conditionnels",
      "Performance ultra‑optimisée (Score PageSpeed 98+ garanti, CDN mondial)",
      "6 mois de Formule Évolution offerts (valeur 120€)",
      "Livraison premium avec présentation des performances (30 min) + guide PDF + vidéos",
      "Support prioritaire téléphonique 6 mois",
    ],
    quote: "“Site haut de gamme, multilingue, rapide et optimisé — avec évolution incluse 6 mois.”",
  },
];

export type PlanFR = {
  name: string;
  price: string; // TTC
  features: string[];
  recommended?: boolean;
};

export const PLANS_FR: PlanFR[] = [
  {
    name: "Essentiel",
    price: "1 490€ TTC",
    features: [
      "Site statique 3–5 pages",
      "Template semi‑personnalisé",
      "SEO technique de base",
      "Formulaire + Maps + SSL",
      "Hébergement Netlify gratuit",
      "Domaine offert 1 an",
      "Support email 1 mois",
    ],
  },
  {
    name: "Professionnel",
    price: "2 490€ TTC",
    recommended: true,
    features: [
      "5–8 pages, design sur‑mesure",
      "Rédaction complète incluse",
      "SEO avancé + maillage interne",
      "Analytics + Calendly/RDV",
      "Formulaire multi‑étapes",
      "Perf. 95+ desktop / 90+ mobile",
      "Support prioritaire 3 mois",
    ],
  },
  {
    name: "Premium",
    price: "4 990€ TTC",
    features: [
      "10–15 pages ou multilingue (FR/EN)",
      "Design premium + animations",
      "Rédaction longue + 5 articles SEO",
      "Stratégie SEO complète 6 mois",
      "CRM + API + espace client",
      "Perf. 98+ garanti",
      "6 mois Formule Évolution offerts",
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
    title: "Formule Évolution",
    price: "20€/mois",
    desc: "Option sans engagement: 1h de modifications/mois, heures cumulables sur 3 mois, support prioritaire et monitoring.",
    iconKey: "server",
  },
  {
    title: "Adaptation graphique",
    price: "À partir de 150€",
    desc: "Cartes de visite, flyers, QR codes, signature email — selon votre charte.",
    iconKey: "brush",
  },
  {
    title: "Migration WordPress → Statique",
    price: "Sur devis",
    desc: "Reprise de contenu, nettoyage, optimisation performance & SEO, sécurisation.",
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
export const MAINTENANCE_MONTHLY_FROM_EUR = 0; // sites statiques: pas de maintenance obligatoire
export const AFTER_FIRST_YEAR_MAINTENANCE_MONTHLY_EUR = 0; // pas d'obligation — hébergement Netlify gratuit
export const EVOLUTION_MONTHLY_EUR = 20;
export const URGENCY_SLOTS_LEFT_MONTH = 2;

export const GUARANTEE_TEXT_FR =
  "Garantie de performance (Core Web Vitals) et délais respectés — ou remboursement de l’acompte.";