"use client";

import * as React from "react";
import Link from "next/link";
import { MagneticZone } from "@/components/site/magnetic";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Clock,
  Wrench,
  Target,
  HelpCircle,
  ChevronDown,
  Link2,
} from "lucide-react";

type QA = {
  id: string;
  q: string;
  a: string;
};

type Category = {
  id: string;
  icon: React.ReactNode;
  name: string;
  color: string; // tailwind classes for color accents
  items: QA[];
};

const CATEGORIES: Category[] = [
  {
    id: "tarifs",
    icon: <CircleDollarSign className="h-4 w-4" />,
    name: "Tarifs et Paiement",
    color: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300",
    items: [
      {
        id: "q-tarif-cout",
        q: "Combien coûte vraiment un site web ?",
        a: "Entre 1800€ et 5500€ selon vos besoins. Prix fixe annoncé dès le départ, pas de surprises. Détails complets sur la page Tarifs.",
      },
      {
        id: "q-tarif-frais-caches",
        q: "Y a-t-il des frais cachés ?",
        a: "Non. Le prix inclut tout : conception, développement, mise en ligne, formation. Seuls frais supplémentaires : hébergement après la 1ère année (20€/mois) et nom de domaine (15€/an).",
      },
      {
        id: "q-tarif-paiement",
        q: "Puis-je payer en plusieurs fois ?",
        a: "Oui. 3 paiements : 30% à la signature, 40% à mi-projet, 30% à la livraison.",
      },
      {
        id: "q-tarif-satisfait",
        q: "Que se passe-t-il si je ne suis pas satisfait ?",
        a: "Satisfait ou remboursé 30 jours après livraison si le site ne correspond pas au devis validé.",
      },
      {
        id: "q-tarif-asso",
        q: "Les associations paient-elles le même prix ?",
        a: "Non. 1 association/mois bénéficie d'un site gratuit. Les autres ont des tarifs solidaires très réduits. Détails sur la page Engagement.",
      },
    ],
  },
  {
    id: "delais",
    icon: <Clock className="h-4 w-4" />,
    name: "Délais et Process",
    color: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300",
    items: [
      {
        id: "q-delais-temps",
        q: "Combien de temps pour créer mon site ?",
        a: "Site Vitrine : 2-3 semaines. Site Business : 3-4 semaines. Site Premium : 4-6 semaines. Après validation du devis et réception de tous vos contenus.",
      },
      {
        id: "q-delais-collab",
        q: "Comment se passe la collaboration ?",
        a: "4 étapes : audit gratuit (48h) → devis personnalisé → création avec validations régulières → livraison + formation.",
      },
      {
        id: "q-delais-contenus",
        q: "Dois-je fournir les textes et photos ?",
        a: "Idéalement oui. Si vous n'avez rien, je peux rédiger vos textes et vous recommander un photographe (en option payante).",
      },
      {
        id: "q-delais-previsu",
        q: "Puis-je voir le site avant qu'il soit fini ?",
        a: "Oui. Vous validez la maquette, puis le site en prévisualisation avant mise en ligne définitive.",
      },
    ],
  },
  {
    id: "technique",
    icon: <Wrench className="h-4 w-4" />,
    name: "Technique et Maintenance",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300",
    items: [
      {
        id: "q-technique-connaissances",
        q: "Dois-je m'y connaître en informatique ?",
        a: "Absolument pas. Je m'occupe de tout le technique. Vous apprenez juste à modifier vos textes et photos (formation incluse).",
      },
      {
        id: "q-technique-hebergement",
        q: "Qui héberge mon site ?",
        a: "Hébergement professionnel sur serveurs ultra-rapides (Netlify/Vercel). 1ère année incluse, puis 20€/mois.",
      },
      {
        id: "q-technique-modifs",
        q: "Puis-je modifier mon site moi-même après ?",
        a: "Oui pour les contenus simples (textes, images, actualités). Pour modifications structurelles, je reste disponible.",
      },
      {
        id: "q-technique-probleme",
        q: "Que se passe-t-il si mon site a un problème ?",
        a: "Support prioritaire inclus 3 mois. Après : maintenance à 20€/mois (corrections bugs, mises à jour sécurité, sauvegardes).",
      },
      {
        id: "q-technique-propriete",
        q: "Le site m'appartient-il ?",
        a: "Oui. Code source vous appartient. Vous pouvez partir avec à tout moment, aucune dépendance.",
      },
      {
        id: "q-technique-mobile",
        q: "Mon site sera-t-il rapide sur mobile ?",
        a: "Oui. Tous mes sites sont optimisés mobile-first avec scores 90+/100 sur Google.",
      },
    ],
  },
  {
    id: "resultats",
    icon: <Target className="h-4 w-4" />,
    name: "Résultats et Visibilité",
    color: "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-400/10 dark:text-purple-300",
    items: [
      {
        id: "q-resultats-google",
        q: "Mon site sera-t-il visible sur Google ?",
        a: "Oui. Optimisation SEO incluse dès le départ. Référencement naturel prend 2-3 mois pour résultats. Je vous forme aux bonnes pratiques.",
      },
      {
        id: "q-resultats-clients",
        q: "Vais-je avoir plus de clients grâce au site ?",
        a: "Si votre site est bien fait (rapide, clair, optimisé) : oui. Mes clients constatent +30 à 50% de demandes en moyenne après 3 mois.",
      },
      {
        id: "q-resultats-ads",
        q: "Faut-il payer de la publicité Google ?",
        a: "Pas obligatoire. Le référencement naturel suffit pour beaucoup d'artisans locaux. Publicité = option si vous voulez accélérer.",
      },
      {
        id: "q-resultats-analytics",
        q: "Puis-je suivre mes visiteurs ?",
        a: "Oui. Analytics inclus dans formules Business et Premium. Tableau de bord simple pour suivre vos stats.",
      },
    ],
  },
  {
    id: "choix",
    icon: <HelpCircle className="h-4 w-4" />,
    name: "Comparaison et Choix",
    color: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-400/10 dark:text-sky-300",
    items: [
      {
        id: "q-choix-wix-wp",
        q: "Pourquoi pas Wix ou WordPress ?",
        a: "Wix : lent, cher à long terme, limité, mauvais pour Google. WordPress : compliqué, nécessite maintenance constante, failles sécurité. Mon approche : rapide, sécurisé, simple, performant.",
      },
      {
        id: "q-choix-formule",
        q: "Quelle formule choisir pour mon activité ?",
        a: "Vitrine = début, présence basique. Business = galerie photos importante, blog. Premium = réservations en ligne, intégrations avancées. Appelez-moi 15min, je vous guide gratuitement.",
      },
      {
        id: "q-choix-evolution",
        q: "Puis-je changer de formule plus tard ?",
        a: "Oui. Évolution possible en payant la différence. Votre site grandit avec votre activité.",
      },
      {
        id: "q-choix-qui-travaille",
        q: "Travaillez-vous avec des freelances ou c'est vous directement ?",
        a: "C'est moi qui code, conçois et vous accompagne de A à Z. Pas de sous-traitance. Pour la création graphique complexe, je recommande des partenaires de confiance.",
      },
    ],
  },
];

