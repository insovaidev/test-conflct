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
                        {{ membershipPlans && membershipPlans.title ? membershipPlans.title : (locale == 'en' ? 'Membership': 'សមាជិកភាព') }}
                    </p>
                </div>
            </div>
        </header>
        <main class="max_width_form" :class="mobileDevice ? 'py-5' : 'main_min_height mt_80'" >
            <div class="position-relative">
                <!-- Loading -->
                <div v-if="isLoading" class="px-3">
                    <div class="margin_top"></div>
                    <div  class="my_card membership_overide_boders_radius overide_member_ship_plan_card">
                        <div class="animated-background overide_member_ship_plan_card_title overide_member_normal_title">
                        </div>
                        <div class="overide_member_ship_plan_card_settings_wrapper pt-2">
                            <div v-for="s in 8" :key="s"  class="overide_member_ship_plan_card_settings">
                                <div class="col animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                            </div>
                        </div>
                    </div>
                    <div class="member_ship_need_more_card">
                        <div class="col">
                            <div class="col-5 animated-background text_hei_loading mb-4"></div>
                            <div class="col-9 animated-background text_hei_loading"></div>
                        </div>
                        <div class="member_ship_need_more_card_content_push_arrow">
                        <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <!-- Display error -->
                <div v-else-if="errorData.status !== null" >
                    <div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                        <div class="service_unavailable_icon mb-5">
                            <i class="bi bi-cloud-fill"></i>
                            <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                        </div>
                        <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                        <p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                        <button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
                        <button v-else type="button" @click="accountMembership"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                    </div>

                    <div v-else-if="errorData.status === 500">
                        <div class="col no_padding">
                            <div class="no_more_result p-2">
                                <div class="p_bg_status">
                                    <span class="fas fa-wifi size_icon_status"></span>
                                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                    <button @click="accountMembership" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2 px-3': 'px-4 membership_banner_store_not_found_mobile'" >
                        <div class="membership_banner_store_not_found_icon">
                            <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                        </div>  
                        <p class="error_type mb-2">{{$t(`account_t.excus_me`)}}</p>
                        <span class="error_message mb-5" :class="mobileDevice ? '' : 'w-50'">{{ errorData.message }}</span>
                        <button  type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="accountMembership">{{$t(`account_t.retry`)}}</button>
                    </div>
                </div>
                <!-- Display result -->
                <div v-else class="px-3" :class="!mobileDevice ? '' : 'pt-3'"> 
                    <div :class="mobileDevice && membershipPlans.type =='normal' ? 'pb-5' : ''" >
                        <h1 v-if="!mobileDevice && membershipPlans" class="fw-semibold fs-5 mb-3">{{$t(`account_t.membership`)}} </h1>
                        <!-- Membership Normal -->
                        <div v-if="membershipPlans && membershipPlans.type == 'normal'">
                            <div :key="item" v-for="item in membershipPlans.data" class="my_card membership_overide_boders_radius overide_member_ship_plan_card">
                                <div class="overide_member_ship_plan_card_title overide_member_normal_title">
                                    {{ item && item.title ? item.title : ''}}
                                </div>
                                <div class="overide_member_ship_plan_card_settings_wrapper pt-2 pb-1">
                                    <div :key="index" v-for="(setting, index) in item.setting"  class="overide_member_ship_plan_card_settings">
                                        <p class="mb-0 overide_member_ship_plan_card_setting_title">{{ setting.title }}</p>   
                                        <p class="mb-0 overide_member_ship_plan_card_setting_title">{{ setting.label }}</p>   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Membership -->
                        <div v-else>
                            <div v-for="m in membershipPlans.data" :key="m" class="my_card membership_overide_boders_radius overide_member_ship_plan_card" >
                                <div class="overide_member_ship_plan_card_title">
                                    <p class="mb-0">{{ m.title }}</p>   
                                </div>
                                <div class="overide_member_ship_plan_card_status" :class="{'active': m.status == 'active' || m.status == 'success', 'cancelled': m.status == 'cancelled', 'unpaid': m.status == 'unpaid', 'expired': m.status == 'expired', 'nearly_expire': m.status == 'nearly_expire', 'failed': m.status == 'failed', 'awaiting_payment': m.status == 'awaiting_payment'}">

                                    <p class="mb-0 overide_member_ship_plan_card_status_title"> {{ $t(`account_t.member_ship_status`)}}: <span class="mb-0 overide_member_ship_plan_card_status_title_span text-capitalize" :class="{'active': m.status == 'active' || m.status == 'success', 'cancelled': m.status == 'cancelled', 'unpaid': m.status == 'unpaid', 'nearly_expire': m.status == 'nearly_expire', 'expired': m.status == 'expired', 'failed': m.status == 'failed', 'awaiting_payment': m.status == 'awaiting_payment'}">{{ $t(`account_t.${m.status}`) }}</span> </p>   
                                    
                                    <p class="mb-0 overide_member_ship_plan_card_status_valid_date">{{  $t(`account_t.valid_until`)}}: {{forMatDate(m.end_date, locale) }}</p>   
                                </div>
                                <div class="overide_member_ship_plan_card_settings_wrapper pt-2" :class="m.actions == null ? 'pb-2': ''">
                                    <div :key="s" v-for="(s, key) in m.setting" ::key="key"  class="overide_member_ship_plan_card_settings">
                                        <p class="mb-0 overide_member_ship_plan_card_setting_title">{{ s.title }}</p>   
                                        <p class="mb-0 overide_member_ship_plan_card_setting_title">{{ s.label }}</p>   
                                    </div>
                                </div>
                                <div v-if="Array.isArray(user_data?.user?.setting?.payment) && user_data.user.setting.payment.includes('subscription')">
                                    <!-- Show when the is_owner == true for store membership -->
                                    <div v-if="route.query.storeid">
                                        <div v-if="m.actions && route.query.is_owner=='true'" class="overide_member_ship_plan_card_actions">
                                            <div class="overide_member_ship_plan_card_actions">
                                                <button type="button" @click="toSubDetail(m.subscription_id)" class="py-2 w-50 form-control btn-lg btn-k24-outline-primary" >
                                                    {{ $t(`account_t.details`)}}
                                                </button>
                                                <button type="button" @click="toCheckout(m)" class="py-2 w-50 form-control btn-lg btn-k24-primary">{{  $t(`account_t.renew`)}}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- For account membership -->
                                    <div v-else>
                                        <div v-if="m.actions" class="overide_member_ship_plan_card_actions">
                                            <div class="overide_member_ship_plan_card_actions">
                                                <button type="button" @click="toSubDetail(m.subscription_id)" class="py-2 w-50 form-control btn-lg btn-k24-outline-primary" >
                                                    {{ $t(`account_t.details`)}}
                                                </button>
                                                <button type="button" @click="toCheckout(m)" class="py-2 w-50 form-control btn-lg btn-k24-primary">{{  $t(`account_t.renew`)}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Button Link to premium plan -->
                        <div v-if="Array.isArray(user_data?.user?.setting?.payment) && user_data.user.setting.payment.includes('subscription') && membershipPlans"  @click="toPremiumPlan">
                            <!-- Show when the is_owner == true for store membership -->
                            <div v-if="route.query.storeid">
                                <div v-if="route.query.is_owner=='true'" class="member_ship_need_more_card">
                                    <div class="member_ship_need_more_card_content">
                                        <p class="member_ship_need_more_card_content_title">{{$t(`account_t.need_more`)}}</p>
                                        <p  class="mb-0" >{{$t(`account_t.p_card_des`)}}</p>
                                    </div>
                                    <div class="member_ship_need_more_card_content_push_arrow">
                                        <i class="bi bi-chevron-right"></i>
                                    </div> 
                                </div>
                            </div>
                                <!-- For account membership -->
                            <div v-else class="member_ship_need_more_card">
                                <div class="member_ship_need_more_card_content">
                                    <p class="member_ship_need_more_card_content_title">{{$t(`account_t.need_more`)}}</p>
                                    <p  class="mb-0" >{{$t(`account_t.p_card_des`)}}</p>
                                </div>
                                <div class="member_ship_need_more_card_content_push_arrow">
                                    <i class="bi bi-chevron-right"></i>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Button Upgrade Account only show when subscription feature is enable -->
            <div v-if="Array.isArray(user_data?.user?.setting?.payment) && user_data.user.setting.payment.includes('subscription')" >
                <div v-if="!mobileDevice && membershipPlans.type =='normal'" class="mt-3 px-3">
                    <button type="button" @click="toPremiumPlan"  class="btn form-control-lg btn-xm btn-k24-primary w-100">{{ $t(`account_t.upgrade_account`)}}</button>
                </div>
                <div v-if="mobileDevice &&  membershipPlans.type =='normal'" class="account_normal_sub_renew_button_wrapper">
                    <button type="button" @click="toPremiumPlan" class="account_sub_renew_button_text btn form-control-lg btn-xm btn-k24-primary ">{{ $t(`account_t.upgrade_account`)}}</button>
                </div>
            </div>
        </main>
    </div>
</template> 

<script setup>
definePageMeta({ layout: "custom", middleware: "auth" });
import helper from "/helper";
const mobileDevice = ref(helper.m_or_d())
const language = ref(helper.get_lang_cookie());
const { locale } = useI18n()
const localePath = useLocalePath();
const runtime_config = useRuntimeConfig();  
const config = runtime_config.public
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const user_data = ref('');
const member = ref('');
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const membershipPlans = useState('membershipPlans', () => '')
const subscriptionHistories = useState('subscriptionHistories', () => [])
const subscriptionHistoriesOffset = useState('subscriptionHistoriesOffset', () => 0)
subscriptionHistories.value = []
subscriptionHistoriesOffset.value = 0
const errorData = reactive({status: null, message: null, code: null, type: null})
const isLoadingButton = ref(null)
const attemptRequest = ref(0)

useHead({
    title: 'Membership - Khmer24.com', 
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: 'Membership - Khmer24.com' },
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
        user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
        member.value = user_data.value && user_data.value.user && user_data.value.user.membership ? user_data.value.user.membership : '';
        if (helper.check_auth_user() === false) { 
            router.replace(localePath({ name: 'index' }));
        }
        accountMembership()
    }
})

