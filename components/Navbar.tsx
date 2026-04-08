"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-white transition-colors hover:text-purple"
        >
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
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

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="#download"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple/90 to-teal/80 px-4 py-2 text-sm font-semibold text-bg shadow-glowPurple ring-1 ring-white/10 transition-[box-shadow] hover:shadow-glowTeal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Download App
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
