export type BlogFrontmatter = {
  title: string;
  description: string;
  /** On-page heading when it differs from the SEO title. */
  h1?: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  keywords: string[];
  schema: string[];
  related: string[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  h1: string;
  content: string;
  readingTimeMinutes: number;
};
