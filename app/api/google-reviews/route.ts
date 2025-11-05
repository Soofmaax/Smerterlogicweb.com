import { NextResponse } from "next/server";

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

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID" },
      { status: 500 }
    );
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

    return NextResponse.json({
      rating,
      total,
      reviews: mapped,
      placeId,
      mapsUrl: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}