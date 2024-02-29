import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import NudgeerSafe from "@onboardbase/nudgeer-safe";
import vercel from "@astrojs/vercel/serverless";
const headers = new NudgeerSafe().astro();

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), vue()],

  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  adapter: vercel(),
  output: "server",
});
