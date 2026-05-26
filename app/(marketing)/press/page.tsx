import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { APP_DOWNLOAD_PATH, SITE } from "@/lib/constants";

const description =
  "SyncUpAlarm press kit with product summary, brand assets, founder quote, and media contact details.";

const pressPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE.name} Press Kit`,
  description,
  url: `${SITE.domain}/press`,
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
  },
};

export const metadata: Metadata = {
  title: "Press Kit",
  description,
  alternates: { canonical: "/press" },
  openGraph: {
    title: `Press Kit · ${SITE.name}`,
    description,
    url: `${SITE.domain}/press`,
    type: "website",
  },
};

export default function PressPage() {
  return (
    <main
      id="main-content"
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={pressPageJsonLd} />

      <p className="text-sm font-semibold uppercase tracking-widest text-purple">Press</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        SyncUpAlarm media kit
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
        Everything needed to cover SyncUpAlarm quickly: what it is, who it is for, and where
        to download it.
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Platform</p>
          <p className="mt-2 text-lg font-semibold text-white">iPhone (iOS)</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Category</p>
          <p className="mt-2 text-lg font-semibold text-white">Lifestyle</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Core use case</p>
          <p className="mt-2 text-lg font-semibold text-white">Partner alarm sync</p>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
        <h2 className="text-xl font-semibold text-white">Short product description</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
          SyncUpAlarm helps two people synchronize wake-up alarms on iPhone so mornings feel
          less chaotic and more connected, including long-distance and shift-work scenarios.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
        <h2 className="text-xl font-semibold text-white">Founder quote</h2>
        <blockquote className="mt-3 border-l-2 border-teal/60 pl-4 text-sm italic leading-7 text-zinc-300 sm:text-base">
          &quot;We built SyncUpAlarm for people who care about shared mornings but do not
          want nightly coordination stress. The product is simple on purpose: less
          logistics, more consistency.&quot;
        </blockquote>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
        <h2 className="text-xl font-semibold text-white">Brand assets</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-400 sm:text-base">
          <li>App icon: <a href="/icon.svg" className="text-teal hover:underline">/icon.svg</a></li>
          <li>Open Graph image: <a href="/opengraph-image" className="text-teal hover:underline">/opengraph-image</a></li>
          <li>Twitter image: <a href="/twitter-image" className="text-teal hover:underline">/twitter-image</a></li>
          <li>Product guides: <Link href="/blog" className="text-teal hover:underline">Journal</Link></li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-teal/30 bg-teal/10 p-6">
        <h2 className="text-xl font-semibold text-white">Press contact</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
          For interviews, product context, and media requests, contact{" "}
          <a href={`mailto:${SITE.supportEmail}`} className="text-teal hover:underline">
            {SITE.supportEmail}
          </a>
          .
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
