export const metadata = {
  title: "Privacy policy — smarterlogicweb.com",
  description:
    "Privacy policy: data collected, purposes, legal basis, retention, user rights.",
  alternates: { canonical: "/en/privacy-policy" },
  openGraph: {
    url: "https://smarterlogicweb.com/en/privacy-policy",
    title: "Privacy policy — smarterlogicweb.com",
    description:
      "Privacy policy: data collected, purposes, legal basis, retention, user rights.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
        Privacy policy
      </h1>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <h2>Data collected</h2>
        <p>
          When you contact us via the form or by email, we collect your contact details (name, email)
          and the content of your message.
        </p>

        <h2>Purposes and legal basis</h2>
        <p>
          This data is used to respond to your request, prepare a proposal and ensure follow‑up.
          The processing is based on pre‑contractual measures and the legitimate interest of responding to requests.
        </p>

        <h2>Retention</h2>
        <p>
          Messages are kept for as long as necessary to process your request and up to 24 months for business follow‑up.
        </p>

        <h2>Data sharing</h2>
        <p>
          Data is not sold. It may be shared with technical providers (hosting, form tools) strictly necessary
          for the site to function.
        </p>

        <h2>Your rights</h2>
        <p>
          You have the right of access, rectification, objection, erasure, restriction and portability.
          To exercise these rights, contact:{" "}
          <a href="mailto:contact@smarterlogicweb.com">contact@smarterlogicweb.com</a>.
        </p>
      </div>
    </section>
  );
}