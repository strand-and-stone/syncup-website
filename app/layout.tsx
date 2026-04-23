import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { GOOGLE_SITE_VERIFICATION, SITE } from "@/lib/constants";
import {
  getOrganizationJsonLd,
  getSoftwareApplicationJsonLd,
  getWebSiteJsonLd,
} from "@/lib/structured-data";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "SyncUpAlarm syncs wake-up alarms between partners on iPhone. Built with Apple AlarmKit for reliable alarms—even when you’re apart.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Wake up together on iPhone`,
    template: `%s · ${SITE.name}`,
  },
  description,
  applicationName: SITE.name,
  authors: [{ name: SITE.companyLegalName, url: SITE.domain }],
  creator: SITE.companyLegalName,
  publisher: SITE.companyLegalName,
  category: "lifestyle",
  keywords: [
    "sync alarm",
    "couple alarm app",
    "wake up together",
    "partner alarm",
    "iPhone alarm sync",
    "AlarmKit",
    "long distance relationship",
    "shared alarm clock",
    SITE.name,
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE.name} — Wake up together`,
    description,
    url: SITE.domain,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Partner alarm sync for iPhone`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Wake up together`,
    description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION.metaContent,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { color: "#050505" },
  ],
  colorScheme: "dark",
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    getOrganizationJsonLd(),
    getWebSiteJsonLd(),
    getSoftwareApplicationJsonLd(),
  ];

  return (
    <html lang="en-US" className="dark">
      <body
        className={`${plusJakarta.variable} ${outfit.variable} min-h-screen font-sans`}
      >
        <JsonLd data={structuredData} />
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              className="hidden"
            />
          </noscript>
        ) : null}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
