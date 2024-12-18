<template>
    <div>
        <div v-if="loadindScreen" class="loading_back_ground bg-secondary">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div v-if="loading" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div class="form-style personal_detail" :class="isMobile ? ' pt-3' : ''">
            <template v-if="isMobile">
                <div v-if="stepCookie !== 'step'" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                    <div class="_div_nav bg_app_bar_header_">
                        <div @click="goBack" class="_pad_col_icon">
                            <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                                <i class="ion-android-arrow-back font_click_back"></i>
                            </button>
                        </div>
                        <div class="col ps-0 l_h_con_title">
                            <p class="name_style truncate_wrap mb-0 ms-2 text-left">
                            {{ $t('resume_cv.personal') }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                    <div class="_div_nav bg_app_bar_header_">
                        <div @click="goBack" class="_pad_col_icon">
                            <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                                <i class="ion-android-arrow-back font_click_back"></i>
                            </button>
                        </div>
                        <div class="col ps-0 l_h_con_title">
                            <p class="name_style truncate_wrap mb-0 ms-2 text-left">
                                {{ $t('resume_cv.step_1') }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
            <div class="form_input bg-white border rounded p-3 mt_80">
                <div v-if="!isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ $t('resume_cv.personal') }}</h1></div>
                <form id="f_s">
                    <div class="mb-3 d-flex">
                        <!-- upload image 354 x 472 px -->
                        <div id="photo">
                            <div class="brows_file" hidden>
                                <a id="pickfiles" href="javascript:void (0)" rel="nofollow" aria-label="Brows"></a>
                            </div>
                            <a rel="nofollow" aria-label="profile" ref="ref_profile" v-if="getPersonal.photo" :href="getPersonal.photo.url" data-fancybox></a>
                            <a rel="nofollow" aria-label="profile" ref="ref_tmp" v-if="tmp_file1" :href="tmp_file1" data-fancybox></a>
                            <div class="me-3 per_pro_n" >
                                <div v-if="loadings" class="text-center">
                                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="img_w_p">
                                </div>
                                <div v-else>
                                    <div v-if="!tmp_file1 && !getPersonal.photo" >
                                        <div @click="show_brows" class="bg_pro">
                                            <div class="edit_pen">
                                                <i class="fas fa-pencil-alt icon_pen_c_fn"></i>
                                            </div>
                                            <span class=" label_style label"><i class=" fas fa-user-alt fn_50"></i></span>
                                            <div class="ps-1 fn_18">3 X 4</div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-if="loadings" class="text-center">
                                            <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="img_w_p">
                                        </div>
                                        <div v-else data-bs-toggle="modal" data-bs-target="#photos">
                                            <div class="edit_pen" id="edit_pen_img">
                                                <i class="fas fa-pencil-alt icon_pen_c_fn"></i>
                                            </div>
                                            <img v-if="tmp_file1" :src="tmp_file1" alt="" class="images">
                                            <img v-if="getPersonal.photo" :src="getPersonal.photo.url" alt="" class="images" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-100">
                            <div id="item2" class="mb-3">
                                <label for="fname" class="full_width text-left label_style label">{{ $t('resume_cv.fname') }}<span class="text-danger">*</span></label>
                                <input  type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="fname" name="fname" v-model="formData.fname" >
                            </div>
                            <div id="item2">
                                <label for="lname" class=" full_width text-left label_style label">{{ $t('resume_cv.lname') }}<span class="text-danger">*</span></label>
                                <input type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="lname" name="lname" v-model="formData.lname">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 " id="gender">
                        <label class="full_width text-left label_style label"> {{ $t('new_text_1.gender') }} </label>
                        <div class="radio-new-or-second-hand text-center row m-0">
                            <div class="col p_pad_radio_option">
                                <input type="radio" id="m" v-model="formData.gender" class="form-control field-height more_border" name="ad_condition" value="m">
                                <label for="m" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0" :class="isMobile ? 'pt-1' : 'pt-0'">{{ $t('resume_cv.m') }}</p></label>
                            </div>
                            <div class="col p_pad_radio_option">
                                <input type="radio" id="f" v-model="formData.gender" name="ad_condition" value="f">
                                <label for="f" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0" :class="isMobile ? 'pt-1' : 'pt-0'">{{ $t('resume_cv.f') }}</p></label>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3" id="dob">
                        <label class="full_width text-left label_style label">{{ $t('resume_cv.dob') }}</label>
                        <!-- <input type="date" v-model="formData.dob" class="form-control field-height more_border " style="min-width: 95% !important;" > -->
                        <ClientOnly>
                            <DatePicker 
                                v-model="formData.dob" 
                                placeholder="Select DOB" 
                                class="form-control bg-white" 
                                :class="isMobile ? 'field-height' : 'dt-field-height'"
                                id="date_of_birth" 
                                name="date_of_birth" 
                                inputFormat="yyyy-MMM-dd" 
                                :clearable="true"
                            />
                        </ClientOnly>
                    </div>
                    <div class="mb-3" id="nationality">
                        <label class=" full_width text-left label_style label">{{ $t('resume_cv.nationality') }}</label>
                        <input type="text" v-model="formData.nationality" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    </div>
                    <div class="mb-3" id="email">
                        <label class="full_width text-left label_style label">{{ $t('resume_cv.email') }}</label>
                        <input type="email" v-model="formData.email" class="form-control more_border email" :class="isMobile ? 'field-height' : 'dt-field-height'" name="email">
                    </div>
                    <div v-if="getPersonal.phone" class="mb-3" id="phone">
                        <label for="phone" class="full_width text-left label_style label">{{ $t("resume_cv.phone") }}<span class="text-danger">*</span></label>
                        <template v-for="(p_n, index) in phone" :key="p_n">
                            <div v-if="index === 0" class="style_flex mb-3">
                            <div :class="phone.length === 1" class="w-100">
                                <input v-model="formData.phone[0]" type="text" inputmode="numeric" :placeholder="$t('message.phone_1')" maxlength="10" class="form-control more_border number phone1" :class="isMobile ? 'field-height' : 'dt-field-height'" id="phone" name="phone" />
                            </div>
                            <div v-if="phone.length === 1" @click="add_field_phone_number" class="p-0 div_add cur_sur ml_20">
                                <span class="fas fa-plus-circle font_22 text-primary" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                            </div>
                            <div v-if="index === 1" class="style_flex mb-3">
                            <div :class="phone.length === 2" class="w-100 position-relative">
                                <input v-model="formData.phone[1]" type="text" inputmode="numeric" :placeholder="$t('message.phone_2')" maxlength="10" id="phone2" name="phone_1" ref="inputapply1" class="form-control more_border phone2" :class="isMobile ? 'field-height' : 'dt-field-height'" />
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                            </div>
                            <div v-if="phone.length === 2" @click="add_field_phone_number" class="p-0 div_add cur_sur ml_20">
                                <span class="fas fa-plus-circle font_22 text-primary " :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                            </div>
                            <div v-if="index === 2" class="style_flex mb-3">
                            <div class="col-12 p-0 position_relative">
                                <input v-model="formData.phone[2]" type="text" inputmode="numeric" v-bind:placeholder="$t('message.phone_3')" maxlength="10" id="phone3" name="phone_2" class="form-control more_border phone3" :class="isMobile ? 'field-height' : 'dt-field-height'" ref="inputapply2"/>
                                <i @click="minus_field_phone(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                            </div>
                            </div>
                        </template>
                    </div>
                    <div v-else class="mb-3" id="phone">
                        <label for="phone" class="full_width text-left label_style label">{{ $t("resume_cv.phone") }}<span class="text-danger">*</span></label>
                        <template v-for="(p_n_e, index) in phone_e" :key="p_n_e">
                            <div v-if="index === 0" class="style_flex mb-3">
                            <div :class="phone_e.length === 1" class="w-100">
                                <input v-model="formData.phone[0]" type="text" inputmode="numeric" :placeholder="$t('message.phone_1')" maxlength="10" class="form-control more_border number phone1" :class="isMobile ? 'field-height' : 'dt-field-height'" id="phone" name="phone" />
                            </div>
                            <div v-if="phone_e.length === 1" @click="add_field_phone_number_e" class="p-0 div_add cur_sur ml_20">
                                <span class="fas fa-plus-circle font_22 text-primary" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                            </div>
                            <div v-if="index === 1" class="style_flex mb-3">
                            <div :class="phone_e.length === 2" class="w-100 position-relative">
                                <input v-model="formData.phone[1]" type="text" inputmode="numeric" :placeholder="$t('message.phone_2')" maxlength="10" id="phone2" name="phone_1" ref="inputapply1" :class="isMobile ? 'field-height' : 'dt-field-height'" class="form-control more_border phone2"/>
                                <i @click="minus_field_phone_e(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                            </div>
                            <div v-if="phone_e.length === 2" @click="add_field_phone_number_e" class="p-0 div_add cur_sur ml_20">
                                <span class="fas fa-plus-circle font_22 text-primary" :class="isMobile ? 'mg-top-btn-plus' : 'mt-2'"></span>
                            </div>
                            </div>
                            <div v-if="index === 2" class="style_flex mb-3">
                            <div class="col-12 p-0 position_relative">
                                <input v-model="formData.phone[2]" type="text" inputmode="numeric" v-bind:placeholder="$t('message.phone_3')" maxlength="10" id="phone3" name="phone_2" class="form-control more_border phone3" :class="isMobile ? 'field-height' : 'dt-field-height'" ref="inputapply2"/>
                                <i @click="minus_field_phone_e(index)" class="fas fa-minus-circle text-danger icon_in_text_field cur_sur" :class="isMobile ? 'pad_icon_minus' : 'fn_22 pt-2'"></i>
                            </div>
                            </div>
                        </template>
                    </div>
                    <!-- locations -->
                    <div class="mb-3 position_relative" id="location">
                        <label class=" mb-1 text-left full_width label" > {{ $t('new_text.location') }}</label>
                        <div @click="choose_location('show')" name="location" :class="isMobile ? (province_name ? 'p_sel_1 field-height' : 'p_sel_2 field-height' ) : (province_name ? 'p_sel_1 dt-field-height' : 'p_sel_2 dt-field-height' )" class="e_selection text-left cur_sur">
                            <p v-if="province_name" class="truncate font_15 pad_dis_1 width_90" :class="isMobile ? ' mt-2' : ' mt-1'">
                                {{ province_name ? province_name : '' }}
                                {{ district_name ? ' , '+district_name : '' }}
                                {{ commune_name ? ' , '+commune_name : '' }}
                            </p>
                            <p v-if="!province_name" class="m-2 text_grey" :class="isMobile ? '' : ' mt-1'">{{ $t('new_text.choose_location') }}</p>
                        </div>
                        <i class="ion-android-arrow-dropdown s_icon_in_select_option" :class="isMobile ? 'mt_-10' : 'dt_mt_-10'"></i>
                        <div v-if="error_loc" class="e_form_error">
                            <span class="text-danger float-start font_13 mb-2"> {{ $t('message.error_location') }} </span>
                        </div>
                    </div>
                    <div class="mb-3" id="address">
                        <label class="full_width text-left label_style label">{{ $t('resume_cv.address') }}</label>
                        <input id="address" type="text" v-model="formData.address" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    </div>
                    <div class="mb-3 botton-style" id="education_level">
                        <label for="" class="full_width text-left label_style label">{{ $t('resume_cv.education_level') }}</label>
                        <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="education_level" v-model="formData.education_level">
                            <option value="" ></option>
                            <option value="high-school">{{ $t('resume_cv.high_school') }}</option>
                            <option value="associate">{{$t('resume_cv.associate')}}</option>
                            <option value="professional">{{$t('resume_cv.professional')}}</option>
                            <option value="bachelor">{{$t('resume_cv.bachelor')}}</option>
                            <option value="master">{{$t('resume_cv.master')}}</option>
                            <option value="doctor">{{$t('resume_cv.doctor')}}</option>
                        </select>
                        <i class="fas fa-chevron-down fn_13" id="icon-down"></i>
                    </div>
                    <div class="mb-3" id="position">
                        <label class="full_width text-left label_style label">{{ $t('resume_cv.current_position') }}</label>
                        <input v-model="formData.position" type="text" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                    </div>
                    <div class="mb-3"  id="work_experience" >
                        <label class="full_width text-left label_style label">{{ $t('resume_cv.experience_year') }}</label>
                        <input v-model="formData.work_experience" type="text" inputmode="numeric" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" name="work_experience">
                    </div>
                    <div class="botton-style" id="marital_status">
                    <div class="mb-3">
                        <label  class="full_width text-left label_style label"> {{ $t('resume_cv.marital_status') }} </label>
                        <div class="radio-new-or-second-hand text-center row m-0">
                            <div class="col p_pad_radio_option">
                                <input type="radio" v-model="formData.marital_status" id="single" name="ad_marital_status" value="single">
                                <label for="single" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0" :class="isMobile ? 'pt-1' : 'pt-0'">{{ $t('resume_cv.single') }}</p></label>
                            </div>
                            <div class="col p_pad_radio_option">
                                <input type="radio" v-model="formData.marital_status" id="married" name="ad_marital_status" value="married">
                                <label for="married" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0 " :class="isMobile ? 'pt-1' : 'pt-0'">{{ $t('resume_cv.married') }}</p></label>
                            </div>
                            <div class="col p_pad_radio_option">
                                <input type="radio" v-model="formData.marital_status" id="devorced" name="ad_marital_status" value="divorced">
                                <label for="devorced" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0" :class="isMobile ? 'pt-1' : 'pt-0'">{{ $t('resume_cv.divorced') }}</p></label>
                            </div>
                        </div>
                    </div>
                </div>
                    <div v-if="stepCookie !== 'step'" id="btn">
                        <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                            <div v-if="isLoading">
                                <p class="buttonload">
                                    <i class="fa fa-spinner fa-spin me-2"></i>{{ $t('resume_cv.loading') }}
                                </p>
                            </div>    
                            <span v-else>{{ $t('resume_cv.save') }}</span>
                        </button>
                    </div>
                    <div v-else id="btn">
                        <button class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="test-color">
                            <div v-if="isLoading">
                                <p class="buttonload">
                                    <i class="fa fa-spinner fa-spin me-2"></i>{{ $t('resume_cv.loading') }}
                                </p>
                            </div>    
                            <span v-else>Continue</span>
                        </button>
                    </div>
                </form>
            </div>
            <div class="toast style_toast d-none">
                <div class="toast-header header_padding_toast">
                    <strong class="me-auto style_flex">
                        <i class="fas fa-exclamation-circle text-danger font_22"></i>
                        <div v-if="errorInput" class="m-0 ms-2 font_15 text-danger">
                            <p v-for="(ers) in errorInput" :key="ers"> 
                            {{ ers.message }}
                            </p>
                        </div>
                        <div v-if="title_rule" class="m-0 ms-2 font_15 text-danger">
                            {{ title_rule }}
                        </div>
                    </strong>
                    <button type="button" class="ms-2 mt-1 mb-0 close a_close" data-bs-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true" class="text-danger">&times;</span>
                    </button>
                </div>
            </div>
            <!-- ========= modal photo =========== -->
            <div class="modal" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="photos" aria-hidden="true" >
                <div class="modal-dialog" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                    <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                        <div class=" content_">
                            <div class=" pb-3 mb-2 bg_border">
                                <NuxtLin v-if="getPersonal.photo" @click="viewprofile" data-bs-dismiss="modal" class="bt pt-3 mb-3 btn custom_btn_ full_width  pb-0  text-primary fn_20">
                                    <strong>{{ $t('message.the_view') }}</strong>
                                </NuxtLin>
                                <NuxtLin v-if="tmp_file1" @click="viewprofile" data-bs-dismiss="modal" class="bt pt-3 mb-3 btn custom_btn_ full_width  pb-0  text-primary fn_20">
                                    <strong>{{ $t('message.the_view') }}</strong>
                                </NuxtLin>
                                <NuxtLink @click="show_brows" data-bs-dismiss="modal" class="bt pt-3 mb-3 btn custom_btn_ full_width  pb-0  text-primary fn_20">
                                    <strong>{{ $t('resume_cv.change') }}</strong>
                                </NuxtLink>
                                <NuxtLink  @click="removePhoto" data-bs-dismiss="modal" class="bt btn custom_btn_ full_width  pt-3 text-danger fn_20">
                                    <strong>{{ $t('resume_cv.remove') }}</strong>
                                </NuxtLink>
                            </div>
                            <NuxtLink class="bt btn custom_btn_ full_width pb-5 pt-4 mb-2 bg-borber-fn" data-bs-dismiss="modal"><strong>{{ $t('resume_cv.cancel') }}</strong></NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- modal Choose Multiple locations -->
            <div  class="modal w-100 vh-100 bg-white" id="locations" aria-hidden="true"  tabindex="-1" >
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="_div_nav bg_app_bar_header_ fix_app_bar">
                            <!-- back locations -->
                            <div v-if="type_loc" class="_pad_col_icon">
                                <button @click="click_black_loc" class="btn back-btn-app-bar">
                                    <i class="ion-ios-arrow-back font_click_back"></i>
                                </button>
                            </div>
                            <!-- close modal -->
                            <div v-else id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                                <button @click="close" class="btn clear-btn-app-bar">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col p_pad_title">
                                <div class="text-center">
                                    <h1 class="name_style truncate pt-1 pb-1">
                                        <template v-if="type_loc === 'district'">{{ $t('new_text_3.khan_or_district') }}</template>
                                        <template v-else-if="type_loc === 'commune'">{{ $t('new_text_3.sangkat_or_commune') }}</template>
                                        <template v-else>{{ $t('new_text_3.city_or_province') }}</template>
                                    </h1>
                                </div>
                            </div>
                            <div class="_pad_col_icon">
                                <button @click="clear_filter" class="btn text-white p_pad_clear">{{ $t('message.clear') }}</button>
                            </div>
                        </div>
                        <!-- modal body -->
                        <div class="modal-body" :class="isDesktop ? 'de-head-quick_chat' : 'p-0 m_bottom_app_bar'">
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
                        </div>
                    </div>
                </div>
            </div> 
            <div class="modal fade " id="locations1" tabindex="-1"  aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                    <div class="modal-content rounded">
                        <div class="modal-header m_h_p">
                            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                            <!-- back locations -->
                            <div v-if="type_loc" class="_pad_col_icon">
                                <button @click="click_black_loc" class="btn back-btn-app-bar">
                                    <i class="ion-ios-arrow-back font_click_back"></i>
                                </button>
                            </div>
                            <!-- close modal -->
                            <div v-else id="close_modal_query_str" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                                <button @click="close" class="btn clear-btn-app-bar">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col text-center">
                                <p class="name_style truncate_wrap m-0">
                                    <template v-if="type_loc === 'district'">{{ $t('new_text_3.khan_or_district') }}</template>
                                    <template v-else-if="type_loc === 'commune'">{{ $t('new_text_3.sangkat_or_commune') }}</template>
                                    <template v-else>{{ $t('new_text_3.city_or_province') }}</template>
                                </p>
                            </div>
                            <div class="_pad_col_icon">
                                <button  @click="clear_filter" class="btn clear s_pad_clear " >{{ $t('message.clear') }}​</button>
                            </div>
                        </div>
                        <div class="modal-body" :class="isDesktop ? 'de-head-quick_chat' : 'p-0'">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
 definePageMeta( {layout: "custom", middleware: "auth"} );
 import helper from "/helper";
import  en  from '@/locales/en.json'
import  km  from '@/locales/km.json'
const { locale } = useI18n();
const auth_user = useCookie('auth_user')
const router = useRouter()
const localePath = useLocalePath();
const phone = ref([""])
const phone_e = ref([""])
const isLoading = useState('isLoading')
isLoading.value = false
const getPersonal = ref('')
const f_name = ref('')
const l_name = ref('')
const getGender = ref('')
const getDob = ref(null)
const getNationality = ref('')
const getEmail = ref('')
const getAddress = ref('')
const getEducation = ref('')
const getPosition = ref('')
const getExperience = ref('')
const getMarital = ref('')
const locationID = ref('')
const aPhone = ref([''])
const loadindScreen = useState('loadindScreen')
loadindScreen.value = true
const ref_profile = ref('');
const ref_tmp = ref('');
const stepCookie = useCookie('stepCookie')
const reload_q_again_1 = ref(0);
// const isMobile = ref(false)
const isMobile= ref(helper.m_or_d())
// ================ upload photo =============
const tmp_file = ref('')
const tmp_file1 = ref('')
const loading = ref(false);
const loadings = ref(false);
const title_rule = ref('')
const toast_error_vali_show = ref([]);
const runtime_config = useRuntimeConfig();            // setup config env to config variable.
const config = runtime_config.public;
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'; 
const errorInput = ref('')
const errorPhone = ref('')
//   ========== location ================
const showPopup = ref(false)
const isDesktop = helper.check_is_desktop();   
const language = ref(locale.value === '/' ? 'en' : locale.value);
const auth = ref('');
const i = ref(0);
const locations = ref([]);     
const districts = ref([]);     
const communes = ref([]);       
const location = ref(null);
const district = ref(null);
const commune = ref(null);
const province_name = ref('');
const district_name = ref('');
const commune_name = ref('');
const def_lat = ref(0); 
const def_lng = ref(0); 
const def_zoom = ref(0);
const mul_arr_location = ref([]);
const type_loc = ref('');
const tmp_pro_N = ref('');  const tmp_pro_ID = ref('');
const tmp_dis_N = ref('');  const tmp_dis_ID = ref('');
const tmp_comm_N = ref(''); const tmp_comm_ID = ref('');
const old_arr_loc = ref({ loc: '', dis: '', com: '' });
const error_loc = ref(null);
const lat_lng_loc = ref('');
const arr_params = ref([]);  
const edit_con_to_post = ref(false);
const pa_con = helper.get_params_make_condition(); 
const headers = { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_user.value.tokens.access_token }
const formData = reactive({
    fname: f_name, 
    lname: l_name, 
    gender: getGender,
    dob: getDob ? getDob: null, 
    nationality: getNationality,
    email: getEmail, 
    phone: aPhone,  
    address: getAddress,
    education_level: getEducation,
    position: getPosition, 
    work_experience: getExperience,
    marital_status: getMarital,
    location: locationID
})
onMounted(()=>{
    autoScroll();
    show_validate();
    imageFile();
    if (process.client) {
        // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
        check_new_auth_user();
        arr_params.value = pa_con && pa_con.params_optional && pa_con.params_optional.d_params ? pa_con.params_optional.d_params : [];
        if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); };
        when_edit(location.value, district.value); 
        get();
    }
    if(process.server){
        get();
    }
})
function autoScroll(){
    $(document).ready(function () {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = $(hash);
            if (targetElement.length) {
                $('html, body').animate({
                    scrollTop: targetElement.offset().top-150,
                }, 'slow');
            }
            $(hash).css({"color": "#f58800"});
            if($(hash).find('input').length) $(hash).find('input').focus();
            if($(hash).find('select').length) $(hash).find('select').focus();
            if($(hash).find('.label').length) $(hash).find('.label').css({"color": "#f58800 "});
        }
    });
}
useHead({
        title: 'Personal Details - khmer24.com',
    })
