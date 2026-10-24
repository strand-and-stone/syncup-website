import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

import { headingId } from "@/lib/blog/headings";

export const HEAVY_SLEEPER_PARTNER_PROTOCOL_SLUG = "how-to-wake-up-a-heavy-sleeper";

const sectionHeadingClass =
  "scroll-mt-24 text-xl font-semibold tracking-tight text-white sm:text-2xl";
const cardClass = "rounded-2xl border border-white/10 bg-zinc-950/50 p-5 sm:p-6";
const proseCardClass = "rounded-2xl border border-white/10 bg-zinc-950/40 p-6";
const cardGridClass = "mt-4 grid gap-4 sm:grid-cols-2";
const bodyTextClass = "text-sm leading-7 text-zinc-400 sm:text-base";

type MdLinkProps = { href?: string; children?: ReactNode };

function InlineMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <>{children}</>,
        a: ({ href, children }: MdLinkProps) => {
          const external = href?.startsWith("http");
          return (
            <a
              href={href}
              className="text-teal underline decoration-teal/40 underline-offset-2 hover:text-purple"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {children}
            </a>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-zinc-200">{children}</strong>
        ),
        code: ({ children }) => (
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.9em] text-teal">
            {children}
          </code>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

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

function stripListPrefix(line: string): string {
  if (line.startsWith("- ")) {
    return line.slice(2).trim();
  }
  const match = /^\d+\.\s+(.+)$/.exec(line);
  if (match) {
    return match[1].trim();
  }
  return line.trim();
}

type HeavySleeperPartnerProtocolArticleProps = {
  content: string;
};

export function HeavySleeperPartnerProtocolArticle({
  content,
}: HeavySleeperPartnerProtocolArticleProps) {
  const { intro, sections } = sectionLines(content);
  const usedHeadingIds = new Map<string, number>();
  const idFor = (text: string) => headingId(text, usedHeadingIds);

  const protocolLines = sections.get("Agree on the protocol before bed") ?? [];
  const protocolItems = protocolLines.filter((line) => line.startsWith("- ")).map(stripListPrefix);

  const gentleLines = sections.get("The gentle wake sequence (in person)") ?? [];
  const gentleSteps = gentleLines
    .filter((line) => /^\d+\.\s+/.test(line))
    .map(stripListPrefix);

  const stopLines = sections.get("How to stop being the full-time alarm clock") ?? [];
  const stopParagraphs = stopLines.filter((line) => !line.startsWith("- "));

  const remoteLines = sections.get("Waking someone from another city") ?? [];
  const remoteParagraphs = remoteLines.filter((line) => !line.startsWith("- "));

  const syncupLines = sections.get("Where SyncUp fits") ?? [];
  const syncupParagraphs = syncupLines.filter((line) => !line.startsWith("- "));

  const roommatesLines = sections.get("Roommates and teens") ?? [];
  const roommatesParagraphs = roommatesLines.filter((line) => !line.startsWith("- "));

  const talkLines = sections.get("Talk about it later, not at 7 a.m.") ?? [];
  const talkParagraphs = talkLines.filter((line) => !line.startsWith("- "));

  const faqLines = sections.get("FAQ") ?? [];
  const faqItems = parseH3(faqLines).map((block) => ({
    question: block.heading,
    answer: block.lines.filter((line) => !line.startsWith("- ") && !line.startsWith("|")).join(" "),
  }));

  const ctaLines = sections.get("Soft CTA") ?? [];
  const ctaParagraph = ctaLines.find((line) => !line.startsWith("- ")) ?? "";

  const disclaimerLines = sections.get("Disclaimer") ?? [];
  const disclaimerText = disclaimerLines.find((line) => !line.startsWith("- ")) ?? "";

  const protocolId = idFor("Agree on the protocol before bed");
  const gentleId = idFor("The gentle wake sequence (in person)");
  const stopId = idFor("How to stop being the full-time alarm clock");
  const remoteId = idFor("Waking someone from another city");
  const syncupId = idFor("Where SyncUp fits");
  const roommatesId = idFor("Roommates and teens");
  const talkId = idFor("Talk about it later, not at 7 a.m.");
  const faqId = idFor("FAQ");
  const faqWithIds = faqItems.map((item) => ({
    ...item,
    id: idFor(item.question),
  }));

  // Consume the remaining ids so our heading id sequence matches the markdown content.
  // These are not rendered as headings because the page uses designed cards for them.
  idFor("Soft CTA");
  idFor("Disclaimer");

  return (
    <div>
      <section className={proseCardClass}>
        {intro.map((paragraph) => (
          <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
            <InlineMarkdown text={paragraph} />
          </p>
        ))}
      </section>

      <section className="mt-10" aria-labelledby={protocolId}>
        <h2 id={protocolId} className={sectionHeadingClass}>
          Agree on the protocol before bed
        </h2>
        <div className={`mt-4 ${cardClass}`}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-400 sm:text-base">
            {protocolItems.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10" aria-labelledby={gentleId}>
        <h2 id={gentleId} className={sectionHeadingClass}>
          The gentle wake sequence (in person)
        </h2>
        <ol className={cardGridClass}>
          {gentleSteps.map((step, index) => (
            <li key={step} className={cardClass}>
              <p className="text-purple text-xs font-semibold tracking-wider uppercase">
                Step {index + 1}
              </p>
              <p className={`mt-2 ${bodyTextClass}`}>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby={stopId}>
        <h2 id={stopId} className={sectionHeadingClass}>
          How to stop being the full-time alarm clock
        </h2>
        <div className={cardClass}>
          {stopParagraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
              <InlineMarkdown text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby={remoteId}>
        <h2 id={remoteId} className={sectionHeadingClass}>
          Waking someone from another city
        </h2>
        <div className={cardClass}>
          {remoteParagraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
              <InlineMarkdown text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby={syncupId}>
        <h2 id={syncupId} className={sectionHeadingClass}>
          Where SyncUp fits
        </h2>
        <div className={cardClass}>
          {syncupParagraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
              <InlineMarkdown text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby={roommatesId}>
        <h2 id={roommatesId} className={sectionHeadingClass}>
          Roommates and teens
        </h2>
        <div className={cardClass}>
          {roommatesParagraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
              <InlineMarkdown text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby={talkId}>
        <h2 id={talkId} className={sectionHeadingClass}>
          Talk about it later, not at 7 a.m.
        </h2>
        <div className={cardClass}>
          {talkParagraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 first:mt-0 ${bodyTextClass}`}>
              <InlineMarkdown text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby={faqId}>
        <h2 id={faqId} className={sectionHeadingClass}>
          FAQ
        </h2>
        <div className="mt-4 grid gap-4">
          {faqWithIds.map((faq) => (
            <article key={faq.question} className={cardClass}>
              <h3 id={faq.id} className="scroll-mt-24 text-lg font-semibold text-white">
                {faq.question}
              </h3>
              <p className={`mt-3 ${bodyTextClass}`}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="border-teal/30 bg-teal/10 mt-10 rounded-2xl border p-6"
        aria-label="Download SyncUpAlarm"
      >
        <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{ctaParagraph}</p>
        <p className="mt-4">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
        <p className="text-sm leading-relaxed text-zinc-500">{disclaimerText}</p>
      </section>
    </div>
  );
}

