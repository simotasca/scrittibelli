import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: "black",
            hr: {
              borderColor: theme("colors.neutral[400]"),
            },
            'li > input[type="checkbox"]': {
              marginRight: "0.5rem",
            },
            ".footnotes": {
              borderTop: "1px solid black",
              marginTop: "6rem",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
