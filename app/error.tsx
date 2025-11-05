"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-[-10%] top-[-10%] h-[26rem] w-[26rem] rounded-full bg-emerald-300/10 blur-3xl" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[24rem] w-[24rem] rounded-full bg-rose-300/10 blur-3xl" />
          </div>

          <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
            <h1 className="font-heading text-5xl font-bold tracking-tight">Une erreur est survenue</h1>
            <p className="mt-4 text-foreground/80">
              Désolé pour la gêne occasionnée. Vous pouvez réessayer ou revenir à l’accueil.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button className="rounded-full" onClick={() => reset()}>Réessayer</Button>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Retour à l’accueil</Link>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}