async function check_new_auth_user() { 
    user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
}

const toCheckout = (m) => {
    if(m) {
        const storeid = route.query.storeid ? route.query.storeid : null ;
        if(storeid) {
            localStorage.setItem('cart_data', JSON.stringify({'id': storeid, 'type': 'store', 'plan': m.plan_id, 'category': m.category}))
            router.push(localePath({name: 'checkout', query: {'storeid': storeid}}))
        } else {
            localStorage.setItem('cart_data', JSON.stringify({'id': 'me', 'type': 'account', 'plan': m.plan_id, 'category': m.category }))
            router.push(localePath({name: 'checkout' }))
        }
    }
}

const toPremiumPlan = () => {
    const storeid = route.query.storeid ? route.query.storeid : null
    if(storeid) {
        router.push(localePath({name: 'premium-store', query: {'id': storeid}}))    
    } else {
        router.push(localePath({name: 'premium-account', query: {'id': 'me'}}))    
    }
}

const toSubDetail = (id) => {
    const storeid = route.query.storeid ? route.query.storeid : null;
    if(storeid) {
        router.push(localePath({name: 'account-subscriptions-id', params: {id: id}, query: {'storeid': storeid }}))
    } else {
        router.push(localePath({name: 'account-subscriptions-id', params: { id: id }}))
    }
}

