
<template>
  <div>
    <!-- App Bar -->
    <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
      <div class="_div_nav bg_app_bar_header_">
        <div @click="goBack" class="_pad_col_icon">
          <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
            <i class="ion-android-arrow-back font_click_back"></i>
          </button>
        </div>
        <div class="col pl-0 l_h_con_title">
          <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('new_text.likes') }} </p>
        </div>
      </div>
    </div>
    

    <!-- Body -->
    <div class="mt_80 min_h max_width_form" :class="check_bg ? 'bg-no-result-noti borders' : ''">
      <div v-if="a_l_l_likes.length > 0 && !isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text.likes') }}</div>
      <div class="flex_all_post lists_post_content" :class="isMobile ? 'margin_below_app_bar mt-5' : ''" :id="a_l_l_likes.length > 0 ? 'height_div' : ''">
        <article v-for="(post, index) of a_l_l_likes" :key="index" class="col-12 no_padding">
          <div class="list_items_post">
            <div class="u_border_cart">
              <a rel="nofollow" href="javascript:void(0)" class="_flex_">

                <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                  <p class="m-0 font_11 text-white font_light_bold">
                    {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                  </p>
                  <p class="new_st_dis_text">OFF</p>
                </div>

                <div @click="go_detail_post(post.data.title, post.data.id,{ index: index })" class="u_img_post_save_like">
                  <img v-bind:src="post.data.thumbnail ? post.data.thumbnail : empty_img_post" :alt="post.data.title"
                      class="u_img_post_save_like bg_reload_img_white" @error="imageUrlAlt_post">
                </div>
                <div class="col u_p_col_" @click="go_detail_post(post.data.title, post.data.id,{ index: index })">
                  <p class="s_result_title_post line_height_1_3" v-text="post.data.title ? post.data.title : '...'"></p>

                  <p class="truncate_wrap m-0 font_10 c_m_grey mt-1 dt_locate">
                    {{ post.data.contact && post.data.contact.location ? (language === 'km' ? post.data.contact.location.km_name : post.data.contact.location.en_name) : '' }}
                  </p>

                  <div class="s_bot_pos">
                    <div v-if="post.data.shipping" class="u_have_shipping m-0 mb-1">
                      <i class="fas fa-truck p-1 font_10"></i>
                      <p class="m-0 status_pad_in_box font_10">{{ post.data.shipping.title }}</p>
                    </div>

                    <p v-if="post.data.price" class="col p-0 truncate m-0 font_16 c_m_grey width_100">
                      <strong class="color_red">
                        {{ post.data.price > 0 ? ( 1 > parseInt(post.data.price) ? '$'+post.data.price : '$'+convert_price(post.data.price)) : '' }}
                      </strong>
                      <span v-if="post.data.discount" class="pro_post_hour line_price"> ${{ convert_price(post.data.discount.original_price) }} </span>
                    </p>
                  </div>
                </div>
                <div v-on:click="heart_product(post.id,{ current_index: index })" class="cl_ripple lists-heart-style-save-like">
                  <i class="fa fa-heart parent_color font_icon text_light ver_icon"></i>
                </div>
              </a>
            </div>
          </div>
        </article>
        <div v-if="no_results" class="w-100 min_h p-3" :class="isMobile ? '' : 'bg-white'">
          <h1 class="fw-semibold fs-5 screen-d">{{ $t('new_text.likes') }}</h1>
          <div class="no_more_result mg_top_result">
            <img src="/icon/job-icon.png" alt="no-results.png" width="250px">
            <div class=" fw-semibold text-center text-black fn_20">Listings you Likes appear here </div>
            <div class="text-center fn_15 text-secondary px-3 pt-1">Find your favourites and start creating your own wish-list</div>
          </div>
        </div>
        <template v-if="!isDesktop">
          <ClientOnly>
            <VueEternalLoading :load="show_like" margin="800px">
              <template #loading>
                <!-- loading when have data -->
                <div v-if="a_l_l_likes.length > 0" class="text-center mt-4">
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
                          <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
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
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="a_l_l_likes.length > 0 ? '' : 'margin_below_app_bar'">
                  <div class="no_more_result p-2">
                    <div class="p_bg_status">
                      <span class="fas fa-wifi size_icon_status"></span>
                      <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
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
                <h1 v-if="!isMobile" class="fw-semibold fs-5">{{ $t('new_text.likes') }}</h1>
                <div class="no_more_result mg_top_result">
                  <!-- <i class="fa fa-exclamation-circle u_no_result_font"></i>
                  <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p> -->
                  <img src="/icon/job-icon.png" alt="no-results.png" width="250px">
                  <div class=" fw-semibold text-center text-black fn_20">Listings you Likes appear here </div>
                  <div class="text-center fn_15 text-secondary px-3 pt-1">Find your favourites and start creating your own wish-list</div>
                </div>
              </template>
            </VueEternalLoading>
          </ClientOnly>
        </template>
        <template v-else>
          <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
            <div v-if="a_l_l_likes.length > 0" class="text-center mt-4 mb-4">
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
                      <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
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
            <button v-if="l_hide_btn_load_more" @click="manually_show_like" class="btn">{{ $t('text_desktop.load_more') }}</button>
            <div v-else-if="a_l_l_likes.length === 0" class="no_more_result n-m-r-mg text-center width_100">
              <i class="fa fa-exclamation-circle u_no_result_font"></i>
              <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
            </div>
          </div>
        </template>
        </div>
    </div>
    <br><br><br>

    <!-- modal show confirm unlike -->
    <div class="modal class_modal_show_message" id="modal_confirm_unlike" tabindex="-1" role="dialog">
      <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
        <div class="modal-content max_width_form">
          <div class="modal-body break_word_ show_text_status p-3">
            <b> {{ $t('new_text.unlike') }} </b> <br>
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
  // import { VueCookieNext } from 'vue-cookie-next';
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

  const a_l_l_pageSize = useState('a_l_l_pageSize', () => 0);
  const a_l_l_likes = useState('a_l_l_likes', () => []);
  const loading_field = ref(false);

  // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
  // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
  const language = ref(helper.get_lang_cookie());
  const localePath = useLocalePath();
  const l_hide_btn_load_more = useState('l_hide_btn_load_more', () => true);
  const dt_loading = ref(false);

  const like_id = ref('');
  const user_data = ref('');
  // --- condition check request (if 401 three time clear auth user) ---
  const reload_q_again_1 = ref(0);
  const reload_q_again_2 = ref(0);
  // --- share tracking ---
  const current_index = ref('');

  // --- meta variable ---
  const meta_title_like = useState('meta_title_like', () => 'Liked Ads - Khmer24.com');

  const check_bg = ref(false)
  const no_results = ref(false)
  const isMobile= ref(helper.m_or_d())

  useHead({
    title: meta_title_like.value,
    meta: [
      // -- ios --
      // { name: 'apple-mobile-web-app-title', content: meta_title_like.value },
      // -- seo page --
      { name: 'keywords', content: 'Buy, Sell' },
      { name: 'description', content: 'Buy, Sell' },

      { property: 'og:title', content: meta_title_like.value },
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
    await show_like_server();
  }

  onMounted(() => {
    if (process.client) {
      check_new_auth_user();

      // --- check if click form account page, must to clear old data ---
      const pa_con = helper.get_params_make_condition(); // get data params condition.
      const p_clear = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params ? pa_con.clear_old_data.d_params : ''; // check clear_old_data from params.
      if (p_clear.clear_old_data) {
        a_l_l_pageSize.value = 0;
        a_l_l_likes.value = [];
      }

      // --- check auth exist or not ---
      if (helper.check_auth_user() === false) {
        router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
      }
      // --- ripple ---
      ripple();
      // --- remove class modal-open ---
      helper.remove_class_modal_open();

      if (isDesktop && a_l_l_likes.value.length === 0) {
        manually_show_like(); // In Desktop View and post empty for the first, must get new data.
      }
    }
  })

  onUnmounted(() => {
    helper.clear_params_make_con('clear_old_data');
  })

  // ---- request list in server ----
  async function show_like_server() {
    try {
      const token_auth = useCookie('auth_user')
      const tokens = token_auth && token_auth._value && token_auth._value.tokens ? token_auth._value.tokens.access_token : '';
      if (tokens) {
        const { data: res_like_post } = await useFetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
          headers: { "Access-Token": tokens },
          params: {
            offset: a_l_l_pageSize.value,
            lang: language.value,
            fields: 'photo,photos,thumbnails,thumbnail,renew_date,posted_date,link,contact,userid',
            functions: 'save,chat,like,apply_job,shipping',
          },
        })

        let r_p = res_like_post.value ? res_like_post.value : '';
        if (r_p) {
          a_l_l_pageSize.value += r_p.limit;
          if (r_p.data.length) {
            a_l_l_likes.value = a_l_l_likes.value.concat(r_p.data); // concat in multiple array
          }
        }
      }
    } catch (e) {
      console.log('------> Error List Liked <------');
      console.log(e);
    }
  }
  // ---- check new auth user ----
  function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
  // ---- search show user ----
  async function show_like({loaded, error, noMore, noResults}, { isFirstLoad }) {
    check_new_auth_user();

    $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        offset: a_l_l_pageSize.value,
        lang: language.value,
        fields: 'photo,photos,thumbnails,thumbnail,renew_date,posted_date,link,contact,userid',
        functions: 'save,chat,like,apply_job,shipping',
      },
    }).then(res => {

      a_l_l_pageSize.value += res.limit; // add offset
      if (res.data.length) {
        a_l_l_likes.value = a_l_l_likes.value.concat(res.data); // concat in multiple array
      }

      // -- tracking on google analytic --
      if (a_l_l_likes.value.length <= 10 && a_l_l_pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
      else { track_google_analytics(a_l_l_pageSize.value > 10 ? a_l_l_pageSize.value : 0); }

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
        if (a_l_l_likes.value.length === 0) {
          if (isFirstLoad) {
            noResults(); // console.log('noResult');
            check_bg.value = true
          } else {
            noMore(); // console.log('noMore 1');
          }
        } else {
          noMore(); // console.log('noMore 2');
        }
      } else {
        if (a_l_l_likes.value.length < a_l_l_pageSize.value) {
          noMore(); // console.log('noMore 3'); // close scroll.
        } else {
          loaded(); //  console.log('loaded'); // scroll down load more.
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
          router.replace(localePath({ name: 'index' }));
        }
      }
    });
  }
  // ---- manually like list ----
  function manually_show_like() {
    check_new_auth_user();
    dt_loading.value = true;

    $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        offset: a_l_l_pageSize.value,
        lang: language.value,
        fields: 'photo,photos,thumbnails,thumbnail,renew_date,posted_date,link,contact,userid',
        functions: 'save,chat,like,apply_job,shipping',
      },
    }).then(res => {
      a_l_l_pageSize.value += res.limit; // add offset
      if (res.data.length) {
        a_l_l_likes.value = a_l_l_likes.value.concat(res.data); // concat in multiple array
      }
      dt_loading.value = false;
      l_hide_btn_load_more.value = a_l_l_likes.value.length < a_l_l_pageSize.value ? false : true;

      // -- tracking on google analytic --
      if (a_l_l_likes.value.length <= 10 && a_l_l_pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
      else { track_google_analytics(a_l_l_pageSize.value > 10 ? a_l_l_pageSize.value : 0); }

    }).catch(e => {
      if (!e.response) {  } else if (e.response && e.response.status === 401) { // retry
        if (reload_q_again_1.value <= 2) {
          reload_q_again_1.value += 1;
          check_new_auth_user();
          setTimeout( () => { manually_show_like(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          router.replace(localePath({ name: 'index' }));
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
        page_title: meta_title_like.value,
        page_location: page_location,
        page_path: page_path,
      }
      // -- event on page --
      event('liked', data);
      // -- page_view --
      pageview(data);
    // },50);
  }
  // ---- click back one page ----
  function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
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
  function go_detail_post(title, id, data) {
    router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title), id: id } }));
    save_track_optional('tracking', { placement: 'like', display_type: 'list', item_count: a_l_l_likes.value.length, item_per_page: a_l_l_pageSize.value, current_index: data.index });
  }
  // ---- remove like from list like ----
  function heart_product(lk_id, data) {
    like_id.value = lk_id;

    // -- Var share tracking --
    current_index.value = data.current_index;
    // -- Var share tracking --

    $('#modal_confirm_unlike').modal('show');
  }
  function click_remove() {
    check_new_auth_user();
    if(window.navigator.onLine) {
      $('#modal_confirm_unlike').modal('hide'); // close dialog confirm remove
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL_LIKE_NEW + 'me/'+like_id.value, {
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        method: 'DELETE',
        headers: { "Access-Token": user_data.value.tokens.access_token },

      }).then(res => {
        // action, id, item_count, item_per_page, current_index, placement, display_type
        track_action_on_post('unlike', like_id.value, a_l_l_likes.value.length, a_l_l_pageSize.value, current_index.value, 'like', 'list');

        $.each(a_l_l_likes.value, (index, val) => {
          if (val.id === like_id.value) {
            a_l_l_likes.value.splice(index, 1);
            if(a_l_l_likes.value.length === 0){
              no_results.value = true
            }
            return false;
          }
        });

      }).catch(error => {
        if (!error.response) {
          if (reload_q_again_2.value < 2) {
            reload_q_again_2.value += 1;
            user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
            setTimeout( () => { click_remove(); }, 3000);
          } else {
            $('#modal_confirm_unlike').modal('hide'); // close dialog confirm remove
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
              setTimeout(() => { click_remove(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');   // remove localStorage
              router.replace(localePath({name: 'index'}));
            }
          } else if (check.status === 404) { // if 404 and data still in list must to clear out of array.
            $.each(a_l_l_likes.value, (index, val) => {
              if (val.id === like_id.value) {
                a_l_l_likes.value.splice(index, 1);
                return false;
              }
            });
          }
        }
      }).finally(() => (loading_field.value = false) );

    } else {
      $('#modal_confirm_unlike').modal('hide'); // close dialog confirm remove
      $('#modal_show_status_error_connection').modal('show');
    }
  }
  // ---- store all type params ----
  function save_track_optional(type, data_params) {
    helper.params_make_condition(type, data_params);
  }
  // ---- check image error 404 must to show static image ----
  function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
</script>


