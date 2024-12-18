<template>
    <div>
        <div class="min_h max_width_form">
            <div v-if="dataAddress" class="address_ ">
                <div v-if="isLoading" class="loading_back_ground" >
                    <div class="loading_img">
                        <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
                    </div>
                </div>
                <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
                    <div class="_div_nav bg_app_bar_header_">
                        <div @click="router.back()" class="_pad_col_icon">
                            <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                                <i class="ion-android-arrow-back font_click_back"></i>
                            </button>
                        </div>
                        <div class="col pl-0 l_h_con_title">
                            <p class="name_style truncate_wrap mb-0 ml-2 text-left">
                                Shipping / Billing Address
                            </p>
                        </div>
                    </div>
                </div>

                <div v-if="!dataAddress.data" class="p-3" :class="isMobile ? 'mt-5' : 'mt_80'" style="position: relative;"> 
                    <h1 v-if="!isMobile" class="fw-semibold fs-5 mb-3">{{$t(`account_t.billing_address`)}} </h1>
                    <nuxt-link to="address" class="bg-white p-2 d-flex w-100">
                        <i class="material-icons ">error_outline</i>
                        <div class="mt-1 w-100">
                            <strong>Oops!</strong>
                            <div class="text-secondary fn_13">{{ locale==="km" ? "អ្នកហាក់ដូចមិនទាន់រក្សាទុកអាស័យដ្ឋានណាមួយនៅឡើយទេ!" : "Seems like you haven't saved any addresses yet!" }}</div>
                        </div>
                        <i class="ion-ios-arrow-forward text-end fn_25 text-secondary mt-3 pr-2"></i>
                    </nuxt-link>
                    <template v-if="!isMobile">
                        <NuxtLink :to="localePath({ name: 'chats-address' })" @click="c_t_p">
                            <button type="button" class="btn form-control btn-k24-secondary mt-3" :class="isMobile ? 'btn-height' : 'dt-btn-height'">{{ locale=== 'km' ? 'បន្ថែមអាស័យដ្ឋាន' : 'Add Address' }}  </button>
                        </NuxtLink>
                    </template>
                </div>
                <div v-else class="content-resume mt_80 ">
                    <div v-if="dataAddress.default" class=" mt-5 p-3 " :class="isMobile ? '' : 'pt-0'" style="position: relative;">
                        <h1 v-if="!isMobile" class="fw-semibold fs-5 mb-3">{{$t(`account_t.billing_address`)}} </h1>
                        <div class="add_default">
                            {{ locale=== 'km' ? 'ជំរើសទីមួយ' : 'Default' }}
                        </div>
                        <div class="bg-white pl-3 pr-3 pb-3 pt-4 border_10">
                            <div class="mt-2 mb-2 d-flex w-100">
                                <div class="fn_17 w_90"><strong>{{ dataAddress.default.label }}</strong></div>
                                <div class="btn" style="width: 10%;text-align: right;" @click="click_item(dataAddress.default)" data-bs-toggle="modal" data-bs-target="#address" >
                                    <i class="fas fa-ellipsis-v  text-secondary"></i>
                                </div>
                            </div>
                            <div class="mb-1"><i class="fas fa-user-circle text-secondary mr-2 _i"></i><span class="_div">{{ dataAddress.default.name }}</span></div>
                            <div v-if="dataAddress.default.company" class="mb-1">
                                <!-- <i class="fas fa-city text-secondary fn_13 mr-2 _i"></i> -->
                                <img class=" mr-2 _i pb-1 ml_-2" src="/icon/skyline.png" alt="company" width="20px">
                                <span class="_div ml_2">{{ dataAddress.default.company }}</span>
                            </div>
                            <div v-if="dataAddress.default.tax_id" class="mb-1">
                                <img class=" mr-2 _i pb-1 ml_-2" src="/icon/taxes.png" alt="taxe" width="20px">
                                <span class="_div ml_2">{{ dataAddress.default.tax_id }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="fas fa-phone-alt text-secondary mr-2 _i"></i>
                                <span class="_div" v-for="(ph,index) in dataAddress.default.phone" :key="ph"><span v-if="index > 0">, </span>{{ ph }}</span>
                            </div>
                            <div class="mb-1" v-if="dataAddress.default.email"><i class="fa fa-envelope text-secondary mr-2 _i"></i><span class="_div">{{ dataAddress.default.email }}</span></div>
                            <div class="mb-1 d-flex"><i class="fas fa-map-marker-alt text-secondary mr-2 _i"></i><span class="_div">{{ locale==='km' ? dataAddress.default.location.km_name : dataAddress.default.location.en_name }}</span></div>
                            <div class="mb-1 d-flex"><i class="fas fa-map-marker-alt text-white mr-2 _i"></i><span class="_div text-secondary">{{ dataAddress.default.address }}</span></div>
                            <div v-if="dataAddress.default.map" @click="show_chat_map(dataAddress.default.map)" class="mb-1 ">
                                <i class="fas fa-map-marker-alt text-white mr-2 _i"></i>
                                <div  class="text-primary btn border-0 p-0">{{ locale=== 'km' ? 'បង្ហាញទិសដៅ' : 'Get Directions' }}</div>
                            </div>
                            <NuxtLink @click="send_address(dataAddress.default.id)">
                                <button  type="button" class="btn full_width btn-k24-primary mt-2" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                    {{ locale=== 'km' ? 'ផ្ញើ' : 'Send' }}
                                </button>
                            </NuxtLink>
                        </div>
                    </div>
                    <div v-if="dataAddress.data" class="pl-3 pr-3" :class="isMobile ? 'mb_80' : ''">
                        <div v-for="addr in dataAddress.data" :key="addr">
                            <div v-if="addr.is_default !== true">
                                <div class="bg-white p-3 mb-3 border_10">
                                    <div class="mb-2 d-flex">
                                        <div class="fn_17 w_90"><strong>{{ addr.label }}</strong></div>
                                        <div class="text-end w_10 btn" @click="click_item(addr)" data-bs-toggle="modal" data-bs-target="#address">
                                            <i class="fas fa-ellipsis-v  text-secondary"></i>
                                        </div>
                                    </div>
                                    <div class="mb-1"><i class="fas fa-user-circle text-secondary mr-2 _i"></i><span class="_div">{{ addr.name }}</span></div>
                                    <div v-if="addr.company" class="mb-1">
                                        <!-- <i  class="fas fa-city text-secondary fn_13 mr-2 _i"></i> -->
                                        <img class=" mr-2 _i pb-1 ml_-2" src="/icon/skyline.png" alt="company" width="20px"  >
                                        <span class="_div ml_2">{{ addr.company }}</span>
                                    </div>
                                    <div v-if="addr.tax_id" class="mb-1">
                                        <img class=" mr-2 _i pb-1 ml_-2" src="/icon/taxes.png" alt="tax" width="20px"  >
                                        <span class="_div ml_2">{{ addr.tax_id }}</span>
                                    </div>
                                    <div class="mb-1" >
                                        <i class="fas fa-phone-alt text-secondary mr-2 _i"></i>
                                        <span _div v-for="(ph,index) in addr.phone" :key="ph"><span v-if="index > 0">, </span>{{ ph }}</span>
                                    </div>
                                    <div class="mb-1" v-if="addr.email"><i class="fa fa-envelope text-secondary mr-2 _i"></i><span class="_div">{{ addr.email }}</span></div>
                                    <div class="mb-1 d-flex"><i class="fas fa-map-marker-alt text-secondary mr-2 _i"></i><span class="_div">{{ locale==='km' ? addr.location.km_name : addr.location.en_name }}</span></div>
                                    <div class="mb-1 d-flex" ><i class="fas fa-map-marker-alt text-white mr-2 _i"></i><span class="_div text-secondary">{{ addr.address }}</span></div>
                                    <div v-if="addr.map" @click="show_chat_map(addr.map)" class="mb-1 d-flex">
                                        <i class="fas fa-map-marker-alt text-white mr-2 _i"></i>
                                        <div  class="text-primary btn p-0 border-0">{{ locale=== 'km' ? 'បង្ហាញទិសដៅ' : 'Get Directions' }}</div>
                                    </div>
                                    <NuxtLink @click="send_address(addr.id)">
                                        <button  type="button" class="btn full_width btn-k24-primary mt-2" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                            {{ locale=== 'km' ? 'ផ្ញើ' : 'Send' }}
                                        </button>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!isMobile" class="px-3">
                        <NuxtLink :to="localePath({ name: 'chats-address' })" @click="c_t_p" >
                            <button type="button" class="btn form-control btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">{{ locale=== 'km' ? 'បន្ថែមអាស័យដ្ឋាន' : 'Add Address' }}  </button>
                        </NuxtLink>
                    </div>
                </div>
                
                <div v-if="isMobile">
                    <NuxtLink :to="localePath({ name: 'chats-address' })" @click="c_t_p" class="nav p_pad_btn_ap_job" >
                        <button type="button" class="btn form-control btn-k24-secondary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">{{ locale=== 'km' ? 'បន្ថែមអាស័យដ្ឋាន' : 'Add Address' }}  </button>
                    </NuxtLink>
                </div>
            </div>
        </div>


        <div class="modal fade" :class="isMobile ? 'rs-modal w-100' : ''" tabindex="-1" id="address" aria-hidden="true">
            <div class="modal-dialog bg-modal" :class="isMobile ? 'modal-dialog-centered' : 'modal-dialog-centered m-auto m_w' " role="document">
                <div class="modal-content" :class="isMobile ? '' : 'rounded'">
                    <div class="content_">
                        <ul class="list-unstyled mobile_modal_actions_container">
                            <li class="mobile_modal_action w-100">
                                <p class="m-auto">{{ cl_data.category_title }}</p>
                            </li>
                            <li class="w-100 ">
                                <NuxtLink :to="localePath({ name: 'chats-address' })" @click="click_edit(cl_data)" class="mobile_modal_action text-primary">
                                    <p class="m-auto "><strong>{{ $t('resume_cv.edit') }}</strong></p>
                                </NuxtLink>
                            </li>
                            <li v-if="cl_data.is_default !== true" @click="open_m(cl_data)" class="mobile_modal_action w-100 text-danger">
                                <strong class="m-auto">{{ $t('resume_cv.delete') }}</strong>
                            </li>
                        </ul>
                        <!-- <NuxtLink class=" btn  p-3 w-100" style="background-color:rgb(248, 245, 245);border-radius:10px;font-size: 20px;" data-bs-dismiss="modal"><strong>{{ $t('resume_cv.cancel') }}</strong></NuxtLink> -->
                        <button data-bs-dismiss="modal" class="mobile_modal_cancel_button">{{ $t(`resume_cv.cancel`) }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade w-100"  id="myModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered p-3" style="margin: auto;">
                <div class="modal-content">
                    <div class="text-center pt-3">
                        <h5 class="modal-title" id="exampleModalLabel">{{ locale==='km' ? 'តើអ្នកប្រាកដ ឫអត់?' : 'Are you sure?' }}</h5>
                    </div>
                    <div class="modal-body text-center">
                        You will delete "{{ dl_data.category_title }}" permanently.
                    </div>
                    <div class="m-3 d-flex pt-3 b_top">
                        <div class="w-50 text-end">
                            <button type="button" class="btn btn-secondary mr-3 w_80px" data-bs-dismiss="modal">{{ locale=== 'km' ? 'បោះបង់' : 'Close' }}</button>
                        </div>
                        <div class="w-50 text-start" >
                            <button type="button" class="btn btn-danger ml-3 w_80px" @click="delete_item(dl_data.id)" data-bs-dismiss="modal">{{ locale=== 'km' ? 'លុប' : 'Delete' }}</button>
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
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const router = useRouter();
    const route = useRoute();
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const version_library = config.LIBRARY_VERSION;
    const asset_url = '/'; 
    const auth = ref('');
    const dataAddress = ref('');
    const isLoading = ref('');
    isLoading.value = false
    const cl_data = useState('cl_data',()=>'');
    const dl_data = useState('dl_data',()=>'');
    const topic_id = ref(route.query.topic_id ? route.query.topic_id : ''); 
    const to_id = ref(route.query.to_id ? route.query.to_id : ''); 
    const data1 = ref('');
    const data2 = ref('');
    const data_edit = useCookie('data_edit')
    const isMobile= ref(helper.m_or_d())
    onMounted(()=>{
        if(process.client){
            // isMobile.value = helper.is_pc_or_mobile_device() === 'pc' ? false : true
            check_new_auth_user()
            if(auth.value && auth.value.tokens.access_token){
                getAddress();
                data_edit.value = ''
            }
        }
    })

    function check_new_auth_user() { auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
    function getAddress(){
        check_new_auth_user()
        if(auth.value && auth.value.tokens.access_token){
            isLoading.value = true
            $fetch(config.VUE_APP_API_URL_PAYMENT+'me/addresses?storeid=0',{
                headers: {"Access-Token": auth.value.tokens.access_token},
                method: 'GET',
            }).then(res=>{
                isLoading.value = false
                dataAddress.value = res
            }).catch(er=>{
                isLoading.value = false
                if (er.response && er.response.status === 401) { // retry
                    check_new_auth_user();
                    setTimeout( () => { getAddress(); }, 3000);
                }
            })
        }
    }

    function send_address(id){
      isLoading.value = true
      const data = {
        type: 'address',
        id: id
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
          method: "POST",headers: {"Access-Token": auth.value.tokens.access_token},
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
          method: "POST",headers: {"Access-Token": auth.value.tokens.access_token},
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

    function click_item(data){
        cl_data.value = data
    }

    function click_edit(data){
        data_edit.value = data
        $("#address").modal('hide');
    }
    function c_t_p(){
        data_edit.value = ''
    }

    function open_m(data){
        dl_data.value = data
        $('#address').modal('hide')
        $("#myModal").modal('show')
    }

    function delete_item(id){
        check_new_auth_user()
        if(window.navigator.onLine){
            if(auth.value && auth.value.tokens.access_token){
                $fetch(config.VUE_APP_API_URL_PAYMENT+'me/addresses/'+id,{
                    headers: {"Access-Token": auth.value.tokens.access_token},
                    method: 'DELETE',
                }).then(res=>{
                    getAddress();
                }).catch(er=>{
                    alert(er)
                })
            }
        }
    }

    function show_chat_map(map_) {
        map_.forEach((val,index) => {           
            if(index === 0){
                data1.value= val
            }
            if(index === 1){
                data2.value= val
            }
            let zoon = 15
            if(index === 1){
                let routeData = 'https://maps.google.com/maps?q='+data1.value+','+data2.value+'&amp;'+zoon+'';
                window.open(routeData, '_blank');
            }
        });
    }

</script>

<style scoped>
._i{ width: 20px;}
._div{width:92%}
</style>