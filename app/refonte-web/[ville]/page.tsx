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
  let title = `Refonte de site internet à ${city.name} — WordPress lent → site vitrine statique rapide (2026)`;
  let description = `Refonte de sites internet à ${city.name} pour artisans, TPE et PME des secteurs ${sectors}. Passage d'un site lourd (souvent WordPress) vers un site vitrine statique plus rapide, plus clair et plus simple à maintenir. Devis gratuit. Budget de refonte établi uniquement sur devis.`;

  if (city.slug === "niort") {
    title = "Refonte de site web à Niort — WordPress lent → site vitrine statique rapide (2026)";
    description =
      "Refonte de site web / site internet à Niort pour artisans, TPE et acteurs des mutuelles et services B2B. Passage d'un WordPress lent à un site vitrine statique rapide, stable et plus simple à maintenir, sans perdre votre référencement local. Budget sur devis après audit.";
  } else if (city.slug === "brive-la-gaillarde") {
    description =
      "Refonte de sites internet et de sites web à Brive-la-Gaillarde pour artisans, TPE et petites entreprises de l’agroalimentaire, de la logistique et du tourisme vert en Corrèze. Passage d'un WordPress lent ou d'un ancien site vers un site vitrine statique rapide, stable et plus simple à maintenir, sans perdre votre référencement local. Audit et budget sur devis.";
  } else if (city.slug === "cholet") {
    title = "Audit et refonte de site web à Cholet — WordPress lent → vitrine statique rapide (2026)";
    description =
      "Audit et refonte de sites web / sites internet à Cholet pour artisans, commerçants et PME du textile, de la mode, de la mécanique et de l’agroalimentaire. Analyse de votre site actuel, diagnostic SEO local dans le Choletais puis migration vers une vitrine statique rapide, claire et simple à gérer. Audit préliminaire et devis sur mesure.";
  } else if (city.slug === "vannes") {
    description =
      "Refonte de sites internet à Vannes pour artisans, prestataires du nautisme, du tourisme, de l’agroalimentaire et acteurs du numérique/cyber. Passage d’un WordPress lent ou d’un ancien site vers une vitrine statique rapide, claire et plus simple à gérer, avec un soin particulier apporté au référencement local autour du Golfe du Morbihan (Vannes, Auray, Sarzeau). Budget sur devis.";
  } else if (city.slug === "paris") {
    description =
      "Refonte de sites internet à Paris pour avocats, experts-comptables, consultants et petites entreprises B2B. Passage d’un WordPress lent ou trop chargé vers une vitrine statique rapide, sobre et plus simple à gérer, avec un soin particulier apporté au référencement local et sectoriel. Budget sur devis.";
  } else if (city.slug === "montauban") {
    description =
      "Refonte de sites internet et de sites web à Montauban pour artisans, TPE et PME de l’agroalimentaire, de l’aéronautique et de la logistique en Tarn-et-Garonne. Passage d’un WordPress lent ou d’un ancien site vers une vitrine statique rapide, claire et plus simple à gérer, avec un soin particulier apporté au référencement local autour de Montauban et du bassin toulousain. Budget sur devis.";
  }

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
      url: absoluteUrl(`/refonte-web/${city.slug}`),
    },
  };
}

function toSentence(list: string[]): string {
  if (list.length <= 1) return list.join("");
  const head = list.slice(0, -1).join(", ");
  const tail = list[list.length - 1];
  return `${head} et ${tail}`;
}

