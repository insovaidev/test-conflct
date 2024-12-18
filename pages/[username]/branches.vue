
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
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('new_text_2.branches') }} </p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="flex_all_post" :class="isDesktop ? 'des_container mt-3 dt_branches_user' : 'margin_below_app_bar'" id="height_div">

            <article v-for="(branch, index) of u_b_branches" :key="index" class="col-12 no_padding l-branches" :class="isDesktop ? 'mb-2' : ''">
                <div class="l-branches-con" :class="isDesktop ? 'dt_border' : ''">
                    <div>
                        <div class="de-flex-q-c-title">
                            <p> {{ branch.title ? branch.title : '' }} </p>
                        </div>
                        <div class="l-b-c-sub">
                            <p v-if="branch.email">
                                <i class="icon-mail"></i>
                                <a rel="nofollow" v-bind:href="'mailto:'+branch.email" class="text_overview parent_color">{{ branch.email }}</a>
                            </p>
                            <p v-if="branch.phone">
                                <i class="icon-phone1"></i>
                                <a rel="nofollow" v-for="p_num in branch.phone" :key="p_num" class="parent_color" v-bind:href="'tel:'+p_num">{{ p_num }} &nbsp;&nbsp;</a>
                            </p>
                            <div v-if="branch.map" @click.stop.prevent="link_google_map(branch.map.x, branch.map.y)" class="l-b-c-sub-loc cur_sur">
                                <p><i class="icon-map-pin"></i></p>
                                <div class="loc_overview">
                                    <p class="m-0">{{ language === 'en' ? branch.location.en_name : branch.location.km_name }}</p>
                                    <p class="m-0">{{ branch.address ? branch.address : '' }}</p>
                                    <span class="parent_color get_direction"> Get Directions </span>
                                </div>
                            </div>
                            <div v-else class="l-b-c-sub-loc">
                                <p><i class="icon-map-pin"></i></p>
                                <div class="loc_overview">
                                    <p class="m-0">{{ language === 'en' ? branch.location.en_name : branch.location.km_name }}</p>
                                    <p class="m-0">{{ branch.address ? branch.address : '' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <template v-if="!isDesktop">
                <ClientOnly>
                    <VueEternalLoading :load="show_branches" margin="800px">
                        <template #loading>
                            <!-- loading when have data -->
                            <div v-if="u_b_branches.length > 0" class="text-center mt-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                            <!-- loading when data empty -->
                            <div v-else class="full_width">
                                <div v-for="s in 4" :key="s" class="col-12 no_padding">
                                    <div class="f-w-pad">
                                        <div class="my_card pad_card_ _flex_">
                                            <div class="animated-background">
                                                <div class="f-w-width"></div>
                                            </div>
                                            <div class="width_100 pb-0 pt-1 pl-3">
                                                <div class="animated-background mb-2 text_hei_loading_title"></div>
                                                <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                                <div class="_flex_">
                                                    <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                                                    <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                                                </div>
                                                <div class="animated-background mb-2 text_hei_loading"></div>
                                                <div class="animated-background text_hei_loading"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #error="{ retry }">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="u_b_branches.length > 0 ? '' : 'margin_below_app_bar'">
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
                                <template v-if="u_b_branches.length === 0">
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
                    <div v-if="u_b_branches.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else class="full_width">
                    <div v-for="s in 4" :key="s" class="col-12 no_padding">
                      <div class="f-w-pad">
                        <div class="my_card pad_card_ _flex_">
                          <div class="animated-background">
                            <div class="f-w-width"></div>
                          </div>
                          <div class="width_100 pb-0 pt-1 pl-3">
                            <div class="animated-background mb-2 text_hei_loading_title"></div>
                            <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                            <div class="_flex_">
                              <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                              <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                            </div>
                            <div class="animated-background mb-2 text_hei_loading"></div>
                            <div class="animated-background text_hei_loading"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="des_btn_load_more width_100 text-center">
                    <button v-if="b_u_hide_btn_load_more" @click="manually_show_branches" class="btn">{{ $t('text_desktop.load_more') }}</button>
                    <div v-else-if="u_b_branches.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                    </div>
                </div>
            </template>

            <!-- Desktop space bottom -->
            <template v-if="isDesktop"><br><br><br></template>
        </div>

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style mg-mo-auto" role="document" >
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status b-s-h-con">
                        <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
                        <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
                    </div>
                    <div class="modal-footer u_safety_footer" >
                        <div data-bs-dismiss="modal" class="btn text-primary cur_sur"> {{ $t('message.close') }} </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show error connection -->

        <!-- show loading full screen -->
        <div v-if="loading_field" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
            </div>
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const u_b_pageSize = useState('u_b_pageSize', () => 0);
    const u_b_branches = useState('u_b_branches', () => []);
    const loading_field = ref(false);
    const message_success = ref('');
    const error_or_success_message = ref(true);
    const store_username = ref(route.params.username ? route.params.username : '');
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    // --- share tracking ---
    const current_index = ref('');
    // --- check screen height ---
    const stop_auto_request = ref(true);
    // --- load more button condition ---
    const b_u_hide_btn_load_more = useState('b_u_hide_btn_load_more', () => true);
    const dt_loading = ref(false);

    // --- meta variable ---
    const meta_title_l_bra = useState('meta_title_l_bra', () => 'Branches Listing - Khmer24.com');

    if (process.server) {
        await show_branches_server_side();
    }

    useHead({
        title: meta_title_l_bra.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_l_bra.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

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

            ripple();
            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            if (isDesktop && u_b_branches.value.length === 0) {
                manually_show_branches(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })

    // ---- get branches server side ----
    async function show_branches_server_side() {
        try {
            let URL_key = config.VUE_APP_API_URL + 'profiles/'+store_username.value +'/branches';
            const { data: res_br } = await useFetch(URL_key, {
                key: URL_key,
                params: { offset: u_b_pageSize.value, lang: language.value }
            })

            u_b_pageSize.value += res_br.value.limit; // add offset
            if (res_br.value.data.length) {
                u_b_branches.value = u_b_branches.value.concat(res_br.value.data); // concat in multiple array
            }

            if (isDesktop) {
                b_u_hide_btn_load_more.value = u_b_branches.value.length < u_b_pageSize.value ? false : true; // close button loadMore
            }

        } catch (e) { console.log('error'); console.log(e); }
    }

    // ---- get branches profile ----
    async function show_branches({loaded, error, noMore, noResults}, { isFirstLoad }) {

        $fetch(config.VUE_APP_API_URL + 'profiles/'+store_username.value +'/branches', {
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            params: { offset: u_b_pageSize.value, lang: language.value },
        }).then(res => {

            u_b_pageSize.value += res.limit; // add offset
            if (res.data.length) {
                u_b_branches.value = u_b_branches.value.concat(res.data); // concat in multiple array
            }

            // -- tracking on google analytic --
            if (u_b_branches.value.length <= 10 && u_b_pageSize.value === 20) {  } // prevent branches post smaller than 10 and request two time
            else { track_google_analytics(u_b_pageSize.value > 10 ? u_b_pageSize.value : 0); }

            // -- check stop scroll or scroll more --
            if (res.data.length === 0) {
                if (isFirstLoad) {
                    noResults(); // console.log('noResult');
                } else {
                    noMore(); // console.log('noMore');
                }
            } else {
                if (u_b_branches.value.length < u_b_pageSize.value) {
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
                    setTimeout( () => { loaded(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
        });
    }
    // ---- click load more manually ----
    function manually_show_branches() {
        dt_loading.value = true;
        $fetch(config.VUE_APP_API_URL + 'profiles/'+store_username.value +'/branches', {
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            params: { offset: u_b_pageSize.value, lang: language.value },
        }).then(res => {

            u_b_pageSize.value += res.limit; // add offset
            if (res.data.length) {
              u_b_branches.value = u_b_branches.value.concat(res.data); // concat in multiple array
            }
            dt_loading.value = false;
            b_u_hide_btn_load_more.value = u_b_branches.value.length < u_b_pageSize.value ? false : true; // close button loadMore

            // -- tracking on google analytic --
            if (u_b_branches.value.length <= 10 && u_b_pageSize.value === 20) {  } // prevent branches post smaller than 10 and request two time
            else { track_google_analytics(u_b_pageSize.value > 10 ? u_b_pageSize.value : 0); }


        }).catch(e => {
            if (!e.response) {  } else if (e.response && e.response.status === 401) { // retry
                if (reload_q_again_1.value <= 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { manually_show_branches(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');   // remove localStorage
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
            dt_loading.value = false;
        });
    }
    // ---- show map ----
    function link_google_map(x, y) {
        var url = window.open('https://maps.google.com/maps?q='+x+','+y, '_blank');
        url.focus();
    }
    // ---- track on google analytic ----
    function track_google_analytics (per_page) {
        // setTimeout(() => {
            let offset = per_page > 0 ? '?offset=' + per_page : ''; // set offset of page if scroll get more data
            let page_path = route.path + offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_l_bra.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Public_branches', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- ripple effect on UI ----
    function ripple() { setTimeout(function () { $(".arrow_back_nav,.cl_ripple").ripple(); }, 300); }
</script>


