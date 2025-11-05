import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { Search404 } from "@/components/site/search-404";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[26rem] w-[26rem] rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[24rem] w-[24rem] rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        {/* Illustration with bounce */}
        <div className="bounce-in inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Compass className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>

        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Oups... Cette Page N&apos;Existe Pas
        </h1>
        <p className="mt-3 text-foreground/80">
          Le lien est peut-être cassé, ou la page a déménagé. Pas de panique, je vous aide à retrouver votre chemin.
        </p>

        {/* Search */}
        <Search404 />

        {/* Useful links */}
        <div className="stagger mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="stagger-item">
            <Button asChild className="w-full rounded-full">
              <Link href="/">Retour à l’accueil</Link>
            </Button>
          </div>
          <div className="stagger-item">
            <Button asChild variant="secondary" className="w-full rounded-full">
              <Link href="/projets">Voir mes réalisations</Link>
            </Button>
          </div>
          <div className="stagger-item">
            <Button asChild variant="secondary" className="w-full rounded-full">
              <Link href="/services">Découvrir mes services</Link>
            </Button>
          </div>
          <div className="stagger-item">
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="/contact">Me contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}