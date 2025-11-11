import Link from "next/link";
import { LOCAL_CITIES } from "@/data/local-cities";

type Props = {
  contentHtml: string;
  maxLinks?: number;
  title?: string;
  locale?: "fr" | "en";
};

/**
 * Show contextual city links based on keywords found in the blog content.
 * Simple heuristic: match sector keywords to LOCAL_CITIES.sectors and return up to N cities.
 */
export function RelatedCities({ contentHtml, maxLinks = 3, title, locale = "fr" }: Props) {
  const text = (contentHtml || "").toLowerCase();

  // Basic keyword -> sector mapping
  const keywords = [
    "viticulture",
    "vigneron",
    "vin",
    "agro",
    "agroalimentaire",
    "bois",
    "forêt",
    "télécom",
    "telecom",
    "mutuelle",
    "assurance",
    "logistique",
    "aéronautique",
    "aeronautique",
    "métallurgie",
    "metal",
    "tourisme",
    "balnéaire",
    "montagne",
    "cyber",
    "numérique",
    "pharma",
    "cosmétique",
    "cosmetique",
  ];

  const matchedCities = LOCAL_CITIES.filter((c) => {
    const sectorsText = c.sectors.join(" ").toLowerCase();
    return keywords.some((kw) => text.includes(kw) && sectorsText.includes(kw));
  }).slice(0, maxLinks);

  if (matchedCities.length === 0) return null;

  const titleText =
    title ??
    (locale === "fr"
      ? "Pages locales liées (pour approfondir)"
      : "Related local pages (to explore)");

  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold">{titleText}</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {matchedCities.map((c) => (
          <li key={c.slug} className="rounded-[16px] border bg-card p-4">
            <h3 className="font-medium leading-tight">
              <Link href={`/creation-site-internet/${c.slug}`} className="hover:underline">
                {locale === "fr"
                  ? `Création de site internet à ${c.name}`
                  : `Website creation in ${c.name}`}
              </Link>
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {locale === "fr"
                ? `Secteurs: ${c.sectors.join(", ")}`
                : `Sectors: ${c.sectors.join(", ")}`}
            </p>
            <div className="mt-3">
              <Link href={`/creation-site-internet/${c.slug}`} className="text-sm text-primary hover:underline">
                {locale === "fr" ? "Voir la page" : "View page"}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}