export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/main.css",
    "primevue/resources/themes/lara-dark-teal/theme.css"
  ],
  modules: [
    "nuxt-primevue",
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Tektur: [400],
        },
        display: "swap",
      },
    ],
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple:true,
    },
  },
});
