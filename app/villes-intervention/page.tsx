import Link from "next/link";
import { LOCAL_CITIES } from "@/data/local-cities";
import { Particles } from "@/components/site/particles";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SITE_URL, COMPANY_NAME, absoluteUrl } from "@/config/site";

export const metadata = {
  title: "Villes d’intervention — smarterlogicweb.com",
  description:
    "Création et refonte de sites internet partout en France, avec un focus sur Paris, la petite couronne (92, 93, 94) et la grande couronne (91, 95, 77, 78). Découvrez nos pages locales par ville, secteurs et zones satellites.",
  alternates: {
    canonical: "/villes-intervention",
    languages: {
      "fr-FR": "/villes-intervention",
      "en-US": "/en/services", // no EN pillar yet
    },
  },
  openGraph: {
    url: `${SITE_URL}/villes-intervention`,
    title: "Villes d’intervention",
    description:
      "Création et refonte de sites internet en France, avec un focus sur Paris et l’Île-de-France (petite et grande couronne). Pages locales par ville, secteurs et satellites.",
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
      name: COMPANY_NAME,
      url: SITE_URL,
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
      url: absoluteUrl(`/creation-site-internet/${c.slug}`),
    })),
  };

  const idfDepartments = ["75", "91", "92", "93", "94", "95", "77", "78"];
  const tier1Slugs = [
    "paris",
    "boulogne-billancourt",
    "issy-les-moulineaux",
    "levallois-perret",
    "neuilly-sur-seine",
    "courbevoie",
    "nanterre",
    "saint-denis",
    "creteil",
    "cergy",
    "versailles",
    "montreuil",
  ];

  const idfCities = LOCAL_CITIES.filter((c) => idfDepartments.includes(c.departmentCode));
  const tier1Cities = idfCities.filter((c) => tier1Slugs.includes(c.slug));
  const otherIdfCities = idfCities.filter((c) => !tier1Slugs.includes(c.slug));
  const regionalCities = LOCAL_CITIES.filter((c) => !idfDepartments.includes(c.departmentCode));

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
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
        Rendez‑vous en visio, livraison rapide, sites performants (Core Web Vitals). Nous intervenons partout en France,
        avec un focus sur Paris et l’Île-de-France (petite et grande couronne). Sélectionnez votre ville pour accéder
        à la page locale (création) et à la page refonte correspondante.
      </p>

      <section className="mt-6 space-y-3">
        <h2 className="font-heading text-2xl font-semibold">
          Île-de-France : Paris et villes prioritaires
        </h2>
        <p className="text-foreground/80 text-sm max-w-3xl">
          Ces villes concentrent une grande partie de nos clients : professions libérales, cabinets, agences et TPE B2B
          à Paris, dans les Hauts-de-Seine, en Seine-Saint-Denis, dans le Val-de-Marne, le Val-d’Oise et les Yvelines.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tier1Cities.map((city) => (
            <Link
              key={city.slug}
              href={`/creation-site-internet/${city.slug}`}
              className="inline-flex rounded-full border px-3 py-1 text-xs font-medium text-primary hover:underline bg-background/70"
            >
              Création de site à {city.name}
            </Link>
          ))}
        </div>
      </section>

      {otherIdfCities.length > 0 && (
        <section className="mt-6 space-y-2">
          <h2 className="font-heading text-xl font-semibold">
            Île-de-France : autres villes où nous intervenons
          </h2>
          <p className="text-foreground/80 text-sm max-w-3xl">
            Nous accompagnons également des artisans, TPE et petites structures dans les autres communes d’Île-de-France :
            grande couronne, zones industrielles et pôles administratifs.
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {otherIdfCities.map((city) => (
              <Link
                key={city.slug}
                href={`/creation-site-internet/${city.slug}`}
                className="text-primary hover:underline"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 space-y-3">
        <h2 className="font-heading text-2xl font-semibold">
          Toutes nos villes d’intervention
        </h2>
        <p className="max-w-3xl text-sm text-foreground/80">
          La liste ci‑dessous regroupe l’ensemble de nos pages locales. Chaque ville dispose d’une page dédiée pour la création
          de site vitrine statique et d’une page distincte pour la refonte de sites existants.
        </p>

        {/* Grid of cities */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOCAL_CITIES.map((city) => {
            const sectors = toSentence(city.sectors);
            const satellites = toSentence(city.satellites);
            return (
              <article key={city.slug} className="rounded-[20px] border bg-card p-4 card-elevated h-full flex flex-col">
                <h3 className="font-heading text-lg font-semibold">{city.name}</h3>
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
                    Création de site internet à {city.name} →
                  </Link>
                  <Link href={`/refonte-web/${city.slug}`} className="text-sm text-primary hover:underline">
                    Refonte de site internet à {city.name} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Back link */}
      <div className="mt-6 text-center">
        <Link href="/services" className="text-primary hover:underline">← Voir les services</Link>
      </div>
    </section>
  );
}