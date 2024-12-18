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
                        {{$t(`account_t.subscription_details`)}}
                    </p>
                </div>
            </div>
        </header>
        <main class="max_width_form" :class="mobileDevice ? '' : 'main_min_height'">
            <div> 
                <div v-if="isLoading" class="custom_spinner main_min_height">
                    <span class="loader"></span>
                </div>

                <div v-else-if="errorData.status !== null" :class="mobileDevice ? 'pt-5' : 'error_sub_detail_marigin_top'">
                    <!-- Error Service unavailable , also display when subscription not enable (See: setting.payment) -->
                    <div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                        <div class="service_unavailable_icon mb-5">
                            <i class="bi bi-cloud-fill"></i>
                            <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                        </div>
                        <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                        <p class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                        <button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
                        <button v-else type="button" @click="retry"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                    </div>
                    <!-- For no response from API -->
                    <div v-else-if="errorData.status === 500" :class="!mobileDevice ? '' : 'p-2'">
                        <div class="col no_padding">
                            <div class="no_more_result">
                                <div class="p_bg_status">
                                    <span class="fas fa-wifi size_icon_status"></span>
                                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                    <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Error in status 400 -->
                    <div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2 px-3': 'membership_banner_store_not_found_mobile px-3'" >
                        <div class="membership_banner_store_not_found_icon mb-4">
                            <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt=""  width="90" height="90" />
                        </div>  
                        <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                        <span class="error_message mb-5" :class="mobileDevice ? '' : 'w-50'">{{ errorData.message }}</span>
                        <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="retry">{{$t(`account_t.retry`)}}</button>
                    </div>
                </div>  

                <div v-else :class="mobileDevice ? 'py-5' : 'main_min_height px-3 mt_80'">
                    <div  :class="mobileDevice ? 'px-3 pt-3 loading_padding_buttom' : ''">
                        <!-- Result -->
                        <h1 v-if="!mobileDevice && subscriptionHistories.length > 0" class="fw-semibold fs-5 mb-3">{{$t(`account_t.subscription_details`)}} </h1>
                        <div v-if="mySubState" class="account_sub_detail_card_wrapper mw mb-3">
                            <div class="account_sub_detail_card_title p-3">
                                <div class="account_sub_detail_image">
                                    <img class="account_subscription_membership_profile_wrap_image" :src="mySubState && mySubState.photo ? mySubState.photo.medium.url : asset_url+version_library+'img/empty_post.png'" :alt="mySubState.plan_title ? mySubState.plan_title :''" :onerror="emptyImage"  width="90" height="90"/>
                                </div>
                                <div class="account_sub_title"> 
                                    <p class="mb-0 account_sub_title_main my_truncate_wrap_signle_line">{{ mySubState.title ? mySubState.title : '' }}</p>
                                    <p class="mb-0 account_sub_title_id text-capitalize">{{  $t(`account_t.${mySubState.type}_id`) }}: {{ mySubState.item_id }}</p>
                                </div>
                            </div>
    
                            <hr class="premium_account_hr_stle mb-0"/>
                            <div class="account_sub_detail_card_descrition text-capitalize p-3 ">
                                <div class="">
                                    <p class="mb-0 account_sub_his_in_sub_card_title">{{ mySubState.plan_title ? mySubState.plan_title : '' }}</p>
                                    <span class="account_sub_create_at">{{ forMatDate(mySubState.end_date, locale)}}</span>
                                    <div class="d-flex align-items-center justify-content-start account_sub_start_valid" >
                                            <div class="d-flex flex-column mr-1">
                                                <span class="sub_his_date_label">{{ $t('account_t.valid_from') }}:</span>
                                                <span class="sub_his_date_label">{{ $t('account_t.valid_until') }}:</span> 
                                            </div>
                                            <div class="d-flex flex-column ">
                                                <span class="account_sub_card_valid">{{ forMatDate(mySubState.start_date, locale)}}</span>
                                                <span class="account_sub_card_valid">{{ forMatDate(mySubState.end_date, locale)}}</span>
                                            </div>
                                        </div>            
                                    </div>
                                    <p class="mb-0 account_sub_card_status" :class="mySubState.status ? mySubState.status : ''">{{ $t(`account_t.${mySubState.status}`) }}</p>
                                    <p class="mb-0 account_sub_card_price">${{ formatAmount(mySubState.price)}}</p>
                                </div>
                        </div>
                        <div class="mb-3">
                            <div v-show="!mobileDevice && !isLoading">
                                <div v-if="mySubState.actions && mySubState.actions.length <= 1" >
                                    <button type="button"  @click="optionActions(mySubState, 'renew')"  class="btn form-control-lg btn-xm btn-k24-primary account_sub_action_button renew"> {{ $t('account_t.renew') }}</button>
                                </div>
                                <div v-if="mySubState.actions && mySubState.actions.length > 1" class="d-flex">
                                    <button type="button" @click="optionActions(mySubState, 'change')" class="btn form-control-lg btn-xm btn-k24-outline-primary account_sub_action_button change me-2"> {{ $t('account_t.change') }}</button>
                                    <button  type="button" @click="optionActions(mySubState, 'renew')" class="btn btn-k24-primary btn-xm form-control-lg account_sub_action_button renew ms-2"> {{ $t('account_t.renew') }}</button>
                                </div>
                            </div>
                        </div>
                        <h3 v-if="!isLoading && subscriptionHistories.length > 0 "  class="text-capitalize mw mb-3 historie_section_title">{{ $t('account_t.histories') }}</h3>
                        <h3 v-if="noResultHist == true"  class="text-capitalize mw historie_section_title" style="margin-bottom: -20px">{{ $t('account_t.histories') }}</h3>
                        <div class="account_sub_histories_cards mw mb-3 position-relative">
                            <div class="position-relative">
                                <div @click="toOrderDetail(his.order_id)" :key="his.id" v-for="his in subscriptionHistories" class="account_sub_histories_card_wrapper">
                                    <NuxtLink class="text-decoration-none">
                                        <div class="account_sub_detail_card_descrition text-capitalize" :class="mobileDevice ? 'sub_his_overide_font_size' : ''" >
                                            <div class="_mb_8">
                                                <p class="mb-0 account_sub_his_card_plan_title">{{ his.plan_title ? his.plan_title : '' }}</p>
                                                <span class="account_sub_create_at">{{ forMatDate(mySubState.end_date, locale)}}</span>
                                                <div class="d-flex align-items-center justify-content-start account_sub_start_valid" >
                                                    <div class="d-flex flex-column mr-1">
                                                        <span class="sub_his_date_label">{{ $t('account_t.valid_from') }}:</span>
                                                        <span class="sub_his_date_label">{{ $t('account_t.valid_until') }}:</span> 
                                                    </div>
                                                    <div class="d-flex flex-column ">
                                                        <span class="account_sub_card_valid">{{forMatDate(his.start_date, locale)}}</span>
                                                        <span class="account_sub_card_valid">{{forMatDate(his.end_date, locale)}} </span>
                                                    </div>
                                                </div>            
                                                <p class="mb-0 account_sub_his_card_status" :class="his.status">{{ $t(`account_t.${his.status}`) }}</p>
                                                <p class="mb-0 account_sub_his_card_price">${{ formatAmount(his.price) }}</p>
                                            </div>
                                            <p class="mb-0 account_sub_his_card_order_detail">{{ $t('account_t.order_details') }}<i class="bi bi-chevron-right account_sub_detail_icon"></i></p>
                                        </div>
                                    </NuxtLink>
                                </div>  
                                <ClientOnly>
                                <VueEternalLoading :load="loadSubHistories" >
                                    <template #loading>
                                        <div v-if="subscriptionHistories.length > 0" class="eternal_loading_spiner_custom mt-3 d-flex flex-column justify-content-center align-items-center">
                                            <span>{{ $t('account_t.loading') }}</span> 
                                            <span class="loader"></span>
                                        </div>
                                        <div v-else class="full_width">
                                            <div v-for="s in 10" :key="s" class="col-12 no_padding">
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
                                        </div>
                                    </template>
                                    <template #no-more> 
                                        <div class="no_more_result m_20 position-absolute sub_his_no_more_result">{{ $t('message.no_more_result') }}</div>
                                    </template>
                                    <template #no-results >
                                        <div class="no_more_result n-m-r-mg pb-2 pt-3" >
                                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                        <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                        </div>
                                    </template> 
                                </VueEternalLoading>  
                            </ClientOnly>                
                            </div>
                        </div>
                        <div v-if="mobileDevice && !isLoading">   
                            <div v-if="mySubState?.actions && mySubState.actions.length <= 1" class="account_sub_action_button_wrapper">
                                <button type="button" @click="optionActions(mySubState, 'renew')" class="btn btn-xm form-control-lg btn-k24-primary account_sub_action_button renew"> {{ $t('account_t.renew') }}</button>
                            </div>
                            <div v-if="mySubState?.actions && mySubState.actions.length > 1" class="account_sub_action_button_wrapper">
                                <button type="button" @click="optionActions(mySubState, 'change')" class="btn btn-xm form-control-lg btn-k24-outline-primary account_sub_action_button change"> {{ $t('account_t.change') }}</button>
                                <button type="button" @click="optionActions(mySubState, 'renew')"  class="btn btn-xm btn-k24-primary form-control-lg account_sub_action_button renew"> {{ $t('account_t.renew') }}</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
