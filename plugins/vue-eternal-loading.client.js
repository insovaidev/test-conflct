
import { defineNuxtPlugin } from '#app'
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';

// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use(VueEternalLoading)
//     // nuxtApp.vueApp.use('VueEternalLoading', VueEternalLoading)
// })

export default defineNuxtPlugin(nuxtApp => {
    // nuxtApp.vueApp.use(VueEternalLoading)
    nuxtApp.vueApp.component('VueEternalLoading', VueEternalLoading);
})