<template>
    <div>
        <div>
            <div v-if="loading_field" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>

            <!-- list post following -->
            <div v-if="user_data && my_following_ads.length > 0" :class="!isMobile ? 'dt_my_fol_list rounded con-follow-ads-new' : 'con-follow-ads'">
                <div class="con-f-a-title">
                    <p>My Following<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                    <NuxtLink :to="localePath({ name: 'search', query: { following: true } })" @click="save_track_optional('first', { first: 'the_first' })" class="btn-s-m-following">
                        {{ $t('message.view_more') }}
                    </NuxtLink>
                </div>
                <div class="flex_following_ads">
                    <article v-for="(post, index) of my_following_ads" :key="index" class="show-list-follow">
                        <div class="s-hori-scroll">
                            <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                @click="save_track_optional('tracking', { placement: 'home', display_type: display_list.type ? display_list.type : 'grid', item_count: homePosts.length,
                                item_per_page: homeOffset, current_index: index, paid: post.data.type !== 'normal' ? true : false, from: 'following' })"  class="position_relative d_block">
                                 <!-- status show discount -->
                                <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                    <p class="new_st_dis_price">
                                        {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                    </p>
                                    <p class="new_st_dis_text">OFF</p>
                                </div>

                                <div class="height_media position_relative">
                                    <!-- options -->
                                    <div @click.prevent="show_options(post, { post_id: post.data.id, placement: 'home', display_type: display_list.type ? display_list.type : 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                                paid: post.data.type !== 'normal' ? true : false, from: 'following' }, { from: 'my_following'})" class="grid-opt-post">
                                        <i class="icon-ellipsis-vertical"></i>
                                    </div>
                                    <div :id="`share_${post.data.id}`" @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: 'following'}, { from: 'my_following', data: my_following_ads })"></div>

                                    <!-- shipping count photos -->
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
                                    <img v-if="post.data.thumbnail" :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                         :alt="post.data.title ? post.data.title : ''" class="lazy"
                                         :class="post.setting && post.setting.enable_apply_job ? 'img_product_contain height_media bg_reload_img_white img_post_listing' : 'img_product height_media bg_reload_img img_post_listing'"
                                         :src="empty_img_loading" @error="imageUrlAlt_post" />
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

                                    <div class="post_spec post_more_spec">
                                        <div v-if="post.data.condition"> {{ post.data.condition ? post.data.condition.title : '' }} </div>
                                        <template v-if="post.data.object_highlight_specs">
                                            <template  v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                <div> {{ v.display_value }} </div>
                                            </template>
                                        </template>
                                    </div>

                                    <p class="truncate gr-p-date-loc">
                                        {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                        &#8226;
                                        {{ post.data.location ? (locale === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                    </p>

                                    <p class="gr-p-price truncate">
                                        <strong>
                                            {{ post.data.price > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{ post.data.price > 0 && post.data.category && post.data.category.parent == 2 ? '+' : '' }}
                                        </strong>
                                        <span v-if="post.data.discount" class="line_price"> {{ '$'+convert_price(post.data.discount.original_price) }} </span>
                                    </p>
                                </div>

                                <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                <div v-else class="list_pad_icon_heart">
                                    <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like,
                                        { current_index: index, placement: 'home', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: 'following'  }, { from: 'my_following' })" class="cl_ripple">
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
                                    type: display_list.type ? display_list.type : 'grid',
                                    paid: post.data.type !== 'normal' ? true : false,
                                    placement: 'following',
                                }),
                                once: true,       // show and get only new data in view port, if scroll up not count old data.
                                // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                            }"></div>
                        </ClientOnly>
                    </article>

                    <!-- show more -->
                    <div class="s-m-follows">
                        <NuxtLink :to="localePath({ name: 'search',query: { following: true } })" @click="save_track_optional('first', { first: 'the_first' })" class="show-more-follow" style="width: 100%;height: 100%;">
                            <div>
                                <i class="icon-add-plus-svgrepo-com"></i>
                                <p>{{ $t('message.show_more') }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Top Ads -->
            <div v-if="dt_top_ads.length > 0" :class="!isMobile ? 'dt_my_fol_list rounded con-follow-ads-new' : 'con-follow-ads'">
                <div class="con-f-a-title">
                    <p>{{ $t('text_desktop.top_ads') }}</p>
                </div>
                <div class="flex_following_ads">
                    <template v-for="(post, index) of dt_top_ads" :key="index">
                        <article v-if="post.type === 'post'" class="show-list-follow">
                            <div class="s-hori-scroll">
                                <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                          @click="save_track_optional('tracking', { placement: 'home', display_type: display_list.type ? display_list.type : 'grid', item_count: homePosts.length,
                                    item_per_page: homeOffset, current_index: index, paid: post.data.type !== 'normal' ? true : false, from: 'top_ads' })"  class="position_relative d_block">
                                    <!-- status show discount -->
                                    <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                        <p class="new_st_dis_price">
                                            {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                        </p>
                                        <p class="new_st_dis_text">OFF</p>
                                    </div>

                                    <div class="height_media position_relative">
                                        <!-- options -->
                                        <div @click.prevent="show_options(post, { post_id: post.data.id, placement: 'home', display_type: display_list.type ? display_list.type : 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                                    paid: post.data.type !== 'normal' ? true : false, from: 'top_ads' }, { from: 'my_top_ads'})" class="grid-opt-post">
                                            <i class="icon-ellipsis-vertical"></i>
                                        </div>
                                        <div :id="`share_${post.data.id}`" @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: 'top_ads'}, { from: 'top_ads', data: dt_top_ads })"></div>

                                        <!-- shipping count photos -->
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
                                        <img v-if="post.data.thumbnail" :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                              :alt="post.data.title ? post.data.title : ''" class="lazy"
                                              :class="post.setting && post.setting.enable_apply_job ? 'img_product_contain height_media bg_reload_img_white img_post_listing' : 'img_product height_media bg_reload_img img_post_listing'"
                                              :src="empty_img_loading" @error="imageUrlAlt_post" />
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

                                        <div class="post_spec post_more_spec">
                                            <div v-if="post.data.condition"> {{ post.data.condition ? post.data.condition.title : '' }} </div>
                                            <template v-if="post.data.object_highlight_specs">
                                                <template  v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                    <div> {{ v.display_value }} </div>
                                                </template>
                                            </template>
                                        </div>

                                        <p class="truncate gr-p-date-loc">
                                            {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                            &#8226;
                                            {{ post.data.location ? (locale === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                        </p>

                                        <p class="gr-p-price truncate">
                                            <strong>
                                                {{ post.data.price > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{ post.data.price > 0 && post.data.category && post.data.category.parent == 2 ? '+' : '' }}
                                            </strong>
                                            <span v-if="post.data.discount" class="line_price"> {{ '$'+convert_price(post.data.discount.original_price) }} </span>
                                        </p>
                                    </div>

                                    <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                    <div v-else class="list_pad_icon_heart">
                                        <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like,
                                            { current_index: index, placement: 'home', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: 'top_ads'  }, { from: 'my_top_ads' })" class="cl_ripple">
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
                                        type: display_list.type ? display_list.type : 'grid',
                                        paid: post.data.type !== 'normal' ? true : false,
                                        placement: 'top_ads',
                                    }),
                                    once: true,       // show and get only new data in view port, if scroll up not count old data.
                                    // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                }"></div>
                            </ClientOnly>
                        </article>
                    </template>
                    <div class="pad_R_top_ads"></div>
                </div>
            </div>

            <!-- Featured Ads -->
            <div v-if="dt_featured_ads.length > 0" :class="!isMobile ? 'dt_my_fol_list rounded con-follow-ads-new' : 'con-follow-ads'">
                <div class="con-f-a-title">
                    <p>{{ $t('text_desktop.feature_ads') }}</p>
                </div>
                <div class="flex_following_ads">
                    <template v-for="(post, index) of dt_featured_ads" :key="index">
                        <article v-if="post.type === 'post'" class="show-list-follow">
                            <div class="s-hori-scroll">
                                <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                          @click="save_track_optional('tracking', { placement: 'home', display_type: display_list.type ? display_list.type : 'grid', item_count: homePosts.length,
                                    item_per_page: homeOffset, current_index: index, paid: post.data.type !== 'normal' ? true : false, from: 'featured_ads' })"  class="position_relative d_block">
                                    <!-- status show discount -->
                                    <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                        <p class="new_st_dis_price">
                                            {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                        </p>
                                        <p class="new_st_dis_text">OFF</p>
                                    </div>

                                    <div class="height_media position_relative">
                                        <!-- options -->
                                        <div @click.prevent="show_options(post, { post_id: post.data.id, placement: 'home', display_type: display_list.type ? display_list.type : 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                                    paid: post.data.type !== 'normal' ? true : false, from: 'featured_ads' }, { from: 'my_featured_ads'})" class="grid-opt-post">
                                            <i class="icon-ellipsis-vertical"></i>
                                        </div>
                                        <div :id="`share_${post.data.id}`" @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: 'featured_ads'}, { from: 'featured_ads', data: dt_featured_ads })"></div>

                                        <!-- shipping count photos -->
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
                                        <img  v-if="post.data.thumbnail" :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                             :alt="post.data.title ? post.data.title : ''" class="lazy"
                                             :class="post.setting && post.setting.enable_apply_job ? 'img_product_contain height_media bg_reload_img_white img_post_listing' : 'img_product height_media bg_reload_img img_post_listing'"
                                             :src="empty_img_loading" @error="imageUrlAlt_post" />
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

                                        <div class="post_spec post_more_spec">
                                            <div v-if="post.data.condition"> {{ post.data.condition ? post.data.condition.title : '' }} </div>
                                            <template v-if="post.data.object_highlight_specs">
                                                <template  v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                    <div> {{ v.display_value }} </div>
                                                </template>
                                            </template>
                                        </div>

                                        <p class="truncate gr-p-date-loc">
                                            {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                            &#8226;
                                            {{ post.data.location ? (locale === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                        </p>

                                        <p class="gr-p-price truncate">
                                            <strong>
                                                {{ post.data.price > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{ post.data.price > 0 && post.data.category && post.data.category.parent == 2 ? '+' : '' }}
                                            </strong>
                                            <span v-if="post.data.discount" class="line_price"> {{ '$'+convert_price(post.data.discount.original_price) }} </span>
                                        </p>
                                    </div>

                                    <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                    <div v-else class="list_pad_icon_heart">
                                        <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like,
                                            { current_index: index, placement: 'home', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: 'featured_ads'  }, { from: 'my_featured_ads' })" class="cl_ripple">
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
                                        type: display_list.type ? display_list.type : 'grid',
                                        paid: post.data.type !== 'normal' ? true : false,
                                        placement: 'featured_ads',
                                    }),
                                    once: true,       // show and get only new data in view port, if scroll up not count old data.
                                    // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                }"></div>
                            </ClientOnly>
                        </article>
                    </template>
                    <div class="pad_R_top_ads"></div>
                </div>
            </div>

            <!-- switch view post data -->
            <div v-if="homePosts.length > 0" :class="isDesktop ? 'position_relative dt_home_switch_view' : ''">
                <h2 class="s_latest_ads pt-15" :class="isMobile ? 'ms-2' : ''">{{ $t('new_text_1.latest_ads') }}</h2>
                <div v-if="isMobile" class="s-parent-btn-display _flex_" :class="isMobile ? 'me-2' : ''">
                    <div class="btn-group btn-group-sm btn_switch_view " role="group" aria-label="Basic example">
                        <button @click="change_grid('view')" type="button" aria-label="view" :class="display_list && display_list.type === 'view' ? 'active' : ''" class="btn btn-light icon-display-icon s_btn_switch_view font_text_bold"></button>
                        <button @click="change_grid('list')" type="button" aria-label="list" :class="display_list && display_list.type === 'list' ? 'active' : ''" class="btn btn-light icon-list s_btn_switch_view font_text_bold"></button>
                        <button @click="change_grid('grid')" type="button" aria-label="grid" :class="display_list && display_list.type === 'grid' ? 'active' : ''" class="btn btn-light icon-menu s_btn_switch_view font_text_bold "></button>
                    </div>
                </div>
            </div>
            <!-- add new ads -->
            <div :class="isDesktop ? 'screen_desktop' : ''">
                <div :id="isMobile ? '' : 'height_div'" class="flex_all_post lists_post_content" :class="display_list && display_list.type === 'list' ? (isDesktop ? 'dt_list_max_width' : 'list-max-width') : (display_list && display_list.type === 'grid' ? (isDesktop ? 'dt_grid_mg_post' : '') : '')">
                    <!-- list -->
                    <template v-if="display_list && display_list.type === 'list'">
                        <!-- add new ads -->
                        <article class="col-12 no_padding">
                            <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                <div class="a-n-ads-list">
                                    <div class="a-n-new-ads cur_sur" @click="ads_new_post">
                                        <p class="a-n-ads-l1">{{ $t('new_text_3.ads_new_title') }}</p>
                                        <p class="a-n-ads-l2">{{ $t('new_text_3.ads_new_sub_title') }}</p>
                                        <button class="btn">{{ $t('new_text_3.start_selling') }}</button>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <template v-for="(post, index) of homePosts" :key="index">
                            <template v-for="val in check_limit">
                                <article v-if="val === index" class="col-12 no_padding">
                                    <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                        <div class="a-n-ads-list">
                                            <div class="a-n-new-ads cur_sur" @click="ads_new_post">
                                                <p class="a-n-ads-l1">{{ $t('new_text_3.ads_new_title') }}</p>
                                                <p class="a-n-ads-l2">{{ $t('new_text_3.ads_new_sub_title') }}</p>
                                                <button class="btn">{{ $t('new_text_3.start_selling') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </template>
                            
                            <article v-if="post.type === 'post'" class="col-12 no_padding">
                                <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                    <div class="u_border_cart">
                                        <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                            @click="save_track_optional('tracking', { placement: 'home', display_type: 'list', item_count: homePosts.length, item_per_page: homeOffset,
                                            current_index: index, paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                            <div class="_flex_">
                                                <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                    <p class="new_st_dis_price">
                                                        {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                    </p>
                                                    <p class="new_st_dis_text">OFF</p>
                                                </div>

                                                <div class="list-contain-img">
                                                    <div @click.prevent="show_options(post,{post_id: post.data.id, placement: 'home', display_type: 'list', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                                        paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                        <i class="icon-ellipsis-vertical"></i>
                                                    </div>
                                                    <img :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                         :alt="post.data.title ? post.data.title : ''" class="lazy bg_reload_img_white"
                                                         :class="post.data.category && post.data.category.parent == 2 ? (!post.data.thumbnail ? 'u_img_post_by' : 'u_img_post_by_job') : 'u_img_post_by'"
                                                         :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                    <div v-if="post.data.photos && post.data.photos.length > 1" class="c-p-left">
                                                        <div class="c-p-con">
                                                            <i class="far fa-image"></i>
                                                            <p>{{ post.data.photos ? post.data.photos.length : '0' }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col u_p_col_">

                                                    <div class="list_profile_des">
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
                                                    <div v-if="post.setting && post.setting.enable_like" class="cl_ripple list-font-icon-heart" @click.prevent="click_like(post.data.id, post.data.is_like,
                                                            { current_index: index, placement: 'home', display_type: 'list', paid: post.data.type !== 'normal' ? true : false, from: ''  })">
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
                            <div v-else-if="post.type === 'banner'" :class="post.data.type === 'code' && !post.data.new_html_banner ? '' : 'banner-con'">
                                <a rel="nofollow noopener" aria-label="banner" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank">
                                    <div>
                                        <img :src="post.data.image" alt="khmer24 banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                    </div>
                                </a>
                                <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                            </div>
                            <template v-if="isMobile">
                                <div v-if="post.type === 'highlight_ads'" class="screen-mobile highlight-ads">
                                    <div class="con-follow-ads m-0">
                                        <div class="con-f-a-title">
                                            <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                        </div>
                                        <div class="flex_following_ads">
                                            <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                                <div class="s-hori-scroll">
                                                    <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })"
                                                        @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: inx,
                                                        paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })" class="position_relative d_block">
                                                        <!-- status show discount -->
                                                        <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                            <p class="new_st_dis_price">
                                                                {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                            </p>
                                                            <p class="new_st_dis_text">OFF</p>
                                                        </div>

                                                        <div class="height_media position_relative">
                                                            <!-- options -->
                                                            <div @click.prevent="show_options(p, { post_id: p.data.id, placement: 'home', display_type: 'list', item_count: homePosts.length, item_per_page: homeOffset, current_index: inx,
                                                                paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                                <i class="icon-ellipsis-vertical"></i>
                                                            </div>
                                                            <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight'}, { from: 'highlight_ads', data: post.data })"></div>

                                                            <!-- shipping count photos -->
                                                            <div class="c-p-list-post">
                                                                <div v-if="p.data.shipping" class="free_shipping_list_post">
                                                                    <i class="fas fa-truck"></i>
                                                                    <p>{{ p.data.shipping.title }}</p>
                                                                </div>
                                                                <div v-if="p.data.photos && p.data.photos.length > 1">
                                                                    <div class="c-p-con">
                                                                        <i class="far fa-image"></i>
                                                                        <p>{{ p.data.photos.length }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- image post -->
                                                            <template v-if="p.data.thumbnail">
                                                                <img :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                    :alt="p.data.title ? p.data.title : ''"
                                                                    class="lazy height_media img_post_listing"
                                                                    :class="p.setting && p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                    :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                            </template>
                                                            <!-- show title if image empty -->
                                                            <div v-else class="empty_image_parent height_media">
                                                                <div class="text-center empty_image_child">
                                                                    <p class="m-0 font_18 empty_image_text">
                                                                        {{ p.data.title ? p.data.title : '' }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="grid-list-des">
                                                            <p class="truncate gr-p-title" v-text="p.data.title ? p.data.title : '...'"></p>

                                                            <div class="post_spec post_more_spec">
                                                                <div v-if="p.data.condition"> {{ p.data.condition ? p.data.condition.title : '' }} </div>
                                                                <template v-if="p.data.object_highlight_specs">
                                                                    <template  v-for="(v, k) of p.data.object_highlight_specs" :key="k">
                                                                        <div> {{ v.display_value }} </div>
                                                                    </template>
                                                                </template>
                                                            </div>

                                                            <p class="truncate gr-p-date-loc">
                                                                {{ p.data.renew_date ? convertFromNow(p.data.renew_date) : convertFromNow(p.data.posted_date) }}
                                                                &#8226;
                                                                {{ p.data.location ? (locale === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
                                                            </p>

                                                            <p class="gr-p-price truncate">
                                                                <strong>
                                                                    {{ parseInt(p.data.price) > 0 ? '$'+convert_price(p.data.price) : $t('new_text.negotiable') }}{{ p.data.price > 0 && p.data.category && p.data.category.parent == 2 ? '+' : '' }}
                                                                </strong>
                                                                <span v-if="p.data.discount" class="line_price"> {{ '$'+convert_price(p.data.discount.original_price) }} </span>
                                                            </p>
                                                        </div>

                                                        <template v-if="user_data && p.data.user && p.data.user.id === user_data.user.id"></template>
                                                        <div v-else class="list_pad_icon_heart">
                                                            <div v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like, { current_index: inx, placement: 'home', display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })" class="cl_ripple">
                                                                <i v-if="p.data.is_like" class="fas fa-heart parent_color ver_icon"></i>
                                                                <i v-else class="far fa-heart color_like ver_icon"></i>
                                                            </div>
                                                        </div>
                                                    </NuxtLink>
                                                </div>
                                                <ClientOnly>
                                                    <div v-observe-visibility="{
                                                            callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                                id: p.data.id,
                                                                index: index,
                                                                type: 'list',
                                                                paid: p.data.type !== 'normal' ? true : false,
                                                                placement: 'highlight',
                                                            }),
                                                            once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                            // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                                        }"></div>
                                                </ClientOnly>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>
                    <!-- gallery -->
                    <template v-else-if="display_list && display_list.type === 'view'">
                        <!-- add new ads -->
                        <article class="list_items_post article_view_post">
                            <div>
                                <div class="a-n-ads-gallery">
                                    <div class="a-n-ads-sub cur_sur" @click="ads_new_post">
                                        <p class="a-n-ads-t1">{{ $t('new_text_3.ads_new_title') }}</p>
                                        <p class="a-n-ads-t2">{{ $t('new_text_3.ads_new_sub_title') }}</p>
                                        <button class="btn">{{ $t('new_text_3.start_selling') }}</button>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <template v-for="(post, index) of homePosts" :key="index">
                            <template v-for="val in check_limit">
                                <article v-if="val === index" class="list_items_post article_view_post">
                                    <div>
                                        <div class="a-n-ads-gallery">
                                            <div class="a-n-ads-sub cur_sur" @click="ads_new_post">
                                                <p class="a-n-ads-t1">{{ $t('new_text_3.ads_new_title') }}</p>
                                                <p class="a-n-ads-t2">{{ $t('new_text_3.ads_new_sub_title') }}</p>
                                                <button class="btn">{{ $t('new_text_3.start_selling') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </template>
                            <article v-if="post.type === 'post'" class="list_items_post article_view_post">
                                <div>
                                    <div class="my_card p-h">
                                        <div @click.prevent="show_options(post,{post_id: post.data.id, placement: 'home', display_type: 'gallery', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                            paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                            <i class="icon-ellipsis-vertical"></i>
                                        </div>
                                        <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                            @click="save_track_optional('tracking', { placement: 'home', display_type: 'gallery', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                            paid: post.data.type !== 'normal' ? true : false, from: '' })" class="d_block">

                                            <div> <!-- height_media position_relative -->

                                                <!-- if image count = 1 -->
                                                <div class="view-img-1" v-if="post.data.photos && post.data.photos.length === 1">
                                                    <img :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                         :alt="post.data.title ? post.data.title : ''"
                                                         class="lazy"
                                                         :class="post.setting && post.setting.enable_apply_job ? 'img-job' : 'img-simple-post'"
                                                         :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                </div>

                                                <!-- if image count = 2 -->
                                                <div class="view-img-2" v-else-if="post.data.photos && post.data.photos.length === 2">
                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)"
                                                         :alt="post.data.title ? post.data.title : ''"
                                                         class="lazy img-2-1" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                         :alt="post.data.title ? post.data.title : ''"
                                                         class="lazy img-2-2" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                    <!--<img class="img-2-1" :src='post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                    <img class="img-2-2" :src='post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">-->
                                                </div>

                                                <!-- if image count = 3 -->
                                                <div class="view-img-3" v-else-if="post.data.photos && post.data.photos.length === 3">
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

                                                <!-- if image count > 3 -->
                                                <div class="view-img-4" v-else-if="post.data.photos && post.data.photos.length > 3">
                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)"
                                                         :alt="post.data.title ? post.data.title : ''"
                                                         class="lazy" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                    <div>
                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                             :alt="post.data.title ? post.data.title : ''"
                                                             class="lazy img-4-1" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)"
                                                             :alt="post.data.title ? post.data.title : ''"
                                                             class="lazy img-4-2" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                        <img v-if="post.data.photos.length <= 4"
                                                             :data-src="post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)"
                                                             :alt="post.data.title ? post.data.title : ''"
                                                             class="lazy img-4-3" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                        <div v-else>
                                                            <img v-if="post.data.photos.length <= 4"
                                                                 :data-src="post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)"
                                                                 :alt="post.data.title ? post.data.title : ''"
                                                                 class="lazy img-4-4" :src="empty_img_loading" @error="imageUrlAlt_post" />
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

                                                <!-- show title if image empty -->
                                                <div v-else class="empty_image_parent view-img-0">
                                                    <div class="text-center empty_image_child">
                                                        <p class="m-0 font_18 empty_image_text">
                                                            {{ post.data.title ? post.data.title : '' }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="list_view_body">
                                                <!-- more post -->
                                                <div class="des_new_view">
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

                                            <div class="footer_list_view_post"> <!-- @click.self="show_detail(post.data.title, post.data.id)" -->
                                                <!-- check own post, not show like and chat icon -->
                                                <template v-if="user_data && post.data.user && post.data.user.id === user_data.user.id">
                                                    <div class="list_view_own_icon_share cur_sur">
                                                        <i @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: ''})" class="icon-share2"></i>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="list_view_action cur_sur cl_ripple" v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like,
                                                        { current_index: index, placement: 'home', display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                        <i v-if="post.data.is_like" class="fas fa-heart parent_color font_icon"></i>
                                                        <i v-else class="icon-Heart"></i>
                                                        <p :class="post.data.is_like ? 'parent_color' : ''">{{ $t('new_text.like') }}</p>
                                                    </div>
                                                    <div v-if="post.setting && post.setting.enable_chat" class="list_view_action cur_sur cl_ripple"
                                                       @click.prevent="show_chat(post.data.id, { current_index: index, placement: 'home', display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                        <i class="icon-messenger"></i>
                                                        <p>{{ $t('message.chat') }}</p>
                                                    </div>
                                                    <div @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: ''},{ detail: post })" :id="`share_${post.data.id}`" class="list_view_icon_share cur_sur">
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
                            <div v-else-if="post.type === 'banner'" :class="post.data.type === 'code' && !post.data.new_html_banner ? '' : 'banner-con'">
                                <a rel="nofollow noopener" aria-label="banner" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank">
                                    <div>
                                        <img :src="post.data.image" alt="khmer24 banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                    </div>
                                </a>
                                <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                            </div>
                            <div v-else-if="post.type === 'highlight_ads'" class="screen-mobile highlight-ads">
                                <div class="con-follow-ads m-0">
                                    <div class="con-f-a-title">
                                        <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                    </div>
                                    <div class="flex_following_ads">
                                        <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                            <div class="s-hori-scroll">
                                                <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })"
                                                    @click="save_track_optional('tracking', { placement: 'home', display_type: 'gallery', item_count: homePosts.length, item_per_page: homeOffset, current_index: inx,
                                                    paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })" class="position_relative d_block">
                                                    <!-- status show discount -->
                                                    <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                        <p class="new_st_dis_price">
                                                            {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                        </p>
                                                        <p class="new_st_dis_text">OFF</p>
                                                    </div>

                                                    <div class="height_media position_relative"> <!-- @click="show_detail(p.data.title, p.data.id)" -->
                                                        <!-- options -->
                                                        <div @click.prevent="show_options(p, { post_id: p.data.id, placement: 'home', display_type: 'gallery', item_count: homePosts.length, item_per_page: homeOffset, current_index: inx,
                                                                paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                            <i class="icon-ellipsis-vertical"></i>
                                                        </div>
                                                        <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight'}, { from: 'highlight_ads', data: post.data })"></div>

                                                        <!-- shipping count photos -->
                                                        <div class="c-p-list-post">
                                                            <div v-if="p.data.shipping" class="free_shipping_list_post">
                                                                <i class="fas fa-truck"></i>
                                                                <p>{{ p.data.shipping.title }}</p>
                                                            </div>
                                                            <div v-if="p.data.photos && p.data.photos.length > 1">
                                                                <div class="c-p-con">
                                                                    <i class="far fa-image"></i>
                                                                    <p>{{ p.data.photos.length }}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- image post -->
                                                        <template v-if="p.data.thumbnail">
                                                            <img :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                 :alt="p.data.title ? p.data.title : ''"
                                                                 class="lazy height_media img_post_listing"
                                                                 :class="p.setting && p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                 :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                        </template>
                                                        <!-- show title if image empty -->
                                                        <div v-else class="empty_image_parent height_media">
                                                            <div class="text-center empty_image_child">
                                                                <p class="m-0 font_18 empty_image_text">
                                                                    {{ p.data.title ? p.data.title : '' }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="grid-list-des">
                                                        <p class="truncate gr-p-title" v-text="p.data.title ? p.data.title : '...'"></p> <!-- @click="show_detail(p.data.title, p.data.id)" -->

                                                        <div class="post_spec post_more_spec">
                                                            <div v-if="p.data.condition"> {{ p.data.condition ? p.data.condition.title : '' }} </div>
                                                            <template v-if="p.data.object_highlight_specs">
                                                                <template  v-for="(v, k) of p.data.object_highlight_specs" :key="k">
                                                                    <div> {{ v.display_value }} </div>
                                                                </template>
                                                            </template>
                                                        </div>

                                                        <p class="truncate gr-p-date-loc"> <!-- @click="show_detail(p.data.title, p.data.id)" -->
                                                            {{ p.data.renew_date ? convertFromNow(p.data.renew_date) : convertFromNow(p.data.posted_date) }}
                                                            &#8226;
                                                            {{ p.data.location ? (locale === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
                                                        </p>

                                                        <p class="gr-p-price truncate">
                                                            <strong>
                                                                {{ parseInt(p.data.price) > 0 ? '$'+convert_price(p.data.price) : $t('new_text.negotiable') }}{{ p.data.price > 0 && p.data.category && p.data.category.parent == 2 ? '+' : '' }}
                                                            </strong>
                                                            <span v-if="p.data.discount" class="line_price"> {{ '$'+convert_price(p.data.discount.original_price) }} </span>
                                                        </p>
                                                    </div>

                                                    <template v-if="user_data && p.data.user && p.data.user.id === user_data.user.id"></template>
                                                    <div v-else class="list_pad_icon_heart">
                                                        <div v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like, { current_index: inx, placement: 'home', display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })" class="cl_ripple">
                                                            <i v-if="p.data.is_like" class="fas fa-heart parent_color ver_icon"></i>
                                                            <i v-else class="far fa-heart color_like ver_icon"></i>
                                                        </div>
                                                    </div>
                                                </NuxtLink>
                                            </div>
                                            <ClientOnly>
                                                <div v-observe-visibility="{
                                                    callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                        id: p.data.id,
                                                        index: index,
                                                        type: 'gallery',
                                                        paid: p.data.type !== 'normal' ? true : false,
                                                        placement: 'highlight',
                                                    }),
                                                    once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                    // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                                }"></div>
                                            </ClientOnly>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                    <!-- grid -->
                    <template v-else>
                        <!-- add new ads -->
                        <article v-if="homePosts.length > 0" class="a-n-ads-par-grid" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                            <div>
                                <div>
                                    <div @click="ads_new_post" class="a-n-ads-grid cur_sur">
                                        <p class="a-n-ads-g1">{{ $t('new_text_3.ads_new_title') }}</p>
                                        <p class="a-n-ads-g2">{{ $t('new_text_3.ads_new_sub_title') }}</p>
                                        <button class="btn">{{ $t('new_text_3.start_selling') }}</button>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <template v-for="(post, index) of homePosts" :key="index">
                            <template v-for="val in check_limit">
                                <article v-if="val === index" class="a-n-ads-par-grid" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                                    <div>
                                        <div>
                                            <div @click="ads_new_post" class="a-n-ads-grid cur_sur">
                                                <p class="a-n-ads-g1">{{ $t('new_text_3.ads_new_title') }}</p>
                                                <p class="a-n-ads-g2">{{ $t('new_text_3.ads_new_sub_title') }}</p>
                                                <button class="btn">{{ $t('new_text_3.start_selling') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </template>
                            <article v-if="post.type === 'post'" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                                <div class="list_items_post">
                                    <div class="my_card p-h kkk">
                                        <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                            @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                            paid: post.data.type !== 'normal' ? true : false, from: '' })" class="position_relative d_block">
                                            <!-- status show discount -->
                                            <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                <p class="new_st_dis_price">
                                                    {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                </p>
                                                <p class="new_st_dis_text">OFF</p>
                                            </div>

                                            <div class="height_media position_relative">
                                                <!-- options -->
                                                <div @click.prevent="show_options(post,{post_id: post.data.id, placement: 'home', display_type: 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: index,
                                                    paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                    <i class="icon-ellipsis-vertical"></i>
                                                </div>
                                                <div :id="`share_${post.data.id}`" @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: ''})"></div>

                                                <!-- shipping count photos -->
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
                                                <template v-if="post.data.thumbnail">
                                                    <img :data-src="post.data.thumbnail"
                                                         :alt="post.data.title ? post.data.title : ''"
                                                         class="lazy img_post_listing height_media"
                                                         :class="post.setting && post.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                         :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                </template>
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
                                                <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like, { current_index: index, placement: 'home', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="cl_ripple">
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
                            <div v-else-if="post.type === 'banner'" :class="post.data.type === 'code' && !post.data.new_html_banner ? '' : 'banner-con'">
                                <a rel="nofollow noopener" aria-label="banner" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank">
                                    <div>
                                        <img :src="post.data.image" alt="khmer24 banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                    </div>
                                </a>
                                <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                            </div>
                            <div v-else-if="post.type === 'highlight_ads'" class="screen-mobile highlight-ads">
                                <div class="con-follow-ads m-0">
                                    <div class="con-f-a-title">
                                        <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                    </div>
                                    <div class="flex_following_ads">
                                        <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                            <div class="s-hori-scroll">
                                                <NuxtLink class="position_relative d_block" :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })"
                                                        @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: inx,
                                                        paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })">
                                                    <!-- status show discount -->
                                                    <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                        <p class="new_st_dis_price">
                                                            {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                        </p>
                                                        <p class="new_st_dis_text">OFF</p>
                                                    </div>

                                                    <div class="height_media position_relative"> <!-- @click="show_detail(p.data.title, p.data.id)" -->
                                                        <!-- options -->
                                                        <div @click.prevent="show_options(p, { post_id: p.data.id, placement: 'home', display_type: 'grid', item_count: homePosts.length, item_per_page: homeOffset, current_index: inx,
                                                            paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                            <i class="icon-ellipsis-vertical"></i>
                                                        </div>
                                                        <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight'}, { from: 'highlight_ads', data: post.data })"></div>

                                                        <!-- shipping count photos -->
                                                        <div class="c-p-list-post">
                                                            <div v-if="p.data.shipping" class="free_shipping_list_post">
                                                                <i class="fas fa-truck"></i>
                                                                <p>{{ p.data.shipping.title }}</p>
                                                            </div>
                                                            <div v-if="p.data.photos && p.data.photos.length > 1">
                                                                <div class="c-p-con">
                                                                    <i class="far fa-image"></i>
                                                                    <p>{{ p.data.photos.length }}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- image post -->
                                                        <template v-if="p.data.thumbnail">
                                                            <img :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                 :alt="p.data.title ? p.data.title : ''"
                                                                 class="lazy height_media img_post_listing"
                                                                 :class="p.setting && p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                 :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                        </template>
                                                        <!-- show title if image empty -->
                                                        <div v-else class="empty_image_parent height_media">
                                                            <div class="text-center empty_image_child">
                                                                <p class="m-0 font_18 empty_image_text">
                                                                    {{ p.data.title ? p.data.title : '' }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="grid-list-des">
                                                        <p class="truncate gr-p-title" v-text="p.data.title ? p.data.title : '...'"></p> <!-- @click="show_detail(p.data.title, p.data.id)" -->

                                                        <div class="post_spec post_more_spec">
                                                            <div v-if="p.data.condition"> {{ p.data.condition ? p.data.condition.title : '' }} </div>
                                                            <template v-if="p.data.object_highlight_specs">
                                                                <template  v-for="(v, k) of p.data.object_highlight_specs" :key="k">
                                                                    <div> {{ v.display_value }} </div>
                                                                </template>
                                                            </template>
                                                        </div>

                                                        <p class="truncate gr-p-date-loc"> <!-- @click="show_detail(p.data.title, p.data.id)" -->
                                                            {{ p.data.renew_date ? convertFromNow(p.data.renew_date) : convertFromNow(p.data.posted_date) }}
                                                            &#8226;
                                                            {{ p.data.location ? (locale === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
                                                        </p>

                                                        <p class="gr-p-price truncate">
                                                            <strong>
                                                                {{ parseInt(p.data.price) > 0 ? '$'+convert_price(p.data.price) : $t('new_text.negotiable') }}{{ p.data.price > 0 && p.data.category && p.data.category.parent == 2 ? '+' : '' }}
                                                            </strong>
                                                            <span v-if="p.data.discount" class="line_price"> {{ '$'+convert_price(p.data.discount.original_price) }} </span>
                                                        </p>
                                                    </div>

                                                    <template v-if="user_data && p.data.user && p.data.user.id === user_data.user.id"></template>
                                                    <div v-else class="list_pad_icon_heart">
                                                        <div class="cl_ripple" v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like,
                                                            { current_index: inx, placement: 'home', display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })">
                                                            <i v-if="p.data.is_like" class="fas fa-heart parent_color ver_icon"></i>
                                                            <i v-else class="far fa-heart color_like ver_icon"></i>
                                                        </div>
                                                    </div>
                                                </NuxtLink>
                                            </div>
                                            <ClientOnly>
                                                <div v-observe-visibility="{
                                                    callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                                        id: p.data.id,
                                                        index: index,
                                                        type: 'grid',
                                                        paid: p.data.type !== 'normal' ? true : false,
                                                        placement: 'highlight',
                                                    }),
                                                    once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                    // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                                }"></div>
                                            </ClientOnly>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <template v-if="isMobile">
                <ClientOnly>
                    <VueEternalLoading :load="load" :key="refresh_loader" margin="800px">
                        <template #loading>
                            <template v-if="homePosts.length === 0">
                                <div class="flex_wrap">
                                    <div v-for="inx in 24" :key="inx" class="width_list_grid">
                                        <div class="list_items_post">
                                            <div class="my_card border_animation_bg">
                                                <!-- info user -->
                                                <div class="style_flex padding_content">
                                                    <div class="col-3 p-0">
                                                        <div class="animated-background l_i_p_width"></div>
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
                            </template>
                            <!-- loading background when data have -->
                            <div v-if="homePosts.length > 0" class="width_100 text-center mt-4" ref="targets">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                        </template>
                        <template #error="{ retry }">
                            <!-- error connection -->
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="homePosts.length > 0 ? '' : 'margin_below_app_bar'">
                                <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
                                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                        <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #no-more>
                            <!-- <div class="no_more_result"></div> -->
                            <div class="no_more_result" style="margin: 20px;">{{ $t('message.no_more_result') }}</div>
                        </template>
                        <template #no-results>
                            <div class="no_more_result " :class="isMobile ? 'n-m-r-mg' : 'py-5 bg-white'">
                                <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                                <p class="no_more_result mt-2">You don't have any list posts right now</p>
                            </div>
                        </template>
                    </VueEternalLoading>
                </ClientOnly>
                <br><br><br><br><br>
            </template>
            <template v-else>
                <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                    <div v-if="homePosts.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else class="flex_all_post full_width">
                        <div v-for="index in 24" :key="index" class="desk_list_grid">
                            <div class="list_items_post">
                                <div class="my_card border_animation_bg">
                                    <!-- info user -->
                                    <div class="style_flex padding_content">
                                        <div class="col-3 p-0">
                                            <div class="animated-background l_i_p_width"></div>
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
                </div>
                <div v-else class="text-center">
                    <div v-if="isMobile" class="des_btn_load_more">
                        <button v-if="hide_btn_load_more" @click="load_more_manual" class="btn">{{ $t('text_desktop.load_more') }}</button>
                        <div v-else-if="posts.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                            <i class="fa fa-exclamation-circle u_no_result_font"></i>
                            <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                        </div>
                    </div>
                    <template v-else >
                        <template  v-if="!isMobile">
                            <template v-if="homePosts.length === 0">
                                <div class="no_more_result py-5 bg-white mt-2">
                                    <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                                    <p class="no_more_result mt-2">You don't have any list posts right now</p>
                                </div>
                            </template>
                            <div v-if="homePosts.length > 0" class="w_80 mt-3 m-auto mb-5">
                                <nuxt-link :to="localePath({ name: 'all-ads' })" @click="clearLoop()" class="btn btn-k24-primary dt-btn-height">
                                    {{ locale==='km' ? 'មើលទាំងអស់' : 'View All' }}
                                </nuxt-link>
                            </div>
                        </template>
                    </template>
                    <div v-if="isMobile === false && all_location.length > 0" class="text-start">
                        <div class="bg-white p-3 padding mt-4 border rounded">
                            <p class="mb-2 f-location-title">{{ locale==='km' ? 'ស្វែងរកតាមទីតាំង' : 'Browse by Location'  }}</p>
                            <div class="list-locations pt-2 pb-2">
                                <ul v-for="loc in all_location" :key="loc" class="list-unstyled m-0 item" >
                                    <li>
                                        <nuxt-link :to="localePath({ name: 'all-ads', query: { province: loc.slug } })" class="nav-link a-color">{{ locale==='km' ? loc.km_name : loc.en_name }}</nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- desktop locations -->
            <section v-if="isDesktop && all_loc.length > 0" class="dt-list-location pt-4">
                <div class="dt-l-loc des_container dt_border dt_raduis p-0">
                    <h4 class="dt-l-loc-title">{{ $t('text_desktop.brow_by_loc') }}</h4>
                    <div class="dt-l-loc-con">
                        <ul>
                            <li v-for="(l, index) in all_loc" :key="index" :class="index < 6 ? 'dt-l-loc-big' : ''">
                                <NuxtLink :to="localePath({ name: 'search', query: { province: l.slug } })"
                                          :title="language === 'km' ? l.km_name : l.en_name" class="truncate">
                                    {{ language === 'km' ? l.km_name : l.en_name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>

        <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="show_modal_actions_post" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static '" role="document">
                <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 's_content p-3 overflow_class bg-modal' : ''">
                        <!-- content -->
                        <div class="modal-body de-content-modal-option">
                            <ul class="list-unstyled mobile_modal_actions_container ">
                                <li v-if="detail_one_post.data && detail_one_post.data.user">
                                    <NuxtLink @click="close_modal" :to="localePath({ name: 'username', params: { username: detail_one_post.data.user.username } })" class="mobile_modal_action cur_sur">
                                        <i class="far fa-user"></i>
                                        <p class="mb-0">{{ $t('message.view_profile') }}</p>
                                    </NuxtLink>
                                </li>

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

        <!-- Modal report post -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" @click="close_report" id="show_modal_list_report_post" tabindex="-1" role="dialog">
            <div class="modal-dialog"  :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 's_content' : 'dt_modal_width p-3'">
                        <div class="text-center border_bottom m-r-p-pad">
                            <p class="modal-title font_15"> {{ $t('message.report_this_post') }} </p>
                        </div>
                        <div class="modal-body p-0 overflow_content">
                            <ClientOnly>
                                <ul class="list-unstyled bg-white">
                                    <li @click="choose_report(re.value)" v-for="re in home_report_post.data" :key="re" class="full_field_tag cur_sur">
                                        {{ locale === 'km' ? re.km : re.en }}
                                        <i v-if="re.value === report_check" class="fas fa-check color_sub_icon mt-1 float-right c_orange"></i>
                                    </li>
                                </ul>
                            </ClientOnly>
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
                                <p class="font_16 modal-title p-2 fns-17 btn-k24-secondary text-white rounded cur_sur"> {{ $t('message.submit') }} </p>
                            </div>
                            <div v-else @click="show_required_report" class="col-8 p-0">
                                <p class="font_16 modal-title p-2 text-white fns-17 btn-k24-secondary rounded cur_sur"> {{ $t('message.submit') }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal report post -->

        <!-- show success message -->
        <div class="toast style_toast d-none toast_home toast_z_index"> <!-- role="alert" aria-live="polite" aria-atomic="true" data-delay="6000" -->
            <div class="toast-header header_padding_toast">
                <strong class="mr-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ml-2"> {{ message_success ? message_success : $t('lng.report_success') }} </p>
                </strong>
                <!--<small>11 mins ago</small>-->
                <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!--<div class="toast-body style_flex">
                <i class="fas fa-check-circle text-success font_13"></i>
                <p class="m-0 ml-2">  Hello, world! This is a toast message. </p>
            </div>-->
        </div>
        <!-- /show success message -->

        <!-- alert show option share media -->
        <div class="modal fade t-0 b-0" id="modal_show_option_share" tabindex="-1" role="dialog">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? 'max_width_form s_content p-3 bg-modal' : 'rounded'">
                    <div class="option_selected">
                        <div class="text-center border_bottom m-r-p-sm-pad">
                            <p class="modal-title font_19">{{ $t('new_text.share') }}</p>
                        </div>
                        <ul class="list-unstyled mobile_modal_actions_container mb-0">
                            <li @click="facebook_sharing" class="mobile_modal_action py-2 cur_sur">
                                <div class="cur_sur color_reason _flex_">
                                    <div class="col _flex_ p-0 mt-1">
                                        <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                                        <p class="img_share_option_color">Facebook</p>
                                    </div>
                                </div>
                            </li>
                            <li @click="twitter_sharing" class="mobile_modal_action py-2 cur_sur">
                                <div class="cur_sur color_reason">
                                    <div class="col _flex_ p-0 mt-1">
                                        <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                                        <p class="img_share_option_color">Twitter</p>
                                    </div>
                                </div>
                            </li>
                            <li @click="copy_link(share_link)" class="mobile_modal_action py-2 cur_sur">
                                <div class="cur_sur color_reason">
                                    <div class="col _flex_ p-0 mt-1">
                                        <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                                        <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                                        <div class="h-c-parent">
                                            <input id="copy_link" v-on:focus="$event.target.select()" ref="clickLink" readonly :value="share_link" class="hide_copy_text"/>
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

        <button class="d-none" @click="clear_post_data" id="clear_catch_post" aria-label="Clear ads"></button>
    </div>
</template>


<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const runtime_config = useRuntimeConfig();
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const isDesktop = helper.check_is_desktop(); // check userAgent

    const homeOffset = useState('homeOffset', () => 0);
    const homePosts = useState('homePosts', () => []);
    const homePosts_id = useState('homePosts_id', () => []);

    const user_data = ref('');

    const cookie_view = useCookie('grid_homepage'); // useCookie from nuxt3 document.
    const display_list = ref(cookie_view._rawValue ? cookie_view._rawValue : {"type":"grid"});

    const language = ref(helper.get_lang_cookie());
    const all_loc = ref([]);

    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");
    const empty_img_loading = ref('/icon/img-loader.gif');

    const dt_loading = ref(false);
    const loading_field = ref(false);
    const detail_one_post = ref('');    // specific post that click icon option in list.
    const data_tracking = ref('');      // store data tracking in specific index in list, grid, gallery, following or highlight.
    const ads_come_from = ref('');      // store click from my_following, highlight or posts.
    const my_following_ads = useState('my_following_ads', () => [])   // ads has been follow by profile.

    const check_screen_device = ref(false); // check screen pc or phone, true = phone screen,  false = pc
    const post_id = ref('');                // store id of one post.
    const share_link = ref('');
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const again = ref('');
    const hide_btn_load_more = ref(true);

    // --- desktop screen only ---
    const dt_top_ads = useState('dt_top_ads', () => []);
    const dt_featured_ads = useState('dt_featured_ads', () => []);

    // --- share tracking ---
    const current_index = ref('');
    const placement = ref('');
    const display_type = ref('');

    // --- arr impression check id ---
    const arr_impression = ref([]);
    const timer_auto_impression = ref('');
    const check_sent = ref('true'); // true = allow setInterval, false = not allow setInterval.

    // --- report ---
    const home_report_post = useState('home_report_post', () =>[]);
    const report_check = ref('');
    const description = ref('');

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);
    const reload_q_again_4 = ref(0);
    const reload_q_again_5 = ref(0);
    const reload_q_again_6 = ref(0);
    const reload_q_again_7 = ref(0);

    // --- check loading is visible in screen ---
    import { useElementVisibility } from '@vueuse/core'
    const targets = ref(null)

    const refresh_loader = ref(1);
    const isMobile= ref(helper.m_or_d())
    const recaptcha = useRecaptcha();
    const check_post = useState('check_post',()=>0)
    const check_post_limit = useState('check_post_limit',()=>[])
    const store_r = useState('store_r',()=>'')
    const check_show = useState('check_show', ()=> 0)
    const check_limit = useState('check_limit', ()=> [])

    // head JSON-LD
    const server_ads = useState('server_ads', () => []);
    const google_json_SEO = useState('google_json_SEO', () => '');
    useJsonld(() => (
        google_json_SEO.value
    ));
    const r_name = ref(helper.clear_prefix_route_name(route.name));
    const all_location = useState('all_location',()=>'')
    // --- Start request in to server ---
    // await get_all_location();
    if (process.server) {
        await homeGetPosts();
        await My_follows();
        await top_and_feature_ads();
        await SEO_google_schema(); // create schema google SEO only serverSide
        await feature_ads();

    }
    // --- On Mounted ---
    onMounted( () => {
        if (process.client) {
            
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            My_follows(); // get follows data.
            change_grid();
            // -- (1) this condition work when user like post but not login, so login success must to clear old data --
            let pa_con = helper.get_params_make_condition(); // get data params condition.
            if ((pa_con && pa_con.status_success && pa_con.status_success.d_params && pa_con.status_success.d_params.status_success)) {
                setTimeout(() => {
                    helper.clear_params_make_con('status_success'); // remove data params condition.
                },1500);

                homeOffset.value = 0;
                homePosts.value = [];
                homePosts_id.value = [];
                refresh_loader.value += 1; // reload scroll again.
            }


            // -- (2) desktop view manually request -- ( must to below (1) )
            // if (isDesktop && homePosts.value.length === 0) {
            //     load_more_manual(); // In Desktop View and post empty for the first, must to get new data.
            // }

            // -- get data from localstorage --
            check_new_auth_user();
            home_report_post.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];

            if (!isMobile.value) {
                // -- get Top and Feature Ads --
                top_and_feature_ads();
                feature_ads();
                // -- get locations only in desktop view --
                let loc = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];
                all_location.value = loc && loc.data ? loc.data : [];
                // console.log(all_location.value)
                if (all_location.value.length === 0) {
                    get_all_locations(); // get all locations.
                }
            }
            if(!isMobile.value && homePosts.value.length === 0){
                load_more_manual();
            }

            reload_lazy_img(); // load lazy image.
        }
    })

    watch(() => route.name, () => {
        r_name.value = helper.clear_prefix_route_name(route.name);
    })

    function clearLoop(){
        check_post.value = 0
        check_post_limit.value = []
        store_r.value = ''
    }

    // ---- create SEO google schema ----
    async function SEO_google_schema() {
        let Main_arr = []; let arr_product = []; let arr_jobs = [];
        let f_url = language.value === 'km' ? config.VUE_APP_BASE_URL+'km/' : config.VUE_APP_BASE_URL+'en/'; // current full link of project.
        let empty_img = config.VUE_LINK+empty_img_post.value;
        // -- Items list --
        if (server_ads.value && server_ads.value.data && server_ads.value.data.length > 0) {
            let productData = { "@context": "https://schema.org/" };
            productData["@type"] = "ItemList";
            productData["url"] = f_url; // url of the current page
            productData["numberOfItems"] = server_ads.value.current_result; // total
            productData["itemListElement"] = [];
            for (let i = 0; i < server_ads.value.data.length; i++) {
                let seo_sch = server_ads.value.data[i];
                if (seo_sch && seo_sch.type === 'post') { // only type is "post"
                    let d = seo_sch.data;
                    // get address of post ads
                    let addr = helper.Create_location(d.location, language.value, '');

                    // get seller of post ads
                    var s_type = d.store ? 'Store' : 'Organization';
                    var s_link_url = d.store && d.store.username ? f_url+d.store.username : (d.user && d.user.username ? f_url+d.user.username : '');
                    var s_name = d.store && d.store.title ? d.store.title : (d.user && d.user.name ? d.user.name : 'Unknown');
                    var s_image = d.store && d.store.logo && d.store.logo.medium ? d.store.logo.medium.url : (d.user && d.user.photo && d.user.photo.medium ? d.user.photo.medium.url : empty_img);
                    var s_phone_num = ''; // +85512345678
                    var s_email = ''; // dara@gmail.com
                    let seller = helper.GL_SEO_seller(s_type, s_link_url, s_name, s_image, s_phone_num, s_email, addr);

                    // get post ads
                    var ad_title = d.title ? d.title : 'Unknown';
                    var ad_url = ad_title !== 'Unknown' ? f_url+check_title_char(ad_title)+'-adid-'+d.id : '';
                    var ad_price = d.price ? d.price : '';
                    var ad_description = ''; // hExecutive Anvil Description
                    var ad_condition = d.condition ? d.condition.value : '';
                    var ad_image = d.photos ? d.photos : s_image;
                    var ad_category = d.category ? (language.value === 'km' ? d.category.km_name : d.category.en_name) : '';
                    var ad_brand = ''; // Toyota
                    var ad_model = ''; // Camry 1
                    var ad_color = ''; // Red
                    var ad_renew_date = d.renew_date ? d.renew_date : '';
                    // -> job ads <-
                    if (seo_sch.setting && seo_sch.setting.enable_apply_job) {
                        let job_logo = d.photos && d.photos[0] ? d.photos[0] : s_image;
                        let job_condition = d.condition ? d.condition.value : '';
                        let job_description = ad_title;
                        let re_job_exp = d.object_highlight_specs ? helper.get_spec_value(d.object_highlight_specs, 'experience') : ''; // get spec (experience).
                        let job_ads = helper.GL_SEO_job(d.id, ad_url, ad_title, ad_renew_date, ad_category, job_condition,
                            s_name, s_link_url, job_logo, ad_price, job_description, addr, re_job_exp);
                        // console.log(job_ads); console.log(seo_sch);
                        arr_jobs.push(job_ads);

                    // -> post ads <-
                    } else {
                        let product = helper.GL_SEO_product(ad_url, d.id, ad_title, ad_price, ad_description, ad_condition,
                            ad_image, ad_category, ad_brand, ad_model, ad_color, seller, '');

                        product['position'] = i;
                        arr_product.push(product);
                    }
                }
            }
            // ItemList
            productData["itemListElement"] = arr_product;
            Main_arr.push(productData);

            // Jobs
            if (arr_jobs.length > 0) {
                for (let j = 0; j < arr_jobs.length; j++) {
                    Main_arr.push(arr_jobs[j]);
                }
            }

            // console.log(productData);
            // console.log(server_ads.value)
            // console.log(JSON.stringify(productData))
        }

        // -- Breadcrumb --
        let nav = [
            { 'name': 'Home', 'link': config.VUE_LINK },
            // { 'name': 'Car For Sale', 'link': 'https://example.com/car-for-sale' }
        ];
        let breadcrumbData = helper.GL_SEO_breadcrumb(nav);
        breadcrumbData['@context'] = "https://schema.org/";
        Main_arr.push(breadcrumbData);
        // console.log(breadcrumbData)
        // console.log(JSON.stringify(breadcrumbData))

        google_json_SEO.value = Main_arr;
        // if(process.client) console.log(JSON.stringify(google_json_SEO.value));
        // console.log(Main_arr);
        // console.log();
    }

    // async function get_all_location() { 
    //   await  $fetch(config.VUE_APP_API_URL+'locations?lang=en')
    //     .then(res=>{
    //         all_location.value = res
    //     })
    // }

    // ---- Get Top_Ads && Feature_Ads ----
    async function top_and_feature_ads() {
        if (dt_top_ads.value.length === 0) {
            await start_request('top'); // top ads
        }
        // if (dt_featured_ads.value.length === 0) {
        //     console.log('2')
        //     await start_request('featured'); // featured ads
        // }
    }

    async function feature_ads() {
        if (dt_featured_ads.value.length === 0) {
            await start_request('featured'); // featured ads
        }
    }
    async function start_request(top_or_feature) {
        try {
            const reqUrl = config.VUE_APP_URL_POST_NEW + 'feed';
            const { data: res } = await useFetch(reqUrl, {
                // key: reqUrl,
                params: {
                    limit: 10,
                    fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                    functions: 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]',
                    paid: top_or_feature,
                    random: true
                },
            })
            if (top_or_feature === 'top') {
                // console.log('------- Top Ads -------');
                dt_top_ads.value = res.value && res.value.data ? res.value.data : [];
                // console.log(dt_top_ads.value);
            } else {
                // console.log('------- Feature Ads -------');
                dt_featured_ads.value = res.value && res.value.data ? res.value.data : [];
                // console.log(dt_featured_ads.value);
            }

        } catch (er) {
            console.log('-----> Error Home_ads_list <-----')
            console.log(er)

            if (process.client && er.response && er.response.status === 401) { // retry
                if (reload_q_again_7.value <= 2) {
                    reload_q_again_7.value += 1;
                    again.value = ''; // set "again" to empty to request again when in status 401 (un authorization)
                    setTimeout(() => { start_request(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
        }
    }
    // ---- Get Locations ----
    function get_all_locations() {
        const now = new Date();
        $fetch(config.VUE_APP_API_URL + 'locations', {
            params: { lang: language.value === 'km' ? 'km' : 'en' },
        }).then(res => { // console.log(res);
            // all_loc.value = res && res.data ? res.data : [];
            all_location.value = res && res.data ? res.data : [];
            const object = {
                data: all_location.value,
                expiry: helper.Date_To_Timestamp('', 3600, 'seconds'), // add 1 hour
            }
            localStorage.setItem("locations", JSON.stringify(object));
        }).catch(e => { console.log(e); });
    }

    function close_modal(){
        $("#show_modal_actions_post").modal('hide')
    }
    // ---- show ads that has been follow ----
    async function My_follows() {
        // check_new_auth_user();
        // const token_auth = useCookie('auth_user')
        // const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
        // if have tokens
        if (user_data.value && user_data.value.tokens && user_data.value.tokens.access_token) {
            if (my_following_ads.value.length === 0 && !again.value) {
                again.value = 'stop'; // stop request, prevent click back on state browser.

                try {
                    const { data: res_follows } = await useFetch(config.VUE_APP_URL_POST_NEW + 'feed', {
                        headers: { "Access-Token": user_data.value.tokens.access_token }, // if user login add access token
                        params: {
                            limit: 10,
                            fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                            functions: 'save,chat,like,apply_job,shipping',
                            followed: true,
                        },
                    })

                    my_following_ads.value = res_follows.value && res_follows.value.data ? res_follows.value.data : [];

                } catch (er) {
                    if (!er.response) {
                        if (reload_q_again_6.value < 2) {
                            reload_q_again_6.value += 1;
                            setTimeout(() => { My_follows(); }, 3000);
                            // console.log('request again when time out');
                        } else {
                            // console.log('alert message tell user');
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    } else if (er.response && er.response.status === 401) { // retry
                        if (reload_q_again_6.value <= 2) {
                            reload_q_again_6.value += 1;
                            again.value = ''; // set "again" to empty to request again when in status 401 (un authorization)
                            check_new_auth_user();
                            setTimeout(() => { My_follows(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            }

        // clear this data when not login yet
        } else {
            my_following_ads.value = [];
            again.value = '';
        }
    }

    // ---- click view profile ----
    function view_profile() {
        // let the_id = 'pro_'+detail_one_post.value.data.id+'_user_'+detail_one_post.value.data.user.id; // prevent duplicate id in SEO
        // document.getElementById(the_id).click();
        // router.push(localePath({ name: detail_one_post.value.data.user.username }));
        router.push(localePath({ name: detail_one_post.value.data.user.username }));
        console.log(detail_one_post.value.data.user.username)
    }
    // ---- click share post ----
    function share_manual_post() {
        $('#show_modal_actions_post').modal('hide');
        let the_id = 'share_'+detail_one_post.value.data.id;
        document.getElementById(the_id).click();
    }
    // ---- /save or unsaved manual post ----
    // ---- tracking action on post ----
    function track_action_on_post(action, id, item_count, item_per_page, current_index, placement, display_type, option_more) {
        helper.tracking_action('post', { id: id, item_count: item_count, item_per_page: item_per_page, current_index: current_index,
            paid: option_more.paid, placement: option_more.placement }, action, placement, display_type, '');
    }

    // ---- clear cache posts ----
    function clear_post_data() {
        const route_name = helper.clear_prefix_route_name(route.name);
        let timeout = '';
        if (route_name === 'index') {   // if click button home on bottom NavBar.
            timeout = 200;
        } else {                        // if click on Main Category.
            timeout = 1000;
        }
        

        
       if(isMobile.value){
            setTimeout(function () {
                homeOffset.value = 0;
                homePosts.value = [];
                homePosts_id.value = [];

                refresh_loader.value += 1; // reload scroll again.

                if (isDesktop) { // "home_page" prevent user click main_category and still in home_page, so reload post data again "Desktop View".
                    const r_n = helper.clear_prefix_route_name(useRoute().name); // "useRoute().name" get route name this current page.
                    if (r_n === 'index') {
                        load_more_manual();
                    }
                }
            },timeout);
       }else{
            // homeOffset.value = 0;
            // homePosts.value = [];
            // homePosts_id.value = [];
            // load_more_manual();
       }
       
    }
    // ---- report manual post ----
    function report_manual_post() {
        if (window.navigator.onLine) {
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
                    home_report_post.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
                    $('#show_modal_list_report_post').modal('show');

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_5.value < 2) {
                            reload_q_again_5.value += 1;
                            setTimeout( () => { report_manual_post(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({ name: 'index' }));
                        }
                        loading_field.value = false;
                        $('#modal_show_status_error_connection').modal('show');

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_5.value <= 2) {
                            reload_q_again_5.value += 1;
                            setTimeout( () => { report_manual_post(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({ name: 'index' }));
                        }
                    }
                }).finally(() => (loading_field.value = false));
            } else {
                home_report_post.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
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

            loading_field.value = true;
            if (detail_one_post.value.data.id) {
                const token = await recaptcha('report_post');
                let form_data = {
                    id: detail_one_post.value.data.id, 
                    reason: report_check.value, 
                    description: description.value
                }
                if(token !== undefined){
                    form_data['g-recaptcha-response'] = token
                }
                $fetch(config.VUE_APP_API_URL + 'feedbacks/posts',{
                    method: 'POST',
                    body: new URLSearchParams(form_data)
                }).then(res => {
                    // -- hide modal report post --
                    $('#show_modal_list_report_post').modal('hide');
                    // -- clear old report data --
                    description.value = '';
                    report_check.value = '';
                    // -- show toast success --
                    toast_show(res.message, true);
                    // $('.grecaptcha-badge').css({'visibility':'hidden'});

                }).catch(error => {
                    if (!error.response) {
                        if (reload_q_again_5.value < 2) {
                            reload_q_again_5.value += 1;
                            setTimeout( () => { report_submit(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({ name: 'index' }));
                        }
                        loading_field.value = false;
                        $('#modal_show_status_error_connection').modal('show');

                    } else {
                        let check = error.response; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check.status === 422) {
                            $('#description').addClass('error_field_text_report');
                            $('#error_description').removeClass('d-none');
                            $('#error_description').text(data_parse._data.message);

                            toast_show(data_parse._data.message, false);

                        } else if (check.status === 401) { // retry
                            if (reload_q_again_5.value <= 2) {
                                reload_q_again_5.value += 1;
                                setTimeout( () => { report_submit(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }));
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
        // $('.grecaptcha-badge').css({'visibility':'hidden'});
        $('#show_modal_list_report_post').modal('hide');
     }
     function close_report() { 
        // $('.grecaptcha-badge').css({'visibility':'hidden'});
     }
    // required report
    function show_required_report() {
        if (report_check.value === 'other' && !description.value) {
            $('#description').addClass('error_field_text_report');
            $('#error_description').removeClass('d-none');
        } else {
            toast_show(language.value === 'en' ? 'Please select reason' : 'សូមជ្រើសរើសហេតុផល', false);
        }
    }
    // ---- /report manual post ----

    // ---- reload lazy load ----
    function reload_lazy_img() {
        setTimeout(() => {
            $('img.lazy').Lazy({delay:5000, combined:true});
        },750);
    }

    // ---- save or unsaved manual post ----
    function save_manual_post(save_or_unsaved, confirm_unsaved) {
        check_new_auth_user();

        if (window.navigator.onLine) {
            if (user_data.value && user_data.value.tokens.access_token) { // if have auth user
                if (save_or_unsaved === 'save') {
                    loading_field.value = true;
                    $fetch(config.VUE_APP_API_URL + 'me/saved',{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        body: new URLSearchParams({ id: detail_one_post.value.data.id }),
                        headers: { "Access-Token": user_data.value.tokens.access_token },
                        params: { lang: language.value === 'km' ? 'km' : 'en' },
                    }).then(res => {
                        // if from "my_following" ads
                        if (ads_come_from.value === 'my_following') {
                            for (let i = 0; i < my_following_ads.value.length; i ++) {
                                if (my_following_ads.value[i].data.id === detail_one_post.value.data.id) {
                                    my_following_ads.value[i].data.is_saved = true;
                                    break;
                                }
                            }
                        // if from "highlight_ads"
                        } else if (ads_come_from.value === 'highlight_ads') {
                            for (let i = 0; i < homePosts.value.length; i++) {
                                if (homePosts.value[i].type === 'highlight_ads') {
                                    for (let j = 0; j < homePosts.value[i].data.length; j++) {
                                        if (homePosts.value[i].data[j].data.id === detail_one_post.value.data.id) {
                                            homePosts.value[i].data[j].data.is_saved = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        // if click from top ads
                        } else if (ads_come_from.value === 'my_top_ads') {
                            for (let i = 0; i < dt_top_ads.value.length; i ++) {
                                if (dt_top_ads.value[i].data.id === detail_one_post.value.data.id) {
                                    dt_top_ads.value[i].data.is_saved = true;
                                    break;
                                }
                            }
                        // if click from top ads
                        } else if (ads_come_from.value === 'my_featured_ads') {
                            for (let i = 0; i < dt_featured_ads.value.length; i ++) {
                                if (dt_featured_ads.value[i].data.id === detail_one_post.value.data.id) {
                                    dt_featured_ads.value[i].data.is_saved = true;
                                    break;
                                }
                            }
                        // simple list ads
                        } else {
                            for (let i = 0; i < homePosts.value.length; i ++) {
                                if (homePosts.value[i].data.id === detail_one_post.value.data.id) {
                                    homePosts.value[i].data.is_saved = true;
                                    break;
                                }
                            }
                        }
                        tracking_manual('save'); // tracking save.
                        $('#show_modal_actions_post').modal('hide'); 

                    }).catch(error => {
                       
                        if (!error.response) {
                            if (reload_q_again_4.value < 2) {
                                reload_q_again_4.value += 1;
                                setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }));
                            }
                            loading_field.value = false;
                            $('#modal_show_status_error_connection').modal('show');

                        } else if (error.response && error.response.status === 401) { // retry
                            if (reload_q_again_4.value <= 2) {
                                reload_q_again_4.value += 1;
                                setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({ name: 'index' }));
                            }
                        }
                        $('#show_modal_actions_post').modal('hide'); 
                    }).finally(() => (loading_field.value = false));

                } else {
                    if (confirm_unsaved) {
                        loading_field.value = false;
                        $('#modal_confirm_unsaved').modal('show');
                    } else {
                        loading_field.value = true;
                        $fetch(config.VUE_APP_API_URL + 'me/saved',{
                            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                            method: 'DELETE',
                            params: { id: detail_one_post.value.data.id },
                            headers: { "Access-Token": user_data.value.tokens.access_token },
                        }).then(res => {
                            // if from "my_following" ads
                            if (ads_come_from.value === 'my_following') {
                                for (let i = 0; i < my_following_ads.value.length; i ++) {
                                    if (my_following_ads.value[i].data.id === detail_one_post.value.data.id) {
                                        my_following_ads.value[i].data.is_saved = false;
                                        break;
                                    }
                                }
                            // if from "highlight_ads"
                            } else if (ads_come_from.value === 'highlight_ads') {
                                for (let i = 0; i < homePosts.value.length; i++) {
                                    if (homePosts.value[i].type === 'highlight_ads') {
                                        for (let j = 0; j < homePosts.value[i].data.length; j++) {
                                            if (homePosts.value[i].data[j].data.id === detail_one_post.value.data.id) {
                                                homePosts.value[i].data[j].data.is_saved = false;
                                                break;
                                            }
                                        }
                                    }
                                }
                            // if click from top ads
                            } else if (ads_come_from.value === 'my_top_ads') {
                                for (let i = 0; i < dt_top_ads.value.length; i ++) {
                                    if (dt_top_ads.value[i].data.id === detail_one_post.value.data.id) {
                                        dt_top_ads.value[i].data.is_saved = false;
                                        break;
                                    }
                                }
                            // if click from top ads
                            } else if (ads_come_from.value === 'my_featured_ads') {
                                for (let i = 0; i < dt_featured_ads.value.length; i ++) {
                                    if (dt_featured_ads.value[i].data.id === detail_one_post.value.data.id) {
                                        dt_featured_ads.value[i].data.is_saved = false;
                                        break;
                                    }
                                }
                            // simple list ads
                            } else {
                                for (let i = 0; i < homePosts.value.length; i ++) {
                                    if (homePosts.value[i].data.id === detail_one_post.value.data.id) {
                                        homePosts.value[i].data.is_saved = false;
                                        break;
                                    }
                                }
                            }

                            setTimeout(() => { $('#modal_confirm_unsaved').modal('hide'); $('#show_modal_actions_post').modal('hide'); },100);

                            tracking_manual('unsave'); // tracking unsave.

                        }).catch(error => {
                            if (!error.response) {
                                if (reload_q_again_4.value < 2) {
                                    reload_q_again_4.value += 1;
                                    setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }
                                loading_field.value = false;
                                $('#modal_show_status_error_connection').modal('show');

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_4.value <= 2) {
                                    reload_q_again_4.value += 1;
                                    setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }
                            }
                        }).finally(() => (loading_field.value = false));
                    }
                }

            // --- if dont have auth user go to login ---
            } else {
                
                tracking_manual('save'); // tracking save.

                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'save',
                    expire: expired,
                    data: { post_id: detail_one_post.value.data.id },
                    from: { name: 'home' }
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); // choose login
                $('#show_modal_actions_post').modal('hide'); 
            }

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // tracking event click option on list post
    function tracking_manual(con) {
        let d = data_tracking.value;
        track_action_on_post(con, d.post_id, d.item_count, d.item_per_page, d.current_index, 'home', d.display_type, { paid: d.paid, placement: d.from }); // tracking on share.
    }
    // ---- /save or unsaved manual post ----

    // ---- click like post ----
    function click_like(id, like_or_dislike, data, from) {
        check_new_auth_user();

        if (window.navigator.onLine) {
            if (user_data.value) {
                loading_field.value = true;
                // -- dislike --
                if (like_or_dislike) {
                    $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me',{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'DELETE',
                        params: {id: id},
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                    }).then(res => {  // console.log(res);
                        // action, id, item_count, item_per_page, current_index, placement, display_type
                        track_action_on_post('unlike', id, homePosts.value.length, homeOffset.value, data.current_index, data.placement, data.display_type, { paid: data.paid, placement: data.from });

                        // if click from my_following ads
                        if (from && from.from === 'my_following') {
                            for (let i = 0; i < my_following_ads.value.length; i ++) {
                                if (my_following_ads.value[i].data.id === id) {
                                    my_following_ads.value[i].data.is_like = false;
                                    break;
                                }
                            }
                        // if click from highlight_ads
                        } else if (from && from.from === 'highlight_ads') {
                            for (let i = 0; i < homePosts.value.length; i++) {
                                if (homePosts.value[i].type === 'highlight_ads') {
                                    for (let j = 0; j < homePosts.value[i].data.length; j++) {
                                        if (homePosts.value[i].data[j].data.id === id) {
                                            homePosts.value[i].data[j].data.is_like = false;
                                            break;
                                        }
                                    }
                                }
                            }
                        // if click from top_ads
                        } else if (from && from.from === 'my_top_ads') {
                            for (let i = 0; i < dt_top_ads.value.length; i ++) {
                                if (dt_top_ads.value[i].data.id === id) {
                                    dt_top_ads.value[i].data.is_like = false;
                                    break;
                                }
                            }
                        // if click from featured_ads
                        } else if (from && from.from === 'my_featured_ads') {
                            for (let i = 0; i < dt_featured_ads.value.length; i ++) {
                                if (dt_featured_ads.value[i].data.id === id) {
                                    dt_featured_ads.value[i].data.is_like = false;
                                    break;
                                }
                            }
                        // latest ads
                        } else {
                            for (let i = 0; i < homePosts.value.length; i ++) {
                                if (homePosts.value[i].data.id == id) {
                                    homePosts.value[i].data.is_like = false;
                                    break;
                                }
                            }
                        }

                    }).catch(error => {
                        if (!error.response) {
                            loading_field.value = false
                            $('#modal_show_status_error_connection').modal('show');

                        } else {
                            if (error.response && error.response.status === 404) {
                                $.each(homePosts.value, (key, value) => {
                                    if (parseInt(value.data.id) === parseInt(id)) {
                                        homePosts.value[key].data.is_like = false;
                                        return;
                                    }
                                });

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_2.value <= 2) {
                                    reload_q_again_2.value += 1;
                                    setTimeout( () => { click_like(id, like_or_dislike, data, from); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');   // remove localStorage
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }
                            }
                        }
                    }).finally(() => (loading_field.value = false));

                // -- like --
                } else {
                    $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me',{
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: "POST",
                        body: new URLSearchParams({id: id}),
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                        params: {lang: language.value === 'km' ? 'km' : 'en'},
                    }).then(res => {

                        // action, id, item_count, item_per_page, current_index, placement, display_type
                        track_action_on_post('like', id, homePosts.value.length, homeOffset.value, data.current_index, data.placement, data.display_type, { paid: data.paid, placement: data.from });

                        // if click from my_following ads
                        if (from && from.from === 'my_following') {
                            for (let i = 0; i < my_following_ads.value.length; i ++) {
                                if (my_following_ads.value[i].data.id === id) {
                                    my_following_ads.value[i].data.is_like = true;
                                    break;
                                }
                            }
                        // if click from highlight_ads
                        } else if (from && from.from === 'highlight_ads') {
                            for (let i = 0; i < homePosts.value.length; i++) {
                                if (homePosts.value[i].type === 'highlight_ads') {
                                    for (let j = 0; j < homePosts.value[i].data.length; j++) {
                                        if (homePosts.value[i].data[j].data.id === id) {
                                            homePosts.value[i].data[j].data.is_like = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        // if click from top ads
                        } else if (from && from.from === 'my_top_ads') {
                            for (let i = 0; i < dt_top_ads.value.length; i ++) {
                                if (dt_top_ads.value[i].data.id === id) {
                                    dt_top_ads.value[i].data.is_like = true;
                                    break;
                                }
                            }
                        // if click from featured_ads
                        } else if (from && from.from === 'my_featured_ads') {
                            for (let i = 0; i < dt_featured_ads.value.length; i ++) {
                                if (dt_featured_ads.value[i].data.id === id) {
                                    dt_featured_ads.value[i].data.is_like = true;
                                    break;
                                }
                            }
                        // show simple ads
                        } else {
                            for (let i = 0; i < homePosts.value.length; i ++) {
                                if (homePosts.value[i].data.id === id) {
                                    homePosts.value[i].data.is_like = true;
                                    break;
                                }
                            }
                        }

                    }).catch(error => {
                        if (!error.response) {
                            loading_field.value = false
                            $('#modal_show_status_error_connection').modal('show');

                        } else {
                            if (error.response && error.response.status === 404) {
                                $.each(homePosts.value, (key, value) => {
                                    if (parseInt(value.data.id) === parseInt(id)) {
                                        homePosts.value[key].data.is_like = false;
                                        return;
                                    }
                                });

                            } else if (error.response && error.response.status === 401) { // retry
                                if (reload_q_again_3.value <= 2) {
                                    reload_q_again_3.value += 1;
                                    check_new_auth_user();
                                    setTimeout( () => { click_like(id, like_or_dislike, data, from); }, 3000);
                                } else {
                                    localStorage.removeItem('auth_user');
                                    VueCookieNext.removeCookie('auth_user');
                                    router.replace(localePath({ name: 'index' }));
                                }
                            }
                        }
                    }).finally(() => (loading_field.value = false));
                }

            } else {

                // tracking like if not login yet
                track_action_on_post('like', id, homePosts.value.length, homeOffset.value, data.current_index, data.placement, data.display_type, { paid: data.paid, placement: data.from });

                // create state when login completed
                let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'like',
                    expire: expired,
                    data: { post_id: id },
                    from: { name: 'home' }
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }

        } else {
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- change format date to time ago ----
    // ---- show chat ----
    function show_chat(post_id, data) {
        if (window.navigator.onLine) {

            // tracking on button chat
            track_action_on_post('chat', post_id, homePosts.value.length, homeOffset.value, data.current_index,
                'home', data.display_type, { paid: data.paid, placement: data.from });

            for (let i = 0; i < homePosts.value.length; i++) {
                if (post_id === homePosts.value[i].data.id) {

                    let to_id = homePosts.value[i].data.user && homePosts.value[i].data.user.id ? homePosts.value[i].data.user.id : '';
                    let username = homePosts.value[i].data.user && homePosts.value[i].data.user.username ? homePosts.value[i].data.user.username : '';
                    // -- if user login, go to chat --
                    if (user_data.value) {
                        if (isMobile.value) {
                            router.push(localePath({ name: 'chats-detail-chat', query: {to_id: to_id, username: username} }));
                            
                        } else {
                            router.push(localePath({ name: 'chats', query: {to_id: to_id, username: username} }));
                        }
                        // router.push(localePath({ name: 'chats-detail-chat', query: {to_id: to_id, username: username} }));
                        // save params to work at detail chats
                        let dt_post = {
                            show_topic_post_id: post_id,
                            title: homePosts.value[i].data.title,
                            price: homePosts.value[i].data.price,
                            img: homePosts.value[i].data.thumbnail ? homePosts.value[i].data.thumbnail : ''
                        }
                        save_track_optional('dt_post', dt_post);
                        save_track_optional('clear_old_data', { clear_old_data: 'clear' });


                    // -- else login first when go to form chat --
                    } else {
                        // create State when login completed
                        let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
                        let arr_save_state = {
                            action: 'detail_chat',
                            expire: expired,
                            data: {
                                to_id: to_id,
                                username: username,
                                show_topic_post_id: post_id,
                                title: homePosts.value[i].data.title, // helper.check_special_char(homePosts.value[i].data.title),
                                price: homePosts.value[i].data.price,
                                img: homePosts.value[i].data.thumbnail ? homePosts.value[i].data.thumbnail : ''
                            },
                            from: { name: 'home' }
                        }
                        localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                        router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
                    }

                }
            }
        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    
    async function homeGetPosts() {
        try {
            const reqUrl = config.VUE_APP_URL_POST_NEW+'feed?offset='+homeOffset.value;
            let fun = isMobile.value ? 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]' : 'save,chat,like,apply_job,shipping,'
            const { data: result } = await useFetch(reqUrl, {
                key: reqUrl,
                headers: {
                    "Display-Type": isMobile.value ? 'mobile_view' : 'desktop',
                    "Access-Token": user_data.value && user_data.value.tokens ? user_data.value.tokens.access_token : '',
                },
                params: {
                    fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                    functions: fun
                    // functions: 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]',
                },
            })

            if (result.value) {
                check_show.value += 1
                server_ads.value = result.value;
                await check_clean_list_post(result.value); // clean data when get new list post.
            }
        } catch (er) {
            console.log('-----> Error Home_ads_list <-----')
            console.log(er)
        }
    }

    // Load data by scroll down (Only mobile View)
    async function load({loaded, error, noMore, noResults}, { isFirstLoad }) {
        check_new_auth_user();
        $fetch(config.VUE_APP_URL_POST_NEW + 'feed',{ // $fetch work when scroll-loader, when user click Retry button in error connection.
            headers: {
                "Display-Type": isMobile.value ? 'mobile_view' : 'desktop',
                "Access-Token": user_data.value && user_data.value.tokens ? user_data.value.tokens.access_token : '',
            },
            params: {
                offset: homeOffset.value,
                fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                functions: 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]',
            },
        }).then(res => {
            check_clean_list_post(res); // clean data when get new list post.
            check_show.value += 1
            if(check_show.value > 2){
                check_show.value = 1
            }else if(check_show.value === 2){
                check_limit.value = check_limit.value.concat(homePosts.value.length)
                // console.log(check_limit.value)
            }
            // -- tracking on google analytic --
            if (homePosts.value.length <= 30 && homeOffset.value === 60) { } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(homeOffset.value > 30 ? homeOffset.value - 30 : 0); }

            // -- check stop scroll or scroll more --
            if (res.data.length === 0) {
                if(homePosts.value.length === 0){
                    if (isFirstLoad) {
                        noResults();
                    } else {
                        noMore();
                    }
                }else{
                    noMore();
                }
            } else {
                setTimeout(function () {
                    // -- prevent stuck loading again and again at the bottom of the screen --
                    if (res.offset === 0) { // Check Only First Request
                        const targetIsVisible = useElementVisibility(targets); // check loading icon is still in viewport.
                        if (targetIsVisible.value) {
                            $('html, body').animate({ scrollTop: ($('#height_div').offset().top - 300) }, 1); // 1000 = 1 second
                        }
                    }
                    // -- start load data more --
                    setTimeout(function () { 
                        loaded(); 
                    }, 1000);
                }, 1000);
            }

            reload_lazy_img(); // load lazy image.

        }).catch(er => {
            if (!er.response) {
                error(); // show error back to vue scroll loader.

            } else if (er.response && er.response.status === 401) { // retry
                if (reload_q_again_1.value <= 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { loaded(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
        });
    }

    // Load data by click manual (Only Desktop View)
    function load_more_manual() {
        check_new_auth_user();
        dt_loading.value = true;
        let fun = isMobile.value ? 'save, chat, like, apply_job,shipping,banner,highlight_ads[object_highlight_specs]' : 'save,chat,like,apply_job,shipping,'
        $fetch(config.VUE_APP_URL_POST_NEW + 'feed',{ // $fetch work when scroll-loader, when user click Retry button in error connection.
            headers: {
                "Display-Type": isMobile.value ? 'mobile_view' : 'desktop',
                "Access-Token": user_data.value && user_data.value.tokens ? user_data.value.tokens.access_token : '',
            },
            params: {
                offset: homeOffset.value,
                fields: 'thumbnail,thumbnails,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
                functions: fun,
            },
        }).then(res => {
            check_clean_list_post(res); // clean data when get new list post.

            // -- tracking on google analytic --
            if (homePosts.value.length <= 30 && homeOffset.value === 60) { } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(homeOffset.value > 30 ? homeOffset.value - 30 : 0); }
            dt_loading.value = false;
            hide_btn_load_more.value = res.data.length < 30 ? false : true; // close button loadMore

            reload_lazy_img(); // load lazy image.

        }).catch(er => {
            if (er.response && er.response.status === 401) { // retry
                if (reload_q_again_1.value <= 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { load_more_manual(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
            dt_loading.value = false;
        });
    }

    // --- check banner code and check list post duplicate ---
    async function check_clean_list_post(R) {
      homeOffset.value += R.limit;     // add offset
      let arr_tmp = [];
      let data = R.data;
      if (data.length) {
        Object.entries(data).forEach(([key, value], index) => {
          // console.log(value.type)
          if (value.type === 'post') {
            if (value.data.type === 'normal') {                      // check duplicate post only data type === normal
              if (!homePosts_id.value.includes(value.data.id)) {   // if not exist ( function check => indexOf or includes or some )
                homePosts_id.value.push(value.data.id);          // push id of post prevent show duplicate when sever clear cache
                arr_tmp.push(value);
              }
            } else {
              arr_tmp.push(value);
            }

          } else if (value.type === 'banner') {
            if (value.data.type === 'code' && process.client) { // banner code only clientSide
              var new_banner = helper.create_banner_code_html(value.data, '', '');
              value.data['new_html_banner'] = new_banner.outerHTML;
              arr_tmp.push(value);
            } else {
              arr_tmp.push(value);
            }

          } else {
            arr_tmp.push(value);  // else, add all type.
          }
        });
        // if have arr_tmp
        if (arr_tmp.length > 0) {
          homePosts.value = homePosts.value.concat(arr_tmp);  // concat in multiple array
        }
      }
    }
    function change_grid(type) {
        if (type === 'grid') {
            localStorage.setItem('grid_homepage', JSON.stringify({type: 'grid'}));
            VueCookieNext.setCookie('grid_homepage', {type: 'grid'});
        } else if (type === 'list') {
            localStorage.setItem('grid_homepage', JSON.stringify({type: 'list'}));
            VueCookieNext.setCookie('grid_homepage', {type: 'list'});
        } else if (type === 'view') {
            localStorage.setItem('grid_homepage', JSON.stringify({type: 'view'}));
            VueCookieNext.setCookie('grid_homepage', {type: 'view'});
        }
        
        if(r_name.value === 'index' && !isMobile.value){
            display_list.value = 'grid'
        }else{
            display_list.value = localStorage.getItem('grid_homepage') ? JSON.parse(localStorage.getItem('grid_homepage')) : {type: 'grid'};
        }

        reload_lazy_img(); // load lazy image.
    }
    function convert_price_to_k(price) { return helper.kFormatter(price); }
    function convert_price(price) { return helper.convert_price(price); }
    function check_title_char(title) { return helper.check_special_char(title); }
    function imageUrlAlt_profile(theEvent) {
        if (process.client && window.navigator.onLine) { theEvent.target.src = empty_img_profile.value; }
    }
    function imageUrlAlt_post(theEvent) {
        if (process.client && window.navigator.onLine) { theEvent.target.src = empty_img_post.value; }
    }
    // ---- change format date to time ago ----
    function convertFromNow(date) { return helper.check_date_ago(date, ''); }
    // ---- check link banner is khmer24 link or not ----
    // function check_link_banner (link) { if (process.client) { return helper.check_link_is_khmer24(link, config); } else { return link; } }
    function check_link_banner (link) { return helper.check_link_is_khmer24(link, config); }
    // ---- show modal options post ----
    function show_options (post_detail, data_track, from) {
        detail_one_post.value = post_detail;
        data_tracking.value = data_track;
        ads_come_from.value = from ? from.from : '';
        // console.log(detail_one_post.value);
        $('#show_modal_actions_post').modal('show');
    }
    // ---- impression tracking ----
    function visibilityChanged (isVisible, entry, data) {
        // isVisible => is true mean new data, false mean old data.
        if (process.client && isVisible) { // new data
            arr_impression.value.push({ id: data.id, current_index: data.index, paid: data.paid, placement: data.placement });

            // -- timer not exist && arr_impression not empty && check_sent is true, must set interval --
            if (!timer_auto_impression.value && arr_impression.value.length > 0 && check_sent.value) {
                // -- start setInterval in 3 second --
                timer_auto_impression.value = setInterval( async () => {
                    let arr_tmp = arr_impression.value;  // set arr_impression to tmp array.
                    arr_impression.value = [];           // clear arr_impression.
                    // console.log(arr_impression.value);
                    check_sent.value = false;            // not allow to setInterval again.
                    clearInterval(timer_auto_impression.value); timer_auto_impression.value = ''; // clear auto impression.

                    let res = await helper.tracking_action('impression', {post_impression: arr_tmp, item_count: homePosts.value.length, item_per_page: '30'},
                        'impression', 'home', data.type, '');

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
    // ---- click share icon ----
    function detectMob(p_id, sha_link, data, from) {
        let data_post = []; let post_from = '';
        // check data from my_following, highlight or posts
        if (from && from.from === 'my_following') {
            data_post = my_following_ads.value;
            post_from = 'my_following';
        } else if (from && from.from === 'highlight_ads') {
            data_post = from.data;
            post_from = 'highlight_ads';
        } else {
            data_post = homePosts.value;
            post_from = 'post';
        }

        post_id.value = p_id;           // store post id
        share_link.value = sha_link;  // store post link

        // -- Var share tracking --
        current_index.value = data.index;
        placement.value = 'home';
        display_type.value = data.display_type;
        // -- Var share tracking --

        track_action_on_post('share', post_id.value, data_post.length, homeOffset.value, current_index.value,
            placement.value, display_type.value, { paid: data.paid, placement: data.from }); // tracking on share.
        if (from && from.detail) { detail_one_post.value = from.detail; } // add full data post when show modal share in type gallery

        check_screen_userAgent();
        if (check_screen_device.value) {
            $("#modal_show_option_share").modal('hide');
            phone_support_sharing(post_from, data_post); // share media in device phone

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
    function phone_support_sharing(post_from, data_post) {
        let post_data = post_from === 'my_following' ? my_following_ads.value : ( post_from === 'highlight_ads' ? data_post : homePosts.value );

        for (let i = 0; i < post_data.length; i++) {
            if (post_id.value == post_data[i].data.id) {

                // support only https, localhost or some browser
                let title = post_data[i].data.title ? post_data[i].data.title : '';
                let text = post_data[i].data.title+' Cambodia on Khmer24.com.';
                let url = post_data[i].data.link ? post_data[i].data.link : '';

                if (navigator.share) {
                    let shareData = {
                        title: ''+title+'',
                        text: '',
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

                break;
            }
        }
    }
    // ---- facebook sharing ----
    function facebook_sharing() {
        if (window.navigator.onLine) {
            window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(''+ share_link.value +''),'facebook-share-dialog','width=626,height=436');
            return false;

        // connection error
        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- witter sharing ----
    function twitter_sharing() {
        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+share_link.value+''),'facebook-share-dialog','width=626,height=436'); return false;
    }
    // ---- copy link ----
    function copy_link(short_link) {
        document.getElementById('copy_link').focus();
        document.execCommand('copy');
        document.getElementById('copy_link').blur();

        // check from highlight or following ads and tracking on top ads too
        let paid = detail_one_post.value && detail_one_post.value.data.type !== 'normal' ? true : false;
        let from = '';
        if (ads_come_from.value === 'my_following') {
            from = 'following';
        } else if (ads_come_from.value === 'highlight_ads') {
            from = 'highlight';
        }
        // clear ads_come from
        ads_come_from.value = '';
        $('#modal_show_option_share').modal('hide');  // close modal share

        track_action_on_post('copy_link', post_id.value, homePosts.value.length, homeOffset.value, current_index.value, placement.value, display_type.value,{ paid: paid, placement: from });  // action, id, item_count, item_per_page, current_index, placement, display_type

        toast_show('Link copied to clipboard', true);
    }
    // ---- track on google analytic ----
    function track_google_analytics (page) {
        // setTimeout(() => {
            let offset = page > 0 ? '?offset=' + page : '';      // set offset of page if scroll get more data
            let page_path = route.path + offset;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                // page_title: 'Home Page',
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('home', data);
            // -- page_view --
            pageview(data);
        // }, 50);
    }
    // ---- check user login ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- show toast ----
    function toast_show(message, suc_or_er) {
        message_success.value = message;
        error_or_success_message.value = suc_or_er;
        let toast = $(".toast_home");
        toast.removeClass('d-none');
        toast.toast({ delay: 6000 });
        toast.toast('show');
    }
    // ---- click new post at bottom nav ---
    function ads_new_post() {
        if (isMobile.value) {
            $('#click_ads_new_post').click(); // click id at bottom navigation
        } else {
            $('#desktop_ads_new_post').click(); // click id at bottom navigation
        }
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
        // console.log(data_params)
    }
    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
</script>

