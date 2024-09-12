export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  devtools: { enabled: true },

  // app: {
  //   head: {
  //     meta: [
  //       {
  //         name: 'viewport',
  //         content: 'width=device-width, initial-scale=0.0',
  //       },
  //     ],
  //   },
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-jsonld',
    '@nuxtjs/device',
    'nuxt-jsonld'
  ],

  compatibilityDate: '2024-09-12',
})