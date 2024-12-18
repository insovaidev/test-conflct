<template>
    <div>
        <div class="form-style" :class="isMobile ? 'pt-5 bg_style' : 'min_h'">
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="router.back()" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-0 l_h_con_title">
                        <p class="name_style truncate_wrap mb-0 ml-2 text-left">
                            {{ $t('resume_cv.experience') }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="form_input" :class="isMobile ? 'p-3' : 'p-3 bg-white mt_80'">
                <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.experience') }}</h1></div>
                <form>
                    <div v-if="loading" class="loading_back_ground">
                        <div class="loading_img">
                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
                        </div>
                    </div>
                    <div v-if="loadindScreen" class="loading_back_ground">
                        <div class="loading_img">
                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
                        </div>
                    </div>
                    <div v-else>
                        <div class="mb-3">
                            <label for="company" class="label_style label full_width text-left">{{ $t('resume_cv.company') }}<span class="text-danger">*</span></label>
                            <input type="text" v-model="GetExperiences.company" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="company" name="company">
                        </div>
                        <div class="mb-3">
                            <label for="position" class="label_style label full_width text-left">{{ $t('resume_cv.position') }}<span class="text-danger">*</span></label>
                            <input type="text" v-model="GetExperiences.position" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="position" name="position">
                        </div>
                        <div class="mb-3 position_relative">
                            <label for="location" class="label_style label mb-1 text-left full_width"> {{ $t('new_text.location') }} </label>
                            <div @click="choose_location('show')" name="location" id="location" :class="isMobile ? (province_name ? 'p_sel_1 field-height' : 'p_sel_2 field-height' ) : (province_name ? 'p_sel_1 dt-field-height' : 'p_sel_2 dt-field-height' )" class="e_selection text-left field-height cur_sur">
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
                        <div class="d-flex mb-1">
                            <div class="mr-2 w-100">
                                <label for="start_date" class="label_style label full_width text-left">{{ $t('resume_cv.start_date') }}<span class="text-danger">*</span></label>
                                <!-- <input type="date" v-model="GetExperiences.start_date" class="form-control field-height more_border" id="start_date" name="start_date" style="min-width: 90% !important;"> -->
                                <ClientOnly>
                                    <DatePicker 
                                        v-model="start_dates" 
                                        class="form-control" 
                                        :class="isMobile ? 'field-height' : 'dt-field-height'"
                                        style="background-color: white;" 
                                        id="start_date" name="start_date" 
                                        inputFormat="yyyy-MMM" 
                                        minimumView="month"
                                        :clearable="true"
                                    />
                                </ClientOnly>
                            </div>
                            <div class="ml-2 m_date w-100">
                                <div v-if="!Switch" >
                                    <label for="end_date" class="label_style label full_width text-left">{{ $t('resume_cv.end_date') }}<span class="text-danger">*</span></label>
                                    <ClientOnly>
                                        <DatePicker 
                                            v-model="end_date" 
                                            class="form-control bg-white" 
                                            :class="isMobile ? 'field-height' : 'dt-field-height'"
                                            id="end_date" name="end_date" 
                                            inputFormat="yyyy-MMM" 
                                            minimumView="month"
                                            :clearable="true"
                                        />
                                    </ClientOnly>
                                </div>
                                <div  v-else>
                                    <label for="" class="label_style label full_width text-left">{{ $t('resume_cv.end_date') }}</label>
                                    <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" :value=" $t('resume_cv.present') " disabled >
                                </div>
                            </div>
                        </div>
                        <div class=" d-flex" >
                            <div v-if="!GetExperiences.end_date" class="mt-4 mb-3 d-flex"  @click="toggle">
                                <span>{{ $t('resume_cv.i_currently_work_here') }}</span>
                                <div class="toggle active ml-3">
                                    <div class="circle"></div>
                                </div>
                            </div>
                            <div v-else class="mt-4 mb-3 d-flex"  @click="toggles">
                                <span>{{ $t('resume_cv.i_currently_work_here') }}</span>
                                <div class="toggles ml-3">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="label_style label full_width text-left">{{ $t('resume_cv.description') }}</label>
                            <textarea class="form-control more_border" rows="5" v-model="GetExperiences.description"  id="description" name="description"></textarea>
                        </div>
                        <div id="btn">
                            <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                                <div v-if="isLoading">
                                    <p class="buttonload">
                                        <i class="fa fa-spinner fa-spin mr-2"></i>{{ $t('resume_cv.loading') }}
                                    </p>
                                </div>    
                                <span v-else>{{ $t('resume_cv.save') }}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="toast style_toast d-none">
                <div class="toast-header header_padding_toast justify-content-between">
                    <strong class="mr-auto style_flex">
                        <i class="fas fa-exclamation-circle text-danger font_22"></i>
                        <div v-if="errorShow" class="m-0 ml-2 font_15 text-danger">
                            {{ errorShow.message }}
                        </div>
                    </strong>
                    <button type="button" class="ml-2 mt-1 mb-0 close a_close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true" class="text-danger">&times;</span>
                    </button>
                </div>
            </div>
            <div class="h_modal" v-if="showPopup" tabindex="-1" >
                <div class="_div_nav bg_app_bar_header_ fix_app_bar">
                    <!-- back locations -->
                    <div v-if="type_loc" class="_pad_col_icon">
                        <button @click="click_black_loc" class="btn back-btn-app-bar">
                            <i class="ion-ios-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <!-- close modal -->
                    <div v-else id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                        <button @click="close" class="btn clear-btn-app-bar">
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
                <div class="modal-body" :class="isDesktop ? 'de-head-quick_chat' : 'p-0 m_bottom_app_bar'">
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
            <div class="modal fade " id="show_loc" tabindex="-1"  aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                    <div class="modal-content rounded">
                        <div class="modal-header m_h_p">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div class="col text-center">
                                <p class="name_style truncate_wrap m-0">
                                    <template v-if="type_loc === 'district'">{{ $t('new_text_3.khan_or_district') }}</template>
                                    <template v-else-if="type_loc === 'commune'">{{ $t('new_text_3.sangkat_or_commune') }}</template>
                                    <template v-else>{{ $t('new_text_3.city_or_province') }}</template>
                                </p>
                            </div>
                            <div class="_pad_col_icon">
                                <button  @click="clear_filter" class="btn clear s_pad_clear " >{{ $t('message.clear') }}​</button>
                            </div>
                        </div>
                        <div class="modal-body" :class="isDesktop ? 'de-head-quick_chat' : 'p-0'">
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
        </div>
    </div>
</template>

<script setup>
 definePageMeta( {layout: "custom", middleware: "auth"} );
 import helper from "/helper";
import  en  from '@/locales/en.json'
import  km  from '@/locales/km.json'
const runtime_config = useRuntimeConfig();            // setup config env to config variable.
const config = runtime_config.public;
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'
const loadindScreen = useState('loadindScreen')
loadindScreen.value = true
const { locale } = useI18n();
const auth_user = useCookie('auth_user')
const isLoading = useState('isLoading')
isLoading.value = false
const router = useRouter()
const route = useRoute()
const Switch = useCookie('Switch')
const locationID = ref('')
const GetExperiences = useState('GetExperiences',()=>'')
const errorShow = ref('')
const isMobile= ref(helper.m_or_d())

//   ========== location ================
const showPopup = ref(false)
const isDesktop = helper.check_is_desktop();    
const localePath = useLocalePath();
const language = ref(helper.get_lang_cookie());
const auth = ref('');
const i = ref(0);
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
const def_lat = ref(0); 
const def_lng = ref(0); 
const def_zoom = ref(0);
const mul_arr_location = ref([]);
const type_loc = ref('');
const tmp_pro_N = ref('');  const tmp_pro_ID = ref('');
const tmp_dis_N = ref('');  const tmp_dis_ID = ref('');
const tmp_comm_N = ref(''); const tmp_comm_ID = ref('');
const old_arr_loc = ref({ loc: '', dis: '', com: '' });
const error_loc = ref(null);
const lat_lng_loc = ref('');
const arr_params = ref([]);  
const edit_con_to_post = ref(false);
const pa_con = helper.get_params_make_condition(); 
const reload_q_again_1 = ref(0);

// const headers = { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_user.value.tokens.access_token }
const formData = reactive({
    company: '',
    position: '',
    location: '',
    start_date: '',
    end_date: '',
    description:'',
})
onMounted(()=>{
    show_validate()
    if (process.client) {
        // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
        check_new_auth_user();
        arr_params.value = pa_con && pa_con.params_optional && pa_con.params_optional.d_params ? pa_con.params_optional.d_params : [];
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); };
        when_edit(location.value, district.value); 
        get();
    }
    if(process.server){
        get();
    }
})
useHead({
    title: 'Experiences - khmer24.com',
})
function show_validate(){
    $(document).ready(function () {
        var $form = $("form");
        $form.validate({
        rules: {
            company: { required: true,minlength: 2 },
            position: { required: true,minlength: 2 },
            start_date: { required: true, },
            end_date: { required: true, }
        },
        messages: {
            company: {required: locale.value === 'km' ? km.message_er.company : en.message_er.company,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2},
            position: { required: locale.value === 'km' ? km.message_er.position : en.message_er.position,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2 },
            start_date: { required: locale.value === 'km' ? km.message_er.s_date : en.message_er.s_date, },
            end_date: { required: locale.value === 'km' ? km.message_er.e_date : en.message_er.e_date, },
        },
        submitHandler: () => {
            saveData()
          }
        });
    });
}
// =============GEt Data Update =============
const start_dates = ref(null)
const end_date = ref(null)
function get(){
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/experiences/'+route.params.id+'', {
        headers: { "Access-Token": auth.value.tokens.access_token }
    }).then(res=>{
        loadindScreen.value = false
        const result = res
        GetExperiences.value = result.data
        start_dates.value = GetExperiences.value.start_date ? new Date(String( GetExperiences.value.start_date)) : null;
        end_date.value = GetExperiences.value.end_date ? new Date(String( GetExperiences.value.end_date)) : null;
        if(!GetExperiences.value.end_date){
        Switch.value = true
        }else{
            Switch.value = false
        }
        province_name.value = locale.value === 'km' ? GetExperiences.value.location.province.km_name : GetExperiences.value.location.province.en_name
        district_name.value = locale.value === 'km' ? GetExperiences.value.location.district.km_name : GetExperiences.value.location.district.en_name
        commune_name.value =  locale.value === 'km' ? GetExperiences.value.location.km_name : GetExperiences.value.location.en_name
        locationID.value = GetExperiences.value.location.id
    }).catch(error=>{
        if (error.response && error.response.status === 401) {
            if (reload_q_again_1.value <= 2) {
                reload_q_again_1.value += 1;
                check_new_auth_user();
                get();
            } else {
                localStorage.removeItem('auth_user');   // remove localStorage
                router.replace(localePath({ name: 'index' }));
            }
        }
    })
}

