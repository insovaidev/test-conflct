<template>
    <div>
        <div v-if="loadindScreen" class="loading_back_ground" style="background: #f1f1f1 !important; z-index: 15 !important;">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div class="form-style " :class="isMobile ? 'pt-5 bg_style' : 'min_h'">
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="router.back()" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-0 l_h_con_title">
                        <p class="name_style truncate_wrap mb-0 ml-2 text-left">
                            {{ $t('resume_cv.preference') }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="form_input" :class="isMobile ? 'p-3' : ' p-3 bg-white mt_80'">
                <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.preference') }}</h1></div>
                <form role="form">
                    <div> 
                        <div class="mb-3 botton-style">  
                            <div v-if="open_job === 'true'" class="d-flex toggle_in_box" :class="isMobile ? 'field-height' : 'pt-1 dt-field-height'" @click="toggle" >
                                <span class="text-bold w_87">{{ $t('resume_cv.open_job') }}</span>
                                <div class="m-inherit w-100">
                                    <div class="toggle active mr-2 m-auto">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="open_job === 'false'" class="d-flex toggle_in_box" :class="isMobile ? 'field-height' : 'pt-1 dt-field-height'" @click="toggles"  >
                                <span class="text-bold w_87">{{ $t('resume_cv.open_job') }}</span>
                                <div class="m-inherit w-100">
                                    <div class="toggles mr-2 m-auto">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="GetPreference">
                            <div class="mb-3" v-if="GetPreference.open_job === true">
                                <label for="position" class="label_style label full_width text-left">{{ $t('resume_cv.preferred_position') }}<span class="text-danger">*</span></label>
                                <input id="position" type="text" v-model="formData.position" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" name="position" >
                            </div>
                            <div class="mb-3" v-else>
                                <div v-if="GetPreference.open_job === 'true'">
                                    <label for="position" class="label_style label full_width text-left">{{ $t('resume_cv.preferred_position') }}<span class="text-danger">*</span></label>
                                    <input  type="text" v-model="formData.position" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" id="position" name="position" >
                                </div>
                                <div v-else>
                                    <label class="label_style label full_width text-left">{{ $t('resume_cv.preferred_position') }}</label>
                                    <input  type="text" v-model="formData.position" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" >
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="d-flex toggle_in_box mb-3" @click="toggles1"  >
                                <span class="text-bold w_87">{{ $t('resume_cv.open_job') }}</span>
                                <div class="toggles1 mr-2 ms-auto">
                                    <div class="circle"></div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div v-if="formData.open_job === 'true'">
                                    <label for="position" class="label_style label full_width text-left">{{ $t('resume_cv.preferred_position') }}<span class="text-danger">*</span></label>
                                    <input  type="text" v-model="formData.position" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" id="position" name="position" >
                                </div>
                                <div v-else>
                                    <label class="label_style label full_width text-left">{{ $t('resume_cv.preferred_position') }}</label>
                                    <input  type="text" v-model="formData.position" class="form-control" :class="isMobile ? 'field-height' : 'dt-field-height'" >
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 botton-style" >
                            <label for="" class="label_style label full_width text-left">{{ $t('resume_cv.category') }}</label>
                            <Multiselect 
                                v-model="formData.category"
                                mode="tags"
                                :max="6"
                                :placeholder= "locale === 'km' ? 'ជ្រើសរើសប្រភេទណាមួយ' : 'Select Categories'"
                                :close-on-select="false"
                                :options="locale === 'km' ? CateOptionKm : CateOptionEn"
                                @select="onSelectCategory"
                                ref="categories"
                                class="multiselect-blue "
                                :class="isMobile ? 'min-h-48' : 'min-h-40'"
                                name="category"
                            >
                                <template v-slot:multiplelabel="{ values }">
                                    <div class="multiselect-multiple-label" >
                                    {{ values.length }} characters selected
                                    </div>
                                </template>
                            </Multiselect>
                        </div>
                        <div class="mb-3 botton-style">
                            <label for="" class="label_style label full_width text-left">{{ $t('resume_cv.location') }}</label>
                            <Multiselect
                            v-model="formData.location"
                                mode="tags"
                                :max="3"
                                :placeholder= "locale === 'km' ? 'ជ្រើសរើសទីតាំងណាមួយ' : 'Select Location'"
                                :close-on-select="false"
                                :options=" locale === 'km' ? ProOption : ProOptionEn "
                                @select="onSelectLocation"
                                ref="location"
                                class="multiselect-blue "
                                :class="isMobile ? 'min-h-48' : 'min-h-40'"
                                name="location"
                            >
                                <template v-slot:multiplelabel="{ values }">
                                    <div class="multiselect-multiple-label">
                                    {{ values.length }} characters selected
                                    </div>
                                </template>
                            </Multiselect>
                        </div>
                        <div class="mb-3 botton-style">
                            <label for="" class="label_style label full_width text-left">{{ $t('resume_cv.job_type') }}</label>
                            <Multiselect
                            v-model="formData.job_type"
                                mode="tags"
                                :placeholder= "locale === 'km' ? 'ជ្រើសរើសប្រភេទការងារ' : 'Select Job Type'"
                                :max-height="300"
                                :max="6"
                                :close-on-select="false"
                                :options="[
                                    { value: 'full-time', label: $t('resume_cv.full_titme') },
                                    { value: 'part-time', label: $t('resume_cv.part_time') },
                                    { value: 'internships', label: $t('resume_cv.internships') },
                                    { value: 'freelance', label: $t('resume_cv.freelance') },
                                    { value: 'contract', label: $t('resume_cv.contract') },
                                    { value: 'volunteer', label: $t('resume_cv.Volunteer') },
                                    ]"
                                    @select="onSelectJtype"
                                    ref="j_type"
                                    class="multiselect-blue m-select"
                                    :class="isMobile ? 'min-h-48' : 'min-h-40'"
                                >
                                <template v-slot:multiplelabel="{ values }">
                                    <div class="multiselect-multiple-label">
                                    {{ values.length }} characters selected
                                    </div>
                                </template>
                            </Multiselect>
                        </div>
                        <div id="btn">
                            <button class="btn btn-k24-secondary"  :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
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
                <div class="toast-header header_padding_toast">
                    <strong class="mr-auto style_flex">
                        <i class="fas fa-exclamation-circle text-danger font_22"></i>
                        <div v-if="errorShow" class="m-0 ml-2 font_15 text-danger">
                            <p v-for="(ers) in errorShow" :key="ers"> 
                            {{ ers.message }}
                            </p>
                        </div>
                    </strong>
                    <button type="button" class="ml-2 mt-1 mb-0 close a_close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true" class="text-danger">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
 definePageMeta( {layout: "custom", middleware: "auth"} );
 import helper from "/helper";
