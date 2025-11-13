import type { Metadata } from "next";
import "../globals.css";
import { Inter, DM_Sans } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UXEnhancer } from "@/components/site/ux-enhancer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Cursor } from "@/components/site/cursor";
import { GyroTilt } from "@/components/site/gyro-tilt";
import { ReduceMotionToggle } from "@/components/site/reduce-motion-toggle";
import { SmartCTAs } from "@/components/site/smart-ctas";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import Script from "next/script";
import { CookieConsent } from "@/components/site/cookie-consent";

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
    "Quality you can measure: speed, security, results. Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
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
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon",
    shortcut: ["/icon"],
  },
  manifest: "/manifest.webmanifest?v=5",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "smarterlogicweb.com",
    url: "https://smarterlogicweb.com/en",
    title: "smarterlogicweb.com — Front‑end developer",
    description:
      "Quality you can measure: speed, security, results. Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "smarterlogicweb.com — Front‑end developer",
    description:
      "Quality you can measure: speed, security, results. Custom websites for entrepreneurs and nonprofits. Simple, fast, no complexity — I handle the rest.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: "icboO_CSLrw9wrG8c_4iRbw6jy6W1WItmeJOM-e3npg",
  },
  robots: {
    index: true,
    follow: true,
  },
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f13" },
  ],
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

        {/* UX extras */}
        <UXEnhancer />
        <ScrollProgress />
        <Cursor />
        <GyroTilt />

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="content" className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Right-hand friendly floating actions */}
        <ReduceMotionToggle />
        <WhatsAppFloat />
        <SmartCTAs />
        {/* Cookie consent (shown when using GA) */}
        <CookieConsent />
      </body>
    </html>
  );
}