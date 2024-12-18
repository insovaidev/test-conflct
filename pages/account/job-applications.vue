
<template>
  <div>
    <div class="max_width_form" :class="check_bg ? ( isMobile ? 'min_h mt_80' : 'bg-white p-3 borders mt_80') : 'min_h '">
      <!-- App Bar -->
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isMobile ? 'fix_app_bar' : 'dt_fix_app_bar'">
          <div v-if="isMobile" class="_div_nav bg_app_bar_header_ ">
            <div @click="goBack" class="_pad_col_icon">
              <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                <i class="ion-android-arrow-back font_click_back"></i>
              </button>
            </div>
            <div class="col pl-0 l_h_con_title">
              <p class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ query_title ? query_title : $t('new_text.job_application') }} </p>
            </div>
          </div>
          <nav v-if="a_j_a_job_applications.length > 0" class="max_width_form" :class=" a_j_a_job_applications && !isMobile ? 'apply_job_filter dt-mt-top px-3' : 'bg-white py-2'">
            <div class="col _flex_ align-items-center">
              <div class="d-flex">
                <a rel="nofollow" v-if="isMobile" @click="mo_option()" class="_flex_ cur_sur" >
                  <span class="d-flex fn_15 px-2">
                    <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                </a>
                <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur" >
                  <span class="dropdown-toggle d-flex fn_15" data-bs-toggle="dropdown" aria-expanded="false">
                    <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                  <div v-if="!isMobile">
                    <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                      <div v-if="search_option" class="modal-body de-content-modal-option p-0">
                        <ul class="list-unstyled bg-white mb-0 p-0">
                          <li v-for="option in search_option" :key="option" class="full_field_tag cur_sur w-100 d-flex p-2" @click="click_search_options(option.value)">
                            {{ language === 'km' ? option.title_km : option.title_en }}
                            <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color ms-auto"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
                <a rel="nofollow" v-if="isMobile" @click="mo_sort()" class="_flex_ cur_sur ml-3" >
                  <span class="d-flex fn_15 px-2">
                    <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                </a>
                <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur ml-3" >
                  <span class="dropdown-toggle d-flex fn_15" data-bs-toggle="dropdown" aria-expanded="false">
                    <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                    <i class="ion-android-arrow-dropdown ms-1"></i>
                  </span>
                  <div v-if="!isMobile">
                    <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                      <div v-if="search_sort" class="modal-body de-content-modal-option p-0">
                        <ul class="list-unstyled bg-white mb-0 p-0">
                          <li v-for="option in search_sort" :key="option" class="full_field_tag cur_sur d-flex w-100 p-2" @click="click_search_sort(option.value)">
                            {{ language === 'km' ? option.title_km : option.title_en }}
                            <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color ms-auto"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div v-if="!isMobile" class="fw-semibold ms-auto">{{ $t('new_text.job_application') }}</div>
            </div>
          </nav>
      </div>

      <!-- Body -->
      <div class="flex_all_post lists_post_content" :class="isMobile ? ( a_j_a_job_applications.length > 0 ? 'margin_below_app_bar_4'  : '') : (a_j_a_job_applications.length > 0  ? 'dt-mt-120' : '' )" :id="a_j_a_job_applications.length > 0 ? 'height_div' : ''">
        <article v-for="(j_a, index) of a_j_a_job_applications" :key="index" class="col-12 no_padding">
          <div class="list_items_post">
            <div class="u_border_cart">
              <a rel="nofollow" href="javascript:void(0)" @click="show_detail_job_applications(j_a.id, j_a.status.value)" class="d_block">
                <div class="col cart_job_applications">
                  <p class="j-a-title-1">{{ j_a.application && j_a.application.name ? j_a.application.name : '' }}</p>
                  <p class="truncate_wrap j-a-title-2">
                    {{ $t('new_text_2.apply') }}: {{ j_a.post && j_a.post.title ? j_a.post.title : '' }}{{ j_a.post ? ' - '+j_a.post.type : '' }}
                  </p>
                  <!-- truncate_wrap if need to use -->
                  <p class="j-a-title-2">{{ $t('message.phone') }}: {{ j_a.application.phone ? j_a.application.phone.join(" , ") : '' }}</p>
                  <p class="j-a-title-2">{{ $t('lng.email') }}: {{ j_a.application.email ? j_a.application.email : '' }}</p>
                  <p class="j-a-title-3">{{ j_a.apply_date ? convertFromNow(j_a.apply_date) : '' }}</p>

                  <p v-if="j_a.status.value === 'new'" class="j-a-title-4 apply-job-viewed">{{ j_a.status.title }}</p>
                  <p v-else-if="j_a.status.value === 'viewed'" class="j-a-title-4 apply-job-pending">{{ j_a.status.title }}</p>
                  <p v-else-if="j_a.status.value === 'hired'" class="j-a-title-4 apply-job-hired">{{ j_a.status.title }}</p>
                  <p v-else-if="j_a.status.value === 'rejected'" class="j-a-title-4 apply-job-rejected">{{ j_a.status.title }}</p>
                </div>
              </a>
            </div>
          </div>
        </article>

        <template v-if="!isDesktop">
          <ClientOnly>
            <VueEternalLoading :load="show_apply_jobs" v-model:is-initial="isInitial" margin="800px">
              <template #loading>
                <!-- loading when have data -->
                <div v-if="a_j_a_job_applications.length > 0" class="text-center mt-4">
                  <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                </div>
                <!-- loading when data empty -->
                <div v-else class="full_width ">
                  <div v-for="s in 4" :key="s" class="col-12 no_padding">
                    <div style="margin: 5px 5px 10px 5px;">
                      <div class="my_card pad_card_ _flex_">
                        <div class="width_100 pb-0 pt-1 pl-1 pr-1 pb-1">
                          <div class="animated-background mb-2 text_hei_loading_title width_60"></div>
                          <div class="animated-background mb-2 text_hei_loading_price width_90"></div>
                          <div class="animated-background mb-2 text_hei_loading_price width_70"></div>
                          <div class="animated-background mb-2 text_hei_loading_price width_80"></div>
                          <div class="animated-background mb-2 text_hei_loading width_30"></div>
                          <div class="animated-background text_hei_loading_title width_20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #error="{ retry }">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="a_j_a_job_applications.length > 0 ? '' : 'margin_below_app_bar'">
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
                <!--<div class="no_more_result" style="margin-top: 100px;">There is no more Content.</div>-->
                <div class="no_more_result"></div>
              </template>
              <template #no-results>
                <!-- <h1 class="ms-3 text-secondary">Job Applications</h1> -->
                <div v-if="!isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text.job_application') }}</div>
                <div class="d-flex" :class="isMobile ? 'mt-4 bg-white py-3' : ''">
                  <a rel="nofollow" v-if="isMobile" @click="mo_option()" class="_flex_ cur_sur" >
                    <span class="d-flex px-2" :class="$device.isMobile ? 'fn_15' : 'fn_13'">
                      <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                      <i class="ion-android-arrow-dropdown ms-1"></i>
                    </span>
                  </a>
                  <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur" >
                    <span class="dropdown-toggle d-flex fn_13 bg-white px-2 p_y_2 border" data-bs-toggle="dropdown" aria-expanded="false">
                      <p class="m-0">{{ $t('new_text_2.status') }}: {{ full_name_option }}</p>
                      <i class="ion-android-arrow-dropdown ms-1"></i>
                    </span>
                    <div v-if="!isMobile">
                      <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                        <div v-if="search_option" class="modal-body de-content-modal-option p-0">
                          <ul class="list-unstyled bg-white mb-0 p-0">
                            <li v-for="option in search_option" :key="option" class="full_field_tag cur_sur w-100 d-flex p-2" @click="click_search_options(option.value)">
                              {{ language === 'km' ? option.title_km : option.title_en }}
                              <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-end parent_color ms-auto"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a rel="nofollow" v-if="isMobile" @click="mo_sort()" class="_flex_ cur_sur ml-3" >
                    <span class="d-flex px-2" :class="$device.isMobile ? 'fn_15' : 'fn_13'">
                      <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                      <i class="ion-android-arrow-dropdown ms-1"></i>
                    </span>
                  </a>
                  <a rel="nofollow" v-if="!isMobile" class="_flex_ cur_sur ml_10" >
                    <span class="dropdown-toggle d-flex fn_13 bg-white px-2 p_y_2 border" data-bs-toggle="dropdown" aria-expanded="false">
                      <p class="m-0">{{ $t('new_text_2.sort') }}: {{ full_name_sort }}</p>
                      <i class="ion-android-arrow-dropdown ms-1"></i>
                    </span>
                    <div v-if="!isMobile">
                      <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                        <div v-if="search_sort" class="modal-body de-content-modal-option p-0">
                          <ul class="list-unstyled bg-white mb-0 p-0">
                            <li v-for="option in search_sort" :key="option" class="full_field_tag cur_sur d-flex w-100 p-2" @click="click_search_sort(option.value)">
                              {{ language === 'km' ? option.title_km : option.title_en }}
                              <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color ms-auto"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="no_more_result dt_mg_top_result">
                  <!-- <i class="fa fa-exclamation-circle u_no_result_font"></i>
                  <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p> -->
                  <img src="/icon/job-icon.png" alt="no-results.png" width="250px">
                  <!-- <div class="px-3 fw-semibold text-center text-black fn_20">Listings you Job Applications appear here </div> -->
                  <!-- <div class="text-center fn_15 text-secondary px-3 pt-1">Find your favourites and start creating your own wish-list</div> -->
                  <p class="no_more_result mt-2">You don't have any job applications right now</p>
                </div>
              </template>
            </VueEternalLoading>
          </ClientOnly>
        </template>
        <template v-else>
          <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
            <div v-if="a_j_a_job_applications.length > 0" class="text-center mt-4 mb-4">
              <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
            </div>
            <div v-else class="full_width">
              <div v-for="s in 4" :key="s" class="col-12 no_padding">
                <div style="margin: 5px 5px 10px 5px;">
                  <div class="my_card pad_card_ _flex_">
                    <div class="width_100 pb-0 pt-1 pl-1 pr-1 pb-1">
                      <div class="animated-background mb-2 text_hei_loading_title width_60"></div>
                      <div class="animated-background mb-2 text_hei_loading_price width_90"></div>
                      <div class="animated-background mb-2 text_hei_loading_price width_70"></div>
                      <div class="animated-background mb-2 text_hei_loading_price width_80"></div>
                      <div class="animated-background mb-2 text_hei_loading width_30"></div>
                      <div class="animated-background text_hei_loading_title width_20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="des_btn_load_more width_100">
            <button v-if="j_app_hide_btn_load_more" @click="manually_show_apply_jobs" class="btn">{{ $t('text_desktop.load_more') }}</button>
            <div v-else-if="a_j_a_job_applications.length === 0" class="no_more_result n-m-r-mg text-center width_100">
              <i class="fa fa-exclamation-circle u_no_result_font"></i>
              <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
            </div>
          </div>
        </template>
      </div>
      <template v-if="!isDesktop"><br><br><br></template>

      <!-- loading request full screen -->
      <div v-if="loading_field" class="loading_back_ground">
        <div class="loading_img">
          <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
        </div>
      </div>
      <!-- /loading request full screen -->

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
                    <i v-if="option.value === val_option" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color"></i>
                  </li>
                </ul>
              </div>
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
                    <i v-if="option.value === val_sort" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Modal show sort -->

      <!-- modal detail apply job -->
      <div v-if="isMobile" class="modal style_full_screen" id="show_modal_detail" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true" style="background-color: e0e0e0;"> <!-- fade -->
        <!-- <div class="modal-dialog modal_dialog_style" :class="isDesktop ? '' : 'bg-white'" role="document"> -->
        <div class="modal-dialog modal_dialog_style" style="background-color: #e0e0e0">
          <div class="modal-content"  >
            <!-- <resume :pageType="'detail_apply'"/>  -->
            <!-- App Bar -->
            <div v-if="isMobile" class="no_padding" :class="isDesktop ? 'col' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12 fix_app_bar'">
              <div class="_div_nav bg_app_bar_header_">
                <div @click="clearData" class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                  <button class="btn clear-btn-app-bar" aria-label="back">
                    <i class="icon-clear font_click_back"></i>
                  </button>
                </div>
                <div class="col l_h_con_title p-0 ml-2">
                  <p class="m-0 name_style truncate_wrap"> {{ $t('new_text_2.view_job_application') }} </p>
                </div>
              </div>
            </div>
            <!-- /App Bar -->

            <!-- Body -->
            <div class="no_padding" :class="isDesktop ? 'col' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12 margin_below_app_bar'">
              <div class="large-12 columns" style="background-color: #e0e0e0">
                <resume :pageType="'detail_apply'" style="padding-top: 0px;" /> 
                
                <br>
                <template v-if="!isDesktop"><br><br></template>

                <!-- bottom navigation -->
                <div class="nav nav_desktop">
                  <div class="col pr-1 pl-2 pt-2" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.email">
                    <a rel="nofollow" aria-label="email" v-bind:href="'mailto:'+data_detail_job.application.email" class="btn form-control btn_sms btn-lg btn-k24-primary pt-6 text-white" id="btn_sms">
                      <i aria-hidden="true" class="fa fa-envelope font_22 mr-1"></i>
                    </a>
                  </div>
                  <template v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                    <div :class="!data_detail_job.application.email ? 'col pl-2 pr-1 pt-2' : 'col pl-1 pr-1 pt-2'">
                      <button @click="clicPhone" type="button" class="btn form-control btn_call btn-lg btn-k24-primary pt-6 text-white" id="btn_call" aria-label="phone">
                        <i aria-hidden="true" class="fa fa-phone font_21 mr-1"></i>
                      </button>
                    </div>
                  </template>
                  <div class="col pl-1 pr-2 pt-2">
                    <button type="button" @click="click_chat" id="button_chat" class="btn form-control btn-lg btn-k24-secondary pt-6 text-white" aria-label="comment">
                      <i class="fa fa-comments font_21 mr-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="modal" id="show_modal_detail" tabindex="-1">
          <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
              <div class=" rounded" :class="GetAll ? 'modal-content' : ''">
                  <div class="modal-header py-2">
                      <h5 class="modal-title">{{ $t('new_text_2.view_job_application') }}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div :class="GetAll ? 'modal-body bge1e1e1' : ''">
                      <div class="mt_-85">
                        <resume :pageType="'detail_apply'" style="padding-top: 0px;" /> 
                      </div>
                  </div>
                  <div v-if="ShowPhones && isMobile === false">
                      <div class="modal-body p-0" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                          <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                              <li v-for="p_n in data_detail_job.application.phone" :key="p_n" class="cl_ripple">
                                  <a rel="nofollow" class="full_field_a_tag border_top color_reason _flex_important_" :href="'tel:'+p_n">
                                      <div class="col _flex_ p-0 mt-1"> <p class="u_show_ph_mg">{{ p_n }}</p> </div>
                                      <div class="col-2 p-0 text-right"> <i aria-hidden="true" class="fa fa-phone call_icon_modal"></i> </div>
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="GetAll" class="modal-footer p-0">
                      <div v-if="data_detail_job" class="w-100">
                          <div class="d-flex w-100 nav_desktop">
                              <div class="col pr-1 pl-2 pt-2" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.email">
                                  <a rel="nofollow" aria-label="email" v-bind:href="'mailto:'+data_detail_job.application.email" class="btn btn-k24-primary pt-6 btn-height" id="btn_sms">
                                      <i aria-hidden="true" class="fa fa-envelope font_22 mr-1 pt-1"></i>
                                  </a>
                              </div>
                              <template v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                              <div :class="!data_detail_job.application.email ? 'col pl-2 pr-1 pt-2' : 'col pl-1 pr-1 pt-2'">
                                  <button @click="clickPhone( ShowPhones ? 'false' : 'true' )" type="button" class="btn btn-k24-primary pt-6 btn-height" id="btn_call" aria-label="phone">
                                  <i aria-hidden="true" class="fa fa-phone font_21 mr-1 pt-1"></i>
                                  </button>
                              </div>
                              </template>
                              <div class="col pl-1 pr-2 pt-2">
                              <button type="button" @click="click_chat" id="button_chat" class="btn btn-k24-secondary pt-6 btn-height" aria-label="comment">
                                  <i class="fa fa-comments font_21 mr-1 pt-1"></i>
                              </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- /modal detail apply job -->

      <!-- Modal show phone number -->
      <div class="modal fade style_full_screen" id="modal_show_phone" tabindex="-1" role="dialog" aria-hidden="true" style="background-color: #00000066 !important;">
        <div class="modal-dialog modal_dialog_style" role="document">
          <div class="modal-content animate-bottom">
            <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
              <!-- show phone numbers -->
              <div class="option_selected">
                <div class="border_bottom u_show_ph_number">
                  <p id="label_phone_or_sms" class="modal-title font_13">
                    {{ $t('message.call') }}
                  </p>
                </div>
                <div class="modal-body p-0" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
                  <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                    <li v-for="p_n in data_detail_job.application.phone" :key="p_n" class="cl_ripple">
                      <a rel="nofollow" class="full_field_a_tag border_top color_reason _flex_important_" :href="'tel:'+p_n">
                        <div class="col _flex_ p-0 mt-1"> <p class="u_show_ph_mg">{{ p_n }}</p> </div>
                        <div class="col-2 p-0 text-right"> <i aria-hidden="true" class="fa fa-phone call_icon_modal"></i> </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="a_cancel_btn_modal_bg">
                <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                  <p class="modal-title color_reason"><b>Cancel</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ShowPhone">
        <div  class="loading_back_ground" @click="clicClose">
        <div style="position:fixed;bottom:60px;width:100%" >
          <div class="option_selected" style="bottom: 0px;">
            <div class="border_bottom u_show_ph_number">
              <p id="label_phone_or_sms" class="modal-title font_13">
                {{ $t('message.call') }}
              </p>
            </div>
            <div class="modal-body p-0" v-if="data_detail_job && data_detail_job.application && data_detail_job.application.phone">
              <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
                <li v-for="p_n in data_detail_job.application.phone" :key="p_n" class="cl_ripple">
                  <a rel="nofollow" class="full_field_a_tag border_top color_reason _flex_important_" :href="'tel:'+p_n">
                    <div class="col _flex_ p-0 mt-1"> <p class="u_show_ph_mg">{{ p_n }}</p> </div>
                    <div class="col-2 p-0 text-right"> <i aria-hidden="true" class="fa fa-phone call_icon_modal"></i> </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="a_cancel_btn_modal_bg" @click="clicClose">
            <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
              <p class="modal-title color_reason"><b>Cancel</b></p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- /Modal show phone number -->
    </div>
  </div>
