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
                        {{$t(`account_t.review_subscription`)}}
                    </p>
                </div>
            </div>
        </header>    
        <main :class="mobileDevice ? 'pt-5' : 'main_min_height mt_80'">
            <!-- Loading -->
            <div v-if="isLoading" class="custom_spinner " :class="mobileDevice ? 'main_min_height' : ''">
                <span class="loader"></span>
            </div>
            <div v-else class="max_width_form position-relative" :class="mobileDevice ? 'pb-5' : ''"> 
                <!-- Error -->
                <div  :class="!mobileDevice ? 'px-3 pt-2' : ''" v-if="errorData.status !== null">
                    <div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                        <div class="service_unavailable_icon mb-5">
                            <i class="bi bi-cloud-fill"></i>
                            <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                        </div>
                        <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                        <p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                        <button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
                        <button v-else type="button" @click="getPaymentInfo"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                    </div>
                    <!-- Error conntection or API not response -->
                    <div v-else-if="errorData.status === 500">
                        <div class="col no_padding">
                            <div class="no_more_result p-2">
                                <div class="p_bg_status">
                                    <span class="fas fa-wifi size_icon_status"></span>
                                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                    <button @click="getPaymentInfo" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="membership_banner_store_not_found" :class="isDesktop ? 'rounded-2 px-3': 'membership_banner_store_not_found_mobile px-3 pt-5 pb-5'" >
                        <div class="membership_banner_store_not_found_icon mb-4">
                            <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                        </div>  
                        <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                        <span class="error_message mb-5">{{ errorData.message }}</span>
                        <button type="button"  :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="getPaymentInfo">{{$t(`account_t.retry`)}}</button>
                    </div>
                </div>
                <!-- Display result -->
                <div v-else :class="mobileDevice ? 'pb-5': ''" class="position-relative">
                    <!-- Subscription -->
                    <section v-show="cardCalData.items"  class="checkout_subscription_wrapper" :class="!mobileDevice ? 'rounded-1' : ''">
                        <p class="checkout_subscription_title">{{$t(`account_t.subscription`)}}</p>
                        <div v-for="item in cardCalData.items" :key="item" class="checkout_subscription_detail_wrapper" :class="cardCalData.items.length > 1 ? 'checkout_subscription_detail_wrapper_item' : ''">
                            <div class="checkout_subscription_detail">
                                <div class="checkout_subscription_detail_image">
                                    <img class="" :src="item?.photo?.medium?.url ?? asset_url+version_library+'img/empty_post.png'" alt="" :onerror="emptyImage" />
                                </div>
                                <div class="checkout_subscription_detail_text mb-0">
                                    <p class="checkout_subscription_detail_type _mb_2 my_truncate_wrap_signle_line" :class="mobileDevice ? 'checkout_subscription_detail_type_width' : ''">{{ item.title ? item.title : ''}}</p>
                                    <p class="_mb_2">{{ $t(`account_t.${item.type}_id`)}} {{ item?.id ?? '' }}</p>
                                    <p class="_mb_2">{{ item?.plan_title ?? '' }}</p>
                                    <p class="_mb_2">{{ $t(`account_t.valid_until`)}} {{ item.end_date ? forMatDate(item.end_date, locale) : '' }}</p> 
                                    <p class="mb-0 checkout_subscription_detail_price">
                                        <span v-if="item.sale_price" class="mr-1">${{ item.sale_price ? formatAmount(item.sale_price) : '' }}</span>
                                        <span v-if="item.discount > 0" class="checkout_subscription_detail_discount_amount mr-1">-{{ item.discount_type == 'amount' ? item.discount_amount : item.discount }}{{ item.discount_type == 'amount' ? '$ ' : '% '}}</span>
                                        <span v-if="item.discount > 0" class="checkout_subscription_detail_old_price fw-normal">{{ item.price ? '$' + formatAmount(item.price) : ''}}</span>
                                    </p>
                                </div>
                            </div>
                            <div v-if="!mobileDevice" class="btn-group">
                                <button type="button" class="dropdown_toggle_custom dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical _center"></i></button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a @click="cardCal = item, changePlan()" role="button" class="dropdown-item cursor-pointer">{{$t('account_t.change')}}</a></li>  
                                </ul>
                            </div>
                            <button v-else @click="cardCal = item" class="dropdown_toggle_custom checkoout_dropdown_toggle_custom_postion" type="button" data-bs-toggle="modal" data-bs-target="#changePlanModal"><i class="bi bi-three-dots-vertical _center"></i></button>
                        </div>
                    </section>
                    <!-- Address selected -->
                    <NuxtLink v-if="addresses" :to="localePath({ name: 'account-billing-addresses', query: { 'change_address': true } })">
                        <div class="checkout_address_wrapper "  :class="!mobileDevice ? 'rounded-1' : ''">
                            <p class="checkout_address_title my_truncate_wrap_signle_line">{{$t(`account_t.billing_address`)}}: {{  address.label }}</p>
                            <div class="_mb_16">
                                <div v-if="address.name" class="d-flex align-items-start checkout_address_detail_user checkout_address_title_field _mb_6">
                                    <i class="bi bi-person-circle text-secondary"></i>
                                    <span class="">{{ address.name ? address.name : '' }} </span>
                                </div>
                                <div v-if="address.company" class="d-flex align-items-start checkout_address_detail_user checkout_address_title_field _mb_6">
                                    <i> <img class="_i pb-1 ml_-2" src="/icon/skyline.png" alt="" width="18px"> </i>
                                    <span class="">{{ address.company ? address.company : '' }} </span>
                                </div>
                                <div v-if="address.tax_id" class="d-flex align-items-start checkout_address_detail_user checkout_address_title_field _mb_6">
                                    <i> <img class="_i pb-1 ml_-2" src="/icon/taxes.png" alt="" width="18px"> </i>
                                    <span class="my_truncate_wrap_signle_line">{{ address.tax_id ? address.tax_id : '' }} </span>
                                </div>
                                <div v-if="address.phone" class="d-flex align-items-center checkout_address_detail_phone_number checkout_address_title_field _mb_6">
                                    <i class="bi bi-telephone-fill text-secondary"></i>
                                    <span class="d-flex align-content-start" v-for="(ph,index) in address.phone" :key="ph"><div class="mr-1" v-if="index > 0">,</div>{{ ph }} </span>
                                </div>
                                <div v-if="address.email" class="d-flex align-items-center checkout_address_detail_address_location checkout_address_title_field _mb_6" :class="address.map && address.map.length ? 'w-75' : ''">
                                    <i class="fa fa-envelope text-secondary"></i>
                                    <span class="my_truncate_wrap_signle_line">{{address.email?address.email:''}} </span>
                                </div>                
                                <div v-if="address.location" class="d-flex align-items-start checkout_address_detail_address_location checkout_address_title_field _mb_6" :class="address.map && address.map.length ? 'w-75' : ''">
                                    <i class="bi bi-geo-alt-fill text-secondary"></i>
                                    <span class="" >{{ locale == "km" ? address.location.km_name : address.location.en_name }} </span>
                                </div>
                                <div v-if="address.address" class="d-flex align-items-start checkout_address_detail_address_location checkout_address_title_field" :class="address.map && address.map.length ? 'w-75  _mb_6' : 'mb-0'">
                                    <i class="bi bi-geo-alt-fill text-white"></i>
                                    <span class="fw-light my_truncate_wrap_signle_line" >{{ address.address ? address.address : '' }} </span>
                                </div>
                                <div v-if="address.map && address.map.length" class="checkout_address_detail_address_map_image_container mb-0">
                                    <img :src="asset_url+version_library+'img/map_image.jpg'" alt="" width="70" height="70"/>
                                </div>
                            </div>
                            <button type="button" :class="!mobileDevice ? 'form-control-lg' : 'form-control-xm'" class="btn form_control flex align-items-center w-100 btn-xm  btn-k24-primary-light checkout_address_change_address_button">{{$t(`account_t.change_address`)}}<i class="bi bi-chevron-right"></i></button>
                        </div>
                    </NuxtLink>
                    <!-- Add address -->
                    <NuxtLink v-if="addresses==null" :to="localePath({ name: 'account-billing-addresses-add'})" :class="!mobileDevice ? 'rounded-1' : ''">
                        <div class="checkout_address_wrapper ">
                            <p class="checkout_address_title _mb_12">{{$t(`account_t.billing_address`)}} <span class="text-danger">*</span></p>
                            <p class="no_address_description _mb_16">{{$t(`account_t.no_address_yet`)}}</p> 
                            <button type="button" :class="!mobileDevice ? 'form-control-lg' : 'form-control-xm'" class="btn form_control flex align-items-center w-100 btn-xm btn-k24-primary-light checkout_address_change_address_button"> <i class="bi-plus-circle-fill"></i> {{$t(`account_t.add_address`)}}</button>
                        </div>
                    </NuxtLink>
                    <!-- Payment methoad -->
                    <section v-if="defaultPaymentMethoad" class="checkout_payment_wrapper" :class="!mobileDevice ? 'rounded-1' : ''">
                        <p class="checkout_payment_title" >{{$t(`account_t.payment_metods`)}}</p>
                        <div class="checkout_payment_detail">   
                            <div class="d-flex align-items-center">
                                <div class="checkout_payment_detail_icon_wrapper">
                                    <img :src="asset_url+version_library+'img/dollar.jpg'" alt="" width="80" height="80" />
                                </div>
                                <p class="mb-0 checkout_payment_detail_title">{{  defaultPaymentMethoad ? defaultPaymentMethoad.title : '' }}</p>
                            </div>
                            <span class="mb-0 checkout_payment_check_icon"><i class="bi bi-check-circle-fill"></i></span>
                        </div>
                    </section>
                    <!-- Summary -->
                    <section v-if="cardCalData && cardCalData.payment" class="checkout_summary_wrapper" :class="!mobileDevice ? 'rounded-1' : ''">
                        <div class="checkout_summary_title">
                            <p class="mb-2">{{$t(`account_t.summary`)}}</p>
                        </div>
                        <div class="checkout_summary_wrapper_price">
                            <div class="checkout_summary_price _mb_4">
                                <p class="mb-0 checkout_summary_price_title">{{$t(`account_t.subtotal`)}}</p>
                                <p class="mb-0 checkout_summary_price_amount">${{ cardCalData.payment ? formatAmount(cardCalData.payment.subtotal) : ''}}</p>
                            </div>
                            <div class="checkout_summary_price _mb_4">
                                <p class="mb-0 checkout_summary_price_title">{{$t(`account_t.discount`)}}</p>
                                <p class="mb-0 checkout_summary_price_amount">${{ cardCalData.payment ? formatAmount(cardCalData.payment.discount) : ''}}</p>
                            </div>
                            <div class="checkout_summary_price">
                                <p class="mb-0 checkout_summary_price_title">{{$t(`account_t.vat`)}}</p>
                                <p class="mb-0 checkout_summary_price_amount">${{cardCalData.payment ? formatAmount(cardCalData.payment.vat_amount) : ''}}</p>
                            </div>
                        </div>
                    </section>
                    <!-- Button Checkout -->
                    <div v-if="cardCalData && cardCalData.payment">
                        <div v-if="mobileDevice">
                            <div class="checkout_button_footer_wrapper" :class="!mobileDevice ? 'rounded-1' : ''">
                                <div class="checkout_total_summary">
                                    <div class="checkout_total_summary_left">
                                        <p class="mb-0 checkout_total_summary_title">{{$t(`account_t.total`)}}</p>
                                        <p class="mb-0 checkout_total_summary_vat">({{$t(`account_t.vat_total`)}})</p>
                                    </div>
                                    <div class="checkout_total_summary_right">
                                        <p class="mb-0 checkout_total_summary_price">${{ cardCalData.payment ? formatAmount(cardCalData.payment.total) : ''}}</p>
                                    </div>
                                </div>
                                <button type="submit" @click="submitCheckout()" class="btn form-control-lg btn-xm btn-k24-secondary checkout_fotter_button_checkout_wrapper">{{$t(`account_t.checkout`)}}</button>
                            </div>
                        </div>
                        <div v-if="!mobileDevice" >
                            <div class="p-3 bg-white" :class="!mobileDevice ? 'rounded-1' : ''">
                                <div class="checkout_total_summary">
                                    <div class="checkout_total_summary_left">
                                        <p class="mb-0 checkout_total_summary_title">{{$t(`account_t.total`)}}</p>
                                        <p class="mb-0 checkout_total_summary_vat">({{$t(`account_t.vat_total`)}})</p>
                                    </div>
                                    <div class="checkout_total_summary_right">
                                        <p class="mb-0 checkout_total_summary_price">${{ cardCalData.payment ? formatAmount(cardCalData.payment.total) : 0}}</p>
                                    </div>
                                </div>
                                <button type="submit" @click="submitCheckout()" class="btn form-control btn-lg text-white btn-k24-secondary checkout_fotter_button_checkout_wrapper">{{$t(`account_t.checkout`)}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </main>
    </div>

    <!-- Modal Change Plan -->
    <div class="modal fade account_renew_plan_modal" id="changePlanModal" tabindex="-1" aria-labelledby="changePlanModal" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen checkout_change_plan_modal_dialog" role="document">
            <div class="modal-content checkout_change_plan_modal_content">
                <div class="modal-body checkout_change_plan_modal_content_body">
                    <div class="checkout_dialog_button_change_plan">
                        <div class="checkout_dialog_button_change_plan_title_label checkout_dialog_button_flex">{{ $t('account_t.options') }}</div>
                        <button @click="changePlan()" class="checkout_dialog_button_change_plan_action checkout_dialog_button_flex" type="button">{{$t(`account_t.change_plan`)}}</button>
                    </div>
                    <button type="button" data-bs-dismiss="modal" class="checkout_dialog_button_cancel checkout_dialog_button_flex">{{$t(`account_t.cancel`)}}</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal Submit Success -->
    <div class="modal fade" id="checkout_congratulations_modal" tabindex="-1" aria-labelledby="checkout_congratulations_modal" aria-hidden="true" @click="redirectToAccount()">
        <div class="modal-dialog" :class="isDesktop ? 'modal-dialog-centered congrate_modal_dialog' : 'modal-fullscreen mobile_congrate_modal_dialog'">
            <div class="modal-content congrate_modal_cotent" :class="isDesktop ? 'congrate_modal_cotent' : 'mobile_congrate_modal_cotent'">
                <div class="check_icon position-relative">
                    <div v-if="!isDesktop" class="checkout_modal_header">{{$t(`account_t.checkout`)}}</div>
                    <div class="chek_icon_bouned checkout_congratulations_modal_success_wrapper flex"><i class="bi bi-check2 checkout_congratulations_modal_success_icon"></i></div>
                </div>
                <div class="checkout_message">
                    <h1>{{$t(`account_t.congratulation`)}}</h1>
                    <p>{{ submitPayResponse?.message ?? '' }}</p>
                </div>
                <button data-bs-dismiss="modal" type="button" @click="redirectToAccount()" class="back_account"><i class="bi bi-arrow-left"></i>{{$t(`account_t.back_to_acc`)}}</button>
            </div>
        </div>
    </div>

    <!-- 403 / 404 Modal -->
    <div class="modal fade" id="failModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content rounded-4 fail_modal_content">
            <div class="modal-header d-flex justify-content-center pt-4 pb-1 border-0">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ $t(`account_t.${errorData.type}`)}}</h1>
            </div>
            <div class="modal-body py-2">
                <p class="text-center">{{ errorData?.message ?? '' }}</p>
            </div>
            <div class="modal-footer d-flex justify-content-center py-1">
                <button type="button" class="btn" data-bs-dismiss="modal">{{ $t(`account_t.close`)}}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: "custom", middleware: "auth" });

