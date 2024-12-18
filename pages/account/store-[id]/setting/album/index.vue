
<template>
    <div class=" mt_80">
        <!-- App Bar -->
        <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-1 l_h_con_title">
                    <p class="m-0 name_style truncate_wrap">{{ $t('new_text_2.photo_album') }}</p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div v-if="!isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text_2.photo_album') }}</div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 min_h" :class="isDesktop ? 'des_container mt-1 dt_par_album' : 'margin_below_app_bar no_padding'">
            <div class="flex_all_post lists_post_content" :class="isMobile ? 'mt-5' : ''" id="height_div">
                <!-- create album -->
                <article v-if="check_is_admin" class="a-t-album-con" :class="list_album.length > 0 ? isMobile ? '' : 'dt-a-t-album-con' : 'width_100'">
                    <div class="a-t-album-child-1">
                        <div class="my_card a-t-card-con a-t-add-album">
                            <div @click="create_name_album" class="a-t-add-al-1 cur_sur">
                                <div>
                                    <span class="icon-images"></span>
                                    <p>{{ $t('new_text_2.add_album') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <!-- show album -->
                <template v-if="list_album.length > 0">
                    <article v-for="(album, index) of list_album" :key="index" class="a-t-album-con" :class="isMobile ? '' : 'dt-a-t-album-con'">
                        <div class="a-t-album-child-1">
                            <div @click="show_detail_album(album.id)" class="my_card a-t-card-con cur_sur">
                                <img :src="album.thumbnail ? album.thumbnail : empty_img_post" alt="thumbnails" @error="imageUrlAlt_post">
                                <div class="a-t-card-ch1">
                                    <div class="_flex_ text-white">
                                        <p class="truncate col-10 a-t-album-text">{{ album.title ? album.title : '' }}</p>
                                        <i v-if="check_is_admin" @click.stop.prevent="show_modal_options(album.id, album.title)" class="icon-ellipsis-vertical a-t-album-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </template>
            </div>

            <template v-if="!isDesktop">
                <ClientOnly>
                    <VueEternalLoading :load="show_album" margin="800px">
                        <template #loading>
                            <!-- loading when have data -->
                            <div v-if="list_album.length > 0" class="text-center mt-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                            <!-- loading when data empty -->
                            <div v-else class="width_100">
                                <div class="flex_all_post lists_post_content">
                                    <article v-for="s in 4" :key="s" class="a-t-album-con">
                                        <div class="a-t-album-child-1">
                                            <div class="my_card a-t-card-con a-t-add-album animated-background"></div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </template>
                        <template #error="{ retry }">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="list_album.length > 0 ? '' : 'margin_below_app_bar'">
                                <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
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
                            <div hidden class="no_more_result " :class="isMobile ? 'n-m-r-mg' : 'py-5 bg-white'">
                                <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                                <p class="no_more_result mt-2">You don't have any photo right now</p>
                            </div>
                        </template>
                    </VueEternalLoading>
                </ClientOnly>
                <br><br>
            </template>
            <template v-else>
                <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                    <div v-if="list_album.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <div v-else class="width_100">
                        <div class="flex_all_post lists_post_content">
                            <article v-for="s in 4" :key="s" class="a-t-album-con">
                                <div class="a-t-album-child-1">
                                    <div class="my_card a-t-card-con a-t-add-album animated-background"></div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div v-else class="des_btn_load_more">
                    <button v-if="l_hide_btn_load_more" @click="manually_show_album" class="btn">{{ $t('text_desktop.load_more') }}</button>
                    <div v-else-if="list_album.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                    </div>
                </div>
            </template>
        </div>

        <!-- upload photos -->
        <div class="brows_file" id="brows_file">
            <a rel="nofollow" aria-label="browse" id="browse"></a>
        </div>

        <!-- loading field -->
        <div v-if="loading_field" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
            </div>
        </div>

        <!-- Modal show response error -->
        <div class="modal class_modal_show_message" id="modal_show_status" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3">  </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary">{{ $t('message.close') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show response error -->

        <!-- Modal create name Album -->
        <div class="modal class_modal_show_message" id="modal_create_album_name" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                <div class="modal-content max_width_form"> <!-- modal_content_style -->
                    <div class="modal-body break_word_ p-3">
                        {{ $t('new_text_2.title_album') }}
                        <div class="col-12 p-0 position_relative">
                            <input type="text" v-model="album_name" placeholder="..." maxlength="255" id="createName" ref="createName"
                                   class="form-control custom_field more_border pad_right_text_icon mt-2 createName">
                        </div>
                    </div>
                    <div v-if="error_album_name" class="form_error_style" style="margin-left: 15px!important;">
                        <span> {{ error_album_name }} </span>
                    </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn" style="color: grey;"> {{ $t('message.cancel') }} </button>
                        <button type="button" class="btn text-primary" @click="click_next"> {{ $t("new_text_2.next") }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal create name Album -->

        <!-- Modal show options -->
        <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="mo_options" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                    <div :class="isMobile ? 'modal_bottom_screen' : ''">
                        <div class="option_selected">
                            <div class="modal-body p-0">
                                <ul class="list-unstyled mobile_modal_actions_container">
                                    <li @click="show_edit_album_name" class="mobile_modal_action cur_sur">
                                        <div class="m-auto color_reason"> {{ $t('new_text_2.rename') }} </div>
                                    </li>
                                    <li @click="delete_album" class="mobile_modal_action cur_sur">
                                        <div class="m-auto color_reason bor_bot_unset text-danger"> {{ $t('new_text.remove') }} </div>
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

        <!-- Modal show confirm delete album -->
        <div class="modal class_modal_show_message" id="modal_show_confirm_leave" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text_2.delete_album') }} ? </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" @click="confirm_delete_album" class="btn text-primary text-danger"> {{ $t('message.delete') }} </button>
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.cancel') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show confirm delete album -->

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
            <div class="modal-dialog max_width_form mg-mo-auto" role="document" >
                <div class="modal-content">
                    <div class="modal-body break_word_ b-s-h-con">
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

        <!-- modal Create Album Photos -->
        <div class="modal" :class="isMobile ? 'style_full_screen' : ''" id="modal_create_photos" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto'" role="document">
                <div class="modal-content " :class="isMobile ? 'modal_content_style' : ''">
                    <!-- app -->
                    <div class="_div_nav bg_app_bar_header_">
                        <div data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                            <button class="btn clear-btn-app-bar" aria-label="back">
                                <i class="icon-clear font_click_back"></i>
                            </button>
                        </div>
                        <div class="col _pad_col_icon">
                            <a rel="nofollow" class="set-app-name-title">{{ album_name }}</a>
                        </div>
                        <div v-if="photos_array.length > 0 && photos_array.length !== limit_photos" @click="show_brows" class="_pad_col_icon">
                            <button class="btn mar-member-add" aria-label="plus">
                                <i class="icon-plus font_click_back"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- body -->
                    <div class="modal-body a-t-modal-create">

                        <!-- count image uploaded -->
                        <p class="a-t-c-photos"> {{ photos_array.length }} / {{ limit_photos }} </p>

                        <!-- when photos is empty -->
                        <div v-if="photos_array.length === 0" class="my_card a-t-empty-photos" @click="show_brows">
                            <div>
                                <span class="icon-images"></span>
                                <p>{{ $t('new_text_2.upload_photos') }}</p>
                            </div>
                        </div>

                        <!-- when photos not empty -->
                        <template v-if="photos_array.length > 0">
                            <div v-for="(photo, index) in photos_array" :key="index" class="a-t-display-photos">
                                <div class="p_big_cover_img mt-2">
                                    <a rel="nofollow" aria-label="photo" :href="photo.url_img" data-fancybox="photo1">
                                        <img :src="photo.url_img" alt="photo" class="img_product a-t-h-photo">
                                    </a>
                                    <div @click="remove_img(photo.file)" class="p_remove_profile_img p_remove_profile_big">
                                        <a rel="nofollow" href="javascript:void (0)" aria-label="minus" class="a-t-h-btn-minus">
                                            <i class="fas fa-minus p_mr_icon_big"></i>
                                        </a>
                                    </div>
                                    <div class="a-t-photo-des">
                                        <input maxlength="255" type="text" v-model="form.data_des[index]" :placeholder="$t('message.description')" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </template>

                        <br><br><br>
                    </div>
                    <div v-if="photos_array.length > 0 && isMobile=== false">
                        <button @click="create_photos_album" type="button" class="btn btn-sm width_100 e_style_btn_filter custom_btn_">
                            {{ $t('message.submit') }}
                        </button>
                    </div>

                    <div v-if="photos_array.length > 0 && isMobile" class="nav p_div_apply_filter">
                        <button @click="create_photos_album" type="button" class="btn btn-sm width_100 e_style_btn_filter custom_btn_">
                            <p class="m_text_btn"> {{ $t('message.submit') }} </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal Create Album Photos -->

        <!-- show success message -->
        <div class="toast style_toast d-none toast_album toast_z_index" >
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
    const empty_img_post = ref("/icon/empty_post.png");

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const check_is_admin = ref(false);  // check if admin or not.
    const store_id = ref(route.params.id ? route.params.id : '');  // store id.

    const pageSize = ref(0);
    const list_album = ref([]);
    const loading_field = ref(false);
    const check_upload_progress = ref(0);  // for check; if upload file are still progressing
    const count_current_length_img = ref(0);  // check count current image length
    const photos_array = ref([]);
    const limit_photos = ref(24);

    const form = ref({ data_des: [] });

    // --- load more button ---
    const l_hide_btn_load_more = ref(true);
    const dt_loading = ref(false);

    // --- create name album ---
    const album_id = ref('');
    const album_name = ref('');
    const error_album_name = ref('');

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_3 = ref(0);
    const reload_q_again_2 = ref(0); const reload_q_again_4 = ref(0);

    // --- for check message show in toast ---
    const message_success = ref('');
    const error_or_success_message = ref(true);

    // --- meta variable ---
    const meta_title_album = useState('meta_title_album', () => 'Store Album - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_album.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_album.value },
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
            if (helper.check_auth_user() === false) { router.replace(localePath({ name: 'auth' })); };
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            check_new_auth_user();

            // --- check message success ---
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const p_clear = pa_con && pa_con.message && pa_con.message.d_params ? pa_con.message.d_params : ''; // check message from params.
            if (p_clear && p_clear.message) {
                setTimeout(() => { toast_message(p_clear.message, true); },1000);
            }

            // --- get detail store ---
            get_detail_store();

            if (isDesktop && list_album.value.length === 0) {
                manually_show_album(); // In Desktop View and post empty for the first, must get new data.
            }

            // --- Fancybox without hash (not push state history browser) ---
            Fancybox.defaults.Hash = false;
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('message');
        Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
    })

    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_album');
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }
    // ---- get detail store ----
    function get_detail_store() {
        check_new_auth_user();
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
                let store = get_store.data;
                check_is_admin.value = user_data.value.user.id === store.owner_id ? true : false;

            }).catch(error => {
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_4.value <= 2) {
                        reload_q_again_4.value += 1;
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
    // ---- search show user ----
    async function show_album({loaded, error, noMore, noResults}, { isFirstLoad }) {
        check_new_auth_user();

        if(user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos', {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { offset: pageSize.value, lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),

            }).then(res => {

                pageSize.value += res.limit;
                if (res.data.length) {
                    list_album.value = list_album.value.concat(res.data); // concat in multiple array
                }

                // -- tracking on google analytic --
                if (list_album.value.length <= 10 && pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
                else { track_google_analytics(pageSize.value > 10 ? pageSize.value : 0); }

                // -- check stop scroll or scroll more --
                if (res.data.length === 0) {
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore');
                    }
                } else {
                    if (list_album.value.length < pageSize.value) {
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

    // ---- manually load more ----
    function manually_show_album() {
        check_new_auth_user();
        dt_loading.value = true;

        $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos', {
          headers: { "Access-Token": user_data.value.tokens.access_token },
          params: { offset: pageSize.value, lang: language.value },
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),

        }).then(res => {

          pageSize.value += res.limit;
          if (res.data.length) {
            list_album.value = list_album.value.concat(res.data); // concat in multiple array
          }
          dt_loading.value = false;
          l_hide_btn_load_more.value = list_album.value.length < pageSize.value ? false : true; // close button loadMore

          // -- tracking on google analytic --
          if (list_album.value.length <= 10 && pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
          else { track_google_analytics(pageSize.value > 10 ? pageSize.value : 0); }

        }).catch(e => {
          if (!e.response) {

          } else if (e.response) {
            if (e.response.status === 401) { // retry
              if (reload_q_again_1.value <= 2) {
                reload_q_again_1.value += 1;
                check_new_auth_user();
                setTimeout(() => { manually_show_album(); }, 3000);
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
    function show_modal_options(alm_id, alm_name) {
        album_id.value = alm_id;
        album_name.value = alm_name;
        $('#mo_options').modal('show');
    }
    // ---- show detail album ----
    function show_detail_album(album_id) {
        router.push(localePath({ name: 'account-store-id-setting-album-detail-album-album_id', params: { id: store_id.value, album_id: album_id } }));
    }
    // ---- show modal name album ----
    function create_name_album() {
        album_id.value = '';
        album_name.value = '';
        error_album_name.value = '';
        $('#modal_create_album_name').modal('show');
        setTimeout(() => {
            document.getElementById('createName').focus();
            $('#modal_create_album_name').on('shown.bs.modal', function () {
                $('#createName').focus();
            });
        }, 500)
    }
    // ---- click next ----
    function click_next() {
        $('#mo_options').modal('hide');                         // -- close modal options when click button "Next" --

        if (album_name.value && album_id.value) {                 // -- edit title album --
            edit_name_album('');
            $('#modal_create_album_name').modal('hide');
            error_album_name.value = '';

        } else if (album_name.value && !album_id.value) {         // -- create title and photos album --
            clean_value_pl_upload();                       // clean old data pl-upload
            $('#modal_create_photos').modal('show');
            $('#modal_create_album_name').modal('hide');
            error_album_name.value = '';

        } else {
            $('#createName').focus(); // set focus
            error_album_name.value = 'Please enter the album';
        }
    }
    // ---- show edit album name ----
    function show_edit_album_name() {
        $('#mo_options').modal('hide');                 // hide modal options.
        $('#modal_create_album_name').modal('show');    // show modal edit album name.
    }
    // ---- edit or create name album ----
    function edit_name_album(data) {
        // -- url and data_body --
        let url = ''; let data_body = [];
        // Edit url
        if (album_id.value) {
            url = 'me/stores/'+store_id.value+'/photos/'+album_id.value;
            data_body = { title: album_name.value };

        // Create url
        } else {
            url = 'me/stores/'+store_id.value+'/photos';
            data_body = data;
        }

        check_new_auth_user();
        if (window.navigator.onLine) {
            loading_field.value = true;
            // --- edit profile picture ---
            $fetch(config.VUE_APP_API_URL + url, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'POST',
                body: new URLSearchParams(data_body)

            }).then(res => {
                // -- Is Edit --
                if (album_id.value) {
                    $.each(list_album.value, (k, v) => {
                        if (v.id === album_id.value) {
                            list_album.value[k] = res.data;
                            return
                        }
                    });

                // -- Is Create --
                } else {
                    // push create new album photo to list_album
                    let rev = list_album.value.reverse();
                    rev.push(res.data);
                    list_album.value = rev.reverse();

                    // -- clean old data pl-upload --
                    clean_value_pl_upload();
                    $('#modal_create_photos').modal('hide'); // close modal
                }

                // -- show status success --
                toast_message(res.message, true);

            }).catch(error => {
                if (!error.response) {
                    loading_field.value = false; // close loading_field
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                } else if (error.response && error.response.status === 401) {
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { edit_name_album(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }

                } else {
                    let check = error.response;
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    toast_message(data_parse._data.message, false);
                }
            }).finally(() => (loading_field.value = false));

        } else {
            loading_field.value = false; // close loading_field
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }
    // ---- show modal confirm delete album ----
    function delete_album() {
        $('#mo_options').modal('hide');                 // close modal options.
        $('#modal_show_confirm_leave').modal('show');   // show confirm delete album.
    }
    // ---- start delete album ----
    function confirm_delete_album() {
        check_new_auth_user();
        if (window.navigator.onLine) {
            loading_field.value = true;
            // --- edit profile picture ---
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos/'+album_id.value, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'DELETE',

            }).then(res => {
                // -- remove album from list --
                for (var i = 0; i < list_album.value.length; i++) {
                    if (album_id.value === list_album.value[i].id) {
                        list_album.value.splice(i, 1);        // remove
                        break
                    }
                }

                // -- close modal confirm delete --
                $('#modal_show_confirm_leave').modal('hide');

                // -- show status success --
                toast_message(res.message, true);

            }).catch(error => {
                if (!error.response) {
                    loading_field.value = false; // close loading_field
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                } else if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { confirm_delete_album(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }

                } else {
                    let check = error.response;
                    let data_check = JSON.stringify(check);
                    let data_parse = JSON.parse(data_check);
                    toast_message(data_parse._data.message, false);
                }
            }).finally(() => (loading_field.value = false));

        } else {
            loading_field.value = false; // close loading_field
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }
    // ---- track on google analytic ----
    function track_google_analytics (per_page) {
        // setTimeout(() => {
            let offset = per_page > 0 ? '?offset=' + per_page : ''; // set offset of page if scroll get more data
            let page_path = route.path + offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
            let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
            let data = {
                page_title: meta_title_album.value,
                page_location: page_location,
                page_path: page_path,
            }
            // -- event on page --
            event('Album', data);
            // -- page_view --
            pageview(data);
        // },50);
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'})); }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ---- create photos album ----
    function create_photos_album() {
        if (window.navigator.onLine) {                              // internet connection online
            if (check_upload_progress.value === 0) {                // file upload is completed if it equal 0
                let data_body = { title: album_name.value };
                $.each(photos_array.value, (k, v) => {
                    data_body['file['+k+'][file]'] = v.file;        // create photo.
                    data_body['file['+k+'][description]'] = form.value.data_des[k] ? form.value.data_des[k] : '';  // create des of photo.
                });

                edit_name_album(data_body); // go to create photos album.


            } else {                                                // show error if upload is still progressing
                $("html, body").animate({ scrollTop: "0" }, 500);   // scroll to top if image still uploading

                toast_message(language.value === 'en' ? 'Please wait! photo are still progress' : 'សូមរងចាំបន្តិច! រូបថតកំពុងបញ្ជូន', false)
            }

        } else {
            $('#modal_show_status_error_connection').modal('show'); // error connection
        }
    }
    // ---- remove photo ----
    function remove_img(photo_name) {
        for (var i = 0; i < photos_array.value.length; i++) {
            if (photo_name == photos_array.value[i].file) {
                photos_array.value.splice(i,1); // i = index; 1 = true
                count_current_length_img.value = count_current_length_img.value - 1;
            }
        }
        $('#modal_set_change_image').modal('hide'); // close modal set change pic
    }
    // ---- clean pl-upload ----
    function clean_value_pl_upload() {
        check_upload_progress.value = 0;
        count_current_length_img.value = 0;
        photos_array.value = [];
        limit_photos.value= 24;
        form.value.data_des = [];
        $('#brows_file').children().remove();
        $('#brows_file').append("<a rel='nofollow' aria-label='browse' id='browse'></a>");
        ready_function_choose_photos();
    }
    // ---- click upload photos ----
    function show_brows() { $('.brows_file div input[type=file]').click(); }
    function ready_function_choose_photos() {
        var image = photos_array.value;
        var limit = limit_photos.value
        var max_size = 24;
        var multi_uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button: ["browse"],      // ["id_1","id_2"],
            url: config.VUE_APP_API_URL+'upload',          // http://khmer24.snadai.io/v1.0/upload
            max_file_size : max_size+'mb',
            unique_names : true,
            multi_selection: true,
            // chunk_size: '2mb',
            resize : { width : 1500, height : 1400, quality : 100, crop: false },
            filters : {
                mime_types :[
                    { title : "Image files", extensions : "jpg,gif,png,jpeg" }
                ],
                check_image_size: 100, // define for image smaller than 100kb ( important )
            },
            // drop_element : 'multi-upload',
            flash_swf_url : 'plupload-2.3.9/Moxie.swf',
            silverlight_xap_url : 'plupload-2.3.9/Moxie.xap'
        });

        multi_uploader.init();

        multi_uploader.bind('FilesAdded', (up, files) => {
            multi_uploader.start();
        });

        multi_uploader.bind('Error', (up, err) => {
            $.each(image, (index, value) => {
                if (err.file.id === value.id) {   // if error and error id is match with array image, clear
                    image.splice(index, 1);       // remove array if id the same
                    photos_array.value = image;
                }
            });

            if (err.response) {
                let message_error = JSON.parse(err.response);
                message_success.value = message_error.message;       // set message to toast to tell user
            } else {
                message_success.value = err.message;
            }
            toast_message(message_success.value, false); // toast message.

            multi_uploader.refresh();
        });

        multi_uploader.bind('UploadComplete', (upldr, file) => {
            check_upload_progress.value = 0; // when upload completed, prevent click button submit but image still uploading.
            multi_uploader.splice();
            multi_uploader.refresh();
        });

        multi_uploader.bind('FileUploaded', async (upldr, file, object) => {
            var myData;
            try {
                // myData = eval(object.response);
                myData = object.response ? JSON.parse(object.response) : '';
            } catch(err) {
                // myData = eval('(' + object.response + ')');
                myData = '(' + object.response + ')';
            }

            limit = limit_photos.value // limit photos dynamic.
            for (var s_p = 0; s_p < photos_array.value.length; s_p++) {
                if (photos_array.value[s_p].id && photos_array.value[s_p].id == file.id) {
                    if (s_p < limit) {
                        photos_array.value[s_p].file = myData.data.file;
                        photos_array.value[s_p].url_img = myData.data.thumbnail;
                        photos_array.value[s_p].id = '';
                    } else {
                        await photos_array.value.splice(s_p, 1);
                    }
                }
            }

            // console.log('--------------------------');
            // console.log(photos_array.value);
            // console.log('--------------------------');
            // -------- /add image upload to tmp and create in array to show in UI --------

            multi_uploader.refresh();
        });



        // add image loading to show in progress ( use this faster then in function "FilesAdded" )
        let create_loading_img = (f) => {
            let store_old_img_length = count_current_length_img.value; // store the number of old image length

            limit = limit_photos.value;              // store limit of image upload that define from PAI dynamic
            store_old_img_length++;                 // increase 1 if have new upload more
            if (store_old_img_length > limit) {     // if bigger then limit, remove out
                multi_uploader.removeFile(f);       // remove file from pl-upload (spacial)
                store_old_img_length--;             // if out of limit, minus 1
            } else {
                count_current_length_img.value = count_current_length_img.value + 1;  // increase old image length
                check_upload_progress.value = check_upload_progress.value + 1;        // count image upload for check
                image.push({ 'file': '', 'url_img': asset_url+version_library+'img/newLoading.gif', 'id': f.id });
                photos_array.value = image; // add image loading to show in progress
            }
        };



        plupload.addFileFilter('check_image_size', function(minRes, file, cb) { // check size before upload to API (run before FilesAdded)

            // var self = this, img = new o.Image;           // old version of plupload 2.1.8
            var self = this, img = new moxie.image.Image();  // new version of plupload 2.3.7
            function finalize(result) {
                var msg = "Please upload image at less "+minRes+"px width and "+minRes+"px height.";
                if (img.width > 1000000 || img.height > 1000000) msg = "Image "+img.name+" too big.";
                // if (img.width > 6500 || img.height > 6500) msg = "Image "+img.name+" too big.";
                // cleanup
                img.destroy();
                img = null;
                // if rule has been violated in one way or another, trigger an error
                if (!result) {
                    self.trigger('Error', {
                        code : plupload.IMAGE_DIMENSIONS_ERROR,
                        message : msg,
                        file : file
                    });
                }
                cb(result);

                // create loading to UI if img check true
                if (result) { create_loading_img(file); }

            }
            if (file.type!="image/gif") {
                img.onload = function() {
                    // check if resolution cap is not exceeded
                    finalize((img.width > minRes && img.height > minRes) && (img.width < 1000000 && img.height < 1000000));
                    // finalize((img.width > minRes && img.height > minRes) && (img.width < 6500 && img.height < 6500));
                };
                img.onerror = function() {
                    finalize(false);
                };
                img.load(file.getSource());
            } else {
                finalize(1);
            }
        });
    }

    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
</script>


