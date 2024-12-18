<template>
  <Component_Detail_Post />
</template>

<script setup>
    import Component_Detail_Post from "/components/detail_post/Detail_post_cpn";
    // definePageMeta({ middleware: "auth" }); // check auth
    definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar , check auth
</script>