const faqForCityRefonte = (cityName: string) => {
  const items = [
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

  if (cityName === "Niort") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients situés à Niort ?",
        a: "Non. Je travaille avec des artisans, indépendants et petites structures partout en France. Mais je connais bien les enjeux des villes comme Niort : marché local, bouche-à-oreille, besoin d’être trouvé sur quelques requêtes clés comme votre métier + Niort, sans exploser le budget.",
      },
      {
        q: "Combien de temps dure un projet de création ou de refonte de site à Niort ?",
        a: "Pour un site vitrine simple, comptez en général 3 à 5 semaines, selon la rapidité avec laquelle vous validez les textes et les maquettes. Pour une refonte avec beaucoup de contenus à reprendre, on est plutôt sur 6 à 8 semaines.",
      },
      {
        q: "Puis-je modifier moi-même mon site après la refonte ?",
        a: "Oui. Même si le site est statique, je peux vous proposer une manière simple de mettre à jour certains contenus (textes clés, tarifs, FAQ) sans toucher au code. Et si vous préférez déléguer, je peux aussi m’en charger ponctuellement.",
      }
    );
  }

  if (cityName === "Brive-la-Gaillarde") {
    items.push(
      {
        q: "Intervenez-vous uniquement à Brive-la-Gaillarde pour les refontes ?",
        a: "Non. Je peux vous accompagner si votre entreprise est basée à Brive-la-Gaillarde, Tulle, Ussel ou dans les environs, ainsi que sur certaines communes de Dordogne. Les échanges se font principalement en visio ou par téléphone.",
      },
      {
        q: "Que se passe-t-il pour mon ancien site pendant la refonte ?",
        a: "Nous gardons votre ancien site en ligne le temps de préparer le nouveau. Au moment du basculement, nous mettons en place les redirections nécessaires pour que vos anciennes URL utiles pointent vers les nouvelles pages, sans casser votre référencement local.",
      },
      {
        q: "La refonte peut-elle faire baisser mon référencement local ?",
        a: "L’objectif est inverse : stabiliser et améliorer votre présence locale. Nous conservons les contenus qui fonctionnent, simplifions l’architecture et ajoutons des redirections propres. Cela évite les pertes de trafic liées aux refontes mal maîtrisées.",
      }
    );
  }

  if (cityName === "Cholet") {
    items.push(
      {
        q: "Intervenez-vous uniquement à Cholet pour les refontes ?",
        a: "Non. Je peux vous accompagner si votre entreprise est basée à Cholet, Maulévrier, Mortagne-sur-Sèvre ou dans le bassin choletais en général. Les échanges se font principalement en visio ou par téléphone.",
      },
      {
        q: "Que se passe-t-il pour mon ancien site pendant la refonte à Cholet ?",
        a: "Votre ancien site reste en ligne le temps de préparer la nouvelle version. Au moment du basculement, nous mettons en place les redirections nécessaires pour que vos anciennes URL utiles pointent vers les nouvelles pages, sans casser votre référencement local.",
      },
      {
        q: "La refonte peut-elle faire baisser mon référencement local à Cholet ?",
        a: "L’objectif est plutôt de le renforcer : nous conservons les contenus qui fonctionnent, simplifions la structure et ajoutons des redirections propres. Cela limite fortement les risques de baisse liés aux refontes mal préparées.",
      }
    );
  }

  if (cityName === "Vannes") {
    items.push(
      {
        q: "Intervenez-vous uniquement à Vannes pour les refontes ?",
        a: "Non. Je peux vous accompagner si votre entreprise est basée à Vannes, Auray, Sarzeau ou plus largement autour du Golfe du Morbihan. Les échanges se font principalement en visio ou par téléphone.",
      },
      {
        q: "Quand est-il préférable de lancer une refonte de site à Vannes ?",
        a: "Pour les activités liées au tourisme ou au nautisme, l’idéal est souvent de préparer la refonte en dehors du pic de saison, afin de limiter les risques de coupure ou de stress inutile. On peut définir ensemble un calendrier réaliste.",
      },
      {
        q: "La refonte peut-elle faire baisser mon référencement local à Vannes ?",
        a: "L’objectif est au contraire de le stabiliser ou de l’améliorer : nous conservons les contenus qui fonctionnent, simplifions la structure et mettons en place des redirections propres. Cela limite les risques de perte de trafic local.",
      }
    );
  }

  if (cityName === "Paris") {
    items.push(
      {
        q: "Intervenez-vous uniquement à Paris pour les refontes ?",
        a: "Non. Je peux vous accompagner si votre cabinet est basé à Paris, en petite couronne ou ailleurs en Île-de-France. Les échanges se font principalement en visio ou par téléphone, ce qui s’intègre plus facilement dans un agenda chargé.",
      },
      {
        q: "Que se passe-t-il pour mon ancien site pendant la refonte à Paris ?",
        a: "Votre ancien site reste en ligne le temps de préparer la nouvelle version. Au moment du basculement, nous mettons en place les redirections nécessaires pour que vos anciennes URL utiles pointent vers les nouvelles pages, afin de préserver votre référencement local et sectoriel.",
      },
      {
        q: "La refonte peut-elle faire baisser mon référencement local à Paris ?",
        a: "L’objectif est au contraire de le stabiliser ou de l’améliorer : nous conservons les contenus qui fonctionnent, simplifions la structure et mettons en place des redirections propres. Cela limite les risques de perte de trafic organique, même sur un marché concurrentiel comme Paris.",
      }
    );
  }

  if (cityName === "Montauban") {
    items.push(
      {
        q: "Intervenez-vous uniquement à Montauban pour les refontes ?",
        a: "Non. Je peux vous accompagner si votre entreprise est basée à Montauban, ou plus largement dans le Tarn-et-Garonne (Moissac, Castelsarrasin, etc.) et le bassin toulousain. Les échanges se font principalement en visio ou par téléphone.",
      },
      {
        q: "Que se passe-t-il pour mon ancien site pendant la refonte à Montauban ?",
        a: "Votre ancien site reste en ligne le temps de préparer la nouvelle version. Au moment du basculement, nous mettons en place les redirections nécessaires pour que vos anciennes URL utiles pointent vers les nouvelles pages, sans casser votre référencement local.",
      },
      {
        q: "La refonte peut-elle faire baisser mon référencement local à Montauban ?",
        a: "L’objectif est au contraire de le stabiliser ou de l’améliorer : nous conservons les contenus qui fonctionnent, simplifions la structure et mettons en place des redirections propres. Cela limite les risques de perte de trafic local.",
      }
    );
  }

  return items;
};

