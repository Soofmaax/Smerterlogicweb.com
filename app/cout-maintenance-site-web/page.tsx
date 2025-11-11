import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { RecommendedArticles } from "@/components/site/recommended-articles";
import { QuickLinks } from "@/components/site/quick-links";

const coverImg =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"; // dev/update/maintenance
const imgRisk =
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80"; // servers/incidents
const imgSecurity =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"; // updates/security
const imgStatic =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"; // code/static

export const metadata = {
  title: "Maintenance technique : qui s'en occupe et à quel prix ?",
  description:
    "Coût maintenance site web : 30€ à 500€/mois selon prestataire. DIY risqué, freelance 50-100€, agence 150-500€. Découvrez le vrai coût de la non-maintenance (1000€ à 50 000€ par panne).",
  alternates: {
    canonical: "/cout-maintenance-site-web",
    languages: {
      "fr-FR": "/cout-maintenance-site-web",
    },
  },
  openGraph: {
    title: "Maintenance technique : qui s'en occupe et à quel prix ?",
    description:
      "Coût maintenance site web : 30€ à 500€/mois selon prestataire. DIY risqué, freelance 50-100€, agence 150-500€. Découvrez le vrai coût de la non-maintenance (1000€ à 50 000€ par panne).",
    url: "https://smarterlogicweb.com/cout-maintenance-site-web",
    images: ["/cout-maintenance-site-web/opengraph-image"],
  },
};

export default function ArticleCoutMaintenanceSiteWeb() {
  const post = BLOG_POSTS.find(
    (p) => p.slug === "cout-maintenance-site-web" && p.locale === "fr"
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
        DIY, freelance ou agence ? Les vrais coûts, les risques et pourquoi le statique évite la
        maintenance obligatoire.
      </p>

      {/* Cover image */}
      <div className="mt-8 rounded-[24px] border bg-card p-3 card-elevated">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={coverImg}
            alt="Maintenance technique et mises à jour régulières d’un site internet"
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
                src={imgRisk}
                alt="Infrastructure et risques de panne — continuité d’activité"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Panne : coût direct et indirect (CA, réputation, SEO).
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgSecurity}
                alt="Sécurité WordPress — mises à jour du cœur, plugins, thèmes"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              43 % des piratages via plugins/thèmes obsolètes : mises à jour vitales.
            </figcaption>
          </figure>

          <figure className="rounded-[20px] border bg-card p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={imgStatic}
                alt="Site statique — code pur, hébergement gratuit, vitesse maximale"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              Statique : 0 maintenance obligatoire, Netlify/Vercel gratuits.
            </figcaption>
          </figure>
        </div>
      </section>

      <RecommendedArticles currentSlug={post.slug} locale="fr" />

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Besoin d’un site sans maintenance obligatoire ?</h2>
          <p className="mt-2 text-foreground/80">
            Sites statiques : design sur‑mesure, contenu inclus (selon offre), hébergement gratuit, 0 maintenance.
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

      <QuickLinks />

      {/* Back to blog */}
      <div className="mt-4 text-center">
        <Link href="/blog" className="text-primary hover:underline">
          ← Retour aux articles
        </Link>
      </div>
    </section>
  );
}