import Link from "next/link";
import type { ReactNode } from "react";

import { BlogCard } from "@/components/blog/BlogCard";
import { getPostBySlug } from "@/lib/blog/get-posts";
import { getGuideBySlug } from "@/lib/blog/guides";
import { getMarkdownHeadings } from "@/lib/blog/headings";
import type { BlogPost } from "@/lib/blog/types";
import { blogPostOpenGraphImagePath } from "@/lib/structured-data/blog";

export const DAYLIGHT_SAVING_SLUG = "daylight-saving-shared-alarms";
export const NEW_YEAR_WAKE_ROUTINE_SLUG = "new-year-shared-wake-routine";

const APP_STORE_URL = "https://apps.apple.com/us/app/id6760364103";
const NEW_YEAR_DOWNLOAD_CTA =
  "If you both use iPhone, SyncUpAlarm lets you pair, set one wake plan, and test it before January 1.";

const sectionHeadingClass =
  "scroll-mt-24 text-xl font-semibold tracking-tight text-white sm:text-2xl";
const cardClass =
  "rounded-2xl border border-white/10 bg-zinc-950/50 p-5 sm:p-6";
const proseCardClass = "rounded-2xl border border-white/10 bg-zinc-950/40 p-6";
const cardGridClass = "mt-4 grid gap-4 sm:grid-cols-2";
const bodyTextClass = "text-sm leading-7 text-zinc-400 sm:text-base";

type QuoteBlock = { type: "quote"; text: string };
type ParagraphBlock = { type: "p"; text: string };
type BulletBlock = { type: "bullet"; text: string };
type LinkBlock = { type: "link"; label: string; href: string };
type Block = QuoteBlock | ParagraphBlock | BulletBlock | LinkBlock;

type H3Section = { heading: string; blocks: Block[] };
type H2Section = { heading: string; blocks: Block[]; h3s: H3Section[] };

type DaylightSavingArticleProps = {
  content: string;
  related: BlogPost[];
  currentSlug: string;
  ctaVariant?: "appStore" | "download";
};

function onlyLink(text: string): { label: string; href: string } | null {
  const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(text);
  if (!match) {
    return null;
  }
  return { label: match[1], href: match[2] };
}

function parseArticle(content: string): {
  intro: Block[];
  sections: H2Section[];
} {
  const intro: Block[] = [];
  const sections: H2Section[] = [];
  let section: H2Section | null = null;
  let h3: H3Section | null = null;

  const pushBlock = (block: Block) => {
    if (h3) {
      h3.blocks.push(block);
      return;
    }
    if (section) {
      section.blocks.push(block);
      return;
    }
    intro.push(block);
  };

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line) {
      continue;
    }
    if (line.startsWith("## ")) {
      section = { heading: line.slice(3).trim(), blocks: [], h3s: [] };
      sections.push(section);
      h3 = null;
      continue;
    }
    if (line.startsWith("### ")) {
      if (!section) {
        continue;
      }
      h3 = { heading: line.slice(4).trim(), blocks: [] };
      section.h3s.push(h3);
      continue;
    }
    if (line.startsWith("> ")) {
      pushBlock({ type: "quote", text: line.slice(2).trim() });
      continue;
    }
    if (line.startsWith("- ")) {
      const item = line.slice(2).trim();
      const link = onlyLink(item);
      pushBlock(
        link ? { type: "link", ...link } : { type: "bullet", text: item },
      );
      continue;
    }
    const link = onlyLink(line);
    pushBlock(link ? { type: "link", ...link } : { type: "p", text: line });
  }

  return { intro, sections };
}

function renderInline(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) {
      nodes.push(text.slice(last, start));
    }
    const href = match[2];
    const external = href.startsWith("http");
    nodes.push(
      <a
        key={`${href}-${index}`}
        href={href}
        className="text-teal decoration-teal/40 hover:text-purple underline underline-offset-2"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {match[1]}
      </a>,
    );
    index += 1;
    last = start + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

