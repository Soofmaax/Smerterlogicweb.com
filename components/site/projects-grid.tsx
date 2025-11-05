"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/site/modal";
import { Carousel } from "@/components/site/carousel";
import { Reveal } from "@/components/site/reveal";
import type { CaseItem } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | "artisans" | "associations";

export function ProjectsGrid({ items }: { items: CaseItem[] }) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [animState, setAnimState] = React.useState<"idle" | "out" | "in">("idle");
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [liked, setLiked] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const onVoice = (e: Event) => {
      const ce = e as CustomEvent&lt;{ filter?: Filter }&gt;;
      const f = ce.detail?.filter;
      if (f === "artisans" || f === "associations" || f === "all") {
        if (f === filter) return;
        setAnimState("out");
        setTimeout(() => {
          setFilter(f);
          setAnimState("in");
          setTimeout(() => setAnimState("idle"), 220);
        }, 180);
      }
    };
    window.addEventListener("voice-filter", onVoice as EventListener);
    return () => window.removeEventListener("voice-filter", onVoice as EventListener);
  }, [filter]);

  // persistent likes
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("liked_projects");
      if (raw) setLiked(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);
  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("liked_projects", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filtered = React.useMemo(() => {
    if (filter === "all") return items;
    if (filter === "artisans") return items.filter((i) => i.sector === "Artisans & TPE");
    return items.filter((i) => i.sector === "Association");
  }, [items, filter]);

  const counts = React.useMemo(() => {
    const a = items.filter((i) => i.sector === "Artisans & TPE").length;
    const s = items.filter((i) => i.sector === "Association").length;
    return { all: items.length, artisans: a, associations: s };
  }, [items]);

  const applyFilter = React.useCallback((f: Filter) => {
    if (f === filter) return;
    setAnimState("out");
    setTimeout(() => {
      setFilter(f);
      setAnimState("in");
      setTimeout(() => setAnimState("idle"), 220);
    }, 180);
  }, [filter]);

  return (
    <section className="mx-auto w-full max-w-6xl px-0">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <FilterButton active={filter === "all"} onClick={() => applyFilter("all")}>
          Tous ({counts.all})
        </FilterButton>
        <FilterButton active={filter === "artisans"} onClick={() => applyFilter("artisans")}>
          Artisans & TPE ({counts.artisans})
        </FilterButton>
        <FilterButton active={filter === "associations"} onClick={() => applyFilter("associations")}>
          Associations ({counts.associations})
        </FilterButton>
      </div>

      {/* Grid */}
      <div className={cn("grid-filter-anim mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", animState !== "idle" && animState)}>
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} p={p} liked={!!liked[p.id]} onLike={() => toggleLike(p.id)} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      <ProjectModal
        item={openIndex != null ? filtered[openIndex] : null}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition",
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/80 hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}

