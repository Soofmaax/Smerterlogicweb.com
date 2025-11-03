export type StatItem = { value: string; label: string };

/**
 * Mode "début" — valeurs cibles/placeholder, sans revendication.
 * Remplacez par vos chiffres réels dès que possible.
 */
export const statsFR: StatItem[][] = [
  [
    { value: "24h", label: "Délai de 1ère réponse (objectif)" },
    { value: "—", label: "Avis Google à venir" },
  ],
  [
    { value: "100%", label: "Transparence & communication (engagement)" },
    { value: "—", label: "Résolution au 1er contact (en suivi)" },
    { value: "—", label: "Temps moyen de résolution (en suivi)" },
  ],
];

export const statsEN: StatItem[][] = [
  [
    { value: "24h", label: "1st response time (target)" },
    { value: "—", label: "Google reviews incoming" },
  ],
  [
    { value: "100%", label: "Transparency & communication (commitment)" },
    { value: "—", label: "1st contact resolution (tracking)" },
    { value: "—", label: "Average resolution time (tracking)" },
  ],
];