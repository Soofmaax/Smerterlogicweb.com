export type AssociationItem = {
  id: string;
  name: string;
  mission: string;
  helpType: "Site offert" | "Tarif solidaire";
  url?: string;
  logo?: string;
  quote?: string;
};

export const associationsFR: AssociationItem[] = [
  {
    id: "asso-lille",
    name: "Association Solidarité Locale — Lille",
    mission: "Soutien et aide aux publics en difficulté, information et collecte locale.",
    helpType: "Site offert",
    url: "https://exemple.org",
    logo: "",
    quote: "Plus lisible, plus accessible — plus de soutien.",
  },
  {
    id: "asso-marseille",
    name: "Cultures Partagées — Marseille",
    mission: "Accès à la culture pour tous: ateliers, médiation et événements gratuits.",
    helpType: "Tarif solidaire",
    url: "https://exemple.org",
    logo: "",
    quote: "Un site clair qui facilite l’inscription à nos ateliers.",
  },
  {
    id: "asso-bordeaux",
    name: "Main Verte — Bordeaux",
    mission: "Jardins partagés et sensibilisation à l’écologie urbaine.",
    helpType: "Site offert",
    url: "https://exemple.org",
    logo: "",
    quote: "Un vrai gain de visibilité pour trouver des bénévoles.",
  },
];