"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const WIDTH = 471;
const HEIGHT = 1024;
const ASPECT = WIDTH / HEIGHT;

export function HeroAppScreenshot() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[min(250px,78vw)] sm:max-w-[min(268px,38vw)] lg:mx-0 lg:max-w-[min(286px,30vw)]"
      style={{ aspectRatio: ASPECT }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      >
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-75 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 40% 25%, rgba(168,85,247,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(34,211,238,0.22), transparent 50%)",
          }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] border border-white/10 bg-zinc-950 shadow-glowPurple ring-1 ring-white/10">
          <Image
            src="/images/hero-app-screenshot.png"
            alt="SyncUp app on iPhone: next alarm, day selector, Shake challenge, weekly streak stats, and tab bar"
            width={WIDTH}
            height={HEIGHT}
            priority
            sizes="(max-width: 1024px) 78vw, 286px"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
