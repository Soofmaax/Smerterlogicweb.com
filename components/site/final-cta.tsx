import * as React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { BookingButton } from "@/components/site/booking-modal";

export function FinalCTA() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 py-14">
      <div className="overflow-hidden rounded-[28px] border bg-gradient-to-br from-primary/10 via-transparent to-primary/5 p-8 text-center card-elevated">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">
          Prêt à Donner à Votre Entreprise le Site Web qu&#39;elle Mérite ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-foreground/80">
          Discutons de votre projet sans engagement. Je vous propose un audit gratuit de vos besoins et une
          estimation personnalisée sous 48h.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="cta" className="rounded-full animate-[pulse_3s_ease-in-out_infinite]">
            <Link href="#tarifs">Voir les tarifs et exemples</Link>
          </Button>
          <BookingButton className="h-11 px-6" label="Réserver mon audit gratuit (15 min)" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Reassure icon={<Clock className="h-4 w-4" />} text="Sans engagement • Réponse sous 48h" />
          <Reassure icon={<CheckCircle2 className="h-4 w-4" />} text="Devis détaillé et transparent" />
          <Reassure icon={<Phone className="h-4 w-4" />} text="Premier échange téléphonique offert" />
        </div>
      </div>
    </section>
  );
}

function Reassure({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-sm backdrop-blur">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  );
}