// ============= function input =============
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const locationtExp = ref('')
    if(commune.value){
        locationtExp.value = commune.value
    }else{
        locationtExp.value = locationID.value
    }
    const st_date = ref(null)
    const ed_date = ref(null)
    if (end_date.value) { // clean dob_date to correct format
        let cl_date = new Date(end_date.value);
        let day = cl_date.getDate();
        let month = cl_date.getMonth() + 1;
        let year = cl_date.getFullYear();
        if (parseInt(day) < 10) day = '0' + day;
        if (parseInt(month) < 10) month = '0' + month;
        ed_date.value = year + '-' + month + '-' + '01'; // ex: 2023-01-15
    }
    if (start_dates.value) { // clean dob_date to correct format
        let cl_date = new Date(start_dates.value);
        let day = cl_date.getDate();
        let month = cl_date.getMonth() + 1;
        let year = cl_date.getFullYear();
        if (parseInt(day) < 10) day = '0' + day;
        if (parseInt(month) < 10) month = '0' + month;
        st_date.value = year + '-' + month + '-' + '01'; // ex: 2023-01-15
    }
    const data_input = {
        company: GetExperiences.value.company,
        position: GetExperiences.value.position,
        location: locationtExp.value != undefined ? locationtExp.value:'',
        start_date: st_date.value,
        end_date: ed_date.value ? ed_date.value:'',
        description: GetExperiences.value.description != undefined ? GetExperiences.value.description: '',
    }
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/experiences/'+route.params.id+'', {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token },
        body: new URLSearchParams(data_input)
    }).then(res=>{
        isLoading.value = false
    router.back()
    }).catch(er=>{
        isLoading.value = false
        let toast = $('.toast');
        toast.removeClass('d-none');
        toast.toast({ delay: 10000 });
        toast.toast('show');
        if(er.response){
            errorShow.value = er.response._data
        }
    })   
}

