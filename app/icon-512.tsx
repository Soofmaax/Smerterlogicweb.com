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
          background: "#000000",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 64,
        }}
      >
        <img
          src="/logo-blanc.png"
          alt="smarterlogicweb"
          width={384}
          height={384}
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