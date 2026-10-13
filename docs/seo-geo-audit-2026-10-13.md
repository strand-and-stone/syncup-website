# SEO and GEO audit — syncupalarm.com

**Date:** 13 October 2026  
**Scope:** audit only. This file does not change the site.  
**Sources:** repo at `ce190a8` (30 September 2026, “Publish the journal cluster and close the remaining SEO gaps”), live fetches of https://syncupalarm.com the same day, Google Search Console (Web, last 3 months, indexing snapshot 8 October 2026), and Bing Webmaster (captured 13 October 2026).

Search-volume figures below are the export numbers. They are not estimates from a keyword tool. A web-search sample on 13 October 2026 is labeled as a sample, not as Search Console.

## Verdict

Google already knows the site. It is choosing not to index it.

| Source | What it shows |
| --- | --- |
| GSC indexing, 8 Oct 2026 | **8 indexed**, **37 not indexed** |
| Not-indexed reasons | **Discovered – currently not indexed: 32.** Crawled – currently not indexed: 1. Page with redirect: 4 |
| Live sitemap | **41 URLs** |
| GSC performance, 3 months | **3 clicks, 66 impressions, 4.5% CTR, average position 25.8** |
| Pages with any impressions | Homepage **3 clicks / 65 impressions / 4.6% CTR / position 25.7**. `/blog/when-not-to-sync-an-alarm` **0 clicks / 1 impression / position 29** |
| Named queries | `linkup alarms` **21 impressions, position 41.9**. `syncup call` 2 / 46.5. `sync alarm` 1 / 24. `sync up` 1 / 59. `what is a syncup tracker` 1 / 60 |
| Bing site explorer | **21 indexed**, 0 errors. Last-6-months folder stats: 2 clicks, 37 impressions, 3 backlinks. Root: 1 click / 21 impressions. Press, about, FAQ, terms, and how-pairing-works are listed with no clicks |
| Bing search chart | After selecting 3 months, the chart only plotted 10–11 October 2026: **0 clicks, 0 impressions**. Treat that chart as a short window |
| Bing AI performance | **0 citations**, 0 grounding queries |

The arithmetic fits the sitemap. 8 indexed + 32 discovered-not-indexed + 1 crawled-not-indexed = 41, the sitemap count. The 4 “page with redirect” URLs sit outside that set. Google has the sitemap. Crawl priority and page quality are what is holding the other 33 URLs back.

Three months of query data do not show a demand problem for “partner alarm” yet, because those URLs are not indexed. Of the 26 impressions Google attached to a query string, **21 are `linkup alarms`**. The other named queries mix this product up with a calling product and a tracker. The only relevant non-brand query in the export is `sync alarm` (1 impression, position 24). Forty of the 66 impressions are anonymized, and 65 of 66 sit on the homepage.

Bing is ahead of Google on coverage (21 indexed URLs versus 8) and has not cited the site in Copilot. The pages Bing already lists — home, press, about, FAQ, terms, how pairing — are the early channel. They need answer-first copy, a real comparison table, and FAQ schema before any new URL is published.

## What to do first

Work in this order:

1. **Pass links from the URLs Google and Bing already treat as real** (homepage, and the Bing set: FAQ, about, press, terms, how pairing) into the 32 discovered URLs.
2. **Make the thin discovered pages substantive** so the single crawled-not-indexed URL, and the next crawl of the other 32, is worth keeping. Answer-first opening, one comparison table, visible FAQ that matches FAQ schema, and a source for any factual claim.
3. **Clean the sitemap and the 404 canonical** so the 41-URL set is only HTML documents Google should index, with honest `lastmod` values.
4. **Only then** publish a new URL. New pages are listed at the bottom of the content plan and are blocked on index coverage.

## Titles, meta descriptions, H1s

Live titles and H1s were fetched 13 October 2026. Child routes override the root canonical. The root title template is `%s · SyncUpAlarm`.

