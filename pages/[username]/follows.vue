
<template>
    <div :class="isDesktop ? 'des_container dt_follow_pag' : 'min_h'">
        <!-- App Bar -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bars" :class="isDesktop ? 'des_container dt_fol_tab' : ''">
            <div v-if="!isDesktop" class="_div_nav " :class="$device.isMobile ? 'bg_app_bar_header_' : 'bg-white text-black borders'">
                <div class="_pad_col_icon screen-mobile">
                    <button @click="goBack" class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_26 text-white"></i>
                    </button>
                </div>
                <div class="col l_h_con_title">
                    <div class="text-center">
                        <template v-if="u_fo_detail_user && (u_fo_detail_user.type === 'store' || route.query.from)">
                            <p class="truncate_wrap title-store">{{ route.query.from ? u_fo_detail_user.name : u_fo_detail_user.title }}</p>
                            <p class="status-follow mt-2">{{ route.query.from ? $t('new_text_3.following') : $t('new_text_3.followers') }}</p>
                        </template>
                        <template v-else>
                            <p class="name_style truncate_wrap m-0">{{ u_fo_detail_user ? u_fo_detail_user.name : '.....' }}</p>
                        </template>
                    </div>
                </div>
                <div class="s_w_app_icon screen-mobile"></div>
            </div>

            <div class="d-none">
                <h1 class="name_style truncate_wrap mt-3 mb-3">{{ u_fo_detail_user ? u_fo_detail_user.name : '.....' }}</h1>
                <h2 class="font_15 truncate_wrap mt-3 mb-3">Follows, Profile, {{ u_fo_detail_user ? u_fo_detail_user.name : '.....' }}</h2>
            </div>

            <!-- tap -->
            <div v-if="u_fo_detail_user && u_fo_detail_user.type === 'user' && !route.query.from"
                 class="tab_follows" :class="$device.isMobile ? 'bg_app_bar_header_' : 'bg-white text-black'">
                <ul class="u_nav_custom nav  " :class="$device.isMobile ? 'unset_b_t_follow u-nav-pills_m' : 'unset_b_t_follows u-nav-pills'"
                    id="pills-tab" role="tablist">
                    <li class="col nav-item p-0 text-center cusor" role="presentation" @click="change_route('followers')">
                        <a rel="nofollow" class="nav-link d-text-black" :class="route.query.type === 'following' ? '' : 'active'" id="pills-home-tab" data-toggle="pill"  role="tab" aria-controls="pills-home" aria-selected="true">
                            {{ $t('new_text_3.followers') }}
                        </a>
                    </li>
                    <li class="col nav-item p-0 text-center cusor" role="presentation" @click="change_route('following')">
                        <a rel="nofollow" class="nav-link d-text-black" :class="route.query.type === 'following' ? 'active' : ''" id="pills-profile-tab" data-toggle="pill"  role="tab" aria-controls="pills-profile" aria-selected="false">
                            {{ $t('new_text_3.following') }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Body -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :id="$device.isMobile ? 'height_div' : ''" :class="isDesktop ? '' : (u_fo_detail_user && (u_fo_detail_user.type === 'store' || route.query.from) ? 'margin_below_app_bar_2' : 'below_app_bar_100px')">
            <div class="tab-content mt_170" id="pills-tabContent">
                <!-- tap listing followers -->
                <div class="tab-pane fade" :class="route.query.type === 'following' ? '' : 'show active'" id="pills-followers" role="tabpanel" aria-labelledby="pills-home-tab">
                    <template v-if="u_fo_list_followers && u_fo_list_followers.length > 0">
                        <NuxtLink v-for="user in u_fo_list_followers" :key="user" :to="localePath({ name: 'username', params: { username: user.username } })"
                            @click="save_tracking_user({ placement: 'search' },{ clear: 'clr_old_data' })" class="my_card l_list_company_search" :class=" $device.isMobile ? '' : 'mx-0'">
                            <div class="ml-2">
                                <img :src="user.photo ? user.photo.medium.url : empty_img_user"
                                     :alt="user.name ? user.name : ''" class="img_profile_list bg_reload_img" @error="imageUrlAlt_profile">
                                <!--<div class="post_user_online l_online_status"></div>-->
                            </div>
                            <div class="l_search_user_div_style">
                                <p class="truncate ct_info_name">
                                    {{ user.name ? user.name : '' }}
                                    <!--<i class="icon-check verify_icon_big"></i>-->
                                </p>
                                <p class="truncate ct_info_username"> {{ user.username ? '@'+user.username : '' }} </p>
                            </div>
                        </NuxtLink>
                    </template>
                    <!-- scroll -->
                    <template v-if="!isDesktop">
                        <ClientOnly>
                            <VueEternalLoading :load="get_profile_followers" :key="key_refresh" v-model:is-initial="isInitial" margin="800px">
                                <template #loading>
                                    <div v-if="u_fo_list_followers.length > 0" class="text-center mt-4">
                                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                    </div>
                                    <div v-else class="full_width load_f_mg">
                                        <div v-for="index in 6" :key="index" class="my_card l_list_company_search" :class=" $device.isMobile ? '' : 'mx-0'">
                                            <div class="l_thumb_profile_detail_user ml-2 animated-background rounded-circle"></div>
                                            <div class="l_search_user_div_style">
                                                <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                                                <p class="animated-background text_hei_loading_price m-0"></p>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #error="{ retry }">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="u_fo_list_followers.length > 0 ? '' : 'margin_below_app_bar'">
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
                                    <div class="no_more_result load_follow_mg_top">
                                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                        <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                    </div>
                                </template>
                            </VueEternalLoading>
                        </ClientOnly>
                    </template>
                    <template v-else>
                        <div v-if="dt_loading_followers" class="width_100 text-center mt-4" ref="targets">
                          <div v-if="u_fo_list_followers.length > 0" class="text-center mt-4 mb-4">
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
                          <button v-if="hide_load_more_followers" @click="manually_get_followers" class="btn">{{ $t('text_desktop.load_more') }}</button>
                          <div v-else-if="u_fo_list_followers.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                            <i class="fa fa-exclamation-circle u_no_result_font"></i>
                            <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                          </div>
                        </div>
                    </template>
                </div>

                <!-- tap show following -->
                <div class="tab-pane fade" :class="route.query.type === 'following' ? 'show active' : ''" id="pills-following" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <template v-if="u_fo_list_following && u_fo_list_following.length > 0">
                        <NuxtLink v-for="user in u_fo_list_following" :key="user" :to="localePath({ name: 'username', params: { username: user.username } })"
                            @click="save_tracking_user({ placement: 'search' }, { clear: 'clr_old_data' })" class="my_card l_list_company_search" :class=" $device.isMobile ? '' : 'mx-0'">
                            <div class="ml-2">
                                <img :src="user.photo ? user.photo.medium.url : empty_img_user"
                                     :alt="user.name ? user.name : ''" class="img_profile_list bg_reload_img" @error="imageUrlAlt_profile">
                                <!--<div class="post_user_online l_online_status"></div>-->
                            </div>
                            <div class="l_search_user_div_style">
                                <p class="truncate ct_info_name">
                                    {{ user.name ? user.name : '' }}
                                    <!--<i class="icon-check verify_icon_big"></i>-->
                                </p>
                                <p class="truncate ct_info_username"> {{ user.username ? '@'+user.username : '' }} </p>
                            </div>
                        </NuxtLink>
                    </template>
                    <!-- scroll -->
                    <template v-if="!isDesktop">
                        <ClientOnly>
                            <VueEternalLoading :load="get_profile_following" :key="key_refresh" v-model:is-initial="isInitial_1" margin="800px">
                                <template #loading>
                                    <div v-if="u_fo_list_following.length > 0" class="text-center mt-4">
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
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="u_fo_list_following.length > 0 ? '' : 'margin_below_app_bar'">
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
                                    <div class="no_more_result load_follow_mg_top">
                                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                        <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                    </div>
                                </template>
                            </VueEternalLoading>
                        </ClientOnly>
                    </template>
                    <template v-else>
                        <div v-if="dt_loading_following" class="width_100 text-center mt-4" ref="targets">
                            <div v-if="u_fo_list_following.length > 0" class="text-center mt-4 mb-4">
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
                            <button v-if="hide_load_more_following" @click="manually_get_following" class="btn">{{ $t('text_desktop.load_more') }}</button>
                            <div v-else-if="u_fo_list_following.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                                <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <br><br><br>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    definePageMeta( {layout: "custom"} );
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const { public:config } = useRuntimeConfig(); // setup config env to config variable.
    const route = useRoute();
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const user_data = ref('');
    const localePath = useLocalePath();

    const u_fo_pageSize = useState('u_fo_pageSize', () => 0);
    const u_fo_list_followers = useState('u_fo_list_followers', () => []);

    const u_fo_pageSize_1 = useState('u_fo_pageSize_1', () => 0);
    const u_fo_list_following = useState('u_fo_list_following', () => []);

    const loading = ref(false);
    // --- desktop condition followers ---
    const hide_load_more_followers = useState('hide_load_more_followers', () => true);
    const dt_loading_followers = ref(false);
    // --- desktop condition following ---
    const hide_load_more_following = useState('hide_load_more_following', () => true);
    const dt_loading_following = ref(false);

    const u_fo_detail_user = useState('u_fo_detail_user', () => '');

    // --- store old data with username ---
    const old_parame_u_name = useState('old_parame_u_name', () => '');

    const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again)
    const isInitial_1 = ref(true); // value for reset scroll loader (true = reset scroll again)
    const key_refresh = ref(1); // refresh scroll again.

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);

    // --- meta variable ---
    const meta_title_follows = useState('meta_title_follows', () => '');

    if (process.server) {
        old_parame_u_name.value = route.params.username; // store username prevent clear data server when reload the page.

        if (route.query.type === 'following') {
            await get_following_server(); // server following
        } else {
            await get_followers_server(); // server followers
        }

        var r_username = route.params.username ? route.params.username : '';
        meta_title_follows.value = 'Follows '+ r_username +' - Khmer24.com';
    }

    useHead({
        title: meta_title_follows.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_follows.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell, '+meta_title_follows.value },

            {property: 'og:title', content: meta_title_follows.value},
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
            check_new_auth_user();

            // -- clear data --
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            if (pa_con && pa_con.clear && pa_con.clear.d_params && pa_con.clear.d_params.clear) {
                clear_old_data(); // clear old data.
                old_parame_u_name.value = route.params.username;
                // console.log('clear all data 1');

            } else {
                let r_u_name = route.params.username;
                if (old_parame_u_name.value !== r_u_name) {
                    clear_old_data(); // clear old data.
                    old_parame_u_name.value = route.params.username;
                    // console.log('clear all data 2');
                }
            }

            ripple();
            get_profile_info();

            // desktop get followers
            if (isDesktop && u_fo_list_followers.value.length === 0) {
                manually_get_followers();
            }
            // desktop get following
            if (isDesktop && u_fo_list_following.value.length === 0) {
              manually_get_following();
            }
        }
    })

    // --- get followers and following in server ---
    async function get_followers_server() {
        try {
            let URL_key = config.VUE_APP_API_URL + 'profiles/'+route.params.username+'/followers';
            const { data: res_followers } = await useFetch(URL_key, { key: URL_key, params: { offset: u_fo_pageSize.value, lang: 'en' } })
            u_fo_pageSize.value += res_followers.value.limit; // add offset
            if (res_followers.value.data.length) {
                u_fo_list_followers.value = u_fo_list_followers.value.concat(res_followers.value.data); // concat in multiple array
            }
            if (isDesktop) {
                hide_load_more_followers.value = u_fo_list_followers.value.length < u_fo_pageSize.value ? false : true; // close button loadMore
            }

        } catch (e) { console.log('--- error followers ---'); console.log(e); }
    }
    async function get_following_server() {
        try {
            let URL_key = config.VUE_APP_API_URL + 'profiles/'+route.params.username+'/following';
            const { data: res_following } = await useFetch(URL_key, { key: URL_key, params: { offset: u_fo_pageSize_1.value, lang: 'en' } })
            u_fo_pageSize_1.value += res_following.value.limit; // add offset
            if (res_following.value.data.length) {
                u_fo_list_following.value = u_fo_list_following.value.concat(res_following.value.data); // concat in multiple array
            }
            if (isDesktop) {
                hide_load_more_following.value = u_fo_list_following.value.length < u_fo_pageSize_1.value ? false : true; // close button loadMore
            }
        } catch (e) { console.log('--- error following ---'); console.log(e); }
    }

    // ---- get profile info ----
    function get_profile_info() {
        check_new_auth_user();
        if (!u_fo_detail_user.value) {
            // connection_error_detail.value = false; // close error connection
            $fetch(config.VUE_APP_API_URL + 'profiles/' + route.params.username, {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''}, // if user login add access token
                params: {
                    // fields: 'all',
                    // fields: 'following,followers,branches,id,logo,created_date,about,registered_date,is_verify,cover,photo,username,online_status,type,contact[all],link,name,member_type,verified,keywords,menu,is_saved,category,categories,business_hours,description,is_follow',
                    fields: 'id,type,username,member_type',
                    lang: language.value,
                },
            }).then(res => {
                u_fo_detail_user.value = res.data

            }).catch(e => {
                if (!e.response) {
                    if (reload_q_again_2.value < 2) {
                        reload_q_again_2.value += 1;
                        setTimeout(() => { get_profile_info(); }, 3000);
                    }
                } else {
                    if (e.response && e.response.status === 401) { // retry
                        if (reload_q_again_2.value <= 2) {
                            reload_q_again_2.value += 1;
                            setTimeout(() => { get_profile_info(); }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            });
        }
    }
    // ---- get profile followers ----
    async function get_profile_followers({loaded, error, noMore, noResults}, { isFirstLoad }) {
        // prevent post smaller then pagesize and still request when lick back to this page again
        if (u_fo_pageSize.value !== 0 && u_fo_list_followers.value.length < u_fo_pageSize.value) {
            if (u_fo_list_followers.value.length === 0) {
                noResults(); // close loading, show status no result
            } else {
                noMore(); // close loading
            }
            // console.log('not allow to request more');

        } else {
            // console.log('request more');
            $fetch(config.VUE_APP_API_URL + 'profiles/' + route.params.username + '/followers', {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                params: {offset: u_fo_pageSize.value, lang: 'en'},
            }).then(res => {

                u_fo_pageSize.value += res.limit; // add offset
                if (res.data.length) {
                    u_fo_list_followers.value = u_fo_list_followers.value.concat(res.data); // concat in multiple array
                }

                // -- tracking on google analytic --
                if (u_fo_list_followers.value.length <= 30 && u_fo_pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
                else { track_google_analytics(u_fo_pageSize.value > 30 ? u_fo_pageSize.value - 30 : 0); }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (u_fo_list_followers.value.length === 0) {
                        if (isFirstLoad) {
                            noResults();
                        } else {
                            noMore();
                        }
                    } else {
                        noMore();
                    }
                } else {
                    if (u_fo_list_followers.value.length < u_fo_pageSize.value) {
                        noMore(); // close scroll.
                    } else {
                        loaded(); // scroll down load more.
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
    // ---- manually Get Followers ----
    function manually_get_followers() {
        check_new_auth_user();
        dt_loading_followers.value = true;

        $fetch(config.VUE_APP_API_URL + 'profiles/' + route.params.username + '/followers', {
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          params: {offset: u_fo_pageSize.value, lang: 'en'},
        }).then(res => {

          u_fo_pageSize.value += res.limit; // add offset
          if (res.data.length) {
            u_fo_list_followers.value = u_fo_list_followers.value.concat(res.data); // concat in multiple array
          }
          dt_loading_followers.value = false;
          hide_load_more_followers.value = u_fo_list_followers.value.length < u_fo_pageSize.value ? false : true; // close button loadMore

          // -- tracking on google analytic --
          if (u_fo_list_followers.value.length <= 30 && u_fo_pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
          else { track_google_analytics(u_fo_pageSize.value > 30 ? u_fo_pageSize.value - 30 : 0); }

        }).catch(e => {
          if (!e.response) {

          } else if (e.response) {
            if (e.response.status === 401) { // retry
              if (reload_q_again_1.value <= 2) {
                reload_q_again_1.value += 1;
                setTimeout(() => { manually_get_followers(); }, 3000);
              } else {
                localStorage.removeItem('auth_user');   // remove localStorage
                VueCookieNext.removeCookie('auth_user');
                router.replace(localePath({name: 'index'}));
              }
            }
          }
          dt_loading_followers.value = false;
        });
    }
    // ---- get profile following ----
    async function get_profile_following({loaded, error, noMore, noResults}, { isFirstLoad }) {
        // prevent following smaller then pagesize and still request when click back to this page again
        if (u_fo_pageSize_1.value !== 0 && u_fo_list_following.value.length < u_fo_pageSize_1.value) {
            if (u_fo_list_following.value.length === 0) {
                noResults(); // close loading, show status no result
            } else {
                noMore(); // close loading
            }

        } else {
            $fetch(config.VUE_APP_API_URL + 'profiles/'+route.params.username+'/following', {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                params: { offset: u_fo_pageSize_1.value, lang: 'en' },
            }).then(res => {

                u_fo_pageSize_1.value += res.limit; // add offset
                if(res.data.length) {
                    u_fo_list_following.value = u_fo_list_following.value.concat(res.data); // concat in multiple array
                }

                // -- tracking on google analytic --
                if (u_fo_list_following.value.length <= 30 && u_fo_pageSize_1.value === 60) {  } // prevent saved post smaller than 30 and request two time
                else { track_google_analytics(u_fo_pageSize_1.value > 30 ? u_fo_pageSize_1.value-30 : 0); }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (u_fo_list_following.value.length === 0) {
                        if (isFirstLoad) {
                            noResults();
                        } else {
                            noMore();
                        }
                    } else { noMore(); }
                } else {
                    if (u_fo_list_following.value.length < u_fo_pageSize_1.value) {
                        noMore(); // close scroll.
                    } else {
                        loaded(); // scroll down load more.
                    }
                }

            }).catch(e => {
                if (!e.response) {
                    error();
                } else if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        setTimeout( () => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }
    // ---- manually Get Followers ----
    function manually_get_following() {
        check_new_auth_user();
        dt_loading_following.value = true;
        $fetch(config.VUE_APP_API_URL + 'profiles/'+route.params.username+'/following', {
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            params: { offset: u_fo_pageSize_1.value, lang: 'en' },
        }).then(res => {

            u_fo_pageSize_1.value += res.limit; // add offset
            if(res.data.length) {
              u_fo_list_following.value = u_fo_list_following.value.concat(res.data); // concat in multiple array
            }
            dt_loading_following.value = false;
            hide_load_more_following.value = u_fo_list_following.value.length < u_fo_pageSize_1.value ? false : true; // close button loadMore

            // -- tracking on google analytic --
            if (u_fo_list_following.value.length <= 30 && u_fo_pageSize_1.value === 60) {  } // prevent saved post smaller than 30 and request two time
            else { track_google_analytics(u_fo_pageSize_1.value > 30 ? u_fo_pageSize_1.value-30 : 0); }

        }).catch(e => {
            if (!e.response) {

            } else if (e.response) {
                if (e.response.status === 401) { // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        setTimeout( () => { manually_get_following(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }
            dt_loading_following.value = false;
        });
    }
    // ---- create old data ----
    function clear_old_data() {
        u_fo_pageSize.value = 0;
        u_fo_list_followers.value = [];
        u_fo_detail_user.value = '';
        u_fo_pageSize_1.value = 0;
        u_fo_list_following.value = [];
        helper.clear_params_make_con('clear'); // remove "clear" params condition.

        setTimeout(() => {
            isInitial.value = true;
            isInitial_1.value = true;
            key_refresh.value += 1;
            // console.log('clear get listing')
        },1000);
    }
    // ---- track on google analytic ----
    function track_google_analytics(page) {
        // setTimeout(() => {
            let offset = page > 0 ? '?offset='+page : '';      // set offset of page if scroll get more data
            let page_path = route.path+offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href+offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_follows.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event(route.params.username+'/follows', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- change route ----
    function change_route(condition) {
        if (route.query.type !== condition) {
            router.replace(localePath({ name: 'username-follows', params: { username: u_fo_detail_user.value.username }, query: { type: condition } }));
        }
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- ripple effect on UI ----
    function ripple() { setTimeout(function () { $(".arrow_back_nav").ripple(); }, 300); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
</script>
