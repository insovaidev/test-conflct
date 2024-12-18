<template>
    <div :class="!mobileDevice ? 'screen-content-desktop' : ''">
        <header v-if="mobileDevice" class="col no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="router.back()" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-0 l_h_con_title">
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left">
                        {{$t(`account_t.edit_address`)}}
                    </p>
                </div>
            </div>
        </header>
        <main class="max_width_form main_min_height" :class="!mobileDevice ? 'mt_80': ''">
            <div v-if="isLoading==true" class="custom_spinner">
                <span class="loader"></span>
            </div>
            <div>
                <div v-if="errorData.status !== null" :class="!mobileDevice ? 'mt_80': 'mt-5'">
                    <div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                        <div class="service_unavailable_icon mb-5">
                            <i class="bi bi-cloud-fill"></i>
                            <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                        </div>
                        <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                        <p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                        <button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
                        <button v-else type="button" @click="retry"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                    </div>
                    <div v-else-if="errorData.status === 500">
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
                    </div>
                    <div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2': 'px-3 membership_banner_store_not_found_mobile'" >
                        <div class="membership_banner_store_not_found_icon mb-4">
                            <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                        </div>  
                        <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                        <span class="error_message mb-5">{{ errorData.message }}</span>
                        <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="retry">{{$t(`account_t.retry`)}}</button>
                    </div>
                </div>
                <div v-else :class="!mobileDevice ? 'mt-2' : 'mt-4 pt-1'">
                    <form class="bg-white max_width_form mt_80" :class="!mobileDevice ? 'border border-1 rounded' : 'mt-5 pt-2'">
                        <div class="px-4 mb-3">
                            <div v-show="!mobileDevice && mobileDevice != null" class="mb-3 pt-3">
                                <h1 class="fw-semibold fs-5">{{ $t('account_t.edit_address') }}</h1>
                                <hr/>
                            </div>
                            <div class="mb-3">
                                <label for="name" class="label_style mb-1 full_width text-left">{{ $t('resume_cv.name') }}<span class="text-danger">*</span></label>
                                <input type="text" v-model="formData.name" id="name" name="name" class="form-control more_border " :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                            </div>
                            <div>
                                <label for="company" class="label_style mb-1 full_width text-left">{{ $t('resume_cv.company') }}</label>
                                <input type="text" v-model="formData.company" class="form-control more_border " id="company" :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                            </div>
                        </div>
                        <div class="px-4 mb-3">
                            <div class="mb-3">
                                <label for="email" class="label_style mb-1 full_width text-left">{{ $t('resume_cv.email') }}</label>
                                <input type="email" v-model="formData.email" id="email" class="form-control more_border " :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                            </div>
                            <div>
                                <label for="phone" class="label_style mb-1 full_width text-left">{{ $t('resume_cv.phone') }}<span class="text-danger">*</span></label>
                                <template v-for="(p_n, index) in phone" :key="p_n">
                                    <div v-if="index === 0" class="style_flex ">
                                    <div :class="phone.length === 1" class="w-100">
                                        <input v-model="formData.phone[0]"  type="text" inputmode="numeric" :placeholder="$t('message.phone_1')" maxlength="10" class="form-control  more_border phone[0]" id="phone" name="phone"  :class="mobileDevice ? 'field-height' : 'dt-field-height'"/>
                                    </div>
                                    <div v-if="phone.length === 1" @click="add_field_phone_number" class="div_add cur_sur d-flex align-items-start pt-2" >
                                        <span class="fas fa-plus-circle font_22 text-primary ml_20"></span>
                                    </div>
                                    </div>
                                    <div v-if="index === 1" class="style_flex mt-3">
                                    <div :class="phone.length === 2" class="w-100 position-relative">
                                        <input v-model="formData.phone[1]" type="text" inputmode="numeric" :placeholder="$t('message.phone_2')" maxlength="10" id="phone2" name="phone_1" ref="inputapply1" class="form-control more_border phone[1]" :class="mobileDevice ? 'field-height' : 'dt-field-height'"/>
                                        <i @click="minus_field_phone(index)" class="fas fa-minus-circle d-flex align-items-center text-danger pr-2 top-0 bottom-0 end-0 fs-6 cur_sur position-absolute" ></i>
                                    </div>
                                    <div v-if="phone.length === 2" @click="add_field_phone_number" class="div_add cur_sur d-flex align-items-start pt-2" >
                                        <span class="fas fa-plus-circle font_22 text-primary ml_20" ></span>
                                    </div>
                                    </div>
                                    <div v-if="index === 2" class="style_flex mt-3">
                                    <div class="col-12 p-0 position_relative">
                                        <input v-model="formData.phone[2]" type="text" inputmode="numeric" v-bind:placeholder="$t('message.phone_3')" maxlength="10" id="phone3" name="phone_2" class="form-control more_border phone[2]" ref="inputapply2" :class="mobileDevice ? 'field-height' : 'dt-field-height'"/>
                                        <i @click="minus_field_phone(index)" class="fas fa-minus-circle d-flex align-items-center text-danger pr-2 top-0 bottom-0 end-0 fs-6 cur_sur position-absolute" ></i>
                                    </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="px-4 mb-3">
                            <div class="mb-3 position_relative">
                                <label class="label_style mb-1 label text-left full_width"> {{ $t('new_text.location') }}<span class="text-danger">*</span> </label>
                                <div @click="choose_location('show')" id="location" name="location"  class="mb-0 border border-1 rounded-3 d-flex align-items-center px-3 py-1 cur_sur" :class="[mobileDevice ? 'field-height' : 'dt-field-height', province_name ? 'p_sel_1' : 'p_sel_2']">
                                    <p v-if="province_name" class="truncate font_15 mb-0">
                                        {{ province_name ? province_name : '' }}
                                        {{ district_name ? ' , '+district_name : '' }}
                                        {{ commune_name ? ' , '+commune_name : '' }}
                                    </p>
                                    <p v-if="!province_name" class="text_grey mb-0">{{ $t('new_text.choose_location') }}</p>
                                    <i class="ion-android-arrow-dropdown position-absolute top-0 end-0 bottom-0 pr-2 d-flex align-items-center" id="t_i"></i>
                                </div>
                                <div v-if="error_loc" class="e_form_error">
                                    <span class="text-danger float-start font_13 mb-2"> {{ $t('message.error_location') }} </span>
                                </div>
                                <div class="error location mt-1 err_field_address" id="dip" hidden>
                                    {{ locale === 'km' ? 'សូមបញ្ចូល "ទីតាំង"។' : 'Please enter the "Location".' }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="address" class="label_style mb-1 full_width text-left">{{ $t('resume_cv.address') }}<span class="text-danger">*</span></label>
                                <input type="text" v-model="formData.address" class="form-control more_border "  id="address" name="address" :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                            </div>
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
                        </div>
                        <div class="px-4 mb-3">
                            <div >
                                <label for="tax_id" class="label_style mb-1 full_width text-left">{{ $t(`account_t.tax_id`) }}</label>
                                <input v-model="formData.tax_id" type="text" id="tax_id" class="form-control more_border " :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                                <span v-if="tax_er" class="err_field_address">{{ tax_er }}</span>
                            </div>
                        </div>
                        <div class="px-4">
                            <div class="category">
                                <label class="label_style mb-1 full_width text-left">{{ $t('account_t.save_as') }}</label>
                                <div class="radio-new-or-second-hand text-center row ">
                                    <div class="col p_pad_radio_option" @click="other('home')">
                                        <input type="radio" v-model="formData.category" id="home"  class="form-control  more_border" name="category" value="home">
                                        <label for="home"  class="d-flex align-items-center justify-center border border-1 rounded-2" id="home_l" :class="mobileDevice ? 'field-height' : 'dt-field-height'"><p class="m-0 w-100">{{ locale==='km' ? 'ផ្ទះ' : 'Home' }}</p></label>
                                    </div>
                                    <div class="col p_pad_radio_option" @click="other('work')">
                                        <input type="radio" v-model="formData.category" id="work"  name="category" value="work">
                                        <label for="work" class="d-flex align-items-center justify-center  border border-1 rounded-2 label_work" id="work_l" :class="mobileDevice ? 'field-height' : 'dt-field-height'"><p class="m-0 w-100">{{ locale==='km' ? 'កន្លែងធ្វើការ' : 'Work' }}</p></label>
                                    </div>
                                    <div class="col p_pad_radio_option" @click="other('other')">
                                        <input type="radio" v-model="formData.category" id="other"  name="category" value="other">
                                        <label for="other" class="d-flex align-items-center justify-center border border-1 rounded-2" id="other_l" :class="mobileDevice ? 'field-height' : 'dt-field-height'"><p class="m-0 w-100">{{ locale==='km' ? 'ផ្សេងទៀត' : 'Other' }}</p></label>
                                    </div>
                                </div>
                            </div>
                            <div id="other_id" hidden class="mt-4">
                                <input type="text" v-model="formData.label"  class="form-control more_border " name="label" :placeholder=" locale==='km' ? 'រក្សាទុកជា' : 'Save as' " :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                            </div>
                            <div class="mb-3 mt-4">
                                <div class="d-flex align-items-center justify-content-between border border-1 rounded-3 px-3 py-1" @click="toggleCheckbox" :class="mobileDevice ? 'field-height' : 'dt-field-height'">
                                    <div class="p-1 flex-grow-1">{{ locale==='km' ? 'កំណត់ជាជំរើសទីមួយ' : 'Set as default' }}</div>
                                    <div class="">
                                        <label for="change_auto_up_profile" class="s_t_switch" >
                                            <input type="checkbox" v-model="is_default" @click="toggleCheckbox" id="change_auto_up_profile" >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3">
                            <div v-if="isDesktop">
                                <button @click="er_" class="btn form-control-xm btn-xm btn-k24-secondary w-100"> {{ locale==='km' ? 'បញ្ជូន' : 'Submit' }} </button>
                            </div>
                            <div v-if="!isDesktop">
                                <button @click="er_" class="btn form-control-lg btn-xm btn-k24-secondary w-100"> {{ locale==='km' ? 'បញ្ជូន' : 'Submit' }} </button>
                            </div>                    
                        </div>
                    </form>
                </div>  
            </div>
        </main>
    </div>

    <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_location" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog " :class="isMobile? 'modal-fullscreen' : 'modal-dialog-scrollable m-auto m_w' " role="document">
            <div class="modal-content " :class="isMobile ? 'add_edit_modal_content_mobile' : 'rounded'">
                <!-- modal header -->
                <div class="location_modal_header bg_app_bar_header_ ">
                    <!-- back locations -->
                    <div v-if="type_loc" class="close_location_modal pt-1 pb-1">
                        <button @click="click_black_loc" class="btn back-btn-app-bar">
                            <i class="ion-ios-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <!-- close modal -->
                    <div v-else id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="close_location_modal pt-1 pb-1">
                        <button data-bs-dismiss="modal" aria-label="Close" class="btn clear-btn-app-bar">
                            <i class="icon-clear font_click_back"></i>
                        </button>
                    </div>
                    <div class="col p_pad_title">
                        <div class="text-center">
                            <h1 class="name_style truncate mb-0 pt-1 pb-1">
                                <template v-if="type_loc === 'district'">{{ $t('new_text_3.khan_or_district') }}</template>
                                <template v-else-if="type_loc === 'commune'">{{ $t('new_text_3.sangkat_or_commune') }}</template>
                                <template v-else>{{ $t('new_text_3.city_or_province') }}</template>
                            </h1>
                        </div>
                    </div>
                </div>
                <!-- modal body -->
                <div class="modal-body p-0" >
                    <div>
                        <ul class="list-unstyled bg-white">
                            <li v-for="loc in mul_arr_location" :key="loc" class="full_field_tag cur_sur h-v-mouse list_location_ov_border" @click="show_next_location(loc)">
                                {{ locale === 'km' ? loc.km_name : loc.en_name }}
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

    <div class="modal fade" id="show_modal_google_map" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen" :class="isDesktop ? 'vh-md-100 d-md-flex edit_billing_address_modal_dialog_desktop' : 'edit_billing_address_modal_dialog_monile'">
            <div class="modal-content" :class="isDesktop ? 'map_modal_content_desktop_ov' : 'map_modal_content_mobile_ov'" >
                <div class="modal-body map_modal_content map_modal_content chats_map_style" >
                    <div v-if="data_lat && data_lng" class="p_icon_my_location_in_map map_icon_home">
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

    <div class="toast style_toast over_style_toast d-none">
        <div class="toast-header header_padding_toast border-0">
            <strong class="mr-auto style_flex">
                <i class="fas fa-exclamation-circle text-danger font_22"></i>
                <div v-if="message_er" class="m-0 ml-2 font_15 text-danger over_toast_text_message">
                    {{ message_er }}
                </div>
            </strong>
            <button type="button" class="ml-2 mt-1 mb-0 close a_close over_tost_btn_close" data-bs-dismiss="toast" aria-label="Close">
                <i class="bi bi-x text-danger"></i>
            </button>
        </div>
    </div>
</template>
<script setup>
definePageMeta({ layout: "custom", middleware: "auth" });
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


import helper from "/helper";
import  en  from '/locales/en.json'
import  km  from '/locales/km.json'

// import { map } from '~~/public/version_19/fontawesome/js/v4-shims';
const { locale } = useI18n();
const runtime_config = useRuntimeConfig(); 
const config = runtime_config.public;
const { isDesktop }  = useDevice();
const router = useRouter();
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'; 
const errorShow = ref('')
const data_edit = useCookie('data_edit')
// const data_edit = useState('data_edit',()=>'')
// -- show and get from google map --
const show_map = ref(false);
const lat = ref(''); const lng = ref(''); const zoom = ref(''); // store data when map move or scroll zoom
const def_lat = ref(0); const data_lat = ref('');
const def_lng = ref(0); const data_lng = ref('');
const def_zoom = ref(0); const data_zoom = ref('');

 // --- new google map ---
const new_map = ref('');
const new_static_map = ref('');
const lat_lng_loc = ref('');

//   ========== location ================
const showPopup = ref(false)
const localePath = useLocalePath();
const language = ref(helper.get_lang_cookie());
const auth = ref('');
const loading = ref(false);
const locations = ref([]);     
const districts = ref([]);     
const communes = ref([]);       
const location = ref(null);
const district = ref(null);
const commune = ref(null);
const province_name = ref('');
const district_name = ref('');
const commune_name = ref('');
const mul_arr_location = ref([]);
const type_loc = ref('');
const tmp_pro_N = ref('');  const tmp_pro_ID = ref('');
const tmp_dis_N = ref('');  const tmp_dis_ID = ref('');
const tmp_comm_N = ref(''); const tmp_comm_ID = ref('');
const old_arr_loc = ref({ loc: '', dis: '', com: '' });
const error_loc = ref(null);   
const aPhone = ref([""])
const phone = ref([""]);
const locationID = ref('')
const is_default = ref(false)
const checkbox = ref('false')
const isMobile = ref(helper.m_or_d())
const defaultAdress = useState('defaultAdress', () => '')
const myAddress = useState('myAddress', () => '')
const mobileDevice = ref(helper.m_or_d())
const isLoading = ref('')
const errorData = reactive({status: null, message: null, code: null, type: null})
const featureBillingAddress = ref('')
const formData = reactive({
    name:'',
    company:'',
    email:'',
    phone: aPhone,
    location: locationID,
    address: '',
    tax_id:'',
    category: '',
    label: ''
})

useHead({
    title: 'Edit Billing Address - Khmer24.com', 
    meta: [
        // -- seo page --
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: 'Edit Billing Address - Khmer24.com' },
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

onMounted(()=>{
    show_validate()
    if (process.client) { 
        check_new_auth_user();
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); };
        when_edit(location.value, district.value); 
    }
    get_data()
})

onBeforeUnmount(() => {
    hideModals(['#show_modal_google_map', '#modal_location'])
})

const authCookeis = useCookie('auth_user')
function checkFeatureEnableServerside() {
    const paymentSettings = authCookeis.value?.user?.setting?.payment ?? [];
    if(paymentSettings.length && paymentSettings.includes('billing_address')) {
        errorData.status = null
        featureBillingAddress.value = true
    } else {
        errorData.status = 503
        featureBillingAddress.value = false
    }
}

checkFeatureEnableServerside()

function hideModals(modalSelectors) {
  // Hide modals using provided selectors
  modalSelectors.forEach(selector => {
      $(selector).modal('hide');
  });
}

function show_validate(){
    $(document).ready(function () {
        jQuery.validator.addMethod("phoneKM", function(phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length >= 9 && 
            phone_number.match(/0[1-9]{1}[0-9]{7,8}/);
        }, "Valid phone number");
        var $form = $("form");
        $form.validate({
            rules: {
                name: { required: true },
                location: { required: true },
                address: { required: true },
                category: { required: true },
                phone:{ required: true, phoneKM: true, },
                phone_1:{ required: false, phoneKM: true, },
                phone_2:{ required: false, phoneKM: true, },
                label:{  required: true}
            },
            messages: {
                name: {required: locale.value === 'km' ? km.message_er.name : en.message_er.name},
                category: { required: locale.value === 'km' ? 'សូមជ្រើសរើស "រក្សាទុកជា" ណាមួយ។' : 'Please select any "Save as".'},
                label: { required: locale.value === 'km' ? 'សូមបញ្ចូល "រក្សាទុកជា"។' : 'Please enter the "Save as".'},
                address: { required: locale.value === 'km' ? 'សូមបញ្ចូល "អាស័យដ្ឋាន"។' : 'Please enter the "Address".'},
                email: { email: locale.value === 'km' ? km.message_er.email : en.message_er.email, },
                phone: { required: locale.value === 'km' ? km.message_er.phone_1 : en.message_er.phone_1,
                         phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, 
                        },
                phone_1: { phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, },
                phone_2: { phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, },
            },
            errorPlacement: function(error,element){
                if(element.is(":radio")){
                    error.appendTo(element.parents(".category"));
                }else {
                    error.insertAfter(element);
                }
            },
            submitHandler: () => {
                saveData()
            }
        });
        
    });
}

function check_new_auth_user() { 
    auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
    const paymentSettings = auth.value?.user?.setting?.payment ?? [];
    if(paymentSettings.length && paymentSettings.includes('billing_address')) {
        errorData.status = null
        featureBillingAddress.value = true
    } else {
        errorData.status = 503
        featureBillingAddress.value = false
    }
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

async function retry() {
    saveData()
}

const map_ = ref('');
const message_er = ref('')
const url_addr = ref('')
const tax_er = ref('')
const attemptRequest = ref(0) 
function saveData(){
    clearError()
    check_new_auth_user()

    if(featureBillingAddress.value === false ) rerturn 
    isLoading.value = true

    if(data_edit.value){
        url_addr.value = config.VUE_APP_API_URL_PAYMENT+'me/addresses/'+data_edit.value.id
    } else{
        url_addr.value = config.VUE_APP_API_URL_PAYMENT+'me/addresses'
    }
    
    if(data_lat.value){
        map_.value = data_lat.value +','+ data_lng.value
    }

    if(window.navigator.onLine) {
        let data_input = {
            name: formData.name,
            label: formData.label,
            company: formData.company,
            email: formData.email,
            'phone[0]': formData.phone[0],
            'phone[1]': formData.phone[1] != undefined ? formData.phone[1]:'',
            'phone[2]': formData.phone[2] != undefined ? formData.phone[2]:'',
            location: commune.value ? commune.value: locationID.value,
            address: formData.address,
            tax_id: formData.tax_id,
            category: formData.category,
            is_default: checkbox.value,
            map: map_.value ? map_.value: ''
        }

        $fetch(url_addr.value+`?storeid=0&lang=${locale.value}`, {
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token },
            method: 'POST',
            retry: 2, 
            retryDelay: 3000, 
            // params: {lang: language.value},
            body: new URLSearchParams(data_input)
        }).then(res=>{
            isLoading.value = false
            data_edit.value = ''
            defaultAdress.value = res.data  
            myAddress.value = ''
            router.back()
        }).catch(er=>{
            // for server or API not respone 
            if(!er.response) {
                errorData.status = 500
                isLoading.value = false
                return  
            } 
            // for show service unavailable.
            if(er && er.response.status === 503) {
                errorData.status = 503
                isLoading.value = false
                return 
            }
            // for token expired
            if(er && er.response.status === 401) {
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { saveData() }, 3000);
                } else {
                    localStorage.removeItem('auth_user')
                    router.replace(localePath({ name: 'index' }))  
                    isLoading.value = false
                    return 
                }
            }

            isLoading.value = false
            let toast = $('.toast');
            toast.removeClass('d-none');
            toast.toast({ delay: 10000 });
            toast.toast('show');
            message_er.value = er.data.message
            errorShow.value = er.data.errors
            if(errorShow.value.tax_id){
                tax_er.value =  locale.value === 'km' ? 'លេខសម្គាល់ពន្ធមិនត្រឹមត្រូវ។' : 'Tax ID is invalid.'
                $("#tax_id").css('border', 'solid 1px red');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#tax_id").offset().top-150
                }, 'slow');
                if ("#tax_id") $("#tax_id").focus();
            }
            if(errorShow.value.email){
                $("#email").css('border', 'solid 1px red');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#email").offset().top-150
                }, 'slow');
                if ("#email") $("#email").focus();
            }else{
                $("#email").css('border', 'solid 1px gray');
            }
            if(errorShow.value.location){
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#email").offset().top-150
                }, 'slow');
            }
            const key = 'phone[0]';
            const key1 = 'phone[1]';
            const key2 = 'phone[2]';
            if(errorShow.value[key]){
                $("#phone").css('border', 'solid 1px red');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#phone").offset().top-150
                }, 'slow');
                if ("#phone") $("#phone").focus();
            }else{
                $("#phone").css('border', 'solid 1px gray');
            }
            if(errorShow.value[key1]){
                $("#phone2").css('border', 'solid 1px red');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#phone2").offset().top-150
                }, 'slow');
                if ("#phone2") $("#phone2").focus();
            }else{
                $("#phone2").css('border', 'solid 1px gray');
            }
            if(errorShow.value[key2]){
                $("#phone3").css('border', 'solid 1px red');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#phone3").offset().top-150
                }, 'slow');
                if ("#phone3") $("#phone3").focus();
            }else{
                $("#phone3").css('border', 'solid 1px gray');
            }
        })
    }
}

