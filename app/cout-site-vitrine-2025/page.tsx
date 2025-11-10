import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";

export const metadata = {
  title: "Combien coûte un site vitrine en France en 2025 ? (Guide des vrais prix)",
  description:
    "Prix site vitrine 2025 : de 300€ à 30 000€. Découvrez les vrais tarifs, ce qui est inclus, et comment éviter de payer deux fois pour le même site.",
  alternates: {
    canonical: "/cout-site-vitrine-2025",
    languages: {
      "fr-FR": "/cout-site-vitrine-2025",
    },
  },
};

export default function ArticlePrixSiteVitrine2025() {
  const post = BLOG_POSTS.find((p) => p.slug === "cout-site-vitrine-2025" && p.locale === "fr");
  if (!post) {
    return (
      <section className="mx-auto w-full max-w-3xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Article introuvable</h1>
        <p className="mt-2 text-foreground/80">L’article demandé n’est pas disponible.</p>
        <div className="mt-4">
          <Link href="/blog" className="text-primary hover:underline">← Voir les articles</Link>
        </div>
      </section>
    );
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{post.title}</h1>
      </header>

      <div
        className="prose prose-slate dark:prose-invert max-w-none leading-relaxed [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_td]:align-top space-y-4"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-8">
        <Link href="/blog" className="text-primary hover:underline">← Retour aux articles</Link>
      </footer>
    </article>
  );
}