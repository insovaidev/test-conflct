
<template>
    <div :class="isDesktop ? 'dt_bg_form_contain' : ''">
        <!-- App Bar -->
        <App_bar_auth v-if="isMobile" />

        <!-- Body -->
        <div :class=" isMobile ? '' : 'screen-content-desktop mt_80 min_h'">
            <div class="py-3 px-4 borders rounded" :class="isMobile ? '' : 'form-login'">
                <p v-if="!isMobile" class="mb-3 title">{{ locale==='km' ? 'ចូលគណនីដើម្បីគ្រប់គ្រង ឬ ដាក់លក់ដោយឥតគិតថ្លៃ' : 'Log in to manage ads or post free ad' }}</p>
                <div v-else>
                    <div class="text-center l_pad_logo my-4 ">
                        <img v-if="id_quick_login && profile_quick_login" :src="profile_quick_login ? profile_quick_login : empty_img_profile" alt="profile login" class="l_icon_user_quick_login bg_reload_img" @error="imageUrlAlt_profile">
                        <i v-else class="fas fa-user-circle l_size_icon_user"></i>
                    </div>
                </div>
                <form role="form">
                    <div class="form-group mb-3">
                        <label for="username" class="form-label label">{{ $t('message.hin_username') }} <b class="text-danger">*</b></label>
                        <input type="text" v-model="username" v-on:keyup="keymonitor" name="username" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div v-if="error_username" class="form_error_style m-0">
                            <span> {{ $t('message.error_username') }} </span>
                        </div>
                    </div>
                    <div class="form-group mb-3 bg-none">
                        <label for="" class="form-label label">{{ $t('message.hin_password') }} <b class="text-danger">*</b></label>
                        <input type="password" autocomplete="off" maxlength="100" id="password" name="password" v-on:keyup="keymonitor" v-model="password"  class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <i id="icon_password" class="far fa-eye text_grey icon_in_text_field cur_sur ps-t" @click="show_password"></i>
                    </div>
                    <div class="mb-3 screen-mobile">
                        <NuxtLink :to="localePath({ name: 'auth-forgot-password' })">
                            <p class="mt-3 mb-0 text-right font_bold l_color_t_log cur_sur">{{ $t('message.forget_pass_account') }}</p>
                        </NuxtLink>
                    </div>
                    <div id="btn" class="mb-3">
                        <button class="btn btn-k24-primary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                            <span >{{  $t('message.submit') }}</span>
                            <img v-if="loading" :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_in_button">
                        </button>
                    </div>
                </form>
                
                <div v-if="isMobile">
                    <div class="ch_login_con">
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
                        </div>
                    </div>
                    <div v-if="isDesktop" class="ch_login_con pt-0">
                        <div class="ch_login_Pa">
                            <div class="col p-0"> <hr> </div>
                            <div class="ch_con_or"> {{ $t('message.or') }} </div>
                            <div class="col p-0"> <hr> </div>
                        </div>
                        <div class="dt_text_acc_reg">{{ $t('text_desktop.no_account_yet') }}</div>
                        <NuxtLink :to="localePath({ name: 'auth-register' })" class="btn form-control btn-k24-secondary custom_btn_">
                            {{ $t('text_desktop.create_account') }}
                        </NuxtLink>
                    </div>
                </div>
                <div v-else>
                    <div class="form-group text-end mb-3">
                        <nuxt-link :to="localePath({ name: 'forgot-password' })" class="nav-link k24-color fn_14 fw-bold​​ ">
                            {{ $t('message.forget_pass_account') }}
                        </nuxt-link>
                    </div>
                    <div v-if="!isMobile">
                        <div class="ch_login_Pa mb-2">
                            <div class="col p-0"> <hr> </div>
                            <div class="ch_con_or"> {{ $t('message.or') }} </div>
                            <div class="col p-0"> <hr> </div>
                        </div>
                        <div class="text-center">
                            <button @click="login_facebook" id="fb-login" type="button" class="btn c_circle_btn c_bg_f me-2">
                                <i class="fab fa-facebook-f mt-2"></i>
                            </button>
                            <button @click="login_with_google" type="button" class="btn c_circle_btn c_bg_g ms-2"> 
                                <i class="fab fa-google mt-2"></i>
                            </button>
                        </div>
                        <div class="ch_login_Pa mt-3">
                            <div class="col p-0"> <hr> </div>
                            <div class="ch_con_or"> {{ $t('message.or') }} </div>
                            <div class="col p-0"> <hr> </div>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="mb-1" for="">{{ locale==='km' ? 'ពុំទាន់មានគណនី?' : 'No account yet?' }}</label>
                        <NuxtLink :to="localePath({ name: 'register' })" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                            {{ $t('text_desktop.create_account') }}
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-3 text-center">
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

        

        <!-- Modal show error -->
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

        <!-- Modal remove quick login -->
        <div class="modal class_modal_show_message" id="modal_confirm_remove_quick_login" tabindex="-1" role="dialog">
            <div class="modal-dialog mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_"> {{ $t('new_text_1.remove_acc_text') }} </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text_grey">{{ $t('message.close') }}</button>
                        <button type="button" @click="confirm_remove" class="btn l_color_t_log">{{ $t('new_text_1.confirm') }}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
        <div class="modal-dialog max_width_form mg-mo-auto" role="document" >
            <div class="modal-content">
                <div class="modal-body break_word_ b-s-h-con">
                    <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
                    <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
                </div>
                <div class="modal-footer u_safety_footer" >
                    <button type="button" data-bs-dismiss="modal" class="btn text-primary cur_sur"> {{ $t('message.close') }} </button>
                </div>
            </div>
        </div>
    </div>

        <!-- Modal show option quick login -->
        <div class="modal fade style_full_screen" id="modal_show_option_quick_login" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                        <div class="option_selected">
                            <div class="border_bottom u_show_ph_number">
                                <p id="label_phone_or_sms" class="modal-title font_13">
                                    {{ show_quick_name }}
                                </p>
                            </div>
                            <div class="modal-body p-0">
                                <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                                    <li @click="click_edit_quick_login" class="cl_ripple cur_sur">
                                        <div class="full_field_a_tag border_top color_reason">
                                            <p class="m-0 font_18 color_reason">{{ $t('lng.edit') }}</p>
                                        </div>
                                    </li>
                                    <li @click="click_remove_quick_login" class="cl_ripple cur_sur">
                                        <div class="full_field_a_tag border_top color_reason">
                                            <p class="m-0 font_18 text-danger">{{ $t('new_text.remove') }}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="a_cancel_btn_modal_bg">
                            <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
    </div>
