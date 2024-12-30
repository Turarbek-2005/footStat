<script setup lang="ts">
const store = useFoot();
const isLoading = ref(true);

onBeforeMount(async () => {
  try {
    await store.fetchProducts("competitions/PD/teams");
    console.log("Команды успешно загружены:", store.products.value);
  } catch (error) {
    console.error("Ошибка при загрузке команд:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="tw-container tw-pt-3">
    <h2 class="tw-text-4xl tw-mb-5">Команды</h2>
    <LayoutLoader v-if="isLoading" class="tw-h-full" />
    <div
      v-else
      class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8"
    >
      <div
        v-for="competition in store.products.value.teams"
        class="tw-mb-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer"
      >
        <div
          class="tw-h-40 tw-w-40 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-mb-4"
        >
          <v-img
            :src="competition.crest"
            :alt="competition.name"
            class="tw-h-24 tw-w-24"
          >
          </v-img>
        </div>
        <p>{{ competition.name }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
