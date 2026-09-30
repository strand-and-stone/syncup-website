import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { getGuideBySlug, getGuideSlugs } from "@/lib/blog/guides";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: "Not found" };
  }

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/blog/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE.domain}/blog/guides/${slug}`,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${guide.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/twitter-image"],
    },
  };
}

export default async function BlogGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  const url = `${SITE.domain}/blog/guides/${slug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE.domain}/blog` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={[breadcrumbLd, faqLd]} />
      <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-teal">
          Home
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <Link href="/blog" className="hover:text-teal">
          Journal
        </Link>
        <span className="mx-2 text-zinc-700">/</span>
        <span className="text-zinc-400">Guide</span>
      </nav>

      <header className="mt-6 border-b border-white/10 pb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal">Pillar guide</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{guide.lede}</p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-white">The decision</h2>
        <p className="mt-4 text-base leading-7 text-zinc-300">{guide.decision}</p>
      </section>

      {guide.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-white">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-white">{guide.table.caption}</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[280px] text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                {guide.table.headers.map((header) => (
                  <th key={header} className="px-3 py-2 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="border-t border-white/5 px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-white">Read next</h2>
        <ul className="mt-4 space-y-4">
          {guide.posts.map((post) => (
            <li key={post.href} className="rounded-2xl border border-white/10 p-4">
              <Link href={post.href} className="font-semibold text-white hover:text-teal">
                {post.title}
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{post.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-white">FAQ</h2>
        <dl className="mt-4 space-y-6">
          {guide.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-semibold text-zinc-100">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-zinc-400 sm:text-base">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-2xl border border-teal/30 bg-teal/10 p-6">
        <h2 className="text-xl font-semibold text-white">Run the plan on both iPhones</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
          After you agree on the window, set it once in SyncUpAlarm instead of texting the time
          again tonight.
        </p>
        <p className="mt-4">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Download SyncUpAlarm
          </Link>
        </p>
      </section>
    </main>
  );
}
