// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  modules: [
    "nuxt-server-utils",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt" 
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  
});
