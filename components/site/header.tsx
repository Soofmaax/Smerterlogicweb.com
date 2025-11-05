"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { track } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openProjets, setOpenProjets] = useState(false);
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const prefix = isEn ? "/en" : "";

  const t = useMemo(
    () =>
      isEn
        ? {
            skip: "Skip to content",
            nav: {
              projects: "Projects",
              services: "Services",
              about: "About",
              commitment: "Commitment",
              contact: "Contact",
            },
            projects: {
              item1: "Nonprofit redesign",
              item2: "Showcase site for artisan",
              item3: "Performance optimisation",
            },
            services: {
              item1: "Fast showcase site",
              item2: "Redesign & optimisation",
              item3: "Ongoing support",
            },
            cta: "View pricing and examples",
            baseline: "I build simple, effective websites so your customers can find you easily",
            lang: "FR",
          }
        : {
            skip: "Passer au contenu",
            nav: {
              projects: "Projets",
              services: "Services",
              about: "À propos",
              commitment: "Engagement",
              contact: "Contact",
            },
            projects: {
              item1: "Refonte associatif",
              item2: "Site vitrine artisan",
              item3: "Optimisation performance",
            },
            services: {
              item1: "Site vitrine rapide",
              item2: "Refonte & optimisation",
              item3: "Accompagnement continu",
            },
            cta: "Voir les tarifs et exemples",
            baseline: "Je crée des sites web simples et efficaces pour que vos clients vous trouvent facilement",
            lang: "EN",
          },
    [isEn]
  );

  // slug mapping for language switch
  const frToEn: Record<string, string> = {
    "": "",
    "projets": "projects",
    "services": "services",
    "a-propos": "about",
    "engagement-associatif": "nonprofit-commitment",
    "contact": "contact",
    "mentions-legales": "legal-notice",
    "politique-de-confidentialite": "privacy-policy",
    "merci": "thank-you",
    "securite": "security",
  };
  const enToFr: Record<string, string> = Object.fromEntries(Object.entries(frToEn).map(([k, v]) => [v, k]));

  function switchLocalePath(path: string) {
    const p = path.startsWith("/en") ? path.slice(3) || "/" : path;
    const parts = p.split("/").filter(Boolean);
    const first = parts[0] || "";
    if (path.startsWith("/en")) {
      // EN -> FR
      const mapped = enToFr[first] ?? first;
      return mapped ? `/${mapped}${parts.slice(1).length ? `/${parts.slice(1).join("/")}` : ""}` : "/";
    } else {
      // FR -> EN
      const mapped = frToEn[first] ?? first;
      return `/en${mapped ? `/${mapped}${parts.slice(1).length ? `/${parts.slice(1).join("/")}` : ""}` : ""}`;
    }
  }

  const langSwitchHref = switchLocalePath(pathname);
  const pricingHref = isEn ? "/en#tarifs" : "/#tarifs";

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
        {t.skip}
      </a>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href={isEn ? "/en" : "/"} className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">smarterlogicweb</span>
            <span className="sr-only">{isEn ? "Home" : "Accueil"}</span>
          </Link>
          <span className="hidden text-xs text-muted-foreground md:inline">
            {t.baseline}
          </span>
        </div>

        <nav aria-label={isEn ? "Main navigation" : "Navigation principale"} className="hidden items-center gap-6 md:flex">
          {/* Projets dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-haspopup="menu"
              aria-expanded={false}
            >
              {t.nav.projects}
              <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-hover:rotate-180" />
            </button>
            <div
              role="menu"
              className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border bg-popover p-2 opacity-0 shadow-sm transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
            >
              <Link href={`${prefix}/${isEn ? "projects" : "projets"}#refonte-associatif`.replace("//", "/")} role="menuitem" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/60">
                {t.projects.item1}
              </Link>
              <Link href={`${prefix}/${isEn ? "projects" : "projets"}#site-vitrine-artisan`.replace("//", "/")} role="menuitem" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/60">
                {t.projects.item2}
              </Link>
              <Link href={`${prefix}/${isEn ? "projects" : "projets"}#optimisation-performance`.replace("//", "/")} role="menuitem" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/60">
                {t.projects.item3}
              </Link>
            </div>
          </div>

          {/* Services dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-haspopup="menu"
              aria-expanded={false}
            >
              {t.nav.services}
              <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-hover:rotate-180" />
            </button>
            <div
              role="menu"
              className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-56 rounded-lg border bg-popover p-2 opacity-0 shadow-sm transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
            >
              <Link href={`${prefix}/services#vitrine`.replace("//", "/")} role="menuitem" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/60">
                {t.services.item1}
              </Link>
              <Link href={`${prefix}/services#refonte`.replace("//", "/")} role="menuitem" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/60">
                {t.services.item2}
              </Link>
              <Link href={`${prefix}/services#accompagnement`.replace("//", "/")} role="menuitem" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/60">
                {t.services.item3}
              </Link>
            </div>
          </div>

          <Link href={`${prefix}/${isEn ? "about" : "a-propos"}`.replace("//", "/")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.about}
          </Link>
          <Link href={`${prefix}/${isEn ? "nonprofit-commitment" : "engagement-associatif"}`.replace("//", "/")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.commitment}
          </Link>
          <Link href={`${prefix}/contact`.replace("//", "/")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.contact}
          </Link>

          {/* Language switch */}
          <Link href={langSwitchHref} className="text-xs text-muted-foreground hover:text-foreground" aria-label="Switch language">
            {t.lang}
          </Link>
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-full px-4 py-2 text-sm font-medium"
            aria-label={isEn ? "View pricing and examples" : "Voir les tarifs et exemples"}
          >
            <Link
              href={pricingHref}
              onClick={() => track("cta_view_pricing_header")}
            >
              {t.cta}
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-label={open ? (isEn ? "Close menu" : "Fermer le menu") : (isEn ? "Open menu" : "Ouvrir le menu")}
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
              <Link href={isEn ? "/en" : "/"} className="flex items-center gap-2 text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
                <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">smarterlogicweb</span>
                <span className="sr-only">{isEn ? "Home" : "Accueil"}</span>
              </Link>
              <button
                className="inline-flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={isEn ? "Close menu" : "Fermer le menu"}
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-6 space-y-2 text-lg" aria-label={isEn ? "Mobile navigation" : "Navigation mobile"}>
              {/* Projets with submenu */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-foreground hover:bg-accent/50"
                  aria-expanded={openProjets}
                  aria-controls="submenu-projets"
                  onClick={() => setOpenProjets((v) => !v)}
                >
                  <span>{t.nav.projects}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openProjets ? "rotate-180" : ""}`} />
                </button>
                {openProjets && (
                  <div id="submenu-projets" className="ml-4 border-l pl-3">
                    <Link href={`${prefix}/${isEn ? "projects" : "projets"}#refonte-associatif`.replace("//", "/")} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      {t.projects.item1}
                    </Link>
                    <Link href={`${prefix}/${isEn ? "projects" : "projets"}#site-vitrine-artisan`.replace("//", "/")} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      {t.projects.item2}
                    </Link>
                    <Link href={`${prefix}/${isEn ? "projects" : "projets"}#optimisation-performance`.replace("//", "/")} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      {t.projects.item3}
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
                  <span>{t.nav.services}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openServices ? "rotate-180" : ""}`} />
                </button>
                {openServices && (
                  <div id="submenu-services" className="ml-4 border-l pl-3">
                    <Link href={`${prefix}/services#vitrine`.replace("//", "/")} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      {t.services.item1}
                    </Link>
                    <Link href={`${prefix}/services#refonte`.replace("//", "/")} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      {t.services.item2}
                    </Link>
                    <Link href={`${prefix}/services#accompagnement`.replace("//", "/")} className="block py-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                      {t.services.item3}
                    </Link>
                  </div>
                )}
              </div>

              <Link href={`${prefix}/a-propos`.replace("//", "/")} className="block rounded-md px-2 py-2 text-foreground hover:bg-accent/50" onClick={() => setOpen(false)}>
                {t.nav.about}
              </Link>
              <Link href={`${prefix}/engagement-associatif`.replace("//", "/")} className="block rounded-md px-2 py-2 text-foreground hover:bg-accent/50" onClick={() => setOpen(false)}>
                {t.nav.commitment}
              </Link>
              <Link href={`${prefix}/contact`.replace("//", "/")} className="block rounded-md px-2 py-2 text-foreground hover:bg-accent/50" onClick={() => setOpen(false)}>
                {t.nav.contact}
              </Link>

              {/* Language switch */}
              <div className="pt-2">
                <Link href={langSwitchHref} className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                  {t.lang}
                </Link>
              </div>
            </nav>

            <div className="mt-6">
              <Button
                asChild
                className="w-full rounded-full"
                aria-label={isEn ? "View pricing and examples" : "Voir les tarifs et exemples"}
                onClick={() => setOpen(false)}
              >
                <Link href={pricingHref} onClick={() => track("cta_view_pricing_header_mobile")}>
                  {t.cta}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}