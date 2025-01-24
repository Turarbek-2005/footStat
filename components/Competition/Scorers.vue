<script lang="ts" setup>
const store = useFoot();
const competition: any = store.competition;
const scorers = ref();

onBeforeMount(async () => {
  try {
    await store.fetchProducts(`competitions/${competition.code}/scorers`);
    scorers.value = store.products.value.scorers;
    console.log(
      "Лучшие бомбардиры чемпионата успешно загружены:",
      scorers.value
    );
  } catch (error) {
    console.error("Ошибка при загрузке таблицы чемпионата:", error);
  }
});
</script>
<template>
  <div
    class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-3"
  >
    <div
      v-for="scorer in scorers"
      class="tw-bg-zinc-900 tw-flex tw-items-center tw-p-3 tw-rounded-lg"
    >
      <div class="tw-flex tw-flex-col tw-w-2/3 tw-text-sm">
        <label>Name: {{ scorer.player.name }}</label>
        <label>Team: {{ scorer.team.shortName }}</label>
        <label>Position: {{ scorer.player.section }}</label>
        <label>Played matches: {{ scorer.playedMatches }}</label>
        <label>Goals: {{ scorer.goals }}</label>
        <label>Assists: {{ scorer.assists }}</label>
      </div>
      <div class="tw-w-1/3 tw-flex tw-items-center tw-justify-center tw-h-full">
        <v-img
          class="tw-w-16 tw-h-16"
          :src="scorer.team.crest"
          :alt="scorer.team.shortName"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
