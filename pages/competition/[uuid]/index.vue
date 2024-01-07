<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';


const route = useRoute();
const uuid = route.params.uuid as string;
const { getCompetition } = useCompetitionStore();
const item = await getCompetition(uuid);
const eventLink = ref(item.link);
</script>

<template>
  <div v-if="item">
    <div>Event name: {{ item.name }}</div>
    <InputText
      v-model="eventLink"
      placeholder="Event link"
    />
  </div>
</template>

<style scoped>

</style>