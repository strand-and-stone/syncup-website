import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/structured-data";

const title = "Privacy Policy";
const description =
  "How SyncUpAlarm collects, uses, and protects your information—including use of Apple AlarmKit, analytics, and partner sync features.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${title} · ${SITE.name}`,
    description,
    url: `${SITE.domain}/privacy`,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const jsonLd = getWebPageJsonLd("/privacy", `${title} · ${SITE.name}`, description);

  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={jsonLd} />
      <article className="max-w-none">
        <p className="text-sm text-zinc-500">
          Last updated: April 8, 2026 ·{" "}
          <Link href="/" className="text-teal hover:underline">
            Back to home
          </Link>
        </p>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          This policy describes how {SITE.companyLegalName} (“we,” “us”) handles
          information when you use our website ({SITE.domain}) and the{" "}
          {SITE.name} mobile application for iOS. It is meant to be clear and
          practical; it is not legal advice. If you do not agree, please do not
          use our services.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          1. What we build
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {SITE.name} helps you and a partner align wake-up alarms on iPhone. On
          device, alarms may be scheduled using{" "}
          <strong className="text-zinc-200">Apple’s AlarmKit</strong> (or related
          iOS alarm APIs), which run within Apple’s system frameworks. Apple’s
          handling of system-level data is governed by Apple’s own policies.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          2. Information we may collect
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          <li>
            <strong className="text-zinc-200">Account &amp; profile:</strong>{" "}
            such as email, display name, or partner link identifiers you choose
            to provide.
          </li>
          <li>
            <strong className="text-zinc-200">Alarm &amp; sync data:</strong>{" "}
            alarm times, labels, sync status, and partner pairing metadata
            needed to operate the product.
          </li>
          <li>
            <strong className="text-zinc-200">Device &amp; diagnostics:</strong>{" "}
            device type, OS version, app version, crash logs, and performance
            data to keep the app reliable.
          </li>
          <li>
            <strong className="text-zinc-200">Website analytics:</strong> we use{" "}
            <strong className="text-zinc-200">Google Analytics</strong> and may
            use <strong className="text-zinc-200">Google Tag Manager</strong> on
            this marketing site to understand aggregate traffic (pages viewed,
            approximate geography, device category, referrals). These tools may
            set cookies or use similar storage as described in Google’s
            documentation.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-white">
          3. How we use information
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We use the above to provide syncing, improve stability and security,
          communicate about the service, comply with law, and measure how our
          website performs. We do not sell your personal information.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          4. Sharing
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We may share data with infrastructure providers (e.g., hosting,
          database, push notification services) that process it on our behalf
          under contract. Analytics data may be processed by Google as
          described in their policies. We may disclose information if required
          by law or to protect rights and safety.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          5. Retention &amp; security
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We keep information only as long as needed for the purposes above or
          as law requires. We use industry-standard safeguards, but no method of
          transmission or storage is 100% secure.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          6. Your choices &amp; rights
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Depending on where you live, you may have rights to access, correct,
          delete, or export personal data, or to object to certain processing.
          Contact us at{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-teal hover:underline"
          >
            {SITE.supportEmail}
          </a>
          . You can also use browser controls or Google’s tools to limit
          certain analytics cookies.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          7. Children
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {SITE.name} is not directed at children under 13 (or the minimum age in
          your region). We do not knowingly collect their personal information.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          8. International users
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          If you access the service from outside the United States, your data
          may be processed in the U.S. or other countries where we or our
          vendors operate.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          9. Changes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We may update this policy from time to time. We will post the new
          version on this page and update the “Last updated” date.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">10. Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Questions about privacy:{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-teal hover:underline"
          >
            {SITE.supportEmail}
          </a>
        </p>
      </article>
    </main>
  );
}
