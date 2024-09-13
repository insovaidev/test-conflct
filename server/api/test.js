export default defineEventHandler((event) => {
   const userAgent = event.req.headers['user-agent'];
   const isMobile = /mobile/i.test(userAgent);
   return {
      message: `Hello, this is ${isMobile ? 'a mobile' : 'a desktop'} device!`
    };
 })
 