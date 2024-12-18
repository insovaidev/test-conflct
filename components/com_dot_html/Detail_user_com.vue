<template>
    <div :class="isDesktop ? 'des_container dt_con' : ''">
        <!-- Meta user detail -->
        <Head>
            <Title>{{ d_u_data_meta ? d_u_data_meta.title : '' }}</Title>
            <!-- ios -->
            <!--<Meta name="apple-mobile-web-app-title" :content="d_u_data_meta ? d_u_data_meta.title : ''" />-->
            <!-- seo page -->
            <Meta name="keywords" :content="d_u_data_meta ? d_u_data_meta.keyword : ''" />
            <Meta name="description" :content="d_u_data_meta ? d_u_data_meta.description : ''" />
            <!-- facebook -->
            <Meta property="og:title" :content="d_u_data_meta ? d_u_data_meta.title : ''" />
            <Meta property="fb:app_id" :content="d_u_data_meta && d_u_data_meta.fb ? d_u_data_meta.fb.id : ''" />
            <Meta property="og:type" :content="d_u_data_meta && d_u_data_meta.fb ? d_u_data_meta.fb.type : ''" />
            <Meta property="og:site_name" :content="d_u_data_meta ? d_u_data_meta.site_name : ''" />
            <Meta property="og:url" :content="d_u_data_meta ? d_u_data_meta.url : ''" />
            <Meta property="og:username" :content="d_u_data_meta ? d_u_data_meta.author : ''" />
            <Meta property="og:image" :content="d_u_data_meta ? d_u_data_meta.image : ''" />
            <Meta property="og:image:width" content="600" />
            <Meta property="og:image:height" content="600" />
            <Meta property="og:description" :content="d_u_data_meta ? d_u_data_meta.description : ''" />
            <!-- twitter -->
            <Meta name="twitter:card" content="app" />
            <Meta name="twitter:site" content="@nytimesbits" />
        </Head>

        <!-- App Bar -->
        <template v-if="isMobile">
            <div :class="d_u_detail_user && d_u_detail_user.cover && d_u_detail_user.cover.url ? '' : 'box_shadow_app_bar'" class="col no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col text-center l_h_con_title">
                        <p v-if="d_u_detail_user && d_u_detail_user.type === 'user'" class="name_style truncate_wrap m-0 text_shadow"> {{  d_u_detail_user.name ? d_u_detail_user.name : '' }} </p>
                        <p v-else class="name_style truncate_wrap m-0 text_shadow"> {{ d_u_detail_user && d_u_detail_user.title ? d_u_detail_user.title : '' }} </p>
                    </div>
                    <div v-if="d_u_detail_user && d_u_detail_user.link" class="_pad_col_icon">
                        <button @click="detectMob('', '')" aria-label="Share" class="btn icon_d_u_share"> <!-- facebook_sharing -->
                            <i class="icon-share1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </template>

        <!-- error connection -->
        <div v-if="connection_error_detail" class="col no_padding" :class="isDesktop ? 'mt-3' : 'margin_below_app_bar'">
            <div class="no_more_result p-2">
                <div class="p_bg_status">
                    <span class="fas fa-wifi size_icon_status"></span>
                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                    <button @click="retry_detail" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                </div>
            </div>
        </div>
        <template v-else>
            <div v-if="loading" class="mt_80">
                <div :class="isDesktop ? 'mt-3' : 'margin_below_app_bar'">
                    <div class="u_logo_height_vh animated-background"></div>
                    <div class="bg-white mb-3 u_lg_border">
                        <div class="u_pad_info_store">
                            <div class="animated-background u_lg_ani_with"></div>
                            <div class="col pr-0">
                                <div class="text_hei_loading_title animated-background mb-2"></div>
                                <div class="text_hei_loading_price animated-background mb-2"></div>
                                <div class="text_hei_loading animated-background"></div>
                            </div>
                        </div>
                        <div class="u_pad_info_store pt-0">
                            <div class="col p-0 animated-background mr-1 u_lg_ani_height"></div>
                            <div class="col p-0 animated-background ml-1 u_lg_ani_height"></div>
                        </div>
                    </div>
                </div>
            </div>

            <template v-else>
                <!-- Profile User -->
                <div class="col no_padding" :class="isMobile ? '' : 'd_pro_info_con mt_80'">
                    <div class="position_relative" :class="d_u_detail_user && d_u_detail_user.cover && d_u_detail_user.cover.url ? 'large-12 columns u_logo_height_vh' : 'bg_parent_color u_logo_height_px'">
                        <!-- cover -->
                        <div v-if="d_u_detail_user && d_u_detail_user.cover && d_u_detail_user.cover.url" class="blur-profile-content">
                            <!-- blur -->
                            <div class="blur-profile-img" v-bind:style="{ backgroundImage: 'url(' + d_u_detail_user.cover.medium.url + ')' }"></div>
                            <!-- display image -->
                            <a :href="d_u_detail_user.cover.url ? d_u_detail_user.cover.url : ''" data-fancybox="photo1" rel="nofollow" aria-label="Photo"> <!-- empty_img_profile -->
                                <img :data-src="d_u_detail_user.cover.large ? d_u_detail_user.cover.large.url : empty_img_profile"
                                     :alt="d_u_detail_user.name ? d_u_detail_user.name : (d_u_detail_user.title ? d_u_detail_user.title : '')"
                                     class="lazy logo_profile_d_user" :src="empty_img_loading"
                                     @click="tracking_manual('profile_cover')" @error="imageUrlAlt_profile"
                                     :class="isDesktop ? 'DT_logo_pro_user' : 'MB_logo_pro_user'" />
                            </a>
                        </div>

                        <!-- show user -->
                        <div v-if="d_u_detail_user && d_u_detail_user.type == 'user'" class="text-center u_user_align">
                            <div class="u_user_profile">
                                <a class="position_relative" data-fancybox="photo2" rel="nofollow" aria-label="Photo"
                                   :href="d_u_detail_user.photo ? d_u_detail_user.photo.url : empty_img_profile">
                                    <img :data-src="d_u_detail_user.photo ? d_u_detail_user.photo.large.url : empty_img_profile"
                                         :alt="d_u_detail_user.name ? d_u_detail_user.name : ''"
                                         class="lazy img_profile bg-white u_profile_style_" :src="empty_img_loading"
                                         @click="tracking_manual('profile_photo')" @error="imageUrlAlt_profile" />
                                    <span v-if="d_u_detail_user.online_status && d_u_detail_user.online_status.is_active"></span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="large-12 columns bg-white" :class="d_u_detail_user && d_u_detail_user.type == 'user' ? 'pt-5' : ''">

                        <!-- show user info -->
                        <div v-if="d_u_detail_user && d_u_detail_user.type == 'user'" class="a_more_obtions">
                            <div class="d_a_head_obtions">
                                <template v-if="user_data && d_u_detail_user && d_u_detail_user.id === user_data.user.id"></template>
                                <button v-else @click="follow_or_unfollow('confirm')" type="button" class="btn btn-sm btn-pro-follow">
                                    <i class="font_13 mr-1" :class="d_u_detail_user.is_follow ? 'fas fa-check' : 'icon-plus'"></i>
                                    {{ d_u_detail_user.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}
                                </button>
                            </div>

                            <div class="u_user_profile_des">
                                <h1 class="u_p_name">
                                    {{ d_u_detail_user && d_u_detail_user.name ? d_u_detail_user.name : '' }}
                                    <i v-if="d_u_detail_user.is_verify" class="icon-check verify_icon_big"></i>
                                </h1>
                                <p class="u_p_username">@{{ d_u_detail_user && d_u_detail_user.username ? d_u_detail_user.username : '' }}</p>
                            </div>
                        </div>

                        <!-- show store info -->
                        <template v-if="d_u_detail_user && d_u_detail_user.type !== 'user'">
                            <div class="u_pad_info_store">
                                <div class="center_img">
                                    <a v-bind:href="d_u_detail_user.logo ? d_u_detail_user.logo.url : empty_img_profile" data-fancybox="photo3" rel="nofollow" aria-label="Profile">
                                        <img v-bind:src="d_u_detail_user && d_u_detail_user.logo ? d_u_detail_user.logo.url : empty_img_profile" @error="imageUrlAlt_profile"
                                             :alt="d_u_detail_user.title ? d_u_detail_user.title : ''" class="img_fix_width_height bg-white" style="border: 1px solid #dbdbdb;">
                                    </a>
                                </div>
                                <div class="detail-store-con">
                                    <div class="con-title-com">
                                        <h1 class="de-store-title a_truncate_wrap">{{ d_u_detail_user && d_u_detail_user.title ? d_u_detail_user.title : '' }}</h1>
                                        <div><i v-if="d_u_detail_user.is_verify" class="icon-check verify_icon_big"></i></div>
                                    </div>
                                    <div class="_flex_">
                                        <div class="col p-0">
                                            <div class="d-flex w-100 align-items-cente">
                                                <p class="de-store-p1 truncate_wrap fn_14 mb-0"> @{{ d_u_detail_user && d_u_detail_user.username ? d_u_detail_user.username : '' }} </p>
                                                <button v-if="isMobile" @click="follow_or_unfollow('confirm')" type="button" class="btn btn-sm fw-semibold d-flex align-items-center fn_14 ms-auto a-color" >
                                                    <i class="font_13 mr-1" :class="d_u_detail_user.is_follow ? 'fas fa-check' : 'icon-plus'"></i>
                                                    {{ d_u_detail_user.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}
                                                </button>
                                                <div v-else class="c-follow-1 de-store-p1 cur_sur ms-2 d-flex align-items-center fn_14" @click="show_follows('followers', d_u_detail_user.followers > 0 ? true : false)">
                                                    <span class="a-color me-1">{{ d_u_detail_user.followers > 0 ? d_u_detail_user.followers : 0 }}</span>
                                                    {{ $t('new_text_3.followers') }}
                                                </div>
                                            </div>
                                            <p v-if="d_u_detail_user && d_u_detail_user.business_hours" class="de-store-p2">
                                                <label v-if="d_u_detail_user.business_hours.value === '24 Hours'" class="de-label1">
                                                    {{ locale === 'km' ? 'បើក' : 'Open' }}
                                                </label>
                                                <label v-else-if="d_u_detail_user.business_hours.status === 'always_open'" class="de-label1">
                                                    {{ d_u_detail_user.business_hours.title }}
                                                </label>
                                                <label v-else-if="d_u_detail_user.business_hours.status === 'permanently_closed'" class="de-label1 text-danger">
                                                    {{ d_u_detail_user.business_hours.title }}
                                                </label>
                                                <label v-else :class="d_u_detail_user.business_hours.status === 'open' ? 'de-label1 text-success' : 'de-label1 text-danger'">
                                                    {{ d_u_detail_user.business_hours.title }}
                                                </label>
                                                <label v-if="day_status" class="de-label2"> &#8226; {{ day_status }}</label>
                                            </p>
                                            <p class="de-store-p3">
                                                {{ d_u_detail_user && d_u_detail_user.categories && d_u_detail_user.categories.length > 0 ? (locale === 'km' ? d_u_detail_user.categories[0].km_title : d_u_detail_user.categories[0].en_title) : '' }}
                                            </p>
                                        </div>
                                        <div style="position: absolute;right: 0;top:-16px;text-align: end;">
                                            <div v-if="!isMobile">
                                                <button @click="follow_or_unfollow('confirm')" type="button" class="btn btn-sm" style="margin-top: -22px;">
                                                    <i class="font_13 mr-1" :class="d_u_detail_user.is_follow ? 'fas fa-check' : 'icon-plus'"></i>
                                                    {{ d_u_detail_user.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}
                                                </button>
                                                <div class="group-pro-contact me-0 mt-3">
                                                    <div class="sub-group-contact align-items-center">
                                                        <div v-if="d_u_detail_user && d_u_detail_user.contact && d_u_detail_user.contact.phone" class="w-100 d-flex align-items-center">
                                                            <div class="contact-1">
                                                                <button @click="dialog_phone_number('call')" type="button" class="btn btn-sm btn-k24-primary text_shadow btn_height"><i class="fa fa-phone font_13 mr-1"></i> {{ $t('message.call') }} </button>
                                                            </div>
                                                            <div class="contact-2 d-flex">
                                                                <button @click="dialog_phone_number('sms')" type="button" aria-label="SMS" class="btn btn-sm fa fa-envelope mr-1 ms-2"></button>
                                                                <button @click="show_option_user_or_store" type="button" aria-label="Option" class="btn btn-sm icon-dots-three-horizontal ml-2"></button>
                                                            </div>
                                                        </div>
                                                        <template v-else>
                                                            <div class="contact-1">
                                                                <template v-if="d_u_detail_user && d_u_detail_user.link">
                                                                    <button @click="detectMob('', '')" type="button" class="btn btn-sm btn-k24-primary text_shadow btn_height"><i class="icon-share1 font_13 mr-1 ms-2"></i> {{ $t('new_text.share') }} </button>
                                                                </template>
                                                            </div>
                                                            <div class="contact-2 fix-wid-option">
                                                                <button @click="show_option_user_or_store" type="button" aria-label="Option" class="btn btn-sm icon-dots-three-horizontal ml-2"></button>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- store or user verify, location.... -->
                        <div :class="d_u_detail_user.type === 'user' ? 'pad-info-u-s' : 'pad-info-u-s'">
                            <!-- info -->
                            <div :class=" d_u_detail_user.type === 'user' ? 'd-flex w-100' : ''">
                                <div class="u_user_membership">
                                    <div v-if="d_u_detail_user && d_u_detail_user.type === 'user'" :class="d_u_detail_user.type === 'user' ? 'cont-follow' : ''">
                                        <div v-if="d_u_detail_user.type === 'user'" class="c-follow-1 cur_sur" @click="show_follows('followers', d_u_detail_user.followers > 0 ? true : false)">
                                            <b :class="d_u_detail_user.followers > 0 ? 'parent_color_strong' : ''">{{ d_u_detail_user.followers > 0 ? d_u_detail_user.followers : 0 }}</b>
                                            {{ $t('new_text_3.followers') }}
                                        </div>
                                        <template v-if="d_u_detail_user.type === 'user'">
                                            &#8226;
                                            <div class="c-follow-2 cur_sur" @click="show_follows('following',d_u_detail_user.following > 0 ? true : false)">
                                                <b :class="d_u_detail_user.following > 0 ? 'parent_color_strong' : ''"> {{ d_u_detail_user.following > 0 ? d_u_detail_user.following : 0 }}</b>
                                                {{ $t('new_text_3.following') }}
                                            </div>
                                        </template>
                                    </div>
                                    <div v-if="isMobile && d_u_detail_user.type !== 'user'" class="c-follow-1 cur_sur" @click="show_follows('followers', d_u_detail_user.followers > 0 ? true : false)">
                                        <span class="a-color me-1">{{ d_u_detail_user.followers > 0 ? d_u_detail_user.followers : 0 }}</span>
                                        {{ $t('new_text_3.followers') }}
                                    </div>
                                    <p v-if="d_u_detail_user && d_u_detail_user.verified && d_u_detail_user.verified.length > 0">
                                        <i class="icon-check-circle"></i> {{ $t('message.verified') }}
                                        <template v-if="d_u_detail_user.verified">
                                            <template v-for="verify in d_u_detail_user.verified" :key="verify">
                                                <i v-if="verify === 'facebook'" class="fab fa-facebook-f u_icon_verify_sm"></i>
                                                <i v-if="verify === 'google'" class="fab fa-google u_icon_verify_sm"></i>
                                                <i v-if="verify === 'apple'" class="fab fa-apple u_icon_verify_sm"></i>
                                                <i v-if="verify === 'phone'" class="fa fa-phone u_icon_verify_sm"></i>
                                                <i v-if="verify === 'email'" class="fa fa-envelope u_icon_verify_sm"></i>
                                                <i v-if="verify === 'location'" class="fas fa-map-marker-alt u_icon_verify_sm"></i>
                                                <i v-if="verify === 'identity'" class="fas fa-id-badge u_icon_verify_sm"></i>
                                                <i v-if="verify === 'license'" class="fas fa-check-circle u_icon_verify_sm"></i>
                                            </template>
                                        </template>
                                    </p>
                                    <span v-if="d_u_detail_user && d_u_detail_user.registered_date">
                                        <i class="icon-calendar"></i>
                                        {{ $t('message.joined') }} {{ d_u_detail_user && d_u_detail_user.registered_date ? date_format(d_u_detail_user.registered_date) : '' }}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <template v-if="d_u_detail_user && d_u_detail_user.contact && d_u_detail_user.contact.location">
                                            <i class="icon-map-pin"></i>
                                            {{ locale === 'km' ? d_u_detail_user.contact.location.km_name : d_u_detail_user.contact.location.en_name }}
                                        </template>
                                    </span>
                                </div>
                                <div v-if="d_u_detail_user.type === 'user'" class="group-pro-contact" style="position: absolute; right: 0; bottom: 0;  margin-right: 0;">
                                    <div v-if="!isMobile">
                                        <div class="sub-group-contact">
                                            <div v-if="d_u_detail_user && d_u_detail_user.contact && d_u_detail_user.contact.phone" class="w-100 d-flex align-items-center">
                                                <div class="contact-1">
                                                    <button @click="dialog_phone_number('call')" type="button" class="btn btn-sm btn-k24-primary text_shadow btn_height"><i class="fa fa-phone font_13 mr-1"></i> {{ $t('message.call') }} </button>
                                                </div>
                                                <div class="contact-2 d-flex">
                                                    <button @click="dialog_phone_number('sms')" type="button" aria-label="SMS" class="btn btn-sm fa fa-envelope mr-1 ms-2"></button>
                                                    <button @click="show_option_user_or_store" type="button" aria-label="Option" class="btn btn-sm icon-dots-three-horizontal ml-2"></button>
                                                </div>
                                            </div>
                                            <template v-else>
                                                <div class="contact-1">
                                                    <template v-if="d_u_detail_user && d_u_detail_user.link">
                                                        <button @click="detectMob('', '')" type="button" class="btn btn-sm btn-k24-primary text_shadow btn_height"><i class="icon-share1 font_13 mr-1"></i> {{ $t('new_text.share') }} </button>
                                                    </template>
                                                </div>
                                                <div class="contact-2 fix-wid-option">
                                                    <button @click="show_option_user_or_store" type="button" aria-label="Option" class="btn btn-sm icon-dots-three-horizontal ml-2"></button>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- store description -->
                            <p v-if="d_u_detail_user && d_u_detail_user.description" class="de-store-description">{{ d_u_detail_user.description }}</p>
                        </div>

                        <!-- btn contacts -->
                        <div v-if="isMobile" class="group-pro-contact">
                            <div class="sub-group-contact">
                                <template v-if="d_u_detail_user && d_u_detail_user.contact && d_u_detail_user.contact.phone">
                                    <div class="contact-1">
                                        <button @click="dialog_phone_number('call')" type="button" class="btn btn-sm btn-k24-primary text_shadow btn_height"><i class="fa fa-phone font_13 mr-1"></i> {{ $t('message.call') }} </button>
                                    </div>
                                    <div class="contact-2 d-flex">
                                        <button @click="dialog_phone_number('sms')" type="button" aria-label="SMS" class="btn btn-sm fa fa-envelope mr-1 ms-2"></button>
                                        <button @click="show_option_user_or_store" type="button" aria-label="Option" class="btn btn-sm icon-dots-three-horizontal ml-1"></button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="contact-1">
                                        <template v-if="d_u_detail_user && d_u_detail_user.link">
                                            <button @click="detectMob('', '')" type="button" class="btn btn-sm btn-k24-primary text_shadow btn_height"><i class="icon-share1 font_13 mr-1"></i> {{ $t('new_text.share') }} </button>
                                        </template>
                                    </div>
                                    <div class="contact-2 fix-wid-option">
                                        <button @click="show_option_user_or_store" type="button" aria-label="Option" class="btn btn-sm icon-dots-three-horizontal ml-1"></button>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- tap button click Store -->
                        <ul :class="d_u_detail_user && d_u_detail_user.type === 'store' ? 'u-tab-ul' : ''" class="u_nav_custom m-0 nav u-nav-pills unset_b_t border-top-0"
                            id="pills-tab" role="tablist"> <!-- add class nes jol => u-tab-ul -->
                            <li class="col nav-item p-0 text-center" role="presentation">
                                <a class="nav-link active text-black" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" rel="nofollow"> {{ $t('message.home') }} </a>
                            </li>
                            <li class="col nav-item p-0 text-center" role="presentation" @click="track_contact">
                                <a class="nav-link text-black" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" rel="nofollow">
                                    {{ d_u_detail_user && d_u_detail_user.type === 'store' ? $t('message.about') : $t('message.about_me') }}
                                </a>
                            </li>
                            <!-- tab show only store -->
                            <template v-if="d_u_detail_user && d_u_detail_user.type === 'store'">
                                <!-- jobs -->
                                <li v-if="d_u_detail_user.menu.includes('jobs')" class="col nav-item p-0 text-center" role="presentation">
                                    <a class="nav-link text-black" id="pills-job-tab" data-bs-toggle="pill" href="#pills-job" role="tab" aria-controls="pills-job" aria-selected="false" rel="nofollow"> {{ $t('new_text_3.jobs') }} </a>
                                </li>
                                <!-- services -->
                                <li v-if="d_u_detail_user.menu.includes('services')" class="col nav-item p-0 text-center" role="presentation">
                                    <a class="nav-link text-black" id="pills-service-tab" data-bs-toggle="pill" href="#pills-service" role="tab" aria-controls="pills-service" aria-selected="false" rel="nofollow"> {{ $t('new_text_3.services') }} </a>
                                </li>
                                <!-- members -->
                                <li v-if="d_u_detail_user.menu.includes('members')" class="col nav-item p-0 text-center" role="presentation">
                                    <a class="nav-link text-black" id="pills-member-tab" data-bs-toggle="pill" href="#pills-member" role="tab" aria-controls="pills-member" aria-selected="false" rel="nofollow"> {{ $t('message.members') }} </a>
                                </li>
                                <!-- photos -->
                                <li v-if="d_u_detail_user.menu.includes('photos')" @click="show_photos" class="col nav-item p-0 text-center" role="presentation">
                                    <a class="nav-link text-black" id="pills-photo-tab" data-bs-toggle="pill" href="#pills-photo" role="tab" aria-controls="pills-photo" aria-selected="false" rel="nofollow"> {{ $t('lng.photos') }} </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <!-- All Content Tab -->
                <template v-if="route">
                    <div class="tab-content" id="pills-tabContent">
                        <!-- tap listing product post by user or store -->
                        <div class="tab-pane fade show active t_home" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                            <!-- if have search member -->
                            <template v-if="d_u_members && d_u_members.length > 0 && route.query.user">
                                <template v-for="mem in d_u_members" :key="mem">
                                    <template v-if="mem.username === route.query.user">
                                        <div class="pos-ads-by-member">
                                            <div class="my_card">
                                                <div class="col-11 p-0">
                                                    <div class="_flex_">
                                                        <div class="u-or-s-img">
                                                            <img :src="mem.photo && mem.photo.small ? mem.photo.small.url : empty_img_profile" alt="profile" class="img_profile" @error="imageUrlAlt_profile">
                                                        </div>
                                                        <div class="u-or-s-con">
                                                            <p class="truncate u-or-s-p1">{{ mem.name ? mem.name : '' }}</p>
                                                            <p class="truncate u-or-s-p2">{{ mem.username ? '@'+mem.username : '' }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <i @click="get_post_by_user('')" class="icon-clear u-or-s-icon cur_sur"></i>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </template>

                            <template v-if="role_mem_menu || role_mem_type">
                                <!-- Desktop Filter -->
                                <div v-if="isDesktop" class="bg-white rounded border p-3 mb-3 mt-3 dt_border">
                                    <div class="row">
                                        <div class="col">
                                            <input type="text" v-model="dt_keyword" class="form-control" :placeholder="$t('message.search')+'....'">
                                        </div>
                                        <div class="col-3 dt_user_select">
                                            <select class="form-control" v-model="dt_category">
                                                <option value="">All Categories</option>
                                                <template v-for="(cat, index) in d_u_post_cate_by_user" :key="index">
                                                    <template v-if="cat.parent == 0">
                                                        <option :value="cat.slug" class="main">{{ language === 'km' ? cat.km_name : cat.en_name }}</option>
                                                        <template v-for="(ch, ind) in d_u_post_cate_by_user" :key="ind">
                                                            <template v-if="ch.parent == cat.id">
                                                                <option :value="ch.slug" class="child">{{ language === 'km' ? ch.km_name : ch.en_name }}</option>
                                                            </template>
                                                        </template>
                                                    </template>
                                                </template>
                                            </select>
                                        </div>
                                        <div class="col-3">
                                            <select class="form-control" v-model="form['province']">
                                                <option value="">All Locations</option>
                                                <template v-if="locations && locations.data && locations.data.length > 0">
                                                    <option v-for="loc in locations.data" :key="loc" :value="loc.slug">
                                                        {{ language === 'km' ? loc.km_name : loc.en_name }}
                                                    </option>
                                                </template>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <button @click="dt_btn_search" class="btn btn-block dt_btn_s_user text_shadow">{{ $t('message.search') }}</button>
                                        </div>
                                        <div class="dt_filter_by_post">
                                            <button v-if="isMobile" @click="show_modal_search('')" aria-label="Badge" class="btn filter-by-post">
                                                <i class="icon-fi-rr-settings-sliders"></i>
                                                <span v-if="count_badge_search > 0" class="badge"> {{ count_badge_search }} </span>
                                            </button>
                                            <div v-else @click="show_modal_search('')" class="text-center">
                                                <button  type="button" class=" d-flex btn position-relative">
                                                    <i class="bi bi-funnel me-1"></i>
                                                    {{ $t('message.filter') }}
                                                    <span v-if="count_badge_search > 0" class="badge"> {{ count_badge_search }} </span>
                                                    <!-- <span v-if="count_badge_search > 0" class="badge" style="background:#f58800;left: 60px;"> {{ count_badge_search }} </span> -->
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- filter store -->
                                <div v-if="role_mem_type && !isDesktop" class="field-s-parent">
                                    <!-- filter search -->
                                    <div class="_flex_">
                                        <div v-if="isMobile" @click.self="show_pop_up_search" class="field-s-sub1">
                                            <i @click="show_pop_up_search" class="fas ion-ios-search-strong s-i-search"></i>
                                            <p  @click="show_pop_up_search" class="truncate_wrap holder-keyword">
                                                {{ route.query.keyword ? $t('message.search') +': '+ route.query.keyword : (show_category_name ? show_category_name : $t('message.search')) }}
                                            </p>
                                            <i v-if="route.query.keyword" @click="clear_keyword" class="fas ion-close-round icon-clear-search"></i>
                                        </div>
                                        <div v-else class="w-100 position-relative">
                                            <input type="search" class="form-control pr-5" :placeholder="$t('message.search')" @keydown.enter="keyEnter" v-model="field_search" />
                                            <i class="fas ion-ios-search-strong btn user-icon-search" @click="click_search" ></i>
                                        </div>
                                        <button v-if="isMobile" @click="show_modal_search('')" aria-label="Badge" class="btn filter-by-post">
                                            <i class="icon-fi-rr-settings-sliders"></i>
                                            <span v-if="count_badge_search > 0" class="badge"> {{ count_badge_search }} </span>
                                        </button>
                                        <div v-else class="ms-auto">
                                            <div @click="show_modal_search('')" class="n-f-s-c-a cur_sur btn ms-2 me-0 bg-012 d-flex">
                                                <i class="bi bi-funnel me-1"></i>
                                                {{ $t('message.filter') }}
                                                <span v-if="count_badge_search > 0" class="badge bg_badge" style="position: unset"> {{ count_badge_search }} </span>
                                            </div>
                                        </div>
                                        <!-- <button v-if="isMobile" @click="show_modal_search('')" aria-label="Badge" class="btn filter-by-post">
                                            <i class="icon-fi-rr-settings-sliders"></i>
                                            <span v-if="count_badge_search > 0" class="badge"> {{ count_badge_search }} </span>
                                        </button>
                                        <div v-else @click="show_modal_search('')" class="text-center">
                                            <button  type="button" class=" d-flex btn position-relative user_bg_filter">
                                                <i class="bi bi-funnel me-1"></i>
                                                {{ $t('message.filter') }}
                                                <span v-if="count_badge_search > 0" class="badge bg_badge"> {{ count_badge_search }} </span>
                                            </button>
                                        </div> -->
                                    </div>
                                    <!-- Nav show short and change grid listing -->
                                    <nav class="navbar field-s-user">
                                        <div class="n-f-s-c-d-1">
                                            <div>
                                                <!-- location -->
                                                <div class="n-f-s-c-a cur_sur">
                                                    <i class="icon-map-pin n-f-s-icon"></i>
                                                    <template v-if="route.query.province">
                                                        <template v-for="loc in locations.data" :key="loc">
                                                            <template v-if="loc.slug === route.query.province">
                                                                <span @click="show_all_locations">
                                                                    {{ locale === 'km' ? loc.km_name : loc.en_name }}
                                                                </span>
                                                            </template>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        <span @click="show_all_locations"> {{ $t('new_text_1.all_location') }} </span>
                                                    </template>
                                                    <i v-if="route.query.province" @click="click_choose_location('', '')" class="icon-clear n-f-s-icon1"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="post_filter && post_filter.prices && post_filter.prices.discount" class="n-f-s-c-d-3 cur_sur" @click="change_quick_search('discount')">
                                            <i :class="route.query.discount === 'true' ? 'active_text' : ''" class="icon-percent"></i>
                                        </div>
                                        <div v-if="post_filter && post_filter.deliveries && post_filter.deliveries.shipping" class="n-f-s-c-d-3 cur_sur" @click="change_quick_search('shipping')">
                                            <i :class="route.query.shipping === 'true' ? 'active_text' : ''" class="icon-truck_2"></i>
                                        </div>
                                        <div v-if="isMobile">
                                            <div v-if="d_u_post_by_user && d_u_post_by_user.length > 0" class="n-f-s-c-d-2 cur_sur">
                                                <i @click="change_grid('grid')" class="icon-display-icon" v-if="display_list && display_list.type === 'view'"></i>
                                                <i @click="change_grid('view')" class=" icon-list" v-else-if="display_list && display_list.type === 'list'"></i>
                                                <i @click="change_grid('list')" class="icon-menu " v-else-if="display_list && display_list.type === 'grid'"></i>
                                                <i @click="change_grid('view')" class="icon-display-icon" v-else></i>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div v-if="d_u_post_by_user && d_u_post_by_user.length > 0" class="n-f-s-c-d-2 cur_sur">
                                                <i @click="change_grid('list')" class="icon-menu" v-if="display_list && display_list.type === 'grid'"></i>
                                                <i @click="change_grid('grid')" class="icon-list" v-else-if="display_list && display_list.type === 'list'"></i>
                                                <i @click="change_grid('list')" class="icon-menu" v-else></i>
                                            </div>
                                        </div>
                                    </nav>
                                </div>

                                <!-- show main categories -->
                                <template v-if="post_sub && post_sub.length === 0">
                                    <div v-if="main_cate && main_cate.length > 0" class="nav-S-con owl_cate_d_u_detail_user">
                                        <div id="owl_categories" class="owl-carousel owl-theme" :key="refresh_carousel">
                                            <div v-for="main in main_cate" :key="main" class="item">
                                                <div class="nav-S-cate_owl" :class="!isDesktop ? 'mobile-n-S-c-owl' : 'desktop-n-S-c-owl dt_border'">
                                                    <div v-for="(s, index) in main.per_page" :key="index" @click=" click_category_search(s.slug, 'push_state')"
                                                       class="n-s-a-tag cur_sur" :class="post_sub.length > 0 && post_sub[0].parent === s.id ? 'active_text' : ''">
                                                        <div class="n-s-a-div-1">
                                                            <img :src="s.icon ? s.icon.url : empty_img_profile" alt="profile" @error="imageUrlAlt_profile">
                                                        </div>
                                                        <div class="n-s-a-div-2">
                                                            <div>
                                                                <p>{{ locale === 'km' ? s.km_name : s.en_name }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <!-- show sub categories Mobile -->
                                <template v-if="!isDesktop">
                                    <div v-if="post_sub && post_sub.length > 1" class="acc_sub_cate cur_sur">
                                        <ul>
                                            <li v-for="(val, k) of post_sub" :key="k" @click="click_category_search(val.slug, 'push_state')" class="cur_sur">
                                                <span :class="route.query.category === val.slug ? 'active_sub_cate' : ''">
                                                    {{ locale === 'km' ? val.km_name : val.en_name }}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                                <!-- show sub categories Desktop -->
                                <template v-else>
                                    <div v-if="post_sub && post_sub.length > 1" class="dt_sub_cate_by_pro">
                                        <ul>
                                            <li v-for="(val, k) of post_sub" :key="k" @click="click_category_search(val.slug, 'push_state')">
                                                <div class="dt_sub_c_tag cur_sur" :class="route.query.category === val.slug ? 'active_sub_cate' : ''">
                                                    {{ locale === 'km' ? val.km_name : val.en_name }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </template>

                            </template>

                            <!-- filter user -->
                            <template v-else>
                                <div v-if="!isDesktop && d_u_post_by_user && d_u_post_by_user.length > 0" class="position_relative">
                                    <h2 class="s_latest_ads">{{ $t('new_text_1.latest_ads') }}</h2>

                                    <div class="s-parent-btn-display _flex_">
                                        <div class="btn-group btn-group-sm btn_switch_view " role="group" aria-label="Basic example">
                                            <button v-if="isMobile" @click="change_grid('view')" type="button" aria-label="View" :class="display_list && display_list.type === 'view' ? 'btn btn-light icon-display-icon s_btn_switch_view active font_text_bold' : 'btn btn-light icon-display-icon s_btn_switch_view font_text_bold'"></button>
                                            <button @click="change_grid('list')" type="button" aria-label="List" :class="display_list && display_list.type === 'list' ? 'btn btn-light icon-list s_btn_switch_view active font_text_bold' : 'btn btn-light icon-list s_btn_switch_view font_text_bold'"></button>
                                            <button @click="change_grid('grid')" type="button" aria-label="Grid" :class="display_list && display_list.type === 'grid' ? 'btn btn-light icon-menu s_btn_switch_view active font_text_bold' : 'btn btn-light icon-menu s_btn_switch_view font_text_bold'"></button>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- Desktop count and short lists -->
                            <div v-if="isDesktop" class="dl_f_count mt-2 mb-2">
                                <div class="left">
                                    <h2 class="title truncate font_20px">{{ $t('new_text_3.all_post') }}</h2>
                                </div>
                                <div class="dl_f_c_right">
                                    <ul>
                                        <li v-if="d_u_post_by_user.length > 0">
                                            <label>{{ $t('text_desktop.desk_view') }}</label>
                                            <span class="btn-group mr-1" role="group">
                                                <button @click="change_grid('list')" type="button" aria-label="List" class="btn icon-list btn-change-view" :class="display_list && display_list.type === 'list' ? 'btn_active' : ''"></button>
                                                <button @click="change_grid('grid')" type="button" aria-label="Grid" class="btn btn-default icon-menu btn-change-view" :class="display_list && display_list.type === 'grid' ? 'btn_active' : ''"></button>
                                            </span>
                                        </li>
                                        <li v-if="post_filter && post_filter.sort" class="dl_f_short">
                                            <label>{{ $t('text_desktop.short_by') }}</label>
                                            <button class="btn btn-sm dropdown-toggle dl_f_short_option" type="button" id="short_options" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <template v-if="route && route.query && route.query.sortby">
                                                    <template v-for="sh in post_filter.sort.options" :key="sh">
                                                        <template v-if="sh.fieldvalue === form[post_filter.sort.fieldname]">
                                                            {{ sh.fieldtitle }}
                                                        </template>
                                                    </template>
                                                </template>
                                                <template v-else>
                                                    {{ post_filter.sort.title }}
                                                </template>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="short_options">
                                                <template v-for="sh in post_filter.sort.options" :key="sh">
                                                    <div class="dropdown-item cur_sur" @click="selected_action_on_model(post_filter.sort.fieldname, sh.fieldvalue)">{{ sh.fieldtitle }}</div>
                                                </template>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div :class="isDesktop ? 'screen_desktop' : ''" style="height: 100%">
                                <div :id="isMobile ? '' : 'height_div'" class="flex_all_post lists_post_content mt-2" :class="display_list && display_list.type === 'list' ? (isDesktop ? 'dt_list_max_width' : 'list-max-width') : (display_list && display_list.type === 'grid' ? (isDesktop ? 'dt_grid_mg_post' : '') : '')">
                                    <!-- list -->
                                    <template v-if="display_list && display_list.type === 'list'">
                                        <article v-for="(post, index) of d_u_post_by_user" :key="index" class="col-12 no_padding">
                                            <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                                <div class="u_border_cart">
                                                    <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                                              @click="save_track_optional('tracking', { placement: 'profile', display_type: 'list', item_count: d_u_post_by_user.length, item_per_page: 30, current_index: index })">
                                                        <div class="_flex_">
                                                            <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                                <p class="new_st_dis_price">
                                                                    {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                                </p>
                                                                <p class="new_st_dis_text">OFF</p>
                                                            </div>

                                                            <div class="list-contain-img">
                                                                <div @click.prevent="show_options(post, { current_index: index, placement: 'listing', display_type: 'list', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                                    <i class="icon-ellipsis-vertical"></i>
                                                                </div>
                                                                <img :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                                     :alt="post.data.title ? post.data.title : ''"
                                                                     class="lazy"
                                                                     :class="post.data.category && post.data.category.parent == 2 ? (!post.data.thumbnail ? 'u_img_post_by bg_reload_img_white' : 'u_img_post_by_job bg_reload_img_white') : 'u_img_post_by bg_reload_img_white'"
                                                                     :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                <div v-if="post.data.photos && post.data.photos.length > 1" class="c-p-left">
                                                                    <div class="c-p-con">
                                                                        <i class="far fa-image"></i>
                                                                        <p>{{ post.data.photos ? post.data.photos.length : '0' }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col u_p_col_">



                                                                <div class="list_profile_des"> <!-- @click="show_detail(post.data.title, post.data.id)" -->

                                                                    <p class="l-p-title" v-text="post.data.title ? post.data.title : '...'"></p>
                                                                    <p class="truncate_wrap l-p-date-loc">
                                                                        {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                                        &#8226;
                                                                        {{ post.data.location ? (locale === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                                                    </p>

                                                                    <p class="truncate_wrap l-p-date-loc">
                                                                        {{ post.data.condition ? post.data.condition.title : '' }}
                                                                        <template v-if="post.data.object_highlight_specs">
                                                                            <template  v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                                                &#8226; {{ v.display_value }}
                                                                            </template>
                                                                        </template>
                                                                        <span v-else class="text-white">.</span>
                                                                    </p>

                                                                    <div class="list-price-des">
                                                                        <div v-if="post.data.shipping">
                                                                            <i class="fas fa-truck"></i>
                                                                            <p>{{ post.data.shipping.title }}</p>
                                                                        </div>

                                                                        <p class="truncate">
                                                                            <strong>
                                                                                {{ post.data.price > 0 ? (1 > parseInt(post.data.price) ? '$'+post.data.price : '$'+convert_price(post.data.price)) : $t('new_text.negotiable') }}{{
                                                                                post.data.price > 0 ? (post.data.category && post.data.category.parent == 2 ? '+' : '') : '' }}
                                                                            </strong>
                                                                            <span v-if="post.data.discount" class="line_price"> ${{ convert_price(post.data.discount.original_price) }} </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                                            <template v-else>
                                                                <div v-if="post.setting && post.setting.enable_like" class="cl_ripple list-font-icon-heart" @click.prevent="click_like(post.data.id, post.data.is_like, { current_index: index, placement: 'profile', display_type: 'list', data_post: post })">
                                                                    <i v-if="post.data.is_like" class="fas fa-heart parent_color ver_icon"></i>
                                                                    <i v-else class="far fa-heart text_light ver_icon"></i>
                                                                </div>
                                                            </template>
                                                        </div>
                                                    </NuxtLink>
                                                </div>
                                                <ClientOnly>
                                                    <div v-observe-visibility="{
                                                        callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                          id: post.data.id,
                                                          index: index,
                                                          type: 'list',
                                                          paid: post.data.type !== 'normal' ? true : false,
                                                          placement: '',
                                                        }),
                                                        once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                        // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                                    }"></div>
                                                </ClientOnly>
                                            </div>
                                        </article>
                                    </template>
                                    <!-- gallery -->
                                    <template v-else-if="display_list && display_list.type === 'view'">
                                        <article v-for="(post, index) of d_u_post_by_user" :key="index" class="list_items_post article_view_post">
                                            <div>
                                                <div class="my_card p-h">
                                                    <div @click.prevent="show_options(post, { current_index: index, placement: 'listing', display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                        <i class="icon-ellipsis-vertical"></i>
                                                    </div>
                                                    <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                                        @click="save_track_optional('tracking', { placement: 'profile', display_type: 'gallery', item_count: d_u_post_by_user.length, item_per_page: 30, current_index: index })">
                                                        <div>

                                                            <!-- if image count = 1 -->
                                                            <template v-if="post.data.photos && post.data.photos.length === 1">
                                                                <!-- image post -->
                                                                <div class="view-img-1">
                                                                    <img v-if="post.data.thumbnail"
                                                                         :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                                         :alt="post.data.title ? post.data.title : ''" class="lazy" :src="empty_img_loading" @error="imageUrlAlt_post"
                                                                         :class="post.setting && post.setting.enable_apply_job ? 'img-job' : 'img-simple-post'" />
                                                                </div>
                                                            </template>

                                                            <!-- if image count = 2 -->
                                                            <template v-else-if="post.data.photos && post.data.photos.length === 2">
                                                                <div class="view-img-2">
                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)"
                                                                         :alt="post.data.title ? post.data.title : ''" class="lazy img-2-1" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                                         :alt="post.data.title ? post.data.title : ''" class="lazy img-2-2" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                    <!--<img class="img-2-1" :src='post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                    <img class="img-2-2" :src='post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">-->
                                                                </div>
                                                            </template>

                                                            <!-- if image count = 3 -->
                                                            <template v-else-if="post.data.photos && post.data.photos.length === 3">
                                                                <div class="view-img-3">
                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)"
                                                                         :alt="post.data.title ? post.data.title : ''"
                                                                         class="lazy img-3-1" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                    <div>
                                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                                             :alt="post.data.title ? post.data.title : ''"
                                                                             class="lazy img-3-2" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)"
                                                                             :alt="post.data.title ? post.data.title : ''"
                                                                             class="lazy img-3-3" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                    </div>
                                                                    <!--<img class="img-3-1" :src='post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                    <div>
                                                                        <img class="img-3-2" :src='post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                        <img class="img-3-3" :src='post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                    </div>-->
                                                                </div>
                                                            </template>

                                                            <!-- if image count > 3 -->
                                                            <template v-else-if="post.data.photos && post.data.photos.length > 3">
                                                                <div class="view-img-4">
                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)"
                                                                         :alt="post.data.title ? post.data.title : ''"
                                                                         class="lazy"
                                                                         :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                    <div>
                                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                                             :alt="post.data.title ? post.data.title : ''"
                                                                             class="lazy img-4-1"
                                                                             :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)"
                                                                             :alt="post.data.title ? post.data.title : ''"
                                                                             class="lazy img-4-2"
                                                                             :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                        <img v-if="post.data.photos.length <= 4"
                                                                             :data-src="post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)"
                                                                             :alt="post.data.title ? post.data.title : ''"
                                                                             class="lazy img-4-3"
                                                                             :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                        <div v-else>
                                                                            <img :data-src="post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)"
                                                                                 :alt="post.data.title ? post.data.title : ''"
                                                                                 class="lazy img-4-3"
                                                                                 :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                            <span>+{{ post.data.photos.length - 4 }}</span>
                                                                        </div>
                                                                    </div>

                                                                    <!--<img :src='post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                    <div>
                                                                        <img class="img-4-1" :src='post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                        <img class="img-4-2" :src='post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                        <img v-if="post.data.photos.length <= 4" class="img-4-3" :src='post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                        <div v-else>
                                                                            <img class="img-4-3" :src='post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                            <span>+{{ post.data.photos.length - 4 }}</span>
                                                                        </div>
                                                                    </div>-->
                                                                </div>
                                                            </template>

                                                            <!-- show title if image empty -->
                                                            <div v-else class="empty_image_parent view-img-0">
                                                                <div class="text-center empty_image_child">
                                                                    <p class="m-0 font_18 empty_image_text">{{ post.data.title ? post.data.title : '' }}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="list_view_body">

                                                            <!-- more post -->
                                                            <div class="des_new_view"> <!-- @click="show_detail(post.data.title, post.data.id)" -->
                                                                <p class="truncate_wrap_2 v_title" v-text="post.data.title ? post.data.title : '...'"></p>

                                                                <div class="_flex_ post_spec">
                                                                    <div v-if="post.data.condition"> {{ post.data.condition ? post.data.condition.title : '' }} </div>
                                                                    <template v-if="post.data.object_highlight_specs">
                                                                        <template  v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                                            <div> {{ v.display_value }} </div>
                                                                        </template>
                                                                    </template>
                                                                </div>

                                                                <p class="truncate v_date_location">
                                                                    {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                                    &#8226;
                                                                    {{ post.data.location ? (locale === 'km' ? post.data.location.km_name3 : post.data.location.en_name3) : '' }}
                                                                </p>

                                                                <p v-if="post.data.price > 0" class="list_view_post_price">
                                                                    <strong>{{ 1 > parseInt(post.data.price) ? '$'+post.data.price : '$'+convert_price(post.data.price) }}{{ post.data.price > 0 && post.data.category && post.data.category.parent == 2 ? '+' : '' }}</strong>
                                                                    <span v-if="post.data.discount" class="span1">{{ '$'+convert_price(post.data.discount.original_price) }}</span>
                                                                    <span v-if="post.data.discount" class="span2">{{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'% OFF' : '$'+parseInt(post.data.discount.discount)+' OFF' }}</span>
                                                                    <span v-if="post.data.shipping" class="span3"><i class="fas fa-truck"></i>{{ post.data.shipping.title }}</span>
                                                                </p>
                                                                <p v-else class="list_view_post_price"><strong>{{ $t('new_text.negotiable') }}</strong></p>
                                                            </div>
                                                        </div>

                                                        <div class="footer_list_view_post">
                                                            <!-- check own post, not show like and chat icon -->
                                                            <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id">
                                                                <div class="list_view_own_icon_share cur_sur">
                                                                    <i @click.prevent="detectMob(post.data, {index: index, display_type: 'gallery'})" class="icon-share2"></i>
                                                                </div>
                                                            </template>
                                                            <template v-else>
                                                                <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like, { current_index: index, placement: 'profile', display_type: 'gallery', data_post: post })"
                                                                   class="list_view_action cur_sur cl_ripple">
                                                                    <i v-if="post.data.is_like" class="fas fa-heart parent_color font_icon"></i>
                                                                    <i v-else class="icon-Heart"></i>
                                                                    <p :class="post.data.is_like ? 'parent_color' : ''">{{ $t('new_text.like') }}</p>
                                                                </div>
                                                                <div v-if="post.setting && post.setting.enable_chat" class="list_view_action cur_sur cl_ripple"
                                                                   @click.prevent="show_chat(post.data.id, { current_index: index, placement: 'profile', display_type: 'gallery', data_post: post })">
                                                                    <i class="icon-messenger"></i>
                                                                    <p>{{ $t('message.chat') }}</p>
                                                                </div>
                                                                <div @click.prevent="detectMob(post.data, {index: index, display_type: 'gallery'})" :id="`share_${post.data.id}`" class="list_view_icon_share cur_sur">
                                                                    <i class="icon-share2 cl_ripple"></i>
                                                                </div>
                                                            </template>
                                                        </div>

                                                    </NuxtLink>
                                                </div>
                                                <ClientOnly>
                                                    <div v-observe-visibility="{
                                                          callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                            id: post.data.id,
                                                            index: index,
                                                            type: 'gallery',
                                                            paid: post.data.type !== 'normal' ? true : false,
                                                            placement: '',
                                                          }),
                                                          once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                          // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                                      }"></div>
                                                </ClientOnly>
                                            </div>
                                        </article>
                                    </template>
                                    <!-- grid -->
                                    <template v-else>
                                        <article v-for="(post, index) of d_u_post_by_user" :key="index" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                                            <div class="list_items_post">
                                                <div class="my_card p-h">
                                                    <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                                            @click="save_track_optional('tracking', { placement: 'profile', display_type: 'grid', item_count: d_u_post_by_user.length, item_per_page: 30, current_index: index })" class="position_relative d_block">
                                                        <!-- status show discount -->
                                                        <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                            <p class="new_st_dis_price">
                                                                {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                            </p>
                                                            <p class="new_st_dis_text">OFF</p>
                                                        </div>

                                                        <div class="height_media position_relative">

                                                            <!-- options -->
                                                            <div @click.prevent="show_options(post, { current_index: index, placement: 'profile', display_type: 'grid' })" class="grid-opt-post">
                                                                <i class="icon-ellipsis-vertical"></i>
                                                            </div>
                                                            <div :id="`share_${post.data.id}`" @click.prevent="detectMob(post.data, {index: index, display_type: 'grid'})"></div>

                                                            <!-- show shipping count photos -->
                                                            <div class="c-p-list-post">
                                                                <div v-if="post.data.shipping" class="free_shipping_list_post">
                                                                    <i class="fas fa-truck"></i>
                                                                    <p>{{ post.data.shipping.title }}</p>
                                                                </div>
                                                                <div v-if="post.data.photos && post.data.photos.length > 1">
                                                                    <div class="c-p-con">
                                                                        <i class="far fa-image"></i>
                                                                        <p>{{ post.data.photos.length }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- image post -->
                                                            <img v-if="post.data.thumbnail"
                                                                 :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                                 :alt="post.data.title ? post.data.title : ''"
                                                                 class="lazy height_media img_post_listing" :src="empty_img_loading" @error="imageUrlAlt_post"
                                                                 :class="post.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'" />
                                                            <!-- show title if image empty -->
                                                            <div v-else class="empty_image_parent height_media">
                                                                <div class="text-center empty_image_child">
                                                                    <p class="m-0 font_18 empty_image_text">
                                                                        {{ post.data.title ? post.data.title : '' }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="grid-list-des">
                                                            <p class="truncate gr-p-title" v-text="post.data.title ? post.data.title : '...'"></p>

                                                            <p class="truncate gr-p-date-loc">
                                                                {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                                &#8226;
                                                                {{ post.data.location ? (locale === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                                            </p>

                                                            <p class="truncate gr-p-date-loc">
                                                                {{ post.data.condition ? post.data.condition.title : '' }}
                                                                <template v-if="post.data.object_highlight_specs">
                                                                    <template  v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                                        &#8226; {{ v.display_value }}
                                                                    </template>
                                                                </template>
                                                                <span v-else class="text-white">.</span>
                                                            </p>

                                                            <p class="gr-p-price truncate">
                                                                <strong>
                                                                    {{ parseInt(post.data.price) > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{ post.data.price > 0 && post.data.category && post.data.category.parent == 2 ? '+' : '' }}
                                                                </strong>
                                                                <span v-if="post.data.discount" class="line_price"> {{ '$'+convert_price(post.data.discount.original_price) }} </span>
                                                            </p>
                                                        </div>

                                                        <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                                        <div v-else class="list_pad_icon_heart">
                                                            <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like, { current_index: index, placement: 'profile', display_type: 'grid', data_post: post })" class="cl_ripple">
                                                                <i v-if="post.data.is_like" class="fas fa-heart parent_color ver_icon"></i>
                                                                <i v-else class="far fa-heart color_like ver_icon"></i>
                                                            </div>
                                                        </div>

                                                    </NuxtLink>
                                                </div>
                                                <ClientOnly>
                                                    <div v-observe-visibility="{
                                                          callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                            id: post.data.id,
                                                            index: index,
                                                            type: 'grid',
                                                            paid: post.data.type !== 'normal' ? true : false,
                                                            placement: '',
                                                          }),
                                                          once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                          // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                                    }"></div>
                                                </ClientOnly>
                                            </div>
                                        </article>
                                    </template>
                                </div>
                            </div>

                            <!-- load more -->
                            <ClientOnly>
                                <template v-if="isDesktop">
                                    <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                                        <div v-if="d_u_post_by_user.length > 0" class="text-center mt-4 mb-4">
                                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                        </div>
                                        <div v-else v-for="s in 6" :key="s" class="col-12 no_padding">
                                            <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                                <div class="my_card padding_my_card">
                                                    <div class="_flex_">
                                                        <div class="animated-background u_tap_job_bg"></div>
                                                        <div class="col pb-0 pt-2">
                                                            <div class="animated-background mb-2 text_hei_loading_title"></div>
                                                            <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                                            <div class="_flex_">
                                                                <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                                                                <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                                                            </div>
                                                            <div class="animated-background mb-2 text_hei_loading"></div>
                                                            <div class="animated-background text_hei_loading"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="des_btn_load_more">
                                        <button v-if="de_user_hide_btn_load_more" @click="load_more_manual" class="btn">{{ $t('text_desktop.load_more') }}</button>
                                        <template v-else>
                                            <div v-if="!de_user_hide_btn_load_more && d_u_post_by_user.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                                                <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                                <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                                <template v-else>
                                    <VueEternalLoading :load="get_user_or_store_post" :key="reset_scroll" v-model:is-initial="isInitial" margin="800px">
                                            <template #loading>
                                                <!-- loading background when data have -->
                                                <div v-if="d_u_post_by_user.length > 0" class="text-center mt-4">
                                                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                                </div>
                                                <!-- loading background when data is empty -->
                                                <div v-else v-for="s in 6" :key="s" class="col-12 no_padding">
                                                    <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                                        <div class="my_card padding_my_card">
                                                            <div class="_flex_">
                                                                <div class="animated-background u_tap_job_bg"></div>
                                                                <div class="col pb-0 pt-2">
                                                                    <div class="animated-background mb-2 text_hei_loading_title"></div>
                                                                    <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                                                    <div class="_flex_">
                                                                        <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                                                                        <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                                                                    </div>
                                                                    <div class="animated-background mb-2 text_hei_loading"></div>
                                                                    <div class="animated-background text_hei_loading"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template #error="{ retry }">
                                                <div class="col no_padding">
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
                                                <div class="no_more_result"></div>
                                            </template>
                                            <template #no-results>
                                                <!-- <div class="no_more_result mt-5 mb-5">
                                                    <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                                    <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                                </div> -->
                                                <div class="no_more_result " :class="isMobile ? 'n-m-r-mg' : 'py-5 bg-white'">
                                                    <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                                                    <p class="no_more_result mt-2">You don't have any list posts right now</p>
                                                </div>
                                            </template>
                                        </VueEternalLoading>
                                </template>
                                <br><br><br>
                            </ClientOnly>
                        </div>

                        <!-- tap show information user or store -->
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <!-- user or store info -->
                            <div class="u-bg-tab-contact" :class="isDesktop ? 'dt_border' : ''">
                                <h3 class="u-overview">{{ $t('lng.overview') }}</h3>

                                <div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.type === 'store' && d_u_detail_user.about" class="border_bottom_solid">
                                        <p>
                                            <i class="icon-info"></i>
                                            <span class="line_paragraph_about ml-2 mr-1">{{ d_u_detail_user.about }}</span>
                                        </p>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.verified && d_u_detail_user.verified.length > 0" class="border_bottom_solid _flex_">
                                        <p>
                                            <i class="icon-check-circle"></i>
                                            <span class="text_overview ml-2 mr-1">{{ $t('message.verified') }}</span>
                                        </p>
                                        <div class="u_pad_verify">
                                            <template v-for="verify in d_u_detail_user.verified" :key="verify">
                                                <i v-if="verify === 'facebook'" class="fab fa-facebook-f u_icon_verify_lg"></i>
                                                <i v-if="verify === 'google'" class="fab fa-google u_icon_verify_lg"></i>
                                                <i v-if="verify === 'apple'" class="fab fa-apple u_icon_verify_lg"></i>
                                                <i v-if="verify === 'phone'" class="fa fa-phone u_icon_verify_lg"></i>
                                                <i v-if="verify === 'email'" class="fa fa-envelope u_icon_verify_lg"></i>
                                                <i v-if="verify === 'location'" class="fas fa-map-marker-alt u_icon_verify_lg"></i>
                                                <i v-if="verify === 'identity'" class="fas fa-id-badge u_icon_verify_lg"></i>
                                                <i v-if="verify === 'license'" class="fas fa-check-circle u_icon_verify_lg"></i>
                                            </template>
                                        </div>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.contact.phone" class="border_bottom_solid">
                                        <p>
                                            <i class="icon-phone1"></i>
                                            <span class="text_overview ">
                                                <template v-for="p_num in d_u_detail_user.contact.phone" :key="p_num">
                                                    <a rel="nofollow" @click="tracking_manual('call')" class="parent_color cur_sur" v-if="show_phone_number" v-bind:href="'tel:'+p_num">{{ p_num }} &nbsp;&nbsp;</a>
                                                    <label class="parent_color cur_sur m-0" v-else @click="click_display_full_P_N">{{ display_P_N(p_num) }} &nbsp;&nbsp;</label>
                                                </template>
                                            </span>
                                        </p>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.business_hours" class="border_bottom_solid position_relative cur_sur" data-bs-toggle="collapse"
                                         href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        <p>
                                            <i class="icon-clock2"></i>
                                            <span class="text_overview">
                                                  <label v-if="d_u_detail_user.business_hours.value === '24 Hours'" class="m-0 text-success">
                                                      {{ locale === 'km' ? 'បើក' : 'Open' }}
                                                  </label>
                                                  <label v-else-if="d_u_detail_user.business_hours.status === 'always_open'" class="m-0 text-success">
                                                      {{ d_u_detail_user.business_hours.title }}
                                                  </label>
                                                  <label v-else-if="d_u_detail_user.business_hours.status === 'permanently_closed'" class="m-0 text-danger">
                                                      {{ d_u_detail_user.business_hours.title }}
                                                  </label>
                                                  <label v-else :class="d_u_detail_user.business_hours.status === 'open' ? 'm-0 text-success' : 'm-0 text-danger'">
                                                      {{ d_u_detail_user.business_hours.title }}
                                                  </label>
                                                  <label v-if="day_status" class="m-0"> &nbsp; &#8226; &nbsp; {{ day_status }}</label>

                                                  <template v-if="(d_u_detail_user.business_hours.status === 'always_open') || (d_u_detail_user.business_hours.status === 'permanently_closed')"></template>
                                                  <span v-else class="icon-chevron-down icon_drop_down"></span>
                                              </span>
                                        </p>

                                        <template v-if="(d_u_detail_user.business_hours.status === 'always_open') || (d_u_detail_user.business_hours.status === 'permanently_closed')"></template>
                                        <div v-else id="multiCollapseExample1" class="multi-collapse collapse" style="padding: 13px 0 0 26px;">
                                            <div v-for="(bu, index) of d_u_detail_user.business_hours.hours" :key="index" :class="this_day === index ? 'active_bold style_flex' : 'style_flex'">
                                                <p class="col-5 m-0 p-0">{{ bu.title }}</p>
                                                <p class="col-7 m-0 p-0 text-right">{{ bu.value }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.categories && d_u_detail_user.categories.length > 0" class="border_bottom_solid">
                                        <p>
                                            <i class="icon-folder"></i>
                                            <span class="text_overview">
                                                  <template v-for="(cat, index) of d_u_detail_user.categories">
                                                      {{ index > 0 ? ' &#8226; ' : '' }}{{ cat.en_title }}
                                                  </template>
                                              </span>
                                        </p>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.contact.email" class="border_bottom_solid">
                                        <p>
                                            <i class="icon-mail"></i>
                                            <a rel="nofollow" @click="tracking_manual('mail')" v-bind:href="'mailto:'+d_u_detail_user.contact.email" class="text_overview parent_color">{{ d_u_detail_user.contact.email }}</a>
                                        </p>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.link" class="border_bottom_solid">
                                        <p>
                                            <i class="icon-globe"></i>
                                            <a rel="nofollow noopener" @click="tracking_manual('link')" v-bind:href="d_u_detail_user.link" target="_blank" class="text_overview parent_color">{{ d_u_detail_user.link }}</a>
                                        </p>
                                    </div>
                                    <div v-if="d_u_detail_user && d_u_detail_user.contact && (d_u_detail_user.contact.location || d_u_detail_user.contact.address || d_u_detail_user.contact.map)"
                                         @click="click_show_map(d_u_detail_user.contact.map ? 'show_map' : '')" class="_flex_ cur_sur">
                                        <p><i class="icon-map-pin"></i></p>
                                        <div class="text_overview">
                                            <p v-if="d_u_detail_user && d_u_detail_user.contact.long_location">
                                                {{ d_u_detail_user.contact.long_location }}
                                            </p>
                                            <p v-if="d_u_detail_user && d_u_detail_user.contact.address" class="get_direction line_par_locate">{{ d_u_detail_user.contact.address }}</p>
                                            <p v-if="d_u_detail_user && d_u_detail_user.contact.map" class="parent_color get_direction cur_sur">{{ $t('lng.get_direction') }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- tap show branches -->
                            <div v-if="d_u_detail_user && d_u_detail_user.branches && d_u_detail_user.branches.data.length > 0"
                                 :class="isDesktop ? 'dt_border' : ''" class="u-bg-tab-contact mt-2">
                                <h4 class="u-overview">{{ $t('new_text_2.branches') }}</h4>
                                <div>
                                    <article v-for="(branch, index) of d_u_detail_user.branches.data" :key="index" class="col-12 no_padding l-branches">
                                        <div class="l-branches-con">
                                            <div class="detail-store-branches">
                                                <div class="de-flex-q-c-title">
                                                    <p> {{ branch.title ? branch.title : '' }} </p>
                                                </div>
                                                <div class="l-b-c-sub">
                                                    <p v-if="branch.email">
                                                        <i class="icon-mail"></i>
                                                        <a @click="tracking_manual('mail')" v-bind:href="'mailto:'+branch.email" class="text_overview parent_color" rel="nofollow">{{ branch.email }}</a>
                                                    </p>
                                                    <p v-if="branch.phone">
                                                        <i class="icon-phone1"></i>
                                                        <a v-for="p_num in branch.phone" :key="p_num" @click="tracking_manual('call')" class="parent_color cur_sur" v-bind:href="'tel:'+p_num" rel="nofollow">{{ p_num }} &nbsp;&nbsp;</a>
                                                    </p>
                                                    <div v-if="branch.map" @click.stop.prevent="link_google_map(branch.map.x, branch.map.y)" class="l-b-c-sub-loc cur_sur">
                                                        <p><i class="icon-map-pin"></i></p>
                                                        <div class="loc_overview">
                                                            <p class="m-0">{{ locale === 'km' ? branch.location.km_name : branch.location.en_name }}</p>
                                                            <p class="m-0">{{ branch.address ? branch.address : '' }}</p>
                                                            <p class="parent_color get_direction m-0 cur_sur"> {{ $t('lng.get_direction') }} </p>
                                                        </div>
                                                    </div>
                                                    <div v-else class="l-b-c-sub-loc">
                                                        <p><i class="icon-map-pin"></i></p>
                                                        <div class="loc_overview">
                                                            <p class="m-0">{{ locale === 'km' ? branch.location.km_name : branch.location.en_name }}</p>
                                                            <p class="m-0">{{ branch.address ? branch.address : '' }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div v-if="d_u_detail_user && d_u_detail_user.branches && d_u_detail_user.branches.total > 3"
                                 :class="isDesktop ? 'dt_border' : ''" @click="go_to_branches" class="detail-store-branches-more cur_sur">
                                <p class="m-0">{{ $t('new_text_2.more_branches') }}</p>
                            </div>
                            <!-- Keywords -->
                            <div v-if="d_u_detail_user && d_u_detail_user.keywords && d_u_detail_user.keywords.length > 0"
                                 :class="isDesktop ? 'dt_border' : ''" class="u-bg-tab-contact mt-2">
                                <h5 class="u-overview">{{ $t('new_text_2.keyword') }}</h5>
                                <div class="u-d-keyword-con">
                                    <template v-for="(keyword, index) of d_u_detail_user.keywords" :key="index">
                                        <button @click="go_to_search_result(keyword)" type="button" class="btn btn-light mb-2">{{ keyword }}</button>
                                    </template>
                                </div>
                            </div>

                            <br><br><br>
                        </div>

                        <!-- tap show listing jobs -->
                        <div class="tab-pane fade" id="pills-job" role="tabpanel" aria-labelledby="pills-job-tab">
                            <!-- list -->
                            <div v-if="listing_jobs && listing_jobs.length > 0" id="height_job_div" class="flex_all_post lists_post_content list-max-width">
                                <article v-for="(jobs, index) of listing_jobs" :key="index" class="col-12 no_padding">
                                    <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                        <div class="u_border_cart">
                                            <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: jobs.data.title ? check_title_char(jobs.data.title) : '.', id: jobs.data.id } })"
                                                @click="save_track_optional('tracking', { placement: 'profile', display_type: 'list', item_count: d_u_post_by_user.length, item_per_page: 30, current_index: index })">
                                                <div class="_flex_">
                                                    <div v-if="jobs.data.discount" class="position_absolute type_buy new_st_discount">
                                                        <p class="new_st_dis_price">
                                                            {{ jobs.data.discount.type === 'percent' ? parseInt(jobs.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(jobs.data.discount.discount)) }}
                                                        </p>
                                                        <p class="new_st_dis_text">OFF</p>
                                                    </div>

                                                    <div class="list-contain-img">
                                                        <img v-bind:src="jobs.data.thumbnail ? jobs.data.thumbnail : empty_img_post" :alt="jobs.data.title ? jobs.data.title : ''" @error="imageUrlAlt_post"
                                                             class="bg_reload_img_white" :class="jobs.data && jobs.data.category && jobs.data.category.parent == 2 ? (!jobs.data.thumbnail ? 'u_img_post_by' : 'u_img_post_by_job') : 'u_img_post_by'">
                                                        <div v-if="jobs.data.photos && jobs.data.photos.length > 1" class="c-p-left">
                                                            <div class="c-p-con">
                                                                <i class="far fa-image"></i>
                                                                <p>{{ jobs.data.photos ? jobs.data.photos.length : '0' }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col u_p_col_">


                                                    <div class="list_profile_des">

                                                        <p class="l-p-title" v-text="jobs.data.title ? jobs.data.title : '...'"></p>
                                                        <p class="truncate_wrap l-p-date-loc">
                                                            {{ jobs.data.renew_date ? convertFromNow(jobs.data.renew_date) : convertFromNow(jobs.data.posted_date) }}
                                                            &#8226;
                                                            {{ jobs.data.location ? (locale === 'km' ? jobs.data.location.km_name2 : jobs.data.location.en_name2) : '' }}
                                                        </p>

                                                        <p class="truncate_wrap l-p-date-loc">
                                                            {{ jobs.data.condition ? jobs.data.condition.title : '' }}
                                                            <template v-if="jobs.data.object_highlight_specs">
                                                                <template  v-for="(v, k) of jobs.data.object_highlight_specs" :key="k">
                                                                    &#8226; {{ v.display_value }}
                                                                </template>
                                                            </template>
                                                            <span v-else class="text-white">.</span>
                                                        </p>

                                                        <div class="list-price-des">
                                                            <div v-if="jobs.data.shipping">
                                                                <i class="fas fa-truck"></i>
                                                                <p>{{ jobs.data.shipping.title }}</p>
                                                            </div>

                                                            <p class="truncate">
                                                                <strong>
                                                                    {{ jobs.data.price > 0 ? (1 > parseInt(jobs.data.price) ? '$'+jobs.data.price : '$'+convert_price(jobs.data.price)) : $t('new_text.negotiable') }}{{
                                                                    jobs.data.price > 0 ? (jobs.data.category && jobs.data.category.parent == 2 ? '+' : '') : '' }}
                                                                </strong>
                                                                <span v-if="jobs.data.discount" class="line_price"> ${{ convert_price(jobs.data.discount.original_price) }} </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </NuxtLink>
                                        </div>
                                        <ClientOnly>
                                            <div v-observe-visibility="{
                                                callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                  id: jobs.data.id,
                                                  index: index,
                                                  type: 'list',
                                                  paid: jobs.data.type !== 'normal' ? true : false,
                                                  placement: '',
                                                }),
                                                once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                            }"></div>
                                        </ClientOnly>
                                    </div>
                                </article>
                            </div>

                            <ClientOnly>
                                <VueEternalLoading :load="get_jobs_list" margin="800px">
                                    <template #loading>
                                        <!-- loading background when data have -->
                                        <div v-if="listing_jobs.length > 0" class="text-center mt-4">
                                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                        </div>
                                        <!-- loading background when data is empty -->
                                        <div v-else v-for="s in 4" :key="s" class="col-12 no_padding">
                                            <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                                <div class="my_card padding_my_card">
                                                    <div class="_flex_">
                                                        <div class="animated-background u_tap_job_bg"></div>
                                                        <div class="col pb-0 pt-2">
                                                            <div class="animated-background mb-2 text_hei_loading_title"></div>
                                                            <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                                            <div class="_flex_">
                                                                <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                                                                <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                                                            </div>
                                                            <div class="animated-background mb-2 text_hei_loading"></div>
                                                            <div class="animated-background text_hei_loading"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #error="{ retry }">
                                        <div class="col no_padding">
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
                                        <div class="no_more_result"></div>
                                    </template>
                                    <template #no-results>
                                        <div class="no_more_result mt-5 mb-5">
                                            <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                            <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                        </div>
                                    </template>
                                </VueEternalLoading>
                            </ClientOnly>
                            <br><br><br>
                        </div>

                        <!-- tap show listing services -->
                        <div class="tab-pane fade" id="pills-service" role="tabpanel" aria-labelledby="pills-service-tab">
                            <!-- list -->
                            <div v-if="listing_services && listing_services.length > 0" id="height_service_div" class="flex_all_post lists_post_content list-max-width">
                                <article v-for="(s_v, index) of listing_services" :key="index" class="col-12 no_padding">
                                    <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                        <div class="u_border_cart">
                                            <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: s_v.data.title ? check_title_char(s_v.data.title) : '.', id: s_v.data.id } })"
                                                @click="save_track_optional('tracking', { placement: 'profile', display_type: 'list', item_count: d_u_post_by_user.length, item_per_page: 30, current_index: index })">
                                                <div class="_flex_">
                                                    <div v-if="s_v.data.discount" class="position_absolute type_buy new_st_discount">
                                                        <p class="new_st_dis_price">
                                                            {{ s_v.data.discount.type === 'percent' ? parseInt(s_v.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(s_v.data.discount.discount)) }}
                                                        </p>
                                                        <p class="new_st_dis_text">OFF</p>
                                                    </div>

                                                    <div class="list-contain-img">
                                                        <img v-bind:src="s_v.data.thumbnail ? s_v.data.thumbnail : empty_img_post" :alt="s_v.data.title" @error="imageUrlAlt_post"
                                                             class="bg_reload_img_white" :class="s_v.data.category && s_v.data.category.parent == 2 ? (!s_v.data.thumbnail ? 'u_img_post_by' : 'u_img_post_by_job') : 'u_img_post_by'">
                                                        <div v-if="s_v.data.photos && s_v.data.photos.length > 1" class="c-p-left">
                                                            <div class="c-p-con">
                                                                <i class="far fa-image"></i>
                                                                <p>{{ s_v.data.photos ? s_v.data.photos.length : '0' }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col u_p_col_">

                                                    <div class="list_profile_des">

                                                        <p class="l-p-title" v-text="s_v.data.title ? s_v.data.title : '...'"></p>
                                                        <p class="truncate_wrap l-p-date-loc">
                                                            {{ s_v.data.renew_date ? convertFromNow(s_v.data.renew_date) : convertFromNow(s_v.data.posted_date) }}
                                                            &#8226;
                                                            {{ s_v.data.location ? (locale === 'km' ? s_v.data.location.km_name2 : s_v.data.location.en_name2) : '' }}
                                                        </p>
                                                        <p class="truncate_wrap l-p-date-loc">
                                                            {{ s_v.data.condition ? s_v.data.condition.title : '' }}
                                                            <template v-if="s_v.data.object_highlight_specs">
                                                                <template  v-for="(v, k) of s_v.data.object_highlight_specs" :key="k">
                                                                    &#8226; {{ v.display_value }}
                                                                </template>
                                                            </template>
                                                            <span v-else class="text-white">.</span>
                                                        </p>

                                                        <div class="list-price-des">
                                                            <div v-if="s_v.data.shipping">
                                                                <i class="fas fa-truck"></i>
                                                                <p>{{ s_v.data.shipping.title }}</p>
                                                            </div>

                                                            <p class="truncate">
                                                                <strong>
                                                                    {{ s_v.data.price > 0 ? (1 > parseInt(s_v.data.price) ? '$'+s_v.data.price : '$'+convert_price(s_v.data.price)) : $t('new_text.negotiable') }}{{
                                                                    s_v.data.price > 0 ? (s_v.data.category && s_v.data.category.parent == 2 ? '+' : '') : '' }}
                                                                </strong>
                                                                <span v-if="s_v.data.discount" class="line_price"> ${{ convert_price(s_v.data.discount.original_price) }} </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </NuxtLink>
                                        </div>
                                        <ClientOnly>
                                            <div v-observe-visibility="{
                                                callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                  id: s_v.data.id,
                                                  index: index,
                                                  type: 'list',
                                                  paid: s_v.data.type !== 'normal' ? true : false,
                                                  placement: '',
                                                 }),
                                                once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                            }"></div>
                                        </ClientOnly>
                                    </div>
                                </article>
                            </div>

                            <ClientOnly>
                                <VueEternalLoading :load="get_services_list" margin="800px">
                                    <template #loading>
                                        <!-- loading background when data have -->
                                        <div v-if="listing_services.length > 0" class="text-center mt-4">
                                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                        </div>
                                        <!-- loading background when data is empty -->
                                        <div v-else v-for="s in 4" :key="s" class="col-12 no_padding">
                                            <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                                <div class="my_card padding_my_card">
                                                    <div class="_flex_">
                                                        <div class="animated-background u_tap_job_bg"></div>
                                                        <div class="col pb-0 pt-2">
                                                            <div class="animated-background mb-2 text_hei_loading_title"></div>
                                                            <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                                            <div class="_flex_">
                                                                <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                                                                <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                                                            </div>
                                                            <div class="animated-background mb-2 text_hei_loading"></div>
                                                            <div class="animated-background text_hei_loading"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #error="{ retry }">
                                        <div class="col no_padding">
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
                                        <!--<div class="no_more_result" style="margin-top: 100px;">There is no more Content.</div>-->
                                        <div class="no_more_result"></div>
                                    </template>
                                    <template #no-results>
                                        <div class="no_more_result mt-5 mb-5">
                                            <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                            <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                        </div>
                                    </template>
                                </VueEternalLoading>
                            </ClientOnly>
                            <br><br><br>
                        </div>

                        <!-- tap show members in store -->
                        <div class="tab-pane fade t_member" :class="isMobile ? '' : 'dt-m-10'" id="pills-member" role="tabpanel" aria-labelledby="pills-member-tab">
                            <div class="u-tab-mem" :class="isDesktop ? 'DT-tab-mem' : 'MB-tab-mem'">
                                <article v-for="(mem, index) in d_u_members" :key="index">
                                    <div @click="get_post_by_user(mem.username)" class="my_card cur_sur">
                                        <div class="u-tab-con">
                                            <div class="u-tab-sub">
                                                <div>
                                                    <img :src="mem.photo ? mem.photo.medium.url : empty_img_profile" alt="profile" @error="imageUrlAlt_profile">
                                                </div>
                                                <p class="mem-name truncate">{{ mem.name ? mem.name : '' }}</p>
                                                <p class="mem-username truncate"> {{ mem.username ? '@'+mem.username: '' }} </p>
                                                <button type="button" class="mem-view btn btn-sm form-control">
                                                    {{ $t('message.the_view') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <ClientOnly>
                                <VueEternalLoading :load="show_members" margin="800px">
                                    <template #loading>
                                        <!-- loading background when data have -->
                                        <div v-if="d_u_members.length > 0" class="text-center mt-4">
                                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                        </div>
                                        <!-- loading background when data is empty -->
                                        <div v-else class="u-tab-mem-loading">
                                            <article v-for="s in 6" :key="s" >
                                                <div class="animated-background my_card"></div>
                                            </article>
                                        </div>
                                    </template>
                                    <template #error="{ retry }">
                                        <div class="col no_padding">
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
                                        <div class="no_more_result"></div>
                                    </template>
                                    <template #no-results>
                                        <div class="no_more_result mt-5 mb-5">
                                            <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                            <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                        </div>
                                    </template>
                                </VueEternalLoading>
                            </ClientOnly>
                            <br><br><br>
                        </div>

                        <!-- tap show photos of store -->
                        <div class="tab-pane fade" id="pills-photo" role="tabpanel" aria-labelledby="pills-photo-tab">
                            <template v-if="loading_album">
                                <!-- Load Albums -->
                                <div class="u-tab-album"><div><article v-for="s in 2" :key="s"><div class="my_card animated-background"></div></article></div></div>
                                <!-- Load Photos -->
                                <div class="u-tab-photos">
                                    <h6>{{ $t('new_text_3.all_photos') }}</h6>
                                    <div><div v-for="z in 4" :key="z" class="u-load-photos animated-background"></div></div>
                                </div>
                            </template>
                            <template v-else>
                                <template v-if="list_album.length > 0">
                                    <!-- List Albums -->
                                    <div class="u-tab-album" :class="isDesktop ? 'dt_border' : ''">
                                        <div>
                                            <article v-for="(al, index) in list_album" :key="index">
                                                <div @click="show_detail_album(al)" class="my_card cur_sur">
                                                    <img :src="al.thumbnail ? al.thumbnail : empty_img_post" alt="user album" @error="imageUrlAlt_post">
                                                    <div v-if="al.title" class="u-tab-title-img">
                                                        <p class="truncate">{{al.title }}</p>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- All Photos -->
                                    <div v-if="all_photos.length > 0" class="u-tab-photos" :class="isDesktop ? 'dt_border mt-2 DT-tab-photos' : 'MB-tab-photos'">
                                        <p>{{ $t('new_text_3.all_photos') }}</p>
                                        <div>
                                            <a v-for="(ph, ind) in all_photos" :key="ind" :href="ph.photo ? ph.photo : ''" data-fancybox="gallery"
                                               rel="nofollow" aria-label="location"> <!-- :data-caption="ph.description ? ph.description : ''" -->
                                                <img :src="ph.thumbnail ? ph.thumbnail : empty_img_post" alt="profile photo" @error="imageUrlAlt_post">
                                                <div v-if="ph.description" class="u-tab-title-img">
                                                    <p class="truncate">{{ ph.description }}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <div class="mg-empty-list" v-show="all_photos.length === 0 && photo_empty">
                                <p class="no_more_result"> {{ $t('message.no_result') }} </p>
                            </div>
                            <br><br><br>
                        </div>
                    </div>
                </template>
            </template>
        </template>

        <ClientOnly>
            <!-- Loading -->
            <div v-if="loading_field" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>

            <!-- Modal show phone number -->
            <div class="modal fade"  :class="isMobile ? 'style_full_screen' : ''" id="modal_show_phone_or_sms" tabindex="-1" role="dialog">
                <div  class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w bg-modal'" role="document">
                    <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 'modal_bottom_screen' : 'mobile_modal_actions_container'">
                            <!-- show warning only for normal user -->
                            <div class="option-phone-warning" :class="isMobile ? '' : 'mb-0'">
                                <div class="option-1">
                                    <span class="fas fa-exclamation-circle"></span>
                                    <div>
                                        <p class="war-title-km">សូមពិនិត្យទំនិញ មុនពេលបង់ប្រាក់!</p>
                                        <p class="war-title-en">Please check the good before payment!</p>
                                    </div>
                                </div>
                                <div class="option-2 cur_sur" data-bs-toggle="modal" data-bs-target="#modal_show_safety_tip">
                                    <p>
                                        {{ $t('message.view_more') }}
                                        <i class="ion-ios-arrow-forward"></i>
                                    </p>
                                </div>
                            </div>
                            <!-- show phone numbers -->
                            <div class="">
                                <!-- <div class="border_bottom u_show_ph_number">
                                    <p id="label_phone_or_sms" class="modal-title font_13">
                                        {{ sms_or_call === 'call' ? $t('message.call') : $t('message.sms') }}
                                    </p>
                                </div> -->
                                <div class="modal-body de-content-modal-option">
                                    <ul class="list-unstyled mobile_modal_actions_container" :class="isMobile ? '' : 'mb-0'" id="list-phone-modal">
                                        <li class="mobile_modal_action py-2 text-secondary">
                                            <p class="m-auto fn_20">{{ sms_or_call === 'call' ? $t('message.call') : $t('message.sms') }}</p>
                                        </li>
                                        <template v-if="d_u_contact_phone.length > 0">
                                            <li v-for="p_n in d_u_contact_phone" :key="p_n" class="cl_ripple">
                                                <a class="mobile_modal_action color_reason " rel="nofollow"
                                                   :href="sms_or_call === 'call' ? 'tel:'+p_n.phone : 'sms:'+p_n.phone">
                                                    <div class="col _flex_ p-0 mt-1">
                                                        <img :src="p_n.icon" class="img_p_n" alt="icon">
                                                        <p class="u_show_ph_mg">{{ p_n.phone }}</p>
                                                    </div>
                                                    <div class="col-2 p-0 text-right">
                                                        <i aria-hidden="true" :class="sms_or_call === 'call' ? 'fa fa-phone' : 'fa fa-envelope'"></i>
                                                    </div>
                                                </a>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="isMobile" class="cur_sur">
                                <div class="cl_ripple mobile_modal_action" data-bs-dismiss="modal" aria-label="Close">
                                    <p class="m-auto text-secondary"><b>{{ $t('message.cancel') }}</b></p>
                                </div>
                            </div>
                        </div>
                        <div v-if="!isMobile" class=" cur_sur">
                                <div class="cl_ripple mobile_modal_action" data-bs-dismiss="modal" aria-label="Close">
                                    <p class="m-auto text-secondary"><b>{{ $t('message.cancel') }}</b></p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <!-- Modal safety tip -->
            <div class="modal u_safety_bg" id="modal_show_safety_tip" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content click_background_warning rounded">
                        <div class="modal-body break_word_ show_text_status p-3">
                            <div class="text_padding_detail mb-2 style_border_detail de_style_warning">
                                <div class="align_div_center">
                                    <p class="de_title_warning line_height_1_2">
                                        <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="icon de_img_warning">
                                        ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                    </p>
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

            <!-- Modal show option user or store -->
            <div class="modal fade"  :class="isMobile ? 'style_full_screen' : ''" id="modal_show_option_user_or_store" tabindex="-1" role="dialog">
                <div class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'm-auto m_w'" role="document">
                    <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 'u_modal_custom_pad' : 'dt_modal_width p-3'">
                            <div class="option_selected">
                                <div class="modal-body p-0">
                                    <ul class="list-unstyled list-phone-modal">
                                        <template v-if="user_data && d_u_detail_user && d_u_detail_user.id === user_data.user.id"></template>
                                        <template v-else>
                                            <li v-if="d_u_detail_user" @click="follow_or_unfollow('confirm')" class="mobile_modal_action py-0 cur_sur _flex_">
                                                <div class="col-10 p-2">
                                                    <p class="m-0 mt-1 font-15 font_bold">{{ d_u_detail_user.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}</p>
                                                </div>
                                                <div class="col-2 p-2 text-center">
                                                    <i class="font_21 mt-1" :class="d_u_detail_user.is_follow ? 'fas fa-check' : 'fa fa-plus'"></i>
                                                </div>
                                            </li>
                                            <li v-if="d_u_detail_user" @click="save_user(d_u_detail_user.is_saved ? 'unsave': 'save','confirm')" class="mobile_modal_action py-0 cur_sur _flex_">
                                                <div class="col-10 p-2">
                                                    <p class="m-0 mt-1 font-15 font_bold">{{ d_u_detail_user.is_saved ? $t('new_text.saved') : $t('new_text.save') }}</p>
                                                </div>
                                                <div class="col-2 p-2 text-center">
                                                    <i class="font_21 mt-1" :class="d_u_detail_user.is_saved ? 'fa fa-bookmark' : 'far fa-bookmark'"></i>
                                                </div>
                                            </li>
                                        </template>
                                        <li v-if="d_u_detail_user && d_u_detail_user.contact.phone" @click="dialog_phone_number('call')" class="_flex_ mobile_modal_action py-0 cur_sur h-v-mouse">
                                            <div class="col-10 p-2">
                                                <p class="m-0 font-15 font_bold">{{ $t('message.call') }}</p>
                                                <p class="m-0 font_13 text_grey truncate">{{ d_u_detail_user.contact.phone.join(" , ") }}</p>
                                            </div>
                                            <div class="col-2 ch_icon_option"><i class="fa fa-phone"></i></div>
                                        </li>
                                        <li v-if="d_u_detail_user && d_u_detail_user.contact.phone" @click="dialog_phone_number('sms')" class="_flex_ mobile_modal_action py-0 cur_sur h-v-mouse">
                                            <div class="col-10 p-2">
                                                <p class="m-0 font-15 font_bold">{{ $t('message.sms') }}</p>
                                                <p class="m-0 font_13 text_grey truncate">{{ d_u_detail_user.contact.phone.join(" , ") }}</p>
                                            </div>
                                            <div class="col-2 ch_icon_option"><i class="fa fa-envelope"></i></div>
                                        </li>
                                        <li @click="detectMob('','')" class="_flex_ mobile_modal_action py-0 cur_sur h-v-mouse">
                                            <div class="col-10 p-2">
                                                <p class="m-0 font-15 font_bold">{{ $t('new_text.share') }}</p>
                                                <p class="m-0 font_13 text_grey truncate">{{ $t('new_text_1.share_to') }}</p>
                                            </div>
                                            <div class="col-2 text-center l_h_con_title"><i class="icon-share1 font_21 h-v-mouse ver_icon"></i></div>
                                        </li>
                                        <li v-if="d_u_detail_user && d_u_detail_user.contact.map">
                                            <a target="_blank" rel="nofollow noopener" class="mobile_modal_action py-0 cur_sur" @click="tracking_manual('map')"
                                               v-bind:href="'https://maps.google.com/maps?q='+d_u_detail_user.contact.map.x+','+d_u_detail_user.contact.map.y+'&'+d_u_detail_user.contact.map.z">
                                                <div class="col-10 p-2">
                                                    <p class="m-0 mt-1 font-15 font_bold">{{ $t('lng.direction') }}</p>
                                                </div>
                                                <div class="col-2 p-2 text-center"><i class="icon-diamond-turn-right-solid font_23 mt-1"></i></div>
                                            </a>
                                        </li>
                                        <li v-if="d_u_detail_user && d_u_detail_user.link" @click="click_copy(d_u_detail_user.link)" class="mobile_modal_action py-0 cur_sur h-v-mouse _flex_">
                                            <div class="col-10 p-2">
                                                <p class="m-0 font-15 font_bold">{{ $t('new_text_1.link') }}</p>
                                                <p class="m-0 font_13 text_grey truncate">{{ d_u_detail_user.link }}</p>
                                                <div class="h-c-parent">
                                                    <input id="copy_link" ref="clickLink" readonly class="hide_copy_text"/>
                                                </div>
                                            </div>
                                            <div class="col-2 ch_icon_option"><i class="fas fa-link"></i></div>
                                        </li>
                                        <li v-if="d_u_detail_user && user_data && d_u_detail_user.id === user_data.user.id"></li>
                                        <li v-else @click="report_on_user_or_store('next_page')" class="_flex_ mobile_modal_action py-0 cur_sur h-v-mouse">
                                            <div class="col-10 p-2">
                                                <p class="m-0 mt-1 font-15 font_bold">{{ $t('message.report_this_post') }}</p>
                                            </div>
                                            <div class="col-2 p-2 text-center"><i class="fas fa-exclamation-circle font_21 mt-1"></i></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="a_cancel_btn_modal_bg cur_sur mt-3">
                                <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                    <p class="modal-title color_reason"><b>Cancel</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal report user or store -->
            <div  class="modal fade"  :class="isMobile ? 'style_full_screen' : ''"  id="show_modal_list_report_user_or_store" tabindex="-1" role="dialog">
                <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                    <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 's_content' : 'dt_modal_width p-3'">
                            <div class="text-center border_bottom u_rep_pad">
                                <p class="modal-title font_15"> {{ $t('message.report_this_post') }} </p>
                            </div>
                            <div class="modal-body p-0 overflow_content">
                                <ul class="list-unstyled bg-white">
                                    <li @click="choose_report(re.value)" v-for="re in report_user_or_store.data" :key="re" class="full_field_tag">
                                        {{ locale === 'km' ? re.km : re.en }}
                                        <i v-if="re.value === report_check" class="fas fa-check color_sub_icon mt-1 float-end c_orange"></i>
                                    </li>
                                </ul>
                                <div class="u_rep_pad_sub">
                                    <textarea v-model="description" rows="4" id="description" :placeholder="$t('new_text_1.description')" class="form-control"></textarea>
                                    <label id="error_description" class="text-danger font_14 ml-2 d-none">{{ $t('validation.error_description') }}</label>
                                </div>
                            </div>
                            <!-- button submit report -->
                            <div class="p-2 text-center _flex_ border-top">
                                <div @click="close_report_modal" class="col-4 p-0">
                                    <p class="font_16 modal-title p-2 bg_grey mr-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                                </div>
                                <div v-if="((report_check && report_check !== 'other') || (report_check === 'other' && description))" @click="report_submit" class="col-8 p-0">
                                    <p class="font_16 modal-title p-2 bg_orange text-white rounded cur_sur"> {{ $t('message.submit') }} </p>
                                </div>
                                <div v-else @click="show_required_report" class="col-8 p-0">
                                    <p class="font_16 modal-title p-2 text-white bg_orange_light rounded cur_sur"> {{ $t('message.submit') }} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- modal show detail Album photos -->
            <div class="modal style_full_screen" id="modal_detail_album_photos" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content modal_content_style">
                        <!-- app -->
                        <div class="_div_nav row_padding bg_app_bar_header_">
                            <div class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                                <button class="btn clear-btn-app-bar" aria-label="Back">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col _pad_col_icon">
                                <p class="set-app-name-title">{{ detail_album && detail_album.title ? detail_album.title : '' }}</p>
                            </div>
                        </div>
                        <!-- body -->
                        <div class="modal-body d-store-listing-members">
                            <div v-if="detail_album && detail_album.photos && detail_album.photos.length > 0" class="mt-1 max-w-on-list-photos">
                                <a rel="nofollow" v-for="(ph, index) in detail_album.photos" :key="index" :href="ph.photo" data-fancybox="album" aria-label="Photo"> <!-- :data-caption="ph.description ? ph.description : ''" -->
                                    <img class="s_image_list_1" :alt="ph.description ? ph.description : ''" :src="ph.thumbnail ? ph.thumbnail : asset_url+version_library+'img/image-loader1.gif'">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- show success message -->
            <div class="toast style_toast d-none toast_z_index">
                <div class="toast-header header_padding_toast">
                    <strong class="mr-auto style_flex">
                        <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                        <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                        <p class="m-0 ml-2"> {{ message_success ? message_success : $t('lng.report_success') }} </p>
                    </strong>
                    <button type="button" class="ml-2 mt-1 mb-0 close u_close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>

            <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_actions_post" tabindex="-1" role="dialog">
                <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                    <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 's_content p-3 bg-modal overflow_class ' : ' p-3'">
                            <!-- content -->
                            <div class="modal-body de-content-modal-option">
                                <ul class="list-unstyled mobile_modal_actions_container">
                                    <li @click="share_manual_post" class="mobile_modal_action cur_sur">
                                        <i class="icon-share"></i>
                                        <p class="mb-0">{{ $t('new_text.share') }}</p>
                                    </li>

                                    <template v-if="user_data && detail_one_post.data && detail_one_post.data.user && detail_one_post.data.user.id === user_data.user.id"></template>
                                    <template v-else>
                                        <li @click="save_manual_post(detail_one_post && detail_one_post.data.is_saved ? 'unsave' : 'save', 'confirm')" class="mobile_modal_action cur_sur">
                                            <i :class="detail_one_post && detail_one_post.data.is_saved ? 'fa fa-bookmark' : 'far fa-bookmark'"></i>
                                            <p class="mb-0">{{ detail_one_post && detail_one_post.data.is_saved ? $t('new_text.un_save') : $t('new_text.save') }}</p>
                                        </li>
                                        <li @click="report_manual_post" class="mobile_modal_action dt-bottom cur_sur">
                                            <i class="icon-info"></i>
                                            <p class="mb-0">{{ $t('message.report_this_post') }}</p>
                                        </li>
                                    </template>
                                </ul>
                                <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`account_t.cancel`) }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal show confirm unsaved -->
            <div class="modal class_modal_show_message" id="modal_confirm_unsaved" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3">
                            <b> {{ $t('new_text.unsaved') }} </b> <br>
                        </div>
                        <div class="modal-footer border_unset m-s-c-u-mg">
                            <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
                            <button type="button" @click="save_manual_post('unsave', '')" class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /modal show confirm unsaved -->

            <!-- modal show confirm unsaved -->
            <div class="modal class_modal_show_message" id="confirm_unsaved_store" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3">
                            <b> {{ d_u_detail_user.type === 'user' ? $t('new_text.unsaved_user') : $t('new_text.unsaved_store') }} </b> <br>
                        </div>
                        <div class="modal-footer border_unset m-s-c-u-mg">
                            <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
                            <button type="button" @click="save_user('unsave', '')" class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /modal show confirm unsaved -->

            <!-- Modal show locations -->
            <div class="modal fade"  :class="isMobile ? 'style_full_screen' : ''" id="show_modal_list_location" tabindex="-1" role="dialog">
                <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                    <div  class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 's_content' : 'dt_modal_width'">
                            <!-- header -->
                            <div v-if="isMobile" class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ $t('message.location') }} </p>
                                <button @click="click_choose_location('', '')" class="btn de-btn-plus font_15">{{ $t('message.clear') }}</button>
                            </div>
                            <div v-else class="modal-header m_h_p">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div class="col text-center">
                                    <p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p>
                                </div>
                                <div class="_pad_col_icon">
                                    <button class="btn clear s_pad_clear "  @click="click_choose_location('', '')">
                                        {{ $t('message.clear') }}
                                    </button>
                                </div>
                            </div>
                            <!-- content -->
                            <div :class="isMobile ? '' : 'modal-body'">
                                <div v-if="locations" class="modal-body de-head-quick_chat">
                                    <ul class="list-unstyled bg-white">
                                        <li v-for="loc in locations.data" :key="loc" @click="click_choose_location('change', loc.slug)" class="full_field_tag cur_sur h-v-mouse">
                                            {{ locale === 'km' ? loc.km_name : loc.en_name }}
                                            <i v-if="route.query.province === loc.slug" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show locations -->

            <!-- alert show option share media -->
            <div class="modal fade t-0 b-0" id="modal_show_option_share" tabindex="-1" role="dialog">
                <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                    <div class="modal-content p-3" :class="isMobile ? 'max_width_form s_content bg-modal' : 'rounded'">
                        <div class="modal-body de-content-modal-option">
                            <ul class="list-unstyled mobile_modal_actions_container">
                                <li class="mobile_modal_action">
                                    <p class="modal-title font_19 m-auto">{{ $t('new_text.share') }}</p>
                                </li>
                                <li @click="facebook_sharing" class="mobile_modal_action cur_sur">
                                    <div class=" color_reason h-v-mouse _flex_">
                                        <div class="col _flex_ p-0">
                                            <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                                            <p class="img_share_option_color">Facebook</p>
                                        </div>
                                    </div>
                                </li>
                                <li @click="twitter_sharing" class="mobile_modal_action cur_sur">
                                    <div class=" color_reason h-v-mouse">
                                        <div class="col _flex_ p-0">
                                            <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                                            <p class="img_share_option_color">Twitter</p>
                                        </div>
                                    </div>
                                </li>
                                <li @click="click_copy_1(d_u_detail_user.link)" class="mobile_modal_action cur_sur">
                                    <div class=" color_reason h-v-mouse">
                                        <div class="col _flex_ p-0">
                                            <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                                            <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                                            <div class="h-c-parent">
                                                <input id="copy_link_1" ref="clickLink1" readonly class="hide_copy_text"/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`account_t.cancel`) }}</button>
                    </div>
                </div>
            </div>
            <!-- /alert show option share media -->

            <!-- modal show confirm unfollow -->
            <div class="modal class_modal_show_message toast_z_index" id="modal_confirm_unfollow" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3">
                            <b> {{ $t('new_text_3.status_unfollow') }} {{ d_u_detail_user && d_u_detail_user.type === 'store' ? d_u_detail_user.title : d_u_detail_user.name }} </b> <br>
                        </div>
                        <div class="modal-footer border_unset m-s-c-u-mg">
                            <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
                            <button type="button" @click="follow_or_unfollow('')" class="btn text-primary text-danger"> {{ $t('new_text_3.unfollow') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /modal show confirm unfollow -->

            <!-- Modal show error connection -->
            <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
                <div class="modal-dialog max_width_form mg-mo-auto" role="document">
                    <div class="modal-content">
                        <div class="modal-body break_word_ show_text_status b-s-h-con">
                            <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
                            <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
                        </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" data-bs-dismiss="modal" class="btn text-primary cur_sur"> {{ $t('message.close') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show error connection -->

            <!-- modal Post Filter -->
            <div class="modal fade"  :class="isMobile ? 'style_full_screen' : ''" id="modal_post_filter" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
                <div  class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                    <div class="modal-content " :class="isMobile ? 'modal_content_style' : 'rounded'">
                        <div v-if="isMobile" class="col no_padding fix_app_bar">
                            <div class="_div_nav bg_app_bar_header_">
                                <div id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                                    <button class="btn clear-btn-app-bar" aria-label="Back">
                                        <i class="icon-clear font_click_back"></i>
                                    </button>
                                </div>
                                <div class="col _pad_title_single text-center">
                                    <p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p>
                                </div>
                                <div class="_pad_col_icon">
                                    <button class="btn clear s_pad_clear text-white" @click="clear_filter">
                                        {{ $t('message.clear') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="modal-header m_h_p">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div class="col text-center">
                                <p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p>
                            </div>
                            <div class="_pad_col_icon">
                                <button class="btn clear s_pad_clear " @click="clear_filter">
                                    {{ $t('message.clear') }}
                                </button>
                            </div>
                        </div>

                        <div :class="isMobile ? '' : 'modal-body p-0'">
                            <div class="margin_below_app_bar">
                                <div class="form-group p_div_pad_color max_width_form pb-0 pt-2" :class="isMobile ? 'pt-5' : ''">
                                    <div v-if="!post_filter">
                                        <div v-for="index in 3" :key="index" class="mb-4">
                                            <div class="animated-background mb-2 p_div_ani_w"></div>
                                            <div class="animated-background p_div1_ani_w"></div>
                                        </div>
                                    </div>
                                    <template v-else v-for="(val, key, index) of post_filter" :key="index">
                                        <!-- Short -->
                                        <div v-if="key === 'sort'" class="mb-3 position_relative">
                                            <label class="label"> {{ val.title }} </label>
                                            <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                            <select class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[val.fieldname]">
                                                <option value="">  </option>
                                                <option v-for="option in val.options" :key="option" v-bind:value="option.fieldvalue">
                                                    {{ option.fieldtitle }}
                                                </option>
                                            </select>
                                        </div>
                                        <!-- locations -->
                                        <template v-if="key === 'locations'">
                                            <template v-if="val.locations && val.locations.type === 'group_fields'">
                                                <template v-for="(loc, inx) of val.locations.fields" :key="inx">

                                                    <div class="mb-3 position_relative">
                                                        <label class="label"> {{ loc.title }} </label>
                                                        <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                        <select class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[loc.fieldname]" @change="change_locations($event, '', loc.fieldname)"
                                                                :disabled="
                                                                loc.fieldname === 'province' && locations && locations.data && locations.data.length > 0 ? false :
                                                                (loc.fieldname === 'district' && districts && districts.length > 0 ? false :
                                                                (loc.fieldname === 'commune' && communes && communes.length > 0 ? false : true) )
                                                            ">

                                                            <option value="">  </option>

                                                            <template v-if="loc.fieldname === 'province'">
                                                                <option v-for="location in locations.data" :key="location" :value="location.slug">
                                                                    {{ locale === 'km' ? location.km_name : location.en_name }}
                                                                </option>
                                                            </template>

                                                            <template v-if="loc.fieldname === 'district'">
                                                                <option v-for="dst in districts" :key="dst" :value="dst.slug">
                                                                    {{ locale === 'km' ? dst.km_name : dst.en_name }}
                                                                </option>
                                                            </template>

                                                            <template v-if="loc.fieldname === 'commune'">
                                                                <option v-for="cms in communes" :key="cms" :value="cms.slug">
                                                                    {{ locale === 'km' ? cms.km_name : cms.en_name }}
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>

                                                </template>
                                            </template>
                                            <template v-else-if="val.type === 'select'">
                                                <div class="mb-3 position_relative">
                                                    <label class="label"> {{ val.title }} </label>
                                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                    <select class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[val.fieldname]">
                                                        <option value="">  </option>
                                                        <option v-for="location in locations.data" :key="location" v-bind:value="location.slug">
                                                            {{ locale === 'km' ? location.km_name : location.en_name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </template>
                                        </template>
                                        <!-- prices -->
                                        <template v-if="key === 'prices'">
                                            <div class="mb-3" v-for="(s_p, k, inx) of val" :key="inx">
                                                <div v-if="s_p.type === 'min_max'" class="style_flex">
                                                    <div class="col p-0 mr-2">
                                                        <label class="label"> {{ s_p.title }} </label>
                                                        <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" :placeholder="s_p.min_field ? s_p.min_field.title+' '+ s_p.min_field.prefix.text : ''"
                                                            class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.min_field.fieldname]"
                                                            oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                            maxlength = "11">
                                                    </div>
                                                    <div class="col p-0 ml-2">
                                                        <label class="label text-white">.</label>
                                                        <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" :placeholder="s_p.max_field ? s_p.max_field.title+' '+ s_p.max_field.prefix.text : ''"
                                                            class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.max_field.fieldname]"
                                                            oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                            maxlength = "11">
                                                    </div>
                                                </div>

                                                <div v-else-if="s_p.type === 'switch'">
                                                    <label class="label"> {{ s_p.title }} </label>
                                                    <div class="height_switch">
                                                        <div class="custom-switch pad_switch pt-2 ps-3 d-flex">
                                                            <input type="checkbox" class="custom-control-input" v-model="form[s_p.fieldname]" id="customSwitch1">
                                                            <label class="custom-control-label full_width ml-1 font_16" for="customSwitch1" > {{ form[s_p.fieldname] ? 'Yes' : 'No' }} </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-else-if="s_p.type === 'text'">
                                                    <label class="label"> {{ s_p.title }} </label>
                                                    <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.title"
                                                        class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.fieldname]"
                                                        oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                        maxlength = "11">
                                                </div>
                                            </div>
                                        </template>
                                        <!-- deliveries -->
                                        <div class="mb-3" v-if="key === 'deliveries'">
                                            <label class="label"> {{ val.shipping.title }} </label>
                                            <div class="height_switch">
                                                <div class="custom-switch pad_switch pt-2 ps-3 d-flex">
                                                    <input type="checkbox" class="custom-control-input" v-model="form['shipping']" id="switch_delivery">
                                                    <label class="custom-control-label full_width ml-1 font_16" for="switch_delivery" > {{ form['shipping'] ? 'Yes' : 'No' }} </label>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- fields -->
                                        <template v-if="key === 'fields'">
                                            <div class="mb-3" v-for="(s_f, k, inx) in val" :key="inx">
                                                <!-- type group fields -->
                                                <template v-if="s_f.type === 'group_fields'">
                                                    <template v-for="(g_v, g_k, g_inx) in s_f.fields" :key="g_inx">
                                                        <div v-if="!s_f.chained_field" class="position_relative mb-3">
                                                            <!-- select have icon -->
                                                            <template v-if="g_v.display_icon">
                                                                <label class="label text-left full_width"> {{ g_v.title }} </label>
                                                                <div class="p_selection p_sel_2 text-left m-0" :class="isMobile ? 'field-height' : 'dt-field-height'" @click="show_modal_field_icon(g_v)">
                                                                    <template v-for="p in g_v.options" :key="p">
                                                                        <p class="m-1" v-if="form[g_v.fieldname] === p.fieldvalue"> {{ p.fieldtitle }} </p>
                                                                    </template>
                                                                </div>
                                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option mar_icon_drop"></i>
                                                            </template>
                                                            <!-- select no icon -->
                                                            <template v-else>
                                                                <!-- check type is select -->
                                                                <template v-if="g_v.type === 'select'">
                                                                    <label class="label"> {{ g_v.title }} </label>
                                                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                                    <select @change="change_ad_field(g_v.fieldname)" v-model="form[g_v.fieldname]"
                                                                            class="form-control mb-3 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                                                        <option value="">  </option>
                                                                        <option v-for="option in g_v.options" :key="option" v-bind:value="option.fieldvalue">
                                                                            {{ option.fieldtitle }}
                                                                        </option>
                                                                    </select>
                                                                </template>
                                                                <!-- check type is min_max -->
                                                                <template v-if="g_v.type === 'min_max'">
                                                                    <div class="_flex_">
                                                                        <div class="col p-0 mr-2 position_relative">
                                                                            <label class="label"> {{ g_v.title }} </label>
                                                                            <select v-model="form[g_v.min_field.fieldname]" class="form-control mb-3 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                                                                <option value="">  </option>
                                                                                <option v-for="option in g_v.min_field.options" :key="option" v-bind:value="option.fieldvalue">
                                                                                    {{ option.fieldtitle }}
                                                                                </option>
                                                                            </select>
                                                                            <i class="ion-android-arrow-dropdown min-max-year-obts"></i>
                                                                        </div>
                                                                        <div class="col p-0 ml-2">
                                                                            <label class="label text-white"> . </label>
                                                                            <select v-model="form[g_v.max_field.fieldname]" class="form-control mb-3 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                                                                <option value="">  </option>
                                                                                <option v-for="option in g_v.max_field.options" :key="option" v-bind:value="option.fieldvalue">
                                                                                    {{ option.fieldtitle }}
                                                                                </option>
                                                                            </select>
                                                                            <i class="ion-android-arrow-dropdown min-max-year-obts"></i>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                            </template>
                                                        </div>
                                                        <!-- show field that chained_field exist -->
                                                        <div v-else-if="g_v.chained_field" class="position_relative">
                                                            <label class="label"> {{ g_v.title }} </label>
                                                            <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                            <select class="form-control mb-3 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" :disabled="!form[g_v.chained_field] || arr_ad_model.length === 0" v-model="form[g_v.fieldname]">
                                                                <option value="">  </option>
                                                                <template v-if="form[g_v.chained_field]"> <!-- && s_f.options.length > 0 -->
                                                                    <option v-for="option in g_v.options" :key="option" v-bind:value="option.fieldvalue">
                                                                        {{ option.fieldtitle }}
                                                                    </option>
                                                                </template>
                                                            </select>
                                                        </div>
                                                    </template>
                                                </template>

                                                <!-- type select -->
                                                <template v-else-if="s_f.type === 'select' && s_f.options">
                                                    <!-- show field that chained_field empty -->
                                                    <div v-if="!s_f.chained_field" class="position_relative">
                                                        <!-- select have icon -->
                                                        <template v-if="s_f.display_icon">
                                                            <label class="label text-left full_width"> {{ s_f.title }} </label>
                                                            <div class="p_selection p_sel_2 text-left m-0" :class="isMobile ? 'field-height' : 'dt-field-height'" @click="show_modal_field_icon(s_f)" id="car_brand">
                                                                <template v-for="p in s_f.options" :key="p">
                                                                    <p class="m-1" v-if="form[s_f.fieldname] === p.fieldvalue"> {{ p.fieldtitle }} </p>
                                                                </template>
                                                            </div>
                                                            <i class="ion-android-arrow-dropdown s_icon_in_select_option mar_icon_drop"></i>
                                                        </template>
                                                        <!-- simple select html -->
                                                        <template v-else>
                                                            <label class="label"> {{ s_f.title }} </label>
                                                            <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                            <select @change="change_ad_field(s_f.fieldname)" v-model="form[s_f.fieldname]"
                                                                    class="form-control mb-3 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                                                <option value="">  </option>
                                                                <option v-for="option in s_f.options" :key="option" v-bind:value="option.fieldvalue">
                                                                    {{ option.fieldtitle }}
                                                                </option>
                                                            </select>
                                                        </template>
                                                    </div>
                                                    <!-- show field that chained_field exist -->
                                                    <div v-else-if="s_f.chained_field" class="position_relative">
                                                        <label class="label"> {{ s_f.title }} </label>
                                                        <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                        <select class="form-control mb-3 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" :disabled="!form[s_f.chained_field] || arr_ad_model.length === 0" v-model="form[s_f.fieldname]">
                                                            <option value="">  </option>
                                                            <template v-if="form[s_f.chained_field]">
                                                                <option v-for="option in arr_ad_model" :key="option" v-bind:value="option.fieldvalue">
                                                                    {{ option.fieldtitle }}
                                                                </option>
                                                            </template>
                                                        </select>
                                                    </div>
                                                </template>
                                                <!-- type min_max -->
                                                <div v-else-if="s_f.type === 'min_max'">
                                                    <div v-if="s_f.min_field" class="style_flex mb-3">
                                                        <div class="col p-0 mr-2">
                                                            <label class="label"> {{ s_f.title }} </label>
                                                            <!-- select -->
                                                            <select v-if="s_f.min_field.options" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_f.min_field.fieldname]">
                                                                <option value="">  </option>
                                                                <option v-for="option in s_f.min_field.options" :key="option" v-bind:value="option.fieldvalue">
                                                                    {{ option.fieldtitle }}
                                                                </option>
                                                            </select>
                                                            <!-- input price -->
                                                            <input v-else type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_f.min_field.title"
                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_f.min_field.fieldname]"
                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                maxlength = "11">
                                                        </div>
                                                        <div class="col p-0 ml-2">
                                                            <label class="label"> {{ s_f.max_field.title }} </label>
                                                            <!-- select -->
                                                            <select v-if="s_f.max_field.options" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_f.max_field.fieldname]">
                                                                <option value="">  </option>
                                                                <option v-for="option in s_f.max_field.options" :key="option" v-bind:value="option.fieldvalue">
                                                                    {{ option.fieldtitle }}
                                                                </option>
                                                            </select>
                                                            <!-- input price -->
                                                            <input v-else type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_f.max_field.title"
                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_f.max_field.fieldname]"
                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                maxlength = "11">
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- radio -->
                                                <div v-else-if="s_f.type === 'radio'">
                                                    <label class="label"> {{ s_f.title }} </label>
                                                    <div class="radio-new-or-second-hand text-center row m-0">
                                                        <div class="col p_pad_radio_option">
                                                            <input type="radio" :id="'all_'+form[s_f.fieldname]" v-model="form[s_f.fieldname]" value="">
                                                            <label :for="'all_'+form[s_f.fieldname]"><p class="m-0">{{ $t('message.all') }}</p></label>
                                                        </div>
                                                        <div v-for="va in s_f.options" :key="va" class="col p_pad_radio_option">
                                                            <input type="radio" :id="va.fieldvalue" v-model="form[s_f.fieldname]" :value="va.fieldvalue">
                                                            <label :for="va.fieldvalue"><p class="m-0">{{ va.fieldtitle }}</p></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- text -->
                                                <div v-else-if="s_f.type === 'text'">
                                                    <label class="label"> {{ s_f.title }} </label>
                                                    <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_f.fieldname]"
                                                        maxlength = "11" oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);">
                                                </div>
                                                <!-- type multiple_select -->
                                                <div class="mobile_mul_select" v-else-if="s_f.type === 'multiple_select'">
                                                    <label class="label"> {{ s_f.title }} </label>
                                                    <Multiselect
                                                        v-model="value"
                                                        mode="tags"
                                                        :close-on-select="false"
                                                        :searchable="true"
                                                        :create-option="false"
                                                        :options="options"
                                                    />
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div v-if="isMobile === false" class="modal-footer p-0">
                            <button @click="click_search('')" type="button" class="btn btn-k24-secondary " :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                               {{ $t('message.apply_filter') }} 
                            </button>
                        </div>
                        <template v-if="isMobile"><br><br></template>

                        <div v-if="isMobile" class="nav p_div_apply_filter pt-2">
                            <button @click="click_search" type="button" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                               {{ $t('message.apply_filter') }} 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /modal Post Filter -->

            <!-- Modal show field have icon -->
            <div class="modal style_full_screen u_safety_bg" id="show_modal_field_have_icon" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content"> <!-- animate-bottom -->
                        <div v-if="detail_field" class="s_content overflow_class">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ detail_field.title }} </p>
                                <button class="btn de-btn-plus font_15" @click="clear_select_field_value(detail_field.fieldname, '')">
                                    {{ $t('message.clear') }}
                                </button>
                            </div>
                            <!-- content -->
                            <div v-if="detail_field.options.length > 0" class="modal-body de-head-quick_chat">
                                <ul class="list-unstyled bg-white">
                                    <li v-for="field in detail_field.options" :key="field" @click="select_field_value(detail_field.fieldname, field.fieldvalue)" class="icon_field_tag cur_sur h-v-mouse">
                                        <div class="drop-field-post">
                                            <div class="cate-s-c-1">
                                                <div v-if="detail_field.display_icon" class="width_main_category">
                                                    <img :src="field.icon && field.icon.medium ? field.icon.medium.url : ''" alt="icon">
                                                </div>
                                                <p class="truncate_wrap"> {{ field.fieldtitle }} </p>
                                            </div>
                                            <div v-if="form[detail_field.fieldname] === field.fieldvalue" class="cate-s-c-2">
                                                <i class="fas fa-check-circle parent_color"></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show field have icon -->

            <!-- modal Search -->
            <Modal_search :clear_search_suggestion="clear_val_suggestion_popup"/>
            <!-- /modal Search -->
        </ClientOnly>
    </div>
