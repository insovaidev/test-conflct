<template>
  <Component_Form_Branches />
</template>

<script setup>
    import Component_Form_Branches from "/components/branches/Form_branches_cpn";
    // definePageMeta({ middleware: "auth" }); // use layout dont have bottom nav bar check auth.
    definePageMeta( {layout: "custom", middleware: "auth"} );
</script>
