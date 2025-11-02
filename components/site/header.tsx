import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">smarterlogicweb</span>
          <span className="sr-only">Accueil</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/projets" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Projets
          </Link>
          <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Services
          </Link>
          <Link href="/a-propos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            À propos
          </Link>
          <Link href="/engagement-associatif" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Engagement
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

        <Button
          asChild
          size="sm"
          className="rounded-full px-4 py-2 text-sm font-medium"
          aria-label="Obtenir un devis gratuit par email"
        >
          <Link href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit%20-%20Nouveau%20projet">
            Obtenir mon devis gratuit
          </Link>
        </Button>
      </div>
    </header>
  );
}