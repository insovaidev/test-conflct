<template>
  <div>
    <div class="max_width_form min_h">
      <!-- loading -->
      <div v-if="loading_field" class="loading_back_ground" style="background: white;top: 50px;">
          <div class="loading_img" style="top: 10%;">
              <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
          </div>
      </div>
      <div v-if="loading" class="loading_back_ground">
          <div class="loading_img">
              <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
          </div>
      </div>
      <!-- /loading -->

      <!-- error connection -->
      <div class="col no_padding margin_below_app_bar" :class="connection_error ? '' :'d-none'">
          <div class="no_more_result p-2">
              <div class="p_bg_status">
                  <span class="fas fa-wifi size_icon_status"></span>
                  <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                  <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                  <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
              </div>
          </div>
      </div>

      <!-- button show Main Categories -->
      <div v-if="isDesktop" class="des_container d-none">
        <button @click="show_first_page" id="dt_show_main_cate" class="btn" aria-label="Show Category"></button>
      </div>

      <!-- category -->
      <div id="main_and_sub_categories" :class="!direct_to_add_form || route.params.id ? 'd-none' : ''">

        <!-- back one step on show category -->
        <div v-if="isDesktop" class="des_container mt-3 dt_back_post">
          <button @click="click_close_category" class="btn dt_border" aria-label="Back">
            <i class="ion-android-arrow-back"></i>
          </button>
        </div>

        <!-- App Bar -->
        <div v-if="!isDesktop" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isMobile ? 'fix_app_bar' : 'max_width_form  mt_80' " >
          <div v-if="!isMobile" class="title-post">
            <h1 class="fn_24">{{ locale==='km' ? 'ដាក់លក់' : 'Post Ad' }}</h1>
          </div>
          <div class="_div_nav bg_app_bar_header_" :class="isMobile ? '' : 'mt_' ">
            <div v-if="is_main && !isMobile" @click="click_close_category" class="_pad_col_icon">
              <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                <i class="ion-ios-arrow-back font_click_back"></i>
              </button>
            </div>
            <div v-if="isMobile" @click="click_close_category" class="_pad_col_icon">
              <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                <i class="ion-ios-arrow-back font_click_back"></i>
              </button>
            </div>
            <div class="col pl-1 l_h_con_title" :class="is_main && !isMobile ? '' : 'ms-3'">
              <p class="name_style truncate_wrap m-0"> {{ $t('message.choose_category') }} </p>
            </div>
          </div>
        </div>

        <!-- Body -->
        <!-- <div class="modal-body p-0 screen-content-desktop mt_80" :class="isDesktop ? 'des_container' : ''" > -->
        <div class="modal-body p-0 " :class="isMobile ? '' : 'w_1104 min_h'" >
          <!-- Main category -->
          <div v-if="!cate_parent_id" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding msg_history" :class="isDesktop ? 'dt_post_cat' : 'margin_below_app_bar'">
            <div :class="isMobile ? 'pt-5' : ''">
              <template v-for="category in categories.data" :key="category">
                <template v-if="category.parent === '0'">
                  <div class="m_background_main_category cur_sur h-v-mouse" @click="click_parent_cate(category.id, language === 'km' ? category.km_name : category.en_name)">
                    <div class="m_flex_style_category style_flex">
                      <div class="width_main_category">
                        <img :src="category.icon && category.icon.small ? category.icon.small.url : ''" class="m_with_height_category" :alt="language === 'km' ? category.km_name : category.en_name">
                      </div>
                      <div class="width_100">
                        <p class="truncate_wrap mt-3 m_search_font_name"> {{ language === 'km' ? category.km_name : category.en_name }} </p>
                      </div>
                      <div class="i_s_arrow_right">
                        <i class="ion-ios-arrow-forward m_icon_size_category"></i>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <!-- Sub category -->
          <div v-else class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding msg_history" :class="isDesktop ? 'dt_post_cat' : 'margin_below_app_bar'">
            <div :class="isMobile ? 'pt-5' : ''">
              <template v-for="sub_cate in categories.data" :key="sub_cate">
                <template v-if="parseInt(sub_cate.parent) === parseInt(cate_parent_id)">
                  <div class="cate-sub-child m_background_main_category cur_sur h-v-mouse"
                     @click="click_sub_cate({
                        main_name: main_cat_name,
                        parent_id: cate_parent_id,
                        sub_name: language === 'km' ? sub_cate.km_name : sub_cate.en_name,
                        sub_id: sub_cate.id,
                        sub_slug: sub_cate.slug,
                    })">
                    <div class="cate-s-c-1">
                      <div class="width_main_category">
                        <img :src="sub_cate.icon && sub_cate.icon.small ? sub_cate.icon.small.url : ''" :alt="language === 'km' ? sub_cate.km_name : sub_cate.en_name">
                      </div>
                      <p class="truncate_wrap"> {{ language === 'km' ? sub_cate.km_name : sub_cate.en_name }} </p>
                    </div>
                    <div class="cate-s-c-2"><i class="ion-ios-arrow-forward m_icon_size_category"></i></div>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- post_ads -->
      <div id="show_create_post" :class="!direct_to_add_form || route.params.id ? '' : 'd-none'">
        <!-- App Bar -->
        <div v-if="isMobile" class="col no_padding fix_app_bar">
          <div class="_div_nav bg_app_bar_header_">
            <div @click="goBack" class="_pad_col_icon">
              <button class="btn pt-1 pb-1 mr_5px" aria-label="Back">
                <i class="ion-android-arrow-back font_click_back"></i>
              </button>
            </div>
            <div class="col pl-0 l_h_con_title">
              <p v-if="re_post" class="name_style truncate_wrap mb-0 ml-2 text-left"> {{ $t('new_text.re_post') }} </p>
              <p v-else class="name_style truncate mb-0 ml-2 text-left"> {{ is_edit ? $t('lng.edit_post') : $t('lng.new_post') }} </p>
            </div>
          </div>
        </div>
        <div class="mb-20" :class="isMobile ? '' : 'mt-30'">
          <div class="post-ads-by-u-or-s" :class="isMobile ? '' : 'max_width_form'">
            <h1 v-if="!isMobile" class="fn_24">{{ locale==='km' ? 'ដាក់លក់' : 'Post Ad' }}</h1>
            <a v-if="data_user_select" @click="show_user_options" :class="isDesktop ? 'des_container dt_post_switch_user ' : ''"
              class="my_card" href="javascript:void(0)" rel="nofollow">
              <div class="col-11 p-0">
                <div class="_flex_">
                  <div class="u-or-s-img">
                    <img :src="data_user_select.img" alt="profile" class="img_profile">
                  </div>
                  <div class="u-or-s-con">
                    <p class="truncate u-or-s-p1">{{ data_user_select.name }}</p>
                    <p class="truncate u-or-s-p2">{{ data_user_select.username }}</p>
                  </div>
                </div>
              </div>
              <i v-if="!post_id" class="fas fa-caret-down u-or-s-icon"></i>
            </a>
          </div>
        </div>

        <!-- Body -->
        <div class="col no_padding" :class="connection_error ? 'd-none' : ''">
          <div class="max_width_form">
            <!-- Photo -->
            <div :class="fields && fields.photos ? 'large-12 columns p_pad_div pt-0' : 'large-12 columns p_pad_div d-none'">
              <div class="text-center p_bg_size my_card pt-0">
                <!-- <div class="screen-d dt_title_header px-0 pt-0 mb-3">
                <h1 class="pt-3 text-start">{{ $t('new_text.create_more_post') }}</h1>
                </div> -->
                <div class="style_flex p_pad_field">
                  <div class="col p-0 text-left">
                    <p class="p_title_font font_20px m-0"> {{ $t('lng.photo') }} </p>
                  </div>
                  <div class="col p-0 text-right">
                    <p class="p_title_font font_20px m-0">{{ image_array.length }}/{{ image_limit }}</p>
                  </div>
                </div>

                <div class="alert alert-danger alert-dismissible fade show" id="error_upload" role="alert" style="margin: 7px 0 0 0;display: none;padding: 4px 28px 4px 0;">
                  <!--<strong>Holy guacamole!</strong>--> <p class="m-0" id="error_text"></p>
                  <button @click="close_error_upload" type="button" class="close p-1" aria-label="Close" style="right: 6px!important;"> <!-- data-bs-dismiss="alert" aria-label="Close" -->
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="brows_file">
                  <a id="browse_post" href="javascript:void (0)" rel="nofollow" aria-label="Brows"></a>
                </div>
                <!-- photo -->
                <div v-if="image_array.length >= 1" @click="show_modal_change(image_array[0].file, '')" class="p_big_cover_img mt-2 cur_sur">
                  <!--<div v-if="image_array.length === 0"> <i class="far fa-images"></i> Add Photo </div>-->
                  <!-- show loading upload big -->
                  <img v-if="image_array[0].id && !image_array[0].file" v-bind:src="image_array[0].url_img" alt="file" class="img_product height_media border_ra_ p_img_loading_style">
                  <!-- show result item -->
                  <template v-else>
                    <img v-bind:src="image_array[0].url_img" alt="upload image" class="img_product height_media border_ra_">
                    <div class="p_remove_profile_img p_remove_profile_small p_img_cover_icon">
                      <i class="icon-ellipsis-vertical p_mr_icon_small"></i>
                    </div>
                  </template>
                </div>
                <div v-if="image_array.length > 1" class="p_small_cover_img">
                  <div class="style_flex">
                    <div v-for="i in image_limit-1" :key="i" class="child_small_cover_img cur_sur">

                      <template v-if="image_array[i] && image_array[i].url_img">
                        <!-- show loading upload small -->
                        <img v-if="image_array[i].id && !image_array[i].file" :src="image_array[i].url_img" alt="upload image" class="p_img_small_cover">
                        <!-- show result item -->
                        <div v-else @click="show_modal_change(image_array[i].file, 'show_op_set_as_cover')">
                          <img :src="image_array[i].url_img" alt="khmer24 upload" class="p_img_small_cover">
                          <div class="p_remove_profile_img p_remove_profile_small">
                            <i class="icon-ellipsis-vertical p_mr_icon_small"></i>
                          </div>
                        </div>
                      </template>

                      <div v-else @click="show_brows" id="browse_1" class="empty_small_cover_img">
                        <i class="fas fa-plus"></i>
                      </div>

                    </div>
                  </div>
                </div>

                <!-- preview image upload -->
                <a href="" rel="nofollow" ref="ref_picture" aria-label="Photo" id="view_full_pic_dynamic" data-fancybox="photo"></a> <!-- data-fancybox  view full picture dynamic-->

                <!-- big brows -->
                <div id="browse_2">
                  <div v-if="image_array.length === 0" class="mt-2">
                    <div @click="show_brows" class="p_btn_brows_big cur_sur">
                      <i class="far fa-images"></i>
                      {{ $t('new_text_1.add_photo') }}
                    </div>
                  </div>
                </div>
                <!-- small brows -->
                <div v-if="image_limit > 1 && image_limit !== image_array.length" id="browse_3"> <!-- check limit upload of post -->
                  <div v-if="image_array.length >= 1" class="mt-2">
                    <div @click="show_brows" class="p_btn_brows cur_sur">
                      <i class="far fa-images"></i>
                      {{ $t('new_text_1.add_photo') }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <!-- Post Detail -->
            <form id="post_ads">

              <div class="large-12 columns p_pad_div">
                <div class="p_bg_size my_card pt-0">
                  <div class="text-left p_pad_field">
                    <p class="p_title_font font_20px m-0"> {{ $t('lng.detail_post') }} </p>
                  </div>
                  <!-- Title -->
                  <div class="mb-3 mt-3">
                    <label class="label"> {{ $t('lng.title') }} <b class="text-danger">*</b> </label>
                    <input type="text" autocomplete="off" maxlength="255" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="ad_headline" minlength="5" v-model="form['ad_headline']">
                  </div>
                  <div v-if="error_title" class="form_error_style"> <span> {{ $t('validation.error_title') }} </span> </div>
                  <div class="form_error_style d-none" id="ad_headline"> <span id="msg_ad_headline"></span> </div>

                  <!-- Choose a Category -->
                  <label class="label full_width text-left"> {{ $t('message.choose_category') }} <b class="text-danger">*</b> </label>
                  <div v-if="!main_cat_name && !sub_cat_name" @click="show_main_cate"
                       :class="form['cateid'] ? 'p_selection p_sel_1 text-left form-control line_height_category field-height' : 'p_selection p_sel_2 text-left form-control field-height'">
                    <input type="hidden" v-model="form['cateid']" name="category_select">
                  </div>
                  <div v-else class="_flex_ mb-2 cur_sur" @click="show_sub_cate">
                    <p class="m-0 font_15 font_light_bold">{{ main_cat_name }} &nbsp; &gt; &nbsp; {{ sub_cat_name }}</p>
                    <button type="button" class="btn btn-sm btn-k24-primary pt-6 text-white p_m_btn_category"> {{ $t('message.change') }}  </button>
                    <input type="hidden" v-model="form['cateid']" name="category_select">
                  </div>

                  <!-- check loop fields -->
                  <div v-if="fields && fields['fields']">
                    <template v-for="( f, in_sub ) in fields['fields']" :key="in_sub">
                      <!-- if type switch -->
                      <div v-if="f.type === 'switch'">
                        <!-- Availability -->
                        <div class="mb-3">
                          <label class="label"> {{ f.title }}</label>
                          <div class="height_switch" :class="isMobile ? 'field-height' : 'dt-field-height'">
                            <div class="custom-switch form-switch form-check d-flex p_" >
                              <input type="checkbox" class="form-check-input check_box_h" v-model="form[f.fieldname]" :name="f.slug" :id="f.slug">
                              <label class="custom-control-label full_width ms-2 pt_2 font_16" :for="f.slug" > {{ form[f.fieldname] ? 'Yes' : 'No' }}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- if type select -->
                      <div v-if="f.type === 'select'">
                        <!-- select don't have chained_field -->
                        <div v-if="!f.chained_field" class="mb-3 position_relative">
                          <!-- select have icon -->
                          <template v-if="f.display_icon">
                            <label class="label text-left full_width"> {{ f.title }} <b v-if="f.validation && f.validation.required" class="text-danger">*</b> </label>
                            <div class="p_selection p_sel_2 text-left m-0" :class="isMobile ? 'field-height' : 'dt-field-height'" @click="show_modal_field_icon(f)" id="car_brand">
                              <template v-for="p in f.options" :key="p">
                                <p :class="isMobile ? 'm-1' : ''" v-if="form[f.fieldname] === p.fieldvalue"> {{ p.fieldtitle }} </p>
                              </template>
                            </div>
                            <i class="ion-android-arrow-dropdown s_icon_in_select_option mar_icon_drop" :class="isMobile ? '' : 'pt-1'"></i>
                            <input type="text" class="d-none" v-if="form[f.fieldname] === ''" :required="f.validation && f.validation.required ? true : false"> <!-- for error msg only -->
                          </template>
                          <!-- simple select -->
                          <template v-else>
                            <label class="label"> {{ f.title }} <b v-if="f.validation && f.validation.required" class="text-danger">*</b> </label>
                            <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                            <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" @change="change_field(f.fieldname, 'clear_sub')" :name="f.fieldname"
                                    :required="f.validation && f.validation.required ? true : false" v-model="form[f.fieldname]">
                              <option value="">  </option>
                              <option v-for="option in f.options" :key="option" v-bind:value="option.fieldvalue">
                                {{ option.fieldtitle }}
                              </option>
                            </select>
                          </template>
                          <!-- error msg select -->
                          <div class="form_error_style d-none m-0" :id="f.fieldname"> <span :id="'msg_'+f.fieldname"></span> </div>
                        </div>
                        <!-- select that have chained_field -->
                        <div v-if="f.chained_field" class="mb-3 position_relative">
                          <label class="label"> {{ f.title }} <b v-if="f.validation && f.validation.required" class="text-danger">*</b> </label>
                          <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                          <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" :disabled="!form[f.chained_field] || arr_ad_model.length === 0"
                                  :required="f.validation && f.validation.required ? true : false" :name="f.fieldname" v-model="form[f.fieldname]">
                            <option value="">  </option>
                            <template v-if="form[f.chained_field] && f.options.length > 0">
                              <option v-for="option in arr_ad_model" :key="option" v-bind:value="option.fieldvalue">
                                {{ option.fieldtitle }}
                              </option>
                            </template>
                          </select>
                          <!-- error msg -->
                          <div class="form_error_style d-none m-0" :id="f.fieldname"> <span :id="'msg_'+f.fieldname"></span> </div>
                        </div>

                      </div>
                      <!-- if type radio (condition) -->
                      <div v-else-if="f.type === 'radio'" class="mb-3" :id="f.fieldname">
                        <label class="label mb-0"> {{ f.title }} <b v-if="f.validation  && f.validation.required" class="text-danger">*</b> </label>
                        <div class="radio-new-or-second-hand text-center row m-0">
                          <div v-for="va in f.options" :key="va" class="col p_pad_radio_option">
                            <input type="radio" :id="va.fieldvalue" :name="f.fieldname" v-model="form[f.fieldname]" :value="va.fieldvalue">
                            <label :for="va.fieldvalue"><p class="m-0">{{ va.fieldtitle }}</p></label> <!-- :class="va.fieldvalue === 'new' ? 'me-1' : 'ml-1'" -->
                          </div>
                        </div>
                        <div class="form_error_style m-0"><span :id="'msg_'+f.fieldname"></span></div>
                      </div>
                      <!-- if type multiple_text -->
                      <div v-else-if="f.type === 'multiple_text'" class="mb-3">
                        <div class="_flex_">
                          <div class="col p-0">
                            <label class="label"> {{ f.title }} <b v-if="f.validation  && f.validation.required" class="text-danger">*</b> </label>
                            <input v-on:keydown="key_up_multi_text" autocomplete="off" type="text" id="multi_text" :name="f.fieldname" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"> <!-- v-model="form[f.fieldname]" -->
                          </div>
                          <div @click="add_multi_text" class="p-0 text-center parent_color" style="margin: 33px 10px 0 20px;">
                            <i class="fas fa-plus-square font_32"></i>
                          </div>
                        </div>
                        <ul v-if="value_multi_text.length > 0" class="p-0">
                          <li @click="remove_multi_text(text)" v-for="text in value_multi_text" :key="text" class="multi_text">
                            <p class="m-0 break_word full_width font_15"> {{ text }} </p>
                            <i class="fas fa-minus-circle text-danger ml-2"></i>
                          </li>
                        </ul>
                      </div>
                      <!-- if type text -->
                      <div v-else-if="f.type === 'text'" class="mb-3">
                        <label class="label"> {{ f.title }} <b v-if="f.validation  && f.validation.required" class="text-danger">*</b> </label>
                        <input v-if="f.validation && f.validation.numeric" type="number" v-bind:placeholder="f.prefix ? f.prefix.text : ''"
                               :required="f.validation  && f.validation.required ? true : false" :name="f.fieldname" :id="f.fieldname" pattern="[0-9]*" decimal="true"
                               @keypress="onlyNumber" v-model="form[f.fieldname]" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" autocomplete="off">
                        <input v-else type="text" :required="f.validation  && f.validation.required ? true : false" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"
                               :name="f.fieldname" :id="f.fieldname" v-model="form[f.fieldname]" autocomplete="off">
                        <!-- error msg -->
                        <div class="form_error_style d-none m-0" v-bind:id="f.fieldname"> <span v-bind:id="'msg_'+f.fieldname"></span> </div>
                      </div>
                      <!-- if type multiple_select -->
                      <div v-else-if="f.type === 'multiple_select'" class="mb-3">
                        <div class="text-left" style="margin: 0 0 -5px 0;">
                          <label class="label"> {{ f.title }} <b v-if="f.validation && f.validation.required" class="text-danger">*</b> </label>
                        </div>
                          <Multiselect
                              :required="f.validation && f.validation.required ? true : false"
                              :name="f.fieldname"
                              :id="f.fieldname"

                              v-model="value"
                              mode="tags"
                              :close-on-select="false"
                              :searchable="true"
                              :create-option="false"
                              :options="options"
                          />
                      </div>
                      <!-- if type textarea -->
                      <div v-else-if="f.type === 'textarea'" class="mb-3">
                        <label class="label"> {{ f.title }} <b v-if="f.validation && f.validation.required" class="text-danger">*</b> </label>
                        <textarea class="form-control more_border" rows="3" id="address" :required="f.validation && f.validation.required ? true : false"
                                  :name="f.fieldname" v-bind:placeholder="f.title" v-model="form[f.fieldname]"></textarea>
                        <!-- error msg -->
                        <div class="form_error_style d-none m-0" v-bind:id="f.fieldname"> <span v-bind:id="'msg_'+f.fieldname"></span> </div>
                      </div>
                    </template>
                  </div>

                  <!-- check loop prices -->
                  <div v-if="fields && fields['prices']">
                    <template v-for="( f, in_sub ) in fields['prices']" :key="in_sub">
                      <!-- if have radio discount -->
                      <div v-if="f.subfix && f.subfix.type === 'radio'" class="mb-3">
                        <div class="style_flex">
                          <div class="col p-0">
                            <label class="label"> {{ f.title }} <b v-if="f.validation  && f.validation.required" class="text-danger">*</b> </label>
                            <input type="number" pattern="[0-9]*" decimal="true" v-bind:placeholder="f.prefix ? f.prefix.text : ''" :required="f.validation  && f.validation.required ? true : false"
                                   :name="f.fieldname" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" @keypress="onlyNumber" v-model.number="form[f.fieldname]"> <!-- :id="f.fieldname" -->
                          </div>
                          <div class="p_discount_type">
                            <div class="radio-toolbar" :class="isMobile ? 'field-height' : 'dt-field-height'"> <!-- checked -->
                              <template v-for="va in f.subfix.options" :key="va">
                                <input type="radio" :id="va.value" v-model="form['discount_type']" :value="va.value">
                                <label :for="va.value">{{ va.title }}</label>
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- error msg -->
                        <div class="form_error_style d-none m-0" v-bind:id="f.fieldname"> <span v-bind:id="'msg_'+f.fieldname"></span> </div>
                      </div>
                      <div v-else class="mb-3">
                        <label class="label"> {{ f.title }} <b v-if="f.validation  && f.validation.required" class="text-danger">*</b> </label>
                        <!-- set type to text ban regex check know , or . symbol and set pattern and inputmode to show keyboard number in mobile -->
                        <input v-if="f.validation && f.validation.numeric" type="text" v-bind:placeholder="f.prefix ? f.prefix.text : ''"
                               :min="f.validation && f.validation.greater_than ? f.validation.greater_than : (f.validation.greater_than_equal_to ? f.validation.greater_than_equal_to : '0.01')"
                               :required="f.validation  && f.validation.required ? true : false" :name="f.fieldname" id="id_add_price" pattern="[0-9]*" inputmode="decimal"
                               v-on:keyup="onlyNumber_with_dot" v-model="form[f.fieldname]" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" autocomplete="off"> <!-- pattern="[0-9]*" decimal="true" :id="f.fieldname" -->

                        <input v-else type="text" :required="f.validation  && f.validation.required ? true : false" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"
                               :name="f.fieldname" :id="'field_'+f.fieldname" v-model="form[f.fieldname]" autocomplete="off">
                        <!-- error msg -->
                        <div class="form_error_style d-none m-0" v-bind:id="f.fieldname"> <span v-bind:id="'msg_'+f.fieldname"></span> </div>
                      </div>
                    </template>
                  </div>

                  <!-- Delivery -->
                  <div v-if="fields && fields.deliveries" class="mb-3">
                    <label class="label"> {{ fields.deliveries.shipping.title }} </label>
                    <div class="height_switch" :class="isMobile ? 'field-height' : 'dt-field-height'">
                      <div class="custom-switch form-switch form-check d-flex p_" >
                        <input type="checkbox" @click="change_delivery" class="form-check-input check_box_h" v-model="form['shipping']" name="shipping" id="customSwitch1">
                        <label class="custom-control-label full_width ms-2 pt_2 font_16" for="customSwitch1" > {{ form['shipping'] ? 'Yes' : 'No' }} </label>
                      </div>
                    </div>
                  </div>

                  <!-- Descriptions -->
                  <div class="mb-3">
                    <label class="label"> {{ $t('message.description') }} <b class="text-danger">*</b> </label>
                    <textarea class="form-control more_border" rows="5" minlength="15" name="description" v-model="form['ad_text']"></textarea>
                    <div v-if="error_description" class="form_error_style m-0">
                      <span> {{ $t('validation.error_description') }} </span>
                    </div>
                    <div class="form_error_style d-none m-0" id="ad_text"> <span id="msg_ad_text"></span> </div>
                  </div>

                  <!-- Locations -->
                  <div v-if="fields && fields.locations">
                    <!-- province, district or commune -->
                    <template v-if="fields.locations.province">
                      <template v-if="count_location === 1">
                        <div class="mb-3 position_relative">
                          <label class="label"> {{ fields.locations.province.title }}
                            <b v-if="fields['locations'].province.validation && fields['locations'].province.validation.required" class="text-danger">*</b>
                          </label>
                          <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                          <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="sel_province"
                                  :required="fields.locations.province.validation && fields.locations.province.validation.required ? true : false"
                                  :name="fields.locations.province.validation && fields.locations.province.validation.required ? 'province' : ''"
                                  @change="show_change_data_location($event, 'province', '')" v-model="form['province']">
                            <option value=""> {{ fields.locations.province.title }} </option>
                            <option v-for="location in locations.data" :key="location" v-bind:value="location.id" v-bind:data-slug="location.slug">
                              {{ language === 'km' ? location.km_name : location.en_name }}
                            </option>
                          </select>
                        </div>
                      </template>
                      <div v-else class="mb-3 position_relative">
                        <label v-if="fields.locations.province.slug === 'province'" class="label text-left full_width">
                          {{ $t('new_text.location') }} <b v-if="fields.locations.province.validation && fields.locations.province.validation.required" class="text-danger">*</b>
                        </label>
                        <div v-if="fields.locations.province.slug === 'province'" @click="choose_location('show')" name="location" id="location" class="cur_sur p_selection text-left m-0" :class="isMobile ? (province_name ? 'p_sel_1 field-height' : 'p_sel_2 field-height' ) : (province_name ? 'p_sel_1 dt-field-height' : 'p_sel_2 dt-field-height' )">
                          <p v-if="province_name" class="truncate m-0 font_15 p_pad_dis_1 width_90" :class="isMobile ? '' : 'pt-1'">
                            {{ province_name ? province_name : '' }}
                            {{ district_name ? ' , '+district_name : '' }}
                            {{ commune_name ? ' , '+commune_name : '' }}
                          </p>
                          <p v-if="!province_name" class="text_grey" :class="isMobile ? 'm-1 ' : ''">{{ $t('new_text.choose_location') }}</p>
                        </div>
                        <i class="ion-android-arrow-dropdown s_icon_in_select_option mar_icon_drop" :class="isMobile ? '' : 'pt-1'"></i>
                        <!-- check validation field location because it is pop up -->
                        <div v-if="fields.locations">
                          <template v-for="( val_loc, index_loc ) in fields.locations" :key="index_loc">
                            <template v-if="index_loc === 'province' || index_loc === 'district' || index_loc === 'commune'">
                              <input type="hidden" :required="val_loc.validation" :value="province_name" :name="val_loc.fieldname">
                              <div id="show_error_required_location"></div>
                            </template>
                          </template>
                        </div>
                      </div>
                    </template>

                    <!-- Address -->
                    <template v-if="fields.locations.address">
                      <div class="mb-3">
                        <label class="label"> {{ fields.locations.address.title }} <b v-if="fields.locations.address.validation" class="text-danger">*</b> </label>
                        <!--<label class="label"> {{ fields.locations.address.title }} </label>-->
                        <input type="text" :required="fields.locations.address.validation  && fields.locations.address.validation.required ? true : false" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"
                               :name="fields.locations.address.fieldname" :id="'field_'+fields.locations.address.fieldname" v-model="form[fields.locations.address.fieldname]" autocomplete="off">
                        <!-- error msg -->
                        <div class="form_error_style d-none m-0" v-bind:id="fields.locations.address.fieldname"> <span v-bind:id="'msg_'+fields.locations.address.fieldname"></span> </div>
                      </div>
                    </template>

                    <!-- Map -->
                    <div v-if="fields.locations.map" class="mb-3">
                      <!--<label class="label"> {{ fields.locations.map.title }} <b v-if="fields.locations.map.validation" class="text-danger">*</b> </label>-->
                      <a v-if="show_map" href="javascript:void(0)" rel="nofollow" aria-label="Map" class="mb-2 a_show_google_map position_relative">
                        <i @click.prevent="remove_lat_lng" class="fas fa-times-circle p_icon_remove_map"></i>
                        <div @click="show_location">
                          <ClientOnly>
                            <div id="show_new_map_post_static" class="map_disable_show"></div>
                          </ClientOnly>
                        </div>
                        <p @click="show_location" class="a_show_map_title">{{ $t('message.change_location') }}</p>
                      </a>
                      <div v-else class="a_con_empty_map" @click="show_location">
                        <a href="javascript:void(0)" rel="nofollow" class="a_edit_show_empty_map">
                          <div class="map_box btn_showMap">
                            <div class="text">
                              <span class="fa fa-map-marked-alt"></span>
                              {{ $t('new_text_3.set_google_map') }}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Contact Detail -->
              <div class="large-12 columns p_pad_div">
                <div class="p_bg_size my_card pt-0">
                  <div class="text-left p_pad_field">
                    <p class="p_title_font font_20px m-0"> {{ $t('lng.contact_detail') }} </p>
                  </div>
                  <!-- First Name -->
                  <div class="mb-3 mt-3">
                    <label class="label"> {{ $t('lng.name') }} <b class="text-danger">*</b> </label>
                    <input v-on:keyup="keymonitor" v-model="form['name']" type="text" autocomplete="off" maxlength="255" name="name" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                  </div>
                  <div v-if="error_name" class="form_error_style"> <span> {{ $t('validation.error_name') }} </span> </div>
                  <div class="form_error_style d-none" id="name"> <span id="msg_name"></span> </div>
                  <!-- Phone Number -->
                  <template v-for="(p_n, index) in phone" :key="p_n">
                    <div v-if="index === 0" class="style_flex mb-3 mt-4">
                      <div :class="phone.length === 1 ? 'col-10 p-0' : 'col-12 p-0'">
                        <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+"  v-on:keyup="keymonitor" v-model="form['phone[0]']" v-bind:placeholder="$t('message.phone_1')" required
                               class="form-control more_border" :class="isMobile ? (error_phone1 || error_check_p1 ? 'phone_error error_border field-height' : 'field-height') : error_phone1 || error_check_p1 ? 'phone_error error_border dt-field-height': 'dt-field-height'">
                        <span v-if="error_phone1 || error_check_p1" class="text-danger float-start font_13"> {{ $t('validation.error_valid_phone_1') }} </span>
                      </div>
                      <div v-if="phone.length === 1" @click="add_field_phone_number" class="col-2 p-0 div_add text-center cur_sur">
                        <span class="fas fa-plus-circle font_22 parent_color " :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                      </div>
                    </div>
                    <div v-if="index === 1" class="style_flex mb-3">
                      <div :class="phone.length === 2 ? 'col-10 p-0 position_relative' : 'col-12 p-0 position_relative'">
                        <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="form['phone[1]']" :placeholder="$t('message.phone_2')" id="phone2"
                               ref="input1" class="form-control more_border pad_right_text_icon" :class="isMobile ? (error_phone2 ? 'phone_error error_border field-height' : 'field-height') : error_phone2 ? 'phone_error error_border dt-field-height': 'dt-field-height'">
                        <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field  cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                        <span v-if="error_check_p2" class="text-danger float-start font_13 mb-2"> {{ $t('validation.error_valid_phone_2') }} </span>
                      </div>
                      <div v-if="phone.length === 2" @click="add_field_phone_number" class="col-2 p-0 div_add text-center cur_sur">
                        <span class="fas fa-plus-circle font_22 parent_color " :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                      </div>
                    </div>
                    <div v-if="index === 2" class="style_flex mb-3">
                      <div class="col-12 p-0 position_relative">
                        <input type="text" inputmode="numeric" pattern="[-+]?[0-9]*[.,]?[0-9]+" v-on:keyup="keymonitor" v-model="form['phone[2]']" v-bind:placeholder="$t('message.phone_3')" id="phone3"
                               ref="input2" class="form-control more_border pad_right_text_icon" :class="isMobile ? (error_phone3 ? 'phone_error error_border field-height' : 'field-height') : error_phone3 ? 'phone_error error_border dt-field-height': 'dt-field-height'">
                        <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field  cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                        <span v-if="error_check_p3" class="text-danger float-start font_13 mb-2"> {{ $t('validation.error_valid_phone_3') }} </span>
                      </div>
                    </div>
                  </template>
                  <!-- Email -->
                  <div class="mb-3 mt-3">
                    <label class="label"> {{ $t('lng.email') }} </label>
                    <input type="text" v-on:keyup="email_monitor" v-model="form['email']" v-bind:placeholder="$t('lng.email')"
                           class="form-control more_border" :class="isMobile ? (error_check_email ? 'phone_error error_border field-height' : 'field-height') : error_check_email ? 'phone_error error_border dt-field-height': 'dt-field-height'">
                    <span v-if="error_check_email" class="text-danger float-start font_13 mb-2"> {{ $t('validation.error_valid_email') }} </span>
                  </div>
                </div>
              </div>
              <!-- button submit post -->
              <div class="text-center" :class="isMobile ? 'p-3' : 'pt-3'">
                <button class="btn fns-17 btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="click_submit"> {{ $t('message.submit') }} </button>
                <p class="p_font_rule"> {{ $t('lng.rule_post') }} </p>
                <a href="javascript:void(0)" rel="nofollow" @click="show_posting_rule" class="font_bold parent_color"> {{ $t('lng.read_rule') }} </a>
              </div>

            </form>
          </div>
        </div>
      </div>


      <!-- show success message -->
      <div class="toast style_toast d-none toast_z_index">
        <div class="toast-header header_padding_toast">
          <strong class="me-auto style_flex">
            <i class="fas fa-exclamation-circle text-danger font_22"></i>
            <p class="m-0 ml-2 font_15 text-danger">{{ title_rule }}</p>
          </strong>
          <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
            <span aria-hidden="true" class="text-danger">&times;</span>
          </button>
        </div>
        <div v-if="toast_error_vali_show.length > 0" class="toast-body" style="background: #fde7e7">
          <p v-for="error_validation in toast_error_vali_show" :key="error_validation" class="m-0 ml-2 text-danger"> - {{ error_validation }}. </p>
        </div>
      </div>
      <!-- /show success message -->

      <!-- Modal show error connection -->
      <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
        <div class="modal-dialog max_width_form mg-mo-auto" role="document">
          <div class="modal-content">
            <div class="modal-body break_word_ show_text_status p-0" style="padding: 15px!important;">
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

      <!-- Modal show user options -->
      <div class="modal " :class="isMobile ? 'style_full_screen' : ''" id="show_modal_user_options" tabindex="-1" role="dialog"> <!-- fade -->
        <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto m_w'" role="document">
          <div class="modal-content" :class="isMobile ? '' : 'rounded'"> 
            <div :class="isMobile ? 's_content overflow_class' : 'dt_modal_width'">
              <!-- header -->
              <div class="de-list-quick-chat">
                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                <p class="modal-title font_16 width_100"> {{ $t('new_text_2.choose_creator') }} </p>
                <button class="btn de-btn-plus font_15 me-2" aria-label="Disable" disabled></button>
              </div>
              <!-- content -->
              <div class="modal-body de-content-modal-option">
                <ul v-if="store_info" class="list-unstyled bg-white mb-0">
                  <!-- user -->
                  <li @click="selected_user('', 'user')" class="full_field_tag">
                    <a href="javascript:void(0)" rel="nofollow">
                      <div class="col p-0">
                        <div class="_flex_ post-ads-user-modal">
                          <div class="u-or-s-img">
                            <img :src="auth_user && auth_user.user && auth_user.user.photo ? auth_user.user.photo.medium.url : empty_img_post" class="img_profile" alt="profile" @error="imageUrlAlt_post">
                          </div>
                          <div class="u-or-s-con">
                            <p class="truncate u-or-s-p1">{{ auth_user && auth_user.user.name ? auth_user.user.name : '' }}</p>
                            <p class="truncate u-or-s-p2">{{ auth_user && auth_user.user.username ? auth_user.user.username : '' }}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- store -->
                  <li v-for="user in store_info" :key="user" @click="selected_user(user.id, 'store')" class="full_field_tag">
                    <a rel="nofollow" href="javascript:void(0)">
                      <div class="col p-0">
                        <div class="_flex_ post-ads-user-modal">
                          <div class="u-or-s-img">
                            <img :src="user && user.logo ? user.logo.medium.url : empty_img_post" alt="logo" class="img_profile" @error="imageUrlAlt_post">
                          </div>
                          <div class="u-or-s-con">
                            <p class="truncate u-or-s-p1">{{ user.title ? user.title : '' }}</p>
                            <p class="truncate u-or-s-p2">{{ user.username ? user.username : '' }}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Modal show user options -->

      <!-- modal Post Filter -->
      <div class="modal fade" :class="isMobile ? 'style_full_screen' : 'dt_filter_modal'" id="modal_location" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog " :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
          <div class="modal-content" :class="isMobile ? 'modal_content_style' : 'rounded'">
            <!-- modal header -->
            <div class="_div_nav bg_app_bar_header_ fix_app_bar">
              <!-- back locations -->
              <div v-if="type_loc" class="_pad_col_icon">
                <button @click="click_black_loc" class="btn back-btn-app-bar">
                  <i class="ion-ios-arrow-back font_click_back"></i>
                </button>
              </div>
              <!-- close modal -->
              <div v-else id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                <button data-bs-dismiss="modal" aria-label="Close" class="btn clear-btn-app-bar">
                  <i class="icon-clear font_click_back"></i>
                </button>
              </div>
              <div class="col p_pad_title">
                <div class="text-center">
                  <h1 class="name_style truncate pt-1 pb-1">
                    <template v-if="type_loc === 'district'">{{ $t('new_text_3.khan_or_district') }}</template>
                    <template v-else-if="type_loc === 'commune'">{{ $t('new_text_3.sangkat_or_commune') }}</template>
                    <template v-else>{{ $t('new_text_3.city_or_province') }}</template>
                    <!--{{ $t('new_text.location') }}-->
                  </h1>
                </div>
              </div>
              <div class="_pad_col_icon">
                <button @click="clear_filter" class="btn text-white p_pad_clear">{{ $t('message.clear') }}</button>
              </div>
            </div>
            <!-- modal body -->
            <div class="modal-body" :class="isMobile ? 'm_bottom_app_bar' : 'p-0 '">

              <div>
                <ul class="list-unstyled bg-white">
                  <li v-for="loc in mul_arr_location" :key="loc" class="full_field_tag cur_sur h-v-mouse" @click="show_next_location(loc)">
                    {{ language === 'km' ? loc.km_name : loc.en_name }}
                    <i class="float-end" :class="loc.id === old_arr_loc.loc || loc.id === old_arr_loc.dis || loc.id === old_arr_loc.com ?
                    'fas fa-check-circle color_sub_icon mt-1 parent_color' : 'ion-ios-arrow-forward text_grey'"></i>
                  </li>
                  <br><br><br>
                </ul>
              </div>

              <div class="form-group p_div_pad_color max_width_form d-none">
                <template v-if="fields && fields.locations">
                  <template v-for="( val_loc, index_loc ) in fields.locations" :key="index_loc">

                    <div v-if="val_loc.slug === 'province'" class="mb-3 position_relative">
                      <label class="label"> {{ val_loc.title }} <b v-if="val_loc.validation" class="text-danger">*</b> </label>
                      <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                      <select class="form-control more_border field-height" id="sel_province" @change="show_change_data_location($event, 'province', '')" v-model="form['province']">
                        <option value=""> {{ val_loc.title }} </option>
                        <option v-for="location in locations.data" :key="location" v-bind:value="location.id" v-bind:data-slug="location.slug" v-bind:data-name="language === 'km' ? location.km_name : location.en_name">
                          {{ language === 'km' ? location.km_name : location.en_name }}
                        </option>
                      </select>
                      <!-- error msg -->
                      <div class="form_error_style d-none m-0" v-bind:id="val_loc.fieldname"> <span v-bind:id="'msg_'+val_loc.fieldname"></span> </div>
                    </div>
                    <div v-if="val_loc.slug === 'district'" class="mb-3 position_relative">
                      <label class="label"> {{ val_loc.title }} <b v-if="val_loc.validation" class="text-danger">*</b> </label>
                      <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                      <select class="form-control more_border field-height" id="sel_district" :disabled="!form['province']" @change="show_change_data_location($event, 'district', '')" v-model="form['district']">
                        <option value=""> {{ val_loc.title }} </option>
                        <option v-for="dis in districts" :key="dis" v-bind:value="dis.id" v-bind:data-slug="dis.slug" v-bind:data-name="language === 'km' ? dis.km_name : dis.en_name">
                          {{ language === 'km' ? dis.km_name : dis.en_name }}
                        </option>
                      </select>
                      <!-- error msg -->
                      <div class="form_error_style d-none m-0" v-bind:id="val_loc.fieldname"> <span v-bind:id="'msg_'+val_loc.fieldname"></span> </div>
                    </div>
                    <div v-else-if="val_loc.slug === 'commune'" class="mb-3 position_relative">
                      <label class="label"> {{ val_loc.title }} <b v-if="val_loc.validation" class="text-danger">*</b> </label>
                      <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                      <select class="form-control more_border field-height" id="sel_commune" :disabled="!form['district']" v-model="form['commune']">
                        <option value=""> {{ val_loc.title }} </option>
                        <option v-for="com in communes" :key="com" v-bind:value="com.id" v-bind:data-slug="com.slug" v-bind:data-name="language === 'km' ? com.km_name : com.en_name">
                          {{ language === 'km' ? com.km_name : com.en_name }}
                        </option>
                      </select>
                      <!-- error msg -->
                      <div class="form_error_style d-none m-0" v-bind:id="val_loc.fieldname"> <span v-bind:id="'msg_'+val_loc.fieldname"></span> </div>
                    </div>

                  </template>
                </template>
              </div>
            </div>
            <!--<div class="nav p_div_apply_filter">
              <button @click="click_apply_location" type="button" class="btn btn-sm form-control custom_btn_ max_width_form bg_orange font_17 font_bold text-white">
                <p class="m_text_btn"> {{ $t('new_text.apply') }} </p>
              </button>
            </div>-->
          </div>
        </div>
      </div>
      <!-- /modal Post Filter -->

      <!-- Modal set and change image of post -->
      <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_set_change_image" tabindex="-1" role="dialog">
        <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
          <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
            <div :class="isMobile ? 'modal_bottom_screen' : 'p-3'">
              <div class="option_selected">
                <div class="modal-body p-0">
                  <ul class="list-unstyled mobile_modal_actions_container" id="list-phone-modal">
                    <li @click="view_full_image(photo_name)" class="mobile_modal_action">
                      <a class="h-v-mouse cur_sur m-auto" rel="nofollow">
                        <p class="color_reason m-0">{{ $t('new_text.view_as_picture') }}</p>
                      </a>
                    </li>
                    <li v-if="is_cover" @click="set_as_cover(photo_name)" class="mobile_modal_action">
                      <a  class="h-v-mouse cur_sur m-auto" rel="nofollow">
                        <p class="color_reason m-0">{{ $t('new_text.set_as_cover') }}</p>
                      </a>
                    </li>
                    <li @click="remove_img(photo_name)" class="mobile_modal_action">
                      <a class="h-v-mouse cur_sur bor_bot_unset m-auto" rel="nofollow">
                        <p class="text-danger m-0">{{ $t('new_text.remove') }}</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`message.cancel`) }}</button>
              <!-- <div class="a_cancel_btn_modal_bg">
                <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                  <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Modal show field have icon -->
      <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="show_modal_field_have_icon" tabindex="-1" role="dialog"> <!-- fade -->
        <div class="modal-dialog " :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-scrollable m-auto m_w'" role="document">
          <div class="modal-content" :class="isMobile ? '' : 'rounded'"> <!-- animate-bottom -->
            <div v-if="detail_field" :class="isMobile ? 's_content overflow_class' : 'dt_modal_width'">
              <!-- header -->
              <div class="de-list-quick-chat">
                <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                <p class="modal-title font_16 width_100"> {{ detail_field.title }} </p>
                <button class="btn de-btn-plus font_15" @click="clear_select_field_value(detail_field.fieldname, '')">
                  {{ $t('message.clear') }}
                </button>
              </div>
              <!-- content -->
              <div v-if="detail_field.options.length > 0" class="modal-body de-head-quick_chat">
                <ul class="list-unstyled bg-white">
                  <li v-for="field in detail_field.options" :key="field" @click="select_field_value(detail_field.fieldname, field.fieldvalue)" class="icon_field_tag h-v-mouse">
                    <div class="drop-field-post">
                      <div class="cate-s-c-1">
                        <div v-if="detail_field.display_icon" class="width_main_category">
                          <img :src="field.icon && field.icon.medium ? field.icon.medium.url : ''" alt="icon">
                        </div>
                        <p class="truncate_wrap"> {{ field.fieldtitle }} </p>
                      </div>
                      <div v-if="form[detail_field.fieldname] === field.fieldvalue" class="cate-s-c-2">
                        <i class="fas fa-check-circle parent_color"></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal show google map -->
      <div  class="modal fade" :class="isMobile ? 'fade style_full_screen toast_z_index u_safety_bg' : ''" id="show_modal_google_map" tabindex="-1" role="dialog">
        <div class="modal-dialog " :class="isMobile ? 'modal_dialog_style' : 'modal_dialog_styles' " role="document">
          <div class="modal-content " :class="isMobile ? 'animate-bottom' : 'rounded'">
            <div :class="isMobile ? ' s_content overflow_class' : ''">
              <!-- content -->
              <div class="modal-body map_modal_content chats_map_style">
                <div v-if="data_lat && data_lng" @click="home_location" class="p_icon_my_location_in_map map_icon_home">
                  <i class="fas fa-home"></i>
                </div>
                <div @click="show_current_location('current_loc')" class="p_icon_my_location_in_map">
                  <i class="icon-target"></i>
                </div>
                <div class="btn-map-zoom-con">
                  <button @click="zoom_in" class="btn btn-zoom-in" type="button" title="Zoom in">+</button>
                  <button @click="zoom_out" class="btn btn-zoom-out" type="button" title="Zoom Out">-</button>
                </div>
                <ClientOnly>
                    <div id="show_new_map_post" class="map_new_W_H"></div>
                </ClientOnly>
              </div>
              <!-- button sent map -->
              <div class="p-2 text-center _flex_ border-top">
                <div @click="cancel_map" class="col-4 p-0">
                  <p class="font_16 modal-title p-2 bg_grey me-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                </div>
                <div @click="sent_map" class="col-8 p-0">
                  <p class="font_16 modal-title p-2 de-btn-message-sent rounded cur_sur"> {{ $t('new_text.save') }} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- modal show posting rule -->
      <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''"
           id="modal_posting_rule" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'rule_width'" role="document">
          <div class="modal-content " :class="isMobile ? 'modal_content_style' : 'rounded'">
            <!-- app -->
            <div class="_div_nav row_padding bg_app_bar_header_">
              <div class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                <button class="btn clear-btn-app-bar" aria-label="Close">
                  <i class="icon-clear font_click_back"></i>
                </button>
              </div>
              <div class="col _pad_col_icon">
                <a class="set-app-name-title text-white" rel="nofollow">Posting Rule</a>
              </div>
            </div>
            <!-- body -->
            <div class="modal-body p-0" :class="isDesktop ? 'dt_rule_posting' : ''">
              <iframe :class="isMobile ? 's_posting_rule' : 's_posting_rules'" class="" title="Posting Rule" :src="'/'+config.LIBRARY_VERSION+'supports/posting-rule.html'"></iframe>
            </div>
          </div>
        </div>
      </div>
      <br><br><br>
  </div>
  </div>
