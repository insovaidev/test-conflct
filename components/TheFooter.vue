
<template>
    <div v-if="r_name_check" class="nav bottom_nav_height " id="bottom_navigation">
        <NuxtLink :to="localePath({name:'index'})" class="nav__link with_buttom_bar" :class="r_name === 'index' || !r_name ? 'set_active' : ''">
            <div @click="btn_home_page" class="text-center width_bottom_nav rip_click">
                <i class="fas fa-home icon_nav_w_h mt-2"></i>
                <span class="nav__text cus_more_w_h_nav"> <p class="m-0"> {{ $t('message.home') }} </p> </span>
            </div>
        </NuxtLink>

        <div class="nav__link with_buttom_bar cur_sur" :class="r_name === 'notification' ? 'set_active' : ''">
            <div @click="btn_notification_page()" class="text-center width_bottom_nav rip_click position_relative">
                <i class="fas fa-bell icon_nav_w_h mt-2"></i>
                <span class="nav__text cus_more_w_h_nav"> <p class="m-0"> {{ $t('message.notification') }} </p> </span>
                <span class="badge bg-danger style_badge d-none" id="add_badge_not">  </span>
            </div>
        </div>

        <!-- floating action button -->
        <div class="nav__link with_buttom_bar cur_sur">
            <div @click="btn_create_post" id="click_ads_new_post" class="width_bottom_nav rip_click legitRipple text-center text-white" style="padding: 1px 0 0 0;">
                <div class="b_n_bg_btn_add">
                    <span v-if="is_from_store" class="icon-plus icon_post_store"></span>
                    <span v-else class="icon-camera icon_post_user"></span>
                </div>
            </div>
        </div>
        <!-- /floating action button -->

        <div class="nav__link with_buttom_bar cur_sur" :class="r_name === 'chats' ? 'set_active' : ''">
            <div @click="btn_chat_page" class="text-center width_bottom_nav rip_click">
                <div class="pt_s position_relative height_100">
                    <i class="icon-chat icon_nav_w_h"></i>
                    <span class="nav__text cus_more_w_h_nav"> <p class="mt_s"> {{ $t('text_desktop.chats') }} </p> </span>
                    <span class="badge bg-danger style_badge d-none" id="add_badge_chat">  </span>
                </div>
            </div>
        </div>

        <div class="nav__link with_buttom_bar cur_sur" :class="r_name === 'account' ? 'set_active' : ''">
            <div @click="btn_account_page" class="text-center width_bottom_nav rip_click">
                <i class="fa fa-user-circle icon_nav_w_h mt-2"></i>
                <span class="nav__text cus_more_w_h_nav"> <p class="m-0"> {{ $t('message.account') }} </p> </span>
            </div>
        </div>
    </div>
    
</template>

