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
                            {{ $t('resume_cv.education') }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="form_input" :class="isMobile ? 'p-3' : 'p-3 bg-white mt_80'">
                <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.education') }}</h1></div>
                <form role="form">
                    <div v-if="loadindScreen" class="loading_back_ground">
                        <div class="loading_img">
                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
                        </div>
                    </div>
                    <div v-else>
                        <div class="mb-3">
                            <label for="school" class="label_style label full_width text-left">{{ $t('resume_cv.school') }}<span class="text-danger">*</span></label>
                            <input type="text" v-model="GetEducations.school" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="school" name="school">
                        </div>
                        <div class="mb-3 botton-style">
                            <label for="degree" class="label_style label full_width text-left">{{ $t('resume_cv.degree') }}<span class="text-danger">*</span></label>
                            <select v-if="GetEducations.degree" :onclick="onclick" v-model="GetEducations.degree.value" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="degree" name="degree">
                                <option value="" ></option>
                                <option value="high-school">{{ $t('resume_cv.high_school') }}</option>
                                <option value="associate">{{$t('resume_cv.associate')}}</option>
                                <option value="professional">{{$t('resume_cv.professional')}}</option>
                                <option value="bachelor">{{$t('resume_cv.bachelor')}}</option>
                                <option value="master">{{$t('resume_cv.master')}}</option>
                                <option value="doctor">{{$t('resume_cv.doctor')}}</option>
                            </select>
                            <i class="fas fa-chevron-down fn_13" id="icon-down"></i>
                        </div>
                        <div class="mb-3" v-if="GetEducations.degree.value !== 'high-school' ">
                            <label for="major" class="label_style label full_width text-left">{{ $t('resume_cv.major') }}<span  class="text-danger">*</span></label>
                            <input type="text" v-model="GetEducations.major" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="major" name="major" >
                        </div>
                        <div class="mb-3" v-else>
                            <label for="major" class="label_style label full_width text-left">{{ $t('resume_cv.major') }}</label>
                            <input type="text" v-model="GetEducations.major" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                        </div>
                        <div class="d-flex mb-3" >
                            <div  class="mr-2 w-100">
                                <label for="start_date" class="label_style label full_width text-left">{{ $t('resume_cv.start_date') }}<span class="text-danger">*</span></label>
                                <!-- <input type="date" v-model="GetEducations.start_date" class="form-control field-height more_border" id="start_date" name="start_date" style="min-width: 90% !important;"> -->
                                <ClientOnly>
                                    <DatePicker 
                                        v-model="start_dates" 
                                        class="form-control bg-white" 
                                        :class="isMobile ? 'field-height' : 'dt-field-height'"
                                        id="start_date" name="start_date" 
                                        inputFormat="yyyy-MMM" 
                                        minimumView="month"
                                        :clearable="true"
                                    />
                                </ClientOnly>
                            </div>
                            <div class="w-100 ml-2 m_date">
                                <div v-if="!Switch" >
                                    <label for="end_date" class="label_style label full_width text-left">{{ $t('resume_cv.end_date') }}<span class="text-danger">*</span></label>
                                    <!-- <input type="date" v-model="GetEducations.end_date" class="form-control field-height more_border" id="end_date" name="end_date" style="min-width: 90% !important;"> -->
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
                        <div class="mb-3" >
                            <div v-if="!GetEducations.end_date" class="mt-4 mb-3 d-flex"  @click="toggle">
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
                            <textarea v-model="GetEducations.description" class="form-control more_border" rows="5" id="description" name="description"></textarea>
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
        </div>
    </div>
</template>

<script setup>
import helper from "/helper";
import  en  from '@/locales/en.json'
import  km  from '@/locales/km.json'
definePageMeta( {layout: "custom", middleware: "auth"} );
const { locale } = useI18n();
const isMobile= ref(helper.m_or_d())
// const auth_user = useCookie('auth_user')
const isLoading = useState('isLoading')
isLoading.value = false
const router = useRouter()
const route = useRoute()
const Switch = useCookie('Switch')
const GetEducations = ref('')
const runtime_config = useRuntimeConfig();            // setup config env to config variable.
const config = runtime_config.public;
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'
const loadindScreen = useState('loadindScreen')
loadindScreen.value = true
const errorShow = ref('')
// const headers = { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_user.value.tokens.access_token }
const major_no = ref('')
const auth_users = ref('')
const reload_q_again_1 = ref(0);
const localePath = useLocalePath();
function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
onMounted(()=>{
    show_validate();
    if(process.client){
        check_new_auth_user();
        get();
    }
    if(process.server){
        get();
    }
})
useHead({
    title: 'Educations - khmer24.com',
})
function show_validate(){
    $(document).ready(function () {
        var $form = $("form");
        $form.validate({
        rules: {
            school: { required: true, minlength: 2 },
            degree: { required: true, },
            major: { required: true,minlength: 2 },
            start_date: { required: true, },
            end_date: { required: true, }
        },
        messages: {
            school: {required: locale.value === 'km' ? km.message_er.school : en.message_er.school,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2},
            degree: { required: locale.value === 'km' ? km.message_er.degree : en.message_er.degree, },
            major: { required: locale.value === 'km' ? km.message_er.major : en.message_er.major, minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2},
            start_date: { required: locale.value === 'km' ? km.message_er.s_date : en.message_er.s_date, },
            end_date: { required: locale.value === 'km' ? km.message_er.e_date : en.message_er.e_date, },
        },
        submitHandler: () => {
            saveData()
          }
        });
    });
}
const optionDegree = ref('')
function onclick(option){
    optionDegree.value = GetEducations.value.degree.value
}
// =============GEt Data Update =============
const start_dates = ref(null)
const end_date = ref(null)
function get(){
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/educations/'+route.params.id+'', { 
        headers: { "Access-Token": auth_users.value.tokens.access_token } 
    }).then(res=>{
        loadindScreen.value = false
        const result = res
        GetEducations.value = result.data
        start_dates.value = GetEducations.value.start_date ? new Date(String( GetEducations.value.start_date)) : null;
        end_date.value = GetEducations.value.end_date ? new Date(String( GetEducations.value.end_date)) : null;
        major_no.value = GetEducations.value.major
        optionDegree.value =  GetEducations.value.degree.value
        if(!GetEducations.value.end_date){
        Switch.value = true
        }else{
            Switch.value = false
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
    })
}
// ============= function input =============
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const st_date = ref('')
    const ed_date = ref('')
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
        school: GetEducations.value.school,
        degree: GetEducations.value.degree.value,
        major:  GetEducations.value.major ? GetEducations.value.major: '',
        start_date: st_date.value,
        end_date: ed_date.value,
        description: GetEducations.value.description != undefined ? GetEducations.value.description: '',
    }
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/educations/'+route.params.id+'', {
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
        if(er.response){
            errorShow.value = er.response._data
        }
    })
}

let active = true
const toggle=()=> {
      let toggle = document.querySelector('.toggle')
      active = !active
      if (active) {
          toggle.classList.add('active')
          end_date.value = null
          Switch.value = true
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
          end_date.value = null
          Switch.value = true
      } else {
          toggles.classList.remove('active')
          Switch.value = false
      }
}
</script>
