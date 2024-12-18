<script setup>
definePageMeta({ layout: "custom", middleware: "auth" });
import * as echarts from 'echarts';
import helper from "/helper";
const language = ref(helper.get_lang_cookie());
const mobileDevice = ref(helper.m_or_d())
const { isDesktop } = useDevice()
const runtime_config = useRuntimeConfig()
const config = runtime_config.public
const version_library = config.LIBRARY_VERSION;
const asset_url = '/'; 
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath();
const { locale } = useI18n();
const userData = ref('')
const loading = ref(false)
const inSightData = ref('')
const setOption = reactive({
	"dataZoom": {
		'end': 5
	},
	"series": {
		"barWidth": 6
	}
})
const errorData = reactive({ "message": null, "type": null, "code": null, "status": null })
const isLoadingButton = ref(null)
const attemptRequest = ref(0)

useHead({
    title: 'Insight - Khmer24.com', 
    meta: [
        { name: 'keywords', content: 'Buy, Sell' },
        { name: 'description', content: 'Buy, Sell' },

        { property: 'og:title', content: 'Insight - Khmer24.com' },
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

onMounted( async () => {
	if (helper.check_auth_user() === false) { router.replace(localePath({ name: isDesktop ? 'auth-login' : 'auth' })); };
	userData.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '';
	await getInsight()
	if (isDesktop) {
		setOption.dataZoom.end = 10
		setOption.series.barWidth = 8
	}
	drawGraph()
	
})

async function drawGraph() {
	// Initial graph
	const graphCanvasElement = $('#main')[0]
	if(graphCanvasElement) {
		let myChart = echarts.init(graphCanvasElement)
		const dataGraph = graphData(inSightData.value.data.graph.data)
		myChart.setOption({
			tooltip: {},
			xAxis: {
				type: 'category',
				data: dataGraph['data'],
				faxisLabel: {
					formatter: value => {
						const originalValue = Math.pow(2, value);
						return originalValue.toFixed(2);
					}
				},
				axisLabel: {
					margin: 15 
				},
				axisTick: {
					length: 5 
				}
			},
			dataZoom: [
				{
					type: 'inside',
					start: 0,
					end: setOption.dataZoom.end,
					xAxisIndex: [0, 5]
				},
			],

			yAxis: {},
			series: [
				{
					name: 'Impression',
					data: dataGraph['series']['impression']['data'],
					type: 'bar',
					stack: 'a',
					itemStyle: {
						borderRadius: [50, 50, 0, 0]
					},
					barWidth: setOption.series.barWidth,
					color: "#072BE0"
				},
				{
					name: 'View',
					data: dataGraph['series']['view']['data'],
					type: 'bar',
					stack: 'b',
					itemStyle: {
						borderRadius: [50, 50, 0, 0]
					},
					barWidth: setOption.series.barWidth,
					color: "#438afe"
				},
				{
					name: 'Contact',
					data: dataGraph['series']['contact']['data'],
					type: 'bar',
					stack: 'c',
					itemStyle: {
						borderRadius: [50, 50, 0, 0]
					},
					barWidth: setOption.series.barWidth,
					color: "#f75583"
				},
				{
					name: 'Chat',
					data: dataGraph['series']['chat']['data'],
					type: 'bar',
					stack: 'd',
					itemStyle: {
						borderRadius: [50, 50, 0, 0]
					},
					barWidth: setOption.series.barWidth,
					color: "#ff9700"
				}
			]
		})		
	}
}

function check_new_auth_user() { 
	userData.value = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : ''; 
}

async function clearError() {
    Object.keys(errorData).forEach(key => errorData[key] = null);
}

async function getInsight() {
	await clearError()
	const adid = route.params.id ? route.params.id : ''
	const storeid = route.query.storeid ? route.query.storeid : ''
	check_new_auth_user()
	loading.value = true
	try {
		const response = await $fetch(`${config.VUE_APP_API_URL_ISIGHTS}ads/${adid}?lang=${locale.value}`, {
			retry: 2, 
			retryDelay: 3000, 
			method: "GET", 
			headers: {
				"Access-Token": userData.value ? userData.value.tokens.access_token : ''
			},
			params: {
				"fields": "graph",
				"type": "advanced",
				"result_type": "daily",
				'storeid': storeid ? storeid : ''
			}
		})
		
		if(response) {
			inSightData.value = response
			loading.value = false
		}
	} catch (error) {
        if (!error.response) {
            errorData.status = 500 
			loading.value = false
        } else if (error.response && error.response.status === 401) {
			if(attemptRequest.value < 2) {
				attemptRequest.value += 1
				setTimeout(() => { retry() }, 3000);
			} else {
				localStorage.removeItem('auth_user')
				router.replace(localePath({ name: 'index' }))     
				loading.value = false
			}
        } else {
            errorData.status = error.response.status
            errorData.type = error.response?._data?.type ?? null
            errorData.message = error.response?._data?.message ?? null
            errorData.code = error.response?._data?.code ?? null
				loading.value = false
        } 
    } 
}

async function retry () {
	await getInsight()
	drawGraph()
}

</script>

<template>
	<div :class="!mobileDevice ? 'screen-content-desktop' : ''">
		<header v-if="mobileDevice" class="col no_padding fix_app_bar">
			<div class="_div_nav bg_app_bar_header_">
				<div @click="router.back()" class="_pad_col_icon">
					<button class="btn pt-1 pb-1 mr_5px" aria-label="back">
						<i class="ion-android-arrow-back font_click_back"></i>
					</button>
				</div>
				<div class="col pl-0 l_h_con_title">
					<p class="name_style truncate_wrap mb-0 ml-2 text-left">
						{{$t(`account_t.insight`)}} 
					</p>
				</div>
			</div>
		</header>
		<main :class="mobileDevice ? 'pt-5' : 'main_min_height mt_80'">
			<div v-if="loading" class="custom_spinner mt-5" :class="mobileDevice ? 'main_min_height':''">
				<span class="loader"></span>
			</div>
			<div v-else class="insight_page_wrapper max_width_form">
				<div v-if="errorData.status !== null" >
					<div v-if="errorData.status === 503" class="d-flex flex-column justify-content-center align-items-center " :class="mobileDevice ? 'px-3 pb-3 pt-2 unavailable_service_container' : 'unavailable_service_container_desktop'">
						<div class="service_unavailable_icon mb-5">
							<i class="bi bi-cloud-fill"></i>
							<i class="service_unavailable_icon_info bi bi-info-lg"></i>
						</div>
						<h1 class="mb-3 _fs_22">{{ $t('message.service_unavailable') }} !</h1>
						<p  class="text-center text-secondary mb-5 _fs_16" :class="mobileDevice ? '' : 'w-50'">{{ $t('message.service_unavailable_message') }}</p>
						<button v-if="isLoadingButton" type="button" class="mt-2 mx-auto btn btn-xm btn-k24-primary d-flex align-items-center justify-content-center" :class="mobileDevice ? 'w-100' : 'w-25'"><span class="loader_inside_button"></span></button>
						<button v-else type="button" @click="retry"  class="mt-2 mx-auto btn btn-xm btn-k24-primary" :class="mobileDevice ? 'w-100' : 'w-25'"> {{  $t('account_t.retry') }}</button>
					</div> 
					<div v-else-if="errorData.status === 500">
						<div class="col no_padding">
							<div class="no_more_result p-2">
								<div class="p_bg_status">
									<span class="fas fa-wifi size_icon_status"></span>
									<p class="mt-4 font_bold font_21 mb-1"> {{ $t('error_connect.title_error_con') }} </p>
									<p class="font_16 pt-2 pb-2 pl-3 pr-3 m-0"> {{ $t('error_connect.body_error_con') }} </p>
									<button @click="retry" class="btn bg_btn_status"> {{ $t('error_connect.retry') }} </button>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="membership_banner_store_not_found" :class="!mobileDevice ? 'rounded-2 px-3': 'px-3 membership_banner_store_not_found_mobile'">
						<div class="membership_banner_store_not_found_icon">
							<img :src="asset_url+version_library+'icon/iconizer-warning-icon.svg'" alt="" width="90" height="90" />
						</div>  
						<p class="error_type mb-2">{{$t(`account_t.problem_occurs`)}}</p>
						<span class="error_message mb-5">{{ errorData.message }}</span>
						<button  :class="!mobileDevice ? 'w-25' : 'w-100'" class="membership_banner_store_not_found_retry_link rounded-3"  @click="retry">{{$t(`account_t.retry`)}}</button>
					</div>
				</div>
				<div v-else>
					<div v-if="inSightData" >
						<div class="insight_summary_section mb-2" :class="!mobileDevice ? 'rounded-1' : ''">
							<h1 class="insight_section_title px-3 pt-3"> {{$t(`account_t.summary`)}}</h1>
							<div :key="item" v-for="item in inSightData?.data?.graph?.summary" class="insight_summary_item">
								<h2>
									{{ item.label ? $t(`account_t.${item.label.toLowerCase()}`)  : '' }}
								</h2>	
								<p>
									{{ item.description ? item.description : ''}}
								</p>
								<span>{{ item.value ? item.value : '0' }}</span>
							</div>
						</div>
						<div class="graph_section" :class="!mobileDevice ? 'rounded-top-1' : ''">
							<div class="graph_title_wrapper">
								<h1 class="insight_section_title">
									{{ inSightData.data.graph.label ? locale == 'en' ? inSightData.data.graph.label : inSightData.data.graph.label.match(/\d+/) + ' ' + '​ថ្ងៃចុងក្រោយ' : '' }}
								</h1>
								<span>{{ forMatDate(inSightData.data.graph.start_date, locale) }} - {{
									forMatDate(inSightData.data.graph.end_date, locale) }}</span>
							</div>
							<div class="graph_label_wrapper px-3">
								<div class="graph_label">
									<span class="label_text"> {{$t(`account_t.impression`)}}</span>
									<span class="label_color_bar impression"></span>
								</div>
								<div class="graph_label">
									<span class="label_text"> {{$t(`account_t.view`)}}</span>
									<span class="label_color_bar view"></span>
								</div>
								<div class="graph_label">
									<span class="label_text"> {{$t(`account_t.contact`)}}</span>
									<span class="label_color_bar contact"></span>
								</div>
								<div class="graph_label">
									<span class="label_text"> {{$t(`account_t.chat`)}}</span>
									<span class="label_color_bar chat"></span>
								</div>
							</div>
						</div>
					</div>
					<main id="main" class="graph-wrapper" :class="[!inSightData ? 'bg-transparent' : '', !mobileDevice ? 'rounded-bottom-1' : '']">
					</main>
				</div>
			</div>
		</main>	
	</div>
</template>
<style scoped>
    .graph-wrapper {
        width: 100%;
        height: 500px !important;
		background-color: #fff;
    }
</style>
