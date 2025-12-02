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
  const title = `Création de site internet à ${city.name} pour artisans et TPE — Expertise locale ${city.departmentCode}`;
  const description = `Création de sites vitrines statiques à ${city.name} pour artisans, TPE et PME des secteurs ${sectors}. Audit et devis gratuits.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/creation-site-internet/${city.slug}`,
      languages: { "fr-FR": `/creation-site-internet/${city.slug}` },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://smarterlogicweb.com/creation-site-internet/${city.slug}`,
    },
  };
}

function toSentence(list: string[]): string {
  if (list.length <= 1) return list.join("");
  const head = list.slice(0, -1).join(", ");
  const tail = list[list.length - 1];
  return `${head} et ${tail}`;
}

const faqForCity = (cityName: string, firstSector: string | undefined) => [
  {
    q: `Quel est le coût d'un site vitrine à ${cityName} ?`,
    a: `Pour un site vitrine statique, comptez généralement entre 1 490€ et 2 490€ selon le nombre de pages, la quantité de contenu et les fonctionnalités (formulaire, galeries, prise de rendez-vous). Prix fixe, annoncé dès le départ.`,
  },
  {
    q: `Combien de temps pour créer un site professionnel à ${cityName} ?`,
    a: `Pour une TPE ou un artisan, un site vitrine statique se réalise en 2–4 semaines en moyenne, après validation du devis et réception des contenus. Les projets plus complets (cas clients, FAQ, bilingue) peuvent s'étaler sur 4–6 semaines.`,
  },
  {
    q: `Votre approche convient‑elle aux secteurs ${firstSector ? firstSector.toLowerCase() : "locaux"} ?`,
    a: `Oui. Nous construisons des sites vitrines statiques pensés pour les artisans, TPE et PME locales, en adaptant le contenu et la structure aux spécificités de votre secteur (${firstSector ? firstSector.toLowerCase() : "activité locale"}). Objectif: performance (Core Web Vitals), clarté, conversion.`,
  },
  {
    q: `Pouvez‑vous intervenir autour de ${cityName} ?`,
    a: `Oui, nous intervenons sur ${cityName} et ses villes satellites proches. Les rendez‑vous se font en visio ou par téléphone, ce qui permet d'accompagner sereinement des artisans et TPE de toute la région.`,
  },
];

