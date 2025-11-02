import Link from "next/link";

export const metadata = {
  title: "Security — smarterlogicweb.com",
  description:
    "Responsible vulnerability disclosure policy. Thank you for helping keep smarterlogicweb.com secure.",
  alternates: { canonical: "/en/security" },
  openGraph: {
    url: "https://smarterlogicweb.com/en/security",
    title: "Security — smarterlogicweb.com",
    description:
      "Responsible vulnerability disclosure policy.",
  },
};

export default function SecurityPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Security</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        We take security seriously and encourage responsible disclosure of vulnerabilities.
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">How to report a vulnerability</h2>
          <p className="mt-2 text-foreground/80">
            Please email{" "}
            <Link href="mailto:contact@smarterlogicweb.com" className="underline">
              contact@smarterlogicweb.com
            </Link>{" "}
            with a clear description, a proof‑of‑concept if possible, and the potential impact.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Good practices</h2>
          <ul className="mt-2 list-disc pl-5 text-foreground/80">
            <li>Avoid negative impact on availability or data integrity.</li>
            <li>Do not publish details before a fix is deployed.</li>
            <li>Give us a reasonable time to remediate.</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold">Recognition</h2>
          <p className="mt-2 text-foreground/80">
            Thank you for your help. Unless otherwise required, we can credit you (if you wish) once the fix is live.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Standard file:{" "}
        <Link href="/.well-known/security.txt" className="underline">
          /.well-known/security.txt
        </Link>
      </p>
    </section>
  );
}