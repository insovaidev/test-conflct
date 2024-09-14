<template>
   <NuxtLayout :name="layout">
      <NuxtPage />
   </NuxtLayout>
</template>


<script setup>

const test = ref('')
const layoutName = ref('')

definePageMeta({ middleware: "" });

const layout = useRoute().params.isMobile == "true" ? "mobile" : "desktop"


function adjustViewport() {
   let viewportMetaTag = document.querySelector('meta[name="viewport"]');
   if (window.innerWidth > 768) {
      viewportMetaTag.setAttribute('content', `width=device-width, initial-scale=0`);
   } else {
      viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1');
   }
}


onMounted(() => {

   if (process.client) {
      // adjustViewport()
      // window.onresize = adjustViewport;
   }


   // requestDesktopSite()
   // console.log(document.getElementsByTagName('meta')['viewport'])
   // if (process.cli)
   // if (layout == "desktop") {
   //    // test.value = '0.42'
   //    document.getElementsByTagName('meta')['viewport'].content='min-width: 980px;';
   // }

   // test.value = window.innerWidth
   // document.addEventListener("gesturestart", function (e) {
   //    e.preventDefault();
   //     document.body.style.zoom = 0.99;
   // });
   
   // document.addEventListener("gesturechange", function (e) {
   //    e.preventDefault();
   
   //   document.body.style.zoom = 0.99;
   // });
   // document.addEventListener("gestureend", function (e) {
   //      e.preventDefault();
   //     document.body.style.zoom = 1;
   // });


   // window.visualViewport.addEventListener("resize", viewportHandler);
})


</script>

<style>
body {
   background: rgb(239, 237, 237);
}
</style>