import helper from "/helper";
const mobileDevice = ref(helper.m_or_d())
const language = ref(helper.get_lang_cookie());
const { locale } = useI18n();
const runtime_config = useRuntimeConfig();  
const config = runtime_config.public
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const emptyImage = `src='${asset_url}${version_library}img/empty_post.png'`
const { isDesktop } = useDevice()
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const auth = ref('');
const isLoading = ref(false)
const defaultAddressInit = ref('')
const address = ref('')
const addresses = ref('')
const addressSelected = useState('addressSelected', () => '') // the address while we click change address and apply.
const defaultPaymentMethoad = ref('')
const cardCalData = ref('')
const cardCal = ref('')
const submitPayResponse = reactive({ 'status': null, 'message': null })
const errorData = reactive({'type': null, 'message': null, 'code': null, 'status': null})
const isLoadingButton = ref(null)
const attemptRequest = ref(0)

useHead({
    title: 'Checkout - Khmer24.com', 
    meta: [
        // -- seo page --
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: 'Checkout - Khmer24.com' },
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

onMounted(() => {
    if (process.client) {
        check_new_auth_user()
        auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); }
        getPaymentInfo()
    }
})

onBeforeUnmount(() => {
    hideModals(['#changePlanModal', '#checkout_congratulations_modal', 'failModal'])
})

