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
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left text-capitalize">
                        {{ planByCategory.title ? planByCategory.title : '' }}
                    </p>
                </div>
            </div>
        </header>
        <main class="max_width_form" >
            <div >
                <!-- Loading -->
                <div v-if="isLoading" class="px-3" >
                    <div class="margin_top"></div>
                    <div class="mx-3 col-4 mb-3 animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                    <div class="mx-3 col-4 animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                    <div class="my_card membership_overide_boders_radius overide_member_ship_plan_card">
                        <div class="overide_member_ship_plan_card_settings_wrapper pt-4">
                            <div class="mx-3 col-4 mb-3 animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                            <div class="mx-3 col-4 animated-background mb-2 me-1 py-2 text_hei_loading"></div>
                            <div  :key="s" v-for="s in 8"  class="overide_member_ship_plan_card_settings">
                                <div class="col animated-background mb-2 me-1 py-2 text_hei_loading"></div>
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
                            <button type="button" @click="getPlanByCategory"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                        </div> 
                        <!-- Error conntection or API not response -->
                        <div v-else-if="errorData.status === 500">
                            <div class="col no_padding">
                                <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                        <button @click="getPlanByCategory" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Error request 422, 403, 404 -->
                        <div  v-else  class="membership_banner_store_not_found" :class="isDesktop ? 'rounded-2 px-3': 'membership_banner_store_not_found_mobile px-3'">
                            <div class="membership_banner_store_not_found_icon mb-4">
                                <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="80" height="80" />
                            </div>  
                            <p class="error_type mb-2">{{$t(`account_t.problem_occurs`)}}</p>
                            <span class="error_message mb-5">{{ errorData.message }}</span>
                            <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="getPlanByCategory">{{$t(`account_t.retry`)}}</button>
                        </div>
                    </div>
                    <div v-else :class="mobileDevice ? 'py-5' : 'main_min_height px-3 mt_80'">
                        <!-- Display result -->
                        <div  class="px-3" :class="!mobileDevice ? 'pb-5 mb-3' : 'pt-3 pb-5'" >
                            <div v-if="planByCategory">
                                <div v-if="planByCategory.subscription_plan" class="mb-4">
                                    <h3 class="mb-1 current_plan_title">{{ $t('account_t.current_plan') }}</h3>
                                    <h1 class="current_my_sub_plan_title">{{ planByCategory.subscription_plan.plan_title ? planByCategory.subscription_plan.plan_title  : '' }}</h1>
                                </div>
                                <div v-else class="mb-4">
                                    <h1 class="current_my_sub_plan_title" :class="mobileDevice ? 'w-75' : ''" >{{ $t('account_t.category_title') }}</h1>
                                </div>
                                <div @click="activePlan = index, focusAndMoveToMiddle(plan[0].plan)" :id="'id'+plan[0].plan" :key="plan" v-for="(plan, index) in planByCategoryGrouped" class="other_plan_by_category_card" :class="{ 'currentActivePlan': planByCategory.subscription_plan && planByCategory.subscription_plan.plan == index, 'active': activePlan == index}">
                                    <div @click="choosePlan(plan, index)" :class="!mobileDevice ? 'other_plan_by_category_card_content' : 'other_plan_by_category_card_content_mobile'">
                                        <p class="_mb_8 other_plan_by_category_card_content_title">{{ $t(`account_t.${index}`) }}</p>  
                                        <p class="_mb_16 other_plan_by_category_card_content_price_start">{{ $t('account_t.start_from') }} ${{ plan[0].price}} <span>{{ plan[0].term > 1 ? $t(`text_desktop.for`)+' '+plan[0].term : '/ '  }} {{ $t(`account_t.${plan[0].term_type}`) }}{{ (plan[0].term_type == 'day' || plan[0].term_type == 'month') && plan[0].term > 1 && locale !== 'km' ? 's' : ''}}</span></p>
                                        <div class="_mb_16">
                                            <div :key="s" v-for="s in plan[0].setting" class="other_plan_by_category_card_content_settings">
                                                <span class="other_plan_by_category_card_content_setting_icon"><i class="bi bi-check-circle"></i></span>
                                                <span class="other_plan_by_category_card_content_setting_title">{{ s.title }}</span>
                                                <span class="other_plan_by_category_card_content_setting_title">{{ s.label ? s.label : 'None' }}</span>
                                            </div>
                                        </div>
                                        <div class="other_plan_by_category_card_term term_active ">
                                            <p class="_mb_12 other_plan_label_term">{{ $t('account_t.term') }}:</p>
                                            <!-- Default selected or current Subscription Plan -->
                                            <div v-if="activePlan == index || planByCategory.subscription_plan && planByCategory.subscription_plan.plan == index" class="other_plan_term_list">
                                                <div :key="termIndex" v-for="(term, termIndex) in plan" class="other_plan_term_list_item">
                                                    <label  @click="chooseTerm(index, term, termIndex)" class="other_plan_term_list_item_label" :for="term.id" :class="[planByCategory.subscription_plan && planByCategory.subscription_plan.plan_id == term.id ? 'currentActiveTermId' : '']" >
                                                        <div class="other_plam_item_term_left">   
                                                            <input class="other_plam_item_term_input" type="radio" :value="term.id" :name="term.id" :id="term.id" v-model="subScribeFormData.termId" />
                                                            <div class="other_plan_term_list_item_term">
                                                                <span>
                                                                    {{ term.term }}  {{ term.term_type ?  $t(`account_t.${term.term_type}`) : ''}}{{ term.term_type && (term.term_type == 'day' || term.term_type == 'month') && term.term > 1 &&  locale !== 'km' ? 's' : '' }}
                                                                </span>
                                                                <span v-show="term.discount > 0" class="other_plan_term_discount" >
                                                                    - {{ term.discount_type == 'amount' ? term.discount_amount : term.discount }}
                                                                    {{ term.discount_type == 'amount' ? '$' : '%' }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="other_plan_term_list_item_price"><span class="other_plan_term_list_item_price_discount" >{{ term.discount ? '$' + formatAmount(term.price) : '' }}</span>  ${{ formatAmount(term.sale_price)}}</div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div v-else class="other_plan_term_card_view">
                                                <label @click="chooseTerm(index, term, termIndex), storeData()" :key="term" v-for="(term, termIndex) in plan" class="other_plan_term_card_view_card" :for="term.id">
                                                    <p :class="!mobileDevice ? 'fs-4' : 'fs-6'" class="mb-0 fw-semibold other_plan_term_card_view_card_term">
                                                        {{ term.term }}
                                                    </p>
                                                    <p class="mb-0 other_plan_term_card_view_card_term_type">
                                                        {{ term.term_type ? $t(`account_t.${term.term_type}`) : ''}}{{term.term_type && ( term.term_type == 'day' || term.term_type == 'month') && term.term > 1 &&  locale !== 'km' ? 's' : '' }}
                                                    </p>
                                                    <div class="other_plan_term_card_view_card_discount" v-show="term.discount_type">- {{ term.discount }}{{ term.discount_type == 'percent' ? '%' : ''}}</div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div v-if="!mobileDevice && subScribeFormData.planTitle">  
                                <div class="subscribe_button_footer_wrapper_not_fix" :class="!mobileDevice ? 'rounded-1' : ''">
                                    <div class="subscribe_button_footer_term_wrapper">
                                        <div class="subscribe_button_footer_term_left">
                                            <p class="mb-0 subscribe_button_footer_term_plan">{{ subScribeFormData.planTitle ? $t(`account_t.${subScribeFormData.planTitle}`)+ ':' : '' }} </p>
                                            <p class="mb-0 subscribe_button_footer_term">{{ subScribeFormData.term ? subScribeFormData.term.term : '' }}</p>
                                            <p class="mb-0 subscribe_button_footer_term_type">{{ subScribeFormData.term && subScribeFormData.term.term_type ? $t(`account_t.${subScribeFormData.term.term_type}`)  : '' }}{{ subScribeFormData.term && subScribeFormData.term.term_type && (subScribeFormData.term.term_type == 'day' || subScribeFormData.term.term_type == 'month')  && subScribeFormData.term.term && subScribeFormData.term.term > 1 &&  locale === 'en' ? 's' : ''}}</p>
                                            <div v-if="subScribeFormData.term && subScribeFormData.term.discount > 0" class="subscribe_button_footer_term_discount_wrapper">
                                                <p class="mb-0">- {{ subScribeFormData.term.discount_type == 'amount' ? subScribeFormData.term.discount_amount : subScribeFormData.term.discount}}</p>
                                                <p class="mb-0">{{ subScribeFormData.term.discount_type == 'amount' ? " $" : " %" }}</p>
                                            </div>
                                        </div>
                                        <div v-if="subScribeFormData.term && subScribeFormData.term.price" class="subscribe_button_footer_term_left">
                                            <p v-if="subScribeFormData.term.discount > 0" class="mb-0 subscribe_button_footer_term_price">${{ subScribeFormData.term.price ? formatAmount(subScribeFormData.term.price) : ''}}</p>
                                            <p class="mb-0 subscribe_button_footer_term_sale_price">${{ subScribeFormData.term.sale_price ? formatAmount(subScribeFormData.term.sale_price) : ''}}</p>
                                        </div>
                                    </div>
                                    <button type="button" class="btn form-control-lg btn-xm text-white btn-k24-secondary subscribe_button_footer" @click="storeData(route.params.category), router.push(localePath({ name: 'checkout'}))">
                                        {{ $t(`account_t.subscribe_now`)}}   
                                    </button>
                                </div>
                            </div>
                            <div v-if="mobileDevice && subScribeFormData.planTitle" class="subscribe_button_footer_wrapper">
                                <div class="subscribe_button_footer_term_wrapper">
                                    <div class="subscribe_button_footer_term_left">
                                        <p class="mb-0 subscribe_button_footer_term_plan">{{ subScribeFormData.planTitle ? $t(`account_t.${subScribeFormData.planTitle}`)+ ':' : '' }} </p>
                                        <p class="mb-0 subscribe_button_footer_term">{{ subScribeFormData.term ? subScribeFormData.term.term : '' }}</p>
                                        <p class="mb-0 subscribe_button_footer_term_type">{{ subScribeFormData.term && subScribeFormData.term.term_type ? $t(`account_t.${subScribeFormData.term.term_type}`)  : '' }}{{ subScribeFormData.term && subScribeFormData.term.term_type && (subScribeFormData.term.term_type == 'day' || subScribeFormData.term.term_type == 'month') && subScribeFormData.term.term && subScribeFormData.term.term > 1 &&  locale === 'en' ? 's' : ''}}</p>
                                        <div v-if="subScribeFormData.term && subScribeFormData.term.discount > 0" class="subscribe_button_footer_term_discount_wrapper">
                                            <p class="mb-0">- {{ subScribeFormData.term.discount_type == 'amount' ? subScribeFormData.term.discount_amount : subScribeFormData.term.discount}}</p>
                                            <p class="mb-0">{{ subScribeFormData.term.discount_type == 'amount' ? " $" : " %" }}</p>
                                        </div>
                                    </div>
                                    <div v-if="subScribeFormData.term && subScribeFormData.term.price" class="subscribe_button_footer_term_left">
                                        <p v-if="subScribeFormData.term.discount > 0" class="mb-0 subscribe_button_footer_term_price">${{ subScribeFormData.term.price ? formatAmount(subScribeFormData.term.price): ''}}</p>
                                        <p class="mb-0 subscribe_button_footer_term_sale_price">${{ subScribeFormData.term.sale_price ? formatAmount(subScribeFormData.term.sale_price) : ''}}</p>
                                    </div>
                                </div>
                                <button type="button" class="btn form-control-lg btn-xm btn-k24-secondary subscribe_button_footer" @click="storeData(route.params.category), router.push(localePath({ name: 'checkout'}))" >
                                    {{ $t(`account_t.subscribe_now`)}}       
                                </button>
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

import helper from "/helper";
const mobileDevice = ref(helper.m_or_d())
const { locale } = useI18n();
const language = ref(helper.get_lang_cookie());
const route = useRoute()
const router = useRouter();
const localePath = useLocalePath();
const runtime_config = useRuntimeConfig();
const config = runtime_config.public;
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const isLoading = ref(true)
const { isDesktop } = useDevice()
const user_data = ref('');
const planByCategory = ref('') 
const planByCategoryGrouped = ref('') 
const activePlan = useState('activePlan', () => {''})
const subScribeFormData =  reactive({ planTitle: '',term: '',termId: '' })
const errorData = reactive({message: null, code: null, type: null, status: null})
const attemptRequest = ref(0)

useHead({
    title: 'Premium Account - Khmer24.com', // set header title
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },
        { property: 'og:title', content: 'Premium Account Khmer24.com' },
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

function focusAndMoveToMiddle(index) {
    setTimeout(() => {
        const element = document.getElementById('id' + index);
        if (element) {
            // Focus on the clicked item
            element.focus();    
            // Scroll the item to the middle of the screen
            element.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'center', // Align the element to the center
                inline: 'nearest' // Align the element to the nearest side
            });
        }
    }, 500)    
}


