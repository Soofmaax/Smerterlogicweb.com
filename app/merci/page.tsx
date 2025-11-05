export const metadata = {
  title: "Merci — smarterlogicweb.com",
  description: "Votre message a été envoyé. Je reviens vers vous sous 24h.",
  alternates: {
    canonical: "/merci",
    languages: {
      "fr-FR": "/merci",
      "en-US": "/en/thank-you",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/merci",
    title: "Merci — smarterlogicweb.com",
    description: "Votre message a été envoyé. Je reviens vers vous sous 24h.",
  },
};

export default function MerciPage() {
  return (
    <section className="mx-auto w-full max-w-xl px-6 py-24 text-center">
      <div className="success-enter">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Merci pour votre message</h1>
        <p className="mt-4 text-foreground/80">
          Je vous répondrai sous 24 heures. Si votre demande est urgente, écrivez directement à{" "}
          <a href="mailto:contact@smarterlogicweb.com" className="underline">contact@smarterlogicweb.com</a>.
        </p>
      </div>
    </section>
  );
}