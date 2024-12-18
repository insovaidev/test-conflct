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
                    {{$t(`account_t.billing_address`)}}
                </p>
            </div>
        </div>
      </header>

      <main :class="mobileDevice ? 'py-5 ' : 'main_min_height mt_80'">
            <div class="max_width_form">
                <div class="position-relative" >
                    <!-- Loading -->
                    <div v-if="isLoading===true" class="custom_spinner main_min_height">
                        <span class="loader"></span>
                    </div> 
                    <div v-else-if="errorData.status !== null">
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
                        <div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2 px-3': 'px-3 membership_banner_store_not_found_mobile'" >
                            <div class="membership_banner_store_not_found_icon">
                                <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                            </div>  
                            <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                            <span class="error_message mb-5">{{ errorData.message }}</span>
                            <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="retry">{{$t(`account_t.retry`)}}</button>
                        </div>
                    </div> 
                    <div v-else class="px-3" :class="mobileDevice ? 'py-3' : ''" >
                        <div v-if="myAddress.data">
                            <h1 v-if="!mobileDevice" class="fw-semibold fs-5 mb-3">{{$t(`account_t.billing_address`)}} </h1>
                            <div :key="add" v-for="add in myAddress.data" :class="route.query.change_address ? 'overide_cursor_pointer' : ''">
                                <div @click="route.query.change_address ? selectAddress(add) : ''"  class="billing_address_card">
                                    <div v-if="add.is_default" class="billing_address_default_status">
                                        <span>{{$t(`account_t.default`)}}</span>
                                    </div>
                                    <div class="billing_address_wrapper" :class="{'pt-3' : add.is_default}">
                                        <div v-if="route.query.change_address" class="billing_address_radio">
                                            <input type="radio" :checked="add.id === chooseAddress.id" /> 
                                        </div>
                                        <div>
                                            <div class="billing_address_title">
                                                <p class="mb-2">{{ add.label }}</p>
                                            </div>
                                            <div class="billing_address_detail">
                                                <div v-if="add.name" class="d-flex align-items-start  checkout_address_title_field _mb_4">
                                                <i class="bi bi-person-circle text-secondary"></i>
                                                <span class="">{{ add.name ? add.name : '' }}</span>
                                                </div>
                                                <div v-if="add.company" class="d-flex align-items-start  checkout_address_title_field _mb_4">
                                                    <i> <img class="_i pb-1 ml_-2" src="/icon/skyline.png" alt="" width="18px"> </i>
                                                    <span class="">{{ add.company ? add.company : '' }}</span>
                                                </div>
                                                <div v-if="add.tax_id" class="d-flex align-items-start  checkout_address_title_field _mb_4">
                                                    <i> <img class="_i pb-1 ml_-2" src="/icon/taxes.png" alt="" width="18px"> </i>
                                                    <span class="my_truncate_wrap_signle_line">{{ add.tax_id ? add.tax_id : '' }}</span>
                                                </div>
                                                <div v-if="add.phone" class="d-flex align-items-start checkout_address_title_field _mb_4">
                                                    <i class="bi bi-telephone-fill text-secondary"></i>
                                                    <p class="mb-0"> {{ add.phone.join(', ')}}</p>
                                                </div>
                                                <div v-if="add.email" class="d-flex align-items-center checkout_address_title_field _mb_4">
                                                    <i class="fa fa-envelope text-secondary"></i>
                                                    <span class="my_truncate_wrap_signle_line">{{add.email?add.email:''}}</span>
                                                </div>                
                                                <div v-if="add.location" class="d-flex align-items-start checkout_address_title_field _mb_4">
                                                    <i class="bi bi-geo-alt-fill text-secondary"></i>
                                                    <span class="" >{{ locale == "km" ? add.location.km_name : add.location.en_name }}</span>
                                                </div>              
                                                <div v-if="add.address" class="d-flex align-items-start  checkout_address_title_field _mb_4">
                                                    <i class="bi bi-geo-alt-fill text-white"></i>
                                                    <span class="fw-light my_truncate_wrap_signle_line">{{ add.address ? add.address : '' }}</span>
                                                </div>
                                                <div v-if="add.map" class="mt-1 d-flex align-items-start  checkout_address_title_field cusor">
                                                    <i class="bi bi-geo-alt-fill text-white"></i>
                                                    <span @click="show_map(add.map)" class="k2-primary text-primary text-capitalize mb-0">{{$t(`account_t.get_location`)}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!mobileDevice"  @click="clickChild(add.id, $event)" class="billing_address_toggle_modal btn-group">
                                        <button type="button" data-bs-toggle="dropdown" class="dropdown_toggle_custom address_dropdown_toggle_custom_position dropdown-toggle"  aria-expanded="false">
                                            <i class="bi bi-three-dots-vertical _center"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end" :id="'dropdownmenu'+add.id"> 
                                            <li><a class="dropdown-item cursor-pointer" role="button" @click="storeData(add.id), redirectToEditAdress(add.id, $event)">{{$t(`account_t.edit`)}}</a></li>
                                            <li v-if="!add.is_default" class="dropdown_item_delete"><a class="dropdown-item cursor-pointer" role="button" @click="showComfirmDeleteAddress(add.id)">{{$t(`account_t.delete`)}}</a></li>
                                        </ul>
                                    </div>
                                    <button v-else type="button" @click="address = add, $event.stopPropagation()" data-bs-toggle="modal" data-bs-target="#billingAddressModal" class="dropdown_toggle_custom address_dropdown_toggle_custom_position dropdown-toggle" >
                                        <i class="bi bi-three-dots-vertical _center"></i>
                                    </button>
                                </div>  
                            </div>

                             <!-- Desktop View -->
                            <!-- Add address -->
                            <div v-if="!mobileDevice && !route.query.change_address" class="billing_address_footer_botton_wrapper_not_fix mt-3">
                                <div class="billing_address_footer_botton_wrapper_not_fix">
                                    <button type="button" @click="router.push(localePath({ name: 'account-billing-addresses-add'}))" class="btn form-control-lg btn-xm btn-k24-secondary billing_address_footer_botton">
                                        <i class="bi-plus-circle-fill"></i> {{$t(`account_t.add_address`)}}
                                    </button>
                                </div>
                            </div>

                            <!-- Apply Change address  -->
                            <div v-if="!mobileDevice && route.query.change_address" class="billing_address_footer_botton_wrapper_not_fix d-flex justify-content-between gap-2 p-3 bg-white" :class="!mobileDevice ? 'rounded-1' : ''">
                                <button @click="router.back()" type="button" class="btn form-control-lg btn-xm overide_nuxt_link_style billing_address_footer_botton _light_border billind_add_cancel_btn">{{ $t('account_t.cancel')}}
                                </button>
                                <button @click="applySelectAddress()" type="button" class="btn form-control-lg btn-xm btn-k24-primary overide_nuxt_link_style w-100" >{{ $t('new_text.apply')}}</button>
                                <button @click="router.push(localePath({ name: 'account-billing-addresses-add' }))" type="button" class="btn form-control-lg btn-xm btn-k24-secondary overide_nuxt_link_style add_address_btn"> <i class="bi bi-plus-circle-fill"></i></button>
                            </div>
            
                            <!-- Mobile View -->
                            <!-- Add address -->
                            <div v-if="mobileDevice && !route.query.change_address" class="billing_address_footer_botton_wrapper">
                                <button type="button" @click="router.push(localePath({ name: 'account-billing-addresses-add'}))" class="btn form-control-lg btn-xm btn-k24-secondary overide_nuxt_link_style billing_address_footer_botton">
                                    <i class="bi-plus-circle-fill"></i> {{$t(`account_t.add_address`)}}
                                </button>
                            </div>
                            
                            <!-- Apply Change address -->
                            <div v-if="mobileDevice && route.query.change_address" class="billing_address_footer_botton_wrapper d-flex justify-content-between gap-2">
                                <button @click="router.back()" type="button" class="btn form-control-lg btn-xm overide_nuxt_link_style billing_address_footer_botton _light_border billind_add_cancel_btn ">{{ $t('account_t.cancel')}}
                                </button>
                                <button @click="applySelectAddress()" type="button" class="btn form-control-lg btn-xm btn-k24-primary overide_nuxt_link_style w-100" >{{ $t('new_text.apply')}}</button>
                                <button @click="router.push(localePath({ name: 'account-billing-addresses-add' }))" type="button" class="btn form-control-lg btn-xm btn-k24-secondary overide_nuxt_link_style add_address_btn"> <i class="bi bi-plus-circle-fill"></i></button>
                            </div>
                       
                        </div>

                        <div v-else-if="defaultAdress == null">
                            <h1 v-if="!mobileDevice" class="fw-semibold fs-5 mb-3">{{$t(`account_t.billing_address`)}} </h1>
                            <NuxtLink :to="localePath({ name: 'account-billing-addresses-add'})">
                                <div class="account_subscription_detail_wrapper mormal_card position-relative">
                                    <div class="account_subscription_membership_profile">
                                        <div class="info_billing_address">
                                            <i class="bi bi-exclamation-lg"></i>
                                        </div>
                                        <div class="account_membership_profile_title">
                                            <p class="mb-0 account_membership_profile_title fw-bold">Opps!</p>
                                            <span>{{ $t('account_t.no_address_yet')}}</span>
                                        </div>
                                    </div>
                                    <div class="account_subscription_ungrade_link">
                                        <i class="svg bi bi-chevron-right"></i>
                                    </div>
                                </div>
                            </NuxtLink>
                            <!-- Desktop View -->
                            <!-- Add address -->
                            <div v-if="!mobileDevice && !route.query.change_address" class="billing_address_footer_botton_wrapper_not_fix mt-3">
                                <div class="billing_address_footer_botton_wrapper_not_fix">
                                    <button type="button" @click="router.push(localePath({ name: 'account-billing-addresses-add'}))" class="btn form-control-lg btn-xm btn-k24-secondary billing_address_footer_botton">
                                        <i class="bi-plus-circle-fill"></i> {{$t(`account_t.add_address`)}}
                                    </button>
                                </div>
                            </div>

                            <!-- Apply Change address  -->
                            <div v-if="!mobileDevice && route.query.change_address" class="billing_address_footer_botton_wrapper_not_fix d-flex justify-content-between gap-2 p-3 bg-white mt-3" :class="!mobileDevice ? 'rounded-1' : ''">
                                <button @click="router.back()" type="button" class="btn form-control-lg btn-xm overide_nuxt_link_style billing_address_footer_botton _light_border billind_add_cancel_btn">{{ $t('account_t.cancel')}}
                                </button>
                                <button @click="applySelectAddress()" type="button" class="btn form-control-lg btn-xm btn-k24-primary overide_nuxt_link_style w-100" >{{ $t('new_text.apply')}}</button>
                                <button @click="router.push(localePath({ name: 'account-billing-addresses-add' }))" type="button" class="btn form-control-lg btn-xm btn-k24-secondary overide_nuxt_link_style add_address_btn"> <i class="bi bi-plus-circle-fill"></i></button>
                            </div>
            
                            <!-- Mobile View -->
                            <!-- Add address -->
                            <div v-if="mobileDevice && !route.query.change_address" class="billing_address_footer_botton_wrapper">
                                <button type="button" @click="router.push(localePath({ name: 'account-billing-addresses-add'}))" class="btn form-control-lg btn-xm btn-k24-secondary overide_nuxt_link_style billing_address_footer_botton">
                                    <i class="bi-plus-circle-fill"></i> {{$t(`account_t.add_address`)}}
                                </button>
                            </div>
                            
                            <!-- Apply Change address -->
                            <div v-if="mobileDevice && route.query.change_address" class="billing_address_footer_botton_wrapper d-flex justify-content-between gap-2">
                                <button @click="router.back()" type="button" class="btn form-control-lg btn-xm overide_nuxt_link_style billing_address_footer_botton _light_border billind_add_cancel_btn ">{{ $t('account_t.cancel')}}
                                </button>
                                <button @click="applySelectAddress()" type="button" class="btn form-control-lg btn-xm btn-k24-primary overide_nuxt_link_style w-100" >{{ $t('new_text.apply')}}</button>
                                <button @click="router.push(localePath({ name: 'account-billing-addresses-add' }))" type="button" class="btn form-control-lg btn-xm btn-k24-secondary overide_nuxt_link_style add_address_btn"> <i class="bi bi-plus-circle-fill"></i></button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </main>
    </div>

    <!-- Modal Comfirm Delete -->
    <div class="modal fade" id="comfirmModal" tabindex="-1" aria-labelledby="comfirmModal">
        <div class="modal-dialog modal-dialog-centered mx-auto p-3 rounded-2" :class="mobileDevice ? 'vh-100' : '' "> 
            <div class="modal-content rounded-2">
            <div class="modal-header comfirm_modal_header">
                <h1 class="modal-title comfirm_modal-title" id="exampleModalLabel">{{   $t('account_t.comfirm_delete_address') }}</h1>
            </div>
                <div class="modal-footer comfirm_modal-footer">
                    <button type="button" class="bg-transparent border-0 mr-2" @click="hideModals(['#comfirmModal'])">{{ $t('account_t.cancel') }}</button>
                    <button @click="deleteAddress(addressToDelete)" type="button"  class="bg-transparent border-0 text-danger">{{ $t('account_t.yes') }}</button>
                </div>
            </div>
        </div>
    </div>      
    
    <div class="modal fade" id="billingAddressModal" tabindex="-1" aria-labelledby="billingAddressModal" aria-modal="true" role="dialog">
        <div class="modal-dialog mobile_modal_dialog modal-fullscreen"> 
            <div class="modal-content p-2 pb-3 mobile_modal_content">
                <div class="mobile_modal_action_reduce d-flex flex-column mb-0 p-0">
                    <div class="list_action bg-white p-1">
                        <button @click="storeData(address.id), redirectToEditAdress(address.id, $event)" type="button" class="text-primary">{{$t(`account_t.edit`)}}</button>
                        <hr v-if="!address.is_default" class="m-0">
                        <button class="delete" v-if="!address.is_default" @click="showComfirmDeleteAddress(address.id)" type="button"> {{$t(`account_t.delete`)}} </button>
                    </div>
                    <div class="canel_action mt-2 bg-white">
                        <button class="mobile_modal_cencel_btn" data-bs-dismiss="modal" type="button">{{$t(`account_t.cancel`)}}</button>
                    </div>
                </div>
            </div>
        </div>  
    </div>  

    <!-- My Toast -->
    <div class="toast_wrapper">
        <div id="successToast" class="ov_renew_success_toast toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
            <div class="d-flex">
                <div class="toast-body d-flex gap-2 align-items-center">
                    <span class="toast_success_icon"><i class="bi bi-check-circle-fill"></i></span>
                    <span>{{ successData.message }}</span>
                </div>
            </div>
        </div>
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

    <!-- 403 / 404 Modal -->
    <div class="modal fade" id="failModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="Label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mx-auto" :class="mobileDevice ? 'vh-100' : '' ">
        <div class="modal-content rounded-4" :class="mobileDevice ? 'fail_modal_content' : 'fail_modal_content_desktop'" >
          <div class="modal-header d-flex justify-content-center py-3 border-1">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ $t(`account_t.problem_occurs`)}}</h1>
          </div>
          <div class="modal-body py-2 " :class="mobileDevice ? 'overflow-y-scroll overflow-x-hidden' : ''" >
            <p class="text-center">{{ deleteResponse.message ? deleteResponse.message : '' }}</p>
          </div>
          <div class="modal-footer d-flex justify-content-center py-1">
            <button type="button" class="btn" data-bs-dismiss="modal">{{ $t(`account_t.close`)}}</button>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup>