| URL | Title (length) | Meta description (length) | H1 |
| --- | --- | --- | --- |
| `/` | SyncUpAlarm — Wake up together on iPhone (40) | 130 | Same alarm. Both phones. |
| `/faq` | FAQ · SyncUpAlarm (17) | 112 | SyncUpAlarm questions, answered |
| `/about` | About · SyncUpAlarm (19) | 105 | Built for shared mornings |
| `/press` | Press Kit · SyncUpAlarm (23) | 99 | SyncUpAlarm media kit |
| `/how-pairing-works` | How SyncUpAlarm pairing works (29) | 124 | How SyncUpAlarm pairing works |
| `/blog` | Journal · SyncUpAlarm (21) | 118 | Mornings, distance, and the systems behind them |
| `/blog/guides/long-distance-mornings` | 67 with brand suffix | 127 | Same as the title stem |
| `/blog/guides/iphone-alarms` | 73 | 124 | Same as the title stem |
| `/blog/guides/shared-wake-routines` | 82 | 120 | Same as the title stem |
| `/blog/partner-alarm-sync-iphone-guide` | 76 | 151 | Matches the title stem |
| `/blog/iphone-alarms-complete-guide` | 106 | 140 | Matches the title stem |
| `/blog/snooze-button-science` | 117 | 125 | Matches the title stem |
| `/privacy`, `/terms` | 28 and 26 | 132 and 118 | Privacy Policy, Terms of Use |

Findings:

- One H1 per fetched page. Good.
- Homepage title is the only title that both matches a search query and stays short. The H1 does not. “Same alarm. Both phones.” gives Google and Copilot no entity and no task. The homepage is also the only URL with clicks (3 / 65 impressions).
- FAQ, About, Press, and Journal titles are labels, not queries. Bing already indexes FAQ, about, press, and terms, and those URLs have no clicks in the site explorer. The title is part of why.
- **27 of 29** journal posts render a `<title>` longer than 60 characters after the brand suffix. **23** are longer than 70. The snooze post renders at 117 characters. Guide H1s repeat “the SyncUpAlarm guide cluster,” which is internal language.
- Descriptions are mostly 110–160 characters. One post (`shift-work-shared-morning-routine`) is 169. Homepage (130), FAQ (112), About (105), and Press (99) are short for the only pages that currently earn impressions.
- The root `keywords` meta tag is ignored by Google. It does not need to grow.
- No current title, H1, or slug uses another company’s product name. Keep that rule on every refresh.

## Canonicals, robots, sitemap, indexability

**Canonicals.** Fetched indexable URLs canonicalize to themselves on `https://syncupalarm.com` with no trailing slash. `www` returns **308** to the apex (`/` and `/blog` checked). `http://syncupalarm.com/` returns **308** to HTTPS. `/download` returns **308** to `https://apps.apple.com/app/syncup-alarm/id6760364103`. `/support` returns **301** to `/faq`.

The 404 (`/this-page-does-not-exist-audit`) is `noindex` and its canonical is **`https://syncupalarm.com`**, inherited from `alternates.canonical: "/"` in `app/layout.tsx`. `app/not-found.tsx` sets `noindex` and does not override the canonical. A soft 404 that leaks this way consolidates into the only URL that has clicks.

**Robots.** Live `robots.txt` is:

```
User-Agent: *
Allow: /

Host: syncupalarm.com
Sitemap: https://syncupalarm.com/sitemap.xml
```

That allows Google, Bing, and assistant crawlers. There is no `Disallow` for `/api/`. `GET /api/webhooks/resend` returns 405. Low risk.

**Sitemap.** 41 URLs: homepage, journal index, 3 guide hubs, 29 posts, FAQ, about, press, how pairing, privacy, terms, and `/llms-full.txt`. Posts use their `updated` date. Every other URL shares `lastmod` `2026-09-30T20:57:59.035Z`, which is the build time of `ce190a8` (`new Date()` in `app/sitemap.ts`). `/llms.txt` and `/rss.xml` are not listed. The playbook still says they are.

`/llms-full.txt` is a text file inside the 41-URL set Google has discovered. It should not occupy a sitemap slot while 32 HTML URLs are waiting.

The 4 “page with redirect” rows match URLs that correctly redirect and are already absent from the sitemap (`/download`, `/support`, `www`, `http`, or trailing-slash variants). Leave them as redirects. Do not add them to the sitemap to “fix” the report.

**Index coverage, mapped:**

| State | Count | Meaning for this site |
| --- | --- | --- |
| Indexed | 8 | Performance export names only `/` and `/blog/when-not-to-sync-an-alarm`. The other six indexed URLs had no impressions in the export. Bing’s named set (home, press, about, FAQ, terms, how pairing) is the best public hint, and it is a different engine |
| Discovered – currently not indexed | 32 | In the sitemap, not yet crawled, or crawled so lightly they stay in this bucket. Internal links from the homepage are the missing priority signal. The site has 3 backlinks in Bing’s six-month folder stats |
| Crawled – currently not indexed | 1 | Google fetched one sitemap URL and did not keep it. The export does not name it. Inspect that row in the Pages report before rewriting at random. The shortest posts are the quality suspects (below) |
| Page with redirect | 4 | Expected. Not the bottleneck |

