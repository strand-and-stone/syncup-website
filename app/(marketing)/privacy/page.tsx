import type { Metadata } from "next";
import type { ReactNode } from "react";
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

const INTRO =
  'This policy describes how Strand and Stone LLC, a New Mexico limited liability company (entity no. 0008085725) ("Strand and Stone," "we," "us," or "our"), handles information when you use our website (https://syncupalarm.com) (the "Site") and the SyncUp: Partner Alarm Clock application for iOS (the "App," and together with the Site, the "Service"). In this policy, "SyncUp" means the App.';

const DISAGREE =
  "If you do not agree with this policy, please do not use the Service.";

const BUILD =
  "SyncUp helps you and a partner align wake-up alarms on iPhone. On device, alarms may be scheduled using Apple's AlarmKit (or related iOS alarm APIs), which run within Apple's system frameworks. Apple's handling of system-level data is governed by Apple's own policies.";

const COLLECT = [
  "Account and profile: such as email, display name, or partner link identifiers you choose to provide.",
  "Alarm and sync data: alarm times, labels, sync status, and partner pairing metadata needed to operate the product.",
  "Device and diagnostics: device type, OS version, app version, crash logs, and performance data to keep the app reliable.",
  "Purchase data: Apple processes App Store and in-app purchases. We may receive purchase status, product identifiers, and restoration information needed to unlock paid features. We do not receive your full payment card number.",
  "Website analytics: the Site uses Google Analytics 4 (provided by Google LLC) to understand aggregate traffic, such as pages viewed, approximate geography, device category, and referrals. These tools may set cookies or use similar storage and may receive your IP address and device and browser information.",
] as const;

const USE = [
  "We use the information above to provide syncing, process purchases and restore access, improve stability and security, communicate about the Service, comply with law, and measure how the Site performs.",
  "We do not sell your personal information for money.",
] as const;

const SHARE_INTRO = "We may share information with:";

const SHARE = [
  "Infrastructure providers (for example, hosting, database, and push notification services) that process it on our behalf under contract",
  "Apple, for App Store distribution and in-app purchases",
  "RevenueCat, which processes subscription and in-app purchase status on our behalf",
  "Google, for Google Analytics on the Site, as described in Google's policies",
] as const;

const SHARE_LAW =
  "We may also disclose information if required by law or to protect rights and safety.";

const GOOGLE =
  "Learn more about how Google uses information from sites that use its services at https://policies.google.com/technologies/partner-sites. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on (https://tools.google.com/dlpage/gaoptout) or by blocking cookies in your browser.";

const RETENTION =
  "We keep information only as long as needed for the purposes above or as law requires. We use industry-standard safeguards, but no method of transmission or storage is 100% secure.";

const RIGHTS = [
  "Depending on where you live, you may have the right to know and access the personal information we hold about you; correct it; delete it; obtain a portable copy; opt out of the sale or sharing of personal information and of targeted advertising; and not be discriminated against for exercising these rights.",
  'To make a request, email robert@strandandstonellc.com. You may use the subject "Privacy Request" or "Do Not Sell or Share." We will verify your request and respond within 45 days (we may extend this once by another 45 days where permitted, and will tell you if we do). If we deny your request, you may appeal by replying to our decision with the subject "Appeal."',
  "You can also use browser controls or Google's tools to limit certain analytics cookies. We do not knowingly sell or share the personal information of consumers under 16.",
] as const;

const CHILDREN =
  "SyncUp is not directed at children under 13 (or the minimum age in your region). We do not knowingly collect their personal information.";

const INTERNATIONAL =
  "If you access the Service from outside the United States, your data may be processed in the U.S. or other countries where we or our vendors operate.";

const CHANGES =
  'We may update this policy from time to time. We will post the new version on this page and update the "Last updated" date.';

const CONTACT = [
  "Strand and Stone LLC",
  "A New Mexico limited liability company (entity no. 0008085725)",
  "Email: robert@strandandstonellc.com",
  "Website: https://syncupalarm.com",
] as const;

const LINK =
  /(https:\/\/policies\.google\.com\/technologies\/partner-sites|https:\/\/tools\.google\.com\/dlpage\/gaoptout|https:\/\/syncupalarm\.com|robert@strandandstonellc\.com)/g;

function withLinks(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const value = match[0];
    const href = value.startsWith("https://") ? value : `mailto:${value}`;
    nodes.push(
      <a
        key={`${index}-${value}`}
        href={href}
        className="text-teal hover:underline"
      >
        {value}
      </a>,
    );
    last = index + value.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function emphasize(text: string, phrase: string): ReactNode {
  const index = text.indexOf(phrase);
  if (index < 0) return withLinks(text);
  return (
    <>
      {withLinks(text.slice(0, index))}
      <strong className="text-zinc-200">{phrase}</strong>
      {withLinks(text.slice(index + phrase.length))}
    </>
  );
}

export default function PrivacyPage() {
  const jsonLd = getWebPageJsonLd(
    "/privacy",
    `${title} · ${SITE.name}`,
    description,
  );

  return (
    <main
      id="main-content"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <JsonLd data={jsonLd} />
      <p className="text-sm text-zinc-500">
        <Link href="/" className="text-teal hover:underline">
          Back to home
        </Link>
      </p>
      <article className="max-w-none">
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          Last updated: November 9, 2026
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          {withLinks(INTRO)}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{DISAGREE}</p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          1. What we build
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {emphasize(BUILD, "Apple's AlarmKit")}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          2. Information we may collect
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          {COLLECT.map((item) => {
            const index = item.indexOf(":");
            const label = item.slice(0, index + 1);
            const rest = item.slice(index + 1);
            return (
              <li key={label}>
                <strong className="text-zinc-200">{label}</strong>
                {rest.includes("Google Analytics 4")
                  ? emphasize(rest, "Google Analytics 4")
                  : withLinks(rest)}
              </li>
            );
          })}
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-white">
          3. How we use information
        </h2>
        {USE.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 text-sm leading-relaxed text-zinc-400"
          >
            {paragraph}
          </p>
        ))}

        <h2 className="mt-10 text-xl font-semibold text-white">4. Sharing</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {SHARE_INTRO}
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
          {SHARE.map((item) => {
            const index = item.indexOf(",");
            if (index > 0 && index <= 12) {
              return (
                <li key={item}>
                  <strong className="text-zinc-200">
                    {item.slice(0, index)}
                  </strong>
                  {item.slice(index)}
                </li>
              );
            }
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {SHARE_LAW}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {withLinks(GOOGLE)}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          5. Retention and security
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {RETENTION}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          6. Your choices and rights
        </h2>
        {RIGHTS.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 text-sm leading-relaxed text-zinc-400"
          >
            {withLinks(paragraph)}
          </p>
        ))}

        <h2 className="mt-10 text-xl font-semibold text-white">7. Children</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{CHILDREN}</p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          8. International users
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {INTERNATIONAL}
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">9. Changes</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{CHANGES}</p>

        <h2 className="mt-10 text-xl font-semibold text-white">10. Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {CONTACT.map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {withLinks(line)}
            </span>
          ))}
        </p>
      </article>
    </main>
  );
}
