import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { RecommendedArticles } from "@/components/site/recommended-articles";
import { PdfDownloadButton } from "@/components/site/pdf-download-button";

export const metadata = {
  title: "Grille Tarifs 2025 — Sites Statiques pour Professions Libérales",
  description:
    "Essentiel 1 490€ • Professionnel 2 490€ • Premium 4 990€ TTC — transparence des inclusions, performances mesurables et zéro maintenance obligatoire.",
  alternates: {
    canonical: "/grille-tarifs-2025-guide",
    languages: {
      "fr-FR": "/grille-tarifs-2025-guide",
    },
  },
  openGraph: {
    title: "Grille Tarifs 2025 — Sites Statiques pour Professions Libérales",
    description:
      "Sites statiques pour professions libérales : transparence des coûts, performances, et 0 maintenance obligatoire.",
    url: "https://smarterlogicweb.com/grille-tarifs-2025-guide",
    images: ["/grille-tarifs-2025-guide/opengraph-image"],
  },
};

export default function ArticleTarifsGrid() {
  const post = BLOG_POSTS.find((p) => p.slug === "grille-tarifs-2025-guide" && p.locale === "fr");
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
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <Reveal className="reveal-clip inline-block">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          {post.title}
        </h1>
      </Reveal>
      <p className="mt-3 text-foreground/80 max-w-3xl">
        Avocats, experts‑comptables, architectes, notaires&nbsp;: votre présence en ligne, sans compromis.
      </p>

      {/* PDF callout */}
      <div className="mt-6 rounded-[24px] border bg-card p-5 card-elevated">
        <h3 className="font-heading text-lg font-semibold">Recevoir la Grille Tarifs 2025 (PDF) par email</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Téléchargez et recevez la grille par email pour partage interne (PDF brandé, lisible, sans fioritures).
        </p>
        <div className="mt-3">
          <PdfDownloadButton slug="grille-tarifs-2025" />
        </div>
      </div>

      {/* Article content */}
      <article className="mt-8 rounded-[28px] border bg-card p-6 card-elevated">
        <div
          className="max-w-none leading-relaxed space-y-4 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h3]:mt-4 [&_h3]:font-semibold [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_td]:align-top"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Prêt à clarifier votre budget et vos délais ?</h2>
          <p className="mt-2 text-foreground/80">On vous guide et on livre vite — avec la qualité qui dure.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full" variant="secondary">
              <Link href="/tarifs-2025">Voir les tarifs 2025</Link>
            </Button>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/contact">Discutons de votre projet</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to blog */}
      <div className="mt-4 text-center">
        <Link href="/blog" className="text-primary hover:underline">← Retour aux articles</Link>
      </div>
    </section>
  );
}