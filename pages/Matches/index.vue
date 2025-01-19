<script setup lang="ts">
const store = useFoot();
const isLoading = ref(true);
const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const monthName = today.toLocaleString('ru-RU', { month: 'long' });
const day = ref(today.getDate());

const formattedDate = computed(() => {
    const monthValue = String(month.value).padStart(2, '0');
    const dayValue = String(day.value).padStart(2, '0');
    return `${year.value}-${monthValue}-${dayValue}`;
});

const loadMatches = async () => {
    isLoading.value = true;
    try {
        await store.fetchProducts(`matches/?date=${formattedDate.value}`);
        console.log('Матчи успешно загружены:', store.products.value.matches);
    } catch (error) {
        console.error('Ошибка при загрузке матчей:', error);
    } finally {
        isLoading.value = false;
    }
};

watch(formattedDate, loadMatches);

onBeforeMount(loadMatches);

const groupedMatches = computed(() => {
    const matches = store.products.value.matches || [];
    return matches.reduce((acc: any, match: any) => {
        const competitionId = match.competition.id;
        if (!acc[competitionId]) {
            acc[competitionId] = {
                competition: match.competition,
                matches: [],
            };
        }
        acc[competitionId].matches.push(match);
        return acc;
    }, {});
});

const formatMatchTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<template>
    <div class="tw-container tw-pt-3">
        <LayoutLoader v-if="isLoading" class="tw-h-full" />
        <div
            v-else-if="
                !groupedMatches || Object.keys(groupedMatches).length === 0
            "
        >
            <p>Нет доступных матчей на сегодня.</p>
        </div>

        <div v-else data-aos="fade-up">
            <h2 class="tw-text-4xl tw-mb-5">
                Календарный месяц: {{ monthName }}
            </h2>
            <v-pagination
                v-model="day"
                :length="31"
                class="my-4"
            ></v-pagination>
            <div
                v-for="(competitionGroup, competitionId) in groupedMatches"
                :key="competitionId"
                class="tw-mb-8"
            >
                <div class="tw-flex tw-items-center tw-gap-3">
                    <div
                        class="tw-h-24 tw-w-24 tw-flex tw-items-center tw-bg-zinc-300 tw-justify-center tw-rounded-full tw-mb-3"
                    >
                        <v-img
                            :src="competitionGroup.competition.emblem"
                            class="tw-h-16 tw-w-16"
                        />
                    </div>
                    <h3 class="tw-text-xl tw-mb-3">
                        {{ competitionGroup.competition.name }}
                    </h3>
                </div>
                <div
                    class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5"
                >
                    <NuxtLink
                        v-for="match in competitionGroup.matches"
                        :key="match.id"
                        class="tw-p-3 tw-bg-zinc-900 tw-rounded-lg tw-cursor-pointer"
                        @Click="store.setMatch(match)"
                        to="/Matches/Match"
                    >
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <div class="tw-w-3/4 tw-pr-3">
                                <div
                                    class="tw-flex tw-items-center tw-gap-3 tw-mb-2"
                                >
                                    <div
                                        class="tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center"
                                    >
                                        <v-img
                                            :src="match.homeTeam.crest"
                                            class="tw-h-10 tw-w-10"
                                        />
                                    </div>
                                    <p>{{ match.homeTeam.name }}</p>
                                    <label
                                        class="tw-ml-auto"
                                        v-if="match.status != 'TIMED'"
                                        >{{ match.score.fullTime.home }}</label
                                    >
                                </div>
                                <div
                                    class="tw-flex tw-items-center tw-gap-3 tw-mb-2"
                                >
                                    <div
                                        class="tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center"
                                    >
                                        <v-img
                                            :src="match.awayTeam.crest"
                                            class="tw-h-10 tw-w-10"
                                        />
                                    </div>
                                    <p>{{ match.awayTeam.name }}</p>
                                    <label
                                        class="tw-ml-auto"
                                        v-if="match.status != 'TIMED'"
                                        >{{ match.score.fullTime.away }}</label
                                    >
                                </div>
                            </div>
                            <div
                                class="tw-w-1/4 tw-pl-3 tw-h-20 tw-flex tw-flex-col tw-items-center tw-justify-center tw-border-l tw-border-zinc-700"
                            >
                                <label v-if="match.status != 'FINISHED'">{{
                                    formatMatchTime(match.utcDate)
                                }}</label>
                                <b
                                    v-if="match.status == 'IN_PLAY'"
                                    class="tw-text-sm tw-text-center"
                                    >Матч идёт</b
                                >
                                <b
                                    v-if="match.status == 'FINISHED'"
                                    class="tw-text-sm tw-text-center"
                                    >Матч окончен</b
                                >
                                <b
                                    v-if="match.status == 'PAUSED'"
                                    class="tw-text-sm tw-text-center"
                                    >Перерыв</b
                                >
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