function get_data(){
    isLoading.value = true
    if(data_edit.value){
        formData.name = data_edit.value.name
        formData.company = data_edit.value.company ? data_edit.value.company:''
        formData.email = data_edit.value.email ? data_edit.value.email: ''
        aPhone.value = []
        phone.value = []
        data_edit.value.phone.forEach(ph => {
            aPhone.value.push(ph)
            phone.value.push(ph)
        });
        province_name.value = locale.value === 'km' ? data_edit.value.location.province.km_name : data_edit.value.location.province.en_name
        district_name.value = locale.value === 'km' ? data_edit.value.location.district.km_name : data_edit.value.location.district.en_name
        commune_name.value =  locale.value === 'km' ? data_edit.value.location.commune.km_name : data_edit.value.location.commune.en_name
        locationID.value = data_edit.value.location.id
        formData.address = data_edit.value.address
        formData.tax_id = data_edit.value.tax_id ? data_edit.value.tax_id:''
        formData.category = data_edit.value.category
        formData.label = data_edit.value.label ? data_edit.value.label: ''
        if(formData.category === 'other'){
            if(document.getElementById('other_id')) {
                document.getElementById('other_id').hidden = false
            }
        }else{
            formData.label = ''
        }
        checkbox.value = data_edit.value.is_default
        if(checkbox.value){
            toggleCheckbox();
        }

        if(data_edit.value.map){
            show_map.value = data_edit.value.map ? true : false;
            setTimeout(() => { show_new_static_google_map(); },300);
            data_edit.value.map.forEach((val,index) =>{
                if(index === 0){
                    def_lat.value = data_edit.value.map ? parseFloat(val) : def_lat.value; 
                }
                if(index === 1){
                    def_lng.value = data_edit.value.map ? parseFloat(val) : def_lng.value;
                }
            })
            data_lat.value = def_lat.value;
            data_lng.value = def_lng.value;
            data_zoom.value = 7;
        }
    }
    isLoading.value = false
}