function show_validate(){
    $(document).ready(function () {
        jQuery.validator.addMethod("phoneKM", function(phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length >= 9 && 
            phone_number.match(/0[1-9]{1}[0-9]{7,8}/);
        }, "Valid phone number");
        var $form = $("form");
        $form.validate({
            rules: {
                fname: { required: true, minlength: 2},
                lname: { required: true, minlength: 2 },
                email: { required: false, email:true },
                phone:{ required: true, phoneKM: true, },
                phone_1:{ required: false, phoneKM: true, },
                phone_2:{ required: false, phoneKM: true,  },
                work_experience:{ required: false, maxlength: 1  },
            },
            messages: {
                fname: {required: locale.value === 'km' ? km.message_er.f_name : en.message_er.f_name,
                            minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2
                        },
                lname: {required: locale.value === 'km' ? km.message_er.l_name : en.message_er.l_name,
                        minlength: locale.value === 'km' ? km.message_er.minlength_2 : en.message_er.minlength_2
                        },
                email: { email: locale.value === 'km' ? km.message_er.email : en.message_er.email, },
                phone: { required: locale.value === 'km' ? km.message_er.phone_1 : en.message_er.phone_1,
                         phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, 
                        },
                phone_1: { phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, },
                phone_2: { phoneKM: locale.value === 'km' ? km.message_er.phone : en.message_er.phone, },
                work_experience: { maxlength: locale.value === 'km' ? km.message_er.maxlength_1 : en.message_er.maxlength_1, }
            },
            submitHandler: () => {
                saveData()
            }
        });  
    });
}

