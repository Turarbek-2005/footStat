<script setup lang="ts">
const store = useFoot();
const competition = store.competition;
const data = new Date();
const tab = ref(null);

const codes = [
  "BSA",
  "ELC",
  "PL",
  "CL",
  "EC",
  "FL1",
  "BL1",
  "SA",
  "DED",
  "PPL",
  "CLI",
  "PD",
  "WC",
];

const getBackgroundImage = computed(() => {
  const code = competition.code;
  if (code) {
    return `url('/competition/bg-${code.toLowerCase()}.jpg')`;
  }
  return "";
});

// onBeforeMount(async () => {
//   try {
//     await store.fetchProducts(`competitions/${competitionName}`);
//     // await store.fetchProducts(
//     //     `competitions/${competition}/matches/?matchday=${data.getDay()}`
//     // );
//     competition.value = store.products.value;
//     console.log(competition.value);
//     console.log(competitionName);
//   } catch (error) {
//     console.error("Ошибка при загрузке чемпионата:", error);
//   }
// });
</script>

<template>
  <div>
    <div class="tw-w-full bg" :style="{ backgroundImage: getBackgroundImage }">
      <div
        class="tw-container tw-gap-5 tw-relative tw-h-96 tw-flex tw-items-center"
      >
        <div
          class="tw-h-56 tw-w-56 tw-bg-zinc-700 tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-rounded-lg"
        >
          <v-img :src="competition?.emblem" class="tw-h-48 tw-w-48" />
        </div>
        <p class="tw-text-5xl tw-font-bold tw-uppercase">
          {{ competition?.name }}
        </p>
      </div>
    </div>
    <div class="tw-container tw-pt-3">
      <v-card>
        <v-tabs v-model="tab" bg-color="#18181b">
          <v-tab value="one" class="tw-w-1/3">Table</v-tab>
          <v-tab value="two" class="tw-w-1/3">Matches</v-tab>
          <v-tab value="three" class="tw-w-1/3">Scorers</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one"
              ><CompetitionTable
            /></v-tabs-window-item>

            <v-tabs-window-item value="two"
              ><CompetitionMatches
            /></v-tabs-window-item>

            <v-tabs-window-item value="three"
              ><CompetitionScorers
            /></v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.bg {
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
</style>
