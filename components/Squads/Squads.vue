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
                        <div v-if="team && team.squad?.length">
                            <div class="tw-flex tw-gap-3">
                                <h4>Coach</h4>
                                <label>{{ team.coach.name }}</label>
                            </div>
                            <div
                                v-for="player in team.squad"
                                :key="player.id"
                                class="tw-flex tw-gap-3"
                            >
                                <h4>{{ player.position }}</h4>
                                <label>{{ player.name }}</label>
                            </div>
                        </div>
                        <p v-else>Нет данных для отображения</p>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="two">
                        <div v-if="team && team.squad?.length">
                            <div class="tw-flex tw-gap-3">
                                <h4>Coach</h4>
                                <label>{{ team.coach.name }}</label>
                            </div>
                            <div
                                v-for="player in team.squad"
                                :key="player.id"
                                class="tw-flex tw-gap-3"
                            >
                                <h4>{{ player.position }}</h4>
                                <label>{{ player.name }}</label>
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
