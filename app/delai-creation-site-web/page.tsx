import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { RecommendedArticles } from "@/components/site/recommended-articles";

const coverImg = "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?auto=format&fit=crop&w=1600&q=80"; // calendar/clock
const imgPlan = "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&w=1600&q=80"; // planning/meeting
const imgDesign = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"; // design/dev
const imgLaunch = "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80"; // servers/launch

export const metadata = {
  title: "Combien de temps pour avoir votre site en ligne ? (La vérité sur les délais réels)",
  description:
    "Délai création site web : 7 à 12 semaines pour un site optimisé, 14 à 34 semaines en moyenne en France. Découvrez les 5 phases, les vrais délais, et comment éviter 6 mois d’attente.",
  alternates: {
    canonical: "/delai-creation-site-web",
    languages: {
      "fr-FR": "/delai-creation-site-web",
    },
  },
  openGraph: {
    title: "Combien de temps pour avoir votre site en ligne ? (La vérité sur les délais réels)",
    description:
      "Délai création site web : 7 à 12 semaines pour un site optimisé, 14 à 34 semaines en moyenne en France. Découvrez les 5 phases, les vrais délais, et comment éviter 6 mois d'attente.",
    url: "https://smarterlogicweb.com/delai-creation-site-web",
    images: ["/delai-creation-site-web/opengraph-image"],
  },
};

export default function ArticleDelaiSiteWeb() {
  const post = BLOG_POSTS.find((p) => p.slug === "delai-creation-site-web" && p.locale === "fr");
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
        Les vrais délais, les facteurs qui changent tout et les leviers d’accélération sans compromis.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Calendrier de projet web avec jalons et délais"
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
                src={imgPlan}
                alt="Atelier de cadrage et planning — déterminer objectifs, périmètre et délais"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Cadrage clair = projet fluide, délais tenus.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgDesign}
                alt="Design et intégration — maquettes sur‑mesure puis développement"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Maquettes validées vite = intégration immédiate.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgLaunch}
                alt="Mise en ligne — serveurs, DNS, SSL, contrôle qualité"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Go‑Live et accompagnement post‑lancement.
            </figcaption>
          </figure>
        </div>
      </section>

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Besoin d’un site livré vite et bien ?</h2>
          <p className="mt-2 text-foreground/80">Processus clair, contenus guidés, délais respectés (7–10 semaines).</p>
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