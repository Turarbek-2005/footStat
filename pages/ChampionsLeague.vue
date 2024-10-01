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
}

function toggleTheme() {
  console.log(shop.products.value);
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-responsive>
    <v-btn
      :prepend-icon="
        theme.global.name.value === 'light'
          ? 'mdi-weather-sunny'
          : 'mdi-weather-night'
      "
      slim
      @click="toggleTheme"
    ></v-btn>
    <!-- <v-btn @Click="get">Получить данные</v-btn> -->
    <!-- <div class="tw-bg-white tw-w-40 tw-flex tw-justify-center tw-h-20">
      <v-img
        :src="shop.products?.value?.competition?.emblem"
        width="100"
        height="100"
      />
    </div>
    <div class="flex">
      <div
        v-if="shop.products"
        v-for="product in shop.products?.value?.matches"
        :key="product.id"
        class="match"
      >
        <div class="flex">
          <img :src="product.homeTeam.crest" class="img" />
          <p>{{ product.homeTeam.name }} - {{ product.awayTeam.name }}</p>
          <img :src="product.awayTeam.crest" class="img" />
        </div>
        <label>{{ product.utcDate }}</label>
      </div>
    </div> -->
  </v-responsive>
</template>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
.match {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;
}

.img {
  width: 5rem;
  height: 5rem;
}
</style>
