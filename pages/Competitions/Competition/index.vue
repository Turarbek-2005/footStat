<script setup lang="ts">
const store = useFoot();
const competitionName = store.competition;
const competition = ref();
const data = new Date();
const tab = ref(null);
onBeforeMount(async () => {
    try {
        await store.fetchProducts(`competitions/${competitionName}`);
        // await store.fetchProducts(
        //     `competitions/${competition}/matches/?matchday=${data.getDay()}`
        // );
        competition.value = store.products.value;
        console.log(competitionName);
    } catch (error) {
        console.error('Ошибка при загрузке чемпионата:', error);
    }
});
</script>

<template>
    <div class="tw-container tw-pt-3">
        <div
            class="tw-h-24 tw-w-24 tw-flex tw-items-center tw-bg-zinc-300 tw-justify-center tw-rounded-full tw-mb-3"
        >
            <v-img :src="competition?.emblem" class="tw-h-16 tw-w-16" />
        </div>
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

                    <v-tabs-window-item value="three">
                        Three
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>
<style scoped></style>
