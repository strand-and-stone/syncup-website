import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { APP_DOWNLOAD_PATH, SITE } from "@/lib/constants";

const description =
  "Learn why SyncUpAlarm was built, who it is for, and how the team approaches partner alarm sync on iPhone.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "SyncUpAlarm Team",
  worksFor: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
  },
  url: `${SITE.domain}/about`,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.companyLegalName,
  url: SITE.domain,
  email: SITE.supportEmail,
  description:
    "SyncUpAlarm builds iPhone tools that help two people keep shared morning routines with less friction.",
};

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${SITE.name}`,
    description,
    url: `${SITE.domain}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={[personJsonLd, organizationJsonLd]} />

      <p className="text-sm font-semibold uppercase tracking-widest text-purple">About</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Built for shared mornings
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        SyncUpAlarm started from a simple problem: two people care about waking up together,
        but daily coordination is easy to miss when life is busy or distance gets involved.
      </p>

      <section className="mt-10 space-y-4 text-sm leading-7 text-zinc-400 sm:text-base">
        <p>
          We build for practical relationship logistics, not hype. The product focuses on
          paired wake-up alignment for iPhone and is designed to reduce friction around
          routine planning, shift changes, and long-distance mornings.
        </p>
        <p>
          Our approach is straightforward: clear product limits, transparent support pages,
          and useful guides that help people build routines they can actually keep.
        </p>
        <p>
          SyncUpAlarm is not medical sleep advice and not relationship therapy. It is a
          routine tool for people who want less coordination noise and more consistent
          mornings.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
        <h2 className="text-xl font-semibold text-white">Who we build for</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-400 sm:text-base">
          <li>Long-distance couples who want a daily anchor</li>
          <li>Shift-worker households managing changing schedules</li>
          <li>Roommates and friends who share morning routines</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-teal/30 bg-teal/10 p-6">
        <h2 className="text-xl font-semibold text-white">Contact and next steps</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
          Questions or feedback? Email{" "}
          <a href={`mailto:${SITE.supportEmail}`} className="text-teal hover:underline">
            {SITE.supportEmail}
          </a>
          . If you are ready to test the product, download from the App Store.
        </p>
        <p className="mt-4">
          <Link
            href={APP_DOWNLOAD_PATH}
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>
    </main>
  );
}
