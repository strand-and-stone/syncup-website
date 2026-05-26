export type HeadingItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function headingId(text: string, used: Map<string, number>): string {
  const base = slugify(text) || "section";
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function getMarkdownHeadings(content: string): HeadingItem[] {
  const lines = content.split("\n");
  const used = new Map<string, number>();
  const headings: HeadingItem[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    const match = /^(##|###)\s+(.+)$/.exec(line);
    if (!match) {
      continue;
    }
    const depth = match[1] === "##" ? 2 : 3;
    const text = match[2].trim();
    if (!text) {
      continue;
    }
    headings.push({
      id: headingId(text, used),
      text,
      depth,
    });
  }

  return headings;
}
