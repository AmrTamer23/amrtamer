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
        primary: "var(--primary-color)",
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
        fira: ["Fira Code Variable", "monospace"],
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
  plugins: [
    animate,
    typography(),
    addDynamicIconSelectors(),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
    require("tailwindcss-motion"),
  ],
};

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");
