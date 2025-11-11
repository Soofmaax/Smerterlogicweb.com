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
  cursor = heading1(doc, cursor, fonts, "Grille Tarifs 2025 — Sites Statiques pour Professions Libérales");
  cursor = paragraph(doc, cursor, fonts, "Avocats, experts-comptables, architectes, notaires : votre présence en ligne, sans compromis", 12);
  cursor = hr(doc, cursor, fonts);

  // Executive summary (callout)
  cursor = calloutBox(
    doc,
    cursor,
    fonts,
    "Résumé",
    [
      "3 offres : Essentiel 1 490€ — Professionnel 2 490€ — Premium 4 990€ TTC.",
      "Zéro maintenance obligatoire (statique) : seul le domaine (~15€/an).",
      "Performance, sécurité, propriété du code et du domaine.",
    ],
    "info"
  );

  // Introduction
  cursor = heading2(doc, cursor, fonts, "Introduction : Pourquoi cette grille tarifaire existe");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Les tarifs affichés sont souvent flous, les inclusions mal définies, et les coûts cachés apparaissent après signature. Cette grille élimine la friction : transparence totale, performances mesurables dès la livraison, et absence de maintenance technique obligatoire."
  );
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Vous payez une fois pour la création, puis aucun frais de maintenance imposé. Seul coût récurrent : le renouvellement annuel du nom de domaine (~15€/an)."
  );
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Ciblé professions libérales : site vitrine crédible, rapide, fiable, sans gérer un CMS complexe. Votre métier est d’accompagner vos clients — pas de surveiller des plugins."
  );

  // Offres
  cursor = heading1(doc, cursor, fonts, "Nos trois offres : Essentiel, Professionnel, Premium");

  // Essentiel
  cursor = heading2(doc, cursor, fonts, "Offre Essentiel — 1 490€ TTC");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Présence claire et efficace pour cabinets individuels et structures récentes. 4–5 pages (Accueil, Services, À propos, Contact, Mentions légales). Design responsive mobile‑first."
  );
  cursor = bulletList(doc, cursor, fonts, [
    "Formulaire de contact sécurisé, RGPD, envoi vers email pro.",
    "SEO de base : balises essentielles, sémantique, vitesse, Search Console.",
    "Hébergement + SSL inclus 1 an, uptime > 99.9%.",
    "Délai : 2–3 semaines après contenus et brief validés.",
    "Paiement : 50% (745€) à la signature + 50% (745€) à la livraison.",
  ]);

  // Professionnel
  cursor = heading2(doc, cursor, fonts, "Offre Professionnel — 2 490€ TTC");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Pour cabinets établis souhaitant un site plus complet et une stratégie de contenu. 6–8 pages, blog intégré (catégories, pagination, RSS)."
  );
  cursor = bulletList(doc, cursor, fonts, [
    "SEO avancé : analyse concurrentielle, mots‑clés, balisage schema.org, sitemap/robots, GA4 + SC.",
    "Contenus optimisés : réécriture si fournis, rédaction possible en option, images WebP rapides.",
    "Formation 30 min : autonomie pour modifier textes, images, articles.",
    "Délai : 4–6 semaines. Processus avec 2 itérations de design, recette intermédiaire.",
    "Paiement : 50% (1 245€) signature + 30% (747€) maquettes + 20% (498€) livraison.",
  ]);

  // Premium
  cursor = heading2(doc, cursor, fonts, "Offre Premium — 4 990€ TTC");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Site sur‑mesure avec stratégie marketing. 10–15 pages, architecture informationnelle poussée, pages services détaillées, FAQ sectorielles, pages locales."
  );
  cursor = bulletList(doc, cursor, fonts, [
    "Stratégie éditoriale : audit concurrentiel, calendrier 3 mois, 6 articles inclus (rédaction SEO).",
    "Accompagnement : formation 2h, analyse mensuelle 3 mois + recommandations, guide rédaction personnalisé.",
    "Formule Évolution offerte 6 mois : 1h/mois, support prioritaire, monitoring, tarifs préférentiels.",
    "Délai : 8–12 semaines, mode agile, jalons réguliers.",
    "Paiement : 40% (1 996€) signature + 30% (1 497€) maquettes + 20% (998€) recette + 10% (499€) livraison.",
  ]);

  // Comparatif synthétique
  cursor = heading1(doc, cursor, fonts, "Tableau comparatif (synthèse)");
  cursor = bulletList(doc, cursor, fonts, [
    "Pages : Essentiel 4–5 — Pro 6–8 — Premium 10–15.",
    "Responsive, formulaire : inclus dans les 3.",
    "Blog : Essentiel non — Pro oui — Premium oui.",
    "SEO : Essentiel base — Pro avancé — Premium avancé + 6 articles.",
    "Contenus optimisés : Essentiel non — Pro oui — Premium oui (éditorial).",
    "Formation : Essentiel non — Pro 30 min — Premium 2 h.",
    "Évolution offerte : Essentiel non — Pro non — Premium 6 mois.",
    "Délais : Essentiel 2–3 sem. — Pro 4–6 sem. — Premium 8–12 sem.",
    "Prix TTC : Essentiel 1 490€ — Pro 2 490€ — Premium 4 990€.",
  ]);

  // Formule Évolution
  cursor = heading1(doc, cursor, fonts, "Formule Évolution — maintenance optionnelle (20€/mois)");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "Sites statiques : pas de maintenance technique obligatoire. La formule Évolution est une option flexible pour faire évoluer le contenu quand vous en avez besoin."
  );
  cursor = bulletList(doc, cursor, fonts, [
    "20€/mois sans engagement, activable/désactivable à volonté.",
    "1h de modifs/mois (cumul 3 mois) : textes, images, publication d’articles.",
    "Support prioritaire (réponse < 24h ouvrées), monitoring uptime & vitesse.",
    "Tarifs préférentiels : refontes partielles –30%, fonctionnalités –25%, article SEO 99€.",
    "Offerte 6 mois avec l’offre Premium.",
  ]);

  // Modalités de paiement
  cursor = heading1(doc, cursor, fonts, "Modalités de paiement");
  cursor = bulletList(doc, cursor, fonts, [
    "Essentiel : 50% à la signature, 50% à la livraison.",
    "Professionnel : 50% signature, 30% maquettes, 20% livraison.",
    "Premium : 40% signature, 30% maquettes, 20% recette, 10% livraison.",
    "Max 4 échéances — pas de mensualités longues masquant un surcoût.",
    "Virement bancaire (et SEPA pour Évolution). Montants TTC.",
  ]);

  // Pourquoi pas de maintenance obligatoire
  cursor = heading1(doc, cursor, fonts, "Pourquoi nos sites statiques n’exigent aucune maintenance obligatoire");
  cursor = paragraph(
    doc,
    cursor,
    fonts,
    "WordPress = base de données + PHP + plugins ⇒ mises à jour fréquentes et coûteuses (tests, compatibilités). Statique = HTML/CSS/JS pré‑générés ⇒ pas de mises à jour techniques imposées, stabilité sur la durée."
  );
  cursor = bulletList(doc, cursor, fonts, [
    "Pas de base de données, pas de surface d’attaque CMS.",
    "Chargement < 1s possible, meilleur pour la conversion.",
    "Coût récurrent minimal : domaine ~15€/an.",
  ]);

  // CTA
  cursor = ctaBanner(doc, cursor, fonts, [
    "Consulter les détails et commander : smarterlogicweb.com/tarifs-2025",
    "Un projet ? contact@smarterlogicweb.com — Audit gratuit 15 min",
  ]);

  addFooters(doc, fonts);

  const bytes = await doc.save();
  // Use Blob to satisfy NextResponse BodyInit types and avoid SharedArrayBuffer union
  const blob = new Blob([bytes], { type: "application/pdf" });
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="grille-tarifs-2025.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}