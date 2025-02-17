import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  prefetch: true,
  site: "https://amrtamer.dev",

  vite: {
    plugins: [
      tailwindcss({
        applyBaseStyles: false,
      }),
    ],
  },

  adapter: node({
    mode: "standalone",
  }),
});
