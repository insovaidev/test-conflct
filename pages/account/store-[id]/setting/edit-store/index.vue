
<template>
    <div>
        <!-- App Bar -->
        <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-0 l_h_con_title">
                    <p class="name_style truncate_wrap mb-0 ms-2 text-left"> Edit Information </p>
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'">
            <div class="max_width_form" :class="isDesktop ? 'col-8 p-0 dt_border dt_bg_form' : ''">
                <div v-if="isDesktop" class="dt_title_header"><h1>{{ $t('message.change_password') }}</h1></div>
                <div class="bg-white p-3" :class="isMobile ? 'mt-5' : 'mt_80 rounded'">
                    <div class="screen-d dt_title_header px-0 pt-0 mb-3"><h1>Edit Information</h1></div>
                    <!-- Name -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('lng.name') }} </label>
                        <input type="text" v-model="title" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div class="form_error_style d-none m-0" id="title"> <span id="msg_title"></span> </div>
                    </div>
                    <div v-if="error_title" class="e_form_error_style"><span class="text-danger float-left font_13 mb-2"> {{ error_title }} </span></div>

                    <!-- Categories -->
                    <div class="mb-3 _flex_ edit-store-categories width_100">
                        <div class="col p-0">
                            <label class="label_style mb-1 full_width text-left"> {{ $t('new_text_2.category') }} </label>
                            <div v-if="arr_categories.length === 0" @click="show_modal_category('modal','')" class="e-st-cate-con cur_sur" :class="isMobile ? 'field-height' : 'dt-field-height'"></div>
                            <div v-else class="e-st-cate-con py-0 min_h_38">
                                <ul v-if="arr_categories.length > 0" class="p-0 m-0">
                                    <li v-for="cate in arr_categories" :key="cate" class="multi_text">
                                        <p class="m-0 break_word full_width font_15"> {{ language === 'km' ? cate.km_title : cate.en_title }} </p>
                                        <i @click="minus_category(cate.id)" class="fas fa-minus-circle text-danger ms-2 cur_sur"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div @click="show_modal_category('modal','')" class="e-st-icon-plus cur_sur"><i class="fas fa-plus-square font_32"></i></div>
                    </div>

                    <!-- Short Description -->
                    <div class="mb-3">
                        <label class="label_style mb-1 text-left full_width"> {{ $t('new_text_2.short_description') }} </label>
                        <input type="text" v-model="description" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" maxlength="255">
                    </div>

                    <!-- Keywords -->
                    <div class="mb-3">
                        <div class="_flex_">
                            <div class="col p-0">
                                <label class="label_style label_left mb-1"> {{ $t('new_text_2.keyword') }} </label>
                                <input v-on:keydown="key_up_key_words" autocomplete="off" type="text" maxlength="30" id="key_words" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                            </div>
                            <div @click="add_key_words" class="cur_sur" :class="isMobile ? 'e-st-icon-plus ' : 'e-st-icon-pluss '"><i class="fas fa-plus-square font_32"></i></div>
                        </div>
                        <ul v-if="arr_keywords.length > 0" class="p-0">
                            <li v-for="keyword in arr_keywords" :key="keyword" @click="remove_key_words(keyword)" class="multi_text cur_sur">
                                <p class="m-0 break_word full_width font_15"> {{ keyword }} </p>
                                <i class="fas fa-minus-circle text-danger ms-2"></i>
                            </li>
                        </ul>
                    </div>

                    <!-- Email -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('lng.email') }} </label>
                        <input type="email" v-model="email" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    </div>

                    <!-- Phone Number 1 -->
                    <label class="label_style mb-1 full_width text-left"> {{ $t('message.phone_1') }} </label>

                    <div v-if="phone.length === 0" class="style_flex mb-3">
                        <div class="col-10 p-0">
                            <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone1"
                                   :class="error_phone1 ? 'form-control phone_error error_border more_border' : 'form-control more_border'"  :id="isMobile ? 'field-height' : 'dt-field-height'">
                            <span v-if="error_phone1" class="text-danger float-left font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                        </div>
                        <div class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number">
                            <span class="fas fa-plus-circle font_22 parent_color ml-3 " :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'" ></span>
                        </div>
                    </div>

                    <template v-else v-for="(p_n, index) in phone" :key="p_n">
                        <div v-if="index === 0" class="style_flex mb-3">
                            <div :class="phone.length === 1 ? 'col-10 p-0' : 'col-12 p-0'">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone1" class="form-control more_border"
                                       :class="error_phone1 ? 'phone_error error_border' : ''" :id="isMobile ? 'field-height' : 'dt-field-height'">
                                <span v-if="error_phone1" class="text-danger float-left font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                            </div>
                            <div v-if="phone.length === 1" class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number">
                                <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                        </div>
                        <div v-if="index === 1" class="style_flex mb-3">
                            <div :class="phone.length === 2 ? 'col-10 p-0 position_relative' : 'col-12 p-0 position_relative'">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone2" :placeholder="$t('message.phone_2')" id="phone2" class="form-control more_border pad_right_text_icon"
                                       ref="inputphone1" :class="error_phone2 ? (isMobile ? 'phone_error error_border field-height' : 'dt-field-height') : (isMobile ? 'phone_error error_border field-height' : 'dt-field-height')">
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'pt-2 fn_22'"></i>
                                <span v-if="error_phone2" class="text-danger float-left font_13 mb-2"> {{ $t('validation.error_valid_phone_2') }} </span>
                            </div>
                            <div v-if="phone.length === 2" class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number">
                                <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                        </div>
                        <div v-if="index === 2" class="style_flex mb-3">
                            <div class="col-12 p-0 position_relative">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone3" v-bind:placeholder="$t('message.phone_3')" id="phone3" class="form-control more_border pad_right_text_icon"
                                       ref="inputphone2" :class="error_phone3 ? (isMobile ? 'phone_error error_border field-height' : 'dt-field-height') : (isMobile ? 'phone_error error_border field-height' : 'dt-field-height')">
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'pt-2 fn_22'"></i>
                                <span v-if="error_phone3" class="text-danger float-left font_13 mb-2"> {{ $t('validation.error_valid_phone_3') }} </span>
                            </div>
                        </div>
                    </template>

                    <!-- About -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('message.about') }} </label>
                        <textarea class="form-control more_border" v-model="about" rows="3" name="text"></textarea>
                    </div>

                    <!-- locations -->
                    <div class="mb-3 position_relative">
                        <label class="label_style mb-1 text-left full_width"> {{ $t('new_text.location') }} </label>
                        <div @click="choose_location('show')" :class="province_name ? (isMobile ? 'p_sel_1 field-height' : 'p_sel_1 dt-field-height') : (isMobile ? 'p_sel_2 field-height' : 'p_sel_2 dt-field-height')" class="e_selection text-left cur_sur " >
                            <p v-if="province_name" class="truncate font_15 pad_dis_1 width_90" :class="isMobile ? 'm-2' : 'mt-1'">
                                {{ province_name ? province_name : '' }}
                                {{ district_name ? ' , '+district_name : '' }}
                                {{ commune_name ? ' , '+commune_name : '' }}
                            </p>
                            <p v-if="!province_name" class=" text_grey" :class="isMobile ? 'm-2' : 'mt-1'">{{ $t('new_text.choose_location') }}</p>
                        </div>
                        <i class="ion-android-arrow-dropdown s_icon_in_select_option" style="margin-top: -55px !important;"></i>
                    </div>

                    <!-- Address -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('message.address') }} </label>
                        <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"
                               name="address" id="address" v-model="address" autocomplete="off">
                    </div>

                    <!-- map -->
                    <a rel="nofollow" v-if="show_map" href="javascript:void(0)" class="mb-2 a_show_google_map position_relative">
                        <i @click.prevent="remove_lat_lng" class="fas fa-times-circle p_icon_remove_map"></i>
                        <div @click="show_location">
                            <ClientOnly>
                                <div id="show_new_map_store_static" class="map_disable_show"></div>

                                <!--<GMapMap
                                    :center="{ lat: def_lat, lng: def_lng }"
                                    :zoom="def_zoom"
                                    style="width: 100%; height: 100px;"
                                    :options="{
                                      fullscreenControl: false, // close full screen
                                      zoomControl: false, // close zoom
                                      mapTypeControl: false,
                                      streetViewControl: false, // close icon human
                                      draggable: false, // close move mouse
                                  }">
                                    <GMapMarker :position="{ lat: def_lat, lng: def_lng }" />
                                </GMapMap>-->
                            </ClientOnly>
                        </div>
                        <p @click="show_location" class="a_show_map_title">{{ $t('message.change_location') }}</p>
                    </a>

                    <div v-else class="a_con_empty_map" @click="show_location">
                        <a rel="nofollow" href="javascript:void(0)" class="a_edit_show_empty_map">
                            <div class="map_box btn_showMap">
                                <div class="text">
                                    <span class="fa fa-map-marked-alt"></span>
                                    {{ $t('new_text_3.set_google_map') }}
                                </div>
                            </div>
                        </a>
                    </div>

                    <!-- button submit -->
                    <button type="button" @click="fun_edit_store" class="btn btn-k24-secondary mt-3"
                            :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                        {{ $t('message.submit') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- show success message -->
        <div class="toast style_toast d-none toast_edit_store toast_z_index">
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

        <!-- modal Post Filter -->
        <div class="modal" :class="isMobile ? 'style_full_screen' : ''" id="modal_location" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" :class="isMobile ? 'style_full_screen' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                <div class="modal-content " :class="isMobile ? 'modal_content_style' : 'rounded'">
                    <!-- modal header -->
                    <div class="_div_nav bg_app_bar_header_ " :class="isMobile ? 'fix_app_bar' : ''">
                        <!-- back locations -->
                        <div v-if="type_loc" class="_pad_col_icon">
                            <button @click="click_black_loc" class="btn back-btn-app-bar">
                                <i class="ion-ios-arrow-back font_click_back"></i>
                            </button>
                        </div>
                        <!-- close modal -->
                        <div v-else id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                            <button data-bs-dismiss="modal" aria-label="Close" class="btn clear-btn-app-bar">
                                <i class="icon-clear font_click_back"></i>
                            </button>
                        </div>
                        <div class="col p_pad_title">
                            <div class="text-center">
                                <h1 class="name_style truncate pt-1 pb-1">
                                    <template v-if="type_loc === 'district'">{{ $t('new_text_3.khan_or_district') }}</template>
                                    <template v-else-if="type_loc === 'commune'">{{ $t('new_text_3.sangkat_or_commune') }}</template>
                                    <template v-else>{{ $t('new_text_3.city_or_province') }}</template>
                                </h1>
                            </div>
                        </div>
                        <div class="_pad_col_icon">
                            <button @click="clear_filter" class="btn text-white p_pad_clear">{{ $t('message.clear') }}</button>
                        </div>
                    </div>
                    <!-- modal body -->
                    <div class="modal-body" :class="isMobile ? 'p-0 m_bottom_app_bar' : ''">
                        <div>
                            <ul class="list-unstyled bg-white">
                                <li v-for="loc in mul_arr_location" :key="loc" class="full_field_tag cur_sur h-v-mouse d-flex" @click="show_next_location(loc)">
                                    {{ language === 'km' ? loc.km_name : loc.en_name }}
                                    <i class="float-right ms-auto" :class="loc.id === old_arr_loc.loc || loc.id === old_arr_loc.dis || loc.id === old_arr_loc.com ?
                                        'fas fa-check-circle color_sub_icon mt-1 parent_color' : 'ion-ios-arrow-forward text_grey'"></i>
                                </li>
                                <br><br><br>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal Post Filter -->

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

        <!-- Modal show google map -->
        <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="show_modal_google_map" tabindex="-1" role="dialog">
            <div class="modal-dialog " :class="isMobile ? 'modal_dialog_style' : 'modal_dialog_styles'" role="document">
                <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 's_content overflow_class' : ''">
                        <!-- content -->
                        <div class="modal-body map_modal_content chats_map_style">
                            <div v-if="data_lat && data_lng" @click="home_location" class="p_icon_my_location_in_map map_icon_home">
                                <i class="fas fa-home"></i>
                            </div>
                            <div @click="show_current_location('current_loc')" class="p_icon_my_location_in_map cur_sur">
                                <i class="icon-target"></i>
                            </div>
                            <div class="btn-map-zoom-con">
                                <button @click="zoom_in" class="btn btn-zoom-in" type="button" title="Zoom in">+</button>
                                <button @click="zoom_out" class="btn btn-zoom-out" type="button" title="Zoom Out">-</button>
                            </div>

                            <ClientOnly>
                                <div id="show_new_map_store" class="map_new_W_H"></div>

                                <!--<GMapMap
                                    :center="{ lat: def_lat, lng: def_lng }"
                                    :zoom="def_zoom"
                                    map-type-id="terrain"
                                    style="width: 100%; height: 100%;position: absolute!important;"
                                    :options="{ // control on map type
                                        // mapTypeControl: false,
                                        fullscreenControl: false, // close full screen
                                        streetViewControl: false, // close icon human
                                        /*disableDefaultUi: true,*/

                                         /*zoomControl: false,
                                         mapTypeControl: false,
                                         scaleControl: false,*/
                                    }"
                                    @zoom_changed="change_zoom_map"
                                    @center_changed="change_center_map"
                                >
                                </GMapMap>-->
                            </ClientOnly>
                        </div>
                        <!-- button sent map -->
                        <div class="p-2 text-center _flex_ border-top">
                            <div @click="cancel_map" class="col-4 p-0 cur_sur">
                                <p class="font_16 modal-title p-2 bg_grey mr-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                            </div>
                            <div @click="sent_map" class="col-8 p-0 cur_sur">
                                <p class="font_16 modal-title p-2 de-btn-message-sent rounded cur_sur"> {{ $t('new_text.save') }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show google map -->

        <!-- modal show add user -->
        <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="modal_categories" tabindex="-1" role="dialog" style="background-color: #00000066 !important;">
            <div class="modal-dialog" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 's_content overflow_class' : ''">
                        <!-- header -->
                        <div class="de-my-ads-con">
                            <div class="de-my-ads-header">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="mr-0"> {{ $t('message.ch_categories') }} </p>
                                <button @click="click_finish" class="btn btn-modal-finish">{{ $t('new_text_2.finish') }}</button>
                            </div>
                            <div class="de-my-ads-search input-group a_border_box_search">
                                <input type="text" autocomplete="off" maxlength="255" v-on:keyup="keymonitor_search" v-model="search_key_word"
                                       ref="inputsearch" id="new_user" placeholder="Filter..." class="form-control p-1">
                                <div class="input-group-append group_field_search_box">
                                    <button @click="search_category" type="button" class="btn" aria-label="search"><i class="ion-android-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <!-- content -->
                        <div class="modal-body d-store-add-member">
                            <ul v-if="arr_store_old_cate.length > 0" class="list-unstyled bg-white mb-0">
                                <li v-for="cat in arr_store_old_cate" :key="cat" @click="check_category(cat.slug)" class="full_field_tag">
                                    {{ language === 'km' ? cat.km_title : cat.en_title }}
                                    <i v-if="arr_check_in_list.includes(cat.slug)" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color"></i>
                                </li>
                            </ul>
                            <div v-if="arr_store_old_cate.length === 0" class="mt-5"><p class="no_more_result"> {{ $t('message.no_result') }} </p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal show add user -->
    </div>
</template>

<script setup>
    /* openLayers new map */
    import Feature from 'ol/Feature.js';
    import Map from 'ol/Map.js';
    import OSM from 'ol/source/OSM.js';
    import View from 'ol/View.js';
    import { Point } from 'ol/geom.js';
    import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction.js';
    import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
    import { Cluster, Vector as VectorSource, XYZ } from 'ol/source.js';
    import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';

    /* import nuxt plugin */
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
    const user_data = ref('');

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const i = ref(0);
    const loading = ref(false);
    const access_token = ref(null);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const arr_validation = ref([]);
    const show_map = ref(false);
    const store_id = ref(route.params.id ? route.params.id : '');
    // const branch_id = ref(route.params.branch_id ? route.params.branch_id : '');

    const locations = ref([]);     // field locations for modal search query
    const districts = ref([]);     // field districts for modal search query
    const communes = ref([]);      // field communes for modal search query

    const phone = ref([]);         // array store phone

    // bind value to v-model of field
    const title = ref(null);
    const description = ref(null);
    const email = ref(null);
    const phone1 = ref(null);
    const phone2 = ref(null);
    const phone3 = ref(null);
    const about = ref(null);
    const location = ref(null);
    const district = ref(null);
    const commune = ref(null);
    const address = ref(null);

    // multiple text
    const arr_keywords = ref([]);       // store arr keywords to show in UI.

    // categories
    const categories = ref([]);         // categories response from API.
    const arr_categories = ref([]);     // store arr categories to show in UI.
    const arr_check_in_list = ref([]);  // store slug that has checked in list.

    const search_key_word = ref('');    // search key word category.
    const arr_store_old_cate = ref([]); // arr category for search; prevent clear old data.

    // -- show and get from google map --
    const lat = ref(''); const  lng = ref(''); const  zoom = ref(''); // store data when map move or scroll zoom
    const def_lat = ref(0); const data_lat = ref('');
    const def_lng = ref(0); const data_lng = ref('');
    const def_zoom = ref(0); const data_zoom = ref('');
    const is_click_btn_zoom = ref(false); // zoom_in or zoom_out, click button or without click button.

    // -- show full name of location --
    const province_name = ref('');
    const district_name = ref('');
    const commune_name = ref('');
    // --- dynamic array location ---
    const mul_arr_location = ref([]);
    const type_loc = ref('');
    const tmp_pro_N = ref('');  const tmp_pro_ID = ref('');
    const tmp_dis_N = ref('');  const tmp_dis_ID = ref('');
    const tmp_comm_N = ref(''); const tmp_comm_ID = ref('');
    // old locations
    const old_arr_loc = ref({ loc: '', dis: '', com: '' });

    // --- new google map ---
    const new_map = ref('');
    const new_static_map = ref('');
    const lat_lng_loc = ref('');

    const error_title = ref(null);
    const error_phone1 = ref(false);
    const error_phone2 = ref(false);
    const error_phone3 = ref(false);

    // --- condition check request (if 401 three time clear user_data) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);

    // --- meta variable ---
    const meta_title_edit_store = useState('meta_title_edit_store', () => 'Edit Store - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_edit_store.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_edit_store.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_edit_store.value },
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
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            check_new_auth_user();

            if (helper.check_auth_user() === false) { // check auth exist or not
                router.replace(localePath({ name: 'auth' }));
            }

            // -- tracking on google analytic --
            track_google_analytics();

            // -- get detail info store --
            get_detail_store();
        }
    })


    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_edit_store');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_edit_store.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Edit Store', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // ---- check new user_data ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ============ phone number condition END ============
    // ---- add more field phone numbers ----
    function add_field_phone_number() {
        phone.value.push('');
        if (phone.value.length === 1) {
            phone.value.push('');
        } else if (phone.value.length === 2) {
            error_phone2.value = false;
            setTimeout(function () { $('body').find('#phone2').focus(); },500); // prevent not focus when not create yet in dom

        } else if (phone.value.length === 3) {
            error_phone3.value = false;
            setTimeout(function () { $('body').find('#phone3').focus(); },500);
        }
    }
    // ---- minus field phone number ----
    function minus_field_phone(index) {
        // - remove phone from array condition dynamic field add or remove -
        phone.value.splice(index, 1);
        // - remove phone form v-model -
        if (index === 1) {
            phone2.value = phone3.value ? phone3.value : null; // if phone2 remove but phone3 have value, must to store in phone2
            error_phone2.value = phone2.value ? check_phone(phone2.value) : false;
            phone3.value = null; // remove phone 3
        } else if (index === 2) {
            phone3.value = null;
            error_phone3.value = false;
        }
        // console.log(phone.value)
    }
    // ---- validation phone numbers ----
    function keymonitor() {
        setTimeout( () => {
            if (phone1.value) { error_phone1.value = check_phone(phone1.value); } else { error_phone1.value = false; }
            if (phone2.value) { error_phone2.value = check_phone(phone2.value); } else { error_phone2.value = false; }
            if (phone3.value) { error_phone3.value = check_phone(phone3.value); } else { error_phone3.value = false; }
        }, 300);
    }
    function check_phone(phone) {
        const nine_regex = /([0]{1})([0-9]{8})$/; // console.log(three_regex.test(phone1.value))
        const ten_regex = /([0]{1})([0-9]{9})$/;  // console.log(four_regex.test(phone1.value))
        if (nine_regex.test(phone) || ten_regex.test(phone)) {  // check if phone correct format
            return false; // if true, return false
        } else {
            return true;  // if false return true
        }
    }
    // ============ phone number condition END ============

    // ---- get detail store ----
    function get_detail_store() {
        check_new_auth_user();
        loading.value = true;
        // -- get user --
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: {
                    lang: language.value,
                    fields: 'id,title,username,logo,cover,owner_id,about,membership,modified_date,created_date,contact,description,category,categories,keywords,business_hours',
                },

            }).then(get_store => {
                let dp = get_store.data;

                // check all prevent error when have user_data but phone not exist
                phone.value = dp.contact && dp.contact.phone ? dp.contact.phone : [];

                // -- add value to model --
                title.value = dp.title ? dp.title : '';
                description.value = dp.description ? dp.description : '';
                email.value = dp.contact && dp.contact.email ? dp.contact.email : '';
                phone1.value = phone.value.length > 0 ? phone.value[0] : null;
                phone2.value = phone.value.length > 1 ? phone.value[1] : null;
                phone3.value = phone.value.length > 2 ? phone.value[2] : null;
                about.value = dp.about ? dp.about : '';
                location.value = dp.contact && dp.contact.location ? dp.contact.location.id : '';
                district.value = dp.contact && dp.contact.district ? dp.contact.district.id : '';
                commune.value = dp.contact && dp.contact.commune ? dp.contact.commune.id : '';
                address.value = dp.contact && dp.contact.address ? dp.contact.address : '';

                // -- store old locations, prevent change loc in modal without click "Apply" --
                old_arr_loc.value = { loc: location.value, dis: district.value, com: commune.value };

                // -- keywords --
                if (dp.keywords) { arr_keywords.value = dp.keywords.split(","); }

                // -- categories --
                show_modal_category('', dp.categories ? dp.categories : '');

                // -- show full location name if exist --
                province_name.value = dp.contact && dp.contact.location ? (language.value === '' || language.value === 'en' ? dp.contact.location.en_name : dp.contact.location.km_name) : '';
                district_name.value = dp.contact && dp.contact.district ? (language.value === '' || language.value === 'en' ? dp.contact.district.en_name : dp.contact.district.km_name) : '';
                commune_name.value = dp.contact && dp.contact.commune ? (language.value === '' || language.value === 'en' ? dp.contact.commune.en_name : dp.contact.commune.km_name) : '';

                when_edit(location.value, district.value); // collect data district and commune when edit

                loading.value = false;

                // -- show location in google map -- (data empty must to set current location of user)
                show_map.value = dp.contact && dp.contact.map ? true : false;
                def_lat.value = dp.contact && dp.contact.map ? parseFloat(dp.contact.map.x) : def_lat.value;
                def_lng.value = dp.contact && dp.contact.map ? parseFloat(dp.contact.map.y) : def_lng.value;
                def_zoom.value = dp.contact && dp.contact.map ? parseInt(dp.contact.map.z) : def_zoom.value;
                data_lat.value = def_lat.value;
                data_lng.value = def_lng.value;
                data_zoom.value = def_zoom.value;
                // -- show new google map --
                show_new_google_map();
                setTimeout(() => { show_new_static_google_map(); },300);

            }).catch(error => {
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { get_info_store(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({ name: 'index' }));
                    }
                }
            }).finally(() => (loading.value = false));
        }
    }

    // ---- click btn submit ----
    function fun_edit_store() {
        check_new_auth_user();

        if (window.navigator.onLine) {
            if (title.value && phone1.value && (error_phone1.value === false && error_phone2.value === false && error_phone3.value === false)) {
                let query_str = {
                    title: title.value,
                    description: description.value,
                    'phone[0]': phone1.value ? phone1.value : '',
                    'phone[1]': phone2.value ? phone2.value : '',
                    'phone[2]': phone3.value ? phone3.value : '',
                    about: about.value,
                    location: location.value,
                    district: district.value,
                    commune: commune.value,
                    address: address.value,
                    email: email.value,
                };

                // -- check location lat lng zoom --
                query_str['map[x]'] = data_lat.value ? data_lat.value : '';
                query_str['map[y]'] = data_lng.value ? data_lng.value : '';
                query_str['map[z]'] = data_zoom.value ? data_zoom.value : '';

                // -- keywords --
                if (arr_keywords.value.length > 0) {
                    for (var i = 0; i < arr_keywords.value.length; i++) {
                        query_str['keywords[' + i + ']'] = arr_keywords.value[i];
                    }
                } else {
                    query_str['keywords[0]'] = '';
                }

                // -- categories --
                if (arr_categories.value.length > 0) {
                    for (var j = 0; j < arr_categories.value.length; j++) {
                        query_str['categories[' + j + ']'] = arr_categories.value[j].id;
                    }
                } else {
                    query_str['categories[0]'] = '';
                }

                // console.log(query_str);
                // return;

                if (window.navigator.onLine) { // -- check is connect to internet --
                    loading.value = true;
                    // --- edit profile picture ---
                    $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value, {
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                        params: {lang: language.value},
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        body: new URLSearchParams(query_str)

                    }).then(res => {
                        toast_message(res.message, true);

                    }).catch(error => {
                        if (!error.response) {
                            loading.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                        } else {
                            if (error.response) {
                                let check = error.response;
                                let data_check = JSON.stringify(check);
                                let data_parse = JSON.parse(data_check);

                                if (check.status === 401) { // retry
                                    if (reload_q_again_2.value <= 2) {
                                        reload_q_again_2.value += 1;
                                        setTimeout(() => { fun_edit_store(); }, 3000);
                                    } else {
                                        localStorage.removeItem('auth_user');
                                        VueCookieNext.removeCookie('auth_user');
                                        router.replace(localePath({ name: 'index' }));
                                    }

                                } else if (check.status === 422) { // if error in validation
                                    // -- clear old validation --
                                    let store_arr = arr_validation.value;
                                    $.each(arr_validation.value, function (keys, val) {
                                        $('#' + val).addClass('d-none'); // remove validation by key
                                    });
                                    // -- show error validation --
                                    $.each(data_parse._data.errors, (key, value) => {
                                        $('#' + key).removeClass('d-none');
                                        $('#msg_' + key).text(value.message);
                                        store_arr.push(key); // to store old key for clear validation

                                        if (document.getElementById(key)) { // check if id element exist in dom, prevent error not show message to user
                                            $("html, body").animate({scrollTop: $("#" + key).offset().top - 100}, 500); // -100 = scroll more to top 100px, +100 = scroll more to bottom 100px
                                        }
                                    });
                                    // -- show toast --
                                    toast_message(data_parse._data.message, false);

                                } else {
                                    toast_message(data_parse._data.message, false);
                                }
                            }
                        }
                    }).finally(() => (loading.value = false));


                    error_title.value = null;   // clear error validation on title
                    return true;

                } else {
                    if (!error.response) {
                        loading.value = false; // close loading
                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                    }
                }
            }

            window.scrollTo(0, 0); // scroll to top of the screen is validation error

            if (!title.value) { error_title.value = "Title is Required."; } else { error_title.value = null; }
            if (!phone1.value) { error_phone1.value = "Phone is Required."; } else { error_phone1.value = null; }

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }


    // ---- add and remove keywords ----
    // add manually
    function add_key_words() {
        var get_text = $('#key_words').val();
        if (arr_keywords.value.length <= 10) {
            if (get_text) {
                arr_keywords.value.push(get_text);
                $('#key_words').val('');
                $('body').find('#key_words').focus();
            } else {
                $('body').find('#key_words').focus();
            }
        } else {
            $('#key_words').val('');
            toast_message('Not allow to add more.', false);
        }
    }
    // remove manually
    function remove_key_words(keyword) {
        $.each(arr_keywords.value, (key, value) => {
            if (value == keyword) {
                arr_keywords.value.splice(key, 1);
                return;
            }
        });
    }
    // click enter and add
    function key_up_key_words(e) {
        if (e.keyCode === 13) { // if click enter keyboard
            add_key_words();
            e.preventDefault(); // prevent form submit when click enter
        }
    }
    // ---- add and remove keywords ----

    // ---- add and remove categories ----
    // show modal
    function show_modal_category(is_modal, old_data) {
        // clear old arr of category, prevent show old check in list when start show modal again.
        arr_check_in_list.value = [];

        if (categories.value.length === 0) {
            check_new_auth_user();
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'me/stores/categories', {
                headers: {"Access-Token": user_data.value.tokens.access_token},
                params: {lang: language.value},
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),

            }).then(res => {
                categories.value = res.data;
                arr_store_old_cate.value = res.data;

                if (is_modal) { $('#modal_categories').modal('show'); }

                if (old_data) { $.each(old_data, (k, v) => { arr_check_in_list.value.push(v.slug); }); }
                // -- create fields data categories --
                $.each(categories.value, (k, v) => {
                    if (arr_check_in_list.value.includes(v.slug)) {
                        // -- create fields category to show in UI again --
                        arr_categories.value.push({ id: v.id, en_title: v.en_title,  km_title: v.km_title,  slug: v.slug, });
                    }
                    if (arr_categories.value.length === 3) { return; } // -- stop the loop if length equal 3 --
                });

            }).catch(error => {
                loading.value = false
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { get_infor_store(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({ name: 'index' }));
                    }
                }
            }).finally(() => (loading.value = false));

        } else {
            // clear search live arr category
            search_key_word.value = '';                  // clear search keyword
            arr_store_old_cate.value = categories.value;  // add old categories

            // clear arr_categories and recreate push data again
            if (arr_categories.value.length > 0) $.each(arr_categories.value, (k, v) => { arr_check_in_list.value.push(v.slug); });

            // show modal categories
            $('#modal_categories').modal('show');
        }
    }
    // click select and check in listing categories
    function check_category(slug) {
        // minus slug
        if (arr_check_in_list.value.includes(slug)) {
            var index = arr_check_in_list.value.indexOf(slug);
            if (index !== -1) {
                arr_check_in_list.value.splice(index, 1); // remove that index.
            }
            // console.log('minus');

        // add new slug
        } else {
            // if bigger than three length, not allow to add more.
            if (arr_check_in_list.value.length < 3) {
                arr_check_in_list.value.push(slug);
                // console.log('add new');
            } else {
                // console.log('not allow to add more');
            }
        }
    }
    // click button finish
    function click_finish() {
        arr_categories.value = []; // clear array show category in UI.
        if (arr_check_in_list.value.length > 0) {
            $.each(categories.value, (k, v) => {
                if (arr_check_in_list.value.includes(v.slug)) {
                    // -- recreate fields categories to show in UI again --
                    arr_categories.value.push({ id: v.id, en_title: v.en_title,  km_title: v.km_title,  slug: v.slug, });
                }
                if (arr_categories.value.length === 3) { return; } // stop the loop if length equal 3
            });
        }
        $('#modal_categories').modal('hide'); // hide modal categories.
    }
    // click minus category
    function minus_category(id) {
        // -- remove arr_categories.value --
        for (var j = 0; j < arr_categories.value.length; j++ ) {
            if (arr_categories.value[j].id === id) {
                arr_categories.value.splice(j, 1); // remove
                // console.log(arr_categories.value);
                break;
            }
        }
    }
    // search live
    function keymonitor_search(e) { if (e.keyCode === 13) { search_category(); } }
    function search_category() {
        let filterData = [];
        let arr_cate = categories.value;
        let search = search_key_word.value.toLowerCase();
        if (search) {
            for (var i = 0; i < arr_cate.length; i++) {
                let cat_title = arr_cate[i].en_title.toLowerCase();
                if (cat_title.includes(search)) {
                    filterData.push(arr_cate[i]);
                }
            }
            arr_store_old_cate.value = filterData;       // get data search filter live.
        } else {
            arr_store_old_cate.value = categories.value;  // get old original categories.
        }
    }
    // ---- add and remove categories ----

    // ---- open modal choose locations ----
    function choose_location(con) {
        if (window.navigator.onLine) {
            mul_arr_location.value = locations.value; // when open modal choose locations, must to store province array first.
            type_loc.value = '';
            tmp_pro_N.value = ''; tmp_pro_ID.value = '';
            tmp_dis_N.value = ''; tmp_dis_ID.value = '';
            tmp_comm_N.value = ''; tmp_comm_ID.value = '';
            $('#modal_location').modal(con);

        } else {
            $('#modal_show_status_error_connection').modal('show');
        }
    }
    // ---- clear location when click clear ----
    function clear_filter() {
        location.value = '';
        district.value = '';
        commune.value = '';
        province_name.value = '';
        district_name.value = '';
        commune_name.value = '';

        // clear old data too
        old_arr_loc.value = { loc: '', dis: '', com: '' };

        $('#close_modal_query_str').click();
    }





    function show_next_location(loc) {
        // console.log(loc);
        if (loc.type === 'province') {
            tmp_pro_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
            tmp_pro_ID.value = loc.id;
            show_change_data_location('', 'province', loc.slug); // get sub locations of this province.
            type_loc.value = 'district';
            if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.

        } else if (loc.type === 'district') {
            tmp_dis_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
            tmp_dis_ID.value = loc.id;
            show_change_data_location('', 'district', loc.slug); // get sub locations of this district.
            type_loc.value = 'commune';
            if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.

        } else {
            tmp_comm_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
            tmp_comm_ID.value = loc.id;
            if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.
        }

        // if select completed, must to store data old_array_location.
        if (tmp_pro_N.value && tmp_dis_N.value && tmp_comm_N.value) {
            province_name.value = tmp_pro_N.value;
            district_name.value = tmp_dis_N.value;
            commune_name.value = tmp_comm_N.value;
            location.value = tmp_pro_ID.value;
            district.value = tmp_dis_ID.value;
            commune.value = tmp_comm_ID.value;

            old_arr_loc.value = { loc: tmp_pro_ID.value, dis: tmp_dis_ID.value, com: tmp_comm_ID.value }
            $('#modal_location').modal('hide');

            type_loc.value = '';

            // get lat, lng and zoom from location
            show_last_lat_lng_from_location(lat_lng_loc.value);
        }
    }
    function click_black_loc() {
        if (type_loc.value === 'district') {
            mul_arr_location.value = locations.value;
            type_loc.value = '';
        } else if (type_loc.value === 'commune') {
            mul_arr_location.value = districts.value;
            type_loc.value = 'district';
        }
    }
    function show_last_lat_lng_from_location(lat_lng) {
        // -- show choose loc in modal google map --
        def_lat.value =  lat_lng ? lat_lng.x : '';
        def_lng.value = lat_lng ? lat_lng.y : '';
        def_zoom.value = lat_lng ? lat_lng.z : '';
    }
    // ---- if have selected location show districts ----
    function show_change_data_location(l_event , condition, _slug_) {
        let type_slug = '';
        if (condition === 'province') {
            districts.value = [];        // clear data district
            communes.value = [];         // clear data commune
            type_slug = 'district';      // set type for request

        } else if (condition === 'district') {
            communes.value = [];         // clear data commune
            type_slug = 'commune';       // set type for request
        }

        // -- check is from select or from click on choose multiple locations --
        let slug_location = '';
        if (_slug_) { // click manually select locations
            slug_location = _slug_;
        }

        if (slug_location) { // if slug exist, let request to get sub locations.
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'locations', {
                params: {lang: language.value, type: type_slug, parent: slug_location},
            }).then(res => {
                if (condition === 'province') {
                    districts.value = res.data;
                    mul_arr_location.value = districts.value;
                } else if (condition === 'district') {
                    communes.value = res.data;
                    mul_arr_location.value = communes.value;
                }

            }).catch(error => {
                if (!error.response) {
                    if (reload_q_again_4.value < 2) {
                        reload_q_again_4.value += 1;
                        check_new_auth_user();
                        setTimeout( () => { show_change_data_location(l_event , condition, slug); }, 3000);
                    } else {
                        $('#modal_show_status_error_connection').modal('show');
                    }

                } else if (error.response && error.response.status === 401) {
                    if (reload_q_again_4.value <= 2) {
                        reload_q_again_4.value += 1;
                        check_new_auth_user();
                        setTimeout( () => { show_change_data_location(l_event , condition, slug); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        router.replace(localePath({ name: 'index' }));
                    }
                }
            }).finally(() => (loading.value = false));
        }
    }
    function remove_lat_lng() {
        show_map.value = false; // show map static to empty
        def_lat.value = 0;
        def_lng.value = 0;
        def_zoom.value = 0;
        data_lat.value = '';
        data_lng.value = '';
        data_zoom.value = '';
        lat.value = '';
        lng.value = '';
        zoom.value = '';
    }





    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- show modal logout ----
    function show_Modal() { $('#modal_add_password').modal('show'); }

    // --- this function show when info use have location , district or commune ---
    // --- show all location when edit ---
    async function when_edit(id_location, id_district) {                   // use async for await request.
        loading.value = true;
        let slug_location = ''; let slug_district = '';

        // ==== get all locations for user choose ====
        await $fetch(config.VUE_APP_API_URL + 'locations', {        // await run first.
            params: { lang: language.value, },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        }).then(res => {
            locations.value = res && res.data ? res.data : [];

        }).catch(error => {
            if (!error.response) {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
            }
        }).finally(() => (loading.value = false));
        // ==== /get all locations for user choose ====

        // ==== get all districts if user have location ====
        /*if (locations.value.length && id_location) {
            $.each(locations.value, function (key, val) {
                if (id_location === val.id) {
                    slug_location = val.slug;
                }
            });
            await $fetch(config.VUE_APP_API_URL + 'locations', {        // await run second.
                params: {
                    lang: language.value,
                    type: 'district',
                    parent: slug_location,
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                districts.value = res.data;
                $("#district").prop("disabled", false);               // enable district can select

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            }).finally(() => (loading.value = false));
        }*/
        // ==== /get all districts if user have location ====

        // ==== get all commune if user have district ====
        /*if (id_location && districts.value.length && id_district) {
            $.each(districts.value, function(key, val) {
                if (id_district === val.id) {
                    slug_district = val.slug;
                }
            });
            await $fetch(config.VUE_APP_API_URL + 'locations', {        // await run third.
                params: {
                    lang: language.value,
                    type: 'commune',
                    parent: slug_district,
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                communes.value = res.data;
                $("#commune").prop("disabled", false);                 // enable commune can select

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            }).finally(() => (loading.value = false));
        }*/
    }

    // ======= show static map =======
    function show_new_static_google_map() {
        // create map
        new_static_map.value = new Map({
            // interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: 'show_new_map_store_static',
            view: new View({
                center: [data_lng.value, data_lat.value],
                zoom: data_zoom.value,
                projection: 'EPSG:4326'
            }),
            controls: [] // clear all control button im map.
        });
        create_icon_marker([data_lng.value, data_lat.value]);
    }
    function create_icon_marker(val_center) {
        var marker = new Feature({ geometry: new Point(val_center) });
        var iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: '/icon/marker.svg',
            })
        });
        marker.setStyle(iconStyle);
        var vec_Source = new VectorSource({
            features: [marker]
        });
        var vec_Layer = new VectorLayer({
            source: vec_Source
        });

        new_static_map.value.addLayer(vec_Layer); // add marker to map.
    }
    // ======= google map =======
    function show_location() {
        // --- get current locations lat lng ---
        show_current_location('');
        // --- show modal google map ---
        $('#show_modal_google_map').modal('show');
    }
    function show_new_google_map() {
        // create map
        new_map.value = new Map({
            interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: 'show_new_map_store',
            view: new View({
                center: [def_lng.value, def_lat.value],
                zoom: def_zoom.value,
                projection: 'EPSG:4326'
            }),
            // controls: [] // clear all control button im map.
        });

        // event map change get lat, lng and zoom.
        new_map.value.on('moveend', function(evt) {
            // get lng and lat of the map.
            let get_lat_lng = new_map.value.getView().getCenter();
            lng.value = get_lat_lng[0];
            lat.value = get_lat_lng[1];
            // get zoom level of the map.
            zoom.value = parseInt(new_map.value.getView().getZoom());

            // console.log('lng = '+lng.value+'  lat = '+lat.value+'  zoom = '+zoom.value);
        });
    }
    function zoom_in() {
        const view = new_map.value.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom + 1);
        // console.log(zoom + 1);
    }
    function zoom_out() {
        const view = new_map.value.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom - 1);
        // console.log(zoom - 1);
    }
    /*function change_center_map(m_event) {
        lng.value = m_event[0];
        lat.value = m_event[1];
        // console.log('lng = '+m_event[0]+'  lat = '+m_event[1]);

        // lat.value = m_event.lat();
        // lng.value = m_event.lng();
        // console.log('lng = '+lng.value+'  lat = '+lat.value);
    }*/
    function sent_map() {
        // -- set value to data store in server --
        data_lat.value = lat.value ? lat.value : def_lat.value;
        data_lng.value = lng.value ? lng.value : def_lng.value;
        data_zoom.value = zoom.value ? zoom.value : def_zoom.value;
        // -- close modal show map --
        $('#show_modal_google_map').modal('hide');
        // -- set value to data store in map show --
        def_lat.value = lat.value ? lat.value : def_lat.value;
        def_lng.value = lng.value ? lng.value : def_lng.value;
        def_zoom.value = zoom.value ? zoom.value : def_zoom.value;
        // -- show map --
        show_map.value = true;

        // clear static old map and show new static map.
        $('#show_new_map_store_static .ol-viewport').remove(); // it removes child from the parent.
        setTimeout(()=> { show_new_static_google_map(); },300);
    }
    function cancel_map() {
        $('#show_modal_google_map').modal('hide');
        lat.value = def_lat.value; lng.value = def_lng.value; zoom.value = def_zoom.value;  // if clear must to get old lat lng again.
    }
    function show_current_location(cur_location) {
        // check if user have own location
        let the_lat = def_lat.value ? parseFloat(def_lat.value) : '';
        let the_lng = def_lng.value ? parseFloat(def_lng.value) : '';
        let the_zoom = def_zoom.value ? parseInt(def_zoom.value) : '';

        navigator.geolocation.getCurrentPosition (
            (position) => {
                // set default prevent click on button my location not working.
                def_lat.value = 12.408612835420433;
                def_lng.value = 104.95790572031129;
                def_zoom.value = 7; // static lat lng middle in cambodia.

                // get current location
                // setTimeout(() => {
                    // start get current location only
                    if (cur_location) {
                        def_lat.value = position.coords.latitude;
                        def_lng.value = position.coords.longitude;
                        def_zoom.value = 15;
                        // console.log('current loc only');

                    // start check lat lng user or current location
                    } else {
                        def_lat.value = the_lat ? the_lat : position.coords.latitude;
                        def_lng.value = the_lng ? the_lng : position.coords.longitude;
                        def_zoom.value = the_zoom ? the_zoom : 15;
                        // console.log('all lat lng');
                    }

                    // --- prevent click save not change lat lng ---
                    lat.value = def_lat.value;
                    lng.value = def_lng.value;
                    zoom.value = def_zoom.value;
                    // --- prevent click save not change lat lng ---

                    // clear old map and show new map.
                    $('#show_new_map_store .ol-viewport').remove(); // it removes child from the parent.
                    show_new_google_map();
                // }, 100);

            },
            (error) => {
                // set default lat lng if error location or user dont have location, prevent data not change position when user click button.
                def_lat.value = the_lat ? the_lat : 12.408612835420433;
                def_lng.value = the_lng ? the_lng : 104.95790572031129;
                def_zoom.value = the_zoom ? the_zoom : 7; // static lat lng middle in cambodia.
                /*console.log(def_lat.value)
                console.log(def_lng.value)
                console.log(def_zoom.value)*/

                // clear old map and show new map.
                $('#show_new_map_store .ol-viewport').remove(); // it removes child from the parent.
                show_new_google_map();
            }
        );
    }
    function home_location() {

        // if on static_map empty must to get lat lng from user login.
        if (!data_lat.value && !data_lng.value) {
            let user_loc = user_data.value.user && user_data.value.user.contact && user_data.value.user.contact.map ? user_data.value.user.contact.map : '';
            def_lat.value = user_loc.x ? parseFloat(user_loc.x) : '';
            def_lng.value = user_loc.y ? parseFloat(user_loc.y) : '';
            def_zoom.value = 15; // user_loc.z ? parseInt(user_loc.z) : '';

        // else static_map have data_lat and data_lng must go direct to that location.
        } else {
            def_lat.value = data_lat.value;
            def_lng.value = data_lng.value;
            def_zoom.value = 15; // data_zoom.value;
        }

        // --- prevent click save not change lat lng ---
        lat.value = def_lat.value;
        lng.value = def_lng.value;
        zoom.value = def_zoom.value;
        // --- prevent click save not change lat lng ---

        // clear old map and show new map.
        $('#show_new_map_store .ol-viewport').remove(); // it removes child from the parent.
        show_new_google_map();
    }
</script>

