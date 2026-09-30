import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

import { headingId } from "@/lib/blog/headings";
import { APP_DOWNLOAD_PATH } from "@/lib/constants";

type MarkdownBodyProps = {
  content: string;
  inlineCta?: boolean;
};

export function MarkdownBody({ content, inlineCta = true }: MarkdownBodyProps) {
  const usedHeadingIds = new Map<string, number>();
  let paragraphCount = 0;

  const getHeadingText = (children: ReactNode): string => {
    if (typeof children === "string") {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(getHeadingText).join("");
    }
    if (
      typeof children === "object" &&
      children !== null &&
      "props" in children &&
      typeof children.props === "object" &&
      children.props !== null &&
      "children" in children.props
    ) {
      return getHeadingText(children.props.children as ReactNode);
    }
    return "";
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2
            id={headingId(getHeadingText(children), usedHeadingIds)}
            className="mt-12 scroll-mt-24 text-xl font-semibold tracking-tight text-white first:mt-0 sm:text-2xl"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={headingId(getHeadingText(children), usedHeadingIds)}
            className="mt-8 scroll-mt-24 text-lg font-semibold text-zinc-100"
          >
            {children}
          </h3>
        ),
        p: ({ children }) => {
          paragraphCount += 1;
          const showDownloadCallout =
            inlineCta && paragraphCount > 2 && paragraphCount % 5 === 0;

          return (
            <>
              <p className="mt-4 text-sm leading-[1.75] text-zinc-400 sm:text-base">
                {children}
              </p>
              {showDownloadCallout ? (
                <div className="mt-6 rounded-2xl border border-teal/30 bg-teal/10 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-white">Try this in real life</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                    If both people use iPhone, install SyncUpAlarm and run this routine with
                    a shared wake setup.
                  </p>
                  <p className="mt-3">
                    <a
                      href={APP_DOWNLOAD_PATH}
                      className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-200 sm:text-sm"
                    >
                      Download SyncUpAlarm
                    </a>
                  </p>
                </div>
              ) : null}
            </>
          );
        },
        a: ({ href, children }) => {
          const external = href?.startsWith("http");
          return (
            <a
              href={href}
              className="text-teal underline decoration-teal/40 underline-offset-2 hover:text-purple"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          );
        },
        ul: ({ children }) => (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-400 sm:text-base">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-400 sm:text-base">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-2 border-purple/50 pl-4 text-sm italic text-zinc-500">
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => (
          // Blog images are editorial illustrations, so keep rendering lightweight and fully described.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src ?? ""}
            alt={alt ?? ""}
            className="my-8 rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-purple/10"
            loading="lazy"
          />
        ),
        hr: () => <hr className="my-10 border-white/10" />,
        strong: ({ children }) => (
          <strong className="font-semibold text-zinc-200">{children}</strong>
        ),
        code: ({ className, children }) => {
          const inline = !className;
          if (inline) {
            return (
              <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.9em] text-teal">
                {children}
              </code>
            );
          }
          return <code className={className}>{children}</code>;
        },
        pre: ({ children }) => (
          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-zinc-950 p-4 text-sm text-zinc-300">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[280px] text-left text-sm text-zinc-400">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="border-t border-white/5 px-3 py-2">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
