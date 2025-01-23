<script setup lang="ts">
const store = useFoot();
const competitionName = store.competition;
const competition = ref();
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
  const code = competition.value?.code;
  if (code) {
    return `url('/competition/bg-${code.toLowerCase()}.jpg')`;
  }
  return "";
});

onBeforeMount(async () => {
  try {
    await store.fetchProducts(`competitions/${competitionName}`);
    // await store.fetchProducts(
    //     `competitions/${competition}/matches/?matchday=${data.getDay()}`
    // );
    competition.value = store.products.value;
    console.log(competition.value);
    console.log(competitionName);
  } catch (error) {
    console.error("Ошибка при загрузке чемпионата:", error);
  }
});
</script>

<template>
  <div>
    <div class="tw-w-full bg" :style="{ backgroundImage: getBackgroundImage }">
      <div
        class="tw-container tw-gap-5 tw-relative tw-h-96 tw-flex tw-items-center"
      >
        <div
          class="tw-h-40 tw-w-56 tw-bg-zinc-50 tw-flex tw-items-center tw-justify-center tw-rounded-lg"
        >
          <v-img :src="competition?.emblem" class="tw-h-64 tw-w-64" />
        </div>
        <p class="tw-text-5xl tw-font-bold tw-uppercase">
          {{ competition?.name }}
        </p>
        <!-- <div class="tw-w-48 tw-absolute tw-right-32 tw-bottom-0">
          <v-img src="../../../public/competition/bg-pl.png" />
        </div> -->
      </div>
    </div>
    <div class="tw-container tw-pt-3">
      <v-card>
        <v-tabs v-model="tab" bg-color="#18181b">
          <v-tab value="one">Item One</v-tab>
          <v-tab value="two">Item Two</v-tab>
          <v-tab value="three">Item Three</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one"> One </v-tabs-window-item>

            <v-tabs-window-item value="two"> Two </v-tabs-window-item>

            <v-tabs-window-item value="three"> Three </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.bg {
  /* background-image: url("../../../public/competition/bg-pl.jpg"); */
  /* background-position: center; */
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
</style>
