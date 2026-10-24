import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/blog/get-posts";
import { getGuideBySlug } from "@/lib/blog/guides";
import type { BlogPost } from "@/lib/blog/types";
import { SITE } from "@/lib/constants";
import { blogPostOpenGraphImagePath } from "@/lib/structured-data/blog";

export const SHARED_WAKE_ROUTINES_TITLE = "Shared Wake Routines for Couples and Roommates";
export const SHARED_WAKE_ROUTINES_H1 =
  "Shared Wake Routines: Guides for Couples, Roommates, and Partners";
export const SHARED_WAKE_ROUTINES_META_DESCRIPTION =
  "Guides for waking up on one shared plan: agreements, weekday rules, quiet hours, shift work, and partner alarms for couples and roommates.";

type CardSpec = {
  href: string;
  title: string;
  description?: string;
};

const CARD_ROWS: Array<{ heading: string; columns: 2 | 3 | 4; cards: CardSpec[] }> = [
  {
    heading: "Start here",
    columns: 4,
    cards: [
      {
        href: "/blog/shared-wake-agreement",
        title: "Shared wake agreement",
        description: "Decide the time, the change rules, and the check-in.",
      },
      {
        href: "/blog/partner-alarm-first-week-checklist",
        title: "First-week checklist",
        description: "What to test in your first seven mornings.",
      },
      {
        href: "/blog/weekday-and-weekend-wake-rules",
        title: "Weekday and weekend rules",
        description: "Keep the two close so Mondays feel normal.",
      },
      {
        href: "/blog/new-year-shared-wake-routine",
        title: "New Year wake routine for two",
        description: "A shared morning plan that sticks past January.",
      },
    ],
  },
  {
    heading: "Couples and partners",
    columns: 3,
    cards: [
      { href: "/blog/wake-up-without-waking-partner", title: "Wake up without waking your partner." },
      { href: "/blog/how-to-wake-up-a-heavy-sleeper", title: "A partner wake protocol for heavy sleepers." },
      {
        href: "/blog/partner-sync-wake-challenge",
        title: "Partner wake challenge",
        description: "Make getting up a shared game.",
      },
    ],
  },
  {
    heading: "Roommates, workouts, and households",
    columns: 3,
    cards: [
      { href: "/blog/roommate-quiet-hours-agreement", title: "Roommate quiet hours agreement." },
      { href: "/blog/workout-partner-morning-alarm", title: "Workout partner morning alarm." },
      { href: "/blog/how-to-design-a-wake-challenge", title: "How to design a wake challenge." },
    ],
  },
  {
    heading: "Shift work, travel, and time changes",
    columns: 4,
    cards: [
      { href: "/blog/shift-work-shared-morning-routine", title: "Shift work shared morning routine." },
      { href: "/blog/travel-nurse-partner-alarm-routine", title: "Travel nurse partner routine." },
      { href: "/blog/one-person-traveling-partner-alarm", title: "When one person is traveling." },
      { href: "/blog/daylight-saving-shared-alarms", title: "Daylight saving and shared alarms." },
    ],
  },
  {
    heading: "What studies can and can't tell you",
    columns: 3,
    cards: [
      {
        href: "/blog/couples-waking-up-together-research",
        title: "What research says about waking up together, and its limits.",
      },
      { href: "/blog/chronotypes-couples-sleep-compatibility", title: "Chronotypes and couples." },
      { href: "/blog/snooze-button-science", title: "Snooze button: what's known." },
    ],
  },
  {
    heading: "Related hubs",
    columns: 2,
    cards: [
      { href: "/blog/guides/iphone-alarms", title: "iPhone alarms for two" },
      { href: "/blog/guides/long-distance-mornings", title: "Long-distance mornings" },
    ],
  },
];

const WHEN_NOT_TO_SYNC: CardSpec = {
  href: "/blog/when-not-to-sync-an-alarm",
  title: "Sometimes separate alarms are the better plan.",
};

