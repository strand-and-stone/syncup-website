"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlarmClock, Flame, Moon, Users } from "lucide-react";

/** iPhone 15-class logical aspect (portrait). */
const PHONE_ASPECT = 393 / 852;

type PhoneMockupProps = {
  className?: string;
  delay?: number;
  floatOffset?: number;
  variant?: "left" | "right";
};

export function PhoneMockup({
  className = "",
  delay = 0,
  floatOffset = 0,
  variant = "left",
}: PhoneMockupProps) {
  const reduceMotion = useReducedMotion();

  const drift = reduceMotion
    ? {}
    : {
        y: [0, -8 - floatOffset * 2, 0],
      };

  return (
    <motion.div
      className={`relative isolate ${className}`}
      style={{ aspectRatio: PHONE_ASPECT }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div
        className="flex h-full w-full flex-col rounded-[2rem] border border-white/10 bg-zinc-950 p-[10px] shadow-glowPurple"
        animate={drift}
        transition={{
          duration: 6.5 + floatOffset,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.15,
        }}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      >
        <div
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
          style={{
            background:
              variant === "left"
                ? "radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(34,211,238,0.22), transparent 50%)"
                : "radial-gradient(ellipse at 70% 30%, rgba(34,211,238,0.28), transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(168,85,247,0.25), transparent 55%)",
          }}
        />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.55rem] bg-bg ring-1 ring-white/5">
          <header className="flex shrink-0 items-center justify-between bg-purple/95 px-3 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bg/40 ring-1 ring-white/10">
                <Flame className="h-3.5 w-3.5 text-flame" aria-hidden />
              </div>
              <span className="text-xs font-semibold tracking-tight text-white">
                SyncUp
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-bg/35 px-1.5 py-0.5 text-[9px] font-medium text-teal ring-1 ring-teal/25">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/70 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
              Live
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3 pb-4 pt-3">
            <div className="flex shrink-0 items-center justify-between text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Moon className="h-3 w-3 text-teal/80" aria-hidden />
                Tonight
              </span>
              <span>Partner online</span>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/5 bg-zinc-900/80 p-3 shadow-glowTeal">
              <div className="absolute -right-4 -top-6 h-16 w-16 rounded-full bg-teal/15 blur-2xl" />
              <div className="absolute -bottom-4 -left-2 h-14 w-14 rounded-full bg-purple/20 blur-2xl" />
              <div className="relative flex items-start justify-between gap-2">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
                    Next alarm
                  </p>
                  <p className="mt-0.5 text-2xl font-bold leading-none tracking-tight text-white">
                    6:30
                    <span className="text-sm font-semibold text-zinc-400"> AM</span>
                  </p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-flame/25 to-purple/20 p-2 ring-1 ring-flame/30">
                  <Flame className="h-5 w-5 text-flame" aria-hidden />
                </div>
              </div>
              <div className="relative mt-2 flex items-center gap-1.5 text-[10px] text-zinc-400">
                <Users className="h-3 w-3 shrink-0 text-purple" aria-hidden />
                Synced with Alex
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/5 bg-zinc-900/50 px-2.5 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple/15 ring-1 ring-purple/25">
                <AlarmClock className="h-4 w-4 text-teal" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white">Morning flow</p>
                <p className="truncate text-[10px] text-zinc-500">
                  Soft ramp · AlarmKit
                </p>
              </div>
              <div className="shrink-0 rounded-full bg-teal/15 px-1.5 py-0.5 text-[9px] font-semibold text-teal">
                On
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
