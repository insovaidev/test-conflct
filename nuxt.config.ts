// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    'nuxt-jsonld'
  ],
  gtag: {
    id: 'G-FFQ97LH7Y2',
    config: {
      // Additional configuration options can be added here
    },
    debug: true, // Set to false in production
  },
})

