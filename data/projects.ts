export type ShowcaseItem = {
  title: string;
  subtitle: string;
};

export type KPI = { label: string; value: string };

export type CaseItem = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  url?: string;
  kpis?: KPI[];
  images?: string[]; // supply real URLs later if available
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
      id: "refonte-associatif",
      title: "Refonte site associatif",
      tags: ["Next.js", "Accessibilité", "SEO"],
      description:
        "Navigation clarifiée, contraste renforcé, score Lighthouse 95+. Trafic organique +40%.",
      url: "",
      kpis: [
        { label: "Lighthouse", value: "95+" },
        { label: "Trafic organique", value: "+40%" },
      ],
      images: [],
    },
    {
      id: "site-vitrine-artisan",
      title: "Site vitrine artisan",
      tags: ["Next.js", "Tailwind", "Formulaire"],
      description:
        "Identité sobre, devis simplifié, génération de leads +30% en 2 mois.",
      url: "",
      kpis: [
        { label: "Leads", value: "+30%" },
        { label: "Délai", value: "2 mois" },
      ],
      images: [],
    },
    {
      id: "optimisation-performance",
      title: "Optimisation performance",
      tags: ["Audit", "Web Vitals", "CDN"],
      description:
        "Chargement initial −50%, CLS maîtrisé, perception de rapidité accrue.",
      url: "",
      kpis: [
        { label: "First load", value: "−50%" },
        { label: "CLS", value: "Stable" },
      ],
      images: [],
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
      id: "refonte-associatif",
      title: "Nonprofit redesign",
      tags: ["Next.js", "Accessibility", "SEO"],
      description:
        "Clearer navigation, stronger contrast, Lighthouse 95+. +40% organic traffic.",
      url: "",
      kpis: [
        { label: "Lighthouse", value: "95+" },
        { label: "Organic traffic", value: "+40%" },
      ],
      images: [],
    },
    {
      id: "site-vitrine-artisan",
      title: "Artisan showcase site",
      tags: ["Next.js", "Tailwind", "Form"],
      description:
        "Sober identity, simplified quotes, +30% lead gen in 2 months.",
      url: "",
      kpis: [
        { label: "Leads", value: "+30%" },
        { label: "Timeline", value: "2 months" },
      ],
      images: [],
    },
    {
      id: "optimisation-performance",
      title: "Performance optimisation",
      tags: ["Audit", "Web Vitals", "CDN"],
      description:
        "−50% initial load, stable CLS, faster perceived speed.",
      url: "",
      kpis: [
        { label: "First load", value: "−50%" },
        { label: "CLS", value: "Stable" },
      ],
      images: [],
    },
  ],
};