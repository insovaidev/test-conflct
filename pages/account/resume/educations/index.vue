<template>
    <div>
        <div class="form-style" :class="isMobile ? 'bg_style pt-5' : 'min_h'">
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="router.back()" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col ps-0 l_h_con_title">
                        <p class="name_style truncate_wrap mb-0 ms-2 text-left">
                        {{ $t('resume_cv.education') }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="form_input" :class="isMobile ? 'p-3' : 'p-3 bg-white mt_80'">
                <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.education') }}</h1></div>
                <form class="form">
                    <div class="mb-3">
                        <label for="school" class="label_style label full_width text-left">{{ $t('resume_cv.school') }}<span class="text-danger">*</span></label>
                        <input type="text" v-model="formData.school" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="school" name="school">
                    </div>
                    <div class="mb-3 botton-style">
                        <label for="degree" class="label_style label full_width text-left">{{ $t('resume_cv.degree') }}<span class="text-danger">*</span></label>
                        <select v-model="formData.degree" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" :onclick="onclick" id="degree" name="degree">
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
                    <div class="mb-3" v-if="formData.degree !== 'high-school'">
                        <label for="major" id="major" class="label_style label full_width text-left">{{ $t('resume_cv.major') }}<span  class="text-danger">*</span></label>
                        <input type="text" v-model="formData.major" id="major" class="form-control more_border " :class="isMobile ? 'field-height' : 'dt-field-height'" name="major" >  
                    </div>
                    <div class="mb-3" v-else>
                        <label for="major" id="major" class="label_style label full_width text-left">{{ $t('resume_cv.major') }}</label>
                        <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">  
                    </div>
                    
                    <div class="d-flex mb-3" >
                        <div class="me-2 w-100 ">
                            <label for="start_date" class="label_style label full_width text-left">{{ $t('resume_cv.start_date') }}<span class="text-danger">*</span></label>
                            <ClientOnly>
                                <DatePicker 
                                    v-model="formData.start_date" 
                                    class="form-control bg-white"
                                    :class="isMobile ? 'field-height' : 'dt-field-height'"
                                    id="start_date" 
                                    name="start_date" 
                                    inputFormat="yyyy-MMM" 
                                    minimumView="month"  
                                    :clearable="true"
                                />
                            </ClientOnly>
                        </div>
                        <div class="ms-2 m_date w-100">
                            <div v-if="!Switch" >
                                <label for="end_date" class="label_style label full_width text-left">{{ $t('resume_cv.end_date') }}<span class="text-danger">*</span></label>
                                <DatePicker 
                                    v-model="formData.end_date" 
                                    class="form-control bg-white " 
                                    :class="isMobile ? 'field-height' : 'dt-field-height'"
                                    id="end_date" name="end_date" 
                                    inputFormat="yyyy-MMM" 
                                    minimumView="month" 
                                    :clearable="true"
                                />
                            </div>
                            <div v-else>
                                <label for="" class="label_style label full_width text-left">{{ $t('resume_cv.end_date') }}</label>
                                <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" :value=" $t('resume_cv.present') " disabled >
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 mb-3 d-flex" @click="toggle">
                        <div>{{ $t('resume_cv.i_currently_attend_here') }}</div>
                        <div class="toggle ms-3" >
                            <div class="circle"></div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="label_style label full_width text-left">{{ $t('resume_cv.description') }}</label>
                        <textarea v-model="formData.description" class="form-control more_border" rows="5" id="description" name="description"></textarea>
                    </div>
                    <div id="btn">
                        <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                            <div v-if="isLoading">
                                <p class="buttonload">
                                    <i class="fa fa-spinner fa-spin me-2"></i>{{ $t('resume_cv.loading') }}
                                </p>
                            </div>    
                            <span v-else>{{ $t('resume_cv.save') }}</span>
                        </button>
                    </div>
                </form>
            </div>
            <!-- Modal show error connection -->
            <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style mg-mo-auto" role="document" >
                    <div class="modal-content max_width_form">
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
            <div class="toast style_toast d-none">
                <div class="toast-header header_padding_toast justify-content-between">
                    <strong class="me-auto style_flex">
                        <i class="fas fa-exclamation-circle text-danger font_22"></i>
                        <div v-if="errorShow" class="m-0 ms-2 font_15 text-danger">
                            {{ errorShow.message }}
                        </div>
                    </strong>
                    <button type="button" class="ms-2 mt-1 mb-0 close a_close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true" class="text-danger">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import helper from "/helper";
 definePageMeta( {layout: "custom", middleware: "auth"} );
import  en  from '@/locales/en.json'
import  km  from '@/locales/km.json'
const { locale } = useI18n();
const isMobile= ref(helper.m_or_d())
const isLoading = useState('isLoading')
isLoading.value = false
const router = useRouter()
const Switch = useCookie('Switch')
const errorShow = ref('')
const { public:config } = useRuntimeConfig(); 
const formData = reactive({
    school: '',
    degree: '',
    major_no: '',
    major: '',
    start_date: null,
    end_date: null,
    description:'',
})
const auth_users = ref('')
function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
onMounted(()=>{
    show_validate()
    check_new_auth_user();
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
            major: { required: true, minlength: 2 },
            start_date: { required: true, },
            end_date: { required: true, }
        },
        messages: {
            school:  {required: locale.value === 'km' ? km.message_er.school : en.message_er.school,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2},
            degree:  { required: locale.value === 'km' ? km.message_er.degree : en.message_er.degree, },
            major:  { required: locale.value === 'km' ? km.message_er.major : en.message_er.major,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2 },
            start_date:  { required: locale.value === 'km' ? km.message_er.s_date : en.message_er.s_date, },
            end_date:  { required: locale.value === 'km' ? km.message_er.e_date : en.message_er.e_date, },
        },
        submitHandler: () => {
            saveData()
          }
        });
    });
}
// ============= function input =============
const optionDegree = ref('')
function onclick(option){
    optionDegree.value = formData.degree
}
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const ed_date = ref('')
    const st_date = ref('')
    if (formData.end_date) { // clean dob_date to correct format
        let cl_date = new Date(formData.end_date);
        let day = cl_date.getDate();
        let month = cl_date.getMonth() + 1;
        let year = cl_date.getFullYear();
        if (parseInt(day) < 10) day = '0' + day;
        if (parseInt(month) < 10) month = '0' + month;
        ed_date.value = year + '-' + month + '-' + '01'; // ex: 2023-01-15
    }
    if (formData.start_date) { // clean dob_date to correct format
        let cl_date = new Date(formData.start_date);
        let day = cl_date.getDate();
        let month = cl_date.getMonth() + 1;
        let year = cl_date.getFullYear();
        if (parseInt(day) < 10) day = '0' + day;
        if (parseInt(month) < 10) month = '0' + month;
        st_date.value = year + '-' + month + '-' + '01'; // ex: 2023-01-15
    }
    const data_input = {
        school: formData.school,
        degree: formData.degree,
        major: formData.major ? formData.major: '',
        start_date: st_date.value,
        end_date: ed_date.value,
        description: formData.description,
    }
    if(window.navigator.onLine){
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/educations', {
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
    }else{
        isLoading.value=false
        $('#modal_show_status_error_connection').modal('show');
    }
}

Switch.value = false
let active = false
const toggle=()=> {
    let toggle = document.querySelector('.toggle')
    active = !active
    if (active) {
        toggle.classList.add('active')
        Switch.value = true
    } else {
        toggle.classList.remove('active')
        Switch.value = false
    }
}
</script>
