
<template>
    <div>
        <div class="max_width_form">
            <!-- App Bar -->
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-1 l_h_con_title">
                        <p class="m-0 name_style truncate_wrap">{{ $t('message.setting') }}</p>
                    </div>
                </div>
            </div>

            <!-- Body -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt_80 min_h" :class="isDesktop ? 'des_container mt-3 dt_setting_store' : 'no_padding margin_below_app_bar'">

                <!-- loading -->
                <div v-if="!detail_store" class="large-12 columns">
                    <div class="p-0 con-recent-history s_t_pad_info">
                        <div class="_flex_ store-setting-loading">
                            <div class="animated-background store-d-1"></div>
                            <div class="width_100">
                                <div class="animated-background store-d-2"></div>
                                <div class="animated-background store-d-3"></div>
                            </div>
                            <span class="ion-chevron-right s_t_icon_arrow_profile s_t_position_child"></span>
                        </div>
                    </div>
                    <div class="p-0 mt-2">
                        <div v-for="s in 6" :key="s" class="col con-recent-history legitRipple s_t_pad_op_click style_flex">
                            <div class="col-8 p-0">
                                <p class="animated-background store-s-l-child"></p>
                            </div>
                            <div class="col store-setting-icon"><p><span class="ion-chevron-right"></span></p></div>
                        </div>
                    </div>
                    <div class="text-center s_t_p_logout">
                        <a rel="nofollow" aria-label="loading" class="btn form-control s_t_btn_logout">
                            <div class="animated-background store-s-l-btn"></div>
                        </a>
                    </div>
                </div>

                <!-- show setting -->
                <div v-else class="large-12 columns">
                    <!-- Profile User When Login -->
                    <div v-if="detail_store" class="p-0 con-recent-history s_t_pad_info" :class="isMobile ? 'mt-5' : ''">
                        <NuxtLink v-if="detail_store.username" tag="a" :to="localePath({ name: 'username', params: { username: detail_store.username } })">
                            <div class="_flex_ s_t_pad_pro_setting" @click="save_track_optional('clear', { clear: 'clr_old_data' })">
                                <div class="s_t_thumb_profile_detail">
                                    <img :src='detail_store.logo ? detail_store.logo.small.url : empty_img_user'
                                        :alt="detail_store.title ? detail_store.title : ''" class="s_t_img_pro_user" @error="imageUrlAlt_profile">
                                </div>
                                <div class="width_100">
                                    <p class="truncate_wrap s_t_name">
                                        <b>{{ detail_store.title ? detail_store.title : '' }}</b>
                                    </p>
                                    <p class="truncate_wrap s_t_username"> {{ detail_store.username ? '@'+detail_store.username : '' }} </p>
                                </div>
                                <span class="ion-chevron-right s_t_icon_arrow_profile s_t_position_child" :class="isDesktop ? 'mr-3' : ''"></span>
                            </div>
                        </NuxtLink>
                    </div>

                    <!-- Account Setting -->
                    <div class="p-0 mt-2" :class="isDesktop ? 'dt_border dt_bor_radius' : ''">
                        <div v-if="check_is_admin" @click="edit_store" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-8 p-0">
                                <p class="s_t_recent_history"> {{ $t('new_text_2.edit_info') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> <span class="ion-chevron-right"></span> </p>
                            </div>
                        </div>
                        <div v-if="check_is_admin" @click="change_username" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-8 p-0">
                                <p class="s_t_recent_history"> {{ $t('message.change_username') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> <span class="ion-chevron-right"></span> </p>
                            </div>
                        </div>
                        <div @click="show_bus_hours" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-6 p-0">
                                <p class="s_t_recent_history"> {{ $t('new_text_2.business_hour') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> {{ $t('new_text_2.selected_hours') }}
                                    <span class="ion-chevron-right"></span>
                                </p>
                            </div>
                        </div>
                        <div @click="show_branches" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-8 p-0">
                                <p class="s_t_recent_history"> {{ $t('new_text_2.branches') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> <span class="ion-chevron-right"></span> </p>
                            </div>
                        </div>
                        <div @click="show_photos" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-8 p-0">
                                <p class="s_t_recent_history"> {{ $t('lng.photos') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> <span class="ion-chevron-right"></span> </p>
                            </div>
                        </div>
                        <div @click="show_members" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-8 p-0">
                                <p class="s_t_recent_history"> {{ $t('message.members') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> <span class="ion-chevron-right"></span> </p>
                            </div>
                        </div>

                        <div v-if="Array.isArray(user_data?.user?.setting?.payment) && user_data.user.setting.payment.includes('subscription')"  @click="toStoreMember()" class="col con-recent-history legitRipple s_t_pad_op_click style_flex cur_sur">
                            <div class="col-8 p-0">
                                <p class="s_t_recent_history"> {{ $t('new_text_2.member_infor') }} </p>
                            </div>
                            <div class="col store-setting-icon">
                                <p> <span class="ion-chevron-right"></span> </p>
                            </div>
                        </div>

                    </div>

                    <!-- Logout -->
                    <div v-if="check_is_admin === false" class="text-center s_t_p_logout">
                        <a rel="nofollow" @click="show_Modal" class="btn form-control s_t_btn_logout cur_sur" :class="isDesktop ? 'dt_border' : ''">
                            {{ $t('new_text_2.leave') }}
                        </a>
                    </div>
                </div>

            </div>

            <div v-if="loading" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>

            <!-- Modal show response error -->
            <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3">  </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" data-bs-dismiss="modal" class="btn text-primary">{{ $t('message.close') }}</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show response error -->

            <!-- Modal show confirm logout -->
            <div class="modal class_modal_show_message" id="modal_show_confirm_leave" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3"> Are you sure that you want to leave this company? </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" @click="leave" class="btn text-primary text-danger"> {{ $t('new_text_2.leave') }} </button>
                            <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.cancel') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show confirm logout -->

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
            <div class="toast style_toast d-none toast_z_index"> <!-- role="alert" data-autohide="false" aria-live="polite" aria-atomic="true" data-delay="6000" -->
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

            <!-- modal show Membership Store -->
            <div class="modal style_full_screen" :class="isDesktop ? 'dt_filter_modal' : ''"
                id="modal_membership" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content modal_content_style">
                        <!-- app -->
                        <div class="_div_nav row_padding bg_app_bar_header_">
                            <div class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                                <button class="btn clear-btn-app-bar" aria-label="back">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col _pad_col_icon">
                                <a rel="nofollow" class="set-app-name-title">{{ $t('new_text_2.member_ship') }}</a>
                            </div>
                        </div>
                        <!-- body -->
                        <div class="modal-body d-store-member-ship">
                            <div v-if="detail_store && detail_store.membership" class="my_card">
                                <div class="member_content_header divide_border_section">
                                    <p class="m_p_head"> Current Plan </p>
                                    <p class="m_p_body">membership
                                        {{ detail_store.membership.title ? detail_store.membership.title : '' }}
                                    </p>
                                </div>
                                <div class="member_content_header">
                                    <div :class="detail_store.membership.status === 'active' ? 'member_con_status member_bg_color_active' : (detail_store.membership.status === 'nearly_expire' ? 'member_con_status member_bg_color_nearly_expire' : (detail_store.membership.status === 'expired' ? 'member_con_status member_bg_color_expired' : ''))">
                                        <p class="m_p_status1">
                                            {{ $t('new_text_1.member_ship_status') }}:
                                            <span :class="detail_store.membership.status === 'active' ? 'member_color_active' : (detail_store.membership.status === 'nearly_expire' ? 'member_color_nearly_expire' : (detail_store.membership.status === 'expired' ? 'member_color_expired' : ''))">
                                    {{ detail_store.membership.status_title }}
                                </span>
                                        </p>
                                        <p class="m_p_status2">{{ date_format(detail_store.membership.start_date) }} to {{ date_format(detail_store.membership.end_date) }}</p>
                                    </div>
                                </div>
                                <div class="member_content_header divide_border_section">
                                    <div class="_flex_">
                                        <div class="col-6 p-0">
                                            <p class="member_p_parent">{{ $t('new_text_1.ads') }}</p>
                                        </div>
                                        <div class="col-6 p-0">
                                            <p class="member_p_child">{{ detail_store.membership.num_ads ? detail_store.membership.num_ads : 0 }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="member_content_header divide_border_section">
                                    <div class="_flex_">
                                        <div class="col-6 p-0">
                                            <p class="member_p_parent">{{ $t('new_text_1.renew_ads') }}</p>
                                        </div>
                                        <div class="col-6 p-0">
                                            <p class="member_p_child">{{ detail_store.membership.renew ? detail_store.membership.renew : 0 }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="member_content_header divide_border_section">
                                    <div class="_flex_">
                                        <div class="col-6 p-0">
                                            <p class="member_p_parent">{{ $t('new_text_1.auto_renew_ads') }}</p>
                                        </div>
                                        <div class="col-6 p-0">
                                            <p class="member_p_child">{{ detail_store.membership.auto_renew ? detail_store.membership.auto_renew : 0 }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="member_content_header divide_border_section">
                                    <div class="_flex_">
                                        <div class="col-6 p-0">
                                            <p class="member_p_parent">{{ $t('new_text_2.feature_ads') }}</p>
                                        </div>
                                        <div class="col-6 p-0">
                                            <p class="member_p_child">{{ detail_store.membership.feature_ads ? detail_store.membership.feature_ads : 0 }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="member_content_header divide_border_section">
                                    <div class="_flex_">
                                        <div class="col-6 p-0">
                                            <p class="member_p_parent">{{ $t('new_text_2.top_ads') }}</p>
                                        </div>
                                        <div class="col-6 p-0">
                                            <p class="member_p_child">{{ detail_store.membership.top_ads ? detail_store.membership.top_ads : 0 }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="member_content_header">
                                    <div class="_flex_">
                                        <div class="col-6 p-0">
                                            <p class="member_p_parent">{{ $t('new_text_2.num_team') }}</p>
                                        </div>
                                        <div class="col-6 p-0">
                                            <p class="member_p_child">{{ detail_store.membership.num_team ? detail_store.membership.num_team : 0 }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /modal show Membership Store -->
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( { middleware: "auth" } ); // use layout dont have bottom nav bar check auth.
    const { public:config } = useRuntimeConfig(); // setup config env to config variable.
    const route = useRoute();
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const user_data = ref('');
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const detail_store = ref('');
    const detail_store_set = ref('');
    const photo = ref(null);
    const name = ref(null);
    const loading = ref(false);
    const check_is_admin = ref(false);  // check if admin or not.
    const store_id = ref(route.params.id ? route.params.id : '');
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    // --- for check message show in toast ---
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: 'Store Setting - Khmer24.com',
        meta: [
            // { name: 'apple-mobile-web-app-title', content: 'Store Setting - Khmer24.com' },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: 'Store Setting - Khmer24.com' },
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
            check_new_auth_user();

            // --- check message success ---
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const p_clear = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params ? pa_con.clear_old_data.d_params : ''; // check clear_old_data from params.
            if (p_clear && p_clear.message) {
                message_success.value = p_clear.message;
                error_or_success_message.value = true;
                let toast = $('.toast');
                toast.removeClass('d-none');
                toast.toast({delay: 7000});
                toast.toast('show');
            }

            // get info store
            get_info_store();
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('message'); // clear params condition.
    })

    // ---- to store membership
    function toStoreMember() {
        router.push(localePath({ name: 'account-membership', query: {'storeid': store_id.value, 'is_owner': detail_store.value.is_owner }}))
    }

    // ---- get detail info store ----
    function get_info_store() {

        check_new_auth_user();
        // -- get user --
        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: {
                lang: language.value,
                fields: 'id,title,username,logo,cover,owner_id,about,membership,modified_date,created_date,contact,description,category,categories,keywords,business_hours',
            },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        }).then(get_store => {
            detail_store.value = get_store.data;
            detail_store_set.value = get_store.setting;
            check_is_admin.value = user_data.value.user.id === detail_store.value.owner_id ? true : false;

        }).catch(error => {
            if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_2.value <= 2) {
                    reload_q_again_2.value += 1;
                    check_new_auth_user();
                    setTimeout(() => { get_info_store(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
        });
    }
    // ---- click show branches ----
    function show_branches() { router.push(localePath({ name: 'account-store-id-setting-branches', params: { id: detail_store.value.id } })); }
    // ---- click show members ----
    function show_members() { router.push(localePath({ name: 'account-store-id-setting-members', params: { id: detail_store.value.id } })); }
    // ---- show modal membership ----
    function show_membership() { $('#modal_membership').modal('show'); }
    // ---- show photos album ----
    function show_photos() { router.push(localePath({ name: 'account-store-id-setting-album', params: { id: detail_store.value.id } })); }
    // ---- convert date look beautiful ----
    function date_format(date) { return helper.Clean_date_only(date); }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- click edit profile ----
    function edit_store() { router.push(localePath({ name: 'account-store-id-setting-edit-store', params: { id: store_id.value } })); }
    // ---- change store username ----
    function change_username() { router.push(localePath({ name: 'account-store-id-setting-change-store-username', params: { id: store_id.value } })); }
    // ---- change business hours ----
    function show_bus_hours() { router.push(localePath({ name: 'account-store-id-setting-business-hours', params: { id: store_id.value } })); }
    // ---- show modal logout ----
    function show_Modal() { $('#modal_show_confirm_leave').modal('show'); }
    // ---- leave ----
    function leave() {
        if (window.navigator.onLine) { // check is connect to internet
            loading.value = true;
            $('#modal_show_confirm_leave').modal('hide');
            check_new_auth_user();
            if (user_data.value) {
                $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/teams/'+user_data.value.user.id, {
                    headers: { "Access-Token": user_data.value.tokens.access_token },
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    method: 'DELETE',

                }).then(res => {
                    // --- redirect to account page ---
                    router.replace(localePath({name: 'account'}));

                }).catch(error => {
                    loading.value = false;
                    if (!error.response) {
                        $('#modal_show_status_error_connection').modal('show');

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_new_auth_user();
                            setTimeout( () => { click_remove(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }

                }).finally(() => (loading.value = false) );
            }
        } else {
            $('#modal_show_confirm_leave').modal('hide');
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
</script>


