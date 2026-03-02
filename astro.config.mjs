import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/site.config";

export default defineConfig({
  site: siteConfig.origin,
  output: "static",
  adapter: cloudflare(),

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: ["j1i4xv0jcr.ufs.sh"],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
