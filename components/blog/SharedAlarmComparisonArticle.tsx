import Link from "next/link";
import {
  AlarmClock,
  Globe,
  Moon,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

import { BlogCard } from "@/components/blog/BlogCard";
import { getMarkdownHeadings } from "@/lib/blog/headings";
import type { BlogPost } from "@/lib/blog/types";

export const SHARED_ALARM_COMPARISON_SLUG =
  "best-shared-alarm-apps-couples-2026";

const sectionHeadingClass =
  "scroll-mt-24 text-xl font-semibold tracking-tight text-white sm:text-2xl";
const cardClass =
  "rounded-2xl border border-white/10 bg-zinc-950/50 p-5 sm:p-6";
const proseCardClass = "rounded-2xl border border-white/10 bg-zinc-950/40 p-6";
const cardGridClass = "mt-4 grid gap-4 sm:grid-cols-2";
const bodyTextClass = "text-sm leading-7 text-zinc-400 sm:text-base";

const CRITERION_ICONS: Record<string, LucideIcon> = {
  "Shared schedules": Users,
  Reliability: AlarmClock,
  Privacy: Shield,
  "Cross-timezone": Globe,
  "Quiet modes": Moon,
};

type Criterion = { heading: string; body: string };
type ApproachPoint = { label: string; text: string };
type Approach = { heading: string; intro: string[]; points: ApproachPoint[] };
type FaqItem = { question: string; paragraphs: string[] };

type ParsedComparison = {
  intro: string[];
  criteria: Criterion[];
  approaches: Approach[];
  steps: string[];
  faqs: FaqItem[];
  closing: string[];
};

type SharedAlarmComparisonArticleProps = {
  content: string;
  related: BlogPost[];
  currentSlug: string;
};

function sectionLines(content: string): {
  intro: string[];
  sections: Map<string, string[]>;
} {
  const intro: string[] = [];
  const sections = new Map<string, string[]>();
  let current: string[] | null = null;

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line) {
      continue;
    }
    if (line.startsWith("## ")) {
      current = [];
      sections.set(line.slice(3).trim(), current);
      continue;
    }
    if (current) {
      current.push(line);
    } else {
      intro.push(line);
    }
  }

  return { intro, sections };
}

function parseH3(lines: string[]): Array<{ heading: string; lines: string[] }> {
  const blocks: Array<{ heading: string; lines: string[] }> = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      current = { heading: line.slice(4).trim(), lines: [] };
      blocks.push(current);
      continue;
    }
    current?.lines.push(line);
  }

  return blocks;
}

function parseApproachPoint(line: string): ApproachPoint | null {
  if (!line.startsWith("- ")) {
    return null;
  }
  const body = line.slice(2).trim();
  const splitAt = body.indexOf(": ");
  if (splitAt === -1) {
    return { label: "Note", text: body };
  }
  return {
    label: body.slice(0, splitAt).trim(),
    text: body.slice(splitAt + 2).trim(),
  };
}

function parseComparison(content: string): ParsedComparison {
  const { intro, sections } = sectionLines(content);
  const criteria = parseH3(sections.get("What to compare") ?? []).map(
    (block) => ({
      heading: block.heading,
      body: block.lines.filter((line) => !line.startsWith("- ")).join(" "),
    }),
  );

  const approaches = parseH3(
    sections.get("How each approach handles the checklist") ?? [],
  ).map((block) => ({
    heading: block.heading,
    intro: block.lines.filter((line) => !line.startsWith("- ")),
    points: block.lines
      .map(parseApproachPoint)
      .filter((point): point is ApproachPoint => point !== null),
  }));

  const steps = (sections.get("Run the checklist together") ?? [])
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());

  const faqs = parseH3(sections.get("FAQ") ?? []).map((block) => ({
    question: block.heading,
    paragraphs: block.lines.filter((line) => !line.startsWith("- ")),
  }));

  return {
    intro,
    criteria,
    approaches,
    steps,
    faqs,
    closing: (sections.get("Try a shared routine") ?? []).filter(
      (line) => !line.startsWith("- "),
    ),
  };
}

