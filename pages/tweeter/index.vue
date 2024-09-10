<template>
   <button  class="border-[1px] border-gray-500 rounded-md px-3 py-1" @click="shareToX()">shareToX</button>
   <button class="border-[1px] border-gray-500 rounded-md px-3 py-1" @click="shareLinkToFacebook()">shareLinkToFacebook</button>
</template>
<script setup lang="js">
  useHead({
    meta: [
      { property: 'og:title', content: 'The Intuitive Web Framework' },
      { property: 'og:description', content: 'Build your next Vue.js application with confidence using Nuxt...' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://stately-squirrel-915b70.netlify.app/tweeter' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://images.khmer24.co/24-09-09/-1-kg-3300--629490172587722261516483-b.jpg' },
      { property: "og:image:width", content: "600" },
      { property: "og:image:height", content: "600" },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'The Intuitive Web Framework' },
      { name: 'twitter:description', content: 'Build your next Vue.js application with confidence using Nuxt...' },
      { name: 'twitter:image', content: 'https://images.khmer24.co/24-09-09/-1-kg-3300--629490172587722261516483-b.jpg' }
   
  ]})

  
const shareToX = (uri) => {
  try {
    if (window.navigator.onLine) {
      let url = window.location.origin+'/tweeter'
      window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+url+''),'facebook-share-dialog','width=626,height=436');
      return false;
    } else {
      // return $('#modal_show_statu_error_connection').modal('show');
    }
  } catch (error) {
    
  }
} 




const shareLinkToFacebook = (uri) => {
  try {
    if (window.navigator.onLine) {
      let url = window.location.origin+'/tweeter'
      window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(''+url+''),'facebook-share-dialog','width=626,height=436');
      return false;
  } else {
      // return $('#modal_show_status_error_connection').modal('show');
  }
  } catch (error) {
    
  }
} 
</script>