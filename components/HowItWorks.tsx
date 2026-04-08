"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlarmClock, Heart, Sparkles } from "lucide-react";

import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const icons = {
  heart: Heart,
  alarm: AlarmClock,
  sparkles: Sparkles,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-t border-white/5 py-24 sm:py-28"
      aria-labelledby="how-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">
            How it works
          </p>
          <h2
            id="how-heading"
            className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Three chill steps.{" "}
            <span className="text-zinc-500">Zero morning drama.</span>
          </h2>
        </motion.div>

        <ol className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <motion.li
                key={step.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.12,
                  ease,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, transition: { duration: 0.35, ease } }
                }
              >
                <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-purple/15 blur-3xl transition-opacity group-hover:opacity-100" />
                <div className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-teal/10 blur-3xl" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple/30 to-teal/20 ring-1 ring-white/10">
                  <Icon className="h-6 w-6 text-teal" aria-hidden />
                </div>
                <p className="mt-6 font-display text-xl font-semibold text-white">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.body}
                </p>
                <span className="mt-6 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-bg/80 text-xs font-bold text-zinc-500">
                  {i + 1}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