</template>

<script setup>
    import {VueCookieNext} from "vue-cookie-next";
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

    const loadindScreen = useState('loadindScreen')
    loadindScreen.value = true
    const ShowPhone = useState('ShowPhone')
    ShowPhone.value = false
    const ShowPhones = useState('ShowPhones')
    ShowPhones.value = false
   
    // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
    // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
    const language = ref(helper.get_lang_cookie());
    const localePath = useLocalePath();
    const j_app_hide_btn_load_more = useState('j_app_hide_btn_load_more', () => true);
    const dt_loading = ref(false);

    const user_data = ref('');

    const a_j_a_pageSize = useState('a_j_a_pageSize', () => 0);
    const a_j_a_job_applications = useState('a_j_a_job_applications', () => []);
    const loading_field = ref(false);

    const search_option = ref([
      { "title_km":'ទាំងអស់', "title_en": 'All', "value":"" },
      { "title_km":'ថ្មី', "title_en": 'New', "value":"new" },
      { "title_km":'មើល', "title_en": 'View', "value":"viewed" },
    ]);
    const search_sort = ref([
      { "title_km":'ថ្មីបំផុត', "title_en": 'Newest', "value":"newest" },
      { "title_km":'ចាស់ជាងគេ', "title_en": 'Oldest', "value":"oldest" }
    ]);
    const val_option = ref(route.query.status ? route.query.status : '');
    const val_sort = ref(route.query.sort ? route.query.sort : 'newest');

    const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again).

    const full_name_option = ref('');
    const full_name_sort = ref('');
    const data_detail_job = ref(''); // for detail job application.
    const isMobile= ref(helper.m_or_d())
   

    // --- if view post is jobs from account page on "On Job Application" ---
    const query_title = ref(route.query.title ? route.query.title : '');

    // --- condition check request (if 401 three time clear auth user) ---
    const reload_q_again_1 = ref(0); const reload_q_again_3 = ref(0);
    const reload_q_again_2 = ref(0); const reload_q_again_4 = ref(0);

    const stop_auto_request = ref(true);

    // --- meta variable ---
    const meta_title_job_app = useState('meta_title_job_app', () => 'Job Applications - Khmer24.com');

    const check_bg = ref(false)

    useHead({
      title: meta_title_job_app.value,
      meta: [
        // -- ios --
        // { name: 'apple-mobile-web-app-title', content: meta_title_job_app.value },
        // -- seo page --
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: meta_title_job_app.value },
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
                a_j_a_pageSize.value = 0;
                a_j_a_job_applications.value = [];
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

            if (isDesktop && a_j_a_job_applications.value.length === 0) {
                manually_show_apply_jobs(); // In Desktop View and post empty for the first, must get new data.
            }
        }
    })

    onUnmounted(() => {
      helper.clear_params_make_con('clear_old_data');
    })

    watch(() => route.query, () => {
        let route_name = helper.clear_prefix_route_name(route.name);
        if (route_name === 'account-job-applications') {
            a_j_a_pageSize.value = 0;
            a_j_a_job_applications.value = [];

            if (isDesktop) { manually_show_apply_jobs(); } // is desktop screen, get data manually.

            get_full_name(); // check and get full name of option search to show in UI.
            isInitial.value = true;      // reset scroll loader again.
        }
    })

    // ---- show modal option ----
    function hide_modal() { $("#show_modal_options").modal('hide'); $("#show_modal_sort").modal('hide'); }
    // function mo_option() { $("#show_modal_options").modal('show'); }
    // function mo_sort() { $("#show_modal_sort").modal('show'); }
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

      if (route.query.store) { query_str['store'] = route.query.store; } // only from page detail Store.

      if (route.query.post_id) { query_str['post_id'] = route.query.post_id; } // only from account page, on post job only.
      if (route.query.title) { query_str['title'] = route.query.title; } // only from account page, on post job only.

      router.replace(localePath({ name: 'account-job-applications', query: query_str }));
      hide_modal();
    }
    function click_search_sort(value) {
      val_sort.value = value; // store value from modal sort.
      let query_str = {};
      if (val_option.value) { query_str['status'] = val_option.value; }
      if (val_sort.value) { query_str['sort'] = val_sort.value; }

      if (route.query.store) { query_str['store'] = route.query.store; } // only from page detail Store.

      if (route.query.post_id) { query_str['post_id'] = route.query.post_id; } // only from account page, on post job only.
      if (route.query.title) { query_str['title'] = route.query.title; } // only from account page, on post job only.

      router.replace(localePath({ name: 'account-job-applications', query: query_str }));
      hide_modal();
    }
    // ---- clean date ----
    function convertFromNow(date) { return helper.check_date_ago(date, ''); }
    // ---- get full name sort and options ----
    function get_full_name() {
      // loop array search_option
      $.each(search_option.value, (k, val) => {
        if (val.value === val_option.value) {
          full_name_option.value = language.value === 'km' ? val.title_km : val.title_en;
        }
      });
      // loop array search_sort
      $.each(search_sort.value, (k, val) => {
        if (val.value === val_sort.value) {
          full_name_sort.value = language.value === 'km' ? val.title_km : val.title_en;
        }
      });
    }
    // ---- show modal detail job applications ----
    const get_data_id = useState('get_data_id',()=>'')
    function show_detail_job_applications(id, is_new) {
      $.each(a_j_a_job_applications.value, (k, val) => {
        if (val.id == id) {
          data_detail_job.value = val;
          get_data_id.value = val
          get_Detail();
          return false; // break the loop
        }
      });
      // -- check is job not yet to viewed must to mark as view --
      if (is_new === 'new') {
        // $fetch(config.VUE_APP_API_URL + 'job_applications/' + id,{
        $fetch(config.VUE_APP_API_URL_JOB + 'me/job_applications/' + id,{
          headers: { "Access-Token": user_data.value.tokens.access_token },
          method: 'POST',
          params: {lang: language.value},
          body: new URLSearchParams({ status: 'viewed' })

        }).then(res => {
          $.each(a_j_a_job_applications.value, (k, val) => {
            if (val.id === id) {
              a_j_a_job_applications.value[k].status = { title: language.value === 'km' ? 'បានមើល' : 'Viewed', value: 'viewed' };
              return false; // break the loop
            }
          });
        }).catch(error => {
          if (!error.response) {
            if (reload_q_again_3.value < 2) {
              reload_q_again_3.value += 1;
              setTimeout( () => { show_detail_job_applications(id, is_new); }, 3000);
            }
          } else if (error.response) {
            if (error.response.status === 401) { // retry
              if (reload_q_again_3.value <= 2) {
                reload_q_again_3.value += 1;
                setTimeout( () => { show_detail_job_applications(id, is_new); }, 3000);
              }
            }
          }
        });
      }
      $('#show_modal_detail').modal('show'); // open modal
    }

    const GetAll = useState('GetAll',()=>'')
    const get_to_chat_id = ref('')
    const post_job = useState('post_job',()=>'')
    function get_Detail(){
      useFetch(config.VUE_APP_API_URL_ME+'job_applications/'+data_detail_job.value.id+'?lang=en&fields=post[location],application[location]',{
        headers: { "Access-Token": user_data.value.tokens.access_token }
      })
      .then(res=>{
          loadindScreen.value = false
          const result = res.data
          // console.log('testtt==',result)
          GetAll.value = result.value.data.application
          get_to_chat_id.value = result.value.data.application
      }).catch(er=>{
        // console.log("test===",er)
          loadindScreen.value = false
          check_new_auth_user();
          setTimeout( () => { get_Detail(); }, 1000);
      })
    }
    // ---- regex to get the last text in url ----
    function regex_last_url(url) { return url.match(/\/([^\/]+)\/?$/)[1]; }
    // ---- click show modal phone ----
    function show_phone_num() { $('#modal_show_phone').modal('show'); }
    // ---- convert title to use in url ----
    function check_title_char(title) { return helper.check_special_char(title); }
    // ---- click chat button ----
    function click_chat() {
      let data = get_to_chat_id.value;
      let user_id = data ? data.userid : '';
      // let data = data_detail_job.value;
      // let user_id = data.application ? data.application.userid : '';
      // console.log('Chat ===',user_id)
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL + 'profiles/user/' + user_id, {
        params: { fields: 'username', lang: language.value }
      }).then(res => {
        // save_track_optional('clear_old_data', { clear_old_data: 'clear' });
        // router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
        save_track_optional('clear_old_data', { clear_old_data: 'clear' });
        // router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
        if (isMobile.value) {
            router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
        } else {
            router.push(localePath({ name: 'chats', query: {to_id: user_id, username: res.data.username} }));
        }
        $('#show_modal_detail').modal('hide')
      }).catch(error => {
        if (!error.response) {
          if (reload_q_again_4.value < 2) {
            reload_q_again_4.value += 1;
            setTimeout( () => { click_chat(); }, 3000);
          }
        } else if (error.response) {
          if (error.response.status === 401) { // retry
            if (reload_q_again_4.value <= 2) {
              reload_q_again_4.value += 1;
              setTimeout( () => { click_chat(); }, 3000);
            }
          }
        }
        loading_field.value = false;
      });
    }

    // ---- check new auth user ----
    function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    // ---- search show user ----
    async function show_apply_jobs({loaded, error, noMore, noResults}, { isFirstLoad }) {

      // prevent job-applications smaller then pagesize and still request when click back to this page again
      if (a_j_a_pageSize.value !== 0 && a_j_a_job_applications.value.length < a_j_a_pageSize.value) {
        if (a_j_a_job_applications.value.length === 0) {
          noResults(); // close loading, show status no result
          check_bg.value = true
        } else {
          noMore(); // close loading
        }

      } else {
        check_new_auth_user();

        let the_params = {
          offset: a_j_a_pageSize.value,
          lang: language.value,
          fields: 'application,post', // or  'application,post[location]'  if need to get location more
        }
        if (route.query.post_id) {
          the_params['post'] = route.query.post_id;
        }
        if (val_option.value) {
          the_params['status'] = val_option.value;
        }
        if (val_sort.value) {
          the_params['sort'] = val_sort.value;
        }
        if (route.query.store) {
          the_params['store'] = route.query.store;
        } // only from page detail Store.

        // $fetch(config.VUE_APP_API_URL + 'job_applications', {
        $fetch(config.VUE_APP_API_URL_JOB + 'me/job_applications', {
          headers: {"Access-Token": user_data.value.tokens.access_token},
          params: the_params,

        }).then(res => {
          a_j_a_pageSize.value += res.limit; // add offset
          if (res.data.length) {
            a_j_a_job_applications.value = a_j_a_job_applications.value.concat(res.data); // concat in multiple array
          }

          // -- tracking on google analytic --
          if (a_j_a_job_applications.value.length <= 10 && a_j_a_pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
          else { track_google_analytics(a_j_a_pageSize.value > 10 ? a_j_a_pageSize.value : 0); }

          // -- check stop scroll or scroll more --
          if (res.data.length === 0) {
            if (isFirstLoad) {
              noResults(); // console.log('noResult');
              check_bg.value = true
            } else {
              noMore(); // console.log('noMore');
            }
          } else {
            loaded(); // console.log('Loaded');
          }

        }).catch(e => {
          if (!e.response) {
            error();
          } else if (e.response) {
            if (e.response.status === 401) { // retry
              if (reload_q_again_1.value <= 2) {
                reload_q_again_1.value += 1;
                check_new_auth_user();
                setTimeout(() => {
                  loaded();
                }, 3000);
              }
            } else {
              localStorage.removeItem('auth_user');   // remove localStorage
              router.replace(localePath({name: 'index'}));
            }
          }
        });
      }
    }

    // ---- manually get apply jobs ----
    function manually_show_apply_jobs() {
      check_new_auth_user();
      dt_loading.value = true;

      let the_params = {
        offset: a_j_a_pageSize.value,
        lang: language.value,
        fields: 'application,post', // or  'application,post[location]'  if need to get location more
      }
      if (route.query.post_id) {
        the_params['post'] = route.query.post_id;
      }
      if (val_option.value) {
        the_params['status'] = val_option.value;
      }
      if (val_sort.value) {
        the_params['sort'] = val_sort.value;
      }
      if (route.query.store) {
        the_params['store'] = route.query.store;
      } // only from page detail Store.

      // $fetch(config.VUE_APP_API_URL + 'job_applications', {
      $fetch(config.VUE_APP_API_URL_JOB + 'me/job_applications', {
        headers: {"Access-Token": user_data.value.tokens.access_token},
        params: the_params,

      }).then(res => {
        a_j_a_pageSize.value += res.limit; // add offset
        if (res.data.length) {
          a_j_a_job_applications.value = a_j_a_job_applications.value.concat(res.data); // concat in multiple array
        }
        dt_loading.value = false;
        j_app_hide_btn_load_more.value = a_j_a_job_applications.value.length < a_j_a_pageSize.value ? false : true;

        // -- tracking on google analytic --
        if (a_j_a_job_applications.value.length <= 10 && a_j_a_pageSize.value === 20) {  } // prevent likes post smaller than 10 and request two time
        else { track_google_analytics(a_j_a_pageSize.value > 10 ? a_j_a_pageSize.value : 0); }

      }).catch(e => {
        if (!e.response) {  } else if (e.response) {
          if (e.response.status === 401) { // retry
            if (reload_q_again_1.value <= 2) {
              reload_q_again_1.value += 1;
              check_new_auth_user();
              setTimeout(() => { manually_show_apply_jobs(); }, 3000);
            }
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            router.replace(localePath({name: 'index'}));
          }
        }
        dt_loading.value = false;
      });
    }

    // ---- store all type params ----
    function save_track_optional(type, data_params) {
      helper.params_make_condition(type, data_params);
    }

    // ---- track on google analytic ----
    function track_google_analytics (per_page) {
      // setTimeout(() => {
        let offset = per_page > 0 ? '?offset='+per_page : '';   // set offset of page if scroll get more data
        let page_path = route.path+offset;                // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href+offset;        // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
          page_title: meta_title_job_app.value,
          page_location: page_location,
          page_path: page_path,
        }
        // -- event on page --
        event('Apply_jobs', data);
        // -- page_view --
        pageview(data);
      // },50);
    }

    function clickPhone(type){
        if(type==='true'){
            ShowPhones.value = true
        }else{
            ShowPhones.value = false
        }
    }
    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
    // ---- ripple effect on UI ----
    function ripple() { setTimeout(function () { $(".arrow_back_nav,.cl_ripple").ripple(); }, 300); }
    // ---- check image error 404 must to show static image ----
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }

    const auth_user1 = useCookie('auth_user')
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Token": auth_user1.value.tokens.access_token
    }
    
    // await getAllResume();
    function clearData(){
        GetAll.value = ''
    }
    function clicPhone(){
      ShowPhone.value = true
    }
    function clicClose(){
      ShowPhone.value = false
    }

</script>