async function accountMembership() {
    clearErrorData()
    await check_new_auth_user()
    isLoading.value = true
    const query = {}
    route.query.storeid ? query['storeid'] = route.query.storeid : ''
    try {

        const res = await $fetch(`${config.VUE_APP_API_URL_MOBI}me/membership?lang=${locale.value}`, { 
            method: "GET", 
            query: query, 
            retry: 2,
            retryDelay: 3000,
            headers: { "Access-Token": user_data.value.tokens.access_token }
        })

        if(res) {
            membershipPlans.value = res
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
                    setTimeout(() => { accountMembership() }, 3000);
                } else {
                    localStorage.removeItem('auth_user')
                    router.replace(localePath({ name: 'index' }))  
                    isLoading.value = false
                }
            } else if (error.response.status === 404 || error.response.status === 403 || error.response.status === 422) {
                errorData.type = error.response?._data?.type ?? null
                errorData.message = error.response?._data?.message ?? null
                errorData.code = error.response?._data?.code ?? null
                errorData.status = error.response?.status ?? null
                isLoading.value = false
                
            } else if (error.response.status === 503) {
                errorData.status = 503
                errorData.code = error?.response?._data?.code ?? null
                errorData.type = error?.response?._data?.type ?? null
                errorData.message = error?.response?._data?.message ?? null
                isLoading.value = false
            }
        }        
    } 
}

function clearErrorData () {
    errorData.code = null
    errorData.message = null
    errorData.type = null
    errorData.status = null
}

watch(() => route.fullPath, 
    (to, from) => {
        // Check if the route change is from membership to membership?storeid=id
        const isMembershipToStoreId = from.toString().includes('membership') && to.toString().includes('membership') && to.toString().includes('storeid');

        // Check if the route change is from membership?storeid=id to membership
        const isStoreIdToMembership = from.toString().includes('membership') && to.toString().includes('membership') && !to.toString().includes('storeid');
        
        if (isMembershipToStoreId || isStoreIdToMembership) {
            accountMembership()
        }
    }
)

</script>