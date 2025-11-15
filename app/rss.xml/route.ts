import { getPublishedPostsBurst } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-source";

export const dynamic = "force-dynamic";

function formatRfc2822(d: Date): string {
  return d.toUTCString();
}

export async function GET() {
  const origin = "https://smarterlogicweb.com";
  const all = getAllPosts();
  const fr = getPublishedPostsBurst(all, "fr");
  const en = getPublishedPostsBurst(all, "en");

  const now = new Date();
  const items = [...fr, ...en].sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime());

  const rss =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0">` +
    `<channel>` +
    `<title>smarterlogicweb — Articles</title>` +
    `<link>${origin}</link>` +
    `<description>Conseils pratiques et études de cas — visibilité, confiance, performance web.</description>` +
    `<language>fr</language>` +
    `<lastBuildDate>${formatRfc2822(now)}</lastBuildDate>` +
    items
      .map((p) => {
        const url =
          p.locale === "en"
            ? `${origin}/en/blog/${p.slug}`
            : `${origin}/blog/${p.slug}`;
        const guid = url;
        const title = p.title;
        const description = p.summary || p.title;
        const pubDate = formatRfc2822(p.publishAt);
        return (
          `<item>` +
          `<title><![CDATA[${title}]]></title>` +
          `<link>${url}</link>` +
          `<guid isPermaLink="true">${guid}</guid>` +
          `<description><![CDATA[${description}]]></description>` +
          `<pubDate>${pubDate}</pubDate>` +
          `</item>`
        );
      })
      .join("") +
    `</channel>` +
    `</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}