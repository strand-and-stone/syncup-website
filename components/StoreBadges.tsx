"use client";

import { motion } from "framer-motion";

import { ComingSoonAppStoreWrap } from "@/components/ComingSoonAppStoreWrap";
import { APP_STORE_CTA_LIVE, STORE_LINKS } from "@/lib/constants";

const badgeEase = [0.22, 1, 0.36, 1] as const;

type StoreBadgesProps = {
  className?: string;
  /** `left`: centered below lg (stacked hero / tablet), start from lg+ (two-column hero). `center`: always centered. */
  align?: "left" | "center";
};

export function StoreBadges({
  className = "",
  align = "left",
}: StoreBadgesProps) {
  const justify =
    align === "center"
      ? "justify-center"
      : "justify-center lg:justify-start";

  return (
    <motion.div
      className={`flex w-full flex-wrap items-center gap-4 ${justify} ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: badgeEase }}
    >
      {APP_STORE_CTA_LIVE ? (
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
      ) : (
        <ComingSoonAppStoreWrap ariaContext="Download on the App Store">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt=""
            width={180}
            height={60}
            className="h-[44px] w-auto sm:h-[52px]"
            aria-hidden
          />
        </ComingSoonAppStoreWrap>
      )}
    </motion.div>
  );
}
