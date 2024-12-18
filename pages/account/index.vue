
<template>
  <div :class="isMobile ? 'mt-5' : 'mt_80 min_h screen-content-desktop'">
    <!-- App Bar -->
    <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
        <header :class="img_cover || (user_data && user_data.user && user_data.user.cover) ? 'bg_app_bar_header_' : 'bg_app_bar_header_ box_shadow_app_bar'">
            <nav class="navbar navbar-light style_flex a_pad_app_bar nav_height">
                <div class="text-center">
                    <NuxtLink :to="localePath({ name: 'setting-edit-profile' })" aria-label="img" class="navbar-toggler mb-0 mt-1 ripple_change_language m-r-p-sm-pad">
                        <img class="profile_user profile_user_width_small bg-white" :alt="user_data && user_data.user ? user_data.user.name : ''"
                            :src='user_data && user_data.user && user_data.user.photo ? user_data.user.photo.small.url : empty_img_user'
                            @error="imageUrlAlt_profile">
                    </NuxtLink>
                </div>
                <div class="col p-0 truncate_wrap a_font_title_app_bar">
                    <p class="m-0"> {{ user_data && user_data.user ? user_data.user.name : '' }} </p>
                </div>
                <div class="style_flex float-right ">
                    <div @click="detectMob" class="btns ripple_icon_search">
                        <button type="button" class="btn pt-1 pb-1" aria-label="share">
                            <i class="icon-share1 font_22 text-white line_h_un"></i>
                        </button>
                    </div>
                    <div class="btns ripple_icon_search">
                        <NuxtLink :to="localePath({ name: 'setting' })" aria-label="setting" class="btn pb-1">
                            <i class="fas fa-cog font_21 text-white line_h_un"></i>
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </header>
    </div>

 <div class="max_width_form ">
  <!-- Profile User -->
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="isDesktop ? 'mt-3' : 'margin_below_app_bar'">
    <div class="large-12 columns borders" :class="isDesktop ? 'dt_border' : ''">
      <div class="position_relative">
        <!-- cover (cover not exist, show background color) -->
        <div v-if="img_cover || (user_data && user_data.user && user_data.user.cover)"  class="u_logo_height_vh position-relative">
          <div class="blur-profile-content">
            <!-- blur -->
            <div class="blur-profile-img" v-if="img_cover" v-bind:style="{ backgroundImage: 'url(' + img_cover + ')' }"></div>
            <div class="blur-profile-img" v-else-if="user_data && user_data.user && user_data.user.cover" v-bind:style="{ backgroundImage: 'url(' + user_data.user.cover.medium.url + ')' }"></div>
            <!-- display image -->
            <img :src="img_cover ? img_cover : (user_data && user_data.user && user_data.user.cover ? (check_screen_width ? user_data.user.cover.large.url : user_data.user.cover.medium.url) : empty_img_user)"
                id="set_img_cover" @click="show_or_change_pro('cover')" :alt="user_data && user_data.user ? user_data.user.name : ''" class="logo_profile_d_user cur_sur">
          </div>
          <a rel="nofollow" aria-label="photo" ref="ref_cover" :href="img_cover ? img_cover : (user_data && user_data.user && user_data.user.cover ? user_data.user.cover.url : empty_img_user)" data-fancybox="photo1"></a>
        </div>
        <div v-else @click="change_cover_empty" class="u_logo_height_px position-relative bg_parent_color cur_sur"></div>
        <div class="a_edit_cover">
          <a rel="nofollow" aria-label="pencil" id="cover_profile" href="javascript:void (0)">
            <i class="fas fa-pencil-alt a_mr_icon_cover"></i>
          </a>
        </div>

            <!-- profile -->
            <div class="a_absolute_pro_acc">
              <a rel="nofollow" aria-label="profile" ref="ref_profile" :href="img_pro ? img_pro : (user_data && user_data.user && user_data.user.photo ? user_data.user.photo.url : empty_img_user)" data-fancybox="photo2"></a>
              <!--<a rel="nofollow" id="show_pro" :href="img_pro ? img_pro : (user_data && user_data.user && user_data.user.photo ? user_data.user.photo.large.url : empty_img_user)" data-fancybox="photo2"></a>-->
              <a rel="nofollow" aria-label="photo" href="javascript:void(0)" class="position-relative">
                <img id="set_img_profile" @click="show_or_change_pro('profile')" :src="img_pro ? img_pro : (user_data && user_data.user && user_data.user.photo ? user_data.user.photo.medium.url : empty_img_user)"
                    :alt="user_data && user_data.user ? user_data.user.name : ''" class="profile_user bg-white u_profile_style_" @error="imageUrlAlt_profile">
                <div class="a_edit_profile">
                  <a rel="nofollow" id="user_profile" aria-label="pencil" href="javascript:void (0)">
                    <i class="fas fa-pencil-alt a_mr_icon"></i>
                  </a>
                </div>
              </a>
            </div>
          </div>
          <!-- show user -->
          <div class="a_more_obtions bg-white">
            <div class="a_head_obtions">
              <NuxtLink :to="localePath({ name: 'setting-edit-profile' })"  class="btn btn-sm border-edit-p">
                  {{ $t('message.edit_profile') }}
              </NuxtLink>
              <template v-if="isDesktop">
                <a rel="nofollow" aria-label="share" href="javascript:void(0)" @click="detectMob" class="dt_acc_setting btn btn-outline-secondary">
                    <i class="icon-share1"></i>
                </a>
                <NuxtLink :to="localePath({ name: 'setting' })" aria-label="setting" class="dt_acc_setting btn btn-outline-secondary">
                    <i class="fas fa-cog"></i>
                </NuxtLink>
              </template>
            </div>
            <div class="a_body_description">
              <div>

                <div class="d-flex align-items-center justify-content-start gap-2 mb-1">
                  <h1> {{ user_data && user_data.user ? user_data.user.name : '' }}</h1>
                  <span class="profile_verify_icon _fs_16" v-if="user_data?.user?.is_verify"><i class="bi bi-patch-check-fill"></i></span>
                </div>
                <div v-if="user_data && user_data.user && user_data.user.membership" class="d-flex justify-content-start align-items-center _mb_4" >
                  <p> {{ user_data && user_data.user && user_data.user.username ? '@'+user_data.user.username : '' }} </p>
                  <NuxtLink :to="localePath({ name: 'account-membership' })" class=" ms-2 cur_sur" :class="user_data.user.membership.type === 'normal' ? 'member_type1' : 'member_type'">
                    {{ user_data.user.membership.type === 'normal' ? $t(`account_t.upgrade_account`) : user_data.user.membership.title }}
                  </NuxtLink>
                </div>
                <div v-else-if="user_data && user_data.user && !user_data.user.membership">
                  <div class="d-flex justify-content-start align-items-center _mb_4">
                    <p> {{ user_data && user_data.user && user_data.user.username ? '@'+user_data.user.username : '' }} </p>
                    <NuxtLink :to="localePath({ name: 'account-membership' })" class="member_type ms-2 cur_sur">
                      Basic
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div v-if="count_follow" class="cont-follow">
                <div class="c-follow-1 cur_sur" @click="show_follows('followers',parseInt(count_follow.followers) > 0 ? true : false)">
                  <span>{{ parseInt(count_follow.followers) > 0 ? count_follow.followers : 0 }}</span>
                  {{ $t('new_text_3.followers') }}
                </div>
                <!--<template v-if="profile.type === 'user'">-->
                  &#8226;
                  <div class="c-follow-2 cur_sur" @click="show_follows('following',parseInt(count_follow.following) > 0 ? true : false)">
                    <span> {{ parseInt(count_follow.following) > 0 ? count_follow.following : 0 }}</span>
                    {{ $t('new_text_3.following') }}
                  </div>
                <!--</template>-->
              </div>
              <!-- <template v-if="user_data && user_data.user">
                <div v-if="user_data && user_data.user && user_data.user.membership" class="_flex_">
                  <p>{{ $t('message.member') }}</p>
                  <NuxtLink :to="localePath({ name: 'account-membership' })" class="member_type ml-2 cur_sur">
                    {{ user_data.user.membership.title }}
                  </NuxtLink>
                </div>
              </template> -->
            </div>
          </div>

        </div>
      </div>

  <!-- Fields user have action -->
  <div v-if="isMobile">
    <div class="a_content_s_fields d-flex flex-wrap" :class="isDesktop ? 'dt_border' : ''" style="justify-content: unset;">
      <NuxtLink :to="localePath({ name: 'account-liked' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="col-style p-0 text-center cur_sur">
        <i class="fa fa-heart"></i>
        <div>
          <div>
            <p>{{ $t('new_text.likes') }}</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink :to="localePath({ name: 'account-saved' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="col-style p-0 text-center cur_sur" id="m_w">
        <i class="fa fa-bookmark"></i>
        <div>
          <div>
            <p>{{ $t('new_text.saved') }}</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink :to="localePath({ name: 'account-apply-jobs' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="col-style p-0 text-center cur_sur">
        <i class="fas fa-briefcase"></i>
        <div>
          <div>
            <p>{{ $t('new_text.a_p') }}</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink :to="localePath({ name: 'account-job-applications' })" @click="save_track_optional('clear_old_data', { clear_old_data: 'clear' })" class="col-style p-0 text-center cur_sur" >
        <i class="fas fa-clipboard-list"></i>
        <span v-if="total_job_applications > 0" class="badge bg-danger" style="position:absolute;font-size:10px">{{ total_job_applications }}</span>
        <div>
          <div>
            <p>{{ $t('new_text.job_application') }}</p>
          </div>
        </div>
      </NuxtLink>
      <!-- <NuxtLink v-if="!personal.name" :to="localePath({ name: 'account-resume-start' })" class="col-style p-0 text-center cur_sur" id="m_w">
        <i class="fas fa-address-card"></i>
        <div>
          <div>
            <p>{{ $t('resume_cv.resume') }}</p>
          </div>
        </div>
      </NuxtLink> -->
      <NuxtLink :to="localePath({ name: 'account-resume' })" @click="resume" class="col-style p-0 text-center cur_sur" id="m_w">
        <i style="position: relative;" class="fas fa-address-card">
          <img v-if="check_cl_re" :src="asset_url+'icon/spark.gif'" alt="" style="width: 43px;position: absolute;top: -35%;left: -7%;">
        </i>
        <div>
          <div>
            <p>{{ $t('resume_cv.resume') }}</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink v-if="user_data?.user?.setting?.payment && user_data.user.setting.payment.includes('subscription')" :to="localePath({ name: 'account-subscriptions' })"  class="col-style p-0 text-center cur_sur" >
        <i class="fas"><img :src="asset_url+'icon/dolla.png'" alt="" style="width: 20px;border-radius: 5px;"></i>
        <div>
          <div>
            <p>{{ $t('account_t.subscription') }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>

      <!-- Fields Store -->
      <div v-if="store.length > 0 && isMobile" class="a_con_store_fields border" :class="isDesktop ? 'dt_border' : ''">
        <p class="title_s_con mb-2">{{ $t('new_text_1.store') }}</p>
        <template v-for="st in store" :key="st" >
          <div class="store_link_wrapper">

          <NuxtLink :to="localePath({ name: 'account-store-id', params: { id: st.id } })" class="store_list_wrapper" >
            <div class="store_profile_left">
              <!-- {{ st }} -->
                <div class="store_profile_left_profile">
                  <img v-if="st.logo && st.logo.small" :alt="st && st.username ? st.username : ''" :src="st.logo.small.url" />
                  <i v-else class="bi bi-buildings text-secondary"></i>
                </div>
                <div>
                    <p class="mb-0 store_user_name">{{st && st.title ? st.title : ''}}</p>
                    <p class="mb-0 store_name" >{{st && st.username ? '@'+st.username : ''}}</p>
                </div>
            </div>
            <i class="ion-ios-arrow-forward flex-1"></i>
          </NuxtLink>
        </div>

        </template>
      </div>

      <!-- Fields user have action -->
      <div class="a_content_search_fields border" :class="isDesktop ? 'dt_border' : ''">
        <h2> {{ $t('new_text_1.manage_my_ads') }} </h2>
        <template v-if="user_data && user_data.user && user_data.user.membership && user_data.user.membership.type !== 'normal'">
          <Qoute />
        </template>
        
        <!-- Search && Category -->
        <div class="w-100 d-flex mb-3">
          <div  class="style_flex w-100" v-if="profile && profile.member_type != 1">
            <div class="col-6 col_search">
              <div class="input-group a_border_box_search">
                <!-- button search -->
                <div class="input-group-append group_field_search_box">
                  <button @click="click_search('')" aria-label="search" class="btn" type="button">
                    <i class="ion-android-search"></i>
                  </button>
                </div>
                <!-- input search -->
                <input type="text" autocomplete="off" maxlength="255" class="form-control field-input-height p-1" id="search_field" v-on:keyup="keymonitor" v-model="keyword" v-bind:placeholder="$t('message.search')+'...'">
                <!-- clear search input -->
                <div v-if="the_route && the_route.query && the_route.query.keyword" @click="click_search('clear_keyword')" class="text-center a_icon_clear_search">
                  <i class="fas fa-minus-circle"></i>
                </div>
              </div>
            </div>
            <div class="col-6 col_category">
              <a rel="nofollow" href="javascript:void (0)" class="style_flex a_choose_category a_border_box_search">
                <div @click="show_pop_up_category" class="col-11 p-0">
                  <p v-if="the_route && the_route.query && the_route.query.category_name" class="truncate sub_category_margin a_mar_cat"> {{ the_route.query.category_name }} </p>
                  <p v-else class="truncate sub_category_margin a_mar_cat text_grey"> {{ $t('message.all_category') }} </p>
                </div>
                <div v-if="the_route && the_route.query && the_route.query.category_name && the_route.query.category" @click="click_search('clear_category')" class="a_btn_clear_cate">
                  <i class="fas fa-minus-circle text-danger a_mar_cat_icon"></i>
                </div>
                <div v-else class="col-1 text-center a_p_t_cate">
                  <i class="ion-ios-arrow-forward a_style_btn_search a_mar_cat_icon p-0 me-3"></i>
                </div>
              </a>
            </div>
          </div>
          <template v-if="user_data && user_data.user && user_data.user.membership && user_data.user.membership.type !== 'normal'">
            <div @click="clickModal()" class="btn ms-3 btn-light" data-bs-toggle="modal" data-bs-target="#modal_post_manage_filter" :class="isMobile ? 'm_filter' : 'd_filter'">
              <i v-if="isMobile" class="icon-fi-rr-settings-sliders"></i>
              <span v-else>
                <i class="bi bi-funnel me-1"></i>
                {{ $t('message.m_filter') }} 
              </span>
              <span v-if="num_filter > 0" class="badge bg_badge ms-2" style="top: unset; position: unset">{{ num_filter }}</span>
            </div>
          </template>
        </div>
        <!-- second Tap of tap Ads -->
        <ul id="ac_ch_tab" role="tablist" class="a_nav_custom nav-pills" :class="profile && profile.member_type != 1 ? '' : 'm-0'">
          <li @click="click_search('tab_active')" role="presentation" class="col nav-item">
            <a rel="nofollow" id="active_tap" data-bs-toggle="pill" href="#pills_active" role="tab" aria-controls="pills-home"
              :aria-selected="tap_active_or_expire === 'active' ? 'true' : 'false'"
              :class="tap_active_or_expire === 'active' || !tap_active_or_expire ? 'nav-link active' : 'nav-link'">
              {{ $t('new_text.active') }} ({{ counts ? counts.active : '0' }})
            </a>
          </li>
          <li @click="click_search('tab_expired')" role="presentation" class="col nav-item">
            <a rel="nofollow" id="expired_tap" data-bs-toggle="pill" href="#pills_expired" role="tab" aria-controls="pills-profile"
              :aria-selected="tap_active_or_expire === 'expired' ? 'true' : 'false'"
              :class="tap_active_or_expire === 'expired' ? 'nav-link active' : 'nav-link'">
              {{ $t('new_text.expired') }} ({{ counts ? counts.expired : '0' }})
            </a>
          </li>
        </ul>
        <!-- <button v-if="!isMobile && posts.length > 0" @click="btn_create_post" type="button" class="btn btn-k24-secondary km fn_20 ms-auto mt-3" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="desktop_ads_new_post">
            <i class="icon-camera icon_post_user"></i>
            <span class="ms-1">{{ $t('message.sell') }}</span>
        </button> -->
      </div>
      <!-- if user not verify phone number -->
      <template v-if="user_data && user_data.user && user_data.user.phone_activated === false">
        <div class="no_more_result p-2 cur_sur" @click="show_verify_phone_number">
          <div class="s_parent_content_activate">
            <div class="_flex_">
              <div class="activate_phone_number_icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <div class="s_content_activate_phone">
                <div>
                  <p class="truncate s_content_p1">{{ $t('new_text_1.text_acc_ver_title') }}</p>
                  <p class="s_content_p2"> {{ $t('new_text_1.text_acc_ver_content') }} </p>
                </div>
              </div>
            </div>
            <i class="ion-ios-arrow-forward s_content_arrow_activate"></i>
          </div>
          <br><br><br>
        </div>
      </template>

          <!-- Content Tab -->
          <div v-else class="tab-content" id="pills-tabContent">
            <!-------------------- Tap Ads -------------------->
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-ads">
              <div class="tab-content mx-1 mx-md-0"> <!-- must to add this because it class prevent error style multiple tap in tap -->
                <!------- Tap show active post ------->
                <div :class="tap_active_or_expire === 'active' || !tap_active_or_expire ? 'tab-pane fade show active' : 'tab-pane fade show'" id="pills_active" role="tabpanel" aria-labelledby="active_tap">
                  
                  <!-- Available Ads -->
                  <template v-if="availablePaidAds">
                    <div :class="isMobile ? 'ad_category_wrapper' : 'ad_category_wrapper_desktop'">
                      <div @click="changePaidAdFormData.id = item.id, setsAd(item)" :key="item.id" v-for="item in availablePaidAds" class="ad_category">
                        <p class="text-capitalize ad_category_title _fs_16 _mb_4">{{ item.title ?  $t(`account_t.${item.title.toLowerCase().split(' ').join('_')}`) : '' }}</p>
                        <p class="text-capitalize ad_category_date_category _fs_14 mb-0">{{ $t(`account_t.cate`)}}: {{ item.category_type && item.category_type ?  item.category_type.title: ''}}</p>
                        <p class="text-capitalize ad_category_date_category _fs_14 _mb_10">{{ $t(`account_t.valid_until`)}}: {{ forMatDate(item.end_date, locale) }}</p>
                        <button class="ad_category_set_ad_btn">{{ $t('account_t.set_ad_btn')}}<i class="bi bi-chevron-right"></i></button>
                      </div>
                    </div>
                  </template>
                  <template v-if="posts">
                    <div v-for="data in posts" :key="data" :class="!isMobile ? 'mb-1' : ''" class="_flex_" :id="'item_'+data.id">
                      <div class="col-12 no_padding" >
                        <div :class="isMobile ? 'pad_list_ overwrite_pad_list' : ''">
                          <!-- Ads / Posts Card -->
                          <div class="manage_posts_card mb-2">
                            <!-- show status on post -->
                            <div v-if="data.status === 'block'" class="a_status_post a_color_code_red">
                              <div class="ic-warn-acc-con">
                                <i class="fas fa-exclamation-circle font_15 p-1 pr-2"></i>
                              </div>
                              <p class="m-0"> {{ data.status_message }} </p>
                            </div>
                            <div v-if="data.status === 'pending'" class="a_status_post a_color_code_grey">
                              <div class="ic-warn-acc-con">
                                <i class="fas fa-exclamation-circle font_15 p-1 pr-2"></i>
                              </div>
                              <p class="m-0"> {{ data.status_message }} </p>
                            </div>
                            <!-- /show status on post -->
                            <a rel="nofollow" class="_flex_  ov_ad_card" href="javascript:void(0)" @click="show_notification(data.title, data.id, data.status === 'active' ? '' : data.status_message)">
                              <div class="a_auto_pad_renew">
                                <img :src="data.thumbnail ? data.thumbnail : empty_img_post" :alt="data.title" class="a_img_post_by bg_reload_img rounded-1" @error="imageUrlAlt_post">
                              </div>
                              <div class="pb-0 pl-1" :class="!mobileDevice ? 'pt-2' : 'pt-1 w-100'">
                                <p class="m-0 pro_name my_truncate_wrap_signle_line fn_18 font_light_bold"> {{ data.title }} </p>
                                <p v-if="data.price !== null" class="full_width truncate_wrap font_16 m-0 c_m_grey font_bold mar_top_list_post dt_pro_price">
                                  <strong class="color_red me-1"> {{ 1 > parseInt(data.price) ? '$'+data.price : '$'+convert_price(data.price) }} </strong>
                                  <span v-if="data.discount" class="pro_post_hour line_price"> ${{ convert_price(data.discount.original_price) }} </span>
                                  <span v-if="data.discount" class="m-0 ms-1 font_11 text_buy"> {{ data.discount.type === 'percent' ? Number(data.discount.discount)+'% OFF' : '$'+Number(data.discount.discount)+' OFF' }} </span>
                                </p>
                                <div class="show_short_detail mb-1">
                                  <div class="post_id">
                                    <span class="mr-2">{{$t(`account_t.ads_id`)}}: {{ data.id }}</span>
                                    <span class="d-inline-block" v-if="$device.isMobile">{{ $t('message.view') }}: {{ data.views ? data.views : '0' }}</span>
                                  </div>
                                  <dl>
                                    <dt>{{ $t('new_text.post_date') }}:</dt>  
                                    <dd> {{ data.posted_date ? formatDateWithTimeAgo(data.posted_date, locale) : '' }}&nbsp; &nbsp;</dd>
                                    <template v-if="$device.isMobile === false">
                                      <dt>{{ $t('new_text.renew_date') }}:</dt>
                                      <dd> {{ data.renew_date ? formatDateWithTimeAgo(data.renew_date, locale) : ''}}</dd>
                                    </template>
                                  </dl>
                                  <dl v-if="$device.isMobile" class="position-relative">
                                    <dt>{{ $t('new_text.renew_date') }}:</dt>
                                    <dd> {{ data.renew_date ? formatDateWithTimeAgo(data.renew_date, locale) : '' }}</dd>
                                  </dl>

                                  <dl class="position-relative">
                                    <div class="d-flex align-items-center " :class="mobileDevice ? 'justify-content-between' : ''">
                                      <div >
                                        <template v-if="$device.isMobile === false">
                                          <dt>{{ $t('message.view') }}:</dt>
                                          <dd>{{ data.views ? data.views : '0' }}&nbsp; &nbsp;</dd>
                                        </template>
                                        <dt>{{ $t('account_t.impression') }}:</dt>
                                        <dd> {{ data.insights && data.insights.impression  ? data.insights.impression : 0 }} &nbsp; &nbsp;</dd>
                                        <dt>{{ $t('account_t.engagement') }}:</dt>
                                        <dd> {{ data.insights && data.insights.engagement ? data.insights.engagement : 0 }}</dd>
                                      </div>
                                    </div>        
                                  </dl>
                                  <div class="d-flex" :class="mobileDevice ? 'flex-column align-items-start' : 'align-items-center gap-2'" >
                                    <dl v-if="data.hasOwnProperty('availability') && data.availability == false">
                                      <i class="unavailable_icon bi bi-ban text-danger"></i>
                                      <dt>{{ $t('account_t.mark_un') }}</dt>  
                                    </dl>
                                    <dl v-if="data.shipping" class="d-flex align-items-center" >
                                        <i class="bi bi-truck free_deliver_icon mr-1" ></i> <dt>{{ locale == 'km' ? 'ដឹកជញ្ជូនដោយឥតគិតថ្លៃ' : 'Free Delivery' }}</dt>  
                                    </dl>
                                  </div>
                                </div>
                              </div>
                              <div v-if="data.is_premium && ['top', 'featured', 'feature'].includes(data.premium.type)" class="position_absolute ad_card_type_premium_acc">
                                <p class="m-0">{{ data.premium.type ? $t(`account_t.${data.premium.type}`) : '' }}</p>
                              </div>  
                            </a>
                            <!-- Ads Info -->
                            <NuxtLink v-if="data.premium" @click="checkSubscription(data)" class="mb-2 d-flex justify-content-start align-items-center manage_ads_card_ad_info gap-1"  :class="isDesktop ? 'mx-2' : 'mx-1'">
                              <div class="d-flex justify-content-center align-items-center">
                                <div class="manage_ads_announcement_icon d-flex align-items-center justify-content-center">
                                  <i class=" bi bi-megaphone fs-6"></i>
                                </div>
                            </div>
                              <div class="pl-2 manage_ads_announcement_des">
                                <p class="manage_ads_announcement_des_tile text-capitalize"><span>{{ data.premium.type ? $t(`account_t.${data.premium.title.toLowerCase()}`) : ''}}</span> . <span :class="[data.premium.status =='active' ? 'active' : '', data.premium.status =='pending' ? 'pending' : '', data.premium.status =='expired' ? 'cancelled' : '', data.premium.status =='cancelled' ? 'expired' : '']">{{data.premium.status ? $t(`account_t.${data.premium.status}`)  : ''}}</span></p>
                                <p  class="manage_ads_announcement_des_date">{{ $t('account_t.last_change') }}: {{ forMatDate(data.premium.updated_at, locale) }}</p>
                                <p  class="manage_ads_announcement_des_date">{{ $t('account_t.valid_until') }}: {{ forMatDate(data.premium.end_date, locale) }}</p>
                              </div> 
                              <div v-if="data.premium && data.premium.subscription_id" class="manage_ads_announcement_info_icon">
                                <i class="bi bi-info-circle"></i>
                              </div>      
                            </NuxtLink>
                           
                            <!-- show set Auto Renew -->
                            <div v-if="data.auto_renew" class="style_flex a_auto_renew_overwrite mx-1" :class="isDesktop ? 'mx-2' : ''">
                              <div class="me-2"><i class="fas fa-history parent_color"></i></div>
                              <div class="col p-0"><p class="m-0"> {{ $t('new_text.auto_renew') }} : {{ data.auto_renew.renew_hour }}:{{ data.auto_renew.renew_minute }} {{ data.auto_renew.renew_ampm }}</p></div>
                              <div class="style_flex a_width_con_btn">
                                <a rel="nofollow" aria-label="edit" @click="edit_auto_renew(data.id,data.auto_renew.renew_hour,data.auto_renew.renew_minute,data.auto_renew.renew_ampm)" class="col text-center p-0 cl_ripple" href="javascript:void (0)">
                                  <i class="fas fa-pencil-alt a_mr_icon_cover"></i>
                                </a>
                                <a rel="nofollow" aria-label="remove" @click="remove_auto_renew(data.id)" class="col text-center p-0 cl_ripple" href="javascript:void (0)">
                                  <i class="fas fa-minus-circle a_mr_icon_cover text-danger"></i>
                                </a>
                              </div>
                            </div>
                             <!-- Boost post Link -->
                             <div v-if="data.actions && data.actions.includes('promote') && !data.premium" class="my-2 d-flex justify-content-between align-items-center manage_ads_card_ad_boost_post gap-1"  :class="isDesktop ? 'mx-2' : ''">
                              <div class="boost_description text-secondary  d-flex align-items-center justify-content-start pl-1">
                                <i class="bi bi-megaphone _fs_18 mr-2"></i>
                                <p class="mb-0 _fs_14">{{ $t('account_t.boost_post_des')}}</p>  
                              </div>
                              <button @click="promote(data)" type="button" class="btn_boost_post text-white flex-grow-1 border-0 outline-none rounded-1 ml-1 text-nowrap">{{ $t('account_t.boost_post')}}</button>    
                            </div>
                            <!-- Actions Ads -->
                            <div v-if="data.actions && data.actions.length">
                              <div v-if="data.status === 'block'" class="action_posts p-1 d-flex justify-content-lg-between gap-1">
                                <button v-if="data.actions && data.actions.includes('delete')" @click="deleteAd(data)" type="button" class="bg-white flex-grow-1 border-0 outline-none rounded-1"><i class="bi bi-trash icon mr-1"></i>{{ $t('message.delete') }}</button>
                              </div>
                              <div v-else class="action_posts p-1 d-flex justify-content-lg-between" :class="isDesktop ? 'mx-1' : ''" >     
                                <button v-if="!data.auto_renew" :disabled="renew_btn_disable(data.renew_date)" @click="renewAd(data)" type="button" :id="data.id" class="bg-white flex-grow-1 border-0 outline-none rounded-1" :class="renew_btn_disable(data.renew_date) ? 'disable_text' : ''" ><i class="bi bi-arrow-clockwise mr-1 _fs_16"></i>{{ $t('account_t.p_renew') }}</button>
                                <button v-if="!mobileDevice && data.actions && data.actions.includes('edit')" @click="() => router.push(localePath({ name: 'post-id', params: { id: data.id } }))" type="button" class="bg-white  flex-grow-1 border-0 outline-none rounded-1" ><i class="bi bi-pencil-square icon mr-1"></i>{{ $t('account_t.edit') }}</button>
                                <button v-if="!mobileDevice && data.actions && data.actions.includes('delete')" @click="deleteAd(data)" type="button" class="bg-white  flex-grow-1 border-0 outline-none rounded-1" ><i class="bi bi-trash icon mr-1"></i>{{ $t('account_t.delete') }}</button>
                                <button v-if="data.actions && data.actions.includes('share')" @click="share(data), dataShareModal = data "  type="button" class="bg-white flex-grow-1 border-0 outline-none rounded-1"><i class="icon-share1 mr-1 text-secondary mr-1"></i>{{ $t('account_t.share') }}</button>
                                <button v-if="!mobileDevice && data.actions.filter(action => action !== 'edit' && action !== 'view' && action !== 'share' && action !== 'promote' && action !== 'delete').length > 0" @click="show_modal_option(data, data.id, data.total_job_application ? data.total_job_application : '', data.title ? data.title : '')" class="show_more_action_ad rounded-1">
                                  <i class="icon-ellipsis-vertical action_option_custom_bi"></i>
                                  <span v-if="data.total_job_application && data.total_job_application > 0" class="badge bg-danger post-badge-apply-job">{{ data.total_job_application }}</span>
                                </button>
                                <button v-if="mobileDevice && data.actions.filter(action => action !== 'view' && action !== 'share' && action !== 'promote').length > 0" @click="show_modal_option(data, data.id, data.total_job_application ? data.total_job_application : '', data.title ? data.title : '')" class="show_more_action_ad rounded-1">
                                  <i class="icon-ellipsis-vertical action_option_custom_bi"></i>
                                  <span v-if="data.total_job_application && data.total_job_application > 0" class="badge bg-danger post-badge-apply-job">{{ data.total_job_application }}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-if="!isDesktop">
                    <ClientOnly>
                      <VueEternalLoading :load="get_active_post" v-model:is-initial="isInitial" :key="key_initial" v-if="key_initial > 1" margin="800px">
                        <template #loading>
                          <div style="width: 100%;padding: 0;">
                            <!-- loading when data have -->
                            <div v-if="posts.length > 0" class="text-center mt-4">
                              <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                            <!-- loading when data empty -->
                            <div v-else class="full_width mt-2">
                              <div v-for="s in 3" :key="s" class="col-12 no_padding">
                                <div class="pad_list_">
                                  <div class="my_card padding_my_card">
                                    <div class="_flex_">
                                      <div class="animated-background load-width-scroll"></div>
                                      <div class="pb-0 pt-1 pl-2 full_width">
                                        <div class="animated-background mb-2 text_hei_loading_title"></div>
                                        <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                        <div class="_flex_">
                                          <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                          <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                                        </div>
                                        <div class="animated-background mb-2 text_hei_loading"></div>
                                        <div class="animated-background text_hei_loading"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                        <template #error="{ retry }">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                            <div class="no_more_result p-2">
                              <div class="p_bg_status">
                                <span class="fas fa-wifi size_icon_status"></span>
                                <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                <button type="button" @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                              </div>
                            </div>
                          </div>
                        </template>
                        <template #no-more>
                          <div class="no_more_result mt-4 mb-2">{{ $t('message.no_more_result') }}</div>
                        </template>
                        <template #no-results>
                          <div class="no_more_result" :class="isMobile ? 'n-m-r-mg' : 'border py-5 bg-white rounded-2'">
                            <template v-if="route.query && route.query.check_tap">
                              <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                              <p class="no_more_result mt-2">{{ $t('account_t.message_not_active_post') }}</p>
                            </template>
                            <template v-else>
                              <i class="icon-camera u_no_result_font"></i>
                              <p class="no_more_result mt-2"> {{ $t('new_text_3.empty_ads') }} </p>
                              <NuxtLink :to="localePath({ name: 'post' })" class="btn fns-17 btn-k24-secondary custom_btn_ empty_btn_alert">
                                {{ $t('new_text_3.sell_your_staff') }}
                              </NuxtLink>
                              <br><br><br>
                            </template>
                          </div>
                        </template>
                      </VueEternalLoading>
                    </ClientOnly>
                    <br><br><br>
                  </template>
                  <template v-else>
                    <div v-if="dt_ac_loading" class="width_100 text-center mt-4FC" ref="targets">
                      <div v-if="posts.length > 0" class="text-center mt-4 mb-4">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                      </div>
                      <div v-else class="full_width mt-2">
                        <div v-for="s in 3" :key="s" class="col-12 no_padding">
                          <div class="pad_list_">
                            <div class="my_card padding_my_card">
                              <div class="_flex_">
                                <div class="animated-background load-width-scroll"></div>
                                <div class="pb-0 pt-1 pl-2 full_width">
                                  <div class="animated-background mb-2 text_hei_loading_title"></div>
                                  <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                  <div class="_flex_">
                                    <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                    <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                                  </div>
                                  <div class="animated-background mb-2 text_hei_loading"></div>
                                  <div class="animated-background text_hei_loading"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="des_btn_load_more">
                      <button v-if="ac_hide_btn_load_more" @click="manually_get_active_post" class="btn">{{ $t('text_desktop.load_more') }}</button>
                      <div v-else-if="posts.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                        <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                      </div>
                    </div>
                  </template>
                </div>
                <!------- Tap show expired ------->
                <div :class="tap_active_or_expire === 'expired' ? 'tab-pane fade show active' : 'tab-pane fade show'" id="pills_expired" role="tabpanel" aria-labelledby="expired_tap">
                  <template v-if="expired_posts">
                    <div v-for="exp_data in expired_posts" :key="exp_data"  class="_flex_ account_ad_expired" :id="'item_'+exp_data.id" :class="!isMobile ? 'mb-1' : 'mt-2'">
                      <div class="col-12 no_padding">
                        <div :class="isMobile ? 'pad_list_' : 'pt-2 padding_ad'">
                          <div class="expired_ad_card padding_my_card">

                        <!-- show status on post -->
                        <div v-if="exp_data.status === 'expired'" class="a_status_re_post">
                          <div class="ic-warn-acc-con">
                            <i class="fas fa-exclamation-circle a_margin_icon font_15"></i>
                          </div>
                          <p class="m-0 ml-1">{{ exp_data.status_message }}</p>
                        </div>
                        <div v-else-if="exp_data.status === 'block'" class="a_status_post a_color_code_red">
                          <div class="ic-warn-acc-con">
                            <i class="fas fa-exclamation-circle font_15 p-1 pr-2"></i>
                          </div>
                          <p class="m-0 ml-1"> {{ exp_data.status_message }} </p>
                        </div>
                        <!-- /show status on post -->
                        <!-- is block -->
                        <a rel="nofollow" v-if="exp_data.status === 'block'" href="javascript:void(0)" @click="click_show_block(exp_data.status_message)" class="_flex_">
                          <div style="padding: 6px;">
                            <img :src="exp_data.thumbnail ? exp_data.thumbnail : empty_img_post" class="a_img_post_by bg_reload_img" @error="imageUrlAlt_post">
                          </div>
                          <div class="pb-0 pt-1 pl-2">
                            <p class="m-0 pro_name a_truncate_wrap font_14 font_light_bold dt_pro_name"> {{ exp_data.title }}</p>
                            <p v-if="parseInt(exp_data.price) > 0" class="color_red full_width m-0 font_16 mar_top_list_post dt_pro_price">
                              {{ 1 > parseInt(exp_data.price) ? '$'+exp_data.price : '$'+convert_price(exp_data.price) }}
                            </p>
                            <div class="show_short_detail mb-1">
                              <dl>
                                <dt>{{ $t('account_t.ads_id') }} :</dt>
                                <dd> {{ exp_data.id }} &nbsp;&nbsp;&nbsp; </dd>
                                <dt>{{ $t('message.view') }} :</dt>
                                <dd> {{ exp_data.views ? exp_data.views : '0' }} </dd>
                              </dl>
                              <dl>
                                <dt>{{ $t('new_text.post_date') }} : </dt>
                                <dd> {{ exp_data.posted_date ? formatDateWithTimeAgo(exp_data.posted_date, locale) : '' }}</dd>
                              </dl>
                              <dl>
                                <dt>{{ $t('new_text.renew_date') }} : </dt>
                                <dd> {{ exp_data.renew_date ? formatDateWithTimeAgo(exp_data.renew_date, locale) : ''}}</dd>
                              </dl>
                            </div>
                          </div>
                        </a>
                        <!-- click show detail if not block -->
                        <a rel="nofollow" v-else href="javascript:void(0)" @click="show_detail(exp_data.title, exp_data.id)" class="_flex_">
                          <div style="padding: 6px;">
                            <img :src="exp_data.thumbnail ? exp_data.thumbnail : empty_img_post" class="a_img_post_by bg_reload_img rounded-1" @error="imageUrlAlt_post">
                          </div>
                          <div class="pb-0 pt-1 pl-2">
                            <p class="m-0 pro_name a_truncate_wrap font_14 font_light_bold dt_pro_name"> {{ exp_data.title }}</p>
                            <p class="color_red full_width m-0 font_16 mar_top_list_post dt_pro_price">
                              {{ 1 > parseInt(exp_data.price) ? '$'+exp_data.price : '$'+convert_price(exp_data.price) }}
                            </p>
                            <div class="show_short_detail mb-1">
                              <dl>
                                <dt>{{ $t('account_t.ads_id') }} :</dt>
                                <dd> {{ exp_data.id }} &nbsp;&nbsp;&nbsp; </dd>
                                <dt>{{ $t('message.view') }} :</dt>
                                <dd> {{ exp_data.views ? exp_data.views : '0' }} </dd>
                              </dl>
                              <dl>
                                <dt>{{ $t('new_text.post_date') }} : </dt>
                                <dd> {{ exp_data.posted_date ? formatDateWithTimeAgo(exp_data.renew_date, locale) : ''}}</dd>
                              </dl>
                              <dl>
                                <dt>{{ $t('new_text.renew_date') }} : </dt>
                                <dd> {{ exp_data.renew_date ? formatDateWithTimeAgo(exp_data.renew_date, locale) : '' }}</dd>
                              </dl>
                            </div>
                          </div>
                        </a>
                        <div class="style_flex mt-1 a_border_t_of_post expired_ad_actions justify-content-between">
                          <!-- Re-post -->
                          <button v-if="exp_data.status === 'block'" class="bg-white w-50 border-0 outline-none rounded-1 disable_text"><i class="bi bi-arrow-repeat mr-1"></i>{{ $t('new_text.re_post') }}</button>
                          <button v-else @click="() => router.push(localePath({ name: 'post-id', params: { id: exp_data.id }, query: { from: 'account_expired_ads', type: 'expired' } }))"  type="button" class="bg-white w-50 border-0 outline-none rounded-1">
                            <i class="bi bi-arrow-repeat mr-1"></i>{{ $t('new_text.re_post') }}
                          </button>
                          <!-- Delete -->
                          <button @click="show_modal_delete(exp_data.id, '', 'expired')"  type="button" class="bg-white w-50 border-0 outline-none rounded-1">
                            <i class="bi bi-trash icon mr-1"></i>{{ $t('message.delete') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="!isDesktop">
                <ClientOnly>
                  <VueEternalLoading :load="get_expired_post" v-model:is-initial="isInitial" :key="key_initial" v-if="key_initial > 1" margin="800px">
                    <template #loading>
                      <div style="width: 100%;padding: 0;">
                        <!-- loading when data have -->
                        <div v-if="expired_posts.length > 0" class="text-center mt-4">
                          <img :src="asset_url+version_library+'img/newLoading.gif'" alt="laoding" class="loading_width">
                        </div>
                        <!-- loading when data empty -->
                        <div v-else class="full_width mt-2">
                          <div v-for="s in 3" :key="s" class="col-12 no_padding">
                            <div class="categories_padding">
                              <div class="my_card padding_my_card">
                                <div class="_flex_">
                                  <div class="animated-background load-width-scroll"></div>
                                  <div class="pb-0 pt-1 pl-2 full_width">
                                    <div class="animated-background mb-2 text_hei_loading_title"></div>
                                    <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                                    <div class="_flex_">
                                      <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                      <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                                    </div>
                                    <div class="animated-background mb-2 text_hei_loading"></div>
                                    <div class="animated-background text_hei_loading"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #error="{ retry }">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                        <div class="no_more_result p-2">
                          <div class="p_bg_status">
                            <span class="fas fa-wifi size_icon_status"></span>
                            <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                            <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                            <button type="button" @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #no-more>
                      <div class="no_more_result mt-4">{{ $t('message.no_more_result') }}</div>
                    </template>
                    <template #no-results>
                      <div class="no_more_result" :class="isMobile ? 'n-m-r-mg' : 'border py-5 bg-white rounded-2'">
                        <!-- <i class="fa fa-exclamation-circle u_no_result_font"></i>
                        <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p> -->
                        <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                        <p class="no_more_result mt-2">{{ $t('account_t.message_not_expired_post') }}</p>
                      </div>
                    </template>
                  </VueEternalLoading>
                </ClientOnly>
                <br><br><br>
              </template>
              <template v-else>
                <div v-if="dt_expi_loading" class="width_100 text-center mt-4" ref="targets">
                  <div v-if="expired_posts.length > 0" class="text-center mt-4 mb-4">
                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                  </div>
                  <div v-else class="full_width mt-2">
                    <div v-for="s in 3" :key="s" class="col-12 no_padding">
                      <div class="pad_list_">
                        <div class="my_card padding_my_card">
                          <div class="_flex_">
                            <div class="animated-background load-width-scroll"></div>
                            <div class="pb-0 pt-1 pl-2 full_width">
                              <div class="animated-background mb-2 text_hei_loading_title"></div>
                              <div class="animated-background mb-2 text_hei_loading_price width_50"></div>
                              <div class="_flex_">
                                <div class="col-5 animated-background mb-2 me-1 p-0 text_hei_loading"></div>
                                <div class="col-5 animated-background mb-2 ms-1 p-0 text_hei_loading"></div>
                              </div>
                              <div class="animated-background mb-2 text_hei_loading"></div>
                              <div class="animated-background text_hei_loading"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="des_btn_load_more">
                  <button v-if="expi_hide_btn_load_more" @click="manually_get_expired_post" class="btn">{{ $t('text_desktop.load_more') }}</button>
                  <div v-else-if="expired_posts.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                    <i class="fa fa-exclamation-circle u_no_result_font"></i>
                    <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading_field" class="loading_back_ground">
      <div class="loading_img">
        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading" class="loading_width loading_bg">
      </div>
    </div>

    <div class="loading_back_ground d-none" id="open_or_close_loading_field">
      <div class="loading_img">
        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading" class="loading_width loading_bg">
      </div>
    </div>

    <!-- show success message -->
    <div class="toast style_toast d-none acc_toast toast_z_index overwrite_toast_manage_post">
      <div class="toast-header header_padding_toast">
        <strong class="me-auto style_flex">
          <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
          <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
          <p class="m-0 ms-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
        </strong>
        <button type="button" class="close overwrite_clost_toast_manage_post_btn" data-bs-dismiss="toast" aria-label="Close">
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
    <!-- /show success message -->

    <!-- Modal show change or view profile picture -->
    <div class="modal fade " :class="isMobile ? 'style_full_screen' : ''" id="modal_change_image" tabindex="-1" role="dialog">
      <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
        <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
          <div :class="isMobile ? 'modal_bottom_screen' : ''">
            <div class="option_selected">
              <div class="modal-body p-0">
                <ul class="list-unstyled mobile_modal_actions_container">
                  <li @click="view_or_change('view')" class="color_reason mobile_modal_action cur_sur">
                    <a rel="nofollow" class="m-auto text-primary"> {{ $t('message.the_view') }} </a>
                  </li>
                  <li @click="view_or_change('change')" class="color_reason mobile_modal_action cur_sur">
                    <a rel="nofollow" class="m-auto text-primary"> {{ $t('message.change') }} </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="a_cancel_btn_modal_bg">
              <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>
              </div>
            </div> -->
            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button text-danger">{{ $t(`message.cancel`) }}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal show change or view profile picture -->

    <!-- Modal show delete reason post -->
    <div class="modal fade" :class="isMobile ? 'style_full_screen': ''" id="modal_show_delete_reason" tabindex="-1" role="dialog">
      <div class="modal-dialog" :class="isMobile ? ' modal_dialog_style' : 'modal-dialog-centered m-auto m_w'" role="document">
        <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
          <div :class="isMobile ? 's_content' : 'dt_modal_width'">
            <div class="border_bottom m-r-p-pad">
              <p class="modal-title font_15"> {{ $t('lng.delete_reason') }} </p>
            </div>
            <div class="modal-body p-0" :class="isMobile ? 'overflow_content' : ''">
              <ul class="list-unstyled bg-white">
                <li @click="choose_delete(re.value)" v-for="re in delete_post.data" :key="re" class="full_field_tag cur_sur">
                  {{ language === 'km' ? re.km : re.en }}
                  <i v-if="re.value === delete_check" class="fas fa-check color_sub_icon mt-1 float-right c_orange"></i>
                </li>
              </ul>
              <div v-if="show_description" class="u_rep_pad_sub">
                <textarea v-model="delete_description" rows="4" id="delete_description" :placeholder="$t('new_text_1.description')" class="form-control"></textarea>
                <label id="error_delete_description" class="text-danger font_14 ms-2 d-none">{{ $t('validation.error_description') }}</label>
              </div>
            </div>
            <!-- button submit report -->
            <div class="p-2 text-center _flex_ border-top">
              <div @click="close_delete_modal" class="col-4 p-0 cur_sur">
                <p class="font_16 modal-title p-2 bg_grey me-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
              </div>
              <div @click="click_delete_ads" class="col-8 p-0 cur_sur">
                <p class="font_16 modal-title p-2 bg_orange text-white rounded cur_sur"> {{ $t('message.delete') }} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal show delete reason post -->

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

    <!-- Modal show set auto renew -->

    <!-- <div class="modal fade" :class="isMobile ? 'style_full_screen' : ''" id="modal_set_auto_renew" tabindex="-1" role="dialog">
      <div class="modal-dialog" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto m_w'" role="document">
        <div class="modal-content" :class="isMobile ? 'animate-bottom' : 'rounded'">
          <div :class="isMobile ? 'modal_bottom_screen' : 'dt_modal_width'">
            <div class="option_selected">
              <div class="modal-body p-0">
                <ul class="list-unstyled list-phone-modal">
                  <li @click="set_auto_renew" class="color_reason cl_ripple cur_sur">
                    <a rel="nofollow" class="full_field_a_tag border_unset"> {{ $t('new_text.set_auto_renew') }}  </a>
                  </li>
                  <li v-if="post_job_unread > 0" class="color_reason cl_ripple cur_sur border_top">
                    <a rel="nofollow" @click="show_jobs_unread" class="full_field_a_tag border_unset">
                      {{ $t('new_text.job_application') }} {{ '( '+post_job_unread+' )' }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a_cancel_btn_modal_bg">
              <div class="cl_ripple a_cancel_btn_modal cur_sur" data-bs-dismiss="modal" aria-label="Close">
                <p class="modal-title color_reason"><b> {{ $t('message.cancel') }} </b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    
    <!----------------------------------------------->
    <div class="modal class_modal_show_message" id="modal_choose_time_picker" tabindex="-1" role="dialog">
      <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
        <div class="modal-content max_width_form">
          <div class="modal-body break_word_ show_text_status p-3">
            <b> {{ $t('new_text.set_auto_renew') }} </b> <br>

            <div class="row mt-1">
              <!-- select hour -->
              <div class="col">
                <select class="form-control" v-model="renew_hours">
                  <option v-for="in_hour in arr_hour" :key="in_hour" :value="in_hour"> {{ in_hour }} </option>
                </select>
              </div>
              <!-- select minute -->
              <div class="col">
                <select class="form-control" v-model="renew_minute">
                  <option v-for="in_hour in arr_minute" :key="in_hour" :value="in_hour"> {{ in_hour }} </option>
                </select>
              </div>
              <!-- select am or pm -->
              <div class="col">
                <select class="form-control" v-model="renew_am_or_pm">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>
            </div>

          </div>
          <div class="modal-footer u_safety_footer">
            <button type="button" data-bs-dismiss="modal" class="btn"> {{ $t('message.cancel') }} </button>
            <button type="button" @click="click_save_auto_renew" class="btn parent_color"> {{ $t('new_text.save') }} </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal show set auto renew -->

    <!-- alert show error message -->
    <div class="modal fade class_modal_show_message" id="modal_show_error" tabindex="-1" role="dialog">
      <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
        <div class="modal-content max_width_form">
          <div class="modal-body break_word_ show_text_status p-3"> {{ show_error_message }} </div>
          <div class="modal-footer u_safety_footer">
            <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.close') }} </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /alert show error message -->

    <!-- alert show option share media -->
    <div class="modal fade t-0 b-0" id="modal_show_option_share_profile" tabindex="-1" role="dialog">
      <div class="modal-dialog modal_dialog_style max_width_ mg_center class_modal_show_status" role="document">
        <div class="modal-content max_width_form">

          <div class="option_selected">
            <div class="text-center border_bottom m-r-p-sm-pad">
              <p id="label_phone_or_sms" class="modal-title font_19">{{ $t('new_text.share') }}</p>
            </div>
            <ul id="list-phone-modal" class="list-unstyled list-phone-modal">
              <li @click="facebook_sharing" class="cl_ripple">
                <div class="cur_sur full_field_a_tag color_reason _flex_">
                  <div class="col _flex_ p-0 mt-1">
                    <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                    <p class="img_share_option_color">Facebook</p>
                  </div>
                </div>
              </li>
              <li @click="twitter_sharing" class="cl_ripple">
                <div class="cur_sur full_field_a_tag color_reason">
                  <div class="col _flex_ p-0 mt-1">
                    <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                    <p class="img_share_option_color">Twitter</p>
                  </div>
                </div>
              </li>
              <li @click="copy_link(profile.link)" class="cl_ripple">
                <div class="cur_sur full_field_a_tag color_reason">
                  <div class="col _flex_ p-0 mt-1">
                    <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                    <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                    <div class="h-c-parent">
                      <input id="copy_link" v-on:focus="$event.target.select()" ref="clickLink" readonly :value="config.VUE_APP_BASE_URL+profile.username" class="hide_copy_text"/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer u_safety_footer">
              <button type="button" data-bs-dismiss="modal" class="btn text-primary font_18"> {{ $t('message.close') }} </button>
          </div>

        </div>
      </div>
    </div>
    <!-- /alert show option share media -->

    <!-- remove auto renew -->
    <div class="modal class_modal_show_message" id="modal_confirm_remove_auto_renew" tabindex="-1" role="dialog">
        <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
            <div class="modal-content max_width_form">
                <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text.remove_auto_renew') }} </div>
                <div class="modal-footer u_safety_footer">
                    <button type="button" @click="click_remove_auto_renew()" class="btn text-primary text-danger"> {{ $t('new_text.remove') }} </button>
                    <button type="button" data-bs-dismiss="modal" class="btn text-primary"> {{ $t('message.cancel') }} </button>
                </div>
            </div>
        </div>
    </div>

    <!-- modal categories -->
    <Modal_listing_categories :get_category_by_user="category_by_user" v-if="profile && profile.member_type != 1" />
    <!-- /modal categories -->

    <!-- Actions Ad Modal -->
    <div class="modal fade" id="actionModal" tabindex="-1" aria-labelledby="actionModalLabel" aria-modal="true" role="dialog">
      <div class="modal-dialog" :class="mobileDevice ? 'ov_mobile_modal modal-fullscreen': 'modal-dialog-centered mx-auto'"> 
        <div class="modal-content p-2" :class="!mobileDevice ? 'bg-transparent': 'overwrite_model_content'">
          <div v-if="dataAdAction && dataAdAction.actions && dataAdAction.actions.length" class="mobile_modal_actions_container">
            <div class="action_modal_header">
              <h3 class="action_modal_header_ad_title" :class="mobileDevice ? '_fs_14' : '_fs_18'">{{ dataAdAction.title ?? '' }}</h3>
            </div>
            <button type="button" @click="actionModal(a, dataAdAction)" :key="a" v-for="a in dataAdAction.actions.filter(v => mobileDevice ? !(['view', 'share', 'renew', 'promote']).includes(v) : !(['view', 'share', 'renew', 'promote', 'delete', 'edit']).includes(v) ) " class="mobile_modal_action text-primary"> 
                <i v-if="a=='edit'" class="bi bi-pencil-square icon"></i>
                <i v-if="a=='delete'" class="bi bi-trash icon"></i>
                <svg v-if="a=='auto_renew'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" id="entypo-back-in-time" width="22" height="22" fill="currentColor"><g><path d="M11 1.799c-4.445 0-8.061 3.562-8.169 7.996V10H.459l3.594 3.894L7.547 10H4.875v-.205C4.982 6.492 7.683 3.85 11 3.85c3.386 0 6.131 2.754 6.131 6.15 0 3.396-2.745 6.15-6.131 6.15a6.099 6.099 0 0 1-3.627-1.193l-1.406 1.504A8.13 8.13 0 0 0 11 18.199c4.515 0 8.174-3.67 8.174-8.199S15.515 1.799 11 1.799zM10 5v5a1.01 1.01 0 0 0 .293.707l3.2 3.2c.283-.183.55-.389.787-.628L12 11V5h-2z"/></g></svg>
                <i v-if="a=='insights'" class="bi bi-globe-americas icon"></i>
                <i v-if="a=='availability' &&  dataAdAction.availability" class="bi bi-ban icon"></i>
                <i v-if="a=='availability' &&  !dataAdAction.availability" class="bi bi-check-circle icon"></i>
                <i v-if="a=='paid_ads'" class="bi bi-repeat custom_bi icon"></i>
                {{ a.toLowerCase() =='availability' ? ( dataAdAction.availability ? $t(`account_t.mark_un`) : $t(`account_t.mark_av`) ) : ''}}
                {{ a.toLowerCase() !='availability' ? $t(`account_t.${a}`) : ''}}
            </button>
            <button v-if="dataAdAction.total_job_application > 0" class="mobile_modal_action text-primary" @click="router.push(localePath({ name: 'account-job-applications', query:{ post_id: dataAdAction.id ,title: dataAdAction.title }}))">
              <i class="bi bi-clipboard2 icons"></i>
              <div>{{ $t('new_text.job_application') }}</div>
              (<span class="text-danger"> {{ dataAdAction.total_job_application }} </span>)
            </button>
          </div>
          <button type="button" data-bs-dismiss="modal" class="mobile_modal_cancel_button text-primary">{{ $t(`account_t.cancel`) }}</button>
        </div>
      </div>
    </div>

    <!-- Delete Ad Modal -->
    <div class="modal fade" id="deleteAdModal" aria-hidden="true" aria-labelledby="deleteAdModalLabel" tabindex="-1">
      <div class="modal-dialog" :class="mobileDevice ? 'ov_delete_mobile_modal modal-fullscreen ': 'modal-dialog-centered mx-auto'">
        <div class="ov_delete_mobile_modal modal-content" :class="mobileDevice ? 'ov_delete_mobile_modal pb-2': 'ov_delete_desktop_modal'">
          <div :class="mobileDevice ? 'delete_modal_actions_container': 'delete_modal_actions_container_desktop'">
            
            <div class="mb-0 delete_reason_modal_bar d-flex text-center" :class="!mobileDevice ? 'bg-white text-dark py-3 postion-relative' : 'delete_reason_modal_bar_height position-absolute'">{{ $t('lng.delete_reason') }}</div>
            
            <div class="delete_reason_title_wrapper" :class="mobileDevice ? 'delete_reason_title_wrapper_mobile' : ''" >
              <li class="delete_reason_title" :key="r" v-for="r in deleteReasons" @click="deleteForm.reason = r.value , (deleteForm.reason != 'other' ? (typeing= false, deleteForm.description = '') : '')" ><span>{{ locale == 'en' ? r.en : r.km }}</span><span v-if="r.value == deleteForm.reason" class="delete_reasone_slect_icon"><i class="bi bi-check2-circle"></i></span></li>
                <div v-if="deleteForm.reason == 'other'" class="px-3 mt-3 position-relative">
                    <label class="text-secondary" for="deleteReasone">{{ $t('account_t.reason') }}:</label>
                    <input :class="deleteForm.description.length < 10 ? 'error_border_field' : ''" class="delete_reason_input" type="text" id="deleteReasone" name="deleteReasone" @input="checkExist($event)" v-model="deleteForm.description" :placeholder="locale == 'en' ? 'Please write down your description here...' : 'សូមសរសេរការពិពណ៌នារបស់អ្នកនៅទីនេះ...'"  @keyup.enter="submitDeleteReason('#deleteAdModal')" />
                    <span v-if="!deleteForm.description.length" class="error_delete_field"><i class="bi bi-exclamation-circle"></i><span class="error_field_description"> {{ $t('validation.error_description') }}</span></span>
                    <span v-if="deleteForm.description.length && ( deleteForm.description.length < 10 || deleteForm.description.length > 255 )" class="error_delete_field"><i class="bi bi-exclamation-circle"></i><span class="error_field_description">{{ locale == 'en' ? 'The description field must be between 10 and 255 characters.' : 'ការពិពណ៌នាត្រូវតែចន្លោះ ១០​ ទៅ ២៥៥ តួអក្សរ។'}} </span></span>
                </div>
              </div>
            <div :class="mobileDevice ? 'test_mobile_delete_button_wrapper' : 'desktop_delete_button_wrapper px-3 mt-5 gap-2'">
              <button @click="resetDeleteForm" data-bs-dismiss="modal" class="btn form-control-lg btn-xm billind_add_cancel_btn w-25 _light_border"><span>{{ $t('account_t.cancel') }}</span></button>
              <button @click="submitDeleteReason('#deleteAdModal')" class="w-75 btn form-control-lg btn-xm btn-k24-secondary"><span>{{ $t('account_t.delete') }}</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal Desktop -->
    <div class="modal fade t-0 b-0" id="modal_show_option_share"  tabindex="-1" role="dialog">
        <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
            <div class="modal-content" :class="isMobile ? 'max_width_form s_content p-3 bg-modal' : 'rounded'">
                <div class="option_selected">
                    <div class="text-center border_bottom m-r-p-sm-pad">
                        <p class="modal-title font_19">{{ $t('new_text.share') }}</p>
                    </div>
                    <ul class="list-unstyled mobile_modal_actions_container mb-0">
                        <li @click="sharePostTofacebook()" class="mobile_modal_action py-2">
                            <div class="cur_sur color_reason _flex_">
                                <div class="col _flex_ p-0">
                                    <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                                    <p class="img_share_option_color">Facebook</p>
                                </div>
                            </div>
                        </li>
                        <li @click="sharePostToTwitter()"  class="mobile_modal_action py-2">
                            <div class="cur_sur color_reason">
                                <div class="col _flex_ p-0">
                                    <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                                    <p class="img_share_option_color">Twitter</p>
                                </div>
                            </div>
                        </li>
                        <li @click=copyPostURL(dataShareModal.link) class="mobile_modal_action py-2">
                            <div class="cur_sur color_reason">
                                <div class="col _flex_ p-0">
                                    <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                                    <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                                    <div class="h-c-parent">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mt-3">
                    <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`account_t.cancel`) }}</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Share Profile -->
    <div class="modal fade t-0 b-0" id="modal_show_option_share_profile"  tabindex="-1" role="dialog">
        <div class="modal-dialog bg-modal" :class="isMobile ? 'modal_dialog_style' : 'modal-dialog-centered m-auto top_60 pos_static'" role="document">
            <div class="modal-content" :class="isMobile ? 'max_width_form s_content p-3 bg-modal' : 'rounded'">
                <div class="option_selected">
                    <div class="text-center border_bottom m-r-p-sm-pad">
                        <p class="modal-title font_19">{{ $t('new_text.share') }}</p>
                    </div>
                    <ul class="list-unstyled mobile_modal_actions_container mb-0">
                        <li @click="facebook_sharing" class="mobile_modal_action py-2">
                            <div class="cur_sur color_reason _flex_">
                                <div class="col _flex_ p-0">
                                    <img :src="asset_url+version_library+'img/face_book_logo.svg'" alt="facebook" class="img_share_option_p_n">
                                    <p class="img_share_option_color">Facebook</p>
                                </div>
                            </div>
                        </li>
                        <li @click="twitter_sharing"  class="mobile_modal_action py-2">
                            <div class="cur_sur color_reason">
                                <div class="col _flex_ p-0">
                                    <img :src="asset_url+version_library+'img/share_twitter.svg'" alt="twitter" class="img_share_option_p_n">
                                    <p class="img_share_option_color">Twitter</p>
                                </div>
                            </div>
                        </li>
                        <li class="mobile_modal_action py-2">
                            <div class="cur_sur color_reason">
                                <div class="col _flex_ p-0">
                                    <img :src="asset_url+version_library+'img/share_link.svg'" alt="copy link" class="img_share_option_p_n">
                                    <p class="img_share_option_color">{{ $t('new_text_1.link') }}</p>
                                    <div class="h-c-parent">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mt-3">
                    <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`account_t.cancel`) }}</button>
                </div>
            </div>
        </div>
    </div>

    <!-- My Ads Modal -->
    <div class="modal fade" id="myChangeAdsModal" tabindex="-1" aria-labelledby="myChangeAdsModalLabel" aria-hidden="true">
      <div class="modal-dialog m-0" :class="!mobileDevice ? 'modal-dialog-centered mx-auto mt-3' : 'modal-fullscreen'">
        <div id="myadsContent" class="modal-content" :class="!mobileDevice ? 'mobile_content_adsmodal_desktop' : 'mobile_content_adsmodal_mobile'" >
          <div class="mobile_content_adsmodal_navbar">
            <button data-bs-dismiss="modal"  class="mobile_content_adsmodal_navbar_icon"><i class="bi bi-chevron-down custom_bi"></i></button>
            <span class="mobile_content_adsmodal_navbar_title">{{ $t('new_text_1.my_ads') }}</span>
          </div>
          <div class="modal-body modal-body-adsmodal overflow-y-scroll p-2">
            <div class="search-ads-post mb-3" style="position: relative;">
              <div @click="searchAds()"  class="btn border-s-0" style="position:absolute;right:0;top:0;bottom: 0;z-index:1;display: flex;align-items: center;" ><i class="bi bi-search"></i></div>
              <input type="text" v-model="search_ads" placeholder="Search..." class="form-control more_border" :class="mobileDevice ? 'field-height' : 'dt-field-height'" name="" id="search_Ads" v-on:keyup="keymonitorAds">
            </div>
            <div @click="changePaidAdFormData.adid = item.id, navigateMyAdModalContent('#myadsContent'), changeAdSelected = item" :key="item" v-for="item in myAd" class="modal-body_ads_item"> 
              <div class="modal-body_ads_item_thumnail">
                <img :src="item.thumbnail ? item.thumbnail : asset_url+version_library+'icon/empty_post.png'" alt="" />
              </div>
              <div class="modal-body_ads_item_detail">
                <div class="top">
                  <p class="modal-body_ads_item_detail_title _mb_2">{{ item.title ? item.title : '' }}</p>
                  <span>
                    <span class="mr-2 _fs_12">{{ $t(`account_t.ads_id`) }}: {{ item.id }}</span>
                    <span class="_fs_12">{{ $t(`account_t.view`)}}: {{ item && item.views ? item.views : 0 }}</span>
                  </span>
                  <span class="_fs_12">{{ $t(`account_t.posted`)  }}: {{ forMatDate(item.posted_date, locale) }}</span>
                  <span class="_fs_12" v-if="item.renew_date"  >{{ $t(`account_t.renewed`) }}: {{ forMatDate(item.renew_date, locale) }}</span>
                </div>
                <div class="bottom">
                  <span>{{ item.price ? '$'+ formatAmount(item.price) : '' }} </span>
                </div>
              </div>
            </div>
            <VueEternalLoading :load="loadAd" v-model:is-initial="isInitialMyAd" class="mb-4 mt-2">
                <template #loading>
                  <div class="text-center mt-4">
                      <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                  </div>
                </template>
                <template #no-more>
                  <div class="my-no-more enternal_loading_message">
                    {{ $t('message.no_more_result')}}
                  </div>
                </template>
                <template #no-results>
                  <div class="my-no-results enternal_loading_message">
                    {{ $t('message.no_result')}}
                  </div>
                </template>

                <template #error>
                  <div class="my-error enternal_loading_message">
                    Oops. We've got an error.
                  </div>
                </template>
              </VueEternalLoading>
          </div>
        </div>
        
        <div id="changePremiumContent" class="modal-content sliding-element d-none" :class="!mobileDevice ? 'mobile_content_adsmodal_desktop' : 'mobile_content_adsmodal_mobile'">
          <div class="mobile_content_adsmodal_navbar">
            <button @click="navigateMyAdModalContent('#changePremiumContent')" class="mobile_content_adsmodal_navbar_icon"><i class="bi bi-chevron-left custom_bi"></i></button>
            <span class="mobile_content_adsmodal_navbar_title">{{ changeAd ?  $t('account_t.change_ad') : $t('account_t.set_ad') }}</span>
          </div>
          <div class="modal-body modal-body-adsmodal d-flex flex-column justify-content-start align-items-center pt-3">
            <div class="adsmodal_change_premium_ad_card rounded-2">
                <div class="adsmodal_change_premium_ad_card_thumnail">                        
                  <img :src="changeAdSelected && changeAdSelected.thumbnail ? changeAdSelected.thumbnail : asset_url+version_library+'icon/empty_post.png'" alt="" />
                </div>
                <div class="adsmodal_change_premium_ad_card_detail">
                  <div class="adsmodal_change_premium_ad_card_detail_description">
                      <p class="adsmodal_change_premium_ad_card_detail_description_title _mb_4">{{ changeAdSelected ? changeAdSelected.title : '' }}</p>
                      <span>
                        <span class="_fs_14 mr-2">{{ $t(`account_t.ads_id`) }}: {{ changeAdSelected ? changeAdSelected.id : ''}}</span>
                        <span class="_fs_14">{{ $t(`account_t.view`) }}: {{ changeAdSelected && changeAdSelected.views? changeAdSelected.views : 0 }}</span>
                      </span>
                      <span class="_fs_12">{{ $t(`account_t.posted`)  }}: {{ changeAdSelected ? forMatDate(changeAdSelected.posted_date, locale) : '' }}</span>
                      <span class="_fs_12">{{ $t(`account_t.renewed`) }}: {{ changeAdSelected ? formatDateWithTimeAgo(changeAdSelected.renew_date, locale) : '' }}</span>
                      <span class="adsmodal_change_premium_ad_card_detail_price">{{ changeAdSelected && changeAdSelected.price ? '$'+ formatAmount(changeAdSelected.price) : '' }}</span>
                  </div>
                </div>
              </div>
            <div class="mt-4 adsmodal_change_premium_ad_note_description">
                <span><b>{{ $t('account_t.note')}}:</b> {{ $t('account_t.change_ad_note')}}</span>
            </div>
          </div>
          <div class="modal_admodal_button_submit_wrapper py-2">
            <button type="button" class="btn custom_btn_ form-control btn-lg text-white btn-k24-secondary rounded-2" @click="submitSetOrChangePaidAd">{{ $t(`message.submit`) }}</button>
          </div>
        </div> 
      </div>
    </div>

    <div class="modal fade style_full_screen" id="modal_post_manage_filter" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
      <div class="modal-dialog " :class="isMobile ? 'modal-fullscreen' : 'modal-dialog-centered m-auto'" role="document">
        <div class="modal-content rounded">
          <div class=" d-flex align-items-center justify-content-between border-bottom py-2 shadow-sm ">
            <div class="btn" data-bs-dismiss="modal" aria-label="Close"><i class="icon-clear fn_24"></i></div>
            <div><strong>{{ $t('message.m_filter') }}</strong></div>
            <div class="btn" @click="crlearFilter">{{ $t('message.clear') }}</div>
          </div>
          <div class="modal-body">
            <template v-if="all_filer.sort">
              <label class="label"> {{ all_filer.sort.title }} </label>
              <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
              <select class="form-control mb-3 more_border" v-model="form[all_filer.sort.fieldname]" :class="isMobile ? 'field-height' : 'dt-field-height'">
                  <template v-for="option in all_filer.sort.options" :key="option" >
                    <option v-if="option.fieldvalue === 'default'" value="">
                        {{ option.fieldtitle }}
                    </option>
                    <option v-if="option.fieldvalue !== 'default'" v-bind:value="option.fieldvalue">
                        {{ option.fieldtitle }}
                    </option>
                  </template>
              </select>
            </template>

            <template v-if="all_filer.ad_types">
              <label class="label"> {{ all_filer.ad_types.title }} </label>
              <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
              <select class="form-control  mb-3 more_border" v-model="form[all_filer.ad_types.fieldname]"  :class="isMobile ? 'field-height' : 'dt-field-height'">
                <option value=""></option>  
                <option v-for="option in all_filer.ad_types.options" :key="option" v-bind:value="option.fieldvalue">
                    {{ option.fieldtitle }}
                </option>
              </select>
            </template>

            <template v-if="all_filer.availability">
              <label class="label"> {{ all_filer.availability.title }} </label>
              <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
              <select class="form-control mb-3 more_border" v-model="form[all_filer.availability.fieldname]" :class="isMobile ? 'field-height' : 'dt-field-height'">
                  <option value=""></option>
                  <option v-for="option in all_filer.availability.options" :key="option" v-bind:value="option.fieldvalue">
                      {{ option.fieldtitle }}
                  </option>
              </select>
            </template>

            <template v-if="all_filer.date">
              <label class="label"> {{ all_filer.date.title }} </label>
              <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
              <select class="form-control mb-3 more_border" v-model="form[all_filer.date.fieldname]" :class="isMobile ? 'field-height' : 'dt-field-height'">
                <option value=""></option>  
                <option v-for="option in all_filer.date.options" :key="option" v-bind:value="option.fieldvalue">
                      {{ option.fieldtitle }}
                  </option>
              </select>
            </template>

            <template v-if="all_filer.locations">
              <template v-if="all_filer.locations.province">
                <label class="label"> {{ all_filer.locations.province.title }} </label>
                <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
                <select class="form-control mb-3 more_border" @click="show_data_next($event, '', 'district')" v-model="form['province']"  ref="selectProvince" id="selectProvince" :class="isMobile ? 'field-height' : 'dt-field-height'">
                  <option value=""></option>
                  <template v-for="val in locations.all">
                    <option v-if="val.type === 'province'" :value="val.slug">{{ locale==='km' ? val.km_name : val.en_name}}</option>
                  </template>
                </select>
              </template>

              <template v-if="all_filer.locations.district">
                <label class="label"> {{ all_filer.locations.district.title }} </label>
                <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
                <select class="form-control mb-3 more_border" @click="show_data_next($event,'', 'commune')" v-model="form['district']" ref="selectDistrict" id="selectDistrict" :class="isMobile ? 'field-height' : 'dt-field-height'" :disabled="!form['province']">
                  <option value=""></option>
                  <template v-for="val in district" >
                    <option v-if="val.type === 'district'" :value="val.slug">{{ locale==='km' ? val.km_name : val.en_name}}</option>
                  </template>
                </select>
              </template>

              <template v-if="all_filer.locations.commune">
                <label class="label"> {{ all_filer.locations.commune.title }} </label>
                <i class="ion-android-arrow-dropdown s_icon_in_select_option me-3"></i>
                <select class="form-control mb-3 more_border" v-model="form['commune']" :class="isMobile ? 'field-height' : 'dt-field-height'" :disabled="!form['district']">
                  <option value=""></option>
                  <template v-for="val in commune" >
                    <option v-if="val.type === 'commune'" :value="val.slug">{{ locale==='km' ? val.km_name : val.en_name}}</option>
                  </template>
                </select>
              </template>
            </template>

            <template v-if="all_filer.prices">
              <div class="style_flex mb-3">
                  <div class="col p-0 me-2">
                      <label class="label"> {{ all_filer.prices.ad_price.title }} </label>
                      <input type="number" pattern="[0-9]*" v-model="form[all_filer.prices.ad_price.min_field.fieldname]" decimal="true" @keypress="onlyNumber"  v-bind:placeholder="all_filer.prices.ad_price.min_field.title+' '+ all_filer.prices.ad_price.min_field.prefix.text"
                          class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" maxlength = "11">
                  </div>
                  <div class="col p-0 ms-2">
                      <label class="label text-white">.</label>
                      <input type="number" pattern="[0-9]*" decimal="true" v-model="form[all_filer.prices.ad_price.max_field.fieldname]" @keypress="onlyNumber" v-bind:placeholder="all_filer.prices.ad_price.max_field.title+' '+ all_filer.prices.ad_price.max_field.prefix.text"
                          class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" maxlength = "11">
                  </div>
              </div>
            </template>
          
          </div>
          <button type="button" @click="click_search('more_filters')" class="btn btn-k24-secondary m-3">Apply</button>
        </div>
      </div>
  </div>

    <!-- Change ads modal error -->
    <div class="modal fade ov_background_erorr_modal" id="changeAdErrorModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="changeAdErrorModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered rounded-2 mx-auto" :class="mobileDevice ? 'vh-100' : ''">
        <div class="modal-content mx-4 modal_content_error_changead_modal" :class="mobileDevice ? 'modal_content_change_ad_mobile' : ''">
          <div class="modal-header d-flex justify-content-center py-3 border-1">
            <p class="mb-0 adsmodal_change_premium_ad_card_detail_description_title">{{ $t(`account_t.problem_occurs`) }}</p>
          </div>
          <div class="modal-body modal_body_error_changead_modal" :class="mobileDevice ? 'overflow-y-scroll' : ''">
              <span>{{ errorData.message ? errorData.message : '' }}</span>
          </div>
          <div class="modal-footer border-1 p-1">
            <button type="button" class="btn ov_close_change_ad light_bg_btn w-100 text-black rounded-2" data-bs-dismiss="modal">{{ $t(`account_t.close`) }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 403 / 404 Modal -->
    <div class="modal fade" id="failModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="Label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mx-auto" :class="mobileDevice ? 'vh-100' : '' ">
        <div class="modal-content rounded-3" :class="mobileDevice ? 'fail_modal_content' : 'fail_modal_content_desktop'" >
          <div class="modal-header d-flex justify-content-center py-3 border-1">
            <h1 v-if="errorData.type" class="modal-title _fs_18" id="staticBackdropLabel">{{ $t(`account_t.${errorData.type}`)}}</h1>
          </div>
          <div class="modal-body py-3" :class="mobileDevice ? 'overflow-y-scroll overflow-x-hidden' : ''" >
            <p class="text-center _fs_16">{{ errorData.message ? errorData.message : '' }}</p>
          </div>
          <div class="modal-footer d-flex justify-content-center p-1">
            <button type="button" class="btn w-100 py-2 _fs_16 fw-medium light_bg_btn" data-bs-dismiss="modal">{{ $t(`account_t.close`)}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- My Toast -->
  <div class="toast_wrapper">
    <div id="successToast" class="ov_renew_success_toast toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
          <div class="d-flex">
              <div class="toast-body d-flex gap-2 align-items-start w-100 shadow-sm border">
                <span class="toast_success_icon"><i class="bi bi-check-circle-fill"></i></span>
                <span>{{ set_new ? set_new : $t(`account_t.${successToastMessage}`) }}</span>
                <div @click="closeModalSuccess" class="btn-close ms-auto cursor-pointer"></div>
            </div>
        </div>
    </div>
  </div>  
  <div class="toast_wrapper">
    <div id="errorToast" class="ov_renew_erro_toast toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
          <div class="d-flex">
              <div class="toast-body d-flex gap-2 align-items-start">
                <span class="toast_error_icon"><i class="bi bi-info-circle"></i></span>
                <span class="text-black">{{ errorToastMessage }}</span>

            </div>
        </div>
    </div>
  </div>  
</template>

<script setup>
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';
import Modal_listing_categories from "/components/Pop_up_main_categories";
import { VueCookieNext } from 'vue-cookie-next';
import { event, pageview, query } from 'vue-gtag';
import helper from "/helper";

const isDesktop = helper.check_is_desktop(); // check userAgent
// const isMobileDevice = helper.pc_or_mobile_device(); // check userAgent
definePageMeta( { middleware: "auth" } ); // use layout dont have bottom nav bar check auth.
const runtime_config = useRuntimeConfig();            // setup config env to config variable.
const config = runtime_config.public;
const route = useRoute();
const router = useRouter();
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'; // config.VUE_APP_BASE_URL;
const empty_img_profile = ref("/icon/user-icon1.png");
const empty_img_user = ref("/icon/user-icon.png");
const empty_img_post = ref("/icon/empty_post.png");
const ch_cl_re = useCookie('ch_cl_re')
const ch_us = useCookie('ch_us')
const check_cl_re = useState('check_cl_re',()=>'')


// const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
// const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
const localePath = useLocalePath();
const { locale } = useI18n();
const language = ref(locale.value)
const user_data = ref('');
const categories = ref('');

const pageSize = ref(0)
const posts = ref([])
const expired_pageSize = ref(0);
const expired_posts = ref([]);
const counts = ref('');
const loading = ref(false);
const loading_field = ref(false);
const post_id = ref(null);
const delete_reason = ref('');
const tap_active_or_expire = ref(route.query && route.query.check_tap ? route.query.check_tap : '');
const delete_ad_expired = ref('');
const show_error_message = ref('');
const message_success = ref('');
const error_or_success_message = ref(true);
const selectedShow_MainCategory = ref(''); // declare for load component to template (Main Category)
const profile_or_cover = ref('');
// const show_loading_request_active = ref(false);
const check_screen_device = ref(false); // ref(true = phone screen,  false = pc
const check_screen_width = ref(false);  // check screen width for show image post big or small
const the_route = route;
const ref_cover = ref(null);
const ref_profile = ref(null);

const key_initial = ref(1);         // key for reload scroll again.
const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again).

/*const total_applied_jobs = ref(0);*/
const total_job_applications = ref(0);
const post_job_unread = ref(0);
const post_job_title = ref('');
const full_path = ref('');          // full path of url page.

const keyword = ref(route.query.keyword ? route.query.keyword : ''); // key word search
const img_cover = ref('');  // for store recently change cover
const img_pro = ref('');    // for store recently change profile

const profile = ref('');
const count_follow = ref('');
const store = ref([]);

const renew_hours = ref('01');
const renew_minute = ref('00');
const renew_am_or_pm = ref('am');
const arr_hour = ref(['01','02','03','04','05','06','07','08','09','10','11','12']);
const arr_minute = ref(['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17',
    '18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37',
    '38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57',
    '58','59']);

// --- data change category by user ---
const category_by_user = ref('');

// --- desktop load more ---
const ac_hide_btn_load_more = useState('ac_hide_btn_load_more', () => true);
const dt_ac_loading = ref(false);
const expi_hide_btn_load_more = useState('expi_hide_btn_load_more', () => true);
const dt_expi_loading = ref(false);

// --- delete post ---
const delete_post = ref([]);
const delete_check = ref('');
const delete_description = ref('');
const show_description = ref('');

// --- condition check request (if 401 three time clear auth user) ---
const reload_q_again_1 = ref(0); const reload_q_again_6 = ref(0); const reload_q_again_11 = ref(0);
const reload_q_again_2 = ref(0); const reload_q_again_7 = ref(0); const reload_q_again_12 = ref(0);
const reload_q_again_3 = ref(0); const reload_q_again_8 = ref(0); const reload_q_again_13 = ref(0);
const reload_q_again_4 = ref(0); const reload_q_again_9 = ref(0);
const reload_q_again_5 = ref(0); const reload_q_again_10 = ref(0);

// --- state subscritiption ---
const subPageSize = useState('subPageSize',() => 0);
const mySubscription = useState('mySubscription', () => [])


// --- meta variable ---
const meta_title_acc = useState('meta_title_acc', () => 'Manage Ads - Khmer24.com');
const GetAll = useState('GetAll',()=>'')
const mobileDevice = ref(helper.m_or_d())
const dataAdAction = ref(null)
const shareButtonSipining = ref(false)
const errorToast = ref('')
const errorToastMessage = ref('')
const successToast = ref('')
const successToastMessage = ref('')
const set_new =ref('')
const typeing = ref(false)
const deleteReasons = ref('')
const deleteForm = reactive({
    id: '',
    type: '',
    reason: '',
    description: ''
})
const dataShareModal = ref('')
const shortLink = ref('')
const availablePaidAds = ref([])
const paidAdItem = ref('')
const changeAd = ref('')

const myAd = useState('myAd', () => [])
let myAdOffset = 0
const isInitialMyAd = ref(true);

const filterMyAd = reactive({'category_type': '', 'category': ''})
const changePaidAdFormData = reactive({'id': '', 'adid': null})
const changeAdSelected = ref('')
const errorData = reactive({'type': null, 'message': null, 'code': null, 'status': null})

// Reset state
const subscription = useState('subscription', () => [])
const subscriptionOffset = useState('subscriptionOffset', () => 0);
const subscriptionHistories = useState('subscriptionHistories', () => [])
const subscriptionHistoriesOffset = useState('subscriptionHistoriesOffset', () => 0)
subscriptionHistories.value = []
subscriptionHistoriesOffset.value = 0
subscription.value = []
subscriptionOffset.value = 0
const a_j_a_pageSize = useState('a_j_a_pageSize', () => 0);
const a_j_a_job_applications = useState('a_j_a_job_applications', () => []);
const isMobile= ref(helper.m_or_d())
const attemptRequest = ref(0)
const check_post = useState('check_post',()=>0)
const check_post_limit = useState('check_post_limit',()=>[])
const store_renew = useState('store_renew', ()=> false)
const province = ref('');
const district = ref('');
const commune = ref('');
const selectProvince = ref(null);
const selectDistrict = ref(null);
const form = ref({})
const locations = await useLocations()
const all_filer = useState('all_filer',()=>'')
 
useHead({
  title: meta_title_acc.value,
  meta: [
    // -- ios --
    // { name: 'apple-mobile-web-app-title', content: meta_title_acc.value },
    // -- seo page --
    { name: 'keywords', content: 'Buy, Sell' },
    { name: 'description', content: 'Buy, Sell' },

    { property: 'og:title', content: meta_title_acc.value },
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


      onMounted(()=>{
        if (process.client) {  
          check_post.value = 0
          check_post_limit.value = []
          a_j_a_pageSize.value = 0
          a_j_a_job_applications.value = []
          hidOverflow();
          $('#changePremiumContent').addClass('d-none')
          $('#myadsContent').removeClass('d-none')
          const myModal = document.getElementById('myChangeAdsModal');
          if (myModal) {
            myModal.addEventListener('hidden.bs.modal', function () {
              $('#actionModal').modal('hide')
                $('#changePremiumContent').addClass('d-none')
                $('#myadsContent').removeClass('d-none')
                filterMyAd.category_type = ''
                // changeAd.value = true
                myAd.value = []
                myAdOffset = 0
                isInitialMyAd.value = true;
            });
          }

          // Reset delete form when delete modal close
          const deleteModal = document.getElementById('deleteAdModal');
          if (deleteModal) {
            deleteModal.addEventListener('hidden.bs.modal', function () {
              resetDeleteForm()
            })
          }

        successToast.value = $('#successToast')
        errorToast.value = $('#errorToast')

        // --- set state of subscription --- 
        subPageSize.value = 0
        mySubscription.value = []

        check_auth_user();
        categories.value = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
        let auth = localStorage.getItem("auth_user") ? JSON.parse(localStorage.getItem("auth_user")) : [];
        profile.value = auth ? auth.user : '';

        // --- if bigger than 400 show big image, else show small image ---
        if (screen.width >= 400) { check_screen_width.value = true; }
        // --- this form not set condition in router.js ---
        window.scrollTo(0, 0); // so set scroll to top auto if first reload
        // --- add fullPath ---
        full_path.value = route.fullPath;

        // --- clear old pl-upload div ---
        $('.a_edit_cover').children().remove("div");  $('.a_edit_profile').children().remove("div");

        // --- ready function on upload ( change cover_profile and profile_user ) ---
        setTimeout( function() {
          ready_function_cover_image();
          ready_function_image_profile();
        }, 300); // create pl-upload.

      // ---- remove class modal-open is user click back on button phone or click arrow browser ----
      helper.remove_class_modal_open();

      // ---- check screen of device user ----
      check_screen_userAgent();

      // ---- reset scroll loader again ----
      setTimeout(function () {
        isInitial.value = true;
        key_initial.value += 1;
      },300)

      if (isDesktop && posts.value.length === 0) {
          manually_get_active_post(); // In Desktop View and post empty for the first, must get new data.
      }
      if (isDesktop && expired_posts.value.length === 0) {
          manually_get_expired_post(); // In Desktop View and post empty for the first, must get new data.
      } 

      get_all_total_count()

      // --- Fancybox without hash (not push state history browser) ---
      Fancybox.defaults.Hash = false;
      if(isMobile.value){
        get_profile()
      }
      getFollow()

      const ch_resume = localStorage.getItem('isCheckedR');
      const id_u = user_data.value.user.id
      const ch_id = localStorage.getItem('ch_us'); 
      if(!ch_resume){
        localStorage.setItem('isCheckedR', true);
        check_cl_re.value = true
      }else if(ch_resume != true && id_u == ch_id){
        localStorage.setItem('isCheckedR', false);
        check_cl_re.value = false
      }else{
        localStorage.setItem('isCheckedR', true);
        check_cl_re.value = true
      }

      // getManageFilter();

      if(route.query.province){
        show_data_next('', route.query.province, 'district')
        if(route.query.district){
          show_data_next('', route.query.district, 'commune')
        }
      }
      
    }
  })
  
  onBeforeUnmount(() => {
    hideModals(['#actionModal','#mobileShareModal', '#deleteAdModal', '#mobileSocialMediaModal', '#myChangeAdsModal', '#changeAdErrorModal', '#failModal'])
    Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
  })

  watch(() => route.query, () => {
    let route_name = helper.clear_prefix_route_name(route.name);
    if (route_name === 'account') {
      if (route.fullPath !== full_path.value) { // if fullPath old is the same new, Not allow to do. (prevent click "fancybox" of image)
        full_path.value = route.fullPath;
        // console.log('--------- watch ---------');
        // --- check tap change, change condition too ---
        tap_active_or_expire.value = route.query && route.query.check_tap ? route.query.check_tap : '';
        if (tap_active_or_expire.value === 'active') {
          pageSize.value = 0;
          posts.value = [];
          if (isDesktop && posts.value.length === 0) { manually_get_active_post(); } // check is Screen Desktop.
        } else {
          expired_pageSize.value = 0;
          expired_posts.value = [];
          if (isDesktop && expired_posts.value.length === 0) { manually_get_expired_post(); } // check is Screen Desktop.
        }

        // console.log('===>>> watch');
        get_all_total_count(); // get all count active and expired post when have search
        isInitial.value = true;      // reset scroll loader again.
        key_initial.value += 1;      // reset scroll loader again.
      }
    }
  })

  function hidOverflow(){
      $('body').css('overflow','unset')
  }

  function closeModalSuccess(){
    successToast.value.hide();
  }

  function resume(){
    check_auth_user();
    VueCookieNext.removeCookie('dl_resume')
    localStorage.setItem('ch_us', user_data.value.user.id);
    localStorage.setItem('isCheckedR', false);
  }

  function btn_create_post() {
    router.push(localePath({name: 'post'}));
  }

  // ---- toast message ----
  function toast_message(message, suc_or_error) {
    message_success.value = message;
    error_or_success_message.value = suc_or_error;
    let toast = $('.acc_toast');
    toast.removeClass('d-none');
    toast.toast({ delay: 6000 });
    toast.toast('show');
  }

  // ---- verify phone number ----
  function show_verify_phone_number() {
    router.push(localePath({ name: 'setting-change-phone', query: { from: 'account' } }));
  }
  // ---- check new auth user ----
  function check_new_auth_user() {
    user_data.value = process.server ? '' : (localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '');
  }

 
  function getManageFilter(){
    check_new_auth_user();
    if(!all_filer.value){
      $fetch(config.VUE_APP_API_URL+'/me/posts/posted_filters',{
        headers: { "Access-Token": user_data.value.tokens.access_token },
        params:{
          lang: locale.value==='km' ? 'km' : 'en',
          filter_version: 4
        }
      }).then(res=>{
        all_filer.value = res.data
        // console.log(res.data)
      }).catch(er=>{
        console.log(er)
      })
    }
    
  }

  function show_data_next(ev, rt, tp){
    let pr =  !ev ? rt : ev.target.value
    if(pr){
      if(tp === 'district'){
        form.value['district'] = ''
      }
      $fetch(config.VUE_APP_API_URL+ 'locations', {
        params: {
          lang: locale.value === 'km' ? 'km' : 'en',
          type: tp,
          parent: pr,
        },
      }).then(res => {
        if(tp === 'district') { 
          district.value = res.data; 
          form.value['commune'] = '';
        }
        if(tp === 'commune') commune.value = res.data;
      }).catch(error => {  });
    }else{
      form.value['district'] = ''
      form.value['commune'] = ''
    }
  }

  function clickModal(){
    getManageFilter();
    form.value = []
    form.value['sortby'] = ''
    if (Object.keys( route.query).length > 0) {
      Object.entries( route.query).forEach(([key, val], index) => {
        if(val){
          form.value[key] = val 
        }
      });
    }
  }

  // ---- show modal categories by user ----
  function show_pop_up_category() {
    $('#show_modal_categories').modal('show');

    // setDefaultQuery()

    // get categories by user has been post
    category_by_user.value = { store_id: '' }; // ['1123', '1234q2'];
  }

  // ---- show followers or following ----
  function show_follows(condition, enable_click) {
    if (enable_click) {
      save_track_optional('clear', { clear: 'clear_data' });
      router.push(localePath({ name: 'username-follows', params: { username: profile.value.username }, query: { type: condition } }));
    }
  }

  // ---- Profile ----

  function getFollow(){
    check_new_auth_user();
    // -- count following and follower badge --
    $fetch(config.VUE_APP_API_URL + 'me/follow_badges', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { lang: language.value }
    }).then(get_follow => {
      count_follow.value = get_follow.data;
    }).catch(error => {
      if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_1.value <= 2) {
          reload_q_again_1.value += 1;
          check_auth_user();
          setTimeout(() => { getFollow(); }, 3000);
        }
      }
    });
  }

  function get_profile() {
    check_new_auth_user();
    // -- count following and follower badge --
    // $fetch(config.VUE_APP_API_URL + 'me/follow_badges', {
    //   headers: { "Access-Token": user_data.value.tokens.access_token },
    //   params: { lang: language.value }
    // }).then(get_follow => {
    //   count_follow.value = get_follow.data;
    // }).catch(error => {
    //   if (error.response && error.response.status === 401) { // retry
    //     if (reload_q_again_1.value <= 2) {
    //       reload_q_again_1.value += 1;
    //       check_auth_user();
    //       setTimeout(() => { get_profile(); }, 3000);
    //     }
    //   }
    // });

    // -- get user --
    /*$fetch(config.VUE_APP_API_URL + 'profiles/'+user_data.value.user.username, {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { lang: language.value, fields: 'all', meta: true }
    }).then(get_profile => {
      profile.value = get_profile.data;
    }).catch(error => {
      if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_1.value <= 2) {
          reload_q_again_1.value += 1;
          check_auth_user();
          setTimeout(() => { get_profile(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');   // remove localStorage
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({ name: 'index' }));
        }
      }
    });*/

    // -- get store --
    $fetch(config.VUE_APP_API_URL + 'me/stores', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { lang: language.value, fields: 'my_setting' }
    }).then(get_store => {
      store.value = get_store && get_store.data.length > 0 ? get_store.data : [];
    }).catch(error => {
      if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_11.value <= 2) {
          reload_q_again_11.value += 1;
          setTimeout(() => { get_profile(); }, 3000);
        }
      }
    });
    // -- get badge job applications --
    $fetch(config.VUE_APP_API_URL_JOB + 'me/job_applications/total_unread', {
    // $fetch(config.VUE_APP_API_URL + 'job_applications/total_unread', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { lang: language.value },
    }).then(res => {
      total_job_applications.value = res.data ? parseInt(res.data.total) : 0;
    }).catch(error => {
      if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_13.value <= 2) {
          reload_q_again_13.value += 1;
          setTimeout(() => { get_profile(); }, 3000);
        }
      }
    });
  }

  // ---- active post ----
  const num_filter = ref(0)
  async function get_active_post({loaded, error, noMore, noResults}, { isFirstLoad }) {
    check_new_auth_user();
    let query_str = {
      lang: language.value,
      offset: pageSize.value,
      fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status,total_like,total_comment,total_job_application,category_type,availability,location',
      functions: 'shipping,apply_job,insights',
      keyword: clean_keyword(keyword.value),
      category: route.query.category ? route.query.category : '',
    }

    if (Object.keys(route.query).length > 0) {
      let num = []
      Object.entries(route.query).forEach(([key, val], index) => {
        query_str[key] = val
        form.value[key] = val
        if(val && key !== 'check_tap'){
          num.push(val)
        }
      });
      num_filter.value = num.length
    }
    
    // if (Object.keys(form.value).length > 0) {
    //   Object.entries(form.value).forEach(([key, val], index) => {
    //     query_str[key] = val
    //   });
    // }

    // $fetch(config.VUE_APP_API_URL + 'me/posts', {
    $fetch(config.VUE_APP_API_URL + 'me/posts', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params:  query_str,

    }).then(res => {
      pageSize.value += res.limit; // add offset
      if (res.data.length) {
        posts.value = posts.value.concat(res.data); // concat in multiple array
        const uniqueData = posts.value.filter((item, index, self) => // This just TMP solution forremove dubplicate item when switch tab.
          index === self.findIndex((t) => t.id === item.id)
        );
        posts.value = uniqueData
      }
      if(res.available_paid_ads) {
        availablePaidAds.value = res.available_paid_ads
      }

      set_ripple();

      // -- tracking on google analytic --
      if (posts.value.length <= 30 && pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
      else { track_google_analytics('active', pageSize.value > 30 ? pageSize.value-30 : 0); }

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
        if (posts.value.length === 0) {
          if (isFirstLoad) {
            noResults(); // console.log('noResult');
          } else {
            noMore(); // console.log('noMore');
          }
        } else {
          noMore();
        }
      } else {
        if (posts.value.length < pageSize.value) {
          noMore(); // stop scroll.
        } else {
          loaded(); // scroll down get more.
        }
      }

    }).catch(e => { // console.log(error.response);
      if (!e.response) {
        error();

      } else {
        if (e.response && e.response.status === 403) {
          posts.value = [];
          noResults();

        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_2.value <= 2) {
            reload_q_again_2.value += 1;
            check_auth_user();
            setTimeout( () => { loaded(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
      }
    });
  }
  // ---- manually active post ----
  function manually_get_active_post() {
    check_new_auth_user();
    dt_ac_loading.value = true;

    $fetch(config.VUE_APP_API_URL + 'me/posts', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        lang: language.value,
        offset: pageSize.value,
        fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status,total_like,total_comment,total_job_application,category_type,availability,location',
        functions: 'shipping,apply_job,insights',
        // fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status,phone,location,total_job_application,apply_job',
        // type: 'active',
        keyword: clean_keyword(keyword.value),
        category: route.query.category ? route.query.category : '',
      },

    }).then(res => {
      pageSize.value += res.limit; // add offset
      if (res.data.length) {
        posts.value = posts.value.concat(res.data); // concat in multiple array
      }
      if(res.available_paid_ads) {
        availablePaidAds.value = res.available_paid_ads
      }
      dt_ac_loading.value = false;
      ac_hide_btn_load_more.value = posts.value.length < pageSize.value ? false : true;
      set_ripple();

      // -- tracking on google analytic --
      if (posts.value.length <= 30 && pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
      else { track_google_analytics('active', pageSize.value > 30 ? pageSize.value-30 : 0); }

    }).catch(e => {
      if (!e.response) {  } else {
        if (e.response && e.response.status === 403) {
          posts.value = [];
        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_2.value <= 2) {
            reload_q_again_2.value += 1;
            check_auth_user();
            setTimeout( () => { manually_get_active_post(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
      }
      dt_ac_loading.value = false;
    });
  }

  // ---- expired post ----
  async function get_expired_post({loaded, error, noMore, noResults}, { isFirstLoad }) {
    check_new_auth_user();

    let query_str = {
      lang: locale.value,
      offset: expired_pageSize.value,
      fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status',
      type: 'expired',
      keyword: clean_keyword(keyword.value),
      category: route.query.category ? route.query.category : '',
    }

    if (Object.keys(route.query).length > 0) {
      let num = []
      Object.entries(route.query).forEach(([key, val], index) => {
        query_str[key] = val
        form.value[key] = val
        if(val && key !== 'check_tap'){
          num.push(val)
        }
      });
      num_filter.value = num.length
    }

    $fetch(config.VUE_APP_API_URL + 'me/posts', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: query_str
      // params: {
      //   lang: locale.value,
      //   offset: expired_pageSize.value,
      //   fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status',
      //   type: 'expired',
      //   keyword: clean_keyword(keyword.value),
      //   category: route.query.category ? route.query.category : '',
      // },

    }).then(res => {
      expired_pageSize.value += res.limit; // add offset
      if (res.data.length) {
        expired_posts.value = expired_posts.value.concat(res.data); // concat in multiple array

        const uniqueData = expired_posts.value.filter((item, index, self) => // This just TMP solution for remove dubplicate item when switch tab.
          index === self.findIndex((t) => t.id === item.id)
        );
        expired_posts.value = uniqueData

      }
      set_ripple();

      // -- tracking on google analytic --
      if (expired_posts.value.length <= 30 && expired_pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
      else { track_google_analytics('expired', expired_pageSize.value > 30 ? expired_pageSize.value-30 : 0); }

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
        if (isFirstLoad) {
          noResults(); // console.log('noResult');
        } else {
          noMore(); // console.log('noMore');
        }
      } else {
        if (expired_posts.value.length < expired_pageSize.value) {
          noMore(); // stop scroll.
        } else {
          loaded(); // scroll down get more.
        }
      }

    }).catch(e => { // console.log(error.response);
      if (!e.response) {
        error();
      } else {
        if (e.response && e.response.status === 403) {
          expired_posts.value = [];
          noResults();

        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_3.value <= 2) {
            reload_q_again_3.value += 1;
            check_auth_user();
            setTimeout( () => { loaded(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({ name: 'index' }));
          }
        }
      }
    });
  }
  // ---- manually expired post ----
  function manually_get_expired_post () {
    check_new_auth_user();
    dt_expi_loading.value = true;

    $fetch(config.VUE_APP_API_URL + 'me/posts', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        lang: locale.value,
        offset: expired_pageSize.value,
        fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status',
        type: 'expired',
        keyword: clean_keyword(keyword.value),
        category: route.query.category ? route.query.category : '',
      },

    }).then(res => {
      expired_pageSize.value += res.limit; // add offset
      if (res.data.length) {
        expired_posts.value = expired_posts.value.concat(res.data); // concat in multiple array
      }

      dt_expi_loading.value = false;
      expi_hide_btn_load_more.value = expired_posts.value.length < expired_pageSize.value ? false : true;
      set_ripple();

      // -- tracking on google analytic --
      if (expired_posts.value.length <= 30 && expired_pageSize.value === 60) {  } // prevent saved post smaller than 30 and request two time
      else { track_google_analytics('expired', expired_pageSize.value > 30 ? expired_pageSize.value-30 : 0); }

    }).catch(e => {
      if (!e.response) {  } else {
        if (e.response && e.response.status === 403) {
          expired_posts.value = [];
        } else if (e.response && e.response.status === 401) { // retry
          if (reload_q_again_3.value <= 2) {
            reload_q_again_3.value += 1;
            check_auth_user();
            setTimeout( () => { manually_get_expired_post(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({ name: 'index' }));
          }
        }
      }
      dt_expi_loading.value = false;
    });
  }

  // ---- count all total ----
  async function get_all_total_count() {
    check_new_auth_user();

    await $fetch(config.VUE_APP_API_URL + 'me/posts/total', {
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: {
        lang: language.value,
        keyword: clean_keyword(keyword.value),
        category: route.query.category ? route.query.category : '',
      },

    }).then(get_counts => {
      counts.value = get_counts.data;

    }).catch(error => { // console.log(error.response);
      if (error.response) {
        let check = error.response;
        let data_check = JSON.stringify(check);
        let data_parse = JSON.parse(data_check);

        if (check.status === 403) {
          toast_message(data_parse._data.message, false);

        } else if (check.status === 401) { // retry
          if (reload_q_again_4.value <= 2) {
            reload_q_again_4.value += 1;
            check_auth_user();
            setTimeout( () => { get_all_total_count(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({ name: 'index' }));
          }

        } else {
          toast_message(data_parse._data.message, false);
        }
      }
    });
  }
  // ---- click search ----
  function click_search(clear_category) {
    let query_str = '';
    
    if (clear_category === 'clear_keyword') {
      query_str = {
        check_tap: route.query.check_tap === 'expired' ? 'expired' : 'active',
        category_name: route.query.category_name ? route.query.category_name : '',
        category: route.query.category ? route.query.category : '',
        keyword: '',
      }
      if (Object.keys( route.query).length > 0) {
        Object.entries( route.query).forEach(([key, val], index) => {
          if(val && key !== 'keyword'){
            query_str[key] = val
          }
        });
      }
      keyword.value = ''; // clear keyword
    } else if (clear_category === 'clear_category') {
      query_str = {
        check_tap: route.query.check_tap === 'expired' ? 'expired' : 'active',
        category_name: '',
        category: '',
        keyword: clean_keyword(keyword.value),
      }
      if (Object.keys( route.query).length > 0) {
        Object.entries( route.query).forEach(([key, val], index) => {
          if(val && key !== 'category_name' && key !== 'category'){
            query_str[key] = val
          }
        });
      }
    } else if (clear_category === 'tab_active') {
      query_str = {
        check_tap: 'active',
        category_name: route.query.category_name ? route.query.category_name : '',
        category: route.query.category ? route.query.category : '',
        keyword: clean_keyword(keyword.value),
      }
      if (Object.keys( route.query).length > 0) {
        Object.entries( route.query).forEach(([key, val], index) => {
          if(val && key !== 'check_tap'){
            query_str[key] = val
          }
        });
      }
    } else if (clear_category === 'tab_expired') {
      query_str = {
        check_tap: 'expired',
        category_name: route.query.category_name ? route.query.category_name : '',
        category: route.query.category ? route.query.category : '',
        keyword: clean_keyword(keyword.value),
      }
      if (Object.keys( route.query).length > 0) {
        Object.entries( route.query).forEach(([key, val], index) => {
          if(val && key !== 'check_tap'){
            query_str[key] = val
          }
        });
      }
    } else if (clear_category === 'more_filters') {
      query_str = {
        check_tap: route.query.check_tap === 'expired' ? 'expired' : 'active',
        category_name: route.query.category_name ? route.query.category_name : '',
        category: route.query.category ? route.query.category : '',
        keyword: clean_keyword(keyword.value),
      }

      if (Object.keys(form.value).length > 0) {
        Object.entries(form.value).forEach(([key, val], index) => {
          if(val){
            query_str[key] = val
          }
        });
      }
      $('#modal_post_manage_filter').modal('hide')
    } else {
      query_str = {
        check_tap: route.query.check_tap === 'expired' ? 'expired' : 'active',
        category_name: route.query.category_name ? route.query.category_name : '',
        category: route.query.category ? route.query.category : '',
        keyword: clean_keyword(keyword.value),
      }
      if (Object.keys( route.query).length > 0) {
        Object.entries( route.query).forEach(([key, val], index) => {
          if(val && key !== 'check_tap' && key !== 'category_name' && key !== 'category' && key !== 'keyword'){
            query_str[key] = val
          }
        });
      }
    }

    
    // push route change
    router.replace(localePath({ name: 'account', query: query_str }));
  }

  function crlearFilter(){
    form.value = []
    form.value['sortby'] = ''
  }

  // ---- click show detail ----
  function click_show_block(status_message) { toast_message(status_message, false); }

  // ---- set ripple ----
  function set_ripple() {
    // setTimeout(function () { $(".ripple_icon_search, .ripple_change_language, #pills-ads, #pills-like,.cl_ripple").ripple(); }, 300);
  }

  // ---- convert date ----
  function convertFromNow(date, condition) {
    if ( condition === 'ago' ) {
      return helper.check_date_ago(date, '');          // display format date
    } else {
      return helper.check_date_ago(date, 'check_current_year');
    }
  }

  // ---- show list jobs_unread by job_post ----
  function show_jobs_unread() {  // value push query get from function "show_modal_option".
    save_track_optional('clear_old_data', { clear_old_data: 'clear' });
    router.push(localePath({ name: 'account-job-applications', query: { post_id: post_id.value, title: post_job_title.value } }));
  }

  // ---- set auto renew ----
  function show_modal_option(data,id, job_unread, title) {
    dataAdAction.value = data
    $("#actionModal").modal('show')
    post_job_unread.value = job_unread;    
    post_job_title.value = title;
    post_id.value = id;     
  }

  function set_auto_renew() {
    store_renew.value = true
    $('#modal_set_auto_renew').modal('hide');
    $('#modal_choose_time_picker').modal('show');

    // --- add class modal-open to body ---
    helper.add_class_modal_open();
  }

  function click_save_auto_renew() {
    if(window.navigator.onLine) {
      check_new_auth_user();

      let data_body = {
        hour: renew_hours.value,
        minute: renew_minute.value,
        ampm: renew_am_or_pm.value,
      }
      if (post_id.value && renew_hours.value && renew_minute.value && renew_am_or_pm.value) {
        loading_field.value = true;
        $fetch(config.VUE_APP_API_URL + 'me/posts/' + post_id.value + '/set_auto_renew',{
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          headers: {"Access-Token": user_data.value.tokens.access_token},
          method: 'POST',
          params: {lang: language.value},
          body: new URLSearchParams(data_body)

        }).then(res_auto_renew => {
          let short = res_auto_renew.data;
          $('#modal_choose_time_picker').modal('hide');
          set_new.value = res_auto_renew.message
          successToast.value.show();
          setTimeout(() => {
              successToast.value.hide();
              set_new.value = ''
          }, 10000);
          let id_post = post_id.value;
          for (var p = 0; p < posts.value.length; p++) {
            if (parseInt(posts.value[p].id) === parseInt(id_post)) {
              if (posts.value[p].auto_renew) {
                posts.value[p].auto_renew = short;
              } else {
                posts.value[p]['auto_renew'] = short;
              }
            }
          }

        }).catch(error => {
          if (!error.response) {
            if (reload_q_again_5.value < 2) {
              reload_q_again_5.value += 1;
              check_auth_user();
              setTimeout( () => { click_save_auto_renew(); }, 3000);
            } else {
              $('#modal_choose_time_picker').modal('hide');
              $('#modal_show_status_error_connection').modal('show');
            }
          } else {
            if (error.response) {
              let check = error.response; // original data error
              let data_check = JSON.stringify(check);
              let data_parse = JSON.parse(data_check);

              if (check.status === 403) {
                // show_error_message.value = data_parse._data.message;
                $('#modal_choose_time_picker').modal('hide');
                // $('#modal_show_error').modal('show');
                errorData.type = 'auto_renew_fail'
                errorData.message = error.response._data.message
                $('#failModal').modal('show')

              } else if (check.status === 401) { // retry
                if (reload_q_again_5.value <= 2) {
                  reload_q_again_5.value += 1;
                  check_auth_user();
                  setTimeout( () => { click_save_auto_renew(); }, 3000);
                } else {
                  localStorage.removeItem('auth_user');   // remove localStorage
                  VueCookieNext.removeCookie('auth_user');
                  router.replace(localePath({ name: 'index' }));
                }

              } else {
                toast_message(data_parse._data.message, false);
              }
            }
          }

        }).finally(() => (loading_field.value = false));
      }

    } else {
      $('#modal_choose_time_picker').modal('hide');
      $('#modal_show_status_error_connection').modal('show');
    }
  }

  // --- remove auto renew ---
  function remove_auto_renew(id) {
    post_id.value = id;
    $('#modal_confirm_remove_auto_renew').modal('show');
  }

  function click_remove_auto_renew() {
    store_renew.value = true
    check_new_auth_user();
    loading_field.value = true;
    $fetch(config.VUE_APP_API_URL + 'me/posts/' + post_id.value + '/remove_auto_renew',{
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: {"Access-Token": user_data.value.tokens.access_token},
      method: 'POST',
      params: {lang: language.value}
    }).then(res => {
      set_new.value = res.message
      successToast.value.show();
      setTimeout(() => {
          successToast.value.hide();
          set_new.value = ''
      }, 10000);
      stop_loop:
              for (var p = 0; p < posts.value.length; p++) {
                if (parseInt(posts.value[p].id) === parseInt(post_id.value)) {
                  posts.value[p].auto_renew = '';
                  break stop_loop; // break the loop
                }
              }

      $('#modal_confirm_remove_auto_renew').modal('hide');
      helper.remove_class_modal_open();

    }).catch(error => {
      if (!error.response) {
        if (reload_q_again_6.value <= 2) {
          reload_q_again_6.value += 1;
          check_auth_user();
          setTimeout( () => { click_remove_auto_renew(); }, 3000);
        } else {
          $('#modal_confirm_remove_auto_renew').modal('hide');
          $('#modal_show_status_error_connection').modal('show');
        }

      } else if (error.response) {
        let check = error.response; // original data error
        let data_check = JSON.stringify(check);
        let data_parse = JSON.parse(data_check);

        if (check.status === 401) { // retry
          if (reload_q_again_6.value <= 2) {
            reload_q_again_6.value += 1;
            check_auth_user();
            setTimeout(() => { click_remove_auto_renew(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }

        } else {
          toast_message(data_parse._data.message, false);
        }
      }
    }).finally(() => (loading_field.value = false));
  }

  function edit_auto_renew(id, hour, minute, am_or_pm) {
    // console.log(id, hour, minute, am_or_pm)
    post_id.value = id;
    renew_hours.value = hour.length < 2 ? 0+hour : hour;
    renew_minute.value = minute.length < 2 ? 0+minute : minute;
    renew_am_or_pm.value = am_or_pm;

    $('#modal_choose_time_picker').modal('show');
  }

  // ---- renew button ----
  function renew_button(id) {
    check_new_auth_user();
    loading_field.value = true;
    $fetch(config.VUE_APP_API_URL + 'me/posts/'+id+'/renew',{
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      headers: { "Access-Token": user_data.value.tokens.access_token },
      method: 'POST',
      params: {lang: language.value}
    }).then(res_renew => {
      stop_loop_if_condition_true:
        for (var p = 0; p < posts.value.length; p++) {
          if (parseInt(posts.value[p].id) === parseInt(id)) {
            posts.value[p].renew_date = res_renew.data.date;
            break stop_loop_if_condition_true;
          }
        }

      toast_message('', true);

    }).catch(error => {
      if (!error.response) {
        if (reload_q_again_7.value < 2) {
          reload_q_again_7.value += 1;
          check_auth_user();
          setTimeout( () => { renew_button(id); }, 3000);
        } else {
          $('#modal_show_status_error_connection').modal('show');
        }

      } else if (error.response) {
        let check = error.response ? error.response : '';  // original data error
        let data_check = JSON.stringify(check);
        let data_parse = JSON.parse(data_check);

        if (check.status === 403) {
          toast_message(data_parse._data.message, false);

        } else if (check.status === 401) { // retry
          if (reload_q_again_7.value <= 2) {
            reload_q_again_7.value += 1;
            check_auth_user();
            setTimeout( () => { renew_button(id); }, 3000);
          } else {
            localStorage.removeItem('auth_user');   // remove localStorage
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({ name: 'index' }));
          }

        } else {
          toast_message(data_parse._data.message, false);
        }
      }
    }).finally(() => (loading_field.value = false));
  }

  function renew_btn_disable(renew_date) {  // ---- check disable renew btn ----
    let renewDate = check_renew_date(renew_date);   // date and month renew date
    let today = check_renew_date('');          // date and month current date
    if (today == renewDate) { // if current date and renew date equal disable button
      return true;
    } else {
      return false;
    }
  }

  function check_renew_date(date) {
    var now = date ? new Date(date) : new Date();
    let day = now.getDate();
    let month = now.getMonth()+1;
    if (parseInt(day) < 10) day = '0'+day;
    if (parseInt(month) < 10) month = '0'+month;
    return month+day;
  }

  // ---- track on google analytic ----
  function track_google_analytics (con, per_page) {
    // setTimeout(() => {
      let offset = per_page > 0 ? '?offset=' + per_page : ''; // set offset of page if scroll get more data
      let page_path = route.path + offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
      let page_location = window.location.href + offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
      let data = {
        page_title: meta_title_acc.value,
        page_location: page_location,
        page_path: page_path,
      };
      // -- event on page --
      event(con === 'expired' ? 'ads_expired' : 'ads_active', data);
      // -- page_view --
      pageview(data);
    // },50);
  }

  // ---- show modal change or view profile ----
  function show_or_change_pro(pro_or_cover) {
    // check Cover is empty
    if (pro_or_cover === 'cover') {
      if (profile.value && !profile.value.cover) {
        $('.a_edit_cover div input[type=file]').click();    // click direct file cover
      } else {
        $('#modal_change_image').modal('show');
        profile_or_cover.value = pro_or_cover;
      }
    // check Profile is empty
    } else {
      if (profile.value && !profile.value.photo) {
        $('.a_edit_profile div input[type=file]').click();      // click direct file profile
      } else {
        $('#modal_change_image').modal('show');
        profile_or_cover.value = pro_or_cover;
      }
    }
  }
  // ---- click cover change cover when cover empty ----
  function change_cover_empty() { $('.a_edit_cover div input[type=file]').click(); }
  // ---- function view or change ----
  function view_or_change(view_or_change) {
    $('#modal_change_image').modal('hide');         // close modal
    if (view_or_change === 'view') {                // click view profile or cover
      if (profile_or_cover.value === 'profile') {   // click view profile picture
        ref_profile.value.click();                  // view profile
      } else {
        ref_cover.value.click();                    // view cover
      }
    } else {                                        // click change profile or cover
      if (profile_or_cover.value === 'profile') {
        $('.a_edit_profile div input[type=file]').click();  // click direct file profile
      } else {
        $('.a_edit_cover div input[type=file]').click();    // click direct file cover
      }
    }
  }

  // ---- show modal delete reason ----
  function show_modal_delete(id, ad_block, ad_expired) {
    check_new_auth_user();
    if(window.navigator.onLine) {
      delete_check.value = '';         // clear check
      delete_description.value = '';   // clear description
      show_description.value = '';     // hide description
      $('#delete_description').removeClass('error_field_text_report'); // clear error on description
      $('#error_delete_description').addClass('d-none');            // remove text show error

      delete_ad_expired.value = ad_expired ? ad_expired : ''; // this line check if delete post expired
      post_id.value = id;
      if (!localStorage.getItem("delete_post")) {
        loading_field.value = true;
        check_auth_user(); // get new auth_user

        $fetch(config.VUE_APP_API_URL + 'me/posts/delete_reasons', {
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          headers: {"Access-Token": user_data.value.tokens.access_token},
          params: {lang: language.value},
        }).then(response => {
          const object = {
            data: response.data,
            expiry: helper.Date_To_Timestamp('', 86400, 'seconds'),  // add 1 day
          }
          localStorage.setItem("delete_post", JSON.stringify(object));
          delete_post.value = localStorage.getItem("delete_post") ? JSON.parse(localStorage.getItem("delete_post")) : [];
          $('#modal_show_delete_reason').modal('show');

        }).catch(error => {
          if (!error.response) {
            if (reload_q_again_8.value < 2) {
              reload_q_again_8.value += 1;
              check_auth_user();
              setTimeout( () => { show_modal_delete(id, ad_block, ad_expired); }, 3000);
            } else {
              $('#modal_show_delete_reason').modal('hide');
              $('#modal_show_status_error_connection').modal('show');
            }

          } else if (error.response && error.response.status === 401) { // retry
            if (reload_q_again_8.value <= 2) {
              reload_q_again_8.value += 1;
              check_auth_user();
              setTimeout( () => { show_modal_delete(id, ad_block, ad_expired); }, 3000);
            } else {
              localStorage.removeItem('auth_user');   // remove localStorage
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }
          }
        }).finally(() => (loading_field.value = false));
      } else {
        delete_post.value = localStorage.getItem("delete_post") ? JSON.parse(localStorage.getItem("delete_post")) : [];
        $('#modal_show_delete_reason').modal('show');
      }

    } else {
      $('#modal_show_delete_reason').modal('hide');
      $('#modal_show_status_error_connection').modal('show');
    }
  }
  function choose_delete(reason) {
    if (reason === 'other') {
      show_description.value = 'show_description'; // show description
      $('#delete_description').focus(); // focus description
      delete_description.value = '';   // clear
    } else {
      show_description.value = '';     // hide description
      delete_description.value = '';   // clear
    }
    // -- remove error on description field --
    $('#delete_description').removeClass('error_field_text_report');
    $('#error_delete_description').addClass('d-none');

    delete_check.value = reason;
  }
  function close_delete_modal() { $('#modal_show_delete_reason').modal('hide'); }
  function click_delete_ads() {
    check_new_auth_user();
    let data_body = {
      reason: delete_check.value,
      type:  delete_ad_expired.value ? 'expired' : 'active',
      description: delete_description.value ? delete_description.value : '',
    }
    // --- check store id is delete store post ---
    // if (detail.value && detail.value.store && detail.value.store.id) { data_body['storeid'] = detail.value.store.id; }
    // --- check is select or select other with write description condition ---
    if ((!delete_check.value) || (delete_check.value === 'other' && !delete_description.value)) {

      // -- show error on textarea --
      $('#delete_description').addClass('error_field_text_report');
      $('#error_delete_description').removeClass('d-none');

      let message = '';
      if (!delete_check.value) {
        message = language.value === 'km' ? 'សូមជ្រើសរើសហេតុផលនៃកាលុប' : 'Please Choose Delete Reason';
      } else {
        message = language.value === 'km' ? 'បំពេញមូលហេតុនៃកាលុប' : 'Write Delete Reason';
        $('#delete_description').focus();
      }
      toast_message(message, false);
    } else {
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL + 'me/posts/' + post_id.value,{
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        headers: { "Access-Token": user_data.value.tokens.access_token },
        method: 'DELETE',
        params: {lang: language.value},
        body: new URLSearchParams(data_body)
      }).then(res => {
        $('#item_' + post_id.value).remove();
        $('#modal_show_delete_reason').modal('hide');
        $('#modal_show_delete_ads_block').modal('hide');
        delete_reason.value = '';                    // clear delete reason
        helper.remove_class_modal_open();

        toast_message(res.message, true);  // show message success

        // --- check minus 1 when delete from expired list or active list ---
        if (route.query.check_tap && route.query.check_tap === 'expired') {
          counts.value.expired = parseInt(counts.value.expired) - 1;
        } else {
          counts.value.active = parseInt(counts.value.active) - 1;
        }
        counts.value.total = parseInt(counts.value.total) - 1;
        // --- /check minus 1 when delete from expired list or active list ---

      }).catch(error => {
        if (!error.response) {
          if (reload_q_again_9.value < 2) {
            reload_q_again_9.value += 1;
            check_auth_user();
            setTimeout( () => { click_delete_ads(); }, 3000);
          } else {
            $('#modal_show_delete_reason').modal('hide');
            $('#modal_show_status_error_connection').modal('show');
          }
        } else if (error.response) {
          let check = error.response; // original data error
          let data_check = JSON.stringify(check);
          let data_parse = JSON.parse(data_check);

          if (check.status === 403) {
            $('#modal_show_delete_ads_block').modal('hide');
            toast_message(data_parse._data.message, false);

          } else if (check.status === 401) { // retry
            if (reload_q_again_9.value <= 2) {
              reload_q_again_9.value += 1;
              check_auth_user();
              setTimeout( () => { click_delete_ads(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');   // remove localStorage
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }

          } else {
            toast_message(data_parse._data.message, false);
          }
        }
      }).finally(() => (loading_field.value = false));
    }

    $('#modal_show_delete_reason').modal('hide')
  }

  // ---- convert price ----
  function convert_price(price) { return helper.convert_price(price); }

  // ---- alert notification ----
  function show_notification(title, id, block) {
    if (block) {
      showErrorToast(block);
    } else {
      show_detail(title, id);
    }
  }

  // ---- show detail post ----
  function show_detail(title, id) {
    router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title), id: id } }));
    save_track_optional('clear_old_data', { clear_old_data: id });
  }

  // ---- must to get all category before user click edit post ----
  function loadCategories() {
    check_new_auth_user();
    if (!categories.value || (categories.value && !categories.value.data) || (categories.value && !categories.value.url) || (categories.value && categories.value.url && categories.value.url !== config.VUE_APP_API_URL)) {
      $fetch(config.VUE_APP_API_URL + 'categories', {
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        params: { meta: true, v: 1 },
      }).then(response => {
        const object = {
          data: response.data,
          meta: response.meta,
          expiry: helper.Date_To_Timestamp('', 7200, 'seconds'),  // add 1 day
          url: config.VUE_APP_API_URL, // for check to get new categories up to date.
        }
        localStorage.setItem("categories", JSON.stringify(object));
        categories.value = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];

      }).catch(error => {
        if (!error.response) {
          if (reload_q_again_10.value < 2) {
            reload_q_again_10.value += 1;
            check_auth_user();
            setTimeout( () => { loadCategories(); }, 3000);
          }
        } else if (error.response) {
          if (error.response.status === 401) {
            if (reload_q_again_10.value <= 2) {
              reload_q_again_10.value += 1;
              check_auth_user();
              setTimeout( () => { loadCategories(); }, 3000);
            }
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
      });
    }
  }

  // ---- clean special char to use in url ----
  function clean_keyword(search_text) { return helper.check_special_search_text(search_text); }
  // ---- click enter and search ----
  function keymonitor(e) {
    if (e.keyCode === 13) {
      $('#search_field').blur(); // remove focus in jquery
      click_search('');
    }
  }

  function keymonitorAds(e) {
    if (e.keyCode === 13) {
      $('#search_Ads').blur(); // remove focus in jquery
      searchAds();
    }
  }

  // ---- ready function on upload ( change cover_profile and profile_user ) ----
  function ready_function_cover_image() {
    // console.log('ready function');
    var au_user = user_data.value;
    // var counter = 1;
    // var image = [];
    // var limit = 8;
    var max_size = 24;
    // var maxRes = 1000000;
    var multi_uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button: ["cover_profile"], // ["cover_profile","cover_profile1"], // "cover_profile","cover_profile1"
      url: config.VUE_APP_API_URL+'me/upload_cover',  // 'http://khmer24.snadai.io/v1.0/me/upload_cover',

  max_file_size : max_size+'mb',
  unique_names : true,
  multi_selection: false, // upload multiple or single ( choose single = false; choose multiple = true )
  chunk_size: '1mb',
  resize : { width : 1500, height : 1400, quality : 100, crop: false }, // preserve_headers: false
  filters : {
    mime_types : [
      { title : "Image files", extensions : "jpg,gif,png,jpeg" }
    ],
    check_image_size: 100
  },
  // drop_element : 'multi-upload',
  flash_swf_url : 'plupload-2.3.9/Moxie.swf',
  silverlight_xap_url : 'plupload-2.3.9/Moxie.xap',
  headers: { "Access-Token": user_data.value.tokens.access_token },
});

    multi_uploader.init();

    multi_uploader.bind('FilesAdded', function(up, files) {
      multi_uploader.start();
    });

    multi_uploader.bind('BeforeUpload', (up, file) => {
      // -- prevent when refresh token and uploader not get the token, so add access-token every upload --
      check_auth_user();
      up.setOption('headers', {
        "Access-Token": user_data.value.tokens.access_token
      });
    });

    multi_uploader.bind('UploadProgress', function(up, file) {
      $('#open_or_close_loading_field').removeClass('d-none');
    });

    multi_uploader.bind('Error', (up, err) => { // function
      let message = '';
      if (err.response) {
        let message_error = JSON.parse(err.response);
        message = message_error.message;       // set message to toast to tell user
      } else {
        message = err.message;
      }
      $('#open_or_close_loading_field').addClass('d-none'); // close loading background
      toast_message(message, false);         // show toast

      multi_uploader.refresh();
    });

    multi_uploader.bind('UploadComplete', function(upldr, file) {
      multi_uploader.splice();

      multi_uploader.refresh();
    });

    multi_uploader.bind('FileUploaded', (upldr, file, object) => {
      var myData;
      try {
        // myData = eval(object.response);
        myData = object.response ? JSON.parse(object.response) : '';
      } catch(err) {
        // myData = eval('(' + object.response + ')');
        myData = '(' + object.response + ')';
      }

      // -------- add image upload to tmp and create in array to show in UI --------
      // console.log("FileUploaded:");
      // console.log(myData);
      // console.log(myData.data.photo);

      au_user['user']['cover'] = myData.data.photo;
      user_data.value = au_user; // set new image upload to dom and change it self
      img_cover.value = myData.data.photo.url;
      localStorage.setItem("auth_user", JSON.stringify(user_data.value)); // set new to localStorage
      $('#open_or_close_loading_field').addClass('d-none');
      // -------- /add image upload to tmp and create in array to show in UI --------

      multi_uploader.refresh();
    });

    plupload.addFileFilter('check_image_size', function(minRes, file, cb) {

      // var self = this, img = new o.Image;           // old version of plupload 2.1.8
      var self = this, img = new moxie.image.Image();  // new version of plupload 2.3.7
      function finalize(result) {
        var msg = "Please upload image at less "+minRes+"px width and "+minRes+"px height.";
        if (img.width > 1000000 || img.height > 1000000) msg = "Image "+img.name+" too big.";
        // if (img.width > 6500 || img.height > 6500) msg = "Image "+img.name+" too big.";
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

        // show loading when upload profile, if check file size true
        if (result) { $('#open_or_close_loading_field').removeClass('d-none'); }

      }
      if (file.type!="image/gif") {
        img.onload = function() {
          // check if resolution cap is not exceeded
          finalize((img.width > minRes && img.height > minRes) && (img.width < 1000000 && img.height < 1000000));
          // finalize((img.width > minRes && img.height > minRes) && (img.width < 6500 && img.height < 6500));
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

  const arr_dt_data = useState('arr_dt_data',()=>[])
  function ready_function_image_profile() {
    // console.log('ready function');
    var au_user = user_data.value;
    // var counter = 1;
    // var image = [];
    // var limit = 8;
    var max_size = 24;
    // var maxRes = 1000000;
    var multi_uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button: ["user_profile"],
      url: config.VUE_APP_API_URL+'me/upload_profile',  // 'http://khmer24.snadai.io/v1.0/me/upload_profile',

      max_file_size : max_size+'mb',
      unique_names : true,
      multi_selection: false, // upload multiple or single ( choose single = false; choose multiple = true )
      chunk_size: '1mb',
      resize : { width : 1500, height : 1400, quality : 100, crop: false },
      filters : {
        mime_types :[
          {title : "Image files", extensions : "jpg,gif,png,jpeg"}
        ],
        check_image_size: 100
      },

  // drop_element : 'multi-upload',
  flash_swf_url : 'plupload-2.3.9/Moxie.swf',
  silverlight_xap_url : 'plupload-2.3.9/Moxie.xap',
  headers: { "Access-Token": user_data.value.tokens.access_token },
});

    multi_uploader.init();

    multi_uploader.bind('FilesAdded', function(up, files) {
      multi_uploader.start();
    });

    multi_uploader.bind('BeforeUpload', (up, file) => {
      // -- prevent when refresh token and uploader not get the token, so add access-token every upload --
      check_auth_user();
      up.setOption('headers', {
        "Access-Token": user_data.value.tokens.access_token
      });
    });

    multi_uploader.bind('UploadProgress', function(up, file) {
      $('#open_or_close_loading_field').removeClass('d-none');
    });

    multi_uploader.bind('Error', (up, err) => {
      if (err.response) {
        let message_error = JSON.parse(err.response);
        message_success.value = message_error.message;       // set message to toast to tell user
      } else {
        message_success.value = err.message;
      }
      $('#open_or_close_loading_field').addClass('d-none');   // close loading background
      error_or_success_message.value = false;
      let toast = $(".toast");
      toast.removeClass('d-none');
      toast.toast({ delay: 6000 });
      toast.toast('show');

      multi_uploader.refresh();

    });

    multi_uploader.bind('UploadComplete', function(upldr, file) {
      multi_uploader.splice();

      multi_uploader.refresh();

    });

    multi_uploader.bind('FileUploaded', (upldr, file, object) => {
      var myData;
      try {
        // myData = eval(object.response);
        myData = object.response ? JSON.parse(object.response) : '';
      } catch(err) {
        // myData = eval('(' + object.response + ')');
        myData = '(' + object.response + ')';
      }

      // -------- add image upload to tmp and create in array to show in UI --------
      // console.log("FileUploaded:");
      // console.log(myData);
      // console.log(myData.data.photo);

      au_user['user']['photo'] = myData.data.photo;
      user_data.value = au_user; // set new image upload to dom and change it self
      img_pro.value = myData.data.photo.url;
      // console.log('test',img_pro.value)
      localStorage.setItem("auth_user", JSON.stringify(user_data.value)); // set new to localStorage
      let user_cookies = helper.create_data_user_login(user_data.value);
      VueCookieNext.setCookie('auth_user', user_cookies);
      setTimeout(()=>{
        const index = arr_dt_data.value.findIndex(item => item.id === user_data.value.user.id);
        if (index !== -1) {
          arr_dt_data.value[index] = { type: 'account', id: user_data.value.user.id, name: user_data.value.user.name, username: user_data.value.user.username, logo: user_data.value.user && user_data.value.user.photo ? user_data.value.user.photo.small.url : null };
        } 
      },50)
      $('#open_or_close_loading_field').addClass('d-none');

      // ---- change quick login in localStorage if profile change ----
      let change_quick_data = { id: au_user['user']['id'], name: '', username: '', password: '', photo: myData.data.photo ? myData.data.photo.medium.url : '' }
      helper.change_quick_login_data(change_quick_data);
      // -------- /add image upload to tmp and create in array to show in UI --------

      multi_uploader.refresh();
    });

    plupload.addFileFilter('check_image_size', function(minRes, file, cb) {
      // var self = this, img = new o.Image;           // old version of plupload 2.1.8
      var self = this, img = new moxie.image.Image();  // new version of plupload 2.3.7

      function finalize(result) {
        var msg = "Please upload image at less "+minRes+"px width and "+minRes+"px height.";
        if(img.width > 1000000 || img.height > 1000000) msg = "Image <strong>"+img.name+"</strong> too big.";
        // if(img.width > 6500 || img.height > 6500) msg = "Image <strong>"+img.name+"</strong> too big.";
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

        // show loading when upload cover, if check file size true
        if (result) { $('#open_or_close_loading_field').removeClass('d-none'); }

      }
      if(file.type!="image/gif") {
        img.onload = function() {
          // check if resolution cap is not exceeded
          finalize((img.width > minRes && img.height > minRes) && (img.width < 1000000 && img.height < 1000000));
          // finalize((img.width > minRes && img.height > minRes) && (img.width < 6500 && img.height < 6500));
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

const share = (data) => {
  if (checkUserAgent()) {
    $("#modal_show_option_share").modal('hide');
    shareUrl(data.title + " Cambodia on Khmer24.com ", '', data?.short_link ?? '')
  } else {
    $("#modal_show_option_share").modal('show');
  }
}

function detectMob() {
  check_screen_userAgent();
  if (check_screen_device.value) {
    $("#modal_show_option_share_profile").modal('hide');
    phone_support_sharing(); 
  } else {
    $("#modal_show_option_share_profile").modal('show');
  }
}

function check_screen_userAgent() {
  let check = false;
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    let march = navigator.userAgent.match(toMatchItem);
    if (march) {
      check = true; // in screen phone else screen pc
    }
    check_screen_device.value = check;
    // return navigator.userAgent.match(toMatchItem);
  });
}

function phone_support_sharing() {
    let title = profile.value.name ? profile.value.name : '';
    let text = profile.value.description ? profile.value.description : '';
    let url = profile.value.username ? config.VUE_APP_BASE_URL+profile.value.username : '';
        
    if (navigator.share) {
        let shareData = {
            title: ''+title+'',
            // text: ''+text+'',
            url: ''+url+'',
            // files: ''+image+'',
        }

        navigator.share(shareData)
            .then(() => { /*console.log('Successfully');*/ })
            .catch((e) => { /*console.log('Error: ' + e);*/ });

    // if in device phone, but navigator not support, must to show dialog share
    } else {
        $("#modal_show_option_share").modal('show'); // share media like in PC
    }
}

function facebook_sharing() {
  window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(''+ config.VUE_APP_BASE_URL+profile.value.username +''),'facebook-share-dialog','width=626,height=436'); return false;
}

function twitter_sharing() {
  window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+ config.VUE_APP_BASE_URL+profile.value.username +''),'facebook-share-dialog','width=626,height=436'); return false;
}

function copy_link(link) {
  document.getElementById('copy_link').focus();
  document.execCommand('copy');
  document.getElementById('copy_link').blur();

  toast_message('Link copied to clipboard', true);
}

function check_auth_user() {
  user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
}

function save_tracking_user(user_track, clear_old) {
  helper.params_make_condition('tracking', user_track);
  helper.params_make_condition('clear', clear_old);
}

// ---- store all type params ----
function save_track_optional(type, data_params) {
  helper.params_make_condition(type, data_params);
  GetAll.value = ''
}

// ---- check image error 404 must to show static image ----
function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
  
function promote(data) { 
  localStorage.setItem('cart_data', JSON.stringify({'id': data.id, 'type': 'ads'}))
  router.push(localePath({ name: 'premium-ad-category', params: { category: ( data?.category_type?.slug || data?.category_type?.Slug ) ?? '' }, query: {'id': data.id }}))
}

async function getDeleteReasons() {
  check_new_auth_user()
  try {
    const response = await $fetch(`${config.VUE_APP_API_URL}me/posts/delete_reasons?lang=${language.value}`, {
      retry: 2,
      retryDelay: 3000,
      method: "GET",
      headers: { "Access-Token": user_data.value.tokens.access_token }
    })

    if (response && response.data) {
      attemptRequest.value = 0
      deleteReasons.value = response.data;
    }
  } catch (error) {
    if (!error.response) {
      $('#deleteAdModal').modal('hide')
      $('#modal_show_status_error_connection').modal('show');
    } else {
      if (error.response.status === 401) {
        if(attemptRequest.value < 2) {
          attemptRequest.value += 1
          setTimeout(() => { getDeleteReasons() }, 3000);
        } else {
          $('#deleteAdModal').modal('hide')
          localStorage.removeItem('auth_user')
          router.replace(localePath({ name: 'index' }))  
        }  
      } else {
        $('#deleteAdModal').modal('hide')
        errorData.type = 'problem_occurs'
        errorData.message = error?.response?._data?.message ?? null
        $('#failModal').modal('show')
      }
    }
  }
}

async function actionModal(action, data) {
    switch (action) {
        case 'edit':
            closeModal('#actionModal');
            router.push(localePath({ name: 'post-id', params: { id: data.id } }));
            break;
        case 'delete':
            closeModal('#actionModal');
            await getDeleteReasons();
            deleteForm.type = 'active';
            deleteForm.id = data.id;
            showModal('#deleteAdModal');
            break;
        case 'availability':
            closeModal('#actionModal');
            markAvailability(data);
            break;
        case 'auto_renew':
            closeModal('#actionModal');
            set_auto_renew();
            break;
        case 'paid_ads':
            closeModal('#actionModal');
            changePremiumAd(data);
            break;
        case 'insights':
            closeModal('#actionModal');
            router.push(localePath({ name: 'insight-id', params: { id: data.id } }));
            break;
        default:
            // console.error(`Unknown action: ${action}`);
            break;
    }
}

function closeModal(modalSelector) {
    $(modalSelector).modal('hide');
}

function showModal(modalSelector) {
    $(modalSelector).modal('show');
}

function hideModals(modalSelectors) {
  // Hide modals using provided selectors
  modalSelectors.forEach(selector => {
      $(selector).modal('hide');
  });
}

function resetDeleteForm() {
    // Reset deleteForm values
    deleteForm.type = '';
    deleteForm.reason = '';
    deleteForm.description = '';
}

function checkExist($event) {
    if($event.data != null) typeing.value = true
}

async function submitDeleteReason() {

  check_new_auth_user()
  
  if (deleteForm.reason == '') {
    let msg;
    if (language.value == 'en') {
      msg = 'Please choose delete reason'
    } else {
      msg = 'សូមជ្រើសរើសហេតុផលនៃកាលុប'
    }    
    return toast_message(msg, false)    
  }


  // Validation for 'other' reason with description length
  if (deleteForm.reason === 'other' && deleteForm.description.length < 10) {
      $('#deleteReasone').focus();
      return;
  }

  // Clear description if reason is not 'other'
  if (deleteForm.reason !== 'other') {
      deleteForm.description = '';
  }

  const deletePostForm = {
      type: deleteForm.type,
      reason: deleteForm.reason,
      description: deleteForm.description
  };

  try {
    const response = await $fetch(`${config.VUE_APP_API_URL}me/posts/${deleteForm.id}?lang=${language.value}`, { 
      retry: 2,
      retryDelay: 3000,
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": user_data.value.tokens.access_token },
      body: new URLSearchParams(deletePostForm).toString()
    });

    attemptRequest.value = 0

    if (response) {
      // Reset form and hide modals
      resetDeleteForm();
      hideModals(['#actionModal', '#deleteAdModal']);

      $('.acc_toast').toast('hide');

      // Show success toast message
      successToastMessage.value = "success_delete";
      successToast.value.show();
      setTimeout(() => {
          successToast.value.hide();
      }, 10000);

      // Refresh user posts
      typeing.value = false
      pageSize.value = 0
      posts.value = []
      getPostByUser();
    }
  } catch (error) {
    if (!error.response) {
      $('#deleteAdModal').modal('hide')
      $('#modal_show_status_error_connection').modal('show');
    } else {
      if (error.response.status === 401) {
        if(attemptRequest.value < 2) {
          attemptRequest.value += 1
          setTimeout(() => { submitDeleteReason() }, 3000);
        } else {
          $('#deleteAdModal').modal('hide')
          localStorage.removeItem('auth_user')
          router.replace(localePath({ name: 'index' }))  
        }  
      } else {
        $('#deleteAdModal').modal('hide')
        errorData.type = 'problem_occurs'
        errorData.message = error?.response?._data?.message ?? null
        $('#failModal').modal('show')
      }
    }
  }
}

async function getPostByUser() {
  check_new_auth_user()
  pageSize.value = 0
  const queries = {
    lang: language.value,
    offset: 0,
    fields: 'id,title,price,photo,thumbnail,views,renew_date,posted_date,last_update,link,auto_renew,is_premium,status,total_like,total_comment,total_job_application,category_type,availability,location',
    functions: 'shipping,apply_job,insights',
  }
  const urlQuery = route.query
  delete urlQuery["check_tap"];
  urlQuery["keyword"] = keyword.value 
  for (let [key, value] of Object.entries(urlQuery)) {
    queries[key] = value;
  }

  try {
    const res = await $fetch(config.VUE_APP_API_URL + 'me/posts', { 
      retry: 2,
      retryDelay: 3000,
      method: 'GET',
      query: queries,
      headers: { "Access-Token": user_data.value.tokens.access_token }
    })
    attemptRequest.value = 0
    if (res) {
      pageSize.value += res.limit;
      if (res.data.length) {
        posts.value = res.data; 
      }
      if (res.available_paid_ads) {
        availablePaidAds.value = res.available_paid_ads
      }
    }
  } catch (error) { 
    if (!error.response) {
      $('#modal_show_status_error_connection').modal('show');
    } else {
      if (error.response.status === 401) {
        if(attemptRequest.value < 2) {
          attemptRequest.value += 1
          setTimeout(() => { getPostByUser() }, 3000);
        } else {
          localStorage.removeItem('auth_user')
          router.replace(localePath({ name: 'index' }))  
        }    
      } else {
        errorData.type = 'problem_occurs'
        errorData.message = error?.response?._data?.message ?? null
        $('#failModal').modal('show')
      }
    }
  }
}


async function deleteAd(data) {
  await getDeleteReasons();
  deleteForm.type = 'active';
  deleteForm.id = data.id;
  showModal('#deleteAdModal');
}

async function renewAd(data) {
  store_renew.value = true
  check_new_auth_user()
  try {

    const response = await $fetch(`${config.VUE_APP_API_URL}me/posts/${data.id}/renew?lang=${language.value}`, {
      retry: 2,
      retryDelay: 3000,     
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": user_data.value.tokens.access_token }
    })

    if (response) {
      console.log(response.message)
      const buttonRenew = document.getElementById(`${data.id}`);
      if (buttonRenew) {
        buttonRenew.disabled = true
        buttonRenew.classList.add('disable_text')
      }
      successToastMessage.value = "success_renew";
      successToast.value.show();
      setTimeout(() => {
        successToast.value.hide();
      }, 10000);
    }
  } catch (error) {
    if (!error.response) {
      $('#modal_show_status_error_connection').modal('show')
    } else {
      if (error.response.status === 401) {
        localStorage.removeItem('auth_user')
        router.replace(localePath({ name: 'index' }))  
      } else {
        errorData.type = 'renew_fail';
        errorData.message = error?.response?._data?.message ?? null;
        $('#failModal').modal('show');
      }
    }
  }
}

async function markAvailability(data) {
  check_new_auth_user()
  const availabilityFormData = new FormData()
  availabilityFormData.append('id', parseInt(data.id))
  availabilityFormData.append('status', !data.availability)
  try {
    const response = await $fetch(config.VUE_APP_API_URL+`me/posts/availability?lang=${language.value}`, { 
      retry: 2,
      retryDelay: 3000,
      method: "POST", 
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": user_data.value.tokens.access_token }, 
      body: new URLSearchParams(availabilityFormData).toString()
    })

    if(response){
      $('#actionModal').modal('hide') 
      successToastMessage.value = data.availability ? "success_mark_un" :  "success_mark_av" 
      successToast.value.show()
      setTimeout(function() {
        successToast.value.hide()
      }, 10000)
      getPostByUser()
    }
  } catch (error) {
    if (!error.response) {
      $('#actionModal').modal('hide') 
      $('#modal_show_status_error_connection').modal('show');
    } else {
      if (error.response.status == 401) {
        $('#actionModal').modal('hide') 
        localStorage.removeItem('auth_user')
        router.replace(localePath({ name: 'index' }))  
      } else {
        errorData.type = 'problem_occurs'
        errorData.message = error?.response?._data?.message ?? null
        $('#failModal').modal('show')
      }
    }
  } 
}

function copyPostURL(text) {  
  navigator.clipboard.writeText(text).then(() => {
    showSuccessToast('success_copied');
  }).catch(err => {
    console.error('Unable to copy to clipboard', err);
  }).finally(() => {
    // This will execute after the promise is either resolved or rejected
    $('#modal_show_option_share').modal('hide');
  });
}

async function sharePostURL(url) {
  shareButtonSipining.value = true
  setTimeout(() => { 
    $('#mobileShareModal').modal('hide') 
    $('#mobileSocialMediaModal').modal('show') 
    shareButtonSipining.value = false
    shortLink.value = url
  }, 1000)
}

function showSuccessToast(message) {
    successToastMessage.value = message
    successToast.value.show()
    setTimeout(() => { successToast.value.hide() }, 10000)
}

function showErrorToast(message) {
    errorToastMessage.value = message
    errorToast.value.show()
    setTimeout(() => { errorToast.value.hide() }, 10000)
}

function sharePostTofacebook() {
  shareLinkToFacebook(dataShareModal.value?.short_link ?? '')
}

function sharePostToTwitter() {
  shareToX(dataShareModal.value?.short_link ?? '')
} 

function setsAd(data) {
  paidAdItem.value = data
  changeAd.value = false
  filterMyAd.category_type = data.category_type.slug
  $('#myChangeAdsModal').modal('show')
}

function changePremiumAd(data) {
  paidAdItem.value = data
  changeAd.value = true 
  filterMyAd.category_type = data.category_type.slug
  $('#myChangeAdsModal').modal('show')
}

const search_ads = ref('')
async function getAd(myAdOffsetValue, categoryType='') {
  const queries = {
    'offset': myAdOffsetValue,
    'fields': 'id,title,price,photo,thumbnail,views,renew_date,posted_date,link',
    'functions': 'shipping,apply_job',
    'category_type': categoryType,
    'keyword': search_ads.value,
    'paid_ads': false,
    'lang': language.value
  }

  try {
    const response = await $fetch(config.VUE_APP_API_URL+`me/posts`, {
      query: queries,
      headers: { "Access-Token": user_data.value.tokens.access_token },
    }) 
    return response ? response : null
  } catch (error) {
    if (!error.response) {
      $('#modal_show_status_error_connection').modal('show');
    }
    else if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_user')
      router.replace(localePath({ name: 'index' }))     
    }
  }
}

async function loadAd({ loaded, noMore, noResults }) {
  check_new_auth_user()
  try {
    const loadedMyAd = await getAd(myAdOffset, filterMyAd.category_type);
    if(myAd.value.length && !loadedMyAd.data) noMore() 
    if(!myAd.value.length && !loadedMyAd.data) noResults() 
    myAd.value.push(...loadedMyAd.data);
    myAdOffset += loadedMyAd.data.length
    loaded(loadedMyAd.data.length, loadedMyAd.limit);
    
  } catch (err) {
    // console.error(err)
  }
}

function searchAds(){
  myAd.value = []
  myAdOffset = 0
  isInitialMyAd.value = true;
}

function navigateMyAdModalContent(id) {
  if(id == '#changePremiumContent') {
      $('#changePremiumContent').addClass('d-none')
      $('#myadsContent').removeClass('d-none')
  } else {
      $('#myadsContent').addClass('d-none')
      $('#changePremiumContent').removeClass('d-none')
  }
}

async function submitSetOrChangePaidAd() {
  check_new_auth_user()
  const changePaidAdForm = new FormData()
  changePaidAdForm.append('adid', changePaidAdFormData?.adid ?? null)

  if(changeAd.value == true) {
    changePaidAdForm.append('id', paidAdItem.value?.premium?.id ?? null)
  } else {
    changePaidAdForm.append('id', paidAdItem.value?.id ?? null)
  }

  try { 
    const response = await $fetch(config.VUE_APP_API_URL+`me/posts/change_paid_ad?lang=${language.value}`, {
      retry: 2,
      retryDelay: 3000,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": user_data.value.tokens.access_token },
      body: new URLSearchParams(changePaidAdForm).toString()
    }) 
    
    if(response) {
      attemptRequest.value = 0
      $('#myChangeAdsModal').modal('hide')
      showSuccessToast(changeAd.value == true ? 'success_change' : 'success_set')
      pageSize.value = 0
      posts.value = []
      isInitial.value = true
    }
  } catch (error) {
    if(!error.response) {
      $('#myChangeAdsModal').modal('hide');
      $('#modal_show_status_error_connection').modal('show');
    } else {
      if(error.response.status == 401) {
        if(attemptRequest.value < 2) {
          attemptRequest.value += 1
          setTimeout(() => { submitSetOrChangePaidAd() }, 3000);
        } else {
          $('#myChangeAdsModal').modal('hide');
          localStorage.removeItem('auth_user')
          router.replace(localePath({ name: 'index' }))  
        }     
      }
      else if(error.response.status == 404) {
        $('#myChangeAdsModal').modal('hide');
        errorData.type = 'problem_occurs'
        errorData.message = error?.response?._data?.message ?? null
        $('#failModal').modal('show')
      } else if (error.response.status == 503) {
        $('#myChangeAdsModal').modal('hide');
        errorData.type = 'problem_occurs'
        errorData.message = error?.response?._data?.message ?? null
        $('#failModal').modal('show')
      } else if (error.response._data && error.response._data.message) {
        $('#myChangeAdsModal').modal('hide');
        errorData.message = error?.response?._data?.message ?? null
        $('#changeAdErrorModal').modal('show')
      }
    }
  }
}

function checkSubscription(data) {
  if(data && data.premium.subscription_id) {
    router.push(localePath({ name: 'account-subscriptions-id', params: { id: data.premium.subscription_id }}))
  } else {
    if (data && data.status === 'block') {
      return showErrorToast(data?.status_message ?? '')
    }
    show_detail(data.title, data.id)
  }
}

watch(() => deleteForm.reason, async (val) => {
  if (val === 'other') {
      await nextTick();
      const element = $('#deleteReasone');
      if (element.length) {
        element.focus();
      } else {
      }
  }
})

</script>
