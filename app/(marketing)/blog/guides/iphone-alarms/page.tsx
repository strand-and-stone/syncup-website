import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/blog/get-posts";
import { BLOG_GUIDES } from "@/lib/blog/guides";
import { SITE } from "@/lib/constants";

const title = "iPhone Alarm App Guide: Clock, AlarmKit, Shared";
const description =
  "How iPhone alarms work: Clock, Sleep Schedule, Focus, AlarmKit apps, and how to share an alarm with a partner. Guides for one person or two.";

const H1 = "iPhone Alarms: Clock, Sleep Schedule, AlarmKit, and Shared Alarms";

const SET_UP_ALARMS = [
  "iphone-alarms-complete-guide",
  "calendar-vs-alarm-for-waking-up",
  "backup-alarm-when-the-phone-dies",
] as const;

const SHARE_AN_ALARM = [
  "partner-alarm-sync-iphone-guide",
  "alarmkit-partner-alarms-iphone",
] as const;

const WATCH_ACCESSIBILITY_HEAVY_SLEEPERS = [
  "apple-watch-and-shared-wake-routines",
  "accessible-iphone-alarm-cues",
  "alarm-for-heavy-sleepers",
] as const;

const WHY_TWO_PEOPLE_NEED_ONE_PLAN = [
  "why-texting-alarm-times-doesnt-work",
  "privacy-of-shared-alarm-schedules",
] as const;

const RELATED_HUBS = ["/blog/guides/shared-wake-routines", "/blog/guides/long-distance-mornings"] as const;

function getGuideCard(href: string) {
  return BLOG_GUIDES.find((g) => `/blog/guides/${g.slug}` === href);
}

function isPost(value: ReturnType<typeof getPostBySlug>): value is NonNullable<ReturnType<typeof getPostBySlug>> {
  return value !== null;
}

function LinkCard({
  href,
  eyebrow,
  title: cardTitle,
  blurb,
}: {
  href: string;
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-950/40 p-6 transition-all hover:-translate-y-0.5 hover:border-purple/30 hover:bg-zinc-950/60">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-200">{eyebrow}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-white group-hover:text-purple">
        <Link href={href}>{cardTitle}</Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">{blurb}</p>
      <p className="mt-4">
        <Link href={href} className="text-sm font-medium text-teal transition-colors group-hover:text-purple">
          Open →
        </Link>
      </p>
    </article>
  );
}

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/blog/guides/iphone-alarms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} · ${SITE.name}`,
    description,
    url: `${SITE.domain}/blog/guides/iphone-alarms`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${SITE.name}`,
    description,
  },
};

