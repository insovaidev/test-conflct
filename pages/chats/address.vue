<template>
    <div>
        <add_address />
    </div>
</template>
<script setup>
    import add_address from "@/components/address.vue"
    definePageMeta( {layout: "custom", middleware: "auth"} ); 
</script>