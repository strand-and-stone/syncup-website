"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Flame,
  Globe,
  LayoutGrid,
  Shield,
  Waves,
  Zap,
} from "lucide-react";

import { FEATURES } from "@/lib/constants";

const icons = {
  zap: Zap,
  waves: Waves,
  globe: Globe,
  shield: Shield,
  flame: Flame,
  "layout-grid": LayoutGrid,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="relative scroll-mt-24 py-24 sm:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-purple">
            Features
          </p>
          <h2
            id="features-heading"
            className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-teal to-flame bg-clip-text text-transparent">
              synced mornings
            </span>
            —nothing you don’t.
          </h2>
        </motion.div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = icons[feature.icon];
            return (
              <motion.li
                key={feature.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40 p-6 ring-1 ring-inset ring-white/[0.02]"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.06,
                  ease,
                }}
              >
                {feature.icon === "flame" && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-flame/10 blur-2xl" />
                )}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg ring-1 ring-purple/30">
                    <Icon
                      className={`h-5 w-5 ${feature.icon === "flame" ? "text-flame" : "text-purple"}`}
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
