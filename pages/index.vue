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
  <v-responsive>
    <v-btn
      :prepend-icon="
        theme.global.name.value === 'light'
          ? 'mdi-weather-sunny'
          : 'mdi-weather-night'
      "
      text="Toggle Theme"
      slim
      @click="toggleTheme"
    ></v-btn>
    <v-btn @Click="get">Получить данные</v-btn>
    <div class="flex">
      <div
        v-if="shop.products"
        v-for="product in shop.products?.value?.matches"
        :key="product.id"
        class="match"
      >
        <div class="tw-bg-white">
          <v-img :src="product.competition.emblem" width="100" />
        </div>
        <div class="flex">
          <img :src="product.homeTeam.crest" class="img" />
          <p>{{ product.homeTeam.name }} - {{ product.awayTeam.name }}</p>
          <img :src="product.awayTeam.crest" class="img" />
        </div>
      </div>
    </div>

    <!-- <div v-else class="mt-4">Продукты загружаются или отсутствуют.</div> -->
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
