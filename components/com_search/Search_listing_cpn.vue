<template>
    <div :class="isDesktop ? 'dt_listing_s_post' : 'min_h'">
        <Head>
            <Title v-if="data_meta">{{ data_meta ? data_meta.title : '' }}</Title>
            <Title v-else>{{tt}}</Title>
            <!-- ios -->
            <!--<Meta name="apple-mobile-web-app-title" :content="data_meta ? data_meta.title : ''" />-->
            <!-- seo page -->
            <Meta name="keywords" :content="data_meta ? data_meta.keyword : ''" />
            <Meta name="description" :content="data_meta ? data_meta.description : ''" />
            <!-- facebook -->
            <Meta property="og:title" :content="data_meta ? data_meta.title : ''" />
            <Meta property="fb:app_id" :content="data_meta && data_meta.fb ? data_meta.fb.id : ''" />
            <Meta property="og:type" :content="data_meta && data_meta.fb ? data_meta.fb.type : ''" />
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

        <div v-if="is_404">
            <Page_404/>
        </div>

        <template v-else>

            <div v-if="loading_field" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>

            <div v-if="isMobile" class="col no_padding fix_app_bar">
                <!-- App Bar -->
                <div class="_div_nav bg_app_bar_header_ ">
                    <button @click="goBack" type="button" class="btn w_h_50px" aria-label="Back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                    <div class="col s_l_search_box_app_bar cur_sur">
                        <div @click.self="show_pop_up_search">
                            <i @click="show_pop_up_search" class="fas ion-ios-search-strong" style="width: 14px;height: 18px;"></i>
                            <span @click="show_pop_up_search" class="truncate_wrap text_shadow">
                                {{ route && route.query && route.query.keyword ? $t('message.search') +': '+ route.query.keyword : (show_category_name ? show_category_name : '') }}
                            </span>
                            <i v-if="route && route.query && route.query.keyword" @click="click_remove_text" class="fas ion-close-round s_l_icon_x_k_w"></i>
                        </div>
                    </div>
                    <div @click="show_modal_search('')" class="_pad_col_icon text-center">
                        <button type="button" class="btn s_l_search_filter_app_bar" aria-label="btn badge">
                            <i class="icon-fi-rr-settings-sliders"></i>
                            <span v-if="count_badge_chat > 0" class="badge"> {{ count_badge_chat }} </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- show space below app bar -->
            <div v-if="!isDesktop" :class="slug ? (isMobile ? 's_l_con_below_app_bar_child' : '') : 's_l_con_below_app_bar_parent'"></div>

            <!-- slide show -->
            <div :class="isMobile ? '' : 'mt_80'">
                <div :class="isMobile ? '' : 'h25'">
                    <div v-if="slide_show && slide_show.a && slide_show.a.data && slide_show.a.data.length > 0" :class="!isDesktop ? '' : 'mt-3'">
                        <div v-if="slide_show.a.data[0].type === 'image'" class="banner-con" :class="isDesktop ? 'des_container' : 'm-0'">
                            <a rel="nofollow noopener" :href="check_link_banner(slide_show.a.data[0].link)" target="_blank" aria-label="Banner">
                                <div>
                                    <img :src="slide_show.a.data[0].image" alt="banner" :style="{ 'max-width': `${slide_show.a.data[0].width}px`, 'max-height': `${slide_show.a.data[0].height}px` }">
                                </div>
                            </a>
                        </div>
                        <div v-else-if="slide_show.a.data[0].type === 'code'" v-html="slide_show.a.data[0].new_html_banner" class="align-width-banner"></div>
                    </div>
                    <div v-else-if="is_slide_show" id="slides" :class="isDesktop ? 'mt-3 dt_home_banner_owl' : ''">
                        <template v-if="slide_show && slide_show.a && slide_show.a.data && slide_show.a.data.length > 0">
                            <div v-if="!isDesktop" class="placeholder">
                                <img :src="asset_url+version_library+'img/em_ban_290.jpg'" alt="placeholder banner">
                            </div>
                            <div class="col no_padding s-l-head-pag slide_item">
                                <div id="owl_slide" class="owl-carousel owl-theme">
                                    <template v-for="(img, index) in slide_show.a.data" :key="index">
                                        <div v-if="img.type === 'image'" class="item">
                                            <a rel="nofollow noopener" :href="check_link_banner(img.link)" target="_blank" class="a_custom_style" aria-label="Banner">
                                                <div class="s-l-bg-img">
                                                    <div v-if="img.image" v-bind:style="{ backgroundImage: 'url(' + img.image + ')' }"></div>
                                                </div>
                                                <img :src="img.image" :alt="img.link">
                                            </a>
                                        </div>
                                        <div v-else-if="img.type === 'code'" class="item">
                                            <a rel="nofollow noopener" target="_blank" class="a_custom_style" aria-label="Banner code">
                                                <div v-html="img.new_html_banner"></div>
                                            </a>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <template v-if="!isDesktop">
                    <!-- Nav show short and change grid listing -->
                    <nav > <!-- v-if="!isDesktop" -->
                        <template v-if="isMobile === false">
                            <div class="m_t_b fn_15 d-flex">
                                <nuxt-link class="a-colors" :to="localePath({ name: 'index' })">
                                    <i class="bi bi-house-door me-1"></i>
                                    <span>{{ $t('message.home') }}</span>
                                </nuxt-link>
                                <div v-if="ct" class="d-flex">
                                    <span class="mx-2">/</span>
                                    <NuxtLink class="a-colors" :to="localePath({ name: 'c-slugCategory', params:{ slugCategory: ct.slug } })">{{ locale==='km' ? ct.km_name : ct.en_name }}</NuxtLink>
                                </div>
                                <div class="d-flex">
                                    <span class="mx-2">/</span>
                                    <span class="d-flex align-items-center text-black">
                                        {{
                                            route && route.query && route.query.keyword ? $t("message.search") +  ": " + (route.query.keyword ? route.query.keyword + " " + $t("message.in") + " " + $t("message.list_all") +  " "
                                            : route.query.province ? $t("message.in") + " " +  $t("message.list_all") +  " " + namePro + " " + $t("message.in") +  " "  : "") + (route.query.province ? " " + namePro + ", " : "") + $t("message.cambodia")
                                            : show_category_name ? (show_category_name ? show_category_name + " " + $t("message.in") + " "  : "") +  " " +  (route.query.province ? namePro + ", " : "") + $t("message.cambodia")  
                                            : route.query.province ? $t("message.list_all") +  " " +  namePro + ", " +  $t("message.cambodia")
                                            : $t("message.list_all_ads")
                                        }}
                                    </span>
                                </div>
                            </div>
                        </template>
                        <div class="navbar nav-field-s-con">
                            <div v-if="!isMobile" class=" w-100 pb-2">
                                <div class="d-flex w-100 align-items-center">
                                    <div class="d-flex align-items-center fn_20 text-black">
                                        <div class="fw-500">
                                            {{
                                                route && route.query && route.query.keyword ? $t("message.search") +  ": " + (route.query.keyword ? route.query.keyword + " " + $t("message.in") + " " + $t("message.list_all") +  " "
                                                : route.query.province ? $t("message.in") + " " +  $t("message.list_all") +  " " + namePro + " " + $t("message.in") +  " "  : "") + (route.query.province ? " " + namePro + ", " : "") + $t("message.cambodia")
                                                : show_category_name ? (show_category_name ? show_category_name + " " + $t("message.in") + " "  : "") +  " " +  (route.query.province ? namePro + ", " : "") + $t("message.cambodia")  
                                                : route.query.province ? $t("message.list_all") +  " " +  namePro + ", " +  $t("message.cambodia")
                                                : $t("message.list_all_ads")
                                            }}
                                        </div>
                                    </div>
                                    <div v-if="is_cate_job === false" class="g-icon d-flex ms-auto align-items-center">
                                        <div v-if="price && price.discount" :class="route && route.query && route.query.discount ? 'parent_color_strong' : ''" @click="c_action('discount')" class="fn_25 cusor"><i class="bi bi-percent"></i></div>
                                        <div  v-if="deliveries" :class="route && route.query && route.query.shipping ? 'parent_color_strong' : ''" @click="c_action('delivery')" class="fn_25 ms-3 cusor"><i class="bi bi-truck"></i></div>
                                        <div class="ms-3 fn_20 pt-1 ml_15">
                                            <i @click="change_grid('grid')" class=" icon-list" v-if="display_list && display_list.type === 'list'"></i>
                                            <i @click="change_grid('list')" class="icon-menu " v-else-if="display_list && display_list.type === 'grid'"></i>
                                            <i  v-else @click="change_grid('list')" class="icon-menu "></i>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div class="d-flex w-100">
                                <div class="d-flex w-100">
                                    <div :class="isMobile ? 'g-filter' : 'd-flex w-100'" >
                                        <div class="g-sort">
                                            <!-- location -->
                                            <div v-if="!isMobile">
                                                <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && route.query.province ? 'parent_color_strong' : ''">
                                                    <span @click="show_all_locationsdt()" :class="isMobile ? '' : 'dropdown-toggle p-7'" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                                        <i class="icon-map-pin n-f-s-icon"></i>
                                                        <template v-if="route && route.query && route.query.province">
                                                            {{ n_m_commune ? n_m_commune : (n_m_district ? n_m_district : (n_m_province ? n_m_province : '')) }}
                                                        </template>
                                                        <template v-else>
                                                            {{ $t('new_text_1.all_location') }} 
                                                        </template>
                                                    </span>
                                                    <i v-if="route && route.query && route.query.province" @click="click_choose_location('', '')" class="icon-clear n-f-s-icon1" :class="isMobile ? '' : 'pt-2 me-2 h-100'"></i>                                         
                                                    <div class="dropdown-menu deopdown-price location mt-2 p-0">
                                                        <div class="row">
                                                            <div class="col-4">
                                                                <button v-if="multiple_locations && type_loc !== 'province'" @click="back_location(type_loc)" type="button" class="btn ion-ios-arrow-back text-start fn_20" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="Close"></button>
                                                            </div>
                                                            <div class="col-4">
                                                                <p class="name_style truncate_wrap m-0 btn"> {{ $t('message.location') }} </p>
                                                            </div>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="modal-body con-loc">
                                                                <div v-if="loading_loc_multiple" class="mg-loc-modal">
                                                                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                                                                </div>
                                                                <template v-else>
                                                                    <ul v-if="multiple_locations" class="list-unstyled bg-white mb-0"> <!-- multiple select locations -->
                                                                        <li v-if="type_loc !== 'province'" @click="request_mul_loc" class=" cur_sur h-v-mouse parent_color font_bold" :class="isMobile ? 'full_field_tag': 'gt_full_field_tag'">
                                                                            {{ type_loc === 'district' ? 'Show all ads in '+n_m_province : (type_loc === 'commune' ? 'Show all ads in '+n_m_district : 'Show ads all locations') }}
                                                                        </li>
                                                                        <template v-for="loc in arr_mul_loc" :key="loc">
                                                                            <li @click="multiple_loc(type_loc, loc.slug, language === 'km' ? loc.km_name : loc.en_name)" class=" cur_sur h-v-mouse" :class="isMobile ? 'full_field_tag': 'gt_full_field_tag'">
                                                                                {{ language === 'km' ? loc.km_name : loc.en_name }}

                                                                                <i v-if="(type_loc === 'province' && route.query.province === loc.slug) || (type_loc === 'district' && route.query.district === loc.slug) || (type_loc === 'commune' && route.query.commune === loc.slug)"
                                                                                class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                                                                <i v-else class="ion-ios-arrow-forward float-end text_grey"></i>
                                                                            </li>
                                                                        </template>
                                                                    </ul>
                                                                    <template v-else> <!-- single select location -->
                                                                        <ul v-if="locations && locations.data" class="list-unstyled bg-white">
                                                                            <li v-for="location in locations.data" :key="location" @click="click_choose_location('change', location.slug)" class=" cur_sur h-v-mouse" :class="isMobile ? 'full_field_tag': 'gt_full_field_tag'">
                                                                                {{ language === 'km' ? location.km_name : location.en_name }}
                                                                                <i v-if="(is_province_search === location.slug) || (var_province === location.slug)" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                                                            </li>
                                                                        </ul>
                                                                    </template>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="isMobile">
                                                <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && route.query.province ? 'parent_color_strong' : ''">
                                                    <span  @click="show_all_locations()" class="p-7">
                                                        <i class="icon-map-pin n-f-s-icon"></i>
                                                        <template v-if="route && route.query && route.query.province">
                                                            {{ n_m_commune ? n_m_commune : (n_m_district ? n_m_district : (n_m_province ? n_m_province : '')) }}
                                                        </template>
                                                        <template v-else>
                                                            {{ $t('new_text_1.all_location') }} 
                                                        </template>
                                                    </span>
                                                    <i v-if="route && route.query && route.query.province" @click="click_choose_location('', '')" class="icon-clear n-f-s-icon1 pt-2 me-1"></i>                                         
                                                </div>
                                            </div>
                                            <!-- short -->
                                            <div v-if="short">
                                                <div v-if="!isMobile">
                                                    <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && route.query.sortby ? 'parent_color_strong' : ''">
                                                        <span class="dropdown-toggle p-7" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span v-if="route && route.query && route.query.sortby" class="n-f-s-p" >
                                                                <template v-for="sh in short.options" :key="sh">
                                                                    <template v-if="sh.fieldvalue === form[short.fieldname]">
                                                                        {{ sh.fieldtitle }}
                                                                    </template>
                                                                </template>
                                                            </span>
                                                            <span v-else class="n-f-s-p">{{ short.title }}</span>
                                                            <i class="ion-android-arrow-dropdown ms-1" ></i>
                                                        </span>
                                                        <i v-if="route && route.query && route.query.sortby" @click="selected_action_on_model(short.fieldname, '')" class="icon-clear n-f-s-icon1" :class="isMobile ? '' : 'pt-2 me-2 h-100'"></i>
                                                        <div v-if="short" class="dropdown-menu min-w-dropdown mt-2 p-0">
                                                            <div v-for="option in short.options" :key="option" @click="selected_action_on_model(short.fieldname, option.fieldvalue)" class=" cur_sur dropdown-item h-v-mouse" :class="isMobile ? 'full_field_tag': 'gt_full_field_tag'">
                                                                {{ option.fieldtitle }}
                                                                <span v-if="form[short.fieldname]">
                                                                    <i v-if="option.fieldvalue === form[short.fieldname]" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                                                </span>
                                                                <span v-else>
                                                                    <i v-if=" short && short.value.fieldvalue === option.fieldvalue" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i> 
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="isMobile">
                                                    <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && route.query.sortby ? 'parent_color_strong' : ''">
                                                        <span  @click="show_modal_short('short')" class="p-7">
                                                            <span v-if="route && route.query && route.query.sortby" class="n-f-s-p" >
                                                                <template v-for="sh in short.options" :key="sh">
                                                                    <template v-if="sh.fieldvalue === form[short.fieldname]">
                                                                        {{ sh.fieldtitle }}
                                                                    </template>
                                                                </template>
                                                            </span>
                                                            <span v-else class="n-f-s-p">{{ short.title }}</span>
                                                            <i class="ion-android-arrow-dropdown ms-1" ></i>
                                                        </span>
                                                        <i v-if="route && route.query && route.query.sortby" @click="selected_action_on_model(short.fieldname, '')" class="icon-clear n-f-s-icon1 pt-2 me-1"></i>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- prices -->
                                            <div v-if="price">
                                                <div v-if="!isMobile">
                                                    <div class="n-f-s-c-a cur_sur p-0"  :class="route && route.query && (route.query.min_ad_price || route.query.max_ad_price) ? 'parent_color_strong' : ''">
                                                        <span :class="isMobile ? '' : ' dropdown-toggle p-7'" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span class="n-f-s-p ">
                                                                {{ price.ad_price.title }}
                                                                <template v-if="route && route.query && (route.query.min_ad_price || route.query.max_ad_price)">
                                                                    : {{ route.query.min_ad_price }}
                                                                    {{ route.query.min_ad_price && route.query.max_ad_price ? ' - ' : '' }}
                                                                    {{ route.query.max_ad_price }}
                                                                </template>
                                                            </span>
                                                            <i class="ion-android-arrow-dropdown " ></i>
                                                        </span>
                                                        <i v-if="route && route.query && ((route.query.min_ad_price) || (route.query.max_ad_price))" :class="isMobile ? '' : 'pt-2 me-2 h-100'" class="icon-clear n-f-s-icon1"
                                                        @click="clear_price(price.ad_price.max_field.fieldname, price.ad_price.min_field.fieldname)" ></i>
                                                        <div v-if="price && price.ad_price" class="dropdown-menu deopdown-price mt-2">
                                                            <div class="mb-1" v-for="s_p in price" :key="s_p">
                                                                <div v-if="s_p.type === 'min_max'" class="modal-body">
                                                                    <div class="style_flex">
                                                                        <div class="col p-0 me-2">
                                                                            <label class="label"> {{ s_p.title }} </label>
                                                                            <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.min_field.title+' '+ s_p.min_field.prefix.text"
                                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.min_field.fieldname]"
                                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                                maxlength = "11">
                                                                        </div>
                                                                        <div class="col p-0 ms-2">
                                                                            <label class="label">.</label>
                                                                            <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.max_field.title+' '+ s_p.max_field.prefix.text"
                                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.max_field.fieldname]"
                                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                                maxlength = "11">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div v-if="s_p.type === 'min_max'" class="mt-3">
                                                                    <button @click="click_search('')" type="button" class="btn fns-17 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                                                        {{ $t('message.apply_filter') }} 
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="isMobile">
                                                    <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && (route.query.min_ad_price || route.query.max_ad_price) ? 'parent_color_strong' : ''">
                                                        <span @click="show_modal_price()" class="p-7">
                                                            <span class="n-f-s-p ">
                                                                {{ price.ad_price.title }}
                                                                <template v-if="route && route.query && (route.query.min_ad_price || route.query.max_ad_price)">
                                                                    : {{ route.query.min_ad_price }}
                                                                    {{ route.query.min_ad_price && route.query.max_ad_price ? ' - ' : '' }}
                                                                    {{ route.query.max_ad_price }}
                                                                </template>
                                                            </span>
                                                            <i class="ion-android-arrow-dropdown " ></i>
                                                        </span>
                                                        <i v-if="route && route.query && ((route.query.min_ad_price) || (route.query.max_ad_price))" class="pt-2 me-1 icon-clear n-f-s-icon1"
                                                        @click="clear_price(price.ad_price.max_field.fieldname, price.ad_price.min_field.fieldname)" ></i> 
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- year -->
                                            <template v-if="year && year.title === 'Year'">
                                                <template v-if="!isMobile">
                                                    <div :class="route && route.query && (route.query.min_ad_year || route.query.max_ad_year) ? 'parent_color_strong' : ''" class="n-f-s-c-a cur_sur p-0">
                                                        <span :class="isMobile ? '' : ' dropdown-toggle p-7'" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span class="n-f-s-p ">
                                                                {{ year.title }}
                                                                <template v-if="route && route.query && (route.query.min_ad_year || route.query.max_ad_year)">
                                                                    : {{ route.query.min_ad_year }}
                                                                    {{ route.query.min_ad_year && route.query.max_ad_year ? ' - ' : '' }}
                                                                    {{ route.query.max_ad_year }}
                                                                </template>
                                                            </span>
                                                            <i class="ion-android-arrow-dropdown " ></i>
                                                            <i v-if="route && route.query && ((route.query.min_ad_year) || (route.query.max_ad_year))" :class="isMobile ? '' : 'pt-2 me-2 h-100'" class="icon-clear n-f-s-icon1"
                                                            @click="clear_year(year.max_field.fieldname, year.min_field.fieldname)" ></i>
                                                        </span>
                                                        <div class="dropdown-menu deopdown-price mt-2">
                                                            <div class="mb-1">
                                                                <div class="modal-body">
                                                                    <div class="style_flex">
                                                                        <div class="col p-0 me-2">
                                                                            <label class="label"> {{ year.title }} </label>
                                                                            <select v-if="year.min_field" class="form-select" v-model="form[year.min_field.fieldname]" :class="form[year.min_field.fieldname] ? '' : 'text-secondary'" aria-label="Default select example">
                                                                                <option hidden value="">{{ year.min_field.title }}</option>
                                                                                <template v-for="val in year.min_field.options">
                                                                                    <option :value="val.fieldvalue">{{ val.fieldtitle }}</option>
                                                                                </template>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col p-0 ms-2">
                                                                            <label class="label">.</label>
                                                                            <select v-if="year.max_field" v-model="form[year.max_field.fieldname]" :class="form[year.max_field.fieldname] ? '' : 'text-secondary'" class="form-select" aria-label="Default select example">
                                                                                <option hidden value="">{{ year.max_field.title }}</option>
                                                                                <template v-for="val in year.max_field.options">
                                                                                    <option :value="val.fieldvalue">{{ val.fieldtitle }}</option>
                                                                                </template>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-3">
                                                                    <button @click="click_search('')" type="button" class="btn fns-17 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                                                    {{ $t('message.apply_filter') }} 
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && (route.query.min_ad_year || route.query.max_ad_year) ? 'parent_color_strong' : ''">
                                                        <span data-bs-toggle="modal" data-bs-target="#modal_year_filter" class="p-7">
                                                            <span class="n-f-s-p ">
                                                                {{ year.title }}
                                                                <template v-if="route && route.query && (route.query.min_ad_year || route.query.max_ad_year)">
                                                                    : {{ route.query.min_ad_year }}
                                                                    {{ route.query.min_ad_year && route.query.max_ad_year ? ' - ' : '' }}
                                                                    {{ route.query.max_ad_year }}
                                                                </template>
                                                            </span>
                                                            <i class="ion-android-arrow-dropdown " ></i>
                                                        </span>
                                                        <i v-if="route && route.query && ((route.query.min_ad_year) || (route.query.max_ad_year))" class="pt-2 me-1 icon-clear n-f-s-icon1"
                                                        @click="clear_year(year.max_field.fieldname, year.min_field.fieldname)"></i>
                                                    </div>
                                                </template>
                                            </template>
                                            <!-- ad_condition -->
                                            <div v-if="fields && fields.ad_condition && fields.ad_condition.popular && fields.ad_condition.type === 'radio' && !fields.ad_condition.chained_field">
                                                <div v-if="!isMobile">
                                                    <div :class="route && route.query && route.query.ad_condition ? 'parent_color_strong' : ''" class="n-f-s-c-a cur_sur p-0">
                                                        <span :class="isMobile ? '' : 'dropdown-toggle p-7'" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                                            <span class="n-f-s-p ">
                                                                {{ fields.ad_condition.title }}
                                                                <template v-for="v in fields.ad_condition.options" :key="v">
                                                                    <template v-if="route && route.query && v.fieldvalue === route.query.ad_condition">
                                                                        : {{ v.fieldtitle }}
                                                                    </template>
                                                                </template>
                                                            </span>
                                                            <i class="ion-android-arrow-dropdown"></i>
                                                        </span>
                                                        <i v-if="route && route.query && route.query.ad_condition" class="icon-clear n-f-s-icon1" :class="isMobile ? '' : 'pt-2 me-2 h-100'"
                                                        @click="selected_action_on_model(fields.ad_condition.fieldname, '')"></i>
                                                        <div class="dropdown-menu deopdown-price mt-2">
                                                            <div v-if="fields && fields.ad_condition" class="modal-body">
                                                                <label class="label mb-1"> {{ fields.ad_condition.title }} </label>
                                                                <div class="radio-new-or-second-hand text-center row m-0">
                                                                    <div class="col p_pad_radio_option">
                                                                        <input type="radio" :id="'all_a_'+form[fields.ad_condition.fieldname]" v-model="form[fields.ad_condition.fieldname]" value="">
                                                                        <label :for="'all_a_'+form[fields.ad_condition.fieldname]" :class="isMobile ? '' : 'py-1 dt-field-height'"><p class="m-0">{{ $t('message.all') }}</p></label>
                                                                    </div>
                                                                    <div v-for="(va, ix) in fields.ad_condition.options" :key="ix" class="col p_pad_radio_option">
                                                                        <input type="radio" :id="va.fieldvalue+'_b_'+ix" v-model="form[fields.ad_condition.fieldname]" :value="va.fieldvalue">
                                                                        <label :for="va.fieldvalue+'_b_'+ix" :class="isMobile ? '' : 'py-1 dt-field-height'"><p class="m-0">{{ va.fieldtitle }}</p></label>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-3">
                                                                    <button @click="click_search('')" type="button" class="btn fns-17 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                                                        {{ $t('message.apply_filter') }}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="isMobile">
                                                    <div :class="route && route.query && route.query.ad_condition ? 'parent_color_strong' : ''" class="n-f-s-c-a cur_sur p-0">
                                                        <span @click="show_modal_short('ad_condition')" class="p-7">
                                                            <span class="n-f-s-p ">
                                                                {{ fields.ad_condition.title }}
                                                                <template v-for="v in fields.ad_condition.options" :key="v">
                                                                    <template v-if="route && route.query && v.fieldvalue === route.query.ad_condition">
                                                                        : {{ v.fieldtitle }}
                                                                    </template>
                                                                </template>
                                                            </span>
                                                            <i class="ion-android-arrow-dropdown"></i>
                                                        </span>
                                                        <i v-if="route && route.query && route.query.ad_condition" class="icon-clear n-f-s-icon1 pt-2 me-1" 
                                                        @click="selected_action_on_model(fields.ad_condition.fieldname, '')"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="!isMobile" class="ms-auto ">
                                            <div @click="show_modal_search_dt('')" class="n-f-s-c-a cur_sur me-0 ">
                                                <span><i class="bi bi-funnel me-1"></i></span>
                                                <span>{{ $t('message.m_filter') }}</span>
                                                <span v-if="count_badge_chat > 0" class="badge bg_badge"> {{ count_badge_chat }} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isMobile" class="n-f-s-c-d-2 cur_sur">
                                        <template v-if="is_cate_job === false && posts.length > 0">
                                            <i @click="change_grid('grid')" class="icon-display-icon" v-if="display_list && display_list.type === 'view'"></i>
                                            <i @click="change_grid('view')" class=" icon-list" v-else-if="display_list && display_list.type === 'list'"></i>
                                            <i @click="change_grid('list')" class="icon-menu " v-else-if="display_list && display_list.type === 'grid'"></i>
                                            <i @click="change_grid('view')" class="icon-display-icon" v-else></i>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <!-- Main Categories -->
                    <div v-if="!slug && cate_main && cate_main.cate_line && cate_main.cate_line.line_1 && cate_main.cate_line.line_1.length > 0" class="nav-S-con nav-height-con">
                        <div v-if="cate_main && cate_main.type === 'simple_categories'" class="nav-cat-simple">
                            <div v-for="main_parent in cate_main.cate_line" :key="main_parent" class="nav-cat-simple-line">
                                <NuxtLink v-for="(m, index) in main_parent" :key="index" :class="isMobile ? 'nav-cat-link' : 'nav-cat-link_16'" :to="localePath(click_category_search(m.slug, m.id))" @click="store_params(m.id)">
                                    <div class="nav-cat-img">
                                        <img :src="m.icon && m.icon.small ? m.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                    </div>
                                    <div class="nav-cat-text">
                                        <div>
                                            <p>{{ language === 'km' ? m.km_name : m.en_name }}</p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                        <div v-else class="nav-cat-select res-n-cat-select">
                            <div v-for="main_parent in cate_main.cate_line" :key="main_parent" class="nav-cat-con-line">
                                <NuxtLink v-for="(m, index) in main_parent" :key="index" :class="isMobile ? 'nav-cat-link' : 'nav-cat-link_16'" :to="localePath(click_category_search(m.slug, m.id))" @click="store_params(m.id)">
                                    <div class="nav-cat-img">
                                        <img :src="m.icon && m.icon.small ? m.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                    </div>
                                    <div class="nav-cat-text">
                                        <div>
                                            <p>{{ language === 'km' ? m.km_name : m.en_name }}</p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <!-- Sub Categories is not selected -->
                    <div v-else-if="slug && is_parent_or_sub !== 'sub' && cate_sub && cate_sub.cate_line && cate_sub.cate_line.line_1 && cate_sub.cate_line.line_1.length > 0" class="nav-S-con nav-height-con">
                        <div v-if="cate_sub && cate_sub.type === 'simple_categories'" class="nav-cat-simple">
                            <div v-for="(main_parent) in cate_sub.cate_line" :key="main_parent" class="nav-cat-simple-line">
                                <!-- {{ main_parent.length }} -->
                                <NuxtLink v-for="(m, index) in main_parent" :key="index" :class="(main_parent.length === 7 || main_parent.length === 10 || main_parent.length === 5) ? ( ( main_parent.length === 10 || main_parent.length === 5 ) ? ( isMobile ? 'nav-cat-link' : 'nav-cat-linkss' ) : ( isMobile ? 'nav-cat-link' : 'nav-cat-links' ) ) :  ( ( main_parent.length === 6 || main_parent.length === 12 ) ? ( isMobile ? 'nav-cat-link' : 'nav-cat-link_16' ) : 'nav-cat-link' ) " :to="localePath(click_category_search(m.slug, m.id))" @click="store_params(m.id)">
                                
                                    <div class="nav-cat-img">
                                        <img :src="m.icon && m.icon.small ? m.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                    </div>
                                    <div class="nav-cat-text">
                                        <div>
                                            <p>{{ language === 'km' ? m.km_name : m.en_name }}</p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                        <div v-else class="nav-cat-select res-n-cat-select">
                            <div v-for="sub_parent in cate_sub.cate_line" :key="sub_parent" class="nav-cat-con-line">
                                <NuxtLink v-for="(s, index) in sub_parent" :key="index" :class="(sub_parent.length === 7 || sub_parent.length === 10 || sub_parent.length === 5) ? ( ( sub_parent.length === 10 || sub_parent.length === 5 ) ? ( isMobile ? 'nav-cat-link' : 'nav-cat-linkss' ) : ( isMobile ? 'nav-cat-link' : 'nav-cat-links' ) ) : ( ( sub_parent.length === 6 || sub_parent.length === 12 ) ? ( isMobile ? 'nav-cat-link' : 'nav-cat-link_16' ) : 'nav-cat-link' )  " :to="localePath(click_category_search(s.slug, ''))">
                                    <div class="nav-cat-img">
                                        <img :src="s.icon && s.icon.small ? s.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                    </div>
                                    <div class="nav-cat-text">
                                        <div>
                                            <p>{{ language === 'km' ? s.km_name : s.en_name }}</p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <!-- check if chained_field of field ad_model exist then execute below -->
                    <template v-if="fields">
                        <!-- show fields is popular true and type select -->
                        <template v-for="(field, index) in fields" :key="index">
                            <!-- is popular true && type select && chained_field is empty && fieldname is empty -->
                            <nav v-if="field.popular && field.type === 'select' && field.options && !field.chained_field && (form[field.fieldname] === '' || form[field.fieldname] === undefined)"
                                class="navbar nav-sub-field-cate res-n-s-f-c">
                                <div>
                                    <template v-for="val in field.options" :key="val">
                                        <div @click="click_add_field(field.fieldname, val.fieldvalue)" class="n-s-f-c-a-tag cur_sur" :class="val.fieldvalue === form[field.fieldname] ? 'active-cate-font' : ''">
                                            <div v-if="field.display_icon" :class="val.fieldvalue === form[field.fieldname] ? 'active-cate-bg' : ''" class="n-s-f-c-div-1">
                                                <img :src="val.icon && val.icon.small ? val.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                            </div>
                                            <div class="n-s-f-c-div-2">
                                                <div><p>{{ val.fieldtitle }}</p></div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </nav>
                        </template>
                        <!-- show fields is popular true, type select and "chained_field" value has in form search -->
                        <template v-for="(field, index) in fields" :key="index">
                            <nav v-if="field.popular && field.chained_field && form[field.chained_field] && arr_ad_model.length > 0" class="navbar s_l_search_ad_model res-s-l-s-a-m">
                                <div :class="arr_ad_model.length <= 8 ? 'width_100' : (var_more_model ? 'width_100' : 'width_100 s_l_show_more')">
                                    <ul class="list-unstyled s_l_s_ul">
                                        <li class="text_ad_model">
                                            {{ field.title }}:
                                        </li>

                                        <template v-for="val in arr_ad_model" :key="val">
                                            <li v-if="val.fieldparentvalue === form[field.chained_field]" @click="click_add_model(field.fieldname, val.fieldvalue)">
                                                <div class="truncate s_l_s_div cur_sur" :class="val.fieldvalue === form[field.fieldname] ? 's_l_field_active' : ''">
                                                    {{ val.fieldtitle }}
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                                <div v-if="arr_ad_model.length > 8" @click="show_add_model" class="s_l_btn_show_more res_list_btn_s_m">
                                    <button class="btn btn-link btn-sm btn-show-more" aria-label="btn-more">
                                        {{ var_more_model ? $t('new_text.show_less') : $t('new_text.show_more') }}
                                        <i :class="var_more_model ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                                    </button>
                                </div>
                            </nav>
                        </template>
                    </template>
                </template>

                <!-- banner B type "code" or "image" -->
                <template v-if="slide_show && slide_show.b && slide_show.b.data && slide_show.b.data.length > 0">
                    <template v-for="ban in slide_show.b.data" :key="ban">
                        <div v-if="ban.type === 'image'" class="banner-con mb-2 mt-2" :class="isDesktop ? 'des_container' : ''">
                            <a rel="nofollow noopener" :href="check_link_banner(ban.link)" target="_blank" aria-label="Banner Zone B">
                                <div>
                                    <img :src="ban.image" alt="banner image" :style="{ 'max-width': `${ban.width}px`, 'max-height': `${ban.height}px`, 'min-height': `${ban.height/2}px` }">
                                </div>
                            </a>
                        </div>
                        <div v-else-if="ban.type === 'code'" v-html="ban.new_html_banner" class="align-width-banner mt-2 mb-1"></div>
                    </template>
                </template>
                <!-- banner other type "code" or "image" -->
                <template v-if="slide_show && slide_show.other && slide_show.other.data && slide_show.other.data.length > 0">
                    <template v-for="ban in slide_show.other.data" :key="ban">
                        <div v-if="ban.type === 'image'" class="banner-con my-2" :class="isDesktop ? 'des_container' : ''">
                            <a rel="nofollow noopener" :href="check_link_banner(ban.link)" target="_blank" aria-label="Banner Zone B">
                                <div>
                                    <img :src="ban.image" alt="banner image" :style="{ 'max-width': `${ban.width}px`, 'max-height': `${ban.height}px`, 'min-height': `${ban.height/2}px` }">
                                </div>
                            </a>
                        </div>
                        <div v-else-if="ban.type === 'code'" v-html="ban.new_html_banner" class="align-width-banner my-2"></div>
                    </template>
                </template>

                <!-- body list -->
                <div :class="isDesktop ? 'des_container mt-3 dt_st_listing' : ''">
                    <!-- breadcrumb -->
                    <nav v-if="isDesktop" aria-label="breadcrumb" class="dt_breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" aria-current="page">
                                <NuxtLink class="parent_color" :to="localePath({ name: 'index' })">
                                    <i class="fas fa-home me-2"></i>{{ $t('message.home') }}
                                </NuxtLink>
                            </li>
                            <template v-if="r_n === 'search'">
                                <li  class="breadcrumb-item" aria-current="page">
                                    <template v-if="route.query && (route.query.keyword || route.query.province)">
                                        <template v-if="route.query.keyword">
                                            {{ $t('message.search')+' "'+route.query.keyword+'" '+$t('text_desktop.in') }}
                                        </template>
                                        {{ $t('text_desktop.list_all_ads')+' '+$t('text_desktop.in') }}
                                        <template v-if="route.query.province">
                                            <template v-if="locations && locations.data">
                                                <template v-for="loc in locations.data" :key="loc">
                                                    <template v-if="loc.slug === route.query.province">
                                                        {{ language === 'km' ? loc.km_name+',' : loc.en_name+',' }}
                                                    </template>
                                                </template>
                                            </template>
                                        </template>
                                        {{ $t('text_desktop.cambodia') }}
                                    </template>
                                    <template v-else>
                                        {{ $t('text_desktop.list_all_ads')+' '+$t('text_desktop.in_cambodia') }}
                                    </template>
                                </li>
                            </template>
                            <template v-else>
                                <!-- slug parent -->
                                <template v-if="is_parent_or_sub === 'parent'">
                                    <template v-for="v in all_categories" :key="v">
                                        <li v-if="v.slug === r_slug" class="breadcrumb-item" aria-current="page">
                                            {{ language === 'km' ? v.km_name : v.en_name }} {{ $t('text_desktop.in_cambodia') }}
                                        </li>
                                    </template>
                                </template>
                                <!-- slug sub -->
                                <template v-else-if="is_parent_or_sub === 'sub'">
                                    <template v-for="v in all_categories" :key="v">
                                        <template v-if="v.slug === r_slug">
                                            <template v-for="p_cate in all_categories" :key="p_cate"> <!-- Get Parent Cate -->
                                                <li v-if="v.parent === p_cate.id" class="breadcrumb-item" aria-current="page">
                                                    <NuxtLink class="parent_color" :to="localePath({ name: 'c-slugCategory', params: { 'slugCategory': p_cate.slug } })">
                                                        {{ language === 'km' ? p_cate.km_name : p_cate.en_name }}
                                                    </NuxtLink>
                                                </li>
                                            </template>
                                            <li class="breadcrumb-item" aria-current="page">
                                                {{ language === 'km' ? v.km_name : v.en_name }} {{ $t('text_desktop.in_cambodia') }}
                                            </li>
                                        </template>
                                    </template>
                                </template>
                            </template>
                        </ol>
                    </nav>
                    <!-- The Title -->
                    <h1 :class="isDesktop ? '' : 'd-none'" class="title">
                        <template v-if="is_parent_or_sub === 'parent' || is_parent_or_sub === 'sub'">
                            <template v-for="v in all_categories">
                                <template v-if="v.slug === r_slug" >
                                    {{ language === 'km' ? v.km_name : v.en_name }} {{ $t('text_desktop.in_cambodia') }}
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            <template v-if="route.query && (route.query.keyword || route.query.province)">
                                <template v-if="route.query.keyword">
                                    {{ $t('message.search')+' "'+route.query.keyword+'" '+$t('text_desktop.in') }}
                                </template>
                                {{ $t('text_desktop.list_all_ads')+' '+$t('text_desktop.in') }}
                                <template v-if="route.query.province">
                                    <template v-if="locations && locations.data">
                                        <template v-for="loc in locations.data" :key="loc">
                                            <template v-if="loc.slug === route.query.province">
                                                {{ language === 'km' ? loc.km_name+',' : loc.en_name+',' }}
                                            </template>
                                        </template>
                                    </template>
                                </template>
                                {{ $t('text_desktop.cambodia') }}
                            </template>
                            <template v-else>
                                {{ $t('text_desktop.list_all_ads')+' '+$t('text_desktop.in_cambodia') }}
                            </template>
                        </template>
                    </h1>
                    <!-- Post Data -->
                    <div :class="isDesktop ? 'row' : ''">
                        <div v-if="isDesktop" class="col-3 left-side">
                            <div class="dt_left_side dt_border">
                                <div class="dt_left_title">{{ $t('text_desktop.refine_your_result') }}</div>
                                <!-- Desktop search -->
                                <div class="form-group">
                                    <div class="position_relative">
                                        <label class="dt_lb_title">{{ $t('message.search') }}</label>
                                        <span v-if="route.query.keyword" class="dt_cl_filter cur_sur" @click="dt_clear_search('keyword','')">
                                        {{ $t('message.clear') }}
                                        </span>
                                    </div>
                                    <div class="_flex_">
                                        <div class="filter-data width_100">
                                            <input v-model="clear_text_search" type="text"  class="form-control" :placeholder="$t('message.search')">
                                        </div>
                                        <div class="filter-data ms-2">
                                            <button @click="click_search('')" id="id_desk_search" class="btn btn-default dt_search_sm" aria-label="btn search">
                                                <span class="icon icon-search"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- All desktop field search -->
                                <div v-if="loading_modal_search">
                                    <div v-for="index in 3" :key="index" class="mb-4">
                                        <div class="animated-background mb-2" style="height: 20px;width: 20%;border-radius: 4px;"></div>
                                        <div class="animated-background"  style="height: 48px;width: 100%;border-radius: 4px;"></div>
                                    </div>
                                </div>
                                <template v-else>
                                    <!-- provinces -->
                                    <div class="form-group dt_left_group position_relative" v-if="location && location.province">
                                        <div class="position_relative">
                                            <label class="dt_lb_title"> {{ location.province.title }} </label>
                                            <span v-if="route.query.province" class="dt_cl_filter cur_sur" @click="dt_clear_search('province','')">
                                                {{ $t('message.clear') }}
                                            </span>
                                        </div>
                                        <i class="ion-android-arrow-dropdown dt_icon_select_option"></i>
                                        <select class="form-control" name="location" @change="show_data_districts($event)" v-model="form['province']">
                                            <option value="">  </option>
                                            <template v-if="locations && locations.data">
                                                <option v-for="location in locations.data" :key="location" v-bind:value="location.slug">
                                                    {{ language === 'km' ? location.km_name : location.en_name }}
                                                </option>
                                            </template>
                                        </select>
                                    </div>
                                    <!-- districts -->
                                    <div class="form-group dt_left_group position_relative" v-if="location && location.district">
                                        <div class="position_relative">
                                            <label class="dt_lb_title"> {{ location.district.title }} </label>
                                            <span v-if="route.query.district" class="dt_cl_filter cur_sur" @click="dt_clear_search('district','')">
                                                {{ $t('message.clear') }}
                                            </span>
                                        </div>
                                        <i class="ion-android-arrow-dropdown dt_icon_select_option"></i>
                                        <select class="form-control" name="district" id="district" :disabled="!form['province']" @change="show_data_communes($event)" v-model="form['district']">
                                            <option value="">  </option>
                                            <option v-for="district in districts" :key="district" v-bind:value="district.slug">
                                                {{ language === 'km' ? district.km_name : district.en_name }}
                                            </option>
                                        </select>
                                    </div>
                                    <!-- commutes -->
                                    <div class="form-group dt_left_group position_relative" v-if="location && location.commune">
                                        <div class="position_relative">
                                            <label class="dt_lb_title"> {{ location.commune.title }} </label>
                                            <span v-if="route.query.commune" class="dt_cl_filter cur_sur" @click="dt_clear_search('commune','')">
                                                {{ $t('message.clear') }}
                                            </span>
                                        </div>
                                        <i class="ion-android-arrow-dropdown dt_icon_select_option"></i>
                                        <select class="form-control" name="commune" id="commune" :disabled="!form['district']" @change="communes_change($event)" v-model="form['commune']">
                                            <option value="">  </option>
                                            <option v-for="commune in communes" :key="commune" v-bind:value="commune.slug">
                                                {{ language === 'km' ? commune.km_name : commune.en_name }}
                                            </option>
                                        </select>
                                    </div>
                                    <!-- prices -->
                                    <template v-if="price">
                                        <template v-for="s_p in price" :key="s_p">
                                            <div v-if="s_p.type === 'min_max'" class="form-group dt_left_group">
                                                <div class="position_relative">
                                                    <label class="dt_lb_title"> {{ s_p.title }} </label>
                                                    <span v-if="route.query[s_p.min_field.fieldname] || route.query[s_p.max_field.fieldname]" class="dt_cl_filter cur_sur"
                                                        @click="dt_clear_search('min_max', [s_p.min_field.fieldname, s_p.max_field.fieldname])">
                                                        {{ $t('message.clear') }}
                                                    </span>
                                                </div>
                                                <div class="form-row">
                                                    <div class="filter-data col">
                                                        <input type="number" pattern="[0-9]*" decimal="true" maxlength = "11" class="form-control"
                                                            @keypress="onlyNumber" v-bind:placeholder="s_p.min_field.title+' '+ s_p.min_field.prefix.text"
                                                            v-model="form[s_p.min_field.fieldname]"
                                                            oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);">
                                                    </div>
                                                    <div class="filter-data col">
                                                        <input type="number" pattern="[0-9]*" decimal="true" maxlength = "11" class="form-control"
                                                            @keypress="onlyNumber" v-bind:placeholder="s_p.max_field.title+' '+ s_p.max_field.prefix.text"
                                                            v-model="form[s_p.max_field.fieldname]"
                                                            oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);">
                                                    </div>
                                                    <div class="filter-data col-3">
                                                        <button @click="click_search('')" class="btn btn-default dt_search_sm width_100" aria-label="Search">
                                                            <span class="fas fa-angle-right font_21"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else-if="s_p.type === 'switch'" class="form-group dt_left_group">
                                                <div class="position_relative">
                                                    <label class="dt_lb_title"> {{ price.discount.title }} </label>
                                                    <span v-if="route.query[s_p.fieldname]" class="dt_cl_filter cur_sur" @click="dt_clear_search(s_p.fieldname,'')">
                                                        {{ $t('message.clear') }}
                                                    </span>
                                                </div>
                                                <div class="dt_h_switch">
                                                    <div class="custom-switch dt_p_switch">
                                                        <input type="checkbox" @click="change_discount" class="custom-control-input" v-model="form[s_p.fieldname]" id="radio_discount">
                                                        <label class="custom-control-label full_width ms-1 font_16" for="radio_discount" > {{ form[s_p.fieldname] ? 'Yes' : 'No' }} </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else-if="s_p.type === 'text'" class="form-group dt_left_group">
                                                <div class="position_relative">
                                                    <label class="dt_lb_title"> {{ s_p.title }} </label>
                                                    <span v-if="route.query[s_p.fieldname]" class="dt_cl_filter cur_sur" @click="dt_clear_search(s_p.fieldname,'')">
                                                        {{ $t('message.clear') }}
                                                    </span>
                                                </div>
                                                <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.title"
                                                    class="form-control" maxlength="11" v-model="form[s_p.fieldname]"
                                                    oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);">
                                            </div>
                                        </template>
                                    </template>
                                    <!-- deliveries -->
                                    <div class="form-group dt_left_group" v-if="deliveries">
                                        <div class="position_relative">
                                            <label class="dt_lb_title"> {{ deliveries.shipping.title }} </label>
                                            <span v-if="route.query.shipping" class="dt_cl_filter cur_sur" @click="dt_clear_search('shipping','')">
                                                {{ $t('message.clear') }}
                                            </span>
                                        </div>
                                        <div class="dt_h_switch">
                                            <div class="custom-switch dt_p_switch">
                                                <input type="checkbox" @click="change_delivery" class="custom-control-input" v-model="form['shipping']" id="radio_delivery">
                                                <label class="custom-control-label full_width ms-1 font_16" for="radio_delivery" > {{ form['shipping'] ? 'Yes' : 'No' }} </label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- fields -->
                                    <template v-if="fields">
                                        <div class="form-group dt_left_group" v-for="(s_f, index) in fields" :key="index">
                                            <!-- type select -->
                                            <template v-if="s_f.type === 'select' && s_f.options">
                                                <!-- show field that chained_field empty -->
                                                <div v-if="!s_f.chained_field" class="position_relative">
                                                    <div class="position_relative">
                                                        <label class="dt_lb_title"> {{ s_f.title }} </label>
                                                        <span v-if="route.query[s_f.fieldname]" class="dt_cl_filter cur_sur" @click="dt_clear_search(s_f.fieldname,'')">
                                                            {{ $t('message.clear') }}
                                                        </span>
                                                    </div>
                                                    <i class="ion-android-arrow-dropdown dt_icon_select_option"></i>
                                                    <select @change="change_ad_field(s_f.fieldname)" v-model="form[s_f.fieldname]" class="form-control">
                                                        <option value="">  </option>
                                                        <option v-for="option in s_f.options" :key="option" v-bind:value="option.fieldvalue">
                                                            {{ option.fieldtitle }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <!-- show field that chained_field exist -->
                                                <div v-else-if="s_f.chained_field" class="position_relative">
                                                    <div class="position_relative">
                                                        <label class="dt_lb_title"> {{ s_f.title }} </label>
                                                        <span v-if="route.query[s_f.fieldname]" class="dt_cl_filter cur_sur" @click="dt_clear_search(s_f.fieldname,'')">
                                                            {{ $t('message.clear') }}
                                                        </span>
                                                    </div>
                                                    <i class="ion-android-arrow-dropdown dt_icon_select_option"></i>
                                                    <select class="form-control" @change="change_radio()" :disabled="!form[s_f.chained_field] || arr_ad_model.length === 0" v-model="form[s_f.fieldname]">
                                                        <option value="">  </option>
                                                        <template v-if="form[s_f.chained_field]"> <!-- && s_f.options.length > 0 -->
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
                                                    <div class="col p-0 me-1">
                                                        <label class="dt_lb_title"> {{ s_f.title }} </label>
                                                        <!-- select -->
                                                        <select v-if="s_f.min_field.options" class="form-control" v-model="form[s_f.min_field.fieldname]">
                                                            <option value="">  </option>
                                                            <option v-for="option in s_f.min_field.options" :key="option" v-bind:value="option.fieldvalue">
                                                                {{ option.fieldtitle }}
                                                            </option>
                                                        </select>
                                                        <!-- input price -->
                                                        <input v-else type="number" pattern="[0-9]*" decimal="true"
                                                            @keypress="onlyNumber" v-bind:placeholder="s_f.min_field.title"
                                                            class="form-control" v-model="form[s_f.min_field.fieldname]"
                                                            oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                            maxlength = "11">
                                                    </div>
                                                    <div class="col p-0 ms-1">
                                                        <label class="dt_lb_title"> {{ s_f.max_field.title }} </label>
                                                        <!-- select -->
                                                        <select v-if="s_f.max_field.options" class="form-control" v-model="form[s_f.max_field.fieldname]">
                                                            <option value="">  </option>
                                                            <option v-for="option in s_f.max_field.options" :key="option" v-bind:value="option.fieldvalue">
                                                                {{ option.fieldtitle }}
                                                            </option>
                                                        </select>
                                                        <!-- input price -->
                                                        <input v-else type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_f.max_field.title"
                                                            class="form-control" v-model="form[s_f.max_field.fieldname]"
                                                            oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                            maxlength = "11">
                                                    </div>
                                                    <div class="filter-data col-2 p-0 ms-2">
                                                        <div class="position_relative">
                                                            <label class="dt_lb_title text-white">.</label>
                                                            <span v-if="route.query[s_f.min_field.fieldname] || route.query[s_f.max_field.fieldname]" class="dt_cl_filter cur_sur"
                                                                @click="dt_clear_search('min_max', [s_f.min_field.fieldname, s_f.max_field.fieldname])">
                                                                {{ $t('message.clear') }}
                                                            </span>
                                                        </div>
                                                        <button @click="click_search('')" class="btn btn-default dt_search_sm width_100" aria-label="Search">
                                                            <span class="fas fa-angle-right font_21"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- radio -->
                                            <div v-else-if="s_f.type === 'radio'">
                                                <div class="position_relative">
                                                    <label class="dt_lb_title"> {{ s_f.title }} </label>
                                                    <span v-if="route.query[s_f.fieldname]" class="dt_cl_filter cur_sur" @click="dt_clear_search(s_f.fieldname, '')">
                                                        {{ $t('message.clear') }}
                                                    </span>
                                                </div>
                                                <div class="list_filter">
                                                    <div v-for="(va, index) of s_f.options" :key="index" class="custom-control custom-radio">
                                                        <input type="radio" :id="va.fieldvalue+'_'+index" v-model="form[s_f.fieldname]" :value="va.fieldvalue" @change="change_radio()" class="custom-control-input">
                                                        <label class="custom-control-label" :for="va.fieldvalue+'_'+index">{{ va.fieldtitle }}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- text -->
                                            <div v-else-if="s_f.type === 'text'">
                                                <div class="position_relative">
                                                    <label class="dt_lb_title"> {{ s_f.title }} </label>
                                                    <span v-if="route.query[s_f.fieldname]" class="dt_cl_filter cur_sur" @click="dt_clear_search(s_f.fieldname, '')">
                                                        {{ $t('message.clear') }}
                                                    </span>
                                                </div>
                                                <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" class="form-control" v-model="form[s_f.fieldname]"
                                                    maxlength = "11" oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);">
                                            </div>
                                            <!-- type multiple_select -->
                                            <div class="desktop_mul_select" v-else-if="s_f.type === 'multiple_select'">
                                                <label class="dt_lb_title"> {{ s_f.title }} </label>
                                                <div class="_flex_">
                                                    <Multiselect
                                                        v-model="value"
                                                        mode="tags"
                                                        :close-on-select="false"
                                                        :searchable="true"
                                                        :create-option="false"
                                                        :options="options"
                                                    />
                                                    <div class="col-2 p-0 ms-2">
                                                        <button @click="click_search('')" class="btn btn-default dt_search_sm width_100" aria-label="Search">
                                                            <span class="fas fa-angle-right font_21"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div :class="isDesktop ? 'col col-9 right-side' : ''">
                            <template v-if="isDesktop">
                                <!-- Main and Sub categories Field Desktop -->
                                <div v-if="!slug && cate_main && cate_main.cate_line && cate_main.cate_line.line_1 && cate_main.cate_line.line_1.length > 0" class="dl_f_cate mb-3 dt_border">

                                    <div class="dt_main_title">{{ $t('text_desktop.explor_good_post') }}</div>

                                    <template v-if="cate_main && cate_main.type === 'simple_categories'">
                                        <div class="dt_v_cate_listing nav-cat-simple-line">
                                            <template v-for="main_parent in cate_main.cate_line" :key="main_parent">
                                                <div v-for="(m, index) in main_parent" :key="index">
                                                    <NuxtLink class="dt_v_cat_link" :to="localePath(click_category_search(m.slug, m.id))" @click="store_params(m.id)">
                                                        <div class="dt_cate_img_icon">
                                                            <img :src="m.icon && m.icon.medium ? m.icon.medium.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                                        </div>
                                                        <div class="dt_cate_text">
                                                            <div>
                                                                <p>{{ language === 'km' ? m.km_name : m.en_name }}</p>
                                                            </div>
                                                        </div>
                                                    </NuxtLink>
                                                </div>
                                            </template>
                                        </div>
                                    </template>
                                    <div v-else class="nav-cat-select dt-n-cat-select">
                                        <div v-for="main_parent in cate_main.cate_line" :key="main_parent" class="nav-cat-con-line">
                                            <NuxtLink v-for="(m, index) in main_parent" :key="index" class="nav-cat-link" :to="localePath(click_category_search(m.slug, m.id))" @click="store_params(m.id)">
                                                <div class="nav-cat-img">
                                                    <img :src="m.icon && m.icon.small ? m.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                                </div>
                                                <div class="nav-cat-text">
                                                    <div>
                                                        <p>{{ language === 'km' ? m.km_name : m.en_name }}</p>
                                                    </div>
                                                </div>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="slug && is_parent_or_sub !== 'sub' && cate_sub && cate_sub.cate_line && cate_sub.cate_line.line_1 && cate_sub.cate_line.line_1.length > 0" class="nav-S-con nav-height-con mb-3 dt_border">

                                    <div class="dt_main_title">
                                        {{ $t('text_desktop.explore_the') }}
                                        <template v-for="v in all_categories">
                                            <template v-if="v.slug === r_slug" >
                                                {{ language === 'km' ? v.km_name : v.en_name }}
                                            </template>
                                        </template>
                                        {{ $t('text_desktop.category') }}
                                    </div>

                                    <template v-if="cate_sub && cate_sub.type === 'simple_categories'">
                                        <div class="dt_v_cate_listing nav-cat-simple-line">
                                            <template v-for="sub_parent in cate_sub.cate_line" :key="sub_parent">
                                                <div v-for="(m, index) in sub_parent" :key="index">
                                                    <NuxtLink class="dt_v_cat_link" :to="localePath(click_category_search(m.slug, m.id))" @click="store_params(m.id)">
                                                        <div class="dt_cate_img_icon">
                                                            <img :src="m.icon && m.icon.medium ? m.icon.medium.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                                        </div>
                                                        <div class="dt_cate_text">
                                                            <div>
                                                                <p>{{ language === 'km' ? m.km_name : m.en_name }}</p>
                                                            </div>
                                                        </div>
                                                    </NuxtLink>
                                                </div>
                                            </template>
                                        </div>
                                    </template>
                                    <div v-else class="nav-cat-select dt-n-cat-select">
                                        <div v-for="sub_parent in cate_sub.cate_line" :key="sub_parent" class="nav-cat-con-line">
                                            <NuxtLink v-for="(s, index) in sub_parent" :key="index" class="nav-cat-link" :to="localePath(click_category_search(s.slug, ''))">
                                                <div class="nav-cat-img">
                                                    <img :src="s.icon && s.icon.small ? s.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                                </div>
                                                <div class="nav-cat-text">
                                                    <div>
                                                        <p>{{ language === 'km' ? s.km_name : s.en_name }}</p>
                                                    </div>
                                                </div>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <!-- Small Sub Field Desktop -->
                                <template v-if="fields">
                                    <!-- show fields is popular true and type select -->
                                    <template v-for="(field, index) in fields" :key="index">
                                        <!-- is popular true && type select && chained_field is empty && fieldname is empty -->
                                        <div class="dt_right_con dt_border" v-if="field.popular && field.type === 'select' && field.options && !field.chained_field && (form[field.fieldname] === '' || form[field.fieldname] === undefined)">
                                            <div class="dt_right_title">{{ field.title }}</div>
                                            <nav class="navbar nav-sub-field-cate dt-res-n-s-f-c">
                                                <div>
                                                    <template v-for="val in field.options" :key="val">
                                                        <div @click="click_add_field(field.fieldname, val.fieldvalue)" class="n-s-f-c-a-tag cur_sur" :class="val.fieldvalue === form[field.fieldname] ? 'active-cate-font' : ''">
                                                            <div v-if="field.display_icon" :class="val.fieldvalue === form[field.fieldname] ? 'active-cate-bg' : ''" class="n-s-f-c-div-1">
                                                                <img :src="val.icon && val.icon.small ? val.icon.small.url : empty_img_profile" alt="icon" @error="imageUrlAlt_profile">
                                                            </div>
                                                            <div class="n-s-f-c-div-2">
                                                                <div><p>{{ val.fieldtitle }}</p></div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                            </nav>
                                        </div>
                                    </template>
                                    <!-- show fields is popular true, type select and "chained_field" value has in form search -->
                                    <template v-for="(field, index) in fields" :key="index">
                                        <nav v-if="field.popular && field.chained_field && form[field.chained_field] && arr_ad_model.length > 0" class="navbar s_l_search_ad_model dt-res-s-l-s-a-m dt_border">
                                            <div :class="arr_ad_model.length <= 8 ? 'width_100' : (var_more_model ? 'width_100' : 'width_100 s_l_show_more')">
                                                <ul class="list-unstyled s_l_s_ul">
                                                    <li class="text_ad_model">
                                                        {{ field.title }}:
                                                    </li>

                                                    <template v-for="val in arr_ad_model" :key="val">
                                                        <li v-if="val.fieldparentvalue === form[field.chained_field]" @click="click_add_model(field.fieldname, val.fieldvalue)">
                                                            <div class="truncate s_l_s_div cur_sur" :class="val.fieldvalue === form[field.fieldname] ? 's_l_field_active' : ''">
                                                                {{ val.fieldtitle }}
                                                            </div>
                                                        </li>
                                                    </template>
                                                </ul>
                                            </div>
                                            <div v-if="arr_ad_model.length > 14" @click="show_add_model" class="s_l_btn_show_more dt_res_list_btn_s_m">
                                                <button class="btn btn-link btn-sm btn-show-more" aria-label="Search">
                                                    {{ var_more_model ? $t('new_text.show_less') : $t('new_text.show_more') }}
                                                    <i :class="var_more_model ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                                                </button>
                                            </div>
                                        </nav>
                                    </template>
                                </template>

                                <!-- following profile -->
                                <div v-if="user_data && s_l_following_pro.length > 0 && route && route.query && route.query.following"
                                    class="following_con" :class="isDesktop ? 'dt_border' : ''">
                                    <div>
                                        <p class="fol-title">{{ $t('new_text_3.following') }}</p>
                                        <div class="fol-scroll">
                                            <div class="fol-flex">
                                                <template v-for="val in s_l_following_pro" :key="val">
                                                    <NuxtLink class="pro-following" :to="localePath({ name: 'username', params: { username: val.username } })"
                                                            @click="save_tracking_user({ placement: 'listing', is_search: search_tracking }, { clear: 'clr_old_data' })">
                                                        <div class="fol-img">
                                                            <img class="img_profile bg_reload_img" :src="val.photo && val.photo.medium ? val.photo.medium.url : empty_img_user" :alt="val.name" @error="imageUrlAlt_profile">
                                                        </div>
                                                        <div class="fol-name">
                                                            <p class="truncate">{{ val.name }}</p>
                                                        </div>
                                                    </NuxtLink>
                                                </template>
                                                <!-- show list following -->
                                                <NuxtLink :to="localePath({ name: 'username-follows', params: { username: user_data.user.username }, query: { type: 'following', from: 'listing' } })"
                                                        @click="save_track_optional('clear', { clear: 'clear_data' })" class="pro-following">
                                                    <div class="fol-icon-plus">
                                                        <span class="icon-plus icon_plus"></span>
                                                    </div>
                                                    <div class="fol-name">
                                                        <p class="truncate text-center">{{ $t('message.view_more') }}</p>
                                                    </div>
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Count Ads -->
                                <div class="dl_f_count">
                                    <div class="left">
                                        <h2 class="title truncate">
                                            {{ total_ads }} {{ $t('text_desktop.result_on') }} {{ time_search }} {{ route.query && route.query.keyword ? $t('text_desktop.for')+' '+$t('message.search')+' "'+route.query.keyword+'" '+$t('text_desktop.in_cambodia') : '' }}
                                        </h2>
                                    </div>
                                    <div class="dl_f_c_right">
                                        <ul>
                                            <li v-if="is_cate_job === false && posts.length > 0">
                                                <label>{{ $t('text_desktop.desk_view') }}</label>
                                                <span class="btn-group me-1" role="group">
                                                    <button @click="change_grid('list')" type="button" class="btn icon-list btn-change-view"
                                                            aria-label="List" :class="display_list && display_list.type === 'list' ? 'btn_active' : ''"></button>
                                                    <button @click="change_grid('grid')" type="button" class="btn btn-default icon-menu btn-change-view"
                                                            aria-label="Grid" :class="display_list && display_list.type === 'grid' ? 'btn_active' : ''"></button>
                                                </span>
                                            </li>
                                            <li v-if="short" class="dl_f_short">
                                                <label>{{ $t('text_desktop.short_by') }}</label>
                                                <button class="btn btn-sm dropdown-toggle dl_f_short_option" type="button" id="short_options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <template v-if="route && route.query && route.query.sortby">
                                                        <template v-for="sh in short.options" :key="sh">
                                                            <template v-if="sh.fieldvalue === form[short.fieldname]">
                                                                {{ sh.fieldtitle }}
                                                            </template>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        {{ short.title }}
                                                    </template>
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="short_options">
                                                    <template v-for="sh in short.options" :key="sh">
                                                        <div class="dropdown-item cur_sur" @click="selected_action_on_model(short.fieldname, sh.fieldvalue)">{{ sh.fieldtitle }}</div>
                                                    </template>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </template>

                            <!-- Listing Ads -->
                            <div :class="isDesktop ? 'screen_desktop' : 'mt-2'">
                                <div :id="isMobile ? '' : 'height_div'" class="flex_all_post lists_post_content"
                                    :class="is_cate_job || (display_list && display_list.type === 'list') ? (isDesktop ? 'dt_list_max_width' : 'list-max-width') : (display_list && display_list.type === 'grid' ? (isDesktop ? 'dt_grid_mg_post' : '') : '')">
                                    <!-- show unique on listing category job -->
                                    <template v-if="is_cate_job">
                                        <!-- show all open job resume -->
                                        <NuxtLink :to="localePath({ name: 'resumes'})" @click="loc_resume" class="bg-white  w-100 d-flex ps-2 pe-2" style="border-radius: 5px;margin:5.5px">
                                            <img :src="asset_url+version_library+'img/resume.svg'" alt="" class="mt-4 mb-2 " style="width: 100px;height: 100px;">
                                            <div class="ms-3 w-100">
                                                <div class="mt-4 mb-2">
                                                    <b >Looking for Talent?</b>
                                                </div>
                                                <div>
                                                    Let's find the best profile that fit for your origanization.
                                                </div>
                                                <div class="me-2" style="font-size:30px;text-align: right;color: rgb(0, 123, 255)">
                                                    <i class="fas fa-long-arrow-alt-right " ></i>
                                                </div>
                                            </div>
                                        </NuxtLink>
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
                                        <template v-for="(post, index) of posts" :key="index">
                                            <template v-if="post.data">
                                                <article v-if="post.type === 'post'" class="col-12 no_padding">
                                                    <div :class="isDesktop ? 'dt_list_mg_post' : 'list_items_post'">
                                                        <div class="u_border_cart">
                                                            <NuxtLink :to="localePath({ name: 'title-adid-id', params: { title: post.data && post.data.title ? check_title_char(post.data.title) : '.', id: post.data ? post.data.id : '' } })"
                                                                    @click="save_track_optional('tracking',{ placement: 'listing', display_type: 'list', item_count: posts.length, item_per_page: 30, current_index: index, is_search: search_tracking, paid: post.data && post.data.type !== 'normal' ? true : false, from: '' })">
                                                                <div class="_flex_">
                                                                    <div v-if="post.data && post.data.discount" class="position_absolute type_buy new_st_discount">
                                                                        <p class="new_st_dis_price">
                                                                            {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                                        </p>
                                                                        <p class="new_st_dis_text">OFF</p>
                                                                    </div>

                                                                    <div class="list-contain-img">
                                                                        <!-- options -->
                                                                        <div @click.prevent="show_options(post, { current_index: index, placement: 'listing', display_type: 'list', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                                            <i class="icon-ellipsis-vertical"></i>
                                                                        </div>
                                                                        <img :data-src="post.data && post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                                            :alt="post.data && post.data.title ? post.data.title : ''"
                                                                            class="lazy img_post_listing"
                                                                            :class="post.data && post.data.category && post.data.category.parent == 2 ? (!post.data.thumbnail ? 'u_img_post_by bg_reload_img_white' : 'u_img_post_by_job bg_reload_img_white') : 'u_img_post_by bg_reload_img_white'"
                                                                            :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                        <div v-if="post.data && post.data.photos && post.data.photos.length > 1" class="c-p-left">
                                                                            <div class="c-p-con">
                                                                                <i class="far fa-image"></i>
                                                                                <p>{{ post.data.photos ? post.data.photos.length : '0' }}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col u_p_col_">


                                                                        <div class="list_profile_des">

                                                                            <p class="l-p-title" v-text="post.data && post.data.title ? post.data.title : '...'"></p>
                                                                            <p class="truncate_wrap l-p-date-loc">
                                                                                <template v-if="post.data">
                                                                                    {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                                                    &#8226;
                                                                                    {{ post.data.location ? (language === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                                                                </template>
                                                                            </p>

                                                                            <p class="truncate_wrap l-p-date-loc">
                                                                                {{ post.data && post.data.condition ? post.data.condition.title : '' }}
                                                                                <template v-if="post.data && post.data.object_highlight_specs">
                                                                                    <template v-for="(v, k) of post.data.object_highlight_specs" :key="k">
                                                                                        &#8226; {{ v.display_value }}
                                                                                    </template>
                                                                                </template>
                                                                                <span v-else class="text-white">.</span>
                                                                            </p>

                                                                            <div class="list-price-des">
                                                                                <div v-if="post.data && post.data.shipping">
                                                                                    <i class="fas fa-truck"></i>
                                                                                    <p>{{ post.data.shipping.title }}</p>
                                                                                </div>
                                                                                <p v-if="post.data" class="truncate">
                                                                                    <strong>
                                                                                        {{ post.data.price && parseInt(post.data.price) > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{
                                                                                        post.data.price > 0 ? (post.data.category && post.data.category.parent == 2 ? '+' : '') : '' }}
                                                                                    </strong>
                                                                                    <span v-if="post.data.discount" class="line_price"> ${{ convert_price(post.data.discount.original_price) }} </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <template v-if="user_data && post.data && post.data.user && post.data.user.id === user_data.user.id"></template>
                                                                    <template v-else>
                                                                        <div v-if="post.setting && post.setting.enable_like" class="cl_ripple list-font-icon-heart" @click.prevent="click_like(post.data.id, post.data.is_like,
                                                                            { current_index: index, placement: 'listing', display_type: 'list', paid: post.data && post.data.type !== 'normal' ? true : false, from: '' })">
                                                                            <i v-if="post.data && post.data.is_like" class="fas fa-heart parent_color ver_icon"></i>
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
                                                                    category: post.data.category ? post.data.category.id : '',
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
                                                    <a rel="nofollow noopener" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank" aria-label="Banner">
                                                        <div>
                                                            <img :src="post.data.image" alt="image banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                                        </div>
                                                    </a>
                                                    <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                                                </div>
                                                <div v-else-if="post.type === 'highlight_ads'" class="highlight-ads">
                                                    <div class="con-follow-ads m-0">
                                                        <div class="con-f-a-title">
                                                            <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                                        </div>
                                                        <div class="flex_following_ads">
                                                            <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                                                <div class="s-hori-scroll">
                                                                    <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })" class="position_relative d_block"
                                                                            @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: posts.length, item_per_page: pageSize, current_index: inx, paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })">
                                                                        <!-- status show discount -->
                                                                        <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                                            <p class="new_st_dis_price">
                                                                                {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                                            </p>
                                                                            <p class="new_st_dis_text">OFF</p>
                                                                        </div>

                                                                        <div class="height_media position_relative">
                                                                            <!-- options -->
                                                                            <div @click.prevent="show_options(p, { current_index: inx, placement: 'listing', display_type: 'grid',
                                                                                paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                                                <i class="icon-ellipsis-vertical"></i>
                                                                            </div>
                                                                            <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'list',
                                                                                data: post.data, paid: p.data.type !== 'normal' ? true : false, from: 'highlight'}, { from: 'highlight_ads', data: post.data })" class=""></div>

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
                                                                            <img v-if="p.data.thumbnail"
                                                                                :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                                :alt="p.data.title ? p.data.title : ''"
                                                                                class="lazy height_media img_post_listing"
                                                                                :class="p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                                :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                            <!-- show title if image empty -->
                                                                            <div v-else class="empty_image_parent height_media">
                                                                                <div class="text-center empty_image_child">
                                                                                    <p class="m-0 font_18 empty_image_text">{{ p.data.title ? p.data.title : '' }}</p>
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
                                                                                {{ p.data.location ? (language === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
                                                                            </p>

                                                                            <p class="gr-p-price truncate">
                                                                                <strong>
                                                                                    {{ p.data.price > 0 ? '$'+convert_price(p.data.price) : $t('new_text.negotiable') }}{{ p.data.price > 0 && p.data.category && p.data.category.parent == 2 ? '+' : '' }}
                                                                                </strong>
                                                                                <span v-if="p.data.discount" class="line_price"> {{ '$'+convert_price(p.data.discount.original_price) }} </span>
                                                                            </p>
                                                                        </div>

                                                                        <template v-if="user_data && p.data.user && p.data.user.id === user_data.user.id"></template>
                                                                        <div v-else class="list_pad_icon_heart">
                                                                            <div v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like, { current_index: inx, placement: 'listing',
                                                            display_type: 'list', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })" class="cl_ripple">
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
                                                                index: inx,
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
                                    <!-- show simple -->
                                    <template v-else>
                                        <!-- list -->
                                        <template v-if="display_list && display_list.type === 'list'">
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
                                            <template v-for="(post, index) of posts" :key="index">
                                                <template v-if="post.data">
                                                    <template v-for="val in check_post_limit">
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
                                                                <NuxtLink  :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                                                        @click="save_track_optional('tracking', { placement: 'listing', display_type: 'list', item_count: posts.length, item_per_page: 30, current_index: index, is_search: search_tracking, paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                                    <div class="_flex_">
                                                                        <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                                            <p class="new_st_dis_price">
                                                                                {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                                            </p>
                                                                            <p class="new_st_dis_text">OFF</p>
                                                                        </div>

                                                                        <div class="list-contain-img">
                                                                            <!-- options -->
                                                                            <div @click.prevent="show_options(post, { current_index: index, placement: 'listing', display_type: 'list', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                                                <i class="icon-ellipsis-vertical"></i>
                                                                            </div>
                                                                            <img :data-src="post.data && post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                                                :alt="post.data.title ? post.data.title : ''"
                                                                                class="lazy img_post_listing"
                                                                                :class="post.data && post.data.category && post.data.category.parent == 2 ? (!post.data.thumbnail ? 'u_img_post_by bg_reload_img_white' : 'u_img_post_by_job bg_reload_img_white') : 'u_img_post_by bg_reload_img_white'"
                                                                                :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                            <div v-if="post.data.photos && post.data.photos.length > 1" class="c-p-left">
                                                                                <div class="c-p-con">
                                                                                    <i class="far fa-image"></i>
                                                                                    <p>{{ post.data.photos ? post.data.photos.length : '0' }}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col u_p_col_"> <!-- @click.self="show_detail(post.data.title, post.data.id)" -->


                                                                            <div class="list_profile_des">

                                                                                <p class="l-p-title" v-text="post.data.title ? post.data.title : '...'"></p>
                                                                                <p class="truncate_wrap l-p-date-loc">
                                                                                    {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                                                    &#8226;
                                                                                    {{ post.data.location ? (language === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
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
                                                                                            {{ post.data.price && parseInt(post.data.price) > 0 ? '$'+convert_price(post.data.price) : $t('new_text.negotiable') }}{{
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
                                                                            { current_index: index, placement: 'listing', display_type: 'list', paid: post.data.type !== 'normal' ? true : false, from: '' })">
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
                                                                        category: post.data.category ? post.data.category.id : '',
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
                                                        <a rel="nofollow noopener" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank" aria-label="Banner list">
                                                            <div>
                                                                <img :src="post.data.image" alt="image banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                                            </div>
                                                        </a>
                                                        <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                                                    </div>
                                                    <div v-else-if="post.type === 'highlight_ads'" class="highlight-ads">
                                                        <div class="con-follow-ads m-0">
                                                            <div class="con-f-a-title">
                                                                <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                                            </div>
                                                            <div class="flex_following_ads">
                                                                <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                                                    <div class="s-hori-scroll">
                                                                        <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })" class="position_relative d_block"
                                                                                @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: posts.length, item_per_page: pageSize, current_index: inx, paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })">
                                                                            <!-- status show discount -->
                                                                            <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                                                <p class="new_st_dis_price">
                                                                                    {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                                                </p>
                                                                                <p class="new_st_dis_text">OFF</p>
                                                                            </div>

                                                                            <div class="height_media position_relative">
                                                                                <!-- options -->
                                                                                <div @click.prevent="show_options(p, { current_index: inx, placement: 'listing', display_type: 'grid',
                                                                                    paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                                                    <i class="icon-ellipsis-vertical"></i>
                                                                                </div>
                                                                                <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'list',
                                                                                    paid: p.data.type !== 'normal' ? true : false, from: 'highlight'}, { from: 'highlight_ads', data: post.data })" class=""></div>

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
                                                                                <img v-if="p.data.thumbnail"
                                                                                    :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                                    :alt="p.data.title ? p.data.title : ''"
                                                                                    class="lazy height_media img_post_listing"
                                                                                    :class="p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                                    :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                <!-- show title if image empty -->
                                                                                <div v-else class="empty_image_parent height_media">
                                                                                    <div class="text-center empty_image_child">
                                                                                        <p class="m-0 font_18 empty_image_text">{{ p.data.title ? p.data.title : '' }}</p>
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
                                                                                    {{ p.data.location ? (language === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
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
                                                                                <div v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like, { current_index: inx, placement: 'listing',
                                                                                    display_type: 'list', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })" class="cl_ripple">
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
                                                                                index: inx,
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
                                            <template v-for="(post, index) of posts" :key="index">
                                                <template v-if="post.data">
                                                    <template v-for="val in check_post_limit">
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
                                                                <!-- info user post -->
                                                                <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })"
                                                                        @click="save_track_optional('tracking', { placement: 'listing', display_type: 'gallery', item_count: posts.length, item_per_page: 30, current_index: index, is_search: search_tracking, paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                                    <div> <!-- height_media position_relative -->
                                                                        <!-- options -->
                                                                        <div @click.prevent="show_options(post, { current_index: index, placement: 'listing', display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                                            <i class="icon-ellipsis-vertical"></i>
                                                                        </div>
                                                                        <!-- if image count = 1 -->
                                                                        <template v-if="post.data.photos && post.data.photos.length === 1">
                                                                            <!-- show count image of post -->
                                                                            <!--<div v-if="post.data.photos && post.data.photos.length > 1" class="amount_img_post">
                                                                                <p>{{ post.data.photos.length }}</p>
                                                                                <i class="fas fa-camera"></i>
                                                                            </div>-->
                                                                            <!-- image post -->
                                                                            <div class="view-img-1">
                                                                                <img v-if="post.data.thumbnail"
                                                                                    :data-src="post.data.thumbnail"
                                                                                    :alt="post.data.title ? post.data.title : ''"
                                                                                    class="lazy height_media img_post_listing"
                                                                                    :class="post.setting && post.setting.enable_apply_job ? 'img-job' : 'img-simple-post'"
                                                                                    :src="empty_img_loading" @error="imageUrlAlt_post" />
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
                                                                                    :alt="post.data.title ? post.data.title : ''" class="lazy img-3-1" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                <div>
                                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                                                        :alt="post.data.title ? post.data.title : ''" class="lazy img-3-2" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)"
                                                                                        :alt="post.data.title ? post.data.title : ''" class="lazy img-3-3" :src="empty_img_loading" @error="imageUrlAlt_post" />
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
                                                                                    :alt="post.data.title ? post.data.title : ''" class="lazy" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                <div>
                                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)"
                                                                                        :alt="post.data.title ? post.data.title : ''" class="lazy img-4-1" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                    <img :data-src="post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)"
                                                                                        :alt="post.data.title ? post.data.title : ''" class="lazy img-4-2" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                    <img v-if="post.data.photos.length <= 4"
                                                                                        :data-src="post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)"
                                                                                        :alt="post.data.title ? post.data.title : ''" class="lazy img-4-3" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                    <div v-else>
                                                                                        <img :data-src="post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)"
                                                                                            :alt="post.data.title ? post.data.title : ''" class="lazy img-4-3" :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                        <span>+{{ post.data.photos.length - 4 }}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <!--<img :src='post.data.thumbnails ? post.data.thumbnails[0] : (post.data.photos[0] ? post.data.photos[0] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                                <div>
                                                                                    <img class="img-4-1" :src='post.data.thumbnails ? post.data.thumbnails[1] : (post.data.photos[1] ? post.data.photos[1] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                                    <img class="img-4-2" :src='post.data.thumbnails ? post.data.thumbnails[2] : (post.data.photos[2] ? post.data.photos[2] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
                                                                                    <img v-if="post.data.photos.length <= 4 " class="img-4-3" :src='post.data.thumbnails ? post.data.thumbnails[3] : (post.data.photos[3] ? post.data.photos[3] : empty_img_post)' :alt="post.data.title ? post.data.title : ''" @error="imageUrlAlt_post">
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
                                                                                {{ post.data.location ? (language === 'km' ? post.data.location.km_name3 : post.data.location.en_name3) : '' }}
                                                                            </p>

                                                                            <p v-if="post.data.price > 0" class="list_view_post_price">
                                                                                <strong>{{ 1 > parseInt(post.data.price) ? '$'+post.data.price : '$'+convert_price(post.data.price) }}{{ post.data.price > 0 && post.data.category && post.data.category.parkmt == 2 ? '+' : '' }}</strong>
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
                                                                                <i @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'gallery',
                                                                                paid: post.data.type !== 'normal' ? true : false, from: ''})" class="icon-share2"></i>
                                                                            </div>
                                                                        </template>
                                                                        <template v-else>
                                                                            <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like, { current_index: index, placement: 'listing',
                                                                                display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="list_view_action cur_sur cl_ripple">
                                                                                <i v-if="post.data.is_like" class="fas fa-heart parent_color font_icon"></i>
                                                                                <i v-else class="icon-Heart"></i>
                                                                                <p :class="post.data.is_like ? 'parent_color' : ''">{{ $t('new_text.like') }}</p>
                                                                            </div>
                                                                            <div v-if="post.setting && post.setting.enable_chat" class="list_view_action cur_sur cl_ripple"
                                                                            @click.prevent="show_chat(post.data.id, { current_index: index, placement: 'listing', display_type: 'gallery', paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                                                <i class="icon-messenger"></i>
                                                                                <p>{{ $t('message.chat') }}</p>
                                                                            </div>
                                                                            <div @click.prevent="detectMob(post.data.id, post.data.short_link, {index: index, display_type: 'gallery',
                                                                                paid: post.data.type !== 'normal' ? true : false, from: ''},{ detail: post })" :id="`share_${post.data.id}`" class="list_view_icon_share cur_sur">
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
                                                                        category: post.data.category ? post.data.category.id : '',
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
                                                        <a rel="nofollow noopener" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank" aria-label="Image Banner">
                                                            <div>
                                                                <img :src="post.data.image" alt="image banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                                            </div>
                                                        </a>
                                                        <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                                                    </div>
                                                    <div v-else-if="post.type === 'highlight_ads'" class="highlight-ads">
                                                        <div class="con-follow-ads m-0">
                                                            <div class="con-f-a-title">
                                                                <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                                            </div>
                                                            <div class="flex_following_ads">
                                                                <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                                                    <div class="s-hori-scroll">
                                                                        <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })" class="position_relative d_block"
                                                                                @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: posts.length, item_per_page: pageSize, current_index: inx, paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })">
                                                                            <!-- status show discount -->
                                                                            <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                                                <p class="new_st_dis_price">
                                                                                    {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                                                </p>
                                                                                <p class="new_st_dis_text">OFF</p>
                                                                            </div>

                                                                            <div class="height_media position_relative">
                                                                                <!-- options -->
                                                                                <div @click.prevent="show_options(p, { current_index: inx, placement: 'listing', display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                                                    <i class="icon-ellipsis-vertical"></i>
                                                                                </div>
                                                                                <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'gallery',
                                                                                    paid: p.data.type !== 'normal' ? true : false, from: 'highlight'}, { from: 'highlight_ads', data: post.data })" class=""></div>

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
                                                                                <img v-if="p.data.thumbnail"
                                                                                    :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                                    :alt="p.data.title ? p.data.title : ''"
                                                                                    class="lazy height_media img_post_listing"
                                                                                    :class="p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                                    :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                <!-- show title if image empty -->
                                                                                <div v-else class="empty_image_parent height_media">
                                                                                    <div class="text-center empty_image_child">
                                                                                        <p class="m-0 font_18 empty_image_text">{{ p.data.title ? p.data.title : '' }}</p>
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
                                                                                    {{ p.data.location ? (language === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
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
                                                                                <div v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like, { current_index: inx, placement: 'listing',
                                                                                    display_type: 'gallery', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })" class="cl_ripple">
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
                                                                                index: inx,
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
                                        </template>
                                        <!-- grid -->
                                        <template v-else>
                                            <article v-if="posts.length > 0" class="a-n-ads-par-grid" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
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
                                            <template v-for="(post, index) of posts" :key="index">
                                                <template v-for="val in check_post_limit">
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
                                                
                                                <template v-if="post.data">
                                                    <article v-if="post.type === 'post'" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
                                                        <div class="list_items_post">
                                                            <div class="my_card p-h">
                                                                <!-- info user post -->
                                                                <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: post.data.title ? check_title_char(post.data.title) : '.', id: post.data.id } })" class="position_relative d_block"
                                                                        @click="save_track_optional('tracking', { placement: 'listing', display_type: 'grid', item_count: posts.length, item_per_page: 30, current_index: index, is_search: search_tracking, paid: post.data.type !== 'normal' ? true : false, from: '' })">
                                                                    <!-- status show discount -->
                                                                    <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                                        <p class="new_st_dis_price">
                                                                            {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                                        </p>
                                                                        <p class="new_st_dis_text">OFF</p>
                                                                    </div>

                                                                    <div class="height_media position_relative">

                                                                        <!-- options -->
                                                                        <div @click.prevent="show_options(post, { current_index: index, placement: 'listing', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="grid-opt-post">
                                                                            <i class="icon-ellipsis-vertical"></i>
                                                                        </div>
                                                                        <div :id="`share_${post.data.id}`" @click.prevent="detectMob(post.data.id, post.data.short_link,
                                                                            {index: index, display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: ''})" class=""></div>

                                                                        <!-- show shipping count photos -->
                                                                        <div class="c-p-list-post">
                                                                            <div v-if="post.data.shipping" class="free_shipping_list_post">
                                                                                <i class="fas fa-truck"></i>
                                                                                <p>{{ post.data.shipping.title }}</p>
                                                                            </div>
                                                                            <div class="c-p-con" v-if="post.data.photos && post.data.photos.length > 1">
                                                                                <i class="far fa-image"></i>
                                                                                <p>{{ post.data.photos.length }}</p>
                                                                            </div>
                                                                        </div>

                                                                        <!-- image post -->
                                                                        <img v-if="post.data.thumbnail"
                                                                            :data-src="post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                                            :alt="post.data.title ? post.data.title : ''"
                                                                            class="lazy height_media img_post_listing"
                                                                            :class="post.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                            :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                        <!-- show title if image empty -->
                                                                        <div v-else class="empty_image_parent height_media">
                                                                            <div class="text-center empty_image_child">
                                                                                <p class="m-0 font_18 empty_image_text">{{ post.data.title ? post.data.title : '' }}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div class="grid-list-des">
                                                                        <p class="truncate gr-p-title" v-text="post.data.title ? post.data.title : '...'"></p>

                                                                        <p class="truncate gr-p-date-loc">
                                                                            {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                                            &#8226;
                                                                            {{ post.data.location ? (language === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
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
                                                                        <div v-if="post.setting && post.setting.enable_like" @click.prevent="click_like(post.data.id, post.data.is_like, { current_index: index,
                                                                            placement: 'listing', display_type: 'grid', paid: post.data.type !== 'normal' ? true : false, from: '' })" class="cl_ripple">
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
                                                                        category: post.data.category ? post.data.category.id : '',
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
                                                        <a rel="nofollow noopener" v-if="post.data.type === 'image'" :href="check_link_banner(post.data.link)" target="_blank" aria-label="Image Banner">
                                                            <div>
                                                                <img :src="post.data.image" alt="image banner" :style="{ 'max-width': `${post.data.width}px`, 'max-height': `${post.data.height}px`, 'min-height': `${post.data.height/2}px` }">
                                                            </div>
                                                        </a>
                                                        <div v-else-if="post.data.type === 'code' && post.data.new_html_banner" v-html="post.data.new_html_banner" class="text-center"></div>
                                                    </div>
                                                    <div v-else-if="post.type === 'highlight_ads'" class="highlight-ads">
                                                        <div class="con-follow-ads m-0">
                                                            <div class="con-f-a-title">
                                                                <p>HIGHLIGHTS<span class="icon-temp_preferences_custom_FILL1_wght300_GRAD0_opsz48"></span></p>
                                                            </div>
                                                            <div class="flex_following_ads">
                                                                <article v-for="(p, inx) of post.data" :key="inx" class="show-list-follow" :class="inx === (post.data.length - 1) ? 'pad-right' : ''">
                                                                    <div class="s-hori-scroll">
                                                                        <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: p.data.title ? check_title_char(p.data.title) : '.', id: p.data.id } })" class="position_relative d_block"
                                                                                @click="save_track_optional('tracking', { placement: 'home', display_type: 'grid', item_count: posts.length, item_per_page: pageSize, current_index: inx, paid: p.data.type !== 'normal' ? true : false, from: 'highlight' })">
                                                                            <!-- status show discount -->
                                                                            <div v-if="p.data.discount" class="position_absolute type_buy new_st_discount">
                                                                                <p class="new_st_dis_price">
                                                                                    {{ p.data.discount.type === 'percent' ? parseInt(p.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(p.data.discount.discount)) }}
                                                                                </p>
                                                                                <p class="new_st_dis_text">OFF</p>
                                                                            </div>

                                                                            <div class="height_media position_relative">
                                                                                <!-- options -->
                                                                                <div @click.prevent="show_options(p, { current_index: inx, placement: 'listing', display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' }, { from: 'highlight_ads'})" class="grid-opt-post">
                                                                                    <i class="icon-ellipsis-vertical"></i>
                                                                                </div>
                                                                                <div :id="`share_${p.data.id}`" @click.prevent="detectMob(p.data.id, p.data.short_link, {index: inx, display_type: 'grid',
                                                                                    paid: p.data.type !== 'normal' ? true : false, from: 'highlight'},{ from: 'highlight_ads', data: post.data })" class=""></div>

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
                                                                                <img v-if="p.data.thumbnail"
                                                                                    :data-src="p.data.thumbnail ? p.data.thumbnail : empty_img_post"
                                                                                    :alt="p.data.title ? p.data.title : ''"
                                                                                    class="lazy height_media img_post_listing"
                                                                                    :class="p.setting.enable_apply_job ? 'img_product_contain bg_reload_img_white' : 'img_product bg_reload_img'"
                                                                                    :src="empty_img_loading" @error="imageUrlAlt_post" />
                                                                                <!-- show title if image empty -->
                                                                                <div v-else class="empty_image_parent height_media">
                                                                                    <div class="text-center empty_image_child">
                                                                                        <p class="m-0 font_18 empty_image_text">{{ p.data.title ? p.data.title : '' }}</p>
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
                                                                                    {{ p.data.location ? (language === 'km' ? p.data.location.km_name2 : p.data.location.en_name2) : '' }}
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
                                                                                <div v-if="p.setting && p.setting.enable_like" @click.prevent="click_like(p.data.id, p.data.is_like, { current_index: inx, placement: 'listing',
                                                                                    display_type: 'grid', paid: p.data.type !== 'normal' ? true : false, from: 'highlight' },{ from: 'highlight_ads' })" class="cl_ripple">
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
                                                                                index: inx,
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
                                        </template>
                                    </template>
                                </div>
                            </div>

                            <template v-if="isDesktop">
                                <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                                    <div v-if="posts.length > 0" class="text-center mt-4 mb-4">
                                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                    </div>
                                    <div v-else class="flex_all_post full_width">
                                        <div v-for="index in 10" :key="index" class="desk_list_grid_1">
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
                                <div v-else class="des_btn_load_more">
                                    <button v-if="hide_btn_load_more" @click="load_more_manual" class="btn">{{ $t('text_desktop.load_more') }}</button>
                                    <div v-else-if="posts.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <ClientOnly>
                                    <VueEternalLoading :load="search_post_data" :key="reset_again" v-model:is-initial="isInitial" margin="800px">
                                        <template #loading>
                                            <div v-if="posts.length > 0" class="text-center mt-4 mb-4">
                                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                            </div>
                                            <div v-else class="flex_all_post full_width">
                                                <div v-for="index in 10" :key="index" :class="isMobile ? 'width_list_grid' : 'width_list_grid_dt'">
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
                                        <template #error="{ retry }">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                                                <div class="no_more_result p-2">
                                                    <div class="p_bg_status">
                                                        <span class="fas fa-wifi size_icon_status"></span>
                                                        <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                                        <p class="font_16 pt-2 pb-2 ps-3 pe-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                                        <button aria-label="Retry" type="button" @click="retry(), get_slide_filter_categories()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <template #no-more>
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
                                <br><br><br>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <ClientOnly>
                <!-- modal Post Filter -->
                <div class="modal fade style_full_screen" id="modal_post_filter" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
                    <div class="modal-dialog modal_dialog_style" role="document">

                        <div class="modal-content modal_content_style" >
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                                <div class="_div_nav bg_app_bar_header_">
                                    <div id="close_modal_query_str" @click="show_modal_search('hide_modal')" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                                        <button aria-label="Close Modal" class="btn clear-btn-app-bar">
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
                            
                            <div class="modal-body p-0 mb-5">
                                <div class="margin_below_app_bar" :class="isMobile ? 'mt-5' : ''">
                                    <div class="form-group p_div_pad_color pt-1 max_width_form">

                                        <div v-if="loading_modal_search">
                                            <div v-for="index in 3" :key="index" class="mb-4">
                                                <div class="animated-background mb-2" style="height: 20px;width: 20%;border-radius: 4px;"></div>
                                                <div class="animated-background"  style="height: 48px;width: 100%;border-radius: 4px;"></div>
                                            </div>
                                        </div>
                                        <template v-else>
                                            <!-- search field -->
                                            <div class="mb-3">
                                                <label class="label"> {{ $t('message.search') }} </label>
                                                <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="clear_text_search">
                                            </div>
                                            <!-- short option -->
                                            <div class="mb-3 position_relative" v-if="short">
                                                <label class="label"> {{ short.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"  v-model="form[short.fieldname]">
                                                    <option  v-if="!form[short.fieldname]" :value="form[short.fieldname]">{{short.value.fieldtitle}}</option>
                                                    <option  v-else value="">{{short.value.fieldtitle}}</option>
                                                    <template v-for="(option,index) in short.options" :key="option">
                                                        <option v-if="index !== 0" v-bind:value="option.fieldvalue ">{{ option.fieldtitle }}</option>
                                                    </template>

                                                    <!-- <option  v-for="option in short.options" :key="option" v-bind:value="option.fieldvalue ">
                                                        {{ option.fieldtitle }}
                                                    </option> -->
                                                </select>

                                            </div>
                                            <!-- date option -->
                                            <div class="mb-3 position_relative" v-if="date">
                                                <label class="label"> {{ date.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[date.fieldname]">
                                                    <option value="">  </option>
                                                    <option v-for="option in date.options" :key="option" v-bind:value="option.fieldvalue">
                                                        {{ option.fieldtitle }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- provinces -->
                                            <div class="mb-3 position_relative" v-if="location && location.province">
                                                <label class="label"> {{ location.province.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="location" @change="show_data_districts($event)" v-model="form['province']">
                                                    <option value="">  </option>
                                                    <template v-if="locations && locations.data">
                                                        <option v-for="location in locations.data" :key="location" v-bind:value="location.slug">
                                                            {{ language === 'km' ? location.km_name : location.en_name }}
                                                        </option>
                                                    </template>
                                                </select>
                                            </div>
                                            <!-- districts -->
                                            <div class="mb-3 position_relative" v-if="location && location.district">
                                                <label class="label"> {{ location.district.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="district" id="district" :disabled="!form['province']" @change="show_data_communes($event)" v-model="form['district']">
                                                    <option value="">  </option>
                                                    <option v-for="district in districts" :key="district" v-bind:value="district.slug">
                                                        {{ language === 'km' ? district.km_name : district.en_name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- commutes -->
                                            <div class="mb-3 position_relative" v-if="location && location.commune">
                                                <label class="label"> {{ location.commune.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="commune" id="commune" :disabled="!form['district']" v-model="form['commune']">
                                                    <option value="">  </option>
                                                    <option v-for="commune in communes" :key="commune" v-bind:value="commune.slug">
                                                        {{ language === 'km' ? commune.km_name : commune.en_name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- prices -->
                                            <template v-if="price">
                                                <div class="mb-3" v-for="s_p in price" :key="s_p">
                                                    <div v-if="s_p.type === 'min_max'" class="style_flex">
                                                        <div class="col p-0 me-2">
                                                            <label class="label"> {{ s_p.title }} </label>
                                                            <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.min_field.title+' '+ s_p.min_field.prefix.text"
                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.min_field.fieldname]"
                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                maxlength = "11">
                                                        </div>
                                                        <div class="col p-0 ms-2">
                                                            <label class="label text-white">.</label>
                                                            <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.max_field.title+' '+ s_p.max_field.prefix.text"
                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.max_field.fieldname]"
                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                maxlength = "11">
                                                        </div>
                                                    </div>

                                                    <div v-else-if="s_p.type === 'switch'">
                                                        <label class="label"> {{ price.discount.title }} </label>
                                                        <div class="height_switch" :class="isMobile ? 'ps-1 pt-1 field-height' : 'dt-field-height'">
                                                            <div class="custom-switch form-switch form-check d-flex p_">
                                                                <input type="checkbox" @click="change_discount" class="form-check-input check_box_h" v-model="form[s_p.fieldname]" id="radio_discount">
                                                                <label class="custom-control-label full_width ms-2 pt-1 font_16" for="radio_discount" > {{ form[s_p.fieldname] ? 'Yes' : 'No' }} </label>
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
                                            <div class="mb-3" v-if="deliveries">
                                                <label class="label"> {{ deliveries.shipping.title }} </label>
                                                <div class="height_switch" :class="isMobile ? 'ps-1 pt-1 field-height' : 'field-height'">
                                                    <div class="custom-switch form-switch form-check d-flex p_">
                                                        <input  type="checkbox" @click="change_delivery" class="form-check-input check_box_h" v-model="form['shipping']" id="radio_delivery">
                                                        <label class="custom-control-label full_width ms-2 pt-1 font_16" for="radio_delivery" > {{ form['shipping'] ? 'Yes' : 'No' }} </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- fields -->
                                            <template v-if="fields">
                                                <div class="mb-3" v-for="(s_f, index) in fields" :key="index">
                                                    <!-- type select -->
                                                    <template v-if="s_f.type === 'select' && s_f.options">
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
                                                                <template v-if="form[s_f.chained_field]"> <!-- && s_f.options.length > 0 -->
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
                                                            <div class="col p-0 me-2">
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
                                                            <div class="col p-0 ms-2">
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
                                                                <input type="radio" :id="'all_'+form[s_f.fieldname]+'_'+index" v-model="form[s_f.fieldname]">
                                                                <label :for="'all_'+form[s_f.fieldname]+'_'+index"><p class="m-0">{{ $t('message.all') }}</p></label>
                                                            </div>
                                                            <div v-for="(va, ix) of s_f.options" :key="ix" class="col p_pad_radio_option">
                                                                <input type="radio" :id="va.fieldvalue+'_a_'+ix" v-model="form[s_f.fieldname]" :value="va.fieldvalue">
                                                                <label :for="va.fieldvalue+'_a_'+ix"><p class="m-0">{{ va.fieldtitle }}</p></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- text -->
                                                    <div v-else-if="s_f.type === 'text'">
                                                        <label class="label"> {{ s_f.title }} </label>
                                                        <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" class="form-control custom_field more_border" v-model="form[s_f.fieldname]"
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
                            <template ><br><br></template>

                            <div class="nav p_div_apply_filter pt-2">
                                <button @click="click_search('')" type="button" class="btn fns-17 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                    {{ $t('message.apply_filter') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="modal_post_filter_dt" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable m-auto m_w" role="document">

                        <div class="modal-content rounded">
                            
                            <div class="modal-header m_h_p">
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

                            <div class="modal-body p-0">
                                <div class="margin_below_app_bar">
                                    <div class="form-group p_div_pad_color pt-1 max_width_form">

                                        <div v-if="loading_modal_search">
                                            <div v-for="index in 3" :key="index" class="mb-4">
                                                <div class="animated-background mb-2" style="height: 20px;width: 20%;border-radius: 4px;"></div>
                                                <div class="animated-background"  style="height: 48px;width: 100%;border-radius: 4px;"></div>
                                            </div>
                                        </div>
                                        <template v-else>
                                            <!-- search field -->
                                            <div class="mb-3">
                                                <label class="label"> {{ $t('message.search') }} </label>
                                                <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="clear_text_search">
                                            </div>
                                            <!-- short option -->
                                            <div class="mb-3 position_relative" v-if="short">
                                                <label class="label"> {{ short.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[short.fieldname]">
                                                    <option  v-if="!form[short.fieldname]" :value="form[short.fieldname]">{{short.value.fieldtitle}}</option>
                                                    <option  v-else value="">{{short.value.fieldtitle}}</option>
                                                    <template v-for="(option,index) in short.options" :key="option">
                                                        <option v-if="index !== 0" v-bind:value="option.fieldvalue ">{{ option.fieldtitle }}</option>
                                                    </template>

                                                    <!-- <option  v-for="option in short.options" :key="option" v-bind:value="option.fieldvalue ">
                                                        {{ option.fieldtitle }}
                                                    </option> -->
                                                </select>

                                            </div>
                                            <!-- date option -->
                                            <div class="mb-3 position_relative" v-if="date">
                                                <label class="label"> {{ date.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[date.fieldname]">
                                                    <option value="">  </option>
                                                    <option v-for="option in date.options" :key="option" v-bind:value="option.fieldvalue">
                                                        {{ option.fieldtitle }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- provinces -->
                                            <div class="mb-3 position_relative" v-if="location && location.province">
                                                <label class="label"> {{ location.province.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="location" @change="show_data_districts($event)" v-model="form['province']">
                                                    <option value="">  </option>
                                                    <template v-if="locations && locations.data">
                                                        <option v-for="location in locations.data" :key="location" v-bind:value="location.slug">
                                                            {{ language === 'km' ? location.km_name : location.en_name }}
                                                        </option>
                                                    </template>
                                                </select>
                                            </div>
                                            <!-- districts -->
                                            <div class="mb-3 position_relative" v-if="location && location.district">
                                                <label class="label"> {{ location.district.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="district" id="district" :disabled="!form['province']" @change="show_data_communes($event)" v-model="form['district']">
                                                    <option value="">  </option>
                                                    <option v-for="district in districts" :key="district" v-bind:value="district.slug">
                                                        {{ language === 'km' ? district.km_name : district.en_name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- commutes -->
                                            <div class="mb-3 position_relative" v-if="location && location.commune">
                                                <label class="label"> {{ location.commune.title }} </label>
                                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="commune" id="commune" :disabled="!form['district']" v-model="form['commune']">
                                                    <option value="">  </option>
                                                    <option v-for="commune in communes" :key="commune" v-bind:value="commune.slug">
                                                        {{ language === 'km' ? commune.km_name : commune.en_name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- prices -->
                                            <template v-if="price">
                                                <div class="mb-3" v-for="s_p in price" :key="s_p">
                                                    <div v-if="s_p.type === 'min_max'" class="style_flex">
                                                        <div class="col p-0 me-2">
                                                            <label class="label"> {{ s_p.title }} </label>
                                                            <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.min_field.title+' '+ s_p.min_field.prefix.text"
                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.min_field.fieldname]"
                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                maxlength = "11">
                                                        </div>
                                                        <div class="col p-0 ms-2">
                                                            <label class="label text-white">.</label>
                                                            <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.max_field.title+' '+ s_p.max_field.prefix.text"
                                                                class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="form[s_p.max_field.fieldname]"
                                                                oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                                maxlength = "11">
                                                        </div>
                                                    </div>

                                                    <div v-else-if="s_p.type === 'switch'">
                                                        <label class="label"> {{ price.discount.title }} </label>
                                                        <div class="height_switch " :class="isMobile ? 'ps-1 pt-1 field-height' : 'field-height'">
                                                            <div class="custom-switch form-switch form-check d-flex p_">
                                                                <input type="checkbox" @click="change_discount" class="form-check-input check_box_h" v-model="form[s_p.fieldname]" id="radio_discount">
                                                                <label class="custom-control-label full_width ms-2 pt-1 font_16" for="radio_discount" > {{ form[s_p.fieldname] ? 'Yes' : 'No' }} </label>
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
                                            <div class="mb-3" v-if="deliveries">
                                                <label class="label"> {{ deliveries.shipping.title }} </label>
                                                <div class="height_switch " :class="isMobile ? 'ps-1 pt-1 field-height' : 'field-height'">
                                                    <div class="custom-switch form-switch form-check d-flex p_">
                                                        <input  type="checkbox" @click="change_delivery" class="form-check-input check_box_h" v-model="form['shipping']" id="radio_delivery">
                                                        <label class="custom-control-label full_width ms-2 pt-1 font_16" for="radio_delivery" > {{ form['shipping'] ? 'Yes' : 'No' }} </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- fields -->
                                            <template v-if="fields">
                                                <div class="mb-3" v-for="(s_f, index) in fields" :key="index">
                                                    <!-- type select -->
                                                    <template v-if="s_f.type === 'select' && s_f.options">
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
                                                                <template v-if="form[s_f.chained_field]"> <!-- && s_f.options.length > 0 -->
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
                                                            <div class="col p-0 me-2">
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
                                                            <div class="col p-0 ms-2">
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
                                                                <input type="radio" :id="'all_'+form[s_f.fieldname]+'_'+index" v-model="form[s_f.fieldname]">
                                                                <label :for="'all_'+form[s_f.fieldname]+'_'+index"><p class="m-0">{{ $t('message.all') }}</p></label>
                                                            </div>
                                                            <div v-for="(va, ix) of s_f.options" :key="ix" class="col p_pad_radio_option">
                                                                <input type="radio" :id="va.fieldvalue+'_a_'+ix" v-model="form[s_f.fieldname]" :value="va.fieldvalue">
                                                                <label :for="va.fieldvalue+'_a_'+ix"><p class="m-0">{{ va.fieldtitle }}</p></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- text -->
                                                    <div v-else-if="s_f.type === 'text'">
                                                        <label class="label"> {{ s_f.title }} </label>
                                                        <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" class="form-control custom_field more_border" v-model="form[s_f.fieldname]"
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
                            <div class="modal-footer p-0">
                                <button @click="click_search('')" type="button" class="btn fns-17 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                   {{ $t('message.apply_filter') }} 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /modal Post Filter -->
            </ClientOnly>

            <!-- modal Search -->
            <Modal_search :clear_search_suggestion="clear_val_suggestion_popup"/>
            <!-- /modal Search -->

            <!-- Modal show error connection -->
            <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
                <div class="modal-dialog max_width_form mg-mo-auto" role="document">
                    <div class="modal-content" style="min-height: unset!important;">
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
                                        <div class="col _flex_ p-0 mt-1">
                                            <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                                            <p class="img_share_option_color">Facebook</p>
                                        </div>
                                    </div>
                                </li>
                                <li @click="twitter_sharing" class="mobile_modal_action py-2">
                                    <div class="cur_sur color_reason">
                                        <div class="col _flex_ p-0 mt-1">
                                            <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                                            <p class="img_share_option_color">Twitter</p>
                                        </div>
                                    </div>
                                </li>
                                <li @click="copy_link(share_link)" class="mobile_modal_action py-2">
                                    <div class="cur_sur color_reason">
                                        <div class="col _flex_ p-0 mt-1">
                                            <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                                            <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                                            <!--<input id="copy_link" class="hide_copy_text" type="text" :value="share_link">-->
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

            <!-- show success message -->
            <div class="toast style_toast d-none toast_search_post toast_z_index"> <!-- role="alert" aria-live="polite" aria-atomic="true" data-delay="6000" -->
                <div class="toast-header header_padding_toast">
                    <strong class="me-auto style_flex">
                        <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                        <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                        <p class="m-0 ms-2"> {{ message_success ? message_success : $t('lng.report_success') }} </p>
                    </strong>
                    <!--<small>11 mins ago</small>-->
                    <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <!-- /show success message -->

            <!-- Modal show locations -->
            <div class="modal fade style_full_screen" id="show_modal_list_location" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div  class="modal-content animate-bottom">
                        <div class="s_content">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <template v-if="multiple_locations && type_loc !== 'province'">
                                    <button @click="back_location(type_loc)" class="btn de-btn-back ion-ios-arrow-back" aria-label="Close"></button>
                                </template>
                                <button v-else data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ $t('message.location') }} </p>
                                <button @click="click_choose_location('', '')" class="btn de-btn-plus font_15">{{ $t('message.clear') }}</button>
                            </div>
                            <!-- <div class="modal-header m_h_p">
                                <template v-if="multiple_locations && type_loc !== 'province'">
                                    <button @click="back_location(type_loc)" type="button" class="btn ion-ios-arrow-back fn_24" aria-label="Close"></button>
                                </template>
                                <button v-else data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear fn_24"></button>
                                <p class="name_style truncate_wrap m-0"> {{ $t('message.location') }} </p>
                                
                                <div class="_pad_col_icon">
                                    <button class="btn clear s_pad_clear "  @click="click_choose_location('', '')"> {{ $t('message.clear') }}</button>
                                </div>
                            </div> -->
                            <!-- content -->
                            <div >
                                <div class="modal-body de-head-quick_chat">
                                    <!-- loading on multiple locations -->
                                    <div v-if="loading_loc_multiple" class="mg-loc-modal">
                                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                                    </div>
                                    <template v-else>
                                        <ul v-if="multiple_locations" class="list-unstyled bg-white"> <!-- multiple select locations -->
                                            <li v-if="type_loc !== 'province'" @click="request_mul_loc" class="full_field_tag cur_sur h-v-mouse parent_color font_bold">
                                                {{ type_loc === 'district' ? 'Show all ads in '+n_m_province : (type_loc === 'commune' ? 'Show all ads in '+n_m_district : 'Show ads all locations') }}
                                            </li>
                                            <template v-for="loc in arr_mul_loc" :key="loc">
                                                <li @click="multiple_loc(type_loc, loc.slug, language === 'km' ? loc.km_name : loc.en_name)" class="full_field_tag cur_sur h-v-mouse">
                                                    {{ language === 'km' ? loc.km_name : loc.en_name }}

                                                    <i v-if="(type_loc === 'province' && route.query.province === loc.slug) || (type_loc === 'district' && route.query.district === loc.slug) || (type_loc === 'commune' && route.query.commune === loc.slug)"
                                                    class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                                    <i v-else class="ion-ios-arrow-forward float-end text_grey"></i>
                                                </li>
                                            </template>
                                        </ul>
                                        <template v-else> <!-- single select location -->
                                            <ul v-if="locations && locations.data" class="list-unstyled bg-white">
                                                <li v-for="location in locations.data" :key="location" @click="click_choose_location('change', location.slug)" class="full_field_tag cur_sur h-v-mouse">
                                                    {{ language === 'km' ? location.km_name : location.en_name }}
                                                    <i v-if="(is_province_search === location.slug) || (var_province === location.slug)" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                                </li>
                                            </ul>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show locations -->

            <!-- Modal show short -->
            <div class="modal fade style_full_screen" id="modal_short_filter" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content animate-bottom">
                        <div class="s_content">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ short ? short.title : '' }} </p>
                                <button v-if="short && short.type !== 'radio'" @click="selected_action_on_model(short.fieldname, '')" class="btn de-btn-plus font_15">{{ $t('message.clear') }}</button>
                                <button v-else class="btn de-btn-plus font_15"></button>
                            </div>
                            <!-- <div class="modal-header m_h_p">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div class="col text-center">
                                    <p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p>
                                </div>
                                <div v-if="route && route.query && route.query.sortby"  class="_pad_col_icon">
                                    <button class="btn clear s_pad_clear " @click="selected_action_on_model(short.fieldname, '')">
                                        {{ $t('message.clear') }}
                                    </button>
                                </div>
                                <div v-else  class="_pad_col_icon"><button class="btn clear s_pad_clear ">​​</button></div>
                            </div> -->
                            <!-- content -->
                            <div >
                                <div v-if="short" class="modal-body de-head-quick_chat1">
                                    <ul class="list-unstyled bg-white">
                                        <li v-for="option in short.options" :key="option" @click="selected_action_on_model(short.fieldname, option.fieldvalue)" class="full_field_tag cur_sur h-v-mouse">
                                            {{ option.fieldtitle }}
                                            <span v-if="form[short.fieldname]">
                                                <i v-if="option.fieldvalue === form[short.fieldname]" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                                            </span>
                                            <span v-else>
                                                <i v-if=" short && short.value.fieldvalue === option.fieldvalue" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i> 
                                                <!-- <i v-if=" short && short.value.fieldvalue === option.fieldvalue" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i> -->
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show short -->

            <!-- Modal show price -->
            <div class="modal fade style_full_screen" id="modal_price_filter" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content animate-bottom">
                        <div class="s_content">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ price && price.ad_price ? price.ad_price.title : '' }} </p>
                                <button v-if="price && price.ad_price" @click="clear_price(price.ad_price.max_field.fieldname, price.ad_price.min_field.fieldname)"
                                        class="btn de-btn-plus font_15">{{ $t('message.clear') }}</button>
                            </div>
                            <!-- <div class="modal-header m_h_p">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div class="col text-center">
                                    <p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p>
                                </div>
                                <div class="_pad_col_icon">
                                    <button class="btn clear s_pad_clear " @click="clear_filter">
                                        {{ $t('message.clear') }}
                                    </button>
                                </div>
                            </div> -->
                            <!-- content -->
                            <div v-if="price && price.ad_price" >
                                <div class="mb-1" v-for="s_p in price" :key="s_p">
                                    <!-- prices -->
                                    <div v-if="s_p.type === 'min_max'" >
                                        <div class="style_flex p-3">
                                            <div class="col p-0 me-2">
                                                <label class="label"> {{ s_p.title }} </label>
                                                <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.min_field.title+' '+ s_p.min_field.prefix.text"
                                                    class="form-control custom_field more_border" v-model="form[s_p.min_field.fieldname]"
                                                    oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                    maxlength = "11">
                                            </div>
                                            <div class="col p-0 ms-2">
                                                <label class="label text-white">.</label>
                                                <input type="number" pattern="[0-9]*" decimal="true" @keypress="onlyNumber" v-bind:placeholder="s_p.max_field.title+' '+ s_p.max_field.prefix.text"
                                                    class="form-control custom_field more_border" v-model="form[s_p.max_field.fieldname]"
                                                    oninput="javascript: if (value.length > maxLength) value = value.slice(0, maxLength);"
                                                    maxlength = "11">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- button search -->
                                    <div v-if="s_p.type === 'min_max'" class="p-3 pt-0">
                                        <button @click="click_search('')" type="button" class="btn btn-sm fns-17 btn-k24-secondary custom_btn_ width_100">
                                            <p class="m_text_btn"> {{ $t('message.apply_filter') }} </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show price -->

            <!-- Modal show year -->
            <div class="modal fade style_full_screen" id="modal_year_filter" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content animate-bottom">
                        <div class="s_content">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ year ? year.title : '' }} </p>
                                <button v-if="year" @click="clear_year(year.max_field.fieldname, year.min_field.fieldname)"
                                        class="btn de-btn-plus font_15">{{ $t('message.clear') }}</button>
                            </div>
                            <div v-if="year" >
                                <div class="mb-1">
                                    <div class="style_flex p-3">
                                        <div v-if="year.min_field" class="col p-0 me-2">
                                            <label class="label"> {{ year.min_field.title }} </label>
                                            <select class="form-select" v-model="form[year.min_field.fieldname]" aria-label="Default select example">
                                                <template v-for="val in year.min_field.options">
                                                    <option :value="val.fieldvalue">{{ val.fieldtitle }}</option>
                                                </template>
                                            </select>
                                        </div>
                                        <div v-if="year.max_field" class="col p-0 ms-2">
                                            <label class="label"> {{ year.max_field.title }} </label>
                                            <select v-model="form[year.max_field.fieldname]" class="form-select" aria-label="Default select example">
                                                <template v-for="val in year.max_field.options">
                                                    <option :value="val.fieldvalue">{{ val.fieldtitle }}</option>
                                                </template>
                                            </select>
                                        </div>
                                    </div>
                                    <!-- button search -->
                                    <div class="p-3 pt-0">
                                        <button @click="click_search('')" type="button" class="btn btn-sm fns-17 btn-k24-secondary custom_btn_ width_100">
                                            <p class="m_text_btn"> {{ $t('message.apply_filter') }} </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show year -->

            <!-- Modal show ad_condition -->
            <div class="modal fade style_full_screen" id="modal_ad_condition_filter" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style" role="document">
                    <div class="modal-content animate-bottom">
                        <div class="s_content">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100"> {{ fields && fields.ad_condition ? fields.ad_condition.title : '' }} </p>
                                <button @click="selected_action_on_model(fields.ad_condition.fieldname, '')"
                                        class="btn de-btn-plus font_15">{{ $t('message.clear') }}</button>
                            </div>
                            <!-- <div class="modal-header m_h_p">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div class="col text-center">
                                    <p class="name_style truncate_wrap m-0"> {{ fields && fields.ad_condition ? fields.ad_condition.title : '' }} </p>
                                </div>
                                <div class="_pad_col_icon">
                                    <button class="btn clear s_pad_clear "  @click="selected_action_on_model(fields.ad_condition.fieldname, '')">
                                        {{ $t('message.clear') }}
                                    </button>
                                </div>
                            </div> -->
                            <!-- content -->
                            <div v-if="fields && fields.ad_condition" class="modal-body">
                                <!-- prices -->
                                <label class="label"> {{ fields.ad_condition.title }} </label>
                                <div class="radio-new-or-second-hand text-center row m-0">
                                    <div class="col p_pad_radio_option">
                                        <input type="radio" :id="'all_a_'+form[fields.ad_condition.fieldname]" v-model="form[fields.ad_condition.fieldname]" value="">
                                        <label :for="'all_a_'+form[fields.ad_condition.fieldname]"><p class="m-0">{{ $t('message.all') }}</p></label>
                                    </div>
                                    <div v-for="(va, ix) in fields.ad_condition.options" :key="ix" class="col p_pad_radio_option">
                                        <input type="radio" :id="va.fieldvalue+'_b_'+ix" v-model="form[fields.ad_condition.fieldname]" :value="va.fieldvalue">
                                        <label :for="va.fieldvalue+'_b_'+ix"><p class="m-0">{{ va.fieldtitle }}</p></label>
                                    </div>
                                </div>
                                <!-- button search -->
                                <div class="mt-3">
                                    <button @click="click_search('')" type="button" class="btn btn-sm fns-17 btn-k24-secondary custom_btn_ width_100">
                                        <p class="m_text_btn"> {{ $t('message.apply_filter') }} </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show ad_condition -->

            <!-- Modal show field have icon -->
            <div class="modal fade" :class="isMobile ? 'style_full_screen u_safety_bg' : ''" id="show_modal_field_have_icon" tabindex="-1" role="dialog">
                <div class="modal-dialog" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-scrollable m-auto top_60 pos_static'" role="document">
                    <div class="modal-content" :class="isMobile ? '' : 'rounded'"> <!-- animate-bottom -->
                        <div v-if="detail_field" :class="isMobile ? 's_content overflow_class ' : 'border p-3'">
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

            <!-- modal show options post -->
            <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_actions_post" tabindex="-1" role="dialog">
                <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                    <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 's_content p-3 bg-modal overflow_class ' : 'p-3'">
                            <!-- content -->
                            <div class="modal-body de-content-modal-option">
                                <ul class="list-unstyled mobile_modal_actions_container">
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

                                    <template v-if="user_data && detail_one_post && detail_one_post.data && detail_one_post.data.user && detail_one_post.data.user.id === user_data.user.id"></template>
                                    <template v-else>
                                        <li @click="save_manual_post(detail_one_post && detail_one_post.data && detail_one_post.data.is_saved ? 'unsave' : 'save', 'confirm')" class="mobile_modal_action cur_sur">
                                            <i :class="detail_one_post && detail_one_post.data && detail_one_post.data.is_saved ? 'fa fa-bookmark' : 'far fa-bookmark'"></i>
                                            <p class="mb-0">{{ detail_one_post && detail_one_post.data && detail_one_post.data.is_saved ? $t('new_text.un_save') : $t('new_text.save') }}</p>
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
            <div class="modal fade"  :class="isMobile ? 'style_full_screen' : ''" id="show_modal_list_report_post" tabindex="-1" role="dialog">
                <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                    <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 's_content' : 'dt_modal_width p-3'">
                            <div class="border_bottom m-r-p-pad">
                                <p class="modal-title font_15"> {{ $t('message.report_this_post') }} </p>
                            </div>
                            <div class="modal-body p-0 overflow_content">
                                <ul class="list-unstyled bg-white">
                                    <template v-if="report_post && report_post.data">
                                        <li @click="choose_report(re.value)" v-for="re in report_post.data" :key="re" class="full_field_tag cur_sur">
                                            {{ language === 'km' ? re.km : re.en }}
                                            <i v-if="re.value === report_check" class="fas fa-check color_sub_icon mt-1 float-end c_orange"></i>
                                        </li>
                                    </template>
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
        </template>
    </div>
</template>

<script setup>
    import Multiselect from '@vueform/multiselect'
    import Modal_search from "/components/Pop_up_search_key_word";
    import Page_404 from "/components/404";
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";

    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");
    const empty_img_loading = ref('/icon/img-loader.gif');
    const mainCate = useState('mainCate',()=>[])
    const subCate = useState('subCate',()=>[])

    const value = ref([]);      // ['Select option'],
    const options = ref([]);    // ['Select option', 'Disable me!', 'Reset me!', 'multiple', 'label', 'searchable'],

    const loading = ref(false);
    const dt_loading = ref(false);
    const loading_field = ref(false);
    const loading_modal_search = ref(false);

    const cookie_view = useCookie('grid_homepage'); // useCookie from nuxt3 document.
    const display_list = ref(cookie_view._rawValue ? cookie_view._rawValue : {"type":"grid"});

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    // const language = ref(helper.get_lang_cookie());
    const { locale } = useI18n();
    const language = ref(locale.value)
    const localePath = useLocalePath()
    
    const user_data = ref('');
    const categories = ref('');

    // breadcrumb categories
    const all_categories = ref('');
    const r_slug = ref(route.params && route.params.slugCategory ? route.params.slugCategory : ''); // param slug categories

    const main_cate = ref([]);
    const sub_cate = ref([]);

    const cate_main = ref([]);
    const cate_sub = ref([]);

    const count_badge_chat = ref(0);
    const is_404 = ref(false);
    const is_slide_show = ref(true);
    const refresh_carousel = ref(1); // key for refresh data in carousel categories when it change value.

    const detail_one_post = ref(''); // specific post that click icon option in list.
    const ads_come_from = ref('');   // store click from my_following; highlight or posts.
    const data_tracking = ref('');   // store data tracking in specific index in list grid or gallery.
    // report
    const report_post = ref([]);
    const report_check = ref('');
    const description = ref('');

    const total_ads = ref(0);
    const time_search = ref('');
    const hide_btn_load_more = ref(true);

    const slide_show = ref([]);
    const pageSize = ref(0);
    const posts = ref([]);
    const posts_id = ref([]);
    const meta = ref('');
    const arr_ad_model = ref([]); // short by ad_field and store data ad_model in this array.

    const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again).
    const reset_again = ref(1);

    const check_screen_device = ref(false); // check screen pc or phone, true = phone screen,  false = pc
    const post_id = ref(''); // store id of one post.
    const share_link = ref('');
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const is_province_search = ref(route && route.query && route.query.province ? route.query.province : ''); // for show check in modal list province in quick location.

    /* cache for posts */
    const s_l_catch_path = useState('s_l_catch_path', () => []);
    const s_l_catch_data_post = useState('s_l_catch_data_post', () => []);

    /* cache for filter */
    const s_l_catch_cat_path = useState('s_l_catch_cat_path', () => []);
    const s_l_catch_data_cat = useState('s_l_catch_data_cat', () => []);

    /* cache slide banner */
    const s_l_catch_banner_path = useState('s_l_catch_banner_path', () => []);
    const s_l_catch_data_banner = useState('s_l_catch_data_banner', () => []);

    const s_l_following_pro = useState('s_l_following_pro', () => []); // array show following profile

    const s_l_old_path = useState('s_l_old_path', () => ''); // store old path for watch only query change

    const s_l_old_full_path = useState('s_l_old_full_path', () => ''); // store full old path for clear old data post
    const is_post_server = useState('is_post_server', () => true); // check is request from server already, not allow to request in clientSide (when reload page)

    const short = ref(null);
    const date = ref(null);
    const location = ref(null);
    const price = ref(null);
    const year = ref(null);
    const fields = ref(null);
    const deliveries = ref(null);

    const discount = ref(false);   // show discount price

    // field locations for modal search query
    const locations = ref([]);
    const districts = ref([]);     // field districts for modal search query
    const communes = ref([]);      // field communes for modal search query

    const form = ref({});
    const slug = ref(route.params && route.params.slugCategory ? route.params.slugCategory : ''); // get slug category from params
    const show_category_name = ref('');

    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const r_n = helper.clear_prefix_route_name(route.name); // clean route.name without prefix km, en or /.

    // --- set oun category that get from custom route link url ---
    const set_SEO_category = ref('');

    // --- variable data in field search modal ---
    const clear_text_search = ref('');

    const detail_field = ref(''); // detail one field that show in list modal that fields have icon.

    // --- value for check category job or not ---
    const is_cate_job = ref(false); // true = category job (not allow to show btn switch list)

    // --- value for check category Parent OR Sub ---
    const is_parent_or_sub = ref(''); // parent = cate parent; sub = cate sub

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_7 = ref(0);
    const reload_q_again_3 = ref(0); const reload_q_again_4 = ref(0);
    const reload_q_again_5 = ref(0); const reload_q_again_6 = ref(0);

    // --- value for condition show categories in header scroll list ---
    const cate_parent_id = ref(''); // category parent id only.
    const s_active = ref(0);     // if 1 = mean the first come this page, bigger than 1 not the first. prevent show active on child category.
    const var_more_model = ref(false); // true show less, false show more, on field add_model lists.
    const var_province = ref(''); // store province if change ah quick in UI, for make sure dom change.

    // --- search tracking data ---
    const search_tracking = ref('');
    const data_meta = ref('');

    // --- share tracking ---
    const current_index = ref('');
    const placement = ref('');
    const display_type = ref('');

    // --- arr impression check id ---
    const arr_impression = ref([]);
    const timer_auto_impression = ref('');
    const check_sent = ref(true); // true = allow setInterval, false = not allow setInterval.

    // --- check screen height ---
    const clear_val_suggestion_popup = ref(0);
    const owl_carousel_drag = ref(0);
    const not_allow_re_render_carousel = ref(true);

    // --- check is multiple locations ---
    const multiple_locations = ref(''); // condition show or hide template mul loc
    const type_loc = ref('');     // type select
    const arr_mul_loc = ref([]);  // array dynamic mul loc
    const a_m_province = ref([]); // array province
    const a_m_district = ref([]); // array district
    const a_m_commune = ref([]);  // array commune
    const v_m_province = ref(''); // value province
    const v_m_district = ref(''); // value district
    const v_m_commune = ref('');  // value commune
    const n_m_province = ref(''); // name province
    const n_m_district = ref(''); // name district
    const n_m_commune = ref('');  // name commune
    const loading_loc_multiple = ref(false); // loading request mul loc
    const r_name = ref(helper.clear_prefix_route_name(route.name));
    const namePro = ref('')
    const routeL = ref('')
    
    const rout_tt = ref(route.params.slugCategory ? route.params.slugCategory : '');
    const tt = ref( window && window.location ? window.location.host+'/c-'+rout_tt.value : '')
    const isMobile= ref(helper.m_or_d())
    const recaptcha = useRecaptcha();
    const store_r = useState('store_r',()=>'')
    const check_show = useState('check_show', ()=> 0)
    const check_limit = useState('check_limit', ()=> [])
    const check_post = useState('check_post',()=> 0)
    const check_post_limit = useState('check_post_limit',()=> [])

    // ---- check SEO from link url ----
        // -- Phones && Tablets || House & Lands || Jobs --
        if (
            r_n === 'mobiles.html' || r_n === 'property.html' || r_n === 'jobs.html' ||
            r_n === 'mobiles' || r_n === 'property' || r_n === 'jobs'
        ) {
            if (r_n === 'mobiles.html' || r_n === 'mobiles') set_SEO_category.value = 'mobile-phones-tablets';
            if (r_n === 'property.html' || r_n === 'property') set_SEO_category.value = 'property-housing-rentals';
            if (r_n === 'jobs.html' || r_n === 'jobs') set_SEO_category.value = 'jobs';
            slug.value = set_SEO_category.value;

        } else if (
            r_n === 'jobs-subcategory.html' || r_n === 'mobiles-subcategory.html' || r_n === 'property-subcategory.html' ||
            r_n === 'jobs-subcategory' || r_n === 'mobiles-subcategory' || r_n === 'property-subcategory'
        ) {
            set_SEO_category.value = route.params.subcategory;

        } else if (r_n === 'mobiles-subcategory-ad_field.html' || r_n === 'mobiles-subcategory-ad_field') {
            set_SEO_category.value = route.params.subcategory;
            form.value['ad_field'] = route.params && route.params.ad_field ? route.params.ad_field : '';
        }

        // -- Cars || Motorcycles --
        else if (
            r_n === 'cars.html' || r_n === 'motorcycles.html' ||
            r_n === 'cars' || r_n === 'motorcycles'
        ) {
            if (r_n === 'cars.html' || r_n === 'cars') set_SEO_category.value = 'cars-and-vehicles';
            if (r_n === 'motorcycles.html' || r_n === 'motorcycles') set_SEO_category.value = 'motorcycles-for-sale';
            slug.value = set_SEO_category.value;

        } else if (
            r_n === 'cars-ad_field.html' || r_n === 'motorcycles-ad_field.html' ||
            r_n === 'cars-ad_field' || r_n === 'motorcycles-ad_field'
        ) {
            if (r_n === 'cars-ad_field.html' || r_n === 'cars-ad_field') set_SEO_category.value = 'cars-for-sale';
            if (r_n === 'motorcycles-ad_field.html' || r_n === 'motorcycles-ad_field') set_SEO_category.value = 'motorcycles-for-sale';
            form.value['ad_field'] = route.params && route.params.ad_field ? route.params.ad_field : '';

        } else if (
            r_n === 'cars-ad_field-ad_model.html' || r_n === 'motorcycles-ad_field-ad_model.html' ||
            r_n === 'cars-ad_field-ad_model' || r_n === 'motorcycles-ad_field-ad_model'
        ) {
            if (r_n === 'cars-ad_field-ad_model.html' || r_n === 'cars-ad_field-ad_model') set_SEO_category.value = 'cars-for-sale';
            if (r_n === 'motorcycles-ad_field-ad_model.html' || r_n === 'motorcycles-ad_field-ad_model') set_SEO_category.value = 'motorcycles-for-sale';
            form.value['ad_field'] = route.params && route.params.ad_field ? route.params.ad_field : '';
            form.value['ad_model'] = route.params && route.params.ad_model ? route.params.ad_model : '';
            // setTimeout(() => { change_ad_field(''); }, 1000); // clear disable and show data in field select
        }
    // ---- /check SEO from link url ----

    const google_json_SEO = useState('google_json_SEO', () => '');
    useJsonld(() => (
        google_json_SEO.value
    ));

    if (process.server) {
        // tt.value = window.location.host+'/c-'+rout_tt.value;
        if (set_SEO_category.value) { // only click to mobile view from khmer24.com (must to custom url)
            router.replace(localePath({ name: 'c-slugCategory', params: { slugCategory: set_SEO_category.value },
                query: { ad_field: form.value['ad_field'], ad_model: form.value['ad_model'] } }));

        } else {
            await loadCategories();
            await check_filter_page();
            await get_list_post_server();
            await SEO_google_schema();
        }
    }

    // const { locale } = useI18n();
    const store_r_n = useState('store_r_n',()=> '')
    onMounted(() => {
        if (process.client) {
            setTimeout(()=>{
                h_categoery()
            },25)
            
            check_show.value = 0
            check_limit.value = []
            if(route.params && route.params.slugCategory){
                if(store_r.value !== route.params.slugCategory  ){
                    check_post.value = 0
                    check_post_limit.value = []
                }
                store_r.value = route.params.slugCategory
            }
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            routeL.value = route.params.province
            change_grid();
            // getL();
            check_new_auth_user();
            categories.value = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : '';
            locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];
            // get categories data
            loadCategories();
            if (isDesktop && posts.value.length === 0) {
                load_more_manual(); // In Desktop View and post empty for the first, must to get new data.
            }
            // -- add route name for check in watch for the_first or reload the page (prevent watch different route path) --
            s_l_old_path.value = route.path;
            let path = route.fullPath; // full path url
            // --- clear catch old data ---
            // - if params the_first exist from url, must to clear posts & add new posts (only click form: choose category, home page, search result and page 404) -
            const params_first = pa_con && pa_con.first && pa_con.first.d_params ? pa_con.first.d_params : ''; // check first from params.
            if (params_first && params_first.first === 'the_first') {
                s_l_catch_path.value = [];        // clear path
                s_l_catch_data_post.value = [];   // clear post
                s_l_following_pro.value = [];     // clear following
                // -- if user click view more from search_result --
                let check_page_size = params_first.page_size ? params_first.page_size : 0;
                if (check_page_size) {
                    pageSize.value = check_page_size;
                    let obj = {"path": path};
                    obj['data'] = {
                        "meta": '',                          // store meta
                        "post_id": [],                       // post_id
                        "offset": parseInt(check_page_size), // add offset
                        "posts": [],                         // add posts to new path
                    };
                    s_l_catch_path.value.push(path);       // create new path for check latter
                    s_l_catch_data_post.value.push(obj);
                }

                // -- clear catch "Filter" --
                s_l_catch_cat_path.value = [];
                s_l_catch_data_cat.value = [];

                // -- clear catch "Banner" --
                s_l_catch_banner_path.value = [];
                s_l_catch_data_banner.value = [];

                // -- reset scroll loader, prevent scroll not load, still stuck loading --
                setTimeout(() => { reset_again.value+=1; }, 700); // reset scroll loader again by :key change.

                s_l_old_full_path.value = route.fullPath; // -- fullPath of url --

                helper.clear_params_make_con('first'); // clear params "first"

                // console.log('mounted "the_first"');

                // - if in same page and category change (mounted work again) -
            } else {

                // --- clear catch post listing when query change (else need to store catch again just remove this condition out) ---
                if (s_l_old_full_path.value === route.fullPath) {
                    // console.log('=====> Mounted the same path <=====');
                } else {
                    // -- "is_post_server" check prevent clear data serverSide and request in clientSide again. (request server and client the same time).
                    if (is_post_server.value) {
                        s_l_catch_path.value = [];        // clear path
                        s_l_catch_data_post.value = [];   // clear post
                        s_l_old_full_path.value = route.fullPath; // store new fullPath
                        // console.log('=====> Mounted different path <=====');
                    } else {
                        is_post_server.value = true;
                    }
                }

                // --- Show Old Data (when go to detail and click back)---
                if (s_l_catch_path.value.includes(path)) {
                    $.each(s_l_catch_data_post.value, (k, v) => {
                        if (v.path === path) {
                            meta.value = v.data.meta ? v.data.meta : '';
                            data_meta.value = meta.value; // -- add meta_data to setup() function --
                            pageSize.value = v.data.offset;
                            posts.value = v.data.posts;
                            posts_id.value = v.data.post_id;

                            setTimeout(() => {
                                is_404.value = false;        // clear it prevent click category on page 404 still show.
                            }, 1000);
                            return false;
                        }
                    });
                    // console.log('mounted old data');

                    // --- Show New Data ---
                } else {
                    setTimeout(() => { reset_again.value+=1; }, 700); // reset scroll loader again by :key change.
                    // console.log('mounted new data');
                }
            }

            slide_show_by_category();  // get banner slide show
            check_filter_page();       // get data filter page asd
            create_field_categories(); // check and show full name of category in App Bar, check list post job and so on....
            ripple();

            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            // --- check category ---
            if (categories.value && route.params && route.params.slugCategory) {
                check_category(route.params.slugCategory);
            }

            // --- clean data search for tracking ---
            clean_search();

            // --- my following ---
            check_following_profile();

            // --- tracking API ---
            Tracking();

            reload_lazy_img(); // load lazy image.

            


            if(route.query.province){
                getLoc()
            }
        }
        
    })

    watch(() => route.query, () => {
        // console.log(route)
        check_post.value = 0
        check_post_limit.value = []
        if(route.query.province){
            getLoc()
        }
        if (route.path === s_l_old_path.value) {

            // --- clear catch post listing when query change (else need to store catch again just remove this condition out) ---
            if (s_l_old_full_path.value === route.fullPath) {
                // console.log('=====> Watch the same path <=====');
            } else {
                // -- "is_post_server" check prevent clear data serverSide and request in clientSide again. (request server and client the same time).
                s_l_old_full_path.value = route.fullPath; // store new fullPath
                s_l_catch_path.value = [];        // clear path
                s_l_catch_data_post.value = [];   // clear post
                // console.log('=====> Watch different path <=====');
            }
            // when query data change in url, not allow to render carousel again.
            not_allow_re_render_carousel.value = false;
            // if path exist in catch paths
            let path = route.fullPath;
            if (s_l_catch_path.value.includes(path)) {
                posts.value = []; // clear
                $.each(s_l_catch_data_post.value, (k, v) => {
                    if (v.path === path) {
                        meta.value = v.data.meta ? v.data.meta : '';
                        data_meta.value = meta.value; // -- add meta_data to setup() function --
                        pageSize.value = v.data.offset;
                        posts.value = v.data.posts;
                        posts_id.value = v.data.post_id;
                        setTimeout(() => {
                            is_404.value = false;        // clear it prevent click category on page 404 still show.
                        }, 700);
                        return false;
                    }
                });
            // else load new data
            } else {
                // console.log('watch new data');
                is_404.value = false; // clear it prevent click category on page 404 still show.
                pageSize.value = 0;
                posts.value = [];
                posts_id.value = [];
                isInitial.value = true;      // reset scroll loader again.
            }

            // --- get slug category from url when click search or change category (from params or query) ---
            set_SEO_category.value = '';     // clear SEO category
            slug.value = route.params && route.params.slugCategory ? route.params.slugCategory : '';

            slide_show_by_category();  // watch route change to get slide show by category
            check_filter_page();       // change filter when router change
            create_field_categories(); // check and show full name of category in App Bar, check list post job and so on....
            ripple();

            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            // --- clean data search for tracking ---
            clean_search();

            // --- clear drag && scroll click carousel ---
            owl_carousel_drag.value = 0;

            // --- tracking API ---
            Tracking();

            // --- check is province exist in search ---
            is_province_search.value = route && route.query && route.query.province ? route.query.province : '';

            if (isDesktop) { // if desktop view must to auto click manual function
                load_more_manual();
            }

        } else {
            // console.log('----> different path <----');
            s_l_old_path.value = route.path;
        }
    })

    const ct = ref('')
    function h_categoery(){
        let cate = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : '';
        if(cate){
            mainCate.value = []
            subCate.value = []
            cate.data.forEach(cate => {
                if(cate.parent === '0'){
                    mainCate.value.push(cate)
                }
                if(cate.parent !== '0'){
                    subCate.value.push(cate)
                }
            });
        }
        $.each(subCate.value , function(index, sub) { 
            if(sub.slug === route.params.slugCategory){
                $.each(mainCate.value , function(index, main) { 
                    if(main.id === sub.parent){
                        ct.value = main
                    }
                });
            }
        });
    }

    function showDropdown(){
        $(".condition").addClass("show");
    }
    function getLoc(){
        const local = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];
        if(local.length === 0 ){
            $fetch(config.VUE_APP_API_URL+'locations').then(res=>{
                localStorage.setItem("locations",JSON.stringify(res))
                const result = res.data
                result.forEach(val=>{
                    if( val.slug === route.query.province){
                        namePro.value = locale.value==='km' ? val.km_name : val.en_name
                        n_m_province.value = namePro.value
                    }
                })
            })
        }else{
            local.data.forEach(val=>{
                if( val.slug === route.query.province){
                    namePro.value = locale.value==='km' ? val.km_name : val.en_name
                }
                
            })
        }
    }

    // const rout_tt = ref(route.params.slugCategory ? route.params.slugCategory : '');
    function getL(){
        tt.value = window.location.host+'/c-'+rout_tt.value;
    }

    function c_action(type) {
        if(type === 'discount'){
            if(route && route.query && route.query.discount){
                form.value['discount'] = false;       // add value to field name in form data.
                click_search('');
            }else{
                form.value['discount'] = true;       // add value to field name in form data.
                click_search('');
            }
        }
        if(type === 'delivery'){
            if(route && route.query && route.query.shipping){
                form.value['shipping'] = false;       // add value to field name in form data.
                click_search('');
            }else{
                form.value['shipping'] = true;       // add value to field name in form data.
                click_search('');
            }
        }
    }

    // ---- create SEO google schema ----
    async function SEO_google_schema() {
        let Main_arr = [];
        let f_url = language.value === 'km' ? config.VUE_APP_BASE_URL+'km' : config.VUE_APP_BASE_URL+'en'; // current full link of project.
        let empty_img = config.VUE_LINK+empty_img_post.value;

        // -- Breadcrumb --
        let nav = [
            { 'name': 'Home', 'link': config.VUE_LINK },
            // { 'name': 'test', 'link': '' }
        ];
        if (is_parent_or_sub.value === 'parent') {
            for (let j = 0; j < all_categories.value.length; j++) {
                let s = all_categories.value[j];
                if (s.slug === r_slug.value) {
                    nav.push({ 'name': s.km_name ? (language.value === 'km' ? s.km_name : s.en_name) : 'Unknown', 'link': '' });
                }
            }
        } else if (is_parent_or_sub.value === 'sub') {
            for (let j = 0; j < all_categories.value.length; j++) {
                let s = all_categories.value[j];
                if (s.slug === r_slug.value) {
                    for (let k = 0; k < all_categories.value.length; k++) {
                        let p_cate = all_categories.value[k];
                        if (s.parent === p_cate.id) {
                            nav.push({
                                'name': p_cate.km_name ? (language.value === 'km' ? p_cate.km_name : p_cate.en_name) : 'Unknown',
                                'link': f_url + '/' + p_cate.slug
                            });
                        }
                    }
                    nav.push({'name': language.value === 'km' ? s.km_name : s.en_name, 'link': ''});
                }
            }
        }
        let breadcrumbData = helper.GL_SEO_breadcrumb(nav);
        breadcrumbData['@context'] = "https://schema.org/";
        Main_arr.push(breadcrumbData);

        // -- PostList --
        let arr_product = []; let arr_jobs = [];
        let re_seo = posts.value ? posts.value : '';
        // console.log(re_seo);
        if (re_seo && re_seo.length > 0) {
            let re_p_data = {"@context": "https://schema.org/"};
            re_p_data["@type"] = "ItemList";
            re_p_data["url"] = f_url+route.fullPath; // url of the current page
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




  // ---- get list post in server side ----
  async function get_list_post_server() {
    try {
      let query_str = {
        fields: 'thumbnails,thumbnail,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
        functions: 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]',
        filter_version: '4',
        meta: 'true',
        offset: pageSize.value,
      }

      // --- if have following user or store post ---
      if (user_data.value && route && route.query && route.query.following) {
        query_str['followed'] = true;
      }

      // --- check keyword from query ---
      if (route && route.query && route.query.keyword) { query_str['keyword'] = route.query.keyword; }
      // --- check slugCategory ---
      if (set_SEO_category.value) {
        query_str['category'] = helper.clean_html_text(set_SEO_category.value);    // slugCategory that click link from google
      } else {
        if (route && route.params && route.params.slugCategory) {                  // slugCategory from url params
          query_str['category'] = helper.clean_html_text(route.params.slugCategory);
        }
      }
      // --- get value and key from v-model to search ---
      if (Object.keys(form.value).length > 0) {
        Object.entries(form.value).forEach(([key, val], index) => {
          // query_str[key] = form.value[key];
          if (key === 'category') {
            // when refresh page, it gone all query
          } else {
            query_str[key] = route.query[key] ? route.query[key] : form.value[key];
          }
        });
      // --- if form.value not exist must to create query from url, if have search in url ---
      } else {
        let query = route.query;
        if (Object.keys(query).length > 0) {
          Object.entries(query).forEach(([k, val], index) => {
            if (/*k === 'slug_category' ||*/ k === 'keyword') {
              // this key generate above, so not allow to have it again
            } else {
              query_str[k] = val; // generate key and value for search from query url when form.value not exist
            }
          });
        }
      }
      // --- check province from query when category not exist ---
      if (route.params && !route.params.slugCategory) { // if category exist this condition ot working.
        query_str['province'] = route.query.province;
      }
      // --- check ad_feature is multiple select so reab data tam ning ---
      var data_feature = value.value ? value.value : '';
      if (Array.isArray(data_feature)) {
        for (var i = 0; i < data_feature.length; i++) {
          query_str['ad_features['+i+']'] = data_feature[i];
        }
      } else {
        if (data_feature) {
          query_str['ad_features[0]'] = data_feature;
        }
      }

      const token_auth = useCookie('auth_user');
      const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
      // const reqUrl = config.VUE_APP_URL_POST_NEW + 'feed';
      const reqUrl = config.VUE_APP_API_URL_POST_NEW + 'feed';
      const { data: res_list_post } = await useFetch(reqUrl, {
          // key: reqUrl,
          headers: {
              "Display-Type": isMobile.value ? 'mobile_view' : 'desktop',
              "Access-Token": tokens,
          },
          params: query_str,
      })

      let path = route.fullPath;
      let data = res_list_post.value ? res_list_post.value.data : [];
      if (data.length) {
        let arr_tmp = []; let arr_post_id = [];
        Object.entries(data).forEach(([key, val], index) => {
        // $.each(data, (key, val) => { // loop data posts.
          if (val.type === 'post') {
            if (val.data.type === 'normal') {                 // check duplicate post only data type === normal
              if (!posts_id.value.includes(val.data.id)) {    // check not exist OR (posts_id.value.indexOf(value.data.id) === -1)
                arr_post_id.push(val.data.id);                // push id of post prevent show duplicate when sever clear cache
                arr_tmp.push(val);
              }
            } else {                                          // else, add all to array post.
              arr_tmp.push(val);
            }
          } else if (val.type === 'banner') {
            if (val.data.type === 'code' && process.client) { // banner code only clientSide
              var new_banner = helper.create_banner_code_html(val.data, '', '');
              val.data['new_html_banner'] = new_banner.outerHTML;
              arr_tmp.push(val);
            } else {
              arr_tmp.push(val);
            }

          } else {
            arr_tmp.push(val);                                // else, add all type.
          }
        });

        // if have arr_tmp
        if (arr_tmp.length > 0) {
            let obj = { "path": path };
            obj['data'] = {
              "meta": res_list_post.value.meta,   // store meta
              "post_id": arr_post_id,             // post_id
              "offset": parseInt(res_list_post.value.limit), // add offset
              "posts": arr_tmp,                   // add posts to new path
            };
            s_l_catch_path.value.push(path); // create new path for check latter
            s_l_catch_data_post.value.push(obj);

            meta.value = res_list_post.value.meta;
            pageSize.value = res_list_post.value.limit;
            posts.value = arr_tmp;
            posts_id.value = arr_post_id;
        }
      }

      is_post_server.value = false; // -- close clear catch on serverSide request complete at ClientSide (in reload page) --
      data_meta.value = res_list_post.value && res_list_post.value.meta ? res_list_post.value.meta : meta.value; // -- add meta_data to setup() function --

    } catch (er) {
      console.log('error')
      console.log(er)
    }
  }

  // ---- show toast message ----
  function toast_message(message, suc_or_error) {
    message_success.value = message
    error_or_success_message.value = suc_or_error;
    let toast = $(".toast_search_post");
    toast.removeClass('d-none');
    toast.toast({ delay: 6000 });
    toast.toast('show');
  }

  function close_modal(){
        $("#show_modal_actions_post").modal('hide')
    }
  // ---- show modal options post ----
  function show_options(post_detail, data, from) {
    detail_one_post.value = post_detail;
    data_tracking.value = data;
    ads_come_from.value = from && from.from ? from.from : '';
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
      // -- clear data when open new modal --
      description.value = '';
      report_check.value = '';
      $('#description').removeClass('error_field_text_report');
      $('#error_description').addClass('d-none');
      $('#show_modal_actions_post').modal('hide');

      if (!localStorage.getItem("report_post")) {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL+ 'feedbacks/post_reasons',{
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),

        }).then(response => {
          const object = {
            data: response.data,
            expiry: helper.Date_To_Timestamp('', 86400, 'seconds'), // add 1 day
          }
          localStorage.setItem("report_post", JSON.stringify(object));
          report_post.value = localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : [];
          $('#show_modal_list_report_post').modal('show');

        }).catch(error => {
          if (!error.response) {
            if (reload_q_again_5.value < 2) {
              reload_q_again_5.value += 1;
              setTimeout( () => { report_on_post(); }, 3000);
            } else {
              loading_field.value = false;
              $('#modal_show_status_error_connection').modal('show');
            }

          } else if (error.response && error.response.status === 401) { // retry
            if (reload_q_again_5.value <= 2) {
              reload_q_again_5.value += 1;
              setTimeout( () => { report_on_post(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');
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
      if (detail_one_post.value.data.id) {
        let data_body = {
            id: detail_one_post.value.data.id, 
            reason: report_check.value, 
            description: description.value
        }
        if(token !== undefined){
            data_body['g-recaptcha-response'] = token
        }
        $fetch(config.VUE_APP_API_URL+ 'feedbacks/posts', {
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
          toast_message('', true);

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
            let check = error.response ? error.response : '';
            if (check) {
              let data_check = JSON.stringify(check);
              let data_parse = JSON.parse(data_check);
              if (check.status === 422) {
                $('#description').addClass('error_field_text_report');
                $('#error_description').removeClass('d-none');
                $('#error_description').text(data_parse._data.message);
                // toast message
                toast_message(data_parse._data.message, false);

              } else if (check.status === 401) { // retry
                if (reload_q_again_5.value <= 2) {
                  reload_q_again_5.value += 1;
                  setTimeout( () => { report_submit(); }, 3000);
                } else {
                  localStorage.removeItem('auth_user');
                  VueCookieNext.removeCookie('auth_user');
                  router.replace(localePath({name: 'index'}));
                }
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
  // ---- /report manual post ----

  // ---- save or unsaved manual post ----
  function save_manual_post(save_or_unsaved, confirm_unsaved) {
    let d_t = data_tracking.value, d_p = detail_one_post.value; // store detail post and tracking n specific index.
    check_new_auth_user();

    if (window.navigator.onLine) {
      if (user_data.value && user_data.value.tokens.access_token) { // if have auth user
        if (save_or_unsaved === 'save') {
          loading_field.value = true;
          $fetch(config.VUE_APP_API_URL+ 'me/saved', {
            headers: {"Access-Token": user_data.value.tokens.access_token},
            params: {lang: language.value === 'km' ? 'km' : 'en'},
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'POST',
            body: new URLSearchParams({ id: detail_one_post.value.data.id })

          }).then(res => {
            // if from "highlight_ads"
            if (ads_come_from.value === 'highlight_ads') {
              for (let i = 0; i < posts.value.length; i++) {
                if (posts.value[i].type === 'highlight_ads') {
                  for (let j = 0; j < posts.value[i].data.length; j++) {
                    if (posts.value[i].data[j].data.id === detail_one_post.value.data.id) {
                      posts.value[i].data[j].data.is_saved = true;
                      break;
                    }
                  }
                }
              }
              // simple list ads
            } else {
              for (let i = 0; i < posts.value.length; i ++) {
                if (posts.value[i].data.id === detail_one_post.value.data.id) {
                  posts.value[i].data.is_saved = true;
                  break;
                }
              }
            }

            setTimeout(() => { $('#show_modal_actions_post').modal('hide'); },100);
            // tracking save

            // tracking on share
            track_action_on_post('save', d_p.data.id, posts.value.length, pageSize.value, d_t.current_index,
                d_t.placement, d_t.display_type,{ paid: d_t.paid, placement: d_t.from });

          }).catch(error => {
            if (!error.response) {
              if (reload_q_again_4.value < 2) {
                reload_q_again_4.value += 1;
                setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
              } else {
                loading_field.value = false;
                $('#modal_show_status_error_connection').modal('show');
              }

            } else if (error.response && error.response.status === 401) { // retry
              if (reload_q_again_4.value <= 2) {
                reload_q_again_4.value += 1;
                setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
              } else {
                localStorage.removeItem('auth_user');
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
            $fetch(config.VUE_APP_API_URL+ 'me/saved', {
              params: {id: detail_one_post.value.data.id},
              headers: {"Access-Token": user_data.value.tokens.access_token},
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
              method: 'DELETE',
            }).then(res => {
              // if from "highlight_ads"
              if (ads_come_from.value === 'highlight_ads') {
                for (let i = 0; i < posts.value.length; i++) {
                  if (posts.value[i].type === 'highlight_ads') {
                    for (let j = 0; j < posts.value[i].data.length; j++) {
                      if (posts.value[i].data[j].data.id === detail_one_post.value.data.id) {
                        posts.value[i].data[j].data.is_saved = false;
                        break;
                      }
                    }
                  }
                }
              // simple list ads
              } else {
                for (let i = 0; i < posts.value.length; i ++) {
                  if (posts.value[i].data.id === detail_one_post.value.data.id) {
                    posts.value[i].data.is_saved = false;
                    break;
                  }
                }
              }

              setTimeout(() => { $('#modal_confirm_unsaved').modal('hide'); $('#show_modal_actions_post').modal('hide'); },100);

              // tracking unsave
              track_action_on_post('unsave', d_p.data.id, posts.value.length, pageSize.value, d_t.current_index, d_t.placement,
                  d_t.display_type,{ paid: d_t.paid, placement: d_t.from });

            }).catch(error => {
              if (!error.response) {
                if (reload_q_again_4.value < 2) {
                  reload_q_again_4.value += 1;
                  setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                } else {
                  loading_field.value = false;
                  $('#modal_show_status_error_connection').modal('show');
                }

              } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_4.value <= 2) {
                  reload_q_again_4.value += 1;
                  setTimeout( () => { save_manual_post(save_or_unsaved, confirm_unsaved); }, 3000);
                } else {
                  localStorage.removeItem('auth_user');
                  VueCookieNext.removeCookie('auth_user');
                  router.replace(localePath({name: 'index'}));
                }
              }
            }).finally(() => (loading_field.value = false));
          }
        }

      // --- if dont have auth user go to login ---
      } else {

        // tracking save
        track_action_on_post('save', d_p.data.id, posts.value.length, pageSize.value, d_t.current_index, d_t.placement,
            d_t.display_type,{ paid: d_t.paid, placement: d_t.from });

        // create state when login completed
        let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
        let arr_save_state = {
          action: 'save',
          expire: expired,
          data: { post_id: detail_one_post.value.data ? detail_one_post.value.data.id : '' },
          from: { name: 'home' }
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

  // ---- check and get following profile ----
  function check_following_profile() {
    if (user_data.value && s_l_following_pro.value.length === 0 && route.query && route.query.following) {
      $fetch(config.VUE_APP_API_URL+ 'me/following', {
        headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''}, // if user login add access token
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),

      }).then(res => {
        s_l_following_pro.value = res.data;

      }).catch(e => {
        if (!e.response) {
          $('#modal_show_status_error_connection').modal('show');

        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_7.value <= 2) {
            reload_q_again_7.value += 1;
            setTimeout(() => { check_following_profile(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
      });
    }
  }


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
    form.value[fieldname] = '';                      // clear fieldname.
    $('#show_modal_field_have_icon').modal('hide'); // close modal.
  }


  // ---- impression tracking ----
  function visibilityChanged (isVisible, entry, data) {
    // isVisible => is true mean new data, false mean old data.
    if (isVisible) { // new data
      arr_impression.value.push({ id: data.id, category: data.category, current_index: data.index, paid: data.paid, placement: data.placement });

      // -- timer not exist && arr_impression not empty && check_sent is true, must set interval --
      if (!timer_auto_impression.value && arr_impression.value.length > 0 && check_sent.value) {

        // -- start setInterval in 3 second --
        timer_auto_impression.value = setInterval( async () => {

          let arr_tmp = arr_impression.value;  // set arr_impression to tmp array.
          arr_impression.value = [];           // clear arr_impression.
          check_sent.value = false;            // not allow to setInterval again.
          clearInterval(timer_auto_impression.value); timer_auto_impression.value = ''; // clear auto impression

          let res = await helper.tracking_action('impression', { post_impression: arr_tmp, item_count: posts.value.length, item_per_page: '30' }, 'impression', 'listing', data.type, search_tracking.value);

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


  // --- Visibility Tracking ---
  function Tracking() {
    const params_tracking = pa_con && pa_con.tracking && pa_con.tracking.d_params ? pa_con.tracking.d_params : ''; // check first from tracking.
    let the_track = params_tracking ? params_tracking : '';
    let par_track = the_track; // get tracking params
    let is_search = the_track && the_track.is_search ? the_track.is_search : ''; // only from search_result and search listing.
    if (par_track) {
      helper.tracking_action('category', { id: par_track.category_id }, 'view', par_track.placement, '', is_search);
    }
    helper.clear_params_make_con('tracking'); // clear params tracking condition.
  }
  // ---- tracking action on posts list ----
  function track_action_on_post(action, id, item_count, item_per_page, current_index, placement, display_type, option_more) {
    helper.tracking_action('post', { id: id, item_count: item_count, item_per_page: item_per_page, current_index: current_index,
      paid: option_more.paid, placement: option_more.placement }, action, placement, display_type, search_tracking.value);
  }

    // ---- reload lazy load ----
    function reload_lazy_img() {
        setTimeout(() => {
            $('img.lazy').Lazy({delay:5000, combined:true});
        },750);
    }

    // ---- check category ----
    function check_category(the_slug) {
        slug.value = the_slug; // add new slug to variable.
    }
    // ---- click category search ----
    function click_category_search(slug, cate_id) {
        var_province.value = ''; // clear value province when choose new category.
        let query = {}, the_route = '';
        if (route.query && route.query.keyword) { query['keyword'] = route.query.keyword; } // if have keyword search
        if (route.query && route.query.following) { query['following'] = route.query.following; } // if have key "following" in url
        if (route.query && route.query.sortby) { query['sortby'] = route.query.sortby; } // if have sortby
        if (route.query && route.query.max_ad_price) { query['max_ad_price'] = route.query.max_ad_price; } // if have max_ad_price
        if (route.query && route.query.min_ad_price) { query['min_ad_price'] = route.query.min_ad_price; } // if have min_ad_price
        if (route.query && route.query.province) { query['province'] = route.query.province; } // if have province
        if (route.query && route.query.district) { query['district'] = route.query.district; } // if have district
        if (route.query && route.query.commune) { query['commune'] = route.query.commune; } // if have commune

        if (!cate_id) { // click child category not allow to tracking
            the_route = { name: 'c-slugCategory', params: { slugCategory: slug }, query: query }; // params = clear all data search and get new filter search.
            return the_route;

        } else { // click parent category allow to tracking
            the_route = { name: 'c-slugCategory', params: { slugCategory: slug }, query: query }; // params = clear all data search and get new filter search.
            // store_params(cate_id); // only this condition can use this functions.
            return the_route;
        }
    }
    // ---- store params ----
    function store_params(cate_id) {
        save_track_optional('tracking', { placement: 'listing', category_id: cate_id, is_search: search_tracking.value });
    }
    // ---- click show more or less on add_model ----
    function show_add_model() {
        let check = var_more_model.value; // true show less, false show more
        if (check) {
            var_more_model.value = false;  // show less.
        } else {
            var_more_model.value = true; // show more.
        }
    }
    // ---- click on field dynamic (Mobile && Desktop View) ----
    function click_add_field(fieldname, fieldvalue) {
        form.value[fieldname] = fieldvalue;      // add value to field name in form data.
        if (!isDesktop) {                        // only in Mobile View
            change_ad_field(fieldname);          // clean value chained_field if like value parent in form search.
        }
        setTimeout(() => { click_search('push'); },150); // click search must to push route, not replace route.
    }
    // ---- click on chained_field ----
    function click_add_model(fieldname, fieldvalue) {
        // -- clear value in model empty --
        if (form.value[fieldname] && form.value[fieldname] === fieldvalue) {
            form.value[fieldname] = '';          // add value to field name in form data.
        // -- add value to model --
        } else {
            form.value[fieldname] = fieldvalue;  // add value to field name in form data.
        }
        click_search('');
    }

    // ---- show modal all location ----
    function show_all_locations() {
        if (multiple_locations.value) { // is multiple locations
            a_m_province.value = locations.value && locations.value.data ? locations.value.data : [];
            arr_mul_loc.value = a_m_province.value;
            type_loc.value = 'province';

            v_m_province.value = ''; v_m_district.value = ''; v_m_commune.value = '';  // clear value loc multiple
        }
        $('#show_modal_list_location').modal('show')
    }

    function show_all_locationsdt() {
        if (multiple_locations.value) { // is multiple locations
            a_m_province.value = locations.value && locations.value.data ? locations.value.data : [];
            arr_mul_loc.value = a_m_province.value;
            type_loc.value = 'province';

            v_m_province.value = ''; v_m_district.value = ''; v_m_commune.value = '';  // clear value loc multiple
        }
    }
    // ---- click on location in modal location or click clear ----

    function clearLoc(){
        $("div").removeClass("show");
    }
    function click_choose_location(condition, slug) {
        // $('#show_modal_list_location').modal('hide');   // close modal all location.
        // if(check_device){
        $('#show_modal_list_location').modal('hide');
        $("div").removeClass("show");
    //    }else{
    //     $('#show_modal_list_location1').modal('hide');
    //    }
        form.value['province'] = condition ? slug : ''; // if condition exist add slug to field province, else clear province.
        form.value['district'] = '';
        form.value['commune'] = '';
        if (route.params && !route.params.slugCategory) { // if category exist, this condition not working.
            var_province.value = condition ? slug : '';   // prevent for dom not change field province ah quick ler UI.
        }
        // console.log(form.value);
        setTimeout(() => { click_search(''); },200); // click search btn.
    }
    // ---- click request on multiple locations ----
    function request_mul_loc() {
        $('#show_modal_list_location').modal('hide');
        form.value['province'] = v_m_province.value ? v_m_province.value : '';
        form.value['district'] = v_m_district.value ? v_m_district.value : '';
        form.value['commune'] = v_m_commune.value ? v_m_commune.value : '';
        setTimeout(() => { click_search(''); },200); // click search btn.

        // -- add array that choose complete from mul loc to main modal search --
        districts.value = a_m_district.value;
        communes.value = a_m_commune.value;
    }
    // ---- clean multiple locations ----
    function multiple_loc(type, slug_location, loc_full_name) {
        if (type === 'province') {
            if (v_m_province.value === slug_location) {
                arr_mul_loc.value = a_m_district.value; // add old array commune
            } else {
                mul_loc_request(slug_location, 'district');
            }
            type_loc.value = 'district';
            v_m_province.value = slug_location; // add slug to form data
            n_m_province.value = loc_full_name; // add full name loc to show in model multiple select
        } else if (type === 'district') {
            if (v_m_district.value === slug_location) {
                arr_mul_loc.value = a_m_commune.value; // add old array district
            } else {
                mul_loc_request(slug_location, 'commune');
            }
            type_loc.value = 'commune';
            v_m_district.value = slug_location; // add slug to form data
            n_m_district.value = loc_full_name; // add full name loc to show in model multiple select
        } else if (type === 'commune') {
            v_m_commune.value = slug_location;  // add slug to form data
            request_mul_loc(); // request mul loc
        }
    }
    // ---- request get locations ----
    function mul_loc_request(slug_dis_or_com, condition) {
        loading_loc_multiple.value = true;
        $fetch(config.VUE_APP_API_URL+ 'locations', {
            params: {
                lang: language.value === 'km' ? 'km' : 'en',
                type: condition, // condition content district or commune
                parent: slug_dis_or_com,
            },
        }).then(res => {
            loading_loc_multiple.value = false;
            if (condition === 'district') {
                a_m_district.value = res.data;
                arr_mul_loc.value = a_m_district.value;
            } else {
                a_m_commune.value = res.data;
                arr_mul_loc.value = a_m_commune.value;
            }
        }).catch(e => {
            console.log(e);
            loading_loc_multiple.value = false;
        });
    }
    // ---- click back show old loc in modal multiple locations ----
    function back_location(loc_type) {
        if (loc_type === 'commune') {
            type_loc.value = 'district';
            arr_mul_loc.value = a_m_district.value; // store array district
        } else if (loc_type === 'district') {
            type_loc.value = 'province';
            arr_mul_loc.value = a_m_province.value; // store array province
        }
    }
    // ---- get full name of location like "Pro, Dis, Com" ----
    function get_name_location() {
        if (form.value['commune']) { // is have commune must to store full name.
            let a_com = a_m_commune.value.length > 0 ? a_m_commune.value : [];
            for (let i = 0; i < a_com.length; i++) {
                if (form.value['commune'] === a_com[i].slug) {
                    n_m_commune.value = language.value === 'km' ? a_com[i].km_name : a_com[i].en_name; // store name of commune
                    break;
                }
            }
        } else if (form.value['district']) { // is have district must to store full name.
            let a_dis = a_m_district.value.length > 0 ? a_m_district.value : [];
            for (let i = 0; i < a_dis.length; i++) {
                if (form.value['district'] === a_dis[i].slug) {
                    n_m_commune.value = ''; // clear name commune
                    n_m_district.value = language.value === 'km' ? a_dis[i].km_name : a_dis[i].en_name; // store name of district
                    break;
                }
            }
        } else if (form.value['province']) { // is have province must to store full name.
            let a_pro = a_m_province.value.length > 0 ? a_m_province.value : (locations.value && locations.value.data ? locations.value.data : []);
            for (let i = 0; i < a_pro.length; i++) {
                if (form.value['province'] === a_pro[i].slug) {
                    n_m_commune.value = '';  // clear name commune
                    n_m_district.value = ''; // clear name district
                    n_m_province.value = language.value === 'km' ? a_pro[i].km_name : a_pro[i].en_name; // store name of province
                    break;
                }
            }
        }
    }



  // ---- Action show modal and click clear or selected field ----
  function show_modal_short(con) {
      if (con === 'short') {
            // show modal short.
            $('#modal_short_filter').modal('show');
      } else if (con === 'ad_condition') {
            // show modal ad_condition.
            $('#modal_ad_condition_filter').modal('show');
      }
  }
  function close(){
        $('#modal_short_filter').modal('hide');
  }
  function selected_action_on_model(fieldname, fieldvalue) {
      form.value[fieldname] = fieldvalue;       // add value to field name in form data.
      click_search('');
      $('#modal_short_filter').modal('hide');
      $("span").removeClass("show");
      $("div").removeClass("show");
      
  }

  // ---- Action on modal price ----
 function show_modal_price() { 
    $('#modal_price_filter').modal('show');
 }
  function clear_price(max_fieldname, min_fieldname) {
      $("div").removeClass("show");
      form.value[max_fieldname] = '';
      form.value[min_fieldname] = '';
      click_search('');
  }

  function clear_year(max_fieldname, min_fieldname) {
      $("div").removeClass("show");
      form.value[max_fieldname] = '';
      form.value[min_fieldname] = '';
      click_search('');
  }

  // ---- class create owl carousel ----
  function create_carousel(condition) {

    let m_drag, m_loop;
    // -- check slide one or more --
    if (slide_show.value && slide_show.value.a && slide_show.value.a.data && slide_show.value.a.data.length > 1) { m_loop = true; } else { m_loop = false; }

    // -- check PC or Mobile --
    m_drag = isDesktop ? true : false; // mouseDrag on carousel
    setTimeout(() => {
      if (condition === 'owl_slide') {
        $('#owl_slide').owlCarousel({
          items: 1,
          margin: 5,
          autoplayTimeout: 6000, // time out to switch slide
          loop: m_loop, // auto play and loop again and again
          mouseDrag: m_drag,

          smartSpeed: 500,
          autoplay: m_loop,
          autoplayHoverPause: true
        });
        // console.log('reload carousel 1');
        check_drag_scroll();

      } else if (condition === 'owl_category') {
        $('#owl_categories').owlCarousel({
          items: 1,
          mouseDrag: m_drag,
          smartSpeed: 500,
        });
        // console.log('reload carousel 2');
        check_drag_scroll();
      }
    }, 300);
  }
  // ---- check drag and scroll carousel ----
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


  // ---- check new auth user ----
  function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
  // ---- Slide Show By Search Category ----
  function slide_show_by_category() {
      let val_slug_cate = set_SEO_category.value ? set_SEO_category.value : (route.params && route.params.slugCategory ? route.params.slugCategory : ''); // check slugCategory in params or SEO params

      // let path = route.path; // store catch banner only change categories.
      let path = route.fullPath; // store catch banner all when url change.
      // --- if cache not exist, must to request new ---
      if (!s_l_catch_banner_path.value.includes(path)) {
          // push path for check latter
          s_l_catch_banner_path.value.push(path);
          // request to get banner

          $fetch(config.VUE_APP_API_URL+ 'banners', {
          // $fetch(config.VUE_APP_NEW_MOBI + 'banners', {
              // headers: { "display-type": "mobile_view" },
              params: {
                  page: 'listing', lang: language.value === 'km' ? 'km' : 'en', category: val_slug_cate ? helper.clean_html_text(val_slug_cate) : 'all',
                  "display-type": isMobile.value ? 'mobile_view' : 'desktop' // isDesktop ? 'desktop' : 'mobile_view'
              },

          }).then(res => {
              let R = res.data;
              let arr_banner = banner_in_catch(R); // create array banner A and B.

              slide_show.value = arr_banner;
              // console.log(slide_show.value);

              s_l_catch_data_banner.value.push({'path': path, data: arr_banner }); // [{'path': 'url_path', data: [{...}] }];

              if (slide_show.value.a && slide_show.value.a.data.length === 0) { is_slide_show.value = false; } // close slide show, if array slide empty.

              create_carousel('owl_slide'); // create carousel on slide show

          }).catch(error => {
              if (error.response && error.response.status === 401) { // retry
                  if (reload_q_again_1.value <= 2) {
                      reload_q_again_1.value += 1;
                      check_new_auth_user();
                      setTimeout( () => { slide_show_by_category(); }, 3000);
                  } else {
                      localStorage.removeItem('auth_user');
                      VueCookieNext.removeCookie('auth_user');
                      router.replace(localePath({name: 'index'}));
                  }
              }
          });

      // --- if cache exist must to replace old ---
      } else {
          $.each(s_l_catch_data_banner.value, (k, v) => {
              if (v.path === path) {
                  slide_show.value = v.data; // loop to get old catch banner.

                  if (slide_show.value.a && slide_show.value.a.data.length === 0) { is_slide_show.value = false; } // close slide show, if array slide empty.

                  create_carousel('owl_slide'); // create carousel on slide show.
              }
          });
      }
  }
  // ---- create banner Type A and B ----
  function banner_in_catch(banner_data) {
      let data = banner_data ? banner_data : '';
      if (data) {
          // console.log(data)
          let arr_ban_a_b = { a: [], b: [],  other: [] }
          // console.log(cache_banner)
          if (data.a && data.a.data && data.a.data.length > 0) {
              $.each(data.a.data, (k, v) => {

                  // sub object dont have width and height, must to add from parent width height.
                  if (!v.width) { v['width'] = data.a.width ? data.a.width : ''; }
                  if (!v.height) { v['height'] = data.a.height ? data.a.height : ''; }

                  if (v.type === 'image') {
                      arr_ban_a_b.a.push(v);
                  } else if (v.type === 'code' && process.client) { // banner code only clientSide
                      var new_banner = helper.create_banner_code_html(v, 'slide', '');
                      v['new_html_banner'] = new_banner.outerHTML;
                      arr_ban_a_b.a.push(v);
                  }
              });
              data.a.data = arr_ban_a_b.a; // replace new on old array.
          }
          if (data.b && data.b.data && data.b.data.length > 0) {
              $.each(data.b.data, (k, v) => {

                  // sub object dont have width and height, must to add from parent width height.
                  if (!v.width) { v['width'] = data.b.width ? data.b.width : ''; }
                  if (!v.height) { v['height'] = data.b.height ? data.b.height : ''; }

                  if (v.type === 'image') {
                      arr_ban_a_b.b.push(v);
                  } else if (v.type === 'code' && process.client) { // banner code only clientSide
                      var new_banner = helper.create_banner_code_html(v, '', '');
                      v['new_html_banner'] = new_banner.outerHTML;
                      arr_ban_a_b.b.push(v);
                  }
              });
              data.b.data = arr_ban_a_b.b; // replace new on old array.
          }
          if (data.other && data.other.data && data.other.data.length > 0) {
              $.each(data.other.data, (k, v) => {

                  // sub object dont have width and height, must to add from parent width height.
                  if (!v.width) { v['width'] = data.other.width ? data.other.width : ''; }
                  if (!v.height) { v['height'] = data.other.height ? data.other.height : ''; }

                  if (v.type === 'image') {
                      arr_ban_a_b.other.push(v);
                  } else if (v.type === 'code' && process.client) { // banner code only clientSide
                      var new_banner = helper.create_banner_code_html(v, '', '');
                      v['new_html_banner'] = new_banner.outerHTML;
                      arr_ban_a_b.other.push(v);
                  }
              });
              data.other.data = arr_ban_a_b.other.sort((a, b) => a.id - b.id); // replace new on old array.
          }
          return data;
      }
  }
  // ---- check link banner is khmer24 link or not ----
  function check_link_banner (link) { return helper.check_link_is_khmer24(link, config); }


    // ---- click retry ----
    function get_slide_filter_categories() {
        if (window.navigator.onLine) {
            slide_show_by_category();  // get banner slide show
            check_filter_page();       // get data filter page
            create_field_categories(); // check and show full name of category in App Bar, check list post job and so on....
        }
    }
    // ---- show post by search (Mobile View) ----
    
    async function search_post_data({loaded, error, noMore, noResults}, { isFirstLoad }) {

        check_new_auth_user();

        let query_str = {
            fields: 'thumbnails,thumbnail,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
            functions: 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]',
            filter_version: '4',
            meta: 'true',
            offset: pageSize.value,
        }

        // --- if have following user or store post ---
        if (user_data.value && route && route.query && route.query.following) {
            query_str['followed'] = true;
        }

        // --- check keyword from query ---
        if (route && route.query && route.query.keyword) { query_str['keyword'] = route.query.keyword; }
        // --- check slugCategory ---
        if (set_SEO_category.value) {
            query_str['category'] = helper.clean_html_text(set_SEO_category.value);          // slugCategory that click link from google
        } else {
            if (route && route.params && route.params.slugCategory) {                  // slugCategory from url params
                query_str['category'] = helper.clean_html_text(route.params.slugCategory);
            }
        }
        // --- get value and key from v-model to search ---
        if (Object.keys(form.value).length > 0) {
            $.each(form.value, (key, val) => {
                if (key === 'category') {
                    // when refresh page, it gone all query
                } else {
                    query_str[key] = route && route.query && route.query[key] ? route.query[key] : form.value[key];
                }
            });
            // --- if form.value not exist must to create query from url, if have search in url ---
        } else {
            let query = route && route.query ? route.query : [];
            if (Object.keys(query).length > 0) {
                $.each(query, (k, val) => {
                    if (/*k === 'slug_category' ||*/ k === 'keyword') {
                        // this key generate above, so not allow to have it again
                    } else {
                        query_str[k] = val; // generate key and value for search from query url when form.value not exist
                    }
                });
            }
        }
        // --- check province from query when category not exist ---
        if (route.params && !route.params.slugCategory) { // if category exist this condition ot working.
            query_str['province'] = route && route.query && route.query.province ? route.query.province : '';
        }
        // --- check ad_feature is multiple select so reab data tam ning ---
        var data_feature = value.value ? value.value : '';
        if (Array.isArray(data_feature)) {
            for (var i = 0; i < data_feature.length; i++) {
                query_str['ad_features['+i+']'] = data_feature[i];
            }
        } else {
            if (data_feature) {
                query_str['ad_features[0]'] = data_feature;
            }
        }

        // --- request to get data post by search and scroll ---
        $fetch(config.VUE_APP_API_URL_POST_NEW + 'feed', {
            headers: {
                "Display-Type": isMobile.value ? 'mobile_view' : 'desktop',
                "Access-Token": user_data.value ? user_data.value.tokens.access_token : ''
            }, // if user login add access token
            params: query_str,
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),

        }).then(res => {
            // check prevent loading again and again
            if (posts.value.length === 0) {
                // $('html, body').animate({ scrollTop: ($('#height_div').offset().top - 300) }, 100); // 1000 = 1 second
                window.scrollTo({top: 0});
            }

            let path = route.fullPath;
            let data = res.data;
            if (data.length) {
                
                let arr_tmp = []; let arr_post_id = [];
                $.each(data, (key, val) => { // loop data posts.
                    if (val.type === 'post') {
                        if (val.data.type === 'normal') {                     // check duplicate post only data type === normal
                            if (!posts_id.value.includes(val.data.id)) {       // check not exist OR (posts_id.value.indexOf(value.data.id) === -1)
                                arr_post_id.push(val.data.id);                // push id of post prevent show duplicate when sever clear cache
                                arr_tmp.push(val);
                            }
                        } else {                                                // else, add all to array post.
                            arr_tmp.push(val);
                        }

                    } else if (val.type === 'banner') {
                        if (val.data.type === 'code' && process.client) { // banner code only clientSide
                            var new_banner = helper.create_banner_code_html(val.data, '', '');
                            val.data['new_html_banner'] = new_banner.outerHTML;
                            arr_tmp.push(val);
                        } else {
                            arr_tmp.push(val);
                        }

                    } else {
                        arr_tmp.push(val);                                // else, add all type.
                    }
                });

                // if have arr_tmp
                if (arr_tmp.length > 0) {
                    // ---> check and store cache post for click back history <---
                    if (s_l_catch_path.value.includes(path)) {
                        $.each(s_l_catch_data_post.value, (k, v) => {
                            if (v.path === path) { // if path exist in catch posts, must to add more data post in to specific catch posts

                                s_l_catch_data_post.value[k]['data']['meta'] = res.meta ? res.meta : meta.value; // store meta
                                s_l_catch_data_post.value[k]['data']['post_id'] = arr_post_id; // post_id
                                s_l_catch_data_post.value[k]['data']['offset'] += res.limit; // add offset
                                s_l_catch_data_post.value[k]['data']['posts'] = s_l_catch_data_post.value[k]['data']['posts'].concat(arr_tmp); // concat in multiple array

                                meta.value = s_l_catch_data_post.value[k]['data']['meta'];
                                pageSize.value = s_l_catch_data_post.value[k]['data']['offset'];
                                posts.value =  s_l_catch_data_post.value[k]['data']['posts'];
                                posts_id.value = s_l_catch_data_post.value[k]['data']['post_id'];

                                return false; // break the loop
                            }
                        });

                        // -- if path not exist in catch, must to create new catch posts --
                    } else {
                        let obj = { "path": path };
                        obj['data'] = {
                            "meta": res.meta,              // store meta
                            "post_id": arr_post_id,        // post_id
                            "offset": parseInt(res.limit), // add offset
                            "posts": arr_tmp,              // add posts to new path
                        };
                        s_l_catch_path.value.push(path); // create new path for check latter
                        s_l_catch_data_post.value.push(obj);

                        meta.value = res.meta;
                        pageSize.value += res.limit;
                        posts.value = arr_tmp;
                        posts_id.value = arr_post_id;
                    }
                }
                check_post.value += 1;
                if(check_post.value > 2){
                    check_post.value = 1;
                }else if(check_post.value = 2){
                    check_post_limit.value = check_post_limit.value.concat(posts.value.length)
                    // console.log(check_post_limit.value)
                }
            }

            data_meta.value = res.meta ? res.meta : (meta.value ? meta.value : ''); // -- add meta_data to setup() function --

            // -- tracking on google analytic --
            if (posts.value.length <= 30 && pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(pageSize.value > 30 ? pageSize.value-30 : 0); }

            // -- check stop scroll or scroll more --
            if (data.length === 0) {
                if (posts.value.length === 0) { // check in list have item or not
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        if (posts.value.length === 0) {
                            noResults(); // console.log('noResult');
                        } else {
                            noMore(); // console.log('noMore');
                        }
                    }
                } else {
                    noMore(); // console.log('noMore');
                }
            } else {
                setTimeout(function () { loaded(); }, 2000); // console.log('loaded');
            }

            reload_lazy_img(); // load lazy image.

        }).catch(e => {
            if (!e.response) {
                error();

            } else {
                if (e.response && e.response.status === 404) {
                    is_404.value = true;
                    noMore();

                } else if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout( () => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
        });
    }
    // ---- show post by search (Desktop View) ----
    function load_more_manual() {
        check_new_auth_user();
        dt_loading.value = true;

        let query_str = {
            fields: 'thumbnails,thumbnail,location,photos,user,store,renew_date,is_like,is_saved,category,link,object_highlight_specs,condition',
            functions: 'save,chat,like,apply_job,shipping,banner,highlight_ads[object_highlight_specs]',
            filter_version: '4',
            meta: 'true',
            offset: pageSize.value,
        }

        // --- if have following user or store post ---
        if (user_data.value && route && route.query && route.query.following) {
            query_str['followed'] = true;
        }

        // --- check keyword from query ---
        if (route && route.query && route.query.keyword) { query_str['keyword'] = route.query.keyword; }
        // --- check slugCategory ---
        if (set_SEO_category.value) {
            query_str['category'] = helper.clean_html_text(set_SEO_category.value);    // slugCategory that click link from google
        } else {
            if (route && route.params && route.params.slugCategory) {                  // slugCategory from url params
                query_str['category'] = helper.clean_html_text(route.params.slugCategory);
            }
        }
        // --- get value and key from v-model to search ---
        if (Object.keys(form.value).length > 0) {
            $.each(form.value, (key, val) => {
                if (key === 'category') {
                    // when refresh page, it gone all query
                } else {
                    query_str[key] = route && route.query && route.query[key] ? route.query[key] : form.value[key];
                }
            });
            // --- if form.value not exist must to create query from url, if have search in url ---
        } else {
            let query = route && route.query ? route.query : [];
            if (Object.keys(query).length > 0) {
                $.each(query, (k, val) => {
                    if (/*k === 'slug_category' ||*/ k === 'keyword') {
                        // this key generate above, so not allow to have it again
                    } else {
                        query_str[k] = val; // generate key and value for search from query url when form.value not exist
                    }
                });
            }
        }
        // --- check province from query when category not exist ---
        if (route.params && !route.params.slugCategory) { // if category exist this condition ot working.
            query_str['province'] = route && route.query && route.query.province ? route.query.province : '';
        }
        // --- check ad_feature is multiple select so reab data tam ning ---
        var data_feature = value.value ? value.value : '';
        if (Array.isArray(data_feature)) {
            for (var i = 0; i < data_feature.length; i++) {
                query_str['ad_features['+i+']'] = data_feature[i];
            }
        } else {
            if (data_feature) {
                query_str['ad_features[0]'] = data_feature;
            }
        }

        // --- request to get data post by search and scroll ---
        $fetch(config.VUE_APP_API_URL_POST_NEW + 'feed', {
            headers: {
                "Display-Type": isMobile.value ? 'mobile_view' : 'desktop',
                "Access-Token": user_data.value ? user_data.value.tokens.access_token : ''
            }, // if user login add access token
            params: query_str,

        }).then(res => {
            let path = route.fullPath;
            let data = res.data;
            if (data.length) {
                let arr_tmp = []; let arr_post_id = [];
                $.each(data, (key, val) => { // loop data posts.
                    if (val.type === 'post') {
                        if (val.data.type === 'normal') {                     // check duplicate post only data type === normal
                            if (!posts_id.value.includes(val.data.id)) {       // check not exist OR (posts_id.value.indexOf(value.data.id) === -1)
                                arr_post_id.push(val.data.id);                // push id of post prevent show duplicate when sever clear cache
                                arr_tmp.push(val);
                            }
                        } else {                                                // else, add all to array post.
                            arr_tmp.push(val);
                        }

                    } else if (val.type === 'banner') {
                        if (val.data.type === 'code' && process.client) { // banner code only clientSide
                            var new_banner = helper.create_banner_code_html(val.data, '', '');
                            val.data['new_html_banner'] = new_banner.outerHTML;
                            arr_tmp.push(val);
                        } else {
                            arr_tmp.push(val);
                        }

                    } else {
                        arr_tmp.push(val);                                // else, add all type.
                    }
                });

                // if have arr_tmp
                if (arr_tmp.length > 0) {
                    // ---> check and store cache post for click back history <---
                    if (s_l_catch_path.value.includes(path)) {
                        $.each(s_l_catch_data_post.value, (k, v) => {
                            if (v.path === path) { // if path exist in catch posts, must to add more data post in to specific catch posts

                                s_l_catch_data_post.value[k]['data']['meta'] = res.meta ? res.meta : meta.value; // store meta
                                s_l_catch_data_post.value[k]['data']['post_id'] = arr_post_id; // post_id
                                s_l_catch_data_post.value[k]['data']['offset'] += res.limit; // add offset
                                s_l_catch_data_post.value[k]['data']['posts'] = s_l_catch_data_post.value[k]['data']['posts'].concat(arr_tmp); // concat in multiple array

                                meta.value = s_l_catch_data_post.value[k]['data']['meta'];
                                pageSize.value = s_l_catch_data_post.value[k]['data']['offset'];
                                posts.value =  s_l_catch_data_post.value[k]['data']['posts'];
                                posts_id.value = s_l_catch_data_post.value[k]['data']['post_id'];

                                return false; // break the loop
                            }
                        });

                    // -- if path not exist in catch, must to create new catch posts --
                    } else {
                        let obj = { "path": path };
                        obj['data'] = {
                            "meta": res.meta,              // store meta
                            "post_id": arr_post_id,        // post_id
                            "offset": parseInt(res.limit), // add offset
                            "posts": arr_tmp,              // add posts to new path
                        };
                        s_l_catch_path.value.push(path); // create new path for check latter
                        s_l_catch_data_post.value.push(obj);

                        meta.value = res.meta;
                        pageSize.value += res.limit;
                        posts.value = arr_tmp;
                        posts_id.value = arr_post_id;
                    }
                }
            }

            data_meta.value = res.meta ? res.meta : (meta.value ? meta.value : ''); // -- add meta_data to setup() function --

            // -- tracking on google analytic --
            if (posts.value.length <= 30 && pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(pageSize.value > 30 ? pageSize.value-30 : 0); }

            dt_loading.value = false; // close loading
            if (res && res.total) { total_ads.value = res.total; } // add total count
            const now = new Date();
            time_search.value = helper.simple_date_format(now); // add current date
            hide_btn_load_more.value = data.length < 30 ? false : true; // close button loadMore

            reload_lazy_img(); // load lazy image.

        }).catch(e => {
            if (e.response && e.response.status === 404) {
                is_404.value = true;

            } else if (e.response && e.response.status === 401) { // retry
                if (reload_q_again_2.value <= 2) {
                    reload_q_again_2.value += 1;
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

  // ---- convert title to use in url ----
  function check_title_char(title) { return helper.check_special_char(title); }
  // ---- clean data search for Tracking ----
  function clean_search() {
    let slug = route.params && route.params.slugCategory ? route.params.slugCategory : '';
    let data_search = {};
    // get id category if have category slug in params
    if (slug) {
      data_search['category'] = slug;
    }
    // get query search that have value
    if (route && route.query) {
      $.each(route.query, (key, val) => {
        if (val) { data_search[key] = val; }
      });
    }
    search_tracking.value = data_search;
  }
  // ---- click share icon ----
  function detectMob(p_id, s_link, data, from) {
    let data_post = [], post_from = '';
    // check data from highlight or posts
    if (from && from.from === 'highlight_ads') {
      data_post = from.data;
      post_from = 'highlight_ads';
    } else {
      data_post = posts.value;
      post_from = 'post';
    }


    post_id.value = p_id;         // store post id
    share_link.value = s_link;   // store post link

    // -- Var share tracking --
    current_index.value = data.index;
    placement.value = 'listing';
    display_type.value = data.display_type;
    // -- Var share tracking --

    track_action_on_post('share', post_id.value, data_post.length, pageSize.value, current_index.value, placement.value,
        display_type.value, { paid: data.paid, placement: data.from }); // tracking on share
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
    let post_data = post_from === 'highlight_ads' ? data_post : posts.value;

    for (let i = 0; i < post_data.length; i++) {
      if (post_id.value == post_data[i].data.id) {

        // support only https, localhost or some browser
        let title = post_data[i].data.title ? post_data[i].data.title : '';
        let text = post_data[i].data.title+' Cambodia on Khmer24.com.';
        let url = post_data[i].data.link ? post_data[i].data.link : '';
        // let image = post_data[i].data.image ? [post_data[i].data.image] : '';

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
    // connection is online
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
    // this.$refs.clickLink.focus();
    document.getElementById('copy_link').focus();
    document.execCommand('copy');
    document.getElementById('copy_link').blur();

    // check from highlight or following ads and tracking on top ads too
    let paid = detail_one_post.value && detail_one_post.value.data.type !== 'normal' ? true : false;
    let from = '';
    if (ads_come_from.value === 'highlight_ads') {
      from = 'highlight';
    }
    // clear ads_come from
    ads_come_from.value = '';
    $('#modal_show_option_share').modal('hide');  // close modal share
    track_action_on_post('copy_link', post_id.value, posts.value.length, pageSize.value, current_index.value,
        placement.value, display_type.value, { paid: paid, placement: from }); // tracking on copy_link
    // toast message
    toast_message('Link copied to clipboard', true);
  }

  // ---- track on google analytic ----
  function track_google_analytics (page) {
    // setTimeout(() => {
      let offset = page > 0 ? '?offset='+page : '';      // set offset of page if scroll get more data
      let page_path = route.path+offset;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
      let page_location = window.location.href+offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
      let data = {
        page_title: data_meta.value ? data_meta.value.title : '',
        page_location: page_location,
        page_path: page_path,
      }
      // -- event on page --
      event('search', data);
      // -- page_view --
      pageview(data);
    // },50);
  }

  // ---- click like post ----
  function click_like(id, like_or_dislike, data, from) {
    check_new_auth_user();

    if (window.navigator.onLine) {
      if (user_data.value) {
        loading_field.value = true;
        if (like_or_dislike) {        // -- dislike --
          $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
            params: {id: id},
            headers: {"Access-Token": user_data.value.tokens.access_token},
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'DELETE',

          }).then(res => {
            // tracking Unlike
            track_action_on_post('unlike', id, posts.value.length, pageSize.value, data.current_index, data.placement, data.display_type,
                { paid: data.paid, placement: data.from });

            // if click from highlight_ads
            if (from && from.from === 'highlight_ads') {
              for (let i = 0; i < posts.value.length; i++) {
                if (posts.value[i].type === 'highlight_ads') {
                  for (let j = 0; j < posts.value[i].data.length; j++) {
                    if (posts.value[i].data[j].data.id === id) {
                      posts.value[i].data[j].data.is_like = false;
                      break;
                    }
                  }
                }
              }
            // show simple ads
            } else {
              for (let i = 0; i < posts.value.length; i ++) {
                if (posts.value[i].data.id === id) {
                  posts.value[i].data.is_like = false;
                  break;
                }
              }
            }

          }).catch(error => {
            if (!error.response) {
              loading_field.value = false;
              $('#modal_show_status_error_connection').modal('show');

            } else {
              // console.log(error.response);
              if (error.response && error.response.status === 404) {
                $.each(posts.value, (key, value) => {
                  if (parseInt(value.data.id) === parseInt(id)) {
                    posts.value[key].data.is_like = false;
                    return;
                  }
                });

              } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_3.value <= 2) {
                  reload_q_again_3.value += 1;
                  setTimeout( () => { click_like(id, like_or_dislike, data, from); }, 3000);
                } else {
                  localStorage.removeItem('auth_user');
                  VueCookieNext.removeCookie('auth_user');
                  router.replace(localePath({name: 'index'}));
                }
              }
            }
          }).finally(() => (loading_field.value = false));

        } else {                      // -- like --
          $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
            headers: {"Access-Token": user_data.value.tokens.access_token},
            params: {lang: language.value === 'km' ? 'km' : 'en'},
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'POST',
            body: new URLSearchParams({id: id})

          }).then(res => {
            // tracking like
            track_action_on_post('like', id, posts.value.length, pageSize.value, data.current_index, data.placement, data.display_type,
                { paid: data.paid, placement: data.from });

            // if click from highlight_ads
            if (from && from.from === 'highlight_ads') {
              for (let i = 0; i < posts.value.length; i++) {
                if (posts.value[i].type === 'highlight_ads') {
                  for (let j = 0; j < posts.value[i].data.length; j++) {
                    if (posts.value[i].data[j].data.id === id) {
                      posts.value[i].data[j].data.is_like = true;
                      break;
                    }
                  }
                }
              }
              // show simple ads
            } else {
              for (let i = 0; i < posts.value.length; i ++) {
                if (posts.value[i].data.id === id) {
                  posts.value[i].data.is_like = true;
                  break;
                }
              }
            }

          }).catch(error => {
            if (!error.response) {
              loading_field.value = false;
              $('#modal_show_status_error_connection').modal('show');

            } else {
              // console.log(error.response);
              if (error.response && error.response.status === 404) {
                $.each(posts.value, (key, value) => {
                  if (parseInt(value.data.id) === parseInt(id)) {
                    posts.value[key].data.is_like = false;
                    return;
                  }
                });

              } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_4.value <= 2) {
                  reload_q_again_4.value += 1;
                  setTimeout( () => { click_like(id, like_or_dislike, data, from); }, 3000);
                } else {
                  localStorage.removeItem('auth_user');
                  VueCookieNext.removeCookie('auth_user');
                  router.replace(localePath({name: 'index'}));
                }
              }
            }
          }).finally(() => (loading_field.value = false));
        }
      } else {

        // tracking like if not login yet
        track_action_on_post('like', id, posts.value.length, pageSize.value, data.current_index, data.placement, data.display_type,
            { paid: data.paid, placement: data.from });

        // create state when login completed
        let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
        let arr_save_state = {
          action: 'like',
          expire: expired,
          data: {post_id: id},
          from: {name: 'search_post'}
        }
        localStorage.setItem("save_state", JSON.stringify(arr_save_state));
        router.push(localePath({name: isDesktop ? 'auth-login' : 'auth'}));
      }

    } else {
      loading_field.value = false
      $('#modal_show_status_error_connection').modal('show');
    }
  }
  // ---- go back by state history ----
  function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'})); }
  // ---- convert price ----
  function convert_price(price) { return helper.convert_price(price); }
  // ---- convert discount price $ to k ----
  function convert_price_to_k(price) { return helper.kFormatter(price); }
  // ---- click show detail post (not use yet) ----
  function show_detail(title, id) { router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title), id: id } })); }
  // ---- change format date to time ago ----
  function convertFromNow(date) {
      return helper.check_date_ago(date, 'check_current_year');
  }
  // ---- add ripple to UI ----
  function ripple() { setTimeout(() => { $(".cl_ripple").ripple(); }, 1000); }
  // ---- show modal search ----
  function show_pop_up_search() {
    $('#show_modal_saerch').modal('show');
    $('#_search_').focus();

    // change prop value to clear suggestion on search popup
    clear_val_suggestion_popup.value++; // if value change, then action else no action.
  }
  // ---- check number only ----
  function onlyNumber ($event) {
    // console.log($event.keyCode); //keyCodes value
    let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
    if ((keyCode < 48 || keyCode > 57) || keyCode === 46) { // 46 is dots
      $event.preventDefault();
    }
  }
  // ---- create field categories, check full name cate to show in app bar, check cate job or not ----
  async function create_field_categories() {

      // --- true allow to re-create carousel (is false when watch hook execute) ---
      if (process.server || not_allow_re_render_carousel.value) {
          main_cate.value = []; sub_cate.value = []; // clear old data main or sub categories.
          refresh_carousel.value++; // increase to make carousel re-render when key change value after data category change.
          // console.log('refresh carousel => ' + refresh_carousel.value);

          let sh = categories.value && categories.value.data ? categories.value.data : [];
          all_categories.value = sh;
          let check_slug_category = set_SEO_category.value ? set_SEO_category.value : (route.params && route.params.slugCategory ? route.params.slugCategory : '');
          // -- action on Sub Categories --
          if (check_slug_category) {
              stop_loop:
              for (let i = 0; i < sh.length; i++) {
                  if (check_slug_category === sh[i].slug) {

                      // -- get full name of category to show in app bar --
                      show_category_name.value = language.value === 'km' ? sh[i].km_name : sh[i].en_name;

                      // -- check id or parent id, if in category job (2 = category job) for "change grid listing" --
                      if (parseInt(sh[i].id) === 2 || parseInt(sh[i].parent) === 2) {
                          is_cate_job.value = true;
                      } else {
                          is_cate_job.value = false;
                      }

                      // -- check is parent category OR sub category for (hide or show) --
                      if (parseInt(sh[i].parent) === 0) {   // 0 is parent category
                          is_parent_or_sub.value = 'parent'; // is parent category
                      } else {
                          is_parent_or_sub.value = 'sub';    // is sub category
                      }
                      // DATA SUB CATEGORY OVERFLOW CSS
                      let tmp_main = { type: '', cate_line: { line_1: [], line_2: [] } };
                      let tmp_first = [];
                      let store_length = 0;
                      for (let j = 0; j < sh.length; j++) {
                          if (sh[j].parent === sh[i].id) { // check parent_id === parent_id child
                              tmp_first.push(sh[j]);
                          }
                      }
                      let p_l = tmp_first.length;
                      // -- simple list category --
                      if (p_l <= 15) {
                          tmp_main.type = 'simple_categories'; // condition check.
                          for (const a in tmp_first) {
                              tmp_main.cate_line.line_1.push(tmp_first[a]);
                          }
                      // -- device category in two line or one line --
                      } else {
                          store_length = p_l / 2;
                          tmp_main.type = 'two_line_categories'; // condition check.
                          for (const a in tmp_first) {
                              if (parseInt(a)+1 <= store_length) {
                                  tmp_main.cate_line.line_1.push(tmp_first[a]);
                              } else {
                                  tmp_main.cate_line.line_2.push(tmp_first[a]);
                              }
                          }
                      }

                      cate_sub.value = tmp_main; // create Main Category in two line.

                      break stop_loop;
                      // sub_cate.value = [{ id: 1, per_page: [ 3, 5, 6 ] },]; // work only array like this in "<carousel>" loop in template.
                  }
              }

          // -- action on Main Categories --
          } else {
              // DATA SUB CATEGORY OVERFLOW CSS
              let tmp_main = { type: '', cate_line: { line_1: [], line_2: [] } };
              let tmp_first = [];
              let store_length = 0;
              for (let z = 0; z < sh.length; z++) {
                  if (sh[z].parent === "0") {
                      tmp_first.push(sh[z]);
                  }
              }
              let p_l = tmp_first.length;
              // -- simple list category --
              if (p_l <= 15) {
                  tmp_main.type = 'simple_categories'; // condition check.
                  for (const a in tmp_first) {
                      tmp_main.cate_line.line_1.push(tmp_first[a]);
                  }
              // -- device category in two line or one line --
              } else {
                  store_length = p_l / 2;
                  tmp_main.type = 'two_line_categories'; // condition check.
                  for (const a in tmp_first) {
                      if (parseInt(a)+1 <= store_length) {
                          tmp_main.cate_line.line_1.push(tmp_first[a]);
                      } else {
                          tmp_main.cate_line.line_2.push(tmp_first[a]);
                      }
                  }
              }
              cate_main.value = tmp_main; // create Main Category in two line.
          }

      // - set to true again for page change url when click Main or Sub category -
      } else {
          not_allow_re_render_carousel.value = true;
      }
  }

  /* ------------------- search filter by category ------------------- */
  // ---- show modal search filter ----
  function show_modal_search(not_show) {
      // -- add data to another field if user click  clear but not submit, so add data from query to each fields --
      clear_text_search.value = route && route.query && route.query.keyword ? check_title_search(route.query.keyword) : '';
      if (form.value) {
          $.each(form.value, (key, value) => {
              if (key === 'discount') {
                  form.value[key] = route.query[key];
              } else {
                  form.value[key] = route.query[key];
              }

              // -- check locations when open modal again prevent show old choose location when not click "Apply Filter" --
              if (key === 'district') {
                  if (districts.value.length > 0) {
                      if (districts.value[0].province_slug === route.query.province) { // is district is child of province query.
                          // nothing
                      } else {
                          districts.value = [];
                      }
                  }
              } else if (key === 'commune') {
                  if (communes.value.length > 0) {
                      if (communes.value[0].district_slug === route.query.district) { // is district is child of province query.
                          // nothing
                      } else {
                          communes.value = [];
                      }
                  }
              }
          });
      }
      // --- show modal search ---
      if (!not_show) {
          // console.log(form.value); console.log(districts.value); console.log(communes.value);
          check_location_data_when_reload_page(); // check location again when open modal search.

          $('#modal_post_filter').modal('show');
      }


      // --- check chained_field if exist in "fields" ---
      check_chained_field(fields.value);
      // -- if clear have field district and commune --
      if (route.query && route.query.province) {
          $('#district').prop("disabled", false);
      }
      if (route.query && route.query.district) {
          // this.show_data_communes(route.query.district);
          $('#commune').prop("disabled", false);
      }
  }

  function show_modal_search_dt(not_show) {
      // -- add data to another field if user click  clear but not submit, so add data from query to each fields --
      clear_text_search.value = route && route.query && route.query.keyword ? check_title_search(route.query.keyword) : '';
      if (form.value) {
          $.each(form.value, (key, value) => {
              if (key === 'discount') {
                  form.value[key] = route.query[key];
              } else {
                  form.value[key] = route.query[key];
              }

              // -- check locations when open modal again prevent show old choose location when not click "Apply Filter" --
              if (key === 'district') {
                  if (districts.value.length > 0) {
                      if (districts.value[0].province_slug === route.query.province) { // is district is child of province query.
                          // nothing
                      } else {
                          districts.value = [];
                      }
                  }
              } else if (key === 'commune') {
                  if (communes.value.length > 0) {
                      if (communes.value[0].district_slug === route.query.district) { // is district is child of province query.
                          // nothing
                      } else {
                          communes.value = [];
                      }
                  }
              }
          });
      }
      // --- show modal search ---
      if (!not_show) {
          // console.log(form.value); console.log(districts.value); console.log(communes.value);
          check_location_data_when_reload_page(); // check location again when open modal search.

          $('#modal_post_filter_dt').modal('show');
      }


      // --- check chained_field if exist in "fields" ---
      check_chained_field(fields.value);
      // -- if clear have field district and commune --
      if (route.query && route.query.province) {
          $('#district').prop("disabled", false);
      }
      if (route.query && route.query.district) {
          // this.show_data_communes(route.query.district);
          $('#commune').prop("disabled", false);
      }
  }
  
  // ---- request to get filter page for show in modal search query by category ----
  async function check_filter_page() {
      let clean_slug_more = set_SEO_category.value ? set_SEO_category.value : (slug.value ? slug.value : (route.params && route.params.slugCategory ? route.params.slugCategory : ''));
      let val_slug_cate = helper.clean_html_text(clean_slug_more); // check exist .html clean out.

      let path = route.path;
      // --- if cache not exist, must to request new ---
      if (!s_l_catch_cat_path.value.includes(path)) {
          // push path for check latter
          s_l_catch_cat_path.value.push(path);
          // request new filter
          loading_modal_search.value = true;

          try {
              let reqUrl = config.VUE_APP_API_URL_MOBI + 'filters/' + val_slug_cate;
              const {data: res_filter} = await useFetch(reqUrl, {
                  key: reqUrl,
                  params: {lang: language.value === 'km' ? 'km' : 'en', filter_version: 4, has_post: true, meta: true},
              })

              let R = res_filter.value && res_filter.value.data ? res_filter.value.data : '';

            //   console.log('R=======',R)
              // -> create dynamic form data v-model search when reload page, start new page or category change <-
              if (process.client) { loop_create_function(R); }

              short.value = R && R.sort ? R.sort : null;
              date.value = R && R.date ? R.date : null;
              location.value = R && R.locations ? R.locations : null;
              price.value = R && R.prices ? R.prices : null;
              year.value = R && R.fields && R.fields.ad_year ? R.fields.ad_year : null;
              fields.value = R && R.fields ? R.fields : null;
              deliveries.value = R && R.deliveries ? R.deliveries : null;
              
              // --------- add value to multiple select ---------
              var d_short = R && R.fields && R.fields.ad_features ? R.fields.ad_features : '';
              if (d_short.type === "multiple_select" && d_short.options) {
                  options.value = []; // clear options multiple select and than add new again
                  for (var i = 0; i < d_short.options.length; i++) {
                      options.value.push({value: d_short.options[i].fieldvalue, label: d_short.options[i].fieldtitle});
                  }
              }
              // --- check chained_field if exist in "fields" ---
              if (process.client) { check_chained_field(fields.value); }
              // --- create data cache filter ---
              s_l_catch_data_cat.value.push({'path': path, data: R }); // [{'path': 'url_path', data: [{...}] }];

              loading_modal_search.value = false;
          } catch (error) {
              if (process.server) {
                  console.log('-------> Error Filter at Search_listing page <--------')
                  console.log(error)
              } else {
                  if (error.response && error.response.status === 401) { // retry
                      if (reload_q_again_5.value <= 2) {
                          reload_q_again_5.value += 1;
                          check_new_auth_user();
                          setTimeout( () => { check_filter_page(); }, 3000);
                      } else {
                          localStorage.removeItem('auth_user');
                          VueCookieNext.removeCookie('auth_user');
                          router.replace(localePath({name: 'index'}));
                      }
                  }
              }
          }

      // --- if cache exist must to replace old ---
      } else {
          Object.entries(s_l_catch_data_cat.value).forEach(([k, v], index) => {
          // $.each(s_l_catch_data_cat.value, (k, v) => {
              if (v.path === path) { // if key path exist
                // console.log('V=======',v)
                  // -> create dynamic form data v-model search when reload page, start new page or category change <-
                  loop_create_function(v.data);
                  short.value = v.data.sort ? v.data.sort : null;
                  date.value = v.data.date ? v.data.date : null;
                  location.value = v.data.locations ? v.data.locations : null;
                  price.value = v.data.prices ? v.data.prices : null;
                  year.value = v.data && v.data.fields && v.data.fields.ad_year ? v.data.fields.ad_year : null;
                  fields.value = v.data.fields ? v.data.fields : null;
                  deliveries.value = v.data.deliveries ? v.data.deliveries : null;
                //   d_s.value = short.value.value.fieldvalue
                //     console.log(d_s.value)
                  // --------- add value to multiple select ---------
                  var d_short = v.data.fields && v.data.fields.ad_features ? v.data.fields.ad_features : '';
                  if (d_short.type === "multiple_select" && d_short.options) {
                      options.value = []; // clear options multiple select and than add new again
                      for (var i = 0; i < d_short.options.length; i++) {
                          options.value.push({
                              value: d_short.options[i].fieldvalue,
                              label: d_short.options[i].fieldtitle
                          });
                      }
                  }
                  // --- check chained_field if exist in "fields" ---
                  check_chained_field(fields.value);
                  // --- break the loop ---
                  return false;
              }
          });
      }

      // --- // get location for user select // --- //
      if (process.client) {
          let location_select = process.client ? (localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : '') : '';

          if ((!location_select) || (location_select && !location_select.data)) {


              $fetch(config.VUE_APP_API_URL + 'locations', {
                  params: { lang: language.value === 'km' ? 'km' : 'en' },
              }).then(res => {
                  // console.log(res.data);
                  let time_expired = helper.Date_To_Timestamp('', 3600, 'seconds')
                  const object = {
                      data: res && res.data ? res.data : '',
                      expiry: time_expired,  // add 1 hour
                  }
                  localStorage.setItem("locations", JSON.stringify(object));
                  locations.value = object;

              }).catch(e => {
                  console.log('-------> Error Locations at Search_listing page <--------');
                  console.log(e);
              });
          } else {
              locations.value = location_select ? location_select : [];
          }
      }

      // --- // get count search field // --- //
      count_badge_chat.value = 0; // clear old count badge chat and set new
      if (route && route.query) {
          if (route.query.keyword) { count_badge_chat.value++ }
          Object.entries(route.query).forEach(([key, value], index) => {
              if (/*key === 'slug_category' ||*/ key === 'keyword' || key === 'following') {
              } else {
                  if (!value === false && value !== 'false' && value !== undefined) {
                      count_badge_chat.value++;
                  }
              }
          });
      }

      // --- check province and district have in query and page is reload ---
      if (process.client) { check_location_data_when_reload_page(); }
  }
  // --- check chained_field if exist in "fields" and match with parent form data ---
  function check_chained_field() {
    setTimeout(() => {
      if (fields.value) {
        Object.entries(fields.value).forEach(([k, v], index) => {
        // $.each(fields.value, (k, v) => {
          if (v.chained_field !== '' && form.value[v.chained_field]) {
            let short = v.options;
            arr_ad_model.value = [];
            for (var e = 0; e < short.length; e++) {
              if (form.value[v.chained_field] === short[e].fieldparentvalue) {
                arr_ad_model.value.push({
                  'fieldtitle': short[e].fieldtitle,
                  'fieldvalue': short[e].fieldvalue,
                  'fieldparentvalue': short[e].fieldparentvalue
                });
              }
            }
            return false;
          }
        });
      }
    },500);
  }
  // ---- check districts or commune when reload page when have query districts ----
  function check_location_data_when_reload_page() {
    if (route.query && route.query.province && districts.value.length === 0) {
      check_dis_or_com(route.query.province, 'district'); // get district
    }
    if (route.query && route.query.district && communes.value.length === 0) {
      check_dis_or_com(route.query.district, 'commune'); // get commune
    }
  }
  function check_dis_or_com(slug_dis_or_com, condition) {
      $fetch(config.VUE_APP_API_URL+ 'locations', {
          params: {
              lang: language.value === 'km' ? 'km' : 'en',
              type: condition, // condition content district or commune
              parent: slug_dis_or_com,
          },
      }).then(res => {
          if (condition === 'district') {
              districts.value = res.data;
              a_m_district.value = res.data;
          } else {
              communes.value = res.data
              a_m_commune.value = res.data;
          }
          // get name from location is multiple or single select
          get_name_location();

      }).catch(error => { /*console.log(error);*/ });
  }
  // ---- if have selected location show districts ----
  function show_data_districts(ev) {
    if (location.value && location.value.district) { // if district have must to select
      form.value['district'] = ''; // clean select if choose new location
      form.value['commune'] = '';  // the same
      if (ev.target.value) {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL+ 'locations', {
          params: {
            lang: language.value === 'km' ? 'km' : 'en',
            type: 'district',
            parent: ev.target.value,
          },
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        }).then(res => {
          districts.value = res.data;
          a_m_district.value = res.data;
        }).catch(error => {  }).finally(() => (loading_field.value = false));

        $("#district").prop("disabled", false); // enable prop select html
        $("#commune").prop("disabled", true);   // disable prop select html
      } else {
        $("#district").prop("disabled", true);  // disable prop select html
        $("#commune").prop("disabled", true);   // disable prop select html
      }
    }
    desktop_view_change_field_search(); // only in desktop view
  }
  // ---- if have selected districts show communes ----
  function show_data_communes(ev) {
    form.value['commune'] = '';  // clear select if choose new district
    if (ev.target.value) {
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL+ 'locations', {
        params: {
          lang: language.value === 'km' ? 'km' : 'en',
          type: 'commune',
          parent: ev.target.value,
        },
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      }).then(res => {
        communes.value = res.data;
        a_m_commune.value = res.data;
      }).catch(e => {  }).finally(() => (loading_field.value = false));

      $("#commune").prop("disabled", false); // enable prop select html
    } else {
      $("#commune").prop("disabled", true);  // disable prop select html
    }
    desktop_view_change_field_search(); // only in desktop view
  }
  // ---- if have selected communes ----
    function communes_change(ev) {
      // console.log(ev.target.value);
      desktop_view_change_field_search(); // only in desktop view
    }
  // ---- click search query string ----
  function click_search(push_route) {

      let category_field = set_SEO_category.value ? set_SEO_category.value : (route.params && route.params.slugCategory ? route.params.slugCategory : ''); // check slug category from params or SEO
      let query_str = {};

      // if keyword query have, show
      if (clear_text_search.value) {
          query_str['keyword'] = check_title_search(clear_text_search.value);
      } else {
          query_str['keyword'] = '';
      }

      // if following query have, show
      if (route && route.query && route.query.following) { query_str['following'] = true; }

      // --- get value and key from v-model to search ---
      if (form.value) {
          $.each(form.value, (key, value) => {
              // get only key have value in query string, else let it empty
              if (form.value[key] === "" || form.value[key] === undefined || form.value[key] === false) {
                  // clear if not exit in query string.
              } else {
                  // if field exist and value have, show that field in query url.
                  query_str[key] = form.value[key];
              }
          });
      }

      // --- get name from location is multiple or single select ---
      get_name_location();

      // --- check ad_feature is multiple select so reab data tam ning ---
      var data_feature = form.value['ad_features'] ? form.value['ad_features'] : '';
      if (data_feature && Array.isArray(data_feature)) {
          for (var i = 0; i < data_feature.length; i++) {
              query_str['ad_features['+i+']'] = data_feature[i];
          }
      } else {
          if (data_feature) {
              query_str['ad_features[0]'] = data_feature;
          }
      }

      // $('#close_modal_query_str').click(); // close modal search
      $('#modal_post_filter').modal('hide');  // close modal search
      $('#modal_post_filter_dt').modal('hide');  // close modal search
            $('#modal_price_filter').modal('hide');
      // click search when category exist. (Sub Categories)
      if (category_field) {
          if (push_route) {
            //   console.log('1 1')
              router.push(localePath({ name: 'c-slugCategory', params: { slugCategory: category_field }, query: query_str }));
          } else {
            //   console.log('1 2')
              router.replace(localePath({ name: 'c-slugCategory', params: { slugCategory: category_field }, query: query_str }));
          }

      // click btn search when category not exit. (Main Categories)
      } else {
          if (var_province.value) { query_str['province'] = var_province.value; } // check province from query when category not exist
          if (push_route) {
              // console.log('2 1')
              router.push(localePath({ name: 'search', query: query_str }));
          }
          else {
              // console.log('2 2')
              if(r_name.value === 'all-ads'){
                // if have route all-ads
                router.replace(localePath({ name: 'all-ads', query: query_str }));
              }else{
                router.replace(localePath({ name: 'search', query: query_str }));
              }
              
          }
      }

      $("span").removeClass("show");
      $("div").removeClass("show");
  }
  // ---- dynamic create field v-model for search modal ----
    function loop_create_function(data) {
        var newObj = {};

        if (route && route.query && route.query.keyword) { clear_text_search.value = check_title_search(route.query.keyword); } // get value from query to store in clear_text_search variable when create field modal

        Object.entries(data).forEach(([key, value], index) => {
            // console.log(key)
            // $.each(data, (key, value) => {
            if (key === 'sort') {
                newObj[value.fieldname] = route.query[value.fieldname] ? route.query[value.fieldname] : '';
                // console.log(value.fieldname)
            } else if(key === 'date'){
                newObj[value.fieldname] = route.query[value.fieldname] ? route.query[value.fieldname] : '';
            } else {
                // console.log('ok')
                Object.entries(value).forEach(([k, val], index) => {
                    // $.each(value, (k, val) => {
                    if (key === 'deliveries') {
                        newObj[k] = route.query[val.fieldname] && JSON.parse(route.query[val.fieldname]) === true ? true : ''; // sometime true str or true boolean
                        // console.log(val.fieldname)
                    } 
                    else if (key === 'locations') {
                        newObj[k] = route.query[val.fieldname] ? route.query[val.fieldname] : '';
                        // console.log(val.fieldname)
                    } 
                    else {
                        if (val && val.max_field && val.min_field) { // min and max price
                            newObj[val.max_field.fieldname] = route.query[val.max_field.fieldname] ? route.query[val.max_field.fieldname] : '';
                            newObj[val.min_field.fieldname] = route.query[val.min_field.fieldname] ? route.query[val.min_field.fieldname] : '';
                            // console.log(val.max_field.fieldname)
                        } 
                        else if (val && val.fieldname === 'discount') {
                            newObj[k] = route.query[val.fieldname] && JSON.parse(route.query[val.fieldname]) === true ? true : ''; // sometime true str or true boolean
                            // console.log(val.fieldname)
                        } 
                        else {
                           if(val){
                            newObj[k] = route.query && route.query[val.fieldname] ? route.query[val.fieldname] : '';
                           }
                            // console.log(val.fieldname)
                        }
                    }
                });
            }
        });

        form.value = newObj;

        // -- check locations is multiple or single select --
        if (form.value) {
            $.each(form.value, (k, val) => {
                if (k === 'district' || k === 'commune') {
                    multiple_locations.value = 'show_multiple_location';
                }
            });
        }

        // -- clear disable field ad_model in modal, if create new fields data search --
        if (form.value.ad_field) { // not allow use in desktop view
            setTimeout( () => { change_ad_field(''); }, 500);
        }
    }
  // ---- clean special char to use in url ----
  function check_title_search(search_text) { return helper.check_special_search_text(search_text); }
  // ---- clear filter ----
  function clear_filter() {
    clear_text_search.value = ''; // clear text search in field modal
    let form_data = form.value;
    if (form_data) {
      $.each(form_data, (key, value) => {
        if (key === 'discount') { form_data[key] = false; } else { form_data[key] = ''; }
      });
    }

    // --- if clear have field district and commune ---
    $('#district').prop("disabled", true);
    $('#commune').prop("disabled", true);
  }
  // ---- click remove text in APP Bar ----
  function click_remove_text() {
    clear_text_search.value = ''; // clear keyword in search.
    click_search(''); // start search.
  }
  // ---- change discount ----
  function change_discount() {
      form.value.discount = $('#radio_discount').is(':checked');
      // console.log(form.value.discount);

      desktop_view_change_field_search(); // only in desktop view
  }
  // ---- change discount ----
  function change_delivery() {
      form.value.shipping = $('#radio_delivery').is(':checked');
      // console.log(form.value.shipping);

      desktop_view_change_field_search(); // only in desktop view
  }
  // ---- check chained_field is like parent in form search, create field by select ----
  function change_ad_field(fieldname) {
      // if ad_field and ad_model exist, must to check "chained_field" if exist (start code below bc field are dynamic)
      if (fieldname && form.value[fieldname] !== '') {
          // loop check chained_field value is exist and have in form data or not.
          Object.entries(fields.value).forEach(([k, v], index) => {
              // $.each(fields.value, (k, v) => {
              if (v.chained_field && form.value[v.chained_field] && v.chained_field === fieldname) {
                  // console.log('2');

                  // special => store new data chained_field when value parent change.
                  arr_ad_model.value = [];
                  var short = v.options;
                  for (var i = 0; i < short.length; i++) {
                      if (form.value[fieldname] === short[i].fieldparentvalue) {
                          arr_ad_model.value.push({
                              'fieldtitle': short[i].fieldtitle,
                              'fieldvalue': short[i].fieldvalue,
                              'fieldparentvalue': short[i].fieldparentvalue
                          });
                      }
                  }

                  // clear value of chained_field in form data to empty.
                  form.value[v.fieldname] = '';
              }
          });
      } 
      desktop_view_change_field_search(); // only in desktop view
  }

    // ---- click change grid ----
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
        display_list.value = localStorage.getItem('grid_homepage') ? JSON.parse(localStorage.getItem('grid_homepage')) : {type: 'grid'};

        reload_lazy_img(); // load lazy image.
    }
    

    // ---- radio change event (Desktop View) ----
    function change_radio() {
        // console.log(form.value);
        desktop_view_change_field_search();
    }
    // ---- desktop event change field and search ----
    function desktop_view_change_field_search() {
        if (isDesktop) { click_search(''); }
    }

    // ---- clear specific field ----
    function dt_clear_search(type, v_fields) {
        if (type === 'keyword') { // clear keyword
            clear_text_search.value = '';
        } else if (type === 'min_max') { // clear min and max
            for (let i = 0; i < v_fields.length; i++) {
                form.value[v_fields[i]] = ''; // clear multiple key
            }
        } else if (type === 'province' || type === 'district') { // clear multiple locations
            form.value[type] = ''; // clear parent
            if (type === 'province') { // clear sub child
                if (form.value['district']) { form.value['district'] = ''; districts.value = []; }
                if (form.value['commune']) { form.value['commune'] = ''; communes.value = []; }
            } else if (type === 'district') {
                if (form.value['commune']) {
                    form.value['commune'] = ''; communes.value = [];
                }
            }
        } else if (type === 'ad_field') { // is another "chained_field" have key "ad_field" must to clear too, bc it sub "ad_model" of "ad_field" key.
            form.value[type] = ''; // clear "ad_field" key
            // console.log(fields.value);
            $.each(fields.value, (k, v) => {
                if (v.chained_field && v.chained_field === 'ad_field') {
                    form.value[k] = '';
                }
            })


        } else { // clear all key type dynamic
            form.value[type] = '';
        }
        // console.log(form.value);
        desktop_view_change_field_search();
    }

    // ---- show chat ----
    function show_chat(post_id, data) {
        if (window.navigator.onLine) {

            // tracking on button chat
            track_action_on_post('chat', post_id, posts.value.length, pageSize.value, data.current_index, data.placement,
                data.display_type,{ paid: data.paid, placement: data.from });

            for (let i = 0; i < posts.value.length; i++) {
                if (post_id === posts.value[i].data.id) {

                    let to_id = posts.value[i].data.user && posts.value[i].data.user.id ? posts.value[i].data.user.id : '';
                    let username = posts.value[i].data.user && posts.value[i].data.user.username ? posts.value[i].data.user.username : '';
                    // -- if user login, go to chat --
                    if (user_data.value) {
                        router.push(localePath({
                            name: 'chats-detail-chat',
                            query: {to_id: to_id, username: username}
                        }));
                        let dt_post = {
                            show_topic_post_id: post_id,
                            title: posts.value[i].data.title,
                            price: posts.value[i].data.price,
                            img: posts.value[i].data.thumbnail ? posts.value[i].data.thumbnail : '',
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
                                title: posts.value[i].data.title, // helper.check_special_char(posts.value[i].data.title),
                                price: posts.value[i].data.price,
                                img: posts.value[i].data.thumbnail ? posts.value[i].data.thumbnail : ''
                            },
                            from: {name: 'listing'}
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

    // ---- check categories in localstorage ----
    async function loadCategories() {
        if (process.server || !categories.value || (categories.value && !categories.value.data) || (categories.value && !categories.value.url)
            || (categories.value && categories.value.url && categories.value.url !== config.VUE_APP_API_URL)) {
            loading.value = true;

            try {
                const { data: res_cate } = await useFetch(config.VUE_APP_API_URL_MOBI+ 'categories', {
                    params: {
                        meta: true,
                        v: 1, // for show real image on category
                    },
                })
                const object = {
                    data: res_cate.value.data,
                    meta: res_cate.value.meta,
                    expiry: helper.Date_To_Timestamp('', 7200, 'seconds'), // add 1 day
                    url: config.VUE_APP_API_URL, // for check to get new categories up to date.
                }

                categories.value = object;

                if (process.client) localStorage.setItem("categories", JSON.stringify(object));

                if (categories.value) {
                    create_field_categories(); // start create field categories again. when categories not show in UI.
                }

                loading.value = false;

            } catch (e) {
                if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_6.value <= 2) {
                        reload_q_again_6.value += 1;
                        setTimeout(() => { loadCategories(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
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
    // ---- click new post at bottom nav ---
    function ads_new_post() {
        let sh = categories.value && categories.value.data ? categories.value.data : [];
        if (route.params && route.params.slugCategory) {
            stop_loop:
            for (let i = 0; i < sh.length; i++) {
                if (route.params.slugCategory === sh[i].slug) {  // get full category detail.
                    save_track_optional('params_cat', sh[i]);    // save to params condition.
                    if (isMobile.value) {
                        $('#click_ads_new_post').click(); // click id at bottom navigation
                    } else {
                        $('#desktop_ads_new_post').click(); // click id at bottom navigation
                    }
                    // $('#desktop_ads_new_post').click();
                    break stop_loop;
                }
            }
        } else {
            // if (isDesktop) {
            //     $('#desktop_ads_new_post').click(); // click id at bottom navigation
            // } else {
            //     $('#click_ads_new_post').click(); // click id at bottom navigation
            // }
            if (isMobile.value) {
                $('#click_ads_new_post').click(); // click id at bottom navigation
            } else {
                $('#desktop_ads_new_post').click(); // click id at bottom navigation
            }
            // $('#desktop_ads_new_post').click();
        }
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }

    function loc_resume(){
        localStorage.setItem("list_re", '');
    }
    
    const a_l_l_pageSize = useState('a_l_l_pageSize',()=>0);
    const a_l_l_resume = useState('a_l_l_resume',()=>[]);
    a_l_l_pageSize.value = 0;
    a_l_l_resume.value = [];
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
