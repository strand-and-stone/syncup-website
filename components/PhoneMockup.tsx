"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlarmClock, Flame, Moon, Users } from "lucide-react";

type PhoneMockupProps = {
  className?: string;
  delay?: number;
  rotate?: number;
  floatOffset?: number;
  variant?: "left" | "right";
};

export function PhoneMockup({
  className = "",
  delay = 0,
  rotate = -6,
  floatOffset = 0,
  variant = "left",
}: PhoneMockupProps) {
  const reduceMotion = useReducedMotion();

  const drift = reduceMotion
    ? {}
    : {
        y: [0, -10 - floatOffset, 0],
        rotate: [rotate, rotate + 1.5, rotate],
      };

  return (
    <motion.div
      className={`relative isolate ${className}`}
      initial={{ opacity: 0, y: 28, rotate: rotate + 4 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0, rotate }
          : { opacity: 1, y: 0, rotate, transition: { duration: 0.9, delay } }
      }
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div
        className="relative mx-auto w-[min(100%,260px)] rounded-[2.25rem] border border-white/10 bg-zinc-950 p-2 shadow-glowPurple"
        animate={drift}
        transition={{
          duration: 7 + floatOffset,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.2,
        }}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      >
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-3xl"
          style={{
            background:
              variant === "left"
                ? "radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(34,211,238,0.22), transparent 50%)"
                : "radial-gradient(ellipse at 70% 30%, rgba(34,211,238,0.28), transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(168,85,247,0.25), transparent 55%)",
          }}
        />
        <div className="overflow-hidden rounded-[1.85rem] bg-bg ring-1 ring-white/5">
          <header className="flex items-center justify-between bg-purple/95 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-bg/40 ring-1 ring-white/10">
                <Flame className="h-4 w-4 text-flame" aria-hidden />
              </div>
              <span className="font-display text-sm font-semibold tracking-tight text-white">
                SyncUp
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-bg/35 px-2 py-1 text-[10px] font-medium text-teal ring-1 ring-teal/25">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/70 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
              Live
            </div>
          </header>

          <div className="space-y-4 px-4 pb-6 pt-5">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Moon className="h-3.5 w-3.5 text-teal/80" aria-hidden />
                Tonight
              </span>
              <span>Partner online</span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/80 p-4 shadow-glowTeal">
              <div className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-teal/15 blur-2xl" />
              <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-purple/20 blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    Next alarm
                  </p>
                  <p className="font-display mt-1 text-3xl font-bold tracking-tight text-white">
                    6:30
                    <span className="text-lg text-zinc-400"> AM</span>
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-flame/25 to-purple/20 p-2.5 ring-1 ring-flame/30">
                  <Flame className="h-6 w-6 text-flame" aria-hidden />
                </div>
              </div>
              <div className="relative mt-4 flex items-center gap-2 text-xs text-zinc-400">
                <Users className="h-3.5 w-3.5 text-purple" aria-hidden />
                Synced with Alex
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900/50 px-3 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/15 ring-1 ring-purple/25">
                <AlarmClock className="h-5 w-5 text-teal" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">Morning flow</p>
                <p className="truncate text-xs text-zinc-500">
                  Soft ramp · Both devices
                </p>
              </div>
              <div className="rounded-full bg-teal/15 px-2 py-1 text-[10px] font-semibold text-teal">
                On
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
