
<template>
    <div  class="min_h">
        <resume :pageType="'edit'" style="margin-top: 0px;"/> 
    </div>
</template>


<script setup>

    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.

</script>

