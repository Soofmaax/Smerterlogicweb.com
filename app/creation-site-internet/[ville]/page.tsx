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
  let description = `Création de sites vitrines statiques à ${city.name} pour artisans, TPE et PME des secteurs ${sectors}. Audit et devis gratuits. Budget établi uniquement sur devis, après un premier échange.`;

  if (city.slug === "niort") {
    description =
      "Création de sites vitrines statiques à Niort pour artisans, indépendants et PME des mutuelles, assurances, fintech et tertiaire. Sites rapides, clairs et simples à maintenir. Budget sur devis, après audit rapide.";
  } else if (city.slug === "brive-la-gaillarde") {
    description =
      "Création de sites vitrines statiques à Brive-la-Gaillarde pour artisans, TPE et petites entreprises de l’agroalimentaire, de la logistique et du tourisme vert en Corrèze. Sites rapides, clairs et simples à maintenir, pensés pour être trouvés sur les recherches locales. Budget sur devis.";
  } else if (city.slug === "cholet") {
    description =
      "Création de sites vitrines statiques à Cholet pour artisans, commerçants et PME du textile, de la mode, de la mécanique et de l’agroalimentaire. Sites rapides, sobres et simples à maintenir, pensés pour le référencement local dans le Choletais. Budget sur devis.";
  } else if (city.slug === "vannes") {
    description =
      "Création de sites vitrines statiques à Vannes pour artisans, prestataires du nautisme, du tourisme et de l’agroalimentaire, ainsi que petites structures orientées numérique/cyber. Sites rapides, sobres et simples à maintenir, pensés pour le référencement local autour du Golfe du Morbihan (Vannes, Auray, Sarzeau). Budget sur devis.";
  } else if (city.slug === "paris") {
    title =
      "Création de site internet à Paris — sites vitrines statiques pour avocats, experts-comptables et cabinets (2026)";
    description =
      "Création de sites vitrines statiques à Paris pour avocats, experts-comptables, cabinets de conseil et petites structures B2B. Sites sobres, rapides et simples à maintenir, pensés pour les recherches locales et sectorielles à Paris et en Île-de-France. Budget sur devis, adapté à votre cabinet.";
  } else if (city.slug === "boulogne-billancourt") {
    description =
      "Création de sites vitrines statiques à Boulogne-Billancourt pour cabinets, agences média, startups et TPE de services. Sites sobres, rapides et simples à maintenir, pensés pour les recherches locales autour de Boulogne, Issy-les-Moulineaux et l’ouest parisien. Budget sur devis.";
  } else if (city.slug === "saint-denis") {
    description =
      "Création de sites vitrines statiques à Saint-Denis pour acteurs de l’événementiel (Stade de France et alentours), industriels, logisticiens et structures publiques ou associatives. Sites rapides, clairs et simples à maintenir, pensés pour les recherches locales en Seine-Saint-Denis. Budget sur devis.";
  } else if (city.slug === "issy-les-moulineaux") {
    description =
      "Création de sites vitrines statiques à Issy-les-Moulineaux pour agences médias, sociétés de télécoms, startups et TPE de services B2B. Sites sobres, rapides et simples à maintenir, pensés pour les recherches locales entre Issy, Boulogne et Paris 15e. Budget sur devis.";
  } else if (city.slug === "levallois-perret") {
    description =
      "Création de sites vitrines statiques à Levallois-Perret pour agences de communication, cabinets de conseil, structures de services B2B et indépendants. Sites clairs, rapides et faciles à mettre à jour, pensés pour les recherches locales autour de Levallois, Neuilly et Paris 17e. Budget sur devis.";
  } else if (city.slug === "neuilly-sur-seine") {
    description =
      "Création de sites vitrines statiques à Neuilly-sur-Seine pour avocats, cabinets de gestion de patrimoine, professions libérales et petites structures B2B. Sites sobres, rapides et rassurants, pensés pour une clientèle exigeante de l’ouest parisien. Budget sur devis.";
  } else if (city.slug === "courbevoie") {
    description =
      "Création de sites vitrines statiques à Courbevoie pour entreprises de services B2B, cabinets de conseil, ESN, finance et assurance autour de La Défense. Sites rapides, lisibles et orientés conversion, pensés pour vos prospects professionnels. Budget sur devis.";
  } else if (city.slug === "nanterre") {
    description =
      "Création de sites vitrines statiques à Nanterre pour cabinets, services B2B, structures liées aux institutions et au campus. Sites clairs, rapides et simples à maintenir, pensés pour les recherches locales entre Nanterre, La Défense et Rueil-Malmaison. Budget sur devis.";
  } else if (city.slug === "creteil") {
    description =
      "Création de sites vitrines statiques à Créteil pour acteurs publics, structures de santé, cabinets et services éducatifs. Sites sobres, accessibles et rapides, pensés pour informer clairement vos usagers, patients ou étudiants. Budget sur devis.";
  } else if (city.slug === "versailles") {
    description =
      "Création de sites vitrines statiques à Versailles pour professions libérales, cabinets, acteurs du tourisme et de la culture. Sites élégants, rapides et simples à gérer, pensés pour une clientèle locale et internationale. Budget sur devis.";
  } else if (city.slug === "cergy") {
    description =
      "Création de sites vitrines statiques à Cergy pour PME de services, structures d’enseignement supérieur et acteurs publics de l’agglomération de Cergy-Pontoise. Sites rapides, clairs et orientés prise de contact. Budget sur devis.";
  } else if (city.slug === "montreuil") {
    description =
      "Création de sites vitrines statiques à Montreuil pour associations, structures de l’ESS, collectifs culturels et TPE de services locaux. Sites sobres, rapides et simples à maintenir, pensés pour vos publics à Montreuil, Bagnolet et l’est parisien. Budget sur devis.";
  } else if (city.slug === "montauban") {
    description =
      "Création de sites vitrines statiques à Montauban pour artisans, TPE et PME de l’agroalimentaire, de l’aéronautique et de la logistique en Tarn-et-Garonne. Sites rapides, clairs et simples à maintenir, pensés pour être trouvés sur les recherches locales autour de Montauban et du bassin toulousain. Budget sur devis.";
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
      a: `Pour un site vitrine statique, le budget dépend surtout du nombre de pages, de la quantité de contenu et des fonctionnalités (formulaire, galeries, prise de rendez-vous). Tous les projets sont désormais chiffrés uniquement sur devis détaillé après un premier échange, sans grille publique.`,
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
        q: "Un site vitrine à Paris doit-il forcément coûter 15 000€ ou plus ?",
        a: "Non. Les budgets à 15 000€ ou 20 000€ que l’on voit sur les sites d’agence à Paris correspondent souvent à des projets très complets (équipe pluridisciplinaire, ateliers longs, e‑commerce, intégrations complexes, etc.). Pour un site vitrine statique ciblé professions libérales ou TPE B2B, un budget plus raisonnable suffit généralement, à définir sur devis. L’essentiel se joue sur le contenu, la clarté de l’offre et la vitesse du site, pas sur la complexité technique.",
      },
      {
        q: "En quoi êtes-vous différent d’une agence web à Paris ?",
        a: "Je ne suis pas une grosse agence web avec des équipes et des process lourds, mais un studio spécialisé en sites vitrines statiques sobres pour professions libérales et TPE B2B. Vous échangez directement avec la personne qui conçoit et réalise le site, le périmètre est clair, et on évite les fonctionnalités inutiles qui complexifient la maintenance.",
      }
    );
  }

  if (cityName === "Boulogne-Billancourt") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients basés à Boulogne-Billancourt ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Boulogne-Billancourt, Issy-les-Moulineaux, Paris 16e ou plus largement dans l’ouest parisien. Les échanges se font principalement en visio ou par téléphone, ce qui permet d’avancer vite malgré des agendas chargés.",
      },
      {
        q: "Votre approche convient-elle aux agences média et startups tech de Boulogne-Billancourt ?",
        a: "Oui. Les sites vitrines statiques sont particulièrement adaptés aux agences, studios et startups : pages claires, mise en avant de vos références, temps de chargement rapides et structure pensée pour le SEO sur vos mots-clés de niche plutôt que sur des dizaines de pages inutiles.",
      },
      {
        q: "Pouvez-vous reprendre un site existant (WordPress, Joomla…) basé à Boulogne-Billancourt ?",
        a: "Oui. Je peux auditer votre site existant et, si nécessaire, proposer une refonte vers un site vitrine statique plus léger. L’objectif est de simplifier la technique, d’améliorer la vitesse et de garder uniquement ce qui sert vos prospects.",
      }
    );
  }

  if (cityName === "Issy-les-Moulineaux") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des entreprises d’Issy-les-Moulineaux ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Issy-les-Moulineaux, Boulogne-Billancourt, Paris 15e ou plus largement dans l’ouest parisien. Les échanges se font majoritairement en visio, ce qui s’intègre bien à votre organisation déjà très digitale.",
      },
      {
        q: "Votre approche convient-elle aux médias, télécoms et startups à Issy ?",
        a: "Oui. Les sites vitrines statiques sont particulièrement adaptés aux entreprises des médias, télécoms, numériques ou services B2B : peu de dépendances techniques, un socle rapide et une concentration sur le contenu qui compte vraiment pour vos prospects.",
      },
      {
        q: "Pouvez-vous travailler avec une équipe produit ou marketing déjà structurée ?",
        a: "Oui. Je peux intervenir comme renfort externe pour structurer l’arborescence, rédiger ou challenger les contenus et intégrer le site vitrine à votre écosystème (outils de prise de rendez-vous, newsletter, CRM léger) sans tout complexifier.",
      }
    );
  }

  if (cityName === "Levallois-Perret") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des entreprises situées à Levallois-Perret ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Levallois-Perret, Neuilly, Clichy ou Paris ouest. L’essentiel se passe en visio ou par téléphone, ce qui limite les pertes de temps en déplacements.",
      },
      {
        q: "Votre approche convient-elle aux agences et cabinets à Levallois ?",
        a: "Oui. Les agences de communication, cabinets de conseil, indépendants et TPE de services ont besoin de sites clairs, rapides, qui reflètent leur sérieux sans exiger une refonte permanente. C’est exactement le terrain de jeu des sites vitrines statiques que je conçois.",
      },
      {
        q: "Pouvez-vous m’aider si mon site actuel a déjà été fait par une grosse agence ?",
        a: "Oui. Nous pouvons partir d’un audit de votre site actuel (contenus, structure, technique) et décider ensemble s’il faut garder certains éléments ou repartir sur un site vitrine statique plus simple, plus rapide et plus facile à mettre à jour.",
      }
    );
  }

  if (cityName === "Neuilly-sur-Seine") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients basés à Neuilly-sur-Seine ?",
        a: "Non. Je peux vous accompagner si vous êtes à Neuilly, Paris 16e, Levallois ou dans les environs. Les rendez-vous se font facilement en visio, ce qui permet d’avancer sans contraintes logistiques.",
      },
      {
        q: "Votre approche convient-elle aux professions libérales à Neuilly ?",
        a: "Oui. Les professions libérales, cabinets de conseil et de gestion de patrimoine ont besoin de sites sobres, crédibles et très lisibles. Les sites vitrines statiques permettent d’obtenir ce résultat sans multiplier les plugins et les risques de panne.",
      },
      {
        q: "Pouvez-vous travailler sous contrainte de discrétion sur les cas clients ?",
        a: "Oui. Nous pouvons travailler avec des exemples anonymisés, des formulations prudentes et des contenus validés par vos juristes ou votre conformité, tout en gardant un site attractif et clair pour vos prospects.",
      }
    );
  }

  if (cityName === "Courbevoie") {
    items.push(
      {
        q: "Intervenez-vous pour des sociétés situées autour de La Défense (Courbevoie, Puteaux, etc.) ?",
        a: "Oui. Je peux vous accompagner si vous êtes basé à Courbevoie, Puteaux, La Défense ou dans les communes proches. Les échanges se font en visio, ce qui est particulièrement adapté aux agendas serrés des équipes conseil, ESN ou finance.",
      },
      {
        q: "Votre approche convient-elle aux ESN, cabinets de conseil et acteurs de la finance ?",
        a: "Oui. Un site vitrine statique est parfaitement adapté pour présenter vos offres, vos expertises sectorielles et vos références, avec un temps de chargement court et une structure claire, sans architecture complexe de portail.",
      },
      {
        q: "Pouvez-vous intégrer ou reprendre un blog existant orienté expertise ?",
        a: "Oui. Nous pouvons soit intégrer quelques articles clés à la nouvelle structure, soit garder votre blog séparé et faire du site vitrine la porte d’entrée claire vers vos contenus d’expertise.",
      }
    );
  }

  if (cityName === "Nanterre") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des structures basées à Nanterre ?",
        a: "Non. Je peux vous accompagner si vous êtes à Nanterre, Rueil-Malmaison, La Défense ou dans les villes voisines. Les rendez-vous se font en visio ou par téléphone.",
      },
      {
        q: "Votre approche convient-elle aux structures proches des institutions (université, justice, etc.) ?",
        a: "Oui. Les structures proches des institutions, des universités ou de la justice ont besoin de sites clairs, sérieux et simples d’usage. Un site vitrine statique répond très bien à ces besoins sans exiger une grosse équipe technique.",
      },
      {
        q: "Pouvez-vous travailler avec des équipes qui manquent de temps pour rédiger ?",
        a: "Oui. Je peux vous aider à structurer et à rédiger les contenus principaux à partir d’entretiens courts, afin de ne pas ajouter une charge rédactionnelle lourde à vos équipes.",
      }
    );
  }

  if (cityName === "Saint-Denis") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des structures basées à Saint-Denis ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Saint-Denis, Saint-Ouen, Aubervilliers ou ailleurs en Seine-Saint-Denis. Les rendez-vous se font surtout en visio, ce qui convient bien aux équipes qui ont peu de temps disponible.",
      },
      {
        q: "Votre approche convient-elle aux acteurs autour du Stade de France (événementiel, sécurité, logistique) ?",
        a: "Oui. Les sites vitrines statiques conviennent très bien aux entreprises de l’événementiel, de la sécurité, de la logistique et aux associations : pages claires, mise en avant de vos prestations, formulaires simples et contenus structurés pour des recherches locales comme votre métier + Saint-Denis.",
      },
      {
        q: "Pouvez-vous travailler avec des collectivités ou associations basées à Saint-Denis ?",
        a: "Oui. Je peux adapter le ton, la structure et les contraintes de votre site aux réalités des collectivités, associations ou structures publiques : accessibilité, clarté de l’information, formulaires de contact simples et pages faciles à parcourir sur mobile.",
      }
    );
  }

  if (cityName === "Créteil") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des acteurs publics ou médicaux à Créteil ?",
        a: "Non. Je peux vous accompagner si vous êtes un service public, une structure de santé, un cabinet ou une entreprise privée basée à Créteil ou dans le Val-de-Marne. L’important est d’avoir un besoin de site vitrine clair et maîtrisable.",
      },
      {
        q: "Votre approche convient-elle aux besoins d’accessibilité et d’information des usagers ?",
        a: "Oui. Nous nous concentrons sur une structure lisible, des contenus clairs et une performance correcte, ce qui est essentiel pour des sites destinés à des usagers, patients ou familles qui consultent souvent sur mobile.",
      },
      {
        q: "Pouvez-vous travailler à partir de documents internes ou de plaquettes existantes ?",
        a: "Oui. Nous pouvons partir de vos plaquettes, documents internes ou pages existantes pour construire un site vitrine plus synthétique et plus facile à parcourir.",
      }
    );
  }

  if (cityName === "Cergy") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des structures basées à Cergy-Pontoise ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Cergy, Pontoise ou dans les communes voisines. Les échanges se font principalement en visio, ce qui simplifie l’organisation.",
      },
      {
        q: "Votre approche convient-elle aux PME de services et structures d’enseignement ?",
        a: "Oui. Les PME de services et les structures d’enseignement supérieur ont besoin de sites clairs, rapides et faciles à gérer au quotidien. Un site vitrine statique répond très bien à ces besoins sans complexifier votre organisation.",
      },
      {
        q: "Pouvez-vous m’aider si je n’ai pas de service communication dédié ?",
        a: "Oui. Nous pouvons vous accompagner sur l’arborescence, le choix des rubriques et la rédaction d’une première version des contenus, afin que vous n’ayez pas tout à faire seul.",
      }
    );
  }

  if (cityName === "Versailles") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients de Versailles et des Yvelines ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Versailles, Le Chesnay-Rocquencourt, Vélizy ou d’autres villes des Yvelines. Les rendez-vous se font généralement en visio.",
      },
      {
        q: "Votre approche convient-elle aux professions libérales et acteurs du tourisme à Versailles ?",
        a: "Oui. Les professions libérales, cabinets, structures touristiques et culturelles ont besoin de sites à la fois sobres, élégants et simples à maintenir. Un site vitrine statique est idéal pour cela.",
      },
      {
        q: "Pouvez-vous respecter une charte graphique existante (logo, couleurs, etc.) ?",
        a: "Oui. Nous pouvons reprendre votre charte graphique existante et l’adapter à un site vitrine statique moderne, sans repartir de zéro sur votre identité.",
      }
    );
  }

  if (cityName === "Montreuil") {
    items.push(
      {
        q: "Travaillez-vous uniquement avec des clients à Montreuil ?",
        a: "Non. Je peux vous accompagner si vous êtes basé à Montreuil, Bagnolet, Vincennes ou dans l’est parisien. Les échanges se font simplement en visio.",
      },
      {
        q: "Votre approche convient-elle aux associations, collectifs ou structures de l’ESS ?",
        a: "Oui. Un site vitrine statique est particulièrement adapté aux besoins des associations, collectifs et structures de l’ESS : peu de maintenance, un site rapide, et une structure simple pour présenter vos actions, votre équipe et vos appels à soutien.",
      },
      {
        q: "Pouvez-vous travailler avec un budget limité tout en restant professionnel ?",
        a: "Oui. L’idée est justement de proposer un site vitrine statique sobre et bien structuré, qui reste maîtrisable en budget tout en renvoyant une image professionnelle et soignée.",
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
      ) : city.name === "Boulogne-Billancourt" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Boulogne-Billancourt (petite couronne ouest), nous concevons des sites vitrines statiques sobres et rapides pour les cabinets, agences
          médias, studios et startups basés entre Boulogne, Issy-les-Moulineaux et Paris 16e. L&apos;objectif : une présence claire qui valorise vos
          expertises sans vous enfermer dans une usine à gaz technique.
        </p>
      ) : city.name === "Issy-les-Moulineaux" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Issy-les-Moulineaux, nous concevons des sites vitrines statiques sobres et rapides pour les médias, télécoms, startups et sociétés de
          services B2B installés entre Issy, Boulogne et Paris 15e. L&apos;objectif : un site clair qui présente vos offres et facilite la prise de contact,
          sans surcouche technique inutile.
        </p>
      ) : city.name === "Levallois-Perret" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Levallois-Perret, nous créons des sites vitrines statiques pour agences, cabinets de conseil, indépendants et TPE de services. L&apos;objectif :
          une présence en ligne nette, rapide et crédible, qui reflète votre expertise sans nécessiter une grosse équipe web en interne.
        </p>
      ) : city.name === "Neuilly-sur-Seine" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Neuilly-sur-Seine, nous concevons des sites vitrines statiques sobres pour avocats, cabinets de gestion de patrimoine, consultants et
          professions libérales. L&apos;objectif : une image professionnelle, claire et rassurante pour une clientèle exigeante de l’ouest parisien.
        </p>
      ) : city.name === "Courbevoie" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Courbevoie, à deux pas de La Défense, nous créons des sites vitrines statiques orientés B2B pour les sociétés de conseil, ESN, fintech et
          services d’assurance. L&apos;objectif : présenter vos offres de manière structurée et rapide à parcourir, pour vos prospects professionnels.
        </p>
      ) : city.name === "Nanterre" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Nanterre, nous accompagnons cabinets, structures liées aux institutions et services B2B qui ont besoin d’un site vitrine clair et facile à
          maintenir, connecté à l’écosystème de La Défense et de Rueil-Malmaison sans multiplier les outils complexes.
        </p>
      ) : city.name === "Créteil" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Créteil, nous concevons des sites vitrines statiques pour les acteurs publics, structures de santé, cabinets et services éducatifs. L&apos;objectif :
          informer clairement vos publics (usagers, patients, familles, étudiants) avec un site rapide, accessible et simple à mettre à jour.
        </p>
      ) : city.name === "Cergy" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Cergy, nous créons des sites vitrines statiques pour les PME de services, structures d’enseignement supérieur et acteurs publics de
          l’agglomération de Cergy-Pontoise. L&apos;objectif : une présence en ligne claire, orientée prise de contact, qui s’intègre facilement à vos outils existants.
        </p>
      ) : city.name === "Versailles" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Versailles, nous concevons des sites vitrines statiques élégants pour les professions libérales, cabinets, acteurs du tourisme et de la
          culture. L&apos;objectif : un site sobre, rapide et rassurant, cohérent avec l’image haut de gamme de votre activité.
        </p>
      ) : city.name === "Montreuil" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Montreuil, nous créons des sites vitrines statiques pour associations, structures de l’ESS, collectifs culturels et TPE de services locaux.
          L&apos;objectif : un site clair, rapide et facile à maintenir qui vous aide à présenter vos projets et à recevoir des demandes, sans usine à gaz.
        </p>
      ) : city.name === "Saint-Denis" ? (
        <p className="mt-3 text-foreground/80 max-w-3xl">
          À Saint-Denis (Seine-Saint-Denis), nous concevons des sites vitrines statiques rapides et clairs pour les acteurs de l&apos;événementiel
          (Stade de France et alentours), les industriels, les logisticiens et les structures publiques ou associatives. L&apos;objectif : être visible
          sur les recherches locales autour de Saint-Denis et du nord parisien, avec un site rassurant et simple à maintenir.
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
        <BookingButton className="rounded-full" size="lg" label={`Demander un audit gratuit — ${city.name}`} />
        <Button asChild className="rounded-full" variant="secondary">
          <Link href="/contact">Demander un devis</Link>
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
              : city.name === "Boulogne-Billancourt"
              ? "À Boulogne-Billancourt, nous accompagnons principalement des cabinets de conseil, des agences médias, des entreprises de services B2B et des studios créatifs installés dans l’ouest parisien. L’objectif : un site vitrine statique qui explique clairement vos offres et facilite la prise de contact, sans complexité technique inutile."
              : city.name === "Saint-Denis"
              ? "À Saint-Denis, nous travaillons avec des acteurs de l’événementiel (Stade de France et alentours), des structures publiques et associatives, ainsi que des PME industrielles ou logistiques. L’objectif : un site vitrine statique clair, accessible et rapide, adapté aux réalités de la Seine-Saint-Denis."
              : city.name === "Issy-les-Moulineaux"
              ? "À Issy-les-Moulineaux, nous travaillons surtout avec des entreprises des médias, des télécoms, du numérique et des services B2B qui veulent un site vitrine sobre, rapide et facile à maintenir, en cohérence avec une activité déjà très digitalisée."
              : city.name === "Levallois-Perret"
              ? "À Levallois-Perret, notre offre est pensée pour les agences, cabinets, indépendants et TPE de services qui ont besoin d’un site vitrine crédible et efficace, sans lancer un projet web de plusieurs mois ni multiplier les interlocuteurs."
              : city.name === "Neuilly-sur-Seine"
              ? "À Neuilly-sur-Seine, notre approche s’adresse principalement aux professions libérales, cabinets de conseil, gestionnaires de patrimoine et petites structures B2B qui veulent un site vitrine sobre, professionnel et conforme aux attentes d’une clientèle haut de gamme."
              : city.name === "Courbevoie"
              ? "À Courbevoie, aux portes de La Défense, nous accompagnons surtout des sociétés de services B2B, ESN, cabinets de conseil et acteurs de la finance/assurance qui veulent un site vitrine orienté contenus métiers et prise de contact, plutôt qu’un gros site institutionnel lourd."
              : city.name === "Nanterre"
              ? "À Nanterre, notre offre cible les services B2B, cabinets et structures liées aux institutions ou au campus qui ont besoin d’un site vitrine clair, simple à mettre à jour, sans internaliser une équipe technique complète."
              : city.name === "Créteil"
              ? "À Créteil, nous accompagnons des structures publiques, des acteurs de la santé, des cabinets et des services éducatifs qui ont besoin d’un site vitrine informatif, accessible et facile à maintenir pour leurs publics."
              : city.name === "Cergy"
              ? "À Cergy, nous travaillons avec des PME de services, des acteurs publics et des structures d’enseignement supérieur qui cherchent un site vitrine simple, rapide et orienté prise de contact, sans complexifier leur stack technique."
              : city.name === "Versailles"
              ? "À Versailles, notre offre s’adresse aux professions libérales, cabinets, acteurs du tourisme et de la culture qui souhaitent un site vitrine élégant, sobre et durable, plutôt qu’un site marketing surchargé."
              : city.name === "Montreuil"
              ? "À Montreuil, nous accompagnons des structures de l’ESS, des associations, des collectifs culturels et des TPE de services locaux qui veulent un site vitrine simple, clair et aligné avec leurs valeurs, sans usine à gaz numérique."
              : `Notre offre de création de site internet à ${city.name} est pensée pour les artisans, professions libérales et TPE locales qui veulent un site vitrine clair, rapide et simple à maintenir\\u00a0: plomberie, électricité, textile, industrie mécanique, agroalimentaire, conseil, coaching, etc. Nous adaptons le ton et les exemples à votre réalité de terrain.`}
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
                Site vitrine statique avec six pages (Accueil, Services, Secteurs, Projets, À propos, Contact), design sur‑mesure,
                contenus rédigés et optimisés pour les expressions clés (« ventousage cinéma Paris », « ventouseur Paris », etc.), chiffré sur devis.
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
        {city.name === "Boulogne-Billancourt" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Boulogne-Billancourt (ouest parisien) ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Boulogne-Billancourt et autour (Issy-les-Moulineaux, Paris 16e), beaucoup d’entreprises sont des agences, studios, médias, startups ou
              cabinets de conseil. Un site vitrine statique permet de présenter vos offres, vos références et votre équipe sans multiplier les plugins,
              les thèmes et les couches techniques difficiles à maintenir.
            </p>
            <p className="mt-2 text-foreground/80">
              L&apos;objectif : un site rapide, clair et sobre, qui renvoie l’image d’une structure sérieuse, tout en restant simple à faire évoluer au fil
              de vos missions et de vos cas clients.
            </p>
          </section>
        )}
        {city.name === "Issy-les-Moulineaux" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Issy-les-Moulineaux ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Issy-les-Moulineaux, médias, télécoms, startups et services B2B ont déjà de nombreux outils numériques. Un site vitrine statique évite de
              rajouter une couche de complexité : pas de CMS lourd à mettre à jour chaque semaine, mais une base propre, rapide, orientée contenus et
              prise de contact.
            </p>
            <p className="mt-2 text-foreground/80">
              Nous concentrons l’effort sur vos pages clés (présentation, offres, cas clients, contact) et sur les expressions recherchées par vos prospects,
              plutôt que sur des dizaines de gabarits rarement utilisés.
            </p>
          </section>
        )}
        {city.name === "Levallois-Perret" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Levallois-Perret ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Levallois-Perret, beaucoup d’entreprises sont des agences, cabinets ou indépendants qui ont besoin d’un site crédible et efficace, mais pas
              d’une usine à gaz techniquement. Un site vitrine statique permet de maintenir une image professionnelle tout en gardant des coûts raisonnables.
            </p>
            <p className="mt-2 text-foreground/80">
              L’objectif : un site sobre, rapide, lisible sur mobile, qui met en avant vos expertises et vos preuves (références, témoignages), sans
              nécessiter une refonte tous les deux ans.
            </p>
          </section>
        )}
        {city.name === "Neuilly-sur-Seine" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Neuilly-sur-Seine ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Neuilly-sur-Seine, vos clients attendent une communication simple, claire et élégante. Un site vitrine statique sobre met en avant vos
              expertises (cabinet d’avocats, conseil, gestion de patrimoine, etc.) sans clignotements ni complexité technique, avec un temps de chargement
              très court.
            </p>
            <p className="mt-2 text-foreground/80">
              Nous travaillons le contenu pour qu’il réponde aux questions de vos prospects et respecte votre ton, tout en restant très facile à maintenir
              dans la durée.
            </p>
          </section>
        )}
        {city.name === "Courbevoie" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Courbevoie (La Défense) ?
            </h2>
            <p className="mt-2 text-foreground/80">
              Autour de La Défense, beaucoup de sites souffrent d’être trop lourds, trop généralistes ou de mélanger trop de messages. Un site vitrine
              statique vous permet de clarifier votre positionnement (ESN, conseil, finance, assurance…) avec quelques pages très bien structurées,
              rapides et simples à parcourir.
            </p>
            <p className="mt-2 text-foreground/80">
              L’objectif : que votre site devienne un appui simple pour vos rendez-vous et vos prises de contact B2B, plutôt qu’un projet technique
              interminable.
            </p>
          </section>
        )}
        {city.name === "Nanterre" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Nanterre ?
            </h2>
            <p className="mt-2 text-foreground/80">
              Entre institutions, campus et entreprises de services, Nanterre rassemble des structures pour qui le site web doit être clair, fiable
              et facile à maintenir. Un site vitrine statique évite les surcharges techniques et se concentre sur l’essentiel : expliquer ce que vous
              faites, pour qui, et comment vous contacter.
            </p>
            <p className="mt-2 text-foreground/80">
              Nous alignons le site sur vos objectifs (information, prise de rendez-vous, démonstration d’expertise), sans vous embarquer dans un projet
              lourd de type portail institutionnel si ce n’est pas nécessaire.
            </p>
          </section>
        )}
        {city.name === "Créteil" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Créteil ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Créteil, beaucoup d’acteurs sont des services publics, des structures de santé ou des organismes d’enseignement. Un site vitrine statique
              permet d’offrir une information claire, accessible et rapide pour vos publics, sans multiplier les modules complexes.
            </p>
            <p className="mt-2 text-foreground/80">
              L’objectif : un site qui se charge vite, respectueux des bonnes pratiques d’accessibilité de base et simple à mettre à jour pour vos équipes,
              sans dépendre en permanence d’une grosse agence.
            </p>
          </section>
        )}
        {city.name === "Cergy" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Cergy ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Cergy-Pontoise, entre campus, entreprises de services et acteurs publics, un site vitrine statique offre une base solide pour présenter
              vos activités sans surcharger votre équipe d’un gros projet web. Peu de dépendances, un socle performant, et un contenu travaillé sur vos
              quelques cibles principales.
            </p>
            <p className="mt-2 text-foreground/80">
              Nous privilégions la clarté (parcours simple, rubriques essentielles, contact bien mis en avant) plutôt que des fonctionnalités rarement
              utilisées qui compliquent tout.
            </p>
          </section>
        )}
        {city.name === "Versailles" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Versailles ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Versailles, vous adressez souvent une clientèle locale ou internationale exigeante (professions libérales, cabinets, tourisme, culture).
              Un site vitrine statique permet de proposer une expérience fluide, élégante et rapide, sans surenchère d’effets.
            </p>
            <p className="mt-2 text-foreground/80">
              L’objectif : un site qui inspire confiance, cohérent avec votre image et simple à enrichir au fil du temps (nouveaux services, actualités,
              témoignages).
            </p>
          </section>
        )}
        {city.name === "Montreuil" && (
          <section>
            <h2 className="font-heading text-2xl font-semibold">
              Pourquoi un site vitrine statique à Montreuil ?
            </h2>
            <p className="mt-2 text-foreground/80">
              À Montreuil, les structures de l’ESS, les associations, les collectifs et les TPE n’ont pas besoin d’un site surdimensionné, mais d’un
              outil simple pour présenter leurs projets, leur équipe et leurs actions. Un site vitrine statique est idéal pour ça : lisible, rapide
              et peu coûteux à maintenir.
            </p>
            <p className="mt-2 text-foreground/80">
              Nous veillons à respecter votre ton et vos valeurs, tout en construisant un socle technique propre qui ne vous bloque pas pour les années à venir.
            </p>
          </section>
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
            En 2026, le budget d’un site vitrine statique pour artisans et TPE à {city.name} dépend surtout du nombre de pages, de la
            quantité de contenu à intégrer et des fonctionnalités (formulaire, prises de rendez-vous, cas clients…).
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Les prix exacts sont désormais établis uniquement sur devis, après un premier échange rapide sur votre projet.
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
            Les prix exacts dépendent de votre projet. Après un échange (visio ou téléphone), je vous envoie un devis détaillé basé sur ces trois niveaux
            (Essentiel, Professionnel, Premium).
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