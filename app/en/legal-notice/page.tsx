export const metadata = {
  title: "Legal notice — smarterlogicweb.com",
  description:
    "Legal notice of smarterlogicweb.com: publisher, hosting, intellectual property, contact.",
  alternates: {
    canonical: "/en/legal-notice",
    languages: {
      "en-US": "/en/legal-notice",
      "fr-FR": "/mentions-legales",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/legal-notice",
    title: "Legal notice — smarterlogicweb.com",
    description:
      "Legal notice of smarterlogicweb.com: publisher, hosting, intellectual property, contact.",
  },
};

export default function LegalNoticePage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[28px] card-elevated border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Legal notice</h1>

        <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
          <h2>Publisher</h2>
          <p>
            smarterlogicweb.com — Contact{" "}
            <a href="mailto:contact@smarterlogicweb.com">contact@smarterlogicweb.com</a>
          </p>

          <h2>Hosting</h2>
          <p>The site is hosted by a GDPR‑compliant European cloud provider.</p>

          <h2>Intellectual property</h2>
          <p>
            All content (texts, visuals, graphics) on this website is protected by copyright.
            Any reproduction or representation, in whole or in part, without prior authorisation is prohibited.
          </p>

          <h2>Liability</h2>
          <p>
            Information provided on this site is for information purposes only. The publisher cannot be held liable
            for any direct or indirect damage resulting from the use of the site’s information and content.
          </p>

          <h2>Contact</h2>
          <p>
            For any question, please email{" "}
            <a href="mailto:contact@smarterlogicweb.com">contact@smarterlogicweb.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}