`/blog/when-not-to-sync-an-alarm` is the only journal URL with an impression (position 29). It is evidence that a specific post can surface once Google indexes it. It is 642 words. Do not merge or redirect it.

## Internal linking

The homepage is the only URL with equity: 3 clicks and 65 of 66 impressions. Its rendered internal links are `/`, `/#how-it-works`, `/#features`, `/blog`, `/download`, and the footer set `/faq`, `/about`, `/press`, `/privacy`, `/terms`. It does not link to a guide hub, to how pairing, or to any post.

Repo link graph:

- **`/how-pairing-works` has zero inbound internal links.** It is in the sitemap and Bing lists it. It is an orphan. This is the clearest “discovered, not important” URL on the site.
- Guide hubs are linked from `/blog` only. No post links up to `/blog/guides/*`.
- `long-distance-couple-alarm-guide` has **no** internal markdown links.
- Several posts link out only to `/download` or the homepage, so the cluster does not pass relevance between siblings.
- Nav has no FAQ, no pairing, no hubs. Footer has no Journal.

That pattern explains a sitemap full of discovered-not-indexed URLs. Google can see them. Nothing with impressions tells Google they matter.

**Link fix, in order:**

1. Homepage: one sentence definition, then links to the three hubs, `/how-pairing-works`, `/faq`, and the sync guide (`/blog/partner-alarm-sync-iphone-guide`). The audience blocks (long-distance, shift work, roommates) should link to the matching post or hub.
2. Footer on every page: Journal, the three hubs, How pairing works. FAQ, about, press, terms, and how pairing are the Bing-indexed set, so a footer link there is how those 21 Bing URLs share links with the Google-discovered set.
3. Every spoke links up to its hub and sideways to two siblings. Hubs already link down.
4. How pairing links to the sync guide and the iPhone hub, not only to FAQ, privacy, terms, and the AlarmKit post.

## Schema

Live `@type` values:

| URL | Types observed |
| --- | --- |
| `/` | Organization, WebSite, MobileApplication, Offer |
| `/faq` | Those, plus FAQPage |
| `/about` | Those, plus a second Organization and a **Person named “SyncUpAlarm Team”** |
| `/press`, `/privacy`, `/terms`, `/how-pairing-works` | Those, plus WebPage |
| Guide hubs | Those, plus BreadcrumbList and FAQPage |
| Journal posts | Those, plus BlogPosting, BreadcrumbList, and the extras declared in frontmatter (FAQPage, HowTo, ItemList) |

`getSoftwareApplicationJsonLd()` emits **`MobileApplication`**, not `SoftwareApplication`. Google has retired the software-app rich result, so this markup is for entity clarity and assistants. It still needs a stable `@id`, `url` (the App Store listing), `screenshot`, and `sameAs`. Offers hard-code Bypass $0.99, Pro Monthly $3.99, Pro Yearly $24.99, and Pro Lifetime $44.99. The App Store listing calls the $0.99 item paid snooze, and the FAQ says to check the store. Pick one public name and cite the listing.

Layout injects Organization, WebSite, and MobileApplication on every page. `getExtraBlogJsonLd()` injects MobileApplication again on any post whose body contains “syncupalarm”. That is almost every post. Duplicate app entities with no `@id`.

Other schema gaps:

- Organization has no `@id`, no `sameAs` to the App Store listing, and a logo pointed at `icon.svg`. About publishes a second Organization and a Person that is not a person. That Person node fights the disambiguation the query data is asking for.
- WebSite has no `@id` tying it to Organization.
- FAQPage on `/faq`, the three hubs, and posts that declare it. Visible FAQ questions on posts are `###` headings under `## FAQ`, and the parser skips bullets and tables. Google rarely shows FAQ rich results for this kind of site. **Keep the schema anyway.** Bing indexed 21 URLs and Copilot citations are 0. FAQ schema plus a visible question/answer is how those pages become citable. Answers must be the visible paragraph, not a trimmed fragment.
- HowTo steps copy the heading into `text` and drop the paragraph under the step.
- BlogPosting has no `image`, even though each post has a generated 1200×630 Open Graph image.
- BreadcrumbList exists on posts and hubs only. FAQ, about, press, privacy, terms, and how pairing have no breadcrumb. The visible blog trail shows the category in the last crumb; the schema shows the post title.
- Guide hubs have no `CollectionPage` or `Article` type. Breadcrumb + FAQ is a reasonable start once the hubs are actually crawled.

