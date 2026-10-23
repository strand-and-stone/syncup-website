import type { Metadata } from "next";
import Link from "next/link";
import { AlarmClock, Globe, Users, type LucideIcon } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";

const title =
  "Guides: Shared mornings, iPhone alarms, and long-distance wake plans";
const description =
  "Hub for SyncUpAlarm guides: shared wake routines, iPhone alarms for two, and long-distance mornings — practical playbooks, not medical advice.";

const HUBS: Array<{
  href: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  tone: string;
}> = [
  {
    href: "/blog/guides/shared-wake-routines",
    title: "Shared wake routines",
    blurb: "Chronotypes, snooze rules, household agreements.",
    icon: Users,
    tone: "border-teal/40 bg-teal/5",
  },
  {
    href: "/blog/guides/iphone-alarms",
    title: "iPhone alarms for two",
    blurb: "Clock, Sleep Schedule, AlarmKit, Partner Sync.",
    icon: AlarmClock,
    tone: "border-purple/40 bg-purple/5",
  },
  {
    href: "/blog/guides/long-distance-mornings",
    title: "Long-distance mornings",
    blurb: "Time zones, wake windows, parallel mornings.",
    icon: Globe,
    tone: "border-flame/35 bg-flame/5",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} · ${SITE.name}`,
    description,
    url: `${SITE.domain}/blog/guides`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${SITE.name}`,
    description,
  },
};

export default function BlogGuidesHubPage() {
  const url = `${SITE.domain}/blog/guides`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      name: title,
      numberOfItems: HUBS.length,
      itemListElement: HUBS.map((hub, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: hub.title,
        url: `${SITE.domain}${hub.href}`,
      })),
    },
  };

  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:max-w-5xl lg:px-8"
    >
      <JsonLd data={jsonLd} />
      <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-teal">
          Home
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <Link href="/blog" className="hover:text-teal">
          Journal
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <span className="text-zinc-400">Guides</span>
      </nav>

      <p className="text-purple mt-6 text-sm font-medium tracking-widest uppercase">
        Guides
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <div className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
        <p className="text-base leading-relaxed text-zinc-400">
          These guides collect the SyncUpAlarm playbooks for shared mornings:
          wake routines, iPhone alarms for two people, and long-distance plans.
        </p>
        <p className="mt-3 text-base leading-relaxed text-zinc-400">
          SyncUpAlarm is an iPhone app that syncs a wake alarm between two
          people.
        </p>
        <p className="mt-3 text-base leading-relaxed text-zinc-400">
          The pages are general information, not medical advice.
        </p>
      </div>

      <section className="mt-12" aria-labelledby="guide-clusters-heading">
        <h2
          id="guide-clusters-heading"
          className="text-xs font-semibold tracking-wider text-zinc-500 uppercase"
        >
          Guide clusters
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <li key={hub.href}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-6 ${hub.tone}`}
                >
                  <span className="bg-bg ring-purple/30 flex h-11 w-11 items-center justify-center rounded-xl ring-1">
                    <Icon className="text-purple h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    <Link href={hub.href} className="hover:text-purple">
                      {hub.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {hub.blurb}
                  </p>
                  <p className="mt-5">
                    <Link
                      href={hub.href}
                      className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                    >
                      Open guide
                    </Link>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-teal/30 bg-teal/10 mt-12 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold text-white">
          Try a shared routine
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          Pick a guide, then test one wake time on both iPhones. SyncUpAlarm
          keeps that plan in the app instead of a nightly text.
        </p>
        <p className="mt-4">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>
    </main>
  );
}
