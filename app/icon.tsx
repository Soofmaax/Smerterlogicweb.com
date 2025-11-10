import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontWeight: 800,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: -1,
          }}
        >
          s
        </span>
      </div>
    ),
    { ...size }
  );
}