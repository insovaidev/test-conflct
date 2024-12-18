
<template>
    <div>
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth />
        </template>

        <!-- Body -->
        <div :class="isMobile ? '' : 'mt_80'">
            <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'">
                <div class="borders rounded" :class="isMobile ? ' ' : 'form-login'">
                    <div class="c_height_logo" :class="isDesktop ? 'dt_radius' : ''">
                        <div class="text-center c_pad_logo">
                            <h1 class="c_logo_title"> {{ $t('message.khmer24') }} </h1>
                            <b> {{ $t('message.buy_fast_sell_fast') }} </b>
                            <h2 class="d-none">Khmer24.com, Media Login, Buy, Sell</h2>
                        </div>
                    </div>
                    <div v-if="quick_login">
                        <div class="c_pad_p_quick px-3">
                            <a rel="nofollow" href="javascript:void(0)" v-for="(v, index) in quick_login" :key="index" class="my_card c_list_user_search mb-2">
                                <div @click="click_quick_login(v.id)" class="c_wid_pro_quick">
                                    <img :src="v.profile ? v.profile : empty_img_user" :alt="v.name" class="c_icon_user_quick_login bg_reload_img" @error="imageUrlAlt_profile">
                                </div>
                                <div @click="click_quick_login(v.id)" class="col mg_in_fo_user p-0">
                                    <p class="truncate_wrap ct_info_name"> {{ v.name }} </p>
                                    <p class="truncate_wrap ct_info_username"> {{ '@'+v.username_log }} </p>
                                </div>
                                <div @click="show_modal_option(v.id, v.name)" class="c_wid_option_quick">
                                    <i class="fas fa-ellipsis-v font_18 c_mg_icon_quick c_pad_list_user_action"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="px-3">
                        <div class="large-12 columns">
                            <div class="text-center p-0 pt-1">
                                <div class="text-center mb-4 font_15 mt-3"> {{ $t('message.login_text') }} </div>
                                <div class="style_flex">
                                    <NuxtLink :to="localePath({ name: 'auth-login' })" class="btn btn-k24-secondary me-2" :class="isMobile ? 'btn-height p-10' : 'dt-btn-height'">
                                        {{ $t('message.login') }}
                                    </NuxtLink>
                                    <NuxtLink :to="localePath({ name: 'auth-register' })" class="btn btn-k24-secondary ms-2" :class="isMobile ? 'btn-height p-10' : 'dt-btn-height'">
                                        {{ $t('message.register') }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>

                        <div v-if="loading_field" class="loading_back_ground" style="top: 50px;">
                            <div class="loading_img">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                            </div>
                        </div>

                        <!-- Show Choose Facebook Login -->
                        <div class="large-12 columns">
                            <div class="p-3">
                                <NuxtLink :to="localePath({ name: 'auth-forgot-password' })">
                                    <p class="mt-3 mb-2 mb-0 text-center font_bold l_color_t_log cur_sur">{{ $t('message.forget_pass_account') }}</p>
                                </NuxtLink>
                                <div class="ch_login_Pa">
                                    <div class="col p-0"> <hr> </div>
                                    <div class="ch_con_or"> {{ $t('message.quick_connect') }} </div>
                                    <div class="col p-0"> <hr> </div>
                                </div>
                                <div class="text-center">
                                    <button @click="login_facebook" id="fb-login" type="button" class="btn c_circle_btn c_bg_f mr-2">
                                        <i class="fab fa-facebook-f mt-2"></i>
                                    </button>
                                    <button @click="login_with_google" type="button" class="btn c_circle_btn c_bg_g">
                                        <i class="fab fa-google mt-2"></i>
                                    </button>
                                    <br>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 text-center">
                            <div class="fn_15">
                                {{ $t('new_text.by_continu') }}
                                <nuxt-link :to="localePath({ name: 'posting-rule' })" class="k24-color">{{ $t('new_text.p_r') }}</nuxt-link>
                                {{ $t('new_text.and') }}
                                <nuxt-link :to="localePath({ name: 'privacy-policy' })" class="k24-color">{{ $t('message.privacy_policy') }}</nuxt-link>
                                {{ locale==='km'? 'របស់យើង។' : '.' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal show option quick login -->
        <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="modal_show_option_quick_login" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 'modal_bottom_screen' : ''">
                        <div class="option_selected">
                            <div class="text-center border_bottom m-r-p-sm-pad">
                                <p class="modal-title font_19">{{ show_quick_name }}</p>
                            </div>
                            <div class="modal-body p-0">
                                <ul class="list-unstyled mobile_modal_actions_container" id="list-phone-modal">
                                    <li @click="click_edit_quick_login" class="mobile_modal_action cur_sur justify-content-center">
                                        <div class="color_reason p-0">
                                            <p class="m-0 font_18 color_reason">{{ $t('lng.edit') }}</p>
                                        </div>
                                    </li>
                                    <li @click="click_remove_quick_login" class="mobile_modal_action cur_sur justify-content-center">
                                        <div class="color_reason p-0">
                                            <p class="m-0 font_18 text-danger">{{ $t('new_text.remove') }}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="a_cancel_btn_modal_bg">
                            <div class="mobile_modal_action a_cancel_btn_modal cur_sur justify-content-center" data-bs-dismiss="modal" aria-label="Close">
                                <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show option quick login -->

        <!-- Modal show error when login -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog from_top mg-mo-auto" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status">  </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show error when login -->

        <!-- Modal remove quick login -->
        <div class="modal c_status_remove" id="modal_confirm_remove_quick_login" tabindex="-1" role="dialog">
            <div class="modal-dialog mg_center" role="document" style="padding-top: 150px!important;">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_"> {{ $t('new_text_1.remove_acc_text') }} </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text_grey">{{ $t('message.close') }}</button>
                        <button type="button" @click="confirm_remove" class="btn color_reason">{{ $t('new_text_1.confirm') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal remove quick login -->

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

        <!-- show success message -->
        <div class="toast style_toast d-none sh_toast toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="mr-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ml-2"> {{ message_success }} </p>
                </strong>
                <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <!-- /show success message -->
    </div>
</template>

<script setup>
    import { googleTokenLogin } from "vue3-google-login";
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    const isMobile= ref(helper.m_or_d())
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const recaptcha = useRecaptcha();
    const isDesktop = ref('') // check userAgent
    // const isDesktop = helper.pc_or_mobile_device(); // check userAgent
    // const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const error_or_success_message = ref(true);
    const message_success = ref('');

    const loading_field = ref(false);
    const quick_login = ref('');
    const show_quick_name = ref('');
    const id_user_quick_log = ref('');
    const reload_q_again_1 = ref(0);

    // --- meta variable ---
    const meta_title_auth = useState('meta_title_auth', () => 'khmer24.com, Auth, Buy and Sell Everything In Cambodia');
    useHead({
        title: meta_title_auth.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_auth.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Media khmer24, Auth khmer24, login, register,' },
            { name: 'description', content: 'Quick login, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },

            { property: 'og:title', content: meta_title_auth.value },
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
            localStorage.removeItem('im_store')
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });

            quick_login.value = localStorage.getItem('quick_login') ? JSON.parse(localStorage.getItem('quick_login')) : [];

            setTimeout(() => {
                /*// ---- load script facebook login ----
                $('body').find('#fb-login').click((e) => {
                    FB.login((response) => {
                        // -- handle the response --
                        if (response.status === 'connected') {
                            request_login(response.authResponse.accessToken,'facebook');
                        }
                    });
                });*/

                // ---- check save_state to show status to user to login first ----
                let alert = localStorage.getItem('save_state') ? JSON.parse(localStorage.getItem('save_state')) : '';
                if (alert) {
                    if (alert.action === 'like') {
                        message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីចូលចិត្តការប្រកាស។' : 'Please login to your account to like this post.';
                    } else if (alert.action === 'save') {
                        message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីរក្សាទុកការប្រកាស។' : 'Please login to your account to save this post.';
                    } else if (alert.action === 'resumes') {
                        message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីរក្សាទុកប្រវត្តិរូបសង្ខែប (CV)។' : 'Please login to your account to save this resume(CV).';
                    } else if (alert.action === 'detail_chat') {
                        message_success.value = language.value === 'km' ? 'សូមចូលគណនីរបស់អ្នកដើម្បីប្រើការជជែក។' : 'Please login to your account to use chat.';
                    }else if (alert.action === 'resume_chat') {
                        message_success.value = language.value === 'km' ? 'សូមចូលគណនីរបស់អ្នកដើម្បីប្រើការជជែក។' : 'Please login to your account to use chat.';
                    } else if (alert.action === 'detail_comment') {
                        message_success.value = language.value === 'km' ? 'សូមចូលគណនីរបស់អ្នកដើម្បីប្រើការជជែកបញ្ចេញមតិ។' : 'Please login to your account to use comment.';
                    } else if (alert.action === 'follow') {
                        let name = alert.data && alert.data.name ? alert.data.name : '';
                        message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីធ្វើការតាមដាន '+name+'។' : 'Please login to your account to follow '+name+'.';
                    } else if (alert.action === 'save_store') {
                        let khmer = alert.data.type === 'user' ? 'ប្រវត្តិរូប។' : 'ហាង។'
                        let english = alert.data.type === 'user' ? 'profile.' : 'store.'
                        message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីរក្សាទុក'+khmer : 'Please login to your account to save this '+english;
                    } else if (alert.action === 'apply_job') {
                        message_success.value = language.value === 'km' ? 'សូមចូលគណនីរបស់អ្នកដើម្បីអនុវត្តការងារ។' : 'Please login to Apply Job.';
                    }
                    if (message_success.value) {
                        error_or_success_message.value = false;
                        $(".sh_toast").removeClass('d-none');
                        $(".sh_toast").toast({delay: 6000});
                        $(".sh_toast").toast('show');
                    }
                }
            },500);

            // ---- tracking google analytic ----
            track_google_analytics();
        }
    })

    // ---- load script facebook login ----
    function login_facebook() {
        FB.login((response) => {
            // -- handle the response --
            if (response.status === 'connected') {
                request_login(response.authResponse.accessToken,'facebook');
            }
        });
    }

    // ---- track on google analytic ----
    function track_google_analytics () {
        setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                // page_title: 'Auth',
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('auth', data);
            // -- page_view --
            pageview(data);
        },50);
    }
    // ---- google login ----
    function login_with_google() {
        googleTokenLogin().then((response) => {
            // console.log("Handle the response", response);
            request_login(response.access_token, 'google');
        })
    }
    // ---- facebook login or google login ----
    function request_login(access_token, condition) {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL + 'auth/login',{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'POST',
            params: { lang: language.value },
            body: new URLSearchParams({ 'token': access_token, 'type': condition })
        }).then(res => {
            // --- check status "302". If we have key "next_page" ---
            let n_p = res && res.next_page ? res.next_page : '';
            if (n_p) {
                if (n_p.page === 'auth/verify') {
                    save_track_optional('auth_status_302', { phone: '', token: n_p.token, password: '' });
                    router.push(localePath({ name: 'auth-confirm-code' }));

                } else if (n_p.page === 'auth/set_phone') {
                    save_track_optional('auth_status_302', { token: n_p.token });
                    router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

                } else if (n_p.page === 'auth/max_send_code') {
                    save_track_optional('auth_status_302', { code: n_p.code,
                      phone: n_p.recipient_phone, message: n_p.message });
                    router.push(localePath({ name: 'auth-max-sent-code' }));
                }

            // --- set date expired ---
            } else {
                var expired = res.data.tokens.expires_in;
                var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
                // --- save to localStorage ---
                var object = { tokens: res.data.tokens, user: res.data.user, timestamp: set_date_expired };
                localStorage.setItem("auth_user", JSON.stringify(object));
                // --- save to cookie ---
                let user_cookies = helper.create_data_user_login(object);
                VueCookieNext.setCookie('auth_user', user_cookies);
                // router.push(localePath({ name: 'account' }));

                redirect_to_page(res.data); // redirect to specific page
            }
        }).catch(error => {
            if (!error.response) {
                if (reload_q_again_1.value < 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { request_login(access_token, condition) }, 3000);
                } else {
                    loading_field.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            } else {
                let check = error.response;
                let data_check = JSON.stringify(check);
                let data_parse = JSON.parse(data_check);

                if (check.status === 302) {
                    if (data_parse._data.next_page.page === 'auth/verify') {
                        save_track_optional('auth_status_302', { phone: '', token: data_parse._data.next_page.token, password: '' });
                        router.push(localePath({ name: 'auth-confirm-code' }));

                    } else if (data_parse._data.next_page.page === 'auth/set_phone') {
                        save_track_optional('auth_status_302', { token: data_parse._data.next_page.token });
                        router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

                    } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                        save_track_optional('auth_status_302', { code: data_parse._data.next_page.code,
                            phone: data_parse._data.next_page.recipient_phone, message: data_parse._data.next_page.message });
                        router.push(localePath({ name: 'auth-max-sent-code' }));
                    }

                } else {
                    loading_field.value = false; // clear loading
                    $('.show_text_status').text(data_parse._data.message);
                    $('#modal_show_status').modal('show');
                }
            }

        }).finally(() => (loading_field.value = false) );
    }
    // ---- click quick login ----
    async function click_quick_login (id) {
        if (window.navigator.onLine) { // check is connect to internet
            $.each(quick_login.value, (k, v) => {
                if (v.id === id && v.type === 'login') {
                    function_login(v.username_log, v.password_log, v.type);
                }
            });
        } else {
            loading_field.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
        }
    }
    function show_modal_option (id, name) {
        id_user_quick_log.value = id;
        show_quick_name.value = name;
        $('#modal_show_option_quick_login').modal('show');
    }
    // ---- click edit quick login ----
    function click_edit_quick_login () {
        for (let key in quick_login.value) {
            if (parseInt(quick_login.value[key].id) === parseInt(id_user_quick_log.value)) {
                save_track_optional('auth_login', {
                    id: quick_login.value[key].id,
                    username: quick_login.value[key].username_log,
                    password: quick_login.value[key].password_log,
                    profile: quick_login.value[key].profile,
                });
                router.push(localePath({ name: 'auth-login' })); // push route to login form
            }
        }
        $('#modal_show_option_quick_login').modal('hide')
    }
    // ---- click remove quick login ----
    function click_remove_quick_login () { $('#modal_confirm_remove_quick_login').modal('show'); }
    function confirm_remove() {
        for (let key in quick_login.value) {
            if (parseInt(quick_login.value[key].id) === parseInt(id_user_quick_log.value)) {
                // this.profile_quick_login= '';
                quick_login.value.splice(key, 1); // delete associate in specific index.
                localStorage.setItem("quick_login", JSON.stringify(quick_login.value));
                // console.log(quick_login.value);
            }
        }
        $('#modal_show_option_quick_login').modal('hide');      // close modal show options
        $('#modal_confirm_remove_quick_login').modal('hide');   // close modal show confirm remove
    }
    // ---- function login ----
    async function function_login(username, password, type) {
        loading_field.value = true;
        const token = await recaptcha('login');
        let data_body = {
            login: username, 
            password: password
        }
        if(token !== undefined){
            data_body['g-recaptcha-response'] = token
        }
        $fetch(config.VUE_APP_API_URL + 'auth/login',{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'POST',
            params: {lang: language.value},
            body: new URLSearchParams(data_body)
        }).then(res => {
          // --- check status "302". If we have key "next_page" ---
          let n_p = res && res.next_page ? res.next_page : '';
          if (n_p) {
            if (n_p.page === 'auth/verify') {
              save_track_optional('auth_status_302', { phone: username.value, token: n_p.token, password: password });
              router.push(localePath({ name: 'auth-confirm-code' }));

            } else if (n_p.page === 'auth/set_phone') {
              save_track_optional('auth_status_302', { token: n_p.token });
              router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

            } else if (n_p.page === 'auth/max_send_code') {
              save_track_optional('auth_status_302', { code: n_p.code, phone: n_p.recipient_phone, message: n_p.message });
              router.push(localePath({ name: 'auth-max-sent-code' }));
            }

          // --- simple response ---
          } else {
            let sh = res.data;
            //--- store new data to quick_login at localstorage prevent any change ---//
            let change_quick_data = {
              id: sh.user.id,
              name: sh.user.name ? sh.user.name : '',
              username: sh.user.username ? sh.user.username : '',
              password: '',
              photo: sh.user.photo ? sh.user.photo.medium.url : ''
            }
            helper.change_quick_login_data(change_quick_data);

            //--- set date expired ---//
            var expired = sh.tokens.expires_in;
            var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
            //--- save to localStorage ---//
            var object = {tokens: sh.tokens, user: sh.user, timestamp: set_date_expired};
            localStorage.setItem("auth_user", JSON.stringify(object));
            // --- save to cookie ---
            let user_cookies = helper.create_data_user_login(object);
            VueCookieNext.setCookie('auth_user', user_cookies);

            redirect_to_page(sh);  // redirect to specific page
          }

        }).catch(error => {
            if (!error.response) {
                loading_field.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

            } else {
                if (error.response) {
                    let check = error.response;
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);

                    if (check.status === 302) {
                        if (data_parse._data.next_page.page === 'auth/verify') {
                            save_track_optional('auth_status_302', { phone: username.value, token: data_parse._data.next_page.token, password: password });
                            router.push(localePath({ name: 'auth-confirm-code' }));

                        } else if (data_parse._data.next_page.page === 'auth/set_phone') {
                            save_track_optional('auth_status_302', { token: data_parse._data.next_page.token });
                            router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

                        } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                            save_track_optional('auth_status_302', { code: data_parse._data.next_page.code, phone: data_parse._data.next_page.recipient_phone, message: data_parse._data.next_page.message });
                            router.push(localePath({ name: 'auth-max-sent-code' }));
                        }

                    } else {
                        loading_field.value = false; // clear loading
                        $('.show_text_status').text(data_parse._data.message);
                        $('#modal_show_status').modal('show');
                    }
                }
            }
        });
    }
    // ---- redirect to specific page ----
    const a_l_l_resume = useState('a_l_l_resume',()=>[]);
    const a_l_l_pageSize = useState('a_l_l_pageSize',()=>0);
    function redirect_to_page(sh) {
        // check if have action state when redirect (this function have in choose_log,login,confirm_code and set_new_password)
        let save_state = localStorage.getItem('save_state') ? JSON.parse(localStorage.getItem('save_state')) : '';
        if (save_state) {
            let current_date = helper.Date_To_Timestamp('', '', ''); // get current date
            if (save_state.expire > current_date) {         // check expired time

                if (save_state.action === 'notification' || save_state.action === 'post' || save_state.action === 'account' || save_state.action === 'chats') {
                    localStorage.removeItem('save_state'); // remove key save_state
                    // clear_cache only use in chat or notification listing for clear old data
                    if (save_state.action === 'chats' || save_state.action === 'notification') {
                        save_track_optional('clear_cache', { clear_cache: 'clear' });
                    }
                    router.push(localePath({ name: save_state.action }));

                } else if (save_state.action === 'detail_chat') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    // save params to work at detail chats
                    let dt_post = { show_topic_post_id: d.show_topic_post_id, title: d.title, price: d.price, img: d.img }
                    save_track_optional('dt_post', dt_post);

                    if(isMobile.value){
                        router.push(localePath({ name: 'chats-detail-chat', query: { to_id: d.to_id, username: d.username } }));
                    }else{
                        router.push(localePath({ name: 'chats', query: { to_id: d.to_id, username: d.username } }));
                    }

                }else if (save_state.action === 'resume_chat') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    // save params to work at detail chats
                    let dt_post = { show_topic_resume_id: d.show_topic_resume_id, title: d.title, work_experience: d.work_experience,position:d.position, img: d.img }
                    save_track_optional('dt_post', dt_post);

                    if(isMobile.value){
                        router.push(localePath({ name: 'chats-detail-chat', query: { to_id: d.to_id, username: d.username } }));
                    }else{
                        router.push(localePath({ name: 'chats', query: { to_id: d.to_id, username: d.username } }));
                    }

                } else if (save_state.action === 'detail_comment') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    // save params to work at detail comments
                    let query = { post_id: d.post_id };
                    if (d.show_spe_com) query['show_spe_com'] = d.show_spe_com; // get specific detail comment.
                    // if(isMobile.value){
                        router.push(localePath({name: 'chats-detail-comment', query: query}));
                    // }else{
                    //     query['tap'] = 'comments';
                    //     query['sh_com'] = 'show';
                    //     router.push(localePath({name: 'chats', query: query}));
                    // }

                } else if (save_state.action === 'apply_job') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    router.push(localePath({ name: 'apply-job-id', params: {id: d.post_id}, query: {title: d.title} }));

                } else {
                    let url = ''; let data_sent = '';
                    if (save_state.action === 'like') { // state like post
                        // url = 'me/likes';
                        url = config.VUE_APP_API_URL_LIKE_NEW + 'me';
                        data_sent = {id: save_state.data.post_id};
                    } else if (save_state.action === 'save') { // state save post
                        url = config.VUE_APP_API_URL + 'me/saved';
                        data_sent = {id: save_state.data.post_id};
                    } else if (save_state.action === 'save_store') { // state save user or store
                        url = config.VUE_APP_API_URL + 'me/saved';
                        data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                    } else if (save_state.action === 'resumes') { // state save user or store
                        url = config.VUE_APP_API_URL + 'me/saved';
                        data_sent = {id: save_state.data.id, type: save_state.data.type};
                    } else if (save_state.action === 'follow') { // state follow user
                        url = config.VUE_APP_API_URL + 'me/follow';
                        data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                    }

                    // console.log(sh.tokens.access_token);
                    $fetch(url,{
                        headers: {"Access-Token": sh.tokens.access_token},
                        method: 'POST',
                        params: {lang: language.value},
                        body: new URLSearchParams(data_sent)
                    }).then(res => {
                        localStorage.removeItem('save_state'); // remove if successful.
                        save_track_optional('status_success', { status_success: res.message });
                        a_l_l_pageSize.value = 0;
                        a_l_l_resume.value = [];
                        router.push(localePath({ name: 'index' }));
                    }).catch(error => {
                        if (!error.response) {
                            loading_field.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                        } else {
                            router.push(localePath({ name: 'index' }))
                        }
                    }).finally(() => { loading_field.value = false; });
                }

            } else {
                if (save_state) { // expired, when login success
                    localStorage.removeItem('save_state');  // if expired, remove
                    router.push(localePath({ name: 'account' }));
                }
            }
        } else {
            //--- redirect to account setting form ---//
            loading_field.value = false;
            router.push(localePath({ name: 'account' }));
        }
        //--- /check if have action state when redirect ---//
    }
    // ---- tracking multiple ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
    // ------------ click back one page ------------
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
</script>