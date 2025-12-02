import Link from "next/link";
import { notFound } from "next/navigation";
import { getScheduledPostBySlugBurst, formatDate } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-source";
import { RecommendedArticles } from "@/components/site/recommended-articles";
import { RelatedCities } from "@/components/site/related-cities";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CitationBox } from "@/components/site/citation-box";
import { TableOfContents } from "@/components/site/table-of-contents";
import { BlogLightboxBinder } from "@/components/site/blog-lightbox-binder";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const all = getAllPosts();
  const result = getScheduledPostBySlugBurst(all, params.slug, "fr");
  if (!result || !result.isPublished) {
    return {
      title: "Article non disponible",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  }
  const { post } = result;

  // Compute proper EN alternate slug and include only if counterpart exists:
  // 1) prefer explicit mapping from frontmatter (altLocales.en) if an EN post with that slug exists
  // 2) else, use same slug if an EN post exists with the same slug
  const explicitEn = post.altLocales?.en;
  const enByMapping = explicitEn ? all.find((p) => p.locale === "en" && p.slug === explicitEn) : undefined;
  const enSameSlug = all.find((p) => p.locale === "en" && p.slug === post.slug);
  const enAlt = enByMapping || enSameSlug;

  const languages: Record<string, string> = { "fr-FR": `/blog/${post.slug}` };
  if (enAlt) {
    languages["en-US"] = `/en/blog/${enAlt.slug}`;
  }

  return {
    title: post.title,
    description: post.summary ?? post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary ?? post.title,
      publishedTime: post.publishAt.toISOString(),
    },
  };
}

