import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalCityBySlug, getAllLocalCitySlugs } from "@/data/local-cities";
import { BookingButton } from "@/components/site/booking-modal";
import { Reveal } from "@/components/site/reveal";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SITE_URL, absoluteUrl, COMPANY_NAME, PHONE_NUMBER_PUBLIC } from "@/config/site";

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
  let title = `Création de site internet à ${city.name} — sites vitrines statiques pour artisans et TPE (2026)`;
  let description = `Création de sites vitrines statiques à ${city.name} pour artisans, TPE et PME des secteurs ${sectors}. Audit et devis gratuits. Forfaits 2026 à partir de 1 490€ TTC.`;

  if (city.slug === "niort") {
    description =
      "Création de sites vitrines statiques à Niort pour artisans, indépendants et PME des mutuelles, assurances, fintech et tertiaire. Sites rapides, clairs et simples à maintenir. Tarifs 2026 à partir de 1 490€ TTC.";
  } else if (city.slug === "brive-la-gaillarde") {
    description =
      "Création de sites vitrines statiques à Brive-la-Gaillarde pour artisans, TPE et petites entreprises de l’agroalimentaire, de la logistique et du tourisme vert en Corrèze. Sites rapides, clairs et simples à maintenir, pensés pour être trouvés sur les recherches locales. Tarifs 2026 à partir de 1 490€ TTC.";
  } else if (city.slug === "cholet") {
    description =
      "Création de sites vitrines statiques à Cholet pour artisans, commerçants et PME du textile, de la mode, de la mécanique et de l’agroalimentaire. Sites rapides, sobres et simples à maintenir, pensés pour le référencement local dans le Choletais. Tarifs 2026 à partir de 1 490€ TTC.";
  } else if (city.slug === "vannes") {
    description =
      "Création de sites vitrines statiques à Vannes pour artisans, prestataires du nautisme, du tourisme et de l’agroalimentaire, ainsi que petites structures orientées numérique/cyber. Sites rapides, sobres et simples à maintenir, pensés pour le référencement local autour du Golfe du Morbihan (Vannes, Auray, Sarzeau). Tarifs 2026 à partir de 1 490€ TTC.";
  } else if (city.slug === "paris") {
    title =
      "Création de site internet à Paris — sites vitrines statiques pour avocats, experts-comptables et cabinets (2026)";
    description =
      "Création de sites vitrines statiques à Paris pour avocats, experts-comptables, cabinets de conseil et petites structures B2B. Sites sobres, rapides et simples à maintenir, pensés pour les recherches locales et sectorielles à Paris et en Île-de-France. Tarifs 2026 à partir de 1 490€ TTC.";
  } else if (city.slug === "montauban") {
    description =
      "Création de sites vitrines statiques à Montauban pour artisans, TPE et PME de l’agroalimentaire, de l’aéronautique et de la logistique en Tarn-et-Garonne. Sites rapides, clairs et simples à maintenir, pensés pour être trouvés sur les recherches locales autour de Montauban et du bassin toulousain. Tarifs 2026 à partir de 1 490€ TTC.";
  }

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
      url: absoluteUrl(`/creation-site-internet/${city.slug}`),
    },
  };
}

function toSentence(list: string[]): string {
  if (list.length <= 1) return list.join("");
  const head = list.slice(0, -1).join(", ");
  const tail = list[list.length - 1];
  return `${head} et ${tail}`;
}

