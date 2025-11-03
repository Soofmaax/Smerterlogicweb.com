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

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Mentions légales</h1>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <h2>Éditeur du site</h2>
        <p>
          smarterlogicweb.com — Contact:{" "}
          <a href="mailto:contact@smarterlogicweb.com">contact@smarterlogicweb.com</a>
        </p>

        <h2>Hébergement</h2>
        <p>Le site est hébergé par un fournisseur de cloud européen conforme RGPD.</p>

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
          <a href="mailto:contact@smarterlogicweb.com">contact@smarterlogicweb.com</a>.
        </p>
      </div>
    </section>
  );
}