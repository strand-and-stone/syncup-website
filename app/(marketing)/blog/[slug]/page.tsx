import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug, getPostSlugs } from "@/lib/blog/get-posts";
import { SITE } from "@/lib/constants";
import {
  getBlogPostingJsonLd,
  getBreadcrumbBlogJsonLd,
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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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

  return (
    <main
      id="main-content"
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={[articleLd, breadcrumbLd]} />
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
      </header>

      <div className="blog-content pb-16 pt-10">
        <MarkdownBody content={post.content} />
      </div>

      <footer className="border-t border-white/10 pt-10">
        <Link
          href="/blog"
          className="text-sm font-medium text-teal hover:underline"
        >
          ← All journal posts
        </Link>
      </footer>
    </main>
  );
}
