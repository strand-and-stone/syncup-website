import type { Metadata } from "next";
import Link from "next/link";

import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";
import { SITE } from "@/lib/constants";

const title = "SyncUp: Shared Alarm App to Wake Up Together, iPhone";
const description =
  "SyncUp is a shared alarm app for iPhone. Pair with your partner or roommate, set one wake plan, and see changes on both phones. Built on AlarmKit.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    url: SITE.domain,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Partner alarm sync for iPhone`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  },
};

const GUIDE_CARDS = [
  {
    href: "/blog/daylight-saving-shared-alarms",
    title: "Clocks fall back Sun, Nov 1: check your shared alarm",
  },
  {
    href: "/blog/guides/shared-wake-routines",
    title: "Shared wake routines",
  },
  {
    href: "/blog/guides/iphone-alarms",
    title: "iPhone alarms",
  },
  {
    href: "/blog/alarm-for-heavy-sleepers",
    title: "Alarm for heavy sleepers",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <section
        aria-labelledby="guides-heading"
        className="border-t border-white/5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2
            id="guides-heading"
            className="text-xs font-semibold tracking-wider text-zinc-500 uppercase"
          >
            Guides
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_CARDS.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="group hover:border-purple/30 focus-visible:ring-teal/60 block h-full rounded-2xl border border-white/10 bg-zinc-950/40 p-6 transition-all hover:-translate-y-0.5 hover:bg-zinc-950/60 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <p className="font-display group-hover:text-purple text-lg font-semibold tracking-tight text-white">
                    {guide.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