function show_location() {
    // --- get current locations lat lng ---
    show_current_location('');
    // --- show modal google map ---
    $('#show_modal_google_map').modal('show');
}

function er_(){
    if(commune_name.value === ''){
        document.getElementById("location").style.borderColor = "red";  
        document.getElementById("location").classList.add("border_red_");  
        document.getElementById("t_i").style.top = "95%";  
        document.getElementById('dip').hidden = false
    }
    if(formData.category === ''){
        document.getElementById('home_l').style.border = '1px solid red';
        document.getElementById('work_l').style.border = '1px solid red';
        document.getElementById('other_l').style.border = '1px solid red';
    }
}

function other(type){
    if(type === 'other'){
        document.getElementById('other_id').hidden = false
        document.getElementById('home_l').style.border = '1px solid #9c9fa2';
        document.getElementById('work_l').style.border = '1px solid #9c9fa2';
        document.getElementById('other_l').style.border = '1px solid #9c9fa2';
    }else{
        formData.label = ''
        document.getElementById('other_id').hidden = true
        document.getElementById('home_l').style.border = '1px solid #9c9fa2';
        document.getElementById('work_l').style.border = '1px solid #9c9fa2';
        document.getElementById('other_l').style.border = '1px solid #9c9fa2';
    }
    
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

            // console.log(get_lat_lng)
            // get zoom level of the map.
            zoom.value = parseInt(new_map.value.getView().getZoom());

            // console.log('lng = '+lng.value+'  lat = '+lat.value+'  zoom = '+zoom.value);
        });
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

