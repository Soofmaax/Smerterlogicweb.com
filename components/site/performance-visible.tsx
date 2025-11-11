"use client";

import * as React from "react";
import { ShieldCheck, Timer, Smartphone } from "lucide-react";

function useCountUp(target: number, durationMs = 2000) {
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
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const run = () => {
      const start = performance.now();
      const loop = () => {
        const p = Math.min(1, (performance.now() - start) / durationMs);
        const eased = prefersReduced ? 1 : easeOutExpo(p);
        setValue(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && !started.current) { started.current = true; run(); } }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [target, durationMs]);

  return { ref, value };
}

export function PerformanceVisible() {
  return (
    <section id="perf" className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Performances Visibles</h2>
        <p className="mt-2 text-foreground/70">Ces chiffres ne sont pas juste techniques. Un site rapide retient vos visiteurs et améliore votre visibilité sur Google.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BarCard label="Score de Performance" value={95} unit="/100" />
        <CounterCard label="Secondes de Chargement Maximum" value={2} unit="s" icon={<Timer className="h-5 w-5 text-foreground/70" />} />
        <CounterCard label="Compatible Mobile" value={100} unit="%" icon={<Smartphone className="h-5 w-5 text-foreground/70" />} />
      </div>

      <p className="mt-4 text-sm text-foreground/80 text-center">
        Ces chiffres ne sont pas juste techniques. Un site rapide retient vos visiteurs et améliore votre visibilité sur Google.
      </p>
    </section>
  );
}

function BarCard({ label, value, unit }: { label: string; value: number; unit?: string }) {
  const { ref, value: v } = useCountUp(value, 1200);
  return (
    <div ref={ref as any} className="flex flex-col items-center rounded-2xl border bg-card p-6">
      <div className="font-heading text-5xl font-extrabold">{v}{unit}</div>
      <div className="mt-3 w-full rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-amber-500 transition-[width] duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, v))}%` }}
        />
      </div>
      <div className="mt-2 flex items-center gap-2 text-center text-sm text-foreground/80">
        <ShieldCheck className="h-5 w-5 text-foreground/70" />
        <span>{label}</span>
      </div>
    </div>
  );
}

function CounterCard({ label, value, unit, icon }: { label: string; value: number; unit?: string; icon?: React.ReactNode }) {
  const { ref, value: v } = useCountUp(value, 1500);
  return (
    <div ref={ref as any} className="flex flex-col items-center rounded-2xl border bg-card p-6">
      <div className="font-heading text-4xl font-bold">{v}{unit}</div>
      <div className="mt-2 flex items-center gap-2 text-center text-sm text-foreground/80">
        {icon} <span>{label}</span>
      </div>
    </div>
  );
}