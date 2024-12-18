<template>
    <div>
        <!-- <div v-if="isMobile" class="_div_nav bg_app_bar_header_ h_all_resume" >
            <button @click="goBack" type="button" class="btn w_h_50px" aria-label="Back">
                <i class="ion-android-arrow-back font_click_back"></i>
            </button>
            <div class="col pl-0 l_h_con_title text-center">
                <b>{{ $t('resume_cv.resume') }}</b>
            </div>
            <div  class="p-2 me-2 text-right">
                <div v-if="auth_user">
                    <div v-if="auth_user.user.id !== GetAll.userid" class="save_or_not" @click="save_ads(GetAll,GetAll.id,GetAll.saved)">
                        <i v-if="GetAll.saved" id="bookmak_save" class="fa fa-bookmark text-white p-2"></i>
                        <i v-else  class="far fa-bookmark text-white p-2" id="bookmak_not_save"></i>
                    </div>
                </div>
                <div v-if="!auth_user" class="save_or_not" @click="save_ads(GetAll,GetAll.id)">
                    <i class="far fa-bookmark text-white p-2"></i>
                </div>
            </div>
        </div> -->
        <div v-if="!is_404" class="mb-4 min_h">
            <resume :pageType="'all_public_resume'"/> 
        </div>
        <!-- <div v-if="is_404">
            <Page_404/>
        </div> -->

        <!-- show success message -->
        <!-- <div class="toast style_toast d-none sh_toast toast_z_index">
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
        </div> -->
    </div>
    <div v-if="is_404">
            <Page_404/>
        </div>
</template>
<script setup>
    import helper from "/helper";
    import Page_404 from "/components/404";
    const is_404 = ref(false);
    const isDesktop = helper.check_is_desktop(); // check userAgent
    definePageMeta( {layout: "custom", middleware: "auth"} );
    const auth_user = useCookie('auth_user')
    const localePath = useLocalePath();
    const route = useRoute();
    const router = useRouter();
    const All_P_Resume = useState('All_P_Resume',()=>'')
    const post_id = ref(route.params.id ? route.params.id : '');
    const image_resume = useCookie('image_resume')
    const image_pro = useState('image_pro',()=>'')
    const GetAll = useState('GetAll',()=>'')
    const loadindScreen = useState('loadindScreen')
    loadindScreen.value = false
    image_pro.value = image_resume.value
    All_P_Resume.value = post_id.value
    const error_or_success_message = ref(true);
    const message_success = ref('');
    const runtime_config = useRuntimeConfig();            // setup config env to config variable.
    const config = runtime_config.public;
    const auth_users = ref('')
    const reload_q_again_1 = ref(0);
    const isMobile= ref(helper.m_or_d())
    function check_new_auth_user() { auth_users.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }

    onMounted(()=>{
        if(process.client){
            check_new_auth_user();
             get_data();
        }
    })

    function get_data(){
        let URL = config.VUE_APP_API_URL_JOB+'resumes/'+All_P_Resume.value+'?fields=personal_details,educations,experiences,languages,skills,attachment,references,summary,hobbies,preference&lang=en'
        if(auth_user.value){
            $fetch(URL,{
                method: 'GET',
                headers: {"Access-Token": auth_users.value.tokens.access_token},
            }).then(response =>{
                loadindScreen.value = false
                GetAll.value = response.data
            }).catch(error=>{
                if(error.response && error.response.status === 404){
                    GetAll.value = ''
                    loadindScreen.value = false
                    is_404.value = true;
                }
                if (error.response && error.response.status === 401) {
                    if (reload_q_again_1.value <= 2) {
                        reload_q_again_1.value += 1;
                        check_new_auth_user();
                        get_data();
                    } else {
                        localStorage.removeItem('auth_user');   // remove localStorage
                        router.replace(localePath({ name: 'index' }));
                    }
                }
            })
        }else{
            $fetch(URL,{
                method: 'GET',
            }).then(response =>{
                loadindScreen.value = false
                GetAll.value = response.data
                getUser();
            }).catch(error=>{
                if(error.response && error.response.status === 404){
                    GetAll.value = ''
                    loadindScreen.value = false
                    is_404.value = true;
                }
            })
        }
    }
    // if(process.server){
    //    await get_data();
    // }

    const get_user_id = useState('get_user_id',()=>'')
    function getUser(){
        if(!auth_users.value){
            $fetch(config.VUE_APP_API_URL_MOBI+'profiles/user/'+GetAll.value.userid+'?fields=id,username&lang=en')
            .then(res=>{
                const result = res.data
                get_user_id.value = result.username
            })
        }
    }

    const a_l_l_pageSize = useState('a_l_l_pageSize',()=>0);
    const a_l_l_resume = useState('a_l_l_resume',()=>[]);
    const is_save_load = useState('is_save_load',()=>'')
    is_save_load.value = false
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
    
    function goBack() { 
        window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); 
    }
</script>