## Core Web Vitals risks

No Lighthouse or CrUX run was done for this audit. Risks are from the live HTML and the repo.

- The homepage HTML contains **26 inline `opacity:0` styles** from Framer Motion. The hero H1 and the LCP screenshot start hidden and animate in after hydration. That is the main LCP risk on the only URL with impressions.
- The navbar is a client component with scroll-linked `backdrop-filter`. Hero glow layers use large blurs. Both are paint cost on phones.
- The hero file is a **JPEG** (`FF D8`, 471×1024, 37 KB) at `public/images/hero-app-screenshot.png`, and the raw URL is served as `image/png`. The page preloads a `srcset` up to 3840w for a slot of about 286px and a source only 471px wide.
- Fonts are self-hosted with `next/font` and `display: swap` (Plus Jakarta Sans and Outfit). Two families, preloaded. Acceptable.
- Google tag / Tag Manager is present and loads `afterInteractive`. It is not render-blocking. It still competes with hydration on the homepage.
- Fix CWV after the indexation work. A faster homepage will not get the other 32 URLs crawled.

## Images, alt text, Open Graph

- Hero screenshot alt is descriptive: “SyncUp app on iPhone: next alarm, day selector, Shake challenge, weekly streak stats, and tab bar.” The alt says “SyncUp app,” which feeds the brand collision below. Logo alt is empty, with the wordmark beside it.
- App Store badge alt is “Download SyncUpAlarm on the App Store” when the badge is live. The badge is a remote SVG from `developer.apple.com`.
- Journal body images: two posts use the same SVG with a real alt (`partner-sync-challenge-loop.svg`). `MarkdownBody` falls back to `alt=""` when alt text is missing.
- Homepage Open Graph image is the generated 1200×630 PNG at `/opengraph-image`. Post pages emit a per-slug image. Guide pages point `og:image` at the generic image.
- **FAQ, about, press, journal index, how pairing, privacy, and terms set `openGraph` without `images`, and the live HTML has no `og:image`.** On `/faq`, `twitter:title` is still “SyncUpAlarm — Wake up together” (the root twitter title) and `twitter:image` is the homepage image, while `og:title` is the FAQ title. Replacing `openGraph` drops the inherited image, and the root `twitter.title` is a fixed homepage string. These are the Bing-indexed URLs. Their share cards do not describe the page.

## GEO readiness

`/llms.txt` (200, `text/plain`) and `/llms-full.txt` are real, specific, and careful about medical and Android limits. Nothing in the HTML links to them. `llms.txt` is not in the sitemap; `llms-full.txt` is. Refresh `llms.txt` when the entity sentence changes, and link it from the footer.

**Answer-first.** FAQ answers and several posts open with the answer (`partner-alarm-sync-iphone-guide` does). The homepage, about, press, and journal H1s open with a slogan. Guide hubs are closer: a lede plus a “The decision” section. Copilot citations are 0 on a site Bing has indexed. The indexed pages are the ones that read like slogans.

**Comparison tables.** All three guide hubs render a table. **Zero of 29 journal posts contain a markdown table.** `best-shared-alarm-apps-couples-2026` and `calendar-vs-alarm-for-waking-up` are comparisons written as headings. That is the format gap for Bing and Copilot.

**Cited facts.** Strong on `snooze-button-science`, `chronotypes-couples-sleep-compatibility`, `iphone-alarms-complete-guide`, `partner-sync-wake-challenge`, and `shared-wake-agreement` (DOIs and Apple Support). `how-pairing-works` cites the privacy policy, the FAQ, Apple’s AlarmKit docs, and the store id, and it refuses to invent offline or unpair behavior.

Weaker:

- `couples-waking-up-together-research` (476 words) links to PubMed **search** URLs, not papers.
- Posts whose only URL is the download link: travel-nurse, military, why-texting, the iPhone sync guide, the “best shared” comparison, roommate quiet hours, and the time-zone post.
- Homepage claims in `lib/constants.ts` are “Encrypted sync” and “perfectly in lockstep—down to the second.” The hero says “Same second.” `/how-pairing-works` says the page does not claim encryption or millisecond lockstep. Assistants will quote the homepage.

