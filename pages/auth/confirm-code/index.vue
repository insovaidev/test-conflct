
<template>
    <div :class="isDesktop ? 'dt_bg_form_contain' : 'min_h max_width_form'">
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth/>
        </template>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'">
            <div class="p-3 borders rounded" :class="isMobile ? 'pt-5' : 'form-login  mt_80'">
                <div v-if="isDesktop" class="dt_title_header"><h1>{{ $t('message.confirm_password') }}</h1></div>
                <div class="tag-con-pad" :class="isDesktop ? 'max_width_form' : ''">
                    <p v-if="!isMobile" class="mb-3 text-black fn_22 fw-semibold">{{ is_p_e=== 'true' ? $t('message.verify_em') :  $t('message.verify_ph') }}</p>
                    <h5 :class="isMobile ? 'mt-3' : ''">{{ phone_number ? phone_number : '' }}</h5>
                    {{ $t('message.text_confirm_phone1') }}{{ is_p_e==='true'? $t('message.em') : $t('message.ph') }} {{ phone_number ? phone_number : '' }} {{ $t('message.text_confirm_phone2') }}
                </div>
                    <form class="c_s_b_btn">
                        <div class="mb-3">
                            <label v-if="isDesktop" class="dt_label_sty">{{ $t('message.verify_code') }}</label>
                            <input type="text" inputmode="numeric" name="verify_code" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-model="verify_code" v-bind:placeholder="$t('message.verify_code')" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'">
                            <div v-if="error_on_verify_code" class="form_error_style m-0">
                                <span> {{ $t('message.error_verify') }} </span>
                            </div>
                        </div>
                        <div id="btn">
                            <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                                <span >{{ $t('message.verify') }}</span>
                                <img v-if="loading" :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_in_button">
                            </button>
                        </div>
                    </form>
                <div class="text-center">
                    <p class="margin_or text-secondary"> {{ $t('message.do_not_receive_code') }} </p>
                    <p class="mt-3 cur_sur" @click="resent_code" style="font-weight: 600;color: #00A1DE;"> {{ $t('message.resend') }} </p>
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
        <!-- /Modal show error connection -->
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    import  en  from '@/locales/en.json'
    import  km  from '@/locales/km.json'
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const router = useRouter();
    const route = useRoute();
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const phone_number = ref(null);
    const token = ref(null);
    const isMobile= ref(helper.m_or_d())

    const verify_code = ref(null);
    const loading = ref(false);
    const loading_field = ref(false);
    const error_on_verify_code = ref(null);

    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const auth_302 = ref(pa_con && pa_con.auth_status_302 && pa_con.auth_status_302.d_params ? pa_con.auth_status_302.d_params : '');

    const meta_title_confirm_code = useState('meta_title_confirm_code', () => 'khmer24.com, Confirm code, Buy and Sell Everything In Cambodia');

    const is_p_e = useState('is_p_e',()=>'')
    const is_reload = useState('is_reload', ()=> 0)

    if(process.server){ 
        await reload();
    }

    useHead({
        title: meta_title_confirm_code.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_confirm_code.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Confirm Code, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads.' },

            { property: 'og:title', content: meta_title_confirm_code.value },
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
            // --- set value to variable ---
            phone_number.value = auth_302.value.phone;
            check_email(auth_302.value.phone)
            token.value = auth_302.value.token;
            if(is_reload.value > 0){
                is_reload.value = 0
                router.push(localePath({ name: 'index' }))
            }
    }
    })

    async function  reload(){
        is_reload.value +=1
    }

    function check_email(text) {
        // Regular expression pattern to match a basic email address format
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        // Test the text against the regex pattern
       if(emailPattern.test(text)){
        is_p_e.value = 'true'
       }else{
        is_p_e.value = 'false'
       }
       localStorage.setItem('is_p_e',is_p_e.value)
    }


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
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- convert date look beautiful ----
    function formSubmit(e) {
        if (verify_code.value) {
            loading.value = true;                            // open loading
            $(".loading_in_button").attr("disabled", true); // disable button submit

            $fetch(config.VUE_APP_API_URL + 'auth/verify',{
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                headers: { "Access-Token": token.value },
                method: 'POST',
                params: { lang: language.value },
                body: new URLSearchParams({ code: verify_code.value })

            }).then(res => {
                // --- check status "302". If we have key "next_page" ---
                let n_p = res && res.next_page ? res.next_page : '';
                if (n_p) {
                    if (n_p.page === 'auth/max_send_code') {
                        save_track_optional('auth_status_302', { code: n_p.code,phone: n_p.recipient_phone, message: n_p.message });
                        router.push(localePath({ name: 'auth-max-sent-code' }));

                    } else if (n_p.page === 'auth/reset_password') {
                        save_track_optional('auth_status_302', { token: n_p.token, password: auth_302.value.password });
                        router.push(localePath({ name: 'auth-set-new-password' }));
                    }

                    // --- set date expired ---
                } else {
                    var expired = res.data.tokens.expires_in;
                    var set_date_expired = helper.Date_To_Timestamp('', expired, 'seconds');
                    // --- save to localStorage ---
                    var object = {tokens: res.data.tokens, user: res.data.user, timestamp: set_date_expired};
                    localStorage.setItem("auth_user", JSON.stringify(object));
                    // --- cookies ---
                    let user_cookies = helper.create_data_user_login(object);
                    VueCookieNext.setCookie('auth_user', user_cookies);


                    //--- store data quick login to localStorage ---
                    let get_password = auth_302.value.password;
                    if (get_password) {
                        helper.store_quick_login_data(get_password, res.data.user);
                    }


                    //--- check if we action state when redirect (this function have in choose_log,login,confirm_code and set_new_password) ---//
                    let save_state = localStorage.getItem('save_state') ? JSON.parse(localStorage.getItem('save_state')) : '';
                    if (save_state) {
                        let current_date = helper.Date_To_Timestamp('', '', ''); // get timestamp on current date
                        if (save_state.expire > current_date) {         // check expired time

                            if (save_state.action === 'notification' || save_state.action === 'post' || save_state.action === 'account' || save_state.action === 'chats') {
                                localStorage.removeItem('save_state'); // remove key save_state
                                // clear_cache only use in chat or notification listing for clear old data
                                if (save_state.action === 'chats' || save_state.action === 'notification') {
                                    save_track_optional('clear_cache', {clear_cache: 'clear'});
                                }
                                router.push(localePath({name: save_state.action}));

                            } else if (save_state.action === 'detail_chat') {
                                let d = save_state.data;
                                localStorage.removeItem('save_state'); // remove key save_state
                                save_track_optional('dt_post', {
                                    show_topic_post_id: d.show_topic_post_id,
                                    title: d.title,
                                    price: d.price,
                                    img: d.img
                                });
                                // save params to work at detail chats
                                if (isDesktop) {
                                    router.push(localePath({ name: 'chats', query: {to_id: d.to_id, username: d.username} }));
                                } else {
                                    router.push(localePath({ name: 'chats-detail-chat', query: {to_id: d.to_id, username: d.username} }));
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
                                router.push(localePath({
                                    name: 'apply-job-id',
                                    params: {id: d.post_id},
                                    query: {title: d.title}
                                }));

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
                                } else if (save_state.action === 'follow') { // state follow user
                                    url = config.VUE_APP_API_URL + 'me/follow';
                                    data_sent = {id: save_state.data.user_id, type: save_state.data.type};
                                }

                                loading_field.value = true; // set second loading when have state save or like
                                $fetch(url, {
                                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                                    headers: {"Access-Token": res.data.tokens.access_token},
                                    method: 'POST',
                                    params: {lang: language.value},
                                    body: new URLSearchParams(data_sent)
                                }).then(res => {
                                    localStorage.removeItem('save_state'); // remove if successful.
                                    save_track_optional('status_success', {status_success: res.message});
                                    //--- redirect to home page with status success --//
                                    router.push(localePath({name: 'index'}));
                                }).catch(error => {
                                    if (!error.response) {
                                        $('#modal_show_status_error_connection').modal('show');
                                    } else {
                                        router.push(localePath({name: 'index'}));
                                    }
                                }).finally(() => {
                                    loading_field.value = false;
                                });
                            }

                        } else {
                            if (save_state) { // expired, when login success
                                localStorage.removeItem('save_state');  // if expired, remove
                                router.push(localePath({name: 'account'}));
                            }
                        }
                    } else {
                        //--- redirect to account setting form ---//
                        router.push(localePath({name: 'account'}));
                    }
                    //--- /check if have action state when redirect ---//
                }

            }).catch(error => {
                if (!error.response) {
                    $('#modal_show_status_error_connection').modal('show');
                } else {
                    if (error.response) {
                        let check = error.response; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);

                        if (check.status === 302) {
                            if (data_parse._data.next_page.page === 'auth/max_send_code') {
                                save_track_optional('auth_status_302', { code: data_parse._data.next_page.code,phone: data_parse._data.next_page.recipient_phone, message: data_parse._data.next_page.message });
                                router.push(localePath({ name: 'auth-max-sent-code' }));

                            } else if (data_parse._data.next_page.page === 'auth/reset_password') {
                                save_track_optional('auth_status_302', { token: data_parse._data.next_page.token, password: auth_302.value.password });
                                router.push(localePath({ name: 'auth-set-new-password' }));
                            }
                        } else {
                            $('.show_text_status').text(data_parse._data.message);
                            $('#modal_show_status').modal('show');
                        }
                    }
                }
            }).finally(() => {
                loading.value = false;
                $(".loading_in_button").attr("disabled", false);
            });

            error_on_verify_code.value = null; // clear error validation on phone numbers
            return true;
        }

        if (!verify_code.value) {
            error_on_verify_code.value = "is_required";
        } else {
            error_on_verify_code.value = null;
        }
        e.preventDefault();
    }
    // ---- recent code ----
    function resent_code() {
        if (token.value) {
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'auth/resend_code',{
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                headers: { "Access-Token": token.value },
                method: 'POST',
                params: { lang: language.value }
            }).then(res => {

            }).catch(error => {
                if (!error.response) {
                    $('#modal_show_status_error_connection').modal('show');
                } else {
                    if (error.response) {
                        let check = error.response;  // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);

                        $('.show_text_status').text(data_parse._data.message);
                        $('#modal_show_status').modal('show');
                    }
                }
            }).finally(() => { loading.value = false; });
        } else {
            $('.show_text_status').text('Unauthorized, you may need to start from the first step again!');
            $('#modal_show_status').modal('show');
        }
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
</script>


