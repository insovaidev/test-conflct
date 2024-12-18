<template>
    <template v-if="!isMobile">
        <D_header/>
    </template>
    <slot />

    <template v-if="isMobile">
            <template v-if="arr_r_name.includes(r_name)"></template>
            <template v-else>
                <TheFooter />
            </template>
    </template>
    <div v-if="r_name === 'chats-detail-chat' || r_name === 'chats' || r_name === 'resumes'">
        
    </div>
    <template v-else>
        <Desktop_footer />
    </template>
</template>

<script setup>
    import helper from "/helper";
    import Desktop_footer from "/components/Desktop/Desktop_footer";
    const isMobile= ref(helper.m_or_d())
    const route = useRoute();
    const r_name = ref(helper.clear_prefix_route_name(route.name));
    const arr_r_name = [ 'post', 'posting-rule', 'privacy-policy', 'contact', 'safety-tips', 'feedback', 'success' ]
    onMounted(()=>{
        if(process.client){
            r_name.value = helper.clear_prefix_route_name(route.name);
        }
    })
    watch(() => route.name, () => {
        r_name.value = helper.clear_prefix_route_name(route.name);
    })
</script>