**Entity clarity.** The query export is an entity problem more than a keyword problem.

| Public name | Where |
| --- | --- |
| SyncUpAlarm | Site, schema, `llms.txt` |
| SyncUp app | Hero alt text |
| SyncUp: Partner Alarm Clock | App Store listing title. Slug on the store is `syncup-partner-alarm-clock`. In-app link in code is `syncup-alarm` |
| Bypass $0.99 | JSON-LD and the pairing page |
| Paid snooze $0.99 | App Store listing copy |

GSC, last 3 months, named queries:

- `linkup alarms` — 21 impressions, position 41.9
- `syncup call` — 2 impressions, position 46.5
- `what is a syncup tracker` — 1 impression, position 60
- `sync up` — 1 impression, position 59
- `sync alarm` — 1 impression, position 24

Put one definition in the first screen of `/`, `/about`, `/faq`, and `llms.txt`:

> SyncUpAlarm is an iPhone app that syncs a wake-up alarm between two people. It is not a phone-call app, not a GPS tracker, and not a shared Apple ID.

Then point `sameAs` at the canonical App Store URL for id `6760364103`. Do not create a URL aimed at “linkup” or “tracker.”

## Page quality inventory

Word counts are the markdown body after frontmatter.

| Words | Posts |
| --- | --- |
| Under 400 | `travel-nurse-partner-alarm-routine` (290), `military-couple-alarm-sync` (293), `why-texting-alarm-times-doesnt-work` (329) |
| 400–699 | 14 more, including the only journal URL with an impression (`when-not-to-sync-an-alarm`, 642) and both long-distance routines (595 and 428) |
| 700–899 | 7, including the sync guide (784) and the “best shared” comparison (702) |
| 1,500+ | `shared-wake-agreement`, `snooze-button-science`, `chronotypes-couples-sleep-compatibility`, `iphone-alarms-complete-guide`, `partner-sync-wake-challenge` |

Seventeen posts are under 700 words. None of them has a table. The five long posts are the ones that already look like something Bing could cite, and they are almost certainly inside the 32 discovered-not-indexed bucket. Linking them from the homepage matters more than adding a 33rd article.

`couples-waking-up-together-research` is the awkward one: it sounds like a source and cites a search page. Treat it as a thin page to repair, not as a pillar.

## Content plan

Ranked for **this** site’s data, not for generic keyword volume.

- **Demand** uses the GSC export when a number exists. Otherwise it is “unproven”: the SERP sample shows other sites targeting the query, and this domain has ~0 impressions for it because the URL is not indexed. No monthly search volumes are invented.
- **Win** assumes the indexation work above happens. A new URL cannot win while 32 existing URLs are undiscovered-in-practice.
- **When:** `Now` means refresh an existing sitemap URL. `Later` means do not publish until “Discovered – currently not indexed” is no longer most of the sitemap.
- Titles, H1s, and URLs below do not use another product’s brand.

### Now — refresh URLs Google has already discovered

