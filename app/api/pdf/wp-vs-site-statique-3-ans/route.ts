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

export const runtime = "nodejs";

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
    "Résumé chiffré",
    [
      "WordPress (freelance, maintenance 50€/mois, licences 250€/an) : 4 050€ / 3 ans.",
      "Site statique (Évolution 6 mois/an) : 2 895€ / 3 ans.",
      "Économie estimée : ~1 155€ (≈ –28 %) — hors coûts indirects (pannes, sécurité, lenteur).",
    ],
    "info"
  );

  // Intro
  cursor = heading2(doc, cursor, fonts, "Introduction : L'illusion du « site WordPress pas cher »");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Comparer uniquement le prix de création (ex. WordPress 1 500€ vs statique 2 490€) masque l’essentiel : le coût total de possession (TCO) sur 3 ans. Votre site doit être fiable, rapide et sécurisé — une panne, une lenteur, un piratage coûtent cher en image et en opportunités."
  );
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Ce guide présente une analyse chiffrée des coûts réels d’un site WordPress versus un site statique sur 3 ans afin de décider sur des faits, pas sur un prix d’appel."
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
    "Création initiale vitrine (freelance compétent) : 1 500€ à 3 000€. Hébergement pro : 50€ à 200€/an (éviter les offres très bas de gamme). Licences premium : 200€ à 400€/an (sauvegarde, performance, sécurité, builder)."
  );
  cursor = heading2(doc, cursor, fonts, "Les coûts de maintenance technique");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Mises à jour WordPress + plugins à tester et déployer proprement (environnement de pré‑prod, sauvegarde, retour arrière possible). Forfaits observés : 30€ à 100€/mois (freelance) ; 75€ à 500€/mois (agence). Hypothèse basse (50€/mois) = 1 800€ sur 3 ans."
  );
  cursor = heading2(doc, cursor, fonts, "Coûts cachés et risques financiers");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pannes (incompatibilité, plugin défectueux) ; coût de l’interruption selon activité. Sécurité : WordPress, très répandu, est une cible privilégiée ; remise en état en urgence coûteuse et impact réputationnel."
  );
  cursor = heading2(doc, cursor, fonts, "Exemple chiffré WordPress (vitrine standard)");
  cursor = bulletList(doc, cursor, fonts, [
    "Année 0 : création 1 500€.",
    "Années 1–3 : maintenance 600€/an (50€/mois) + licences 250€/an = 850€/an.",
    "Total 3 ans : 1 500€ + (850€ × 3) = 4 050€ (hors pannes/interventions urgentes).",
  ]);

  // Static TCO
  cursor = heading1(doc, cursor, fonts, "Partie 2 : Le coût total de possession d’un site statique");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Le site statique est pré‑généré (HTML/CSS/JS), sans base de données ni plugins. Résultat : surface d’attaque minimale, quasi‑absence de maintenance, vitesse supérieure."
  );
  cursor = heading2(doc, cursor, fonts, "Les coûts visibles");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Création (niveau pro) : 2 490€ TTC (6–8 pages, SEO avancé, contenus optimisés). Hébergement moderne (Netlify/Vercel) : gratuit à faible/moyen trafic. Nom de domaine : 10–20€/an."
  );
  cursor = heading2(doc, cursor, fonts, "Maintenance technique");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Aucune maintenance obligatoire : pas de mises à jour hebdomadaires, pas de compatibilités plugins à gérer. Le coût de possession récurrent se limite au domaine (~15€/an)."
  );
  cursor = heading2(doc, cursor, fonts, "Évolution facultative");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Formule Évolution (optionnelle) : 20€/mois, 1h de modifs/mois (cumulable 3 mois), support prioritaire, monitoring, tarifs préférentiels. Activable/désactivable selon besoin."
  );
  cursor = heading2(doc, cursor, fonts, "Exemple chiffré site statique (offre Professionnel)");
  cursor = bulletList(doc, cursor, fonts, [
    "Année 0 : création 2 490€.",
    "Années 1–3 : domaine ~15€/an + Évolution 6 mois/an à 20€/mois = 135€/an.",
    "Total 3 ans : 2 490€ + (135€ × 3) = 2 895€ (ou 2 535€ sans Évolution).",
  ]);

  // Comparison
  cursor = heading1(doc, cursor, fonts, "Partie 3 : Comparaison chiffrée et analyse");
  cursor = bulletList(doc, cursor, fonts, [
    "WordPress (freelance, maintenance 50€/mois, licences 250€/an) : 4 050€ / 3 ans.",
    "Site statique (Évolution 6 mois/an) : 2 895€ / 3 ans.",
    "Économie : 1 155€ (≈ –28 %). Avec maintenance agence 100€/mois : économie ≈ 2 755€ (≈ –50 %).",
  ]);
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Hors coûts indirects : statique plus rapide (meilleure conversion), plus sécurisé (moins d’attaques), charge mentale nulle (pas de mises à jour continues)."
  );

  // Why initial higher creation cost
  cursor = heading1(doc, cursor, fonts, "Partie 4 : Pourquoi le statique est‑il plus cher à la création ?");
  cursor = bulletList(doc, cursor, fonts, [
    "Exigence technique (Next.js/React), code sur‑mesure plutôt que templates.",
    "Optimisations natives (WebP, cache, lazy‑load, sémantique, mobile‑first).",
    "Coût total de possession maîtrisé : investissement initial pour économies durables.",
  ]);
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pour un cabinet libéral (avocat, expert‑comptable, architecte…), la fiabilité et la vitesse priment : le site est un actif professionnel, pas un gadget."
  );

  // Conclusion + CTA banner
  cursor = heading1(doc, cursor, fonts, "Conclusion : Choisir en fonction de vos priorités");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Le choix ne se résume pas au prix de départ. Souhaitez‑vous le plus bas coût de création, ou le plus bas coût de possession sur 3 ans ? WordPress offre une flexibilité via plugins ; le statique offre fiabilité, sécurité et sérénité."
  );
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pour les professions libérales, un site statique allie économie mesurable et tranquillité d’esprit. Vous investissez une fois, puis vous économisez."
  );

  cursor = ctaBanner(doc, cursor, fonts, [
    "Voir la grille complète : smarterlogicweb.com/tarifs-2025",
    "Discutons de votre projet : contact@smarterlogicweb.com (audit 15 min offert)",
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