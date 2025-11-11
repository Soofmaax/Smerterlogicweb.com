import Link from "next/link";
import { notFound } from "next/navigation";
import { getScheduledPostBySlugBurst, formatDate } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-source";
import { RecommendedArticles } from "@/components/site/recommended-articles";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const result = getScheduledPostBySlugBurst(getAllPosts(), params.slug, "fr");
  if (!result || !result.isPublished) {
    return {
      title: "Article non disponible",
      robots: { index: false, follow: false },
    };
  }
  const { post } = result;
  return {
    title: post.title,
    description: post.summary ?? post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        "fr-FR": `/blog/${post.slug}`,
        "en-US": `/en/blog/${post.slug}`,
      },
    },
  };
}

export default function BlogPostFR({ params }: { params: { slug: string } }) {
  const result = getScheduledPostBySlugBurst(getAllPosts(), params.slug, "fr");
  if (!result) notFound();

  const { post, isPublished } = result;
  if (!isPublished) {
    // Hide unreleased posts from public/SEO
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{post.title}</h1>
        <time className="mt-1 block text-sm text-muted-foreground" dateTime={post.publishAt.toISOString()}>
          Publié le {formatDate(post.publishAt, "fr")}
        </time>
      </header>

      <div className="space-y-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      <footer className="mt-8">
        <Link href="/blog" className="text-primary hover:underline">
          ← Retour aux articles
        </Link>
      </footer>
    </article>
  );
}