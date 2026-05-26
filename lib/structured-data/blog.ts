import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog/types";
import { getSoftwareApplicationJsonLd } from "@/lib/structured-data";

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

function getFaqPageJsonLd(post: BlogPost) {
  const lines = post.content.split("\n");
  const faqStart = lines.findIndex((line) => line.trim().toLowerCase() === "## faq");
  if (faqStart === -1) {
    return null;
  }

  const entries: Array<{ question: string; answer: string }> = [];
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  for (let i = faqStart + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith("## ")) {
      break;
    }

    if (line.startsWith("### ")) {
      if (currentQuestion && currentAnswer.length > 0) {
        entries.push({
          question: currentQuestion,
          answer: currentAnswer.join(" ").trim(),
        });
      }
      currentQuestion = line.replace(/^###\s+/, "").trim();
      currentAnswer = [];
      continue;
    }

    if (!line || line.startsWith("- ") || line.startsWith("|")) {
      continue;
    }

    currentAnswer.push(line);
  }

  if (currentQuestion && currentAnswer.length > 0) {
    entries.push({
      question: currentQuestion,
      answer: currentAnswer.join(" ").trim(),
    });
  }

  if (entries.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

function getHowToJsonLd(post: BlogPost) {
  const stepMatches = [...post.content.matchAll(/^###\s+Step\s+\d+:\s+(.+)$/gm)];
  if (stepMatches.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.description,
    step: stepMatches.map((match, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: match[1].trim(),
      text: match[1].trim(),
    })),
    url: `${base}/blog/${post.slug}`,
    inLanguage: "en-US",
  };
}

function getItemListJsonLd(post: BlogPost) {
  const optionMatches = [...post.content.matchAll(/^##\s+Option\s+\d+:\s+(.+)$/gm)];
  if (optionMatches.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: post.title,
    description: post.description,
    itemListElement: optionMatches.map((match, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: match[1].trim(),
    })),
    url: `${base}/blog/${post.slug}`,
  };
}

export function getExtraBlogJsonLd(post: BlogPost) {
  const extras: Record<string, unknown>[] = [];
  const schema = new Set(post.schema.map((value) => value.trim()));

  if (schema.has("FAQPage")) {
    const faq = getFaqPageJsonLd(post);
    if (faq) {
      extras.push(faq);
    }
  }

  if (schema.has("HowTo")) {
    const howTo = getHowToJsonLd(post);
    if (howTo) {
      extras.push(howTo);
    }
  }

  if (schema.has("ItemList")) {
    const itemList = getItemListJsonLd(post);
    if (itemList) {
      extras.push(itemList);
    }
  }

  if (post.content.toLowerCase().includes("syncupalarm")) {
    extras.push(getSoftwareApplicationJsonLd());
  }

  return extras;
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
