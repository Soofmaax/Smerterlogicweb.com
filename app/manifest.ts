import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "smarterlogicweb.com",
    short_name: "smarterlogicweb",
    description:
      "La qualité qui se mesure : vitesse, sécurité, résultats. Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      }
    ],
  };
}