import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DAYLIGHT_SAVING_SLUG,
  DaylightSavingArticle,
  NEW_YEAR_WAKE_ROUTINE_SLUG,
} from "@/components/blog/DaylightSavingArticle";
import {
  SHARED_ALARM_COMPARISON_SLUG,
  SharedAlarmComparisonArticle,
} from "@/components/blog/SharedAlarmComparisonArticle";
import {
  HEAVY_SLEEPER_PARTNER_PROTOCOL_SLUG,
  HeavySleeperPartnerProtocolArticle,
} from "@/components/blog/HeavySleeperPartnerProtocolArticle";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareBar } from "@/components/blog/ShareBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog/get-posts";
import { getMarkdownHeadings } from "@/lib/blog/headings";
import type { HeadingItem } from "@/lib/blog/headings";
import {
  IPHONE_ALARM_BACKUP_GRID_LABEL,
  IPHONE_ALARM_CHECKLIST_H2,
  IPHONE_ALARM_CHECKLIST_ID,
  IPHONE_ALARM_GUIDE_SLUG,
  parseIphoneAlarmChecklist,
  splitAroundIphoneChecklist,
  type InlineSegment,
  type IphoneAlarmChecklist,
} from "@/lib/blog/iphone-alarm-checklist";
import type { BlogPost } from "@/lib/blog/types";
import { SITE } from "@/lib/constants";
import {
  getBlogPostingJsonLd,
  getBreadcrumbBlogJsonLd,
  getExtraBlogJsonLd,
} from "@/lib/structured-data/blog";

type Props = { params: Promise<{ slug: string }> };

