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
                        {{$t(`account_t.order_details`)}} 
                    </p>
                </div>
            </div>
        </header>
        <main :class="mobileDevice ? '' : 'main_min_height mt_80'">
            <div class="max_width_form">
                <div :class="mobileDevice ? 'pt-5' : ''">
                    <div class="order_detail_wrapper mw position-relative">
                        <!-- Loading -->
                        <div v-if="isLoading">
                            <div v-for="s in 2" :key="s" class="col-12 no_padding">
                                <div class="f-w-pad">
                                <div class="my_card pad_card_ _flex_">
                                    <div class="width_100 pb-0 pt-1 ps-3">
                                    <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
                                    <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                    <div class="_flex_">
                                        <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                        <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                                    </div>
                                    <div class="animated-background mb-2 text_hei_loading"></div>
                                    <div class="animated-background text_hei_loading"></div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div v-for="s in 1" :key="s" class="col-12 no_padding">
                                <div class="f-w-pad">
                                <div class="my_card pad_card_ _flex_">
                                    <div class="animated-background">
                                    <div class="f-w-width"></div>
                                    </div>
                                    <div class="width_100 pb-0 pt-1 ps-3">
                                    <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
                                    <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                    <div class="_flex_">
                                        <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                        <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                                    </div>
                                    <div class="animated-background mb-2 text_hei_loading"></div>
                                    <div class="animated-background text_hei_loading"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div v-for="s in 2" :key="s" class="col-12 no_padding">
                                <div class="f-w-pad">
                                <div class="my_card pad_card_ _flex_">
                                    <div class="width_100 pb-0 pt-1 ps-3">
                                    <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
                                    <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                    <div class="_flex_">
                                        <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                        <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                                    </div>
                                    <div class="animated-background mb-2 text_hei_loading"></div>
                                    <div class="animated-background text_hei_loading"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div v-else >
                            <div v-if="errorData.status !== null" >
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
                                 <!-- Error conntection or API not response --> 
                                <div v-else-if="errorData.status === 500" >
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
                                <div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2 px-3': 'membership_banner_store_not_found_mobile px-3'" >
                                    <div class="membership_banner_store_not_found_icon mb-4">
                                        <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                                    </div>  
                                    <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                                    <span class="error_message mb-5">{{ errorData.message }}</span>
                                    <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="retry">{{$t(`account_t.retry`)}}</button>
                                </div>
                            </div>    
                            <div v-else>
                                <!-- Display result -->
                                <div v-if="orderDetail">
                                    <h1 v-if="!mobileDevice" class="fw-semibold fs-5 mb-3">{{$t(`account_t.order_details`)}}</h1>  
                                    <section class="order_detail_payment_status_wrapper order_detail_card"
                                        :class="[orderDetail.status, !mobileDevice ? 'rounded-1' : '' ]"> 
                                        <!-- {{ mobileDevice }} -->
                                        <div>
                                            <div class="order_detail_payment_status_title _mb_2">{{ $t(`account_t.${orderDetail.status.toLowerCase()}`) }}</div>
                                            <p class="mb-0 order_detail_payment_status_created_date">{{ forMatDate(orderDetail?.updated_at?.split(' ')[0], locale)}}</p>
                                        </div>
                                        <p class="mb-0 order_detail_payment_status_icon">
                                            <i v-if="orderDetail.status == 'unpaid'" class="bi bi-clock"></i>
                                            <i v-if="orderDetail.status == 'success'" class="bi bi-check-circle"></i>
                                            <i v-if="orderDetail.status == 'cancelled'" class="bi bi-x-circle"></i>
                                        </p>
                                    </section>
                                    <!-- Address -->
                                    <section class="order_detail_address_wrapper order_detail_card" :class="!mobileDevice ? 'rounded-1' : ''" >
                                        <p class="order_detail_card_title">{{ $t('account_t.address') }}</p>
                                        <div class="order_detail_address_wrapper_detail">
                                            <div class="order_detail_address_detail">
                                                <div v-if="orderDetail?.address?.name" class="d-flex align-items-start checkout_address_detail_user checkout_address_title_field _mb_6">
                                                    <i class="bi bi-person-circle text-secondary"></i>
                                                    <span >{{ orderDetail?.address?.name ? orderDetail?.address?.name : '' }}</span>
                                                </div>
                                                <div v-if="orderDetail?.address?.company" class="d-flex align-items-start checkout_address_detail_user checkout_address_title_field _mb_6">
                                                    <i> <img class="_i pb-1 ml_-2" src="/icon/skyline.png" alt="" width="18px"> </i>
                                                    <span >{{ orderDetail?.address?.company ? orderDetail.address.company : '' }}</span>
                                                </div>
                                                <div v-if="orderDetail?.address?.tax_id" class="d-flex align-items-start checkout_address_detail_user checkout_address_title_field _mb_6">
                                                    <i> <img class="_i pb-1 ml_-2" src="/icon/taxes.png" alt="" width="18px"> </i>
                                                    <span>{{ orderDetail.address.tax_id ? orderDetail.address.tax_id : '' }}</span>
                                                </div>
                                                <div v-if="orderDetail?.address?.phone" class="d-flex align-items-start checkout_address_detail_phone_number checkout_address_title_field _mb_6">
                                                    <i class="bi bi-telephone-fill text-secondary"></i>
                                                    <span class="d-flex align-content-center" _div v-for="(ph,index) in orderDetail.address.phone" :key="ph"><div class="mr-1" v-if="index > 0">,</div>{{ ph }}</span>
                                                </div>
                                                <div v-if="orderDetail?.address?.email" class="d-flex align-items-center checkout_address_title_field _mb_6">
                                                    <i class="fa fa-envelope text-secondary"></i>
                                                    <span>{{orderDetail.address.email?orderDetail.address.email:''}}</span>
                                                </div>                
                                                <div v-if="orderDetail?.address?.location" class="d-flex align-items-start  checkout_address_title_field _mb_6">
                                                    <i class="bi bi-geo-alt-fill text-secondary"></i>
                                                    <span>{{ locale == "km" ? orderDetail.address.location.km_name : orderDetail.address.location.en_name }}</span>
                                                </div>
                                                <div v-if="orderDetail?.address?.address" class="d-flex align-items-start checkout_address_title_field mb-0">
                                                    <i class="bi bi-geo-alt-fill text-white"></i>
                                                    <span class="fw-light" >{{ orderDetail.address.address ? orderDetail.address.address : '' }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section v-if="orderDetail?.invoice" @click="downloadInvoice(orderDetail.invoice.url, 'invoice.pdf')" class="order_detail_invoice_wrapper mb-2" :class="!mobileDevice ? 'rounded-1' : ''">
                                        <p class="order_detail_card_title text-capitalize">{{ $t('account_t.invoice') }}</p>
                                        <p v-if="orderDetail.invoice.issue_date" class="invoice_date _mb_2">{{ $t('account_t.issue_date') }}: {{ orderDetail.invoice.issue_date ? forMatDate(orderDetail.invoice.issue_date, locale) : ''}}</p>
                                        <p v-if="orderDetail.invoice.payment_due" class="invoice_date _mb_8">{{ $t('account_t.due_date') }}: {{ orderDetail.invoice.payment_due ? forMatDate(orderDetail.invoice.payment_due, locale) : ''}}</p>
                                        <p class="order_detail_view_invoice mb-0 d-flex justify-content-start align-items-center text-capitalize"><span class="mr-2">{{ $t('account_t.view_invoice') }}</span><span><i class="bi bi-chevron-right"></i></span></p>
                                        <div class="invoice_pdf_icon">
                                            <img :src="asset_url+version_library+'icon/pdf-file.svg'" alt="" />
                                        </div>
                                    </section>
                                    <!-- Subscription -->
                                    <section class="order_detail_subscription_wrapper order_detail_card" :class="!mobileDevice ? 'rounded-1' : ''">
                                        <p class="order_detail_card_title">{{ $t('account_t.subscription') }}</p>
                                        <div class="order_detail_subscription_des_wrapper">
                                            <div :key="item" v-for="item in orderDetail.items" class="order_detail_subscription_des" :class="[orderDetail.items.length > 1 ? 'has_border_bottom' : '']">
                                                <div class="order_detail_subscription_des_image">
                                                    <div class="order_detail_subscription_image">
                                                        <img class="account_subscription_membership_profile_wrap_image" :src="item && item.photo ? ( !mobileDevice ? item.photo.medium.url : item.photo.small.url ) : asset_url+version_library+'img/empty_post.png'"  :onerror="emptyImage"  alt="" width="70" height="70" />
                                                    </div>
                                                    <div class="order_detail_subscription_des_text">
                                                        <p class="order_detail_subscription_des_type _mb_2">{{ item.title }}</p>
                                                        <p class="order_detail_subscription_des_item  _mb_2">{{ $t(`account_t.${item.type}_id`) }}: {{ item.id }}</p>
                                                        <p class="order_detail_subscription_des_item  _mb_2">{{  item.plan_title }}</p>
                                                        <p class="order_detail_subscription_des_item mb-0">{{ $t('account_t.valid_until') }}: {{ forMatDate(item.end_date.split(' ')[0], locale)}}</p>
                                                        <span v-if="item.sale_price" class="mb-0 order_detail_subscription_price" >${{ formatAmount(item.sale_price) }}</span>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <!-- Summary -->
                                    <section class="order_detail_summary_wrapper order_detail_card" :class="!mobileDevice ? 'rounded-1' : ''">
                                        <p class="order_detail_card_title">{{ $t('account_t.summary') }}</p>
                                        <div class="order_detail_summary_wrapper">
                                            <div class="order_detail_summary_price _mb_6">
                                                <p class="mb-0 order_detail_summary_price_title">{{ $t('account_t.subtotal') }}</p>
                                                <p class="mb-0 order_detail_summary_price_amount">${{ formatAmount(orderDetail?.amount)}}</p>
                                            </div>
                                            <div class="order_detail_summary_price  _mb_6">
                                                <p class="mb-0 order_detail_summary_price_title">{{ $t('account_t.discount') }}</p>
                                                <p class="mb-0 order_detail_summary_price_amount">${{ orderDetail?.discount_amount }}</p>
                                            </div>
                                            <div class="order_detail_summary_price  _mb_6">    
                                                <p class="mb-0 order_detail_summary_price_title">{{ $t('account_t.vat') }}</p>
                                                <p class="mb-0 order_detail_summary_price_amount">${{ orderDetail?.vat_amount }}</p>
                                            </div>
                                            <div class="order_detail_summary_price">
                                                <p class="mb-0 order_detail_summary_price_title">{{ $t('account_t.total') }}</p>
                                                <p class="mb-0 order_detail_summary_price_amount_total">${{  formatAmount(orderDetail?.total)}}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="order_detail_card mb-0" :class="!mobileDevice ? 'rounded-1' : ''">
                                        <p class="order_detail_card_title text-capitalize">{{$t(`account_t.order_info`)}}</p>
                                        <div class="order_detail_info_container">
                                            <p class="_mb_6">{{ $t('account_t.id') }}: {{ orderDetail?.id }}</p>
                                            <p class="_mb_6 text-capitalize">{{ $t('account_t.type') }}: {{ $t(`account_t.${orderDetail?.type}`) }}</p>
                                            <p class="_mb_6 text-capitalize">{{ $t('account_t.payment_metod') }}: {{ orderDetail?.payment_method?.title }}</p>
                                            <p class="mb-0 text-capitalize">{{ $t('account_t.created') }}: {{ forMatDate(orderDetail?.created_at?.split(' ')[0], locale)}}</p>
                                        </div>
                                    </section>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import helper from "/helper";
const language = ref(helper.get_lang_cookie());
definePageMeta( {layout: "custom", middleware: "auth"} ); 
const mobileDevice = ref(helper.m_or_d())
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const { locale } = useI18n();
const runtime_config = useRuntimeConfig();  
const config = runtime_config.public
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const isLoading = ref(false)
const user_data = ref('');
const orderDetail = ref('')
const networkLoading = ref(false)
const errorData = reactive({ message: null, code: null, type: null, status: null })
const isLoadingButton = ref(null)
const featureSubscription = ref('')
const emptyImage =  `src='${asset_url}${version_library}img/empty_post.png'`
const attemptRequest = ref(0)


useHead({
    title: 'Order Details - Khmer24.com',
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        
        { name: 'description', content: 'Buy, Sell' },
        { property: 'og:title', content: 'Order Details - Khmer24.com' },
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

async function check_new_auth_user() { 
    user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    const paymentSettings = user_data.value?.user?.setting?.payment ?? [];
    if(paymentSettings.length && paymentSettings.includes('subscription')) {
        errorData.status = null
        featureSubscription.value = true
    } else {
        errorData.status = 503
        featureSubscription.value = false
    }
}

async function retry() {
    await getOrderDetail()
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

async function downloadInvoice(fileUrl, fileName) {
    networkLoading.value = true
    try {
        const link = document.createElement('a');
        link.href = fileUrl;
        // link.target = '_blank';
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        networkLoading.value = false
    } catch (error) {
        console.error('Failed to download file:', error);
    } finally {
        networkLoading.value = false
    }
}

async function getOrderDetail() {
    isLoading.value = true
    await clearError()
    await check_new_auth_user()
    try {
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/orders/${route.params.id}?lang=${locale.value}`, {
            retry: 2, 
            retryDelay: 3000,   
            method: "GET", 
            headers: {"Access-Token": user_data.value.tokens.access_token} 
        })

        if(response) {
            orderDetail.value = response.data ? response.data : '' 
        }
        isLoading.value = false
    } catch (error) {
        if (!error.response) {
            errorData.status = 500
            isLoading.value = false
        } else if (error.response.status === 401) {
            if(attemptRequest.value < 2) {
                attemptRequest.value += 1
                setTimeout(() => { getOrderDetail() }, 3000);
            } else {
                localStorage.removeItem('auth_user');
                router.replace(localePath({ name: 'index' }));
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

onMounted(async () => {
    if (process.client) {
        await check_new_auth_user()
        if(featureSubscription.value == true) {
            await getOrderDetail()
        }
    }
})

</script>
