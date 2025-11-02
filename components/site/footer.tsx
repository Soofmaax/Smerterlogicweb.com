import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <p className="text-sm text-muted-foreground">
          © 2025 smarterlogicweb.com - Une présence en ligne logique et humaine.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/votreprofil"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/votreprofil"
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
    </footer>
  );
}