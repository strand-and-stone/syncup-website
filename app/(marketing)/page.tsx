import Link from "next/link";

import { Features } from "@/components/Features";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";

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
      <section aria-labelledby="guides-heading" className="border-t border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2
            id="guides-heading"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
          >
            Guides
          </h2>
          <ul className="mt-4 space-y-3">
            {PILLAR_GUIDES.map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} className="text-zinc-300 hover:text-teal">
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
