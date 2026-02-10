import type { Metadata } from "next";
import "./globals.css";
import { Anonymous_Pro, DM_Sans } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { UXEnhancer } from "@/components/site/ux-enhancer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { CookieConsent } from "@/components/site/cookie-consent";
import { AnalyticsLoader } from "@/components/site/analytics-loader";
import { MarketingLoader } from "@/components/site/marketing-loader";
import { GA4PageviewTracker } from "@/components/site/ga-pageview";
import { AutoEvents } from "@/components/site/auto-events";

import { EasterEggs } from "@/components/site/easter-eggs";
import { AssistantOverlay } from "@/components/site/assistant-overlay";
import { GyroTilt } from "@/components/site/gyro-tilt";
import {
  SITE_URL,
  BRAND_DOMAIN,
  COMPANY_NAME,
  CONTACT_EMAIL,
  PHONE_NUMBER_PUBLIC,
} from "@/config/site";

import Script from "next/script";
import { Suspense } from "react";
import { headers } from "next/headers";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-anonymous-pro",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sites vitrines statiques pour TPE & professions libérales — smarterlogicweb.com",
    template: "%s — smarterlogicweb.com",
  },
  description:
    "Sites vitrines statiques ultra-rapides pour TPE, PME et professions libérales. Core Web Vitals optimisés, zéro maintenance technique obligatoire, SEO et sécurité intégrés.",
  keywords: [
    "site vitrine statique",
    "sites vitrines TPE",
    "professions libérales",
    "création site web",
    "refonte site vitrine",
    "Next.js",
    "Tailwind CSS",
    "SEO",
    "performance web",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/logo-noir.png", type: "image/png" },
    ],
    apple: "/apple-icon",
    shortcut: ["/icon"],
  },
  manifest: "/manifest.webmanifest?v=5",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: BRAND_DOMAIN,
    url: SITE_URL,
    title: "Sites vitrines statiques pour TPE & professions libérales — smarterlogicweb.com",
    description:
      "Sites vitrines statiques ultra-rapides pour TPE, PME et professions libérales. Core Web Vitals optimisés, zéro maintenance technique obligatoire, SEO et sécurité intégrés.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sites vitrines statiques pour TPE & professions libérales — smarterlogicweb.com",
    description:
      "Sites vitrines statiques ultra-rapides pour TPE, PME et professions libérales. Core Web Vitals optimisés, zéro maintenance technique obligatoire, SEO et sécurité intégrés.",
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
  name: COMPANY_NAME,
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/salwaessafi/",
    "https://github.com/Soofmaax",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer support",
      availableLanguage: ["fr", "en"],
      areaServed: "FR",
    },
  ],
};

const jsonLdSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: BRAND_DOMAIN,
};

const phonePublic = PHONE_NUMBER_PUBLIC;
const phoneDigits = phonePublic ? phonePublic.replace(/[^+\d]/g, "") : "";
const ADDRESS_STREET = process.env.NEXT_PUBLIC_COMPANY_STREET || "";
const ADDRESS_POSTAL_CODE = process.env.NEXT_PUBLIC_COMPANY_ZIP || "";
const ADDRESS_LOCALITY = process.env.NEXT_PUBLIC_COMPANY_CITY || "";
const ADDRESS_REGION = process.env.NEXT_PUBLIC_COMPANY_REGION || "";
const OPENING_HOURS = process.env.NEXT_PUBLIC_OPENING_HOURS || "";

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY_NAME,
  url: SITE_URL,
  areaServed: "France",
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
    ...(ADDRESS_STREET ? { streetAddress: ADDRESS_STREET } : {}),
    ...(ADDRESS_LOCALITY ? { addressLocality: ADDRESS_LOCALITY } : {}),
    ...(ADDRESS_REGION ? { addressRegion: ADDRESS_REGION } : {}),
    ...(ADDRESS_POSTAL_CODE ? { postalCode: ADDRESS_POSTAL_CODE } : {}),
  },
  ...(phoneDigits ? { telephone: phoneDigits } : {}),
  ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
  ...(OPENING_HOURS ? { openingHours: OPENING_HOURS } : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f13" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "plausible").toLowerCase();
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "smarterlogicweb.com";
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.umami.is/script.js";
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5X2V579H";
  const headersList = headers();
  let pathname =
    headersList.get("x-nextjs-matched-path") ||
    headersList.get("x-matched-path") ||
    headersList.get("x-pathname") ||
    headersList.get("x-invoke-path") ||
    headersList.get("x-original-url") ||
    "";
  if (pathname.includes("://")) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      // ignore invalid URL values
    }
  }
  const htmlLang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";

  return (
    <html lang={locale === "en" ? "en" : "fr"}>
      <head>
        <meta name="contact:phone_number" content="+33744407973" />
        <link rel="me" href="mailto:sonia@smarterlogicweb.com" />
      </head>
    <html lang={htmlLang}>
      <body className={`${anonymousPro.variable} ${dmSans.variable} bg-background text-foreground antialiased font-sans`}>
        {/* Google Tag Manager (consent default denied) */}
        {provider === "gtm" ? (
          <>
            <Script id="gtm-consent-default" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  analytics_storage:'denied',
  functionality_storage:'denied',
  personalization_storage:'denied',
  security_storage:'granted',
  ad_user_data:'denied',
  ad_personalization:'denied'
});`}
            </Script>
            {/* Google Tag Manager */}
            <Script id="gtm-init" strategy="beforeInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            {/* Google Tag Manager (noscript) */}
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          </>
        ) : null}

        

        {/* Analytics (loaded client-side only after consent) */}
        <AnalyticsLoader />
        {/* GA4 page_view tracker (after consent) */}
        <Suspense fallback={null}>
          <GA4PageviewTracker />
        </Suspense>
        {/* Auto events: CTA, outbound links, file downloads (after consent) */}
        <AutoEvents />
        {/* Marketing pixels (Meta/LinkedIn/Hotjar) loaded only after marketing consent */}
        <MarketingLoader />

        <UXEnhancer />
        <ScrollProgress />
        
        <GyroTilt />

        <a href="#content" className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded bg-primary px-3 py-2 text-white">
          Passer au contenu
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="content" className="flex-1 snap-y">{children}</main>
          <Footer />
        </div>

        {/* Right-hand friendly floating actions removed on request (mobile clutter) */}

        {/* Easter Eggs (fun, non-intrusive) */}
        <EasterEggs />
        <AssistantOverlay />
        {/* Cookie consent (shown when using GA/GTM or others) */}
        <CookieConsent />
      </body>
    </html>
  );
}