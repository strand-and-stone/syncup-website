export const SITE = {
  name: "SyncUpAlarm",
  domain: "https://syncupalarm.com",
  year: 2026,
  /** Legal / contact */
  companyLegalName: "SyncUpAlarm",
  supportEmail: "support@syncupalarm.com",
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
  { href: "#how-it-works", label: "How it Works" },
  { href: "#features", label: "Features" },
  { href: "/blog", label: "Journal" },
] as const;

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: `mailto:${SITE.supportEmail}`, label: "Support" },
] as const;

/** iOS App Store only (no Android listing). */
export const STORE_LINKS = {
  appStore: "https://apps.apple.com/app/syncupalarm",
} as const;

/**
 * When false, App Store buttons are non-clickable and show a coming-soon tooltip.
 * Set to true when the listing is live; also restores download URLs in JSON-LD.
 */
export const APP_STORE_CTA_LIVE = false;

/** Shown on hover/focus for disabled App Store CTAs. */
export const APP_STORE_COMING_SOON_TOOLTIP =
  "Coming soon — we’re hitting snooze on launch one more time. ⏰";

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Pair up",
    body: "Invite your partner and connect in seconds. No awkward morning texts required.",
    icon: "heart" as const,
  },
  {
    title: "Set once, sync forever",
    body: "Pick your wake time. We keep your alarms perfectly in lockstep—down to the second.",
    icon: "alarm" as const,
  },
  {
    title: "Rise together",
    body: "When one alarm fires, you both feel it. Same beat, same energy, same day.",
    icon: "sparkles" as const,
  },
] as const;

export const FEATURES = [
  {
    title: "Perfect sync",
    description:
      "Alarms align across iPhones so you and your partner wake as one.",
    icon: "zap" as const,
  },
  {
    title: "Gentle nudges",
    description: "Optional soft ramps and haptics that feel human, not harsh.",
    icon: "waves" as const,
  },
  {
    title: "Distance-proof",
    description: "Time zones? Travel? SyncUpAlarm keeps your rhythm connected.",
    icon: "globe" as const,
  },
  {
    title: "Private by design",
    description: "Your schedules stay yours. Encrypted sync, no creepy feeds.",
    icon: "shield" as const,
  },
  {
    title: "Playful streaks",
    description: "Little flame rewards when you both nail the morning—fun, not pressure.",
    icon: "flame" as const,
  },
  {
    title: "Widgets & shortcuts",
    description:
      "Glanceable status on your Home Screen and one-tap snooze when you need it.",
    icon: "layout-grid" as const,
  },
] as const;

export const WHO_ITS_FOR = [
  {
    title: "Long-distance couples",
    body: "Share mornings even when you’re cities—or continents—apart.",
  },
  {
    title: "Shift workers",
    body: "Coordinate wake-ups without the “did you get up?” anxiety spiral.",
  },
  {
    title: "Roommates & besties",
    body: "Keep routines aligned for workouts, trips, or just better vibes.",
  },
] as const;
