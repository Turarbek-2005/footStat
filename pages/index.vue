<script setup lang="ts">
// const store = useFoot();
// const authStore = useAuthStore();
// onBeforeMount(async () => {
//     await store.fetchProducts('standings/CL');
//     console.log(authStore.user);
// });
</script>

<template>
  <div class="tw-container tw-pt-40 tw-flex tw-flex-col tw-items-center">
    <h1 class="tw-text-5xl tw-mb-4">Добро пожаловать на FootStat!</h1>

    <div
      class="tw-text-2xl tw-w-2/3 tw-flex tw-flex-col tw-gap-8 tw-text-center"
    >
      Следи за миром футбола в одном месте:
      <div class="tw-grid tw-grid-cols-3 tw-gap-3 tw-text-4xl">
        <NuxtLink to="/Matches"> 🔥 Все матчи </NuxtLink>
        <NuxtLink to="/Competitions"> 🏆 Лиги </NuxtLink>
        <NuxtLink to="/Teams"> ⚽ Команды </NuxtLink>
      </div>
      Будь в курсе последних событий, не пропускай важные матчи и поддерживай
      свою любимую команду вместе с нами!
    </div>
  </div>
</template>
<style scoped></style>
