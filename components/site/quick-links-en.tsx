"use client";

import Link from "next/link";

type Props = {
  className?: string;
  title?: string;
};

export function QuickLinksEN({ className, title = "Further reading" }: Props) {
  return (
    <section className={["mx-auto w-full max-w-3xl px-6 py-8", className].filter(Boolean).join(" ")}>
      <div className="rounded-[28px] card-elevated border bg-card p-6 text-center">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-foreground/80">
          Pricing, projects and contact — quick links:
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <Link href="/en/services" className="text-primary hover:underline">
            Pricing & offers
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/en/projects" className="text-primary hover:underline">
            Projects
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/en/blog" className="text-primary hover:underline">
            Blog
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/en/contact" className="text-primary hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}