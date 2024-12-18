<template>
    <div :class="isDesktop ? 'dt_post_detail' : ''">
        <Html prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# product: http://ogp.me/ns/product#"></Html>
        <Head>
            <Title v-if="data_meta">{{ data_meta ? data_meta.title : '' }}</Title>
            <Title v-else>{{tt}}</Title>
            <!-- <Title v-if="data_meta">{{ data_meta ? data_meta.title : '' }}</Title>
            <Title v-else>{{tt}}</Title> -->
            <!-- <Title>Test</Title> -->
            <!-- ios -->
            <!--<Meta name="apple-mobile-web-app-title" :content="data_meta ? data_meta.title : ''" />-->
            <!-- seo page -->
            <Meta name="keywords" :content="data_meta ? data_meta.keyword : ''" />
            <Meta name="description" :content="data_meta ? data_meta.description : ''" />
            <!-- facebook -->
            <Meta property="og:title" :content="data_meta ? data_meta.title : ''" />
            <Meta property="fb:app_id" :content="data_meta ? data_meta.fb.id : ''" />
            <Meta property="og:type" :content="data_meta ? data_meta.fb.type : ''" />
            <Meta property="og:site_name" :content="data_meta ? data_meta.site_name : ''" />
            <Meta property="og:url" :content="data_meta ? data_meta.url : ''" />
            <Meta property="og:image" :content="data_meta ? data_meta.image : ''" />
            <Meta property="og:image:width" content="600" />
            <Meta property="og:image:height" content="600" />
            <Meta property="og:description" :content="data_meta ? data_meta.description : ''" />
            <Meta property="product:price:amount" :content="data_meta && data_meta.price ? data_meta.price.toString() : ''" />
            <Meta property="product:price:currency" :content="data_meta ? data_meta.currency : ''" />
            <!-- twitter -->
            <Meta name="twitter:card" content="app" />
            <Meta name="twitter:site" content="@nytimesbits" />
        </Head>

        <!-- app bar -->
        <div v-if="isMobile" class="col no_padding fix_app_bar">
            <div class="_div_nav row_padding bg_app_bar_header_ ">
                <button type="button" @click="goBack" class="btn w_h_50px" aria-label="Back">
                    <i class="ion-android-arrow-back font_click_back"></i>
                </button>
                <NuxtLink class="title-h-p" :to="localePath({ name: 'index' })">
                    <p class="text-white mb-0">{{ $t("message.khmer24") }}</p>
                </NuxtLink>
                <!-- <button @click="clickShow">test</button> -->
                <template v-if="d_p_detail && d_p_detail.status !== 'deleted'">
                    <button v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_save && check_auth_and_item_user_id_the_same === 'not_mine'"
                            @click="save_ads(d_p_detail && d_p_detail.is_saved ? 'unsave' : 'save', 'detail', d_p_detail && d_p_detail.is_saved ? 'confirm' : '')"
                            type="button" class="btn icon_save_d_post" aria-label="Save">
                        <i v-if="d_p_detail && d_p_detail.is_saved" class="fas fa-bookmark text-white"></i>
                        <i v-else class="far fa-bookmark text-white"></i>
                    </button>
                    <button type="button" @click="detectMob('')" class="btn w_h_50px" aria-label="Share">
                        <i class="icon-share1 font_21 text-white line_h_un"></i>
                    </button>
                </template>
                <div v-else class="loading_width"></div>
            </div>
        </div>
        <!-- <div class="screen-desktop">
            <D_header/>
        </div> -->

        <div :class="isMobile ? '' : 'mt_80'">
            <!-- breadcrumb -->
            <nav v-if="isDesktop" aria-label="breadcrumb" class="dt_breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item" aria-current="page">
                        <NuxtLink class="parent_color_strong" v-if="username_user_or_store" :to="localePath({ name: 'index' })">
                            <i class="fas fa-home me-2"></i>{{ $t('message.home') }}
                        </NuxtLink>
                    </li>
                    <li v-if="d_p_detail && d_p_detail.category && d_p_detail.category.parent_data" class="breadcrumb-item" aria-current="page">
                        <NuxtLink class="parent_color_strong" :to="localePath({ name: 'c-slugCategory', params: { 'slugCategory': d_p_detail.category.parent_data.slug } })">
                            {{ language === 'km' ? d_p_detail.category.parent_data.km_name : d_p_detail.category.parent_data.en_name }}
                        </NuxtLink>
                    </li>
                    <li v-if="d_p_detail && d_p_detail.category" class="breadcrumb-item" aria-current="page">
                        <NuxtLink class="parent_color_strong" :to="localePath({ name: 'c-slugCategory', params: { 'slugCategory': d_p_detail.category.slug } })">
                            {{ language === 'km' ? d_p_detail.category.km_name : d_p_detail.category.en_name }}
                        </NuxtLink>
                    </li>
                </ol>
            </nav>
            <!-- content body -->
            <div :class="isDesktop ? 'row' : ''">
                <!-- left side -->
                <div :class="isDesktop ? 'col col-8' : ''">
                    <!-- error connection -->
                    <div v-if="connection_error" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar">
                        <div class="no_more_result p-2">
                            <div class="p_bg_status">
                                <span class="fas fa-wifi size_icon_status"></span>
                                <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                            </div>
                        </div>
                    </div>
                    <template v-else>
                        <template v-if="loading">
                            <div class="animated-background height_loading_product_detail" :class="isDesktop ? '' : 'margin_below_app_bar'"></div>
                            <div class="d_text_padding_detail d_style_border_detail" style="height: 143px;padding: 24px 15px 15px 15px;">
                                <div class="animated-background text_hei_loading_24 mb-3"></div>
                                <div class="animated-background text_hei_loading_price mb-3 width_60"></div>
                                <div class="animated-background text_hei_loading_24"></div>
                            </div>
                            <div class="mb-2 d_style_div_profile _flex_" style="height: 74px;">
                                <div class="col-3 p-0">
                                    <div class="animated-background rounded-circle" style="width: 60px;height: 60px;"></div>
                                </div>
                                <div class="col-9" style="padding: 3px 0 0 0;">
                                    <div class="animated-background text_hei_loading_title mb-2"></div>
                                    <div class="animated-background text_hei_loading_price mb-2 width_50"></div>
                                    <div class="animated-background text_hei_loading width_70"></div>
                                </div>
                            </div>
                            <div class="d_text_padding_detail d_style_border_detail">
                                <div class="animated-background text_hei_loading_24 mb-3"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_40"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_50"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_70"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_60"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_80"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_90"></div>
                                <br>
                                <div class="text_hei_loading_16 animated-background mb-2"></div>
                                <div class="text_hei_loading_16 animated-background mb-2"></div>
                                <div class="text_hei_loading_16 animated-background mb-2"></div>
                                <div class="text_hei_loading_16 animated-background mb-2 width_70"></div>
                                <br>
                                <div class="_flex_">
                                    <div class="col-1 text_hei_loading_16 animated-background mb-2 me-1 p-0"></div>
                                    <div class="col-5 text_hei_loading_16 animated-background mb-2 ms-1 p-0"></div>
                                </div>
                                <div class="_flex_">
                                    <div class="col-1 text_hei_loading_16 animated-background mb-2 me-1 p-0"></div>
                                    <div class="col-5 text_hei_loading_16 animated-background mb-2 ms-1 p-0"></div>
                                </div>
                                <hr class="d_hr_style">
                                <div class="style_flex">
                                    <div class="col animated-background me-2 text_hei_loading_44"></div>
                                    <div class="col animated-background ms-2 ms-2 text_hei_loading_44"></div>
                                    <div class="col animated-background ms-2 text_hei_loading_44"></div>
                                </div>
                            </div>
                        </template>
                        <div v-else>
                            <div v-if="isMobile" class="mt-5">
                                <!-- have blur background -->
                                <template v-if="!isDesktop">
                                    <template v-if="d_p_detail && d_p_detail.photos && d_p_detail.photos.length > 0">
                                        <div v-if="d_p_detail.photos.length === 1" class="s_detail_photo_single_mb" :class="isDesktop ? 'dt_con_pic_de_post m-0' : ''">
                                            <div class="blur-profile-content bg-logo-post-detail">
                                                <div class="blur-profile-img" v-bind:style="{ backgroundImage: 'url(' + d_p_detail.photos[0] + ')' }"></div>
                                                <a rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')" :href="d_p_detail.photos[0]"
                                                   data-fancybox="photo"> <!-- :data-caption="d_p_detail && d_p_detail.title ? d_p_detail.title : ''" -->
                                                    <img :data-src="d_p_detail.photos[0]"
                                                         :alt="d_p_detail.title ? d_p_detail.title : ''"
                                                         class="lazy" :class="d_p_detail.category.parent == 2 ? 'logo_profile_contain' : (isDesktop ? 'logo_post_detail DT_l_p_d' : 'logo_post_detail MB_l_p_d')"
                                                         :src="empty_img_loading" />
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="s_detail_photo_multiple_m" :class="isDesktop ? 'dt_con_pic_de_post m-0' : ''"> <!-- @click="show_detail_photos(d_p_detail.title, d_p_detail.id)" -->
                                            <div class="blur-profile-content bg-logo-post-detail">
                                                <div class="blur-profile-img" v-bind:style="{ backgroundImage: 'url(' + d_p_detail.photos[0] + ')' }"></div>
                                                <a rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')" :href="d_p_detail.photos[0]"
                                                   data-fancybox="gallery"> <!-- :data-caption="d_p_detail && d_p_detail.title ? d_p_detail.title : ''" -->
                                                    <img :data-src="d_p_detail.photos[0]"
                                                         :alt="d_p_detail.title ? d_p_detail.title : ''"
                                                         class="lazy cur_sur"
                                                         :class="d_p_detail.category.parent == 2 ? 'logo_profile_contain' : (isDesktop ? 'logo_post_detail DT_l_p_d' : 'logo_post_detail MB_l_p_d')"
                                                         :src="empty_img_loading" />
                                                </a>
                                            </div>
                                        </div>
                                        <!-- more gallery image -->
                                        <div v-if="d_p_detail.thumbnails && d_p_detail.thumbnails.length > 1" class="bg-white" :class="isDesktop ? 'm-0' : ''"> <!-- @click="show_detail_photos(d_p_detail.title, d_p_detail.id)" -->
                                            <div class="gallery-detail-post cur_sur">
                                                <a v-if="d_p_detail.thumbnails[1]" rel="nofollow" aria-label="Photo" class="de_img_post"
                                                   @click="tracking_manual('view_photo')" :href="d_p_detail.photos[1]" data-fancybox="gallery">
                                                    <img :data-src="d_p_detail.thumbnails[1]" :src="empty_img_loading" alt="image" class="lazy img-4-1" />
                                                </a>
                                                <a v-if="d_p_detail.thumbnails[2]" rel="nofollow" aria-label="Photo" class="de_img_post"
                                                   @click="tracking_manual('view_photo')" :href="d_p_detail.photos[2]" data-fancybox="gallery">
                                                    <img v-if="d_p_detail.thumbnails[2]" :data-src="d_p_detail.thumbnails[2]"
                                                         alt="image2" class="lazy img-4-2" :src="empty_img_loading" />
                                                </a>
                                                <a v-if="d_p_detail.thumbnails[3]" rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')"
                                                   :href="d_p_detail.photos[3]" class="de_img_blur" data-fancybox="gallery">
                                                    <img :data-src="d_p_detail.thumbnails[3]"
                                                         :class="d_p_detail.thumbnails.length > 4 ? 'gallery-brightness' : ''"
                                                         alt="image3" class="lazy" :src="empty_img_loading" />
                                                    <span v-if="d_p_detail.thumbnails.length > 4">+{{ d_p_detail.thumbnails.length - 4 }}</span>
                                                </a>
                                                <template v-if="d_p_detail.thumbnails.length >= 4">
                                                    <template v-for="(img, index) in d_p_detail.thumbnails" :key="index">
                                                        <a v-if="index >= 4" rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')"
                                                           :href="d_p_detail.photos[index]" data-fancybox="gallery" class="d-none">
                                                            <img :src="img" alt="image" class="img-4-1" />
                                                        </a>
                                                    </template>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                    <div v-else class="margin_below_app_bar"></div>
                                </template>
                                

                                
                                <!-- short information Mobile -->
                                <div v-if="!isDesktop" class="d_text_padding_detail d_style_border_detail">
                                    <h1 class="font_19 m-0 font_light_bold line_height_1_8 break_word_" v-text="d_p_detail && d_p_detail.title ? d_p_detail.title : ''"></h1>
                                    <p class="font_13 m-0 mt-1 c_m_grey">
                                        {{ d_p_detail && d_p_detail.location ? (locale === 'km' ? d_p_detail.location.km_name : d_p_detail.location.en_name ) + ' &#8226; ' + convertFromNow(d_p_detail.renew_date, 'get_full_date') : '' }}
                                    </p>
                                    <p class="m-0 c_m_grey mt-1"> <!-- full_width truncate -->
                                        <strong class="d-big-price">
                                            {{ d_p_detail && d_p_detail.price > 0 ? ( d_p_detail.category && d_p_detail.category.parent == 2 ? '$'+convert_price(d_p_detail.price)+'+' : '$'+convert_price(d_p_detail.price)) : $t('new_text.negotiable') }}
                                        </strong>
                                        <span v-if="d_p_detail && d_p_detail.discount" class="font_12 text_grey d_price_detail_discount">
                                            ${{ convert_price(d_p_detail.discount.original_price) }}
                                        </span>
                                        <span v-if="d_p_detail && d_p_detail.discount" class="font_12 text_grey d_price_detail_off">
                                            {{ d_p_detail.discount.type === 'percent' ? parseInt(d_p_detail.discount.discount)+'% OFF' : '$'+parseInt(d_p_detail.discount.discount)+' OFF' }}
                                        </span>
                                    </p>

                                    <div v-if="d_p_detail && d_p_detail.shipping" class="d_have_shipping">
                                        <i class="fas fa-truck p-1 font_11"></i>
                                        <p class="m-0 status_pad_in_box font_11">{{ d_p_detail.shipping.title }}</p>
                                    </div>
                                </div>


                                <div >
                                    <!-- banner A type "code" or "image" -->
                                    <template v-if="banner && banner.a && banner.a.data.length > 0">
                                        <div v-if="banner.a.data[0].type === 'image'" class="banner-con mb-2 mt-2">
                                            <a rel="nofollow noopener" aria-label="banner" :href="check_link_banner(banner.a.data[0].link)" target="_blank">
                                                <div>
                                                    <img :src="banner.a.data[0].image" alt="zone A"
                                                        :style="{ 'max-width': `${banner.a.data[0].width}px`, 'max-height': `${banner.a.data[0].height}px` }">
                                                </div>
                                            </a>
                                        </div>
                                        <div v-else-if="banner.a.data[0].type === 'code'" v-html="banner.a.data[0].new_html_banner" class="align-width-banner mt-2"></div>
                                    </template>

                                    <!-- Safety Tips For Buyer -->
                                    <!-- user_type === 1 (simple user), user_type === 2 (verify user), parent number 2 = category job -->
                                    <template v-if="!isDesktop && d_p_detail && d_p_detail.user && (d_p_detail.user.user_type === '1' && !d_p_detail.store) && d_p_detail.category.parent != 2">
                                        <div v-if="check_auth_and_item_user_id_the_same === 'not_mine'" class="d_text_padding_detail mb-2 mt-2 d_style_border_detail d_style_warning">
                                            <div class="align_div_center">
                                                <p class="d_title_warning line_height_1_2">
                                                    <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="icon d_img_warning">
                                                    ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                                </p>
                                            </div>
                                            <div class="d_margin_left_detail">
                                                <span class="d_color_des_detail position_absolute d_span_safety">1. </span>
                                                <div class="text-dark d_font_size_detail">
                                                    <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                                                </div>
                                            </div>
                                            <div class="d_margin_left_detail">
                                                <span class="d_color_des_detail position_absolute d_span_safety">2. </span>
                                                <div class="text-dark d_font_size_detail">
                                                    <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                                                </div>
                                            </div>
                                            <div class="d_margin_left_detail">
                                                <span class="d_color_des_detail position_absolute d_span_safety">3. </span>
                                                <div class="text-dark d_font_size_detail">
                                                    <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                                                </div>
                                            </div>
                                            <div class="d_margin_left_detail">
                                                <span class="d_color_des_detail position_absolute d_span_safety">4. </span>
                                                <div class="text-dark d_font_size_detail">
                                                    <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                    <!-- description -->
                                    <div class="d_style_border_detail mb-2 mt-2" :class="isDesktop ? 'dt_border' : ''">
                                        <section class="d_text_padding_detail">
                                            <h2 class="font_20px font_bold mb-3" style="margin: 0 0 20px;"> {{ $t('message.description') }} </h2>

                                            <div class="show_short_detail_post mb-3">
                                                <dl>
                                                    <dt>ID :</dt>
                                                    <dd> {{ d_p_detail && d_p_detail.id ? d_p_detail.id : '' }} </dd>
                                                </dl>
                                                <dl>
                                                    <dt>{{ $t('new_text.like') }} : </dt>
                                                    <dd v-if="d_p_detail && d_p_detail.total_like">
                                                        <NuxtLink v-if="d_p_detail && d_p_detail.id" @click="save_track_optional('clear', { clear: 'clear_old' })" class="parent_color_strong ms-1"
                                                                :to="localePath({ name: 'title-adid-id-liked', params: { title: d_p_detail.title ? check_title_char(d_p_detail.title) : '.', id: d_p_detail.id } })">
                                                            {{d_p_detail.total_like }}
                                                        </NuxtLink>
                                                    </dd>
                                                    <dd v-else>
                                                        <p class="ms-1 m-0">0</p>
                                                    </dd>
                                                </dl>
                                                <template v-if="d_p_detail && d_p_detail.object_specs">
                                                    <div v-for="description in d_p_detail.object_specs" :key="description">
                                                        <dl v-if="Array.isArray(description.value)">
                                                            <dt>{{ description.title }} : </dt>
                                                            <template v-if="description.value">
                                                                <dd v-for="(list, index) in description.value" :key="index">
                                                                    <span>{{list}}</span><span v-if="index+1 < description.value.length">, </span>
                                                                </dd>
                                                            </template>
                                                        </dl>
                                                        <dl v-else>
                                                            <dt>{{ description.title }} : </dt>
                                                            <dd> {{ description.value }}</dd>
                                                        </dl>
                                                    </div>
                                                </template>
                                            </div>

                                            <!-- <p class="mb-3 font_16 m-0 line_paragraph" @click="handleClick" v-html="clear_break(content_dis)"></p> -->
                                            <p class="mb-3 font_16 m-0 line_paragraph" @click="handleClick" v-html="content_dis"></p>

                                            <p class="font_16 m-0 mb-3 line_height_1_5">
                                                <b>{{ $t('new_text_1.contact_info') }}: </b> {{ $t('new_text_1.product_from') }}
                                            </p>

                                            <template v-if="d_p_detail && d_p_detail.phone_white_operator">
                                                <div v-for="p_num of d_p_detail.phone_white_operator" :key="p_num" class="d_phone_num_link">
                                                    <img :src="p_num.icon" class="d_img_tell" alt="icon">
                                                    <a rel="nofollow" class="dt_p_n_link" v-if="show_phone_number" @click="tracking_manual('call')" v-bind:href="'tel:'+p_num.phone">{{ p_num.phone }}</a>
                                                    <div class="cur_sur dt_p_n_link" rel="nofollow" v-else @click="click_display_full_P_N" >
                                                        {{ display_P_N(p_num.phone) }}
                                                        <i>{{ $t('new_text.text_call') }}</i>
                                                    </div>
                                                </div>
                                            </template>

                                            <div v-if="d_p_detail && d_p_detail.location" class="style_flex mt-3">
                                                <i class="fas fa-map-marker-alt d_style_contact"></i>
                                                <p class="d_mg_info"> <b class="font_16">{{ $t('message.location') }}: </b>
                                                    <!-- {{ d_p_detail.location.address ? d_p_detail.location.address+', ' : '' }} -->
                                                    <span  v-html="content_add"></span>
                                                    {{ d_p_detail.location.long_location }} 
                                                </p>
                                                    <!-- <p class="mb-3 font_16 m-0 line_paragraph"  v-html="content_add"></p> -->
                                            </div>
                                            <a rel="nofollow noopener" aria-label="Map" @click="tracking_manual('map')" class="d_show_map_des" v-if="d_p_detail && d_p_detail.location && d_p_detail.location.map" target="_blank"
                                            v-bind:href="'https://maps.google.com/maps?q='+d_p_detail.location.map.x+','+d_p_detail.location.map.y+'&'+d_p_detail.location.map.z">
                                                <div class="text location_map">
                                                    <span class="fa fa-map-marked-alt"></span> {{ $t('message.show_google_map') }}
                                                </div>
                                            </a>

                                            <!-- Desktop Chats Suggestion Box (not show in detail job) -->
                                            <template v-if="isDesktop && d_p_full_detail && d_p_full_detail.setting && !d_p_full_detail.setting.enable_apply_job">
                                                <div class="chats_suggestion_box" v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'">
                                                    <div class="c_s_b_i_chat"><span class="icon icon-chat"></span></div>
                                                    <div class="quick_c_detail">
                                                        <div class="q_c_info">{{ $t('new_text_3.quick_question') }}</div>
                                                        <ul class="q_c_ul">
                                                            <template v-if="language === 'km'">
                                                                <li v-for="val in chat_buy_km" :key="val" class="cur_sur" @click="sent_text_chat(val)"><span>{{ val }}</span></li>
                                                            </template>
                                                            <template v-else>
                                                                <li v-for="val in chat_buy_en" :key="val" class="cur_sur" @click="sent_text_chat(val)"><span>{{ val }}</span></li>
                                                            </template>
                                                        </ul>
                                                        <div class="list-items position_relative">
                                                            <div class="q_c_msg_box">
                                                                <input type="text" class="form-control" id="text_chats" v-model="text_chat" :placeholder="d_p_detail.user.name ? 'Chat with '+d_p_detail.user.name : ''" autocomplete="off">
                                                                <button @click="sent_text_chat('')" aria-label="Send" class="btn btn_send disabled">
                                                                    <span class="ion-android-send"></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>

                                        </section>
                                        <section class="d_btn_below_des" v-if="d_p_detail && d_p_detail.status !== 'deleted'"> <!-- if post status active -->
                                            <!-- save -->
                                            <template v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_save">
                                                <div v-if="check_auth_and_item_user_id_the_same === 'not_mine'" @click="save_ads(d_p_detail && d_p_detail.is_saved ? 'unsave' : 'save', 'detail', d_p_detail && d_p_detail.is_saved ? 'confirm' : '')"
                                                    class="col d_b_parent cur_sur">
                                                    <div :class="d_p_detail && d_p_detail.is_saved ? 'truncate d_b_child d_b_child_saved parent_color' : 'truncate d_b_child'">
                                                        <i class="fa fa-bookmark font_16"></i>
                                                        <span class="m-0 font_14 font_bold">{{ d_p_detail && d_p_detail.is_saved ? $t('new_text.saved') : $t('new_text.save') }}</span>
                                                    </div>
                                                </div>
                                            </template>
                                            <!-- report post -->
                                            <div v-if="check_auth_and_item_user_id_the_same === 'not_mine'" class="col d_b_parent cur_sur">
                                                <div class="truncate d_b_child" @click="report_on_post('detail')">
                                                    <i class="fas fa-exclamation-circle font_16"></i>
                                                    <span class="m-0 font_14 font_bold">{{ $t('message.report_this_post') }}</span>
                                                </div>
                                            </div>
                                            <!-- share post -->
                                            <div class="col d_b_parent cur_sur">
                                                <div @click="detectMob('')" class="truncate d_b_child">
                                                    <i class="icon-share1 font_16"></i>
                                                    <span class="m-0 font_14 font_bold">{{ $t('new_text.share') }}</span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    

                                    <!-- Store OR User_type level 2 -->
                                    <div v-if="d_p_detail"
                                        :class="isDesktop ? 'mb-2' : 'mb-1'">

                                        <!-- Desktop view cover profile or store -->
                                        <div v-if="isDesktop && ((d_p_detail && d_p_detail.store && d_p_detail.store.cover) || (d_p_detail && d_p_detail.user && d_p_detail.user.cover))" class="dt_cover_store_post">
                                            <NuxtLink v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })"
                                                    @click="save_tracking_user({ placement: 'detail' }, { clear: 'clr_old_data' })">
                                                <img v-if="d_p_detail && d_p_detail.store" :src="d_p_detail.store.cover ? d_p_detail.store.cover.large.url : empty_img_post" alt="store cover">
                                                <img v-else :src="d_p_detail && d_p_detail.user && d_p_detail.user.cover ? d_p_detail.user.cover.large.url : empty_img_post" alt="user cover">
                                            </NuxtLink>
                                        </div>

                                        <div class="d_style_div_profile" :class="isDesktop ? 'border-top-0' : ''">
                                            <NuxtLink v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })"
                                                    @click="save_tracking_user({ placement: 'detail' }, { clear: 'clr_old_data' })" id="show_pro_user" class="style_flex rip_show_user">
                                                <div class="col pro_style width_100">
                                                    <div class="_flex_">
                                                        <div class="d_thumb_profile_detail">
                                                            <!-- logo store -->
                                                            <img v-if="d_p_detail && d_p_detail.store" :src='d_p_detail.store && d_p_detail.store.logo ? d_p_detail.store.logo.medium.url : empty_img_user'
                                                                :alt="d_p_detail.store.title" class="img_profile bg_reload_img" @error="imageUrlAlt_profile">
                                                            <!-- logo simple user -->
                                                            <img v-else :src="d_p_detail && d_p_detail.user && d_p_detail.user.photo ? d_p_detail.user.photo.medium.url : empty_img_user"
                                                                :alt="d_p_detail && d_p_detail.user ? d_p_detail.user.name : ''" class="img_profile bg_reload_img" @error="imageUrlAlt_profile">
                                                            <div :class="d_p_detail && d_p_detail.user && d_p_detail.user.online_status.is_active ? '_online_' : ''"></div>
                                                        </div>
                                                        <!-- store -->
                                                        <div v-if="d_p_detail && d_p_detail.store" class="detail_des_pro">
                                                            <div class="con-title-com">
                                                                <p class="truncate_wrap font_16 font_bold m-0">{{ d_p_detail.store ? d_p_detail.store.title : '' }}</p>
                                                                <div><i v-if="d_p_detail.store.is_verify" class="icon-check verify_icon_big"></i></div>
                                                            </div>
                                                            <p class="truncate_wrap m-0 font_13 text_grey" v-text="d_p_detail.store ? '@'+d_p_detail.store.username : ''"></p>
                                                        </div>
                                                        <!-- user_type level 2 -->
                                                        <template v-else>
                                                            <div class="detail_des_pro">
                                                                <div class="con-title-com">
                                                                    <p class="truncate_wrap font_16 font_bold m-0">{{ d_p_detail && d_p_detail.user && d_p_detail.user.name ? d_p_detail.user.name : '' }}</p>
                                                                    <div><i v-if="d_p_detail && d_p_detail.user && d_p_detail.user.is_verify" class="icon-check verify_icon_big"></i></div>
                                                                </div>
                                                                <p class="truncate_wrap m-0 font_13">{{ d_p_detail && d_p_detail.user && d_p_detail.user.username ? '@'+d_p_detail.user.username : '' }}</p>
                                                                <p class="font_12 m-0 text_grey">
                                                                    {{ $t('message.members_since') }} {{ d_p_detail.user ? clean_date(d_p_detail.user.registered_date) : '' }}
                                                                </p>
                                                            </div>
                                                        </template>
                                                    </div>
                                                    <div class="group-btn-follow">
                                                        <button @click.prevent="show_profile" class="btn sub-btn-1" :class="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine' ? '' : 'width_100 m-0'">
                                                            {{ d_p_detail && d_p_detail.store ? $t('new_text_3.view_store') : $t('new_text_3.view_profile') }}
                                                        </button>
                                                        <button v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'" @click.prevent="follow_or_unfollow('confirm')" class="btn sub-btn-2">
                                                            <i :class="d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? 'fas fa-check icon_check' : 'fa fa-plus icon_plus'"></i>
                                                            {{ d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}
                                                        </button>
                                                    </div>
                                                </div>
                                            </NuxtLink>
                                        </div>
                                    </div>

                                    <!-- comments -->
                                    <template v-if="d_p_detail">
                                        <template v-if="d_p_detail.status === 'deleted' || d_p_detail.status === 'expired'"></template>
                                        <div v-else class="de-con-com">
                                            <div class="style_flex rip_show_user">
                                                <div class="col p-0 width_100">
                                                    <!-- title comment -->
                                                    <div @click="go_to_detail_comment('all_com', { post_id: d_p_detail.id, data_com: '' })" class="de-title-com position-relative">
                                                        <div class="de-ti-d1"><p>{{ $t('new_text_3.comment') }}&nbsp;&nbsp;{{ d_p_detail.total_comment > 0 ? d_p_detail.total_comment : '' }}</p></div>
                                                        <div class="de-ti-d2">
                                                            <button class="btn">{{ $t('new_text_3.view_all') }}</button>
                                                        </div>
                                                    </div>
                                                    <!-- list comments -->
                                                    <template v-if="comments && comments.length > 0">
                                                        <div v-for="( cmd, index ) in comments" :key="index" class="_flex_">
                                                            <div class="de-pro-comment">
                                                                <img :src="cmd.profile && cmd.profile.data && cmd.profile.data.photo ? cmd.profile.data.photo : empty_img_user" alt="" @error="imageUrlAlt_profile">
                                                                <div class="par_online_com" v-if="cmd.profile && cmd.profile.data && cmd.profile.data.online_status && cmd.profile.data.online_status.is_active"></div>
                                                            </div>
                                                            <div class="de-text-com">
                                                                <div class="text-con-com">
                                                                    <p class="de-text-name">{{ cmd.profile && cmd.profile.data ? cmd.profile.data.name : '' }}</p>
                                                                    <p class="de-text-des" v-html="check_description1(cmd.comment)"></p>
                                                                </div>
                                                                <p @click="go_to_detail_comment('reply_parent', { post_id: d_p_detail.id, data_com: cmd })" class="de-com-time">
                                                                    <span class="time_date_comment">{{ cmd.date ? convertFromNow(cmd.date) : '' }}</span>
                                                                    <span class="de-reply-com cur_sur">{{ $t('new_text_3.reply') }}</span>
                                                                </p>
                                                                <p v-if="cmd.total_reply > 1 && !cmd.hide_view_more" class="com-view-more-reply text-left btn cur_sur" @click="go_to_detail_comment('reply_parent', { post_id: d_p_detail.id, data_com: cmd })">
                                                                    {{ $t('new_text_3.view_previous_reply') }} ({{ cmd.total_reply-1 }})
                                                                </p>
                                                                <!-- reply comments -->
                                                                <template v-if="cmd.last_replies && cmd.last_replies.length > 0">
                                                                    <div v-for="(reply , inx) in cmd.last_replies" :key="inx" style="padding: 0px 0px 0px 12px;" class="_flex_">
                                                                        <div class="de-pro-sub-com">
                                                                            <img :src="reply.profile && reply.profile.data && reply.profile.data.photo ? reply.profile.data.photo : empty_img_user" alt="" @error="imageUrlAlt_profile">
                                                                            <div class="sub_online_com" v-if="reply.profile && reply.profile.data && reply.profile.data.online_status && reply.profile.data.online_status.is_active"></div>
                                                                        </div>
                                                                        <div class="de-text-com">
                                                                            <div class="text-con-com">
                                                                                <p class="de-text-name">{{ reply.profile && reply.profile.data && reply.profile.data.name ? reply.profile.data.name : '' }}</p> 
                                                                                <p class="de-text-des" v-html="check_description1(reply.comment)"></p>
                                                                            </div>
                                                                            <p @click="go_to_detail_comment('reply_child', { post_id: d_p_detail.id, data_com: cmd })" class="de-com-time">
                                                                                <span class="time_date_comment">{{ reply.date ? convertFromNow(reply.date) : '' }}</span>
                                                                                <span class="de-reply-com cur_sur">{{ $t('new_text_3.reply') }}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <!-- add comment -->
                                                    <div v-if="isMobile" @click="go_to_detail_comment('all_com', { post_id: d_p_detail.id, data_com: '' })" class="_flex_ cur_sur">
                                                        <div class="de-pro-comment">
                                                            <img :src="user_data && user_data.user.photo ? user_data.user.photo.medium.url : empty_img_user" @error="imageUrlAlt_profile" alt="">
                                                        </div>
                                                        <div class="de-add-text-com">
                                                            <div> {{ $t('new_text_3.b_t_comment') }} <span class="ion-android-send"></span></div>
                                                        </div>
                                                    </div>
                                                    <div @click="create_comment" v-else class="_flex_ cur_sur">
                                                        <div class="de-pro-comment me-2">
                                                            <img :src="user_data && user_data.user.photo ? user_data.user.photo.medium.url : empty_img_user" @error="imageUrlAlt_profile" alt="">
                                                        </div>
                                                        <div class="d-flex w-100">
                                                            <input type="text" v-model="text_comment" autocomplete="off" maxlength="255" id="_message_" :placeholder="$t('new_text_3.chat_message')" class="form-control de_field_message"> 
                                                            <button type="btn" class="ion-android-send" style="margin-left: 15px;width: 50px;border: 0px;font-size: 25px;line-height: 1px;border-radius:5px"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div v-else>
                                    <!-- banner A type "code" or "image" -->
                                     <div :class="isMobile ? '' : 'h25'">
                                        <template v-if="banner && banner.a && banner.a.data.length > 0">
                                            <div v-if="banner.a.data[0].type === 'image'" class="banner-con mb-2 mt-2">
                                                <a rel="nofollow noopener" aria-label="banner" :href="check_link_banner(banner.a.data[0].link)" target="_blank">
                                                    <div>
                                                        <img :src="banner.a.data[0].image" alt="zone A"
                                                            :style="{ 'max-width': `${banner.a.data[0].width}px`, 'max-height': `${banner.a.data[0].height}px` }">
                                                    </div>
                                                </a>
                                            </div>
                                            <div v-else-if="banner.a.data[0].type === 'code'" v-html="banner.a.data[0].new_html_banner" class="align-width-banner mt-2 "></div>
                                        </template>
                                     </div>
                                    
                                    <nav class="m_t_b fn_15" v-if="d_p_detail">
                                        <span>
                                            <nuxt-link class="a-colors" :to="localePath({ name: 'index' })">
                                                <i class="bi bi-house-door me-1"></i>
                                                <span>{{ $t('message.home') }}</span>
                                            </nuxt-link>
                                        </span>
                                        <span v-if="d_p_detail.category && d_p_detail.category.parent_data">
                                            <span class="mx-2">/</span>
                                            <NuxtLink class="a-colors" :to="localePath({ name: 'c-slugCategory', params:{ slugCategory: d_p_detail.category.parent_data.slug } })">{{ locale==='km' ? d_p_detail.category.parent_data.km_name : d_p_detail.category.parent_data.en_name }}</NuxtLink>
                                        </span>
                                        <span v-if="d_p_detail.category">
                                            <span class="mx-2">/</span>
                                            <NuxtLink class="a-colors" v-if="d_p_detail.category" :to="localePath({ name: 'c-slugCategory', 
                                                params:{ slugCategory: d_p_detail.category.slug } })" >
                                                {{ locale==='km' ? d_p_detail.category.km_name : d_p_detail.category.en_name }}
                                            </NuxtLink>
                                        </span>
                                        <span v-if="d_p_detail.object_specs">
                                            <span v-if="d_p_detail.object_specs.brand">
                                                <span class="mx-2">/</span>
                                                <NuxtLink class="a-colors" :to="localePath({ name: 'c-slugCategory', 
                                                    params:{ slugCategory: d_p_detail.object_specs.category.value_slug  },
                                                    query:{ ad_field: d_p_detail.object_specs.brand.value_slug } })" >
                                                    {{d_p_detail.object_specs.brand.value}}
                                                </NuxtLink>
                                            </span>
                                            <span v-if="d_p_detail.object_specs['car-brand']">
                                                <span class="mx-2">/</span>
                                                <NuxtLink class="a-colors" :to="localePath({ name: 'c-slugCategory', 
                                                    params:{ slugCategory: d_p_detail.object_specs.category.value_slug  },
                                                    query:{ ad_field: d_p_detail.object_specs['car-brand'].value_slug } })" >
                                                    {{d_p_detail.object_specs['car-brand'].value}}
                                                </NuxtLink>
                                            </span>
                                            <span v-if="d_p_detail.object_specs['car-model']">
                                                <span class="mx-2">/</span>
                                                <NuxtLink class="a-colors" :to="localePath({ name: 'c-slugCategory', 
                                                    params:{ slugCategory: d_p_detail.object_specs.category.value_slug }, 
                                                    query:{ ad_field: d_p_detail.object_specs['car-brand'].value_slug , ad_model: d_p_detail.object_specs['car-model'].value_slug } })" >
                                                    {{d_p_detail.object_specs['car-model'].value}}
                                                </NuxtLink>
                                            </span>
                                        </span>
                                    </nav>
                                    <div >
                                        <div class="row">
                                            <div class="col-8 dt-col-start mb-3">
                                                <div >
                                                    <div class="border bg-white">
                                                        <div v-if="d_p_detail && d_p_detail.photos && d_p_detail.photos.length > 0">
                                                            <div v-if="d_p_detail.photos.length === 1" class="s_detail_photo_single" :class="isDesktop ? 'dt_con_pic_de_post m-0' : ''">
                                                                <div class="blur-profile-content bg-logo-post-detail">
                                                                    <div class="blur-profile-img" v-bind:style="{ backgroundImage: 'url(' + d_p_detail.photos[0] + ')' }"></div>
                                                                    <a rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')" :href="d_p_detail.photos[0]"
                                                                    data-fancybox="photo1"> 
                                                                        <img :data-src="d_p_detail.photos[0]"
                                                                            :alt="d_p_detail.title ? d_p_detail.title : ''"
                                                                            class="lazy" :class="d_p_detail.category.parent == 2 ? 'logo_profile_contain' : (isDesktop ? 'logo_post_detail DT_l_p_d' : 'logo_post_detail MB_l_p_d')"
                                                                            :src="empty_img_loading" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div v-else class="s_detail_photo_multiple" :class="isDesktop ? 'dt_con_pic_de_post m-0' : ''"> 
                                                                <div class="blur-profile-content bg-logo-post-detail">
                                                                    <div class="blur-profile-img" v-bind:style="{ backgroundImage: 'url(' + d_p_detail.photos[0] + ')' }"></div>
                                                                    <a rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')" :href="d_p_detail.photos[0]"
                                                                    data-fancybox="gallery-dt"> 
                                                                        <img :data-src="d_p_detail.photos[0]"
                                                                            :alt="d_p_detail.title ? d_p_detail.title : ''"
                                                                            class="lazy cur_sur"
                                                                            :class="d_p_detail.category.parent == 2 ? 'logo_profile_contain' : (isDesktop ? 'logo_post_detail DT_l_p_d' : 'logo_post_detail MB_l_p_d')"
                                                                            :src="empty_img_loading" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div v-if="d_p_detail.thumbnails && d_p_detail.thumbnails.length > 1" class="bg-g-img" :class="isDesktop ? 'm-0' : ''"> 
                                                                <div class="gallery-detail-post cur_sur">
                                                                    <a v-if="d_p_detail.thumbnails[1]" rel="nofollow" aria-label="Photo" class="de_img_post dt-bg-unset"
                                                                    @click="tracking_manual('view_photo')" :href="d_p_detail.photos[1]" data-fancybox="gallery-dt">
                                                                        <img :data-src="d_p_detail.thumbnails[1]" :src="empty_img_loading" alt="image" class="lazy img-4-1" />
                                                                    </a>
                                                                    <a v-if="d_p_detail.thumbnails[2]" rel="nofollow" aria-label="Photo" class="de_img_post dt-bg-unset"
                                                                    @click="tracking_manual('view_photo')" :href="d_p_detail.photos[2]" data-fancybox="gallery-dt">
                                                                        <img v-if="d_p_detail.thumbnails[2]" :data-src="d_p_detail.thumbnails[2]"
                                                                            alt="image2" class="lazy img-4-2" :src="empty_img_loading" />
                                                                    </a>
                                                                    <a v-if="d_p_detail.thumbnails[3]" rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')"
                                                                    :href="d_p_detail.photos[3]" class="de_img_blur dt-bg-unset" data-fancybox="gallery-dt">
                                                                        <img :data-src="d_p_detail.thumbnails[3]"
                                                                            :class="d_p_detail.thumbnails.length > 4 ? 'gallery-brightness' : ''"
                                                                            alt="image3" class="lazy" :src="empty_img_loading" />
                                                                        <span v-if="d_p_detail.thumbnails.length > 4">+{{ d_p_detail.thumbnails.length - 4 }}</span>
                                                                    </a>
                                                                    <template v-if="d_p_detail.thumbnails.length >= 4">
                                                                        <template v-for="(img, index) in d_p_detail.thumbnails" :key="index">
                                                                            <a v-if="index >= 4" rel="nofollow" aria-label="Photo" @click="tracking_manual('view_photo')"
                                                                            :href="d_p_detail.photos[index]" data-fancybox="gallery-dt" class="d-none">
                                                                                <img :src="img" alt="image" class="img-4-1" />
                                                                            </a>
                                                                        </template>
                                                                    </template>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="pb-0 d_text_padding_detail d_style_border_detail">
                                                            <h1 class="font_19 m-0 font_light_bold line_height_1_8 break_word_" v-text="d_p_detail && d_p_detail.title ? d_p_detail.title : ''"></h1>
                                                            <p class="font_13 m-0 mt-1 c_m_grey">
                                                                AD ID: {{ route.params.id }} &#8226; {{ d_p_detail && d_p_detail.location ? (locale === 'km' ? d_p_detail.location.km_name : d_p_detail.location.en_name ) + ' &#8226; ' + convertFromNow(d_p_detail.renew_date, 'get_full_date') : '' }}
                                                            </p>
                                                            
                                                            <p class="c_m_grey mb-0 mt-2 d-flex"> <!-- full_width truncate -->
                                                                <strong class="d-big-price">
                                                                    {{ d_p_detail && d_p_detail.price > 0 ? ( d_p_detail.category && d_p_detail.category.parent == 2 ? '$'+convert_price(d_p_detail.price)+'+' : '$'+convert_price(d_p_detail.price)) : $t('new_text.negotiable') }}
                                                                </strong>
                                                                <span v-if="d_p_detail && d_p_detail.discount" class="font_12 text_grey dt_d_price_detail_discount">
                                                                    ${{ convert_price(d_p_detail.discount.original_price) }}
                                                                </span>
                                                                <span v-if="d_p_detail && d_p_detail.discount" class="font_12 text_grey dt_d_price_detail_off">
                                                                    {{ d_p_detail.discount.type === 'percent' ? parseInt(d_p_detail.discount.discount)+'% OFF' : '$'+parseInt(d_p_detail.discount.discount)+' OFF' }}
                                                                </span>

                                                                <span class="ms-auto dt-col-end" v-if="d_p_full_detail && d_p_full_detail.actions.length > 0 && check_auth_and_item_user_id_the_same === 'not_mine'">
                                                                    <div v-if="d_p_full_detail.actions.includes('like')" class="width_head_bottom_nav"
                                                                        @click="click_like(d_p_detail.id, d_p_detail.is_like, 'detail',{ placement: 'detail', paid: d_p_detail.type && d_p_detail.type !== 'normal' ? true : false })">
                                                                        <div class="middle_item cur_sur justify-content-end">
                                                                            <i v-if="d_p_detail.is_like" class="fas fa-heart d_icon_h_bot_nav parent_color" style="margin: 0 0 0 10px;"></i>
                                                                            <i v-else class="far fa-heart d_icon_h_bot_nav text_grey"></i>
                                                                            <p v-if="parseInt(d_p_detail.total_like) !== 0" class="m-0 ms-1">{{ d_p_detail.total_like > 0 ? d_p_detail.total_like : '' }}</p>
                                                                        </div>
                                                                    </div>
                                                                </span>
                                                            </p>

                                                            <div v-if="d_p_detail && d_p_detail.shipping" class="d_have_shipping">
                                                                <i class="fas fa-truck p-1 font_11"></i>
                                                                <p class="m-0 status_pad_in_box font_11">{{ d_p_detail.shipping.title }}</p>
                                                            </div>
                                                        </div>
                                                        <div style="position: unset !important;padding: 0px 16px;" v-if="d_p_detail && d_p_detail.status === 'deleted'" class="nav overflow_class">
                                                            <div class="text-center full_width">
                                                                <p class="post_delete">{{ $t('new_text_1.post_has_been_delete') }}</p>
                                                            </div>
                                                        </div>
                                                        <div v-else-if="d_p_detail && d_p_detail.status === 'expired'" class="nav overflow_class">
                                                            <div class="text-center full_width">
                                                                <p class="post_expired">{{ $t('new_text_2.post_expired') }}</p>
                                                            </div>
                                                        </div>
                                                        <div style="position: unset !important;padding: 0px 16px;" v-else-if="d_p_detail && check_auth_and_item_user_id_the_same === 'mine'" class="nav overflow_class">
                                                            <!-- delete own post -->
                                                            <div v-if="d_p_detail && !d_p_detail.is_premium" class="col pr-1 pt-2">
                                                                <button @click="show_modal_delete" class="btn form-control btn_sms custom_btn_ d_own_btn_delete">
                                                                    {{ $t('message.delete') }}
                                                                </button>
                                                            </div>
                                                            <!-- renew own post -->
                                                            <div v-if="d_p_detail && d_p_detail.status === 'active' && renew_btn_disable(d_p_detail.renew_date)" :class="d_p_detail.is_premium ? 'col pr-1 pt-2' : 'col pl-1 pr-1 pt-2'">
                                                                <button @click="renew_button(d_p_detail.id)" class="btn form-control btn_call custom_btn_ d_own_btn_modify">
                                                                    {{ $t('new_text.renew') }}
                                                                </button>
                                                            </div>
                                                            <!-- edit own post -->
                                                            <div v-if="d_p_detail && d_p_detail.status !== 'block'" :class="d_p_detail.is_premium && !renew_btn_disable(d_p_detail.renew_date) ? 'col pt-2' : 'col pl-1 pt-2'">
                                                                <div @click="click_edit_post(d_p_detail.id, d_p_detail.status === 'expired' ? 'expired' : '', d_p_detail.store ? d_p_detail.store.id : '')"
                                                                    class="btn form-control custom_btn_ d_own_btn_modify">
                                                                    {{ d_p_detail.status === 'expired' ? $t('new_text.re_post') : $t('lng.edit') }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                         <!-- banner B type "code" or "image" -->
                                                        <template v-if="banner && banner.b && banner.b.data.length > 0">
                                                            <div v-if="banner.b.data[0].type === 'image'" class="banner-con mb-2 mt-2">
                                                                <a rel="nofollow noopener" aria-label="banner" :href="check_link_banner(banner.b.data[0].link)" target="_blank">
                                                                    <div>
                                                                        <img :src="banner.b.data[0].image" alt="zone A"
                                                                            :style="{ 'max-width': `${banner.b.data[0].width}px`, 'max-height': `${banner.b.data[0].height}px` }">
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div v-else-if="banner.b.data[0].type === 'code'" v-html="banner.b.data[0].new_html_banner" class="align-width-banner mt-2 "></div>
                                                        </template>

                                                        <div class="d_style_border_detail" :class="isDesktop ? 'dt_border' : ''">
                                                            <section class="d_text_padding_detail">
                                                                <div class="show_short_detail_post mb-3">
                                                                    <!-- <dl>
                                                                        <dt>ID :</dt>
                                                                        <dd> {{ d_p_detail && d_p_detail.id ? d_p_detail.id : '' }} </dd>
                                                                    </dl>
                                                                    <dl>
                                                                        <dt>{{ $t('new_text.like') }} : </dt>
                                                                        <dd v-if="d_p_detail && d_p_detail.total_like">
                                                                            <NuxtLink v-if="d_p_detail && d_p_detail.id" @click="save_track_optional('clear', { clear: 'clear_old' })" class="parent_color_strong ml-1"
                                                                                    :to="localePath({ name: 'title-adid-id-liked', params: { title: d_p_detail.title ? check_title_char(d_p_detail.title) : '.', id: d_p_detail.id } })">
                                                                                {{d_p_detail.total_like }}
                                                                            </NuxtLink>
                                                                        </dd>
                                                                        <dd v-else>
                                                                            <p class="ml-1 m-0">0</p>
                                                                        </dd>
                                                                    </dl> -->
                                                                    <template v-if="d_p_detail && d_p_detail.object_specs">
                                                                        <div v-for="description in d_p_detail.object_specs" :key="description">
                                                                            <dl v-if="Array.isArray(description.value)">
                                                                                <dt>{{ description.title }} : </dt>
                                                                                <template v-if="description.value">
                                                                                    <dd v-for="(list, index) in description.value" :key="index">
                                                                                        <span>{{list}}</span><span v-if="index+1 < description.value.length">, </span>
                                                                                    </dd>
                                                                                </template>
                                                                            </dl>
                                                                            <dl v-else>
                                                                                <dt>{{ description.title }} : </dt>
                                                                                <dd class="ms-1">{{ description.value }}</dd>
                                                                            </dl>
                                                                        </div>
                                                                    </template>
                                                                </div>

                                                                <!-- <p class="mb-3 font_16 m-0 line_paragraph" @click="handleClick" v-html="clear_break(content_dis)"></p> -->
                                                                <p class="mb-3 font_16 m-0 line_paragraph" @click="handleClick" v-html="content_dis"></p>

                                                                <p class="font_16 m-0 mb-3 line_height_1_5">
                                                                    <b>{{ $t('new_text_1.contact_info') }}: </b> {{ $t('new_text_1.product_from') }}
                                                                </p>

                                                                <template v-if="d_p_detail && d_p_detail.phone_white_operator">
                                                                    <div v-for="p_num of d_p_detail.phone_white_operator" :key="p_num" class="d_phone_num_link">
                                                                        <img :src="p_num.icon" class="d_img_tell" alt="icon">
                                                                        <a rel="nofollow" class="dt_p_n_link" v-if="show_phone_number" @click="tracking_manual('call')" v-bind:href="'tel:'+p_num.phone">{{ p_num.phone }}</a>
                                                                        <div class="cur_sur dt_p_n_link" rel="nofollow" v-else @click="click_display_full_P_N" >
                                                                            {{ display_P_N(p_num.phone) }}
                                                                            <i>{{ $t('new_text.text_call') }}</i>
                                                                        </div>
                                                                    </div>
                                                                </template>

                                                                <!-- Desktop Chats Suggestion Box (not show in detail job) -->
                                                                <template v-if="isDesktop && d_p_full_detail && d_p_full_detail.setting && !d_p_full_detail.setting.enable_apply_job">
                                                                    <div class="chats_suggestion_box" v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'">
                                                                        <div class="c_s_b_i_chat"><span class="icon icon-chat"></span></div>
                                                                        <div class="quick_c_detail">
                                                                            <div class="q_c_info">{{ $t('new_text_3.quick_question') }}</div>
                                                                            <ul class="q_c_ul">
                                                                                <template v-if="language === 'km'">
                                                                                    <li v-for="val in chat_buy_km" :key="val" class="cur_sur" @click="sent_text_chat(val)"><span>{{ val }}</span></li>
                                                                                </template>
                                                                                <template v-else>
                                                                                    <li v-for="val in chat_buy_en" :key="val" class="cur_sur" @click="sent_text_chat(val)"><span>{{ val }}</span></li>
                                                                                </template>
                                                                            </ul>
                                                                            <div class="list-items position_relative">
                                                                                <div class="q_c_msg_box">
                                                                                    <input type="text" class="form-control" id="text_chats" v-model="text_chat" :placeholder="d_p_detail.user.name ? 'Chat with '+d_p_detail.user.name : ''" autocomplete="off">
                                                                                    <button @click="sent_text_chat('')" aria-label="Send" class="btn btn_send disabled">
                                                                                        <span class="ion-android-send"></span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </template>

                                                                <div v-if="d_p_detail && d_p_detail.location" class="style_flex mt-3">
                                                                    <!-- <i class="fas fa-map-marker-alt d_style_contact"></i> -->
                                                                    <p class="d_mg_info"> <b class="font_16">{{ $t('message.location') }}: </b>
                                                                        <!-- {{ d_p_detail.location.address ? d_p_detail.location.address+', ' : '' }} -->
                                                                        <span  v-html="content_add"></span>
                                                                        {{ d_p_detail.location.long_location }} 
                                                                    </p>
                                                                        <!-- <p class="mb-3 font_16 m-0 line_paragraph"  v-html="content_add"></p> -->
                                                                </div>
                                                                <a rel="nofollow noopener" aria-label="Map" @click="tracking_manual('map')" class="d_show_map_des" v-if="d_p_detail && d_p_detail.location && d_p_detail.location.map" target="_blank"
                                                                v-bind:href="'https://maps.google.com/maps?q='+d_p_detail.location.map.x+','+d_p_detail.location.map.y+'&'+d_p_detail.location.map.z">
                                                                    <div class="text location_map">
                                                                        <span class="fa fa-map-marked-alt"></span> {{ $t('message.show_google_map') }}
                                                                    </div>
                                                                </a>
                                                            </section>
                                                            
                                                            <!-- <section v-if="isMobile === false" class="group-c-p pt-0">
                                                                <template v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'">
                                                                    <div class="w-100">
                                                                        <div v-if="d_p_full_detail && d_p_full_detail.actions.length > 0" class="d-flex w-100">
                                                                            <div v-if="d_p_full_detail.actions.includes('like')" class="width_head_bottom_nav"
                                                                                @click="click_like(d_p_detail.id, d_p_detail.is_like, 'detail',{ placement: 'detail', paid: d_p_detail.type && d_p_detail.type !== 'normal' ? true : false })">
                                                                                <div class="middle_item cur_sur" style="margin: 13px 0 0 0;">
                                                                                    <i v-if="d_p_detail.is_like" class="fas fa-heart d_icon_h_bot_nav parent_color" style="margin: 0 0 0 10px;"></i>
                                                                                    <i v-else class="far fa-heart d_icon_h_bot_nav text_grey"></i>
                                                                                    <p v-if="parseInt(d_p_detail.total_like) !== 0" class="m-0 ms-1">{{ d_p_detail.total_like > 0 ? d_p_detail.total_like : '' }}</p>
                                                                                </div>
                                                                            </div>

                                                                            <template v-if="d_p_detail && d_p_detail.phone_white_operator && d_p_detail.phone_white_operator.length > 0">
                                                                                <div v-if="d_p_full_detail.actions.includes('sms')" :class="d_p_full_detail.actions.includes('apply_job') ? 'col-2 d_pad_btn_nav' : 'col d_pad_btn_nav'">
                                                                                    <button @click="dialog_phone_number('sms')" class="btn form-control btn_sms btn-lg bg_parent_color text-white" id="btn_sms" aria-label="SMS">
                                                                                        <i aria-hidden="true" class="fa fa-envelope font_23 align-middle"></i>
                                                                                    </button>
                                                                                </div>
                                                                                <div v-if="d_p_full_detail.actions.includes('call')" :class="d_p_full_detail.actions.includes('apply_job') ? 'col-2 d_pad_btn_nav' : 'col d_pad_btn_nav'">
                                                                                    <button @click="dialog_phone_number('call')" class="btn btn-k24-primary btn-height" id="btn_call" aria-label="Call">
                                                                                        <i aria-hidden="true" class="fa fa-phone font_22 align-middle"></i> 
                                                                                    </button>
                                                                                </div>
                                                                            </template>

                                                                            
                                                                            <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && !d_p_full_detail.setting.enable_apply_job" class="col d_pad_btn_nav pe-0">
                                                                                <button type="button" @click="show_chat" class="btn btn-height btn-k24-secondary" aria-label="chat">
                                                                                    <i aria-hidden="true" class="icon-chat font_24 align-middle"></i>
                                                                                </button>
                                                                            </div>
                                                                            
                                                                            <div v-else-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && d_p_full_detail.setting.enable_apply_job" class="col-2 d_pad_btn_nav">
                                                                                <button @click="show_chat" class="btn btn-k24-primary btn-height" aria-label="Chat">
                                                                                    <i class="icon-chat font_24 align-middle"></i>
                                                                                </button>
                                                                            </div>

                                                                            <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_apply_job" class="col d_pad_btn_nav pe-0">
                                                                                <button @click="click_apply_job(d_p_detail.is_job_applied, d_p_detail.id, d_p_detail.title)" :class="d_p_detail.is_job_applied ? 'btn btn-secondary btn-height' : 'btn btn-k24-secondary btn-height'">
                                                                                    {{ d_p_detail.is_job_applied ? $t('new_text.applied') : $t('new_text.apply_job') }}
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    </div>        
                                                                </template>
                                                            </section> -->

                                                            <section class="d_btn_below_des pb-2 dt-px-10" v-if="d_p_detail && d_p_detail.status !== 'deleted'"> <!-- if post status active -->
                                                                <!-- save -->
                                                                <template v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_save">
                                                                    <div v-if="check_auth_and_item_user_id_the_same === 'not_mine'" @click="save_ads(d_p_detail && d_p_detail.is_saved ? 'unsave' : 'save', 'detail', d_p_detail && d_p_detail.is_saved ? 'confirm' : '')"
                                                                        class="col cur_sur" :class="isMobile ? 'd_b_parent' : 'd_b_parent'">
                                                                        <div :class="d_p_detail && d_p_detail.is_saved && isMobile ? 'truncate d_b_child d_b_child_saved parent_color field-height p_t_6' : 'p_t_6 truncate d_b_child dt-field-height p-2'">
                                                                            <i class="fa fa-bookmark font_16"></i>
                                                                            <span class="m-0 font_14 font_bold">{{ d_p_detail && d_p_detail.is_saved ? $t('new_text.saved') : $t('new_text.save') }}</span>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                                <!-- report post -->
                                                                <div v-if="check_auth_and_item_user_id_the_same === 'not_mine'" class="col d_b_parent cur_sur">
                                                                    <div class="truncate d_b_child p_t_6" :class="isMobile ? 'field-height' : 'dt-field-height pt-2'" @click="report_on_post('detail')">
                                                                        <i class="fas fa-exclamation-circle font_16"></i>
                                                                        <span class="m-0 font_14 font_bold">{{ $t('message.report_this_post') }}</span>
                                                                    </div>
                                                                </div>
                                                                <!-- share post -->
                                                                <div class="col cur_sur" :class="isMobile ? 'd_b_parent' : 'd_b_parent'">
                                                                    <div @click="detectMob('')" class="truncate d_b_child p_t_6" :class="isMobile ? 'field-height' : 'dt-field-height pt-2'">
                                                                        <i class="icon-share1 font_16"></i>
                                                                        <span class="m-0 ms-1 font_14 font_bold">{{ $t('new_text.share') }}</span>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="mt-2 border bg-white d-flex">
                                                        <div class="Disclaimer-line"></div>
                                                        <div class="p-3 ">
                                                            <div class="Disclaimer-title">ការមិនទទួលខុសត្រូវ / Disclaimer</div>
                                                            <div class="Disclaimer-info">
                                                                <div>យើងខ្ញុំមិនគ្រប់គ្រងមាតិកា ដែលបានបង្ហោះឡើងដោយសមាជិកឡើយ។ ដូច្នេះយើងមិនទទួលខុសត្រូវលើការផ្សាយផលិតផលនេះទេ ហើយក៏មិនធានាចំពោះបញ្ហាដែលទាក់ទងដោយផ្ទាល់ ឬ ប្រយោលទៅនឹងសកម្មភាព ឬ អសកម្មណាមួយឡើយ។</div>
                                                                <div class="mt-2">We does not control the content posted by members and therefore assumes no responsibility and disclaims any liability for any consequence relating directly or indirectly to any action or inaction.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-if="d_p_detail" class="border mt-2">
                                                        <!-- Desktop view cover profile or store -->
                                                        <div v-if="isDesktop && ((d_p_detail && d_p_detail.store && d_p_detail.store.cover) || (d_p_detail && d_p_detail.user && d_p_detail.user.cover))" class="dt_cover_store_post">
                                                            <NuxtLink v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })"
                                                                @click="save_tracking_user({ placement: 'detail' }, { clear: 'clr_old_data' })">
                                                                <img v-if="d_p_detail && d_p_detail.store" :src="d_p_detail.store.cover ? d_p_detail.store.cover.large.url : empty_img_post" alt="store cover">
                                                                <img v-else :src="d_p_detail && d_p_detail.user && d_p_detail.user.cover ? d_p_detail.user.cover.large.url : empty_img_post" alt="user cover">
                                                            </NuxtLink>
                                                        </div>

                                                        <div class=" d_style_div_profiles" :class="isDesktop ? 'border-top-0' : ''">
                                                            <NuxtLink v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })"
                                                                @click="save_tracking_user({ placement: 'detail' }, { clear: 'clr_old_data' })" id="show_pro_user" class="style_flex rip_show_user">
                                                                <div class="col pro_style width_100">
                                                                    <div class="_flex_">
                                                                        <div class="d_thumb_profile_detail">
                                                                            <!-- logo store -->
                                                                            <img v-if="d_p_detail && d_p_detail.store" :src='d_p_detail.store && d_p_detail.store.logo ? d_p_detail.store.logo.medium.url : empty_img_user'
                                                                                :alt="d_p_detail.store.title" class="img_profile bg_reload_img" @error="imageUrlAlt_profile">
                                                                            <!-- logo simple user -->
                                                                            <img v-else :src="d_p_detail && d_p_detail.user && d_p_detail.user.photo ? d_p_detail.user.photo.medium.url : empty_img_user"
                                                                                :alt="d_p_detail && d_p_detail.user ? d_p_detail.user.name : ''" class="img_profile bg_reload_img" @error="imageUrlAlt_profile">
                                                                            <div :class="d_p_detail && d_p_detail.user && d_p_detail.user.online_status.is_active ? '_online_' : ''"></div>
                                                                        </div>
                                                                        <!-- store -->
                                                                        <div v-if="d_p_detail && d_p_detail.store" class="detail_des_pro">
                                                                            <div class="con-title-com">
                                                                                <p class="truncate_wrap font_16 font_bold m-0">{{ d_p_detail.store ? d_p_detail.store.title : '' }}</p>
                                                                                <div><i v-if="d_p_detail.store.is_verify" class="icon-check verify_icon_big"></i></div>
                                                                            </div>
                                                                            <p class="truncate_wrap m-0 font_13 text_grey" v-text="d_p_detail.store ? '@'+d_p_detail.store.username : ''"></p>
                                                                        </div>
                                                                        <!-- user_type level 2 -->
                                                                        <template v-else>
                                                                            <div class="detail_des_pro">
                                                                                <div class="con-title-com">
                                                                                    <p class="truncate_wrap font_16 font_bold m-0">{{ d_p_detail && d_p_detail.user && d_p_detail.user.name ? d_p_detail.user.name : '' }}</p>
                                                                                    <div><i v-if="d_p_detail && d_p_detail.user && d_p_detail.user.is_verify" class="icon-check verify_icon_big"></i></div>
                                                                                </div>
                                                                                <p class="truncate_wrap m-0 font_13">{{ d_p_detail && d_p_detail.user && d_p_detail.user.username ? '@'+d_p_detail.user.username : '' }}</p>
                                                                                <p class="font_12 m-0 text_grey">
                                                                                    {{ $t('message.members_since') }} {{ d_p_detail.user ? clean_date(d_p_detail.user.registered_date) : '' }}
                                                                                </p>
                                                                            </div>
                                                                        </template>
                                                                    </div>
                                                                    <div class="group-btn-follow">
                                                                        <button @click.prevent="show_profile" class="btn sub-btn-1" :class="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine' ? '' : 'width_100 m-0'">
                                                                            {{ d_p_detail && d_p_detail.store ? $t('new_text_3.view_store') : $t('new_text_3.view_profile') }}
                                                                        </button>
                                                                        <button v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'" @click.prevent="follow_or_unfollow('confirm')" class="btn sub-btn-2">
                                                                            <i :class="d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? 'fas fa-check icon_check' : 'fa fa-plus icon_plus'"></i>
                                                                            {{ d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </NuxtLink>
                                                        </div>
                                                    </div>
                                                    <div v-if="d_p_detail" class="border mt-2">
                                                        <template v-if="d_p_detail.status === 'deleted' || d_p_detail.status === 'expired'"></template>
                                                        <div v-else class="de-con-com m-0">
                                                            <div class="style_flex rip_show_user">
                                                                <div class="col p-0 width_100">
                                                                    <!-- title comment -->
                                                                    <div @click="go_to_detail_comment('all_com', { post_id: d_p_detail.id, data_com: '' })" class="de-title-com position-relative">
                                                                        <div class="de-ti-d1"><p>{{ $t('new_text_3.comment') }}&nbsp;&nbsp;{{ d_p_detail.total_comment > 0 ? d_p_detail.total_comment : '' }}</p></div>
                                                                        <div class="de-ti-d2">
                                                                            <button class="btn">{{ $t('new_text_3.view_all') }}</button>
                                                                        </div>
                                                                    </div>
                                                                    <!-- list comments -->
                                                                    <template v-if="comments && comments.length > 0">
                                                                        <div v-for="( cmd, index ) in comments" :key="index" class="_flex_">
                                                                            <div class="de-pro-comment">
                                                                                <img :src="cmd.profile && cmd.profile.data && cmd.profile.data.photo ? cmd.profile.data.photo : empty_img_user" alt="" @error="imageUrlAlt_profile">
                                                                                <div class="par_online_com" v-if="cmd.profile && cmd.profile.data && cmd.profile.data.online_status && cmd.profile.data.online_status.is_active"></div>
                                                                            </div>
                                                                            <div class="de-text-com">
                                                                                <div class="text-con-com">
                                                                                    <p class="de-text-name">{{ cmd.profile && cmd.profile.data ? cmd.profile.data.name : '' }}</p>
                                                                                    <p class="de-text-des" v-html="check_description1(cmd.comment)"></p>
                                                                                </div>
                                                                                <p @click="go_to_detail_comment('reply_parent', { post_id: d_p_detail.id, data_com: cmd })" class="de-com-time">
                                                                                    <span class="time_date_comment">{{ cmd.date ? convertFromNow(cmd.date) : '' }}</span>
                                                                                    <span class="de-reply-com cur_sur">{{ $t('new_text_3.reply') }}</span>
                                                                                </p>
                                                                                <p v-if="cmd.total_reply > 1 && !cmd.hide_view_more" class="com-view-more-reply text-left btn cur_sur" @click="go_to_detail_comment('reply_parent', { post_id: d_p_detail.id, data_com: cmd })">
                                                                                    {{ $t('new_text_3.view_previous_reply') }} ({{ cmd.total_reply-1 }})
                                                                                </p>
                                                                                <!-- reply comments -->
                                                                                <template v-if="cmd.last_replies && cmd.last_replies.length > 0">
                                                                                    <div v-for="(reply , inx) in cmd.last_replies" :key="inx" style="padding: 0px 0px 0px 12px;" class="_flex_">
                                                                                        <div class="de-pro-sub-com">
                                                                                            <img :src="reply.profile && reply.profile.data && reply.profile.data.photo ? reply.profile.data.photo : empty_img_user" alt="" @error="imageUrlAlt_profile">
                                                                                            <div class="sub_online_com" v-if="reply.profile && reply.profile.data && reply.profile.data.online_status && reply.profile.data.online_status.is_active"></div>
                                                                                        </div>
                                                                                        <div class="de-text-com">
                                                                                            <div class="text-con-com">
                                                                                                <p class="de-text-name">{{ reply.profile && reply.profile.data && reply.profile.data.name ? reply.profile.data.name : '' }}</p> 
                                                                                                <p class="de-text-des" v-html="check_description1(reply.comment)"></p>
                                                                                            </div>
                                                                                            <p @click="go_to_detail_comment('reply_child', { post_id: d_p_detail.id, data_com: cmd })" class="de-com-time">
                                                                                                <span class="time_date_comment">{{ reply.date ? convertFromNow(reply.date) : '' }}</span>
                                                                                                <span class="de-reply-com cur_sur">{{ $t('new_text_3.reply') }}</span>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </template>
                                                                            </div>
                                                                        </div>
                                                                    </template>
                                                                    <!-- add comment -->
                                                                    <div v-if="isMobile" @click="go_to_detail_comment('all_com', { post_id: d_p_detail.id, data_com: '' })" class="_flex_ cur_sur">
                                                                        <div class="de-pro-comment">
                                                                            <img :src="user_data && user_data.user.photo ? user_data.user.photo.medium.url : empty_img_user" @error="imageUrlAlt_profile" alt="">
                                                                        </div>
                                                                        <div class="de-add-text-com">
                                                                            <div> {{ $t('new_text_3.b_t_comment') }} <span class="ion-android-send"></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div @click="create_comment" v-else class="_flex_ cur_sur">
                                                                        <div class="de-pro-comment me-2">
                                                                            <img :src="user_data && user_data.user.photo ? user_data.user.photo.medium.url : empty_img_user" @error="imageUrlAlt_profile" alt="">
                                                                        </div>
                                                                        <div class="d-flex w-100">
                                                                            <input type="text" v-model="text_comment" autocomplete="off" maxlength="255" id="_message_" :placeholder="$t('new_text_3.chat_message')" class="form-control de_field_message"> 
                                                                            <button type="btn" class="btn ion-android-send btn-send-cmm position-absolute end-0"></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4  dt-col-end mb-3">
                                                <div class="g-user-or-store">
                                                    <div class="bg-white border w-100">
                                                        <NuxtLink v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })"
                                                            @click="save_tracking_user({ placement: 'detail' }, { clear: 'clr_old_data' })">
                                                            <div class="dt-p-user d-flex align-items-center">
                                                                <div class="_flex_ px-3">
                                                                    <div class="d_thumb_profile_detail">
                                                                        <img v-if="d_p_detail && d_p_detail.store" :src='d_p_detail.store && d_p_detail.store.logo ? d_p_detail.store.logo.small.url : empty_img_user'
                                                                            :alt="d_p_detail.store.title" class="img_profile bg_reload_img" @error="imageUrlAlt_profile">
                                                                        <img v-else :src="d_p_detail && d_p_detail.user && d_p_detail.user.photo ? d_p_detail.user.photo.small.url : empty_img_user"
                                                                            :alt="d_p_detail && d_p_detail.user ? d_p_detail.user.name : ''" class="img_profile bg_reload_img" @error="imageUrlAlt_profile">
                                                                        <div :class="d_p_detail && d_p_detail.user && d_p_detail.user.online_status.is_active ? '_online_' : ''"></div>
                                                                    </div>
                                                                    
                                                                    <div v-if="d_p_detail && d_p_detail.store" class="detail_des_pro text-white">
                                                                        <div class="con-title-com">
                                                                            <p class="truncate_wrap font_16 font_bold m-0">{{ d_p_detail.store ? d_p_detail.store.title : '' }}</p>
                                                                            <div><i v-if="d_p_detail.store.is_verify" class="icon-check verify_icon_big text-white"></i></div>
                                                                        </div>
                                                                        <p class="truncate_wrap m-0 font_13" v-text="d_p_detail.store ? '@'+d_p_detail.store.username : ''"></p>
                                                                    </div>
                                                                    
                                                                    <template v-else>
                                                                        <div class="detail_des_pro text-white">
                                                                            <div class="con-title-com">
                                                                                <p class="truncate_wrap font_16 font_bold m-0">{{ d_p_detail && d_p_detail.user && d_p_detail.user.name ? d_p_detail.user.name : '' }}</p>
                                                                                <div><i v-if="d_p_detail && d_p_detail.user && d_p_detail.user.is_verify" class="icon-check verify_icon_big text-white"></i></div>
                                                                            </div>
                                                                            <p class="truncate_wrap m-0 font_13">{{ d_p_detail && d_p_detail.user && d_p_detail.user.username ? '@'+d_p_detail.user.username : '' }}</p>
                                                                            <p class="font_12 m-0 ">
                                                                                {{ $t('message.members_since') }} {{ d_p_detail.user ? clean_date(d_p_detail.user.registered_date) : '' }}
                                                                            </p>
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                            </div>
                                                        </NuxtLink>
                                                        <div class="p-3">
                                                            <template v-if="d_p_detail && d_p_detail.phone_white_operator">
                                                                <div v-for="p_num of d_p_detail.phone_white_operator" :key="p_num" class="d_phone_num_link">
                                                                    <img :src="p_num.icon" class="me-3 d_img_tell" alt="icon"> 
                                                                    <a rel="nofollow" class="dt_p_n_link text-black ms-0" v-if="show_phone_number" @click="tracking_manual('call')" v-bind:href="'tel:'+p_num.phone">{{ p_num.phone }}</a>
                                                                    <div class="cur_sur" rel="nofollow" v-else @click="click_display_full_P_N" >
                                                                        {{ display_P_N(p_num.phone) }}
                                                                        <i>{{ $t('new_text.text_call') }}</i>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                            <div class="style_flex border-bottom border-top py-2">
                                                                <nuxt-link v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })">
                                                                    <div class="position-relative d-flex align-baseline">
                                                                        <i class="bi bi-shop d_style_contact _i fn_20 me-3 "></i>
                                                                        <span class="w-100 text-break fn_16 pt-1"> 
                                                                            {{ url_store  }}/{{ username_user_or_store }}
                                                                        </span>
                                                                    </div>
                                                                </nuxt-link>
                                                            </div>
                                                            <div v-if="d_p_detail && d_p_detail.location" class="style_flex align-baseline mt-2">
                                                                <i class="bi bi-geo-alt d_style_contact _i fn_20 me-3"></i>
                                                                <p class="d_mg_info w-100 fn_16 pt-1">
                                                                    {{ locale==='km' ? d_p_detail.location.km_name  : d_p_detail.location.en_name  }} <span v-if="d_p_detail.location.address">, {{ d_p_detail.location.address }}</span>
                                                                </p>
                                                            </div>
                                                            <a rel="nofollow noopener" aria-label="Map" @click="tracking_manual('map')" class="d_show_map_des" v-if="d_p_detail && d_p_detail.location && d_p_detail.location.map" target="_blank"
                                                            v-bind:href="'https://maps.google.com/maps?q='+d_p_detail.location.map.x+','+d_p_detail.location.map.y+'&'+d_p_detail.location.map.z">
                                                                <div class="text location_map">
                                                                    <span class="fa fa-map-marked-alt"></span> {{ $t('message.show_google_map') }}
                                                                </div>
                                                            </a>
                                                            <section v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'" class="d_btn_below_des px-0 mt-2 pb-0">
                                                                <div v-if="!isMobile" class="w-100">
                                                                    <div v-if="d_p_full_detail && d_p_full_detail.actions.length > 0" class="d-flex w-100">
                                                                        <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && !d_p_full_detail.setting.enable_apply_job" class="col d_pad_btn_nav px-0 pb-0">
                                                                            <button type="button" @click="show_chat" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="chat">
                                                                                <i aria-hidden="true" class="icon-chat fn_25 align-middle"></i>
                                                                                <span> Chat</span>
                                                                            </button>
                                                                        </div>
                                                                        <div v-else-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && d_p_full_detail.setting.enable_apply_job" class="col-2 d_pad_btn_nav px-0 pb-0">
                                                                            <button @click="show_chat" class="btn btn-k24-primary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="Chat">
                                                                                <i class="icon-chat align-middle fn_25"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_apply_job" class="col d_pad_btn_nav pe-0 ps-2">
                                                                            <button @click="click_apply_job(d_p_detail.is_job_applied, d_p_detail.id, d_p_detail.title)" class="border-0" :class="d_p_detail.is_job_applied ? (isMobile ? 'btn btn-secondary btn-height' : 'dt-btn-height') : (isMobile ? 'btn btn-k24-secondary btn-height' : 'btn btn-k24-secondary dt-btn-height')" >
                                                                                {{ d_p_detail.is_job_applied ? $t('new_text.applied') : $t('new_text.apply_job') }}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>    
                                                            </section>
                                                        </div>
                                                    </div>
                                                    <div class="safty mt-3">
                                                        <div class="align_div_center">
                                                            <p class="d_title_warning line_height_1_2">
                                                                <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="d_img_warning">
                                                                ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                                            </p>
                                                        </div>
                                                        <div class="d_margin_left_detail">
                                                            <span class="d_color_des_detail position_absolute d_span_safety">1. </span>
                                                            <div class="text-dark d_font_size_detail">
                                                                <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                                                            </div>
                                                        </div>
                                                        <div class="d_margin_left_detail">
                                                            <span class="d_color_des_detail position_absolute d_span_safety">2. </span>
                                                            <div class="text-dark d_font_size_detail">
                                                                <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                                                            </div>
                                                        </div>
                                                        <div class="d_margin_left_detail">
                                                            <span class="d_color_des_detail position_absolute d_span_safety">3. </span>
                                                            <div class="text-dark d_font_size_detail">
                                                                <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                                                            </div>
                                                        </div>
                                                        <div class="d_margin_left_detail">
                                                            <span class="d_color_des_detail position_absolute d_span_safety">4. </span>
                                                            <div class="text-dark d_font_size_detail">
                                                                <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- banner C type "code" or "image" -->
                                                    <template v-if="banner && banner.c && banner.c.data && banner.c.data.length > 0">
                                                        <template v-for="ban in banner.c.data" :key="ban">
                                                            <div v-if="ban.type === 'image' && ban.width" class="banner-con mt-3" :class="isDesktop ? 'des_container' : ''">
                                                                <a rel="nofollow noopener" :href="check_link_banner(ban.link)" target="_blank" aria-label="Banner Zone B">
                                                                    <div>
                                                                        <img :src="ban.image" alt="banner image" :style="{ 'max-width': `${ban.width}px`, 'max-height': `${ban.height}px`, 'min-height': `${ban.height/2}px` }">
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div v-else-if="ban.type === 'code' && ban.width" v-html="ban.new_html_banner" class="align-width-banner mt-3"></div>
                                                        </template>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <!-- display Related Posts -->
                            <template v-if="d_p_detail && ( (d_p_detail.store) || (d_p_detail.user && d_p_detail.user.user_type && d_p_detail.user.user_type == 2) )">
                                <h3 v-if="d_p_related_post && d_p_related_post.data && d_p_related_post.data.length > 0" class="truncate font_text_bold font_18  mb-2" :class="isMobile ? 'categories_padding mt-4': ''">
                                    {{ $t('message.related_post') }}
                                </h3>
                            </template>
                            <template v-else>
                                <div v-if="d_p_related_post && d_p_related_post.data && d_p_related_post.data.length" class="col no_padding " :class="isMobile ? 'padd_div' : 'p-0'">
                                    <h3 v-if="d_p_related_post.type == 'user_post'" class="truncate font_text_bold font_18 mb-2" :class="isMobile ? 'categories_padding mt-4': ''">
                                        {{ $t('message.more_post_of') }}  {{ d_p_detail && d_p_detail.user && d_p_detail.user.name ? d_p_detail.user.name : '' }}
                                    </h3>
                                    <h3 v-else-if="d_p_related_post.type == 'relate_post'" class="truncate font_text_bold font_18 mb-2" :class="isMobile ? 'categories_padding mt-4': ''">
                                        {{ $t('message.related_post') }}
                                    </h3>
                                    <h3 v-else-if="d_p_related_post.type == 'store_post'" class="truncate font_text_bold font_18 mb-2" :class="isMobile ? 'categories_padding mt-4': ''">
                                        {{ $t('message.more_post_of') }} {{ d_p_detail && d_p_detail.store ? d_p_detail.store.title : (d_p_detail && d_p_detail.user && d_p_detail.user.name ? d_p_detail.user.name : '') }}
                                    </h3>
                                </div>
                            </template>

                            <!-- related post -->
                            <div v-if="loading_related" class="flex_all_post lists_post_content mt-2" :class="isDesktop ? 'dt_grid_mg_post' : ''" :id="isMobile ? '' : 'height_div'">
                                <div v-for="index in 6" :key="index" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                                    <div class="list_items_post">
                                        <div class="my_card border_animation_bg">
                                            <!-- info user -->
                                            <div class="style_flex padding_content">
                                                <div class="col-3 p-0">
                                                    <div class="animated-background rounded-circle" style="width: 26px;height: 26px;margin: 0 auto;"></div>
                                                </div>
                                                <div class="col-9 p-0">
                                                    <div class="animated-background text_hei_loading_price l_i_p_mg"></div>
                                                </div>
                                            </div>
                                            <!-- info user post -->
                                            <div class="animated-background mt-1 height_media"></div>
                                            <!-- content post -->
                                            <div class="l_i_p_pd">
                                                <div class="animated-background text_hei_loading_title mb-2"></div>
                                                <div class="animated-background text_hei_loading mb-2 width_80"></div>
                                                <div class="animated-background text_hei_loading_price mb-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="flex_all_post lists_post_content" :class="isDesktop ? 'screen_desktop dt_grid_mg_post' : ''" :id="isMobile ? '' : 'height_div'">
                                    <template v-if="d_p_related_post && d_p_related_post.data">
                                        <template v-for="(post, index) of d_p_related_post.data" :key="index">
                                            <article v-if="post.data.id !== route.params.id" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                                                <div class="list_items_post">
                                                    <div class="my_card p-h">
                                                        <!-- info user post -->
                                                        <NuxtLink class="position_relative d_block" :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                                                  @click="save_track_optional('tracking', { placement: 'related', display_type: 'grid', item_count: d_p_related_post.data.length, item_per_page: d_p_related_post.limit, current_index: index,
                                                                    paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                            <!-- status show discount -->
                                                            <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                                <p class="new_st_dis_price">
                                                                    {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                                </p>
                                                                <p class="new_st_dis_text">OFF</p>
                                                            </div>

                                                            <div class="height_media position_relative">

                                                                <!-- options -->
                                                                <div @click.prevent="show_options(post, { current_index: index, placement: 'related', display_type: 'grid' })" class="grid-opt-post">
                                                                    <i class="icon-ellipsis-vertical"></i>
                                                                </div>

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
                                                                     :class="post.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                     :src="empty_img_loading" @error="imageUrlAlt_post" class="lazy height_media img_post_listing" />
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

                                                                <p v-if="post.data.price" class="gr-p-price truncate">
                                                                    <strong>
                                                                        {{ parseInt(post.data.price) > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{ post.data.price > 0 && post.data.category && post.data.category.parent == 2 ? '+' : '' }}
                                                                    </strong>
                                                                    <span v-if="post.data.discount" class="line_price"> {{ '$'+convert_price(post.data.discount.original_price) }} </span>
                                                                </p>
                                                                <p v-else class="gr-p-price">
                                                                    <strong>{{ $t('new_text.negotiable') }}</strong>
                                                                </p>
                                                            </div>

                                                            <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                                            <div v-else class="list_pad_icon_heart">
                                                                <div v-if="post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like,'',
                                                                    { current_index: index, placement: 'related', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false })" class="cl_ripple">
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
                                    </template>
                                </div>

                                <!-- View More -->
                                <template v-if="d_p_related_post && d_p_related_post.data && (d_p_related_post.data.length > 21)">
                                    <NuxtLink v-if="username_user_or_store && d_p_related_post.type == 'store_post' || d_p_related_post.type == 'user_post'"
                                              :to="localePath({ name: 'username', params: { username: username_user_or_store } })" aria-label="View More"
                                              @click="save_tracking_user({ placement: 'related' }, { clear: 'clr_old_data' })" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                                        <div v-if="!isMobile" class="categories_padding pl-2 pr-2 m_t_b36">
                                            <div class="my_card related_style ripple_view_more"> {{ $t('message.view_more') }} </div>
                                        </div>
                                        <div v-if="isMobile" class="categories_padding pl-2 pr-2">
                                            <div class="my_card related_style ripple_view_more"> {{ $t('message.view_more') }} </div>
                                        </div>
                                    </NuxtLink>
                                </template>

                                <div v-if="d_p_detail && d_p_detail.status === 'deleted' && isMobile" class="nav overflow_class">
                                    <div class="text-center full_width">
                                        <p class="post_delete">{{ $t('new_text_1.post_has_been_delete') }}</p>
                                    </div>
                                </div>
                                <div v-else-if="d_p_detail && d_p_detail.status === 'expired' && isMobile" class="nav overflow_class">
                                    <div class="text-center full_width">
                                        <p class="post_expired">{{ $t('new_text_2.post_expired') }}</p>
                                    </div>
                                </div>
                                <template v-else>
                                    <div v-if="isMobile">
                                        <!-- bottom navigation -->
                                        <template v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'">
                                            <div>
                                                <div v-if="d_p_full_detail && d_p_full_detail.actions.length > 0" class="nav d_bottom_btn_nav">
                                                    <div v-if="d_p_full_detail.actions.includes('like')" class="width_head_bottom_nav"
                                                        @click="click_like(d_p_detail.id, d_p_detail.is_like, 'detail',{ placement: 'detail', paid: d_p_detail.type && d_p_detail.type !== 'normal' ? true : false })">
                                                        <div class="middle_item cur_sur" style="margin: 13px 0 0 0;">
                                                            <i v-if="d_p_detail.is_like" class="fas fa-heart d_icon_h_bot_nav parent_color" style="margin: 0 0 0 10px;"></i>
                                                            <i v-else class="far fa-heart d_icon_h_bot_nav text_grey"></i>
                                                            <p v-if="parseInt(d_p_detail.total_like) !== 0" class="m-0 ms-1">{{ d_p_detail.total_like > 0 ? d_p_detail.total_like : '' }}</p>
                                                        </div>
                                                    </div>

                                                    <template v-if="d_p_detail && d_p_detail.phone_white_operator && d_p_detail.phone_white_operator.length > 0">
                                                        <div v-if="d_p_full_detail.actions.includes('sms')" :class="d_p_full_detail.actions.includes('apply_job') ? 'col-2 d_pad_btn_nav' : 'col d_pad_btn_nav'">
                                                            <button @click="dialog_phone_number('sms')" class="btn bg_parent_color " :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_sms" aria-label="SMS">
                                                                <i aria-hidden="true" class="fa fa-envelope font_24 align-middle"></i> <!-- {{ $t('message.sms') }} -->
                                                            </button>
                                                        </div>
                                                        <div v-if="d_p_full_detail.actions.includes('call')" :class="d_p_full_detail.actions.includes('apply_job') ? 'col-2 d_pad_btn_nav' : 'col d_pad_btn_nav'">
                                                            <button @click="dialog_phone_number('call')" class="btn pt-6 fns-17 btn-k24-primary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_call" aria-label="Call">
                                                                <i aria-hidden="true" class="fa fa-phone font_24 align-middle"></i> <!-- {{ $t('message.call') }} -->
                                                            </button>
                                                        </div>
                                                    </template>

                                                    <!-- Chat button post items -->
                                                    <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && !d_p_full_detail.setting.enable_apply_job" class="col d_pad_btn_nav">
                                                        <button type="button" @click="show_chat" class="btn fns-17 pt-6 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="chat">
                                                            <i aria-hidden="true" class="icon-chat font_24 align-middle"></i>
                                                        </button>
                                                    </div>
                                                    <!-- Chat button post job -->
                                                    <div v-else-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && d_p_full_detail.setting.enable_apply_job" class="col-2 d_pad_btn_nav">
                                                        <button @click="show_chat" class="btn btn-k24-primary pt-6" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="Chat">
                                                            <i class="icon-chat font_24 align-middle"></i>
                                                        </button>
                                                    </div>

                                                    <!-- apply button ( true = applied , false = apply ) -->
                                                    <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_apply_job" class="col d_pad_btn_nav">
                                                        <button @click="click_apply_job(d_p_detail.is_job_applied, d_p_detail.id, d_p_detail.title)" :class="d_p_detail.is_job_applied ? (isMobile ? 'btn btn-secondary btn-height' : 'btn btn-secondary dt-btn-height') : (isMobile ? 'btn fns-17 btn-k24-secondary btn-height ' : 'btn fns-17 btn-k24-secondary dt-btn-height ')">
                                                            {{ d_p_detail.is_job_applied ? $t('new_text.applied') : $t('new_text.apply_job') }}
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </template>

                                        <!-- is post ads is mine -->
                                        <div v-else-if="d_p_detail && check_auth_and_item_user_id_the_same === 'mine'" class="nav overflow_class px-2">
                                            <!-- delete own post -->
                                            <div v-if="d_p_detail && !d_p_detail.is_premium" class="col pr-1 pt-2">
                                                <button @click="show_modal_delete" class="btn form-control btn_sms custom_btn_ d_own_btn_delete">
                                                    {{ $t('message.delete') }}
                                                </button>
                                            </div>
                                            <!-- renew own post -->
                                            <div v-if="d_p_detail && d_p_detail.status === 'active' && renew_btn_disable(d_p_detail.renew_date)" :class="d_p_detail.is_premium ? 'col pr-1 pt-2' : 'col pl-1 pr-1 pt-2'">
                                                <button @click="renew_button(d_p_detail.id)" class="btn form-control btn_call custom_btn_ d_own_btn_modify">
                                                    {{ $t('new_text.renew') }}
                                                </button>
                                            </div>
                                            <!-- edit own post -->
                                            <div v-if="d_p_detail && d_p_detail.status !== 'block'" :class="d_p_detail.is_premium && !renew_btn_disable(d_p_detail.renew_date) ? 'col pt-2' : 'col pl-1 pt-2'">
                                                <div @click="click_edit_post(d_p_detail.id, d_p_detail.status === 'expired' ? 'expired' : '', d_p_detail.store ? d_p_detail.store.id : '')"
                                                     class="btn form-control custom_btn_ d_own_btn_modify">
                                                    {{ d_p_detail.status === 'expired' ? $t('new_text.re_post') : $t('lng.edit') }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- right side -->
                <div v-if="isDesktop" class="col-4 right-side">
                    <div v-if="loading" class="bg-white">
                        <div class="d_style_div_profile _flex_" style="padding: 15px;">
                            <div class="col-3 p-0">
                                <div class="animated-background rounded-circle" style="width:60px;height:60px;"></div>
                            </div>
                            <div class="col-9" style="padding:3px 0 0 0;">
                                <div class="animated-background text_hei_loading_title mb-2"></div>
                                <div class="animated-background text_hei_loading_price mb-2 width_50"></div>
                                <div class="animated-background text_hei_loading width_70"></div>
                            </div>
                        </div>
                        <div class="mb-2 d_style_div_profile _flex_" style="padding: 15px;">
                            <div class="col-12" style="padding:3px 0 0 0;">
                                <div class="animated-background text_hei_loading_title mb-2"></div>
                                <div class="animated-background text_hei_loading_price mb-2 width_50"></div>
                                <div class="animated-background text_hei_loading width_70"></div>
                                <div class="animated-background text_hei_loading_price mt-2 mb-2 width_50"></div>
                                <div class="animated-background text_hei_loading width_70"></div>
                                <hr>
                                <div class="row">
                                    <div class="col pr-2"><div class="animated-background text_hei_loading" style="height: 36px;"></div></div>
                                    <div class="col pl-2"><div class="animated-background text_hei_loading" style="height: 36px;"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="dt_r_s_profile dt_border">
                        <!-- Desktop Profile User -->
                        <template v-if="d_p_detail && d_p_detail.user && !d_p_detail.store">
                            <!-- profile jobs post -->
                            <template v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_apply_job">
                                <NuxtLink :to="localePath({ name: 'username', params: { username: username_user_or_store } })">
                                    <div class="dt_h_pro_cover">
                                        <template v-if="d_p_detail && d_p_detail.user_detail && d_p_detail.user_detail.cover && d_p_detail.user_detail.cover && d_p_detail.user_detail.cover.medium">
                                            <img :src="d_p_detail.user_detail.cover.medium.url" alt="job cover">
                                        </template>
                                    </div>
                                    <div class="dt_h_pro_image">
                                        <img :src="d_p_detail && d_p_detail.user && d_p_detail.user.photo ? d_p_detail.user.photo.medium.url : empty_img_user" alt="profile photo">
                                    </div>
                                </NuxtLink>
                                <div class="dt_h_pro_title">
                                    <NuxtLink :to="localePath({ name: 'username', params: { username: username_user_or_store } })">
                                        SAND ASSET INVESMENT CO., LTD
                                    </NuxtLink>
                                </div>
                            </template>
                            <!-- profile simple user -->
                            <template v-else>
                                <NuxtLink class="dt_r_s_p_info" v-if="username_user_or_store" :to="localePath({ name: 'username', params: { username: username_user_or_store } })"
                                          @click="save_tracking_user({ placement: 'detail' },{ clear: 'clr_old_data' })">
                                    <div class="dt_r_s_p_img">
                                        <img :src="d_p_detail && d_p_detail.user && d_p_detail.user.photo ? d_p_detail.user.photo.medium.url : empty_img_user" alt="profile">
                                    </div>
                                    <div :class="d_p_detail && d_p_detail.user && d_p_detail.user.online_status.is_active ? 'dt_pro_online' : ''"></div>
                                    <div class="dt_r_s_p_detail">
                                        <div class="dt_pro_user_name">
                                            <p class="truncate_wrap">{{ d_p_detail && d_p_detail.user && d_p_detail.user.name ? d_p_detail.user.name : '' }}</p>
                                            <div><i v-if="d_p_detail && d_p_detail.user && d_p_detail.user.is_verify" class="icon-check"></i></div>
                                        </div>
                                        <p class="dt_r_s_last_active">{{ d_p_detail && d_p_detail.user && d_p_detail.user.online_status && d_p_detail.user.online_status.last_active ? d_p_detail.user.online_status.last_active : '' }}</p>
                                        <p class="dt_r_s_btn_link">{{ $t('text_desktop.show_all_ads_from_user') }}</p>
                                    </div>
                                    <!-- desktop view following user -->
                                    <div class="dt_r_s_p_follow" v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'" @click.prevent="follow_or_unfollow('confirm')">
                                        <span :class="d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? 'fas fa-check icon_check' : 'icon-plus icon_plus'"></span>
                                        <p>{{ d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}</p>
                                    </div>
                                </NuxtLink>
                            </template>
                            <div class="dt_r_s_p_content dt_r_s_sec">
                                <template v-if="d_p_detail && d_p_detail.phone_white_operator">
                                    <div v-for="p_num of d_p_detail.phone_white_operator" :key="p_num" class="dt_phone_num_link">
                                        <img :src="p_num.icon" class="d_img_tell" alt="icon">
                                        <a rel="nofollow" class="dt_p_n_link" @click="tracking_manual('call')" v-if="show_phone_number" v-bind:href="'tel:'+p_num.phone">{{ p_num.phone }}</a>
                                        <div class="dt_p_n_link cur_sur" rel="nofollow" v-else @click="click_display_full_P_N">
                                            {{ display_P_N(p_num.phone) }}
                                            <i>{{ $t('new_text.text_call') }}</i>
                                        </div>
                                    </div>
                                </template>

                                <ul class="dt_list_unstyled">
                                    <li v-if="d_p_detail && d_p_detail.user_detail && d_p_detail.user_detail.link" class="dt_li_link">
                                        <span class="fas fa-home"></span>
                                        <a rel="nofollow noopener" class="btn-link" target="_blank" :href="d_p_detail.user_detail.link">{{ d_p_detail.user_detail.link }}</a>
                                    </li>
                                    <li v-if="d_p_detail && d_p_detail.location" class="dt_li_locations">
                                        <span class="icon-map-pin"></span>
                                        {{ d_p_detail.location.address ? d_p_detail.location.address+', ' : '' }}{{ d_p_detail.location.long_location }}
                                    </li>
                                    <li v-if="d_p_detail && d_p_detail.location && d_p_detail.location.map">
                                        <a rel="nofollow noopener" aria-label="Map" @click="tracking_manual('map')" class="d_show_map_des" target="_blank"
                                           v-bind:href="'https://maps.google.com/maps?q='+d_p_detail.location.map.x+','+d_p_detail.location.map.y+'&'+d_p_detail.location.map.z">
                                            <div class="text location_map position_relative">
                                                <span class="fa fa-map-marked-alt dt_icon_map"></span> {{ $t('message.show_google_map') }}
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <!-- Desktop Profile Store -->
                        <template v-else-if="d_p_detail && d_p_detail.store">
                            <NuxtLink class="dt_pro_company" :to="localePath({ name: 'username', params: { username: username_user_or_store } })">
                                <div class="dt_com_pic" >
                                    <img :src="d_p_detail.store.logo && d_p_detail.store.logo.medium ? d_p_detail.store.logo.medium.url : empty_img_user" alt="logo">
                                </div>
                                <div class="dt_com_info">
                                    <p class="dt_c_i_name" rel="nofollow">{{ d_p_detail.store.title ? d_p_detail.store.title : '' }}</p>
                                    <div>
                                        <small v-if="d_p_detail.store.is_verify" class="text-success me-2"><span class="icon icon-check"></span> Verify Seller</small>
                                        <small class="parent_color btn-link">{{ $t('new_text_3.view_all_post') }}</small>
                                    </div>

                                    <!-- desktop view following store -->
                                    <div class="dt_r_s_store_follow" v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'" @click.prevent="follow_or_unfollow('confirm')">
                                        <span :class="d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? 'fas fa-check icon_check' : 'fa fa-plus icon_plus'"></span>
                                        <p>{{ d_p_detail.user_detail && d_p_detail.user_detail.is_follow ? $t('new_text_3.following') : $t('new_text_3.follow') }}</p>
                                    </div>
                                </div>
                            </NuxtLink>
                            <div class="dt_pro_agent">
                                <div class="dt_s_contact_title">{{ $t('new_text_3.contact_agent') }}</div>
                                <div class="dt_s_phone_box">
                                    <NuxtLink class="btn_show_phone_box" v-if="d_p_detail && d_p_detail.user" :to="localePath({ name: 'username', params: { username: d_p_detail.user.username } })">
                                        <span class="dt_s_contact_photo">
                                            <img :src="d_p_detail.user.photo && d_p_detail.user.photo.medium ? d_p_detail.user.photo.medium.url : empty_img_user" alt="profile">
                                        </span>
                                        <div class="dt_s_contact_name">{{ d_p_detail.user.name ? d_p_detail.user.name : '' }}</div>
                                        <div class="dt_s_contact_num">{{ d_p_detail.user.username ? '@'+d_p_detail.user.username : '' }}</div>
                                        <div class="dt_s_contact_btn_link">{{ $t('message.members_since') }} {{ d_p_detail.user ? clean_date(d_p_detail.user.registered_date) : '' }}</div>
                                    </NuxtLink>
                                    <div v-if="d_p_detail && d_p_detail.phone_white_operator" class="dt_s_contact_store">
                                        <div v-for="p_num of d_p_detail.phone_white_operator" :key="p_num" class="dt_phone_num_link">
                                            <img :src="p_num.icon" class="d_img_tell" alt="icon">
                                            <a rel="nofollow" class="dt_p_n_link" @click="tracking_manual('call')" v-if="show_phone_number" v-bind:href="'tel:'+p_num.phone">{{ p_num.phone }}</a>
                                            <div class="dt_p_n_link cur_sur" rel="nofollow" v-else @click="click_display_full_P_N">
                                                {{ display_P_N(p_num.phone) }}
                                                <i>{{ $t('new_text.text_call') }}</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- Desktop All Button -->
                        <template v-if="d_p_detail && check_auth_and_item_user_id_the_same === 'not_mine'">
                            <div class="dt_r_s_p_footer border-top dt_r_s_sec _flex_" v-if="d_p_full_detail && d_p_full_detail.actions.length > 0">
                                <template v-if="d_p_detail && d_p_detail.phone_white_operator && d_p_detail.phone_white_operator.length > 0">
                                    <div v-if="d_p_full_detail.actions.includes('call')" class="me-2 width_100">
                                        <button type="button" @click="dialog_phone_number('call')" class="btn dt_r_s_p_f_a dt_call_btn">
                                            <span class="fa fa-phone"></span> {{ $t('message.call') }}
                                        </button>
                                    </div>
                                </template>
                                <!-- DT Chat button post items -->
                                <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && !d_p_full_detail.setting.enable_apply_job" class="width_100">
                                    <button type="button" @click="show_chat" class="btn dt_r_s_p_f_a dt_chat_btn">
                                        <span class="icon icon-chat"></span> {{ $t('message.chat') }}
                                    </button>
                                </div>
                                <!-- DT Chat button post job -->
                                <div v-else-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_chat && d_p_full_detail.setting.enable_apply_job" class="me-2 width_50">
                                    <button type="button" @click="show_chat" class="btn dt_r_s_p_f_a dt_call_btn">
                                        <span class="icon icon-chat"></span> {{ $t('message.chat') }}
                                    </button>
                                </div>
                                <!-- DT apply button ( true = applied , false = apply ) -->
                                <div v-if="d_p_full_detail && d_p_full_detail.setting && d_p_full_detail.setting.enable_apply_job" class="width_100">
                                    <button type="button" @click="click_apply_job(d_p_detail.is_job_applied, d_p_detail.id, d_p_detail.title)" class="btn dt_r_s_p_f_a dt_chat_btn">
                                        {{ d_p_detail.is_job_applied ? $t('new_text.applied') : $t('new_text.apply_job') }}
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- warning status -->
                    <template v-if="d_p_detail && d_p_detail.user && (d_p_detail.user.user_type === '1' && !d_p_detail.store) && d_p_detail.category.parent != 2">
                        <div v-if="check_auth_and_item_user_id_the_same === 'not_mine'" class="d_text_padding_detail mb-2 mt-2 d_style_border_detail d_style_warning mt-4">
                            <div class="align_div_center">
                                <p class="d_title_warning line_height_1_2">
                                    <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="icon d_img_warning">
                                    ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                </p>
                            </div>
                            <div class="d_margin_left_detail">
                                <span class="d_color_des_detail position_absolute d_span_safety">1. </span>
                                <div class="text-dark d_font_size_detail">
                                    <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                                </div>
                            </div>
                            <div class="d_margin_left_detail">
                                <span class="d_color_des_detail position_absolute d_span_safety">2. </span>
                                <div class="text-dark d_font_size_detail">
                                    <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                                </div>
                            </div>
                            <div class="d_margin_left_detail">
                                <span class="d_color_des_detail position_absolute d_span_safety">3. </span>
                                <div class="text-dark d_font_size_detail">
                                    <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                                </div>
                            </div>
                            <div class="d_margin_left_detail">
                                <span class="d_color_des_detail position_absolute d_span_safety">4. </span>
                                <div class="text-dark d_font_size_detail">
                                    <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <div v-if="loading_field" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
            </div>
        </div>

        <!-- show success message -->
        <div class="toast style_toast d-none toast_ads_detail toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="me-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ms-2"> {{ message_success ? message_success : $t('lng.report_success') }} </p>
                </strong>
                <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <!-- /show success message -->

        <!-- Modal report post -->
        <div class="modal fade"  :class="isMobile ? 'style_full_screen' : ''" id="show_modal_list_report_post" tabindex="-1" role="dialog">
            <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'"  role="document">
                <div  class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 's_content' : 'dt_modal_width p-3'">
                        <div class="border_bottom m-r-p-pad">
                            <p class="modal-title font_15"> {{ $t('message.report_this_post') }} </p>
                        </div>
                        <div class="modal-body p-0 overflow_content">
                            <ul class="list-unstyled bg-white">
                                <li @click="choose_report(re.value)" v-for="re in report_post.data" :key="re" class="full_field_tag cur_sur">
                                    {{ locale === 'km' ? re.km : re.en }}
                                    <i v-if="re.value === report_check" class="fas fa-check color_sub_icon mt-1 float-right c_orange"></i>
                                </li>
                            </ul>
                            <div class="u_rep_pad_sub">
                                <textarea v-model="description" rows="4" id="description" :placeholder="$t('new_text_1.description')" class="form-control"></textarea>
                                <label id="error_description" class="text-danger font_14 ms-2 d-none">{{ $t('validation.error_description') }}</label>
                            </div>
                        </div>
                        <!-- button submit report -->
                        <div class="p-2 text-center _flex_ border-top">
                            <div @click="close_report_modal" class="col-4 p-0">
                                <p class="font_16 modal-title p-2 bg_grey me-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
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
        <!-- /modal report post -->

        <!-- Modal show phone number -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_show_phone_or_sms" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto m_w'" role="document">
                <div  class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded p-3'">
                    <div :class="isMobile ? 'modal_bottom_screen' : ''">
                        <!-- show warning only for normal user and not job category -->
                        <div class="option-phone-warning" v-if="d_p_detail && d_p_detail.user && (d_p_detail.user.user_type === '1' && !d_p_detail.store) && d_p_detail.category.parent != 2">
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
                        <div class="modal-body de-content-modal-option">
                            <ul class="list-unstyled mobile_modal_actions_container" id="list-phone-modal">
                                <li class="mobile_modal_action py-2 text-secondary">
                                    <p class="m-auto fn_20">{{ sms_or_call === 'call' ? $t('message.call') : $t('message.sms') }}</p>
                                </li>
                                <template v-if="d_p_detail && d_p_detail.phone_white_operator && d_p_detail.phone_white_operator.length > 0">
                                    <li v-for="p_n in d_p_detail.phone_white_operator" :key="p_n" class="cl_ripple">
                                        <a rel="nofollow" aria-label="Phone" class="mobile_modal_action color_reason cur_sur flex_imp" :href="sms_or_call === 'call' ? 'tel:'+p_n.phone : 'sms:'+p_n.phone">
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
                        <div class=" cur_sur">
                            <div class="cl_ripple mobile_modal_action" data-bs-dismiss="modal" aria-label="Close">
                                <p class="m-auto text-secondary"><b>{{ $t('message.cancel') }}</b></p>
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
        <!-- /Modal safety tip -->

        <!-- modal show confirm unsaved -->
        <div class="modal class_modal_show_message toast_z_index" id="modal_confirm_unsaved" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3">
                        <b> {{ $t('new_text.unsaved') }} </b> <br>
                    </div>
                    <div class="modal-footer border_unset m-s-c-u-mg">
                        <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
                        <button type="button" @click="save_ads('unsave', from_where, '')"  class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal show confirm unsaved -->

        <!-- modal show confirm unFollow -->
        <div class="modal class_modal_show_message toast_z_index" id="modal_confirm_unfollow" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3">
                        <b> {{ $t('new_text_3.status_unfollow') }} {{ d_p_detail && d_p_detail.store ? d_p_detail.store.title : (d_p_detail && d_p_detail.user ? d_p_detail.user.name : '') }} </b> <br>
                    </div>
                    <div class="modal-footer border_unset m-s-c-u-mg">
                        <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
                        <button type="button" @click.prevent="follow_or_unfollow('')" class="btn text-primary text-danger"> {{ $t('new_text_3.unfollow') }} </button>
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
                    <div class="modal-footer u_safety_footer" >
                        <div data-bs-dismiss="modal" class="btn text-primary cur_sur"> {{ $t('message.close') }} </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show error connection -->

        <!-- alert show option share media -->
        <div class="modal fade t-0 b-0" id="modal_show_option_share" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? 'max_width_form s_content p-3 bg-modal' : 'rounded'">

                    <div class="option_selected">
                        <div class="text-center border_bottom m-r-p-sm-pad">
                            <p class="modal-title font_19">{{ $t('new_text.share') }}</p>
                        </div>
                        <ul class="list-unstyled mobile_modal_actions_container mb-0">
                            <li @click="facebook_sharing" class="mobile_modal_action py-2">
                                <div class="cur_sur color_reason _flex_">
                                    <div class="col _flex_ p-0">
                                        <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                                        <p class="img_share_option_color">Facebook</p>
                                    </div>
                                </div>
                            </li>
                            <li @click="twitter_sharing" class="mobile_modal_action py-2">
                                <div class="cur_sur color_reason">
                                    <div class="col _flex_ p-0">
                                        <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                                        <p class="img_share_option_color">Twitter</p>
                                    </div>
                                </div>
                            </li>
                            <li @click="copy_link(detail_one_post.short_link)" class="mobile_modal_action py-2">
                                <div class="cur_sur color_reason">
                                    <div class="col _flex_ p-0">
                                        <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                                        <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                                        <div class="h-c-parent">
                                            <input id="copy_link" v-on:focus="$event.target.select()" ref="clickLink" readonly :value="detail_one_post.short_link" class="hide_copy_text"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-3">
                        <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`account_t.cancel`) }}</button>
                    </div>

                </div>
            </div>
        </div>
        <!-- /alert show option share media -->

        <!-- Modal show delete reason post -->
        <div class="modal fade style_full_screen" id="modal_show_delete_reason" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="s_content" :class="isDesktop ? 'dt_modal_width' : ''">
                        <div class="border_bottom m-r-p-pad">
                            <p class="modal-title font_15"> {{ $t('lng.delete_reason') }} </p>
                        </div>
                        <div class="modal-body p-0 overflow_content">
                            <ul class="list-unstyled bg-white">
                                <li @click="choose_delete(re.value)" v-for="re in delete_post.data" :key="re" class="full_field_tag">
                                    {{ locale === 'km' ? re.km : re.en }}
                                    <i v-if="re.value === delete_check" class="fas fa-check color_sub_icon mt-1 float-right c_orange"></i>
                                </li>
                            </ul>
                            <div v-if="show_description" class="u_rep_pad_sub">
                                <textarea v-model="delete_description" rows="4" id="delete_description" :placeholder="$t('new_text_1.description')" class="form-control"></textarea>
                                <label id="error_delete_description" class="text-danger font_14 ms-2 d-none">{{ $t('validation.error_description') }}</label>
                            </div>
                        </div>
                        <!-- button submit report -->
                        <div class="p-2 text-center _flex_ border-top">
                            <div @click="close_delete_modal" class="col-4 p-0 cur_sur">
                                <p class="font_16 modal-title p-2 bg_grey me-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                            </div>
                            <div @click="click_delete_ads" class="col-8 p-0 cur_sur">
                                <p class="font_16 modal-title p-2 bg_orange text-white rounded cur_sur"> {{ $t('message.delete') }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show delete reason post -->

        <!-- modal options post -->
        <div  class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_actions_post" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 's_content p-3 bg-modal overflow_class ' : ' p-3'">
                        <!-- content -->
                        <div class="modal-body de-content-modal-option">
                            <ul class="list-unstyled mobile_modal_actions_container">
                                <li v-if="detail_one_post && detail_one_post.user">
                                    <NuxtLink @click="close_modal" :to="localePath({ name: 'username', params: { username: detail_one_post.user.username } })" class="mobile_modal_action cur_sur">
                                        <i class="far fa-user"></i>
                                        <p class="mb-0">{{ $t('message.view_profile') }}</p>
                                    </NuxtLink>
                                </li>
                                <li @click="share_manual_post" class="mobile_modal_action cur_sur">
                                    <i class="icon-share"></i>
                                    <p class="mb-0">{{ $t('new_text.share') }}</p>
                                </li>
                                <li @click="save_manual_post(detail_one_post && detail_one_post.is_saved ? 'unsave' : 'save')" class="mobile_modal_action cur_sur">
                                    <i :class="detail_one_post && detail_one_post.is_saved ? 'fa fa-bookmark' : 'far fa-bookmark'"></i>
                                    <p class="mb-0">{{ detail_one_post && detail_one_post.is_saved ? $t('new_text.un_save') : $t('new_text.save') }}</p>
                                </li>
                                <li @click="report_manual_post" class="mobile_modal_action dt-bottom cur_sur">
                                    <i class="icon-info"></i>
                                    <p class="mb-0">{{ $t('message.report_this_post') }}</p>
                                </li>
                            </ul>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`account_t.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_success" tabindex="-1" aria-hidden="true" @click="cickClose">
            <div class="modal-dialog " :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto '">
                <div class="modal-content "  :class="isMobile ? 'modal' : 'm-success'">
                    <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                        <div  class="p-4">
                            <div class="col-12 p-0 text-right">
                                <a rel="nofollow" href="javascript:void(0)" @click="cickClose" class="cl_but" aria-label="Close">
                                    <span class="fa fa-times c_p_success"></span>
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isDesktop ? 'dt_success_body' : 'margin_below_app_bar'">
                            <div class="text-center" :class="!isDesktop ? 'top_h_p_success' : ''">
                                <span class="fa fa-check-circle color_size_p_success"></span>
                                <h1 class="mt-4 color_weight_p_success">{{  locale==='km' ? 'សូមអបអរសាទរ!' : 'Congratulations!' }}</h1>
                                <p class="p-2">
                                    {{  locale==='km' ? 'ការដាក់ពាក្យការងាររបស់អ្នកត្រូវបានបញ្ជូនដោយជោគជ័យ' : 'Your job application has been submitted Successfully'  }}
                                </p>
                            </div>
                            <div class="nav nav_desktop">
                                <div class="col mt-2">
                                    <a rel="nofollow" href="javascript:void(0)" @click="cickClose" class="btn style_button form-control btn-lg">
                                        {{ locale==='km' ? 'បិទ' : 'Close' }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="modal-body text-center">
                            <span class="fa fa-check-circle color_size_p_success"></span>
                            <h3 class="mt-4 color_weight_p_success text-center">{{  locale==='km' ? 'សូមអបអរសាទរ!' : 'Congratulations!' }}</h3>
                            <p class="p-2">
                                {{  locale==='km' ? 'ការដាក់ពាក្យការងាររបស់អ្នកត្រូវបានបញ្ជូនដោយជោគជ័យ' : 'Your job application has been submitted Successfully'  }}
                            </p>
                        </div>
                        <div class="modal-footer p-0">
                            <button type="button" class="btn form-control btn-lg btn-k24-primary text-white" @click="cickClose">
                                {{ locale==='km' ? 'បិទ' : 'Close' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <br><br><br>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const rout_tt = ref(route.params.title ? route.params.title : '');
    const tt = ref(window && window.location ? window.location.host+'/c-'+rout_tt.value : '')
    
    const success = ref(true)
    const loadindScreenk = useState('loadindScreenk')
    loadindScreenk.value =  success.value
    // loadindScreenk.value =  true
    function cickClose(){
        $('#show_modal_success').modal('hide')
        success.value = '';
        get_detail_server();
        SEO_google_schema();
        get_detail_product();
        form_data();
        
        // router.go(-2)
    }



    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const language = ref(helper.get_lang_cookie());
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");
    const empty_img_loading = ref('/icon/img-loader.gif');

    const d_p_detail = ref('');
    const d_p_details = useState('d_p_details', () => ({})); // catch
    const d_p_full_detail = ref('');
    const d_p_detail_full = useState('d_p_detail_full', () => ({})); // catch
    const d_p_related_post = ref([]);
    const d_p_relates = useState('d_p_relates', () => ({})); // catch
    const d_p_ids = useState('d_p_ids', () => []); // catch
    const data_meta = ref('');
    const username_user_or_store = ref('');
    const loading = ref(false);
    const loading_related = ref(false);
    const loading_field = ref(false);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const sms_or_call = ref('');
    const connection_error = ref(false);
    const check_screen_device = ref(false); // check screen pc or phone; true = phone screen;  false = pc
    const user_data = ref('');

    // --- chat template ---
    const chat_buy_km = ref(["សួស្តី! តើវានៅមានលក់ឬអត់?", "សួស្តី! ខ្ញុំចង់ទិញវា។", "តើតម្លៃអាចចរចារបានឬទេ?", "តើយើងអាចចរចាទិញតាមរបៀបណា?"]);
    const chat_buy_en = ref(["Hi! is still available?", "Hi! I'd like to buy it.", "Is the price negotiable?", "How do we deal?"]);
    const text_chat = ref('');

    // is own post or not ("mine" or "not_mine")
    const check_auth_and_item_user_id_the_same = ref(''); // check if user login and user id equal user detail post id

    const detail_one_post = ref(''); // specific post that click icon option in list.
    const data_track_post_list = ref(''); // for tracking on click specific post in related.
    const from_where = ref('');  // check save or unsaved from detail OR post.
    const report_from = ref(''); // check report from detail Or post.

    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const params_track = pa_con && pa_con.tracking && pa_con.tracking.d_params && pa_con.tracking.d_params.tracking ? pa_con.tracking.d_params.tracking : ''; // check tracking from params.

    // --- banner ---
    const banner = ref('');
    const d_p_banners = useState('d_p_banners', () => ({})); // catch

    // --- comments ---
    const comments = useState('comments', () => []); // catch

    // --- report ---
    const report_post = ref([]);
    const report_check = ref('');
    const description = ref('');

    // --- delete post ---
    const delete_post = ref([]);
    const delete_check = ref('');
    const delete_description = ref('');
    const show_description = ref('');
    const g_recaptcha_response = ref(null)

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);  const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);  const reload_q_again_4 = ref(0);
    const reload_q_again_5 = ref(0);  const reload_q_again_6 = ref(0);
    const reload_q_again_7 = ref(0);  const reload_q_again_8 = ref(0);
    const reload_q_again_9 = ref(0);  const reload_q_again_10 = ref(0);
    const reload_q_again_11 = ref(0); const reload_q_again_12 = ref(0);

    // --- regex on phone ---
    const phone_prividers = ref([]);
    const phone_prefix = ref([]);
    const show_phone_number = ref(false); // show phone number xxx
    const content_dis = ref(''); // handle description post
    const content_add = ref(''); // handle description post
    const recaptcha = useRecaptcha();

    // --- arr impression check id ---
    const arr_impression = ref([]);
    const timer_auto_impression = ref('');
    const check_sent = ref(true); // true = allow setInterval; false = not allow setInterval.

    // --- condition for click back not have action ---
    const old_post_id = ref(''); // store old id post if click back no event
    const isMobile= ref(helper.m_or_d())
    const url_store = useState('url_store',() =>'')

    const google_json_SEO = useState('google_json_SEO', () => '');
    useJsonld(() => (
        google_json_SEO.value
    ));

    const img_empty = ref(false);

    if (process.server) {
        await get_detail_server();
        await SEO_google_schema();
        img_empty.value = true;
    }

    onMounted(() => {
        if (process.client) {
            hidOverflow()
            url_store.value = window.location.origin
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            img_empty.value = false;
            // console.log(check_device.value)
            // clickShow();
            // setTimeout(() => { SEO_google_schema(); }, 1500);
            // localStorage.setItem("storedDataA", '');
            // localStorage.setItem("storedDataB", '');
            user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
            form_data();
            // --- show status success ---
            setTimeout(() => {
                if (pa_con && pa_con.message_success && pa_con.message_success.d_params && pa_con.message_success.d_params.message_success) {
                    toast_message(pa_con.message_success.d_params.message_success, true);
                }
                helper.clear_params_make_con('message_success'); // remove local params condition
            },500);
            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            // --- get comments post ---
            get_comments(route.params.id);

            // --- Fancybox without hash (not push state history browser) ---
            Fancybox.defaults.Hash = false;

            reload_lazy_img(); // load lazy image.
            getL();

            

        }
        
    });
    onBeforeUnmount(() => {
        // console.log('if page destroy, must to close fancyBox');
        Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
        // Fancybox.next();
    })

    
    function getL(){
        tt.value = window.location.host+'/'+rout_tt.value;
    }

    function hidOverflow(){
        $('body').css('overflow','unset')
    }

    // function clear_break(text) { return helper.clear_break_2line(text); }
    // ---- create SEO google schema ----
    async function SEO_google_schema() {
        let Main_arr = [];
        let f_url = language.value === 'km' ? config.VUE_APP_BASE_URL+'km/' : config.VUE_APP_BASE_URL+'en/'; // current full link of project.
        let empty_img = config.VUE_LINK+empty_img_post.value;
        let seo_sch = d_p_full_detail.value ? d_p_full_detail.value : '';
        let d = seo_sch.data;

        if (d) {
            // get address of post ads
            let addr = helper.Create_location(d.location, language.value, '');

            // get seller of post ads
            var s_type = d.store ? 'Store' : 'Organization';
            var s_link_url = d.store && d.store.username ? f_url + d.store.username : (d.user && d.user.username ? f_url + d.user.username : '');
            var s_name = d.store && d.store.title ? d.store.title : (d.user && d.user.name ? d.user.name : 'Unknown');
            var s_image = d.store && d.store.logo && d.store.logo.medium ? d.store.logo.medium.url : (d.user && d.user.photo && d.user.photo.medium ? d.user.photo.medium.url : empty_img);
            var s_phone_num = d.phone && d.phone.length > 0 ? d.phone : ''; // +85512345678
            var s_email = ''; // dara@gmail.com
            let seller = helper.GL_SEO_seller(s_type, s_link_url, s_name, s_image, s_phone_num, s_email, addr);

            // get post ads
            var ad_title = d.title ? d.title : 'Unknown';
            var ad_url = ad_title !== 'Unknown' ? f_url + check_title_char(ad_title) + '-adid-' + d.id : '';
            var ad_price = d.price ? d.price : '';
            var ad_description = d.description ? d.description : ''; // hExecutive Anvil Description
            var ad_image = d.photos ? d.photos : s_image;
            var ad_renew_date = d.posted_date ? d.posted_date : (d.renew_date ? d.renew_date : '');

            var ad_category = d.category ? (language.value === 'km' ? d.category.km_name : d.category.en_name) : '';
            var ad_brand = ''; // Toyota
            var ad_model = ''; // Camry 1
            var ad_color = ''; // Red
            var ad_condition = ''; // used or new
            var ad_year = ''; // cars or motorcycle year
            if (d.object_specs) {
                for (let key in d.object_specs) {
                    let s = d.object_specs[key];
                    if (key === "car-brand" || key === "motorcycle-brand") {
                        ad_brand = s.value;
                    } else if (key === "car-model" || key === "model") {
                        ad_model = s.value;
                    } else if (key === "color") {
                        ad_color = s.value;
                    } else if (key === "condition") {
                        ad_condition = s.value.toLowerCase(); // only small letter
                    } else if (key === "car-year" || key === 'motorcycle-year') { // add year only motor or car only.
                        ad_year = s.value;
                    }
                }
            }

            // -> Job Ads <-
            if (seo_sch && seo_sch.setting && seo_sch.setting.enable_apply_job) { // is post ads
                let job_logo = d.photos && d.photos[0] ? d.photos[0] : s_image;
                let job_condition = d.object_specs ? helper.get_spec_value(d.object_specs, 'job-type') : '';
                let job_experience = d.object_specs ? helper.get_spec_value(d.object_specs, 'experience') : '';
                let job_description = d.description ? d.description : ad_title;
                let productData = helper.GL_SEO_job(d.id, ad_url, ad_title, ad_renew_date, ad_category, job_condition, s_name,
                    s_link_url, job_logo, ad_price, job_description, addr, job_experience);
                productData['@context'] = "https://schema.org/";
                Main_arr.push(productData);
            // -> Post Ads <-
            } else {
                let productData = helper.GL_SEO_product(ad_url, d.id, ad_title, ad_price, ad_description, ad_condition,
                    ad_image, ad_category, ad_brand, ad_model, ad_color, seller, ad_year);
                productData['@context'] = "https://schema.org/";
                Main_arr.push(productData);
            }

            // -- Breadcrumb --
            let parent_cat_name = d.category && d.category.parent_data ? (language.value === 'km' ? d.category.parent_data.km_name : d.category.parent_data.en_name) : 'Unknown';
            let parent_cat_link = d.category && d.category.parent_data ? f_url + 'c-' + d.category.parent_data.slug : 'Unknown';
            let sub_cat_name = d.category ? (language.value === 'km' ? d.category.km_name : d.category.en_name) : 'Unknown';
            let sub_cat_link = d.category && d.category ? f_url + 'c-' + d.category.slug : '';
            let nav = [
                {'name': 'Home', 'link': config.VUE_LINK},
                {'name': parent_cat_name, 'link': parent_cat_link},
                {'name': sub_cat_name, 'link': sub_cat_link}
            ];
            let breadcrumbData = helper.GL_SEO_breadcrumb(nav);
            breadcrumbData['@context'] = "https://schema.org/";
            Main_arr.push(breadcrumbData);
            google_json_SEO.value = Main_arr;
        }
    }

    // ---- get request to get detail on product ----
    async function get_detail_server() {
        const token_auth = useCookie('auth_user');
        const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
        const reqUrl = config.VUE_APP_URL_POST_NEW + 'feed/'+route.params.id;

        try {
            const { data: data_res, error } = await useFetch(reqUrl, {
                key: reqUrl,
                headers: { "Access-Token": tokens },
                params: {
                    lang: language.value,
                    fields: 'location,phone,photos,status,total_like,store,user,photo,category,description,is_like,posted_date,renew_date,object_specs,is_saved,is_job_applied,link,thumbnail,thumbnails,total_comment',
                    functions: 'save,chat,like,apply_job,shipping,comment',
                    meta: true
                },
            })

            // console.log(data_res.value)

            if (error.value) {
                show_page_404('server'); // show page 404 on server side
            }

            let de_post = await data_res.value && data_res.value.data ? data_res.value.data : '';
            let de_full_post = data_res.value ? data_res.value : '';

            // --- Get Banner ---
            banner_detail();
            // add detail post to cache
            d_p_details.value[route.params.id] = de_post;
            d_p_detail_full.value[route.params.id] = de_full_post;
            d_p_detail.value = de_post;
            
            
            d_p_full_detail.value = de_full_post;  // get full data detail have ( setting and actions )
            data_meta.value = d_p_full_detail.value.meta ? d_p_full_detail.value.meta : '';  // -- override meta tag dynamic by post detail --
            d_p_ids.value.push(route.params.id);   // add id to array ids for cache that item when click to this post again

            if (de_post) {
                // --- show profile html tag in ssr ---
                if (de_post.store) {
                    username_user_or_store.value = de_post.store.username ? de_post.store.username : '';
                } else if (de_post.user) {
                    username_user_or_store.value = de_post.user.username ? de_post.user.username : '';
                }

                // --- get detail profile to check "follow" ---
                let user_or_store = de_post.store && de_post.store.username ? de_post.store.username : (de_post.user.username ? de_post.user.username : ''); // get username "User" or "Store"
                let url_is_follow = config.VUE_APP_API_URL_MOBI + 'profiles/' + user_or_store;
                await $fetch(url_is_follow, {
                    // key: url_is_follow,
                    headers: {"Access-Token": tokens},
                    params: {fields: 'following,followers,is_follow,id,username'},
                }).then(res => {
                    // combine "profile" data in to "detail_post"
                    de_post['user_detail'] = res.data; // detail
                    de_full_post.data['user_detail'] = res.data; // full detail
                    // add object "user_detail" to cache
                    d_p_details.value[route.params.id] = de_post;
                    d_p_detail_full.value[route.params.id] = de_full_post;
                    d_p_detail.value = de_post;
                    d_p_full_detail.value = de_full_post;  // get full data detail have ( setting and actions )
                })
                await check_description(); // check description
            }

            // --- check relate post is own user not allow to request more ---
            const user_id = token_auth && token_auth._value && token_auth._value.user && token_auth._value.user.id ? parseInt(token_auth._value.user.id) : '';
            let de_u_id = d_p_detail.value && d_p_detail.value.user && d_p_detail.value.user.id ? parseInt(d_p_detail.value.user.id) : '';
            check_auth_and_item_user_id_the_same.value = de_u_id === user_id ? 'mine' : 'not_mine';
            if (check_auth_and_item_user_id_the_same.value === "not_mine") {
                await $fetch(config.VUE_APP_URL_POST_NEW + 'feed/' + route.params.id + '/relates', {
                    headers: { "Access-Token": tokens }, // if user login add access token
                    params: {
                      lang: language.value,
                      fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                      functions: 'save,chat,like,apply_job,shipping',
                    },
                }).then(response => {
                    d_p_relates.value[route.params.id] = response;
                    d_p_related_post.value = response;
                    loading_related.value = false; // close loading related post.
                });
            }

        } catch (e) {
            // console.log('-------> error Detail Post <-------');
            // console.log(e);
            loading_related.value = false; // close loading related post.
            show_page_404('server'); // show page 404 on server side
        }
    }



    // --- slide show data ---
    function banner_detail() {
        if (!banner.value) {
            $fetch(config.VUE_APP_API_URL + 'banners',{
            // $fetch(config.VUE_APP_NEW_MOBI + 'banners',{
                // headers: { "Display-Type": "mobile_view" },
                params: { page: 'detail', 'display-type': isMobile.value ? 'mobile_view' : 'desktop' },
                // params: { page: 'detail', 'display-type': isDesktop ? 'desktop' : 'mobile_view' },
            }).then(res => {
                let arr_banner = banner_in_catch(res.data); // create array banner A and B.
                d_p_banners.value[route.params.id] = arr_banner;
                banner.value = arr_banner;
            }).catch(e => {
                if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout( () => { banner_detail(); }, 3000);
                    }
                }
            });
        }
    }
    // ---- check link banner is khmer24 link or not ----
    function check_link_banner (link) { return helper.check_link_is_khmer24(link, config); }
    // ---- create banner Type A and B ----
    function banner_in_catch(banner_data) {
        let data = banner_data ? banner_data : '';
        if (data) {
            let arr_ban_a_b_c = { a: [], b: [],  c: [] }
            if (data.a && data.a.data && data.a.data.length > 0) {
                let ban_a = data.a.data;
                for (const k in ban_a) {
                    // $.each(data.a.data, (k, v) => {
                        if (ban_a[k].type === 'image') {
                            arr_ban_a_b_c.a.push(ban_a[k]);
                        } else if (ban_a[k].type === 'code') {
                            let ban_B = isDesktop ? { detail_post: { dt_ban_A: { width: 770 } } } : ''; // desktop screen have 2 side
                            var new_banner = helper.create_banner_code_html(ban_a[k], 'slide', ban_B);
                            ban_a[k]['new_html_banner'] = new_banner.outerHTML;
                            arr_ban_a_b_c.a.push(ban_a[k]);
                        }
                    // });
                }
                data.a.data = arr_ban_a_b_c.a; // replace new on old array.
            }
            if (data.b && data.b.data && data.b.data.length > 0) {
                let ban_b = data.b.data;
                for (const k in ban_b) {
                    // $.each(data.b.data, (k, v) => {
                        if (ban_b[k].type === 'image') {
                            arr_ban_a_b_c.b.push(ban_b[k]);
                        } else if (ban_b[k].type === 'code') {
                            var new_banner = helper.create_banner_code_html(ban_b[k], '', '');
                            ban_b[k]['new_html_banner'] = new_banner.outerHTML;
                            arr_ban_a_b_c.b.push(ban_b[k]);
                        }
                    // });
                }
                data.b.data = arr_ban_a_b_c.b; // replace new on old array.
            }

            if (data.c && data.c.data && data.c.data.length > 0) {
                let ban_c = data.c.data;
                for (const k in ban_c) {
                    // $.each(data.c.data, (k, v) => {
                        if (ban_c[k].type === 'image') {
                            arr_ban_a_b_c.c.push(ban_c[k]);
                        } else if (ban_c[k].type === 'code') {
                            var new_banner = helper.create_banner_code_html(ban_c[k], '', '');
                            ban_c[k]['new_html_banner'] = new_banner.outerHTML;
                            arr_ban_a_b_c.c.push(ban_c[k]);
                        }
                    // });
                }
                data.c.data = arr_ban_a_b_c.c; // replace new on old array.
            }
            return data;
        }
    }

    // ---- show toast ----
    function toast_message(message, suc_or_danger) {
        message_success.value = message;
        error_or_success_message.value = suc_or_danger;
        let toast = $(".toast_ads_detail");
        toast.removeClass('d-none');
        toast.toast({ delay: 6000 });
        toast.toast('show');
    }
    // ---- show modal options post ----
    function show_options(post_detail, data_index_tracking) {
        detail_one_post.value = post_detail.data; // save detail post.
        data_track_post_list.value = data_index_tracking; // save index related post for tracking.
        $('#show_modal_actions_post').modal('show');
    }
    function close_modal(){
        $("#show_modal_actions_post").modal('hide')
    }
    // ---- click view profile ----
    function view_profile() {
        let the_id = 'pro_'+detail_one_post.value.id+'_user_'+detail_one_post.value.user.id;
        document.getElementById(the_id).click();
    }
    // ---- click share post ----
    function share_manual_post() {
        let dd = detail_one_post.value;
        let data = data_track_post_list.value;
        // tracking share on related posts.
        track_action_on_post('share', dd.id, d_p_related_post.value.data ? d_p_related_post.value.data.length : '',
            d_p_related_post.value.limit, data.current_index, data.placement, data.display_type, { paid: dd.type !== 'normal' ? true : false });
        // add click from post
        report_from.value = 'post'
        // show media share
        $('#show_modal_actions_post').modal('hide'); // close options modal.
        detectMob(dd);
        // $("#modal_show_option_share").modal('show'); // show share media.
    }
    // ---- save post ----
    function save_manual_post(save_or_unsaved) {
        save_ads(save_or_unsaved, 'post', save_or_unsaved === 'save' ? '' : 'confirm');
        track_action_on_post(save_or_unsaved, detail_one_post.value.id, d_p_related_post.value.data ? d_p_related_post.value.data.length : '',d_p_related_post.value.limit,
            data_track_post_list.value.current_index, data_track_post_list.value.placement, data_track_post_list.value.display_type,
            { paid: detail_one_post.value.type !== 'normal' ? true : false });
    }
    // ---- report post ----
    function report_manual_post() { 
        report_on_post('post');
    } // open dialog report post.
    // ---- clean date ----
    function clean_date(date) {
        if (process.client) {
            return helper.simple_date_format(date);
        } else { return date; }
    }
    // ---- show profile ----
    function show_profile() { document.getElementById('show_pro_user').click(); }
    // ---- follow or unfollow ----
    function follow_or_unfollow(confirm) {

        let user_or_store_info = d_p_detail.value.user_detail; // info user or store.
        let user_or_store = '', id_store = '';
        // if post detail have store
        if (d_p_detail.value.store) {
            user_or_store = 'store';
            id_store = d_p_detail.value.store.id; // if store must to use id of store to follow or unfollow.
        } else {
            user_or_store = 'user';
            id_store = '';
        }

        let url = '';
        if (user_or_store_info) {
            if (user_or_store_info.is_follow) {
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
                $fetch(config.VUE_APP_API_URL + 'me/' + url,{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Access-Token": user_data.value.tokens.access_token},
                    method: 'POST',
                    params: {lang: language.value},
                    body: new URLSearchParams({id: id_store ? id_store : user_or_store_info.id, type: user_or_store})
                }).then(res => {
                    let change = url === 'follow' ? true : false;
                    d_p_details.value[route.params.id].user_detail.is_follow = change;
                    d_p_detail_full.value[route.params.id].data.user_detail.is_follow = change
                    d_p_detail.value.user_detail.is_follow = change;
                    d_p_full_detail.value.data.user_detail.is_follow = change;
                    $('#modal_confirm_unfollow').modal('hide'); // close modal confirm
                }).catch(e => {
                    if (!e.response) {
                        if (reload_q_again_5.value < 2) {
                            reload_q_again_5.value += 1;
                            setTimeout( () => { follow_or_unfollow(confirm); }, 3000);
                        } else {
                            loading_field.value = false;
                        }
                    } else if (e.response && e.response.status === 401) { // retry
                        if (reload_q_again_5.value <= 2) {
                            reload_q_again_5.value += 1;
                            setTimeout(() => { follow_or_unfollow(confirm); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
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
                    data: {user_id: id_store ? id_store : user_or_store_info.id, type: user_or_store},
                    from: {name: 'detail_post'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- impression tracking ----
    function visibilityChanged (isVisible, entry, data) {
        // isVisible => is true mean new data, false mean old data.
        if (isVisible) { // new data
            arr_impression.value.push({ id: data.id, current_index: data.index, paid: data.paid, placement: data.placement });

            // -- timer not exist && arr_impression not empty && check_sent is true, must set interval --
            if (!timer_auto_impression.value && arr_impression.value.length > 0 && check_sent.value) {

                // -- start setInterval in 3 second --
                timer_auto_impression.value = setInterval( async () => {

                    let arr_tmp = arr_impression.value;  // set arr_impression to tmp array.
                    arr_impression.value = [];           // clear arr_impression.
                    check_sent.value = false;            // not allow to setInterval again.
                    clearInterval(timer_auto_impression.value); timer_auto_impression.value = ''; // clear auto impression

                    let res = await helper.tracking_action('impression', { post_impression: arr_tmp, item_count: d_p_related_post.value.data.length, item_per_page: d_p_related_post.value.limit },
                        'impression', 'related', data.type, '');

                    if (res && res.status === 200) {
                        check_sent.value = true;          // allow to setInterval again if success.
                    } else {
                        $.each(arr_tmp, (k, v) => {
                            arr_impression.value.push(v); // push id to old arr_impression again if response error in request tracking impression.
                        });
                        check_sent.value = true;          // allow to setInterval again if error.
                    }

                }, 3000);
            }
        }
    }
    // ---- tracking API call, sms, show contact or any ( but no detail post ) ----
    function tracking_manual(con) {
        let data = params_track; // data tracking from url params for the first create page.
        let paid = data && data.paid ? true : false;    // is paid.
        let from = data && data.from ? data.from : '';  // is from my_following || highlight.
        helper.tracking_action(con, { id: d_p_detail.value.id, track_contact: 'detail_post', paid: paid, placement: from }, con, 'detail', '', '');
    }
    // ---- tracking action on related posts ----
    function track_action_on_post(action, id, item_count, item_per_page, current_index, placement, display_type, option_more) {
        helper.tracking_action('post', { id: id, item_count: item_count, item_per_page: item_per_page, current_index: current_index,
            paid: option_more.paid, placement: option_more.placement ? option_more.placement : ''}, action, placement, display_type, '');
    }

    // ---- Desktop View Sent Text Chat ----
    function sent_text_chat(text) {
        if (text) {
            text_chat.value = text;
        } else {
            if (!text_chat.value) {
                $('#text_chats').focus();
                return;
            }
        }
        // console.log(text_chat.value);
        // save chat text to localstorage to check at Page DetailChat
        save_track_optional('desktop_chat_text', { text: text_chat.value });
        // go to chat
        show_chat();
    }

    // ----------------- Regex phone number, email, link -----------------
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
        let phone_prefix_digit_10 = [];
        let phones_by_provider = [];

        for (const key in config.phone) {
            let prifixs = [];

            for (var k in config.phone[key]) {
                prifixs = prifixs.concat(config.phone[key][k]);
                if (k === '7-digits') { phone_prefix_digit_10 = phone_prefix_digit_10.concat(config.phone[key][k]) }
            }

            all_prefix.concat(prifixs);
            phones_by_provider[key] = prifixs;
        }

        phone_prividers.value = phones_by_provider;
        phone_prefix.value = all_prefix;
        phone_prefix_digit_10.value = phone_prefix_digit_10;
    }
    function get_new_phone_number(phone_num) {
        let phone_provider = phone_prividers.value; // get all head phone number three digit

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


        for (const p_key in phone_provider) {
            if (phone_provider[p_key].includes(prefix)) {
                provider = p_key;
                break;
            }
        }

        let p = '';
        if(phone_num) {
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

    function check_description1(text) {

        let message = text;
        // console.log(message)
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
                    // let phone_data = get_new_phone_number(clean_p_n);
                    // message = message.replaceAll(match, '<a rel="nofollow" class="d_phone_num_link_in_des" href="tel:' + phone_data.number + '">' + phone_data.number + '</a>');
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

    async function check_description() {
        let description = d_p_detail.value && d_p_detail.value.description ? d_p_detail.value.description.replace(/\n\s{2,}/gm, '\n').replace(/ {2,}/gm, ' ').replace(/\n{2,}/gm, '<br>') : '';
        let address_ = d_p_detail.value && d_p_detail.value.location.address ? d_p_detail.value.location.address : '';
        // -- if in category phone_number not allow to regex on description --
        if (d_p_detail.value && d_p_detail.value.category && d_p_detail.value.category.slug !== 'phone-numbers') {
            await phone_header(); // set up phone header first
            let filters = await store_regex(); // function return regex
            let regexFromMyArray = new RegExp(filters.join("|"), 'gi'); // convert array to string regex
            // console.log(regexFromMyArray);
            const match_P_N = description.match(regexFromMyArray);
            const match_P_N1 = address_.match(regexFromMyArray);
            // console.log(match_P_N1);
            let check_email = [];  let check_link = [];  let check_phone_num = [];
            if (match_P_N1) {
                for (const match of match_P_N1) {
                    // -- link --
                    if (match.match(/http|https|ftp|ftps|www./) !== null) {
                        if (!check_link.includes(match)) {  // check link has been created yet. (prevent replace an old one, if have duplicate value in description)
                            check_link.push(match);         // push link that has been created.
                            if (!match.match(/http|https|ftp|ftps/) && match.match(/www./)) { // if link but have only "www." with out http
                                address_ = address_.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des click_track_link" target="_blank" href="//' + match + '">' + match + '</a>');
                            } else {
                                address_ = address_.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des click_track_link" target="_blank" href="' + match + '">' + match + '</a>');
                            }
                        }
                    // -- email --
                    } else if (match.match(/@/) !== null) {

                        if (!check_email.includes(match)) {  // check email has been created yet. (prevent replace an old one, if have duplicate value in message)
                            check_email.push(match);         // push email that has been created.
                            address_ = address_.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="mailto:' + match + '">' + match + '</a>');
                        }
                        // -- phone number --
                    } else {
                        if (!check_phone_num.includes(match)) {  // check phone number has been created yet. (prevent replace an old one, if have duplicate value in message)
                            check_phone_num.push(match);         // push phone number that has been created.
                            let clean_p_n = match.replace(/[-. ]/g, ""); // clean spacial char...
                            // -- now check and clear phone to the true format --
                            let phone_data = get_new_phone_number(clean_p_n);
                            // console.log(phone_data);
                            address_ = address_.replaceAll(match, '<a rel="nofollow" class="d_phone_num_link_in_des" href="tel:' + phone_data.number + '">' + phone_data.number + '</a>');
                        }
                    }
                    content_add.value = address_;
                    // console.log('data1=',content_add.value)
                }
            }else{
                content_add.value = address_;
            }

            if (match_P_N) {
                for (const match of match_P_N) {

                    // -- link --
                    if (match.match(/http|https|ftp|ftps|www./) !== null) {

                        if (!check_link.includes(match)) {  // check link has been created yet. (prevent replace an old one, if have duplicate value in description)
                            check_link.push(match);         // push link that has been created.
                            if (!match.match(/http|https|ftp|ftps/) && match.match(/www./)) { // if link but have only "www." with out http
                                description = description.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des click_track_link" target="_blank" href="//' + match + '">' + match + '</a>');
                            } else {
                                description = description.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des click_track_link" target="_blank" href="' + match + '">' + match + '</a>');
                            }
                        }
                    // -- email --
                    } else if (match.match(/@/) !== null) {

                        if (!check_email.includes(match)) {  // check email has been created yet. (prevent replace an old one, if have duplicate value in description)
                            check_email.push(match);         // push email that has been created.

                            let sub_fix = ''; // store * ofter 3 char show first
                            let user_email = match.indexOf("@"); // get length dol @ of string
                            let str_name_email = match.substr(0, user_email); // get text dol @ of string
                            let n_sub = user_email - 3; // minus 3 index for add symbol *
                            for (let i = 0; i < n_sub; i++) {
                                sub_fix += '*'; // loop add symbol *
                            }
                            let add_symbol = str_name_email.slice(0, 3) + sub_fix; // create ex: Zhexo*******
                            let email = match.split(str_name_email).join(add_symbol); // create full email with (*)
                            if (show_phone_number.value) {
                                description = description.replaceAll(match, '<a rel="nofollow" class="d_link_num_link_in_des icon_email click_track_email" target="_blank" href="mailto:' + match + '">' + match + '</a>');
                            } else {
                                let text_email = language.value === 'km' ? 'ចុចដើម្បីផ្ញើរអីមែល' : 'Click To Sent Email';
                                description = description.replaceAll(match, '<span class="d_link_num_link_in_des show_P_N_full cur_sur icon_email">' + email + '<i>' + text_email + '</i></span>');
                            }
                        }

                    // -- phone number --
                    } else {
                        if (!check_phone_num.includes(match)) {  // check phone number has been created yet. (prevent replace an old one, if have duplicate value in description)
                            check_phone_num.push(match);         // push phone number that has been created.
                            let clean_p_n = match.replace(/[-. ]/g, ""); // clean spacial char...
                            // -- now check and clear phone to the true format --
                            let phone_data = get_new_phone_number(clean_p_n);
                            // console.log(phone_data);
                            let symbol_P_N = phone_data.number.substring(0, phone_data.number.length - 3) + 'xxx';
                            // console.log(symbol_P_N);
                            // substr($phone_data[0]['number'], 0, -3).'xxx <i>click_to_call</i></a>';
                            if (show_phone_number.value) {
                                description = description.replaceAll(match, '<a rel="nofollow" class="d_phone_num_link_in_des click_track_call icon_' + phone_data.provider + '" href="tel:' + phone_data.number + '">' + phone_data.number + '</a>');
                            } else {
                                let text_call = language.value === 'km' ? 'ចុចដើម្បីតេ' : 'Click To Call';
                                description = description.replaceAll(match, '<span class="d_phone_num_link_in_des show_P_N_full cur_sur icon_' + phone_data.provider + '">' + symbol_P_N + '<i>' + text_call + '</i></span>');
                            }
                        }
                    }
                    content_dis.value = description;
                }

            } else {
                content_dis.value = description;
            }
        } else {
            content_dis.value = description;
            content_add.value = address_;
        }
    }
    // -- click event on phone number in description, below description or in description --
    function handleClick(e) {
        if (e.target.matches('.show_P_N_full, .show_P_N_full *')) { // click show_contact
            // console.log('click to show full phone number');
            click_display_full_P_N();

        } else if (e.target.matches('.click_track_call, .click_track_call *')) { // click tacking on call
            // console.log('click on call');
            tracking_manual('call');

        } else if (e.target.matches('.click_track_email, .click_track_email *')) { // click tacking on email
            // console.log('click on email');
            tracking_manual('mail');

        } else if (e.target.matches('.click_track_link, .click_track_link *')) {   // click tracking on link
            // console.log('click on link');
            tracking_manual('link');
        }
    }
    function handleClick_lo(e) {
        if (e.target.matches('.click_track_link, .click_track_link *')) {   // click tracking on link
            // console.log('click on link');
            tracking_manual('link');
        }
    }
    function click_display_full_P_N() {
        setTimeout(() => {
            // -- show phone number the below of description --
            show_phone_number.value = true;

            // -- show phone numbers full in description --
            check_description();

            // --- track show contact ---
            tracking_manual('show_contact');

        },100);
    }
    // -- create phone number with xxx for manual --
    function display_P_N(phone_number) {
        const regex1 = /^([0-9]{3}[0-9]{3}[0-9]{3})$/;      // phone num in 9 char
        const regex2 = /^([0-9]{3}[0-9]{3}[0-9]{4})$/;      // phone num in 10 char
        let clean_p_n = phone_number.replace(/[-. ]/g, ""); // clean spacial char...
        if (regex1.test(clean_p_n)) {
            return phone_number.replace(/(\d{6})\d{3}/,"$1xxx");
        } else if (regex2.test(phone_number)) {
            return phone_number.replace(/(\d{7})\d{3}/,"$1xxx");
        }
    }
    // -- check show full phone or regex phone with ( Own post or show_contact true ) --
    function check_show_full_phone_or_regex_phone() {
        let post_user_id = d_p_detail.value && d_p_detail.value.user ? parseInt(d_p_detail.value.user.id) : '';
        let auth_user_id = user_data.value && user_data.value.user ? parseInt(user_data.value.user.id) : '';
        let own_post_user = post_user_id === auth_user_id ? true : false;
        // show_contact true or own post, must to show full phone number
        if (d_p_full_detail.value.setting && d_p_full_detail.value.setting.show_contact === true || own_post_user) {
            // console.log('show full phone');
            show_phone_number.value = true; // show full phone
            check_description();   // regex on description
        } else {
            // console.log('regex phone');
            show_phone_number.value = false; // show regex phone
            check_description();   // regex on description
        }
    }
    // ---------------- /Regex phone number, email, link -----------------

    // ---- go to detail comment ----
    function go_to_detail_comment(type, data) {
        if (window.navigator.onLine) {
            let d = data.data_com;
            // -- if user login, go to detail comment --
            if (user_data.value) {
                let query = { post_id: data.post_id };
                if (type === 'reply_parent' || type === 'reply_child') { // if click reply on comment.
                    query['show_spe_com'] = d ? d.id : ''; // get specific detail comment.
                }
                // if (isMobile.value) {
                router.push(localePath({name: 'chats-detail-comment', query: query}));
                // } else {
                //     query['tap'] = 'comments';
                //     query['sh_com'] = 'show'; // condition show detail comment for the first. (special)
                //     if (d_p_detail.value.store) query['store_id'] = d_p_detail.value.store.id; // if store id exist.
                //     router.push(localePath({name: 'chats', query: query}));
                // }

            // -- else login first when go to form comment --
            } else {
                // create State when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'detail_comment',
                    expire: expired,
                    data: {
                        post_id: data.post_id,
                        show_spe_com: type === 'reply_parent' || type === 'reply_child' ? (d ? d.id : '') : '',
                    },
                    from: { name: 'detail_post' }
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = process.client ? (localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '') : ''; }
    // ---- retry function when connection error or timeout ----
    function retry() { form_data(); }
    // ---- bind function detail and related post is old or new data ----
    function form_data() {
        // -- connection is online --
        if (window.navigator.onLine) {
            connection_error.value = false; // close connection error

            if (d_p_ids.value.includes(route.params.id)) {
                // console.log("Old Data Loading...")
                d_p_detail.value = d_p_details.value[route.params.id] ? d_p_details.value[route.params.id] : '';
                d_p_related_post.value = d_p_relates.value[route.params.id] ? d_p_relates.value[route.params.id] : [];
                d_p_full_detail.value = d_p_detail_full.value[route.params.id];
                data_meta.value = d_p_full_detail.value.meta ? d_p_full_detail.value.meta : '';  // -- override meta tag dynamic by post detail --
                banner.value = d_p_banners.value[route.params.id] ? d_p_banners.value[route.params.id] : '';
                // -- this clear_old_data exist, when user click edit from detail or from account listing --
                let clear_old = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params && pa_con.clear_old_data.d_params.clear_old_data ? pa_con.clear_old_data.d_params.clear_old_data : '';
                if (clear_old) {
                    // remove old data by id
                    delete d_p_details.value[clear_old];
                    delete d_p_relates.value[clear_old];
                    delete d_p_banners.value[clear_old];
                    delete d_p_detail_full.value[clear_old];
                    helper.clear_params_make_con('clear_old_data'); // remove data params condition.
                    // store new again for this post
                    get_detail_product();
                    // console.log('show 1');
                // -- show old data --
                } else {
                    // console.log('show 2');
                    if (!d_p_detail.value) { // "Note" -> happen only in serverSide response error 404, so must to show page 404 in clientSide
                        show_page_404('client'); // show page 404 on client side

                    } else {
                        reform_detail(d_p_detail.value, d_p_related_post.value);
                        // - regex on phone when route change or click back history -
                        check_show_full_phone_or_regex_phone();
                        // - tracking on google analytic -
                        track_google_analytics();
                        // - Get Banner -
                        banner_detail();
                    }
                }

            } else {
                // console.log('show 3');
                d_p_detail.value = {};
                d_p_related_post.value = [];
                get_detail_product();
            }


            // --- Visibility Tracking ---
            let par_track = pa_con && pa_con.tracking && pa_con.tracking.d_params ? pa_con.tracking.d_params : '';
            let is_search = par_track && par_track.is_search ? par_track.is_search : ''; // only from search_result and search listing.
            if (par_track) {
                helper.tracking_action('post', { id: route.params.id, item_count: par_track.item_count, item_per_page: par_track.item_per_page,
                    current_index: par_track.current_index, paid: par_track.paid, placement: par_track.from }, 'view', par_track.placement, par_track.display_type, is_search);
                helper.clear_params_make_con('tracking'); // remove data params condition.
            }
            // --- /Visibility Tracking ---

        // -- connection error --
        } else {
            connection_error.value = true;
        }
    }
    // ---- get request to get detail on product ----
    function get_detail_product() {
        check_new_auth_user();

        setTimeout(() => {
          window.scrollTo({top: 0}); // scroll top of the page when get new data post detail.
        },300);

        loading.value = true;
        $fetch(config.VUE_APP_API_URL_POST_NEW + 'feed/'+route.params.id,{
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' }, // if user login add access token
            params: {
                lang: language.value,
                // fields: 'all',
                fields: 'location,phone,photos,status,total_like,store,user,photo,category,description,is_like,posted_date,renew_date,object_specs,is_saved,is_job_applied,link,thumbnail,thumbnails,total_comment',
                functions: 'save,chat,like,apply_job,shipping,comment',
                meta: true
            },
        }).then(response => {
            // console.log(response)
            let de_post = response.data;
            let de_full_post = response;

            // --- Get Banner ---
            banner_detail();

            // --- get detail profile to check "follow" ---
            if (de_post && de_post.user && de_post.user.username) {
                let user_or_store = de_post.store ? de_post.store.username : de_post.user.username; // get username "User" or "Store"
                $fetch(config.VUE_APP_API_URL + 'profiles/' + user_or_store,{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''}, // if user login add access token
                    params: { fields: 'following,followers,is_follow,id,username,link,cover', lang: language.value },
                }).then(res => {
                    // console.log(res)
                    // combine "profile" data in to "detail_post"
                    de_post['user_detail'] = res.data; // detail
                    de_full_post.data['user_detail'] = res.data; // full detail
                    // add detail post to cache
                    d_p_details.value[route.params.id] = de_post;
                    d_p_detail_full.value[route.params.id] = de_full_post;
                    d_p_detail.value = de_post;
                    d_p_full_detail.value = de_full_post;  // get full data detail have ( setting and actions )
                    data_meta.value = d_p_full_detail.value.meta ? d_p_full_detail.value.meta : '';  // -- override meta tag dynamic by post detail --
                    d_p_ids.value.push(route.params.id);   // add id to array ids for cache that item when click to this post again
                    if (process.client) {
                        reform_detail(d_p_detail.value, '');
                        increase_views(route.params.id); // increase view
                        check_show_full_phone_or_regex_phone(); // regex and check own post or show_contact true or false
                        track_google_analytics(); // tracking on google analytic
                    }
                    reload_lazy_img(); // load lazy image.

                }).catch(e => {
                    if (!e.response) {
                        if (reload_q_again_10.value < 2) {
                            reload_q_again_10.value += 1;
                            setTimeout( () => { get_detail_product(); }, 3000);
                        }
                    } else {
                        if (e.response && e.response.status === 404) {
                            show_page_404('client'); // show page 404 on client side
                        } else if (e.response && e.response.status === 401) { // retry
                            if (reload_q_again_10.value <= 2) {
                                reload_q_again_10.value += 1;
                                setTimeout(() => { get_detail_product(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }
                        }
                    }
                }).finally(() => (loading.value = false));
            }

        }).catch(error => {
            if (!error.response) { // display connection error
                if (reload_q_again_1.value < 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { get_detail_product(); }, 3000);
                } else {
                    connection_error.value = true;
                }

            } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_1.value <= 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { get_detail_product(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }

            } else { // show status error response from API
                if (error.response && error.response.status === 404) {
                    show_page_404('client'); // show page 404 on client side
                }
            }
        });
    }
    // ---- reform detail ----
    function reform_detail(data_detail, is_have_old_related_post) {
        // --- if user id have and post of user id is the same (post is own user) ---
        check_auth_and_item_user_id_the_same.value = user_data.value && parseInt(data_detail.user.id) === parseInt(user_data.value.user.id) ? 'mine' : 'not_mine';
        if (check_auth_and_item_user_id_the_same.value === 'not_mine' && !is_have_old_related_post) {
            get_related_post();
        }
        // --- /if user id have and post of user id is the same ---

        detail_one_post.value = data_detail;

        // ---- check user or store to view profile ----
        if (data_detail) {
            if (data_detail.store) {
                username_user_or_store.value = data_detail.store.username;
            } else {
                username_user_or_store.value = data_detail.user.username;
            }
        }

        reload_lazy_img(); // load lazy image.
    }
    // ---- get related post ----
    function get_related_post() {
        if (process.client) {
            check_new_auth_user();
            loading_related.value = true;
        }

        const token_auth = useCookie('auth_user');
        const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
        $fetch(config.VUE_APP_URL_POST_NEW + 'feed/' + route.params.id + '/relates', {
          headers: { "Access-Token": tokens }, // if user login add access token
            params: {
                lang: language.value,
                fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                functions: 'save,chat,like,apply_job,shipping',
            },

        }).then(res => {
            d_p_relates.value[route.params.id] = res;
            d_p_related_post.value = res;
            loading_related.value = false; // close loading related post.

            reload_lazy_img(); // load lazy image.

        }).catch(error => {
            if (!error.response) {
                if (reload_q_again_2.value < 2) {
                    reload_q_again_2.value += 1;
                    setTimeout(() => { get_related_post(); }, 3000);
                }
            } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_2.value <= 2) {
                    reload_q_again_2.value += 1;
                    setTimeout( () => { get_related_post(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
            loading_related.value = false; // close loading related post.
        });
    }

    // ---- reload lazy load ----
    function reload_lazy_img() {
        setTimeout(() => {
            $('img.lazy').Lazy({delay:5000, combined:true});
        },750);
    }

    // ---- increase views ----
    function increase_views(id) {
        $fetch(config.VUE_APP_API_URL_POST_NEW + 'views',{
            method: 'POST',
            body: new URLSearchParams({ id: id })
        });
    }
    // ---- function report post ----
    function report_on_post(con_detail_or_post) {
        if (window.navigator.onLine) {
            report_from.value = con_detail_or_post; // store report from "post or detail"
            $('#show_modal_actions_post').modal('hide'); // close modal options post.

            // -- clear data when open new modal --
            description.value = '';
            report_check.value = '';
            $('#description').removeClass('error_field_text_report');
            $('#error_description').addClass('d-none');

            if (!localStorage.getItem("report_post")) {
                loading_field.value = true;
                $fetch(config.VUE_APP_API_URL + 'feedbacks/post_reasons',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                }).then(res => {
                    const object = {
                        data: res.data,
                        expiry: helper.Date_To_Timestamp('', 86400, 'seconds'),  // add 1 day
                    }
                    localStorage.setItem("report_post", JSON.stringify(object));
                    report_post.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
                    $('#show_modal_list_report_post').modal('show');
                    

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_3.value < 2) {
                            reload_q_again_3.value += 1;
                            setTimeout( () => { report_on_post(); }, 3000);
                        } else {
                            loading_field.value = false;
                            $('#modal_show_status_error_connection').modal('show');
                        }

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_3.value <= 2) {
                            reload_q_again_3.value += 1;
                            setTimeout( () => { report_on_post(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }).finally(() => (loading_field.value = false));
            } else {
                report_post.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
                $('#show_modal_list_report_post').modal('show');
            }

        } else {
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');
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
            const token = await recaptcha('report_post');
            loading_field.value = true;
            if (route.params.id) {
                let the_id = report_from.value === 'post' ? detail_one_post.value.id : route.params.id; // check post id or detail id.
                let data_body = {
                    id: the_id, 
                    reason: report_check.value, 
                    description: description.value
                }
                if(token !== undefined){
                    data_body['g-recaptcha-response'] = token
                }
                $fetch(config.VUE_APP_API_URL + 'feedbacks/posts',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    method: 'POST',
                    body: new URLSearchParams(data_body)
                }).then(res => {
                    // -- hide modal report post --
                    $('#show_modal_list_report_post').modal('hide');
                    // -- clear old report data --
                    description.value = '';
                    report_check.value = '';
                    // -- show toast success --
                    toast_message('', true)

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_5.value < 2) {
                            reload_q_again_5.value += 1;
                            setTimeout( () => { report_submit(); }, 3000);
                        } else {
                            loading_field.value = false;
                            $('#modal_show_status_error_connection').modal('show');
                        }

                    } else {
                        let check = error.response ? error.response : ''; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (error.response && error.response.status === 422) {
                            $('#description').addClass('error_field_text_report');
                            $('#error_description').removeClass('d-none');
                            $('#error_description').text(data_parse._data.message);
                            toast_message(data_parse._data.message, false);

                        } else if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_4.value <= 2) {
                                reload_q_again_4.value += 1;
                                setTimeout( () => { report_submit(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}))
                            }
                        }
                    }
                }).finally(() => (loading_field.value = false));
            }

        } else {
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // close report
    function close_report_modal() { 
        $('#show_modal_list_report_post').modal('hide'); 
    }

    // required report
    function show_required_report() {
        if (report_check.value === 'other' && !description.value) {
            $('#description').addClass('error_field_text_report');
            $('#error_description').removeClass('d-none');
        } else {
            toast_message(language.value === 'km' ? 'សូមជ្រើសរើសហេតុផល' : 'Please select reason', false);
        }
    }
    // ---- /function report post ----

    // ---- get detail comments of post if total bigger then 0 ----
    function get_comments(post_id) {
        $fetch(config.VUE_APP_API_URL_COMMENT + post_id,{
            params: { lang: language.value },
        }).then(res => {
            // get only three parent comment prevent long comment
            let rev1 = [];
            if (res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                    if (i <= 2) {
                        rev1.push(res.data[i]); // get only three comments
                    }
                }
            }
            comments.value = rev1.reverse();

        }).catch(e => {
            if (e.response && e.response.status === 401) { // retry
                if (reload_q_again_12.value <= 2) {
                    reload_q_again_12.value += 1;
                    setTimeout( () => { get_comments(post_id); }, 3000);
                }
            }
        });
    }

    // ---- click edit post ----
    function click_edit_post(ads_id, type, store_id) {
        router.replace(localePath({ name: 'post-id', params: { id: ads_id }, query: { from: 'detail', type: type, store_id: store_id } }));
    }

    // ---- click show phone numbers for call or sms ----
    function dialog_phone_number(s_or_c) {
        sms_or_call.value = s_or_c;
        tracking_manual(s_or_c === 'call' ? 'call' : 'sms'); // tracking on show modal phone or sms.
        $('#modal_show_phone_or_sms').modal('show');
        $(".cl_ripple").ripple();
    }
    // ---- show chat ----

    function show_chat() {
        if (window.navigator.onLine) {

            // tracking on button chat
            tracking_manual('chat');
            let to_id = d_p_detail.value && d_p_detail.value.user && d_p_detail.value.user.id ? d_p_detail.value.user.id : '';
            let username = '';
            // -- if user login, go to chat --
            if (user_data.value) {
                // save params to work at detail chats
                let dt_post = {
                    show_topic_post_id: d_p_detail.value.id,
                    title: d_p_detail.value.title,
                    price: d_p_detail.value.price,
                    img: d_p_detail.value.thumbnail ? d_p_detail.value.thumbnail : (d_p_detail.value.photo ? d_p_detail.value.photo : ''),
                }
                // console.log(dt_post)
                save_track_optional('dt_post', dt_post);
                save_track_optional('clear_old_data', { clear_old_data: 'clear' });
                
                let qtr = {
                    to_id: to_id, 
                }

                if(d_p_detail.value && d_p_detail.value.store){
                    qtr['store_id'] =  d_p_detail.value && d_p_detail.value.store && d_p_detail.value.store.id
                    qtr['username'] = d_p_detail.value && d_p_detail.value.store && d_p_detail.value.store.username ? d_p_detail.value.store.username : '';
                }else{
                    qtr['username'] = d_p_detail.value && d_p_detail.value.user && d_p_detail.value.user.username ? d_p_detail.value.user.username : '';
                }
                
                if (isMobile.value) {
                    router.push(localePath({ name: 'chats-detail-chat', query: qtr }));
                } else {
                    router.push(localePath({ name: 'chats', query: qtr }));
                }

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
                        show_topic_post_id: d_p_detail.value.id,
                        title: d_p_detail.value.title, // helper.check_special_char(d_p_detail.value.title),
                        price: d_p_detail.value.price,
                        img: d_p_detail.value.thumbnail ? d_p_detail.value.thumbnail : (d_p_detail.value.photo ? d_p_detail.value.photo : '')
                    },
                    from: {name: 'detail_post'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- show apply job ----
    const cookieJOB = useCookie('cookieJOB')
    const testArray = ref([""])
    function click_apply_job(apply_condition, post_id, title) {
        testArray.value = 
            {
                'title': d_p_detail.value.title,
                'price': d_p_detail.value.price,
                'thumbnail': d_p_detail.value.thumbnail,
            }
            cookieJOB.value = testArray.value
        if (window.navigator.onLine) {

            // tracking on button apply job
            tracking_manual('apply_job');

            if (user_data.value) {
                if (apply_condition === false) {
                    router.push(localePath({ name: 'apply-job-id', params: {id: post_id}, query: {title: title} }));
                }
            } else {
                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'apply_job',
                    expire: expired,
                    data: { post_id: post_id, title: helper.check_special_char(title) },
                    from: { name: 'detail_post' }
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- click share icon ----
    function detectMob(p_data) {
        // add detail for share
        if (p_data) { // share related post
            detail_one_post.value = p_data;
        } else { // share detail post
            detail_one_post.value = d_p_detail.value;
        }

        tracking_manual('share'); // tracking share.

        check_screen_userAgent();

        if (check_screen_device.value) {
            $("#modal_show_option_share").modal('hide');
            phone_support_sharing(p_data); // share media in device phone

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
    function phone_support_sharing(d_p) {
        // support only https, localhost or some browser
        let title = ''; let text = ''; let url = '';
        if (d_p) { // -- media related post --
            title = d_p.title ? d_p.title : '';
            text = '';
            url = d_p.short_link ? d_p.short_link : '';
        } else { // -- media detail post --
            title = d_p_full_detail.value.meta && d_p_full_detail.value.meta.title ? d_p_full_detail.value.meta.title : '';
            text = '';
            url = d_p_full_detail.value.meta && d_p_full_detail.value.meta.url ? d_p_full_detail.value.meta.url : '';
        }
        // let image = d_p_full_detail.value.meta && d_p_full_detail.value.meta.image ? [d_p_full_detail.value.meta.image] : '';

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
    // ---- facebook sharing ----
    function facebook_sharing() {
        // connection is online
        if (window.navigator.onLine) {
            window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(''+ detail_one_post.value.short_link +''),'facebook-share-dialog','width=626,height=436');
            return false;

        // connection error
        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- witter sharing ----
    function twitter_sharing() {
        // connection is online
        if (window.navigator.onLine) {
            window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+detail_one_post.value.short_link+''),'facebook-share-dialog','width=626,height=436');
            return false;

        // connection error
        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- copy link ----
    function copy_link(short_link) {
        document.getElementById('copy_link').focus();
        document.execCommand('copy');
        document.getElementById('copy_link').blur();

        // tracking copy_link from "Detail" || "Related_post"
        if (report_from.value === 'post') {
            let dd = detail_one_post.value;
            let data = data_track_post_list.value;
            track_action_on_post('copy_link', dd.id, d_p_related_post.value.data ? d_p_related_post.value.data.length : '', d_p_related_post.value.limit,
                data.current_index, data.placement, data.display_type, { paid: dd.type !== 'normal' ? true : false });
        } else {
            tracking_manual('copy_link');
        }

        $("#modal_show_option_share").modal('hide'); // hide share media.
        report_from.value = ''; // clear click from detail or post.

        toast_message('Link copied to clipboard', true);
    }

    // ---- click show detail post ----
    function show_detail(title, id) {
        router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title), id: id } }));
    }

    // ---- click show detail photo of that post ----
    function show_detail_photos(title, id) {
        save_track_optional('text_title',{text_title: title, data_detail: JSON.stringify(d_p_detail.value) });
        router.push(localePath({
            name: 'title-adid-id-photos',
            params: { title: helper.check_special_char(title), id: id },
        }));
    }
    // ---- click back one page ----
    function goBack() {
        if (window.history.length > 2) {
            old_post_id.value = route.params.id; // store id first for check is the same page or not
            router.go(-1);
        } else {
            router.push(localePath({ name: 'index' }));
        }
    }
    // ---- change format date to time ago ----
    function convertFromNow(date, show_full_date) {
        if (show_full_date) {
            return helper.check_date_ago(date, '');
        } else {
            return helper.check_date_ago(date, 'check_current_year');
        }
    }

    // ---- save ads or unsaved ads ----
    function save_ads(save_or_unsaved, from, confirm_unsaved) {
        check_new_auth_user();

        // track click from where -> "post or detail"
        from_where.value = from;
        if (from_where.value === 'detail') {
            detail_one_post.value = d_p_detail.value; // from detail, must to add detail to detail_one_post.
        }

        if (window.navigator.onLine) {
            if (user_data.value && user_data.value.tokens.access_token) { // if have auth user
                if (save_or_unsaved === 'save') { // save
                    loading_field.value = true;

                    $fetch(config.VUE_APP_API_URL + 'me/saved',{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        body: new URLSearchParams({id: detail_one_post.value.id}),
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                        params: {lang: language.value},
                    }).then(res => {
                        if (from === 'detail') { // save from detail.
                            d_p_detail.value.is_saved = true;
                            tracking_manual('save'); // tracking save.
                        } else { // save from post.
                            $('#show_modal_actions_post').modal('hide');
                            let related = d_p_related_post.value.data;
                            for (let i = 0; i < related.length; i++) {
                                if (related[i].data.id == detail_one_post.value.id) {
                                    related[i].data.is_saved = true;
                                    detail_one_post.value.is_saved = true;
                                    break
                                }
                            }
                        }
                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_5.value < 2) {
                                reload_q_again_5.value += 1;
                                setTimeout( () => { save_ads(save_or_unsaved, from, confirm_unsaved); }, 3000);
                            } else {
                                loading_field.value = false;
                                $('#modal_show_status_error_connection').modal('show');
                            }

                        } else {
                            let check = error.response; // original data error
                            let data_check = JSON.stringify(check);
                            let data_parse = JSON.parse(data_check);
                            if (check.status === 401) { // retry
                                if (reload_q_again_5.value <= 2) {
                                    reload_q_again_5.value += 1;
                                    setTimeout( () => { save_ads(save_or_unsaved, from, confirm_unsaved); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({name: 'index'}))
                                }
                            } else if (check.status === 404) {
                              toast_message(data_parse._data.message, false);
                            }
                        }
                    }).finally(() => (loading_field.value = false));

                } else { // unsaved
                    if (confirm_unsaved) {
                        loading_field.value = false;
                        $('#modal_confirm_unsaved').modal('show');
                    } else {
                        loading_field.value = true;
                        $fetch(config.VUE_APP_API_URL + 'me/saved',{
                            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                            method: 'DELETE',
                            params: {id: detail_one_post.value.id},
                            headers: {"Access-Token": user_data.value.tokens.access_token},
                        }).then(res => {
                            if (from === 'detail') { // unsaved from detail.
                                $('#modal_confirm_unsaved').modal('hide');
                                d_p_detail.value.is_saved = false;
                                tracking_manual('unsave'); // tracking unsaved.
                            } else { // unsaved from post.
                                setTimeout(() => { $('#modal_confirm_unsaved').modal('hide'); $('#show_modal_actions_post').modal('hide'); },100);
                                let related = d_p_related_post.value.data;
                                for (let i = 0; i < related.length; i++) {
                                    if (related[i].data.id == detail_one_post.value.id) {
                                        related[i].data.is_saved = false;
                                        detail_one_post.value.is_saved = false;
                                        break
                                    }
                                }
                            }
                        }).catch(error => {
                            if (!error.response) {
                                if (reload_q_again_6.value <= 2) {
                                    reload_q_again_6.value += 1;
                                    setTimeout( () => { save_ads(save_or_unsaved, from, confirm_unsaved); }, 3000);
                                } else {
                                    loading_field.value = false;
                                    $('#modal_show_status_error_connection').modal('show');
                                }
                            } else {
                                let check = error.response;
                                let data_check = JSON.stringify(check);
                                let data_parse = JSON.parse(data_check);
                                if (check.status === 401) { // retry
                                    if (reload_q_again_6.value <= 2) {
                                      reload_q_again_6.value += 1;
                                      setTimeout(() => {
                                        save_ads(save_or_unsaved, from, confirm_unsaved);
                                      }, 3000);
                                    } else {
                                      localStorage.removeItem('auth_user');   // remove localStorage
                                      VueCookieNext.removeCookie('auth_user');
                                      router.replace(localePath({name: 'index'}))
                                    }
                                } else if (check.status === 404) {
                                    toast_message(data_parse._data.message, false);
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
                    action: 'save',
                    expire: expired,
                    data: {post_id: detail_one_post.value.id},
                    from: {name: 'detail_post'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- /save ads or unsaved ads ----

    // ---- click like post ----
    function click_like(id, like_or_dislike, from_list_or_detail, data) {
        check_new_auth_user();

        if (window.navigator.onLine) {
            if (user_data.value) {
                loading_field.value = true;
                if (like_or_dislike) {        // -- dislike --

                    $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me',{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'DELETE',
                        params: {id: id},
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                    }).then(res => {
                        if (from_list_or_detail === 'detail') {
                            tracking_manual('unlike'); // tracking unlike on post detail.
                            var con_to_number = parseInt(d_p_detail.value.total_like);
                            d_p_detail.value.is_like = false;
                            d_p_detail.value.total_like = con_to_number - 1;
                        } else {
                            track_action_on_post('unlike', id, d_p_related_post.value.data ? d_p_related_post.value.data.length : '', d_p_related_post.value.limit,
                                data.current_index, data.placement, data.display_type, { paid: data.paid }); // tracking unlike on related posts.
                            $.each(d_p_related_post.value.data, (key, value) => {
                                if (parseInt(value.data.id) === parseInt(id)) {
                                    d_p_related_post.value.data[key].data.is_like = false;
                                    return;
                                }
                            });
                        }

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_7.value < 2) {
                                reload_q_again_7.value += 1;
                                setTimeout( () => { click_like(id, like_or_dislike, from_list_or_detail, data); }, 3000);
                            } else {
                                loading_field.value = false;
                                $('#modal_show_status_error_connection').modal('show');
                            }
                        } else {
                            if (error.response && error.response.status === 404) {
                                if (from_list_or_detail === 'detail') {
                                    var con_to_number = parseInt(d_p_detail.value.total_like);
                                    d_p_detail.value.is_like = false;
                                    d_p_detail.value.total_like = con_to_number - 1;
                                } else {
                                    $.each(d_p_related_post.value.data, (key, value) => {
                                        if (parseInt(value.data.id) === parseInt(id)) {
                                            d_p_related_post.value.data[key].data.is_like = false;
                                            return;
                                        }
                                    });
                                }

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_7.value <= 2) {
                                    reload_q_again_7.value += 1;
                                    setTimeout( () => { click_like(id, like_or_dislike, from_list_or_detail, data); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }
                            }
                        }
                    }).finally(() => (loading_field.value = false));

                } else {                      // -- like --
                    $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me',{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        body: new URLSearchParams({id: id}),
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                        params: {lang: language.value},
                    }).then(res => {
                        if (from_list_or_detail === 'detail') {
                            tracking_manual('like'); // tracking like on detail post.
                            var con_to_number = parseInt(d_p_detail.value.total_like);
                            d_p_detail.value.is_like = true;
                            d_p_detail.value.total_like = con_to_number + 1;
                        } else {
                            track_action_on_post('like', id, d_p_related_post.value.data ? d_p_related_post.value.data.length : '', d_p_related_post.value.limit,
                                data.current_index, data.placement, data.display_type, { paid: data.paid }); // tracking like on related posts.
                            $.each(d_p_related_post.value.data, (k, val) => {
                                if (parseInt(val.data.id) === parseInt(id)) {
                                    d_p_related_post.value.data[k].data.is_like = true;
                                    return;
                                }
                            });
                        }

                    }).catch(error => {
                        if (!error.response) {
                            if (reload_q_again_8.value < 2) {
                                reload_q_again_8.value += 1;
                                setTimeout( () => { click_like(id, like_or_dislike, from_list_or_detail, data); }, 3000);
                            } else {
                                loading_field.value = false;
                                $('#modal_show_status_error_connection').modal('show');
                            }
                        } else {
                            if (error.response && error.response.status === 404) {
                                if (from_list_or_detail === 'detail') {
                                    var con_to_number = parseInt(d_p_detail.value.total_like);
                                    d_p_detail.value.is_like = true;
                                    d_p_detail.value.total_like = con_to_number + 1;
                                } else {
                                    $.each(d_p_related_post.value.data, (k, val) => {
                                        if (parseInt(val.data.id) === parseInt(id)) {
                                            d_p_related_post.value.data[k].data.is_like = true;
                                            return;
                                        }
                                    });
                                }

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_8.value <= 2) {
                                    reload_q_again_8.value += 1;
                                    setTimeout( () => { click_like(id, like_or_dislike, from_list_or_detail, data); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }
                            }
                        }
                    }).finally(() => (loading_field.value = false));
                }
            } else {

                // tracking like if not login yet
                track_action_on_post('like', id, d_p_related_post.value.data ? d_p_related_post.value.data.length : '',
                    d_p_related_post.value.limit, data.current_index, data.placement, data.display_type,{ paid: data.paid });

                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'like',
                    expire: expired,
                    data: {post_id: id},
                    from: {name: 'detail_post'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }

        } else {
            loading_field.value = false
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- /click like post ----

    // ---- convert price ----
    function convert_price(price) { return helper.convert_price(price); }

    // ---- convert discount to $ to k ----
    function convert_price_to_k(price) { return helper.kFormatter(price); }

    // --- renew button if ads is own user login ---
    function renew_button(id) {
        check_new_auth_user();

        // if have store must to bos id too
        var renew_with_store_id = d_p_detail.value.store && d_p_detail.value.store.id ? new URLSearchParams({ storeid: d_p_detail.value.store.id }) : '';

        if (window.navigator.onLine) {
            loading_field.value = true;
            $fetch(config.VUE_APP_API_URL + 'me/posts/'+id+'/renew',{
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'POST',
                body: renew_with_store_id,
                headers: {"Access-Token": user_data.value.tokens.access_token},
                params: {lang: language.value},
            }).then(res_renew => {
                // -- set message success and show --
                toast_message(res_renew.message, true);

                // -- set value to old value --
                d_p_detail.value.renew_date = res_renew.data.date;
                d_p_full_detail.value.data.renew_date = res_renew.data.date;
                data_meta.value = d_p_full_detail.value.meta ? d_p_full_detail.value.meta : '';  // -- override meta tag dynamic by post detail --

            }).catch(error => {
                if (!error.response) {
                    if (reload_q_again_9.value <= 2) {
                        reload_q_again_9.value += 1;
                        setTimeout( () => { renew_button(id); }, 3000);
                    } else {
                        loading_field.value = false;
                        $('#modal_show_status_error_connection').modal('show');
                    }
                } else {
                    let check = error.response ? error.response : '';
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    if (check && check.status === 403) {
                        toast_message(data_parse._data.message, false);
                    } else if (check.status === 404) {
                        toast_message(data_parse._data.message, false);
                    } else if (check.status === 401) { // retry
                        if (reload_q_again_9.value <= 2) {
                            reload_q_again_9.value += 1;
                            setTimeout( () => { renew_button(id); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({ name: 'index' }));
                        }
                    }
                }
            }).finally(() => (loading_field.value = false));

        } else {
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- show modal delete reason ----
    function show_modal_delete() {
        check_new_auth_user();

        delete_check.value = '';         // clear check
        delete_description.value = '';   // clear description
        show_description.value = '';     // hide description
        $('#delete_description').removeClass('error_field_text_report'); // clear error on description
        $('#error_delete_description').addClass('d-none');            // remove text show error

        if (window.navigator.onLine) {
            if (!localStorage.getItem("delete_post")) {
                loading_field.value = true;

                $fetch(config.VUE_APP_API_URL + 'me/posts/delete_reasons',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Access-Token": user_data.value.tokens.access_token},
                    params: {lang: language.value},

                }).then(response => {
                    const object = {
                        data: response.data,
                        expiry: helper.Date_To_Timestamp('', 86400, 'seconds'),  // add 1 day
                    }
                    localStorage.setItem("delete_post", JSON.stringify(object));
                    delete_post.value = localStorage.getItem("delete_post") ? JSON.parse(localStorage.getItem("delete_post")) : [];
                    $('#modal_show_delete_reason').modal('show');

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_10.value <= 2) {
                            reload_q_again_10.value += 1;
                            setTimeout( () => { show_modal_delete(); }, 3000);
                        } else {
                            loading_field.value = false;
                            $('#modal_show_status_error_connection').modal('show');
                        }
                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_10.value <= 2) {
                            reload_q_again_10.value += 1;
                            setTimeout( () => { show_modal_delete(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({ name: 'index' }));
                        }
                    }
                }).finally(() => (loading_field.value = false));
            } else {
                delete_post.value = localStorage.getItem("delete_post") ? JSON.parse(localStorage.getItem("delete_post")) : [];
                $('#modal_show_delete_reason').modal('show');
            }

        } else {
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    function choose_delete(reason) {
        if (reason === 'other') {
            show_description.value = 'show_description'; // show description
            $('#delete_description').focus(); // focus description
            delete_description.value = '';   // clear
        } else {
            show_description.value = '';     // hide description
            delete_description.value = '';   // clear
        }
        // -- remove error on description field --
        $('#delete_description').removeClass('error_field_text_report');
        $('#error_delete_description').addClass('d-none');

        delete_check.value = reason;
    }
    function close_delete_modal() { $('#modal_show_delete_reason').modal('hide'); }
    function click_delete_ads() {
        let data_body = {
            reason: delete_check.value,
            type: d_p_detail.value && d_p_detail.value.status === 'expired' ? 'expired' : 'active', // delete expired or active post
            description: delete_description.value ? delete_description.value : '',
        }
        if (d_p_detail.value && d_p_detail.value.store && d_p_detail.value.store.id) { data_body['storeid'] = d_p_detail.value.store.id; }
        if ((!delete_check.value) || (delete_check.value === 'other' && !delete_description.value)) {

            // -- show error on textarea --
            $('#delete_description').addClass('error_field_text_report');
            $('#error_delete_description').removeClass('d-none');

            let message = '';
            if (!delete_check.value) {
                message = language.value === 'km' ? 'សូមជ្រើសរើសហេតុផលនៃកាលុប' : 'Please Choose Delete Reason';
            } else {
                message = language.value === 'km' ? 'បំពេញមូលហេតុនៃកាលុប' : 'Write Delete Reason';
                $('#delete_description').focus();
            }
            toast_message(message, false);
        } else {
            if (window.navigator.onLine) {
                loading_field.value = true;
                $fetch(config.VUE_APP_API_URL + 'me/posts/' + d_p_detail.value.id, {
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Access-Token": user_data.value.tokens.access_token},
                    method: 'DELETE',
                    params: {lang: language.value},
                    body: new URLSearchParams(data_body)
                }).then(res => {
                    router.push(localePath({ name: 'account' })); // redirect to account page when delete completed
                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_11.value <= 2) {
                            reload_q_again_11.value += 1;
                            setTimeout( () => { click_delete_ads(); }, 3000);
                        } else {
                            loading_field.value = false;
                            $('#modal_show_status_error_connection').modal('show');
                        }
                    } else {
                        // original data error
                        let check = error.response ? error.response : '';
                        // parse to get message response error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);

                        if (check && check.status === 403) {
                            $('#modal_show_delete_ads_block').modal('hide');
                            toast_message(data_parse._data.message, false);

                        } else if (check && check.status === 401) { // retry
                            if (reload_q_again_11.value <= 2) {
                                reload_q_again_11.value += 1;
                                setTimeout( () => { click_delete_ads(); }, 3000);
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
                $('#modal_show_status_error_connection').modal('show');
            }
        }
    }
    // ---- /show modal delete reason ----

    // ---- convert title to use in url ----
    function check_title_char(title) { return helper.check_special_char(title); }
    // ---- /convert title to use in url ----

    // --- check is renew already ---
    function renew_btn_disable(renew_date) {  // ---- check disable renew btn ----
        var now = new Date();
        now.setDate( now.getDate() - 1 ); // minus 1 day
        let re_dat = helper.Date_To_Timestamp(renew_date, '', '');  // convert renew_date to timestamp
        let today_minus_one = helper.Date_To_Timestamp(now,'',''); // get minus 1 dat and convert to number
        if (today_minus_one <= re_dat) {
            return false;
        } else {
            return true;
        }
    }

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                // page_title: helper.check_special_char(d_p_detail.value.title),
                page_title: d_p_detail.value && d_p_detail.value.title ? d_p_detail.value.title : 'empty',
                page_location: page_location,
                page_path: page_path,
            };
            // -- event on page --
            event('detail_post', data);
            // -- page_view --
            pageview(data);
        // },350); // setTimeout for prevent pag_title not get meta title.
    }

    // ---- show page 404 ----
    function show_page_404(server_or_client) {
        if (server_or_client === 'server') { // work only Server Side
            // throw createError({ statusCode: 404, statusMessage: 'Pagess Not Found', fatal: true });
            throw createError({ statusCode: 404 });
        } else { // work on both server and Client Side
            showError({ statusCode: 404 });
            // showError({ message: 'Page not found', statusCode: 404 })
            // showError("😱 Oh no, an error has been thrown.");
        }
    }

    // ---- user tracking ----
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


    const text_comment = ref('');
    const tmp_id = ref(1); 
    const user_type = ref('user');
    const reply_id = ref('');   

    function create_comment() {
        if (text_comment.value) {
            let r = route.params;
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
                sent_comment('reply_com', r.id, com_data);
            } else {                    // click comment in bottom nav bar.
                com_data = { txt_com: text_comment.value, id_tmp: tmp_id.value }
                sent_comment('sent_com', r.id, com_data);
            }

        } else {
            document.getElementById('_message_').focus();
        }
    }

    // --- sent comment ---
    function sent_comment(type, p_id, data_com) {
        // -> is store
        let r_q = route.params.id;
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
                        check_new_auth_user();
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
</script>