export default function IPhoneAlarmsGuideHubPage() {
  const url = `${SITE.domain}/blog/guides/iphone-alarms`;

  const cardUrls = [
    ...SET_UP_ALARMS.map((slug) => `/blog/${slug}`),
    ...SHARE_AN_ALARM.map((slug) => `/blog/${slug}`),
    "/how-pairing-works",
    ...WATCH_ACCESSIBILITY_HEAVY_SLEEPERS.map((slug) => `/blog/${slug}`),
    ...WHY_TWO_PEOPLE_NEED_ONE_PLAN.map((slug) => `/blog/${slug}`),
    ...RELATED_HUBS,
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE.domain}/blog` },
      { "@type": "ListItem", position: 3, name: "Guides", item: `${SITE.domain}/blog/guides` },
      { "@type": "ListItem", position: 4, name: title, item: url },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      name: title,
      numberOfItems: cardUrls.length,
      itemListElement: cardUrls.map((href, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE.domain}${href}`,
      })),
    },
  };

  const faqs = [
    {
      question: "What is AlarmKit?",
      answer: "Apple's framework that lets third-party apps schedule alarms that ring like the Clock app.",
    },
    {
      question: "Do Focus modes affect alarms?",
      answer: "Focus mainly filters notifications; test your alarm with your Focus settings on.",
    },
    {
      question: "Should I keep a backup alarm?",
      answer: "For anything critical, yes.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const setupCards = SET_UP_ALARMS.map((slug) => getPostBySlug(slug)).filter(isPost);
  const shareCards = SHARE_AN_ALARM.map((slug) => getPostBySlug(slug)).filter(isPost);
  const watchCards = WATCH_ACCESSIBILITY_HEAVY_SLEEPERS.map((slug) => getPostBySlug(slug)).filter(isPost);
  const whyCards = WHY_TWO_PEOPLE_NEED_ONE_PLAN.map((slug) => getPostBySlug(slug)).filter(isPost);

  const relatedHubCards = RELATED_HUBS.map((href) => {
    const guide = getGuideCard(href);
    return guide ? { href, guide } : null;
  }).filter(
    (
      item,
    ): item is {
      href: (typeof RELATED_HUBS)[number];
      guide: NonNullable<ReturnType<typeof getGuideCard>>;
    } => item !== null,
  );

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:max-w-5xl lg:px-8">
      <JsonLd data={[collectionLd, breadcrumbLd, faqLd]} />

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
        <span className="text-zinc-400">iPhone alarms</span>
      </nav>

      <p className="text-purple mt-6 text-sm font-medium tracking-widest uppercase">Guides</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{H1}</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
        On iPhone, the Clock app handles personal alarms, Sleep Schedule handles a recurring bedtime and wake time,
        and AlarmKit lets third-party alarm apps ring like the built-in alarm.
      </p>

      <section className="mt-12" aria-labelledby="which-tool-heading">
        <h2 id="which-tool-heading" className="text-xl font-semibold tracking-tight text-white">
          Which Apple tool does which job
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/40">
          <table className="w-full min-w-[420px] text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Tool</th>
                <th className="px-4 py-3 font-semibold">Use it for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t border-white/5 px-4 py-3 font-medium text-zinc-200">Clock alarm</td>
                <td className="border-t border-white/5 px-4 py-3">One person, one time</td>
              </tr>
              <tr>
                <td className="border-t border-white/5 px-4 py-3 font-medium text-zinc-200">Sleep Schedule</td>
                <td className="border-t border-white/5 px-4 py-3">Recurring wake time with wind-down</td>
              </tr>
              <tr>
                <td className="border-t border-white/5 px-4 py-3 font-medium text-zinc-200">Calendar reminder</td>
                <td className="border-t border-white/5 px-4 py-3">Remembering an event, not waking up</td>
              </tr>
              <tr>
                <td className="border-t border-white/5 px-4 py-3 font-medium text-zinc-200">
                  AlarmKit app (like SyncUp)
                </td>
                <td className="border-t border-white/5 px-4 py-3">App alarms that ring like Clock; shared plans</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="set-up-heading">
        <h2 id="set-up-heading" className="text-xl font-semibold tracking-tight text-white">
          Set up iPhone alarms
        </h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {setupCards.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="share-heading">
        <h2 id="share-heading" className="text-xl font-semibold tracking-tight text-white">
          Share an alarm on iPhone
        </h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shareCards.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
          <li>
            <LinkCard
              href="/how-pairing-works"
              eyebrow="Product"
              title="How SyncUpAlarm pairing works"
              blurb="Invite with a link on two iPhones, iOS 26.0+, AlarmKit permission, what the privacy policy says is shared. Store IAP listed."
            />
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="watch-heading">
        <h2 id="watch-heading" className="text-xl font-semibold tracking-tight text-white">
          Apple Watch, accessibility, and heavy sleepers
        </h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {watchCards.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="visible-plan-heading">
        <h2 id="visible-plan-heading" className="text-xl font-semibold tracking-tight text-white">
          Why two people need one visible plan
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
          Texting the time creates memory debt. Test the real setup in the afternoon. Confirm sound, placement, and
          that both people see the same time before you depend on it.
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {whyCards.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="related-hubs-heading">
        <h2 id="related-hubs-heading" className="text-xl font-semibold tracking-tight text-white">
          Related hubs
        </h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2">
          {relatedHubCards.map(({ href, guide }) => (
            <li key={href}>
              <LinkCard href={href} eyebrow="Guide" title={guide.title} blurb={guide.description} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-semibold tracking-tight text-white">
          FAQ
        </h2>
        <dl className="mt-4 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold text-zinc-100">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-zinc-400 sm:text-base">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-teal/30 bg-teal/10 mt-12 rounded-2xl border p-6" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-xl font-semibold text-white">
          If you both use iPhone, SyncUp adds what Clock doesn&apos;t: one alarm plan on two phones.
        </h2>
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
        &quot;SyncUp is a scheduling tool, not a medical or safety device. Phone settings, time changes, battery and
        connectivity can affect any alarm, so for anything critical, keep a backup alarm. This article is general
        information, not medical advice.&quot;
      </p>
    </main>
  );
}

