import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalCityBySlug, getAllLocalCitySlugs } from "@/data/local-cities";
import { BookingButton } from "@/components/site/booking-modal";
import { Reveal } from "@/components/site/reveal";
import { Particles } from "@/components/site/particles";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const dynamic = "force-static";

type Params = { params: { ville: string } };

export async function generateStaticParams() {
  return getAllLocalCitySlugs().map((slug) => ({ ville: slug }));
}

export async function generateMetadata({ params }: Params) {
  const city = getLocalCityBySlug(params.ville);
  if (!city) {
    return {
      title: "Ville non trouvée",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  }
  const sectors = city.sectors.join(", ").toLowerCase();
  const title = `Refonte de site internet à ${city.name} pour TPE et artisans — Audit & site vitrine statique`;
  const description = `Audit et refonte de sites internet à ${city.name} pour artisans, TPE et PME des secteurs ${sectors}. Passage vers un site vitrine statique plus rapide et plus simple à maintenir. Devis gratuit.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/refonte-web/${city.slug}`,
      languages: { "fr-FR": `/refonte-web/${city.slug}` },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://smarterlogicweb.com/refonte-web/${city.slug}`,
    },
  };
}

function toSentence(list: string[]): string {
  if (list.length <= 1) return list.join("");
  const head = list.slice(0, -1).join(", ");
  const tail = list[list.length - 1];
  return `${head} et ${tail}`;
}

const faqForCityRefonte = (cityName: string) => [
  {
    q: `Pourquoi refondre mon site à ${cityName} ?`,
    a: `Si votre site actuel est lent, peu clair ou ne reflète plus votre activité, une refonte permet d'améliorer la vitesse, l’UX et la conversion. Nous en profitons pour simplifier la structure et mettre en avant vos offres principales.`,
  },
  {
    q: `Est‑ce que vous transformez mon site en site vitrine statique ?`,
    a: `Dans la plupart des cas, oui. Nous basculons vers un site vitrine statique plus rapide, plus stable et plus simple à maintenir, tout en conservant vos contenus utiles et votre nom de domaine.`,
  },
  {
    q: `Combien de temps dure une refonte à ${cityName} ?`,
    a: `Pour une TPE ou un artisan, comptez en moyenne 3–6 semaines selon l’ampleur du site et la rapidité des validations. L’enchaînement classique: audit initial, plan d’actions, refonte, tests et déploiement.`,
  },
  {
    q: `Puis‑je conserver mon contenu ?`,
    a: `Oui. Nous réorganisons vos contenus (textes, photos, cas clients) pour qu’ils soient plus lisibles, mieux structurés pour l’UX/SEO et plus rapides à charger.`,
  },
];

export default function CityRefontePage({ params }: Params) {
  const city = getLocalCityBySlug(params.ville);
  if (!city) notFound();

  const sectorsSentence = toSentence(city.sectors);
  const satellitesSentence = toSentence(city.satellites);
  const cciLabel = city.cci || `CCI locale`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Refonte de site web",
    provider: {
      "@type": "LocalBusiness",
      name: "smarterlogicweb",
      url: "https://smarterlogicweb.com",
      areaServed: [city.name, ...city.satellites],
    },
    areaServed: [city.name, ...city.satellites],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "1490",
      highPrice: "2490",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqForCityRefonte(city.name).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://smarterlogicweb.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Refonte Web",
        item: "https://smarterlogicweb.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Refonte de site web à ${city.name}`,
        item: `https://smarterlogicweb.com/refonte-web/${city.slug}`,
      },
    ],
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <Reveal className="reveal-clip inline-block">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Refonte de site internet à {city.name} pour TPE et artisans : vers un site vitrine statique plus rapide
        </h1>
      </Reveal>

      {/* Visible breadcrumbs */}
      <Breadcrumbs
        className="mt-2"
        items={[
          { label: "Accueil", href: "/" },
          { label: "Refonte Web", href: "/services" },
          { label: `Refonte de site web à ${city.name}` },
        ]}
      />

      <p className="mt-3 text-foreground/80 max-w-3xl">
        À {city.name}, nous auditons et refondons des sites internet d&apos;artisans, TPE et petites entreprises pour les
        rendre plus rapides, plus clairs et plus simples à gérer. Notre approche: transformer un site lourd (souvent
        WordPress) en site vitrine statique performant, sans perdre vos contenus ni votre référencement local.
      </p>

      {/* Intro CTA */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <BookingButton className="rounded-full btn-pulse" size="lg" label={`Audit refonte — ${city.name}`} />
        <Button asChild className="rounded-full" variant="secondary">
          <Link href={`/creation-site-internet/${city.slug}`}>Besoin d’un site neuf ? Voir la création</Link>
        </Button>
      </div>

      {/* Body */}
      <article className="mt-10 rounded-[28px] border bg-card p-6 card-elevated space-y-8">
        <section>
          <h2 className="font-heading text-2xl font-semibold">Pourquoi refondre votre site à {city.name} ?</h2>
          <p className="mt-2 text-foreground/80">
            Si votre site actuel est lent, compliqué à mettre à jour ou n&apos;explique plus clairement votre activité, une
            refonte permet de repartir sur un site vitrine statique plus rapide, plus clair et plus adapté aux attentes de
            vos clients. Nous gardons ce qui fonctionne, simplifions le reste, et améliorons la conversion.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Audit performance, UX et SEO</h2>
          <p className="mt-2 text-foreground/80">
            Avant toute refonte, nous auditons votre site : vitesse, expérience utilisateur, structure, contenus, SEO local.
            Sur cette base, nous construisons un plan d&apos;actions réaliste pour une TPE ou un artisan : quelles pages
            garder, quelles pages fusionner, quelles pages créer, comment organiser vos services, vos preuves et vos appels à
            l&apos;action.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Intervention sur {city.name} et ses villes satellites ({satellitesSentence})
          </h2>
          <p className="mt-2 text-foreground/80">
            Nous travaillons avec des entreprises basées à {city.name} et dans ses communes proches ({satellitesSentence}).
            Tous les échanges peuvent se faire en visio ou par téléphone : pas besoin de vous déplacer, même pour une refonte
            complète. Nous intégrons si besoin des éléments locaux (CCI, événements, partenaires) pour renforcer votre
            crédibilité.
          </p>
          {Array.isArray(city.institutions) && city.institutions.length > 0 ? (
            <p className="mt-2 text-foreground/80">Institutions locales : {city.institutions.join(", ")}.</p>
          ) : null}
          {Array.isArray(city.events) && city.events.length > 0 ? (
            <p className="mt-2 text-foreground/80">Événements économiques : {city.events.join(", ")}.</p>
          ) : null}
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">FAQ — Refonte ({city.name})</h2>
          <div className="mt-3 space-y-4">
            {faqForCityRefonte(city.name).map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold">{f.q}</h3>
                <p className="text-foreground/80">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* CTA footer */}
      <section className="mx-auto mt-10 w-full max-w-5xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h2 className="font-heading text-2xl font-semibold">Prêt à améliorer votre site à {city.name} ?</h2>
          <p className="mt-2 text-foreground/80">Audit rapide et recommandations concrètes.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full" variant="secondary">
              <Link href={`/creation-site-internet/${city.slug}`}>Voir la création de site (neuf)</Link>
            </Button>
            <BookingButton className="rounded-full" size="lg" label={`Réserver mon audit — ${city.name}`} />
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="mt-4 text-center">
        <Link href="/villes-intervention" className="text-primary hover:underline">← Toutes les villes d’intervention</Link>
      </div>
    </section>
  );
}