"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const backdropOpacity = useTransform(scrollY, [0, 80], [0.55, 0.92]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0.08, 0.18]);
  const blurPx = useTransform(scrollY, [0, 100], [10, 18]);
  const backdropFilter = useTransform(blurPx, (v) => `blur(${Math.round(v)}px)`);

  const background = useMotionTemplate`rgb(5 5 5 / ${backdropOpacity})`;
  const borderColor = useMotionTemplate`rgb(255 255 255 / ${borderOpacity})`;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      style={{
        backgroundColor: background,
        borderBottomColor: borderColor,
        backdropFilter,
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display shrink-0 text-lg font-semibold tracking-tight text-white transition-colors hover:text-purple"
          onClick={() => setMobileOpen(false)}
        >
          {SITE.name}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#download"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple/90 to-teal/80 px-3 py-2 text-xs font-semibold text-bg shadow-glowPurple ring-1 ring-white/10 transition-[box-shadow] hover:shadow-glowTeal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:px-4 sm:text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Download App
            </Link>
          </motion.div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-300 transition-colors hover:border-teal/40 hover:text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            id="mobile-nav"
            className="border-t border-white/10 bg-bg/95 px-4 py-4 backdrop-blur-xl md:hidden"
            aria-label="Mobile primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-teal"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
