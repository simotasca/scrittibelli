import type { CollectionEntry } from "astro:content";

export type PublicBlogPost = {
  title: string;
  description: string;
  pubDate: Date;
  draft?: false;
};
export type BlogRefined =
  | PublicBlogPost
  | { title?: string; description?: string; pubDate?: Date; draft: true };

export type PublicBlogCollectionEntry = CollectionEntry<"blog"> & {
  data: PublicBlogPost;
};