import Multiselect from '@vueform/multiselect';
const { locale } = useI18n();
const auth_user = useCookie('auth_user')
const isLoading = useState('isLoading')
isLoading.value = false
const router = useRouter()
const open_job = useCookie('open_job')
const GetJobT = ref([''])
const categoryA = ref([''])
const locationA = ref([''])
const getPosition = ref('')
const runtime_config = useRuntimeConfig();            // setup config env to config variable.
const config = runtime_config.public;
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'
const loadindScreen = useState('loadindScreen')
loadindScreen.value = true
const errorShow = ref('')
const isTouched = ref(false);
const o_job = ref(null)
const headers = { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_user.value.tokens.access_token }
const auth_users = ref('')
const reload_q_again_1 = ref(0);
const localePath = useLocalePath();
const isMobile= ref(helper.m_or_d())
function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
const formData = reactive({
    category: categoryA,
    location: locationA,
    job_type: GetJobT,
    open_job: 'false',
    position: getPosition
})
onMounted(()=>{
    
    if(process.client){
        show_validate()
        if (helper.check_auth_user() === false) { 
           router.push(localePath({ name: 'auth' }))
        };
        check_new_auth_user();
        get();
    }
    if(process.server){
        get();
    }
})

useHead({
    title: 'Preferences - khmer24.com',
    link:[
        { rel:'stylesheet',href:'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css' }
    ],
    script:[
        { src:'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js'}
    ]
})
function show_validate(){
    $(document).ready(function () {
        var $form = $("form");
        $form.validate({
        rules: {
            position: { required: true, },
            location: { required: true, },
            job_type: { required: true, },
        },
        messages: {
            level: "Please Select Level.",
        },
        submitHandler: () => {
            saveData()
          }
        });
    });
}
// ============= get Data Preferences ==============

const GetPreference = useState('GetPreference',()=>'')
function get(){
    // loadindScreen.value = true
    if(auth_users.value){
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/preference', {
            headers: { "Access-Token": auth_users.value.tokens.access_token }
        }).then(res=>{
            const result = res
            GetPreference.value = result.data
            getPosition.value = result.data.position
            // o_job.value = GetPreference.value.open_job
            if(!GetPreference.value.open_job === true){
                open_job.value = 'false'
            }else{
                open_job.value = 'true'
            }
            categoryA.value = []
            locationA.value = []
        
            if(GetPreference.value.category){
                GetPreference.value.category.forEach(val=>{
                    categoryA.value.push(val.id)
                })
            }
            if(GetPreference.value.location){
                GetPreference.value.location.forEach(val=>{
                    locationA.value.push(val.id)
                })
            }
            if(GetPreference.value.job_type){
                GetPreference.value.job_type.forEach(val=>{
                    GetJobT.value.push(val.value)
                })
            }
            
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
        }).finally(()=>{
            setTimeout(()=>{
                loadindScreen.value = false
            },250)
        })
    }
}


// select full target close form 
const j_type  = ref(null)
function onSelectJtype(option, multiselect) {
    var values = formData.job_type;
    if(values.length === j_type.value.max) {
        j_type.value.close()
    }
}

