
<template>
    <div :class="isDesktop ? 'dt_bg_form_contain' : 'min_h mt_80 max_width_form '">
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
            <div class="dt_ch_s_con p-3 pb-0" :class="isMobile ? 'mt-5' : 'form-login rounded'">
                <p v-if="!isMobile" class="mb-3 text-black text-center fn_22 fw-semibold">{{ $t('message.change_password') }}</p>
                <div class="tag-con-pad" :class="isDesktop ? 'max_width_form' : ''">{{ $t('message.dis_change_password') }}</div>
                <div class="text-center c_s_b_btn">
                    <form id="Change_password_form" class="bg-none">
                        <!-- new password -->
                        <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.new_password') }}</label>
                        <div class="col-12 p-0 mb-3 position_relative">
                            <input type="password" name="new_pass" id="new_pass" v-model="new_pass" v-bind:placeholder="$t('message.new_password')" :class="isMobile ? 'field-height' : 'dt-field-height'"  class="form-control more_border pad_right_text_icon">
                            <i id="icon_new_pass" class="far fa-eye text_grey icon_in_text_field cur_sur" :class="isMobile ? '' : 'p-2'"  @click="show_new_password"></i>
                        </div>
                        <!-- confirm password -->
                        <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.confirm_password') }}</label>
                        <div class="col-12 p-0 mb-3 position_relative">
                            <input type="password" name="confirm_pass" id="confirm_pass" v-model="confirm_pass" v-bind:placeholder="$t('message.confirm_password')" :class="isMobile ? 'field-height' : 'dt-field-height'" class="form-control more_border pad_right_text_icon">
                            <i id="icon_confirm_pass" class="far fa-eye text_grey icon_in_text_field cur_sur" :class="isMobile ? '' : 'p-2'" @click="show_confirm_password"></i>
                        </div>
                        <!-- button submit save change -->
                        <button type="submit" class="btn form-control btn-k24-secondary " :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                            {{ $t('message.submit') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Modal Show Error Status Code -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog mg_center from_top" role="document">
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
            <div class="modal-dialog max_width_form mg-mo-auto" role="document">
                <div class="modal-content modal_content_style">
                    <div class="modal-body break_word_ show_text_status b-s-h-con">
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
    definePageMeta( {layout: "custom", middleware: "auth"} );               // use layout dont have bottom nav bar check auth.

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

    const auth = ref('');
    const loading = ref(null);
    const is_has_password = ref(null);
    const new_pass = ref(null);
    const confirm_pass = ref(null);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);

    // --- meta variable ---
    const meta_title_c_pass = useState('meta_title_c_pass', () => 'Change Password - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_c_pass.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_c_pass.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_c_pass.value },
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
            check_auth_user();

            is_has_password.value = auth.value.user.is_has_password;

            // --- jquery validation ---
            setTimeout(() => { show_validation(); },500);

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
                page_title: meta_title_c_pass.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Change_password', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // --- validation show ---
    function show_validation() {
        $.validator.setDefaults({
            submitHandler: () => {
                // alert('hello world')
                save_change_password(); // save change password
            }
        });

        $("#Change_password_form").validate( {
            ignore: "", // can know hidden or any
            rules: {
                new_pass: {
                    required: true,
                    minlength: 6
                },
                confirm_pass: {
                    required: true,
                    minlength: 6,
                    equalTo: '[name="new_pass"]'
                },
            },
            messages: {
                new_pass: {
                    required: "Please enter your New Password",
                },
                confirm_pass: {
                    required: "Please enter your Confirm Password",
                    // equalTo: "Please check password And confirm password again"
                },
            },
            // errorElement: "em",
            errorPlacement: function ( error, element ) {
                // Add the `invalid-feedback` class to the error element
                error.addClass( "invalid-feedback" );
                // show validate text, textarea, select and so on
                error.insertAfter( element );
            },

            // eslint-disable-next-line no-unused-vars
            highlight: function ( element, errorClass, validClass ) {
                $(element).addClass('is-invalid');
            },
            // eslint-disable-next-line no-unused-vars
            unhighlight: function ( element, errorClass, validClass ) {
                $(element).removeClass('is-invalid');
            },

            // focusInvalid: false, it scroll up or down to specific tag
            invalidHandler: function(form, validator) {
                if (!validator.numberOfInvalids())    // if dont have error return
                    return;

                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top - 120
                }, 700); // if position fix in that element, it not scroll up, so change it to position absolute
            },
        } );
    }
    // - /validation show -

    // ---- save change password ----
    function save_change_password() {
        // -- check get new auth_user prevent expired token and use old token --
        check_auth_user();

        if (window.navigator.onLine) {
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'me/change_password',{
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                headers: {"Access-Token": auth.value.tokens.access_token},
                method: 'POST',
                params: { lang: language.value },
                body: new URLSearchParams({ new_password: new_pass.value, confirm_new_password: confirm_pass.value })
            }).then(res => {

                // ---- change quick login in localStorage if password change ----
                let res_data = auth.value.user;
                let change_quick_data = {
                    id: res_data.id,
                    name: res_data.name,
                    username: res_data.username,
                    password: new_pass.value,
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
                        check_auth_user();
                        setTimeout( () => { save_change_password(); }, 3000);
                    } else {
                        $('#modal_show_status_error_connection').modal('show');
                    }
                } else {
                    let check = error.response ? error.response : ''; // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    if (check && check.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_auth_user();
                            setTimeout( () => { save_change_password(); }, 3000);
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

            }).finally(() => (loading.value = false));

        } else {
            loading.value = false; // clear loading and show error modal
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- click show password ----
    function show_new_password () {
        const passwordField = document.querySelector('#new_pass')
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                     // change type input
            $('#icon_new_pass').removeClass('fa-eye').addClass('fa-eye-slash');              // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_new_pass').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    function show_confirm_password() {
        const passwordField = document.querySelector('#confirm_pass')
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                    // change type input
            $('#icon_confirm_pass').removeClass('fa-eye').addClass('fa-eye-slash');          // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_confirm_pass').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    // ---- check auth user login ----
    function check_auth_user() {
        auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
</script>

