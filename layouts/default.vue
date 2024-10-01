<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
theme.global.name.value = "dark";
</script>
<template>
  <Header />
  <div class="tw-pt-20">
    <slot></slot>
  </div>
</template>
<style scoped></style>