definePageMeta({ layout: "custom", middleware: "auth" });
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';
import helper from "/helper";
const language = ref(helper.get_lang_cookie());
const mobileDevice = ref(helper.m_or_d())
const router = useRouter();
const route = useRoute();
const runtime_config = useRuntimeConfig();  
const config = runtime_config.public
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const isLoading = ref(false)
const { isDesktop } = useDevice();
const localePath = useLocalePath();
const { locale } = useI18n();
const user_data = ref('');
const mySubState = ref('')
const isInitialLoadSubscripionHistories = ref(true)
const subscriptionHistories = useState('subscriptionHistories', () => [])
const subscriptionHistoriesOffset = useState('subscriptionHistoriesOffset', () => 0)
const emptyImage =  `src='${asset_url}${version_library}img/empty_post.png'`
const errorData = reactive({'type': null, 'message': null, 'code': null, 'status': null}) 
const featureSubscription = ref('')
const isLoadingButton = ref(null)
const noResultHist = ref('')
const attemptRequest = ref(0)

useHead({
    title: 'Subscription Details - Khmer24.com',
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: 'Subscription Details - Khmer24.com' },
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

onMounted(async () => {
    if (process.client) {
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); };
        await check_new_auth_user()
        // Request only feature subscription is enable.
        if(featureSubscription.value == true) {
            await subDetail()
        }
    }
})

