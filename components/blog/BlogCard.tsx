import Link from "next/link";

import type { BlogPost } from "@/lib/blog/types";

const CATEGORY_TONE: Record<string, string> = {
  Research: "text-purple",
  Product: "text-teal",
  Guides: "text-zinc-200",
  Relationships: "text-flame",
  Lifestyle: "text-teal",
};

type BlogCardOverrides = Partial<
  Pick<BlogPost, "title" | "description" | "category" | "date" | "readingTimeMinutes">
> & {
  href?: string;
};

type BlogCardProps = {
  post: BlogPost;
  variant?: "compact" | "feature" | "hub";
  overrides?: BlogCardOverrides;
  imageSrc?: string;
};

export function BlogCard({ post, variant = "compact", overrides, imageSrc }: BlogCardProps) {
  const merged: Required<
    Pick<BlogPost, "title" | "description" | "category" | "date" | "readingTimeMinutes">
  > & { href: string } = {
    href: overrides?.href ?? `/blog/${post.slug}`,
    title: overrides?.title ?? post.title,
    description: overrides?.description ?? post.description,
    category: overrides?.category ?? post.category,
    date: overrides?.date ?? post.date,
    readingTimeMinutes: overrides?.readingTimeMinutes ?? post.readingTimeMinutes,
  };

  const tone = CATEGORY_TONE[merged.category] ?? "text-teal";

  if (variant === "hub") {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40 transition-all hover:-translate-y-0.5 hover:border-purple/30 hover:bg-zinc-950/60">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={merged.title}
            className="aspect-[1200/630] w-full border-b border-white/10 bg-zinc-950 object-cover"
            loading="lazy"
          />
        ) : null}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-purple">
            <Link href={merged.href}>{merged.title}</Link>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{merged.description}</p>
          <p className="mt-4">
            <Link
              href={merged.href}
              className="text-sm font-medium text-teal transition-colors group-hover:text-purple"
            >
              Open →
            </Link>
          </p>
        </div>
      </article>
    );
  }

  if (variant === "feature") {
    return (
      <article className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-purple/25 bg-gradient-to-br from-purple/10 via-zinc-950 to-zinc-950 p-6 transition-colors hover:border-purple/50 sm:flex-row sm:items-end sm:p-8">
        <div className="max-w-2xl">
          <p className={`text-xs font-semibold uppercase tracking-wider ${tone}`}>
            {merged.category}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white group-hover:text-purple">
            <Link href={merged.href}>{merged.title}</Link>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {merged.description}
          </p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="text-xs text-zinc-500">
            {merged.date} · {merged.readingTimeMinutes} min read
          </p>
          <p className="mt-3">
            <Link
              href={merged.href}
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
        {merged.category}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-white group-hover:text-purple">
        <Link href={merged.href}>{merged.title}</Link>
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {merged.description}
      </p>
      <p className="mt-4 text-xs text-zinc-600">
        {merged.date} · {merged.readingTimeMinutes} min read
      </p>
      <p className="mt-4">
        <Link
          href={merged.href}
          className="text-sm font-medium text-teal transition-colors group-hover:text-purple"
        >
          Read article →
        </Link>
      </p>
    </article>
  );
}
