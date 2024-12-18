
<template>
    <div :class="isDesktop ? 'des_container mt-3' : ''">
        <!-- loading -->
        <div v-if="loading_field" class="loading_back_ground" style="background: white;top: 50px;">
            <div class="loading_img" style="top: 10%;">
                <img :src="asset_url_+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url_+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <!-- /loading -->

        <!-- error connection -->
        <div class="col no_padding margin_below_app_bar" :class="connection_error ? '' : 'd-none'">
            <div class="no_more_result p-2">
                <div class="p_bg_status">
                    <span class="fas fa-wifi size_icon_status"></span>
                    <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                    <button class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                </div>
            </div>
        </div>

        <!-- App Bar -->
        <div v-if="!isDesktop" class="col no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-0 l_h_con_title">
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ route.params.username }} </p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div :class="!isDesktop ? 'margin_below_app_bar mt_80' : 'dt_feedback dt_border'">
            <h1 v-if="isDesktop" class="dt_fb_title">{{ $t('message.report_this_post') }}</h1>
            <div v-if="isDesktop" class="col my_card f_con_title">
                {{ $t('message.report_this_post') }} {{ detail_pro.type === 'store' ? 'Store' : 'User' }} : <b>{{ route.params.username }}</b>
            </div>

            <div class="col no_padding max_width_form" :class="connection_error ? 'margin_below_app_bar d-none' : ''">
                <div v-if="!isMobile" class="fs-5 fw-semibold">{{ $t('message.report_this_post') }} {{ detail_pro.type === 'store' ? 'Store' : 'User' }} : {{ route.params.username }}</div>
                <!-- Photo -->
                <div class="large-12 columns my-3" :class="isMobile ? 'mt-5' : ''">
                    <div class="text-center p_bg_size my_card pt-0">
                        <div class="f_con_title_img">
                            <p class="f_p1"> {{ $t('lng.photo') }} </p>
                            <p class="f_p2">{{ image_array.length }}/{{ image_limit }}</p>
                        </div>

                        <!-- show error message of uploads -->
                        <div class="alert alert-danger alert-dismissible fade show" id="error_upload" role="alert" style="margin: 7px 0 0 0;display: none;padding: 4px 28px 4px 0;">
                            <p class="m-0" id="error_text"></p>
                            <button @click="close_error_upload" type="button" class="close" aria-label="Close" style="right: 6px!important;">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <!-- photo -->
                        <div class="f_con_upl_img">
                            <div class="_flex_">
                                <div v-for="i in image_limit" :key="i" class="cur_sur">

                                    <div v-if="image_array[i-1] && image_array[i-1].url_img">
                                        <a rel="nofollow" aria-label="photo" v-bind:href="image_array[i-1].url_img" data-fancybox="gallery">  <!-- data-fancybox :data-src="image_array[0].url_img"> -->
                                            <img :src="image_array[i-1].url_img" alt="feedback photos" class="f_img_cover">
                                        </a>
                                        <div @click="remove_img(image_array[i-1].file)" class="f_icon_remove"><i class="fas fa-minus-circle"></i></div>
                                    </div>

                                    <div v-else @click="show_brows" class="f_bg_empty_img">
                                        <template v-if="i === 1">
                                            <i class="far fa-images f_icon_ f_img_empty"></i>
                                            <p class="f_text_empty"> {{ $t('new_text_2.upload_photos') }} </p>
                                        </template>
                                        <template v-else>
                                            <i class="fas f_icon_ fa-plus"></i>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- show browse_feedback upload -->
                        <div class="feed_brows_file"> <a rel="nofollow" aria-label="browse" id="browse_feedback"></a> </div>

                        <!-- preview image upload  -->
                        <a rel="nofollow" aria-label="photo" id="view_full_pic_dynamic" data-fancybox="photo"></a> <!-- data-fancybox view full picture dynamic-->

                    </div>
                </div>
                <!-- Post Detail -->
                <form id="post_ads">

                    <div class="large-12 columns">
                        <div class="p_bg_size my_card pt-0">
                            <!-- reason -->
                            <div class="mb-3 mt-3 float-left width_100">
                                <label class="label_style label_left mb-1"> Reason <b class="text-danger">*</b> </label>
                                <select class="form-control custom_field more_border" name="reason" v-model="reason" @change="change_select">
                                    <option value=""></option>
                                    <option @click="choose_report(re.value)" v-for="re in report_user_or_store.data" :value="re.value">
                                        {{ language === 'km' ? re.km : re.en }}
                                    </option>
                                </select>
                            </div>
                            <div class="form_error_style m-0 d-none" id="reason"> <span id="msg_reason"></span> </div>

                            <!-- Descriptions -->
                            <label class="label_style mb-1"> {{ $t('setting.description') }} <b v-if="reason === 'other'" class="text-danger">*</b> </label>
                            <textarea v-model="description" rows="4" minlength="10" maxlength="255" :placeholder="$t('new_text_1.description')" class="form-control" id="description"></textarea>
                            <label id="error_description" class="text-danger font_14 m-0 d-none">{{ $t('validation.error_description') }}</label>
                            
                        </div>
                    </div>

                    <!-- Contact Detail -->
                    <div class="large-12 columns my-3">
                        <div class="my_card b-s-h-con">
                            <button class="btn custom_btn_ full_width" :class="isDesktop ? 'dt_bg_btn_action' : 'bg_btn'">
                                {{ $t('message.submit') }}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

        <!-- Modal show error connection -->
        <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
            <div class="modal-dialog max_width_form mg-mo-auto" role="document" >
                <div class="modal-content">
                    <div class="modal-body break_word_ show_text_status p-0" style="padding: 15px!important;">
                        <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
                        <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
                    </div>
                    <div class="modal-footer u_safety_footer">
                        <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- show success message 1 -->
        <div class="toast style_toast d-none toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="mr-auto style_flex">
                    <i class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ml-2 font_15 text-danger">{{ title_rule }}</p>
                </strong>
                <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true" class="text-danger">&times;</span>
                </button>
            </div>
            <div v-if="toast_error_vali_show.length > 0" class="toast-body" style="background: #fde7e7">
                <p v-for="error_validation in toast_error_vali_show" :key="error_validation" class="m-0 ml-2 text-danger"> - {{ error_validation }}. </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { VueCookieNext } from 'vue-cookie-next';
    import { event, pageview } from 'vue-gtag';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom"} );
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const asset_url_ = '/'; // config.VUE_APP_BASE_URL;
    const version_library = config.LIBRARY_VERSION;
    const localePath = useLocalePath();
    const auth_user = ref('');
    const language = ref(helper.get_lang_cookie());
    const loading_field = ref(false);
    const loading = ref(false);

    // --- report user or store ---
    const detail_pro = ref('');
    const report_user_or_store = ref([]);
    const reason = ref('');
    const description = ref('');

    const connection_error = ref(false);
    const check_upload_progress = ref(0);   // for check, if upload file are still progressing
    const count_current_length_img = ref(0);// check count current image length
    const image_array = ref([]);
    const image_limit = ref(24);
    const title_rule = ref('');
    const arr_validation = ref([]);
    const toast_error_vali_show = ref([]);
    const recaptcha = useRecaptcha();
    const isMobile= ref(helper.m_or_d())

    // --- validation field ---
    const valid_field = ref({
        reason: {
            required:true,
            normalizer: function (value) {
                return $.trim(value);
            },
        }
    });
    const valid_text = ref({
        reason: { required: 'Please select the reason' },
    });
    // --- retry ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_3 = ref(0);

    // --- meta variable ---
    const meta_title_report_user = useState('meta_title_report_user', () => 'Report Profile - Khmer24.com');

    useHead({
        title: meta_title_report_user.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_report_user.value },
            // -- seo page --
            { name: 'keywords', content: 'Report, Report Issues, Khmer24 Report, Report 24, Khmer Report, Khmer' },
            { name: 'description', content: 'Buy, Sell, Report form of Khmer24, Sell your 2nd hand items on Khmer24.com' },

            { property: 'og:title', content: meta_title_report_user.value },
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
            // --- check auth user ---
            check_auth_user();
            // --- get detail user ---
            get_detail_profile();

            // --- run function upload ---
            setTimeout(function() {
                $('.feed_brows_file').children().remove("div"); // clear old pl-upload div ( prevent duplicate show two time ).
                setTimeout( function() { ready_function_choose_image(); }, 500); // create pl-upload.
            }, 300);
            // --- jquery validation ---
            setTimeout(() => { show_validation(); },500);
            // --- remove class modal-open ---
            helper.remove_class_modal_open();
            // -- tracking on google analytic --
            track_google_analytics();
            // --- Fancybox without hash (not push state history browser) ---
            Fancybox.defaults.Hash = false;
        }
    })

    onBeforeUnmount(() => {
        Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
        // Fancybox.next();
    })


    // ---- on change select ----
    function change_select() {
        if (reason.value !== 'other') { // remove error in description if reason value not "other"
            $('#description').removeClass('error_field_text_report');
            $('#error_description').addClass('d-none');
        }
    }
    // ---- get detail profile ----
    function get_detail_profile() {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL_MOBI + 'profiles/' + route.params.username,{
            headers: { "Access-Token": auth_user.value ? auth_user.value.tokens.access_token : '' },
            params: {
                fields: 'id,type,username,member_type',
                lang: language.value,
            },
        }).then(res => {
            detail_pro.value = res.data;
            let type = detail_pro.value.type === 'store' ? 'store' : 'user';
            report_manual_post(type); // get data reason

        }).catch(e => {
            if (e.response && e.response.status === 401) { // retry
                if (reload_q_again_1.value <= 2) {
                    reload_q_again_1.value += 1;
                    setTimeout( () => { get_detail_profile(); }, 3000);
                }
            }
        }).finally(() => (loading_field.value = false));
    }
    // ---- get data report user or store ----
    function report_manual_post(user_or_store) {
        let report_type = user_or_store === 'store' ? 'store_reasons' : 'user_reasons'; // get report reason "user" or "store".

        if (!localStorage.getItem(report_type)) {
            loading_field.value = true;
            $fetch(config.VUE_APP_API_URL + 'feedbacks/' + report_type,{

            }).then(res => {
                const object = {
                    data: res.data,
                    expiry: helper.Date_To_Timestamp('', 86400, 'seconds'), // add 1 day
                }
                localStorage.setItem(report_type, JSON.stringify(object));
                report_user_or_store.value = localStorage.getItem(report_type) ? JSON.parse(localStorage.getItem(report_type)) : [];
            }).catch(e => {
                if (e.response && e.response.status === 401) { // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout( () => { report_manual_post(user_or_store); }, 3000);
                    }
                }
            }).finally(() => (loading_field.value = false));

        } else {
            report_user_or_store.value = localStorage.getItem(report_type) ? JSON.parse(localStorage.getItem(report_type)) : [];
        }
    }
    // ---- track on google analytic ----
    function track_google_analytics() {
        let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
            page_title: meta_title_report_user.value,
            page_location: page_location,
            page_path: page_path,
        }
        // -- event on page --
        event('report profile', data);
        // -- page_view --
        pageview(data);
    }
    // ---- validation show ----
    function show_validation() {
        $.validator.setDefaults({
            submitHandler: () => {
                submit_form_post();
            }
        });

        $( "#post_ads" ).validate( {
            ignore: "", // can know hidden or any
            rules: valid_field.value,
            messages: valid_text.value,
            // errorElement: "em",
            errorPlacement: function ( error, element ) {

                // Add the `invalid-feedback` class to the error element
                error.addClass( "invalid-feedback" );

                // check add text all fields
                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.next( "label" ) );  // show validate checkbox
                } else if ( element.prop( "type" ) === "radio" ) {
                    error.appendTo(element.parent().parent().parent()); // add element error out side
                } else if ( element.prop( "type" ) === "hidden" ) {
                    // show error like this when have hidden field and need to show 1 error, must to use html instead of append
                    $('#show_error_required_location').html(error);
                    // error.appendTo($('#show_error_required_location'));
                } else {
                    error.insertAfter( element );                  // show validate text, textarea, select and so on
                }
            },

            highlight: function ( element, errorClass, validClass ) {
                // $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
                $(element).addClass('is-invalid');
            },
            unhighlight: function ( element, errorClass, validClass ) {
                // $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
                $(element).removeClass('is-invalid');
            },

            // focusInvalid: false, it scroll up or down to specific tag
            invalidHandler: function(form, validator) {

                if (!validator.numberOfInvalids())    // if dont have error return
                    return;

                // -- scroll to field that is visible --
                if ($(validator.errorList[0].element).is(":visible")) {
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).offset().top - 120
                    }, 700); // if position fix in that element, it not scroll up, so change it to position absolute

                    // -- scroll to field that invisible like (hidden) --
                } else {
                    $('html, body').animate({
                        scrollTop: $(validator.errorList[0].element).closest(':visible').offset().top - 120
                    }, 1000);
                }

            },
        } );
    }
    // ---- btn submit form post ----
    async function submit_form_post() {
        if (window.navigator.onLine) {  // internet connection online
            const token = await recaptcha('report_user');
            if (reason.value === 'other' && !description.value) {
                $('#description').focus();
                $('#description').addClass('error_field_text_report');
                $('#error_description').removeClass('d-none');
                
            } 
            else {
                $('#description').removeClass('error_field_text_report');
                $('#error_description').addClass('d-none');

                let toast = $(".toast");

                if (check_upload_progress.value === 0) {  // file upload is completed if it equal 0

                    let data_body = {};
                    data_body['id'] = detail_pro.value ? detail_pro.value.id : '';
                    data_body['reason'] = reason.value;
                    data_body['description'] = description.value;
                    data_body['page'] = route.query.from ? route.query.from : ''; // check report user or store from page
                    if(token !== undefined){
                        data_body['g-recaptcha-response'] = token
                    }

                    // --- get feedback image path ---
                    if (image_array.value.length > 0) {
                        $.each(image_array.value, (key, value) => {
                            data_body['file[' + key + ']'] = value.file;
                        });
                    }

                    // --- check url report "user" or "store" ---
                    let url = '';
                    if (detail_pro.value.type === 'store') {
                        url = 'feedbacks/stores';
                    } else {
                        url = 'feedbacks/users';
                    }

                    // console.log(data_body);
                    // console.log(url);
                    // return;

                    loading.value = true;
                    $fetch(config.VUE_APP_API_URL + url,{
                        headers: { "Access-Token": auth_user.value ? auth_user.value.tokens.access_token : '' },
                        method: 'POST',
                        params: { lang: language.value },
                        body: new URLSearchParams(data_body)
                    }).then(res => {
                        // console.log(res);
                        save_track_optional('message', { message: res.message });
                        goBack();
                        // router.replace(localePath({ name: 'setting' }));

                    }).catch(error => {
                        // original data error
                        let check = error.response;
                        // parse to get message response error
                        let data_check = JSON.stringify(check);
                        let data_parse = JSON.parse(data_check);

                        if (check.status === 401) {    // retry request when auth expire
                            if (reload_q_again_3.value <= 2) {
                                reload_q_again_3.value += 1;
                                check_auth_user();
                                setTimeout(() => { submit_form_post(); }, 3000);
                            } else {
                                localStorage.removeItem('auth_user');   // remove localStorage
                                VueCookieNext.removeCookie('auth_user');
                                router.replace(localePath({name: 'index'}));
                            }

                        } else {
                            let store_arr = arr_validation.value;
                            $.each(arr_validation.value, function (keys, val) {
                                $('#' + val).addClass('d-none'); // remove validation by key
                            });

                            toast_error_vali_show.value = []; // clear message error to empty for show error new message
                            error_title.value = '';
                            if (check && check.status === 422) {
                                $.each(data_parse._data.errors, (key, value) => {
                                    $('#' + key).removeClass('d-none');
                                    $('#msg_' + key).text(value.message);
                                    store_arr.push(key); // to store old key for clear validation

                                    toast_error_vali_show.value.push(value.message); // store toast message on validation error
                                    title_rule.value = 'Required';
                                });
                                // -- show toast --
                                toast.removeClass('d-none');
                                toast.toast({delay: 7000});
                                toast.toast('show');

                            } else {
                                toast_error_vali_show.value.push(data_parse._data.message);
                                title_rule.value = 'Posting Rule';
                                // -- show toast --
                                toast.removeClass('d-none');
                                toast.toast({delay: 7000});
                                toast.toast('show');
                            }
                        }
                    }).finally(() => (loading.value = false));

                } else {    // show error if upload is still progressing
                    $("html, body").animate({ scrollTop: "0" }, 500); // scroll to top if image still uploading
                    toast_error_vali_show.value = [];
                    title_rule.value =  language.value === 'km' ? 'សូមរងចាំបន្តិច! រូបថតកំពុងបញ្ជូន' : 'Please wait! photo are still progress';
                    toast.removeClass('d-none');
                    toast.toast({delay: 7000});
                    toast.toast('show');
                }
            }

        } else {
            $('#modal_show_status_error_connection').modal('show'); // error connection
        }
    }

    // ---- close alert ----
    function close_error_upload() {
        $('#error_upload').css('display', 'none');
        $('#error_text').text('');
    }
    // ---- upload image multiple ----
    function show_brows() {
        // clear alert error upload when start new upload more
        $('#error_upload').css('display','none');

        $('.feed_brows_file div input[type=file]').click();      // click direct file profile
    }
    // ---- function pl-upload ----
    function ready_function_choose_image() {  // --- $(document).ready(function(){ } --> must to use in mounted ---
        var image = image_array.value;
        var limit = 1;
        var max_size = 24;
        // var maxRes = 1000000;
        var multi_uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button: ["browse_feedback"], // ["browse_feedback","browse_1"],
            // browse_button: ["browse_1","browse_2","browse_3"],
            url: config.VUE_APP_API_URL + 'upload', // http://khmer24.snadai.io/v1.0/upload
            max_file_size : max_size+'mb',
            unique_names : true,
            multi_selection: image_limit.value > 1 ? true : false, // upload multiple or single ( choose single = false; choose multiple = true )
            // chunk_size: '2mb',
            resize : { width : 1500, height : 1400, quality : 100, crop: false },
            filters : {
                mime_types : [
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
                if (err.file.id === value.id) {         // if error and error id is match with array image, clear
                    image.splice(index, 1);   // remove array if id the same
                    image_array.value = image;
                }
            });
            let er_text = $('#error_text');
            $('#error_upload').css('display', 'block');
            if (err.status) { // -- if have status , it mean from server API --
                let convert = err.response ? JSON.parse(err.response) : '';
                er_text.text(convert.message);
            } else {          // -- else it mean error check at client side --
                er_text.text(err.message);
            }
            multi_uploader.refresh();
        });

        multi_uploader.bind('UploadComplete', (upldr, file) => {
            // console.log('UploadComplete');
            check_upload_progress.value = 0; // when upload completed clear and set to 0 for click button submit form
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

            // -------- add image upload to tmp and create in array to show in UI --------
            limit = image_limit.value; // limit of image uploads dynamic by category response
            // console.log('in uploads limit => '+ limit);
            for (var s_p = 0; s_p < image_array.value.length; s_p++) {
                if (image_array.value[s_p].id && image_array.value[s_p].id == file.id) {
                    if (s_p < limit) {
                        image_array.value[s_p].file = myData.data.file;
                        image_array.value[s_p].url_img = myData.data.thumbnail;
                        image_array.value[s_p].id = '';
                    } else {
                        await image_array.value.splice(s_p, 1);
                    }
                }
            }

            multi_uploader.refresh();
        });



        // add image loading to show in progress ( use this faster then in function "FilesAdded" )
        let create_loading_img = (f) => {
            let store_old_img_length = count_current_length_img.value; // store the number of old image length
            limit = image_limit.value; // store limit of image upload that define from PAI dynamic
            store_old_img_length++;   // increase 1 if have new upload more
            if (store_old_img_length > limit) { // if bigger then limit, remove out
                multi_uploader.removeFile(f);    // remove file from plupload (spacial)
                store_old_img_length--; // if out of limit, minus 1
            } else {
                count_current_length_img.value = count_current_length_img.value + 1; // increase old image length
                check_upload_progress.value = check_upload_progress.value + 1; // count image upload for check
                image.push({ 'file': '', 'url_img': config.VUE_APP_BASE_URL+version_library+'img/newLoading.gif', 'id': f.id });
                image_array.value = image; // add image loading to show in progress
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

    // ---- remove image from UI ----
    function remove_img(img_name) {
        for (var i = 0; i < image_array.value.length; i++) {
            if (img_name == image_array.value[i].file) {
                image_array.value.splice(i,1); // i = index; 1 = true
                count_current_length_img.value = count_current_length_img.value - 1;
            }
        } // console.log(image_array.value);
        $('#modal_set_change_image').modal('hide'); // close modal set change pic
    }
    // ---- view full image post ----
    function view_full_image(img_name) {
        for (var i = 0; i < image_array.value.length; i++) {
            if (img_name == image_array.value[i].file) {
                $("#view_full_pic_dynamic").attr("href", image_array.value[i].url_img); // add image to link for preview
                $('#view_full_pic_dynamic').trigger("click"); // click show
                $('#modal_set_change_image').modal('hide');   // close modal set change pic
                break;
            }
        }
    }

    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- check auth user ----
    function check_auth_user() { auth_user.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- store all type params ----
    function save_track_optional(type, data_params) { helper.params_make_condition(type, data_params); }
</script>
