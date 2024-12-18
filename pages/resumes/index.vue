<template>
    <div>
        <div v-if="loadindScreens" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div v-if="is_save_load" class="loading_back_ground">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width loading_bg">
            </div>
        </div>
        <div v-if="isMobile" class="_div_nav bg_app_bar_header_ h_all_resume ">
            <button @click="goBack" type="button" class="btn w_h_50px" aria-label="Back">
                <i class="ion-android-arrow-back font_click_back"></i>
            </button>
            <div class="col s_l_search_box_app_bar cur_sur">
                <div @click.self="show_pop_up_search">
                    <i @click="show_pop_up_search" class="fas ion-ios-search-strong w_14_h_18"></i>
                    <span @click="show_pop_up_search" class="truncate_wrap text_shadow">
                        <span v-if="!route.query.position">{{ locale === 'km' ? 'ស្វែងរក មុខតំណែង' : 'Search Position' }}</span>
                        <span v-else>{{ route.query.position }}</span>
                    </span>
                    <i v-if="route.query.position" @click="click_remove_text" class="fas ion-close-round s_l_icon_x_k_w"></i>
                </div>
            </div>
            <div @click="show_modal_search('mobile')" class="_pad_col_icon text-center">
                <button type="button" class="btn s_l_search_filter_app_bar" aria-label="btn badge">
                    <i class="icon-fi-rr-settings-sliders"></i>
                    <span v-if="sum_query > 0" class="badge"> {{ sum_query }} </span>
                </button>
            </div>
        </div>

        <div class="max_width_form">
            <!-- show status 503 -->
            <div v-if="status_503" class="stu_maintain mt-5">
                <img alt="wrench" :src="asset_url+version_library+'img/wrench.png'">
                <p class="stu_mt_title">{{ $t('new_text_3.server_maintain_title') }}</p>
                <p class="stu_mt_contain">{{ status_503 ? status_503.data : $t('new_text_3.server_maintain_dis') }}</p>
                <button class="btn btn-sm bg_btn" @click="try_reload" type="button">{{ $t('new_text_3.reload') }}</button>
                <br><br><br>
            </div>
            <div v-else>
                <nav class="navbar nav-field-s-con" :class="isMobile ? 'mt-5' : 'mt-60'"> <!-- v-if="!isDesktop" -->
                    <div class="d-flex" :class="isMobile ?'g-filter' : 'w-100'">
                        <div class="g-sort">
                            <!-- location -->
                            <template v-if="isMobile">
                                <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && route.query.province ? 'parent_color_strong' : ''">
                                    <div @click="show_modal_short_pro()" class="d-flex p-7">
                                        <div v-if="route.query.location">
                                            <div v-if="location" class="parent_color_strong">
                                                <div v-for="loc in location.data" :key="loc" >
                                                    <div v-if="route.query.location === loc.slug" >{{ locale === 'km' ? loc.km_name : loc.en_name }}</div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else >{{ $t('resume_cv.location') }}</div>
                                        <i @click="show_modal_short_pro()" v-if="!route.query.location" class="ion-android-arrow-dropdown me-1"></i>
                                    </div>
                                    <i v-if="route.query.location" @click="clear_select('location')" class="icon-clear n-f-s-icon1 pt-2 me-1"></i>
                                </div>
                            </template>
                            <template v-else>
                                <div class="n-f-s-c-a cur_sur dt-p-0" :class="route && route.query && route.query.province ? 'parent_color_strong' : ''">
                                    <div class="dropdown-toggle" :class="isMobile ? '' : 'p-7 d-flex'" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div v-if="route.query.location">
                                            <div v-if="location" class="parent_color_strong">
                                                <div v-for="loc in location.data" :key="loc" >
                                                    <div v-if="route.query.location === loc.slug" >{{ locale === 'km' ? loc.km_name : loc.en_name }}</div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else >{{ $t('resume_cv.location') }}</div>
                                        <i v-if="!route.query.location" class="ion-android-arrow-dropdown dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    </div>
                                    <i v-if="route.query.location" @click="clear_select('location')" class="icon-clear n-f-s-icon1" :class="isMobile ? '' : 'pt-2 h-100'"></i>

                                    <div class="dropdown-menu deopdown-w mt-2 p-0">
                                        <div v-if="location" class="modal-body de-head-quick_chat">
                                            <ul class="list-unstyled bg-white">
                                                <li v-for="loc in location.data" :key="loc" @click="click_short('location',loc.slug)" class="full_field_tag cur_sur h-v-mouse d-flex gt_full_field_tag">
                                                    <div class="w_95">{{ locale === 'km' ? loc.km_name : loc.en_name }}</div> <i v-if="route.query.location === loc.slug" class="fas fa-check-circle color_sub_icon mt-1 w_5 text-end float-right parent_color"></i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <!-- category -->
                            <template v-if="isMobile">
                                <div class="n-f-s-c-a cur_sur p-0" :class="route && route.query && route.query.sortby ? 'parent_color_strong' : ''">
                                    <span  @click="show_modal_short_category()" class="d-flex p-7">
                                        <div v-if="route.query.category">
                                            <div v-if="category1" class="parent_color_strong">
                                                <div v-for="val in category1.data" :key="val" >
                                                    <div v-if="route.query.category === val.slug">{{ locale === 'km' ? val.km_name : val.en_name }}</div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>{{ $t('resume_cv.category') }}</div>
                                        <i @click="show_modal_short_category()" v-if="!route.query.category" class="ion-android-arrow-dropdown me-1"></i>
                                    
                                    </span>
                                    <i v-if="route.query.category" @click="clear_select('category')" class="icon-clear n-f-s-icon1 pt-2 me-1"></i>
                                </div>
                            </template>
                            <template v-else>
                                <div class="n-f-s-c-a cur_sur dt-p-0" :class="route && route.query && route.query.sortby ? 'parent_color_strong' : ''">
                                    <span class="dropdown-toggle" :class="isMobile ? '' : 'p-7 d-flex'" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div v-if="route.query.category">
                                            <div v-if="category1" class="parent_color_strong">
                                                <div v-for="val in category1.data" :key="val" >
                                                    <div v-if="route.query.category === val.slug">{{ locale === 'km' ? val.km_name : val.en_name }}</div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>{{ $t('resume_cv.category') }}</div>
                                        <i v-if="!route.query.category" class="ion-android-arrow-dropdown dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    
                                    </span>
                                    <i v-if="route.query.category" @click="clear_select('category')" class="icon-clear n-f-s-icon1" :class="isMobile ? '' : 'pt-2 h-100'"></i>
                                    
                                    <div class="dropdown-menu deopdown-w mt-2 p-0">
                                        <div v-if="category1" class="modal-body de-head-quick_chat">
                                            <ul class="list-unstyled bg-white">
                                                <li v-for="cate in category1.data" :key="cate" @click="click_short('category',cate.slug)" class="full_field_tag cur_sur h-v-mouse d-flex gt_full_field_tag">
                                                    <div class="w_95">{{ locale === 'km' ? cate.km_name : cate.en_name }}</div> <i v-if="route.query.category === cate.slug" class="fas fa-check-circle color_sub_icon mt-1 mt-1 w_5 text-end float-right parent_color"></i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <!-- job type -->
                            <template v-if="isMobile">
                                <div  class="n-f-s-c-a cur_sur p-0" :class="route && route.query && (route.query.min_ad_price || route.query.max_ad_price) ? 'parent_color_strong' : ''">
                                    <div  @click="show_modal_short_jobType()" class="d-flex p-7">
                                        <div v-if="route.query['job_type']" class="parent_color_strong">
                                            <div v-if="route.query['job_type'] === 'full-time'"> {{ $t('resume_cv.full_titme') }}</div>
                                            <div v-if="route.query['job_type'] === 'part-time'"> {{ $t('resume_cv.part_time') }}</div>
                                            <div v-if="route.query['job_type'] === 'internships'"> {{ $t('resume_cv.internships') }}</div>
                                            <div v-if="route.query['job_type'] === 'freelance'"> {{ $t('resume_cv.freelance') }}</div>
                                            <div v-if="route.query['job_type'] === 'contract'"> {{ $t('resume_cv.contract') }}</div>
                                            <div v-if="route.query['job_type'] === 'volunteer'"> {{ $t('resume_cv.Volunteer') }}</div>
                                            <div v-if="route.query['job_type'] === 'other'"> {{$t('resume_cv.other')}} </div>
                                        </div>
                                        <div v-else>{{ $t('resume_cv.job_type') }}</div>
                                        <i  @click="show_modal_short_jobType()" v-if="!route.query['job_type']" class="ion-android-arrow-dropdown me-1"></i>
                                    
                                    </div>
                                    <i v-if="route.query['job_type']" @click="clear_select('job_type')" class="icon-clear n-f-s-icon1 pt-2 me-1"></i>
                                </div>
                            </template>

                            <template v-else>
                                <div  class="n-f-s-c-a cur_sur dt-p-0" :class="route && route.query && (route.query.min_ad_price || route.query.max_ad_price) ? 'parent_color_strong' : ''">
                                    <div class="dropdown-toggle" :class="isMobile ? '' : 'p-7 d-flex'" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div v-if="route.query['job_type']" class="parent_color_strong">
                                            <div v-if="route.query['job_type'] === 'full-time'"> {{ $t('resume_cv.full_titme') }}</div>
                                            <div v-if="route.query['job_type'] === 'part-time'"> {{ $t('resume_cv.part_time') }}</div>
                                            <div v-if="route.query['job_type'] === 'internships'"> {{ $t('resume_cv.internships') }}</div>
                                            <div v-if="route.query['job_type'] === 'freelance'"> {{ $t('resume_cv.freelance') }}</div>
                                            <div v-if="route.query['job_type'] === 'contract'"> {{ $t('resume_cv.contract') }}</div>
                                            <div v-if="route.query['job_type'] === 'volunteer'"> {{ $t('resume_cv.Volunteer') }}</div>
                                            <div v-if="route.query['job_type'] === 'other'"> {{$t('resume_cv.other')}} </div>
                                        </div>
                                        <div v-else>{{ $t('resume_cv.job_type') }}</div>
                                        <i v-if="!route.query['job_type']" class="ion-android-arrow-dropdown dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    
                                    </div>
                                    <i v-if="route.query['job_type']" @click="clear_select('job_type')" class="icon-clear n-f-s-icon1" :class="isMobile ? '' : 'pt-2 h-100'"></i>
                                    
                                    <div class="dropdown-menu min-w-dropdown mt-2 p-0">
                                        <div v-for="j_t in job_type" :key="j_t" @click="click_short('job_type',j_t)" class="full_field_tag cur_sur h-v-mouse d-flex gt_full_field_tag">
                                            <div class="w-100">
                                                <div class="w_95" v-if="j_t ==='full-time'">{{ $t('resume_cv.full_titme') }}</div> 
                                                <div class="w_95" v-if="j_t ==='part-time'">{{ $t('resume_cv.part_time') }}</div> 
                                                <div class="w_95" v-if="j_t ==='internships'">{{ $t('resume_cv.internships') }}</div> 
                                                <div class="w_95" v-if="j_t ==='freelance'">{{ $t('resume_cv.freelance') }}</div> 
                                                <div class="w_95" v-if="j_t ==='contract'">{{ $t('resume_cv.contract') }}</div> 
                                                <div class="w_95" v-if="j_t ==='volunteer'">{{ $t('resume_cv.Volunteer') }}</div> 
                                                <div class="w_95" v-if="j_t ==='other'">{{ $t('resume_cv.other') }}</div> 
                                            </div>
                                            <i v-if="route.query['job_type'] === j_t" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color"></i>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div v-if="!isMobile" class="ms-auto">
                            <div @click="show_modal_search('pc')" class="n-f-s-c-a cur_sur me-0">
                                <i class="bi bi-funnel me-1"></i>
                                {{ $t('message.filter') }}
                                <span v-if="sum_query > 0" class="badge bg_badge"> {{ sum_query }} </span>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="min-vh-100 position-relative" >
                    <div class="mt_65">
                        <div v-for="(allPublic,index) in a_l_l_resume" :key="index" class="position-relative" :class="isMobile ? '' : 'ml_mr_-8'">
                            <div v-if="auth_user">
                                <div v-if="auth_user.user.id !== allPublic.userid" class="save_or_not" @click="save_ads(allPublic,allPublic.id,allPublic.saved,index)">
                                    <i v-if="allPublic.saved" id="bookmak_save" class="fa fa-bookmark parent_color p-2"></i>
                                    <i v-else  class="far fa-bookmark text-secondary p-2" id="bookmak_not_save"></i>
                                </div>
                            </div>
                            <div v-if="!auth_user" class="save_or_not" @click="save_ads(allPublic)">
                                <i class="far fa-bookmark text-secondary p-2"></i>
                            </div>
                            <NuxtLink :to="localePath({ name: 'resumes' })+'/'+check_title_char(allPublic.name)+'-cvid-'+allPublic.id" @click="clickToPage(allPublic,allPublic.photo,allPublic.id,index)">
                                <div class="p-3 m-8 bg-white rounded " >
                                    <div class="d-flex">
                                        <img v-if="allPublic.photo" :data-src="allPublic.photo.url" class="lazy rs-logo" :alt="allPublic.photo.title"  :src="empty_img_loading" @error="imageUrlAlt_post">
                                        <img v-else data-src="/icon/user-icon.png" alt="" class="lazy rs-logo" :src="empty_img_loading" @error="imageUrlAlt_post">
                                        <div class="ms-2">
                                            <div class="fn_16"><strong>{{  allPublic.name }}</strong></div>
                                            <div class="fn_14">
                                                {{ allPublic.position }}
                                            </div>
                                            <div class="fn_14" v-if="allPublic.work_experience">
                                                {{ locale === 'km' ? 'បទពិសោធន៍ '+allPublic.work_experience+ ' ឆ្នាំ' : allPublic.work_experience+ ' years experience' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if=" allPublic.skills" class="d-flex flex-wrap mt-1 fn_14">
                                        <div v-for="arrSkill in  allPublic.skills" :key="arrSkill" class="me-2 mt-1 ps-2 pe-2 bg_bd">
                                            {{ arrSkill }}
                                        </div>
                                    </div>
                                    <div v-if="allPublic.summary" class="mt-3 text_truncate fn_14 break_word">
                                        {{ allPublic.summary }}
                                    </div>
                                </div>
                            </NuxtLink>
                            <ClientOnly>
                                <div v-observe-visibility="{
                                        callback: (isVisible, entry) => visibilityChanged(isVisible, entry, {
                                            id: allPublic.id,
                                            index: index,
                                            type: 'list',
                                            paid: allPublic.type !== 'normal' ? true : false,
                                            placement: '',
                                        }),
                                        once: true,       // show and get only new data in view port, if scroll up not count old data.
                                    }"></div>
                            </ClientOnly>
                        </div>
                        <template v-if="!isDesktop">
                            <ClientOnly>
                            <VueEternalLoading :load="show_public_resume"  v-model:is-initial="isInitial"  margin="800px">
                                <template #loading>
                                <!-- loading when have data -->
                                <div v-if="a_l_l_resume.length > 0" class="text-center mt-4">
                                    <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                                </div>
                                <!-- loading when data empty -->
                                <div v-else class="full_width">
                                    <div v-for="s in 5" :key="s" class="col-12 no_padding">
                                    <div class="f-w-pad">
                                        <div class="my_card pad_card_ _flex_">
                                        <div class="animated-background">
                                            <div class="f-w-width"></div>
                                        </div>
                                        <div class="width_100 pb-0 pt-1 ps-3">
                                            <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
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
                                </template>
                                <template #error="{ retry }">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding" :class="a_l_l_resume.length > 0 ? '' : 'margin_below_app_bar'">
                                    <div class="no_more_result p-2">
                                    <div class="p_bg_status">
                                        <span class="fas fa-wifi size_icon_status"></span>
                                        <h3 class="mt-4 font_bold font_21"> {{ $t('error_connect.title_error_con') }} </h3>
                                        <p class="font_16 pt-2 pb-2 ps-3 pe-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
                                        <button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
                                    </div>
                                    </div>
                                </div>
                                </template>
                                <template #no-more>
                                    <div class="no_more_result m_20">{{ $t('message.no_more_result') }}</div>
                                </template>
                                <template #no-results >
                                    <div class="no_more_result" :class="$device.isMobile ? 'n-m-r-mg' : 'py-5 bg-white mt-2'">
                                    <!-- <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                    <p class="no_more_result mt-2"> {{ $t('message.no_result') }} </p> -->
                                    <img src="/icon/empty-box.png" alt="empty-box.png" width="110px">
                                    <p class="no_more_result mt-2">You don't have any list resumes right now</p>
                                </div>
                                </template>
                                <div>
                                    
                                </div>
                            </VueEternalLoading>
                            </ClientOnly>
                        </template>
                        <template v-else>
                            <div v-if="dt_loading" class="width_100 text-center mt-4" ref="targets">
                            <div v-if="a_l_l_resume.length > 0" class="text-center mt-4 mb-4">
                                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="Loading..." class="loading_width">
                            </div>
                            <div v-else class="full_width">
                                <div v-for="s in 5" :key="s" class="col-12 no_padding">
                                <div class="f-w-pad">
                                    <div class="my_card pad_card_ _flex_">
                                    <div class="animated-background">
                                        <div class="f-w-width"></div>
                                    </div>
                                    <div class="width_100 pb-0 pt-1 ps-3">
                                        <h1 class="animated-background mb-2 text_hei_loading_title"></h1>
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
                            <div v-else class="des_btn_load_more width_100">
                            <button v-if="l_hide_btn_load_more" @click="manually_show_resume" class="btn">{{ $t('text_desktop.load_more') }}</button>
                            <div v-else-if="a_l_l_resume.length === 0" class="no_more_result n-m-r-mg text-center width_100">
                                <i class="fa fa-exclamation-circle u_no_result_font"></i>
                                <p class="no_more_result mt-2">{{ $t('message.no_result') }}</p>
                            </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>  

        <!-- show modal province -->
        <div class="modal fade style_full_screen" id="modal_short_filter_province" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="s_content overflow_class">
                        <!-- header -->
                        <div class="de-list-quick-chat">
                            <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                            <div class="m-auto">{{ $t('resume_cv.location') }}</div>
                            <button class="btn"></button>
                        </div>
                        <!-- content -->
                        <div v-if="location" class="modal-body de-head-quick_chat">
                            <ul class="list-unstyled bg-white">
                                <li v-for="loc in location.data" :key="loc" @click="click_short('location',loc.slug)" class="full_field_tag cur_sur h-v-mouse d-flex">
                                    <div class="w_95">{{ locale === 'km' ? loc.km_name : loc.en_name }}</div> <i v-if="route.query.location === loc.slug" class="fas fa-check-circle color_sub_icon mt-1 w_5 text-end float-right parent_color"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade " id="modal_short_filter_province1" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                <div class="modal-content rounded">
                    <div class="modal-header m_h_p">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="col text-center">   ​</div>
                        <div class="_pad_col_icon">
                            <button class="btn clear s_pad_clear " >​​</button>
                        </div>
                    </div>
                    <div v-if="location" class="modal-body de-head-quick_chat">
                        <ul class="list-unstyled bg-white">
                            <li v-for="loc in location.data" :key="loc" @click="click_short('location',loc.slug)" class="full_field_tag cur_sur h-v-mouse d-flex">
                                <div class="w_95">{{ locale === 'km' ? loc.km_name : loc.en_name }}</div> <i v-if="route.query.locetion === loc.slug" class="fas fa-check-circle color_sub_icon mt-1 w_5 text-end float-right parent_color"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal show category -->
        <div class="modal fade style_full_screen" id="modal_short_category" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="s_content overflow_class">
                        <!-- header -->
                        <div class="de-list-quick-chat">
                            <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                            <div class="m-auto">{{ $t('resume_cv.category') }}</div>
                            <button class="btn"></button>
                        </div>
                        <!-- content -->
                        <div v-if="category1" class="modal-body de-head-quick_chat">
                            <ul class="list-unstyled bg-white">
                                <li v-for="cate in category1.data" :key="cate" @click="click_short('category',cate.slug)" class="full_field_tag cur_sur h-v-mouse d-flex">
                                    <div class="w_95">{{ locale === 'km' ? cate.km_name : cate.en_name }}</div> <i v-if="route.query.category === cate.slug" class="fas fa-check-circle color_sub_icon mt-1 mt-1 w_5 text-end float-right parent_color"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade " id="modal_short_category1" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                <div class="modal-content rounded">
                    <div class="modal-header m_h_p">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="col text-center">   ​</div>
                        <div class="_pad_col_icon">
                            <button class="btn clear s_pad_clear " >​​</button>
                        </div>
                    </div>
                    <div v-if="category1" class="modal-body de-head-quick_chat">
                        <ul class="list-unstyled bg-white">
                            <li v-for="cate in category1.data" :key="cate" @click="click_short('category',cate.slug)" class="full_field_tag cur_sur h-v-mouse d-flex">
                                <div class="w_95">{{ locale === 'km' ? cate.km_name : cate.en_name }}</div> <i v-if="route.query.category === cate.slug" class="fas fa-check-circle color_sub_icon mt-1 mt-1 w_5 text-end float-right parent_color"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal show job type -->
        <div class="modal fade style_full_screen" id="modal_short_job_type" tabindex="-1" role="dialog">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content animate-bottom">
                    <div class="s_content overflow_class">
                        <!-- header -->
                        <div class="de-list-quick-chat">
                            <button data-bs-dismiss="modal" aria-label="Close" class="btn icon-clear de-btn-back"></button>
                            <div class="m-auto">{{ $t('resume_cv.job_type') }}</div>
                            <button class="btn"></button>
                        </div>
                        <!-- content -->
                        <div  class="modal-body de-head-quick_chat">
                            <div class="list-unstyled bg-white">
                                <div v-for="j_t in job_type" :key="j_t" @click="click_short('job_type',j_t)" class="full_field_tag cur_sur h-v-mouse d-flex">
                                    <div class="w-100">
                                        <div class="w_95" v-if="j_t ==='full-time'">{{ $t('resume_cv.full_titme') }}</div> 
                                        <div class="w_95" v-if="j_t ==='part-time'">{{ $t('resume_cv.part_time') }}</div> 
                                        <div class="w_95" v-if="j_t ==='internships'">{{ $t('resume_cv.internships') }}</div> 
                                        <div class="w_95" v-if="j_t ==='freelance'">{{ $t('resume_cv.freelance') }}</div> 
                                        <div class="w_95" v-if="j_t ==='contract'">{{ $t('resume_cv.contract') }}</div> 
                                        <div class="w_95" v-if="j_t ==='volunteer'">{{ $t('resume_cv.Volunteer') }}</div> 
                                        <div class="w_95" v-if="j_t ==='other'">{{ $t('resume_cv.other') }}</div> 
                                    </div>
                                    <i v-if="route.query['job_type'] === j_t" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade " id="modal_short_job_type1" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                <div class="modal-content rounded">
                    <div class="modal-header m_h_p">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="col text-center">   ​</div>
                        <div class="_pad_col_icon">
                            <button class="btn clear s_pad_clear " >​​</button>
                        </div>
                    </div>
                    <div  class="modal-body de-head-quick_chat2">
                        <div class="list-unstyled bg-white">
                            <div v-for="j_t in job_type" :key="j_t" @click="click_short('job_type',j_t)" class="full_field_tag cur_sur h-v-mouse d-flex">
                                <div class="w-100">
                                    <div class="w_95" v-if="j_t ==='full-time'">{{ $t('resume_cv.full_titme') }}</div> 
                                    <div class="w_95" v-if="j_t ==='part-time'">{{ $t('resume_cv.part_time') }}</div> 
                                    <div class="w_95" v-if="j_t ==='internships'">{{ $t('resume_cv.internships') }}</div> 
                                    <div class="w_95" v-if="j_t ==='freelance'">{{ $t('resume_cv.freelance') }}</div> 
                                    <div class="w_95" v-if="j_t ==='contract'">{{ $t('resume_cv.contract') }}</div> 
                                    <div class="w_95" v-if="j_t ==='volunteer'">{{ $t('resume_cv.Volunteer') }}</div> 
                                    <div class="w_95" v-if="j_t ==='other'">{{ $t('resume_cv.other') }}</div> 
                                </div>
                                <i v-if="route.query['job_type'] === j_t" class="fas fa-check-circle color_sub_icon mt-1 float-right parent_color"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal style_full_screen" id="show_modal_saerch" :class="isDesktop ? 'dt_filter_modal' : ''"
            tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content modal_content_style">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                        <div class="_div_nav border_bottom_search">
                            <div class="_pad_col_icon" id="close_modal_search" data-bs-dismiss="modal" aria-label="Close">
                                <button class="btn clear-btn-app-bar" aria-label="Clear">
                                    <i class="icon-clear font_26 text_grey"></i>
                                </button>
                            </div>
                            <div class="col row_padding ms-2">
                                <input v-on:keyup="keymonitor" @keyup.enter="save_to_localstorage" autocomplete="off" maxlength="255" class="form-control app_bar_search font_18"
                                    v-model="query_arr['position']"  id="_search_" ref="searchbar" type="text" :placeholder="$t('message.search')+'...'">
                            </div>
                            <div class="_pad_col_icon text-center">
                                <button @click="save_to_localstorage" class="btn mg_icon_search" aria-label="search">
                                    <i class="fas ion-ios-search-strong font_26 text_grey"></i>
                                </button>
                            </div>
                        </div>
                        <template v-if="data_storage">
                        <div id="test_modal">
                                <div class="style_flex p_s_pad_field">
                                    <div class="col-6 font_18"> {{ $t('message.recent_search') }} </div>
                                    <div class="col-6 text-right pe-0">
                                        <span @click="remove_localstorage" class="clear parent_color font_18 p_s_pad_clear cl_ripple cur_sur">
                                            {{ $t('message.clear') }}
                                        </span>
                                    </div>
                                </div>
                                <div v-for="storage in data_storage" :key="storage" class="col con-recent-history style_flex p_s_pad_list_history s-filter-history cur_sur h-v-mouse">
                                    
                                    <div @click="click_to_localstorage(storage)" class="ic-warn-acc-con">
                                        <i class="fas fa-history text_grey"></i>
                                    </div>
                                    <div class="s-f-div-text">
                                        <div class="p_s_recent_history m-0 font_16 break_word" @click="click_to_localstorage(storage)"> {{ storage }} </div>
                                    </div>
                                    <div @click="edit_search(storage)" class="ic-warn-acc-con s-f-pad-text">
                                        <i class="fas fa-pencil-alt text_grey"></i>
                                    </div>
                                </div>
                        </div>
                        </template>
                    </div>
                    <!-- show history -->
                    
                </div>
            </div>
        </div>

        <!-- <Modal_search :clear_search_suggestion="clear_val_suggestion_popup"/> -->
        <!-- show modal filter  -->
        <div v-if="!isDesktop" class="modal style_full_screen p-0 overflow_auto" id="modal_resume_filter" tabindex="-1" role="dialog" aria-labelledby="show_search" aria-hidden="true">
            <div class="modal-dialog modal_dialog_style" role="document">
                <div class="modal-content modal_content_style">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                        <div class="_div_nav bg_app_bar_header_">
                            <div id="close_modal_query_str" @click="close" data-bs-dismiss="modal" aria-label="Close" class="_pad_col_icon">
                                <button aria-label="Close Modal" class="btn clear-btn-app-bar">
                                    <i class="icon-clear font_click_back"></i>
                                </button>
                            </div>
                            <div class="col _pad_title_single text-center">
                                <p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p>
                            </div>
                            <div class="_pad_col_icon">
                                <button class="btn clear s_pad_clear text-white" @click="clear_filter">
                                    {{ $t('message.clear') }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="margin_below_app_bar" :class="isMobile ? 'mt-5' : ''">
                        <div class="form-group p_div_pad_color max_width_form">
                            <div class="mb-3 position_relative" >
                                <label class="label"> {{ $t('message.search') }} </label>
                                <input type="text" v-model="query_arr['position']" class="form-control custom_field more_border">
                            </div>
                            <div class="mb-3 position_relative" >
                                <label class="label"> {{ $t('resume_cv.c_p') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control custom_field more_border" v-model="query_arr['location']">
                                    <option value="">  </option>
                                    <template v-if="location" >
                                        <option v-for="loc in location.data" :key="loc" :value="loc.slug">
                                        {{ locale === 'km' ? loc.km_name : loc.en_name }}
                                        </option>
                                    </template>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="label"> {{ $t('resume_cv.category') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control custom_field more_border" v-model="query_arr['category']">
                                    <option value="">  </option>
                                    <template v-if="category1" >
                                        <option v-for="cate in category1.data" :key="cate" v-bind:value="cate && cate.slug">
                                            {{ locale === 'km' ? cate.km_name : cate.en_name }}
                                        </option>
                                    </template>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="label"> {{ $t('resume_cv.job_type') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control custom_field more_border" v-model="query_arr['job_type']">
                                    <option value="">  </option>
                                    <option value="full-time">{{ $t('resume_cv.full_titme') }}</option>
                                    <option value="part-time">{{$t('resume_cv.part_time')}}</option>
                                    <option value="internships">{{$t('resume_cv.internships')}}</option>
                                    <option value="freelance">{{$t('resume_cv.freelance')}}</option>
                                    <option value="contract">{{$t('resume_cv.contract')}}</option>
                                    <option value="volunteer">{{$t('resume_cv.Volunteer')}}</option>
                                    <option value="other">{{$t('resume_cv.other')}}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="label"> {{ $t('resume_cv.experience_year') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control custom_field more_border" id="select" v-model="query_arr['work_experience']">
                                    <option  value="">  </option>
                                    <option value="0">{{ locale === 'km' ? 'មិនត្រូវការបទពិសោធន៏' : 'No experience needed' }}</option>
                                    <template v-for="num in 10" :key="num">
                                        <option :value="num">
                                            {{ locale === 'km' ? num+' '+'ឆ្នាំ+' : num+' '+'Year+' }}
                                        </option>
                                    </template>
                                </select>
                            </div>
                            <div class="mb-3" v-if="isMobile">
                                <label class="label"> {{ $t('resume_cv.gender') }} </label>
                                <div class="radio-new-or-second-hand text-center row m-0">
                                    <div class="col p_pad_radio_option">
                                        <input type="radio" id="any" v-model="query_arr['gender']" class="form-control custom_field more_border" name="ad_condition" value="">
                                        <label for="any" class="form-control custom_field more_border"><p class="m-0 pt-1">{{ $t('resume_cv.any') }}</p></label>
                                    </div>
                                    <div class="col p_pad_radio_option">
                                        <input type="radio" id="m" v-model="query_arr['gender']" name="ad_condition" value="m">
                                        <label for="m" class="form-control custom_field more_border"><p class="m-0 pt-1">{{ $t('resume_cv.m') }}</p></label>
                                    </div>
                                    <div class="col p_pad_radio_option">
                                        <input type="radio" id="f" v-model="query_arr['gender']" name="ad_condition" value="f">
                                        <label for="f" class="form-control custom_field more_border"><p class="m-0 pt-1">{{ $t('resume_cv.f') }}</p></label>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="label"> {{ $t('resume_cv.education') }} </label>
                                <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                <select class="form-control custom_field more_border" v-model="query_arr['education_level']">
                                    <option value="">  </option>
                                    <option value="high-school">{{ $t('resume_cv.high_school') }}</option>
                                    <option value="associate">{{$t('resume_cv.associate')}}</option>
                                    <option value="professional">{{$t('resume_cv.professional')}}</option>
                                    <option value="bachelor">{{$t('resume_cv.bachelor')}}</option>
                                    <option value="master">{{$t('resume_cv.master')}}</option>
                                    <option value="doctor">{{$t('resume_cv.doctor')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br><br>

                    <div class="nav p_div_apply_filter pt-2">
                        <button @click="submit_filter" type="button" class="btn btn-sm e_style_btn_filter custom_btn_ width_100">
                            <p class="m_text_btn"> {{ $t('message.apply_filter') }} </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade " id="modal_resume_filter1" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable m-auto m_w">
                <div class="modal-content rounded">
                    <div class="modal-header m_h_p">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="col text-center"><p class="name_style truncate_wrap m-0"> {{ $t('message.filter') }} </p></div>
                        <div class="_pad_col_icon">
                            <button class="btn clear s_pad_clear "  @click="clear_filter">{{ $t('message.clear') }}​​</button>
                        </div>
                    </div>
                    <div  class="modal-body py-1">
                        <div class="margin_below_app_bar">
                            <div class="form-group max_width_form">
                                <div class="mb-3 position_relative" >
                                    <label class="label"> {{ $t('message.search') }} </label>
                                    <input type="text" v-model="query_arr['position']" class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'">
                                </div>
                                <div class="mb-3 position_relative" >
                                    <label class="label"> {{ $t('resume_cv.c_p') }} </label>
                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                    <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="query_arr['location']">
                                        <option value="">  </option>
                                        <template v-if="location" >
                                            <option v-for="loc in location.data" :key="loc" :value="loc.slug">
                                            {{ locale === 'km' ? loc.km_name : loc.en_name }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="label"> {{ $t('resume_cv.category') }} </label>
                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                    <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="query_arr['category']">
                                        <option value="">  </option>
                                        <template v-if="category1" >
                                            <option v-for="cate in category1.data" :key="cate" v-bind:value="cate && cate.slug">
                                                {{ locale === 'km' ? cate.km_name : cate.en_name }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="label"> {{ $t('resume_cv.job_type') }} </label>
                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                    <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="query_arr['job_type']">
                                        <option value="">  </option>
                                        <option value="full-time">{{ $t('resume_cv.full_titme') }}</option>
                                        <option value="part-time">{{$t('resume_cv.part_time')}}</option>
                                        <option value="internships">{{$t('resume_cv.internships')}}</option>
                                        <option value="freelance">{{$t('resume_cv.freelance')}}</option>
                                        <option value="contract">{{$t('resume_cv.contract')}}</option>
                                        <option value="volunteer">{{$t('resume_cv.Volunteer')}}</option>
                                        <option value="other">{{$t('resume_cv.other')}}</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="label"> {{ $t('resume_cv.experience_year') }} </label>
                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                    <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" id="select" v-model="query_arr['work_experience']">
                                        <option  value="">  </option>
                                        <option value="0">{{ locale === 'km' ? 'មិនត្រូវការបទពិសោធន៏' : 'No experience needed' }}</option>
                                        <template v-for="num in 10" :key="num">
                                            <option :value="num">
                                                {{ locale === 'km' ? num+' '+'ឆ្នាំ+' : num+' '+'Year+' }}
                                            </option>
                                        </template>
                                    </select>
                                </div>
                                <div class="mb-3" v-if="isMobile === false">
                                    <label class="label"> {{ $t('resume_cv.gender') }} </label>
                                    <div class="radio-new-or-second-hand text-center row m-0">
                                        <div class="col p_pad_radio_option">
                                            <input type="radio" id="any" v-model="query_arr['gender']" class="form-control custom_field more_border" name="ad_condition" value="">
                                            <label for="any" class="form-control py-0 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0 pt-1">{{ $t('resume_cv.any') }}</p></label>
                                        </div>
                                        <div class="col p_pad_radio_option">
                                            <input type="radio" id="m" v-model="query_arr['gender']" name="ad_condition" value="m">
                                            <label for="m" class="form-control py-0 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0 pt-1">{{ $t('resume_cv.m') }}</p></label>
                                        </div>
                                        <div class="col p_pad_radio_option">
                                            <input type="radio" id="f" v-model="query_arr['gender']" name="ad_condition" value="f">
                                            <label for="f" class="form-control py-0 more_border" :class="isMobile ? 'field-height' : 'dt-field-height'"><p class="m-0 pt-1">{{ $t('resume_cv.f') }}</p></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="label"> {{ $t('resume_cv.education') }} </label>
                                    <i class="ion-android-arrow-dropdown s_icon_in_select_option"></i>
                                    <select class="form-control more_border" :class="isMobile ? 'field-height' : 'dt-field-height'" v-model="query_arr['education_level']">
                                        <option value="">  </option>
                                        <option value="high-school">{{ $t('resume_cv.high_school') }}</option>
                                        <option value="associate">{{$t('resume_cv.associate')}}</option>
                                        <option value="professional">{{$t('resume_cv.professional')}}</option>
                                        <option value="bachelor">{{$t('resume_cv.bachelor')}}</option>
                                        <option value="master">{{$t('resume_cv.master')}}</option>
                                        <option value="doctor">{{$t('resume_cv.doctor')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-0">
                        <button @click="submit_filter" type="button" class="btn btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                            <p class="m_text_btn"> {{ $t('message.apply_filter') }} </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- show success message -->
        <div class="toast style_toast d-none sh_toast toast_z_index">
            <div class="toast-header header_padding_toast">
                <strong class="me-auto style_flex">
                    <i v-if="error_or_success_message" class="fas fa-check-circle text-success font_22"></i>
                    <i v-else class="fas fa-check-circle text-success font_22"></i>
                    <p class="m-0 ms-2"> {{ message_success }} </p>
                </strong>
                <button type="button" class="ms-2 mt-1 mb-0 close" data-bs-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <!-- /show success message -->
    </div>
</template>
<script setup>
    import { event, pageview, query } from 'vue-gtag';
    import helper from "/helper";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( { layout: "default", middleware: "auth"} ); // use layout dont have bottom nav bar check auth.
    const auth_user = useCookie('auth_user')
    const { locale } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const loadindScreen = useState('loadindScreen')
    loadindScreen.value = false
    const loadindScreens = useState('loadindScreens')
    loadindScreens.value = false
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; // config.VUE_APP_BASE_URL;
    const a_l_l_pageSize = useState('a_l_l_pageSize',()=>0);
    const a_l_l_resume = useState('a_l_l_resume',()=>[]);
    const l_hide_btn_load_more = useState('l_hide_btn_load_more', () => true);
    const dt_loading = ref(false);
    const error_or_success_message = ref(true);
    const message_success = ref('');
    const empty_img_post = ref("/icon/empty_post.png");
    const empty_img_loading = ref('/icon/img-loader.gif');
    const category1 = useState('category1',()=>'')

    const query_arr = ref({})
    const data_query = ref({})
    const object_ = ref({})
    const sum_query = ref(0)

    const All_P_Resume = useState('All_P_Resume',()=>'')
    const showNav = useState('showNav',()=>'')
    showNav.value = false
    // chat
    const loading_field = useState('loading_field',()=>'')
    loading_field.value = false;
    const localePath = useLocalePath();
    const user_data = ref('')
    // filter 
    const isInitial = ref(true);
    const job_type = ['full-time', 'part-time', 'internships', 'freelance','contract','volunteer','other']
    const slug_y_ex = ref('')
    const slug_gender = ref('')
    const slug_edu = ref('')
    const search_resume = ref('')
    const data_storage = ref(null);
    const ch_resume_list = ref('');
    const click_one = useState('click_one',()=>'')
    const isMobile= ref(helper.m_or_d())
    const status_503 = ref('');
    const refresh_loader = ref(0)
    function close(){
        slug_y_ex.value =  ''
        slug_gender.value = ''
        slug_edu.value = ''
    }
    if (process.server) {
        await show_resume_server();
    }
    onMounted(()=>{
        if(process.client){
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true ;
            object_.value = route.query
            sum_query.value = Object.keys(object_.value).length
            check_new_auth_user(); 
            reload_lazy_img();
            ch_resume_list.value = localStorage.getItem('list_re');
        }
        if (process.server) {
            // --- check if click form account page, must to clear old data ---
            const pa_con = helper.get_params_make_condition(); // get data params condition.
            const p_clear = pa_con && pa_con.clear_old_data && pa_con.clear_old_data.d_params ? pa_con.clear_old_data.d_params : ''; // check clear_old_data from params.
            if (p_clear.clear_old_data) {
                a_l_l_pageSize.value = 0;
                a_l_l_resume.value = [];
            }
            if (isDesktop && a_l_l_resume.value.length === 0) {
                manually_show_resume(); // In Desktop View and post empty for the first, must get new data.
            }
            a_l_l_pageSize.value = 0;
            a_l_l_resume.value = [];
        }
        check_new_auth_user();
        var revers_arr = JSON.parse(localStorage.getItem('storedData'));
        data_storage.value = revers_arr ? revers_arr.reverse() : null; // reverse mean move arr down to up
    })

    onUnmounted(() => {
        helper.clear_params_make_con('clear_old_data');
    })

    watch(() => route.query, () => {
        if(click_one.value == '1'){
            click_one.value = ''
            query_arr.value['position'] = route.query.position ? route.query.position : ''
            submit_filter()
        }
        object_.value = route.query
        sum_query.value = Object.keys(object_.value).length
        a_l_l_pageSize.value = 0;
        a_l_l_resume.value = [];
        isInitial.value = true;
    });

    function try_reload() {
        a_l_l_pageSize.value = 0;
        a_l_l_resume.value = [];
        refresh_loader.value += 1;      // reload scroll again
        isInitial.value = true;         // reload scroll again
    }
    
    function check_new_auth_user() { 
        user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
    }

    async function show_resume_server() {
        try {
            check_new_auth_user()
            if (Object.keys(query_arr.value).length === 0) {
                data_query.value = route.query
            } else{
                data_query.value = query_arr.value 
            }
            const { data: res_list_resume } = await useFetch(config.VUE_APP_API_URL_JOB+`resumes?lang=${locale.value==='/' ? 'en' : locale.value}&offset=${a_l_l_pageSize.value}`, {
                params :data_query.value ,
            })
            let r_p = res_list_resume.value ? res_list_resume.value : '';
            if (r_p) {
                a_l_l_pageSize.value += r_p.limit;
                if (r_p.data.length) {
                    a_l_l_resume.value = a_l_l_resume.value.concat(r_p.data); // concat in multiple array
                }
            }
            
        } catch (e) {
            console.log(e);
        }
    }
    
    async function show_public_resume({loaded, error, noMore, noResults}, { isFirstLoad }){
        if (Object.keys(query_arr.value).length === 0) {
            data_query.value = route.query
        } else{
            data_query.value = query_arr.value 
        }

        check_new_auth_user();
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL_JOB+`resumes?lang=${locale.value==='/' ? 'en' : locale.value}&offset=${a_l_l_pageSize.value}`,{
                params : data_query.value,
                headers: {"Access-Token": user_data.value.tokens.access_token},
            }).then(res=>{
                a_l_l_pageSize.value += res.limit
                if(res.data){
                    a_l_l_resume.value = a_l_l_resume.value.concat(res.data);
                    localStorage.setItem("list_re", '1');
                }
                // -- tracking on google analytic --
                if (a_l_l_resume.value.length <= 30 && a_l_l_pageSize.value === 30) {  } // prevent likes post smaller than 10 and request two time
                else { track_google_analytics(a_l_l_pageSize.value > 30 ? a_l_l_pageSize.value : 0); }
                
                if (res.data.length === 0) {
                    if (a_l_l_resume.value.length === 0) {
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore 1');
                    }
                    } else {
                        noMore(); // console.log('noMore 2');
                    }
                } else {
                    if (a_l_l_resume.value.length < a_l_l_pageSize.value) {
                        noMore(); // console.log('noMore 3'); // close scroll.
                    } else {
                        setTimeout(function () { loaded(); }, 2000); //  console.log('loaded'); // scroll down load more.
                    }
                }
                reload_lazy_img();
            }).catch(e=>{
                if(e){
                    let check = e.response; 
                    let data_check = check ? JSON.stringify(check) : '';
                    let d_parse = data_check ? JSON.parse(data_check) : '';
                    ch_resume_list.value = localStorage.getItem('list_re');
                    if (!e.response) {
                        if(!ch_resume_list.value || ch_resume_list.value === ''){
                            noResults();
                        }else{
                            noMore(); 
                        }
                    }
                    if (e.response && e.response.status === 401) { // retry
                        check_new_auth_user();
                        setTimeout( () => { show_public_resume(); }, 3000);
                    }else if (check && check.status === 503) { // show status maintain
                        status_503.value = { status: 503, data: d_parse._data.message }
                    }
                }
            })
            
        }
        else{
            $fetch(config.VUE_APP_API_URL_JOB+`resumes?lang=${locale.value==='/' ? 'en' : locale.value}&offset=${a_l_l_pageSize.value}`,{
                params :data_query.value ,
            })
            .then(res=>{
                a_l_l_pageSize.value += res.limit
                if(res.data){
                    a_l_l_resume.value = a_l_l_resume.value.concat(res.data);
                    localStorage.setItem("list_re", '1');
                }

                // -- tracking on google analytic --
                if (a_l_l_resume.value.length <= 30 && a_l_l_pageSize.value === 60) {  } // prevent likes resunme smaller than 30 and request two time
                else { track_google_analytics(a_l_l_pageSize.value > 30 ? a_l_l_pageSize.value : 0); }
                
                if (res.data.length === 0) {
                    if (a_l_l_resume.value.length === 0) {
                    if (isFirstLoad) {
                        noResults(); // console.log('noResult');
                    } else {
                        noMore(); // console.log('noMore 1');
                    }
                    } else {
                        noMore(); // console.log('noMore 2');
                    }
                } else {
                    if (a_l_l_resume.value.length < a_l_l_pageSize.value) {
                        noMore(); // console.log('noMore 3'); // close scroll.
                    } else {
                        setTimeout(function () { loaded(); }, 2000); //  console.log('loaded'); // scroll down load more.
                    }
                }
                reload_lazy_img();
            }).catch(e=>{
                let check = e.response;
                let data_check = check ? JSON.stringify(check) : '';
                let d_parse = data_check ? JSON.parse(data_check) : '';
                if (!e.response) {
                    if (!e.response) {
                        if(!ch_resume_list.value || ch_resume_list.value === ''){
                            noResults();
                        }else{
                            noMore(); 
                        }
                    }
                }else if (check && check.status === 503) { // show status maintain
                    status_503.value = { status: 503, data: d_parse._data.message }
                }
            })
        }
    }
    
    function manually_show_resume() {
        check_new_auth_user()
        dt_loading.value = true;
        if (Object.keys(query_arr.value).length === 0) {
            data_query.value = route.query
        } else{
            data_query.value = query_arr.value 
        }
        if(user_data.value){
            $fetch(config.VUE_APP_API_URL_JOB+`resumes?lang=${locale.value==='/' ? 'en' : locale.value}&offset=${a_l_l_pageSize.value}`, {
                params :data_query.value ,
                headers: {"Access-Token": user_data.value.tokens.access_token},
            }).then(res => {
                a_l_l_pageSize.value += res.limit; // add offset
                if (res.data.length) {
                    a_l_l_resume.value = a_l_l_resume.value.concat(res.data); // concat in multiple array
                }
                dt_loading.value = false;
                l_hide_btn_load_more.value = a_l_l_resume.value.length < a_l_l_pageSize.value ? false : true;

                // -- tracking on google analytic --
                if (a_l_l_resume.value.length <= 30 && a_l_l_pageSize.value === 60) {  } // prevent likes post smaller than 30 and request two time
                else { track_google_analytics(a_l_l_pageSize.value > 30 ? a_l_l_pageSize.value : 0); }
                reload_lazy_img();
            }).catch(e => {
                dt_loading.value = false;
                console.log(e);
            });
        }else{
            $fetch(config.VUE_APP_API_URL_JOB+`resumes?lang=${locale.value==='/' ? 'en' : locale.value}&offset=${a_l_l_pageSize.value}`, {
                params :data_query.value ,
            }).then(res => {
                a_l_l_pageSize.value += res.limit; // add offset
                if (res.data.length) {
                    a_l_l_resume.value = a_l_l_resume.value.concat(res.data); // concat in multiple array
                }
                dt_loading.value = false;
                l_hide_btn_load_more.value = a_l_l_resume.value.length < a_l_l_pageSize.value ? false : true;

                // -- tracking on google analytic --
                if (a_l_l_resume.value.length <= 30 && a_l_l_pageSize.value === 60) {  } // prevent likes post smaller than 30 and request two time
                else { track_google_analytics(a_l_l_pageSize.value > 30 ? a_l_l_pageSize.value : 0); }
                reload_lazy_img();
            }).catch(e => {
                dt_loading.value = false;
            });
        }
    }

    function track_google_analytics (per_page) {
        let offset = per_page > 0 ? '?offset='+per_page : ''; // set offset of page if scroll get more data
        let page_path = route.path+offset;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href+offset;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
            page_location: page_location,
            page_path: page_path,
        }
        // -- event on page --
        event('resume', data);
        // -- page_view --
        pageview(data);
    }

    // ---- click back one page ----
    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' }));}
 
    const image_resume = useCookie('image_resume')
    function clickToPage(allPublic,img_url,id,index){
        All_P_Resume.value = allPublic
        image_resume.value = img_url
        helper.tracking_action('view', { id: id, track_contact: 'resume',item_count:  a_l_l_resume.value.length, item_per_page: '30',current_index: index,  placement: '' }, 'view', 'resume', '', '');
        // save view
        const data_input = { id: id }
        $fetch(config.VUE_APP_API_URL_JOB+'resumes/views',{
            method: 'POST',
            body: new URLSearchParams(data_input)
        }).then(res=>{
            const result = res
        }).catch(er=>{
            console.log(er)
        })
    }
    function check_title_char(name) { return helper.check_special_char(name); }

    function show_modal_short_pro(){
        $('#modal_short_filter_province').modal('show');
    }

    function show_modal_short_category() {
        $('#modal_short_category').modal('show');
    }

    function show_modal_short_jobType() {
        $('#modal_short_job_type').modal('show');
    }

    function show_modal_search(check){
        if (route.query) {
            $.each(route.query, (key, value) => {
                // get only key have value in query string, else let it empty
                if (route.query[key] === "" || route.query[key] === undefined || route.query[key] === false) {
                    // clear if not exit in query string.
                } else {
                    query_arr.value[key] = route.query[key]; // if field exist and value have, show that field in query url.
                }
            });
        }

        query_arr.value['gender'] = route.query.gender ? route.query.gender : ''
        if(check == 'mobile'){
            $('#modal_resume_filter').modal('show');
        }else{
            $('#modal_resume_filter1').modal('show');
        }
    }
    

    const location = useState('location',()=>'')
    useFetch(config.VUE_APP_API_URL+'locations?lang=en')
        .then(res=>{
            const result = res.data
            location.value = result
        })

    useFetch(config.VUE_APP_API_URL+'categories?parent=jobs')
        .then(res=>{
            const result = res.data
            category1.value = result
        })


    function click_short(type,value){
        if (route.query) {
            $.each(route.query, (key, value) => {
                // get only key have value in query string, else let it empty
                if (route.query[key] === "" || route.query[key] === undefined || route.query[key] === false) {
                    // clear if not exit in query string.
                } else {
                    query_arr.value[key] = route.query[key]; // if field exist and value have, show that field in query url.
                }
            });
        }

        query_arr.value[type] = value

        if(type === 'job_type'){
            $('#modal_short_job_type').modal('hide'); 
        }
        if(type === 'location'){
            $('#modal_short_filter_province').modal('hide');
        }
        if(type === 'category'){
            $('#modal_short_category').modal('hide'); 
        }
        submit_filter()
    }

    function clear_select(type){
        query_arr.value = route.query
        if(type === 'location'){ query_arr.value['location'] = '' }
        if(type === 'category'){ query_arr.value['category'] = '' }
        if(type === 'job_type'){  query_arr.value['job_type'] = '' }
        submit_filter()
    }
    
    function submit_filter(){
        let query_str = {};
        if (query_arr.value) {
            $.each(query_arr.value, (key, value) => {
                // get only key have value in query string, else let it empty
                if (query_arr.value[key] === "" || query_arr.value[key] === undefined || query_arr.value[key] === false) {
                    // clear if not exit in query string.
                } else {
                    query_str[key] = query_arr.value[key]; // if field exist and value have, show that field in query url.
                }
            });
        }

        router.replace(localePath({ name: 'resumes',  query: query_str}));
        if(isMobile.value){
            $('#modal_resume_filter').modal('hide');
        }else{
            $('#modal_resume_filter1').modal('hide');
        }
    }

    function clear_filter(){ 
        if (query_arr.value) {
            $.each(query_arr.value, (key, value) => {
                // get only key have value in query string, else let it empty
                if (query_arr.value[key] === "" || query_arr.value[key] === undefined || query_arr.value[key] === false) {
                    query_arr.value[key] = false; // clear if not exit in query string.
                } else {
                    query_arr.value[key] = ''; // if field exist and value have, show that field in query url.
                }
            });
        }
        query_arr.value['gender'] = ''
    }
    
    function show_pop_up_search() {
        $('#show_modal_saerch').modal('show');
        $('#_search_').focus();
    }

    function click_remove_text(){
        query_arr.value['position'] = ''
        submit_filter()
    }

    function save_to_localstorage(){
        if (route.query) {
            $.each(route.query, (key, value) => {
                // get only key have value in query string, else let it empty
                if (route.query[key] === "" || route.query[key] === undefined || route.query[key] === false) {
                    // clear if not exit in query string.
                } else {
                    query_arr.value[key] = route.query[key]; // if field exist and value have, show that field in query url.
                }
            });
        }
        $('#show_modal_saerch').modal('hide');
        submit_filter()
        setTimeout(()=>{
            add_keyword_to_localstorage();
        },150)
    }

    function click_to_localstorage(storage){
        if (route.query) {
            $.each(route.query, (key, value) => {
                // get only key have value in query string, else let it empty
                if (route.query[key] === "" || route.query[key] === undefined || route.query[key] === false) {
                    // clear if not exit in query string.
                } else {
                    query_arr.value[key] = route.query[key]; // if field exist and value have, show that field in query url.
                }
            });
        }
        query_arr.value['position'] = storage
        submit_filter()
        setTimeout(()=>{
            add_keyword_to_localstorage();
        },150)
        $('#show_modal_saerch').modal('hide');
    }

    function add_keyword_to_localstorage() {
        let check = localStorage.getItem('storedData');
        let text_search = route.query.position
        let tr_search = text_search.trim(); // cut off space
        if (!check || check == null) {
            localStorage.setItem("storedData", JSON.stringify([tr_search])); // save
        } else {
            let old_data_localstorage = JSON.parse(check);
            // -- check duplicate value --
            for (var i = 0; i < old_data_localstorage.length; i++) {
                if (old_data_localstorage[i].toLowerCase() == tr_search.toLowerCase()) {
                    old_data_localstorage.splice(i, 1); // remove the duplicate index
                }
            }
            // -- then push new value to array --
            old_data_localstorage.push(tr_search);  // add new value to array
            localStorage.setItem("storedData", JSON.stringify(old_data_localstorage)); // save
        }
        // --- add more key word to localStorage ---
        var revers_arr = JSON.parse(localStorage.getItem('storedData'));
        data_storage.value = revers_arr.reverse(); // reverse mean move arr down to up
    }

    // ---- clear local storage data search ----
    function remove_localstorage() {
        localStorage.removeItem('storedData');
        // --- show data from localStorage when click clear ---
        data_storage.value = JSON.parse(localStorage.getItem('storedData'));
    }
    // ---- edit search ----
    function edit_search(value) {
        document.getElementById('_search_').focus();
        $("#test_modal").hide();
        query_arr.value['position'] = value;
    }

    const is_save_load = useState('is_save_load',()=>'')
    is_save_load.value = false
    function save_ads(allPublic,id_resume,is_un_save,index){
        check_new_auth_user();
        // console.log('test',data)
        is_save_load.value = true
        if (window.navigator.onLine) {
            if (user_data.value && user_data.value.tokens.access_token) {
                // is_save_load.value = true
                if(is_un_save){
                    $fetch(config.VUE_APP_API_URL+'me/saved',{
                        method: 'DELETE',
                        params: {id: allPublic.id , type: 'resume'},
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                    }).then(re=>{
                        is_save_load.value = false
                        // helper.tracking_action('unsave', { id: id_resume, track_contact: 'resume',  placement: '' }, 'unsave', 'resume', '', '');
                        helper.tracking_action('unsave', { id: id_resume, track_contact: 'resume',item_count:  a_l_l_resume.value.length, item_per_page: '30',current_index: index,  placement: '' }, 'unsave', 'resume', '', '');
                        for (let i = 0; i < a_l_l_resume.value.length; i ++) {
                            if (a_l_l_resume.value[i].id === id_resume) {
                                a_l_l_resume.value[i].saved = false;
                                break;
                            }
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
                    $fetch(config.VUE_APP_API_URL+'me/saved?lang=en',{
                        method: 'POST',
                        body: new URLSearchParams({id: allPublic.id , type: 'resume'}),
                        headers: {"Access-Token": user_data.value.tokens.access_token},
                    }).then(re=>{
                        is_save_load.value = false
                        helper.tracking_action('save', { id: id_resume, track_contact: 'resume',item_count:  a_l_l_resume.value.length, item_per_page: '30',current_index: index,  placement: '' }, 'save', 'resume', '', '');
                        for (let i = 0; i < a_l_l_resume.value.length; i ++) {
                            if (a_l_l_resume.value[i].id === id_resume) {
                                a_l_l_resume.value[i].saved = true;
                                break;
                            }
                        }
                        message_success.value = re.message
                        if (message_success.value) {
                            error_or_success_message.value = false;
                            $(".sh_toast").removeClass('d-none');
                            $(".sh_toast").toast({delay: 6000});
                            $(".sh_toast").toast('show');
                        }
                        // save_track_optional('status_success', { status_success: re.message });
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
        }else{
            is_save_load.value = false
        }
    }
    
    // --- arr impression check id ---
    const arr_impression = ref([]);
    const timer_auto_impression = ref('');
    const check_sent = ref('true'); // true = allow setInterval, false = not allow setInterval.

    function visibilityChanged (isVisible, entry, data) {
        // isVisible => is true mean new data, false mean old data.
        if (process.client && isVisible) { // new data
            arr_impression.value.push({ id: data.id, current_index: data.index, paid: data.paid, placement: data.placement });
            // -- timer not exist && arr_impression not empty && check_sent is true, must set interval --
            if (!timer_auto_impression.value && arr_impression.value.length > 0 && check_sent.value) {
                // -- start setInterval in 3 second --
                timer_auto_impression.value = setInterval( async () => {
                    let arr_tmp = arr_impression.value;  // set arr_impression to tmp array.
                    arr_impression.value = [];           // clear arr_impression.
                    // console.log(arr_impression.value);
                    check_sent.value = false;            // not allow to setInterval again.
                    clearInterval(timer_auto_impression.value); timer_auto_impression.value = ''; // clear auto impression.

                    let res = await helper.tracking_action('resume', {post_impression: arr_tmp, item_count: a_l_l_resume.value.length, item_per_page: '30'},
                        'impression', 'resume', data.type, '');
                        // console.log(res);
                    if (res && res.status === 200) {
                        check_sent.value = true;          // allow to setInterval again if success.
                    } else {
                        $.each(arr_tmp, (k, v) => {
                            arr_impression.value.push(v); // push id to old arr_impression again if response error in request tracking impression.
                        });
                        check_sent.value = true;          // allow to setInterval again if error.
                    }
                }, 3000);
            }
        }
    }
    function reload_lazy_img() {
        setTimeout(() => {
            $('img.lazy').Lazy({delay:10000, combined:true});
        },750);
    }

    function imageUrlAlt_post(theEvent) {
        if (process.client && window.navigator.onLine) { theEvent.target.src = empty_img_post.value; }
    }
</script>