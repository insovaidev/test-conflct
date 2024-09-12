<template>
   <NuxtLayout :name="layout">
      <NuxtPage />
   </NuxtLayout>
</template>


<script setup>




const layout = useRoute().params.isMobile == "true" ? "mobile" : "desktop"


</script>
