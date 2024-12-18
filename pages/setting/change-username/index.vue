
<template>
    <div :class="isDesktop ? 'dt_bg_form_contain' : ''">
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth/>
        </template>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'" class="mt_80 min_h">
            <div class="dt_ch_s_con pt-3 px-3" :class="isMobile ? 'mt-5' : 'form-login rounded'">
                <p v-if="!isMobile" class="mb-3 text-black text-center fn_22 fw-semibold">{{ $t('message.edit_username') }}</p>
                <div class="tag-con-pad">{{ $t('message.dis_change_username') }}</div>
                <div class="max_width_form">
                    <form class="c_s_b_btn">
                        <div class="mb-3">
                            <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.username') }}</label>
                            <input type="text" v-model="username" name="username" v-bind:placeholder="$t('message.username')"  :class="isMobile ? 'field-height': 'dt-field-height'" class="form-control more_border">
                        </div>
                        <div id="btn">
                            <button class="btn btn-k24-secondary"  :class="isMobile ? 'btn-height': 'dt-btn-height'" id="test-color">
                                <span >{{  $t('message.submit') }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- Modal change username -->
        <div class="modal class_modal_show_message" id="modal_add_password" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form"> <!-- modal_content_style -->
                    <div class="modal-body break_word_ p-3">
                        {{ $t('message.dis_type_password') }}

                        <div class="col-12 p-0 position_relative">
                            <input type="password" id="confirm_pass" v-model="password" v-bind:placeholder="$t('message.hin_password')" class="form-control custom_field more_border pad_right_text_icon mt-2">
                            <i id="icon_confirm_pass" class="far fa-eye text_grey icon_in_text_field cur_sur" @click="show_password"></i>
                        </div>
                    </div>
                    <div v-if="error_password" class="form_error_style" style="margin-left: 15px!important;">
                        <span> {{ $t('message.error_password') }} </span>
                    </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn" style="color: grey;"> {{ $t('message.cancel') }} </button>
                        <button type="button" class="btn text-primary cur_sur" @click="save_change"> {{ $t('message.submit') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal change username -->

        <!-- Modal Show Error Status Code -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form"> <!-- modal_content_style -->
                    <div class="modal-body break_word_ show_text_status">  </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary">{{ $t('message.close') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal Show Error Status Code -->

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
            <div class="modal-dialog max_width_form mg-mo-auto" role="document" >
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
        <div class="toast style_toast d-none toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="mr-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ml-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
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
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    const { locale } = useI18n();
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "default", middleware: "auth"} );               // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const user_data = ref('');
    const username = ref(null);
    const password = ref(null);
    const loading = ref(null);
    const access_token = ref(null);
    const is_has_password = ref(null);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const error_username = ref(null);
    const error_password = ref(null);
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);
    const reload_q_again_4 = ref(0);

    // --- meta variable ---
    const meta_title_c_username = useState('meta_title_c_username', () => 'Change Username - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_c_username.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_c_username.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_c_username.value },
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
            user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';

            access_token.value = user_data.value.tokens.access_token;
            username.value = user_data.value.user.username;

            // -- tracking on google analytic --
            track_google_analytics();
        }
    })

    function show_validate(){
        $(document).ready(function () {
            var $form = $("form");
            $form.validate({
            rules: {
                username: { required: true},
            },
            messages: {
                username:  {
                    required: locale.value === 'km' ? km.message.error_name_username : en.message.error_name_username,
                    
                },
            },
            submitHandler: () => {
                show_Modal()
            }
            });
        });
    }

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_c_username.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Change_username', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- check new auth user ----
    function check_new_auth_user() {
        user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
        access_token.value = user_data.value.tokens.access_token;
    }
    // ---- click back one page ----
    function goBack() {
        window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' }));
    }
    // ---- show modal confirm password to change username ----
    function show_Modal() {
        check_new_auth_user();

        if (username.value) {
            if(window.navigator.onLine) {
                // -- request only username without password --
                let query_str = {username: username.value}
                loading.value = true;
                // --- edit profile picture ---
                $fetch(config.VUE_APP_API_URL + 'me/change_username',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Access-Token": access_token.value},
                    method: 'POST',
                    params: {lang: language.value},
                    body: new URLSearchParams(query_str)
                }).then(res => {

                    // --- if change success set new value user to localStorage ---
                    $fetch(config.VUE_APP_API_URL + 'me', {
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        headers: {"Access-Token": access_token.value},
                        params: {lang: language.value}
                    }).then(response => {
                        let res_data = response.data;
                        var auth_user = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : null;
                        var object = {
                            tokens: auth_user.tokens,
                            user: res_data,
                            timestamp: auth_user.timestamp
                        };
                        localStorage.setItem("auth_user", JSON.stringify(object));
                        // --- set cookie ---
                        let user_cookies = helper.create_data_user_login(object);
                        VueCookieNext.setCookie('auth_user', user_cookies);

                        // ---- change quick login in localStorage if username change ----
                        let change_quick_data = {
                            id: res_data.id,
                            name: res_data.name,
                            username: res_data.username,
                            password: '',
                            photo: res_data.photo ? res_data.photo.medium.url : ''
                        }
                        helper.change_quick_login_data(change_quick_data);

                        message_success.value = res.message;
                        error_or_success_message.value = true;
                        let toast = $(".toast");
                        toast.removeClass('d-none');
                        toast.toast({delay: 7000});
                        toast.toast('show');

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_1.value < 2) {
                                reload_q_again_1.value += 1;
                                setTimeout( () => { show_Modal(); }, 3000);
                            } else {
                                loading.value = false; // close loading
                                $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                            }

                        } else if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_1.value <= 2) {
                                reload_q_again_1.value += 1;
                                setTimeout( () => { show_Modal(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }))
                            }
                        }
                    }).finally(() => (loading.value = false));
                    // --- /if change success set new value user to localStorage ---

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_2.value < 2) {
                            reload_q_again_2.value += 1;
                            setTimeout( () => { show_Modal(); }, 3000);
                        } else {
                            loading.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                        }
                    } else {
                        let check = error.response ? error.response : ''; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check && check.status === 401) { // retry
                            if (reload_q_again_2.value <= 2) {
                                reload_q_again_2.value += 1;
                                setTimeout( () => { show_Modal(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }))
                            }

                        } else {
                            $('.show_text_status').text(data_parse._data.message);
                            $('#modal_show_status').modal('show');
                        }
                    }

                }).finally(() => (loading.value = false));

                // --- false connection ---
            } else {
                loading.value = false; // close error and show modal
                $('#modal_show_status_error_connection').modal('show');
            }

            error_username.value = null;
            return true;
        }
        if (!username.value) {
            error_username.value = "is_required";
        } else {
            error_username.value = null;
        }
    }
    // ---- show password ---
    function show_password () {
        const passwordField = document.querySelector('#confirm_pass')
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                     // change type input
            $('#icon_confirm_pass').removeClass('fa-eye').addClass('fa-eye-slash');           // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_confirm_pass').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }

    // ---- save change username with confirm old password ----
    function save_change() {
        if (password.value) {
            let query_str = {  password: password.value,  username: username.value,  }
            $('#modal_add_password').modal('hide'); // close modal password

            if (window.navigator.onLine) {
                loading.value = true;
                // --- edit profile picture ---
                $fetch(config.VUE_APP_API_URL + 'me/change_username',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Access-Token": access_token.value},
                    method: 'POST',
                    params: { lang: language.value },
                    body: new URLSearchParams(query_str)
                }).then(res => {

                    // --- if change success set new value user to localStorage ---
                    $fetch(config.VUE_APP_API_URL + 'me', {
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        headers: {"Access-Token": access_token.value},
                        params: {lang: language.value},
                    }).then(response => {
                        let res_data = response.data;
                        var auth_user = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : null;
                        var object = {tokens: auth_user.tokens, user: res_data, timestamp: auth_user.timestamp};
                        localStorage.setItem("auth_user", JSON.stringify(object));
                        // --- set cookie ---
                        let user_cookies = helper.create_data_user_login(object);
                        VueCookieNext.setCookie('auth_user', user_cookies);

                        // ---- change quick login in localStorage if username change ----
                        let change_quick_data = {
                            id: res_data.id,
                            name: res_data.name,
                            username: res_data.username,
                            password: '',
                            photo: res_data.photo ? res_data.photo.medium.url : ''
                        }
                        helper.change_quick_login_data(change_quick_data);

                        message_success.value = res.message;
                        error_or_success_message.value = true;
                        let toast = $('.toast');
                        toast.removeClass('d-none');
                        toast.toast({delay: 7000});
                        toast.toast('show');

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_3.value < 2) {
                                reload_q_again_3.value += 1;
                                setTimeout( () => { save_change(); }, 3000);
                            } else {
                                loading.value = false; // close loading
                                $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                            }

                        } if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_3.value <= 2) {
                                reload_q_again_3.value += 1;
                                setTimeout( () => { save_change(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }))
                            }
                        }
                    }).finally(() => (loading.value = false));
                    // --- /if change success set new value user to localStorage ---

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_4.value <= 2) {
                            reload_q_again_4.value += 1;
                            setTimeout( () => { save_change(); }, 3000);
                        } else {
                            loading.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                        }

                    } else {
                        let check = error.response ? error.response : ''; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check && check.status === 401) { // retry
                            if (reload_q_again_4.value <= 2) {
                                reload_q_again_4.value += 1;
                                setTimeout( () => { save_change(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }))
                            }

                        } else {
                            $('.show_text_status').text(data_parse._data.message);
                            $('#modal_show_status').modal('show');
                        }
                    }

                }).finally(() => (loading.value = false));

            } else {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
            }

            error_password.value = null;
            return true;
        }

        if (!password.value) {
            error_password.value = "is_required";
        } else {
            error_password.value = null;
        }
    }
</script>
