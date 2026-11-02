import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog/get-posts";
import { getGuideSlugs } from "@/lib/blog/guides";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain;
  const posts = getAllPosts();

  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/blog/guides`,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    ...getGuideSlugs().map((slug) => ({
      url: `${base}/blog/guides/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/faq`,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${base}/about`,
      lastModified: "2026-10-17",
      changeFrequency: "monthly",
      priority: 0.68,
    },
    {
      url: `${base}/press`,
      changeFrequency: "monthly",
      priority: 0.62,
    },
    {
      url: `${base}/how-pairing-works`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
