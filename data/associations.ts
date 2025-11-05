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
    url: "",
    logo: "",
    quote: "Plus lisible, plus accessible — plus de soutien.",
  },
];