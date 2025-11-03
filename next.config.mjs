/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Build a minimal standalone server for custom hosting platforms (e.g., Docker, generic PaaS).
  // Netlify plugin ignores this and uses its own runtime, so it's safe to keep.
  output: "standalone",
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
    // Netlify Next.js Runtime expects localeDetection disabled
    // to avoid routing issues with i18n.
    localeDetection: false,
  },
};

export default nextConfig;