async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}


async function getPlanByCategory() {
    clearError()
    check_new_auth_user()
    const query = {}
    route.query.id ? query['id'] = route.query.id : '' 
    query['lang'] = locale.value 
    isLoading.value = true
    try {
        const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}services/account/${route.params.category}`, {
            retry: 2, 
            retryDelay: 3000, 
            query: query,
            method: "GET", 
            headers: { "Access-Token": user_data.value.tokens.access_token }
        })

        if(response && response.data) {
            planByCategory.value = response
            const data = response.data
            
            const groupedPlans = data.reduce((acc, plan) => {
                const { plan: planName } = plan;
                if (!acc[planName]) {
                    acc[planName] = [];
                }
                acc[planName].push(plan);
                return acc;
            }, {});

            delete groupedPlans['free']
            planByCategoryGrouped.value = groupedPlans

            let pSelected;
            let termIdSelected;

            // Set this to default 
            pSelected = groupedPlans[Object.keys(groupedPlans)[0]][0]
            termIdSelected = groupedPlans[Object.keys(groupedPlans)[0]][0].id

             // Check any first plan that recommended: true
             for (const p in response.data) {
                if (response.data[p] && response.data[p].recommended && response.data[p].recommended == true) {
                    // Select term id
                    if (groupedPlans[response.data[p].plan].length) {
                        groupedPlans[response.data[p].plan].forEach((val) => {
                            if (val.recommended == true) {
                                termIdSelected = val.id
                            } else {
                                termIdSelected = groupedPlans[response.data[p].plan][0].id
                            }
                        }) 
                        pSelected = response.data[p]
                    }
                }
            }
     
            const defaultPlan = pSelected
            activePlan.value = defaultPlan.plan
            subScribeFormData.planTitle = defaultPlan.plan
            subScribeFormData.term = defaultPlan
            subScribeFormData.termId = defaultPlan.id

            if(response.subscription_plan) {
                activePlan.value = response.subscription_plan.plan
                subScribeFormData.planTitle = response.subscription_plan.plan
                subScribeFormData.term = response.subscription_plan
                subScribeFormData.termId = response.subscription_plan.plan_id
            } 

            focusAndMoveToMiddle(activePlan.value)
            isLoading.value = false
        }   

    } catch (error) {
        if (!error.response) {
            errorData.status = 500
            isLoading.value = false
        } else if (error.response && error.response.status === 401) {
            if(attemptRequest.value < 2) {
                attemptRequest.value += 1
                setTimeout(() => { getPlanByCategory() }, 3000);
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

// Choose plan when select on plan card
function choosePlan(plan, index){
    let cPlanTitle = index;
    let cPlanTerm = plan[0];
    let cPlanTermID = plan[0].id;

    if (subScribeFormData.planTitle !== index) {
        // check recomended: true
        plan.forEach((val) => {
            if (val.recommended == true) { 
                cPlanTitle = index
                cPlanTerm = val
                cPlanTermID = val.id
            } 
        })

        subScribeFormData.planTitle = cPlanTitle
        subScribeFormData.term = cPlanTerm
        subScribeFormData.termId = cPlanTermID


    } else {    
        subScribeFormData.planTitle = index
    }
}

// Choose term when select on term
function chooseTerm(index, t) {
    subScribeFormData.planTitle = index
    subScribeFormData.term = t
    subScribeFormData.termId = t.id
    storeData(subScribeFormData)
}

// Store subscribe account data to localStorage
function storeData (plan_category=null) { 
    localStorage.setItem('cart_data', JSON.stringify({'id': 'me', 'type': 'account', 'plan': subScribeFormData.termId, 'category': plan_category }))
}

// Check auth
function check_new_auth_user() { 
    user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
}

onMounted(() => {
    if (process.client) {
        // Check user auth
        check_new_auth_user();
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); };
        // Get premium plan by category
        getPlanByCategory()
    }
})
</script>