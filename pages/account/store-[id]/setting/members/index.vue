
<template>
    <div>
        <!-- app -->
        <div v-if="isMobile" class="_div_nav row_padding bg_app_bar_header_ fix_app_bar">
            <div @click="goBack" class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                    <i class="ion-android-arrow-back font_click_back"></i>
                </button>
            </div>
            <div class="col _pad_col_icon">
                <a rel="nofollow" class="set-app-name-title text-white">{{ $t('message.members') }}</a>
            </div>
            <div v-if="check_is_admin" @click="show_modal_add_members" class="_pad_col_icon">
                <button class="btn mar-member-add" aria-label="back">
                    <i class="icon-plus font_click_back"></i>
                </button>
            </div>
        </div>
        <!-- body -->
        <div class="set-listing-members min_h" :class="isMobile ? ' margin_below_app_bar_2' : 'p-3 form-login mt_80 rounded'">
            <button v-if="check_is_admin && !isMobile" @click="show_modal_add_members" class=" btn btn-k24-secondary mb-4" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                {{ $t('message.members') }}
            </button>
            <template v-if="members && members.length > 0">
                <template v-for="mem in members" :key="mem">
                    <a rel="nofollow" @click="show_options(mem.id)" class="my_card d-store-list cur_sur" aria-label="Infor profile">
                        <div>
                            <img :src="mem.photo ? mem.photo.small.url : empty_img_user"
                                 :alt="mem.name ? mem.name : ''" class="img_profile_list bg_reload_img" @error="imageUrlAlt_profile">
                            <div v-if="mem.online_status && mem.online_status.is_active" class="online_status"></div>
                        </div>
                        <div :class="mem.status === 'requesting' ? 'd-store-con-info-member d-store-p-d' : 'd-store-con-info-member'">
                            <p class="truncate ct_info_name">
                                {{ mem.name ? mem.name : '' }}
                                <i v-if="mem.is_verify" class="icon-check verify_icon_big"></i>
                            </p>
                            <p class="truncate m-0 ct_info_username"> {{ mem.username ? '@'+mem.username : '' }} </p>
                            <p v-if="mem.status === 'requesting'" class="truncate ct_info_username_danger"> {{ mem.status_title }} </p>
                        </div>
                        <p :class="check_is_admin ? 'role-status-member' : 'role-status-member set-r-s-right'">
                            {{ mem.role_title ? mem.role_title : '' }}
                            <i v-if="check_is_admin" class="icon-ellipsis-vertical"></i>
                        </p>
                    </a>
                </template>
            </template>
            <br>

            <template v-if="!isDesktop">
                <ClientOnly>
                    <VueEternalLoading :load="search_show_members" v-model:is-initial="isInitial" margin="800px">
                        <template #loading>
                            <div class="text-center mt-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                        </template>
                        <template #error="{ retry }">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                                <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
                                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                        <button @click="retry(), retry_get_info_store()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #no-more>
                            <div class="no_more_result"></div>
                        </template>
                        <template #no-results>
                            <div class="mt-5">
                                <p class="no_more_result"> {{ $t('message.no_result') }} </p>
                            </div>
                        </template>
                    </VueEternalLoading>
                </ClientOnly>
            </template>
            <template>
                <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                    <div v-if="members.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else class="full_width">
                        <div v-for="index in 6" :key="index" class="my_card card_bg_content">
                          <div class="thumb_pro_user_like animated-background rounded-circle"></div>
                          <div class="col mt-2">
                            <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                            <p class="animated-background text_hei_loading_price m-0"></p>
                          </div>
                        </div>
                    </div>
                </div>
                <div v-else class="des_btn_load_more">
                    <button v-if="hide_btn_load_more_members" @click="manually_search_show_members" class="btn">{{ $t('text_desktop.load_more') }}</button>
                    <div v-else-if="members.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                    </div>
                </div>
            </template>

            <!-- Desktop add more user in to store -->
            <button v-if="check_is_admin && isDesktop" @click="show_modal_add_members" class="b-add-new-branch" style="z-index: 1;" aria-label="plus">
                <i class="icon-plus"></i>
            </button>
            <template v-if="isDesktop"><br><br><br></template>
        </div>

        <div v-if="loading_field" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- show toast message -->
        <div class="toast style_toast d-none toast_members toast_z_index">
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
        <!-- /show toast message -->

        <!-- modal show add user -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_add_members" tabindex="-1" role="dialog" style="background-color: #00000066 !important;">
            <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div class=" overflow_class" :class="isMobile ? 's_content' : ''">
                        <!-- header -->
                        <div class="de-my-ads-con">
                            <div class="de-my-ads-header">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p> {{ $t('message.search_user') }} </p>
                            </div>
                            <div class="de-my-ads-search input-group a_border_box_search">
                                <input type="text" autocomplete="off" maxlength="255" v-on:keyup="keymonitor_search" v-model="new_user" ref="inputsearch" id="new_user" placeholder="Search..." class="form-control p-1">
                                <div class="input-group-append group_field_search_box">
                                    <button type="button" aria-label="search" @click="search_new_user('focus')" class="btn"><i class="ion-android-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <!-- content -->
                        <div class="modal-body d-store-add-member">
                            <a rel="nofollow" v-for="m in data_new_user" :key="m" class="my_card cur_sur">
                                <div @click="view_detail_user(m.id)">
                                    <img :src="m.photo ? m.photo.small.url : empty_img_user"
                                         :alt="m.name ? m.name : ''" class="img_profile_list bg_reload_img" @error="imageUrlAlt_profile">
                                </div>
                                <div class="d-s-con-info" @click="view_detail_user(m.id)">
                                    <p class="truncate d-s-p1">{{ m.name ? m.name : '' }}</p>
                                    <p class="truncate d-s-p2"> {{ m.username ? '@'+m.username : '' }} </p>
                                </div>
                                <button @click="add_new_member_to_store(m.id)" class="btn d-s-btn-add"> {{ $t('lng.add') }} </button>
                            </a>
                            <br>

                            <div v-if="new_member_loading" class="text-center mt-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>

                            <div class="mt-5" v-show="data_new_user.length === 0 && new_member_empty">
                                <p class="no_more_result"> {{ $t('message.no_result') }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal show add user -->

        <!-- Modal show options -->
        <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="mo_options" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog bg-modal"  :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content "  :class="isMobile ? 'animate-bottom' : ''">
                    <div :class="isMobile ? 'modal_bottom_screen' : ''">
                        <div class="option_selected">
                            <div class="modal-body p-0">
                                <ul class="list-unstyled mobile_modal_actions_container">
                                    <li @click="view_detail_user('')" class="mobile_modal_action">
                                        <div class="m-auto color_reason"> {{ $t('new_text_2.view_info') }} </div>
                                    </li>
                                    <li @click="remove_member" class="mobile_modal_action">
                                        <div class="m-auto color_reason bor_bot_unset"> {{ $t('new_text_2.cancel_request') }} </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`message.cancel`) }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show options -->

        <!-- remove members from store -->
        <div class="modal class_modal_show_message" id="modal_confirm_remove_members" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text_2.remove_member') }} </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" @click="click_remove_member" class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.cancel') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- remove members from store -->


        <!-- modal show contact page -->
        <div class="modal overflow_auto" :class="isMobile ? 'style_full_screen' : ''"
             id="show_modal_detail" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
            <div class="modal-dialog " :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content rounded" :class="isMobile ? 'mt-5' : ''">

                    <!-- App Bar -->
                    <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                        <div class="_div_nav bg_app_bar_header_ box_shadow_app_bar">
                            <div class="_pad_col_icon">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn clear-btn-app-bar">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col pl-1 l_h_con_title">
                                <p class="name_style truncate_wrap mb-0 text-white"> {{ $t('message.contact') }} </p>
                            </div>
                        </div>
                    </div>
                    <!-- /App Bar -->

                    <!-- Profile User -->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isDesktop ? '' : 'margin_below_app_bar'">
                        <div class="bg_parent_color">
                            <div class="de_pad_info_store">
                                <div @click="show_detail_user_post(detail_user.username)" class="p-0 cl_ripple cur_sur">
                                    <div class="width_div height_div position_relative">
                                        <!--<a rel="nofollow" :href="user_profile && user_profile.photo ? user_profile.photo.url : asset_url+version_library+'img/user-icon.png'" data-fancybox>-->
                                        <img v-bind:src="detail_user && detail_user.photo ? detail_user.photo.large.url : empty_img_user"
                                             :alt="detail_user && detail_user.name ? detail_user.name : ''" class="c_p_img_user_contact bg_reload_img_white mt-1" @error="imageUrlAlt_profile">
                                        <!--</a>-->
                                        <div v-if="detail_user && detail_user.online_status && detail_user.online_status.is_active" class="de_badge_online"></div>
                                    </div>
                                </div>
                                <div @click="show_detail_user_post(detail_user.username)" class="col c_p_pad_title cl_ripple cur_sur">
                                    <p class="truncate_wrap font_18 mb-0 text-white font_text_bold">
                                        {{ detail_user ? detail_user.name : '' }}
                                        <i v-if="detail_user && detail_user.is_verify" class="icon-check verify_icon_big text-white"></i>
                                    </p>
                                    <p class="truncate_wrap font_13 text_big_light m-0 text-white">
                                        {{ detail_user && detail_user.online_status ? detail_user.online_status.last_active : '' }}
                                    </p>
                                </div>
                                <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" @click="dialog_phone_number('call')" class="middle_item cl_ripple cur_sur icon-call-right">
                                    <i class="ion-android-call font_32 text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content Tab -->
                    <div class="tab-content" :class="isMobile ? 'vh-100' : ''">
                        <div class="de-bg-tab-contact">
                            <div v-if="detail_user && detail_user.username" class="form-group border_bottom_solid c-p-div-contact-infor">
                                <small class="form-text text_grey font_13">{{ $t('message.username') }}</small>
                                <p class="recent_history m-0">{{ detail_user.username }}</p>
                            </div>
                            <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" class="form-group border_bottom_solid c-p-div-contact-infor">
                                <small class="form-text text_grey font_13">{{ $t('message.phone') }}</small>
                                <p class="recent_history m-0">
                                    <!--{{ detail_user.contact.phone.join(" , ") }}-->
                                    <template v-for="p_num in detail_user.contact.phone" :key="p_num">
                                        <a rel="nofollow" class="parent_color" v-bind:href="'tel:'+p_num">{{ p_num }} &nbsp;&nbsp;</a>
                                    </template>
                                </p>
                            </div>
                            <div v-if="detail_user && detail_user.contact && detail_user.contact.email" class="form-group border_bottom_solid c-p-div-contact-infor">
                                <small class="form-text text_grey font_13">{{ $t('lng.email') }}</small>
                                <a rel="nofollow" v-bind:href="'mailto:'+detail_user.contact.email" class="recent_history m-0 parent_color">{{ detail_user.contact.email }}</a>
                            </div>
                            <div v-if="detail_user && detail_user.link" class="form-group border_bottom_solid c-p-div-contact-infor">
                                <small class="form-text text_grey font_13">{{ $t('message.website') }}</small>
                                <a rel="nofollow noopener" v-bind:href="detail_user.link" target="_blank" class="recent_history m-0 parent_color">{{ detail_user.link }}</a>
                            </div>
                            <div v-if="detail_user && detail_user.contact && detail_user.contact.address" class="form-group c-p-div-contact-infor">
                                <small class="form-text text_grey font_13">{{ $t('message.address') }}</small>
                                <p class="recent_history m-0 break_word_">{{ detail_user.contact.address }}</p>
                            </div>
                            <div v-if="detail_user && detail_user.contact && detail_user.contact.map" class="form-group c-p-div-contact-infor">
                                <div class="pb-2 pt-2">
                                    <a rel="nofollow noopener" v-bind:href="'https://maps.google.com/maps?q='+detail_user.contact.map.x+','+detail_user.contact.map.y+'&'+detail_user.contact.map.z" target="_blank" class="btn form-control btn_show_map"><b>
                                        <i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp; {{ $t('message.show_map') }}</b>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <template v-if="!isDesktop"><br><br><br></template>
                        <!-- bottom navigation -->
                        <div v-if="detail_user && detail_user.contact && detail_user.contact.phone" :class="isMobile ? 'nav de_nav px-3' : 'd-flex p-3'">
                            <div class="col pr-1">
                                <button @click="dialog_phone_number('sms')" class="btn form-control btn_sms custom_btn_ bg_parent_color text-white" id="btn_sms"><i class="fa fa-envelope font_18 mr-1" aria-hidden="true"></i>  {{ $t('message.sms') }} </button>
                            </div>
                            <div class="col pl-1">
                                <button @click="dialog_phone_number('call')" class="btn form-control btn_call custom_btn_ bg_parent_color text-white" id="btn_call"> <i class="fa fa-phone font_17 mr-1" aria-hidden="true"></i> {{ $t('message.call') }} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal show contact page -->

        <!-- Modal show phone number -->
        <div class="modal fade style_full_screen u_safety_bg" id="modal_show_phone_or_sms" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                        <!-- show warning only for normal user -->
                        <div class="option-phone-warning">
                            <div class="option-1">
                                <span class="fas fa-exclamation-circle"></span>
                                <div>
                                    <p class="war-title-km">សូមពិនិត្យទំនិញ មុនពេលបង់ប្រាក់!</p>
                                    <p class="war-title-en">Please check the good before payment!</p>
                                </div>
                            </div>
                            <div class="option-2" data-toggle="modal" data-target="#modal_show_safety_tip">
                                <p class="cur_sur">
                                    {{ $t('message.view_more') }}
                                    <i class="ion-ios-arrow-forward"></i>
                                </p>
                            </div>
                        </div>
                        <!-- show phone numbers -->
                        <div class="option_selected">
                            <div class="border_bottom u_show_ph_number">
                                <p class="modal-title font_13">
                                    {{ sms_or_call === 'call' ? $t('message.call') : $t('message.sms') }}
                                </p>
                            </div>
                            <div v-if="detail_user && detail_user.contact" class="modal-body p-0">
                                <ul class="list-unstyled list-phone-modal">
                                    <template v-if="detail_user.contact.phone_white_operator && detail_user.contact.phone_white_operator.length > 0">
                                        <li v-for="p_n in detail_user.contact.phone_white_operator" :key="p_n" class="cl_ripple">
                                            <a rel="nofollow" aria-label="Phone" class="full_field_a_tag border_top color_reason flex_imp" :href="sms_or_call === 'call' ? 'tel:'+p_n.phone : 'sms:'+p_n.phone">
                                                <div class="col _flex_ p-0 mt-1">
                                                    <img :src="p_n.icon" alt="icon" class="img_p_n">
                                                    <p class="u_show_ph_mg">{{ p_n.phone }}</p>
                                                </div>
                                                <div class="col-2 p-0 text-right">
                                                    <i aria-hidden="true" :class="sms_or_call === 'call' ? 'fa fa-phone call_icon_modal' : 'fa fa-envelope call_icon_modal'"></i>
                                                </div>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                        <div class="a_cancel_btn_modal_bg">
                            <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                <p class="modal-title color_reason"><b>Cancel</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show phone number -->
        <!-- Modal safety tip -->
        <div class="modal u_safety_bg" id="modal_show_safety_tip" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content click_background_warning">
                    <div class="modal-body break_word_ show_text_status p-3">
                        <div class="text_padding_detail mb-2 style_border_detail de_style_warning">
                            <div class="align_div_center">
                                <h1 class="de_title_warning">
                                    <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="icon de_img_warning">
                                    ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                </h1>
                            </div>
                            <div class="de_margin_left_detail">
                                <span class="text_description_detail position_absolute de_span_safety">1. </span>
                                <div class="text-dark de_font_size_detail">
                                    <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                                </div>
                            </div>
                            <div class="de_margin_left_detail">
                                <span class="text_description_detail position_absolute de_span_safety">2. </span>
                                <div class="text-dark de_font_size_detail">
                                    <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                                </div>
                            </div>
                            <div class="de_margin_left_detail">
                                <span class="text_description_detail position_absolute de_span_safety">3. </span>
                                <div class="text-dark de_font_size_detail">
                                    <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                                </div>
                            </div>
                            <div class="de_margin_left_detail">
                                <span class="text_description_detail position_absolute de_span_safety">4. </span>
                                <div class="text-dark de_font_size_detail">
                                    <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn parent_color cl_ripple font_14"> {{ $t('message.close') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal safety tip -->

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style mg-mo-auto" role="document">
                <div class="modal-content max_width_form">
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
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
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

    const loading = ref(false);
    const loading_field = ref(false);
    const hide_btn_load_more_members = ref(true);
    const dt_loading = ref(false);

    // --- detail user ---
    const detail_user = ref('');
    // --- store information ---
    const store_id = ref(route.params.id ? route.params.id : '');
    const detail_store = ref('');
    const detail_store_set = ref('');
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_4 = ref(0);
    const reload_q_again_2 = ref(0); const reload_q_again_5 = ref(0);
    const reload_q_again_3 = ref(0); const reload_q_again_6 = ref(0);
    // --- for check message show in toast ---
    const message_success = ref('');
    const error_or_success_message = ref(true);
    // --- data members ---
    const pageSize_member = ref(0);
    const members = ref([]);
    const check_is_admin = ref(false);  // check if admin or not.
    const member_id = ref('');
    const sms_or_call = ref('');
    const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again).
    // --- new user ---
    const new_user = ref('');           // keyword search new members.
    const data_new_user = ref([]);      // data store new user in search new user.
    const new_member_empty = ref(false);    // condition prevent show no_result first in listing new members.
    const new_member_loading = ref(false);  // loading in listing new member.
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: 'Listing Branches - Khmer24.com',
        meta: [
            // { name: 'apple-mobile-web-app-title', content: 'Listing Branches - Khmer24.com' },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: 'Listing Branches - Khmer24.com' },
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
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            check_new_auth_user();

            // --- check message success ---
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const p_clear = pa_con && pa_con.message && pa_con.message.d_params ? pa_con.message.d_params : ''; // check message from params.
            if (p_clear && p_clear.message) {
                setTimeout(() => { toast_message(p_clear.message, true); },1000);
            }

            // get info store
            get_infor_store();

            if (isDesktop && members.value.length === 0) {
                manually_search_show_members(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('message');
    })

    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_members');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }
    // ---- click retry ----
    function retry_get_info_store() {
        if(window.navigator.onLine) {
            // reload detail store if detail_store.value is empty
            if (!detail_store.value) { get_infor_store(); }
            check_new_auth_user(); // store again prevent image not reload
        }
    }
    // ---- get detail infor store ----
    function get_infor_store() {
        check_new_auth_user();
        // -- get user --
        if(user_data.value){
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
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { get_infor_store(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }

    // ---- scroll to get more members ----
    async function search_show_members({loaded, error, noMore, noResults}, { isFirstLoad }) {
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/teams', {
                headers: { "Access-Token": user_data.value.tokens.access_token }, // if user login add access token
                params: {
                    offset: pageSize_member.value,
                    fields: 'online_status,contact[all]',
                    lang: language.value,
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),

            }).then(res => {
                let d = res.data;
                pageSize_member.value += res.limit; // add offset
                if (d && d.length) {
                    members.value = members.value.concat(d); // concat in multiple array
                }

                // -- check stop scroll or scroll more --
                if (d.length === 0) {
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore');
                    }
                } else {
                    if (members.value.length < pageSize_member.value) {
                        noMore(); // stop scroll.
                    } else {
                        loaded(); // scroll down get more.
                    }
                }

            }).catch(e => {
                if (!e.response) {
                    error();

                } else {
                    if (e.response && e.response.status === 401) {  // retry
                        if (reload_q_again_2.value <= 2) {
                            reload_q_again_2.value += 1;
                            check_new_auth_user();
                            setTimeout(() => { loaded(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            });
        }else{
            router.push(localePath({ name: 'auth' }))
        }
    }

    // ---- manually search show members ----
    function manually_search_show_members() {
      dt_loading.value = true;
      $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/teams', {
        headers: { "Access-Token": user_data.value.tokens.access_token }, // if user login add access token
        params: {
          offset: pageSize_member.value,
          fields: 'online_status,contact[all]',
          lang: language.value,
        },
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),

      }).then(res => {
        let d = res.data;
        pageSize_member.value += res.limit; // add offset
        if (d && d.length) {
          members.value = members.value.concat(d); // concat in multiple array
        }
        dt_loading.value = false;
        hide_btn_load_more_members.value = members.value.length < pageSize_member.value ? false : true; // close button loadMore

      }).catch(e => {
        if (!e.response) {

        } else if (e.response) {
          if (e.response.status === 401) {  // retry
            if (reload_q_again_2.value <= 2) {
              reload_q_again_2.value += 1;
              check_new_auth_user();
              setTimeout(() => { manually_search_show_members(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }
          }
        }
        dt_loading.value = false;
      });
    }

    // ---- show options ----
    function show_options(id) {
        member_id.value = id;
        // only admin can edit but can not edit it self, else show modal detail contact all.
        if ((detail_store.value.owner_id === member_id.value) || (check_is_admin.value === false)) {
            view_detail_user(member_id.value);
        } else {                                                  // is simple user show modal option.
            $('#mo_options').modal('show');
        }
    }
    // ---- modal Confirm remove or not ----
    function remove_member() {
        $('#mo_options').modal('hide');     // hide modal options.
        $('#modal_confirm_remove_members').modal('show'); // show modal confirm remove.
    }
    // ---- remove member ----
    function click_remove_member() {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/teams/'+member_id.value, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'DELETE',
        }).then(res => {
            // -- close modal confirm remove --
            $('#modal_confirm_remove_members').modal('hide');

            // -- splice member that remove from list --
            $.each(members.value, (index, val) => {
                if (val.id === member_id.value) {
                    members.value.splice(index, 1);
                    return false;
                }
            });

            toast_message(res.message, true); // show message remove success.

        }).catch(error => {
            loading_field.value = false;
            if (!error.response) {
                $('#modal_show_status_error_connection').modal('show');

            } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_6.value <= 2) {
                    reload_q_again_6.value += 1;
                    check_new_auth_user();
                    setTimeout( () => { click_remove(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }

        }).finally(() => (loading_field.value = false) );
    }

    // ---- modal contact page ----
    // ---- get detail profile information ----
    function view_detail_user(id) {
        loading_field.value = true;
        let check_store_id = id ? id : member_id.value;
        $fetch(config.VUE_APP_API_URL + 'profiles/user/'+check_store_id, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value, fields: 'id,cover,photo,link,username,online_status,type,contact[all],is_verify' },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),

        }).then(p_info => {
            detail_user.value = p_info.data;      // user information.
            $('#mo_options').modal('hide');           // hide modal show options.
            $('#show_modal_detail').modal('show');    // show modal contact page.

        }).catch(error => {
            loading_field.value = false;
            if (!error.response) {

            } else {
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        check_new_auth_user();
                        setTimeout( () => { view_detail_user(id); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                } else {
                    let check = error.response; // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    toast_message(data_parse._data.message, false); // toast message.
                }
            }
        }).finally(() => (loading_field.value = false));
    }
    // ---- click show detail user post ----
    function show_detail_user_post(username) {
        if (window.navigator.onLine) { // check is connect to internet
            $('#show_modal_detail').modal('hide')
            router.push(localePath({ name: 'username', params: { username: username } }));
            save_tracking_user({ placement: 'chat' }, { clear: 'clr_old_data' });
        } else {
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }
    // ---- click show phone numbers user for Call or SMS ----
    function dialog_phone_number(call_or_sms) {
        sms_or_call.value = call_or_sms;
        $('#modal_show_phone_or_sms').modal('show');
    }

    // ---- add new members ----
    // ---- click enter to search data in listing post ads ----
    function keymonitor_search(e) {  if (e.keyCode === 13) { search_new_user(''); }  }
    // ---- show modal add members ----
    function show_modal_add_members() {
        new_user.value = '';                     // clear keyword search new members.
        data_new_user.value = [];                // clear data in listing new members.
        $('#modal_add_members').modal('show');  // show modal add members.
    }
    // ---- start search new user ----
    function search_new_user(con) {
        data_new_user.value = [];        // clear data in listing new members.
        new_member_empty.value = false;  // set no result to false prevent when requesting.
        request_get_new_user();    // search new user.
        if (con === 'focus') {          // click button.
            // this.$refs.inputsearch.focus(); // focus on search post ads.
            document.getElementById('new_user').focus();
        } else {                        // click key monitor.
            $('#new_user').blur();
        }
    }
    function request_get_new_user() {
        new_member_loading.value = true; // start loading new user.
        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value +'/teams/search', {
            headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' }, // if user login add access token
            params: { search: new_user.value, lang: language.value, },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),

        }).then(res => {
            let d = res.data;
            if (d && d.length) {
                data_new_user.value = data_new_user.value.concat(d); // concat in multiple array
            }

            if (data_new_user.value.length === 0) new_member_empty.value = true; // prevent show no result when requesting.

            new_member_loading.value = false;  // loading complete.

        }).catch(error => { // console.log(error.response);
            new_member_loading.value = false; // close loading.
            if (!error.response) { } else {
                if (error.response && error.response.status === 401) {  // retry
                    if (reload_q_again_4.value <= 2) {
                        reload_q_again_4.value += 1;
                        check_new_auth_user();
                        setTimeout( () => { request_get_new_user(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }
    // ---- add new member to store ----
    function add_new_member_to_store(id) {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/teams', {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'POST',
            body: new URLSearchParams({ add_userid: id })

        }).then(res => {
            // --- show message success ---
            toast_message(res.message,true);
            // --- close modal add new members ---
            $('#modal_add_members').modal('hide');
            // --- clear and request data again in listing members ---
            pageSize_member.value = 0;       // clear pageSize post ads.
            members.value = [];              // clear data post ads.
            isInitial.value = true;          // reset scroll loader again.

        }).catch(error => {
            loading_field.value = false;
            if (!error.response) {  } else {
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_5.value <= 2) {
                        reload_q_again_5.value += 1;
                        check_new_auth_user();
                        setTimeout( () => { click_save_auto_renew(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                } else {
                    let check = error.response; // original data error
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    toast_message(data_parse._data.message, false); // toast message.
                }
            }
        }).finally(() => (loading_field.value = false));
    }

    // ---- show modal membership ----
    function show_membership() { $('#modal_membership').modal('show'); }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'})); }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
</script>
