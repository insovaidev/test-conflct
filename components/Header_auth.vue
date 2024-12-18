
<template>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
        <div :class="route_name === 'auth' ? '_div_nav bg_app_bar_header_ box_shadow_app_bar' : '_div_nav bg_app_bar_header_'">
            <div @click="goBack" class="_pad_col_icon">
                <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                    <i class="ion-android-arrow-back font_click_back"></i>
                </button>
            </div>
            <div class="col pl-1 l_h_con_title">
                <p class="m-0 name_style truncate_wrap" id="setting_title">{{ title ? title : '' }}</p>
            </div>
            <ClientOnly>
                <div v-if="condition_setting" class="_pad_col_icon">
                    <NuxtLink tag="button" :to="localePath({ name: 'setting' })" class="btn pt-1 pb-1 font_bold truncate font_19 text-white">
                        <!-- {{ $t('message.setting') }} -->
                        <i class="fas fa-cog"></i>
                    </NuxtLink>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    const route = useRoute();
    const router = useRouter();
    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath()
    const { locale } = useI18n();
    const route_name = ref(helper.clear_prefix_route_name(route.name));

    const title = ref(null);
    const condition_setting = ref('show setting');

    onMounted(() => {
        if (process.client) {
            // route_name.value = helper.clear_prefix_route_name(route.name)
            $(".arrow_back_nav").ripple();
            let lang = locale.value === 'km' ? 'km' : 'en'
            change_language(lang);
            // --- remove class modal-open ---
            helper.remove_class_modal_open();
        }
    })

    // watch(() => route.name,()=>{
    //     route_name.value = helper.clear_prefix_route_name(route.name)
    //     change_language(lang);
    // })

    function change_language(language) {
        if (route_name.value === 'auth-login' || route_name.value === 'login') {
            condition_setting.value = 'show setting';
            title.value = language === 'km' ? 'ចូលគណនី' : 'Login';
        } else if (route_name.value === 'auth-register' || route_name.value === 'register') {
            condition_setting.value = 'show setting';
            title.value = language === 'km' ? 'ចុះឈ្មោះ' : 'Register';
        } else if (route_name.value === 'auth-forgot-password' || route_name.value === 'forgot-password') {
            condition_setting.value = '';
            title.value = language === 'km' ? 'ស្វែងរកគណនី' : 'Find Account';
        } else if (route_name.value === 'auth-confirm-code') {
            condition_setting.value = '';
            title.value = language === 'km' ? 'បញ្ជាក់លេខកូត' : 'Confirm Code';
        } else if (route_name.value === 'auth-set-new-password') {
            condition_setting.value = '';
            title.value = language === 'km' ? 'កំណត់ពាក្យសម្ងាត់ថ្មី' : 'Set New Password';

        } else if (route_name.value === 'setting') {
            condition_setting.value = '';
            title.value = language === 'km' ? 'ការកំណត់' : 'Setting';
        } else if (route_name.value === 'setting-change-username') {
            condition_setting.value = '';
            title.value = language === 'km' ? 'ផ្លាស់ប្តូរឈ្មោះអ្នកប្រើ' : 'Change Username';
        } else if (route_name.value === 'setting-change-password') {
            condition_setting.value = '';
            title.value = language === 'km' ? 'ផ្លាស់ប្តូរពាក្យសម្ងាត់' : 'Change Password';
        } else if (route_name.value === 'setting-change-phone') {
            condition_setting.value = '';
            if (route.query.from) { title.value = language === 'km' ? 'លេខទូរស័ព្ទ' : 'Mobile Phone Number';     // from post_ad
            } else { title.value = language === 'km' ? 'ផ្លាស់ប្តូរលេខទូរស័ព្ទបច្ឆុប្បន្ន' : 'Change Activate Phone'; }     // from account setting
        } else if (route_name.value === 'setting-edit-profile') {
            condition_setting.value = '';
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            if (pa_con && pa_con.from && pa_con.from.d_params && pa_con.from.d_params.from) {
                title.value = language === 'km' ? 'កែទំនាក់ទំនង' : 'Edit Contact';
            } else {
                title.value = language === 'km' ? 'កែប្រវត្តិរូប' : 'Edit Profile';
            }
            helper.clear_params_make_con('from');
        }
    }

    function goBack() {
        window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'}));
    }
</script>
