<template>
  <div>
    <p>details post</p>
    <button @click="share(dataPostDetial)">Shere</button>
    <img :src="dataPostDetial?.meta?.image ?? ''" alt="">
    <img src="https://images.khmer24.co/24-09-04/scoopy-i-015--775039172541923673824722-b.jpg" alt="">
    <pre>{{ dataPostDetial?.meta ?? ''}}</pre>

  </div>
</template>

<script setup>

const route = useRoute()


onMounted(() => {
  
  console.log()
})

const dataPostDetial = useState('dataPostDetial', () => '')
// const baseApiUrl = `http://localhost:1234/`
const baseApiUrl = `https://test-post-share-api.onrender.com/`

// useHead({
//   title: dataPostDetial.value?.meta?.title ?? '',
//   meta: [
//     {
//       name: "keywords",
//       content: dataPostDetial.value?.meta?.keyword ?? "",
//     },
//     {
//       name: "description",
//       content: dataPostDetial.value?.meta?.description ?? "",
//     },
//     {
//       property: "og:title",
//       content: dataPostDetial.value?.meta?.title ?? "",
//     },
//     {
//       property: "fb:app_id",
//       content: dataPostDetial.value?.meta?.fb?.id ?? "",
//     },
//     {
//       property: "og:type",
//       content: dataPostDetial.value?.meta?.fb?.type ?? "",
//     },
//     {
//       property: "og:site_name",
//       content: dataPostDetial.value?.meta?.site_name ?? "",
//     },
//     {
//       property: "og:url",
//       content: dataPostDetial.value?.meta?.url ?? "",
//     },
//     {
//       property: "og:image",
//       content: dataPostDetial.value?.meta?.image ?? "",
//     },
//     { property: "og:image:width", content: "600" },
//     { property: "og:image:height", content: "600" },
//     {
//       property: "og:description",
//       content: dataPostDetial.value?.meta?.description ?? "",
//     },
//     {
//       property: "product:price:amount",
//       content: dataPostDetial.value?.meta?.price?.toString() ?? "",
//     },
//     {
//       property: "product:price:currency",
//       content: dataPostDetial.value?.meta?.currency ?? "",
//     },
//      // Twitter Card Tags
//     { hid: 't-type', name: 'twitter:card', content: 'summary_large_image' },
//     { name: "twitter:card", content: "summary_large_image" }, // This ensures a large image preview
//     { name: "twitter:title", content: dataPostDetial.value?.meta?.title ?? "" },
//     { name: "twitter:description", content: dataPostDetial.value?.meta?.description ?? "" },
//     { name: "twitter:image", content: dataPostDetial.value?.meta?.image ?? "" }, // Make sure this URL is correct
//     { name: "twitter:site", content: "@in_sovai" }, // Replace with your own Twitter handle
//     { name: "twitter:creator", content: "@yourTwitterHandle" }, // Optional, replace with your Twitter handle
//   ],
// });

useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: `${dataPostDetial.value?.meta?.image ?? ""}`,
  ogUrl: `${dataPostDetial.value?.meta?.url ?? ""}`, 
  twitterTitle: 'My Amazing Site',
  twitterDescription: 'This is my amazing site, let me tell you all about it',
  twitterImage:  `${dataPostDetial.value?.meta?.image ?? ""}`,
  twitterCard: 'summary',
})



const id = route.params.id
const title = route.params.title

const { data: dataPostRespone } = await useFetch(`${baseApiUrl}api/posts/${id}`)

dataPostDetial.value = dataPostRespone.value

console.log('serve side', dataPostDetial.value.meta)

// const getPostDetail = async () => {
//    try {
//       const res = await $fetch(`${baseApiUrl}api/posts/${id}`)
//       if (res) {
//         dataPostDetial.value = res  
//       }
//    } catch (error) {
//       console.error(error)
//    }
// }

// getPostDetail()


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

</script>