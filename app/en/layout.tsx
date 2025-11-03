import type { Metadata } from "next";
import "../globals.css";
import { Inter, DM_Sans } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smarterlogicweb.com"),
  title: {
    default: "smarterlogicweb.com — Front‑end developer",
    template: "%s — smarterlogicweb.com",
  },
  description:
    "Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
  keywords: [
    "front‑end developer",
    "showcase website",
    "Next.js",
    "Tailwind CSS",
    "website creation",
    "redesign",
    "SEO",
    "web performance",
  ],
  alternates: {
    canonical: "/en",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "smarterlogicweb.com",
    url: "https://smarterlogicweb.com/en",
    title: "smarterlogicweb.com — Front‑end developer",
    description:
      "Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "smarterlogicweb.com — Front‑end developer",
    description:
      "Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f13" },
  ],
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "smarterlogicweb",
  url: "https://smarterlogicweb.com",
  sameAs: [
    "https://www.linkedin.com/in/salwaessafi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    "https://github.com/Soofmaax"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "contact@smarterlogicweb.com",
      contactType: "customer support",
      availableLanguage: ["fr", "en"],
      areaServed: "FR"
    }
  ]
};

const jsonLdSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://smarterlogicweb.com",
  name: "smarterlogicweb.com",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "plausible";
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "smarterlogicweb.com";
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.umami.is/script.js";
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} bg-background text-foreground antialiased font-sans`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }}
        />

        {/* Analytics */}
        {provider === "plausible" && (
          <Script strategy="lazyOnload" data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
        )}
        {provider === "umami" && umamiWebsiteId && (
          <Script strategy="lazyOnload" src={umamiSrc} data-website-id={umamiWebsiteId} />
        )}

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="content" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}