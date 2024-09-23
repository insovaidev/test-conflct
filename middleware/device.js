export default defineNuxtRouteMiddleware(async (to, from) => {

   // const { data }  = await useFetch('/api/test')

   console.log('middleware')



   let userAgent = process.server ? useRequestHeaders()["user-agent"] : navigator.userAgent
   
   to.params.isMobile = String(/mobile/i.test(userAgent))


   console.log('to.params.isMobile', to.params.isMobile)

   
})