<template>
    <!-- App Bar Desktop device Only -->
    <header class="d_header des_min_width">
        <div class="des_container">
            <div class="navbar row">
                <div class="d_sec_1">
                    <!--<a rel="nofollow" href="javascript:void(0)" @click="go_homePage" class="navbar-brand"><img src="/icon/khmer24.png" alt="Khmer24"></a>-->
                    <a :href="locale === '/' ? config.VUE_LINK : config.VUE_LINK+'/'+locale" class="navbar-brand" aria-label="Khmer24.com">
                        <img src="/icon/khmer24.png" alt="Khmer24">
                    </a>
                    <div @click="change_language" class="cur_sur">
                        <span class="dt_con_flag" :class="locale === 'km' ? 'english_flag' : 'cambodia_flag'"></span>
                    </div>
                </div>

                <div class="d_sec_2">
                    <div class="d_sec_filter">
                        <div class="form-group has-search m-0">
                            <i class="ion-android-arrow-dropdown d_sec_dropdown"></i>
                            <select name="category" class="form-control select-category cur_sur" v-model="slug_category">
                                <option value="">All Categories</option>
                                <template v-for="(cat, index) in all_categories" :key="index">
                                    <template v-if="cat.parent == 0">
                                        <option :value="cat.slug" class="main">{{ lang === 'km' ? cat.km_name : cat.en_name }}</option>
                                        <template v-for="(ch, ind) in all_categories">
                                            <template v-if="ch.parent == cat.id">
                                                <option :value="ch.slug" class="child">{{ lang === 'km' ? ch.km_name : ch.en_name }}</option>
                                            </template>
                                        </template>
                                    </template>
                                </template>
                            </select>
                            <span @click="save_to_localstorage" class="fa fa-search form-control-feedback cur_sur"></span>
                            <input type="text" ref="search_target" id="search_field" v-on:keyup="keymonitor" v-model="key_search"
                                   class="form-control" :placeholder="$t('text_desktop.desk_search')" autocomplete="off">

                            <!-- search suggestion -->
                            <div class="d-none dt_search_sug" id="dt_search_suggest">
                                <!-- show search suggestion -->
                                <template v-if="key_search">
                                    <!-- s-sug is exist -->
                                    <template v-if="s_sug.length > 0">
                                        <div v-for="(s_g, index) of s_sug" :key="index" class="con-recent-history cur_sur">
                                            <div @click="click_value_suggestion(s_g.title, 'to_listing', [])" class="col style_flex p_s_pad_list_sug s-filter-history h-v-mouse">
                                                <div class="ic-warn-acc-con">
                                                    <i class="fas ion-ios-search-strong text_grey"></i>
                                                </div>
                                                <div class="s-f-div-text">
                                                    <p class="p_s_recent_history m-0 font_16 break_word">{{ s_g.title ? s_g.title : '' }}</p>
                                                </div>
                                                <div class="ic-warn-acc-con">
                                                    <i class="icon-arrow-up-left2 c_m_grey font_14"></i>
                                                </div>
                                            </div>
                                            <div v-for="(s_g_c, i) of s_g.categories" :key="i" @click="click_value_suggestion(s_g.title, 'to_listing', [s_g_c.id, s_g_c.slug])" class="s-suggestion-child h-v-mouse">
                                                <div class="ic-warn-acc-con"><i class="icon-arrow_bottom_right text_grey"></i></div>
                                                <div class="s-sug-title"><p class="m-0 font_16 break_word">{{ language === 'km' ? s_g_c.km_name : s_g_c.en_name }}</p></div>
                                                <div class="ic-warn-acc-con mr-3"><i class="icon-arrow-up-left2 c_m_grey font_14"></i></div>
                                            </div>
                                        </div>
                                    </template>
                                    <!-- s-sug empty -->
                                    <div v-else-if="s_sug.length === 0 && show_no_result" @click="click_value_suggestion(key_search,'',[])" class="col style_flex p_s_pad_list_sug s-filter-history h-v-mouse bg-white cur_sur">
                                        <div class="ic-warn-acc-con">
                                            <i class="fas ion-ios-search-strong text_grey"></i>
                                        </div>
                                        <div class="s-f-div-text">
                                            <p class="p_s_recent_history m-0 font_16 break_word parent_color">See Result for <b>{{ key_search }}</b> </p>
                                        </div>
                                    </div>
                                </template>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="d_sec_3">
                    <ul>
                        <template v-if="user_data && user_data.user">
                            <li @click="click_notification" class="dt_head_icon cur_sur">
                                <div class="dt_i_link d_child_icon">
                                    <span class="fas fa-bell s_p_icon"></span>
                                    <span id="DT_badge_noti" class="badge badge-pill s_p_badge d-none">0</span>
                                </div>
                            </li>
                            <li @click="btn_chat_page" class="dt_head_icon cur_sur">
                                <div class="dt_i_link d_child_icon">
                                    <span class="icon-chat s_p_icon"></span>
                                    <span id="DT_badge_chat" class="badge badge-pill s_p_badge d-none">0</span>
                                </div>
                            </li>
                            <li @click="btn_account_page" class="dt_head_pro cur_sur">
                                <div class="cur_sur">
                                    <img :src="user_data.user.photo && user_data.user.photo.medium ? user_data.user.photo.medium.url : asset_url+'icon/user-icon.png'" alt="profile">
                                </div>
                            </li>
                        </template>
                        <template v-else>
                            <li><NuxtLink :to="localePath({ name: 'auth-login' })" class="d_sec_a">{{ $t('message.dt_login') }}</NuxtLink></li>
                            <li><p>{{ $t('message.or') }}</p></li>
                            <li><NuxtLink :to="localePath({ name: 'auth-register' })" class="d_sec_a">{{ $t('message.register') }}</NuxtLink></li>
                        </template>
                        <li class="nav-item ml-3 pr-0 pl-0">
                            <button @click="btn_create_post" class="btn dt_btn_new_post text_shadow" id="desktop_ads_new_post">
                                {{ $t('text_desktop.post_free_ads') }}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
    import helper from "/helper";
    import {VueCookieNext} from "vue-cookie-next";
    const runtime_config = useRuntimeConfig();
    const config = runtime_config.public;
    const localePath = useLocalePath();
    const lang = ref(helper.get_lang_cookie());
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const route = useRoute();
    const router = useRouter();
    const r_name = ref(''); // clean route name with prefix.
    const language = ref(helper.get_lang_cookie());
    const isDesktop = helper.check_is_desktop(); // check userAgent
    // check auth exist or not in serverSide
    let user_auth = useCookie('auth_user');
    // let has_auth = ref(user_auth && user_auth._rawValue && user_auth._rawValue.tokens ? 'has_auth' : '');
    const user_data = ref(user_auth && user_auth._rawValue ? user_auth._rawValue : '');

    const all_categories = useState('all_categories', () => []);
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);

    const key_search = ref('');
    const slug_category = ref('');
    const is_from_store = ref(true); // true for store. false for user.
    const timerID_nav = useState('timerID_nav', () => '');

    // request server side
    if (process.server) { await loadCategories(); }


    onMounted(() => {
        if (process.client) {
            check_new_auth_user();
            function_check();
            loadCategories(); // get categories in client side if not exist.
            // console.log(all_categories.value);

            key_search.value = route.query && route.query.keyword ? route.query.keyword : '';
            slug_category.value = route.params && route.params.slugCategory ? route.params.slugCategory : '';

            // --- clean prefix route name ---
            r_name.value = helper.clear_prefix_route_name(route.name);

            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            // --- check is from store ---
            check_is_from_store();
        }
    })
    watch(() => route.query, () => {
        key_search.value = route.query && route.query.keyword ? route.query.keyword : '';
        check_new_auth_user();
        function_check();
    });
    watch(() => route.params, () => {
        slug_category.value = route.params && route.params.slugCategory ? route.params.slugCategory : '';
        check_new_auth_user();
        function_check();
    });
    watch(() => route.name, () => {
        // --- remove class modal-open ---
        helper.remove_class_modal_open();

        // --- clean prefix route name ---
        r_name.value = helper.clear_prefix_route_name(route.name);

        lang.value = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

        check_new_auth_user();
        function_check();

        // --- check is from store ---
        check_is_from_store();
    })


    // ---- check if from url that have store store ----
    function check_is_from_store() {
        if (r_name.value === 'account-store-id' || r_name.value === 'account-store-id-setting') {
            is_from_store.value = true; // show button create post store. (plush icon)
        } else {
            is_from_store.value = false;  // show button create post user. (camera plus icon)
        }
    }
    // ---- check auto ----
    function function_check() {
        if (user_data.value) {
            if (!timerID_nav.value) {  // --> it the most spacial check, if doesn't check, it crate multiple request in the same time <--
                timerID_nav.value = setInterval(() => {
                    start_request(); // set get request badge on created prevent error when request axios
                }, 3500); // 3.5 second
            }
        } else {
            clearInterval(timerID_nav.value); timerID_nav.value = '';
        }
    }
    // ---- request to get notification badges ----
    function start_request() {
        check_new_auth_user();
        // --- if have Auth User ---
        if (user_data.value) {

            // -- remove auto request when starting request badges --
            clearInterval(timerID_nav.value); timerID_nav.value = '';

            $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + 'badges', {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: lang.value, fields: 'chat' },
            }).then(res => {

                // -- badge comments --
                $fetch(config.VUE_APP_API_URL_COMMENT + 'me/total_unread', {
                    headers: { "Access-Token": user_data.value.tokens.access_token },
                    params: { lang: language.value },

                }).then(com => {
                    // --- use return data dome not work, use like this work ---
                    // -- notification --
                    var id_badge = $('html body #DT_badge_noti');
                    if (res.notification && res.notification > 0) {
                        id_badge.removeClass('d-none');
                        id_badge.text(res.notification);
                    } else {
                        id_badge.addClass('d-none');
                        id_badge.text('0');
                    }
                    // -- chats && comments --
                    var id_add_badge = $('html body #DT_badge_chat');
                    var id_chats_badge = $('html body #badge_sub_chats');
                    var id_comments_badge = $('html body #badge_sub_comments');
                    if ((res.chat && res.chat > 0) || com.data > 0) {
                        id_add_badge.removeClass('d-none');
                        id_add_badge.text(parseInt(res.chat)+parseInt(com.data)); // add to icon chat in bottom navigation.
                        if (r_name.value === 'chats') { // only in chats page, must to add badge chats && comments.
                            if (res.chat > 0) { id_chats_badge.removeClass('d-none'); id_chats_badge.text(res.chat); } // add badge in chats page on chats text title.
                            if (com.data > 0) { id_comments_badge.removeClass('d-none'); id_comments_badge.text(com.data); } // add badge in chats page on comments text title.
                        }
                    } else {
                        id_add_badge.addClass('d-none'); id_add_badge.text('0');
                        id_chats_badge.addClass('d-none'); id_chats_badge.text('0');
                        id_comments_badge.addClass('d-none'); id_comments_badge.text('0');
                    }

                    // -- set new auto request when success --
                    function_check();

                }).catch(error => {
                    let check = error && error.response ? error.response : '';
                    if (check && check.status === 401) { // if auth token expire
                        clear_badge();
                    }
                });

                // -- clear retry auto request badge --
                reload_q_again_2.value = 0;

            }).catch(e => {
                if (!e.response) {
                    console.log(e);

                } else if (e.response) {
                    if (e.response.status === 401) { // retry
                        if (reload_q_again_2.value <= 2) {
                            reload_q_again_2.value += 1;
                            check_new_auth_user();
                            setTimeout(() => { start_request(); }, 3000);
                        }
                    } else {
                        clearInterval(timerID_nav.value); timerID_nav.value = '';
                    }
                }
            });

            // --- remove interval if Auth User remove from localStorage ---
        } else {
            clearInterval(timerID_nav.value); timerID_nav.value = '';
        }
    }
    // ---- check auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- notification ----
    function click_notification() {
        if (r_name.value === 'notification') { window.scrollTo({top: 0 /*, behavior: 'smooth'*/}); }
        helper.params_make_condition('clear_cache', { clear_cache: 'clear' });
        router.push(localePath({ name: 'notification' }));
    }
    // ---- Create Post ----
    function btn_create_post() {
        if (user_data.value) {
            // -- if account have "phone_activated". Have to add phone when create ads --
            if (user_data.value.user.phone_activated === false) {
                router.push(localePath({ name: 'setting-change-phone', query: {from: 'post_ads'} }));

            } else {
                // -- create post of store --
                if (is_from_store.value) {
                    router.push(localePath({name: 'post', query: {store_id: route.params.id}}));
                // -- create post user --
                } else {
                    if (r_name.value === 'post') { // if in create new post and user click button create again, show main category
                        $('#dt_show_main_cate').click();
                    } else {
                        router.push(localePath({name: 'post'}));
                    }
                }
            }

        } else {
            // create state when login completed
            let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
            let arr_save_state = {
                action: 'post',
                expire: expired,
                data: { post_id: '' },
                from: { name: '' }
            }
            localStorage.setItem("save_state", JSON.stringify(arr_save_state));
            router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
        }
    }
    // ---- account ----
    function btn_account_page() {
        if (user_data.value) {
            if (route.query.check_tap && r_name.value === 'account') {
                window.scrollTo({top: 0 /*, behavior: 'smooth'*/});
            } else {
                router.push(localePath({ name: user_data.value ? 'account' : isDesktop ? 'auth-login' : 'auth' }));
                window.scrollTo({top: 0 /*, behavior: 'smooth'*/});
            }
        } else {
            // create state when login completed
            let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
            let arr_save_state = {
                action: 'account',
                expire: expired,
                data: { post_id: '' },
                from: { name: '' }
            }
            localStorage.setItem("save_state", JSON.stringify(arr_save_state));
            router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth'}));
        }
    }
    // ---- chat ----
    function btn_chat_page() {
        if (user_data.value) {
            helper.params_make_condition('clear_cache', { clear_cache: 'clear' });
            router.push(localePath({ name: 'chats' }));
            window.scrollTo({top: 0/*, behavior: 'smooth'*/});
        } else {
            // create state when login completed
            let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
            let arr_save_state = {
                action: 'chats',
                expire: expired,
                data: { post_id: '' },
                from: { name: '' }
            }
            localStorage.setItem("save_state", JSON.stringify(arr_save_state));
            router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth'}));
        }
    }
    // ---- go to homePage ----
    function go_homePage() {
        if (r_name.value === 'index') {
            window.location.reload(); // reload page if in homePage.
        } else {
            router.push(localePath({ name: 'index' })); // go to home page if current page is not homePage.
        }
    }
    // ---- change lang ----
    function change_language() {
        let current_lang = locale.value;

        if (current_lang === 'km') {
            localStorage.setItem('lang', 'en');
            VueCookieNext.setCookie('lang', 'en'); // for serverSideRendering.
            router.replace(switchLocalePath('en')); // change lang with with url.

        } else {
            localStorage.setItem('lang', 'km');
            VueCookieNext.setCookie('lang', 'km'); // for serverSideRendering.
            router.replace(switchLocalePath('km')); // change lang with with url.
        }
    }
    // ---- get categories ----
    async function loadCategories() {
        let cate = process.server ? '' : (localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : '');
        if (!cate || (cate && !cate.data) || (cate && !cate.url) || (cate && cate.url && cate.url !== config.VUE_APP_API_URL_MOBI)) {
            try {
                let reqUrl = config.VUE_APP_API_URL_MOBI + 'categories';
                const { data: resCate } = await useFetch(reqUrl, {
                    key: reqUrl,
                    params: {
                        meta: true,
                        v: 1, // for show real image on category
                    },
                })

                all_categories.value = resCate.value.data;

                if (process.client) {
                    const object = {
                        data: resCate.value.data,
                        meta: resCate.value.meta,
                        expiry: helper.Date_To_Timestamp('',7200, 'seconds'), // add 1 day
                        url: config.VUE_APP_API_URL_MOBI, // for check to get new categories up to date.
                    }
                    localStorage.setItem("categories", JSON.stringify(object));
                }

            } catch (e) {
                if (process.client) {
                    if (e.response && e.response.status === 401) { // retry
                        if (reload_q_again_1.value < 2) {
                            reload_q_again_1.value += 1;
                            setTimeout(() => { loadCategories(); }, 3000);
                        }
                    }
                }
            }
        } else {
            all_categories.value = cate.data; // get all categories from localstorage.
        }
    }



    // search suggestion
    const timer = ref(null);
    const s_sug = ref([]);
    const show_no_result = ref(false); // true = show not result suggestion.
    // cache array sub data of keyword
    const sub_key_word = ref([]);
    const arr_key = ref([]);
    // check is focus or not on input search
    import { useFocus } from '@vueuse/core'
    const search_target = ref()
    const { focused } = useFocus(search_target)
    watch(focused, (focused) => {
        if (focused) { // console.log('focused')
            $('#dt_search_suggest').removeClass('d-none');

        } else { // console.log('lost focus')
            setTimeout(() => {
                $('#dt_search_suggest').addClass('d-none');
            },200); // delay prevent mouse click outside input box, it close suggest
        }
    })
    // ---- click btn search ----
    function save_to_localstorage() {
        // console.log(key_search.value); console.log(slug_category.value);
        // category or keyword exist must go to listing
        if (key_search.value || slug_category.value) {

            $('#search_field').blur(); // close auto focus

            if (key_search.value) { // is have keyword only
                // - save search keyword to localstorage -
                add_keyword_to_localstorage();

                // save value to localstorage
                key_search.value = check_title_char(key_search.value); // clean search text !!.
                add_keyword_to_localstorage();
            }

            if (slug_category.value) {
                router.push(localePath({name: 'c-slugCategory', params: {slugCategory: slug_category.value}, query: { keyword: key_search.value }}));
            } else {
                router.push(localePath({name: 'search', query: { keyword: key_search.value }}));
            }

        // go to "search-main" page
        } else {
            router.push(localePath({name: 'search-main'}));
        }
    }
    // ---- clean special char to use in url ----
    function check_title_char(search_text) { return helper.check_special_search_text(search_text); }
    // ---- add keyword to storage data search ----
    function add_keyword_to_localstorage() {
        let check = localStorage.getItem('storedData');
        let tr_search = key_search.value ? key_search.value.trim() : '';
        if (!check || check == null) {
            localStorage.setItem("storedData", JSON.stringify([tr_search])); // save
        } else {
            let old_data_localstorage = JSON.parse(check);

            // -- check duplicate value --
            for (let i = 0; i < old_data_localstorage.length; i++) {
                if (old_data_localstorage[i].toLowerCase() == tr_search.toLowerCase()) {
                    old_data_localstorage.splice(i, 1); // remove the duplicate index
                }
            }
            // -- then push new value to array --
            old_data_localstorage.push(tr_search);  // add new value to array
            localStorage.setItem("storedData", JSON.stringify(old_data_localstorage)); // save
        }
    }
    // ---- click keyboard on input ----
    function keymonitor(e) {
        if (e.keyCode === 13) { // if click enter keyboard.
            save_to_localstorage();
        } else {
            key_search.value = $('#search_field').val(); // "v-model" not work some browser vivo browser or any.
            get_key();
        }
    }
    // ---- keyup suggestion ----
    function get_key() {
        let key_trim = key_search.value ? key_search.value.trim() : ''; // trim keyword out.
        if (key_trim !== '') {
            // -- clear timeout when have new key up --
            if (timer.value) {
                clearTimeout(timer.value);
                timer.value = null;
            }
            // -- if not key up in milliseconds --
            search_suggestion(key_trim);
        }
    }
    // ---- search suggestion by keyup on search input ----
    function search_suggestion(key_value) {
        if (arr_key.value.includes(key_value)) {
            // console.log("Old Data Loading...");
            s_sug.value = sub_key_word.value[key_value] ? sub_key_word.value[key_value] : [];
            // console.log(sub_key_word.value);

        } else {
            // console.log("New Data Loading...");

            $fetch(config.VUE_APP_API_URL_POST_NEW + 'search-suggestions', {
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                params: { keyword: key_value },
            }).then(res => {
                show_no_result.value = false;    // hide it when have new key up.
                s_sug.value = [];                // clear array suggestions.

                s_sug.value = res.data;
                if (res.data.length > 0) {
                    sub_key_word.value[key_value] = s_sug.value; // add array data by keyword index.
                    arr_key.value.push(key_value);              // push keyword for check.
                    // console.log(this.sub_key_word);
                    // console.log(this.arr_key);
                }
                show_no_result.value = true;

            }).catch(e => {  });
        }
    }
    // ---- click on suggestion value ----
    function click_value_suggestion(val_keyword, check, val_slug_cate) {

        // --> save data to localstorage <--
        key_search.value = val_keyword;
        add_keyword_to_localstorage();

        // --> search_result page <--
        if (!check) {
            save_to_localstorage();

        // --> go to search listing <--
        } else {
            if (val_slug_cate.length > 0) { // if array val_slug_cate exist, go to listing with slug and keyword.
                // router.replace(localePath({ name: 'search', query: { keyword: val_keyword } }));
                // save_track_optional('search_params', { slugCategory: val_slug_cate['1'], first: 'the_first', tracking: JSON.stringify({ placement: 'home', category_id: val_slug_cate['0'] }) });

                save_track_optional('first', {first: 'the_first'});
                save_track_optional('tracking', { placement: 'home', category_id: val_slug_cate['0'] });
                router.replace(localePath({ name: 'c-slugCategory', params: { slugCategory: val_slug_cate['1'] }, query: { keyword: val_keyword } }));

            } else { // go to listing with keyword only.
                router.replace(localePath({ name: 'search', query: { keyword: val_keyword } }));
                save_track_optional('first', { first: 'the_first' });
            }
        }
    }
    // ---- store all type params ----
    function save_track_optional(type, data_params) { helper.params_make_condition(type, data_params); }
</script>

