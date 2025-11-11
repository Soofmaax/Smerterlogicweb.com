export type LocalCity = {
  slug: string; // URL segment: niort, montauban, chateauroux, etc.
  name: string; // Display name with accents
  departmentCode: string; // ex: 79
  populationAgglo: string; // ex: "~130 000"
  competition: "Très Faible" | "Faible" | "Faible/Modérée" | "Modérée";
  sectors: string[]; // key local sectors
  satellites: string[]; // nearby towns/zones
  cci?: string; // local CCI label
  notes?: string; // optional context
};

export const LOCAL_CITIES: LocalCity[] = [
  {
    slug: "niort",
    name: "Niort",
    departmentCode: "79",
    populationAgglo: "~130 000",
    competition: "Faible/Modérée",
    sectors: ["Mutuelles & Assurances", "Fintech", "Tertiaire"],
    satellites: ["Parthenay", "Thouars"],
    cci: "CCI Deux-Sèvres",
    notes: "Capitale des mutuelles : MAAF, MAIF, Groupama.",
  },
  {
    slug: "montauban",
    name: "Montauban",
    departmentCode: "82",
    populationAgglo: "~110 000",
    competition: "Faible",
    sectors: ["Agroalimentaire", "Aéronautique", "Logistique"],
    satellites: ["Moissac", "Castelsarrasin"],
    cci: "CCI Tarn-et-Garonne",
  },
  {
    slug: "chateauroux",
    name: "Châteauroux",
    departmentCode: "36",
    populationAgglo: "~80 000",
    competition: "Faible",
    sectors: ["Défense & Aéronautique", "Logistique", "Textile"],
    satellites: ["Issoudun", "Le Blanc"],
    cci: "CCI Indre",
    notes: "Base aérienne, pôle Aerospace.",
  },
  {
    slug: "montlucon",
    name: "Montluçon",
    departmentCode: "03",
    populationAgglo: "~70 000",
    competition: "Très Faible",
    sectors: ["Industrie Mécanique & Métallurgie", "Numérique", "Santé"],
    satellites: ["Commentry", "Désertines"],
    notes: "Ville en reconversion, forte opportunité SEO.",
  },
  {
    slug: "ales",
    name: "Alès",
    departmentCode: "30",
    populationAgglo: "~100 000",
    competition: "Faible",
    sectors: ["Mines & Énergie", "Tourisme Vert (Cévennes)", "Agroalimentaire"],
    satellites: ["Saint-Christol-lès-Alès", "La Grand-Combe"],
    notes: "Pôle technologique.",
  },
  {
    slug: "saint-die-des-vosges",
    name: "Saint-Dié-des-Vosges",
    departmentCode: "88",
    populationAgglo: "~40 000",
    competition: "Très Faible",
    sectors: ["Bois & Forêt", "Textile", "Numérique"],
    satellites: ["Fraize", "Raon-l'Étape"],
    notes: "Festival International de Géographie.",
  },
  {
    slug: "charleville-mezieres",
    name: "Charleville-Mézières",
    departmentCode: "08",
    populationAgglo: "~120 000",
    competition: "Faible",
    sectors: ["Métallurgie & Automobile", "Logistique", "Culture"],
    satellites: ["Sedan", "Rethel"],
    cci: "CCI Ardennes",
    notes: "Festival mondial des marionnettes.",
  },
  {
    slug: "vannes",
    name: "Vannes",
    departmentCode: "56",
    populationAgglo: "~150 000",
    competition: "Modérée",
    sectors: ["Nautisme & Tourisme", "Agroalimentaire", "Cyber"],
    satellites: ["Auray", "Sarzeau"],
    notes: "Golfe du Morbihan, pôle cyber.",
  },
  {
    slug: "cholet",
    name: "Cholet",
    departmentCode: "49",
    populationAgglo: "~100 000",
    competition: "Faible",
    sectors: ["Textile & Mode", "Mécanique", "Agroalimentaire"],
    satellites: ["Maulévrier", "Mortagne-sur-Sèvre"],
    cci: "CCI Maine-et-Loire",
  },
  {
    slug: "thionville",
    name: "Thionville",
    departmentCode: "57",
    populationAgglo: "~70 000",
    competition: "Faible",
    sectors: ["Transfrontalier (Luxembourg)", "Logistique", "Métallurgie"],
    satellites: ["Yutz", "Terville"],
    notes: "Ancien bassin sidérurgique.",
  },
];

export function getLocalCityBySlug(slug: string): LocalCity | undefined {
  return LOCAL_CITIES.find((c) => c.slug === slug);
}

export function getAllLocalCitySlugs(): string[] {
  return LOCAL_CITIES.map((c) => c.slug);
}