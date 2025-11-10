import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const coverImg = "https://images.unsplash.com/photo-1605902711834-8b89f3fcb2f7?auto=format&fit=crop&w=1600&q=80"; // finance/planning
const imgDomainHosting = "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80"; // server/rack
const imgMaintenance = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"; // dev/update
const imgSEO = "https://images.unsplash.com/photo-1512758017271-d7b84c7bb5a2?auto=format&fit=crop&w=1600&q=80"; // content/seo
const imgPayment = "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=1600&q=80"; // payment/contract

export const metadata = {
  title: "Frais cachés : ce qu'il faut anticiper après la livraison du site",
  description:
    "Maintenance 290–1 800€/an pour WordPress, 0€ pour site statique. Découvrez le vrai coût total sur 3 ans et les modalités de paiement.",
  alternates: {
    canonical: "/frais-caches-site-internet",
    languages: {
      "fr-FR": "/frais-caches-site-internet",
    },
  },
  openGraph: {
    title: "Frais cachés : ce qu'il faut anticiper après la livraison du site",
    description:
      "Maintenance 290–1 800€/an pour WordPress, 0€ pour site statique. Découvrez le vrai coût total sur 3 ans et les modalités de paiement.",
    url: "https://smarterlogicweb.com/frais-caches-site-internet",
    images: [coverImg],
  },
};

export default function ArticleFraisCachesSiteInternet() {
  const post = BLOG_POSTS.find((p) => p.slug === "frais-caches-site-internet" && p.locale === "fr");
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
        Maintenance 290–1 800€/an pour WordPress, 0€ pour site statique. Le vrai coût total sur 3 ans, les frais récurrents, et des modalités de paiement claires.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Planification budgétaire du coût total de possession d’un site internet sur 3 ans"
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
                src={imgDomainHosting}
                alt="Serveurs d’hébergement et infrastructure — coûts récurrents à surveiller (mutualisé vs VPS)"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Hébergement : mutualisé 50–120€/an ; VPS 600–4 800€/an. Inutile pour une vitrine dans la majorité des cas.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgMaintenance}
                alt="Maintenance technique WordPress — mises à jour du cœur, plugins, thèmes et sauvegardes"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Maintenance WordPress : 290–1 800€/an. Sans mises à jour, le site devient vulnérable (piratage, pannes).
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgSEO}
                alt="SEO et contenu — investissement continu pour maintenir et améliorer la visibilité sur Google"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              SEO continu : 300–1 500€/mois selon ambition. Rédaction SEO : 150–400€/article.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Besoin d’un site sans frais cachés ?</h2>
          <p className="mt-2 text-foreground/80">Sites statiques : design sur‑mesure, contenu inclus (selon offre), 0 maintenance, code remis.</p>
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