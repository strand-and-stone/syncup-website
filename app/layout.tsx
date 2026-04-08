import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";

import "./globals.css";

import { SITE } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Wake up together`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Sync alarms with your partner so you both wake up at the exact same time—even when you’re apart.",
  openGraph: {
    title: `${SITE.name} — Wake up together`,
    description:
      "Sync alarms with your partner so you both wake up at the exact same time.",
    url: SITE.domain,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Wake up together`,
    description:
      "Sync alarms with your partner so you both wake up at the exact same time.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${syne.variable} min-h-screen font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