| Rank | Page | Target query | Intent | Type | Demand and win | Internal links | Cited facts |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `/` homepage | sync alarm; brand disambiguation | Commercial | Refresh the first screen | **Data:** 65 impressions, 3 clicks, position 25.7. Named demand is mostly the wrong entity (`linkup alarms`, 21). **Win:** high. This is the only URL that can pass equity | Link to 3 hubs, `/how-pairing-works`, `/faq`, `/blog/partner-alarm-sync-iphone-guide` | **Yes.** One definition. Drop or source “encrypted” and “same second.” Name the store listing |
| 2 | `/faq` | SyncUpAlarm Android, time zones, price; “is this a tracker or a call app?” | Informational | Refresh FAQ | **Data:** Bing lists it, 0 clicks. GSC entity queries belong here in one sentence each. **Win:** high for Copilot once answers are specific | Homepage, pairing, iPhone hub, sync guide, terms | **Yes.** iOS 26 requirement and prices cited to the App Store listing. Android answer stays “iPhone only” |
| 3 | `/about` | what is SyncUpAlarm | Entity | Refresh | **Data:** `syncup call`, `what is a syncup tracker`, `linkup alarms`. Bing lists about, 0 clicks. **Win:** high as a disambiguation page, low as a traffic page | Homepage, FAQ, pairing, press, store | **Yes.** Store display name and id. Remove the fake Person schema on this page |
| 4 | `/how-pairing-works` | how pairing works SyncUpAlarm | How-to | Refresh | **Data:** Bing lists it, 0 clicks, and the repo has **no** internal links to it. **Win:** high after it is linked | Homepage, FAQ, sync guide, iPhone hub, privacy | **Yes.** Already sourced. Add a “shared / not shared” table. Do not invent offline or unpair behavior |
| 5 | `/blog/partner-alarm-sync-iphone-guide` | sync alarm; how to sync alarms with a partner on iPhone | How-to | Refresh | **Data:** `sync alarm` is the only relevant named query (1 impression, position 24), and this URL is the match. 784 words, no table, one external URL. **Win:** medium once indexed | Homepage, iPhone hub, pairing, FAQ, “best shared” post, AlarmKit post | **Yes.** AlarmKit vs notification (Apple docs). iOS version from the listing |
| 6 | `/blog/best-shared-alarm-apps-couples-2026` | shared alarm app for couples | Commercial comparison | Refresh | Unproven in GSC (not indexed). SERP sample is crowded with other product sites. **Win:** medium. A table of **approaches** (shared alarm app, two Clock alarms, calendar, text) can be cited; a brand-vs-brand list should not | iPhone hub, sync guide, calendar post, texting post, homepage | **Yes.** Score criteria in a table. Prices only for SyncUpAlarm, from the listing |
| 7 | `/blog/calendar-vs-alarm-for-waking-up` | calendar reminder vs alarm to wake up | Comparison | Refresh | Unproven in GSC. **Win:** medium-high. Apple’s own docs rank for “set an alarm”; the comparison is the winnable angle | iPhone hub, “best shared,” texting post, shared-wake agreement | **Yes.** Apple Support on Clock alarms vs calendar notifications |
| 8 | `/blog/why-texting-alarm-times-doesnt-work` | why texting alarm times fails | Problem | Refresh, thicken | 329 words. A likely quality reject if Google has crawled it. **Win:** medium after it is a real page | Sync guide, calendar post, shared-wake agreement, homepage | **Yes** if it claims memory or habit effects. Otherwise keep it practical and short of science |
| 9 | `/blog/when-not-to-sync-an-alarm` | when not to share an alarm | Informational | Refresh in place | **Data:** the only journal impression (1, position 29). **Win:** high relative to the rest of the journal. Do not change the URL | Homepage, shared-wake hub, shared-wake agreement, weekday rules | **Yes.** Keep the adult sleep-duration citation. Add a pause / keep / split table |
| 10 | `/blog/guides/iphone-alarms` | iPhone alarm for two people | Hub | Refresh links, not a rewrite | Hub is the crawl path for the iPhone cluster. **Win:** medium as a hub, low as a head-term page | Homepage and every iPhone spoke. Already links down, has a table and FAQ schema | **Yes.** Keep the Apple citations already in the hub copy |
| 11 | `/blog/guides/long-distance-mornings` | long distance morning routine | Hub | Refresh links | Same role for the distance cluster. **Win:** medium | Homepage audience block, the distance posts below | **Yes.** One sleep-duration citation, already drafted in the hub |
| 12 | `/blog/guides/shared-wake-routines` | shared wake routine couples | Hub | Refresh links | Same role for research and household posts. **Win:** medium | Homepage, snooze, chronotypes, shift, roommate, when-not-to-sync | **Yes.** Point at the posts that have DOIs |
| 13 | `/blog/long-distance-alarm-time-zones` | time zone alarm for couples | How-to | Refresh, thicken | 428 words, no external source for the math. **Win:** high once indexed; the SERP sample is thin explainers | Long-distance hub, morning-routine post, daylight-saving post, pairing | **Yes.** Worked examples need a time-zone source and a DST note |
| 14 | `/blog/long-distance-couple-morning-routine` | long-distance couple morning routine | Playbook | Refresh | 595 words and overlaps rank 15. **Win:** medium. Differentiate: this page is the weekly routine; rank 15 is the problem statement | Long-distance hub, time-zone post, shared-wake agreement | **Yes** if it states hours of sleep or a “fair” overlap |
| 15 | `/blog/long-distance-couple-alarm-guide` | waking up together long distance | Problem guide | Refresh links | 800 words and **no internal links**. **Win:** medium. Do not publish a third long-distance URL | Hub, ranks 13 and 14, chronotypes | Optional. Add sources only if it keeps research claims |
| 16 | `/blog/couples-waking-up-together-research` | science of couples waking together | Research | Repair citations | 476 words. Citations are PubMed search links. **Win:** low until the sources are real papers; high as a support page for Copilot after that | Shared-wake hub, chronotypes, snooze | **Yes.** Replace search URLs with specific papers |
| 17 | `/blog/shift-work-shared-morning-routine` | shift work partner morning | How-to | Refresh, add a table | 720 words, description is 169 characters. **Win:** medium | Shared-wake hub, travel-nurse, chronotypes, roommate post | **Yes** for any health sentence (CDC or NIOSH shift-work fact). No treatment claims |
| 18 | `/blog/travel-nurse-partner-alarm-routine` | travel nurse partner schedule | Niche how-to | Thicken | **290 words**, shortest post. **Win:** high in a narrow niche, after it looks complete | Shift post, long-distance hub, time-zone post | **Yes** if clinical schedules are described. A template table is enough |
| 19 | `/blog/military-couple-alarm-sync` | military couple different bases | Niche how-to | Thicken | **293 words.** **Win:** high in a narrow niche | Long-distance hub, time-zone post, “one person traveling” | **Yes.** Do not invent duty rules. Cite the time-zone method only |
| 20 | `/blog/partner-alarm-first-week-checklist` | first week shared alarm | Checklist | Refresh | 408 words. **Win:** medium as the page the sync guide sends people to | Sync guide, shared-wake agreement, pairing | Product steps must match pairing and the store listing |
| 21 | `/press` and `/terms` | brand / legal | Trust | Light refresh only | **Data:** Bing lists both, 0 clicks. **Win:** low for queries. Worth a one-sentence definition so Copilot does not cite a slogan or a liability clause as the product summary | About, FAQ, store, privacy | Store name on the press page. No new legal claims |

