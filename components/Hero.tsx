"use client";

import { motion } from "framer-motion";

import { HeroFlow } from "@/components/HeroFlow";
import { HeroAppScreenshot } from "@/components/HeroAppScreenshot";
import { StoreBadges } from "@/components/StoreBadges";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid"
        style={{ backgroundPosition: "center top" }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-purple/18 blur-[110px]" />
      <div className="pointer-events-none absolute top-32 right-[-18%] h-[320px] w-[320px] rounded-full bg-teal/10 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-8%] h-[220px] w-[220px] rounded-full bg-flame/10 blur-[80px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10 lg:px-8">
        {/* Product first on small screens */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroAppScreenshot />
        </div>

        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.h1
            id="hero-heading"
            className="font-display max-w-[20ch] text-[1.65rem] font-bold leading-[1.12] tracking-[-0.035em] text-white sm:max-w-none sm:text-[2rem] lg:text-[2.25rem]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            Same alarm.
            <br />
            <span className="bg-gradient-to-r from-purple via-teal to-flame bg-clip-text text-transparent">
              Both phones.
            </span>
          </motion.h1>

          <motion.p
            className="mt-2 max-w-[34ch] text-sm leading-snug text-zinc-500 sm:text-[0.9375rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease }}
          >
            iPhone · two people · zero morning chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="w-full"
          >
            <HeroFlow />
          </motion.div>

          <motion.div
            className="mt-5 flex w-full justify-center lg:mt-6 lg:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
          >
            <StoreBadges />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
