import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12">
          {/* Brand + tagline */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="rounded-md bg-accent px-2 py-1 text-sm font-semibold text-accent-foreground">
                smarterlogicweb
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Une présence en ligne logique et humaine. Simplicité, performance et exigence au service de vos objectifs.
            </p>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label="Navigation principale">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Navigation</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-muted-foreground transition-colors hover:text-foreground">
                  Projets
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground transition-colors hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-muted-foreground transition-colors hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/engagement-associatif"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Engagement
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav className="md:col-span-2" aria-label="Liens légaux">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Légal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground transition-colors hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="mailto:contact@smarterlogicweb.com"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  contact@smarterlogicweb.com
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/salwaessafi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/Soofmaax"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="mailto:contact@smarterlogicweb.com"
                aria-label="Envoyer un email"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t pt-6">
          <p className="text-xs text-muted-foreground">
            © 2025 smarterlogicweb.com — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}