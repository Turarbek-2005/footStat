<script setup lang="ts">
const store = useFoot();
const isLoading = ref(true);
const team = store.team;
const tab = ref<string>("one");
// onBeforeMount(async () => {
//   try {
//     console.log(team);
//     await store.fetchProducts(`teams/${team.id}`);
//     console.log("Команда успешно загружена:", store.products.value);
//   } catch (error) {
//     console.error("Ошибка при загрузке команд:", error);
//   } finally {
//     isLoading.value = false;
//   }
// });
</script>

<template>
  <div class="tw-container tw-pt-6">
    <LayoutLoader v-if="isLoading" class="tw-h-full" />
    <div v-else>
      <div class="tw-flex tw-items-center tw-gap-4 tw-mb-6">
        <div
          class="tw-h-40 tw-w-40 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full"
        >
          <v-img :src="team.crest" :alt="team.name" class="tw-h-32 tw-w-32">
          </v-img>
        </div>
        <p class="tw-text-3xl">{{ team.name }}</p>
      </div>
      <v-card>
        <v-tabs v-model="tab" bg-color="#18181b">
          <v-tab class="tw-w-1/2" value="one"> Squad </v-tab>
          <v-tab class="tw-w-1/2" value="two"> Matches </v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <div
                v-if="team && team.squad?.length"
                class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-3"
              >
                <div
                  class="tw-p-3 tw-flex tw-items-center tw-gap-3 tw-bg-zinc-900 tw-rounded-lg tw-cursor-pointer"
                >
                  <div
                    class="tw-h-12 tw-w-12 tw-bg-zinc-800 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-cursor-pointer"
                  >
                    <v-icon icon="mdi-account-outline" size="35" />
                  </div>
                  <div>
                    <h4 class="tw-text-md">Coach</h4>
                    <label class="tw-text-lg">{{ team.coach.name }}</label>
                  </div>
                </div>
                <div
                  v-for="player in team.squad"
                  :key="player.id"
                  class="tw-p-3 tw-flex tw-items-center tw-gap-3 tw-bg-zinc-900 tw-rounded-lg tw-cursor-pointer"
                >
                  <div
                    class="tw-h-12 tw-w-12 tw-bg-zinc-800 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-cursor-pointer"
                  >
                    <v-icon icon="mdi-account-outline" size="35" />
                  </div>
                  <div>
                    <h4 class="tw-text-md">
                      {{ player.position }}
                    </h4>
                    <label class="tw-text-lg">{{ player.name }}</label>
                  </div>
                </div>
              </div>
              <p v-else>Нет данных для отображения</p>
            </v-tabs-window-item>
            <v-tabs-window-item value="two"><TeamMatches /></v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<style scoped></style>
