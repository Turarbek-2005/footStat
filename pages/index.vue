<script setup lang="ts">
import { useTheme } from "vuetify";
import { useShop } from "~/store/shop.store";

const shop = useShop();

onBeforeMount(async () => {
  await shop.fetchProducts();
});

const theme = useTheme();

async function get() {
  // await shop.fetchProducts();
  console.log(shop.products.value);
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <div class="tw-container">
    awdsadw
    <div class="tw-h-96"></div>
    <div class="tw-h-96"></div>
    <div class="tw-h-96"></div>
    <div class="tw-h-96"></div>
    <div class="tw-h-96"></div>
  </div>
</template>
<style scoped></style>
