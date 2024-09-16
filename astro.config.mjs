import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";

// https://astro.build/config
export default defineConfig({
  site: "https://scrittibelli.onrender.com",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: { remarkPlugins: [remarkBreaks] },
});
