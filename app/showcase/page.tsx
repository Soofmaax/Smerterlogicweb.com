"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Carousel } from "@/components/site/carousel";

function Card({ img, title, desc }: { img: string; title: string; desc: string }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative h-40 w-full">
        {/* Use plain img to avoid next config remote patterns issues */}
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-foreground/80">{desc}</p>
      </div>
    </article>
  );
}

export default function ShowcasePage() {
  // 1) Portfolio projects
  const portfolioItems = [
    <Card
      key="p1"
      img="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1200"
      title="Artisan Menuisier"
      desc="Refonte d’un site vitrine avec galerie de réalisations et formulaires de devis."
    />,
    <Card
      key="p2"
      img="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
      title="Agence Locale"
      desc="Site rapide et SEO-friendly avec blog et pages services dédiées."
    />,
    <Card
      key="p3"
      img="https://images.pexels.com/photos/3184453/pexels-photo-3184453.jpeg?auto=compress&cs=tinysrgb&w=1200"
      title="Restaurant"
      desc="Menu en ligne, gestion d’actualités, optimisation mobile et photos."
    />,
    <Card
      key="p4"
      img="https://images.pexels.com/photos/3184452/pexels-photo-3184452.jpeg?auto=compress&cs=tinysrgb&w=1200"
      title="Photographe"
      desc="Portfolio haute performance, tri par catégories, images optimisées."
    />,
  ];

  // 2) Testimonials
  const testimonials = [
    <figure key="t1" className="rounded-2xl border bg-card p-6 text-center shadow-sm">
      <blockquote className="text-lg italic">“Réactif et pro. Notre visibilité a clairement progressé en 2 mois.”</blockquote>
      <figcaption className="mt-2 text-sm text-foreground/70">— Claire, Boulangerie du Centre</figcaption>
    </figure>,
    <figure key="t2" className="rounded-2xl border bg-card p-6 text-center shadow-sm">
      <blockquote className="text-lg italic">“Le site est rapide, simple à mettre à jour et les demandes entrent régulièrement.”</blockquote>
      <figcaption className="mt-2 text-sm text-foreground/70">— Marc, Entreprise de Plomberie</figcaption>
    </figure>,
    <figure key="t3" className="rounded-2xl border bg-card p-6 text-center shadow-sm">
      <blockquote className="text-lg italic">“On a enfin un site clair qui convertit. Très satisfait de l’accompagnement.”</blockquote>
      <figcaption className="mt-2 text-sm text-foreground/70">— Sarah, Coach Sportive</figcaption>
    </figure>,
  ];

  // 3) Image gallery (fullscreen photos)
  const gallery = [
    <div key="g1" className="overflow-hidden rounded-2xl border shadow-sm">
      <img
        src="https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Paysage 1"
        className="h-64 w-full object-cover md:h-80 lg:h-96"
        loading="lazy"
      />
    </div>,
    <div key="g2" className="overflow-hidden rounded-2xl border shadow-sm">
      <img
        src="https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Paysage 2"
        className="h-64 w-full object-cover md:h-80 lg:h-96"
        loading="lazy"
      />
    </div>,
    <div key="g3" className="overflow-hidden rounded-2xl border shadow-sm">
      <img
        src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Paysage 3"
        className="h-64 w-full object-cover md:h-80 lg:h-96"
        loading="lazy"
      />
    </div>,
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Carousel Showcase</h1>
        <p className="mt-2 text-foreground/70">
          Trois usages concrets du composant: portfolio, témoignages et galerie image.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-3 font-heading text-2xl font-semibold">1) Portfolio projects</h2>
        <Carousel
          items={portfolioItems}
          centerEmphasis
          autoplay
          intervalMs={4500}
          ariaLabel="Carousel portfolio"
          labels={{
            prev: "Projet précédent",
            next: "Projet suivant",
            counter: (i, t) => `Projet ${i + 1} / ${t}`,
            slideAria: (i, t) => `Projet ${i + 1} sur ${t}`,
            skip: "Passer le carrousel de projets",
          }}
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-heading text-2xl font-semibold">2) Testimonials</h2>
        <Carousel
          items={testimonials}
          centerEmphasis
          autoplay
          intervalMs={5000}
          ariaLabel="Carousel témoignages"
          labels={{
            prev: "Témoignage précédent",
            next: "Témoignage suivant",
            counter: (i, t) => `Avis ${i + 1} / ${t}`,
            slideAria: (i, t) => `Témoignage ${i + 1} sur ${t}`,
            skip: "Passer le carrousel d'avis",
          }}
        />
      </section>

      <section>
        <h2 className="mb-3 font-heading text-2xl font-semibold">3) Image gallery</h2>
        <Carousel
          items={gallery}
          centerEmphasis
          autoplay
          intervalMs={4000}
          ariaLabel="Galerie d'images"
          labels={{
            prev: "Image précédente",
            next: "Image suivante",
            counter: (i, t) => `Image ${i + 1} / ${t}`,
            slideAria: (i, t) => `Image ${i + 1} sur ${t}`,
            skip: "Passer la galerie",
          }}
        />
      </section>
    </div>
  );
}