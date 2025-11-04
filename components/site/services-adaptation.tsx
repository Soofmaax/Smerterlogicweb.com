import * as React from "react";
import { FileText, IdCard, Image as ImageIcon, QrCode, Mail, Palette } from "lucide-react";

export function ServicesAdaptation() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">
          Services d&apos;Adaptation Graphique
        </h2>
        <p className="mt-2 text-foreground/70">
          Si vous avez déjà votre identité visuelle, je peux adapter vos supports de communication en cohérence avec votre site web.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card icon={<IdCard className="h-5 w-5" />} title="Cartes de visite professionnelles">
          Adaptation et mise en page à partir de votre charte (formats standards, impression prête).
        </Card>
        <Card icon={<FileText className="h-5 w-5" />} title="Flyers et supports print">
          Déclinaison de votre identité pour vos supports imprimés (PDF haute qualité).
        </Card>
        <Card icon={<QrCode className="h-5 w-5" />} title="QR codes personnalisés">
          Génération de QR codes vers votre site, couleurs et marges harmonisées à votre charte.
        </Card>
        <Card icon={<ImageIcon className="h-5 w-5" />} title="Photos de profil & bannières">
          Optimisation des visuels pour réseaux sociaux (formats, cadrages, poids).
        </Card>
        <Card icon={<Mail className="h-5 w-5" />} title="Signatures email professionnelles">
          Templates de signatures cohérentes avec votre identité (Gmail/Outlook).
        </Card>
        <Card icon={<Palette className="h-5 w-5" />} title="Conseils de déclinaison">
          Accompagnement pour décliner correctement votre charte sur vos supports.
        </Card>
      </div>

      <p className="mt-6 text-sm text-foreground/70">
        Note: ces services ne sont disponibles qu&apos;en complément d&apos;un site web et uniquement si vous disposez déjà d&apos;une
        identité visuelle établie. Pour une création graphique complète, je travaille avec des graphistes partenaires que je peux recommander.
      </p>
    </section>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg card-elevated">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-foreground">
          {icon}
        </span>
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-foreground/80">{children}</p>
    </div>
  );
}