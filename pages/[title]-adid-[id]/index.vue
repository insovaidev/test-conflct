<template>
  <div>
    <p>details post</p>
    <pre>{{ dataPostDetial }}</pre>
  </div>
</template>

<script setup>
const route = useRoute()
const dataPostDetial = ref('');
const baseApiUrl = `http://localhost:1234/`

useHead({
  title: dataPostDetial.value ? dataPostDetial.value.meta.title : '',
  meta: [
    {
      name: "keywords",
      content: dataPostDetial.value ? dataPostDetial.value.meta.keyword : "",
    },
    {
      name: "description",
      content: dataPostDetial.value ? dataPostDetial.value.meta.description : "",
    },
    {
      property: "og:title",
      content: dataPostDetial.value ? dataPostDetial.value.meta.title : "",
    },
    {
      property: "fb:app_id",
      content: dataPostDetial.value ? dataPostDetial.value.meta.fb.id : "",
    },
    {
      property: "og:type",
      content: dataPostDetial.value ? dataPostDetial.value.meta.fb.type : "",
    },
    {
      property: "og:site_name",
      content: dataPostDetial.value ? dataPostDetial.value.meta.site_name : "",
    },
    {
      property: "og:url",
      content: dataPostDetial.value ? dataPostDetial.value.meta.url : "",
    },
    {
      property: "og:image",
      content: dataPostDetial.value ? dataPostDetial.value.meta.image : "",
    },
    { property: "og:image:width", content: "600" },
    { property: "og:image:height", content: "600" },
    {
      property: "og:description",
      content: dataPostDetial.value ? dataPostDetial.value.meta.description : "",
    },
    {
      property: "product:price:amount",
      content:
        dataPostDetial.value && dataPostDetial.value.meta.price
          ? dataPostDetial.value.meta.price.toString()
          : "",
    },
    {
      property: "product:price:currency",
      content: dataPostDetial.value ? dataPostDetial.value.meta.currency : "",
    },
    { name: "twitter:card", content: "app" },
    { name: "twitter:site", content: "@nytimesbits" },
  ],
});

const id = route.params.id
const title = route.params.title

const getPostDetail = async () => {
   try {
      const res = await $fetch(`http://localhost:1234/api/posts/${id}`)
      if (res) {
        dataPostDetial.value = res
      }
   } catch (error) {
      console.error(error)
   }
}


getPostDetail()

</script>