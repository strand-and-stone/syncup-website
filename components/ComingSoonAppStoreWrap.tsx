"use client";

import type { ReactNode } from "react";

import { APP_STORE_COMING_SOON_TOOLTIP } from "@/lib/constants";

type ComingSoonAppStoreWrapProps = {
  children: ReactNode;
  /** Short context for the accessible name, e.g. "App Store download". */
  ariaContext: string;
};

/**
 * Wraps disabled App Store visuals so hover/focus shows a tooltip (native disabled
 * controls don’t receive hover reliably).
 */
export function ComingSoonAppStoreWrap({
  children,
  ariaContext,
}: ComingSoonAppStoreWrapProps) {
  return (
    <span
      className="group/cs relative inline-flex cursor-not-allowed outline-none"
      tabIndex={0}
      aria-label={`${ariaContext} — ${APP_STORE_COMING_SOON_TOOLTIP}`}
    >
      <span className="pointer-events-none select-none opacity-50 grayscale-[0.35]">
        {children}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+0.625rem)] left-1/2 z-30 w-max max-w-[min(100vw-2rem,17rem)] -translate-x-1/2 translate-y-1 rounded-xl border border-white/12 bg-zinc-900/98 px-3.5 py-2.5 text-center text-[0.8125rem] font-medium leading-snug text-zinc-100 opacity-0 shadow-lg shadow-black/50 backdrop-blur-sm transition-[opacity,transform] duration-200 group-hover/cs:translate-y-0 group-hover/cs:opacity-100 group-focus-visible/cs:translate-y-0 group-focus-visible/cs:opacity-100"
      >
        {APP_STORE_COMING_SOON_TOOLTIP}
      </span>
    </span>
  );
}
