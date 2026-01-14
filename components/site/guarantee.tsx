"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { GUARANTEE_TEXT_FR } from "@/data/pricing";

export function Guarantee() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-6">
      <div className="rounded-[24px] border bg-card p-6 text-center card-elevated">
        <div className="flex flex-col items-center gap-3">
          <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-muted text-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-heading text-xl font-semibold">Garantie de résultat</h3>
            <p className="mt-1 text-foreground/90">
              {GUARANTEE_TEXT_FR}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}