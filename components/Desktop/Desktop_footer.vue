<template>
    <footer v-if="!isMobile" >
        <div class="f-footer mt_160" style="min-width: 1024px;">
            <div class="text-center screen-content-desktop">
               <div style="margin-bottom: -30px;">
                <img src="/icon/khmer24_footer.png" alt="khmer24_footer" class="f-image">
               </div>
            </div>
            <div class="text-white screen-content-desktop">
                <ul class="list-unstyled d-flex m-0">
                    <li class="f-menu ps-0">
                        <div class="f-header mb-3">{{ $t('text_desktop.follow_khmer24') }}</div>
                        <a href="https://www.facebook.com/khmer24.com" class="d-flex mb-3 align-items-center nav-link" target="_blank" rel="nofollow" title="Follow Khmer24 Facebook Page">
                            <i class="bi bi-facebook icon-facebook"></i>
                            Facebook
                        </a>
                        <a href="https://www.youtube.com/@Khmer24app" class="d-flex mb-3 align-items-center nav-link" target="_blank" rel="nofollow">
                            <i class="bi bi-youtube icon-youtube"></i>
                            Youtube
                        </a>
                    </li>
                    <li class="f-menu">
                        <div class="f-header mb-3">{{ $t('text_desktop.customer_service') }}</div>
                        <nuxt-link :to="localePath({ name: 'contact' })" class="nav-link p_2">{{ $t('message.contact_us') }}</nuxt-link>
                        <nuxt-link v-if="user_data?.user?.setting?.payment?.includes('subscription')" :to="localePath({ name: 'account-membership' })" class="nav-link p_2">{{ $t('text_desktop.membership') }}</nuxt-link>
                        <nuxt-link :to="localePath({ name: 'privacy-policy' })" class="nav-link p_2">{{ $t('message.privacy_policy') }}</nuxt-link>
                    </li>
                    <li class="f-menu">
                        <div class="f-header mb-3">{{ $t('text_desktop.useful_information') }}</div>
                        <nuxt-link :to="localePath({ name: 'safety-tips' })" class="nav-link p_2">{{ $t('message.safe_tips') }}</nuxt-link>
                        <nuxt-link :to="localePath({ name: 'posting-rule' })" class="nav-link p_2">{{ $t('text_desktop.ad_posting_rule') }}</nuxt-link>
                        <NuxtLink :to="localePath({ name: 'feedback' })" class="nav-link p_2">{{ $t('lng.feedback') }}</NuxtLink>
                    </li>
                    <li class="f-menu ">
                        <div class="f-header mb-3">{{ $t('text_desktop.down_khmer24_free') }}</div>
                        <div class="d-flex mr_-15">
                            <div class="w-50 position-relative pe-1">
                                <img src="/icon/khmer24-qr-code.png" alt="khmer24-qr-code" width="100%" >
                            </div>
                            <div class="w-50 position-relative text-end ms-3">
                                <a href="https://apps.apple.com/kh/app/khmer24/id1133793397" target="_blank" rel="nofollow">
                                    <img src="/icon/appstore.png" alt="appstore"  class="mt_5 img-fluid">
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=khmer24.com" target="_blank" rel="nofollow">
                                    <img src="/icon/playstore.png" alt="playstore"  class="mt_5 img-fluid">
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=khmer24.com" target="_blank" rel="nofollow">
                                    <img src="/icon/appGallery_.jpg" alt="appGallery_"  class="mt_5 img-fluid">
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <p class="copy-right text-center p-2 m-0 copyright">Copyright ©2021 <NuxtLink :to="localePath({ name: 'index' })" class="text_white">KHMER24</NuxtLink> (Cambodia). All rights reserved.</p> -->
        </div>
    </footer>
</template>

<script setup>
    import helper from "/helper";
    const localePath = useLocalePath()
    const isMobile= ref(helper.m_or_d())
    const { locale } = useI18n();
    const { public:config } = useRuntimeConfig(); 
    const route = useRoute();
    const r_name = ref(helper.clear_prefix_route_name(route.name));
    const all_location = useState('all_location',()=>'')
    const user_data = ref('')


    onMounted(()=>{
        if(process.client){
            user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
        }
    })

    // if(process.server){
    //     await get_all_location();
    // }
    // get_all_location();
    // onMounted( async ()=>{
    //     if(process.client){
    //         isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
    //         await get_all_location();
    //     }
    // })
    
    // watch(() => route.name, () => {
    //     r_name.value = helper.clear_prefix_route_name(route.name);
    // })

    // async function get_all_location() { 
    //   await  $fetch(config.VUE_APP_API_URL+'locations?lang=en')
    //     .then(res=>{
    //         all_location.value = res
    //     })
    // }

</script>
