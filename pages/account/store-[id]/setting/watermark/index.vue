<template>
    <div class="watermark">
         <!-- app -->
        <div v-if="isMobile" class="_div_nav row_padding bg_app_bar_header_ fix_app_bar">
            <div @click="router.back()" class="_pad_col_icon" data-bs-dismiss="modal" aria-label="Close">
                <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                    <i class="ion-android-arrow-back font_click_back"></i>
                </button>
            </div>
            <div class="col _pad_col_icon">
                <a v-if="isShow" rel="nofollow" class="set-app-name-title text-white">{{ $t('new_text.watermark') }}</a>
                <a v-else rel="nofollow" class="set-app-name-title text-white">{{ $t('new_text.setup_watermark') }}</a>
            </div>
        </div>
        <!-- body -->
        <div v-if="showLoading" class="loading_back_ground bg-secondary">
            <div class="loading_img">
                <img :src="asset_url+version_library+'img/newLoading.gif'" alt="loading" class="loading_width loading_bg">
            </div>
        </div>
        <div class="set-listing-members min_h" :class="isMobile ? ' margin_below_app_bar_2 p-3 bg-white' : 'form-watermak mt_80'">
            <template v-if="isShow">
                <div v-if="!isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text.watermark') }}</div>
            </template>
            <template v-else>
                <div v-if="!isMobile" class="fs-5 fw-semibold mb-2">{{ $t('new_text.setup_watermark') }}</div>
                <p class="fn_15">{{ $t('new_text.customizable') }}<br>{{ $t('new_text.your_logo') }}</p>
            </template>
            <form :class="isMobile ? '' : 'p-3 rounded shadow-sm border bg-white'">
                <p v-if="isShow" class="fn_18 mb-2"><strong>{{ $t('new_text.preview') }}</strong></p>
                <div :class="add_class" class="bg_photo" id="preview">
                    <div class="bg-icon-watermark">
                        <div :class="watermark.src || tmp_file ? '' : 'bg-white'" class="sub-bg-watermark">
                            <img v-if="tmp_file" :src="tmp_file.thumbnail" alt="logo-watermark" width="80px" height="80px" :style="{ opacity: range+'%' }" class="icon-watermark p-1">
                            <template  v-else>
                                <img v-if="watermark.src" :src="watermark.src.url" alt="logo-watermark" width="80px" height="80px" :style="{ opacity: range+'%' }" class="icon-watermark p-1">
                                <span v-else >{{ $t('new_text.logo') }}</span>
                            </template>
                        </div>
                    </div>
                </div>
                <div id="uploadLogo">
                    <a id="pickfiles" href="javascript:void (0)" class="btn bg_light mt-3" :class="isMobile ? 'btn-height' : 'dt-btn-height'" rel="nofollow" aria-label="Brows">
                        <strong class="text-k24">{{ tmp_file || images ? $t('new_text.change_logo') : $t('new_text.upload_logo') }}</strong>
                    </a>
                    <template v-if="!tmp_file && !images">
                        <p v-if="errorShow" class="text-danger fn_15">{{ $t('new_text.er_upload_logo') }}</p>
                    </template>
                    <template v-if="isShow && isCheckStore">
                        <div class="mt-3">
                            <p class="fn_18 mb-2" ><strong>{{ $t('new_text.position') }}</strong></p>
                            <div class="w_m_8">
                                <ul class="list-unstyled d-flex flex-qrap">
                                    <li class="position-watermark">
                                        <div @click="select('center')" :class="select_position ==='center' ? 'd_border' : ''" class="d-flex align-items-center justify-content-center bg-watermark">
                                            <div class="icon-position"></div>
                                        </div>
                                    </li>
                                    <li @click="select('top-left')" class="position-watermark">
                                        <div :class="select_position ==='top-left' ? 'd_border' : ''" class="ps-1 pt-1 bg-watermark">
                                            <div class="icon-position"></div>
                                        </div>
                                    </li>
                                    <li @click="select('top-right')" class="position-watermark">
                                        <div :class="select_position ==='top-right' ? 'd_border' : ''" class="d-flex justify-content-end pt-1 pe-1 bg-watermark">
                                            <div class="icon-position"></div>
                                        </div>
                                    </li>
                                    <li @click="select('bottom-right')" class="position-watermark">
                                        <div :class="select_position ==='bottom-right' ? 'd_border' : ''" class="d-flex align-items-end justify-content-end pb-1 pe-1 bg-watermark">
                                            <div class="icon-position"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="fn_18 mb-2"><strong>{{ $t('new_text.opacity') }}</strong></p>
                            <div class="form_check ps-3 mb-3">
                                <label for="range" class="form-label w_50px pt-2">{{ range }}%</label>
                                <div class="range-container">
                                    <input type="range" min="0" max="100" v-model="range" ref="rangeInput" class="custom-range" id="rangeInput">
                                    <div class="progress-bar-container">
                                        <div class="progress-bar" :style="{ width: range+'%' }" id="progressBar"></div>
                                    </div>
                                </div>
                            </div>
                            <p class="fn_18 mb-2"><strong>{{ $t('new_text.status') }}</strong></p>
                            <div class="form-check form-switch form_check ps-0">
                                <label class="form-check-label w-100 h-100 ps-3 pt-2 cursors" for="enable" > {{ enable ? $t('new_text.enable') : $t('new_text.disable') }}</label>
                                <input class="form-check-input status" :class="isMobile ? 'me-2' : 'me-4'" type="checkbox" v-model="enable" id="enable" :checked="enable">
                            </div>
                            <div data-bs-toggle="modal" data-bs-target="#showConfirm" class="btn btn-light mt-3 mb-4" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                <strong class="text-danger">{{ $t('new_text.remove_watermark') }}</strong>
                            </div>
                        </div>
                        <div class="mt-3">
                            <div @click="getType('add')" class="btn btn-k24-primary" :class="isMobile ? 'btn-height' : 'dt-btn-height'">
                                <div v-if="isLoading" class="spinner-border text-light" role="status" style="width: 15px ; height: 15px;">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                {{ $t('new_text.save') }}
                            </div>
                        </div>
                    </template>
                </div>
            </form>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="showConfirm" aria-hidden="true" aria-labelledby="modal_confirm" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered m-auto" style="width: 350px;">
                <div class="modal-content rounded" >
                    <div class="modal-body text-center">
                        <strong class="mb-0 ">{{ $t('new_text.removed_eatermark') }}</strong>
                    </div>
                    <div class="d-flex p-3">
                        <button class="btn btn-k24-primary me-3 w-50" data-bs-dismiss="modal">{{ $t('message.cancel') }}</button>
                        <button @click="Submit('remove')" class="btn btn-danger w-50" data-bs-dismiss="modal">{{ $t('resume_cv.remove') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script setup>
import helper from "/helper";
definePageMeta( { layout: "custom", middleware: "auth"} );
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const isMobile= ref(helper.m_or_d());
const { public:config } = useRuntimeConfig();
const asset_url = '/'; 
const version_library = config.LIBRARY_VERSION;
const { locale } = useI18n();
const store = useState('store', ()=> []);
const user_data = ref('')
const store_id = route.params.id
const watermark = ref('')
const select_position = ref('center')
const add_class = ref('d-flex align-items-center justify-content-center')
const enable = ref(true)
const range = ref(0)
const rangeInput = ref('');
const tmp_file = ref('')
const loadings = ref(false)
const isLoading = ref(false)
const errorShow = ref(false)
const images = ref('')
const isShow = ref('')
const showLoading = ref(true)
const isCheckStore = ref(false)
const reload_q_again_11 = ref(0);

onMounted(()=>{
    if(process.client){
        if(isMobile.value){
            getStore()
        }
        check_new_auth_user();
        getWatermark();
        imageFile();
        setTimeout(()=>{
            store.value.forEach(val=>{
                if(route.params.id === val.id && val.is_owner){
                    isCheckStore.value = true
                    $('#uploadLogo').removeClass('visually-hidden')
                }else{
                    isCheckStore.value = false
                    $('#uploadLogo').addClass('visually-hidden')
                }
            })
        },350)
    }
})

function getStore(){
    check_new_auth_user()
    $fetch(config.VUE_APP_API_URL + 'me/stores', {
        headers: { "Access-Token": user_data.value.tokens.access_token },
        params: { lang: locale.value === 'km' ? 'km' : 'en', fields: 'my_setting' }
    }).then(get_store => {
        store.value = get_store.data
    }).catch(error => {
        if (error.response && error.response.status === 401) { // retry
            // console.log('error page header')
            if (reload_q_again_11.value <= 2) {
            reload_q_again_11.value += 1;
            setTimeout(() => { getStore(); }, 3000);
            }else{
                localStorage.removeItem('auth_user');   // remove localStorage
                VueCookieNext.removeCookie('auth_user')
                router.replace(localePath({name:'index'}));
            }
        }
    });
}

function getWatermark(){
    showLoading.value = true
    $fetch(config.VUE_APP_API_URL + `me/stores/${store_id}/watermark`, {
        headers: { "Access-Token": user_data.value && user_data.value.tokens.access_token },
        params: {
            lang: locale.value==='km' ? 'km' : 'en',
        }
    }).then(res=>{
        watermark.value = res && res.data
        if(watermark.value){
            images.value = watermark.value.src ? watermark.value.src.file : ''
            if(images.value){
                isShow.value = true
            }else{
                isShow.value = false
            }
            select_position.value = watermark.value.position
            enable.value = watermark.value.enable
            range.value = watermark.value.opacity
            select(select_position.value)
        }
    }).catch(err=>{
        console.log(err)
        // scrollTop: $('#section2').offset().top
        if(err.response.status === 403){
            router.push(localePath({ name: 'index' }))
        }
    }).finally(()=>{ showLoading.value = false })
}

function select(position){
    select_position.value = position
    if(position === 'center'){
        add_class.value = "d-flex align-items-center justify-content-center"
    }else if(position === 'top-left'){
        add_class.value = "ps-2 pt-2"
    }else if(position === 'top-right'){
        add_class.value = "d-flex justify-content-end pt-2 pe-2"
    }else if(position === 'bottom-right'){
        add_class.value = "d-flex align-items-end justify-content-end pb-2 pe-2"
    }
}

function getType(type){
    if(type === 'add' && (tmp_file.value || images.value)){
        Submit(type)
    }else if(type === 'remove'){
        Submit(type)
    }else{
        $(document).ready(function (){
            $('html, body').animate({
                scrollTop: $("#preview").offset().top-400
            }, 1000);
        });
        errorShow.value = true 
    }
}

function Submit(type){
    check_new_auth_user();
    if(user_data.value){
        if(type === 'add'){
            isLoading.value=true
        }
        if(window.navigator.onLine){
            const input_data = {
                enable: enable.value,
                position: select_position.value,
                opacity: range.value,
                file: type==='remove' ? null : ( tmp_file.value ? tmp_file.value.file : helper.cut_date(images.value) )
            }
            // console.log(input_data)
            $fetch(config.VUE_APP_API_URL+`me/stores/${store_id}/watermark`, {
                method: "POST", 
                headers: { "Access-Token": user_data.value && user_data.value.tokens.access_token },
                params: {lang: locale.value==='km' ? 'km' : 'en'},
                body: new URLSearchParams(input_data)
            }).then(res=>{
                if(type === 'add'){
                    router.back()
                }else if(type === 'remove'){
                    tmp_file.value = ''
                    getWatermark()
                }
            }).catch(er=>{
                if(er.response.status === 422){
                    if(er.response._data.errors.file){
                        $(document).ready(function (){
                            $('html, body').animate({
                                scrollTop: $("#preview").offset().top-400
                            }, 1000);
                        });
                        errorShow.value = true
                    }
                }
            }).finally(()=>{ isLoading.value=false })
        }else{
            isLoading.value=false
        }
    }
}

function imageFile() {
    check_new_auth_user();
    var max_size = 30;
    var uploader1 = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'pickfiles', // you can pass an id...
        url: config.VUE_APP_API_URL+'upload',
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
        // headers: { "Access-Token": user_data.value.tokens.access_token },
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
            title_rule.value = 'You must to login first before upload your Watermark';
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
        // tmp_file.value = { url: myData.data.thumbnail \\,file: myData.data.file }
        tmp_file.value = myData.data
        if(tmp_file.value){
            enable.value = true
            isShow.value = true
        }
        loadings.value = false;
        uploader1.refresh();
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

function check_new_auth_user() { user_data.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; }
</script>
