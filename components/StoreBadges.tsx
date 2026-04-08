"use client";

import { motion } from "framer-motion";

import { STORE_LINKS } from "@/lib/constants";

const badgeEase = [0.22, 1, 0.36, 1] as const;

export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex flex-wrap items-center justify-center gap-4 sm:gap-5 ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: badgeEase }}
    >
      <a
        href={STORE_LINKS.appStore}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          width={160}
          height={54}
          className="h-11 w-auto sm:h-12"
        />
      </a>
      <a
        href={STORE_LINKS.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt="Get it on Google Play"
          width={646}
          height={250}
          className="h-14 w-auto sm:h-16"
        />
      </a>
    </motion.div>
  );
}
