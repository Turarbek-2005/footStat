<script setup lang="ts">
const store = useFoot();

onBeforeMount(async () => {
  await store.fetchProducts("CL/standings");
});
</script>

<template>
  <div class="tw-container"></div>
</template>
<style scoped></style>
