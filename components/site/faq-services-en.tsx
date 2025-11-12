export function FAQServicesEN() {
  const items = [
    {
      q: "Why is no technical maintenance required?",
      a:
        "Static sites have no database, no plugins, and no CMS to update. They are inherently more secure and can run for years without technical intervention.",
    },
    {
      q: "What if I still want help with content changes?",
      a:
        "Use the optional Evolution plan (€20/month): 1 hour of changes per month, hours roll over for 3 months, priority support and monitoring.",
    },
    {
      q: "Can I switch plans after delivery?",
      a:
        "Yes. You can move from Essential to Professional or Premium. If you’re subscribed to the Evolution plan, a full redesign gets −30% (quote‑based).",
    },
    {
      q: "Who owns the website?",
      a:
        "You own it 100%. Source code is provided (private GitHub possible), domain is in your name, and you’re free to change provider at any time.",
    },
    {
      q: "What’s the timeline if I sign today?",
      a:
        "Essential: 2–3 weeks. Professional: 4–6 weeks. Premium: 8–12 weeks. Project start within 1 week (2 weeks for Premium).",
    },
    {
      q: "Can I pay in multiple installments?",
      a:
        "Yes. Essential: 2 payments (50/50). Professional: 3 payments (50/30/20). Premium: 4 payments (40/30/20/10). No payment plans beyond 4 installments.",
    },
    {
      q: "Can I get a custom quote?",
      a:
        "Yes. For e‑commerce, web apps, marketplaces or specific needs, contact us for a tailored quote.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">FAQ — Services</h2>
        <p className="mt-2 text-foreground/70">Simple answers to the most frequent questions.</p>
      </div>

      <div className="divide-y rounded-2xl border bg-card">
        {items.map((item, i) => (
          <details key={i} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium">{item.q}</span>
              <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-foreground/80">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}