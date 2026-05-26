import Link from "next/link";

import type { BlogPost } from "@/lib/blog/types";

type RelatedPostsProps = {
  currentSlug: string;
  related: BlogPost[];
};

export function RelatedPosts({ currentSlug, related }: RelatedPostsProps) {
  const filtered = related.filter((post) => post.slug !== currentSlug).slice(0, 3);
  if (filtered.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
      <h2 className="text-lg font-semibold text-white">Related posts</h2>
      <ul className="mt-4 space-y-3">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-zinc-300 hover:text-teal">
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-zinc-500">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
