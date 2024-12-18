
<template>
    <div class="min_h">
        <!-- App Bar -->
        <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-1 l_h_con_title">
                    <p class="m-0 name_style truncate_wrap"> {{ $t('lng.send_code') }} </p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 dt-mt-75 " :class="isMobile ? 'no_padding' : 'form-login p-3 pt-0 rounded border'">
            <div v-if="!isMobile" class="dt_title_header mb-3 text-center"><h1>{{ $t('lng.send_code') }}</h1></div>
            <div class="large-12 columns font_18 tag-con-pad">
                {{ text }}
            </div>

            <div class="text-center">
                <p class="mt-3 font_32 font_bold" style="color: #00A1DE;"> {{ code }} </p>
            </div>

            <div class="nav d-none">
                <div class="col p-2">
                    <a rel="nofollow" :href="'sms:'+phone_number+'?&body='+code" class="btn custom_btn_ btn-primary form-control"> {{ $t('lng.send_code') }} </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.

    const isDesktop = helper.check_is_desktop(); // check userAgent
    const isMobile= ref(helper.m_or_d())
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const phone_number = ref(null);
    const code = ref(null);
    const text = ref(null);
    const text_error = useState('text_error',()=>'')
    const is_reload = useState('is_reload', ()=> 0)

    const meta_title_max_code = useState('meta_title_max_code', () => 'khmer24.com, max sent code, Buy and Sell Everything In Cambodia');

    if(process.server){ 
        await reload();
    }

    useHead({
        title: meta_title_max_code.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_max_code.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Max Code, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },

            { property: 'og:title', content: meta_title_max_code.value },
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
            text_error.value = helper.get_params_make_condition(); // get data params condition.
            const pa_con = text_error.value 
            const auth_log = pa_con && pa_con.auth_status_302 && pa_con.auth_status_302.d_params && pa_con.auth_status_302.d_params ? pa_con.auth_status_302.d_params : '';

            phone_number.value = auth_log && auth_log.phone ? auth_log.phone : '';
            code.value = auth_log && auth_log.code ? auth_log.code : '';
            text.value = auth_log && auth_log.message ? auth_log.message : '';
            // --- remove class modal-open ---
            helper.remove_class_modal_open();
            // --- clear params condition ---
            helper.clear_params_make_con('auth_status_302');
            if(is_reload.value > 0){
                is_reload.value = 0
                router.push(localePath({ name: 'index' }))
            }
        }
    })

    async function  reload(){
        is_reload.value +=1
    }

    // ---- click back one page ----
    function goBack() { router.push(localePath({ name: 'index' })); }
</script>