function toggleCheckbox() {
    is_default.value = !is_default.value; 
    if (is_default.value) {
        checkbox.value = 'true'
    } else {
        checkbox.value = 'false'
    }
}

// =========== add more field phone numbers ============
function add_field_phone_number() {
    phone.value.push("");
    if (phone.value.length === 2) {
        setTimeout(function () {
        $("#phone2").focus();
        }, 500); 
    } else if (phone.value.length === 3) {
        setTimeout(function () {
        $("#phone3").focus();
        }, 500);
    }
}

function minus_field_phone(index) {
    phone.value.splice(index, 1);
    formData.phone.splice(index, 1);
}
// ============ phone number condition END ============

//   ========== location ================

function choose_location(con) {
    if (window.navigator.onLine) {
        mul_arr_location.value = locations.value; 
        type_loc.value = '';
        tmp_pro_N.value = ''; tmp_pro_ID.value = '';
        tmp_dis_N.value = ''; tmp_dis_ID.value = '';
        tmp_comm_N.value = ''; tmp_comm_ID.value = '';
        // showPopup.value = true
        $('#modal_location').modal(con);

    } else {
        $('#modal_show_status_error_connection').modal('show');
    }
}

// ---- clear location when click clear ----
function close(){
    showPopup.value = false
}

function clear_filter() {
    location.value = '';
    district.value = '';
    commune.value = '';
    province_name.value = '';
    district_name.value = '';
    commune_name.value = '';
    // clear old data too
    old_arr_loc.value = { loc: '', dis: '', com: '' };
    $('#modal_location').modal('hide');
    document.getElementById('dip').hidden = false
    document.getElementById("location").style.borderColor = "#9c9fa2";  ///#9c9fa2
    document.getElementById("t_i").style.top = "95%";
}

