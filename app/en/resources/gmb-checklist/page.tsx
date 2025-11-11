import Link from "next/link";

export const metadata = {
  title: "Google Business Profile Checklist — Local Pack in 2–8 weeks",
  description:
    "High‑impact actions to reach the Local Pack fast: complete profile, photos, reviews, NAP consistency, regular posts.",
  alternates: {
    canonical: "/en/resources/gmb-checklist",
    languages: {
      "en-US": "/en/resources/gmb-checklist",
      "fr-FR": "/ressources/checklist-gmb",
    },
  },
};

export default function GBPChecklistEN() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Google Business Profile Checklist</h1>
        <p className="mt-2 text-foreground/80">
          Priorities to reach the Local Pack and generate calls quickly.
        </p>
        <div className="mt-3">
          <Link href="/api/pdf/gmb-checklist" className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-accent">
            Download PDF
          </Link>
        </div>
      </header>

      <ol className="list-decimal space-y-2 pl-6">
        <li>Create/claim your GBP and <strong>verify</strong> your address.</li>
        <li>Fill 100% of fields: name, address, local phone, hours, website, precise categories.</li>
        <li>Write a <strong>clear description</strong> with local keywords (service + city).</li>
        <li>Add 10+ <strong>photos</strong> (logo, cover, work, team) — quality and authenticity.</li>
        <li>Collect <strong>reviews</strong> continuously (share the direct link) and reply to all reviews.</li>
        <li>Publish 1–2 <strong>posts</strong> per month (news, offer, recent work) with photo and CTA.</li>
        <li>Ensure <strong>NAP consistency</strong> (Name‑Address‑Phone) across website, socials and directories.</li>
        <li>Track <strong>GBP stats</strong>: impressions, clicks, calls, directions — adjust categories/area.</li>
        <li>Link your profile to your <strong>website</strong> and embed the map/reviews on‑site.</li>
        <li>Repeat monthly: new reviews, new photos, regular posts.</li>
      </ol>

      <footer className="mt-8">
        <p className="text-sm text-muted-foreground">
          Tip: combine this checklist with a fast, clear website. See&nbsp;
          <Link href="/google-my-business-ou-site-web" className="text-primary hover:underline">
            GMB or website — which first?
          </Link>
        </p>
      </footer>
    </section>
  );
}