export default function CityRefontePage({ params }: Params) {
  const city = getLocalCityBySlug(params.ville);
  if (!city) notFound();

  const sectorsSentence = toSentence(city.sectors);
  const satellitesSentence = toSentence(city.satellites);
  const cciLabel = city.cci || `CCI locale`;

  const baseH1 = `Refonte de site internet à ${city.name} pour TPE et artisans : vers un site vitrine statique plus rapide`;

  let h1 = baseH1;

  if (city.slug === "niort") {
    h1 =
      "Refonte de site web à Niort pour TPE et artisans : audit et passage à un site vitrine statique rapide";
  } else if (city.slug === "brive-la-gaillarde") {
    h1 =
      "Refonte de site web à Brive-la-Gaillarde pour TPE et artisans : audit et passage à un site vitrine statique rapide";
  } else if (city.slug === "cholet") {
    h1 = "Audit et refonte de site web à Cholet pour artisans et commerçants";
  } else if (city.slug === "montauban") {
    h1 =
      "Refonte de site internet à Montauban pour TPE et artisans : vers un site vitrine statique plus rapide";
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Refonte de site web",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_NAME,
      url: SITE_URL,
      areaServed: [city.name, ...city.satellites],
    },
    areaServed: [city.name, ...city.satellites],
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
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Refonte Web",
        item: absoluteUrl("/services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Refonte de site web à ${city.name}`,
        item: absoluteUrl(`/refonte-web/${city.slug}`),
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
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-balance">{h1}</h1>
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

      {city.name === "Niort" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Niort, nous auditons et refondons des sites internet d&apos;artisans, de TPE et de petites entreprises, mais aussi d&apos;acteurs
          des mutuelles et des services B2B. L&apos;idée : transformer un WordPress ou un ancien site lourd en vitrine statique rapide,
          lisible et plus simple à gérer, sans perdre votre référencement local.
        </p>
      ) : city.name === "Brive-la-Gaillarde" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Brive-la-Gaillarde, nous auditons et refondons des sites internet d&apos;artisans, de TPE et de petites entreprises de
          l&apos;agroalimentaire, de la logistique et du tourisme vert en Corrèze. L&apos;idée : remplacer un WordPress lent ou un ancien
          site par une vitrine statique rapide, claire et plus simple à gérer, sans perdre votre référencement local autour de
          Brive et de l&apos;axe A20.
        </p>
      ) : city.name === "Cholet" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Cholet, nous auditons et refondons des sites internet d&apos;artisans, de commerçants et de PME du textile, de la mode,
          de la mécanique et de l&apos;agroalimentaire. L&apos;idée : transformer un WordPress lent ou une ancienne vitrine en site statique
          rapide, lisible et plus simple à gérer, sans perdre votre référencement local autour du bassin choletais.
        </p>
      ) : city.name === "Vannes" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Vannes, nous auditons et refondons des sites internet d&apos;artisans, de prestataires du nautisme, du tourisme, de
          l&apos;agroalimentaire et de petites structures numériques ou cyber. L&apos;idée : remplacer un WordPress lent ou un ancien site
          par une vitrine statique rapide, lisible et plus simple à gérer, sans perdre votre référencement local autour du Golfe
          du Morbihan.
        </p>
      ) : city.name === "Montauban" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Montauban, nous auditons et refondons des sites internet d&apos;artisans, de TPE et de PME de l&apos;agroalimentaire, de
          l&apos;aéronautique et de la logistique en Tarn-et-Garonne. L&apos;idée : remplacer un WordPress lent ou un ancien site par une
          vitrine statique rapide, lisible et plus simple à gérer, sans perdre votre référencement local autour de Montauban et
          du bassin toulousain.
        </p>
      ) : city.name === "Paris" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Paris, nous auditons et refondons des sites internet d&apos;avocats, de cabinets d&apos;experts-comptables, de consultants et de
          petites structures B2B. L&apos;idée : remplacer un WordPress lent, surchargé ou vieillissant par une vitrine statique rapide,
          lisible et plus simple à gérer, sans perdre votre référencement local ni vos contenus utiles.
        </p>
      ) : (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À {city.name}, nous auditons et refondons des sites internet d&apos;artisans, TPE et petites entreprises pour les
          rendre plus rapides, plus clairs et plus simples à gérer. Notre approche: transformer un site lourd (souvent
          WordPress) en site vitrine statique performant, sans perdre vos contenus ni votre référencement local.
        </p>
      )}

      {/* Intro CTA */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <BookingButton className="rounded-full" size="lg" label={`Audit refonte — ${city.name}`} />
        <Button asChild className="rounded-full" variant="secondary">
          <Link href={`/creation-site-internet/${city.slug}`}>Besoin d’un site neuf ? Voir la création</Link>
        </Button>
        {PHONE_NUMBER_PUBLIC && (
          <Button asChild className="rounded-full" variant="ghost">
            <a href={`tel:${PHONE_NUMBER_PUBLIC.replace(/[^+\d]/g, "")}`}>Appeler pour parler de la refonte</a>
          </Button>
        )}
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

        {city.name === "Cholet" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Audit de site web à Cholet : ce que l’on vérifie avant la refonte
            </h2>
            <p className="mt-2 text-foreground/80">
              Vitesse et expérience mobile de votre site actuel, clarté des pages clés pour un artisan ou commerçant
              choletais, et SEO local sur des requêtes comme « votre métier + Cholet ». L’audit permet d’objectiver ces
              points avant de décider d’une refonte complète.
            </p>
          </section>
        )}

        {city.name === "Niort" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              À Niort aussi, certains signes montrent que votre site vous fait perdre des clients
            </h2>
            <p className="mt-2 text-foreground/80">
              Quelques signaux fréquents : la page d&apos;accueil met plus de 3 secondes à charger sur mobile, vous hésitez à
              toucher au contenu de peur de tout casser, l&apos;agence ou la personne qui a fait le site n&apos;est plus disponible,
              ou vous payez une maintenance WordPress sans vraiment savoir ce qui est fait.
            </p>
            <p className="mt-2 text-foreground/80">
              Dans ces cas-là, une refonte vers un site vitrine statique rapide, simple et lisible remet votre présence en ligne
              au niveau de la qualité de votre travail, sans usine à gaz technique.
            </p>
          </section>
        )}

        {city.name === "Brive-la-Gaillarde" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              À Brive-la-Gaillarde, quelques signes montrent que votre site mérite une refonte
            </h2>
            <p className="mt-2 text-foreground/80">
              Quelques signaux fréquents : votre site met longtemps à charger sur mobile, la navigation n&apos;est pas claire, vous
              n&apos;osez plus toucher au contenu, ou l&apos;agence qui l&apos;a réalisé n&apos;assure plus vraiment de suivi. Pendant ce temps,
              vos prospects vous cherchent sur Google autour de Brive et de la Corrèze.
            </p>
            <p className="mt-2 text-foreground/80">
              Une refonte vers un site vitrine statique rapide et sobre remet votre présence en ligne au niveau des attentes de vos
              clients, sans couche technique inutile. L&apos;objectif : garder l&apos;essentiel (nom de domaine, contenus utiles,
              référencement local) et enlever le reste.
            </p>
          </section>
        )}

        {city.name === "Vannes" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              À Vannes, certains signes montrent que votre site ne suit plus vos saisons
            </h2>
            <p className="mt-2 text-foreground/80">
              Quelques signaux fréquents : un site lent en pleine saison touristique, des pages peu claires sur mobile, des offres
              ou des tarifs plus à jour, ou une agence qui n&apos;a plus vraiment le temps de suivre votre projet. Résultat : vos
              prospects passent à côté, alors qu&apos;ils cherchent des prestations autour du Golfe du Morbihan.
            </p>
            <p className="mt-2 text-foreground/80">
              Une refonte vers un site vitrine statique rapide et lisible permet de remettre votre présence en ligne au niveau des
              attentes de vos clients, tout en gardant l&apos;essentiel (nom de domaine, contenus utiles, référencement local) et en
              simplifiant le reste.
            </p>
          </section>
        )}

        {city.name === "Paris" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              À Paris, certains signes montrent que votre site ne reflète plus votre positionnement
            </h2>
            <p className="mt-2 text-foreground/80">
              Quelques signaux fréquents : un site lent sur mobile, une navigation confuse, un design qui date ou des contenus qui
              ne correspondent plus à vos offres actuelles. En parallèle, vos confrères et concurrents soignent davantage leur présence en ligne.
            </p>
            <p className="mt-2 text-foreground/80">
              Une refonte vers un site vitrine statique rapide et sobre permet de retrouver un site aligné avec votre niveau
              d&apos;exigence, tout en gardant l&apos;essentiel (nom de domaine, contenus utiles, référencement local et sectoriel) et en
              simplifiant la couche technique.
            </p>
          </section>
        )}

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
            Combien investir dans une refonte à {city.name} en 2026&nbsp;?
          </h2>
          <p className="mt-2 text-foreground/80">
            En 2026, le budget d’une refonte pour artisans et TPE à {city.name} dépend surtout de la taille du site, de la
            complexité du SEO à reprendre et de la quantité de contenu à retravailler. Les projets plus simples (peu de pages,
            peu d&apos;historique) nécessitent un investissement plus léger que les refontes complètes.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Les prix exacts sont désormais établis uniquement sur devis, après un audit initial de votre site et un échange sur vos priorités.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pour préparer votre projet, vous pouvez aussi lire{" "}
            <Link
              href="/blog/refonte-wordpress-vers-site-statique-migration-seo"
              className="text-primary hover:underline"
            >
              comment migrer d’un WordPress lent vers un site statique
            </Link>{" "}
            et{" "}
            <Link href="/blog/audit-refonte-site-vitrine-25-points" className="text-primary hover:underline">
              l’audit refonte en 25 points
            </Link>
            .
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pour le détail du{" "}
            <Link href="/blog/cout-maintenance-site-web" className="text-primary hover:underline">
              coût de maintenance d’un site internet
            </Link>{" "}
            et des{" "}
            <Link href="/blog/frais-caches-site-internet" className="text-primary hover:underline">
              frais cachés d’un site internet sur 3 ans
            </Link>
            , vous pouvez consulter les articles dédiés du blog.
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