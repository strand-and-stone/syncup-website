import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog/get-posts";
import { getGuideSlugs } from "@/lib/blog/guides";
import { SITE } from "@/lib/constants";

/**
 * Sitemap-only lastmod values. Each instant is the committer time of the
 * main commit that last changed that URL's own content. On-page dates stay
 * on their frontmatter.
 *
 * Shared chrome from #34 (footer trademark line, sitewide app schema name)
 * is not used as a per-URL content date.
 */
/** #40 squash. Committer 2026-11-06T11:24:34-07:00. */
const SHIPPED_40 = "2026-11-06T18:24:34.000Z";

const PAGE_LAST_MODIFIED = {
  // 1f6d5993901b693433803cf092292ded71d9b17a pairing and calendar cards
  "/": SHIPPED_40,
  // 1f6d5993901b693433803cf092292ded71d9b17a pairing pillar and retitled cards
  "/blog": SHIPPED_40,
  // 1f6d5993901b693433803cf092292ded71d9b17a pairing and calendar cards
  "/blog/guides": SHIPPED_40,
  // 30730c242cadc0559ff6979277aa0434e534b691 guide copy
  "/blog/guides/long-distance-mornings": "2026-10-17T08:31:24.000Z",
  // e1172be578e22b2a7d4c3aa6594f0f92ccc8e561 card title and description
  "/blog/guides/iphone-alarms": "2026-11-06T05:34:10.000Z",
  // 1f6d5993901b693433803cf092292ded71d9b17a daylight-saving card description
  "/blog/guides/shared-wake-routines": SHIPPED_40,
  // 984c52a9aba5f51a1a385618d9e22f247f36bef4 support address in the page body
  "/faq": "2026-10-21T20:59:48.000Z",
  "/press": "2026-10-21T20:59:48.000Z",
  "/how-pairing-works": "2026-10-21T20:59:48.000Z",
  "/privacy": "2026-10-21T20:59:48.000Z",
  "/terms": "2026-10-21T20:59:48.000Z",
} as const;

/**
 * Frontmatter `updated` still feeds every other post. Overrides are sitemap-only
 * when that field is earlier than the commit that changed the page.
 */
const POST_LAST_MODIFIED: Record<string, string> = {
  // e1172be578e22b2a7d4c3aa6594f0f92ccc8e561 title and description; updated left at 2026-10-23
  "alarm-for-heavy-sleepers": "2026-11-06T05:34:10.000Z",
  // 1f6d5993901b693433803cf092292ded71d9b17a title, H1, and description
  "daylight-saving-shared-alarms": SHIPPED_40,
  // 1f6d5993901b693433803cf092292ded71d9b17a title and H1
  "chronotypes-couples-sleep-compatibility": SHIPPED_40,
};

function pageLastModified(path: keyof typeof PAGE_LAST_MODIFIED): string {
  return PAGE_LAST_MODIFIED[path];
}

function guideLastModified(slug: string): string {
  const path = `/blog/guides/${slug}` as keyof typeof PAGE_LAST_MODIFIED;
  const value = PAGE_LAST_MODIFIED[path];
  if (!value) {
    throw new Error(`No sitemap lastmod for /blog/guides/${slug}`);
  }
  return value;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain;
  const posts = getAllPosts();

  return [
    {
      url: base,
      lastModified: pageLastModified("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: pageLastModified("/blog"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/blog/guides`,
      lastModified: pageLastModified("/blog/guides"),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    ...getGuideSlugs().map((slug) => ({
      url: `${base}/blog/guides/${slug}`,
      lastModified: guideLastModified(slug),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/faq`,
      lastModified: pageLastModified("/faq"),
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
      lastModified: pageLastModified("/press"),
      changeFrequency: "monthly",
      priority: 0.62,
    },
    {
      url: `${base}/how-pairing-works`,
      lastModified: pageLastModified("/how-pairing-works"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: POST_LAST_MODIFIED[p.slug] ?? new Date(p.updated),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${base}/privacy`,
      lastModified: pageLastModified("/privacy"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: pageLastModified("/terms"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
