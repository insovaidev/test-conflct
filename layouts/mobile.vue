<template>
   <div>
      <nav class="header-mobile"><h1>Mobile Header {{ scale  }}</h1></nav>
      <div class="mobile-view">
         <slot />
      </div>
   </div>
</template>

<script setup>
const scale = useRoute().params.isMobile == "true" ? "1.0" : "0.0"


function setUseHead() {
   // useHead({
   //   meta: [
   //     {
   //       name: 'viewport',
   //       content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
   //     },
   //   ],
   // });
}


onMounted(() => {
   if (process.client) {
      // setUseHead()
   }
})

</script>

<style scoped>

.mobile-view {
   padding: 1rem;
   gap: 1rem;
   display: flex;
   flex-direction: column;
}

</style>