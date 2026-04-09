import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog/types";

const base = SITE.domain;

export function getBlogJsonLd(posts: Pick<BlogPost, "title" | "description" | "slug" | "date">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Journal`,
    description:
      "Practical guides on partner alarms, iPhone wake routines, and staying in sync across time zones.",
    url: `${base}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: base,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${base}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };
}

export function getBlogPostingJsonLd(post: BlogPost) {
  const url = `${base}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      name: post.author,
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: base,
      logo: { "@type": "ImageObject", url: `${base}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

export function getBreadcrumbBlogJsonLd(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${base}/blog/${slug}` },
    ],
  };
}
