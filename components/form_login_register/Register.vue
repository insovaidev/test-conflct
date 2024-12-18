
<template>
    <div>
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth />
        </template>

        <!-- Body -->    
        <div :class=" isMobile ? '' : 'screen-content-desktop mt_80 min_h'">
            <form class="py-3 px-4 borders rounded" :class="isMobile ? '' : 'form-login'">
                <p class="mb-3 title">{{ locale==='km' ? 'ចុះឈ្មោះដើម្បីដាក់លក់ដោយឥតគិតថ្លៃ' : 'Register to post free ad' }}</p>
                <div class="form-group ">
                    <div class="w-100 mb-3">
                        <label class="form-label label">{{ $t('message.first_name') }} <b class="text-danger">*</b></label>
                        <input type="text" v-model="first_name" name="f_name" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div v-if="error_first_name" class="form_error_style m-0">
                            <span> {{ $t('message.error_first_name') }} </span>
                        </div>
                    </div>
                    <!-- Last Name -->
                    <div v-if="!isMobile" class="mx-2"></div>
                    <div class="w-100 mb-3">
                        <label class="form-label label">{{ $t('message.last_name') }} <b class="text-danger">*</b></label>
                        <input type="text" v-model="last_name" name="l_name" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div v-if="error_last_name" class="form_error_style m-0">
                            <span> {{ $t('message.error_last_name') }} </span>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label label" for="">{{ $t('message.phone_number') }} <b class="text-danger">*</b></label>
                    <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" decimal="true" v-model="phone" name="phone" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    <div v-if="error_phone" class="form_error_style m-0">
                        <span> {{ $t('message.error_username') }} </span>
                    </div>
                </div>
                <div class="form-group mb-3 bg-none">
                    <label class="form-label label" for="">{{ $t('message.hin_password') }} <b class="text-danger">*</b></label>
                    <input type="password" autocomplete="off" maxlength="100" id="password" name="password" v-on:keyup="keymonitor" v-model="password" class="form-control more_border pad_right_text_icon" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    <i id="icon_password" class="far fa-eye text_grey icon_in_text_field cur_sur ps-t" @click="show_password"></i>
                    <div v-if="error_password" class="form_error_style m-0">
                        <span> {{ $t('message.error_password') }} </span>
                    </div>
                </div>
                <div class="form-group mb-3 bg-none">
                    <label class="form-label label" for="">{{$t('message.confirm_password')}} <b class="text-danger">*</b></label>
                    <input type="password" autocomplete="off" maxlength="100" id="confirm_password" name="confirm_password" v-on:keyup="keymonitor" v-model="confirm_password"  class="form-control more_border pad_right_text_icon" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    <i id="icon_confirm_password" class="far fa-eye text_grey icon_in_text_field cur_sur ps-t" @click="show_confirm_password"></i>
                    <div v-if="error_confirm_password" class="form_error_style m-0">
                        <span> {{ $t('message.error_confirm_pass') }} </span>
                    </div>
                    <div v-if="password && password.length >= 6 && check_password === false" class="form_error_style m-0">
                        <span> {{ $t('message.pass_and_confirm_not_mach') }} </span>
                    </div>
                </div>
                <div id="btn" class="mb-3">
                        <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                            <span >{{  $t('message.submit') }}</span>
                            <img v-if="loading" :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_in_button">
                        </button>
                    </div>
                <div v-if="!isMobile">
                    <div class="ch_login_Pa mt-2">
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
                    <div class="ch_login_Pa">
                        <div class="col p-0"> <hr> </div>
                        <div class="ch_con_or"> {{ $t('message.or') }} </div>
                        <div class="col p-0"> <hr> </div>
                    </div>
                </div>
                <div v-if="!isMobile" class="form-group">
                    <label class="mb-1 form-label label" for="">{{ locale==='km' ? 'មានគណនីរួចហើយ?' : 'Already have an account?' }}</label>
                    <NuxtLink :to="localePath({ name: 'login' })" class="btn btn-k24-primary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                        {{ $t('message.dt_login') }}
                    </NuxtLink>
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
            </form>
        </div>

        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- Modal -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status">  </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary">{{ $t('message.close') }}</button>
                    </div>
                </div>
            </div>
        </div>

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
    </div>
