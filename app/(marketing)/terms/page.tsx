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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: { index: true, follow: true },
};

const bodyText = "mt-3 text-sm leading-relaxed text-zinc-400";
const sectionHeading = "mt-10 text-xl font-semibold text-white";
const subheading = "mt-8 text-lg font-semibold text-white";
const listClass =
  "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400";

export default function TermsPage() {
  const jsonLd = getWebPageJsonLd(
    "/terms",
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
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          Last updated: November 9, 2026
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          {`These Terms of Use ("Terms") are a legal agreement between you and Strand and Stone LLC, a New Mexico limited liability company (entity no. 0008085725) ("Strand and Stone," "we," "us," or "our"). They govern your access to https://syncupalarm.com (the "Site") and the SyncUp: Partner Alarm Clock application for Apple iOS (the "App," and together with the Site, the "Service"). In these Terms, "SyncUp" means the App.`}
        </p>
        <p className={bodyText}>
          By using the Service, you agree to these Terms. If you do not agree,
          do not use the Service.
        </p>

        <h2 className={sectionHeading}>1. The Service</h2>
        <p className={bodyText}>
          SyncUp helps users coordinate wake-up alarms with a connected partner
          on supported iPhones. Features may change. We do not guarantee
          uninterrupted or error-free operation.
        </p>

        <h2 className={sectionHeading}>
          2. Apple, AlarmKit, and the App Store
        </h2>
        <p className={bodyText}>
          {`The App is distributed for iOS and may use Apple AlarmKit and other Apple frameworks to schedule and deliver alarms. Apple is not a party to these Terms and is not responsible for the App or its content. Your use of the App Store and iOS is also subject to Apple's applicable terms and policies. Alarm behavior can be affected by iOS settings, Focus modes, volume, Silent mode, and system updates. Plan critical wake-ups accordingly.`}
        </p>

        <h2 className={sectionHeading}>3. Eligibility and accounts</h2>
        <p className={bodyText}>
          You must be able to form a binding contract in your jurisdiction. You
          are responsible for account credentials and for any activity under
          your account. Notify us promptly at{" "}
          <a
            href="mailto:robert@strandandstonellc.com"
            className="text-teal hover:underline"
          >
            robert@strandandstonellc.com
          </a>{" "}
          if you suspect unauthorized access.
        </p>

        <h2 className={sectionHeading}>4. Acceptable use</h2>
        <p className={bodyText}>
          {`You agree not to misuse the Service—for example, no unlawful, harassing, or harmful activity; no attempt to disrupt, scrape, or reverse engineer except as law permits; and no violation of others' rights. We may suspend or terminate access for violations.`}
        </p>

        <h2 className={sectionHeading}>
          5. Subscriptions, one-time purchases, and fees
        </h2>
        <p className={bodyText}>
          Paid features and prices are presented in the App or App Store
          checkout at the time of purchase. We may offer:
        </p>
        <ul className={listClass}>
          <li>
            Auto-renewable subscriptions, including SyncUp Pro monthly and
            SyncUp Pro yearly
          </li>
          <li>
            One-time purchases, including a SyncUp Pro lifetime unlock and other
            in-app purchases shown at checkout
          </li>
        </ul>
        <p className={bodyText}>
          {`App Store purchases are processed by Apple. Refunds and payment disputes may be handled under Apple's rules.`}
        </p>

        <h3 className={subheading}>Subscriptions</h3>
        <p className={bodyText}>If you buy a subscription:</p>
        <ul className={listClass}>
          <li>You pay the fee shown in the App Store at checkout</li>
          <li>
            The subscription automatically renews unless you cancel at least 24
            hours before the end of the current period
          </li>
          <li>
            Your Apple ID account is charged for renewal within 24 hours before
            the end of the current period
          </li>
          <li>
            You manage the subscription and turn off auto-renewal in your Apple
            ID account settings (Apple subscriptions) after purchase
          </li>
        </ul>
        <p className={bodyText}>
          {`Canceling stops the next renewal. It does not refund the current period, and you keep access until that period ends. If the subscription price changes, Apple's then-current process applies, including any notice or consent Apple requires.`}
        </p>
        <p className={bodyText}>A subscription is not a lifetime unlock.</p>

        <h3 className={subheading}>
          Lifetime unlock and other one-time purchases
        </h3>
        <p className={bodyText}>
          A SyncUp Pro lifetime unlock is a one-time purchase, not a
          subscription. It does not automatically renew and we do not charge you
          again for that unlock.
        </p>
        <p className={bodyText}>
          {`"Lifetime" means access to the paid features included with that unlock for as long as we make the App available. It does not mean we must operate the App for the rest of your life, or that we must keep selling that purchase to new buyers.`}
        </p>
        <p className={bodyText}>
          If you already bought a lifetime unlock, you keep that access while we
          offer the App, including the ability to restore the purchase on a
          device signed in with the Apple ID you used to buy it. We will not
          move those same included features behind a new paywall for you, and we
          will not treat your unlock as expired while the App remains available.
        </p>
        <p className={bodyText}>
          We may change which paid plans we offer to new buyers, including by
          stopping a plan or changing its price for them. That change does not
          take away a lifetime unlock or other one-time purchase you already
          made.
        </p>
        <p className={bodyText}>
          If we discontinue the App, a lifetime unlock does not require us to
          keep the Service running forever. We will provide notice when we can,
          and refunds may be available through Apple.
        </p>

        <h2 className={sectionHeading}>6. Intellectual property</h2>
        <p className={bodyText}>
          SyncUp, our branding, and content we provide are owned by Strand and
          Stone or our licensors. We grant you a personal, non-exclusive,
          non-transferable license to use the App as intended. Do not copy,
          modify, or distribute our materials except as allowed by law or with
          our permission.
        </p>

        <h2 className={sectionHeading}>7. Third-party services</h2>
        <p className={bodyText}>
          The Service may rely on third parties (for example, cloud providers
          and analytics). Their terms and privacy practices apply to what they
          process on our behalf.
        </p>

        <h2 className={sectionHeading}>8. Disclaimers</h2>
        <p className={bodyText}>
          {`THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT ALARMS WILL ALWAYS FIRE ON TIME OR THAT THE SERVICE WILL MEET YOUR NEEDS. SYNCUP IS NOT A MEDICAL DEVICE AND IS NOT A SUBSTITUTE FOR PROFESSIONAL ADVICE ABOUT SLEEP OR HEALTH.`}
        </p>

        <h2 className={sectionHeading}>9. Limitation of liability</h2>
        <p className={bodyText}>
          {`TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY. OUR AGGREGATE LIABILITY FOR CLAIMS RELATING TO THE SERVICE IS LIMITED TO THE GREATER OF (A) THE AMOUNTS YOU PAID US FOR THE SERVICE IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) FIFTY U.S. DOLLARS (US $50), UNLESS APPLICABLE LAW REQUIRES OTHERWISE.`}
        </p>

        <h2 className={sectionHeading}>10. Indemnity</h2>
        <p className={bodyText}>
          You will defend and indemnify us against claims arising from your
          misuse of the Service or violation of these Terms, to the extent
          permitted by law.
        </p>

        <h2 className={sectionHeading}>11. Governing law</h2>
        <p className={bodyText}>
          These Terms are governed by the laws of the State of New Mexico, USA,
          excluding conflict-of-law rules, unless your jurisdiction requires
          otherwise. Subject to mandatory consumer protections where you live,
          state and federal courts in New Mexico have exclusive jurisdiction.
        </p>

        <h2 className={sectionHeading}>12. Changes</h2>
        <p className={bodyText}>
          {`We may update these Terms. We will post the revised version here and update the "Last updated" date. Continued use after changes become effective means you accept the new Terms.`}
        </p>

        <h2 className={sectionHeading}>13. Contact</h2>
        <p className={bodyText}>
          Strand and Stone LLC
          <br />
          A New Mexico limited liability company (entity no. 0008085725)
          <br />
          Email:{" "}
          <a
            href="mailto:robert@strandandstonellc.com"
            className="text-teal hover:underline"
          >
            robert@strandandstonellc.com
          </a>
          <br />
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
