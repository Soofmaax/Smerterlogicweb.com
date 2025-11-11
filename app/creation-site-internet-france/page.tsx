import Link from "next/link";
import { LOCAL_CITIES } from "@/data/local-cities";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "Création de Site Internet en France — Villes desservies",
  description:
    "Intervention nationale: création de sites vitrines et refontes performantes. Découvrez nos villes desservies et nos secteurs clés par région.",
  alternates: {
    canonical: "/creation-site-internet-france",
    languages: {
      "fr-FR": "/creation-site-internet-france",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/creation-site-internet-france",
    title: "Création de Site Internet en France — Villes desservies",
    description:
      "Intervention nationale: création de sites vitrines et refontes performantes. Villes desservies et secteurs clés par région.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Création de site internet (national)",
  provider: {
    "@type": "LocalBusiness",
    name: "smarterlogicweb",
    url: "https://smarterlogicweb.com",
    areaServed: "France",
  },
  areaServed: "France",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "1490",
    highPrice: "2490",
    availability: "https://schema.org/InStock",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: LOCAL_CITIES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://smarterlogicweb.com/creation-site-internet/${c.slug}`,
    name: `Création de site internet à ${c.name}`,
  })),
};

export default function FranceCitiesPage() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      {/* Hero */}
      <Reveal className="reveal-clip inline-block">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">
          Création de Site Internet en France: villes desservies
        </h1>
      </Reveal>
      <p className="mt-3 text-foreground/80 max-w-3xl">
        Intervention nationale sans bureau physique local: rendez-vous en visio, livraison rapide, et sites performants
        (Core Web Vitals). Retrouvez nos secteurs clés par ville et accédez à la page dédiée de votre zone.
      </p>

      {/* Cities grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LOCAL_CITIES.map((c) => (
          <div key={c.slug} className="rounded-[24px] border bg-card p-5 card-elevated">
            <h2 className="font-heading text-xl font-semibold">Création de site internet à {c.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Agglomération {c.populationAgglo} — Concurrence {c.competition}
            </p>
            <p className="mt-2 text-foreground/80">
              Secteurs clés: {c.sectors.join(", ")}
              {c.satellites.length > 0 ? (
                <>
                  {" "}
                  — Satellites: {c.satellites.join(", ")}
                </>
              ) : null}
            </p>
            <div className="mt-3">
              <Link href={`/creation-site-internet/${c.slug}`} className="text-primary hover:underline">
                Voir la page {c.name} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="mt-6 text-sm text-muted-foreground">
        Besoin d’une ville non listée ? Contactez‑nous : nous couvrons la France entière (zones de service).
      </p>
    </section>
  );
}