<template>
  <div v-if="competition">
    <div>Event name: {{ competition.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';

const route = useRoute();

if (Object.keys(route.query).includes('preview')) {
  // проверить есть ли у текущего юзера такой эвент
  // если нет то редирект на ошибку
}

const uuid = route.params.uuid as string;
const { getCompetition } = useCompetitionStore();
const competition = await getCompetition(uuid);
</script>