definePageMeta( {layout: "custom", middleware: "auth"} ); 
import helper from "/helper";
const language = ref(helper.get_lang_cookie());
const route = useRoute()
const router = useRouter()
const { locale } = useI18n();
const mobileDevice = ref(helper.m_or_d())
const localePath = useLocalePath();
const runtime_config = useRuntimeConfig();  
const config = runtime_config.public
const asset_url = '/'
const version_library = config.LIBRARY_VERSION
const isLoading = ref('')
const user_data = ref('');
const isDesktop = ref(true);
const attemptRequest = ref(0)
const defaultAdress = useState('defaultAdress', () => '')
const myAddress = useState('myAddress', () => "")
const data_edit = useCookie('data_edit')
const addressSelected = useState('addressSelected', () => '')
const data1 = ref('');
const data2 = ref('');
const addressToDelete = ref("")
const address = ref('')
const successData = reactive({ message: null, status: null })
const chooseAddress = reactive({'id': '', 'add': ''})
const isLoadingButton = ref(null)
const errorData = reactive({status: null, message: null, code: null, type: null})
const featureBillingAddress = ref('')
const deleteResponse = reactive({message: null})

useHead({
    title: 'Billing Address - Khmer24.com', 
    meta: [
        // -- seo page --
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: 'Billing Address - Khmer24.com' },
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

onBeforeUnmount(() => {
    hideModals(['#billingAddressModal', '#comfirmModal', 'modal_show_status_error_connection'])
})

onMounted(() => {
    if(process.client) {
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop.value ? 'auth-login' : 'auth' })); };
        check_new_auth_user()
        if(featureBillingAddress.value == true) {
            getMyAddress()
        }
        data_edit.value = ''
    }
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

