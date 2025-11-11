import Link from "next/link";
import { RESOURCES } from "@/data/resources";
import { BLOG_POSTS } from "@/data/blog";
import { getPublishedPostsBurst } from "@/lib/blog";

export const metadata = {
  title: "Ressources",
  description: "Guides et checklists pratiques pour améliorer votre visibilité et votre conversion.",
  alternates: {
    canonical: "/ressources",
    languages: {
      "fr-FR": "/ressources",
    },
  },
};

function getUnlockAfter(): number {
  const raw = process.env.RESOURCES_UNLOCK_AFTER_FR;
  const n = raw ? Number(raw) : 10;
  return Number.isFinite(n) && n >= 0 ? n : 10;
}

export default function ResourcesIndex() {
  const publishedCount = getPublishedPostsBurst(BLOG_POSTS, "fr").length;
  const unlockAfter = getUnlockAfter();
  const locked = publishedCount < unlockAfter;

  const items = RESOURCES.filter((r) => r.locale === "fr");

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Ressources</h1>
        <p className="mt-2 text-foreground/80">
          Guides, checklists et outils pour des résultats concrets.
        </p>
      </header>

      {locked ? (
        <div className="rounded-xl border bg-card p-6">
          <p className="text-foreground/80">
            Les ressources seront disponibles une fois que les premiers articles auront été publiés.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((r) => (
            <li key={r.slug} className="rounded-xl border bg-card p-5">
              <h2 className="text-lg font-semibold">
                <Link href={r.pageHref} className="hover:underline">{r.title}</Link>
              </h2>
              {r.summary ? <p className="mt-2 text-sm text-foreground/80">{r.summary}</p> : null}
              <div className="mt-3 flex gap-3">
                <Link href={r.pageHref} className="text-sm text-primary hover:underline">
                  Voir
                </Link>
                <Link href={r.pdfHref} className="text-sm text-primary hover:underline">
                  Télécharger le PDF
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}