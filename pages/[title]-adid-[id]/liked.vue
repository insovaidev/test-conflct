
<template>
    <div>
        <!-- App Bar -->
        <div v-if="!isDesktop" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-0 l_h_con_title">
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('new_text.likes') }} </p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :class="isDesktop ? 'des_container mt-3 dt_like_post' : 'margin_below_app_bar_2 no_padding'" id="height_div">

            <div class="text-center mt-3 mb-3 d-none">
                <h1 class="truncate font_18"> User like ads, {{ meta_title_liked }} - Khmer24.com </h1>
                <h2 class="truncate font_15"> Show all list user like post name {{ meta_title_liked }} - Khmer24.com </h2>
            </div>

            <template v-if="p_l_user_show && p_l_user_show.length > 0">
                <NuxtLink v-for="user in p_l_user_show" :key="user" :to="localePath({ name: 'username', params: { username: user.username } })"
                    @click="save_tracking_user({ placement: 'detail' }, { clear: 'clr_old_data' })" class="my_card card_bg_content">
                    <div class="thumb_pro_user_like">
                        <img :src="user.photo ? user.photo.small.url : empty_img_user"
                             class="img_profile_list bg_reload_img" :alt="user.name ? user.name : ''" @error="imageUrlAlt_profile">
                        <div v-if="user.online_status.is_active" class="online_sta_list_like"></div>
                    </div>
                    <div class="content_info_user">
                        <p class="truncate_wrap ct_info_name"> {{ user.name ? user.name : '' }} </p>
                        <p class="truncate_wrap ct_info_username"> {{ user.username ? '@'+user.username : '' }} </p>
                    </div>
                </NuxtLink>
            </template>
            <template v-if="!isDesktop">
                <ClientOnly>
                    <VueEternalLoading :load="show_user_like" :key="key_refresh" margin="800px">
                        <template #loading>
                            <!-- loading background have data -->
                            <div v-if="p_l_user_show.length > 0" class="text-center mt-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                            <!-- loading background data empty -->
                            <div v-else class="full_width">
                                <div v-for="index in 6" :key="index" class="my_card card_bg_content">
                                    <div class="thumb_pro_user_like animated-background rounded-circle"></div>
                                    <div class="col mt-2">
                                        <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                                        <p class="animated-background text_hei_loading_price m-0"></p>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #error="{ retry }">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="p_l_user_show.length > 0 ? '' : 'margin_below_app_bar'">
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
                                <template v-if="p_l_user_show.length === 0">
                                    <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                    <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                </template>
                            </div>
                        </template>
                    </VueEternalLoading>
                </ClientOnly>
                <br><br><br>
            </template>
            <template v-else>
                <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                    <div v-if="p_l_user_show.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else class="full_width">
                        <div v-for="index in 6" :key="index" class="my_card card_bg_content">
                            <div class="thumb_pro_user_like animated-background rounded-circle"></div>
                            <div class="col mt-2">
                                <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                                <p class="animated-background text_hei_loading_price m-0"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="des_btn_load_more">
                    <button v-if="p_l_hide_btn_load_more" @click="manually_show_user_like" class="btn">{{ $t('text_desktop.load_more') }}</button>
                    <div v-else-if="p_l_user_show.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                    </div>
                </div>
            </template>
        </div>

        <!-- Desktop space bottom -->
        <template v-if="isDesktop"><br><br><br></template>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom"} );
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");

    const user_data = ref('');
    const p_l_pageSize = useState('p_l_pageSize', () => 0);
    const p_l_user_show = useState('p_l_user_show', () => []);
    const loading = ref(false);
    const post_id = ref(route.params.id ? route.params.id : '');
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const key_refresh = ref(1);
    const p_l_hide_btn_load_more = useState('p_l_hide_btn_load_more', () => true);
    const dt_loading = ref(false);

    // -- seo title --
    const meta_title_liked = useState('meta_title_liked', () => '');

    if (process.server) {
        await show_user_like_server_side();

        var route_name = route.params.title ? route.params.title : '';
        var title_clean = route_name ? route_name.split(/-|--|---|----|-----|------/).join(" ") : 'User Likes - Khmer24.com';
        meta_title_liked.value = title_clean+', ads-'+route.params.id;
    }

    useHead({
        title: meta_title_liked.value,
        meta: [
            // -- ios --
            /*{ name: 'apple-mobile-web-app-title', content: meta_title_liked.value },*/
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, khmer24, khmer24.com, khmer24 profile, khmer24 user' },
            { name: 'description', content: 'Buy, Sell, User like this Post, '+meta_title_liked.value },

            { property: 'og:title', content: 'khmer24.com, Buy and Sell Everything In Cambodia' },
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
            check_new_auth_user();

            // --- clear old data catch ---
            let pa_con = helper.get_params_make_condition(); // get data params condition.
            if (pa_con && pa_con.clear && pa_con.clear.d_params && pa_con.clear.d_params.clear && p_l_pageSize.value > 0) {
                p_l_pageSize.value = 0;
                p_l_user_show.value = [];
                helper.clear_params_make_con('clear'); // remove data params condition.
            }

            setTimeout(function () {
                key_refresh.value += 1; // refresh VueEternalLoading (prevent stuck loading)
            },500);

            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            if (isDesktop && p_l_user_show.value.length === 0) {
                manually_show_user_like(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })

    // ---- get user sever side ----
    async function show_user_like_server_side() {
        try {
            // let URL_key = config.VUE_APP_API_URL + 'posts/'+post_id.value+'/likes'; // old
            let URL_key = config.VUE_APP_API_URL_LIKE_NEW + post_id.value; // new
            const { data: res_user_like } = await useFetch(URL_key, {
                // headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' },
                params: { offset: p_l_pageSize.value, lang: 'en' },
            })

            p_l_pageSize.value += res_user_like.value.limit;
            if (res_user_like.value.data.length) {
                p_l_user_show.value = p_l_user_show.value.concat(res_user_like.value.data);
            }

            if (isDesktop) {
                p_l_hide_btn_load_more.value = p_l_user_show.value.length < p_l_pageSize.value ? false : true; // close button loadMore
            }

        } catch (e) {
            console.log('error'); console.log(e);
        }
    }
    // ---- click load more manually ----
    function manually_show_user_like() {
      check_new_auth_user();
      dt_loading.value = true;

      // $fetch(config.VUE_APP_API_URL + 'posts/' + post_id.value + '/likes', { // old
      $fetch(config.VUE_APP_API_URL_LIKE_NEW + post_id.value, { // new
        headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''},
        params: {
          offset: p_l_pageSize.value,
          lang: 'en',
        },
      }).then(res => {
        p_l_pageSize.value += res.limit;
        if (res.data.length) { p_l_user_show.value = p_l_user_show.value.concat(res.data); }
        dt_loading.value = false;
        p_l_hide_btn_load_more.value = p_l_user_show.value.length < p_l_pageSize.value ? false : true; // close button loadMore

      }).catch(e => {
        if (!e.response) {  } else if (e.response) { // retry
          if (e.response.status === 401) {
            if (reload_q_again_1.value <= 2) {
              reload_q_again_1.value += 1;
              check_new_auth_user();
              setTimeout(() => { manually_show_user_like(); }, 3000);
            }
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
        dt_loading.value = false;
      });
    }
    // ---- check new auth user ----
    function check_new_auth_user() {
        user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }
    // ---- search show user ----
    async function show_user_like({loaded, error, noMore, noResults}, { isFirstLoad }) {

        check_new_auth_user();

        // prevent following smaller then pagesize and still request when click back to this page again
        if (p_l_pageSize.value !== 0 && p_l_user_show.value.length < p_l_pageSize.value) {
            if (p_l_user_show.value.length === 0) {
                noResults();    // close loading, show status no result
            } else {
                noMore();       // close loading
            }

        } else {
            // $fetch(config.VUE_APP_API_URL + 'posts/' + post_id.value + '/likes', { // old
            $fetch(config.VUE_APP_API_URL_LIKE_NEW + post_id.value, { // new
                headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''},
                params: {
                    offset: p_l_pageSize.value,
                    lang: 'en',
                },
            }).then(res => {

                p_l_pageSize.value += res.limit;
                if (res.data.length) {
                    p_l_user_show.value = p_l_user_show.value.concat(res.data);
                }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore');
                    }
                } else {
                    if (p_l_user_show.value.length < p_l_pageSize.value) {
                        noMore(); // close scroll.
                    } else {
                        loaded(); // scroll down load more.
                    }
                }

            }).catch(e => {
                if (!e.response) {
                    error();

                } else if (e.response) { // retry
                    if (e.response.status === 401) {
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_new_auth_user();
                            setTimeout(() => { loaded(); }, 3000);
                        }
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }
    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(event) { if (process.client && window.navigator.onLine) { event.target.src = empty_img_profile.value; } }
</script>


