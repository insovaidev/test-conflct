<template>
  <div>
    <p>details post</p>
    <button @click="share(dataPostDetialKhmer24)">Shere</button>
    <img :src="dataPostDetialKhmer24?.meta?.image ?? ''" alt="">
    <pre>{{ dataPostDetialKhmer24?.meta ?? ''}}</pre>

  </div>
</template>

<script setup>
const route = useRoute()
const dataPostDetialKhmer24 = useState('dataPostDetialKhmer24', () => '')

const baseApiUrl = `https://api-posts.khmer24.com/`;

useHead({
  title: dataPostDetialKhmer24.value?.meta?.title ?? '',
  meta: [
    {
      name: "keywords",
      content: dataPostDetialKhmer24.value?.meta?.keyword ?? "",
    },
    {
      name: "description",
      content: dataPostDetialKhmer24.value?.meta?.description ?? "",
    },
    {
      property: "og:title",
      content: dataPostDetialKhmer24.value?.meta?.title ?? "",
    },
    {
      property: "fb:app_id",
      content: dataPostDetialKhmer24.value?.meta?.fb?.id ?? "",
    },
    {
      property: "og:type",
      content: dataPostDetialKhmer24.value?.meta?.fb?.type ?? "",
    },
    {
      property: "og:site_name",
      content: dataPostDetialKhmer24.value?.meta?.site_name ?? "",
    },
    {
      property: "og:url",
      content: dataPostDetialKhmer24.value?.meta?.url ?? "",
    },
    {
      property: "og:image",
      content: dataPostDetialKhmer24.value?.meta?.image ?? "",
    },
    { property: "og:image:width", content: "600" },
    { property: "og:image:height", content: "600" },
    {
      property: "og:description",
      content: dataPostDetialKhmer24.value?.meta?.description ?? "",
    },
    {
      property: "product:price:amount",
      content: dataPostDetialKhmer24.value?.meta?.price?.toString() ?? "",
    },
    {
      property: "product:price:currency",
      content: dataPostDetialKhmer24.value?.meta?.currency ?? "",
    },
    { name: "twitter:card", content: "app" },
    { name: "twitter:site", content: "@nytimesbits" },
  ],
});

const id = route.params.id
const title = route.params.title


const { data: dataPostRespone } = await useFetch(`${baseApiUrl}feed/${id}?functions=&meta=true&fields=link`)

dataPostDetialKhmer24.value = dataPostRespone.value

const share = async (post) => {
  if (navigator.share) {
    try {
      const dataShare = {
        title: post.data.title || "",
        text: "Check out this amazing content!",
        url: post.data.short_link || "",
      };

      console.log(dataShare)

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