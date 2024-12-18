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
                        {{ plans.title ? plans.title : '' }}
                    </p>
                </div>
            </div>
        </header>
        <main class="max_width_form" >
            <div> 
                <div v-if="isLoading" :class="mobileDevice ? 'px-3 pt-2' : ''">
                    <div class="col-9 mb-3 animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                    <div class="col-9 animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                    <div v-for="s in 5" :key="s" class="col-12 no_padding">
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
                <div v-else>
                    <div v-if="errorData.status !== null" :class="mobileDevice ? 'mt-5' : 'mt_80'">
                        <div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                            <div class="service_unavailable_icon mb-5">
                                <i class="bi bi-cloud-fill"></i>
                                <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                            </div>
                            <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                            <p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                            <button type="button" @click="getPremiumStorePlan"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                        </div>
                        <!-- Error conntection or API not response -->
                        <div v-else-if="errorData.status === 500">
                            <div class="col no_padding">
                                <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                        <button @click="getPremiumStorePlan" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2 px-3': 'px-3 membership_banner_store_not_found_mobile'">
                            <div class="membership_banner_store_not_found_icon mb-4">
                                <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
                            </div>  
                            <p class="error_type mb-2">{{$t(`account_t.problem_occurs`)}}</p>
                            <span class="error_message mb-5">{{ errorData.message }}</span>
                            <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="getPremiumStorePlan">{{$t(`account_t.retry`)}}</button>
                        </div>
                    </div>
                    <div v-else :class="mobileDevice ? 'py-5' : 'main_min_height px-3 mt_80'">
                        <div :class="mobileDevice ? 'px-3 pt-2' : ''">
                            <h1 class="mb-0 fs-5 premium_title_for_increase" :class="mobileDevice ? 'fw-medium' : 'w-100'">{{$t('account_t.premium_plan_title') }}</h1>
                            <h2 class="premium_title_choose_category mb-3" :class="!mobileDevice ? 'mb-2' : '_mb_16 fw-light'">{{$t('account_t.premium_plan_des') }}</h2>
                            <!-- Current Plan -->
                            <div v-if="plans.subscription_plans" class="current_premuim_plan_card_wrapper">
                                <h2 class="current_premuim_plan_card_title">{{$t('account_t.current_plan') }}</h2>
                                <NuxtLink :key="sub" v-for="sub in plans.subscription_plans" :to="localePath({ name: 'premium-store-category', params: { 'category': sub.category_type } , query: {'id': route.query.id }})" class="current_premuim_plan_card" :class="!mobileDevice ? 'card_padding_desktop' : 'card_padding_mobile'" >
                                    <div class="current_premuim_plan_card_centent">
                                        <p class="current_premuim_plan_card_centent_category">{{ sub.plan_title }}</p>
                                        <div class="current_premuim_plan_card_list_wrapper">
                                            <ul class="m-0" :class="!mobileDevice ? 'current_premuim_plan_list_desktop' : 'current_premuim_plan_list_mobile'">
                                                <li class="_fs_14 _mb_2">{{ $t(`account_t.plan_type`) }}: {{ $t(`account_t.${sub.plan}`) }}</li>
                                                <li class="_fs_14 _mb_2">{{ $t(`account_t.term2`) }}: {{ sub.term }} {{$t(`account_t.${sub.term_type}`) }}{{ sub.term > 1 &&  locale === 'en' ? 's' : ''}}</li>
                                                <li class="_fs_14 mb-0">{{ $t(`account_t.valid_until`) }}: {{ forMatDate(sub.end_date, locale)}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="current_premuim_plan_card_action">  
                                        <p class="mb-0">{{$t(`account_t.upgrade`) }}</p>
                                        <p class="mb-0">
                                            <i class="ion-ios-arrow-forward"></i>
                                        </p>
                                    </div>
                                    <div v-if="sub.status=='pending'"  class="current_premuim_plan_card_status">
                                        <p class="mb-0" >{{ $t(`account_t.${sub.status}`)}}</p>
                                    </div>
                                    <div class="current_premuim_plan_card_slect_icon">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                </NuxtLink>
                                <hr class="premium_account_hr_stle">
                            </div>
                            <!--  Other Plan -->
                            <div v-if="plans && plans.data" class="orther_premuim_plan_card_wrapper">
                                <h2 v-show="plans.subscription_plans" class="other_premuim_plan_card_title">{{$t(`account_t.other_plan`) }}</h2>
                                <div class="premium_plan_cards" :key="plan" v-for="plan in plans.data" >
                                    <NuxtLink @click="toPremiumPlanByCategory(plan)" class="other_premuim_plan_card" :class="[plan.category_type == route.query.category_change ? 'selected' : '',  !mobileDevice ? 'card_padding_desktop' : 'card_padding_mobile']">
                                        <p class="other_premuim_plan_card_centent_category">{{ plan.title }}</p>
                                        <p class="_mb_12  _fs_14" >{{ plan.description }}</p>
                                        <div class="other_premuim_plan_card_action">
                                            <p class="mb-0">{{$t(`account_t.subscribe`) }}</p>
                                            <p class="mb-0">
                                                <i class="ion-ios-arrow-forward"></i>
                                            </p>
                                        </div>
                                        <div v-if="plan.category_type == route.query.category_change" class="current_premuim_plan_card_slect_icon">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                    </NuxtLink>
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
definePageMeta({ layout: "custom", middleware: "auth" });
const mobileDevice = ref(helper.m_or_d())
import helper from "/helper";
const language = ref(helper.get_lang_cookie());
const runtime_config = useRuntimeConfig();
const config = runtime_config.public;
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const { isDesktop } = useDevice()
const isLoading = ref(true);
const { locale } = useI18n();
const localePath = useLocalePath();
const user_data = ref('');
const router = useRouter();
const route = useRoute();
const plans = ref('')
const planByCategory = ref('')
const currentActivePlan = useState('currentActivePlan', () => '')
const currentActiveTermId = useState('currentActiveTermId', () => '')
const errorData = reactive({message: null, code: null, type: null, status: null})
const attemptRequest = ref(0)


useHead({
    title: 'Premium Store - Khmer24.com', 
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },
        { property: 'og:title', content: 'Premium Store - Khmer24.com' },
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

function check_new_auth_user() { 
    user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

const toPremiumPlanByCategory = (plan) => {
    if(plan) {
        const id = route.query.id ? route.query.id : ''
        router.push(localePath({ name: 'premium-store-category', params: { category: plan.category_type }, query: { 'id': id }}))
    }
}


async function getPremiumStorePlan() {
    clearError()
    check_new_auth_user()
    isLoading.value = true;
    const query = {}

    if(!route.query.category_change) {
        route.query.id ? query['id'] = route.query.id : ''
    }
    
    try {
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}services/store?lang=${locale.value}`, {
            retry: 2, 
            retryDelay: 3000,
            query: query,
            method: "GET", 
            headers: { "Access-Token": user_data.value.tokens.access_token } 
        })

        if(response) {
            plans.value = response ? response : []
            if(plans.value.subscription_plans) {
                plans.value.subscription_plans.sort((a, b) => {
                        if (a.status === 'active') return -1; 
                        if (b.status === 'active') return  1;   
                        return  0;
                });
            }
            isLoading.value = false;
        }
        
    } catch (error) {
        if(!error.response) {
            errorData.status = 500
            isLoading.value = false
        } else {
            if(error.response.status === 401) {
                if(attemptRequest.value < 2) {
                    attemptRequest.value += 1
                    setTimeout(() => { getPremiumStorePlan() }, 3000);
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

onMounted(() => {
    if (process.client) {
        check_new_auth_user();
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop.value ? 'auth-login' : 'auth' })); }; 
        planByCategory.value = ''
        currentActivePlan.value = ''
        currentActiveTermId.value = ''
        getPremiumStorePlan();
    }
})

</script>