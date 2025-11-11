import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImageBlog() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
          color: "#ffffff",
          padding: 64,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.35) 0%, rgba(99,102,241,0.35) 100%)",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.28)",
          }}
        >
          smarterlogicweb — Blog
        </div>

        <h1
          style={{
            fontSize: 64,
            lineHeight: 1.05,
            marginTop: 24,
            marginBottom: 8,
            letterSpacing: -1.5,
          }}
        >
          Articles &amp; conseils pratiques
        </h1>

        <p style={{ fontSize: 28, opacity: 0.9, maxWidth: 960 }}>
          Visibilité, confiance, performance — sans complexité.
        </p>
      </div>
    ),
    { ...size }
  );
}