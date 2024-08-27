import { defineCollection, reference, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
    }),
  }),
  notes: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      location: z.string().optional(),
    }),
  }),
  series: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      posts: z.array(reference("blog")),
    }),
  }),
};
