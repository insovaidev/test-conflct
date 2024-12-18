<template>
    <div>
        <Page_404 />
    </div>
</template>

<script setup>
    import Page_404 from "/components/404";
    const config = useRuntimeConfig(); // setup config env to config variable.
    const config_404 =config.public;
    const version = config_404.LIBRARY_VERSION;

    /* add header when url in browser not march with nuxt router */
    useHead({
        "charset": "utf-8",
        "viewport": "width=device-width, initial-scale=1, minimum-scale=1",
        title: '404 Page Not Found',
        "meta": [
            { name: 'theme-color', content: '#028dcf' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },

            /*{ name: 'Khmer24', content: 'app-id=1133793397, app-argument=https://m.khmer24.com/en/' },
            { property: 'al:ios:app_name', content: 'Khmer24' },
            { property: 'al:ios:app_store_id', content: '1133793397' },
            { property: 'al:ios:url', content: 'https://m.khmer24.com/en/' },*/

            /*{ name: 'apple-mobile-web-app-title', content: '404 Page Not Found' },*/

            { property: 'og:title', content: 'khmer24.com, Buy and Sell Everything In Cambodia' },
            { property: 'fb:app_id', content: '217361691621555' },
            { property: 'og:site_name', content: 'www.khmer24.com' },
            { property: 'og:url', content: 'https://www.khmer24.com/en/' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'https://www.khmer24.com/khmer24-crm-63/template/img/share-default-image.jpg' },
            { property: 'og:image:width', content: '600' },
            { property: 'og:image:height', content: '600' },
            { property: 'og:description', content: 'Sell your 2nd hand items on Khmer24.com, the Cambodia #1 buy and sell website. Post free online classified ads of your used car, mobile phone, furniture, and more.' },
        ],
        "link": [
            {  rel: 'shortcut icon', href: '/icon/favicon.ico' },
            {  rel: 'preconnect stylesheet', href: 'https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap' },
            {  rel: 'preconnect stylesheet', href: ' https://fonts.googleapis.com/icon?family=Material+Icons' },

            /* icons */
            {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon.png' },
            {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon-ipad.png' },
            {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon-iphone-retina.png' },
            {  rel: 'apple-touch-icon', href: '/icon/khmer24-touch-icon-ipad-retina.png' },

            /* fonts */
            // {  rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Hanuman:wght@400;700&display=swap' },
            {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+version+'bootstrap-5.3.2/css/bootstrap.min.css' },
            {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+version+'ionicons-2.0.1/css/ionicons.min.css' },
      {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+version+'bootstrap-5.3.2/bootstrap-icons/font/bootstrap-icons.min.css' },
            {  rel: 'preload stylesheet', as: 'style', type: 'text/css', href: '/'+version+'css/mobile_main.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'fontawesome/css/all.min.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'fancybox-v5/fancybox.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'icomoon/style.css' }, /* generated icon our own with icoMoon */

            /* my css */
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/home_general_style.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/list_ads.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/account.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/desktop_view.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/media_all_style.css' },
            {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/style_btn.css' },
      {  rel: 'preload stylesheet', as: 'style', href: '/'+version+'my_css/premium_account.css' },
        ],
        "style": [],
        "script": [
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'bootstrap-5.3.2/popper.min.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'js/jquery-3.7.1.min.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'fancybox-v5/fancybox.umd.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'plupload-2.3.9/plupload.full.min.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'jquery_validation/dist/jquery.validate.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'bootstrap-5.3.2/js/bootstrap.min.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'bootstrap-5.3.2/bootstrap-notify/bootstrap-notify.min.js' },
            { rel: 'preload', as: 'script', type: 'text/javascript', src: '/'+version+'jquery.lazy-master/jquery.lazy.min.js' },
        ]
    })

    // import Page_404 from "/components/404";
</script>