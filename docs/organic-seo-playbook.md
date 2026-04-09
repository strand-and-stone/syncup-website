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
| Relationships & distance | Emotional + practical “parallel mornings” | `long-distance-couple-alarm-guide` |
| Product / platform | Credible explanation of AlarmKit & reliability | `alarmkit-partner-alarms-iphone` |
| Household logistics | Shift work, roommates, fairness | `shift-work-shared-morning-routine` |
| Supporting | Checklists, first-week setup | `partner-alarm-first-week-checklist` |

**Next ideas** (briefs only—write when you have a sharp angle): time-zone math for couples, “snooze culture,” privacy of shared schedules, comparison with calendar-only workflows (without trashing competitors).

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

*Last updated: 2026-04-08*
