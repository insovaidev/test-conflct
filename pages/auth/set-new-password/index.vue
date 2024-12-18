
<template>
    <div :class="isMobile ? 'pt-5' : 'min_h mt_80'">
        <!-- App Bar -->
        <template v-if="!isDesktop">
            <App_bar_auth/>
        </template>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'">
            <div class="dt_ch_s_con " :class="isMobile ? 'pt-3' : 'p-3 form-login'">
                <div v-if="isDesktop" class="dt_title_header"><h1>{{ $t('text_desktop.reset_password') }}</h1></div>
                <div class="large-12 columns tag-con-pad">
                    <p class="mb-3 text-black fn_20 fw-semibold screen-d">{{ $t('text_desktop.reset_password') }}</p>
                    {{ $t('message.text_info_new_password') }}
                </div>
                <div class="large-12 columns max_width_form">
                    <div class="text-center p-3 pb-0">
                        <form id="Change_password_form">
                            <!-- New Password -->
                            <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.new_password') }}</label>
                            <div class="col-12 p-0 mb-3 position_relative bg-none">
                                <input type="password" autocomplete="off" name="password" id="password" v-model="password" v-bind:placeholder="$t('message.new_password')" class="form-control pad_right_text_icon" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                <i id="icon_password" class="far fa-eye text_grey icon_in_text_field cur_sur" :class="isMobile ? '' : 'p-2'" @click="show_password"></i>
                            </div>
                            <!-- Confirm Password -->
                            <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.confirm_password') }}</label>
                            <div class="col-12 p-0 mb-3 position_relative bg-none">
                                <input type="password" autocomplete="off" name="confirm_password" id="confirm_password" v-model="confirm_password" v-bind:placeholder="$t('message.confirm_password')" class="form-control pad_right_text_icon" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                <i id="icon_confirm_password" class="far fa-eye text_grey icon_in_text_field cur_sur" :class="isMobile ? '' : 'p-2'" @click="show_confirm_password"></i>
                            </div>
                            <!-- Submit -->
                            <button type="submit" class="btn form-control c_bg_btn" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                {{ $t('message.submit') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- first loading -->
        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <!-- second loading -->
        <div v-if="loading_field" class="loading_back_ground">
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
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const isMobile= ref(helper.m_or_d())
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const password = ref(null);
    const confirm_password = ref(null);

    const loading = ref(false);
    const loading_field = ref(false);
    const token = ref(null);
    const is_reload = useState('is_reload', ()=> 0)

    // --- meta variable ---
    const meta_title_new_pass = useState('meta_title_new_pass', () => 'khmer24.com, set new password, Buy and Sell Everything In Cambodia');

    if(process.server){ 
        await reload();
    }

    useHead({
        title: meta_title_new_pass.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_new_pass.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'New Password, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },

            { property: 'og:title', content: meta_title_new_pass.value },
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

            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const auth_log = pa_con && pa_con.auth_status_302 && pa_con.auth_status_302.d_params && pa_con.auth_status_302.d_params ? pa_con.auth_status_302.d_params : '';
            token.value = auth_log && auth_log.token ? auth_log.token : '';

            setTimeout(() => {
                // --- clear data params condition ---
                helper.clear_params_make_con('auth_status_302');

                // --- jquery validation ---
                show_validation();
            }, 500);

            // -- tracking on google analytic --
            track_google_analytics();
            if(is_reload.value > 0){
                is_reload.value = 0
                router.push(localePath({ name: 'index' }))
            }
        }
    })

    async function  reload(){
        is_reload.value +=1
    }

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_new_pass.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('forget_password', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // --- validation show ---
    function show_validation() {
        $.validator.setDefaults({
            submitHandler: () => {
                save_change_password(); // save change password
            }
        });

        $( "#Change_password_form" ).validate( {
            ignore: "", // can know hidden or any
            rules: {
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: '[name="password"]'
                },
            },
            messages: {
                password: {
                    required: "Please enter your New Password",
                },
                confirm_password: {
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

    // ---- change password ----
    function save_change_password() {
        loading.value = true;
        $fetch(config.VUE_APP_API_URL + 'auth/reset_password',{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": token.value },
            method: 'POST',
            params: { lang: language.value },
            body: new URLSearchParams({ new_password: password.value, con_password : confirm_password.value })

        }).then(res => {
            // --- set date expired ---
            var now = new Date();
            var expired = res.data.tokens.expires_in;
            var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
            // --- save to localStorage ---
            var object = { tokens: res.data.tokens, user: res.data.user, timestamp: set_date_expired };
            localStorage.setItem("auth_user", JSON.stringify(object));
            let user_cookies = helper.create_data_user_login(object);
            VueCookieNext.setCookie('auth_user', user_cookies);

            //--- store data quick login to localStorage ---
            helper.store_quick_login_data(password.value, res.data.user);

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
                        save_track_optional('dt_post', { show_topic_post_id: d.show_topic_post_id, title: d.title, price: d.price, img: d.img });
                        if (isDesktop) {
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
                            url = config.VUE_APP_API_URL_LIKE_NEW + 'me';
                            data_sent = {id: save_state.data.post_id};
                        } else if (save_state.action === 'save') { // state like post
                            url = config.VUE_APP_API_URL + 'me/saved';
                            data_sent = {id: save_state.data.post_id};
                        } else if (save_state.action === 'save_store') { // state save user or store
                            url = config.VUE_APP_API_URL + 'me/saved';
                            data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                        } else if (save_state.action === 'follow') { // state follow user
                            url = config.VUE_APP_API_URL + 'me/follow';
                            data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                        }

                        loading_field.value = true; // set second loading when have state save or like
                        $fetch(url,{
                            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                            headers: { "Access-Token": res.data.tokens.access_token },
                            method: 'POST',
                            params: { lang: language.value },
                            body: new URLSearchParams(data_sent)

                        }).then(res => {
                            localStorage.removeItem('save_state'); // remove if successful.
                            save_track_optional('status_success', { status_success: res.data.message });
                            //--- redirect to index page with status success --//
                            router.push(localePath({ name: 'index' }));

                        }).catch(error => {
                            if (!error.response) {
                                $('#modal_show_status_error_connection').modal('show');
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
                //--- redirect to account setting form ---//
                router.push(localePath({ name: 'account' }));
            }
            //--- /check if have action state when redirect ---//

        }).catch(error => {
            // console.log('error')
            if (!error.response) {
                $('#modal_show_status_error_connection').modal('show');
            } else {
                if (error.response) {
                    let check = error.response; // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);

                    if (check.status === 403) { // invalid_token
                        router.replace(localePath({ name: 'auth-forget-password' }));
                    } else {
                        $('.show_text_status').text(data_parse._data.message);
                        $('#modal_show_status').modal('show');
                    }
                }
            }
        }).finally(() => { loading.value = false; });
    }
    // ---- click show password ----
    function show_password () {
        const passwordField = document.querySelector('#password')
        if (passwordField.getAttribute('type') === 'password') {
            passwordField.setAttribute('type', 'text');                      // change type input
            $('#icon_password').removeClass('fa-eye').addClass('fa-eye-slash');                // change icon eye
        } else {
            passwordField.setAttribute('type', 'password')
            $('#icon_password').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    function show_confirm_password () {
        const confirm_password = document.querySelector('#confirm_password')
        if (confirm_password.getAttribute('type') === 'password') {
            confirm_password.setAttribute('type', 'text');                     // change type input
            $('#icon_confirm_password').removeClass('fa-eye').addClass('fa-eye-slash');          // change icon eye
        } else {
            confirm_password.setAttribute('type', 'password')
            $('#icon_confirm_password').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
</script>
