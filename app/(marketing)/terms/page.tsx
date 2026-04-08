import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/structured-data";

const title = "Terms of Use";
const description =
  "Terms for using the SyncUpAlarm website and iOS app, including Apple AlarmKit disclaimers and limitation of liability.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${title} · ${SITE.name}`,
    description,
    url: `${SITE.domain}/terms`,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const jsonLd = getWebPageJsonLd("/terms", `${title} · ${SITE.name}`, description);

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
          Terms of Use
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          These Terms of Use (“Terms”) govern your access to {SITE.domain} and
          the {SITE.name} application for Apple iOS. By using our services, you
          agree to these Terms. If you disagree, do not use {SITE.name}.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          1. The service
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {SITE.name} provides software that helps users coordinate wake-up
          alarms with a connected partner on supported iPhones. Features may
          change; we do not guarantee uninterrupted or error-free operation.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          2. Apple, AlarmKit, and the App Store
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The app is distributed for iOS and may use{" "}
          <strong className="text-zinc-200">Apple AlarmKit</strong> and other
          Apple frameworks to schedule and deliver alarms.{" "}
          <strong className="text-zinc-200">
            Apple is not a party to these Terms
          </strong>{" "}
          and is not responsible for the app or its content. Your use of the App
          Store and iOS is also subject to Apple’s applicable terms and policies.
          Alarm behavior can be affected by iOS settings, Focus modes, volume,
          Silent mode, and system updates—plan critical wake-ups accordingly.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          3. Eligibility &amp; accounts
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          You must be able to form a binding contract in your jurisdiction. You
          are responsible for account credentials and for any activity under
          your account. Notify us promptly at{" "}
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-teal hover:underline"
          >
            {SITE.supportEmail}
          </a>{" "}
          if you suspect unauthorized access.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          4. Acceptable use
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          You agree not to misuse the service—for example, no unlawful,
          harassing, or harmful activity; no attempt to disrupt, scrape, or
          reverse engineer except as law permits; and no violation of others’
          rights. We may suspend or terminate access for violations.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          5. Subscriptions &amp; fees
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          If we offer paid plans, pricing and billing will be presented in the
          app or App Store checkout. App Store purchases are processed by
          Apple; refunds and payment disputes may be handled per Apple’s rules.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          6. Intellectual property
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {SITE.name}, branding, and content we provide are owned by us or our
          licensors. We grant you a personal, non-exclusive, non-transferable
          license to use the app as intended. Do not copy, modify, or distribute
          our materials except as allowed by law or with our permission.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          7. Third-party services
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The service may rely on third parties (e.g., cloud providers,
          analytics). Their terms and privacy practices apply to what they
          process on our behalf.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          8. Disclaimers
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES
          OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
          WARRANT THAT ALARMS WILL ALWAYS FIRE ON TIME OR THAT THE SERVICE WILL
          MEET YOUR NEEDS. {SITE.name} IS NOT A MEDICAL DEVICE AND IS NOT A
          SUBSTITUTE FOR PROFESSIONAL ADVICE ABOUT SLEEP OR HEALTH.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          9. Limitation of liability
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR AFFILIATES WILL NOT
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING
          FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE
          POSSIBILITY. OUR AGGREGATE LIABILITY FOR CLAIMS RELATING TO THE
          SERVICE IS LIMITED TO THE GREATER OF (A) THE AMOUNTS YOU PAID US FOR
          THE SERVICE IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) FIFTY U.S.
          DOLLARS (US $50), UNLESS APPLICABLE LAW REQUIRES OTHERWISE.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          10. Indemnity
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          You will defend and indemnify us against claims arising from your
          misuse of the service or violation of these Terms, to the extent
          permitted by law.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          11. Governing law
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          These Terms are governed by the laws of the State of Delaware, USA,
          excluding conflict-of-law rules, unless your jurisdiction requires
          otherwise. Courts in that state have exclusive jurisdiction, subject
          to mandatory consumer protections where you live.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">
          12. Changes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We may update these Terms. We will post the revised version here and
          update the “Last updated” date. Continued use after changes means you
          accept the new Terms.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-white">13. Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="text-teal hover:underline"
          >
            {SITE.supportEmail}
          </a>
        </p>

        <p className="mt-10 text-xs text-zinc-600">
          See also our{" "}
          <Link href="/privacy" className="text-teal hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
