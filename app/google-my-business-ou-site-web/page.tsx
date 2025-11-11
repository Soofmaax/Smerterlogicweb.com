import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { RecommendedArticles } from "@/components/site/recommended-articles";

const coverImg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"; // people collaboration
const imgLocal = "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1600&q=80"; // map/local
const imgWebsite = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80"; // analytics/site
const imgSynergy = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"; // dev/content

export const metadata = {
  title: "Site web ou fiche Google My Business : que privilégier ?",
  description:
    "Fiche Google My Business ou site web en premier ? 70% de visites en plus avec GMB complet, 50% des recherches mobiles = visite le jour même. Stratégie séquentielle pour TPE.",
  alternates: {
    canonical: "/google-my-business-ou-site-web",
    languages: {
      "fr-FR": "/google-my-business-ou-site-web",
    },
  },
  openGraph: {
    title: "Site web ou fiche Google My Business : que privilégier ?",
    description:
      "Fiche Google My Business ou site web en premier ? 70% de visites en plus avec GMB complet, 50% des recherches mobiles = visite le jour même. Stratégie séquentielle pour TPE.",
    url: "https://smarterlogicweb.com/google-my-business-ou-site-web",
    images: ["/google-my-business-ou-site-web/opengraph-image"],
  },
};

export default function ArticleGMBvsSite() {
  const post = BLOG_POSTS.find(
    (p) => p.slug === "google-my-business-ou-site-web" && p.locale === "fr"
  );
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
        Faut‑il prioriser Google My Business ou le site web ? Pour 90 % des TPE locales : GMB d’abord, site ensuite — et toujours la synergie entre les deux.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Choisir entre fiche Google My Business et site web — stratégie TPE"
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
                src={imgLocal}
                alt="Référencement local — Google Maps et Local Pack"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              SEO local : intention forte, résultats rapides (appels/itinéraires).
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgWebsite}
                alt="Site vitrine — autorité, conversion, tunnels avancés"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Site : contrôle total sur UX/brand, contenus et conversion.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgSynergy}
                alt="Synergie fiche GMB ↔ site web — maillage et conversion"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              La synergie GMB → site et site → GMB multiplie les résultats.
            </figcaption>
          </figure>
        </div>
      </section>

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Besoin d’une stratégie séquentielle efficace ?</h2>
          <p className="mt-2 text-foreground/80">On optimise votre GMB et on crée un site qui convertit — sans maintenance obligatoire.</p>
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