function Prose({ blocks }: { blocks: Array<QuoteBlock | ParagraphBlock> }) {
  return (
    <>
      {blocks.map((block) =>
        block.type === "quote" ? (
          <blockquote
            key={block.text}
            className="border-purple/50 mt-4 border-l-2 pl-4 text-sm leading-7 text-zinc-500 italic first:mt-0"
          >
            {renderInline(block.text)}
          </blockquote>
        ) : (
          <p key={block.text} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
            {renderInline(block.text)}
          </p>
        ),
      )}
    </>
  );
}

function DownloadCtaCard() {
  return (
    <section
      className="border-teal/30 bg-teal/10 mt-10 rounded-2xl border p-6"
      aria-label="Download SyncUpAlarm"
    >
      <p className="text-sm leading-7 text-zinc-300 sm:text-base">
        {NEW_YEAR_DOWNLOAD_CTA}
      </p>
      <p className="mt-4">
        <a
          href="/download"
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
        >
          Download SyncUpAlarm
        </a>
      </p>
    </section>
  );
}

function blogSlug(href: string): string {
  return href.replace(/^\/blog\//, "").replace(/\/$/, "");
}

const DISCLAIMER =
  "SyncUp is a scheduling tool, not a medical or safety device. Phone settings, time changes, battery and connectivity can affect any alarm, so for anything critical, keep a backup alarm. This article is general information, not medical advice.";

const PHONE_CLOCKS_HEADING =
  "What Apple and Google document about phone clocks";
const CHECKLIST_HEADING =
  "Night-before checklist for two people who share a schedule";

function textBlocks(blocks: Block[]) {
  return blocks.filter(
    (block): block is QuoteBlock | ParagraphBlock =>
      block.type === "p" || block.type === "quote",
  );
}

function linkBlocks(blocks: Block[]) {
  return blocks.filter((block): block is LinkBlock => block.type === "link");
}

function LinkedPostCard({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/blog/guides/")) {
    const guide = getGuideBySlug(
      href.slice("/blog/guides/".length).replace(/\/$/, ""),
    );
    const title = label;
    const description = guide?.description ?? "";
    const post: BlogPost = {
      slug: guide?.slug ?? href,
      title,
      h1: title,
      description,
      date: "",
      updated: "",
      author: "SyncUpAlarm",
      category: "Guides",
      keywords: [],
      schema: [],
      related: [],
      content: "",
      readingTimeMinutes: 1,
    };
    return (
      <BlogCard
        post={post}
        variant="hub"
        imageSrc="/opengraph-image"
        overrides={{ href, title, description }}
      />
    );
  }

  const post = getPostBySlug(blogSlug(href));
  if (!post) {
    return (
      <article className={cardClass}>
        <Link
          href={href}
          className="hover:text-teal text-lg font-semibold text-white"
        >
          {label}
        </Link>
      </article>
    );
  }

  return (
    <BlogCard
      post={post}
      variant="hub"
      imageSrc={blogPostOpenGraphImagePath(post.slug)}
    />
  );
}

function DaylightSavingRefresh({ content }: { content: string }) {
  const { intro, sections } = parseArticle(content);
  const headingIds = getMarkdownHeadings(content);
  let headingCursor = 0;
  const nextHeadingId = () => {
    const id = headingIds[headingCursor]?.id ?? `section-${headingCursor}`;
    headingCursor += 1;
    return id;
  };

  return (
    <div>
      {intro.length > 0 ? (
        <section className={proseCardClass}>
          <Prose blocks={textBlocks(intro)} />
        </section>
      ) : null}

      {sections.map((section) => {
        const id = nextHeadingId();
        const steps = section.h3s.map((item) => ({
          ...item,
          id: nextHeadingId(),
        }));
        const prose = textBlocks(section.blocks);
        const bullets = section.blocks.filter(
          (block): block is BulletBlock => block.type === "bullet",
        );
        const links = linkBlocks(section.blocks);
        const disclaimer = prose.find(
          (block) => block.type === "p" && block.text === DISCLAIMER,
        );

        if (section.heading === "FAQ") {
          return (
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className="mt-4 space-y-4">
                {steps.map((item) => {
                  const answer = textBlocks(item.blocks)
                    .filter(
                      (block): block is ParagraphBlock => block.type === "p",
                    )
                    .map((block) => block.text)
                    .join(" ");
                  return (
                    <li key={item.heading}>
                      <details open className={cardClass}>
                        <summary className="cursor-pointer">
                          <h3
                            id={item.id}
                            className="inline scroll-mt-24 text-lg font-semibold text-white"
                          >
                            {item.heading}
                          </h3>
                        </summary>
                        <p className={`mt-3 ${bodyTextClass}`}>{answer}</p>
                      </details>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        }

        if (section.heading === CHECKLIST_HEADING) {
          return (
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              {disclaimer ? (
                <div className="border-teal/30 bg-teal/10 mt-4 rounded-2xl border p-6">
                  <p className="text-sm leading-7 text-zinc-100 sm:text-base">
                    {disclaimer.text}
                  </p>
                </div>
              ) : null}
              <ul className={cardGridClass}>
                {steps.map((item) => (
                  <li key={item.heading} className="flex flex-col gap-4">
                    <div className={cardClass}>
                      <h3
                        id={item.id}
                        className="scroll-mt-24 text-lg font-semibold text-white"
                      >
                        {item.heading}
                      </h3>
                    </div>
                    {linkBlocks(item.blocks).map((link) => (
                      <LinkedPostCard
                        key={link.href}
                        href={link.href}
                        label={link.label}
                      />
                    ))}
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (section.heading === PHONE_CLOCKS_HEADING) {
          return (
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className={cardGridClass}>
                {steps.map((item) => (
                  <li key={item.heading} className="flex flex-col gap-4">
                    <div className={cardClass}>
                      <h3
                        id={item.id}
                        className="scroll-mt-24 text-lg font-semibold text-white"
                      >
                        {item.heading}
                      </h3>
                      <Prose blocks={textBlocks(item.blocks)} />
                    </div>
                    {linkBlocks(item.blocks).map((link) => (
                      <LinkedPostCard
                        key={link.href}
                        href={link.href}
                        label={link.label}
                      />
                    ))}
                  </li>
                ))}
              </ul>
              {prose.length > 0 ? (
                <div className={`mt-4 ${proseCardClass}`}>
                  <Prose blocks={prose} />
                </div>
              ) : null}
            </section>
          );
        }

        if (bullets.length > 0) {
          return (
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className={cardGridClass}>
                {bullets.map((bullet) => (
                  <li key={bullet.text} className={cardClass}>
                    <p className={bodyTextClass}>{renderInline(bullet.text)}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (
          links.length > 0 &&
          links.every((link) => link.href.startsWith("http"))
        ) {
          return (
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className={cardGridClass}>
                {links.map((link) => (
                  <li key={link.href} className={cardClass}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal text-lg font-semibold text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (links.length > 0) {
          return (
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <LinkedPostCard href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        return (
          <section
            key={section.heading}
            className={`mt-10 ${proseCardClass}`}
            aria-labelledby={id}
          >
            <h2 id={id} className={sectionHeadingClass}>
              {section.heading}
            </h2>
            <Prose blocks={prose} />
          </section>
        );
      })}

      <section className="border-teal/30 bg-teal/10 mt-10 rounded-2xl border p-6">
        <p>
          <Link
            href="/how-pairing-works"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            How pairing works
          </Link>
        </p>
      </section>
    </div>
  );
}

export function DaylightSavingArticle({
  content,
  related,
  currentSlug,
  ctaVariant = "appStore",
}: DaylightSavingArticleProps) {
  if (currentSlug === DAYLIGHT_SAVING_SLUG) {
    return <DaylightSavingRefresh content={content} />;
  }

  const { intro, sections } = parseArticle(content);
  const headingIds = getMarkdownHeadings(content);
  let headingCursor = 0;
  const nextHeadingId = () => {
    const id = headingIds[headingCursor]?.id ?? `section-${headingCursor}`;
    headingCursor += 1;
    return id;
  };

  const proseBlocks = (blocks: Block[]) =>
    blocks.filter(
      (block): block is QuoteBlock | ParagraphBlock =>
        block.type === "p" || block.type === "quote",
    );

  const relatedPosts = related
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 4);
  let insertedDownloadCta = false;

  return (
    <div>
      {intro.length > 0 ? (
        <section className={proseCardClass}>
          <Prose blocks={proseBlocks(intro)} />
        </section>
      ) : null}

      {sections.map((section) => {
        const id = nextHeadingId();
        const prose = proseBlocks(section.blocks);
        const bullets = section.blocks.filter(
          (block): block is BulletBlock => block.type === "bullet",
        );
        const links = section.blocks.filter(
          (block): block is LinkBlock => block.type === "link",
        );
        const blogLinks = links.filter((link) =>
          link.href.startsWith("/blog/"),
        );
        const sourceLinks = links.filter(
          (link) => !link.href.startsWith("/blog/"),
        );

        const shouldInsertDownloadCta =
          ctaVariant === "download" &&
          !insertedDownloadCta &&
          section.heading === "Internal links";
        const wrap = (node: ReactNode): ReactNode => {
          if (!shouldInsertDownloadCta) {
            return node;
          }
          insertedDownloadCta = true;
          return [<DownloadCtaCard key="download-cta" />, node];
        };

        if (section.h3s.length > 0) {
          return wrap(
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              {prose.length > 0 ? (
                <div className={`mt-4 ${proseCardClass}`}>
                  <Prose blocks={prose} />
                </div>
              ) : null}
              <ul className={cardGridClass}>
                {section.h3s.map((item) => {
                  const itemId = nextHeadingId();
                  return (
                    <li key={item.heading} className={cardClass}>
                      <h3
                        id={itemId}
                        className="scroll-mt-24 text-lg font-semibold text-white"
                      >
                        {item.heading}
                      </h3>
                      <Prose blocks={proseBlocks(item.blocks)} />
                    </li>
                  );
                })}
              </ul>
            </section>,
          );
        }

        if (bullets.length > 0) {
          return wrap(
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className={cardGridClass}>
                {bullets.map((bullet) => (
                  <li key={bullet.text} className={cardClass}>
                    <p className={bodyTextClass}>{renderInline(bullet.text)}</p>
                  </li>
                ))}
              </ul>
            </section>,
          );
        }

        if (sourceLinks.length > 0) {
          return wrap(
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className={cardGridClass}>
                {sourceLinks.map((link) => (
                  <li key={link.href} className={cardClass}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal text-lg font-semibold text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>,
          );
        }

        if (blogLinks.length > 0 && prose.length === 0) {
          return wrap(
            <section
              key={section.heading}
              className="mt-10"
              aria-labelledby={id}
            >
              <h2 id={id} className={sectionHeadingClass}>
                {section.heading}
              </h2>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {blogLinks.map((link) => {
                  const post = related.find(
                    (entry) => entry.slug === blogSlug(link.href),
                  );
                  return (
                    <li key={link.href}>
                      {post ? (
                        <BlogCard post={post} />
                      ) : (
                        <article className={cardClass}>
                          <a
                            href={link.href}
                            className="hover:text-teal text-lg font-semibold text-white"
                          >
                            {link.label}
                          </a>
                          {link.href === "/blog/guides" ? (
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                              Pillar hubs for shared wake routines, iPhone
                              alarms for two, and long-distance mornings.
                            </p>
                          ) : null}
                        </article>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>,
          );
        }

        return wrap(
          <section
            key={section.heading}
            className={`mt-10 ${proseCardClass}`}
            aria-labelledby={id}
          >
            <h2 id={id} className={sectionHeadingClass}>
              {section.heading}
            </h2>
            <Prose blocks={prose} />
          </section>,
        );
      })}

      {relatedPosts.length > 0 ? (
        <section className="mt-10" aria-labelledby="related-posts-heading">
          <h2
            id="related-posts-heading"
            className="text-lg font-semibold text-white"
          >
            Related posts
          </h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {ctaVariant === "appStore" ? (
        <section className="border-teal/30 bg-teal/10 mt-10 rounded-2xl border p-6">
          <p className="mt-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
            >
              Download SyncUp on the App Store
            </a>
          </p>
        </section>
      ) : null}
    </div>
  );
}
