import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-10-05",
  devtools: { enabled: false },

  build: {
    transpile: ["vuetify"],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  pinia: {
    storesDirs: ["./store/**"],
  },
});
