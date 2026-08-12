import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#141e3c",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
        }}
      >
        <div
          style={{
            color: "#baad7b",
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "0.08em",
            fontFamily: "Georgia, serif",
          }}
        >
          АМИН
        </div>
      </div>
    ),
    { ...size }
  );
}
