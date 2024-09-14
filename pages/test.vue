<template>
  <div>
   <input type="search">
  </div>
</template>


<script setup>


function testObjectEvent() {
  
}


onMounted(() => {
   if(process.client) {
      testObjectEvent()
      console.log(window)
   }
})
</script>
