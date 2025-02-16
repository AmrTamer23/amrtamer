import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "static",
  prefetch: true,

  vite: {
    plugins: [
      tailwindcss({
        applyBaseStyles: false,
      }),
    ],
  },
});
