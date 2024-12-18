import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';

export function useRecaptcha() {  
  const { vueApp } = useNuxtApp();  
  const config = useRuntimeConfig();  
  const active = true
  if(active){
    vueApp.use(VueReCaptcha, {  
      siteKey: config.public.RECAPTCHA,
      loaderOptions: { autoHideBadge: false },  
    });
  }
  const recaptcha = useReCaptcha()
  if(recaptcha) {
    const { executeRecaptcha, recaptchaLoaded } = recaptcha
    return async (action) => {  
      await recaptchaLoaded()
      return await executeRecaptcha(action)
    }
  }
  return async (action) => {}
}