function withHeadingIds(content: string, parsed: ParsedComparison) {
  const headingIds = getMarkdownHeadings(content);
  let cursor = 0;
  const take = () => {
    const id = headingIds[cursor]?.id ?? `section-${cursor}`;
    cursor += 1;
    return id;
  };

  return {
    criteriaId: take(),
    criteria: parsed.criteria.map((criterion) => ({
      ...criterion,
      id: take(),
    })),
    approachesId: take(),
    approaches: parsed.approaches.map((approach) => ({
      ...approach,
      id: take(),
    })),
    stepsId: take(),
    faqId: take(),
    faqs: parsed.faqs.map((faq) => ({ ...faq, id: take() })),
    closingId: take(),
  };
}

export function SharedAlarmComparisonArticle({
  content,
  related,
  currentSlug,
}: SharedAlarmComparisonArticleProps) {
  const parsed = parseComparison(content);
  const ids = withHeadingIds(content, parsed);
  const relatedPosts = related
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 4);

  return (
    <div>
      <section className={proseCardClass}>
        {parsed.intro.map((paragraph) => (
          <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10" aria-labelledby={ids.criteriaId}>
        <h2 id={ids.criteriaId} className={sectionHeadingClass}>
          What to compare
        </h2>
        <ul className={cardGridClass}>
          {ids.criteria.map((criterion) => {
            const Icon = CRITERION_ICONS[criterion.heading] ?? AlarmClock;
            return (
              <li key={criterion.heading} className={cardClass}>
                <div className="flex items-start gap-4">
                  <span className="bg-bg ring-purple/30 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1">
                    <Icon className="text-purple h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3
                      id={criterion.id}
                      className="scroll-mt-24 text-lg font-semibold text-white"
                    >
                      {criterion.heading}
                    </h3>
                    <p className={`mt-2 ${bodyTextClass}`}>{criterion.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby={ids.approachesId}>
        <h2 id={ids.approachesId} className={sectionHeadingClass}>
          How each approach handles the checklist
        </h2>
        <div className="mt-4 grid gap-4">
          {ids.approaches.map((approach) => (
            <article key={approach.heading} className={cardClass}>
              <h3
                id={approach.id}
                className="scroll-mt-24 text-lg font-semibold text-white"
              >
                {approach.heading}
              </h3>
              {approach.intro.map((paragraph) => (
                <p key={paragraph} className={`mt-3 ${bodyTextClass}`}>
                  {paragraph}
                </p>
              ))}
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {approach.points.map((point) => (
                  <div
                    key={`${approach.heading}-${point.label}`}
                    className="rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3"
                  >
                    <dt className="text-teal text-xs font-semibold tracking-wider uppercase">
                      {point.label}
                    </dt>
                    <dd className={`mt-1 ${bodyTextClass}`}>{point.text}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby={ids.stepsId}>
        <h2 id={ids.stepsId} className={sectionHeadingClass}>
          Run the checklist together
        </h2>
        <ol className={cardGridClass}>
          {parsed.steps.map((step, index) => (
            <li key={step} className={cardClass}>
              <p className="text-purple text-xs font-semibold tracking-wider uppercase">
                Step {index + 1}
              </p>
              <p className={`mt-2 ${bodyTextClass}`}>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby={ids.faqId}>
        <h2 id={ids.faqId} className={sectionHeadingClass}>
          FAQ
        </h2>
        <div className="mt-4 grid gap-4">
          {ids.faqs.map((faq) => (
            <article key={faq.question} className={cardClass}>
              <h3
                id={faq.id}
                className="scroll-mt-24 text-lg font-semibold text-white"
              >
                {faq.question}
              </h3>
              {faq.paragraphs.map((paragraph) => (
                <p key={paragraph} className={`mt-3 ${bodyTextClass}`}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="mt-10" aria-labelledby="comparison-related-posts">
          <h2
            id="comparison-related-posts"
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

      <section
        className="border-teal/30 bg-teal/10 mt-10 rounded-2xl border p-6"
        aria-labelledby={ids.closingId}
      >
        <h2 id={ids.closingId} className={sectionHeadingClass}>
          Try a shared routine
        </h2>
        {parsed.closing.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base"
          >
            {paragraph}
          </p>
        ))}
        <p className="mt-4">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>
    </div>
  );
}
