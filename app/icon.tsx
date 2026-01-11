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
          background: "#000000",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <img
          src="/logo-blanc.png"
          alt="smarterlogicweb"
          width={24}
          height={24}
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}