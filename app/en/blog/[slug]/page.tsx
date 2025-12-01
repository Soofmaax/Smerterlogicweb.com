import Link from "next/link";
import { notFound } from "next/navigation";
import { getScheduledPostBySlugBurst, formatDate } from "@/lib/blog";
import { getAllPosts } from "@/lib/blog-source";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CitationBox } from "@/components/site/citation-box";
import { TableOfContents } from "@/components/site/table-of-contents";
import { BlogLightboxBinder } from "@/components/site/blog-lightbox-binder";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const all = getAllPosts();
  const result = getScheduledPostBySlugBurst(all, params.slug, "en");
  if (!result || !result.isPublished) {
    return {
      title: "Article unavailable",
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

  // Compute proper FR alternate slug and include only if counterpart exists:
  // 1) FR post with same slug
  // 2) FR post declaring altLocales.en === current EN slug
  const frSameSlug = all.find((p) => p.locale === "fr" && p.slug === post.slug);
  const frByMapping = all.find(
    (p) => p.locale === "fr" && typeof (p as any).altLocales === "object" && (p as any).altLocales?.en === post.slug
  );
  const frAlt = frSameSlug || frByMapping;

  const languages: Record<string, string> = { "en-US": `/en/blog/${post.slug}` };
  if (frAlt) {
    languages["fr-FR"] = `/blog/${frAlt.slug}`;
  }

  return {
    title: post.title,
    description: post.summary ?? post.title,
    alternates: {
      canonical: `/en/blog/${post.slug}`,
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

export default function BlogPostEN({ params }: { params: { slug: string } }) {
  const result = getScheduledPostBySlugBurst(getAllPosts(), params.slug, "en");
  if (!result) notFound();

  const { post, isPublished } = result;
  if (!isPublished) {
    notFound();
  }

  const authorName = post.authorName || "Sonia";
  const authorUrl = post.authorUrl || undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://smarterlogicweb.com/en" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://smarterlogicweb.com/en/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://smarterlogicweb.com/en/blog/${post.slug}` },
    ],
  };

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary ?? post.title,
    datePublished: post.publishAt.toISOString(),
    dateModified: post.publishAt.toISOString(),
    mainEntityOfPage: `https://smarterlogicweb.com/en/blog/${post.slug}`,
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

  const faqBySlugEn: Record<string, { q: string; a: string }[]> = {
    "business-website-cost-france-2025": [
      {
        q: "How much does a professional brochure website cost in France in 2025?",
        a: "For an SME in France, a serious brochure website in 2025 typically ranges between \u20ac1,500 and \u20ac5,000 depending on whether copywriting, SEO and project management are included. Offers below \u20ac1,000 are often bare-bones installs without content or real optimisation."
      },
      {
        q: "Why do quotes for the same website go from \u20ac800 to \u20ac8,000?",
        a: "Because the label \u201cbrochure website\u201d covers very different deliverables: at \u20ac800 you usually get a WordPress install with a generic theme and empty pages; at \u20ac2,000\u2013\u20ac5,000 you get tailored design, content and SEO; above \u20ac8,000 you are paying for full agency process, workshops and multi-person teams."
      },
      {
        q: "What is the real 3-year cost of a brochure website?",
        a: "The real 3-year cost combines build, hosting, domain, maintenance, licences and possibly ongoing SEO. A \u20ac1,500 WordPress site often ends up costing \u20ac3,000\u2013\u20ac5,000 over 3 years, while a well-built static site can stay around \u20ac2,490 on the same horizon."
      }
    ],
    "hidden-costs-website-ownership": [
      {
        q: "What are the main hidden costs of owning a website?",
        a: "Beyond the initial build you must account for yearly domain renewal, hosting, plugin licences, WordPress maintenance and sometimes copywriting/SEO. Over 3 years these hidden costs can add \u20ac2,000\u2013\u20ac15,000 to the sticker price."
      },
      {
        q: "How much does WordPress maintenance cost per year?",
        a: "In 2025, realistic WordPress maintenance for a small business in Europe is around \u20ac290\u2013\u20ac1,800 per year depending on service level. Anything much cheaper usually means very limited or purely reactive work."
      },
      {
        q: "Why do static sites have virtually no mandatory maintenance costs?",
        a: "Static sites are pure HTML/CSS/JS without a database or plugins to update, so there is no CMS layer to maintain. In practice you only pay for the domain and optional content evolution, not for technical upkeep."
      }
    ],
    "website-maintenance-cost-small-business": [
      {
        q: "How much does website maintenance cost per month for a small business?",
        a: "For a brochure WordPress site, realistic maintenance ranges from \u20ac30 to \u20ac150 per month with a freelancer, and up to \u20ac500 per month with an agency for higher-risk sites."
      },
      {
        q: "What are the cost differences between DIY, freelancer and agency maintenance?",
        a: "DIY has no external fee but requires 10\u201320 hours/month and carries high risk. Freelancers typically bill \u20ac30\u2013\u20ac150/month. Agencies charge \u20ac75\u2013\u20ac500/month but provide SLAs, backup teams and level-3 support."
      },
      {
        q: "What happens if you never pay for maintenance on a WordPress site?",
        a: "Without maintenance a WordPress site becomes increasingly vulnerable: outdated plugins and core lead to hacks, unexplained downtime and performance decay. A single major incident can easily cost \u20ac1,000\u2013\u20ac50,000 in lost revenue and recovery fees."
      }
    ],
    "brochure-website-maintenance-plan": [
      {
        q: "What should a solid maintenance plan for a brochure website include?",
        a: "A serious plan covers four pillars: tested updates, security and off-site backups, performance optimisation and structured support with response-time SLAs. Without these you essentially have no real maintenance."
      },
      {
        q: "What can I safely change myself on my brochure site?",
        a: "You can safely edit copy, links, replace optimised images and publish blog posts. Anything touching code, plugins, core updates or security settings should be left to your provider."
      },
      {
        q: "Which actions routinely break WordPress sites and should be avoided?",
        a: "The main culprits are: installing random plugins, editing PHP/CSS directly on production, running major core updates without testing and changing security/permissions blindly. These four cause most serious outages."
      }
    ],
    "technical-seo-basics-brochure-website": [
      {
        q: "What are the key technical SEO foundations for a brochure site?",
        a: "You need a crawlable structure, fast performance with Core Web Vitals in the green, clean HTML semantics and appropriate structured data such as LocalBusiness, Article and FAQ where relevant."
      },
      {
        q: "How long does it take to see SEO results for a new site?",
        a: "For a typical SME brochure site, expect 4\u20136 months for visible movement in impressions and rankings, and 6\u201312 months for meaningful lead impact, especially on a brand-new domain."
      },
      {
        q: "Why is long-tail keyword strategy so important for small businesses?",
        a: "Long-tail queries like \u201cemployment lawyer Paris 11th free consultation\u201d are less competitive, carry clearer intent and convert better. They are the most realistic SEO lever for small businesses."
      }
    ]
  };

  const faqsEn = faqBySlugEn[post.slug];

  const faqSchemaEn = faqsEn
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqsEn.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  return (
    <section className="relative">
      {/* Ambient brand gradient background, subtle and non-intrusive */}
      <div aria-hidden className="hero-gradient-animated absolute inset-0 -z-10" />

      <article className="mx-auto w-full max-w-3xl px-6 py-10">
        {/* JSON-LD BreadcrumbList */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {/* JSON-LD BlogPosting */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
        {/* JSON-LD FAQPage (when available for the article) */}
        {faqSchemaEn && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaEn) }} />
        )}

        <header className="mb-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight">{post.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            By {authorUrl ? <Link href={authorUrl} className="hover:underline">{authorName}</Link> : authorName}
          </p>
          <time className="mt-0.5 block text-sm text-muted-foreground" dateTime={post.publishAt.toISOString()}>
            Published on {formatDate(post.publishAt, "en")}
          </time>

          {/* Visible breadcrumbs */}
          <Breadcrumbs
            className="mt-2"
            items={[
              { label: "Home", href: "/en" },
              { label: "Blog", href: "/en/blog" },
              { label: post.title },
            ]}
          />
        </header>

        <TableOfContents contentHtml={post.contentHtml} rootId="article-content" locale="en" />
        <BlogLightboxBinder rootId="article-content" ariaLabel="Article images lightbox" />

        <div
          id="article-content"
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-a:underline-offset-2 prose-img:rounded-lg prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <CitationBox articleSlug={post.slug} locale="en" />

        <footer className="mt-8">
          <Link href="/en/blog" className="text-primary hover:underline">
            ← Back to articles
          </Link>
        </footer>
      </article>
    </section>
  );
}