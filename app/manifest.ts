import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "smarterlogicweb.com",
    short_name: "smarterlogicweb",
    description:
      "Sites web sur-mesure pour entrepreneurs et associations. Simple, performant, sans complexité — je m’occupe du reste.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2f7e6b",
    icons: [
      {
        src: "/apple-touch-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      }
    ],
  };
}