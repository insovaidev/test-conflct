
<template>
    <div :class="isDesktop ? 'des_container dt_detail_chat' : ''">
        <!-- App Bar -->
        <div class="col no_padding" :class="isMobile ? 'fix_app_bar' : 'dt_fix_app_bar z-3'">
            <div v-if="isMobile" class="_div_nav bg_app_bar_header_" :class="isDesktop ? 'dt_d_chat_header' : ''">
                <div @click="goBack" v-if="!isDesktop" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <NuxtLink v-if="d_c_detail_post" class="style_flex" :to="localePath({ name: 'username', params: { username: d_c_detail_post.store ? d_c_detail_post.store.username : (d_c_detail_post.user ? d_c_detail_post.user.username : '') } })">
                    <div class="incoming_msg_img mar_incoming_profile cur_sur" @click="show_contact_page">
                        <img :src="d_c_detail_post.store && d_c_detail_post.store.logo && d_c_detail_post.store.logo.small ? d_c_detail_post.store.logo.small.url : (d_c_detail_post.user && d_c_detail_post.user.photo && d_c_detail_post.user.photo.medium ? d_c_detail_post.user.photo.medium.url : empty_img_user)"
                             :alt="d_c_detail_post.store && d_c_detail_post.store.title ? d_c_detail_post.store.title : (d_c_detail_post.user && d_c_detail_post.user.name ? d_c_detail_post.user.name : '')" class="bg_reload_img_white" @error="imageUrlAlt_profile">
                    </div>
                    <div class="col p-1 ml-1 cur_sur">
                        <div class="cl_ripple com_l_height">
                            <h1 class="truncate_wrap de_user_name" :class="d_c_detail_post.store ? 'com-store-title' : ''">
                                {{ d_c_detail_post.store && d_c_detail_post.store.title ? d_c_detail_post.store.title : (d_c_detail_post.user && d_c_detail_post.user.name ? d_c_detail_post.user.name : '') }}
                                <i class="ion-ios-arrow-forward com-icon"></i>
                            </h1>
                            <p v-if="!d_c_detail_post.store" class="truncate_wrap de_user_date">Online Now</p>
                        </div>
                    </div>
                </NuxtLink>
                <p v-else class="com-empty-text">
                    {{ $t('new_text_3.comment') }}
                </p>
            </div>

            <!-- info post ads -->
            <div v-if="d_c_detail_post" class="com-bt max_width_form top-p" :class="isMobile ? '' : 'dt-mt-50'">
                <NuxtLink v-if="!isDesktop" class="style_flex"
                          :to="localePath({ name: 'title-adid-id', params: { title: d_c_detail_post.title ? check_title_char(d_c_detail_post.title) : '.', id: d_c_detail_post.id } })">
                    <div class="col-11 de-pad-col-content">
                        <div class="_flex_">
                            <div class="thumb_profile_detail position_relative">
                                <img :src="d_c_detail_post.thumbnail ? d_c_detail_post.thumbnail : empty_img_post"
                                     :alt="d_c_detail_post.title ? d_c_detail_post.title : '.....'" class="logo_profile bg_reload_img de-radius-img-post" @error="imageUrlAlt_post">
                            </div>
                            <div class="de-parent-content-post">
                                <p class="truncate de-fix-title-post">{{ d_c_detail_post.title ? d_c_detail_post.title : '.....' }}</p>
                                <!-- price with discount -->
                                <p class="truncate_wrap com-price-post">
                                    <strong>{{ d_c_detail_post.price ? '$'+d_c_detail_post.price : '' }}</strong>
                                    <template v-if="d_c_detail_post.discount">
                                        <span v-if="d_c_detail_post.discount.original_price" class="c-p-p-dis-price"> ${{ d_c_detail_post.discount.original_price }}</span>
                                        <span v-if="d_c_detail_post.discount.amount_saved" class="c-p-p-dis-off">${{ d_c_detail_post.discount.amount_saved }} OFF</span>
                                    </template>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-1 de_mar_arrow_pro text-right">
                        <i class="ion-ios-arrow-forward text_grey"></i>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <!-- / App Bar -->

        <div class="com-con-list max_width_form" :class="isMobile ? '' : 'pt_0'">
            <div v-if="is_post_has_been_delete" class="no_more_result com-pad-empty">
                <i class="fas fa-exclamation-circle"></i>
                <p class="c-p-em-title">{{ $t('new_text_3.comment') }}</p>
                <p class="c-p-em-text">{{ $t('new_text_3.b_t_com_post_remove') }}</p>
            </div>
            <template v-else>
                <div v-if="status_removed_post" class="com-remove-status">
                    <i class="fas fa-exclamation-circle u_no_result_font"></i>
                    <p class="com-re-text">{{ $t('new_text_3.com_status_remove') }}</p>
                    <button @click="refresh_auto()" class="btn btn-sm bg_btn" type="button">{{ $t('new_text_3.reload') }}</button>
                    <br><br><br>
                </div>
                <template v-else>
                    <div v-if="data_result.length >= 10" class="mb-3 btn " @click="conversation_by_topic('previous')" id="pre" 
                        style="padding-left: 0px;cursor: pointer;color: #006da1 !important;width: 100%;text-align: justify;">  
                        {{ locale === 'km' ? 'មើលមតិពីមុន' : 'View previous comment' }}
                        <span v-if="c_loading" style="font-size: 14px;margin-left: 10px;color: rgb(171, 171, 171);"><i class="fa fa-spinner fa-spin me-2" ></i></span>
                    </div>
                    <template v-if="comments && comments.length > 0">
                        <div v-for="( cmd, index ) in comments" :key="index" class="_flex_">
                            <div class="de-pro-comment">
                                <img :src="cmd.profile && cmd.profile.data && cmd.profile.data.photo ? cmd.profile.data.photo : empty_img_user" alt="" @error="imageUrlAlt_profile">
                                <div class="par_online_com" v-if="cmd.profile && cmd.profile.data && ((user_data.user && user_data.user.id === cmd.profile.data.id) || (cmd.profile.data.online_status && cmd.profile.data.online_status.is_active))"></div>
                            </div>
                            <div class="de-text-com">
                                <div class="text-con-com style_flex">
                                    <div>
                                        <p class="de-text-name">{{ cmd.profile && cmd.profile.data ? cmd.profile.data.name : '' }}</p>
                                        <!-- <p class="de-text-des">{{ cmd.comment }}</p> -->
                                        <p class="de-text-des" v-html="check_description(cmd.comment)"></p>
                                    </div>
                                    <div v-if="!cmd.tmp_id" class="com-opt-act" @click="options_comment({data:cmd, id:cmd.id, type:'parent', ms_com:cmd.comment})">
                                        <i class="icon-ellipsis-vertical"></i>
                                    </div>
                                </div>
                                <p class="de-com-time">
                                    <span v-if="cmd.tmp_id" class="time_date_comment">Posting....</span>
                                    <template v-else>
                                        <span class="time_date_comment">{{ cmd.date ? convertFromNow(cmd.date) : '' }}</span>
                                        <span class="de-reply-com cur_sur" @click="click_reply_com(cmd.id, cmd.profile)">{{ $t('new_text_3.reply') }}</span>
                                    </template>
                                </p>
                                <!-- view more comment -->
                                <template v-if="!route.query.show_spe_com" >
                                    <p v-if="cmd.total_reply > 1 && !cmd.hide_view_more" class="com-view-more-reply cur_sur" @click="view_specific_comment(cmd)">
                                        {{ $t('new_text_3.view_previous_reply') }} ({{ cmd.total_reply-1 }})
                                    </p>
                                </template>
                                <!-- reply comments -->
                                <template v-if="cmd.last_replies && cmd.last_replies.length > 0">
                                    <div v-for="(reply , inx) in cmd.last_replies" :key="inx" class="" style="padding: 0px 0px 0px 12px;" id="list">
                                        <div class="subject _flex_" :data-subject="reply.id" >
                                            <div class="de-pro-sub-com ">
                                                <img :src="reply.profile && reply.profile.data && reply.profile.data.photo ? reply.profile.data.photo : empty_img_user" alt="" @error="imageUrlAlt_profile">
                                                <div class="sub_online_com" v-if="reply.profile && reply.profile.data && ((user_data.user && user_data.user.id === reply.profile.data.id) || (reply.profile.data.online_status && reply.profile.data.online_status.is_active))"></div>
                                            </div>
                                            <div class="de-text-com">
                                                <div class="text-con-com style_flex">
                                                    <div>
                                                        <p class="de-text-name">{{ reply.profile && reply.profile.data && reply.profile.data.name ? reply.profile.data.name : '' }}</p>
                                                        <p  class="de-text-des" v-html="check_description(reply.comment)"></p>
                                                    </div>
                                                    <div v-if="!reply.tmp_id" class="com-opt-act" @click="options_comment({data:reply, id:reply.id, type:'sub', ms_com:reply.comment})">
                                                        <i class="icon-ellipsis-vertical"></i>
                                                    </div>
                                                </div>
                                                <p class="de-com-time">
                                                    <span v-if="reply.tmp_id" class="time_date_comment">Posting....</span>
                                                    <template v-else>
                                                        <span class="time_date_comment">{{ reply.date ? convertFromNow(reply.date) : '' }}</span>
                                                        <span class="de-reply-com cur_sur" @click="click_reply_com(cmd.id, reply.profile)">{{ $t('new_text_3.reply') }}</span>
                                                    </template>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>

                    <template v-if="load_cmm">
                        <div class="text-center pt-5">
                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="de_loading_width">
                        </div>
                    </template>
                    <template v-if="data_result && data_result.length === 0">
                        <div class="no_more_result com-pad-empty">
                            <i class="icon-chat"></i>
                            <p class="c-p-em-title">{{ $t('new_text_3.no_comment_yet') }}</p>
                            <p class="c-p-em-text">{{ $t("new_text_3.be_the_first_to_comment") }}</p>
                        </div>
                    </template>

                    <!-- <ClientOnly>
                        <VueEternalLoading :load="conversation_by_topic" margin="800px">
                            <template #loading>
                                <div class="text-center">
                                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="de_loading_width">
                                </div>
                            </template>
                            <template #error="{ retry }">
                                <div class="col no_padding">
                                    <div class="no_more_result p-2">
                                        <div class="p_bg_status">
                                            <span class="fas fa-wifi size_icon_status"></span>
                                            <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                            <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                            <button @click="retry(), refresh_auto()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #no-more>
                                <div class="no_more_result"></div>
                            </template>
                            <template #no-results>
                                <div class="no_more_result com-pad-empty">
                                    <i class="icon-chat"></i>
                                    <p class="c-p-em-title">{{ $t('new_text_3.no_comment_yet') }}</p>
                                    <p class="c-p-em-text">{{ $t("new_text_3.be_the_first_to_comment") }}</p>
                                </div>
                            </template>
                        </VueEternalLoading>
                    </ClientOnly> -->
                    <br><br><br><br>
                </template>
            </template>
            
        </div>
        <template v-if="!is_post_has_been_delete">
                <div v-if="!isMobile">
                    <div v-if="!status_removed_post" class="dt-con-sent-com max_width_form">
                        <div v-if="route.query.store_id" class="con-icon-store" @click="show_user_options">
                            <div class="incoming_msg_img cur_sur">
                                <template v-for="(val, inx) in multi_pro">
                                    <template v-if="(route.query.select_pro && val.id === route.query.select_pro) || (!route.query.select_pro && val.id === route.query.store_id)">
                                        <img :src="val.img ? val.img : empty_img_user" :alt="val.name ? val.name : ''"
                                            @error="imageUrlAlt_profile" class="bg_reload_img_white">
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div class="col de_pad_input_sent">

                            <span v-if="reply_name" class="com-reply-to">
                                {{ $t('new_text_3.reply_to') }}
                                <b>{{ reply_name }}</b>
                                <i @click="remove_reply()" class="icon-clear text_grey cur_sur"></i>
                            </span>

                            <input type="text" autocomplete="off" maxlength="255" id="_message_" v-model="text_comment"
                                :placeholder="$t('new_text_3.chat_message')" class="form-control de_field_message">
                        </div>
                        <div class="cur_sur com-btn-sent" @click="create_comment()">
                            <span class="ion-android-send"></span>
                        </div>
                    </div>
                </div>
            </template>

        <!-- input reply comments -->
        <template v-if="!is_post_has_been_delete">
            <div v-if="isMobile">
                <div v-if="!status_removed_post" class="con-sent-com">
                    <div v-if="route.query.store_id" class="con-icon-store" @click="show_user_options">
                        <div class="incoming_msg_img cur_sur">
                            <template v-for="(val, inx) in multi_pro">
                                <template v-if="(route.query.select_pro && val.id === route.query.select_pro) || (!route.query.select_pro && val.id === route.query.store_id)">
                                    <img :src="val.img ? val.img : empty_img_user" :alt="val.name ? val.name : ''"
                                        @error="imageUrlAlt_profile" class="bg_reload_img_white">
                                </template>
                            </template>
                        </div>
                    </div>
                    <div class="col de_pad_input_sent">

                        <span v-if="reply_name" class="com-reply-to">
                            {{ $t('new_text_3.reply_to') }}
                            <b>{{ reply_name }}</b>
                            <i @click="remove_reply()" class="icon-clear text_grey cur_sur"></i>
                        </span>

                        <input type="text" autocomplete="off" maxlength="255" id="_message_" v-model="text_comment"
                            :placeholder="$t('new_text_3.chat_message')" class="form-control de_field_message">
                    </div>
                    <div class="cur_sur com-btn-sent" @click="create_comment()">
                        <span class="ion-android-send"></span>
                    </div>
                </div>
            </div>
        </template>

        <!-- loading full screen -->
        <div v-if="loading_field" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="de_loading_width loading_bg">
            </div>
        </div>

        <!-- show success message -->
        <div class="toast style_toast d-none" style="z-index: 2000">
            <div class="toast-header header_padding_toast">
                <strong class="me-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ms-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
                </strong>
                <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>

        <!-- Modal show option delete chat -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_option_comment" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? ' animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 'modal_bottom_screen' : ''">
                        <div class="option_selected">
                            <div class="modal-body p-0">
                                <ul class="list-unstyled mobile_modal_actions_container">
                                    <!--<li class="color_reason cur_sur cl_ripple">
                                        <p class="full_field_a_tag m-0"> {{ $t('message.the_view') }} </p>
                                    </li>-->
                                    <!-- {{ com_options }} -->
                                    <li @click="copy_message()" class="color_reason cur_sur mobile_modal_action">
                                        <p class=" m-auto"> {{ $t('new_text_1.copy') }} </p>
                                        <div class="h-c-parent">
                                            <input id="clone_Message" v-on:focus="$event.target.select()" ref="cloneMessage" readonly
                                                   :value="com_options ? com_options.ms_com : ''" class="hide_copy_text"/>
                                        </div>
                                    </li>
                                    <li v-if="delete_" @click="confirm_delete" class="color_reason cur_sur mobile_modal_action">
                                        <p class=" m-auto text-danger" :class="isMobile ? 'bor_bot_unset' : ''"> {{ $t('message.delete') }} </p>
                                        <div class="h-c-parent"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="a_cancel_btn_modal_bg cur_sur">
                            <div class="mobile_modal_action a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                <p class="modal-title color_reason m-auto"><b>{{ $t('message.cancel') }}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal confirm delete -->
        <div class="modal class_modal_show_message" id="modal_confirm_delete_message" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text_2.delete_permanently') }} </div>
                    <div class="modal-footer u_safety_footer">
                        <button class="btn text_grey cl_ripple" data-bs-dismiss="modal" aria-label="Close"> {{ $t('message.close') }} </button>
                        <button @click="delete_message" class="btn parent_color cl_ripple"> {{ $t('new_text_1.confirm') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show option delete chat -->

        <!-- Modal show user options -->
        <div class="modal style_full_screen" id="show_modal_user_options" tabindex="-1" role="dialog"> <!-- fade -->
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content">
                    <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                        <!-- header -->
                        <div class="de-list-quick-chat">
                            <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                            <p class="modal-title font_16 width_100"> {{ $t('new_text_2.choose_creator') }} </p>
                            <button class="btn de-btn-plus font_15 me-2" aria-label="Disable" disabled></button>
                        </div>
                        <!-- content -->
                        <div class="modal-body de-content-modal-option">
                            <ul v-if="multi_pro && multi_pro.length > 0" class="list-unstyled bg-white mb-0">
                                <li v-for="(val, index) of multi_pro" @click="selected_user(val.id)" class="full_field_tag cur_sur">
                                    <div class="col p-0 position_relative">
                                        <div class="_flex_ post-ads-user-modal">
                                            <div class="u-or-s-img">
                                                <img :src="val.img ? val.img : empty_img_user" class="img_profile" alt="profile"
                                                     :class="val.type === 'user' ? 'bor_user_com' : ''" @error="imageUrlAlt_post">
                                            </div>
                                            <div class="u-or-s-con">
                                                <p class="truncate u-or-s-p1">{{ val.name ? val.name : '' }}</p>
                                                <p class="truncate u-or-s-p2">{{ val.username ? val.username : '' }}</p>
                                            </div>
                                        </div>
                                        <i v-if="val.is_selected" class="fas fa-check-circle l-com-check-icon"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");

    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();
    const { locale } = useI18n();

    // --- comments ---
    const text_comment = ref('');
    const comments = useState('comments', () => []);    // catch
    const offset_com = useState('offset_com', () => 0); // catch
    const user_data = ref('');
    const d_c_detail_post = useState('d_c_detail_post', () => '');
    const tmp_id = ref(1);            // create tmp_id for store data to specific index in sending chat.

    // --- reply comment ---
    const reply_id = ref('');         // id user click reply in list
    const reply_name = ref('');       // reply_name
    const com_options = ref({});

    // --- profile ---
    const store_info = ref([]);       // array store.
    const multi_pro = ref([]);        // array profile.
    const user_type = ref('user');    // store user type, "user" or "store" for close tap chats or show tap chats
    const status_removed_post = ref(false);         // loading post.
    const is_post_has_been_delete = ref(false);     // loading post.

    // --- toast message ---
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const loading_field = ref(false);

    // --- regex on phone ---
    const phone_providers = ref([]);
    const phone_prefix = ref([]);
    const phone_prefix_digit_10 = ref([]);
    const isMobile= ref(helper.m_or_d())

    // --- check auto chat ---
    const d_c_arr_check_id = useState('d_c_arr_check_id', () => []); // store for check user sent message and get id for check with auto request to make chat order (cache_arr_check_id).

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_3 = ref(0); const reload_q_again_4 = ref(0);
    const reload_q_again_5 = ref(0); const reload_q_again_6 = ref(0); const reload_q_again_7 = ref(0); const reload_q_again_8 = ref(0);
    const reload_q_again_9 = ref(0); const reload_q_again_10 = ref(0); const reload_q_again_11 = ref(0);

    // --- if refresh page in desktop view must redirect to page "chats" ---
    if (process.server && isDesktop) {
        let query = route.query;
        query['tap'] = 'comments';
        if (!query.com_id) query['sh_com'] = 'show'; // prevent go to detail comment at "chats" page not show html tag detail_comment.
        router.replace(localePath({ name: 'chats', query: query }));
    }

    // --- meta variable ---
    const meta_title_de_comment = useState('meta_title_de_comment', () => 'My Account - Khmer24.com');

    useHead({
        title: meta_title_de_comment.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_de_comment.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_de_comment.value },
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
            if (helper.check_auth_user() === false) { // check auth exist or not
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'detail_comment',
                    expire: expired,
                    data: {
                        post_id: route.query.post_id ? route.query.post_id : '',
                    },
                    from: { name: 'detail_post' }
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }else{
                check_auth_user();          // check auth user login
                clear_local_data();         // clear old data comments on list
                get_detail_post(route.query.post_id);  // get detail post
                conversation_by_topic();
                setTimeout(() => { scrollToBottom(); }, 1000);

                if (route.query.show_spe_com) { 
                    reply_id.value = route.query.show_spe_com;                    // store reply_id
                    create_comment();                       // start reply comment
                }
                
            }
            
        }
    })
    onBeforeUnmount(() => {
        helper.clear_params_make_con('dt_post'); // clear params detail post.
    })

    watch(() => route.query, () => {
        let r_name = helper.clear_prefix_route_name(route.name); // clean route name without prefix.
        if (r_name === 'chats-detail-comment') {
            create_arr_profile('reset');
        }
    })

    function scrollToBottom() {
      if(isMobile.value){
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        })
        setTimeout(()=>{
            document.getElementById('_message_').focus();
        }, 1010)
      }
    }
    // ---- click retry ----
    function refresh_auto() {
        // retry when connection error or timeout of request
        if (window.navigator.onLine) {
            helper.remove_class_modal_open();       // remove class modal-open
            check_auth_user();                      // check auth user login
            clear_local_data();                     // clear old data comments on list
            get_detail_post(route.query.post_id);   // get detail post
            status_removed_post.value = false;      // close status removed comment out child
        }
    }
    // ---- check user or store and mark ask read comment ----
    function additional_func() {
        check_user_have_store();    // check user have store or not.
        mark_com_as_read();         // mark as read comments
    }

    const data_result =ref('')
    const c_loading = ref(false)
    const load_cmm = ref(true)
    // ---- get conversation by topic id ----
    async function conversation_by_topic(type ) {
        check_auth_user();
        c_loading.value = true;
        let params = { lang: language.value, offset_comment_id: offset_com.value };
        let post_id = route.query.post_id ? route.query.post_id : '';
        if (post_id) {
            // --- click reply comment from detail_post only if exist "show_spe_com" in query url ---
            if (route.query.show_spe_com) { params['reply_id'] = route.query.show_spe_com; }

            $fetch(config.VUE_APP_API_URL_COMMENT + post_id, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: params,
            }).then(res => {
                c_loading.value = false;
                load_cmm.value = false;
                data_result.value = res.data;
                if (route.query.show_spe_com) {
                    if (res.data && res.data.id) { // check data is exist or not.
                        setTimeout(() => { SortData(); }, 10);
                        comments.value = [res.data];
                        // noMore();
                    } else {
                        // noResults(); // show empty comment in lists.
                        is_post_has_been_delete.value = true; // if get reply or click from notification empty.
                    }
                }else {
                    if(type !== 'previous'){
                        localStorage.setItem("storedDataA", JSON.stringify(res.data));
                        comments.value = res.data.reverse();
                        // window.scrollTo(0,document.body.scrollHeight);
                        // localStorage.setItem("storedDataA", JSON.stringify(res.data.reverse()));
                        if(comments.value.length < 10){
                            $("#pre").hide();
                        }else{
                            comments.value.forEach((val,index)=>{
                                if(index === 0){
                                    offset_com.value = val.id
                                }
                            })
                        }
                    }else{
                        localStorage.setItem("storedDataB", JSON.stringify(res.data));
                        let arr1 = JSON.parse(localStorage.getItem("storedDataA"));
                        let arr2 = JSON.parse(localStorage.getItem("storedDataB"));
                        arr1.push(...arr2)
                        localStorage.setItem("storedDataA", JSON.stringify(arr1));
                        const points =JSON.parse(localStorage.getItem("storedDataA"));
                        points.sort((firstItem, secondItem) => firstItem.id - secondItem.id);
                        comments.value = points;
                        // console.log(test);
                        if(comments.value.length < 10){
                            $("#pre").hide();
                        }else{
                            // localStorage.setItem("storedDataA", JSON.stringify(test));
                            comments.value.forEach((val,index)=>{
                                if(index === 0){
                                    offset_com.value = val.id
                                }
                            })
                        }
                    }
                }
                
                
                // -- tracking on google analytic --
                track_google_analytics();

            }).catch(e => {
                c_loading.value = false;
                load_cmm.value = false
                if (e.response) {
                    let check = e.response;
                    // let data_check = JSON.stringify(check);
                    // let d_parse = JSON.parse(data_check);
                    if (check.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_auth_user();
                            conversation_by_topic();
                            // setTimeout(() => { loaded(); }, 3000);
                        } else {    
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    } else if (check.status === 403) {
                        router.replace(localePath({name: 'index'}));
                    }
                }
                
            }); // stop the loading if cache error
        }
    }

    
    // ---- Regex phone number, email, link ----
    function phone_header() {
      let config = [];

      // -- cellcard, smart, metfone, qb --
      config = {
        'phone': {
          'cellcard': {
            '6-digits': ['011','012','014','017','061','077','078','079','085','089','092','095','099'],
            '7-digits': ['076']
          },
          'smart': {
            '6-digits': ['010', '015', '016', '069', '070', '081', '086', '087', '093','098'],
            '7-digits': ['096']
          },
          'metfone': {
            '6-digits': ['060','066','067','068','090'],
            '7-digits': ['031','071','088','097']
          },
          'qb': {
            '6-digits': ['013', '080', '083', '084']
          },
        },
      };

      // config.push({ 'cellcard_prefix': config[0].phone.cellcard['6-digits'].concat(config[0].phone.cellcard['7-digits']) });

      let all_prefix = [];
      let ph_prefix_digit_10 = [];
      let phones_by_provider = [];

      for (const key in config.phone) {
        let prifixs = [];

        for (var k in config.phone[key]) {
          prifixs = prifixs.concat(config.phone[key][k]);
          // console.log(prifixs);
          if (k === '7-digits') { ph_prefix_digit_10 = ph_prefix_digit_10.concat(config.phone[key][k]) }
        }

        all_prefix.concat(prifixs);
        phones_by_provider[key] = prifixs;
        // phones_by_provider.push({ [key]: prifixs });
        // console.log(phones_by_provider)
        // console.log(prifixs);
      }

      phone_providers.value = phones_by_provider;
      phone_prefix.value = all_prefix;
      phone_prefix_digit_10.value = ph_prefix_digit_10;
    }
    function get_new_phone_number(phone_num) {
      let phone_provided = phone_providers.value; // get all head phone number three digit

      let new_phone = []; // substr and substring are different
      let prefix = phone_num.substr(0, 3); // get kbal phone number 3 knong ta bong
      if(phone_num.length>10) {
        if(phone_num.substr(0, 4) === '+855') {
          prefix = '0'+phone_num.substr(4, 2); // remove 4 char and yor 2 chat tor
        }
        if(phone_num.substr(0, 3) === '855') {
          prefix = '0'+phone_num.substr(3, 2); // remove 3 char and yor 2 chat tor
        }
      }

      let provider = 'other';

      for (const p_key in phone_provided) {
        if (phone_provided[p_key].includes(prefix)) {
          provider = p_key;
          break;
        }
      }

      let p = '';
      if (phone_num) {
        p = phone_num.substr(0,3)+' '+phone_num.substr(3,3)+' '+phone_num.substr(6);
      }
      new_phone = {'provider': provider, 'number': phone_num, 'formate': p};
      return new_phone;
    }
    function store_regex() {
      let filters = [];

      filters.push('([0]{1}[0-9]{9})'); // 0123456789
      filters.push('([0-9]{3}[-. ][+][1-9]{12})'); // +855123456789

      filters.push('([0]{1}[0-9]{8})'); // 012345678
      filters.push('([+][1-9]{11})'); // +85512345678

      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{4})'); // 012 345 6789
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{4})'); // +85512 345 6789


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{3})'); // 012 345 678
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{3})'); // +85512 345 678


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{4})'); // 012 34 5678
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{4})'); // +85512 34 5678


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{4}[-. ]{1,2}[0-9]{2,3})'); // 012 3456 78
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{4}[-. ]{1,2}[0-9]{2,3})'); // +85512 3456 78


      filters.push('([0-9]{3}[-][0-9]{3}[-][0-9]{4})'); // 012-345-6789
      filters.push('([0-9]{3}[.][0-9]{3}[.][0-9]{4})'); // 012.345.6789
      filters.push('([+][1-9]{5}[-][0-9]{3}[-][0-9]{4})'); // +85512-345-6789
      filters.push('([+][1-9]{5}[.][0-9]{3}[.][0-9]{4})'); // +85512.345.6789


      filters.push('([0-9]{3}[-][0-9]{3}[-][0-9]{3})'); // 012-345-678
      filters.push('([0-9]{3}[.][0-9]{3}[.][0-9]{3})'); // 012-345-678
      filters.push('([+][1-9]{5}[-][0-9]{3}[-][0-9]{3})'); // +85512-345-678
      filters.push('([+][1-9]{5}[.][0-9]{3}[.][0-9]{3})'); // +85512-345-678


      filters.push('([0-9]{3}[-][0-9]{7})'); // 012-3456789
      filters.push('([+][1-9]{5}[-][0-9]{7})'); // +85512-3456789


      filters.push('([0-9]{3}[-][0-9]{6})'); // 012-345678
      filters.push('([+][1-9]{5}[-][0-9]{6})'); // +85512-345678


      filters.push('([0-9]{3}[ ]{1,2}[0-9]{7,8})'); // 012 3456789
      filters.push('([+][1-9]{5}[ ]{1,2}[0-9]{7,8})'); // +85512 3456789
      filters.push('([1-9]{5}[ ]{1,2}[0-9]{7,8})'); // 85512 3456789


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{6})'); // 012 345678
      filters.push('([0-9]{6}[-. ]{1,2}[0-9]{3})'); // 012345 678
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{6})'); // +85512 345678
      filters.push('([+][1-9]{3}[-. ]{1,2}[0-9]{9})'); // +855 123456789
      filters.push('([+][1-9]{3}[-. ]{1,2}[0-9]{8})'); // +855 12345678
      filters.push('([1-9]{5}[-. ]{1,2}[0-9]{6})'); // 85512 345678


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3})'); // 012 34 56 789
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3})'); // +85512 34 56 789


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2})'); // 012 34 567 89
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2})'); // +85512 34 567 89


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // 012 345 67 89
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // +85512 345 67 89


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // 012 34 56 78
      filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // +85512 34 56 78


      filters.push('([0-9]{3}[-. ]{1,2}[0-9]{1,6}[-. ]{1,2}[0-9]{1,6}[-. ]{1,2}[0-9]{1,6})'); // 012 34 56 78

      // email
      // filters.push('([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,6})');   // check true but if string next to .com it get all all string
      // filters.push('([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3}))');   // this regex get only email, but error on string have "w" a lot
      filters.push('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]{3})'); // this work for email and not error
      // filters.push('([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})'); // this regex get only email

      // link
      filters.push('(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})');

      return filters;
    }
    function check_description(text) {

      let message = text;
    //  console.log(message)
      phone_header(); // set up phone header first

      let filters = store_regex(); // function return regex

      let regexFromMyArray = new RegExp(filters.join("|"), 'gi'); // convert array to string regex
      // console.log(regexFromMyArray);

      const match_P_N = message.match(regexFromMyArray);
      // console.log(match_P_N);

      let check_email = [];  let check_link = [];  let check_phone_num = [];

      if (match_P_N) {
        // console.log(match_P_N);
        for (const match of match_P_N) {
          // console.log(match)
          // -- link --
          if (match.match(/http|https|ftp|ftps|www./) !== null) {

            if (!check_link.includes(match)) {  // check link has been created yet. (prevent replace an old one, if have duplicate value in message)
              check_link.push(match);         // push link that has been created.

              if (!match.match(/http|https|ftp|ftps/) && match.match(/www./)) { // if link but have only "www." with out http
                message = message.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="//' + match + '">' + match + '</a>');
              } else {
                message = message.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="' + match + '">' + match + '</a>');
              }

            }

          // -- email --
          } else if (match.match(/@/) !== null) {

            if (!check_email.includes(match)) {  // check email has been created yet. (prevent replace an old one, if have duplicate value in message)
              check_email.push(match);         // push email that has been created.

              message = message.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="mailto:' + match + '">' + match + '</a>');
            }

          // -- phone number --
          } else {
            if (!check_phone_num.includes(match)) {  // check phone number has been created yet. (prevent replace an old one, if have duplicate value in message)
              check_phone_num.push(match);         // push phone number that has been created.

              let clean_p_n = match.replace(/[-. ]/g, ""); // clean spacial char...
              // -- now check and clear phone to the true format --

              message = message.replaceAll(match, '<a rel="nofollow" class="d_phone_num_link_in_des" href="tel:' + clean_p_n + '">' + clean_p_n + '</a>');
            //   let phone_data = get_new_phone_number(clean_p_n);
            //   message = message.replaceAll(match, '<a rel="nofollow" class="d_phone_num_link_in_des" href="tel:' + phone_data.number + '">' + phone_data.number + '</a>');
            }
          }
        }

        // console.log(message);
        return message;

      } else {

        // console.log(message);
        return message;
      }
    }

    // --- create data comment ---
    function create_comment() {
        if (text_comment.value) {
            let r = route.query;
            let u = user_data.value && user_data.value.user ? user_data.value.user : '';
            tmp_id.value++;
            let tmp_com = { // create tmp comment sent to list
                tmp_id: tmp_id.value,
                actions: ['delete'],
                comment: text_comment.value,
                date: "",
                id: tmp_id.value,
                last_replies: [],
                profile: {
                    type: 'user',
                    data: {
                        id: u ? u.id : '',
                        name: u && u.name ? u.name : '',
                        online_status: { is_active: true, last_active: '', time: '', date: '' },
                        photo: u && u.photo && u.photo.small ? u.photo.small.url : '',
                        username: u && u.username ? u.username : '',
                    }
                },
                status: "comment",
                total_reply: "1",
                type: "text",
            }

            // comment on reply (data loading);
            if (reply_id.value) {
                let com = comments.value;
                for (let i = 0; i < com.length; i++) {
                    if (com[i].id === reply_id.value) {                    // is parent must to check sub comment.
                        if (com[i].last_replies && com[i].last_replies.length > 0) {
                            comments.value[i].last_replies.push(tmp_com);           // push to child.
                        } else {
                            comments.value[i]['last_replies'] = [];
                            comments.value[i]['last_replies'].push(tmp_com);
                        }
                    }
                }
            // new comment (data loading)
            } else {
                comments.value.push(tmp_com); // push loading text to list comment
            }
            // console.log(comments.value);

            let com_data = '';
            if (reply_id.value) {       // click reply from comment list.
                com_data = { txt_com: text_comment.value, id_tmp: tmp_id.value }
                sent_comment('reply_com', r.post_id, com_data);
            } else {                    // click comment in bottom nav bar.
                com_data = { txt_com: text_comment.value, id_tmp: tmp_id.value }
                sent_comment('sent_com', r.post_id, com_data);
            }

        } else {
            if(isMobile.value){
                document.getElementById('_message_').focus();
            }
            
        }
    }

    // --- sent comment ---
    function sent_comment(type, p_id, data_com) {
        // -> is store
        let r_q = route.query;
        let store_id = '';
        if (user_type.value === 'store') {
            store_id = r_q.store_id ? r_q.store_id : '';
        }

        // -> url and data body
        let url = ''; let method = ''; let body = '';
        if (type === 'sent_com' || type === 'reply_com') {
            if (store_id) { // post or reply store comment
                url = config.VUE_APP_API_URL_COMMENT + 'stores/' + store_id;
            } else {        // post or reply user comment
                url = config.VUE_APP_API_URL_COMMENT + 'me';
            }
            method = 'POST';
            if (type === 'sent_com') body = { id: p_id, comment: data_com.txt_com }
            if (type === 'reply_com') body = { reply_id: reply_id.value, comment: data_com.txt_com }
        }

        // -> start request
        $fetch(url, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value },
            method: method,
            body: new URLSearchParams(body),
        }).then(res => {
            // -> loop replace on comment loading
            if (reply_id.value) {
                let com = comments.value;
                for (let i = 0; i < com.length; i++) {
                    if (com[i].id === reply_id.value) {                    // is parent must to check sub comment.
                        if (com[i].last_replies && com[i].last_replies.length > 0) {
                            for (let j = 0; j < com[i].last_replies.length; j++) {
                                if (com[i].last_replies[j].tmp_id && com[i].last_replies[j].tmp_id === data_com.id_tmp) {
                                    com[i].last_replies[j] = res.data;
                                }
                            }
                        } else {
                            comments.value[i]['last_replies'] = [];
                            comments.value[i]['last_replies'].push(res.data);
                        }
                    }
                }
                
            // -> new comment
            } else {
                for (let i = 0; i < comments.value.length; i++) {
                    if (comments.value[i].tmp_id && comments.value[i].tmp_id === data_com.id_tmp) {
                        comments.value[i] = res.data;
                    }
                    
                }
            }
            // -> clear input comment
            text_comment.value = '';
            // -> clear reply if exist data
            remove_reply();

        }).catch(e => {
            if (e.response) {
                let check = e.response;
                // let data_check = JSON.stringify(check);
                // let d_parse = JSON.parse(data_check);
                if (check.status === 401) { // retry
                    if (reload_q_again_4.value <= 2) {
                        reload_q_again_4.value += 1;
                        check_auth_user();
                        setTimeout(() => { sent_comment(type, p_id, data_com); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                } else if (check.status === 403) {
                    router.replace(localePath({name: 'index'}));
                }
            }
        });
    }
    // --- click reply comment ---
    function click_reply_com(id, profile) {
        reply_name.value = profile.data && user_data.value && user_data.value.user.id === profile.data.id ? (language.value === 'km' ? 'ខ្លួនឯង' : 'Yourseft') : (profile.data.name ? profile.data.name : '');
        reply_id.value = id;                    // store reply_id
        create_comment();                       // start reply comment
    }
    // --- click remove comment ---
    function remove_reply() {
        reply_name.value = '';
        reply_id.value = '';
    }
    // --- view more specific comment ---
    function view_specific_comment(one_comment) {
        let the_id_post = route.query.post_id ? route.query.post_id : ''; // id of post
        let parent_com_id = one_comment && one_comment.id ? one_comment.id : ''; // id of parent comment

        $fetch(config.VUE_APP_API_URL_COMMENT + the_id_post, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value, reply_id: parent_com_id }
        }).then(res => {
            let r = res && res.data && res.data.last_replies ? res.data.last_replies : [];
            let revers = r.reverse();
            one_comment['hide_view_more'] = true;
            one_comment['last_replies'] = revers;

            for (let i = 0; i < comments.value.length; i++) {
                if (comments.value[i].id === parent_com_id) {
                    comments.value[i] = one_comment;
                }
            }

        }).catch(e => {
            if (e.response) {
                let check = e.response;
                // let data_check = JSON.stringify(check);
                // let d_parse = JSON.parse(data_check);
                if (check.status === 401) { // retry
                    if (reload_q_again_5.value <= 2) {
                        reload_q_again_5.value += 1;
                        check_auth_user();
                        setTimeout(() => { view_specific_comment(one_comment); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                } else if (check.status === 403) {
                    router.replace(localePath({name: 'index'}));
                }
            }
        });
    }
    // --- click options comment ---
    const delete_ = ref(false);
    function options_comment(com_detail) {
        delete_.value = false
        com_options.value = com_detail;
        com_options.value.data.actions.forEach(val=>{
            if(val == "delete"){
                delete_.value = true
            }
        })
        $('#modal_option_comment').modal('show');
    }
    // ---- confirm delete message in comment ----
    function confirm_delete() { $('#modal_option_comment').modal('hide'); $('#modal_confirm_delete_message').modal('show'); }
    // ---- delete message from comment ----
    function delete_message() {
        let r_q = route.query;
        let url = '';
        let store_id = '';
        if (user_type.value === 'store') {
            store_id = r_q.store_id ? r_q.store_id : '';
        }

        if (store_id) { // post or reply store comment
            url = config.VUE_APP_API_URL_COMMENT + 'stores/' + store_id + '/' + com_options.value.id;
        } else {        // post or reply user comment
            url = config.VUE_APP_API_URL_COMMENT + 'me/' + com_options.value.id;
        }

        let c_o = com_options.value ? com_options.value : '';
        if (c_o) {
            // console.log(c_o)
            loading_field.value = true;
            $fetch(url, {
                lang: language.value,
                headers: {"Access-Token": user_data.value.tokens.access_token},
                method: 'DELETE',
            }).then(res => {
                loading_field.value = false;                             // close loading
                $('#modal_confirm_delete_message').modal('hide');       // hide modal confirm delete.
                function_toast(res.message, true); // show message status success
                // remove specific comment from list
                $.each(comments.value, (key, val) => {
                    // console.log(key)
                    // console.log('id===', val)
                    let p_id = val && val.last_replies ? val.last_replies : null
                    let tmp_id = null
                    $.each(p_id, (k, v) => {
                        if(parseInt(v.id) === parseInt(c_o.data.id)){
                            tmp_id = v.id
                            return false;
                        }
                    });
                    if (parseInt(val.id) === parseInt(c_o.data.id) || parseInt(tmp_id) === parseInt(c_o.data.id)) { // if parent the same id.
                        if (c_o.type === 'parent') { // delete parent
                            comments.value.splice(key, 1);  // remove comment parent form list.
                            
                        } else { // delete sub
                            $.each(val.last_replies, (k, v) => {
                                if (parseInt(v.id) === parseInt(c_o.id)) {
                                    comments.value[key].last_replies.splice(k, 1); // remove comment sub from list.
                                    return false;
                                }
                            });
                        }
                        return false;
                    }
                });

            }).catch(e => {
                if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_6.value <= 2) {
                        reload_q_again_6.value += 1;
                        check_auth_user();
                        setTimeout(() => { delete_message(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                } else {
                    // -- show toast --
                    let check = e.response; // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);

                    function_toast(data_parse._data.message, false);
                }

                loading_field.value = false; // close loading
                $('#modal_confirm_delete_message').modal('hide');       // hide modal confirm delete.
            });
        }
    }
    // ---- copy text message ----
    function copy_message() {
        document.getElementById('clone_Message').focus();
        // this.$refs.cloneMessage.focus();
        document.execCommand('copy');
        document.getElementById('clone_Message').blur();

        function_toast('Message copied to clipboard', true)

        $('#modal_option_comment').modal('hide'); // close modal options.
    }


    // ---- show modal select user options ----
    function show_user_options() { $('#show_modal_user_options').modal('show'); } // show modal user options.
    // ---- check user have store or not ----
    function check_user_have_store() {
        $fetch(config.VUE_APP_API_URL + 'me/stores', {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value, fields: 'my_setting' },
        }).then(get_store => {
            store_info.value = get_store && get_store.data.length > 0 ? get_store.data : [];
            create_arr_profile('reset');

        }).catch(e => {
            if (e.response && e.response.status === 401) { // retry
                if (reload_q_again_10.value <= 2) {
                    reload_q_again_10.value += 1;
                    setTimeout(() => { check_user_have_store(); }, 3000);
                }
            }
        });
    }
    // ---- create array profile ----
    function create_arr_profile(reset_array) {
        if (reset_array) { multi_pro.value = []; } // clear array pro
        // add array pro
        let rq = route.query;
        let profile_id = rq.select_pro ? rq.select_pro : (rq.store_id ? rq.store_id : '');
        let u_d = user_data.value && user_data.value.user ? user_data.value.user : '';
        multi_pro.value.push({
            id: u_d && u_d.id ? u_d.id : '',
            img: u_d && u_d.photo && u_d.photo.small ? u_d.photo.small.url : '',
            name: u_d && u_d.name ? u_d.name : '',
            username: u_d && u_d.username ? u_d.username : '',
            type: 'user',
            is_selected: profile_id === u_d.id ? true : false,
        });
        if (store_info.value.length > 0) {
            for (const index in store_info.value) {
                let val = store_info.value[index];
                multi_pro.value.push({
                    id: val.id,
                    img: val.logo && val.logo.small ? val.logo.small.url : '',
                    name: val.title ? val.title : '',
                    username: val.username ? val.username : '',
                    type: 'store',
                    is_selected: profile_id === val.id ? true : false,
                })
            }
        }
        check_select_pro(); // check select_pro is user or store
    }
    // ---- check selected user ----
    function selected_user(id) {

        $.each(multi_pro.value, (k, v) => {
            if (v.id === id) {
                multi_pro.value[k].is_selected = true;
                user_type.value = v.type; // store type for check store or user
            } else {
                multi_pro.value[k].is_selected = false;
            }
        });

        let r_q = route.query;
        let query = { select_pro: id };
        if (r_q.post_id) { query['post_id'] = r_q.post_id; }
        if (r_q.com_id) { query['com_id'] = r_q.com_id; }
        if (r_q.store_id) { query['store_id'] = r_q.store_id; }
        setTimeout(() => { // prevent change tap then refresh.
            router.replace(localePath({ name: 'chats-detail-comment', query: query }));
        }, 200);

        // --- close modal and store img, name, username to show in UI below app bar ---
        $('#show_modal_user_options').modal('hide');
    }
    // ---- check query select_pro is "user" or "store" ----
    function check_select_pro() {
        if (route.query.select_pro) {
            for (const index in multi_pro.value) {
                let val = multi_pro.value[index];
                if (val.id === route.query.select_pro) {
                    user_type.value = val.type;
                }
            }
        } else if (route.query.store_id) {
            user_type.value = 'store';
        } else {
            user_type.value = 'user';
        }
        // console.log(multi_pro.value);
        // console.log(user_type.value);
    }


    // --- clean title text ---
    function check_title_char(title) { return helper.check_special_char(title); }
    // --- clear all data cache ---
    function clear_local_data() {
        comments.value = [];
        offset_com.value = 0;
        d_c_detail_post.value = '';
    }
    // --- mark as read comments ---
    function mark_com_as_read() {
        let com_id = route.query.com_id ? route.query.com_id : '';
        let r_q = route.query;
        let url = '';
        let store_id = '';
        if (r_q.store_id) {
            store_id = r_q.store_id ? r_q.store_id : '';
        }

        if (store_id) { // mark ask read Store
            url = config.VUE_APP_API_URL_COMMENT + 'stores/' + store_id + '/' + com_id;
        } else {        // mark as read User
            url = config.VUE_APP_API_URL_COMMENT + 'me/' + com_id;
        }
        if (com_id) {
            $fetch(url, {
                headers: {"Access-Token": user_data.value.tokens.access_token},
                params: {lang: language.value},
                method: 'PUT',
                body: new URLSearchParams({ action: 'mark_com_as_read' })
            }).then(res => {
                // console.log(res)
            }).catch(e => {
                if (e.response) {
                    let check = e.response;
                    // let data_check = JSON.stringify(check);
                    // let d_parse = JSON.parse(data_check);
                    if (check.status === 401) { // retry
                        if (reload_q_again_3.value <= 2) {
                            reload_q_again_3.value += 1;
                            check_auth_user();
                            setTimeout(() => { mark_com_as_read(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    } else if (check.status === 403) {
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }
    // --- get detail one post ---
    function get_detail_post(ads_id) {
        $fetch(config.VUE_APP_URL_POST_NEW + 'feed/' + ads_id, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: {
                fields: 'thumbnail,user,store',
                functions: 'shipping',
                lang: language.value
            }
        }).then(res => {
            d_c_detail_post.value = res.data;
            status_removed_post.value = false; // close removed post status.
            additional_func(); // execute "mark_com_as_read" and "check_user_or_store".

        }).catch(e => {
            status_removed_post.value = true;       // show removed post status.
            if (e.response) {
                let check = e.response;
                // let data_check = JSON.stringify(check);
                // let d_parse = JSON.parse(data_check);
                if (check.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        check_auth_user();
                        setTimeout(() => { get_detail_post(ads_id); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                } else if (check.status === 403) {
                    router.replace(localePath({name: 'index'}));
                }
            }
        });
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
    // ---- change format date to time ago ----
    function convertFromNow(date, show_full_date) {
        if (show_full_date) {
            return helper.check_date_ago(date, '');
        } else {
            return helper.check_date_ago(date, 'check_current_year');
        }
    }
    // ---- click back one page ----
    function goBack() {
        localStorage.setItem("storedDataA", '');
        localStorage.setItem("storedDataB", '');
        if (window.history.length > 2) {
            router.go(-1);
        } else {
            router.push(localePath({ name: 'index' }));
        }
    }
    // ---- check auth user ----
    function check_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- track on google analytic ----
    function track_google_analytics () {
        let evt_in = 'chats/detail-comment';
        // let page_title = condition === 'profile' ? 'Profile Contact' : 'Chat Detail';
        let page_path = route.path;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
            page_title: meta_title_de_comment.value,
            page_location: page_location,
            page_path: page_path,
        }
        // -- event on page --
        event(evt_in, data);
        // -- page_view --
        pageview(data);
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }


    function comparator(a, b) { 
        if (a.dataset.subject < b.dataset.subject) 
            return -1; 
        if (a.dataset.subject > b.dataset.subject) 
            return 1;  
        return 0; 
    } 
		
    // Function to sort Data 
    function SortData() { 
        var subjects = document.querySelectorAll("[data-subject]"); 
        var subjectsArray = Array.from(subjects); 
        let sorted = subjectsArray.sort(comparator); 
        sorted.forEach(e => document.querySelector("#list").appendChild(e)); 
    } 

</script>


