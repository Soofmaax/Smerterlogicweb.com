import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon192() {
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
          borderRadius: 36,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 800,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: -2,
          }}
        >
          s
        </span>
      </div>
    ),
    { ...size }
  );
}