
<template>
    <div>
        <div :class="isDesktop ? 'des_container dt_success_page' : 'max_width_form'">
            <!-- App Bar -->
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div v-if="isDesktop" class="pt-4 pb-4">
                <div class="dt_back_post"><button @click="close_status_success" class="btn" aria-label="Close"><i class="fa fa-times"></i></button></div>
                </div>
                <div v-else class="p-4">
                    <div class="col-12 p-0 text-right">
                        <a rel="nofollow" href="javascript:void(0)" @click="close_status_success" class="cl_but" aria-label="Close">
                            <span class="fa fa-times c_p_success"></span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Body -->
            <div class="mt_80">
                <div :class="isMobile ? '' : 'bg-white'">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isMobile ? 'margin_below_app_bar' : ''">
                        <div class="text-center" :class="isMobile ? 'top_h_p_success' : 'dt-p-top'">
                            <span class="fa fa-check-circle color_size_p_success"></span>
                            <h1 class="mt-4 color_weight_p_success">Congratulations!</h1>
                            <p class="font_16 mt-2 p-3"> {{ message }} </p>
                        </div>
                        <div :class="isMobile ? 'nav nav_desktop' : 'dt-m-top'">
                            <div class="col mt-2 ps-1 pe-1" :class="isMobile ? '' : 'd-flex'">
                                <a v-if="!check_edit_post" rel="nofollow" href="javascript:void(0)" @click="goBack" class="btn btn-k24-primary form-control" :class="isMobile ? 'btn-height' : 'dt-btn-height me-2 '">
                                    {{ $t('new_text.create_more_post') }}
                                </a>
                                <a v-if="isMobile === false || check_edit_post" rel="nofollow" href="javascript:void(0)" @click="close_status_success" class="btn btn-k24-secondary form-control" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="Close">
                                    {{ $t('message.close') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isDesktop ? 'dt_success_body' : 'margin_below_app_bar'">
                <div class="text-center" :class="!isDesktop ? 'top_h_p_success' : ''">
                    <span class="fa fa-check-circle color_size_p_success"></span>
                    <h1 class="mt-4 color_weight_p_success">Congratulations!</h1>
                    <p class="font_16 mt-2 p-3"> {{ message }} </p>
                </div>
                <div class="nav nav_desktop">
                    <div class="col mt-2">
                        <a rel="nofollow" href="javascript:void(0)" @click="goBack" class="btn style_button form-control btn-lg">
                            {{ $t('new_text.create_more_post') }}
                        </a>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const message = ref(null);
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const route = useRoute(); // user route like (this.$route).
    const router = useRouter(); // user route like (this.$route).
    // const check_device = ref(helper.pc_or_mobile_device());

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const isMobile= ref(helper.m_or_d())
    const check_edit_post = useState('check_edit_post',()=> '')

    useHead({
        title: 'Post Success - Khmer24.com',
        meta: [
            // { name: 'apple-mobile-web-app-title', content: 'Post Success - Khmer24.com' },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: 'khmer24.com, Buy and Sell Everything In Cambodia' },
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
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            if (helper.check_auth_user() === false) { // check auth exist or not
                router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }

            // --- get message success from server when create new post_ads ---
            const p_message = pa_con && pa_con.message && pa_con.message.d_params ? pa_con.message.d_params : '';
            message.value = p_message && p_message.message ? p_message.message : '';
            if (!message.value) {
                router.push(localePath({ name: 'index' }));
            }

            // --- remove class modal-open ---
            helper.remove_class_modal_open();
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('message');
        helper.clear_params_make_con('store');
    })

    // ---- go back ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- close status success ----
    function close_status_success() {
        const p_store = pa_con && pa_con.store && pa_con.store.d_params ? pa_con.store.d_params : '';
        if (p_store.store) {
            router.replace(localePath({ name: 'account-store-id', params: { id: p_store.store } })); // go to manage store post.
        } else {
            router.replace(localePath({ name: 'account' })); // go to manage post.
        }
    }
</script>
