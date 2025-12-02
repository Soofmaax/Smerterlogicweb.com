import Link from "next/link";

export const metadata = {
  title: "Conditions générales de vente — smarterlogicweb.com",
  description:
    "Conditions générales de vente (CGV) applicables aux prestations de création et refonte de site, accompagnement et support.",
  alternates: {
    canonical: "/cgv",
    languages: {
      "fr-FR": "/cgv",
      "en-US": "/en/terms-of-sale",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/cgv",
    title: "Conditions générales de vente — smarterlogicweb.com",
    description:
      "Conditions générales de vente (CGV) applicables aux prestations de création et refonte de site, accompagnement et support.",
  },
};

export default function CGVPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Conditions générales de vente</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Les présentes CGV encadrent les prestations de conception, refonte et accompagnement de sites web proposées
        par smarterlogicweb. Elles s’appliquent à tout devis accepté et à toute commande confirmée.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">1. Devis, commande et périmètre</h2>
          <p className="mt-2 text-foreground/80">
            Un devis détaillé est communiqué avant toute prestation (tarifs, périmètre, délais). La commande est
            réputée ferme à réception du devis signé et de l’acompte. Toute évolution hors périmètre initial fera
            l’objet d’un avenant chiffré et validé par le client.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">2. Prix, paiements et échéancier</h2>
          <p className="mt-2 text-foreground/80">
            Sauf mention contraire, les paiements s’effectuent en 3 échéances&nbsp;: 30% à la signature, 40% à mi‑projet,
            30% à la livraison. Les prix indiqués sont TTC. Les retards de paiement peuvent entraîner la suspension
            temporaire des travaux et/ou de la mise en ligne.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">3. Contenus et validations</h2>
          <p className="mt-2 text-foreground/80">
            Le client fournit les éléments nécessaires (textes, visuels, logos) et valide chaque jalon sous 48&nbsp;h
            lorsque cela est possible. En l’absence de retours dans des délais raisonnables, le planning peut être
            ajusté. Toute modification substantielle après validation de maquette ou d’intégration est susceptible
            d’entraîner un devis complémentaire.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">4. Propriété intellectuelle et code source</h2>
          <p className="mt-2 text-foreground/80">
            Sauf mention contraire, le code source livré et le site final appartiennent au client dès paiement complet.
            Les frameworks, bibliothèques et composants open‑source restent soumis à leurs licences respectives.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">5. Hébergement, maintenance et garantie</h2>
          <p className="mt-2 text-foreground/80">
            L’hébergement est assuré sur des plateformes professionnelles (Netlify/Vercel). La première année peut
            être incluse selon l’offre, puis sous forme d’abonnement. Les sites statiques n’exigent pas de maintenance
            CMS. Une garantie de correction de bugs est incluse à la livraison (durée variable selon offre).
          </p>
          <p className="mt-2 text-foreground/80">
            Pour les sites WordPress, une maintenance technique régulière est recommandée (mises à jour, sauvegardes,
            sécurité). Détails et coûts&nbsp;:{" "}
            <Link href="/blog/forfait-maintenance-site-vitrine" className="underline">
              contenu forfait maintenance
            </Link>{" "}
            et{" "}
            <Link href="/blog/cout-maintenance-site-web" className="underline">
              coût maintenance
            </Link>
            .
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">6. Données personnelles</h2>
          <p className="mt-2 text-foreground/80">
            Les traitements de données effectués dans le cadre des prestations respectent le RGPD. Consultez la{" "}
            <Link href="/politique-de-confidentialite" className="underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">7. Responsabilité</h2>
          <p className="mt-2 text-foreground/80">
            Les obligations du prestataire sont des obligations de moyens. Le client reste responsable des contenus
            publiés, des déclarations légales et de l’exactitude des informations diffusées. Aucune responsabilité
            ne saurait être engagée en cas de force majeure (panne externe, incident chez un fournisseur d’hébergement,
            etc.).
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">8. Références</h2>
          <p className="mt-2 text-foreground/80">
            Sauf opposition expresse du client, le prestataire peut citer le projet dans ses références (visuels non
            sensibles, capture d’écran, statistiques anonymisées). Toute demande de retrait sera respectée.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">9. Droit applicable</h2>
          <p className="mt-2 text-foreground/80">
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera priorisée
            avant toute action. À défaut, les tribunaux compétents seront ceux du ressort du prestataire.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Dernière mise à jour&nbsp;: 2025. Pour toute question, écrivez à{" "}
        <Link href="mailto:contact@smarterlogicweb.com" className="underline">
          contact@smarterlogicweb.com
        </Link>
        .
      </p>
    </section>
  );
}