// ===============get data =================
function get(){
    check_new_auth_user();
    $fetch(config.VUE_APP_API_URL_JOB+'me/resume/personal_details',{
        headers: { "Access-Token": auth.value.tokens.access_token }
    }).then(res=>{
        loadindScreen.value = false
        const result = res
        getPersonal.value = result.data
        f_name.value = getPersonal.value.first_name
        l_name.value = getPersonal.value.last_name
        if( getPersonal.value.gender){
            getGender.value = getPersonal.value.gender.value
        }else{
            getGender.value = getPersonal.value.gender
        }
        getDob.value = getPersonal.value.dob ? new Date(String(  getPersonal.value.dob)) : null;
        getNationality.value = getPersonal.value.nationality
        getEmail.value = getPersonal.value.email
        aPhone.value = []
        phone.value = []
        getPersonal.value.phone.forEach(ph => {
            aPhone.value.push(ph)
            phone.value.push(ph)
        });
        getAddress.value = getPersonal.value.address
        if(getPersonal.value.education_level){
            getEducation.value = getPersonal.value.education_level.value
        }else{
            getEducation.value = getPersonal.value.education_level
        }
        getPosition.value = getPersonal.value.position
        getExperience.value = getPersonal.value.work_experience
        if(getPersonal.value.marital_status){
            getMarital.value = getPersonal.value.marital_status.value
        }else{
            getMarital.value = getPersonal.value.marital_status
        }
        province_name.value = locale.value === 'km' ? getPersonal.value.location.province.km_name : getPersonal.value.location.province.en_name
        district_name.value = locale.value === 'km' ? getPersonal.value.location.district.km_name : getPersonal.value.location.district.en_name
        commune_name.value =  locale.value === 'km' ? getPersonal.value.location.km_name : getPersonal.value.location.en_name
        locationID.value = getPersonal.value.location.id
        
    }).catch(error=>{
        if (error.response && error.response.status === 401) {
            if (reload_q_again_1.value <= 2) {
                reload_q_again_1.value += 1;
                check_new_auth_user();
                get();
            } else {
                localStorage.removeItem('auth_user');   // remove localStorage
                router.replace(localePath({ name: 'index' }));
            }
        }
    })
}

