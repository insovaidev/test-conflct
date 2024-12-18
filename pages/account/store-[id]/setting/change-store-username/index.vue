
<template>
    <div>
        <div :class="isMobile ? 'pt-5' : 'min_h max_width_form'">
            <!-- App Bar -->
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-1 l_h_con_title">
                        <p class="m-0 name_style truncate_wrap">{{ $t('message.change_username') }}</p>
                    </div>
                </div>
            </div>

            <!-- Body -->
            <div class="no_padding" :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'margin_below_app_bar'">
                <div :class="isMobile ? 'p-3' : 'border form-login text-start mt_80 p-3 rounded'">
                    <p v-if="!isMobile" class="mb-3 text-black text-center fn_22 fw-semibold">{{ $t('message.change_username') }}</p>
                    <div class="large-12 columns text-center tag-con-pad" :class="isDesktop ? 'max_width_form' : ''">
                        {{ $t('new_text_2.des_store_change_username') }}
                    </div>
                    <div class="large-12 columns">
                        <form class="pt-4">
                            <div class="mb-3">
                                <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.username') }}</label>
                                <input type="text" v-model="username" name="username" v-bind:placeholder="$t('message.username')" class="form-control more_border"  :class="isMobile ? 'field-height': 'dt-field-height'">
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
                            <button type="button" class="btn text-primary" @click="save_change"> {{ $t('message.submit') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal change username -->

            <!-- Modal Show Error Status Code -->
            <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                    <div class="modal-content max_width_form">
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
            <div class="toast style_toast d-none toast_change_username toast_z_index" >
                <div class="toast-header header_padding_toast">
                    <strong class="mr-auto style_flex">
                        <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                        <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                        <p class="m-0 ms-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
                    </strong>
                    <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <!-- /show success message -->
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    const { locale } = useI18n();
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const user_data = ref('');

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const username = ref(null);
    const password = ref(null);
    const loading = ref(null);
    const message_success = ref('');
    const error_or_success_message = ref(true);

    const error_username = ref(null);
    const error_password = ref(null);

    const store_id = ref(route.params.id ? route.params.id : '');
    const detail_store = ref('');
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);

    // --- meta variable ---
    const meta_title_c_s = useState('meta_title_c_s', () => 'Change Store Username - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_c_s.value,
        meta: [
            // { name: 'apple-mobile-web-app-title', content: meta_title_c_s.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_c_s.value },
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
            if (helper.check_auth_user() === false) { router.replace(localePath({ name: 'auth' })); };
            show_validate()
            check_new_auth_user();

            get_info_store();
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

    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_change_username');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }
    // ---- get detail info store ----
    function get_info_store() {
        check_new_auth_user();
        loading.value = true;
        // -- get user --
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value, fields: 'id,title' },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(get_store => {
                detail_store.value = get_store.data;
                username.value = detail_store.value.username ? detail_store.value.username : '';
                loading.value = false;

                // -- tracking on google analytic --
                track_google_analytics();

            }).catch(error => {
                loading.value = false;
                if (!error.response) {

                } else if (error.response) {
                    let check = error.response;
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);

                    if (check.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_new_auth_user();
                            setTimeout(() => { get_info_store(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    } else {
                        toast_message(data_parse._data.message, false);
                    }

                } else {
                    toast_message('Something went wrong.', false);
                }

            }).finally(() => (loading.value = false));
        }else{
            router.push(localePath({ name: 'auth' }))
        }
    }
    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_c_s.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Change_store_username', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'})); }
    // ---- show modal confirm password to change username ----
    function show_Modal() {
        check_new_auth_user();
        if (username.value) {
            if(window.navigator.onLine) {
                $('#modal_add_password').modal('show'); // show modal password.
            } else {
                loading.value = false; // close error and show modal.
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
            passwordField.setAttribute('type', 'text');                    // change type input
            $('#icon_confirm_pass').removeClass('fa-eye').addClass('fa-eye-slash');          // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_confirm_pass').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    // ---- save change username with confirm old password ----
    function save_change() {
        if (password.value) {
            let query_str = { password: password.value,  username: username.value }
            $('#modal_add_password').modal('hide'); // close modal password

            if (window.navigator.onLine) {
                loading.value = true;
                // --- edit profile picture ---
                $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/change_username', {
                    headers: {"Access-Token": user_data.value.tokens.access_token},
                    params: {lang: language.value},
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    method: 'POST',
                    body: new URLSearchParams(query_str)

                }).then(res => {
                    toast_message(res.message, true);

                }).catch(error => {
                    if (!error.response) {
                        loading.value = false; // close loading
                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                    } else {
                        if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_2.value <= 2) {
                                reload_q_again_2.value += 1;
                                check_new_auth_user();
                                setTimeout( () => { save_change(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }

                        } else {
                            let check = error.response;
                            let data_check = JSON.stringify(check);
                            let data_parse = JSON.parse(data_check);
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


