<template>
    <Register />
</template>
<script setup>
import Register from '/components/form_login_register/Register.vue'
definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
</script>