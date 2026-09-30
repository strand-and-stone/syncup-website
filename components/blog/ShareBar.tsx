"use client";

import { useEffect, useState } from "react";

type ShareBarProps = {
  title: string;
  url: string;
};

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const message = `${title} ${url}`;
  const messagesHref = `sms:?&body=${encodeURIComponent(message)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (!navigator.share) {
      return;
    }
    try {
      await navigator.share({
        title,
        text: "Send this to your partner",
        url,
      });
    } catch {
      // User dismissed the share sheet.
    }
  }

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-white">Send this to your partner</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-zinc-100 transition hover:border-teal/50 hover:text-teal"
        >
          {copied ? "Link copied" : "Copy link"}
        </button>
        <a
          href={messagesHref}
          className="rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-zinc-100 transition hover:border-teal/50 hover:text-teal"
        >
          Messages
        </a>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-zinc-100 transition hover:border-teal/50 hover:text-teal"
        >
          X
        </a>
        {canNativeShare ? (
          <button
            type="button"
            onClick={nativeShare}
            className="rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-zinc-100 transition hover:border-teal/50 hover:text-teal"
          >
            Share
          </button>
        ) : null}
      </div>
    </div>
  );
}
