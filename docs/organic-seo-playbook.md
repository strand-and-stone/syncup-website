# Organic SEO & content playbook — SyncUpAlarm

This is an **editorial and growth playbook** for syncupalarm.com. It is designed around **E-E-A-T** (experience, expertise, authoritativeness, trustworthiness) and **useful content**—not tricks, not “AI slop,” and not promises we cannot keep.

## Principles (non-negotiable)

1. **Humans review before publish.** Every article gets a second read for tone, facts, and claims. Tools may draft; people ship.
2. **Name limitations.** Sleep, shift work, and relationships are sensitive. We say when an app helps logistics—not feelings, therapy, or medicine.
3. **One primary intent per URL.** Each journal post answers a specific question (e.g. long-distance rhythm, AlarmKit context, shift-work logistics).
4. **Internal links are editorial.** Link to `/`, `/blog/*`, `/privacy`, `/terms`, and in-page anchors (`/#features`) where they genuinely help the reader.
5. **External links earn trust.** Prefer primary sources (e.g. Apple developer documentation) over random blogs.

## What we avoid (quality & policy)

- **Thin pages**: templated “10 tips” with no examples, no tradeoffs, no structure.
- **Keyword stuffing** and **doorway** patterns (many near-duplicate geo or intent pages).
- **Undisclosed AI**: if generative tools are used in drafting, the final copy must be **edited** so it reflects real product knowledge and a consistent voice.
- **Medical overreach**: no diagnosing insomnia, sleep apnea, etc. Point to clinicians when needed.
- **“Undetectable AI” framing**: optimizing to evade search quality systems is a losing strategy. Optimize for **reader value**; rankings follow.

## Topic clusters (current)

| Pillar | Role | Example slugs |
|--------|------|----------------|
| Relationships & distance | Emotional + practical “parallel mornings” | `long-distance-couple-alarm-guide`, `long-distance-couple-morning-routine` |
| Sleep science & routines | Research-backed guidance without medical overreach | `chronotypes-couples-sleep-compatibility`, `snooze-button-science` |
| Product / platform | Credible explanation of iPhone alarms, AlarmKit, Partner Sync, and reliability | `iphone-alarms-complete-guide`, `partner-sync-wake-challenge`, `alarmkit-partner-alarms-iphone` |
| Supporting | Checklists, agreements, privacy, and pause rules | `partner-alarm-first-week-checklist`, `shared-wake-agreement`, `privacy-of-shared-alarm-schedules`, `when-not-to-sync-an-alarm` |
| Household logistics | Shift work, roommates, workouts, travel weeks | `shift-work-shared-morning-routine`, `roommate-quiet-hours-agreement`, `workout-partner-morning-alarm`, `one-person-traveling-partner-alarm` |
| Platform details | Watch, accessibility, calendars, daylight saving, dead phones | `apple-watch-and-shared-wake-routines`, `accessible-iphone-alarm-cues`, `calendar-vs-alarm-for-waking-up`, `daylight-saving-shared-alarms`, `backup-alarm-when-the-phone-dies` |
| Hubs | Cluster entry points for search and assistants | `/blog/guides/long-distance-mornings`, `/blog/guides/iphone-alarms`, `/blog/guides/shared-wake-routines` |

**Next ideas** (briefs only—write when you have a sharp angle): Apple Watch sleep stages versus alarm cues (without health claims), Focus filters for a shared household, and what to do when one person uses Android.

## Distribution

Content stays public. The conversion is the App Store via `/download`, not an email gate. The growth loop is partner-forward: a reader should be able to send a page to the other person.

- **Hubs** at `/blog/guides/*` are the impression layer. They summarize a cluster and link to supporting posts.
- **Share bar** on posts copies the link, opens Messages, or shares to X. The label is “Send this to your partner.”
- **No gated posts, countdown popups, or fake urgency.** Rankings and assistant citations depend on pages a crawler can read.
- **One end-of-guide download CTA** on hubs. Do not add doorway pages that repeat the same intent with a new city or keyword.

## On-page SEO checklist

- **Title & H1**: clear promise; match search intent; avoid clickbait.
- **Meta description**: specific; 150–160 chars where possible; no duplicate across posts.
- **Canonical**: set per route (`/blog`, `/blog/[slug]`).
- **Schema**: `Blog` on index; `BlogPosting` + `BreadcrumbList` on articles (implemented in code).
- **Sitemap**: `/blog`, all posts, `/rss.xml`, `/llms.txt` included.
- **RSS**: `/rss.xml` for subscribers and some aggregators.

## LLM / AI assistant visibility

- **`/llms.txt`**: factual summary, key URLs, contact—refresh when sections change.
- **Structured data**: Organization, WebSite, SoftwareApplication (home); Blog + BlogPosting (journal).
- **Clear headings and extractable facts** in prose (helps summarization) without sounding like an outline generator.

## Measurement

- **Google Search Console**: monitor impressions, queries, and coverage; fix soft 404s and mobile issues quickly.
- **GA4** (G-TVH2BHSQ6E): landing pages, scroll or engagement if configured—use to see which posts retain readers.
- **Refresh cadence**: revisit top posts every **6–12 months** for accuracy (iOS changes, AlarmKit notes, product copy).

## Ownership

- **Content**: SyncUpAlarm team + named reviewer on publish.
- **Technical SEO**: repo (`app/sitemap.ts`, metadata, schema, RSS).

---

*Last updated: 2026-09-30*
