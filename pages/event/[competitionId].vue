<script setup lang="ts">
import { useEvent } from '@/composables/useEvent';

const route = useRoute();
const { getEvent } = useEvent();
const item = getEvent(Number(route?.params?.eventId));
</script>

<template>
  <div v-if="item">
    <div>Event id: {{ item.id }}</div>
    <div>Event name: {{  item.name }}</div>
  </div>
</template>



<style scoped>

</style>~/composables/useCompetition