function useHashOpen() {
  const [openId, setOpenId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (!hash) return;
    setOpenId(hash);
    // smooth scroll + pulse highlight
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("question-pulse");
      setTimeout(() => el.classList.remove("question-pulse"), 1600);
    }
  }, []);

  return { openId, setOpenId };
}

function AccordionItem({
  qa,
  openId,
  setOpenId,
}: {
  qa: QA;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const isOpen = openId === qa.id;

  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const content = el.firstElementChild as HTMLElement | null;
    if (!content) return;
    const height = isOpen ? content.offsetHeight : 0;
    el.style.height = `${height}px`;
  }, [isOpen]);

  const onToggle = () => {
    setOpenId(isOpen ? null : qa.id);
    if (history.pushState) {
      const newUrl = isOpen ? window.location.pathname : `${window.location.pathname}#${qa.id}`;
      history.replaceState(null, "", newUrl);
    }
  };

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${qa.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback: no-op
    }
  };

  return (
    <div id={qa.id} className={cn("rounded-lg border bg-card", isOpen && "ring-1 ring-primary/30")}>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left transition",
          "hover:bg-primary/5"
        )}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="font-medium">{qa.q}</span>
        <span className="ml-auto inline-flex items-center gap-2">
          <button
            type="button"
            aria-label="Copier le lien"
            onClick={copyLink}
            className="rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <Link2 className="h-4 w-4" />
          </button>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </span>
      </button>
      <div
        ref={bodyRef}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        aria-hidden={!isOpen}
      >
        <div className="px-3 pb-4 text-sm text-foreground/80">{qa.a}</div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const [query, setQuery] = React.useState("");
  const { openId, setOpenId } = useHashOpen();

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    const filterCat = (cat: Category): Category | null => {
      const items = cat.items.filter(
        (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
      );
      return items.length ? { ...cat, items } : null;
    };
    const cats = CATEGORIES.map(filterCat).filter(Boolean) as Category[];
    return cats;
  }, [query]);

  // counts for sidebar
  const counts = React.useMemo(() => {
    const base: Record<string, number> = {};
    CATEGORIES.forEach((c) => (base[c.id] = c.items.length));
    if (!query) return base;
    const res: Record<string, number> = {};
    filtered.forEach((c) => (res[c.id] = c.items.length));
    return res;
  }, [filtered, query]);

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[260px,1fr]">
      {/* Sidebar sticky categories */}
      <aside className="hidden md:block">
        <div className="sticky top-24 rounded-2xl border bg-card p-4">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Catégories</div>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} className="reveal-fade-up" >
                <li style={{ transitionDelay: `${i * 100}ms` }}>
                  <a
                    href={`#cat-${c.id}`}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-foreground/80 transition hover:bg-accent"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ring-1", c.color)}>
                        {c.icon}
                      </span>
                      {c.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{counts[c.id] ?? 0}</span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div>
        {/* Search */}
        <div className="rounded-2xl border bg-card p-4">
          <label htmlFor="faq-search" className="text-sm font-medium">
            Rechercher une question
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: tarifs, Google, maintenance…"
            className="input-glow mt-2 h-11 w-full rounded-md border border-foreground/20 bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Categories + accordions */}
        <div className="mt-6 space-y-8">
          {filtered.map((cat, idx) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-28">
              <div className="mb-2 flex items-center gap-2">
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ring-1", cat.color)}>
                  {cat.icon}
                </span>
                <h2 className="font-heading text-xl font-semibold">{cat.name}</h2>
              </div>
              <div className="space-y-2">
                {cat.items.map((qa) => (
                  <AccordionItem key={qa.id} qa={qa} openId={openId} setOpenId={setOpenId} />
                ))}
                {cat.items.length === 0 ? (
                  <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                    Aucun résultat dans cette catégorie pour “{query}”.
                  </div>
                ) : null}
              </div>
            </section>
          ))}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
              Aucun résultat. Essayez un autre mot-clé.
            </div>
          ) : null}
        </div>

        {/* Final CTA */}
        <div className="mt-8 rounded-[24px] border bg-card p-6">
          <h3 className="font-heading text-2xl font-semibold">Vous Ne Trouvez Pas Votre Réponse ?</h3>
          <p className="mt-2 text-foreground/80">Appelez‑moi ou envoyez un message. Je réponds sous 24h.</p>
          <MagneticZone>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                data-magnetic="true"
                className="inline-flex items-center justify-center rounded-full border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Poser ma question
              </Link>
              <a
                href="mailto:contact@smarterlogicweb.com?subject=Prendre%20RDV%20t%C3%A9l%C3%A9phonique"
                data-magnetic="true"
                className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm transition hover:bg-accent"
              >
                Prendre RDV téléphonique
              </a>
            </div>
          </MagneticZone>
        </div>
      </div>
    </div>
  );
}