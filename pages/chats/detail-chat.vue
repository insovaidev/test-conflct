
<template>
  <div :class="isDesktop ? 'des_container dt_detail_chat' : ''">
      <!-- App Bar -->
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar" :class="isDesktop ? 'dt_de_chat_head dt_border' : ''">
          <div v-if=isMobile class="_div_nav bg_app_bar_header_" :class="isDesktop ? 'dt_d_chat_header' : ''">
              <div @click="goBack" v-if="!isDesktop" class="_pad_col_icon">
                  <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                      <i class="ion-android-arrow-back font_click_back"></i>
                  </button>
              </div>
              <div v-if="d_c_user_profile" class="incoming_msg_img mar_incoming_profile cur_sur" @click="show_contact_page">
                  <img :src="d_c_user_profile && d_c_user_profile.photo ? d_c_user_profile.photo.medium.url: empty_img_user"
                       :alt="d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name : ''" class="bg_reload_img_white" @error="imageUrlAlt_profile">
              </div>
              <template v-if="!check_not_own_chat">
                  <div class="col p-1 ml-1 cur_sur">
                      <div class="cl_ripple" @click="show_contact_page">
                          <h1 class="truncate_wrap de_user_name">{{ d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name : '' }}</h1>
                          <p class="truncate_wrap de_user_date">
                              {{ d_c_user_profile && d_c_user_profile.online_status ? d_c_user_profile.online_status.last_active : '' }}
                          </p>
                      </div>
                  </div>
                  <!-- close waring -->
                  <template v-if="d_c_user_profile && ((parseInt(d_c_user_profile.member_type) === 1 && d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.storeid && parseInt(d_c_detail_chat_topic.post.storeid) === 0) || (!d_c_detail_chat_topic && parseInt(d_c_user_profile.member_type) === 1))">
                      <div @click="show_safety_tip" class="_pad_col_icon de_w_d_icon_chat text-center cur_sur">
                          <i class="ion-alert-circled de_head_icon"></i>
                      </div>
                  </template>
                  <div v-if="user_contact && user_contact.length > 0" @click="dialog_phone_number('call')" class="_pad_col_icon de_w_d_icon_chat text-center cur_sur">
                      <i class="ion-android-call de_head_icon"></i>
                  </div>
                  <template v-if="isDesktop">
                      <div v-if="d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.type !== 'chat'" class="de_bg_post_chat dt_sh_post_chat de_bor_left">
                          <a rel="nofollow" href="javascript:void(0)" @click="show_detail(d_c_detail_chat_topic && d_c_detail_chat_topic.post &&  d_c_detail_chat_topic.post.title ? d_c_detail_chat_topic.post.title : '', d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.id ? d_c_detail_chat_topic.post.id : '', '')" class="style_flex">
                              <div class="col de-pad-col-content">
                                  <div class="_flex_">
                                      <div class="thumb_profile_detail position_relative">
                                          <img :src="d_c_detail_chat_topic.post.thumbnail ? d_c_detail_chat_topic.post.thumbnail : empty_img_post"
                                               :alt="d_c_detail_chat_topic.post.title ? d_c_detail_chat_topic.post.title : '.....'" class="logo_profile bg_reload_img de-radius-img-post" @error="imageUrlAlt_post">
                                          <div :class="d_c_detail_chat_topic.type === 'buy' ? 'position_absolute de_status_on_action de_type_buy' : 'position_absolute de_status_on_action de_type_sell'">
                                              <p class="m-0 de_pad_status">{{ d_c_detail_chat_topic.type === 'buy' ? $t('message.buy') : $t('message.sell') }}</p>
                                          </div>
                                      </div>
                                      <div class="de-parent-content-post">
                                          <p class="truncate de-fix-title-post">{{ d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.title ? d_c_detail_chat_topic.post.title : '.....' }}</p>
                                          <!-- price with discount -->
                                          <p class="truncate_wrap de-fix-price-post">
                                              {{ d_c_detail_chat_topic.post.discount === null ? '$'+convert_price(d_c_detail_chat_topic.post.price) : '$'+convert_price(d_c_detail_chat_topic.post.discount.sale_price) }}
                                              <span v-if="d_c_detail_chat_topic.post.discount !== null" class="pro_post_hour line_price"> ${{ convert_price(d_c_detail_chat_topic.post.discount.original_price) }} </span>
                                              <span v-if="d_c_detail_chat_topic.post.discount !== null" class="m-0 ml-1 font_12 text_buy">
                                                  {{ d_c_detail_chat_topic.post.discount && d_c_detail_chat_topic.post.discount.type === 'percent' ? parseInt(d_c_detail_chat_topic.post.discount.discount)+'% OFF' : '$'+convert_price_to_k(parseInt(d_c_detail_chat_topic.post.discount.discount))+' OFF' }}
                                              </span>
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </div>
                  </template>

                  <div @click="show_modal_action_chat" class="_pad_col_icon de_w_d_icon_chat text-center cur_sur" :class="isDesktop ? 'de_bor_left' : ''">
                    <i class="fas fa-ellipsis-v de_head_icon_option"></i>
                  </div>
              </template>
          </div>

          <!-- profile -->
          <div v-if="d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.type !== 'chat'" class="de_bg_post_chat">
              <a rel="nofollow" @click="show_detail(d_c_detail_chat_topic && d_c_detail_chat_topic.post &&  d_c_detail_chat_topic.post.title ? d_c_detail_chat_topic.post.title : '', d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.id ? d_c_detail_chat_topic.post.id : '', '')"
                  v-if="!isDesktop" href="javascript:void(0)" class="style_flex">
                  <div class="col-11 de-pad-col-content">
                      <div class="_flex_">
                          <div class="thumb_profile_detail position_relative">
                              <img :src="d_c_detail_chat_topic.post.thumbnail ? d_c_detail_chat_topic.post.thumbnail : empty_img_post"
                                   :alt="d_c_detail_chat_topic.post.title ? d_c_detail_chat_topic.post.title : '.....'" class="logo_profile bg_reload_img de-radius-img-post" @error="imageUrlAlt_post">
                              <div :class="d_c_detail_chat_topic.type === 'buy' ? 'position_absolute de_status_on_action de_type_buy' : 'position_absolute de_status_on_action de_type_sell'">
                                  <p class="m-0 de_pad_status">{{ d_c_detail_chat_topic.type === 'buy' ? $t('message.buy') : $t('message.sell') }}</p>
                              </div>
                          </div>
                          <div class="de-parent-content-post">
                              <p class="truncate de-fix-title-post">{{ d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.title ? d_c_detail_chat_topic.post.title : '.....' }}</p>
                              <!-- price with discount -->
                              <p class="truncate_wrap de-fix-price-post">
                                  {{ d_c_detail_chat_topic.post.discount === null ? '$'+convert_price(d_c_detail_chat_topic.post.price) : '$'+convert_price(d_c_detail_chat_topic.post.discount.sale_price) }}
                                  <span v-if="d_c_detail_chat_topic.post.discount !== null" class="pro_post_hour line_price"> ${{ convert_price(d_c_detail_chat_topic.post.discount.original_price) }} </span>
                                  <span v-if="d_c_detail_chat_topic.post.discount !== null" class="m-0 ml-1 font_12 text_buy">
                                      {{ d_c_detail_chat_topic.post.discount && d_c_detail_chat_topic.post.discount.type === 'percent' ? parseInt(d_c_detail_chat_topic.post.discount.discount)+'% OFF' : '$'+convert_price_to_k(parseInt(d_c_detail_chat_topic.post.discount.discount))+' OFF' }}
                                  </span>
                              </p>
                          </div>
                      </div>
                  </div>
                  <div class="col-1 de_mar_arrow_pro text-right">
                      <i class="ion-ios-arrow-forward text_grey me-3"></i>
                  </div>
              </a>
              <div v-if="d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.status === 'inactive'" class="de_d_chat_post_warn">
                  <span class="fas fa-exclamation-circle"></span>
                  <p class="truncate"> {{ d_c_detail_chat_topic.post.status_message }} </p>
              </div>
          </div>
      </div>
      <!-- / App Bar -->

      <div v-if="check_not_own_chat" class="not_found_parent">
          <div class="not_found_child">
              <i class="fas fa-exclamation-triangle text_grey de_mg_i not_found_icon"></i>
              <p class="font_22"> {{ check_not_own_chat }} </p>
          </div>
      </div>
      <template v-else>

          <div @click="check_focus" class="parent_scroll_chat">
              <div id="msg_history" class="child_scroll_chat msg_history">

                  <ClientOnly>
                      <VueEternalLoading :load="conversation_by_topic" margin="800px">
                          <template #loading>
                              <div class="text-center">
                                  <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="de_loading_width">
                              </div>
                          </template>
                          <template #error="{ retry }">
                              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
                                  <div class="no_more_result p-2">
                                      <div class="p_bg_status">
                                          <span class="fas fa-wifi size_icon_status"></span>
                                          <p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
                                          <p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                          <button @click="retry(), refresh_auto()" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                      </div>
                                  </div>
                              </div>
                          </template>
                          <template #no-more>
                              <div class="no_more_result"></div>
                          </template>
                          <template #no-results>
                              <div class="no_more_result">
                                  <!--<i class="fa fa-exclamation-circle u_no_result_font"></i>
                                  <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>-->
                              </div>
                          </template>
                      </VueEternalLoading>
                  </ClientOnly>

                  <template v-if="d_c_conversations">
                      <div v-for="(chat, index) in d_c_conversations" :key="index">

                          <!-- post (inbox && send) -->
                          <div v-if="chat.type === 'post'" :class="chat.folder === 'inbox' ? 'incoming_msg mb-2' : 'outgoing_msg mb-2'">
                              <div class="position_relative" :class="chat.folder == 'inbox' ? 'width_big_px received_msg' : 'width_big_px sent_msg'">
                                  <div class="position_relative cur_sur" :class="chat.folder == 'inbox' ? 'received_with_msg full_width' : ''"
                                       @click="show_detail(chat.data.title, chat.data.id, chat.tmp_id ? 'disable_click' : '')">

                                      <!-- delete option -->
                                      <div v-if="chat.id" :class="chat.folder === 'send' ? 'p-o-m-p-right' : 'p-o-m-p-left'" @click.stop.prevent="modal_delete_message(chat.id, 'post', chat)" class="pad-opt-msg-post">
                                          <i class="icon-ellipsis-vertical cur_sur"></i>
                                      </div>

                                      <img :src='chat.data.thumbnail ? chat.data.thumbnail : (chat.data.image ? chat.data.image : empty_img_post)'
                                           :alt="chat.data.title ? chat.data.title : ''" @error="imageUrlAlt_post"
                                           :class="chat.folder == 'inbox' ? 'de_img_post_chat border_receive_chat bg_reload_img_white' : 'de_img_post_chat border_sent_chat bg_reload_img_white'">

                                      <div v-if="chat.data && chat.data.discount" class="position_absolute de_type_buy de_new_st_discount_chat">
                                          <p class="m-0 font_11 text-white">
                                              {{ chat.data.discount.type === 'percent' ? parseInt(chat.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(chat.data.discount.discount)) }}
                                          </p>
                                          <p class="m-0 font_9 text-white">OFF</p>
                                      </div>

                                      <p :class="chat.folder == 'inbox' ? 'de_text_chat_style break_word_ pa' : 'de_text_chat_style pa border_sent_chat_text break_word_'">
                                          {{ chat.data.title ? chat.data.title : '' }} <br>
                                          <span v-if="chat.data && chat.data.price && chat.data.discount === null" class="de_p_post_chat"> ${{ chat.data.price }} </span>
                                          <span v-else class="de_p_post_chat"> {{ chat.data.discount ? '$'+chat.data.discount.sale_price : '' }} </span>
                                      </p>

                                      <p v-if="chat.tmp_id" class="m-0 _flex_ float-right">
                                          <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('post', chat.tmp_id)">
                                              <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                          </span>
                                          <span v-else class="time_date">Sending...</span>
                                      </p>
                                      <p v-else :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                          <span class="time_date"> {{ convertFromNow(chat.send_date) }}  </span>
                                          <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <!-- text (inbox && send) -->
                          <div v-if="chat.type === 'text'" :class="chat.folder === 'inbox' ? 'incoming_msg mb-2' : 'outgoing_msg'">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'sent_msg'">
                                  <div :class="chat.folder == 'inbox' ? 'received_with_msg' : 'sent_msg text_white unset_width'" class="position_relative">

                                      <!-- check new message inbox to apply background color "bg_color_new_chat_inbox" -->
                                      <div class="pa _flex_ dt_border" :class="chat.folder == 'inbox' && arr_check_new_message_is_coming.length > 0 && arr_check_new_message_is_coming.includes(parseInt(chat.id)) ? 'bg_color_new_chat_inbox' : ''">
                                          <div v-if="chat.folder === 'inbox' && chat.id" @click="modal_delete_message(chat.id, 'text', chat)" class="pad-opt-msg mg-opt-left"><i class="icon-ellipsis-vertical"></i></div>

                                          <p :id="'text_'+chat.id" class="m-0 de-text-s-t-p" v-html="chat.message"></p>
                                          <!-- {{ chat.message }} -->

                                          <div v-if="chat.folder === 'send' && chat.id" @click="modal_delete_message(chat.id, 'text', chat)" class="pad-opt-msg mg-opt-right"><i class="icon-ellipsis-vertical"></i></div>
                                      </div>

                                      <p v-if="chat.tmp_id" class="m-0 _flex_ float-right">
                                          <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('text', chat.tmp_id)">
                                              <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                          </span>
                                          <span v-else class="time_date">Sending...</span>
                                      </p>
                                      <p v-else :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                          <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                          <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <!-- photo (inbox && send) -->
                          <div v-if="chat.type === 'photo'" :class="chat.folder === 'inbox' ? 'incoming_msg mb-2' : 'outgoing_msg mb-2'">
                              <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_msg width_big_px' : 'sent_msg width_big_px'">
                                  <div :class="chat.folder == 'inbox' ? 'received_with_msg' : ''">

                                      <!-- delete option -->
                                      <div v-if="chat.id" :class="chat.folder === 'send' ? 'p-o-m-p-right' : 'p-o-m-p-left'" @click="modal_delete_message(chat.id, 'photo', chat)" class="pad-opt-msg-post">
                                          <i class="icon-ellipsis-vertical"></i>
                                      </div>

                                      <a rel="nofollow" :href="chat.data.image ? chat.data.image : ''" :data-fancybox="'photo'+chat.id">
                                          <img :id="'img_'+chat.id" :src="chat.data ? chat.data.image : empty_img_post" @error="imageUrlAlt_post"
                                               :class="chat.folder == 'inbox' ? 'inbox_photo bg_reload_img_white' : 'sent_photo bg_reload_img_white'" alt="photo">
                                      </a>

                                      <p v-if="chat.tmp_id" class="m-0 _flex_ float-right">
                                          <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('photo', chat.tmp_id)">
                                              <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                          </span>
                                          <span v-else class="time_date">Sending...</span>
                                      </p>
                                      <p v-else :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                          <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                          <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <!-- photos (inbox && send) -->
                          <div v-if="chat.type === 'photos'" :class="chat.folder === 'inbox' ? 'incoming_msg mb-2' : 'outgoing_msg mb-2'">
                              <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_msg width_big_px' : 'sent_msg width_big_px'">
                                  <div> <!-- :class="chat.folder == 'inbox' ? 'received_with_msg' : ''" -->

                                      <!-- delete option -->
                                      <div v-if="chat.id" :class="chat.folder === 'send' ? 'p-o-m-p-right' : 'p-o-m-p-left'" @click="modal_delete_message(chat.id, 'photos', chat)" class="pad-opt-msg-post cur_sur">
                                          <i class="icon-ellipsis-vertical"></i>
                                      </div>

                                      <!-- one col -->
                                      <template v-if="chat.data.length === 1">
                                          <!-- loading -->
                                          <a rel="nofollow" v-if="chat.tmp_id">
                                              <img alt="photo" :src="chat.data[0].medium ? chat.data[0].medium.image : ''" :class="chat.folder == 'inbox' ? 'inbox_photo bg_reload_img_white' : 'sent_photo bg_reload_img_white'">
                                          </a>
                                          <!-- show photo -->
                                          <a rel="nofollow" v-else :href="chat.data[0] ? chat.data[0].image : ''" :data-fancybox="'photo'+chat.id">
                                              <img alt="photo" :id="'img_'+chat.id" :src="chat.data[0].medium ? chat.data[0].medium.image : empty_img_post" @error="imageUrlAlt_post"
                                                   :class="chat.folder == 'inbox' ? 'inbox_photo bg_reload_img_white' : 'sent_photo bg_reload_img_white'">
                                          </a>
                                      </template>
                                      <!-- two col -->
                                      <div v-else-if="chat.data.length <= 6" class="de-chat-two-col-img">
                                          <template v-if="chat.tmp_id">
                                              <a rel="nofollow" v-for="img in chat.data" :key="img" class="de-chat-a-img"><img :src="img && img.medium && img.medium.image ? img.medium.image : ''"></a>
                                          </template>
                                          <template v-else>
                                              <a rel="nofollow" v-for="img in chat.data" :key="img" class="de-chat-a-img" :href="img ? img.image : ''" :data-fancybox="'photo'+chat.id">
                                                  <img alt="photo" :id="'img_'+chat.id" :src="img && img.medium && img.medium.image ? img.medium.image : empty_img_post" @error="imageUrlAlt_post">
                                              </a>
                                          </template>
                                      </div>
                                      <!-- three col -->
                                      <div v-else-if="chat.data.length <= 14" class="de-chat-three-col-img">
                                          <template v-if="chat.tmp_id">
                                              <a rel="nofollow" v-for="img in chat.data" :key="img" class="de-chat-a-img"><img :src="img && img.medium && img.medium.image ? img.medium.image : ''"></a>
                                          </template>
                                          <template v-else>
                                              <a rel="nofollow" v-for="img in chat.data" :key="img" class="de-chat-a-img" :href="img ? img.image : ''" :data-fancybox="'photo'+chat.id">
                                                  <img alt="photo" :id="'img_'+chat.id" :src="img && img.medium && img.medium.image ? img.medium.image : empty_img_post" @error="imageUrlAlt_post">
                                              </a>
                                          </template>
                                      </div>
                                      <!-- four col -->
                                      <div v-else-if="chat.data.length > 14" class="de-chat-four-col-img">
                                          <template v-if="chat.tmp_id">
                                              <a rel="nofollow" v-for="img in chat.data" :key="img" class="de-chat-a-img"><img :src="img && img.medium && img.medium.image ? img.medium.image : ''"></a>
                                          </template>
                                          <template v-else>
                                              <a rel="nofollow" v-for="img in chat.data" :key="img" class="de-chat-a-img" :href="img ? img.image : ''" :data-fancybox="'photo'+chat.id">
                                                  <img alt="photo" :id="'img_'+chat.id" :src="img && img.medium && img.medium.image ? img.medium.image : empty_img_post" @error="imageUrlAlt_post">
                                              </a>
                                          </template>
                                      </div>

                                      <p v-if="chat.tmp_id && chat.status === 1" class="m-0 _flex_ float-right"><span class="time_date">Waiting...</span></p>
                                      <p v-else-if="chat.tmp_id && chat.status === 2" class="m-0 _flex_ float-right">
                                          <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('photos', chat.tmp_id)">
                                              <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                          </span>
                                          <span v-else class="time_date">Sending...</span>
                                      </p>
                                      <p v-else :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                          <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                          <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <!-- map (inbox && send) -->
                          <div v-if="chat.type === 'map'" class="incoming_msg mb-2">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'outgoing_msg'">
                                  <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_with_msg width_big_px' : 'sent_msg width_big_px'">
                                      <!--<a rel="nofollow noopener" target="_blank" :href="'https://maps.google.com/maps?q='+chat.data.lat+','+chat.data.lng+'&amp;'+chat.data.zoon+''" class="style_flex div_location_map" :class="chat.folder == 'inbox' ? 'map_receive_chat' : 'map_sent_chat'">-->
                                      <div @click="show_chat_map(chat.data.lat, chat.data.lng, chat.data.zoon)" class="style_flex div_location_map cur_sur" :class="chat.folder == 'inbox' ? 'map_receive_chat' : 'map_sent_chat'">
                                          <!-- delete option -->
                                          <div v-if="chat.id" :class="chat.folder === 'send' ? 'p-o-m-p-right' : 'p-o-m-p-left'" @click.stop.prevent="modal_delete_message(chat.id, 'map', chat)" class="pad-opt-msg-post">
                                              <i class="icon-ellipsis-vertical"></i>
                                          </div>
                                          <!-- map -->
                                          <div class="map_box btn_showMap">
                                              <div class="text location_map"> <span class="fa fa-map-marked-alt"></span> {{ $t('message.show_google_map') }} </div>
                                          </div>
                                      </div>

                                      <p v-if="chat.tmp_id" class="m-0 _flex_ float-right">
                                          <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('map', chat.tmp_id)">
                                              <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                          </span>
                                          <span v-else class="time_date">Sending...</span>
                                      </p>
                                      <p v-else :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                          <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                          <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <!-- business_card (inbox && send) -->
                          <div v-if="chat.type === 'business_card'" class="incoming_msg mb-2">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'outgoing_msg'">
                                  <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_with_msg width_big_px' : 'sent_msg width_big_px'">
                                      <div class="large-12 columns">
                                          <!-- :to="{ name: 'contact_page', query: { username: chat.folder == 'inbox' ? (d_c_user_profile && d_c_user_profile.username ? d_c_user_profile.username : '') : (user_data.user && user_data.user.username ? user_data.user.username : '') }}" -->
                                          <div :class="chat.folder == 'inbox' ? 'chat_profile_inbox' : 'chat_profile_sent'" class="rip_show_user">
                                              <div class="_flex_ cur_sur">
                                                  <div @click="show_profile_bus(chat.folder, chat)" class="col-10 pro_style">
                                                      <div class="style_flex">
                                                          <div class="mr-1 ml-2">
                                                              <img v-if="chat.folder == 'inbox'" :src="d_c_user_profile && d_c_user_profile.photo ? d_c_user_profile.photo.small.url: empty_img_user"
                                                                   class="img_chat_profile" :alt="d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name : ''" @error="imageUrlAlt_profile">
                                                              <img v-else :src="user_data.user && user_data.user.photo ? user_data.user.photo.small.url : empty_img_user"
                                                                   class="img_chat_profile" :alt="chat.data.name ? chat.data.name : ''" @error="imageUrlAlt_profile">
                                                          </div>
                                                          <div :class="chat.folder != 'inbox' ? 'text_chat_profile' : 'text_chat_profile_sent'">
                                                              <p class="truncate m-0 font_14"> {{ chat.data.name ? chat.data.name : '' }} </p>
                                                              <p class="truncate font_13 m-0 c_m_grey"> @{{ chat.folder == 'inbox' ? (d_c_user_profile && d_c_user_profile.username ? d_c_user_profile.username : '') : (user_data.user && user_data.user.username ? user_data.user.username : '') }} </p>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div v-if="chat.folder === 'send' && chat.id" @click.stop.prevent="modal_delete_message(chat.id, 'business_card', chat)" class="col-2 arrow_icon_user_detail mt-2">
                                                      <i class="icon-ellipsis-vertical text_grey font_15"></i>
                                                  </div>
                                              </div>
                                              <div class="bus-card-con de_margin_1 pa" :class="chat.folder == 'inbox' ? 'text_profile_inbox' : 'text_profile_sent'">
                                                  <!-- company name -->
                                                  <div v-if="chat.data && chat.data.company" class="style_flex">
                                                      <i class="fas fa-building c_m_grey margin_text_icon"></i>
                                                      <p class="m-0 break_word">{{ chat.data.company }}</p>
                                                  </div>
                                                  <!-- phone number -->
                                                  <div v-if="chat.data && chat.data.phone" class="style_flex">
                                                      <i class="fas fa-phone-alt c_m_grey margin_text_icon"></i>
                                                      <p class="m-0">
                                                          <a rel="nofollow" v-for="(ph, key, inx) in chat.data.phone" :key="inx" v-bind:href="'tel:'+ph" class="font_15" style="color: #007bff!important">
                                                              {{ key > 0 ? ' , ' : '' }}
                                                              {{ ph }}
                                                              <!--{{ p + '&nbsp;' }}-->
                                                          </a>
                                                      </p>
                                                  </div>
                                                  <!-- email -->
                                                  <div v-if="chat.data && chat.data.email" class="style_flex">
                                                      <i class="fa fa-envelope c_m_grey margin_text_icon"></i>
                                                      <a rel="nofollow" v-bind:href="'mailto::'+chat.data.email" class="font_15 break_word" style="color: #007bff!important">
                                                          {{ chat.data.email }}
                                                      </a>
                                                      <!-- <p class="m-0 text-primary">011505255</p> -->
                                                  </div>
                                                  <!-- locations -->
                                                  <div v-if="chat.data && chat.data.location" class="style_flex">
                                                      <i class="fas fa-map-marker-alt c_m_grey margin_text_icon"></i>
                                                      <p class="m-0 font_15 break_word">
                                                          {{ chat.data.location && chat.data.location.long_location ? chat.data.location.long_location+' , ' : '' }}
                                                          {{ chat.data.address ? chat.data.address : '' }}
                                                      </p>
                                                  </div>
                                                  <!-- show map -->
                                                  <div v-if="chat.data && chat.data.map" class="chat_btn_show_map">
                                                      <a rel="nofollow noopener" v-if="chat.data.map" v-bind:href="'https://maps.google.com/maps?q='+chat.data.map.lat+','+chat.data.map.lng" target="_blank">
                                                          <p class="m-0 font_15 p-1 text-primary">{{ $t('message.show_google_map') }}</p>
                                                      </a>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>

                                      <p v-if="chat.tmp_id" class="m-0 _flex_ float-right">
                                          <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('business_card', chat.tmp_id)">
                                              <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                          </span>
                                          <span v-else class="time_date">Sending...</span>
                                      </p>
                                      <p v-else :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                          <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                          <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                      </p>
                                  </div>
                              </div>
                          </div>
                          <!-- voice (inbox && send) -->
                          <div v-if="chat.type === 'voice'" class="incoming_msg mb-2">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'outgoing_msg'">
                                  <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_with_msg' : 'sent_msg'" style="width: auto!important;">
                                      <template v-if="!chat.tmp_id">
                                          <audio :id="chat.id+'_audio'" :src="chat.data.file" controls class="d-none"></audio>
                                          <div :class="chat.folder == 'inbox' ? 'voice_inbox' : 'voice_sent'" class="_flex_ cur_sur">

                                              <!-- voice -->
                                              <div @click="play_voice(chat.data.file, chat.id)" class="_flex_">
                                                  <i :id="'play_'+chat.id" class="fas fa-play-circle font_25"></i>
                                                  <i :id="'push_'+chat.id" class="fas fa-stop-circle font_25 d-none"></i>
                                                  <div class="m-0 ml-2 font_16 _flex_">
                                                      <p class="m-0" :id="chat.id">00:00</p>
                                                      &nbsp;/&nbsp;
                                                      <p class="m-0">{{ calculate(chat.data.length) }}</p>
                                                  </div>
                                              </div>

                                              <div v-if="chat.folder === 'send' && chat.id" @click="modal_delete_message(chat.id, 'voice', chat)" class="pad-opt-msg mg-opt-right"><i class="icon-ellipsis-vertical"></i></div>
                                          </div>
                                          <p :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                              <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                              <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                          </p>
                                      </template>
                                      <template v-else>
                                          <div :class="chat.folder == 'inbox' ? ' _flex_ voice_inbox' : '_flex_ voice_sent'">
                                              <i class="fas fa-play-circle font_25"></i>
                                              <div class="m-0 ml-2 font_16 _flex_"><p class="m-0">Uploading...</p></div>
                                          </div>
                                          <p class="m-0 _flex_ float-right">
                                              <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false(chat.pending_upload ? 'voice_to_tmp' : 'voice', chat.tmp_id)">
                                                  <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                              </span>
                                              <span v-else class="time_date">Sending...</span>
                                          </p>
                                      </template>
                                  </div>
                              </div>
                          </div>
                          <!-- file (inbox && send) -->
                          <div v-if="chat.type === 'file'" class="incoming_msg mb-2">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'outgoing_msg'">
                                  <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_with_msg width_big_px' : 'sent_msg width_big_px'">
                                      <template v-if="!chat.tmp_id">
                                          <div :class="chat.folder == 'inbox' ? 'chat_file_receive' : 'chat_file_sent'">
                                              <div class="de-pad-file">
                                                  <!--<a rel="nofollow noopener" v-bind:href="chat.data.file" target="_blank" class="style_flex">-->
                                                  <a rel="nofollow" @click="show_chat_attach(chat.data.file)" href="javascript:void(0)" class="style_flex">
                                                      <div class="_flex_">
                                                          <div v-if="chat.folder === 'inbox' && chat.id" @click.stop.prevent="modal_delete_message(chat.id, 'file', chat)" class="pad-opt-msg mg-opt-left"><i class="icon-ellipsis-vertical"></i></div>

                                                          <div class="custom_file">
                                                              <!--<img :src="asset_url+version_library+'img/file.png'" class="img_chat_profile">-->
                                                              <p class="custom_file_text"> {{ chat.data && chat.data.type ? chat.data.type : '' }} </p>
                                                          </div>
                                                          <div class="col pr-1 pl-2">
                                                              <p class="truncate_wrap font_14 m-0"> {{ chat.data.name ? chat.data.name : '' }} </p>
                                                              <p class="m-0 c_m_grey font_11"> {{ convert_bytes(chat.data.size) }} </p>
                                                          </div>
                                                          <div v-if="chat.folder === 'send' && chat.id" @click.stop.prevent="modal_delete_message(chat.id, 'file', chat)" class="pad-opt-msg mg-opt-right"><i class="icon-ellipsis-vertical"></i></div>
                                                      </div>
                                                  </a>
                                              </div>
                                          </div>
                                          <p :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                              <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                              <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                          </p>
                                      </template>
                                      <template v-else>
                                          <div :class="chat.folder == 'inbox' ? 'chat_file_receive' : 'chat_file_sent'">
                                              <a rel="nofollow" href="javascript:void(0)" class="style_flex">
                                                  <div class="de-flex-padding-file">
                                                      <div class="custom_file"><p class="custom_file_text">File</p></div>
                                                      <div class="text_chat_profile"><p class="font_15 mt-2 mb-0">Uploading...</p> </div>
                                                  </div>
                                              </a>
                                          </div>
                                          <p class="m-0 _flex_ float-right">
                                              <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('file', chat.tmp_id)">
                                                  <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                              </span>
                                              <span v-else class="time_date">Sending...</span>
                                          </p>
                                      </template>
                                  </div>
                              </div>
                          </div>

                          <!-- file (inbox && send) -->
                          <div v-if="chat.type === 'resume'" class="incoming_msg mb-2">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'outgoing_msg'">
                                  <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_with_msg width_big_px' : 'sent_msg width_big_px'" >
                                      <template v-if="!chat.tmp_id">
                                          <div class="bg_resume" >
                                              <div class="de-pad-file ">
                                                  <a @click="show_resume(chat.data.id,chat.data.key,chat.data.userid)" rel="nofollow" href="javascript:void(0)">
                                                    <div class="d-flex w-100 mb-1">
                                                      <div class="w_80">
                                                        <div class="mb-1 text-secondary truncate fn_15" >{{ language=== 'km' ? 'ប្រវត្តិរូបសង្ខែប' : 'Resume' }}</div>
                                                        <div v-if="chat.data.name" class="fn_17"><strong>{{chat.data.name}}</strong></div>
                                                        <div v-else class="p-3 text-secondary fn_17">Unknown</div>
                                                      </div>
                                                      <div >
                                                        <img v-if="chat.data.photo" :src="chat.data.photo.url" alt="" class="img-resume">
                                                        <img v-else :src="empty_img_user" alt="" class="no_img">
                                                      </div>
                                                      <div  v-if="chat.folder === 'send' && chat.id" @click.stop.prevent="modal_delete_message(chat.id, 'resume', chat)" class="p-2 pad-opt-msg mg-opt-right d_resume"><i class="icon-ellipsis-vertical"></i></div>
                                                    </div>
                                                    <div>
                                                      <div v-if="chat.data.education_level" class="truncate fn_15" >{{ language=== 'km' ? 'កម្រិតការអប់រំ' : 'Education Level' }}: {{ chat.data.education_level.title }}</div>
                                                      <div v-if="chat.data.work_experience" class="fn_15"  >{{ language=== 'km' ? 'បទពិសោធន៏ (ឆ្នាំ)' : 'Working Experience' }}: {{ chat.data.work_experience }}</div>
                                                      <div v-if="chat.data.position" class="truncate fn_15" >{{ language=== 'km' ? 'មុខតំណែងបច្ចុប្បន្ន' : 'Current Position' }}: {{ chat.data.position }}</div>
                                                      <div v-if="chat.data.preferred_position" class="truncate fn_15" >{{ language=== 'km' ? 'មុខតំណេងដែលពេញចិត្ដ' : 'Preferred Position' }}: {{ chat.data.preferred_position }}</div>
                                                    </div>
                                                  </a>
                                                  <a @click="show_resume(chat.data.id,chat.data.key,chat.data.userid)" href="javascript:void(0)">
                                                    <div class="text-primary mt-3 btn_view_resume" >
                                                      {{ language=== 'km' ? 'មើលប្រវត្តិរូបសង្ខែប (CV)' : 'View Resume(CV)' }}
                                                    </div>
                                                  </a>
                                              </div>
                                          </div>
                                          
                                          <p :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                              <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                              <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                          </p>
                                      </template>
                                      <template v-else>
                                        <!-- <p  class="m-0 _flex_ float-right"><span class="time_date">Waiting...</span></p> -->
                                        <p class="m-0 _flex_ float-right">
                                            <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('resume', chat.tmp_id)">
                                                <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                            </span>
                                            <span v-else class="time_date">Sending...</span>
                                        </p>
                                      </template>
                                  </div>
                              </div>
                          </div>

                          <!-- file (inbox && send) -->
                          <div v-if="chat.type === 'address'" class="incoming_msg mb-2">
                              <div :class="chat.folder == 'inbox' ? 'received_msg' : 'outgoing_msg'">
                                  <div class="position_relative" :class="chat.folder == 'inbox' ? 'received_with_msg width_big_px' : 'sent_msg width_big_px'" >
                                      <template v-if="!chat.tmp_id">
                                          <div class="p-2 bg_address">
                                              <div class="de-pad-file ">
                                                <div class="mb-2 d-flex">
                                                  <div class="w_90">
                                                    <strong >{{ language=== 'km' ? 'អាស័យដ្ឋាន' : 'Shipping / billing Address' }}</strong>
                                                  </div>
                                                  <div  v-if="chat.folder === 'send' && chat.id" @click.stop.prevent="modal_delete_message(chat.id, 'address', chat)" class=" pad-opt-msg mg-opt-right w_10"><i class="icon-ellipsis-vertical"></i></div>
                                                </div>
                                                <div class="b_top">
                                                  <div class="mb-2 mt-2 fn_17 w_90"><strong>{{ chat.data.label }}</strong></div>
                                                  <div class="mb-1 d-flex">
                                                    <i class="fas fa-user-circle text-secondary pt-1  _i"></i>
                                                    <div class="_div">{{chat.data.name}}</div>
                                                  </div>
                                                  <div class="mb-1 d-flex" v-if="chat.data.company">
                                                    <!-- <i class="fas fa-city text-secondary pt-1 _i fn_14" ></i> -->
                                                    <img class=" mr-2 icon_tax" src="/icon/skyline.png" alt="" width="20px">
                                                    <div class="_div ml_2">{{chat.data.company}}</div>
                                                  </div>
                                                  <div class="mb-1 d-flex" v-if="chat.data.tax_id">
                                                    <img class=" mr-2 icon_tax" src="/icon/taxes.png" alt="" width="20px">
                                                    <div class="_div ml_2">{{chat.data.tax_id}}</div>
                                                  </div>
                                                  <div class="d-flex mb-1">
                                                    <i class="fas fa-phone-alt  pt-1  _i text-secondary" ></i>
                                                    <div class="_div" style="display: flex;flex-wrap: wrap; white-space: break-spaces; word-break: break-word;">
                                                      <div v-for="(ph,index) in chat.data.phone" :key="index">
                                                        <span v-if="index > 0 && index < 2">, </span>
                                                        <a class="text-primary" :href="'tel:'+ph">{{ ph }}</a>
                                                        <span v-if="chat.data.phone.length === 3 && index === 1">, </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div v-if="chat.data.email" class="d-flex mb-1">
                                                      <i class="fa fa-envelope _i text-secondary pt-1"></i>
                                                      <a class="text-primary _div" :href="'mailto:'+chat.data.email">{{ chat.data.email }}</a>
                                                  </div>
                                                  <div class="mb-1 d-flex">
                                                    <i class="fas fa-map-marker-alt text-secondary pt-1 _i" ></i>
                                                    <div class="_div">{{ language=== 'km' ? chat.data.location.long_location : chat.data.location.en_name3 }}</div>
                                                  </div>
                                                  <div class="d-flex">
                                                    <i class="fas fa-user-circle text-white pt-1  _i"></i>
                                                    <div class="_div text-secondary">{{chat.data.address}}</div>
                                                  </div>
                                                  <div v-if="chat.data.map" class="mt-1 d-flex"  @click="show_chat_map(chat.data.map.lat, chat.data.map.lng, chat.data.map.zoon)">
                                                    <i class="fas fa-user-circle text-white pt-1  _i"></i>
                                                    <div class="text-primary btn border-0 p-0 fn_14">{{ language=== 'km' ? 'បង្ហាញទិសដៅ' : 'Get Directions' }}</div>
                                                    <!-- {{ chat.data.map }} -->
                                                  </div>
                                                </div>
                                              </div>
                                          </div>

                                          
                                          <p  :class="chat.folder == 'send' ? 'm-0 _flex_ float-right' : 'm-0'">
                                              <span class="time_date"> {{ convertFromNow(chat.send_date) }} </span>
                                              <i v-if="chat.folder == 'send' && chat.is_read" class="fas fa-check text_light font_10 mt-1 ml-1"></i>
                                          </p>
                                      </template>
                                      <template v-else>
                                        <p  class="m-0 _flex_ float-right">
                                              <!-- <span v-if="chat.tmp_id && chat.status " class="m-0 _flex_ float-right"><span class="time_date">Waiting...</span></span> -->
                                              <span v-if="chat.is_error" class="time_date text-danger" @click="resent_msg_false('address', chat.tmp_id)">
                                                  <i class="fas fa-exclamation-circle"></i> Error: Tap to resent
                                              </span>
                                              <span v-else class="time_date">Sending...</span>
                                          </p>
                                      </template>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </template>

                  <!-- add br to bottom -->
                  <div id="down_scroll">
                      <template v-if="show_hide_more_mess"> <!-- if show options sent -->
                          <br><br><br><br><br><br><br><br><br>
                      </template>
                      <template v-if="show_topic_post"> <!-- if have post to sent too -->
                          <br><br>
                      </template>
                      <br><br><br><br>
                  </div>
              </div>
          </div>

          <template v-if="prevent_vue_render_first">
              <div :class="chat_block === false ? '' : 'd-none'"> <!-- chat isn`t block -->
                  <!-- Nav chat -->
                  <div class="nav_chat">
                      <!-- fast text chat -->
                      <div v-if="hide_show_text_chat" class="_flex_ full_width" :class="isDesktop ? 'des_container' : ''">
                          <div class="col overflow-auto">
                              <div v-if="((d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'buy') || !d_c_detail_chat_topic) && language === 'en'" class="style_flex">
                                  <div v-for="t_en in chat_buy_template_en" :key="t_en" @click="send_message(t_en, 'quick')" class="fast_chat cur_sur"><p class="de_max_content m-0">{{ t_en }}</p></div>
                              </div>
                              <div v-else-if="((d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'buy') || !d_c_detail_chat_topic) && language === 'km'" class="style_flex">
                                  <div v-for="t_en in chat_buy_template_km" :key="t_en" @click="send_message(t_en, 'quick')" class="fast_chat cur_sur"><p class="de_max_content m-0">{{ t_en }}</p></div>
                              </div>
                              <div v-else-if="d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'sell' && language === 'en' && data_q_c.length === 0" class="style_flex">
                                  <div v-for="t_en in chat_sell_template_en" :key="t_en" @click="send_message(t_en, 'quick')" class="fast_chat cur_sur"><p class="de_max_content m-0">{{ t_en }}</p></div>
                              </div>
                              <div v-else-if="d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'sell' && language === 'km' && data_q_c.length === 0" class="style_flex">
                                  <div v-for="t_en in chat_sell_template_km" :key="t_en" @click="send_message(t_en, 'quick')" class="fast_chat cur_sur"><p class="de_max_content m-0">{{ t_en }}</p></div>
                              </div>
                              <div v-else-if="d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'sell' && data_q_c.length > 0" class="style_flex">
                                  <div v-for="(t_en, key, index) in data_q_c" :key="index" class="de_quick_fast_chat cur_sur">
                                      <p @click="send_message(t_en.data, 'quick')">{{ t_en.title }}</p>
                                      <i @click="eye_check_text_q_c(t_en.id)" class="far fa-eye"></i>
                                  </div>
                              </div>
                          </div>
                          <div v-if="(hide_show_text_chat && d_c_detail_chat_topic && d_c_detail_chat_topic.type !== 'chat') || !d_c_detail_chat_topic" class="de_pad_tex_field">
                              <span @click="hide_show_message('hide')" class="fas fa-times-circle ch_fix_clear_icon cur_sur"></span>
                          </div>
                      </div>

                      <!-- topic chat post (if click chat from detail post must to show post topic) -->
                      <div :class="isDesktop ? 'des_container' : ''">
                          <div v-if="show_topic_post" class="_flex_ full_width de_shadow_div_tool border_bottom_light">
                              <div class="de-con-post-img-chat">
                                  <img :src="det_post && det_post.img ? det_post.img : empty_img_post" @error="imageUrlAlt_post"
                                       :alt="det_post && det_post.title ? det_post.title : ''" class="logo_profile bg_reload_img">
                              </div>
                              <div class="col de-con-post-chat">
                                  <p class="truncate_wrap de-con-p1">{{ det_post && det_post.title ? det_post.title : '' }}</p>
                                  <p class="truncate_wrap de-con-p2">{{ det_post && det_post.price ? '$'+det_post.price : '' }}</p>
                                  <p class="truncate_wrap" style="margin: 2px 0 0 0;color:gray;font-size:14px">{{ det_post && det_post.position ? det_post.position : '' }} 
                                    <span v-if="det_post && det_post.position && det_post.work_experience"> - </span>
                                    <span v-if="det_post && det_post.work_experience">{{ language === 'km' ? 'បទពិសោធន៍ '+det_post.work_experience+ ' ឆ្នាំ' :  det_post.work_experience+ ' years experience' }}</span></p>
                              </div>
                              <div v-if="count_chats > 0" class="_flex_ de-con-icon-sent-remove-chat">
                                  <div @click="send_message('','post')" class="p-0 text-center de_col_div_border_right cur_sur">
                                      <i class="fas fa-paper-plane text-center de_size_of_icon de_display_table"></i>
                                  </div>
                                  <div @click="remove_post" class="p-0 text-center de_col_div_border_left cur_sur">
                                      <i class="fa fa-times text-center text-danger font_23 de_display_table"></i>
                                  </div>
                              </div>
                          </div>
                          <div v-if="show_topic_resume" class="_flex_ full_width de_shadow_div_tool border_bottom_light">
                              <div class="de-con-post-img-chat">
                                  <img :src="det_post && det_post.img ? det_post.img : empty_img_post" @error="imageUrlAlt_post"
                                       :alt="det_post && det_post.title ? det_post.title : ''" class="logo_profile bg_reload_img">
                              </div>
                              <div class="col de-con-post-chat">
                                  <p class="truncate_wrap de-con-p1">{{ det_post && det_post.title ? det_post.title : '' }}</p>
                                  <p class="truncate_wrap" style="margin: 2px 0 0 0;color:gray;font-size:14px">{{ det_post && det_post.position ? det_post.position : '' }} 
                                    <span v-if="det_post && det_post.position && det_post.work_experience"> - </span>
                                    <span v-if="det_post && det_post.work_experience">{{ language === 'km' ? 'បទពិសោធន៍ '+det_post.work_experience+ ' ឆ្នាំ' :  det_post.work_experience+ ' years experience' }}</span></p>
                              </div>
                              <div v-if="count_chats > 0" class="_flex_ de-con-icon-sent-remove-chat">
                                  <div @click="send_message('','resume')" class="p-0 text-center de_col_div_border_right cur_sur">
                                      <i class="fas fa-paper-plane text-center de_size_of_icon de_display_table"></i>
                                  </div>
                                  <div @click="remove_post" class="p-0 text-center de_col_div_border_left cur_sur">
                                      <i class="fa fa-times text-center text-danger font_23 de_display_table"></i>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <!-- chat -->
                      <div v-show="show_cancel_voice" :class="isDesktop ? 'des_container' : ''">
                          <div class="de-flex-con-bottom-nav" :class="isDesktop ? 'dt_border' : ''">
                              <div class="de-icon-sent-chat p-0 text-center de_size_of_icon cur_sur" v-if="show_hide_more_mess" @click="show_option_mess_sent('hide')"><span class="fas fa-times-circle mt-3"></span></div>
                              <div class="de-icon-sent-chat p-0 text-center de_size_of_icon cur_sur" v-else @click="show_option_mess_sent('show')"><span class="fas fa-plus-circle mt-3"></span></div>
                              <template v-if="hide_show_map">
                                  <div class="de-icon-sent-chat p-0 text-center de_size_of_icon cur_sur" v-show="show_field_op_chat === 'show'" @click="show_location"><span class="fas fa-map-marker-alt mt-3"></span></div>
                              </template>
                              <div class="de-icon-sent-chat p-0 text-center de_size_of_icon cur_sur" v-show="show_field_op_chat === 'show'" id="browse_3"><span class="far fa-file-image mt-3"></span></div>
                              <div class="col de_pad_input_sent">
                                  <input type="text" @input="checkTextExist($event)" v-on:keyup="keymonitor" v-model="message" autocomplete="off" maxlength="255" id="_message_" ref="searchbar"
                                         @focus="check_focus" contenteditable :placeholder="$t('new_text_3.chat_message')" class="form-control de_field_message">
                              </div>

                              <template v-if="hide_show_voice">
                                  <div v-show="show_field_op_chat === 'hide'">
                                      <div v-if="loading_sent_chat" class="de_loading_width">
                                          <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="de_loading_sent_chat">
                                      </div>
                                      <div v-else class="text-center de_size_of_icon de_pad_btn_sent cur_sur" @click="send_message('','')">
                                          <span class="ion-android-send font_32"></span>
                                      </div>
                                  </div>
                                  <div class="de-icon-sent-chat p-0 text-center de_size_of_icon cur_sur" v-show="show_field_op_chat === 'show'"  @click="start_voice">
                                      <span class="fas fa-microphone mt-3"></span>
                                  </div>
                              </template>
                              <template v-else>
                                  <div class="text-center de_size_of_icon de_pad_btn_sent" @click="send_message('','')">
                                      <span class="ion-android-send font_32"></span>
                                  </div>
                              </template>
                          </div>
                      </div>

                      <!-- Nav bottom for record voice -->
                      <div v-if="!show_cancel_voice" class="de-record-voice-nav">
                          <div @click="clear_voice" class="de-r-v-btn-remove cur_sur"><span class="far fa-trash-alt mt-3 text-danger"></span></div>
                          <div class="col de-r-v-minute"><p id="status"></p></div>
                          <div @click="stop_voice" class="de-r-v-btn-stop cur_sur">
                              <div>
                                  <span class="ion-android-send font_32 mt-3 blink_record"></span>
                              </div>
                          </div>
                      </div>

                      <!-- more tool option chats -->
                      <div v-show="show_hide_more_mess" :class="isDesktop ? 'des_container' : ''">
                          <div class="de-con-opt-sent">
                              <div v-if="hide_show_map" @click="show_location" class="cur_sur mb-3">
                                  <span class="fas fa-map-marker-alt de-icon"></span>
                                  <p> {{ $t('new_text.location') }} </p>
                              </div>
                              <!-- <div id="browse_1" class="cur_sur mb-3">
                                  <span class="far fa-file-image de-icon"></span>
                                  <p> {{ $t('lng.photo') }} </p>
                              </div> -->
                              <div @click="show_brows(file='img')" class="cur_sur mb-3">
                                  <span class="far fa-file-image de-icon"></span>
                                  <p> {{ $t('lng.photo') }} </p>
                              </div>
                              <div class="img" hidden>
                                <a id="browse_1" href="javascript:void (0)" rel="nofollow" aria-label="Brows"></a>
                              </div>
                              <div @click="show_listing_quick_chat" class="cur_sur mb-3">
                                  <span class="fas icon-chat de-icon"></span>
                                  <p> {{ $t('new_text.quick_chat') }} </p>
                              </div>
                              <div v-if="hide_show_business_card" @click="show_business_card" class="cur_sur mb-3">
                                  <!-- <span class="fas fa-id-card de-icon"></span> -->
                                  <span class="fas fa-id-card-alt de-icon"></span>
                                  <p> {{ $t('new_text.business_card') }} </p>
                              </div>
                              <!-- <div id="attach_file" class="cur_sur mb-3">
                                  <span class="fas fa-paperclip de-icon"></span>
                                  <p> {{ $t('new_text.attach_file') }} </p>
                              </div> -->
                              <div @click="show_brows(file='att')" class="cur_sur mb-3">
                                  <span class="fas fa-paperclip de-icon"></span>
                                  <p> {{ $t('new_text.attach_file') }} </p>
                              </div>
                              <div class="att_file" hidden>
                                <a id="attach_file" href="javascript:void (0)" rel="nofollow" aria-label="Brows"></a>
                              </div>
                              
                              <div  @click="click_to_resume" class="cur_sur mb-3">
                                  <span class="fas fa-address-card de-icon"></span>
                                  <p> {{ $t('resume_cv.resume') }} </p>
                              </div>
                              <div  @click="click_to_address" class="cur_sur mb-3">
                                    <span class="fas fa-truck de-icon"></span>
                                    <p class="text_truncate">{{ language=== 'km' ? 'អាស័យដ្ឋាន' : 'Shipping / billing Address' }}</p>
                              </div>
                              <div @click="show_listing_user_post_ads" class="cur_sur mb-3">
                                  <template v-if="d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'sell'">
                                      <div class="de-con-img"> <!-- My Ads -->
                                          <img :src="user_data && user_data.user && user_data.user.photo && user_data.user.photo.medium ? user_data.user.photo.medium.url: empty_img_user"
                                               :alt="user_data.user && user_data.user.name ? user_data.user.name : ''">
                                      </div>
                                      <p class="de-mg-static"> My ads </p>
                                  </template>
                                  <template v-else>
                                      <div class="de-con-img"> <!-- their Ads -->
                                          <img :src="d_c_user_profile && d_c_user_profile.photo ? d_c_user_profile.photo.medium.url: empty_img_user"
                                               :alt="d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name : ''">
                                      </div>
                                      <p class="de-mg-static"> {{ d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name : '' }}'s ads </p>
                                  </template>
                              </div>
                              <!-- <div  @click="click_to_resume" class="cur_sur">
                                  <span class="fas fa-address-card de-icon"></span>
                                  <p> {{ $t('resume_cv.resume') }} </p>
                              </div> -->
                          </div>
                      </div>
                  </div>
              </div>
              <div :class="chat_block === true ? '' : 'd-none'"> <!-- chat blocked -->
                  <div class="nav de_nav">
                      <div v-if="chat_block === true && chat_enable_unblock === false" class="user_has_block_message">
                          <p>{{ $t('new_text.status_block') }}</p>
                      </div>
                      <template v-else>
                          <div class="col text-center">
                              <p class="cate_font font_15 de_mar_block truncate_wrap">
                                  {{ $t('new_text.unblock_message') }}
                              </p>
                          </div>
                          <div @click="block_chat('unblock')" class="cl_ripple de_width_block cur_sur h-v-mouse">
                              <p class="text-center text-danger font_bold de_mar_p_top"> {{ $t('new_text.unblock_btn') }} </p>
                          </div>
                      </template>
                  </div>
              </div>
          </template>

          <!-- loading full screen -->
          <div v-if="loading_field" class="loading_back_ground">
              <div class="loading_img">
                  <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="de_loading_width loading_bg">
              </div>
          </div>

          <!-- show success message -->
          <div class="toast style_toast d-none" style="z-index: 2000"> <!-- role="alert" data-autohide="false" aria-live="polite" aria-atomic="true" data-delay="6000" -->
              <div class="toast-header header_padding_toast">
                  <strong class="mr-auto style_flex">
                      <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                      <i v-else class="fas fa-exclamation-circle text-danger font_22"></i>
                      <p class="m-0 ml-2"> {{ message_success ? message_success : $t('new_text.status_renew') }} </p>
                  </strong>
                  <button type="button" class="ml-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
          </div>
          <!-- /show success message -->

          <!-- Modal show filter chat -->
          <div class="modal fade style_full_screen" id="modal_action_chat" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                          <div class="option_selected">
                              <div class="modal-body p-0">
                                  <ul id="list-phone-modal" class="list-unstyled list-phone-modal">
                                      <!--<router-link tag="li" :to="{ name : 'contact_page', query: { username: d_c_user_profile && d_c_user_profile.username ? d_c_user_profile.username : '' }}" class="color_reason cl_ripple">-->
                                      <li v-if="d_c_user_profile" class="color_reason cur_sur cl_ripple h-v-mouse" @click="show_contact_page">
                                          <p class="full_field_a_tag m-0"> {{ d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'sell' ? $t('message.contact_buyer') : $t('message.contact_seller') }} </p>
                                      </li>
                                      <!--</router-link>-->
                                      <template v-if="d_c_user_profile && ((parseInt(d_c_user_profile.member_type) === 1 && d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.storeid && parseInt(d_c_detail_chat_topic.post.storeid) === 0) || (!d_c_detail_chat_topic && parseInt(d_c_user_profile.member_type) === 1))">
                                          <li @click="show_safety_tip" class="color_reason cur_sur cl_ripple h-v-mouse">
                                              <p class="full_field_a_tag m-0"> {{ $t('message.safe_tips') }} </p>
                                          </li>
                                      </template>
                                      <li v-if="chat_block === false && ((d_c_detail_chat_topic && d_c_detail_chat_topic.type !== 'chat') || !d_c_detail_chat_topic)" class="color_reason cur_sur cl_ripple h-v-mouse">
                                          <p v-if="hide_show_text_chat" @click="hide_show_message('hide')" class="full_field_a_tag m-0"> {{ $t('message.hide_chat_template') }} </p>
                                          <p v-else @click="hide_show_message('show')" class="full_field_a_tag m-0"> {{ $t('message.show_chat_template') }} </p>
                                      </li>
                                      <li v-if="(chat_block === true && (chat_enable_unblock === true || chat_enable_unblock === '')) || chat_block === false" class="color_reason cur_sur cl_ripple h-v-mouse">
                                          <p @click="block_chat(chat_block ? 'unblock' : 'block')" class="full_field_a_tag m-0"> {{ chat_block ? $t('new_text.unblock_btn') : $t('message.block') }} </p>
                                      </li>
                                      <li @click="delete_chat" class="color_reason cur_sur cl_ripple h-v-mouse">
                                          <p class="full_field_a_tag m-0"> {{ $t('message.delete') }} </p>
                                      </li>
                                      <li @click="report_on_user_or_store('next_page')" class="color_reason cur_sur cl_ripple h-v-mouse">
                                          <p class="full_field_a_tag m-0 bor_bot_unset"> {{ $t('message.report_this_post') }} {{ d_c_user_profile && d_c_user_profile.username ? d_c_user_profile.username : '' }} </p>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <div class="a_cancel_btn_modal_bg cur_sur">
                              <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                  <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show delete reason post -->

          <!-- Modal show option delete chat -->
          <div class="modal fade style_full_screen" id="modal_option_chat" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                          <div class="option_selected">
                              <div class="modal-body p-0">
                                  <ul class="list-unstyled list-phone-modal">
                                      <li v-if="message_type === 'post' || message_type === 'map' || message_type === 'file' 
                                      || message_type === 'photos' || message_type === 'photo'" @click="view_message(message_type)" class="color_reason cur_sur cl_ripple">
                                          <p class="full_field_a_tag m-0"> {{ $t('message.the_view') }} </p>
                                      </li>
                                      <li v-if="message_type === 'text'" @click="copy_message(text_message)" class="color_reason cur_sur cl_ripple">
                                          <p class="full_field_a_tag m-0" :class="detail_message.folder === 'inbox' ? 'bor_bot_unset' : ''"> {{ $t('new_text_1.copy') }} </p>
                                          <div class="h-c-parent">
                                              <input id="clone_Message" v-on:focus="$event.target.select()" ref="cloneMessage" readonly :value="text_message" class="hide_copy_text"/>
                                          </div>
                                      </li>
                                      <li v-if="detail_message.folder === 'send'" @click="confirm_delete" class="color_reason cur_sur cl_ripple">
                                          <p class="full_field_a_tag m-0 bor_bot_unset text-danger"> {{ $t('message.delete') }} </p>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <div class="a_cancel_btn_modal_bg cur_sur">
                              <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                  <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- modal confirm delete -->
          <div class="modal class_modal_show_message" id="modal_confirm_delete_message" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                  <div class="modal-content max_width_form">
                      <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text_2.delete_permanently') }} </div>
                      <div class="modal-footer u_safety_footer">
                          <button class="btn text_grey cl_ripple" data-bs-dismiss="modal" aria-label="Close"> {{ $t('message.close') }} </button>
                          <button @click="delete_message" class="btn parent_color cl_ripple"> {{ $t('new_text_1.confirm') }} </button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show option delete chat -->

          <!-- Modal show safety tips -->
          <div class="modal toast_z_index u_safety_bg" id="modal_show_safety_tip" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content click_background_warning">
                      <div class="modal-body break_word_ show_text_status p-3">
                          <div class="text_padding_detail mb-2 style_border_detail de_style_warning">
                              <div class="align_div_center">
                                  <div class="de_title_warning">
                                      <img v-bind:src="asset_url+version_library+'img/warranty.png'" alt="warning" class="icon de_img_warning">
                                      ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                                  </div>
                              </div>
                              <div class="de_margin_left_detail">
                                  <span class="text_description_detail position_absolute de_span_safety">1. </span>
                                  <div class="text-dark de_font_size_detail">
                                      <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                                  </div>
                              </div>
                              <div class="de_margin_left_detail">
                                  <span class="text_description_detail position_absolute de_span_safety">2. </span>
                                  <div class="text-dark de_font_size_detail">
                                      <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                                  </div>
                              </div>
                              <div class="de_margin_left_detail">
                                  <span class="text_description_detail position_absolute de_span_safety">3. </span>
                                  <div class="text-dark de_font_size_detail">
                                      <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                                  </div>
                              </div>
                              <div class="de_margin_left_detail">
                                  <span class="text_description_detail position_absolute de_span_safety">4. </span>
                                  <div class="text-dark de_font_size_detail">
                                      <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="modal-footer u_safety_footer">
                          <button type="button" data-bs-dismiss="modal" class="btn parent_color cl_ripple font_14"> {{ $t('message.close') }} </button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show safety tips -->

          <!-- show confirm block or unblock -->
          <div class="modal class_modal_show_message" id="modal_confirm_block_or_unblock" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                  <div class="modal-content max_width_form">
                      <div class="modal-body break_word_ show_text_status p-3"> {{ chat_block ? $t('new_text.unblock') : $t('new_text.block_text') }} </div>
                      <div class="modal-footer u_safety_footer">
                          <button type="button" @click="click_confirm_block" class="btn text-primary text-danger cl_ripple"> {{ chat_block ? $t('new_text.unblock_btn') : $t('message.block') }} </button>
                          <button type="button" data-bs-dismiss="modal" class="btn parent_color cl_ripple"> {{ $t('message.cancel') }} </button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /show confirm block or unblock -->

          <!-- show confirm delete -->
          <div class="modal class_modal_show_message" id="modal_confirm_delete" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style max_width_ mg_center from_top" role="document">
                  <div class="modal-content max_width_form">
                      <div class="modal-body break_word_ show_text_status p-3"> {{ $t('new_text.text_delete') }} </div>
                      <div class="modal-footer u_safety_footer">
                          <button type="button" @click="click_confirm_delete" class="btn text-primary text-danger cl_ripple"> {{ $t('message.delete') }} </button>
                          <button type="button" data-bs-dismiss="modal" class="btn parent_color cl_ripple"> {{ $t('message.cancel') }} </button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /show confirm delete -->

          <!-- modal show contact page -->
          <div class="modal style_full_screen overflow_auto" :class="isDesktop ? 'dt_dialog_contact' : ''"
               id="show_modal_detail" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
              <div class="modal-dialog modal_dialog_style bg-white" role="document">
                  <div class="modal-content">

                      <!-- App Bar -->
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                          <div class="_div_nav bg_app_bar_header_ box_shadow_app_bar">
                              <div class="_pad_col_icon">
                                  <button class="btn clear-btn-app-bar" data-bs-dismiss="modal" aria-label="Close">
                                      <i class="icon-clear font_click_back"></i>
                                  </button>
                              </div>
                              <div class="col pl-1 l_h_con_title">
                                  <p class="name_style truncate_wrap mb-0 text-white"> {{ $t('message.contact') }} </p>
                              </div>
                          </div>
                      </div>
                      <!-- /App Bar -->

                      <!-- Profile User -->
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="!isDesktop ? 'dk_m_50' : ''">
                          <div class="bg_parent_color">
                              <div class="de_pad_info_store">
                                  <div @click="show_detail_user_post(d_c_user_profile.username)" class="p-0 cl_ripple cur_sur">
                                      <div class="width_div height_div position_relative">
                                          <img v-bind:src="d_c_user_profile && d_c_user_profile.photo ? d_c_user_profile.photo.large.url : empty_img_user"
                                               :alt="d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name : ''" class="c_p_img_user_contact bg_reload_img_white mt-1" @error="imageUrlAlt_profile">
                                          <div v-if="d_c_user_profile && d_c_user_profile.online_status.is_active" class="de_badge_online"></div>
                                      </div>
                                  </div>
                                  <div @click="show_detail_user_post(d_c_user_profile.username)" class="col c_p_pad_title cl_ripple cur_sur">
                                      <p class="truncate_wrap font_18 mb-0 text-white font_text_bold">
                                          {{ d_c_user_profile ? d_c_user_profile.name : '' }}
                                          <i v-if="d_c_user_profile && d_c_user_profile.is_verify" class="icon-check verify_icon_big text-white"></i>
                                      </p>
                                      <p class="truncate_wrap font_13 text_big_light m-0 text-white">
                                          {{ d_c_user_profile && d_c_user_profile.online_status ? d_c_user_profile.online_status.last_active : '' }}
                                      </p>
                                  </div>
                                  <div v-if="d_c_user_profile && d_c_user_profile.contact && d_c_user_profile.contact.phone" @click="dialog_phone_number('call')" class="middle_item cl_ripple cur_sur icon-call-right cur_sur">
                                      <!--<p class="m-0 de_pad_status text-danger font_14 font_bold"> ដោះប្លុក </p>-->
                                      <i class="ion-android-call font_32 text-white"></i>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <!-- Content Tab -->
                      <div class="tab-content">
                          <div class="de-bg-tab-contact">
                              <div v-if="d_c_user_profile && d_c_user_profile.username" class="form-group border_bottom_solid c-p-div-contact-infor">
                                  <small class="form-text text_grey font_13">{{ $t('message.username') }}</small>
                                  <p class="recent_history m-0">{{ d_c_user_profile.username }}</p>
                              </div>
                              <div v-if="d_c_user_profile && d_c_user_profile.contact && d_c_user_profile.contact.phone" class="form-group border_bottom_solid c-p-div-contact-infor">
                                  <small class="form-text text_grey font_13">{{ $t('message.phone') }}</small>
                                  <p class="recent_history m-0">
                                      <!--{{ d_c_user_profile.contact.phone.join(" , ") }}-->
                                      <template v-for="p_num in d_c_user_profile.contact.phone" :key="p_num">
                                          <a rel="nofollow" @click="tracking_manual('call')" class="parent_color cur_sur" v-if="show_phone_number" v-bind:href="'tel:'+p_num">{{ p_num }} &nbsp;&nbsp;</a>
                                          <a rel="nofollow" class="parent_color cur_sur" v-else @click="click_display_full_P_N">{{ display_P_N(p_num) }} &nbsp;&nbsp;</a>
                                      </template>
                                  </p>
                              </div>
                              <div v-if="d_c_user_profile && d_c_user_profile.contact && d_c_user_profile.contact.email" class="form-group border_bottom_solid c-p-div-contact-infor">
                                  <small class="form-text text_grey font_13">{{ $t('lng.email') }}</small>
                                  <a rel="nofollow" @click="tracking_manual('mail')" v-bind:href="'mailto:'+d_c_user_profile.contact.email" class="recent_history m-0 parent_color">{{ d_c_user_profile.contact.email }}</a>
                              </div>
                              <div v-if="d_c_user_profile && d_c_user_profile.link" class="form-group border_bottom_solid c-p-div-contact-infor">
                                  <small class="form-text text_grey font_13">{{ $t('message.website') }}</small><br />
                                  <a rel="nofollow noopener" @click="tracking_manual('link')" v-bind:href="d_c_user_profile.link" target="_blank" class="recent_history m-0 parent_color">{{ d_c_user_profile.link }}</a>
                              </div>
                              <div v-if="d_c_user_profile && d_c_user_profile.contact && d_c_user_profile.contact.address" class="form-group c-p-div-contact-infor">
                                  <small class="form-text text_grey font_13">{{ $t('message.address') }}</small>
                                  <p class="recent_history m-0 break_word_">{{ d_c_user_profile.contact.address }}</p>
                              </div>
                              <div v-if="d_c_user_profile && d_c_user_profile.contact && d_c_user_profile.contact.map" class="form-group c-p-div-contact-infor">
                                  <div class="pb-2 pt-2">
                                      <a rel="nofollow noopener" @click="tracking_manual('map')" v-bind:href="'https://maps.google.com/maps?q='+d_c_user_profile.contact.map.x+','+d_c_user_profile.contact.map.y+'&'+d_c_user_profile.contact.map.z" target="_blank" class="btn form-control btn_show_map"><b>
                                          <i class="fas fa-map-marked-alt"></i>&nbsp;&nbsp; {{ $t('message.show_map') }}</b>
                                      </a>
                                  </div>
                              </div>
                          </div>
                          <br><br><br>
                          <!-- bottom navigation -->
                          <div v-if="d_c_user_profile && d_c_user_profile.contact && d_c_user_profile.contact.phone" class="nav de_nav px-3">
                              <div class="col pr-1 pt-2">
                                  <button @click="dialog_phone_number('sms')" class="btn form-control btn_sms custom_btn_ bg_parent_color text-white" id="btn_sms"><i class="fa fa-envelope font_18 mr-1" aria-hidden="true"></i>  {{ $t('message.sms') }} </button>
                              </div>
                              <div class="col pl-1 pt-2">
                                  <button @click="dialog_phone_number('call')" class="btn form-control btn_call custom_btn_ bg_parent_color text-white" id="btn_call"> <i class="fa fa-phone font_17 mr-1" aria-hidden="true"></i> {{ $t('message.call') }} </button>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
          <!-- /modal show contact page -->

          <!-- Modal show phone number -->
          <div class="modal fade style_full_screen u_safety_bg" id="modal_show_phone_or_sms" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="modal_bottom_screen" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- show warning only for normal user -->
                          <template v-if="d_c_user_profile && ((parseInt(d_c_user_profile.member_type) === 1 && d_c_detail_chat_topic && d_c_detail_chat_topic.post && d_c_detail_chat_topic.post.storeid && parseInt(d_c_detail_chat_topic.post.storeid) === 0) || (!d_c_detail_chat_topic && parseInt(d_c_user_profile.member_type) === 1))">
                              <div class="option-phone-warning">
                                  <div class="option-1">
                                      <span class="fas fa-exclamation-circle"></span>
                                      <div>
                                          <p class="war-title-km">សូមពិនិត្យទំនិញ មុនពេលបង់ប្រាក់!</p>
                                          <p class="war-title-en">Please check the good before payment!</p>
                                      </div>
                                  </div>
                                  <div class="option-2 cur_sur" data-toggle="modal" data-target="#modal_show_safety_tip">
                                      <p>
                                          {{ $t('message.view_more') }}
                                          <i class="ion-ios-arrow-forward"></i>
                                      </p>
                                  </div>
                              </div>
                          </template>
                          <!-- show phone numbers -->
                          <div class="option_selected">
                              <div class="border_bottom u_show_ph_number">
                                  <p id="label_phone_or_sms" class="modal-title font_13">
                                      {{ sms_or_call === 'call' ? $t('message.call') : $t('message.sms') }}
                                  </p>
                              </div>
                              <div v-if="d_c_user_profile && d_c_user_profile.contact" class="modal-body p-0">
                                  <ul class="list-unstyled list-phone-modal">
                                      <template v-if="d_c_user_profile.contact.phone_white_operator && d_c_user_profile.contact.phone_white_operator.length > 0">
                                          <li v-for="p_n in d_c_user_profile.contact.phone_white_operator" :key="p_n" class="cl_ripple">
                                              <a rel="nofollow" class="full_field_a_tag border_top color_reason cur_sur flex_imp" :href="sms_or_call === 'call' ? 'tel:'+p_n.phone : 'sms:'+p_n.phone">
                                                  <div class="col _flex_ p-0 mt-1">
                                                      <img :src="p_n.icon" alt="icon" class="img_p_n">
                                                      <p class="u_show_ph_mg">{{ p_n.phone }}</p>
                                                  </div>
                                                  <div class="col-2 p-0 text-right">
                                                      <i aria-hidden="true" :class="sms_or_call === 'call' ? 'fa fa-phone call_icon_modal' : 'fa fa-envelope call_icon_modal'"></i>
                                                  </div>
                                              </a>
                                          </li>
                                      </template>
                                  </ul>
                              </div>
                          </div>
                          <div class="a_cancel_btn_modal_bg cur_sur">
                              <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                  <p class="modal-title color_reason"><b>Cancel</b></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show phone number -->

          <!-- Modal show error connection -->
          <div class="modal class_modal_show_status_connection" id="modal_show_status_error_connection" tabindex="-1" role="dialog">
              <div class="modal-dialog max_width_form mg-mo-auto" role="document">
                  <div class="modal-content">
                      <div class="modal-body break_word_ b-s-h-con">
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

          <!-- Modal show google map -->
          <div class="modal fade style_full_screen" id="show_modal_google_map" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- content -->
                          <div class="modal-body map_modal_content chats_map_style">
                              <template v-if="user_data.user && user_data.user.contact && user_data.user.contact.map && user_data.user.contact.map.x">
                                  <div @click="home_location" class="p_icon_my_location_in_map map_icon_home">
                                      <i class="fas fa-home"></i>
                                  </div>
                              </template>
                              <div @click="show_current_location('current_loc')" class="p_icon_my_location_in_map cur_sur">
                                  <i class="icon-target"></i>
                              </div>
                              <div class="btn-map-zoom-con">
                                  <button @click="zoom_in" class="btn btn-zoom-in" type="button" title="Zoom in">+</button>
                                  <button @click="zoom_out" class="btn btn-zoom-out" type="button" title="Zoom Out">-</button>
                              </div>

                              <ClientOnly>
                                  <div id="show_new_map_detail_chat" class="map_new_W_H"></div>
                                  <!--<GMapMap
                                      :center="{ lat: default_lat, lng: default_lng }"
                                      :zoom="default_zoom"
                                      map-type-id="terrain"
                                      style="width: 100%; height: 100%;position: absolute!important;"
                                      :options="{ /* control on map type */
                                          streetViewControl: false, // close icon human.
                                          fullscreenControl: false, // close full screen.

                                          // disableDefaultUI:true,    // close all action icon in google map.
                                      }"
                                      @zoom_changed="change_zoom_map"
                                      @center_changed="change_center_map">
                                  &lt;!&ndash;<GmapMarker
                                      :position="{ lat: lat, lng: lng }"
                                      :clickable="true"
                                      :draggable="true"
                                      @dragend="gMapdragable($event)"
                                  />&ndash;&gt;
                                  </GMapMap>-->
                              </ClientOnly>
                          </div>
                          <!-- button sent map -->
                          <div class="p-2 text-center _flex_ border-top">
                              <div @click="cancel_map" class="col-4 p-0 cur_sur">
                                  <p class="font_16 modal-title p-2 bg_grey mr-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                              </div>
                              <div @click="sent_map" class="col-8 p-0 cur_sur">
                                  <p class="font_16 modal-title p-2 de-btn-message-sent rounded cur_sur"> {{ $t('lng.send') }} </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show google map -->

          <!-- Modal show business card -->
          <div class="modal fade style_full_screen" id="show_modal_business_card" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <div class="de-header-modal-bus-card d-flex justify-content-between align-items-center">
                            <button class="btn text-white">Close</button>
                              <p class="modal-title"> {{ $t('new_text.business_card') }} </p>
                              <button data-bs-dismiss="modal" class="btn">Close</button>
                          </div>
                          <!-- content -->
                          <div class="modal-body de-business-card">
                              <div>
                                  <div class="de-pro-bus-card">
                                      <div class="col-12 p-0">
                                          <div class="style_flex">
                                              <div>
                                                  <img :src="user_data.user && user_data.user.photo ? user_data.user.photo.small.url : empty_img_user"
                                                       class="img_chat_profile" :alt="user_data.user && user_data.user.name ? user_data.user.name : ''" @error="imageUrlAlt_profile">
                                              </div>
                                              <div class="ml-2 width_100">
                                                  <p class="truncate_wrap m-0 font_14">
                                                      {{ b_s_params && b_s_params.data && b_s_params.data.first_name ? b_s_params.data.first_name+' '+b_s_params.data.last_name : (user_data.user && user_data.user.name ? user_data.user.name : '') }}
                                                  </p>
                                                  <p class="truncate_wrap font_13 m-0 c_m_grey"> @{{ user_data.user && user_data.user.username ? user_data.user.username : '' }} </p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="de-con-bus-card">
                                      <!-- company name -->
                                      <div v-if="(!b_s_params && user_data.user.company) || (b_s_params && b_s_params.data && b_s_params.data.company)" class="style_flex">
                                          <i class="fas fa-building c_m_grey margin_text_icon"></i>
                                          <p class="m-0 break_word">{{b_s_params && b_s_params.data && b_s_params.data.company ? b_s_params.data.company : user_data.user.company }}</p>
                                      </div>
                                      <!-- phone number -->
                                      <div class="style_flex">
                                          <template v-if="b_s_params && b_s_params.data && b_s_params.data['phone[0]']">
                                              <i class="fas fa-phone-alt c_m_grey margin_text_icon"></i>
                                              <p class="m-0">
                                                  {{ b_s_params.data['phone[0]'] }}
                                                  {{ b_s_params.data['phone[1]'] ? ',' + b_s_params.data['phone[1]'] : '' }}
                                                  {{ b_s_params.data['phone[2]'] ? ',' + b_s_params.data['phone[2]'] : ''}}
                                              </p>
                                          </template>
                                          <template v-else-if="!b_s_params && user_data.user.contact && user_data.user.contact.phone">
                                              <i class="fas fa-phone-alt c_m_grey margin_text_icon"></i>
                                              <p class="m-0">
                                                  <template v-for="(ph, key, index) in user_data.user.contact.phone" :key="index">
                                                      {{ key > 0 ? ',' : '' }}
                                                      {{ ph }}
                                                  </template>
                                              </p>
                                          </template>
                                          <template v-else>
                                              <i class="fas fa-phone-alt text-danger margin_text_icon "></i>
                                              <p class="m-0 text-danger">{{ $t('lng.required_phone_num') }}</p>
                                          </template>
                                      </div>
                                      <!-- email -->
                                      <div v-if="(!b_s_params && user_data.user.contact && user_data.user.contact.email) || (b_s_params && b_s_params.data && b_s_params.data.email)" class="style_flex break_word">
                                          <i class="fa fa-envelope c_m_grey margin_text_icon"></i>
                                          {{ b_s_params && b_s_params.data && b_s_params.data.email ? b_s_params.data.email : user_data.user.contact.email }}
                                      </div>
                                      <!-- locations -->
                                      <div v-if="b_s_params && b_s_params.data && b_s_params.data.location" class="style_flex">
                                          <i class="fas fa-map-marker-alt c_m_grey margin_text_icon"></i>
                                          <p class="m-0 font_15 break_word">
                                              <template v-if="b_s_params.data.full_location">
                                                  {{ b_s_params.data.full_location.com_name ? b_s_params.data.full_location.com_name+' , ' : '' }}
                                                  {{ b_s_params.data.full_location.dis_name ? b_s_params.data.full_location.dis_name+' , ' : '' }}
                                                  {{ b_s_params.data.full_location.pro_name ? b_s_params.data.full_location.pro_name+' , ' : '' }}
                                              </template>
                                              {{ b_s_params && b_s_params.data && b_s_params.data.address ? b_s_params.data.address : '' }}
                                          </p>
                                      </div>
                                      <div v-else-if="!b_s_params && user_data.user.contact && user_data.user.contact.location" class="style_flex">
                                          <i class="fas fa-map-marker-alt c_m_grey margin_text_icon"></i>
                                          <p class="m-0 font_15 break_word">
                                              {{ user_data.user.contact.commune ? (language === 'km' ? user_data.user.contact.commune.km_name : user_data.user.contact.commune.en_name)+' , ' : '' }}
                                              {{ user_data.user.contact.district ? (language === 'km' ? user_data.user.contact.district.km_name : user_data.user.contact.district.en_name)+' , ' : '' }}
                                              {{ user_data.user.contact.location ? (language === 'km' ? user_data.user.contact.location.km_name : user_data.user.contact.location.en_name)+' , ' : '' }}
                                              {{ user_data.user.contact.address ? user_data.user.contact.address : '' }}
                                          </p>
                                      </div>
                                      <!-- show map -->
                                      <template v-if="b_s_params && b_s_params.data && b_s_params.data['map[x]']">
                                          <div class="de-con-map-chat">
                                              <ClientOnly>
                                                  <div id="show_new_map_detail_chat_static" class="map_disable_show"></div>

                                                  <!--<GMapMap
                                                      :center="{ lat: parseFloat(b_s_params.data['map[x]']), lng: parseFloat(b_s_params.data['map[y]']) }"
                                                      :zoom="parseFloat(b_s_params.data['map[z]'])"
                                                      style="width: 100%; height: 100px;"
                                                      :options="{
                                                          fullscreenControl: false, // close full screen
                                                          zoomControl: false, // close zoom
                                                          mapTypeControl: false,
                                                          draggable: false, // close move mouse
                                                          streetViewControl: false, // close icon human
                                                      }">
                                                      <GMapMarker :position="{ lat: parseFloat(b_s_params.data['map[x]']), lng: parseFloat(b_s_params.data['map[y]']) }" />
                                                  </GMapMap>-->
                                              </ClientOnly>
                                          </div>
                                      </template>
                                      <template v-else-if="(user_data && user_data.user.contact && user_data.user.contact.map)">
                                          <div class="de-con-map-chat">
                                              <ClientOnly>
                                                  <div id="show_new_map_detail_chat_static" class="map_disable_show"></div>

                                                  <!--<GMapMap
                                                      :center="{ lat: parseFloat(user_data.user.contact.map.x), lng: parseFloat(user_data.user.contact.map.y) }"
                                                      :zoom="parseFloat(user_data.user.contact.map.z)"
                                                      style="width: 100%; height: 100px;"
                                                      :options="{
                                                          fullscreenControl: false, // close full screen
                                                          zoomControl: false, // close zoom
                                                          mapTypeControl: false,
                                                          draggable: false, // close move mouse
                                                          streetViewControl: false, // close icon human
                                                      }">
                                                      <GMapMarker :position="{ lat: parseFloat(user_data.user.contact.map.x), lng: parseFloat(user_data.user.contact.map.y) }" />
                                                  </GMapMap>-->
                                              </ClientOnly>
                                          </div>
                                      </template>
                                  </div>
                              </div>
                          </div>
                          <!-- button edit or sent business card -->
                          <div class="de-business-card-footer">
                              <div @click="edit_business_card" class="col-6 p-0 cur_sur">
                                  <p class="de-btn-bus-card de-btn-message-edit cur_sur"> {{ $t('lng.edit') }} </p>
                              </div>
                              <div @click="sent_business_card" class="col-6 p-0 cur_sur" v-if="(!b_s_params && user_data.user.contact && user_data.user.contact.phone) || (b_s_params && b_s_params.data && b_s_params.data['phone[0]'])">
                                  <p class="de-btn-bus-card de-btn-message-sent cur_sur"> {{ $t('lng.send') }} </p>
                              </div>
                              <div class="col-6 p-0 cur_sur" v-else>
                                  <p class="de-btn-bus-card de-btn-message-sent-disable"> {{ $t('lng.send') }} </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show business card -->

          <!-- Modal show listing quick chats -->
          <div class="modal fade style_full_screen" id="show_modal_quick_chat" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- header -->
                          <div class="de-list-quick-chat">
                              <button data-bs-dismiss="modal" aria-label="Close" class="btn ion-ios-arrow-back de-btn-back"></button>
                              <p class="modal-title font_16 width_100"> {{ $t('new_text.quick_chat') }} </p>
                              <button @click="show_add_quick_chats('add')" class="btn fas fa-plus-circle de-btn-plus"></button>
                          </div>
                          <!-- content -->
                          <div class="modal-body de-head-quick_chat">
                              <!-- show empty -->
                              <div v-if="data_q_c.length === 0 && show_empty_q_c_in_list" class="de-empty-quick-chats">
                                  <p>{{ $t('lng.empty_quick_chat') }}</p>
                                  <button @click="show_add_quick_chats('add')" class="btn">{{ $t('lng.add_chat') }}</button>
                              </div>
                              <div v-for="(text, index) of data_q_c" :key="index" class="de-con-quick-chat">
                                  <div>
                                      <div class="de-flex-q-c-title">
                                          <p> {{ text.title ? text.title : '' }} </p> <!-- @click="send_quick_text(text.data)" -->
                                          <i @click.prevent="show_option_pop_up_q_c(text.id)" class="icon-ellipsis-vertical cur_sur"></i>
                                      </div>
                                      <div @click="send_quick_text(text.data)" class="de-align-text cur_sur">
                                          <p class="de-p-q-c-chats"> {{ text.data ? text.data : '' }} </p>
                                      </div>
                                  </div>
                              </div>

                              <ClientOnly>
                                  <VueEternalLoading :load="request_quick_chat" v-model:is-initial="isInitial" margin="800px">
                                      <template #loading>
                                          <div class="text-center mt-4">
                                              <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                          </div>
                                      </template>
                                      <template #error="{ retry }">
                                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
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
                                          <div class="no_more_result n-m-r-mg">
                                              <!--<i class="fa fa-exclamation-circle u_no_result_font"></i>
                                              <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p>-->
                                          </div>
                                      </template>
                                  </VueEternalLoading>
                              </ClientOnly>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show listing quick chats -->

          <!-- Modal show Add or Edit quick chats -->
          <div class="modal fade style_full_screen u_safety_bg" id="show_modal_add_quick_chat" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- header -->
                          <div class="de-list-quick-chat">
                              <button data-bs-dismiss="modal" aria-label="Close" class="btn ion-ios-arrow-back de-btn-back"></button>
                              <p class="modal-title font_16 width_100 mr-4"> {{ $t('new_text.add_quick_chat') }} </p>
                          </div>
                          <!-- content -->
                          <div class="modal-body">
                              <!-- note text -->
                              <div class="mb-3">
                                  <label class="label_style label_left mb-1"> {{ $t('new_text.note') }} <b class="text-danger">*</b> </label>
                                  <input type="text" autocomplete="off" maxlength="255" v-model="data_title_q_c" class="form-control more_border custom_field" name="ad_headline" minlength="5">
                              </div>
                              <div class="form_error_style d-none" id="msg_title"></div>
                              <!-- chat text -->
                              <label class="label_style mb-1"> {{ $t('message.chat') }} <b class="text-danger">*</b> </label>
                              <textarea class="form-control more_border" rows="5" minlength="15" v-model="data_data_q_c" name="description"></textarea>
                              <div class="form_error_style d-none m-0" id="msg_data"></div>
                          </div>
                          <!-- button edit or sent business card -->
                          <div class="de-business-card-footer">
                              <div v-if="id_for_edit_q_c" @click="create_or_edit_q_c('edit', id_for_edit_q_c)" class="col p-0">
                                  <button class="btn de-btn-action"> {{ $t('new_text.save') }} </button>
                              </div>
                              <div v-else @click="create_or_edit_q_c('add', '')" class="col p-0">
                                  <button class="btn de-btn-action"> {{ $t('new_text.save') }} </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show Add or Edit quick chats -->

          <!-- Modal show option quick chats -->
          <div class="modal fade style_full_screen u_safety_bg" id="modal_show_option_quick_chat" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="u_modal_custom_pad" :class="isDesktop ? 'dt_modal_width' : ''">
                          <div class="option_selected">
                              <div class="modal-body p-0">
                                  <ul class="list-unstyled list-phone-modal">
                                      <li @click="show_confirm_delete" class="_flex_ u_pad_option cur_sur">
                                          <div class="col-10 p-2">
                                              <p class="m-0 mt-1 font-15 font_bold">{{ $t('message.delete') }}</p>
                                          </div>
                                          <div class="col-2 p-2 pr-3 text-right"><i class="far fa-trash-alt font_21 mt-1"></i></div>
                                      </li>
                                      <li @click="show_add_quick_chats('edit')" class="_flex_ u_pad_option cur_sur border_top">
                                          <div class="col-10 p-2">
                                              <p class="m-0 mt-1 font-15 font_bold">{{ $t('lng.edit') }}</p>
                                          </div>
                                          <div class="col-2 p-2 pr-3 text-right"><i class="far fa-edit font_21 mt-1"></i></div>
                                      </li>
                                      <li @click="send_quick_text('')" class="_flex_ u_pad_option cur_sur border_top">
                                          <div class="col-10 p-2">
                                              <p class="m-0 mt-1 font-15 font_bold">{{ $t('lng.send') }}</p>
                                          </div>
                                          <div class="col-2 p-2 pr-3 text-right"><i class="far fa-paper-plane font_21 mt-1"></i></div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <div class="a_cancel_btn_modal_bg cur_sur">
                              <div class="cl_ripple a_cancel_btn_modal" data-bs-dismiss="modal" aria-label="Close">
                                  <p class="modal-title color_reason"><b>{{ $t('message.cancel') }}</b></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show option quick chats -->

          <!-- show confirm delete quick chats -->
          <div class="modal toast_z_index u_safety_bg" id="modal_confirm_delete_quick_chat" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content de-modal-confirm-delete" :class="isDesktop ? 'dt_modal_width' : ''">
                      <div class="modal-body break_word_ show_text_status p-3">
                          <h5> {{ $t('lng.are_u_sure') }} </h5>
                          <p class="m-0 font_15">{{ $t('lng.u_w_remove') }} <b>{{ title_confirm_delete }}</b> {{ $t('lng.u_w_list') }}</p>
                      </div>
                      <div class="modal-footer u_safety_footer">
                          <button type="button" @click="delete_quick_chat" class="btn parent_color"> {{ $t('lng.yes_i_do') }} </button>
                          <button type="button" data-bs-dismiss="modal" class="btn text_grey"> {{ $t('lng.no_i_dont') }} </button>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /show confirm delete quick chats -->

          <!-- Modal show detail quick chat text -->
          <div class="modal fade style_full_screen" id="show_modal_detail_quick_chat" tabindex="-1" role="dialog" style="z-index: 1049;">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- header -->
                          <div class="de-list-quick-chat">
                              <button data-bs-dismiss="modal" aria-label="Close" class="btn ion-ios-arrow-back de-btn-back"></button>
                              <p class="modal-title font_16 width_100 mr-4"> {{ $t('lng.q_c_detail') }} </p>
                          </div>
                          <!-- content -->
                          <div class="modal-body de-con-detail-quick-chat">
                              <p>{{ s_detail_text_quick_chat }}</p>
                          </div>
                          <!-- button edit or sent detail quick chat text -->
                          <div class="de-business-card-footer">
                              <div class="col-6 p-0 cur_sur">
                                  <p @click="show_add_quick_chats('edit')" class="de-btn-bus-card de-btn-message-edit"> {{ $t('lng.edit') }} </p>
                              </div>
                              <div class="col-6 p-0 cur_sur">
                                  <p @click="send_quick_text('')" class="de-btn-bus-card de-btn-message-sent"> {{ $t('lng.send') }} </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show detail quick chat text -->

          <!-- Modal show listing ads user -->
          <div class="modal fade style_full_screen" id="show_modal_post_ads_user" tabindex="-1" role="dialog" aria-hidden="true" >
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- header -->
                          <div class="de-my-ads-con">
                              <div class="de-my-ads-header">
                                  <button data-bs-dismiss="modal" aria-label="Close" class="btn ion-ios-arrow-back de-btn-back"></button>
                                  <!--<p> {{ $t('new_text_1.my_ads') }} </p>-->
                                  <p> {{ d_c_detail_chat_topic && d_c_detail_chat_topic.type === 'sell' ? 'My Ads' : (d_c_user_profile && d_c_user_profile.name ? d_c_user_profile.name+"'s ads" : '') }} </p>
                              </div>

                              <div class="de-my-ads-search input-group a_border_box_search">
                                  <input type="text" autocomplete="off" maxlength="255" v-on:keyup="keymonitor_search_ads" v-model="search_post" ref="search_post_ads" id="search_post_ads" placeholder="Search..." class="form-control p-1">
                                  <div class="input-group-append group_field_search_box">
                                      <button type="button" @click="click_search_post('focus')" class="btn"><i class="ion-android-search"></i></button>
                                  </div>
                              </div>
                          </div>
                          <!-- content -->
                          <div class="modal-body de-head-quick_chat bg_c_light_">
                              <div class="flex_all_post lists_post_content">
                                  <article v-for="(post, index) of user_post_data" :key="index"  class="col-12 no_padding cur_sur">
                                      <div class="list_items_post">
                                          <div @click="click_detail_post_ads_message(post.data.id)" class="u_border_cart cur_sur">
                                              <div class="_flex_">

                                                  <div v-if="post.data.discount" class="position_absolute type_buy new_st_discount">
                                                      <p class="new_st_dis_price">
                                                          {{ post.data.discount.type === 'percent' ? parseInt(post.data.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post.data.discount.discount)) }}
                                                      </p>
                                                      <p class="new_st_dis_text">OFF</p>
                                                  </div>

                                                  <div class="de-list-contain-img-post-user">
                                                      <img v-bind:src="post.data.thumbnail ? post.data.thumbnail : empty_img_post" :alt="post.data.title" @error="imageUrlAlt_post"
                                                           :class="post.data.category && post.data.category.parent == 2 ? 'u_img_post_by_job bg_reload_img_white' : 'u_img_post_by bg_reload_img_white'">
                                                  </div>
                                                  <div class="col u_p_col_">

                                                      <div class="list_profile_des">
                                                          <p class="l-p-title m-0" v-text="post.data.title ? post.data.title : '...'"></p>
                                                          <p class="truncate_wrap l-p-date-loc">
                                                              {{ post.data.renew_date ? convertFromNow(post.data.renew_date) : convertFromNow(post.data.posted_date) }}
                                                              &#8226;
                                                              {{ post.data.location ? (language === 'km' ? post.data.location.km_name2 : post.data.location.en_name2) : '' }}
                                                          </p>

                                                          <div class="list-price-des">
                                                              <div v-if="post.data.shipping">
                                                                  <i class="fas fa-truck"></i>
                                                                  <p>{{ post.data.shipping.title }}</p>
                                                              </div>

                                                              <p v-if="post.data.price" class="truncate">
                                                                  <strong>
                                                                      {{ post.data.price > 0 ? (1 > parseInt(post.data.price) ? '$'+post.data.price : '$'+convert_price(post.data.price)) : '' }}{{
                                                                      post.data.price > 0 ? (post.data.category && post.data.category.parent == 2 ? '+' : '') : '' }}
                                                                  </strong>
                                                                  <span v-if="post.data.discount" class="line_price"> ${{ convert_price(post.data.discount.original_price) }} </span>
                                                              </p>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </article>
                              </div>

                              <ClientOnly>
                                  <VueEternalLoading :load="request_user_post_ads" v-model:is-initial="isInitial" margin="800px">
                                      <template #loading>
                                          <div class="text-center mt-4">
                                              <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                          </div>
                                      </template>
                                      <template #error="{ retry }">
                                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding">
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
                                          <div class="mt-5">
                                              <p class="no_more_result"> {{ $t('message.no_result') }} </p>
                                          </div>
                                      </template>
                                  </VueEternalLoading>
                              </ClientOnly>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show listing ads user -->

          <!-- Modal show message detail post ads -->
          <div class="modal fade style_full_screen toast_z_index u_safety_bg" id="show_modal_detail_post_ads_message" tabindex="-1" role="dialog" >
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content overflow_class" :class="isDesktop ? 'dt_modal_width' : ''">
                          <!-- header -->
                          <div class="de-list-quick-chat">
                              <button data-bs-dismiss="modal" aria-label="Close" class="btn ion-ios-arrow-back de-btn-back"></button>
                              <p class="modal-title font_16 width_100 mr-4"> {{ $t('lng.detail_post') }} </p>
                          </div>
                          <!-- content -->
                          <div class="modal-body p-2">
                              <div>
                                  <div class="de-post-ads-body">

                                      <a rel="nofollow" class="_flex_">
                                          <div v-if="post_ads_detail.discount" class="position_absolute type_buy new_st_discount">
                                              <p class="new_st_dis_price">
                                                  {{ post_ads_detail.discount.type === 'percent' ? parseInt(post_ads_detail.discount.discount)+'%' : '$'+convert_price_to_k(parseInt(post_ads_detail.discount.discount)) }}
                                              </p>
                                              <p class="new_st_dis_text">OFF</p>
                                          </div>

                                          <div class="de-list-contain-img-post-user">
                                              <img v-bind:src="post_ads_detail.thumbnail ? post_ads_detail.thumbnail : empty_img_post" :alt="post_ads_detail.title" @error="imageUrlAlt_post"
                                                   :class="post_ads_detail.category && post_ads_detail.category.parent == 2 ? 'u_img_post_by_job bg_reload_img_white' : 'u_img_post_by bg_reload_img_white'">
                                          </div>

                                          <div class="col u_p_col_">

                                              <div class="list_profile_des">
                                                  <p class="l-p-title m-0" v-text="post_ads_detail.title ? post_ads_detail.title : '...'"></p>
                                                  <p class="truncate_wrap l-p-date-loc">
                                                      {{ post_ads_detail.renew_date ? convertFromNow(post_ads_detail.renew_date) : convertFromNow(post_ads_detail.posted_date) }}
                                                      &#8226;
                                                      {{ post_ads_detail.location ? (language === 'km' ? post_ads_detail.location.km_name : post_ads_detail.location.en_name) : '' }}
                                                  </p>

                                                  <div class="list-price-des">
                                                      <div v-if="post_ads_detail.shipping">
                                                          <i class="fas fa-truck"></i>
                                                          <p>{{ post_ads_detail.shipping.title }}</p>
                                                      </div>

                                                      <p v-if="post_ads_detail.price" class="truncate">
                                                          <strong>
                                                              {{ post_ads_detail.price > 0 ? (1 > parseInt(post_ads_detail.price) ? '$'+post_ads_detail.price : '$'+convert_price(post_ads_detail.price)) : '' }}{{
                                                              post_ads_detail.price > 0 ? (post_ads_detail.category && post_ads_detail.category.parent == 2 ? '+' : '') : '' }}
                                                          </strong>
                                                          <span v-if="post_ads_detail.discount" class="line_price"> ${{ convert_price(post_ads_detail.discount.original_price) }} </span>
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      </a>
                                  </div>
                              </div>
                          </div>
                          <!-- button edit or sent post ads of user -->
                          <div class="de-business-card-footer p-2" style="display: block!important;">
                              <!-- add description -->
                              <textarea v-model="p_d_a_text" rows="5" minlength="15" name="description" class="form-control more_border mb-2" autocomplete="off" :placeholder="$t('new_text_3.chat_message')"></textarea>
                              <!-- btn sent -->
                              <div class="col p-0">
                                  <button @click="click_sent_post(post_ads_detail.thumbnail ? post_ads_detail.thumbnail : '', post_ads_detail.title ? post_ads_detail.title : '...', post_ads_detail.price ? post_ads_detail.price : '')"
                                          class="btn de-btn-action">{{ $t('message.send') }}</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal show message detail post ads -->

          <!-- Modal report user or store -->
          <div class="modal fade style_full_screen" id="show_modal_list_report_user_or_store" tabindex="-1" role="dialog">
              <div class="modal-dialog modal_dialog_style" role="document">
                  <div class="modal-content animate-bottom">
                      <div class="s_content" :class="isDesktop ? 'dt_modal_width' : ''">
                          <div class="text-center border_bottom u_rep_pad">
                              <p class="modal-title font_15"> {{ $t('message.report_this_post') }} </p>
                          </div>
                          <div class="modal-body p-0 overflow_content">
                              <ul class="list-unstyled bg-white">
                                  <li @click="choose_report(re.value)" v-for="re in report_user_or_store.data" :key="re" class="full_field_tag h-v-mouse cur_sur">
                                      {{ language === 'km' ? re.km : re.en }}
                                      <i v-if="re.value === report_check" class="fas fa-check color_sub_icon mt-1 float-right c_orange"></i>
                                  </li>
                              </ul>
                              <div class="u_rep_pad_sub">
                                  <textarea v-model="description" rows="4" id="description" :placeholder="$t('new_text_1.description')" class="form-control"></textarea>
                                  <label id="error_description" class="text-danger font_14 ml-2 d-none">{{ $t('validation.error_description') }}</label>
                              </div>
                          </div>
                          <!-- button submit report -->
                          <div class="p-2 text-center _flex_ border-top">
                              <div @click="close_report_modal" class="col-4 p-0">
                                  <p class="font_16 modal-title p-2 bg_grey mr-2 rounded cur_sur"> {{ $t('message.cancel') }} </p>
                              </div>
                              <div v-if="((report_check && report_check !== 'other') || (report_check === 'other' && description))" @click="report_submit" class="col-8 p-0">
                                  <p class="font_16 modal-title p-2 bg_orange text-white rounded cur_sur"> {{ $t('message.submit') }} </p>
                              </div>
                              <div v-else @click="show_required_report" class="col-8 p-0">
                                  <p class="font_16 modal-title p-2 text-white bg_orange_light rounded cur_sur"> {{ $t('message.submit') }} </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Modal report user or store -->
      </template>
  </div>

  <!-- show detail resume user -->
  <div class="modal style_full_screen" id="show_modal_detail_resume" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true" style="background-color: #E0E0E0;"> <!-- fade -->
      <div class="modal-dialog modal_dialog_style" :class="isDesktop ? '' : 'bg-white'" role="document">
        <div class="modal-content" style="background-color: #E0E0E0;">
          <div  class="mb-5">
            <resume :pageType="'chat_send_resume'"/> 
          </div>
          <!-- App Bar -->
          <div class="no_padding" :class="isDesktop ? 'col' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12 fix_app_bar'">
            <div class="_div_nav bg_app_bar_header_">
              <div class="_pad_col_icon"  @click="clearData" data-bs-dismiss="modal" aria-label="Close">
                <button class="btn clear-btn-app-bar" aria-label="back">
                  <i class="icon-clear font_click_back"></i>
                </button>
              </div>
              <div class="col l_h_con_title p-0 ml-2">
                <p class="m-0 name_style truncate_wrap"> {{ $t('resume_cv.resume') }} </p>
              </div>
            </div>
          </div>
          
          <div v-if="auth_user.user.id !== user_id">
            <div class="nav nav_desktop" v-if="GetAll.personal_details && ( GetAll.personal_details.email || GetAll.personal_details.phone )">
                <div class="col pr-1 pl-2 pt-2" v-if="GetAll.personal_details.email">
                  <a rel="nofollow" aria-label="email" v-bind:href="'mailto:'+GetAll.personal_details.email"  class="btn form-control btn_sms btn-lg bg_parent_color text-white" id="btn_sms">
                    <i aria-hidden="true" class="fa fa-envelope font_22 mr-1"></i>
                  </a>
                </div>
                <div class="col pl-2 pr-1 pt-2" v-if="GetAll.personal_details.phone">
                  <button @click="clicPhone" type="button" class="btn form-control btn_call btn-lg bg_parent_color text-white" id="btn_call" aria-label="phone">
                    <i aria-hidden="true" class="fa fa-phone font_21 mr-1"></i>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div v-if="ShowPhone" >
    <div  class="loading_back_ground" @click="clicClose">
      <div style="position:fixed;bottom:60px;width:100%" >
        <div class="option_selected" style="bottom: 0px;">
          <div class="border_bottom u_show_ph_number">
            <p id="label_phone_or_sms" class="modal-title font_13">
              {{ $t('message.call') }}
            </p>
          </div>
          <div class="modal-body p-0" v-if="GetAll && GetAll.personal_details ">
            <ul class="list-unstyled list-phone-modal" id="list-phone-modal">
              <li v-for="p_n in GetAll.personal_details.phone" :key="p_n" class="cl_ripple">
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
  const new_map = ref('');
  const new_static_map = ref('');
  /* import nuxt plugin */
  import { VueCookieNext } from 'vue-cookie-next';
  import { event, pageview } from 'vue-gtag';
  import helper from "/helper";
  const isDesktop = helper.check_is_desktop(); // check userAgent
  definePageMeta( {layout: "custom", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
  const { public:config } = useRuntimeConfig();            // setup config env to config variable.
  // const config = runtime_config.public;
  const route = useRoute();
  const router = useRouter();
  const version_library = config.LIBRARY_VERSION;
  const asset_url = '/'; // config.VUE_APP_BASE_URL;
  const empty_img_profile = ref("/icon/user-icon1.png");
  const empty_img_user = ref("/icon/user-icon.png");
  const empty_img_post = ref("/icon/empty_post.png");

  // const cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
  // const language = ref(cookie_lang._rawValue ? cookie_lang._rawValue : 'en');
  const language = ref(helper.get_lang_cookie());
  const localePath = useLocalePath();
  const pa_con = helper.get_params_make_condition(); // get data params condition.
  const det_post = pa_con && pa_con.dt_post && pa_con.dt_post.d_params ? pa_con.dt_post.d_params : ''; // check dt_post from params.

  const user_data = ref('');
  const categories = ref('');

  const loading_field = ref(false);
  const loading_sent_chat = ref(false);
  const hide_show_voice = config.HIDE_SHOW_VOICE;                      // for hide or show voice function and tools.
  const hide_show_map = config.HIDE_SHOW_MAP;                          // for hide or show map function and tools.
  const hide_show_business_card = config.HIDE_SHOW_BUSINESS_CARD;      // for hide or show business function and tools.
  const d_c_conversations = useState('d_c_conversations', () => []); // listing conversations (cache_conversation)
  const d_c_user_profile = useState('d_c_user_profile', () => '');   // detail user (cache_profile)
  const timestamp = useState('timestamp', () => '');          // store timestamp to check clear old data.
  const user_contact = ref([]);                   // array phone numbers of user
  const d_c_detail_chat_topic = useState('d_c_detail_chat_topic', () => ''); // get detail topic chat (cache_chat_topic)
  const prevent_vue_render_first = ref(false);    // prevent vue render first ( must to get data and than render )
  const hide_show_text_chat = ref(true);
  const condition_block_or_unblock = ref('');
  const limit_offset = ref(10);
  const message_success = ref('');
  const error_or_success_message = ref(true);
  const sms_or_call = ref('');
  const arr_check_new_message_is_coming = ref([]); // arr for check new message inbox and add bg color to that message
  const show_hide_more_mess = ref(false);
  const show_field_op_chat = ref('show'); // use for check hide or show field chat button in bottom nav bar.

  const topic_id = ref(route.query.topic_id ? route.query.topic_id : ''); // get from listing chat
  const username = ref(route.query.username ? route.query.username : ''); // get from listing chat
  const to_id = ref(route.query.to_id ? route.query.to_id : '');          // get from detail ads
  const chat_block = ref(false);
  const chat_enable_unblock = ref('');
  // store_axis_top = 0;
  const store_full_screen_height = ref(0);
  const limits = ref(0);         // condition scroll
  const count_chats = ref(0);    // count chats array
  const d_c_last_massage_id = useState('d_c_last_massage_id', () => '');   // store the last message of id chat (cache_last_message_id)

  const isInitial = ref(true); // value for reset scroll loader (true = reset scroll again).

  const message_id = ref('');
  const message_type = ref('');
  const detail_message = ref('');
  const text_message = ref('');

  const message = ref('');
  const old_voice_id = ref('');

  // --- chat template ---
  const chat_buy_template_km = ref(["សួស្តី!", "សួស្តី! តើវានៅមានលក់ឬអត់?", "សួស្តី! ខ្ញុំចង់ទិញវា។", "តើតម្លៃអាចចរចារបានឬទេ?", "ខ្ញុំចាប់អារម្មណ៍!", "តើយើងអាចចរចាទិញតាមរបៀបណា?"]);
  const chat_buy_template_en = ref(["Hi!", "Hi! is still available?", "Hi! I'd like to buy it.", "Is the price negotiable?", "I'm interested!", "How do we deal?"]);
  const chat_sell_template_km = ref(["សួស្តី!", "បាទ/ចាស, វានៅមានលក់", "តើអ្នកអោយតំលៃប៉ុន្មាន?", "សុំទោស! ផលិតផលត្រូវបានលក់ដាក់បាត់ហើយ!", "បាទ! អាចចរចារបាន", "ទេ! មិនអាចចរចារបានទេ"]);
  const chat_sell_template_en = ref(["Hi!", "Yes, it's still for sale", "What's you offer?", "Sorry! the product has been sold!", "Yes, it's negotiable", "No, it's not negotiable"]);

  // --- check sent message ---
  const show_topic_post = ref(det_post && det_post.show_topic_post_id ? true : false); // true have post from detail, false dont have
  const show_topic_resume = ref(det_post && det_post.show_topic_resume_id ? true : false); // true have post from detail, false dont have
  const sendingMessage = ref([]);
  const isSending = ref(false);
  // arr_tmp_id_sending = ref([ /;/ store array tmp_id of chat sending. for request success append data response to that index in chat list.
  const tmp_id = ref(1);              // create tmp_id for store data to specific index in sending chat.

  // --- check auto chat ---
  // top_message_id = ref(' /;/ the last id get from load page the first time and get the biggest id for condition auto request.
  const d_c_arr_check_id = useState('d_c_arr_check_id', () => []); // store for check user sent message and get id for check with auto request to make chat order (cache_arr_check_id).

  // --- timer auto request chat ---
  const d_c_timer_auto_chat = useState('d_c_timer_auto_chat', () => '');

  // --- for prevent delete message and still show old message at position new message ---
  const d_c_first_msg_id = useState('d_c_first_msg_id', () => '');

  const d_c_data_b_s_card = useState('d_c_data_b_s_card', () => '');

  // --- check if own chat ---
  const check_not_own_chat = ref('');

  // --- condition check request (if 401 three time clear auth user) ---
  const reload_q_again_1 = ref(0); const reload_q_again_2 = ref(0); const reload_q_again_9 = ref(0);
  const reload_q_again_3 = ref(0); const reload_q_again_4 = ref(0); const reload_q_again_10 = ref(0);
  const reload_q_again_5 = ref(0); const reload_q_again_6 = ref(0); const reload_q_again_11 = ref(0);
  const reload_q_again_7 = ref(0); const reload_q_again_8 = ref(0); const reload_q_again_12 = ref(0);
  const reload_q_again_13 = ref(0); const reload_q_again_14 = ref(0);

  // --- field google map ---
  const default_lat = ref(0); const default_lng = ref(0); const default_zoom = ref(0); //  11.562108;  104.888535
  const lat = ref(''); const lng = ref(''); const zoom = ref('');
  const is_click_btn_zoom = ref(false); // zoom_in or zoom_out, click button or without click button.

  // --- field quick chat ---
  const data_title_q_c = ref('');
  const data_data_q_c = ref('');
  const data_q_c = ref([]);
  const pageSize_q_c = ref(0);
  const id_for_edit_q_c = ref(''); // id for edit or delete quick chat in listing.
  const arr_validation = ref([]);  // for validation on create or edit quick chat.
  const show_empty_q_c_in_list = ref(false); // for show empty quick chat if data empty in listing.
  const title_confirm_delete = ref(''); // store title to show in modal confirm delete.
  const s_detail_text_quick_chat = ref(''); // store data to show detail in modal check detail "Quick Chat".

  // --- field user post ads ---
  const pageSize_p_ads = ref(0);
  const user_post_data = ref([]);
  const post_ads_detail = ref('');
  const post_ads_id = ref(''); // store post ads id for sent post message.
  const p_d_a_text = ref('');  // store text message chat in modal detail post ads.
  const search_post = ref(''); // store data search in modal listing post ads of user.

  // --- fields recorded voice ---
  const gumStream = ref('');
  const rec = ref('');
  const input = ref('');
  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  const duration = ref(0);
  const timer = ref('');
  const setTimeOut = ref(''); // for clear on setTimeOut.
  const show_cancel_voice = ref(true); // condition for show voice record on nav. (true=hide; false=show)

  // --- fields business_card ---
  const b_s_params = ref([]);
  const locations = ref([]);

  // --- report user or store ---
  const report_user_or_store = ref([]);
  const report_check = ref('');
  const description = ref('');

  // --- regex on phone ---
  const phone_providers = ref([]);
  const phone_prefix = ref([]);
  const phone_prefix_digit_10 = ref([]);

  // --- regex on phone in modal profile ---
  const show_phone_number = ref(false); // show phone number xxx

  // --- photos fields ---
  const image_array = ref([]);        // store tmp array.
  const count_img = ref(0);           // for count image when check upload.
  const create_loading_first = ref(true); // create field loading on photos for the first time when upload to tmp.
  const check_count_uploaded = ref(0);    // this field for check uploaded to tmp completed.
  const store_name_photos = ref([]);      // store name for uploaded to tmp and sent to server.

  // --- value plupload ---
  var attach_uploader = '';
  var img_uploader = '';

  // --- is still upload photos or attach ---
  const is_uploading = ref(true); // true = allow, false = not allow

  // --- meta variable ---
  const meta_title_de_chat = useState('meta_title_de_chat', () => 'My Account - Khmer24.com');
  const isMobile = ref(helper.m_or_d())

  // --- if refresh page in desktop view must redirect to page "chats" ---
  if (process.server && isDesktop) {
      let query = {}
      if (route.query.topic_id) query['topic_id'] = route.query.topic_id;
      if (route.query.to_id) query['to_id'] = route.query.to_id;
      if (route.query.username) query['username'] = route.query.username;
      if (route.query.from) query['from'] = route.query.from;
      router.replace(localePath({ name: 'chats', query: query }));
  }

  useHead({
      title: meta_title_de_chat.value,
      meta: [
          // -- ios --
          // { name: 'apple-mobile-web-app-title', content: meta_title_de_chat.value },
          // -- seo page --
          { name: 'keywords', content: 'Buy, Sell' },
          { name: 'description', content: 'Buy, Sell' },

          { property: 'og:title', content: meta_title_de_chat.value },
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
          // -- check if field value "message" exist in localstorage name "params_con_page" --
          setTimeout(() => {
              let msg = pa_con && pa_con.message && pa_con.message.d_params && pa_con.message.d_params.message ? pa_con.message.d_params.message : '';
              if (msg) {
                  function_toast(msg, true); // show toast message success
                  helper.clear_params_make_con('message'); // remove local params condition
              }
          }, 700);

          check_auth_user();
          categories.value = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
          locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];

          clearInterval(d_c_timer_auto_chat.value); d_c_timer_auto_chat.value = '';
          if (!d_c_timer_auto_chat.value) {
              d_c_timer_auto_chat.value = setInterval(() => { auto_get_chat(); }, 4000); 
          }

          // --- check if click edit from edit profile from page Account ---
          if (det_post && det_post.business_card) { // store business_card data that click from edit profile.
              // store data business card from edit profile page to variable. ( prevent function goBack() clear data in params )
              d_c_data_b_s_card.value = det_post;

              // prevent click back still in the same page, so must to clear by click back
              goBack(); // if success history must to go back 1 state.

              setTimeout(() => { // delay for goBack() complete then run this code
                  d_c_data_b_s_card.value['data'] = d_c_data_b_s_card.value && d_c_data_b_s_card.value.data ? JSON.parse(d_c_data_b_s_card.value.data) : '';
                  b_s_params.value = d_c_data_b_s_card.value; // route.params;

                  if (locations.value.length === 0) get_location(); // get location only province.

                  show_hide_more_mess.value = true;  // show tool options.
                  $('#show_modal_business_card').modal('show'); // show modal business card.
                  // clear static old map and show new static map.
                  $('#show_new_map_detail_chat_static .ol-viewport').remove(); // for removes child from the parent.
                  setTimeout(() => { show_new_static_google_map(); },300);

                  helper.clear_params_make_con('dt_post'); // clear params detail post.
              },500);
          }

          // --- clear old data if direct from login, choose login or anywhere ---
          // check timestamp is empty or timestamp exist but not equal auth timestamp
          if (!timestamp.value || (timestamp.value && timestamp.value !== user_data.value.timestamp)) {
              timestamp.value = user_data.value.timestamp; // add timestamp
              clear_old_conversation(); // clear old data
          }

          // --- check auth user ---
          if (helper.check_auth_user() === false) { // check auth exist or not
              router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
          } else {
              // ---- check is the first ----
              const p_clear = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params ? pa_con.clear_old_data.d_params : '';
              if (p_clear && p_clear.clear_old_data) {
                  helper.clear_params_make_con('clear_old_data'); // clear params condition.
                  clear_old_conversation(); // clear old data conversations.

              } else {
                  // console.log('cache old data');
                  prevent_vue_render_first.value = d_c_conversations.value.length > 0 ? true : false;
              }

              // ---- get profile info ----
              get_profile_info();
              // ---- set time out ripple ----
              // setTimeout(function () { $(".cl_ripple").ripple(); }, 1000);
              // ---- get detail chat topic ----
              get_detail_topic();
              // ---- store position y screen to top (note: function ot work, work only arrow function only) ----
              // window.addEventListener('scroll', e => this.store_axis_top = window.scrollY);
              // console.log(this.store_axis_top);
              // ---- remove class modal-open ----
              helper.remove_class_modal_open();
          }

          // ---- if cache Chat topic exist and type is "Sell". Must to request "Quick Chat" ----
          if (d_c_detail_chat_topic.value.type === "sell") {
              // this.request_quick_chat(); // request to get custom "Quick CHat" if in type "Sell".
              get_quick_chats();
          }

          // ---- ready plupload (prevent content load slow) ----
          setTimeout(() => { ready_function_choose_image(); }, 1500);
          setTimeout(() => { ready_function_choose_attach_file(); }, 2000);

          // -- if text chat from Page DetailPost in screen Desktop --
          const DT_text = pa_con && pa_con.desktop_chat_text && pa_con.desktop_chat_text.d_params ? pa_con.desktop_chat_text.d_params : '';
          if (DT_text && DT_text.text) {
              // console.log(DT_text);
              helper.clear_params_make_con('desktop_chat_text'); // clear params DT text.
              setTimeout(function() {
                  send_message(DT_text.text, 'quick'); // sent message
              },1000);
          }

          // --- Fancybox without hash (not push state history browser) ---
          Fancybox.defaults.Hash = false;
      }
      clear_old_conversation();
  })
  
  watch(() => route.query, () => {
        let r_name = helper.clear_prefix_route_name(route.name); // clean route name without prefix.
        if (r_name === 'detail-chat') {
          if (!img_uploader) { ready_function_choose_image(); }
        }
    });
  

  onBeforeUnmount(() => {
      helper.clear_params_make_con('dt_post');
      clearInterval(d_c_timer_auto_chat.value); d_c_timer_auto_chat.value = ''; // clear auto request
      Fancybox.close(); // prevent user click show image in fancyBbox then click back when fancyBox still show.
  })


  function show_brows(file) {
      if(file === 'att'){
        $('.att_file div input[type=file]').click();      // click direct file 
      }
      if(file === 'img'){
        $('.img div input[type=file]').click();      // click direct img
      }
  }

  // ---- clear old data conversation ----
  function clear_old_conversation() {
      d_c_conversations.value = [];
      d_c_arr_check_id.value = [];
      d_c_last_massage_id.value = '';
      d_c_detail_chat_topic.value = '';
  }
  // ---- click show full phone numbers ----
  function click_display_full_P_N() {
    setTimeout(() => {
      show_phone_number.value = true;

      tracking_manual('contact'); // tracking contact.
    },100);
  }
  // ---- tracking API call, sms, show contact or any ( but no detail user ) ----
  function tracking_manual(action) {
    let check_user = d_c_user_profile.value && d_c_user_profile.value.type === 'user' ? 'user' : 'store'; // check user type
    helper.tracking_action(check_user, { id: d_c_user_profile.value.id }, action, 'chat', '', '');
  }
  // ---- create phone number with xxx for manual ----
  function display_P_N(phone_number) {
    const regex1 = /^([0-9]{3}[0-9]{3}[0-9]{3})$/;      // phone num in 9 char
    const regex2 = /^([0-9]{3}[0-9]{3}[0-9]{4})$/;      // phone num in 10 char
    let clean_p_n = phone_number.replace(/[-. ]/g, ""); // clean spacial char...
    if (regex1.test(clean_p_n)) {
      return phone_number.replace(/(\d{6})\d{3}/,"$1xxx");
    } else if (regex2.test(phone_number)) {
      return phone_number.replace(/(\d{7})\d{3}/,"$1xxx");
    }
  }

  // ---- auto get chat ----
  function auto_get_chat() {
      if (d_c_conversations.value && d_c_conversations.value.length > 0) {

          // remove auto request prevent duplicate this request
          clearInterval(d_c_timer_auto_chat.value); d_c_timer_auto_chat.value = '';

          let query = { limit: limit_offset.value, lang: language.value, first_message_id: '' };
          if (topic_id.value) {    // --- click from list cart topic ---
              query['topic_id'] = topic_id.value;
          } else {                // --- click from detail ads ---
              query['to_id'] = to_id.value;
          }

          if(route.query.store_id){
            query['storeid'] = route.query.store_id
          }
          $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'messages', {
              headers: { "Access-Token": user_data.value.tokens.access_token },
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
              params: query,
          }).then(res => {

              arr_check_new_message_is_coming.value = []; // clear arr check bg color on new MS inbox

              // -- prevent auto request when change chat topic, (still show old topic) --
              if ((topic_id.value && route.query.topic_id === topic_id.value) || (to_id.value && route.query.to_id === to_id.value)) {

                  // -- check block or unblock user auto --
                  chat_block.value = res.blocked.is_block ? res.blocked.is_block : false;
                  chat_enable_unblock.value = res.blocked.enable_unblock;

                  if (res.data.length > 0) {
                      // let reversed_response = res.data.data ? res.data.data.reverse() : [];

                      $.each(res.data, (key, val) => {
                          if (d_c_arr_check_id.value.includes(parseInt(val.id))) {
                              // console.log('no new message')

                          } else {
                              // console.log('have new message')

                              // - prevent delete message on data smaller then 10, and auto request get 10 every second -
                              // console.log('========== data request ==========')
                              // console.log(res.data.data)
                              // console.log('========== data prevent ==========')
                              // console.log(val)
                              if (val.id < d_c_first_msg_id.value) {
                                  // console.log('old message');

                              } else {
                                  // console.log('new message');

                                  // --- store new message id (inbox), for apply bg color ---
                                  arr_check_new_message_is_coming.value.push(parseInt(val.id));

                                  // --- store cache ---
                                  d_c_arr_check_id.value.push(parseInt(val.id)); // push new id of message to d_c_arr_check_id
                                  // --- add new message to index 0 ---
                                  d_c_conversations.value.splice(d_c_conversations.value.length, 0, clean_res_text_regex(val)); // add array to the last index
                                  // --- without store cache ---
                                  // d_c_arr_check_id.value.push(parseInt(val.id)); // push new id of message to arr_check_id
                                  // d_c_conversations.value.splice(d_c_conversations.value.length,0, val); // add array to the last index


                                  // -- mark as read every new message --
                                  mark_as_read_message(d_c_detail_chat_topic.value.id, d_c_detail_chat_topic.value.to_id, val.id);

                                  // scroll down to specific id
                                  setTimeout(() => {
                                      // window.scrollTo(0, document.body.scrollHeight);
                                      document.getElementById('down_scroll').scrollIntoView({behavior: "smooth"}); // or need smooth => scrollIntoView({ behavior: 'smooth' });
                                  }, 150);
                                  // console.log('========== have new message ==========');
                                  // console.log(d_c_conversations.value);
                                  // console.log(val);
                                  // console.log(d_c_conversations.value.length);
                                  // console.log('================= end ================');
                              }
                          }
                      });
                  }

                  // -- set auto request again when response success
                  if (!d_c_timer_auto_chat.value) { d_c_timer_auto_chat.value = setInterval(() => { auto_get_chat(); }, 4000); }

                  reload_q_again_1.value = 0; // set to 0 prevent token expired and not request again on auto request chats.
              }


              // -- ready plupload (prevent content load slow) --
              if (!attach_uploader) { ready_function_choose_attach_file(); }
              // if (!img_uploader) { ready_function_choose_image(); }
              // console.log(attach_uploader); console.log(img_uploader);
              // -- renew token in plupload, prevent token expired --
              setTimeout(function () {
                  // console.log(attach_uploader);  console.log(img_uploader);
                  if (user_data.value && attach_uploader && img_uploader) {
                      try {
                          attach_uploader.setOption('headers', {"Access-Token": user_data.value.tokens.access_token});
                          img_uploader.setOption('headers', {"Access-Token": user_data.value.tokens.access_token});
                      } catch (e) {
                          console.log(e);
                      }
                  }
              },700);

          }).catch(e => {
              if (!e.response) {
                  console.log(e);

              } else if (e.response) {
                  let check = e.response;
                  // let data_check = JSON.stringify(check);
                  // let d_parse = JSON.parse(data_check);
                  if (check.status === 401) { // retry
                      if (reload_q_again_1.value <= 2) {
                          reload_q_again_1.value += 1;
                          check_auth_user();
                          setTimeout( () => { auto_get_chat(); }, 3000);
                      } else {
                          clearInterval(d_c_timer_auto_chat.value); d_c_timer_auto_chat.value = ''; // clear auto request.
                      }
                  } else if (check.status === 403) {
                      router.replace(localePath({ name: 'index' }));
                  }
              }
          });
      }
  }

  // ---- click play voice ----
  function play_voice(voice_url, id_html) {

    let audio = document.getElementById(''+id_html+'_audio');
    // let audio = new Audio(voice_url);
    if (old_voice_id.value && old_voice_id.value === id_html) { // === it mean click the same voice to play, so pause it ===
      $('#play_'+id_html).removeClass('d-none');
      $('#push_'+id_html).addClass('d-none');
      audio.currentTime = 0;
      audio.pause();
      old_voice_id.value = '';

    } else if (old_voice_id.value && old_voice_id.value !== id_html) { // === it mean click play this voice and then play that voice ===
      // Array.from(document.querySelectorAll('audio')).forEach(el => el.muted = true )
      // -- clear all audio when click play voice multiple in the same time --
      Array.from(document.querySelectorAll('audio')).forEach(function(audio_arr) {
        audio_arr.currentTime = 0;
        audio_arr.pause();
      });
      // -- change icon old_voice_id to icon play --
      $('#play_'+old_voice_id.value).removeClass('d-none');
      $('#push_'+old_voice_id.value).addClass('d-none');
      // -- change icon new voice to icon pause --
      $('#play_'+id_html).addClass('d-none');
      $('#push_'+id_html).removeClass('d-none');
      audio.play();
      old_voice_id.value = id_html;

    } else {   // === start to play new voice ===
      $('#play_'+id_html).addClass('d-none');
      $('#push_'+id_html).removeClass('d-none');
      audio.play();
      old_voice_id.value = id_html;
    }

    // === event show minute on list and track voice end ===
    audio.addEventListener('ended', (ev) => {
      // console.log("audio Ended");
      $('#'+id_html).html('00:00');               // set to 0 if voice play END
      $('#play_'+id_html).removeClass('d-none');  // remove class d-none from icon play
      $('#push_'+id_html).addClass('d-none');     // add class d-none to icon push
      old_voice_id.value = '';
    });
    audio.addEventListener('timeupdate', function (ev) {
      // console.log("Current time", this.currentTime);
      var s = parseInt(audio.currentTime % 60);
      var m = parseInt((audio.currentTime / 60) % 60);
      var c_s = s <= 9 ? '0'+s : s;
      $('#'+id_html).html('0'+m + ':' + c_s);
      // console.log('0'+m + ':' + c_s);
    });
  }
  // ---- compute minute voice ----
  function calculate(minute) {
    var voice_minute = ''; var compute = Math.round(minute);
    if (compute < 10) {
      voice_minute = '00:0'+compute;
    } else if (compute > 10 && compute < 60) {
      voice_minute = '00:'+compute;
    } else if (compute === 60) {
      voice_minute = '01:00';
    }
    return voice_minute;
  }
  // ---- show new tap detail post ----
  function show_detail(title, id, disable_click) {
    if (!disable_click) { // do this to prevent post is sending or send completed

      // go to detail post
      router.push(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title), id: id } }));
      save_track_optional('tracking', { placement: 'chat', display_type: 'list' });

      // // open new tap
      // let routeData = router.resolve({ name: 'title-adid-id', params: { lang: language.value, title: helper.check_special_char(title),
      //     id: id, tracking: JSON.stringify({ placement: 'chat', display_type: 'list' }) } });
      // window.open(routeData.href, '_blank');
    }
  }
  // ---- show new tap detail profile ----
  function show_profile_bus(chat_folder, c_detail) {
      // save params condition on view business card
      save_track_optional('params_optional', c_detail.data);
      // go to preview card
      let user_name = chat_folder === 'inbox' ? (d_c_user_profile.value && d_c_user_profile.value.username ? d_c_user_profile.value.username : '') : (user_data.value.user && user_data.value.user.username ? user_data.value.user.username : '');
      // let routeData = router.resolve(localePath({ name: 'chats-contact-page', query: { username: user_name }}));
      // window.open(routeData.href, '_blank');
      router.push(localePath({ name: 'chats-contact-page', query: { username: user_name }}))
  }
  // ---- show new tap chat map ----
  function show_chat_map(s_c_lat, s_c_lng, s_c_zoon) {
    let routeData = 'https://maps.google.com/maps?q='+s_c_lat+','+s_c_lng+'&amp;'+s_c_zoon+'';
    window.open(routeData, '_blank');
  }
  // function show_chat_map_add(s_c_lat, s_c_lng, s_c_zoon) {
  //   let routeData = 'https://maps.google.com/maps?q='+s_c_lat+','+s_c_lng+'&amp;'+s_c_zoon+'';
  //   window.open(routeData, '_blank');
  // }
  // ---- show new tap chat attach ----
  function show_chat_attach(attach_link) {
    window.open(attach_link, '_blank');
  }

  // ---- click retry ----
  function refresh_auto() {
    // retry when connection error or timeout of request
    if(window.navigator.onLine) {
      // ---- retry to check auto request again when connection error or timeout ----
      if (!d_c_timer_auto_chat.value) { d_c_timer_auto_chat.value = setInterval(() => { auto_get_chat(); }, 4000); }
      // ---- retry to check profile info if exist or not when connection error ----
      if (!d_c_user_profile.value) { get_profile_info(); }
      // ---- retry to check detail_chat_topic if exist or not when connection error ----
      if (!d_c_detail_chat_topic.value) { get_detail_topic(); }
      // ---- remove class modal-open ----
      helper.remove_class_modal_open();
    }
  }

  // ---- get conversation by topic id ----
  async function conversation_by_topic({loaded, error, noMore, noResults}, { isFirstLoad }) {

    var query = '';
    if (topic_id.value) {    // --- click from list cart topic ---
      query = { limit: limit_offset.value, lang: language.value, first_message_id: d_c_last_massage_id.value, topic_id: topic_id.value };
    } else {                // --- click from detail ads ---
      query = { limit: limit_offset.value, lang: language.value, first_message_id: d_c_last_massage_id.value, to_id: to_id.value };
    }

    if(route.query.store_id){
      query['storeid'] = route.query.store_id
    }

    check_auth_user();
    $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'messages', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      params: query,
    }).then(res => {
      if (res.data.length > 0) {
        // console.log(d_c_conversations.value)
        // ---- push id arr to arr_check_id for the first request ----
        if (d_c_conversations.value.length === 0) {
          $.each(res.data, (key, val) => {
            // --- store cache ---
            d_c_arr_check_id.value.push(parseInt(val.id));
            // --- store without cache ---
            // d_c_arr_check_id.value.push(parseInt(val.id));
            // --- add first message id for the first ---
            d_c_first_msg_id.value = val.id;
          });
        }

        // -- if have last_message_id --
        if (d_c_last_massage_id.value) {
          // console.log('have last message id');

          $.each(res.data, (k, v) => {

            //-> d_c_conversations.value.unshift(clean_res_text_regex(v)); // push value to the first index (regex value if type equal text)
            d_c_conversations.value.unshift(clean_res_text_regex(v)); // push value to the first index (regex value if type equal text)

            d_c_last_massage_id.value = v.id;
          });

        // -- concat array when last_message_id empty for the first request --
        } else {
          // console.log('the first request');
          // --- store cache ---
          // d_c_conversations.value = clean_res_data_regex(res.data.data.reverse());


          // -- this logic working with scroll-loader ot kon track --
          let val_res = clean_res_data_regex(res.data.reverse());
          $.each(val_res, (k, v) => {
            d_c_conversations.value.unshift(v);
          });
          // console.log(d_c_conversations);


          let get_the_last_index = res.data;
          d_c_last_massage_id.value = get_the_last_index.reverse()[0].id;
          // --- store without cache ---
          // d_c_conversations.value = res.data.data.reverse();
          // let get_the_last_index = res.data.data;
          // d_c_last_massage_id.value = get_the_last_index.reverse()[0].id;
        }
      }

      limits.value += limit_offset.value;
      count_chats.value += res.data.length;    // count chats
      chat_block.value = res.blocked.is_block;
      chat_enable_unblock.value = res.blocked.enable_unblock ? res.blocked.enable_unblock : (res.blocked.enable_unblock === false ? res.blocked.enable_unblock : '');

      prevent_vue_render_first.value = true;        // show empty icon if data response empty

      // -- tracking on google analytic --
      track_google_analytics('');

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
        if (isFirstLoad) {
          noResults(); // console.log('noResult');
        } else {
          noMore(); // console.log('noMore');
        }
      } else {
        if (count_chats.value.length < limits.value) {
          noMore(); // stop scroll.
        } else {
          loaded(); // scroll down load more data.
        }
      }

    }).catch(e => {
      if (!e.response) {
        error();

      } else if (e.response) {
          let check = e.response;
          // let data_check = JSON.stringify(check);
          // let d_parse = JSON.parse(data_check);
          if (check.status === 401) { // retry
              if (reload_q_again_1.value <= 2) {
                  reload_q_again_1.value += 1;
                  check_auth_user();
                  setTimeout( () => { loaded(); }, 3000);
              } else {
                  localStorage.removeItem('auth_user');
                  VueCookieNext.removeCookie('auth_user');
                  router.replace(localePath({name: 'index'}));
              }
          } else if (check.status === 403) {
              router.replace(localePath({ name: 'index' }));
          }
      }
    }); // stop the loading if cache error
  }
  // ---- track on google analytic ----
  function track_google_analytics (condition) {
    // setTimeout(() => {
      let evt_in = condition === 'profile' ? 'chats/detail-chat/contact-page' : 'chats/detail-chat';
      // let page_title = condition === 'profile' ? 'Profile Contact' : 'Chat Detail';
      let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
      let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
      let data = {
        page_title: meta_title_de_chat.value,
        page_location: page_location,
        page_path: page_path,
      }
      // -- event on page --
      event(evt_in, data);
      // -- page_view --
      pageview(data);
    // },50);
  }
  // ---- get profile info ----
  function get_profile_info() {
    if (d_c_user_profile.value && d_c_user_profile.value.username === route.query.username) {
      // console.log('old data d_c_user_profile.value');
      user_contact.value = d_c_user_profile.value.contact && d_c_user_profile.value.contact.phone_white_operator ? d_c_user_profile.value.contact.phone_white_operator : [];

    } else {
      // console.log('get_new_profile')
      $fetch(config.VUE_APP_API_URL + 'profiles/' + route.query.username, {
        params: { fields: 'all', lang: language.value },
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      }).then(res => {
        d_c_user_profile.value = res.data;
        user_contact.value = res.data.contact && res.data.contact.phone_white_operator ? res.data.contact.phone_white_operator : [];

      }).catch(error => {
        if (error.response && error.response.status === 401) { // retry
          if (reload_q_again_2.value <= 2) {
            reload_q_again_2.value += 1;
            check_auth_user();
            setTimeout( () => { get_profile_info(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }

        } else if (error.response && error.response.status === 404) { // clear old data
          d_c_user_profile.value = '';
          user_contact.value = [];

        } else {
          let check = error.response ? error.response : ''; // original data error
          let data_check = JSON.stringify(check);
          let data_parse = JSON.parse(data_check);
          function_toast(data_parse._data.message ? data_parse._data.message : 'Check your connection', false); // show toast
        }
      });
    }
  }
  // ---- send message ----
  function send_message(short_message, condition) {

    if (loading_sent_chat.value === false) {

      sendingMessage.value = [];

      // check if click chat from post detail ( true or false )
      if (show_topic_post.value) {
        // click btn sent in post topic
        if (condition === 'post') {
          if (topic_id.value) {
            if(route.query.store_id){
              sendingMessage.value.push({
                topic_id: topic_id.value,
                data: JSON.stringify({"type": "post", "id": det_post.show_topic_post_id}),
                storeid: route.query.store_id
              });
            }else{
              sendingMessage.value.push({
                topic_id: topic_id.value,
                data: JSON.stringify({"type": "post", "id": det_post.show_topic_post_id}),
              });
            }
          } else {
            if(route.query.store_id){
              sendingMessage.value.push({
                to_id: to_id.value,
                data: JSON.stringify({"type": "post", "id": det_post.show_topic_post_id}),
                storeid: route.query.store_id
              });
            }else{
              sendingMessage.value.push({
                to_id: to_id.value,
                data: JSON.stringify({"type": "post", "id": det_post.show_topic_post_id})
              });
            }
          }
          sent_request();

        // click btn Sent or choose click Fast Text
        } else {
          if (topic_id.value) {
            if(route.query.store_id){
              sendingMessage.value.push({
                topic_id: topic_id.value,
                data: JSON.stringify({type: 'post', id: det_post.show_topic_post_id}),
                storeid: route.query.store_id
              });
            }else{
              sendingMessage.value.push({
                topic_id: topic_id.value,
                data: JSON.stringify({type: 'post', id: det_post.show_topic_post_id})
              });
            }
          } else {
            if(route.query.store_id){
              sendingMessage.value.push({
                to_id: to_id.value,
                data: JSON.stringify({type: 'post', id: det_post.show_topic_post_id}),
                storeid: route.query.store_id
              });
            }else{
              sendingMessage.value.push({
                to_id: to_id.value,
                data: JSON.stringify({type: 'post', id: det_post.show_topic_post_id})
              });
            }
          }

          if (message.value || short_message) {
            if (!condition) { document.getElementById('_message_').focus(); /*this.$refs.searchbar.focus();*/ }   // --- focus if click btn Send (support with IOS) ---
            if (topic_id.value) {                                // --- click from list cart topic ---
              if(route.query.store_id){
                sendingMessage.value.push({
                  topic_id: topic_id.value,
                  message: short_message ? short_message : message.value,
                  storeid: route.query.store_id
                });
              }else{
                sendingMessage.value.push({
                  topic_id: topic_id.value,
                  message: short_message ? short_message : message.value
                });
              }
            } else {                                            // --- click from detail ads ---
              if(route.query.store_id){
                sendingMessage.value.push({
                  to_id: to_id.value,
                  message: short_message ? short_message : message.value,
                  storeid: route.query.store_id
                });
              }else{
                sendingMessage.value.push({
                  to_id: to_id.value,
                  message: short_message ? short_message : message.value
                });
              }
            }
            sent_request();

          } else {
            document.getElementById('_message_').focus();
            // this.$refs.searchbar.focus(); // --- focus (support with IOS) ---
          }
        }

      }else if(show_topic_resume.value){
        if (condition === 'resume') {
          if (topic_id.value) {
            sendingMessage.value.push({
              topic_id: topic_id.value,
              data: JSON.stringify({"type": "resume", "id": det_post.show_topic_resume_id})
            });
          } else {
            sendingMessage.value.push({
              to_id: to_id.value,
              data: JSON.stringify({"type": "resume", "id": det_post.show_topic_resume_id})
            });
          }
          sent_request();

        // click btn Sent or choose click Fast Text
        } else {
          if (topic_id.value) {
            sendingMessage.value.push({
              topic_id: topic_id.value,
              data: JSON.stringify({type: 'resume', id: det_post.show_topic_resume_id})
            });
          } else {
            sendingMessage.value.push({
              to_id: to_id.value,
              data: JSON.stringify({type: 'resume', id: det_post.show_topic_resume_id})
            });
          }

          if (message.value || short_message) {
            if (!condition) { document.getElementById('_message_').focus(); /*this.$refs.searchbar.focus();*/ }   // --- focus if click btn Send (support with IOS) ---
            if (topic_id.value) {                                // --- click from list cart topic ---
              if(route.query.store_id){
                sendingMessage.value.push({
                  topic_id: topic_id.value,
                  message: short_message ? short_message : message.value,
                  storeid: route.query.store_id
                });
              }else{
                sendingMessage.value.push({
                  topic_id: topic_id.value,
                  message: short_message ? short_message : message.value
                });
              }
            } else {                                            // --- click from detail ads ---
              if(route.query.store_id){
                sendingMessage.value.push({
                  to_id: to_id.value,
                  message: short_message ? short_message : message.value,
                  storeid: route.query.store_id
                });
              }else{
                sendingMessage.value.push({
                  to_id: to_id.value,
                  message: short_message ? short_message : message.value
                });
              }
            }
            sent_request();

          } else {
            document.getElementById('_message_').focus();
            // this.$refs.searchbar.focus(); // --- focus (support with IOS) ---
          }
        }
      } else {
        // check message || short_message are exist or not
        if (message.value || short_message) {
          if (!p_d_a_text.value) {                              // --- if p_d_a_text exist, not allow to focus ---
            if (!condition) {
              document.getElementById('_message_').focus();
              // this.$refs.searchbar.focus();                  // --- focus if click btn Send (support with IOS) ---
            }
          }
          if (topic_id.value) {                                 // --- click from list chat topic ---
            if(route.query.store_id){
              sendingMessage.value.push({
                topic_id: topic_id.value,
                message: short_message ? short_message : message.value,
                storeid: route.query.store_id
              });
            }else{
              sendingMessage.value.push({
                topic_id: topic_id.value,
                message: short_message ? short_message : message.value
              });
            }
          } else {                                             // --- click from detail ads ---
            if(route.query.store_id){
              sendingMessage.value.push({
                to_id: to_id.value,
                message: short_message ? short_message : message.value,
                storeid: route.query.store_id
              });
            }else{
              sendingMessage.value.push({
                to_id: to_id.value,
                message: short_message ? short_message : message.value
              });
            }
          }
          sent_request();

        } else {
          document.getElementById('_message_').focus();
          // this.$refs.searchbar.focus();                      // --- focus (support with IOS) ---
        }
      }
    }
  }
  // ---- do sent request ----
  function sent_request() {
      if (window.navigator.onLine) { // check is connect to internet
          check_auth_user();
          if (sendingMessage.value.length > 0) {

              // --- create fields loading data ---
              tmp_id.value++;
              let data = {};
              if (sendingMessage.value[0].message) { // -- type text --
                  data = { type: 'text', tmp_id: tmp_id.value, data: sendingMessage.value[0].message }
              } else {                               // -- type post --
                  data = {
                      type: 'post',
                      tmp_id: tmp_id.value,
                      data: {
                          pic: det_post && det_post.img ? det_post.img : empty_img_post.value,
                          title: det_post && det_post.title ? det_post.title : '',
                          price: det_post && det_post.price ? det_post.price : '',
                      }
                  }
              }
              create_fields_loading(data);
              // --- /create fields loading data ---
              // -- clear message --
              setTimeout(() => {
                  message.value = '';
                  $('body').find('#_message_').val(''); // clear input in chat message.
                  p_d_a_text.value = '';                // clear input in modal detail post ads.
              },150);
              // -- show all icon at bottom chats again --
              show_field_op_chat.value = 'show';

              // console.log('=======================');
              // console.log('request ah 1');
              loading_sent_chat.value = true;
              $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'messages', {
                  headers: { "Access-Token": user_data.value.tokens.access_token },
                  method: "POST",
                  params: { fields: 'all', lang: language.value },
                  body: new URLSearchParams(sendingMessage.value[0])
              }).then(res => {
                  console.log(res)
                  fun_create_res_data_to_chats(res, tmp_id.value); // create data response to chats

                  setTimeout( () => {               // remove one array if have multiple request
                      sendingMessage.value.shift();
                      if (sendingMessage.value.length > 0) {
                          sent_request();
                      }
                  }, 100);

                  // console.log('send ah 1');

              }).catch(e => {
                  // console.log('error request ah 1');
                  if (!e.response) {
                      loading_sent_chat.value = false;
                      $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                  } else {
                      let check = e.response ? e.response : ''; // original data error
                      let data_check = JSON.stringify(check);
                      let data_parse = JSON.parse(data_check);
                      if (check.status === 403) { // if user has been block by another it show this error
                          chat_block.value = true;
                          chat_enable_unblock.value = false;
                      } else if (check.status === 401) { // retry
                          check_auth_user(); // check auth
                          // if (reload_q_again_3.value <= 2) {
                          //   reload_q_again_3.value += 1;
                          //   check_auth_user();
                          //   setTimeout( () => { sent_request(); }, 3000);
                          //
                          // } else {
                          //   localStorage.removeItem('auth_user');
                          //   VueCookieNext.removeCookie('auth_user');
                          //   router.replace(localePath({name: 'index'}));
                          // }
                      }
                      function_toast(data_parse._data.message, false); // show toast
                  }
                  // create error
                  data_msg_false({ id: tmp_id.value, data: sendingMessage.value[0] });
              }).finally(() => (loading_sent_chat.value = false) );
          }

      } else {
          loading_sent_chat.value = false;
          $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
      }
  }

  // ---- create data message sent false ----
  function data_msg_false(data) {
      $.each(d_c_conversations.value, (k, v) => {
          if (v.tmp_id && v.tmp_id === data.id) {
              d_c_conversations.value[k]['is_error'] = 'yes';
              d_c_conversations.value[k]['resent_data'] = data;

              // "Voice" file upload is pending to tmp file.
              if (v.resent_data.status && (v.resent_data.type === 'voice')) {
                  d_c_conversations.value[k]['pending_upload'] = 'yes'; // to make condition at UI (click retry upload again)
              }

              // console.log(v);
              return false;
          }
      });
  }
  // ---- click resent manual messages are false ----
  async function resent_msg_false(msg_type, msg_error_id) {
      if (window.navigator.onLine) { // check is connect to internet
          check_auth_user();
          let resent_data = {};
          $.each(d_c_conversations.value, (k, v) => {
              if (v.tmp_id && v.tmp_id === msg_error_id) {
                  d_c_conversations.value[k]['is_error'] = '';
                  resent_data = v.resent_data && v.resent_data.data ? v.resent_data.data : '';

                  // "Voice" OR "File" upload pending to tmp.
                  if (msg_type === 'voice_to_tmp') {
                      d_c_conversations.value[k]['pending_upload'] = ''; // to make condition at UI (click retry upload again)
                  }

                  // console.log(v);
                  return false;
              }
          });
          // console.log(resent_data); console.log(d_c_conversations.value);
          // console.log(msg_type);

          if(route.query.store_id){
            resent_data['storeid'] = route.query.store_id
          }

          let url = ''; let params_body = ''; let token = { "Access-Token": user_data.value.tokens.access_token };

          // "Voice" upload pending to tmp.
          if (msg_type === 'voice_to_tmp') {
              url = config.VUE_APP_API_URL_CHAT_NEW + 'upload';
              params_body = {method: "POST", headers: token, body: resent_data}

          // message resent without upload to tmp.
          } else {
              url = config.VUE_APP_API_URL_CHAT_NEW + 'messages';
              params_body = { method: "POST", headers: token, params: { fields: 'all', lang: language.value }, body: new URLSearchParams(resent_data) }
          }

          setTimeout(function () {
              // -- start resent false message --
              loading_sent_chat.value = true;
              $fetch(url, params_body).then(res => {

                  // "Voice" upload pending to tmp.
                  if (msg_type === 'voice_to_tmp') {
                      fun_sent_field({"type": "voice", "file": res.data.file}, msg_error_id);

                  } else {
                      fun_create_res_data_to_chats(res, msg_error_id); // replace data response to data sending.
                  }

              }).catch(e => {
                  if (!e.response) {
                      loading_sent_chat.value = false;
                      $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

                  } else {
                      let check = e.response ? e.response : ''; // original data error.
                      let data_check = JSON.stringify(check);
                      let data_parse = JSON.parse(data_check);
                      if (check.status === 403) { // if user has been block by another it show this error.
                          chat_block.value = true;
                          chat_enable_unblock.value = false;

                      } else if (check.status === 401) { // retry.
                          check_auth_user(); // check auth.
                      }
                      function_toast(data_parse._data.message, false); // show toast.
                  }

                  // "Voice" upload pending to tmp.
                  if (msg_type === 'voice_to_tmp') {
                      data_msg_false({ id: msg_error_id, data: resent_data, status: 'upload_error', type: 'voice' }); // create error uploading voice to tmp.
                  } else {
                      data_msg_false({id: msg_error_id, data: resent_data}); // create error
                  }

              }).finally(() => (loading_sent_chat.value = false) );
          }, 500);
      } else {
          loading_sent_chat.value = false;
          $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
      }
  }

  // ---- show modal delete message in chat ----
  function modal_delete_message(id, type, detail_msg) {
    message_id.value = id;
    message_type.value = type;
    detail_message.value = detail_msg;

    // -- prevent only message text have link or phone, just only get text for copy --
    if (type === 'text') {
      const p = document.getElementById('text_' + message_id.value);
      text_message.value = p.textContent;
    }

    $('#modal_option_chat').modal('show');
  }
  // ---- confirm delete message in chat ----
  function confirm_delete() { $('#modal_option_chat').modal('hide'); $('#modal_confirm_delete_message').modal('show'); }
  // ---- delete message from chat ----
  function delete_message() {
    loading_field.value = true;
    $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'messages/' + message_id.value, {
      lang: language.value,
      headers: { "Access-Token": user_data.value.tokens.access_token },
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      method: 'DELETE',
    }).then(res => {

      loading_field.value = false;                             // close loading
      $('#modal_confirm_delete_message').modal('hide');       // hide modal confirm delete.
      function_toast(res.message, true); // show message status success
      // remove data from array list
      $.each(d_c_conversations.value, (key, val) => {
        if (parseInt(val.id) === parseInt(message_id.value)) {
          d_c_conversations.value.splice(key, 1);      // remove array if id the same.
          return false;
        }
      });

    }).catch(error => {
      if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_14.value <= 2) {
          reload_q_again_14.value += 1;
          check_auth_user();
          setTimeout(() => { delete_message(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      } else {
        // -- show toast --
        let check = error.response; // original data error
        let data_check = JSON.stringify(check);
        let data_parse = JSON.parse(data_check);

        function_toast(data_parse._data.message, false);
      }

      loading_field.value = false; // close loading
    });
  }
  // ---- copy text message ----
  function copy_message(chat_message) {
    document.getElementById('clone_Message').focus();
    // this.$refs.cloneMessage.focus();
    document.execCommand('copy');
    document.getElementById('clone_Message').blur();

    function_toast('Message copied to clipboard', true)

    $('#modal_option_chat').modal('hide'); // close modal options.
  }
  // ---- view message ----
  function view_message(msg_type) {
    let d_msg = detail_message.value;
    if (msg_type === 'post') {
      show_detail(d_msg.data.title, d_msg.data.id, '');
    } else if (msg_type === 'business_card') {
      show_profile_bus(d_msg.folder, '');
    } else if (msg_type === 'map') {
      show_chat_map(d_msg.data.lat, d_msg.data.lng, d_msg.data.zoon);
    } else if (msg_type === 'file') {
      show_chat_attach(d_msg.data.file);
    }
    // else if (msg_type === 'resume') {
    //   show_resume(d_msg.data.id,d_msg.data.key,d_msg.data);
    // }
    else if (msg_type === 'photos' || msg_type === 'photo') {
      $('#img_'+message_id.value).trigger('click');
    }
    $('#modal_option_chat').modal('hide'); // close modal options.
  }

  // ---- block or unblock chat ----
  function block_chat(block_or_unblock) {
    $('#modal_action_chat').modal('hide');
    $('#modal_confirm_block_or_unblock').modal('show');
    condition_block_or_unblock.value = block_or_unblock;

    // --- add class modal-open to body ---
    helper.add_class_modal_open();
  }
  function click_confirm_block() {
    if (window.navigator.onLine) { // check is connect to internet
      check_auth_user();
      loading_field.value = true;
      if (condition_block_or_unblock.value === 'block') {
        $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'block_users', {
          headers: { "Access-Token": user_data.value.tokens.access_token },
          params: { lang: language.value },
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          method: 'POST',
          body: new URLSearchParams({block_userid: d_c_user_profile.value.id})

        }).then(res => {
          $('#modal_confirm_block_or_unblock').modal('hide');
          chat_block.value = true;
          chat_enable_unblock.value = true;
          // setTimeout(function () { $(".cl_ripple").ripple(); }, 1000);

        }).catch(e => {
          if (!e.response) {
            $('#modal_confirm_block_or_unblock').modal('hide');
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

          } else if (e.response && e.response.status === 401) { // retry
            if (reload_q_again_4.value <= 2) {
              reload_q_again_4.value += 1;
              check_auth_user();
              setTimeout( () => { click_confirm_block(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }
          }
        }).finally(() => (loading_field.value = false));

      } else {
        $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'block_users/'+d_c_user_profile.value.id, {
          headers: { "Access-Token": user_data.value.tokens.access_token },
          params: { lang: language.value },
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
          method: 'DELETE',
        }).then(res => {
          $('#modal_confirm_block_or_unblock').modal('hide');
          chat_block.value = false;
          chat_enable_unblock.value = '';
          setTimeout(function () { $(".cl_ripple").ripple(); }, 300);

        }).catch(error => {
          if (!error.response) {
            $('#modal_confirm_block_or_unblock').modal('hide');
            loading_field.value = false;
            $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

          } else if (error.response && error.response.status === 401) { // retry
            if (reload_q_again_5.value <= 2) {
              reload_q_again_5.value += 1;
              check_auth_user();
              setTimeout( () => { click_confirm_block(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }
          }
        }).finally(() => (loading_field.value = false));
      }

    } else {
      $('#modal_confirm_block_or_unblock').modal('hide');
      $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
    }
  }
  // ---- delete chat ----
  function delete_chat() {
    $('#modal_action_chat').modal('hide');
    $('#modal_confirm_delete').modal('show');

    // --- add class modal-open to body ---
    helper.add_class_modal_open();
  }
  function click_confirm_delete() {
    if (window.navigator.onLine) { // check is connect to internet
      var data_params = ''; var id_delete = '';
      if (topic_id.value) {    // --- click from list cart topic ---
        data_params = { lang: language.value };
        id_delete = topic_id.value;
      } else {                // --- click from detail ads ---
        data_params = { lang: language.value, to_id: to_id.value };
        id_delete = 0;
      }

      check_auth_user();
      loading_field.value = true;
      $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'topics/'+id_delete, {
        headers: { "Access-Token": user_data.value.tokens.access_token },
        params: data_params,
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        method: 'DELETE'
      }).then(res => {
        let check_from = route.query.from ? route.query.from : ''; // when delete completed check type, for direct back
        if (check_from) {
          save_track_optional('delete_row_id', { delete_row_id: id_delete });
          router.push(localePath({ name: 'chats', query: { type: check_from }}));
        } else {
          save_track_optional('delete_row_id', { delete_row_id: id_delete });
          router.push(localePath({ name: 'chats' }));
        }

      }).catch(error => {
        if (!error.response) {
          $('#modal_confirm_delete').modal('hide');
          loading_field.value = false;
          $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

        } else if (error.response && error.response.status === 403) {
          let check = error.response ? error.response : ''; // original data error
          let data_check = JSON.stringify(check);
          let data_parse = JSON.parse(data_check);
          check_not_own_chat.value = data_parse._data.message; // --- check if in own chat. ---

        } else if (error.response && error.response.status === 401) { // retry
          if (reload_q_again_6.value <= 2) {
            reload_q_again_6.value += 1;
            check_auth_user();
            setTimeout( () => { click_confirm_delete(); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        }
      }).finally(() => (loading_field.value = false));

    } else {
      $('#modal_confirm_delete').modal('hide');
      loading_field.value = false;
      $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
    }
  }
  // ---- get detail topic chat ----
  function get_detail_topic() {
    var query = ''; var id_get_topic = '';
    if (topic_id.value) {    // --- click from list cart topic ---
      query = { fields: 'user,post,blocked', lang: language.value };
      id_get_topic = topic_id.value;
    } else {                // --- click from detail ads ---
      query = { fields: 'user,post,blocked', lang: language.value, to_id: to_id.value };
      id_get_topic = 0;
    }

    if (d_c_detail_chat_topic.value && ((topic_id.value && d_c_detail_chat_topic.value.id === topic_id.value) || (to_id.value && d_c_detail_chat_topic.value.to_id === to_id.value))) {
      // console.log('old data d_c_detail_chat_topic.value');

    } else {
      // console.log('get new data');
      user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''
      if (id_get_topic !== 0) {
        $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'topics/'+id_get_topic, {
          headers: { "Access-Token": user_data.value.tokens.access_token },
          params: query,
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        }).then(res => {
          d_c_detail_chat_topic.value = res.data;
          // console.log(d_c_detail_chat_topic.value)
          // console.log('Get topic=========',d_c_detail_chat_topic.value)
          // --- request mark as read ---
          if (d_c_detail_chat_topic.value.last_message.is_read === false) {
            mark_as_read_message(d_c_detail_chat_topic.value.id, d_c_detail_chat_topic.value.to_id, d_c_detail_chat_topic.value.last_message_id)
          }

          // --- if chat in type sell, must to request to get custom quick chat data to show user ---
          if (d_c_detail_chat_topic.value.type === "sell") {
            // this. request_quick_chat(); // request to get custom "Quick CHat" if in type "Sell".
            get_quick_chats();
          }

        }).catch(e => {
          if (!e.response) {

          } else if (e.response && e.response.status === 403) {
            let check = e.response;
            let data_check = JSON.stringify(check);
            let data_parse = JSON.parse(data_check);
            check_not_own_chat.value = data_parse._data.message; // --- check if in own chat. ---

          } else if (e.response && e.response.status === 401) { // retry
            if (reload_q_again_7.value <= 2) {
              reload_q_again_7.value += 1;
              check_auth_user();
              setTimeout( () => { get_detail_topic(); }, 3000);
            } else {
              localStorage.removeItem('auth_user');
              VueCookieNext.removeCookie('auth_user')
              router.replace(localePath({name: 'index'}));
            }
          }
        });
      }
    }
  }
  // ---- show safety tip ----
  function show_safety_tip() {
    $('#modal_show_safety_tip').modal('show');
    $('#modal_action_chat').modal('hide');

    // --- add class modal-open to body ---
    helper.add_class_modal_open();
  }
  // ---- go back ----
  function goBack() {
    // if still uploading attach or photos, not allow to click back
    if (is_uploading.value) {
      helper.clear_params_make_con('dt_post');
      window.history.length > 2 ? router.go(-1) : router.push(localePath({name: 'index'}));
    } else {
      function_toast('Still uploading, Please wait.', false); // show toast
    }
  }
  // ---- convert price ----
  function convert_price(price) { return helper.convert_price(price); }
  // ---- convert discount to $ to k ----
  function convert_price_to_k(price) { return helper.kFormatter(price); }
  // ---- convert date ago ----
  function convertFromNow(date) { return helper.check_date_ago(date, ''); }
  // ---- hide short chat ----
  function hide_show_message(condition) {
    if (condition === 'hide') {
      hide_show_text_chat.value = false;
    } else {
      hide_show_text_chat.value = true;
    }
    $('#modal_action_chat').modal('hide'); // close modal options
  }
  // ---- show detail notification ----
  function show_modal_action_chat() { $('#modal_action_chat').modal('show'); }
  // ---- convert num to bytes ----
  function convert_bytes(bytes) { /*console.log(helper.bytes2Size(bytes));*/ return helper.bytes2Size(bytes); }
  // ---- click enter to sent message ----
  function keymonitor(e) {
    if (e.keyCode === 13) {
      send_message('', '');
    }
  }
  function checkTextExist(the_event) {
    if (the_event.target.value) {
      show_field_op_chat.value = 'hide'; // show option field chat.
    } else {
      show_field_op_chat.value = 'show'; // show option field chat.
    }
  }
  // ---- get location province only ----
  function get_location() {
    $fetch(config.VUE_APP_API_URL + 'locations', {
      params: { lang: language.value, },
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
    }).then(res => {
      const object = {
        data: res.data,
        expiry: helper.Date_To_Timestamp('', 3600, 'seconds'), // add 1 hour
      }
      localStorage.setItem("locations", JSON.stringify(object));
      locations.value = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : [];

    }).catch(error => {
      if (error.response && error.response.status === 401) {
        if (reload_q_again_2.value <= 2) {
          reload_q_again_2.value += 1;
          check_auth_user();
          setTimeout( () => { get_location(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      }
    });
  }
  // ---- get quick chat ----
  function get_quick_chats() {
    check_auth_user();
    $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'templates', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { type: 'text', offset: pageSize_q_c.value, lang: language.value },
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
    }).then(res => {
      pageSize_q_c.value += res.limit; // add offset
      if (res.data.length) {
        data_q_c.value = data_q_c.value.concat(res.data); // concat in multiple array
      }

    }).catch(e => {
      if (e.response && e.response.status === 401) { // retry
        if (reload_q_again_12.value <= 2) {
          reload_q_again_12.value += 1;
          check_auth_user();
          setTimeout( () => { get_quick_chats(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      }
    }); // stop the loading if cache error
  }

  // ---- function report user or store ----
  function report_on_user_or_store(next_page) {
      if (window.navigator.onLine) {
          if (next_page) {
            $('#modal_action_chat').modal('hide');
            router.push(localePath({ name: 'username-report', params: { username: d_c_user_profile.value.username }, query: { from: 'chat' } }));

          } else {
              $('#modal_action_chat').modal('hide');
              // -- clear data when open new modal --
              description.value = '';
              report_check.value = '';
              $('#description').removeClass('error_field_text_report');
              $('#error_description').addClass('d-none');

              let url = ''; let check_localstorage = '';
              if (d_c_user_profile.value.type === 'user') {
                  url = 'feedbacks/user_reasons';
                  check_localstorage = "report_user";
              } else {
                  url = 'feedbacks/store_reasons';
                  check_localstorage = "report_store";
              }

              if (!localStorage.getItem(check_localstorage)) {
                  loading_field.value = true;
                  $fetch(config.VUE_APP_API_URL + url,{
                      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
                  }).then(response => {
                      const object = {
                          data: response.data,
                          expiry: helper.Date_To_Timestamp('', 86400, 'seconds'), // add 1 day
                      }
                      localStorage.setItem(check_localstorage, JSON.stringify(object));
                      report_user_or_store.value = localStorage.getItem(check_localstorage) ? JSON.parse(localStorage.getItem(check_localstorage)) : [];
                      $('#show_modal_list_report_user_or_store').modal('show');
                      setTimeout(function(){ $('body').addClass('modal-open'); }, 600);
                      // -- remove error in text area --
                      $('#description').removeClass('error_field_text_report');
                      $('#error_description').addClass('d-none');

                  }).catch(error => {
                      if (!error.response) {
                          if (reload_q_again_13.value < 2) {
                              reload_q_again_13.value += 1;
                              setTimeout( () => { report_on_user_or_store(next_page); }, 3000);
                          } else {
                              loading_field.value = false;
                              $('#show_modal_list_report_user_or_store').modal('hide'); // hide report post modal
                              $('#modal_show_status_error_connection').modal('show');   // show connection error
                          }

                      } else if (error.response && error.response.status === 401) { // retry
                          if (reload_q_again_13.value <= 2) {
                              reload_q_again_13.value += 1;
                              setTimeout( () => { report_on_user_or_store(next_page); }, 3000);
                          } else {
                              localStorage.removeItem('auth_user');   // remove localStorage
                              VueCookieNext.removeCookie('auth_user');
                              router.replace(localePath({name: 'index'}));
                          }
                      }
                  }).finally(() => (loading_field.value = false));
              } else {
                  report_user_or_store.value = localStorage.getItem(check_localstorage) ? JSON.parse(localStorage.getItem(check_localstorage)) : [];
                  $('#show_modal_list_report_user_or_store').modal('show');
                  setTimeout(function(){ $('body').addClass('modal-open'); }, 600);
              }
          }

      } else {
          loading_field.value = false;
          $('#show_modal_list_report_user_or_store').modal('hide'); // hide report post modal
          $('#modal_show_status_error_connection').modal('show');   // show connection error
      }
  }
  // choose report
  function choose_report(reason) {
      if (reason === 'other' && !description.value) {
          $('#description').focus();
          description.value = '';
      }
      $('#description').removeClass('error_field_text_report');
      $('#error_description').addClass('d-none');
      report_check.value = reason;
  }
  // click submit report
  function report_submit() {
      if (window.navigator.onLine) {

          let url = '', form_data = {};
          if (d_c_user_profile.value.type === 'user') {
              url = 'feedbacks/users';
          } else {
              url = 'feedbacks/stores';
          }
          form_data = { id: d_c_user_profile.value.id, reason: report_check.value, description: description.value };

          loading_field.value = true;

          $fetch(config.VUE_APP_API_URL + url,{
              // signal: AbortSignal.timeout(config.DELAY_REQUEST),
              method: 'POST',
              body: new URLSearchParams(form_data)
          }).then(res => {
              // -- hide modal report post --
              $('#show_modal_list_report_user_or_store').modal('hide');
              // -- clear old report data --
              description.value = '';
              report_check.value = '';
              // -- show toast success --
              function_toast(language.value === 'km' ? 'រាយការណ៍ជោគជ័យ' : 'Reported successful', true);

          }).catch(error => {
              if (!error.response) {
                  if (reload_q_again_6.value < 2) {
                      reload_q_again_6.value += 1;
                      setTimeout( () => { report_submit(); }, 3000);
                  } else {
                      loading_field.value = false;
                      $('#show_modal_list_report_user_or_store').modal('hide');
                      $('#modal_show_status_error_connection').modal('show');   // show connection error
                  }

              } else {
                  let check = error.response ? error.response : ''; // original data error
                  let data_check = JSON.stringify(check);
                  let data_parse = JSON.parse(data_check);
                  if (error.response && error.response.status === 422) {
                      $('#description').addClass('error_field_text_report');
                      $('#error_description').removeClass('d-none');
                      $('#error_description').text(data_parse._data.message);
                      // show toast danger
                      function_toast(data_parse._data.message, false);

                  } else if (error.response && error.response.status === 401) { // retry
                      if (reload_q_again_6.value <= 2) {
                          reload_q_again_6.value += 1;
                          setTimeout( () => { report_submit(); }, 3000);
                      } else {
                          localStorage.removeItem('auth_user');   // remove localStorage
                          VueCookieNext.removeCookie('auth_user');
                          router.replace(localePath({name: 'index'}));
                      }
                  }
              }
          }).finally(() => (loading_field.value = false));

      } else {
          loading_field.value = false;
          $('#show_modal_list_report_user_or_store').modal('hide');
          $('#modal_show_status_error_connection').modal('show');   // show connection error
      }
  }
  // close report
  function close_report_modal() { $('#show_modal_list_report_user_or_store').modal('hide'); }
  // required report
  function show_required_report() {
      if (report_check.value === 'other' && !description.value) {
          $('#description').addClass('error_field_text_report');
          $('#error_description').removeClass('d-none');
      } else {
          function_toast(language.value === 'en' ? 'Please select reason' : 'សូមជ្រើសរើសហេតុផល', false);
      }
  }
  // ---- /function report user or store ----

  // ---- mark as read message ----
  function mark_as_read_message(id, to_id, last_message_id) {
    // id = topic_id, to_id = user_id, last_message_id = id of the last message in chat
    let data_body = { topic_id: id , to_id: to_id, id: last_message_id };
    // console.log(data_body); return
    // console.log('ID=========',data_body);

    check_auth_user();
    $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'mark_read_message', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { lang: language.value },
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      method: 'POST',
      body: new URLSearchParams(data_body)

    }).then(res => {  }).catch(e => {
      if (e.response && e.response.status === 401) { // retry
        if (reload_q_again_9.value <= 2) {
          reload_q_again_9.value += 1;
          check_auth_user();
          setTimeout( () => { mark_as_read_message(id, to_id, last_message_id); }, 3000);
        } else {
          localStorage.removeItem('auth_user');
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      }
    });
  }
  // ---- /mark as read message ----

  // ---- sent post or remove post ----
  function remove_post() {
    show_topic_post.value = false;
    show_topic_resume.value = false;
    helper.clear_params_make_con('dt_post');
  }
  // ---- /sent post or remove post ----

  // ---- modal contact page ----
  // ---- click show detail user post ----
  function show_detail_user_post(username) {
    if (window.navigator.onLine) { // check is connect to internet
      
      $('#show_modal_detail').modal('hide');
      save_tracking_user({ placement: 'chat' }, { clear: 'clr_old_data' });
      router.push(localePath({ name: 'username', params: { username: username } }));

    } else {
      $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---
    }
  }
  // ---- click show phone numbers user for Call or SMS ----
  function dialog_phone_number(call_or_sms) {

    tracking_manual(call_or_sms === 'call' ? 'call' : 'sms'); // tracking SMS or Call.

    sms_or_call.value = call_or_sms;
    $('#modal_show_phone_or_sms').modal('show');
  }
  // --- show modal contact page ----
  function show_contact_page() {
    $('#modal_action_chat').modal('hide');  // hide modal show option
    $('#show_modal_detail').modal('show');  // show modal contact page

    // -- tracking on google analytic --
    track_google_analytics('profile');
  }


  // ---- Regex phone number, email, link ----
  function phone_header() {
    let config = [];

    // -- cellcard, smart, metfone, qb --
    config = {
      'phone': {
        'cellcard': {
          '6-digits': ['011','012','014','017','061','077','078','079','085','089','092','095','099'],
          '7-digits': ['076']
        },
        'smart': {
          '6-digits': ['010', '015', '016', '069', '070', '081', '086', '087', '093','098'],
          '7-digits': ['096']
        },
        'metfone': {
          '6-digits': ['060','066','067','068','090'],
          '7-digits': ['031','071','088','097']
        },
        'qb': {
          '6-digits': ['013', '080', '083', '084']
        },
      },
    };

    // config.push({ 'cellcard_prefix': config[0].phone.cellcard['6-digits'].concat(config[0].phone.cellcard['7-digits']) });

    let all_prefix = [];
    let ph_prefix_digit_10 = [];
    let phones_by_provider = [];

    for (const key in config.phone) {
      let prifixs = [];

      for (var k in config.phone[key]) {
        prifixs = prifixs.concat(config.phone[key][k]);
        // console.log(prifixs);
        if (k === '7-digits') { ph_prefix_digit_10 = ph_prefix_digit_10.concat(config.phone[key][k]) }
      }

      all_prefix.concat(prifixs);
      phones_by_provider[key] = prifixs;
      // phones_by_provider.push({ [key]: prifixs });
      // console.log(phones_by_provider)
      // console.log(prifixs);
    }

    phone_providers.value = phones_by_provider;
    phone_prefix.value = all_prefix;
    phone_prefix_digit_10.value = ph_prefix_digit_10;
  }
  function get_new_phone_number(phone_num) {
    let phone_provided = phone_providers.value; // get all head phone number three digit

    let new_phone = []; // substr and substring are different
    let prefix = phone_num.substr(0, 3); // get kbal phone number 3 knong ta bong
    if(phone_num.length>10) {
      if(phone_num.substr(0, 4) === '+855') {
        prefix = '0'+phone_num.substr(4, 2); // remove 4 char and yor 2 chat tor
      }
      if(phone_num.substr(0, 3) === '855') {
        prefix = '0'+phone_num.substr(3, 2); // remove 3 char and yor 2 chat tor
      }
    }

    let provider = 'other';

    for (const p_key in phone_provided) {
      if (phone_provided[p_key].includes(prefix)) {
        provider = p_key;
        break;
      }
    }

    let p = '';
    if (phone_num) {
      p = phone_num.substr(0,3)+' '+phone_num.substr(3,3)+' '+phone_num.substr(6);
    }
    new_phone = {'provider': provider, 'number': phone_num, 'formate': p};
    return new_phone;
  }
  function store_regex() {
    let filters = [];

    filters.push('([0]{1}[0-9]{9})'); // 0123456789
    filters.push('([0-9]{3}[-. ][+][1-9]{12})'); // +855123456789

    filters.push('([0]{1}[0-9]{8})'); // 012345678
    filters.push('([+][1-9]{11})'); // +85512345678

    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{4})'); // 012 345 6789
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{4})'); // +85512 345 6789


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{3})'); // 012 345 678
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{3})'); // +85512 345 678


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{4})'); // 012 34 5678
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{4})'); // +85512 34 5678


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{4}[-. ]{1,2}[0-9]{2,3})'); // 012 3456 78
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{4}[-. ]{1,2}[0-9]{2,3})'); // +85512 3456 78


    filters.push('([0-9]{3}[-][0-9]{3}[-][0-9]{4})'); // 012-345-6789
    filters.push('([0-9]{3}[.][0-9]{3}[.][0-9]{4})'); // 012.345.6789
    filters.push('([+][1-9]{5}[-][0-9]{3}[-][0-9]{4})'); // +85512-345-6789
    filters.push('([+][1-9]{5}[.][0-9]{3}[.][0-9]{4})'); // +85512.345.6789


    filters.push('([0-9]{3}[-][0-9]{3}[-][0-9]{3})'); // 012-345-678
    filters.push('([0-9]{3}[.][0-9]{3}[.][0-9]{3})'); // 012-345-678
    filters.push('([+][1-9]{5}[-][0-9]{3}[-][0-9]{3})'); // +85512-345-678
    filters.push('([+][1-9]{5}[.][0-9]{3}[.][0-9]{3})'); // +85512-345-678


    filters.push('([0-9]{3}[-][0-9]{7})'); // 012-3456789
    filters.push('([+][1-9]{5}[-][0-9]{7})'); // +85512-3456789


    filters.push('([0-9]{3}[-][0-9]{6})'); // 012-345678
    filters.push('([+][1-9]{5}[-][0-9]{6})'); // +85512-345678


    filters.push('([0-9]{3}[ ]{1,2}[0-9]{7,8})'); // 012 3456789
    filters.push('([+][1-9]{5}[ ]{1,2}[0-9]{7,8})'); // +85512 3456789
    filters.push('([1-9]{5}[ ]{1,2}[0-9]{7,8})'); // 85512 3456789


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{6})'); // 012 345678
    filters.push('([0-9]{6}[-. ]{1,2}[0-9]{3})'); // 012345 678
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{6})'); // +85512 345678
    filters.push('([+][1-9]{3}[-. ]{1,2}[0-9]{9})'); // +855 123456789
    filters.push('([+][1-9]{3}[-. ]{1,2}[0-9]{8})'); // +855 12345678
    filters.push('([1-9]{5}[-. ]{1,2}[0-9]{6})'); // 85512 345678


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3})'); // 012 34 56 789
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3})'); // +85512 34 56 789


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2})'); // 012 34 567 89
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2})'); // +85512 34 567 89


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // 012 345 67 89
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // +85512 345 67 89


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // 012 34 56 78
    filters.push('([+][1-9]{5}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2}[-. ]{1,2}[0-9]{2})'); // +85512 34 56 78


    filters.push('([0-9]{3}[-. ]{1,2}[0-9]{1,6}[-. ]{1,2}[0-9]{1,6}[-. ]{1,2}[0-9]{1,6})'); // 012 34 56 78

    // email
    // filters.push('([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,6})');   // check true but if string next to .com it get all all string
    // filters.push('([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3}))');   // this regex get only email, but error on string have "w" a lot
    filters.push('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]{3})'); // this work for email and not error
    // filters.push('([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})'); // this regex get only email

    // link
    filters.push('(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})');

    return filters;
  }
  function check_description(text) {

    let message = text;
   
    phone_header(); // set up phone header first

    let filters = store_regex(); // function return regex

    let regexFromMyArray = new RegExp(filters.join("|"), 'gi'); // convert array to string regex
    // console.log(regexFromMyArray);

    const match_P_N = message.match(regexFromMyArray);
    // console.log(match_P_N);

    let check_email = [];  let check_link = [];  let check_phone_num = [];

    if (match_P_N) {
      // console.log(match_P_N);
      for (const match of match_P_N) {
        // console.log(match)
        // -- link --
        if (match.match(/http|https|ftp|ftps|www./) !== null) {

          if (!check_link.includes(match)) {  // check link has been created yet. (prevent replace an old one, if have duplicate value in message)
            check_link.push(match);         // push link that has been created.

            if (!match.match(/http|https|ftp|ftps/) && match.match(/www./)) { // if link but have only "www." with out http
              message = message.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="//' + match + '">' + match + '</a>');
            } else {
              message = message.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="' + match + '">' + match + '</a>');
            }

          }

        // -- email --
        } else if (match.match(/@/) !== null) {

          if (!check_email.includes(match)) {  // check email has been created yet. (prevent replace an old one, if have duplicate value in message)
            check_email.push(match);         // push email that has been created.

            message = message.replaceAll(match, '<a rel="nofollow noopener" class="d_link_num_link_in_des" target="_blank" href="mailto:' + match + '">' + match + '</a>');
          }

        // -- phone number --
        } else {
          if (!check_phone_num.includes(match)) {  // check phone number has been created yet. (prevent replace an old one, if have duplicate value in message)
            check_phone_num.push(match);         // push phone number that has been created.

            let clean_p_n = match.replace(/[-. ]/g, ""); // clean spacial char...
            // -- now check and clear phone to the true format --
            let phone_data = get_new_phone_number(clean_p_n);
            // console.log(phone_data);

            message = message.replaceAll(match, '<a rel="nofollow" class="d_phone_num_link_in_des" href="tel:' + phone_data.number + '">' + phone_data.number + '</a>');
          }
        }
      }

      // console.log(message);
      return message;

    } else {

      // console.log(message);
      return message;
    }
  }
  // - for array data_con -
  function clean_res_data_regex(data_con) { // (Array) check message response get only text and regex that text message.
    $.each(data_con, (k, v) => {
      if (v.type === 'text') {
        data_con[k].message = check_description(v.message); // check reg is phone num, email or link.
      }
    });
    return data_con;
  }
  // - for manual message -
  function clean_res_text_regex(data_con) { // (one by one) check message response get only text and regex that text message.
    if (data_con.type === 'text') {
      data_con.message = check_description(data_con.message); // check reg is phone num, email or link.
    }
    return data_con;
  }
  // ---- /Regex phone number, email, link ----


  // ---- show option message bottom navigation ----
  function show_option_mess_sent(con) {
    if (con === 'show') {
      show_hide_more_mess.value = true;  // show tool options.
    } else {
      show_hide_more_mess.value = false; // hide tool options.
      // this.$refs.searchbar.focus();  // focus on input text chat.
    }
  }
  // ---- check input message if focus or not ----
  function check_focus() {
    // console.log('focus');
    show_hide_more_mess.value = false; // hide option message bottom navigation, if focus start.

    // check message in input field chat
    if (!message.value) { show_field_op_chat.value = 'show'; } // show field chat in bottom nav bar.
  }


  // ============ Upload Photos ============
  // -- upload only one photo --
  /*ready_function_choose_image() {
      var image = [];
      var limit = 1;
      var max_size = 24;
      var multi_uploader = new plupload.Uploader({
          runtimes : 'html5,flash,silverlight,html4',
          browse_button : ["browse","browse_1"], // ["browse","browse_1"],
          url: api_url+'chats/upload', // http://khmer24.snadai.io/v1.0/chats/upload
          max_file_size : max_size+'mb',
          unique_names : true,
          multi_selection : false,
          // chunk_size: '2mb',
          // resize : { width : 1500, height : 1400, quality : 100, crop: false, },
          filters : {
              mime_types : [
                  {title : "Image files", extensions : "jpg,gif,png,jpeg"}
              ],
              check_image_size : 100, // define for image smaller than 100kb ( important )
          },

          headers: { "Access-Token": user_data.value.tokens.access_token },

          // drop_element : 'multi-upload',
          flash_swf_url : 'plupload-2.3.9/Moxie.swf',
          silverlight_xap_url : 'plupload-2.3.9/Moxie.xap'
      });

      multi_uploader.init();

      multi_uploader.bind('FilesAdded', (up, files) => {
          multi_uploader.start();
      });

      multi_uploader.bind('Error', (up, err) => {
          // console.log("Error:"); console.log(err);
          $.each(image, (index, value) => {
              if (err.file.id === value.id) {  // if error and error id is match with array image, clear
                  image.splice(index, 1);      // remove array if id the same
                  this.image_array = image;
              }
          });

          function_toast(err.message ? err.message : 'Check your connection', false); // show toast

          multi_uploader.refresh();
      });

      multi_uploader.bind('UploadComplete', (upldr, file) => {
          // console.log('UploadComplete');
          multi_uploader.splice();
          multi_uploader.refresh();
      });

      multi_uploader.bind('FileUploaded', async (upldr, file, object) => {
          var myData;
          try {
            // myData = eval(object.response);
            myData = object.response ? JSON.parse(object.response) : '';
          } catch(err) {
            // myData = eval('(' + object.response + ')');
            myData = '(' + object.response + ')';
          }

          // --> start request to sever chats <--
          fun_sent_field({ "type":"photo", "file": myData.data.file });

          multi_uploader.refresh();
      });

      // show loading when upload image
      let create_loading_img = (f) => {
          // loading_field.value = true; // open loading.

          // --- create fields loading ---
             tmp_id.value++;
              let data = {
                  type: 'photo',
                  tmp_id: tmp_id.value,
                  data: { pic: asset_url+version_library+'img/image-loader1.gif' }
              };
              create_fields_loading(data);
          // --- /create fields loading ---
      };

      plupload.addFileFilter('check_image_size', function(minRes, file, cb) { // check size before upload to API (run before FilesAdded)
          // var self = this, img = new o.Image;           // old version of plupload 2.1.8
          var self = this;
          var img = new moxie.image.Image();               // new version of plupload 2.3.7
          function finalize(result) {
              var msg = "Please upload image at less "+minRes+"px width and "+minRes+"px height.";
              if (img.width > 1000000 || img.height > 1000000) msg = "Image "+img.name+" too big.";
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
                  finalize((img.width > minRes && img.height > minRes) && (img.width < 6500 && img.height < 6500));
              };
              img.onerror = function() {
                  finalize(false);
              };
              img.load(file.getSource());
          } else {
              finalize(1);
          }
      });
  },*/
  // -- upload multiple photos --
  function ready_function_choose_image() {  // --- $(document).ready(function(){ } --> must to use in mounted ---
    var limit = 24;
    var max_size = 24;
    img_uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button: ["browse","browse_1","browse_3"], // ["browse","browse_1"],
      // url: api_url+'chats/upload',
      url: config.VUE_APP_API_URL_CHAT_NEW+'upload',
      max_file_size : max_size+'mb',
      unique_names : true,
      multi_selection: true,
      // chunk_size: '2mb',
      resize : { width : 1500, height : 1400, quality : 100, crop: false },
      filters : {
        mime_types : [
          {title : "Image files", extensions : "jpg,gif,png,jpeg"}
        ],
        check_image_size: 100, // define for image smaller than 100kb ( important )
      },

      headers: { "Access-Token": user_data.value.tokens.access_token },

      // drop_element : 'multi-upload',
      flash_swf_url : 'plupload-2.3.9/Moxie.swf',
      silverlight_xap_url : 'plupload-2.3.9/Moxie.xap'
    });

    img_uploader.init();

    img_uploader.bind('FilesAdded', (up, files) => {
      is_uploading.value = false; // close click back button.
      img_uploader.start();
    });

    img_uploader.bind('Error', (up, err) => {

        // remove file loading upload error form chat list.
        let error_msg = '';
        if (err.status) {
            $.each(d_c_conversations.value, (key, val) => {
                if (parseInt(val.tmp_id) === parseInt(tmp_id.value)) {
                    d_c_conversations.value.splice(key, 1);      // remove array if id the same.
                    return false;
                }
            });
            let e_parse = err.response ? JSON.parse(err.response) : '';
            error_msg = e_parse ? e_parse.message : '';

        } else {
            error_msg = err.message ? err.message : '';
        }

        function_toast(error_msg ? error_msg : 'Check your connection', false); // show toast
        is_uploading.value = true; // open click back button.
        img_uploader.refresh();
    });

    img_uploader.bind('UploadComplete', (upldr, file) => {
      // console.log('UploadComplete');
      img_uploader.splice();
      img_uploader.refresh();
    });

    img_uploader.bind('FileUploaded', async (upldr, file, object) => {
      // console.log('FileUploaded');
      var myData;
      try {
        // myData = eval(object.response);
        myData = object.response ? JSON.parse(object.response) : '';
      } catch(err) {
        // myData = eval('(' + object.response + ')');
        myData = '(' + object.response + ')';
      }

      // -- create loading for the first time --
      // - create field loading photos -
      let img_url = asset_url+version_library+'img/img_loading.gif';
      let arr_img = [];
      if (create_loading_first.value) { // for check only for the first time.
        for (var i = 0; i < count_img.value; i++) {
          arr_img.push({
            image: img_url,
            large: {image: img_url},
            medium: {image: img_url},
            name: "loading.jpg",
            small: {image: img_url},
            thumbnail: img_url,
          });
        }
        tmp_id.value++;
        let data = {
          type: 'photos',
          tmp_id: tmp_id.value,
          status: 1,             // change status to "waiting"
          data: arr_img
        };
        create_fields_loading(data);
        create_loading_first.value = false; // stop load for the first.
        // console.log('waiting');
      }
      // -- /create loading for the first time --

      // -- count uploaded to tmp --
      store_name_photos.value.push(myData.data.file);
      check_count_uploaded.value+=1;
      // -- /count uploaded to tmp --

      // -- create fields sending --
      if (count_img.value === check_count_uploaded.value) {
        // console.log('jol sending');
        setTimeout(() => {
          if (d_c_conversations.value) {
            $.each(d_c_conversations.value, (index, val) => {
              if (val.tmp_id && val.tmp_id === tmp_id.value) { // loop check to get loading tmp.
                d_c_conversations.value[index].status = 2;       // change status to "sending".
              }
            });
          }
          // --> start request to sever chats <--
          fun_sent_field({ "type":"photos", "files": store_name_photos.value }, tmp_id.value);
          // --> clear data all condition photos for prevent upload letter <--
          count_img.value = 0;
          create_loading_first.value = true;
          check_count_uploaded.value = 0;
          store_name_photos.value = [];
        },1500);
      }
      // -- /create fields sending --

      // -------- /add image upload to tmp and create in array to show in UI --------

      img_uploader.refresh();
    });


    // add image loading to show in progress ( use this faster then in function "FilesAdded" )
    let create_loading_img = (f) => {
      // if smaller then limit.
      // console.log(count_img.value <= limit);
      if (count_img.value < limit) {       // start from 0
        count_img.value+=1;              // count image upload.

      // if bigger then limit remove img with out upload to tmp.
      } else {
        img_uploader.removeFile(f);   // remove file from pl-upload (spacial)
        // console.log('remove');
      }
    };


    // check size before upload to API (run before FilesAdded)
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

        // create loading to UI if img check true
        if (result) { create_loading_img(file); }

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


  // ============ Upload Attach ============
  function ready_function_choose_attach_file() {
    attach_uploader = new plupload.Uploader({
      runtimes : 'html5,flash,silverlight,html4',
      browse_button: ["attach_file"], // ["browse","browse_1"],
      // url: api_url+'chats/upload', // http://khmer24.snadai.io/v1.0/chats/upload
      url: config.VUE_APP_API_URL_CHAT_NEW+'upload', // http://khmer24.snadai.io/v1.0/chats/upload
      multi_selection: false, // true = multiple , false = single
      // chunk_size: '2mb',
      filters : {
        mime_types : [
          { title : "Attach files", extensions : "pdf,docx,xls,xlsx,csv" } // accept only file: pdf,word,excel
        ],
      },
      headers: { "Access-Token": user_data.value.tokens.access_token },
    });

    attach_uploader.init();

    attach_uploader.bind('FilesAdded', (up, files) => {
      // console.log('FilesAdded'); console.log(files);
      // --- create fields loading ---
      tmp_id.value++;
      let data = {
        type: 'file',
        tmp_id: tmp_id.value,
        data: ''
      };
      create_fields_loading(data);
      // --- /create fields loading ---

      attach_uploader.start();
    });

    attach_uploader.bind('Error', (up, err) => {
        // console.log("Error:"); console.log(err);

        // data_msg_false({ id: tmp_id.value, data: err.file, status: 'upload_error', type: 'file' }); // retry upload to tmp if error
        // remove file loading upload error form chat list.
        let error_msg = '';
        if (err.status) {
            $.each(d_c_conversations.value, (key, val) => {
                if (parseInt(val.tmp_id) === parseInt(tmp_id.value)) {
                    d_c_conversations.value.splice(key, 1);      // remove array if id the same.
                    return false;
                }
            });
            let e_parse = err.response ? JSON.parse(err.response) : '';
            error_msg = e_parse ? e_parse.message : '';

        } else {
            error_msg = err.message ? err.message : '';
        }

        function_toast(error_msg ? error_msg : 'Check your connection', false); // show toast
        attach_uploader.refresh();
    });

    attach_uploader.bind('UploadComplete', (upldr, file) => {
      // console.log('UploadComplete');
      attach_uploader.splice();
      attach_uploader.refresh();
    });

    attach_uploader.bind('FileUploaded', async (upldr, file, object) => {
      // console.log('FileUploaded');
      var myData;
      try {
        // myData = eval(object.response);
        myData = object.response ? JSON.parse(object.response) : '';
      } catch(err) {
        // myData = eval('(' + object.response + ')');
        myData = '(' + object.response + ')';
      }

      // -- start request to sever chats --
      fun_sent_field({ "type":"file", "file": myData.data.file }, tmp_id.value);

      attach_uploader.refresh();
    });
  }


  // ============ show static map ============
  function show_new_static_google_map() {
      let x = b_s_params.value && b_s_params.value.data && b_s_params.value.data['map[x]'] ? b_s_params.value.data['map[x]'] :
          (user_data.value && user_data.value.user && user_data.value.user.contact && user_data.value.user.contact.map && user_data.value.user.contact.map.x ? user_data.value.user.contact.map.x : '');
      let y = b_s_params.value && b_s_params.value.data && b_s_params.value.data['map[y]'] ? b_s_params.value.data['map[y]'] :
          (user_data.value && user_data.value.user && user_data.value.user.contact && user_data.value.user.contact.map && user_data.value.user.contact.map.y ? user_data.value.user.contact.map.y : '');
      let z = b_s_params.value && b_s_params.value.data && b_s_params.value.data['map[z]'] ? b_s_params.value.data['map[z]'] :
          (user_data.value && user_data.value.user && user_data.value.user.contact && user_data.value.user.contact.map && user_data.value.user.contact.map.z ? user_data.value.user.contact.map.z : '');

      // create map
      new_static_map.value = new Map({
          layers: [
              new TileLayer({
                  source: new OSM(),
              }),
          ],
          target: 'show_new_map_detail_chat_static',
          view: new View({
              center: [parseFloat(y), parseFloat(x)],
              zoom: parseInt(z),
              projection: 'EPSG:4326'
          }),
          controls: [] // clear all control button im map.
      });
      create_icon_marker([y, x]);
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
  // ============ Sent Map ============
  function show_location() {
      // --- get current locations lat lng ---
      show_current_location('');
      // --- open modal google map ---
      $('#show_modal_google_map').modal('show');

      /*// clear static old map and show new static map.
      $('#show_new_map_detail_chat .ol-viewport').remove(); // it removes child from the parent.
      setTimeout(() => { show_new_google_map(); },300);*/
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
          target: 'show_new_map_detail_chat',
          view: new View({
              center: [default_lng.value, default_lat.value],
              zoom: default_zoom.value,
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
  function sent_map() {
    // -- show loading --
    // loading_field.value = true;
    // -- start request to sever chats --
    let d_lat = lat.value ? lat.value : default_lat.value;
    let d_lng = lng.value ? lng.value : default_lng.value;
    let d_zoom = zoom.value ? zoom.value : default_zoom.value;
    let data = { "type":"map","lat":d_lat,"lng":d_lng,"zoom":d_zoom };

    // --- create fields loading ---
    tmp_id.value++;
    let data_map = {
      type: 'map',
      tmp_id: tmp_id.value,
      data: { lat: d_lat, lng: d_lng, zoon: d_zoom }
    };
    create_fields_loading(data_map);
    // --- /create fields loading ---

    fun_sent_field(data, tmp_id.value);
    // -- close modal google maps --
    cancel_map();
  }
  function cancel_map() { $('#show_modal_google_map').modal('hide'); }
  function show_current_location(cur_location) {
        // check if user have own location
        let the_lat = user_data.value.user.contact && user_data.value.user.contact.map ? parseFloat(user_data.value.user.contact.map.x) : '';
        let the_lng = user_data.value.user.contact && user_data.value.user.contact.map ? parseFloat(user_data.value.user.contact.map.y) : '';
        let the_zoom = user_data.value.user.contact && user_data.value.user.contact.map ? parseInt(user_data.value.user.contact.map.z) : '';

        navigator.geolocation.getCurrentPosition (
            (position) => {
              // set default prevent click on button my location not working.
              default_lat.value = 12.408612835420433;
              default_lng.value = 104.95790572031129;
              default_zoom.value = 7; // static lat lng middle in cambodia.

              // start check the location user
              // setTimeout(() => {
                // start get current location only
                if (cur_location) {
                  default_lat.value = position.coords.latitude;
                  default_lng.value = position.coords.longitude;
                  default_zoom.value = 15;
                  // console.log('current loc only');

                  // start check lat lng user or current location
                } else {
                  default_lat.value = the_lat ? the_lat : position.coords.latitude;
                  default_lng.value = the_lng ? the_lng : position.coords.longitude;
                  default_zoom.value = the_zoom ? the_zoom : 15;
                  // console.log('all lat lng');
                }

                // --- set value to lat ang lng for prevent click current location and click btn sent with out move location by mouse scroll ---
                lat.value = default_lat.value;
                lng.value = default_lng.value;
                zoom.value = default_zoom.value;
                // --- set value to lat ang lng for prevent click current location and click btn sent with out move location by mouse scroll ---

                // clear old map and show new map.
                $('#show_new_map_detail_chat .ol-viewport').remove(); // it removes child from the parent.
                show_new_google_map();
              // }, 100);

            },
            (e) => {
              // set default lat lng if error location or user dont have location, prevent data not change position when user click button.
              default_lat.value = the_lat ? the_lat : 12.408612835420433;
              default_lng.value = the_lng ? the_lng : 104.95790572031129;
              default_zoom.value = the_zoom ? the_zoom : 7; // static lat lng middle in cambodia.

              // clear old map and show new map.
              $('#show_new_map_detail_chat .ol-viewport').remove(); // it removes child from the parent.
              show_new_google_map();
            }
        );
  }
  function home_location() {

      // if on static_map empty must to get lat lng from user login.
      let user_loc = user_data.value.user && user_data.value.user.contact && user_data.value.user.contact.map ? user_data.value.user.contact.map : '';
      /// if (user_loc.x && user_loc.y) {
          default_lat.value = user_loc.x ? parseFloat(user_loc.x) : '';
          default_lng.value = user_loc.y ? parseFloat(user_loc.y) : '';
          default_zoom.value = 15; // user_loc.z ? parseInt(user_loc.z) : '';

      /*// else static_map have data_lat and data_lng must go direct to that location.
      } else {
          default_lat.value = 12.408612835420433;
          default_lng.value = 104.95790572031129;
          default_zoom.value = 7;
      }*/

      // --- prevent click save not change lat lng ---
      lat.value = default_lat.value;
      lng.value = default_lng.value;
      zoom.value = default_zoom.value;
      // --- prevent click save not change lat lng ---

      // clear old map and show new map.
      $('#show_new_map_detail_chat .ol-viewport').remove(); // it removes child from the parent.
      show_new_google_map();
  }

  // ============ Business Card ============
  function show_business_card() {
      // clear data store from edit profile, if exist
      d_c_data_b_s_card.value = '';
      b_s_params.value = d_c_data_b_s_card.value; // prevent still show new data from edit profile.

      // clear static old map and show new static map.
      $('#show_new_map_detail_chat_static .ol-viewport').remove(); // for removes child from the parent.
      setTimeout(() => { show_new_static_google_map(); },300);

      $('#show_modal_business_card').modal('show');
  }
  function edit_business_card() {
    let param = {};
    if (route.query.to_id) {
      param = { to_id: route.query.to_id, username: route.query.username, from: 'detail_chat' };
    } else {
      param = { topic_id: route.query.topic_id, username: route.query.username, from: 'detail_chat' };
    }
    save_track_optional('params_optional', param);
    router.push(localePath({ name: 'setting-edit-profile' })); // push to edit profile.
    $("#show_modal_business_card").modal('hide');
  }
  function sent_business_card() {
    let d = user_data.value.user; // get data from login user auth.
    let e = b_s_params.value && b_s_params.value.data ? b_s_params.value.data : ''; // get data from edit profile at account page.
    let data = {
      "type": "business_card",
      "name": e && e.first_name ? e.first_name+' '+e.last_name : (!e && d.name ? d.name : ''), // if have spacial char, API show old name.
      "company": e && e.company ? e.company : (!e && d.company ? d.company : ''),
      "phone[0]": e && e['phone[0]'] ? e['phone[0]'] : (!e && d.contact && d.contact.phone[0] ? d.contact.phone[0] : ''),
      "phone[1]": e && e['phone[1]'] ? e['phone[1]'] : (!e && d.contact && d.contact.phone[1] ? d.contact.phone[1] : ''),
      "phone[2]": e && e['phone[2]'] ? e['phone[2]'] : (!e && d.contact && d.contact.phone[2] ? d.contact.phone[2] : ''),
      "email": e && e.email ? e.email : (!e && d.contact && d.contact.email ? d.contact.email : ''),
      "location": e && e.location ? e.location : (!e && d.contact && d.contact.location ? d.contact.location.id : ''),
      "district": e && e.district ? e.district : (!e && d.contact && d.contact.district ? d.contact.district.id : ''),
      "commune": e && e.commune ? e.commune : (!e && d.contact && d.contact.commune ? d.contact.commune.id : ''),
      "address": e && e.address ? e.address : (!e && d.contact && d.contact.address ? d.contact.address : ''),
      "map[lat]": e && e['map[x]'] ? e['map[x]'] : (d.contact && d.contact.map ? d.contact.map.x : ''),
      "map[lng]": e && e['map[y]'] ? e['map[y]'] : (d.contact && d.contact.map ? d.contact.map.y : ''),
    }

    // -- show loading --
    // loading_field.value = true;
    // -- close modal business card --
    $('#show_modal_business_card').modal('hide');
    // --- create fields loading ---
    tmp_id.value++;
    let data_map = {
      type: 'business_card',
      tmp_id: tmp_id.value,
      data: data
    };
    create_fields_loading(data_map);
    // -- sent business card to API --
    fun_sent_field(data, tmp_id.value); // console.log(data);
    // -- clear array edit business card to empty --
    setTimeout(() => {
      b_s_params.value = []; // clear data when sent business cart complete.
    },250)
  }

  // ============ Quick Chats ============
  // --- listing ---
  function show_listing_quick_chat() { $('#show_modal_quick_chat').modal('show'); }
  async function  request_quick_chat({loaded, error, noMore, noResults}, { isFirstLoad }) {
    check_auth_user();
    $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'templates', {
      headers: { "Access-Token": user_data.value.tokens.access_token },
      params: { type: 'text', offset: pageSize_q_c.value, lang: language.value },
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
    }).then(res => {
      pageSize_q_c.value += res.limit; // add offset
      if (res.data.length) {
        data_q_c.value = data_q_c.value.concat(res.data); // concat in multiple array
      }

      // prevent show empty in listing first
      if (data_q_c.value.length > 0) {
        show_empty_q_c_in_list.value = false; // change to false to hide empty icon in listing.
      } else {
        show_empty_q_c_in_list.value = true;  // change to true to show empty icon in listing.
      }

      // -- check stop scroll or scroll more --
      if (res.data.length === 0) {
        if (data_q_c.value.length === 0) {
          if (isFirstLoad) {
            noResults(); // console.log('noResult');
          } else {
            noMore(); // console.log('noMore');
          }
        } else {
          noMore();
        }
      } else {
        if (data_q_c.value.length < pageSize_q_c.value) {
          noMore(); // close scroll.
        } else {
          loaded(); // scroll down load more.
        }
      }

    }).catch(e => {
      if (!e.response) {
        error();
      } else if (e.response && e.response.status === 401) { // retry
        if (reload_q_again_12.value <= 2) {
          reload_q_again_12.value += 1;
          check_auth_user();
          setTimeout( () => { loaded(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({ name: 'index' }));
        }
      }
    }); // stop the loading if cache error
  }
  // --- create or edit quick ---
  function show_add_quick_chats(con) {
    // add
    if (con === 'add') {
      data_data_q_c.value = '';
      data_title_q_c.value = '';
      $('#msg_title').addClass('d-none');
      $('#msg_data').addClass('d-none');

      id_for_edit_q_c.value = ''; // clear id prevent click add but still in edit method.

    // edit
    } else {
      // loop to get and store data in to edit quick chat.
      $.each(data_q_c.value, (key, val) => {
        if (val.id === id_for_edit_q_c.value) {
          data_data_q_c.value = val.data;
          data_title_q_c.value = val.title;
        }
      });
    }

    $('#modal_show_option_quick_chat').modal('hide');   // hide modal show option.
    $('#show_modal_add_quick_chat').modal('show');      // show modal add or edit.
  }
  // --- create or edit ---
  function create_or_edit_q_c(condition, id) {
    if (data_title_q_c.value && data_data_q_c.value) { // validation
      $('#msg_data').addClass('d-none'); $('#msg_title').addClass('d-none'); // remove error

      let url = '';
      if (condition === 'add') {  // add
        // url = 'chats/templates';
        url = config.VUE_APP_API_URL_CHAT_NEW + 'templates';
      } else {                    // edit
        // url = 'chats/templates/' + id;
        url = config.VUE_APP_API_URL_CHAT_NEW + 'templates/' + id;
      }

      loading_field.value = true;
      let data_body = {title: data_title_q_c.value, data: data_data_q_c.value};
      $fetch(url, {
        headers: {"Access-Token": user_data.value.tokens.access_token},
        lang: language.value,
        method: "POST",
        body: new URLSearchParams(data_body)
      }).then(res => {
        let d = res;
        loading_field.value = false; // close loading
        function_toast(d.message, true); // show message status success
        $('#show_modal_add_quick_chat').modal('hide'); // hide modal add or edit quick chat

        // push data response if create quick chat.
        if (condition === 'add') {
          data_q_c.value.push(d.data);

        // edit on array to new data in specific id
        } else {
          $.each(data_q_c.value, (key, val) => {
            if (parseInt(val.id) === parseInt(id)) {
              data_q_c.value[key] = d.data; // change data to new data in specific index.

              // when edit completed must to store data in this variable to prevent user click edit from detail quick chat.
              s_detail_text_quick_chat.value = d.data.data;

              return false; // break the loop
            }
          });
        }

      }).catch(error => {
        if (error.response && error.response.status === 401) { // retry
          if (reload_q_again_10.value <= 2) {
            reload_q_again_10.value += 1;
            check_auth_user();
            setTimeout(() => { create_or_edit_q_c(condition, id); }, 3000);
          } else {
            localStorage.removeItem('auth_user');
            VueCookieNext.removeCookie('auth_user');
            router.replace(localePath({name: 'index'}));
          }
        } else if (error.response && error.response.status === 422) { // if error in validation
          // -- clear old validation --
          let store_arr = arr_validation.value;
          $.each(arr_validation.value, function (keys, val) {
            $('#msg_' + val).addClass('d-none'); // remove validation by key
          });
          // -- show error validation --
          $.each(error.response.data.errors, (key, value) => {
            $('#msg_' + key).removeClass('d-none').text(value.message);
            store_arr.push(key); // to store old key for clear validation
          });
          // -- show toast --
          let er = error.response.data;
          function_toast(er.message, false);
        } else {
          // -- show toast --
          let er = error.response.data;
          function_toast(er.message, false);
        }

        loading_field.value = false; // close loading
      });

    } else {
      if (!data_data_q_c.value) { $('#msg_data').removeClass('d-none').text('Chat field is required.'); } else { $('#msg_data').addClass('d-none'); }
      if (!data_title_q_c.value) { $('#msg_title').removeClass('d-none').text('Note field is required.'); } else { $('#msg_title').addClass('d-none'); }
    }
  }
  // --- show option pop up ---
  function show_option_pop_up_q_c(id) {
    id_for_edit_q_c.value = id; // store id click row in listing when open modal option quick chat
    $('#modal_show_option_quick_chat').modal('show');
  }
  // --- sent quick text from listing quick or options quick ---
  function send_quick_text(txt) {
    if (txt) {
      send_message(txt, 'quick');                    // sent text to chat function.
    } else {
      $.each(data_q_c.value, (key, val) => {
        if (parseInt(val.id) === parseInt(id_for_edit_q_c.value)) {
          send_message(val.data, 'quick');       // sent text to chat function.
          return false;
        }
      });
    }

    $('#show_modal_quick_chat').modal('hide');          // hide listing quick chat.
    $('#modal_show_option_quick_chat').modal('hide');   // hide option modal quick chat.
    $('#show_modal_detail_quick_chat').modal('hide');   // hide modal detail quick chat.
    show_hide_more_mess.value = false;                   // hide nav option chat.
  }
  // --- confirm delete ---
  function show_confirm_delete() {
    // show title in confirm delete
    $.each(data_q_c.value, (key, val) => {
      if (parseInt(val.id) === parseInt(id_for_edit_q_c.value)) {
        title_confirm_delete.value = val.title;
        return false;
      }
    });
    $('#modal_show_option_quick_chat').modal('hide');    // hide modal option.
    $('#modal_confirm_delete_quick_chat').modal('show'); // show modal confirm delete.
  }
  function delete_quick_chat() {
    loading_field.value = true;
    $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'templates/' + id_for_edit_q_c.value, {
      lang: language.value,
      headers: { "Access-Token": user_data.value.tokens.access_token },
      method: "DELETE",
      // signal: AbortSignal.timeout(config.DELAY_REQUEST),
    }).then(res => {
      loading_field.value = false;                             // close loading
      $('#modal_confirm_delete_quick_chat').modal('hide');    // hide modal confirm delete.
      function_toast(res.message, true); // show message status success
      // remove data from array list
      $.each(data_q_c.value, (key, val) => {
        if (parseInt(val.id) === parseInt(id_for_edit_q_c.value)) {
          data_q_c.value.splice(key, 1);      // remove array if id the same

          // check show empty if list quick chat empty
          if (data_q_c.value.length === 0) show_empty_q_c_in_list.value = true;

          return false;
        }
      });

    }).catch(error => {
      if (error.response && error.response.status === 401) { // retry
        if (reload_q_again_8.value <= 2) {
          reload_q_again_8.value += 1;
          check_auth_user();
          setTimeout(() => { delete_quick_chat(); }, 3000);
        } else {
          localStorage.removeItem('auth_user');
          VueCookieNext.removeCookie('auth_user');
          router.replace(localePath({name: 'index'}));
        }
      } else {
        // -- show toast --
        let check = error.response; // original data error
        let data_check = JSON.stringify(check);
        let data_parse = JSON.parse(data_check);
        function_toast(data_parse._data.message, false);
      }

      loading_field.value = false; // close loading
    });
  }
  // --- click eye check text quick chat ---
  function eye_check_text_q_c(id) {
    id_for_edit_q_c.value = id; // store id quick chat for (edit or sent) when click detail one quick chat.

    $.each(data_q_c.value, (key, val) => {
      if (parseInt(val.id) === parseInt(id_for_edit_q_c.value)) {
        s_detail_text_quick_chat.value = val.data;
        return false;
      }
    });
    $('#show_modal_detail_quick_chat').modal('show');
  }

  // ============ Show Listing User Post Ads ============
  function show_listing_user_post_ads() {
      search_post.value = '';      // clear search if open modal listing post ads.
      pageSize_p_ads.value = 0;    // clear pageSize post ads.
      user_post_data.value = [];   // clear data post ads.
      isInitial.value = true;      // reset scroll loader again.

      $('#show_modal_post_ads_user').modal('show');
  }
  // --- listing ---
  async function request_user_post_ads({loaded, error, noMore, noResults}, { isFirstLoad }) {

     let is_user_sell_or_buy = '';
      if (d_c_detail_chat_topic.value && d_c_detail_chat_topic.value.type === 'sell') { // my ads
          is_user_sell_or_buy = user_data.value.user && user_data.value.user.username ? user_data.value.user.username : '';
      } else { // their ads
          is_user_sell_or_buy = d_c_user_profile.value.username ? d_c_user_profile.value.username : '';
      }

      $fetch(config.VUE_APP_API_URL_POST_NEW + is_user_sell_or_buy + '/feed', {
          headers: { "Access-Token": user_data.value ? user_data.value.tokens.access_token : '' }, // if user login add access token
          params: {
              keyword: clean_search(search_post.value),
              offset: pageSize_p_ads.value,
              fields: 'thumbnails,thumbnail,location,photos,user,renew_date,is_like,category,link',
              lang: language.value,
              functions: 'save,chat,like,apply_job,shipping',
          },
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      }).then(res => {

          let d = res.data;
          pageSize_p_ads.value += res.limit;                   // add offset
          if (d && d.length) {
              user_post_data.value = user_post_data.value.concat(d); // concat in multiple array
          }

          // -- check stop scroll or scroll more --
          if (res.data.length === 0) {
              if (isFirstLoad) {
                  noResults(); // console.log('noResult');
              } else {
                  noMore(); // console.log('noMore');
              }
          } else {
              if (user_post_data.value.length < pageSize_p_ads.value) {
                  noMore(); // close scroll.
              } else {
                  loaded(); // scroll down load more.
              }
          }

      }).catch(e => {
          if (!e.response) {
              error();
          } else {
              if (e.response && e.response.status === 401) {  // retry
                  if (reload_q_again_2.value <= 2) {
                      reload_q_again_2.value += 1;
                      check_auth_user();
                      setTimeout( () => { loaded(); }, 3000);
                  } else {
                      localStorage.removeItem('auth_user');
                      VueCookieNext.removeCookie('auth_user');
                      router.replace(localePath({name: 'index'}));
                  }
              }
          }
      });
  }
  // --- click search of listing post ads ---
  function click_search_post(con) {
    pageSize_p_ads.value = 0;
    user_post_data.value = [];
    isInitial.value = true;    // reset scroll loader again.

    if (con === 'focus') {    // click button
      document.getElementById('search_post_ads').focus();
      // this.$refs.search_post_ads.focus(); // focus on search post ads.
    } else {                  // click key monitor
      document.getElementById('search_post_ads').focus();
      // $('#search_post_ads').blur();
    }
  }
  // --- click enter to search data in listing post ads ---
  function keymonitor_search_ads(e) {  if (e.keyCode === 13) { click_search_post(); }  }
  // --- post ads detail ---
  function click_detail_post_ads_message(post_id) {
    post_ads_id.value = post_id; // store post ads id for sent post message.

    // -- get data from listing post --
    $.each(user_post_data.value, (k, v) => {
      if (v.data.id === post_id) {
        $('#show_modal_detail_post_ads_message').modal('show'); // show modal detail post ads
        p_d_a_text.value = ''; // clear text in textarea.
        post_ads_detail.value = v.data;
        // console.log(post_ads_detail.value);
        return false;
      }
    });
  }
  // --- sent detail post ---
  function click_sent_post(pic, title, price) {
    // -- show loading --
    // loading_field.value = true;

    // --- create fields loading ---
    tmp_id.value++;
    let data_post = {
      type: 'post',
      tmp_id: tmp_id.value,
      data: {
        pic: pic ? pic : empty_img_post.value,
        title: title ? title : '',
        price: price ? price : '',
      }
    }
    create_fields_loading(data_post);
    // --- /create fields loading ---

    // -- close modal listing post ads user --
    $('#show_modal_post_ads_user').modal('hide');
    // -- close modal detail post ads user --
    $('#show_modal_detail_post_ads_message').modal('hide');

    // -- sent business card to API --
    let data = { "type":"post", "id":post_ads_id.value }
    fun_sent_field(data, tmp_id.value); // console.log(data);
    // -- check if have chat text in detail post ads too --
    if (p_d_a_text.value) setTimeout(() => { send_message(p_d_a_text.value, ''); },1000);
  }

  // ============ Voice Record ============
  function start_voice(e) {
    e.preventDefault();

    // navigator.getUserMedia =  ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
    // if (navigator.getUserMedia) { // check media user

    try {
      var constraints = { audio: true }

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

        show_cancel_voice.value = false; // show record voice in nav.

        var audioContext = new AudioContext;


        // console.log(stream);
        gumStream.value = stream;
        input.value = audioContext.createMediaStreamSource(stream);
        rec.value = new Recorder(input.value, {numChannels: 1});
        rec.value.record();
        duration.value = 0;
        timer.value = setInterval(() => {
          duration.value = rec.value.context.currentTime;
          let recode_time = msToTime(duration.value);
          $('#status').text(recode_time);
        }, 1);

        // --- start limit on record voice in 1 minute ---
        setTimeOut.value = setTimeout(() => {
          // alert("Hello");
          stop_voice(); // upload voice
        }, 61000); // 61000 = set 1 minute to clear

      }).catch(function (err) {
        alert("Need permission to use microphone.");
      });

    } catch (err) { // catch prevent error
      alert("Need permission to use microphone.");
    }

    // } else {
    //     alert("Need permission to use microphone.");
    // }
  }
  function stop_voice() {
    show_cancel_voice.value = true; // hide record voice in nav.
    rec.value.stop();
    gumStream.value.getAudioTracks()[0].stop();
    clearInterval(timer.value);
    rec.value.exportWAV(upload);
    gumStream.value = null;
    rec.value = null;
    clearTimeout(setTimeOut.value); // clear limit on record
    $('#status').text(''); // set minute to empty
    // console.log('stop_voice');
  }
  function clear_voice(e) {
    e.preventDefault();
    show_cancel_voice.value = true; // hide record voice in nav.
    gumStream.value.getAudioTracks()[0].stop(); // clear old record and icon red in browser.
    clearInterval(timer.value); // clear interval on record minute show.
    gumStream.value = null; // clear gumStream.
    rec.value = null; // clear rec the record voice.
    clearTimeout(setTimeOut.value); // clear limit on record
    $('#status').text(''); // set minute to empty
    // console.log('clear_voice');
  }
  function upload(blob) {
      check_auth_user();
      // --- create fields loading ---
      tmp_id.value++;
      let data = {
          type: 'voice',
          tmp_id: tmp_id.value,
          data: ''
      };
      create_fields_loading(data);
      // --- /create fields loading ---

      // loading_field.value = true; // show loading
      var date = new Date();
      var name = "voice-"+date.getTime()+".wav";
      const myFile = new File([blob], name, {type: 'audio/wav'});
      var fd = new FormData();
      fd.append('name', name);
      fd.append('file', myFile);
      $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'upload', {
          method: "POST",
          headers: { "Access-Token": user_data.value.tokens.access_token },
          body: fd, // new URLSearchParams(fd),
          // signal: AbortSignal.timeout(config.DELAY_REQUEST),
      }).then(res => {
          // console.log(res.data.data);
          // --- record voice sent to API ---
          let data_record = {"type":"voice","file":res.data.file};
          fun_sent_field(data_record, tmp_id.value); // console.log(data);

      }).catch(error => {
          let check = error.response ? error.response : ''; // original data error
          let data_check = JSON.stringify(check);
          let data_parse = JSON.parse(data_check);
          function_toast(check ? data_parse._data.message : 'Check your connection', false); // show toast
          loading_field.value = false;       // close loading
          // create error uploading voice to tmp.
          data_msg_false({ id: tmp_id.value, data: fd, status: 'upload_error', type: 'voice' });
      });
  }
  function msToTime(duration) {
    // var minutes = Math.floor(duration / 60000);
    // var seconds = duration.toFixed(1);
    // return duration.toFixed(1);

    var sec_num = duration; // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    // if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {
      seconds = "0"+seconds.toFixed(0); // toFixed(1) = get second 1 unit, if 2 get 2 unit
    } else {
      seconds = seconds.toFixed(0); // toFixed(1)  = not allow to get second
    }
    return minutes+':'+seconds;  // or like this =>  hours+':'+minutes+':'+seconds;
  }

  // --- function sent message all field dynamic ---
  function fun_sent_field(data, the_tm_id) {
    is_uploading.value = false;         // close click back button.

    // -- check if have post request from detail post --
    if (show_topic_post.value) { // if have post from detail to sent in chat
      send_message('','post'); // sent post to when click sent message from another option message.
    }
    if (show_topic_resume.value) { // if have post from detail to sent in chat
      send_message('','resume'); // sent post to when click sent message from another option message.
    }

    let data_body = '';
    // -- check id --
    if (topic_id.value) {
      data_body = { topic_id: topic_id.value, data: JSON.stringify(data) };
    } else if (to_id.value) {
      data_body = { to_id: to_id.value, data: JSON.stringify(data) };
    } /*else { let data_body = { adid: id, }; }*/

    if(route.query.store_id){
      data_body['storeid'] = route.query.store_id
    }
    // console.log('=======================');
    // console.log('request ah 2');
    setTimeout(() => {
      $fetch(config.VUE_APP_API_URL_CHAT_NEW + 'messages', {
        headers: {"Access-Token": user_data.value.tokens.access_token},
        lang: language.value,
        // signal: AbortSignal.timeout(config.DELAY_REQUEST),
        method: 'POST',
        body: new URLSearchParams(data_body)

      }).then(res => {

        fun_create_res_data_to_chats(res, the_tm_id); // create data response to chats

        loading_field.value = false;       // close loading

        show_hide_more_mess.value = false; // hide option message bottom navigation

        is_uploading.value = true;         // open click back button.

        // console.log('send ah 2');

      }).catch(e => {
          // console.log('error ah 2');
          /*if (e.response && e.response.status === 401) { // retry
            loading_field.value = false;       // close loading
            if (reload_q_again_11.value <= 2) {
              reload_q_again_11.value += 1;
              check_auth_user();
              setTimeout( () => { fun_sent_field(data, the_tm_id); }, 3000);
            } else {
              localStorage.removeItem('auth_user');
              VueCookieNext.removeCookie('auth_user');
              router.replace(localePath({name: 'index'}));
            }
          } else {
            let check = e.response ? e.response : ''; // original data error
            let data_check = JSON.stringify(check);
            let data_parse = JSON.parse(data_check);
            function_toast(check ? data_parse._data.message : 'Check your connection', false); // show toast
            loading_field.value = false;       // close loading
            show_hide_more_mess.value = false; // hide option message bottom navigation
          }*/
          if (!e.response) {
              loading_sent_chat.value = false;
              $('#modal_show_status_error_connection').modal('show');  // --- if connection slow and timeout ---

          } else {
              let check = e.response ? e.response : ''; // original data error
              let data_check = JSON.stringify(check);
              let data_parse = JSON.parse(data_check);
              if (check.status === 403) { // if user has been block by another it show this error
                  chat_block.value = true;
                  chat_enable_unblock.value = false;
              } else if (check.status === 401) { // retry
                  check_auth_user(); // check auth
                  // if (reload_q_again_3.value <= 2) {
                  //   reload_q_again_3.value += 1;
                  //   check_auth_user();
                  //   setTimeout( () => { sent_request(); }, 3000);
                  //
                  // } else {
                  //   localStorage.removeItem('auth_user');
                  //   VueCookieNext.removeCookie('auth_user');
                  //   router.replace(localePath({name: 'index'}));
                  // }
              }
              function_toast(data_parse._data.message, false); // show toast
              loading_field.value = false; // close loading
              show_hide_more_mess.value = false; // hide option message bottom navigation
          }
          // create error
          data_msg_false({ id: the_tm_id, data: data_body });
          is_uploading.value = true;         // open click back button.
      });
    },500);
  }
  // --- create data response from sent to chats list ---
  function fun_create_res_data_to_chats(res, current_tmp_id) {
    // console.log(current_tmp_id);

    // console.log(d_c_arr_check_id.value);
    // console.log(res.data.id);

    // -- check if "Auto Request" get new data first and faster then response "Sent Message", so must to check prevent show duplicate in list message --
    if (d_c_arr_check_id.value.includes(parseInt(res.data.id))) {
      // console.log('exist');

      $.each(d_c_conversations.value, (key, val) => {
        if (parseInt(val.tmp_id) === parseInt(current_tmp_id)) {
          d_c_conversations.value.splice(key, 1);      // remove array if id the same.
          return false;
        }
      });

    // -- add new message to list chat --
    } else {
      // console.log('not exist');

      // --- store cache ---
      d_c_arr_check_id.value.push(parseInt(res.data.id)); // push all id to arr_check_id
      // --- store without cache ---

      // --- check tmp_id of arr_tmp_id_sending ---
      $.each(d_c_conversations.value, (key, val) => {
        // if (val.tmp_id && this.arr_tmp_id_sending.indexOf(val.tmp_id) !== -1) { // check is tmp_id exist && current_tmp_id is in arr_tmp_id_sending.
        if (val.tmp_id && parseInt(val.tmp_id) === current_tmp_id) { // if have tmp_id && equal to current_tmp_id in there action.

          // -- replace new data to old index --
          d_c_conversations.value[key] = clean_res_text_regex(res.data); // check regex on type text only

        }
      });

      // --- check field input chat, prevent sent from another options ---
      setTimeout(() => {
        show_field_op_chat.value = 'hide';     // add this line for re-render array again, else not re-render array. it show still sending in chats list in UI.
        if (message.value) {
          show_field_op_chat.value = 'hide';  // hide fields.
        } else {
          show_field_op_chat.value = 'show';  // show fields.
        }

        // --- scroll to bottom of the screen ---
        show_topic_post.value = false;  // clear topic when sent complete ( happen when click from detail post )
        show_topic_resume.value = false;  // clear topic when sent complete ( happen when click from detail post )
        document.getElementById('down_scroll').scrollIntoView(); // or need smooth => scrollIntoView({ behavior: 'smooth' });
      }, 250);

    }
  }

  // --- show message on toast ---
  function function_toast(message, check_e_or_s) {
    message_success.value = message;
    error_or_success_message.value = check_e_or_s ? true : false;
    let toast = $('.toast');
    toast.removeClass('d-none');
    toast.toast({delay: 6000});
    toast.toast('show');
  }

  // --- create loading in chat by field ---
  function create_fields_loading(data) {
    let form_text = {};
    // -- text --
    if (data.type === 'text') {
      form_text = {
        tmp_id: data.tmp_id,
        folder: "send",
        is_error: "",
        is_read: false,
        message: check_description(data.data), // regex on text if phone num, email or link.
        type: "text",
        id: "",
        read_date: "",
        read_time: "",
        send_date: "",
        send_time: "",
        topic_id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- post --
    } else if (data.type === 'post') {
      form_text = {
        data: {
          image: data.data.pic,
          price: data.data.price,
          thumbnail: data.data.pic,
          title: data.data.title,
          userid: "",
          storeid: "",
          link: "",
          discount: null,
          id: '',
        },
        tmp_id: data.tmp_id,
        folder: "send",
        is_error: "",
        is_read: false,
        message: "[Post]",
        type: "post",
        id: "",
        read_date: "",
        read_time: "",
        send_date: "",
        send_time: "",
        topic_id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- photo --
    } else if (data.type === 'photo') {
      form_text = {
        data: { image: data.data.pic },
        tmp_id: data.tmp_id,
        folder: "send",
        type: "photo",
        is_error: "",
        is_read: false,
        message: "[Photo]",
        send_date: "",
        send_time: "",
        topic_id: "",
        id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- photos --
    } else if (data.type === 'photos') {
      form_text = {
        data: data.data,
        tmp_id: data.tmp_id,
        folder: "send",
        type: "photos",
        is_error: "",
        is_read: false,
        message: "[Photos]",
        send_date: "",
        send_time: "",
        topic_id: "",
        id: "",
        status: data.status,
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- map --
    } else if (data.type === 'map') {
      form_text = {
        data: {
          lat: data.data.lat,
          lng: data.data.lng,
          zoon: data.data.zoom
        },
        tmp_id: data.tmp_id,
        type: "map",
        folder: "send",
        is_error: "",
        is_read: false,
        message: "[Map]",
        send_date: "",
        send_time: "",
        topic_id: "",
        id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- business_card --
    } else if (data.type === 'business_card') {
      let phone = [data.data['phone[0]'], data.data['phone[1]'], data.data['phone[2]']];
      let arr_phone = phone.filter(e =>  e);          // filter array empty out.
      form_text = {
        data: {
          address: data.data.address,
          company: data.data.company,
          email: data.data.email,
          location: { en_name: "", km_name: "", long_location: "" },
          map: { lat: data.data['map[lat]'], lng: data.data['map[lng]'] },
          name: data.data.name,
          phone: arr_phone
        },
        tmp_id: data.tmp_id,
        type: "business_card",
        folder: "send",
        is_error: "",
        is_read: false,
        message: "",
        send_date: "",
        send_time: "",
        topic_id: "",
        id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- voice --
    } else if (data.type === 'voice') {
      form_text = {
        data: {
          file: "",
          length: "0",
          name: "",
          size: "",
          type: "wav",
        },
        tmp_id: data.tmp_id,
        folder: "send",
        type: "voice",
        is_error: "",
        is_read: false,
        message: "[Voice]",
        send_date: "",
        send_time: "",
        topic_id: "",
        id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success

    // -- file --
    } else if (data.type === 'file') {
      form_text = {
        data: {
          file: '',
          name: '',
          size: "",
          type: ""
        },
        tmp_id: data.tmp_id,
        folder: "send",
        type: "file",
        is_error: "",
        is_read: false,
        message: "",
        send_date: "",
        send_time: "",
        topic_id: "",
        id: "",
      }
      show_hide_more_mess.value = false;              // hide option message bottom navigation
      // this.arr_tmp_id_sending.push(data.tmp_id);   // push id for clear later when response success
    }

    const revers = d_c_conversations.value.reverse();
    revers.splice(0, 0, form_text);    // add array to the last index
    d_c_conversations.value = revers.reverse();

    setTimeout( () => {         // scroll to bottom of the screen
      show_topic_post.value = false;   // clear topic when sent complete ( happen when click from detail post )
      show_topic_resume.value = false;   // clear topic when sent complete ( happen when click from detail post )
      document.getElementById('down_scroll').scrollIntoView(); // or need smooth => scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  // ---- check auth user ----
  function check_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
  // ---- user tracking ----
  function save_tracking_user(user_track, clear_old) {
      helper.params_make_condition('tracking', user_track);
      helper.params_make_condition('clear', clear_old);
  }
  // ---- store all type params ----
  function save_track_optional(type, data_params) {
      helper.params_make_condition(type, data_params);
  }
  // ---- clean special char to use in url ----
  function clean_search(search_text) { return helper.check_special_search_text(search_text); }
  // ---- check image error 404 must to show static image ----
  function imageUrlAlt_profile(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_profile.value; } }
  function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }


  // function click_chat_resume(){
  //   $('#show_modal_resume').modal('show');
  // }
  const auth_user = useCookie('auth_user')
  const GetAll = useState('GetAll',()=>'')
  const user_id = useState('user_id',()=>'')
  const loadindScreen = useState('loadindScreen')
  const data_detail_job = ref('');
  loadindScreen.value = true
  const ShowPhone = useState('ShowPhone')
  ShowPhone.value = false
  function clicPhone(){
    ShowPhone.value = true
  }
  function clicClose(){
    ShowPhone.value = false
  }

  const chat_resume = useState('chat_resume',()=>'')
  function click_show_option_resume(chat){
    chat_resume.value = chat
    $('#show_modal_option_resume').modal('show');
  }

  function clearData(){
    $('#show_modal_option_resume').modal('hide');
  }
  // function send_resume(){
  //   const data = {
  //     type: 'resume',
  //     id: GetAll.value.id
  //   }
  //   const data_input = {
  //   topic_id: route.query.topic_id,
  //   data: JSON.stringify(data)
  //   }
  //   $fetch('https://api-chats.khmer24.com/messages?lang=en',{
  //     method: "POST",headers: {"Access-Token": auth_user.value.tokens.access_token},
  //     body: new URLSearchParams(data_input)
  //   }).then(res=>{
  //     $('#show_modal_resume').modal('hide');
  //     // console.log(res)
  //   }).catch(er=>{
  //     alert('error')
  //   })
  // }

  function click_to_resume(){
    if(route.query.topic_id){
      let str = {
        topic_id: route.query.topic_id  , 
        username: route.query.username,
      }
      if(route.query.store_id){
        str['store_id'] = route.query.store_id
      }
      router.push(localePath({ name: 'chats-send-resume', query: str}));
    }
    if(route.query.to_id){
      let str = {
        to_id: route.query.to_id  , 
        username: route.query.username,
      }
      if(route.query.store_id){
        str['store_id'] = route.query.store_id
      }
      router.push(localePath({ name: 'chats-send-resume', query: str}));
    }
  }

  function click_to_address(){
    if(route.query.topic_id){
      let str = {
        topic_id: route.query.topic_id  , 
        username: route.query.username,
      }
      if(route.query.store_id){
        str['store_id'] = route.query.store_id
      }
      router.push(localePath({ name: 'chats-shipping-billing-address', query: str}));
    }
    if(route.query.to_id){
      let str = {
        to_id: route.query.to_id, 
        username: route.query.username,
      }
      if(route.query.store_id){
        str['store_id'] = route.query.store_id
      }
      router.push(localePath({ name: 'chats-shipping-billing-address', query: str}));
    }
  }

  // const GetAll = useState('GetAll',()=>'')
  const item_chat = useState('item_chat',()=>'')
  function show_resume(chat_id,chat_key,userID){
    user_id.value = userID
    $fetch(config.VUE_APP_API_URL_JOB+'/resumes/'+chat_id+'?fields=personal_details,educations,experiences,languages,skills,attachment,references,summary,hobbies,preference&lang=en',{
          params: { key: chat_key },
          headers: { "Access-Token": user_data.value.tokens.access_token }
      })
      .then(res=>{
          loadindScreen.value = false
          const result = res.data
          GetAll.value = result
          data_detail_job.value = result
          $('#show_modal_detail_resume').modal('show');
      }).catch(er=>{
          loadindScreen.value = false
          console.log(er)
      })
  }
  // await show_resume();
  function check_new_auth_user() { 
      user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
  }
  // function click_chat() {
  //   $('#show_modal_detail_resume').modal('hide');
  //     // check_new_auth_user();
  //     // let data = GetAll.value;
  //     // // let data = All_P_Resume.value;
  //     // let user_id = data ? data.userid : '';
  //     // if (window.navigator.onLine) {
  //     //     if (user_data.value && user_data.value.tokens.access_token) {
  //     //         loading_field.value = true;
  //     //         $fetch(config.VUE_APP_API_URL + 'profiles/user/' + user_id, {
  //     //             params: { fields: 'username' }
  //     //         }).then(res => {
  //     //             loading_field.value = false;
  //     //             save_track_optional('clear_old_data', { clear_old_data: 'clear' });
  //     //             router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
  //     //             $('#show_modal_detail_resume').modal('hide');
  //     //         }).catch(error => {
  //     //             if (!error.response) {
  //     //                 if (reload_q_again_4.value < 2) {
  //     //                     reload_q_again_4.value += 1;
  //     //                     setTimeout( () => { click_chat(); }, 3000);
  //     //                 }
  //     //             } else if (error.response) {
  //     //                 if (error.response.status === 401) { // retry
  //     //                     if (reload_q_again_4.value <= 2) {
  //     //                     reload_q_again_4.value += 1;
  //     //                     setTimeout( () => { click_chat(); }, 3000);
  //     //                     }
  //     //                 }
  //     //             }       
  //     //             loading_field.value = false;
  //     //         });
  //     //         // loading_field.value = false;
  //     //     }else{
  //     //         router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
  //     //     }
  //     // }
  // }
</script>


<style scoped>
._i{ width: 12%;}
._div{width:88%}
.text_truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>