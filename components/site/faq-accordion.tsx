import React from "react";

export function FAQAccordion() {
  const faqs = [
    {
      q: "Ai-je besoin d'un logo et d'une charte graphique avant de commencer ?",
      a: "Idéalement oui, car je me concentre sur le développement technique. Si vous n'en avez pas, je peux vous recommander des graphistes partenaires compétents avec qui je travaille régulièrement.",
    },
    {
      q: "Combien de temps prend la réalisation d'un site ?",
      a: "Entre deux et quatre semaines selon la formule choisie et la complexité, une fois que nous avons tous les éléments nécessaires (logo, contenus, photos).",
    },
    {
      q: "Puis-je modifier mon site après la livraison ?",
      a: "Absolument. Je vous forme à la gestion des contenus de base et reste disponible pour les modifications techniques plus complexes.",
    },
    {
      q: "Le site sera-t-il bien référencé sur Google ?",
      a: "Je mets en place toutes les optimisations SEO on‑page nécessaires et vous forme aux bonnes pratiques. Le référencement naturel prend ensuite quelques mois pour donner ses pleins résultats.",
    },
    {
      q: "Que se passe-t-il après la première année d'hébergement offerte ?",
      a: "Vous pouvez continuer avec mon service d'hébergement/maintenance (~20€ / mois) ou migrer vers votre propre hébergeur : vous êtes propriétaire du code.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Vos Questions, Mes Réponses</h2>
        <p className="mt-2 text-foreground/70">Questions fréquentes de mes clients artisans et PME.</p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="divide-y rounded-2xl border bg-card">
        {faqs.map((item, idx) => (
          <details key={idx} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-medium">
              <span>{item.q}</span>
              <span className="transition-transform duration-300 group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-2 text-sm text-foreground/80">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}