async function retry() {
    subscriptionHistories.value = []
    subscriptionHistoriesOffset.value = 0
    if (await subDetail())  {
        await getSubHistoriesManul()
    }
     
}

const authCookeis = useCookie('auth_user')
function checkFeatureEnableServerside() {
    const paymentSettings = authCookeis.value?.user?.setting?.payment ?? [];
    if(paymentSettings.length && paymentSettings.includes('subscription')) {
        errorData.status = null
        featureSubscription.value = true
    } else {
        errorData.status = 503
        featureSubscription.value = false
    }
}

checkFeatureEnableServerside()

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

function toOrderDetail(orderId) {
    router.push(localePath({ name: 'orders-id', params: { id: orderId } }))
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

async function subDetail() {
    await clearError()
    await check_new_auth_user()
    isLoading.value = true
    try {
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/subscriptions/${route.params.id}?lang=${locale.value}`, {
            retry: 2, 
            retryDelay: 3000, 
            method: "GET", 
            headers: { "Access-Token": user_data.value.tokens.access_token }
        })

        mySubState.value = response.data ? response.data : ''
        if(subscriptionHistories.value.length === 0) {
            // await getSubHistoriesManul()
        }
        isLoading.value = false
    } catch (error) {
        if (!error.response) {
            errorData.status = 500
            isLoading.value = false 
        }
        else if (error.response) {
            if (error.response.status === 401) {
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { subDetail() }, 3000);
                } else {
                    localStorage.removeItem('auth_user')
                    router.replace(localePath({ name: 'index' }))  
                    isLoading.value = false  
                }
            }  else {
                errorData.status = error.response?.status ?? null
                errorData.code = error.response?._data?.code ?? null
                errorData.message = error.response?._data?.message ?? null
                errorData.type = error.response?._data?.type ?? null
                isLoading.value = false 
            } 
        }
    }
}

async function getSubHistoriesManul() {
    isInitialLoadSubscripionHistories.value = true
    subscriptionHistories.value = []
    subscriptionHistoriesOffset.value = 0
    try {
        const response =  await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/subscriptions/${route.params.id}/histories?lang=${locale.value}&offset=0`, { 
            retry: 2, 
            retryDelay: 3000, 
            headers: { "Access-Token": user_data.value.tokens.access_token } 
        }) 

        if(response && response.data && response.data.length) {
            subscriptionHistories.value.push(...response.data)
            subscriptionHistoriesOffset.value += response.limit   
        }
        isLoading.value = false
    } catch (error) {
        if(!error.response) {
            errorData.status = 500
            isLoading.value = false
        } else {
            if(error.response.status === 401) {
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { getSubHistoriesManul() }, 3000);
                } else {
                    localStorage.removeItem('auth_user')
                    router.replace(localePath({ name: 'index' }))     
                    isLoading.value = false
                }
            } else {
                errorData.status = error.response?.status ?? null
                errorData.code = error.response?._data?.code ?? null
                errorData.message = error.response?._data?.message ?? null
                errorData.type = error.response?._data?.type ?? null
                isLoading.value = false
            }
        }
    }
}


