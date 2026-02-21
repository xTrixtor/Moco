// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ],
  css: ['~/assets/css/main.css'],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  }
})
