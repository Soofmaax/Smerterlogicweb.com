import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { RecommendedArticles } from "@/components/site/recommended-articles";

const coverImg = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"; // content/desk
const imgUSP = "https://images.unsplash.com/photo-1551746908-5d2a1ff27cde?auto=format&fit=crop&w=1600&q=80"; // sticky note/usp
const imgPricing = "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=1600&q=80"; // pricing/cta
const imgSocialProof = "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1600&q=80"; // testimonials

export const metadata = {
  title: "Quel contenu pour convertir vos visiteurs en clients ?",
  description:
    "Taux de conversion site B2B : 2–5% en moyenne. Transformez les 95% qui partent : USP claire, tarifs transparents, preuve sociale, 4–5 pages minimum optimisées CRO.",
  alternates: {
    canonical: "/contenu-site-vitrine-conversion",
    languages: {
      "fr-FR": "/contenu-site-vitrine-conversion",
    },
  },
  openGraph: {
    title: "Quel contenu pour convertir vos visiteurs en clients ?",
    description:
      "Apprenez à structurer votre contenu pour la conversion : USP, tarifs, preuve sociale, images optimisées, architecture 4–8 pages.",
    url: "https://smarterlogicweb.com/contenu-site-vitrine-conversion",
    images: ["/contenu-site-vitrine-conversion/opengraph-image"],
  },
};

export default function ArticleContenuConversion() {
  const post = BLOG_POSTS.find((p) => p.slug === "contenu-site-vitrine-conversion" && p.locale === "fr");
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
        Tirez parti des 4 piliers de contenu qui convertissent vraiment : USP claire, tarifs transparents, preuve sociale, visuels optimisés.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Plan de contenu convertissant pour site vitrine"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            priority={false}
            loading="lazy"
            decoding="async"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Article content */}
      <article className="mt-10 rounded-[28px] border bg-card p-6 card-elevated">
        <div
          className="max-w-none leading-relaxed space-y-4 [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h3]:mt-4 [&_h3]:font-semibold [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_td]:align-top"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* Supporting images grid */}
      <section className="mt-10">
        <div className="grid gap-4 md:grid-cols-3">
          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgUSP}
                alt="USP claire et différenciante — bénéfices client en H1"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Pilier 1 : USP — pourquoi vous, en une phrase.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgPricing}
                alt="Tarification par paliers et CTA clairs"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Pilier 2 : tarifs transparents et CTA qui rassurent.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgSocialProof}
                alt="Témoignages et études de cas — preuve sociale forte"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Pilier 3 : témoignages spécifiques, vidéos, cas clients.
            </figcaption>
          </figure>
        </div>
      </section>

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Prêt à transformer le contenu de votre site ?</h2>
          <p className="mt-2 text-foreground/80">On conçoit et rédige le contenu <em>qui vend</em> — et on le mesure.</p>
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