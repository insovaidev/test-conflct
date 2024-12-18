<template>
    <div>
        <div class="min_h">
            <resume :pageType="'resume_me'" /> 
        </div>
    </div>
</template> 
<script setup>
    definePageMeta( { layout: "custom", middleware: "auth" } );
    // const auth_user = useCookie('auth_user')
    // const headers = {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Access-Token": auth_user.value.tokens.access_token
    // }
</script>
