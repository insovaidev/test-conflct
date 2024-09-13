export default defineNuxtRouteMiddleware((to, from) => {

   let userAgent = process.server ? useRequestHeaders()["user-agent"] : navigator.userAgent
   
   to.params.isMobile = String(/mobile/i.test(userAgent))
   
   console.log('to.params.isMobile', to.params.isMobile)

//    if (to.params.isMobile == 'false') {
//         useMeta('width=device-width, user-scalable=no, initial-scale=0.0, maximum-scale=0.0', 'white', -1)
//     } else {
//         useMeta('width=device-width, user-scalable=no, initial-scale=0.0, maximum-scale=1.0', 'white', 0)
//    }
})