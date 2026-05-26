import type { HeadingItem } from "@/lib/blog/headings";

type TableOfContentsProps = {
  headings: HeadingItem[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
        On this page
      </h2>
      <ul className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm leading-6 text-zinc-400 transition-colors hover:text-teal ${
                heading.depth === 3 ? "pl-4" : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
