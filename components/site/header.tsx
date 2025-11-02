"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openProjets, setOpenProjets] = useState(false);

  // Close on ESC and lock scroll when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setOpenServices(false);
      setOpenProjets(false);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Passer au contenu
      </a>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">smarterlogicweb</span>
          <span className="sr-only">Accueil</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 md:flex">
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

        {/* CTA desktop */}
        <div className="hidden md:block">
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

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 block bg-background/95 backdrop-blur md:hidden"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
                <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">smarterlogicweb</span>
                <span className="sr-only">Accueil</span>
              </Link>
              <button
                className="inline-flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-6 space-y-2 text-lg" aria-label="Navigation mobile">
              {/* Projets with submenu */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-foreground hover:bg-accent/50"
                  aria-expanded={openProjets}
                  aria-controls="submenu-projets"
                  onClick={() => setOpenProjets((v) => !v)}
                >
                  <span>Projets</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openProjets ? "rotate-180" : ""}`} />
                </button>
                {openProjets && (
                  <div id="submenu-projets" className="ml-4 border-l pl-3">
                    <Link href="/projets#refonte-associatif" className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      Refonte associatif
                    </Link>
                    <Link href="/projets#site-vitrine-artisan" className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      Site vitrine artisan
                    </Link>
                    <Link href="/projets#optimisation-performance" className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      Optimisation performance
                    </Link>
                  </div>
                )}
              </div>

              {/* Services with submenu */}
              <div className="mt-1">
                <button
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-foreground hover:bg-accent/50"
                  aria-expanded={openServices}
                  aria-controls="submenu-services"
                  onClick={() => setOpenServices((v) => !v)}
                >
                  <span>Services</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openServices ? "rotate-180" : ""}`} />
                </button>
                {openServices && (
                  <div id="submenu-services" className="ml-4 border-l pl-3">
                    <Link href="/services#vitrine" className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      Site vitrine rapide
                    </Link>
                    <Link href="/services#refonte" className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      Refonte & optimisation
                    </Link>
                    <Link href="/services#accompagnement" className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      Accompagnement continu
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/a-propos" className="block rounded-md px-2 py-2 text-foreground hover:bg-accent/50" onClick={() => setOpen(false)}>
                À propos
              </Link>
              <Link href="/engagement-associatif" className="block rounded-md px-2 py-2 text-foreground hover:bg-accent/50" onClick={() => setOpen(false)}>
                Engagement
              </Link>
              <Link href="/contact" className="block rounded-md px-2 py-2 text-foreground hover:bg-accent/50" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </nav>

            <div className="mt-6">
              <Button
                asChild
                className="w-full rounded-full"
                aria-label="Obtenir un devis gratuit par email"
                onClick={() => setOpen(false)}
              >
                <Link href="mailto:contact@smarterlogicweb.com?subject=Devis%20gratuit%20-%20Nouveau%20projet">
                  Obtenir mon devis gratuit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}