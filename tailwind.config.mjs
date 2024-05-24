import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,vue,astro}",
    "./components/**/*.{ts,tsx,vue,astro}",
    "./app/**/*.{ts,tsx,vue,astro}",
    "./src/**/*.{ts,tsx,vue,astro}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    fontSize: {
      sm: "var(--fs-sm)",
      base: "var(--fs-base)",
      md: "var(--fs-md)",
      lg: "var(--fs-lg)",
      xl: "var(--fs-xl)",
      "2xl": "var(--fs-2xl)",
      "3xl": "var(--fs-3xl)",
    },
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
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, typography(), addDynamicIconSelectors()],
};
