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
];