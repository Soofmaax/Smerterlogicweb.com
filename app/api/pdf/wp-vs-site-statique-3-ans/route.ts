import { NextResponse } from "next/server";
import {
  createBrandDoc,
  heading1,
  heading2,
  paragraph,
  bulletList,
  hr,
  addFooters,
  calloutBox,
  ctaBanner,
} from "@/lib/pdf-brand";
import { SITE_URL, CONTACT_EMAIL } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { doc, fonts, cursor: start } = await createBrandDoc();
  let cursor = start;

  // Cover
  cursor = heading1(doc, cursor, fonts, "WordPress vs Site Statique : Le VRAI coût sur 3 ans");
  cursor = paragraph(doc, cursor, fonts, "Guide comparatif 2025 pour professions libérales", 12);
  cursor = hr(doc, cursor, fonts);

  // Executive summary (callout)
  cursor = calloutBox(
    doc,
    cursor,
    fonts,
    "Résumé synthétique",
    [
      "WordPress (freelance, maintenance et licences payantes) : coût total élevé sur 3 ans.",
      "Site statique avec une petite dose d'accompagnement : coût total plus faible et plus prévisible.",
      "Économie typique : de l'ordre de 25–40 % — sans compter les coûts indirects (pannes, sécurité, lenteur).",
    ],
    "info"
  );

  // Intro
  cursor = heading2(doc, cursor, fonts, "Introduction : L'illusion du « site WordPress pas cher »");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Comparer uniquement le prix de création (ex. un WordPress apparemment « pas cher » vs un statique un peu plus investi au départ) masque l’essentiel : le coût total de possession (TCO) sur 3 ans. Votre site doit être fiable, rapide et sécurisé — une panne, une lenteur, un piratage coûtent cher en image et en opportunités."
  );
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Ce guide présente une analyse des coûts réels d’un site WordPress versus un site statique sur 3 ans afin de décider sur des faits, pas sur un prix d’appel."
  );

  // WordPress TCO
  cursor = heading1(doc, cursor, fonts, "Partie 1 : Le coût total de possession d’un site WordPress");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "WordPress est un système dynamique (base de données + code serveur + plugins). Cette architecture exige une maintenance régulière (mises à jour, tests de compatibilité, sauvegardes), sous peine de failles de sécurité et de pannes."
  );
  cursor = heading2(doc, cursor, fonts, "Les coûts visibles");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Création initiale vitrine (freelance compétent) : budget significatif, souvent de plusieurs milliers d’euros selon l’envergure du projet. Hébergement professionnel : abonnement récurrent. Licences premium : coût annuel additionnel pour sauvegarde, performance, sécurité, builder visuel, etc."
  );
  cursor = heading2(doc, cursor, fonts, "Les coûts de maintenance technique");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Mises à jour WordPress + plugins à tester et déployer proprement (environnement de pré‑prod, sauvegarde, retour arrière possible). Dans la pratique, cela se traduit par un forfait mensuel récurrent côté freelance ou agence, qui s’ajoute au coût d’hébergement et aux licences premium, année après année."
  );
  cursor = heading2(doc, cursor, fonts, "Coûts cachés et risques financiers");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pannes (incompatibilité, plugin défectueux) ; coût de l’interruption selon activité. Sécurité : WordPress, très répandu, est une cible privilégiée ; remise en état en urgence coûteuse et impact réputationnel."
  );
  cursor = heading2(doc, cursor, fonts, "Exemple de trajectoire WordPress (vitrine standard)");
  cursor = bulletList(doc, cursor, fonts, [
    "Année 0 : création du site (investissement initial important).",
    "Années 1–3 : cumul des frais récurrents (maintenance, licences, hébergement).",
    "Total 3 ans : création + 3 ans de récurrents — avec un coût global souvent sous‑estimé au départ.",
  ]);

  // Static TCO
  cursor = heading1(doc, cursor, fonts, "Partie 2 : Le coût total de possession d’un site statique");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Le site statique est pré‑généré (HTML/CSS/JS), sans base de données ni plugins. Résultat : surface d’attaque minimale, quasi‑absence de maintenance, vitesse supérieure."
  );
  cursor = heading2(doc, cursor, fonts, "Les coûts visibles");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Création (niveau pro) : investissement initial pour 6–8 pages, SEO avancé et contenus optimisés. Hébergement moderne (Netlify/Vercel) : coût très faible à faible/moyen trafic. Nom de domaine : frais annuels modestes."
  );
  cursor = heading2(doc, cursor, fonts, "Maintenance technique");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Aucune maintenance obligatoire : pas de mises à jour hebdomadaires, pas de compatibilités plugins à gérer. Le coût de possession récurrent se limite essentiellement au domaine et à un hébergement très léger."
  );
  cursor = heading2(doc, cursor, fonts, "Évolution facultative");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Formule Évolution (optionnelle) : temps de modifications mensuel, support prioritaire, monitoring, tarifs préférentiels. Activable ou désactivable en fonction de la charge de travail du moment."
  );
  cursor = heading2(doc, cursor, fonts, "Exemple de trajectoire site statique (offre Professionnel)");
  cursor = bulletList(doc, cursor, fonts, [
    "Année 0 : création du site statique (investissement initial unique).",
    "Années 1–3 : domaine + accompagnement éventuel (Formule Évolution quelques mois par an).",
    "Total 3 ans : création + frais très contenus, sans maintenance technique obligatoire.",
  ]);

  // Comparison
  cursor = heading1(doc, cursor, fonts, "Partie 3 : Comparaison synthétique et analyse");
  cursor = bulletList(doc, cursor, fonts, [
    "WordPress (freelance + maintenance + licences) : coût global le plus élevé sur 3 ans.",
    "Site statique (avec un peu d’accompagnement) : coût global nettement plus bas à horizon 3 ans.",
    "Économie : souvent de l’ordre de 25–50 % sur 3 ans, selon votre configuration exacte.",
  ]);
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Hors coûts indirects : statique plus rapide (meilleure conversion), plus sécurisé (moins d’attaques), charge mentale nulle (pas de mises à jour continues)."
  );

  // Why initial higher creation cost
  cursor = heading1(doc, cursor, fonts, "Partie 4 : Pourquoi le statique est‑il parfois plus cher à la création ?");
  cursor = bulletList(doc, cursor, fonts, [
    "Exigence technique (Next.js/React), code sur‑mesure plutôt que templates.",
    "Optimisations natives (WebP, cache, lazy‑load, sémantique, mobile‑first).",
    "Coût total de possession maîtrisé : investissement initial pour économies durables.",
  ]);
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pour un cabinet libéral (avocat, expert‑comptable, architecte…), la fiabilité et la vitesse priment : le site est un actif professionnel, pas un gadget."
  );

  // Conclusion + CTA banner
  cursor = heading1(doc, cursor, fonts, "Conclusion : Choisir en fonction de vos priorités");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Le choix ne se résume pas au prix de départ. Souhaitez‑vous le plus bas coût de création, ou le plus bas coût de possession sur 3 ans ? WordPress offre une flexibilité via plugins ; le statique offre fiabilité, sécurité et sérénité."
  );
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pour les professions libérales, un site statique allie économie mesurable et tranquillité d’esprit. Vous investissez une fois, puis vous économisez."
  );

  cursor = ctaBanner(doc, cursor, fonts, [
    `Demander un devis pour votre site statique : ${SITE_URL}/contact`,
    `Discutons de votre projet : ${CONTACT_EMAIL} (audit 15 min offert)`,
  ]);

  addFooters(doc, fonts);

  const bytes = await doc.save();
  // Create a guaranteed ArrayBuffer and copy bytes into it to satisfy BodyInit
  const arrayBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(arrayBuffer).set(bytes);
  return new NextResponse(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="wordpress-vs-site-statique-3-ans.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}