const HEAVY_SLEEPER_ALARM_SLUG = "alarm-for-heavy-sleepers";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Not found" };
  }
  return {
    title:
      slug === DAYLIGHT_SAVING_SLUG || slug === IPHONE_ALARM_GUIDE_SLUG
        ? { absolute: post.title }
        : post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.domain}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: SITE.name,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const articleLd = getBlogPostingJsonLd(post);
  const breadcrumbLd = getBreadcrumbBlogJsonLd(slug, post.h1);
  const extraLd = getExtraBlogJsonLd(post);
  const designedArticle =
    slug === DAYLIGHT_SAVING_SLUG ||
    slug === SHARED_ALARM_COMPARISON_SLUG ||
    slug === HEAVY_SLEEPER_PARTNER_PROTOCOL_SLUG ||
    slug === NEW_YEAR_WAKE_ROUTINE_SLUG;
  const heavySleeperAlarmPost = slug === HEAVY_SLEEPER_ALARM_SLUG;
  const headings = getMarkdownHeadings(post.content)
    .filter((heading) => {
      if (slug !== HEAVY_SLEEPER_PARTNER_PROTOCOL_SLUG) {
        return true;
      }
      return heading.text !== "Soft CTA" && heading.text !== "Disclaimer";
    })
    .map((heading) =>
      heading.text === IPHONE_ALARM_CHECKLIST_H2
        ? { ...heading, id: IPHONE_ALARM_CHECKLIST_ID }
        : heading,
    );
  const iphoneChecklist =
    slug === IPHONE_ALARM_GUIDE_SLUG
      ? parseIphoneAlarmChecklist(post.content)
      : null;
  const iphoneGuideParts = iphoneChecklist
    ? splitAroundIphoneChecklist(post.content)
    : null;
  const allPosts = getAllPosts();
  const relatedPosts =
    post.related.length > 0
      ? post.related
          .map((relatedSlug) =>
            allPosts.find((entry) => entry.slug === relatedSlug),
          )
          .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      : allPosts.filter(
          (entry) =>
            entry.slug !== post.slug && entry.category === post.category,
        );

  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={[articleLd, breadcrumbLd, ...extraLd]} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="mx-auto w-full max-w-2xl">
          <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal">
              Home
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            <Link href="/blog" className="hover:text-teal">
              Journal
            </Link>
            <span className="mx-2 text-zinc-700">/</span>
            {slug === IPHONE_ALARM_GUIDE_SLUG ? (
              <>
                <Link
                  href="/blog/guides/iphone-alarms"
                  className="hover:text-teal"
                >
                  iPhone alarms guide hub
                </Link>
                <span className="mx-2 text-zinc-700">/</span>
                <span className="text-zinc-400">{post.h1}</span>
              </>
            ) : (
              <span className="text-zinc-400">{post.category}</span>
            )}
          </nav>

          <header className="mt-6 border-b border-white/10 pb-10">
            <p className="text-teal text-xs font-semibold tracking-wider uppercase">
              {post.category}
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
              {post.h1}
            </h1>
            <p className="mt-4 text-lg text-zinc-400">{post.description}</p>
            <p className="mt-6 text-sm text-zinc-600">
              <time dateTime={post.date}>{post.date}</time>
              {post.updated !== post.date ? (
                <>
                  {" "}
                  · Updated <time dateTime={post.updated}>{post.updated}</time>
                </>
              ) : null}
              {" · "}
              {post.readingTimeMinutes} min read
              {" · "}
              {post.author}
            </p>
            {designedArticle || heavySleeperAlarmPost ? null : (
              <div className="border-teal/30 bg-teal/10 mt-6 rounded-2xl border p-4 sm:p-5">
                <p className="text-sm font-semibold text-white">
                  Want to apply this guide today?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  Install SyncUpAlarm and run this routine with a shared iPhone
                  wake setup.
                </p>
                <p className="mt-3">
                  <Link
                    href="/download"
                    className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                  >
                    Download SyncUpAlarm
                  </Link>
                </p>
              </div>
            )}
            <ShareBar title={post.title} url={`${SITE.domain}/blog/${slug}`} />
          </header>

          <div className="blog-content pt-10 pb-8">
            {iphoneGuideParts && iphoneChecklist ? (
              <>
                <MarkdownBody content={iphoneGuideParts.before} />
                <IphoneAlarmChecklistSection
                  section={iphoneChecklist}
                  headings={headings}
                />
                <MarkdownBody content={iphoneGuideParts.after} />
              </>
            ) : slug === DAYLIGHT_SAVING_SLUG ? (
              <DaylightSavingArticle
                content={post.content}
                related={relatedPosts}
                currentSlug={post.slug}
              />
            ) : slug === NEW_YEAR_WAKE_ROUTINE_SLUG ? (
              <DaylightSavingArticle
                content={post.content}
                related={relatedPosts}
                currentSlug={post.slug}
                ctaVariant="download"
              />
            ) : slug === SHARED_ALARM_COMPARISON_SLUG ? (
              <SharedAlarmComparisonArticle
                content={post.content}
                related={relatedPosts}
                currentSlug={post.slug}
              />
            ) : slug === HEAVY_SLEEPER_PARTNER_PROTOCOL_SLUG ? (
              <HeavySleeperPartnerProtocolArticle content={post.content} />
            ) : (
              <MarkdownBody
                content={post.content}
                inlineCta={
                  slug !== "shared-wake-agreement" &&
                  !heavySleeperAlarmPost &&
                  slug !== "calendar-vs-alarm-for-waking-up"
                }
              />
            )}
          </div>

          {heavySleeperAlarmPost ? (
            <>
              <div className="border-teal/30 bg-teal/10 mt-10 rounded-2xl border p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                  If you and your partner or roommate both use iPhone, SyncUp
                  lets you share one wake plan so a second person knows when
                  you&apos;re meant to be up.
                </p>
                <p className="mt-3">
                  <Link
                    href="/download"
                    className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                  >
                    Download SyncUpAlarm
                  </Link>
                </p>
              </div>
              <blockquote className="mt-8 border-l-2 border-purple/50 pl-4 text-sm italic text-zinc-500">
                <p>
                  SyncUp is not a medical device and isn&apos;t meant to
                  diagnose or treat sleep conditions. If you regularly sleep
                  through alarms or feel unusually tired, talk to a doctor. Keep
                  a backup alarm for anything critical.
                </p>
              </blockquote>
            </>
          ) : null}

          {designedArticle ? null : slug === IPHONE_ALARM_GUIDE_SLUG ? (
            <IphoneGuideRelated related={relatedPosts} />
          ) : (
            <RelatedPosts currentSlug={post.slug} related={relatedPosts} />
          )}

          <footer className="mt-10 border-t border-white/10 pt-10">
            <Link
              href="/blog"
              className="text-teal text-sm font-medium hover:underline"
            >
              ← All journal posts
            </Link>
          </footer>
        </article>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </main>
  );
}

const checklistHeadingClass =
  "scroll-mt-24 text-xl font-semibold tracking-tight text-white sm:text-2xl";
const checklistCardClass =
  "rounded-2xl border border-white/10 bg-zinc-950/50 p-5 sm:p-6";
const checklistInfoCardClass =
  "rounded-2xl border border-white/10 bg-zinc-950/40 p-6";
const checklistGridClass = "mt-4 grid gap-4 sm:grid-cols-2";
const checklistBodyClass = "text-sm leading-7 text-zinc-400 sm:text-base";
const titleCardClass =
  "group block h-full rounded-2xl border border-white/10 bg-zinc-950/40 p-6 transition-all hover:-translate-y-0.5 hover:border-purple/30 hover:bg-zinc-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60";

