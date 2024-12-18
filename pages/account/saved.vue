
<template>
  <div>
    <!-- App Bar -->
    <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
      <div>
        <div class="_div_nav bg_app_bar_header_ ">
          <div @click="goBack" class="_pad_col_icon">
            <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
              <i class="ion-android-arrow-back font_click_back"></i>
            </button>
          </div>
          <div class="col pl-0 l_h_con_title">
            <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('new_text.saved') }} </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="mt_80 min_h max_width_form" :class="check_bg ? 'bg-no-result-noti borders' : ''">
      <div v-if="a_s_l_saved.length > 0 && !isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text.saved') }}</div>
      <div class="flex_all_post lists_post_content " :class="isMobile ? 'margin_below_app_bar mt-5' : ''" :id=" a_s_l_saved.length > 0 ? 'height_div' : ''">

      <article v-for="(save, index) of a_s_l_saved" :key="index" class="col-12 no_padding">
        <!-- {{ save }} -->
        <div v-if="save.data.id" class="list_items_post">
          <div class="u_border_cart">
            <a rel="nofollow" href="javascript:void(0)" class="_flex_">

              <!-- discount on post only -->
              <template v-if="save.type === 'post'">
                <div v-if="save.data.discount" class="position_absolute type_buy new_st_discount">
                  <p class="m-0 font_11 text-white font_light_bold">
                    {{ save.data.discount.type === 'percent' ? parseInt(save.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(save.data.discount.discount)) }}
                  </p>
                  <p class="new_st_dis_text">OFF</p>
                </div>
              </template>

              <!-- post, user, store -->
              <div @click="go_detail_post(save, { index: index })" class="u_img_post_save_like">
                <img v-if="save.type === 'post'" v-bind:src="save.data.thumbnail ? save.data.thumbnail : empty_img_post" :alt="save.data.title" class="u_img_post_save_like bg_reload_img_white" @error="imageUrlAlt_post">
                <img v-if="save.type === 'store'" v-bind:src="save.data.logo ? save.data.logo.large.url : empty_img_post" :alt="save.data.title" class="u_img_post_save_like bg_reload_img_white" @error="imageUrlAlt_post">
                <img v-if="save.type === 'user'" v-bind:src="save.data.photo ? save.data.photo.large.url : empty_img_post" :alt="save.data.name" class="u_img_post_save_like bg_reload_img_white" @error="imageUrlAlt_post">
                <img v-if="save.type === 'resume'" v-bind:src="save.data.photo ? save.data.photo.large.url : empty_img_post" :alt="save.data.name" class="u_img_post_save_like bg_reload_img_white" @error="imageUrlAlt_post">
              </div>
              <div class="col u_p_col_" @click="go_detail_post(save, { index: index })">
                <p class="s_result_title_post line_height_1_3">
                  {{ save.type === 'post' ? save.data.title : (save.type === 'store' ? save.data.title : (save.type === 'resume' ? save.data.name : (save.type === 'user' ? save.data.name :  '...'))) }}
                </p>
                <p class="truncate_wrap m-0 font_10 c_m_grey mt-1 dt_locate">
                  {{
                    save.type === 'post' ? (save.data.contact && save.data.contact.location ? (language === 'km' ? save.data.contact.location.km_name : save.data.contact.location.en_name) : '') :
                    (save.type === 'store' ? '@'+save.data.username : (save.type === 'resume' ? save.data.position : (save.type === 'user' ? '@'+save.data.username : '')))
                  }}
                </p>
                <p v-if="save.type !== 'resume'" class="truncate_wrap m-0 font_11 mt-1 m-0"> 
                  <!-- (language === 'km' ? 'បទពិសោធន៍ '+save.data.work_experience+ ' ឆ្នាំ' :  save.data.work_experience+ ' years experience')  -->
                  {{ save.type === 'store' ? $t('new_text_1.store') : (save.type === 'user' ? $t('message.profile') : '') }}
                  
                </p>
                <div v-if="save.type === 'resume'" class="truncate_wrap m-0 font_11 mt-1 m-0">
                  <p  v-if="save.data.work_experience">{{ (language === 'km' ? 'បទពិសោធន៍ '+save.data.work_experience+ ' ឆ្នាំ' :  save.data.work_experience+ ' years experience') }}</p>
                  <p v-else></p>
                </div>
                <!-- style="font-size: 13px; font-weight: bold;" -->
                <p class="fn_13 fw-bold">{{ save.type === 'resume' ? 'ប្រវត្ដិរូបសង្ខេប (CV)' : '' }}</p>
                <div class="s_bot_pos">
                  <div v-if="save.data.shipping" class="u_have_shipping m-0 mb-1">
                    <i class="fas fa-truck p-1 font_10"></i>
                    <p class="m-0 status_pad_in_box font_10">{{ save.data.shipping.title }}</p>
                  </div>
                  
                  <p v-if="save.data.price" class="col p-0 truncate m-0 font_16 c_m_grey width_100">
                    <strong class="color_red">
                      {{ save.data.price > 0 ? ( 1 > parseInt(save.data.price) ? '$'+save.data.price : '$'+convert_price(save.data.price)) : '' }}
                    </strong>
                    <span v-if="save.data.discount" class="pro_post_hour line_price"> ${{ convert_price(save.data.discount.original_price) }} </span>
                  </p>
                </div>
              </div>
              <div v-on:click="heart_product(save.id, { current_index: index })" class="cl_ripple lists-heart-style-save-like">
                <i class="fa fa-bookmark parent_color font_icon text_light ver_icon"></i>
              </div>
            </a>
          </div>
        </div>

        <!-- show empty save when post is remove -->
        <div v-else class="list_items_post">
          <div class="u_border_cart">
            <a rel="nofollow" href="javascript:void(0)" class="_flex_">
              <div class="u_img_post_save_like">
                <img v-bind:src="empty_img_post" alt="empty" class="u_img_post_save_like bg_reload_img_white">
              </div>
              <div class="col u_p_col_">
                <p class="s_result_title_post line_height_1_3 text-danger mt-2">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ $t('new_text_2.sta_remove_post') }}
                </p>
              </div>
              <div v-on:click="heart_product(save.id, { current_index: index })" class="cl_ripple lists-heart-style-save-like">
                <i class="fa fa-bookmark parent_color font_icon text_light ver_icon"></i>
              </div>
            </a>
          </div>
        </div>
      </article>

      <div v-if="no_results" class="w-100 min_h p-3" :class="isMobile ? '' : 'bg-white'">
        <h1 v-if="!isMobile" class="fw-semibold fs-5">{{ $t('new_text.saved') }}</h1>
        <div class="no_more_result mg_top_result">
          <img src="/icon/job-icon.png" alt="no-results.png" width="250px">
          <div class=" fw-semibold text-center text-black fn_20">Listings you saved appear here </div>
          <div class="text-center fn_15 text-secondary px-3 pt-1">Find your favourites and start creating your own wish-list</div>
        </div>
      </div>

      <template v-if="!isDesktop">
        <ClientOnly>
          <VueEternalLoading :load="show_save" margin="800px">
            <template #loading>
              <!-- loading when have data -->
              <div v-if="a_s_l_saved.length > 0" class="text-center mt-4">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
              </div>
              <!-- loading when data empty -->
              <div v-else class="full_width m_t_50">
                <div v-for="s in 4" :key="s" class="col-12 no_padding">
                  <div class="f-w-pad">
                    <div class="my_card pad_card_ _flex_">
                      <div class="animated-background">
                        <div class="f-w-width"></div>
                      </div>
                      <div class="width_100 pb-0 pt-1 pl-3">
                        <div class="animated-background mb-2 text_hei_loading_title"></div>
                        <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                        <div class="_flex_">
                          <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                          <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                        </div>
                        <div class="animated-background mb-2 text_hei_loading"></div>
                        <div class="animated-background text_hei_loading"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #error="{ retry }">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="a_s_l_saved.length > 0 ? '' : 'margin_below_app_bar'">
                <div class="no_more_result p-2">
                  <div class="p_bg_status">
                    <span class="fas fa-wifi size_icon_status"></span>
                    <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                    <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                    <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                  </div>
                </div>
              </div>
            </template>
            <template #no-more>
              <div class="no_more_result"></div>
            </template>
            <template #no-results>
              <h1 v-if="!isMobile" class="fw-semibold fs-5">{{ $t('new_text.saved') }}</h1>
              <div class="no_more_result mg_top_result">
                <!-- <i class="fa fa-exclamation-circle u_no_result_font"></i>
                <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p> -->
                <img src="/icon/job-icon.png" alt="no-results.png" width="250px">
                <div class=" fw-semibold text-center text-black fn_20">Listings you saved appear here </div>
                <div class="text-center fn_15 text-secondary px-3 pt-1">Find your favourites and start creating your own wish-list</div>
              </div>
            </template>
          </VueEternalLoading>
        </ClientOnly>
      </template>
      <template v-else>
        <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
          <div v-if="a_s_l_saved.length > 0" class="text-center mt-4 mb-4">
            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
          </div>
          <div v-else class="full_width">
            <div v-for="s in 4" :key="s" class="col-12 no_padding">
              <div class="f-w-pad">
                <div class="my_card pad_card_ _flex_">
                  <div class="animated-background">
                    <div class="f-w-width"></div>
                  </div>
                  <div class="width_100 pb-0 pt-1 pl-3">
                    <div class="animated-background mb-2 text_hei_loading_title"></div>
                    <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                    <div class="_flex_">
                      <div class="col-5 animated-background mb-2 mr-1 p-0 text_hei_loading"></div>
                      <div class="col-5 animated-background mb-2 ml-1 p-0 text_hei_loading"></div>
                    </div>
                    <div class="animated-background mb-2 text_hei_loading"></div>
                    <div class="animated-background text_hei_loading"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="des_btn_load_more width_100">
          <button v-if="s_hide_btn_load_more" @click="manually_show_save" class="btn">{{ $t('text_desktop.load_more') }}</button>
          <div v-else-if="a_s_l_saved.length === 0" class="no_more_result n-m-r-mg text-center width_100">
            <i class="fa fa-exclamation-circle u_no_result_font"></i>
            <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
          </div>
        </div>
      </template>
      </div>
    </div>
    <br><br><br>

    <!-- modal show confirm unsaved -->
    <div class="modal class_modal_show_message" id="modal_confirm_unsaved" tabindex="-1" role="dialog">
      <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
        <div class="modal-content max_width_form">
          <div class="modal-body break_word_ show_text_status p-3">
            <b> {{ $t('new_text.unsaved') }} </b> <br>
          </div>
          <div class="modal-footer u_safety_footer">
            <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
            <button type="button" @click="click_remove" class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal show error connection -->
    <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
      <div class="modal-dialog modal_dialog_style mg-mo-auto" role="document" >
        <div class="modal-content max_width_form">
          <div class="modal-body break_word_ show_text_status b-s-h-con">
            <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
            <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
          </div>
          <div class="modal-footer u_safety_footer">
            <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal show error connection -->

    <!-- show loading full screen -->
    <div v-if="loading_field" class="loading_back_ground">
      <div class="loading_img">
        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
      </div>
    </div>
  </div>
