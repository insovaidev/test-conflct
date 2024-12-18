
<template>
    <div>
        <div class="max_width_form mt_80">
            <!-- App Bar -->
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-0 l_h_con_title">
                        <p class="name_style truncate_wrap mb-0 ms-2 text-left"> {{ $t('new_text_2.branches') }} </p>
                    </div>
                </div>
            </div>
        
            <!-- Body -->
            <div  v-if="!isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text_2.branches') }}</div>
            <div class="min_h":class="isMobile ? 'pt-5 px-3' : 'margin_below_app_bar bg-white p-3 rounded-top border'">
        
                <article v-for="(branch, index) of branches" :key="index" class="col-12 no_padding l-branches"
                        :class="isDesktop ? 'mb-2 dt_radius dt_border' : ''">
                    <div class="l-branches-con">
                        <div class="cur_sur" v-on:click="show_options(branch.id,branch.title)">
                            <div class="de-flex-q-c-title">
                                <p> {{ branch.title ? branch.title : '' }} </p>
                                <i v-if="check_is_admin" class="icon-ellipsis-vertical"></i>
                            </div>
                            <div class="l-b-c-sub">
                                <p v-if="branch.email"><i class="icon-mail"></i>{{ branch.email ? branch.email : '' }}</p>
                                <p v-if="branch.phone"><i class="icon-phone1"></i>{{ branch.phone ? branch.phone.join(" , ") : '' }}</p>
                                <div class="l-b-c-sub-loc">
                                    <p><i class="icon-map-pin"></i></p>
                                    <div class="loc_overview">
                                        <p class="m-0">{{ language === 'km' ? branch.location.km_name : branch.location.en_name }}</p>
                                        <p class="m-0">{{ branch.address ? branch.address : '' }}</p>
                                        <a rel="nofollow" v-if="branch.map" @click.stop.prevent="link_google_map(branch.map.x, branch.map.y)" class="parent_color get_direction">
                                            Get Directions
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
        
                <!-- btn add new branches -->
                <template v-if="isMobile">
                    <button v-if="check_is_admin" @click="create_new_branch" class="b-add-new-branch" aria-label="plus">
                        <i class="icon-plus"></i>
                    </button>
                </template>

                <template v-if="!isDesktop">
                    <ClientOnly>
                        <VueEternalLoading :load="show_branches" v-model:is-initial="isInitial" margin="800px">
                            <template #loading>
                                <!-- loading when have data -->
                                <div v-if="branches.length > 0" class="text-center mt-4">
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
                                                    <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
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
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="branches.length > 0 ? '' : ' margin_below_app_bar'">
                                    <div class="no_more_result p-2">
                                        <div class="p_bg_status">
                                            <span class="fas fa-wifi size_icon_status"></span>
                                            <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
                                            <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                            <button @click="retry()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #no-more>
                                <div class="no_more_result"></div>
                            </template>
                            <template #no-results>
                                <div class="no_more_result n-m-r-mg">
                                    <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                    <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>
                                </div>
                            </template>
                        </VueEternalLoading>
                    </ClientOnly>
                    <br>
                </template>
                <template v-else>
                    <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                        <div v-if="branches.length > 0" class="text-center mt-4 mb-4">
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
                                        <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
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
                    <div v-else class="des_btn_load_more width_100">
                        <button v-if="branches_hide_btn_load_more" @click="manually_show_branches" class="btn">{{ $t('text_desktop.load_more') }}</button>
                        <div v-else-if="branches.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                            <i class="fa fa-exclamation-circle u_no_result_font"></i>
                            <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                        </div>
                    </div>
                </template>
                <template v-if="isDesktop"><br><br><br></template>
            </div>
            <div v-if="!isMobile && check_is_admin" class=" bg-white p-3 border rounded-bottom">
                <button  @click="create_new_branch" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                    Add New Branch
                </button>
            </div>
        
            <!-- Modal show error connection -->
            <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style mg-mo-auto" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status b-s-h-con">
                            <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
                            <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
                        </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show error connection -->
        
            <!-- Modal show options -->
            <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="mo_options" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                    <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 'modal_bottom_screen' : ''">
                            <div class="option_selected">
                                <div class="modal-body p-0">
                                    <ul class="list-unstyled mobile_modal_actions_container">
                                        <li @click="show_edit_branch" class="mobile_modal_action cur_sur">
                                            <div class=" color_reason m-auto"> {{ $t('lng.edit') }} </div>
                                        </li>
                                        <li @click="show_remove_branch" class="mobile_modal_action cur_sur">
                                            <div class=" color_reason bor_bot_unset text-danger m-auto"> {{ $t('new_text.remove') }} </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`message.cancel`) }}</button>
                            <!-- <div class="a_cancel_btn_modal_bg">
                                <div class="cl_ripple close_dialog_language a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                                    <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show options -->
        
            <!-- show loading full screen -->
            <div v-if="loading_field" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>
        
            <!-- show success message -->
            <div class="toast style_toast d-none toast_branches toast_z_index" >
                <div class="toast-header header_padding_toast">
                    <strong class="mr-auto style_flex">
                        <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                        <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                        <p class="m-0 ms-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
                    </strong>
                    <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <!-- /show success message -->
        
            <!-- remove branches -->
            <div class="modal class_modal_show_message" id="modal_confirm_delete" tabindex="-1" role="dialog">
                <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                    <div class="modal-content max_width_form">
                        <div class="modal-body break_word_ show_text_status p-3">
                            <p class="m-0">{{ $t('lng.are_u_sure') }}</p>
                            <p class="m-0">{{ $t('lng.u_w_remove') }} "{{ branch_title }}" {{ $t('lng.u_w_list') }}</p>
                        </div>
                        <div class="modal-footer u_safety_footer">
                            <button type="button" data-bs-dismiss="modal" class="btn text_grey"> {{ $t('message.cancel') }} </button>
                            <button type="button" @click="click_remove()" class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /remove branches -->
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
    const user_data = ref('');

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const pageSize = ref(0);
    const branches = ref([]);
    const loading_field = ref(false);
    const message_success = ref('');
    const error_or_success_message = ref(true);

    const isInitial = ref(true);
    const branches_hide_btn_load_more = useState('branches_hide_btn_load_more', () => true);
    const dt_loading = ref(false);

    const store_id = ref(route.params.id ? route.params.id : '');
    const branch_id = ref('');
    const branch_title = ref('');
    const detail_store = ref('');       // for detail store.
    const check_is_admin = ref(false);  // check if admin or not.

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    const reload_q_again_3 = ref(0);

    // --- share tracking ---
    const current_index = ref('');
    const isMobile= ref(helper.m_or_d())
    // --- meta variable ---
    const meta_title_br = useState('meta_title_br', () => 'Branches - Khmer24.com');

    useHead({
        title: meta_title_br.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_br.value },
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
            // --- check auth exist or not ---
            if (helper.check_auth_user() === false) {
                router.replace(localePath({ name: 'auth' }));
            }else{
            setTimeout(()=>{
                get_detail_store();
            },50)
            }
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';

            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const p_clear = pa_con && pa_con.status && pa_con.status.d_params ? pa_con.status.d_params : ''; // check status from params.
            if (p_clear && p_clear.status) {
                toast_message(p_clear.status,true);

                // prevent click back still in the same page, so must to clear by click back
                goBack(); // if success history must to go back 1 state.
            }

            

            // --- show detail store ---
            
            // --- ripple affect ---
            ripple();
            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            if (isDesktop && branches.value.length === 0) {
                manually_show_branches(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('status');
    })

    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_branches');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }
    // ---- get detail store ----
    function get_detail_store() {
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: {
                    lang: language.value,
                    fields: 'id,owner_id',
                    // fields: 'id,title,username,logo,cover,owner_id,about,membership,modified_date,created_date,contact,description,category,categories,keywords,business_hours',
                },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(get_store => {
                detail_store.value = get_store.data;
                check_is_admin.value = user_data.value.user.id === detail_store.value.owner_id ? true : false;

            }).catch(error => {
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout(() => { get_detail_store(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }

    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- search branches ----
    async function show_branches({loaded, error, noMore, noResults}, { isFirstLoad }) {
        check_new_auth_user();

        if( user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/branches', {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { offset: pageSize.value, lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),

            }).then(res => {
                pageSize.value += res.limit; // add offset
                if (res.data.length) {
                    branches.value = branches.value.concat(res.data); // concat in multiple array
                }

                // -- tracking on google analytic --
                if (branches.value.length <= 10 && pageSize.value === 20) {  } // prevent branches post smaller than 10 and request two time
                else { track_google_analytics(pageSize.value > 10 ? pageSize.value : 0); }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore');
                    }
                } else {
                    if (branches.value.length < pageSize.value) {
                        noMore(); // stop scroll.
                    } else {
                        loaded(); // scroll down get more.
                    }
                }

            }).catch(e => {
                if (!e.response) {
                    error();

                } else if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        check_new_auth_user();
                        setTimeout( () => { loaded(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            });
        }
    }

    // ---- manually get branches ----
    function manually_show_branches() {
        check_new_auth_user();
        dt_loading.value = true;

        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/branches', {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { offset: pageSize.value, lang: language.value },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),

        }).then(res => {
            pageSize.value += res.limit; // add offset
            if (res.data.length) {
              branches.value = branches.value.concat(res.data); // concat in multiple array
            }
            dt_loading.value = false;
            branches_hide_btn_load_more.value = branches.value.length < pageSize.value ? false : true; // close button loadMore

            // -- tracking on google analytic --
            if (branches.value.length <= 10 && pageSize.value === 20) {  } // prevent branches post smaller than 10 and request two time
            else { track_google_analytics(pageSize.value > 10 ? pageSize.value : 0); }

        }).catch(e => {
          if (!e.response) {

          } else if (e.response) {
            if (e.response.status === 401) { // retry
              if (reload_q_again_1.value <= 2) {
                reload_q_again_1.value += 1;
                check_new_auth_user();
                setTimeout(() => { manually_show_branches(); }, 3000);
              } else {
                localStorage.removeItem('auth_user');
                VueCookieNext.removeCookie('auth_user');
                router.replace(localePath({name: 'index'}));
              }
            }
          }
          dt_loading.value = false;
        });
    }

    // ---- show modal options ----
    function show_options(id, title) {
        // --- check if user is admin, can change branches ---
        if (check_is_admin.value) { // true
            branch_id.value = id;
            branch_title.value = title;
            $('#mo_options').modal('show');
        }
    }
    // ---- edit branches ----
    function show_edit_branch() {
        $('#mo_options').modal('hide')
        router.push(localePath({ name: 'account-store-id-setting-branches-add-branches-branch_id', params: { id: route.params.id, branch_id: branch_id.value } }));
    }
    // ---- show map ----
    function link_google_map(x, y) {
        var url = window.open('https://maps.google.com/maps?q='+x+','+y, '_blank');
        url.focus();
    }
    // ---- create new branch ----
    function create_new_branch() {
        router.push(localePath({ name: 'account-store-id-setting-branches-add-branches' }));
    }
    // ---- remove branches ----
    function show_remove_branch() {
        $('#mo_options').modal('hide'); // hide modal option.
        $('#modal_confirm_delete').modal('show'); // show modal remove.
    }
    function click_remove() {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/branches/'+branch_id.value, {
            headers: { "Access-Token": user_data.value.tokens.access_token },
            params: { lang: language.value },
            // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            method: 'DELETE',

        }).then(res => {
            // -- hide modal remove when successful --
            $('#modal_confirm_delete').modal('hide');
            // -- show message success --
            toast_message(res.message, true);
            // -- remove array from list --
            $.each(branches.value, (k, v) => {
                if (v.id === branch_id.value) {
                    branches.value.splice(k, 1);
                    return false;
                }
            });

        }).catch(error => {
            loading_field.value = false;
            if (!error.response) {
                if (reload_q_again_3.value < 2) {
                    reload_q_again_3.value += 1;
                    check_new_auth_user();
                    setTimeout( () => { click_remove(); }, 3000);
                }

            } else if (error.response && error.response.status === 401) { // retry
                if (reload_q_again_3.value <= 2) {
                    reload_q_again_3.value += 1;
                    check_new_auth_user();
                    setTimeout( () => { click_remove(); }, 3000);
                } else {
                    localStorage.removeItem('auth_user');
                    VueCookieNext.removeCookie('auth_user');
                    router.replace(localePath({name: 'index'}));
                }
            }
        }).finally(() => (loading_field.value = false));
    }

    // ---- track on google analytic ----
    function track_google_analytics (per_page) {
        // setTimeout(() => {
            let offset = per_page > 0 ? '?offset=' + per_page : ''; // set offset of page if scroll get more data
            let page_path = route.path + offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_br.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Branches', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- click back one page ----
    function goBack() {
        window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'}));
    }
    // ---- ripple effect on UI ----
    function ripple() {
        setTimeout(function () { $(".arrow_back_nav,.cl_ripple").ripple(); }, 300);
    }
</script>

