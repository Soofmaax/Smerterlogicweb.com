export type SiteEntry = {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
  img?: string;
  status: "live" | "soon" | "demo";
  domain?: string;
  sector?: string;
};

export const sitesFR: SiteEntry[] = [
  {
    id: "bmsventouse-fr",
    title: "BMS Ventousage",
    subtitle: "Logistique cinéma & événementiel",
    href: "https://bmsventouse.fr",
    img: "/images/projects/bmsventouse-hero-800.webp",
    status: "live",
    domain: "bmsventouse.fr",
    sector: "Logistique / Événementiel",
  },
];