async function loadSubHistories({ loaded, noMore, noResults, error }) {
    const att = ref(0)
    await clearError()
    await check_new_auth_user()

    async function requestSubHis() {
       
        try {
            const dataLoaded = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/subscriptions/${route.params.id}/histories?lang=${locale.value}&offset=${subscriptionHistoriesOffset.value}`, { 
                retry: 2, 
                retryDelay: 3000, 
                headers: { "Access-Token": user_data.value.tokens.access_token } 
            }) 

            att.value = 0
    
            if(dataLoaded && dataLoaded.data && dataLoaded.data.length) {
                subscriptionHistories.value.push(...dataLoaded.data)
                subscriptionHistoriesOffset.value +=  dataLoaded.limit  
                loaded(dataLoaded.data.length, dataLoaded.limit)
            }
    
            if((dataLoaded.data === null || dataLoaded.data.length === 0 ) && subscriptionHistories.value.length === 0) {
                noResultHist.value = true
                return noResults();
            } 
    
            if((dataLoaded.data === null || dataLoaded.data.length === 0) && subscriptionHistories.value.length > 0) {
                return noMore();
            }
        } catch (err) {
            if (!err.response) { 
                errorData.status = 500
                error()
            } else {
                if(err.response.status === 401) {
                    if(att.value < 2) {
                        att.value += 1
                        setTimeout(() => { request () }, 3000);
                    } else {
                        localStorage.removeItem('auth_user')
                        router.replace(localePath({ name: 'index' }))     
                        error()
                    }
                } else {
                    errorData.status = err.response.status
                    errorData.code = err.response?._data?.code ?? null
                    errorData.message = err.response?._data?.message ?? null
                    errorData.type = err.response?._data?.type ?? null
                    error()
                }    
            }
    
        } 
    }

    await requestSubHis()

}

function optionActions(sub, action) {
    const storeid = route.query.storeid || null;
    const idModal = `#renewPlanModal${sub.id}`;
    $(idModal).modal('hide');

    const setCartData = (id, type, plan) => {
        localStorage.setItem('cart_data', JSON.stringify({ id, type, plan }));
    };

    const redirectToCheckout = (query) => {
        router.push(localePath({ name: 'checkout', query }));
    };

    const redirectToCategory = (name, params, query) => {
        router.push(localePath({ name, params, query }));
    };
    

    const handleRenew = () => {
        const planData = { id: sub.item_id, type: sub.type, plan: sub.plan_id };

        if (sub.type.toLowerCase() === 'ads') {
            setCartData(planData.id, planData.type, planData.plan);
            redirectToCheckout(storeid ? { storeid } : {});
        } else if (sub.type.toLowerCase() === 'store') {
            setCartData(storeid, planData.type, planData.plan);
            redirectToCheckout(storeid ? { storeid } : {});
        } else if (sub.type.toLowerCase() === 'account') {
            setCartData('me', planData.type, planData.plan);
            redirectToCheckout({});
        }
    };

    const handleChange = () => {
        const planData = { id: sub.item_id, type: sub.type, plan: sub.plan_id };

        if (sub.type.toLowerCase() === 'ads') {
            setCartData(planData.id, planData.type, planData.plan);
            redirectToCategory('premium-ad-category', { category: sub.category_type }, storeid ? { id: planData.id, storeid } : { id: planData.id });
        } else if (sub.type.toLowerCase() === 'store') {
            setCartData(storeid, planData.type, planData.plan);
            redirectToCategory('premium-store-category', { category: sub.category_type }, { id: storeid });
        } else {
            setCartData('me', planData.type, planData.plan);
            redirectToCategory('premium-account-category', { category: sub.category_type }, { id: 'me' });
        }
    };

    if (action === 'renew') {
        handleRenew();
    } else if (action === 'change') {
        handleChange();
    } else {
        console.error('Invalid action:', action);
    }
}

</script>