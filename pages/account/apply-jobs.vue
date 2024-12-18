
<template>
  <div>
    <div :class="isDesktop ? 'des_container dt_ap_jobs' : 'max_width_form'">
      <!-- App Bar -->
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isMobile ? 'fix_app_bar' : 'dt_fix_app_bar'">
          <div v-if="isMobile" class="_div_nav bg_app_bar_header_ ">
            <div @click="goBack" class="_pad_col_icon">
              <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                <i class="ion-android-arrow-back font_click_back"></i>
              </button>
            </div>
            <div class="col pl-0 l_h_con_title">
              <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('new_text.a_p') }} </p>
            </div>
          </div>
        <div>
          <nav v-if="a_ap_applied_jobs.length > 0" class=" dt-mt-top max_width_form px-3" :class="a_ap_applied_jobs.length === 0 ? 'p-2' : 'apply_job_filter'">
            <div class="col _flex_ align-items-center ">
              <div class="d-flex">
                <a rel="nofollow" v-if="isMobile" @click="mo_option" class="_flex_ cur_sur">
                  <span class="d-flex fn_15 px-2" >
                    <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                </a>
                <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur">
                  <span class="dropdown-toggle d-flex fn_15" data-bs-toggle="dropdown" aria-expanded="false">
                    <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                  <div v-if="!isMobile">
                    <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                      <div v-if="search_option" class="modal-body de-content-modal-option">
                        <ul class="list-unstyled bg-white mb-0">
                          <li v-for="option in search_option" :key="option" class="full_field_tag cur_sur w-100 d-flex p-2" @click="click_search_options(option.value)">
                            {{ language === 'km' ? option.title_km : option.title_en }}
                            <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color ms-auto"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
                <a rel="nofollow" v-if="isMobile" @click="mo_sort" class="_flex_ cur_sur ml-3" >
                  <span class=" d-flex fn_15 px-2" >
                    <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                </a>
                <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur ml-3" >
                  <span class="dropdown-toggle d-flex fn_15 " data-bs-toggle="dropdown" aria-expanded="false">
                    <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                  <div v-if="!isMobile">
                    <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                      <div v-if="search_sort" class="modal-body de-content-modal-option p-0">
                        <ul class="list-unstyled bg-white mb-0">
                          <li v-for="option in search_sort" :key="option" class="full_field_tag cur_sur w-100 d-flex p-2" @click="click_search_sort(option.value)">
                            {{ language === 'km' ? option.title_km : option.title_en }}
                            <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color ms-auto"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div v-if="!isMobile" class="fw-semibold ms-auto">{{ $t('new_text.a_p') }}</div>
            </div>
          </nav>
        </div>
      </div>

      <!-- Body -->
      <div :class="check_bg ? (isMobile ? '' : 'min_h mt_80 bg-white p-3 borders') : ' min_h dt-mt-120'">
        <div class="flex_all_post lists_post_content " :class="isMobile ? ( a_ap_applied_jobs.length > 0 ? 'margin_below_app_bar_4'  : '') : (a_ap_applied_jobs.length > 0  ? 'dt-mt-120' : '' )" :id="a_ap_applied_jobs.length > 0 ? 'height_div' : ''">
          <article v-for="(a_j, index) of a_ap_applied_jobs" :key="index" class="col-12 no_padding">
            <div class="list_items_post">
              <div class="u_border_cart">
                <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: a_j.post.title ? check_title_char(a_j.post.title) : '.', id: a_j.post.id } })" class="_flex_ cart_apply_job">
                  <div class="a_j_img">
                    <img v-bind:src="a_j.post && a_j.post.logo ? a_j.post.logo : empty_img_post"
                        :alt="a_j.post && a_j.post.title ? a_j.post.title : ''" class="bg_reload_img_white" @error="imageUrlAlt_post">
                  </div>
                  <div class="col a_j_content">
                    <p class="p_title_1">{{ a_j.post && a_j.post.title ? a_j.post.title : '' }}</p>
                    <p class="truncate_wrap p_title_2">{{ a_j.post && a_j.post.type ? a_j.post.type : '' }}</p>
                    <p class="truncate_wrap p_title_3">{{ a_j.apply_date ? convertFromNow(a_j.apply_date) : '' }}</p>
                    <p v-if="a_j.status.value === 'viewed'" class="p_title_4 apply-job-viewed">{{ a_j.status.title }}</p>
                    <p v-else-if="a_j.status.value === 'pending'" class="p_title_4 apply-job-pending">{{ a_j.status.title }}</p>
                    <p v-else-if="a_j.status.value === 'hired'" class="p_title_4 apply-job-hired">{{ a_j.status.title }}</p>
                    <p v-else-if="a_j.status.value === 'rejected'" class="p_title_4 apply-job-rejected">{{ a_j.status.title }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </article>

          <template v-if="!isDesktop">
            <ClientOnly>
              <VueEternalLoading :load="show_apply_jobs" v-model:is-initial="isInitial" margin="800px">
                <template #loading>
                  <div style="width: 100%;padding: 0;">
                    <!-- loading when have data -->
                    <div v-if="a_ap_applied_jobs.length > 0" class="text-center mt-4">
                      <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                    </div>
                    <!-- loading when data empty -->
                    <div v-else class="full_width ">
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
                </template>
                <template #error="{ retry }">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="a_ap_applied_jobs.length > 0 ? '' : 'margin_below_app_bar'">
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
                  <!-- <h1 class="ms-3 fw-semibold fs-5 screen-d">Apply Jobs</h1> -->
                  <div v-if="!isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text.a_p') }}</div>
                  <nav class="m-bg-py" :class="isMobile ? 'mt-5' : ''">
                    <div class="d-flex">
                      <a rel="nofollow" v-if="isMobile" @click="mo_option" class="_flex_ cur_sur">
                        <span class="d-flex px-2" :class="$device.isMobile ? 'fn_15' : 'fn_13'">
                          <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                          <i class="ion-android-arrow-dropdown ms-1"></i>
                        </span>
                      </a>
                      <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur">
                        <span class="dropdown-toggle d-flex fn_13 bg-white px-2 p_y_2 border" data-bs-toggle="dropdown" aria-expanded="false">
                          <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                          <i class="ion-android-arrow-dropdown ms-1"></i>
                        </span>
                        <div v-if="!isMobile">
                          <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                            <div v-if="search_option" class="modal-body de-content-modal-option">
                              <ul class="list-unstyled bg-white mb-0">
                                <li v-for="option in search_option" :key="option" class="full_field_tag cur_sur w-100 d-flex p-2" @click="click_search_options(option.value)">
                                  {{ language === 'km' ? option.title_km : option.title_en }}
                                  <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color ms-auto"></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a rel="nofollow" v-if="isMobile" @click="mo_sort" class="_flex_ cur_sur ml-3" >
                        <span class="d-flex px-2" :class="$device.isMobile ? 'fn_15' : 'fn_13'">
                          <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                          <i class="ion-android-arrow-dropdown ms-1"></i>
                        </span>
                      </a>
                      <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur ml_10" >
                        <span class="dropdown-toggle d-flex fn_13 bg-white px-2 p_y_2 border " data-bs-toggle="dropdown" aria-expanded="false">
                          <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                          <i class="ion-android-arrow-dropdown ms-1"></i>
                        </span>
                        <div v-if="!isMobile">
                          <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                            <div v-if="search_sort" class="modal-body de-content-modal-option p-0">
                              <ul class="list-unstyled bg-white mb-0">
                                <li v-for="option in search_sort" :key="option" class="full_field_tag cur_sur w-100 d-flex p-2" @click="click_search_sort(option.value)">
                                  {{ language === 'km' ? option.title_km : option.title_en }}
                                  <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color ms-auto"></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </nav>
                  <div class="no_more_result dt_mg_top_result">
                    <template v-if="a_ap_applied_jobs.length === 0">
                      <!-- <i class="fa fa-exclamation-circle u_no_result_font"></i> -->
                      <img src="/icon/job-icon.png" alt="no-results.png" width="250px">
                      <p class="no_more_result mt-2">You don't have any apply jobs right now</p>
                      <!-- <div class="px-3 fw-semibold text-center text-black fn_20">Listings you Apply Jobs appear here </div> -->
                      <!-- <div class="text-center fn_15 text-secondary px-3 pt-1">Find your favourites and start creating your own wish-list</div> -->
                      <!-- <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p> -->
                    </template>
                  </div>
                </template>
              </VueEternalLoading>
            </ClientOnly>
          </template>
          <template v-else>
            <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
              <div v-if="a_ap_applied_jobs.length > 0" class="text-center mt-4 mb-4">
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
              <button v-if="p_l_hide_btn_load_more" @click="manually_show_apply_jobs" class="btn">{{ $t('text_desktop.load_more') }}</button>
              <div v-else-if="a_ap_applied_jobs.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                <i class="fa fa-exclamation-circle u_no_result_font"></i>
                <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
      <br><br><br>


      <!-- Modal show error connection -->
      <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
        <div class="modal-dialog modal_dialog_style mg-mo-auto" role="document" >
          <div class="modal-content max_width_form">
            <div class="modal-body break_word_ show_text_status b-s-h-con">
              <p class="title_error_connect_">{{ $t('error_connect.title_error_con') }}</p>
              <p class="body_error_connect_">{{ $t('error_connect.body_error_con') }}</p>
            </div>
            <div class="modal-footer u_safety_footer" >
              <div data-bs-dismiss="modal" class="btn text-primary cur_sur"> {{ $t('message.close') }} </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Modal show error connection -->

      <!-- Modal show options -->
      <div class="modal fade style_full_screen" id="show_modal_options" tabindex="-1" role="dialog">
        <div class="modal-dialog modal_dialog_style" role="document">
          <div class="modal-content animate-bottom">
            <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
              <!-- header -->
              <div class="de-list-quick-chat">
                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                <p class="modal-title font_16 width_100"> {{ $t('new_text_2.status') }} </p>
                <button class="btn de-btn-plus font_15 mr-2" aria-label="plus" disabled></button>
              </div>
              <!-- content -->
              <div v-if="search_option" class="modal-body de-content-modal-option">
                <ul class="list-unstyled bg-white mb-0">
                  <li v-for="option in search_option" :key="option" class="full_field_tag cur_sur" @click="click_search_options(option.value)">
                    {{ language === 'km' ? option.title_km : option.title_en }}
                    <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade " id="show_modal_options1" tabindex="-1"  aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
              <div class="modal-content rounded">
                  <div class="modal-header m_h_p">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div class="col text-center">
                          <p class="name_style truncate_wrap m-0">  {{ $t('new_text_2.status') }} </p>
                      </div>
                      <div class="_pad_col_icon">
                          <button class="btn clear s_pad_clear " > ​</button>
                      </div>
                  </div>
                  <div v-if="search_option" class="modal-body de-content-modal-option">
                    <ul class="list-unstyled bg-white mb-0">
                      <li v-for="option in search_option" :key="option" class="full_field_tag cur_sur" @click="click_search_options(option.value)">
                        {{ language === 'km' ? option.title_km : option.title_en }}
                        <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                      </li>
                    </ul>
                  </div>
              </div>
          </div>
      </div>
      <!-- /Modal show options -->

      <!-- Modal show sort -->
      <div class="modal fade style_full_screen" id="show_modal_sort" tabindex="-1" role="dialog">
        <div class="modal-dialog modal_dialog_style" role="document">
          <div class="modal-content animate-bottom">
            <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
              <!-- header -->
              <div class="de-list-quick-chat">
                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                <p class="modal-title font_16 width_100"> {{ $t('new_text_2.sort') }} </p>
                <button class="btn de-btn-plus font_15 mr-2" aria-label="plus" disabled></button>
              </div>
              <!-- content -->
              <div v-if="search_sort" class="modal-body de-content-modal-option">
                <ul class="list-unstyled bg-white mb-0">
                  <li v-for="option in search_sort" :key="option" class="full_field_tag cur_sur" @click="click_search_sort(option.value)">
                    {{ language === 'km' ? option.title_km : option.title_en }}
                    <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade " id="show_modal_sort1" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
            <div class="modal-content rounded">
                <div class="modal-header m_h_p">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="col text-center">
                        <p class="name_style truncate_wrap m-0">  {{ $t('new_text_2.sort') }} </p>
                    </div>
                    <div class="_pad_col_icon">
                        <button class="btn clear s_pad_clear " > ​</button>
                    </div>
                </div>
                <div v-if="search_sort" class="modal-body de-content-modal-option">
                  <ul class="list-unstyled bg-white mb-0">
                    <li v-for="option in search_sort" :key="option" class="full_field_tag cur_sur" @click="click_search_sort(option.value)">
                      {{ language === 'km' ? option.title_km : option.title_en }}
                      <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color"></i>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
      <!-- /Modal show sort -->
    </div>
  </div>
</template>

<script setup>
  import { VueCookieNext } from 'vue-cookie-next';
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

  const a_ap_pageSize = useState('a_ap_pageSize', () => 0);
  const a_ap_applied_jobs = useState('a_ap_applied_jobs', () => []);
  const loading_field = ref(false);
  const p_l_hide_btn_load_more = useState('p_l_hide_btn_load_more', () => true);
  const dt_loading = ref(false);

  // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
  // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
  const { locale } = useI18n();
  // const language = ref(helper.get_lang_cookie());
  const language = ref(locale.value === 'km' ? 'km' : 'en');
  const localePath = useLocalePath();

  const user_data = ref('');
  const isMobile= ref(helper.m_or_d())

  const search_option = ref([
    { "title_km":'ទាំងអស់', "title_en": 'All', "value":"" },
    { "title_km":'កំពុងរងចាំ', "title_en": 'Pending', "value":"pending" },
    { "title_km":'មើល', "title_en": 'View', "value":"viewed" },
    { "title_km":'បានទទួលការងារ', "title_en": 'Hired', "value":"hired" },
    { "title_km":'បដិសេធ', "title_en": 'Reject', "value":"rejected" },
  ]);

  const search_sort = ref([
    { "title_km":'ថ្មីបំផុត', "title_en": 'Newest', "value":"newest" },
    { "title_km":'ចាស់ជាងគេ', "title_en": 'Oldest', "value":"oldest" }
  ]);

  const val_option = ref(route.query.status ? route.query.status : '');
  const val_sort = ref(route.query.sort ? route.query.sort : 'newest');

  const full_name_option = ref('');
  const full_name_sort = ref('');

  const isInitial = ref(true);

  const reload_q_again_1 = ref(0);
  const reload_q_again_2 = ref(0);

  // --- meta variable ---
  const meta_title_auth = useState('meta_title_auth', () => 'Apply Jobs - Khmer24.com');
  const check_bg = ref(false)

  useHead({
    title: meta_title_auth.value,
    meta: [
      // -- ios --
      // { name: 'apple-mobile-web-app-title', content: meta_title_auth.value },
      // -- seo page --
      { name: 'keywords', content: 'Buy, Sell' },
      { name: 'description', content: 'Buy, Sell' },

      { property: 'og:title', content: meta_title_auth.value },
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
      // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
      check_new_auth_user();

      // --- check if click form account page, must to clear old data ---
      const pa_con = helper.get_params_make_condition(); // get data params condition.
      const p_clear = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params ? pa_con.clear_old_data.d_params : ''; // check clear_old_data from params.
      if (p_clear.clear_old_data) {
        a_ap_pageSize.value = 0;
        a_ap_applied_jobs.value = [];
      }

      // --- check auth exist or not ---
      if (helper.check_auth_user() === false) {
        router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
      }

      ripple();

      // --- remove class modal-open ---
      helper.remove_class_modal_open();

      // --- check and get full name of option search to show in UI ---
      get_full_name();

      if (isDesktop && a_ap_applied_jobs.value.length === 0) {
          manually_show_apply_jobs(); // In Desktop View and post empty for the first, must get new data.
      }
    }
  })

  onUnmounted(() => {
    helper.clear_params_make_con('clear_old_data');
  })

  watch(() => route.query, () => {
    let route_name = helper.clear_prefix_route_name(route.name);
    if (route_name === 'account-apply-jobs') {
      a_ap_pageSize.value = 0;
      a_ap_applied_jobs.value = [];

      if (isDesktop) { manually_show_apply_jobs(); } // is desktop screen, get data manually.

      get_full_name(); // check and get full name of option search to show in UI.
      isInitial.value = true;      // reset scroll loader again.
    }
  })

  // ---- show modal option ----
  function hide_modal() { 
    if(isMobile.value){
      $("#show_modal_options").modal('hide'); 
      $("#show_modal_sort").modal('hide'); 
    }else{
      $("#show_modal_options1").modal('hide'); 
      $("#show_modal_sort1").modal('hide'); 
    }
  }
  function mo_option() {
      $("#show_modal_options").modal('show'); 
    }
  function mo_sort() { 
      $("#show_modal_sort").modal('show');
   }
  function click_search_options(value) {
    val_option.value = value; // store value from modal options.
    let query_str = {};
    if (val_option.value) { query_str['status'] = val_option.value; }
    if (val_sort.value) { query_str['sort'] = val_sort.value; }
    router.replace(localePath({ name: 'account-apply-jobs', query: query_str }));

    hide_modal();
  }
  function click_search_sort(value) {
    val_sort.value = value; // store value from modal sort.
    let query_str = {};
    if (val_option.value) { query_str['status'] = val_option.value; }
    if (val_sort.value) { query_str['sort'] = val_sort.value; }
    router.replace(localePath({ name: 'account-apply-jobs', query: query_str }));

    hide_modal();
  }
  // ---- clean date ----
  function convertFromNow(date) { return helper.check_date_ago(date, ''); }
  // ---- get full name sort and options ----
  function get_full_name() {
    // loop array search_option
    $.each(search_option.value, (k, val) => {
      if (val.value === val_option.value) {
        full_name_option.value = language.value === 'en' ? val.title_en : val.title_km;
      }
    });
    // loop array search_sort
    $.each(search_sort.value, (k, val) => {
      if (val.value === val_sort.value) {
        full_name_sort.value = language.value === 'en' ? val.title_en : val.title_km;
      }
    });
  }
  // ---- convert title to use in url ----
  function check_title_char(title) { return helper.check_special_char(title); }

  // ---- check new auth user ----
  function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

  // ---- search show user ----
  async function show_apply_jobs({loaded, error, noMore, noResults}, { isFirstLoad }) {
    check_new_auth_user();

    let the_params = {
      offset: a_ap_pageSize.value,
      lang: language.value,
    }
    if (val_option.value) { the_params['status'] = val_option.value; }
    if (val_sort.value) { the_params['sort'] = val_sort.value; }

    $fetch(config.VUE_APP_API_URL_JOB + 'me/applied_jobs', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: the_params,

    }).then(res => {

      a_ap_pageSize.value += res.limit; // add offset
      if (res.data.length) {
        a_ap_applied_jobs.value = a_ap_applied_jobs.value.concat(res.data); // concat in multiple array
      }

      // -- tracking on google analytic --
      if (a_ap_applied_jobs.value.length <= 10 && a_ap_pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
      else { track_google_analytics(a_ap_pageSize.value > 10 ? a_ap_pageSize.value : 0); }

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
          if (isFirstLoad && a_ap_applied_jobs.value.length === 0) {
            noResults(); // console.log('noResult');
            check_bg.value = true
          } else {
            noMore(); // console.log('noMore');
          }
      } else {
        if (a_ap_applied_jobs.value.length < a_ap_pageSize.value) {
          noMore(); // close scroll.
        } else {
          loaded(); // scroll down load more.
        }
      }

    }).catch(e => {
      if (!e.response) {
        error();

      } else if (e.response) { // retry
        if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_1.value <= 2) {
            reload_q_again_1.value += 1;
            check_new_auth_user();
            setTimeout( () => { loaded(); }, 3000);
          }
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      }
    });
  }
  // ---- manually get apply jobs ----
  function manually_show_apply_jobs() {
    check_new_auth_user();
    dt_loading.value = true;

    let the_params = {
      offset: a_ap_pageSize.value,
      lang: language.value,
    }
    if (val_option.value) { the_params['status'] = val_option.value; }
    if (val_sort.value) { the_params['sort'] = val_sort.value; }

    $fetch(config.VUE_APP_API_URL_JOB + 'me/applied_jobs', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: the_params,

    }).then(res => {

      a_ap_pageSize.value += res.limit; // add offset
      if (res.data.length) {
        a_ap_applied_jobs.value = a_ap_applied_jobs.value.concat(res.data); // concat in multiple array
      }
      dt_loading.value = false;
      p_l_hide_btn_load_more.value = a_ap_applied_jobs.value.length < a_ap_pageSize.value ? false : true;

      // -- tracking on google analytic --
      if (a_ap_applied_jobs.value.length <= 10 && a_ap_pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
      else { track_google_analytics(a_ap_pageSize.value > 10 ? a_ap_pageSize.value : 0); }

    }).catch(e => {
      if (!e.response) {  } else if (e.response) { // retry
        if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_1.value <= 2) {
            reload_q_again_1.value += 1;
            check_new_auth_user();
            setTimeout( () => { manually_show_apply_jobs(); }, 3000);
          }
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      }
      dt_loading.value = false;
    });
  }

  // ---- track on google analytic ----
  function track_google_analytics (per_page) {
    // setTimeout(() => {
      let offset = per_page > 0 ? '?offset=' + per_page : '';   // set offset of page if scroll get more data
      let page_path = route.path + offset;                // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
      let page_location = window.location.href + offset;        // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
      let data = {
        page_title: meta_title_auth.value,
        page_location: page_location,
        page_path: page_path,
      }
      // -- event on page --
      event('Apply_jobs', data);
      // -- page_view --
      pageview(data);
    // },50);
  }
  // ---- click back one page ----
  function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
  // ---- ripple effect on UI ----
  function ripple() { setTimeout(function () { $(".arrow_back_nav,.cl_ripple").ripple(); }, 300); }
  // ---- check image error 404 must to show static image ----
  function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
</script>

