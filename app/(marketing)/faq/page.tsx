import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { APP_DOWNLOAD_PATH, SITE, STORE_LINKS } from "@/lib/constants";

const faqs = [
  {
    question: "Does SyncUpAlarm work internationally?",
    answer:
      "Yes. SyncUpAlarm is designed for paired routines across cities and countries, including long-distance relationships and travel.",
  },
  {
    question: "What if one partner has Android?",
    answer:
      "SyncUpAlarm is currently iPhone only. Both people need iOS devices to use shared alarm sync.",
  },
  {
    question: "Does SyncUpAlarm use notifications or system alarms?",
    answer:
      "SyncUpAlarm is built around Apple AlarmKit and iOS alarm scheduling so wake behavior is more dependable than reminder-only flows.",
  },
  {
    question: "Will it drain my battery?",
    answer:
      "Normal usage is designed for daily routine reliability, not heavy background media usage. Battery impact varies by device settings and iOS behavior.",
  },
  {
    question: "Is SyncUpAlarm free?",
    answer:
      "Check the App Store listing for the latest pricing, free access details, and any in-app plan information.",
  },
  {
    question: "Can we use it in different time zones?",
    answer:
      "Yes. Time-zone coordination is one of the core use cases for couples, travelers, and rotating schedules.",
  },
  {
    question: "Can roommates use SyncUpAlarm too?",
    answer:
      "Yes. SyncUpAlarm works for any two people who want a shared morning routine, including roommates and close friends.",
  },
  {
    question: "What happens if I miss the alarm?",
    answer:
      "The app helps coordinate wake routines, but your local iPhone alarm behavior and device state still matter. Keep healthy sleep and charging habits for best consistency.",
  },
  {
    question: "Is this a sleep-health or medical app?",
    answer:
      "No. SyncUpAlarm is a routine and logistics product, not medical guidance or treatment for sleep conditions.",
  },
  {
    question: "Does SyncUpAlarm replace communication with my partner?",
    answer:
      "It reduces logistical back-and-forth about wake times, but it does not replace communication or relationship care.",
  },
  {
    question: "Is there a web version?",
    answer:
      "The public product experience is the iPhone app. The website provides guides, support pages, and download links.",
  },
  {
    question: "Where can I get setup help?",
    answer:
      "Start with the Journal for practical how-to guides, then contact support if you still need help.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common SyncUpAlarm questions about iPhone support, long-distance use, time zones, pricing, and setup.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ · ${SITE.name}`,
    description:
      "Everything you need to know before trying SyncUpAlarm with your partner or roommate.",
    url: `${SITE.domain}/faq`,
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={faqJsonLd} />

      <p className="text-sm font-semibold uppercase tracking-widest text-purple">FAQ</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        SyncUpAlarm questions, answered
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
        Quick, direct answers about paired alarms on iPhone, long-distance use, pricing,
        and setup limits.
      </p>

      <div className="mt-12 space-y-6">
        {faqs.map((faq, index) => (
          <section
            key={faq.question}
            className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-white">{faq.question}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">{faq.answer}</p>

            {(index + 1) % 3 === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">
                Ready to try it?{" "}
                <Link href={APP_DOWNLOAD_PATH} className="font-medium text-teal hover:underline">
                  Download from the App Store
                </Link>{" "}
                or read a{" "}
                <Link href="/blog" className="font-medium text-teal hover:underline">
                  setup guide in the Journal
                </Link>
                .
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-teal/30 bg-teal/10 p-6">
        <h2 className="text-xl font-semibold text-white">Still have questions?</h2>
        <p className="mt-2 text-sm leading-7 text-zinc-300">
          Email{" "}
          <a href={`mailto:${SITE.supportEmail}`} className="text-teal hover:underline">
            {SITE.supportEmail}
          </a>{" "}
          or install SyncUpAlarm on iPhone to try shared alarm sync directly.
        </p>
        <p className="mt-4">
          <Link
            href={STORE_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Open App Store
          </Link>
        </p>
      </div>
    </main>
  );
}