</template>

<!-- <style>
.frm_form_field .grecaptcha-badge { 
  visibility: hidden;
}
</style> -->

<script setup>
    import { onMounted } from 'vue';
    import { googleTokenLogin } from "vue3-google-login";
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    
    const isMobile= ref(helper.m_or_d())
    const isDesktop = ref('') // check userAgent
    // const isDesktop = helper.check_is_desktop(); // check userAgent
    
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const language = ref(helper.get_lang_cookie());
    const { locale } = useI18n();
    const username = ref(null);
    const password = ref(null);
    const error_username = ref(null); // validation on username
    const error_password = ref(null); // validation on password
    const quick_login = ref([]);
    const show_quick_name = ref('');
    const loading = ref(false);
    const loading_field = ref(false);
    const error_or_success_message = ref(true);
    const message_success = ref('');

    const id_quick_login = ref('');         // quick login user id
    const profile_quick_login = ref('');    // quick login profile
    const recaptcha = useRecaptcha();
    


    // --- meta variable ---
    const meta_title = useState('meta_title', () => 'khmer24.com, Login, Buy and Sell Everything In Cambodia');

    useHead({
        title: meta_title.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Khmer24 login, Login khmer24.com' },
            { name: 'description', content: 'Login, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },
            // -- facebook --
            { property: 'og:title', content: meta_title.value },
            { property: 'fb:app_id', content: '217361691621555' },
            { property: 'og:site_name', content: 'www.khmer24.com' },
            { property: 'og:url', content: 'https://www.khmer24.com/en/' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg' },
            { property: 'og:image:width', content: '600' },
            { property: 'og:image:height', content: '600' },
            { property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.' },
        ],
        // script: [
        //     {  rel: 'preload', as: 'script', src: 'https://www.google.com/recaptcha/api.js?render='+config.RECAPTCHA, async: true, defer: true }
        // ]
    })

    onMounted(() => {
        if (process.client) {
            show_validate()
            localStorage.removeItem('im_store')
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            quick_login.value = localStorage.getItem('quick_login') ? JSON.parse(localStorage.getItem('quick_login')) : [];

            // -- if quick login click from "auth" page --
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const auth_log = pa_con && pa_con.auth_login && pa_con.auth_login.d_params && pa_con.auth_login.d_params ? pa_con.auth_login.d_params : '';
            let param_username = auth_log.username ? auth_log.username : '';
            let param_password = auth_log.password ? auth_log.password : '';
            if (param_username && param_password) {
                id_quick_login.value = auth_log.id ? auth_log.id : '';
                profile_quick_login.value = auth_log.profile ? auth_log.profile : '';
                username.value = param_username;
                password.value = param_password;
                helper.clear_params_make_con('auth_login')
            }

            setTimeout(() => {
                if (isDesktop.value) {
                    // ---- check save_state to show status to user to login first ----
                    let alert = localStorage.getItem('save_state') ? JSON.parse(localStorage.getItem('save_state')) : '';
                    if (alert) {
                        if (alert.action === 'like') {
                            message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីចូលចិត្តការប្រកាស។' : 'Please login to your account to like this post.';
                        }  else if (alert.action === 'resumes') {
                            message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីរក្សាទុកប្រវត្តិរូបសង្ខែប (CV)។' : 'Please login to your account to save this resume(CV).';
                        } else if (alert.action === 'save') {
                            message_success.value = language.value === 'km' ? 'សូមចូលទៅកាន់គណនីរបស់អ្នកដើម្បីរក្សាទុកការប្រកាស។' : 'Please login to your account to save this post.';
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
                }
            },500);

            // -- tracking on google analytic --
            track_google_analytics();
        }
    })

    function show_validate(){
        $(document).ready(function () {
            var $form = $("form");
            $form.validate({
            rules: {
                password: { required: true},
                username: { required: true},
            },
            messages: {
                username:  {
                    required: locale.value === 'km' ? km.message.error_username : en.message.error_username,
                    
                },
                password:  {
                    required: locale.value === 'km' ? km.message.error_password : en.message.error_password,
                },
            },
            submitHandler: () => {
                formSubmit()
            }
            });
        });
    }
    // ---- load script facebook login ----
    function login_facebook() {
        FB.login((response) => {
            // -- handle the response --
            if (response.status === 'connected') {
                request_login(response.authResponse.accessToken, 'facebook');
            }
        });
    }

    // ---- google login ----
    function login_with_google() {
        googleTokenLogin().then((response) => {
            // console.log("Handle the response", response);
            request_login(response.access_token, 'google');
        })
    }
    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('page_login', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // ---- check is have username and password ----
    async function formSubmit() {
        const token = await recaptcha('login');
        if (username.value && password.value) {
            if (window.navigator.onLine) { // check is connect to internet
                
                function_login(username.value, password.value , token); // start request login.

                error_username.value = null; // clear error validation on username
                error_password.value = null; // clear error validation on password
                return true;
            } else {
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
            }
        }

        if (!username.value) {
            error_username.value = "is_required";
        } else {
            error_username.value = null;
        }
        if (!password.value) {
            error_password.value = "is_required";
        } else {
            error_password.value = null;
        }
    }
    
    // ---- start request login ----
    function function_login(username, password , tk) {
        $(".btn_login").attr("disabled", true);  // disable button login
        loading.value = true;                  
        // open loading
        let input_data = {
            login: username, 
            password: password,
        }
        if(tk !== undefined){
            input_data['g-recaptcha-response'] = tk
        }
        $fetch(config.VUE_APP_API_URL + 'auth/login',{
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            params: {lang: language.value},
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'POST',
            body: new URLSearchParams(input_data)
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
                let res_data = res.data;
                // --- set date expired ---
                var expired = res_data.tokens.expires_in;
                var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
                // --- save to localStorage ---
                var object = {tokens: res_data.tokens, user: res_data.user, timestamp: set_date_expired};
                localStorage.setItem("auth_user", JSON.stringify(object));
                // --- save to cookie ---
                let user_cookies = helper.create_data_user_login(object);
                VueCookieNext.setCookie('auth_user', user_cookies);
                // --- store data quick login to localStorage ---
                if (id_quick_login.value) {      // action in edit login
                    let change_quick_data = {
                        id: id_quick_login.value,
                        name: res_data.user.name,
                        username: res_data.user.username,
                        password: password,
                        photo: res_data.user.photo ? res_data.user.photo.medium.url : ''
                    }
                    helper.change_quick_login_data(change_quick_data);
                } else {                        // action in login
                    helper.store_quick_login_data(password, res_data.user);
                }
                // --- redirect to specific page ---
                redirect_to_page(res_data);
            }

        }).catch(error => {
            if (!error.response) {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

            } else {
                if (error.response) {
                    let check = error.response; // original data error
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
                            save_track_optional('auth_status_302', { code: data_parse._data.next_page.code,
                                phone: data_parse._data.next_page.recipient_phone, message: data_parse._data.next_page.message });
                            router.push(localePath({ name: 'auth-max-sent-code' }));
                        }

                    } else {
                        $('.show_text_status').text(data_parse._data.message);
                        $('#modal_show_status').modal('show');
                    }
                }
            }
        }).finally(() => {
            loading.value = false;
            $(".btn_login").attr("disabled", false);
        });
    }
    // ---- redirect to specific page ----
    function redirect_to_page(res_data) {
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
                    save_track_optional('dt_post', { show_topic_post_id: d.show_topic_post_id, title: d.title, price: d.price, img: d.img });
                    if (isMobile.value === false) {
                        router.push(localePath({ name: 'chats', query: { to_id: d.to_id, username: d.username } }));
                    } else {
                        router.push(localePath({ name: 'chats-detail-chat', query: { to_id: d.to_id, username: d.username } }));
                    }

                }else if (save_state.action === 'resume_chat') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    // save params to work at detail chats
                    let dt_post = { show_topic_resume_id: d.show_topic_resume_id, title: d.title, work_experience: d.work_experience,position:d.position, img: d.img }
                    save_track_optional('dt_post', dt_post);
                    if (isMobile.value === false) {
                        router.push(localePath({ name: 'chats', query: { to_id: d.to_id, username: d.username } }));
                    } else {
                        router.push(localePath({ name: 'chats-detail-chat', query: { to_id: d.to_id, username: d.username } }));
                    }

                } else if (save_state.action === 'detail_comment') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    // save params to work at detail comments
                    let query = { post_id: d.post_id };
                    if (d.show_spe_com) query['show_spe_com'] = d.show_spe_com; // get specific detail comment.
                    if (isMobile.value === false) {
                        query['tap'] = 'comments';
                        query['sh_com'] = 'show';
                        router.push(localePath({name: 'chats', query: query}));
                    } else {
                        router.push(localePath({name: 'chats-detail-comment', query: query}));
                    }

                } else if (save_state.action === 'apply_job') {
                    let d = save_state.data;
                    localStorage.removeItem('save_state'); // remove key save_state
                    router.push(localePath({ name: 'apply-job-id', params: {id: d.post_id}, query: {title: d.title} }));

                } else {
                    let url = '';
                    let data_sent = '';
                    if (save_state.action === 'like') { // state like post
                        // url = 'me/likes';
                        url = config.VUE_APP_API_URL_LIKE_NEW + 'me';
                        data_sent = {id: save_state.data.post_id};
                    } else if (save_state.action === 'save') { // state like post
                        url = config.VUE_APP_API_URL + 'me/saved';
                        data_sent = {id: save_state.data.post_id};
                    } else if (save_state.action === 'save_store') { // state save user or store
                        url = config.VUE_APP_API_URL + 'me/saved';
                        data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                    }  else if (save_state.action === 'resumes') { // state save user or store
                        url = config.VUE_APP_API_URL + 'me/saved';
                        data_sent = {id: save_state.data.id, type: save_state.data.type};
                    }  else if (save_state.action === 'follow') { // state follow user
                        url = config.VUE_APP_API_URL + 'me/follow';
                        data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                    }

                    loading_field.value = true; // set second loading when have state save or like
                    $fetch(url,{
                        headers: { "Access-Token": res_data.tokens.access_token },
                        method: 'POST',
                        params: { lang: language.value },
                        body: new URLSearchParams(data_sent)
                    }).then(res => {
                        // console.log(res.data);
                        localStorage.removeItem('save_state'); // remove if successful.
                        save_track_optional('status_success', { status_success: res.message });
                        router.push(localePath({ name: 'index' }));

                    }).catch(error => {
                        if (!error.response) {
                            loading_field.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                        } else {
                            router.push(localePath({ name: 'index' }));
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
            router.push(localePath({name: 'account' }));
        }
    }
    // ---- click show password ----
    function show_password () {
        const passwordField = document.querySelector('#password')
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                     // change type input
            $('#icon_password').removeClass('fa-eye').addClass('fa-eye-slash');               // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_password').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    // ---- facebook login or google login ----
    function request_login(access_token, condition) {
        loading_field.value = true;

        $fetch(config.VUE_APP_API_URL + 'auth/login',{
            method: 'POST',
            params: { lang: language.value },
            body: new URLSearchParams({ 'token': access_token, 'type': condition })
        }).then(res => {
            // --- check status "302". If we have key "next_page" ---
            let n_p = res && res.next_page ? res.next_page : '';
            if (n_p) {
              if (n_p.page === 'auth/verify') {
                save_track_optional('auth_status_302', { phone: username.value, token: n_p.token, password: password.value });
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
                // --- set date expired ---
                var expired = res.data.tokens.expires_in;
                var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
                // --- save to localStorage ---
                var object = {tokens: res.data.tokens, user: res.data.user, timestamp: set_date_expired};
                localStorage.setItem("auth_user", JSON.stringify(object));
                // --- save to cookie ---
                let user_cookies = helper.create_data_user_login(object);
                VueCookieNext.setCookie('auth_user', user_cookies);
                // --- redirect to specific page ---
                redirect_to_page(res.data);
            }

        }).catch(error => {
            if (!error.response) {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

            } else {
                let check = error.response;
                let data_check = JSON.stringify(check);
                let data_parse = JSON.parse(data_check);

                if (check.status === 302) {
                    if (data_parse._data.next_page.page === 'auth/verify') {
                        save_track_optional('auth_status_302', { phone: username.value, token: data_parse._data.next_page.token, password: password.value });
                        router.push(localePath({ name: 'auth-confirm-code' }));

                    } else if (data_parse._data.next_page.page === 'auth/set_phone') {
                        save_track_optional('auth_status_302', { token: data_parse._data.next_page.token });
                        router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

                    } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                        save_track_optional('auth_status_302', { code: data_parse._data.next_page.code, phone: data_parse._data.next_page.recipient_phone, message: data_parse._data.next_page.message });
                        router.push(localePath({ name: 'auth-max-sent-code' }));
                    }

                } else {
                    $('.show_text_status').text(data_parse._data.message);
                    $('#modal_show_status').modal('show');
                }
            }

        }).finally(() => (loading_field.value = false) );
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- click enter and search ----
    function keymonitor(e) {
        if (e.keyCode === 13) {
            formSubmit();
        }
    }


    // ---- click quick login ----
    function click_quick_login (id) {
        if (window.navigator.onLine) { // check is connect to internet
            $.each(quick_login.value, (k, v) => {
                if (v.id === id && v.type === 'login') {
                    if (window.navigator.onLine) {                      // check is connect to internet
                        function_login(v.username_log, v.password_log); // start request login
                    } else {
                        $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                    }
                }
            });
        } else {
            loading_field.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
        }
    }
    function show_modal_option (id, name) {
        id_quick_login.value = id;
        show_quick_name.value = name;
        $('#modal_show_option_quick_login').modal('show'); // show modal show options
    }
    // ---- click edit quick login ----
    function click_edit_quick_login () {
        for (let key in quick_login.value) {
            if (parseInt(quick_login.value[key].id) === parseInt(id_quick_login.value)) {
                username.value = quick_login.value[key].username_log;
                password.value = quick_login.value[key].password_log;
            }
        }
        $('#modal_show_option_quick_login').modal('hide');      // close modal show options
    }
    // ---- click remove quick login ----
    function click_remove_quick_login () {
        $('#modal_show_option_quick_login').modal('hide');     // close modal show options
        $('#modal_confirm_remove_quick_login').modal('show');  // show modal show confirm remove
    }
    function confirm_remove() {
        for (let key in quick_login.value) {
            if (parseInt(quick_login.value[key].id) === parseInt(id_quick_login.value)) {
                // if input tag username and is the same must to clear all input
                if (username.value === quick_login.value[key].username_log) {
                    username.value = '';
                    password.value = '';
                    id_quick_login.value = '';
                    profile_quick_login.value = '';
                }

                quick_login.value.splice(key, 1); // delete associate in specific index.
                localStorage.setItem("quick_login", JSON.stringify(quick_login.value));
                // console.log(quick_login.value);
            }
        }
        $('#modal_confirm_remove_quick_login').modal('hide'); // hide modal show confirm remove
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

    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile; } }
</script>


