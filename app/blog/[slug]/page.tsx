import Link from "next/link";
import { notFound } from "next/navigation";
import { getScheduledPostBySlugBurst, formatDate } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-source";
import { RecommendedArticles } from "@/components/site/recommended-articles";
import { RelatedCities } from "@/components/site/related-cities";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CitationBox } from "@/components/site/citation-box";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const all = getAllPosts();
  const result = getScheduledPostBySlugBurst(all, params.slug, "fr");
  if (!result || !result.isPublished) {
    return {
      title: "Article non disponible",
      robots: { index: false, follow: false },
    };
  }
  const { post } = result;

  // Compute proper EN alternate slug:
  // 1) prefer explicit mapping from frontmatter (altLocales.en)
  // 2) else, use same slug if an EN post exists with the same slug
  // 3) else, fallback to the FR slug (may 404 if EN not available)
  const explicitEn = post.altLocales?.en;
  const enSameSlug = all.find((p) => p.locale === "en" && p.slug === post.slug);
  const enAltSlug = explicitEn || enSameSlug?.slug || post.slug;

  return {
    title: post.title,
    description: post.summary ?? post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        "fr-FR": `/blog/${post.slug}`,
        "en-US": `/en/blog/${enAltSlug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary ?? post.title,
      publishedTime: post.publishAt.toISOString(),
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

  const authorName = post.authorName || "Sonia";
  const authorUrl = post.authorUrl || undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://smarterlogicweb.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://smarterlogicweb.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://smarterlogicweb.com/blog/${post.slug}` },
    ],
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary ?? post.title,
    datePublished: post.publishAt.toISOString(),
    dateModified: post.publishAt.toISOString(),
    mainEntityOfPage: `https://smarterlogicweb.com/blog/${post.slug}`,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "smarterlogicweb",
      url: "https://smarterlogicweb.com",
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  const hasH1 = /<h1(\s|>)/i.test(post.contentHtml);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10">
      {/* JSON-LD BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* JSON-LD BlogPosting */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />

      <header className="mb-6">
        {!hasH1 ? (
          <h1 className="font-heading text-3xl font-bold tracking-tight">{post.title}</h1>
        ) : null}
        <p className="mt-1 text-sm text-muted-foreground">
          Par {authorUrl ? <Link href={authorUrl} className="hover:underline">{authorName}</Link> : authorName}
        </p>
        <time className="mt-0.5 block text-sm text-muted-foreground" dateTime={post.publishAt.toISOString()}>
          Publié le {formatDate(post.publishAt, "fr")}
        </time>

        {/* Visible breadcrumbs */}
        <Breadcrumbs
          className="mt-2"
          items={[
            { label: "Accueil", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </header>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-a:underline-offset-2 prose-img:rounded-lg prose-img:shadow-sm"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <RelatedCities contentHtml={post.contentHtml} locale="fr" />

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      <CitationBox articleSlug={post.slug} locale="fr" />

      <footer className="mt-8">
        <Link href="/blog" className="text-primary hover:underline">
          ← Retour aux articles
        </Link>
      </footer>
    </article>
  );
}