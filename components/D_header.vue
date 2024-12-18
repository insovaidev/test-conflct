<template>
    <header id="header-dynamic" v-if="!isMobile" class="screen-desktop">
        <nav class="navbar navbar-expand-lg d-container">
            <div class="container-fluid p-0">
                <div class="d-flex">
                    <NuxtLink :to="localePath({name:'index'})" @click="btn_home_page" class="navbar-brand btn-link me-1 p-0">
                        <img src="/icon/khmer24.png" alt="logo-khmer24" width="140px">
                    </NuxtLink>
                    <div class="btn btn-link" id="langs" @click="switchLang()">
                        <img class="img-contain" :alt="locale == 'km' ? 'en' : 'km'" :src="'/icon/'+(locale == 'km' ? 'en' : 'km')+'-40x40.png'" height="25" width="25">
                    </div>
                </div>
                <div class="justify-content-end" >
                    <div class="d-flex align-items-center">
                        <div v-if="check_auth && check_auth !== ''" class="d-flex align-items-center acc"> 
                            <nuxt-link @click="clearResume()" :to="localePath({ name: 'notification' })" aria-label="notifications" class="item-icon btn pt-0 pb-0">
                                <i class="bi bi-bell-fill fn_23 fw-bold"></i>
                                <span class="badge badge-danger style_badge " id="add_badge_not"> {{ not_cookie ? not_cookie : null  }} </span>
                            </nuxt-link>
                            <nuxt-link :to="localePath({ name: 'chats' })" aria-label="chats" class="item-icon btn py-0 ml_8" >
                                    <i class="bi bi-chat-dots-fill fn_23 fw-bold"></i>
                                    <span class="badge badge-danger style_badge " id="add_badge_chat"> {{ chat_cookie ? chat_cookie : null }} </span>
                            </nuxt-link>
                            <div class="btn ml_8 pt-0 pb-0 dt-acc">
                                <div class="dropdown-toggle" data-bs-toggle="dropdown" @click="clearDL()" aria-expanded="true">
                                    <img v-if="i_store" :src="i_store && i_store.logo ? i_store.logo : img_user" :alt="i_store.username"   class="me-2 user-login" >
                                    <img v-else :src="check_auth.user.photo && check_auth.user.photo.small ? check_auth.user.photo.small.url : img_user" :alt="check_auth.user.name"  loading="lazy" class="me-2 user-login" >
                                </div>
                                <ul class="dropdown-menu toggle-menu d-min-w pt-0 d-drop" :class="locale === 'km' ? 'dropdown-accs' : 'dropdown-acc'">
                                    <li v-if="store.length > 0">
                                        <template v-for="(str, index) in arr_dt_data" :key="index">
                                            <div @click="click_top(arr_dt_data, index, str, str.type)" class="d-flex align-items-center dropdown-item p_y pb-1 text-truncate">
                                                <img :src="str.logo ? str.logo : img_user" :alt="str.username" loading="lazy" class="me-2 user-login" :class="index === 0  ? 'dt-border-image' : ''">
                                                <div class="l_h_18 text-truncate">
                                                    <div class="text-truncate" :class="index === 0 ? 'dt-text' : ''">{{ str.name }}</div>
                                                    <div class="fn_12 text-secondary text-truncate">@{{ str.username }}</div>
                                                </div>
                                            </div>
                                        </template>
                                    </li>
                                    <li v-else class="dropdown-item pt-3">
                                        <div class="d-flex">
                                            <div class="mx-1 w-100">
                                                <div @click="click_top('', '', '', 'account')" class="p-0 d-flex align-items-center dropdown-item p_y pb-1 text-truncate">
                                                    <img :src="check_auth.user.photo && check_auth.user.photo.small ? check_auth.user.photo.small.url : img_user" :alt="check_auth.user.name"  loading="lazy" class="me-2 user-login" :class="i_store ? '' : 'dt-border-image'">
                                                    <div class="l_h_18 text-truncate">
                                                        <div class="text-truncate" :class="i_store ? '' : 'dt-text'">{{ check_auth.user.name }}</div>
                                                        <div class="fn_12 text-secondary text-truncate">@{{ check_auth.user.username }}</div>
                                                    </div>
                                                </div>
                                                <nuxt-link v-if="check_auth.user.membership && check_auth.user.membership.type === 'normal'" :to="localePath({ name: 'account-membership' })" class="btn btn-k24-primary-light btn-upgrade">
                                                    {{ $t(`account_t.upgrade_account`)}}
                                                </nuxt-link>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="dropdown-item px-0"><div class="d-line"></div></li>
                                    <li>
                                        <nuxt-link :to="localePath({ name: 'account' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="bi bi-folder2 icons"></i>
                                            <div>{{ $t('new_text_1.my_ads') }}</div>
                                        </nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link :to="localePath({ name: 'account-liked' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="far fa-heart icons"></i>
                                            <div>{{ $t('new_text.likes') }}</div>
                                        </nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link :to="localePath({ name: 'account-saved' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="far fa-bookmark icons"></i>
                                            <div>{{ $t('new_text.saved') }}</div>
                                        </nuxt-link>
                                    </li>
                                    <li class="dropdown-item px-0"><div class="d-line"></div></li>
                                    <li >
                                        <nuxt-link :to="localePath({ name: 'account-apply-jobs' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="bi bi-briefcase icons fn_17"></i>
                                            <div>{{ $t('new_text.a_p') }}</div>
                                        </nuxt-link>
                                    </li>
                                    <li >
                                        <nuxt-link :to="localePath({ name: 'account-job-applications' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="fas fa-clipboard-list icons"></i>
                                            <div>{{ $t('new_text.job_application') }}</div>
                                            <div v-if="total_job_applications > 0" class="ms-1 badge bg-danger position-relative">{{ total_job_applications }}</div>
                                        </nuxt-link>
                                    </li>
                                    <li @click="resume">
                                        <nuxt-link :to="localePath({ name: 'account-resume' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="bi bi-person-vcard icons fn_17"></i>
                                            <div>{{ $t('resume_cv.resume') }}</div>
                                            <img v-if="check_cl_re" src="/icon/spark.gif" alt="spark.gif" width="27" height="27">
                                        </nuxt-link>
                                    </li>
                                    <li class="dropdown-item px-0"><div class="d-line"></div></li>
                                    <li v-if="check_auth && check_auth.user && check_auth.user.setting && check_auth.user.setting.payment && check_auth.user.setting.payment.includes('subscription')"  >
                                        <nuxt-link :to="localePath({ name: 'account-subscriptions' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="icons bi bi-currency-dollar fn_23"></i>
                                            <div>{{ $t('account_t.subscription') }}</div>
                                        </nuxt-link>
                                    </li>
                                    <li class="dropdown-item px-0"><div class="d-line"></div></li>
                                    <li>
                                        <nuxt-link :to="localePath({ name: 'setting' })" class="d-flex align-items-center dropdown-item p_y">
                                            <i class="bi bi-gear icons"></i>
                                            <div>
                                                {{ $t('message.setting') }}
                                            </div>
                                        </nuxt-link>
                                    </li>
                                    <li class="dropdown-item px-0"><div class="d-line"></div></li>
                                    <li class="dropdown-item d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#confirm_logout">
                                        <i class="bi bi-power icons fn_22"></i>
                                        {{ $t('message.logout') }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div v-else class="d-flex align-items-center">
                            <nuxt-link :to="localePath({ name: 'login' })" @click="lg_rg()" class="me-1 btn k24-color fw-bold km">
                                {{ $t('message.login') }}
                            </nuxt-link>
                            <div class="me-1 text-secondary km" disabled>{{ $t('message.or') }}</div>
                            <nuxt-link :to="localePath({ name: 'register' })" @click="lg_rg()" class="btn me-1 k24-color fw-bold km">
                                {{ $t('message.register') }}
                            </nuxt-link>
                        </div>
                        <span>
                            <button @click="btn_create_post" type="button" class="btn btn-k24-secondary km fn_20" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="desktop_ads_new_post">
                                <i class="icon-camera icon_post_user"></i>
                                <span class="ms-1">{{ $t('message.sell') }}</span>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="col-12 right search-box" >
                    <div class="input-group search-input dt_mt_16" id="searchh-suggession">
                        <input type="text" class="form-control input-search field-input-height fn_16 rounded-0 dropdown-toggle" autocomplete="off" data-bs-toggle="dropdown" aria-expanded="false" id="search" :placeholder="$t('message.looking_for')" @click="Searchs"  v-on:keyup="keySearch" v-model="field_search" name="keyword">
                        <ul class="dropdown-menu list-unstyled w-100 mt-2 py-0" :class="data_storage ? '' : 'un-border-b'" id="s-sug" >
                            <li v-if="field_search">
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
                                <div v-else-if="s_sug.length === 0 && show_no_result" @click="click_value_suggestion(field_search,'',[])" class="col style_flex p_s_pad_list_sug s-filter-history h-v-mouse bg-white cur_sur">
                                    <div class="ic-warn-acc-con">
                                        <i class="fas ion-ios-search-strong text_grey"></i>
                                    </div>
                                    <div class="s-f-div-text">
                                        <p class="p_s_recent_history m-0 font_16 break_word parent_color">See Result for {{ field_search }} </p>
                                    </div>
                                </div>
                            </li>
                            <li v-else>
                                <template v-if="data_storage">
                                    <div class="style_flex p_s_pad_field">
                                        <div class="col-6 font_18"> {{ $t('message.recent_search') }} </div>
                                        <div class="col-6 text-right pr-0">
                                            <span @click="remove_localstorage" class="clear parent_color font_18 p_s_pad_clear cl_ripple cur_sur">
                                                {{ $t('message.clear') }}
                                            </span>
                                        </div>
                                    </div>
                                    <div v-for="storage in data_storage" :key="storage" class="col con-recent-history style_flex s-filter-history cur_sur h-v-mouse">
                                        <div @click="select_item_search(storage)" class="p_s_pad_list_history d-flex w-100">
                                            <div  class="ic-warn-acc-con">
                                                <i class="fas fa-history text_grey"></i>
                                            </div>
                                            <div class="s-f-div-text">
                                                <p class="p_s_recent_history m-0 font_16 break_word"> {{ storage }} </p>
                                            </div>
                                        </div>
                                        <div @click="edit_search(storage)" class="p_s_pad_list_history">
                                            <div class="ic-warn-acc-con s-f-pad-text">
                                                <i class="fas fa-pencil-alt text_grey"></i>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </li>
                        </ul>
                        <button type="button"  class="input-group-text field-input-height btn-search-dt" id="basic-addon2" name="search" @click="action_searchs"><i class="bi bi-search"></i></button>
                        <div class="select-category">
                            <button class="btn dropdown-toggle w-100 field-input-height d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="text-truncate box-cat fn_16">
                                    <span v-if="!categoryD">{{ locale==='km' ? 'ផលិតផលទាំងអស់' : 'All Category' }}</span>
                                    <span v-else v-for="all in allCategory">
                                        <span v-if="all.slug === categoryD" >{{ locale==='km' ? all.km_name : all.en_name }}</span>
                                    </span>
                                </div>
                                <i class="bi bi-caret-down-fill fn_13 dt-icon-dropdown"></i>
                            </button>
                            <ul class="dropdown-menu list-unstyled deopdown-category mt-2 py-0">
                                <li class="modal-body content-category">
                                    <div class="fn_16 allcate" @click="seletcCategory('')">
                                        <span>{{ locale==='km' ? 'ផលិតផលទាំងអស់' : 'All Category' }}</span>
                                        <span v-if="!categoryD" class="ms-auto"><i class="bi bi-check-circle-fill a-color"></i></span>
                                    </div>
                                    <template v-for="main in mainCate">
                                        <div @click="seletcCategory(main.slug)" class="fn_16 main-category-height">
                                            <img :src="main.icon && main.icon.small ? main.icon.small.url : ''" :alt="locale === 'km' ? main.km_name : main.en_name" class="main-img-cate">
                                            <b>{{ locale==='km' ? main.km_name : main.en_name }}</b>
                                            <span v-if="main.slug === categoryD" class="ms-auto"><i class="bi bi-check-circle-fill a-color"></i></span>
                                        </div>
                                        <template v-for="sub in subCate" :key="sub">
                                            <div v-if="sub.parent === main.id" @click="seletcCategory(sub.slug)" class="sub-category-height">
                                                <img :src="sub.icon && sub.icon.small ? sub.icon.small.url : ''" :alt="locale === 'km' ? sub.km_name : sub.en_name" class="sub-img-cate">
                                                <i>{{ locale==='km' ? sub.km_name : sub.en_name }}</i>
                                                <span v-if="sub.slug === categoryD" class="ms-auto"><i class="bi bi-check-circle-fill a-color"></i></span>
                                            </div>
                                        </template>
                                    </template>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- Modal -->
    <div class="modal test fade" id="confirm_logout" tabindex="1" aria-labelledby="confirm_logout" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered m-auto top_60 pos_static">
            <div class="modal-content rounded">
            <div class="modal-body text-center">
            {{ $t('message.confirm_logout') }}
            </div>
            <div class="text-center d-flex p-3 border-top">
                <button type="button" class="btn btn-k24-primary me-3" :class="isMobile ? 'btn-height' : 'dt-btn-height'" @click="logout()" >{{ $t('message.logout') }}</button>
                <button type="button" class="btn btn-k24-secondary ms-3" :class="isMobile ? 'btn-height' : 'dt-btn-height'" data-bs-dismiss="modal">{{ $t('message.cancel') }}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { googleTokenLogin, googleLogout } from "vue3-google-login";
    import helper from "/helper";
    const auth_user = useCookie('auth_user')
    const not_cookie = useCookie('not_cookie')
    const chat_cookie = useCookie('chat_cookie')
    const sub_chat_cookie = useCookie('sub_chat_cookie')
    const sub_cm_cookie = useCookie('sub_cm_cookie')
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config = runtime_config.public;
    const router = useRouter(); // user route like (this.$router).
    const route = useRoute(); // user route like (this.$route).
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_11 = ref(0);
    const img_user = '/icon/user-icon.png'
    const check_auth = ref(auth_user);
    const is_from_store = ref(true); // true for store. false for user.
    const r_name = ref(''); // clean route name with prefix.
    const loading = ref(false);
    const refresh_token = ref(null);
    const all_category = useState('all_category',()=>''); 
    const categoryD = useState('categoryD',()=>'')
    const click_one = useState('click_one',()=>'')
    const allCategory = useState('allCategory',()=>[])
    const mainCate = useState('mainCate',()=>[])
    const subCate = useState('subCate',()=>[])
    // search
    const field_search = ref('')
    const search_post = ref('');
    const route_name = ref(helper.clear_prefix_route_name(route.name));
    const timerID_nav = useState('timerID_nav', () => '');
    const GetAll = useState('GetAll',()=>'')
    const isMobile = ref(helper.m_or_d())
    const data_storage = ref(null);
    const timer = ref(null);
    const s_sug = ref([]);
    const show_no_result = ref(false); 
    const sub_key_word = ref([]);
    const arr_key = ref([]);
    const check_cl_re = useState('check_cl_re',()=>'')
    const count_follow = ref('');
    const total_job_applications = ref(0);
    const store = useState('store', ()=> []);
    // await get_all_category();
    const im_store = useCookie('im_store')
    const i_store = useState('i_store',()=> '')
    const arr_dt_data = useState('arr_dt_data',()=>[])

    onMounted(() => {
        // $("#search").focus(function(){
        //     $( "#s-sug" ).addClass( "d-dropdown" )
        // });
        if (process.client) {
            // i_store.value = localStorage.getItem('im_store') ? JSON.parse(localStorage.getItem("im_store")) : ''
            // get_all_category()
            setTimeout(()=>{
                let cate = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : '';
                if(cate){
                    allCategory.value = cate.data
                    mainCate.value = []
                    subCate.value = []
                    cate.data.forEach(cate => {
                        if(cate.parent === '0'){
                            mainCate.value.push(cate)
                        }
                        if(cate.parent !== '0'){
                            subCate.value.push(cate)
                        }
                    });
                }
            },50)
            refreshCookie('auth_user')
            check_new_auth_user()
            route_name.value = helper.clear_prefix_route_name(route.name);
            r_name.value = helper.clear_prefix_route_name(route.name);
            refresh_token.value = check_auth.value && check_auth.value.tokens.refresh_token ? check_auth.value.tokens.refresh_token : null;
            // --- check is from store ---
            check_is_from_store();
            if(route.query && route.query.keyword){
                field_search.value = route.query.keyword
            }
            if( route.query && route.query.position){
                field_search.value = route.query.position
            }

            // checkPageApplyJob();
            if(check_auth.value && isMobile.value === false){
                // start_request();
                function_check();
            }
            categoryD.value = route.params.slugCategory ? route.params.slugCategory  : ''

            const ch_resume = localStorage.getItem('isCheckedR');
            const id_u = check_auth.value ? check_auth.value.user.id : ''
            const ch_id = localStorage.getItem('ch_us'); 
            if(!ch_resume){
                localStorage.setItem('isCheckedR', true);
                check_cl_re.value = true
            }else if(ch_resume != true && id_u == ch_id){
                localStorage.setItem('isCheckedR', false);
                check_cl_re.value = false
            }else{
                localStorage.setItem('isCheckedR', true);
                check_cl_re.value = true
            }
            if(check_auth.value){
                get_profile()
            }
            Searchs()
        }
    });

    watch(() => route.name, () => {
        check_new_auth_user()
        // i_store.value = localStorage.getItem('im_store') ? JSON.parse(localStorage.getItem("im_store")) : ''
        // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
        // isMobile.value = $( window ).width() < 768 ? true : false
        // $( window ).resize( function() {
        //     isMobile.value = $( window ).width() < 768 ? true : false
        // });
        const h_user = useCookie('auth_user')
        route_name.value = helper.clear_prefix_route_name(route.name);
        r_name.value = helper.clear_prefix_route_name(route.name);
        if(r_name.value === 'index'){
            if(h_user.value === undefined){
                check_auth.value = ''
            }
            // else{
            //     check_new_auth_user()
            //     console.log(check_auth.value)
            // }
            
            categoryD.value = route.params.slugCategory ? route.params.slugCategory  : ''
        }
        // --- check is from store ---
        check_is_from_store();
        // console.log(route)
        // checkPageApplyJob();
        
    })
    watch(() => route.params, () => {
        categoryD.value = route.params.slugCategory ? route.params.slugCategory  : ''
    })
    watch(() => route.query, () => {
        if(route.query.keyword){
            field_search.value = route.query.keyword
        }else if(route.query.position){
            field_search.value = route.query.position
        }else{
            field_search.value = ''
        }
    })


    await callOnce(async () => {
        const auth = useCookie('auth_user')
        check_auth.value = auth.value
    })

    function editProfile(text){
        if(text === 'edit-profile'){
            router.push(localePath({ name: 'setting-edit-profile'}))
        }else if(text === 'profile'){
            router.push(localePath({ name: 'account'}))
        }
    }

    function lg_rg(){
        localStorage.removeItem('save_state');
    }

    function get_profile() {
        check_new_auth_user();
        // -- get badge job applications --
        if(check_auth.value){
            $fetch(config.VUE_APP_API_URL_JOB + 'me/job_applications/total_unread', {
                // $fetch(config.VUE_APP_API_URL + 'job_applications/total_unread', {
                headers: { "Access-Token": check_auth.value.tokens.access_token },
                params: { lang: locale.value === 'km' ? 'km' : 'en' },
                }).then(res => {
                    total_job_applications.value = res.data ? parseInt(res.data.total) : 0;
                }).catch(error => {
                if (error.response && error.response.status === 401) { // retry
                    // console.log('error page header')
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout(() => { get_profile(); }, 3000);
                    }else{
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user')
                        router.replace(localePath({name:'index'}));
                    }
                }
            });

            // -- get store --
            $fetch(config.VUE_APP_API_URL + 'me/stores', {
                headers: { "Access-Token": check_auth.value.tokens.access_token },
                params: { lang: locale.value === 'km' ? 'km' : 'en', fields: 'my_setting' }
                }).then(get_store => {
                    store.value = get_store && get_store.data.length > 0 ? get_store.data : [];
                    const exists1 = arr_dt_data.value.some(item => item.id === check_auth.value.user.id);
                    if(!exists1){
                        arr_dt_data.value.push({ type: 'account', id: check_auth.value.user.id, name: check_auth.value.user.name, username: check_auth.value.user.username, logo: check_auth.value.user.photo ? check_auth.value.user.photo.url : '' })
                    }
                    store.value.forEach(val=>{
                        const exists = arr_dt_data.value.some(item => item.id === val.id);
                        if(!exists1){
                            arr_dt_data.value.push({ type: 'store', id: val.id, name: val.title, username: val.username, logo: val.logo ? val.logo.url : '' })
                            // console.log(arr_dt_data.value)
                        }
                    })

                   
                }).catch(error => {
                if (error.response && error.response.status === 401) { // retry
                    // console.log('error page header')
                    if (reload_q_again_11.value <= 2) {
                    reload_q_again_11.value += 1;
                    setTimeout(() => { get_profile(); }, 3000);
                    }else{
                        localStorage.removeItem('auth_user');   // remove localStorage
                        VueCookieNext.removeCookie('auth_user')
                        router.replace(localePath({name:'index'}));
                    }
                }
            });
        }
    }

    function click_top(array, index, object, type){
        if (index > 0) {
            // Remove the item from the array
            const [item] = array.splice(index, 1);
            // Add it to the top of the array
            array.unshift(item);
            arr_dt_data.value = array
        }
        
        if(type === 'account'){
            i_store.value = ''
            router.push(localePath({ name: 'account' }))
        }else{
            let p_tmp = {
                username : object.username,
                logo : object && object.logo ? object.logo : null,
            }
            i_store.value = p_tmp
            router.push(localePath({ name: 'account-store-id', params: { id: object.id } }))
        }
    }

    // ---- show followers or following ----
    function show_follows(condition, enable_click) {
        if (enable_click) {
        save_track_optional('clear', { clear: 'clear_data' });
        router.push(localePath({ name: 'username-follows', params: { username: check_auth.value && check_auth.value.user ? check_auth.value.user.username :'' }, query: { type: condition } }));
        }
    }
    
    function clearDL(){ VueCookieNext.removeCookie('dl_resume') }
    function resume(){
        check_new_auth_user();
        localStorage.setItem('ch_us', check_auth.value.user.id);
        localStorage.setItem('isCheckedR', false);
    }

     function get_all_category() { 
        let cate = process.server ? '' : (localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : '');
        if(cate){
            allCategory.value = cate.data
            mainCate.value = []
            subCate.value = []
            cate.data.forEach(cate => {
                if(cate.parent === '0'){
                    mainCate.value.push(cate)
                }
                if(cate.parent !== '0'){
                    subCate.value.push(cate)
                }
            });
        }else{
            try {
                let reqUrl = config.VUE_APP_API_URL_MOBI + 'categories';
                const { data: allCate } = useFetch(reqUrl, {
                    key: reqUrl,
                    params: {
                        meta: true,
                        v: 1, // for show real image on category
                    },
                })
                if(allCate.value){
                    allCategory.value = allCate.value.data
                    mainCate.value = []
                    subCate.value = []
                    allCate.value.data.forEach(cate => {
                        if(cate.parent === '0'){
                            mainCate.value.push(cate)
                        }
                        if(cate.parent !== '0'){
                            subCate.value.push(cate)
                        }
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }
        
    }
    function seletcCategory(valueCate){
        categoryD.value = valueCate ? valueCate : ''
        // action_searchs()
    }
    function keySearch(e) { 
        if (e.keyCode === 13) { // if click enter keyboard.\
            $( "#s-sug" ).removeClass( "show" )
            $('#search').blur()
            action_searchs(); 
        } else {
            let s_value = $('#search').val();
            field_search.value = s_value; // "v-model" not work some browser vivo browser or any.
            get_key();
            // let key_trim = field_search.value.trim(); // trim keyword out.
            // search_suggestion(key_trim)
        }
     }
     function get_key() {
        let key_trim = field_search.value.trim(); // trim keyword out.
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
     function Searchs() { 
        $( "#s-sug" ).addClass( "d-dropdown" )
        var revers_arr = JSON.parse(localStorage.getItem('storedData'));
        if(revers_arr){
            data_storage.value = revers_arr.reverse(); 
        }
        
     }
    // ---- function search ----
    function action_searchs() {
        // console.log('test')
        let clean_text_search =  field_search.value ? check_title_char(field_search.value) : null;
        let r = route;
        // save value to localstorage
        search_post.value = clean_text_search;
        let search = $('#_search_');
        search.blur();              // close auto focus
        $('#close_modal_search').click();   // close modal
        search.val('');                     // empty search
        search_post.value = '';             // empty value search
        let path_name = route_name.value;
        
        if (path_name === 'search-result' && !route.params) {
            router.replace(localePath({ name: 'search-result', query: { keyword: clean_text_search } }));
        } else {
            // -- go to search listing post --
            let obj = { keyword: clean_text_search };
            $.each(r.query, function (key, value) {
                if (key !== 'keyword') {
                    obj[key] = value; // store query search if have
                }
            });

           
            let category_field = '';
            // -- check slug_category from url query or params --
            if(categoryD.value !== ''){
             category_field = categoryD.value ? categoryD.value  : (r.params.slugCategory ? r.params.slugCategory : '');
            }
            

            // =================== check slug_category SEO (route name) ====================
            // -- (cars or motorcycles) --
            if (route_name.value === 'cars' || route_name.value === 'motorcycles') {
                category_field = route_name.value === 'cars' ? 'cars-and-vehicles' : 'motorcycles-for-sale';
            } else if (route_name.value === 'cars_field' || route_name.value === 'motorcycles_field') {
                category_field = route_name.value === 'cars_field' ? 'cars-for-sale' : 'motorcycles-for-sale';
                obj['ad_field'] = r.params.ad_field;
            } else if (route_name.value === 'cars_field_model' || route_name.value === 'motorcycles_field_model') {
                category_field = route_name.value === 'cars_field_model' ? 'cars-for-sale' : 'motorcycles-for-sale';
                obj['ad_field'] = r.params.ad_field;
                obj['ad_model'] = r.params.ad_model;

            // -- (Phones && Tablets) || (House & Lands) || (Jobs) --
            } else if (route_name.value === 'mobiles' || route_name.value === 'property' || route_name.value === 'jobs') {
                category_field = route_name.value === 'mobiles' ? 'mobile-phones-tablets' : (route_name.value === 'property' ? 'property-housing-rentals' : 'jobs');
            } else if (route_name.value === 'mobiles_sub' || route_name.value === 'property_sub' || route_name.value === 'jobs_sub') {
                category_field = r.params.subcategory;
            } else if (route_name.value === 'mobiles_sub_field') {
                category_field = r.params.subcategory;
                obj['ad_field'] = r.params.ad_field;
            }
            // =================== /check slug_category SEO (route name) ====================
            //  console.log(category_field)


            // --- go to detail user ---
            if (path_name === 'username') {
                router.replace(localePath({ name: 'username', query: obj }))

            // --- go to listing ---
            }
            if (path_name === 'resumes') {
                router.replace(localePath({ name: 'resumes',  params: { resumes: category_field, }, query: obj }))
            // --- go to listing ---
            } else {
                if (category_field) { // search with category (use like this)
                    if(route && route.params.slugCategory ){
                        router.replace(localePath({ name: 'c-slugCategory', params: { slugCategory: category_field, }, query: obj }));
                    }else{
                        router.push(localePath({ name: 'c-slugCategory', params: { slugCategory: category_field, }, query: obj }));
                    }

                    if(clean_text_search){
                        setTimeout(() => {
                            add_keyword_to_localstorage();
                        }, 350);
                    }
                    
                }
                else if(!category_field && !field_search.value){
                    router.replace(localePath({ name: 'search', query: obj }));
                }
                else { // search without category (use like this)
                    if(r_name.value === 'all-ads'){
                        router.replace(localePath({ name: 'all-ads', query: obj }));
                        if(clean_text_search){
                            setTimeout(() => {
                                add_keyword_to_localstorage();
                            }, 350);
                        }
                    }
                    else{
                        if(r_name.value === 'search'){
                            router.replace(localePath({ name: 'search', query: obj }));
                            if(obj.keyword){
                                add_keyword_to_localstorage(obj.keyword);
                            }
                        }else{
                            if(obj.keyword){
                                add_keyword_to_localstorage(obj.keyword);
                            }
                            router.replace(localePath({ name: 'search-result', query: obj }));
                        } 
                    }
                }
            }
        }
    }

    function add_keyword_to_localstorage(OBJ) {
        let check = localStorage.getItem('storedData');
        let text_search = route.query.keyword
        let tr_search = text_search ? text_search.trim() : ( OBJ ? OBJ : '' ); // cut off space
        if (!check || check == null) {
            localStorage.setItem("storedData", JSON.stringify([tr_search])); // save
        } else {
            if(tr_search !== ''){
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
        }
        // --- add more key word to localStorage ---
        var revers_arr = JSON.parse(localStorage.getItem('storedData'));
        data_storage.value = revers_arr.reverse(); // reverse mean move arr down to up
    }

    function remove_localstorage() {
        localStorage.removeItem('storedData');
        // --- show data from localStorage when click clear ---
        data_storage.value = JSON.parse(localStorage.getItem('storedData'));
    }

    function select_item_search(value){
        field_search.value = value
    }   
    function click_action_search(action) {
        let clean_text_search = check_title_char(action);
        router.replace(localePath({ name: 'search-result', query: { keyword: clean_text_search } }));
    }

    function edit_search(value) {
        document.getElementById('search').focus();
        field_search.value = value;
    }

    function click_value_suggestion(val_keyword, check, val_slug_cate) {

        // --> save data to localstorage <--
        field_search.value = val_keyword;
        // add_keyword_to_localstorage();

        // --> search_result page <--
        if (!check) {
            click_action_search(field_search.value);

        // --> go to search listing <--
        } else {
            if (val_slug_cate.length > 0) { // if array val_slug_cate exist, go to listing with slug and keyword.
                // router.replace(localePath({ name: 'search', query: { keyword: val_keyword } }));
                // save_track_optional('search_params', { slugCategory: val_slug_cate['1'], first: 'the_first', tracking: JSON.stringify({ placement: 'home', category_id: val_slug_cate['0'] }) });

                save_track_optional('first', {first: 'the_first'});
                save_track_optional('tracking', { placement: 'home', category_id: val_slug_cate['0'] });
                router.replace(localePath({ name: 'c-slugCategory', params: { slugCategory: val_slug_cate['1'] }, query: { keyword: val_keyword } }));

            } else { // go to listing with keyword only.
                // router.replace(localePath({ name: 'search', query: { keyword: val_keyword } }));
                save_track_optional('first', { first: 'the_first' });
            }
        }
    }

    function check_title_char(search_text) { return helper.check_special_search_text(search_text); }




     // ---- check if from url that have store store ----
     function check_is_from_store() {
        if (r_name.value === 'account-store-id' || r_name.value === 'account-store-id-setting') {
            is_from_store.value = true; // show button create post store. (plush icon)
        } else {
            is_from_store.value = false;  // show button create post user. (camera plus icon)
        }
    }
    function check_new_auth_user() { 
        check_auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
    }
    // ---- Create Post ----
    function btn_create_post() {
        if (check_auth.value) {
            // -- if account have "phone_activated". Must to add phone when create ads --
            if (check_auth.value.user.phone_activated === false) {
                router.push(localePath({ name: 'setting-change-phone', query: {from: 'post_ads'} }));

            } else {
                // -- create post of store --
                if (is_from_store.value) {
                    router.push(localePath({name: 'post', query: {store_id: route.params.id}}));
                // -- create post user --
                } else {
                    router.push(localePath({name: 'post'}));
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
            router.push(localePath({ name: 'auth' }));
        }
    }

    // ---- account ----
    function btn_account_page() {
        if (check_auth.value) {
            if (route.query.check_tap && r_name.value === 'account') {
                window.scrollTo({top: 0 /*, behavior: 'smooth'*/});
            } else {
                router.push(localePath({ name: check_auth.value ? 'account' : 'auth' }));
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
            router.push(localePath({ name: 'auth'}));
        }
    }



     // ---- check auto ----
     function function_check() {
        if (check_auth.value && isMobile.value === false) {
            if (!timerID_nav.value) {  // --> it the most spacial check, if doesn't check, it crate multiple request in the same time <--
                timerID_nav.value = setInterval(() => {
                    start_request(); // set get request badge on created prevent error when request axios
                }, 5000); // 5 second
            }
        } else {
            clear_badge(); // clear request badges,
        }
    }
    // ---- clear auto request on badge ----
    function clear_badge() { clearInterval(timerID_nav.value); timerID_nav.value = ''; }

    function start_request() {
        check_new_auth_user();
        // --- if have Auth User ---
        if (check_auth.value) {

            clear_badge(); // remove auto request when starting request badges,

            $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + 'badges', {
                headers: { "Access-Token": check_auth.value.tokens.access_token },
                params: { lang: locale.value === 'km' ? 'km' : 'en', fields: 'chat,comment' },

            }).then(res => {
                var id_badge = $('html body #add_badge_not');
                if (res.notification && res.notification > 0) {
                        id_badge.removeClass('d-none');
                        not_cookie.value = res.notification
                        id_badge.text(res.notification);
                    } else {
                        not_cookie.value = null
                        id_badge.addClass('d-none');
                        id_badge.text('0');
                    }
                    // -- chats && comments --
                    var id_add_badge = $('html body #add_badge_chat');
                    var id_chats_badge = $('html body #badge_sub_chats');
                    var id_comments_badge = $('html body #badge_sub_comments');
                    if ((res.chat && res.chat > 0) || res.comment > 0) {
                        id_add_badge.removeClass('d-none');
                        chat_cookie.value = parseInt(res.chat)+parseInt(res.comment)
                        // console.log(chat_cookie.value)
                        id_add_badge.text(parseInt(res.chat)+parseInt(res.comment)); // add to icon chat in bottom navigation.
                        if (r_name.value === 'chats') { // only in chats page, must to add badge chats && comments.
                            if (res.chat > 0) { id_chats_badge.removeClass('d-none'); id_chats_badge.text(res.chat); sub_chat_cookie.value = res.chat } // add badge in chats page on chats text title.
                            if (res.comment > 0) { id_comments_badge.removeClass('d-none'); id_comments_badge.text(res.comment); sub_cm_cookie.value = res.comment } // add badge in chats page on comments text title.
                        }
                    } else {
                        id_add_badge.addClass('d-none'); id_add_badge.text('0');
                        id_chats_badge.addClass('d-none'); id_chats_badge.text('0');
                        id_comments_badge.addClass('d-none'); id_comments_badge.text('0');
                        sub_chat_cookie.value = null
                        sub_cm_cookie.value = null
                        chat_cookie.value = null
                    }

                    // -- set new auto request when success --
                    function_check();

                // -- clear retry auto request badge --
                reload_q_again_1.value = 0;

            }).catch(e => {
                if (!e.response) {
                    console.log(e);

                } else if (e.response) {
                    if (e.response.status === 401) { // retry
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_new_auth_user();
                            setTimeout(() => { start_request(); }, 3000);
                        }
                    } else {
                        clear_badge(); // clear auto request badge.
                    }
                }
            });

        // --- remove interval if Auth User remove from localStorage ---
        } else {
            clear_badge(); // clear auto request badge.
        }
    }
    


    // ---- logout ----
    function logout() {
        if (window.navigator.onLine) { // check is connect to internet
            clearLocalStorage(['cart_data', 'role_team_member'])
            clearState(['addressSelected'])
            useCookie('data_edit').value = ''
            loading.value = true;
            var val_auth = localStorage.getItem('auth_user');
            if (val_auth) {
                $fetch(config.VUE_APP_API_URL + 'auth/logout',{
                    // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                    headers: {"Refresh-Token": refresh_token.value},
                    method: 'POST',
                    params: {lang: locale.value},
                    body: new URLSearchParams({device_id: 0})
                }).then(res => {
                    $('#confirm_logout').modal('hide')
                    // ---- check if login with google ----
                    if (check_auth.value && check_auth.value.user.account_verification && check_auth.value.user.account_verification.google) {
                        googleLogout();
                    }
                    not_cookie.value = null
                    chat_cookie.value = null
                    // ---- clear data in localstorage ----
                    localStorage.removeItem('auth_user');
                    // ---- clear cookie storage ----
                    VueCookieNext.removeCookie('auth_user');
                   
                    // ---- go to home page ----
                    // location.reload()
                    // location.reload(localePath({name: 'index'}));
                    // router.push(localePath({name: 'index'}));
                    reloadNuxtApp({ path: "/", ttl: 1000 });

                    check_new_auth_user()

                }).catch(error => {
                    if (!error.response) {
                        not_cookie.value = null
                        chat_cookie.value = null
                        $('#modal_show_confirm_logout' ).modal('hide');
                        loading.value = false; // close loading
                        $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                    } else {
                        let check = error.response ? error.response : ''; // original data error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);
                        if (check && check.status === 401) { // retry
                            if (reload_q_again_1.value <= 2) {
                                reload_q_again_1.value += 1;
                                check_auth();
                                setTimeout( () => { logout(); }, 3000);
                            } else {
                                not_cookie.value = null
                                chat_cookie.value = null
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');      // remove cookie storage
                                router.push(localePath({name: 'index'}));
                            }
                        } else {
                            not_cookie.value = null
                            chat_cookie.value = null
                            $('.show_text_status').text(data_parse._data.message);
                            $('#modal_show_status').modal('show');
                            
                        }
                    }
                }).finally(() => { loading.value = false; });
            }

        } else {
            $('#modal_show_confirm_logout').modal('hide');
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');
        }
    }

    // ---- if click nav current page scroll to top ----
    function btn_home_page() {
        categoryD.value = ''
        window.scrollTo({top: 0}); // window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout( () => {
            $('#clear_catch_post').click(); // -- clear catch post at homePage --
        }, 1000); // set timeout prevent view another page load slow.
    }

    // function checkPageApplyJob(){
    //     if( r_name.value === 'chats-send-resume' || r_name.value === 'chats-shipping-billing-address'){
    //         $('#langs') .addClass( "disabled" );
    //     }else{
    //         $('#langs') .removeClass( "disabled" );
    //     }
    // }

    function clearResume(){
        GetAll.value = ''
    }

    // const lange = useCookie('lang')
    function switchLang(){
        // if(locale.value === 'km'){
        //     lange.value = 'en'
        // }else{
        //     lange.value = 'km'
        // }
        router.replace(switchLocalePath(locale.value == 'km' ? 'en' : 'km'))
    }

    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }

     
</script>