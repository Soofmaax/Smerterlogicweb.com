import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalCityBySlug, getAllLocalCitySlugs } from "@/data/local-cities";
import { BookingButton } from "@/components/site/booking-modal";
import { Reveal } from "@/components/site/reveal";
import { Particles } from "@/components/site/particles";
import { Button } from "@/components/ui/button";

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
      robots: { index: false, follow: false },
    };
  }
  const sectors = city.sectors.join(", ").toLowerCase();
  const title = `Refonte de Site Web à ${city.name} — Audit & Performance (CWV)`;
  const description = `Audit et refonte de sites à ${city.name}. Améliorez LCP, INP, CLS. Ciblé pour ${sectors}. Devis gratuit.`;

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
    a: `Pour améliorer la vitesse, l’UX et le SEO. Une refonte corrige les lenteurs (JS/CSS), simplifie la structure et augmente la conversion.`,
  },
  {
    q: `Quels indicateurs de performance sont visés ?`,
    a: `Core Web Vitals: LCP (rendu principal), INP (réactivité) et CLS (stabilité). Objectif: valeurs dans le vert.`,
  },
  {
    q: `Combien de temps dure une refonte ?`,
    a: `En moyenne 3–6 semaines selon l’ampleur. Audit initial, plan d’actions, refonte, tests, déploiement.`,
  },
  {
    q: `Puis‑je conserver mon contenu ?`,
    a: `Oui. Nous réorganisons votre contenu pour l’UX/SEO, améliorons les images et les assets pour la vitesse.`,
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

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <Reveal className="reveal-clip inline-block">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Refonte de Site Web à {city.name} : audit, performance et Core Web Vitals
        </h1>
      </Reveal>
      <p className="mt-3 text-foreground/80 max-w-3xl">
        À {city.name}, nous auditons et refondons votre site pour une vitesse supérieure (SSG), une UX claire et un SEO
        durable. Ciblé pour {sectorsSentence}. Objectif: LCP &lt; 1s, INP réactif, CLS stable.
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
            Une refonte corrige les problèmes fréquents (site lent, scripts lourds, structure confuse) et améliore la
            conversion. Nous basculons vers une architecture SSG avec hydratation ciblée, pour des pages rapides et stables.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Audit performance & SEO (CWV)</h2>
          <p className="mt-2 text-foreground/80">
            Audit initial: LCP, INP, CLS, tailles d’assets, scripts et images. Plan d’actions pour réduire le TBT, optimiser
            l’affichage critique, et réorganiser le contenu (maillage interne, navigation, FAQ).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Intervention sur {city.name} et ses villes satellites ({satellitesSentence})
          </h2>
          <p className="mt-2 text-foreground/80">
            Nous intervenons à {city.name} et ses communes proches ({satellitesSentence}). Coordination avec la {cciLabel}
            et les partenaires locaux pour ancrer votre visibilité.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Institutions locales et événements</h2>
          <p className="mt-2 text-foreground/80">
            Nous intégrons des éléments de crédibilité (institutions/évènements) dans vos pages pour une pertinence locale
            accrue et une meilleure conversion.
          </p>
          {Array.isArray(city.institutions) && city.institutions.length > 0 ? (
            <p className="mt-2 text-foreground/80">Institutions: {city.institutions.join(", ")}.</p>
          ) : null}
          {Array.isArray(city.events) && city.events.length > 0 ? (
            <p className="mt-2 text-foreground/80">Événements: {city.events.join(", ")}.</p>
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