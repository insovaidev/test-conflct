import helper from "~/helper";

export default defineNuxtRouteMiddleware(async (to, from) => {

    // -- check user is login or not and prevent client change url --
    let prevent_not_login = [
        "account", "chats", "post", "notification", "account-job-applications", 
        "apply-job-id", "account-membership", "account-subscriptions", "account-subscriptions-id", "orders-id", 
        "premium-account", "premium-account-category","premium-store", "premium-store-category", "premium-ad-category", 
        "insight-id", "account-billing-addresses", "account-billing-addresses-add", "account-billing-addresses-edit", "checkout", "account-resume-summary",
        "setting-change-password", "account-store-id", "setting-change-username", "account-resume-preferences", "account-resume-personal_details", "account-resume-references", "account-resume-references-id",
        "account-resume-skills", "account-resume-skills-id", "account-resume-educations", "account-resume-educations-id", "account-resume-languages", "account-resume-languages-id"
    ];
    let is_login = ["auth", "register", "login", "forget-password", "auth-login", "auth-register", "auth-forget-password", "auth-confirm-code", "auth-set-new-password"];
    let page_name = helper.clear_prefix_route_name(to.name); // clean prefix to name.

    // -- work both server_side AND client_side (localstorage work only client_side) --
    let auth_user = useCookie('auth_user'); // useCookie from nuxt3 document.
    let token = auth_user && auth_user._rawValue && auth_user._rawValue.tokens ? 'has_auth' : '';

    const localePath = useLocalePath();

    // ---> have auth ( -1 not found in array ) <---
    if (token) {
        // console.log('1')
        if (is_login.indexOf(page_name) !== -1) {
            // console.log('===> 1.1')
            // return navigateTo({ path: '/' });
            return navigateTo(localePath('/'));
        }
    // ---> un auth <---
    } else {
        // console.log('2')
        if (prevent_not_login.indexOf(page_name) !== -1) {
            // console.log('===> 2.2')
            // return navigateTo({ name: 'auth' });
            return navigateTo(localePath({ name: 'auth' }));
        }

    }
})