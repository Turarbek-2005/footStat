<script setup lang="ts">
const store = useFoot();

const match = store.match;
</script>

<template>
  <div class="tw-container">
    <div class="tw-flex tw-items-center">
      <div>
        <v-img :src="match.homeTeam.crest" class="tw-h-20 tw-w-20" />
        <p>{{ match.homeTeam.name }}</p>
      </div>
      <div>
        <v-img :src="match.awayTeam.crest" class="tw-h-20 tw-w-20" />
        <p>{{ match.awayTeam.name }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
