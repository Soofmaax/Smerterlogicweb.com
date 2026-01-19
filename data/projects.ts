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
      id: "bms-ventousage",
      title: "BMS Ventousage — Logistique cinéma & événementiel",
      tags: ["Next.js", "Statique", "SEO", "Performance", "Formulaires"],
      description:
        "Site statique professionnel mettant en avant les prestations de ventousage pour tournages et événements, avec formulaires de contact et informations claires.",
      url: "https://bmsventouse.fr",
      kpis: [
        { label: "Type de site", value: "Vitrine B2B local" },
        { label: "Secteur", value: "Logistique cinéma & événementiel" },
        { label: "Objectif", value: "Visibilité locale et demandes qualifiées" },
      ],
      sector: "Artisans & TPE",
      city: "Île‑de‑France",
      duration: "3–4 semaines",
      images: [
        "https://bmsventouse.fr/images/hero-background-custom.jpg",
        "https://bmsventouse.fr/images/hero-background-custom.jpg",
      ],
    },
    {
      id: "mb-fretservices",
      title: "MB Fret Services — Transitaire Europe–Afrique",
      tags: ["Statique", "SEO", "Performance"],
      description:
        "Site vitrine pour un transitaire spécialisé sur les corridors France–Congo et France–Angola : fret maritime conteneurs, déménagements internationaux, envoi de véhicules et flux B2B.",
      url: "https://mb-fretservices.com",
      kpis: [
        { label: "Type de site", value: "Vitrine B2B international" },
        { label: "Secteur", value: "Transport & logistique" },
      ],
      sector: "Artisans & TPE",
      city: "France / Afrique centrale",
      duration: "3–5 semaines",
      images: [
        "https://mb-fretservices.com/images/hero-maritime.jpg",
        "https://mb-fretservices.com/images/hero-maritime.jpg",
      ],
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
  cases: [],
};