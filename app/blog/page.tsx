import Link from "next/link";
import { getPublishedPostsBurst, formatDate, schedulePosts } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-source";
import { Suspense } from "react";
import { Particles } from "@/components/site/particles";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { QuickLinks } from "@/components/site/quick-links";
import { absoluteUrl, SITE_URL, BRAND_DOMAIN } from "@/config/site";

export const revalidate = 60;

export const metadata = {
  title: "Blog — visibilité locale, refonte et tarifs 2026",
  description:
    "Articles et conseils pratiques sur la visibilité locale, la refonte de sites WordPress en sites statiques et les tarifs 2026 pour TPE et professions libérales.",
  alternates: {
    canonical: "/blog",
    languages: {
      "fr-FR": "/blog",
      "en-US": "/en/blog",
    },
  },
  openGraph: {
    url: `${SITE_URL}/blog`,
    title: `Blog — visibilité locale, refonte et tarifs 2026 — ${BRAND_DOMAIN}`,
    description:
      "Articles et conseils pratiques sur la visibilité locale, la refonte de sites WordPress en sites statiques et les tarifs 2026 pour TPE et professions libérales.",
  },
};

export default function BlogIndexFR() {
  const all = getAllPosts();
  const scheduled = schedulePosts(all.filter((p) => p.locale === "fr"), "fr");
  const published = getPublishedPostsBurst(all, "fr");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  return (
    <section className="relative">
      {/* Ambient brand gradient background, subtle and non-intrusive */}
      <div aria-hidden className="hero-gradient-animated absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        {/* JSON-LD BreadcrumbList */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Articles &amp; conseils</h1>

        {/* Visible breadcrumbs */}
        <Breadcrumbs
          className="mt-2"
          items={[
            { label: "Accueil", href: "/" },
            { label: "Blog" },
          ]}
        />
      </header>

      {published.length === 0 ? (
        <div className="rounded-xl border bg-card p-6">
          <p className="text-foreground/80">Aucun article publié pour le moment.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {published.map((post) => (
            <li key={post.slug} className="rounded-xl border bg-card p-5 transition hover:bg-accent/40">
              <article>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-sm text-muted-foreground" dateTime={post.publishAt.toISOString()}>
                    {formatDate(post.publishAt, "fr")}
                  </time>
                </div>
                {post.summary ? <p className="mt-2 text-foreground/80">{post.summary}</p> : null}
                <div className="mt-3">
                  <Link href={`/blog/${post.slug}`} className="text-sm text-primary hover:underline">
                    Lire l’article
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      
    <QuickLinks />
      </div>
    </section>
  );
}