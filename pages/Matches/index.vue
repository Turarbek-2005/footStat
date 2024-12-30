<script setup lang="ts">
const store = useFoot();
const isLoading = ref(true);

onBeforeMount(async () => {
  try {
    await store.fetchProducts("matches");
    console.log("Матчи успешно загружены:", store.products.value.matches);
  } catch (error) {
    console.error("Ошибка при загрузке матчей:", error);
  } finally {
    isLoading.value = false;
  }
});

const groupedMatches = computed(() => {
  const matches = store.products.value.matches || [];
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
    <h2 class="tw-text-4xl tw-mb-5">Сегодняшние важные матчи</h2>

    <LayoutLoader v-if="isLoading" class="tw-h-full" />
    <div
      v-else-if="!groupedMatches || Object.keys(groupedMatches).length === 0"
    >
      <p>Нет доступных матчей на сегодня.</p>
    </div>

    <div
      v-else
      v-for="(competitionGroup, competitionId) in groupedMatches"
      :key="competitionId"
      class="tw-mb-8"
    >
      <h3 class="tw-text-xl tw-mb-3">
        {{ competitionGroup.competition.name }}
      </h3>
      <div
        class="tw-h-28 tw-w-28 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-mb-3"
      >
        <v-img
          :src="competitionGroup.competition.emblem"
          class="tw-h-20 tw-w-20"
        />
      </div>

      <div class="tw-grid tw-grid-cols-2 tw-gap-5">
        <NuxtLink
          v-for="match in competitionGroup.matches"
          :key="match.id"
          class="tw-p-3 tw-bg-zinc-900 tw-rounded-lg tw-cursor-pointer"
          @Click="store.set(match)"
          to="/Matches/Match"
        >
          <p>{{ match.homeTeam.name }} vs {{ match.awayTeam.name }}</p>
          <p>{{ formatMatchTime(match.utcDate) }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
