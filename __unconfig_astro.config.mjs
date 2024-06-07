
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
const __unconfig_default =  defineConfig({
  integrations: [tailwind(), vue()],
  output: "static",
  prefetch: {
    prefetchAll: true,
  },
});

if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;