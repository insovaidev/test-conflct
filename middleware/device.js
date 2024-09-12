export default defineNuxtRouteMiddleware((to, from) => {
   console.log('device')
   let userAgent = process.server
       ? useRequestHeaders()["user-agent"]
       : navigator.userAgent
   to.params.isMobile = String(/mobile/i.test(userAgent))
   })