let active = true
function toggle() {
      let toggle = document.querySelector('.toggle')
      active = !active
      if (active) {
          toggle.classList.add('active')
          Switch.value = true
          end_date.value = null
      } else {
          toggle.classList.remove('active')
          Switch.value = false
      }
}

let actives = false
function toggles() {
      let toggles = document.querySelector('.toggles')
      actives = !actives
      if (actives) {
          toggles.classList.add('active')
          Switch.value = true
          end_date.value = null
      } else {
          toggles.classList.remove('active')
          Switch.value = false
      }
}

//   ========== location ================
function check_new_auth_user() { auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
function choose_location(con) {
    if (window.navigator.onLine) {
        mul_arr_location.value = locations.value; 
        type_loc.value = '';
        tmp_pro_N.value = ''; tmp_pro_ID.value = '';
        tmp_dis_N.value = ''; tmp_dis_ID.value = '';
        tmp_comm_N.value = ''; tmp_comm_ID.value = '';
        // showPopup.value = true
        if(isMobile.value){
            showPopup.value = true
        }else{
            $('#show_loc').modal('show')
        }

    } else {
        $('#modal_show_status_error_connection').modal('show');
    }
}
// ---- clear location when click clear ----
function close(){
    // showPopup.value = false
    if(isMobile.value){
        showPopup.value = false
    }else{
        $('#show_loc').modal('hide')
    }
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
    locationID.value = ''
    // showPopup.value = false
    if(isMobile.value){
        showPopup.value = false
    }else{
        $('#show_loc').modal('hide')
    }
}
// ---- if have selected location show districts ----
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
        // showPopup.value = false
        if(isMobile.value){
            showPopup.value = false
        }else{
            $('#show_loc').modal('hide')
        }
        type_loc.value = '';
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
// show all location when edit
async function when_edit() {                   
    loading.value = true;
    await $fetch(config.VUE_APP_API_URL + 'locations', {      
        params: { lang: language.value, },
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
