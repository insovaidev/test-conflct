
<template>
    <div>
        <div :class="isMobile ? 'mt-5' : ''">
            <!-- App Bar -->
            <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                <div class="_div_nav bg_app_bar_header_">
                    <div @click="goBack" class="_pad_col_icon">
                        <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                            <i class="ion-android-arrow-back font_click_back"></i>
                        </button>
                    </div>
                    <div class="col pl-1 l_h_con_title">
                        <p class="m-0 name_style truncate_wrap"> {{ $t('new_text_2.business_hour') }} </p>
                    </div>
                </div>
            </div>

            <!-- Body -->
            <div v-if="!check_is_admin" :class="isDesktop ? 'des_container dt_bu_hours mt-3 row justify-content-center' : 'no_padding margin_below_app_bar max_width_form'">
                <div :class="isDesktop ? 'col-8 p-0' : ''">
                    <div :class="isDesktop ? 'dt_border dt_bu_ho_title' : ''">
                        <div v-if="isDesktop" class="dt_title_header"><h1>{{ $t('new_text_2.business_hour') }}</h1></div>
                        <div class="b-s-h-con mt_80 bg-white min_h">
                            <!-- select options -->
                            <div class="col b-s-h-div-1">
                                <p class="truncate">
                                    <template v-for="d_o in options_data">
                                        <template v-if="value_select === d_o.value">
                                            {{ language === 'km' ? d_o.title.km : d_o.title.en }}
                                        </template>
                                    </template>
                                </p>
                                <i class="ion-android-arrow-dropdown"></i>
                            </div>
                            <!-- show hours of available in condition "selected_hours" -->
                            <template v-if="value_select === 'selected_hours'">
                                <div v-if="tmp_bus_hours && tmp_bus_hours.hours" class="mt-3">
                                    <div v-for="(hour, index) in tmp_bus_hours.hours" :key="index" class="col b-s-h-div-2">
                                        <!-- day -->
                                        <div class="col-5 b-s-h-sub-1">
                                            <input type="checkbox" name="check_hours" :checked="hour.status === 'close' ? false : true" onclick="return false;">
                                            <label>{{ hour.title ? hour.title : '' }}</label>
                                        </div>
                                        <!-- hours -->
                                        <div v-if="hour.status !== 'close'" class="col b-s-h-sub-2">
                                            <p> 
                                                {{ hour.value ? hour.value : '' }}
                                                <span class="far fa-edit"></span>
                                            </p>
                                        </div>
                                        <div v-else class="col b-s-h-sub-2">
                                            <p class="p-0">{{ hour.value ? hour.value : '' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else :class="isDesktop ? 'des_container dt_bu_hours mt-3 row justify-content-center' : 'no_padding margin_below_app_bar max_width_form'">
                <div :class="isDesktop ? 'col-8 p-0' : ''">
                    <div :class="isDesktop ? 'dt_border dt_bu_ho_title' : ''">
                        <div v-if="isDesktop" class="dt_title_header"><h1>{{ $t('new_text_2.business_hour') }}</h1></div>
                        <div class="b-s-h-con bg-white mt_80 min_h">
                            <!-- select options -->
                            <div class="col b-s-h-div-1 cur_sur" @click="show_modal_options">
                                <p class="truncate">
                                    <template v-for="d_o in options_data">
                                        <template v-if="value_select === d_o.value">
                                            {{ language === 'km' ? d_o.title.km : d_o.title.en }}
                                        </template>
                                    </template>
                                </p>
                                <i class="ion-android-arrow-dropdown"></i>
                            </div>
                            <!-- show hours of available in condition "selected_hours" -->
                            <template v-if="value_select === 'selected_hours'">
                                <div v-if="tmp_bus_hours && tmp_bus_hours.hours" class="mt-3">
                                    <div v-for="(hour, index) in tmp_bus_hours.hours" :key="index" class="col b-s-h-div-2">
                                        <!-- day -->
                                        <div @click="check_or_uncheck(hour.status, hour.title)" class="col-5 b-s-h-sub-1 cur_sur">
                                            <input type="checkbox" name="check_hours" :checked="hour.status === 'close' ? false : true">
                                            <label>{{ hour.title ? hour.title : '' }}</label>
                                        </div>
                                        <!-- hours -->
                                        <div @click="open_modal_select_hours(hour)" v-if="hour.status !== 'close'" class="col b-s-h-sub-2 cur_sur">
                                            <p> {{ hour.value ? hour.value : '' }}
                                                <span class="far fa-edit"></span>
                                            </p>
                                        </div>
                                        <div v-else @click="check_or_uncheck(hour.status, hour.title)" class="col b-s-h-sub-2 cur_sur">
                                            <p class="p-0">{{ hour.value ? hour.value : '' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div v-if="isMobile">
                        <div class="nav p_div_apply_filter" :class="isDesktop ? 'dt_border' : ''">
                            <button @click="submit_bus_hours" type="button" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                <p class="m_text_btn"> {{ $t('message.submit') }} </p>
                            </button>
                        </div>
                    </div>
                    <div v-else class="bg-white p-3">
                        <button @click="submit_bus_hours" type="button" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                            <p class="m_text_btn"> {{ $t('message.submit') }} </p>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="loading_back_ground">
                <div class="loading_img">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
                </div>
            </div>

            <!-- Modal show options -->
            <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="mo_options" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog bg-modal" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                    <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div :class="isMobile ? 'modal_bottom_screen' : ''">
                            <div class="option_selected">
                                <div class="modal-body p-0">
                                    <ul class="list-unstyled mobile_modal_actions_container">
                                        <li v-for="(op, index) in options_data" :key="index" @click="select_options(op.value)" class="mobile_modal_action cur_sur">
                                            <!-- <div :class="index < options_data.length-1 ? '' : 'bor_bot_unset'"> -->
                                                <p class="m-auto" :class="value_select === op.value ? 'm-0 parent_color' : 'm-0'">{{ language === 'km' ? op.title.km : op.title.en }}</p>
                                            <!-- </div> -->
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

            <!-- Modal show select hours -->
            <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_select_hours" tabindex="-1" role="dialog">
                <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
                    <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
                        <div class=" overflow_class" :class="isMobile ? 's_content' : ''">
                            <!-- header -->
                            <div class="de-list-quick-chat">
                                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                                <p class="modal-title font_16 width_100 font_bold" id="title_date">  </p>
                                <button @click="click_done" class="btn btn-select-done"> {{ $t('new_text_2.done') }} </button>
                            </div>
                            <!-- content -->
                            <div class="modal-body m-b-select_hours">
                                <div class="m-b-s-pad">
                                    <div class="form-group div_pad_color max_width_form">
                                        <!-- open time -->
                                        <div class="mb-3 position_relative">
                                            <label class="label_style label_left mb-1"> {{ $t('message.open') }} </label>
                                            <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                            <select class="form-control custom_field more_border" @change="clear_24_hours($event)" v-model="open_hour">
                                                <!--<option value=""></option>-->
                                                <option v-for="(open, index) in hours_data_open" :key="index" v-bind:value="open.value">
                                                    {{ open.title }}
                                                </option>
                                            </select>
                                        </div>
                                        <!-- close time -->
                                        <div class="mb-3 position_relative">
                                            <label class="label_style label_left mb-1"> {{ $t('message.close') }} </label>
                                            <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                            <select class="form-control custom_field more_border" @change="clear_24_hours($event)" v-model="close_hour">
                                                <!--<option value=""></option>-->
                                                <option v-for="(close, index) in hours_data_open" :key="index" v-bind:value="close.value">
                                                    {{ close.title }}
                                                </option>
                                            </select>
                                        </div>
                                        <!-- 24 hours -->
                                        <div class="form-check a_show_check_box">
                                            <input @change="click_check_box" type="checkbox" v-model="full_hours" id="24_hours" class="form-check-input">
                                            <label class="form-check-label" for="24_hours">{{ $t('message.day_hours') }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Modal show select hours -->

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

            <!-- show success message -->
            <div class="toast style_toast d-none toast_business toast_z_index">
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

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();

    const loading = ref(false);
    const check_is_admin = ref(false);              // check if admin or not.
    const store_id = ref(route.params.id ? route.params.id : '');          // store id.

    const tmp_bus_hours = ref('');                  // tmp detail hours.
    const value_select = ref('');                   // value option selected from modal show option.
    const isMobile= ref(helper.m_or_d())

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_3 = ref(0);

    // --- data select options static ---
    const options_data = ref([
        { "title": { "en":"Selected Hours", "km":"ម៉ោងដែលបានជ្រើសរើស" }, "value":"selected_hours" },
        { "title": { "en":"Always Open", "km":"បើកជានិច្ច" }, "value":"always_open" },
        { "title": { "en":"Permanently Closed", "km":"បានបិទជាអចិន្ត្រៃយ៍" }, "value":"permanently_closed" },
        { "title": { "en":"No Hours Available", "km":"មិនមានម៉ោងធ្វើការ" }, "value":"none" },
    ]);

    // --- data business hours static, prevent "get_info_bus_hours" response field 'hours' is empty ---
    const date_close_data = ref({
        hours: {
            mon: {title: "ថ្ងៃច័ន្ទ", value: "បិទ", status: "close", open: null, close: null},
            tue: {title: "ថ្ងៃអង្គារ", value: "បិទ", status: "close", open: null, close: null},
            wed: {title: "ថ្ងៃពុធ", value: "បិទ", status: "close", open: null, close: null},
            thu: {title: "ថ្ងៃព្រហស្បតិ៍", value: "បិទ", status: "close", open: null, close: null},
            fri: {title: "ថ្ងៃសុក្រ", value: "បិទ", status: "close", open: null, close: null},
            sat: {title: "ថ្ងៃសៅរ៍", value: "បិទ", status: "close", open: null, close: null},
            sun: {title: "ថ្ងៃអាទិត្យ", value: "បិទ", status: "close", open: null, close: null}
        },
        status: "selected_hours",
            title: "Selected Hours",
    });

    // --- data select hours ---
    const detail_edit_hours  = ref('');
    const hours_data_open = ref([]);
    const open_hour = ref('');
    const close_hour = ref('');
    const full_hours = ref('');

    // --- for check message show in toast ---
    const message_success = ref('');
    const error_or_success_message = ref(true);


    useHead({
        title: 'Store Business Hours - Khmer24.com',
        meta: [
            // { name: 'apple-mobile-web-app-title', content: 'Store Business Hours - Khmer24.com' },
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
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            check_new_auth_user();

            // create hours select in modal
            create_hours_static();

            // get detail store
            get_detail_store();

            // get info business hours
            get_info_bus_hours();
        }
    })

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
                    if (reload_q_again_3.value <= 2) {
                        reload_q_again_3.value += 1;
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
    // ---- get detail info business hours of store ----
    function get_info_bus_hours() {
        loading.value = true;
        check_new_auth_user();
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/business_hours', {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
            }).then(res => {
                tmp_bus_hours.value = res.data;
                value_select.value = tmp_bus_hours.value ? tmp_bus_hours.value.status : 'none'; // none for empty data.

            }).catch(error => {
                loading.value = false
                if (error.response && error.response.status === 401) { // retry
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        check_new_auth_user();
                        setTimeout(() => { get_info_bus_hours(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user');
                        router.replace(localePath({name: 'index'}));
                    }
                }
            }).finally(() => (loading.value = false));
        }else{
            router.push(localePath({ name: 'auth' }))
        }
    }

    // ---- show modal select hours ----
    function open_modal_select_hours(data_hour) {
        // console.log(data_hour);
        detail_edit_hours.value = data_hour;
        // add text date to header modal select hours
        $('#title_date').text(data_hour.title);
        // 24 hours selected
        if (data_hour.open === '00:00:00') {
            full_hours.value = true;             // check on checkbox.
            open_hour.value = '';                // set to empty.
            close_hour.value = '';               // set to empty.
            // selected on hours
        } else {
            full_hours.value = false;            // clear checkbox.
            open_hour.value = data_hour.open;
            close_hour.value = data_hour.close;
        }
        $('#show_modal_select_hours').modal('show');
    }
    // ---- show modal options ----
    function show_modal_options() { $('#mo_options').modal('show'); }
    // ---- selected option value ----
    function select_options(value) {
        value_select.value = value;       // set value from selected from modal options.
        $('#mo_options').modal('hide');  // close modal options.

        // -- if server response field 'hours' empty or not exist, must to create static own data --
        if ((!tmp_bus_hours.value || (tmp_bus_hours.value && tmp_bus_hours.value.status !== 'selected_hours')) && value === 'selected_hours') {
            tmp_bus_hours.value = date_close_data.value;
        }
    }

    // ---- click done on hour selected ----
    function click_done() {
        if ((full_hours.value) || (open_hour.value && close_hour.value)) {
            if (full_hours.value) {      // 24 hours.
                detail_edit_hours.value.open = '00:00:00';
                detail_edit_hours.value.close = '00:00:00';
                detail_edit_hours.value.value = language.value === 'en' ? '24 Hours' : '24 ម៉ោង';
            } else {                    // selected hours.
                let open = '', close = ''
                $.each(hours_data_open.value, (k, v) => {
                    if (v.value === open_hour.value) {
                        open = v.title;
                    } else if (v.value === close_hour.value) {
                        close = v.title;
                    }
                });

                detail_edit_hours.value.open = open_hour.value;
                detail_edit_hours.value.close = close_hour.value;
                detail_edit_hours.value.value = open+' - '+close;
            }

            // -- create data --
            $.each(tmp_bus_hours.value.hours, (k, v) => {
                if (v.title === detail_edit_hours.value.title) {
                    tmp_bus_hours.value.hours[k] = detail_edit_hours.value;
                    return false;
                }
            });
            // -- close modal --
            $('#show_modal_select_hours').modal('hide'); // hide modal select hours.
        } else {
            toast_message('Please select hours', false);
        }
    }
    // ---- check or uncheck ----
    function check_or_uncheck(status, title) {
        let store_previous_day = '';        // store previous index of the array day.
        let data_body = { title: title };   // the title of date.

        $.each(tmp_bus_hours.value.hours, (k, v) => {
            if (title === v.title) {
                // -- if close --
                if (status === 'close') {
                    let pre_index = tmp_bus_hours.value.hours[store_previous_day]; // get data previous index.
                    // -- check if index first have time get the must to get first time --
                    if (store_previous_day) {
                        // -- 24 hours --
                        if (pre_index.open === '00:00:00') {
                            // console.log('1')
                            data_body['close'] = "00:00:00";
                            data_body['open'] = "00:00:00";
                            data_body['status'] = "open";
                            data_body['value'] = language.value === 'en' ? '24 Hours' : '24 ម៉ោង';

                            // -- simple hours --
                        } else {
                            // console.log(pre_index)
                            // -- if status close, set to default hours --
                            if (pre_index.status === 'close') {
                                // console.log('2')
                                data_body['close'] = "17:00:00";
                                data_body['open'] = "08:00:00";
                                data_body['status'] = "open";
                                data_body['value'] = "08:00AM - 05:00PM";

                            // -- else get previous to old data --
                            } else {
                                // console.log('3')
                                data_body['close'] = pre_index.close;
                                data_body['open'] = pre_index.open;
                                data_body['status'] = pre_index.status;
                                data_body['value'] = pre_index.value;
                            }
                        }

                    // -- else set time to default 8am - 5pm --
                    } else {
                        // console.log('4')
                        data_body['close'] = "17:00:00";
                        data_body['open'] = "08:00:00";
                        data_body['status'] = "open";
                        data_body['value'] = "08:00AM - 05:00PM";
                    }

                // -- if open --
                } else {
                    // console.log('5')
                    data_body['close'] = null;
                    data_body['open'] = null;
                    data_body['status'] = "close";
                    data_body['value'] = language.value === 'en' ? 'close' : 'បិទ';
                }

                tmp_bus_hours.value.hours[k] = data_body;
                return false;
            }

            store_previous_day = k; // store previous index for get value old to set default on new check.
        });
    }
    // ---- on change selection to clear check box 24 hours ----
    function clear_24_hours() {
        full_hours.value = false; // uncheck on checkbox 24 hours.
    }
    // ---- on change check box ----
    function click_check_box() {
        if (full_hours.value) {
            full_hours.value = true;             // check on checkbox.
            open_hour.value = '';                // set to empty.
            close_hour.value = '';               // set to empty.
        } else {
            full_hours.value = false;            // clear on checkbox.
            open_hour.value = detail_edit_hours.value.open !== '00:00:00' ? detail_edit_hours.value.open : '';
            close_hour.value = detail_edit_hours.value.close !== '00:00:00' ? detail_edit_hours.value.close : '';
        }
    }

    // ---- create hours static for select in modal ----
    function create_hours_static() {
        for (var i = 1; i < 70; i++) {
            if (i < 12) {
                let c_time = i < 10 ? '0'+i : i;
                hours_data_open.value.push({ title: c_time+':00 AM', value: c_time+':00:00' });
                hours_data_open.value.push({ title: c_time+':30 AM', value: c_time+':30:00' });
            } else {
                if (i === 12) {
                    hours_data_open.value.push({ title: i+':00 PM', value: i+':00:00' });
                    hours_data_open.value.push({ title: i+':30 PM', value: i+':30:00' });
                } else {
                    let hour_pm = i-12;
                    let c_time = hour_pm < 10 ? '0'+hour_pm : hour_pm;
                    if (hour_pm <= 12) {
                        if (hour_pm < 12) {
                            hours_data_open.value.push({title: c_time + ':00 PM', value: i + ':00:00'});
                            hours_data_open.value.push({title: c_time + ':30 PM', value: i + ':30:00'});
                        } else {
                            hours_data_open.value.push({title: c_time + ':00 AM', value: i + ':00:00'});
                        }
                    }
                }
            }
        }
    }
    // ---- toast message ----
    function toast_message(message, suc_or_error) {
        message_success.value = message;
        error_or_success_message.value = suc_or_error;
        let toast = $(".toast_business");
        toast.removeClass('d-none');
        toast.toast({delay: 7000});
        toast.toast('show');
    }
    // ---- submit business hours ----
    function submit_bus_hours() {
        check_new_auth_user();

        if (window.navigator.onLine) {
            let body_data = {};
            // -- selected hours --
            if (value_select.value === 'selected_hours') {
                body_data['type'] = value_select.value;
                // loop create time close & open
                $.each(tmp_bus_hours.value.hours, (k, v) => {
                    body_data[k+'[open]'] = v.open ? v.open : '';
                    body_data[k+'[close]'] = v.close ? v.close : '';
                });

            // -- always_open, business_hours, none are the same body_data --
            } else {
                body_data['type'] = value_select.value;
            }

            loading.value = true;
            // --- edit profile picture ---
            $fetch(config.VUE_APP_API_URL + 'me/stores/'+store_id.value+'/business_hours', {
                headers: { "Access-Token": user_data.value.tokens.access_token },
                params: { lang: language.value },
                // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                method: 'POST',
                body: new URLSearchParams(body_data)

            }).then(res => {
                toast_message(res.message, true);

            }).catch(error => {
                if (!error.response) {
                    loading.value = false; // close loading
                    $('#modal_show_status_error_connection').modal('show');     // --- if connection slow and timeout ---

                } else if (error.response && error.response.status === 401) {   // retry
                    if (reload_q_again_2.value <= 2) {
                        reload_q_again_2.value += 1;
                        setTimeout(() => { submit_bus_hours(); }, 3000);
                    } else {
                        localStorage.removeItem('auth_user');
                        VueCookieNext.removeCookie('auth_user')
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
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'})); }
    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
</script>
