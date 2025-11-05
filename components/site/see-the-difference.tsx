"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MonitorSmartphone, Wrench, ShieldCheck, MousePointerClick, Timer, Smartphone } from "lucide-react";

export function SeeTheDifference() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [activeAnchor, setActiveAnchor] = React.useState<string>("demo-a");

  // prefers-reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Intersection Observer to reveal items (images/cards/blocks)
  React.useEffect(() => {
    if (!rootRef.current || prefersReduced) return;

    const rootEl = rootRef.current;
    const els = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-reveal]"));
    const imgs = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-reveal-image]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    [...els, ...imgs].forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [prefersReduced]);

  // Smooth anchor scroll + active indicator
  React.useEffect(() => {
    if (!rootRef.current) return;
    const rootEl = rootRef.current;
    const sections = ["demo-a", "demo-b", "demo-d"].map((id) =>
      rootEl.querySelector<HTMLElement>(`#${id}`)
    ).filter(Boolean) as HTMLElement[];

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest("a[data-anchor]") as HTMLAnchorElement | null;
      if (!a) return;
      e.preventDefault();
      const href = a.getAttribute("href") || "";
      const id = href.replace("#", "");
      const elIn = rootEl.querySelector<HTMLElement>(`#${id}`);
      const elDoc = document.getElementById(id);
      const el = elIn || elDoc;
      if (el) {
        el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      }
    };

    rootEl.addEventListener("click", onClick);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveAnchor(e.target.id);
          }
        });
      },
      { root: rootEl, rootMargin: "0px 0px -60% 0px", threshold: 0.2 }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      rootEl.removeEventListener("click", onClick);
      io.disconnect();
    };
  }, [prefersReduced]);

  return (
    <section ref={rootRef} className="mx-auto w-full max-w-5xl px-6 py-12 rounded-[28px] border bg-muted/40">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl" data-reveal>
          Votre Site Travaille Pour Vous
        </h2>
        <p className="mt-2 text-foreground/80" data-reveal>
          Votre site ne dort jamais : boutons qui incitent à l’action, images qui se chargent instantanément, navigation fluide sur mobile. Tout est pensé pour que vos visiteurs deviennent des clients.
        </p>
        <p className="mt-4 text-base font-semibold text-muted-foreground" data-reveal>
          Survolez, cliquez, testez : tout est interactif ci‑dessous.
        </p>
      </div>

      {/* Anchor mini-nav */}
      <div className="mt-6 flex justify-center">
        <nav className="relative inline-flex items-center gap-2 rounded-full border bg-card p-1 text-sm" aria-label="Navigation de démonstration" data-reveal>
          {[
            { id: "demo-a", label: "Boutons" },
            { id: "demo-b", label: "Images" },
            { id: "demo-d", label: "Navigation" },
          ].map((it) => (
            <Link
              key={it.id}
              href={`#${it.id}`}
              data-anchor
              className={`rounded-full px-3 py-1 transition-colors ${activeAnchor === it.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Demo A: Buttons */}
      <div id="demo-a" className="mt-10" data-reveal>
        <h3 className="font-heading text-xl font-semibold">Boutons qui Réagissent</h3>
        <p className="mt-2 text-sm text-foreground/80">
          Chaque bouton réagit instantanément quand vos visiteurs interagissent avec. Ces micro‑animations guident naturellement vers l’action sans être envahissantes.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {/* Elevation on hover */}
          <Button className="rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            Survol : le bouton se soulève
          </Button>
          {/* Color shift + slight scale */}
          <Button className="rounded-full bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-primary">
            Effet couleur au survol
          </Button>
          {/* Ripple (CTA variant) */}
          <Button variant="cta" className="rounded-full btn-ripple relative overflow-hidden">
            Animation au clic
          </Button>
        </div>
      </div>

      {/* Demo B: Images reveal */}
      <div id="demo-b" className="mt-10" data-reveal>
        <h3 className="font-heading text-xl font-semibold">Images qui Se Révèlent en Douceur</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-reveal-image
              className="reveal-image h-28 rounded-lg border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
              role="img"
              aria-label={`Image démo ${i}`}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-foreground/80">
          Vos photos de projets ou produits apparaissent progressivement quand le visiteur fait défiler la page. Cela rend la navigation plus agréable et accélère le chargement initial.
        </p>
      </div>

      {/* Demo D: Smooth anchor navigation */}
      <div id="demo-d" className="mt-10" data-reveal>
        <h3 className="font-heading text-xl font-semibold">Navigation Fluide Entre Sections</h3>
        <p className="mt-2 text-sm text-foreground/80">
          La navigation dans votre site est douce et naturelle. Pas de sauts brusques qui désorientent vos visiteurs.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <a href="#demo-a" data-anchor className="flex items-center justify-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <MousePointerClick className="h-4 w-4" /> Boutons
          </a>
          <a href="#demo-b" data-anchor className="flex items-center justify-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <MousePointerClick className="h-4 w-4" /> Images
          </a>
          <a href="#perf" data-anchor className="flex items-center justify-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:bg-accent">
            <MousePointerClick className="h-4 w-4" /> Performances
          </a>
        </div>
      </div>

      {/* Demo C: Performances mesurables */}
      <div id="perf" className="mt-10" data-reveal>
        <h3 className="font-heading text-xl font-semibold">Performances Mesurables</h3>
        <p className="mt-2 text-sm text-foreground/80">
          Des indicateurs concrets pour vérifier que votre site travaille pour vous.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <GaugeCard label="Score Lighthouse" value={92} unit="%" icon={<Timer className="h-4 w-4" />} />
          <CounterCard label="Pages vues / mois" value={2800} icon={<MonitorSmartphone className="h-4 w-4" />} />
          <CounterCard label="Conversions / mois" value={25} icon={<MousePointerClick className="h-4 w-4" />} />
        </div>
      </div>

      {/* Conclusion + CTA */}
      <div className="mt-10 text-center" data-reveal>
        <p className="mx-auto max-w-2xl text-foreground/90">
          Tous ces détails sont inclus dans chaque site que je crée. Votre site ne sera pas juste beau, il sera agréable à utiliser. Et c&apos;est exactement ce qui fait rester vos visiteurs et les transforme en clients.
        </p>
        <div className="mt-4">
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/contact">Discutons de votre projet</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-foreground">{icon}</span>
        <h4 className="font-heading text-lg font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-foreground/80">{children}</p>
    </div>
  );
}

/* Counters */
function useCountUp(target: number, durationMs = 2000, startWhenVisible = true) {
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
        const now = performance.now();
        const p = Math.min(1, (now - start) / durationMs);
        const eased = prefersReduced ? 1 : easeOutExpo(p);
        setValue(Math.round(target * eased));
        if (p < 1) {
          raf = requestAnimationFrame(loop);
        }
      };
      raf = requestAnimationFrame(loop);
    };

    if (!startWhenVisible) {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [target, durationMs, startWhenVisible]);

  return { ref, value };
}

function GaugeCard({ label, value, unit, icon }: { label: string; value: number; unit?: string; icon?: React.ReactNode }) {
  const { ref, value: v } = useCountUp(value, 2000);
  const size = 96;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(1, v / 100);
  const dash = circumference * progress;
  const rest = circumference - dash;

  return (
    <div ref={ref as any} className="flex flex-col items-center rounded-2xl border bg-card p-5">
      <div className="relative h-24 w-24">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="hsl(var(--foreground) / 0.15)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${rest}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-xl font-semibold">
          {v}{unit}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-center text-sm text-foreground/80">
        {icon} <span>{label}</span>
      </div>
    </div>
  );
}

function CounterCard({ label, value, unit, icon }: { label: string; value: number; unit?: string; icon?: React.ReactNode }) {
  const { ref, value: v } = useCountUp(value, 2000);
  return (
    <div ref={ref as any} className="flex flex-col items-center rounded-2xl border bg-card p-5">
      <div className="font-heading text-3xl font-bold">{v}{unit}</div>
      <div className="mt-2 flex items-center gap-2 text-center text-sm text-foreground/80">
        {icon} <span>{label}</span>
      </div>
    </div>
  );
}