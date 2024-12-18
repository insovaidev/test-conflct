
<template>
    <div>
        <!-- App Bar -->
        <template v-if="isMobile">
            <App_bar_auth />
        </template>

        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- Body -->
        <div :class="isDesktop ? 'des_container mt-3 row justify-content-center' : 'no_padding margin_below_app_bar'" class="mt_80">
            <div class="max_width_form bg-white border rounded p-3" :class="isMobile ? 'mt-5' : ''">
                <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('text_desktop.Edit_info_profile') }}</h1></div>
                <div class="p-0 bg-white">
                    <!-- First Name -->
                    <div class="mb-3">
                        <label class="label full_width text-left"> {{ $t('message.first_name') }} </label>
                        <input type="text" v-model="first_name" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div class="form_error_style d-none m-0" id="first_name"> <span id="msg_first_name"></span> </div>
                    </div>
                    <div v-if="error_first_name" class="e_form_error_style">
                        <span class="text-danger float-start font_13 mb-2"> {{ $t('message.error_first_name') }} </span>
                    </div>
                    <!-- Last Name -->
                    <div class="mb-3">
                        <label class="label full_width text-left"> {{ $t('message.last_name') }} </label>
                        <input type="text" v-model="last_name" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div class="form_error_style d-none m-0" id="last_name"> <span id="msg_last_name"></span> </div>
                    </div>
                    <div v-if="error_last_name" class="e_form_error_style">
                        <span class="text-danger float-start font_13 mb-2"> {{ $t('message.error_last_name') }} </span>
                    </div>
                    <!-- Gender -->
                    <div v-if="!arr_params.from" class="mb-3">
                        <label class="label full_width text-left"> {{ $t('new_text_1.gender') }} </label>
                        <div class="radio-new-or-second-hand text-center row m-0">
                            <div class="col p_pad_radio_option" >
                                <input type="radio" id="m" v-model="gender" name="ad_condition" value="m">
                                <label for="m" :class="isMobile ? 'pt-2 field-height' : 'dt-field-height'">Male</label>
                            </div>
                            <div class="col p_pad_radio_option">
                                <input type="radio" id="f" v-model="gender" name="ad_condition" value="f">
                                <label for="f" :class="isMobile ? 'pt-2 field-height' : 'dt-field-height'">Female</label>
                            </div>
                        </div>
                    </div>
                    <!-- DOB -->
                    <div v-if="!arr_params.from" class="mb-3">
                        <label class="label full_width text-left"> {{ $t('new_text_1.DOB') }} </label>
                        <ClientOnly>
                            <DatePicker v-model="dob" placeholder="Select DOB" :class="isMobile ? 'field-height' : 'dt-field-height'" :clearable="true"/>
                        </ClientOnly>
                    </div>
                    <!-- Company name -->
                    <div class="mb-3">
                        <label class="label full_width text-left"> {{ $t('message.company') }} </label>
                        <input type="text" v-model="company" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    </div>
                    <!-- Email -->
                    <div class="mb-3">
                        <label class="label full_width text-left"> {{ $t('lng.email') }} </label>
                        <input type="email" v-model="email" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    </div>
                    <!-- Phone Number 1 -->
                    <label class="label full_width text-left"> {{ $t('message.phone_1') }} <b v-if="edit_con_to_post" class="text-danger">*</b> </label>
                    <div v-if="phone.length === 0" class="style_flex mb-3">
                        <div class="col-10 p-0">
                            <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone1"
                            :class="error_phone1 ? (isMobile ? 'phone_error error_border field-height pad_right_text_icon' : 'phone_error error_border dt-field-height pad_right_text_icon') : (isMobile ? 'field-height pad_right_text_icon' : 'dt-field-height pad_right_text_icon')" 
                            class="form-control more_border">
                            <span v-if="error_phone1" class="text-danger float-start font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                        </div>
                        <div class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number">
                            <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                        </div>
                    </div>
                    <template v-else v-for="(p_n, index) in phone" :key="index">
                        <div v-if="index === 0" class="style_flex mb-3">
                            <div :class="phone.length === 1 ? 'col-10 p-0' : 'col-12 p-0'">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone1"
                                :class="error_phone1 ? (isMobile ? 'phone_error error_border field-height pad_right_text_icon' : 'phone_error error_border dt-field-height pad_right_text_icon') : (isMobile ? 'field-height pad_right_text_icon' : 'dt-field-height pad_right_text_icon')" 
                                class="form-control more_border">
                                <span v-if="error_phone1" class="text-danger float-start font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                            </div>
                            <div v-if="phone.length === 1" class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number">
                                <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                        </div>
                        <div v-if="index === 1" class="style_flex mb-3">
                            <div :class="phone.length === 2 ? 'col-10 p-0 position_relative' : 'col-12 p-0 position_relative'">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone2" :placeholder="$t('message.phone_2')" id="phone2"
                                    ref="theinput1" 
                                    :class="error_phone2 ? (isMobile ? 'phone_error error_border field-height pad_right_text_icon' : 'phone_error error_border dt-field-height pad_right_text_icon') : (isMobile ? 'field-height pad_right_text_icon' : 'dt-field-height pad_right_text_icon')" 
                                    class="form-control more_border">
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                                <span v-if="error_phone2" class="text-danger float-start font_13 mb-2"> {{ $t('validation.error_valid_phone_2') }} </span>
                            </div>
                            <div v-if="phone.length === 2" class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number">
                                <span class="fas fa-plus-circle font_22 parent_color ml-3 " :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                        </div>
                        <div v-if="index === 2" class="style_flex mb-3">
                            <div class="col-12 p-0 position_relative">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone3" v-bind:placeholder="$t('message.phone_3')" id="phone3"
                                    ref="theinput2" 
                                    :class="error_phone3 ? (isMobile ? 'phone_error error_border field-height pad_right_text_icon' : 'phone_error error_border dt-field-height pad_right_text_icon') : (isMobile ? 'field-height pad_right_text_icon' : 'dt-field-height pad_right_text_icon')" 
                                    class="form-control more_border">
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                                <span v-if="error_phone3" class="text-danger float-start font_13 mb-2"> {{ $t('validation.error_valid_phone_3') }} </span>
                            </div>
                        </div>
                    </template>
                    <div v-if="error_phone_" class="e_form_error_style">
                        <span class="text-danger float-start font_13 mb-2"> {{ $t('message.error_phone') }} </span>
                    </div>
                    <!-- locations -->
                    <div class="mb-3 position_relative">
                        <label class="label text-left full_width"> {{ $t('new_text.location') }} <b v-if="edit_con_to_post" class="text-danger">*</b> </label>
                        <div @click="choose_location('show')" name="location" :class="province_name ? (isMobile ? 'p_sel_1 field-height' : 'p_sel_1 dt-field-height') : (isMobile ? 'p_sel_2 field-height' : 'p_sel_2 dt-field-height')" class="e_selection text-left cur_sur">
                            <p v-if="province_name" class="truncate font_15 pad_dis_1 width_90" :class="isMobile ? 'mt-2' : 'mt-1'">
                                {{ province_name ? province_name : '' }}
                                {{ district_name ? ' , '+district_name : '' }}
                                {{ commune_name ? ' , '+commune_name : '' }}
                            </p>
                            <p v-if="!province_name" class="m-2 text_grey" :class="isMobile ? '' : 'mt-1'">{{ $t('new_text.choose_location') }}</p>
                        </div>
                        <i class="ion-android-arrow-dropdown s_icon_in_select_option mt_58" :class="isMobile ? '' : 'pt-1'"></i>
                        <div v-if="error_loc" class="e_form_error">
                            <span class="text-danger float-start font_13 mb-2"> {{ $t('message.error_location') }} </span>
                        </div>
                    </div>
                    <!-- Address -->
                    <div class="mb-3">
                        <label class="label full_width text-left"> {{ $t('message.address') }} <b v-if="edit_con_to_post" class="text-danger">*</b> </label>
                        <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"
                            name="address" id="address" v-model="address" autocomplete="off">
                        <div v-if="error_address" class="pb-3">
                            <span class="text-danger float-start font_13"> {{ $t('message.error_address') }} </span>
                        </div>
                    </div>
                    <!-- Map -->
                    <a rel="nofollow" v-if="show_map" href="javascript:void(0)" class="mb-3 a_show_google_map position_relative">
                        <i @click.prevent="remove_lat_lng" class="fas fa-times-circle p_icon_remove_map"></i>
                        <div @click="show_location">
                            <ClientOnly>
                                <div id="show_new_map_acc_static" class="map_disable_show"></div>
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

                    <!-- check box (from business card) -->
                    <div v-if="arr_params.from" class="form-check a_show_check_box mt-3 mb-3">
                        <input @change="click_check_box" class="form-check-input" type="checkbox" v-model="check_box" id="flexCheckDefault">
                        <label class="form-check-label cur_sur" for="flexCheckDefault">{{ $t('new_text_1.check_edit_real') }}</label>
                    </div>

                    <!-- check box edit profile -->
                    <div v-else class="form-check a_show_check_box mt-3 mb-3">
                        <input @change="click_check_edit_contact_to_ads" class="form-check-input" type="checkbox" v-model="edit_con_to_post" id="flexCheckEdit">
                        <label class="form-check-label cur_sur" for="flexCheckEdit">
                            {{ $t('text_desktop.update_contact_to_ads') }}
                        </label>
                    </div>

                    <!-- button submit -->
                    <button type="button" @click="edit_profile_infor" class="btn btn-k24-secondary mt-2" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                        {{ arr_params.from ? (check_box ? $t('new_text_1.end_and_change') : $t('new_text_1.end')) : $t('message.submit') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- show success message -->
        <div class="toast style_toast d-none toast_z_index">
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
        <!-- modal Choose Multiple locations -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_location" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog " :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w' " role="document">
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
                    <div class="modal-body" :class="isMobile ? 'm_bottom_app_bar' : 'p-0 '">
                        <div>
                            <ul class="list-unstyled bg-white">
                                <li v-for="loc in mul_arr_location" :key="loc" class="full_field_tag cur_sur h-v-mouse" @click="show_next_location(loc)">
                                    {{ language === 'km' ? loc.km_name : loc.en_name }}
                                    <i class="float-end" :class="loc.id === old_arr_loc.loc || loc.id === old_arr_loc.dis || loc.id === old_arr_loc.com ?
                                        'fas fa-check-circle color_sub_icon mt-1 parent_color' : 'ion-ios-arrow-forward text_grey'"></i>
                                </li>
                                <br><br><br>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        <!-- Modal show google map -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_google_map" tabindex="-1" role="dialog">
            <div class="modal-dialog " :class="isMobile ? 'modal_dialog_style' : 'modal_dialog_styles' " role="document">
                <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? ' s_content overflow_class' : ''">
                        <!-- content -->
                        <div class="modal-body map_modal_content chats_map_style">
                            <div v-if="data_lat && data_lng" @click="home_location" class="p_icon_my_location_in_map map_icon_home">
                                <i class="fas fa-home"></i>
                            </div>
                            <div @click="show_current_location('current_loc')" class="p_icon_my_location_in_map">
                                <i class="icon-target"></i>
                            </div>
                            <div class="btn-map-zoom-con">
                                <button @click="zoom_in" class="btn btn-zoom-in" type="button" title="Zoom in">+</button>
                                <button @click="zoom_out" class="btn btn-zoom-out" type="button" title="Zoom Out">-</button>
                            </div>
                            <ClientOnly>
                                <div id="show_new_map_acc" class="map_new_W_H"></div>
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
    import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

    /* import nuxt plugin */
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import App_bar_auth from "/components/Header_auth";
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const language = ref(locale.value);

    const auth = ref('');
    const i = ref(0);
    const loading = ref(false);
    const access_token = ref(null);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const arr_validation = ref([]);
    const show_map = ref(false);

    const locations = ref([]);        // field locations for modal search query
    const districts = ref([]);        // field districts for modal search query
    const communes = ref([]);         // field communes for modal search query

    const phone = ref([]);            // array store phone
    const value_multi_text = ref([]); // array multi text

    // -- bind value to v-model of field --
    const first_name = ref(null);
    const last_name = ref(null);
    const gender = ref(null);
    const dob = ref(null);
    const company = ref(null);
    const email = ref(null);
    const phone1 = ref(null);
    const phone2 = ref(null);
    const phone3 = ref(null);
    const location = ref(null);
    const district = ref(null);
    const commune = ref(null);
    const address = ref(null);

    // -- show and get from google map --
    const lat = ref(''); const lng = ref(''); const zoom = ref(''); // store data when map move or scroll zoom
    const def_lat = ref(0); const data_lat = ref('');
    const def_lng = ref(0); const data_lng = ref('');
    const def_zoom = ref(0); const data_zoom = ref('');

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
    // -- old locations, address, lat lng map --
    const old_arr_loc = ref({ loc: '', dis: '', com: '' });

    const error_first_name = ref(null);
    const error_last_name = ref(null);
    const error_phone1 = ref(false);
    const error_phone2 = ref(false);
    const error_phone3 = ref(false);

    const error_phone_ = ref(null);
    const error_loc = ref(null);
    const error_address = ref(null);
    const isMobile= ref(helper.m_or_d())

    // --- new google map ---
    const new_map = ref('');
    const new_static_map = ref('');
    const lat_lng_loc = ref('');

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_3 = ref(0);

    // --- store params from detail chat ---
    const arr_params = ref([]);   // store all params in this array.
    const check_box = ref(false); // false = uncheck, true = check.

    const edit_con_to_post = ref(false); // false = uncheck, true = check.

    const pa_con = helper.get_params_make_condition(); // get data params condition.

    // --- meta variable ---
    const meta_title_e_pro = useState('meta_title_e_pro', () => 'Edit Profile - Khmer24.com');

    useHead({
        title: meta_title_e_pro.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_e_pro.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: meta_title_e_pro.value },
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
            check_new_auth_user();
            // --- store params to array ---
            // arr_params.value = route.params ? route.params : [];
            arr_params.value = pa_con && pa_con.params_optional && pa_con.params_optional.d_params ? pa_con.params_optional.d_params : [];
            // --- check auth exist or not ---
            if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); }
            // -- tracking on google analytic --
            track_google_analytics();
            // -- get detail info profile --
            get_detail_profile();
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('params_optional');
    })

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_e_pro.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Edit_profile', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- check new auth user ----
    function check_new_auth_user() { auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ============ phone number condition END ============
    // ---- add more field phone numbers ----
    function add_field_phone_number() {
        phone.value.push('');
        if (phone.value.length === 1) {
            phone.value.push('');
        } else if (phone.value.length === 2) {
            error_phone2.value = false;
            setTimeout(() => { $('body').find('#phone2').focus(); },1000);

        } else if (phone.value.length === 3) {
            error_phone3.value = false;
            setTimeout(() => { $('body').find('#phone3').focus(); },1000);
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

    // ---- toast message ---
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }

    // ---- get detail profile ----
    function get_detail_profile() {
        if (auth.value) {
            loading.value = true;

            $fetch(config.VUE_APP_API_URL + 'me/profile', {
                headers: { "Access-Token": auth.value.tokens.access_token },
                params: { lang: language.value },

            }).then((res) => {
                let dp = res.data;

                // check all prevent error when have auth but phone not exist
                phone.value = dp.contact && dp.contact.phone ? dp.contact.phone : [];
                access_token.value = auth.value.tokens.access_token;

                // -- add value to model --
                first_name.value = dp.first_name ? dp.first_name : '';
                last_name.value = dp.last_name ? dp.last_name : '';
                gender.value = dp.gender ? dp.gender : '';
                dob.value = dp.dob ? new Date(String(dp.dob)) : null; // new Date(String('08-01-2019')  OR  new Date(2019, 7, 1)
                company.value = dp.company ? dp.company : '';
                email.value = dp.contact && dp.contact.email ? dp.contact.email : '';
                phone1.value = phone.value.length > 0 ? phone.value[0] : null;
                phone2.value = phone.value.length > 1 ? phone.value[1] : null;
                phone3.value = phone.value.length > 2 ? phone.value[2] : null;
                location.value = dp.contact && dp.contact.location ? dp.contact.location.id : '';
                district.value = dp.contact && dp.contact.district ? dp.contact.district.id : '';
                commune.value = dp.contact && dp.contact.commune ? dp.contact.commune.id : '';
                address.value = dp.contact && dp.contact.address ? dp.contact.address : '';

                // -- store old locations, prevent change loc in modal without click "Apply" --
                old_arr_loc.value = { loc: location.value, dis: district.value, com: commune.value };

                // -- show full location name if exist --
                province_name.value = dp.contact && dp.contact.location ? (language.value === '' || language.value === 'en' ? dp.contact.location.en_name : dp.contact.location.km_name) : '';
                district_name.value = dp.contact && dp.contact.district ? (language.value === '' || language.value === 'en' ? dp.contact.district.en_name : dp.contact.district.km_name) : '';
                commune_name.value = dp.contact && dp.contact.commune ? (language.value === '' || language.value === 'en' ? dp.contact.commune.en_name : dp.contact.commune.km_name) : '';

                when_edit(location.value, district.value); // collect data district and commune when edit

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

            }).catch((e) => {
                if (!e.response || (e && e.response && e.response.status === 401)) {
                    if (reload_q_again_3.value < 2) {
                        reload_q_again_3.value += 1;
                        setTimeout( () => { get_detail_profile(); }, 3000);
                    }
                }
            }).finally(() => (loading.value = false));
        }
    }

    // ---- click btn submit ----
    function edit_profile_infor() {
        check_new_auth_user();

        // helper.Date_To_Timestamp('', expired, 'seconds');
        if (window.navigator.onLine) {
            if (first_name.value && last_name.value && (error_phone1.value === false && error_phone2.value === false && error_phone3.value === false)) {

                if ((edit_con_to_post.value && address.value && location.value && phone1.value) || !edit_con_to_post.value) {

                    let dob_date = '';
                    if (dob.value) { // clean dob_date to correct format
                        let cl_date = new Date(dob.value);
                        let day = cl_date.getDate();
                        let month = cl_date.getMonth() + 1;
                        let year = cl_date.getFullYear();
                        if (parseInt(day) < 10) day = '0' + day;
                        if (parseInt(month) < 10) month = '0' + month;
                        dob_date = year + '-' + month + '-' + day; // ex: 2023-01-15
                    }

                    let query_str = {
                        first_name: first_name.value,
                        last_name: last_name.value,
                        gender: gender.value,
                        dob: dob_date ? dob_date : '',   // convert timezone to time date time
                        'phone[0]': phone1.value ? phone1.value : '',
                        'phone[1]': phone2.value ? phone2.value : '',
                        'phone[2]': phone3.value ? phone3.value : '',
                        location: location.value,
                        district: district.value,
                        commune: commune.value,
                        address: address.value,
                        company: company.value,
                        email: email.value,
                    };

                    // -- check location lat lng zoom --
                    query_str['map[x]'] = data_lat.value ? data_lat.value : '';
                    query_str['map[y]'] = data_lng.value ? data_lng.value : '';
                    query_str['map[z]'] = data_zoom.value ? data_zoom.value : '';

                    // -- is check update contact to post --
                    if (!arr_params.from) { // only check in edit profile. not edit in business card from chats.
                        query_str['update_contact_to_posts'] = edit_con_to_post.value; // do this more
                    }

                    if (window.navigator.onLine) { // -- check is connect to internet --

                        let a_pa = arr_params.value;
                        // -- if click from detail chat and not click checkbox --
                        if (a_pa.from && check_box.value === false) {
                            let query = {};
                            if (a_pa.to_id) {
                                query = {to_id: a_pa.to_id, username: a_pa.username};
                            } else {
                                query = {topic_id: a_pa.topic_id, username: a_pa.username};
                            }
                            query_str['full_location'] = {
                                pro_name: province_name.value,
                                dis_name: district_name.value,
                                com_name: commune_name.value,
                                address: address.value
                            }
                            save_track_optional('dt_post', {business_card: 'show', data: JSON.stringify(query_str)});

                            // -> is from page chats in desktop view (detail chat)
                            if (a_pa.from === 'chat_list') {
                                router.replace(localePath({name: 'chats', query: query}));
                                // -> is from page detail_chat, desktop or mobile view
                            } else if (a_pa.from === 'detail_chat') {
                                router.replace(localePath({name: 'chats-detail-chat', query: query}));
                            }

                        // -- else click edit simple --
                        } else {
                            loading.value = true;
                            // --- edit profile picture ---
                            $fetch(config.VUE_APP_API_URL + 'me', {
                                headers: {"Access-Token": access_token.value},
                                method: 'POST',
                                params: {lang: language.value},
                                body: new URLSearchParams(query_str)
                            }).then(res => {

                                // --- if change success set new value user to localStorage ---
                                $fetch(config.VUE_APP_API_URL + 'me', {
                                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                                    headers: {"Access-Token": access_token.value},
                                    params: {lang: language.value},
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

                                    // ---- change quick login in localStorage if firstname or lastname change ----
                                    let change_quick_data = {
                                        id: res_data.id,
                                        name: res_data.name,
                                        username: res_data.username,
                                        password: '',
                                        photo: res_data.photo ? res_data.photo.medium.url : ''
                                    }
                                    helper.change_quick_login_data(change_quick_data);

                                    toast_message(res.message, true);

                                    // -- set new location to map --
                                    def_lat.value = lat.value ? lat.value : def_lat.value;
                                    def_lng.value = lng.value ? lng.value : def_lng.value;
                                    def_zoom.value = zoom.value ? zoom.value : def_zoom.value;

                                    // -- if click edit profile from detail chat --
                                    if (a_pa.from && (a_pa.from === 'detail_chat' || a_pa.from === 'chat_list')) {
                                        let query = {};
                                        if (a_pa.to_id) {
                                            query = {to_id: a_pa.to_id, username: a_pa.username};
                                        } else {
                                            query = {topic_id: a_pa.topic_id, username: a_pa.username};
                                        }
                                        query_str['full_location'] = {
                                            pro_name: province_name.value,
                                            dis_name: district_name.value,
                                            com_name: commune_name.value,
                                            address: address.value
                                        }
                                        save_track_optional('dt_post', {
                                            business_card: 'show',
                                            data: JSON.stringify(query_str)
                                        });
                                        // -> is from page chats in desktop view (detail chat)
                                        if (a_pa.from === 'chat_list') {
                                            router.replace(localePath({name: 'chats', query: query}));
                                            // -> is from page detail_chat, desktop or mobile view
                                        } else if (a_pa.from === 'detail_chat') {
                                            router.replace(localePath({name: 'chats-detail-chat', query: query}));
                                        }
                                    }

                                }).catch(error => {
                                    if (!error.response) {
                                        if (reload_q_again_1.value < 2) {
                                            reload_q_again_1.value += 1;
                                            check_new_auth_user();
                                            setTimeout(() => {
                                                edit_profile_infor();
                                            }, 3000);
                                        } else {
                                            loading.value = false; // close loading
                                            $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                                        }

                                    } else if (error.response && error.response.status === 401) { // retry
                                        if (reload_q_again_1.value <= 2) {
                                            reload_q_again_1.value += 1;
                                            check_new_auth_user();
                                            setTimeout(() => {
                                                edit_profile_infor();
                                            }, 3000);
                                        } else {
                                            localStorage.removeItem('auth_user');   // remove localStorage
                                            VueCookieNext.removeCookie('auth_user');
                                            router.replace(localePath({name: 'index'}));
                                        }
                                    }
                                }).finally(() => (loading.value = false));
                                // --- /if change success set new value user to localStorage ---

                                // -- clear old validation error when success --
                                if (arr_validation.value.length > 0) {
                                    $.each(arr_validation.value, function (keys, val) {
                                        $('#' + val).addClass('d-none'); // remove validation by key
                                    });
                                }
                                // -- /clear old validation error when success --

                            }).catch(error => {
                                if (!error.response) {
                                    if (reload_q_again_2.value < 2) {
                                        reload_q_again_2.value += 1;
                                        check_new_auth_user();
                                        setTimeout(() => {
                                            edit_profile_infor();
                                        }, 3000);
                                    } else {
                                        loading.value = false; // close loading
                                        $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
                                    }

                                } else if (error.response) {
                                    let check = error.response; // original data error
                                    let data_check = JSON.stringify(check);
                                    let data_parse = JSON.parse(data_check);

                                    if (check.status === 401) { // retry
                                        if (reload_q_again_2.value <= 2) {
                                            reload_q_again_2.value += 1;
                                            check_new_auth_user();
                                            setTimeout(() => {
                                                edit_profile_infor();
                                            }, 3000);
                                        } else {
                                            localStorage.removeItem('auth_user');   // remove localStorage
                                            VueCookieNext.removeCookie('auth_user');
                                            router.replace(localePath({name: 'index'}));
                                        }

                                    } else if (check.status === 422) { // if error in validation
                                        // -- clear old validation --
                                        let store_arr = arr_validation.value;
                                        $.each(arr_validation.value, function (keys, val) {
                                            $('#' + val).addClass('d-none'); // remove validation by key
                                        });
                                        // -- show error validation --
                                        $.each(error.response.data.errors, (key, value) => {
                                            $('#' + key).removeClass('d-none');
                                            $('#msg_' + key).text(value.message);
                                            store_arr.push(key); // to store old key for clear validation

                                            if (document.getElementById(key)) { // check if id element exist in dom, prevent error not show message to user
                                                $("html, body").animate({scrollTop: $("#" + key).offset().top - 100}, 500); // -100 = scroll more to top 100px, +100 = scroll more to bottom 100px
                                            }
                                        });

                                        toast_message(data_parse._data.message, false);  // show toast error

                                    } else {
                                        toast_message(data_parse._data.message, false);  // show toast error
                                    }
                                }
                            }).finally(() => (loading.value = false));
                        }

                        error_first_name.value = null;   // clear error validation on username
                        error_last_name.value = null;    // clear error validation on password
                        error_phone_.value = null;       // clear error validation on phone
                        error_loc.value = null;          // clear error validation on location
                        error_address.value = null;      // clear error validation on address

                        return true;

                    } else {
                        if (!error.response) {
                            loading.value = false; // close loading
                            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                        }
                    }

                }
            }

            error_first_name.value = !first_name.value ? "is_required" : null;
            error_last_name.value = !last_name.value ? "is_required" : null;
            if (!first_name.value || !last_name.value) window.scrollTo(0, 0); // scroll to top of the screen is validation error
            // if check box edit contact to post. must to validation on fields phone, location and address.
            if (edit_con_to_post.value) {
                error_phone_.value = !phone1.value ? 'is_required' : null;
                error_loc.value = !location.value ? 'is_required' : null;
                error_address.value = !address.value ? 'is_required' : null;
            }

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }

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
    // ---- if have selected location show districts ----
    
    // ---- add and remove multi text ----
    function add_multi_text() {
        let get_text = $('#multi_text').val();
        if (get_text) {
            value_multi_text.value.push(get_text);
            $('#multi_text').val('');
            $('body').find('#multi_text').focus();
        } else {
            $('body').find('#multi_text').focus();
        }
    }
    function remove_multi_text(text) {
        $.each(value_multi_text.value, (key, value) => {
            if (value == text) {
                value_multi_text.value.splice(key, 1);
                return;
            }
        });
    }
    // ---- add and remove multi text ----
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
    function click_check_edit_contact_to_ads() {
        // set required on field phone, location and address
        if (edit_con_to_post.value) {
            error_phone_.value = !phone1.value ? 'is_required' : null;
            error_loc.value = !location.value ? 'is_required' : null;
            error_address.value = !address.value ? 'is_required' : null;

        // close required on field phone, location and address
        } else {
            error_phone_.value =  null;
            error_loc.value =  null;
            error_address.value =  null;
        }
    }
















    // ---- click check or uncheck ----
    function click_check_box() { /*console.log(check_box.value);*/ }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- show modal logout ----
    function show_Modal() { $('#modal_add_password').modal('show'); }

    // --- this function show when info use have location , district or commune ---
    // show all location when edit
    async function when_edit(id_location, id_district) {                   // use async for await request.
        loading.value = true;
        let slug_location = ''; let slug_district = '';

        // ==== get all locations for user choose ====
        await $fetch(config.VUE_APP_API_URL + 'locations', {        // await run first.
            params: { lang: language.value, },
        }).then(res => {
            locations.value = res && res.data ? res.data : [];

        }).catch(error => {
            if (!error.response) {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
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
            await $fetch(config.VUE_APP_API_URL + 'locations', { // await run second.
                params: {
                    lang: language.value,
                    type: 'district',
                    parent: slug_location,
                },
            }).then(res => {
                districts.value = res.data;

            }).catch(e => {
                if (!e.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // if connection slow and timeout
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
            await $fetch(config.VUE_APP_API_URL + 'locations', { // await run third.
                params: {
                    lang: language.value,
                    type: 'commune',
                    parent: slug_district,
                },
            }).then(res => {
                communes.value = res.data;

            }).catch(e => {
                if (!e.response) {
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
            target: 'show_new_map_acc_static',
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
        var marker = new Feature({
            // geometry: new Point(fromLonLat(center.value)) // fromLonLat = not show maker.
            geometry: new Point(val_center)
        });
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
            target: 'show_new_map_acc',
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
        $('#show_new_map_acc_static .ol-viewport').remove(); // it removes child from the parent.
        setTimeout(()=> { show_new_static_google_map(); },300);
    }
    function cancel_map() {
        $('#show_modal_google_map').modal('hide');
        lat.value = def_lat.value; lng.value = def_lng.value; zoom.value = def_zoom.value;  // if clear must to get old lat lng again.
    }
    function show_current_location(cur_location) {
        // check if user have own location
        let s_lat = def_lat.value ? parseFloat(def_lat.value) : '';
        let s_lng = def_lng.value ? parseFloat(def_lng.value) : '';
        let s_zoom = def_zoom.value ? parseInt(def_zoom.value) : '';

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
                        def_lat.value = s_lat ? s_lat : position.coords.latitude;
                        def_lng.value = s_lng ? s_lng : position.coords.longitude;
                        def_zoom.value = s_zoom ? s_zoom : 15;
                        // console.log('lng = '+def_lng.value+'  lat = '+def_lat.value+'  zoom = '+def_zoom.value);
                        // console.log(def_lat.value);
                    }

                    // --- prevent click save not change lat lng ---
                    lat.value = def_lat.value;
                    lng.value = def_lng.value;
                    zoom.value = def_zoom.value;
                    // --- prevent click save not change lat lng ---

                    // clear old map and show new map.
                    $('#show_new_map_acc .ol-viewport').remove(); // it removes child from the parent.
                    show_new_google_map();

                // }, 100);

            },
            (error) => {
                // set default lat lng if error location or user dont have location, prevent data not change position when user click button.
                def_lat.value = s_lat ? s_lat : 12.408612835420433;
                def_lng.value = s_lng ? s_lng : 104.95790572031129;
                def_zoom.value = s_zoom ? s_zoom : 7; // static lat lng middle in cambodia.
                // console.log(def_lat.value);
                // console.log(def_lng.value);
                // console.log(def_zoom.value);

                // clear old map and show new map.
                $('#show_new_map_acc .ol-viewport').remove(); // it removes child from the parent.
                show_new_google_map();
            }
        );
    }
    function home_location() {

        // if on static_map empty must to get lat lng from user login.
        if (!data_lat.value && !data_lng.value) {
            let user_loc = auth.value.user && auth.value.user.contact && auth.value.user.contact.map ? auth.value.user.contact.map : '';
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
        $('#show_new_map_acc .ol-viewport').remove(); // it removes child from the parent.
        show_new_google_map();
    }

    // ---- store all type params ----
    function save_track_optional(type, data_params) { helper.params_make_condition(type, data_params); }
</script>