</template>

<script setup>
    import { event, pageview } from 'vue-gtag';
    import { googleTokenLogin } from "vue3-google-login";
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.

    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const version_library = config.LIBRARY_VERSION;
    const { locale } = useI18n();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;

    const first_name = ref(null);
    const last_name = ref(null);
    const phone = ref(null);
    const password = ref(null);
    const confirm_password = ref(null);
    const check_password = ref(false);

    const error_first_name = ref(null);
    const error_last_name = ref(null);
    const error_phone = ref(null);
    const error_password = ref(null);
    const error_confirm_password = ref(null);

    const loading = ref(false);
    const loading_field = ref(false);
    const isMobile= ref(helper.m_or_d())
    const recaptcha = useRecaptcha();

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    // --- meta variable ---
    const meta_title_register = useState('meta_title_register', () => 'khmer24.com, Register, Buy and Sell Everything In Cambodia');

    useHead({
        title: meta_title_register.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_register.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Register, Register khmer24, khmer24 Register' },
            { name: 'description', content: 'Register, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },
            // -- facebook --
            { property: 'og:title', content: meta_title_register.value },
            { property: 'fb:app_id', content: '217361691621555' },
            { property: 'og:site_name', content: 'www.khmer24.com' },
            { property: 'og:url', content: 'https://www.khmer24.com/en/' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg' },
            { property: 'og:image:width', content: '600' },
            { property: 'og:image:height', content: '600' },
            { property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.' },
        ],
    })

    onMounted(() => {
        if (process.client) {
            show_validate()
            localStorage.removeItem('im_store')
            track_google_analytics();  // tracking on google analytic
        }
    })

    function show_validate(){
        $(document).ready(function () {
            jQuery.validator.addMethod("phoneKM", function(phone_number, element) {
                phone_number = phone_number.replace(/\s+/g, "");
                return this.optional(element) || phone_number.length >= 9 && 
                phone_number.match(/0[1-9]{1}[0-9]{7,8}/);
            }, "Valid phone number");
            var $form = $("form");
            $form.validate({
            rules: {
                f_name: { required: true},
                l_name: { required: true},
                phone: { required: true, phoneKM: true, maxlength: 10},
                password: { required: true,},
                confirm_password: { required: true,  },
            },
            messages: {
                f_name:  {
                    required: locale.value === 'km' ? km.message.error_first_name : en.message.error_first_name,
                },
                l_name:  {
                    required: locale.value === 'km' ? km.message.error_last_name : en.message.error_last_name,
                },
                phone: { 
                    required: locale.value === 'km' ? km.message_er.phone_1 : en.message_er.phone_1,
                    phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, 
                    maxlength: locale.value === 'km' ? km.validation.error_valid_phone : en.validation.error_valid_phone, 
                },
                password:  {
                    required: locale.value === 'km' ? km.message.error_password : en.message.error_password,
                },
                confirm_password:  {
                    required: locale.value === 'km' ? km.message.error_confirm_pass : en.message.error_confirm_pass,
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
                router.push(localePath({ name: 'auth-confirm-code' }));
              } else if (n_p.page === 'auth/set_phone') {
                save_track_optional('auth_status_302', { token: n_p.token });
                router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));
              } else if (n_p.page === 'auth/max_send_code') {
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
                        router.push(localePath({ name: 'auth-confirm-code' }));
                    } else if (data_parse._data.next_page.page === 'auth/set_phone') {
                        save_track_optional('auth_status_302', { token: data_parse._data.next_page.token });
                        router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));
                    } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                        router.push(localePath({ name: 'auth-max-sent-code' }));
                    }

                } else {
                    $('.show_text_status').text(data_parse._data.message);
                    $('#modal_show_status').modal('show');
                }
            }

        }).finally(() => (loading_field.value = false) );
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

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_register.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('page_register', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- convert date look beautiful ----
    async function formSubmit(e) {
        if (first_name.value && last_name.value && phone.value && password.value && confirm_password.value) {

            if (window.navigator.onLine) { // check is connect to internet
                loading.value = true;                     // open loading
                const token = await recaptcha('register');
                let input_data = {
                    first_name: first_name.value,
                    last_name: last_name.value,
                    phone: phone.value,
                    password: password.value,
                    con_password: confirm_password.value,
                }
                if(token !== undefined){
                    input_data['g-recaptcha-response'] = token
                }
                $fetch(config.VUE_APP_API_URL + 'auth/register',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    method: 'POST',
                    params: { lang: language.value },
                    body: new URLSearchParams(input_data)
                }).then(res => { // console.log(res);
                    // --- check status "302". If we have key "next_page" ---
                    let n_p = res && res.next_page ? res.next_page : '';
                    if (n_p) {
                        if (n_p.page === 'auth/verify') {
                          save_track_optional('auth_status_302', { phone: phone.value, token: n_p.token, password: password.value });
                          router.push(localePath({name: 'auth-confirm-code'}));

                        } else if (n_p.page === 'auth/set_phone') {
                          save_track_optional('auth_status_302', { token: n_p.token });
                          router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

                        } else if (n_p.page === 'auth/max_send_code') {
                          save_track_optional('auth_status_302', { code: n_p.code, phone: n_p.recipient_phone, message: n_p.message });
                          router.push(localePath({ name: 'auth-max-sent-code' }));
                        }
                    }

                }).catch(error => {
                    if (!error.response) {
                        loading.value = false; // close loading
                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                    } else {
                        if (error.response) {
                            let check = error.response;
                            let data_check = JSON.stringify(check);
                            let data_parse = JSON.parse(data_check);

                            if (check.status === 302) {
                                if (data_parse._data.next_page.page === 'auth/verify') {
                                    save_track_optional('auth_status_302', { phone: phone.value, token: data_parse._data.next_page.token, password: password.value });
                                    router.push(localePath({name: 'auth-confirm-code'}));

                                } else if (data_parse._data.next_page.page === 'auth/set_phone') {
                                    save_track_optional('auth_status_302', { token: data_parse._data.next_page.token });
                                    router.push(localePath({ name: 'setting-change-phone', query: { from: 'login' } }));

                                } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                                    save_track_optional('auth_status_302', {
                                        code: data_parse._data.next_page.code,
                                        phone: data_parse._data.next_page.recipient_phone,
                                        message: data_parse._data.next_page.message
                                    });
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
                    // $(".btn_register").attr("disabled", false);
                });

            } else {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
            }

            error_first_name.value = null;       // clear error validation on first_name
            error_last_name.value = null;        // clear error validation on last_name
            // error_username.value = null;         // clear error validation on username
            error_password.value = null;         // clear error validation on password
            return true;
        }

        // ---- check error ----
        if (!first_name.value) { error_first_name.value = "is_required"; } else { error_first_name.value = null; }
        if (!last_name.value) { error_last_name.value = "is_required"; } else { error_last_name.value = null; }
        if (!phone.value) { error_phone.value = "is_required"; } else { error_phone.value = null; }
        if (!password.value) { error_password.value = "is_required"; } else { error_password.value = null; }
        if (!confirm_password.value) { error_confirm_password.value = "is_required"; } else { error_confirm_password.value = null; }
        e.preventDefault();
    }
    // ---- click show password ----
    function show_password () {
        const passwordField = document.querySelector('#password')
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                         // change type input
            $('#icon_password').removeClass('fa-eye').addClass('fa-eye-slash');               // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_password').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    function show_confirm_password () {
        const confirm_password = document.querySelector('#confirm_password')
        if (confirm_password.getAttribute('type') === 'password') {
            confirm_password.setAttribute('type', 'text');                         // change type input
            $('#icon_confirm_password').removeClass('fa-eye').addClass('fa-eye-slash');               // change icon eye
        } else {
            confirm_password.setAttribute('type', 'password')
            $('#icon_confirm_password').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }

    // ---- compare password ----
    function keymonitor() {
        if (password.value && confirm_password.value && password.value === confirm_password.value && password.value.length >= 6) {
            check_password.value = true;
        } else {
            check_password.value = false;
        }
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
</script>