<script setup>
    import helper from "/helper";
    const runtime_config = useRuntimeConfig(); // setup config env to config variable.
    const config = runtime_config.public
    const route = useRoute();
    const router = useRouter();
    const r_name = ref(''); // clean route name with prefix.
    const check_auth = ref('');
    const localePath = useLocalePath();

    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());

    const reload_q_again_1 = ref(0);
    const timerID_nav = useState('timerID_nav', () => '');
    const is_from_store = ref(true); // true for store. false for user.
    const isMobile = ref(false)
    const arr_r_name = ref([ 'auth', 'auth-login', 'auth-register', 'login', 'register' ])
    const r_name_check = ref(false)

    onMounted(() => {
        if (process.client) {
            check_r_name()
            isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            isMobile.value = $( window ).width() < 768 ? true : false
            $( window ).resize( function() {
                isMobile.value = $( window ).width() < 768 ? true : false
            });
            // --- clean prefix route name ---
            r_name.value = helper.clear_prefix_route_name(route.name);

            // --- remove class modal-open ---
            helper.remove_class_modal_open();

            check_new_auth_user();
            
            if(isMobile.value){
                // start_request();
                function_check();
            }

            // --- check is from store ---
            check_is_from_store();
        }
    })

    watch(() => route.name, () => {
        check_r_name()
        isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
        // --- remove class modal-open ---
        helper.remove_class_modal_open();

        // --- clean prefix route name ---
        r_name.value = helper.clear_prefix_route_name(route.name);

        // --- check if class active, show color ---
        let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : '';
        language.value = lang && lang === 'km' ? 'km' : 'en';

        check_new_auth_user();
        if(isMobile.value){
            function_check();
        }

        // --- check is from store ---
        check_is_from_store();
    })

    function check_r_name(){
        r_name.value = helper.clear_prefix_route_name(route.name);
        for(const R of arr_r_name.value){
            if(R === r_name.value){
                r_name_check.value = false
                break;
            }else{
                r_name_check.value = true
            }
        }
    }
    // ---- check if from url that have store store ----
    function check_is_from_store() {
        if (r_name.value === 'account-store-id' || r_name.value === 'account-store-id-setting') {
            is_from_store.value = true; // show button create post store. (plush icon)
        } else {
            is_from_store.value = false;  // show button create post user. (camera plus icon)
        }
    }
    // ---- check new auth user ----
    function check_new_auth_user() { check_auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    // ---- check auto ----
    function function_check() {
        if (check_auth.value && isMobile.value) {
            if (!timerID_nav.value) {  // --> it the most spacial check, if doesn't check, it crate multiple request in the same time <--
                timerID_nav.value = setInterval(() => {
                    start_request(); // set get request badge on created prevent error when request axios
                }, 5000); // 5 second
            }
        } else {
            clear_badge(); // clear request badges,
        }
    }
    
    const not_cookie = useCookie('not_cookie')
    const chat_cookie = useCookie('chat_cookie')
    const sub_chat_cookie = useCookie('sub_chat_cookie')
    const sub_cm_cookie = useCookie('sub_cm_cookie')
    // ---- request to get notification badges ----
    function start_request() {
        check_new_auth_user();
        // --- if have Auth User ---
        if (check_auth.value) {

            clear_badge(); // remove auto request when starting request badges,

            $fetch(config.VUE_APP_API_URL_NOTIFICATION_NEW + 'badges', {
                headers: { "Access-Token": check_auth.value.tokens.access_token },
                params: { lang: language.value, fields: 'chat,comment' },

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
                // console.log(res)
                // -- badge comments --
                // $fetch(config.VUE_APP_API_URL_COMMENT + 'me/total_unread', {
                //     headers: { "Access-Token": check_auth.value.tokens.access_token },
                //     params: { lang: language.value },

                // }).then(com => {
                //     // --- use return data dome not work, use like this work ---
                //     // -- notification --
                //     var id_badge = $('html body #add_badge_not');
                //     if (res.notification && res.notification > 0) {
                //         id_badge.removeClass('d-none');
                //         id_badge.text(res.notification);
                //     } else {
                //         id_badge.addClass('d-none');
                //         id_badge.text('0');
                //     }
                //     // -- chats && comments --
                //     var id_add_badge = $('html body #add_badge_chat');
                //     var id_chats_badge = $('html body #badge_sub_chats');
                //     var id_comments_badge = $('html body #badge_sub_comments');
                //     if ((res.chat && res.chat > 0) || com.data > 0) {
                //         id_add_badge.removeClass('d-none');
                //         id_add_badge.text(parseInt(res.chat)+parseInt(com.data)); // add to icon chat in bottom navigation.
                //         if (r_name.value === 'chats') { // only in chats page, must to add badge chats && comments.
                //             if (res.chat > 0) { id_chats_badge.removeClass('d-none'); id_chats_badge.text(res.chat); } // add badge in chats page on chats text title.
                //             if (com.data > 0) { id_comments_badge.removeClass('d-none'); id_comments_badge.text(com.data); } // add badge in chats page on comments text title.
                //         }
                //     } else {
                //         id_add_badge.addClass('d-none'); id_add_badge.text('0');
                //         id_chats_badge.addClass('d-none'); id_chats_badge.text('0');
                //         id_comments_badge.addClass('d-none'); id_comments_badge.text('0');
                //     }

                //     // -- set new auto request when success --
                //     function_check();

                // }).catch(error => {
                //     let check = error && error.response ? error.response : '';
                //     if (check && check.status === 401) { // if auth token expire
                //         clear_badge();
                //     }
                // });

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

    // ---- if click nav current page scroll to top ----
    function btn_home_page() {
        window.scrollTo({top: 0}); // window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout( () => {
            $('#clear_catch_post').click(); // -- clear catch post at homePage --
        }, 1000); // set timeout prevent view another page load slow.
    }

    // ---- clear auto request on badge ----
    function clear_badge() { clearInterval(timerID_nav.value); timerID_nav.value = ''; }

    // ---- notification ----
    function btn_notification_page() {
        if (check_auth.value) {
            if (r_name.value === 'notification') { window.scrollTo({top: 0 /*, behavior: 'smooth'*/}); }
            helper.params_make_condition('clear_cache', { clear_cache: 'clear' });
            router.push(localePath({ name: 'notification' }));
        } else {
            // create state when login completed
            let expired = helper.Date_To_Timestamp('', 300, 'seconds'); // timestamp add 5 ( minute more 5 * 60 = 300 )
            let arr_save_state = {
                action: 'notification',
                expire: expired,
                data: {post_id: ''},
                from: {name: ''}
            }
            localStorage.setItem("save_state", JSON.stringify(arr_save_state));
            router.push(localePath({ name: 'auth' }));
        }
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

    // ---- chat ----
    function btn_chat_page() {
        if (check_auth.value) {
            helper.params_make_condition('clear_cache', { clear_cache: 'clear' });
            router.push(localePath({ name: 'chats' }));
            window.scrollTo({top: 0/*, behavior: 'smooth'*/});
        } else {
            // create state when login completed
            let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
            let arr_save_state = {
                action: 'chats',
                expire: expired,
                data: { post_id: '' },
                from: { name: '' }
            }
            localStorage.setItem("save_state", JSON.stringify(arr_save_state));
            router.push(localePath({ name: 'auth'}));
        }
    }
</script>


