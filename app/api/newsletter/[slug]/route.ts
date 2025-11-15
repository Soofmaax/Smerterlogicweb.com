import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAllPosts } from "@/lib/blog-source";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function baseUrl() {
  return process.env.NEWSLETTER_BASE_URL || "https://smarterlogicweb.com";
}

function htmlEscape(s: string) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function style() {
  // Basic email-safe inline CSS
  return `
  body { margin:0; padding:0; background:#f6f7fb; }
  .wrapper { width:100%; background:#f6f7fb; padding:20px 0; }
  .container { width:100%; max-width:640px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; }
  .header { padding:20px 24px; background:#0f172a; color:#fff; font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial; }
  .content { padding:20px 24px; color:#111827; font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial; line-height:1.6; }
  h1 { font-size:22px; margin:0 0 12px; }
  h2 { font-size:18px; margin:24px 0 8px; }
  p { margin:0 0 12px; }
  .post { border-top:1px solid #e5e7eb; padding:16px 0; }
  .btn { display:inline-block; background:#2563eb; color:#fff; text-decoration:none; padding:10px 16px; border-radius:6px; font-weight:600; }
  .footer { padding:16px 24px; color:#6b7280; font-size:12px; }
  a { color:#1d4ed8; }
  ul { padding-left:18px; margin:8px 0; }
  `;
}

function renderIntro(introHtml: string) {
  return introHtml?.trim() ? `<div class="intro">${introHtml}</div>` : "";
}

function renderPosts(locale: string, featuredSlugs: string[] | undefined) {
  const posts = getAllPosts();
  const slugs = Array.isArray(featuredSlugs) ? featuredSlugs : [];

  const items = slugs.map((slug) => {
    // Try matching in requested locale first
    const pLocale = posts.find((p) => p.locale === (locale || "fr") && p.slug === slug);

    // Fallback: cross-locale mapping via altLocales
    let pFallback: typeof pLocale | undefined;
    if (!pLocale) {
      if (locale === "en") {
        // find FR post whose altLocales.en === slug OR same slug in FR
        pFallback =
          posts.find((p) => p.locale === "fr" && (p as any).altLocales?.en === slug) ||
          posts.find((p) => p.locale === "fr" && p.slug === slug);
      } else {
        // find EN post whose altLocales.fr === slug OR same slug in EN
        pFallback =
          posts.find((p) => p.locale === "en" && (p as any).altLocales?.fr === slug) ||
          posts.find((p) => p.locale === "en" && p.slug === slug);
      }
    }

    const p = pLocale || pFallback;
    if (!p) return "";

    const isEN = p.locale === "en";
    const locPrefix = isEN ? "/en" : "";
    const url = `${baseUrl()}${locPrefix}/blog/${p.slug}`;
    const sum = p.summary ? `<p>${htmlEscape(p.summary)}</p>` : "";
    const btn = locale === "en" ? "Read article" : "Lire l’article";

    return `
      <div class="post">
        <h2>${htmlEscape(p.title)}</h2>
        ${sum}
        <p><a class="btn" href="${url}" target="_blank" rel="noopener noreferrer">${btn}</a></p>
      </div>`;
  });

  const content = items.filter(Boolean).join("");
  return content ? `<div class="posts">${content}</div>` : "";
}

function renderLinks(links: Array<{ label: string; url: string }> | undefined) {
  if (!Array.isArray(links) || !links.length) return "";
  const items = links
    .map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${htmlEscape(l.label || l.url)}</a></li>`)
    .join("");
  return `<div class="links"><h2>À lire aussi</h2><ul>${items}</ul></div>`;
}

function renderCTA(cta: any) {
  if (!cta || !cta.text || !cta.url) return "";
  return `<p style="margin-top:20px;"><a class="btn" href="${cta.url}" target="_blank" rel="noopener noreferrer">${htmlEscape(
    cta.text
  )}</a></p>`;
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const fp = path.join(process.cwd(), "content", "newsletter", `${slug}.md`);
  if (!fs.existsSync(fp)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const raw = fs.readFileSync(fp, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as any;
  const introHtml = parsed.content;

  const title = fm.title || slug;
  const locale = fm.locale || "fr";
  const featuredSlugs: string[] | undefined = fm.featuredSlugs;
  const links = Array.isArray(fm.links) ? fm.links : undefined;
  const cta = fm.cta;

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${htmlEscape(title)}</title>
  <style>${style()}</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>${htmlEscape(title)}</h1>
      </div>
      <div class="content">
        ${renderIntro(introHtml)}
        ${renderPosts(locale, featuredSlugs)}
        ${renderLinks(links)}
        ${renderCTA(cta)}
        <p style="color:#6b7280; font-size:12px; margin-top:24px;">
          Vous recevez cet e-mail car vous vous êtes inscrit(e) sur notre site.
          Pour vous désabonner, utilisez le lien présent dans l’e-mail envoyé via Zoho Campaigns.
        </p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} smarterlogicweb.com — Tous droits réservés.
      </div>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}