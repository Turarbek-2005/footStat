<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
const shop = useShop();
const isLoading = ref(true);

onBeforeMount(async () => {
  try {
    await shop.fetchProducts("matches");
    console.log("Матчи успешно загружены:", shop.products.value.matches);
  } catch (error) {
    console.error("Ошибка при загрузке матчей:", error);
  } finally {
    isLoading.value = false;
  }
});

const groupedMatches = computed(() => {
  const matches = shop.products.value.matches || [];
  return matches.reduce((acc: any, match: any) => {
    const competitionId = match.competition.id;
    if (!acc[competitionId]) {
      acc[competitionId] = {
        competition: match.competition,
        matches: [],
      };
    }
    acc[competitionId].matches.push(match);
    return acc;
  }, {});
});

const formatMatchTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
</script>

<template>
  <div class="tw-container tw-pt-3">
    <h2 class="tw-text-2xl">Today Matches</h2>

    <div v-if="isLoading">
      <p>Загрузка матчей...</p>
    </div>

    <div v-else-if="Object.keys(groupedMatches).length === 0">
      <p>Нет доступных матчей на сегодня.</p>
    </div>

    <div
      v-for="(competitionGroup, competitionId) in groupedMatches"
      :key="competitionId"
      class="tw-mb-8"
    >
      <h3 class="tw-text-xl">{{ competitionGroup.competition.name }}</h3>
      <v-img
        :src="competitionGroup.competition.emblem"
        class="tw-h-20 tw-w-20"
      />

      <div class="tw-grid tw-grid-cols-2 tw-gap-5">
        <v-card
          v-for="match in competitionGroup.matches"
          :key="match.id"
          class="tw-p-2 tw-bg-zinc-900 tw-rounded-lg tw-cursor-pointer"
        >
          <p>{{ match.homeTeam.name }} vs {{ match.awayTeam.name }}</p>
          <p>{{ formatMatchTime(match.utcDate) }}</p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
