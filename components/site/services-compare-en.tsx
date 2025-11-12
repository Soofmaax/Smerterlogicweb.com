"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";

type Cell = { type: "text"; value: string } | { type: "check"; value: boolean };

const headers = ["Features", "Essential", "Professional", "Premium"];

const rows: { label: string; cells: Cell[] }[] = [
  {
    label: "Price incl. VAT",
    cells: [{ type: "text", value: "€1,490" }, { type: "text", value: "€2,490" }, { type: "text", value: "€4,990" }],
  },
  {
    label: "Pages",
    cells: [{ type: "text", value: "3–5" }, { type: "text", value: "5–8" }, { type: "text", value: "10–15 or multilingual" }],
  },
  {
    label: "Design",
    cells: [{ type: "text", value: "Tailored template" }, { type: "text", value: "100% bespoke" }, { type: "text", value: "Premium + animations" }],
  },
  {
    label: "Copywriting",
    cells: [{ type: "text", value: "Guided (you write)" }, { type: "text", value: "✅ Included (complete)" }, { type: "text", value: "✅ Long‑form + blog" }],
  },
  {
    label: "SEO",
    cells: [{ type: "text", value: "Basic technical SEO" }, { type: "text", value: "✅ Advanced" }, { type: "text", value: "✅ Complete 6‑month strategy" }],
  },
  {
    label: "Integrations",
    cells: [{ type: "text", value: "Basic" }, { type: "text", value: "Analytics + Calendly" }, { type: "text", value: "CRM + advanced APIs" }],
  },
  {
    label: "Delivery",
    cells: [{ type: "text", value: "Turn‑key" }, { type: "text", value: "Turn‑key + video tutorial" }, { type: "text", value: "30‑min performance review" }],
  },
  {
    label: "Support",
    cells: [{ type: "text", value: "1 month" }, { type: "text", value: "3 months priority" }, { type: "text", value: "6 months + phone" }],
  },
  {
    label: "Evolution plan",
    cells: [{ type: "text", value: "Optional €20/mo" }, { type: "text", value: "Optional €20/mo" }, { type: "text", value: "✅ 6 months included" }],
  },
  {
    label: "Delivery timeline",
    cells: [{ type: "text", value: "2–3 weeks" }, { type: "text", value: "4–6 weeks" }, { type: "text", value: "8–12 weeks" }],
  },
  {
    label: "Technical maintenance",
    cells: [{ type: "text", value: "❌ Not required" }, { type: "text", value: "❌ Not required" }, { type: "text", value: "❌ Not required" }],
  },
];

export function ServicesCompareEN() {
  const [hoverCol, setHoverCol] = React.useState<number | null>(null);
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Plan comparison</h2>
        <p className="mt-2 text-foreground/70">A quick overview to help you decide.</p>
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
      <p className="mt-3 text-xs text-muted-foreground">Timelines are indicative and may vary based on complexity.</p>
    </section>
  );
}