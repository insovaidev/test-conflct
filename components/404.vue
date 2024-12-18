
<template>
    <div :class="isDesktop ? 'des_container' : ''">
        <!-- app bar -->
        <div v-if="isMobile" class="no_padding fix_app_bar">
            <div class="_div_nav row_padding bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                        <!--<i class="fas fa-arrow-left font_23 text-white ver_icon"></i>-->
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col _pad_col_icon">
                    <div class="text-center font_25">
                        <NuxtLink tag="a" :to="localePath({ name: 'index' })" class="text-white font_23">
                            {{ $t('message.khmer24') }}
                        </NuxtLink>
                    </div>
                </div>
                <div class="loading_width"></div>
            </div>

            <div class="large-12 columns height_logo_404 p_d_d_404">
                <div class="po_re_404">
                    <input type="text" :placeholder="$t('message.search')+'...'" class="form-control" id="focus" v-on:keyup="keymonitor" v-model="data_search">
                    <button @click="search_post" class="btn btn_s_404">{{ $t('message.search') }}</button>
                </div>
            </div>
        </div>
        <div v-else>
            <D_header/>
        </div>

        <!-- categories -->
        <div class="content top_content_404" :class="isMobile ? '' : 'screen-content-desktop mt_80 min_h'">
            <div class="error_content" :class="isMobile ? '' : 'bg-white'">
                <p>ផលិតផលដែលលោកអ្នកកំពុងស្វែងរក ត្រូវបានលក់ចេញហើយ (ឬបានលុបចេញ)</p>
                <div class="text-center">
                    <img :src="asset_url+version_library+'img/404_face.png'" alt="Page 404 Not Found">
                </div>
                <ul>
                    <li>
                        <NuxtLink tag="a" :to="localePath({ name: 'index' })" class="c_a_page_404">
                            ចុចទីនេះដើម្បីស្វែងរកផលិតផលថ្មីផ្សេងទៀត ដែលកំពុងដាក់លក់លើគេហទំព័រ Khmer24.com
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink tag="a" :to="localePath({ name: 'index' })" class="c_a_page">
                            Click here to go to Khmer24.com Home Page
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="categories bd_t_cat_404" :class="isMobile ? '' : 'bg-white'">
                <p class="font_find_product_404">{{ $t('new_text_1.find_post') }}</p>
                <div class="bg-transparent" :class="isDesktop ? 'dt_404_main_categories' : 'nav_main_categories'">
                    <template v-if="loading">
                        <div v-for="index in 12" :key="index">
                            <a rel="nofollow" aria-label="loading">
                                <div class="animated-background tag_cate_img"></div>
                                <div :class="isDesktop ? 'dt_c_cate_par_text' : 'c_cate_parent_text'">
                                    <div>
                                        <p class="animated-background tag_cate_title"></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </template>
                    <template v-if="e_par_cates">
                        <div v-for="(c, index) in e_par_cates" :key="index" class="h-v-mouse">
                            <a rel="nofollow" href="javascript:void (0)" @click="click_category(c.slug)">
                                <div class="cate-bg-img-icon">
                                    <img :src="c.icon && c.icon.medium ? c.icon.medium.url : ''" :alt="language === 'en' ? c.en_name : c.km_name">
                                </div>
                                <!--<img :src="category.icon" :alt="language === 'en' ? category.en_name : category.km_name">-->
                                <div :class="isDesktop ? 'dt_c_cate_par_text' : 'c_cate_parent_text'">
                                    <div>
                                        <p>{{ language === 'en' ? c.en_name : c.km_name }}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div v-if="!isMobile && r_name !== 'resumes-name-cvid-id'">
            <TheFooter />
        </div>
    </div>
</template>

<script setup>
    import {VueCookieNext} from "vue-cookie-next";
    import helper from "/helper";
    import TheFooter from "../components/Desktop/Desktop_footer.vue"
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config_404 = runtime_config.public;
    const router = useRouter();
    const route = useRoute();
    const version_library = config_404.LIBRARY_VERSION;
    const asset_url = '/'; // config_404.VUE_APP_BASE_URL;
    const categories = ref([]);
    const localePath = useLocalePath()
    const language = ref(helper.get_lang_cookie());
    const e_par_cates = useState('e_par_cates', () => []); // catch
    const loading = ref(false);
    const data_search = ref('');
    const isMobile= ref(helper.m_or_d())
    const r_name = ref(helper.clear_prefix_route_name(route.name));

    onMounted(() => {
        if (process.client) {
            console.log(route)
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            let cate = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : '';
            categories.value = cate ? cate : [];

            // ---> check localize for reload the page <---
            if (!language.value) {
                var lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'; // check localstorage.
                VueCookieNext.setCookie('lang', lang); // save to cookies if cookies lang empty.
            }

            loadCategories();
        }
    })

    // --- load data category ---
    function loadCategories() {
        if ((!categories.value) || (categories.value && !categories.value.data) || (categories.value && !categories.value.url) || (categories.value && categories.value.url && categories.value.url !== config_404.VUE_APP_API_URL)) {
            loading.value = true;
            $fetch(config_404.VUE_APP_API_URL + 'categories', {
                params: { meta: true, v: 1 },
                // signal: AbortSignal.timeout(config_404.DELAY_REQUEST),

            }).then(response => {
                const object = {
                    data: response.data,
                    meta: response.meta,
                    expiry: helper.Date_To_Timestamp('', 7200, 'seconds'),  // add 1 day
                    url: config_404.VUE_APP_API_URL, // for check to get new categories up to date.
                }
                localStorage.setItem("categories", JSON.stringify(object));
                categories.value = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];

                clean_categories(response.data); // clean categories and get only parent

            }).catch(error => { console.log(error); }).finally(() => (loading.value = false));

        } else {
            clean_categories(categories.value.data); // clean categories and get only parent
        }
    }
    // --- clean data categories ---
    function clean_categories(categories) {
        if (e_par_cates.value.length === 0) { // check prevent push duplicated categories in to array "e_par_cates".
            for (let val of categories) {
                if (parseInt(val.parent) === 0) {
                  e_par_cates.value.push(val); // get only parent categories
                }
            }
        }
    }
    // --- click btn search ---
    function search_post() {
        if (data_search.value) {
            router.replace(localePath({ name: 'search', params: { first: 'the_first' }, query: { keyword: data_search.value } }));
        } else {
            $('#focus').focus();
        }
    }
    // --- click parent categories ---
    function click_category(slug_category) {
        router.replace(localePath({ name: 'c-slugCategory', params: { first: 'the_first', slugCategory: slug_category } }));
    }
    // --- click enter and search ---
    function keymonitor(e) {
        if (e.keyCode === 13) { // if click enter
            $('#focus').blur(); // remove focus in jquery
            search_post(); // name function
        }
    }
    // ---- click back one page ----
    function goBack() {
        window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' }));
    }
</script>
