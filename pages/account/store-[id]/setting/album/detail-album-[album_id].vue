
<template>
    <div >
        <!-- App Bar -->
        <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col l_h_con_title">
                    <p class="name_style truncate_wrap m-0 text-center">
                        {{ detail && detail.title ? detail.title : '' }}
                    </p>
                </div>
                <div class="s_w_app_icon"></div>
            </div>
        </div>
        <!-- Body -->
        <div class="min_h" :class="isDesktop ? 'des_container dt_st_album' : ''">
            <div v-if="connection_error" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar">
                <div class="no_more_result p-2">
                    <div class="p_bg_status">
                        <span class="fas fa-wifi size_icon_status"></span>
                        <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
                        <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                        <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                    </div>
                </div>
            </div>
            <template v-else>
                <!-- show image grid -->
                <template v-if="!isMobile">
                    <div class="d-flex bg-white mt_80 px-3 border-bottom align-items-center">
                        <div class="fs-5 fw-semibold p-2">{{ $t('new_text_2.photo_album') }} : {{ detail && detail.title ? detail.title : '' }}</div>
                        <button v-if="((!detail.photos) || (detail.photos && detail.photos.length < 24)) && check_is_admin"
                                aria-label="plus" @click="add_more_photos" class="ms-auto btn btn-k24-secondary dt-btn-height mx-2" style="width: 170px;">
                                {{ $t('new_text_2.upload_photos') }}
                        </button>
                    </div>
                </template>
                <div v-if="detail && detail.photos && detail.photos.length > 0" :class="isMobile ? 'mt-5 s_slide_list_photo_1' : ' d-flex mt-0 min_h rounded flex-wrap bg-white p-3'">
                    
                    <div v-for="(photo, index) in detail.photos" :key="index" class="position_relative" :class="isMobile ? 'mt-2' : 'dt_item_img'">
                        <div class="a-t-album-con z-1 w-100">
                            <div @click="show_modal_options(photo)" class="a-t-card-ch1 cur_sur">
                                <div class="_flex_ text-white">
                                    <p class="truncate col-10 a-t-album-text">{{ photo && photo.description ? photo.description : '' }}</p>
                                    <i v-if="check_is_admin" class="icon-ellipsis-vertical a-t-album-icon"></i>
                                </div>
                            </div>
                        </div>
                        <a rel="nofollow" aria-label="photo" :href="photo.photo" data-fancybox="gallery" :data-src="photo.photo"> <!-- :data-caption="detail && detail.title ? detail.title : ''" -->
                            <img :data-src="photo.thumbnail"
                                 :alt="detail && detail.title ? detail.title : ''"
                                 class="lazy s_image_list_1 border"
                                 :src="empty_img_loading" @error="imageUrlAlt_post" />
                        </a>
                        
                    </div>
                </div>

                <button v-if="((!detail.photos) || (detail.photos && detail.photos.length < 24)) && check_is_admin && isMobile"
                        aria-label="plus" @click="add_more_photos" class="b-add-new-branch">
                    <i class="icon-plus"></i>
                </button>
                <template v-if="isDesktop"><br><br><br></template>

                <div v-if="not_found" class="not_found_parent">
                    <div class="not_found_child">
                        <i class="fas fa-exclamation-triangle text_grey mg_i not_found_icon"></i>
                        <p class="font_22">{{ $t('new_text.post_note_found') }}</p>
                    </div>
                </div>

                <div v-if="loading" class="loading_back_ground">
                    <div class="loading_img">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                    </div>
                </div>
            </template>
        </div>

        <!-- upload photos -->
        <div class="brows_file" id="brows_file">
            <a rel="nofollow" aria-label="browse" id="browse"></a>
        </div>
        <!-- /upload photos -->

        <!-- Modal show options -->
        <div class="modal fade style_full_screen" id="mo_options" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content animate-bottom">
                    <div :class="isMobile ? ' modal_bottom_screen' : ''">
                        <div class="option_selected">
                            <div class="modal-body p-0">
                                <ul class="list-unstyled mobile_modal_actions_container">
                                    <li @click="show_edit_des" class="mobile_modal_action cur_sur">
                                        <div class=" color_reason m-auto"> {{ $t('new_text_2.edit_des') }} </div>
                                    </li>
                                    <li @click="delete_photo" class="mobile_modal_action cur_sur">
                                        <div class=" color_reason bor_bot_unset text-danger m-auto"> {{ $t('new_text_2.delete_photo') }} </div>
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

        <!-- modal Create photos -->
        <div class="modal style_full_screen" id="modal_add_more_photos" :class="isMobile ? 'style_full_screen' : ''"
             tabindex="-1" role="dialog" aria-hidden="true">
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
                            <a rel="nofollow" class="set-app-name-title text-white">{{ detail.title ? detail.title : '' }}</a>
                        </div>
                        <div v-if="photos_array.length > 0 && photos_array.length !== limit_photos" @click="show_brows" class="_pad_col_icon cur_sur">
                            <button class="btn mar-member-add" aria-label="back">
                                <i class="icon-plus font_click_back"></i>
                            </button>
                        </div>
                    </div>
                    <!-- body -->
                    <div class="modal-body a-t-modal-create">

                        <!-- count image uploaded -->
                        <p class="a-t-c-photos"> {{ photos_array.length }} / {{ limit_photos }} </p>

                        <!-- when photos is empty -->
                        <div v-if="photos_array.length === 0" class="my_card a-t-empty-photos cur_sur" @click="show_brows">
                            <div>
                                <span class="icon-images"></span>
                                <p>{{ $t('new_text_2.upload_photos') }}</p>
                            </div>
                        </div>

                        <!-- when photos not empty -->
                        <template v-if="photos_array.length > 0">
                            <div v-for="(photo, index) in photos_array" :key="index" class="a-t-display-photos">
                                <div class="p_big_cover_img mt-2">
                                    <a rel="nofollow" aria-label="photo" :href="photo.url_img" data-fancybox="photo2">
                                        <img :src="photo.url_img" alt="album photo" class="img_product a-t-h-photo">
                                    </a>
                                    <div @click="remove_img(photo.file)" class="p_remove_profile_img p_remove_profile_big">
                                        <a rel="nofollow" href="javascript:void (0)" class="a-t-h-btn-minus" aria-label="minus">
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
                    <!-- <div v-if="photos_array.length > 0" class="nav p_div_apply_filter">
                        <button @click="create_photos_album" type="button" class="btn btn-sm width_100 e_style_btn_filter custom_btn_">
                            <p class="m_text_btn"> {{ $t('message.submit') }} </p>
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- /modal Create photos -->

        <!-- modal Edit Photo -->
        <div class="modal style_full_screen" id="modal_edit_description" :class="isDesktop ? 'dt_filter_modal' : ''"
             tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                <div class="modal-content " :class="isMobile ? 'modal_content_style' : 'rounded'">
                    <!-- app -->
                    <div class="_div_nav bg_app_bar_header_">
                        <div data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                            <button class="btn clear-btn-app-bar" aria-label="back">
                                <i class="icon-clear font_click_back"></i>
                            </button>
                        </div>
                        <div class="col _pad_col_icon">
                            <a rel="nofollow" class="set-app-name-title text-white">{{ detail.title ? detail.title : '' }}</a>
                        </div>
                    </div>
                    <!-- body -->
                    <div class="modal-body" :class="isMobile ? 'a-t-modal-create' : ''">

                        <div class="a-t-display-photos">
                            <div class="p_big_cover_img mt-2">
                                <a rel="nofollow" aria-label="photo" :href="tmp_choose_specific_image.photo ? tmp_choose_specific_image.photo : asset_url+version_library+'img/empty_post.png'" data-fancybox="photo1">
                                    <img :src="tmp_choose_specific_image.thumbnail ? tmp_choose_specific_image.thumbnail : asset_url+version_library+'img/empty_post.png'" alt="album thumbnail" class="img_product a-t-custom-height">
                                </a>
                                <div class="a-t-photo-des">
                                    <input maxlength="255" type="text" v-model="des_value" :placeholder="$t('message.description')" class="form-control">
                                </div>
                            </div>
                        </div>
                        <button v-if="!isMobile" @click="edit_des_func" type="button" class="btn btn-sm width_100 mt-4 e_style_btn_filter custom_btn_">
                            <p class="m_text_btn"> {{ $t('message.submit') }} </p>
                        </button>
                    </div>

                    <div v-if="isMobile" class="nav p_div_apply_filter">
                        <button @click="edit_des_func" type="button" class="btn btn-sm width_100 e_style_btn_filter custom_btn_">
                            <p class="m_text_btn"> {{ $t('message.submit') }} </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal Edit Photo -->

        <!-- Modal show confirm delete photo -->
        <div class="modal class_modal_show_message" id="modal_show_confirm_leave" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style from_top" role="document">
                <div class="modal-content max_width_form">
                    <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text_2.delete_photo') }} ? </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" @click="confirm_delete_album" class="btn text-primary text-danger"> {{ $t('message.delete') }} </button>
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.cancel') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Modal show confirm delete photo -->

        <!-- show success message -->
        <div class="toast style_toast d-none toast_detail_album toast_z_index" >
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
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
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
    const empty_img_loading = ref('/icon/img-loader.gif');

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const loading = ref(false);
    const detail = ref('');
    const connection_error = ref(false);
    const not_found = ref(false);
    const check_is_admin = ref(false);  // check if admin or not.

    const full_data_photo_index = ref('');  // store full data of photo index.
    const tmp_choose_specific_image = ref('');  // tmp specific image photos.

    const store_id = ref(route.params.id ? route.params.id : '');
    const album_id = ref(route.params.album_id ? route.params.album_id : '');

    // --- upload photos ---
    const check_upload_progress = ref(0);  // for check; if upload file are still progressing
    const count_current_length_img = ref(0);  // check count current image length
    const photos_array = ref([]);
    const limit_photos = ref(0);
    const form = ref({ data_des: [] });

    // --- form data ---
    const des_value = ref('');  // for edit description.
    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_3 = ref(0); const reload_q_again_5 = ref(0);
    const reload_q_again_2 = ref(0); const reload_q_again_4 = ref(0);

    // --- for check message show in toast ---
    const message_success = ref('');
    const error_or_success_message = ref(true);

    const meta_title_de_album = useState('meta_title_de_album', () => 'Store Albums - Khmer24.com');
    const isMobile= ref(helper.m_or_d())

    useHead({
        title: meta_title_de_album.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_de_album.value },
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

            // --- get detail album ---
            get_detail_album();
            // --- get detail store ---
            get_detail_store();

            // --- Fancybox without hash (not push state history browser) ---
            Fancybox.defaults.Hash = false;

            reload_lazy_img(); // load lazy image.
        }
    })
    onUnmounted(() => {
        Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
    })

    // ---- reload lazy load ----
    function reload_lazy_img() {
        setTimeout(() => {
            $('img.lazy').Lazy({delay:10000, combined:true});
        },750);
    }

    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $('.toast_detail_album');
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

                reload_lazy_img(); // load lazy image.

            }).catch(error => {
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_5.value <= 2) {
                        reload_q_again_5.value += 1;
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
    // ---- retry ----
    function retry() {
        if (window.navigator.onLine) {  // connection online
            connection_error.value = false;
            get_detail_album();
        }
    }
    // -- detail album --
    function get_detail_album() {
        check_new_auth_user();

        if (window.navigator.onLine && user_data.value) {
            loading.value = true;
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos/'+album_id.value, {
                headers: {"Access-Token": user_data.value ? user_data.value.tokens.access_token : ''}, // if user login add access token
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST)
            }).then(res => {
                detail.value = res.data;

                // -- if photos empty show modal create photos album --
                if (!detail.value.photos && check_is_admin.value) {
                    add_more_photos(); // show modal create photos.
                }

            }).catch(error => {
                if (!error.response) { // display connection error
                    connection_error.value = true;

                } else if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { get_detail_album(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }

                } else if (error.response && error.response.status === 404) { // show status error response from API
                    not_found.value = true;
                }
            }).finally(() => (loading.value = false));

        } else {
            loading.value = false;
            connection_error.value = true;
        }
    }

    // ---- add more photos ----
    function add_more_photos() {
        if (check_is_admin.value === false) return  // if not admin return
        clean_value_pl_upload();   // start upload photos.
        $('#modal_add_more_photos').modal('show');
    }

    // ---- show modal options ----
    function show_modal_options(data) {
        if (check_is_admin.value === false) return  // if not admin return
        full_data_photo_index.value = data;
        $('#mo_options').modal('show');
    }
    // ---- show edit Description ----
    function show_edit_des() {
        // -- add value prevent list image show kon trak --
        tmp_choose_specific_image.value = full_data_photo_index.value;
        // -- add value to input --
        des_value.value = full_data_photo_index.value.description ? full_data_photo_index.value.description : '';

        $('#mo_options').modal('hide');                 // hide modal options.
        $('#modal_edit_description').modal('show');     // show modal edit photo and description.
    }
    // ---- click edit description ----
    function edit_des_func() {
        check_new_auth_user();
        if (window.navigator.onLine) {
            loading.value = true;
            let data = full_data_photo_index.value;
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos/'+album_id.value+'/'+data.id,{
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'PUT',
                body: new URLSearchParams({ file: data.file ? data.file : '', description: des_value.value })

            }).then(res => {
                // -- add data detail again --
                detail.value = res.data;

                // -- close modal edit description --
                $('#modal_edit_description').modal('hide');

                // -- show status success --
                toast_message(res.message, true);

            }).catch(error => {
                if (!error.response) {
                    loading.value = false;                                       // close loading
                    $('#modal_show_status_error_connection').modal('show');     // --- if connection slow and timeout ---

                } else if (error.response && error.response.status === 401) {   // retry
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { edit_des_func(); }, 3000);
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
            }).finally(() => (loading.value = false));

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }

    // ---- show modal confirm delete photo ----
    function delete_photo() {
        $('#mo_options').modal('hide');                 // close modal options.
        $('#modal_show_confirm_leave').modal('show');   // show confirm delete album.
    }
    // ---- confirm delete photo ----
    function confirm_delete_album() {
        check_new_auth_user();
        if (window.navigator.onLine) {
            loading.value = true;

            let photo_id = full_data_photo_index.value ? full_data_photo_index.value.id : ''; // id specifig of photo.
            // --- edit profile picture ---
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos/'+album_id.value+'/'+photo_id, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'DELETE',

            }).then(res => {
                // -- Add new data detail --
                detail.value = res.data;

                // -- close modal confirm delete --
                $('#modal_show_confirm_leave').modal('hide');

                // -- show status success --
                toast_message(res.message, true);

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                } else if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
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
            }).finally(() => (loading.value = false));

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
        }
    }
    // ---- go back ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ---- add more photos to album ----
    function create_photos_album() {
        if (window.navigator.onLine) {                              // internet connection online
            if (check_upload_progress.value === 0) {                 // file upload is completed if it equal 0
                let data_body = {};
                $.each(photos_array.value, (k, v) => {
                    data_body['file['+k+'][file]'] = v.file;
                    data_body['file['+k+'][description]'] = form.value.data_des[k] ? form.value.data_des[k] : '';
                });

                submit_add_photos(data_body); // go to create photos album.

            } else {                                                // show error if upload is still progressing
                $("html, body").animate({ scrollTop: "0" }, 500);   // scroll to top if image still uploading
                toast_message(language.value === 'en' ? 'Please wait! photo are still progress' : 'សូមរងចាំបន្តិច! រូបថតកំពុងបញ្ជូន', false);
            }

        } else {
            $('#modal_show_status_error_connection').modal('show'); // error connection
        }
    }
    // ---- submit photos ----
    function submit_add_photos(data) {

        check_new_auth_user();
        if (window.navigator.onLine) {
            loading.value = true;
            // --- edit profile picture ---
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/photos/'+album_id.value, {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'POST',
                body: new URLSearchParams(data)

            }).then(res => {
                // -- add new data to detail again --
                detail.value = res.data;

                // -- close modal add more photos --
                $('#modal_add_more_photos').modal('hide');

                // -- show status success --
                toast_message(res.message, true);

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                } else if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_4.value <= 2) {
                        reload_q_again_4.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { submit_add_photos(); }, 3000);
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
            }).finally(() => (loading.value = false));

        } else {
            loading.value = false; // close loading
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
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
    }
    // ---- clean pl-upload ----
    function clean_value_pl_upload() {
        check_upload_progress.value = 0;
        count_current_length_img.value = 0;
        photos_array.value = [];
        limit_photos.value = detail.value.photos ? 24 - detail.value.photos.length : 24;
        form.value.data_des = [];
        $('#brows_file').children().remove();
        $('#brows_file').append("<a rel='nofollow' aria-label='browse' id='browse'></a>");
        ready_function_choose_photos();
    }
    // ---- click upload photos ----
    function show_brows() { $('.brows_file div input[type=file]').click(); }
    function ready_function_choose_photos() {
        var image = photos_array.value;
        var limit = limit_photos.value;
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
            // console.log('FileUploaded');
            var myData;
            try {
                // myData = eval(object.response);
                myData = object.response ? JSON.parse(object.response) : '';
            } catch(err) {
                // myData = eval('(' + object.response + ')');
                myData = '(' + object.response + ')';
            }

            limit = limit_photos.value; // limit photos dynamic.
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


