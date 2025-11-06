"use client";

import * as React from "react";
import { MessageSquare, Palette, Code, Rocket } from "lucide-react";

type Step = {
  id: string;
  title: string;
  duration: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const steps: Step[] = [
  {
    id: "etape-1",
    title: "Audit et stratégie",
    duration: "1–2 jours",
    desc:
      "Analyse besoins et concurrence, structure et objectifs clairs.",
    Icon: MessageSquare,
  },
  {
    id: "etape-2",
    title: "Plan de votre site",
    duration: "2–3 jours",
    desc:
      "Plan du site et pages selon votre charte et contenus.",
    Icon: Palette,
  },
  {
    id: "etape-3",
    title: "Développement",
    duration: "5–10 jours",
    desc:
      "Développement soigné, technologies performantes. Visible sur Google dès le départ.",
    Icon: Code,
  },
  {
    id: "etape-4",
    title: "Tests et mise en ligne",
    duration: "2–3 jours",
    desc:
      "Tests multi‑devices, optimisation, mise en ligne et mini‑formation.",
    Icon: Rocket,
  },
];

export function TimelineProcess() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.25 }
    );

    if (!prefersReduced) items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Processus de travail</h2>
        <p className="mt-2 text-foreground/70">
          Comment on travaille ensemble ? C&apos;est simple et sans surprise.
        </p>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="grid gap-6 md:hidden">
        {steps.map((s, idx) => (
          <article
            key={s.id}
            data-step
            className="relative rounded-2xl border bg-card p-5 transition-all"
          >
            {/* Connector line left */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-foreground/10" />
            {/* Dot */}
            <div
              className="absolute -left-1 top-6 h-3 w-3 rounded-full bg-foreground/30 transition-transform duration-500 ease-out"
            />
            <header className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground">
                <s.Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">{idx + 1}. {s.title}</h3>
                <div className="text-xs text-muted-foreground">{s.duration}</div>
              </div>
            </header>
            <p className="mt-3 text-sm text-foreground/80">{s.desc}</p>

            {/* Animate on in-view: emphasize dot and subtle glow */}
            <style jsx>{`
              [data-step].in-view > div.absolute.-left-1 {
                transform: scale(1.2);
                background-color: hsl(var(--primary));
              }
            `}</style>
          </article>
        ))}
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="relative hidden md:block">
        {/* Base line */}
        <div className="absolute left-0 right-0 top-[68px] h-1 rounded bg-foreground/10" />

        <div className="grid grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <article
              key={s.id}
              data-step
              className="relative rounded-2xl border bg-card p-5 transition-all"
            >
              {/* Connector fill segment */}
              <div
                className="pointer-events-none absolute left-0 top-[68px] h-1 w-0 rounded bg-primary transition-[width] duration-700 ease-out"
                style={{ width: "0" }}
              />
              {/* Dot */}
              <div className="absolute left-1/2 top-[60px] h-4 w-4 -translate-x-1/2 rounded-full bg-foreground/30 transition-transform duration-500 ease-out" />

              <header className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground">
                  <s.Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{idx + 1}. {s.title}</h3>
                  <div className="text-xs text-muted-foreground">{s.duration}</div>
                </div>
              </header>
              <p className="mt-3 text-sm text-foreground/80">{s.desc}</p>

              <style jsx>{`
                article[data-step].in-view > div.bg-primary {
                  width: 100%;
                }
                article[data-step].in-view > div.rounded-full {
                  transform: translateX(-50%) scale(1.15);
                  background-color: hsl(var(--primary));
                }
              `}</style>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}