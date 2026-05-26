export type BlogFrontmatter = {
  title: string;
  description: string;
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
  content: string;
  readingTimeMinutes: number;
};
