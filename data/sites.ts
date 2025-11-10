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
  {
    id: "rcp-multiservice-com",
    title: "RCP Multiservice",
    subtitle: "Prestations de service à domicile",
    status: "soon",
    domain: "rcp-multiservice.com",
    sector: "Services à domicile",
  },
  {
    id: "mb-fretservices-com",
    title: "MB Fret Services",
    subtitle: "Fret maritime",
    status: "soon",
    domain: "mb-fretservices.com",
    sector: "Transport maritime",
  },
  {
    id: "bm-valocation-com",
    title: "BM VaLocation",
    subtitle: "Vente, rachat et location de voiture",
    status: "soon",
    domain: "bm-valocation.com",
    sector: "Automobile",
  },
  
  
];