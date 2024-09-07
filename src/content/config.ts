import { defineCollection, reference, z } from "astro:content";
import type { BlogRefined } from "./types";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        pubDate: z.coerce.date().optional(),
        draft: z.boolean().optional(),
      })
      .superRefine((arg, ctx): arg is BlogRefined => {
        if (!arg.draft && (!arg.title || !arg.description || !arg.pubDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "only draft articles can omit metadata",
          });
        }
        return z.NEVER;
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
