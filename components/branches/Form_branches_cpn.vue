
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
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ branch_id ? $t('new_text_2.edit_branch') : $t('new_text_2.add_branch') }} </p>
                </div>
            </div>
        </div>

        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="khmer24 loading" class="loading_width loading_bg">
            </div>
        </div>

        <!-- Body -->
        <div class="no_padding" :class="isMobile ? 'mt-5' : 'margin_below_app_bar'">
            <div class="max_width_form" :class="isDesktop ? 'col-8 dt_border dt_bg_form p-0' : ''">
                <div v-if="isDesktop" class="dt_title_header"><h1>{{ branch_id ? $t('new_text_2.edit_branch') : $t('new_text_2.add_branch') }}</h1></div>
                <div class="p-3 mt_80 bg-white">
                    <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ branch_id ? $t('new_text_2.edit_branch') : $t('new_text_2.add_branch') }}</h1></div>
                    <!-- Title -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('lng.title') }} </label>
                        <input type="text" v-model="title" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="focus_title">
                        <div class="form_error_style d-none m-0" id="title"> <span id="msg_title"></span> </div>
                    </div>
                    <div v-if="error_title" class="e_form_error_style"> <span class="text-danger float-left font_13 mb-2"> {{ error_title }} </span> </div>

                    <!-- Email -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('lng.email') }} </label>
                        <input type="email" v-model="email" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        <div class="form_error_style d-none m-0" id="email"> <span id="msg_email"></span> </div>
                    </div>

                    <!-- Phone Number 1 -->
                    <label class="label_style mb-1 full_width text-left"> {{ $t('message.phone_1') }} </label>

                    <div v-if="phone.length === 0" class="style_flex mb-3">
                        <div class="col-10 p-0">
                            <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone1" id="_phone1_" class="form-control more_border"
                            :class="error_phone1 ? (isMobile ? 'phone_error error_border more_border field-height' : 'dt-field-height') : (isMobile ? 'field-height' : 'dt-field-height')">
                            <span v-if="error_phone1" class="text-danger float-left font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                        </div>
                        <div class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number('f_ph_2')">
                            <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                        </div>
                    </div>

                    <template v-else v-for="(p_n, index) in phone" :key="p_n">
                        <div v-if="index === 0" class="style_flex mb-3">
                            <div :class="phone.length === 1 ? 'col-10 p-0' : 'col-12 p-0'">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone1" id="_phone1_" class="form-control more_border"
                                       :class="error_phone1 ? (isMobile ? 'phone_error error_border more_border field-height' : 'dt-field-height') : (isMobile ? 'field-height' : 'dt-field-height')">
                                <span v-if="error_phone1" class="text-danger float-left font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                            </div>
                            <div v-if="phone.length === 1" class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number('f_ph_2')">
                                <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                        </div>
                        <div v-if="index === 1" class="style_flex mb-3">
                            <div :class="phone.length === 2 ? 'col-10 p-0 position_relative' : 'col-12 p-0 position_relative'">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone2" :placeholder="$t('message.phone_2')" id="_phone2_" class="form-control more_border pad_right_text_icon"
                                       ref="focus_setinput1" 
                                       :class="error_phone2 ? (isMobile ? 'phone_error error_border more_border field-height' : 'dt-field-height') : (isMobile ? 'field-height' : 'dt-field-height')">
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'pt-2 fn_22'"></i>
                                <span v-if="error_phone2" class="text-danger float-left font_13 mb-2"> {{ $t('validation.error_valid_phone_2') }} </span>
                            </div>
                            <div v-if="phone.length === 2" class="col-2 p-0 div_add cur_sur" @click="add_field_phone_number('f_ph_3')">
                                <span class="fas fa-plus-circle font_22 parent_color ml-3" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                        </div>
                        <div v-if="index === 2" class="style_flex mb-3">
                            <div class="col-12 p-0 position_relative">
                                <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="phone3" v-bind:placeholder="$t('message.phone_3')" id="_phone3_"
                                       ref="focus_setinput2" class="form-control more_border pad_right_text_icon"
                                       :class="error_phone3 ? (isMobile ? 'phone_error error_border more_border field-height' : 'dt-field-height') : (isMobile ? 'field-height' : 'dt-field-height')">
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'pt-2 fn_22'"></i>
                                <span v-if="error_phone3" class="text-danger float-left font_13 mb-2"> {{ $t('validation.error_valid_phone_3') }} </span>
                            </div>
                        </div>
                    </template>

                    <!-- locations -->
                    <div class="mb-3 position_relative">
                        <label class="label_style mb-1 text-left full_width"> {{ $t('new_text.location') }} </label>
                        <div @click="choose_location" name="location" class="e_selection text-left cur_sur" :id="isMobile ? 'field-height' : 'dt-field-height'" :class="province_name ? 'p_sel_1' : 'p_sel_2'">
                            <p v-if="province_name" class="truncate font_15 pad_dis_1 display_middle_text_location" :class="isMobile ? 'm-2' : 'mt-1'">
                                {{ province_name ? province_name : '' }}
                                {{ district_name ? ' , '+district_name : '' }}
                                {{ commune_name ? ' , '+commune_name : '' }}
                            </p>
                            <p v-if="!province_name" class="text_grey" :class="isMobile ? 'm-2' : 'mt-1'">{{ $t('new_text.choose_location') }}</p>
                        </div>
                        <i class="ion-android-arrow-dropdown s_icon_in_select_option" style="margin-top: -54px!important;"></i>
                    </div>
                    <div v-if="error_location" class="e_form_error_style"><span class="text-danger float-left font_13 mb-2"> {{ error_location }} </span></div>
                    <div class="e_form_error_style"><span id="msg_location" class="text-danger float-left font_13 mb-2"></span></div>

                    <!-- Address -->
                    <div class="mb-3">
                        <label class="label_style mb-1 full_width text-left"> {{ $t('message.address') }} </label>
                        <textarea class="form-control more_border" v-model="address" id="focus_address" rows="3" name="text"></textarea>
                        <div class="form_error_style d-none m-0" id="address"> <span id="msg_address"></span> </div>
                        <div v-if="error_address" class="form_error_style m-0"> <span> {{ error_address }} </span> </div>
                    </div>

                    <!-- map -->
                    <a v-if="show_map" class="mb-3 a_show_google_map" @click="show_location" href="javascript:void(0)" rel="nofollow">
                        <div>
                            <ClientOnly>
                                <div id="show_new_map_branches_static" class="map_disable_show"></div>

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
                        <p class="a_show_map_title">{{ $t('message.change_location') }}</p>
                    </a>

                    <div v-else class="a_con_empty_map" @click="show_location">
                        <a class="a_edit_show_empty_map" href="javascript:void(0)" rel="nofollow">
                            <div class="map_box btn_showMap">
                                <div class="text">
                                    <span class="fa fa-map-marked-alt"></span>
                                    {{ $t('new_text_3.set_google_map') }}
                                </div>
                            </div>
                        </a>
                    </div>

                    <!-- button submit -->
                    <button type="button" @click="create_or_edit_branches" class="btn btn-k24-secondary mt-2" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                        {{ arr_params ? (check_box ? $t('new_text_1.end_and_change') : $t('new_text_1.end')) : $t('message.submit') }}
                    </button>
                    <!-- <template v-if="!isDesktop"><br><br><br></template> -->
                </div>
            </div>
        </div>

        <!-- show success message -->
        <div class="toast style_toast d-none toast_form_branches toast_z_index"> <!-- role="alert" data-autohide="false" aria-live="polite" aria-atomic="true" data-delay="6000" -->
            <div class="toast-header header_padding_toast">
                <strong class="mr-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ml-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
                </strong>
                <!--<small>11 mins ago</small>-->
                <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <!-- /show success message -->

        <!-- modal Post Filter -->
        <div class="modal " :class="isMobile ? 'style_full_screen' : ''"
             id="modal_location" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                <div class="modal-content" :class="isMobile ? 'modal_content_style' : 'rounded'">
                    <!-- app -->
                    <div class="_div_nav bg_app_bar_header_">
                        <div class="_pad_col_icon" id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close">
                            <button class="btn clear-btn-app-bar">
                                <i class="icon-clear font_click_back"></i>
                            </button>
                        </div>
                        <div class="col pad_title">
                            <h2 class="name_style truncate_wrap mt-3 text-center"> {{ $t('new_text.location') }} </h2>
                        </div>
                        <div class="_pad_col_icon">
                            <button @click="clear_filter" class="btn text-white pad_clear">{{ $t('message.clear') }}</button>
                        </div>
                    </div>
                    <!-- body -->
                    <div class="modal-body">
                        <div class="form-group div_pad_color max_width_form">
                            <!-- locations -->
                            <div v-if="locations" class="mb-3 position_relative">
                                <label class="label_style label_left mb-1"> {{ $t('message.choose_location') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="location" @click="re_check_data_locations" @change="show_data_districts($event)" v-model="location">
                                    <option value="">  </option>
                                    <option v-for="loc in locations" :key="loc" v-bind:value="loc.id" v-bind:data-name="locale === 'km' ? loc.km_name : loc.en_name">
                                        {{ locale === 'km' ? loc.km_name : loc.en_name }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="!location && show_err_msg" class="e_form_error_style"><span class="text-danger float-left font_13 mb-2">Location is Required.</span></div>
                            <!-- districts -->
                            <div class="mb-3 position_relative">
                                <label class="label_style mb-1 text-left full_width"> {{ $t('message.choose_khan_district') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="district" :disabled="!location" @click="re_check_data_locations" @change="show_data_communes($event)" v-model="district">
                                    <option value="">  </option>
                                    <option v-for="dis in districts" :key="dis" v-bind:value="dis.id" v-bind:data-name="locale === 'km' ? dis.km_name : dis.en_name">
                                        {{ locale === 'km' ? dis.km_name : dis.en_name }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="!district && show_err_msg" class="e_form_error_style"><span class="text-danger float-left font_13 mb-2">District is Required.</span></div>
                            <!-- commutes -->
                            <div class="mb-3 position_relative">
                                <label class="label_style mb-1 text-left full_width"> {{ $t('message.choose_sangkat_commune') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="commune" :disabled="!district" @click="re_check_data_locations" v-model="commune">
                                    <option value="">  </option>
                                    <option v-for="com in communes" :key="com" v-bind:value="com.id" v-bind:data-name="locale === 'km' ? com.km_name : com.en_name">
                                        {{ locale === 'km' ? com.km_name : com.en_name }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="!commune && show_err_msg" class="e_form_error_style"><span class="text-danger float-left font_13 mb-2">Commune is Required.</span></div>
                        </div>
                    </div>
                    <div v-if="!isMobile" class="p-3">
                        <button @click="click_apply_location" type="button" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                            <p class="m_text_btn"> {{ $t('new_text.apply') }} </p>
                        </button>
                    </div>
                    <div v-else>
                        <br><br>
                        <div class="nav p_div_apply_filter px-3">
                            <button @click="click_apply_location" type="button" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                <p class="m_text_btn"> {{ $t('new_text.apply') }} </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal Post Filter -->

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

        <!-- Modal show google map -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_google_map" tabindex="-1" role="dialog">
            <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
                <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div class=" overflow_class" :class="isMobile ? ' s_content' : ''">
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
                                <div id="show_new_map_branches" class="map_new_W_H"></div>
                            </ClientOnly>
                        </div>
                        <!-- button sent map -->
                        <div class="p-2 text-center _flex_ border-top">
                            <div @click="cancel_map" class="col-4 p-0">
                                <p class="font_16 modal-title p-2 bg_grey mr-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                            </div>
                            <div @click="sent_map" class="col-8 p-0">
                                <p class="font_16 modal-title p-2 de-btn-message-sent rounded cur_sur"> {{ $t('new_text.save') }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show google map -->
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
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const auth = ref('');

    const store_id = ref(route.params.id ? route.params.id : '');
    const branch_id = ref(route.params.branch_id ? route.params.branch_id : '');
    const i = ref(0);
    const loading = ref(false);
    const access_token = ref('');
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const arr_validation = ref([]);
    const show_map = ref(false);

    // -- old locations --
    const old_locations = ref({ loc: '', dis: '', com: '', arr_loc: [], arr_dis: [], arr_com: [] });

    const locations = ref([]); // field locations for modal search query
    const districts = ref([]); // field districts for modal search query
    const communes = ref([]);  // field communes for modal search query

    const phone = ref([]); // array store phone

    // --- new google map ---
    const new_map = ref('');
    const new_static_map = ref('');

    // bind value to v-model of field
    const title = ref('');
    const email = ref('');
    const phone1 = ref('');
    const phone2 = ref('');
    const phone3 = ref('');
    const location = ref('');
    const district = ref('');
    const commune = ref('');
    const address = ref('');

    // -- show and get from google map --
    const lat = ref(''); const lng = ref(''); const zoom = ref(''); // store data when map move or scroll zoom
    const def_lat = ref(0); const data_lat = ref('');
    const def_lng = ref(0); const data_lng = ref('');
    const def_zoom = ref(0); const data_zoom = ref('');
    const is_click_btn_zoom = ref(false); // zoom_in or zoom_out, click button or without click button.

    // -- show full name of location --
    const province_name = ref('');
    const district_name = ref('');
    const commune_name = ref('');
    const show_err_msg = ref(false);

    const error_title = ref(null);
    const error_phone1 = ref(false);
    const error_phone2 = ref(false);
    const error_phone3 = ref(false);
    const error_address = ref(null);
    const error_location = ref(null);

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_3 = ref(0);

    // --- store params from detail chat ---
    const arr_params = ref(''); // store all params in this array.
    const check_box = ref(false); // false = uncheck, true = check.

    // --- meta variable ---
    const meta_title_branches = useState('meta_title_branches', () => 'Add Branches - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_branches.value,
        meta: [
            /*{ name: 'apple-mobile-web-app-title', content: meta_title_branches.value },*/
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: 'khmer24.com, Buy and Sell Everything In Cambodia' },
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
            if (helper.check_auth_user() === false) { // check auth exist or not
                router.replace(localePath({ name: 'auth' }));
            }
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            check_new_auth_user();

            // --- store params to array ---
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            arr_params.value = pa_con && pa_con.from && pa_con.from.d_params && pa_con.from.d_params.from ? pa_con.from.d_params.from : '';
            helper.clear_params_make_con('from');

            

            // -- tracking on google analytic --
            track_google_analytics();

            // -- get detail info branch --
            if (branch_id.value && auth.value) { get_detail_profile(); }

            // ---- remove class modal-open ----
            helper.remove_class_modal_open();
        }
    })


    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;                 // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let action = branch_id.value ? 'Edit_branches' : 'Add_branches';
            let data = {
                page_title: meta_title_branches.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event(action, data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // ---- check new auth user ----
    function check_new_auth_user() { auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ============ phone number condition END ============
    // ---- add more field phone numbers ----
    function add_field_phone_number(con) {
        if (con === 'f_ph_2') {
            // console.log('focus ah 2')
            error_phone2.value = false;
            setTimeout(function() { document.getElementById('_phone2_').focus(); },500);
        } else if (con === 'f_ph_3') {
            // console.log('focus ah 3')
            error_phone3.value = false;
            setTimeout(function() { document.getElementById('_phone3_').focus(); },500);
        }

        phone.value.push('');
        if (phone.value.length === 1) {
            phone.value.push('');
        } else if (phone.value.length === 2) {
            // error_phone2.value = false;
            // this.$nextTick(() => this.$refs.setinput1[0].focus())
        } else if (phone.value.length === 2) {
            // error_phone3.value = false;
            // this.$nextTick(() => this.$refs.setinput2[0].focus())
        }
    }
    // ---- minus field phone number ----
    function minus_field_phone(index) {
        // - remove phone from array condition dynamic field add or remove -
        phone.value.splice(index, 1);
        // - remove phone form v-model -
        if (index === 1) {
            phone2.value = phone3.value ? phone3.value : ''; // if phone2 remove but phone3 have value, must to store in phone2
            error_phone2.value = phone2.value ? check_phone(phone2.value) : false;
            phone3.value = ''; // remove phone 3
        } else if (index === 2) {
            phone3.value = '';
            error_phone3.value = false;
        }
    }
    // ---- validation phone numbers ----
    function keymonitor() {
        // setTimeout( () => {
        if (phone1.value) { error_phone1.value = check_phone(phone1.value); } else { error_phone1.value = false; }
        if (phone2.value) { error_phone2.value = check_phone(phone2.value); } else { error_phone2.value = false; }
        if (phone3.value) { error_phone3.value = check_phone(phone3.value); } else { error_phone3.value = false; }
        // }, 300);
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

    // ---- get detail branch ----
    function get_detail_profile() {
        loading.value = true;
        if(auth.value && auth.value.tokens){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/branches/'+branch_id.value, {
                headers: { "Access-Token": auth.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),

            }).then((res) => {
                let dp = res.data;

                // check all prevent error when have auth but phone not exist
                phone.value = dp.phone ? dp.phone : [];

                // -- add value to model --
                title.value = dp.title ? dp.title : '';
                email.value = dp.email ? dp.email : '';
                phone1.value = phone.value.length > 0 ? phone.value[0] : '';
                phone2.value = phone.value.length > 1 ? phone.value[1] : '';
                phone3.value = phone.value.length > 2 ? phone.value[2] : '';
                location.value = dp.location ? dp.location.id : '';
                district.value = dp.district ? dp.district.id : '';
                commune.value = dp.commune ? dp.commune.id : '';
                address.value = dp.address ? dp.address : '';

                // -- store old locations, prevent change loc in modal without click "Apply" --
                old_locations.value = {
                    loc: location.value,
                    dis: district.value,
                    com: commune.value,
                    arr_loc: [],
                    arr_dis: [],
                    arr_com: []
                };

                // -- show full location name if exist --
                province_name.value = dp.location ? (language.value === '' || language.value === 'km' ? dp.location.km_name : dp.location.en_name) : '';
                district_name.value = dp.district ? (language.value === '' || language.value === 'km' ? dp.district.km_name : dp.district.en_name) : '';
                commune_name.value = dp.commune ? (language.value === '' || language.value === 'km' ? dp.commune.km_name : dp.commune.en_name) : '';

                when_edit(location.value, district.value); // collect data district and commune when edit

                // -- show location in google map -- (data empty must to set current location of user)
                show_map.value = dp.map ? true : false;
                def_lat.value = dp.map ? parseFloat(dp.map.x) : def_lat.value;
                def_lng.value = dp.map ? parseFloat(dp.map.y) : def_lng.value;
                def_zoom.value = 15;
                data_lat.value = def_lat.value;
                data_lng.value = def_lng.value;
                data_zoom.value = def_zoom.value;
                setTimeout(() => { show_new_static_google_map(); },300);

            }).catch((err) => {
                // console.log(err.response);
                if (err.response.status === 401) { // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        setTimeout(() => { get_detail_profile(); }, 3000);
                    }
                }
            }).finally(() => (loading.value = false));
        }
    }

    // ---- click btn submit ----
    function create_or_edit_branches() {
        check_new_auth_user();
        if (window.navigator.onLine) {
            if (title.value && phone1.value && address.value && location.value && (error_phone1.value === false && error_phone2.value === false && error_phone3.value === false)) {
                let query_str = {
                    title: title.value,
                    'phone[0]': phone1.value ? phone1.value : '',
                    'phone[1]': phone2.value ? phone2.value : '',
                    'phone[2]': phone3.value ? phone3.value : '',
                    location: location.value,
                    district: district.value,
                    commune: commune.value,
                    address: address.value,
                    email: email.value,
                };

                // -- check location lat lng zoom --
                if (data_lat.value && data_lng.value && data_zoom.value) {
                    query_str['map[x]'] = data_lat.value;
                    query_str['map[y]'] = data_lng.value;
                    // query_str['map[z]'] = data_zoom.value;
                }

                // console.log(query_str);
                // return

                // -- check create new or edit branch --
                let url = '';
                if (branch_id.value) {
                    url = 'me/stores/'+store_id.value+'/branches/'+branch_id.value;
                } else {
                    url = 'me/stores/'+store_id.value+'/branches';
                }

                loading.value = true;
                // --- edit profile picture ---
                if(auth.value){
                    $fetch(config.VUE_APP_API_URL + url, {
                        headers: {"Access-Token": auth.value.tokens.access_token},
                        params: {lang: language.value},
                        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                        method: 'POST',
                        body: new URLSearchParams(query_str)
                    }).then(res => {
                        router.replace(localePath({ name: 'account-store-id-setting-branches', params: { id: store_id.value } }));
                        save_track_optional('status', { status: res.message });

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
                                        setTimeout(() => { create_or_edit_branches(); }, 3000);
                                    } else {
                                        localStorage.removeItem('auth_user');
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
                                    $.each(data_parse._data.errors, (key, value) => {
                                        $('#' + key).removeClass('d-none');
                                        $('#msg_' + key).text(value.message);
                                        store_arr.push(key); // to store old key for clear validation

                                        if (document.getElementById(key)) { // check if id element exist in dom, prevent error not show message to user
                                            $("html, body").animate({scrollTop: $("#" + key).offset().top - 100}, 500); // -100 = scroll more to top 100px, +100 = scroll more to bottom 100px
                                        }
                                    });
                                    toast_message(data_parse._data.message, false);

                                } else {
                                    toast_message(data_parse._data.message, false);
                                }
                            }
                        }

                    }).finally(() => (loading.value = false));
                }


                // clear error validation
                error_title.value = null;
                error_address.value = null;
                error_location.value = null;
                error_phone1.value = false;
                error_phone2.value = false;
                error_phone3.value = false;
                return true;
            }

            window.scrollTo(0, 0); // scroll to top of the screen is validation error

            if (!address.value) {
                error_address.value = "Address is Required."; document.getElementById('focus_address').focus();
            } else {
                error_address.value = null;
            }
            if (!phone1.value) {
                error_phone1.value = "Phone is Required."; document.getElementById('_phone1_').focus();
            } else if (error_phone1.value) {
                error_phone1.value = true; // document.getElementById('_phone2_').focus();
            } else {
                error_phone1.value = false;
            }
            if (!title.value) {
                error_title.value = "Title is Required."; document.getElementById('focus_title').focus();
            } else {
                error_title.value = null;
            }
            if (!location.value) { error_location.value = "Location is Required."; } else { error_location.value = null; }

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }

    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_form_branches');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }

    // ---- open modal choose locations ----
    function choose_location() {
        // add old data loc when open modal
        location.value = old_locations.value && old_locations.value.loc ? old_locations.value.loc : '';
        district.value = old_locations.value && old_locations.value.dis ? old_locations.value.dis : '';
        commune.value = old_locations.value && old_locations.value.com ? old_locations.value.com : '';

        // add old array loc, dis and com again
        locations.value = old_locations.value.arr_loc;
        districts.value = old_locations.value.arr_dis;
        communes.value = old_locations.value.arr_com;

        // re_check_data_locations();     // data location is exist or not
        $('#modal_location').modal('show'); // open modal choose category
    }
    // ---- clear location when click clear ----
    function clear_filter() {
        location.value = '';
        district.value = '';
        commune.value = '';
        // address.value = '';

        districts.value = [];
        communes.value = [];

        province_name.value = '';
        district_name.value = '';
        commune_name.value = '';

        // clear old data too
        old_locations.value = { loc: '', dis: '', com: '', arr_loc: locations.value, arr_dis: [], arr_com: [] };

        $('#close_modal_query_str').click();
    }
    // ---- click apply locations ----
    function click_apply_location() {
        show_err_msg.value = true;
        if (location.value && district.value && commune.value) {
            province_name.value = $("#location option:selected").data('name');
            district_name.value = $("#district option:selected").data('name');
            commune_name.value = $("#commune option:selected").data('name');
            $('#close_modal_query_str').click();

            // get data from modal loc add to "old_locations"
            old_locations.value = {
                loc: location.value, dis: district.value, com: commune.value,
                arr_loc: locations.value, arr_dis: districts.value, arr_com: communes.value
            };
        }
    }
    // ---- if have selected location show districts ----
    function show_data_districts(event) {

        districts.value = [];   // --- clean array data ---
        communes.value = [];    // --- clean array data ---
        district.value = '';    // --- clean value set in select at v-model (prevent get old value when edit) ---
        commune.value = '';     // --- clean value set in select at v-model (prevent get old value when edit) ---

        let slug_location = '';
        if (event.target.value) {

            // -- loop to get name locations --
            $.each(locations.value, function(key, val) {
                if (event.target.value === val.id) {
                    slug_location = val.slug;
                }
            });
            // -- /loop to get name locations --

            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'locations', {
                params: {
                    lang: language.value,
                    type: 'district',
                    parent: slug_location,
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                districts.value = res.data;
            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            }).finally(() => (loading.value = false));

            // $("#district").prop("disabled", false); // enable prop select html
            // $("#commune").prop("disabled", true);   // disable prop select html
        } /*else {
            $("#district").prop("disabled", true);  // disable prop select html
            $("#commune").prop("disabled", true);   // disable prop select html
        }*/
    }
    // ---- if have selected districts show communes ----
    function show_data_communes(event) {
        communes.value = []; // --- clean array data ---
        commune.value = '';  // --- clean value set in select at v-model (prevent get old value when edit) ---

        let slug_districts = '';
        if (event.target.value) {

            // -- loop to get name locations --
            $.each(districts.value, function(key, val) {
                if (event.target.value === val.id) {
                    slug_districts = val.slug;
                }
            });
            // -- /loop to get name locations --

            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'locations', {
                params: {
                    lang: language.value,
                    type: 'commune',
                    parent: slug_districts,
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                communes.value = res.data;
            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            }).finally(() => (loading.value = false));

            // $("#commune").prop("disabled", false); // enable prop select html
        } /*else {
            $("#commune").prop("disabled", true);  // disable prop select html
        }*/
    }


    // ---- click check or uncheck ----
    function click_check_box() { /*console.log(this.check_box);*/ }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- show modal logout ----
    function show_Modal() { $('#modal_add_password').modal('show'); }
    // ---- click recheck data location is exist or not ----
    function re_check_data_locations() {
        if (locations.value.length === 0) {
            when_edit(location.value, district.value);
        }
    }

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

            // add province data to old data for the first
            if (old_locations.value.arr_loc.length === 0) { old_locations.value.arr_loc = locations.value; }

        }).catch(error => {
            if (!error.response) {
                loading.value = false; // close loading
                $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
            }
        }).finally(() => (loading.value = false));
        // ==== /get all locations for user choose ====

        // ==== get all districts if user have location ====
        if (locations.value.length && id_location) {
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

                // add district data to old data for the first
                if (old_locations.value.arr_dis.length === 0) { old_locations.value.arr_dis = districts.value; }

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            }).finally(() => (loading.value = false));
        }
        // ==== /get all districts if user have location ====

        // ==== get all commune if user have district ====
        if (id_location && districts.value.length && id_district) {
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

                // add communes data to old data for the first
                if (old_locations.value.arr_com.length === 0) { old_locations.value.arr_com = communes.value; }

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
                }
            }).finally(() => (loading.value = false));
        }
    }


    // ======= show static map =======
    function show_new_static_google_map() {
        // create map
        new_static_map.value = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: 'show_new_map_branches_static',
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
            target: 'show_new_map_branches',
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
    /*function change_zoom_map(t_event) {
        if (is_click_btn_zoom.value) { // if click button zoom.
            // console.log('not allow zoom change => '+t_event);

        } else { // if zoom_in or zoom_out without click button.
            zoom.value = parseInt(t_event);       // api accept only inter, if float can not save map in to api.
            // console.log('zoom change => '+t_event);
        }
        is_click_btn_zoom.value = false;    // allow zoom change.
    }
    function zoom_in() {
        is_click_btn_zoom.value = true; // not allow zoom change.
        def_zoom.value += 1;
        def_lat.value = lat.value ? lat.value : def_lat.value;
        def_lng.value = lng.value ? lng.value : def_lng.value;
        zoom.value = def_zoom.value;
        // console.log(zoom.value)
    }
    function zoom_out() {
        is_click_btn_zoom.value = true; // not allow zoom change.
        def_zoom.value -= 1;
        def_lat.value = lat.value ? lat.value : def_lat.value;
        def_lng.value = lng.value ? lng.value : def_lng.value;
        zoom.value = def_zoom.value;
        // console.log(zoom.value)
    }
    function change_center_map(evt) {
        lng.value = evt[0];
        lat.value = evt[1];
        // console.log('lng = '+evt[0]+'  lat = '+evt[1]);

        // lat.value = evt.lat();
        // lng.value = evt.lng();
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
        $('#show_new_map_branches_static .ol-viewport').remove(); // it removes child from the parent.
        setTimeout(() => { show_new_static_google_map(); },300);
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
                    $('#show_new_map_branches .ol-viewport').remove(); // it removes child from the parent.
                    show_new_google_map();
                // }, 100);

            },
            (error) => {
                // set default lat lng if error location or user dont have location, prevent data not change position when user click button.
                def_lat.value = the_lat ? the_lat : 12.408612835420433;
                def_lng.value = the_lng ? the_lng : 104.95790572031129;
                def_zoom.value = the_zoom ? the_zoom : 7; // static lat lng middle in cambodia.

                // clear old map and show new map.
                $('#show_new_map_branches .ol-viewport').remove(); // it removes child from the parent.
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
        $('#show_new_map_branches .ol-viewport').remove(); // it removes child from the parent.
        show_new_google_map();
    }


    // ---- store all type params ----
    function save_track_optional(type, data_params) { helper.params_make_condition(type, data_params); }
</script>
