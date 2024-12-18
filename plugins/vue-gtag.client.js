
import { defineNuxtPlugin } from '#app'
import VueGtag from "vue-gtag"; // google analytic
import helper from "/helper";


// --- custom vue-Gtag here ---
const mobile = {
    includes: [
        { id: 'G-HQCZF0Z775' },
        { id: 'G-RDZP2SK7F0' },
    ]
};
const desktop = {
    includes: [
        { id: 'G-084PH1CD1X' },
        { id: 'G-RDZP2SK7F0' },
    ]
};


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueGtag, helper.m_or_d() ? mobile : desktop)
})