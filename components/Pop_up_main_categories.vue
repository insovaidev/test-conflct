
<template>
    <div class="modal fade" id="show_modal_categories" :class="isMobile ? 'style_full_screen' : 'dt_filter_modal'"
         tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
        <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w bg-white rounded'" role="document">
            <div class="modal-content" :class="isMobile ? 'modal_content_style' : ''">

                <!-- App Bar -->
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                    <div class="_div_nav bg_app_bar_header_">
                        <div @click="goBack" class="_pad_col_icon">
                            <button class="btn clear-btn-app-bar" aria-label="Back">
                                <i class="icon-clear font_click_back"></i>
                            </button>
                        </div>
                        <div class="col pl-1 l_h_con_title">
                            <p class="name_style truncate_wrap m-0"> {{ $t('message.choose_category') }} </p>
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="modal-body p-0" :class="isMobile ? 'mt-5' : ''" id="app_bar">
                    <!-- loading -->
                    <div v-if="loading" class="text-center below_app_bar_100px mb-5">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else>
                        <!-- Main category -->
                        <div v-if="!category_id" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar msg_history">
                            <template v-for="category in categories.data" :key="category">
                                <div  v-if="category.parent === '0'" class="m_background_main_category">
                                    <div class="m_flex_style_category cur_sur h-v-mouse" @click="show_dialog_category(category.id)">
                                        <a rel="nofollow" href="javascript:void(0)" class="style_flex">
                                            <div class="width_main_category">
                                                <img :src="category.icon && category.icon.small ? category.icon.small.url : ''" class="m_with_height_category" :alt="language === 'km' ? category.km_name : category.en_name">
                                            </div>
                                            <div class="width_100">
                                                <p class="truncate_wrap mt-3 m_search_font_name"> {{ language === 'km' ? category.km_name : category.en_name }} </p>
                                            </div>
                                            <div class="i_s_arrow_right">
                                                <i class="ion-ios-arrow-forward m_icon_size_category"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- Sub category -->
                        <div v-else class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar msg_history">
                            <!-- parent -->
                            <div v-if="route_name === 'post-id' || route_name === 'post'"></div>
                            <template v-else>
                                <template v-for="category in categories.data" :key="category">
                                    <div v-if="category.id === category_id" class="m_background_main_category">
                                        <div class="m_flex_style_category cur_sur h-v-mouse" @click="go_to_form_search(category.slug, language === 'km' ? category.km_name : category.en_name, category.id)">
                                            <a rel="nofollow" href="javascript:void (0)" class="style_flex">
                                                <div class="width_main_category">
                                                    <img :src="category.icon && category.icon.small ? category.icon.small.url : ''" class="m_with_height_category m-0" :alt="language === 'km' ? category.km_name : category.en_name">
                                                </div>
                                                <div class="width_100">
                                                    <p class="truncate_wrap mt-3 m_search_font_name"> {{ language === 'km' ? category.km_name : category.en_name }} </p>
                                                </div>
                                                <div class="i_s_arrow_right">
                                                    <i class="ion-ios-arrow-forward m_icon_size_category"></i>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <!-- children -->
                            <template v-for="sub_cate in categories.data" :key="sub_cate">
                                <div v-if="sub_cate.parent === category_id" class="m_background_main_category">
                                    <div class="cate-sub-child cur_sur h-v-mouse" @click="go_to_form_search(sub_cate.slug, language === 'km' ? sub_cate.km_name : sub_cate.en_name, sub_cate.id)">
                                        <div class="cate-s-c-1">
                                            <div class="width_main_category">
                                                <img :src="sub_cate.icon && sub_cate.icon.small ? sub_cate.icon.small.url : ''" :alt="language === 'km' ? sub_cate.km_name : sub_cate.en_name">
                                            </div>
                                            <p class="truncate_wrap"> {{ language === 'km' ? sub_cate.km_name : sub_cate.en_name }} </p>
                                        </div>
                                        <div class="cate-s-c-2"><i class="ion-ios-arrow-forward m_icon_size_category"></i></div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- show empty categories modal desktop screen -->
                        <div v-if="categories && categories.data && categories.data.length === 0 && isDesktop" class="vue-eternal-loading">
                            <div class="no_more_result n-m-r-mg">
                                <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                <p class="no_more_result mt-2">No result!</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const pop_config = runtime_config.public;
    const pop_route = useRoute();
    const pop_router = useRouter();
    const version_library = pop_config.LIBRARY_VERSION;
    const asset_url = '/'; // pop_config.VUE_APP_BASE_URL;
    const isMobile= ref(true)
    

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath()

    const user_data = ref('');

    // categories: JSON.parse(localStorage.getItem("categories")) ? JSON.parse(localStorage.getItem("categories")) : [],
    const search_key = ref(pop_route.query.keyword ? pop_route.query.keyword : '');
    const category_id = ref('');
    const loading = ref(false);
    const route_name = ref(helper.clear_prefix_route_name(pop_route.name));

    const store_id = ref(''); // prevent request again and again.
    const categories = ref([]);

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);

    onMounted(() => {
        if (process.client) {
            isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            isMobile.value = $( window ).width() < 768 ? true : false
            $( window ).resize( function() {
                isMobile.value = $( window ).width() < 768 ? true : false
            });
            check_new_auth_user();
        }
    })

    // ---- click close dialog Main Category ----
    function goBack() {
        if (category_id.value) {
            category_id.value = ''; // use this value for condition show sub or main categories
        } else {
            if (route_name.value === 'post') {
                window.history.length > 2 ? pop_router.go(-1) : pop_router.push(localePath({ name: 'index' }));
            } else {
                $('#show_modal_categories').modal('hide');
                helper.remove_class_modal_open(); // this function is optional
            }
        }
    }
    // ---- show dialog sub category ----
    function show_dialog_category(cat_id) {
        category_id.value = cat_id;
        document.getElementById('app_bar').scrollIntoView(); // choose sub scroll to top
    }
    // ---- check auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    function loadCategories(st_id) {
        // check auth first
        check_new_auth_user();
        // check if store must to add store_id to params
        let data_params = '';
        if (st_id) {
            data_params = { storeid: st_id, v : 1, lang: language.value };
        } else {
            data_params = { v : 1, lang: language.value };
        }

        if (categories.value.length === 0) { // check prevent request only one time.
            loading.value = true;
            $fetch(pop_config.VUE_APP_API_URL_MOBI + 'me/posts/posted_categories',{
                // signal: AbortSignal.timeout(pop_config.DELAY_REQUEST),
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: data_params,

            }).then(res => {
                categories.value = res;

            }).catch(error => {
                if (!error.response) {
                    if (reload_q_again_1.value < 2) {
                        reload_q_again_1.value += 1;
                        setTimeout( () => { loadCategories(st_id); }, 3000);
                    }
                } else if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        setTimeout( () => { loadCategories(st_id); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        pop_router.replace(localePath({ name: 'index' }));
                    }
                }
            }).finally(() => (loading.value = false));
        }
    }
    // ---- sub categories ----
    function go_to_form_search(category_slug, category_name, sub_id) {
        // console.log(route_name.value);
        const current_form = route_name.value;
        // --- choose category in search filter post ---
        if (
            current_form === 'search_post' || current_form === 'search' ||
            current_form === 'cars' || current_form === 'cars_field' || current_form === 'cars_field_model' ||
            current_form === 'motorcycles' || current_form === 'motorcycles_field' || current_form === 'motorcycles_field_model' ||
            current_form === 'mobiles' || current_form === 'mobiles_sub' || current_form === 'mobiles_sub_field' ||
            current_form === 'property' || current_form === 'property_sub' || current_form === 'jobs' || current_form === 'jobs_sub'
        ) {
            $('#show_modal_categories').modal('hide'); // close modal
            let obj = { /*slug_category: category_slug, category_name: category_name, keyword: pop_route.query.keyword*/ };
            // choose new category and save search keyword
            // if (pop_route.query.keyword) { obj['keyword'] = pop_route.query.keyword; }
            pop_router.replace(localePath({ name: 'search_post', query: obj }));
            save_track_optional('first', { first: 'the_first', slugCategory: category_slug });

            category_id.value = ''; // clear condition category_id for open category again (click back history)

        // --- show in form post or account page ---
        } else {
            let name_main_cate = '';   let id_main_cate = parseInt(category_id.value); // id parent category
            let name_sub_cate = '';    let id_sub_cate = parseInt(sub_id);             // id child category

            $.each(categories.value.data, (key, val) => {
                if (parseInt(val.id) === id_main_cate) {
                    name_main_cate = language.value === 'km' ? val.km_name : val.en_name;
                }
                if (parseInt(val.id) === id_sub_cate) {
                    name_sub_cate = language.value === 'km' ? val.km_name : val.en_name;
                }
            });

            $('#show_modal_categories').modal('hide'); // close modal

            // --- from post or edit_post --- (So now close this condition, because post_ad is change the role)
            if (current_form === 'post' || current_form === 'post-id') {

                // user $emit OR prop to pass data from component to parent
                // --- open this line soon --
                // this.$emit('choose_category', { sub_slug: category_slug, main_name: name_main_cate, sub_name: category_name, sub_id: sub_id, parent_id: id_main_cate });

                category_id.value = ''; // clear condition category_id for open category again (click back history)

            // --- from store page ---
            } else if (current_form === 'account-store-id') {
                let q = pop_route.query;
                const active_or_expired = !q.store_check_tap || q.store_check_tap === 'active' ? 'active' : 'expired';   // store active_or_expired when choose category
                const keyword = pop_route.query.keyword ? pop_route.query.keyword : '';                 // store keyword when choose category
               
                let str_query = {
                    id: pop_route.params.id,
                    store_check_tap: active_or_expired,
                    category_name: name_sub_cate,
                    category: sub_id,
                    keyword: keyword 
                }
                if (pop_route.query && Object.keys( pop_route.query).length > 0) {
                    Object.entries( pop_route.query).forEach(([key, val], index) => {
                        if(val){
                            str_query[key] = val
                        }
                    });
                }
                pop_router.replace(localePath({ name: 'account-store-id', query: str_query }));

                category_id.value = ''; // clear condition category_id for open category again (click back history)

            // --- from account page --- (this condition work simple)
            } else {
                const active_or_expired = pop_route.query.check_tap ? pop_route.query.check_tap : 'active';   // store active_or_expired when choose category
                const keyword = pop_route.query.keyword ? pop_route.query.keyword : '';                 // store keyword when choose category
                let str_query = {
                    check_tap: active_or_expired,
                    category_name: name_sub_cate,
                    category: sub_id,
                    keyword: keyword
                }
                if (pop_route.query && Object.keys( pop_route.query).length > 0) {
                    Object.entries( pop_route.query).forEach(([key, val], index) => {
                        if(val){
                            str_query[key] = val
                        }
                    });
                }
                pop_router.replace(localePath({ name: 'account', query: str_query }));
                category_id.value = ''; // clear condition category_id for open category again (click back history)
            }
        }
    }

    // ---- store all type params ----
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }

    // ---- props change that get value from parent ----
    const props = defineProps({
        get_category_by_user: {
            type: null,
            // required: true
        }
    })
    watch(() => props.get_category_by_user, (obj) => {
        if (obj.store_id != store_id.value) { // condition true clear array categories.
            store_id.value = obj.store_id;
            categories.value = [];
        }
        loadCategories(obj.store_id);   // start request category by user or store
    })



</script>
