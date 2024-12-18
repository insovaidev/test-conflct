import { defineNuxtPlugin } from '#app'

// --- impression scroll in list ---
import VueObserveVisibility from 'vue3-observe-visibility';

// --- new library google login ---
import vue3GoogleLogin from 'vue3-google-login'; // below is custom key google login
const gAuthOptions = { clientId: '828579838012-sgt66pc22lmnik74cli7q3jnf4t0ld2h.apps.googleusercontent.com', scope: 'profile email' }; // scope: 'profile email', prompt: 'select_account'

// --- custom key google map here ---
import VueGoogleMaps from '@fawmi/vue-google-maps'; // google map
const google_map = {
    load: {
        key: 'AIzaSyCOmxt7IlnEeNXCqEFN-YQUfY6V40hmxnY', // for production. AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg = if use in server, ip or localhost not working. just only file.
        // key: 'AIzaSyBvOslZaMKS9uXMtPnVghLHYSZqQzVAAQQ', // for testing.
        // language: 'de',
    },
};

// --- cookie ---
import { VueCookieNext } from 'vue-cookie-next'; // import { VueCookieNext } from 'https://unpkg.com/vue-cookie-next@1.0.0/dist/vue-cookie-next.esm-bundler.js';
VueCookieNext.config({ expire: '1d' });  // set default config on expired cookie 1 day.


export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueObserveVisibility)
    nuxtApp.vueApp.use(vue3GoogleLogin, gAuthOptions)
    nuxtApp.vueApp.use(VueGoogleMaps, google_map)
    nuxtApp.vueApp.use(VueCookieNext)
})