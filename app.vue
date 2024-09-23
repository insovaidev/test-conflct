<template>
   <NuxtLayout>
      <pre>layout: {{ layout }}</pre>
      <br />
      <pre>latestUpdate: {{ latestUpdate }}</pre>

      <NuxtPage />
   </NuxtLayout>
</template>


<script setup>

const layoutReference = ref('')
const test = ref('')
const layoutName = ref('')
const latestUpdate = ref('')

definePageMeta({ middleware: "device", layout: ''});

const layout = useRoute().params.isMobile == "true" ? "mobile" : "desktop"

function adjustViewport() {

   let viewportMetaTag = document.querySelector('meta[name="viewport"]');

   // if (window.innerWidth > 768 && layout == 'desktop') {
      latestUpdate.value = new Date().getTime().toLocaleString() + layout + window.innerWidth
   //    viewportMetaTag.setAttribute('content', `width=device-width, initial-scale=0`);
   // } else if (window.innerWidth > 768 && layout == 'mobile') {
   //    latestUpdate.value = new Date().getTime().toLocaleString() + 'desktop' + window.innerWidth
   //    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1');
   // }
   // else {
   //    latestUpdate.value = new Date().getTime().toLocaleString() + 'desktop' + window.innerWidth
   //    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1');
   // }

      // if (layout=='desktop') {
      if (window.innerWidth > 768)  {
         var meta = document.createElement('meta');
         meta.setAttribute('name', 'viewport');
         meta.setAttribute('content', 'width=device-width, initial-scale=1');
         document.head.appendChild(meta);
      } else {
        
      }
}





onMounted(() => {

   if (process.client) {
      adjustViewport()
      window.onresize = adjustViewport;
   }

})


</script>

<style>
body {
   background: rgb(239, 237, 237);
}
</style>

