<template>
  <div class="p-4">
    <pre class="absolute bg-white">{{ supportedPorperties }}</pre>
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
const baseApiUrl = `https://test-posts.khmer24.com/`;
const router = useRouter();
const dataPosts = ref([]);
const { isDesktop: isDesktopUseDevice, isMobile } = useDevice() 
const screenNavigateShare = ref(false) 
let resultCheck = false
const errorShare = ref()
const supportedPorperties = ref('')

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

const share1 = async (post) => {
  let title = post.data.title || ""
  let text = "Best selling website in cambo!"
  let url = post.data.short_link || ""

  await checkScreenUserAgent()

  if (resultCheck) {
    if (navigator.canShare) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url
        });
        console.log("Content shared successfully!");
      
      } catch (error) {
        alert("Error sharing:", error);
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

const share = (data) => {

  let url = data.data.short_link.replace('https://www.khmer24.com', 'https://m.khmer24.com');
  // Data to share
  const shareData = {
    title: data.data.title + " Cambodia on Khmer24.com ",
    // text: data.data.title,
    url: url,
  };



  // Check if the browser supports sharing some or all of these properties
  if (navigator.canShare) {
    const supported = {};

    // Check for each property individually
    if (navigator.canShare({ title: shareData.title })) {
      supported.title = shareData.title;
    }

    if (navigator.canShare({ text: shareData.text })) {
      supported.text = shareData.text;
    }

    if (navigator.canShare({ url: shareData.url })) {
      supported.url = shareData.url;
    }

    // This is useful for debugging or displaying which properties are supported
    supportedPorperties.value = supported;

    // Share only if at least one supported property is present
    if (Object.keys(supported).length > 0) {
      navigator.share(shareData).then(() => {
        console.log('Data shared successfully!');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      console.log('No supported share properties.');
    }
  } else {
    console.log('Web Share API not supported.');
  }
};


onMounted(() => {
  checkScreenUserAgent()
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
 