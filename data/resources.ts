export type Resource = {
  slug: string;
  locale: "fr" | "en";
  title: string;
  summary?: string;
  pageHref: string;
  pdfHref: string;
};

export const RESOURCES: Resource[] = [
  {
    slug: "checklist-gmb",
    locale: "fr",
    title: "Checklist Google My Business — Local Pack en 2–8 semaines",
    summary:
      "Les actions prioritaires pour apparaître dans le Local Pack et capter des appels rapidement (profil complet, photos, avis, NAP, posts).",
    pageHref: "/ressources/checklist-gmb",
    pdfHref: "/api/pdf/checklist-gmb",
  },
  {
    slug: "gmb-checklist",
    locale: "en",
    title: "Google Business Profile Checklist — Local Pack in 2–8 weeks",
    summary:
      "High‑impact actions to reach the Local Pack fast: complete profile, photos, reviews, NAP, posts.",
    pageHref: "/en/resources/gmb-checklist",
    pdfHref: "/api/pdf/gmb-checklist",
  },
];