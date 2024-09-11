   <template>
  <div class="p-4">
    <div
      
      :key="post"
      v-for="post in dataPosts"
      class="list_post"
    >
    <div @click="toDetail(post.data.title, post.data.id)" class="border-[1px] rounded-md mb-2 p-2">
      <p>{{ post.data.id }}</p>
      <p>{{ post.data.title }}</p>
    </div>
    <div class="gap-3">
      <button class="border-[1px] border-gray-500 rounded-md px-3 py-1" @click="share(post)">Shere</button>
      <button  class="border-[1px] border-gray-500 rounded-md px-3 py-1" @click="shareToX(post.data.short_link)">shareToX</button>
      <button class="border-[1px] border-gray-500 rounded-md px-3 py-1" @click="shareLinkToFacebook(post.data.short_link)">shareLinkToFacebook</button>
    </div>
    </div>
  </div>
</template>

   <script setup>
const baseApiUrl = `https://test-post-share-api.onrender.com/`;
const router = useRouter();
const dataPosts = ref([]);

const getPosts = async () => {
  try {
    const res = await $fetch(`${baseApiUrl}api/posts`);
    if (res) {
      dataPosts.value = res;
    }
  } catch (error) {
    console.error(error);
  }
};

const toDetail = (title, id) => {
  router.push({ name: "post-adid-id", params: { id: id } });
};

const share = async (post) => {
  if (navigator.share) {
    try {
      const dataShare = {
        title: post.data.title || "",
        text: "Check out this amazing content!",
        url: post.data.short_link || "",
      };

      await navigator.share({
        ...dataShare,
      });
      console.log("Content shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Sharing not supported in your browser");
  }
};

const shareToX = (uri) => {
  try {
    if (window.navigator.onLine) {
      let url = uri
      window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(''+url+''),'facebook-share-dialog','width=626,height=436');
      return false;
    } else {
      return $('#modal_show_statu_error_connection').modal('show');
    }
  } catch (error) {
    
  }
} 


const shareLinkToFacebook = (uri) => {
  try {
    if (window.navigator.onLine) {
      let url = uri
      window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(''+url+''),'facebook-share-dialog','width=626,height=436');
      return false;
  } else {
      return $('#modal_show_status_error_connection').modal('show');
  }
  } catch (error) {
    
  }
} 

onMounted(() => {
  getPosts();
  console.log("Console me");
});
</script>

   <style >
.list_post {
  position: relative;
  border: 1px solid lightblue;
  padding: 8px;
  margin-bottom: 3rem;
  border-radius: 8px;
}
</style>
