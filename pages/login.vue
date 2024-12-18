<template>
    <Login />
</template>
<script setup>
import Login from "/components/form_login_register/Login.vue"
definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
</script>