</template>

<script setup>
  /* openLayers new map */
  import Feature from 'ol/Feature.js';
  import Map from 'ol/Map.js';
  import OSM from 'ol/source/OSM.js';
  import View from 'ol/View.js';
  import { Point } from 'ol/geom.js';
  import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction.js';
  import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
  import { Cluster, Vector as VectorSource, XYZ } from 'ol/source.js';
  import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';

/* import nuxt plugin */
  import Multiselect from '@vueform/multiselect'
  import { VueCookieNext } from 'vue-cookie-next';
  import { event, pageview } from 'vue-gtag';
  import helper from "/helper";
  const isDesktop = helper.check_is_desktop(); // check userAgent
  const runtime_config = useRuntimeConfig(); // setup config env to config variable.
  const config = runtime_config.public;
  const route = useRoute();
  const r_name = helper.clear_prefix_route_name(route.name)
  const router = useRouter();
  const version_library = config.LIBRARY_VERSION;
  const asset_url = '/'; // config.VUE_APP_BASE_URL;
  const auth_user = ref('');
  const categories = ref('');
  const empty_img_post = ref("/icon/empty_post.png");

  // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
  // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
  const { locale } = useI18n();
  // const language = ref(helper.get_lang_cookie());
  const language = ref(locale.value === 'km' ? 'km' : 'en');
  const localePath = useLocalePath()

  const value_change_category = ref('');

  const value = ref([]);      // ['Select option'],
  const options = ref([]);    // ['Select option', 'Disable me!', 'Reset me!', 'mulitple', 'label', 'searchable'],

  const selectedShow_MainCategory = ref(''); // condition if click than show else not show component Main_Categories
  const access_token = ref(''); // condition if click than show else not show component Main_Categories
  const loading = ref(false);
  const loading_field = ref(false);
  const fields = ref([]);
  const locations = ref([]);
  const districts = ref([]);
  const communes = ref([]);
  const arr_ad_model = ref([]);
  const i = ref(0);
  const count_location = ref(0);
  const is_edit = ref(false);
  const re_post = ref('');
  const value_multi_text = ref([]);       // array multi text
  const check_upload_progress = ref(0);   // for check, if upload file are still progressing
  const count_current_length_img = ref(0);// check count current image length
  const connection_error = ref(false);    // check connection error
  const photo_name = ref('');         // store name of image when remove or set as cover or preview
  const is_cover = ref('');           // close option set default if cover
  const check_valid_single_or_multiple_upload = ref(''); // check single or multiple select upload at watch function

  const main_cat_name = ref(null);
  const sub_slug_cat = ref(null);
  const sub_cat_name = ref(null);

  const post_id = ref(route.params.id ? route.params.id : ''); // store post_id only in edit post.
  const cate_parent_id = ref('');
  const form = ref({
    ad_headline: '',
    cateid: '',
    ad_text: '',
    name: null,
    'phone[0]': '',
    'phone[1]': '',
    'phone[2]': '',
    email: null,
    // available: ''
  });

  /* error validation */
  const error_title = ref(null);
  const error_category = ref(null);
  const error_description = ref(null);
  const error_name = ref(null);
  const error_phone1 = ref(null);
  const arr_validation = ref([]);
  const toast_error_vali_show = ref([]);
  const title_rule = ref('');

  const phone = ref(['']);  // array for check add or remove field phone numbers (at lease has on index)

  const detail_field = ref(''); // detail one field that show in list modal that fields have icon.

  // --- condition when choose category house (show full name in field crate location) ---
  const province_name = ref('');
  const district_name = ref('');
  const commune_name = ref('');
  // --- dynamic array location ---
  const mul_arr_location = ref([]);
  const type_loc = ref('');
  const tmp_pro_N = ref('');  const tmp_pro_ID = ref('');
  const tmp_dis_N = ref('');  const tmp_dis_ID = ref('');
  const tmp_comm_N = ref(''); const tmp_comm_ID = ref('');
  // -- old locations, address, lat lng map --
  const old_arr_loc = ref({ loc: '', dis: '', com: '' });
  const ref_picture = ref(null);

  // --- new google map ---
  const new_map = ref('');
  const new_static_map = ref('');
  const lat_lng_loc = ref('');

  // --- click from ---
  const save_click_from_what = ref('');
  const ads_id = ref('');
  const image_array = ref([]);
  const image_limit = ref(1);
  const valid_field = ref({
      ad_headline: "required",
      category_select: "required",
      description: "required",
      name: "required",
      phone_1: "required",
  });
  const valid_text = ref({
      ad_headline: "Please enter your title",
      category_select: "Please Choose Category",
      description: "Please enter your description",
      name: "Please enter your name",
      phone_1: "Please enter your phone",
  });

  // --- Store Information ---
  const store_info = ref([]);             // array store.
  const data_user_select = ref('');       // store selected user to show in UI.
  const store_id = ref(route.query.store_id ? route.query.store_id : ''); // get store_id from url query.
  const id_user_or_store = ref('');       // id of user or store.

  // --- check validate on phone number ---
  const error_check_p1 = ref(false);
  const error_check_p2 = ref(false);
  const error_check_p3 = ref(false);
  const error_check_email = ref(false);

  // --- show and get from google map ---
  const show_map = ref(false);      // show or hide map static.
  const is_click_btn_zoom = ref(false); // zoom_in or zoom_out, click button or without click button.

  const lat = ref(''); const lng = ref(''); const zoom = ref(''); // store data when map move or scroll zoom.
  const def_lat = ref(0); const def_lng = ref(0); const def_zoom = ref(0); // store data for show map in modal google map.
  const data_lat = ref(0);  const data_lng = ref(0); const data_zoom = ref(0); // store data for sent to server.

  // --- condition check request (if 401 three time clear auth user) ---
  const reload_q_again_1 = ref(0); const reload_q_again_4 = ref(0); const reload_q_again_7 = ref(0);
  const reload_q_again_2 = ref(0); const reload_q_again_5 = ref(0);
  const reload_q_again_3 = ref(0); const reload_q_again_6 = ref(0);

  // --- quick create ads click from listing ---
  const direct_to_add_form = ref('show_cat');
  const isMobile= ref(helper.m_or_d())
  const is_main = ref(false)


  // --- meta variable ---
  const meta_title_post = useState('meta_title_post', () => 'Post an Ad - Khmer24.com');

  useHead({
      title: meta_title_post.value,
      meta: [
          // -- ios --
          /*{ name: 'apple-mobile-web-app-title', content: meta_title_post.value },*/
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
        // console.log(language.value)
          // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
          // isMobile.value = $( window ).width() < 768 ? true : false
          // $( window ).resize( function() {
          //   isMobile.value = $( window ).width() < 768 ? true : false
          // });
          check_new_auth_user();
          categories.value = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
          locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];

          if (helper.check_auth_user() === false) { // check auth exist or not
              router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
              return;
          } else {
              access_token.value = auth_user.value.tokens.access_token;
          }

          loadCategories(); // check categories.
          get_locations();  // request to get location.

          // --- check if click create post from Listing page must to go to that category automatically ---
          const pa_con = helper.get_params_make_condition(); // get data params condition.
          let cat = pa_con && pa_con.params_cat && pa_con.params_cat.d_params ? pa_con.params_cat.d_params : '';
          if (cat && categories.value) {
              if (parseInt(cat.parent) === 0) {   // search Main_cat from listing
                  click_parent_cate(cat.id, language.value === 'km' ? cat.km_name : cat.en_name);
                  direct_to_add_form.value = 'show_cat';
              } else {                         // search Sub_cat from listing
                  direct_to_add_form.value = '';
                  for (let i = 0; i < categories.value.data.length; i++) {
                      if (cat.parent == categories.value.data[i].id) {
                          setTimeout(function () {
                              click_sub_cate({
                                  main_name: language.value === 'km' ? categories.value.data[i].km_name : categories.value.data[i].en_name,
                                  parent_id: cat.parent,
                                  sub_name: language.value === 'km' ? cat.km_name : cat.en_name,
                                  sub_id: cat.id,
                                  sub_slug: cat.slug,
                              });
                          }, 300);
                          break;
                      }
                  }
              }
          } else {
              direct_to_add_form.value = 'show_cat';
          }

          // --- if auth_user login, show name and phone in fields contact ---
          if (auth_user.value) {
              if (post_id.value) {

              } else {
                  // is phone_activated is false, add phone now
                  if (auth_user.value.user.phone_activated === false) {
                      router.push(localePath({ name: 'setting-change-phone', query: {from: 'post_ads'} }));
                      return // prevent error pl_upload style
                  // show name & email & phone number on fields input
                  } else {
                      let a_u = auth_user.value.user;
                      form.value.name = a_u && a_u.name ? a_u.name : '';
                      form.value.email = a_u && a_u.contact && a_u.contact.email ? a_u.contact.email : '';
                      if (a_u && a_u.contact && a_u.contact.phone) {
                          phone.value = [];
                          $.each(a_u.contact.phone, (k, val) => {
                              phone.value.push(val);
                              form.value['phone[' + k + ']'] = val; // set value to form phone
                          });
                      }
                  }
              }
          }

          // store params expired if is_expired post and need re-post that click from list expired
          re_post.value = route.query.type ? route.query.type : '';

          if (post_id.value) {
              get_data_to_show_edit(post_id.value);
              is_edit.value = true;
          }

          // ---- check click edit from (prevent miss ads_id and click from if refresh page or choose new category when user in status Edit) ----
          save_click_from_what.value = route.query.from;
          ads_id.value = post_id.value; // console.log(ads_id.value);

          setTimeout(() => {
              // --- jquery validation ---
              show_validation();
              // --- remove class modal-open ---
              helper.remove_class_modal_open();
              // --- clear params condition ---
              helper.clear_params_make_con('params_cat');
          },1000);

          // -- tracking on google analytic --
          if (post_id.value) { track_google_analytics(); }

          // -- check user have store or not --
          check_user_have_store();

          // --- Fancybox without hash (not push state history browser) ---
          Fancybox.defaults.Hash = false;
      }
  })

  onBeforeUnmount(() => {
    Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
  })


  const s_cat= useState('s_cat',()=>'')

  watch(() => value_change_category.value, (data) => {
      if (window.navigator.onLine) { // check if internet connection or not
          loadCategories();    // check category in localstorage
          // --- check if change category ---
          let param = data;
          if (param) {
              main_cat_name.value = param.main_name ? param.main_name : '';  // Main category name
              sub_slug_cat.value = param.sub_slug ? param.sub_slug : '';     // Main slug category
              sub_cat_name.value = param.sub_name ? param.sub_name : '';     // Sub category name
              form.value.cateid = param.sub_id ? param.sub_id : '';          // sub category id
              cate_parent_id.value = param.parent_id ? param.parent_id : ''; // category parent id
              // -- request to get dynamic from input create post by category --
              // alert(sub_slug_cat.value)
              if (sub_slug_cat.value) {
                  check_new_auth_user();
                  loading.value = true;
                  let data_params = {lang: language.value, filter_version: 4};
                  if (id_user_or_store.value) {
                      data_params['storeid'] = id_user_or_store.value;
                  } // if have store id.
                  $fetch(config.VUE_APP_API_URL + 'me/posts/filter/' + sub_slug_cat.value, { // +sub_slug_cat.value
                      headers: {"Access-Token": auth_user.value.tokens.access_token},
                      params: data_params,
                  }).then(ress => {
                      let res = ress.data;
                     
                      // -- create field v-model and clear it to empty when choose new category --
                      var newObj = {
                          ad_headline: form.value['ad_headline'],
                          cateid: form.value['cateid'],
                          ad_text: form.value['ad_text'],
                          name: form.value['name'] ? form.value['name'] : '',
                          email: form.value['email'] ? form.value['email'] : '',
                          'phone[0]': form.value['phone[0]'] ? form.value['phone[0]'] : '',
                          'phone[1]': form.value['phone[1]'] ? form.value['phone[1]'] : '',
                          'phone[2]': form.value['phone[2]'] ? form.value['phone[2]'] : '',
                      };

                      // alert('ok1',newObj)
                      
                      // -- clear data all in input if select new category --
                      $.each(res, (key, value) => {
                          if (key === 'locations' || key === 'deliveries' || key === 'prices' || key === 'fields') {
                              $.each(value, (k, val) => {
                               
                                  if(val.type === 'switch'){
                                    // available
                                    setTimeout(()=>{ form.value[val.fieldname] = val.value.value },50)
                                  }else if (val.subfix && val.subfix.fieldname === "discount_type") {
                                      newObj[val.subfix.fieldname] = val.subfix.value ? val.subfix.value.value : ''; // if discount show choose "$" default
                                      newObj[k] = ''; // field discount with radio $ or %
                                  } else if (k === 'province' || k === 'district' || k === 'commune') {
                                      newObj[val.fieldname] = val.value ? val.value.id : '';
                                  } else if (k === 'address' || k === 'map') {
                                      if (k === 'address') {
                                          newObj[val.fieldname] = val.value ? val.value : '';
                                      } else {
                                          newObj['map[x]'] = val.value && val.value.x ? val.value.x : '';
                                          newObj['map[y]'] = val.value && val.value.y ? val.value.y : '';
                                          newObj['map[z]'] = val.value && val.value.z ? val.value.z : '';
                                      }
                                  } else {
                                      newObj[k] = '';
                                  }
                              });

                          } else if (key === 'photos') { // limit on image upload dynamic
                              if (value.ad_photo) {
                                  // exact_length = job category,  max_length = all categories except job category
                                  image_limit.value = value.ad_photo.validation.exact_length ? parseInt(value.ad_photo.validation.exact_length) : parseInt(value.ad_photo.validation.max_length);

                                  // run plupload and check multiple or single select and allow only the first. check prevent show brows multi.
                                  if (!check_valid_single_or_multiple_upload.value) {
                                    check_valid_single_or_multiple_upload.value = 'not_allow_do_that_function_more';

                                    $('.brows_file').children().remove("div"); // clear old pl-upload div.
                                    setTimeout(() => {
                                        ready_function_choose_image();
                                    }, 500);
                                  }
                              }
                          }
                      });

                      // console.log('newOBJ',newObj)
                      form.value = newObj; // create v-model field dynamic
                      value.value = [];
                      options.value = [];
                      province_name.value = '';
                      district_name.value = '';
                      commune_name.value = '';
                      value_multi_text.value = [];
                      // -- /clear data all in input if select new category --

                      arr_validation.value = []; // clear array validation on field dynamic when choose new category
                      fields.value = res;
                      count_location.value = Object.keys(fields.value.locations).length; // condition to show location select or dialog

                      // -- loop multiple select if ad_feature type == multiple_select --
                      if (res.fields && res.fields.ad_features && res.fields.ad_features.options && res.fields.ad_features.type === "multiple_select") {
                          options.value = []; // clear options multiple select and than add new again

                          $.each(res.fields.ad_features.options, (key, val) => {
                              // options.value.push(val.fieldvalue);
                              options.value.push({value: val.fieldvalue, label: val.fieldtitle});
                          });
                      }


                      // console.log('testte1234')
                      // -- clear arr_ad_model and detail_field when change category --
                      detail_field.value = '';
                      arr_ad_model.value = [];
                      // alert('ok2')
                      $('#post_ads').rules('remove'); // remove validation and make validate again
                      setTimeout(() => {
                          let data = {};
                          $.each(ress.data, (key, value) => {
                              if (key === 'locations' || key === 'deliveries' || key === 'prices' || key === 'fields') {
                                  $.each(value, (k, val) => {
                                      if (val && val.validation && val.validation.required) {
                                        data['required'] = true;
                                        if (val.validation.numeric) {
                                            data['number'] = true; /*data['messages']['required'] = 'Please input only number';*/
                                        }
                                        if (val.validation.max_length) {
                                            data['maxlength'] = val.validation.max_length;
                                        }
                                        if (val.validation.min_length) {
                                            data['minlength'] = val.validation.min_length;
                                        }
                                        // -- get name tag field and add validation --
                                        $('input[name="' + k + '"]').rules("add", data);
                                        // --- clear ---
                                        data = {};
                                    }
                                    // console.log('data',val)
                                    // alert(val)
                                });
                              }
                          });
                      }, 1000);
                      // console.log('testte')
                      // --- clear input validation jquery ---
                      // $("#post_ads").data('validator').resetForm();
                      $('#post_ads .invalid-feedback').remove();
                      $('#post_ads input').removeClass('is-valid');
                      $('#post_ads textarea').removeClass('is-valid');
                      $('#post_ads input').removeClass('is-invalid');
                      

                      // -- is locations field have value from API --
                      // alert('ok')
                      // console.log('form.value',form.value)
                  
                      let s = form.value;
                      
                      // alert('ok5')
                      // if have city and have district, Must to get full name to show in field locations at UI
                      if (s.province) {  // -- name to show in multiple field at UI --
                          if (localStorage.getItem("locations")) {
                              locations.value = JSON.parse(localStorage.getItem("locations"));
                              // console.log(locations.value)
                              for (let l = 0; l < locations.value.data.length; l++) {
                                  if (locations.value.data[l].id === s.province) {
                                      province_name.value = language.value === 'en' ? locations.value.data[l].en_name : locations.value.data[l].km_name;
                                      // console.log(province_name.value)
                                  }
                              }
                          } else {
                            province_name.value = s.province;
                            // console.log(province_name.value)
                          }
                      }
                      // --- get data district ---
                      if (s.province) { show_district_or_commune(res.locations.province.value.slug, 'district'); }
                      // --- get data commune ---
                      if (s.district) { show_district_or_commune(res.locations.district.value.slug, 'commune'); }
                      // -- store old_locations --
                      old_arr_loc.value.loc = s.province ? s.province : '';
                      old_arr_loc.value.dis = s.district ? s.district : '';
                      old_arr_loc.value.com = s.commune ? s.commune : '';

                      // -- show location in google map --
                      if (form.value['map[x]'] && form.value['map[y]']) {
                          show_map.value = res.locations && res.locations.map ? true : false; // show map empty or have lat lng.

                          // get data lat lng to show in modal google map dynamic.
                          def_lat.value = res.locations && res.locations.map && res.locations.map.value ? parseFloat(res.locations.map.value.x) : def_lat.value;
                          def_lng.value = res.locations && res.locations.map && res.locations.map.value ? parseFloat(res.locations.map.value.y) : def_lng.value;
                          def_zoom.value = res.locations && res.locations.map && res.locations.map.value ? parseInt(res.locations.map.value.z) : 15;

                          // show loc in static map.
                          data_lat.value = def_lat.value;  data_lng.value = def_lng.value;  data_zoom.value = def_zoom.value;

                          // get lat, lng and zoom from location
                          let data_loc = { x: data_lat.value, y: data_lng.value, z: data_zoom.value };
                          show_last_lat_lng_from_location(data_loc, '');
                      }

                  }).catch(error => {
                    // alert('error')
                    console.log(error)
                      if (error.response && error.response.status === 401) {
                          localStorage.removeItem('auth_user');
                          VueCookieNext.removeCookie('auth_user');
                          router.replace(localePath({name: 'index'}));
                      }

                  }).finally(() => (loading.value = false));
              }
          }
      } else {
          $('#modal_show_status_error_connection').modal('show'); // error connection
      }
  })

  function show_next_location(loc) {
      // console.log(loc);
      if (loc.type === 'province') {
          tmp_pro_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
          tmp_pro_ID.value = loc.id;
          show_change_data_location('', 'province', loc.slug); // get sub locations of this province.
          type_loc.value = 'district';
          if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.
          // console.log(lat_lng_loc.value);

      } else if (loc.type === 'district') {
          tmp_dis_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
          tmp_dis_ID.value = loc.id;
          show_change_data_location('', 'district', loc.slug); // get sub locations of this district.
          type_loc.value = 'commune';
          if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.
          // console.log(lat_lng_loc.value);
      } else {
          tmp_comm_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
          tmp_comm_ID.value = loc.id;
          if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.
          // console.log(lat_lng_loc.value);
      }

      // if select completed, must to store data old_array_location.
      if (tmp_pro_N.value && tmp_dis_N.value && tmp_comm_N.value) {
          province_name.value = tmp_pro_N.value;
          district_name.value = tmp_dis_N.value;
          commune_name.value = tmp_comm_N.value;

          old_arr_loc.value = { loc: tmp_pro_ID.value, dis: tmp_dis_ID.value, com: tmp_comm_ID.value }
          $('#modal_location').modal('hide');

          type_loc.value = '';

          // get lat, lng and zoom from location
          show_last_lat_lng_from_location(lat_lng_loc.value, 'select');

          // clear error
          $('body #show_error_required_location').html('');
      }
  }
  function click_black_loc() {
      if (type_loc.value === 'district') {
          mul_arr_location.value = locations.value.data;
          type_loc.value = '';
      } else if (type_loc.value === 'commune') {
          mul_arr_location.value = districts.value;
          type_loc.value = 'district';
      }
  }
  function show_last_lat_lng_from_location(lat_lng, type) {
      // -- set value to data store in server --
      // console.log(lat_lng);
      if (lat_lng) {
          let d_lat_lng = lat_lng;
          // -- show choose loc in modal google map --
          def_lat.value =  d_lat_lng ? d_lat_lng.x : '';
          def_lng.value = d_lat_lng ? d_lat_lng.y : '';
          def_zoom.value = d_lat_lng ? d_lat_lng.z : '';

          if (!type) { // if select location not allow to change in map.
              data_lat.value = def_lat.value;
              data_lng.value = def_lng.value;
              data_zoom.value = def_zoom.value;
              form.value['map[x]'] = data_lat.value; // add lat to store in server.
              form.value['map[y]'] = data_lng.value; // add lng to store in server.
              // -- show map static --
              show_map.value = true;
          }

          // clear old map and show new map.
          $('#show_new_map_post_static .ol-viewport').remove(); // it removes child from the parent.
          setTimeout(() => { show_new_static_google_map(); });
      }
  }


  // ---- show modal posting rule ----
  function show_posting_rule() { $('#modal_posting_rule').modal('show'); }

  // ---- show modal field have icons ----
  function show_modal_field_icon(field) {
      detail_field.value = field;
      $('#show_modal_field_have_icon').modal('show');
  }
  // ---- select change field in modal show field icon ----
  function select_field_value(fieldname, fieldvalue) {
      form.value[fieldname] = fieldvalue ? fieldvalue : ''; // add value to fieldname.

      // check if another field have chained_field the same this fieldname
      change_field(fieldname, 'clear_sub');

      // --- close the modal ---
      $('#show_modal_field_have_icon').modal('hide');
  }
  // ---- clear select change field to empty ----
  function clear_select_field_value(fieldname, fieldvalue) {
      detail_field.value = '';
      form.value[fieldname] = '';                     // clear fieldname.
      $('#show_modal_field_have_icon').modal('hide'); // close modal.
  }
  // ---- check chained_field is like parent in form, create field by select ----
  function change_field(fieldname, clear_sub) {
      // if ad_field and ad_model exist, must to check "chained_field" if exist (start code below bc field are dynamic)
      if (fieldname && form.value[fieldname] !== '') {
          // loop check chained_field value is exist and have in form data or not.
          $.each(fields.value.fields, (k, v) => {
              if (v.chained_field && form.value[v.chained_field] && v.chained_field === fieldname) {

                  // special => store new data chained_field when value parent change.
                  arr_ad_model.value = [];
                  var short = v.options;
                  for (var i = 0; i < short.length; i++) {
                      if (form.value[fieldname] === short[i].fieldparentvalue) {
                          arr_ad_model.value.push({
                              'fieldtitle': short[i].fieldtitle,
                              'fieldvalue': short[i].fieldvalue,
                              'fieldparentvalue': short[i].fieldparentvalue
                          });
                      }
                  }

                  // clear value of chained_field in form data to empty.
                  if (clear_sub) { form.value[v.fieldname] = ''; } // clear sub only change select, if in edit not allow to clear.
              }
          });
      } else {
          arr_ad_model.value = [];     // clear when choose parent empty option.
      }
  }


  // ---- check user have store or not ----
  function check_user_have_store() {
      $fetch(config.VUE_APP_API_URL + 'me/stores', {
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          headers: { "Access-Token": auth_user.value.tokens.access_token },
          params: { lang: language.value, fields: 'my_setting' },
      }).then(get_store => {
          store_info.value = get_store && get_store.data.length > 0 ? get_store.data : [];

          // create data user show in UI
          if (store_id.value) {
              selected_user(store_id.value, 'store'); // if have store_id in url query.
          } else {
              if (store_info.value.length > 0) {
                  selected_user('', 'user'); // if store exist but store_id not exist in url query, must to show user.
              }
          }

      }).catch(error => {
          if (error.response && error.response.status === 401) { // retry
              if (reload_q_again_7.value <= 2) {
                  reload_q_again_7.value += 1;
                  setTimeout(() => { check_user_have_store(); }, 3000);
              }
          }
      });
  }
  // ---- show modal select user options ----
  function show_user_options() {
      if (!post_id.value) { // when edit not allow to show modal selected user.
          $('#show_modal_user_options').modal('show'); // show modal user options.
      }
  }
  // ---- check selected user ----
  function selected_user(id, type) {
      let empty_img = asset_url+version_library+'img/empty_post.png';
      let data = {};
      if (type === 'user') { // -- data user --
          data = {
              img: auth_user.value.user.photo ? auth_user.value.user.photo.medium.url : empty_img,
              name: auth_user.value.user.name ? auth_user.value.user.name: '',
              username: auth_user.value.user.username ? auth_user.value.user.username: '',
          }
          id_user_or_store.value = ''; // get post filter without storeid.
      } else {                // -- data store --
          $.each(store_info.value, (k, v) => {
              if (v.id === id) {
                  data = {
                      img: v.logo ? v.logo.medium.url : empty_img,
                      name: v.title ? v.title: '',
                      username: v.username ? v.username: '',
                  }
                  return;
              }
          });
          id_user_or_store.value = id; // get post filter with storeid.
      }

      // --- close modal and store img, name, username to show in UI below app bar ---
      $('#show_modal_user_options').modal('hide');
      data_user_select.value = data;

      // --- change post filter when change user (create field id when change user) work when category is selected ---
      if (value_change_category.value) {
          let v_c_change = value_change_category.value;
          let change_data = {
              main_name: v_c_change.main_name,
              parent_id: v_c_change.parent_id,
              sub_name: v_c_change.sub_name,
              sub_id: v_c_change.sub_id,
              sub_slug: v_c_change.sub_slug,
          }
          click_sub_cate(change_data);
          // console.log('======= user change =======');
      }
  }
  // ---- track on google analytic ----
  function track_google_analytics () {
      // setTimeout(() => {
          let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
          let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
          let data = {
              page_title: meta_title_post.value,
              page_location: page_location,
              page_path: page_path,
          }
          // -- event on page --
          event('post', data);
          // -- page_view --
          pageview(data);
          // console.log('tracking');
      // },50);
  }
  // ---- click Main_category ----
  function click_parent_cate(category_id, parent_name) {
    is_main.value =true
      cate_parent_id.value = category_id;
      main_cat_name.value = parent_name;
      window.scrollTo(0, 0);
  }
  // ---- click Sub_category ----
  function click_sub_cate(data) {
      value_change_category.value = data; // do at function watch
      $('#main_and_sub_categories').addClass('d-none'); $('#show_create_post').removeClass('d-none');
      window.scrollTo(0, 0);

      // -- clear old_location when change category --
      old_arr_loc.value = { loc: '', dis: '', com: '' };

      // -- tracking on google analytic --
      if (!form.value.cateid) { track_google_analytics(); }
  }
  // ---- show Main cate ----
  function show_main_cate() {
      cate_parent_id.value = '';
      $('#main_and_sub_categories').removeClass('d-none'); $('#show_create_post').addClass('d-none');
      window.scrollTo(0, 0);
  }
  // ---- show sub cate ----
  function show_sub_cate() {
      $('#main_and_sub_categories').removeClass('d-none'); $('#show_create_post').addClass('d-none');
      window.scrollTo(0, 0);
  }
  // ---- click back close category ----
  function click_close_category() {
      if(!isMobile.value){
        is_main.value = false
      }
      if (cate_parent_id.value && !form.value.cateid) { // this condition, show list Main categories
          cate_parent_id.value = '';
          $('#main_and_sub_categories').removeClass('d-none'); $('#show_create_post').addClass('d-none');
          window.scrollTo(0, 0);
      } else if (cate_parent_id.value && form.value.cateid) { // this condition, hide list Categories
          $('#main_and_sub_categories').addClass('d-none'); $('#show_create_post').removeClass('d-none');
          window.scrollTo(0, 0);
      } else if (!cate_parent_id.value && !form.value.cateid) { // this condition, back save state
          window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' }));
      } else {
          window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' }));
      }
  }
  // ---- go to first page again only in create new post URL ----
  function show_first_page() {
      if (r_name === 'post') {
          cate_parent_id.value = '';
          $('#main_and_sub_categories').removeClass('d-none');
          $('#show_create_post').addClass('d-none');
          window.scrollTo(0, 0);
      }
  }
  // ---- check categories ----
  function loadCategories() {
      var cat = categories.value ? categories.value : '';

      if (!cat || (cat && !cat.data) || (cat && !cat.url)) { //    || (cat && cat.url && cat.url !== config.VUE_APP_API_URL)
          loading_field.value = true;
          $fetch(config.VUE_APP_API_URL + 'categories', {
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
              params: { meta: true, v: 1 },

          }).then(response => {
              const object = {
                  data: response.data,
                  meta: response.meta,
                  expiry: helper.Date_To_Timestamp('', 7200, 'seconds'), // add 1 hour
                  url: config.VUE_APP_API_URL, // for check to get new categories up to date.
              }
              localStorage.setItem("categories", JSON.stringify(object));
              categories.value = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
          }).catch(error => {
              if (error.response && error.response.status === 401) { // retry
                  if (reload_q_again_1.value <= 2) {
                      reload_q_again_1.value += 1;
                      setTimeout( () => { loadCategories(); }, 3000);
                  } else {
                      localStorage.removeItem('auth_user');   // remove localStorage
                      router.replace(localePath({ name: 'index' }));
                  }
              }
          }).finally(() => (loading_field.value = false));

      } else {
        window.scrollTo(0, 0);
      }
  }
  // ---- change discount ----
  function change_delivery() {
      form.value['shipping'] = $('#customSwitch1').is(':checked');
  }

  // function checkTF(){
  //   form.value['available'] = $('#availability').is(':checked');
  // }
  // ---- validation show ----
  function show_validation() {
      $.validator.setDefaults({
          submitHandler: () => {
              // alert( "submitted!" );
              submit_form_post();
          }
      });

      $( "#post_ads" ).validate( {
          ignore: "", // can know hidden or any
          rules: valid_field.value,
          messages: valid_text.value,
          // errorElement: "em",
          errorPlacement: function ( error, element ) {
              // console.log(error);
              // console.log(element);
              // console.log(element.prop( "type" ));
              // console.log('---------------------')

              // Add the `invalid-feedback` class to the error element
              error.addClass( "invalid-feedback" );

              // check add text all fields
              if ( element.prop( "type" ) === "checkbox" ) {
                  error.insertAfter( element.next( "label" ) );  // show validate checkbox
              } else if ( element.prop( "type" ) === "radio" ) {
                  error.appendTo(element.parent().parent().parent()); // hasha add element error out side, cool
              } else if ( element.prop( "type" ) === "hidden" ) {
                  // show error like this when have hidden field and need to show 1 error, must to use html instead of append
                  $('#show_error_required_location').html(error);
                  // error.appendTo($('#show_error_required_location'));
              } else {
                  error.insertAfter( element );                  // show validate text, textarea, select and so on
              }
          },


          highlight: function ( element, errorClass, validClass ) {
              // $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
              $(element).addClass('is-invalid');
          },

          unhighlight: function ( element, errorClass, validClass ) {
              // $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
              $(element).removeClass('is-invalid');
          },

          // focusInvalid: false, it scroll up or down to specific tag
          invalidHandler: function(form, validator) {
              // console.log(form);
              // console.log(validator);
              // console.log(validator.errorList[0].element); // if need id or name just like .name or .id
              // console.log(validator.errorList[0].element.id);
              // console.log($(validator.errorList[0].element).is(":visible"));
              // console.log('---------------------')

              if (!validator.numberOfInvalids())    // if don`t have error return
                  return;

              // -- scroll to field that is visible --
              if ($(validator.errorList[0].element).is(":visible")) {
                  $('html, body').animate({
                      scrollTop: $(validator.errorList[0].element).offset().top - 120
                  }, 200); // if position fix in that element, it not scroll up, so change it to position absolute

              // -- scroll to field that invisible like (hidden) --
              } else {
                  $('html, body').animate({
                      scrollTop: $(validator.errorList[0].element).closest(':visible').offset().top - 120
                  }, 200);
              }
          },
      } );
  }
  // ---- check new auth user ----
  function check_new_auth_user() { auth_user.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
  // ---- retry ----
  function retry() { get_data_to_show_edit(post_id.value); }
  // ---- get edit post ----
  function get_data_to_show_edit(ads_id) {
      check_new_auth_user();
      loading_field.value = true;

      let check_type = re_post.value ? '' : 'active'; // check type post is expired or active (if 404 check this value is have or not).
      let data_params = { type: check_type, lang: language.value, filter_version: 4 };
      if (store_id.value) { data_params['storeid'] = store_id.value; } // check store_id is exist or not in query url.

      $fetch(config.VUE_APP_API_URL + 'me/posts/'+ads_id, {
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          headers: { "Access-Token": auth_user.value.tokens.access_token },
          params: data_params,
      }).then(res_back => {

          let sh = res_back.data;

          connection_error.value = false;  // close error connection

          // --- loop create image of post ---
          if (sh.post && sh.post.photo) {
              count_current_length_img.value = sh.post.photo.length; // store length image
              for (let img = 0; img < sh.post.photo.length; img++) {
                  image_array.value.push({
                      'file': sh.post.photo[img].image_name,
                      'url_img': sh.post.photo[img].image_url
                  });
              }
          }

          // -- create field v-model and add input --
          var newObj = {
              ad_headline: sh.post.title,
              cateid: sh.post.cateid,
              ad_text: sh.post.description,
          };
          $.each( sh, ( key, value ) => {
              if (key === 'locations' || key === 'deliveries' || key === 'prices' || key === 'fields') {
                  $.each( value, ( k, val ) => {
                      // console.log(val)
                      if (key === 'deliveries') {
                          // console.log('1')
                          newObj[k] = val.value ? JSON.parse(val.value.value) : ''; // convert string ture or false delivery.
                      }else if (key === 'locations') {
                          // console.log('2')
                          if (val.fieldname === 'map') {
                              newObj['map[x]'] = val.value ? parseFloat(val.value.x) : '';
                              newObj['map[y]'] = val.value ? parseFloat(val.value.y) : '';
                          } else {
                              newObj[k] = val.value && val.value.id ? val.value.id : (val.value ? val.value : '');
                          }
                      }else {
                          // console.log('3')
                          newObj[k] = val.value && val.value.fieldvalue ? val.value.fieldvalue : (val.value ? val.value : ''); // field fieldvalue or only value.
                          if (val.subfix && val.subfix.type === 'radio') { // if price discount ( check it if have radio ).
                              newObj[val.subfix.fieldname] = val.subfix.value.value;
                          }
                          if(val.type === 'switch'){
                            // console.log(val)
                            setTimeout(()=>{
                              form.value[val.fieldname] = val.value.value
                            },350)
                          }
                      }
                  });

              } else if (key === 'post') {  // store parent id category toi cate_parent_id
                  cate_parent_id.value = value.category ? value.category.parent : '';

              } else if (key === 'photos') { // limit on image upload dynamic
                  if (value.ad_photo) {
                      // exact_length = job category,  max_length = all categories except job category
                      image_limit.value = value.ad_photo.validation.exact_length ? parseInt(value.ad_photo.validation.exact_length) : parseInt(value.ad_photo.validation.max_length);

                      // run plupload and check multiple or single select and allow only the first. check prevent show brows multi.
                      if (!check_valid_single_or_multiple_upload.value) {
                          check_valid_single_or_multiple_upload.value = 'not_allow_do_that_function_more';
                          $('.brows_file').children().remove("div"); // clear old pl-upload div.
                          setTimeout(() => { ready_function_choose_image(); }, 500);
                      }
                  }
              }
          });
          form.value = newObj;

          // -- ad_features multiple_select --
          if (sh.fields && sh.fields.ad_features && sh.fields.ad_features.options && sh.fields.ad_features.type === "multiple_select") {
              options.value = []; // clear options multiple select and than add new again
              $.each(sh.fields.ad_features.options, (k, v) => {
                  // options.value.push(v.fieldvalue);
                  options.value.push({ value: v.fieldvalue, label: v.fieldtitle });
              });
              // -- check is multiple have value to show in field for update --
              if (sh.fields.ad_features.value) {
                  $.each(sh.fields.ad_features.value, async (k, val) => {
                      await value.value.push(val.fieldvalue);
                  });
                  form.value.ad_features = value.value;
              }
              // -- ad_features multiple_text --
          } else if (sh.fields && sh.fields.ad_features && sh.fields.ad_features.type === "multiple_text") {
              value_multi_text.value = sh.fields.ad_features.value ? sh.fields.ad_features.value : [];
              // -- ad_features single --
          } else {
              if (sh.fields && sh.fields.ad_features) {
                  form.value.ad_features = sh.fields.ad_features.value ? sh.fields.ad_features.value.fieldvalue : '';
              }
          }

          form.value.name = sh.contact && sh.contact.name ? sh.contact.name : '';
          form.value.email = sh.contact && sh.contact.email ? sh.contact.email : '';
          if (sh.contact && sh.contact.phone) {
              phone.value = [];                         // clear it to empty be fore add new
              $.each(sh.contact.phone, (key, val) => {
                  phone.value.push(val);                // push to check condition add or remove
                  form.value['phone['+key+']'] = val;   // push to check add phone to model phone
              });
          }

          // --- loop to get full name of category to show in field ---
          let arr_s = categories.value.data;
          stop_loop:
              for (var z = 0; z < arr_s.length; z++) {
                  if (parseInt(arr_s[z].id) === parseInt(sh.post.category.parent)) {
                      main_cat_name.value = language.value === 'en' ? arr_s[z].en_name : arr_s[z].km_name;
                      break stop_loop; // break the loop
                  }
              }
          sub_cat_name.value = language.value === 'en' ? sh.post.category.en_name : sh.post.category.km_name;

          // --- show category by ads dynamic ---
          fields.value = res_back.data;
          count_location.value = fields.value.locations ? Object.keys(fields.value.locations).length : 0; // condition to show (location) select or dialog select

          // --- show value chained_field model related parent field ---
          $.each(fields.value.fields, (k, v) => {
              if (v.chained_field) {
                  change_field(v.chained_field, ''); // go to check if chained_field is exist or empty to in select.
                  return false;
              }
          });

          // if have city and have district, Must to get full name to show in field locations at UI
          if (form.value.province && sh.locations.district) {  // -- name to show in multiple field at UI --
              if (localStorage.getItem("locations")) {
                  locations.value = JSON.parse(localStorage.getItem("locations"));
                  for (var l = 0; l < locations.value.data.length; l++) {
                      if (locations.value.data[l].id === form.value.province) {
                          province_name.value = language.value === 'en' ? locations.value.data[l].en_name : locations.value.data[l].km_name;
                      }
                  }
              } else { province_name.value = form.value.province; }
          }
          // --- get data district ---
          if (form.value.province) { show_district_or_commune(sh.locations.province.value.slug, 'district'); }
          // --- get data commune ---
          if (form.value.district) { show_district_or_commune(sh.locations.district.value.slug, 'commune'); }
          // -- show location in google map -- (data empty must to check lat lng user or set current location of user, else set default lat lng)
          if (form.value['map[x]'] && form.value['map[y]']) {
              show_map.value = sh.locations && sh.locations.map ? true : false; // show map empty or have lat lng.

              // get data lat lng to show in modal google map dynamic.
              def_lat.value = sh.locations && sh.locations.map && sh.locations.map.value ? parseFloat(sh.locations.map.value.x) : def_lat.value;
              def_lng.value = sh.locations && sh.locations.map && sh.locations.map.value ? parseFloat(sh.locations.map.value.y) : def_lng.value;
              def_zoom.value = sh.locations && sh.locations.map && sh.locations.map.value ? parseInt(sh.locations.map.value.z) : 15;

              // show loc in static map.
              data_lat.value = def_lat.value;  data_lng.value = def_lng.value;  data_zoom.value = def_zoom.value;

              // get lat, lng and zoom from location
              let data_loc = { x: data_lat.value, y: data_lng.value, z: data_zoom.value };
              show_last_lat_lng_from_location(data_loc, '');
          }

          $('#post_ads').rules( 'remove' ); // remove validation and make validate again
          setTimeout(() => {
              let data = {};
              $.each( sh, ( key, value ) => {
                  if (key === 'locations' || key === 'deliveries' || key === 'prices' || key === 'fields') {
                      $.each( value, ( k, val ) => {
                          if (val && val.validation && val.validation.required) {
                              data['required'] = true;
                              if (val.validation.numeric) { data['number'] = true; /*data['messages']['required'] = 'Please input only number';*/ }
                              if (val.validation.max_length) { data['maxlength'] = val.validation.max_length; }
                              if (val.validation.min_length) { data['minlength'] = val.validation.min_length; }
                              // -- get name tag field and add validation --
                              $( 'input[name="'+k+'"]' ).rules( "add", data);
                              // --- clear ---
                              data = {};
                          }
                      });
                  }
              });
          }, 1000);

          // -- store old_locations --
          let s = form.value;
          old_arr_loc.value.loc = s.province ? s.province : '';
          old_arr_loc.value.dis = s.district ? s.district : '';
          old_arr_loc.value.com = s.commune ? s.commune : '';

      }).catch(error => {
          if (!error.response) {
              connection_error.value = true;
          } else if (error.response && error.response.status === 401) {
              if (reload_q_again_1.value <= 2) {
                  reload_q_again_1.value += 1;
                  check_new_auth_user();
                  setTimeout( () => { get_data_to_show_edit(ads_id) }, 3000);
              } else {
                  localStorage.removeItem('auth_user');   // remove localStorage
                  router.replace(localePath({ name: 'index' }));
              }
          }

      }).finally(() => (loading_field.value = false, window.scrollTo(0, 0)));
  }
  // ---- when edit show district or commune and show full name in field locations in UI ----
  function show_district_or_commune(related, condition) {
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL + 'locations', {
          params: { lang: language.value, type: condition, parent: related },
      }).then(res_data_location => {
          if (condition === 'district') {
              districts.value = res_data_location.data;
              // -- loop to get full name to show in multiple field at UI --
              show_full_name_district:
                  for (var d = 0; d < districts.value.length; d++) {
                      if (districts.value[d].id === form.value.district) {
                          district_name.value = language.value === 'en' ? districts.value[d].en_name : districts.value[d].km_name;
                          break show_full_name_district;
                      }
                  }
          } else if (condition === 'commune') {
              communes.value = res_data_location.data;
              // -- loop to get full name to show in multiple field at UI --
              show_full_name_commune:
                  for (var c = 0; c < communes.value.length; c++) {
                      if (communes.value[c].id === form.value.commune) {
                          commune_name.value = language.value === 'en' ? communes.value[c].en_name : communes.value[c].km_name;
                          break show_full_name_commune;
                      }
                  }
          }

      }).catch(error => {
          if (error.response && error.response.status === 401) {
              if (reload_q_again_2.value <= 2) {
                  reload_q_again_2.value += 1;
                  check_new_auth_user();
                  setTimeout( () => { show_district_or_commune(related, condition); }, 3000);
              } else {
                  localStorage.removeItem('auth_user');   // remove localStorage
                  router.replace(localePath({ name: 'index' }));
              }
          }
      }).finally(() => (loading_field.value = false));
  }
  // ---- btn submit form post ----
  const check_edit_post = useState('check_edit_post',()=> null)
  function submit_form_post() {
      if (window.navigator.onLine) {  // internet connection online
          if (check_upload_progress.value === 0) {     // file upload is completed if it equal 0

              if (
                  form.value['ad_headline'] && form.value['ad_text'] && form.value['cateid'] && form.value['name'] && form.value['phone[0]'] &&
                  (error_check_p1.value === false && error_check_p2.value === false && error_check_p3.value === false)
              ) {

                  let data_body = form.value; // get dynamic field v-model

                  // --- if re-post ads, show this field ---
                  if (re_post.value) {
                      data_body['type'] = 'repost_ad';
                  }

                  // --- get post image name ---
                  $.each(image_array.value, function (key, value) {
                      var keys_index = key += 1;
                      data_body['item_image[' + keys_index + ']'] = value.file;
                  });

                  // --- check ad_features is array or single value ( multi select or multi text ) ---
                  var data_feature = value.value.length > 0 ? value.value : (value_multi_text.value.length > 0 ? value_multi_text.value : ''); // not error bc when choose new in watch we clear all value
                  if (data_feature) {
                      for (var i = 0; i < data_feature.length; i++) {
                          data_body['ad_features[' + i + ']'] = data_feature[i];
                      }
                  } else {
                      if (form.value['ad_features']) {
                          data_body['ad_features'] = form.value['ad_features'];
                      }
                  }

                  // --- check if id_user_or_store is exist, it mean create or edit post of store ---
                  if (id_user_or_store.value) { data_body['storeid'] = id_user_or_store.value; } // if have store id.

                  // --- field version if data update and not show please check post man field version again ---
                  data_body['filter_version'] = 4;

                  // --- add field old_location to data_body form ---
                  let l = old_arr_loc.value;
                  if (l.loc) { data_body['province'] = l.loc ? l.loc : ''; }
                  if (l.dis) { data_body['district'] = l.dis ? l.dis : ''; }
                  if (l.com) { data_body['commune'] = l.com ? l.com : ''; }

                  // console.log(data_body)
                  // console.log(old_arr_loc.value)
                  // return

                  // --- check create or edit ---
                  let url_posts = '';
                  if (ads_id.value) {
                      url_posts = 'me/posts/' + ads_id.value;
                  } else {
                      url_posts = 'me/posts';
                  }

                  check_new_auth_user();
                  loading.value = true;
                  $fetch(config.VUE_APP_API_URL + url_posts, {
                      method: "POST",
                      headers: {"Access-Token": auth_user.value.tokens.access_token},
                      params: {lang: language.value},
                      body: new URLSearchParams(data_body)

                  }).then(get_response => {
                      // --- if click re-post from account OR store page ---
                      let is_re_post = route.query && route.query.type === 'expired' ? 're_post' : '';
                      // --- if edit post from detail ---
                      if (!is_re_post && save_click_from_what.value === 'detail' && ads_id.value) {
                          save_track_optional('message_success', { message_success: get_response.message });
                          save_track_optional('message_success', { clear_old_data: ads_id.value });
                          router.replace(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(form.value['ad_headline']), id: ads_id.value } }));

                      // --- if edit post from Account Page ( active ) ---
                      } else if (is_re_post || (save_click_from_what.value === 'account_active_ads' && ads_id.value)) {
                          save_track_optional('message_success', { message_success: get_response.message });
                          router.push(localePath({ name: 'account', query: {check_tap: 'active'} }));
                      // --- if edit post from Account Page ( expired ) ---
                      } else if (!is_re_post && save_click_from_what.value === 'account_expired_ads' && ads_id.value) {
                          save_track_optional('message_success', { message_success: get_response.message });
                          router.push(localePath({ name: 'account', query: {check_tap: 'expired'} }));

                      // --- if edit post from Store Page ( active ) ---
                      } else if (is_re_post || (save_click_from_what.value === 'store_active_ads' && ads_id.value)) {
                          save_track_optional('message_success', { message_success: get_response.message });
                          router.push(localePath({ name: 'account-store-id', params: { id: store_id.value }, query: {check_tap: 'active'} }));
                      // --- if edit post from Store Page ( expired ) ---
                      } else if (!is_re_post && save_click_from_what.value === 'store_expired_ads' && ads_id.value) {
                          save_track_optional('message_success', { message_success: get_response.message });
                          router.push(localePath({ name: 'account-store-id', params: { id: store_id.value }, query: {check_tap: 'expired'} }));

                      // --- else from create new post ---
                      } else {
                          let rName = helper.clear_prefix_route_name(route.name)
                          if(rName === 'post-id'){
                            check_edit_post.value = 'edit'
                          }else{
                            check_edit_post.value = null
                          }
                          save_track_optional('message', { message: get_response.message, });
                          save_track_optional('store', {  store: id_user_or_store.value });
                          router.push(localePath({ name: 'post-success' }));
                      }

                  }).catch(error => {
                      if (!error.response) {
                          $('#modal_show_status_error_connection').modal('show'); // error connection

                      } if (error.response && error.response.status === 401) {    // retry request when auth expire
                          if (reload_q_again_3.value <= 2) {
                              reload_q_again_3.value += 1;
                              check_new_auth_user();
                              setTimeout( () => { submit_form_post(); }, 3000);
                          } else {
                              localStorage.removeItem('auth_user');   // remove localStorage
                              router.replace(localePath({ name: 'index' }));
                          }

                      } else {
                          let check = error.response ? error.response : '';
                          let data_check = JSON.stringify(check);
                          let data_parse = JSON.parse(data_check);

                          let store_arr = arr_validation.value;
                          $.each(arr_validation.value, function (keys, val) {
                              $('#' + val).addClass('d-none'); // remove validation by key
                          });

                          toast_error_vali_show.value = []; // clear message error to empty for show error new message
                          error_title.value = '';
                          if (check && check.status === 422) {
                              $.each(data_parse._data.errors, (key, value) => {
                                  // console.log(key)
                                  $('#' + key).removeClass('d-none');
                                  $('#msg_' + key).text(value.message);
                                  store_arr.push(key); // to store old key for clear validation

                                  // --> check scroll to position field if error validation <--
                                  if (key === 'district' || key === 'commune' || key === 'province' || key === 'address') {
                                      // nothing scroll, because it is modal show not scroll position
                                      $('#modal_location').modal('show'); // show modal location
                                  } else {
                                      if (document.getElementById(key)) { // check if id element exist in dom, prevent error not show message to user
                                          $("html, body").animate({scrollTop: $("#" + key).offset().top - 100}, 500); // -100 = scroll more to top 100px, +100 = scroll more to bottom 100px
                                      }
                                  }

                                  toast_error_vali_show.value.push(value.message); // store toast message on validation error
                                  title_rule.value = 'Required';
                              });
                              // -- show toast --
                              let toast = $('.toast');
                              toast.removeClass('d-none');
                              toast.toast({delay: 7000});
                              toast.toast('show');

                          } else {
                              toast_error_vali_show.value.push(data_parse._data.message);
                              title_rule.value = 'Posting Rule';
                              // -- show toast --
                              let toast = $('.toast');
                              toast.removeClass('d-none');
                              toast.toast({delay: 7000});
                              toast.toast('show');
                          }
                      }
                  }).finally(() => (loading.value = false));

                  // --- set value empty to null ---
                  error_title.value = null;
                  error_category.value = null;
                  error_description.value = null;
                  error_name.value = null;
                  error_phone1.value = null;
                  return true;
              }
              error_title.value = !form.value['ad_headline'] ? "is_required" : null;
              error_category.value = !form.value['cateid'] ? "is_required" : null;
              error_description.value = !form.value['ad_text'] ? "is_required" : null;
              error_name.value = !form.value['name'] ? "is_required" : null;
              error_phone1.value = !form.value['phone[0]'] ? "is_required" : null;

          } else {    // show error if upload is still progressing
              $("html, body").animate({ scrollTop: "0" }, 500); // scroll to top if image still uploading
              toast_error_vali_show.value = [];
              title_rule.value =  language.value === 'en' ? 'Please wait! photo are still progress' : 'សូមរងចាំបន្តិច! រូបថតកំពុងបញ្ជូន';
              let toast = $('.toast');
              toast.removeClass('d-none');
              toast.toast({delay: 7000});
              toast.toast('show');
          }

      } else {
          $('#modal_show_status_error_connection').modal('show'); // error connection
      }
  }



  // ============ phone number condition ============
  // ---- add more field phone numbers ----
  function add_field_phone_number() {
      phone.value.push('');
      if (phone.value.length === 2) {
          error_check_p2.value = false;
          setTimeout(() => {
              document.getElementById('phone2').focus();
          },500);

      } else if (phone.value.length === 3) {
          error_check_p3.value = false;
          setTimeout(() => {
              document.getElementById('phone3').focus();
          },500);
      }
  }
  // ---- minus field phone number ----
  function minus_field_phone(index) {
      // - remove phone from array condition dynamic field add or remove -
      phone.value.splice(index, 1);
      // - remove phone form v-model -
      if (index === 1) {
          form.value['phone[1]'] = form.value['phone[2]'] ? form.value['phone[2]'] : ''; // if phone2 remove but phone3 have value, must to store in phone2
          error_check_p2.value = form.value['phone[1]'] ? check_phone(form.value['phone[1]']) : false;
          form.value['phone[2]'] = ''; // remove phone 3
      } else if (index === 2) {
          form.value['phone[2]'] = '';
          error_check_p3.value = false;
      }
  }
  // ---- validation phone numbers ----
  function keymonitor() {
      setTimeout( () => {
          if (form.value['phone[0]']) { error_check_p1.value = check_phone(form.value['phone[0]']); } else { error_check_p1.value = false; }
          if (form.value['phone[1]']) { error_check_p2.value = check_phone(form.value['phone[1]']); } else { error_check_p2.value = false; }
          if (form.value['phone[2]']) { error_check_p3.value = check_phone(form.value['phone[2]']); } else { error_check_p3.value = false; }
      }, 300);
  }
  function check_phone(phone) {
      const nine_regex = /([0]{1})([0-9]{8})$/; // console.log(three_regex.test(phone1.value))
      const ten_regex = /([0]{1})([0-9]{9})$/;  // console.log(four_regex.test(phone1.value))
      if (nine_regex.test(phone) || ten_regex.test(phone)) {  // check if phone correct format
          return false; // if true, return false
      } else {
          return true;  // if false return true
      }
  }
  // ============ phone number condition END ============

  // ---- validation email ----
  function email_monitor() {
      /* --- The regex is not allowed for: ---
      * abc@gmail..com
      * abc@gmail.com..
      * --- Allowed for: ---
      * abc.efg@gmail.com
      * abc@gmail.com.my
      * */
      setTimeout( () => {
          if (form.value['email']) {
              var pattern = new RegExp("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
              var result = pattern.test(form.value['email']);
              error_check_email.value = result ? false : true;
          } else {
              error_check_email.value = false; // false: close error
          }
      }, 300);
  }

  // ---- if have selected location show districts ----
  function show_change_data_location(l_event , condition, _slug_) {
      let check_is_have_only_field_province = fields.value.locations.district; // check is multiple or single select location.
      // multiple locations
      if (check_is_have_only_field_province) {  // if fields response from API have district, else not allow to access
          let type_slug = '';
          if (condition === 'province') {
              districts.value = [];        // clear data district
              communes.value = [];         // clear data commune
              form.value.district = '';    // clean select if choose new location
              form.value.commune = '';     // the same
              type_slug = 'district';      // set type for request

          } else if (condition === 'district') {
              communes.value = [];         // clear data commune
              form.value.commune = '';     // the same
              type_slug = 'commune';       // set type for request
          }

          // -- check is from select or from click on choose multiple locations --
          let slug_location = '';
          if (_slug_) { // click manually select locations
              slug_location = _slug_;

          } else if (l_event && l_event.target.value) { // check select have value or not
            slug_location = $('#'+l_event.target.id+' option:selected').data('slug'); // get slug from select option by id
          }

          if (slug_location) { // if slug exist, let request to get sub locations.
              loading.value = true;
              $fetch(config.VUE_APP_API_URL + 'locations', {
                  params: {lang: language.value, type: type_slug, parent: slug_location},
              }).then(res => {
                  if (condition === 'province') {
                      districts.value = res.data;
                      mul_arr_location.value = districts.value;
                  } else if (condition === 'district') {
                      communes.value = res.data;
                      mul_arr_location.value = communes.value;
                  }
              }).catch(error => {
                  if (!error.response) {
                      if (reload_q_again_4.value < 2) {
                          reload_q_again_4.value += 1;
                          check_new_auth_user();
                          setTimeout( () => { show_change_data_location(l_event , condition, slug); }, 3000);
                      } else {
                          $('#modal_show_status_error_connection').modal('show');
                      }

                  } else if (error.response && error.response.status === 401) {
                      if (reload_q_again_4.value <= 2) {
                          reload_q_again_4.value += 1;
                          check_new_auth_user();
                          setTimeout( () => { show_change_data_location(l_event , condition, slug); }, 3000);
                      } else {
                          localStorage.removeItem('auth_user');   // remove localStorage
                          router.replace(localePath({ name: 'index' }));
                      }
                  }
              }).finally(() => (loading.value = false));
          }

      // single location
      } else {
          old_arr_loc.value.loc = form.value['province'] ? form.value['province'] : ''; // add id province to old_arr_loc
      }
  }

  // ---- click back one page ----
  function goBack() {
      if (route.query.act_suc_his) {    // -- when set activate phone success than click back --
          router.push(localePath({ name: 'index' }));
      } else {                          // -- back history simple --
          window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' }));
      }
  }
  // ---- Open modal choose location ----
  function choose_location(con) {
      if (window.navigator.onLine) {
          mul_arr_location.value = locations.value.data; // when open modal choose locations, must to store province array first.
          type_loc.value = '';
          tmp_pro_N.value = ''; tmp_pro_ID.value = '';
          tmp_dis_N.value = ''; tmp_dis_ID.value = '';
          tmp_comm_N.value = ''; tmp_comm_ID.value = '';
          $('#modal_location').modal(con);

      } else {
          $('#modal_show_status_error_connection').modal('show');
      }
  }
  // ---- clear location when choose category house ----
  function clear_filter() {
      form.value.province = '';
      form.value.district = '';
      form.value.commune = '';
      province_name.value = '';
      district_name.value = '';
      commune_name.value = '';
      // --- clear old array locations ---
      old_arr_loc.value = { loc: '', dis: '', com: '' };

      choose_location('hide'); // clear tmp data too.
  }

  // ---- request to get location ----
  function get_locations() {
      let location_select = localStorage.getItem("locations");
      if (!location_select || (location_select && !location_select.data)) {
          $fetch(config.VUE_APP_API_URL + 'locations', { params: { lang: language.value },
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          }).then(res_location => {
              const object = {
                  data: res_location && res_location.data ? res_location.data : '',
                  expiry: helper.Date_To_Timestamp('', 3600, 'seconds'),  // add 1 hour
              }
              localStorage.setItem("locations", JSON.stringify(object));
              locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];
          }).catch(error => {
              if (!error.response) {
                  if (reload_q_again_5.value < 2) {
                      reload_q_again_5.value += 1;
                      check_new_auth_user();
                      setTimeout( () => { get_locations(); }, 3000);
                  }
              } else if (error.response && error.response.status === 401) {
                  if (reload_q_again_5.value <= 2) {
                      reload_q_again_5.value += 1;
                      check_new_auth_user();
                      setTimeout( () => { get_locations(); }, 3000);
                  } else {
                      localStorage.removeItem('auth_user');   // remove localStorage
                      router.replace(localePath({ name: 'index' }));
                  }
              }
          });
      }
  }

  // ---- add and remove multi text ----
  // add manually
  function add_multi_text() {
      var get_text = $('#multi_text').val();
      if (get_text) {
          value_multi_text.value.push(get_text);
          $('#multi_text').val('');
          $('body').find('#multi_text').focus();
      } else {
          $('body').find('#multi_text').focus();
      }
  }
  // remove manually
  function remove_multi_text(text) {
      $.each(value_multi_text.value, (key, value) => {
          if (value == text) {
              value_multi_text.value.splice(key, 1);
              return;
          }
      });
  }
  // click enter and add
  function key_up_multi_text(e) {
      // console.log(e.keyCode);
      if (e.keyCode === 13) { // if click enter keyboard
          add_multi_text();
          e.preventDefault(); // prevent form submit when click enter
      }
  }
  // ---- add and remove multi text ----

  // ---- close alert ----
  function close_error_upload() {
      $('#error_upload').css('display', 'none');
      $('#error_text').text('');
  }

  // ---- upload image multiple ----
  function show_brows() {
      // clear alert error upload when start new upload more
      $('#error_upload').css('display','none');

      $('.brows_file div input[type=file]').click();      // click direct file profile
  }

  function ready_function_choose_image() {  // --- $(document).ready(function(){ } --> must to use in mounted ---
      var image = image_array.value;
      var limit = 1;
      var max_size = 24;
      // var maxRes = 1000000;
      var multi_uploader = new plupload.Uploader({
          runtimes : 'html5,flash,silverlight,html4',
          browse_button: ["browse_post"], // ["browse_post","browse_1"],
          // browse_button: ["browse_1","browse_2","browse_3"],
          url: config.VUE_APP_API_URL+'upload', // http://khmer24.snadai.io/v1.0/upload
          max_file_size : max_size+'mb',
          unique_names : true,
          multi_selection: image_limit.value > 1 ? true : false, // upload multiple or single ( choose single = false; choose multiple = true )
          // chunk_size: '2mb',
          resize : { width : 1500, height : 1400, quality : 100, crop: false },
          filters : {
              mime_types :[
                  {title : "Image files", extensions : "jpg,gif,png,jpeg"}
              ],
              check_image_size: 100, // define for image smaller than 100kb ( important )
          },
          // drop_element : 'multi-upload',
          flash_swf_url : 'plupload-2.3.9/Moxie.swf',
          silverlight_xap_url : 'plupload-2.3.9/Moxie.xap'
      });

      multi_uploader.init();

      multi_uploader.bind('FilesAdded', (up, files) => {
          multi_uploader.start();
      });

      multi_uploader.bind('Error', (up, err) => {
          $.each(image, (index, value) => {
              if (err.file.id === value.id) {   // if error and error id is match with array image, clear
                  image.splice(index, 1);       // remove array if id the same
                  image_array.value = image;
              }
          });
          $('#error_upload').css('display', 'block');
          if (err.status) { // -- if have status , it mean from server API --
              let convert = err.response ? JSON.parse(err.response) : '';
              $('#error_text').text(convert.message);
          } else {          // -- else it mean error check at client side --
              $('#error_text').text(err.message);
          }
          multi_uploader.refresh();
      });


      multi_uploader.bind('UploadComplete', (upldr, file) => {
          // console.log('UploadComplete');
          check_upload_progress.value = 0; // when upload completed clear and set to 0 for click button submit form
          multi_uploader.splice();
          multi_uploader.refresh();
      });

      multi_uploader.bind('FileUploaded', async (upldr, file, object) => {
          // console.log('FileUploaded');
          var myData;
          try {
              // myData = eval(object.response);
              myData = object.response ? JSON.parse(object.response) : '';
          } catch(err) {
              // myData = eval('(' + object.response + ')');
              myData = '(' + object.response + ')';
          }

          limit = image_limit.value; // limit of image uploads dynamic by category response
          // console.log('in uploads limit => '+ limit);
          for (var s_p = 0; s_p < image_array.value.length; s_p++) {
              if (image_array.value[s_p].id && image_array.value[s_p].id == file.id) {
                  if (s_p < limit) {
                      image_array.value[s_p].file = myData.data.file;
                      image_array.value[s_p].url_img = myData.data.thumbnail;
                      image_array.value[s_p].id = '';
                  } else {
                      await image_array.value.splice(s_p, 1);
                  }
              }
          }

          multi_uploader.refresh();
      });



      // add image loading to show in progress ( use this faster then in function "FilesAdded" )
      let create_loading_img = (f) => {
          let store_old_img_length = count_current_length_img.value; // store the number of old image length
          limit = image_limit.value; // store limit of image upload that define from PAI dynamic
          store_old_img_length++;   // increase 1 if have new upload more
          if (store_old_img_length > limit) { // if bigger then limit, remove out
              multi_uploader.removeFile(f);    // remove file from plupload (spacial)
              store_old_img_length--; // if out of limit, minus 1
          } else {
              count_current_length_img.value = count_current_length_img.value + 1; // increase old image length
              check_upload_progress.value = check_upload_progress.value + 1; // count image upload for check
              image.push({ 'file': '', 'url_img': asset_url+version_library+'img/newLoading.gif', 'id': f.id });
              image_array.value = image; // add image loading to show in progress
          }
      };




      plupload.addFileFilter('check_image_size', function(minRes, file, cb) { // check size before upload to API (run before FilesAdded)
          // console.log('check_image_size');
          // console.log(file)

          // var self = this, img = new o.Image;           // old version of plupload 2.1.8
          var self = this, img = new moxie.image.Image();  // new version of plupload 2.3.7
          function finalize(result) {
              var msg = "Please upload image at less "+minRes+"px width and "+minRes+"px height.";
              if (img.width > 1000000 || img.height > 1000000) msg = "Image "+img.name+" too big."; // new
              // if (img.width > 6500 || img.height > 6500) msg = "Image "+img.name+" too big."; // old
              // cleanup
              img.destroy();
              img = null;
              // if rule has been violated in one way or another, trigger an error
              if (!result) {
                  self.trigger('Error', {
                      code : plupload.IMAGE_DIMENSIONS_ERROR,
                      message : msg,
                      file : file
                  });
              }
              cb(result);

              // create loading to UI if img check true
              if (result) { create_loading_img(file); }

          }
          if (file.type!="image/gif") {
              img.onload = function() {
                  // check if resolution cap is not exceeded
                  finalize((img.width > minRes && img.height > minRes) || (img.width < 1000000 && img.height < 1000000)); // new
                  // finalize((img.width > minRes && img.height > minRes) && (img.width < 6500 && img.height < 6500)); // old
              };
              img.onerror = function() {
                  finalize(false);
              };
              img.load(file.getSource());
          } else {
              finalize(1);
          }
      });
  }

  // ---- remove image from UI ----
  function remove_img(img_name) {
      for (var i = 0; i < image_array.value.length; i++) {
          if (img_name == image_array.value[i].file) {
              image_array.value.splice(i,1); // i = index; 1 = true
              count_current_length_img.value = count_current_length_img.value - 1;
          }
      }
      $('#modal_set_change_image').modal('hide'); // close modal set change pic
  }
  // ---- view full image post ----
  function view_full_image(img_name) {
      for (var i = 0; i < image_array.value.length; i++) {
          if (img_name == image_array.value[i].file) {
              $("#view_full_pic_dynamic").attr("href", image_array.value[i].url_img); // add image to link for preview
              // $('#view_full_pic_dynamic').trigger("click");  // click show
              ref_picture.value.click();                        // click show
              $('#modal_set_change_image').modal('hide');       // close modal set change pic
              break;
          }
      }
  }
  // ---- set as cover ----
  function set_as_cover(img_name) {
      for (var i = 0; i < image_array.value.length; i++) {
          if (img_name == image_array.value[i].file) {
              let store = image_array.value[i];
              image_array.value.splice(i,1);           // remove that index
              image_array.value.splice(0, 0, store);   // add old index to the first
              $('#modal_set_change_image').modal('hide');           // close modal set change pic
              break;
          }
      }
  }
  // ---- show modal change image ----
  function show_modal_change(file_name, cover) {
      photo_name.value = file_name;
      is_cover.value = cover;        // condition show option set image as cover.
      $('#modal_set_change_image').modal('show');
  }

  // ---- check number only ----
  function onlyNumber ($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) || keyCode === 46) { // 46 is dots
          $event.preventDefault();
      }
  }
  // ---- only number and allow use symbol dot ----
  function onlyNumber_with_dot ($event) {

      // console.log($event.which); // keyCodes value
      // console.log($event.key); // get value click

      let val_price = $('#id_add_price').val(); // get value from field price by id

      // const str = 'something123.777,123123,,,,.321something';
      let initialValue = val_price.replace(/[^0-9,.]+/g, ""); // clear string and get only number and (,.) by user type the keyboard

      // let clean_special_char = val_price.split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,eE <>\/?]/).join(""); // .toLowerCase(); // ot dak "."
      let clean_text = initialValue.split(',').join('.');

      form.value.ad_price = initialValue; // add value prevent character not cut out

      // check event if input character clear out and stop the function  ( use at future )
      /*if ((/[^a-zA-Z]/).test($event.key) === false) { // if false the input is character
          form.value.ad_price = clean_text; // clean character out
          return 0
      }*/

      let check_price = clean_text ? clean_text.substr(0, 1) : ''; // get the first text index of the string for check symbol
      // -- if click ',' first must to add 0 default --
      if (check_price === ',') { // check , .  ' val_price.includes(".") || val_price.includes(",")
          form.value.ad_price = '0';

      // -- check symbol '.' --
      } else {
          // if click '.' first
          if (check_price === '.') {
              form.value.ad_price = 0+clean_text; // add 0 in front of the price if have symbol '.' for the first

          // if click '.' in the middle of price
          } else {
              // console.log(val_price);
              let check_float = clean_text.indexOf("."); // get length dol . of string
              let get_string = clean_text.substr(0,check_float); // get string

              if (check_float !== -1) { // -1 happen when click . ofter number and if click number more it back to simple
                  let str_price = clean_text.substr(check_float, 3); // get text dol . of string
                  form.value.ad_price = get_string+str_price;
              }
          }
      }
  }
  // === use when have multiple select ===



  // ======= show static map =======
  function show_new_static_google_map() {
    // create map
    new_static_map.value = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'show_new_map_post_static',
      view: new View({
        center: [data_lng.value, data_lat.value],
        zoom: data_zoom.value,
        projection: 'EPSG:4326'
      }),
      controls: [] // clear all control button im map.
    });
    create_icon_marker([data_lng.value, data_lat.value]);
  }
  function create_icon_marker(val_center) {
    var marker = new Feature({ geometry: new Point(val_center) });
    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/icon/marker.svg',
      })
    });
    marker.setStyle(iconStyle);
    var vec_Source = new VectorSource({
      features: [marker]
    });
    var vec_Layer = new VectorLayer({
      source: vec_Source
    });

    new_static_map.value.addLayer(vec_Layer); // add marker to map.
  }
  // ======= google map =======
  function show_location() {
      show_current_location(''); // get current locations lat lng
      $('#show_modal_google_map').modal('show'); // show modal google map
  }
  function show_new_google_map() {
    // create map
    new_map.value = new Map({
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'show_new_map_post',
      view: new View({
        center: [def_lng.value, def_lat.value],
        zoom: def_zoom.value,
        projection: 'EPSG:4326'
      }),
      // controls: [] // clear all control button im map.
    });

    // event map change get lat, lng and zoom.
    new_map.value.on('moveend', function(evt) {
      // get lng and lat of the map.
      let get_lat_lng = new_map.value.getView().getCenter();
      lng.value = get_lat_lng[0];
      lat.value = get_lat_lng[1];
      // get zoom level of the map.
      zoom.value = parseInt(new_map.value.getView().getZoom());

      // console.log('lng = '+lng.value+'  lat = '+lat.value+'  zoom = '+zoom.value);
    });
  }
  function zoom_in() {
    const view = new_map.value.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom + 1);
    // console.log(zoom + 1);
  }
  function zoom_out() {
    const view = new_map.value.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom - 1);
    // console.log(zoom - 1);
  }
  /*function change_zoom_map(z_event) {
      if (is_click_btn_zoom.value) { // if click button zoom.
          // console.log('not allow zoom change => '+z_event);

      } else { // if zoom_in or zoom_out without click button.
          zoom.value = parseInt(z_event);     // api accept only inter, if float can not save map in to api.
          // console.log('zoom change => '+z_event);
      }
      is_click_btn_zoom.value = false;    // allow zoom change.
  }
  function zoom_in() {
    is_click_btn_zoom.value = true; // not allow zoom change.
    def_zoom.value += 1;
    def_lat.value = lat.value ? lat.value : def_lat.value;
    def_lng.value = lng.value ? lng.value : def_lng.value;
    zoom.value = def_zoom.value;
    // console.log(zoom.value)
  }
  function zoom_out() {
    is_click_btn_zoom.value = true; // not allow zoom change.
    def_zoom.value -= 1;
    def_lat.value = lat.value ? lat.value : def_lat.value;
    def_lng.value = lng.value ? lng.value : def_lng.value;
    zoom.value = def_zoom.value;
    // console.log(zoom.value)
  }*/
  function change_center_map(c_event) {
      lng.value = c_event[0];
      lat.value = c_event[1];
      // console.log('lng = '+c_event[0]+'  lat = '+c_event[1]);

      // lat.value = c_event.lat();
      // lng.value = c_event.lng();
      // console.log('lng = '+lng.value+'  lat = '+lat.value);
  }
  function sent_map() {
      // -- set value to data store in server --
      data_lat.value = lat.value ? lat.value : def_lat.value;
      data_lng.value = lng.value ? lng.value : def_lng.value;
      data_zoom.value = zoom.value ? zoom.value : def_zoom.value;
      form.value['map[x]'] = data_lat.value; // add lat to store in server.
      form.value['map[y]'] = data_lng.value; // add lng to store in server.
      // -- close modal show map --
      $('#show_modal_google_map').modal('hide');
      // -- show choose loc in modal google map --
      def_lat.value = data_lat.value;
      def_lng.value = data_lng.value;
      def_zoom.value = data_zoom.value;
      // -- show map static --
      show_map.value = true;

      // clear static old map and show new static map.
      $('#show_new_map_post_static .ol-viewport').remove(); // it removes child from the parent.
      setTimeout(() => { show_new_static_google_map(); },300);
  }
  function cancel_map() {
    $('#show_modal_google_map').modal('hide');
    lat.value = def_lat.value; lng.value = def_lng.value; zoom.value = def_zoom.value;  // if clear must to get old lat lng again.
  }
  function remove_lat_lng() {
      show_map.value = false; // show map static to empty
      data_lat.value = 0;
      data_lng.value = 0;
      data_zoom.value = 0;
      form.value['map[x]'] = ''; // remove lat from data for sent to server
      form.value['map[y]'] = ''; // remove lng from data for sent to server
  }
  function show_current_location(cur_location) {
      // check if user have own location
      let the_lat = '', the_lng = '', the_zoom = '';
      let user = auth_user.value.user.contact;
      if (post_id.value) { // -- Edit --
          the_lat = def_lat.value ? parseFloat(def_lat.value) : (user && user.map ? parseFloat(user.map.x) : '');
          the_lng = def_lng.value ? parseFloat(def_lng.value) : (user && user.map ? parseFloat(user.map.y) : '');
          the_zoom = def_zoom.value ? parseInt(def_zoom.value) : (user && user.map ? parseInt(user.map.z) : '');

      } else { // -- Add --
          // check if not choose loc yet, must to show current loc from auth user login
          the_lat = def_lat.value ? def_lat.value : (user && user.map ? parseFloat(user.map.x) : '');
          the_lng = def_lng.value ? def_lng.value : (user && user.map ? parseFloat(user.map.y) : '');
          the_zoom = def_zoom.value ? def_zoom.value : (user && user.map ? parseInt(user.map.z) : '');
      }

      navigator.geolocation.getCurrentPosition (
          (position) => {

              // set default prevent click on button my location not working.
              def_lat.value = 12.408612835420433;
              def_lng.value = 104.95790572031129;
              def_zoom.value = 7; // static lat lng middle in cambodia.

              // get current location
              // setTimeout(() => {
                  // start get current location only
                  if (cur_location) {
                      def_lat.value = position.coords.latitude;
                      def_lng.value = position.coords.longitude;
                      def_zoom.value = 16;
                      // console.log('current loc only');

                  // start check lat lng user or current location
                  } else {
                      def_lat.value = the_lat ? the_lat : position.coords.latitude;
                      def_lng.value = the_lng ? the_lng : position.coords.longitude;
                      def_zoom.value = the_zoom ? the_zoom : 16;
                      // console.log('all lat lng');
                  }

                  // --- prevent click save not change lat lng ---
                  lat.value = def_lat.value;
                  lng.value = def_lng.value;
                  zoom.value = def_zoom.value;
                  // --- prevent click save not change lat lng ---

                  // clear old map and show new map.
                  $('#show_new_map_post .ol-viewport').remove(); // it removes child from the parent.
                  show_new_google_map();
              // }, 100);

          },
          (e) => {
              // set default lat lng if error location or user dont have location, prevent data not change position when user click button.
              def_lat.value = the_lat ? the_lat : 12.408612835420433;
              def_lng.value = the_lng ? the_lng : 104.95790572031129;
              def_zoom.value = the_zoom ? the_zoom : 7; // static lat lng middle in cambodia.
              // console.log('Error, show lat lng');

              // clear old map and show new map.
              $('#show_new_map_post .ol-viewport').remove(); // it removes child from the parent.
              show_new_google_map();
          });
  }
  function home_location() {

    // if on static_map empty must to get lat lng from user login.
    if (!data_lat.value && !data_lng.value) {
      let user_loc = auth_user.value.user && auth_user.value.user.contact && auth_user.value.user.contact.map ? auth_user.value.user.contact.map : '';
      def_lat.value = user_loc.x ? parseFloat(user_loc.x) : '';
      def_lng.value = user_loc.y ? parseFloat(user_loc.y) : '';
      def_zoom.value = 15; // user_loc.z ? parseInt(user_loc.z) : '';

    // else static_map have data_lat and data_lng must go direct to that location.
    } else {
      def_lat.value = data_lat.value;
      def_lng.value = data_lng.value;
      def_zoom.value = 15; // data_zoom.value;
    }

    // --- prevent click save not change lat lng ---
    lat.value = def_lat.value;
    lng.value = def_lng.value;
    zoom.value = def_zoom.value;
    // --- prevent click save not change lat lng ---

    // clear old map and show new map.
    $('#show_new_map_post .ol-viewport').remove(); // it removes child from the parent.
    show_new_google_map();
  }




  // ---- check image error 404 must to show static image ----
  function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
  // ---- user tracking ----
  function save_tracking_user(user_track, clear_old) {
    helper.params_make_condition('tracking', user_track);
    helper.params_make_condition('clear', clear_old);
  }
  // ---- store all type params ----
  function save_track_optional(type, data_params) {
    helper.params_make_condition(type, data_params);
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>