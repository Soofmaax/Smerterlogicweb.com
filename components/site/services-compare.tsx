"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";

type Cell = { type: "text"; value: string } | { type: "check"; value: boolean };

const headers = ["Caractéristiques", "Vitrine", "Business", "Premium"];

const rows: { label: string; cells: Cell[] }[] = [
  {
    label: "Nombre de pages",
    cells: [
      { type: "text", value: "3–5" },
      { type: "text", value: "5–10" },
      { type: "text", value: "Illimitées" },
    ],
  },
  {
    label: "Galerie photos",
    cells: [
      { type: "text", value: "Basique" },
      { type: "text", value: "Optimisée illimitée" },
      { type: "text", value: "Optimisée illimitée" },
    ],
  },
  {
    label: "Blog",
    cells: [
      { type: "check", value: false },
      { type: "check", value: true },
      { type: "check", value: true },
    ],
  },
  {
    label: "Optimisation Google",
    cells: [
      { type: "text", value: "Base" },
      { type: "text", value: "Avancée" },
      { type: "text", value: "Avancée +" },
    ],
  },
  {
    label: "Intégrations avancées",
    cells: [
      { type: "check", value: false },
      { type: "check", value: false },
      { type: "check", value: true },
    ],
  },
  {
    label: "Support inclus",
    cells: [
      { type: "text", value: "1 mois" },
      { type: "text", value: "3 mois prioritaire" },
      { type: "text", value: "3 mois + maintenance incluse" },
    ],
  },
  {
    label: "Délai de livraison",
    cells: [
      { type: "text", value: "2–3 semaines" },
      { type: "text", value: "3–5 semaines" },
      { type: "text", value: "4–8 semaines" },
    ],
  },
];

export function ServicesCompare() {
  const [hoverCol, setHoverCol] = React.useState<number | null>(null);
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Comparatif des formules</h2>
        <p className="mt-2 text-foreground/70">Un aperçu rapide pour vous aider à choisir.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full border-separate border-spacing-0 rounded-2xl border bg-card">
          <thead>
            <tr>
              {headers.map((h, idx) => (
                <th
                  key={h}
                  className={`sticky top-0 z-[1] bg-card px-4 py-3 text-left text-sm font-semibold first:rounded-tl-2xl last:rounded-tr-2xl ${
                    idx === 0 ? "w-56" : "w-44"
                  } ${hoverCol === idx ? "bg-primary/5" : ""}`}
                  onMouseEnter={() => setHoverCol(idx)}
                  onMouseLeave={() => setHoverCol(null)}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <Reveal as="tr" key={r.label} className="row-check reveal-fade-up">
                <td className="border-t px-4 py-3 text-sm text-foreground/80">{r.label}</td>
                {r.cells.map((c, ci) => (
                  <td
                    key={`${r.label}-${ci}`}
                    className={`border-t px-4 py-3 text-center text-sm ${hoverCol === ci + 1 ? "bg-primary/5" : ""}`}
                    onMouseEnter={() => setHoverCol(ci + 1)}
                    onMouseLeave={() => setHoverCol(null)}
                  >
                    {c.type === "text" ? (
                      <span className="text-foreground/80">{c.value}</span>
                    ) : c.value ? (
                      <span className="check-appear inline-block text-green-600">✓</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                ))}
              </Reveal>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Les délais sont indicatifs et peuvent varier selon la complexité.</p>
    </section>
  );
}