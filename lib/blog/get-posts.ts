import fs from "fs";
import path from "path";

import matter from "gray-matter";

import type { BlogPost } from "@/lib/blog/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readingTimeFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) {
    return null;
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Record<string, unknown>;
  const keywords = Array.isArray(fm.keywords)
    ? (fm.keywords as string[])
    : typeof fm.keywords === "string"
      ? [fm.keywords]
      : [];

  return {
    slug,
    title: String(fm.title ?? ""),
    description: String(fm.description ?? ""),
    date: String(fm.date ?? ""),
    updated: String(fm.updated ?? fm.date ?? ""),
    author: String(fm.author ?? "SyncUpAlarm"),
    category: String(fm.category ?? "Guides"),
    keywords,
    content,
    readingTimeMinutes: readingTimeFromText(content),
  };
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
