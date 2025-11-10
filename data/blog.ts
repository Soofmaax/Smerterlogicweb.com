import type { BlogPost } from "@/lib/blog";

// Seed content — replace with your own articles.
// To schedule automatically, just append new posts here (order matters).
// Each post will be assigned the next available Mon/Wed/Fri date at runtime.

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "pourquoi-un-site-vitrine-sur-mesure",
    locale: "fr",
    title: "Pourquoi un site vitrine sur‑mesure peut changer votre activité",
    summary:
      "Comprenez la différence entre un site générique et un site pensé pour vos objectifs — visibilité, confiance, conversions.",
    contentHtml: `
      <p>Un site sur‑mesure n’est pas seulement une question d’esthétique : c’est un levier concret pour vos objectifs — visibilité, crédibilité, et résultats.</p>
      <h2>Des objectifs clairs</h2>
      <p>Chaque section de votre site doit servir un but : prouver votre valeur, réduire les frictions et pousser à l’action.</p>
      <h2>Performance et simplicité</h2>
      <p>La vitesse, la sécurité et l’accessibilité ne sont pas des options : ce sont des bases. Un site rapide convertit mieux.</p>
      <p>En résumé : si votre site travaille pour vous, vous gagnez du temps et des clients.</p>
    `,
    tags: ["site vitrine", "conversion", "performance"],
  },
  {
    slug: "comment-augmenter-la-confiance-sur-votre-site",
    locale: "fr",
    title: "7 moyens d’augmenter la confiance sur votre site",
    summary:
      "Des preuves simples et concrètes : avis, réalisations, processus clair, accessibilité, et plus.",
    contentHtml: `
      <p>La confiance se construit avec des signaux clairs : avis, réalisations, transparence et cohérence.</p>
      <ol>
        <li>Affichez des avis authentiques</li>
        <li>Montrez des réalisations concrètes</li>
        <li>Expliquez votre processus simplement</li>
        <li>Rendez les actions faciles et visibles</li>
        <li>Respectez l’accessibilité</li>
        <li>Optimisez la vitesse : ça se ressent</li>
        <li>Proposez des garanties claires</li>
      </ol>
      <p>Ces éléments, mis ensemble, augmentent la conversion naturellement.</p>
    `,
    tags: ["confiance", "réalisations", "avis"],
  },
  {
    slug: "why-a-custom-showcase-website",
    locale: "en",
    title: "Why a custom showcase website can transform your business",
    summary:
      "Generic sites don’t persuade. A tailored site aligns content, speed and trust with your goals.",
    contentHtml: `
      <p>A custom site aligns with your goals: visibility, credibility and conversion.</p>
      <h2>Clarity and simplicity</h2>
      <p>Every section should serve a purpose and reduce friction.</p>
      <p>Fast, secure, accessible — these are fundamentals that drive results.</p>
    `,
    tags: ["showcase", "conversion", "performance"],
  },
];