export default function CityServicePage({ params }: Params) {
  const city = getLocalCityBySlug(params.ville);
  if (!city) notFound();

  const sectorsSentence = toSentence(city.sectors);
  const satellitesSentence = toSentence(city.satellites);
  const cciLabel = city.cci || `CCI locale`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Création de site internet (vitrine & e‑commerce)",
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
    mainEntity: faqForCity(city.name, city.sectors[0]).map((f) => ({
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
        name: "Création Site Internet",
        item: "https://smarterlogicweb.com/villes-intervention",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Création de site internet à ${city.name}`,
        item: `https://smarterlogicweb.com/creation-site-internet/${city.slug}`,
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
        <h1 className="text-3xl sm:text-4xl font-heading font-semibold tracking-tight">
            {city.h1Suffix ? (
              <>
                Création de sites vitrines statiques à {city.name} : {city.h1Suffix}
              </>
            ) : (
              <>
                Création de site internet à {city.name} pour artisans et TPE : sites vitrines statiques pour{" "}
                {sectorsSentence}
              </>
            )}
          </h1>
      </Reveal>

      {/* Visible breadcrumbs */}
      <Breadcrumbs
        className="mt-2"
        items={[
          { label: "Accueil", href: "/" },
          { label: "Création Site Internet", href: "/villes-intervention" },
          { label: `Création de site internet à ${city.name}` },
        ]}
      />

      <p className="mt-3 text-foreground/80 max-w-3xl">
        À {city.name} (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques rapides, stables et
        simples à maintenir pour les artisans, indépendants et TPE des secteurs {sectorsSentence}. L&apos;objectif:
        expliquer clairement vos services locaux, rassurer vos prospects et générer des demandes, sans usine à gaz
        technique ni maintenance lourde.
      </p>

      {/* Intro CTA */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <BookingButton className="rounded-full btn-pulse" size="lg" label={`Audit gratuit — ${city.name} et alentours`} />
        <Button asChild className="rounded-full" variant="secondary">
          <Link href="/tarifs-2025">Voir les tarifs 2025</Link>
        </Button>
      </div>

      {/* Body */}
      <article className="mt-10 rounded-[28px] border bg-card p-6 card-elevated space-y-8">
        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Pour quels types d&apos;entreprises à {city.name} ?
          </h2>
          <p className="mt-2 text-foreground/80">
            Notre offre de création de site internet à {city.name} est pensée pour les artisans, professions libérales et TPE
            locales qui veulent un site vitrine clair, rapide et simple à maintenir&nbsp;: plomberie, électricité, textile,
            industrie mécanique, agroalimentaire, conseil, coaching, etc. Nous adaptons le ton et les exemples à votre
            réalité de terrain.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Notre expertise pour les secteurs clés de {city.name}
          </h2>
          <div className="mt-2 space-y-3">
            {city.sectors.map((s) => (
              <div key={s}>
                <h3 className="text-lg font-semibold">{s}</h3>
                <p className="text-foreground/80">
                  Nous adaptons le contenu, la structure et les preuves de confiance au secteur {s.toLowerCase()}. Objectif:
                  vitesse native (SSG) avec des sites vitrines statiques, SEO solide et conversion locale. Audit, design,
                  intégration, optimisation des Core Web Vitals et maillage interne — livrés clés en main.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Intervention sur {city.name} et ses villes satellites ({satellitesSentence})
          </h2>
          <p className="mt-2 text-foreground/80">
            Nous intervenons à {city.name} et sur ses communes avoisinantes ({satellitesSentence}). Réunions en visio à distance,
            déploiement rapide, et coordination avec la {cciLabel} pour les entreprises locales lorsque nécessaire.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Institutions locales et événements économiques</h2>
          <p className="mt-2 text-foreground/80">
            Nous nous appuyons sur les ressources locales (CCI, pôles, évènements) pour adapter le contenu et les
            preuves de confiance. À {city.name}, la {cciLabel} et les partenaires locaux facilitent l’ancrage régional.
          </p>
          {Array.isArray(city.institutions) && city.institutions.length > 0 ? (
            <p className="mt-2 text-foreground/80">
              Institutions clés: {city.institutions.join(", ")}.
            </p>
          ) : null}
          {Array.isArray(city.events) && city.events.length > 0 ? (
            <p className="mt-2 text-foreground/80">
              Événements économiques: {city.events.join(", ")}.
            </p>
          ) : null}
        </section>

        <section>
          <blockquote className="rounded-xl border bg-muted/30 p-4 text-muted-foreground">
            “Le site refondu pour une PME locale de {city.name} a doublé les demandes de devis en 4 mois — grâce à la vitesse
            (LCP &lt; 1s), au contenu sectoriel, et à des CTA clairs.”
          </blockquote>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">FAQ — {city.name}</h2>
          <div className="mt-3 space-y-4">
            {faqForCity(city.name, city.sectors[0]).map((f) => (
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
          <h2 className="font-heading text-2xl font-semibold">Prêt à lancer votre site à {city.name} ?</h2>
          <p className="mt-2 text-foreground/80">Audit rapide et conseils concrets adaptés au marché local.</p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full" variant="secondary">
              <Link href="/services">Voir nos services</Link>
            </Button>
            <BookingButton className="rounded-full" size="lg" label={`Réserver mon audit — ${city.name}`} />
          </div>
        </div>
      </section>

      {/* Related cities & national page */}
      <section className="mx-auto mt-4 w-full max-w-5xl px-0 py-6">
        <div className="rounded-[24px] border bg-card p-5 card-elevated">
          <h3 className="font-heading text-xl font-semibold">Voir aussi</h3>
          <p className="mt-2 text-sm text-foreground/80">Autres villes proches ou similaires :</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {getAllLocalCitySlugs()
              .map((slug) => getLocalCityBySlug(slug))
              .filter((c) => c && c.slug !== city.slug)
              .filter((c) => c!.sectors.some((s) => city.sectors.includes(s)) || c!.competition === "Très Faible")
              .slice(0, 3)
              .map((c) => (
                <Link key={c!.slug} href={`/creation-site-internet/${c!.slug}`} className="text-primary hover:underline">
                  Création de site à {c!.name} — {c!.sectors[0]}
                </Link>
              ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Link href={`/refonte-web/${city.slug}`} className="text-primary hover:underline">
              Vous avez déjà un site ? Voir la refonte →
            </Link>
            <Link href="/villes-intervention" className="text-primary hover:underline">
              Voir toutes nos villes d’intervention →
            </Link>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="mt-4 text-center">
        <Link href="/services" className="text-primary hover:underline">← Retour aux services</Link>
      </div>
    </section>
  );
}