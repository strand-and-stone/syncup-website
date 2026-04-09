import Link from "next/link";

import type { BlogPost } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-zinc-950/40 p-6 transition-colors hover:border-purple/30">
      <p className="text-xs font-medium uppercase tracking-wider text-teal">
        {post.category}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-white group-hover:text-purple">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
        {post.description}
      </p>
      <p className="mt-4 text-xs text-zinc-600">
        {post.date} · {post.readingTimeMinutes} min read
      </p>
    </article>
  );
}
