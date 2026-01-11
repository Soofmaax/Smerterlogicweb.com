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
          background: "#000000",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <img
          src="/logo-blanc.png"
          alt="smarterlogicweb"
          width={144}
          height={144}
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