import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you requested does not exist on ${SITE.domain}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex min-h-[70vh] flex-col items-center justify-center px-4 pb-24 pt-28 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-teal">
          404
        </p>
        <h1 className="mt-3 max-w-md text-3xl font-bold tracking-tight text-white sm:text-4xl">
          This page drifted off like a snoozed alarm.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
          The link may be wrong, or we moved things around. Head home and we’ll
          get you back on schedule.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple/90 to-teal/80 px-6 py-3 text-sm font-semibold text-bg shadow-glowPurple ring-1 ring-white/10 transition-[box-shadow] hover:shadow-glowTeal"
        >
          Back to {SITE.name}
        </Link>
      </main>
      <Footer />
    </>
  );
}
