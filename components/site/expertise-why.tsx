"use client";

import * as React from "react";
import { CheckCircle2, Target, Users, Award } from "lucide-react";

function useCountUp(target: number, durationMs = 1800) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const run = () => {
      const start = performance.now();
      const loop = () => {
        const p = Math.min(1, (performance.now() - start) / durationMs);
        const eased = prefersReduced ? 1 : ease(p);
        setValue(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [target, durationMs]);

  return { ref, value };
}

export function ExpertiseWhy() {
  const counters = [
    { label: "Score PageSpeed", end: 95, unit: "/100" },
    { label: "Sites livrés", end: 20, unit: "+" },
    { label: "Réponse en", end: 24, unit: "h" },
    { label: "Satisfaction", end: 98, unit: "%" },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Ce Que Vous Gagnez</h2>
        <p className="mt-2 text-foreground/70">Des bénéfices concrets pour votre activité locale.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Block
          icon={<CheckCircle2 className="h-5 w-5" />}
          title="Performance technique"
          desc="Sites ultra-rapides qui apparaissent en premier sur Google. Vos clients trouvent votre entreprise facilement."
          counter={counters[0]}
        />
        <Block
          icon={<Users className="h-5 w-5" />}
          title="Artisans &amp; PME"
          desc="Focalisé sur les besoins des entreprises locales et la génération de contacts."
          counter={counters[1]}
        />
        <Block
          icon={<Target className="h-5 w-5" />}
          title="Transparence totale"
          desc="Tarifs clairs, propriété du code, sans dépendances propriétaires."
          counter={counters[2]}
        />
        <Block
          icon={<Award className="h-5 w-5" />}
          title="Accompagnement complet"
          desc="Formation fournie, support réactif, conseils stratégiques."
          counter={counters[3]}
        />
      </div>
    </section>
  );
}

function Block({
  icon,
  title,
  desc,
  counter,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  counter: { label: string; end: number; unit?: string };
}) {
  const { ref, value } = useCountUp(counter.end, 1500);
  return (
    <div className="rounded-[20px] border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg card-elevated">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">{icon}</span>
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-foreground/80">{desc}</p>
      <div ref={ref as any} className="mt-4">
        <div className="font-heading text-2xl font-bold">
          {value}
          {counter.unit}
        </div>
        <div className="text-xs text-muted-foreground">{counter.label}</div>
      </div>
    </div>
  );
}