Also add a table and keep the existing FAQ blocks when touching `snooze-button-science`, `iphone-alarms-complete-guide`, `partner-sync-wake-challenge`, and `shared-wake-agreement`. They are already the substantive pages. They need links from the homepage and their hub more than they need more words.

### Later — new URLs, after the 32 are no longer stuck

Publish these only after a later indexing export shows the current sitemap being crawled. Each one needs an answer-first opening, a table, and FAQ schema on day one.

| Rank | Proposed URL | Target query | Intent | Type | Why it waits | Internal links | Cited facts |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 22 | `/blog/shared-alarm-without-a-shared-apple-id` | share an iPhone alarm without sharing an Apple ID | How-to | New guide | The sync guide (rank 5) should absorb this section first. A second URL now splits the one query that has an impression | iPhone hub, pairing, privacy post, FAQ | **Yes.** Apple Support on Clock being per-device |
| 23 | `/blog/shared-wake-plan-iphone-and-android` | partner alarm when one phone is Android | Limitation | New guide | FAQ already answers this. Expand that answer first. A new URL with no product to install is a thin page by default | FAQ, texting post, calendar post | **Yes.** iPhone-only requirement from FAQ and the store |
| 24 | `/blog/daylight-saving-when-only-one-place-changes` | daylight saving different countries couple | Seasonal how-to | New guide | Thicken `/blog/daylight-saving-shared-alarms` (642 words) first | That post, time-zone post, long-distance hub | **Yes.** A dated DST source for the year of publish |
| 25 | `/pricing` | SyncUpAlarm price | Commercial | New page | No price query in the export. Put a sourced price table on the FAQ first | FAQ, terms, homepage, store | **Yes.** Live App Store plan names. Resolve Bypass vs paid snooze before this exists |

Do not add `/blog/guides/household-mornings` yet. A fourth hub is another discovered-not-indexed URL. The three existing hubs are the household, distance, and iPhone paths.

Do not publish city pages, “vs {brand}” URLs, or a page targeting `linkup` or `tracker`.

## Prioritized fixes

Effort: **S** is a small template or copy change in a few files. **M** is a cross-page edit or a handful of articles. **L** is a pass across most of the journal.

### P0 — index the URLs Google has already discovered

