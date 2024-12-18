<template>
    <div>
        <div v-if="loadindScreen" class="loading_back_ground min_h">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div class="rs">
            <div v-if="isMobile && ['all_public_resume'].includes(pageType)" class="bg_app_bar_header_ h_all_resume d-flex justify-content-between" >
                <button @click="goBack" type="button" class="btn w_h_50px" aria-label="Back">
                    <i class="ion-android-arrow-back font_click_back"></i>
                </button>
                <div class="pl-0 l_h_con_title ">
                    <b>{{ $t('resume_cv.resume') }}</b>
                </div>
                <button type="button" class="btn w_h_50px cursor-pointer">
                    <div v-if="auth_user">
                        <div v-if="auth_user.user.id !== GetAll.userid" class="save_not" @click="save_ads(GetAll,GetAll.id,GetAll.saved)">
                            <i v-if="GetAll.saved" id="bookmak_save" class="fa fa-bookmark text-white p-2"></i>
                            <i v-else  class="far fa-bookmark text-white p-2" id="bookmak_not_save"></i>
                        </div>
                    </div>
                    <div v-if="!auth_user" class="save_not" @click="save_ads(GetAll,GetAll.id)">
                        <i class="far fa-bookmark text-white p-2"></i>
                    </div>
                </button>
            </div>
            <div v-if="['edit','resume_me','view'].includes(pageType) && isMobile">
                <div v-if="stepCookie !== 'step'" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                    <div class="_div_nav bg_app_bar_header_">
                        <div @click="router.back()" class="_pad_col_icon">
                            <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                                <i class="ion-android-arrow-back font_click_back"></i>
                            </button>
                        </div>
                        <div class="col ps-0 l_h_con_title">
                            <p v-if="['resume_me'].includes(pageType)" class="name_style truncate_wrap mb-0 ms-2 text-start">
                            {{ $t('resume_cv.resume') }}
                            </p>
                            <p v-if="['edit'].includes(pageType)" class="name_style truncate_wrap mb-0 ms-2 text-start">
                            {{ $t('resume_cv.review_and_apply') }}
                            </p>
                        </div>
                        <div v-if="['resume_me'].includes(pageType) && GetAll" class="p-2 me-2 text-end">
                            <a rel="nofollow" aria-label="profile" ref="ref_profile1" v-if="pdfFilePath" v-bind:href=" pdfFilePath" target="_blank"></a>
                            <img @click="downloadPDF" :src="asset_url+'icon/resume.png'" alt="download" width="30px">
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
                            <p class="name_style truncate_wrap mb-0 ms-2 text-start">
                                {{ $t('resume_cv.step_2') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="['edit','resume_me','detail_apply','all_public_resume','view','send_message','chat_send_resume'].includes(pageType)">
                <div v-if="GetAll" class="content-resume min-vh-100 position-position" :class="isMobile ? '' : 'mt-30'"> 
                    <div>
                        <div v-if="['edit'].includes(pageType)" class="mt_50">
                            <div class="personal bg-white ps-3 pe-3 pb-3 pt-2 mb-2" id="f_s">
                                <div class="fn_18 mb_12"><strong>{{ locale==='km' ? 'ដាក់ពាក្យសម្រាប់' : 'Apply for' }}</strong></div>
                                <div class="d-flex" >
                                    <img v-bind:src="cookieJOB.thumbnail ? cookieJOB.thumbnail : empty_img_post" alt="job" @error="imageUrlAlt_post" :class="isMobile ? 'thumbnail_job' : 'dt_thumbnail_job'">
                                    <div :class="isMobile ? 'ms-2 ' : 'ms-3 fn_20'">
                                        <div>{{ cookieJOB.title }}</div>
                                        <b class="text-red">${{ convert_price(cookieJOB.price) }}+</b>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div  v-if="['detail_apply'].includes(pageType)" >
                            <div v-if="get_data_id && get_data_id.post" class="a_p_parent_con content-resume mb-2" >
                                <div class="fn_18 mb_12"><strong>{{ locale==='km' ? 'ដាក់ពាក្យសម្រាប់' : 'Apply for' }}</strong></div>
                                <NuxtLink tag="a" :to="localePath({ name: 'title-adid-id', params: { title: get_data_id.post.title ? check_title_char(get_data_id.post.title) : '.', id: get_data_id.post.id } })"
                                            class="col _flex_ a_p_content_post p-0" @click="action_edit('show_modal_detail')">
                                    <img v-bind:src="get_data_id.post.logo ? get_data_id.post.logo : empty_img_post"
                                        :alt="get_data_id.post.title ? get_data_id.post.title : ''" @error="imageUrlAlt_post" width="65px" height="65px">
                                    <span class="ms-2">
                                        <p class="the_title_1 truncate">{{ get_data_id.post.title ? get_data_id.post.title : '' }}</p>
                                        <p class="the_title_2 truncate text-secondary">Apply Date: {{ date_formats2(get_data_id.apply_date ? get_data_id.apply_date : '') }}</p>
                                        <p class="the_title_2 truncate">{{ get_data_id.post.type ? get_data_id.post.type : '' }} <span class="text-secondary">•<strong class="text-red"> ${{  convert_price(get_data_id.post.salary ? get_data_id.post.salary : '') }}+</strong></span></p>
                                    </span>
                                    <i class="ion-ios-arrow-forward"></i>
                                </NuxtLink>
                            </div>
                        </div>
                        

                        <!-- ====================================================Start personal details ======================================= -->
                        <div v-if="['resume_me','all_public_resume','view','send_message','chat_send_resume'].includes(pageType)" class="mt_50">
                            <div v-if="!isMobile && ['all_public_resume'].includes(pageType)" class="fs-5 fw-semibold d_h">
                                <div>{{ $t('resume_cv.resume') }}</div>
                                <div v-if="auth_user" class="ms-auto cursor-pointer">
                                    <div v-if="auth_user.user.id !== GetAll.userid"  @click="save_ads(GetAll,GetAll.id,GetAll.saved)">
                                        <i v-if="GetAll.saved" id="bookmak_save" class="fa fa-bookmark k24-color p-2"></i>
                                        <i v-else  class="far fa-bookmark p-2" id="bookmak_not_save"></i>
                                    </div>
                                </div>
                                <div v-if="!auth_user" class="ms-auto cursor-pointer" @click="save_ads(GetAll,GetAll.id)">
                                    <i class="far fa-bookmark p-2"></i>
                                </div>
                            </div>
                        </div>
                        <div v-if="['edit','resume_me','detail_apply','all_public_resume','view','send_message','chat_send_resume'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="personal bg-white p-3 pt-3 mb-2 min_h_19" id="f_s">
                            <div v-if="['send_message'].includes(pageType) && !isMobile" class="dt_title_header px-0 pt-0 mb-3"><h1>{{ locale==='km' ? 'ពិនិត្យមើលប្រវត្ដិរូបសង្ខេប (CV)' : 'Review resume (CV)' }}</h1></div>
                            <div v-if="['resume_me'].includes(pageType) && !isMobile" class="dt_title_header px-0 pt-0 mb-3">
                                <div class="d-flex w-100 align-items-center">
                                    <h1>{{ $t('resume_cv.resume') }}</h1>
                                    <div class="ms-auto">
                                        <a rel="nofollow" aria-label="profile" ref="ref_profile1" v-if="pdfFilePath" v-bind:href=" pdfFilePath" target="_blank"></a>
                                        <i @click="downloadPDF" class="bi bi-cloud-arrow-down-fill me-0 a-color overide_cursor_pointer" style="font-size: 30px;"></i>
                                    </div>
                                </div>
                            </div>
                            <div v-if="['edit','resume_me','detail_apply','view','send_message','chat_send_resume'].includes(pageType)" class="photo_cv" id="profile">
                                <div v-if="GetAll.personal_details">
                                    <a rel="nofollow" aria-label="profile" ref="ref_profile" v-if="GetAll.personal_details.photo" :href="GetAll.personal_details.photo.url" data-fancybox>
                                        <div v-if="['edit','resume_me','detail_apply','view','send_message','chat_send_resume'].includes(pageType)">
                                            <img v-if="GetAll.personal_details.photo" :src="GetAll.personal_details.photo.url" :alt="GetAll.personal_details.name" class="image" >
                                        </div>
                                    </a>
                                    <div v-else class="bg-image">
                                        <i class=" fas fa-user-alt fn_50"></i>
                                        <div class="ps-1 fn_18">3 X 4</div>
                                    </div>
                                </div>
                                <div v-else class="bg-image">
                                    <i class=" fas fa-user-alt fn_50"></i>
                                    <div class="ps-1 fn_18">3 X 4</div>
                                </div>
                            </div>

                            <div v-if="GetAll.personal_details">
                                <div v-if="GetAll.personal_details.photo">
                                    <div v-if="['all_public_resume'].includes(pageType)" class="photo_cv" id="profile">
                                        <div>
                                            <a rel="nofollow" aria-label="profile" ref="ref_profile" @click="click_img(GetAll.id)" v-if="GetAll.personal_details.photo" :href="GetAll.personal_details.photo.url" data-fancybox>
                                                <div>
                                                    <img :src="image_pro.url" alt="profile" class="image" >
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-2" id="name_with_posistion_experince" >
                                <h1 class="fn_20 mb-0" v-if="GetAll.personal_details"><strong>{{ GetAll.personal_details.name }}</strong></h1>
                                <h1 class="fn_20 mb-0" v-else><strong>{{ GetAll.name }}</strong></h1>
                                <div class="fn_15_mt_5"  v-if="GetAll.personal_details">
                                    {{ GetAll.personal_details.position }} 
                                    <span v-if="GetAll.personal_details">
                                        <span v-if="GetAll.personal_details.position && GetAll.personal_details.work_experience"> - </span> 
                                        <span v-if="GetAll.personal_details.work_experience">
                                            {{ locale === 'km' ? 'បទពិសោធន៍ '+GetAll.personal_details.work_experience+ ' ឆ្នាំ' :  GetAll.personal_details.work_experience+ ' years experience' }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex gender f_c mb-1" id="gender">
                                <i class="fas fa-transgender-alt  pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="GetAll.personal_details.gender">
                                        <div v-if="GetAll.personal_details.gender.value === 'm'">{{ $t('resume_cv.m') }}</div>
                                        <div v-if="GetAll.personal_details.gender.value === 'f'">{{ $t('resume_cv.f') }}</div>
                                    </div>
                                    <div v-else class="text-secondary">{{ $t('resume_cv.gender') }}: {{ $t('resume_cv.na') }}</div>
                                </div>
                                <div v-else class="text-secondary">{{ $t('resume_cv.gender') }}: {{ $t('resume_cv.na') }}</div>
                            </div>
                            <div v-if="['all_public_resume','chat_send_resume'].includes(pageType)" class="d-flex gender f_c " id="gender">
                                <div v-if="GetAll.personal_details.gender" class="d-flex mb-1">
                                    <i class="fas fa-transgender-alt  pt-1"></i>
                                    <div v-if="GetAll.personal_details.gender">
                                        <div v-if="GetAll.personal_details.gender.value === 'm'">{{ $t('resume_cv.m') }}</div>
                                        <div v-if="GetAll.personal_details.gender.value === 'f'">{{ $t('resume_cv.f') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div  v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex dob f_c mb-1" id="date_of_birth">
                                <i class="fas fa-calendar-alt  pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="!GetAll.personal_details.dob" class="text-secondary">{{ $t('resume_cv.dob') }}: {{ $t('resume_cv.na') }}</div>
                                    <div v-else>{{ date_formats1(GetAll.personal_details.dob) }}</div>
                                </div>
                                <div v-else class="text-secondary">{{ $t('resume_cv.dob') }}: {{ $t('resume_cv.na') }}</div>
                            </div>
                            <div v-if="['chat_send_resume'].includes(pageType)" class="d-flex dob f_c " id="dob">
                                <div v-if="GetAll.personal_details.dob" class="d-flex mb-1">
                                    <i class="fas fa-calendar-alt  pt-1"></i>
                                    <div v-if="GetAll.personal_details">
                                        <div v-if="!GetAll.personal_details.dob" class="text-secondary">{{ $t('resume_cv.dob') }}: {{ $t('resume_cv.na') }}</div>
                                        <div v-else>{{ date_formats1(GetAll.personal_details.dob) }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex nationlity f_c mb-1" id="nationality">
                                <i class="fas fa-globe pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="!GetAll.personal_details.nationality" class="text-secondary">{{ $t('resume_cv.nationality') }}: {{ $t('resume_cv.na') }}</div>
                                    <div v-else>{{ GetAll.personal_details.nationality }}</div>
                                </div>
                                <div v-else class="text-secondary">{{ $t('resume_cv.nationality') }}: {{ $t('resume_cv.na') }}</div>
                            </div>
                            <div v-if="['chat_send_resume','all_public_resume'].includes(pageType)" class="d-flex nationality f_c " id="nationality">
                                <div v-if="GetAll.personal_details.nationality" class="d-flex mb-1">
                                    <i class="fas fa-globe pt-1"></i>
                                    <div v-if="GetAll.personal_details">
                                        <div v-if="!GetAll.personal_details.nationality" class="text-secondary">{{ $t('resume_cv.nationality') }}: {{ $t('resume_cv.na') }}</div>
                                        <div v-else>{{ GetAll.personal_details.nationality }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex f_c phone mb-1" id="phone w_75">
                                <i class="fas fa-phone-alt  pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="GetAll.personal_details.phone">
                                        <span v-for="(ph,index) in GetAll.personal_details.phone" :key="ph">
                                            <span v-if="index > 0">, </span>
                                            <a class="text_color" :href="'tel:'+ph">{{ ph }}</a>
                                        </span>
                                    </div>
                                    <div v-else class="text-secondary">{{ $t('resume_cv.phone') }}: {{ $t('resume_cv.na') }}</div>
                                </div>
                                <div v-else >
                                    <div v-if="GetAll.phone">
                                        <span v-for="(ph,index) in GetAll.phone" :key="ph">
                                            <span v-if="index > 0">, </span>
                                            <a class="text_color" :href="'tel:'+ph">{{ ph }}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="['chat_send_resume'].includes(pageType)" class="d-flex f_c phone w_75" id="phone">
                                <div v-if="GetAll.personal_details && GetAll.personal_details.phone" class="d-flex mb-1">
                                    <i class="fas fa-phone-alt  pt-1"></i>
                                    <div>
                                        <span v-for="(ph,index) in GetAll.personal_details.phone" :key="ph">
                                            <span v-if="index > 0">, </span>
                                            <a class="text_color" :href="'tel:'+ph">{{ ph }}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div  v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex f_c email mb-1" id="email">
                                <i class="fa fa-envelope  pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="!GetAll.personal_details.email" class="text-secondary">{{ $t('resume_cv.email') }}: {{ $t('resume_cv.na') }}</div>
                                    <a  v-else class="text_color" :href="'mailto:'+GetAll.personal_details.email">{{ GetAll.personal_details.email }}</a>
                                </div>
                                <div v-else>
                                    <div v-if="!GetAll.email" class="text-secondary">{{ $t('resume_cv.email') }}: {{ $t('resume_cv.na') }}</div>
                                    <a  v-else class="text_color" :href="'mailto:'+GetAll.email">{{ GetAll.email }}</a>
                                </div>
                            </div>
                            <div v-if="['chat_send_resume'].includes(pageType)" class="d-flex gender f_c " id="email">
                                <div v-if="GetAll.personal_details.email" class="d-flex mb-1">
                                    <i class="fa fa-envelope  pt-1"></i>
                                    <div v-if="GetAll.personal_details">
                                        <div v-if="!GetAll.personal_details.email" class="text-secondary">{{ $t('resume_cv.email') }}: {{ $t('resume_cv.na') }}</div>
                                        <a  v-else class="text_color" :href="'mailto:'+GetAll.personal_details.email">{{ GetAll.personal_details.email }}</a>
                                    </div>
                                </div>
                            </div>
                            <div v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex f_c education_level mb-1">
                                <i class="fas fa-graduation-cap  pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div  v-if="GetAll.personal_details.education_level">{{ GetAll.personal_details.education_level.value }}</div>
                                    <div v-else class="text-secondary">{{ $t('resume_cv.education_level') }}: {{ $t('resume_cv.na') }}</div>
                                </div>
                                <div v-else class="text-secondary">{{ $t('resume_cv.education_level') }}: {{ $t('resume_cv.na') }}</div>
                            </div>
                            <div v-if="['chat_send_resume','all_public_resume'].includes(pageType)" class="d-flex education_level f_c" id="education_level">
                                <div v-if="GetAll.personal_details.education_level" class="d-flex  mb-1">
                                    <i class="fas fa-graduation-cap  pt-1"></i>
                                    <div v-if="GetAll.personal_details">
                                        <div  v-if="GetAll.personal_details.education_level">{{ GetAll.personal_details.education_level.value }}</div>
                                        <div v-else class="text-secondary">{{ $t('resume_cv.education_level') }}: {{ $t('resume_cv.na') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex marital_status f_c mb-1" id="marital_status">
                                <i><img :src="asset_url+'icon/ring.png'" alt="ring.png"  width="17px" height="17px"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="GetAll.personal_details.marital_status" >
                                        <div v-if="GetAll.personal_details.marital_status.value === 'single'">{{ $t('resume_cv.single') }}</div>
                                        <div v-if="GetAll.personal_details.marital_status.value === 'married'">{{ $t('resume_cv.married') }}</div>
                                        <div v-if="GetAll.personal_details.marital_status.value === 'divorced'">{{ $t('resume_cv.divorced') }}</div>
                                    </div>
                                    <div v-else class="text-secondary">{{ $t('resume_cv.marital_status') }}: {{ $t('resume_cv.na') }}</div>
                                </div>
                                <div v-else class="text-secondary">{{ $t('resume_cv.marital_status') }}: {{ $t('resume_cv.na') }}</div>
                            </div>
                            <div v-if="['chat_send_resume','all_public_resume'].includes(pageType)" class="d-flex marital_status f_c " id="marital_status">
                                <div v-if="GetAll.personal_details.marital_status" class="d-flex mb-1">
                                    <i><img :src="asset_url+'icon/ring.png'" alt="ring.png" width="17px" height="17px"></i>
                                    <div v-if="GetAll.personal_details">
                                        <div v-if="GetAll.personal_details.marital_status" >
                                            <div v-if="GetAll.personal_details.marital_status.value === 'single'">{{ $t('resume_cv.single') }}</div>
                                            <div v-if="GetAll.personal_details.marital_status.value === 'married'">{{ $t('resume_cv.married') }}</div>
                                            <div v-if="GetAll.personal_details.marital_status.value === 'divorced'">{{ $t('resume_cv.divorced') }}</div>
                                        </div>
                                        <div v-else class="text-secondary">{{ $t('resume_cv.marital_status') }}: {{ $t('resume_cv.na') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div  v-if="['edit','resume_me','detail_apply','view','send_message'].includes(pageType)" class="d-flex location f_c mb-1" id="location" >
                                <i class="fas fa-map-marker-alt  pt-1"></i>
                                <div v-if="GetAll.personal_details">
                                    <div v-if="GetAll.personal_details.location">
                                        {{ locale === 'km' ? GetAll.personal_details.location.km_name : GetAll.personal_details.location.en_name }},
                                        <span v-if="GetAll.personal_details.location.district">{{ locale === 'km' ? GetAll.personal_details.location.district.km_name : GetAll.personal_details.location.district.en_name }}, </span>
                                        <span v-if="GetAll.personal_details.location.province">{{ locale === 'km' ? GetAll.personal_details.location.province.km_name : GetAll.personal_details.location.province.en_name }} </span>
                                    </div>
                                    <div v-else class="text-secondary">{{ $t('resume_cv.location') }}: {{ $t('resume_cv.na') }}</div>
                                </div>
                                <div v-else class="text-secondary">{{ $t('resume_cv.location') }}: {{ $t('resume_cv.na') }}</div>
                            </div>
                            <div v-if="['chat_send_resume','all_public_resume'].includes(pageType)" class="d-flex location f_c " id="location">
                                <div v-if="GetAll.personal_details.location" class="d-flex mb-1">
                                    <i class="fas fa-map-marker-alt  pt-1"></i>
                                    <div v-if="GetAll.personal_details">
                                        <div v-if="GetAll.personal_details.location">
                                            {{ locale === 'km' ? GetAll.personal_details.location.km_name : GetAll.personal_details.location.en_name }},
                                            <span v-if="GetAll.personal_details.location.district">{{ locale === 'km' ? GetAll.personal_details.location.district.km_name : GetAll.personal_details.location.district.en_name }}, </span>
                                            <span v-if="GetAll.personal_details.location.province">{{ locale === 'km' ? GetAll.personal_details.location.province.km_name : GetAll.personal_details.location.province.en_name }} </span>
                                        </div>
                                        <div v-else class="text-secondary">{{ $t('resume_cv.location') }}: {{ $t('resume_cv.na') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="GetAll.personal_details">
                                <div v-if=" GetAll.personal_details.address" class="d-flex gender f_c mb-1" id="address">
                                    <i class="fas fa-transgender-alt text-white pt-1"></i>
                                    {{ GetAll.personal_details.address }}
                                </div>
                            </div>
                            <NuxtLink @click="clearDL()" class="btn btn-k24-primary-light mt-2" :class="isMobile ? 'pt-12 btn-height' : 'dt-btn-height'" v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-personal_details' })"  >
                                {{ $t('resume_cv.edit_personal') }}
                            </NuxtLink>
                        </div>
                        <div v-if="['all_public_resume'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="preference bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.preference') }}</strong></h2>
                            <div v-if="!GetAll.preference" class="text-secondary mb-3 bt-style f_c pt-3">
                                {{ $t('resume_cv.text_preference') }}
                            </div>
                            <div v-else class="f_c" >
                                <div class="pt-3 pb-3 bt-style">
                                    <span  class="text-slat">{{ $t('resume_cv.preferred_position') }}</span><br>
                                    <b v-if="GetAll.preference.position">{{ GetAll.preference.position }}</b>
                                    <b v-else>{{ $t('resume_cv.not_define') }}</b>
                                </div>
                                <div class="pt-3 pb-3 bt-style">
                                    <span  class="text-slat">{{ $t('resume_cv.category') }}</span><br>
                                    <b v-if="GetAll.preference.category"><span  v-for="(val,index) in GetAll.preference.category" :key="val" ><span v-if="index > 0">, </span><span>{{ locale === 'km' ? val.km_name : val.en_name }}</span></span></b>
                                    <b v-else>{{ $t('resume_cv.not_define') }}</b>
                                </div>
                                <div class="pt-3 pb-3 bt-style">
                                    <span  class="text-slat">{{ $t('resume_cv.location') }}</span><br>
                                    <b v-if="GetAll.preference.location"><span  v-for=" ( val,index ) in GetAll.preference.location" :key="val"><span v-if="index > 0">, </span><span>{{ locale === 'km' ? val.km_name : val.en_name }}</span></span></b>
                                    <b v-else >{{ $t('resume_cv.not_define') }}</b>
                                </div>
                                <div class="pt-3 pb-3 bt-style">
                                    <span class="text-slat">{{ $t('resume_cv.job_type') }}</span><br>
                                    <b v-if="GetAll.preference.job_type"><span  v-for="(val,index) in GetAll.preference.job_type" :key="val" ><span v-if="index > 0">, </span><span>{{val.title}}</span></span></b>
                                    <b v-else >{{ $t('resume_cv.not_define') }}</b>
                                </div>
                            </div>
                        </div>
                        <div  v-if="Sugges" id="f_s">
                            <div v-if="['edit','resume_me','send_message'].includes(pageType)">
                                <div v-if="Sugges.total > Sugges.current "  :class="isMobile ? '' : 'b-radius'" class="bg-white p-3 pb-1 mb-2">
                                <div  v-if="Sugges.total > Sugges.current">
                                    <h2 class="f_s_h mb-3"><strong>{{ $t('resume_cv.complet_profile') }}</strong></h2>
                                    <div class="mb-1">{{ Completed }}% {{ $t('resume_cv.completed') }}</div>
                                    <div id="bgH1">
                                        <div id="myH1" :style="{ width: Completed + '%' }" :class="Completed <= 50 ? 'bg-red' : ( Completed < 70 ? 'bg-orange' : ( Completed < 85 ? 'bg-yellow' : 'bg-blue' ) )"></div>      
                                    </div>
                                </div>
                                <div class="mt-2 group-click">
                                    <div v-for="val in Sugges.suggestions" :key="val" class="mt_mr">
                                        <NuxtLink v-if="val.type === 'attachment'" @click="clickScroll" class="cursor-pointer">
                                            <div id="progress">
                                                <i class="fa fa-plus-circle"></i> <span>{{ $t('new_text_1.attach') }}</span>
                                            </div>
                                        </NuxtLink>
                                        <NuxtLink v-else :to="localePath({ name: 'account-resume' })+'/'+val.type+'#'+val.field" @click="clearDL()" class="cursor-pointer">
                                            <div v-if="val.name === 'Photo'" id="progress_w_110"><i class="fa fa-plus-circle" ></i> {{ $t('resume_cv.photo') }}</div>
                                            <div v-if="val.name === 'Gender'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.gender') }}</div>
                                            <div v-if="val.name === 'Dob'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.dob') }}</div>
                                            <div v-if="val.name === 'Nationality'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.nationality') }}</div>
                                            <div v-if="val.name === 'Email'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.email') }}</div>
                                            <div v-if="val.name === 'Location'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.location') }}</div>
                                            <div v-if="val.name === 'Address'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.address') }}</div>
                                            <div v-if="val.name === 'Education level'" id="progress_w_150"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.education_level') }}</div>
                                            <div v-if="val.name === 'Position'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.position') }}</div>
                                            <div v-if="val.name === 'Work experience'" id="progress_w_150"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.experience_year') }}</div>
                                            <div v-if="val.name === 'Summary'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.summary') }}</div>
                                            <div v-if="val.name === 'Educations'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.education') }}</div>
                                            <div v-if="val.name === 'Experiences'" id="progress_w_150"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.experience') }}</div>
                                            <div v-if="val.name === 'Marital status'" id="progress_w_150"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.marital_status') }}</div>
                                            <div v-if="val.name === 'Skills'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.skill') }}</div>
                                            <div v-if="val.name === 'Hobbies'" id="progress_w_200"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.habbies') }}</div>
                                            <div v-if="val.name === 'Languages'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.language') }}</div>
                                            <div v-if="val.name === 'References'" id="progress_w_110"><i class="fa fa-plus-circle"></i> {{ $t('resume_cv.reference') }}</div>
                                        </NuxtLink>
                                    </div>
                                </div>
                                <div class="line-style"></div>
                            </div>
                            </div>
                            <!-- ==================================================== End personal details ======================================= -->
                        </div>

                        <!-- ========================================================== Start summary ================================================== -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="summary bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-summary' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.summary') }}</strong></h2>
                                <i v-if="!GetAll.summary" class="fa fa-plus-circle icon" id="btn_color"></i>
                                <i v-else class="fas fa-edit icon pl_17" id="btn_color"></i>
                            </nuxt-link>
                            <div v-if="!GetAll.summary" id="f_s" class="text-secondary mb-3 f_c bt-style pt-3">
                                {{ $t('resume_cv.text_summary') }}
                            </div>
                            <p v-else class="bt-style f_c pt-3 break_word" >{{ GetAll.summary }}</p>
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-summary' })" @click="clearDL()" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <span v-if="!GetAll.summary">
                                    <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_summary') }}
                                </span>
                                <span v-else>
                                    <i class="fas fa-edit"></i> 
                                    {{ $t('resume_cv.edit_summmary') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div v-if="['detail_apply','all_public_resume','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.summary" class="summary bg-white ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.summary') }}</strong></h2>
                                <p class="bt-style pt-3 f_c break_word" >{{ GetAll.summary }}</p>
                            </div>
                        </div>
                        <!-- ========================================================== End summary ================================================== -->

                        <!-- ========================================================== Start experiences ====================================================== -->
                        <div  v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="experience bg-white ps-3 pe-3 pt-3 pt mb-2">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-experiences' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.experience') }}</strong></h2>
                                <i class="fa fa-plus-circle icon" id="btn_color"></i>
                            </nuxt-link>
                            <div v-if="!GetAll.experiences" class="text-secondary mb-3 f_c bt-style pt-3">
                                {{ $t('resume_cv.text_experience') }}
                            </div>
                            <div v-else v-for="(exp,index) in GetAll.experiences " :key="exp" class="bt-style pt-3 f_c pb-3 d-flex line_h_27" >
                                <div id="item">
                                    <strong>{{exp.position}}<span> at </span>{{exp.company}}</strong><br>
                                    <i>{{date_formats(exp.start_date)}} • <span v-if="exp.end_date">{{date_formats(exp.end_date)}}</span><span v-else>{{ $t('resume_cv.present') }}</span></i><br>
                                    <i v-if="exp.location">
                                        {{ locale === 'km' ? exp.location.km_name : exp.location.en_name }},
                                        <span v-if="exp.location.district">{{ locale === 'km' ? exp.location.district.km_name : exp.location.district.en_name }}, </span>
                                        <span v-if="exp.location.province">{{ locale === 'km' ?exp.location.province.km_name : exp.location.province.en_name }} </span>
                                    </i>
                                    <div class="line_paragraph" v-if="exp.description">
                                        {{ exp.description }}
                                    </div>
                                </div>
                                <div v-if="['edit','resume_me','send_message'].includes(pageType)" @click="clickExper(exp,GetAll.experiences,index)" data-bs-toggle="modal" data-bs-target="#experiences" id="item1">
                                    <div v-if="exp.description && !exp.location" class="mt_22"></div>
                                    <div v-else-if="exp.location && !exp.description" class="mt_22"></div>
                                    <div v-else-if="exp.location && exp.description" class="mt_35"></div>
                                    <i class="fas fa-ellipsis-v btn border-0 text-secondary" @click="clearDL()" id="icon"></i>
                                </div>
                            </div>
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-experiences' })" @click="clearDL()" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_experience') }}
                            </nuxt-link>
                        </div>
                        <div  v-if="['detail_apply','all_public_resume','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.experiences" class="experience bg-white ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.experience') }}</strong></h2>
                                <div v-for="exp in GetAll.experiences " :key="exp" class="bt-style pt-3 pb-3 d-flex f_c line_h_27" >
                                <div id="item">
                                    <strong>{{exp.position}}<span> at </span>{{exp.company}}</strong><br>
                                    <i>{{date_formats(exp.start_date)}} • <span v-if="exp.end_date">{{date_formats(exp.end_date)}}</span><span v-else>{{ $t('resume_cv.present') }}</span></i><br>
                                    <i v-if="exp.location">
                                        {{ locale === 'km' ? exp.location.km_name : exp.location.en_name }},
                                        <span v-if="exp.location.district">{{ locale === 'km' ? exp.location.district.km_name : exp.location.district.en_name }}, </span>
                                        <span v-if="exp.location.province">{{ locale === 'km' ?exp.location.province.km_name : exp.location.province.en_name }} </span>
                                    </i>
                                    <div class="line_paragraph" v-if="exp.description">
                                        {{ exp.description }}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <!-- ========================================================== End experiences ====================================================== -->

                        <!-- ====================================================== Start educations ============================================== -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="education bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-educations' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.education') }}</strong></h2>
                                <i class="fa fa-plus-circle icon" id="btn_color"></i>
                            </nuxt-link>
                            <div v-if="!GetAll.educations" class="text-secondary mb-3 f_c bt-style pt-3">
                                {{ $t('resume_cv.text_education') }}
                            </div>
                            <div v-else v-for="(edu,index) in  GetAll.educations" :key="edu" class="d-flex bt-style pt-3 f_c pb-3 line_h_27"  >
                                <div id="item">
                                    <strong>{{edu.school}}</strong><br>
                                    <i>{{date_formats(edu.start_date)}} • <span v-if="edu.end_date">{{date_formats(edu.end_date)}}</span><span v-else>{{ $t('resume_cv.present') }}</span></i>
                                    <div>
                                        <span v-if="edu.degree.value === 'high-school'">{{ $t('resume_cv.high_school') }} </span>
                                        <span v-if="edu.degree.value === 'associate'">{{ $t('resume_cv.associate') }} </span>
                                        <span v-if="edu.degree.value === 'professional'">{{ $t('resume_cv.professional') }} </span>
                                        <span v-if="edu.degree.value === 'bachelor'">{{ $t('resume_cv.bachelor') }} </span>
                                        <span v-if="edu.degree.value === 'master'">{{ $t('resume_cv.master') }} </span>
                                        <span v-if="edu.degree.value === 'doctor'">{{ $t('resume_cv.doctor') }} </span>
                                        <span v-if="edu.major"> in </span> {{ edu.major }}
                                    </div>
                                    <div class="line_paragraph" v-if="edu.description">
                                        {{ edu.description }}
                                    </div>
                                </div>
                                <div v-if="['edit','resume_me','send_message'].includes(pageType)" @click="clickEducat(edu,GetAll.educations,index)" data-bs-toggle="modal" data-bs-target="#education" id="item1" >
                                    <div v-if="edu.description" class="mt_35"></div>
                                    <div v-else class="mt_20"> </div>
                                    <i class="fas fa-ellipsis-v btn border-0 text-secondary" @click="clearDL()" id="icon"></i>
                                </div>
                            </div>
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" @click="clearDL()" :to="localePath({ name: 'account-resume-educations' })" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_education') }}
                            </nuxt-link>
                        </div>
                        <div  v-if="['detail_apply','all_public_resume','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.educations" class="education bg-white ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.education') }}</strong></h2>
                                <div v-for="edu in  GetAll.educations" :key="edu" class="d-flex bt-style f_c pt-3 pb-3 line_h_27"  >
                                <div id="item">
                                    <strong>{{edu.school}}</strong><br>
                                    <i>{{date_formats(edu.start_date)}} • <span v-if="edu.end_date">{{date_formats(edu.end_date)}}</span><span v-else>{{ $t('resume_cv.present') }}</span></i>
                                    <div>
                                        <span v-if="edu.degree.value === 'high-school'">{{ $t('resume_cv.high_school') }} </span>
                                        <span v-if="edu.degree.value === 'associate'">{{ $t('resume_cv.associate') }} </span>
                                        <span v-if="edu.degree.value === 'professional'">{{ $t('resume_cv.professional') }} </span>
                                        <span v-if="edu.degree.value === 'bachelor'">{{ $t('resume_cv.bachelor') }} </span>
                                        <span v-if="edu.degree.value === 'master'">{{ $t('resume_cv.master') }} </span>
                                        <span v-if="edu.degree.value === 'doctor'">{{ $t('resume_cv.doctor') }} </span>
                                        <span v-if="edu.major"> in </span> {{ edu.major }}
                                    </div>
                                    <div class="line_paragraph" v-if="edu.description">
                                        {{ edu.description }}
                                    </div>
                                </div> 
                            </div>
                            </div>
                        </div>
                        <!-- ====================================================== End educations ============================================== -->

                        <!-- =================================================== Start skills ===================================================== -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="skill bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-skills' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.skill') }}</strong></h2>
                                <i class="fa fa-plus-circle icon" id="btn_color"></i>
                            </nuxt-link>
                            <h2 v-if="['all_public_resume'].includes(pageType)" class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.skill') }}</strong></h2>
                            <div v-if="!GetAll.skills" id="f_s" class="text-secondary mb-3 bt-style f_c pt-3">
                                {{ $t('resume_cv.text_skill') }}
                            </div>
                            <div v-else >
                                <div v-for="(skl,index) in GetAll.skills" :key="skl" class="d-flex bt-style f_c1 pt-2 pb-2" id="f_s">
                                    <div id="item"><strong>{{skl.title}}</strong> • 
                                        <span v-if="skl.level.value === 'basic'">{{ $t('resume_cv.basic') }}</span>
                                        <span v-if="skl.level.value === 'intermediate'">{{ $t('resume_cv.intermediate') }}</span>
                                        <span v-if="skl.level.value === 'advanced'">{{ $t('resume_cv.advanced') }}</span>
                                        <span v-if="skl.level.value === 'expert'">{{ $t('resume_cv.expert') }}</span>
                                    </div>
                                    <div v-if="['edit','resume_me','send_message'].includes(pageType)" @click="clickSkill(skl,GetAll.skills,index)" data-bs-toggle="modal" data-bs-target="#skill" id="item1">
                                        <i class="fas fa-ellipsis-v btn border-0 text-secondary" @click="clearDL()" id="icon"></i>
                                    </div>
                                </div>
                            </div>
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-skills' })" @click="clearDL()"  class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_skill') }}
                            </nuxt-link>
                        </div>
                        <div  v-if="['detail_apply','all_public_resume','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.skills" class="skill bg-white ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.skill') }}</strong></h2>
                                <div v-for="skl in GetAll.skills" :key="skl" class="d-flex bt-style f_c1 pt-2 pb-2" id="f_s">
                                    <div id="item"><strong>{{skl.title}}</strong> • 
                                        <span v-if="skl.level.value === 'basic'">{{ $t('resume_cv.basic') }}</span>
                                        <span v-if="skl.level.value === 'intermediate'">{{ $t('resume_cv.intermediate') }}</span>
                                        <span v-if="skl.level.value === 'advanced'">{{ $t('resume_cv.advanced') }}</span>
                                        <span v-if="skl.level.value === 'expert'">{{ $t('resume_cv.expert') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- =================================================== End skills ===================================================== -->

                        <!-- ======================================== Start languages ============================================================== -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="languages bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-languages' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.language') }}</strong></h2>
                                <i class="fa fa-plus-circle icon" id="btn_color"></i>
                            </nuxt-link>
                            <div v-if="!GetAll.languages" class="text-secondary mb-3 bt-style f_c pt-3">
                                {{ $t('resume_cv.text_language') }}
                            </div>
                            <div v-else>
                                <div v-for="(lng, index) in GetAll.languages" :key="index" class="d-flex bt-style f_c1 pt-2 pb-2">
                                    <div id="item">
                                        <strong>{{lng.title}}</strong> • 
                                        <span v-if="lng.level.value === 'beginner'">{{ $t('resume_cv.beginner') }}</span>
                                        <span v-if="lng.level.value === 'intermediate'">{{ $t('resume_cv.intermediate') }}</span>
                                        <span v-if="lng.level.value === 'advanced'">{{ $t('resume_cv.advanced') }}</span>
                                        <span v-if="lng.level.value === 'native'">{{ $t('resume_cv.native') }}</span>
                                    </div>
                                    <div v-if="['edit','resume_me','send_message'].includes(pageType)" @click="clickSh(lng,GetAll.languages,index)" data-bs-toggle="modal" data-bs-target="#languages" id="item1">
                                        <i class="fas fa-ellipsis-v btn border-0 text-secondary" @click="clearDL()" id="icon"></i>
                                    </div>
                                </div>
                            </div> 
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-languages' })" @click="clearDL()" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_language') }}
                            </nuxt-link>
                        </div>
                        <div  v-if="['detail_apply','all_public_resume','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.languages" class="languages bg-white f_c ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.language') }}</strong></h2>
                                <div v-for="(lng, index) in GetAll.languages" :key="index" class="d-flex f_c1 bt-style pt-2 pb-2">
                                    <div id="item">
                                        <strong>{{lng.title}}</strong> • 
                                        <span v-if="lng.level.value === 'beginner'">{{ $t('resume_cv.beginner') }}</span>
                                        <span v-if="lng.level.value === 'intermediate'">{{ $t('resume_cv.intermediate') }}</span>
                                        <span v-if="lng.level.value === 'advanced'">{{ $t('resume_cv.advanced') }}</span>
                                        <span v-if="lng.level.value === 'native'">{{ $t('resume_cv.native') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- =========================================== End languages ====================================================== -->

                        <!-- =========================================== Start hobbies ====================================================== -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="hobbies bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-hobbies' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.habbies') }}</strong></h2>
                                <i v-if="!GetAll.hobbies" class="fa fa-plus-circle icon" id="btn_color"></i>
                                <i v-else class="fas fa-edit icon" id="btn_color"></i>
                            </nuxt-link>
                            <div v-if="!GetAll.hobbies" class="text-secondary mb-3 bt-style f_c pt-3">
                                {{ $t('resume_cv.text_habbies') }}
                            </div>
                            <p v-else  class="bt-style f_c pt-3 break_word" >{{ GetAll.hobbies }}</p>
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-hobbies' })" @click="clearDL()" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <span v-if="!GetAll.hobbies">
                                    <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_habbies') }}
                                </span>
                                <span v-else>
                                    <i class="fas fa-edit"></i> {{ $t('resume_cv.edit_habbies') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <div  v-if="['detail_apply','all_public_resume','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.hobbies" class="hobbies bg-white ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.habbies') }}</strong></h2>
                                <p class="bt-style f_c pt-3 break_word" >{{ GetAll.hobbies }}</p>
                            </div>
                        </div>
                        <div v-if="['all_public_resume'].includes(pageType) && !isMobile">
                            <div v-if="auth_user">
                                <div  v-if="auth_user.user.id !== GetAll.userid">
                                    <div class="col pb-2 pt-2">
                                        <button type="button" @click="click_chat(GetAll.id)" id="button_chat" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="comment">
                                        <i class="fa fa-comments font_21 me-1"></i> {{ $t('resume_cv.chat') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <!-- <template v-if="isMobile"> -->
                                    <div class="col pb-2 pt-2">
                                        <button type="button" @click="click_chat" id="button_chat" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'" aria-label="comment">
                                        <i class="fa fa-comments font_21 me-1"></i> {{ $t('resume_cv.chat') }}
                                        </button>
                                    </div>
                                <!-- </template> -->
                            </div>
                        </div>
                        <div v-if="['all_public_resume'].includes(pageType)" class="mt-5"></div>
                        <!-- =========================================== End hobbies ====================================================== -->
                        
                        <!-- ======================================================Start references ============================================ -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="references bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-references' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.reference') }}</strong></h2>
                                <i class="fa fa-plus-circle icon" id="btn_color"></i>
                            </nuxt-link>
                            <h2 v-if="['all_public_resume'].includes(pageType)" class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.reference') }}</strong></h2>
                            <div v-if="!GetAll.references" class="text-secondary mb-3 bt-style f_c pt-3">
                                {{ $t('resume_cv.text_reference') }}
                            </div>
                            <div v-else v-for="(refe,index) in GetAll.references" :key="refe" class="bt-style pt-3 f_c pb-3 d-flex line_h_27" >
                                <div id="item">
                                    <b>{{ refe.name }}</b><br>
                                    {{ refe.position }} at {{ refe.company }}
                                    <div v-if="refe.phone">
                                        Tel: <span v-for="(ph,index) in refe.phone" :key="ph">
                                            <span v-if="index > 0">, </span><a :href="'tel:'+ph" class="text_color">{{ ph }}</a>
                                        </span>
                                    </div>
                                    <div v-if="refe.email">
                                        Email: <a :href="'mailto:'+refe.email" class="text_color">{{ refe.email }}</a>
                                    </div>
                                </div>
                                <div v-if="['edit','resume_me','send_message'].includes(pageType)" @click="clickReference(refe,GetAll.references,index)" data-bs-toggle="modal" data-bs-target="#refernece" id="item1">
                                    <div v-if="refe.email" class="mt_35"></div>
                                    <div v-else class="mt_20"></div>
                                    <i class="fas fa-ellipsis-v btn border-0 text-secondary" @click="clearDL()" id="icon"></i>
                                </div>
                            </div>
                            <nuxt-link v-if="['edit','resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-references' })" @click="clearDL()" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_reference') }}
                            </nuxt-link>
                        </div>
                        <div v-if="['detail_apply','chat_send_resume'].includes(pageType)">
                            <div v-if="GetAll.references" class="references bg-white ps-3 pe-3 pt-3 pt mb-2" :class="isMobile ? '' : 'b-radius'" id="f_s">
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.reference') }}</strong></h2>
                                <div v-for="refe in GetAll.references" :key="refe" class="bt-style pt-3 pb-3 d-flex line_h_27" >
                                    <div id="item">
                                        <b>{{ refe.name }}</b><br>
                                        {{ refe.position }} at {{ refe.company }}
                                        <div v-if="refe.phone">
                                            Tel: <span v-for="(ph,index) in refe.phone" :key="ph">
                                                <span v-if="index > 0">, </span><a :href="'tel:'+ph" class="text_color">{{ ph }}</a>
                                            </span>
                                        </div>
                                        <div v-if="refe.email">
                                            Email: <a :href="'mailto:'+refe.email" class="text_color">{{ refe.email }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ======================================= End references ============================================= -->

                        <!-- ================================================== start attachment ======================================================== -->
                        <div v-if="['edit','resume_me','send_message'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="attechment bg-white ps-3 pe-3 pt-3 pt mb-2 div1" id="f_s">
                            <div  class="style_flex">
                                <div class="col p-0 text-start dt_a_j_attach">
                                    <h2 class="f_s_h b-border "> <strong>{{ $t('new_text_1.attach') }}</strong> </h2>
                                    <p class="m-0 font_11 text_grey"> {{ $t('new_text_1.support_upload_file') }} </p>
                                </div>
                            </div>
                            <hr class="a_hr_margin mb-3 mt-3">
                            <a rel="nofollow" aria-label="profile" ref="ref_profile" v-if="GetAll.attachment" v-bind:href=" GetAll.attachment.url" target="_blank"></a>
                            <div class="brows_file" hidden>
                                <a id="browse" href="javascript:void (0)" rel="nofollow" aria-label="Brows"></a>
                            </div>
                            <!-- show loading when in progress upload -->
                            <div v-if="loading" class="text-center">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." width="55px">
                            </div>
                            <!-- uploaded show -->
                            <div v-else class="mt_20">
                                <div class="d-flex" v-if="GetAll.attachment" data-bs-toggle="modal" data-bs-target="#attachment">
                                    <a id="item" rel="nofollow noopener"  class="_flex_" ref="refClick">
                                        <i  v-if="GetAll.attachment.type === 'pdf'" class="fas fa-file-pdf fn_cl_mr"></i>
                                        <div v-else class="p-0 me-2 custom_file">
                                            <p class="custom_file_text"> {{ GetAll.attachment.type }} </p>
                                        </div>
                                        <div class="col p-0 ms-2">
                                            <p class="m-0 font_14 break_word line_height_category">{{  GetAll.attachment.name }}</p>
                                            <p class="m-0 text_grey font_11">{{ convert_bytes( GetAll.attachment.size) }}</p>
                                        </div>
                                    </a>
                                    <div id="item1">
                                        <i  class="fas fa-ellipsis-v mt-2 text-secondary pr_13" @click="clearDL()" id="icon"></i>
                                    </div>
                                </div>
                                <div v-else @click="show_brows"  id="att" >
                                    <button class="btn btn-k24-primary-light mt-2" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                        <i class="fas fa-paperclip"></i>
                                        <span> {{ $t('new_text_1.attach') }}</span>     
                                    </button>  
                                </div> 
                                <p id="attachments"  class="text-danger mt-2 mb-0">{{ messageError }}</p>
                                <div v-if="['edit'].includes(pageType)" :class="isMobile ? 'pl_mb' : ''">
                                    <div class="btn ps-0" @click="toggleCheckbox" >
                                        <input type="checkbox" v-model="isChecked" class="me-2" required />
                                        <span>{{ $t('resume_cv.not_include') }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- error attach file -->
                            <div v-if="error_attach_file" class="form_error_style m-0"><span> {{ error_attach_file }} </span></div>
                        </div>
                        <!-- ================================== End attachment =================================================== -->

                        <!-- ======================================= Start preference ============================================= -->
                        <div v-if="['resume_me'].includes(pageType)" :class="isMobile ? '' : 'b-radius'" class="preference bg-white ps-3 pe-3 pt-3 pt mb-2" id="f_s">
                            <!-- <h2 class="f_s_h mb-3"><strong>{{ $t('resume_cv.preference') }}</strong></h2> -->
                            <nuxt-link :to="localePath({ name: 'account-resume-preferences' })" @click="clearDL()" class=" d-flex" >
                                <h2 class="f_s_h mb-3" id="item"><strong>{{ $t('resume_cv.preference') }}</strong></h2>
                                <i v-if="!GetAll.preference" class="fa fa-plus-circle icon" id="btn_color"></i>
                                <i v-else class="fas fa-edit icon pl_17" id="btn_color"></i>
                            </nuxt-link>
                            <div v-if="!GetAll.preference" class="text-secondary mb-3 f_c bt-style pt-3">
                                {{ $t('resume_cv.text_preference') }}
                            </div>
                            <div v-else class="f_c">
                                <div class="pt-3 pb-3 bt-style">
                                    <span class="text-slat">{{ $t('resume_cv.open_job') }}</span>
                                    <div v-if="GetAll.preference.open_job">
                                        <b>{{ $t('resume_cv.enable') }}</b>
                                    </div>
                                    <div v-else>
                                        <b>{{ $t('resume_cv.disable') }}</b>
                                    </div>
                                </div>
                                <div  class="pt-3 pb-3 bt-style">
                                    <span  class="text-slat">{{ $t('resume_cv.preferred_position') }}</span><br>
                                    <b v-if="GetAll.preference.position">{{ GetAll.preference.position }}</b>
                                    <b v-else>{{ $t('resume_cv.not_define') }}</b>
                                </div>
                                <div class="pt-3 pb-3 bt-style">
                                    <span  class="text-slat">{{ $t('resume_cv.category') }}</span><br>
                                    <b v-if="GetAll.preference.category"><span  v-for="(val,index) in GetAll.preference.category" :key="val" ><span v-if="index > 0">, </span><span>{{ locale === 'km' ? val.km_name : val.en_name }}</span></span></b>
                                    <b v-else>{{ $t('resume_cv.not_define') }}</b>
                                </div>
                                <div class="pt-3 pb-3 bt-style">
                                    <span  class="text-slat">{{ $t('resume_cv.location') }}</span><br>
                                    <b v-if="GetAll.preference.location"><span  v-for=" ( val,index ) in GetAll.preference.location" :key="val"><span v-if="index > 0">, </span><span>{{ locale === 'km' ? val.km_name : val.en_name }}</span></span></b>
                                    <b v-else >{{ $t('resume_cv.not_define') }}</b>
                                </div>
                                <div class="pt-3 pb-3 bt-style">
                                    <span class="text-slat">{{ $t('resume_cv.job_type') }}</span><br>
                                    <b v-if="GetAll.preference.job_type"><span  v-for="(val,index) in GetAll.preference.job_type" :key="val" ><span v-if="index > 0">, </span><span>{{val.title}}</span></span></b>
                                    <b v-else >{{ $t('resume_cv.not_define') }}</b>
                                </div>
                            </div>
                            <nuxt-link :to="localePath({ name: 'account-resume-preferences' })" @click="clearDL()" class="btn ps-0 pb-0 text-start" :class="isMobile ? 'btn-height' : 'dt-btn-height'" id="btn_color">
                                <span v-if="!GetAll.preference">
                                    <i class="fa fa-plus-circle"></i> {{ $t('resume_cv.add_preference') }}
                                </span>
                                <span v-else>
                                    <i class="fas fa-edit"></i> {{ $t('resume_cv.edit_preference') }}
                                </span>
                            </nuxt-link>
                        </div>
                        <!-- ======================================= End preference ============================================= -->
                        <div v-if="['detail_apply'].includes(pageType)" class=" mt-3">
                            <div class="style_flex " v-if="get_data_id && get_data_id.application && get_data_id.application.cv">
                                <a rel="nofollow noopener" v-bind:href="get_data_id.application.cv" target="_blank" class="btn width_100 btn_view_cv content-resume">
                                <span class="fas fa-paperclip me-3 "></span>
                                {{  locale=== 'km' ? 'មើលពាក្យសុំការងារ' : 'View CV'  }}
                                </a>
                            </div>
                        </div>
                        <div v-if="['chat_send_resume'].includes(pageType)" >
                            <div class="style_flex  mt-3 mb-3" v-if="GetAll && GetAll.attachment">
                                <a rel="nofollow noopener" v-bind:href="GetAll.attachment.url" target="_blank" class="btn width_100 btn_view_cv content-resume">
                                <span class="fas fa-paperclip me-3 "></span>
                                {{  locale=== 'km' ? 'មើលពាក្យសុំការងារ' : 'View CV'  }}
                                </a> 
                            </div>
                        </div>
                    </div>
                    <div v-if="['send_message'].includes(pageType) && !isMobile" class=" mt-4" >
                        <button type="button"  @click="send_resume" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                        <div v-if="isLoading">
                            <p class="buttonload">
                                <i class="fa fa-spinner fa-spin mr-2"></i>{{ $t('resume_cv.loading') }}
                            </p>
                        </div>    
                        <span v-else> {{ $t('message.send') }} </span>
                        </button>
                    </div>
                    <div v-if="['edit'].includes(pageType) && !isMobile" class="mt-4" >
                        <button v-if="!is_apply_load" type="button" @click="submit_form_post()" id="appy_job" class="btn btn-k24-secondary fw-bold" :class="isMobile ? 'btn-height' : 'dt-btn-height'"> {{ $t('message.submit') }} </button>
                        <button v-else id="appy_job" class="btn btn-k24-secondary fw-bold" :class="isMobile ? 'btn-height' : 'dt-btn-height'"> <i class="fa fa-spinner fa-spin mr-2"></i>{{ $t('message.submit') }} </button>
                    </div>
                    <template v-if="isMobile">
                        <div v-if="['edit'].includes(pageType)" class="nav p_pad_btn_ap_job">
                            <button v-if="!is_apply_load" type="button" @click="submit_form_post()" id="appy_job" class="btn btn-k24-secondary fw-bold" :class="isMobile ? 'btn-height' : 'dt-btn-height'"> {{ $t('message.submit') }} </button>
                            <button v-else type="button" id="appy_job" class="btn btn-k24-secondary fw-bold" :class="isMobile ? 'btn-height' : 'dt-btn-height'"> <i class="fa fa-spinner fa-spin mr-2"></i>{{ $t('message.submit') }} </button>
                        </div>
                    </template>
                    <div v-if="['all_public_resume'].includes(pageType) && isMobile" class="position-absolute bottom-0 z-index-100">
                        <div v-if="auth_user">
                            <div class="nav nav_desktop" v-if="auth_user.user.id !== GetAll.userid">
                                <div class="col ps-1 pe-2 pb-2 pt-2">
                                    <button type="button" @click="click_chat(GetAll.id)" id="button_chat" class="btn form-control btn-lg btn-k24-secondary pt-6 text-white" aria-label="comment">
                                    <i class="fa fa-comments font_21 me-1"></i> {{ $t('resume_cv.chat') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="nav nav_desktop">
                                <div class="col ps-1 pe-2 pb-2 pt-2">
                                    <button type="button" @click="click_chat" id="button_chat" class="btn form-control btn-lg btn-k24-secondary pt-6 text-white" aria-label="comment">
                                    <i class="fa fa-comments font_21 me-1"></i> {{ $t('resume_cv.chat') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div v-else>
                <div  v-if="['edit','resume_me','send_message'].includes(pageType) && loadindScreen === false" :class="isMobile ? '' : 'mt-30'">
                    <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                        <div class="_div_nav bg_app_bar_header_">
                            <div @click="router.back()" class="_pad_col_icon">
                                <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                                    <i class="ion-android-arrow-back font_click_back"></i>
                                </button>
                            </div>
                            <div class="col ps-0 l_h_con_title">
                                <p class="name_style truncate_wrap mb-0 ms-2 text-start">
                                {{ $t('resume_cv.resume') }}
                                </p>
                            </div>
                        </div>
                    </div> -->
                    <div class="get_start" :class="isMobile ? 'mt-5' : 'mt_50'">
                        <div class="content-resume bg-white p-4 rounded">
                            <img :src="asset_url+version_library+'img/resume.svg'" alt="resume.svg" class="m-2 resume_svg" >
                            <div class="text-center mb-4">
                                <h4 class="line_h_35"><b>{{ $t('resume_cv.text_h') }}</b></h4>
                                <p>{{ $t('resume_cv.text_p') }}</p>
                            </div>
                            <div class="mb-2 d-flex">
                                <div class="p-1 bg_num">
                                    <strong class="p_l">1</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li1') }}</div>
                            </div>
                            <div class="mb-2 d-flex" >
                                <div class="p-1 bg_num">
                                    <strong class="p_l">2</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li2') }}</div>
                            </div>
                            <div class="mb-2 d-flex">
                                <div class="p-1 bg_num">
                                    <strong class="p_l">3</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li3') }}</div>
                            </div>
                            <div class="mb-2 d-flex">
                                <div class="p-1 bg_num">
                                    <strong class="p_l">4</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li4') }}</div>
                            </div>
                            <div class="mb-2 d-flex">
                                <div class="p-1 bg_num">
                                    <strong class="p_l">5</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li5') }}</div>
                            </div>
                            <div class="mb-2 d-flex">
                                <div class="p-1 bg_num">
                                    <strong class="p_l">6</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li6') }}</div>
                            </div>
                            <div class="mb-2 d-flex">
                                <div class="p-1 bg_num">
                                    <strong class="p_l">7</strong>
                                </div>
                                <div class="ms-2 p-1">{{ $t('resume_cv.text_li7') }}</div>
                            </div> 
                            <NuxtLink v-if="['edit'].includes(pageType)" @click="clickStep" :to="localePath({ name: 'account-resume-personal_details' })" class="btn btn-k24-secondary mt-4 " :class="isMobile ? 'btn-height' : 'dt-btn-height'">{{ $t('resume_cv.get_start') }}</NuxtLink>
                            <NuxtLink v-if="['resume_me','send_message'].includes(pageType)" :to="localePath({ name: 'account-resume-personal_details' })" class="btn btn-k24-secondary mt-4 " :class="isMobile ? 'btn-height' : 'dt-btn-height'">{{ $t('resume_cv.get_start') }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
        <div class="modal style_full_screen rs-modal bg_E0" id="show_modal_success" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true" > <!-- fade -->
        <div class="modal-dialog modal_dialog_style" :class="isDesktop ? '' : 'bg-white'" role="document">
            <div class="modal-content bg_E0">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding min-vh-100" >
                    <div class="text-center" :class="!isDesktop ? 'top_h_p_success' : ''">
                        <span class="fa fa-check-circle color_size_p_success"></span>
                        <h1 class="mt-4 color_weight_p_success">Congratulations!</h1>
                        <p class="font_16 mt-2 p-3"> {{ message }} </p>
                        <p>
                            Your job application has been submitted Successfully
                        </p>
                        <div class="btn style_button form-control btn-lg w_m-100" @click="cickBack">
                            close
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div v-if="loadindScreens" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        
        <!-- ========= modal skills =========== -->
        <div class="modal" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="skill"  tabindex="-1" aria-hidden="true" >
            <div class="modal-dialog bg-modal" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div :class="isMobile ? '' : 'modal-body p-0'">
                        <div class="content_ p-3" >
                            <div class="pt-3 mobile_modal_actions_container">
                                <div class="text-center pb-3 text-secondary fn_20 border-bottom">{{ sk.title }}</div>
                                <NuxtLink v-if="(sk_index) !== 0" @click="click_move(skArray,sk_index,'skills','move_top')" data-bs-dismiss="modal" class="mobile_modal_action text-primary fn_20 justify-content-center"><strong>{{ $t('resume_cv.move_top') }}</strong></NuxtLink>
                                <NuxtLink v-if="(sk_index) !== 0" @click="click_move(skArray,sk_index,'skills','move_up')" data-bs-dismiss="modal"  class="mobile_modal_action text-primary fn_20 justify-content-center"><strong>{{ $t('resume_cv.move_up') }}</strong></NuxtLink>
                                <NuxtLink v-if="(sk_index+1) !== skArray.length" @click="click_move(skArray,sk_index,'skills','move_bottom')" data-bs-dismiss="modal"  class="mobile_modal_action text-primary fn_20 justify-content-center"><strong>{{ $t('resume_cv.mov_bottom') }}</strong></NuxtLink>
                                <NuxtLink v-if="(sk_index+1) !== skArray.length" @click="click_move(skArray,sk_index,'skills','move_down')" data-bs-dismiss="modal"  class="mobile_modal_action text-primary fn_20 justify-content-center"><strong>{{ $t('resume_cv.move_down') }}</strong></NuxtLink>
                                <NuxtLink :to="localePath({ name: 'account-resume-skills' })+'/'+sk.id" @click="action_edit('skill')"  class="mobile_modal_action text-primary fn_20 justify-content-center"><strong>{{ $t('resume_cv.edit') }}</strong></NuxtLink>
                                <NuxtLink @click="click_delete(sk.id ,'skill' ,sk.title)" data-bs-dismiss="modal"  class="mobile_modal_action text-danger fn_20 justify-content-center"><strong>{{ $t('resume_cv.delete') }}</strong></NuxtLink>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`resume_cv.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ========= modal language =========== -->
        <div class="modal w-100" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="languages"  tabindex="-1" aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div :class="isMobile ? '' : 'modal-body p-0'">
                        <div class="content_ p-3">
                            <div class="pt-3 mobile_modal_actions_container">
                                <div class="text-center pb-3 text-secondary fn_20 border-bottom">{{ lang.title }}</div>
                                <NuxtLink v-if="(lg_index) !== 0" @click="click_move(langArray,lg_index,'languages','move_top')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_top') }}</strong></NuxtLink>
                                <NuxtLink v-if="(lg_index) !== 0" @click="click_move(langArray,lg_index,'languages','move_up')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_up') }}</strong></NuxtLink>
                                <NuxtLink v-if="(lg_index+1) !== langArray.length" @click="click_move(langArray,lg_index,'languages','move_bottom')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.mov_bottom') }}</strong></NuxtLink>
                                <NuxtLink v-if="(lg_index+1) !== langArray.length" @click="click_move(langArray,lg_index,'languages','move_down')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_down') }}</strong></NuxtLink>
                                <NuxtLink :to="localePath({ name: 'account-resume-languages' })+'/'+lang.id" @click="action_edit('languages')" class="mobile_modal_action justify-content-center fn_20 text-primary"><strong>{{ $t('resume_cv.edit') }}</strong></NuxtLink>
                                <NuxtLink @click="click_delete(lang.id,'language',lang.title)" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-danger fn_20"><strong>{{ $t('resume_cv.delete') }}</strong></NuxtLink>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`resume_cv.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ========= modal education =========== -->
        <div class="modal w-100" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="education"  tabindex="-1" aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div :class="isMobile ? '' : 'modal-body p-0'">
                        <div class="content_ p-3">
                            <div class="pt-3 mobile_modal_actions_container">
                                <div class="text-center pb-3 text-secondary fn_20 border-bottom">{{ educat.school }}</div>
                                <NuxtLink v-if="(edu_index) !== 0" @click="click_move(eduArray,edu_index,'education','move_top')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_top') }}</strong></NuxtLink>
                                <NuxtLink v-if="(edu_index) !== 0" @click="click_move(eduArray,edu_index,'education','move_up')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_up') }}</strong></NuxtLink>
                                <NuxtLink v-if="(edu_index+1) !== eduArray.length" @click="click_move(eduArray,edu_index,'education','move_bottom')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.mov_bottom') }}</strong></NuxtLink>
                                <NuxtLink v-if="(edu_index+1) !== eduArray.length" @click="click_move(eduArray,edu_index,'education','move_down')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_down') }}</strong></NuxtLink>
                                <NuxtLink :to="localePath({ name: 'account-resume-educations' })+'/'+educat.id" @click="action_edit('education')" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.edit') }}</strong></NuxtLink>
                                <NuxtLink @click="click_delete(educat.id,'education',educat.school)" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-danger fn_20"><strong>{{ $t('resume_cv.delete') }}</strong></NuxtLink>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`resume_cv.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ========= modal reference =========== -->
        <div class="modal w-100" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="refernece"  tabindex="-1" aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div :class="isMobile ? '' : 'modal-body p-0'">
                        <div class="content_ p-3">
                            <div class="pt-3 mobile_modal_actions_container">
                                <div class="text-center pb-3 text-secondary fn_20 border-bottom">{{ refer.name }}</div>
                                <NuxtLink v-if="(rf_index) !== 0" @click="click_move(refArray,rf_index,'references','move_top')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_top') }}</strong></NuxtLink>
                                <NuxtLink v-if="(rf_index) !== 0" @click="click_move(refArray,rf_index,'references','move_up')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_up') }}</strong></NuxtLink>
                                <NuxtLink v-if="(rf_index+1) !== refArray.length" @click="click_move(refArray,rf_index,'references','move_bottom')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.mov_bottom') }}</strong></NuxtLink>
                                <NuxtLink v-if="(rf_index+1) !== refArray.length" @click="click_move(refArray,rf_index,'references','move_down')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_down') }}</strong></NuxtLink>
                                <NuxtLink :to="localePath({ name: 'account-resume-references' })+'/'+refer.id" @click="action_edit('refernece')" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.edit') }}</strong></NuxtLink>
                                <NuxtLink @click="click_delete(refer.id,'reference',refer.name)" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-danger fn_20"><strong>{{ $t('resume_cv.delete') }}</strong></NuxtLink>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`resume_cv.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ========= modal work experiences =========== -->
        <div class="modal w-100" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="experiences"  tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div :class="isMobile ? '' : 'modal-body p-0'">
                        <div class="content_ p-3">
                            <div class="pt-3 mobile_modal_actions_container">
                                <div class="text-center pb-3 text-secondary fn_20 border-bottom">{{exper.position}} at {{exper.company}}</div>
                                <NuxtLink v-if="(exp_index) !== 0" @click="click_move(expArray,exp_index,'experiences','move_top')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_top') }}</strong></NuxtLink>
                                <NuxtLink v-if="(exp_index) !== 0" @click="click_move(expArray,exp_index,'experiences','move_up')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_up') }}</strong></NuxtLink>
                                <NuxtLink v-if="(exp_index+1) !== expArray.length" @click="click_move(expArray,exp_index,'experiences','move_bottom')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.mov_bottom') }}</strong></NuxtLink>
                                <NuxtLink v-if="(exp_index+1) !== expArray.length" @click="click_move(expArray,exp_index,'experiences','move_down')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.move_down') }}</strong></NuxtLink>
                                <NuxtLink :to="localePath({ name: 'account-resume-experiences' })+'/'+exper.id" @click="action_edit('experiences')" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.edit') }}</strong></NuxtLink>
                                <NuxtLink @click="click_delete(exper.id,'experience',exper.company)" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-danger fn_20"><strong>{{ $t('resume_cv.delete') }}</strong></NuxtLink>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`resume_cv.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ========= modal attachment =========== -->
        <div class="modal w-100" :class="isMobile ? 'w-100 rs-modal' : 'fade'" id="attachment" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? '' : 'modal-dialog-centered m-auto top_60 pos_static'">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div :class="isMobile ? '' : 'modal-body p-0'">
                        <div class="content_ p-3">
                            <div class="pt-3 mobile_modal_actions_container">
                                <NuxtLink @click="viewFile" data-bs-dismiss="modal" class="btn p-3 w-100 text-primary border-bottom"><strong>{{ $t('resume_cv.view_resume') }}</strong></NuxtLink>
                                <NuxtLink @click="show_brows" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-primary fn_20"><strong>{{ $t('resume_cv.change') }}</strong></NuxtLink>
                                <NuxtLink @click="click_delete('','attach_file','Attachment File')" data-bs-dismiss="modal" class="mobile_modal_action justify-content-center text-danger fn_20"><strong>{{ $t('resume_cv.remove') }}</strong></NuxtLink>
                            </div>
                            <button data-bs-dismiss="modal" class="mobile_modal_cancel_button fn_20">{{ $t(`resume_cv.cancel`) }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- show error message -->
        <div class="toast errFile style_toast d-none">
            <div class="toast-header header_padding_toast">
                <strong class="me-auto style_flex">
                    <i class="fas fa-exclamation-circle text-danger font_22"></i>
                    <p class="m-0 ms-2 font_15 text-danger">{{ $t('message_er.file_size') }}</p>
                </strong>
                <button type="button" class="ms-2 mt-1 mb-0 close a_close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true" class="text-danger">&times;</span>
                </button>
            </div>
            <div v-if="toast_error_vali_show.length > 0" class="toast-body bg_#fd">
                <p v-for="error_validation in toast_error_vali_show" :key="error_validation" class="m-0 ms-2 text-danger"> - {{ error_validation }}. </p>
            </div>
        </div>
        <!-- /show success message -->

        <div class="modal fade rs-modal" id="confirm" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered p-3 m-auto">
                <div class="modal-content rounded">
                <div class="text-center pt-3">
                    <h5 class="modal-title" id="exampleModalLabel">{{ locale==='km' ? 'តើអ្នកប្រាកដ ឫអត់?' : 'Are you sure?' }}</h5>
                </div>
                <div class="modal-body text-center">
                    You will delete "{{ name_title }}"
                </div> 
                <div class="m-3 d-flex pt-3 b_top">
                    <div class="w-50 text-end">
                        <button type="button w_80px" class="btn btn-secondary me-3" data-bs-dismiss="modal">{{ locale=== 'km' ? 'បោះបង់' : 'Close' }}</button>
                    </div>
                    <div  class="w-50 text-start">
                        <button type="button" v-if="item_name === 'skill'" class="btn btn-danger ms-3 w_80px" @click="deleteSkill(item_id)" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
                        <button type="button" v-if="item_name === 'language'" class="btn btn-danger ms-3 w_80px" @click="deleteLang(item_id)" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
                        <button type="button" v-if="item_name === 'education'" class="btn btn-danger ms-3 w_80px" @click="deleteEducation(item_id)" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
                        <button type="button" v-if="item_name === 'reference'" class="btn btn-danger ms-3 w_80px" @click="deleteReferences(item_id)" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
                        <button type="button" v-if="item_name === 'experience'" class="btn btn-danger ms-3 w_80px" @click="deleteExperiences(item_id)" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
                        <button type="button" v-if="item_name === 'attach_file'" class="btn btn-danger ms-3 w_80px" @click="removeFile()" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
                    </div>
                </div>
                </div>
            </div>
        </div> 


        <!-- show success message -->
        <div class="toast style_toast d-none sh_toast toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="me-auto style_flex">
                    <i  class="fas fa-exclamation-circle text-success font_22"></i>
                    <p class="m-0 ms-2"> {{ message_success }} </p>
                </strong>
                <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import helper from "/helper";
    import { VueCookieNext } from 'vue-cookie-next';
    const isDesktop = helper.check_is_desktop(); // check userAgent
    // definePageMeta( {layout: "custom", middleware: "auth"} );
    const pdfFilePath = ref('')
    const runtime_config = useRuntimeConfig();
    const config = runtime_config.public;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { locale } = useI18n();
    const auth_user = useCookie('auth_user')
    const GetAll = useState('GetAll',()=>'')
    const cookieJOB = useCookie('cookieJOB')
    const dl = useCookie('dl_resume')
    const image_pro = useState('image_pro',()=>'')
    const message_success = ref('')
    const reload_q_again_1 = ref(0);
    const reload_q_again_2 = ref(0);
    // const GetAll = ref('')
    const isDelete = useState('isDelete')
    isDelete.value = false
    const isLoadding = useState('isLoadding')
    isLoadding.value = false
    const loadindScreen = useState('loadindScreen')
    loadindScreen.value = true
    const loadindScreens = useState('loadindScreens')
    loadindScreens.value = false
    const All_P_Resume = useState('All_P_Resume',()=>'')
    const GetDetailPublicResume = useState('GetDetailPublicResume',()=>'')
    const get_data_id = useState('get_data_id',()=>'')
    const empty_img_post = ref("/icon/empty_post.png");
    const isLoading = useState('isLoading')
    isLoading.value = false
    // ======= ubload file ===========
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const loading = ref(false);
    const auth_users = ref('');
    const tmp_file = ref('');
    const i = ref(0);
    const toast_error_vali_show = ref([]);
    const title_rule = ref('');
    const refClick = ref(''); 
    const ref_profile = ref(''); 
    const ref_profile1 = ref(''); 
    const error_attach_file = ref('');
    const props = defineProps({
        pageType: String
    })
    const isMobile= ref(helper.m_or_d())
    const min_t = ref(0)

    onBeforeMount(() => {
        let dl_r = dl.value ? dl.value : ''
        if(dl_r === 'dl'){
            min_t.value = 2500
            VueCookieNext.removeCookie('dl_resume')
            location.reload()
        }
    })

    onMounted(() => {
        if (process.client) {
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            // isMobile.value = $( window ).width() < 768 ? true : false
            // $( window ).resize( function() {
            //     isMobile.value = $( window ).width() < 768 ? true : false
            // });
            setTimeout(()=>{ getAllResume(); },min_t.value)  
            check_new_auth_user();
            setTimeout(() => { ready_function_attach(); },500);
        }
    })


    function clearDL(){ VueCookieNext.removeCookie('dl_resume') }


    function date_formats(date) { return helper.check_date_agos(date, '') ; }
    function date_formats1(date) { return helper.check_date_agos1(date, '') ; }
    function date_formats2(date) { return helper.check_date_agos2(date, '') ; }
    function date_format(date) { return helper.check_date_ago(date, '') ; }
    function clickScroll(){
        $(document).ready(function (){
            $('html, body').animate({
                scrollTop: $(".div1").offset().top-400
            }, 1000);
            $(".attechment").css("color","orange");
        });
    }

    function action_edit(type){
        $('#'+type).modal('hide')
        // console.log(type)
    }


    const Sugges = ref('')
    const Completed = ref(0)
    function getAllResume(){
        check_new_auth_user();
        if(props.pageType === 'edit' || props.pageType === 'resume_me' || props.pageType === 'send_message'){
            if(auth_users.value){
                $fetch(config.VUE_APP_API_URL_JOB+'me/resume?fields=personal_details,educations,experiences,languages,skills,attachment,references,summary,hobbies,preference',{
                    headers: { "Access-Token": auth_users.value.tokens.access_token }
                }).then(res=>{
                    // loadindScreen.value = false
                    GetAll.value = res.data 
                    Sugges.value = res.points
                    Completed.value = ((Sugges.value.current * 100) / Sugges.value.total).toFixed()
                }).catch(error=>{
                    
                    if (error.response && error.response.status === 401) {
                        if (reload_q_again_1.value <= 2) {
                            reload_q_again_1.value += 1;
                            check_new_auth_user();
                            getAllResume();
                        } else {
                            localStorage.removeItem('auth_user');   // remove localStorage
                            router.replace(localePath({ name: 'index' }));
                        }
                    }
                    if (error.response && error.response.status === 404) {
                        GetAll.value = ''
                    }
                }).finally(()=>{
                    setTimeout(()=>{
                        loadindScreen.value = false
                    },250)
                })
            }else{
                router.push(localePath({ name: 'auth' }));
            }
            
        }
    }
    function clickBack(){
        router.push(localePath({ name: 'account' }));
    }

    function click_move(array, index,item,type){
        check_new_auth_user();
        let data_body = ref('');
        if(type == 'move_up'){
            if (index > 0 && index < array.length) {
                const temp = array[index - 1];
                array[index - 1] = array[index];
                array[index] = temp;
            }
        }
        if(type == 'move_down'){
            if (index >= 0 && index < array.length) {
                const temp = array[index + 1];
                array[index + 1] = array[index];
                array[index] = temp;
            }
        }
        if(type == 'move_top'){
            if (index !== -1) {
                let movedObject = array.splice(index, 1)[0];
                array.unshift(movedObject);
            } else {
                console.log("Object not found in the array.");
            }
        }
        if(type == 'move_bottom'){
            if (index !== -1) {
                let movedObject = array.splice(index, 1)[0];
                array.push(movedObject);
            } else {
                console.log("Object not found in the array.");
            }
        }
        $.each(array, function (key, value) {
            var keys_index = key += 1;
            data_body['id[' + keys_index + ']'] = value.id;
        });
        if(item == 'skills'){
            $fetch(config.VUE_APP_API_URL_JOB+'me/resume/skills/ordering',{
                method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
                body: new URLSearchParams(data_body)
            })
        }
        if(item == 'languages'){
            $fetch(config.VUE_APP_API_URL_JOB+'me/resume/languages/ordering',{
                method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
                body: new URLSearchParams(data_body)
            })
        }
        if(item == 'education'){
            $fetch(config.VUE_APP_API_URL_JOB+'me/resume/educations/ordering',{
                method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
                body: new URLSearchParams(data_body)
            })
        }
        if(item == 'experiences'){
            $fetch(config.VUE_APP_API_URL_JOB+'me/resume/experiences/ordering',{
                method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
                body: new URLSearchParams(data_body)
            })
        }
        if(item == 'references'){
            $fetch(config.VUE_APP_API_URL_JOB+'me/resume/references/ordering',{
                method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
                body: new URLSearchParams(data_body)
            })
        }
    }

    const item_id = ref('')
    const item_name = ref('')
    const name_title = ref('')
    function click_delete(id,name,title){
        item_id.value = id
        item_name.value = name
        name_title.value = title
        $('#confirm').modal('show')
    }
    // =========== languages =======
    const lang = useState('lang',()=>'')
    const langArray = useState('langArray',()=>[])
    const lg_index = ref('')
    function clickSh(lng,array,index){
        lang.value = lng
        langArray.value = array
        lg_index.value = index
    }
    function deleteLang(id) {
        check_new_auth_user();
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/languages/'+(id)+'',{
            method: "DELETE",headers: {"Access-Token": auth_users.value.tokens.access_token}
        }).then(res=>{
            message_success.value = res.message
            if (message_success.value) {
                $(".sh_toast").removeClass('d-none');
                $(".sh_toast").toast({delay: 6000});
                $(".sh_toast").toast('show');
            }
            GetAll.value.languages.forEach((obj) => {
                if (id === obj.id) {
                    GetAll.value.languages.splice(GetAll.value.languages.indexOf(obj), 1);
                }
            })
            getAllResume()
        })
    }
    function clickEmail(){
        alert('ok')
        return `mailto:${ GetAll.value.personal_details.email}`;
    }

    // ========== skills ===========
    const sk = useState('sk',()=>'')
    const skArray = useState('skArray',()=>[])
    const sk_index = ref('')
    function clickSkill(skl,array,index){
        sk.value = skl
        skArray.value = array
        sk_index.value = index
    }
    function deleteSkill(id) {
        check_new_auth_user();
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/skills/'+(id)+'',{
            method: "DELETE",headers: {"Access-Token": auth_users.value.tokens.access_token}
        }).then(res=>{
            message_success.value = res.message
            if (message_success.value) {
                $(".sh_toast").removeClass('d-none');
                $(".sh_toast").toast({delay: 6000});
                $(".sh_toast").toast('show');
            }
            GetAll.value.skills.forEach((obj) => {
                if (id === obj.id) {
                    GetAll.value.skills.splice(GetAll.value.skills.indexOf(obj), 1);
                }
            })
           getAllResume()
        })
    }

    // =========== eduactions ==============
    const educat = useState('educat',()=>'')
    const eduArray = useState('eduArray',()=>[])
    const edu_index = ref('')
    function clickEducat(edu,array,index){
        educat.value = edu
        eduArray.value = array
        edu_index.value = index
    }
    function deleteEducation(id) {
        check_new_auth_user();
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/educations/'+(id)+'',{
            method: "DELETE",headers: {"Access-Token": auth_users.value.tokens.access_token}
        }).then(res=>{
            message_success.value = res.message
            if (message_success.value) {
                $(".sh_toast").removeClass('d-none');
                $(".sh_toast").toast({delay: 6000});
                $(".sh_toast").toast('show');
            }
            GetAll.value.educations.forEach((obj) => {
                if (id === obj.id) {
                    GetAll.value.educations.splice(GetAll.value.educations.indexOf(obj), 1);
                }
            })
            getAllResume()
        })
    }

    // =========== references =============
    const refer = useState('refe',()=>'')
    const refArray = useState('refArray',()=>[])
    const rf_index = ref('')
    function clickReference(refe,array,index){
        refer.value = refe
        refArray.value = array
        rf_index.value = index
    }
    function deleteReferences(id) {
        check_new_auth_user();
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/references/'+(id)+'',{
            method: "DELETE",headers: {"Access-Token": auth_users.value.tokens.access_token}
        }).then(res=>{
            message_success.value = res.message
            if (message_success.value) {
                $(".sh_toast").removeClass('d-none');
                $(".sh_toast").toast({delay: 6000});
                $(".sh_toast").toast('show');
            }
            GetAll.value.references.forEach((obj) => {
                if (id === obj.id) {
                    GetAll.value.references.splice(GetAll.value.references.indexOf(obj), 1); 
                }
            })
            getAllResume()
        })
    }

    // =========== experiences =============
    const exper = useState('exper',()=>'')
    const expArray = useState('expArray',()=>[])
    const exp_index = ref('')
    function clickExper(exp,array,index){
        exper.value = exp
        expArray.value = array
        exp_index.value = index
    }
    function deleteExperiences(id) {
        check_new_auth_user();
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/experiences/'+(id)+'',{
            method: "DELETE",headers: {"Access-Token": auth_users.value.tokens.access_token}
        }).then(res=>{
            message_success.value = res.message
            if (message_success.value) {
                $(".sh_toast").removeClass('d-none');
                $(".sh_toast").toast({delay: 6000});
                $(".sh_toast").toast('show');
            }
            GetAll.value.experiences.forEach((obj) => {
                if (id === obj.id) {
                    GetAll.value.experiences.splice(GetAll.value.experiences.indexOf(obj), 1);    
                }
            })
            getAllResume()
        })
    }

    if(props.pageType === 'resume_me'){
        useHead({
            title: 'Resume(CV) - khmer24.com',
        })
    }

    // if(props.pageType === 'resume_me'){
    //     useHead({
    //         title: 'Resume(CV) - khmer24.com',
    //     })
    // }
    
    // ===================== upload file ===================
    function viewFile(){
        ref_profile.value.click();
    }
    
    function show_brows() {
        $('.brows_file div input[type=file]').click();      // click direct file profile
    }
    function check_new_auth_user() {
        auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
    }
    function convertFromNow(date) { return helper.check_date_ago_with_year(date); }
    // ---- convert num to bytes ----
    function convert_bytes(bytes) {
        return helper.bytes2Size(bytes);
    }
    function ready_function_attach() {
        let access_token = auth_users.value ? auth_users.value.tokens.access_token : '';
        var max_size = 5;
        var multi_uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button: ["browse"],
            url: config.VUE_APP_API_URL_JOB+'me/resume/attachment',
            max_file_size : max_size+'mb',
            multi_selection: false, 
            filters : {
                mime_types :[
                    {title : "files", extensions : "docx,pdf,doc,txt"}
                ],
            },
            flash_swf_url : 'plupload-2.3.9/Moxie.swf',
            silverlight_xap_url : 'plupload-2.3.9/Moxie.xap',
            headers: { "Access-Token": access_token },
        });
        multi_uploader.init();
        multi_uploader.bind('FilesAdded', (up, files) => {
            loading.value = true;
            multi_uploader.start();
        });
        multi_uploader.bind('UploadProgress', function(up, file) {
            $('#open_or_close_loading_field').removeClass('d-none');
            getAllResume()
        });
        multi_uploader.bind('Error', (up, err) => {
            loading.value = false;
            if (err.code === -600) {
                title_rule.value = 'File size is to Large';
            } else if (err.code === -601) {
                title_rule.value = 'Wrong file extension, Support only: doc, DOCX, PDF and txt';
            } else if (err.code === -200) {
                title_rule.value = 'Please Check your internet connection';
            } else {
                title_rule.value = 'You must to login first before upload your CV';
            }

            $('#btn_attach_file').css('display','block'); 
            toast_error_vali_show.value = [];
            let toast = $('.errFile');
            toast.removeClass('d-none');
            toast.toast({ delay: 7000 });
            toast.toast('show');
            multi_uploader.refresh();
            getAllResume()
        });
        multi_uploader.bind('UploadComplete', function(upldr, file) {
            multi_uploader.splice();
            multi_uploader.refresh();
            messageError.value = ''
            getAllResume()
            
        });
        multi_uploader.bind('FileUploaded', (upldr, file, object) => {
            var myData;
            try {
                myData = object.response ? JSON.parse(object.response) : '';
            } catch(err) {
                myData = '(' + object.response + ')';
            }
            tmp_file.value = myData.data;
            getAllResume()
            loading.value = false;
            $('#open_or_close_loading_field').addClass('d-none');
            multi_uploader.refresh();
        });
        plupload.addFileFilter('check_image_size', function(minRes, file, cb) {
            var self = this, img = new moxie.image.Image();  
            function finalize(result) {
                var msg = "Please upload image at less "+minRes+"px width and "+minRes+"px height.";
                if(img.width > 1000000 || img.height > 1000000) msg = "Image <strong>"+img.name+"</strong> too big.";
                img.destroy();
                img = null;
                if (!result) {
                    self.trigger('Error', {
                        code : plupload.IMAGE_DIMENSIONS_ERROR,
                        message : msg,
                        file : file
                    });
                }
                cb(result);
            }
            if(file.type !== "image/gif") {
                img.onload = function() {
                    finalize((img.width > minRes && img.height > minRes) && (img.width < 1000000 && img.height < 1000000));
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
    // ===================== End ======================
    
    const reMove = ref('')
    const removeFile=()=>{
        check_new_auth_user();
        $fetch(config.VUE_APP_API_URL_JOB+'me/resume/attachment',{method: "DELETE",headers: { "Access-Token": auth_users.value.tokens.access_token }
        }).then(res=>{
            message_success.value = res.message
            if (message_success.value) {
                $(".sh_toast").removeClass('d-none');
                $(".sh_toast").toast({delay: 6000});
                $(".sh_toast").toast('show');
            }
            reMove.value = GetAll.value.attachment
            $('#delete-hid').css('display','none')
            getAllResume()
        })
    }

    function downloadPDF(){
        let ios = helper.android_or_ios_device()
        if(ios === 'ios'){ VueCookieNext.setCookie('dl_resume', 'dl') }
        check_new_auth_user();
        loadindScreens.value = true
        const data_input = {
            summary: 'true',
            educations: 'all',
            experiences: 'all',
            skills: 'all',
            languages: 'all',
            hobbies: 'true',
            references: 'all',
        }
        if(auth_users.value){
            $fetch(config.VUE_APP_API_URL_JOB+'me/resume/download', {
                method: "POST", 
                headers: { "Access-Token": auth_users.value.tokens.access_token },
                body: new URLSearchParams(data_input)
            }).then(pdf=>{
                const result = JSON.parse(JSON.stringify(pdf));
                pdfFilePath.value = result.data.url
                setTimeout(function() {
                    window.location = pdfFilePath.value;
                    loadindScreens.value = false
                }, 1000);
            }).catch(er=>{
                loadindScreens.value = false
                alert('error')
            })
        }
    }

    // const route = useRoute();
    const post_id = ref(route.params.id ? route.params.id : '');
    const title = ref(route.query.title ? route.query.title : '');
    const isChecked = ref(false)
    const checkbox = ref(false)
    const messageError = ref('')
    const stepCookie = useCookie('stepCookie')
    const att_file = useState('att_file',()=>'')
    att_file.value = 'true'
    function toggleCheckbox() {
        isChecked.value = !isChecked.value; 
        if (isChecked.value) {
            att_file.value = 'false'
            checkbox.value = true
            messageError.value = ''
           
        } else {
            checkbox.value = false
            att_file.value = 'true'
            messageError.value = locale.value === 'km' ? "ឯកសារភ្ជាប់ត្រូវបានទាមទារ។" : 'Attachmen is Required.'
        }
    }

    const success = useCookie('success')
    const is_apply_load = ref(false)
    function submit_form_post() {
        is_apply_load.value = true
        check_new_auth_user();
        stepCookie.value = ''
        if(GetAll.value.attachment || checkbox.value){
            let data_body = {
                id: post_id.value,
                first_name: GetAll.value.personal_details.first_name,
                last_name: GetAll.value.personal_details.last_name,
                attachment:  att_file.value,
                email: GetAll.value.personal_details.email ? GetAll.value.personal_details.email: '',
                'phone[0]': GetAll.value.personal_details.phone[0],
                'phone[1]': GetAll.value.personal_details.phone[1] ? GetAll.value.personal_details.phone[1]: '',
                'phone[2]': GetAll.value.personal_details.phone[2] ? GetAll.value.personal_details.phone[2]: '',
            }; 
            // console.log(data_body)
            $fetch(config.VUE_APP_API_URL_JOB+'me/apply_job/easy_apply?lang=en', {
                method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "Access-Token": auth_user.value.tokens.access_token },
                body: new URLSearchParams(data_body)
            }).then(res =>{
                is_apply_load.value = false
                success.value = 'true'
                save_track_optional('clear_old_data', { clear_old_data: post_id.value });
                // router.back();
                router.back(localePath({ name: 'title-adid-id', params: { title: helper.check_special_char(title.value), id: post_id.value } }));
                setTimeout(()=>{
                    $('#show_modal_success').modal('show')
                },1000)
            }).catch(er =>{
                is_apply_load.value = false
                alert('error')
            })
        }else{
            is_apply_load.value = false
            messageError.value = locale.value === 'km' ? "ឯកសារភ្ជាប់ត្រូវបានទាមទារ។" : 'Attachmen is Required.'
            if(messageError.value){
                $('html, body').animate({
                    scrollTop: $("#attachments").offset().top
                }, 1000);
            }
        }
    }

    function clickStep(){
        stepCookie.value = 'step'
    }
    function goBack() { 
        window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); 
        stepCookie.value = ' '
    }
    function convert_price(price) { return helper.convert_price(price); }

    function check_title_char(title) { return helper.check_special_char(title); }
    function imageUrlAlt_post(the_event) { if (process.client && window.navigator.onLine) { the_event.target.src = empty_img_post.value; } }
    function save_track_optional(type, data_params) {
        helper.params_make_condition(type, data_params);
    }

    const loading_field = useState('loading_field',()=>'')
    loading_field.value = false;
    const get_username= useState('get_username',()=>'')
    const get_user_id = useState('get_user_id',()=>'')
    const url_imag = ref('')
    function click_chat(id) {
        check_new_auth_user();
        let data = GetAll.value;
        let user_id = data ? data.userid : '';
        if (window.navigator.onLine) {
            if (auth_users.value && auth_users.value.tokens.access_token) {
                loading_field.value = true;
                if(data.personal_details.photo){
                    url_imag.value = data.personal_details.photo.url
                }else{
                    url_imag.value = ''
                }
                let dt_post = {
                    show_topic_resume_id: data.id,
                    title: data.personal_details.name,
                    work_experience: data.personal_details.work_experience,
                    position : data.personal_details.position,
                    img: url_imag.value,
                }
                save_track_optional('dt_post', dt_post);
                save_track_optional('clear_old_data', { clear_old_data: 'clear' });
                $fetch(config.VUE_APP_API_URL + 'profiles/user/' + user_id, {
                    params: { fields: 'username' }
                }).then(res => {
                    helper.tracking_action('chat', { id: id, track_contact: 'resumes' }, 'chat', 'resume', '', '');
                    save_track_optional('clear_old_data', { clear_old_data: 'clear' });
                    // router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
                    if (isMobile.value) {
                        router.push(localePath({ name: 'chats-detail-chat', query: { to_id: user_id, username: res.data.username } }));
                    } else {
                        router.push(localePath({ name: 'chats', query: {to_id: user_id, username: res.data.username} }));
                    }
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
            }else{
                if(data.personal_details.photo){
                    url_imag.value = data.personal_details.photo.url
                }else{
                    url_imag.value = ''
                }
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'resume_chat',
                    expire: expired,
                    data: {
                        to_id: user_id,
                        username: get_user_id.value,
                        show_topic_resume_id: data.id,
                        title: data.personal_details.name,
                        work_experience: data.personal_details.work_experience,
                        position : data.personal_details.position,
                        img: url_imag.value,
                    },
                    from: {name: 'resume_chat'},
                    
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }
        }
    }

    function click_img(id){
        helper.tracking_action('view_photo', { id: id, track_contact: 'resumes' }, 'view_photo', 'resume', '', '');
    }

    const topic_id = ref(route.query.topic_id ? route.query.topic_id : ''); // get from listing chat
    const to_id = ref(route.query.to_id ? route.query.to_id : '');          // get from detail ads
    function send_resume(){
      check_new_auth_user();
      isLoading.value = true
      const data = {
        type: 'resume',
        id: GetAll.value.id
      }
      const data_input = {
        topic_id: topic_id.value,
        data: JSON.stringify(data)
      }
      const data_to_id = {
        to_id: to_id.value,
        data: JSON.stringify(data)
      }
      if(route.query.store_id){
        data_input['storeid'] = route.query.store_id
        data_to_id['storeid'] = route.query.store_id
      }
      if(topic_id.value){
        $fetch(config.VUE_APP_API_URL_CHAT_NEW+'messages?lang=en',{
          method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
          body: new URLSearchParams(data_input)
        }).then(res=>{
          isLoading.value = false
          router.back();
        }).catch(er=>{
          isLoading.value = false
          alert('error')
        })
      }
      if(to_id.value){
        $fetch(config.VUE_APP_API_URL_CHAT_NEW+'messages?lang=en',{
          method: "POST",headers: {"Access-Token": auth_users.value.tokens.access_token},
          body: new URLSearchParams(data_to_id)
        }).then(res=>{
          isLoading.value = false
          router.back();
        }).catch(er=>{
          isLoading.value = false
          alert('error')
        })
      }
    }

    const a_l_l_resume = useState('a_l_l_resume',()=>[]);
    const is_save_load = useState('is_save_load',()=>'')
    is_save_load.value = false
    const error_or_success_message = ref(true);
    function save_ads(allPublic,id_resume,is_un_save){
        check_new_auth_user();
        is_save_load.value = true
        if (window.navigator.onLine) {
            if (auth_users.value && auth_users.value.tokens.access_token) {
                if(is_un_save){
                    $fetch(config.VUE_APP_API_URL_MOBI+'me/saved',{
                        method: 'DELETE',
                        params: {id: allPublic.id , type: 'resume'},
                        headers: {"Access-Token": auth_users.value.tokens.access_token},
                    }).then(re=>{
                        is_save_load.value = false
                        helper.tracking_action('unsave', { id: id_resume, track_contact: 'resumes' }, 'unsave', 'resume', '', '');
                        for (let i = 0; i < a_l_l_resume.value.length; i ++) {
                            if (a_l_l_resume.value[i].id === id_resume) {
                                a_l_l_resume.value[i].saved = false;
                                break;
                            }
                        }
                        if (GetAll.value.id === id_resume) {
                            GetAll.value.saved = false;
                        }
                        message_success.value = re.message
                        if (message_success.value) {
                            error_or_success_message.value = true;
                            $(".sh_toast").removeClass('d-none');
                            $(".sh_toast").toast({delay: 6000});
                            $(".sh_toast").toast('show');
                        }
                    })
                }else{
                    $fetch(config.VUE_APP_API_URL_MOBI+'me/saved?lang=en',{
                        method: 'POST',
                        body: new URLSearchParams({id: allPublic.id , type: 'resume'}),
                        headers: {"Access-Token": auth_users.value.tokens.access_token},
                    }).then(re=>{
                        is_save_load.value = false
                        helper.tracking_action('save', { id: id_resume, track_contact: 'resumes', }, 'save', 'resume', '', '');
                        for (let i = 0; i < a_l_l_resume.value.length; i ++) {
                            if (a_l_l_resume.value[i].id === id_resume) {
                                a_l_l_resume.value[i].saved = true;
                                break;
                            }
                        }
                        if (GetAll.value.id  === id_resume) {
                            GetAll.value.saved = true;
                        }
                        message_success.value = re.message
                        if (message_success.value) {
                            error_or_success_message.value = false;
                            $(".sh_toast").removeClass('d-none');
                            $(".sh_toast").toast({delay: 6000});
                            $(".sh_toast").toast('show');
                        }
                    })
                }
            }
            else{
                is_save_load.value = false
                let expired = helper.Date_To_Timestamp('', 300, 'seconds');  // timestamp add 5 ( minute more 5 * 60 = 300 )
                let arr_save_state = {
                    action: 'resumes',
                    expire: expired,
                    data: {id: allPublic.id , type: 'resume' },
                    from: {name: 'resumes'}
                }
                localStorage.setItem("save_state", JSON.stringify(arr_save_state));
                router.push(localePath({ name: isDesktop ? 'auth-login' : 'auth' }));
            }
        }
    }
</script>
