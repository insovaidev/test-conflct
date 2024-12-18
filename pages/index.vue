<template>
    <div>
        <template v-if="isMobile"> <!-- App Bar Mobile -->
            <div class="no_padding fix_app_bar">
                <div class="_div_nav row_padding bg_app_bar_header_">
                    <div @click="change_language" class="_pad_col_icon r_ripple a_w_lang cur_sur text-center">
                        <span class="flag_con" :class="locale === 'km' ? 'english_flag' : 'cambodia_flag'"></span>
                    </div>
                    <a rel="nofollow" class="title-h-p text-white" :href="locale === 'km' ? '/km' : '/en'">
                        {{ $t('message.khmer24') }}
                    </a>
                    <button type="button" class="fas ion-ios-search-strong btn icon-search-home" aria-label="Search" @click="show_page_search"></button>
                </div>
            </div>
            <div class="margin_below_app_bar"></div>
        </template>

        <div class="mt_80 min_h" :class="isDesktop ? 'des_container' : ''">
            <!-- slide show -->
            <!-- v-if="banner && banner.a && banner.a.length === 1"   new condition   -->
            <div :class="isMobile ? '' : 'h25'">
                <div v-if="banner && banner.a && banner.a.length > 0" :class="isMobile ? ' mt-5' : ''">
                    <div v-if="banner.a[0].type === 'image'" class="banner-con m-0">
                        <a rel="nofollow noopener" aria-label="banner" :href="check_link_banner(banner.a[0].link)" target="_blank">
                            <div>
                                <img :src="banner.a[0].image" alt="zone A"
                                    :style="{ 'max-width': `${banner.a[0].width}px`, 'max-height': `${banner.a[0].height}px` }">
                            </div>
                        </a>
                    </div>
                    <div v-else-if="banner.a[0].type === 'code'" v-html="banner.a[0].new_html_banner" class="align-width-banner"></div>
                    <div v-else-if="banner && banner.a && banner.a.length > 0" id="slides" :class="isDesktop ? 'mt-3 dt_home_banner_owl' : ''">
                        <div v-if="!isDesktop" class="placeholder"> <!-- loading_banner_slide -->
                            <img :src="asset_url+version_library+'img/em_ban_290.jpg'" alt="loading banner">
                        </div>
                        <div class="col no_padding s-l-head-pag slide_item" id="slide_con">
                            <!-- slide show -->
                            <div class="owl-carousel owl-theme" id="owl_home_slide_show">
                                <template v-for="img in banner.a" :key="img">
                                    <div v-if="img.type === 'image'" class="item">
                                        <a rel="nofollow noopener" aria-label="banner" :href="img.link" target="_blank" class="a_custom_style">
                                            <div class="s-l-bg-img">
                                                <div v-if="img.image" v-bind:style="{ backgroundImage: 'url(' + img.image + ')' }"></div>
                                            </div>
                                            <img :src="img.image" alt="khmer24 banner">
                                        </a>
                                    </div>
                                    <div v-else-if="img.type === 'code'" class="item">
                                        <a rel="nofollow noopener" aria-label="html banner" target="_blank" class="a_custom_style">
                                            <div v-html="img.new_html_banner"></div>
                                        </a>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div v-else class="margin_below_app_bar"></div>
                </div>
            </div>

            <h1 v-if="isMobile === false" class="title-welcome">{{ $t('text_desktop.title_welcome') }}</h1>

            <!-- categories -->
            <div :class="isMobile ? 'nav_main_categories border rounded' : 'nav_main_categories_dt b-radius borders'">
                <template v-if="categories.length === 0">
                    <div v-for="index in 12" :key="index">
                        <a rel="nofollow" aria-label="loading">
                            <div class="animated-background tag_cate_img"></div>
                            <div class="c_cate_parent_text">
                                <div>
                                    <p class="animated-background tag_cate_title"></p>
                                </div>
                            </div>
                        </a>
                    </div>
                </template>
                <template v-if="categories && categories.length > 0">
                    <template v-if="!isDesktop">
                        <div v-for="(category, inx) in categories" :key="inx">
                            <NuxtLink @click.native="clear_post_data" :to="localePath({ name: 'c-slugCategory', params: { slugCategory: category.slug } })"
                                    @click="track_params({first: 'the_first'}, { placement: 'home', category_id: category.id })">
                                <div class="cate-bg-img-icon">
                                    <img :src="category.icon && category.icon.small ? category.icon.small.url : ''" :alt="locale === 'km' ? category.km_name : category.en_name">
                                </div>
                                <div class="c_cate_parent_text">
                                    <div>
                                        <p>{{ locale === 'km' ? category.km_name : category.en_name }}</p>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </template>
                    <template v-else>
                        <div v-for="(category, inx) in categories" :key="inx">
                            <NuxtLink class="dt_v_cat_link" @click.native="clear_post_data" :to="localePath({ name: 'c-slugCategory', params: { slugCategory: category.slug } })"
                                    @click="track_params({first: 'the_first'}, { placement: 'home', category_id: category.id })">
                                <div class="dt_cate_img_icon">
                                    <img :src="category.icon && category.icon.small ? category.icon.small.url : ''" :alt="locale === 'km' ? category.km_name : category.en_name">
                                </div>
                                <div class="dt_cate_text">
                                    <div>
                                        <p>{{ locale === 'km' ? category.km_name : category.en_name }}</p>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </template>
                </template>
            </div>

            <!-- banner B type "code" or "image" -->
            <div :class="slideShow && slideShow.data && slideShow.data.b && slideShow.data.b.data && slideShow.data.b.data.length > 0 ? 'min-h-ban-b mt-2' : ''">
                <template v-if="banner && banner.b && banner.b.length > 0">
                    <template v-for="ban in banner.b" :key="ban">
                        <div v-if="ban.type === 'image'" class="banner-con mb-2">
                            <a rel="nofollow noopener" aria-label="banner" :href="check_link_banner(ban.link)" target="_blank">
                                <div>
                                    <img :src="ban.image" :style="{ 'max-width': `${ban.width}px`, 'max-height': `${ban.height}px` }" alt="zone B">
                                </div>
                            </a>
                        </div>
                        <div v-else-if="ban.type === 'code'" v-html="ban.new_html_banner" class="align-width-banner"></div>
                    </template>
                </template>
            </div>

            <!-- list ads -->
            <Home_ads_list />

            <!-- show success message -->
            <div class="toast style_toast d-none sh_the_toast toast_z_index">
                <div class="toast-header header_padding_toast">
                    <strong class="me-auto style_flex">
                        <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                        <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                        <p class="m-0 ms-2"> {{ message_success }} </p>
                    </strong>
                    <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import helper from "/helper";
    import Home_ads_list from "/components/Home_ads_list";
    import D_header from '~/components/D_header.vue';
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config = runtime_config.public;
    // const route = useRoute(); // user route like (this.$route).
    const router = useRouter(); // user route like (this.$router).
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const isDesktop = helper.check_is_desktop(); // check userAgent

    const banner = useState('banner', () => '');

    const categories = useState('categories', () => []);
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const error_or_success_message = ref(true);
    const message_success = ref('');
    const clear_local_old_slide = useState('clear_local_old_slide', () => false); // for clear localstorage slideshow

    const slideShow = useState('slideShow', () => []);
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);

    const isMobile = ref(helper.m_or_d ())
    const checkLocalStorage = ref('')

    useHead({
        title: 'khmer24.com, Buy and Sell Everything In Cambodia',
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: 'khmer24.com, Buy and Sell Everything In Cambodia' },
            // -- seo page --
            { name: 'keywords', content: 'buy and sell, online shopping, shopping, shopping in Cambodia, real estate, classified, listing, post free ads, sport cars, classified ads, property, home, land, car, mobile phone, computer, electronic, furniture, job, service, motorcycle, product price', },
            { name: 'description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your property, real estate, home, land, car, motorcycle, mobile phone, computer, electronic, furniture, job, service and more.', },
            // -- facebook --
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


    // -- work on server side --
    if (process.server) {
        await server_banner_view();     // my script banner code not working in server side
        await loadCategories();
    }

    onBeforeMount(() => {
        if (process.client) {
            if (clear_local_old_slide.value) { // clear localstorage slideshow.
                clear_local_old_slide.value = false; // prevent load this condition again.
                if (slideShow.value && slideShow.value.data) {
                    save_slide_to_localstorage(slideShow.value.data); // store new slide data to localstorage.
                }
            }
        }
    })

    onMounted(() => {
        if (process.client) {
            hidOverflow();
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            checkLocalStorage.value = localStorage.getItem("slide") ? JSON.parse(localStorage.getItem("slide")) : '';

            slideShow.value = localStorage.getItem("slideShow") ? JSON.parse(localStorage.getItem("slideShow")) : []; // prevent change lang at setting and back still old lang.

            // -- show Toast success when have STATE like or any, that login success --
            setTimeout(() => {
                let pa_con = helper.get_params_make_condition(); // get local params condition
                let sta_suc = pa_con && pa_con.status_success && pa_con.status_success.d_params && pa_con.status_success.d_params.status_success ? pa_con.status_success.d_params.status_success : '';
                if (sta_suc) { // if have this params, show toast success
                    message_success.value = sta_suc;
                    error_or_success_message.value = true;
                    $(".sh_the_toast").removeClass('d-none');
                    $(".sh_the_toast").toast({ delay: 6000 });
                    $(".sh_the_toast").toast('show');
                }
                // remove "status_success" params condition at "component/Home_ads_list.vue"

                $(".r_ripple").ripple(); // ripple on tag
            },500);

            // if banner empty, else create slide show
            if (!banner.value) {
                client_banner_view();
            } else {
                create_slide();
            }
            

            loadCategories();  // category
        }
    });

    // watch(()=>{
    //     hidOverflow();
    // })

    function hidOverflow(){
        $('body').css('overflow','unset')
    }


    // banner Server Side
    async function server_banner_view() {
        try {
           
            let type_ban = 'mobile_view'; // isDesktop ? 'desktop' : 'mobile_view';
            // let reqUrl = config.VUE_APP_NEW_MOBI + 'banners';    // new api link
            let reqUrl = config.VUE_APP_API_URL_MOBI + 'banners';   // old api link
            const { data: resBanner } =  useFetch(reqUrl, {
                // key: reqUrl,
                // headers: { page: 'home', "display-type": type_ban }, // header work but not show params in log XML browser.
                params: { page: 'home', "display-type": isMobile.value ? 'mobile_view' : 'desktop' },
            })
            let r = resBanner.value && resBanner.value.data ? resBanner.value.data : '';

            // --- set new slide show to localstorage (slide serverSide) ---
            clear_local_old_slide.value = true;

            // --- server slide show ---
            if (process.server) {
                slideShow.value = { data: r };
                await banner_in_catch();
            }
        } catch (e) {
            console.log('--- Error Banner Home Page ---');
            console.log(e);
        }
    }
    // banner client Side
    function client_banner_view() {
       
        // alert('ok1')
        if (slideShow.value && slideShow.value.data && checkLocalStorage.value === isMobile.value) {
            create_slide();
        } else {
            localStorage.setItem("slideShow",'');
            let banner_view = 'mobile_view'; // isDesktop ? 'desktop' : 'mobile_view';
            // $fetch(config.VUE_APP_NEW_MOBI + 'banners', {
            $fetch(config.VUE_APP_API_URL_MOBI + 'banners', {
                params: { page: 'home', "display-type": isMobile.value ? 'mobile_view' : 'desktop' },
            }).then(res => {
                save_slide_to_localstorage(res.data);  // store slide data to localstorage
                create_slide();

            }).catch(e => {
                if (e.response && e.response.status === 401) { // retry in error from api response
                    if (reload_q_again_1.value < 2) {
                        reload_q_again_1.value += 1;
                        setTimeout( () => { client_banner_view(); }, 3000);
                    } else {
                        reload_q_again_1.value = 0;
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }

    // create banner dynamic
    function save_slide_to_localstorage(data_slide) {
        const object = { data: data_slide, expiry: helper.Date_To_Timestamp('',3600, 'seconds') } // add 1 hour
        localStorage.setItem("slideShow", JSON.stringify(object));
        localStorage.setItem("slide", JSON.stringify(isMobile.value));
        slideShow.value = localStorage.getItem("slideShow") ? JSON.parse(localStorage.getItem("slideShow")) : [];
        
    }
    async function create_slide() {
        await banner_in_catch(); // create banner B.
        setTimeout(() => {
            create_carousel(); // reload carousel
        },300);
    }
    async function banner_in_catch() {
        let data = slideShow.value ? slideShow.value.data : '';
        if (data) {
            let clean_banner = { a: [], b: [] }
            if (data.a && data.a.data && data.a.data.length > 0) {
                let ban_a = data.a.data;
                for (const k in ban_a) {

                    // sub object dont have width and height, must to add from parent width height.
                    if (!ban_a[k].width) { ban_a[k]['width'] = data.a.width ? data.a.width : ''; }
                    if (!ban_a[k].height) { ban_a[k]['height'] = data.a.height ? data.a.height : ''; }

                    if (ban_a[k].type === "image") {
                        clean_banner.a.push(ban_a[k]);
                    } else if (ban_a[k].type === "code") {
                        if (process.client) { // --> client only on banner code.
                            let new_banner = helper.create_banner_code_html(ban_a[k], 'slide', '');
                            ban_a[k]['new_html_banner'] = new_banner.outerHTML;
                            clean_banner.a.push(ban_a[k]);
                        }
                    }
                }
            }
            if (data.b && data.b.data && data.b.data.length > 0) {
                let ban_b = data.b.data;
                for (const i in ban_b) {

                    // sub object dont have width and height, must to add from parent width height.
                    if (!ban_b[i].width) { ban_b[i]['width'] = data.b.width ? data.b.width : ''; }
                    if (!ban_b[i].height) { ban_b[i]['height'] = data.b.height ? data.b.height : ''; }

                    if (ban_b[i].type === "image") {
                        clean_banner.b.push(ban_b[i]);
                    } else if (ban_b[i].type === "code") {
                        if (process.client) { // --> client only on banner code.
                            let new_banner = helper.create_banner_code_html(ban_b[i], '', '');
                            ban_b[i]['new_html_banner'] = new_banner.outerHTML;
                            clean_banner.b.push(ban_b[i]);
                        }
                    }
                }
            }
            banner.value = clean_banner;
        }
        // console.log(banner.value)
    }
    function check_link_banner (link) { return helper.check_link_is_khmer24(link, config); }
    function create_carousel() {
        let m_drag, m_loop;
        // check slide one or more
        if (slideShow.value && slideShow.value.data) { m_loop = true; } else { m_loop = false; }

        // -- check PC or Mobile --
        m_drag = isDesktop ? true : false; // mouseDrag on carousel
        // let res = helper.is_pc_or_mobile_device();
        // if (res === 'pc') {
        //     m_drag = true;  // can switch every view but click slide slow when slide change.
        // } else {
        //     m_drag = false; // can not switch slide in PC view, but click fast when change slide.
        // }
        setTimeout(() => {
            $('#owl_home_slide_show').owlCarousel({
                items: 1,
                autoplayTimeout: 6000,  // time out to switch slide
                loop: m_loop,           // auto play and loop again and again
                mouseDrag: m_drag,

                smartSpeed: 500,
                margin: 5,
                autoplay: m_loop,
                autoplayHoverPause: true
            });
        }, 300);
    }
    function show_page_search() { router.push(localePath({ name: 'search-main', query: { from: 'home' } })); }

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

                await clean_categories(resCate.value.data); // clean categories and get only parent

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
                if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_2.value < 2) {
                        reload_q_again_2.value += 1;
                        setTimeout(() => { loadCategories(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({ name: 'index' }));
                    }
                }
            }
        } else {
            await clean_categories(cate.data); // clean categories and get only parent
        }
    }
    // clean data categories
    async function clean_categories(cate) {
        if (categories.value.length === 0) {
            let arr_cate = [];
            for (let val of cate) {
                if (val.parent == 0) {
                    arr_cate.push(val); // get only parent categories.
                }
            }
            categories.value = arr_cate; // clean and get only parent categories.
        }
    }
    // --- clear post data ---
    function clear_post_data() {
        $('#clear_catch_post').click();
    }
    // ---- tracking params ----
    function track_params(first, tracking) {
        helper.params_make_condition('first', first);
        helper.params_make_condition('tracking', tracking);
    }
    // ---- change language ----
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


</script>