// ================== Get Provinces ===================
const Province = useState('Province',()=>'')
const ProValue = useState('ProValue',()=>[])
const ProOption = useState('ProOption',()=>[])
const ProOptionEn = useState('ProOptionEn',()=>[])
useFetch(config.VUE_APP_API_URL+'locations').then(province => {
    const result = province.data
    Province.value = result.value.data
    ProValue.value = []
    ProOption.value = []
    ProOptionEn.value = []
    Province.value.forEach(val => {
        if(val.id){
            ProValue.value.push(val.id)
        }
        if(val.id && val.km_name && val.en_name){
            ProOption.value.push({ value: val.id, label: val.km_name })
            ProOptionEn.value.push({ value: val.id, label: val.en_name })
        }
    });
})
// select full target close form
const location  = ref(null)
function onSelectLocation(option, multiselect) {
    var values = formData.location;
    if(values.length === location.value.max) {
        location.value.close()
    }
}
// ================== End Get Provinces ===================

// ================== Get Category ===================
const category = useState('category',()=>'')
const CateValue = useState('CateValue',()=>[])
const CateOptionKm = useState('CateOption',()=>[])
const CateOptionEn = useState('CateOptionEn',()=>[])
useFetch(config.VUE_APP_API_URL+'categories?parent=jobs')
.then(res=>{
    const result = res.data
    category.value = result.value.data
    category.value.forEach(val => {
        if(val.id){
            CateValue.value.push(val.id)
        }
        if(val.id && val.km_name && val.en_name){
            CateOptionKm.value.push({ value: val.id, label: val.km_name })
            CateOptionEn.value.push({ value: val.id, label: val.en_name })
        }
    });
})
// select full target close form
const categories  = ref(null)
function onSelectCategory(option, multiselect) {
    var values = formData.category;
    if(values.length === categories.value.max) {
        categories.value.close()
    }
}
// ================== End Get Category ===================

// ============= function input to database =============
const test = ref(null)
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const o_j = ref('')
    if(GetPreference.value){
        o_j.value = GetPreference.value.open_job ? GetPreference.value.open_job: 'false'
    }else{
        o_j.value = formData.open_job ? formData.open_job: 'false'
    }
    const data_input = {
        category: formData.category ? formData.category:'',
        location: formData.location ? formData.location:'',
        job_type: formData.job_type ? formData.job_type:'',
        open_job: o_j.value,
        position: formData.position ? formData.position:''
    }
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/preference', {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_users.value.tokens.access_token },
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
        errorShow.value = er.data.errors
    })
}
// ============= End function input to database =============
// const o_j = ref('')
//     if(GetPreference.value.open_job){
//         o_j.value = GetPreference.value.open_job
//     }else{
//         o_j.value = o_job.value
//     }
// ============= toggle open job ==============
let active = true
const toggle=()=> {
    let toggle = document.querySelector('.toggle')
    active = !active
    if (active) {
        toggle.classList.add('active')
        GetPreference.value.open_job = 'true'
    } else {
        toggle.classList.remove('active')
        GetPreference.value.open_job = 'false'
    }
}
let actives = false
function toggles() {
    let toggles = document.querySelector('.toggles')
    actives = !actives
    if (actives) {
        toggles.classList.add('active')
        GetPreference.value.open_job = 'true' 
    } else {
        toggles.classList.remove('active')
        GetPreference.value.open_job = 'false'
    }
}

let actives1 = false
function toggles1() {
    let toggles = document.querySelector('.toggles1')
    actives1 = !actives1
    if (actives1) {
        toggles.classList.add('active')
        formData.open_job = 'true' 
    } else {
        toggles.classList.remove('active')
        formData.open_job = 'false'
    }
}
// ============= End toggle open job ==============
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect-blue {
  --ms-tag-bg: #DBEAFE;
  --ms-tag-color: rgb(84, 83, 83);
  /* min-height: 48px; */
  border: 1px solid #9c9fa2 !important;
}

.min-h-48{
    min-height: 48px !important;
}
.min-h-40{
    min-height: 38px !important;
}

.multiselect{
    min-height: unset;
}


.multiselect-green {
  --ms-tag-bg: #D1FAE5;
  --ms-tag-color: #0f0596;
}
input.error { border: 1px solid rgb(59, 33, 33); }
select.error { border: 1px solid red; }

.is-open{
    border: 1px solid #80bdff !important;
  outline-style: solid;
  outline-color: rgba(0,123,255,.25);
  /* box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25); */
}
/* .multiselect{
    border: var(--ms-border-width,1px) solid var(--ms-border-color,#ced4da)
} */
.multiselect {
    border: var(--ms-border-width,1px) solid var(--ms-border-color,#ced4da);
}
.multiselect.is-active {
    box-shadow: 0 0 0 var(--ms-ring-width,3px) var(--ms-ring-color,0 0 0 0.2rem rgba(0,123,255,.25));
}

.form-control{
    border: 1px solid #9c9fa2 !important;
}


</style>