   <template>
  <div class="p-4">
    <div
      @click="toDetail(post.data.title, post.data.id)"
      :key="post"
      v-for="post in dataPosts"
      class="list_post"
    >
      <p>{{ post.data.id }}</p>
      <p>{{ post.data.title }}</p>
      <button @click="share(post)">Shere</button>
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
  router.push({ name: "title-adid-id", params: { title: title, id: id } });
};

const share = async (post) => {
  if (navigator.share) {
    try {
      const dataShare = {
        title: post.data.title ?? "",
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

onMounted(() => {
  getPosts();
  console.log("Console me");
});
</script>

   <style >
.list_post {
  border: 1px solid lightblue;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
}
</style>
