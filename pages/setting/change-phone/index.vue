
<template>
    <div :class="isDesktop ? 'dt_bg_form_contain' : 'min_h mt_80 max_width_form'">
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth/>
        </template>

        <!-- Loading -->
        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'">
            <div class="dt_ch_s_con px-3 pt-3" :class="isMobile ? 'mt-5' : 'form-login rounded'">
                <p v-if="!isMobile" class="mb-3 text-black text-center fn_22 fw-semibold">{{ $t('message.change_activate_phone') }}</p>
                <div class="tag-con-pad" :class="isDesktop ? 'max_width_form' : ''">
                    {{ is_from ? $t('new_text_1.add_phone_number') : $t('message.dis_activate_phone') }}
                </div>
                <form class="c_s_b_btn">
                    <div class="mb-3">
                        <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.phone') }}</label>
                        <input type="tel" autocomplete="off" id="_phone_" name="phone" v-model="phone_number" v-bind:placeholder="$t('message.phone')" :class="isMobile ? 'field-height': 'dt-field-height'" class="form-control more_border">
                    </div>
                    <div id="btn" >
                        <button class="btn btn-k24-secondary"  :class="isMobile ? 'btn-height': 'dt-btn-height'" id="test-color">
                            <span >{{  $t('message.submit') }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal Show Error Status Code -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog max_width_ mg_center from_top" role="document">
                <div class="modal-content modal_content_style max_width_form">
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
    definePageMeta( {layout: "default", middleware: "auth"} );              // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;

    const is_from = ref(route.query.from ? route.query.from : '');

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const auth_user = ref('');
    const loading = ref(null);
    const phone_number = ref(null); // model input
    const password = ref(null);
    const message_success = ref('');
    const error_or_success_message = ref(true);

    const error_phone_number = ref(null);
    const error_password = ref(null);

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);

    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const params_str = pa_con && pa_con.auth_status_302 && pa_con.auth_status_302.d_params ? pa_con.auth_status_302.d_params : '';

    // --- meta variable ---
    const meta_title_c_phone = useState('meta_title_c_phone', () => 'Change Phone - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_c_phone.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_c_phone.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_c_phone.value },
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
            check_new_auth_user();

            $('#_phone_').focus();
            phone_number.value = auth_user.value.user && auth_user.value.user.account_verification && auth_user.value.user.account_verification.phone ? auth_user.value.user.account_verification.phone.value : '';

            setTimeout(function() {
                helper.clear_params_make_con('auth_status_302'); // clear params condition.
            },700);

            if(!params_str && !auth_user.value){
                router.push(localePath({ name: 'index' }))
            }

            // -- tracking on google analytic --
            track_google_analytics();
        }
    })

    function show_validate(){
        $(document).ready(function () {
            var $form = $("form");
            $form.validate({
                rules: {
                    phone: { required: true},
                },
                messages: {
                    phone:  {
                        required: locale.value === 'km' ? km.message.error_phone_number : en.message.error_phone_number,
                    },
                },
                submitHandler: () => {
                    save_change()
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
                page_title: meta_title_c_phone.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Change_phone', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // ---- save change Activate Phone Number with confirm old password ----
    function save_change() {
        // --- without confirm password modal ---
        if (phone_number.value) {
            external_function({ phone: phone_number.value });      // --- get external request ---
        }
        // if (!phone_number.value) { $('#_phone_').focus(); error_phone_number.value = "is_required"; } else { error_phone_number.value = null; }
        // e.preventDefault();
    }

    // ---- check new auth user ----
    function check_new_auth_user() {
        auth_user.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }

    // --- external function ---
    async function external_function(data) {
        check_new_auth_user();
        let token = ''; let url = '';
        if (auth_user.value) {
            token = auth_user.value.tokens.access_token;
            url = 'me/set_new_phone';
        } else {
            token = params_str && params_str.token ? params_str.token : '';
            url = 'auth/set_phone';
        }

        if(window.navigator.onLine) {
            // --- edit profile picture ---
            loading.value = true;
            await $fetch(config.VUE_APP_API_URL + url,{
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                headers: {"Access-Token": token},
                method: 'POST',
                params: {lang: language.value},
                body: new URLSearchParams(data)
            }).then(res => {
                // --- check status "302". If we have key "next_page" ---
                let n_p = res && res.next_page ? res.next_page : '';
                if (n_p) {
                    // console.log('test1')
                    if (n_p.page === 'me/verify_new_phone') {
                      router.replace(localePath({ name: 'setting-change-phone-confirm-phone-code', query: {from: is_from.value} }));
                      save_track_optional('auth_status_302', { phone: phone_number.value});

                    } else if (n_p.page === 'auth/max_send_code') {
                      router.replace(localePath({ name: 'auth-max-sent-code' }));
                      save_track_optional('auth_status_302', { code: n_p.code, phone: n_p.recipient_phone, message: n_p.message });

                    } else if (n_p.page === 'auth/verify') {
                      router.replace(localePath({ name: 'setting-change-phone-confirm-phone-code', query: {from: is_from.value} }));
                      save_track_optional('auth_status_302', { token: n_p.token, phone: phone_number.value });
                    }

                // --- simple response ---
                } else {
                    // console.log('test2')
                    // --- if change success set new value user to localStorage ---
                    $fetch(config.VUE_APP_API_URL + 'me', {
                      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                      headers: {"Access-Token": auth_user.value.tokens.access_token},
                      params: {lang: language.value},
                    }).then(response => {
                      var object = {
                        tokens: auth_user.value.tokens,
                        user: response.data,
                        timestamp: auth_user.value.timestamp
                      };
                      localStorage.setItem("auth_user", JSON.stringify(object));

                      let user_cookies = helper.create_data_user_login(object);
                      VueCookieNext.setCookie('auth_user', user_cookies);
                      $('#modal_add_password').modal('hide');
                      password.value = null;

                      message_success.value = res.message;
                      error_or_success_message.value = true;
                      let toast = $('.toast');
                      toast.removeClass('d-none');
                      toast.toast({delay: 7000});
                      toast.toast('show');
                      router.replace(localePath({ name: 'setting-change-phone-confirm-phone-code', query: {from: is_from.value} }));

                    }).catch(error => {
                        console.log(error)
                      if (!error.response) {
                        if (reload_q_again_1.value < 2) {
                          reload_q_again_1.value += 1;
                          check_new_auth_user();
                          setTimeout(() => {
                            external_function({phone: phone_number.value});
                          }, 3000);
                        } else {
                          loading.value = false; // close loading
                          $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                        }

                      } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                          reload_q_again_1.value += 1;
                          check_new_auth_user();
                          setTimeout(() => {
                            external_function({phone: phone_number.value});
                          }, 3000);
                        } else {
                          localStorage.removeItem('auth_user');   // remove localStorage
                          VueCookieNext.removeCookie('auth_user');
                          router.replace(localePath({name: 'index'}));
                        }
                      }

                    }).finally(() => (loading.value = false));
                    // --- /if change success set new value user to localStorage ---
                }

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                } else {
                    let check = error.response ? error.response : ''; // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);

                    if (check && check.status === 302) { // change push to replace route prevent click back to old page
                        if (data_parse._data.next_page.page === 'me/verify_new_phone') {
                            router.replace(localePath({ name: 'setting-change-phone-confirm-phone-code', query: {from: is_from.value} }));
                            save_track_optional('auth_status_302', { phone: phone_number.value});

                        } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                            router.replace(localePath({ name: 'auth-max-sent-code' }));
                            save_track_optional('auth_status_302', {
                                code: data_parse._data.next_page.code,
                                phone: data_parse._data.next_page.recipient_phone,
                                message: data_parse._data.next_page.message
                            });

                        } else if (data_parse._data.next_page.page === 'auth/verify') {
                            router.replace(localePath({
                                name: 'setting-change-phone-confirm-phone-code',
                                query: {from: is_from.value}
                            }));
                            save_track_optional('auth_status_302', {
                                token: data_parse._data.next_page.token,
                                phone: phone_number.value
                            });
                        }

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_2.value <= 2) {
                            reload_q_again_2.value += 1;
                            check_new_auth_user();
                            setTimeout( () => { external_function({ phone: phone_number.value }); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({ name: 'index' }));
                        }

                    } else {
                        $('.show_text_status').text(data_parse._data.message ? data_parse._data.message : 'Connection error');
                        $('#modal_show_status').modal('show');
                        loading.value = false;
                    }
                }
            });

            // --- false connection ---
        } else {
            loading.value = false; // close error and show modal
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- show password ---
    function show_password () {
        const passwordField = document.querySelector('#confirm_pass');
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                     // change type input
            $('#icon_confirm_pass').removeClass('fa-eye').addClass('fa-eye-slash');           // change icon eye
        } else {
            passwordField.setAttribute('type', 'password');
            $('#icon_confirm_pass').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
</script>

