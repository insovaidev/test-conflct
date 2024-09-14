import { defineNitroPlugin } from 'nitropack'

export default defineNitroPlugin((nitroApp) => {
  
  console.log('api test', isMobile)
  
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const userAgent = event.req.headers['user-agent'];
    const isMobile = /mobile/i.test(userAgent);

  });
});

useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://images.khmer24.co/24-09-06/dog-labubu-629490172558715920146508-b.jpg',
  ogUrl: 'https://stately-squirrel-915b70.netlify.app/tweeter', 
  twitterTitle: 'My Amazing Site',
  twitterDescription: 'This is my amazing site, let me tell you all about it',
  twitterImage: 'https://images.khmer24.co/24-09-06/dog-labubu-629490172558715920146508-b.jpg',
  twitterCard: 'summary',
})