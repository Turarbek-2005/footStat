<script setup lang="ts">
import { useShop } from "~/store/shop.store";

const shop = useShop();

onBeforeMount(async () => {
  await shop.fetchProducts();
});

async function get() {
  console.log(shop.products.value);
}
</script>

<template>
  <div class="tw-container">
    <!-- <ChampionsLeague /> -->
  </div>
</template>
<style scoped></style>
