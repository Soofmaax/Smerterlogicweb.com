export const metadata = {
  title: "Mentions légales — smarterlogicweb.com",
  description:
    "Mentions légales du site smarterlogicweb.com : éditeur, hébergeur, propriété intellectuelle, contact.",
  alternates: {
    canonical: "/mentions-legales",
    languages: {
      "fr-FR": "/mentions-legales",
      "en-US": "/en/legal-notice",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/mentions-legales",
    title: "Mentions légales — smarterlogicweb.com",
    description:
      "Mentions légales du site smarterlogicweb.com : éditeur, hébergeur, propriété intellectuelle, contact.",
  },
};

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "smarterlogicweb.com";
const COMPANY_SIRET = process.env.NEXT_PUBLIC_COMPANY_SIRET || "";
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "";
const PUBLISHER_NAME = process.env.NEXT_PUBLIC_PUBLISHER_NAME || "";
const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME || "";
const HOST_ADDRESS = process.env.NEXT_PUBLIC_HOST_ADDRESS || "";
const HOST_PHONE = process.env.NEXT_PUBLIC_HOST_PHONE || "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@smarterlogicweb.com";

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Mentions légales</h1>

        <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
          <h2>Éditeur du site</h2>
          <p>
            {COMPANY_NAME}
            {COMPANY_SIRET ? <> — SIRET : {COMPANY_SIRET}</> : null}
            {COMPANY_ADDRESS ? <> — Adresse : {COMPANY_ADDRESS}</> : null}
            {" — "}Contact{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>

          <h2>Directeur de la publication</h2>
          <p>
            {PUBLISHER_NAME || "—"} — Contact{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>

          <h2>Hébergement</h2>
          <p>
            {HOST_NAME || "Fournisseur cloud européen conforme RGPD"}
            {HOST_ADDRESS ? <> — Adresse : {HOST_ADDRESS}</> : null}
            {HOST_PHONE ? <> — Téléphone : {HOST_PHONE}</> : null}
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus (textes, visuels, éléments graphiques) présents sur ce site sont protégés par le
            droit d’auteur. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Les informations fournies sur ce site le sont à titre indicatif. L’éditeur ne saurait être tenu responsable
            d’un quelconque dommage direct ou indirect résultant de l’usage des informations et contenus du site.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question, vous pouvez écrire à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>

        {/* Mini CTA discret */}
        <div className="mt-8 flex justify-center">
          <a href="/contact" className="inline-flex items-center rounded-full border px-4 py-2 text-sm hover:bg-accent/50">
            Besoin d’aide ? Contactez-moi
          </a>
        </div>
      </div>
    </section>
  );
}