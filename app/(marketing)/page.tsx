import type { Metadata } from "next";
import Link from "next/link";

import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";
import { SITE } from "@/lib/constants";

const title = "SyncUp: Alarm Clock App to Wake Up Together on iPhone";
const description =
  "SyncUp is an iPhone alarm clock app that syncs your alarm with a partner or friend, adds wake-up challenges, and uses Apple AlarmKit. Free to download.";

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

const PILLAR_GUIDES = [
  {
    href: "/blog/alarm-for-heavy-sleepers",
    title: "Alarm for Heavy Sleepers: What Actually Works",
  },
  {
    href: "/blog/wake-up-without-waking-partner",
    title: "How to Wake Up Without Waking Your Partner",
  },
  {
    href: "/blog/how-to-wake-up-a-heavy-sleeper",
    title: "How to Wake Up a Heavy Sleeper (Kindly, and for Good)",
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
          <ul className="mt-4 space-y-3">
            {PILLAR_GUIDES.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="hover:text-teal text-zinc-300"
                >
                  {guide.title}
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
