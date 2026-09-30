import Link from "next/link";

import type { BlogPost } from "@/lib/blog/types";

const CATEGORY_TONE: Record<string, string> = {
  Research: "text-purple",
  Product: "text-teal",
  Guides: "text-zinc-200",
  Relationships: "text-flame",
  Lifestyle: "text-teal",
};

type BlogCardProps = {
  post: BlogPost;
  variant?: "compact" | "feature";
};

export function BlogCard({ post, variant = "compact" }: BlogCardProps) {
  const tone = CATEGORY_TONE[post.category] ?? "text-teal";

  if (variant === "feature") {
    return (
      <article className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-purple/25 bg-gradient-to-br from-purple/10 via-zinc-950 to-zinc-950 p-6 transition-colors hover:border-purple/50 sm:flex-row sm:items-end sm:p-8">
        <div className="max-w-2xl">
          <p className={`text-xs font-semibold uppercase tracking-wider ${tone}`}>
            {post.category}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white group-hover:text-purple">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {post.description}
          </p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="text-xs text-zinc-500">
            {post.date} · {post.readingTimeMinutes} min read
          </p>
          <p className="mt-3">
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-white transition-colors group-hover:text-purple"
            >
              Read article →
            </Link>
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-950/40 p-6 transition-all hover:-translate-y-0.5 hover:border-purple/30 hover:bg-zinc-950/60">
      <p className={`text-xs font-medium uppercase tracking-wider ${tone}`}>
        {post.category}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-white group-hover:text-purple">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {post.description}
      </p>
      <p className="mt-4 text-xs text-zinc-600">
        {post.date} · {post.readingTimeMinutes} min read
      </p>
      <p className="mt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-teal transition-colors group-hover:text-purple"
        >
          Read article →
        </Link>
      </p>
    </article>
  );
}
