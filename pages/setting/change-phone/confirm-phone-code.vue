
<template>
    <div :class="isDesktop ? 'dt_bg_form_contain' : 'min_h mt_80 max_width_form'">
        <!-- App Bar -->
        <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-1 l_h_con_title">
                    <p class="name_style truncate_wrap m-0 text-white"> {{ $t('lng.confirm_code') }} </p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'" class="min_h mt_80">
            <div class="dt_ch_s_con p-3" :class="isMobile ? 'mt-5' : 'form-login rounded'">
                <p v-if="!isMobile" class="mb-3 text-black text-center fn_22 fw-semibold">{{ $t('lng.confirm_code') }}</p>
                <div class="tag-con-pad" :class="isDesktop ? 'max_width_form' : ''">
                    <h3>{{ phone_number ? phone_number : '' }}</h3>
                    {{ $t('message.text_confirm_phone1') }} {{ phone_number ? phone_number : '' }} {{ $t('message.text_confirm_phone2') }}
                </div>
                <form>
                    <div class="text-center c_s_b_btn">
                        <div class="mb-3">
                            <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.verify_code') }}</label>
                            <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" name="verify_code" v-model="verify_code" v-bind:placeholder="$t('message.verify_code')" class="form-control more_border"  :class="isMobile ? 'field-height': 'dt-field-height'">
                        </div>
                        <div v-if="error_on_verify_code" class="form_error_style">
                            <span> {{ $t('message.error_verify') }} </span>
                        </div>
                        <div id="btn">
                            <button class="btn btn-k24-secondary"  :class="isMobile ? 'btn-height': 'dt-btn-height'" id="test-color">
                                <span >{{  $t('message.verify') }}</span>
                            </button>
                        </div>
                    </div>
                </form>
                <div class="text-center">
                    <p class="margin_or text-secondary"> {{ $t('message.do_not_receive_code') }} </p>
                    <p class="mt-3 cur_sur" @click="resent_code" style="font-weight: 600;color: #00A1DE;"> {{ $t('message.resend') }} </p>
                </div>
            </div>
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
        <!-- /Modal show error connection -->
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    const { locale } = useI18n();
    definePageMeta( {layout: "custom", middleware: "auth"} );              // use layout dont have bottom nav bar check auth.

    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const localePath = useLocalePath();

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const auth_user = ref('');
    const phone_number = ref(null);
    const refresh_token = ref(null);
    const access_token = ref(null);
    const user_info = ref(null);
    const verify_code = ref(null);
    const loading = ref(false);
    const error_on_verify_code = ref(null);
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);
    const reload_q_again_4 = ref(0);

    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const params_str = pa_con && pa_con.auth_status_302 && pa_con.auth_status_302.d_params ? pa_con.auth_status_302.d_params : '';
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: 'Confirm Code - Khmer24.com',
        meta: [
            // { name: 'apple-mobile-web-app-title', content: 'Confirm Code - Khmer24.com' },
            // -- seo --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: 'Confirm Code - Khmer24.com' },
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
            show_validate()
            check_auth_user();

            refresh_token.value = auth_user.value ? auth_user.value.tokens.refresh_token : ''; // get refresh token from localStorage
            access_token.value = auth_user.value ? auth_user.value.tokens.access_token : '';   // get access token from localStorage
            user_info.value = auth_user.value ? auth_user.value.user : '';                     // get information user from localStorage
            phone_number.value = params_str && params_str.phone ? params_str.phone : '';  // get value from params route
            $(".arrow_back_nav").ripple();
            // --- remove class modal-open ---
            helper.remove_class_modal_open();
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('auth_status_302'); // clear data params condition.
    })

    function show_validate(){
        $(document).ready(function () {
            var $form = $("form");
            $form.validate({
                rules: {
                    verify_code: { required: true},
                },
                messages: {
                    verify_code:  {
                        required: locale.value === 'km' ? km.message.error_verify : en.message.error_verify,
                    },
                },
                submitHandler: () => {
                    formSubmit()
                }
            });
        });
    }

    // ---- check new auth user ----
    function check_new_auth_user() {
        check_auth_user();
        refresh_token.value = auth_user.value ? auth_user.value.tokens.refresh_token : ''; // get refresh token from localStorage
        access_token.value = auth_user.value ? auth_user.value.tokens.access_token : '';   // get access token from localStorage
    }
    // ---- convert date look beautiful ----
    function formSubmit() {
        check_new_auth_user();

        let token = ''; let url = '';
        if (access_token.value) {
            token = access_token.value;
            url = 'me/verify_new_phone';
        } else {
            token = params_str && params_str.token ? params_str.token : '';
            url = 'auth/verify';
        }

        if (verify_code.value) {
            if (window.navigator.onLine) { // check is connect to internet
                loading.value = true;
                $fetch(config.VUE_APP_API_URL + url,{
                    headers: { "Access-Token": token },
                    method: 'POST',
                    params: { lang: language.value },
                    body: new URLSearchParams({code: verify_code.value})

                }).then(res => {
                    // --- check status "302". If we have key "next_page" ---
                    let n_p = res && res.next_page ? res.next_page : '';
                    if (n_p) {
                        if (n_p.page === 'auth/max_send_code') {
                            router.replace(localePath({ name: 'auth-max-sent-code' }));
                            save_track_optional('auth_status_302', { code: n_p.code, phone: n_p.recipient_phone, message: n_p.message });
                        } else if (n_p.page === 'auth/reset_password') {
                            router.replace(localePath({ name: 'auth-set-new-password' }));
                            save_track_optional('auth_status_302', { token: n_p.token});
                        }

                    // --- simple response ---
                    } else {
                        // --- verify when user not yet to login ---
                        if (!access_token.value) {
                        var expired = res.data.tokens.expires_in;
                        var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
                        var object = {
                            tokens: res.data.tokens,
                            user: res.data.user,
                            timestamp: set_date_expired
                        };
                        localStorage.setItem("auth_user", JSON.stringify(object));
                        let user_cookies = helper.create_data_user_login(object);
                        VueCookieNext.setCookie('auth_user', user_cookies);
                        // router.replace(localePath({ name: 'account' }));

                        //--- check if have action state when redirect (this function have in choose_log,login,confirm_code and set_new_password) ---//
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
                                    if (isDesktop) {
                                        router.push(localePath({ name: 'chats', query: { to_id: d.to_id, username: d.username } }));
                                    } else {
                                        router.push(localePath({ name: 'chats-detail-chat', query: { to_id: d.to_id, username: d.username } }));
                                    }
                                    // save params to work at detail chats
                                    let dt_post = { show_topic_post_id: d.show_topic_post_id, title: d.title, price: d.price, img: d.img }
                                    save_track_optional('dt_post', dt_post);

                                } else if (save_state.action === 'detail_comment') {
                                    let d = save_state.data;
                                    localStorage.removeItem('save_state'); // remove key save_state
                                    // save params to work at detail comments
                                    let query = { post_id: d.post_id };
                                    if (d.show_spe_com) query['show_spe_com'] = d.show_spe_com; // get specific detail comment.
                                    if (isDesktop) {
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
                                    } else if (save_state.action === 'follow') { // state follow user
                                        url = config.VUE_APP_API_URL + 'me/follow';
                                        data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                                    }

                                    $fetch(url,{
                                        headers: {"Access-Token": auth_user.value.tokens.access_token},
                                        method: 'POST',
                                        params: {lang: language.value},
                                        body: new URLSearchParams(data_sent)
                                    }).then(res => {
                                        localStorage.removeItem('save_state'); // remove if successful.
                                        //--- redirect to home page with status success --//
                                        router.push(localePath({ name: 'index' }));
                                        save_track_optional('status_success', { status_success: res.message });
                                    }).catch(error => {
                                        if (!error.response) {
                                            loading.value = false; // close loading
                                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                                        } else {
                                            router.push(localePath({ name: 'index' }))
                                        }
                                    }).finally(() => { loading.value = false; });
                                }

                            } else {
                                if (save_state) { // expired, when login success
                                    localStorage.removeItem('save_state');  // if expired, remove
                                    router.push(localePath({ name: 'account' }));
                                }
                            }
                        } else {
                            loading.value = false;
                            router.push(localePath({ name: 'account' }));
                        }
                        //--- /check if have action state when redirect ---//

                    // --- verify when user login already ---
                    } else {
                        // --- request to refresh token when change phone user or add new phone number ---
                        $fetch(config.VUE_APP_API_URL + 'auth/token',{
                            headers: { "Refresh-Token": refresh_token.value },
                            method: 'POST',
                            params: { lang: language.value },

                        }).then(response => {

                            // --- if change success set new value user to localStorage ---
                            $fetch(config.VUE_APP_API_URL + 'me',{
                                headers: { "Access-Token": response.data.access_token },
                                params: { lang: language.value },

                            }).then(get_res => {
                                //--- set date expired ---//
                                var expired = response.data.expires_in;
                                var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
                                //--- save to localStorage ---//
                                var object = {
                                    tokens: response.data,
                                    user: get_res.data,
                                    timestamp: set_date_expired
                                };
                                localStorage.setItem("auth_user", JSON.stringify(object));
                                // --- save to cookies ---
                                let user_cookies = helper.create_data_user_login(object);
                                VueCookieNext.setCookie('auth_user', user_cookies);
                                //--- redirect to setting user form ---//
                                if (route.query.from === 'post_ads') {
                                    router.replace(localePath({ name: 'post', query: { act_suc_his: 'success' } }));
                                } else {
                                    router.replace(localePath({ name: 'account' }));
                                }

                            }).catch(error => {
                                if (!error.response) {
                                    if (reload_q_again_1.value < 2) {
                                        reload_q_again_1.value += 1;
                                        check_auth_user();
                                        setTimeout( () => { formSubmit(); }, 3000);
                                    } else {
                                        loading.value = false; // close loading
                                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                                    }

                                } else if (error.response && error.response.status === 401) { // retry
                                    if (reload_q_again_1.value <= 2) {
                                        reload_q_again_1.value += 1;
                                        check_auth_user();
                                        setTimeout( () => { formSubmit(); }, 3000);
                                    } else {
                                        localStorage.removeItem('auth_user');   // remove localStorage
                                        VueCookieNext.removeCookie('auth_user');
                                        router.replace(localePath({ name: 'index' }));
                                    }
                                }
                            }).finally(() => (loading.value = false));
                            // --- /if change success set new value user to localStorage ---

                        }).catch(error => {
                            if (!error.response) {
                                if (reload_q_again_2.value < 2) {
                                    reload_q_again_2.value += 1;
                                    check_auth_user();
                                    setTimeout( () => { formSubmit(); }, 3000);
                                } else {
                                    loading.value = false; // close loading
                                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                                }
                            } else if (error.response) {
                                let check = error.response;
                                let data_check = JSON.stringify(check);
                                let data_parse = JSON.parse(data_check);

                                if (check.status === 401) { // retry
                                    if (reload_q_again_2.value <= 2) {
                                        reload_q_again_2.value += 1;
                                        check_auth_user();
                                        setTimeout( () => { formSubmit(); }, 3000);
                                    } else {
                                        localStorage.removeItem('auth_user');   // remove localStorage
                                        VueCookieNext.removeCookie('auth_user');
                                        router.replace(localePath({ name: 'index' }));
                                    }
                                } else {
                                    $('.show_text_status').text(data_parse._data.message);
                                    $('#modal_show_status').modal('show');
                                    loading.value = false;
                                }
                            }
                        });
                        // --- /request to refresh token ---
                    }
                    }
                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_3.value < 2) {
                            reload_q_again_3.value += 1;
                            check_auth_user();
                            setTimeout( () => { formSubmit(); }, 3000);
                        } else {
                            loading.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                        }

                    } else {
                        if (error.response) {
                            let check = error.response; // original data error
                            let data_check = JSON.stringify(check);
                            let data_parse = JSON.parse(data_check);

                            if (check.status === 302) {
                                if (data_parse._data.next_page.page === 'auth/max_send_code') {
                                    router.replace(localePath({ name: 'auth-max-sent-code' }));
                                    save_track_optional('auth_status_302', {
                                        code: data_parse._data.next_page.code,
                                        phone: data_parse._data.next_page.recipient_phone,
                                        message: data_parse._data.next_page.message
                                    });
                                } else if (data_parse._data.next_page.page === 'auth/reset_password') {
                                    router.replace(localePath({ name: 'auth-set-new-password' }));
                                    save_track_optional('auth_status_302', { token: data_parse._data.next_page.token});
                                }

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_3.value <= 2) {
                                    reload_q_again_3.value += 1;
                                    check_auth_user();
                                    setTimeout( () => { formSubmit(); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }

                            } else {
                                $('.show_text_status').text(data_parse._data.message);
                                $('#modal_show_status').modal('show');
                                loading.value = false;
                            }
                        }
                    }
                });

                error_on_verify_code.value = null; // clear error validation on phone numbers
                return true;

            } else {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
            }

        }

        if (!verify_code.value) { error_on_verify_code.value = "is_required"; } else { error_on_verify_code.value = null; }
    }
    // ---- recent code ----
    function resent_code() {
        check_new_auth_user();

        if (window.navigator.onLine) { // check is connect to internet

            let token = ''; let url = '';
            if (access_token.value) {
                token = access_token.value;
                url = 'me/resend_activate_new_phone_code';
            } else {
                token = params_str && params_str.token ? params_str.token : '';
                url = 'auth/resend_code';
            }

            if (token) {
                loading.value = true;
                $fetch(config.VUE_APP_API_URL + url,{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: { "Access-Token": token },
                    method: 'POST',
                    params: {lang: language.value}
                }).then(res => {

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_4.value < 2) {
                            reload_q_again_4.value += 1;
                            check_auth_user();
                            setTimeout( () => { resent_code(); }, 3000);
                        } else {
                            loading.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                        }
                    } else {
                        if (error.response) {
                            let check = error.response; // original data error
                            let data_check = JSON.stringify(check);
                            let data_parse = JSON.parse(data_check);

                            if (check.status === 401) { // retry
                                if (reload_q_again_4.value <= 2) {
                                    reload_q_again_4.value += 1;
                                    check_auth_user();
                                    setTimeout( () => { resent_code(); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }

                            } else {
                                $('.show_text_status').text(data_parse._data.message);
                                $('#modal_show_status').modal('show');
                            }
                        }
                    }
                }).finally(() => { loading.value = false; });

            } else {
                $('.show_text_status').text('Unauthorized, you may need to start from the first step again!');
                $('#modal_show_status').modal('show');
            }

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }
    // ---- check auth user login ----
    function check_auth_user() {
        auth_user.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
</script>