async function retry() {
    await getMyAddress()
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

function hideModals(modalSelectors) {
  // Hide modals using provided selectors
  modalSelectors.forEach(selector => {
      $(selector).modal('hide');
  });
}

async function check_new_auth_user() { 
    user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
    const paymentSettings = user_data.value?.user?.setting?.payment ?? [];
    if(paymentSettings.length && paymentSettings.includes('billing_address')) {
        errorData.status = null
        featureBillingAddress.value = true
    } else {
        errorData.status = 503
        featureBillingAddress.value = false
    }
} 

async function getMyAddress () {
    isLoading.value = true
    await clearError()
    await check_new_auth_user()
    try {
        
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/addresses?storeid=0&lang=${locale.value}`, { 
            retry: 2, 
            retryDelay: 3000, 
            method: "GET", 
            headers: { "Access-Token": user_data.value.tokens.access_token } 
        })
        
        if(response) {
            myAddress.value = response
            defaultAdress.value = response.default ? response.default : null
            if(!addressSelected.value) {
                 addressSelected.value = defaultAdress.value ? defaultAdress.value.id : ''
            }
            chooseAddress.id = addressSelected.value
        }

        isLoading.value = false

    } catch (error) {

        if (!error.response) {
            errorData.status = 500 
            isLoading.value = false
        }
        else if (error.response && error.response.status === 401) {
            if(attemptRequest.value < 2) {
                attemptRequest.value += 1
                setTimeout(() => { getMyAddress() }, 3000);
            } else {
                localStorage.removeItem('auth_user')
                router.replace(localePath({ name: 'index' }))  
                isLoading.value = false
            }  
        } else {
            errorData.status = error.response?.status ?? null
            errorData.type = error.response?._data?.type ?? null
            errorData.message = error.response?._data?.message ?? null
            errorData.code = error.response?._data?.code ?? null
            isLoading.value = false
        }

    } 
}

function selectAddress(add) {
    chooseAddress.id = add.id
    chooseAddress.add = add
}

function applySelectAddress() {
    if(chooseAddress.add) {
        addressSelected.value = chooseAddress.id
        defaultAdress.value = chooseAddress.add
    } 
    router.back()
}

const redirectToEditAdress = (id, event) => {
    event.stopPropagation()
    $('#billingAddressModal').modal('hide')
    router.push(localePath({ name: 'account-billing-addresses-edit', query: {'id': id}}))
}

function showComfirmDeleteAddress(id) {
    addressToDelete.value = id
    $('#comfirmModal').modal('show')
    $('#billingAddressModal').modal('hide')
}

const deleteAddress = (id) => {
    check_new_auth_user()
    $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/addresses/${id}?lang=${locale.value}`, { 
        method: "DELETE",
        retry: 2, 
        retryDelay: 3000,  
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": user_data.value.tokens.access_token }
    })
    .then((res) => {
        myAddress.value = ''
        addressSelected.value = ''
        getMyAddress()
        $('#billingAddressModal').modal('hide')
        $('#comfirmModal').modal('hide')
        successData.message = res.message? res.message : '' 
        $('#successToast').show()
        setTimeout(function() { $('#successToast').hide() }, 2000);
    })
    .catch((error) => {
        $('#comfirmModal').modal('hide')
        if (!error.response) {
            $('#modal_show_status_error_connection').modal('show')
            isLoading.value = false
        }
        else if (error.response && error.response.status === 401) {
            if(attemptRequest.value < 2) {
                attemptRequest.value += 1
                setTimeout(() => { deleteAddress() }, 3000);
            } else {
                localStorage.removeItem('auth_user')
                router.replace(localePath({ name: 'index' }))  
                isLoading.value = false
            }          
        } else if (error.response && error.response.status === 404) {
            deleteResponse.message = error?.response?._data?.message || null
            $('#failModal').modal('show')
            isLoading.value = false
            return
        } else {
            errorData.status = error.response?.status ?? null
            errorData.type = error.response?._data?.type ?? null
            errorData.message = error.response?._data?.message ?? null
            errorData.code = error.response?._data?.code ?? null
            isLoading.value = false
        }
    })
}

const storeData = (id) => {
    const dataAddress = Array.isArray(myAddress.value?.data) && myAddress.value.data.length ? myAddress.value.data : [] 
    dataAddress.forEach((v) => {
        if(v.id == id) { 
            return data_edit.value = v 
        }
    })
}

function show_map(map_) {
        event.stopPropagation();
        map_.forEach((val,index) => {           
            if(index === 0){
                data1.value= val
            }
            if(index === 1){
                data2.value= val
            }
            let zoon = 15
            if(index === 1){
                let routeData = 'https://maps.google.com/maps?q='+data1.value+','+data2.value+'&amp;'+zoon+'';
                window.open(routeData, '_blank');
            }
        });
}

function removeDropdownMenusExcept(exceptId) {
    // Select all elements with ID pattern matching 'dropdownmenu'
    const dropdownMenus = document.querySelectorAll('[id^="dropdownmenu"]');
    
    dropdownMenus.forEach((menu) => {
        if (menu.id !== exceptId) {
            menu.classList.remove('show');
        }
    });
}

function clickChild(id, event) {
    removeDropdownMenusExcept('dropdownmenu'+id)
    // Prevent propagation to parent
    event.stopPropagation();
}
 

</script>