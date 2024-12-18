
<template>
    <div>
        <div :class="isDesktop ? 'des_container dt_S_result' : 'max_width_form'">
            <!-- App Bar -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isMobile ? 'fix_app_bar' : 'dt_fix_app_bar'">
                <div v-if="isMobile" class="_div_nav bg_app_bar_header_ ">
                    <div class="_pad_col_icon">
                        <button @click="goBack" class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_26 text-white"></i>
                        </button>
                    </div>
                    <div class="col l_h_con_title">
                        <div class="text-center">
                            <p class="name_style truncate_wrap m-0"> {{ $t('message.search') + ': ' }} {{ keyword }} </p>
                        </div>
                    </div>
                    <div class="_pad_col_icon text-center" @click="show_pop_up_search">
                        <button class="btn mg_icon_search" aria-label="search">
                            <i class="fas ion-ios-search-strong font_26 text-white"></i>
                        </button>
                    </div>
                </div>
                <!-- button user, company and post -->
                <div class=" w_1104 ">
                    <div class="mt-60">
                        <nav class="navbar s_btn_on_top unset_height max_width_form borders">
                            <div class="col">
                                <NuxtLink :to="localePath({ name: 'search-result-users', query: { keyword: keyword } })"
                                        @click="save_track_optional('check_first_request', { check_first_request: 'first_reload' })" class="btn btn-sm width_100 s_btn_custom rip_btn">
                                    <p class="s_m_r_user font_15"> {{ $t('message.user') }} </p>
                                </NuxtLink>
                            </div>
                            <div class="col">
                                <NuxtLink :to="localePath({ name: 'search-result-companies', query: { keyword: keyword } })"
                                        @click="save_track_optional('check_first_request', { check_first_request: 'first_reload' })" class="btn btn-sm width_100 s_btn_custom rip_btn">
                                    <p class="s_m_r_user font_15"> {{ $t('message.company') }} </p>
                                </NuxtLink>
                            </div>
                            <div class="col">
                                <NuxtLink :to="localePath({ name: 'search', query: { keyword: keyword } })"
                                        @click="save_track_optional('first', { first: 'the_first' })" class="btn btn-sm width_100 s_btn_custom rip_btn">
                                    <p class="s_m_r_user font_15"> {{ $t('message.post') }} </p>
                                </NuxtLink>
                            </div>
                            <div v-if="isDesktop" class="col-1 dt_re_s">
                                <button @click="show_pop_up_search" class="btn btn-outline-secondary" aria-label="search">
                                    <i class="fas ion-ios-search-strong font_26"></i>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Body -->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isMobile ? 's_bottom_app_bar' : 'mt-110'">
                <div class="min_h" :class="s_r_posts_by_search && s_r_posts_by_search.length > 0 ? 'mr_ml_-10' : ''">
                    <!-- company or store have related search -->
                    <div v-if="loading_store" class="my_card s_card_user_search">
                        <div class="animated-background text_hei_loading_24 width_30"></div>
                        <div v-for="user in 2" :key="user" class="s_list_user_search">
                            <div class="mr-2">
                                <div class="l_thumb_profile_detail_user animated-background rounded-circle"></div>
                            </div>
                            <div class="col mt-1 p-0">
                                <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                                <p class="animated-background text_hei_loading_price m-0 width_70"></p>
                            </div>
                        </div>
                    </div>
                    <div v-else>

                        <!-- error connection_error_company -->
                        <div v-if="connection_error_company" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                            <div class="no_more_result p-2">
                                <div class="p_bg_status">
                                    <span class="fas fa-wifi size_icon_status"></span>
                                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                    <button @click="retry_company()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="s_r_company_or_store && s_r_company_or_store.length > 0" class="my_card s_card_user_search">
                            <p class="s_r_group_title"> {{ $t('message.company') }} </p>
                            <template v-for="(company, index) in s_r_company_or_store" :key="index">
                                <NuxtLink :to="localePath({ name: 'username', params: { username: company.username } })"
                                        :class="s_r_company_or_store.length === index+1 ? 'border_unset' : ''"
                                        @click="save_tracking_user({ placement: 'search', is_search: { keyword: keyword }}, { clear: 'clr_old_data' })"
                                        class="s_list_user_search h-v-mouse">
                                    <div class="l_thumb_profile_detail_user bg_reload_img">
                                        <img :src="company.logo && company.logo.small ? company.logo.small.url : empty_img_user"
                                            :alt="company.title ? company.title : ''" class="s_img_profile_user border_unset" @error="imageUrlAlt_profile">
                                    </div>
                                    <div class="s_search_user_div_style">
                                        <div class="con-title-com">
                                            <p class="truncate_wrap_2">{{ company.title ? company.title : '' }}</p>
                                            <div v-if="company.is_verify"><i class="icon-check verify_icon_big"></i></div>
                                        </div>
                                        <p class="truncate_wrap m-0 font_12 c_m_grey">{{ company.username ? '@'+company.username : '' }}</p>
                                    </div>
                                </NuxtLink>
                            </template>
                            <template v-if="s_r_company_or_store && s_r_company_or_store.length >= 3">
                                <NuxtLink :to="localePath({ name: 'search-result-companies', query: { keyword: keyword } })"
                                        @click="save_track_optional('check_first_request', { check_first_request: 'first_reload' })" class="btn btn-sm form-control s_btn_custom mt-1 rip_btn">
                                    <p class="s_m_r_user"> {{ $t('message.view_more') }} </p>
                                </NuxtLink>
                            </template>
                        </div>
                    </div>


                    <!-- user have related search -->
                    <div v-if="loading_user" class="my_card s_card_user_search mt-3 mb-3">
                        <div class="animated-background text_hei_loading_24 width_30"></div>
                        <div v-for="user in 2" :key="user" class="s_list_user_search">
                            <div class="mr-2">
                                <div class="l_thumb_profile_detail_user animated-background rounded-circle"></div>
                            </div>
                            <div class="col mt-1 p-0">
                                <p class="animated-background text_hei_loading_title mb-2 mt-1"></p>
                                <p class="animated-background text_hei_loading_price m-0 width_70"></p>
                            </div>
                        </div>
                    </div>
                    <div v-else>

                        <!-- error connection_error_user -->
                        <div v-if="connection_error_user" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                            <div class="no_more_result p-2">
                                <div class="p_bg_status">
                                    <span class="fas fa-wifi size_icon_status"></span>
                                    <p class="mt-4 font_bold font_21  mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                    <button @click="retry_user()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="s_r_user_show && s_r_user_show.length > 0" class="my_card s_card_user_search mg-top-btn-plus">
                            <p class="s_r_group_title"> {{ $t('message.user') }} </p>
                            <template v-for="(users, index) in s_r_user_show" :key="index">
                                <NuxtLink :to="localePath({ name: 'username', params: { username: users.username } })" :class="s_r_user_show.length === index+1 ? 'border_unset': ''"
                                            @click="save_tracking_user({ placement: 'search', is_search: { keyword: keyword } }, { clear: 'clr_old_data' })" class="s_list_user_search h-v-mouse">
                                    <div class="l_thumb_profile_detail_user">
                                        <img :src="users.photo && users.photo.small ? users.photo.small.url : empty_img_user"
                                            :alt="users.name ? users.name : ''" class="s_img_profile_user bg_reload_img" @error="imageUrlAlt_profile">
                                    </div>
                                    <div class="s_search_user_div_style">
                                        <div class="con-title-com">
                                            <p class="truncate_wrap_2">{{ users.name ? users.name : '' }}</p>
                                            <div v-if="users.is_verify"><i class="icon-check verify_icon_big"></i></div>
                                        </div>
                                        <p class="truncate_wrap m-0 font_14 font_light_bold c_m_grey">{{ users.username ? '@'+users.username : '' }}</p>
                                    </div>
                                </NuxtLink>
                            </template>
                            <template v-if="s_r_user_show && s_r_user_show.length >= 3">
                                <NuxtLink :to="localePath({ name: 'search-result-users', query: { keyword: keyword } })"
                                        @click="save_track_optional('check_first_request', { check_first_request: 'first_reload' })" class="btn btn-sm form-control s_btn_custom mt-1 rip_btn">
                                    <p class="s_m_r_user"> {{ $t('message.view_more') }} </p>
                                </NuxtLink>
                            </template>
                        </div>
                    </div>

                    <!-- posts have related search -->
                    <div v-if="loading_post" class="m-r-p-sm-pad">
                        <div v-for="ha in 4" :key="ha" class="categories_padding">
                            <div class="my_card padding_my_card">
                                <div class="s_profile_user_post_list">
                                    <div class="style_flex p-0">
                                        <div class="col-1 p-0">
                                            <div class="animated-background rounded-circle" style="width: 25px;height: 25px;margin: 0 auto;"></div>
                                        </div>
                                        <div class="col-7 p-0 text_hei_loading_title animated-background mt-1 ml-2"></div>
                                    </div>
                                </div>
                                <div class="_flex_ mt-1">
                                    <div class="animated-background s_w_h_post_list"></div>
                                    <div class="col pb-0 pt-1">
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
                    <div v-else>

                        <!-- error connection_error_posts -->
                        <div v-if="connection_error_posts" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                            <div class="no_more_result p-2">
                                <div class="p_bg_status">
                                    <span class="fas fa-wifi size_icon_status"></span>
                                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                    <button @click="retry_post()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                </div>
                            </div>
                        </div>

                        <template v-if="s_r_posts_by_search && s_r_posts_by_search.length > 0">
                            <div class="text-pad-top">
                                <p class="s_r_group_p_title"> {{ $t('message.post') }} </p>
                            </div>
                            <div class="con-pad-lr">
                                <div v-for="(post, index) in s_r_posts_by_search" :key="index" class="_flex_ mt-2">
                                    <div class="col-12 no_padding">
                                        <div class="my_card categories_padding mb-1">
                                            <NuxtLink class="style_flex pad_content_post" :to="localePath({ name: 'title-adid-id', params: { title: clean_title(post.data.title), id: post.data.id } })"
                                                @click="save_track_optional('tracking', { placement: 'search', display_type: 'list', item_count: s_r_posts_by_search.length, item_per_page: 30, current_index: index, is_search: { keyword: keyword } })">
                                                <div class="bg_reload_img s_w_h_post_list">
                                                    <img :src="post.data && post.data.thumbnail ? post.data.thumbnail : empty_img_post"
                                                        :alt="post.data && post.data.title ? post.data.title : ''" class="s_img_post_by" @error="imageUrlAlt_post">
                                                </div>
                                                <div class="col p-0 pl-3">
                                                    <p class="a_truncate_wrap m-0 font_16 c_cate_text_wrap font_light_bold p-0 dt_res_title">{{ post.data && post.data.title ? post.data.title : '' }}</p>
                                                    <p class="pro_post_hour c_m_grey mt-1 dt_res_hours">{{ post.data && post.data.location ? (language === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}</p>
                                                    <p class="pro_post_hour c_m_grey dt_res_hours">{{ post.data && post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}</p>
                                                    <p class="color_red full_width font_14 m-0 mt-1 dt_res_price">
                                                        {{ post.data && post.data.price > 0 ? (post.data.category && post.data.category.parent == 2 ? '$'+convert_price(post.data.price)+'+' : '$'+convert_price(post.data.price)) : $t('new_text.negotiable') }}
                                                    </p>
                                                    <!--<p v-else class="color_red full_width m-0 mt-1 font_16"> Inbox for Price </p>-->
                                                </div>
                                            </NuxtLink>
                                        </div>
                                        <ClientOnly>
                                            <div v-observe-visibility="{
                                                callback: (isVisible, entry) => visibilityChanged(isVisible, entry, { id: post.data.id, index: index, type: 'list' }),
                                                once: true,       // show and get only new data in view port, if scroll up not count old data.
                                                // throttle: 700,   // delay timeout for scroll (1000 = 1second).
                                            }"></div>
                                        </ClientOnly>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div v-if="s_r_posts_by_search && s_r_posts_by_search.length >= 30" class="categories_padding m-2">
                            <NuxtLink :to="localePath({ name: 'search', query: { keyword: keyword } })" @click="save_track_optional('first', { first: 'the_first', page_size: 30 })" class="btn s_btn_view_more">
                                {{ $t('message.view_more') }}
                            </NuxtLink>
                        </div>
                        <br v-else>
                    </div>

                    <!-- if no data -->
                    <div v-if="(s_r_user_show && s_r_user_show.length <= 0) && (s_r_company_or_store && s_r_company_or_store.length <= 0) && (s_r_posts_by_search && s_r_posts_by_search.length <= 0)">
                        <!-- <p class="no_more_result"> {{ $t('message.no_result') }} </p> -->
                        <div class="no_more_result " :class="isMobile ? 'n-m-r-mg' : 'p_y_9 bg-white'">
                            <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                            <p class="no_more_result mt-2">Your search " {{ route.query.keyword }} " did not match any listings</p>
                        </div>
                    </div>

                    <br><br><br>
                </div>
            </div>

            <!-- modal Search -->
            <Modal_search :clear_search_suggestion="clear_val_suggestion_popup"/>
        </div>
    </div>
</template>

<script setup>
    import Modal_search from "/components/Pop_up_search_key_word";
    import helper from "/helper";
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';

    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();           // user route like (this.$route).
    const router = useRouter();         // user route like (this.$router).

    const s_r_user_show = useState('s_r_user_show', () => []);
    const s_r_company_or_store = useState('s_r_company_or_store', () => []);
    const s_r_posts_by_search = useState('s_r_posts_by_search', () => []);
    const keyword = ref(route.query && route.query.keyword ? route.query.keyword : '');
    const s_r_old_keyword = useState('s_r_old_keyword', () => '');

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const empty_img_profile = ref("/icon/user-icon1.png");
    const empty_img_user = ref("/icon/user-icon.png");
    const empty_img_post = ref("/icon/empty_post.png");
    const loading_user = ref(false);
    const loading_store = ref(false);
    const loading_post = ref(false);

    const connection_error_user = ref(false);
    const connection_error_company = ref(false);
    const connection_error_posts = ref(false);

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);

    // --- arr impression check id ---
    const arr_impression = ref([]);
    const timer_auto_impression = ref('');
    const check_sent = ref(true); // true = allow setInterval; false = not allow setInterval.

    const clear_val_suggestion_popup = ref(0);

    // --- meta variable ---
    const meta_title_s_result = useState('meta_title_s_result', () => 'Search Result - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    if (process.server) {
        await search_show_user();
        await search_company_or_store();
        await get_post_by_search();
    }

    useHead({
        title: meta_title_s_result.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_s_result.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell' },
            { name: 'description', content: 'Buy, Sell' },

            {property: 'og:title', content: meta_title_s_result.value},
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
            hidOverflow()
            // --- save old data when click back on detail user, company or post ---
            if (keyword.value && keyword.value !== s_r_old_keyword.value) {    // -- new key --
                s_r_old_keyword.value = keyword.value;
                search_show_user();
                search_company_or_store();
                get_post_by_search();
            }

            ripple();
            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            // -- tracking search to API khmer24 --
            visibility_tracking_search();

            // -- tracking on google analytic --
            track_google_analytics();
        }
    })

    watch(() => route.query, () => {
        const route_name = helper.clear_prefix_route_name(route.name);
        if (route_name === 'search-result') {
            keyword.value = route.query && route.query.keyword ? route.query.keyword : '';
            s_r_old_keyword.value = keyword.value; // store new key when router change
            add_keyword_to_localstorage();
            search_show_user();
            search_company_or_store();
            get_post_by_search();
            ripple();

            // -- tracking search to API khmer24 --
            visibility_tracking_search();
        }
    })

    function hidOverflow(){
        $('body').css('overflow','unset')
    }

    function add_keyword_to_localstorage() {
        let check = localStorage.getItem('storedData');
        let text_search = route.query.keyword
        let tr_search = text_search.trim(); // cut off space
        if (!check || check == null) {
            localStorage.setItem("storedData", JSON.stringify([tr_search])); // save
        } else {
            let old_data_localstorage = JSON.parse(check);
            // -- check duplicate value --
            for (var i = 0; i < old_data_localstorage.length; i++) {
                if (old_data_localstorage[i].toLowerCase() == tr_search.toLowerCase()) {
                    old_data_localstorage.splice(i, 1); // remove the duplicate index
                }
            }
            // -- then push new value to array --
            old_data_localstorage.push(tr_search);  // add new value to array
            localStorage.setItem("storedData", JSON.stringify(old_data_localstorage)); // save
        }
        // --- add more key word to localStorage ---
        var revers_arr = JSON.parse(localStorage.getItem('storedData'));
    }
    // ---- search tracking ----
    function visibility_tracking_search() {
        helper.tracking_action('', '', 'search', 'search', 'list', { "keyword": keyword.value });
    }

    // ---- impression tracking ----
    function visibilityChanged (isVisible, entry, data) {
        // isVisible => is true mean new data, false mean old data.
        if (isVisible) { // new data
            arr_impression.value.push({ id: data.id, current_index: data.index });

            // -- timer not exist && arr_impression not empty && check_sent is true, must set interval --
            if (!timer_auto_impression.value && arr_impression.value.length > 0 && check_sent.value) {

                // -- start setInterval in 3 second --
                timer_auto_impression.value = setInterval( async () => {

                    let arr_tmp = arr_impression.value;  // set arr_impression to tmp array.
                    arr_impression.value = [];           // clear arr_impression.
                    check_sent.value = false;            // not allow to setInterval again.
                    clearInterval(timer_auto_impression.value); timer_auto_impression.value = ''; // clear auto impression

                    let res = await helper.tracking_action('impression', { post_impression: arr_tmp, item_count: s_r_posts_by_search.value.length, item_per_page: '30' },
                        'impression', 'search', data.type, { "keyword": keyword.value });

                    // console.log(res);
                    if (res && res.status === 200) {
                        check_sent.value = true;          // allow to setInterval again if success.
                    } else {
                        $.each(arr_tmp, (k, v) => {
                            arr_impression.value.push(v); // push id to old arr_impression again if response error in request tracking impression.
                        });
                        check_sent.value = true;          // allow to setInterval again if error.
                        // console.log(arr_impression.value);
                    }

                }, 3000);
            }
        }
    }

    // ---- track on google analytic ----
    function track_google_analytics () {
        // setTimeout(() => {
            let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_s_result.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('search_result', data);
            // -- page_view --
            pageview(data);
        // },50);
    }

    // ---- click retry user ----
    function retry_user() {
        if(window.navigator.onLine) {
            search_show_user();
        }
    }
    // ---- search show user ----
    async function search_show_user() {
        if (process.server || window.navigator.onLine) {
            connection_error_user.value = false;
            loading_user.value = true;
            try {
                let the_url = config.VUE_APP_API_URL_MOBI + 'profiles/public_users?keyword=' + keyword.value + '&lang=en&limit=5';
                const { data: res_s_r_user } = await useFetch(the_url, { key: the_url })
                s_r_user_show.value = res_s_r_user.value ? res_s_r_user.value.data : [];
                loading_user.value = false;

            } catch (e) {
                if (process.server) {
                    console.log('------> Error Search_result Users list <------')
                    console.log(e)

                } else {
                    if (!e.response) {
                        if (reload_q_again_1.value < 2) {
                            reload_q_again_1.value += 1;
                            setTimeout(() => {
                                search_show_user();
                            }, 3000);
                        } else {
                            loading_user.value = false; // close loading
                            connection_error_user.value = true; // show connection error
                        }

                    } else if (e.response && e.response.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            setTimeout(() => {
                                search_show_user();
                            }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            }
        } else {
            loading_user.value = false; // close loading
            connection_error_user.value = true; // show connection error
        }
    }

    // ---- click retry company ----
    function retry_company() {
        if(window.navigator.onLine) {
            search_company_or_store();
        }
    }
    // ---- search company or store ----
    async function search_company_or_store() {
        if (process.server || window.navigator.onLine) {
            connection_error_company.value = false;
            loading_store.value = true;

            try {
                let the_url = config.VUE_APP_API_URL_MOBI + 'profiles/public_stores?keyword=' + keyword.value + '&lang=en&limit=5';
                const { data: res_s_r_store } = await useFetch(the_url, { key: the_url })
                s_r_company_or_store.value = res_s_r_store.value ? res_s_r_store.value.data : [];
                loading_store.value = false;

            } catch (error) {
                if (process.server) {
                    console.log('------> Error Search_result Users list <------')
                    console.log(error)

                } else {
                    if (!error.response) {
                        if (reload_q_again_2.value < 2) {
                            reload_q_again_2.value += 1;
                            setTimeout(() => {
                                search_company_or_store();
                            }, 3000);
                        } else {
                            loading_store.value = false; // close loading
                            connection_error_company.value = true; // show connection error
                        }

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_2.value <= 2) {
                            reload_q_again_2.value += 1;
                            setTimeout(() => {
                                search_company_or_store();
                            }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            }
        } else {
            loading_store.value = false; // close loading
            connection_error_company.value = true; // show connection error
        }
    }

    // ---- click retry posts ----
    function retry_post() {
        if(window.navigator.onLine) {
            get_post_by_search();
        }
    }
    // ---- Get Post By Search ----
    async function get_post_by_search() {
        if (process.server || window.navigator.onLine) {
            connection_error_posts.value = false;
            loading_post.value = true;

            try {
                const { data: res_s_r_posts } = await useFetch(config.VUE_APP_API_URL_POST_NEW + 'feed', {
                    params: {
                        fields: 'thumbnail,location,photos,user,store,renew_date,is_like,category',
                        lang: 'en',
                        keyword: '' + keyword.value + '',
                    },
                })
                s_r_posts_by_search.value = res_s_r_posts.value ? res_s_r_posts.value.data : [];
                loading_post.value = false;

            } catch (error) {
                if (process.server) {
                    console.log('------> Error search_result posts list <------')
                    console.log(error)

                } else {
                    if (!error.response) {
                        if (reload_q_again_3.value < 2) {
                            reload_q_again_3.value += 1;
                            setTimeout(() => {
                                get_post_by_search();
                            }, 3000);
                        } else {
                            loading_post.value = false; // close loading
                            connection_error_posts.value = true; // show connection error
                        }

                    } else if (error.response && error.response.status === 401) { // retry
                        if (reload_q_again_3.value <= 2) {
                            reload_q_again_3.value += 1;
                            setTimeout(() => {
                                get_post_by_search();
                            }, 3000);
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            VueCookieNext.removeCookie('auth_user');
                            router.replace(localePath({name: 'index'}));
                        }
                    }
                }
            }
        } else {
            loading_post.value = false; // close loading
            connection_error_posts.value = true; // show connection error
        }
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- show modal search ----
    function show_pop_up_search() {
        $('#show_modal_saerch').modal('show');
        $('#_search_').focus();

        // change prop value to clear suggestion on search popup
        clear_val_suggestion_popup.value++; // if value change, then action else no action.
    }
    // ---- convert price ----
    function convert_price(price) { return helper.convert_price(price); }
    // ---- clean title ----
    function clean_title(title) { return helper.check_special_char(title); }
    // ---- change format date to time ago ----
    function convertFromNow(date) { return helper.check_date_ago(date, 'check_current_year'); }
    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }
    // ---- user tracking ----
    function save_tracking_user(user_track, clear_old) {
        helper.params_make_condition('tracking', user_track);
        helper.params_make_condition('clear', clear_old);
    }
    // ---- add ripple to UI ----
    function ripple() { setTimeout(function () { $(".rip_btn").ripple(); }, 500); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
</script>


