<script lang="ts" setup>
const store = useFoot();
const isLoading = ref(true);
let competition: any = store.competition;
console.log(competition);
const matches = ref();

const formatMatchTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadMatches = async () => {
  isLoading.value = true;
  try {
    await store.fetchProducts(
      `competitions/${competition.code}/matches/?matchday=${competition.currentSeason.currentMatchday}`
    );
    matches.value = store.products.value.matches;
    console.log("Матчи чемпионата успешно загружены:", matches.value);
  } catch (error) {
    console.error("Ошибка при загрузке таблицы чемпионата:", error);
  } finally {
    isLoading.value = false;
  }
};

watch(competition, loadMatches);

onBeforeMount(loadMatches);
</script>
<template>
  <h3 class="tw-text-2xl tw-mb-3 tw-ml-1">
    Тур: {{ competition.currentSeason.currentMatchday }}
  </h3>
  <v-pagination
    v-model="competition.currentSeason.currentMatchday"
    :length="50"
    class="my-4"
  />
  <LayoutLoader v-if="isLoading" class="tw-h-full" />
  <div
    v-else
    class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5"
  >
    <NuxtLink
      v-for="match in matches"
      :key="match.id"
      class="tw-p-3 tw-bg-zinc-900 tw-rounded-lg tw-cursor-pointer"
      @Click="store.setMatch(match)"
      to="/Matches/Match"
    >
      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-w-3/4 tw-pr-3">
          <div class="tw-flex tw-items-center tw-gap-3 tw-mb-2">
            <div
              class="tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center"
            >
              <v-img :src="match.homeTeam.crest" class="tw-h-10 tw-w-10" />
            </div>
            <p>{{ match.homeTeam.name }}</p>
            <label class="tw-ml-auto" v-if="match.status != 'TIMED'">{{
              match.score.fullTime.home
            }}</label>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3 tw-mb-2">
            <div
              class="tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center"
            >
              <v-img :src="match.awayTeam.crest" class="tw-h-10 tw-w-10" />
            </div>
            <p>{{ match.awayTeam.name }}</p>
            <label class="tw-ml-auto" v-if="match.status != 'TIMED'">{{
              match.score.fullTime.away
            }}</label>
          </div>
        </div>
        <div
          class="tw-w-1/4 tw-pl-3 tw-h-20 tw-flex tw-flex-col tw-items-center tw-justify-center tw-border-l tw-border-zinc-700"
        >
          <label v-if="match.status != 'FINISHED'">{{
            formatMatchTime(match.utcDate)
          }}</label>
          <b v-if="match.status == 'IN_PLAY'" class="tw-text-sm tw-text-center"
            >Матч идёт</b
          >
          <b v-if="match.status == 'FINISHED'" class="tw-text-sm tw-text-center"
            >Матч окончен</b
          >
          <b v-if="match.status == 'PAUSED'" class="tw-text-sm tw-text-center"
            >Перерыв</b
          >
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<style scoped></style>
