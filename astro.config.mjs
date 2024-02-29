import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import NudgeerSafe from "@onboardbase/nudgeer-safe";

const headers = new NudgeerSafe().astro();

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), vue()],
  headers,
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  adapter: node({
    mode: "standalone",
  }),
  output: "server",
});
