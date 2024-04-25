import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        textBase: "var(--text-color)",
        btnBase: "var(--btn-color)",
      },
      screens: {
        xs: "480px",
        sm: "48em",
        md: "768px",
        lg: "85.375em",
        xl: "120em",
        "2xl": "160em",
      },
      fontFamily: {
        fira: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [typography()],
};
