import { Reveal } from "@/components/site/reveal";
import { FAQPage } from "@/components/site/faq-page";

export const metadata = {
  title: "FAQ — smarterlogicweb.com",
  description: "Vos Questions, Mes Réponses. Tout ce que vous devez savoir avant de vous lancer.",
  alternates: {
    canonical: "/faq",
    languages: {
      "fr-FR": "/faq",
      "en-US": "/en/faq",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/faq",
    title: "FAQ — smarterlogicweb.com",
    description: "Vos Questions, Mes Réponses. Tout ce que vous devez savoir avant de vous lancer.",
  },
};

export default function FAQ() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-fade-up">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Vos Questions, Mes Réponses</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-foreground/80">Tout ce que vous devez savoir avant de vous lancer.</p>
        </Reveal>
      </div>

      <FAQPage />
    </section>
  );
}