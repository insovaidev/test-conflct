import en from './locales/en.json'
import km from './locales/km.json'
const version = process.env.LIBRARY_VERSION

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: true,
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3000
  // },

  hooks: {
    // 'pages:extend' (pages) {
    //   pages.push({
    //     name: '/index',
    //     path: '/index',
    //     file: '~/pages/index.vue'
    //   })
    //   pages.push({
    //     name: '/index.html',
    //     path: '/index.html',
    //     file: '~/pages/index.vue'
    //   })
    //   pages.push({
    //     name: '/en.html',
    //     path: '/en.html',
    //     file: '~/pages/index.vue'
    //   })
    //   pages.push({
    //     name: '/km.html',
    //     path: '/km.html',
    //     file: '~/pages/index.vue'
    //   })
    // }
  },

  css: [
    `~/public/${version}/my_css/premium_account.css`
  ],

  app: {
    head: {
      script: [
        {src: 'https://checkout.payway.com.kh/plugins/checkout2-0.js', defer: true}
      ]
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    'nuxt-jsonld',
  ],

  i18n: {
    // defaultLocale: '/',
    locales: [
      {
        code: '/',
        file: './locales/en.json',
      },
      {
        code: 'en',
        file: './locales/en.json',
      },
      {
        code: 'km',
        file: './locales/km.json',
      },
    ],
    legacy: true,
    defaultLocale: '/',
    fallbackLocale: 'en',
  },

  device: {
    refreshOnResize: true
  },

  // ---- add environment variable (instead of .env file) ----
  runtimeConfig: {
    public: {
      VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL,
      VUE_LINK: process.env.VUE_LINK,
      VUE_APP_API_URL_MOBI: process.env.VUE_APP_API_URL_MOBI,      
      VUE_APP_API_URL: process.env.VUE_APP_API_URL,
      VUE_APP_API_URL_ME: process.env.VUE_APP_API_URL_ME,
      VUE_APP_API_URL_POST_NEW: process.env.VUE_APP_API_URL_POST_NEW,
      VUE_APP_URL_POST_NEW: process.env.VUE_APP_URL_POST_NEW,     
      VUE_APP_API_URL_NOTIFICATION_NEW: process.env.VUE_APP_API_URL_NOTIFICATION_NEW,
      VUE_APP_API_URL_LIKE_NEW: process.env.VUE_APP_API_URL_LIKE_NEW,
      VUE_APP_API_URL_CHAT_NEW: process.env.VUE_APP_API_URL_CHAT_NEW,
      VUE_APP_API_TRACKING: process.env.VUE_APP_API_TRACKING,
      VUE_APP_API_URL_COMMENT: process.env.VUE_APP_API_URL_COMMENT,
      VUE_APP_API_URL_JOB: process.env.VUE_APP_API_URL_JOB,
      VUE_APP_API_URL_PAYMENT: process.env.VUE_APP_API_URL_PAYMENT,
      VUE_APP_APP_VERSION: process.env.VUE_APP_APP_VERSION,
      VUE_APP_API_URL_ISIGHTS: process.env.VUE_APP_API_URL_ISIGHTS,
      LIBRARY_VERSION: process.env.LIBRARY_VERSION,
      RECAPTCHA: process.env.SITEKEY,


      // condition hide or show and request timeout 
      DELAY_REQUEST: 20000,          // delay 20 second all axios retry
      HIDE_SHOW_VOICE: true,         // true = show,  false = hide, (hide or show voice chats)
      HIDE_SHOW_MAP: true,           // true = show,  false = hide, (hide or show map in chats)
      HIDE_SHOW_BUSINESS_CARD: true, // true = show,  false = hide, (hide or show business card)

      // condition check desktop or mobile view
      CHECK_DEVICE: 'M',          // check = check_device, M = mobile only, DT = desktop only
    }

  },

  // -- server CPU lack, maybe "Sourcemap: true" --
  // close error warning sourcemap in console client side and prevent build javascript memory lack.
  sourcemap: false,

  // -- prevent build warning --
  // builder: 'vite',
  vite: {
    build: {
      chunkSizeWarningLimit: 9000
    }
  },

  compatibilityDate: '2024-12-03'
})