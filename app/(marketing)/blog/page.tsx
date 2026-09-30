import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blog/get-posts";
import { BLOG_GUIDES } from "@/lib/blog/guides";
import { SITE } from "@/lib/constants";
import { getBlogJsonLd } from "@/lib/structured-data/blog";

const PILLAR_STYLES = [
  "border-teal/40 bg-teal/5",
  "border-purple/40 bg-purple/5",
  "border-flame/35 bg-flame/5",
];

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
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
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
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:max-w-5xl lg:px-8"
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

      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Start with a pillar
        </h2>
        <ul className="mt-3 grid gap-4 md:grid-cols-3">
          {BLOG_GUIDES.map((guide, index) => (
            <li
              key={guide.slug}
              className={`rounded-2xl border p-5 ${PILLAR_STYLES[index] ?? PILLAR_STYLES[0]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Pillar
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                <Link href={`/blog/guides/${guide.slug}`} className="hover:text-purple">
                  {guide.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{guide.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {featuredPost ? (
        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Featured read
          </p>
          <article className="mt-3 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 to-zinc-900/60 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">
              {featuredPost.category}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              <Link href={`/blog/${featuredPost.slug}`} className="hover:text-purple">
                {featuredPost.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {featuredPost.description}
            </p>
            <p className="mt-5 text-xs text-zinc-600">
              {featuredPost.date} · {featuredPost.readingTimeMinutes} min read
            </p>
            <p className="mt-5">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                Read featured article
              </Link>
            </p>
          </article>
        </section>
      ) : null}

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {remainingPosts.map((post, index) => {
          const feature = index % 5 === 0;
          return (
            <li key={post.slug} className={feature ? "sm:col-span-2" : undefined}>
              <BlogCard post={post} variant={feature ? "feature" : "compact"} />
            </li>
          );
        })}
      </ul>

      <section className="mt-12 rounded-2xl border border-teal/30 bg-teal/10 p-6">
        <h2 className="text-xl font-semibold text-white">Build a shared wake routine</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          Read a guide, then test it in the app. SyncUpAlarm is built for two-person iPhone
          wake routines across distance, travel, and shift changes.
        </p>
        <p className="mt-4">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>
    </main>
  );
}
