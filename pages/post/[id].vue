<template>
    <Create_Post />
</template>

<script setup>
    import Create_Post from "/components/com_dot_html/Create_post_com";
    // definePageMeta({ middleware: "auth" }); // use layout dont have bottom nav bar check auth.
    definePageMeta( {layout: "custom", middleware: "auth"} );
</script>
