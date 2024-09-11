export default defineNuxtConfig({
  devServer: {
    // host: '0.0.0.0',
    port: 5555
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-jsonld',
    '@nuxtjs/device',
    'nuxt-jsonld'
  ],
})