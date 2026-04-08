"use client";

import { motion } from "framer-motion";

import { STORE_LINKS } from "@/lib/constants";

const badgeEase = [0.22, 1, 0.36, 1] as const;

export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex flex-wrap items-center justify-center gap-4 sm:justify-start ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: badgeEase }}
    >
      <a
        href={STORE_LINKS.appStore}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download SyncUpAlarm on the App Store"
          width={180}
          height={60}
          className="h-[44px] w-auto sm:h-[52px]"
        />
      </a>
    </motion.div>
  );
}
