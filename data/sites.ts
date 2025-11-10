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
    status: "live",
    domain: "bmsventouse.fr",
    sector: "Logistique / Événementiel",
  },
];