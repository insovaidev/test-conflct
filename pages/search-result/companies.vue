
<template>
    <div>
        <!-- App Bar -->
        <div v-if="!isDesktop" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="screen-mobile">
                <div class="_div_nav bg_app_bar_header_ ">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col-10 l_h_con_title">
                        <p class="m-0 name_style truncate_wrap"> {{ $t('message.search') + ': ' }} {{ route.query.keyword }} </p>
                    </div>
                </div>
            </div>
            <div class="screen-desktop">
                <D_header/>
            </div>
        </div>

        <!-- Body v-else -->
        <div class="p-search mt_80 min_h max_width_form">
            <div id="height_div" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :class="isDesktop ? 'des_container mt-3 dt_S_result' : 'no_padding margin_below_app_bar_2'">
                <template v-if="l_c_company_show && l_c_company_show.length > 0">
                    <NuxtLink v-for="user in l_c_company_show" :key="user" :to="localePath({ name: 'username', params: { username: user.username } })"
                            @click="save_tracking_user({ placement: 'search' }, { clear: 'clr_old_data' })" class="my_card l_list_company_search">
                        <div class="l_thumb_profile_detail_user ml-2">
                            <img :src="user.logo ? user.logo.medium.url : empty_img_user" @error="imageUrlAlt_profile"
                                :alt="user.title ? user.title : ''" class="img_profile_list bg_reload_img">
                        </div>
                        <div class="l_search_user_div_style">
                            <div class="con-title-com">
                                <p class="truncate_wrap_2">{{ user.title ? user.title : '' }}</p>
                                <div v-if="user.is_verify"><i class="icon-check verify_icon_big"></i></div>
                            </div>
                            <p class="truncate m-0 font_13 font_light_bold c_m_grey"> {{ user.username ? '@'+user.username : '' }} </p>
                        </div>
                    </NuxtLink>
                </template>

                <template v-if="!isDesktop">
                    <ClientOnly>
                        <VueEternalLoading :load="search_show_company" :key="reset_scroll" v-model:is-initial="isInitial" margin="800px">
                            <template #loading>
                                <div v-if="l_c_company_show.length > 0" class="text-center mt-4">
                                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                </div>
                                <div v-else class="full_width load_f_mg">
                                    <div v-for="index in 6" :key="index" class="my_card l_list_company_search">
                                        <div class="l_thumb_profile_detail_user ml-2 animated-background rounded-circle"></div>
                                        <div class="l_search_user_div_style">
                                            <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                                            <p class="animated-background text_hei_loading_price m-0"></p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #error="{ retry }">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="l_c_company_show.length > 0 ? '' : 'margin_below_app_bar'">
                                    <div class="no_more_result p-2">
                                        <div class="p_bg_status">
                                            <span class="fas fa-wifi size_icon_status"></span>
                                            <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                            <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                            <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #no-more>
                                <div class="no_more_result"></div>
                            </template>
                            <template #no-results>
                                <div class="no_more_result n-m-r-mg">
                                    <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                    <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                </div>
                            </template>
                        </VueEternalLoading>
                    </ClientOnly>
                    <br><br><br>
                </template>
                <template v-else>
                    <div v-if="company_dt_loading" class="width_100 text-center mt-4" ref="targets">
                    <div v-if="l_c_company_show.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else class="full_width load_f_mg">
                        <div v-for="index in 6" :key="index" class="my_card l_list_company_search">
                        <div class="l_thumb_profile_detail_user ml-2 animated-background rounded-circle"></div>
                        <div class="l_search_user_div_style">
                            <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                            <p class="animated-background text_hei_loading_price m-0"></p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div v-else class="des_btn_load_more">
                    <button v-if="company_hide_btn_load_more" @click="manually_search_show_company" class="btn">{{ $t('text_desktop.load_more') }}</button>
                    <div v-else-if="l_c_company_show.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                    </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();                     // user route like (route).
    const router = useRouter();                   // user route like (router).
    const localePath = useLocalePath();
    const isDesktop = helper.check_is_desktop(); // check userAgent

    const l_c_pageSize = useState('l_c_pageSize', () => 0);
    const l_c_company_show = useState('l_c_company_show', () => []);

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);

    // --- clear or reset VueEternalLoading in stuck loading ---
    const isInitial = ref(true);  // value for reset scroll loader (true = reset scroll again).
    const reset_scroll = ref(1);
    const request_first = ref('');// for request the first, prevent request duplicated.

    // --- manually load more user ---
    const company_hide_btn_load_more = useState('company_hide_btn_load_more', () => true);
    const company_dt_loading = ref(false);


    if (process.server) {
        await search_show_company_server();
    }

    async function search_show_company_server() {
        try {
            const {data: res_s_c_s} = await useFetch(config.VUE_APP_API_URL + 'profiles/public_stores', {
                params: {
                    offset: l_c_pageSize.value,
                    lang: language.value ? language.value : 'en',
                    keyword: route.query.keyword,
                },
            })
            if (res_s_c_s.value) {
                if (res_s_c_s.value.data.length) {
                    l_c_company_show.value = l_c_company_show.value.concat(res_s_c_s.value.data); // concat in multiple array
                }
                l_c_pageSize.value += res_s_c_s.value.limit; // add offset
                // close btn loadMore in desktop view
                if (isDesktop) { company_hide_btn_load_more.value = l_c_company_show.value.length < l_c_pageSize.value ? false : true; }
            }

        } catch (e) {
            console.log('-----> Error Companies List <-----')
            console.log(e)
        }
    }

    // --- meta variable ---
    const meta_title_list_com = useState('meta_title_list_com', () => 'Listing Companies - Khmer24.com');

    useHead({
        title: meta_title_list_com.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_list_com.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Company, Company khmer24, List company, company in khmer, khmer24 company, khmer company', },
            { name: 'description', content: 'Buy, Sell, Find companies in khmer24, Sell your 2nd hand items on Khmer24.com' },

            { property: 'og:title', content: meta_title_list_com.value },
            {property: 'fb:app_id', content: '217361691621555'},
            {property: 'og:site_name', content: 'www.khmer24.com'},
            {property: 'og:url', content: 'https://www.khmer24.com/en/'},
            {property: 'og:type', content: 'website'},
            {property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg'},
            {property: 'og:image:width', content: '600'},
            {property: 'og:image:height', content: '600'},
            {property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.'},
        ]
    })

    onMounted(() => {
        if (process.client) {

            // -- clear old data --
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const par_msg = pa_con && pa_con.check_first_request && pa_con.check_first_request.d_params && pa_con.check_first_request.d_params.check_first_request ? pa_con.check_first_request.d_params.check_first_request : '';
            if (par_msg) {
                l_c_pageSize.value = 0;
                l_c_company_show.value = [];

                // re-render scroll again prevent still stuck loading
                setTimeout(() => {
                    if (!request_first.value) { // if requesting not reset scroll to request again.
                        reset_scroll.value += 1;
                        isInitial.value = true;
                    }
                },250);

                // clear key "check_first_request" in localstorage
                setTimeout(() => { helper.clear_params_make_con('check_first_request'); },750);
            }

            // -- ripple function --
            ripple();
            // -- remove class modal-open --
            helper.remove_class_modal_open();

            if (isDesktop && l_c_company_show.value.length === 0) {
                manually_search_show_company(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })

    // ---- search show company ----
    async function search_show_company({loaded, error, noMore, noResults}, { isFirstLoad }) {

        request_first.value = 'Clear'; // not resetScroll again.

        // prevent post smaller then pagesize and still request when lick back to this page again
        if (l_c_pageSize.value !== 0 && l_c_company_show.value.length < l_c_pageSize.value) {
            if (l_c_company_show.value.length === 0) {
                noResults(); // close loading, show status no result
            } else {
                noMore(); // close loading
            }

        } else {
            $fetch(config.VUE_APP_API_URL + 'profiles/public_stores', {
                params: {
                    offset: l_c_pageSize.value,
                    lang: '' + language.value + '',
                    keyword: '' + route.query.keyword + '',
                },
            }).then(res => {
                l_c_pageSize.value += res.limit; // add offset
                if (res.data.length) {
                    l_c_company_show.value = l_c_company_show.value.concat(res.data); // concat in multiple array
                }

                // -- tracking on google analytic --
                if (l_c_company_show.value.length <= 30 && l_c_pageSize.value === 60) {
                } // prevent saved post smaller than 30 and request two time
                else {
                    track_google_analytics(l_c_pageSize.value > 30 ? l_c_pageSize.value - 30 : 0);
                }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (l_c_company_show.value.length === 0) {
                        if (isFirstLoad) {
                            noResults(); // console.log('noResult');
                        } else {
                            noMore(); // console.log('noMore');
                        }
                    } else {
                        noMore(); // console.log('noMore');
                    }
                } else {
                    if (l_c_company_show.value.length < l_c_pageSize.value) {
                        noMore(); // console.log('noMore');
                    } else {
                        loaded(); // console.log('loaded');
                    }
                }

            }).catch(e => {
                if (!e.response) {
                    error();
                } else if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        setTimeout(() => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }
    // ---- manually get show company

    function manually_search_show_company() {
      company_dt_loading.value = true;

      $fetch(config.VUE_APP_API_URL + 'profiles/public_stores', {
        params: {
          offset: l_c_pageSize.value,
          lang: '' + language.value + '',
          keyword: '' + route.query.keyword + '',
        },
      }).then(res => {
        l_c_pageSize.value += res.limit; // add offset
        if (res.data.length) { l_c_company_show.value = l_c_company_show.value.concat(res.data); } // concat in multiple array
        company_dt_loading.value = false;
        company_hide_btn_load_more.value = l_c_company_show.value.length < l_c_pageSize.value ? false : true;

        // -- tracking on google analytic --
        if (l_c_company_show.value.length <= 30 && l_c_pageSize.value === 60) {
        } // prevent saved post smaller than 30 and request two time
        else {
          track_google_analytics(l_c_pageSize.value > 30 ? l_c_pageSize.value - 30 : 0);
        }

      }).catch(e => {
        if (!e.response) {

        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_1.value <= 2) {
            reload_q_again_1.value += 1;
            setTimeout(() => { manually_search_show_company(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
        company_dt_loading.value = false;
      });
    }

    // ---- track on google analytic ----
    function track_google_analytics (page) {
        // setTimeout(() => {
            let offset = page > 0 ? '?offset='+page : '';      // set offset of page if scroll get more data
            let page_path = route.path+offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href+offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_list_com.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('search_result/companies', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- ripple effect on UI ----
    function ripple() {
        setTimeout(function () {
            $(".arrow_back_nav").ripple();
        }, 300);
    }
    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
</script>

