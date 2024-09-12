<template>
   <div class="desktop">
      <nav class="header-desktop">Desktop Header {{ scale  }}</nav>
      <div class="desktop-view">
         <slot />
      </div>
   </div>
</template>

<script setup>

const scale = useRoute().params.isMobile == "true" ? "1.0" : "0.0"

// useHead({
//   meta: [
//     {
//       name: 'viewport',
//       content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
//     },
//   ],
// });


</script>

<style scoped>
.desktop-view {
   padding: 1rem;
   gap: 1rem;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
}

</style>
