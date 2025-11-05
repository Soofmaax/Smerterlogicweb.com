"use client";

import * as React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export function WhyInvestEN() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">Why Invest in a Custom Website?</h2>
        <p className="mt-2 text-foreground/70">
          Let’s anticipate the question: “Why not Wix or a 10€/month WordPress?”
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <ThumbsDown className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">Wix / WordPress “do‑it‑yourself”</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• You manage everything yourself: updates, security, bugs, SEO.</li>
            <li>• Heavy themes, multiple plugins → slow and fragile site.</li>
            <li>• You lose time and, in the end, money.</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <ThumbsUp className="h-5 w-5" />
            </span>
            <h3 className="font-heading text-lg font-semibold">My tailored support</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• You focus on your clients; I handle the technical part.</li>
            <li>• Fast site, visible on Google, and easy to edit.</li>
            <li>• Result: you gain time and clients. No technical surprises or hidden costs.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}