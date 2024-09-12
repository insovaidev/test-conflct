<template>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <div>
      <nav>Desktop Header</nav>
      <div class="desktop-view">
         <slot />
      </div>
   </div>
</template>

<style scoped>
.desktop-view {
   padding: 1rem;
   gap: 1rem;
   display: grid;
   /* Define 4 equal columns */
   grid-template-columns: repeat(4, 1fr);
}
</style>
