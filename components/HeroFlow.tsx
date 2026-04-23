"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlarmClock, Bell, Link2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const STEP_MS = 2600;

const steps = [
  {
    key: "pair",
    title: "Pair",
    blurb: "Drop a link. They join.",
    Icon: Link2,
  },
  {
    key: "set",
    title: "Set",
    blurb: "One time. Both phones.",
    Icon: AlarmClock,
  },
  {
    key: "ring",
    title: "Ring",
    blurb: "Same second. No “u up?”",
    Icon: Bell,
  },
] as const;

export function HeroFlow() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % steps.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(advance, STEP_MS);
    return () => window.clearInterval(id);
  }, [advance, reduceMotion]);

  if (reduceMotion) {
    return (
      <ol className="mt-5 flex w-full max-w-md list-none flex-col gap-3 text-left sm:mt-6 lg:mx-0">
        {steps.map((step, i) => (
          <li
            key={step.key}
            className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-xs font-bold text-zinc-400">
              {i + 1}
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-white">
                {step.title}
              </p>
              <p className="text-xs text-zinc-500">{step.blurb}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div
      className="mt-5 w-full max-w-md sm:mt-6 lg:mx-0"
      aria-label="How SyncUpAlarm works in three steps"
    >
      <div className="relative flex gap-1.5 sm:gap-2">
        {steps.map((step, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <div key={step.key} className="relative flex-1 pt-1">
              <div
                className="mb-2 h-1 overflow-hidden rounded-full bg-white/[0.08]"
                aria-hidden
              >
                <motion.div
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-purple via-teal to-flame"
                  initial={false}
                  animate={{
                    scaleX: done || current ? 1 : 0,
                    opacity: current ? 1 : done ? 0.55 : 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                  }}
                />
              </div>
              <motion.div
                className="flex flex-col gap-0.5"
                animate={{
                  scale: current && !reduceMotion ? 1.02 : 1,
                  y: current && !reduceMotion ? -1 : 0,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[0.65rem] font-bold ${
                      current
                        ? "border-teal/50 bg-teal/15 text-teal shadow-glowTeal"
                        : done
                          ? "border-white/10 bg-white/[0.06] text-zinc-400"
                          : "border-white/[0.06] bg-white/[0.03] text-zinc-600"
                    }`}
                  >
                    <step.Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span
                    className={`font-display text-xs font-semibold tracking-tight sm:text-sm ${
                      current ? "text-white" : "text-zinc-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <motion.p
                  className="pl-[2.125rem] text-[11px] leading-snug text-zinc-500 sm:text-xs"
                  animate={{ opacity: current ? 1 : 0.55 }}
                >
                  {step.blurb}
                </motion.p>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-center gap-1.5 sm:justify-start lg:justify-start">
        {steps.map((_, i) => (
          <button
            key={steps[i].key}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 bg-teal"
                : "w-1.5 bg-white/20 hover:bg-white/35"
            }`}
            aria-label={`Go to step ${i + 1}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </div>
  );
}
