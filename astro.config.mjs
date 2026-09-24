import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/site.config";

export default defineConfig({
  site: siteConfig.origin,
  output: "static",

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Quick `cloudflared tunnel --url` hostnames are random per run; a
      // leading dot allows every trycloudflare.com subdomain.
      allowedHosts: [".trycloudflare.com"],
    },
  },

  // /projects and /work were folded into the homepage. Cloudflare serves
  // real 301s from public/_redirects; these meta-refresh pages are the fallback.
  redirects: {
    "/projects": "/#work",
    "/work": "/#experience",
  },

  image: {
    domains: ["j1i4xv0jcr.ufs.sh"],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
