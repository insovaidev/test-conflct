
<template>
    <div :class="isDesktop ? 'des_container mt-3 dt_P_noti' : 'max_width_form'">
        <!-- App Bar -->
        <div v-if="isMobile" class="col no_padding fix_app_bar">
            <header class="bg_app_bar_header_ ">
                <nav class="navbar p-1 nav_height">
                    <h1 class="ms-3 mb-0 font_19">
                        {{ $t('message.notification') }}
                    </h1>
                    <button @click="show_option" class="btn n_t_options">
                        <i class="icon-ellipsis-vertical"></i>
                    </button>
                </nav>
            </header>
        </div>
        <!-- /App Bar -->

        <!-- Body -->
        <div class="col no_padding mt_80 min_h" :class="isDesktop ? 'dt_noti_max_width' : 'margin_below_app_bar'">
            <div class="max_width_form" :class="check_bg ? 'bg-no-result-noti borders' : ''">

                <!-- show status 503 -->
                <div v-if="status_503" class="stu_maintain">
                    <img alt="wrench" :src="asset_url+version_library+'img/wrench.png'">
                    <p class="stu_mt_title">{{ $t('new_text_3.server_maintain_title') }}</p>
                    <p class="stu_mt_contain">{{ status_503 && status_503.data ? status_503.data : $t('new_text_3.server_maintain_dis') }}</p>
                    <button class="btn btn-sm bg_btn" @click="try_reload" type="button">{{ $t('new_text_3.reload') }}</button>
                    <br><br><br>
                </div>

                <!-- show data notifications -->
                <template v-else>
                    <div v-if="noti_notifications.length > 0" :class="isMobile ? 'pt-4' : ''">
                        <div v-if="!isMobile" class="fs-5 fw-semibold d_h">
                            <div>{{ $t('message.notification') }}</div>
                            <div @click="show_option" class="btn border-0 ms-auto d_i">
                                <i class="icon-ellipsis-vertical"></i>
                            </div>
                        </div>
                        <div class="h-v-mouse" v-for="(no_ti, index) of noti_notifications" :key="index" v-bind:id="no_ti.notid" v-bind:class="no_ti.is_open ? 'read_notification' : 'unread_notification'">
                            <!------ apply_job ------>
                            <div v-if="no_ti.type === 'apply_job'" @click="show_modal_detail(no_ti.notid, no_ti.is_open)" class="style_flex bg_notification pd_noti cur_sur">
                                <div class="margin_notification">
                                    <div class="n_t_icon_notification">
                                        <span class="ion-ios-bell n_t_font_span"></span>
                                    </div>
                                </div>
                                <div class="width_100 n_t_pad_div_col">
                                    <p class="n_t_s_font_title"> {{ no_ti.title ? no_ti.title : '' }} </p>
                                    <p v-if="no_ti.message" class="n_t_s_font_text"> Name: {{ no_ti.message }} </p>
                                    <!--<p class="m-0 font_13 c_m_grey"> Phone: 012121212 </p>
                                    <p class="m-0 font_13 c_m_grey"> Email: pu.som@gmail.com </p>-->
                                    <p class="truncate_wrap n_t_s_font_date"> {{ no_ti.send_date ? convertFromNow(no_ti.send_date) : '' }} </p>
                                </div>
                            </div>

                            <!------ teams (add member to store) ------>
                            <div v-else-if="no_ti.type === 'teams'" class="style_flex bg_notification pd_noti">
                                <div class="margin_notification">
                                    <div class="n_t_icon_notification">
                                        <span class="ion-ios-bell n_t_font_span"></span>
                                    </div>
                                </div>
                                <div class="width_100 n_t_pad_div_col">
                                    <p class="n_t_s_font_title"> {{ no_ti.title ? no_ti.title : '' }} </p>
                                    <p class="truncate_wrap n_t_s_font_date"> {{ no_ti.send_date ? convertFromNow(no_ti.send_date) : '' }} </p>
                                    <div class="_flex_ d-not-btn-actions">
                                        <button @click="do_action_ntf(no_ti.notid, no_ti.data.userid, '', 'reject')" class="col btn btn-sm btn_1">Reject</button>
                                        <button @click="do_action_ntf(no_ti.notid, no_ti.data.userid, no_ti.data.storeid,'accept')" class="col btn btn-sm btn_2">Accept</button>
                                    </div>
                                </div>
                            </div>

                            <!------ all notification ... ------>
                            <div v-else class="style_flex bg_notification pd_noti cur_sur">
                                <div class="margin_notification" @click="show_profile(no_ti.notid, no_ti.data.user.username, no_ti.is_open)">
                                    <img :src='no_ti.data && no_ti.data.user && no_ti.data.user.photo && no_ti.data.user.photo.medium ? no_ti.data.user.photo.medium.url : empty_img_user'
                                         :alt="no_ti.data && no_ti.data.user && no_ti.data.user.name ? no_ti.data.user.name : ''" class="n_t_img_user_noti bg_reload_img" @error="imageUrlAlt_profile">
                                </div>
                                <div class="width_100 n_t_pad_div_col" @click="show_all_notification(no_ti)">
                                    <p class="n_t_s_font_title"> {{ no_ti.title ? no_ti.title : '' }} </p>
                                    <p class="n_t_s_font_text"> {{ no_ti.message ? no_ti.message : '' }} </p>
                                    <p class="truncate_wrap n_t_s_font_date"> {{ no_ti.send_date ? convertFromNow(no_ti.send_date) : '' }} </p>
                                </div>
                                <div class="margin_notification" @click="show_all_notification(no_ti)" v-if="no_ti.data && no_ti.data.post && no_ti.data.post.thumbnail">
                                    <img class="n_t_img_customer_noti bg_reload_img" :alt="no_ti.data && no_ti.data.post ? no_ti.data.post.title : ''"
                                         @error="imageUrlAlt_post" :src='no_ti.data.post.thumbnail'>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="!isDesktop">
                        <ClientOnly>
                            <VueEternalLoading :load="get_notification" :key="refresh_loader" v-model:is-initial="isInitial" margin="800px">
                                <template #loading>
                                    <div class="w-100 p-0">
                                        <!-- loading background when data have -->
                                        <div v-if="noti_notifications.length > 0" class="text-center mt-4">
                                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                        </div>
                                        <!-- loading background when data empty -->
                                        <div v-else class="full_width">
                                            <div v-for="key in 6" :key="key" class="style_flex bg-white pd_noti bg_notification">
                                                <div class="margin_notification mb-2">
                                                    <div class="animated-background n_t_img_user_noti"></div>
                                                </div>
                                                <div class="width_100" style="padding: 15px 15px 0 0;">
                                                    <div class="animated-background mb-1 text_hei_loading"></div>
                                                    <div class="animated-background mb-1 text_hei_loading"></div>
                                                    <div class="animated-background mb-1 text_hei_loading"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #error="{ retry }">
                                    <!-- error connection -->
                                    <div class="col no_padding" :class="noti_notifications.length > 0 ? '' : 'margin_below_app_bar'">
                                        <div class="no_more_result p-2">
                                            <div class="p_bg_status">
                                                <span class="fas fa-wifi size_icon_status"></span>
                                                <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                                <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                                <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #no-more>
                                    <br>
                                    <div class="no_more_result">No More</div>
                                </template>
                                <template #no-results>
                                    <div class="fs-5 fw-semibold mb-2 screen-d">{{ $t('message.notification') }}</div>
                                    <div class="no_more_result mg_top_result">
                                        <img src="/icon/paper-plane.png" alt="no-results.png" width="160px">
                                        <!-- <img src="/icon/empty-box.png" alt="empty-box.png" width="110px"> -->
                                        <p class="no_more_result mt-3 mb-5"> You don't have any notifications right now </p> 
                                    </div>
                                </template>
                            </VueEternalLoading>
                        </ClientOnly>
                        <br><br><br>
                    </template>
                    <template v-else>
                        <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                            <div v-if="noti_notifications.length > 0" class="text-center mt-4 mb-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                            <div v-else class="full_width">
                                <div v-for="key in 6" :key="key" class="style_flex bg-white pd_noti bg_notification">
                                    <div class="margin_notification mb-2">
                                        <div class="animated-background n_t_img_user_noti"></div>
                                    </div>
                                    <div class="width_100" style="padding: 15px 15px 0 0;">
                                        <div class="animated-background mb-1 text_hei_loading"></div>
                                        <div class="animated-background mb-1 text_hei_loading"></div>
                                        <div class="animated-background mb-1 text_hei_loading"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="des_btn_load_more">
                            <button v-if="p_l_hide_btn_load_more" @click="manually_get_notification" class="btn">{{ $t('text_desktop.load_more') }}</button>
                            <div v-else-if="noti_notifications.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                              <i class="fa fa-exclamation-circle u_no_result_font"></i>
                              <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <!-- /Body -->

        <!-- modal detail apply job -->
        <div v-if="isMobile" class="modal style_full_screen" :class="isDesktop ? 'dt_add_mem_store' : ''" id="show_modal_detail"
             tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true" > <!-- fade -->
            <div class="modal-dialog modal_dialog_style" :class="!isDesktop ? 'bg-white' : ''" role="document">
                <div class="modal-content">
                    <div style="background-color:#e0e0e0;margin-top: 50px;" class="mb-3">
                        <resume :pageType="'detail_apply'" class="pt-0" /> 
                    </div>
                    <!-- App Bar -->
                    <div class="col no_padding fix_app_bar">
                        <div class="_div_nav bg_app_bar_header_">
                            <div @click="clearData" class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                                <button class="btn clear-btn-app-bar" aria-label="back">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col l_h_con_title">
                                <p class="m-0 name_style truncate_wrap"> 
                                    {{ language === 'km' ? 'ការដាក់ពាក្យ' : 'Application' }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- /App Bar -->

                    <!-- Body -->
                    <div class="col no_padding" :class="isDesktop ? '' : 'margin_below_app_bar'">
                        <div class="large-12 columns dt_mo_text_font">
                            <div class="nav nav_desktop">
                                <div class="col pr-1 pl-2 pt-2" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.email">
                                    <a rel="nofollow" aria-label="email" v-bind:href="'mailto:'+data_detail_job.application.email" class="btn form-control btn_sms btn-lg pt-6 btn-k24-primary text-white" id="btn_sms">
                                        <i aria-hidden="true" class="fa fa-envelope font_22 mr-1"></i>
                                    </a>
                                </div>
                                <template v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                                    <div :class="!data_detail_job.application.email ? 'col pl-2 pr-1 pt-2' : 'col pl-1 pr-1 pt-2'">
                                        <button @click="clicPhone" type="button" class="btn form-control btn_call btn-lg pt-6 btn-k24-primary text-white" id="btn_call" aria-label="phone">
                                        <i aria-hidden="true" class="fa fa-phone font_21 mr-1"></i>
                                        </button>
                                    </div>
                                </template>
                                <div class="col pl-1 pr-2 pt-2">
                                    <button type="button" @click="click_chat" id="button_chat" class="btn form-control btn-lg pt-6 btn-k24-secondary text-white" aria-label="comment">
                                        <i class="fa fa-comments font_21 mr-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="modal" id="show_modal_detail" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                <div class="rounded" :class="GetAll ? 'modal-content' : ''">
                    <div v-if="GetAll" class="modal-header py-2">
                        <h5 class="modal-title">{{ $t('resume_cv.resume') }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" :class="GetAll ? 'bge1e1e1' : ''">
                        <div class="mt_-85">
                            <resume :pageType="'detail_apply'" class="pt-0" /> 
                        </div>
                    </div>
                    <div v-if="ShowPhone && isMobile === false">
                        <div class="modal-body p-0" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                            <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                                <li v-for="p_n in data_detail_job.application.phone" :key="p_n" class="cl_ripple">
                                    <a rel="nofollow" class="full_field_a_tag border_top color_reason _flex_important_" :href="'tel:'+p_n">
                                        <div class="col _flex_ p-0 mt-1"> <p class="u_show_ph_mg">{{ p_n }}</p> </div>
                                        <div class="col-2 p-0 text-right"> <i aria-hidden="true" class="fa fa-phone call_icon_modal"></i> </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer p-0">
                        <div v-if="data_detail_job" class="w-100">
                            <div class="d-flex w-100 nav_desktop">
                                <div class="col pr-1 pl-2 pt-2" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.email">
                                    <a rel="nofollow" aria-label="email" v-bind:href="'mailto:'+data_detail_job.application.email" class="btn pt-6 btn-k24-primary btn-height" id="btn_sms">
                                        <i aria-hidden="true" class="fa fa-envelope font_22 mr-1 pt-1"></i>
                                    </a>
                                </div>
                                <template v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                                    <div :class="!data_detail_job.application.email ? 'col pl-2 pr-1 pt-2' : 'col pl-1 pr-1 pt-2'">
                                        <button @click="clickPhone( ShowPhone ? 'false' : 'true' )" type="button" class="btn pt-6 btn-k24-primary btn-height" id="btn_call" aria-label="phone">
                                            <i aria-hidden="true" class="fa fa-phone font_21 mr-1 pt-1"></i>
                                        </button>
                                    </div>
                                </template>
                                <div class="col pl-1 pr-2 pt-2">
                                    <button type="button" @click="click_chat" id="button_chat" class="btn pt-6 btn-k24-secondary btn-height" aria-label="comment">
                                        <i class="fa fa-comments font_21 mr-1 pt-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal detail apply job -->

        <div v-if="ShowPhone && isMobile">
            <div  class="loading_back_ground" @click="clicClose">
                <div style="position:fixed;bottom:60px;width:100%">
                    <div class="option_selected" style="bottom: 0px;">
                        <div class="border_bottom u_show_ph_number">
                            <p id="label_phone_or_sms" class="modal-title font_13">
                            {{ $t('message.call') }}
                            </p>
                        </div>
                        <div class="modal-body p-0" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                            <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                            <li v-for="p_n in data_detail_job.application.phone" :key="p_n" class="cl_ripple">
                                <a rel="nofollow" class="full_field_a_tag border_top color_reason _flex_important_" :href="'tel:'+p_n">
                                <div class="col _flex_ p-0 mt-1"> <p class="u_show_ph_mg">{{ p_n }}</p> </div>
                                <div class="col-2 p-0 text-right"> <i aria-hidden="true" class="fa fa-phone call_icon_modal"></i> </div>
                                </a>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div class="a_cancel_btn_modal_bg" @click="clicClose">
                        <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                            <p class="modal-title color_reason"><b>Cancel</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal show option on phone number -->
        <div class="modal fade style_full_screen u_safety_bg" id="modal_show_option_phone_number" tabindex="-1" role="dialog" >
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                        <div class="option_selected">
                            <div class="modal-body p-0">
                                <ul class="list-unstyled list-phone-modal">
                                    <template v-if="detail_phone_no_ti">
                                        <li v-for="p_n in detail_phone_no_ti" :key="p_n" class="ripple_li border_bottom cl_ripple cur_sur">
                                            <a rel="nofollow" v-bind:href="is_call_or_sms === 'sms' ? 'sms:'+p_n : 'tel:'+p_n" class="full_field_a_tag color_reason border_unset">
                                                {{ p_n }}
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                        <div class="a_cancel_btn_modal_bg">
                            <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show option on phone number -->

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

        <!-- Modal show filter chat -->
        <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="modal_action_chat" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 'modal_bottom_screen' : ''">
                        <div class="option_selected">
                            <div class="modal-body p-0">
                                <ul id="list-phone-modal" class="list-unstyled mobile_modal_actions_container">
                                    <li @click="mark_all_as_read" class="color_reason cur_sur cl_ripple" >
                                        <p class="full_field_a_tag m-0 bor_bot_unset"> {{ $t('new_text_3.mark_all_as_read') }} </p>
                                    </li>
                                    <li data-bs-toggle="modal" data-bs-target="#modal_confirm" class="color_reason cur_sur cl_ripple border-top" >
                                        <p class="full_field_a_tag m-0 bor_bot_unset">{{ locale==='km' ? 'លុបដំណឹងទាំងអស់' : 'Delete all notifications' }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="a_cancel_btn_modal_bg cur_sur">
                            <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal_confirm" aria-hidden="true" aria-labelledby="modal_confirm" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered m-auto" style="width: 350px;">
                <div class="modal-content rounded" >
                    <div class="modal-body text-center">
                        <h5>{{  locale === 'km' ? 'តើអ្នកប្រកដ ឫអត់?' : 'Are you sure?'  }}</h5>
                        <p class="mb-0 text-secondary">{{  locale === 'km' ? 'អ្នកនឹងលុប "ដំណឹងទាំងអស់" ជាអចិន្ដ្រៃយ៍។' : 'You will permanently delete "All notifications".'  }}</p>
                    </div>
                    <div class="d-flex p-3">
                        <button class="btn btn-k24-primary me-3 w-50" data-bs-dismiss="modal">{{ $t('message.cancel') }}</button>
                        <button class="btn btn-danger w-50" @click="delete_all_notification" data-bs-dismiss="modal">{{ $t('message.delete') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- show success message -->
        <div class="toast style_toast d-none" style="z-index: 2000"> <!-- role="alert" data-autohide="false" aria-live="polite" aria-atomic="true" data-delay="6000" -->
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
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const isMobile= ref(helper.m_or_d())

    definePageMeta({ middleware: "auth" });       // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();                     // user route like (this.$route).
    const router = useRouter();                   // user route like (this.$router).
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const isDesktop = helper.check_is_desktop(); // check userAgent

    const ShowPhone = useState('ShowPhone')
    ShowPhone.value = false

    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const p_l_hide_btn_load_more = useState('p_l_hide_btn_load_more', () => true);
    const dt_loading = ref(false);
    const refresh_loader = ref(1);
    const isInitial = ref(true);  // value for reset scroll loader (true = reset scroll again).

    const auth = ref('');
    const noti_pageSize = useState('noti_pageSize', () =>0);
    const noti_notifications = useState('noti_notifications', () =>[]);
    const noti_arr_check_id = useState('noti_arr_check_id', () =>[]);
    const loading = ref(false);
    const detail_title_no_ti = ref(null);
    const detail_name_no_ti = ref(null);
    const detail_email_no_ti = ref(null);
    const detail_phone_no_ti = ref(null);
    const detail_date_no_ti = ref(null);
    const detail_view_cv_no_ti = ref(null);
    const detail_file_cv_name_no_ti = ref(null);
    const is_call_or_sms = ref('');
    const old_count_badge = ref(0);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);
    const reload_q_again_4 = ref(0);
    // --- value if clean interval ---
    const  is_clean = ref(false); // false = allow function auto_get_noti_list add data simple, true = not allow to add.
    // --- check screen height ---
    const stop_auto_request = ref(true);
    const timer_auto_not_list = ref('');
    // --- status 503, server maintain ---
    const status_503 = ref('');

    // --- meta variable ---
    const meta_title_noti = useState('meta_title_noti', () => 'Sale online in Phnom Penh, Cambodia on Khmer24.com');

    const check_bg = ref(false)

    useHead({
        title: meta_title_noti.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_noti.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_noti.value },
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

    if (process.server) { await Server_Notification(); }

    onMounted(() => {
        if (process.client) {
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // ---- if in notification page, must to auto request new notification if count badge change ----
            clear_auto_request();
            timer_auto_not_list.value = setInterval(function() { auto_get_noti_list(); }, 4000); // delay 4 seconds

            // ---- clear old data when click from another form ----
            if (route.params.clear_cache) {
                noti_pageSize.value = 0;
                noti_notifications.value = [];
                noti_arr_check_id.value = [];
            }

            $(".cl_ripple").ripple();

            auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';

            if (isDesktop && noti_notifications.value.length === 0) {
                manually_get_notification(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })
    onUnmounted(() => {
        clear_auto_request();
    })


    function clickPhone(type){
        if(type==='true'){
            ShowPhone.value = true
        }else{
            ShowPhone.value = false
        }
    }

    // --- get server notification ---
    async function Server_Notification() {
        const token_auth = useCookie('auth_user')
        const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
        // if have tokens
        if (tokens) {
            try {
                const reqUrl = config.VUE_APP_API_URL_NOTIFICATION_NEW+'?offset='+noti_pageSize.value;
                const { data: noti_result } = await useFetch(reqUrl, {
                    key: reqUrl,
                    headers: { "Access-Token": tokens },
                    params: { lang: language.value },
                })

                noti_notifications.value = noti_notifications.value.concat(noti_result.value.data)
                noti_pageSize.value+=10
                // desktop view close or open loadMore button on serverside
                if (isDesktop) { p_l_hide_btn_load_more.value = noti_notifications.value.length < noti_pageSize.value ? false : true; }

                // -- store id to arr_check_id for check have new notification or not --
                Object.entries(noti_result.value.data).forEach(([key, val], index) => {
                    noti_arr_check_id.value.push(parseInt(val.notid));
                });

            } catch (er) {
                console.log('error')
                console.log(er)
            }
        }
    }
    // --- get client all notification ---
    async function get_notification({loaded, error, noMore, noResults}, { isFirstLoad }) {

        check_auth_user();

        // if data smaller than offset, stop request
        // if (noti_notifications.value.length === noti_pageSize.value) {

            $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW, {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                headers: {"Access-Token": auth.value.tokens.access_token},
                params: {lang: language.value, offset: noti_pageSize.value},
            }).then(res => {

                noti_pageSize.value += res.limit; // add offset
                noti_notifications.value = noti_notifications.value.concat(res.data); // concat in multiple array

                // -- store id to arr_check_id for check have new notification or not --
                $.each(res.data, (key, val) => {
                    noti_arr_check_id.value.push(parseInt(val.notid));
                });

                // -- tracking on google analytic --
                if (noti_arr_check_id.value.length <= 10 && noti_pageSize.value === 20) { } // prevent data smaller than 10 and request two time
                else { track_google_analytics(noti_pageSize.value > 10 ? noti_pageSize.value : 0); }

                status_503.value = '';

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (noti_notifications.value.length === 0) {
                        if (isFirstLoad) {
                            noResults(); // console.log('noResult');
                            check_bg.value = true
                        } else {
                            noMore(); // console.log('noMore');
                        }
                    } else {
                        noMore();
                    }
                } else {
                    if (noti_notifications.value.length < noti_pageSize.value) {
                        noMore(); // close scroll.
                    } else {
                        loaded(); // scroll down load more.
                    }
                }

            }).catch(e => {
                if (!e.response) {
                    error();

                } else {
                    let check = e.response;
                    let data_check = JSON.stringify(check);
                    let d_parse = JSON.parse(data_check);
                    if (check.status === 401) { // retry
                        if (reload_q_again_3.value <= 2) {
                            reload_q_again_3.value += 1;
                            setTimeout(() => { loaded(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    } else if (check.status === 503) { // show status maintain
                        status_503.value = { status: 503, data: d_parse._data.message }
                    }
                }
            });

        // } else {
        //     // noMore();
        //     noResults();
        // }
    }
    // ---- manually get notifications ----
    function manually_get_notification() {
        check_auth_user();
        dt_loading.value = true;

        $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW, {
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          headers: {"Access-Token": auth.value.tokens.access_token},
          params: {lang: language.value, offset: noti_pageSize.value},
        }).then(res => {

          noti_pageSize.value += res.limit; // add offset
          noti_notifications.value = noti_notifications.value.concat(res.data); // concat in multiple array
          dt_loading.value = false;
          p_l_hide_btn_load_more.value = noti_notifications.value.length < noti_pageSize.value ? false : true;

          // -- store id to arr_check_id for check have new notification or not --
          $.each(res.data, (key, val) => {
            noti_arr_check_id.value.push(parseInt(val.notid));
          });

          // -- tracking on google analytic --
          if (noti_arr_check_id.value.length <= 10 && noti_pageSize.value === 20) { } // prevent data smaller than 10 and request two time
          else { track_google_analytics(noti_pageSize.value > 10 ? noti_pageSize.value : 0); }

        }).catch(e => {
          if (!e.response) {

          } else if (e.response && e.response.status === 401) { // retry
            if (reload_q_again_3.value <= 2) {
              reload_q_again_3.value += 1;
              setTimeout(() => { manually_get_notification(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');   // remove localStorage
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }
          }
          dt_loading.value = false;
        });
    }
    // ---- retry request notification ----
    function try_reload() {
        setTimeout(() => {
            noti_pageSize.value = 0;        // clear offset
            noti_notifications.value = [];  // clear array notification
            refresh_loader.value += 1;      // reload scroll again
            isInitial.value = true;         // reload scroll again
        },250);
    }
    // ---- track on google analytic ----
    function track_google_analytics (page) {
        // setTimeout(() => {
            let offset = page > 0 ? '?offset=' + page : '';      // set offset of page if scroll get more data
            let page_path = route.path + offset;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_noti.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('home', data);
            // -- page_view --
            pageview(data);
        // }, 50);
    }
    // ---- check auth login user in client side ----
    function check_auth_user() {
        auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }
    // --- auto check and request new notification ---
    function auto_get_noti_list() {
        check_auth_user();
        const route_name = helper.clear_prefix_route_name(route.name);
        if (route_name === 'notification') {
            let count_new_badge = '';
            if (isDesktop) {
              count_new_badge = $('html body #DT_badge_noti').text(); // get new count badge Desktop View
            } else {
              count_new_badge = $('html body #add_badge_not').text(); // get new count badge Mobile View
            }
            let convert_c_b = count_new_badge ? parseInt(count_new_badge) : '';
            if (convert_c_b && convert_c_b > 0) {
                if (convert_c_b === old_count_badge.value) { // if new badge equal old badge, not request anymore
                    // console.log('old badge => ' + convert_c_b);
                } else {
                    old_count_badge.value = convert_c_b; // store new count badge to another variable for check later
                    // console.log('new badge => ' + convert_c_b);

                    $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW, {
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        headers: { "Access-Token": auth.value.tokens.access_token },
                        params: { lang: language.value, offset: 0 },

                    }).then(res => {
                        if (is_clean.value) { // happen when clear cache data but interval still run, so not allow to add data.
                            is_clean.value = false; // set to false, then add data simple.
                        } else {
                            // store id to arr_check_id for check have new notification or not
                            for (const inx in res.data) {
                                if (!noti_arr_check_id.value.includes(parseInt(res.data[inx].notid))) { // if id not exist in arr_check_id
                                    noti_arr_check_id.value.push(parseInt(res.data[inx].notid));
                                    noti_notifications.value.splice(0, 0, res.data[inx]); // add that index to top of array
                                }
                            }
                        }
                    }).catch(e => {
                        if (!e.response) {

                        } else if (e.response) {
                            if (e.response.status === 401) { // retry
                                if (reload_q_again_1.value <= 2) {
                                    reload_q_again_1.value += 1;

                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({name: 'index'}));
                                }
                            }
                        }

                    });
                }
            }

        } else { // clear auto request notification
            clear_auto_request();
        }
    }
    // --- show detail notification ---
    const notis_id = useState('notis_id',()=>'')
    const noti_user_id = ref('')
    const get_data_id = useState('get_data_id',()=>'')
    function show_modal_detail(notification_id, is_open) {
        // -- check if never click view request to mark as read --
        if (is_open === false) {
            mark_as_read_notification(notification_id);
        }
        // -- click notification and remove background to white --
        $('#'+notification_id).removeClass('unread_notification').addClass('read_notification');
        // -- replace data to modal for detail --
        for (var i = 0; i < noti_notifications.value.length; i++) {
            if (noti_notifications.value[i].notid === notification_id) {
                let not = noti_notifications.value[i];
                detail_title_no_ti.value = not.data.post && not.data.post.title ? not.data.post.title : '';
                detail_name_no_ti.value = not.data.cv && not.data.cv.name ? not.data.cv.name : '';
                detail_email_no_ti.value = not.data.cv && not.data.cv.email ? not.data.cv.email : '';
                detail_phone_no_ti.value = not.data.cv && not.data.cv.phone ? not.data.cv.phone : [];

                // convert array to string
                // show_phone_number.value = detail_phone_no_ti.value.toString();  // old
                // show_phone_number.value = detail_phone_no_ti.value.join(' , '); // new

                detail_date_no_ti.value = convertFromNow(not.data.apply_date);
                detail_view_cv_no_ti.value = not.data.cv.cv;
                // -- name file --
                var str = not.data.cv.cv;
                var name_file_cv = str ? str.split('/').pop() : '';  //--> str.split(/[\s,]+/).pop();
                detail_file_cv_name_no_ti.value = name_file_cv;
                notis_id.value = not.id
                get_Detail()
            }
        }
        // --- show modal detail CV ---
        $('#show_modal_detail').modal('show');
    }
    // --- go to profile ---
    function show_profile(notification_id, username, is_open) {
        if (window.navigator.onLine) {
            if (is_open === false) {
                mark_as_read_notification(notification_id);
            }
            router.push(localePath({ name: 'username', params: { username: username } }));
            save_tracking_user({ placement: 'notification' }, { clear: 'clr_old_data' });
        } else {
            $('#modal_show_status_error_connection').modal('show'); // if connection error
        }
    }
    // --- check notification is comment, post or any ---
    function show_all_notification(n_t_f) {
        let nt_id = n_t_f.notid ? n_t_f.notid : '';
        let nt_title = n_t_f.data && n_t_f.data.post ? n_t_f.data.post.title : '';
        let nt_post_id = n_t_f.data && n_t_f.data.post ? n_t_f.data.post.id : '';
        let nt_is_open = n_t_f ? n_t_f.is_open : '';
        let nt_comment = n_t_f.data && n_t_f.data.comment && n_t_f.data.comment.comment_status === 'reply' ? true : false;

        if (window.navigator.onLine) {
            // mark as read on specific comment.
            if (nt_is_open === false) { mark_as_read_notification(nt_id); }
            // is notification comment status "reply".
            if (nt_comment) {
                let n = n_t_f.data && n_t_f.data.comment ? n_t_f.data.comment : '';
                let query = { post_id: nt_post_id, show_spe_com: n && n.reply_id ? n.reply_id : '' }; // get specific detail comment.
                // if (isDesktop) {
                //     query['tap'] = 'comments';
                //     query['sh_com'] = 'show';
                //     router.push(localePath({name: 'chats', query: query}));
                // } else {
                //     router.push(localePath({name: 'chats-detail-comment', query: query}));
                // }

                // if(isMobile.value){
                    router.push(localePath({ name: 'chats-detail-comment' , query: query }));
                // } else{
                //     query['tap'] = 'comments';
                //     query['sh_com'] = 'show';
                //     router.push(localePath({ name: 'chats' , query: query }));
                // }
            // all notifications.
            } else {
                router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(nt_title), id: nt_post_id } }));
                save_track_optional('tracking', { placement: 'notification', display_type: 'list' });
            }
        } else {
            $('#modal_show_status_error_connection').modal('show'); // if connection error
        }
    }
    // --- dialog_phone_number ---
    function dialog_phone_number(condition) {
        if (detail_phone_no_ti.value) {
            if (condition === 'sms') {
                is_call_or_sms.value = 'sms';
            } else {
                is_call_or_sms.value = 'call';
            }
            $('#modal_show_option_phone_number').modal('show');     // show option call
            helper.add_class_modal_open();                          // add class modal-open to body
        } else {
            alert('Phone number not exist');
        }
    }
    // --- mark as read ---
    function mark_as_read_notification(notification_id) {
        // set data as read in array notification
        set_data_as_read(notification_id);
        check_auth_user();
        // request mark as read
        $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + notification_id,{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": auth.value.tokens.access_token },
            method: 'PUT',
            params: { lang: language.value },
            body: new URLSearchParams({ action: 'mark_as_read' })
        }).then(res => {
            return res;

        }).catch(error => {
            if (!error.response) {
                if (reload_q_again_2.value < 2) {
                    reload_q_again_2.value += 1;
                    setTimeout( () => { mark_as_read_notification(notification_id); }, 3000);
                }
            } else if (error.response) {
                if (error.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout( () => { mark_as_read_notification(notification_id); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }

    function delete_all_notification() {
        // request mark as read
        $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + 'delete_all',{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": auth.value.tokens.access_token },
            method: 'DELETE',
            params: { lang: language.value },
        }).then(res => {
            noti_notifications.value = [];
            isInitial.value = true;   
            manually_get_notification();
            return res;
        }).catch(error => {
            if (!error.response) {
                if (reload_q_again_2.value < 2) {
                    reload_q_again_2.value += 1;
                    setTimeout( () => { delete_all_notification(); }, 3000);
                }
            } else if (error.response) {
                if (error.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout( () => { delete_all_notification(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }

    function set_data_as_read(not_id) {
        for (const inx in noti_notifications.value) {
            if (parseInt(noti_notifications.value[inx].notid) === parseInt(not_id)) {
                noti_notifications.value[inx].is_open = true; // set to read
            }
        }
    }
    // --- /mark as read ---

    // --- clear auto request ---
    function clear_auto_request() { clearInterval(timer_auto_not_list.value); timer_auto_not_list.value = ''; }
    // --- show options ---
    function show_option() { $('#modal_action_chat').modal('show'); }
    // --- mark all as read ---
    function mark_all_as_read() {
        check_auth_user();
        $('#modal_action_chat').modal('hide');
        $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + 'mark_all_read',{
            headers: { "Access-Token": auth.value.tokens.access_token },
            method: 'PUT',
            params: { lang: language.value },
            body: new URLSearchParams({ action: 'mark_as_read' })
        }).then(res => {
            for (let i = 0; i < noti_notifications.value.length; i++) {
                noti_notifications.value[i].is_open = true; // change all list to has bean read.
            }
            function_toast(res.message ? res.message : 'Something went wrong !!!', true); // show toast

        }).catch(e => { console.log(e); });
    }
    // --- show message on toast ---
    function function_toast(message, check_e_or_s) {
        message_success.value = message;
        error_or_success_message.value = check_e_or_s ? true : false;
        let toast = $('.toast');
        toast.removeClass('d-none');
        toast.toast({delay: 6000});
        toast.toast('show');
    }

    // --- convert date ---
    function convertFromNow(date) { return helper.check_date_ago_with_year(date); }
    // --- accept or reject ---
    function do_action_ntf(noti_id, userid, store_id, condition) {
        check_auth_user();
        let data_body = { "userid": userid, "action": condition };
        $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + noti_id,{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": auth.value.tokens.access_token },
            method: 'PUT',
            params: { lang: language.value },
            body: new URLSearchParams(data_body)

        }).then(res => {
            is_clean.value = true; // not allow to add data.
            $.each(noti_notifications.value, (k, v) => {
                if (parseInt(v.notid) === parseInt(noti_id)) {
                    noti_notifications.value.splice(k, 1); // remove index.
                    return false;
                }
            });

            // --- status accept go to store ---
            if (condition === 'accept') {
                // setTimeout for remove notification from list then go to next page.
                setTimeout(() => { router.push(localePath({name: 'account-store-id', params: { id: store_id, }})); }, 150);

            // --- status reject clear interval and create interval again ---
            } else {
                // timer_auto_not_list.value = setInterval(() => { auto_get_noti_list(); }, 10000); // delay 10 second.
            }

        }).catch(e => { // console.log(error);
            if (e.response) {
                if (reload_q_again_4.value < 2) {
                    reload_q_again_4.value += 1;
                    setTimeout( () => { do_action_ntf(noti_id, userid, store_id, condition); }, 3000);
                }
            } else if (e.response) {
                if (e.response.status === 401) { // retry
                    if (reload_q_again_4.value <= 2) {
                        reload_q_again_4.value += 1;
                        setTimeout( () => { do_action_ntf(noti_id, userid, store_id, condition); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }
    // ---- tracking multiple ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }


    const loadindScreen = useState('loadindScreen',()=>'')
    loadindScreen.value = true
    const data_detail_job = ref('')
    const GetAll = useState('GetAll',()=>'')
    function get_Detail(){
      check_auth_user();
      useFetch(config.VUE_APP_API_URL_ME+'job_applications/'+notis_id.value+'?lang=en&fields=post[location],application[location]',{
        headers: { "Access-Token": auth.value.tokens.access_token }
      })
      .then(res=>{
          loadindScreen.value = false
          const result = res.data
          data_detail_job.value = result.value.data
          GetAll.value = result.value.data.application
          get_data_id.value = result.value.data
      }).catch(er=>{
          loadindScreen.value = false
          console.log(er)
      })
    }

    function clearData(){
        GetAll.value = ''
    }
    function clicPhone(){
      ShowPhone.value = true
    }
    function clicClose(){
      ShowPhone.value = false
    }
    const loading_field = useState('loading_field')
    loading_field.value = false
    function click_chat() {
      let data = GetAll.value;
      let user_id = data ? data.userid : '';
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL + 'profiles/user/' + user_id, {
        params: { fields: 'username' }
      }).then(res => {
        $('#show_modal_detail').modal('hide')
        save_track_optional('clear_old_data', { clear_old_data: 'clear' });
        // router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));

        if (isMobile.value) {
            router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
        } else {
            router.push(localePath({ name: 'chats', query: {to_id: user_id, username: res.data.username} }));
        }

      }).catch(error => {
        if (!error.response) {
          if (reload_q_again_4.value < 2) {
            reload_q_again_4.value += 1;
            setTimeout( () => { click_chat(); }, 3000);
          }
        } else if (error.response) {
          if (error.response.status === 401) { // retry
            if (reload_q_again_4.value <= 2) {
              reload_q_again_4.value += 1;
              setTimeout( () => { click_chat(); }, 3000);
            }
          }
        }
        loading_field.value = false;
      });
    }


</script>
