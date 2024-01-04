<script setup lang="ts">
import { useCompetition } from '@/composables/useCompetition';

const route = useRoute();
const { getCompetition } = useCompetition();
const uuid = route.params.uuid as string;
const item = await getCompetition(uuid);
</script>

<template>
  <div v-if="item">
    <div>Event name: {{  item.name }}</div>
  </div>
</template>



<style scoped>

</style>~/composables/useCompetition