import Link from "next/link";

export const metadata = {
  title: "Sécurité — smarterlogicweb.com",
  description:
    "Politique de divulgation responsable des vulnérabilités. Merci de nous aider à sécuriser smarterlogicweb.com.",
  alternates: {
    canonical: "/securite",
    languages: {
      "fr-FR": "/securite",
      "en-US": "/en/security",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/securite",
    title: "Sécurité — smarterlogicweb.com",
    description:
      "Politique de divulgation responsable des vulnérabilités. Merci de nous aider à sécuriser smarterlogicweb.com.",
  },
};

export default function SecuritePage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Sécurité</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Nous prenons la sécurité au sérieux et encourageons la divulgation responsable des vulnérabilités.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Comment signaler une vulnérabilité</h2>
          <p className="mt-2 text-foreground/80">
            Merci de nous écrire à{" "}
            <Link href="mailto:contact@smarterlogicweb.com" className="underline">
              contact@smarterlogicweb.com
            </Link>{" "}
            avec une description claire, un proof-of-concept si possible, et l’impact potentiel.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Bonnes pratiques</h2>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>Évitez tout impact négatif sur la disponibilité ou l’intégrité des données.</li>
            <li>Ne publiez pas l’information avant la résolution.</li>
            <li>Donnez-nous un délai raisonnable pour corriger le problème.</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Reconnaissance</h2>
          <p className="mt-2 text-foreground/80">
            Nous vous remercions pour votre aide. Sauf contrainte spécifique, nous pouvons vous créditer (si vous le
            souhaitez) une fois le correctif déployé.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Fichier standard:{" "}
        <Link href="/.well-known/security.txt" className="underline">
          /.well-known/security.txt
        </Link>
      </p>

      {/* Mini CTA discret */}
      <div className="mt-8 flex justify-center">
        <a href="/contact" className="inline-flex items-center rounded-full border px-4 py-2 text-sm hover:bg-accent/50">
          Besoin d’aide ? Contactez-moi
        </a>
      </div>

      {/* Quick links — bottom of page */}
      <section className="mx-auto w-full max-w-3xl px-0 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h3 className="font-heading text-xl font-semibold">Pour approfondir</h3>
          <p className="mt-2 text-sm text-foreground/80">
            Maintenance, coûts et garanties — liens rapides :
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/cout-maintenance-site-web" className="text-primary hover:underline">
              Coût de la maintenance
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contenu-forfait-maintenance-site-web" className="text-primary hover:underline">
              Contenu d’un forfait
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/frais-caches-site-internet" className="text-primary hover:underline">
              Frais cachés après la livraison
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/tarifs-2025" className="text-primary hover:underline">
              Tarifs 2025
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}