const faqForCity = (cityName: string, firstSector: string | undefined) => {
  const items = [
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

  if (cityName === "Niort") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients situés à Niort ?",
        a: "Non. Je travaille avec des artisans, indépendants et petites structures partout en France. Mais je connais bien les enjeux des villes comme Niort : marché local, bouche-à-oreille, besoin d’être trouvé sur quelques requêtes clés comme votre métier + Niort, sans exploser le budget.",
      },
      {
        q: "Combien de temps dure un projet de création de site à Niort ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes et les maquettes. Pour une refonte avec beaucoup de contenus à reprendre, on est plutôt sur 6 à 8 semaines.",
      },
      {
        q: "Puis-je modifier moi-même mon site après la mise en ligne ?",
        a: "Oui. Même si le site est statique, je peux vous proposer une manière simple de mettre à jour certains contenus (textes clés, tarifs, FAQ) sans toucher au code. Et si vous préférez déléguer, je peux aussi m’en charger ponctuellement.",
      }
    );
  }

  if (cityName === "Brive-la-Gaillarde") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients basés à Brive-la-Gaillarde ?",
        a: "Non. Je travaille avec des artisans, indépendants et petites structures partout en France. Brive-la-Gaillarde et la Corrèze restent cependant un focus : entreprises le long de l’A20, agroalimentaire, logistique, tourisme vert…",
      },
      {
        q: "Intervenez-vous aussi en dehors de Brive (Corrèze, Dordogne) ?",
        a: "Oui. Je peux vous accompagner si vous êtes basé à Brive-la-Gaillarde, Tulle, Ussel ou dans les environs, ainsi que sur certaines communes de Dordogne. Les échanges se font principalement en visio ou par téléphone.",
      },
      {
        q: "Combien de temps dure un projet de création de site à Brive-la-Gaillarde ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes et les maquettes. Les projets plus riches en contenus (cas clients, blog) peuvent s’étaler sur 6 à 8 semaines.",
      }
    );
  }

  if (cityName === "Cholet") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des entreprises de Cholet ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Cholet, mais aussi dans les communes du bassin choletais comme Maulévrier ou Mortagne-sur-Sèvre. Les échanges se font en visio ou par téléphone, ce qui reste très simple à organiser.",
      },
      {
        q: "Votre approche convient-elle aux secteurs textile, mode et industrie à Cholet ?",
        a: "Oui. Les sites vitrines statiques sont particulièrement adaptés aux entreprises du textile, de la mode, de la mécanique ou de l’agroalimentaire : pages claires, visuels mis en avant, temps de chargement rapides et structure pensée pour le référencement local.",
      },
      {
        q: "Combien de temps dure un projet de création de site à Cholet ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes, les visuels et les maquettes. Les projets plus complets avec plus de contenus ou de preuves peuvent s’étaler sur 6 à 8 semaines.",
      }
    );
  }

  if (cityName === "Vannes") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des entreprises de Vannes ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Vannes, mais aussi autour du Golfe du Morbihan (Auray, Sarzeau, etc.). Les échanges se font en visio ou par téléphone, ce qui laisse de la flexibilité même en pleine saison.",
      },
      {
        q: "Votre approche convient-elle aux activités nautiques et touristiques à Vannes ?",
        a: "Oui. Les sites vitrines statiques conviennent très bien aux activités de nautisme, de tourisme, d’hôtellerie ou d’agroalimentaire : pages claires, visuels mis en avant, temps de chargement rapides sur mobile et structure pensée pour le référencement local.",
      },
      {
        q: "Combien de temps dure un projet de création de site à Vannes ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes, les visuels et les maquettes. En période de haute saison touristique, on peut adapter le planning pour limiter l’impact sur votre activité.",
      }
    );
  }

  if (cityName === "Paris") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients situés à Paris ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Paris, en petite couronne ou ailleurs en Île-de-France. Les échanges se font essentiellement en visio ou par téléphone, ce qui évite de perdre du temps dans les déplacements.",
      },
      {
        q: "Votre approche convient-elle aux professions libérales et cabinets à Paris ?",
        a: "Oui. Les sites vitrines statiques sont particulièrement adaptés aux avocats, experts-comptables, consultants et petites structures B2B : pages claires, mise en avant des expertises, temps de chargement rapides et structure pensée pour le référencement local et sectoriel.",
      },
      {
        q: "Combien de temps dure un projet de création de site à Paris ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes, les visuels et les maquettes. L’objectif est de garder un rythme raisonnable malgré la charge de vos dossiers.",
      },
      {
        q: "En quoi êtes-vous différent d’une agence web à Paris ?",
        a: "Je ne suis pas une grosse agence web avec des équipes et des process lourds, mais un studio spécialisé en sites vitrines statiques sobres pour professions libérales et TPE B2B. Vous échangez directement avec la personne qui conçoit et réalise le site, le périmètre est clair, et on évite les fonctionnalités inutiles qui complexifient la maintenance.",
      }
    );
  }

  if (cityName === "Montauban") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des entreprises de Montauban ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Montauban, mais aussi dans le Tarn-et-Garonne (Moissac, Castelsarrasin, etc.). Les échanges se font en visio ou par téléphone, ce qui laisse de la flexibilité même avec des plannings industriels chargés.",
      },
      {
        q: "Votre approche convient-elle aux secteurs agro, logistique et aéronautique à Montauban ?",
        a: "Oui. Les sites vitrines statiques conviennent très bien aux entreprises de l’agroalimentaire, de la logistique ou de l’aéronautique : pages claires, mise en avant des prestations et des références, temps de chargement rapides et structure pensée pour le référencement local.",
      },
      {
        q: "Combien de temps dure un projet de création de site à Montauban ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes, les visuels et les maquettes. Les projets plus complets avec plus de contenus ou de preuves peuvent s’étaler sur 6 à 8 semaines.",
      }
    );
  }

  return items;
};

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
      name: COMPANY_NAME,
      url: SITE_URL,
      areaServed: [city.name, ...city.satellites],
    },
    areaServed: [city.name, ...city.satellites],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "1490",
      highPrice: "4990",
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
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Création Site Internet",
        item: absoluteUrl("/villes-intervention"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Création de site internet à ${city.name}`,
        item: absoluteUrl(`/creation-site-internet/${city.slug}`),
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

      {city.name === "Niort" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Niort (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques rapides, stables et simples à maintenir
          pour les artisans, indépendants et petites structures des mutuelles, assurances, fintech et tertiaire. L&apos;objectif :
          expliquer clairement vos services, rassurer vos prospects et générer des demandes sans usine à gaz technique ni
          maintenance lourde.
        </p>
      ) : city.name === "Brive-la-Gaillarde" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Brive-la-Gaillarde (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques rapides, stables et simples à maintenir
          pour les artisans, indépendants et TPE de l&apos;agroalimentaire, de la logistique et du tourisme vert en Corrèze. L&apos;objectif :
          être visible lorsqu&apos;on cherche votre métier + Brive ou Corrèze, avec un site clair, rassurant et sans usine à gaz technique.
        </p>
      ) : city.name === "Cholet" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Cholet (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques rapides et sobres pour les artisans, commerçants et
          PME du textile, de la mode, de la mécanique et de l&apos;agroalimentaire. L&apos;objectif : une présence claire qui parle à vos clients
          du Choletais, sans usine à gaz ni back‑office que personne n&apos;ose utiliser.
        </p>
      ) : city.name === "Vannes" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Vannes (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques rapides et sobres pour les artisans, prestataires du
          nautisme, du tourisme, de l&apos;agroalimentaire et les petites structures orientées numérique/cyber. L&apos;objectif : une présence claire
          qui rassure vos clients autour du Golfe du Morbihan (Vannes, Auray, Sarzeau), sans usine à gaz ni back‑office lourd.
        </p>
      ) : city.name === "Montauban" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Montauban (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques rapides et sobres pour les artisans, TPE et PME de
          l&apos;agroalimentaire, de l&apos;aéronautique et de la logistique en Tarn-et-Garonne. L&apos;objectif : être visible lorsqu&apos;on cherche votre
          métier + Montauban ou Tarn-et-Garonne, avec un site clair, rassurant et sans usine à gaz technique.
        </p>
      ) : city.name === "Paris" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Paris (agglo {city.populationAgglo}), nous concevons des sites vitrines statiques sobres et rapides pour les avocats, experts-comptables,
          cabinets de conseil et petites structures B2B. L&apos;objectif : clarifier votre offre, rassurer vos prospects et limiter la complexité technique
          dans un environnement très concurrentiel.
        </p>
      ) : (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À {city.name} (agglo {city.populationAgglo}), nous concevons ou refondons des sites vitrines statiques rapides, stables et
          simples à maintenir pour les artisans, indépendants et TPE des secteurs {sectorsSentence}. L&apos;objectif:
          expliquer clairement vos services locaux, rassurer vos prospects et générer des demandes, sans usine à gaz
          technique ni maintenance lourde.
        </p>
      )}

      {/* Intro CTA */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <BookingButton className="rounded-full" size="lg" label={`Audit gratuit — ${city.name} et alentours`} />
        <Button asChild className="rounded-full" variant="secondary">
          <Link href="/tarifs-2025">Voir les tarifs 2026</Link>
        </Button>
        {PHONE_NUMBER_PUBLIC && (
          <Button asChild className="rounded-full" variant="ghost">
            <a href={`tel:${PHONE_NUMBER_PUBLIC.replace(/[^+\d]/g, "")}`}>Appeler pour en parler</a>
          </Button>
        )}
      </div>

      {/* Body */}
      <article className="mt-10 rounded-[28px] border bg-card p-6 card-elevated space-y-8">
        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Pour quels types d&apos;entreprises à {city.name} ?
          </h2>
          <p className="mt-2 text-foreground/80">
            {city.name === "Paris"
              ? "Notre offre de création de site internet à Paris est pensée pour les professions libérales (avocats, experts-comptables, notaires), les consultants et les petites structures B2B qui veulent un site vitrine clair, rapide et sobre pour présenter leurs expertises, leurs équipes et faciliter la prise de rendez-vous."
              : `Notre offre de création de site internet à ${city.name} est pensée pour les artisans, professions libérales et TPE locales qui veulent un site vitrine clair, rapide et simple à maintenir\u00a0: plomberie, électricité, textile, industrie mécanique, agroalimentaire, conseil, coaching, etc. Nous adaptons le ton et les exemples à votre réalité de terrain.`}
          </p>
        </section>
        {city.name === "Niort" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi me choisir plutôt qu&apos;une agence web à Niort ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Niort, beaucoup de sites sont gérés par de grosses structures ou des solutions toutes faites. Je prends le temps de
              comprendre votre activité (mutuelles, assurances, services B2B ou artisanat) et de la traduire en pages simples, sobres
              et efficaces.
            </p>
            <p className="mt-2 text-foreground/80">
              Vous parlez à une seule personne du premier échange à la mise en ligne. Le périmètre est clair, le planning aussi, et le
              site reste léger : pas de plugins exotiques, pas de back-office compliqué, mais un site vitrine statique taillé pour le
              local.
            </p>
          </section>
        )}
        {city.name === "Brive-la-Gaillarde" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi travailler avec un studio plutôt qu&apos;une grosse agence à Brive ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Brive-la-Gaillarde et en Corrèze, beaucoup de sites ont été faits il y a plusieurs années, parfois par des agences
              qui ne suivent plus vraiment le projet. Ici, on reste sur un périmètre clair : un site vitrine statique rapide, centré
              sur vos services et vos preuves, sans couche technique superflue.
            </p>
            <p className="mt-2 text-foreground/80">
              Vous avez un interlocuteur unique, du premier échange au lancement. On parle délais, budget et contenu de manière
              concrète, puis on avance sans surprise, avec un site pensé pour les recherches locales autour de Brive, Tulle, Ussel et
              la vallée de la Corrèze.
            </p>
          </section>
        )}
        {city.name === "Cholet" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique pour le Choletais ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Cholet, beaucoup d&apos;entreprises évoluent dans le textile, la mode, l&apos;industrie et l&apos;agroalimentaire. Un site vitrine
              statique permet de présenter clairement vos offres, vos collections ou vos services, sans multiplier les plugins ni les
              couches techniques difficiles à maintenir.
            </p>
            <p className="mt-2 text-foreground/80">
              L&apos;objectif : une présence en ligne sobre et efficace qui rassure vos clients B2B ou B2C, optimisée pour les recherches
              locales autour de Cholet, Maulévrier, Mortagne-sur-Sèvre et le bassin choletais.
            </p>
          </section>
        )}
        {city.name === "Vannes" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique pour Vannes et le Golfe du Morbihan ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Vannes et autour du Golfe du Morbihan, beaucoup d&apos;activités reposent sur le nautisme, le tourisme, l&apos;agroalimentaire
              et les services numériques. Un site vitrine statique permet de présenter clairement vos prestations, vos photos et vos
              avis sans vous enfermer dans une usine à gaz technique.
            </p>
            <p className="mt-2 text-foreground/80">
              L&apos;objectif : une présence en ligne rapide et lisible, qui répond aux recherches locales autour de Vannes, Auray, Sarzeau
              et du Morbihan, tout en restant simple à maintenir au quotidien.
            </p>
          </section>
        )}
        {city.name === "Paris" && (
          <>
            <section>
              <h2 className="font-heading text-2xl font-semibold">
                Pourquoi un site vitrine statique à Paris plutôt qu’une grosse agence web ?
              </h2>
              <p className="mt-2 text-foreground/80">
                À Paris, beaucoup de sites de cabinets et de petites structures B2B sont réalisés par des agences web sur des CMS lourds
                (WordPress, Prestashop, usines à plugins), avec de nombreuses pages peu utiles et une maintenance permanente. Si vous ne
                faites ni e‑commerce ni campagne marketing à grande échelle, cette complexité n&apos;est pas toujours nécessaire.
              </p>
              <p className="mt-2 text-foreground/80">
                Un site vitrine statique vous permet de concentrer l&apos;effort sur le contenu, la clarté de vos offres et la prise de
                contact (rendez‑vous, formulaires), sans accumuler les dépendances techniques. L&apos;objectif : une présence en ligne nette
                et professionnelle, qui parle à vos clients (avocats, conseils, professions libérales) et reste simple à faire évoluer
                au fil de vos dossiers, sans budget technique disproportionné.
              </p>
            </section>
            <section>
              <h2 className="font-heading text-2xl font-semibold">
                Cas concret : BMS Ventousage, niche B2B visible sur « ventousage Paris »
              </h2>
              <p className="mt-2 text-foreground/80">
                Exemple réel : BMS Ventousage, entreprise de ventousage pour tournages cinéma. Secteur ultra‑niche, concurrence forte sur Paris.
                Budget : 2 490€ (Offre Professionnelle). Six pages (Accueil, Services, Secteurs, Projets, À propos, Contact), design sur‑mesure,
                contenus rédigés et optimisés pour les expressions clés (« ventousage cinéma Paris », « ventouseur Paris », etc.).
              </p>
              <p className="mt-2 text-foreground/80">
                Résultat en quatre mois selon Google Search Console : positions 2 à 10 sur des requêtes comme « ventousage Paris » et « ventouseur Paris »,
                avec un site vitrine statique ultra‑rapide (LCP &lt; 1s). Deux demandes de devis qualifiées dès les premiers mois dans un marché très ciblé.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                C&apos;est ce type de stratégie que nous mettons en place pour vos propres requêtes professionnelles à Paris et en Île‑de‑France
                (avocat, expert‑comptable, consultant, cabinet spécialisé, etc.).
              </p>
            </section>
          </>
        )}
        {city.name === "Montauban" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Montauban (Tarn-et-Garonne) ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Montauban, entre Toulouse et le reste de l&apos;Occitanie, beaucoup d&apos;entreprises évoluent dans l&apos;agroalimentaire,
              l&apos;aéronautique et la logistique. Un site vitrine statique permet de présenter clairement vos prestations, vos références
              et vos services B2B, sans multiplier les couches techniques difficiles à maintenir.
            </p>
            <p className="mt-2 text-foreground/80">
              L&apos;objectif : une présence en ligne sobre et efficace qui rassure vos clients et partenaires, optimisée pour les recherches
              locales autour de Montauban, du Tarn-et-Garonne et du bassin toulousain.
            </p>
          </section>
        )}
        <section>
          <h2 className="font-heading text-2xl font-semibold">
            Combien investir dans un site vitrine à {city.name} en 2026&nbsp;?
          </h2>
          <p className="mt-2 text-foreground/80">
            En 2026, la plupart des sites vitrines statiques pour artisans et TPE à {city.name} se situent entre 1 490€ et 2 490€ TTC,
            selon le nombre de pages, la quantité de contenu à intégrer et les fonctionnalités (formulaire, prises de rendez-vous, cas clients…).
            Les projets plus complets avec plus de contenu et de cas clients peuvent monter à 4 990€ TTC.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Détails des offres et exemples concrets sur la page{" "}
            <Link href="/tarifs-2025#tarifs" className="text-primary hover:underline">
              Tarifs&nbsp;2026
            </Link>
            .
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pour aller plus loin sur l’affichage de vos prix, vous pouvez aussi lire{" "}
            <Link href="/blog/afficher-prix-site-vitrine-2026" className="text-primary hover:underline">
              l’article sur la page Tarifs en 2026
            </Link>
            .
          </p>
          {city.name === "Paris" && (
            <p className="mt-1 text-xs text-muted-foreground">
              Pour comparer freelance, agence et builder No‑Code à Paris, vous pouvez aussi lire{" "}
              <Link
                href="/blog/freelance-agence-builder-comparatif"
                className="text-primary hover:underline"
              >
                ce comparatif détaillé
              </Link>
              .
            </p>
          )}
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold">Nos formules 2026 pour {city.name}</h2>
          <div className="mt-2 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-background/60 p-4 text-left">
              <h3 className="text-lg font-semibold">Essentiel</h3>
              <p className="mt-1 text-sm text-foreground/80">
                Présence claire en ligne pour artisans et TPE : 4–6 pages (Accueil, Services, À propos, Contact), formulaire simple,
                textes structurés pour le SEO local.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Idéal si vous démarrez ou si vous avez un ancien site très simple à remplacer.
              </p>
            </div>
            <div className="rounded-2xl border bg-background/60 p-4 text-left">
              <h3 className="text-lg font-semibold">Professionnel</h3>
              <p className="mt-1 text-sm text-foreground/80">
                Plus de contenu et de preuves : blog ou actualités, FAQ, cas clients, sections services détaillées pour mieux convertir vos visiteurs.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Pour les entreprises qui veulent expliquer en profondeur leur offre et rassurer avant le contact.
              </p>
            </div>
            <div className="rounded-2xl border bg-background/60 p-4 text-left">
              <h3 className="text-lg font-semibold">Premium</h3>
              <p className="mt-1 text-sm text-foreground/80">
                Projet sur‑mesure plus exigeant : beaucoup de pages ou de cas clients, bilingue, intégrations spécifiques, travail éditorial accompagné.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Pour les structures qui ont déjà de la matière et veulent un site de référence complet.
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Les prix exacts dépendent de votre projet. La plupart des sites se situent dans les fourchettes Essentiel / Professionnel / Premium de la page{" "}
            <Link href="/tarifs-2025#tarifs" className="text-primary hover:underline">
              Tarifs&nbsp;2026
            </Link>
            .
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