<template>
    <div>
        <div class="form-style" :class="isMobile ? ' pt-5 bg_style' : 'min_h'">
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="router.back()" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-0 l_h_con_title">
                        <p class="name_style truncate_wrap mb-0 ml-2 text-left">
                            {{ $t('resume_cv.summary') }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="Loading" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
                </div>
            </div>
            <div v-else :class="isMobile ? 'p-3' : 'form_input p-3 bg-white mt_80'">
                <div v-if="!isMobile" class=" dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.summary') }}</h1></div>
                <div class="mb-3">
                    <label for="" class="label_style label full_width text-left">{{ $t('resume_cv.summary') }}</label>
                    <textarea v-model="Summary" class="form-control more_border" rows="10" name="description"></textarea>
                </div>
                <div id="btn" @click="saveData">
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
        </div>
    </div>
</template>

<script setup>
import helper from "/helper";
definePageMeta( {layout: "custom", middleware: "auth"} );
const auth_user = useCookie('auth_user')
const isLoading = useState('isLoading')
isLoading.value = false
const Loading = ref(true)
const router = useRouter()
const Summary = useState('Summary',()=>'')
const Switch = useCookie('Switch')
const auth_users = ref('')
const reload_q_again_1 = ref(0);
const localePath = useLocalePath();
const { public:config } = useRuntimeConfig(); 
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const isMobile= ref(helper.m_or_d())
function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
onMounted(()=>{
    if(process.client){
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
useHead({ title: 'Summary - khmer24.com',})
// ============ Get Data==============
function get(){
    if(auth_users.value){
        Loading.value = true
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/summary', { 
            headers: { "Access-Token": auth_users.value.tokens.access_token }
        }).then(res => {
            Summary.value = res.data
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
                Loading.value = false
            },250)
        })
    }else{
        router.push(localePath({ name: 'auth' }));
    }
}
// ============= function input =============
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const data_input = {
        summary: Summary.value != undefined ? Summary.value: '',
    }
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/summary', {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_users.value.tokens.access_token },
        body: new URLSearchParams(data_input)
    }).then(res=>{
        isLoading.value = false
       router.back()
    }).catch(er=>{
        isLoading.value = false
        alert('error')
    })
}

</script>
