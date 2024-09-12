<template>
   <NuxtLayout :name="layout">
      <NuxtPage />
   </NuxtLayout>
</template>


<script setup>

const test = ref('')
const layoutName = ref('')

definePageMeta({ middleware: "device" });

const layout = useRoute().params.isMobile == "true" ? "mobile" : "desktop"




function viewportHandler(event) {
   // NOTE: This doesn't actually work at time of writing
   // if (event.target.scale > 3) {
   //    document.body.classList.remove("hide-text");  
   // } else {
   //    document.body.classList.add("hide-text");
   // }
  test.value = event.target.scale

//   console.log()
   
}

function zoomPage(scale) {
  document.body.style.zoom = scale;
}


function callMe () {
   document.body.style.transform = "scale(0.42)";
}


function requestDesktopSite() {
// if(layout == 'desktop') {
   document.getElementsByTagName('meta')['viewport'].content='min-width: 980px;';
   layoutName.value = 'desktop'
   //  }
}
   
   
function requestMobileSite() {
   document.getElementsByTagName('meta')['viewport'].content='width=device-width, initial-scale=1.0, user-scalable=n';
   layoutName.value = 'mobile'
}


// if (process.client) {
//    if (layout == 'mobile') {
//       requestMobileSite()
//    } else {
//       requestDesktopSite()
//    }
// }


onMounted(() => {


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

