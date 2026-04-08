import Link from "next/link";
import { Github, Instagram } from "lucide-react";

import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

function TwitterX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIconMap = {
  twitter: TwitterX,
  instagram: Instagram,
  github: Github,
} as const;

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
        <div className="flex w-full flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-zinc-500 sm:text-left">
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

          <ul className="flex items-center gap-4" aria-label="Social">
            {SOCIAL_LINKS.map((s) => {
              const Icon = socialIconMap[s.icon];
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 transition-colors hover:text-purple"
                    aria-label={s.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
