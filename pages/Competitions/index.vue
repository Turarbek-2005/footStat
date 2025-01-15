<script setup lang="ts">
const store = useFoot();
const isLoading = ref(true);

onBeforeMount(async () => {
    try {
        await store.fetchProducts('competitions');
        console.log('Чемпионаты успешно загружены:', store.products.value);
    } catch (error) {
        console.error('Ошибка при загрузке чемпионатов:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>
<template>
    <div class="bg">
        <div class="tw-container tw-pt-3">
            <h2 class="tw-text-4xl tw-mb-5">Чемпионаты</h2>

            <LayoutLoader v-if="isLoading" class="tw-h-full" />

            <div
                v-else
                class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8"
            >
                <NuxtLink
                    v-for="competition in store.products.value.competitions"
                    class="tw-mb-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-pointer"
                    @Click="store.setCompetiton(competition.code)"
                    to="/Competitions/Competition"
                >
                    <div
                        class="tw-h-40 tw-w-40 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-mb-4"
                    >
                        <v-img
                            :src="competition.emblem"
                            :alt="competition.name"
                            class="tw-h-24 tw-w-24"
                        >
                        </v-img>
                    </div>
                    <p>{{ competition.name }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.bg {
    background-image: url('../../public/bg-3.jpg');
    background-size: 240%;
    background-position: center;
    background-repeat: no-repeat;
}
</style>
