<template>
    <div>
        <div class="mt_80 min_h">
            <div class="d-flex flex-wrap w-100">
                <div class="thumbnail">
                    <img :src="empty_img_post" alt="load-image" height="100%" width="80%">
                    <div style="width: 20%;">
                        test
                    </div>
                </div>
                <div class="w_30 ms-auto">
                    <div class="bg-white w-100">
                        <div class="dt-p-user d-flex align-items-center">
                            <img src="/icon/user-icon.png" alt="user" height="60px" width="60px" style="border-radius: 50%;margin-left: 10px;">
                            <div class="ms-2">
                                <b class="text-white">Username</b>
                                <div class="text-user">Online Now</div>
                                <div class="text-user">Show all ad from this user</div>
                            </div>
                        </div>
                        <div class="p-3">
                            phone
                        </div>
                    </div>
                    <div class="safty mt-3">
                        <div class="align_div_center">
                            <p class="d_title_warning line_height_1_2">
                                <img v-bind:src="version+'img/warranty.png'" alt="warning" class="icon d_img_warning">
                                ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ <br> Safety Tips for Buyers
                            </p>
                        </div>
                        <div class="d_margin_left_detail">
                            <span class="d_color_des_detail position_absolute d_span_safety">1. </span>
                            <div class="text-dark d_font_size_detail">
                                <p class="m-0">មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ <br> Do note sent money before receiving the goods</p>
                            </div>
                        </div>
                        <div class="d_margin_left_detail">
                            <span class="d_color_des_detail position_absolute d_span_safety">2. </span>
                            <div class="text-dark d_font_size_detail">
                                <p class="m-0">សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ <br> Check the item before you buy</p>
                            </div>
                        </div>
                        <div class="d_margin_left_detail">
                            <span class="d_color_des_detail position_absolute d_span_safety">3. </span>
                            <div class="text-dark d_font_size_detail">
                                <p class="m-0">បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ <br> Payment ofter receiving the goods</p>
                            </div>
                        </div>
                        <div class="d_margin_left_detail">
                            <span class="d_color_des_detail position_absolute d_span_safety">4. </span>
                            <div class="text-dark d_font_size_detail">
                                <p class="m-0">ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព <br> Meet the seller at a safe location</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-relate bg-white w-100 mt-3">
                POST
            </div>
        </div>
    </div>
</template>

<script setup>
const empty_img_loading = ref('/icon/img-loader.gif');
const empty_img_post = ref("/icon/empty_post.png");
const { public:config } = useRuntimeConfig(); 
const version = config.LIBRARY_VERSION
</script>

<!-- <style>
.thumbnail{
    width: 68%;
    background: white;
    height: 500px;
    position: relative;
    display: flex;
}
.w_30{
    width: 30%;
    position: relative;
}
.dt-p-user{
    background: rgb(0, 113, 189);
    width: 100%;
    height: 80px;
    border-radius: 5px 5px 0px 0px;
}
.safty{
    margin-top: 20px;
    background-color: #fffbf6;
    border: 1px solid #fcd8c1;
    border-radius: 5px;
    padding: 10px 15px;
}
.text-user{
    font-size: 13px;
    color: white;
}
</style> -->