| Fix | Effort | Why it is first |
| --- | --- | --- |
| Link the homepage, footer, and Bing-indexed pages to the three hubs, `/how-pairing-works`, the sync guide, and `/blog/when-not-to-sync-an-alarm`. Spokes link up to their hub | S | Homepage has 65 of 66 impressions. How pairing has zero inbound links. 32 URLs are discovered and not indexed |
| Thicken the shortest discovered posts and add an answer-first lede, one table, and a FAQ that matches the schema. Start with travel-nurse (290), military (293), why-texting (329), time zones (428), research citations (476), first-week checklist (408) | M for that set, L to do all 17 under 700 words | 1 URL was crawled and not indexed. 17 posts are under 700 words. 0 posts have a table. Copilot citations are 0 |
| Sitemap and canonical hygiene: remove `/llms-full.txt` from the sitemap; set `lastmod` from real content dates instead of build time; keep redirect URLs out of the sitemap; stop the 404 from canonicalizing to `/` | S | 41 sitemap URLs = 8 indexed + 32 discovered + 1 crawled-not-indexed. The text file should not be one of them. Identical `lastmod` values hide real updates |
| Disambiguate the entity on `/`, `/about`, `/faq`, and `llms.txt`. One definition. State that it is not a call app or a tracker. Align schema `sameAs` and the visible store name | S | 21 of 26 named impressions are `linkup alarms` (position 41.9), plus `syncup call` and `what is a syncup tracker` |
| Rewrite the pages Bing has already indexed (home, FAQ, about, how pairing) so the first paragraph answers the query, a table carries the comparison, and FAQ schema matches the visible text | M | Bing: 21 indexed, 0 Copilot citations, 0 clicks on the named secondary URLs |
| Make homepage claims match the pairing page: encryption and “same second” are either sourced or removed | S | The pairing page already refuses those claims. Assistants quote the homepage |

### P1 — after the crawl is moving

| Fix | Effort |
| --- | --- |
| Shorten rendered titles. Use a shorter template, or absolute titles, so posts are not 70–117 characters. Rewrite FAQ, About, Press, and Journal titles into queries | S |
| Restore a page-specific `og:image` and twitter title on FAQ, about, press, journal, pairing, privacy, and terms | S |
| Schema graph: one Organization `@id`, app node as `SoftwareApplication` (MobileApplication can stay as an extra type) with store `url`, screenshot, and `sameAs`. Delete the Person node. Stop emitting a second app entity on every post. Fill HowTo step text and BlogPosting `image` | M |
| Replace PubMed search links and download-only citations on the posts named above | M |
| Add breadcrumb schema and a visible trail on FAQ, about, press, and how pairing | S |
| Link `/llms.txt` in the footer and update it with the definition, iOS requirement, and store display name | S |

### P2 — after index coverage and the Bing pages

| Fix | Effort |
| --- | --- |
| Homepage LCP: do not ship the hero H1 and screenshot at `opacity: 0`. Reduce blur and backdrop-filter. Re-encode the hero as a real PNG or JPEG with a matching content type and a sane `sizes` | M |
| Publish ranks 22–25 only after a new indexing export shows the current 41 URLs moving out of “discovered – currently not indexed” | M |
| Named author or reviewer on research posts. The byline is “SyncUpAlarm Team” on all 29 posts | M |
| `Disallow: /api/` in robots. Optional, the route is a 405 | S |
| Update `docs/organic-seo-playbook.md` so it stops saying the sitemap includes `/llms.txt` and `/rss.xml` | S |

## Top 5

1. **P0, S.** Internal links from the homepage (3 clicks, 65 impressions) and from the Bing-indexed pages into the hubs, how pairing, and the sync guide. How pairing currently has no inbound links, and 32 sitemap URLs are discovered but not indexed.
2. **P0, M.** Make the thin discovered pages substantive: answer-first openings, a comparison table, and FAQ copy that matches FAQ schema. Start with the posts under 400 words. Zero journal posts have a table, and Copilot citations are 0.
3. **P0, S.** Sitemap and canonical hygiene: drop `/llms-full.txt`, stop shared build-time `lastmod`, and stop the 404 from canonicalizing to the homepage.
4. **P0, S.** Disambiguate SyncUpAlarm on the homepage, about, FAQ, and `llms.txt`. `linkup alarms` is 21 of 26 named impressions.
5. **P0, M.** Rewrite the pages Bing already indexed (home, FAQ, about, how pairing) for Copilot: the first paragraph answers the question, then a table, then the FAQ. Do that before any new URL.
