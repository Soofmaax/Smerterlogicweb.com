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
    img: "https://bmsventouse.fr/images/hero-background-custom.jpg",
  },
  {
    id: "mb-fretservices-fr",
    title: "MB Fret Services",
    subtitle: "Transitaire Europe–Afrique (Congo, Angola)",
    href: "https://mb-fretservices.com",
    status: "live",
    domain: "mb-fretservices.com",
    sector: "Transport & Logistique",
    img: "https://mb-fretservices.com/images/hero-maritime.jpg",
  },
];