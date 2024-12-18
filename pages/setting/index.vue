
<template>
    <div>
        <div class="max_width_form min_h">
            <!-- App Bar -->
            <template v-if="isMobile">
                <App_bar_auth/>
            </template>

            <!-- Body -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :class="isMobile ? 'no_padding margin_below_app_bar mt-5' : 'mt_80'">
                <div class="large-12 columns">
                    <!-- Profile User When Login -->
                    <div v-if="auth" class="p-0 con-recent-history s_t_pad_info" :class="isDesktop ? 'dt_border' : ''">
                        <NuxtLink v-if="username" :to="localePath({ name: 'username', params: { username: username } })">
                            <div @click="save_track_optional('clear', { clear: 'clr_old_data' })" class="_flex_ s_t_pad_pro_setting">
                                <div class="s_t_thumb_profile_detail">
                                    <img :src='photo ? photo : empty_img_user' :alt="name ? name : ''" class="s_t_img_pro_user"
                                        @error="imageUrlAlt_profile">
                                </div>
                                <div class="width_100">
                                    <p class="truncate_wrap s_t_name">
                                        <b>{{ name ? name : '' }}</b>
                                    </p>
                                    <p class="truncate_wrap s_t_username"> @{{ username ? username : '' }} </p>
                                </div>
                                <span class="ion-chevron-right s_t_icon_arrow_profile s_t_position_child"></span>
                            </div>
                        </NuxtLink>
                    </div>

                    <!-- Account Setting -->
                    <div v-if="auth" class="p-0">
                        <div class="style_flex">
                            <div class="col-6 s_t_font_title_head c_m_grey"> {{ $t('message.account_setting') }} </div>
                        </div>
                        <div :class="isDesktop ? 'dt_border dt_bor_radius' : ''">
                            <!-- edit profile -->
                            <div @click="edit_profile" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur">
                                <p class="s_t_recent_history"> {{ $t('message.edit_profile') }} </p>
                            </div>
                            <!-- change password -->
                            <div @click="change_password" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur">
                                <p class="s_t_recent_history"> {{ $t('message.change_password') }} </p>
                            </div>
                            <!-- change username -->
                            <div @click="change_username" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur style_flex">
                                <div class="col-7 p-0">
                                    <p class="s_t_recent_history"> {{ $t('message.username') }} </p>
                                </div>
                                <div class="col pl-0 p-0">
                                    <p class="s_t_recent_history text-right s_t_position_field truncate_wrap">
                                        {{ auth && auth.user && auth.user.username ? auth.user.username : '' }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- change activate phone -->
                            <div @click="change_activate_phone" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur style_flex">
                                <div class="col-7 p-0">
                                    <p class="s_t_recent_history"> {{ $t('message.change_activate_phone') }} </p>
                                </div>
                                <div class="col pl-0 p-0">
                                    <p class="s_t_recent_history text-right s_t_position_field"> {{ phone_number ? phone_number : '' }}
                                        <span v-if="verify_phone" class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                        <span v-else class="fas fa-exclamation-circle style_flex s_t_position_child text-danger" style="top: 3px!important;"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- facebook -->
                            <div @click="connect_to_media('facebook')" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur style_flex">
                                <div class="col-7 p-0">
                                    <p class="s_t_recent_history"> Facebook </p>
                                </div>
                                <div class="col pl-0 p-0">
                                    <p v-if="d_verify.facebook && d_verify.facebook.verify"
                                    class="s_t_recent_history text-right s_t_position_field">
                                        {{ d_verify.facebook.value }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                    <p v-else class="s_t_recent_history text-right s_t_position_field parent_color"> {{ $t('lng.add') }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- google -->
                            <div @click="connect_to_media('google')" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur style_flex">
                                <div class="col-7 p-0">
                                    <p class="s_t_recent_history"> Google </p>
                                </div>
                                <div class="col pl-0 p-0">
                                    <p v-if="d_verify.google && d_verify.google.verify"
                                    class="s_t_recent_history text-right s_t_position_field">
                                        {{ d_verify.google.value }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                    <p v-else class="s_t_recent_history text-right s_t_position_field parent_color"> {{ $t('lng.add') }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                </div>
                            </div>
                            <!-- apple -->
                            <!--<div @click="connect_to_media('apple')" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur style_flex">
                                <div class="col-7 p-0">
                                    <p class="s_t_recent_history"> Apple </p>
                                </div>
                                <div class="col pl-0 p-0">
                                    <p v-if="d_verify.apple && d_verify.apple.verify"
                                    class="s_t_recent_history text-right s_t_position_field">
                                        {{ d_verify.apple.value }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                    <p v-else class="s_t_recent_history text-right s_t_position_field parent_color"> {{ $t('lng.add') }}
                                        <span class="ion-chevron-right style_flex s_t_arrow_right"></span>
                                    </p>
                                </div>
                            </div>-->
                            <!-- auto update profile picture -->
                            <div class="col con-recent-history legitRipple s_t_pad_op_click cur_sur style_flex">
                                <div class="col-7 p-0">
                                    <p class="s_t_recent_history"> {{ $t('setting.auto_update_pro_pic') }} </p>
                                </div>
                                <div class="col" style="text-align: right;margin: -4px 0 -4px 0;padding: 0;">
                                    <label class="s_t_switch">
                                        <input type="checkbox" @click="change_auto_update_pro_pic"
                                            id="change_auto_up_profile" v-model="auto_up_pro" :checked="auto_up_pro">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <!-- delete account -->
                            <div @click="delete_account" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur">
                                <p class="s_t_recent_history"> {{ $t('setting.delete_account') }} </p>
                            </div>
                            <!-- privacy -->
                            <NuxtLink :to="localePath({ name: 'setting-privacy' })" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur d_block">
                                <p class="s_t_recent_history"> {{ $t('message.privacy') }} </p>
                            </NuxtLink>
                            <!-- membership -->
                            <NuxtLink v-if="Array.isArray(auth?.user?.setting?.payment) && auth.user.setting.payment.includes('subscription')" :to="localePath({ name: 'account-membership' })" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur d_block">
                                <p class="s_t_recent_history"> {{ $t('new_text_2.member_ship') }} </p>
                            </NuxtLink>
                            <!-- Billing Address -->
                            <NuxtLink v-if="Array.isArray(auth?.user?.setting?.payment) && auth.user.setting.payment.includes('billing_address')" :to="localePath({ name: 'account-billing-addresses' })" class="col con-recent-history legitRipple s_t_pad_op_click cur_sur d_block">
                                <p class="s_t_recent_history"> {{ $t('account_t.billing_address') }} </p>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- App Setting -->
                    <div class="p-0">
                        <div class="style_flex">
                            <div class="col-6 s_t_font_title_head"> {{ $t('message.app_setting') }} </div>
                        </div>
                        <div @click="switch_language" class="col con-recent-history s_t_pad_op_click cur_sur style_flex" :class="isDesktop ? 'dt_border dt_bor_radius' : ''">
                            <div class="col p-0"><p class="s_t_recent_history"> {{ $t('message.language') }} </p></div>
                            <div class="col p-0" style="color: darkgrey;">
                                <ClientOnly>
                                    <p class="s_t_recent_history text-right s_t_position_field"> {{ locale === 'km' ? 'ខ្មែរ' : 'English' }}
                                        <span class="fas fa-caret-down style_flex s_t_position_child"></span>
                                    </p>
                                </ClientOnly>
                            </div>
                        </div>
                    </div>

                    <!-- Support -->
                    <div class="p-0">
                        <div class="style_flex ripple_message">
                            <div class="col-6 s_t_font_title_head"> {{ $t('message.support') }} </div>
                        </div>
                        <div :class="isDesktop ? 'dt_border dt_bor_radius' : ''">
                            <NuxtLink class="a-c-border col con-recent-history legitRipple s_t_pad_op_click cur_sur" :to="localePath({ name: 'posting-rule' })">
                                <p class="s_t_recent_history"> {{ $t('message.posting_rule') }} </p>
                            </NuxtLink>
                            <NuxtLink class="a-c-border col con-recent-history legitRipple s_t_pad_op_click cur_sur" :to="localePath({ name: 'privacy-policy' })">
                                <p class="s_t_recent_history"> {{ $t('message.privacy_policy') }} </p>
                            </NuxtLink>
                            <NuxtLink class="a-c-border col con-recent-history legitRipple s_t_pad_op_click cur_sur" :to="localePath({ name: 'contact' })">
                                <p class="s_t_recent_history"> {{ $t('message.contact_us') }} </p>
                            </NuxtLink>
                            <NuxtLink class="a-c-border col con-recent-history legitRipple s_t_pad_op_click cur_sur" :to="localePath({ name: 'safety-tips' })">
                                <p class="s_t_recent_history"> {{ $t('message.safty_tips') }} </p>
                            </NuxtLink>
                            <NuxtLink class="a-c-border col con-recent-history legitRipple s_t_pad_op_click cur_sur" :to="localePath({ name: 'feedback' })">
                                <p class="s_t_recent_history"> {{ $t('lng.feedback') }} </p>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Logout -->
                    <div v-if="auth" class="text-center s_t_p_logout">
                        <button type="button" @click="show_Modal" class="btn form-control s_t_btn_logout" :class="isDesktop ? 'dt_border' : ''">
                            {{ $t('message.logout') }}
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>

            <!-- Modal show change language -->
            <div class="modal fade style_full_screen" id="modal_show_change_language" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content animate-bottom">
                        <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                            <div class="option_selected">
                                <div class="modal-body p-0">
                                    <ul class="list-unstyled list-phone-modal">
                                        <li class="ripple_li cl_ripple cur_sur">
                                            <div @click="change_language('en')" class="full_field_a_tag color_reason">English</div>
                                            <div @click="change_language('km')" class="full_field_a_tag color_reason border-bottom-0">ខ្មែរ</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="a_cancel_btn_modal_bg">
                                <div class="cl_ripple close_dialog_language a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                    <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade " id="modal_show_change_language1" tabindex="-1"  aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable m-auto top_60 bg-modal">
                    <div class="modal-content mobile_modal_actions_container">
                        <div class="modal-header m_h_p">
                            <div class="_pad_col_icon">
                                <button class="btn clear s_pad_clear " > ​</button>
                            </div>
                            <div class="col text-center">
                                <p class="name_style truncate_wrap m-0"> {{ $t('message.language') }} </p>
                            </div>
                            <div class="_pad_col_icon">
                                <button class="btn clear s_pad_clear " > ​</button>
                            </div>
                        </div>
                        <div class="modal-body p-0">
                            <div class="option_selected">
                                <div class="modal-body p-0">
                                    <ul class="list-unstyled list-phone-modal m-0">
                                        <li @click="change_language('en')" data-bs-dismiss="modal"  class="mobile_modal_action">
                                            <div class=" color_reason m-auto">English</div>
                                        </li>
                                        <li @click="change_language('km')" data-bs-dismiss="modal" class="mobile_modal_action">
                                            <div  class=" color_reason m-auto">ខ្មែរ</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button data-bs-dismiss="modal" class="mobile_modal_cancel_button text-danger">{{ $t(`account_t.cancel`) }}</button>
                </div>
            </div>
            <!-- /Modal show change language -->

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
            <div class="modal class_modal_show_message" id="modal_show_confirm_logout" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3"> {{ $t('message.confirm_logout') }} </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" @click="logout" class="btn text-primary text-danger"> {{ $t('message.logout') }} </button>
                            <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.cancel') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show confirm logout -->

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
            <div class="toast style_toast d-none toast_setting toast_z_index">
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

            <!-- Modal show disconnect verify google -->
            <div class="modal class_modal_show_status_connection" id="modal_dis_verify_media" tabindex="-1" role="dialog">
                <div class="modal-dialog max_width_form mg-mo-auto" role="document">
                    <div class="modal-content">
                        <div class="modal-body break_word_ b-s-h-con text-center">
                            <img v-if="disconnect_type === 'google'" :src="asset_url+version_library+'img/google.png'" class="s_t_google" alt="google">
                            <img v-if="disconnect_type === 'facebook'" :src="asset_url+version_library+'img/facebook_img.png'" class="s_t_google" alt="google">
                            <img v-if="disconnect_type === 'apple'" :src="asset_url+version_library+'img/apple.png'" class="s_t_google" alt="google">
                            <p class="s_t_google_text">
                                <template v-if="disconnect_type === 'facebook' && d_verify && d_verify.facebook && d_verify.facebook.verify">
                                    {{ d_verify.facebook.value }}
                                </template>
                                <template v-if="disconnect_type === 'google' && d_verify && d_verify.google && d_verify.google.verify">
                                    {{ d_verify.google.value }}
                                </template>
                                <template v-if="disconnect_type === 'apple' && d_verify && d_verify.apple && d_verify.apple.verify">
                                    {{ d_verify.apple.value }}
                                </template>
                            </p>
                        </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" data-bs-dismiss="modal" class="btn text-grey">{{ $t('message.close') }}</button>
                            <button @click="disconnect_google" type="button" class="btn text-primary">
                                {{ $t('setting.disconnect') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show disconnect verify google -->

            <!-- Modal show delete account -->
            <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="modal_show_delete_account" tabindex="-1" role="dialog">
                <div class="modal-dialog " :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                    <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 's_content' : 'dt_modal_width p-3'">
                            <div class="border_bottom m-r-p-pad">
                                <p class="modal-title font_15"> {{ $t('setting.delete_account') }} </p>
                            </div>
                            <div class="modal-body s_t_delete_acc">
                                <p class="s_t_d_name">
                                    {{ auth && auth.user && auth.user.name ? auth.user.name : '' }}: {{ $t('setting.delete_this_account') }}
                                </p>
                                <p class="s_t_d_dis">{{ $t('setting.text_delete_acc') }}</p>
                                <br><br><br>
                            </div>
                            <!-- button submit report -->
                            <div class="p-2 text-center _flex_ border-top">
                                <div class="col-4 p-0 cur_sur">
                                    <p class="font_16 modal-title p-2 bg_grey mr-2 rounded cur_sur" data-bs-dismiss="modal"> {{ $t('message.cancel') }} </p>
                                </div>
                                <div @click="modal_password" class="col-8 p-0 cur_sur">
                                    <p class="font_16 modal-title p-2 bg-danger text-white rounded cur_sur"> {{ $t('message.delete') }} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal change username -->
            <div class="modal class_modal_show_message" id="modal_add_password" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                    <div class="modal-content max_width_form"> <!-- modal_content_style -->
                        <div class="modal-body break_word_ p-3">
                            {{ $t('setting.confirm_delete') }}

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
                            <button type="button" class="btn text-danger" @click="let_delete_account"> {{ $t('message.delete') }} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { googleTokenLogin, googleLogout } from "vue3-google-login";
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    import App_bar_auth from "/components/Header_auth";
    definePageMeta( {layout: "custom", middleware: "auth"} );       // use layout dont have bottom nav bar and check auth.
    const not_cookie = useCookie('not_cookie')
    const chat_cookie = useCookie('chat_cookie')

    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();                     // user route like (this.$route).
    const router = useRouter();                   // user route like (this.$router).
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const isMobile= ref(helper.m_or_d())

    const language = ref(locale.value === 'km' ? 'km' : 'en');

    const auth = ref('');
    const photo = ref(null);
    const name = ref(null);
    const username = ref(null);
    const phone_number = ref(null);
    const verify_phone = ref(true);
    const refresh_token = ref(null);
    const access_token = ref(null);
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const loading = ref(false);
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0); const reload_q_again_4 = ref(0);
    const reload_q_again_5 = ref(0); const reload_q_again_6 = ref(0);
    // --- for check message show in toast ---
    const message_success = ref('');
    const error_or_success_message = ref(true);
    // --- !!! ---
    const auto_up_pro = ref(false);
    const disconnect_type = ref('');
    const d_verify = ref('');
    // --- delete account ---
    const password = ref(null);
    const error_password = ref(null);

    const meta_title_u_setting = useState('meta_title_u_setting', () => 'Manage Setting - Khmer24.com');

    useHead({
        title: meta_title_u_setting.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_u_setting.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Setting, khmer24 setting, setting khmer24, setting - khmer24' },
            { name: 'description', content: 'Buy, Sell, Can buy and sale in khmer24, Sell your 2nd hand items on Khmer24.com' },

            { property: 'og:title', content: meta_title_u_setting.value },
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
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            check_auth();
            // --- check message success ---
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const par_msg = pa_con && pa_con.message && pa_con.message.d_params && pa_con.message.d_params.message ? pa_con.message.d_params.message : '';
            if (par_msg) {
                setTimeout(() => { // delay to show toast success from another page.
                    toast_message(par_msg, true);
                },250);

                helper.clear_params_make_con('message');
            }

            // --- add auth to variable ---
            photo.value = auth.value && auth.value.user.photo ? auth.value.user.photo.medium.url : null;
            name.value = auth.value && auth.value.user.name ? auth.value.user.name : null;
            username.value = auth.value && auth.value.user.username ? auth.value.user.username : null;
            auto_up_pro.value = auth.value && auth.value.user.auto_update_profile_picture ? auth.value.user.auto_update_profile_picture : false;
            // this.phone_number = auth.value && auth.value.user.account_verification ? auth.value.user.account_verification.phone.value : ( auth.value && auth.value.user.user && auth.value.user.user.account_verification.phone.value ? auth.value.user.user.account_verification.phone.value : null );
            phone_number.value = auth.value && auth.value.user && auth.value.user.account_verification && auth.value.user.account_verification.phone ? auth.value.user.account_verification.phone.value : null;
            verify_phone.value = auth.value && auth.value.user && auth.value.user.account_verification && auth.value.user.account_verification.phone && auth.value.user.account_verification.phone.verify ? true : false;
            refresh_token.value = auth.value && auth.value.tokens.refresh_token ? auth.value.tokens.refresh_token : null;
            access_token.value = auth.value && auth.value.tokens.access_token ? auth.value.tokens.access_token : null;
        }
    })

    // ---- check new auth user ----
    function check_new_auth_user() {
        check_auth();
        refresh_token.value = auth.value && auth.value.tokens.refresh_token ? auth.value.tokens.refresh_token : null;
        access_token.value = auth.value && auth.value.tokens.access_token ? auth.value.tokens.access_token : null;
    }
    // ---- show dialog language ----
    function switch_language() { 
        if(isMobile.value){
            $('#modal_show_change_language').modal('show');
        }else{
            $('#modal_show_change_language1').modal('show');
        }
     }
    // ---- click edit profile ----
    function edit_profile() { router.push(localePath({ name: 'setting-edit-profile' })); }
    // ---- change username ----
    function change_username() { router.push(localePath({ name: 'setting-change-username' })); }
    // ---- change password ----
    function change_password() { router.push(localePath({ name: 'setting-change-password' })); }
    // ---- change activate phone ----
    function change_activate_phone() { router.push(localePath({ name: 'setting-change-phone' })); }
    // ---- show modal logout ----
    function show_Modal() { $('#modal_show_confirm_logout').modal('show'); }
    // ---- logout ----
    function logout() {
        if (window.navigator.onLine) { // check is connect to internet
            // clear cart and some state
            clearLocalStorage(['cart_data', 'role_team_member'])
            clearState(['addressSelected'])
            useCookie('data_edit').value = ''
            loading.value = true;
            $('#modal_show_confirm_logout').modal('hide');
            var val_auth = localStorage.getItem('auth_user');
            if (val_auth) {
                $fetch(config.VUE_APP_API_URL + 'auth/logout',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Refresh-Token": refresh_token.value},
                    method: 'POST',
                    params: {lang: language.value},
                    body: new URLSearchParams({device_id: 0})
                }).then(res => {
                    // ---- check if login with google ----
                    if (auth.value && auth.value.user.account_verification && auth.value.user.account_verification.google) {
                        googleLogout();
                    }
                    not_cookie.value = null
                    chat_cookie.value = null
                    // ---- clear data in localstorage ----
                    localStorage.removeItem('auth_user');
                    // ---- clear cookie storage ----
                    VueCookieNext.removeCookie('auth_user');
                    // ---- go to home page ----
                    // router.push(localePath({name: 'index'}));
                    reloadNuxtApp({ path: "/", ttl: 1000 });

                }).catch(error => {
                    if (!error.response) {
                        not_cookie.value = null
                        chat_cookie.value = null
                        $('#modal_show_confirm_logout').modal('hide');
                        loading.value = false; // close loading
                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                    } else {
                        let check = error.response ? error.response : ''; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check && check.status === 401) { // retry
                            if (reload_q_again_1.value <= 2) {
                                reload_q_again_1.value += 1;
                                check_auth();
                                setTimeout( () => { logout(); }, 3000);
                            } else {
                                not_cookie.value = null
                                chat_cookie.value = null
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');      // remove cookie storage
                                router.push(localePath({name: 'index'}));
                            }
                        } else {
                            not_cookie.value = null
                            chat_cookie.value = null
                            $('.show_text_status').text(data_parse._data.message);
                            $('#modal_show_status').modal('show');
                        }
                    }
                }).finally(() => { loading.value = false; });
            }

        } else {
            $('#modal_show_confirm_logout').modal('hide');
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }


    // ---- connect with google, facebook, apple ----
    function connect_to_media(type) {
        let dis_is_true = false;
        let AU = auth.value && auth.value.user && auth.value.user.account_verification ? auth.value.user.account_verification : '';
        if (type === 'google' && AU.google && AU.google.verify) {
            disconnect_type.value = 'google';   // condition for check dis media.
            dis_is_true = true;
        } else if (type === 'facebook' && AU.facebook && AU.facebook.verify) {
            disconnect_type.value = 'facebook'; // condition for check dis media.
            dis_is_true = true;
        } else if (type === 'apple' && AU.apple && AU.apple.verify) {
            disconnect_type.value = 'apple';    // condition for check dis media.
            dis_is_true = true;
        }
        // --> disconnect <--
        if (dis_is_true) {
            $('#modal_dis_verify_media').modal('show');

        // --> connect to media <--
        } else {
            if (type === 'google') {
                googleTokenLogin().then((response) => {
                    // console.log("Handle the response", response);
                    request_to_activate(response.access_token, 'google', {}, 'connect');
                })
            } else if (type === 'facebook') {
                FB.login((response) => {
                    // -- handle the response --
                    if (response.status === 'connected') {
                        request_to_activate(response.authResponse.accessToken, 'facebook', {}, 'connect');
                    }
                });
            } else {
                // console.log('app ot der')
            }
        }
    }
    // ---- disconnect verify google ----
    function disconnect_google() {
        $('#modal_dis_verify_media').modal('hide'); // close modal disconnect.
        if (disconnect_type.value === 'facebook') {
            request_to_activate('', 'facebook', '', 'disconnect');
        } else if (disconnect_type.value === 'google') {
            request_to_activate('', 'google', '', 'disconnect');
        } else if (disconnect_type.value === 'apple') {
            request_to_activate('', 'apple', '', 'disconnect');
        }
    }

    // ---- request to API with token media ----
    function request_to_activate(token, type, data, con_or_dis) {
        // console.log(token); console.log(type);

        if (window.navigator.onLine) { // check is connect to internet

            let data_body = ''; let url = '';
            if (con_or_dis === 'connect') {
                data_body = { type: type === 'facebook' ? 'facebook' : (type === 'google' ? 'google' : 'apple'), token: token }
                if (type === 'apple') {
                    data_body['first_name'] = '';
                    data_body['last_name'] = '';
                }
                url = 'me/link_account';
            } else {
                data_body = { type: type === 'facebook' ? 'facebook' : (type === 'google' ? 'google' : 'apple') }
                url = 'me/unlink_account';
            }

            loading.value = true;
            var val_auth = localStorage.getItem('auth_user');
            if (val_auth) {
                $fetch(config.VUE_APP_API_URL + url,{
                    headers: { "Access-Token": auth.value.tokens.access_token },
                    method: 'POST',
                    params: { lang: language.value },
                    body: new URLSearchParams(data_body)
                }).then(res => {
                    // console.log(res);

                    // --> if change success set new value user to localStorage <--
                    $fetch(config.VUE_APP_API_URL + 'me', {
                        headers: { "Access-Token": auth.value.tokens.access_token },
                        params: { lang: language.value }
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
                        // --- get auth user again ---
                        check_auth();
                        // --- show success message ---
                        toast_message(res.message, true);

                    }).catch(er => { console.log(er.response); }).finally(() => (loading.value = false));
                    // --> /if change success set new value user to localStorage <--

                }).catch(e => {
                    if (e.response) {
                        let check = e.response ? e.response : '';   // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check && check.status === 401) {        // retry
                            if (reload_q_again_2.value <= 2) {
                                reload_q_again_2.value += 1;
                                check_auth();
                                setTimeout( () => { request_to_activate(token, type, data, con_or_dis); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');      // remove cookie storage
                                router.push(localePath({name: 'index'}));
                            }
                        } else {
                            $('.show_text_status').text(data_parse._data.message);
                            $('#modal_show_status').modal('show');
                        }
                    }
                    loading.value = false;
                });
            }
        }
    }
    // ---- change auto update profile picture ----
    function change_auto_update_pro_pic() {
        let switch_value = $('#change_auto_up_profile').is(':checked'); // value switch auto update profile picture.
        if (auto_up_pro.value !== switch_value) {
            let data_body = { status: switch_value }
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'me/auto_update_profile_picture', {
                headers: {"Access-Token": auth.value.tokens.access_token},
                method: 'POST',
                params: {lang: language.value},
                body: new URLSearchParams(data_body)
            }).then(res => {
                // console.log(res);
                auto_up_pro.value = switch_value;

                auth.value.user.auto_update_profile_picture = auto_up_pro.value;
                localStorage.setItem("auth_user", JSON.stringify(auth.value));
                // --- set cookie ---
                let user_cookies = helper.create_data_user_login(auth.value);
                VueCookieNext.setCookie('auth_user', user_cookies);
                // --- get auth user again ---
                check_auth();
                // --- show success message ---
                toast_message(res.message, true);

            }).catch(e => {
                if (e.response) {
                    let check = e.response ? e.response : '';   // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    if (check && check.status === 401) {        // retry
                        if (reload_q_again_4.value <= 2) {
                            reload_q_again_4.value += 1;
                            check_auth();
                            setTimeout(() => { change_auto_update_pro_pic(); }, 3000);
                        }
                    } else {
                        $('.show_text_status').text(data_parse._data.message);
                        $('#modal_show_status').modal('show');
                    }
                }
            }).finally(() => { loading.value = false; });
        }
    }
    // ---- delete account ----
    function delete_account() { $('#modal_show_delete_account').modal('show'); }
    function modal_password() {
        password.value = '';
        $('#modal_add_password').modal('show');
    }
    function let_delete_account() {
        if (password.value) {
            $('#modal_show_delete_account').modal('show');  // close modal confirm delete.
            $('#modal_add_password').modal('hide');         // close modal password.

            if (window.navigator.onLine) {
                loading.value = true;
                $fetch(config.VUE_APP_API_URL + 'me/deactivate', {
                    headers: { "Access-Token": auth.value.tokens.access_token },
                    params: { lang: language.value },
                    method: 'POST',
                    body: new URLSearchParams({ password: password.value })

                }).then(res => {
                    // ---- clear data in localstorage ----
                    localStorage.removeItem('auth_user');
                    // ---- clear cookie storage ----
                    VueCookieNext.removeCookie('auth_user');
                    // ---- go to home page ----
                    router.push(localePath({name: 'index'}));

                }).catch(e => {
                    if (!e.response) {
                        loading.value = false; // close loading
                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                    } else {
                        let check = e.response;
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check.status === 401) { // retry
                            if (reload_q_again_5.value <= 2) {
                                reload_q_again_5.value += 1;
                                check_auth();
                                setTimeout( () => { let_delete_account(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }
                        } else {
                            toast_message(data_parse._data.message, false);
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

    // ---- show toast message ----
    function toast_message(message, status) {
        message_success.value = message;
        error_or_success_message.value = status;
        let toast = $(".toast_setting");
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }
    // ---- check auth user login ----
    function check_auth() {
        auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
        d_verify.value = auth.value && auth.value.user && auth.value.user.account_verification ? auth.value.user.account_verification : '';
    }
    // ---- click change language ----
    function change_language(p_lang) {
        if (p_lang === 'km') {
            localStorage.setItem('lang', 'km');
            VueCookieNext.setCookie('lang', 'km'); // for serverSideRendering.
            language.value = "km"; // set new value
            router.replace(switchLocalePath('km')); // change lang with with url.

            $('#setting_title').text('ការកំណត់'); // add text to title setting.

        } else if (p_lang === 'en') {
            localStorage.setItem('lang', 'en');
            VueCookieNext.setCookie('lang', 'en'); // for serverSideRendering.
            language.value = "en"; // set new value
            router.replace(switchLocalePath('en')); // change lang with with url.

            $('#setting_title').text('Setting'); // add text to title setting.
        }
        $('.close_dialog_language').click(); // close dialog change language
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
</script>
