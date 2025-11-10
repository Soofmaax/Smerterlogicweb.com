import { MAINTENANCE_MONTHLY_FROM_EUR } from "@/data/pricing";

export function FAQServices() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">FAQ — Services</h2>
        <p className="mt-2 text-foreground/70">Des réponses simples aux questions les plus fréquentes.</p>
      </div>

      <div className="divide-y rounded-2xl border bg-card">
        {[
          {
            q: "Quelle formule choisir pour mon activité ?",
            a: "Si vous débutez en ligne, le Site Vitrine suffit souvent. Si vous avez beaucoup de réalisations et souhaitez générer plus de contacts, optez pour le Site Business. Le Premium s’adresse aux TPE/PME qui ont besoin d’un outil complet et automatisé.",
          },
          {
            q: "Puis-je changer de formule plus tard ?",
            a: "Oui. Le site est conçu pour évoluer. Vous pouvez passer de Vitrine à Business, puis à Premium sans tout reconstruire.",
          },
          {
            q: "Que se passe-t-il si je veux des modifications après ?",
            a: "Je propose un accompagnement souple. Petites corrections incluses en phase de livraison; évolutions possibles ensuite au forfait ou à l’heure.",
          },
          {
            q: "Combien coûte l'hébergement après la première année ?",
            a: `Selon vos besoins et le trafic : à partir de ${MAINTENANCE_MONTHLY_FROM_EUR}€/mois. Je vous conseille la meilleure option pour vos contraintes.`,
          },
        ].map((item, i) => (
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