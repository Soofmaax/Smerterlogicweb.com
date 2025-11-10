import * as React from "react";
import { ShieldCheck, SwitchCamera } from "lucide-react";
import { AFTER_FIRST_YEAR_MAINTENANCE_MONTHLY_EUR } from "@/data/pricing";

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
            <h3 className="font-heading text-lg font-semibold">Maintenance & hébergement</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            Environ {AFTER_FIRST_YEAR_MAINTENANCE_MONTHLY_EUR}€ / mois pour l’hébergement, la surveillance basique et les mises à jour de sécurité.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <SwitchCamera className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Migration vers votre hébergeur</h3>
          </div>
          <p className="mt-2 text-sm text-foreground/80">
            Je vous accompagne pour migrer sereinement : vous êtes propriétaire du code et restez libre.
          </p>
        </div>
      </div>
    </section>
  );
}