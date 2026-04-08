import Link from "next/link";

import { FOOTER_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8">
        <p className="max-w-xl text-center text-xs leading-relaxed text-zinc-600">
          We may use Google Analytics and Google Tag Manager on this site to
          understand traffic in aggregate. Details are in our{" "}
          <Link href="/privacy" className="text-teal hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-center text-sm text-zinc-500">
          © {SITE.year} {SITE.name}
          <span className="mx-2 text-zinc-700" aria-hidden>
            ·
          </span>
          <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {FOOTER_LINKS.map((link, i) => (
              <span
                key={link.href}
                className="inline-flex items-center gap-x-2"
              >
                {i > 0 && (
                  <span className="text-zinc-700" aria-hidden>
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-teal"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </span>
        </p>
      </div>
    </footer>
  );
}
