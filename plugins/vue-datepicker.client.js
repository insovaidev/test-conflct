
import { defineNuxtPlugin } from '#app'
import Datepicker from 'vue3-datepicker';

export default defineNuxtPlugin(nuxtApp => {
    // nuxtApp.vueApp.use(VueEternalLoading)
    nuxtApp.vueApp.component('DatePicker', Datepicker);
})