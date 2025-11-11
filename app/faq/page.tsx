import { Reveal } from "@/components/site/reveal";
import { FAQPage } from "@/components/site/faq-page";
import { BookingButton } from "@/components/site/booking-modal";
import { FinalCTA } from "@/components/site/final-cta";
import { Particles } from "@/components/site/particles";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte vraiment un site web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entre 1800€ et 5500€ selon vos besoins. Prix fixe annoncé dès le départ, pas de surprises. Détails complets sur la page Tarifs.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps pour créer mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Site Vitrine : 2–3 semaines. Site Business : 3–4 semaines. Site Premium : 4–6 semaines. Après validation du devis et réception de tous vos contenus.",
      },
    },
    {
      "@type": "Question",
      name: "Mon site sera-t-il visible sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Optimisation SEO incluse dès le départ. Le référencement naturel met 2–3 mois à produire des résultats. Je vous forme aux bonnes pratiques.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je payer en plusieurs fois ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, en 3 paiements : 30% à la signature, 40% à mi-projet, 30% à la livraison.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi pas Wix ou WordPress ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wix : lent, limité et coûteux sur le long terme. WordPress : maintenance régulière et failles possibles. Mon approche : rapide, sécurisée, simple et performante.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je modifier mon site moi-même après ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui pour les contenus simples (textes, images, actualités). Pour des modifications structurelles, je reste disponible.",
      },
    },
  ],
};

export default function FAQ() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient-animated absolute inset-0 rounded-[28px] opacity-60" />
        <Particles />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="reveal-fade-up">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Vos Questions, Mes Réponses</h1>
        </Reveal>
        <Reveal className="reveal-fade-up">
          <p className="mt-4 text-foreground/80">Tout ce que vous devez savoir avant de vous lancer.</p>
        </Reveal>
      </div>

      {/* JSON-LD FAQ schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FAQPage />

      <div className="mt-10 flex justify-center">
        <BookingButton className="rounded-full" label="Réserver mon audit gratuit (15 min)" />
      </div>

      <FinalCTA />

      {/* Quick links — bottom of page */}
      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
          <h3 className="font-heading text-xl font-semibold">Pour approfondir</h3>
          <p className="mt-2 text-sm text-foreground/80">
            Maintenance, coûts et garanties — liens rapides :
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <a href="/cout-maintenance-site-web" className="text-primary hover:underline">
              Coût de la maintenance
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/contenu-forfait-maintenance-site-web" className="text-primary hover:underline">
              Contenu d’un forfait
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/frais-caches-site-internet" className="text-primary hover:underline">
              Frais cachés après la livraison
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/tarifs-2025" className="text-primary hover:underline">
              Tarifs 2025
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}