
<template>
    <div >
        <div v-if="isMobile" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no_padding fix_app_bar">
            <div class="_div_nav bg_app_bar_header_">
                <div @click="goBack" class="_pad_col_icon">
                    <button class="btn pt-1 pb-1 mr_5px" aria-label="back">
                        <i class="ion-android-arrow-back font_click_back"></i>
                    </button>
                </div>
                <div class="col text-center l_h_con_title">
                    <p class="name_style truncate_wrap m-0 text-center">Privacy Policy</p>
                </div>
                <div class="s_w_app_icon"></div>
            </div>
        </div>

        <!-- <div v-if="isMobile" class="margin_below_app_bar">
            <iframe :class="isDesktop ? 'des_container' : ''" class="s_posting_rule" title="Posting Rule" :src="'/'+app_config.LIBRARY_VERSION+'supports/privacy-and-policy.html'"></iframe>
        </div> -->
        <div class="min_h max_width_form" :class="isMobile ? 'pt-5' : 'mt_80'">
            <div class="bg-white w-100 p-3 fn_15">
                <!-- <iframe :src="'/'+app_config.LIBRARY_VERSION+'supports/privacy-and-policy.html'" frameborder="0" width="100%" style="height:100vh"></iframe> -->
                <h1 class="fn_25 text-center"><strong>Privacy Policy</strong></h1>
                <p>Khmer24 Free Classifieds strives to offer its visitors the many advantages of internet technology and to provide an interactive and personalized experience. We may use Personally Identifiable Information (your name, e-mail address, street address, telephone number) subject to the terms of this privacy policy. We will never sell, barter, or rent your email address to any unauthorized third party.</p>
                <p>We recognizes the importance of protecting your privacy and our policy is designed to assist you in understanding how we collect, use and safeguard the personal information you provide to us and to assist you in making informed decisions when using our site. This policy will be continuously assessed against new technologies, business practices and our customers' needs.</p>
                
                <h2 class="fn_20"><strong>What Information Do We Collect?</strong></h2>
                <p>When you visit this web site you may provide us with two types of information: personal information you knowingly choose to disclose that is collected on an individual basis and Web site use information collected on an aggregate basis as you and others browse our Web site.</p>
                <h3 class="fn_18"><strong>1. Personal Information You Choose to Provide</strong></h3>
                <p>Registration Information: When you register for use of our website services you will provide us information about yourself such as Name, Email, phone number and Country</p>
                <p>Personal Profile Information: Other Personally Identifiable Information that you voluntarily disclose in your Personal Profile page that is not required during registration.</p>
                <p>Register using your Google account: We collect first name, last name, profile picture and email address</p>
                <p>Register using your Facebook account: We collect first name, last name, profile picture and email address</p>
                <p>Register using your Apple ID: We collect first name, last name and email address</p>
                <h3 class="fn_18"><strong>2. Web Site Use Information</strong></h3>
                <p>Similar to other commercial Web sites, our Web site utilizes a standard technology called "cookies" (see explanation below, "What Are Cookies?") and web server log files to collect information about how our Web site is used. Information gathered through cookies and Web server logs may include the date and time of visits, the pages viewed, time spent at our Web site, and the Web sites visited just before and just after our Web site.</p>
                
                <h2 class="fn_20"><strong>What Are Cookies?</strong></h2>
                <p>A cookie is a very small text document, which often includes an anonymous unique identifier. When you visit a Web site, that site's computer asks your computer for permission to store this file in a part of your hard drive specifically designated for cookies. Each Web site can send its own cookie to your browser if your browser's preferences allow it, but (to protect your privacy) your browser only permits a Web site to access the cookies it has already sent to you, not the cookies sent to you by other sites. Browsers are usually set to accept cookies. However, if you would prefer not to receive cookies, you may alter the configuration of your browser to refuse cookies. If you choose to have your browser refuse cookies, it is possible that some areas of our site will not function as effectively when viewed by the users. A cookie cannot retrieve any other data from your hard drive or pass on computer viruses.</p>
                <h2 class="fn_20"><strong>What we do with the information we collect</strong></h2>
                <p>Broadly speaking, we use personal information for purposes of administering our business activities, providing the products and services you requested, to process your payment, to monitor the use of the service, our marketing and promotional efforts and improve our content and service offerings, and customize our site's content, layout, services and for other lawful purposes. These uses improve our site and better tailor it to meet your needs.</p>
                <p>Occasionally, we may also use the information we collect to notify you about important changes to our Website, new services, and special offers we think you will find valuable. You may notify us at any time if you do not wish to receive these offers by emailing us at the link provided on the newsletter.</p>
                <p>Aggregated Information (information that does not personally identify you) may be used in many ways. For example, we may combine information about your usage patterns with similar information obtained from other users to help enhance our site and services (e.g., to learn which pages are visited most or what features are most attractive). Aggregated Information may occasionally be shared with our advertisers and business partners. Again, this information does not include any Personally Identifiable Information about you or allow anyone to identify you individually.</p>
                <p>We will use your information only as permitted by law. In addition, from time to time as we continue to develop our business, we may sell, buy, merge or partner with other companies or businesses. In such transactions, user information may be among the transferred assets. We may also disclose your information in response to a court order, at other times when we believe we are reasonably required to do so by law, in connection with the collection of amounts you may owe to us, and/or to law enforcement authorities whenever we deem it appropriate or necessary. Please note we may not provide you with notice prior to disclosure in such cases.</p>
                <p>If you log in using your mobile number or email id, we use your first name and last name, mobile number and/or e-mail address to identify you as a user and provide access to our Platform.</p>
                <p>If you log in using your Facebook account or Google account or your Apple ID, we use your first name and last name and your email address of such account, as well as the URL to your profile picture (except for Apple ID) we use your first name and last name from your Facebook profile and the Facebook e-mail address to identify you as a user on our Platform and to provide you access to our Platform.</p>
                
                <h2 class="fn_20"><strong>Affiliated sites, linked sites and advertisements</strong></h2>
                <p>Khmer24 Free Classifieds expects its partners, advertisers and affiliates to respect the privacy of our users. Be aware, however, that third parties, including our partners, advertisers, affiliates and other content providers accessible through our site, may have their own privacy and data collection policies and practices. Khmer24 Free Classifieds is not responsible for the actions or policies of such third parties. You should check the applicable privacy policies of those third parties when providing information on a feature or page operated by a third party.</p>
                <p>While on our site, our advertisers, promotional partners or other third parties may use cookies or other technology to attempt to identify some of your preferences or retrieve information about you. For example, some of our advertising is served by third parties and may include cookies that enable the advertiser to determine whether you have seen a particular advertisement before. Other features available on our site may offer services operated by third parties and may use cookies or other technology to gather information. Khmer24 Free Classifieds does not control the use of this technology by third parties or the resulting information, and is not responsible for any actions or policies of such third parties.</p>
                <p>You should also be aware that if you voluntarily disclose Personally Identifiable Information on message boards or in Personal Profile page, that information can be viewed publicly and can be collected and used by third parties without our knowledge and may result in unsolicited messages from other individuals or third parties. Such activities are beyond the control of Khmer24 Free Classifieds and this policy.</p>
                
                <h2 class="fn_20"><strong>What About Other Web Sites Linked to Our Web Site?</strong></h2>
                <p>We are not responsible for the practices employed by Web sites linked to or from our Web site or the information or content contained therein. Often links to other Web sites are provided solely as pointers to information on topics that may be useful to the users of our Web site.</p>
                <p>Please remember that when you use a link to go from our Website to another web site, our Privacy Policy is no longer in effect. Your browsing and interaction on any other web site, including web sites, which have a link on our Website, is subject to that Web site's own rules and policies. Please read over those rules and policies before proceeding.</p>
                
                <h2 class="fn_20"><strong>Your Consent</strong></h2>
                <p>By using our Web site you consent to our collection and use of your personal information as described in this Privacy Policy. We reserve the right to amend this privacy policy at any time with or without notice.</p>
                
                <h2 class="fn_20"><strong>Your rights - data deletion requests</strong></h2>
                <p>To exercise your privacy rights and choices, if you do not want us to process your data, then you can contact Khmer24's customer service to request data deletion.</p>
                
                <h2 class="fn_20"><strong>Changes to this Policy</strong></h2>
                <p>Khmer24 Free Classifieds reserves the right to change this policy at any time. Please check this page periodically for changes. Your continued use of our site following the posting of changes to these terms will mean you accept those changes. Information collected prior to the time any change is posted will be used according to the rules and laws that applied at the time the information was collected.</p>
                <p>Last Updated ( 2023 )</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const runtime_config = useRuntimeConfig();
    const app_config =runtime_config.public;
    import helper from "/helper";
    import {event, pageview} from "vue-gtag";
    const isDesktop = helper.check_is_desktop(); // check userAgent
    const isMobile= ref(helper.m_or_d())

    definePageMeta( {layout: "default"} );
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();

    const meta_title_privacy_policy = useState('meta_title_privacy_policy', () => 'Privacy and Policy - Khmer24.com');

    useHead({
        title: meta_title_privacy_policy.value,
        meta: [
            // -- ios --
            // { name: 'apple-mobile-web-app-title', content: meta_title_privacy_policy.value },
            // -- seo page --
            { name: 'keywords', content: 'Buy, Sell, Privacy Policy, privacy khmer24, khmer24 privacy' },
            { name: 'description', content: 'Buy, Sell, Privacy page of khmer24, Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website.' },

            { property: 'og:title', content: meta_title_privacy_policy.value },
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
            track_google_analytics();
        }
    })

    // ---- track on google analytic ----
    function track_google_analytics () {
        let page_path = route.path;           // ex: '/en/mobiles/airpods-pro-25-adid-4688774.html'
        let page_location = window.location.href;   // ex: 'https://www.khmer24.com/en/mobiles/airpods-pro-25-adid-4688774.html'
        let data = {
            page_title: meta_title_privacy_policy.value,
            page_location: page_location,
            page_path: page_path,
        };
        // -- event on page --
        event('privacy_policy', data);
        // -- page_view --
        pageview(data);
    }

    function goBack() { window.history.length > 2 ? router.go(-1) : router.push(localePath({ name: 'index' })); }
</script>
