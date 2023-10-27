// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/main.css"],
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
});
