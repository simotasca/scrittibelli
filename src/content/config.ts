import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

const series = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    posts: z.array(reference("blog")),
  }),
});

export const collections = { blog, series };
