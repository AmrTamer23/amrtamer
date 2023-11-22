/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        rich_black: {
          DEFAULT: "#050517",
          100: "#010104",
          200: "#020208",
          300: "#03030d",
          400: "#040411",
          500: "#050517",
          600: "#161664",
          700: "#2727b4",
          800: "#6060dc",
          900: "#b0b0ee",
        },
        flame: {
          DEFAULT: "#cf5c36",
          100: "#2a120a",
          200: "#542414",
          300: "#7e361e",
          400: "#a84829",
          500: "#cf5c36",
          600: "#d87d5e",
          700: "#e29d86",
          800: "#ecbeaf",
          900: "#f5ded7",
        },
        sunset: {
          DEFAULT: "#efc88b",
          100: "#422c09",
          200: "#855912",
          300: "#c7851b",
          400: "#e6a948",
          500: "#efc88b",
          600: "#f2d3a2",
          700: "#f5deb9",
          800: "#f9e9d0",
          900: "#fcf4e8",
        },
        vanilla: {
          DEFAULT: "#f4e3b2",
          100: "#4a3a0b",
          200: "#947415",
          300: "#deaf20",
          400: "#eac969",
          500: "#f4e3b2",
          600: "#f6e9c2",
          700: "#f8efd1",
          800: "#fbf4e1",
          900: "#fdfaf0",
        },
        platinum: {
          DEFAULT: "#d3d5d7",
          100: "#292b2d",
          200: "#51565a",
          300: "#7a8187",
          400: "#a7abb0",
          500: "#d3d5d7",
          600: "#dddee0",
          700: "#e5e7e8",
          800: "#eeefef",
          900: "#f6f7f7",
        },
      },
    },
  },
  plugins: [],
};
