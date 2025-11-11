import Link from "next/link";

export const metadata = {
  title: "Checklist Google My Business — Local Pack en 2–8 semaines",
  description:
    "Les actions prioritaires pour apparaître dans le Local Pack et capter des appels rapidement : profil complet, photos, avis, NAP, posts.",
  alternates: {
    canonical: "/ressources/checklist-gmb",
    languages: {
      "fr-FR": "/ressources/checklist-gmb",
    },
  },
};

export default function ChecklistGMB() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Checklist Google My Business</h1>
        <p className="mt-2 text-foreground/80">
          Priorités pour apparaître dans le Local Pack et générer des appels rapidement.
        </p>
        <div className="mt-3">
          <Link href="/api/pdf/checklist-gmb" className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-accent">
            Télécharger en PDF
          </Link>
        </div>
      </header>

      <ol className="list-decimal space-y-2 pl-6">
        <li>Créer ou revendiquer la fiche sur Google Business Profile et <strong>vérifier</strong> l’adresse.</li>
        <li>Remplir 100 % des champs : nom, adresse, téléphone (numéro local), horaires, site, catégories précises.</li>
        <li>Rédiger une <strong>description</strong> claire avec vos mots‑clés locaux (métier + ville).</li>
        <li>Ajouter 10+ <strong>photos</strong> (logo, couverture, réalisations, équipe) — qualité et authenticité.</li>
        <li>Collecter des <strong>avis clients</strong> en continu (envoyer le lien direct), répondre à tous les avis.</li>
        <li>Publier 1–2 <strong>posts</strong> par mois (actu, offre, réalisation récente) avec photo et call‑to‑action.</li>
        <li>Vérifier la <strong>cohérence NAP</strong> (Name‑Address‑Phone) sur site, réseaux et annuaires.</li>
        <li>Suivre les <strong>statistiques</strong> GMB : impressions, clics, appels, itinéraires — ajuster catégories/zone.</li>
        <li>Lier la fiche vers votre <strong>site web</strong> et intégrer la carte/avis GMB sur votre site.</li>
        <li>Répéter chaque mois : nouveaux avis, nouvelles photos, posts réguliers.</li>
      </ol>

      <footer className="mt-8">
        <p className="text-sm text-muted-foreground">
          Conseil : combinez cette checklist avec un site vitrine statique rapide et clair. Voir&nbsp;
          <Link href="/google-my-business-ou-site-web" className="text-primary hover:underline">
            GMB ou site web — que privilégier ?
          </Link>
        </p>
      </footer>
    </section>
  );
}