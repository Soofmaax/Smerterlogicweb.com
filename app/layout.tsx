import type { Metadata } from "next";
import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UXEnhancer } from "@/components/site/ux-enhancer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Chatbot } from "@/components/site/chatbot";
import { CookieConsent } from "@/components/site/cookie-consent";
import { BackToTop } from "@/components/site/back-to-top";
import { Cursor } from "@/components/site/cursor";
import { EasterEggs } from "@/components/site/easter-eggs";
import { SmartCTAs } from "@/components/site/smart-ctas";
import { VoiceCommands } from "@/components/site/voice-commands";
import { AssistantOverlay } from "@/components/site/assistant-overlay";
import { GyroTilt } from "@/components/site/gyro-tilt";
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
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "plausible";
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "smarterlogicweb.com";
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.umami.is/script.js";
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

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

        {/* Analytics */}
        {provider === "plausible" && (
          <Script strategy="lazyOnload" data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
        )}
        {provider === "umami" && umamiWebsiteId && (
          <Script strategy="lazyOnload" src={umamiSrc} data-website-id={umamiWebsiteId} />
        )}

        <UXEnhancer />
        <ScrollProgress />
        <Cursor />
        <GyroTilt />

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="content" className="flex-1 snap-y">{children}</main>
          <Footer />
        </div>

        {/* Right-hand friendly floating actions */}
        <BackToTop />
        <SmartCTAs />
        <VoiceCommands />

        {/* Easter Eggs & Chatbot */}
        <EasterEggs />
        <AssistantOverlay />
        <Chatbot />
      </body>
    </html>
  );
}