const IPHONE_GUIDE_RELATED_CARDS = [
  {
    href: "/blog/backup-alarm-when-the-phone-dies",
    title: "Backup alarm when the phone dies",
  },
  {
    href: "/blog/how-to-wake-up-a-heavy-sleeper",
    title: "How to wake up a heavy sleeper",
  },
  {
    href: "/blog/partner-alarm-sync-iphone-guide",
    title: "Partner alarm sync on iPhone (shared alarm)",
  },
  {
    href: "/blog/guides/iphone-alarms",
    title: "iPhone alarms guide hub",
  },
] as const;

function TitleLinkCard({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className={titleCardClass}>
      <p className="font-display group-hover:text-purple text-lg font-semibold tracking-tight text-white">
        {title}
      </p>
    </Link>
  );
}

function InlineSegments({ segments }: { segments: InlineSegment[] }) {
  return segments.map((segment, index) => {
    if (segment.type === "text") {
      return <span key={index}>{segment.value}</span>;
    }
    const external = segment.href.startsWith("http");
    return (
      <a
        key={`${segment.href}-${index}`}
        href={segment.href}
        className="text-teal decoration-teal/40 hover:text-purple underline underline-offset-2"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {segment.label}
      </a>
    );
  });
}

function IphoneAlarmChecklistSection({
  section,
  headings,
}: {
  section: IphoneAlarmChecklist;
  headings: HeadingItem[];
}) {
  const idFor = (text: string) =>
    headings.find((heading) => heading.text === text)?.id;

  return (
    <section className="mt-12" aria-labelledby={IPHONE_ALARM_CHECKLIST_ID}>
      <h2 id={IPHONE_ALARM_CHECKLIST_ID} className={checklistHeadingClass}>
        {IPHONE_ALARM_CHECKLIST_H2}
      </h2>
      <div className={`mt-4 ${checklistInfoCardClass}`}>
        <p className={checklistBodyClass}>{section.intro}</p>
      </div>
      <div className={`mt-4 ${checklistInfoCardClass}`}>
        <p className={checklistBodyClass}>{section.disclaimer}</p>
      </div>
      <ol className={checklistGridClass}>
        {section.steps.map((step, index) => (
          <li key={step.title} className={checklistCardClass}>
            <p className="text-purple text-xs font-semibold tracking-wider uppercase">
              Step {index + 1}
            </p>
            <h3
              id={idFor(step.title)}
              className="mt-2 scroll-mt-24 text-lg font-semibold text-white"
            >
              {step.title}
            </h3>
            <p className={`mt-3 ${checklistBodyClass}`}>{step.body}</p>
            {step.source.length > 0 ? (
              <p className={`mt-3 ${checklistBodyClass}`}>
                <InlineSegments segments={step.source} />
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <div className={checklistGridClass}>
        <div>
          <p className={checklistBodyClass}>{section.closing}</p>
          {section.closingSource.length > 0 ? (
            <p className={`mt-3 ${checklistBodyClass}`}>
              <InlineSegments segments={section.closingSource} />
            </p>
          ) : null}
        </div>
        {section.besideNote ? (
          <TitleLinkCard
            href={section.besideNote.href}
            title={section.besideNote.title}
          />
        ) : null}
      </div>
      <p className="mt-8 text-base font-semibold text-white">
        {IPHONE_ALARM_BACKUP_GRID_LABEL}
      </p>
      <ul className={checklistGridClass}>
        {section.backupCards.map((card) => (
          <li key={card.href}>
            <TitleLinkCard href={card.href} title={card.title} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function IphoneGuideRelated({ related }: { related: BlogPost[] }) {
  const briefHrefs = new Set<string>(
    IPHONE_GUIDE_RELATED_CARDS.map((card) => card.href),
  );
  const extras = related.filter(
    (post) => !briefHrefs.has(`/blog/${post.slug}`),
  );

  return (
    <section className="mt-10" aria-labelledby="related-posts-heading">
      <h2
        id="related-posts-heading"
        className="text-lg font-semibold text-white"
      >
        Related posts
      </h2>
      <ul className="mt-4 grid gap-6 sm:grid-cols-2">
        {IPHONE_GUIDE_RELATED_CARDS.map((card) => (
          <li key={card.href}>
            <TitleLinkCard href={card.href} title={card.title} />
          </li>
        ))}
        {extras.map((post) => (
          <li key={post.slug}>
            <TitleLinkCard href={`/blog/${post.slug}`} title={post.title} />
          </li>
        ))}
      </ul>
    </section>
  );
}