const FAQS = [
  {
    question: "What is a shared wake routine?",
    answer: "One agreed wake plan for two or more people, including who can change it.",
  },
  {
    question: "Do we have to wake at the same time?",
    answer: "No. A shared plan can stagger times; the point is that everyone can see it.",
  },
  {
    question: "How do roommates share an alarm plan without noise?",
    answer: "Agree on quiet hours and use vibration or later, softer alarms.",
  },
  {
    question: "Where should we start?",
    answer: "The shared wake agreement, then the first-week checklist.",
  },
] as const;

function sectionId(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function gridClass(columns: 2 | 3 | 4) {
  if (columns === 4) {
    return "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4";
  }
  if (columns === 3) {
    return "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
  }
  return "mt-6 grid gap-6 sm:grid-cols-2";
}

function asSyntheticPost(card: CardSpec): BlogPost {
  return {
    slug: card.href.replace(/^\/blog\//, "").replace(/^\//, ""),
    title: card.title,
    h1: card.title,
    description: card.description ?? "",
    date: "",
    updated: "",
    author: SITE.name,
    category: "Guides",
    keywords: [],
    schema: [],
    related: [],
    content: "",
    readingTimeMinutes: 1,
  };
}

export function getSharedWakeRoutinesHubMetadata(): Metadata {
  return {
    title: { absolute: SHARED_WAKE_ROUTINES_TITLE },
    description: SHARED_WAKE_ROUTINES_META_DESCRIPTION,
    alternates: { canonical: "/blog/guides/shared-wake-routines" },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${SHARED_WAKE_ROUTINES_TITLE} · ${SITE.name}`,
      description: SHARED_WAKE_ROUTINES_META_DESCRIPTION,
      url: `${SITE.domain}/blog/guides/shared-wake-routines`,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SHARED_WAKE_ROUTINES_TITLE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SHARED_WAKE_ROUTINES_TITLE} · ${SITE.name}`,
      description: SHARED_WAKE_ROUTINES_META_DESCRIPTION,
      images: ["/twitter-image"],
    },
  };
}

export function SharedWakeRoutinesHub() {
  const pageUrl = `${SITE.domain}/blog/guides/shared-wake-routines`;

  const postCards: Array<
    CardSpec & { post: BlogPost; imageSrc?: string; schemaName: string; schemaUrl: string }
  > = [];
  const dropped: CardSpec[] = [];

  const allCards = [...CARD_ROWS.flatMap((row) => row.cards), WHEN_NOT_TO_SYNC];

  for (const card of allCards) {
    if (card.href.startsWith("/blog/guides/")) {
      const guideSlug = card.href.replace("/blog/guides/", "");
      const guide = getGuideBySlug(guideSlug);
      if (!guide) {
        dropped.push(card);
        continue;
      }
      postCards.push({
        ...card,
        post: asSyntheticPost({
          href: card.href,
          title: card.title,
          description: guide.description,
        }),
        imageSrc: "/opengraph-image",
        schemaName: card.title,
        schemaUrl: `${SITE.domain}${card.href}`,
      });
      continue;
    }

    if (!card.href.startsWith("/blog/")) {
      dropped.push(card);
      continue;
    }

    const slug = card.href.replace("/blog/", "");
    const post = getPostBySlug(slug);
    if (!post) {
      dropped.push(card);
      continue;
    }

    postCards.push({
      ...card,
      post,
      imageSrc: blogPostOpenGraphImagePath(post.slug),
      schemaName: card.title,
      schemaUrl: `${SITE.domain}${card.href}`,
    });
  }

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SHARED_WAKE_ROUTINES_TITLE,
    description: SHARED_WAKE_ROUTINES_META_DESCRIPTION,
    url: pageUrl,
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: postCards.length,
      itemListElement: postCards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: card.schemaUrl,
        name: card.schemaName,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE.domain}/blog` },
      { "@type": "ListItem", position: 3, name: "Guides", item: `${SITE.domain}/blog/guides` },
      { "@type": "ListItem", position: 4, name: SHARED_WAKE_ROUTINES_TITLE, item: pageUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:max-w-5xl lg:px-8"
    >
      <JsonLd data={[itemListLd, breadcrumbLd, faqLd]} />

      <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-teal">
          Home
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <Link href="/blog" className="hover:text-teal">
          Journal
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <Link href="/blog/guides" className="hover:text-teal">
          Guides
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <span className="text-zinc-400">Shared wake routines</span>
      </nav>

      <header className="mt-8 border-b border-white/10 pb-10">
        <p className="text-purple text-sm font-medium tracking-widest uppercase">Guide hub</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {SHARED_WAKE_ROUTINES_H1}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          A shared wake routine is one plan two or more people agree on: the time, who can change
          it, and what happens if someone sleeps in. Start with the agreement, then pick the guide
          that matches your household.
        </p>
      </header>

      {CARD_ROWS.slice(0, 5).map((row) => (
        <section
          key={row.heading}
          className="mt-12"
          aria-labelledby={`${sectionId(row.heading)}-heading`}
        >
          <h2
            id={`${sectionId(row.heading)}-heading`}
            className="text-xl font-semibold tracking-tight text-white"
          >
            {row.heading}
          </h2>
          <ul className={gridClass(row.columns)}>
            {row.cards.map((card) => {
              const match = postCards.find((entry) => entry.href === card.href);
              if (!match) {
                return null;
              }
              return (
                <li key={card.href}>
                  <BlogCard
                    post={match.post}
                    variant="hub"
                    imageSrc={match.imageSrc}
                    overrides={{
                      href: match.href,
                      title: card.title,
                      description: card.description,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section className="mt-12" aria-labelledby="when-not-to-sync-heading">
        <h2 id="when-not-to-sync-heading" className="text-xl font-semibold tracking-tight text-white">
          When not to sync
        </h2>
        <ul className="mt-6 grid gap-6">
          {(() => {
            const match = postCards.find((entry) => entry.href === WHEN_NOT_TO_SYNC.href);
            if (!match) {
              return null;
            }
            return (
              <li key={WHEN_NOT_TO_SYNC.href}>
                <BlogCard
                  post={match.post}
                  variant="hub"
                  imageSrc={match.imageSrc}
                  overrides={{
                    href: match.href,
                    title: WHEN_NOT_TO_SYNC.title,
                    description: WHEN_NOT_TO_SYNC.description,
                  }}
                />
              </li>
            );
          })()}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby={`${sectionId(CARD_ROWS[5].heading)}-heading`}>
        <h2
          id={`${sectionId(CARD_ROWS[5].heading)}-heading`}
          className="text-xl font-semibold tracking-tight text-white"
        >
          {CARD_ROWS[5].heading}
        </h2>
        <ul className={gridClass(CARD_ROWS[5].columns)}>
          {CARD_ROWS[5].cards.map((card) => {
            const match = postCards.find((entry) => entry.href === card.href);
            if (!match) {
              return null;
            }
            return (
              <li key={card.href}>
                <BlogCard
                  post={match.post}
                  variant="hub"
                  imageSrc={match.imageSrc}
                  overrides={{
                    href: match.href,
                    title: card.title,
                    description: match.post.description,
                  }}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-semibold tracking-tight text-white">
          FAQ
        </h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold text-zinc-100">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-zinc-400 sm:text-base">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-2xl border border-teal/30 bg-teal/10 p-6">
        <h2 className="text-xl font-semibold text-white">Run the plan on both iPhones</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
          If everyone uses iPhone, SyncUp keeps one wake plan visible on each phone.
        </p>
        <p className="mt-4">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>

      <p className="mt-12 text-sm leading-relaxed text-zinc-500">
        &quot;SyncUp is a scheduling tool, not a medical or safety device. Phone settings, time changes,
        battery and connectivity can affect any alarm, so for anything critical, keep a backup
        alarm. This article is general information, not medical advice.&quot;
      </p>

      {dropped.length > 0 ? (
        <p className="sr-only">{`Dropped cards: ${dropped.map((c) => c.href).join(", ")}`}</p>
      ) : null}
    </main>
  );
}

