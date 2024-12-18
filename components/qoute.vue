<template>
    <div v-if="data_qouta" class="quota">
        <ul  class="d-flex list-unstyled" :class="isMobile ? 'flex-wrap' : ''">
            <li v-if="data_qouta && data_qouta.ads" :class="isMobile ? 'w-100 mb-3' :'g-item'">
                <div class="shadow-sm item-qouta" :class="isMobile ? '' : 'mr-2'">
                    <p :class="isMobile ? 'fn_14':'fn_15'" class="text-secondary h_40px mb-0">{{ data_qouta.ads.title }}:</p>
                    <p class="text-center fn_18"><strong>{{ data_qouta.ads.label }}</strong></p>
                    <div class="progress h_5px" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" :class="ads_progress >= 90 ? 'progress-90' : ''" :style="{ width: ads_progress + '%' }"></div>
                    </div>
                </div>
            </li>
            <li v-if="data_qouta.renews" :class="isMobile ? 'w-50 pe-2' :'g-item'">
                <div class="shadow-sm item-qouta" :class="isMobile ? '' : 'mx-1'">
                    <div class="h_40px">
                        <p :class="isMobile ? 'fn_14':'fn_15'" class="text-secondary mb-0">{{ data_qouta.renews.title }}:</p>
                        <div :class="isMobile ? 'fn_10' : 'fn_12'" class="text-center fw-medium">( {{ data_qouta.renews.description }} )</div>
                    </div>
                    <p class="text-center fn_18"><strong>{{ data_qouta.renews.label }}</strong></p>
                    <div class="progress h_5px" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" :class="renews_progress >= 90 ? 'progress-90' : ''" :style="{ width: renews_progress + '%' }"></div>
                    </div>
                </div>
            </li>
            <li v-if="data_qouta.auto_renews" :class="isMobile ? 'w-50 ps-2' :'g-item'">
                <div class="shadow-sm item-qouta" :class="isMobile ? '' : 'ms-2'">
                    <p :class="isMobile ? 'fn_14':'fn_15'" class="text-secondary h_40px mb-0">{{ data_qouta.auto_renews.title }}:</p>
                    <p class="text-center fn_18"><strong>{{ data_qouta.auto_renews.label }}</strong></p>
                    <div class="progress h_5px" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" :class="auto_renews_progress >= 90 ? 'progress-90' : ''" :style="{ width: auto_renews_progress + '%' }"></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import helper from '~/helper';
const isMobile = ref(helper.m_or_d());
const route = useRoute();
const { public:config } = useRuntimeConfig();
const { locale } = useI18n();
const data_qouta = ref('')
const user_auth = ref('')
const ads_progress = ref(0);
const renews_progress = ref(0);
const auto_renews_progress = ref(0);
const r_name = helper.clear_prefix_route_name(route.name);
const store_renew = useState('store_renew', ()=> false);
let intervalId

if(process.server){
    await getQoutaServer();
}
onMounted(()=>{
    if(process.client){
        check_new_auth_user();
        getQouta();
        intervalId = setInterval(() => {
            if(store_renew.value){
                getQouta();
                store_renew.value = false
            }
        }, 1000)
    }
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
});

function check_new_auth_user() { 
    user_auth.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
}

async function getQoutaServer() {
    try {
        check_new_auth_user();
        if(user_auth.value){
            let str_id = r_name==='account-store-id' ? route.params.id : ''
            let url = config.VUE_APP_API_URL+'me/quota'
            const { data:qouta } = await useFetch(url,{
                headers:{ "Access-Token": user_auth.value.tokens.access_token },
                params: { lang: locale.value === 'km' ? 'km' : 'en', storeid: str_id  }
            }).catch(er=>{
                console.log(er)
            })
            if(qouta && qouta.value){
                data_qouta.value = qouta.value.data
                ads_progress.value = ((data_qouta.value.ads.usage * 100) / data_qouta.value.ads.value).toFixed()
                renews_progress.value = ((data_qouta.value.renews.usage * 100) / data_qouta.value.renews.value).toFixed()
                auto_renews_progress.value = ((data_qouta.value.auto_renews.usage * 100) / data_qouta.value.auto_renews.value).toFixed()
            }
        }else{
            alert('auth')
        }
    } catch (error) {
        console.log(error)
    }
}

function getQouta() {
    check_new_auth_user();
    if(user_auth.value){
        let str_id = r_name==='account-store-id' ? route.params.id : ''
        let url = config.VUE_APP_API_URL+'me/quota'
        $fetch(url,{
            headers:{ "Access-Token": user_auth.value.tokens && user_auth.value.tokens.access_token },
            params: { lang: locale.value === 'km' ? 'km' : 'en', storeid: str_id  }
        }).then(res=>{
            data_qouta.value = res.data
            ads_progress.value = ((data_qouta.value.ads.usage * 100) / data_qouta.value.ads.value).toFixed()
            renews_progress.value = ((data_qouta.value.renews.usage * 100) / data_qouta.value.renews.value).toFixed()
            auto_renews_progress.value = ((data_qouta.value.auto_renews.usage * 100) / data_qouta.value.auto_renews.value).toFixed()
        }).catch(er=>{
            console.log(er)
        })
    }else{
        alert('auth')
    }
}
</script>