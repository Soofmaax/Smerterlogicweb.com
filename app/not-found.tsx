import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-heading text-5xl font-bold tracking-tight">Page introuvable</h1>
      <p className="mt-4 text-foreground/80">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Button asChild className="rounded-full">
          <Link href="/">Retour à l’accueil</Link>
        </Button>
        <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
          Contacter
        </Link>
      </div>
    </section>
  );
}