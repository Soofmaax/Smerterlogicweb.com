import Link from "next/link";
import { LOCAL_CITIES } from "@/data/local-cities";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const metadata = {
  title: "Villes d’intervention — smarterlogicweb.com",
  description:
    "Création et refonte de sites internet partout en France. Découvrez nos pages locales par ville, secteurs, et zones satellites.",
  alternates: {
    canonical: "/villes-intervention",
    languages: {
      "fr-FR": "/villes-intervention",
      "en-US": "/en/services", // no EN pillar yet
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/villes-intervention",
    title: "Villes d’intervention",
    description:
      "Création et refonte de sites internet partout en France. Pages locales par ville, secteurs et satellites.",
  },
};

function toSentence(list: string[]): string {
  if (!list || list.length === 0) return "";
  if (list.length === 1) return list[0];
  const head = list.slice(0, -1).join(", ");
  const tail = list[list.length - 1];
  return `${head} et ${tail}`;
}

export default function CitiesInterventionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Création de site internet (France)",
    provider: {
      "@type": "LocalBusiness",
      name: "smarterlogicweb",
      url: "https://smarterlogicweb.com",
      areaServed: "France",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "France",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: LOCAL_CITIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://smarterlogicweb.com/creation-site-internet/${c.slug}`,
    })),
  };

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
          Villes d’intervention (France)
        </h1>
      </Reveal>

      {/* Visible breadcrumbs */}
      <Breadcrumbs
        className="mt-2"
        items={[
          { label: "Accueil", href: "/" },
          { label: "Création Site Internet" },
        ]}
      />

      <p className="mt-3 max-w-3xl text-foreground/80">
        Rendez‑vous en visio, livraison rapide, sites performants (Core Web Vitals). Sélectionnez votre ville pour accéder
        à la page locale (création) et à la page refonte correspondante.
      </p>

      {/* Grid of cities */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCAL_CITIES.map((city) => {
          const sectors = toSentence(city.sectors);
          const satellites = toSentence(city.satellites);
          return (
            <article key={city.slug} className="rounded-[20px] border bg-card p-4 card-elevated h-full flex flex-col">
              <h2 className="font-heading text-lg font-semibold">{city.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Agglo {city.populationAgglo} — Concurrence SEO: {city.competition}
              </p>
              <p className="mt-2 text-sm text-foreground/80">
                Secteurs clés: {sectors || "—"}
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                Satellites: {satellites || "—"}
              </p>
              {city.cci ? <p className="mt-1 text-xs text-muted-foreground">CCI: {city.cci}</p> : null}

              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/creation-site-internet/${city.slug}`} className="text-sm text-primary hover:underline">
                  Voir la page Création →
                </Link>
                <Link href={`/refonte-web/${city.slug}`} className="text-sm text-primary hover:underline">
                  Voir la page Refonte →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Back link */}
      <div className="mt-6 text-center">
        <Link href="/services" className="text-primary hover:underline">← Voir les services</Link>
      </div>
    </section>
  );
}