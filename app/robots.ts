import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = SITE.domain;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: new URL(SITE.domain).host,
  };
}
