<script setup lang="ts">
import { useTheme } from "vuetify";
import { useShop } from "~/store/shop.store";
import ChampionsLeague from "./ChampionsLeague.vue";

const shop = useShop();

onBeforeMount(async () => {
  await shop.fetchProducts();
});

const theme = useTheme();

async function get() {
  console.log(shop.products.value);
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <div class="tw-container">
    <ChampionsLeague />
  </div>
</template>
<style scoped></style>
