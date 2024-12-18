
<template>
    <div class="min_h">
        <div v-if="isMobile" class="col no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="router.back()" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col pl-0 l_h_con_title">
                    <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('lng.feedback') }} </p>
                </div>
            </div>
        </div>

        <div class="text-center" :class="isMobile ? 'mt_120' : 'dt_mt_w'">
            <i class="bi bi-check-circle-fill dt-i-check"></i>
            <p class="dt-t-suc">{{ locale==='km' ? 'ដាក់ស្នើមតិទទួលបានជោគជ៍យ' :'Submit Feedback Successful!' }}</p>
            <p>{{ locale==='km' ? 'សូមអរគុណសម្រាប់ការចំណាយពេលដើម្បីផ្ដល់មតិ។' : 'Thank for taking the time to give us feedback.' }}</p>
        </div>
    </div>
</template>

<script setup>
    import helper from "/helper";
    const router = useRouter();
    const isMobile= ref(helper.m_or_d())
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const pa_con = helper.get_params_make_condition(); // get data params condition.
    const message = ref(null);

    onMounted(() => {
        if (process.client) {
            // --- get message success from server when create new post_ads ---
            const p_message = pa_con && pa_con.message && pa_con.message.d_params ? pa_con.message.d_params : '';
            message.value = p_message && p_message.message ? p_message.message : '';
            if (!message.value) {
                router.push(localePath({ name: 'index' }));
            }
        }
    })

    onUnmounted(() => {
        helper.clear_params_make_con('message');
    })
</script>
