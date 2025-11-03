export type StatItem = { value: string; label: string };

export const statsFR: StatItem[][] = [
  [
    { value: "97%", label: "Appels traités en 15s (SLA interne de réponse)" },
    { value: "5.0", label: "Note Google moyenne" },
  ],
  [
    { value: "<1h", label: "Délai de 1ère réponse" },
    { value: "43%", label: "Résolutions au 1er contact" },
    { value: "6h", label: "Temps moyen de résolution" },
  ],
];

export const statsEN: StatItem[][] = [
  [
    { value: "97%", label: "Calls answered in 15s (internal SLA)" },
    { value: "5.0", label: "Google review rating" },
  ],
  [
    { value: "<1hr", label: "1st response time" },
    { value: "43%", label: "1st contact resolution" },
    { value: "6hrs", label: "Average resolution time" },
  ],
];