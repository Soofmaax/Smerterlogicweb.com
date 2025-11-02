import type { Metadata } from "next";
import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

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
    default: "smarterlogicweb.com — Développeuse front-end",
    template: "%s — smarterlogicweb.com",
  },
  description:
    "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
  keywords: [
    "développeuse front-end",
    "site vitrine",
    "Next.js",
    "Tailwind CSS",
    "création site web",
    "refonte",
    "SEO",
    "performance web",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "smarterlogicweb.com",
    url: "https://smarterlogicweb.com",
    title: "smarterlogicweb.com — Développeuse front-end",
    description:
      "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "smarterlogicweb.com — Développeuse front-end",
    description:
      "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="content" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}