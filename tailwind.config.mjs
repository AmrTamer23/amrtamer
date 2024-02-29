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
        "2xl": "1600px",
      },
      fontFamily: {
        default: ["Young Serif", "serif"],
        pt: ["PT Mono", "monospace"],
      },
    },
  },
  plugins: [typography()],
};
