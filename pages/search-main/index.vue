
<template>
    <div :class="isDesktop ? 'des_container mt-3 dt_search_main' : ''">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav border_bottom_search" :class="isDesktop ? 'dt_border' : ''">
                <div @click="goBack" class="_pad_col_icon" title="Go Back">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-ios-arrow-back font_26 text_grey"></i>
                    </button>
                </div>
                <div class="col row_padding ml-2">
                    <input v-on:keyup="keymonitor" autocomplete="off" maxlength="255" class="form-control app_bar_search font_18"
                           v-model="search_post" id="_search_" autofocus ref="searchbar" type="text" :placeholder="$t('message.search')+'...'">
                </div>
                <div class="_pad_col_icon text-center">
                    <button @click="save_to_localstorage" class="btn mg_icon_search" aria-label="search">
                        <i class="fas ion-ios-search-strong font_26 text_grey"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="p_s_style_modal_body" :class="isDesktop ? 'mt-3 dt_border' : ''">
            <!-- show search suggestion -->
            <template v-if="search_post">
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
                <div v-else-if="s_sug.length === 0 && show_no_result" @click="click_value_suggestion(search_post,'',[])" class="col style_flex p_s_pad_list_sug s-filter-history h-v-mouse bg-white cur_sur">
                    <div class="ic-warn-acc-con">
                        <i class="fas ion-ios-search-strong text_grey"></i>
                    </div>
                    <div class="s-f-div-text">
                        <p class="p_s_recent_history m-0 font_16 break_word parent_color">See Result for <b>{{ search_post }}</b> </p>
                    </div>
                </div>
            </template>

            <!-- show history -->
            <template v-else>
                <template v-if="data_storage">
                    <div class="style_flex p_s_pad_field">
                        <div class="col-6 font_18"> {{ $t('message.recent_search') }} </div>
                        <div class="col-6 text-right pr-0">
                            <span @click="remove_localstorage" class="clear parent_color font_18 p_s_pad_clear cl_ripple cur_sur">
                                {{ $t('message.clear') }}
                            </span>
                        </div>
                    </div>
                    <div v-for="storage in data_storage" :key="storage" class="col con-recent-history style_flex p_s_pad_list_history s-filter-history cur_sur h-v-mouse">
                        <div @click="action_search(storage)" class="ic-warn-acc-con">
                            <i class="fas fa-history text_grey"></i>
                        </div>
                        <div @click="action_search(storage)" class="s-f-div-text">
                            <p class="p_s_recent_history m-0 font_16 break_word"> {{ storage }} </p>
                        </div>
                        <div @click="edit_search(storage)" class="ic-warn-acc-con s-f-pad-text">
                            <i class="fas fa-pencil-alt text_grey"></i>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} );
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();

    const search_post = ref('');
    const data_storage = ref(null);
    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    // search suggestion
    const timer = ref(null);
    const s_sug = ref([]);
    const show_no_result = ref(false); // true = show not result suggestion.
    // cache array sub data of keyword
    const sub_key_word = ref([]);
    const arr_key = ref([]);

    definePageMeta({ middleware: "auth" }); // use layout dont have bottom nav bar check auth.

    useHead({
        title: 'Search - Khmer24.com', // set header title
        meta: [
            // { name: 'apple-mobile-web-app-title', content: 'Search - Khmer24.com' },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, search khmer24' },
            { name: 'description', content: 'Buy, Sell, search khmer24' },

            {property: 'og:title', content: 'khmer24.com, Buy and Sell Everything In Cambodia'},
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

            ripple();
            // --- mount script prevent error when click to home page to load collapse ---
            // $('body').find('.collapse').collapse({ toggle: false });

            // --- focus when open this form ---
            // nextTick(() => { theClickFocus.value.click(); });
            setTimeout(() => {
                // nextTick(() => { searchbar.value.focus(); });
                $('html body').find('#_search_').focus();
            },300);


            // --- show data from localStorage ---
            var revers_arr = JSON.parse(localStorage.getItem('storedData'));
            data_storage.value = revers_arr ? revers_arr.reverse() : null; // reverse mean move arr down to up
        }
    })

    /*watch(() => search_post.value, (val) => {
        let key_trim = val.trim(); // trim keyword out.
        if (key_trim !== '') {
            // -- clear timeout when have new key up --
            if (timer.value) {
                clearTimeout(timer.value);
                timer.value = null;
            }
            // -- if not key up in milliseconds --
            // this.timer = setTimeout(() => {
                search_suggestion(key_trim);
            // }, 250);
        }
    })*/


    // ---- click btn search ----
    function save_to_localstorage() {
        // --- note: if need to store array must convert to json because localstorage support only string ---
        if (search_post.value) {
            // --- save search keyword to localstorage ---
            add_keyword_to_localstorage();
            // --- start search ---
            action_search(search_post.value);
        } else {
            // this.$refs.searchbar.focus(); // focus, use like this for support ios focus
            document.getElementById('_search_').focus();
        }
    }
    // ---- add keyword to storage data search ----
    function add_keyword_to_localstorage() {
        let check = localStorage.getItem('storedData');
        let tr_search = search_post.value.trim();
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
        // --- add more key word to localStorage ---
        var revers_arr = JSON.parse(localStorage.getItem('storedData'));
        data_storage.value = revers_arr.reverse(); // reverse mean move arr down to up
    }
    // ---- clear local storage data search ----
    function remove_localstorage() {
        localStorage.removeItem('storedData');
        // --- show data from localStorage when click clear ---
        data_storage.value = JSON.parse(localStorage.getItem('storedData'));
    }
    // ---- function search ----
    function action_search(action) {
        let clean_text_search = check_title_char(action);

        // save value to localstorage
        search_post.value = clean_text_search;
        add_keyword_to_localstorage();

        let search = $('#_search_');
        search.blur();              // close auto focus

        search.val('');             // empty search
        search_post.value = '';     // empty value search
        // -- go to search result page --
        router.replace(localePath({ name: 'search-result', query: { keyword: clean_text_search } }));
    }
    // ---- clean special char to use in url ----
    function check_title_char(search_text) { return helper.check_special_search_text(search_text); }
    // ---- ripple on btn search ----
    function ripple() {
        setTimeout(function () {
            $(".con-recent-history, .btn_search_nav, .cl_ripple").ripple();
        }, 300);
    }
    // ---- edit search ----
    function edit_search(value) {
        // this.$refs.searchbar.focus(); // focus, use like this for support ios focus
        document.getElementById('_search_').focus();
        search_post.value = value;
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- click enter and search ----
    function keymonitor(e) {
        // console.log(e);
        if (e.keyCode === 13) { // if click enter keyboard.
            save_to_localstorage();
        } else {
            let s_value = $('#_search_').val();
            search_post.value = s_value; // "v-model" not work some browser vivo browser or any.
            get_key();
        }
    }
    // ---- keyup suggestion ----
    function get_key() {
        let key_trim = search_post.value.trim(); // trim keyword out.
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
        search_post.value = val_keyword;
        add_keyword_to_localstorage();

        // --> search_result page <--
        if (!check) {
            action_search(search_post.value);

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
