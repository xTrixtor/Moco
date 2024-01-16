export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/main.css",
    "devextreme/dist/css/dx.light.css",
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
  vite: {
    plugins: [
      {
        name: "no-treeshake",
        transform(_, id) {
          if (id.includes("ui/")) {
            return { moduleSideEffects: "no-treeshake" };
          }
        },
      },
    ],
  },
});