</template>

<script setup>
  import { event, pageview } from 'vue-gtag';
  import helper from "/helper";
  const isDesktop = helper.check_is_desktop(); // check userAgent
  definePageMeta( { layout: "custom", middleware: "auth" } ); // use layout dont have bottom nav bar check auth.
  const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
  const route = useRoute();
  const router = useRouter();
  const version_library = config.LIBRARY_VERSION;
  const asset_url = '/'; // config.VUE_APP_BASE_URL;
  const empty_img_post = ref("/icon/empty_post.png");

  const a_s_l_pageSize = useState('a_s_l_pageSize', () => 0);
  const a_s_l_saved = useState('a_s_l_saved', () => []);
  const loading_field = ref(false);

  // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
  // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
  const language = ref(helper.get_lang_cookie());
  const localePath = useLocalePath();
  const s_hide_btn_load_more = useState('s_hide_btn_load_more', () => true);
  const dt_loading = ref(false);

  const saved_id = ref('');
  const user_data = ref('');
  // --- condition check request (if 401 three time clear auth user) ---
  const reload_q_again_1 = ref(0);
  const reload_q_again_2 = ref(0);
  // --- share tracking ---
  const current_index = ref('');

  // --- meta variable ---
  const meta_title_saved = useState('meta_title_saved', () => 'Saved Ads - Khmer24.com');

  const check_bg = ref(false)
  const no_results = ref(false)
  const isMobile= ref(helper.m_or_d())

  useHead({
    title: meta_title_saved.value,
    meta: [
      // -- ios --
      // { name: 'apple-mobile-web-app-title', content: meta_title_saved.value },
      // -- seo page --
      { name: 'keywords', content: 'Buy, Sell' },
      { name: 'description', content: 'Buy, Sell' },

      { property: 'og:title', content: meta_title_saved.value },
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

  if (process.server) {
    await show_save_server();
    
  }

  onMounted(() => {
    if (process.client) {
      // show_save_server();
      check_new_auth_user();

      // --- check if click form account page, must to clear old data ---
      const pa_con = helper.get_params_make_condition(); // get data params condition.
      const p_clear = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params ? pa_con.clear_old_data.d_params : ''; // check clear_old_data from params.
      if (p_clear.clear_old_data) {
        a_s_l_pageSize.value = 0;
        a_s_l_saved.value = [];
      }

      // --- check auth exist or not ---
      if (helper.check_auth_user() === false) {
        router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
      }
      // --- ripple ---
      ripple();
      // --- remove class modal-open ---
      helper.remove_class_modal_open();

      if (isDesktop && a_s_l_saved.value.length === 0) {
        manually_show_save();
      }
    }
  })

  // onUnmounted(() => {
  //   helper.clear_params_make_con('clear_old_data');
  // })

  // ---- request list in server ----
  async function show_save_server() {
    try {
      const token_auth = useCookie('auth_user')
      const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
      if (tokens) {
        const {data: res_save_post} = await useFetch(config.VUE_APP_API_URL + 'me/saved', {
          headers: {"Access-Token": tokens},
          params: {
            offset: a_s_l_pageSize.value,
            lang: language.value,
            type: 'post,store,user',
            fields: 'photo,photos,thumbnails,thumbnail,renew_date,posted_date,link,contact,userid',
          },
        })
        // console.log('server',res_save_post.value)
        let d_s = res_save_post.value ? res_save_post.value : '';
        if (d_s) {
          a_s_l_pageSize.value += d_s.limit;
          if (d_s.data.length) {
            a_s_l_saved.value = a_s_l_saved.value.concat(d_s.data); // concat in multiple array
          }
        }
      }
    } catch (e) {
      console.log('-----> Error Saved List <------')
      console.log(e)
    }
  }
  

  // ---- check new auth user ----
  function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
  // ---- search show user ----
  async function show_save({loaded, error, noMore, noResults}, { isFirstLoad }) {
    check_new_auth_user();

    $fetch(config.VUE_APP_API_URL + 'me/saved', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        offset: a_s_l_pageSize.value,
        lang: language.value,
        type: 'post,store,user,resume',
        fields: 'photo,photos,thumbnails,thumbnail,renew_date,posted_date,link,contact,userid',
      },
    }).then(res => {
      // console.log('load',res)
      a_s_l_pageSize.value += res.limit;
      if (res.data.length) {
        a_s_l_saved.value = a_s_l_saved.value.concat(res.data); // concat in multiple array
      }

      // -- tracking on google analytic --
      if (a_s_l_saved.value.length <= 10 && a_s_l_pageSize.value === 20) {  } // prevent saved post smaller than 10 and request two time
      else { track_google_analytics(a_s_l_pageSize.value > 10 ? a_s_l_pageSize.value : 0); }

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
        if (a_s_l_saved.value.length === 0) {
          if (isFirstLoad) {
            noResults(); // console.log('noResult');
            check_bg.value = true
          } else {
            noMore(); // console.log('noMore');
          }
        } else {
          noMore();
        }
      } else {
        if (a_s_l_saved.value.length < a_s_l_pageSize.value) {
          noMore(); // close scroll.
        } else {
          loaded(); // scroll down load more.
        }
      }

    }).catch(e => {
      if (!e.response) {
        error();
      } else if (e.response && e.response.status === 401) { // retry
        if (reload_q_again_1.value <= 2) {
          reload_q_again_1.value += 1;
          check_new_auth_user();
          setTimeout( () => { loaded(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          router.replace(localePath({name: 'index'}));
        }
      }
    });
  }
  // ---- manually get save list ----
  function manually_show_save() {
    check_new_auth_user();
    dt_loading.value = true;

    $fetch(config.VUE_APP_API_URL + 'me/saved', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        offset: a_s_l_pageSize.value,
        lang: language.value,
        type: 'post,store,user',
        fields: 'photo,photos,thumbnails,thumbnail,renew_date,posted_date,link,contact,userid',
      },
    }).then(res => {
      // console.log('manu',res)
      a_s_l_pageSize.value += res.limit;
      if (res.data.length) {
        a_s_l_saved.value = a_s_l_saved.value.concat(res.data); // concat in multiple array
      }
      dt_loading.value = false;
      s_hide_btn_load_more.value = a_s_l_saved.value.length < a_s_l_pageSize.value ? false : true;

      // -- tracking on google analytic --
      if (a_s_l_saved.value.length <= 10 && a_s_l_pageSize.value === 20) {  } // prevent saved post smaller than 10 and request two time
      else { track_google_analytics(a_s_l_pageSize.value > 10 ? a_s_l_pageSize.value : 0); }

    }).catch(e => {
      if (!e.response) {

      } else if (e.response && e.response.status === 401) { // retry
        if (reload_q_again_1.value <= 2) {
          reload_q_again_1.value += 1;
          check_new_auth_user();
          setTimeout( () => { manually_show_save(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          router.replace(localePath({name: 'index'}));
        }
      }
      dt_loading.value = false;
    });
  }

  // ---- track on google analytic ----
  function track_google_analytics (per_page) {
    // setTimeout(() => {
      let offset = per_page > 0 ? '?offset='+per_page : ''; // set offset of page if scroll get more data
      let page_path = route.path+offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
      let page_location = window.location.href+offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
      let data = {
        page_title: meta_title_saved.value,
        page_location: page_location,
        page_path: page_path,
      }
      // -- event on page --
      event('saved', data);
      // -- page_view --
      pageview(data);
    // },50);
  }
  // ---- click back one page ----
  function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'})); }
  // ---- ripple effect on UI ----
  function ripple() { setTimeout(function () { $(".arrow_back_nav,.cl_ripple").ripple(); }, 300); }
  // ---- convert price ----
  function convert_price(price) { return helper.convert_price(price); }
  // ---- tracking action on post ----
  function track_action_on_post(action, id, item_count, item_per_page, current_index, placement, display_type) {
    helper.tracking_action('post', { id: id, item_count: item_count, item_per_page: item_per_page, current_index: current_index },
            action, placement, display_type, '');
  }
  // ---- detail product ----
  const All_P_Resume = useState('All_P_Resume',()=>'')
  const image_resume = useCookie('image_resume')
  function go_detail_post(detail, data) { // title, id
    if (detail.type === 'post') {
      router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(detail.data.title), id: detail.data.id } }));
      save_track_optional('tracking', { placement: 'save', display_type: 'list', item_count: a_s_l_saved.value.length, item_per_page: a_s_l_pageSize.value, current_index: data.index })

    } else if (detail.type === 'store') {
      router.push(localePath({ name: 'username', params: { username: detail.data.username } }));
      save_tracking_user({ placement: 'save' }, { clear: 'clr_old_data' });

    } else if (detail.type === 'user') {
      router.push(localePath({ name: 'username', params: { username: detail.data.username } }));
      save_tracking_user({ placement: 'save' }, { clear: 'clr_old_data' });
    }
    else if (detail.type === 'resume') {
      All_P_Resume.value = detail.data.id
      image_resume.value = detail.data.photo ? detail.data.photo: ''
      // console.log(image_resume.value)
      // router.push(localePath({ name: 'resumes' })+'/#'+detail.data.name);
      router.push(localePath({ name: 'resumes' })+'/'+check_title_char(detail.data.name)+'-cvid-'+detail.data.id);
      save_tracking_user({ placement: 'save' }, { clear: 'clr_old_data' });
    }
  }
  // ---- remove like from list like ----
  function heart_product(s_id, data) {
    saved_id.value = s_id;
    // -- Var share tracking --
    current_index.value = data.current_index;
    // -- Var share tracking --

    $('#modal_confirm_unsaved').modal('show');
  }
  function click_remove() {
    check_new_auth_user();
    if(window.navigator.onLine) {
      $('#modal_confirm_unsaved').modal('hide'); // close dialog confirm remove
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL + 'me/saved/'+saved_id.value, {
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        method: 'DELETE',
        headers: { "Access-Token": user_data.value.tokens.access_token },

      }).then(res => {
        // action, id, item_count, item_per_page, current_index, placement, display_type
        track_action_on_post('unsave', saved_id.value, a_s_l_saved.value.length, a_s_l_pageSize.value, current_index.value, 'save', 'list');

        $.each(a_s_l_saved.value, (index, val) => {
          if (val.id === saved_id.value) {
            a_s_l_saved.value.splice(index, 1);
            if(a_s_l_saved.value.length === 0){
              no_results.value = true
            }
            return false;
          }
        });
        
        // $('#_flex_'+saved_id.value).remove(); // remove if unlike that post
      }).catch(error => {
        if (!error.response) {
          if (reload_q_again_2.value < 2) {
            reload_q_again_2.value += 1;
            user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
            setTimeout( () => { click_remove(); }, 3000);
          } else {
            $('#modal_confirm_unsaved').modal('hide'); // close dialog confirm remove
            $('#modal_show_status_error_connection').modal('show');
          }

        } else {
          let check = error.response;
          let data_check = JSON.stringify(check);
          let data_parse = JSON.parse(data_check);

          if (check.status === 401) { // retry
            if (reload_q_again_2.value <= 2) {
              reload_q_again_2.value += 1;
              user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
              setTimeout(() => {
                click_remove();
              }, 3000);
            } else {
              localStorage.removeItem('auth_user');   // remove localStorage
              router.replace(localePath({name: 'index'}));
            }
          } else if (check.status === 404) { // if 404 and data still in list must to clear out of array.
            $.each(a_s_l_saved.value, (index, val) => {
              if (val.id === saved_id.value) {
                a_s_l_saved.value.splice(index, 1);
                return false;
              }
            });
          }
        }
      }).finally(() => (loading_field.value = false) );

    } else {
      $('#modal_confirm_unsaved').modal('hide'); // close dialog confirm remove
      $('#modal_show_status_error_connection').modal('show');
    }
  }
  // ---- user tracking ----
  function save_tracking_user(user_track, clear_old) {
    helper.params_make_condition('tracking', user_track);
    helper.params_make_condition('clear', clear_old);
  }
  // ---- store all type params ----
  function save_track_optional(type, data_params) {
    helper.params_make_condition(type, data_params);
  }
  // ---- check image error 404 must to show static image ----
  function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
  function check_title_char(name) { return helper.check_special_char(name); }
</script>


