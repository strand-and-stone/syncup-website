import { fillMetadataSegment } from "next/dist/lib/metadata/get-metadata-route";

import {
  IPHONE_ALARM_CHECKLIST_HOWTO_NAME,
  IPHONE_ALARM_GUIDE_SLUG,
  parseIphoneAlarmChecklist,
} from "@/lib/blog/iphone-alarm-checklist";
import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/lib/blog/types";

/** HowTo description captured before the Oct 26, 2026 title and meta change. */
const IPHONE_GUIDE_PREVIOUS_HOWTO_DESCRIPTION =
  "A practical iPhone alarm guide covering Clock, Sleep Schedule, Focus, StandBy, Shortcuts, Apple Watch, AlarmKit, and shared alarm workflows.";

const base = SITE.domain;

/** Same path Next uses for `app/(marketing)/blog/[slug]/opengraph-image.tsx`. */
export function blogPostOpenGraphImagePath(slug: string): string {
  const imagePath = fillMetadataSegment(
    "/(marketing)/blog/[slug]",
    { slug },
    "opengraph-image",
  );
  return `${imagePath}/${slug}`;
}

function blogPostImage(slug: string) {
  return {
    "@type": "ImageObject",
    url: `${base}${blogPostOpenGraphImagePath(slug)}`,
    width: 1200,
    height: 630,
  };
}

function blogPostAuthor(name: string) {
  return {
    "@type": "Organization",
    name,
    url: base,
  };
}

export function getBlogJsonLd(
  posts: Pick<BlogPost, "title" | "description" | "slug" | "date" | "author">[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} Journal`,
    description:
      "Practical guides on partner alarms, iPhone wake routines, and staying in sync across time zones.",
    url: `${base}/blog`,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${base}/blog/${p.slug}`,
      item: {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        url: `${base}/blog/${p.slug}`,
        datePublished: p.date,
        author: blogPostAuthor(p.author),
        image: blogPostImage(p.slug),
      },
    })),
  };
}

export function getBlogPostingJsonLd(post: BlogPost) {
  const url = `${base}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.slug === IPHONE_ALARM_GUIDE_SLUG ? post.title : post.h1,
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
    image: blogPostImage(post.slug),
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

function getFaqPageJsonLd(post: BlogPost) {
  const lines = post.content.split("\n");
  const faqStart = lines.findIndex(
    (line) => line.trim().toLowerCase() === "## faq",
  );
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

function routineHowToSteps(post: BlogPost): string[] {
  if (post.slug !== IPHONE_ALARM_GUIDE_SLUG) {
    return [...post.content.matchAll(/^###\s+Step\s+\d+:\s+(.+)$/gm)].map(
      (match) => match[1].trim(),
    );
  }

  const lines = post.content.split("\n");
  let inRoutine = false;
  const names: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      inRoutine = line === "## How to plan a shared iPhone alarm routine";
      continue;
    }
    if (!inRoutine) {
      continue;
    }
    const match = /^###\s+Step\s+\d+:\s+(.+)$/.exec(line);
    if (match) {
      names.push(match[1].trim());
    }
  }
  return names;
}

function getHowToJsonLd(post: BlogPost) {
  const names = routineHowToSteps(post);
  if (names.length === 0) {
    return null;
  }

  const preservedGuide = post.slug === IPHONE_ALARM_GUIDE_SLUG;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: preservedGuide ? post.h1 : post.title,
    description: preservedGuide
      ? IPHONE_GUIDE_PREVIOUS_HOWTO_DESCRIPTION
      : post.description,
    step: names.map((name, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name,
      text: name,
    })),
    url: `${base}/blog/${post.slug}`,
    inLanguage: "en-US",
  };
}

function getIphoneChecklistHowToJsonLd(post: BlogPost) {
  if (post.slug !== IPHONE_ALARM_GUIDE_SLUG) {
    return null;
  }
  const checklist = parseIphoneAlarmChecklist(post.content);
  if (!checklist || checklist.steps.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: IPHONE_ALARM_CHECKLIST_HOWTO_NAME,
    step: checklist.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
    url: `${base}/blog/${post.slug}`,
    inLanguage: "en-US",
  };
}

function getItemListJsonLd(post: BlogPost) {
  const optionMatches = [
    ...post.content.matchAll(/^##\s+Option\s+\d+:\s+(.+)$/gm),
  ];
  if (optionMatches.length === 0) {
    return null;
  }

  const image = blogPostImage(post.slug);
  const author = blogPostAuthor(post.author);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: post.title,
    description: post.description,
    url: `${base}/blog/${post.slug}`,
    numberOfItems: optionMatches.length,
    itemListElement: optionMatches.map((match, index) => {
      const name = match[1].trim();
      return {
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${base}/blog/${post.slug}`,
        item: {
          "@type": "Article",
          headline: name,
          name,
          url: `${base}/blog/${post.slug}`,
          author,
          image,
        },
      };
    }),
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
    const checklistHowTo = getIphoneChecklistHowToJsonLd(post);
    if (checklistHowTo) {
      extras.push(checklistHowTo);
    }
  }

  if (schema.has("ItemList")) {
    const itemList = getItemListJsonLd(post);
    if (itemList) {
      extras.push(itemList);
    }
  }

  return extras;
}

export function getBreadcrumbBlogJsonLd(slug: string, title: string) {
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Home", item: base },
    { "@type": "ListItem", position: 2, name: "Journal", item: `${base}/blog` },
  ];

  if (slug === IPHONE_ALARM_GUIDE_SLUG) {
    itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: "iPhone alarms guide hub",
      item: `${base}/blog/guides/iphone-alarms`,
    });
    itemListElement.push({
      "@type": "ListItem",
      position: 4,
      name: title,
      item: `${base}/blog/${slug}`,
    });
  } else {
    itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: title,
      item: `${base}/blog/${slug}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}
