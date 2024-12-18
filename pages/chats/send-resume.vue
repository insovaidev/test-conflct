<template>
  <div>
    <div class="mb-5 min_h">
        <resume :pageType="'send_message'"/> 
    </div>
    <!-- App Bar -->
    <div v-if="isMobile" class="no_padding" :class="isDesktop ? 'col' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12 fix_app_bar'">
      <div class="_div_nav bg_app_bar_header_">
        <div class="col l_h_con_title p-0 ml-2">
          <p class="m-0 name_style truncate_wrap text-center"> {{ $t('resume_cv.review_and_apply') }} </p>
        </div>
        <div class="_pad_col_icon" @click="router.back()"  data-bs-dismiss="modal" aria-label="Close">
          <button class="btn clear-btn-app-bar" aria-label="back">
            <i class="icon-clear font_click_back"></i>
          </button>
        </div>
        <div v-if="isMobile">
          <div v-if="GetAll" class="nav p_pad_btn_ap_job" >
            <button type="button"  @click="send_resume" class="btn form-control c_bg_btn custom_btn_">
              <div v-if="isLoading">
                  <p class="buttonload">
                      <i class="fa fa-spinner fa-spin mr-2"></i>{{ $t('resume_cv.loading') }}
                  </p>
              </div>    
              <span v-else> {{ $t('message.send') }} </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script setup>
  import helper from "/helper";
  definePageMeta( {layout: "custom", middleware: "auth"} );
  const { public:config } = useRuntimeConfig(); 
  const router = useRouter();
  const route = useRoute();
  const isLoading = useState('isLoading')
  isLoading.value = false
  const auth_user = useCookie('auth_user')
  const auth = useState('auth')
  const GetAll = useState('GetAll',()=>'')
  const topic_id = ref(route.query.topic_id ? route.query.topic_id : ''); // get from listing chat
  const username = ref(route.query.username ? route.query.username : ''); // get from listing chat
  const to_id = ref(route.query.to_id ? route.query.to_id : '');          // get from detail ads
  const isMobile= ref(helper.m_or_d())

  onMounted(()=>{
    if(process.client){
      check_auth_user();
    }
  })

  function check_auth_user() {
      auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
  }
  function send_resume(){
    check_auth_user()
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
</script>