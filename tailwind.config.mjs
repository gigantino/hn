/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // Support both system preference AND manual override via class
  darkMode: ["variant", [
    "@media (prefers-color-scheme: dark) { &:not(.light *) }",
    "&:is(.dark *)",
  ]],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      minWidth: {
        fold: "280px",
      },
    },
  },
  plugins: [
    ({ addBase, theme }) => {
      addBase({
        a: {
          color: theme("colors.blue.500"),
          cursor: "pointer",
        },
        "a:hover": {
          textDecoration: "underline",
        },
      });
    },
  ],
};
