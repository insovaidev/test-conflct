
<template>
    <div :class="isMobile ? '' : 'min_h mt_80 max_width_form'">
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth/>
        </template>

        <!-- Body -->
        <div class="borders rounded" :class="isMobile ? 'mt-5' : 'form-login'">
            <div class="dt_ch_s_con p-3" :class="isDesktop ? 'col-6 dt_border' : ''">
                <div v-if="isDesktop" class="dt_title_header">
                    <h1>{{ $t('text_desktop.forget_password') }}</h1>
                    <h2 class="d-none">Khmer24.com, Forget Password Page, Buy, Sell</h2>
                </div>
                <div class="tag-con-pad" :class="isDesktop ? 'max_width_form' : ''">
                    <p v-if="!isMobile" class="mb-3 text-black fn_20 fw-semibold">{{ $t('message.forget_pass_account') }}</p>
                    {{ $t('message.text_find_account') }}
                </div>
                <form action="">
                    <div class="mb-3">
                        <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.phone_number_email') }}</label>
                        <input type="text" v-model="phone_number" v-bind:placeholder="$t('message.phone_number_email')" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div v-if="error_on_phone_number" class="form_error_style m-0">
                            <span> {{ $t('message.error_phone_number_email') }} </span>
                        </div>
                    </div>
                    <div id="btn" class="mb-3">
                        <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                            <span >{{  $t('message.submit') }}</span>
                            <img v-if="loading" :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_in_button">
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status">  </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
            <div class="modal-dialog max_width_form mg-mo-auto" role="document" >
                <div class="modal-content">
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
    </div>
</template>

<script setup>
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const router = useRouter();
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const isMobile= ref(helper.m_or_d())
    const recaptcha = useRecaptcha();

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const loading = ref(false);
    const phone_number = ref(null);
    const error_on_phone_number = ref(null);

    const meta_title_forget_pass = useState('meta_title_forget_pass', () => 'khmer24.com, forget password');


    useHead({
        title: meta_title_forget_pass.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_forget_pass.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Get new password, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },

            { property: 'og:title', content: meta_title_forget_pass.value },
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

    onMounted(()=>{
        if(process.client){
            show_validate()
            localStorage.removeItem('im_store')
        }
    })

    function show_validate(){
        $(document).ready(function () {
            var $form = $("form");
            $form.validate({
            rules: {
                phone_number: { required: true},
            },
            messages: {
                phone_number:  {
                    required: locale.value === 'km' ? km.message.error_phone_number : en.message.error_phone_number,
                    
                },
            },
            submitHandler: () => {
                formSubmit()
            }
            });
        });
    }

    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- convert date look beautiful ----
    async function formSubmit(e) {
        if (phone_number.value) {
            loading.value = true;                     // open loading
            $(".btn_forget_pass").attr("disabled", true);  // disable button submit
            const token = await recaptcha('forgot_password');
            let data_body = {
                login: phone_number.value,
            }
            if(token !== undefined){
                data_body['g-recaptcha-response'] = token
            }
            $fetch(config.VUE_APP_API_URL + 'auth/forgot_password',{
                method: 'POST',
                params: { lang: language.value },
                body: new URLSearchParams(data_body)

            }).then(res => { // console.log(res);
                // --- check status "302". If we have key "next_page" ---
                let n_p = res && res.next_page ? res.next_page : '';
                if (n_p) {
                  if (n_p.page === 'auth/verify') {
                    save_track_optional('auth_status_302', { phone: phone_number.value, token: n_p.token });
                    router.push(localePath({ name: 'auth-confirm-code' }));

                  } else if (n_p.page === 'auth/max_send_code') {
                    save_track_optional('auth_status_302', { code: n_p.code, phone: n_p.recipient_phone, message: n_p.message });
                    router.push(localePath({ name: 'auth-max-sent-code' }));
                  }
                }

            }).catch(error => {
                if (!error.response) {
                    $('#modal_show_status_error_connection').modal('show');
                } else {
                    if (error.response) {
                        let check = error.response; // original data error
                        let data_check = JSON.stringify(check); // parse to get message response error
                        let data_parse = JSON.parse(data_check);

                        if (check.status === 302) {
                            if (data_parse._data.next_page.page === 'auth/verify') {
                                save_track_optional('auth_status_302', { phone: phone_number.value, token: data_parse._data.next_page.token });
                                router.push(localePath({ name: 'auth-confirm-code' }));

                            } else if (data_parse._data.next_page.page === 'auth/max_send_code') {
                                save_track_optional('auth_status_302', { code: data_parse._data.next_page.code, phone: data_parse._data.next_page.recipient_phone, message: data_parse._data.next_page.message });
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
                $(".btn_forget_pass").attr("disabled", false);
            });

            error_on_phone_number.value = null; // clear error validation on phone numbers
            return true;
        }

        if (!phone_number.value) {
            error_on_phone_number.value = "is_required";
        } else {
            error_on_phone_number.value = null;
        }
        e.preventDefault();
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
</script>

