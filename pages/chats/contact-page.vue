
<template>
    <div>
        <div :class="isDesktop ? 'des_container mt-3 dt_con_page_profile' : 'min_h mt_80 max_width_form'">
            <!-- App Bar -->
            <div v-if="!isDesktop" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_ box_shadow_app_bar">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-1 l_h_con_title">
                        <p class="name_style truncate_wrap mb-0 text-white"> {{ $t('message.contact') }} </p>
                    </div>
                </div>
            </div>

            <!-- error connection -->
            <div v-if="connection_error_contact_page" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar">
                <div class="no_more_result p-2">
                    <div class="p_bg_status">
                        <span class="fas fa-wifi size_icon_status"></span>
                        <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                        <button @click="retry()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                    </div>
                </div>
            </div>
            <template v-else>
                <!-- loading -->
                <div v-if="loading" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isDesktop ? '' : 'margin_below_app_bar'">
                    <div class="bg-white">
                        <div class="c_p_pad_info_store">
                            <div class="animated-background co-ta-p-width"></div>
                            <div class="col c_p_pad_title mt-2">
                                <div class="animated-background mb-2 co-ta-p-sub1"></div>
                                <div class="animated-background co-ta-p-sub2"></div>
                            </div>
                            <div class="col-2 middle_item">
                                <div class="animated-background co-ta-p-sub3"></div>
                            </div>
                        </div>
                        <div v-for="index in 4" :key="index" class="form-group border_bottom_solid c-p-div-contact-infor co-ta-p-sub4">
                            <div class="animated-background mt-1 mb-2 co-ta-p-sub5"></div>
                            <div class="animated-background co-ta-p-sub6"></div>
                        </div>
                    </div>
                </div>
                <div v-else :class="isMobile ? 'mt-5' : ''">
                    <!-- Profile User -->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isDesktop ? '' : 'margin_below_app_bar'">
                        <div class="bg_parent_color cur_sur">
                            <div class="c_p_pad_info_store">
                                <div @click="show_detail_user_post(detail_user.username)" class="p-0 cl_ripple cur_sur">
                                    <div class="width_div height_div position_relative">
                                        <!--<a rel="nofollow" :href="detail_user && detail_user.photo ? detail_user.photo.url : empty_img_user" data-fancybox>-->
                                        <img :src="detail_user && detail_user.photo ? detail_user.photo.large.url : empty_img_user"
                                            :alt="detail_user ? detail_user.name : ''" class="c_p_img_user_contact bg_reload_img mt-1" @error="imageUrlAlt_profile">
                                        <!--</a>-->
                                        <div v-if="detail_user && detail_user.online_status.is_active" class="c_p_badge_online"></div>
                                    </div>
                                </div>
                                <div @click="show_detail_user_post(detail_user.username)" class="col c_p_pad_title cl_ripple cur_sur">
                                    <p class="truncate c_p_p1">
                                        <b> {{ detail_user ? detail_user.name : '' }} </b>
                                        <i v-if="detail_user && detail_user.is_verify" class="icon-check verify_icon_big text-white"></i>
                                    </p>
                                    <p class="truncate c_p_p2">
                                        {{ detail_user && detail_user.online_status ? detail_user.online_status.last_active : '' }}
                                    </p>
                                </div>
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" @click="dialog_phone_number('call')" class="middle_item cl_ripple cur_sur icon-call-right">
                                    <!--<p class="m-0 pad_status text-danger font_14 font_bold"> ដោះប្លុក </p>-->
                                    <i class="ion-android-call c_p_icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content Tab -->
                    <div>
                        <div class="tab-content">
                            <div class="c-p-bg-tab-contact">
                                <div v-if="detail_user && detail_user.username" class="form-group border_bottom_solid c-p-div-contact-infor">
                                    <small class="form-text text_grey font_13">{{ $t('message.username') }}</small>
                                    <p class="recent_history m-0">{{ detail_user.username }}</p>
                                </div>
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" class="form-group border_bottom_solid c-p-div-contact-infor">
                                    <small class="form-text text_grey font_13">{{ $t('message.phone') }}</small>
                                    <p class="recent_history m-0">
                                        <!--{{ detail_user.contact.phone.join(" , ") }}-->
                                        <template v-for="p_num in detail_user.contact.phone" :key="p_num">
                                            <a rel="nofollow" @click="tracking_manual('call')" class="parent_color cur_sur" v-if="show_phone_number" v-bind:href="'tel:'+p_num">{{ p_num }} &nbsp;&nbsp;</a>
                                            <a rel="nofollow" class="parent_color cur_sur" v-else @click="click_display_full_P_N">{{ display_P_N(p_num) }} &nbsp;&nbsp;</a>
                                        </template>
                                    </p>
                                </div>
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.email" class="form-group border_bottom_solid c-p-div-contact-infor">
                                    <small class="form-text text_grey font_13">{{ $t('lng.email') }}</small>
                                    <a rel="nofollow" @click="tracking_manual('mail')" v-bind:href="'mailto:'+detail_user.contact.email" class="recent_history m-0 parent_color">{{ detail_user.contact.email }}</a>
                                </div>
                                <div v-if="detail_user && detail_user.link" class="form-group border_bottom_solid c-p-div-contact-infor">
                                    <small class="form-text text_grey font_13">{{ $t('message.website') }}</small>
                                    <a rel="nofollow noopener" @click="tracking_manual('link')" v-bind:href="detail_user.link" target="_blank" class="recent_history m-0 parent_color">{{ detail_user.link }}</a>
                                </div>
                                <div v-if="detail_user && detail_user.contact && (detail_user.contact.address || detail_user.contact.location)" class="form-group c-p-div-contact-infor">
                                    <small class="form-text text_grey font_13">{{ $t('message.address') }}</small>
                                    <p class="recent_history m-0 break_word_">
                                        <template v-if="detail_user.contact.location && detail_user.contact.location.long_location">
                                            {{ detail_user.contact.location.long_location+' , ' }}
                                        </template>
                                        <template v-else>
                                            {{ detail_user.contact.commune ? (language === 'km' ? detail_user.contact.commune.km_name : detail_user.contact.commune.en_name)+' , ' : '' }}
                                            {{ detail_user.contact.district ? (language === 'km' ? detail_user.contact.district.km_name : detail_user.contact.district.en_name)+' , ' : '' }}
                                            {{ detail_user.contact.location ? (language === 'km' ? detail_user.contact.location.km_name : detail_user.contact.location.en_name)+' , ' : '' }}
                                        </template>
                                        {{ detail_user.contact.address }}
                                    </p>
                                </div>
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.map && detail_user.contact.map.x" class="form-group c-p-div-contact-infor">
                                    <div class="pb-2 pt-2">
                                        <a rel="nofollow noopener" @click="tracking_manual('map')" v-bind:href="'https://maps.google.com/maps?q='+detail_user.contact.map.x+','+detail_user.contact.map.y+'&'+detail_user.contact.map.z" target="_blank" class="btn form-control btn_show_map"><b>
                                            <i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp; {{ $t('message.show_map') }}</b>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isMobile"><br><br><br></div>
                            <!-- bottom navigation -->
                            <div v-if="!isMobile">
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" class="d-flex c_t_nav mt-3">
                                    <div v-if="!isDesktop" class="col pr-1">
                                        <button @click="dialog_phone_number('sms')" class="btn btn-k24-primary btn-height" id="btn_sms"><i class="fa fa-envelope font_18 mr-1" aria-hidden="true"></i>  {{ $t('message.sms') }} </button>
                                    </div>
                                    <div class="col" :class="!isDesktop ? 'pl-1' : ''">
                                        <button @click="dialog_phone_number('call')" class="btn btn-k24-primary btn-height" id="btn_call"> <i class="fa fa-phone font_17 mr-1" aria-hidden="true"></i> {{ $t('message.call') }} </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isMobile">
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" class="nav c_t_nav px-2">
                                    <div v-if="!isDesktop" class="col pr-1">
                                        <button @click="dialog_phone_number('sms')" class="btn btn-k24-primary btn-height" id="btn_sms"><i class="fa fa-envelope font_18 mr-1" aria-hidden="true"></i>  {{ $t('message.sms') }} </button>
                                    </div>
                                    <div class="col" :class="!isDesktop ? 'pl-1' : ''">
                                        <button @click="dialog_phone_number('call')" class="btn btn-k24-primary btn-height" id="btn_call"> <i class="fa fa-phone font_17 mr-1" aria-hidden="true"></i> {{ $t('message.call') }} </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal show phone number -->
                            <div class="modal fade " :class="isMobiles ? 'style_full_screen' : ''" id="modal_show_phone_or_sms" tabindex="-1" role="dialog">
                                <div class="modal-dialog " :class="isMobiles ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                                    <div class="modal-content " :class="isMobiles ? 'animate-bottom' : 'rounded'">
                                        <div :class="isMobiles ? 'modal_bottom_screen' : ''">
                                            <!-- show warning only for normal user -->
                                            <div class="option-phone-warning">
                                                <div class="option-1">
                                                    <span class="fas fa-exclamation-circle"></span>
                                                    <div>
                                                        <p class="war-title-km">សូមពិនិត្យទំនិញ មុនពេលបង់ប្រាក់!</p>
                                                        <p class="war-title-en">Please check the good before payment!</p>
                                                    </div>
                                                </div>
                                                <div class="option-2 cur_sur" data-toggle="modal" data-target="#modal_show_safety_tip">
                                                    <p>
                                                        {{ $t('message.view_more') }}
                                                        <i class="ion-ios-arrow-forward"></i>
                                                    </p>
                                                </div>
                                            </div>
                                            <!-- show phone numbers -->
                                            <div class="option_selected">
                                                <div class="border_bottom u_show_ph_number">
                                                    <p id="label_phone_or_sms" class="modal-title font_13">
                                                        {{ sms_or_call === 'call' ? $t('message.call') : $t('message.sms') }}
                                                    </p>
                                                </div>
                                                <div v-if="detail_user && detail_user.contact" class="modal-body p-0">
                                                    <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                                                        <!--<template v-if="detail_user.contact.phone_white_operator && detail_user.contact.phone_white_operator.length > 0">
                                                            <li v-for="p_n in detail_user.contact.phone_white_operator" :key="p_n" class="cl_ripple cur_sur">
                                                                <a rel="nofollow" class="full_field_a_tag border_top color_reason flex_imp" :href="sms_or_call === 'call' ? 'tel:'+p_n.phone : 'sms:'+p_n.phone">
                                                                    <div class="col _flex_ p-0 mt-1">
                                                                        <img :src="p_n.icon" alt="icon" class="img_p_n">
                                                                        <p class="u_show_ph_mg">{{ p_n.phone }}</p>
                                                                    </div>
                                                                    <div class="col-2 p-0 text-right">
                                                                        <i aria-hidden="true" :class="sms_or_call === 'call' ? 'fa fa-phone call_icon_modal' : 'fa fa-envelope call_icon_modal'"></i>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </template>-->
                                                        <template v-if="detail_user.contact.phone && detail_user.contact.phone.length > 0">
                                                            <li v-for="p_n in detail_user.contact.phone" class="cl_ripple cur_sur">
                                                                <a rel="nofollow" class="full_field_a_tag border_top color_reason flex_imp" :href="sms_or_call === 'call' ? 'tel:'+p_n : 'sms:'+p_n">
                                                                    <div class="col _flex_ p-0 mt-1">
                                                                        <p class="u_show_ph_mg">{{ p_n }}</p>
                                                                    </div>
                                                                    <div class="col-2 p-0 text-right">
                                                                        <i aria-hidden="true" :class="sms_or_call === 'call' ? 'fa fa-phone call_icon_modal' : 'fa fa-envelope call_icon_modal'"></i>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </template>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="a_cancel_btn_modal_bg cur_sur">
                                                <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                                    <p class="modal-title color_reason"><b>Cancel</b></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /Modal show phone number -->
                            <!-- Modal safety tip -->
                            <div class="modal u_safety_bg" id="modal_show_safety_tip" tabindex="-1" role="dialog">
                                <div class="modal-dialog modal_dialog_style" role="document">
                                    <div class="modal-content click_background_warning">
                                        <div class="modal-body break_word_ show_text_status p-3">
                                            <div class="text_padding_detail mb-2 style_border_detail de_style_warning">
                                                <div class="align_div_center">
                                                    <div class="de_title_warning">
                                                        <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="icon de_img_warning">
                                                        ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                                    </div>
                                                </div>
                                                <div class="de_margin_left_detail">
                                                    <span class="text_description_detail position_absolute de_span_safety">1. </span>
                                                    <div class="text-dark de_font_size_detail">
                                                        <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                                                    </div>
                                                </div>
                                                <div class="de_margin_left_detail">
                                                    <span class="text_description_detail position_absolute de_span_safety">2. </span>
                                                    <div class="text-dark de_font_size_detail">
                                                        <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                                                    </div>
                                                </div>
                                                <div class="de_margin_left_detail">
                                                    <span class="text_description_detail position_absolute de_span_safety">3. </span>
                                                    <div class="text-dark de_font_size_detail">
                                                        <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                                                    </div>
                                                </div>
                                                <div class="de_margin_left_detail">
                                                    <span class="text_description_detail position_absolute de_span_safety">4. </span>
                                                    <div class="text-dark de_font_size_detail">
                                                        <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer u_safety_footer">
                                            <button type="button" data-bs-dismiss="modal" class="btn parent_color cl_ripple font_14"> {{ $t('message.close') }} </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /Modal safety tip -->

                            <!-- Modal show error connection -->
                            <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
                                <div class="modal-dialog max_width_form mg-mo-auto" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body break_word_ b-s-h-con">
                                            <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
                                            <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
                                        </div>
                                        <div class="modal-footer u_safety_footer">
                                            <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /Modal show error connection -->

                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");

    const detail_user = ref(null);
    const loading = ref(false);

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();
    const isMobile= ref(helper.m_or_d())
    const sms_or_call = ref('');
    const connection_error_contact_page = ref(false);
    const show_phone_number = ref(false); // show phone number xxx

    // --- meta variable ---
    const meta_title_contact = useState('meta_title_contact', () => 'Contact Info - Khmer24.com');

    useHead({
        title: meta_title_contact.value,
        meta: [
            // { name: 'apple-mobile-web-app-title', content: meta_title_contact.value },
            // -- seo --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_contact.value },
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
            // --- check auth user ---
            // isMobiles.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobiles.value = $( window ).width() < 768 ? true : false
            // });
            if (helper.check_auth_user() === false) { // check auth exist or not
                router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }

            get_detail_user_or_store();
            ripple();
            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            // -- tracking on google analytic --
            track_google_analytics();
        }
    })

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_contact.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('contact_page', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- click retry ----
    function retry() {
        if(window.navigator.onLine) {
            get_detail_user_or_store();
            connection_error_contact_page.value = false; // close error connection
        }
    }
    // ---- get request to get detail on User or Store ----
    function get_detail_user_or_store() {
        if (window.navigator.onLine) {  // check is connect to internet
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'profiles/' + route.query.username + '?lang=' + language.value + '&fields=all', {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                connection_error_contact_page.value = false
                detail_user.value = res.data;
                
                // --- user information from detail_chat page on business card ---
                const pa_con = helper.get_params_make_condition(); // get data params condition.
                const u_i_f_c = pa_con && pa_con.params_optional && pa_con.params_optional.d_params ? pa_con.params_optional.d_params : '';
                if (u_i_f_c) {
                    detail_user.value.name = u_i_f_c.name ? u_i_f_c.name : '';
                    detail_user.value.address = u_i_f_c.address ? u_i_f_c.address : '';
                    detail_user.value.email = u_i_f_c.email ? u_i_f_c.email : '';
                    detail_user.value.phone = u_i_f_c.phone ? u_i_f_c.phone : '';
                    detail_user.value.contact.email = u_i_f_c.email ? u_i_f_c.email : '';
                    detail_user.value.contact.phone = u_i_f_c.phone ? u_i_f_c.phone : '';
                    detail_user.value.contact.location = u_i_f_c.location ? u_i_f_c.location : '';
                    detail_user.value.contact.address = u_i_f_c.address ? u_i_f_c.address : '';
                    detail_user.value.contact.map.x = u_i_f_c.map && u_i_f_c.map.lat ? u_i_f_c.map.lat : '';
                    detail_user.value.contact.map.y = u_i_f_c.map && u_i_f_c.map.lng ? u_i_f_c.map.lng : '';
                }
                setTimeout(function() { helper.clear_params_make_con('params_optional'); }, 1000);  // clear params condition.
                // console.log(u_i_f_c);
                // console.log(detail_user.value);

            }).catch(e => {
                if (!e.response) {
                    loading.value = false; // close loading
                    // connection_error_contact_page.value = true;   // connection error
                    // console.log(e)
                }
            }).finally(() => (loading.value = false));

        } else {
            loading.value = false; // close loading
            connection_error_contact_page.value = true;   // connection error
        }
    }
    // ---- click show phone numbers user for Call or SMS ----
    function dialog_phone_number(call_or_sms) {

        tracking_manual(call_or_sms === 'call' ? 'call' : 'sms'); // tracking SMS or Call.

        sms_or_call.value = call_or_sms;
        $('#modal_show_phone_or_sms').modal('show');
    }
    // ---- click show detail user post ----
    function show_detail_user_post(username) {
        if (window.navigator.onLine) { // check is connect to internet
            router.push(localePath({ name: 'username', params: { username: username } }));
            save_tracking_user({ placement: 'chat' }, { clear: 'clr_old_data' });

        } else {
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- convert date look beautiful ----
    function date_format(date) { return helper.Clean_date_only(date); }
    // ---- ripple effect on UI ----
    function ripple() { setTimeout(function () { $(".cl_ripple, #pills-home-tab,#pills-profile-tab,.arrow_back_nav").ripple(); }, 500); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }

    // -- click show full phone numbers --
    function click_display_full_P_N() {
        setTimeout(() => {
            show_phone_number.value = true;

            tracking_manual('contact'); // tracking contact.
        },100);
    }
    // ---- tracking API call, sms, show contact or any ( but no detail user ) ----
    function tracking_manual(action) {
        let check_user = detail_user.value && detail_user.value.type === 'user' ? 'user' : 'store'; // check user type
        helper.tracking_action(check_user, { id: detail_user.value.id }, action, 'chat', '', '');
    }
    // -- create phone number with xxx for manual --
    function display_P_N(phone_number) {
        const regex1 = /^([0-9]{3}[0-9]{3}[0-9]{3})$/;      // phone num in 9 char
        const regex2 = /^([0-9]{3}[0-9]{3}[0-9]{4})$/;      // phone num in 10 char
        let clean_p_n = phone_number.replace(/[-. ]/g, ""); // clean spacial char...
        if (regex1.test(clean_p_n)) {
            return phone_number.replace(/(\d{6})\d{3}/,"$1xxx");
        } else if (regex2.test(phone_number)) {
            return phone_number.replace(/(\d{7})\d{3}/,"$1xxx");
        }
    }
    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
</script>
