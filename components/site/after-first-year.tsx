import * as React from "react";
import { ShieldCheck, SwitchCamera } from "lucide-react";
import { EVOLUTION_MONTHLY_EUR } from "@/data/pricing";

export function AfterFirstYear() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Après la première année</h2>
        <p className="mt-2 text-foreground/70">Deux options simples, vous gardez la propriété de votre code.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Sites statiques = pas de maintenance obligatoire</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            Hébergement Netlify gratuit à vie, domaine offert 1 an. Pas de base de données, pas de plugins — sécurité intrinsèque et site qui tourne des années sans mises à jour.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <SwitchCamera className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Formule Évolution (option)</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            {EVOLUTION_MONTHLY_EUR}€/mois, sans engagement: 1h de modifications/mois, heures cumulables sur 3 mois, support prioritaire et monitoring basique.
          </p>
        </div>
      </div>
    </section>
  );
}