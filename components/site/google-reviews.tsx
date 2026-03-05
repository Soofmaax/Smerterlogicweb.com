"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/site/carousel";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import { CheckCircle2, ExternalLink } from "lucide-react";

type Review = {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
  relative?: string;
};

type Payload = {
  rating: number;
  total: number;
  reviews: Review[];
  placeId: string;
  mapsUrl: string;
};

const FALLBACK_REVIEWS: Review[] = [];

function useGoogleReviews() {
  const [data, setData] = React.useState<Payload | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const LS_KEY = "google_reviews_cache";
    const now = Date.now();
    try {
      const cached = localStorage.getItem(LS_KEY);
      if (cached) {
        const obj = JSON.parse(cached) as { ts: number; payload: Payload };
        if (obj && now - obj.ts < 24 * 60 * 60 * 1000) {
          if (obj.payload?.total > 0) {
            setData(obj.payload);
            return;
          }
        }
      }
    } catch {}

    let aborted = false;
    fetch("/api/google-reviews")
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((payload: Payload) => {
        if (aborted) return;
        // Ne jamais afficher “0 avis” quand l'API n'est pas configurée :
        // si total = 0, on n'affiche rien.
        if (!payload?.total) {
          setData(null);
          try {
            localStorage.removeItem(LS_KEY);
          } catch {}
          return;
        }
        setData(payload);
        try {
          localStorage.setItem("google_reviews_cache", JSON.stringify({ ts: now, payload }));
        } catch {}
      })
      .catch((e) => {
        if (aborted) return;
        setError(e?.message || "error");
        setData(null);
      });

    return () => {
      aborted = true;
    };
  }, []);

  return { data, error };
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

function ReviewCard({ r }: { r: Review }) {
  const [expanded, setExpanded] = React.useState(false);
  const text = r.text || "";
  const preview = text.length > 150 ? text.slice(0, 150) + "…" : text;

  return (
    <Reveal className="reveal-fade-up">
      <article className="card-elevated mx-auto max-w-md rounded-[20px] border bg-card p-5 transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-accent">
            {r.avatar ? (
              <Image src={r.avatar} alt={r.author} fill sizes="40px" style={{ objectFit: "cover" }} />
            ) : (
              <div className="grid h-full w-full place-items-center text-sm font-semibold text-foreground/80">
                {(r.author || "?").charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{r.author}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Stars rating={r.rating} />
              {r.relative ? <span className="truncate">{r.relative}</span> : null}
            </div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground ring-1 ring-border">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground/80" />
            Avis vérifié Google
          </span>
        </div>

        <p className="mt-3 text-sm text-foreground/80">
          {expanded ? text : preview}{" "}
          {text.length > 150 && (
            <button className="link-underline text-primary" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Lire moins" : "Lire plus"}
            </button>
          )}
        </p>
      </article>
    </Reveal>
  );
}

export function GoogleReviews({ max = 6, title = "Ce Que Disent Mes Clients" }: { max?: number; title?: string }) {
  const { data } = useGoogleReviews();
  if (!data?.total) return null;

  const items = (data?.reviews || []).slice(0, Math.max(3, Math.min(6, max)));
  const slides = items.map((r, i) => <ReviewCard key={i} r={r} />);

  const reviewUrl = data.placeId ? `https://search.google.com/local/writereview?placeid=${data.placeId}` : null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-2 text-foreground/70">{`${data.rating?.toFixed(1)}/5 sur ${data.total} avis clients`}</p>
      </div>

      <Carousel items={slides} className="mt-6" ariaLabel="Avis clients" />

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center">
        <Link
          href={data?.mapsUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className={cn("link-underline inline-flex items-center gap-2 text-sm text-foreground", !data?.mapsUrl && "pointer-events-none opacity-60")}
        >
          Voir tous les avis sur Google <ExternalLink className="h-4 w-4" />
        </Link>
        {reviewUrl ? (
          <Link
            href={reviewUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-3 py-1.5 text-sm transition hover:bg-accent"
          >
            Donner un avis
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function GoogleReviewsBadge({ className }: { className?: string }) {
  const { data } = useGoogleReviews();
  if (!data?.total) return null;
  return (
    <Link
      href={data.mapsUrl || "#"}
      target="_blank"
      rel="noreferrer"
      aria-label="Voir les avis Google"
      className={cn("inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs text-foreground transition hover:bg-accent", className)}
    >
      <span className="inline-flex items-center gap-1">
        <Stars rating={data.rating || 0} />
        <span className="font-semibold">{data.rating?.toFixed(1)}</span>
      </span>
      <span className="text-muted-foreground">({data.total} avis)</span>
      <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
    </Link>
  );
}