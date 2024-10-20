<script setup lang="ts">
const shop = useShop();

onBeforeMount(async () => {
  await shop.fetchProducts("CL/standings");
  console.log(shop.products.value);
});
</script>

<template>
  <div class="tw-container"></div>
</template>
<style scoped></style>
