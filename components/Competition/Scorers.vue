<script lang="ts" setup>
const store = useFoot();
const competition: any = store.competition;
const scorers = ref();

onBeforeMount(async () => {
  try {
    await store.fetchProducts(`competitions/${competition.code}/scorers`);
    scorers.value = store.products.value;
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
  <div></div>
</template>
<style scoped></style>
