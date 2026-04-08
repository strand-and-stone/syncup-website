"use client";

import { motion } from "framer-motion";

import { StoreBadges } from "@/components/StoreBadges";
import { PhoneMockup } from "@/components/PhoneMockup";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid"
        style={{ backgroundPosition: "center top" }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-[-20%] h-[380px] w-[380px] rounded-full bg-teal/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[280px] w-[280px] rounded-full bg-flame/10 blur-[90px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.p
            className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-400 lg:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-glowFlame" />
            Made for couples who hate morning chaos
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            Wake up together.
            <br />
            <span className="bg-gradient-to-r from-purple via-teal to-flame bg-clip-text text-transparent">
              Even when you’re apart.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-lg text-zinc-400 lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Sync alarms with your partner so you both wake up at the exact same
            time—cozy, clear, and a little bit magical.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease }}
          >
            <StoreBadges />
          </motion.div>
        </div>

        <div className="relative mx-auto flex max-w-lg justify-center gap-6 lg:mx-0 lg:max-w-none lg:justify-end">
          <div className="relative z-10 w-[46%] max-w-[240px] lg:w-auto lg:max-w-[260px]">
            <PhoneMockup variant="left" rotate={-8} floatOffset={0} delay={0.15} />
          </div>
          <div className="relative z-0 w-[46%] max-w-[240px] translate-y-10 lg:w-auto lg:max-w-[260px] lg:translate-y-14">
            <PhoneMockup variant="right" rotate={10} floatOffset={1.2} delay={0.35} />
          </div>
        </div>
      </div>
    </section>
  );
}