export default function BlogPostFR({ params }: { params: { slug: string } }) {
  const result = getScheduledPostBySlugBurst(getAllPosts(), params.slug, "fr");
  if (!result) notFound();

  const { post, isPublished } = result;
  if (!isPublished) {
    // Hide unreleased posts from public/SEO
    notFound();
  }

  const authorName = post.authorName || "Sonia";
  const authorUrl = post.authorUrl || undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://smarterlogicweb.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://smarterlogicweb.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://smarterlogicweb.com/blog/${post.slug}` },
    ],
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary ?? post.title,
    datePublished: post.publishAt.toISOString(),
    dateModified: post.publishAt.toISOString(),
    mainEntityOfPage: `https://smarterlogicweb.com/blog/${post.slug}`,
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "smarterlogicweb",
      url: "https://smarterlogicweb.com",
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  const faqBySlug: Record<string, { q: string; a: string }[]> = {
    "cout-site-vitrine-2025": [
      {
        q: "Quel est le prix moyen d\u0027un site vitrine professionnel en France en 2025 ?",
        a: "Pour une TPE/PME, un site vitrine professionnel se situe généralement entre 1\u00a0500\u00a0\u20ac et 5\u00a0000\u00a0\u20ac en 2025, selon que le devis inclut ou non le contenu, le SEO et l\u0027accompagnement. Les offres \u00e0 300\u00a0\u20ac–800\u00a0\u20ac sont souvent de simples installations techniques sans contenu ni r\u00e9f\u00e9rencement."
      },
      {
        q: "Pourquoi les devis pour un m\u00eame site vitrine vont-ils de 800\u00a0\u20ac \u00e0 8\u00a0000\u00a0\u20ac ?",
        a: "Parce que le mot \u0022site vitrine\u0022 recouvre des r\u00e9alit\u00e9s tr\u00e8s diff\u00e9rentes : \u00e0 800\u00a0\u20ac on parle d\u0027installation WordPress avec un th\u00e8me pr\u00eat \u00e0 l\u0027emploi, sans contenu ni SEO ; \u00e0 2\u00a0000\u00a0\u20ac–5\u00a0000\u00a0\u20ac on inclut g\u00e9n\u00e9ralement design adapt\u00e9, contenus et optimisation ; au-del\u00e0 de 8\u00a0000\u00a0\u20ac il s\u0027agit de projets agence avec chef de projet, UX pouss\u00e9e et accompagnement strat\u00e9gique."
      },
      {
        q: "Quel est le co\u00fbt r\u00e9el d\u0027un site vitrine sur 3 ans ?",
        a: "Le co\u00fbt r\u00e9el sur 3 ans inclut la cr\u00e9ation, l\u0027h\u00e9bergement, le nom de domaine, la maintenance et \u00e9ventuellement le contenu et le SEO. Un WordPress \u00e0 1\u00a0500\u00a0\u20ac finit souvent entre 3\u00a0000\u00a0\u20ac et 5\u00a0000\u00a0\u20ac sur 3 ans, alors qu\u0027un site statique bien con\u00e7u peut rester autour de 2\u00a0490\u00a0\u20ac sur la m\u00eame p\u00e9riode."
      },
      {
        q: "Comment \u00e9viter de payer deux fois pour mon site vitrine ?",
        a: "Pour ne pas payer deux fois, exigez un devis d\u00e9taill\u00e9 qui inclut le contenu, le SEO technique de base, la propri\u00e9t\u00e9 du code et du domaine, et une vision du co\u00fbt total sur 3 ans. \u00c9vitez les offres trop basses qui livrent une coquille vide que vous devrez ensuite faire r\u00e9-\u00e9crire et r\u00e9f\u00e9rencer."
      }
    ],
    "frais-caches-site-internet": [
      {
        q: "Quels sont les principaux frais cach\u00e9s d\u0027un site internet apr\u00e8s la livraison ?",
        a: "Les principaux frais cach\u00e9s sont le renouvellement du nom de domaine, l\u0027h\u00e9bergement, les licences de plugins premium, la maintenance technique WordPress et parfois le contenu/SEO \u00e0 rajouter. Sur 3 ans, ces postes peuvent ajouter 2\u00a0000\u00a0\u20ac \u00e0 15\u00a0000\u00a0\u20ac au prix de cr\u00e9ation."
      },
      {
        q: "Combien co\u00fbte la maintenance WordPress par an ?",
        a: "En France en 2025, la maintenance WordPress co\u00fbte typiquement entre 290\u00a0\u20ac et 1\u00a0800\u00a0\u20ac par an selon le niveau de service (basique, interm\u00e9diaire, agence). En dessous de 290\u00a0\u20ac/an, il s\u0027agit souvent de maintenance \u0022fant\u00f4me\u0022 ou tr\u00e8s limit\u00e9e."
      },
      {
        q: "Pourquoi un site statique n\u0027a-t-il pas de frais de maintenance obligatoires ?",
        a: "Un site statique est compos\u00e9 de HTML/CSS/JS sans base de donn\u00e9es ni plugins \u00e0 mettre \u00e0 jour. Il ne n\u00e9cessite donc pas de maintenance technique r\u00e9guli\u00e8re ni de licences r\u00e9currentes. En pratique, vous ne payez que le domaine (10\u00a0\u20ac \u00e0 20\u00a0\u20ac/an) et \u00e9ventuellement des \u00e9volutions de contenu ponctuelles."
      },
      {
        q: "Comment calculer le co\u00fbt total de possession (TCO) d\u0027un site sur 3 ans ?",
        a: "Le TCO sur 3 ans additionne le prix de cr\u00e9ation, l\u0027h\u00e9bergement, le domaine, la maintenance, les licences, \u00e9ventuel SEO continu et production de contenu. Demandez \u00e0 votre prestataire un tableau de ces postes sur 36 mois avant de choisir une technologie ou une offre."
      }
    ],
    "cout-maintenance-site-web": [
      {
        q: "Combien co\u00fbte la maintenance d\u0027un site vitrine WordPress par mois ?",
        a: "Pour une TPE, la maintenance d\u0027un site vitrine WordPress se situe g\u00e9n\u00e9ralement entre 30\u00a0\u20ac et 150\u00a0\u20ac par mois chez un freelance, et jusqu\u0027\u00e0 500\u00a0\u20ac par mois en agence pour des sites plus critiques."
      },
      {
        q: "Quelle est la diff\u00e9rence de co\u00fbt entre DIY, freelance et agence pour la maintenance ?",
        a: "En DIY vous ne payez pas de prestation mais vous assumez 10\u00a0\u00e0 20\u00a0heures par mois et un risque \u00e9lev\u00e9. Un freelance facture typiquement 30\u00a0\u20ac \u00e0 150\u00a0\u20ac/mois. Une agence, 75\u00a0\u20ac \u00e0 500\u00a0\u20ac/mois avec SLA, \u00e9quipe de backup et support niveau 3."
      },
      {
        q: "Que risque-t-on si l\u0027on ne paye aucune maintenance ?",
        a: "Sans maintenance, un WordPress devient vuln\u00e9rable : failles de s\u00e9curit\u00e9, pannes non d\u00e9tect\u00e9es, performances qui se d\u00e9gradent et pertes de positions SEO. Le co\u00fbt d\u0027une seule panne critique ou d\u0027un piratage peut atteindre 1\u00a0000\u00a0\u20ac \u00e0 50\u00a0000\u00a0\u20ac selon l\u0027activit\u00e9."
      },
      {
        q: "Un site statique n\u00e9cessite-t-il une maintenance payante ?",
        a: "Non, un site statique bien con\u00e7u n\u0027a pas de maintenance technique obligatoire : pas de CMS, pas de plugins, pas de mises \u00e0 jour \u00e0 encha\u00eener. Vous pouvez n\u00e9anmoins choisir une formule d\u0027accompagnement \u00e9ditorial ou \u0022\u00e9volution\u0022 pour faire vivre le contenu."
      }
    ],
    "forfait-maintenance-site-vitrine": [
      {
        q: "Que doit comprendre un bon forfait de maintenance pour site vitrine ?",
        a: "Un forfait s\u00e9rieux comprend 4 piliers : mises \u00e0 jour pr\u00e9ventives test\u00e9es, s\u00e9curit\u00e9 et sauvegardes externes, optimisation r\u00e9guli\u00e8re des performances et support structurant avec d\u00e9lais de r\u00e9ponse d\u00e9finis (SLA). Sans ces 4 piliers, ce n\u0027est pas une vraie maintenance."
      },
      {
        q: "Quelles modifications puis-je faire moi-m\u00eame sans risque sur mon site vitrine ?",
        a: "Vous pouvez modifier les textes, les liens, remplacer des images optimis\u00e9es et publier des articles de blog. Ces actions sont sans risque si vous respectez quelques bonnes pratiques (images compress\u00e9es, textes clairs). Tout ce qui touche au code, aux plugins ou aux mises \u00e0 jour majeures doit rester chez le prestataire."
      },
      {
        q: "Quelles sont les 4 actions interdites qui cassent un site WordPress ?",
        a: "Installer des plugins sans accompagnement, modifier le code source (PHP, CSS) en production, lancer des mises \u00e0 jour majeures sans test et toucher aux param\u00e8tres de s\u00e9curit\u00e9/permissions. Ces actions provoquent le plus de pannes graves et co\u00fbtent vite plusieurs centaines d\u0027euros en r\u00e9paration."
      },
      {
        q: "Comment savoir si mon forfait de maintenance est vraiment s\u00e9rieux ?",
        a: "V\u00e9rifiez l\u0027existence d\u0027un SLA clair, de sauvegardes externes test\u00e9es r\u00e9guli\u00e8rement, d\u0027un monitoring uptime, d\u0027un plan d\u0027action en cas de piratage et de conditions de r\u00e9siliation raisonnables. Un prestataire qui refuse de d\u00e9crire tout cela noir sur blanc est \u00e0 \u00e9viter."
      }
    ],
    "bases-techniques-seo-site-vitrine": [
      {
        q: "Quels sont les fondamentaux techniques du SEO pour un site vitrine ?",
        a: "Les bases techniques sont : un site facilement crawlable (structure claire, pas d\u0027erreurs 404 massives), des performances solides (Core Web Vitals dans le vert), un balisage HTML propre (titres, contenus) et un balisage structur\u00e9 (LocalBusiness, Article, FAQ) adapt\u00e9."
      },
      {
        q: "En combien de temps peut-on voir les premiers r\u00e9sultats SEO ?",
        a: "Pour un site vitrine de TPE/PME, comptez g\u00e9n\u00e9ralement 4 \u00e0 6 mois pour voir les premiers effets mesurables (impressions, positions) et 6 \u00e0 12 mois pour un impact r\u00e9el sur les leads, surtout si vous partez d\u0027un domaine neuf."
      },
      {
        q: "Que sont les Core Web Vitals et pourquoi sont-ils importants ?",
        a: "Les Core Web Vitals regroupent LCP, INP et CLS et mesurent la vitesse de chargement, la r\u00e9activit\u00e9 et la stabilit\u00e9 visuelle. Google les utilise comme signal de classement et ils impactent directement votre taux de conversion : un site lent ou instable perd des clients."
      },
      {
        q: "Pourquoi la strat\u00e9gie de longue tra\u00eene est-elle adapt\u00e9e aux TPE/PME ?",
        a: "La longue tra\u00eene vise des requ\u00eates plus longues et pr\u00e9cises (\u0022plombier urgence dimanche Lyon 3e\u0022) o\u00f9 la concurrence est plus faible, l\u0027intention plus claire et le taux de conversion bien plus \u00e9lev\u00e9. C\u0027est le levier le plus rentable pour une petite structure."
      }
    ]
  };

  const faqs = faqBySlug[post.slug];

  const faqSchema = faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  const hasH1 = /<h1(\s|>)/i.test(post.contentHtml);

  return (
    <section className="relative">
      {/* Ambient brand gradient background, subtle and non-intrusive */}
      <div aria-hidden className="hero-gradient-animated absolute inset-0 -z-10" />

      <article className="mx-auto w-full max-w-3xl px-6 py-10">
        {/* JSON-LD BreadcrumbList */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {/* JSON-LD BlogPosting */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
        {/* JSON-LD FAQPage (si disponible pour l'article) */}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}

        <header className="mb-6">
          {!hasH1 ? (
            <h1 className="font-heading text-3xl font-bold tracking-tight">{post.title}</h1>
          ) : null}
          <p className="mt-1 text-sm text-muted-foreground">
            Par {authorUrl ? <Link href={authorUrl} className="hover:underline">{authorName}</Link> : authorName}
          </p>
          <time className="mt-0.5 block text-sm text-muted-foreground" dateTime={post.publishAt.toISOString()}>
            Publié le {formatDate(post.publishAt, "fr")}
          </time>

          {/* Visible breadcrumbs */}
          <Breadcrumbs
            className="mt-2"
            items={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
        </header>

        <TableOfContents contentHtml={post.contentHtml} rootId="article-content" locale="fr" />
        <BlogLightboxBinder rootId="article-content" ariaLabel="Lightbox images d'article" />

        <div
          id="article-content"
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-a:underline-offset-2 prose-img:rounded-lg prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <RelatedCities contentHtml={post.contentHtml} locale="fr" />

        <RecommendedArticles currentSlug={post.slug} locale="fr" />

        <CitationBox articleSlug={post.slug} locale="fr" />

        <footer className="mt-8">
          <Link href="/blog" className="text-primary hover:underline">
            ← Retour aux articles
          </Link>
        </footer>
      </article>
    </section>
  );
}