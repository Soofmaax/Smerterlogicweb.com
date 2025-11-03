export const metadata = {
  title: "Thank you — smarterlogicweb.com",
  description: "Your message has been sent. I’ll get back to you within 24 hours.",
  alternates: {
    canonical: "/en/thank-you",
    languages: {
      "en-US": "/en/thank-you",
      "fr-FR": "/merci",
    },
  },
  openGraph: {
    url: "https://smarterlogicweb.com/en/thank-you",
    title: "Thank you — smarterlogicweb.com",
    description: "Your message has been sent. I’ll get back to you within 24 hours.",
  },
};

export default function ThankYouPage() {
  return (
    <section className="mx-auto w-full max-w-xl px-6 py-24 text-center">
      <h1 className="font-heading text-4xl font-bold tracking-tight">Thanks for your message</h1>
      <p className="mt-4 text-foreground/80">
        I’ll reply within 24 hours. If your request is urgent, email directly at{" "}
        <a href="mailto:contact@smarterlogicweb.com" className="underline">contact@smarterlogicweb.com</a>.
      </p>
    </section>
  );
}