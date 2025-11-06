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
  clientPhoto?: string; // new: real client photo placeholder
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
        "Avant: Aucune visibilité locale et zéro contact en ligne. Après: 3–4 demandes par semaine via Google grâce au nouveau site.",
      clientPhoto: "https://i.pravatar.cc/120?u=plomberie-lyon",
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
        "Avant: Site lent et infos clés introuvables sur mobile. Après: +25% de commandes et appels directs grâce au nouveau site.",
      clientPhoto: "https://i.pravatar.cc/120?u=boulangerie-paris",
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
        "Avant: Réalisations peu visibles et contact compliqué. Après: +30% de demandes de devis grâce au nouveau site.",
      clientPhoto: "https://i.pravatar.cc/120?u=menuiserie-nantes",
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
        "Avant: Contenu non valorisé et référencement faible. Après: 8+ mots‑clés en top 3 et 5–7 demandes/semaine grâce au nouveau site.",
      clientPhoto: "https://i.pravatar.cc/120?u=electricien-bordeaux",
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
        "Avant: Menu peu lisible sur mobile et peu d’appels. Après: +40% d’appels par semaine grâce au nouveau site.",
      clientPhoto: "https://i.pravatar.cc/120?u=restaurant-nice",
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
        "Avant: Site peu accessible et messages peu clairs. Après: +40% de trafic organique et meilleure lisibilité grâce au nouveau site.",
      clientPhoto: "https://i.pravatar.cc/120?u=asso-lille",
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
        "Before: Low accessibility and unclear messaging. After: +40% organic traffic and clearer UX thanks to the new website.",
      clientPhoto: "https://i.pravatar.cc/120?u=nonprofit-lille",
      review: { author: "Chairwoman", rating: 5, text: "Caring and thorough." },
    },
  ],
};