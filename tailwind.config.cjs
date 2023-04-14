/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "xs": "480px",
      },
      minWidth: {
        "fold": "280px", // Galaxy Fold
      },
    },
  },
  plugins: [
    ({ addBase, theme }) => {
      addBase({
        "a": {
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
