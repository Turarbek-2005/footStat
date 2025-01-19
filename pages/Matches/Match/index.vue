<script setup lang="ts">
const store = useFoot();
const match: any = store.match;
console.log(match);

const formatMatchTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<template>
    <div class="tw-pb-3">
        <div
            class="tw-flex tw-items-center tw-w-full tw-h-96 bg tw-justify-center tw-gap-10"
        >
            <div class="tw-flex tw-flex-col tw-items-center tw-container">
                <div class="tw-flex tw-items-center tw-gap-3">
                    <div
                        class="tw-h-16 tw-w-16 tw-flex tw-items-center tw-bg-zinc-300 tw-justify-center tw-rounded-full tw-mb-3"
                    >
                        <v-img
                            :src="match.competition.emblem"
                            class="tw-h-10 tw-w-10"
                        />
                    </div>
                    <h3 class="tw-text-xl tw-mb-3">
                        {{ match.competition.name }}
                    </h3>
                </div>
                <div class="tw-grid tw-gap-10 tw-grid-cols-3 tw-items-center">
                    <div class="tw-flex tw-flex-col tw-items-center tw-gap-4">
                        <div class="tw-h-20 tw-w-20">
                            <v-img :src="match.homeTeam.crest" />
                        </div>
                        <p class="tw-text-2xl">
                            {{ match.homeTeam.shortName }}
                        </p>
                    </div>
                    <div class="tw-text-center">
                        <div
                            v-if="match.status != 'TIMED'"
                            class="tw-flex tw-flex-col"
                        >
                            <label class="tw-text-5xl"
                                >{{ match.score.fullTime.home }} :
                                {{ match.score.fullTime.away }}</label
                            >
                            <label
                                v-if="match.status == 'IN_PLAY'"
                                class="tw-text-md tw-text-center"
                                >Матч идёт</label
                            >
                            <label
                                v-if="match.status == 'FINISHED'"
                                class="tw-text-md tw-text-center"
                                >Матч окончен</label
                            >
                            <label
                                v-if="match.status == 'PAUSED'"
                                class="tw-text-md tw-text-center"
                                >Перерыв</label
                            >
                        </div>
                        <label class="tw-text-5xl" v-else>{{
                            formatMatchTime(match.utcDate)
                        }}</label>
                    </div>
                    <div class="tw-flex tw-flex-col tw-items-center tw-gap-4">
                        <div class="tw-h-20 tw-w-20">
                            <v-img :src="match.awayTeam.crest" />
                        </div>
                        <p class="tw-text-2xl">
                            {{ match.awayTeam.shortName }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Squads />
    </div>
</template>
<style scoped>
.bg {
    background-image: url('../../../public/bg-5.jpg');
    background-position: center;
    background-repeat: no-repeat;
}
</style>
