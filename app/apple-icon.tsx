import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "linear-gradient(135deg, #f97316 0%, #a855f7 58%, #22d3ee 100%)",
        }}
      >
        <div
          style={{
            width: 82,
            height: 82,
            borderRadius: 9999,
            border: "15px solid #ffffff",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
