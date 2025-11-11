import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { schedulePosts, getPublishedPostsBurst, formatDate } from "@/lib/blog";
import { QuickLinksEN } from "@/components/site/quick-links-en";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articles & blog",
  description:
    "Practical insights on visibility, trust and web performance.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      "fr-FR": "/blog",
      "en-US": "/en/blog",
    },
  },
};

export default function BlogIndexEN() {
  const scheduled = schedulePosts(BLOG_POSTS.filter((p) => p.locale === "en"), "en");
  const published = getPublishedPostsBurst(BLOG_POSTS, "en");

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Articles &amp; insights</h1>
      </header>

      {published.length === 0 ? (
        <div className="rounded-xl border bg-card p-6">
          <p className="text-foreground/80">No articles published yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {published.map((post) => (
            <li key={post.slug} className="rounded-xl border bg-card p-5 transition hover:bg-accent/40">
              <article>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">
                    <Link href={`/en/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-sm text-muted-foreground" dateTime={post.publishAt.toISOString()}>
                    {formatDate(post.publishAt, "en")}
                  </time>
                </div>
                {post.summary ? <p className="mt-2 text-foreground/80">{post.summary}</p> : null}
                <div className="mt-3">
                  <Link href={`/en/blog/${post.slug}`} className="text-sm text-primary hover:underline">
                    Read article
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {scheduled.length > published.length ? (
        <div className="mt-8 rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Upcoming</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {scheduled.slice(published.length, Math.min(scheduled.length, published.length + 6)).map((p) => (
              <li key={`upcoming-${p.slug}`}>
                {formatDate(p.publishAt, "en")} — {p.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    <QuickLinksEN />
    </div>
  );
}