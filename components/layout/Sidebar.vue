<script setup lang="ts">
import { PROFILE_MENU_DATA } from './menu.data';

const user = await account.get();
</script>
<template>
    <div class="tw-fixed tw-bg-zinc-900 tw-w-full tw-z-10">
        <div
            class="tw-relative tw-h-20 tw-flex tw-items-center tw-justify-between tw-w-full tw-container"
        >
            <NuxtLink to="/" class="tw-text-2xl">FootStat</NuxtLink>
            <LayoutMenu />
            <NuxtLink to="/login" class="tw-text-2xl" v-if="!user"
                >Login</NuxtLink
            >
            <v-menu v-else location="bottom center">
                <template v-slot:activator="{ props }">
                    <div
                        class="tw-h-12 tw-w-12 tw-bg-zinc-800 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-cursor-pointer"
                        v-bind="props"
                    >
                        <v-icon icon="mdi-account" size="35" />
                    </div>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, index) in PROFILE_MENU_DATA"
                        :key="index"
                    >
                        <NuxtLink
                            class="tw-flex tw-items-center tw-text-md tw-gap-2"
                            :key="item.name"
                            :to="item.url"
                        >
                            <v-icon :icon="item.icon" />
                            <p>{{ item.name }}</p>
                        </NuxtLink>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>
<style scoped></style>
