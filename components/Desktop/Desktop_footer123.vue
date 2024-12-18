<template>
    <footer class="d_footer des_min_width">
        <div class="des_container">
            <div class="row">
                <div class="col">
                    <p class="d_f_title">{{ $t('text_desktop.follow_khmer24') }}</p>
                    <ul class="list-unstyled has-icon">
                        <li>
                            <a href="https://khmer24.page.link/facebook" target="_blank" rel="nofollow noopener">
                                <span class="fab fa-facebook-f"></span> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://khmer24.page.link/youtube" target="_blank" rel="nofollow noopener">
                                <span class="fab fa-youtube"></span> YouTube
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <p class="d_f_title">{{ $t('text_desktop.customer_service') }}</p>
                    <ul class="list-unstyled">
                        <li><a href="https://www.khmer24.com/en/contact.html" title="Contact Us">{{ $t('message.contact_us') }}</a></li>
                        <li><a href="https://www.khmer24.com/en/membership.html">{{ $t('text_desktop.membership') }}</a></li>
                        <li><a href="https://www.khmer24.com/en/promote-ad.html">{{ $t('text_desktop.promote_ad') }}</a></li>
                        <li><a href="https://www.khmer24.com/en/privacy-policy.html" title="Privacy Policy">{{ $t('message.privacy_policy') }}</a></li>
                    </ul>
                </div>
                <div class="col">
                    <p class="d_f_title">{{ $t('text_desktop.useful_information') }}</p>
                    <ul class="list-unstyled">
                        <li><a href="https://www.khmer24.com/en/safety-tips.html">{{ $t('message.safe_tips') }}</a></li>
                        <li><a href="https://www.khmer24.com/en/posting-rule.html">{{ $t('text_desktop.ad_posting_rule') }}</a></li>
                    </ul>
                </div>
                <div class="col">
                    <p class="d_f_title">{{ $t('text_desktop.down_khmer24_free') }}</p>
                    <div class="row app-link">
                        <div class="col-6 text-right">
                            <a href="https://khmer24.page.link/app" target="_blank" aria-label="Khmer24 QR" rel="nofollow noopener">
                                <img class="img-fluid icon-qr hg_wi_100" src="/icon/khmer24-qr-code.png" alt="khmer24 QR">
                            </a>
                        </div>
                        <div class="col-6 text-left">
                            <div class="mt-2">
                                <a href="https://khmer24.page.link/ios" target="_blank" aria-label="App Khmer24" rel="nofollow noopener">
                                    <img class="img-fluid icon-app hg_wi_100" src="/icon/appstore.png" alt="App Khmer24">
                                </a>
                            </div>
                            <div class="mt-3">
                                <a href="https://khmer24.page.link/android" target="_blank" aria-label="App Khmer24" rel="nofollow noopener">
                                    <img class="img-fluid icon-app hg_wi_100" src="/icon/playstore.png" alt="App khmer24">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="copy-right text-center p-2 m-0">Copyright ©2021 <NuxtLink :to="localePath({ name: 'index' })">KHMER24</NuxtLink> (Cambodia). All rights reserved.</p>
    </footer>
</template>

<script setup>
    const localePath = useLocalePath()
</script>
