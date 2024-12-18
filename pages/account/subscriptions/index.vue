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
                            {{$t(`account_t.subscription`)}}
                        </p>
                    </div>
                </div>
            </header>
            <main class="max_width_form sub_main_min_height" :class="[mobileDevice ? 'py-5' : 'px-3 mt_80']">
                <div >
                    <div>
                        <div class="subscription_wrapper_no_more_title_and_card">
                            <div v-if="loading === true">
                                <div class="full_width">
                                    <div v-for="s in 6" :key="s" class="col-12 no_padding">
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
                            </div>
                            <div v-else-if="errorData.status !== null">
                                <!-- Error Service unavailable , also display when subscription not enable (See: setting.payments from user_data login) -->
                                <div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
                                    <div class="service_unavailable_icon mb-5">
                                        <i class="bi bi-cloud-fill"></i>
                                        <i class="service_unavailable_icon_info bi bi-info-lg"></i>
                                    </div>
                                    <h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
                                    <p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
                                    <button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
                                    <button v-else type="button" @click="getSubscriptionManul" class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
                                </div>
                                <!-- For no response from API -->
                                <div v-else-if="errorData.status === 500" :class="!mobileDevice ? '' : 'p-2'">
                                    <div class="col no_padding">
                                        <div class="no_more_result">
                                            <div class="p_bg_status">
                                                <span class="fas fa-wifi size_icon_status"></span>
                                                <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                                <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                                <button @click="getSubscriptionManul" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Error in status 400 -->
                                <div v-else>
                                    <div class="membership_banner_store_not_found" :class="!mobileDevice ? 'd-flex justify-content-center align-items-center rounded-2 px-3': 'membership_banner_store_not_found_mobile px-3'" >
                                        <div class="membership_banner_store_not_found_icon mb-4">
                                            <img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" :width="!mobileDevice ? 100 : 90" :height="!mobileDevice ? 100 : 90" />
                                        </div>  
                                        <p class="error_type mb-2">{{ $t('account_t.problem_occurs') }}</p>
                                        <span class="error_message mb-5">{{  errorData.message ? errorData.message : '' }}</span>
                                        <button type="button" :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3" @click="getSubscriptionManul">{{ $t('account_t.retry') }}</button>
                                    </div>  
                                </div>
                            </div>

                            <div v-else :class="!mobileDevice ? '' : 'px-3 pt-3'" >
                                <h1 v-if="!mobileDevice && mobileDevice != null  && !errorData.status && subscription.length" class="fw-semibold fs-5 mb-3">{{$t(`account_t.subscriptions`)}} </h1>
                                <div :key="sub.id" v-for="sub in subscription" class="wrapper_card_and_modal">
                                    <div @click="toSubDetail(sub.id)"  class="account_subscription_wrapper mw">
                                        <div class="account_subscription_detail_wrapper position-relative"  :class="!mobileDevice ? 'account_subscription_detail_wrapper_marin_des' : 'account_subscription_detail_wrapper_marin_mob'">
                                            <div class="account_subscription_detail">
                                                <div class="account_subscription_detail_image">
                                                    <img :src="sub && sub.photo ? ( !mobileDevice ? sub.photo.medium.url : sub.photo.small.url ) : asset_url+version_library+'img/empty_post.png'" :onerror="emptyImage" width="90" height="90" :alt="sub.title"/>               
                                                </div>
                                                <div class="account_subscription_detail_text ">
                                                    <p class="mb-0 account_subscription_detail_type my_truncate_wrap_signle_line w-75">{{ sub.title }} </p>
                                                    <p class="mb-0 account_subscription_detail_id text-capitalize my_truncate_wrap">{{ $t(`account_t.${sub.type}_id`) }}: {{ sub.item_id }} </p>
                                                    <p class="mb-0 account_subscription_detail_category_term my_truncate_wrap">{{ sub.plan_title }} </p>
                                                    <p class="mb-0 account_subscription_detail_valid_date w-75">{{ $t(`account_t.valid_until`) }}: {{ forMatDate(sub.end_date, locale)}}</p>
                                                    <p class="mb-0 account_subscription_detail_price my_truncate_wrap_signle_lin w-75">{{ $t(`account_t.price`) }}: <span>${{ formatAmount(sub.price)}}</span></p>
                                                </div>
                                            </div>
                                            <button v-if="mobileDevice" @click="subscriptionOnModal = sub, $event.stopPropagation()" type="button" data-bs-toggle="modal" data-bs-target="#optionSubscriptionModal" class="position-absolute top-0 end-0 dropdown_toggle_custom" ><i class="bi bi-three-dots-vertical _center"></i></button>
                                            <div v-else  @click="clickChild(sub.id, $event)" class="sub_dropdown_position btn-group">
                                                <button type="button" data-bs-toggle="dropdown" class="dropdown_toggle_custom dropdown-toggle"  aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical _center"></i>
                                                </button>
                                                <ul :id="'dropdownmenu' + sub.id" class="dropdown-menu dropdown-menu-end">
                                                    <li v-if="sub?.actions?.includes('downgrade') || sub?.actions?.includes('upgrade')">
                                                        <a @click="optionActions(sub, 'change')" role="button" class="dropdown-item">
                                                            {{$t('account_t.change')}}
                                                        </a>
                                                    </li>
                                                    <li v-if="sub?.actions?.includes('renew')">
                                                        <a @click="optionActions(sub, 'renew')" role="button" class="dropdown-item">
                                                            {{$t('account_t.renew')}}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a @click="toSubDetail(sub.id)" role="button" class="dropdown-item">
                                                            {{$t('account_t.details')}}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="account_subscription_status" :class="sub.status == 'cancelled' ? sub.status : sub.payment_status">
                                                <p class="mb-0" >{{ sub.status == 'cancelled' ? $t(`account_t.cancelled`) :  $t(`account_t.${sub.payment_status}`) }}</p>
                                            </div>
                                        </div>
                                    </div>     
                                </div>     
                                <VueEternalLoading :load="loadSubscription">
                                    <template #loading>
                                        <div v-if="loading === false">
                                            <div v-if="subscription.length > 0" class="eternal_loading_spiner_custom mt-3 d-flex flex-column justify-content-center align-items-center">
                                                <span>{{ $t('account_t.loading') }}</span> 
                                                <span class="loader"></span>
                                            </div>
                                            <div v-else class="full_width">
                                                <div v-for="s in 6" :key="s" class="col-12 no_padding">
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
                                            </div>
                                            <div>
                                        </div>
                                    </template>
                                    <template #no-more>
                                        <div class="no_more_result m_20 position-absolute sub_his_no_more_result">{{ $t('message.no_more_result') }}</div>
                                    </template>
                                    <template #no-results>
                                        <div class="subscription_wrapper_no_more_title_and_card">
                                            <div class="wrapper_card_and_modal">
                                                <div class="account_subscription_wrapper mw">
                                                    <h1 v-if="!mobileDevice && mobileDevice != null" class="fw-semibold fs-5 mb-3">{{$t(`account_t.subscriptions`)}} </h1>
                                                    <NuxtLink v-if="route.query.storeid" @click="toPremium()">
                                                        <div class="account_subscription_detail_wrapper mormal_card position-relative">
                                                            <div class="account_subscription_membership_profile">
                                                                <div class="account_subscription_membership_profile_wrap">
                                                                    <img class="account_subscription_membership_profile_wrap_image" :src="asset_url+version_library+'img/empty_post.png'" :alt="storeOwner?.username ? storeOwner.username : ''" width="90" height="90"/>
                                                                </div>
                                                                <div class="account_membership_profile_title">
                                                                    <p class="mb-0 account_membership_profile_title">{{ $t('account_t.membership')}}</p>
                                                                    <span>{{  $t('account_t.normal')}}</span>
                                                                </div>
                                                            </div>
                                                            <div class="account_subscription_ungrade_link">
                                                                <span class="account_subscription_ungrade_link_text">{{ $t('account_t.upgrade')}}</span>
                                                                <i class="svg bi bi-chevron-right"></i>
                                                            </div>
                                                        </div>
                                                    </NuxtLink>
                                                    <NuxtLink v-else @click="toPremium()">
                                                        <div class="account_subscription_detail_wrapper mormal_card position-relative">
                                                            <div class="account_subscription_membership_profile">
                                                                <div class="account_subscription_membership_profile_wrap">
                                                                    <img class="account_subscription_membership_profile_wrap_image" :src="user_data && user_data.user && user_data.user.photo && user_data.user.photo.medium ? ( !mobileDevice ? user_data.user.photo.medium.url : user_data.user.photo.small.url ) : asset_url+version_library+'img/empty_post.png'" :alt="user_data.user.name ? user_data.user.name : ''" width="90" height="90"/>
                                                                </div>
                                                                <div class="account_membership_profile_title">
                                                                    <p class="mb-0 account_membership_profile_title">{{ $t('account_t.membership')}}</p>
                                                                    <span>{{  $t('account_t.normal')}}</span>
                                                                </div>
                                                            </div>
                                                            <div class="account_subscription_ungrade_link">
                                                                <span class="account_subscription_ungrade_link_text">{{ $t('account_t.upgrade')}}</span>
                                                                <i class="svg bi bi-chevron-right"></i>
                                                            </div>
                                                        </div>
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </VueEternalLoading>
                            </div> 
                        </div>
                    </div> 
                </div>
            </main>
        </div>
        <!-- Modal option action subscription -->
        <div class="modal fade account_renew_plan_modal" id="optionSubscriptionModal" tabindex="-1" aria-labelledby="optionSubscriptionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen account_renew_plan_modal_dialog" role="document">
                <div class="modal-content account_renew_plan_modal_content">
                    <div class="modal-body account_renew_plan_modal_content_body">  
                        <div v-if="subscriptionOnModal" class="account_dialog_button_renew_plan">
                            <div class="d-flex flex-column sub_action_modal_btns">
                                <button v-if="subscriptionOnModal.actions && subscriptionOnModal.actions.includes('renew')"  @click="optionActions(subscriptionOnModal, 'renew')" class="text-capitalize account_dialog_button_renew_plan_action text-primary">{{$t(`account_t.renew`)}}</button>
                                <hr class="m-0" v-if="subscriptionOnModal.actions && subscriptionOnModal.actions.includes('downgrade') || subscriptionOnModal.actions.includes('upgrade')" />
                                <button v-if="subscriptionOnModal.actions && subscriptionOnModal.actions.includes('downgrade') || subscriptionOnModal.actions.includes('upgrade')" @click="optionActions(subscriptionOnModal, 'change')" class="text-capitalize account_dialog_button_renew_plan_action text-primary">{{$t(`account_t.change`)}}</button>
                            </div>
                        </div>
                        <button type="button" data-bs-dismiss="modal"  class="subsription_cancel_btn_modal text-primary">{{$t(`account_t.cancel`)}}</button>
                    </div>
                </div>
            </div>    
        </div>
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
    </template>

    <script setup>
    definePageMeta({ layout: "custom", middleware: "auth" });
    import helper from "/helper";
    const language = ref(helper.get_lang_cookie());
    const mobileDevice = ref(helper.m_or_d())
    const router = useRouter();
    const route = useRoute();
    const runtime_config = useRuntimeConfig();
    const config = runtime_config.public;
    const asset_url = '/'; 
    const version_library = config.LIBRARY_VERSION;
    const emptyImage =  `src='${asset_url}${version_library}img/empty_post.png'`
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const user_data = ref('');
    const isInitialLoadSubscription = ref(true)
    const subscription = useState('subscription', () => [])
    const subscriptionOffset = useState('subscriptionOffset', () => 0);
    const subscriptionOnModal = ref('')
    const subscriptionHistories = useState('subscriptionHistories', () => [])
    const subscriptionHistoriesOffset = useState('subscriptionHistoriesOffset', () => 0)
    subscriptionHistories.value = []
    subscriptionHistoriesOffset.value = 0
    const errorData = reactive({'code': null, 'message': null, 'status': null, 'type': null })
    const isLoadingButton = ref(null)
    const featureSubscription = ref('')    
    const loading = ref(false)
    
    useHead({
        title: 'Subscription - Khmer24.com',
        meta: [
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            { property: 'og:title', content: 'Subscription With Khmer24.com' },
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
            if (helper.check_auth_user() === false) { router.replace(localePath({ name: !mobileDevice ? 'auth-login' : 'auth' })); };
            await check_new_auth_user()
        }
    })

    watch(() => route.fullPath, 
        (to, from) => {
            // Check if the route change is from subscriptions to subscriptions?storeid=id
            const isSubscriptionsToStoreId = from.toString().includes('subscriptions') && to.toString().includes('subscriptions') && to.toString().includes('storeid');
            // Check if the route change is from subscriptions?storeid=id to subscriptions
            const isStoreIdToSubscriptions = from.toString().includes('subscriptions') && to.toString().includes('subscriptions') && !to.toString().includes('storeid');
            
            if (isSubscriptionsToStoreId || isStoreIdToSubscriptions) {
                subscription.value = [];
                subscriptionOffset.value = 0;
                isInitialLoadSubscription.value = true;
            }
        }
    )

    onBeforeUnmount(() => {
        hideModals(['#optionSubscriptionModal'])
    })

    function hideModals(modalSelectors) {
        modalSelectors.forEach(selector => {
            $(selector).modal('hide');
        });
    }

    const authCookeis = useCookie('auth_user')
    function checkFeatureEnableServerside() {
        const paymentSettings = authCookeis.value?.user?.setting?.payment ?? [];
        if(paymentSettings.length && paymentSettings.includes('subscription')) {
            errorData.status = null
        } else {
            errorData.status = 503
        }
    }
    checkFeatureEnableServerside()

    async function check_new_auth_user() { 
        user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
        const paymentSettings = user_data.value?.user?.setting?.payment ?? [];
        if(paymentSettings.length && paymentSettings.includes('subscription')) {
            errorData.status = null
        } else {
            errorData.status = 503
        }
    }

    async function clearError() {
        Object.keys(errorData).forEach(key => errorData[key] = null);
    }
    
    async function getSubscriptionManul() {
        await clearError()
        await check_new_auth_user()

        subscription.value = []
        subscriptionOffset.value = 0
        loading.value = true

        const query = {}
        if (route.query.storeid) query['storeid'] = route.query.storeid
        const attemptRequest = ref(0)

        async function request() {
            try {
                const response = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/subscriptions?lang=${locale.value}&offset=${subscriptionOffset.value}`, { 
                    retry: 2, 
                    retryDelay: 3000, 
                    query: query , 
                    headers: { "Access-Token": user_data.value.tokens.access_token } 
                })
    
                if (response) {
                    if (response.data && response.data.length > 0) {
                        subscription.value.push(...response.data)
                        subscriptionOffset.value += response.limit
                    }
                    loading.value = false
                }
            } catch (error) {
                if(!error.response) {
                    errorData.status = 500 
                    errorData.message = 'internet connection' 
                    loading.value = false  
                } else {
                    if(error.response.status === 401) {
                        if(attemptRequest.value < 2) {
                            attemptRequest.value += 1
                            setTimeout(() => { request() }, 3000);
                        } else {
                            localStorage.removeItem('auth_user')
                            router.replace(localePath({ name: 'index' }))   
                            loading.value = false  
                        }
                    } else {
                        errorData.status = error.response?.status ?? null
                        errorData.code = error.response?._data?.code ?? null
                        errorData.message = error.response?._data?.message ?? null
                        errorData.type = error.response?._data?.type ?? null
                        loading.value = false
                    }
                }
            }
        }

        await request()

    }


    async function loadSubscription({ loaded, noMore, noResults, error }) {
        if (loading.value === true) return {}
        const query = {}
        if (route.query.storeid) query['storeid'] = route.query.storeid
        await clearError()
        await check_new_auth_user()

        const attemptRequest = ref(0)

        async function request() {
            try {
                const dataLoaded = await $fetch(`${config.VUE_APP_API_URL_PAYMENT}me/subscriptions?lang=${locale.value}&offset=${subscriptionOffset.value}`, { 
                    retry: 2, 
                    retryDelay: 3000, 
                    query: query , 
                    headers: { "Access-Token": user_data.value.tokens.access_token } 
                })  
   
                if (dataLoaded) {
                    if (dataLoaded.data && dataLoaded.data.length > 0) {
                        subscription.value.push(...dataLoaded.data)
                        subscriptionOffset.value += dataLoaded.limit
                        loaded(dataLoaded.data.length, dataLoaded.limit)
                    }
                
                    if ((dataLoaded.data === null || dataLoaded.data.length === 0) && subscription.value.length === 0) {
                        return noResults()
                    }
                
                    if ((dataLoaded.data === null || dataLoaded.data.length === 0) && subscription.value.length > 0) {
                        return noMore()
                    }
                }
    
            } catch (err) {
                if (!err.response) {
                    errorData.status = 500
                    errorData.message = 'Internet connection!'
                    error()
                } else {
                    if(err.response.status === 401) {
                        if(attemptRequest.value < 3) {
                            attemptRequest.value += 1
                            setTimeout(() => { request() }, 3000);
                        } else {
                            localStorage.removeItem('auth_user')
                            router.replace(localePath({ name: 'index' }))   
                            error()  
                        }    
                    } else {
                        errorData.status = err.response?.status ?? null
                        errorData.code = err.response?._data?.code ?? null
                        errorData.message = err.response?._data?.message ?? null
                        errorData.type = err.response?._data?.type ?? null
                        error()
                    }    
                }
            } 
        }
        await request()
    }

    function toSubDetail(id) {
        $('#optionSubscriptionModal').modal('hide')
        const storeid = route.query.storeid ? route.query.storeid : null;
        if(storeid) {
            router.push(localePath({name: 'account-subscriptions-id', params: {id: id}, query: {'storeid': storeid}}))
        } else {
            router.push(localePath({name: 'account-subscriptions-id', params: { id: id }}))
        }
    }

    function toPremium() {
        $('#optionSubscriptionModal').modal('hide')
        const storeid = route.query.storeid ? route.query.storeid : null;
        if(storeid) {
            router.push(localePath({name: 'premium-store', query: {'id': storeid}}))
        } else {
            router.push(localePath({name: 'premium-account', query: {'id': 'me'}}))
        }
    }

    function optionActions(sub, action) {
        $('#optionSubscriptionModal').modal('hide')
        const storeid = route.query.storeid || null;
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
            // console.error('Invalid action:', action);
        }
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

   