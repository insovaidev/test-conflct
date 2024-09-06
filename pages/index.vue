<template>
   <div class="p-4">
      <div @click="toDetail(post.data.title, post.data.id)" :key="post" v-for="post in dataPosts" class="list_post">
         <p>{{ post.data.id }}</p>
         <p>{{ post.data.title }}</p>
      </div>
   </div>
</template>

<script setup>
const router = useRouter()
const dataPosts = ref([])

const getPosts = async () => {
   try {
      const res = await $fetch(`http://localhost:1234/api/posts`)
      if (res) {
         dataPosts.value = res
      }
   } catch (error) {
      console.error(error)
   }
}

const toDetail = (title, id) => {
   router.push({ name: 'title-adid-id', params: { title: title, id: id }})
}

onMounted(() => {
   getPosts()
   console.log("Console me")
})

</script>

<style >


.list_post {
   border: 1px solid lightblue;
   padding: 8px;
   margin-bottom: 8px;
   border-radius: 8px;
}

</style>
