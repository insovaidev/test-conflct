<template>
   <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus voluptas cum odio reiciendis? Repellendus dignissimos omnis debitis aut ut? Accusantium laboriosam alias molestiae distinctio, facere minus error tempora soluta perferendis.</p>
</template>


<script setup>
import { useHead } from 'nuxt/app'

useHead({
  title: 'Nuxt - The Intuitive Web Framework',
  meta: [
    // Open Graph Meta Tags
    { property: 'og:title', content: 'Nuxt - The Intuitive Web Framework' },
    { property: 'og:description', content: 'Nuxt is a web development framework built on top of Vue.js, offering full-stack capabilities and a powerful developer experience.' },
    { property: 'og:image', content: 'https://nuxt.com/your-thumbnail.jpg' },
    { property: 'og:url', content: 'https://nuxt.com' },
    { property: 'og:type', content: 'website' },

    // Twitter Card Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Nuxt - The Intuitive Web Framework' },
    { name: 'twitter:description', content: 'Nuxt is a web development framework built on top of Vue.js, offering full-stack capabilities and a powerful developer experience.' },
    { name: 'twitter:image', content: 'https://nuxt.com/your-thumbnail.jpg' },
    { name: 'twitter:url', content: 'https://nuxt.com' },
  ]
})
</script>
