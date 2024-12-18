
<template>
  <div>
    <div v-if="!isDesktop" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
      <div class="_div_nav bg_app_bar_header_">
        <div @click="goBack" class="_pad_col_icon">
          <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
            <i class="ion-android-arrow-back font_click_back"></i>
          </button>
        </div>
        <div class="col l_h_con_title">
          <p class="name_style truncate_wrap m-0 text-center">
            {{ detail && detail.title ? detail.title : '' }}
          </p>
        </div>
        <div class="s_w_app_icon"></div>
      </div>
    </div>

    <div v-if="connection_error" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding margin_below_app_bar">
      <div class="no_more_result p-2">
        <div class="p_bg_status">
          <span class="fas fa-wifi size_icon_status"></span>
          <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
          <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
          <button @click="retry()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
        </div>
      </div>
    </div>
    <template v-else>
      <!-- show image grid -->
      <div v-if="detail && detail.photos && detail.photos.length > 0" :class="isDesktop ? 'des_container mt-3' : ''"
           class="s_slide_list_photo_1 max-w-on-list-photos">

        <a rel="nofollow" aria-label="Photos" v-for="(photo, index) in detail.thumbnails" :key="index" :href="photo"
           data-fancybox="gallery" :data-src="detail.photos[index]">
          <!--<img :src="photo" class="s_image_list_1" :alt="detail && detail.title ? detail.title : ''">-->
          <img :data-src="photo"
               :alt="detail && detail.title ? detail.title : ''"
               class="lazy s_image_list_1"
               :src="empty_img_loading" />
        </a>

      </div>

      <div v-if="not_found" class="not_found_parent">
        <div class="not_found_child">
          <i class="fas fa-exclamation-triangle text_grey mg_i not_found_icon"></i>
          <p class="font_22">{{ $t('new_text.post_note_found') }}</p>
        </div>
      </div>

      <div v-if="loading" class="loading_back_ground">
        <div class="loading_img">
          <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  import helper from "/helper";
  import { VueCookieNext } from 'vue-cookie-next';
  definePageMeta( {layout: "custom"} );
  const runtime_config = useRuntimeConfig();            // setup config env to config variable.
  const config = runtime_config.public;
  const route = useRoute();
  const router = useRouter();
  const localePath = useLocalePath();
  const isDesktop = helper.check_is_desktop(); // check userAgent
  const empty_img_loading = ref('/icon/img-loader.gif');

  const loading = ref(false);
  const detail = ref('');
  const asset_url = '/'; // config.VUE_APP_BASE_URL;
  const version_library = config.LIBRARY_VERSION;
  const user_data = ref('');
  // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
  // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
  const language = ref(helper.get_lang_cookie());
  const connection_error = ref(false);
  const not_found = ref(false);
  const pa_con = helper.get_params_make_condition(); // get data params condition.

  // --- condition check request (if 401 three time clear auth user) ---
  const reload_q_again_1 = ref(0);

  // --- store old name ---
  const this_page = ref(0);


  if (process.server) {
      await get_detail_product();
  }

  const meta_title_photos = useState('meta_title_photos', () => 'Post Photos - Khmer24.com');

  useHead({
    title: meta_title_photos.value,
    meta: [
      // -- ios --
      // { name: 'apple-mobile-web-app-title', content: meta_title_photos.value },
      // -- seo page --
      { name: 'keywords', content: 'Buy, Sell' },
      { name: 'description', content: 'Buy, Sell' },

      { property: 'og:title', content: 'khmer24.com, Buy and Sell Everything In Cambodia' },
      { property: 'fb:app_id', content: '217361691621555' },
      { property: 'og:site_name', content: 'www.khmer24.com' },
      { property: 'og:url', content: 'https://www.khmer24.com/en/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg' },
      { property: 'og:image:width', content: '600' },
      { property: 'og:image:height', content: '600' },
      { property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.' },
    ]
  })

  onMounted(() => {
    if (process.client) {
      user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';

      // --- tracking on photo detail post ---
      if (pa_con && pa_con.text_title && pa_con.text_title.d_params && pa_con.text_title.d_params.text_title) {
        helper.tracking_action('view_photo', { id: route.params.id, track_contact: 'detail_post' }, 'view_photo', 'detail', '', '');
        // console.log(pa_con.text_title.d_params.data_detail);
      }

      check_cache(); // get detail post

      setTimeout(() => {
        helper.clear_params_make_con('text_title'); // remove local params condition
      },1500);

      // --- Fancybox without hash (not push state history browser) ---
      Fancybox.defaults.Hash = false;
    }
  })
  onBeforeUnmount(() => {
    // console.log('if page destroy, must to close fancyBox');
    Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
    // Fancybox.next();
  })

  function retry() {
    if (window.navigator.onLine) {  // connection online
      connection_error.value = false;
      check_cache();
    } else {                        // error connection
      loading.value = false;
      connection_error.value = true;
    }
  }
  function check_cache() {
    // -- click from detail (not request new data) --
    if (pa_con && pa_con.text_title && pa_con.text_title.d_params && pa_con.text_title.d_params.data_detail) {
      detail.value = JSON.parse(pa_con.text_title.d_params.data_detail);
      reload_lazy_img(); // load lazy image.

    // -- if user refresh page must get new data --
    } else {
      get_detail_product();
    }
  }
  // ---- detail product ----
  async function get_detail_product() {
    loading.value = true;

    try {
      const token_auth = useCookie('auth_user');
      const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';

      const URL_KEY = config.VUE_APP_API_URL + 'posts/' + route.params.id;
      const { data: res_de_post } = await useFetch(URL_KEY, {
        key: URL_KEY,
        headers: { "Access-Token": tokens }, // if user login add access token
        params: {
          lang: language.value ? language.value : 'en',
          fields: 'thumbnails,photos',
        },
      })

      detail.value = res_de_post.value.data;
      loading.value = false;
      reload_lazy_img(); // load lazy image.

    } catch (error) {
      if (!error.response) { // display connection error
        if (reload_q_again_1.value < 2) {
          reload_q_again_1.value += 1;
          setTimeout(() => { get_detail_product(); }, 3000);
        } else {
          connection_error.value = true;
        }

      } else if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_1.value <= 2) {
          reload_q_again_1.value += 1;
          setTimeout(() => { get_detail_product(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }

      } else if (error.response && error.response.status === 404) { // show status error response from API
        not_found.value = true;
      }
    }
  }
  function goBack() {
    // -- check if still in the same page when click back. redirect auto to home page --
    if (window.history.length >= 2) {
      router.go(-1); // go back

      // if user go back but still in this page. must go to homepage.
      if (this_page.value < 1) {
        this_page.value = 1;
      } else {
        router.push(localePath({ name: 'index' }));
      }

    } else {
      router.push(localePath({ name: 'index' }));
    }
  }

  // ---- reload lazy load ----
  function reload_lazy_img() {
    setTimeout(() => {
      $('img.lazy').Lazy({delay:10000, combined:true});
    },750);
  }
</script>
