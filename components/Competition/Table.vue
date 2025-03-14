<script lang="ts" setup>
const store = useFoot();
const competition: any = store.competition;
console.log(competition);

const standings = ref();

onBeforeMount(async () => {
  try {
    await store.fetchProducts(
      `competitions/${
        competition.code || competition.competition.code
      }/standings`
    );
    standings.value = store.products.value.standings[0].table;
    console.log("Таблица чемпионата успешно загружена:", standings.value);
  } catch (error) {
    console.error("Ошибка при загрузке таблицы чемпионата:", error);
  }
});
</script>
<template>
  <div v-if="!standings">
    <p class="tw-text-xl">Для этого чемпионата нету таблицы</p>
  </div>
  <div v-else>
    <div
      class="tw-flex tw-justify-end tw-w-full tw-gap-2 tw-text-base tw-font-bold tw-text-end"
    >
      <label class="tw-w-8">PL</label>
      <label class="tw-w-8">W</label>
      <label class="tw-w-8">D</label>
      <label class="tw-w-8">L</label>
      <label class="tw-w-8">GD</label>
      <label class="tw-w-8">PTS</label>
    </div>
    <div
      v-for="team in standings"
      class="tw-mb-2 tw-flex tw-items-center tw-w-full tw-justify-between"
    >
      <div class="tw-flex tw-items-center tw-gap-3">
        <label class="tw-text-lg tw-w-8 tw-text-right">{{
          team.position
        }}</label>
        <div
          class="tw-w-12 tw-h-12 tw-bg-zinc-900 tw-rounded-full tw-flex tw-items-center tw-justify-center"
        >
          <v-img
            :src="team.team.crest"
            :alt="team.team.name"
            class="tw-w-8 tw-h-8"
          />
        </div>
        <p class="tw-text-lg">{{ team.team.name }}</p>
      </div>
      <div class="tw-gap-2 tw-text-base tw-flex tw-text-end">
        <label class="tw-w-8">{{ team.playedGames }}</label>
        <label class="tw-w-8">{{ team.won }}</label>
        <label class="tw-w-8">{{ team.draw }}</label>
        <label class="tw-w-8">{{ team.lost }}</label>
        <label class="tw-w-8">{{ team.goalDifference }}</label>
        <label class="tw-w-8">{{ team.points }}</label>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
