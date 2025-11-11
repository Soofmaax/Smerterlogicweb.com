import Link from "next/link";
import { schedulePosts, getPublishedPostsBurst, formatDate } from "@/lib/blog";
import { QuickLinks } from "@/components/site/quick-links";
import { getAllPosts } from "@/lib/blog-source";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articles & blog",
  description:
    "Conseils pratiques sur la visibilité, la confiance et la performance web.",
  alternates: {
    canonical: "/blog",
    languages: {
      "fr-FR": "/blog",
      "en-US": "/en/blog",
    },
  },
};

export default function BlogIndexFR() {
  const all = getAllPosts();
  const scheduled = schedulePosts(all.filter((p) => p.locale === "fr"), "fr");
  const published = getPublishedPostsBurst(all, "fr");

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Articles &amp; conseils</h1>
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

      {scheduled.length > published.length ? (
        <div className="mt-8 rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">À venir</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {scheduled.slice(published.length, Math.min(scheduled.length, published.length + 6)).map((p) => (
              <li key={`upcoming-${p.slug}`}>
                {formatDate(p.publishAt, "fr")} — {p.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    <QuickLinks />
    </div>
  );
}