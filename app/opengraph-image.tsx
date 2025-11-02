import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e6f4ef 0%, #fde9ef 100%)",
          color: "#0e1f1a",
          padding: "64px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 999,
            background: "#e66886",
            color: "#0f0f0f",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          smarterlogicweb
        </div>

        <h1
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            marginTop: 24,
            marginBottom: 8,
            letterSpacing: -1.5,
          }}
        >
          Votre site web, enfin simple et performant.
        </h1>

        <p style={{ fontSize: 28, opacity: 0.8, maxWidth: 960 }}>
          Sites web sur‑mesure pour entrepreneurs et associations. Simplicité, performance, exigence.
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}