function ProjectCard({ p, liked, onLike, onOpen }: { p: CaseItem; liked: boolean; onLike: () => void; onOpen: () => void }) {
  const desktop = p.images?.[0] || "";
  const mobile = p.images?.[1] || "";
  const sectorBadge =
    p.sector === "Association"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300"
      : "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300";

  const topKpi = p.kpis && p.kpis.length ? p.kpis[0] : null;

  const onDouble = () => {
    onLike();
  };

  return (
    <article
      className={cn(
        "project-card relative rounded-[20px] border bg-card p-4 card-elevated pricing-animated offer-lift",
        liked && "ring-2 ring-amber-400"
      )}
      onDoubleClick={onDouble}
    >
      {/* Mockups */}
      <div className="relative rounded-lg border bg-background p-3">
        {/* Result badge overlay */}
        {topKpi ? (
          <div className="absolute left-3 top-3 z-10 rounded-full border bg-card/80 px-2.5 py-1 text-xs shadow-sm backdrop-blur">
            <span className="font-semibold">{topKpi.value}</span>{" "}
            <span className="text-muted-foreground">{topKpi.label}</span>
          </div>
        ) : null}

        {/* Like icon */}
        <button
          type="button"
          onClick={onLike}
          aria-pressed={liked}
          aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
          className={cn(
            "absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-card/80 shadow-sm backdrop-blur transition",
            liked ? "text-amber-600" : "text-muted-foreground hover:bg-accent"
          )}
        >
          {liked ? "❤️" : "🤍"}
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md zoomable">
          {desktop ? (
            <Image
              src={desktop}
              alt={`${p.title} desktop`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="img-blur"
              onLoadingComplete={(img) => img.classList.add("loaded")}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
          )}
        </div>
        <div className="absolute bottom-3 right-3 w-24 overflow-hidden rounded-md border shadow-sm sm:w-28">
          <div className="relative aspect-[9/16] w-full zoomable">
            {mobile ? (
              <Image
                src={mobile}
                alt={`${p.title} mobile`}
                fill
                sizes="112px"
                className="img-blur"
                onLoadingComplete={(img) => img.classList.add("loaded")}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
            )}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {p.sector ? (
          <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1", sectorBadge)}>
            {p.sector}
          </span>
        ) : null}
        {p.formula ? <Badge variant="secondary">{p.formula}</Badge> : null}
        {p.city ? <Badge variant="outline">{p.city}</Badge> : null}
      </div>

      <h3 className="mt-2 font-heading text-lg font-semibold">{p.title}</h3>
      <p className="mt-1 text-sm text-foreground/80">{p.description}</p>

      {p.kpis && p.kpis.length ? (
        <ul className="mt-2 grid grid-cols-2 gap-2">
          {p.kpis.slice(0, 3).map((k, i) => (
            <li key={i} className="rounded-md border bg-muted/40 p-2 text-center">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="text-sm font-semibold">{k.value}</div>
            </li>
          ))}
        </ul>
      ) : null}

      {p.quoteShort ? <p className="mt-2 text-sm italic text-foreground/70">“{p.quoteShort.replace(/(^“|”$)/g, "")}”</p> : null}

      <div className="mt-3">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center rounded-full border bg-card px-3 py-1.5 text-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          Voir le projet
        </button>
      </div>
    </article>
  );
}

function Stars({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className="stars inline-block align-middle" aria-label={`${rating.toFixed(1)} sur 5`}>
      <span className="stars-base">★★★★★</span>
      <span className="stars-top" style={{ ["--w" as any]: `${pct}%` }}>★★★★★</span>
    </span>
  );
}

function ProjectModal({ item, onClose }: { item: CaseItem | null; onClose: () => void }) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const parallaxRef = React.useRef<HTMLDivElement | null>(null);

  // simple parallax inside modal scroll
  React.useEffect(() => {
    const el = scrollRef.current;
    const target = parallaxRef.current;
    if (!el || !target) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = el.scrollTop || 0;
        const t = Math.min(40, y * 0.08);
        target.style.transform = `translateY(${t}px)`;
        raf = 0;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [item]);

  if (!item) return null;

  const galleryItems = (item.images || []).map((src, i) => (
    <div key={i} className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
      <Image
        src={src}
        alt={`${item.title} screenshot ${i + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, 100vw"
        className="img-blur"
        onLoadingComplete={(img) => img.classList.add("loaded")}
        style={{ objectFit: "cover" }}
      />
    </div>
  ));
  if (galleryItems.length === 0) {
    galleryItems.push(
      <div key="ph" className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
    );
  }

  return (
    <Modal open={!!item} onClose={onClose} ariaLabel={`Projet ${item.title}`}>
      <div ref={scrollRef} className="max-h-[75vh] overflow-auto p-1">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
              {item.formula ? <Badge variant="secondary">{item.formula}</Badge> : null}
              {item.sector ? <Badge variant="outline">{item.sector}</Badge> : null}
            </div>
          </div>
          <div className="flex gap-2">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
              >
                Voir le site
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
            >
              Fermer
            </button>
          </div>
        </header>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div ref={parallaxRef}>{galleryItems[0]}</div>
          <div className="space-y-3 text-sm text-foreground/80">
            <Section title="Le contexte">
              <p>{item.description}</p>
            </Section>
            <Section title="La solution">
              <ul className="list-disc pl-5">
                <li>Design sobre et clair (mobile‑first)</li>
                <li>Pages adaptées au secteur</li>
                <li>SEO on‑page et performance</li>
              </ul>
            </Section>
            <Section title="Les résultats">
              <ul className="list-disc pl-5">
                {item.kpis?.map((k, i) => (
                  <li key={i}>
                    <span className="font-medium">{k.label}</span>: {k.value}
                  </li>
                )) || <li>Résultats à venir</li>}
              </ul>
            </Section>
          </div>
        </div>

        {/* More gallery */}
        {galleryItems.length > 1 ? (
          <div className="mt-4">
            <Carousel items={galleryItems} ariaLabel="Galerie projet" autoplay intervalMs={5000} />
          </div>
        ) : null}

        {/* Testimonial + Google review style */}
        {(item.testimonialFull || item.review) && (
          <div className="mt-4 rounded-xl border bg-card p-4">
            {item.testimonialFull ? <p className="text-foreground/80">“{item.testimonialFull}”</p> : null}
            {item.review ? (
              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  Avis vérifié Google
                </span>
                <span className="font-medium">{item.review.author}</span>
                <Stars rating={item.review.rating} />
              </div>
            ) : null}
          </div>
        )}

        {/* Specs */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-muted/40 p-3 text-center">
            <div className="text-xs text-muted-foreground">Performance</div>
            <div className="mt-1 text-lg font-semibold">{item.kpis?.find(k => /performance/i.test(k.label))?.value || "95/100"}</div>
          </div>
          <div className="rounded-md border bg-muted/40 p-3 text-center">
            <div className="text-xs text-muted-foreground">Technologies</div>
            <div className="mt-1 text-sm">{item.tags.slice(0,2).join(", ")}</div>
          </div>
          <div className="rounded-md border bg-muted/40 p-3 text-center">
            <div className="text-xs text-muted-foreground">Délai</div>
            <div className="mt-1 text-lg font-semibold">{item.duration || "2–4 semaines"}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">Un projet similaire ?</div>
          <div className="flex gap-2">
            <a href="/contact" className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent">
              Discutons de votre projet
            </a>
            <a href="/#tarifs" className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent">
              Voir les tarifs
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="font-heading text-base font-semibold">{title}</h4>
      <div className="mt-1">{children}</div>
    </section>
  );
}