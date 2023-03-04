/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
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
