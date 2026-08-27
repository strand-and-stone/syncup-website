import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog/get-posts";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain;
  const now = new Date();
  const posts = getAllPosts();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/download`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.68,
    },
    {
      url: `${base}/press`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.62,
    },
    {
      url: `${base}/how-pairing-works`,
      lastModified: now,
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
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/rss.xml`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];
}
