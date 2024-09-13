export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  devtools: { enabled: true },

  // app: {
  //   head: {
  //     link: [
  //       {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/css/main.css' },
  //     ],
  //     meta: [
  //       {
  //         name: 'viewport',
  //         content: 'width=device-width, initial-scale=1.0, user-scalable=no',
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

