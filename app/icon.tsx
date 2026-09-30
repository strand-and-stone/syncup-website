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
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #f97316 0%, #a855f7 58%, #22d3ee 100%)",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            border: "3px solid #ffffff",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
