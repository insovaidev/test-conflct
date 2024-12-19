let index_banner = 1;

export default {
    // --- check spacial character ---
    check_special_char(text) {
        // check is empty must to add sample text to prevent router title error. bc it allow to have title.
        return text ? text.split(/[!@#$%^&*()_+\-=[\]{};':"\\|, .<>/?]/).join("-").toLowerCase() : 'Empty';
    },

    cut_date(file_image){
        return file_image.split("/").pop();
    },

    // --- remove class modal-open when modal pop up ---
    remove_class_modal_open() {
        document.body.classList.remove('modal-open');
        $('.modal').modal('hide');  // prevent click button phone or browser when modal is show
    },


    // ---- check mobile device or pc device ----
    is_pc_or_mobile_device () {
        // const runtimeConfig = useRuntimeConfig();
        // console.log(runtimeConfig.VUE_APP_BASE_URL);

        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            return 'mobile';
        } else {
            // false for not mobile device
            return 'pc';
        }
    },


    android_or_ios_device () {
        if (/Android/i.test(navigator.userAgent)) {
            return ' android';
        } else {
            return 'ios';
        }
    },

    m_or_d (){
        const {isDesktop} = useDevice();
        if(isDesktop){
            return false;
        }else{
            return true;
        }
    },

    pc_or_mobile_device () {
        // const runtimeConfig = useRuntimeConfig();
        // console.log(runtimeConfig.VUE_APP_BASE_URL);

        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(global.navigator.userAgent)) {
            // true for mobile device
            return true;
        } else {
            // false for not mobile device
            return false;
        }
    },


    // is_pc_or_mobile_device () {
    //     // const runtimeConfig = useRuntimeConfig();
    //     // console.log(runtimeConfig.VUE_APP_BASE_URL);

    //     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //         // true for mobile device
    //         return 'mobile';
    //     } else {
    //         // false for not mobile device
    //         return 'pc';
    //     }
    // },

    clear_break_2line(text){
        return text.replace(/\n\s{2,}/gm, '\n').replace(/ {2,}/gm, ' ').replace(/\n{2,}/gm, '<br>')
    },
    // --- check is desktop or mobile view (work both serverSide && clientSide) ---
    check_is_desktop() {
        const config = useRuntimeConfig();
        let device = config.public.CHECK_DEVICE;
        if (device === 'check') {
            const {isDesktop} = useDevice(); // check userAgent
            return isDesktop;
        } else if (device === 'M') {
            return false;
        } else if (device === 'DT') {
            return true;
        }
    },

    // --- clean .html from string ---
    clean_html_text(text) {
        return text.split('.html').join("");
    },

    // --- clean spacial character in search text ---
    check_special_search_text(text) {
        let clean_search = text.split(/[!@#$%^&*()+=[\]{};':"\\|,<>/?]/).join("").toLowerCase(); // original => (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
        return clean_search;
    },

    // --- check auth user on template --- // // --- if on route, at routes.js --- //
    check_auth_user() {
        //--- get auth_user from localstorage ---//
        let auth_user = process.server ? '' : (localStorage.getItem("auth_user") ? JSON.parse(localStorage.getItem("auth_user")) : '');
        if (auth_user) {
            return true;
        } else {
            return false;
        }
    },

    // --- convert number to k ---
    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    },

    // --- add class modal-open to body if modal pop up multiple in the same time ---
    add_class_modal_open() {
        setTimeout(function () { document.body.classList.add('modal-open'); }, 500);
    },

    // --- convert price with separates ---
    convert_price(num) {
        // let num = 500000.5525;
        let british = Number(num).toLocaleString("en-GB", {
            maximumFractionDigits: 2, // get . digit
        });
        return british;
    },

    // -- check link on banner (if khmer24 link) --
    check_link_is_khmer24(link, config) {
        let app_base_url = config.public.VUE_APP_BASE_URL;

        if (link.match(/khmer24.com|www.khmer24.com./) !== null) { // is khmer24 link.
            let convert_to_array = link.split("/");
            // console.log(convert_to_array.at(-1).toLowerCase());
            let category = convert_to_array.at(-1).toLowerCase();
            return app_base_url + category;
        } else {
            return link;
        }
    },

    // ---- create cookies user login ----
    create_data_user_login(data_res) {
        return {
            tokens: data_res.tokens,
            timestamp: data_res.timestamp,
            user: {
                first_name: data_res.user && data_res.user.first_name ? data_res.user.first_name : '',
                id: data_res.user && data_res.user.id ? data_res.user.id : '',
                is_has_password: data_res.user && data_res.user.is_has_password ? data_res.user.is_has_password : '',
                is_membership: data_res.user && data_res.user.is_membership ? data_res.user.is_membership : '',
                last_name: data_res.user && data_res.user.last_name ? data_res.user.last_name : '',
                name: data_res.user && data_res.user.name ? data_res.user.name : '',
                photo: data_res.user && data_res.user.photo ? data_res.user.photo : '',
                phone_activated: data_res.user && data_res.user.phone_activated ? data_res.user.phone_activated : '',
                company: data_res.user && data_res.user.company ? data_res.user.company : '',
                account_verification: data_res.user && data_res.user.account_verification ? data_res.user.account_verification : '',
                setting: data_res.user && data_res.user.setting ? data_res.user.setting : '',
                username: data_res.user && data_res.user.username ? data_res.user.username : '',
            }
        }
    },

    // ---- create iframe to content banner code ----
    create_banner_code_html(data, from, con_obj) {
        var screenWith = document.body.clientWidth; // "document" work only clientSide not serverside
        // console.log(screenWith);
        // window.addEventListener('resize', function() { screenWith = document.body.clientWidth; });

        var script = data.data;
        // console.log(script)

        var iframeWidth = 970;
        var iframeHeight = 250;
        var matches = script.substring(script.indexOf('defineSlot('), script.indexOf('.addService('));
        matches = matches.substring(matches.indexOf('[')+1, matches.lastIndexOf(']'));
        // eslint-disable-next-line no-useless-escape
        var sizes = matches.length ? (matches.substring(1, matches.length-1)).split(/\]\,\s\[/) : null;
        // console.log(sizes)
        const {isDesktop} = useDevice();

        // -- banner from google --
        if (matches) {

            if (sizes) {
                var widths = [];
                var sizeIndexes = {};
                sizes.forEach(val => {
                    var size = val.split(',');
                    widths.push(parseInt(size[0]));
                    sizeIndexes[parseInt(size[0])] = parseInt(size[1]);
                });
                widths = widths.sort(function(a, b) { return b - a; });
                for(var i in widths) {
                    var width = widths[i];
                    if(screenWith >= width) {
                        var height = sizeIndexes[width];
                        iframeHeight = height;
                        iframeWidth = width;
                        script = script.replace(matches, "["+width+", "+height+"]");
                        break;
                    }
                }
            }

            // add style to html head in iframe tag
            var ban_google_style = '<style> body,html { margin: 0 !important; overflow: hidden; } img {max-width: 100% !important; height: auto !important; } </style>';
            const div = document.createElement("div");
            const iframe = document.createElement("iframe");
            const html = ban_google_style+script;
            iframe.id = "iframe-"+index_banner++;
            iframe.width = iframeWidth;
            iframe.height = iframeHeight;
            iframe.setAttribute('srcdoc', html);
            iframe.setAttribute('title', 'Google Banner'); // iframe must to have title
            div.setAttribute('class', from === 'slide' ? 's_ban_google' : 'google_banner');
            div.append(iframe);
            return div;

        // -- banner from khmer24 custom script --
        } else {
            /*if (screenWith > parseInt(data.width)) { // check screen width bigger then banner original height
                iframeHeight = data.height;
                iframeWidth = data.width;

            } else { // check screen width is smaller then banner original height, use custom sizes instead
                let sizes = ['728, 188', '970, 250', '320, 170', '468, 170', '240, 170'];
                let widths = [];
                let sizeIndexes = {};
                if (sizes) {
                    sizes.forEach(val => {
                        let size = val.split(',');
                        widths.push(parseInt(size[0]));
                        sizeIndexes[parseInt(size[0])] = parseInt(size[1]);
                    });
                    widths = widths.sort(function(a, b) { return b - a; });
                    for(let i in widths) {
                        let width = widths[i];
                        if(screenWith >= width) {
                            iframeHeight = sizeIndexes[width];
                            iframeWidth = width;
                            break;
                        }
                    }
                }
            }*/

            // add style to html head in iframe tag
            // let height = parseInt(iframeHeight); // custom height on iframe more.
            // let ban_php_style = '<style> body,html { margin: 0 !important; overflow: hidden; } body { text-align: center; } img {max-width: 100% !important; height: '+ height +'px;object-fit: fill; /*width: auto;*/ } </style>';

            iframeHeight = data.height;
            iframeWidth = data.width;
            let ban_php_style = '<style> body,html { padding: 0 !important; margin: 0 !important; text-align: center; overflow: hidden; } img { max-width: 100% !important; height: auto !important; } </style>';

            const div = document.createElement("div");
            const iframe = document.createElement("iframe");
            const html = ban_php_style+script;
            iframe.id = "iframe-"+index_banner++;
            // iframe.width = iframeWidth;
            // iframe.height = iframeHeight;
            // iframe.setAttribute('style', 'height: '+ height +'px;'); // add style height dynamic on iframe.

            // -- get desktop screen on detail_post page --
            let custom_width = con_obj && con_obj.detail_post && con_obj.detail_post.dt_ban_A ? con_obj.detail_post.dt_ban_A.width : '';
            // console.log(con_obj); console.log(custom_width);

            iframe.width = screenWith;
            iframe.height = this.getHeight(iframeWidth, iframeHeight, custom_width);
            iframe.setAttribute('srcdoc', html);
            iframe.setAttribute('title', 'Custom Banner'); // iframe must to have title
            div.setAttribute('class', from === 'slide' ? ( isDesktop ? 's_ban_php_dt' : 's_ban_php' ) : 'php_banner');
            div.setAttribute('style', 'margin: 0 0 -7px 0;');
            div.append(iframe);
            return div;


            /*let sizes = ['728, 188', '970, 250', '320, 170', '468, 170', '240, 170']; // new
            let widths = [];
            let sizeIndexes = {};
            if (sizes) {
                sizes.forEach(val => {
                    let size = val.split(',');
                    widths.push(parseInt(size[0]));
                    sizeIndexes[parseInt(size[0])] = parseInt(size[1]);
                });
                widths = widths.sort(function(a, b) { return b - a; });
                for(let i in widths) {
                    let width = widths[i];
                    if(screenWith >= width) {
                        let height = sizeIndexes[width];
                        iframeHeight = height;
                        iframeWidth = width;
                        break;
                    }
                }
            }

            // add style to html head in iframe tag
            let height = parseInt(iframeHeight)+20; // custom height on iframe more.
            // let ban_php_style = '<style> body,html { margin: 0 !important; overflow: hidden; } body { text-align: center; } img {max-width: 100% !important; height: auto !important; } </style>'; // old
            let ban_php_style = '<style> body,html { margin: 0 !important; overflow: hidden; } body { text-align: center; } img {max-width: 100% !important; height: '+ height +'px;object-fit: fill; width: auto; } </style>'; // new

            const div = document.createElement("div");
            const iframe = document.createElement("iframe");
            const html = ban_php_style+script;
            iframe.id = "iframe-"+index_banner++;
            iframe.width = iframeWidth;
            iframe.height = iframeHeight;
            iframe.setAttribute('style', 'height: '+ height +'px;'); // add style height dynamic on iframe.
            iframe.setAttribute('srcdoc', html);
            div.setAttribute('class', from === 'slide' ? 's_ban_php' : 'php_banner');
            div.append(iframe);
            return div;*/
        }

        // -- add css to iframe html in jquery --
        // $("#add_banner_zone > iframe").contents().find("body").css({ 'margin': '0', 'display': 'flex', 'justify-content': 'center' });
    },
    getHeight(width, height, cus_width) {
        var screenWith = cus_width ? cus_width : document.body.clientWidth;
        if(screenWith >= width) return height;
        var p = 1-((screenWith/width)*100)/100;
        return Math.ceil(height-(height*p));
    },

    // --- convert to "Bytes", "KB", "MB", "GB", "TB" ---
    bytes2Size(byteVal) {
        var units = ["Bytes", "KB", "MB", "GB", "TB"];
        var kounter = 0;
        var kb = 1024;
        var div = byteVal / 1;
        while(div >= kb) {
            kounter++;
            div = div / kb;
        }
        return div.toFixed(2) + " " + units[kounter];
    },

    // --- Visibility Tracking ---
    async tracking_action(type, data, action, placement, display_type, filter) {
        const runtimeConfig = useRuntimeConfig();
        const {isDesktop} = useDevice();
        let app_version = runtimeConfig.public.VUE_APP_APP_VERSION;
        // console.log('data=======',data)
        // console.log(runtimeConfig.VUE_APP_BASE_URL);
        let auth_user = process.server ? '' : (localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : '');

        let data_sent = {
            action: action,
            placement: placement, // required, enum(home, listing, detail, profile, chat,related, search)
        }
        // -- check display type --
        if (display_type) {
            data_sent['display_type'] = display_type; // enum(list, grid, gallery, slide)
        }
        // -- check platform --
        data_sent['platform'] = JSON.stringify({"type": isDesktop ? "desktop_view" : "mobile_view", "version": app_version.replace("v", "")}); // replace v to empty in version project.
        // -- check device --
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // check pc_view or mobile_view
            data_sent['device'] = JSON.stringify({"type":"mobile", "os": this.check_os(), "version": this.check_version()});
        } else if (/iPad/i.test(navigator.userAgent)) {
            data_sent['device'] = JSON.stringify({"type":"tablet", "os": this.check_os(), "version": this.check_version()});
        } else {
            data_sent['device'] = JSON.stringify({"type":"pc", "os": this.check_os(), "version": this.check_version()});
        }
        // -- check user --
        if (auth_user) {
            data_sent['userid'] = auth_user.user.id;
        }
        // -- have filter --
        if (filter) {
            data_sent['filter'] = JSON.stringify(filter);
        }
        // ----- data -----
        if (type === 'post') {
            let data_tmp = { "type": "post", "id": data.id };
            if (data.item_count) { data_tmp['item_count'] = data.item_count }
            if (data.item_per_page) { data_tmp['item_per_page'] = data.item_per_page }
            if (data.current_index || data.current_index === 0) { data_tmp['current_index'] = data.current_index+1 } // +1 because index count from 0
            if (data.paid) { data_tmp['paid'] = true }
            if (data.placement) { data_tmp['placement'] = data.placement }
            data_sent['data'] = JSON.stringify(data_tmp);
            // ---- user ----
        } else if (type === 'user') {
            data_sent['data'] = JSON.stringify({ "type": "user", "id": data.id });
            // ---- store ----
        } else if (type === 'store') {
            data_sent['data'] = JSON.stringify({ "type": "store", "id": data.id });
            // ---- category ----
        } else if (type === 'category') {
            data_sent['data'] = JSON.stringify({ "type":"category", "id": data.id });
            // ---- impression ----
        } else if (type === 'impression') {
            // console.log(data)
            $.each( data.post_impression, ( key, value ) => {
                let c_data = { "type": "post", "id": value.id, "current_index": value.current_index+1, "item_count": data.item_count, "item_per_page": data.item_per_page };
                if (value.paid) { c_data['paid'] = true; }
                if (value.placement) { c_data['placement'] = value.placement; }
                data_sent["data["+key+"]"] = JSON.stringify(c_data);
            });
            // ---- show contact on detail post ----
        } else if (type === 'resume') {
            $.each( data.post_impression, ( key, value ) => {
                // console.log('resume==',value)
                let c_data = { "type": "resume", "id": value.id, "current_index": value.current_index+1, "item_count": data.item_count, "item_per_page": data.item_per_page };
                // if (value.paid) { c_data['paid'] = true; }
                if (value.placement) { c_data['placement'] = value.placement; }
                data_sent["data["+key+"]"] = JSON.stringify(c_data);
            });
            // ---- show contact on detail post ----
        } else if (data.track_contact === 'resume') {
            // console.log(data)
            let c_data = { "type": "resume", "id": data.id, "item_count": data.item_count, "item_per_page": data.item_per_page ,"current_index": data.current_index+1, };
            // if (data.paid) { c_data['paid'] = true; }
            if (data.placement) { c_data['placement'] = data.placement; }
            data_sent['data'] = JSON.stringify(c_data);
            // ---- show contact on detail user ----
        }else if (data.track_contact === 'resumes') {
            // console.log(data)
            let c_data = { "type": "resume", "id": data.id };
            // if (data.paid) { c_data['paid'] = true; }
            if (data.placement) { c_data['placement'] = data.placement; }
            data_sent['data'] = JSON.stringify(c_data);
            // ---- show contact on detail user ----
        } else if (type === 'chat' || data.track_contact === 'detail_post') {
            let c_data = { "type": "post", "id": data.id };
            if (data.paid) { c_data['paid'] = true; }
            if (data.placement) { c_data['placement'] = data.placement; }
            data_sent['data'] = JSON.stringify(c_data);
            // ---- show contact on detail user ----
        } else if (data.track_contact === 'detail_user') {
            data_sent['data'] = JSON.stringify({ "type": data.user_role === 'user' ? 'user' : 'store', "id": data.id });
        }

        // -- do this $fetch can return data response back to parent class, else response undefined --
        try {
            const runtimeConfig = useRuntimeConfig();
            return await $fetch(runtimeConfig.public.VUE_APP_API_TRACKING, {
                method: 'POST',
                // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: new URLSearchParams(data_sent)
            }).then(res => {
                return { status: 200, data: res }
            });
        } catch (err) {
            return err.response; // cache error response from $fetch.
        }

    },
    // -- get Version --
    check_version() {
        var info = platform.parse(navigator.appVersion);
        /*console.log('======================');
        console.log(info.name);
        console.log(info.version);
        console.log(info.product);
        console.log(info.manufacturer);
        console.log(info.layout);
        console.log(info.description);
        console.log(navigator.appVersion);
        console.log(info.os);
        console.log(info.os.version);
        console.log(navigator.userAgent);
        console.log('======================');*/
        return info.os.version;
    },
    // -- get OS --
    check_os() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows/i.test(userAgent)) { return "windows"; }

        if (/android/i.test(userAgent)) { return "android"; }

        if (/iPad/.test(userAgent) && !window.MSStream) { return "ipad"; }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) { return "ios"; }

        return "other";
    },
    // --- /Visibility Tracking ---


    // -- get Version --
    check_agent_version() {
        let info = platform.parse(navigator.appVersion);
        // console.log('======================');
        // console.log(info.name);
        // console.log(info.version);
        // console.log(info.product);
        // console.log(info.manufacturer);
        // console.log(info.layout);
        // console.log(info.description);
        // console.log(navigator.appVersion);
        // console.log(info.os);
        // console.log(info.os.version);
        // console.log(navigator.userAgent);
        // console.log('======================');
        return info;
    },


    // ---- change some filed value in QUICK LOGIN ----
    change_quick_login_data(res_data) {
        let local_quick_login = process.server ? '' : (localStorage.getItem('quick_login') ? JSON.parse(localStorage.getItem('quick_login')) : []);
        for (let key in local_quick_login) {
            if (parseInt(local_quick_login[key].id) === parseInt(res_data.id)) {
                // --- replace to old data if exist ---
                if (res_data.username) { local_quick_login[key].username_log = res_data.username; }
                if (res_data.password) { local_quick_login[key].password_log = res_data.password; }
                if (res_data.name) { local_quick_login[key].name = res_data.name; }
                if (res_data.photo) {
                    if (local_quick_login[key].profile) {
                        local_quick_login[key].profile = res_data.photo;
                    } else {
                        local_quick_login[key]['profile'] = res_data.photo;
                    }
                } else {
                    local_quick_login[key].profile = '';
                }
                localStorage.setItem("quick_login", JSON.stringify(local_quick_login));
            }
        }
    },
    // ---- store data QUICK LOGIN from login or register form in to localstorage ----
    store_quick_login_data(password_log, data_quick) {
        let info_quick_login = '';
        let local_quick_login = process.server ? '' : (localStorage.getItem('quick_login') ? JSON.parse(localStorage.getItem('quick_login')) : []);
        if (local_quick_login.length > 0) {

            let check_exist = '';
            for (let key in local_quick_login) {
                if (parseInt(local_quick_login[key].id) === parseInt(data_quick.id)) { // check id is exist or not
                    // --- if exist not add new ---
                    check_exist = 'exist';

                    // --- replace to old data if exist ---
                    if (data_quick.username) { local_quick_login[key].username_log = data_quick.username; }
                    if (password_log) { local_quick_login[key].password_log = password_log; }
                    if (data_quick.name) { local_quick_login[key].name = data_quick.name; }
                    if (data_quick.photo) {
                        if (local_quick_login[key].profile) {
                            local_quick_login[key].profile = data_quick.photo.url;
                        } else {
                            local_quick_login[key]['profile'] = data_quick.photo.url;
                        }
                    } else {
                        local_quick_login[key].profile = '';
                    }
                    localStorage.setItem("quick_login", JSON.stringify(local_quick_login));
                    // console.log('--------prevent data----------')
                }
            }

            if (!check_exist) { // add only item not exist
                info_quick_login = {
                    id: data_quick.id,
                    username_log: data_quick.username,
                    password_log: password_log,
                    profile: data_quick.photo ? data_quick.photo.url : '',
                    name: data_quick.name,
                    type: 'login',
                }
                local_quick_login.push(info_quick_login);
                localStorage.setItem("quick_login", JSON.stringify(local_quick_login));
                // console.log('add more in array quick login');
            } else {
                // console.log('nothing to add');
            }

        } else {
            info_quick_login = {
                id: data_quick.id,
                username_log: data_quick.username,
                password_log: password_log,
                profile: data_quick.photo ? data_quick.photo.url : '',
                name: data_quick.name,
                type: 'login',
            }
            local_quick_login.push(info_quick_login);
            localStorage.setItem("quick_login", JSON.stringify(local_quick_login));
            // console.log('quick login empty');
        }

        // console.log(local_quick_login);
    },


    // ---- set params from another page to make some condition ----
    params_make_condition(type, data_params) {
        if (process.client) {
            let get_data = localStorage.getItem("params_con_page") ? JSON.parse(localStorage.getItem("params_con_page")) : {};
            get_data[type] = { type: type, d_params: data_params }
            localStorage.setItem("params_con_page", JSON.stringify(get_data));
        }
    },
    // ---- get params from another page to make som condition ----
    get_params_make_condition() {
        if (process.client) {
            return localStorage.getItem("params_con_page") ? JSON.parse(localStorage.getItem("params_con_page")) : '';
        }
    },
    // ---- clear params from another page that's make some condition ----
    clear_params_make_con(type) {
        if (process.client) {
            let get_par = localStorage.getItem("params_con_page") ? JSON.parse(localStorage.getItem("params_con_page")) : '';
            if (type && get_par) { // remove sub in parent
                get_par[type] = '';
                localStorage.setItem("params_con_page", JSON.stringify(get_par));

            } else { // remove parent
                localStorage.removeItem("params_con_page");
            }
        }
    },
    // ---- clean router name to short with out "___/ or ___en or ___km" ----
    clear_prefix_route_name(route_name) {
        return route_name ? route_name.split(/___\/|___km|___en|___default/).join("") : '';
    },
    // ---- get language cookies ----
    get_lang_cookie() {
        let cookie_lang = useCookie('lang'); // useCookie from nuxt3 document.
        return cookie_lang && cookie_lang._rawValue && cookie_lang._rawValue === 'km' ? 'km' : 'en';
    },




    // ---- Google SEO schema (Product) ----
    GL_SEO_product (url, id, title, price, description, condition, image, category,
                    brand, model, color, seller, year) {
        var data = { "@type": "Product", 'sku': id, 'name': title, 'url': url }

        if (category) data['category'] = category;

        if (brand) data['brand'] = { "@type": "Brand", "name": brand };

        if (model) data['model'] = model;

        if (description) data['description'] = description;

        if (image) data['image'] = image;

        if (year) data['releaseDate'] = year; // year of "car-year, motorcycle-year"

        if (color) data['color'] = color;

        var offers = {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": price ? price : '0',
            "availability": "https://schema.org/InStock",
            "priceValidUntil": this.increase_month_serverSide(3), // '2023-04-30', // date('Y-m-d', strtotime('+3 months')),
        }

        if (condition) data['itemCondition'] = condition == "new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition";
        if (seller) offers['seller'] = seller;

        data['offers'] = offers;

        return data;
    },
    // ---- Google SEO Schema (Seller) ----
    GL_SEO_seller (type, url, name, image=null, phone=null, email=null, address=null) {
        let data = { "@type": type, "name": name, "url": url };

        if (image) data['image'] = image;

        if (phone) data['telephone'] = phone;

        if (email) data['email'] = email;

        if (address) {
            let addr = { "@type": "PostalAddress" };
            addr['addressCountry'] = "Cambodia";
            if (address.province) addr['addressRegion'] = address.province;
            if (address.district) addr['addressLocality'] = address.district;
            if (address.address) addr['streetAddress'] = address.address;
            data['address'] = addr;
        }
        return data;
    },
    // ---- Google SEO Schema (Breadcrumb) ----
    GL_SEO_breadcrumb(items) {
        let values = [];
        for (const k in items) {
            let v = {
                "@type": "ListItem",
                "position": parseInt(k) + 1,
                "name": items[k].name,
            };
            if (items[k].link) { v['item'] = items[k].link; }
            values.push(v);
        }
        return { "@type": "BreadcrumbList", "itemListElement": values };
    },
    // ---- Google SEO Schema (job) ----
    GL_SEO_job(id, ad_url, title, post_date, category, ad_condition, name, pro_url, job_logo, ad_price, description, address, experience) {
        // Address
        let addr = '';
        if (address) {
            addr = { "@type": "PostalAddress", "addressCountry": "Cambodia" };
            if (address.province) addr['addressRegion'] = address.province;
            if (address.district) addr['addressLocality'] = address.district;
            if (address.address) addr['streetAddress'] = address.address;
        }
        // Job type
        let arr_job_type = {'full-time': 'FULL_TIME', 'part-time': 'PART_TIME', "contract": 'CONTRACTOR', 'internships': 'INTERN', 'volunteer': 'VOLUNTEER', 'freelance': 'PER_DIEM', 'other': 'OTHER'};
        for (const key in arr_job_type) {
            if (key === ad_condition) {
                ad_condition = arr_job_type[key];
            }
        }
        // job post date
        let p_date = post_date ? post_date.split(' ') : '';
        let job_date_post = p_date ? p_date[0] : '';

        let data = {
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "url": ad_url ? ad_url : '', // "https://www.khmer24.com/title-adid-1234567",
            "title": title ? title : "Unknown", // post title
            "description": description,
            "identifier": {
                "@type": "PropertyValue",
                "name": "Khmer24",
                "value": id, // "1234567" // id
            },
            "datePosted": job_date_post, // "2017-01-18", // posted or created date
            "validThrough": this.increase_month_serverSide(3), // date('Y-m-d', strtotime('+3 months')),
            // "jobLocationType": "TELECOMMUTE", // Category
            "employmentType": ad_condition ? ad_condition : 'OTHER', // Job Type (Full-Time, Part-Time,...)
            "applicantLocationRequirements": {
                "@type": "Country",
                "name": "Cambodia"
            },
            "hiringOrganization": {
                "@type": "Organization",
                "name": name ? name : "Unknown", // name of user or title store
                "sameAs": pro_url ? pro_url : '', // profile url
                "logo": job_logo ? job_logo : "https://www.khmer24.com/images/image-placeholder.png" // a photo of post, user photo or store logo
            },
            "jobLocation": {
                "@type": "Place",
                "address": addr,
                // "address": {
                //     "@type": "PostalAddress",
                //     "streetAddress": "1600 Amphitheatre Pkwy", // address
                //     "addressLocality": "", // District
                //     "addressRegion": "", // Province
                //     "addressCountry": "Cambodia"
                // }
            },
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": {
                    "@type": "QuantitativeValue",
                    "value": ad_price ? ad_price : '0',
                    "unitText": "MONTH"
                }
            }
        };
        // if (eduction) data['educationRequirements'] = { "@type": "EducationalOccupationalCredential", "credentialCategory": eduction}
        if (experience && experience > 0) {
            let exp = experience * 12; // convert year to month,
            data['experienceRequirements'] = { "@type": "OccupationalExperienceRequirements", "monthsOfExperience": exp }
        }
        return data;
    },
    // ---- Create full location for SEO ----
    Create_location(addr, lang, is_from) {
        let address = '';
        if (is_from === 'detail_user') {
            address = {
                'province': addr.location ? (lang === 'km' ? addr.location.km_name : addr.location.en_name) : '', // 'Phnom Penh',
                'district': addr.district ? (lang === 'km' ? addr.district.km_name : addr.district.en_name) : '', // 'Sen Sok',
                'address': addr.address ? addr.address : '', // '#48, Street 10m thmey, Phnom Penh, Cambodia'
            };
        } else {
            let str = addr && addr.en_name2 ? (lang === 'km' ? addr.km_name2 : addr.en_name2) : '';
            const split_loc = str ? str.split(",") : [];
            address = {
                'province': addr.km_name ? (lang === 'km' ? addr.km_name : addr.en_name) : '', // 'Phnom Penh',
                'district': split_loc[0], // 'Sen Sok',
                'address': addr.km_name3 ? (lang === 'km' ? addr.km_name3 : addr.en_name3) : '', // '#48, Street 10m thmey, Phnom Penh, Cambodia'
            };
        }
        return address;
    },
    // ---- increase three month from current date ----
    increase_month_serverSide(num_month_increase) {
        // const date = new Date();
        // let d = date.getDate();
        // let m = date.getMonth() + 1; // plus 1 bc JS month start from 0
        // let year = date.getFullYear();
        // let inc_m = m + num_month_increase; // add more three month.

        // let day = d <= 9 ? '0'+d : d;

        // let increase_months = '';
        // if (inc_m <= 9) {
        //     increase_months = '0'+inc_m;
        // } else if (inc_m <= 12) {
        //     increase_months = inc_m;
        // } else {
        //     // dynamic check months and increase year too
        //     let i = 1; let number_year = 0;
        //     while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
        //         if (inc_m > 12) {
        //             inc_m = inc_m - 12;
        //             number_year+=1; // increase 1 year
        //         } else if (inc_m <= 12) {
        //             increase_months = inc_m <= 9 ? '0'+inc_m : inc_m;
        //             i = 0; // break
        //         }
        //     }

        //     year = year+number_year
        // }
        // return `${year}-${increase_months}-${day}`; // ex: 2017-01-18;

        const date = new Date(); 
        date.setMonth(date.getMonth()+num_month_increase); 
        return date.getFullYear()+'-'+(date.getMonth()+1>9?date.getMonth()+1:'0'+(date.getMonth()+1))+'-'+(date.getDate()>9?date.getDate():'0'+date.getDate()) 


        /*const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1; // plus 1 bc JS month start from 0
        let year = date.getFullYear();

        let increase_months = month + num_month_increase; // add more three month.
        return `${year}-${increase_months}-${day}`; // ex: 2017-01-18;*/
    },
    // ---- Loop get spec value ----
    get_spec_value(obj_spec, specific_field) {
        let spec = '';
        if (obj_spec) {
            for (let key in obj_spec) {
                if (obj_spec[key].field === specific_field) { // check field is the same.
                    spec = obj_spec[key].value_slug; // use key "value_slug", not key "value".

                    // check only experience, must to convert value to int
                    if (specific_field === 'experience') {
                        spec = spec ? parseInt(spec) : '';
                    }
                }
            }
        }
        return spec;
    },
    /*// ---- clean text to uppercase and change - to _ of text with Uppercase ----
    text_uppercase(text) {
        return text.replace("-", "_").toUpperCase();
    },*/



    // --- if need to change format Date ---
    check_date_ago(date, with_year) {
        return this.timeAgo(date, with_year);
    },
    // --- minute ago with full date and year ( only from notification ) ---
    check_date_ago_with_year(date) {
        return this.timeAgo(date, 'get_year');
    },
    // --- simple date ---
    simple_date_format(date) {
        return this.timeAgo(date, 'get_year');
    },



    // ---- convert date Time ago ----
    timeAgo (date, have_year) {
        // let mameLongMonth = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'); // long month name.
        let mameShortMonth = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'); // short month name.

        const format_date = new Date(date);
        const seconds = Math.floor((new Date() - format_date) / 1000); // convert date to second.

        let interval = Math.floor(seconds / 31536000); // is in year
        if (interval >= 1) {
            let date_date = new Date(format_date);
            let year = date_date.getFullYear();
            let month = date_date.getMonth(); // month start from 0, so mush to +1 to get the right month.
            let day = date_date.getDate();
            if (parseInt(day) < 10) day = '0'+day;
            // let hh = date_date.getHours(); let mm = date_date.getMinutes();  let ss = date_date.getSeconds();
            if (have_year) {
                return day+', '+mameShortMonth[month]+' '+year; // years ago
            } else {
                return mameShortMonth[month]+' '+day+', '+year; // years ago
            }
        }

        /*interval = Math.floor(seconds / 2592000); // is month
        if (interval >= 1) {
            return interval + ' months ago';
        }*/

        interval = Math.floor(seconds / 604800); // is in week
        if (interval >= 1) {
            // convert to full date with out show year
            let date_date = new Date(format_date);
            let month = date_date.getMonth(); // month start from 0, so mush to +1 to get the right month.
            let year = date_date.getFullYear();
            let day = date_date.getDate();
            if (parseInt(day) < 10) day = '0'+day;
            // let hh = date_date.getHours(); let mm = date_date.getMinutes();  let ss = date_date.getSeconds();
            if (have_year) {
                return day+', '+mameShortMonth[month]+' '+year;
            } else {
                return mameShortMonth[month]+' '+day;
            }
        }

        interval = Math.floor(seconds / 86400); // is in day
        if (interval >= 1) {
            return interval + 'd'; // "days ago"
        }

        interval = Math.floor(seconds / 3600); // is in hours
        if (interval >= 1) {
            return interval + 'h'; // "hours ago"
        }

        interval = Math.floor(seconds / 60); // is in minute
        if (interval >= 1) {
            return interval + 'm'; // "minutes ago"
        }

        return 'Just now';
    },
    check_date_agos(date, with_year) {
        return this.timeAgos(date, with_year);
    },
    timeAgos (date, have_year) {
        // let mameLongMonth = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'); // long month name.
        let mameShortMonth = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'); // short month name.

        const format_date = new Date(date);
        const seconds = Math.floor((new Date() - format_date) / 1000); // convert date to second.

        let interval = Math.floor(seconds / 31536000); // is in year
        // if (interval >= 1) {
            let date_date = new Date(format_date);
            let year = date_date.getFullYear();
            let month = date_date.getMonth(); // month start from 0, so mush to +1 to get the right month.
            let day = date_date.getDate();
            if (parseInt(day) < 10) day = '0'+day;
            // let hh = date_date.getHours(); let mm = date_date.getMinutes();  let ss = date_date.getSeconds();
            if (have_year) {
                return day+', '+mameShortMonth[month]+' '+year; // years ago
            } else {
                return year+'-'+mameShortMonth[month]; // years ago
            }
        // }

        /*interval = Math.floor(seconds / 2592000); // is month
        if (interval >= 1) {
            return interval + ' months ago';
        }*/

        // interval = Math.floor(seconds / 604800); // is in week
        // if (interval >= 1) {
        //     // convert to full date with out show year
        //     let date_date = new Date(format_date);
        //     let month = date_date.getMonth(); // month start from 0, so mush to +1 to get the right month.
        //     let year = date_date.getFullYear();
        //     let day = date_date.getDate();
        //     if (parseInt(day) < 10) day = '0'+day;
        //     // let hh = date_date.getHours(); let mm = date_date.getMinutes();  let ss = date_date.getSeconds();
        //     if (have_year) {
        //         return day+', '+mameShortMonth[month]+' '+year;
        //     } else {
        //         // return mameShortMonth[month]+' '+day;
        //         return year+'-'+mameShortMonth[month]; // years ago
        //     }
        // }

        // interval = Math.floor(seconds / 86400); // is in day
        // if (interval >= 1) {
        //     return interval + 'd'; // "days ago"
        // }

        // interval = Math.floor(seconds / 3600); // is in hours
        // if (interval >= 1) {
        //     return interval + 'h'; // "hours ago"
        // }

        // interval = Math.floor(seconds / 60); // is in minute
        // if (interval >= 1) {
        //     return interval + 'm'; // "minutes ago"
        // }

    },


    check_date_agos1(date, with_year) {
        return this.timeAgos1(date, with_year);
    },
    timeAgos1 (date, have_year) {
        // let mameLongMonth = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'); // long month name.
        let mameShortMonth = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'); // short month name.

        const format_date = new Date(date);
        const seconds = Math.floor((new Date() - format_date) / 1000); // convert date to second.

        let interval = Math.floor(seconds / 31536000); // is in year
            let date_date = new Date(format_date);
            let year = date_date.getFullYear();
            let month = date_date.getMonth(); // month start from 0, so mush to +1 to get the right month.
            let day = date_date.getDate();
            if (parseInt(day) < 10) day = '0'+day;
            // let hh = date_date.getHours(); let mm = date_date.getMinutes();  let ss = date_date.getSeconds();
            // if (have_year) {
            //     return day+', '+mameShortMonth[month]+' '+year; // years ago
            // } else {
                return mameShortMonth[month]+','+day+' '+year; // years ago
            // }
    },

    check_date_agos2(date, with_year) {
        return this.timeAgos2(date, with_year);
    },
    timeAgos2 (date, have_year) {
        const format_date = new Date(date);
            let date_date = new Date(format_date);
            let year = date_date.getFullYear();
            let month = date_date.getMonth(); // month start from 0, so mush to +1 to get the right month.
            let day = date_date.getDate();
            if (parseInt(day) < 10) day = '0'+day;
            if((month+1) <10){
                return day+', '+'0'+(1+month)+' '+year; // years ago
            }else{
                return day+', '+(1+month)+' '+year; // years ago
            }
    },
    // ---- clean date only ----
    Clean_date_only(date) {
        let mameShortMonth = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'); // short month name.
        let cl_date = date ? new Date(date) : new Date();
        let day = cl_date.getDate();
        let month = cl_date.getMonth();
        let year = cl_date.getFullYear();
        if (parseInt(day) < 10) day = '0'+day;
        return day+'-'+mameShortMonth[month]+'-'+year; // ex: 15-Jan-2023
    },
    // ---- convert date to timeStamp ----
    Date_To_Timestamp(strDate, amount, type_amount) {
        const date = strDate ? new Date(strDate) : new Date();      // have date || current date.
        let get_timeStamp = Math.floor(date.getTime() / 1000);   // need to convert milliseconds to seconds, divide by 1000.
        if (amount && type_amount === 'seconds') {
            get_timeStamp += amount;  // add seconds more if exist.
        }
        return get_timeStamp;

        // -- below is the example date to timestamp --
        // const strDate = '2022-04-26';
        // const date = new Date(strDate);

        // ✅ Get timestamp in Milliseconds
        // const timestamp = date.getTime();
        // console.log(timestamp); // 👉️ 1650931200000

        // ✅ If you need to convert milliseconds to seconds
        // divide by 1000
        // const timestampSeconds = Math.floor(date.getTime() / 1000);
        // console.log(timestampSeconds); // 👉️ 1650931200
    },
    // ---- convert timeStamp to date ----
    Timestamp_To_Date(strDate) {
        return new Date(strDate*1000); // need to convert seconds to milliseconds, multiple by 1000.
    },
}