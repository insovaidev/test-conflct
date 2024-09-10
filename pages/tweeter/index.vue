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
      { property: 'og:url', content: 'https://nuxt.com' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://nuxt.com/social.jpg' },
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