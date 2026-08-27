import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/structured-data";

const title = "How SyncUpAlarm pairing works";
const description =
  "Invite with a link on two iPhones, iOS 26.0+, AlarmKit permission, what the privacy policy says is shared. Store IAP listed.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE.domain}/how-pairing-works` },
  openGraph: {
    title: `${title} · ${SITE.name}`,
    description,
    url: `${SITE.domain}/how-pairing-works`,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function HowPairingWorksPage() {
  const jsonLd = getWebPageJsonLd("/how-pairing-works", `${title} · ${SITE.name}`, description);

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />
      <article className="max-w-none">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          How SyncUpAlarm pairing works
        </h1>
        <p className="mt-5">
          <Link
            href="/download"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download
          </Link>
        </p>

        <p className="mt-6 text-sm leading-relaxed text-zinc-400">
          SyncUpAlarm is an iPhone app that pairs two people on a shared wake time. The{" "}
          <a href="https://syncupalarm.com/faq" className="text-teal hover:underline">
            FAQ
          </a>{" "}
          says both people need iPhones on <strong className="text-zinc-200">iOS 26.0+</strong>.
          There is no Android app.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          The{" "}
          <a
            href="https://apps.apple.com/us/app/syncup-partner-alarm-clock/id6760364103"
            className="text-teal hover:underline"
          >
            App Store listing
          </a>{" "}
          (id 6760364103) is the live storefront. In-app purchases on that listing are Bypass
          $0.99, Pro Monthly $3.99, Pro Yearly $24.99, and Pro Lifetime $44.99. The FAQ still says
          to check the store for the latest plan details.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">Invite with a link</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The{" "}
          <a href="https://syncupalarm.com/" className="text-teal hover:underline">
            homepage
          </a>{" "}
          describes pairing as “Drop a link. They join.” The{" "}
          <a href="https://syncupalarm.com/privacy" className="text-teal hover:underline">
            privacy policy
          </a>{" "}
          lists “partner link identifiers you choose to provide” under account and profile data.
          That is the cited invite path: one person shares a link, the other joins.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          This page does not invent extra pairing screens, QR codes, or Apple ID sharing. Clock.app
          on one Apple ID is a different product.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">What is shared</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The{" "}
          <a href="https://syncupalarm.com/privacy" className="text-teal hover:underline">
            privacy policy
          </a>{" "}
          (last updated April 8, 2026) says the app may collect “alarm times, labels, sync status,
          and partner pairing metadata needed to operate the product,” plus account/profile and
          device/diagnostics.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The{" "}
          <a
            href="https://syncupalarm.com/blog/alarmkit-partner-alarms-iphone"
            className="text-teal hover:underline"
          >
            AlarmKit journal post
          </a>{" "}
          describes “sync” as three jobs: both people accept a shared schedule, each phone
          schedules a local alarm, and both sides can see status. That post is explicit that this
          is not “magic across the internet.”
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          This page does not claim encryption, millisecond lockstep, or that anyone else can see
          your feed.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">AlarmKit permission</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The{" "}
          <a href="https://syncupalarm.com/faq" className="text-teal hover:underline">
            FAQ
          </a>{" "}
          says SyncUpAlarm is built around Apple AlarmKit and iOS alarm scheduling, not
          reminder-only notifications.{" "}
          <a
            href="https://developer.apple.com/documentation/alarmkit"
            className="text-teal hover:underline"
          >
            Apple’s AlarmKit documentation
          </a>{" "}
          says AlarmKit handles alarm authorization.{" "}
          <a
            href="https://developer.apple.com/documentation/alarmkit/scheduling-an-alarm-with-alarmkit"
            className="text-teal hover:underline"
          >
            Apple’s scheduling article
          </a>{" "}
          says an app prompts for authorization with <code>requestAuthorization()</code>, or
          AlarmKit asks when a person adds their first alarm.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The{" "}
          <a href="https://syncupalarm.com/terms" className="text-teal hover:underline">
            terms
          </a>{" "}
          say alarm behavior can still be affected by Focus, volume, Silent mode, and system
          updates. Allow the permission if you want the system alarm path the FAQ describes.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">If one phone is offline</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The live FAQ, privacy policy, and store listing do not document what happens if you edit
          a wake time while the other phone is offline. This page does not invent that.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          What the site does say: the{" "}
          <a
            href="https://syncupalarm.com/blog/alarmkit-partner-alarms-iphone"
            className="text-teal hover:underline"
          >
            AlarmKit post
          </a>{" "}
          notes a dead phone does not ring, and the{" "}
          <a href="https://syncupalarm.com/terms" className="text-teal hover:underline">
            terms
          </a>{" "}
          say alarms can fail under device settings. Charge the phone. Do not treat pairing as a
          backup alarm for a dead battery.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">Unpair</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The live FAQ, privacy policy, terms, and App Store listing do not document an unpair or
          leave-pair control. This page does not invent one. Email{" "}
          <a href="mailto:support@syncupalarm.com" className="text-teal hover:underline">
            support@syncupalarm.com
          </a>{" "}
          if you need that step.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">Related</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          <li>
            <a href="https://syncupalarm.com/faq" className="text-teal hover:underline">
              FAQ
            </a>
          </li>
          <li>
            <a
              href="https://syncupalarm.com/blog/alarmkit-partner-alarms-iphone"
              className="text-teal hover:underline"
            >
              AlarmKit writeup
            </a>
          </li>
          <li>
            <a href="https://syncupalarm.com/privacy" className="text-teal hover:underline">
              Privacy
            </a>
          </li>
          <li>
            <Link href="/download" className="text-teal hover:underline">
              Download
            </Link>
          </li>
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-zinc-400">
          <strong className="text-zinc-200">Sources</strong>
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          <li>
            FAQ, store id 6760364103, homepage invite line, privacy (Apr 8 2026), AlarmKit journal
            post, Apple AlarmKit docs + scheduling article, terms.
          </li>
        </ul>
      </article>
    </main>
  );
}

