<script setup lang="ts">
import { MENU_DATA } from './menu.data';

const activeIndex = ref(0);
</script>

<!-- class="tw-flex tw-items-center tw-text-lg tw-gap-2 tw-h-20 tw-box-border hover:tw-border-b-2 hover:tw-border-zinc-700 tw-transition-colors tw-duration-300" -->
<template>
    <div class="tw-flex tw-gap-5">
        <NuxtLink
            v-for="(item, index) in MENU_DATA"
            :key="item.name"
            :to="item.url"
            class="tw-flex tw-items-center tw-text-lg tw-gap-2 tw-h-20 hover:tw-border-b-2"
            :class="{
                'tw-border-b-2 tw-border-[#E1FF57] ': activeIndex === index,
            }"
            @click="activeIndex = index"
        >
            <v-icon
                :icon="item.icon"
                :color="activeIndex === index ? '#E1FF57' : '#ffffff'"
            />
            <p :class="{ 'tw-text-[#E1FF57]': activeIndex === index }">
                {{ item.name }}
            </p>
        </NuxtLink>
    </div>
</template>