</template>

<script setup>
    import Multiselect from '@vueform/multiselect'
    import Modal_search from "/components/Pop_up_search_key_word"; // search main
    import helper from "/helper";
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    const runtime_config = useRuntimeConfig();
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const isMobile= ref(helper.m_or_d())

    const loading = ref(false);
    const loading_field = ref(false);
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");
    const empty_img_loading = ref('/icon/img-loader.gif');

    const cookie_view = useCookie('grid_profile'); // useCookie from nuxt3 document.
    const display_list = ref(cookie_view._rawValue ? cookie_view._rawValue : {"type":"grid"});

    const user_data = ref('');
    const sms_or_call = ref('');
    const error_or_success_message = ref(true);
    const message_success = ref('');
    const this_day = ref('');   // store current day.
    const day_status = ref(''); // store status day.
    const connection_error_detail = ref(false);
    const check_screen_device = ref(false);  // true = phone screen,  false = pc
    const click_track_one_time_on_contact = ref(false); // track only one time on contact, if page not reload or change url
    const show_phone_number = ref(false);  // show phone number xxx

    const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again).
    const reset_scroll = ref(1);

    const post_id = ref(''); // store post id
    const share_link = ref(''); // store post link
    const share_post_or_user = ref(''); // declare for check share user or post
    const form = ref({});
    const show_category_name = ref('');
    const clear_val_suggestion_popup = ref(0);
    const post_filter = ref('');
    const value = ref([]);      // ['Select option'],
    const options = ref([]);    // ['Select option', 'Disable me!', 'Reset me!', 'multiple', 'label', 'searchable'],
    const count_badge_search = ref(0);   // count badge filter
    const old_cate_filter = ref([]);     // store old category prevent request again and again.
    const role_mem_type = ref(false);    //  role user type ( 1 or 2 )
    const role_mem_menu = ref(false);    //  role to show categories filter
    const detail_field = ref('');        // detail one field that show in list modal, the fields that have icon.
    const arr_ad_model = ref([]);        // short by ad_field and store data ad_model in this array.
    const detail_one_post = ref('');     // specific post that click icon option in list.
    const data_tracking = ref('');       // store tracking index when click show modal option post.
    // --- report post ---
    const report_post = ref([]);
    const report_post_or_user = ref('');
    // --- report user or store ---
    const report_user_or_store = ref([]);
    const report_check = ref('');
    const description = ref('');
    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(locale);
    const g_recaptcha_response = ref(null)

    const d_u_detail_user = useState('d_u_detail_user', () =>'');
    const d_u_detail_full = useState('d_u_detail_full', () =>'');
    const d_u_contact_phone = useState('d_u_contact_phone', () =>[]);
    const d_u_data_meta = useState('d_u_data_meta', () =>'');

    const d_u_pageSize = useState('d_u_pageSize', () =>0);
    const d_u_post_by_user = useState('d_u_post_by_user', () =>[]);
    const d_u_post_by_user_id = useState('d_u_post_by_user_id', () =>[]);
    const d_u_post_cate_by_user = useState('d_u_post_cate_by_user', () =>'');
    const store_username_for_clear = useState('store_username_for_clear', () =>'');

    const post_sub = ref([]);
    const main_cate = ref([]);
    const refresh_carousel = ref(1);    // key for refresh data in carousel categories when it change value.
    const owl_carousel_drag = ref(0);
    const full_path = ref('');          // full path of url page.

    const locations = ref('');
    const districts = ref([]);          // field districts for modal search query
    const communes = ref([]);           // field communes for modal search query
    const only_province = ref(true);    // true show mul-pro, false single-pro

    const old_arr_locations = ref({ dis: [], com: [] });

    // --- desktop search field ---
    const dt_keyword = ref('');
    const dt_category = ref('');

    const de_user_hide_btn_load_more = useState('de_user_hide_btn_load_more', () => true);
    const dt_loading = ref(false);

    // --- All tab value ---
    // -- tab jobs --
    const post_jobs_by_user_id = ref([]);
    const listing_jobs = ref([]);
    const pageSize_jobs = ref(0);
    // -- tab services --
    const post_services_by_user_id = ref([]);
    const listing_services = ref([]);
    const pageSize_services = ref(0);
    // -- tab members --
    const d_u_members = useState('d_u_members', () => []);
    const members_pageSize = useState('members_pageSize', () => 0);
    const member_empty = ref(false);
    const load_members = ref(false);
    // -- tab photos --
    const list_album = ref([]);
    const all_photos = ref([]);
    const loading_album = ref(false);
    const detail_album = ref('');
    const photo_empty = ref(false);

    const field_search = ref('')

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);  const reload_q_again_2 = ref(0); const reload_q_again_11 = ref(0);
    const reload_q_again_3 = ref(0);  const reload_q_again_4 = ref(0); const reload_q_again_12 = ref(0);
    const reload_q_again_5 = ref(0);  const reload_q_again_6 = ref(0); const reload_q_again_13 = ref(0);
    const reload_q_again_7 = ref(0);  const reload_q_again_8 = ref(0); const reload_q_again_14 = ref(0);
    const reload_q_again_9 = ref(0);  const reload_q_again_10 = ref(0);

    // --- share tracking ---
    const current_index = ref('');
    const placement = ref('');
    const display_type = ref('');
    // const isMobile= ref(true)
    const recaptcha = useRecaptcha();


    // --- arr impression check id ---
    const arr_impression = ref([]);
    const timer_auto_impression = ref('');
    const check_sent = ref(true); // true = allow setInterval; false = not allow setInterval.

    const pa_con = helper.get_params_make_condition(); // get data params condition.

    const google_json_SEO = useState('google_json_SEO', () => '');
    useJsonld(() => (
        google_json_SEO.value
    ));

    if (process.server) {
        await get_detail_user_or_store(); // get detail user in server
        await get_list_post_server();     // get lists post by user in server
        await SEO_google_schema();        // SEO schema
    }

    onBeforeMount(() => {
        if (process.client) {
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            // --- clear old data if old username not equal new username OR have clear old data from params ---
            let is_clear = pa_con && pa_con.clear && pa_con.clear.d_params && pa_con.clear.d_params.clear ? pa_con.clear.d_params.clear : '';
            if ((store_username_for_clear.value !== route.params.username) || is_clear) {
                // console.log('clear');
                d_u_pageSize.value = 0;
                d_u_post_by_user.value = [];
                d_u_post_by_user_id.value = [];
                d_u_detail_user.value = '';
                d_u_detail_full.value = '';
                d_u_contact_phone.value = [];
                store_username_for_clear.value = '';
                d_u_post_cate_by_user.value = '';
                d_u_members.value = [];
                members_pageSize.value = 0;
            }
            helper.clear_params_make_con('clear'); // remove local params condition

        }
    })
    onMounted(() => {
        if (process.client) {
            change_grid();
            // setTimeout(() => { SEO_google_schema(); },1500);

            // -- check if field value "message" exist in localstorage name "params_con_page" --
            setTimeout(() => {
                let msg = pa_con && pa_con.message && pa_con.message.d_params && pa_con.message.d_params.message ? pa_con.message.d_params.message : '';
                if (msg) {
                    show_toast(msg, true); // show toast message success
                    helper.clear_params_make_con('message'); // remove local params condition
                }
            }, 700);

            // -- get detail in client --
            get_detail_user_or_store();
            // -- add fullPath --
            full_path.value = route.fullPath;

            // -- get data from localstorage --
            check_new_auth_user();
            locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : '';

            // -- re-render scroll loader prevent scroll still stuck loading --
            setTimeout(() => {
                reset_scroll.value += 1;
                isInitial.value = true;
            },1000);

            value_desktop_filter(); // check and get value filter from query url in Desktop View

            if (isDesktop && d_u_post_by_user.value.length === 0) {
                load_more_manual(); // In Desktop View and post empty for the first, must get new data.
            }

            // --- Fancybox without hash (not push state history browser) ---
            Fancybox.defaults.Hash = false;

            reload_lazy_img(); // load lazy image.
        }
    })
    onBeforeUnmount(() => {
        Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
    })
    watch(() => route.query, () => { // watch query url change.
        let r_name = helper.clear_prefix_route_name(route.name);
        if (r_name === 'username') { // only in detail_user
            if (route.fullPath !== full_path.value) { // if fullPath old is the same new, Not allow to do. (prevent click "fancybox" of image)
                full_path.value = route.fullPath;

                get_post_filter_by_categories(); // get filter by category or post user.
                find_main_sub_category(); // get sub category from query filter.

                if (!isDesktop) {
                    setTimeout(() => { // setTimeout prevent click back not clear old value search.
                        show_all_posts();  // clear data in list and scroll loader again.
                    }, 150);

                } else { // if desktop view must to auto click manual function
                    dt_loading.value = true; // show loading first when route change in Desktop View.
                    show_all_posts();
                    setTimeout(() => {
                        load_more_manual();
                    },300); // setTimeout Prevent fun "show_all_posts()" not clear data yet.
                }

                value_desktop_filter(); // check and get value filter from query url in Desktop View
            }
        }
    })





    // ---- create SEO google schema ----
    async function SEO_google_schema() {
        let Main_arr = [];
        let f_url = language.value === 'km' ? config.VUE_APP_BASE_URL+'km/' : config.VUE_APP_BASE_URL+'en/'; // current full link of project.
        let empty_img = config.VUE_LINK+empty_img_post.value;
        let seo_sch = d_u_detail_full.value ? d_u_detail_full.value : '';
        let d = seo_sch.data;
        // console.log(seo_sch);

        if (d) {
            // get address of post ads
            let addr = d.contact ? helper.Create_location(d.contact, language.value, 'detail_user') : '';

            // get seller of post ads
            var s_type = d.type === 'store' ? 'Store' : 'Organization';
            var s_link_url = d.username ? f_url+d.username : '';
            var s_name = d.type === 'store' ? (d.title ? d.title : 'Unknown') : (d.name ? d.name : 'Unknown');
            var s_image = d.type === 'store' ? (d.logo && d.logo.medium ? d.logo.medium.url : empty_img) : (d.photo && d.photo.medium ? d.photo.medium.url : empty_img);
            var s_phone_num = d.contact && d.contact.phone && d.contact.phone.length > 0 ? d.contact.phone : ''; // +85512345678
            var s_email = d.contact && d.contact.email ? d.contact.email : ''; // dara@gmail.com
            let profile_sell = helper.GL_SEO_seller(s_type, s_link_url, s_name, s_image, s_phone_num, s_email, addr);
            profile_sell['@context'] = "https://schema.org/";
            Main_arr.push(profile_sell);

            // -- Breadcrumb --
            let nav = [
                { 'name': 'Home', 'link': config.VUE_LINK },
                { 'name': s_name, 'link': '' }
            ];
            let breadcrumbData = helper.GL_SEO_breadcrumb(nav);
            breadcrumbData['@context'] = "https://schema.org/";
            Main_arr.push(breadcrumbData);

            // -- PostList --
            let arr_product = []; let arr_jobs = [];
            let re_seo = d_u_post_by_user.value ? d_u_post_by_user.value : '';

            // console.log(re_seo);
            if (re_seo && re_seo.length > 0) {
                let re_p_data = {"@context": "https://schema.org/"};
                re_p_data["@type"] = "ItemList";
                re_p_data["url"] = s_link_url; // url of the current page
                re_p_data["numberOfItems"] = re_seo.length;
                re_p_data["itemListElement"] = [];
                for (let i = 0; i < re_seo.length; i++) {
                    if (re_seo[i] && re_seo[i].type === 'post') { // only type is "post"
                        let re = re_seo[i].data;
                        // get address of post ads
                        let re_addr = helper.Create_location(re.location, language.value);

                        // get seller of post ads
                        var re_type = re.store ? 'Store' : 'Organization';
                        var re_link_url = re.store && re.store.username ? f_url+re.store.username : (re.user && re.user.username ? f_url+re.user.username : '');
                        var re_name = re.store && re.store.title ? re.store.title : (re.user && re.user.name ? re.user.name : 'Unknown');
                        var re_image = re.store && re.store.logo && re.store.logo.medium ? re.store.logo.medium.url : (re.user && re.user.photo && re.user.photo.medium ? re.user.photo.medium.url : empty_img);
                        var re_phone_num = ''; // +85512345678
                        var re_email = ''; // dara@gmail.com
                        let re_seller = helper.GL_SEO_seller(re_type, re_link_url, re_name, re_image, re_phone_num, re_email, re_addr);

                        // get post ads
                        var re_ad_title = re.title ? re.title : 'Unknown';
                        var re_ad_url = re_ad_title !== 'Unknown' ? f_url+check_title_char(re_ad_title)+'-adid-'+re.id : '';
                        var re_ad_price = re.price ? re.price : '';
                        var re_ad_description = ''; // hExecutive Anvil Description
                        var re_ad_condition = re.condition ? re.condition.value : '';
                        var re_ad_image = re.photos ? re.photos : re_image;
                        var re_ad_category = re.category ? (language.value === 'km' ? re.category.km_name : re.category.en_name) : '';
                        var re_ad_brand = ''; // Toyota
                        var re_ad_model = ''; // Camry 1
                        var re_ad_color = ''; // Red
                        var re_ad_renew_date = re.renew_date ? re.renew_date : '';
                        // -> job ads <-
                        if (re_seo[i].setting && re_seo[i].setting.enable_apply_job) {
                            let re_job_logo = re.photos && re.photos[0] ? re.photos[0] : re_image;
                            let re_job_con = re.condition ? re.condition.value : '';
                            let re_job_description = re_ad_title;
                            let re_job_exp = re.object_highlight_specs ? helper.get_spec_value(re.object_highlight_specs, 'experience') : ''; // get spec (experience).
                            let related_job_ads = helper.GL_SEO_job(re.id, re_ad_url, re_ad_title, re_ad_renew_date, re_ad_category, re_job_con,
                                re_name, re_link_url, re_job_logo, re_ad_price, re_job_description, re_addr, re_job_exp);
                            arr_jobs.push(related_job_ads);

                        // -> post ads <-
                        } else {
                            let related_pro = helper.GL_SEO_product(re_ad_url, re.id, re_ad_title, re_ad_price, re_ad_description, re_ad_condition,
                                re_ad_image, re_ad_category, re_ad_brand, re_ad_model, re_ad_color, re_seller, '');

                            related_pro['position'] = i+1;
                            arr_product.push(related_pro);
                        }
                    }
                }
                // ItemLists
                if (arr_product.length > 0) { // if exist create itemList
                    re_p_data["itemListElement"] = arr_product;
                    Main_arr.push(re_p_data);
                }

                // Jobs
                if (arr_jobs.length > 0) {
                    for (let j = 0; j < arr_jobs.length; j++) {
                        Main_arr.push(arr_jobs[j]);
                    }
                }
            }

            google_json_SEO.value = Main_arr;
            // if(process.client) console.log(JSON.stringify(google_json_SEO.value));
            // console.log(google_json_SEO.value);
        }
    }
    // ---- retry button ----
    function retry_detail() {
      if(window.navigator.onLine) {
        get_detail_user_or_store();
      }
    }
    // ---- get detail User or Store ----
    async function get_detail_user_or_store() {
        if (process.server || window.navigator.onLine) {
            if (!d_u_detail_user.value) { // if detail user have not request again
                connection_error_detail.value = false; // close error connection
                loading.value = true;

                try {
                    const token_auth = useCookie('auth_user')
                    const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';

                    const reqUrl = config.VUE_APP_API_URL_MOBI + 'profiles/' + route.params.username;
                    const { data: res_info_user, error } = await useFetch(reqUrl, {
                        key: reqUrl,
                        headers: { "Access-Token": tokens },
                        params: {
                            fields: 'following,followers,is_follow,id,is_verify,type,username,about,link,contact,cover,logo,online_status,photo,registered_date,verified,description,categories,business_hours,branches,keywords,menu,member_type,is_saved',
                            lang: language.value,
                            meta: true
                        },
                    })

                    if (error.value) {
                        show_page_404(); // show status 404 if request detail user 404.
                    }

                    d_u_detail_user.value = res_info_user.value ? res_info_user.value.data : '';
                    d_u_detail_full.value = res_info_user.value ? res_info_user.value : '';
                    d_u_contact_phone.value = d_u_detail_user.value && d_u_detail_user.value.contact && d_u_detail_user.value.contact.phone_white_operator ? d_u_detail_user.value.contact.phone_white_operator : [];
                    store_username_for_clear.value = d_u_detail_user.value ? d_u_detail_user.value.username : '';
                    d_u_data_meta.value = d_u_detail_full.value ? d_u_detail_full.value.meta : '';  // -- add meta to header dynamic by user --

                    if (process.client) { // prevent in server side show duplicate list post.
                        Tracking(); // tracking user or store
                        check_business_hours(); // detail_user have cache
                        check_role_user_to_show_filter(d_u_detail_user.value); // check role user to show filter search
                    }

                    loading.value = false;

                } catch (er) {
                    if (process.server) {
                        show_page_404(); // show status 404 if request detail user 404.
                        console.log('========> error Profile User <========');
                        console.log(er);
                        console.log('========> /error Profile User <========')

                    } else {
                        if (!er.response) {
                            loading.value = false
                            show_page_404(); // show status 404 if request detail user 404.

                        } else {
                            if (er.response.status === 404) {
                                show_page_404(); // show status 404 if request detail user 404.

                            } else if (er.response.status === 401) { // retry
                                if (reload_q_again_1.value <= 2) {
                                    reload_q_again_1.value += 1;
                                    setTimeout( () => { get_detail_user_or_store(); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({name: 'index'}));
                                }
                            }
                        }
                    }
                }

            } else {
                d_u_data_meta.value = d_u_detail_full.value.meta ? d_u_detail_full.value.meta : '';  // -- add meta to header dynamic by user --

                Tracking(); // tracking user or store
                check_business_hours(); // detail_user have cache
                check_role_user_to_show_filter(d_u_detail_user.value); // check role user to show filter search
            }

        } else {
            loading.value = false
            connection_error_detail.value = true;
        }
    }


    // ---- get list post in server side ----
    async function get_list_post_server() {
      try {
        let q = route.query;
        let query_str = {
          fields: 'thumbnails,thumbnail,location,photos,user,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
          functions: 'save,chat,like,apply_job,shipping',
          offset: d_u_pageSize.value,
          lang: language.value,
        }

        // check keyword from query
        if (q.keyword) { query_str['keyword'] = q.keyword; }
        // check slugCategory
        if (q.category) { query_str['category'] = q.category; }
        // check user
        if (q.user) { query_str['user'] = q.user; }

        // get value and key from v-model to search
        if (Object.keys(form.value).length > 0) {
            for (const [key, val] of Object.entries(form.value)) {
                // query_str[key] = form.value[key];
                if (key === 'category' || key === 'keyword') {
                // when refresh page, it gone all query
                } else {
                    query_str[key] = q[key] ? q[key] : (form.value[key] ? form.value[key] : '');
                }
            }
        } else {
          // console.log('---- 2 ----');
          if (Object.keys(q).length > 0) {
              for (const [k, val] of Object.entries(q)) {
                  if (k === 'category' || k === 'keyword') {
                      // when refresh page, it gone all query
                  } else {
                      query_str[k] = val; // generate key and value for search from query url when form.value not exist
                  }
              }
          }
        }

        // --- check ad_feature is multiple select so reab data tam ning ---
        var data_feature = value.value ? value.value : '';
        if (Array.isArray(data_feature)) {
          for (let i = 0; i < data_feature.length; i++) {
            query_str['ad_features['+i+']'] = data_feature[i];
          }
        } else {
          if (data_feature) {
            query_str['ad_features[0]'] = data_feature;
          }
        }

        check_count_badge_filter(); // count badge filter to show at icon.

        const token_auth = useCookie('auth_user')
        const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
        const reqUrl = config.VUE_APP_URL_POST_NEW + route.params.username + '/feed';
        const { data: res_list_post } = await useFetch(reqUrl, {
          // key: reqUrl,
          headers: { "Access-Token": tokens }, // if user login add access token
          params: query_str,
        })

          if (res_list_post.value) {
              clean_data_post_by_user(res_list_post.value);

              if (isDesktop) { de_user_hide_btn_load_more.value = res_list_post.value.data.length < res_list_post.value.limit ? false : true; } // close button loadMore
          }

      } catch (e) {
        console.log('-------> Error posts list <-------')
        console.log(e)
      }
    }
    // ---- clean data post by user ----
    function clean_data_post_by_user(d) {
        let data = d.data;
        if (data.length) {
            let arr_tmp = [];
            for (const [key, value] of Object.entries(data)) {
                let id_p = parseInt(value.data.id);
                if (!d_u_post_by_user_id.value.includes(id_p)) {   // if not exist ( function check => indexOf or includes or some )
                    d_u_post_by_user_id.value.push(id_p);          // push id of post prevent show duplicate when sever clear cache
                    arr_tmp.push(value);
                }
            }
            // if have arr_tmp
            if (arr_tmp.length > 0) { d_u_post_by_user.value = d_u_post_by_user.value.concat(arr_tmp); } // concat in multiple array
        }
        d_u_pageSize.value += d.limit; // add offset
    }
    // ---- get Post ----
    async function get_user_or_store_post({loaded, error, noMore, noResults}, { isFirstLoad }) {
        // prevent post smaller then pageSize and still request when lick back to this page again
        if (d_u_pageSize.value !== 0 && d_u_post_by_user.value.length < d_u_pageSize.value) {
            if (d_u_post_by_user.value.length === 0) {
                noResults(); // close loading, show status no result
            } else {
                noMore(); // close loading
            }
            // console.log('not allow to request more');

        } else {
            // console.log('request more');
            check_new_auth_user();
            let q = route.query;
            let query_str = {
                fields: 'thumbnails,thumbnail,location,photos,user,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                functions: 'save,chat,like,apply_job,shipping',
                offset: d_u_pageSize.value,
                lang: language.value,
            }

            // check keyword from query
            if (q.keyword) { query_str['keyword'] = q.keyword; }
            // check slugCategory
            if (q.category) { query_str['category'] = q.category; }
            // check user
            if (q.user) { query_str['user'] = q.user; }

            // get value and key from v-model to search
            if (Object.keys(form.value).length > 0) {
                $.each(form.value, (key, val) => {
                    // query_str[key] = form.value[key];
                    if (key === 'category' || key === 'keyword') {
                        // when refresh page, it gone all query
                    } else {
                        query_str[key] = q[key] ? q[key] : form.value[key];
                    }
                });
                // console.log('---- 1 ----');

            // if form.value not exist must to create query from url, if have search in url
            } else {
                // console.log('---- 2 ----');
                if (Object.keys(q).length > 0) {
                    $.each(q, (k, val) => {
                        if (k === 'category' || k === 'keyword') {
                            // when refresh page, it gone all query
                        } else {
                            query_str[k] = val; // generate key and value for search from query url when form.value not exist
                        }
                    });
                }
            }

            // --- check ad_feature is multiple select so reab data tam ning ---
            var data_feature = value.value ? value.value : '';
            if (Array.isArray(data_feature)) {
                for (let i = 0; i < data_feature.length; i++) {
                    query_str['ad_features['+i+']'] = data_feature[i];
                }
            } else {
                if (data_feature) {
                    query_str['ad_features[0]'] = data_feature;
                }
            }

            check_count_badge_filter(); // count badge filter to show at icon.

            $fetch(config.VUE_APP_API_URL_POST_NEW + route.params.username + '/feed', {
                headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' }, // if user login add access token
                params: query_str,
            }).then(res => {

                clean_data_post_by_user(res);

                // -- tracking on google analytic --
                if (d_u_post_by_user.value.length <= 30 && d_u_pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
                else { track_google_analytics(d_u_pageSize.value > 30 ? d_u_pageSize.value-30 : 0,'home'); }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) { // data request empty
                    if (d_u_post_by_user.value.length === 0) { // check in list have item or not
                        if (isFirstLoad) {
                            noResults();  // console.log('noResult');
                        } else {
                            noMore();  // console.log('noMore');
                        }
                    } else {
                        noMore();  // console.log('noMore 1')
                    }
                } else { 
                    loaded(); // console.log('loaded'); // scroll down load more.
                }

                reload_lazy_img(); // load lazy image.

            }).catch(e => {
                if (!e.response) {
                    error();
                } else {
                    let check = e.response;
                    let d_c = JSON.stringify(check);
                    let d_p = JSON.parse(d_c);

                    if (check.status === 404) {
                        show_toast(d_p._data.message, false);

                    } else if (check.status === 401) { // retry
                        if (reload_q_again_2.value <= 2) {
                            reload_q_again_2.value += 1;
                            setTimeout( () => { loaded(); }, 3000);
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

    // ---- show post by search (Desktop View) ----
    function load_more_manual() {
        check_new_auth_user();
        dt_loading.value = true;

        let q = route.query;
        let query_str = {
          fields: 'thumbnails,thumbnail,location,photos,user,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
          functions: 'save,chat,like,apply_job,shipping',
          offset: d_u_pageSize.value,
          lang: language.value,
        }

        // check keyword from query
        if (q.keyword) { query_str['keyword'] = q.keyword; }
        // check slugCategory
        if (q.category) { query_str['category'] = q.category; }
        // check user
        if (q.user) { query_str['user'] = q.user; }

        // get value and key from v-model to search
        if (Object.keys(form.value).length > 0) {
          $.each(form.value, (key, val) => {
            // query_str[key] = form.value[key];
            if (key === 'category' || key === 'keyword') {
            // when refresh page, it has gone all query
            } else {
              query_str[key] = q[key] ? q[key] : form.value[key];
            }
          });
          // console.log('---- 1 ----');

        // if form.value not exist have to create query from url, if it has search in url
        } else {
          // console.log('---- 2 ----');
          if (Object.keys(q).length > 0) {
            $.each(q, (k, val) => {
              if (k === 'category' || k === 'keyword') {
                // when refresh page, it gone all query
              } else {
                query_str[k] = val; // generate key and value for search from query url when form.value not exist
              }
            });
          }
        }

        // --- check ad_feature is multiple select so reab data tam ning ---
        var data_feature = value.value ? value.value : '';
        if (Array.isArray(data_feature)) {
          for (let i = 0; i < data_feature.length; i++) {
            query_str['ad_features['+i+']'] = data_feature[i];
          }
        } else {
          if (data_feature) {
            query_str['ad_features[0]'] = data_feature;
          }
        }

        check_count_badge_filter(); // count badge filter to show at icon.

        $fetch(config.VUE_APP_API_URL_POST_NEW + route.params.username + '/feed', {
            headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' }, // if user login add access token
            params: query_str,

        }).then(res => {
            clean_data_post_by_user(res);
            // -- tracking on google analytic --
            if (d_u_post_by_user.value.length <= 30 && d_u_pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(d_u_pageSize.value > 30 ? d_u_pageSize.value-30 : 0,'home'); }

            // -- close loading --
            de_user_hide_btn_load_more.value = d_u_post_by_user.value.length < d_u_pageSize.value ? false : true; // close button loadMore
            dt_loading.value = false;

            reload_lazy_img(); // load lazy image.

        }).catch(e => {
            if (!e.response) {

            } else {
                let check = e.response;
                let d_c = JSON.stringify(check);
                let d_p = JSON.parse(d_c);
                if (check.status === 404) {
                    show_toast(d_p._data.message, false);
                } else if (check.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout( () => { load_more_manual(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
            dt_loading.value = false;
        });
    }

    // ---- show modal options post ----
    function show_options(post_detail, tracking) {
        detail_one_post.value = post_detail;
        data_tracking.value = tracking;
        $('#show_modal_actions_post').modal('show');
    }
    // ---- click view profile ----
    function view_profile() {
        let the_id = 'pro_'+detail_one_post.value.data.id+'_user_'+detail_one_post.value.data.user.id;
        document.getElementById(the_id).click();
    }
    // ---- click share post ----
    function share_manual_post() {
        $('#show_modal_actions_post').modal('hide');
        let the_id = 'share_'+detail_one_post.value.data.id;
        document.getElementById(the_id).click();
    }
    // ---- report manual post ----
    function report_manual_post() {
        if (window.navigator.onLine) {
            report_post_or_user.value = 'post'; // condition post

            // -- clear data when open new modal --
            description.value = '';
            report_check.value = '';
            $('#description').removeClass('error_field_text_report');
            $('#error_description').addClass('d-none');
            $('#show_modal_actions_post').modal('hide');

            if (!localStorage.getItem("report_post")) {
                loading_field.value = true;
                $fetch(config.VUE_APP_API_URL + 'feedbacks/post_reasons',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                }).then(response => {
                    const object = {
                        data: response.data,
                        expiry: helper.Date_To_Timestamp('', 86400, 'seconds'), // add 1 day
                    }
                    localStorage.setItem("report_post", JSON.stringify(object));
                    report_user_or_store.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
                    $('#show_modal_list_report_user_or_store').modal('show');

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_14.value < 2) {
                            reload_q_again_14.value += 1;
                            setTimeout( () => { report_manual_post(); }, 3000);
                        } else {
                            loading_field.value = false;
                            $('#modal_show_status_error_connection').modal('show');
                        }

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_14.value <= 2) {
                            reload_q_again_14.value += 1;
                            setTimeout( () => { report_manual_post(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }).finally(() => (loading_field.value = false));
            } else {
                report_user_or_store.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
                $('#show_modal_list_report_user_or_store').modal('show');
            }

        } else {
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- /report manual post ----
    // ---- save or unsaved manual post ----
    function save_manual_post(save_or_unsaved, confirm_unsaved) {
        check_new_auth_user();
        let d_post = detail_one_post.value.data;
        let track_index = data_tracking.value; // { current_index: index, placement: 'profile', display_type: 'grid' }

        if (window.navigator.onLine) {
            if (user_data.value && user_data.value.tokens.access_token) { // if have auth user
                if (save_or_unsaved === 'save') {
                    loading_field.value = true;
                    $fetch(config.VUE_APP_API_URL + 'me/saved', {
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        params: {lang: language.value},
                        body: new URLSearchParams({ id: d_post.id })

                    }).then(res => {
                        for (let i = 0; i < d_u_post_by_user.value.length; i ++) {
                            if (d_u_post_by_user.value[i].data.id === d_post.id) {
                                d_u_post_by_user.value[i].data.is_saved = true;
                                break;
                            }
                        }

                        setTimeout(() => { $('#show_modal_actions_post').modal('hide'); },100);

                        track_action_on_post('save', d_post.id, d_u_post_by_user.value.length, d_u_pageSize.value, track_index.current_index, track_index.placement, track_index.display_type);

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_13.value < 2) {
                                reload_q_again_13.value += 1;
                                setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved) }, 3000);
                            } else {
                                loading_field.value = false;
                                $('#modal_show_status_error_connection').modal('show');
                            }

                        } else if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_13.value <= 2) {
                                reload_q_again_13.value += 1;
                                setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved) }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }
                        }
                    }).finally(() => (loading_field.value = false));

                } else {
                    if (confirm_unsaved) {
                        loading_field.value = false;
                        $('#modal_confirm_unsaved').modal('show');
                    } else {
                        loading_field.value = true;
                        $fetch(config.VUE_APP_API_URL + 'me/saved', {
                            params: {id: d_post.id},
                            headers: {"Access-Token": user_data.value.tokens.access_token},
                            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                            method: 'DELETE',
                        }).then(res => {
                            for (let i = 0; i < d_u_post_by_user.value.length; i ++) {
                                if (d_u_post_by_user.value[i].data.id === d_post.id) {
                                    d_u_post_by_user.value[i].data.is_saved = false;
                                    break;
                                }
                            }

                            setTimeout(() => { $('#modal_confirm_unsaved').modal('hide'); $('#show_modal_actions_post').modal('hide'); },100);

                            track_action_on_post('unsave', d_post.id, d_u_post_by_user.value.length, d_u_pageSize.value, track_index.current_index, track_index.placement, track_index.display_type);

                        }).catch(error => {
                            if (!error.response) {
                                if (reload_q_again_13.value < 2) {
                                    reload_q_again_13.value += 1;
                                    setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                                } else {
                                    loading_field.value = false;
                                    $('#modal_show_status_error_connection').modal('show');
                                }

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_13.value <= 2) {
                                    reload_q_again_13.value += 1;
                                    setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({name: 'index'}));
                                }
                            }
                        }).finally(() => (loading_field.value = false));
                    }
                }

            // --- if dont have auth user go to login ---
            } else {

                track_action_on_post('save', d_post.id, d_u_post_by_user.value.length, d_u_pageSize.value, track_index.current_index, track_index.placement, track_index.display_type);

                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'save',
                    expire: expired,
                    data: {post_id: d_post.id},
                    from: {name: 'detail_user'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
                $('#show_modal_actions_post').modal('hide'); 
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- /save or unsaved manual post ----
    // ---- follow or unfollow ----
    function follow_or_unfollow(confirm) {

        let url = '';
        if (d_u_detail_user.value) {
            if (d_u_detail_user.value.is_follow) {
                url = 'unfollow';
                if (confirm) {
                    $('#modal_confirm_unfollow').modal('show'); return;
                }
            } else {
                url = 'follow';
            }
        }

        if (window.navigator.onLine) {
            if (user_data.value && user_data.value.tokens.access_token) { // if have auth user
                loading_field.value = true;
                $fetch(config.VUE_APP_API_URL + 'me/' + url, {
                    headers: {"Access-Token": user_data.value.tokens.access_token},
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    method: 'POST',
                    params: {lang: language.value},
                    body: new URLSearchParams({id: d_u_detail_user.value.id, type: d_u_detail_user.value.type})
                }).then(res => {
                    let change = url === 'follow' ? true : false;
                    let add_or_minus_followers = url === 'follow' ? parseInt(d_u_detail_user.value.followers) + 1 : parseInt(d_u_detail_user.value.followers) - 1;
                    // add or minus followers
                    d_u_detail_user.value.followers = add_or_minus_followers;
                    d_u_detail_full.value.data.followers = add_or_minus_followers;
                    // change is_follow to true or false
                    d_u_detail_user.value.is_follow = change;
                    d_u_detail_full.value.data.is_follow = change;
                    d_u_detail_user.value = d_u_detail_user.value;

                    show_toast(res.message, true); // show toast message success.

                    $('#modal_confirm_unfollow').modal('hide'); // close modal confirm.
                    $('#modal_show_option_user_or_store').modal('hide'); // close modal confirm options user or store.

                }).catch(e => {
                    if (!e.response) {
                        show_toast('Something went wrong', false);
                    } else {
                        let check = e.response;
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check.status === 401) { // retry
                            if (reload_q_again_5.value <= 2) {
                                reload_q_again_5.value += 1;
                                setTimeout(() => { follow_or_unfollow(confirm); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }
                        } else if (check.status === 403) {
                            show_toast(data_parse._data.message, false);
                        }
                    }
                }).finally(() => (loading_field.value = false));

            // --- if dont have auth user go to login ---
            } else {

                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'follow',
                    expire: expired,
                    data: {user_id: d_u_detail_user.value.id, type: d_u_detail_user.value.type, name: d_u_detail_user.value.type === 'store' ? d_u_detail_user.value.title : d_u_detail_user.value.name},
                    from: {name: 'detail_user'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- save or unsaved user or store ----
    function save_user(save_or_unsaved, confirm_unsaved) {
        check_new_auth_user();
        let user = d_u_detail_user.value;

        if (window.navigator.onLine) {
            if (user_data.value && user_data.value.tokens.access_token) { // if have auth user
                if (save_or_unsaved === 'save') { // save
                    loading_field.value = true;
                    $fetch(config.VUE_APP_API_URL + 'me/saved', {
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        params: {lang: language.value},
                        body: new URLSearchParams({id: user.id, type: user.type})
                    }).then(res => {
                        d_u_detail_user.value.is_saved = true;
                        d_u_detail_full.value.data.is_saved = true;
                        $('#modal_show_option_user_or_store').modal('hide'); // close modal option user or store.

                        show_toast(res.message, true); // show toast message success.

                        tracking_manual('save'); // tacking save user profile.

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_9.value < 2) {
                                reload_q_again_9.value += 1;
                                setTimeout( () => { save_user(save_or_unsaved, confirm_unsaved); }, 3000);
                            } else {
                                loading_field.value = false;
                                $('#modal_show_status_error_connection').modal('show');
                            }
                        } else {
                            let check = error.response;
                            let data_check = JSON.stringify(check);
                            let data_parse = JSON.parse(data_check);
                            if (check.status === 401) { // retry
                                if (reload_q_again_9.value <= 2) {
                                    reload_q_again_9.value += 1;
                                    setTimeout( () => { save_user(save_or_unsaved, confirm_unsaved); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({name: 'index'}));
                                }
                            } else if (check.status === 403) {
                                show_toast(data_parse._data.message, false);
                            }
                        }
                    }).finally(() => (loading_field.value = false));

                } else { // unsaved
                    if (confirm_unsaved) {
                        loading_field.value = false;
                        $('#confirm_unsaved_store').modal('show');
                    } else {
                        loading_field.value = true;
                        $fetch(config.VUE_APP_API_URL + 'me/saved', {
                            params: {id: user.id, type: user.type, lang: language.value},
                            headers: {"Access-Token": user_data.value.tokens.access_token},
                            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                            method: 'DELETE',
                        }).then(res => {
                            d_u_detail_user.value.is_saved = false;
                            d_u_detail_full.value.data.is_saved = false;
                            $('#modal_show_option_user_or_store').modal('hide'); // close modal option user or store.
                            $('#confirm_unsaved_store').modal('hide'); // close modal confirm remove store.

                            show_toast(res.message, true); // show toast message success.

                            tracking_manual('unsave'); // tacking unsave user profile.

                        }).catch(error => {
                            if (!error.response) {
                                if (reload_q_again_9.value < 2) {
                                    reload_q_again_9.value += 1;
                                    setTimeout( () => { save_user(save_or_unsaved, confirm_unsaved); }, 3000);
                                } else {
                                    loading_field.value = false;
                                    $('#modal_show_status_error_connection').modal('show');
                                }
                            } else {
                                let check = error.response;
                                let data_check = JSON.stringify(check);
                                let data_parse = JSON.parse(data_check);
                                if (check.status === 401) { // retry
                                    if (reload_q_again_9.value <= 2) {
                                        reload_q_again_9.value += 1;
                                        setTimeout( () => { save_user(save_or_unsaved, confirm_unsaved); }, 3000);
                                    } else {
                                        localStorage.removeItem('auth_user');   // remove localStorage
                                        VueCookieNext.removeCookie('auth_user');
                                        router.replace(localePath({name: 'index'}));
                                    }
                                } else if (check.status === 403) {
                                    show_toast(data_parse._data.message, false);
                                }
                            }
                        }).finally(() => (loading_field.value = false));
                    }
                }

            // --- if dont have auth user go to login ---
            } else {

                tracking_manual('save'); // tracking save.

                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'save_store',
                    expire: expired,
                    data: {user_id: user.id, type: user.type},
                    from: {name: 'detail_profile'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- /save or unsaved user or store ----
    // ---- show toast success or danger ----
    function show_toast(message, is_success) {
        // -- show toast success --
        message_success.value = message;
        error_or_success_message.value = is_success;
        let toast = $('.toast');
        toast.removeClass('d-none');
        toast.toast({delay: 6000});
        toast.toast('show');
    }
    // ---- show followers or following ----
    function show_follows(condition, enable_click) {
        if (enable_click) {
            router.push(localePath({ name: 'username-follows', params: { username: d_u_detail_user.value.username }, query: { type: condition } }));
            save_track_optional('clear', { clear: 'clear_data' });
        }
    }
    // ---- show modal search ----
    function show_pop_up_search() {
      $('#show_modal_saerch').modal('show');
      $('#_search_').focus();

      // change prop value to clear suggestion on search popup
      clear_val_suggestion_popup.value++; // if value change, then action else no action.
    }
    // ---- clear keyword ----
    function clear_keyword() {
      let obj = {};
      $.each(route.query, (key, val) => { // clear keyword
        if (key !== 'keyword') {
          obj[key] = val;
        }
      });
      router.replace(localePath({ name: 'username', query: obj }));
    }
    // ---- check number only ----
    function onlyNumber ($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) || keyCode === 46) { // 46 is dots
        $event.preventDefault();
      }
    }
    // ---- change discount or shipping ----
    function change_quick_search(con) {
      // this.form['shipping'] = $('#radio_delivery').is(':checked');
      let R = route.query;
      if (con === 'discount') {
        form.value['discount'] = R.discount !== 'true' ? true : false;
      } else {
        form.value['shipping'] = R.shipping !== 'true' ? true : false;
      }
      setTimeout(() => { click_search(''); },200); // click search btn.
    }
    // ---- show modal all location ----
    function show_all_locations() {
      $('#show_modal_list_location').modal('show');
    }
    // ---- click on location in modal location or click clear ----
    function click_choose_location(condition, slug) {
      $('#show_modal_list_location').modal('hide');  // close modal all location.
      $('body').removeClass('modal-open'); // remove class at body tag, when modal close.
      form.value['province'] = condition ? slug : ''; // if condition exist add slug to field province, else clear province.

      change_locations('', form.value['province'],'province'); // to get districts data

      setTimeout(() => { click_search(''); },200); // click search btn.
    }

    // ---- click show phone numbers user for Call or SMS ----
    function dialog_phone_number(data_sms_or_call) {

      tracking_manual(data_sms_or_call === 'call' ? 'call' : 'sms'); // tracking SMS or Call.

      $('#modal_show_option_user_or_store').modal('hide'); // prevent click from modal option
      setTimeout(function(){ $('body').addClass('modal-open'); }, 600);

      sms_or_call.value = data_sms_or_call;
      $('#modal_show_phone_or_sms').modal('show');
      setTimeout(function () { $(".cl_ripple").ripple(); }, 1500);
    }

    // ---- click like post ----
    function click_like(id, like_or_dislike, data) {
      detail_one_post.value = data && data.data_post ? data.data_post : '';
      check_new_auth_user();
      if (window.navigator.onLine) {
        if (user_data.value) {
          loading_field.value = true;
          if (like_or_dislike) {        // -- dislike --
            $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
              method: 'DELETE',
              params: {id: id},
              headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''},
            }).then(res => {

              // tracking Unlike
              track_action_on_post('unlike', id, d_u_post_by_user.value.length, d_u_pageSize.value, data.current_index, data.placement, data.display_type);

              $.each(d_u_post_by_user.value, (key, value) => {
                if (parseInt(value.data.id) === parseInt(id)) {
                  d_u_post_by_user.value[key].data.is_like = false;
                  return;
                }
              });
            }).catch(error => {
              if (!error.response) {
                if (reload_q_again_3.value < 2) {
                  reload_q_again_3.value += 1;
                  setTimeout( () => { click_like(id, like_or_dislike, data); }, 3000);
                } else {
                  loading_field.value = false
                  $('#modal_show_status_error_connection').modal('show');
                }

              } else {
                if (error.response && error.response.status === 404) { // if like 404, set like to false
                  $.each(d_u_post_by_user.value, (key, value) => {
                    if (parseInt(value.data.id) === parseInt(id)) {
                      d_u_post_by_user.value[key].data.is_like = false;
                      return;
                    }
                  });

                } else if (error.response && error.response.status === 401) { // retry
                  if (reload_q_again_3.value <= 2) {
                    reload_q_again_3.value += 1;
                    setTimeout( () => { click_like(id, like_or_dislike, data); }, 3000);
                  } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                  }
                }
              }
            }).finally(() => (loading_field.value = false));

          } else {                      // -- like --
            $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
              headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''},
              params: {lang: language.value},
              method: 'POST',
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
              body: new URLSearchParams({id: id})
            }).then(res => {

              // tracking Like
              track_action_on_post('like', id, d_u_post_by_user.value.length, d_u_pageSize.value, data.current_index, data.placement, data.display_type);

              $.each(d_u_post_by_user.value, (k, val) => {
                if (parseInt(val.data.id) === parseInt(id)) {
                  d_u_post_by_user.value[k].data.is_like = true;
                  return;
                }
              });
            }).catch(error => {
              if (!error.response) {
                if (reload_q_again_4.value < 2) {
                  reload_q_again_4.value += 1;
                  setTimeout( () => { click_like(id, like_or_dislike, data); }, 3000);
                } else {
                  loading_field.value = false
                  $('#modal_show_status_error_connection').modal('show');
                }

              } else {
                if (error.response && error.response.status === 404) { // if like 404, set like to false
                  $.each(d_u_post_by_user.value, (key, value) => {
                    if (parseInt(value.data.id) === parseInt(id)) {
                      d_u_post_by_user.value[key].data.is_like = false;
                      return;
                    }
                  });

                } else if (error.response && error.response.status === 401) { // retry
                  if (reload_q_again_4.value <= 2) {
                    reload_q_again_4.value += 1;
                    setTimeout( () => { click_like(id, like_or_dislike, data); }, 3000);
                  } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                  }
                }
              }
            }).finally(() => (loading_field.value = false));
          }
        } else {

          // tracking like if not login yet
          track_action_on_post('like', id, d_u_post_by_user.value.length, d_u_pageSize.value, data.current_index, data.placement, data.display_type);

          // create state when login completed
          let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
          let arr_save_state = {
            action: 'like',
            expire: expired,
            data: {post_id: id},
            from: {name: 'detail_user'}
          }
          localStorage.setItem("save_state", JSON.stringify(arr_save_state));
          router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
        }

      } else {
        loading_field.value = false
        $('#modal_show_status_error_connection').modal('show');
      }
    }
    // ---- /click like post ----

    // ---- function report user or store ----
    function report_on_user_or_store(next_page) {
        if (window.navigator.onLine) {
            if (next_page) {
                $('#modal_show_option_user_or_store').modal('hide');
                router.push(localePath({ name: 'username-report', params: { username: d_u_detail_user.value.username }, query: { from: 'profile' } }));
            } else {
                report_post_or_user.value = 'user_or_store'; // condition user or store

                $('#modal_show_option_user_or_store').modal('hide');
                // -- clear data when open new modal --
                description.value = '';
                report_check.value = '';
                $('#description').removeClass('error_field_text_report');
                $('#error_description').addClass('d-none');

                let url = ''; let check_localstorage = '';
                if (d_u_detail_user.value.type === 'user') {
                    url = 'feedbacks/user_reasons';
                    check_localstorage = "report_user";
                } else {
                    url = 'feedbacks/store_reasons';
                    check_localstorage = "report_store";
                }

                if (!localStorage.getItem(check_localstorage)) {
                    loading_field.value = true;
                    $fetch(config.VUE_APP_API_URL + url,{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    }).then(response => {
                        const object = {
                            data: response.data,
                            expiry: helper.Date_To_Timestamp('', 86400, 'seconds'),  // add 1 day
                        }
                        localStorage.setItem(check_localstorage, JSON.stringify(object));
                        report_user_or_store.value = localStorage.getItem(check_localstorage) ? JSON.parse(localStorage.getItem(check_localstorage)) : [];
                        $('#show_modal_list_report_user_or_store').modal('show');
                        setTimeout(function(){ $('body').addClass('modal-open'); }, 600);
                        // -- remove error in text area --
                        $('#description').removeClass('error_field_text_report');
                        $('#error_description').addClass('d-none');

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_5.value < 2) {
                                reload_q_again_5.value += 1;
                                setTimeout( () => { report_on_user_or_store(next_page); }, 3000);
                            } else {
                                loading_field.value = false;
                                $('#show_modal_list_report_user_or_store').modal('hide'); // hide report post modal
                                $('#modal_show_status_error_connection').modal('show');   // show connection error
                            }

                        } else if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_5.value <= 2) {
                                reload_q_again_5.value += 1;
                                setTimeout( () => { report_on_user_or_store(next_page); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }
                        }
                    }).finally(() => (loading_field.value = false));
                } else {
                    report_user_or_store.value = localStorage.getItem(check_localstorage) ? JSON.parse(localStorage.getItem(check_localstorage)) : [];
                    $('#show_modal_list_report_user_or_store').modal('show');
                    setTimeout(function(){ $('body').addClass('modal-open'); }, 600);
                }
            }
        } else {
            loading_field.value = false;
            $('#show_modal_list_report_user_or_store').modal('hide'); // hide report post modal
            $('#modal_show_status_error_connection').modal('show');   // show connection error
        }
    }
    // choose report
    function choose_report(reason) {
      if (reason === 'other' && !description.value) {
        $('#description').focus();
        description.value = '';
      }
      $('#description').removeClass('error_field_text_report');
      $('#error_description').addClass('d-none');
      report_check.value = reason;
    }
    // click submit report
    async function report_submit() {
      if (window.navigator.onLine) {
        const token = await recaptcha('login');
        let url = '', form_data = {};
        if (report_post_or_user.value === 'post') { // url report "Post".
          url = 'feedbacks/posts';
          form_data = { id: detail_one_post.value.data.id, reason: report_check.value, description: description.value };

        } else {  // url report "User Or Store".
          if (d_u_detail_user.value.type === 'user') {
            url = 'feedbacks/users';
          } else {
            url = 'feedbacks/stores';
          }
          form_data = { id: d_u_detail_user.value.id, reason: report_check.value, description: description.value };
        }

        loading_field.value = true;
        if(token !== undefined){
            form_data['g-recaptcha-response'] = token
        }

        $fetch(config.VUE_APP_API_URL + url,{
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          method: 'POST',
          body: new URLSearchParams(form_data)
        }).then(res => {
          // -- hide modal report post --
          $('#show_modal_list_report_user_or_store').modal('hide');
          // -- clear old report data --
          description.value = '';
          report_check.value = '';
          // -- show toast success --
          show_toast('', true);

        }).catch(error => {
          if (!error.response) {
            if (reload_q_again_6.value < 2) {
              reload_q_again_6.value += 1;
              setTimeout( () => { report_submit(); }, 3000);
            } else {
              loading_field.value = false;
              $('#show_modal_list_report_user_or_store').modal('hide');
              $('#modal_show_status_error_connection').modal('show');   // show connection error
            }

          } else {
              let check = error.response ? error.response : ''; // original data error
              let data_check = JSON.stringify(check);
              let data_parse = JSON.parse(data_check);
            if (check.status === 422) {
              $('#description').addClass('error_field_text_report');
              $('#error_description').removeClass('d-none');
              $('#error_description').text(data_parse._data.message);
              // show toast danger
              show_toast(data_parse._data.message, false);

            } else if (check.status === 401) { // retry
              if (reload_q_again_6.value <= 2) {
                reload_q_again_6.value += 1;
                setTimeout( () => { report_submit(); }, 3000);
              } else {
                localStorage.removeItem('auth_user');   // remove localStorage
                VueCookieNext.removeCookie('auth_user');
                router.replace(localePath({name: 'index'}));
              }
            }
          }
        }).finally(() => (loading_field.value = false));

      } else {
        loading_field.value = false;
        $('#show_modal_list_report_user_or_store').modal('hide');
        $('#modal_show_status_error_connection').modal('show');   // show connection error
      }
    }
    // close report
    function close_report_modal() {  $('#show_modal_list_report_user_or_store').modal('hide');  }
    // required report
    function show_required_report() {
        if (report_check.value === 'other' && !description.value) {
            $('#description').addClass('error_field_text_report');
            $('#error_description').removeClass('d-none');
        } else {
            show_toast(language.value === 'km' ? 'សូមជ្រើសរើសហេតុផល' : 'Please select reason', false);
        }
    }
    // ---- /function report user or store ----

    // ---- reload lazy load ----
    function reload_lazy_img() {
        setTimeout(() => {
            $('img.lazy').Lazy({delay:5000, combined:true});
        },750);
    }

    // ---- Desktop Button Search ----
    function dt_btn_search() {
        setTimeout(() => { click_search(); },200); // click search btn.
    }
    function value_desktop_filter() {
        if (isDesktop) {
            dt_keyword.value = route.query.keyword ? route.query.keyword : '';
            dt_category.value = route.query.category ? route.query.category : '';
            form.value['province'] = route.query.province ? route.query.province : '';
        }
    }
    function selected_action_on_model(fieldname, fieldvalue) {
      form.value[fieldname] = fieldvalue;       // add value to field name in form data.
      click_search('');
    }
    // ---- /Desktop Button Search ----

    // ---- convert title to use in url ----
    function check_title_char(title) { return helper.check_special_char(title); }
    // ---- show option modal ----
    function show_option_user_or_store() { $('#modal_show_option_user_or_store').modal('show'); }
    // ---- copy link (do the same function not working if separate function by id it work simple) ----
    function click_copy(link) {

      let Url = document.getElementById('copy_link');
      Url.value = link;
      Url.select();
      document.execCommand('copy');
      document.getElementById('copy_link').blur();

      if (placement.value && display_type.value) {  // tracking copy_link posts.
        track_action_on_post('copy_link', post_id.value, d_u_post_by_user.value.length, d_u_pageSize.value, current_index.value, placement.value, display_type.value);
      } else {
        tracking_manual('copy_link'); // tracking copy_link profile.
      }
      show_toast('Link copied to clipboard', true);
    }
    function click_copy_1() {
      let Url = document.getElementById('copy_link_1');
      Url.value = share_link.value; // get detail link of post
      Url.select();
      document.execCommand('copy');
      document.getElementById('copy_link_1').blur();

      if (placement.value && display_type.value) {  // tracking copy_link posts.
        track_action_on_post('copy_link', post_id.value, d_u_post_by_user.value.length, d_u_pageSize.value, current_index.value, placement.value, display_type.value);
      } else {
        tracking_manual('copy_link'); // tracking copy_link profile.
      }
      show_toast('Link copied to clipboard', true);
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- convert price ----
    function convert_price(price) { return helper.convert_price(price); }
    // ---- convert discount to $ to k ----
    function convert_price_to_k(price) { return helper.kFormatter(price); }
    // ---- click show detail post ----
    function show_detail(title, id) { router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title), id: id } })); }
    // ---- change format date to time ago ----
    function convertFromNow(date) {
        return helper.check_date_ago(date, 'check_current_year');
    }
    // ---- convert date look beautiful ----
    function date_format(date) { return helper.check_date_ago(date, '') ; }
    // ---- ripple effect on UI ----
    function ripple() {
      setTimeout(function () {
        $("#pills-home-tab,#pills-profile-tab,#pills-job-tab,#pills-service-tab,#pills-member-tab,#pills-photo-tab,.arrow_back_nav,.cl_ripple").ripple();
      }, 500);
    }
    // ---- click share icon ----
    function detectMob(p_data, data) {
      // --- share post ---
      if (p_data && p_data.id) {
        share_post_or_user.value = 'share_post';    // share post
        post_id.value = p_data.id;               // post id
        share_link.value = p_data.short_link ? p_data.short_link : '';  // post link

        // -- Var share tracking --
        current_index.value = data.index;
        placement.value = 'profile';
        display_type.value = data.display_type;
        // -- Var share tracking --

        track_action_on_post('share', post_id.value, d_u_post_by_user.value.length, d_u_pageSize.value, current_index.value, placement.value, display_type.value);

      // --- share user ---
      } else {
        share_post_or_user.value = 'share_user'; // share user
        post_id.value = '';                      // store post id
        share_link.value = d_u_detail_user.value ? d_u_detail_user.value.link : ''; // store post link

        // -- Var share tracking --
        current_index.value = '';
        placement.value = '';
        display_type.value = '';
        // -- Var share tracking --

        tracking_manual('share');     // tracking share profile.
      }

      // -- close modal option --
      $('#modal_show_option_user_or_store').modal('hide');

      // -- check screen device useragent --
      check_screen_userAgent();
      if (check_screen_device.value) {
        $("#modal_show_option_share").modal('hide');
        // share media in device phone
        phone_support_sharing(p_data); // share post if p_data exist else share user.

      } else {
        $("#modal_show_option_share").modal('show'); // share media in computer
      }
    }
    // ---- check device user use ----
    function check_screen_userAgent() {
      let check = false;
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
      ];
      return toMatch.some((toMatchItem) => {
        let march = navigator.userAgent.match(toMatchItem);
        if (march) {
          check = true; // in screen phone else screen pc
        }
        check_screen_device.value = check;
        // return navigator.userAgent.match(toMatchItem);
      });
    }
    // ---- phone support sharing ----
    function phone_support_sharing(data_post) {
      // support only https, localhost or some browser
        let title = ''; let text = ''; let url = '';
        if (data_post) { // -- media post --
            title = data_post.title ? data_post.title : '';
            text = '';
            url = data_post.short_link ? data_post.short_link : '';
        } else { // -- media user --
            title = d_u_detail_full.value.meta && d_u_detail_full.value.meta.title ? d_u_detail_full.value.meta.title : '';
            text = d_u_detail_full.value.meta && d_u_detail_full.value.meta.description ? d_u_detail_full.value.meta.description : '';
            url = d_u_detail_full.value.meta && d_u_detail_full.value.meta.url ? d_u_detail_full.value.meta.url : '';
        }
        // let image = d_u_detail_full.value.meta && d_u_detail_full.value.meta.image ? [d_u_detail_full.value.meta.image] : '';

      if (navigator.share) {
        let shareData = {
          title: ''+title+'',
          text: ''+text+'',
          url: ''+url+'',
          // files: ''+image+'',
        }
        navigator.share(shareData)
            .then(() => { /*console.log('Successfully');*/ })
            .catch((e) => { /*console.log('Error: ' + e);*/ });

      // if in device phone, but navigator not support, must to show dialog share
      } else {
        $("#modal_show_option_share").modal('show'); // share media like in PC
      }
    }
    // ---- twitter sharing ----
    function twitter_sharing() {
      if (window.navigator.onLine) {
        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+ share_post_or_user.value === 'share_post' ? share_link.value : d_u_detail_user.value.link +''),'facebook-share-dialog','width=626,height=436');
        return false;
      } else {
        $('#modal_show_status_error_connection').modal('show');
      }
    }
    // ---- facebook sharing ----
    function facebook_sharing() {
      if (window.navigator.onLine) {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('' + share_post_or_user.value === 'share_post' ? share_link.value : d_u_detail_user.value.link + ''), 'facebook-share-dialog', 'width=626,height=436');
        return false;
      } else {
        $('#modal_show_status_error_connection').modal('show');
      }
    }
    // ---- click show map ----
    function click_show_map(show_true) {
      if (show_true && d_u_detail_user.value && d_u_detail_user.value.contact) {
        tracking_manual('map'); // tracking on map.
        window.open("https://maps.google.com/maps?q=" + d_u_detail_user.value.contact.map.x + ',' + d_u_detail_user.value.contact.map.y + '&' + d_u_detail_user.value.contact.map.z, "_blank");
      }
    }
    // ---- click change grid ----
    function change_grid(type) {
        if (type === 'grid') {
            localStorage.setItem('grid_profile', JSON.stringify({type: 'grid'}));
            VueCookieNext.setCookie('grid_profile', {type: 'grid'});
        } else if (type === 'list') {
            localStorage.setItem('grid_profile', JSON.stringify({type: 'list'}));
            VueCookieNext.setCookie('grid_profile', {type: 'list'});
        } else if (type === 'view') {
            localStorage.setItem('grid_profile', JSON.stringify({type: 'view'}));
            VueCookieNext.setCookie('grid_profile', {type: 'view'});
        }

        display_list.value = localStorage.getItem('grid_profile') ? JSON.parse(localStorage.getItem('grid_profile')) : {type: 'grid'};

        reload_lazy_img(); // load lazy image.
    }
    // ---- show chat ----
    function show_chat(post_id, data) {
      if (window.navigator.onLine) {

        // tracking on button chat
        detail_one_post.value = data.data_post;
        track_action_on_post('chat', post_id, d_u_post_by_user.value.length, d_u_pageSize.value, data.current_index, data.placement, data.display_type);

        for (let i = 0; i < d_u_post_by_user.value.length; i++) {
          if (post_id === d_u_post_by_user.value[i].data.id) {

            let to_id = d_u_post_by_user.value[i].data.user && d_u_post_by_user.value[i].data.user.id ? d_u_post_by_user.value[i].data.user.id : '';
            let username = d_u_post_by_user.value[i].data.user && d_u_post_by_user.value[i].data.user.username ? d_u_post_by_user.value[i].data.user.username : '';
            // -- if user login, go to chat --
            if (user_data.value) {
              router.push(localePath({ name: 'chats-detail-chat', query: {to_id: to_id, username: username} }));
              // save params to work at detail chats
              let dt_post = {
                  show_topic_post_id: post_id,
                  title: d_u_post_by_user.value[i].data.title,
                  price: d_u_post_by_user.value[i].data.price,
                  img: d_u_post_by_user.value[i].data.thumbnail ? d_u_post_by_user.value[i].data.thumbnail : ''
              }
              save_track_optional('dt_post', dt_post);
              save_track_optional('clear_old_data', { clear_old_data: 'clear' });

            // -- else login first when go to form chat --
            } else {
              // create State when login completed
              let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
              let arr_save_state = {
                action: 'detail_chat',
                expire: expired,
                data: {
                  to_id: to_id,
                  username: username,
                  show_topic_post_id: post_id,
                  title: d_u_post_by_user.value[i].data.title, // helper.check_special_char(d_u_post_by_user.value[i].data.title),
                  price: d_u_post_by_user.value[i].data.price,
                  img: d_u_post_by_user.value[i].data.thumbnail ? d_u_post_by_user.value[i].data.thumbnail : ''
                },
                from: {name: 'detail_post'}
              }
              localStorage.setItem("save_state", JSON.stringify(arr_save_state));
              router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
            }

          }
        }
      } else {
        $('#modal_show_status_error_connection').modal('show');
      }
    }
    // ---- show map ----
    function link_google_map(x, y) {
      tracking_manual('map'); // tracking API on link google map.
      var url = window.open('https://maps.google.com/maps?q='+x+','+y, '_blank');
      url.focus();
    }
    // ---- go to branches of store ----
    function go_to_branches() { router.push(localePath({ name: 'username-branches', params: { username: d_u_detail_user.value.username, } })); }
    // ---- click keyword and go to search result page ----
    function go_to_search_result(keyword) { router.push(localePath({ name: 'search-result', query: { keyword: keyword } })); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) {
        if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; }
    }
    function imageUrlAlt_post(the_event) {
        if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; }
    }

    // ---- check show filter && category by USER Role ----
    function check_role_user_to_show_filter(de_user) {
        role_mem_type.value = de_user.member_type == 2 ? true : false;
        role_mem_menu.value = de_user.menu && de_user.menu.includes('category') ? true : false;
        if (role_mem_menu.value) {
            get_categorise_by_user();   // get categories by post filter user
            get_location();             // get locations
        }
        if (role_mem_type.value) { check_count_badge_filter(); } // count badge filter to show at icon.
    }
    // ---- check count badge filter ----
    function check_count_badge_filter() {
        if (route.query) {
            count_badge_search.value = 0;
            for (const [k, val] of Object.entries(route.query)) {
                if (k === 'category' || k === 'keyword' || k === 'user') {
                    // not allow to count badge on category and keyword.
                } else {
                    count_badge_search.value++;
                }
            }
        }
    }
    // ---- start check business hours ----
    function check_business_hours() {
        if (process.client) {
            let bs = d_u_detail_user.value && d_u_detail_user.value.business_hours ? d_u_detail_user.value.business_hours : '';
            if (bs) {
                let available = [];
                $.each(bs.hours, (ks, vs) => { // clean data hours.
                    let arr = vs;
                    arr['date_en'] = ks;       // add more for condition below.
                    available.push(arr);
                });

                // -- get this day --
                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                let now = new Date();
                this_day.value = days[now.getDay()].toLowerCase();      // get current (mon tue ...)

                let ch_open = bs.status === 'close' ? (language.value === 'km' ? 'បើក' : 'Open') : (language.value === 'km' ? 'បិទ' : 'Open');
                now.setDate(now.getDate() + 1); // add more 1 day from current date.
                let next_day = days[now.getDay()].toLowerCase();  // get next day
                // check current day
                if (bs.close && bs.status === 'open') {
                    if (bs.value === '24 Hours' || bs.value === '24 ម៉ោង') {
                        day_status.value = bs.value;
                    } else {
                        const val = bs.value.split(' - ');
                        day_status.value = ch_open + ' ' + val[1];
                    }

                // check next day
                } else if ((!bs.close && bs.status === 'close') || (bs.close && bs.status === 'close')) { // happen when current date is null OR current date expired, must to get data next date.
                    $.each(available, (k, v) => {
                        let sm_date = v.date_en; // get small latter for condition.
                        if (sm_date === next_day && v.status === 'open') {
                            if (v.value === '24 Hours' || v.value === '24 ម៉ោង') {
                                day_status.value = ch_open + ' 12:00 AM ' + v.title;
                            } else {
                                const val = v.value.split(' - ');
                                day_status.value = ch_open + ' ' + val[0] + ' ' + v.title;
                            }
                            // console.log('3 => ' + day_status.value);
                            return false; // breaks

                        } else if (sm_date === next_day && v.status === 'close') {
                            $.each(available, (key, va) => { // loop to get next day is open or not.
                                if (key > k) { // get only next day is open, loop start from the "sm_date".
                                    if (va.status === 'open') {
                                        if (va.value === '24 Hours' || va.value === '24 ម៉ោង') {
                                            day_status.value = ch_open + ' 12:00 AM ' + va.title;
                                        } else {
                                            const val = va.value.split(' - ');
                                            day_status.value = ch_open + ' ' + val[0] + ' ' + va.title;
                                        }
                                        // console.log('4 => ' + day_status.value);
                                        return false; // breaks

                                    } else {
                                        // loop to check is status open from the beginning again, when get next day from the "sm_date" is close all.
                                        $.each(available, (t_k, t_v) => {
                                            if (t_v.status === 'open') {
                                                if (t_v.value === '24 Hours' || t_v.value === '24 ម៉ោង') {
                                                    day_status.value = ch_open + ' 12:00 AM ' + t_v.title;
                                                } else {
                                                    const val = t_v.value.split(' - ');
                                                    day_status.value = ch_open + ' ' + val[0] + ' ' + t_v.title;
                                                }
                                                // console.log('5 => ' + day_status.value);
                                                return false; // breaks
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    }
    // ---- Visibility Tracking ----
    function Tracking() {
        let the_track = pa_con && pa_con.tracking && pa_con.tracking.d_params ? pa_con.tracking.d_params : '';
        let par_track = the_track; // get tracking params
        let check_user = d_u_detail_user.value && d_u_detail_user.value.type === 'user' ? 'user' : 'store'; // check user type
        let user_id = d_u_detail_user.value ? d_u_detail_user.value.id : ''; // get user id
        let is_search = the_track && the_track.is_search ? the_track.is_search : ''; // only from search_result and search listing.
        if (par_track) {
            helper.tracking_action(check_user, { id: user_id }, 'view', par_track.placement, '', is_search);
        }

        helper.clear_params_make_con('tracking'); // remove local params condition
    }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- get categories by user post ----
    function get_categorise_by_user() {
        if (!d_u_post_cate_by_user.value) {
            $fetch(config.VUE_APP_API_URL + 'profiles/' + route.params.username + '/categories', {
                params: {
                    lang: language.value,
                    v: 1
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                d_u_post_cate_by_user.value =  res.data;
                get_post_filter_by_categories(); // get filter by category or post user.
                find_main_sub_category(); // get sub category from query filter.
                add_main_cate_to_carousel(); // create main categories to slide carousel.

            }).catch(e => {
                if (e.response) {
                    let check = e.response;
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    if (check.status === 404) {
                        show_toast(data_parse._data.message, false);

                    } else if (check.status === 401) { // retry
                        if (reload_q_again_11.value <= 2) {
                            reload_q_again_11.value += 1;
                            setTimeout(() => { get_categorise_by_user(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            });

        } else {
            get_post_filter_by_categories(); // get filter by category or post user.
            find_main_sub_category(); // get sub category from query filter.
            add_main_cate_to_carousel(); // create main categories to slide carousel.
        }
    }
    // ---- post filter by categories ----
    function get_post_filter_by_categories() {
        if (old_cate_filter.value !== route.query.category) { // request only new category selected.
            old_cate_filter.value = route.query.category; // add new category to old_cate_filter.

            let url = '';
            if (route.query.category) {
                url = config.VUE_APP_API_URL + 'profiles/' + route.params.username + '/filters/' + route.query.category;
            } else {
                url = config.VUE_APP_API_URL + 'profiles/' + route.params.username + '/filters';
            }
            $fetch(url, {
                params: { lang: language.value, filter_version: 4, group: true },
            }).then(res => {
                post_filter.value = res.data;
                loop_create_filter_model(post_filter.value); // crate filter v-model.

            }).catch(e => {
                if (e.response) {
                    let check = e.response;
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    if (check.status === 404) {
                        show_toast(data_parse._data.message, false);

                    } else if (check.status === 401) { // retry
                        if (reload_q_again_12.value <= 2) {
                            reload_q_again_12.value += 1;
                            setTimeout(() => { get_post_filter_by_categories(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            });
        }
    }
    // ---- dynamic create field v-model for search modal ----
    function loop_create_filter_model(data) {
        let newObj = {};
        let R = route, mul_locations = 0;

        $.each(data, (key, value) => {
            if (key === 'sort') {
                newObj[value.fieldname] = R.query[value.fieldname] ? R.query[value.fieldname] : '';
                // console.log(value.fieldname)
            } else {
                $.each(value, (k, val) => {
                    if (key === 'deliveries') {
                        newObj[k] = R.query[val.fieldname] && JSON.parse(R.query[val.fieldname]) === true ? true : false; // sometime true str or true boolean
                        // console.log(val.fieldname)
                    } else if (key === 'locations') {
                        $.each(val.fields, (l_k, l_v) => {
                            newObj[l_v.fieldname] = R.query[l_v.fieldname] ? R.query[l_v.fieldname] : '';
                            mul_locations++; // check single or multiple field location.
                        });
                        // console.log(val)
                    } else {
                        if (val.max_field && val.min_field) { // min and max price
                            newObj[val.max_field.fieldname] = R.query[val.max_field.fieldname] ? R.query[val.max_field.fieldname] : '';
                            newObj[val.min_field.fieldname] = R.query[val.min_field.fieldname] ? R.query[val.min_field.fieldname] : '';
                            // console.log(val.max_field.fieldname)
                        } else if (val.fieldname === 'discount') {
                            newObj[k] = R.query[val.fieldname] && JSON.parse(R.query[val.fieldname]) === true ? true : false; // sometime true str or true boolean
                            // console.log(val.fieldname)
                        } else {
                            if (!val.fieldname) { // if dont have fieldname, must to loop to get fieldname bc this field type is "group_fields"
                                $.each(val.fields, (l_k, l_v) => {
                                    if (l_v.type === 'min_max') { // check if min_max
                                        newObj[l_v.min_field.fieldname] = R.query[l_v.min_field.fieldname] ? R.query[l_v.min_field.fieldname] : '';
                                        newObj[l_v.max_field.fieldname] = R.query[l_v.max_field.fieldname] ? R.query[l_v.max_field.fieldname] : '';
                                    } else {
                                        newObj[l_v.fieldname] = R.query[l_v.fieldname] ? R.query[l_v.fieldname] : '';
                                    }
                                });

                            } else { // if have fieldname
                                newObj[k] = R.query && R.query[val.fieldname] ? R.query[val.fieldname] : '';
                                // console.log(val.fieldname)
                            }
                        }
                    }
                });
            }
        });
        form.value = newObj;

        // -- check Province, District, Commune is exist OR only Province --
        only_province.value = mul_locations > 1 ? true : false; // true = multiple loc, false = single loc
        if (only_province.value) {
            if (form.value.province) { request_sub_location(form.value.province, 'district'); } // pro exist, get dis.
            if (form.value.district) { request_sub_location(form.value.district, 'commune'); }  // dis exist, get com.
        }

        // -- clear disable field ad_model in modal, if create new fields data search --
        if (form.value.ad_field) {
            setTimeout( () => { change_ad_field(''); }, 500);
        }
    }

    // ---- show page 404 ----
    function show_page_404() {
        if (process.server) {
            throw createError({ statusCode: 404 }); // work only Server Side
        } else {
            showError({ statusCode: 404 });  // work on both server and Client Side
        }
    }

    // ---- show modal search filter ----
    function show_modal_search(not_show) {

        let qur = route.query;
        form.value['province'] = qur.province ? qur.province : '';
        if (only_province.value) { // is multiple locations.
            form.value['district'] = qur.district ? qur.district : '';
            form.value['commune'] = qur.commune ? qur.commune : '';
            // add old array loc in to "districts" and "communes"
            districts.value = old_arr_locations.value.dis;
            communes.value = old_arr_locations.value.com;
        }

        $('#modal_post_filter').modal('show');
    }
    // ---- get locations ----
    function get_location() {

        if (process.client) { // prevent request again and again when localstorage exist.
            locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : '';
        }

        if ((!locations.value) || (locations.value && !locations.value.data)) {
            $fetch(config.VUE_APP_API_URL + 'locations', {
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                const object = {
                    data: res && res.data ? res.data : '',
                    expiry: helper.Date_To_Timestamp('', 3600, 'seconds'), // add 1 hour
                }
                localStorage.setItem("locations", JSON.stringify(object));
                locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];
            }).catch(error => { /*console.log(error.response);*/ });
        }
    }
    // ---- click btn search ----
    function keyEnter() {
        click_search()
    }
    function click_search() {
        let query_str = {};
        let par = route.query;
        let keySearch = field_search.value;

        // --- Check Keyword && Category && User ---
        if (!isDesktop) {
            if (par.keyword) { query_str['keyword'] = par.keyword; } // check keyword
            if (par.category) { query_str['category'] = par.category; } // check category
        } else {
            if (dt_category.value) { query_str['category'] = dt_category.value; }
            if (dt_keyword.value) { query_str['keyword'] = dt_keyword.value; }
        }
        if (par.user) { query_str['user'] = par.user; } // check user

        // --- get value and key from v-model to search ---
        if (form.value) {
            $.each(form.value, (key, val) => {
                // get only key have value in query string, else let it empty
                if (form.value[key] === "" || form.value[key] === undefined || form.value[key] === false) {
                    // clear if not exit in query string.
                } else {
                    // if field exist and value have, show that field in query url.
                    query_str[key] = form.value[key];
                }
            });
        }

        // --- check ad_feature is multiple select so reab data tam ning ---
        var data_feature = form.value['ad_features'] ? form.value['ad_features'] : '';
        if (data_feature && Array.isArray(data_feature)) {
            for (let i = 0; i < data_feature.length; i++) {
                query_str['ad_features['+i+']'] = data_feature[i];
            }
        } else {
            if (data_feature) {
                query_str['ad_features[0]'] = data_feature;
            }
        }

        // replace new data locations has been choose to "old_arr_locations" for open modal latter
        if (only_province.value) { // is multiple locations.
            old_arr_locations.value.dis = districts.value;
            old_arr_locations.value.com = communes.value;
        }
        $('#modal_post_filter').modal('hide');  // close modal search

        if(keySearch){
            query_str['keyword'] = keySearch;
            router.replace(localePath({ name: 'username', query: query_str }));
        }else{
            query_str['keyword'] = keySearch;
            router.replace(localePath({ name: 'username', query: query_str }));
        }
        router.replace(localePath({ name: 'username', query: query_str }));
    }
    // ---- click category search ----
    function click_category_search(slug, push_state) {
        let R = route.query, obj = {};
        obj['category'] = slug;                         // add slug category.
        if (R.keyword) { obj['keyword'] = R.keyword; }  // check keyword if exist.
        if (R.user) { obj['user'] = R.user }            // check username if exist.
        form.value = {};                                // clear form data.
        districts.value = []; communes.value = [];      // clear array location "Dis" and "Com".
        old_arr_locations.value = { dis: [], com: [] }; // clear old_loc.

        // push state
        if (push_state) {
            router.push(localePath({name: 'username', query: obj}));
        // replace state
        } else {
            router.replace(localePath({name: 'username', query: obj}));
        }
    }
    // ---- find sub category by query from url ----
    function find_main_sub_category() {
        // -- loop get main and sub --
        let main = [], sub = [];
        $.each(d_u_post_cate_by_user.value, (key, val) => {
            if (val.parent == 0) {  // add Main
                main.push(val);
            } else {                // add Sub
                sub.push(val);
            }
        });

        let slug = route.query.category ? route.query.category : '';
        if (slug) {
            $.each(d_u_post_cate_by_user.value, (k, v) => {
                if (v.slug === slug) {
                    post_sub.value = [];
                    if (v.parent == 0) { // -- if slug is "Main-cate" --
                        $.each(d_u_post_cate_by_user.value, (key, val) => {
                            if (v.id === val.parent) {
                                post_sub.value.push(val);
                            }
                        });
                    } else { // -- if slug is "Sub-cate" --
                        $.each(d_u_post_cate_by_user.value, (key, val) => {
                            if (v.parent === val.parent) {
                                post_sub.value.push(val);
                            }
                        });
                    }
                    return false; // break.
                }
            });
            // console.log('====== 1 =====');

        } else if (main.length === 1) {
            post_sub.value = [];
            $.each(sub, (k, v) => {
                post_sub.value.push(v);
            });
            // console.log('====== 2 =====');

        } else {
            post_sub.value = [];
            create_carousel();
            // console.log('====== 3 =====');
        }
    }
    // ---- create field Main categories to owl-carousel ----
    function add_main_cate_to_carousel() {
        owl_carousel_drag.value = 0;
        main_cate.value = []; // clear old data main categories.
        refresh_carousel.value++; // increase to make carousel re-render when key change value after data category change.

        let tmp_main = []; let p_n_m = 0; let count_m = 1; let the_first_m = true;
        // check screen size and show item per-page
        let item_per_page_m = 0;
        if (screen.width < 768) {
            item_per_page_m = 9;  // show 8 items
        } else if (screen.width >= 768 && screen.width < 1024) {
            item_per_page_m = 11; // show 10 items
        } else if (screen.width >= 1024) {
            item_per_page_m = 13; // show 12 items
        }
        $.each(d_u_post_cate_by_user.value, (k, v) => {
            if (v.parent === "0") {
                if (count_m <= item_per_page_m) {

                    // create per-page
                    if (the_first_m) { // for create parent the first
                        let newElement_m = {};
                        newElement_m['per_page'] = [];
                        tmp_main.push(newElement_m);
                        the_first_m = false;
                    }
                    // create Main
                    tmp_main[p_n_m]['per_page'].push(v);

                    count_m++;
                    if (count_m === item_per_page_m) {   // create another type in array
                        count_m = 1;         // set to 1 again
                        p_n_m++;             // increase page
                        the_first_m = true;  // create parent again
                    }
                }
            }
        });

        main_cate.value = tmp_main; // console.log(main_cate.value);
        create_carousel(); // create carousel.
        // console.log(main_cate.value);
    }
    // ---- class create owl carousel ----
    function create_carousel() {
        // -- check PC or Mobile --
        let m_drag = isDesktop ? true : false; // mouseDrag on carousel
        setTimeout(() => {
            $('#owl_categories').owlCarousel({
                items: 1,
                mouseDrag: m_drag,
                smartSpeed: 500,
            });
            // console.log('reload carousel 2');
            check_drag_scroll();
        }, 100);
    }
    // -- check drag and scroll carousel --
    function check_drag_scroll() {
        if (owl_carousel_drag.value < 1) {
            owl_carousel_drag.value = 1; // add 1, not allow to run this function again.

            setTimeout(function () {
                let owl = $('.owl-carousel'); let disable_id = $('#owl_categories, #owl_slide');
                owl.on('drag.owl.carousel', function (e) {
                    disable_id.css('pointer-events', 'none'); // disable click on carousel.
                    // console.log('ah 1');
                });

                owl.on('dragged.owl.carousel', function (e) {
                    disable_id.css('pointer-events', 'unset'); // disable click on carousel.
                    // console.log('ah 2');
                });
            }, 700);
        }
    }
    // ---- /class create owl carousel ----

    // ---- change options location dynamic ----
    function change_locations(events, slug, field_name) {
        let loc_slug = slug ? slug : (events ? events.target.value : '');
        if (field_name === 'province') {
            districts.value = [];  communes.value = [];               // clean dis and com.
            form.value['district'] = ''; form.value['commune'] = '';  // clean v-model dis and com.
            if (loc_slug && only_province.value) {
                request_sub_location(loc_slug, 'district'); // request dis.
            }
            // console.log(field_name);

        } else if (field_name === 'district') {
            communes.value = [];                                     // clean dis and com.
            form.value['commune'] = '';                              // clean v-model com.
            if (loc_slug && only_province.value) {
                request_sub_location(loc_slug, 'commune');  // request com.
            }
            // console.log(field_name);

        }/* else if (field_name === 'commune') {
            console.log(field_name);
        }*/
    }
    function request_sub_location(loc_slug, type) {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL + 'locations', {
            params: { lang: language.value, type: type, parent: loc_slug },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        }).then(res => {
            if (type === 'district') {
                districts.value = res.data;
                if (route.query.province && route.query.province === loc_slug) { // add district to old_arr_loc
                    old_arr_locations.value.dis = res.data;
                }
            } else if (type === 'commune') {
                communes.value = res.data;
                if (route.query.district && route.query.district === loc_slug) { // add commune to old_arr_loc
                    old_arr_locations.value.com = res.data;
                }
            }
        }).catch(e => { /*console.log(e);*/ }).finally(() => (loading_field.value = false));
    }
    // ---- /change options location dynamic ----

    // ---- show modal field have icons ---- (1)
    function show_modal_field_icon(field) {
        detail_field.value = field;
        $('#show_modal_field_have_icon').modal('show');
    }
    // ---- select change field in modal show field icon ---- (2)
    function select_field_value(fieldname, fieldvalue) {
        form.value[fieldname] = fieldvalue ? fieldvalue : ''; // add value to fieldname.

        // check if another field have chained_field the same this fieldname
        change_ad_field(fieldname);

        // --- close the modal ---
        $('#show_modal_field_have_icon').modal('hide');
    }
    // ---- clear select change field to empty ---- (3)
    function clear_select_field_value(fieldname, fieldvalue) {
        detail_field.value = '';
        form.value[fieldname] = '';                     // clear fieldname.
        $('#show_modal_field_have_icon').modal('hide'); // close modal.
    }
    // ---- check chained_field is like parent in form search, create field by select ----
    function change_ad_field(fieldname) {
        // if ad_field and ad_model exist, must to check "chained_field" if exist (start code below bc field are dynamic)
        if (fieldname && form.value[fieldname] !== '') {
            
        } else {
            
        }
    }
    // ---- clear filter ----
    function clear_filter() {
        let f_d = form.value;
        if (f_d) {
            $.each(form.value, (k, v) => {
                f_d[k] = '';
            });
            form.value = f_d;
        }
        $('#modal_post_filter').modal('hide'); // hide modal filter
        setTimeout(() => { click_search(''); },200); // click search btn.

        // --- clear data districts and communes ---
        districts.value = [];  communes.value = [];
        old_arr_locations.value = { dis: [], com: [] };
    }

    // ---- Tab Jobs ----
    async function get_jobs_list({loaded, error, noMore, noResults}, { isFirstLoad }) {
        check_new_auth_user();

        $fetch(config.VUE_APP_API_URL_POST_NEW + route.params.username + '/feed', {
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' },
            params: {
                offset: pageSize_jobs.value,
                fields: 'thumbnails,thumbnail,location,photos,user,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                lang: language.value,
                functions: 'save,chat,like,apply_job,shipping',
                category: 'jobs',
            },
        }).then(res => {

            pageSize_jobs.value += res.limit; // add offset
            let data = res.data;
            if (data.length) {
                let arr_tmp = [];
                $.each(data, (key, value) => {
                    if (!post_jobs_by_user_id.value.includes(value.data.id)) {     // if not exist ( function check => indexOf or includes or some )
                        post_jobs_by_user_id.value.push(value.data.id);            // push id of post prevent show duplicate when sever clear cache
                        arr_tmp.push(value);
                    }
                });
                // if have arr_tmp
                if (arr_tmp.length > 0) { listing_jobs.value = listing_jobs.value.concat(arr_tmp); } // concat in multiple array
            }

            // -- tracking on google analytic --
            if (listing_jobs.value.length <= 30 && pageSize_jobs.value === 60) {  } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(pageSize_jobs.value > 30 ? pageSize_jobs.value : 0, 'home'); }

            // -- check stop scroll or scroll more --
            if (res.data.length === 0) {
                if (isFirstLoad) {
                    noResults(); // console.log('noResult');
                } else {
                    noMore(); // console.log('noMore');
                }
            } else {
                if (listing_jobs.value.length < pageSize_jobs.value) {
                    noMore(); // close scroll.
                } else {
                    loaded(); // scroll down load more.
                }
            }

        }).catch(e => {
            if (!e.response) {
                error();
            } else {
                if (e.response.status === 404) {
                    noResults();
                } else if (e.response.status === 401) { // retry
                    if (reload_q_again_8.value <= 2) {
                        reload_q_again_8.value += 1;
                        setTimeout( () => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }
    // ---- Tab Services ----
    async function get_services_list({loaded, error, noMore, noResults}, { isFirstLoad }) {
        check_new_auth_user();

        $fetch(config.VUE_APP_API_URL_POST_NEW + route.params.username + '/feed', {
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' },
            params: {
                offset: pageSize_services.value,
                fields: 'thumbnails,thumbnail,location,photos,user,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                lang: language.value,
                functions: 'save,chat,like,apply_job,shipping',
                category: 'services',
            },
        }).then(res => {

            pageSize_services.value += res.limit; // add offset
            let data = res.data;
            if (data.length) {
                let arr_tmp = [];
                $.each(data, (key, value) => {
                    if (!post_services_by_user_id.value.includes(value.data.id)) {   // if not exist ( function check => indexOf or includes or some )
                        post_services_by_user_id.value.push(value.data.id);          // push id of post prevent show duplicate when sever clear cache
                        arr_tmp.push(value);
                    }
                });
                // if have arr_tmp
                if (arr_tmp.length > 0) { listing_services.value = listing_services.value.concat(arr_tmp); } // concat in multiple array
            }

            // -- tracking on google analytic --
            if (listing_services.value.length <= 30 && pageSize_services.value === 60) {  } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(pageSize_services.value > 30 ? pageSize_services.value : 0, 'home'); }

            // -- check stop scroll or scroll more --
            if (res.data.length === 0) {
                if (isFirstLoad) {
                    noResults(); // console.log('noResult');
                } else {
                    noMore(); // console.log('noMore');
                }
            } else {
                if (listing_services.value.length < pageSize_services.value) {
                    noMore(); // close scroll.
                } else {
                    loaded(); // scroll down load more.
                }
            }

        }).catch(e => {
            if (!e.response) {
                error();
            } else {
                if (e.response.status === 404) {
                    noResults();

                } else if (e.response.status === 401) { // retry
                    if (reload_q_again_9.value <= 2) {
                        reload_q_again_9.value += 1;
                        setTimeout( () => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }
    // ---- Tab Members ----
    async function show_members({loaded, error, noMore, noResults}, { isFirstLoad }) {
        check_new_auth_user();

        $fetch(config.VUE_APP_API_URL + 'profiles/' + d_u_detail_user.value.username + '/members', {
            // headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' },
            params: {
                offset: members_pageSize.value,
                lang: language.value,
            },
        }).then(res => {

            members_pageSize.value += res.limit; // add offset
            d_u_members.value = d_u_members.value.concat(res.data); // concat in multiple array

            // -- check stop scroll or scroll more --
            if (res.data.length === 0) {
                if (d_u_members.value.length === 0) { // check in list have item or not
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore');
                    }
                } else {
                    noMore(); // console.log('noMore 1')
                }
            } else {
                if (d_u_members.value.length < members_pageSize.value) {
                    noMore(); // close scroll.
                } else {
                    loaded(); // scroll down load more.
                }
            }

        }).catch(e => {
            if (!e.response) {
                error();
            } else {
                if (e.response.status === 404) {
                    noResults();

                } else if (e.response.status === 401) { // retry
                    if (reload_q_again_7.value <= 2) {
                        reload_q_again_7.value += 1;
                        setTimeout( () => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }

    
    function get_post_by_user(username) {
        let obj = {};
        $.each(route.query, (key, val) => { // clear "username" in query if exist.
            if (key !== 'user') {
                obj[key] = val;
            }
        });

        // add username to search
        if (username) {
            // show_members();
            window.scrollTo({top: 0});    // scroll top
            obj['user'] = username;       // add "username" to query.
            $('#pills-home-tab').click(); // click tab home.
        }

        $('#pills-home').addClass('active show') 
        $('#pills-home-tab').addClass('active')

        $('#pills-member').removeClass('active show')
        $('#pills-member-tab').removeClass('active')

        router.replace(localePath({ name: 'username', query: obj }));
    }
    function show_all_posts() { // ---- clear search member ----
        d_u_pageSize.value = 0;
        d_u_post_by_user.value = [];
        d_u_post_by_user_id.value = [];
        isInitial.value = true; // reset scroll loader again.
    }
    // ---- Tab Photos ----
    function show_photos() {
        if (list_album.value.length === 0) {
            check_new_auth_user();
            loading_album.value = true;
            $fetch(config.VUE_APP_API_URL + 'profiles/' + d_u_detail_user.value.username + '/photos', {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                // headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''},
                params: {offset: 0, lang: language.value},
            }).then(res => {

                list_album.value = res.data;    // arr albums.
                if (list_album.value.length > 0) {   // create photos if album exist.
                    $.each(list_album.value, (k, v) => {
                        if (v.photos && v.photos.length > 0) {
                            $.each(v.photos, (key, val) => {
                                all_photos.value.push({
                                    description: val.description,
                                    file: val.file,
                                    id: val.id,
                                    photo: val.photo,
                                    thumbnail: val.thumbnail
                                });
                            });
                        }
                    });
                }

                if (list_album.value.length === 0) photo_empty.value = true;    // prevent show no result when requesting.

            }).catch(error => {
                loading_album.value = false;
                if (!error.response) {
                    if (reload_q_again_10.value < 2) {
                        reload_q_again_10.value += 1;
                        setTimeout(() => { show_photos(); }, 3000);
                    }

                } else if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_10.value <= 2) {
                        reload_q_again_10.value += 1;
                        setTimeout(() => { show_photos(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }).finally(() => (loading_album.value = false));
        }
    }
    function show_detail_album(album) {
        // store detail album
        detail_album.value = album;
        // delay for loop create array for show
        setTimeout(() => { $('#modal_detail_album_photos').modal('show'); },150);  // show modal detail photos album.
    }

    // ---- impression tracking ----
    function visibilityChanged (isVisible, entry, data) {
        // isVisible => is true mean new data, false mean old data.
        if (isVisible) { // new data
            arr_impression.value.push({ id: data.id, current_index: data.index });

            // -- timer not exist && arr_impression not empty && check_sent is true, must set interval --
            if (!timer_auto_impression.value && arr_impression.value.length > 0 && check_sent.value) {

                // -- start setInterval in 3 second --
                timer_auto_impression.value = setInterval( async () => {

                    let arr_tmp = arr_impression.value;  // set arr_impression to tmp array.
                    arr_impression.value = [];           // clear arr_impression.
                    check_sent.value = false;            // not allow to setInterval again.
                    clearInterval(timer_auto_impression.value); timer_auto_impression.value = ''; // clear auto impression

                    let res = await helper.tracking_action('impression', { post_impression: arr_tmp, item_count: d_u_post_by_user.value.length, item_per_page: '30',
                        paid: data.paid, placement: data.placement }, 'impression', 'profile', data.type, '');

                    // console.log(res);
                    if (res && res.status === 200) {
                        check_sent.value = true;          // allow to setInterval again if success.
                    } else {
                        $.each(arr_tmp, (k, v) => {
                            arr_impression.value.push(v); // push id to old arr_impression again if response error in request tracking impression.
                        });
                        check_sent.value = true;          // allow to setInterval again if error.
                        // console.log(arr_impression.value);
                    }

                }, 3000);
            }
        }
    }

    // ---- track to google analytics ----
    function track_contact() {
        if (click_track_one_time_on_contact.value === false) {
            track_google_analytics(0, 'contact');
            click_track_one_time_on_contact.value = true; // not allow to click again fo track in to google analytic
        } // else { console.log('stop track on contact') }
    }
    // ---- track on google analytic ----
    function track_google_analytics (page, condition) {
        // setTimeout(() => {
            let offset = page > 0 ? '?offset=' + page : '';      // set offset of page if scroll get more data
            let events = condition === 'home' ? 'profile_home' : 'profile_contact';
            // let page_title = condition === 'home' ? 'Profile Home' : 'Profile Contact';
            let page_path = route.path + offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                // page_title: page_title,
                page_location: page_location,
                page_path: page_path,
            }
            // -- events on page --
            event(events, data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // -- click show full phone numbers --
    function click_display_full_P_N() {
       setTimeout(() => {
           show_phone_number.value = true;

           tracking_manual('contact'); // tracking contact.
       },100);
    }
    // -- create phone number with xxx for manual --
    function display_P_N(phone_number) {
       const regex1 = /^([0-9]{3}[0-9]{3}[0-9]{3})$/;      // phone num in 9 char
       const regex2 = /^([0-9]{3}[0-9]{3}[0-9]{4})$/;      // phone num in 10 char
       let clean_p_n = phone_number.replace(/[-. ]/g, ""); // clean spacial char...
       if (regex1.test(clean_p_n)) {
        // console.log(phone_number)
           return phone_number.replace(/(\d{6})\d{3}/,"$1xxx");
       } else if (regex2.test(phone_number)) {
        // console.log(phone_number.replace(/(\d{7})\d{3}/,"$1xxx"))
           return phone_number.replace(/(\d{7})\d{3}/,"$1xxx");
       }
    }
    // ---- tracking API call, sms, show contact or any ( but no detail user ) ----
    function tracking_manual(con) {
        let check_user = d_u_detail_user.value && d_u_detail_user.value.type === 'user' ? 'user' : 'store'; // check user type
        helper.tracking_action(con, { id: d_u_detail_user.value.id, track_contact: 'detail_user', user_role: check_user }, con, 'profile', '', '');
    }
    // ---- tracking action on posts list ----
    function track_action_on_post(action, id, item_count, item_per_page, current_index, placement, display_type) {
        let data = detail_one_post.value;
        let check_post_type = data.data && data.data.type && data.data.type !== 'normal' ? true : false; // check post type (paid ads OR not)
        helper.tracking_action('post', { id: id, item_count: item_count, item_per_page: item_per_page,
            current_index: current_index, paid: check_post_type }, action, placement, display_type, '');
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
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
