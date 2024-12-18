<template>
    <Component_Search_Listing />
</template>

<script setup>
    import Component_Search_Listing from "/components/com_search/Search_listing_cpn";
    onMounted(()=>{
        if(process.client){
            hidOverflow()
        }
    })
    function hidOverflow(){
        $('body').css('overflow','unset')
    }
</script>
