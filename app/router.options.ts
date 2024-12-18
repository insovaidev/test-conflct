
import type { RouterConfig } from "@nuxt/schema";
import helper from "~/helper";

let check_scroll = 0; // if 0 must allow to scroll top,

export default <RouterConfig> {
    scrollBehavior(to, from, savedPosition) {
        // --- clean route name with prefix ---
        let to_n = helper.clear_prefix_route_name(to.name); // clean prefix to name.
        let from_n = helper.clear_prefix_route_name(from.name); // clean prefix from name.
        let route_name = ['index', 'username', 'username.html', 'search', 'c-slugCategory', 'account-resume', 'apply-job-id', 'all-ads']

        setTimeout(() => {
            if (savedPosition) { // when click back
                if (check_scroll > 0) {
                    window.scrollTo({top: savedPosition.top});
                    if (route_name.includes(to_n)) {
                        setTimeout(() => {
                            window.scrollTo({top: savedPosition.top});
                        },100);
                    }
                } else {
                    window.scrollTo({left: 0, top: 0});
                }
            } else { // when click open new page
                if (to_n === from_n && (to_n === 'index' || to_n === 'account' || to_n === 'store' || (to_n === 'username' && Object.entries(to.query).length > 0))) {
                } else {
                    check_scroll++;
                    window.scrollTo({left: 0, top: 0});
                }
            }
        },300);
    }
}