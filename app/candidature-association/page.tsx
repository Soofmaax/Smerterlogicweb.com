import { Reveal } from "@/components/site/reveal";
import { AssociationApplicationForm } from "@/components/site/association-application-form";

export const metadata = {
  title: "Candidature — Association du Mois",
  description: "Candidatez gratuitement pour que votre association bénéficie d’un site offert.",
  alternates: {
    canonical: "/candidature-association",
    languages: {
      "fr-FR": "/candidature-association",
      "en-US": "/en/association-application",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/candidature-association",
    title: "Candidature — Association du Mois",
    description: "Candidatez gratuitement pour que votre association bénéficie d’un site offert.",
  },
};

export default function CandidatureAssociationPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[28px] card-elevated border bg-card p-6">
        <Reveal className="reveal-fade-up">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Candidater — Site Gratuit</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-3 text-foreground/80">
            Chaque mois, une association d’intérêt général bénéficie d’un site offert. Remplissez ce formulaire — je vous réponds sous 48h.
          </p>
        </Reveal>
        <AssociationApplicationForm />
      </div>
    </section>
  );
}