import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleTouchIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          // Brand blue gradient background to replace old pink/green
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