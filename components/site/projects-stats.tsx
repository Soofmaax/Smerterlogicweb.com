"use client";

import * as React from "react";

function useCountUp(target: number, durationMs = 1500) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = prefersReduced ? 1 : 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return { ref, value };
}

export function ProjectsStats() {
  const s1 = useCountUp(6);
  const s2 = useCountUp(95);
  const s3 = useCountUp(100);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card label="Sites livrés" value={s1.value} suffix="" refEl={s1.ref} />
        <Card label="Perf. moyenne" value={s2.value} suffix="/100" refEl={s2.ref} />
        <Card label="Satisfaction" value={s3.value} suffix="%" refEl={s3.ref} />
      </div>
    </section>
  );
}

function Card({ label, value, suffix, refEl }: { label: string; value: number; suffix?: string; refEl: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="rounded-2xl border bg-card p-5 text-center">
      <div ref={refEl as any} className="font-heading text-4xl font-bold">{value}{suffix}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}