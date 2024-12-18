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
                            {{ $t('resume_cv.reference') }}
                        </p>
                    </div>
                </div>
            </div>

            <div :class="isMobile ? 'p-3' : 'form_input p-3 bg-white mt_80'">
                <!-- <h4 class="screen-d">{{ $t('resume_cv.reference') }}</h4> -->
                <div v-if="!isMobile" class=" dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.reference') }}</h1></div>
                <form>
                    <div class="mb-3">
                        <label for="name" class="label_style label full_width text-left">{{ $t('resume_cv.name') }}<span class="text-danger">*</span></label>
                        <input type="text" v-model="formData.name" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="company" class="label_style label full_width text-left">{{ $t('resume_cv.company') }}<span class="text-danger">*</span></label>
                        <input type="text" v-model="formData.company" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="company" name="company" required>
                    </div>
                    <div class="mb-3">
                        <label for="position" class="label_style label full_width text-left">{{ $t('resume_cv.position') }}<span class="text-danger">*</span></label>
                        <input type="text" v-model="formData.position" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="position" name="position" required>
                    </div>
                    <div class="mb-3">
                        <label class="label">{{ $t("resume_cv.phone") }}<span class="text-danger">*</span></label>
                        <template v-for="(p_n, index) in phone" :key="p_n">
                            <div v-if="index === 0" class="style_flex mb-3">
                            <div :class="phone.length === 1" class="w-100">
                                <input v-model="formData.phone[0]"  type="text" inputmode="numeric" :placeholder="$t('message.phone_1')" maxlength="10" class="form-control more_border phone[0]" :class="isMobile ? 'field-height' : 'dt-field-height'" id="phone" name="phone" />
                            </div>
                            <div v-if="phone.length === 1" @click="add_field_phone_number" class="p-0 div_add cur_sur" >
                                <span class="fas fa-plus-circle font_22 text-primary ml_20" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                            </div>
                            <div v-if="index === 1" class="style_flex mb-3">
                            <div :class="phone.length === 2" class="w-100 position-relative">
                                <input v-model="formData.phone[1]" type="text" inputmode="numeric" v :placeholder="$t('message.phone_2')" maxlength="10" id="phone2" name="phone_1" ref="inputapply1" :class="isMobile ? 'field-height' : 'dt-field-height'" class="form-control more_border phone[1]"/>
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field " :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                            </div>
                            <div v-if="phone.length === 2" @click="add_field_phone_number" class="p-0 div_add cur_sur" >
                                <span class="fas fa-plus-circle font_22 text-primary ml_20" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                            </div>
                            <div v-if="index === 2" class="style_flex mb-3">
                            <div class="col-12 p-0 position_relative">
                                <input v-model="formData.phone[2]" type="text" inputmode="numeric" v-bind:placeholder="$t('message.phone_3')" maxlength="10" id="phone3" name="phone_2" class="form-control more_border phone[2]" :class="isMobile ? 'field-height' : 'dt-field-height'" ref="inputapply2"/>
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field " :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                            </div>
                            </div>
                        </template>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="label_style label full_width text-left">{{ $t('resume_cv.email') }}</label>
                        <input type="email" v-model="formData.email" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="email" name="email">
                    </div>
                    <div id="btn">
                        <button class="btn btn-k24-secondary" :class="isMobile ? ' btn-height' : 'dt-btn-height'" id="test-color">
                            <div v-if="isLoading">
                                <p class="buttonload">
                                    <i class="fa fa-spinner fa-spin mr-2"></i>{{ $t('resume_cv.loading') }}
                                </p>
                            </div>    
                            <span v-else>{{ $t('resume_cv.save') }}</span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="toast style_toast d-none">
                <div class="toast-header header_padding_toast justify-content-between">
                    <strong class="mr-auto style_flex">
                        <i class="fas fa-exclamation-circle text-danger font_22"></i>
                        <div v-if="errorShow" class="m-0 ml-2 font_15 text-danger">
                            <p v-for="(ers) in errorShow" :key="ers"> 
                            {{ ers.message }}
                            </p>
                        </div>
                        <div v-if="limiterrorShow">
                            {{ limiterrorShow.message }}
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
import  en  from '@/locales/en.json'
import  km  from '@/locales/km.json'
const { locale } = useI18n();
const auth_user = useCookie('auth_user')
const isLoading = useState('isLoading')
isLoading.value = false
const router = useRouter()
const phone = ref([""]);
const Switch = useCookie('Switch')
const { public:config } = useRuntimeConfig(); 
const errorShow = ref('')
const limiterrorShow = ref('')
const isMobile= ref(helper.m_or_d())
const formData = reactive({
    name: '',
    company: '',
    position: '',
    email: '',
    phone:[]
})
const auth_users = ref('')
function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
onMounted(()=>{
    // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
    show_validate()
    check_new_auth_user();
})
useHead({
    title: 'References - khmer24.com',
})
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
                name: { required: true,minlength: 2 },
                company: { required: true, minlength: 2 },
                position: { required: true, minlength: 2 },
                email: { required: false, email:true },
                phone:{ required: true, phoneKM: true, },
                phone_1:{ required: false, phoneKM: true, },
                phone_2:{ required: false, phoneKM: true, },
            },
            messages: {
                name: {required: locale.value === 'km' ? km.message_er.name : en.message_er.name, minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2},
                company: { required: locale.value === 'km' ? km.message_er.company : en.message_er.company,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2 },
                position: { required: locale.value === 'km' ? km.message_er.position : en.message_er.position,minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2 },
                email: { email: locale.value === 'km' ? km.message_er.email : en.message_er.email, },
                phone: { required: locale.value === 'km' ? km.message_er.phone_1 : en.message_er.phone_1,
                         phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, 
                        },
                phone_1: { phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, },
                phone_2: { phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, },
            },
            submitHandler: () => {
                saveData()
            }
        });
        
    });
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
// ============= function input =============
const phoneErrors = ref([''])
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const data_input = {
        name: formData.name,
        company: formData.company,
        position: formData.position,
        'phone[0]': formData.phone[0],
        'phone[1]': formData.phone[1] != undefined ? formData.phone[1]:'',
        'phone[2]': formData.phone[2] != undefined ? formData.phone[2]:'',
        email: formData.email,
    }
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/references', {
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
        if(er.response && er.response.status === 403){
            errorShow.value = ''
            limiterrorShow.value = er.response._data
        }else{
            limiterrorShow.value = ''
            errorShow.value = er.data.errors
        }
        
        if(errorShow.value.email){
            $("#email").css('border', 'solid 1px red');
        }else{
            $("#email").css('border', 'solid 1px gray');
        }
        const key = 'phone[0]';
        const key1 = 'phone[1]';
        const key2 = 'phone[2]';
        if(errorShow.value[key]){
            $("#phone").css('border', 'solid 1px red');
        }else{
            $("#phone").css('border', 'solid 1px gray');
        }
        if(errorShow.value[key1]){
            $("#phone2").css('border', 'solid 1px red');
        }else{
            $("#phone2").css('border', 'solid 1px gray');
        }
        if(errorShow.value[key2]){
            $("#phone3").css('border', 'solid 1px red');
        }else{
            $("#phone3").css('border', 'solid 1px gray');
        }

        // if(phoneErrors.value){
        //     $("#phone").css('border', 'solid 1px red');
        // }
    })
}
</script>
