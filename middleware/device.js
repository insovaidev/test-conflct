export default defineNuxtRouteMiddleware((to, from) => {
   let userAgent = process.server ? useRequestHeaders()["user-agent"] : navigator.userAgent
   to.params.isMobile = String(/mobile/i.test(userAgent))
   if (to.params.isMobile == 'false') {
        useMeta('width: full,  min-width: 100px', 'red', -1)
    } else {
        useMeta('width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no', 'blue', 1)
   }
})