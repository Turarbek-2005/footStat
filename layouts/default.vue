<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
theme.global.name.value = "dark";
</script>
<template>
  <div>
    <slot></slot>
  </div>
</template>
<style scoped></style>
