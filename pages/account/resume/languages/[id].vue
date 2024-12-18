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
                        {{ $t('resume_cv.language') }}
                        </p>
                    </div>
                </div>
            </div>
        
            <div :class="isMobile ? 'p-3' : 'form_input p-3 bg-white mt_80'">
                <form role="form">
                    <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.language') }}</h1></div>
                    <div v-if="loadindScreen" class="loading_back_ground">
                        <div class="loading_img">
                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
                        </div>
                    </div>
                    <div v-else>
                        <div id="title" class="mb-3">
                            <label for="title" class="label_style mb-1 label full_width text-left ">{{ $t('resume_cv.title') }}<span class="text-danger">*</span></label>
                            <input type="text" v-model="GetLanguages.title" class="form-control more_border s-valid" :class="isMobile ? 'field-height' : 'dt-field-height'" id="title" name="title" required>
                        </div>
                        <div id="level" class="mb-3 botton-style">
                            <label for="level" class="label_style mb-1 label full_width text-left ">{{ $t('resume_cv.level') }}<span class="text-danger">*</span></label>
                            <select v-if="GetLanguages.level" v-model="GetLanguages.level.value" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="level" name="level" required>
                                <option hidden></option>
                                <option value="beginner">{{ $t('resume_cv.beginner') }}</option>
                                <option value="intermediate">{{ $t('resume_cv.intermediate') }}</option>
                                <option value="advanced">{{ $t('resume_cv.advanced') }}</option>
                                <option value="native">{{ $t('resume_cv.native') }}</option>
                            </select>
                            <i class="fas fa-chevron-down fn_13" id="icon-down"></i>
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
 definePageMeta( {layout: "custom", middleware: "auth"} );
import  en  from '@/locales/en.json'
import  km  from '@/locales/km.json'
const isMobile= ref(helper.m_or_d())
const { locale } = useI18n();
const GetAll = useState('GetAll',()=>'')
const auth_user = useCookie('auth_user')
const isLoading = useState('isLoading')
isLoading.value = false
const router = useRouter()
const route = useRoute()
const GetLanguages = ref('')
const runtime_config = useRuntimeConfig();            // setup config env to config variable.
const config = runtime_config.public;
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'; 
const loadindScreen = useState('loadindScreen')
loadindScreen.value = true
const errorShow = ref('')
// const headers = { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_user.value.tokens.access_token }
const auth_users = ref('')
const reload_q_again_1 = ref(0);
const localePath = useLocalePath();
function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
onMounted(()=>{
    show_validate()
    if(process.client){
        check_new_auth_user();
        get();
    }
    if(process.server){
        get();
    }
})
useHead({
    title: 'Languages - khmer24.com',
})
function show_validate(){
    $(document).ready(function () {
        var $form = $("form");
        $form.validate({
        rules: {
            title: { required: true,minlength: 2 },
            level: { required: true, }
        },
        messages: {
            level:  {
                required: locale.value === 'km' ? km.message_er.level : en.message_er.level,
                
            },
            title:  {
                required: locale.value === 'km' ? km.message_er.title : en.message_er.title,
                minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2
            },
        },
        submitHandler: () => {
            saveData()
          }
        });
    });
}
// =============GEt Data Update =============
function get(){
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/languages/'+route.params.id+'', {
        headers: { "Access-Token": auth_users.value.tokens.access_token }
    }).then(res=>{
        loadindScreen.value = false
        GetLanguages.value = res.data
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
    check_new_auth_user()
    isLoading.value = true
    const data_input = {
        title: GetLanguages.value.title,
        level: GetLanguages.value.level.value
    }
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/languages/'+route.params.id+'', {
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
</script>