function hideModals(modalSelectors) {
  // Hide modals using provided selectors
  modalSelectors.forEach(selector => {
      $(selector).modal('hide');
  });
}

function check_new_auth_user() { 
    auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
}

async function changePlan() {
    $('#changePlanModal').modal('hide')
    const item = cardCal.value
    const actions = item?.actions ?? []
    const queryAd = {
        'id': item.id 
    }

    if (route.query.storeid) {
        queryAd['storeid'] = route.query.storeid 
    }
    
    if(actions.length && actions.includes('change')) {
        if(item.type == 'ads') {
            return router.push(localePath({ name: 'premium-ad-category', params: { category: item.category_type }, query: queryAd }))
        } else if(item.type == 'store') {
            return router.push(localePath({ name: 'premium-store', query: { 'category_change': item.category_type, 'id': item.id } }))
        } else {
            return router.push(localePath({ name: 'premium-account', query: { 'category_change': item.category_type, 'id': 'me'}}))
        }
    } else {
        if(item.type == 'ads') { 
            return router.push(localePath({ name: 'premium-ad-category', params: { category: item.category_type }, query: queryAd }))
        } else if(item.type == 'store') {
            return router.push(localePath({ name: 'premium-store-category', params: { category: item.category_type }, query: { 'id': item.id }}))
        } else {
            return router.push(localePath({ name: 'premium-account-category', params: { category: item.category_type }, query: { 'id': 'me' }}))
        }
    }
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

async function getAddress() {
    check_new_auth_user()
    await clearError()
    try {
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/addresses?storeid=0&lang=${locale.value}`, {
            retry: 2, 
            retryDelay: 3000, 
            method: "GET",
            headers: { "Access-Token": auth.value.tokens.access_token }
        }) 

        if(response) {
            defaultAddressInit.value = response.default ? response.default : null
            addresses.value = response.data && response.data.length ? response.data : null 
            if(addressSelected.value) {
                if(addresses.value && addresses.value.length) {
                    addresses.value.map((val) => {
                        if(val.id == addressSelected.value) {
                            address.value = val
                        } 
                    })
                }
            } else {
                address.value = defaultAddressInit.value
            }
            isLoading.value = false 
        }
    } catch (error) {
        if(!error.response) {
            errorData.status = 500
            isLoading.value = false
        } else {
            if (error.response && error.response.status === 401) { 
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { getAddress() }, 3000);
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
}

async function getPaymentInfo() {

    const cartData = localStorage.getItem('cart_data') ? JSON.parse(localStorage.getItem('cart_data')) : null
    
    if(cartData === null) {
        return router.back() 
    }
    
    await clearError()
    check_new_auth_user()
    isLoading.value = true
    try {
        const cartForm = new FormData()
        cartForm.append('items[]', JSON.stringify({'id': cartData.id , 'type': cartData.type , 'plan': cartData.plan}))
        cartForm.append('type', 'plan')

        if (route.query.storeid) {
            cartForm.append('storeid', route.query.storeid)
        }

        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}cart/calculate?lang=${locale.value}`, {
            retry: 2, 
            retryDelay: 3000, 
            method: "POST",
            body: new URLSearchParams(cartForm).toString(),
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token }
        })

        if(response) {
            cardCalData.value = response
            defaultPaymentMethoad.value = Array.isArray(response?.payment_methods) ? response?.payment_methods?.filter((v) => v.default == true)[0] : ''
            await getAddress()
            isLoading.value = false
        }

    } catch (error) {
        if(!error.response) {
            errorData.status = 500
            isLoading.value = false 
        } else {
            if (error.response.status === 401) { 
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { getPaymentInfo() }, 3000);
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
}

async function submitPayment(id) {
    await clearError()
    check_new_auth_user()
    try {
        const paymentForm  = new FormData()
        paymentForm.append('order_id', id);
        paymentForm.append('payment_option', defaultPaymentMethoad.value.option)
        paymentForm.append('payment_method', defaultPaymentMethoad.value.value)

        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}payment/pay?lang=${locale.value}`, { 
            retry: 2, 
            retryDelay: 3000, 
            method: "POST", 
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token }, 
            body: new URLSearchParams(paymentForm).toString()
        })

        if(response) {
            submitPayResponse.status =  response?.status ?? null
            submitPayResponse.message =  response?.message ?? null
            $('#checkout_congratulations_modal').modal('show')
        }
        isLoading.value = false 
    } catch (error) {
        if(!error.response) {
            errorData.status = 500
            isLoading.value = false 
        } else {
            if (error.response.status === 401) { 
                localStorage.removeItem('auth_user')
                router.replace(localePath({ name: 'index' }))
                isLoading.value = false 
            } else {
                errorData.status = error.response?.status ?? null
                errorData.type = error.response?._data?.type ?? null
                errorData.message = error.response?._data?.message ?? null
                errorData.code = error.response?._data?.code ?? null
                isLoading.value = false 
            } 
        }
    }
}

async function submitCheckout() {
    isLoading.value = true
    await clearError()
    check_new_auth_user()
    try {
        if(!address.value) {
            errorData.type = 'problem_occurs'
            errorData.code = 'no_address'
            errorData.message = locale.value == 'en' ? 'Seems like you haven\'t saved any addresses yet!' : 'អ្នកហាក់ដូចជាមិនទាន់បានរក្សាទុកអាសយដ្ឋានណាមួយនៅឡើយទេ!' 
            $('#failModal').modal('show')
            isLoading.value = false
            return
        }

        const checkoutForm = new FormData()
        const calItems = Array.isArray(cardCalData.value?.items) && cardCalData.value.items.length ? cardCalData.value.items : []
        calItems.forEach((val) => {
            if(val.type == 'account') {
                checkoutForm.append('items[]', JSON.stringify({ id: 'me', type: val.type , plan: val.plan_id }))
            }  else if (val.type == 'store') {
                checkoutForm.append('items[]', JSON.stringify({ id: val.id, type: val.type , plan: val.plan_id }))
            } else if (val.type == 'ads') {
                checkoutForm.append('items[]', JSON.stringify({ id: val.id, type: val.type , plan: val.plan_id }))
            }
        })

        checkoutForm.append('type', 'plan')
        checkoutForm.append('address_id', parseInt(address.value.id));

        if (route.query.storeid) {     
            checkoutForm.append('storeid', route.query.storeid)
        }

        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}cart/checkout?lang=${locale.value}`, {
            retry: 2, 
            retryDelay: 3000, 
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token }, 
            body: new URLSearchParams(checkoutForm).toString()
        })
        
        if(response && response.order_id) {
            await submitPayment(response.order_id)
        }
        
    } catch (error) {
        if(!error.response) {
            errorData.status = 500
            isLoading.value = false 
        } else {
            if (error.response.status === 401) { 
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { submitCheckout() }, 3000);
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
}

function redirectToAccount() {
    $("#checkout_congratulations_modal").modal('hide')
    const storeid = route.query.storeid ?? null ;
    if (storeid) {
        return router.push(localePath({ name: 'account-store-id', params: {'id': storeid }}))
    } else {
        return router.push(localePath({ name: 'account'}))
    }
}

</script>
