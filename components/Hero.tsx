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
        className="bg-grid-fade bg-grid pointer-events-none absolute inset-0"
        style={{ backgroundPosition: "center top" }}
      />
      <div className="bg-purple/18 pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[110px]" />
      <div className="bg-teal/10 pointer-events-none absolute top-32 right-[-18%] h-[320px] w-[320px] rounded-full blur-[90px]" />
      <div className="bg-flame/10 pointer-events-none absolute bottom-0 left-[-8%] h-[220px] w-[220px] rounded-full blur-[80px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10 lg:px-8">
        {/* Product first on small screens */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroAppScreenshot />
        </div>

        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <h1
            id="hero-heading"
            className="hero-heading font-display max-w-[20ch] text-[1.65rem] leading-[1.12] font-bold tracking-[-0.035em] text-white sm:max-w-none sm:text-[2rem] lg:text-[2.25rem]"
          >
            Wake up together.
            <br />
            <span className="from-purple via-teal to-flame bg-gradient-to-r bg-clip-text text-transparent">
              One alarm, both phones.
            </span>
          </h1>

          <motion.p
            className="mt-2 max-w-[34ch] text-sm leading-snug text-zinc-500 sm:text-[0.9375rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease }}
          >
            A shared alarm app for couples and roommates on iPhone. Pair once, set one wake plan,
            and see it on both phones.
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
