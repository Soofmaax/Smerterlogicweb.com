/**
 * Centralised commercial and pricing data (FR)
 * Update values here to reflect your strategy. Components import from this file.
 *
 * 2025 Grid — Static sites for professions libérales (avocats, experts-comptables, architectes…)
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
    name: "Essentiel",
    price: "1 490€ TTC (paiement unique)",
    recommended: false,
    forWho: "TPE, professions libérales en démarrage, budget maîtrisé",
    cases: [
      "Cabinet d’avocats en démarrage",
      "Expert‑comptable local",
      "Architecte indépendant",
    ],
    includes: [
      "Site statique 3 à 5 pages (Accueil, Services, À propos, Contact + mentions légales)",
      "Template semi‑personnalisé (couleurs, logo, responsive)",
      "Contenu structuré (rédaction guidée, optimisation basique)",
      "SEO technique de base (title, meta, sitemap, Hn, images)",
      "Formulaire de contact sécurisé, Google Maps, SSL",
      "Hébergement Netlify gratuit à vie",
      "Nom de domaine offert 1 an (.fr ou .com) + configuration DNS",
      "Livraison clé en main + documentation PDF",
      "Support email 1 mois",
      "Propriété totale (code source remis, domaine à votre nom, aucune dépendance)",
      "Délai: 2–3 semaines",
    ],
  },
  {
    name: "Professionnel",
    price: "2 490€ TTC (paiement unique)",
    recommended: true,
    forWho:
      "Cabinets établis, TPE/PME qui veulent se différencier et attirer des clients via leur site",
    cases: [
      "Cabinet multi‑expertises (pages services détaillées)",
      "Consultant qui veut capter des leads qualifiés",
    ],
    includes: [
      "Site statique 5 à 8 pages",
      "Design 100% sur‑mesure (maquettes Figma validées)",
      "Rédaction complète incluse (SEO + recherche de mots‑clés)",
      "SEO avancé (audit sémantique, longue traîne, maillage interne, Schema.org)",
      "Intégrations pro: GA4 + Plausible, Search Console, Calendly, formulaire multi‑étapes",
      "Performance garantie: PageSpeed ≥95 desktop, ≥90 mobile, <1,5s",
      "Livraison clé en main + tutoriel vidéo Analytics + documentation",
      "Support email prioritaire 3 mois",
      "Propriété + sécurité: code sur GitHub privé, sauvegardes automatiques quotidiennes",
      "Délai: 4–6 semaines",
    ],
    quote:
      "Exemple: bmsventouse.fr — en ligne depuis 07/2025, page 1 Google sur requêtes cibles, leads France/Belgique/USA.",
  },
  {
    name: "Premium",
    price: "4 990€ TTC (paiement unique)",
    recommended: false,
    forWho:
      "Réseaux de cabinets, sites complexes, projets multi‑sites ou multilingues",
    cases: [
      "Cabinet international (FR/EN)",
      "Réseau multi‑bureaux",
      "Site haut de gamme à forte différenciation",
    ],
    includes: [
      "Site statique 10 à 15 pages OU multilingue (FR/EN)",
      "Design premium animé (micro‑interactions, direction artistique poussée)",
      "Rédaction longue (jusqu’à 15 pages) + 5 articles SEO (1 500 mots)",
      "Glossaire métier ou FAQ exhaustive; pages piliers",
      "Stratégie SEO complète 6 mois (audit concurrentiel, planning éditorial, netlinking initial)",
      "Intégrations avancées: CRM (Zoho/HubSpot/Salesforce), API externes, espace client, formulaires conditionnels, chatbot",
      "Performance ultra‑optimisée: PageSpeed ≥98, CDN mondial, optimisation avancée",
      "6 mois de Formule Évolution offerts (valeur 120€)",
      "Livraison premium (présentation des performances 30 min) + guide PDF + vidéos",
      "Support prioritaire téléphonique 6 mois",
      "Délai: 8–12 semaines",
    ],
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
    name: "Essentiel",
    price: "1 490€ TTC (paiement unique)",
    features: [
      "Site statique 3–5 pages",
      "Template semi‑personnalisé",
      "SEO technique de base",
      "Formulaire contact + Maps + SSL",
      "Hébergement Netlify gratuit",
      "Domaine offert 1 an",
      "Livraison clé en main",
      "Support email 1 mois",
    ],
  },
  {
    name: "Professionnel",
    price: "2 490€ TTC (paiement unique)",
    recommended: true,
    features: [
      "5–8 pages",
      "Design 100% sur‑mesure",
      "Rédaction complète incluse",
      "SEO avancé (audit + longue traîne)",
      "Intégrations pro (GA4, Plausible, Calendly)",
      "Formulaire multi‑étapes",
      "Performance garantie ≥95/≥90/<1,5s",
      "Support prioritaire 3 mois",
    ],
  },
  {
    name: "Premium",
    price: "4 990€ TTC (paiement unique)",
    features: [
      "10–15 pages ou multilingue (FR/EN)",
      "Design premium + animations",
      "Rédaction longue + 5 articles SEO",
      "Stratégie SEO complète 6 mois",
      "CRM + API + espace client + chatbot",
      "PageSpeed ≥98 + CDN mondial",
      "6 mois Formule Évolution offerts",
      "Support téléphonique 6 mois",
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
    title: "Formule Évolution (optionnelle)",
    price: "20€/mois",
    desc: "Sans engagement. 1h de modifications/mois, support prioritaire, monitoring et tarifs préférentiels.",
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
export const MAINTENANCE_MONTHLY_FROM_EUR = 0; // Sites statiques: zéro maintenance technique obligatoire
export const EVOLUTION_MONTHLY_EUR = 20; // Formule Évolution (optionnelle)
export const URGENCY_SLOTS_LEFT_MONTH = 2;
export const GUARANTEE_TEXT_FR =
  "Performance garantie: Professionnel ≥95 (desktop) / ≥90 (mobile) et <1,5s; Premium ≥98 (desktop).";