import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blog/get-posts";
import { SITE } from "@/lib/constants";
import { getBlogJsonLd } from "@/lib/structured-data/blog";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Guides on partner alarms, mornings across time zones, shift work, and how AlarmKit fits into reliable iPhone wake-ups.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Journal · ${SITE.name}`,
    description:
      "Practical writing on shared mornings, long-distance rhythm, and iPhone alarm reliability.",
    url: `${SITE.domain}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const jsonLd = getBlogJsonLd(
    posts.map((p) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
      date: p.date,
    })),
  );

  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:max-w-4xl lg:px-8"
    >
      <JsonLd data={jsonLd} />
      <p className="text-sm font-medium uppercase tracking-widest text-purple">
        Journal
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Mornings, distance, and the systems behind them
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        Editorial guides from the SyncUpAlarm team—written for humans first, search
        engines second. We cite limits, link to Apple’s docs where it helps, and
        avoid promising magic.
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600">
        <Link href="/" className="text-teal hover:underline">
          ← Back to home
        </Link>
        <a
          href="/rss.xml"
          className="text-zinc-500 hover:text-purple"
          rel="alternate"
          type="application/rss+xml"
        >
          RSS feed
        </a>
      </p>

      <ul className="mt-14 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
