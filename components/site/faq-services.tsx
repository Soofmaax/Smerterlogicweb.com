export function FAQServices() {
  const items = [
    {
      q: "Pourquoi pas de maintenance obligatoire ?",
      a:
        "Les sites statiques n’ont ni base de données, ni plugins, ni CMS à mettre à jour. Ils sont intrinsèquement plus sécurisés et tournent des années sans intervention technique.",
    },
    {
      q: "Et si je veux quand même de l’aide pour les modifications ?",
      a:
        "C’est le rôle de la Formule Évolution (20€/mois, optionnelle) : 1h de modifications/mois, heures cumulables 3 mois, support prioritaire et monitoring.",
    },
    {
      q: "Puis-je changer de formule après livraison ?",
      a:
        "Oui. Vous pouvez évoluer d’Essentiel vers Professionnel ou Premium. Si vous êtes abonné à la Formule Évolution, une refonte complète bénéficie de -30% sur devis.",
    },
    {
      q: "Qui est propriétaire du site ?",
      a:
        "Vous, à 100%. Code source remis (GitHub privé possible), domaine à votre nom, liberté de changer de prestataire à tout moment.",
    },
    {
      q: "Quels délais si je signe aujourd’hui ?",
      a:
        "Essentiel: 2–3 semaines. Professionnel: 4–6 semaines. Premium: 8–12 semaines. Démarrage sous 1 semaine (2 semaines pour Premium).",
    },
    {
      q: "Puis-je payer en plusieurs fois ?",
      a:
        "Oui. Essentiel: 2 fois (50/50). Professionnel: 3 fois (50/30/20). Premium: 4 fois (40/30/20/10). Pas de paiement au-delà de 4 fois.",
    },
    {
      q: "Puis-je avoir un devis personnalisé ?",
      a:
        "Oui. Pour e‑commerce, applications web, marketplaces ou besoins spécifiques, contactez‑nous pour un devis sur‑mesure.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">FAQ — Services</h2>
        <p className="mt-2 text-foreground/70">Des réponses simples aux questions les plus fréquentes.</p>
      </div>

      <div className="divide-y rounded-2xl border bg-card">
        {items.map((item, i) => (
          <details key={i} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">{item.q}</span>
              <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-foreground/80">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}