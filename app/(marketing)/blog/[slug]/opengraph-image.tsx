import { ImageResponse } from "next/og";

import { BLOG_POST_OG_DATA } from "@/lib/blog/post-og-data";
import { SITE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(BLOG_POST_OG_DATA).map((slug) => ({ slug }));
}

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POST_OG_DATA[slug];

  return [
    {
      id: slug,
      alt: post ? `${post.title} · ${SITE.name}` : `${SITE.name} Journal`,
      size,
      contentType,
    },
  ];
}

export default async function BlogOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POST_OG_DATA[slug];
  const eyebrow = post ? `${post.category} · Journal` : "Journal";
  const title = post?.title ?? "SyncUpAlarm Journal";
  const description =
    post?.description ?? "Practical guides for shared iPhone alarms and better morning routines.";

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
            top: -140,
            right: -90,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(168, 85, 247, 0.28)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: 30,
            width: 430,
            height: 430,
            borderRadius: 9999,
            background: "rgba(34, 211, 238, 0.14)",
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
              fontWeight: 700,
              color: "#f97316",
              marginBottom: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.03,
              maxWidth: 980,
              letterSpacing: -1.4,
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 25,
              color: "#d4d4d8",
              maxWidth: 880,
              lineHeight: 1.34,
              display: "flex",
            }}
          >
            {description}
          </div>
          <div
            style={{
              marginTop: 42,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 18,
                background: "linear-gradient(135deg, #f97316, #a855f7)",
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "#a855f7",
                display: "flex",
              }}
            >
              {SITE.name}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
