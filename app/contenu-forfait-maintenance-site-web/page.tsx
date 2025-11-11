import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { RecommendedArticles } from "@/components/site/recommended-articles";

const coverImg =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"; // maintenance/updates
const imgSecurity =
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80"; // servers/security
const imgPerf =
  "https://images.unsplash.com/photo-1512758017271-d7b84c7bb5a2?auto=format&fit=crop&w=1600&q=80"; // performance/seo

export const metadata = {
  title: "Que comprend un forfait de maintenance pour un site vitrine ?",
  description:
    "Forfait maintenance site web : mises à jour CMS/plugins, sauvegardes testées tous les 3 mois, monitoring 24/7, support Niveau 1-2-3, optimisation SEO. Vous pouvez modifier textes/photos vous-même, pas les plugins.",
  alternates: {
    canonical: "/contenu-forfait-maintenance-site-web",
    languages: {
      "fr-FR": "/contenu-forfait-maintenance-site-web",
    },
  },
  openGraph: {
    title: "Que comprend un forfait de maintenance pour un site vitrine ?",
    description:
      "Mises à jour testées, sécurité & sauvegardes (restauration trimestrielle), perf & SEO, support avec SLA. Autonomie contenu sans risque.",
    url: "https://smarterlogicweb.com/contenu-forfait-maintenance-site-web",
    images: ["/contenu-forfait-maintenance-site-web/opengraph-image"],
  },
};

export default function ArticleContenuForfaitMaintenanceSiteWeb() {
  const post = BLOG_POSTS.find(
    (p) => p.slug === "contenu-forfait-maintenance-site-web" && p.locale === "fr"
  );
  if (!post) {
    return (
      <section className="mx-auto w-full max-w-3xl px-6 py-10">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Article introuvable</h1>
        <p className="mt-2 text-foreground/80">L’article demandé n’est pas disponible.</p>
        <div className="mt-4">
          <Link href="/blog" className="text-primary hover:underline">
            ← Voir les articles
          </Link>
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
        Ce qui est inclus, ce qui ne l’est pas, et ce que vous pouvez modifier vous‑même sans casser
        le site ni annuler la garantie.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Forfait de maintenance technique pour site vitrine — mises à jour testées et sécurisées"
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
                src={imgSecurity}
                alt="Surveillance sécurité et sauvegardes externes — règle 3-2-1 et test de restauration"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Sauvegardes testées tous les 3 mois ; corrections en urgence sur faille critique.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgPerf}
                alt="Performance & SEO technique — Core Web Vitals et Search Console"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Vitesse : WebP, cache, minification, DB ; monitoring Core Web Vitals/SC.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={coverImg}
                alt="Support structuré avec SLA — niveaux 1/2/3"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Niveaux 1‑2‑3 ; SLA : réponse/résolution garanties selon criticité.
            </figcaption>
          </figure>
        </div>
      </section>

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">
            Envie d’éviter la maintenance technique ?
          </h2>
          <p className="mt-2 text-foreground/80">
            Sites <strong>statiques</strong> : design sur‑mesure, contenu inclus (selon offre), 0 maintenance,
            hébergement gratuit, code remis.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full" size="lg">
              <Link href="/contact">Discutons de votre projet</Link>
            </Button>
            <Button asChild className="rounded-full" variant="secondary">
              <Link href="/tarifs-2025">Voir les tarifs 2025</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to blog */}
      <div className="mt-4 text-center">
        <Link href="/blog" className="text-primary hover:underline">
          ← Retour aux articles
        </Link>
      </div>
    </section>
  );
}