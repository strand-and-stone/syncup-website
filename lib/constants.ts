const siteDomain =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://syncupalarm.com";

export const SITE = {
  name: "SyncUpAlarm",
  domain: siteDomain,
  year: 2026,
  /** Legal / contact */
  companyLegalName: "SyncUpAlarm",
  supportEmail: "robert@strandandstonellc.com",
} as const;

/**
 * Google Search Console
 *
 * - Domain property (DNS): TXT at the **apex** of syncupalarm.com.
 *   - Host / name: `@` (or blank / “@” depending on UI — not a subdomain).
 *   - Value: exactly `dnsTxt` (include the `google-site-verification=` prefix).
 * - URL-prefix property: `metadata.verification.google` in app/layout.tsx (HTML tag).
 *
 * If DNS is managed in Vercel:
 * `vercel dns add syncupalarm.com '@' TXT '<paste dnsTxt>'`
 */
export const GOOGLE_SITE_VERIFICATION = {
  metaContent: "m0rOKwEgjgJm2pbzTcXNH17U6YopUmTPjj0_1GA3MYI",
  dnsTxt:
    "google-site-verification=m0rOKwEgjgJm2pbzTcXNH17U6YopUmTPjj0_1GA3MYI",
} as const;

export const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#features", label: "Features" },
  { href: "/blog", label: "Journal" },
] as const;

export const FOOTER_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: `mailto:${SITE.supportEmail}`, label: "Support" },
] as const;

/** Official App Store listing (SyncUp Alarm). */
export const APP_STORE_URL =
  "https://apps.apple.com/app/syncup-alarm/id6760364103" as const;

/** iOS App Store only (no Android listing). */
export const STORE_LINKS = {
  appStore: APP_STORE_URL,
} as const;

/**
 * On-site redirect to the App Store (server 307). Use for campaigns / analytics:
 * `https://syncupalarm.com/download?utm_source=...`
 */
export const APP_DOWNLOAD_PATH = "/download" as const;

/**
 * When false, App Store buttons are non-clickable and show a coming-soon tooltip.
 * Set to true when the listing is live; also restores download URLs in JSON-LD.
 */
export const APP_STORE_CTA_LIVE = true;

/** Shown on hover/focus for disabled App Store CTAs. */
export const APP_STORE_COMING_SOON_TOOLTIP =
  "Coming soon — we’re hitting snooze on launch one more time. ⏰";

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Pair up",
    body: "Send a link. They join, and you're connected.",
    icon: "heart" as const,
  },
  {
    title: "Set one plan",
    body: "Pick a wake time once and it shows on both phones.",
    icon: "alarm" as const,
  },
  {
    title: "Wake together",
    body: 'Each phone rings its own alarm on the shared plan, so nobody has to text "u up?"',
    icon: "sparkles" as const,
  },
] as const;

export const FEATURES = [
  {
    title: "Shared plan",
    description:
      "One wake time across two iPhones; a change on one shows on the other.",
    icon: "zap" as const,
  },
  {
    title: "Gentle nudges",
    description: "Optional soft ramps and haptics.",
    icon: "waves" as const,
  },
  {
    title: "Time-zone aware",
    description: "Travel or long distance, the plan follows your time zones.",
    icon: "globe" as const,
  },
  {
    title: "Private by design",
    description:
      "Your wake plan is shared only with the person you pair with. See our privacy policy.",
    icon: "shield" as const,
  },
  {
    title: "Playful streaks",
    description: "Small rewards when you both get up on plan. Fun, not pressure.",
    icon: "flame" as const,
  },
  {
    title: "Widgets & shortcuts",
    description: "Glanceable status on your Home Screen.",
    icon: "layout-grid" as const,
  },
] as const satisfies readonly {
  title: string;
  description: string;
  icon: "zap" | "waves" | "globe" | "shield" | "flame" | "layout-grid";
}[];

export const WHO_ITS_FOR = [
  {
    title: "Couples",
    body: "Wake up together, or on a staggered plan you both can see.",
  },
  {
    title: "Long-distance & shift workers",
    body: "Coordinate mornings across cities and schedules.",
  },
  {
    title: "Roommates & friends",
    body: "Workouts, trips, and quiet-hour mornings.",
  },
] as const;
