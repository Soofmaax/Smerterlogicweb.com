import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { getPublishedPostsBurst, schedulePosts, formatDate } from "@/lib/blog";

type Props = {
  currentSlug?: string;
  locale?: "fr" | "en";
  title?: string;
};

export function RecommendedArticles({ currentSlug, locale = "fr", title }: Props) {
  const scheduled = schedulePosts(BLOG_POSTS.filter((p) => p.locale === locale), locale);
  const published = getPublishedPostsBurst(BLOG_POSTS, locale)
    .sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime())
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (published.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold">{title ?? (locale === "fr" ? "Articles recommandés" : "Recommended articles")}</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {published.map((post) => (
          <li key={post.slug} className="rounded-[16px] border bg-card p-4">
            <h3 className="font-medium leading-tight">
              <Link href={`${locale === "en" ? "/en" : ""}/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <time className="mt-1 block text-xs text-muted-foreground" dateTime={post.publishAt.toISOString()}>
              {formatDate(post.publishAt, locale)}
            </time>
            {post.summary ? <p className="mt-2 text-sm text-foreground/80">{post.summary}</p> : null}
            <div className="mt-3">
              <Link href={`${locale === "en" ? "/en" : ""}/blog/${post.slug}`} className="text-sm text-primary hover:underline">
                {locale === "fr" ? "Lire l’article" : "Read article"}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}