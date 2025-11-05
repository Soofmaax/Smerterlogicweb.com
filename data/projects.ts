export type ShowcaseItem = {
  title: string;
  subtitle: string;
};

export type KPI = { label: string; value: string };

export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
};

export type CaseItem = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  url?: string;
  kpis?: KPI[];
  images?: string[]; // supply real URLs later if available

  // Extended fields for grid showcase
  sector?: "Artisans & TPE" | "Association";
  city?: string;
  formula?: "Vitrine" | "Business" | "Premium";
  duration?: string;
  quoteShort?: string;
  testimonialFull?: string;
  review?: Review;
};

export type ProjectsData = {
  showcase: ShowcaseItem[];
  cases: CaseItem[];
};

export const projectsFR: ProjectsData = {
  showcase: [
    {
      title: "Site vitrine B2B",
      subtitle: "Sobriété, clarté, conversion — multi‑device responsive",
    },
    {
      title: "Association — accessibilité",
      subtitle: "Contrastes, navigation clavier, lisibilité AA/AAA",
    },
    {
      title: "Performance — Web Vitals",
      subtitle: "First load optimisé, images responsive, mise en cache",
    },
  ],
  cases: [
    {
      id: "plomberie-lyon",
      title: "Julien Plomberie — Lyon",
      tags: ["Next.js", "SEO", "Formulaire"],
      description: "Vitrine simple et claire pour générer des demandes rapidement.",
      url: "",
      kpis: [
        { label: "Demandes / semaine", value: "3–4" },
        { label: "Performance", value: "95/100" },
      ],
      sector: "Artisans & TPE",
      city: "Lyon",
      formula: "Vitrine",
      duration: "2 semaines",
      quoteShort: "“Parfait pour démarrer, je reçois des demandes toutes les semaines.”",
      testimonialFull:
        "Nous avions zéro visibilité. En quelques jours, le site a commencé à apparaître sur Google et les demandes ont suivi. Processus simple, résultat concret.",
      review: { author: "Julien", rating: 5, text: "Excellent travail, site rapide et clair." },
    },
    {
      id: "boulangerie-paris",
      title: "Boulangerie Marie — Paris",
      tags: ["Next.js", "Accessibilité", "SEO"],
      description: "Mise en avant des produits, horaires visibles, mobile first.",
      url: "",
      kpis: [
        { label: "Commandes", value: "+25%" },
        { label: "Mobile readiness", value: "100%" },
      ],
      sector: "Artisans & TPE",
      city: "Paris",
      formula: "Vitrine",
      duration: "3 semaines",
      quoteShort: "“Les clients trouvent tout de suite nos horaires et nous appellent.”",
      testimonialFull:
        "Nous voulions quelque chose de simple et efficace. Le site est rapide, les infos sont claires et nos clients nous trouvent facilement.",
      review: { author: "Marie", rating: 5, text: "Très satisfaite, expérience fluide." },
    },
    {
      id: "menuiserie-nantes",
      title: "Menuiserie Thomas — Nantes",
      tags: ["Galerie", "SEO", "Formulaire"],
      description: "Présentation des réalisations et demandes de devis simples.",
      url: "",
      kpis: [
        { label: "Leads", value: "+30%" },
        { label: "Temps de chargement", value: "0,9s" },
      ],
      sector: "Artisans & TPE",
      city: "Nantes",
      formula: "Business",
      duration: "4 semaines",
      quoteShort: "“Je me concentre sur mes chantiers, le site fait le reste.”",
      testimonialFull:
        "La galerie optimisée et les bons appels à l’action font la différence. Je reçois des demandes régulières, sans perdre du temps.",
      review: { author: "Thomas", rating: 5, text: "Mise en ligne fluide et résultats rapides." },
    },
    {
      id: "electricien-bordeaux",
      title: "Électricien — Bordeaux",
      tags: ["Blog", "Galerie", "Analytics"],
      description: "Site Business pour un artisan établi avec beaucoup de contenu.",
      url: "",
      kpis: [
        { label: "Mots-clés top 3", value: "8+" },
        { label: "Demandes / semaine", value: "5–7" },
      ],
      sector: "Artisans & TPE",
      city: "Bordeaux",
      formula: "Business",
      duration: "5 semaines",
      quoteShort: "“Le blog nous crédibilise et génère des demandes.”",
      testimonialFull:
        "Nous avions du contenu à valoriser : réalisations, conseils. Le site structure tout cela et convertit mieux qu’avant.",
      review: { author: "Équipe Bordeaux", rating: 5, text: "Très pro, retours mesurables." },
    },
    {
      id: "restaurant-nice",
      title: "Restaurant — Nice",
      tags: ["Menu", "SEO local", "Mobile"],
      description: "Consultation du menu et appels rapides depuis mobile.",
      url: "",
      kpis: [
        { label: "Appels / semaine", value: "+40%" },
        { label: "Performance", value: "95/100" },
      ],
      sector: "Artisans & TPE",
      city: "Nice",
      formula: "Business",
      duration: "3 semaines",
      quoteShort: "“Les clients réservent et appellent directement.”",
      testimonialFull:
        "Nous voulions mettre en avant le menu et faciliter l’appel. Le site est rapide et pensé pour le mobile : ça se ressent tout de suite.",
      review: { author: "Gérant", rating: 5, text: "Efficace et sans prise de tête." },
    },
    {
      id: "asso-lille",
      title: "Association Solidarité Locale — Lille",
      tags: ["Accessibilité", "SEO", "Don en ligne"],
      description: "Site clair et accessible pour informer et faciliter le don.",
      url: "",
      kpis: [
        { label: "Lighthouse", value: "95+" },
        { label: "Trafic organique", value: "+40%" },
      ],
      sector: "Association",
      city: "Lille",
      formula: "Vitrine",
      duration: "2 semaines",
      quoteShort: "“Plus lisible, plus accessible — plus de soutien.”",
      testimonialFull:
        "L’accessibilité était notre priorité. Le site est plus clair, plus lisible et mieux référencé : nous touchons plus de personnes.",
      review: { author: "Présidente", rating: 5, text: "Beaucoup de soin et d’écoute." },
    },
  ],
};

export const projectsEN: ProjectsData = {
  showcase: [
    {
      title: "B2B showcase site",
      subtitle: "Sober, clear, conversion‑ready — fully responsive",
    },
    {
      title: "Nonprofit — accessibility",
      subtitle: "Contrast, keyboard nav, AA/AAA readability",
    },
    {
      title: "Performance — Web Vitals",
      subtitle: "Optimised first load, responsive images, caching",
    },
  ],
  cases: [
    {
      id: "nonprofit-lille",
      title: "Local Solidarity — Lille",
      tags: ["Accessibility", "SEO", "Donations"],
      description: "Clear accessible site to inform and facilitate donations.",
      url: "",
      kpis: [
        { label: "Lighthouse", value: "95+" },
        { label: "Organic traffic", value: "+40%" },
      ],
      sector: "Association",
      city: "Lille",
      formula: "Vitrine",
      duration: "2 weeks",
      quoteShort: "“Clearer and more accessible — more support.”",
      testimonialFull:
        "Accessibility was our priority. The site is clearer, more readable and better indexed: we reach more people.",
      review: { author: "Chairwoman", rating: 5, text: "Caring and thorough." },
    },
  ],
};