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
  title: dataPostDetial.value ? dataPostDetial.value.title : '',
  meta: [
    {
      name: "keywords",
      content: dataPostDetial.value ? dataPostDetial.value.keyword : "",
    },
    {
      name: "description",
      content: dataPostDetial.value ? dataPostDetial.value.description : "",
    },
    {
      property: "og:title",
      content: dataPostDetial.value ? dataPostDetial.value.title : "",
    },
    {
      property: "fb:app_id",
      content: dataPostDetial.value ? dataPostDetial.value.fb.id : "",
    },
    {
      property: "og:type",
      content: dataPostDetial.value ? dataPostDetial.value.fb.type : "",
    },
    {
      property: "og:site_name",
      content: dataPostDetial.value ? dataPostDetial.value.site_name : "",
    },
    {
      property: "og:url",
      content: dataPostDetial.value ? dataPostDetial.value.url : "",
    },
    {
      property: "og:image",
      content: dataPostDetial.value ? dataPostDetial.value.image : "",
    },
    { property: "og:image:width", content: "600" },
    { property: "og:image:height", content: "600" },
    {
      property: "og:description",
      content: dataPostDetial.value ? dataPostDetial.value.description : "",
    },
    {
      property: "product:price:amount",
      content:
        dataPostDetial.value && dataPostDetial.value.price
          ? dataPostDetial.value.price.toString()
          : "",
    },
    {
      property: "product:price:currency",
      content: dataPostDetial.value ? dataPostDetial.value.currency : "",
    },
    { name: "twitter:card", content: "app" },
    { name: "twitter:site", content: "@nytimesbits" },
  ],
});

const id = route.params.id
const title = route.params.title


const { data: dataRespone } = useFetch(`${baseApiUrl}api/posts/${id}`)

if (dataRespone.value) {
   dataPostDetial.value = dataRespone.value
}

</script>