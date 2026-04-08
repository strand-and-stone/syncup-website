import { ImageResponse } from "next/og";

import { SITE } from "@/lib/constants";

export const runtime = "edge";

export const alt = `${SITE.name} — Partner alarm sync for iPhone`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(145deg, #050505 0%, #0f0a14 45%, #050505 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "rgba(168, 85, 247, 0.25)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: 40,
            width: 400,
            height: 400,
            borderRadius: 9999,
            background: "rgba(34, 211, 238, 0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: 72,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#f97316",
              marginBottom: 16,
              letterSpacing: 3,
              display: "flex",
            }}
          >
            IPHONE · ALARMKIT
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.05,
              maxWidth: 920,
              letterSpacing: -1,
              display: "flex",
            }}
          >
            Wake up together—even when you are apart.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "#a1a1aa",
              maxWidth: 820,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            {SITE.name}: synced partner alarms on iPhone.
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 40,
              fontWeight: 700,
              color: "#a855f7",
              display: "flex",
            }}
          >
            {SITE.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
