import type { Metadata } from "next";
import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";

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
  title: "smarterlogicweb.com — Développeuse front-end",
  description:
    "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${dmSans.variable} bg-background text-foreground antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}