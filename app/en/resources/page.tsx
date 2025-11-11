import Link from "next/link";
import { RESOURCES } from "@/data/resources";
import { BLOG_POSTS } from "@/data/blog";
import { getPublishedPostsBurst } from "@/lib/blog";

export const metadata = {
  title: "Resources",
  description: "Practical guides and checklists to boost your visibility and conversion.",
  alternates: {
    canonical: "/en/resources",
    languages: {
      "fr-FR": "/ressources",
      "en-US": "/en/resources",
    },
  },
};

function getUnlockAfter(): number {
  const raw = process.env.RESOURCES_UNLOCK_AFTER_EN;
  const n = raw ? Number(raw) : 10;
  return Number.isFinite(n) && n >= 0 ? n : 10;
}

export default function ResourcesIndexEN() {
  const publishedCount = getPublishedPostsBurst(BLOG_POSTS, "en").length;
  const unlockAfter = getUnlockAfter();
  const locked = publishedCount < unlockAfter;

  const items = RESOURCES.filter((r) => r.locale === "en");

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Resources</h1>
        <p className="mt-2 text-foreground/80">Guides and checklists for tangible results.</p>
      </header>

      {locked ? (
        <div className="rounded-xl border bg-card p-6">
          <p className="text-foreground/80">
            Resources will unlock once the first batch of articles is published.
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
                  View
                </Link>
                <Link href={r.pdfHref} className="text-sm text-primary hover:underline">
                  Download PDF
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}