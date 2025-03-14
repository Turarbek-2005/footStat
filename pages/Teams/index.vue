<script setup lang="ts">
const store = useFoot();
const isLoading = ref(true);
const competition = store.competition;
onBeforeMount(async () => {
  try {
    const code = competition.code || competition.competition.code;

    await store.fetchProducts(`competitions/${code}/teams`);
    console.log("Команды успешно загружены:", store.products.value);
  } catch (error) {
    console.error("Ошибка при загрузке команд:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="tw-container tw-pt-3 bg">
    <h2 class="tw-text-4xl tw-mb-5">Команды</h2>
    <LayoutLoader v-if="isLoading" class="tw-h-full" />
    <div
      v-else
      class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8"
    >
      <NuxtLink
        v-for="team in store.products.value.teams"
        class="tw-mb-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer"
        @Click="store.setTeam(team)"
        to="/Teams/Team"
      >
        <div
          class="tw-h-40 tw-w-40 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-mb-4"
        >
          <v-img :src="team.crest" :alt="team.name" class="tw-h-24 tw-w-24">
          </v-img>
        </div>
        <p>{{ team.name }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
<style scoped>
.bg {
  background-image: url("../../public/bg-6.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
