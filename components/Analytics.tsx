"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import {
  GA_MEASUREMENT_ID,
  GTM_ID,
  pushDataLayer,
  sendGtagPageView,
} from "@/lib/gtag";

/**
 * SPA page views: GTM listens via custom event, or gtag gets a fresh config ping.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : "");

    if (GTM_ID) {
      pushDataLayer({
        event: "page_view",
        page_path: url,
        page_location:
          typeof window !== "undefined" ? window.location.href : undefined,
        page_title: typeof document !== "undefined" ? document.title : undefined,
      });
    }

    if (GA_MEASUREMENT_ID && !GTM_ID) {
      sendGtagPageView(url, document.title);
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Tag Manager takes priority when set (configure GA4 + Ads inside GTM).
 * Otherwise loads gtag.js directly with NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */
export function Analytics() {
  if (GTM_ID) {
    return (
      <>
        <Script id="gtm-dataLayer" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});`}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </>
    );
  }

  if (GA_MEASUREMENT_ID) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  send_page_view: false,
  allow_google_signals: true,
  allow_ad_personalization_signals: true
});
          `.trim()}
        </Script>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </>
    );
  }

  return null;
}
