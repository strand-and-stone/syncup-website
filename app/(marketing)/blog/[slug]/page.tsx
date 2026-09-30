import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareBar } from "@/components/blog/ShareBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog/get-posts";
import { getMarkdownHeadings } from "@/lib/blog/headings";
import { SITE } from "@/lib/constants";
import {
  getBlogPostingJsonLd,
  getBreadcrumbBlogJsonLd,
  getExtraBlogJsonLd,
} from "@/lib/structured-data/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Not found" };
  }
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.domain}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: SITE.name,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const articleLd = getBlogPostingJsonLd(post);
  const breadcrumbLd = getBreadcrumbBlogJsonLd(slug, post.title);
  const extraLd = getExtraBlogJsonLd(post);
  const headings = getMarkdownHeadings(post.content);
  const allPosts = getAllPosts();
  const relatedPosts = (
    post.related.length > 0
      ? post.related
          .map((relatedSlug) => allPosts.find((entry) => entry.slug === relatedSlug))
          .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      : allPosts.filter(
          (entry) => entry.slug !== post.slug && entry.category === post.category,
        )
  );

  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={[articleLd, breadcrumbLd, ...extraLd]} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="mx-auto w-full max-w-2xl">
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal">
              Home
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href="/blog" className="hover:text-teal">
              Journal
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-zinc-400">{post.category}</span>
          </nav>

          <header className="mt-6 border-b border-white/10 pb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">
              {post.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-zinc-400">{post.description}</p>
            <p className="mt-6 text-sm text-zinc-600">
              <time dateTime={post.date}>{post.date}</time>
              {post.updated !== post.date ? (
                <>
                  {" "}
                  · Updated <time dateTime={post.updated}>{post.updated}</time>
                </>
              ) : null}
              {" · "}
              {post.readingTimeMinutes} min read
              {" · "}
              {post.author}
            </p>
            <div className="mt-6 rounded-2xl border border-teal/30 bg-teal/10 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">Want to apply this guide today?</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                Install SyncUpAlarm and run this routine with a shared iPhone wake setup.
              </p>
              <p className="mt-3">
                <Link
                  href="/download"
                  className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                >
                  Download SyncUpAlarm
                </Link>
              </p>
            </div>
            <ShareBar title={post.title} url={`${SITE.domain}/blog/${slug}`} />
          </header>

          <div className="blog-content pb-8 pt-10">
            <MarkdownBody
              content={post.content}
              inlineCta={slug !== "shared-wake-agreement"}
            />
          </div>

          <RelatedPosts currentSlug={post.slug} related={relatedPosts} />

          <footer className="mt-10 border-t border-white/10 pt-10">
            <Link
              href="/blog"
              className="text-sm font-medium text-teal hover:underline"
            >
              ← All journal posts
            </Link>
          </footer>
        </article>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </main>
  );
}
