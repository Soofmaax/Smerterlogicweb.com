export const metadata = {
  title: "Politique de confidentialité — smarterlogicweb.com",
  description:
    "Politique de confidentialité: données collectées, finalités, base légale, durée de conservation, droits des utilisateurs.",
  alternates: {
    canonical: "/politique-de-confidentialite",
    languages: {
      "fr-FR": "/politique-de-confidentialite",
      "en-US": "/en/privacy-policy",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/politique-de-confidentialite",
    title: "Politique de confidentialité — smarterlogicweb.com",
    description:
      "Politique de confidentialité: données collectées, finalités, base légale, durée de conservation, droits des utilisateurs.",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
        Politique de confidentialité
      </h1>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <h2>Données collectées</h2>
        <p>
          Lorsque vous nous contactez via le formulaire ou par email, nous collectons vos informations de contact
          (nom, email) et le contenu de votre message.
        </p>

        <h2>Finalités et base légale</h2>
        <p>
          Ces données sont utilisées pour répondre à votre demande, établir une proposition commerciale et assurer le
          suivi de la relation. Le traitement est fondé sur l’exécution de mesures précontractuelles et l’intérêt
          légitime à répondre aux sollicitations.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Les messages sont conservés le temps nécessaire au traitement de votre demande et jusqu’à 24 mois pour le
          suivi commercial.
        </p>

        <h2>Partage des données</h2>
        <p>
          Les données ne sont pas vendues. Elles peuvent être partagées avec des prestataires techniques (hébergement,
          outils de formulaire) strictement nécessaires au fonctionnement du site.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’opposition, d’effacement, à la limitation et à la
          portabilité. Pour l’exercer, contactez:{" "}
          <a href="mailto:contact@smarterlogicweb.com">contact@smarterlogicweb.com</a>.
        </p>
      </div>
    </section>
  );
}