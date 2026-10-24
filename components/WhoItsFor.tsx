"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Coffee, HeartHandshake, Sun } from "lucide-react";

import { WHO_ITS_FOR } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const decor = [HeartHandshake, Sun, Coffee] as const;

function TitleWithLinks({ title }: { title: string }) {
  if (title === "Long-distance & shift workers") {
    return (
      <>
        <Link
          href="/blog/guides/long-distance-mornings"
          className="underline decoration-white/15 underline-offset-4 transition-colors hover:decoration-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
        >
          Long-distance
        </Link>{" "}
        &{" "}
        <Link
          href="/blog/shift-work-shared-morning-routine"
          className="underline decoration-white/15 underline-offset-4 transition-colors hover:decoration-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
        >
          shift workers
        </Link>
      </>
    );
  }

  if (title === "Roommates & friends") {
    return (
      <Link
        href="/blog/roommate-quiet-hours-agreement"
        className="underline decoration-white/15 underline-offset-4 transition-colors hover:decoration-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
      >
        {title}
      </Link>
    );
  }

  return title;
}

export function WhoItsFor() {
  return (
    <section
      className="relative border-y border-white/5 py-24 sm:py-28"
      aria-labelledby="who-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/35 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-flame">
            Who it’s for
          </p>
          <h2
            id="who-heading"
            className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Built for people who actually{" "}
            <span className="text-teal">like</span> each other.
          </h2>
        </motion.div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {WHO_ITS_FOR.map((item, i) => {
            const Icon = decor[i] ?? HeartHandshake;
            return (
              <motion.li
                key={item.title}
                className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-bg p-8 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/15 ring-1 ring-purple/25">
                  <Icon className="h-7 w-7 text-teal" aria-hidden />
                </div>
                <h3 className="font-display mt-6 text-xl font-semibold text-white">
                  <TitleWithLinks title={item.title} />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
