"use client";

import * as React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export function WhyInvest() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Pourquoi un Site Sur-Mesure Est le Meilleur Choix</h2>
        <p className="mt-2 text-foreground/70">
          Anticipons la question “Pourquoi pas Wix ou un WordPress à 10€/mois ?”
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <ThumbsDown className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Wix / WordPress “clé en main”</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• Vous gérez tout vous‑même : mises à jour, sécurité, bugs, référencement.</li>
            <li>• Thèmes lourds, plugins multiples → site lent et fragile.</li>
            <li>• Vous perdez du temps et in fine de l’argent.</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <ThumbsUp className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Mon accompagnement sur‑mesure</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• Vous vous concentrez sur vos clients, je m’occupe du technique.</li>
            <li>• Site rapide, visible sur Google, et simple à modifier.</li>
            <li>• Résultat : vous gagnez du temps et des clients. Pas de surprise technique ni de coût caché.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}