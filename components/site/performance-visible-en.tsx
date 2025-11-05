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

export function PerformanceVisibleEN() {
  return (
    <section id="perf" className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Visible Performance</h2>
        <p className="mt-2 text-foreground/70">These numbers aren’t just technical. A fast site keeps visitors and improves your visibility on Google.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <GaugeCard label="Performance Score" value={95} unit="/100" />
        <CounterCard label="Max Loading Time" value={2} unit="s" icon={<Timer className="h-5 w-5 text-foreground/70" />} />
        <CounterCard label="Mobile Friendly" value={100} unit="%" icon={<Smartphone className="h-5 w-5 text-foreground/70" />} />
      </div>
    </section>
  );
}

function GaugeCard({ label, value, unit }: { label: string; value: number; unit?: string }) {
  const { ref, value: v } = useCountUp(value, 2000);
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(1, v / 100);
  const dash = circumference * progress;
  const rest = circumference - dash;

  return (
    <div ref={ref as any} className="flex flex-col items-center rounded-2xl border bg-card p-6">
      <div className="relative h-28 w-28 text-amber-500">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="hsl(var(--foreground) / 0.15)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${rest}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-4xl font-bold">
          {v}{unit}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-center text-sm text-foreground/80">
        <ShieldCheck className="h-5 w-5 text-foreground/70" />
        <span>{label}</span>
      </div>
    </div>
  );
}

function CounterCard({ label, value, unit, icon }: { label: string; value: number; unit?: string; icon?: React.ReactNode }) {
  const { ref, value: v } = useCountUp(value, 2000);
  return (
    <div ref={ref as any} className="flex flex-col items-center rounded-2xl border bg-card p-6">
      <div className="font-heading text-4xl font-bold">{v}{unit}</div>
      <div className="mt-2 flex items-center gap-2 text-center text-sm text-foreground/80">
        {icon} <span>{label}</span>
      </div>
    </div>
  );
}