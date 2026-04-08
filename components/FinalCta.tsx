"use client";

import { motion } from "framer-motion";

import { StoreBadges } from "@/components/StoreBadges";
import { SITE } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  return (
    <section
      id="download"
      className="relative scroll-mt-24 py-24 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-purple/[0.07] to-bg" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
        <motion.h2
          id="cta-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
        >
          Ready for softer wake-ups{" "}
          <span className="text-flame">and</span> stronger sync?
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-lg text-zinc-400"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.06, ease }}
        >
          Download {SITE.name} on the App Store, link your partner, and let
          tomorrow morning feel a little more like you’re in the same room.
        </motion.p>
        <div className="mt-10 flex w-full justify-center">
          <StoreBadges align="center" />
        </div>
      </div>
    </section>
  );
}
