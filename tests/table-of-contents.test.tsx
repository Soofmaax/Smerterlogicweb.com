import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableOfContents } from "@/components/site/table-of-contents";

const sampleHtml = `
  <h1 id="title">Titre principal</h1>
  <p>Intro</p>
  <h2 id="section-1">Section 1</h2>
  <p>Contenu de la section 1.</p>
  <h3 id="sub-1">Sous-section</h3>
  <p>Encore du texte.</p>
  <h2 id="section-2">Section 2</h2>
  <p>Texte supplémentaire.</p>
`;

describe("TableOfContents", () => {
  it("rend un sommaire avec les titres h2/h3/h4", () => {
    render(<TableOfContents contentHtml={sampleHtml} locale="fr" />);

    // Le composant doit afficher le titre de bloc (Sommaire)
    expect(screen.getByText(/Sommaire/i)).toBeInTheDocument();

    // Les entrées du sommaire doivent contenir les textes des headings
    expect(screen.getByRole("link", { name: "Section 1" })).toHaveAttribute("href", "#section-1");
    expect(screen.getByRole("link", { name: "Sous-section" })).toHaveAttribute("href", "#sub-1");
    expect(screen.getByRole("link", { name: "Section 2" })).toHaveAttribute("href", "#section-2");
  });

  it("affiche le temps de lecture estimé", () => {
    // Texte suffisament long pour qu'on voit un temps de lecture cohérent, mais
    // on vérifie seulement la présence du label, pas le nombre exact de minutes.
    render(<TableOfContents contentHtml={sampleHtml} locale="fr" />);

    expect(screen.getByText(/Temps de lecture/i)).toBeInTheDocument();
  });

  it("utilise les labels EN quand locale=\"en\"", () => {
    render(<TableOfContents contentHtml={sampleHtml} locale="en" />);

    expect(screen.getByText(/Contents/i)).toBeInTheDocument();
    expect(screen.getByText(/Reading time/i)).toBeInTheDocument();
  });
});