<script setup lang="ts">
import { MENU_DATA } from "./menu.data";

const value = ref(0);
</script>

<template>
  <div class="tw-flex tw-gap-5">
    <NuxtLink
      class="tw-flex tw-items-center tw-text-lg tw-gap-2"
      v-for="item in MENU_DATA"
      :key="item.name"
      :to="item.url"
    >
      <v-icon :icon="item.icon" />
      <p>{{ item.name }}</p>
    </NuxtLink>
  </div>
</template>
