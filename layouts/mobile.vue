<template>
   <div>
      <nav>Mobile Header</nav>
      <div class="mobile-view">
         <slot />
      </div>
   </div>
</template>

<style scoped>
.mobile-view {
   padding: 1rem;
   gap: 1rem;
   display: flex;
   flex-direction: column;
}

</style>