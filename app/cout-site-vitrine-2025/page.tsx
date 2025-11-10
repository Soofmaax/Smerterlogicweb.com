import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const coverImg = "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80";
const imgSaaS = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80";
const imgFreelance = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";
const imgAgency = "https://images.unsplash.com/photo-1551836022-8b3867e9fa05?auto=format&fit=crop&w=1600&q=80";

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
  openGraph: {
    title: "Combien coûte un site vitrine en France en 2025 ? (Guide des vrais prix)",
    description:
      "Prix site vitrine 2025 : de 300€ à 30 000€. Découvrez les vrais tarifs, ce qui est inclus, et comment éviter de payer deux fois pour le même site.",
    url: "https://smarterlogicweb.com/cout-site-vitrine-2025",
    images: ["/cout-site-vitrine-2025/opengraph-image"],
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
        Prix site vitrine 2025 : de 300€ à 30 000€. Découvrez les vrais tarifs, ce qui est inclus, et comment éviter de payer deux fois.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Comparatif des coûts d’un site vitrine en 2025 (freelance, agence, SaaS)"
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
                src={imgSaaS}
                alt="Création de site via une plateforme SaaS — rapide mais dépendante d’un abonnement"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              SaaS / No‑Code : idéal pour un site très simple, mais vous ne possédez pas le code et l’abonnement est obligatoire.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgFreelance}
                alt="Développeur freelance travaillant sur un site vitrine — bon compromis coût/qualité"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Freelance : souvent le meilleur rapport qualité‑prix si le contenu et le SEO sont bien cadrés.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgAgency}
                alt="Réunion d’agence pour concevoir un site sur‑mesure — processus cadré et budget élevé"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Agence : équipe complète, maquettes et validations — utile pour projets d’envergure.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Prêt à clarifier le budget de votre site ?</h2>
          <p className="mt-2 text-foreground/80">Audit gratuit (15 min) et grille tarifaire détaillée.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full" size="lg">
              <Link href="/contact">Discutons de votre projet</Link>
            </Button>
            <Button asChild className="rounded-full" variant="secondary">
              <Link href="/#tarifs">Voir les tarifs 2025</Link>
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