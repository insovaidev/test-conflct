<template>
   <NuxtLayout :name="layout">
      <NuxtPage />
   </NuxtLayout>
</template>


<script setup>

definePageMeta({ middleware: "device" });

const layout = useRoute().params.isMobile == "true" ? "mobile" : "desktop"




</script>
