
<template>
    <div class="min_h max_width_form mt_80 ">
        <!-- app bar -->
        <div v-if="isMobile" class="no_padding fix_app_bar">
            <div class="_div_nav row_padding bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col _pad_col_icon">
                    <p class="set-app-name-title text-white">{{ $t('message.privacy') }}</p>
                </div>
            </div>
        </div>

        <!-- body -->
        <template v-if="info_user_privacy">
            <div :class="isDesktop ? 'des_container mt-3' : 'margin_below_app_bar mt-5'">
                <p v-if="!isMobile" class="mb-3 text-black fn_22 fw-semibold">{{ $t('message.privacy') }}</p>
                <div v-if="info_user_privacy.gender" @click="show_modal_option('gender',info_user_privacy.gender)" class="s_t_privacy">
                    <div class="col-11 p-0">
                        <p class="s_t_p_text">{{ $t('setting.can_look_gender') }}</p>
                        <p class="s_t_p_status">{{ info_user_privacy.gender === "public" ? $t('setting.public') : $t('setting.only_me') }}</p>
                    </div>
                    <div class="col s_t_p_icon">
                        <span class="fas fa-caret-down"></span>
                    </div>
                </div>
                <div v-if="info_user_privacy.dob" @click="show_modal_option('dob',info_user_privacy.dob)" class="s_t_privacy">
                    <div class="col-11 p-0">
                        <p class="s_t_p_text">{{ $t('setting.can_look_DOB') }}</p>
                        <p class="s_t_p_status">{{ info_user_privacy.dob === "public" ? $t('setting.public') : $t('setting.only_me') }}</p>
                    </div>
                    <div class="col s_t_p_icon">
                        <span class="fas fa-caret-down"></span>
                    </div>
                </div>
                <div v-if="info_user_privacy.phone" @click="show_modal_option('phone',info_user_privacy.phone)" class="s_t_privacy">
                    <div class="col-11 p-0">
                        <p class="s_t_p_text">{{ $t('setting.can_look_phone') }}</p>
                        <p class="s_t_p_status">{{ info_user_privacy.phone === "public" ? $t('setting.public') : $t('setting.only_me') }}</p>
                    </div>
                    <div class="col s_t_p_icon">
                        <span class="fas fa-caret-down"></span>
                    </div>
                </div>
                <div v-if="info_user_privacy.email" @click="show_modal_option('email',info_user_privacy.email)" class="s_t_privacy">
                    <div class="col-11 p-0">
                        <p class="s_t_p_text">{{ $t('setting.can_look_email') }}</p>
                        <p class="s_t_p_status">{{ info_user_privacy.email === "public" ? $t('setting.public') : $t('setting.only_me') }}</p>
                    </div>
                    <div class="col s_t_p_icon">
                        <span class="fas fa-caret-down"></span>
                    </div>
                </div>
                <div v-if="info_user_privacy.location" @click="show_modal_option('location',info_user_privacy.location)" class="s_t_privacy">
                    <div class="col-11 p-0">
                        <p class="s_t_p_text">{{ $t('setting.can_look_location') }}</p>
                        <p class="s_t_p_status">{{ info_user_privacy.location === "public" ? $t('setting.public') : $t('setting.only_me') }}</p>
                    </div>
                    <div class="col s_t_p_icon">
                        <span class="fas fa-caret-down"></span>
                    </div>
                </div>

                <br><br><br>
            </div>
        </template>

        <!-- loading -->
        <div v-if="loading_field" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading" class="loading_width loading_bg">
            </div>
        </div>
        <!-- Modal show set auto renew -->
        <div class="modal fade" :class="$device.isMobile ? 'style_full_screen' : ''" id="modal_set_auto_renew" tabindex="-1" role="dialog">
            <div class="modal-dialog " :class="$device.isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content bg-modal" :class="$device.isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="$device.isMobile ? 'modal_bottom_screen' : ''">
                        <div class="modal-body p-0">
                            <ul class="list-unstyled mobile_modal_actions_container">
                                <li @click="status_change('public')" class="mobile_modal_action cur_sur">
                                    <a rel="nofollow" class="m-auto" > {{ $t('setting.public') }} </a>
                                </li>
                                <li @click="status_change('private')" class="mobile_modal_action cur_sur border_top">
                                    <a rel="nofollow" class="m-auto"> {{ $t('setting.only_me') }} </a>
                                </li>
                            </ul>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">
                                <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>    
                            </button>
                        </div>
                        <!-- <div class="a_cancel_btn_modal_bg">
                            <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- show success message -->
        <div class="toast style_toast d-none acc_toast toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="me-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ml-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
                </strong>
                <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const language = ref(helper.get_lang_cookie());
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const localePath = useLocalePath();
    const user_data = ref('');
    const info_user_privacy = ref(''); // main data
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;

    const change_status = ref();
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const loading_field = ref(false);
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: 'Account Privacy',
        meta: [
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            {property: 'og:title', content: 'Account Privacy'},
            {property: 'fb:app_id', content: '217361691621555'},
            {property: 'og:site_name', content: 'www.khmer24.com'},
            {property: 'og:url', content: 'https://www.khmer24.com/en/'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg'},
            {property: 'og:image:width', content: '600'},
            {property: 'og:image:height', content: '600'},
            {property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.'},
        ]
    })

    onMounted(() => {
        if (process.client) {
            check_auth();
            if (helper.check_auth_user() === false) { // check auth exist or not
                router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }
            // get privacy of user information
            get_user_privacy();
        }
    })

    // ---- get user privacy information ----
    function get_user_privacy() {
        $fetch(config.VUE_APP_API_URL + 'me/privacy', {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value },
        }).then(res => {
            info_user_privacy.value = res.data;
            // console.log(info_user_privacy.value);

        }).catch(e => {
            if (e.response && e.response.status === 401) { // retry
                if (reload_q_again_1.value <= 2) {
                    reload_q_again_1.value += 1;
                    check_auth();
                    setTimeout( () => { get_user_privacy(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    router.replace(localePath({ name: 'index' }));
                }
            }
        });
    }
    // ---- show modal options ----
    function show_modal_option(type, value) {
        change_status.value = { type: type, val: value }
        $('#modal_set_auto_renew').modal('show'); // show modal options.
    }
    // ---- click change status ----
    function status_change(value) {
        if (change_status.value && change_status.value.val !== value) { // request change that status.

            let type = change_status.value.type; // action on specific type.
            let data_body = { [type]: value }    // data body for sent.

            loading_field.value = true;
            $fetch(config.VUE_APP_API_URL + 'me/privacy', {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                method: 'POST',
                body: new URLSearchParams(data_body)
            }).then(res => {
                info_user_privacy.value[type] = value;          // update main data.
                toast_message(res.message, true);     // show message when success.
                change_status.value = '';                       // clear value change status.

            }).catch(e => {
                if (e.response && e.response.status === 401) {  // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        check_auth();
                        setTimeout( () => { status_change(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        router.replace(localePath({ name: 'index' }));
                    }
                }
            }).finally(() => (loading_field.value = false));

        }
        $('#modal_set_auto_renew').modal('hide'); // hide modal options.
    }
    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.acc_toast');
        toast.removeClass('d-none');
        toast.toast({ delay: 6000 });
        toast.toast('show');
    }
    // ---- check auth user login ----
    function check_auth() {
        user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }
    // ---- go back history ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- convert date look beautiful ----
    // function date_format(date) { return helper.Clean_date_only(date); }
</script>
