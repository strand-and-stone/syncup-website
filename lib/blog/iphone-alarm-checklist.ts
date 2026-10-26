export const IPHONE_ALARM_GUIDE_SLUG = "iphone-alarms-complete-guide";

export const IPHONE_ALARM_CHECKLIST_ID = "iphone-alarm-not-going-off-checklist";

export const IPHONE_ALARM_CHECKLIST_H2 =
  "iPhone alarm not going off: a checklist of steps Apple suggests checking";

export const IPHONE_ALARM_CHECKLIST_HOWTO_NAME =
  "iPhone alarm not going off: steps Apple suggests checking";

export const IPHONE_ALARM_BACKUP_GRID_LABEL =
  "Keep a backup alarm for anything critical";

export const HOW_PAIRING_BUTTON_SENTINEL = "SYNCUP_HOW_PAIRING_BUTTON";

const DST_CARD_HREF = "/blog/daylight-saving-shared-alarms";

export type InlineSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export type ChecklistLinkCard = { title: string; href: string };

export type ChecklistStep = {
  title: string;
  body: string;
  source: InlineSegment[];
  /** Body plus the visible source line, matching the rendered step copy. */
  text: string;
};

export type IphoneAlarmChecklist = {
  intro: string;
  disclaimer: string;
  steps: ChecklistStep[];
  closing: string;
  closingSource: InlineSegment[];
  besideNote: ChecklistLinkCard | null;
  backupCards: ChecklistLinkCard[];
};

export function inlineVisibleText(segments: InlineSegment[]): string {
  return segments
    .map((segment) => (segment.type === "link" ? segment.label : segment.value))
    .join("");
}

function parseInline(line: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of line.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) {
      segments.push({ type: "text", value: line.slice(last, start) });
    }
    segments.push({ type: "link", label: match[1], href: match[2] });
    last = start + match[0].length;
  }
  if (last < line.length) {
    segments.push({ type: "text", value: line.slice(last) });
  }
  return segments;
}

function parseCard(line: string): ChecklistLinkCard | null {
  const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(line);
  if (!match) {
    return null;
  }
  return { title: match[1], href: match[2] };
}

function finishStep(step: {
  title: string;
  paragraphs: string[];
  source: InlineSegment[];
}): ChecklistStep {
  const body = step.paragraphs.join(" ");
  const sourceText = inlineVisibleText(step.source);
  return {
    title: step.title,
    body,
    source: step.source,
    text: sourceText ? `${body} ${sourceText}` : body,
  };
}

export function checklistSection(content: string): string | null {
  const marker = `## ${IPHONE_ALARM_CHECKLIST_H2}`;
  const start = content.indexOf(marker);
  if (start === -1) {
    return null;
  }
  const next = content.indexOf("\n## ", start + marker.length);
  return next === -1 ? content.slice(start) : content.slice(start, next);
}

export function splitAroundIphoneChecklist(content: string): {
  before: string;
  after: string;
} {
  const section = checklistSection(content);
  if (section === null) {
    return { before: content, after: "" };
  }
  const start = content.indexOf(section);
  return {
    before: content.slice(0, start).trim(),
    after: content.slice(start + section.length).trim(),
  };
}

export function parseIphoneAlarmChecklist(
  content: string,
): IphoneAlarmChecklist | null {
  const section = checklistSection(content);
  if (section === null) {
    return null;
  }

  const lines = section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let intro = "";
  let disclaimer = "";
  let closing = "";
  let closingSource: InlineSegment[] = [];
  let mode: "pre" | "step" | "closing" = "pre";
  const steps: ChecklistStep[] = [];
  const cards: ChecklistLinkCard[] = [];
  let current: {
    title: string;
    paragraphs: string[];
    source: InlineSegment[];
  } | null = null;

  const pushCurrent = () => {
    if (!current) {
      return;
    }
    steps.push(finishStep(current));
    current = null;
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      continue;
    }
    if (line.startsWith("> ")) {
      intro = line.slice(2).trim();
      continue;
    }
    const card = parseCard(line);
    if (card) {
      cards.push(card);
      continue;
    }
    if (line.startsWith("### ")) {
      pushCurrent();
      current = { title: line.slice(4).trim(), paragraphs: [], source: [] };
      mode = "step";
      continue;
    }
    if (line.startsWith("[Source:") || line.startsWith("Source:")) {
      const source = parseInline(line);
      if (mode === "closing") {
        closingSource = source;
      } else if (current) {
        current.source = source;
      }
      continue;
    }
    if (line.startsWith("Per Apple Support, manually adjusting")) {
      pushCurrent();
      closing = line;
      mode = "closing";
      continue;
    }
    if (mode === "pre") {
      disclaimer = line;
      continue;
    }
    if (current) {
      current.paragraphs.push(line);
    }
  }
  pushCurrent();

  const besideNote = cards.find((card) => card.href === DST_CARD_HREF) ?? null;
  const backupCards = cards.filter((card) => card.href !== DST_CARD_HREF);

  return {
    intro,
    disclaimer,
    steps,
    closing,
    closingSource,
    besideNote,
    backupCards,
  };
}
