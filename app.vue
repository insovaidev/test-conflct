<template>
  <div>
    <NuxtLayout>
        <NuxtPage :class="isMobile ? '' : 'screen-content-desktop'"/>
    </NuxtLayout>
    
    <template v-if="!isMobile">
      <div class="fix-feedback">
        <NuxtLink :to="localePath({ name: 'feedback' })" class="btn btn-sm btn-k24-primary">{{ $t('lng.feedback') }}</NuxtLink>
      </div>

      <button type="button" class="btn dt_btn_scroll_top" id="to_top" @click="click_scroll_up">
        <i class="fa fa-chevron-up"></i>
      </button>
    </template>

    <template v-if="prevent_first">
      <div class="nav n_p_connection" :class="check_connection ? 'color_online' : 'color_offline'">
        <p class="s_p_connection"> {{ check_connection ? 'you are online' : 'you are offline' }} </p>
      </div>
    </template>
  </div>
</template>


<script setup>
  import { VueCookieNext } from 'vue-cookie-next';
  import helper from "/helper";
  const runtime_config = useRuntimeConfig(); // setup config env to config variable.
  const app_config = runtime_config.public;
  const route = useRoute();
  const router = useRouter();
  const isDesktop = helper.check_is_desktop(); // check userAgent
  const localePath = useLocalePath();
  const { locale } = useI18n();
  const language = ref(helper.get_lang_cookie());

  const user_data = ref('');
  const timerID_ = useState('timerID_', () => '');
  const renew_user_info = useState('renew_user_info', () => '');

  const check_connection = ref(true);
  const prevent_first = ref(false);
  const reload_q_again_1 = ref(0);
  const reload_q_again_2 = ref(0);

  const check_r_captcha = [ 'auth', 'login', 'register', 'forgot-password', 'auth-login', 'auth-register', 'feedback', 'auth-forget-password', 'username-report' ]
  const isMobile = ref(helper.m_or_d ())

  const isMobileLandscape = ref(false);

  useHead({
    "htmlAttrs": [
      { lang: 'en' }
    ],
    // htmlAttrs: { lang: 'en' }, // or like this
    "charset": "UTF-8",
    // "viewport": "width=device-width, initial-scale=0",
    // "viewport": "width=device-width, initial-scale=1, minimum-scale=1",
    "meta": [
      { name: 'theme-color', content: '#028dcf' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'google-site-verification', content: 'Vj3nFdA-uZGZFOP3ZajI-jYDUUPyNZL-EMAE5WbY94A' },

      /*{ name: 'Khmer24', content: 'app-id=1133793397, app-argument=https://m.khmer24.com/en/' },
      { property: 'al:ios:app_name', content: 'Khmer24' },
      { property: 'al:ios:app_store_id', content: '1133793397' },
      { property: 'al:ios:url', content: 'https://m.khmer24.com/en/' },*/
    ],
    "link": [
      {  rel: 'shortcut icon', href: '/icon/favicon.ico' },
      {  rel: 'preconnect stylesheet', href: 'https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap' },
      {  rel: 'preconnect stylesheet', href: ' https://fonts.googleapis.com/icon?family=Material+Icons' },
     
      /* my image */
      {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon.png' },
      {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon-ipad.png' },
      {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon-iphone-retina.png' },
      {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon-ipad-retina.png' },

      /* Fonts */
      /*{  rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Hanuman:wght@400;700&display=swap' },*/
      {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+app_config.LIBRARY_VERSION+'bootstrap-5.3.2/css/bootstrap.min.css' },
      {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+app_config.LIBRARY_VERSION+'ionicons-2.0.1/css/ionicons.min.css' },
      
      {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+app_config.LIBRARY_VERSION+'bootstrap-5.3.2/bootstrap-icons/font/bootstrap-icons.min.css' },
      {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+app_config.LIBRARY_VERSION+'css/mobile_main.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'fontawesome/css/all.min.css' },
      /*{  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'fancybox/dist/jquery.fancybox.min.css' },*/
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'fancybox-v5/fancybox.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'icomoon/style.css' }, /* generated icon our own with icoMoon */

      /* my css */
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/home_general_style.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/list_ads.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/account.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/desktop_view.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/media_all_style.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/map_openlayer.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/style_btn.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'my_css/premium_account.css' },

      /* Owl Stylesheets */
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'owl_carousel/owlcarousel/assets/owl.carousel.min.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'owl_carousel/owlcarousel/assets/owl.theme.default.min.css' },

      /* ripple effect */
      {  rel: 'preload stylesheet', as: 'style', href: '/'+app_config.LIBRARY_VERSION+'ripple-effect/css/ripple.css' },
    ],
    "style": [],
    "script": [
      /* share to facebook */
      /*{ rel: 'preconnect', crossorigin: 'anonymous', async: true, defer: true, src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0' },*/

      /* my script analytic */

      /* javascript */
      // { rel: 'preload', as: 'script', type: 'text/javascript', src: 'https://www.google.com/recaptcha/api.js?render='+app_config.RECAPTCHA },
      
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'js/jquery-3.7.1.min.js' },
      /*{ rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'fancybox/dist/jquery.fancybox.min.js' },*/
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'fancybox-v5/fancybox.umd.js' },
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'plupload-2.3.9/plupload.full.min.js' },
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'jquery_validation/dist/jquery.validate.js' },
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'bootstrap-5.3.2/popper.min.js' },
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'bootstrap-5.3.2/js/bootstrap.min.js' },
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'bootstrap-5.3.2/bootstrap-notify/bootstrap-notify.min.js' },
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'jquery.lazy-master/jquery.lazy.min.js' },

      /* ripple effect */
      { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+app_config.LIBRARY_VERSION+'ripple-effect/js/ripple.js' },

      /* recorder */
      { rel: 'preload', as: 'script', src: '/'+app_config.LIBRARY_VERSION+'recorder-js/recorder.js' },
      // { src: '/file.js' },

      /* check OS and Version of Platform */
      { rel: 'preload', as: 'script', src: '/'+app_config.LIBRARY_VERSION+'os_platform/platform.js' },

      /* Owl javascript */
      { rel: 'preload', as: 'script', src: '/'+app_config.LIBRARY_VERSION+'owl_carousel/owlcarousel/owl.carousel.js' },

      /* facebook login */
      { rel: 'preconnect', crossorigin: 'anonymous', nonce: 'MUHiCe5C', async: true, defer: true,
        src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId=217361691621555&autoLogAppEvents=1' }, /* nov ah nes ot ton add jol  "async defer"  */
    ]
  })

  const checkOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        isMobileLandscape.value = false
        window.onresize = adjustViewport;
      } else if (window.matchMedia("(orientation: landscape)").matches) {
        isMobileLandscape.value = true
        if(isMobile.value){
          window.onresize = adjustViewport1;
        }
      }
  };

  onMounted(() => {
    if (process.client) {
      checkOrientation(); // Initial check
      window.addEventListener('resize', checkOrientation); // Listen for resize events
      if(!isMobileLandscape.value){
        window.onresize = adjustViewport;
      }
      
      for(const val of check_r_captcha){
        if(helper.clear_prefix_route_name(route.name) === val){
          setTimeout(()=>{
            $('.grecaptcha-badge').css({'visibility':'unset'});
          },50)
          break;
        }else{
          $('.grecaptcha-badge').css({'visibility':'hidden'});
        }
      }
      Fancybox.bind("[data-fancybox]", {});
      // -- only in desktop screen --
      if (!isMobile.value) {
        let r_n = helper.clear_prefix_route_name(route.name); // clear route name
        // if (r_n === 'index' || r_n === 'title-adid-id' || r_n === 'username') {
          window.onscroll = function() { scrollFunction(); } // scroll event
          screen_resize(); // load screen size first
          window.onresize = function () { screen_resize(); } // resize screen event
        // }
      }

      user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';

      // -- store localize prevent cookies and localStorage "lang" empty --
      localStorage.setItem('lang', locale.value === 'km' ? 'km' : 'en');
      VueCookieNext.setCookie('lang', locale.value === 'km' ? 'km' : 'en'); // for serverSideRendering.

      // ----> check Local Auth && Cookie Auth <----
      check_auth_local_and_cookie();

      // -- auto check internet is online or offline in 3 second --
      setInterval(() => { check_online_or_offline(); }, 3000);

      // -- check if user login, must to check auth for refresh token --
      function_check('first');
      function_refresh_info();
      check_refresh_information_user(); // if user refresh page must to request check user info for update in localStorage
    }
  })
  
  watch(() => route.query, () => {

    // ----> check Local Auth && Cookie Auth <----
    check_auth_local_and_cookie();

    user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    // remove all modal if still show
    $('.modal-backdrop').remove();
    // check if user login, must to check auth for refresh token
    function_check('');
    function_refresh_info();

    let current_date = helper.Date_To_Timestamp('', '', ''); // timestamp current date
    // ----> check categories expired <----
    let categories = process.client ? ( localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : '' ) : '';
    if ( categories && current_date > categories.expiry ) { localStorage.removeItem('categories'); }
    // ----> check report_post expired <----
    let report_post = process.client ? ( localStorage.getItem("report_post") ? JSON.parse(localStorage.getItem("report_post")) : '' ) : '';
    if ( report_post && current_date > report_post.expiry ) { localStorage.removeItem('report_post'); }
    // ----> check delete_post expired <----
    let delete_post = process.client ? ( localStorage.getItem("delete_post") ? JSON.parse(localStorage.getItem("delete_post")) : '' ) : '';
    if ( delete_post && current_date > delete_post.expiry ) { localStorage.removeItem('delete_post'); }
    // ----> check locations expired <----
    let locations = process.client ? ( localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : '' ) : '';
    if ( locations && current_date > locations.expiry ) { localStorage.removeItem('locations'); }
    // ----> check slideShow expired <----
    let slideShow = process.client ? ( localStorage.getItem("slideShow") ? JSON.parse(localStorage.getItem("slideShow")) : '' ) : '';
    if ( slideShow && current_date > slideShow.expiry ) { localStorage.removeItem('slideShow'); }
  })

  
  watch(()=> route.name, ()=>{
    for(const val of check_r_captcha){
      if(helper.clear_prefix_route_name(route.name) === val){
        $('.grecaptcha-badge').css({'visibility':'unset'});
        break;
      }else{
        $('.grecaptcha-badge').css({'visibility':'hidden'});
      }
    }
  })

  function adjustViewport() {
      let viewportMetaTag = document.querySelector('meta[name="viewport"]');
      if (window.innerWidth > 768) {
        viewportMetaTag.setAttribute('content', `width=device-width, initial-scale=0`);
      } else {
          viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1');
      }
  }

  function adjustViewport1() {
      let viewportMetaTag = document.querySelector('meta[name="viewport"]');
      viewportMetaTag.setAttribute('content', `width=device-width, initial-scale=1`);
  }

        

  // ---- auto request user info OR renew token ----
  function function_check(check_the_first) {
    if (check_the_first) {  // only work when on created page (in refresh browser)
      check_renew_token();  // set reload first when start refresh page.
      timerID_.value = setInterval(() => { check_renew_token(); }, 4000); // 4 second.

    } else {
      if (user_data.value) {    // only work in watch page (route was change)
        if (!timerID_.value) {  // --> it the most spacial check, if doesn't check, it crate multiple request in the same time <--
          timerID_.value = setInterval(() => { check_renew_token(); }, 4000); // 4 second.
        }
      } else {
        clearInterval(timerID_.value);    timerID_.value = '';
      }
    }
  }
  // ---- request check renew token user ----
  function check_renew_token() {
    let current_date_add = helper.Date_To_Timestamp('', 120, 'seconds'); // timestamp add 2 minute ( 1 minute = 60 seconds )
    let auth_user = process.client ? (localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '') : '';
    if (auth_user) {
      // --- request only nearly expired token in 1 minute ---
      if (current_date_add > auth_user.timestamp) {
        // --- clear auto request when requesting token ---
        clearInterval(timerID_.value); timerID_.value = '';
        // --- get refresh token for request to get new token ---
        $fetch(app_config.VUE_APP_API_URL + 'auth/token', {
          headers: { "Refresh-Token": auth_user.tokens.refresh_token },
          params: { lang: locale.value === 'km' ? 'km' : 'en' },

        }).then(res => {
          var set_date_expired = helper.Date_To_Timestamp('', res.data.expires_in, 'seconds'); // convert to timestamp
          var object = {
            tokens: res.data,
            user: auth_user.user,
            timestamp: set_date_expired
          };
          localStorage.setItem("auth_user", JSON.stringify(object));
          // -- cookies --
          let user_cookies = helper.create_data_user_login(object);
          VueCookieNext.setCookie('auth_user', user_cookies);

          // --- set new request token when response success ---
          function_check('');

        }).catch(error => {
          let er = error.response && error.response.status ? error.response.status : '';
          // -- if response in 400 up must to clear and redirect out --
          if (er && (er >= 400 && er <= 403)) {
            clearInterval(timerID_.value); timerID_.value = '';     // clear auto request
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user')
            router.replace(localePath({name:'index'}));
            // -- retry request --
          } else if (er && (er >= 500 || er === 429)) {
            timerID_.value = setInterval(() => { check_renew_token(); }, 3000); // retry 3 second
          }
        });
      }
    } else {
      clearInterval(timerID_.value); timerID_.value = '';
    }
  }
  // ---- request check refresh user information ----
  function function_refresh_info() {
    if (user_data.value) {
      if (!renew_user_info.value) {
        renew_user_info.value = setInterval(() => { check_refresh_information_user(); }, 900000); // 15 minute = 900000
      }
    } else {
      clearInterval(renew_user_info.value);    renew_user_info.value = '';
    }
  }
  function check_refresh_information_user() {
    clearInterval(renew_user_info.value); renew_user_info.value = ''; // clear auto request if in requesting action

    let auth_user = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    if (auth_user) {
      //--- get refresh information user ---//
      $fetch(app_config.VUE_APP_API_URL + 'me', {
        headers: { "Access-Token": auth_user.tokens.access_token },
        params: { lang: locale.value === 'km' ? 'km' : 'en' },
      }).then((res) => {
        // console.log('Response is *****', res);
        let object = {
          tokens: auth_user.tokens,
          user: res.data,
          timestamp: auth_user.timestamp
        };
        localStorage.setItem("auth_user", JSON.stringify(object));
        let user_cookies = helper.create_data_user_login(object);
        VueCookieNext.setCookie('auth_user', user_cookies);

        function_refresh_info();

      }).catch((e) => {
        if (!e.response) {
          console.log('Error occurred' + e);
        } else if (e.response && e.response.status === 401) { // retry
          // console.log('error page index')
          if (reload_q_again_2.value < 2) {
            reload_q_again_2.value += 1;
            setTimeout(() => { check_refresh_information_user(); }, 3000);
          }
        }else{
          localStorage.removeItem('auth_user');   // remove localStorage
          VueCookieNext.removeCookie('auth_user')
          router.replace(localePath({name:'index'}));
        }
      });
    }
  }
  // ---- check is online or offline to show in UI ----
  function check_online_or_offline() {
    if (window.navigator.onLine) {
      check_connection.value = true;
      setTimeout(function () {
        $('html body .n_p_connection').addClass('d-none');
        $('html body #bottom_navigation').removeClass('bottom_nav_offline'); // make bottom navigation dynamic by online and offline
      }, 2000); // delay 2 second for show status online
    } else {
      check_connection.value = false;
      $('html body .n_p_connection').removeClass('d-none');
      $('html body #bottom_navigation').addClass('bottom_nav_offline'); // make bottom navigation dynamic by online and offline

      prevent_first.value = true; // prevent show online or offline status first when refresh page, wait this function do
    }
  }
  // ----> check Local Auth && Cookie Auth <----
  function check_auth_local_and_cookie() {
    // console.log('---- check auth cookie ----')
    let auth_localstorage = process.server ? '' : (localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '');
    const auth_cookie = VueCookieNext.isCookieAvailable('auth_user') ? VueCookieNext.getCookie('auth_user') : ''; // useCookie from nuxt3 document.
    // ---- if local auth empty && cookie auth exist ---
    if (auth_cookie && !auth_localstorage) {
      //--- get refresh information user ---//
      $fetch(app_config.VUE_APP_API_URL + 'me', {
        // signal: AbortSignal.timeout(app_config.DELAY_REQUEST),
        headers: { "Access-Token": auth_cookie.tokens.access_token },
        params: { lang: locale.value === 'km' ? 'km' : 'en' },
      }).then((res) => {
        let object = { tokens: auth_cookie.tokens, user: res.data, timestamp: auth_cookie.timestamp };
        localStorage.setItem("auth_user", JSON.stringify(object)); // this line not allow to add cookie.
        location.reload();

      }).catch((e) => {
        if (!e.response) {
          if (reload_q_again_1.value < 2) {
            reload_q_again_1.value += 1;
            setTimeout(() => { check_auth_local_and_cookie(); }, 3000);
          } else {
            VueCookieNext.removeCookie('auth_user');
            location.reload();
          }
        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_1.value < 2) {
            reload_q_again_1.value += 1;
            setTimeout(() => { check_auth_local_and_cookie(); }, 3000);
          } else {
            VueCookieNext.removeCookie('auth_user');
            location.reload();
          }
        }
      });
    }
    // ---- if local auth exist && cookie auth empty ---
    else if (!auth_cookie && auth_localstorage) {
      localStorage.removeItem("auth_user"); // this line not allow to remove cookie.
      router.replace(localePath({name:'index'}));
    }
  }
  // ---- check and click scroll to top of the screen in desktop view ----
  function scrollFunction() {
    let btn_scroll_up = document.getElementById("to_top");
    if (document.body.scrollTop > 2500 || document.documentElement.scrollTop > 1000) {
      btn_scroll_up.style.display = "inline";
    } else {
      btn_scroll_up.style.display = "none";
    }
  }
  function click_scroll_up() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  function screen_resize() {
    let w_zin = window.innerWidth;  // full screen width
    let w_container = 1200 + 150;   // default screen width
    let w = 0;
    if (w_zin <= w_container) {     // screen smaller than 1350px
      w = w_zin - 100;
    } else {                        // screen bigger then 1350px
      let w_minus = w_zin - 1200;
      let w_device = w_minus / 2;
      w = 1200 + w_device;
    }
    // console.log(w);
    // console.log(window.innerWidth);
    let btn_scroll_up = document.getElementById("to_top");
    btn_scroll_up.style.left = w+'px';
  }
</script>