// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/main.css",'devextreme/dist/css/dx.light.css'],
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
  vite: {
    plugins: [{
        name: "no-treeshake",
        transform(_, id) {
            if (id.includes("ui/")) {
                return { moduleSideEffects: "no-treeshake" };
            }
        }
    }]
}
});