// ---- if have selected location show districts ----
function show_next_location(loc) {
    // console.log(loc);
    if (loc.type === 'province') {
        tmp_pro_N.value = locale.value === 'km' ? loc.km_name : loc.en_name;
        tmp_pro_ID.value = loc.id;
        show_change_data_location('', 'province', loc.slug); // get sub locations of this province.
        type_loc.value = 'district';
        if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.

    } else if (loc.type === 'district') {
        tmp_dis_N.value = locale.value === 'km' ? loc.km_name : loc.en_name;
        tmp_dis_ID.value = loc.id;
        show_change_data_location('', 'district', loc.slug); // get sub locations of this district.
        type_loc.value = 'commune';
        if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.

    } else {
        tmp_comm_N.value = locale.value === 'km' ? loc.km_name : loc.en_name;
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
        $('#modal_location').modal('hide')
        type_loc.value = '';
        show_last_lat_lng_from_location(lat_lng_loc.value);
        document.getElementById('dip').hidden = true
        document.getElementById("location").style.borderColor = "#9c9fa2";  ///#9c9fa2
        document.getElementById("t_i").style.top = "127%";
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
            params: {lang: locale.value, type: type_slug, parent: slug_location},
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

// show all location when edit
async function when_edit() {                   
    loading.value = true;
    await $fetch(config.VUE_APP_API_URL + 'locations', {      
        params: { lang: locale.value, },
    }).then(res => {
        locations.value = res && res.data ? res.data : [];
    }).catch(error => {
        if (!error.response) {
            loading.value = false; 
            $('#modal_show_status_error_connection').modal('show'); 
        }
    }).finally(() => (loading.value = false));
}
</script>
