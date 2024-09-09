<template>
  <div class="p-4">
    <div :key="post" v-for="post in dataPosts" class="list_post">
      <div
        @click="toDetail(post.data.title, post.data.id)"
        class="border-[1px] rounded-md mb-2 p-2"
      >
        <p>{{ post.data.id }}</p>
        <p>{{ post.data.title }}</p>
      </div>
      <button @click="share(post)">Shere</button>
    </div>
  </div>
</template>
 
    <script setup>
const baseApiUrl = `https://api-posts.khmer24.com/`;
const router = useRouter();
const dataPosts = ref([]);
const { isDesktop: isDesktopUseDevice, isMobile } = useDevice() 
const screenNavigateShare = ref(false) 
let resultCheck = false

const getPosts = async () => {
  try {
    const res = await $fetch(`${baseApiUrl}feed?fields=link&meta=true`);
    if (res) {
      dataPosts.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const toDetail = (title, id) => {
  router.push({ name: "khmer24-title-adid-id", params: { title: title, id: id } });
};

const share = async (post) => {

  await checkScreenUserAgent()
  
  if (resultCheck) {
    if (navigator.share) {
      try {
        const dataShare = {
          title: post.data.title || "",
          text: " Check out this amazing content! ",
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

  } else {
    alert('Show desktop Modal!')
  }
};


async function checkScreenUserAgent() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  const userAgent = navigator.userAgent

  toMatch.forEach((ele) => {
    if (userAgent.match(ele)) return resultCheck = true
  })
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
 