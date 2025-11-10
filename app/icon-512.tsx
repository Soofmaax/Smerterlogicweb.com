import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 64,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 240,
            fontWeight: 800,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: -12,
          }}
        >
          SLW
        </span>
      </div>
    ),
    { ...size }
  );
}