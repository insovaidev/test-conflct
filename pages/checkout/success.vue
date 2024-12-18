<template>
       <div :class="!mobileDevice ? 'screen-content-desktop' : ''">
           <header v-if="mobileDevice" class="col no_padding fix_app_bar">
              <div class="_div_nav bg_app_bar_header_">
                  <div class="col pl-0 l_h_con_title">
                      <p class="name_style truncate_wrap mb-0 ml-2 text-center">
                         {{ locale == 'km' ? 'ទូរទាត់ជោគជ័យ' : ' Checkout Success'  }}
                      </p>
                  </div>
              </div>
          </header>  
          <div class="max_width_form checkout-success-min-vh mt-6" >
              <div v-if="isLoading" class="custom_spinner " :class="mobileDevice ? 'd-block main_min_height' : ''">
                  <span class="loader"></span>
              </div>
              <div v-else class="position-relative mt_80" :class="!mobileDevice ? 'px-5' : 'pt-3'">
                <div v-if="errors.status" >
                     <!-- Error -->
                    <div  :class="!mobileDevice ? 'px-3 pt-2' : ''">
                        <div v-if="errors.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                            <div class="service_unavailable_icon mb-5">
                                <i class="bi bi-cloud-fill"></i>
                                <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                            </div>
                            <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                            <p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                            <button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
                            <button v-else type="button" @click="submitPayment"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                        </div>
                        <!-- Error conntection or API not response -->
                        <div v-else-if="errors.status === 500">
                            <div class="col no_padding">
                                <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                        <button @click="submitPayment" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="membership_banner_store_not_found" :class="isDesktop ? 'rounded-2 px-3': 'membership_banner_store_not_found_mobile px-3 pt-5 pb-5'" >
                            <div class="membership_banner_store_not_found_icon mb-4">
                                <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                            </div>  
                            <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                            <span class="error_message mb-5">{{ errors.message }}</span>
                            <button type="button"  @click="handleRedirect"  class=" form-control btn-lg btn-k24-primary mt-5 mx-auto text-capitalize" :class="mobileDevice ? '' : 'w-50'" > {{ errors.status == 400 ? $t(`account_t.back_to_acc`) : $t(`account_t.retry`) }}</button>
                        </div>
                    </div>
                </div>
                <div v-else-if="submitPayResponse && submitPayResponse.message" >
                    <div class="success-checkout-container" :class="mobileDevice ? 'px-3 pb-3 pt-5' : 'checkout-success-desktop-peding'" >
                        <div class="success-checkout-icon mb-4 mx-auto"><i class="bi bi-check2 checkout_congratulations_modal_success_icon"></i></div>
                        <div class="success-checkout-info">
                            <h1>{{ locale == 'km' ? 'គម្រោងបានជោគជ័យ!' : 'Subscription successful!'  }}</h1>
                            <p class="mb-4">{{  submitPayResponse.message ?? '' }}</p>
                            <template v-if="submitPayResponse.items && submitPayResponse.items.length > 0">
                                <h2 class="mb-2">{{ locale == 'km' ? 'គម្រោងលម្អិត' : 'Subscription Details'}}:</h2> 
                                <div class="success-checkout-details">
                                    <div v-for="item in submitPayResponse.items" class="success-checkout-details-item">
                                        <p class="mb-1 type">{{ $t(`account_t.${item.type}_id`) }}: {{ item.id ?? '' }}</p>   
                                        <p class="mb-1">{{ $t(`account_t.plan`) }}: {{ item.plan_title ?? '' }}</p>   
                                        <p class="mb-1">{{$t(`account_t.valid_until`) }}: {{ forMatDate(item.end_date) }}</p>    
                                    </div>
                                </div>
                            </template>
                        </div>
                        <button type="button" @click="redirectToAccount()" class=" form-control btn-lg btn-k24-primary mt-5 mx-auto text-capitalize" :class="mobileDevice ? '' : 'w-50'" >{{$t(`account_t.back_to_acc`)}}</button>
                    </div>
                </div>
              </div>
          </div>
       </div>
</template>

<script setup lang="js" > 

definePageMeta({ layout: "custom", middleware: "auth" });

import helper from "/helper";
const { locale } = useI18n();
const runtime_config = useRuntimeConfig();  
const config = runtime_config.public
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const { isDesktop } = useDevice()
const mobileDevice = ref(helper.m_or_d())
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const auth = ref('');
const isLoading = ref(true)
const errors = reactive({ status: null, message: null })
const submitPayResponse = reactive({ 'status': null, 'message': null, items: null })

useHead({
    title: 'Checkout Success - Khmer24.com', 
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },
        { property: 'og:title', content: 'Checkout Success - Khmer24.com' },
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

async function submitPayment() {

    const orderId = route.query.id ?? null

    if (!orderId) return router.push(localePath({ name: 'account'}))
    
    isLoading.value = true
    errors.status = null
    errors.message = null

    try {

        const paymentForm  = new URLSearchParams({
            'order_id': orderId
        })
     
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}payment/pay?lang=${locale.value}`, { 
            retry: 2, 
            retryDelay: 3000, 
            method: "POST", 
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token }, 
            body: paymentForm
        })

        if(response) {
            if (response.status == 'awaiting_payment') {
                setTimeout(function () { submitPayment() }, 3000); 
            } else {
                submitPayResponse.status =  response?.status ?? null
                submitPayResponse.message =  response?.message ?? null
                submitPayResponse.items =  response?.data?.items ?? []
                isLoading.value = false    
            }
        }
    } catch (error) {
        if(!error.response) {
            errors.status = 500
        } else {
            errors.status = error.response.status
            errors.message = error.response._data.message ||  'Fail sumbmit payment'   
        }
        isLoading.value = false
    } 
}

function redirectToAccount() {
    if (route.query.storeid) {
        return router.push(localePath({ name: 'account-store-id', params: {'id': route.query.storeid }}))
    } else {
        return router.push(localePath({ name: 'account'}))
    }
}

function handleRedirect() { 
    if (errors.status == 400) {
        if (route.query.storeid) { 
            router.push(localePath({ name: 'account-store-id' , params: { id: route.query.storeid}}))  
        } else {
            router.push(localePath({ name: 'account' }))  
        }
    } else {
        submitPayment() 
    }
}

onMounted(() => {
    auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''
    if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); }
    submitPayment()
})

</script>

