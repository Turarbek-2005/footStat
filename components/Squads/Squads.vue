<script setup lang="ts">
const store = useFoot();
const match: any = store.match;
const team = ref();
const tab = ref<string>('one');

const useData = async (squad: string) => {
    try {
        if (squad == 'one') {
            await store.fetchProducts(`teams/${match.homeTeam.id}`);
        } else {
            await store.fetchProducts(`teams/${match.awayTeam.id}`);
        }
    } catch (error) {
        console.error('Ошибка при загрузке команды:', error);
    } finally {
        team.value = store.products.value;
        console.log(team.value);
    }
};

onBeforeMount(async () => {
    if (!match) {
        console.error('Данные match не загружены');
        return;
    }
    await useData(tab.value);
});

watch(tab, async (newSquad) => {
    await useData(newSquad);
});
</script>

<template>
    <div class="tw-container tw-pt-3" v-if="match">
        <v-card>
            <v-tabs v-model="tab" bg-color="#18181b">
                <v-tab class="tw-w-1/2" value="one">
                    {{ match.homeTeam.shortName }} full squad
                </v-tab>
                <v-tab class="tw-w-1/2" value="two">
                    {{ match.awayTeam.shortName }} full squad
                </v-tab>
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
                                    <v-icon
                                        icon="mdi-account-outline"
                                        size="35"
                                    />
                                </div>
                                <div>
                                    <h4 class="tw-text-md">Coach</h4>
                                    <label class="tw-text-lg">{{
                                        team.coach.name
                                    }}</label>
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
                                    <v-icon
                                        icon="mdi-account-outline"
                                        size="35"
                                    />
                                </div>
                                <div>
                                    <h4 class="tw-text-md">
                                        {{ player.position }}
                                    </h4>
                                    <label class="tw-text-lg">{{
                                        player.name
                                    }}</label>
                                </div>
                            </div>
                        </div>
                        <p v-else>Нет данных для отображения</p>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="two">
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
                                    <v-icon
                                        icon="mdi-account-outline"
                                        size="35"
                                    />
                                </div>
                                <div>
                                    <h4 class="tw-text-md">Coach</h4>
                                    <label class="tw-text-lg">{{
                                        team.coach.name
                                    }}</label>
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
                                    <v-icon
                                        icon="mdi-account-outline"
                                        size="35"
                                    />
                                </div>
                                <div>
                                    <h4 class="tw-text-md">
                                        {{ player.position }}
                                    </h4>
                                    <label class="tw-text-lg">{{
                                        player.name
                                    }}</label>
                                </div>
                            </div>
                        </div>
                        <p v-else>Нет данных для отображения</p>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped></style>