// =========== add more field phone numbers ============
function add_field_phone_number() {
  phone.value.push("");
  if (phone.value.length === 2) {
    setTimeout(function () {
      $("#phone2").focus();
    }, 500); 
  } else if (phone.value.length === 3) {
    setTimeout(function () {
      $("#phone3").focus();
    }, 500);
  }
}
function minus_field_phone(index) {
    formData.phone.splice(index, 1);
    phone.value.splice(index, 1);
}
function add_field_phone_number_e() {
    phone_e.value.push("");
  if (phone_e.value.length === 2) {
    setTimeout(function () {
      $("#phone2").focus();
    }, 500); 
  } else if (phone_e.value.length === 3) {
    setTimeout(function () {
      $("#phone3").focus();
    }, 500);
  }
}
function minus_field_phone_e(index) {
    phone_e.value.splice(index, 1);
}

function goBack() { 
        window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); 
        stepCookie.value = ' '
    }
// =============== form iput data =====================
const Error = ref('')
function saveData(){
    check_new_auth_user();
    isLoading.value = true
    const locationtest = ref('')
    const dob = ref('')
    if (formData.dob) { // clean dob_date to correct format
        let cl_date = new Date(formData.dob);
        let day = cl_date.getDate();
        let month = cl_date.getMonth() + 1;
        let year = cl_date.getFullYear();
        if (parseInt(day) < 10) day = '0' + day;
        if (parseInt(month) < 10) month = '0' + month;
        dob.value = year + '-' + month+ '-' + day; // ex: 2023-01-15
    }
    if(commune.value){
        locationtest.value = commune.value
    }else{
        locationtest.value = locationID.value
    }
    if(tmp_file.value || getPersonal.value.photo === ''){
        const data_input = {
            photo: tmp_file.value.file ? tmp_file.value.file:'',
            first_name: formData.fname,
            last_name: formData.lname,
            gender: formData.gender != undefined ? formData.gender:"",
            dob: dob.value != undefined ? dob.value:"",
            nationality: formData.nationality != undefined ? formData.nationality:"",
            email: formData.email != undefined ? formData.email:"",
            'phone[0]': formData.phone[0],
            'phone[1]': formData.phone[1] != undefined ? formData.phone[1]:"",
            'phone[2]': formData.phone[2] != undefined ? formData.phone[2]:"",
            location: locationtest.value != undefined ?  locationtest.value:"",
            address: formData.address != undefined ? formData.address:"",
            education_level: formData.education_level != undefined ? formData.education_level:"",
            position: formData.position ? formData.position:'',
            work_experience: formData.work_experience != undefined ? formData.work_experience:"",
            marital_status: formData.marital_status != undefined ? formData.marital_status:""
        }
        console.log(data_input)
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/personal_details', {
            method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token },
            body: new URLSearchParams(data_input)
        }).then(res=>{
            isLoading.value = false
            // if(getPersonal.value.first_name !== null){
            //     router.back()
            // }else{
            //     router.push(localePath({ name: 'account-resume' }));
            // }
            router.back();
        }).catch(er=>{
            isLoading.value = false
            let toast = $('.toast');
            toast.removeClass('d-none');
            toast.toast({ delay: 10000 });
            toast.toast('show');
            errorInput.value = er.data.errors
            if(errorInput.value.email){
                $(".email").css('border', 'solid 1px red');
                $(".email").focus()
            }else{
                $(".email").css('border', 'solid 1px gray');
            }
            const key = 'phone[0]';
            const key1 = 'phone[1]';
            const key2 = 'phone[2]';
            if(errorInput.value[key]){
                $(".phone1").css('border', 'solid 1px red');
                $(".phone1").focus()
            }else{
                $(".phone1").css('border', 'solid 1px gray');
            }
            if(errorInput.value[key1]){
                $(".phone2").css('border', 'solid 1px red');
                $(".phone2").focus()
            }else{
                $(".phone2").css('border', 'solid 1px gray');
            }
            if(errorInput.value[key2]){
                $(".phone3").css('border', 'solid 1px red');
                $(".phone3").focus()
            }else{
                $(".phone3").css('border', 'solid 1px gray');
            }
        })
    }
    else if(getPersonal.value.photo != ''){
        const data_input = {
            first_name: formData.fname,
            last_name: formData.lname,
            gender: formData.gender != undefined ? formData.gender:"",
            dob: dob.value != undefined ? dob.value:"",
            nationality: formData.nationality != undefined ? formData.nationality:"",
            email: formData.email != undefined ? formData.email:"",
            'phone[0]': formData.phone[0],
            'phone[1]': formData.phone[1] != undefined ? formData.phone[1]:"",
            'phone[2]': formData.phone[2] != undefined ? formData.phone[2]:"",
            location: locationtest.value != undefined ?  locationtest.value:"",
            address: formData.address != undefined ? formData.address:"",
            education_level: formData.education_level != undefined ? formData.education_level:"",
            position: formData.position ? formData.position:'',
            work_experience: formData.work_experience != undefined ? formData.work_experience:"",
            marital_status: formData.marital_status != undefined ? formData.marital_status:""
        }
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/personal_details', {
            method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth.value.tokens.access_token },
            body: new URLSearchParams(data_input)
        }).then(res=>{
            isLoading.value = false
            // if(getPersonal.value.first_name !== null){
            //     router.back()
            // }else{
            //     router.push(localePath({ name: 'account-resume' }));
            // }
            router.back()
        }).catch(er=>{
            isLoading.value = false
            let toast = $('.toast');
            toast.removeClass('d-none');
            toast.toast({ delay: 10000 });
            toast.toast('show');
            errorInput.value = er.data.errors
            if(errorInput.value.email){
                $(".email").css('border', 'solid 1px red');
                $(".email").focus()
            }else{
                $(".email").css('border', 'solid 1px gray');
            }
            const key = 'phone[0]';
            const key1 = 'phone[1]';
            const key2 = 'phone[2]';
            if(errorInput.value[key]){
                $(".phone1").css('border', 'solid 1px red');
                $(".phone1").focus()
            }else{
                $(".phone1").css('border', 'solid 1px gray');
            }
            if(errorInput.value[key1]){
                $(".phone2").css('border', 'solid 1px red');
                $(".phone2").focus()
            }else{
                $(".phone2").css('border', 'solid 1px gray');
            }
            if(errorInput.value[key2]){
                $(".phone3").css('border', 'solid 1px red');
                $(".phone3").focus()
            }else{
                $(".phone3").css('border', 'solid 1px gray');
            }
        })
    }
}
// =============== upload photo==================
function show_brows() {
    $('.brows_file div input[type=file]').click();      // click direct file profile
}
function viewprofile(){
    if(getPersonal.value.photo){
        ref_profile.value.click();
    }else{
        ref_tmp.value.click();
    } 
}
function imageFile() {
    check_new_auth_user();
    var max_size = 30;
    var uploader1 = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'pickfiles', // you can pass an id...
        // url : config.VUE_APP_API_URL_JOB+'me/resume/photo',
        url: config.VUE_APP_API_URL_ME+'upload',
        flash_swf_url : 'plupload-2.3.9/Moxie.swf',
        silverlight_xap_url : 'plupload-2.3.9/Moxie.xap',
        multi_selection: false, 
        max_file_size : max_size+'mb',
        chunk_size: '1mb',
        // resize : { width : 200, height : 200, quality : 100,crop: true },
        unique_names : true,
        resize : { width : 1500, height : 1400, quality : 100, crop: false },
        filters : {
            // max_file_size : '20mb',
            mime_types: [
            {title : "Image files", extensions : "jpg,gif,png,jpeg"},
            // {title : "Zip files", extensions : "zip"}
            ],
            check_image_size: 100
        },
        headers: { "Access-Token": auth.value.tokens.access_token },
    });
    uploader1.init();
    uploader1.bind('FilesAdded', (up, files) => {
        loadings.value = true;
        uploader1.start();
    });
    uploader1.bind("Error", function (up, err) {
        // console.log(err)  រូបភាពមានទំហំធំជាង(10MB)មិនអាចបញ្ចូលបានទេ
        loadings.value = false;
        if (err.code === -600) {
            title_rule.value = locale.value === 'km' ? 'រូបភាពមានទំហំធំជាង(30MB)មិនអាចបញ្ចូលបានទេ' : 'File size Error, Max file size 30MB';
        } else if (err.code === -601) {
            title_rule.value = 'Wrong file extension, Support only: jpg,png,jpeg';
        } else if (err.code === -200) {
            title_rule.value = 'Please Check your internet connection';
        } else {
            title_rule.value = 'You must to login first before upload your CV';
        }
        $('#btn_attach_file').css('display','block'); 
        toast_error_vali_show.value = [];
        let toast = $('.toast');
        toast.removeClass('d-none');
        toast.toast({ delay: 7000 });
        toast.toast('show');
        uploader1.refresh();
    });
    uploader1.bind('UploadComplete', function(upldr, file) {
        uploader1.splice();
        uploader1.refresh();
    });
    uploader1.bind('FileUploaded', (upldr, file, object) => {
        var myData;
        try {
            myData = object.response ? JSON.parse(object.response) : '';
        } catch(err) {
            myData = '(' + object.response + ')';
        }
        // tmp_file.value = { url: myData.data.thumbnail ,file: myData.data.file }
        tmp_file1.value = myData.data.thumbnail
        tmp_file.value = myData.data
        loadings.value = false;
        uploader1.refresh();
        getPersonal.value.photo = ''
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

// click remove photo 
function removePhoto(){
    getPersonal.value.photo = '';
    tmp_file.value = '';
    tmp_file1.value= '';
}

// =========== location =================
function check_new_auth_user() { auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
function choose_location(con) {
    if (window.navigator.onLine) {
       if(isMobile.value){
        $('#locations').modal('show')
       }else{
        $('#locations1').modal('show')
       }
        mul_arr_location.value = locations.value; 
        type_loc.value = '';
        tmp_pro_N.value = ''; tmp_pro_ID.value = '';
        tmp_dis_N.value = ''; tmp_dis_ID.value = '';
        tmp_comm_N.value = ''; tmp_comm_ID.value = '';
    } else {
        $('#modal_show_status_error_connection').modal('show');
    }
}
// ---- clear location when click clear ----
function close(){
    showPopup.value = false
}
function clear_filter() {
    location.value = '';
    district.value = '';
    commune.value = '';
    province_name.value = '';
    district_name.value = '';
    commune_name.value = '';
    // clear old data too
    old_arr_loc.value = { loc: '', dis: '', com: '' };
    locationID.value = ''
    if(isMobile.value){
        $('#locations').modal('hide');
    }else{
        $('#locations1').modal('hide');
    }

}
// ---- if have selected location show districts ----
function show_next_location(loc) {
    // console.log(loc);
    if (loc.type === 'province') {
        tmp_pro_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
        tmp_pro_ID.value = loc.id;
        show_change_data_location('', 'province', loc.slug); // get sub locations of this province.
        type_loc.value = 'district';
        if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.

    } else if (loc.type === 'district') {
        tmp_dis_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
        tmp_dis_ID.value = loc.id;
        show_change_data_location('', 'district', loc.slug); // get sub locations of this district.
        type_loc.value = 'commune';
        if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.

    } else {
        tmp_comm_N.value = language.value === 'km' ? loc.km_name : loc.en_name;
        tmp_comm_ID.value = loc.id;
        if (loc.map) lat_lng_loc.value = loc.map; // store lat lng location province.
    }

    // if select completed, must to store data old_array_location.
    if (tmp_pro_N.value && tmp_dis_N.value && tmp_comm_N.value) {
        province_name.value = tmp_pro_N.value;
        district_name.value = tmp_dis_N.value;
        commune_name.value = tmp_comm_N.value;
        location.value = tmp_pro_ID.value;
        district.value = tmp_dis_ID.value;
        commune.value = tmp_comm_ID.value;
        old_arr_loc.value = { loc: tmp_pro_ID.value, dis: tmp_dis_ID.value, com: tmp_comm_ID.value }
        // $('#locations').modal('hide');
        if(isMobile.value){
            $('#locations').modal('hide');
        }else{
            $('#locations1').modal('hide');
        }
        type_loc.value = '';
        show_last_lat_lng_from_location(lat_lng_loc.value);
    }
}
function click_black_loc() {
    if (type_loc.value === 'district') {
        mul_arr_location.value = locations.value;
        type_loc.value = '';
    } else if (type_loc.value === 'commune') {
        mul_arr_location.value = districts.value;
        type_loc.value = 'district';
    }
}
function show_last_lat_lng_from_location(lat_lng) {
    // -- show choose loc in modal google map --
    def_lat.value =  lat_lng ? lat_lng.x : '';
    def_lng.value = lat_lng ? lat_lng.y : '';
    def_zoom.value = lat_lng ? lat_lng.z : '';
}
// ---- if have selected location show districts ----
function show_change_data_location(l_event , condition, _slug_) {
    let type_slug = '';
    if (condition === 'province') {
        districts.value = [];        // clear data district
        communes.value = [];         // clear data commune
        type_slug = 'district';      // set type for request
    } else if (condition === 'district') {
        communes.value = [];         // clear data commune
        type_slug = 'commune';       // set type for request
    }
    // -- check is from select or from click on choose multiple locations --
    let slug_location = '';
    if (_slug_) { // click manually select locations
        slug_location = _slug_;
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
}
// show all location when edit
async function when_edit() {                   
    loading.value = true;
    await $fetch(config.VUE_APP_API_URL + 'locations', {      
        params: { lang: language.value, },
    }).then(res => {
        locations.value = res && res.data ? res.data : [];
    }).catch(error => {
        if (!error.response) {
            loading.value = false; 
            $('#modal_show_status_error_connection').modal('show'); 
        }
    }).finally(() => (loading.value = false));
}


</script>
