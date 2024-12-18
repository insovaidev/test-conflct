
<template>
    <div>
        <div class="mt_80 min_h ">
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col text-center l_h_con_title">
                        <p class="name_style truncate_wrap m-0 text-center">Safety Tips</p>
                    </div>
                    <div class="s_w_app_icon"></div>
                </div>
            </div>
            <div class="p-3" :class="isMobile ? 'pt-5' : 'form-login border rounded'">
                <div class="safety_tips" :class="isMobile ? 'pt-0' : ''">
                    <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="me-2" width="45" height="45">
                    <strong>ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ<br/>Safety Tips for Buyers</strong>
                </div>
                <ol :class="isMobile ? '' : 'start_end'">
                    <li class="mb-2">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ<br/>Do not send money before receiving the goods</li>
                    <li class="mb-2">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ<br/>Check the item before you buy</li>
                    <li class="mb-2">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ<br/>Payment after receiving the goods</li>
                    <li>ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព<br/>Meet the seller at a safe location</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {event, pageview} from "vue-gtag";
    import helper from "/helper";
    const runtime_config = useRuntimeConfig();
    const app_config = runtime_config.public;

    definePageMeta( {layout: "default"} );
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const isMobile= ref(helper.m_or_d())
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = app_config.LIBRARY_VERSION;

    // --- meta variable ---
    const meta_title_safety_tips = useState('meta_title_safety_tips', () => 'Safety Tips - Khmer24.com');

    useHead({
        title: meta_title_safety_tips.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_safety_tips.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, safety tips, tips, tips for buying' },
            { name: 'description', content: 'Buy, Sell, Safety tips by khmer24, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website.' },

            { property: 'og:title', content: meta_title_safety_tips.value },
            { property: 'fb:app_id', content: '217361691621555' },
            { property: 'og:site_name', content: 'www.khmer24.com' },
            { property: 'og:url', content: 'https://www.khmer24.com/en/' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg' },
            { property: 'og:image:width', content: '600' },
            { property: 'og:image:height', content: '600' },
            { property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.' },
        ]
    })

    onMounted(() => {
        if (process.client) {
            track_google_analytics();
        }
    })

    // ---- track on google analytic ----
    function track_google_analytics () {
        let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
            page_title: meta_title_safety_tips.value,
            page_location: page_location,
            page_path: page_path,
        };
        // -- event on page --
        event('safety_tips', data);
        // -- page_view --
        pageview(data);
    }

   function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
</script>
