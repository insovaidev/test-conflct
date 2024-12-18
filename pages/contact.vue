
<template>
    <div>
        <div class="mt_80 min_h max_width_form">
            <div :class="isDesktop ? 'des_container dt_contact_page mt-3' : ''" >
                <!-- App Bar -->
                <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                    <div class="_div_nav bg_app_bar_header_">
                        <div @click="goBack" class="_pad_col_icon">
                            <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                                <i class="ion-android-arrow-back font_click_back"></i>
                            </button>
                        </div>
                        <div class="col text-center l_h_con_title">
                            <p class="name_style truncate_wrap m-0 text-center">{{ $t('message.contact_us') }}</p>
                        </div>
                        <div class="s_w_app_icon"></div>
                    </div>
                </div>

                <!-- error connection -->
                <div v-if="connection_error" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar">
                    <div class="no_more_result p-2">
                        <div class="p_bg_status">
                            <span class="fas fa-wifi size_icon_status"></span>
                            <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                            <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                            <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                        </div>
                    </div>
                </div>
                <template v-else>
                    <div v-if="loading_field" class="loading_back_ground" id="open_or_close_loading_field">
                        <div class="loading_img">
                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                        </div>
                    </div>
                    <div v-else :class="isDesktop ? 'dt_border dt_radius' : 'margin_below_app_bar mt-5'" class="">
                        <div v-if="!isMobile" class="fs-5 mb-3 fw-semibold"> {{ $t('message.contact_us') }} </div>
                        <div class="bg-tab-contact bg-white" :class="isMobile ? '' : 'rounded'">
                            <!-- Phone number -->
                            <div v-if="info_contact && info_contact.phone" class="form-group border_bottom_solid P_contact_pad">
                                <i aria-hidden="true" class="fa fa-phone font_20px mr-3 mt-1 text_grey"></i>
                                <p class="m-0">
                                    <a rel="nofollow" v-for="p in info_contact.phone" :key="p" v-bind:href="'tel:'+p.phone" class="P_contact_font">
                                        {{ p.phone + '&nbsp; &nbsp;' }}
                                    </a>
                                </p>
                            </div>
                            <!-- Email -->
                            <div v-if="info_contact && info_contact.email" class="form-group border_bottom_solid P_contact_pad">
                                <i aria-hidden="true" class="fa fa-envelope font_20px mr-3 mt-1 text_grey"></i>
                                <p id="email" class="m-0 break_word">
                                    <a rel="nofollow" v-bind:href="'mailto:'+info_contact.email" class="P_contact_font">
                                        {{ info_contact.email }}
                                    </a>
                                </p>
                            </div>
                            <!-- show time close or open -->
                            <div class="form-group border_bottom_solid open_or_close_time cur_sur" data-toggle="collapse"
                                aria-expanded="false" data-target="#open_or_close_time" aria-controls="open_or_close_time">
                                <i aria-hidden="true" class="far fa-clock font_20px mr-3 mt-1 text_grey"></i>
                                <p class="m-0 P_contact_open_store">
                                    <b :class="check_close_or_open === 'Close' ? 'text-danger font_17' : 'text-success font_17'">
                                        {{ language === 'en' ? check_close_or_open : (check_close_or_open === 'Close' ? $t('message.close') : $t('message.open')) }}
                                    </b>
                                    <b class="font_17">&nbsp;.&nbsp;</b>{{ text_close_or_open }}
                                </p>
                                <span class="fas fa-caret-down icon_drop_down"></span>
                            </div>
                            <div v-if="info_contact && info_contact.business_hours" class="collapse" id="open_or_close_time">
                                <div class="card card-body pad_check_date" :class="isMobile ? '' : 'border-0'">
                                    <div v-for="(d, index) in info_contact.business_hours" :key="index" :class="current_date === index ? 'style_flex active_bold' : 'style_flex'">
                                        <p class="col-5 m-0 p-0">{{ language === 'en' ? d.title.en : d.title.km }}</p>
                                        <p class="col-7 m-0 p-0 text-right">{{ d.value }}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- address -->
                            <div v-if="info_contact && info_contact.address" class="form-group border_bottom_solid style_flex P_contact_loc">
                                <i aria-hidden="true" class="fas fa-map-marker-alt font_20px mr-3 mt-1 text_grey"></i>
                                <p class="m-0"> {{ info_contact.address }} </p>
                            </div>
                            <!-- show map -->
                            <div v-if="info_contact && info_contact.map" class="form-group div-contact-infor P_contact_loc">
                                <a rel="nofollow noopener" v-bind:href="'https://maps.google.com/maps?q='+info_contact.map.x+','+info_contact.map.y+'&'+info_contact.map.z" target="_blank" class="btn form-control btn_show_map">
                                    <b><i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp; {{ $t('message.show_map') }}</b>
                                </a>
                            </div>
                        </div>
                        <template v-if="!isDesktop"><br></template>
                        <!-- bottom navigation -->
                        <div v-if="!isMobile">
                            <div class="d-flex">
                                <div class="col pr-1">
                                    <a rel="nofollow" v-if="info_contact && info_contact.email" v-bind:href="'mailto:'+info_contact.email" class="btn form-control btn_sms btn-k24-primary text-white"  :class="isMobile ? 'btn-height': 'dt-btn-height'">
                                        <i class="fa fa-envelope font_18 mr-1 mt-1"></i>
                                        {{ $t('lng.email') }}
                                    </a>
                                </div>
                                <div class="col pl-1">
                                    <button @click="dialog_phone_number('call')" class="btn form-control btn_call btn-k24-secondary text-white"  :class="isMobile ? 'btn-height': 'dt-btn-height'" id="btn_call">
                                        <i class="fa fa-phone font_17 mr-1"></i>
                                        {{ $t('message.call') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="nav mg_nav_contact_us">
                                <div class="col pr-1">
                                    <a rel="nofollow" v-if="info_contact && info_contact.email" v-bind:href="'mailto:'+info_contact.email"  :class="isMobile ? 'btn-height': 'dt-btn-height'" class="btn form-control btn_sms btn-k24-primary text-white">
                                        <i class="fa fa-envelope font_18 mr-1 mt-1"></i>
                                        {{ $t('lng.email') }}
                                    </a>
                                </div>
                                <div class="col pl-1">
                                    <button @click="dialog_phone_number('call')" class="btn form-control btn_call btn-k24-secondary text-white"  :class="isMobile ? 'btn-height': 'dt-btn-height'" id="btn_call">
                                        <i class="fa fa-phone font_17 mr-1"></i>
                                        {{ $t('message.call') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Modal show phone number -->
                <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="modal_show_phone_or_sms" tabindex="-1" role="dialog">
                    <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                        <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                            <div :class="isMobile ? ' modal_bottom_screen' : ''">
                                <div class="option_selected">
                                    <div class="border_bottom u_show_ph_number">
                                        <p id="label_phone_or_sms" class="modal-title font_13">
                                            {{ $t('message.call') }}
                                        </p>
                                    </div>
                                    <div v-if="info_contact && info_contact.phone" class="modal-body p-0">
                                        <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                                            <li v-for="p_n in info_contact.phone" :key="p_n" class="cl_ripple">
                                                <a rel="nofollow" aria-label="phone" class="full_field_a_tag border_top color_reason flex_imp" :href="'tel:'+p_n.phone">
                                                    <div class="col _flex_ p-0 mt-1">
                                                        <img :src="p_n.icon" class="img_p_n" alt="icon">
                                                        <p class="u_show_ph_mg">{{ p_n.phone }}</p>
                                                    </div>
                                                    <div class="col-2 p-0 text-right">
                                                        <i aria-hidden="true" class="fa fa-phone call_icon_modal"></i>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="a_cancel_btn_modal_bg">
                                    <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                        <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Modal show phone number -->
            </div>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    import {event, pageview} from "vue-gtag";
    definePageMeta( {layout: "default"} );
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig();           // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const current_date = ref('');
    const localePath = useLocalePath();
    const { locale } = useI18n();

    const isMobile= ref(helper.m_or_d())

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(locale);

    const info_contact = ref('');
    const check_close_or_open = ref('');
    const text_close_or_open = ref('');

    const loading_field = ref(false);
    const connection_error = ref(false);

    const meta_title_p_con = useState('meta_title_p_con', () => 'Contact Us - Khmer24.com');
    

    useHead({
        title: meta_title_p_con.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_p_con.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Contact us, Contact page, Contact, khmer24 contact, Contact khmer24' },
            { name: 'description', content: 'Buy, Sell, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website.' },

            { property: 'og:title', content: meta_title_p_con.value },
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
            compute_check_date();
            track_google_analytics();
        }
    })

    // ---- track on google analytic ----
    function track_google_analytics () {
        let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
            page_title: meta_title_p_con.value,
            page_location: page_location,
            page_path: page_path,
        };
        // -- event on page --
        event('contact', data);
        // -- page_view --
        pageview(data);
    }

    // ---- go back ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }

    // ---- click show phone numbers user for Call or SMS ----
    function dialog_phone_number() { $('#modal_show_phone_or_sms').modal('show'); }
    // ---- click button email ----
    function click_email() { $('#email a').trigger('click'); }

    // ---- click retry ----
    function retry() {
        if(window.navigator.onLine) {
            compute_check_date();
        }
    }
    // --- compute date ---
    function compute_check_date() {
        if (window.navigator.onLine) { // if connection online
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let now = new Date();
            let hh = now.getHours(); let mm = now.getMinutes();
            if (parseInt(hh) < 10) hh = '0'+hh;
            if (parseInt(mm) < 10) mm = '0'+mm;
            let day_text = days[now.getDay()].toLowerCase();   // get current day
            current_date.value = day_text;
            // const cur_minute = hh+mm; // get current hours tor with minute
            const cur_minute = hh.toString()+mm.toString(); // get current hours tor with minute

            // -- close error connection --
            connection_error.value = false; // close connection error

            loading_field.value = true;

            $fetch('/'+config.LIBRARY_VERSION+'supports/contact.json').then(res => {
                info_contact.value = res;
                $.each(res.business_hours, (k, v) => {
                    if (day_text.toLowerCase() === k && day_text.toLowerCase() !== 'sun') { // if in current day (mon -> sat)
                        // console.log(v);
                        const p = v.open.split(':');
                        const c = v.close.split(':');
                        let open = p[0] + p[1];
                        let close = c[0] + c[1];
                        // console.log(cur_minute, open, close)
                        // console.log(hh, mm)
                        if (cur_minute <= open && cur_minute <= close) { // if in the current time
                            // console.log('1');
                            // check_close_or_open.value = "Open";
                            check_close_or_open.value = "Close";
                            text_close_or_open.value = language.value === 'en' ? 'Open 8:00 AM' : 'បើក 8:00 AM';
                        } else { // not in current time
                            // console.log('2'); 
                            if (cur_minute < open) {            // if smaller than current time
                                check_close_or_open.value = 'Open';
                                text_close_or_open.value = language.value === 'en' ? 'Open 8:00 AM' : 'បើក 8:00 AM';

                            } else if (cur_minute > open && cur_minute < close) {    // if bigger than current time
                                // console.log(close)
                                check_close_or_open.value = 'Open';
                                if (day_text.toLowerCase() === 'sat') {  // if saturday must to show at monday direct
                                    text_close_or_open.value = language.value === 'en' ? 'Close 12:00 PM' : 'បិទ 12:00 PM';
                                } else {
                                    let date_now = new Date();
                                    date_now.setDate(date_now.getDate() + 1); // add more 1 day to current date.
                                    let get_next_day = days[date_now.getDay()]; // add one day to get text
                                    let check_text_localize = language.value === 'en' ? 'Close 5:00 PM' : 'បិទ 5:00 PM';
                                    text_close_or_open.value = check_text_localize; 
                                }
                            }else if (cur_minute >= close && day_text.toLowerCase() !== 'sat'){
                                check_close_or_open.value = "Close";
                                let date_now = new Date();
                                date_now.setDate(date_now.getDate() + 1); // add more 1 day to current date.
                                let get_next_day = days[date_now.getDay()]; // add one day to get text
                                let check_text_localize = language.value === 'en' ? 'Open 8:00 AM ' : 'បើក 8:00 AM ';
                                text_close_or_open.value = check_text_localize + get_next_day.toUpperCase();
                            }else if (day_text.toLowerCase() === 'sat'){
                                check_close_or_open.value = "Close";
                                text_close_or_open.value = language.value === 'en' ? 'Open 8:00 AM MON' : 'បើក 8:00 AM MON'; 
                            }
                        }
                        // console.log(open);
                        // console.log(close);
                    } else if (day_text.toLowerCase() === 'sun') {
                        // console.log('sunday');
                        check_close_or_open.value = "Close";
                        text_close_or_open.value = language.value === 'en' ? 'Open 8:00 AM MON' : 'បើក 8:00 AM MON';
                    }
                });

                // -- script collapse --
                setTimeout(function () { $('.collapse').collapse({ toggle: false }); },500);

            }).catch(error => {
                if (!error.response) {
                    loading_field.value = false;        // close loading
                    connection_error.value = true;      // set to false when connection online
                }
            }).finally(() => (loading_field.value = false));

        } else {
            loading_field.value = false;         // close loading
            connection_error.value = true;       // set to false when connection online
        }
    }
</script>

