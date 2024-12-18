<template>
    <div v-if="!isMobile">
        <D_header/>
    </div>

    <slot />

    <div v-if="isMobile">
        <div v-if="r_name === 'chats-detail-chat' || r_name === 'chats' || r_name === 'slugCategory' ">  </div>
        <template v-else>
            <div class="screen-mobile">
                <Desktop_footer />
            </div>
        </template>
    </div>
    <Desktop_footer />
</template>

<script setup>
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    import Desktop_header from "/components/Desktop/Desktop_header";
    import Desktop_footer from "/components/Desktop/Desktop_footer";
    const isMobile= ref(helper.m_or_d())
    const route = useRoute();
    const r_name = ref(helper.clear_prefix_route_name(route.name));
    onMounted(()=>{
        if(process.client){
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            r_name.value = helper.clear_prefix_route_name(route.name);
        }
    })
    watch(() => route.name, () => {
        // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
        r_name.value = helper.clear_prefix_route_name(route.name);
    })
</script>
