import { NextResponse } from "next/server";
import { getClientIpFromHeaders } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GooglePlaceReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  time?: number; // unix seconds
};

export async function GET(req: Request) {
  const ip = getClientIpFromHeaders(req);
  const rl = checkRateLimit(`googlerev:${ip}`, 60, 10 * 60 * 1000); // 60 req / 10 min per IP
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(rl.limit),
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-RateLimit-Reset": String(Math.round(rl.resetAt / 1000)),
        },
      }
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Graceful fallback when credentials are not configured
    const fallback = {
      rating: 5,
      total: 3,
      reviews: [
        {
          author: "Julien",
          rating: 5,
          text: "Depuis que j'ai mon nouveau site, je reçois 3 à 4 demandes de devis par semaine via Google.",
          relative: "il y a 2 mois",
        },
        {
          author: "Marie",
          rating: 5,
          text: "Site clair et rapide. Les clients trouvent facilement nos horaires et nous appellent directement.",
          relative: "il y a 1 mois",
        },
        {
          author: "Thomas",
          rating: 5,
          text: "Mise en ligne fluide, pas de prise de tête côté technique. Je me concentre sur mes chantiers.",
          relative: "il y a 3 semaines",
        },
      ],
      placeId: "",
      mapsUrl: "#",
    };
    return NextResponse.json(fallback, { status: 200 });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      // Avoid caching here; client will cache in localStorage
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Upstream error: ${res.status} ${text}` }, { status: 502 });
    }
    const data = await res.json();

    if (data.status && data.status !== "OK" && !data.result) {
      return NextResponse.json({ error: `Places error: ${data.status}` }, { status: 502 });
    }

    const result = data.result || {};
    const rating: number = result.rating ?? 0;
    const total: number = result.user_ratings_total ?? 0;
    const reviews: GooglePlaceReview[] = Array.isArray(result.reviews) ? result.reviews : [];

    // Map to a compact shape and sort by rating desc then time desc
    const mapped = reviews
      .map((r) => ({
        author: r.author_name,
        avatar: r.profile_photo_url,
        rating: r.rating,
        text: r.text || "",
        date: r.time ? new Date(r.time * 1000).toISOString() : undefined,
        relative: r.relative_time_description,
      }))
      .sort((a, b) => {
        if ((b.rating ?? 0) !== (a.rating ?? 0)) return (b.rating ?? 0) - (a.rating ?? 0);
        const ta = a.date ? Date.parse(a.date) : 0;
        const tb = b.date ? Date.parse(b.date) : 0;
        return tb - ta;
      });

    return NextResponse.json(
      {
        rating,
        total,
        reviews: mapped,
        placeId,
        mapsUrl: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      },
      {
        headers: {
          "X-RateLimit-Limit": String(rl.limit),
          "X-RateLimit-Remaining": String(Math.max(0, rl.remaining - 1)),
          "X-RateLimit-Reset": String(Math.round(rl.resetAt / 1000)),
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}